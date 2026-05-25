'use strict';
//    tape class — infinite tape simulation
class Tape {
    constructor(input = '') {
        this.cells = {};
        this.head = 0;
        this.minIdx = 0;
        this.maxIdx = 0;
        this.changedCells = new Set();
        this.lastWritten = null;

        for (let i = 0; i < input.length; i++) {
            this.cells[i] = input[i];
        }
        this.maxIdx = Math.max(0, input.length - 1);
    }

    read() {
        return this.cells[this.head] !== undefined ? this.cells[this.head] : '⊔';
    }

    write(symbol) {
        const prev = this.read();
        if (symbol === '⊔') {
            delete this.cells[this.head];
        } else {
            this.cells[this.head] = symbol;
        }
        if (symbol !== prev) {
            this.changedCells.add(this.head);
            this.lastWritten = this.head;
        }
        this.minIdx = Math.min(this.minIdx, this.head);
        this.maxIdx = Math.max(this.maxIdx, this.head);
    }

    moveLeft() { this.head--; this.minIdx = Math.min(this.minIdx, this.head); }
    moveRight() { this.head++; this.maxIdx = Math.max(this.maxIdx, this.head); }

    move(dir) {
        if (dir === 'L') this.moveLeft();
        else this.moveRight();
    }

    getVisibleRange(padding = 6) {
        const lo = Math.min(this.minIdx, this.head) - padding;
        const hi = Math.max(this.maxIdx, this.head) + padding;
        return { lo, hi };
    }

    getCell(idx) {
        return this.cells[idx] !== undefined ? this.cells[idx] : '⊔';
    }

    clone() {
        const t = new Tape();
        t.cells = { ...this.cells };
        t.head = this.head;
        t.minIdx = this.minIdx;
        t.maxIdx = this.maxIdx;
        t.changedCells = new Set(this.changedCells);
        t.lastWritten = this.lastWritten;
        return t;
    }
}


//    TURING MACHINE CLASS

class TuringMachine {
    constructor(config) {
        this.initialState = config.initialState;
        this.acceptStates = new Set(config.acceptStates || []);
        this.rejectStates = new Set(config.rejectStates || []);
        this.transitions = config.transitions || {};
        this.name = config.name || 'Unnamed TM';
        this.description = config.description || '';
        this.alphabet = config.alphabet || [];

        this.reset();
    }

    reset(input) {
        this.tape = new Tape(input !== undefined ? input : this.inputString || '');
        this.state = this.initialState;
        this.halted = false;
        this.accepted = false;
        this.rejected = false;
        this.stepCount = 0;
        this.history = [];
        this.lastTransitionKey = null;
        this.inputString = input !== undefined ? input : (this.inputString || '');
    }

    getTransition(state, symbol) {
        // Try exact symbol first
        let key = `${state},${symbol}`;
        if (this.transitions[key]) return { key, rule: this.transitions[key] };

        // If symbol is the blank (⊔), also try the empty-string key variant "state,"
        // This handles custom machines where users type "q0," instead of "q0,⊔"
        if (symbol === '⊔') {
            key = `${state},`;
            if (this.transitions[key]) return { key, rule: this.transitions[key] };
        }

        // If symbol is non-blank, try canonical blank keys as fallback wildcard
        key = `${state},⊔`;
        if (this.transitions[key]) return { key, rule: this.transitions[key] };

        return null;
    }

    step() {
        if (this.halted) return false;

        const symbol = this.tape.read();
        const result = this.getTransition(this.state, symbol);

        // Save history entry BEFORE stepping
        const histEntry = {
            step: this.stepCount,
            state: this.state,
            symbol: symbol,
            head: this.tape.head,
            transition: null,
        };

        if (!result) {
            // No transition → implicit reject
            this.halted = true;
            this.rejected = true;
            this.accepted = false;
            histEntry.result = 'reject';
            this.history.push(histEntry);
            return true;
        }

        const [newState, writeSymbol, direction] = result.rule;
        this.lastTransitionKey = result.key;

        histEntry.transition = {
            from: this.state,
            read: symbol,
            write: writeSymbol,
            direction: direction,
            to: newState,
            key: result.key,
        };

        this.tape.write(writeSymbol);
        this.tape.move(direction);
        this.state = newState;
        this.stepCount++;

        if (this.acceptStates.has(this.state)) {
            this.halted = true;
            this.accepted = true;
            this.rejected = false;
            histEntry.result = 'accept';
        } else if (this.rejectStates.has(this.state)) {
            this.halted = true;
            this.rejected = true;
            this.accepted = false;
            histEntry.result = 'reject';
        }

        this.history.push(histEntry);
        return true;
    }

    getStatus() {
        if (this.accepted) return 'accept';
        if (this.rejected) return 'reject';
        if (this.halted) return 'halt';
        return 'running';
    }

    getAllStates() {
        const states = new Set([this.initialState, ...this.acceptStates, ...this.rejectStates]);
        for (const key of Object.keys(this.transitions)) {
            const [s] = key.split(',');
            states.add(s);
            const rule = this.transitions[key];
            if (rule && rule[0]) states.add(rule[0]);
        }
        return [...states];
    }
}

const PREDEFINED_MACHINES = {

    'binary-increment': {
        name: 'Binary Incrementer',
        description: 'Increments a binary number by 1. Scans to the rightmost bit and carries left.',
        alphabet: ['0', '1'],
        examples: ['1011', '111', '1000', '0', '1111'],
        exampleHints: ['Only 0s and 1s allowed'],
        initialState: 'q_right',
        acceptStates: ['q_accept'],
        rejectStates: [],
        transitions: {
            // Move right to end of tape
            'q_right,0': ['q_right', '0', 'R'],
            'q_right,1': ['q_right', '1', 'R'],
            'q_right,⊔': ['q_inc', '⊔', 'L'],
            // Increment: flip 1→0 carry left, 0→1 done
            'q_inc,1': ['q_inc', '0', 'L'],
            'q_inc,0': ['q_accept', '1', 'R'],
            'q_inc,⊔': ['q_accept', '1', 'R'],
        },
    },

    'palindrome': {
        name: 'Palindrome Checker',
        description: 'Checks if a string over {a, b} is a palindrome. Matches outermost chars and erases them.',
        alphabet: ['a', 'b'],
        examples: ['abba', 'aba', 'abab', 'a', 'aabaa'],
        exampleHints: ['Only a and b allowed'],
        initialState: 'q_start',
        acceptStates: ['q_accept'],
        rejectStates: ['q_reject'],
        transitions: {
            // Start: read leftmost symbol
            'q_start,a': ['q_seek_a', '⊔', 'R'],
            'q_start,b': ['q_seek_b', '⊔', 'R'],
            'q_start,⊔': ['q_accept', '⊔', 'R'],   // empty/erased → accept

            // Moving right with 'a' on left — skip middle, find rightmost
            'q_seek_a,a': ['q_seek_a', 'a', 'R'],
            'q_seek_a,b': ['q_seek_a', 'b', 'R'],
            'q_seek_a,⊔': ['q_found_a', '⊔', 'L'],

            // Moving right with 'b' on left
            'q_seek_b,a': ['q_seek_b', 'a', 'R'],
            'q_seek_b,b': ['q_seek_b', 'b', 'R'],
            'q_seek_b,⊔': ['q_found_b', '⊔', 'L'],

            // Found rightmost — check match for 'a'
            'q_found_a,a': ['q_back', '⊔', 'L'],   // match
            'q_found_a,b': ['q_reject', 'b', 'R'],   // mismatch
            'q_found_a,⊔': ['q_accept', '⊔', 'R'],   // only one left (odd length)

            // Found rightmost — check match for 'b'
            'q_found_b,b': ['q_back', '⊔', 'L'],   // match
            'q_found_b,a': ['q_reject', 'a', 'R'],   // mismatch
            'q_found_b,⊔': ['q_accept', '⊔', 'R'],   // only one left

            // Go back to leftmost non-blank
            'q_back,a': ['q_back', 'a', 'L'],
            'q_back,b': ['q_back', 'b', 'L'],
            'q_back,⊔': ['q_start', '⊔', 'R'],
        },
    },

    'equal-01': {
        name: 'Equal 0s and 1s (0ⁿ1ⁿ)',
        description: 'Accepts strings of the form 0ⁿ1ⁿ (n≥1). Crosses off one 0 and one 1 per pass.',
        alphabet: ['0', '1'],
        examples: ['0011', '01', '000111', '0001'],
        exampleHints: ['Only 0s and 1s allowed; 0s must precede 1s'],
        initialState: 'q_scan',
        acceptStates: ['q_accept'],
        rejectStates: ['q_reject'],
        transitions: {
            // Find leftmost uncrossed 0, mark it X
            'q_scan,0': ['q_find1', 'X', 'R'],
            'q_scan,X': ['q_scan', 'X', 'R'],   // skip already-marked
            'q_scan,⊔': ['q_reject', '⊔', 'R'],   // no 0 found
            'q_scan,1': ['q_check', '1', 'L'],   // all 0s done? check
            'q_scan,Y': ['q_verify', 'Y', 'R'],   // all marked — verify

            // Move right to find matching 1 (skip 0s and Xs)
            'q_find1,0': ['q_find1', '0', 'R'],
            'q_find1,X': ['q_find1', 'X', 'R'],
            'q_find1,Y': ['q_find1', 'Y', 'R'],
            'q_find1,1': ['q_back0', 'Y', 'L'],   // mark 1 as Y
            'q_find1,⊔': ['q_reject', '⊔', 'R'],   // no 1 found

            // Go back left to start
            'q_back0,0': ['q_back0', '0', 'L'],
            'q_back0,X': ['q_back0', 'X', 'L'],
            'q_back0,Y': ['q_back0', 'Y', 'L'],
            'q_back0,⊔': ['q_scan', '⊔', 'R'],

            // All 0s crossed: check all 1s are crossed too
            'q_check,X': ['q_check', 'X', 'L'],
            'q_check,Y': ['q_check', 'Y', 'L'],
            'q_check,⊔': ['q_verify2', '⊔', 'R'],
            'q_check,0': ['q_reject', '0', 'R'],

            // Verify: all remaining should be X or Y
            'q_verify,X': ['q_verify', 'X', 'R'],
            'q_verify,Y': ['q_verify', 'Y', 'R'],
            'q_verify,⊔': ['q_accept', '⊔', 'R'],
            'q_verify,0': ['q_reject', '0', 'R'],
            'q_verify,1': ['q_reject', '1', 'R'],

            'q_verify2,X': ['q_verify2', 'X', 'R'],
            'q_verify2,Y': ['q_verify2', 'Y', 'R'],
            'q_verify2,⊔': ['q_accept', '⊔', 'R'],
            'q_verify2,0': ['q_reject', '0', 'R'],
            'q_verify2,1': ['q_reject', '1', 'R'],
        },
    },

};

const UIController = (() => {


    let machine = null;
    let currentMachineKey = 'binary-increment';
    let autoRunTimer = null;
    let isRunning = false;
    let stepLimit = 500;
    let lastMoveDir = null;
    let pendingWrittenCell = null;

    const $ = id => document.getElementById(id);
    const q = sel => document.querySelector(sel);

    const el = {
        tapeTrack: $('tape-track'),
        tapeCells: $('tape-cells'),
        tapeIndices: $('tape-indices'),
        headIndicator: $('head-indicator'),
        headLabel: $('head-label'),
        statusBanner: $('status-banner'),
        statusDot: $('status-dot'),
        statusText: $('status-text'),
        statState: $('stat-state'),
        statSymbol: $('stat-symbol'),
        statStep: $('stat-step'),
        statHead: $('stat-head'),
        tdFrom: $('td-from'),
        tdRead: $('td-read'),
        tdWrite: $('td-write'),
        tdMove: $('td-move'),
        tdTo: $('td-to'),
        historyList: $('history-list'),
        ttContainer: $('transition-table-container'),
        runBtn: $('run-btn'),
        pauseBtn: $('pause-btn'),
        stepBtn: $('step-btn'),
        resetBtn: $('reset-btn'),
        stopBtn: $('stop-btn'),
        loadBtn: $('load-btn'),
        speedSlider: $('speed-slider'),
        speedValue: $('speed-value'),
        tapeInput: $('tape-input'),
        inputHint: $('input-hint'),
        machineDesc: $('machine-description'),
        loopWarning: $('loop-warning'),
        loopStepCount: $('loop-step-count'),
        resultOverlay: $('result-overlay'),
        resultBox: $('result-box'),
        resultIcon: $('result-icon'),
        resultTitle: $('result-title'),
        resultSub: $('result-subtitle'),
        customCard: $('custom-card'),
        customError: $('custom-error'),
        customInitial: $('custom-initial'),
        customAccept: $('custom-accept'),
        customReject: $('custom-reject'),
        customTrans: $('custom-transitions'),
        tapeSection: q('.tape-section'),
        stateCanvas: $('state-canvas'),
    };


    function getDelay() {
        const v = parseInt(el.speedSlider.value);
        // speed 1 → 1500ms, speed 10 → 60ms (exponential)
        return Math.round(1500 * Math.pow(0.68, v - 1));
    }

    // Machine descriptions & examples 
    function getMachineConfig(key) {
        return PREDEFINED_MACHINES[key] || null;
    }

    function updateMachineUI(key) {
        const conf = getMachineConfig(key);
        if (!conf || key === 'custom') {
            el.machineDesc.innerHTML = '<p>Define a custom Turing Machine below using the JSON transition format.</p>';
            return;
        }
        const exBtns = conf.examples.map(e => `<button class="example-btn" data-input="${e}">${e}</button>`).join('');
        el.machineDesc.innerHTML = `
      <p>${conf.description}</p>
      <div class="example-inputs">
        <span class="label">Examples:</span>
        ${exBtns}
      </div>
    `;
        if (conf.exampleHints && conf.exampleHints[0]) {
            el.inputHint.textContent = conf.exampleHints[0];
        }
        // Attach example btn events
        el.machineDesc.querySelectorAll('.example-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                el.tapeInput.value = btn.dataset.input;
                loadMachine();
            });
        });
    }

    // Load/Initialize machine
    function loadMachine() {
        const input = el.tapeInput.value.trim();
        const key = currentMachineKey;

        if (key === 'custom') {
            loadCustomMachine(input);
            return;
        }

        const conf = getMachineConfig(key);
        if (!conf) return;

        // Validate input
        if (input.length > 0) {
            for (const ch of input) {
                if (!conf.alphabet.includes(ch) && ch !== '⊔') {
                    showInputError(`Invalid character '${ch}'. Allowed: ${conf.alphabet.join(', ')}`);
                    return;
                }
            }
        }
        clearInputError();

        machine = new TuringMachine(conf);
        machine.inputString = input;
        machine.reset(input);

        el.tapeSection.classList.remove('accepted', 'rejected');
        el.loopWarning.classList.add('hidden');
        el.resultOverlay.classList.add('hidden');
        lastMoveDir = null;

        renderAll();
        setStatus('ready');
        renderTransitionTable();
        renderStateDiagram();
    }

    function loadCustomMachine(input) {
        el.customError.classList.add('hidden');
        try {
            const initialState = el.customInitial.value.trim() || 'q0';
            const acceptStates = el.customAccept.value.split(',').map(s => s.trim()).filter(Boolean);
            const rejectStates = el.customReject.value.split(',').map(s => s.trim()).filter(Boolean);
            const transRaw = el.customTrans.value.trim();

            if (!transRaw) throw new Error('Transitions cannot be empty.');

            let transitions;
            try {
                transitions = JSON.parse(transRaw);
            } catch (e) {
                throw new Error('Invalid JSON in transitions. ' + e.message);
            }

            // Normalize transitions: map "state," (empty symbol) to "state,⊔"
            // and map write symbol "" to "⊔" so the engine stays consistent
            const normalized = {};
            for (const [key, val] of Object.entries(transitions)) {
                if (!key.includes(',')) throw new Error(`Key "${key}" must be "state,symbol".`);
                if (!Array.isArray(val) || val.length !== 3) throw new Error(`Rule for "${key}" must be [newState, writeSymbol, direction].`);
                if (!['L', 'R'].includes(val[2])) throw new Error(`Direction in "${key}" must be 'L' or 'R'.`);

                const commaIdx = key.indexOf(',');
                const state = key.slice(0, commaIdx);
                let sym = key.slice(commaIdx + 1);
                // Empty symbol → blank
                if (sym === '') sym = '⊔';
                const normKey = `${state},${sym}`;

                const [newState, writeSymbol, direction] = val;
                // Empty write symbol → blank
                const normWrite = (writeSymbol === '') ? '⊔' : writeSymbol;
                normalized[normKey] = [newState, normWrite, direction];
            }
            transitions = normalized;

            const conf = {
                name: 'Custom Machine',
                description: 'User-defined Turing Machine.',
                alphabet: [],
                initialState, acceptStates, rejectStates, transitions,
            };
            machine = new TuringMachine(conf);
            machine.inputString = input;
            machine.reset(input);

            el.tapeSection.classList.remove('accepted', 'rejected');
            el.loopWarning.classList.add('hidden');
            el.resultOverlay.classList.add('hidden');
            lastMoveDir = null;

            renderAll();
            setStatus('ready');
            renderTransitionTable();
            renderStateDiagram();

        } catch (err) {
            el.customError.textContent = err.message;
            el.customError.classList.remove('hidden');
        }
    }

    // Tape Rendering
    function renderTape() {
        if (!machine) return;
        const tape = machine.tape;
        const { lo, hi } = tape.getVisibleRange(8);
        const cells = el.tapeCells;
        const indices = el.tapeIndices;
        cells.innerHTML = '';
        indices.innerHTML = '';

        for (let i = lo; i <= hi; i++) {
            const sym = tape.getCell(i);
            const div = document.createElement('div');
            div.className = 'tape-cell';
            div.dataset.idx = i;

            const isBlank = sym === '⊔';
            const isHead = i === tape.head;
            const isChanged = tape.changedCells.has(i);
            const isLastWritten = i === tape.lastWritten;

            if (isBlank) div.classList.add('blank');
            if (isHead) div.classList.add('head');
            if (isChanged && !isHead) div.classList.add('changed');
            if (isHead && isChanged) div.classList.add('changed');

            if (machine.accepted) div.classList.add('accept-final');
            if (machine.rejected) div.classList.add('reject-final');

            div.textContent = sym;
            cells.appendChild(div);

            // Index label
            const idxEl = document.createElement('div');
            idxEl.className = 'tape-index';
            if (isHead) idxEl.classList.add('head-idx');
            idxEl.textContent = i;
            indices.appendChild(idxEl);

            // flash written
            if (isLastWritten && !isHead) {
                requestAnimationFrame(() => div.classList.add('written-now'));
            }
        }

        // Apply move animation class
        if (lastMoveDir) {
            el.tapeCells.parentElement.classList.remove('head-moved-right', 'head-moved-left');
            requestAnimationFrame(() => {
                if (lastMoveDir === 'R') el.tapeCells.parentElement.classList.add('head-moved-right');
                else el.tapeCells.parentElement.classList.add('head-moved-left');
                setTimeout(() => {
                    el.tapeCells.parentElement.classList.remove('head-moved-right', 'head-moved-left');
                }, 300);
            });
        }

        // Update head label
        el.headLabel.textContent = machine.state || '—';

        // Scroll tape to center on head
        scrollToHead(lo, hi);
    }

    function scrollToHead(lo, hi) {
        const cellW = 56; // 52px + 4px gap
        const track = el.tapeTrack;
        const trackWidth = track.clientWidth || track.offsetWidth || 400;
        const headOffsetInCells = machine.tape.head - lo;
        const center = trackWidth / 2 - 26;
        const translateX = center - headOffsetInCells * cellW;
        el.tapeCells.style.transform = 'translateX(' + translateX + 'px)';
        el.tapeCells.style.padding = '0';
        el.tapeIndices.style.transform = 'translateX(' + translateX + 'px)';
        el.tapeIndices.style.padding = '0';
        track.scrollLeft = 0;
    }

    // Status Rendering
    function setStatus(status, text) {
        el.statusDot.className = 'status-dot';
        switch (status) {
            case 'ready':
                el.statusDot.classList.add('ready');
                el.statusText.textContent = text || 'Ready';
                break;
            case 'running':
                el.statusDot.classList.add('running');
                el.statusText.textContent = text || 'Running';
                break;
            case 'accept':
                el.statusDot.classList.add('accept');
                el.statusText.textContent = text || 'ACCEPTED';
                break;
            case 'reject':
                el.statusDot.classList.add('reject');
                el.statusText.textContent = text || 'REJECTED';
                break;
            default:
                el.statusText.textContent = text || 'Ready';
        }
    }

    function updateStats() {
        if (!machine) return;
        el.statState.textContent = machine.state || '—';
        el.statSymbol.textContent = machine.tape.read();
        el.statStep.textContent = machine.stepCount;
        el.statHead.textContent = machine.tape.head;
    }

    // Transition Display
    function updateTransitionDisplay(hist) {
        if (!hist || !hist.transition) {
            el.tdFrom.textContent = '—';
            el.tdRead.textContent = '—';
            el.tdWrite.textContent = '—';
            el.tdMove.textContent = '—';
            el.tdTo.textContent = '—';
            return;
        }
        const t = hist.transition;
        el.tdFrom.textContent = t.from;
        el.tdRead.textContent = t.read;
        el.tdWrite.textContent = t.write;
        el.tdMove.textContent = t.direction;
        el.tdTo.textContent = t.to;
    }

    // History Panel
    function updateHistory() {
        if (!machine || machine.history.length === 0) {
            el.historyList.innerHTML = '<div class="history-empty">No steps yet.</div>';
            return;
        }
        const items = machine.history.map((h, i) => {
            let cls = 'history-item';
            if (h.result === 'accept') cls += ' hi-accept';
            if (h.result === 'reject') cls += ' hi-reject';
            if (i === machine.history.length - 1) cls += ' active-step';

            let transText = '(no transition — halted)';
            if (h.transition) {
                const t = h.transition;
                transText = `(${t.read}) → write ${t.write}, move ${t.direction}, → ${t.to}`;
            }

            return `<div class="${cls}" data-step="${i}">
        <span class="hi-step">${h.step}</span>
        <div class="hi-body">
          <span class="hi-state">${h.state}</span>
          <span class="hi-trans">${transText}</span>
        </div>
      </div>`;
        }).join('');

        el.historyList.innerHTML = items;
        // Scroll to bottom
        // Scroll within the list container only — does not affect page scroll
        requestAnimationFrame(() => { el.historyList.scrollTop = el.historyList.scrollHeight; });
    }

    // Transition Table
    function renderTransitionTable() {
        if (!machine) return;
        const trans = machine.transitions;
        const keys = Object.keys(trans);

        if (keys.length === 0) {
            el.ttContainer.innerHTML = '<div style="padding:12px;font-size:12px;color:var(--text3);text-align:center">No transitions defined</div>';
            return;
        }

        const rows = keys.map(key => {
            const [state, sym] = key.split(',');
            const [nState, write, dir] = trans[key];
            const isActive = machine && machine.lastTransitionKey === key;
            return `<tr class="${isActive ? 'active-row' : ''}">
        <td class="tt-state">${state}</td>
        <td class="tt-symbol">${sym}</td>
        <td class="tt-state">${nState}</td>
        <td class="tt-symbol">${write}</td>
        <td class="tt-dir">${dir}</td>
      </tr>`;
        }).join('');

        el.ttContainer.innerHTML = `
      <table class="tt-table">
        <thead>
          <tr>
            <th>State</th><th>Read</th><th>New State</th><th>Write</th><th>Dir</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;

        // Scroll active row into view
        const activeRow = el.ttContainer.querySelector('.active-row');
        if (activeRow) {
            const container = el.ttContainer;
            const rowTop = activeRow.offsetTop;
            const rowH = activeRow.offsetHeight;
            const cTop = container.scrollTop;
            const cH = container.clientHeight;
            if (rowTop < cTop || rowTop + rowH > cTop + cH) {
                container.scrollTop = rowTop - cH / 2 + rowH / 2;
            }
        }
    }

    // State Diagram (Canvas)
    function renderStateDiagram() {
        if (!machine) return;
        const canvas = el.stateCanvas;
        const ctx = canvas.getContext('2d');
        const W = canvas.width, H = canvas.height;
        ctx.clearRect(0, 0, W, H);

        const states = machine.getAllStates();
        const n = states.length;
        const cx = W / 2, cy = H / 2;
        const r = Math.min(W, H) * 0.32;
        const nodeR = 22;

        // Layout states in a circle
        const positions = {};
        states.forEach((s, i) => {
            const angle = (2 * Math.PI * i / n) - Math.PI / 2;
            positions[s] = {
                x: cx + r * Math.cos(angle),
                y: cy + r * Math.sin(angle),
            };
        });

        // Draw transitions (edges)
        ctx.save();
        ctx.strokeStyle = '#3a4560';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);

        for (const key of Object.keys(machine.transitions)) {
            const [from] = key.split(',');
            const to = machine.transitions[key][0];
            if (!positions[from] || !positions[to]) continue;
            const p1 = positions[from], p2 = positions[to];

            ctx.beginPath();
            if (from === to) {
                // Self-loop
                ctx.arc(p1.x, p1.y - nodeR - 8, 12, 0, Math.PI * 2);
            } else {
                const dx = p2.x - p1.x, dy = p2.y - p1.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const ux = dx / dist, uy = dy / dist;
                const sx = p1.x + ux * nodeR, sy = p1.y + uy * nodeR;
                const ex = p2.x - ux * nodeR, ey = p2.y - uy * nodeR;
                ctx.moveTo(sx, sy);
                ctx.lineTo(ex, ey);
            }
            ctx.stroke();
        }
        ctx.setLineDash([]);
        ctx.restore();

        // Draw nodes
        states.forEach(s => {
            const { x, y } = positions[s];
            const isAccept = machine.acceptStates.has(s);
            const isReject = machine.rejectStates.has(s);
            const isInitial = s === machine.initialState;
            const isCurrent = machine && machine.state === s && !machine.halted;
            const isHaltAcc = machine.accepted && s === machine.state;
            const isHaltRej = machine.rejected && s === machine.state;

            ctx.save();

            // Fill
            if (isHaltAcc || (isAccept && isCurrent)) {
                ctx.fillStyle = 'rgba(34,197,94,0.25)';
            } else if (isHaltRej || (isReject && isCurrent)) {
                ctx.fillStyle = 'rgba(239,68,68,0.25)';
            } else if (isCurrent) {
                ctx.fillStyle = 'rgba(240,160,0,0.2)';
            } else if (isAccept) {
                ctx.fillStyle = 'rgba(34,197,94,0.1)';
            } else if (isReject) {
                ctx.fillStyle = 'rgba(239,68,68,0.1)';
            } else {
                ctx.fillStyle = 'rgba(30,37,48,0.9)';
            }

            // Stroke
            if (isHaltAcc || isAccept) ctx.strokeStyle = '#22c55e';
            else if (isHaltRej || isReject) ctx.strokeStyle = '#ef4444';
            else if (isCurrent) ctx.strokeStyle = '#f0a000';
            else ctx.strokeStyle = '#3a4560';
            ctx.lineWidth = isCurrent ? 2.5 : 1;

            ctx.beginPath();
            ctx.arc(x, y, nodeR, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Double ring for accept
            if (isAccept) {
                ctx.beginPath();
                ctx.arc(x, y, nodeR - 4, 0, Math.PI * 2);
                ctx.stroke();
            }

            // Label
            ctx.fillStyle = isCurrent ? '#f0a000' : isAccept ? '#22c55e' : isReject ? '#ef4444' : '#8b9ab8';
            ctx.font = `${isCurrent ? '600' : '400'} 10px JetBrains Mono, monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Truncate long state names
            const label = s.length > 6 ? s.slice(0, 5) + '…' : s;
            ctx.fillText(label, x, y);

            // Initial arrow
            if (isInitial) {
                ctx.strokeStyle = '#566080';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(x - nodeR - 18, y);
                ctx.lineTo(x - nodeR - 2, y);
                ctx.stroke();
                // arrowhead
                ctx.fillStyle = '#566080';
                ctx.beginPath();
                ctx.moveTo(x - nodeR - 2, y);
                ctx.lineTo(x - nodeR - 8, y - 4);
                ctx.lineTo(x - nodeR - 8, y + 4);
                ctx.closePath();
                ctx.fill();
            }

            ctx.restore();
        });
    }

    // Master render
    function renderAll() {
        renderTape();
        updateStats();

        const lastHist = machine ? machine.history[machine.history.length - 1] : null;
        updateTransitionDisplay(lastHist);
        updateHistory();
        renderTransitionTable();
        renderStateDiagram();
    }

    // Step execution
    function doStep() {
        if (!machine || machine.halted) return;

        // Track move direction for animation
        const prevHead = machine.tape.head;
        machine.step();
        const newHead = machine.tape.head;
        lastMoveDir = newHead > prevHead ? 'R' : newHead < prevHead ? 'L' : null;

        renderAll();

        if (machine.halted) {
            stopAutoRun();
            onHalt();
        }
    }

    function onHalt() {
        if (machine.accepted) {
            el.tapeSection.classList.add('accepted');
            setStatus('accept');
            showResult('accept');
        } else {
            el.tapeSection.classList.remove('accepted');
            el.tapeSection.classList.add('rejected');
            setStatus('reject');
            showResult('reject');
        }
        setControlsHalted();
    }

    function showResult(kind) {
        el.resultOverlay.classList.remove('hidden');
        el.resultBox.className = 'result-box ' + kind;
        if (kind === 'accept') {
            el.resultIcon.textContent = '✓';
            el.resultTitle.textContent = 'ACCEPTED';
            el.resultSub.textContent = `Halted in accept state "${machine.state}" after ${machine.stepCount} steps`;
        } else {
            el.resultIcon.textContent = '✗';
            el.resultTitle.textContent = 'REJECTED';
            el.resultSub.textContent = `Halted in reject/no-transition state "${machine.state}" after ${machine.stepCount} steps`;
        }
    }

    // Auto-run
    function startAutoRun() {
        if (isRunning || !machine || machine.halted) return;
        isRunning = true;
        el.runBtn.classList.add('hidden');
        el.pauseBtn.classList.remove('hidden');
        setStatus('running');
        scheduleStep();
    }

    function scheduleStep() {
        if (!isRunning) return;
        autoRunTimer = setTimeout(() => {
            if (!machine || machine.halted || !isRunning) {
                stopAutoRun();
                return;
            }
            // Infinite loop guard
            if (machine.stepCount >= stepLimit) {
                stopAutoRun();
                el.loopStepCount.textContent = machine.stepCount;
                el.loopWarning.classList.remove('hidden');
                setStatus('ready', 'Stopped');
                return;
            }
            doStep();
            if (!machine.halted && isRunning) {
                scheduleStep();
            }
        }, getDelay());
    }

    function stopAutoRun() {
        isRunning = false;
        clearTimeout(autoRunTimer);
        el.runBtn.classList.remove('hidden');
        el.pauseBtn.classList.add('hidden');
    }

    function pauseAutoRun() {
        stopAutoRun();
        if (!machine.halted) setStatus('ready', 'Paused');
    }

    function setControlsHalted() {
        el.stepBtn.disabled = true;
        el.runBtn.disabled = true;
    }
    function setControlsActive() {
        el.stepBtn.disabled = false;
        el.runBtn.disabled = false;
    }

    // Input validation
    function showInputError(msg) {
        el.inputHint.textContent = msg;
        el.inputHint.classList.add('error');
        el.tapeInput.style.borderColor = 'var(--red)';
    }
    function clearInputError() {
        el.inputHint.classList.remove('error');
        el.tapeInput.style.borderColor = '';
        const conf = getMachineConfig(currentMachineKey);
        if (conf && conf.exampleHints) el.inputHint.textContent = conf.exampleHints[0] || '';
        else el.inputHint.textContent = '';
    }

    // Event Binding 
    function bindEvents() {
        // Machine selector
        document.querySelectorAll('.machine-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.machine-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentMachineKey = btn.dataset.machine;
                stopAutoRun();
                machine = null;

                if (currentMachineKey === 'custom') {
                    el.customCard.classList.remove('hidden');
                } else {
                    el.customCard.classList.add('hidden');
                }

                updateMachineUI(currentMachineKey);
                clearInputError();

                // Auto-load first example
                const conf = getMachineConfig(currentMachineKey);
                if (conf && conf.examples) {
                    el.tapeInput.value = conf.examples[0];
                    loadMachine();
                } else if (currentMachineKey === 'custom') {
                    el.tapeInput.value = '';
                    el.tapeCells.innerHTML = '';
                    el.tapeIndices.innerHTML = '';
                    el.historyList.innerHTML = '<div class="history-empty">Define and load a custom machine.</div>';
                }
            });
        });

        // Load button
        el.loadBtn.addEventListener('click', loadMachine);
        el.tapeInput.addEventListener('keydown', e => { if (e.key === 'Enter') loadMachine(); });

        // Controls
        el.stepBtn.addEventListener('click', () => { if (!machine) return; doStep(); });
        el.runBtn.addEventListener('click', startAutoRun);
        el.pauseBtn.addEventListener('click', pauseAutoRun);
        el.stopBtn.addEventListener('click', () => { stopAutoRun(); if (machine) setStatus('ready', 'Stopped'); });
        el.resetBtn.addEventListener('click', () => {
            stopAutoRun();
            if (!machine) return;
            machine.reset(machine.inputString);
            el.tapeSection.classList.remove('accepted', 'rejected');
            el.loopWarning.classList.add('hidden');
            el.resultOverlay.classList.add('hidden');
            lastMoveDir = null;
            setStatus('ready');
            setControlsActive();
            renderAll();
        });

        // Speed slider
        el.speedSlider.addEventListener('input', () => {
            el.speedValue.textContent = el.speedSlider.value;
        });

        // Dismiss loop warning
        el.loopWarning.querySelector('#loop-dismiss').addEventListener('click', () => {
            el.loopWarning.classList.add('hidden');
        });

        // Result overlay dismiss
        $('result-dismiss').addEventListener('click', () => {
            el.resultOverlay.classList.add('hidden');
        });

        // Validate custom
        $('validate-custom-btn').addEventListener('click', () => {
            loadCustomMachine(el.tapeInput.value.trim());
        });

        // Toggle collapsible sections
        ['table-toggle', 'history-toggle', 'info-toggle'].forEach(id => {
            const btn = $(id);
            if (!btn) return;
            const targetMap = {
                'table-toggle': 'transition-table-wrapper',
                'history-toggle': 'history-wrapper',
                'info-toggle': 'info-wrapper',
            };
            btn.addEventListener('click', () => {
                const target = $(targetMap[id]);
                if (!target) return;
                const isCollapsed = target.style.display === 'none';
                target.style.display = isCollapsed ? '' : 'none';
                btn.classList.toggle('collapsed', !isCollapsed);
            });
        });


        el.speedSlider.addEventListener('input', () => {
            const v = parseInt(el.speedSlider.value);
            stepLimit = 500 + (v * 100);
        });
    }


    function init() {
        bindEvents();
        updateMachineUI('binary-increment');
        el.tapeInput.value = '1011';
        loadMachine();
        el.speedValue.textContent = el.speedSlider.value;
    }

    return { init };

})();

document.addEventListener('DOMContentLoaded', () => {
    UIController.init();
});