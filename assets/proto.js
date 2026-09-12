/* ============================================================
   研学澄心 · 原型交互与图表引擎
   无依赖:原生 SVG 图表 / 弹层 / Toast / 签名板 / 主题切换
   图表配色经 /tmp/viz/validate_palette.js 验证(明暗两套,白卡表面)
   ============================================================ */

/* ---------------- 图标库(细线条, stroke 1.5, 继承 currentColor) ---------------- */
const ICONS = {
  logo: '<path d="M12 2.5 21 7v10l-9 4.5L3 17V7z"/><path d="M3 7l9 4.5L21 7"/><path d="M12 11.5V21.5"/><path d="M8 4.5 4 6.5M8 4.5v4"/>',
  home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1z"/>',
  dashboard: '<rect x="3" y="3" width="7.5" height="9" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="5.5" rx="1.5"/><rect x="13.5" y="12" width="7.5" height="9" rx="1.5"/><rect x="3" y="15.5" width="7.5" height="5.5" rx="1.5"/>',
  school: '<path d="M2 21h20M4 21V9l8-5 8 5v12"/><path d="M9 21v-6h6v6"/>',
  org: '<path d="M3 21h18M5 21V7l7-4 7 4v14"/><path d="M9 9h.01M15 9h.01M9 13h.01M15 13h.01M10 21v-4h4v4"/>',
  route: '<circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="5" r="2.5"/><path d="M8.5 19H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5"/>',
  audit: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m8 13 2.4 2.4L16.5 9"/>',
  wallet: '<rect x="3" y="6" width="18" height="14" rx="2.5"/><path d="M3 10h18M16 15.5h2"/>',
  shield: '<path d="M12 22s8-3.5 8-10V5.5L12 2 4 5.5V12c0 6.5 8 10 8 10z"/><path d="m8.8 12 2.2 2.2 4.4-4.4"/>',
  archive: '<rect x="3" y="3" width="18" height="5" rx="1.5"/><path d="M5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8M9 12.5h6"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  refresh: '<path d="M21 12a9 9 0 1 1-2.6-6.4"/><path d="M21 3v6h-6"/>',
  chevR: '<path d="m9 6 6 6-6 6"/>',
  chevL: '<path d="m15 6-6 6 6 6"/>',
  chevD: '<path d="m6 9 6 6 6-6"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.5 3-5.5 6.5-5.5s6.5 2 6.5 5.5"/><circle cx="17" cy="9" r="2.8"/><path d="M17.8 14.7c2.9.3 4.7 2 4.7 4.3"/>',
  file: '<path d="M14 2H6a1.5 1.5 0 0 0-1.5 1.5v17A1.5 1.5 0 0 0 6 22h12a1.5 1.5 0 0 0 1.5-1.5V7z"/><path d="M14 2v5h5M9 13h6M9 17h6"/>',
  download: '<path d="M12 3v12m0 0 4.5-4.5M12 15l-4.5-4.5"/><path d="M4 21h16"/>',
  upload: '<path d="M12 16V4m0 0 4.5 4.5M12 4 7.5 8.5"/><path d="M4 21h16"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  edit: '<path d="M17 3a2.8 2.8 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5z"/>',
  trash: '<path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M6 6l1 14.5A1.5 1.5 0 0 0 8.5 22h7a1.5 1.5 0 0 0 1.5-1.5L18 6"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  checkCircle: '<circle cx="12" cy="12" r="9"/><path d="m8.5 12.3 2.3 2.3 4.7-4.9"/>',
  warn: '<path d="M10.3 3.8 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.8a2 2 0 0 0-3.4 0z"/><path d="M12 9v4m0 4h.01"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
  timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 1.5M9 2h6"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 2z"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  calendar: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
  doc: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
  lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  more: '<circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/>',
  arrowR: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  bus: '<path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v11a1 1 0 0 1-1 1h-1"/><path d="M4 17h14a1 1 0 0 0 1-1v-4H3v4a1 1 0 0 0 1 1z"/><path d="M5 8h12M7.5 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM16.5 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>',
  heart: '<path d="M19.5 12.6 12 20l-7.5-7.4a5 5 0 1 1 7.5-6.6 5 5 0 1 1 7.5 6.6z"/>',
  flag: '<path d="M4 22V4c4-1.5 8-1.5 12 0v10c-4-1.5-8-1.5-12 0"/><path d="M4 22V14"/>',
  trend: '<path d="m3 17 6-6 4 4 8-8"/><path d="M14 7h7v7"/>',
  send: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
  alert: '<path d="M12 9v4m0 4h.01"/><path d="M10.3 3.8 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.8a2 2 0 0 0-3.4 0z"/>',
  umbrella: '<path d="M12 2a10 10 0 0 0-10 10c3-1 6 1.5 6 5h8c0-3.5 3-6 6-5a10 10 0 0 0-10-10z"/><path d="M12 12v7a2 2 0 0 0 4 0"/>',
  food: '<path d="M4 3h7a2 2 0 0 1 2 2v17H5a1 1 0 0 1-1-1z"/><path d="M7.5 3v18M13 8h3a4 4 0 0 1 4 4v10h-7"/>',
  band: '<path d="M12 3v18M5 7l14 10M19 7 5 17"/>',
  kids: '<circle cx="9" cy="9" r="4.5"/><path d="M2.5 19c0-3.2 2.9-5.5 6.5-5.5s6.5 2.3 6.5 5.5"/><circle cx="17.5" cy="10.5" r="3.2"/><path d="M16.5 14.5c3 .4 5 2 5 4.2"/>',
  kid: '<circle cx="12" cy="7" r="4"/><path d="M4 20c0-3.5 3.6-6 8-6s8 2.5 8 6M12 11v9"/>',
  filter: '<path d="M22 3H2l8 9.5V19l4 2v-8.5z"/>',
  settings: '<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.9 2.9l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.9-2.9l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.9-2.9l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.9 2.9l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.2a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.5 1z"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/>',
  msg: '<path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  bank: '<path d="M3 9.5 12 3l9 6.5"/><path d="M5 10v9m4.5-9v9m5-9v9m5-9v9"/><path d="M2.5 21h19"/>',
  print: '<path d="M6 9V3h12v6"/><rect x="6" y="14" width="12" height="7"/><path d="M6 18H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-2"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  video: '<rect x="2" y="5" width="14" height="14" rx="2"/><path d="m22 7-7 5 7 5z"/>',
  cert: '<circle cx="12" cy="9" r="6"/><path d="m8.8 9 2.1 2.1 4.3-4.3"/><path d="M10 14.5 9 22l3-2 3 2-1-7.5"/>',
  map: '<path d="m9 4-6 2v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
  pen: '<path d="M12 19l7-7a2.8 2.8 0 0 0-4-4l-7 7-1 5z"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L17 9"/>',
  pay: '<rect x="2" y="5" width="20" height="14" rx="2.5"/><path d="M2 10h20M6 15h4"/>',
  car: '<path d="m3 13 2-6a2 2 0 0 1 1.9-1.3h10.2A2 2 0 0 1 19 7l2 6"/><path d="M3 13h18a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-1.5"/><path d="M3 13v4a1 1 0 0 0 1 1h1.5M7.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM16.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>',
  siren: '<path d="M12 3a8 8 0 0 0-8 8v3l-1.5 3h19L20 14v-3a8 8 0 0 0-8-8z"/><path d="M12 3V1.5M4 4.5 2.5 3M20 4.5 21.5 3"/><circle cx="12" cy="17.5" r="1.6"/>',
  sun: '<circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/>',
  coin: '<circle cx="12" cy="12" r="9"/><path d="M12 7v10M8.8 9.2c0-1.2 1.3-2 3.2-2s3.2.8 3.2 2-1 1.9-3.2 2.2c-2.2.3-3.2 1-3.2 2.2s1.3 2 3.2 2 3.2-.8 3.2-2"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
  award: '<circle cx="12" cy="9" r="6"/><path d="m8.8 8.9 2.1 2.1 4.4-4.5"/><path d="m9 14.5-1 7 4-2.2 4 2.2-1-7"/>',
  copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  compare: '<path d="M4 5h6v6H4zM14 13h6v6h-6z"/><path d="m4 14 10-5M14 19l-10-5"/>',
  export: '<path d="M12 15V3m0 0L8 7m4-4 4 4"/><path d="M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"/>',
  wechat: '<path d="M9.5 4C5.4 4 2 6.8 2 10.3c0 2 1.1 3.8 2.9 5l-.7 2.2 2.5-1.3c.9.3 1.8.4 2.8.4"/><path d="M17 9.5c3.5 0 6.3 2.5 6.3 5.5 0 1.8-1 3.4-2.6 4.4l.6 1.9-2.2-1.1c-.6.1-1.3.2-2.1.2-3.5 0-6.3-2.5-6.3-5.5S13.5 9.5 17 9.5z"/><path d="M6.5 8h.01M12.5 8h.01M13.5 14h.01M20.5 14h.01"/>',
  qrcode: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14h1M14 20h1M17 17h1v3h2"/>',
  back: '<path d="M19 12H5m0 0 6 6m-6-6 6-6"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/>',
  excel: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 12 3 4m0-4-3 4M14 16h3"/>',
  building: '<rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M9 21v-4h6v4M8 7h.01M12 7h.01M16 7h.01M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01"/>',
  cloud: '<path d="M17.5 19a4.5 4.5 0 0 0 .4-9A6 6 0 0 0 6 8.5 4 4 0 0 0 6.5 19z"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10z"/><path d="M2 21c0-3 1.9-5.5 4.5-7"/>',
};

function I(name, size = 16, sw = 1.5) {
  const p = ICONS[name] || ICONS.warn;
  if (!ICONS[name]) console.warn('missing icon: ' + name);
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
}
window.I = I;

/* ---------------- 通用工具 ---------------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const fmtMoney = (n) => '¥' + Number(n).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtInt = (n) => Number(n).toLocaleString('zh-CN');
const fmtPct = (n, d = 1) => Number(n).toFixed(d) + '%';
window.fmtMoney = fmtMoney; window.fmtInt = fmtInt;

function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
window.esc = esc;

function initIcons() {
  $$('[data-icon]').forEach(el => {
    const name = el.dataset.icon, size = +el.dataset.size || 16, sw = +el.dataset.sw || 1.5;
    el.innerHTML = I(name, size, sw);
    el.style.display = 'inline-flex';
    el.style.alignItems = 'center';
    el.style.justifyContent = 'center';
  });
}

/* ---------------- 主题切换 ---------------- */
function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  $$('[data-theme-ic]').forEach(el => { el.innerHTML = I(t === 'dark' ? 'sun' : 'moon', 16); });
  try { localStorage.setItem('yx_theme_v5', t); } catch (e) {}
}
function initTheme() {
  let t = 'light';
  try { t = localStorage.getItem('yx_theme_v5') || 'light'; } catch (e) {}
  try { const q = new URLSearchParams(location.search).get('theme'); if (q === 'dark' || q === 'light') t = q; } catch (e) {}
  applyTheme(t);
  $$('[data-theme-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(cur);
      Toast(cur === 'dark' ? '已切换至暗色主题' : '已切换至明色主题', 'ok');
    });
  });
}

/* ---------------- Toast ---------------- */
function Toast(msg, type = 'ok') {
  let zone = $('.toast-zone');
  if (!zone) { zone = document.createElement('div'); zone.className = 'toast-zone'; document.body.appendChild(zone); }
  const t = document.createElement('div');
  t.className = 'toast ' + (type || '');
  const ic = type === 'ok' ? 'checkCircle' : type === 'warn' ? 'warn' : 'info';
  t.innerHTML = `<span class="t-ic" style="display:inline-flex">${I(ic, 15)}</span><span>${esc(msg)}</span>`;
  zone.appendChild(t);
  setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 220); }, 2600);
}
window.Toast = Toast;

/* ---------------- 弹窗 / 抽屉 ---------------- */
function openModal(html, { width = '' } = {}) {
  const mask = document.createElement('div');
  mask.className = 'overlay-mask';
  mask.innerHTML = `<div class="modal ${width}"><div class="modal-inner">${html}</div></div>`;
  mask.addEventListener('click', e => { if (e.target === mask) closeOverlay(mask); });
  $$('.modal .modal-inner [data-close]', mask).forEach(b => b.addEventListener('click', () => closeOverlay(mask)));
  document.body.appendChild(mask);
  requestAnimationFrame(() => mask.classList.add('show'));
  return mask;
}
function closeOverlay(el) {
  el.classList.remove('show');
  setTimeout(() => el.remove(), 200);
}
function openDrawer(html, { width = '' } = {}) {
  const mask = document.createElement('div');
  mask.className = 'drawer-mask';
  mask.innerHTML = `<aside class="drawer ${width}"><div class="drawer-inner">${html}</div></aside>`;
  mask.addEventListener('click', e => { if (e.target === mask) closeOverlay(mask); });
  $$('.drawer .drawer-inner [data-close]', mask).forEach(b => b.addEventListener('click', () => closeOverlay(mask)));
  document.body.appendChild(mask);
  requestAnimationFrame(() => mask.classList.add('show'));
  return mask;
}
window.openModal = openModal; window.openDrawer = openDrawer; window.closeOverlay = closeOverlay;

/* ---------------- 页签 ---------------- */
function initTabs() {
  $$('[data-tabs]').forEach(group => {
    const tabs = $$(':scope > .tabs > .tab', group);
    const panes = $$(':scope > .tab-pane', group);
    tabs.forEach((t, i) => t.addEventListener('click', () => {
      tabs.forEach(x => x.classList.remove('on'));
      panes.forEach(x => x.classList.remove('on'));
      t.classList.add('on');
      if (panes[i]) panes[i].classList.add('on');
    }));
  });
}

/* ---------------- 下拉菜单 ---------------- */
function initDrops() {
  $$('.drop').forEach(d => {
    const btn = d.querySelector('[data-drop-btn]');
    if (!btn) return;
    btn.addEventListener('click', e => {
      e.stopPropagation();
      $$('.drop.open').forEach(o => { if (o !== d) o.classList.remove('open'); });
      d.classList.toggle('open');
    });
  });
  document.addEventListener('click', () => $$('.drop.open').forEach(o => o.classList.remove('open')));
}

/* ---------------- 开关 / 复选胶囊 ---------------- */
function initSwitches() {
  $$('.switch').forEach(s => s.addEventListener('click', () => {
    s.classList.toggle('on');
    Toast(s.classList.contains('on') ? '已开启' : '已关闭', 'ok');
  }));
}
function initCheckPills() {
  $$('.check-pill').forEach(p => p.addEventListener('click', () => p.classList.toggle('on')));
}

/* ---------------- 搜索/筛选(表格行过滤) ---------------- */
function initSearchFilter() {
  $$('[data-search]').forEach(input => {
    const scope = document.querySelector(input.dataset.scope || '#mainList') || document;
    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      $$('[data-searchable]', scope).forEach(row => {
        const txt = (row.dataset.searchable || row.textContent).toLowerCase();
        row.style.display = txt.includes(q) ? '' : 'none';
      });
    });
  });
  $$('[data-filter-select]').forEach(sel => {
    const scope = document.querySelector(sel.dataset.scope || '#mainList') || document;
    const key = sel.dataset.filterSelect; // 命名筛选:data-filter-select="ftheme" 对应行属性 data-ftheme
    sel.addEventListener('change', () => {
      const v = sel.value;
      $$('[data-searchable]', scope).forEach(row => {
        if (!v || v === 'all') { row.style.display = ''; return; }
        if (key) { row.style.display = (row.dataset[key] || '').split(' ').includes(v) ? '' : 'none'; return; }
        row.style.display = (row.dataset.filter || '').split(' ').includes(v) ? '' : 'none';
      });
    });
  });
}

/* ---------------- 数字滚动动画 ---------------- */
function countUp(el, target, { dur = 700, fmt = v => fmtInt(Math.round(v)) } = {}) {
  if (!el || el.dataset.counted) return;
  el.dataset.counted = '1';
  const start = performance.now();
  const from = 0;
  const t = Number(target);
  function step(now2) {
    const p = Math.min(1, (now2 - start) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = fmt(from + (t - from) * eased);
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
window.countUp = countUp;

/* ---------------- 签名板 ---------------- */
function initSigPad() {
  $$('.sig-pad').forEach(canvas => {
    const ctx = canvas.getContext('2d');
    const wrap = canvas.closest('.sig-wrap');
    const tip = wrap ? wrap.querySelector('.sig-tip') : null;
    const dpr = window.devicePixelRatio || 1;
    function resize() {
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.scale(dpr, dpr);
      ctx.lineWidth = 2.4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#1c2b3a';
      if (document.documentElement.getAttribute('data-theme') === 'dark') ctx.strokeStyle = '#e7edf5';
    }
    resize();
    let drawing = false, hasStroke = false;
    function pos(e) {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }
    canvas.addEventListener('pointerdown', e => {
      drawing = true; hasStroke = true;
      canvas.setPointerCapture(e.pointerId);
      if (tip) tip.classList.add('hide');
      const p = pos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y);
    });
    canvas.addEventListener('pointermove', e => {
      if (!drawing) return;
      const p = pos(e); ctx.lineTo(p.x, p.y); ctx.stroke();
    });
    canvas.addEventListener('pointerup', () => { drawing = false; });
    wrap && wrap.querySelectorAll('[data-sig-clear]').forEach(b => b.addEventListener('click', () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hasStroke = false;
      if (tip) tip.classList.remove('hide');
    }));
    wrap && wrap.querySelectorAll('[data-sig-confirm]').forEach(b => b.addEventListener('click', () => {
      if (!hasStroke) { Toast('请先手写签名', 'warn'); return; }
      Toast('签名已确认，已生成带时间戳的 PDF 存档', 'ok');
      const status = wrap.querySelector('[data-sig-status]');
      if (status) status.textContent = '已签署 · 2026-10-02 14:32:08 生成 PDF 存档';
    }));
  });
}

/* ============================================================
   图表引擎(无依赖 SVG,带图例+数据标签+hover tooltip)
   ============================================================ */
let tipEl = null;
function chartTip() {
  if (!tipEl) {
    tipEl = document.createElement('div');
    tipEl.className = 'chart-tip';
    document.body.appendChild(tipEl);
  }
  return tipEl;
}
function showTip(html, x, y) {
  const t = chartTip();
  t.innerHTML = html;
  t.classList.add('show');
  t.style.left = (x + 14) + 'px';
  t.style.top = (y + 14) + 'px';
  const r = t.getBoundingClientRect();
  if (r.right > innerWidth - 8) t.style.left = (x - r.width - 14) + 'px';
  if (r.bottom > innerHeight - 8) t.style.top = (y - r.height - 14) + 'px';
}
function hideTip() { if (tipEl) tipEl.classList.remove('show'); }

function tipRow(color, label, value) {
  return `<div class="tt-row"><span class="tt-dot" style="background:${color}"></span><span>${esc(label)}</span><span class="tt-strong" style="margin-left:8px">${esc(value)}</span></div>`;
}

/* ---- 柱状图 ---- */
function barChart(el, { data, height = 220, unit = '', fmt = fmtInt, color = 'var(--brand)', showVal = true, xLabels = null }) {
  const W = el.clientWidth || 600;
  const H = height, padL = 44, padR = 12, padT = 18, padB = 30;
  const iw = W - padL - padR, ih = H - padT - padB;
  const max = Math.max(...data.map(d => d.value)) * 1.15 || 1;
  const bw = iw / data.length;
  const barW = Math.min(34, bw * .52);
  let grid = '';
  for (let i = 0; i <= 4; i++) {
    const y = padT + ih - ih * i / 4;
    const v = max * i / 4;
    grid += `<line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="var(--line)" stroke-width="1"/>`;
    grid += `<text x="${padL - 8}" y="${y + 4}" text-anchor="end" font-size="10.5" fill="var(--ink-3)">${fmt(v)}</text>`;
  }
  let bars = '', labels = '';
  data.forEach((d, i) => {
    const h = d.value / max * ih;
    const x = padL + bw * i + (bw - barW) / 2;
    const y = padT + ih - h;
    bars += `<rect x="${x}" y="${y}" width="${barW}" height="${h}" rx="4" fill="${d.color || color}" opacity=".92">
      <title>${esc(d.label)}：${esc(fmt(d.value))}${unit}</title></rect>`;
    if (showVal) bars += `<text x="${x + barW / 2}" y="${y - 7}" text-anchor="middle" font-size="11" font-weight="600" fill="var(--ink-1)">${fmt(d.value)}</text>`;
    labels += `<text x="${padL + bw * i + bw / 2}" y="${H - 9}" text-anchor="middle" font-size="11" fill="var(--ink-3)">${esc(xLabels ? xLabels[i] : d.label)}</text>`;
  });
  el.innerHTML = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${grid}${bars}${labels}</svg>`;
  $$('rect', el).forEach((r, i) => {
    r.addEventListener('mousemove', e => showTip(tipRow(r.getAttribute('fill'), data[i].label, fmt(data[i].value) + unit), e.clientX, e.clientY));
    r.addEventListener('mouseleave', hideTip);
  });
}
window.barChart = barChart;

/* ---- 横向条形图 ---- */
function hBarChart(el, { data, height, fmt = fmtInt, unit = '', color = 'var(--brand)' }) {
  const H = height || data.length * 38 + 16;
  const W = el.clientWidth || 600;
  const padL = 108, padR = 54, padT = 8, padB = 8;
  const iw = W - padL - padR;
  const max = Math.max(...data.map(d => d.value)) || 1;
  let rows = '';
  data.forEach((d, i) => {
    const y = padT + i * ((H - padT - padB) / data.length) + 13;
    const w = d.value / max * iw;
    rows += `<text x="${padL - 10}" y="${y + 4}" text-anchor="end" font-size="11.5" fill="var(--ink-2)">${esc(d.label)}</text>`;
    rows += `<rect x="${padL}" y="${y - 8}" width="${Math.max(w, 2)}" height="14" rx="4" fill="${d.color || color}" opacity=".92"><title>${esc(d.label)}：${esc(fmt(d.value))}${unit}</title></rect>`;
    rows += `<text x="${padL + Math.max(w, 2) + 8}" y="${y + 4}" font-size="11.5" font-weight="600" fill="var(--ink-1)">${fmt(d.value)}</text>`;
  });
  el.innerHTML = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${rows}</svg>`;
  $$('rect', el).forEach((r, i) => {
    r.addEventListener('mousemove', e => showTip(tipRow(r.getAttribute('fill'), data[i].label, fmt(data[i].value) + unit), e.clientX, e.clientY));
    r.addEventListener('mouseleave', hideTip);
  });
}
window.hBarChart = hBarChart;

/* ---- 折线图(多系列, crosshair + tooltip) ---- */
function lineChart(el, { series, xLabels, height = 230, fmt = fmtInt, unit = '' }) {
  const W = el.clientWidth || 600;
  const H = height, padL = 48, padR = 14, padT = 14, padB = 28;
  const iw = W - padL - padR, ih = H - padT - padB;
  const allV = series.flatMap(s => s.data);
  const max = Math.max(...allV) * 1.12 || 1;
  const X = i => padL + iw * (xLabels.length === 1 ? .5 : i / (xLabels.length - 1));
  const Y = v => padT + ih - v / max * ih;
  let g = '';
  for (let i = 0; i <= 4; i++) {
    const y = padT + ih * i / 4;
    g += `<line x1="${padL}" y1="${y}" x2="${W - padR}" y2="${y}" stroke="var(--line)" stroke-width="1"/>`;
    g += `<text x="${padL - 8}" y="${y + 4}" text-anchor="end" font-size="10.5" fill="var(--ink-3)">${fmt(max * (1 - i / 4))}</text>`;
  }
  let paths = '', dots = '', labels = '';
  series.forEach(s => {
    const pts = s.data.map((v, i) => `${X(i).toFixed(1)},${Y(v).toFixed(1)}`);
    paths += `<polyline points="${pts.join(' ')}" fill="none" stroke="${s.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
    s.data.forEach((v, i) => {
      dots += `<circle cx="${X(i)}" cy="${Y(v)}" r="4" fill="var(--card)" stroke="${s.color}" stroke-width="2" data-si="${series.indexOf(s)}" data-di="${i}"/>`;
    });
  });
  xLabels.forEach((l, i) => { labels += `<text x="${X(i)}" y="${H - 8}" text-anchor="middle" font-size="11" fill="var(--ink-3)">${esc(l)}</text>`; });
  const cross = `<line class="lc-cross" x1="0" y1="${padT}" x2="0" y2="${padT + ih}" stroke="var(--line-strong)" stroke-width="1" stroke-dasharray="3 3" opacity="0"/>`;
  el.innerHTML = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${g}${paths}${dots}${cross}${labels}</svg>`;
  const svg = $('svg', el), crossEl = $('.lc-cross', svg);
  svg.addEventListener('mousemove', e => {
    const r = svg.getBoundingClientRect();
    const mx = (e.clientX - r.left) * (W / r.width);
    if (mx < padL - 8 || mx > W - padR + 8) { hideTip(); crossEl.setAttribute('opacity', '0'); return; }
    crossEl.setAttribute('opacity', '1');
    crossEl.setAttribute('x1', mx); crossEl.setAttribute('x2', mx);
    const idx = Math.round((mx - padL) / iw * (xLabels.length - 1));
    const i = Math.max(0, Math.min(xLabels.length - 1, idx));
    let html = `<div style="font-weight:600;margin-bottom:4px">${esc(xLabels[i])}</div>`;
    series.forEach(s => {
      const v = s.data[i];
      html += tipRow(s.color, s.name, fmt(v) + unit);
    });
    showTip(html, e.clientX, e.clientY);
  });
  svg.addEventListener('mouseleave', () => { hideTip(); crossEl.setAttribute('opacity', '0'); });
}
window.lineChart = lineChart;

/* ---- 环形图(带百分比标签, 2px 表面间隔) ---- */
function donutChart(el, { data, size = 200, thickness = 26, centerTitle = '', centerSub = '' }) {
  const total = data.reduce((a, d) => a + d.value, 0) || 1;
  const cx = size / 2, cy = size / 2;
  const r = size / 2 - thickness / 2 - 2;
  const C = 2 * Math.PI * r;
  let acc = 0, segs = '';
  const surface = getComputedStyle(document.documentElement).getPropertyValue('--card').trim() || '#ffffff';
  data.forEach(d => {
    const frac = d.value / total;
    const len = Math.max(frac * C - 2, frac > 0 ? 3 : 0);
    const dash = `${len} ${C - len}`;
    const rot = acc / total * 360 - 90;
    segs += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${d.color}" stroke-width="${thickness}" stroke-dasharray="${dash}" stroke-dashoffset="0" transform="rotate(${rot} ${cx} ${cy})" opacity=".94"><title>${esc(d.label)}：${esc(fmtInt(d.value))}（${(frac * 100).toFixed(1)}%）</title></circle>`;
    acc += d.value;
  });
  segs += `<circle cx="${cx}" cy="${cy}" r="${r - thickness / 2 - 1.5}" fill="none" stroke="${surface}" stroke-width="1"/>`;
  let labelHtml = '';
  if (centerTitle) {
    labelHtml = `<text x="${cx}" y="${cy - 2}" text-anchor="middle" font-size="21" font-weight="600" fill="var(--ink-1)">${esc(centerTitle)}</text>
      <text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="11" fill="var(--ink-3)">${esc(centerSub)}</text>`;
  }
  el.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">${segs}${labelHtml}</svg>`;
  $$('circle', el).forEach((c, i) => {
    if (i >= data.length) return;
    c.addEventListener('mousemove', e => showTip(tipRow(data[i].color, data[i].label, fmtInt(data[i].value) + ' · ' + (data[i].value / total * 100).toFixed(1) + '%'), e.clientX, e.clientY));
    c.addEventListener('mouseleave', hideTip);
  });
}
window.donutChart = donutChart;

/* ---- 迷你走势 ---- */
function sparkline(el, { data, color = 'var(--brand)', width = 130, height = 38, area = true }) {
  const W = width, H = height, pad = 3;
  const max = Math.max(...data), min = Math.min(...data);
  const span = (max - min) || 1;
  const X = i => pad + (W - pad * 2) * i / (data.length - 1);
  const Y = v => pad + (H - pad * 2) * (1 - (v - min) / span);
  const pts = data.map((v, i) => `${X(i).toFixed(1)},${Y(v).toFixed(1)}`);
  let areaPath = '';
  if (area) {
    areaPath = `<polygon points="${pad},${H - pad} ${pts.join(' ')} ${W - pad},${H - pad}" fill="${color}" opacity=".08"/>`;
  }
  el.innerHTML = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${areaPath}<polyline points="${pts.join(' ')}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${X(data.length - 1)}" cy="${Y(data[data.length - 1])}" r="2.6" fill="${color}"/></svg>`;
}
window.sparkline = sparkline;

/* ---------------- 看板手动刷新(30 秒仅一次) ---------------- */
function initDashRefresh() {
  $$('[data-dash-refresh]').forEach(btn => {
    btn.addEventListener('click', () => {
      const now2 = Date.now();
      if (btn.dataset.last && now2 - +btn.dataset.last < 30000) {
        const wait = Math.ceil((30000 - (now2 - +btn.dataset.last)) / 1000);
        Toast(`刷新过于频繁，请 ${wait} 秒后再试`, 'warn');
        return;
      }
      btn.dataset.last = now2;
      $$('[data-updated-at]').forEach(el => {
        el.textContent = '数据更新时间：2026-09-12 10:24:36';
      });
      Toast('数据已刷新（聚合图表 Redis 缓存 60 秒）', 'ok');
    });
  });
}

/* ---------------- 页脚年份 ---------------- */
function initYear() { $$('[data-year]').forEach(el => el.textContent = '2026'); }

/* ---------------- 入口 ---------------- */
document.addEventListener('DOMContentLoaded', () => {
  initIcons();
  initTheme();
  initTabs();
  initDrops();
  initSwitches();
  initCheckPills();
  initSearchFilter();
  initSigPad();
  initDashRefresh();
  initYear();
});
