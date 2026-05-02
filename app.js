/* ===========================
   C# STUDY HUB — app.js
=========================== */

let editor = null;
let answerEditor = null;
let currentQuestion = null;
let seenIds = new Set();

/* ===========================
   MONACO INIT
=========================== */
require.config({ paths: { vs: 'https://unpkg.com/monaco-editor@0.45.0/min/vs' } });

require(['vs/editor/editor.main'], function () {

  // Main editable editor
  editor = monaco.editor.create(document.getElementById('editor-container'), {
    value: defaultEditorText(),
    language: 'csharp',
    theme: 'vs-dark',
    fontSize: 14,
    fontFamily: '"Cascadia Code", "Fira Code", Consolas, monospace',
    fontLigatures: true,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: 4,
    insertSpaces: true,
    wordWrap: 'on',
    lineNumbers: 'on',
    renderLineHighlight: 'line',
    smoothScrolling: true,
    cursorSmoothCaretAnimation: 'on',
    bracketPairColorization: { enabled: true },
    padding: { top: 12, bottom: 12 },
  });

  // Read-only answer editor
  answerEditor = monaco.editor.create(document.getElementById('answer-editor-container'), {
    value: '',
    language: 'csharp',
    theme: 'vs-dark',
    fontSize: 13,
    fontFamily: '"Cascadia Code", "Fira Code", Consolas, monospace',
    minimap: { enabled: false },
    readOnly: true,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: 4,
    wordWrap: 'on',
    lineNumbers: 'on',
    renderLineHighlight: 'none',
    padding: { top: 12, bottom: 12 },
  });

  initUI();
});

function defaultEditorText() {
  return [
    '// Welcome to C# Study Hub!',
    '//',
    '// Click "Random Question" in the top-right to get started.',
    '// Write your solution here, then click "Show Answer" to check.',
    '',
    'using System;',
    '',
    'public class Demo',
    '{',
    '    public static void Run()',
    '    {',
    '        Console.WriteLine("Ready!");',
    '    }',
    '}',
  ].join('\n');
}

/* ===========================
   UI INIT
=========================== */
function initUI() {
  buildQuestionGrid();
  buildModal();

  document.getElementById('btn-random').addEventListener('click', loadRandomQuestion);
  document.getElementById('btn-reset').addEventListener('click', resetEditor);
  document.getElementById('btn-copy').addEventListener('click', copyEditorCode);
  document.getElementById('btn-show-answer').addEventListener('click', toggleAnswer);
  document.getElementById('btn-close-answer').addEventListener('click', hideAnswer);
  document.getElementById('btn-copy-answer').addEventListener('click', copyAnswerCode);
  document.getElementById('btn-prev').addEventListener('click', loadPrev);
  document.getElementById('btn-next').addEventListener('click', loadNext);
  document.getElementById('btn-browse').addEventListener('click', openModal);
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-overlay').addEventListener('click', function (e) {
    if (e.target === this) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });
}

/* ===========================
   QUESTION GRID (placeholder)
=========================== */
function buildQuestionGrid() {
  const grid = document.getElementById('question-grid');
  QUESTIONS.forEach(function (q) {
    const btn = document.createElement('button');
    btn.className = 'q-grid-btn';
    btn.textContent = q.id;
    btn.title = q.title;
    btn.addEventListener('click', function () { loadQuestion(q); });
    grid.appendChild(btn);
  });
}

/* ===========================
   MODAL (browse all)
=========================== */
function buildModal() {
  const body = document.getElementById('modal-body');
  QUESTIONS.forEach(function (q) {
    const item = document.createElement('div');
    item.className = 'modal-q-item';
    item.innerHTML = `
      <span class="modal-q-num">#${q.id}</span>
      <span class="modal-q-title">${q.title}</span>
      <span class="difficulty-badge difficulty-${q.difficulty.toLowerCase()}">${q.difficulty}</span>
    `;
    item.addEventListener('click', function () {
      loadQuestion(q);
      closeModal();
    });
    body.appendChild(item);
  });
}

function openModal() { document.getElementById('modal-overlay').classList.remove('hidden'); }
function closeModal() { document.getElementById('modal-overlay').classList.add('hidden'); }

/* ===========================
   LOAD QUESTION
=========================== */
function loadRandomQuestion() {
  const remaining = QUESTIONS.filter(function (q) { return !seenIds.has(q.id); });
  const pool = remaining.length > 0 ? remaining : QUESTIONS;
  const q = pool[Math.floor(Math.random() * pool.length)];
  loadQuestion(q);
}

function loadQuestion(question) {
  currentQuestion = question;
  seenIds.add(question.id);

  // Switch from placeholder to content
  document.getElementById('placeholder-state').classList.add('hidden');
  document.getElementById('question-content').classList.remove('hidden');

  // Question meta
  document.getElementById('q-number').textContent = 'Q' + question.id;
  document.getElementById('q-title').textContent = question.title;

  const diffEl = document.getElementById('q-difficulty');
  diffEl.textContent = question.difficulty;
  diffEl.className = 'difficulty-badge difficulty-' + question.difficulty.toLowerCase();

  // Tags
  const tagsEl = document.getElementById('q-tags');
  tagsEl.innerHTML = question.tags.map(function (t) {
    return '<span class="tag">' + escHtml(t) + '</span>';
  }).join('');

  // Description (already safe HTML from questions.js)
  document.getElementById('q-description').innerHTML = question.description;

  // Hint
  document.getElementById('q-hint').textContent = question.hint;
  document.getElementById('hint-details').removeAttribute('open');

  // Editor
  editor.setValue(question.starterCode);
  editor.setScrollPosition({ scrollTop: 0 });

  // Reset answer
  hideAnswer();

  // Progress
  document.getElementById('progress-label').textContent =
    'Q' + question.id + ' / ' + QUESTIONS.length;
}

function loadPrev() {
  if (!currentQuestion) return;
  const idx = QUESTIONS.findIndex(function (q) { return q.id === currentQuestion.id; });
  if (idx > 0) loadQuestion(QUESTIONS[idx - 1]);
}

function loadNext() {
  if (!currentQuestion) return;
  const idx = QUESTIONS.findIndex(function (q) { return q.id === currentQuestion.id; });
  if (idx < QUESTIONS.length - 1) loadQuestion(QUESTIONS[idx + 1]);
}

/* ===========================
   EDITOR ACTIONS
=========================== */
function resetEditor() {
  if (currentQuestion) {
    editor.setValue(currentQuestion.starterCode);
    showToast('Editor reset to starter code');
  }
}

function copyEditorCode() {
  const code = editor.getValue();
  navigator.clipboard.writeText(code).then(function () {
    showToast('Code copied to clipboard!');
  }).catch(function () {
    fallbackCopy(code);
  });
}

function copyAnswerCode() {
  const code = answerEditor.getValue();
  navigator.clipboard.writeText(code).then(function () {
    showToast('Answer copied to clipboard!');
  }).catch(function () {
    fallbackCopy(code);
  });
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px';
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  showToast('Code copied!');
}

/* ===========================
   ANSWER PANEL
=========================== */
function toggleAnswer() {
  const panel = document.getElementById('answer-panel');
  if (panel.classList.contains('hidden')) {
    showAnswer();
  } else {
    hideAnswer();
  }
}

function showAnswer() {
  if (!currentQuestion) {
    showToast('Load a question first!');
    return;
  }
  const panel = document.getElementById('answer-panel');
  panel.classList.remove('hidden');
  answerEditor.setValue(currentQuestion.answer);
  answerEditor.setScrollPosition({ scrollTop: 0 });

  const btn = document.getElementById('btn-show-answer');
  btn.textContent = '';
  btn.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
    Hide Answer`;
  btn.classList.add('active');
}

function hideAnswer() {
  const panel = document.getElementById('answer-panel');
  panel.classList.add('hidden');

  const btn = document.getElementById('btn-show-answer');
  btn.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
    Show Answer`;
  btn.classList.remove('active');
}

/* ===========================
   TOAST
=========================== */
let toastTimer = null;

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    toast.classList.add('hidden');
  }, 2200);
}

/* ===========================
   UTILS
=========================== */
function escHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
