// storage.js — localStorage版（Web/PWA用）

const STORAGE_KEY = 'math_gen_presets';

function getPresets() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}
function savePreset(index, name, settings) {
  const presets = getPresets();
  while (presets.length <= index) presets.push(null);
  presets[index] = { name, settings, savedAt: new Date().toISOString() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
}
function deletePreset(index) {
  const presets = getPresets();
  if (index >= 0 && index < presets.length) presets[index] = null;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
}
function saveLastSettings(settings) {
  localStorage.setItem('math_gen_last', JSON.stringify(settings));
}
function getLastSettings() {
  try { return JSON.parse(localStorage.getItem('math_gen_last')); }
  catch { return null; }
}
