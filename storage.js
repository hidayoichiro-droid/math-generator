// storage.js
const STORAGE_KEY = 'math_gen_presets';
function getPresets() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch { return []; } }
function savePreset(i, name, settings) {
  const p = getPresets(); while (p.length <= i) p.push(null);
  p[i] = { name, settings, savedAt: new Date().toISOString() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}
function deletePreset(i) {
  const p = getPresets(); if (i>=0 && i<p.length) p[i] = null;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}
function saveLastSettings(s) { localStorage.setItem('math_gen_last', JSON.stringify(s)); }
function getLastSettings() { try { return JSON.parse(localStorage.getItem('math_gen_last')); } catch { return null; } }
