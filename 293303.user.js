// ==UserScript==
// @name         GameMiner ComfortZone
// @version      0.0.1
// @description  Some style-improvements for GameMiner.ru
// @updateURL    http://userscripts.org/scripts/source/293303.meta.js
// @downloadURL  http://userscripts.org/scripts/source/293303.user.js
// @match        http://gameminer.ru/*
// @include      http://gameminer.ru/*
// @grant        GM_info
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_listValues
// @require      http://userscripts.org/scripts/source/49700.user.js
// @license      CC 1.0 (Public Domain) - http://creativecommons.org/publicdomain/zero/1.0/
// ==/UserScript==

// TODO background-size of spinner (after join-submit)
// TODO image-only raster (info on hover)

/*
 * First try to change amount of items per page.
unsafeWindow.Core.Collection.extend = function(protoProps, classProps) {
  console.log(protoProps);
  if (protoProps.paging && protoProps.paging.get) {
    protoProps.paging.getCZ = protoProps.paging.get
    protoProps.paging.get = function(str) { if (str == 'itemsOnPage') return 20; else return this.getCZ(str); };
  }
  var child = inherits(this, protoProps, classProps);
  child.extend = this.extend;
  return child;
};
*/

(function(){
  
  // CONFIGURATION
  var css = 
      'html { box-shadow: inset 0px 0px 15px #000000; overflow: hidden; }' +
      'body { overflow-y: scroll; height: 100%; margin: 0; padding: 0 8px; background: #2a2725; color: #dadada }' +
      '#header { margin-top: 8px; }' +
      '#buttons_holder { margin-bottom: 8px; }' +
      '.section_kids { padding-left: 30px; }' +
      '.section_header_holder { border: 1px solid #4D4B48; }' +
      '.section_header { background: #221F1E; color: #dadada; border: none; text-decoration: none; display: block; text-align: left; padding: 1px 10px; font-size: 12pt; font-weight: bold; }' +
      '.section_header_holder:hover .section_header { background: rgb(22, 22, 22); }' +
      '.section_header:hover { background: black !important; }' +
      '.field_label { font-weight: normal; }' +
      'input[type="text"] { width: 50pt; text-align: right; color: #dadada; background: #221F1E; border: 1px solid #4D4B48; }' +
      'input[type="text"]:focus { background: rgb(22, 22, 22); }' +
      '#resetLink { color: white; }' +
      '#resetLink:hover { color: #0088cc; }' +
      'button { border-radius: 0; padding: 0; opacity: 0.5; background-image: none; }' +
      'button:hover { opacity: 0.8; }' +
      'button:focus { opacity: 0.7; }';
  
  GM_config.init(GM_info.script.name + ' Options', {
    'homeOnly': { label: 'Enable on GA-pages only', type: 'checkbox', 'default': true },
    'fullWidth': { section: ['ReStyle'], label: 'Use full screen-width', type: 'checkbox', 'default': true },
    'inlineBackToTop': {                 label: 'Inline Back-to-Top link', type: 'checkbox', 'default': true },
    'alwaysShowBackToTop': {             label: 'Always show Back-to-Top link', type: 'checkbox', 'default': true },
    'inlineHideButtons': {               label: 'Inline "Hide all giveaways"-buttons', type: 'checkbox', 'default': true },
    'hideButtonWidth': {                 label: 'Width of "Hide all giveaways"-buttons', type: 'text', 'default': '21pt' },
    'giveaways.width': { section: ['GA-Container'], label: 'Width (in px) of giveaway-container', type: 'int', 'default': 199 },
    'giveaways.height': {                           label: 'Minimum height (in px) of giveaway-container', type: 'int', 'default': 150 },
    'giveaways.imageZoom': {                        label: 'GA image-zoom (in %)', type: 'int', 'default': 100 },
    'pagination.top': { section: ['Pagination'], label: 'Top', type: 'checkbox', 'default': true },
    'pagination.bot': {                          label: 'Bottom', type: 'checkbox', 'default': false },
    'pagination.scroll': {                       label: 'Enable scrolling', type: 'checkbox', 'default': false },
    'minify.header': { section: ['Minify'], label: 'Header', type: 'checkbox', 'default': true },
    'minify.logo': {                        label: 'GameMiner-Logo', type: 'checkbox', 'default': false },
    'minify.userData': {                    label: 'Dashboard', type: 'checkbox', 'default': true },
    'minify.userData.zoom': {               label: 'Dashboard-Zoom (in %)', type: 'int', 'default': 100 },
    'minify.footer': {                      label: 'Footer', type: 'checkbox', 'default': true },
    'minify.spacing': {                     label: 'Spacing', type: 'checkbox', 'default': true },
    'minify.giveaways': {                   label: 'Giveaway-Container', type: 'checkbox', 'default': true },
    'minify.giveaways.trust': {             label: 'Trust-label and Icons', type: 'checkbox', 'default': true },
    'hide.userData': { section: ['Hide'], label: 'Dashboard', type: 'checkbox', 'default': false },
    'hide.bet': {                         label: 'Wooden Keys / Betting', type: 'checkbox', 'default': true },
    'hide.footer': {                      label: 'Footer', type: 'checkbox', 'default': false },
    'hide.search': {                      label: 'Search', type: 'checkbox', 'default': false },
    'hide.backToTop': {                   label: 'Back-To-Top', type: 'checkbox', 'default': false },
    'show.golden': { section: ['Show on load'], label: 'Golden', type: 'checkbox', 'default': true },
    'show.regular': {                           label: 'Regular', type: 'checkbox', 'default': true },
    'show.sandpit': {                           label: 'Sandpit', type: 'checkbox', 'default': true },
    'show.completed': {                         label: 'Completed', type: 'checkbox', 'default': false },
    'show.statistics': {                        label: 'Statistics', type: 'checkbox', 'default': false }
  }, {
    save: function() {
      location.reload();
    }
  }, css);
  
  // SCRIPT
  
  var loc = window.location;
  var enabled = !GM_config.get('homeOnly') || loc.pathname == '/' || loc.pathname.indexOf('/giveaway/') == 0;
  
  // Add config-link
  var link = document.createElement('a');
  link.onclick = GM_config.open;
  link.appendChild(document.createTextNode('CZ Config'));
  link.setAttribute('class', 'header__menu-item');
  link.setAttribute('href', 'javascript:void(0);');
  document.querySelector('.header__menu').appendChild(link);
  document.addEventListener('keyup', function(e){ if (e.keyCode == 27) GM_config.close(); });
  document.addEventListener('mousedown', function(){ GM_config.close(true); });
  
  if (!enabled)
    return;
  
  function prependChild(el, toPrepend) {
    if (el.childNodes.length)
      el.insertBefore(toPrepend, el.childNodes[0]);
    else
      el.appendChild(toPrepend);
  }
  function addToggleLink(text, selector, hide) {
    var block = document.querySelector(selector);
    if (!block)
      return null;
    if (hide)
      block.setAttribute('style', 'height: 13pt; overflow: hidden;');
    else
      block.removeAttribute('style');
    var toggle = document.createElement('a');
    toggle.setAttribute('class', 'toggleSection');
    toggle.appendChild(document.createTextNode(text));
    toggle.setAttribute('onclick',
                        'var b = document.querySelector("' + selector + '");' +
                        'if(b.hasAttribute("style")) b.removeAttribute("style");' +
                        ' else b.setAttribute("style", "height: 13pt; overflow: hidden;");');
    prependChild(block, toggle);
  }
  
  if (!GM_config.get('pagination.scroll')) {
    document.body.__defineSetter__('scrollTop', function(){});
    document.querySelector('html').__defineSetter__('scrollTop', function(){});
  }
  
  var style = document.createElement('style');
  var styleText =
      'body { overflow-y: scroll; }' +
      '.giveaways-block { clear: both; }' +
      '.giveaway__topc { white-space: nowrap; width: auto; }' +
      '.toggleSection { cursor: pointer; color: white; }' +
      '.toggleSection:hover { color: #0088cc; }' +
      '#GM_config { border: none !important; border-radius: 5px; }';
  var w = GM_config.get('giveaways.width');
  var z = GM_config.get('giveaways.imageZoom') / 100;
  var imgW = z * w;
  var imgH = imgW / 460 * 215;
  // Zoom
  styleText +=
    '.dashboard.clearfix { zoom: ' + GM_config.get('minify.userData.zoom') / 100 + '; line-height: 18px; }' +
    '.giveaway__image-container { width: ' + imgW + 'px; max-height: ' + imgH + 'px; margin: auto; background-size: contain; }' +
    '.giveaway { overflow: hidden; min-height: ' + GM_config.get('giveaways.height') + 'px; }' +
    '.giveaway-blacklist>.btn-mini { max-width: ' + GM_config.get('hideButtonWidth') + '; }' +
    '.dashboard__money { width: 30%; }' +
    '.dashboard__giveaway { width: 25%; }' +
    '.dashboard__user.clearfix { margin-right: 0; }';
  if (w) {
    styleText +=
      '.giveaway { width: ' + w + 'px; }' +
      '.giveaway__container { max-width: none; width: auto; }';
    if (z > 1)
      styleText +=
        '.giveaway__image-container { max-width: ' + w + 'px; background-size: cover; }';
  }
  // ReStyle
  if (GM_config.get('alwaysShowBackToTop'))
    styleText +=
      '.toper { display: inline !important; }';
  if (GM_config.get('fullWidth'))
    styleText +=
      '.container { margin: 0; max-width: none; width: 100%; }';
  if (!GM_config.get('pagination.top'))
    styleText +=
      '.giveaways-block>div:nth-last-child(4) .paging { display: none; }';
  if (!GM_config.get('pagination.bot'))
    styleText +=
      '.giveaways-block>div:nth-last-child(2) .paging { display: none; }';
  // Minify
  if (GM_config.get('minify.userData'))
    styleText +=
      '.g-gold-big-icon, .g-coal-big-icon { padding-left: 20px; background-size: 16px; }' +
      '.dashboard.clearfix { line-height: 16px; margin-bottom: 5px !important; }' +
      '.dashboard__giveaway>div { margin-top: 0 !important; }' +
      '.dashboard__giveaway>div>span { display: none; }' +
      '.giveaway-create-link { padding: 6px 0; width: 100%; }' +
      '.dashboard__money { padding-top: 0; }' +
      '.dashboard__money:before { content: none }' +
      '.dashboard__money-body { font-size: 18px; line-height: 16px; }' +
      '.g-coal-big-icon, .g-gold-big-icon { min-height: 16px; line-height: 16px; }' +
      '.dashboard__user.clearfix { padding: 0; }' +
      '.dashboard__user-name { line-height: 16px; font-size: 16px; height: 16px; background-image: none !important; padding-left:0; }' +
      '.dashboard__user-invite { position: static; font-size: 16px; display: block; }';
  if (GM_config.get('minify.spacing'))
    styleText +=
      '.page>div { margin: 0; }' +
      '.chat__main { margin-right: 250px !important; }' +
      '.page { padding: 10px; }' +
      '.page>.dashboard.clearfix { margin-bottom: 0; }' +
      '.page>.giveaway-search.clearfix { margin: 0; padding: 0; }' +
      '.giveaways-block h1 { font-size: 24px; line-height: 26px; margin-left: 25%; color: rgb(189, 142, 44); }' +
      '.pagination { height: auto; }' +
      '.pagination a { line-height: 22px; padding: 0 6px; }' +
      '.giveaways-block>div:nth-last-child(2) .pagination a { line-height: 19px; padding: 0 4px; }' +
      '.paging { margin: 0 !important; }';
  if (GM_config.get('minify.header'))
    styleText +=
      '.header { padding: 1px 20px; z-index: 1; }' +
      '.header__menu { line-height: normal; margin: 0; }' +
      '.page { z-index: 0; }';
  if (GM_config.get('minify.logo'))
    styleText +=
      '.header__main>img { height: 50px; }';
  if (GM_config.get('minify.footer'))
    styleText +=
      '.footer-links li { float: left; padding-left: 10px; }' +
      '.footer-links li:first-child { margin-bottom: 0; padding-left: 0; clear: right; }' +
      '.footer-links li:nth-child(2) { clear: left; }' +
      '.footer { padding: 0 20px; }' +
      '.footer-col { width: 33%; }' +
      '.footer-col:first-child { font-size: 13px; }';
  if (GM_config.get('inlineBackToTop')) {
    document.querySelector('.page').appendChild(document.querySelector('.toper'));
    styleText +=
      '.toper { position: static; border: none; background-color: none; padding: 0; }';
  }
  if (GM_config.get('inlineHideButtons'))
    styleText +=
      '.giveaway__options .g-dropdown { display: inline !important; border: none; padding: 6px; }' +
      '.giveaway__options .g-switcher { display: none; }' +
      '.giveaway-blacklist>.btn-mini { border-radius: 0; padding: 0; opacity: 0.3; background-image: none; }' +
      '.giveaway-blacklist>.btn-mini:hover { opacity: 0.6 }' +
      '.giveaway-blacklist>.btn-mini:focus { opacity: 0.5 }' +
      '.giveaway__options-elements { margin: 0; }' +
      '.giveaway__top { margin-right: ' + GM_config.get('hideButtonWidth') + '; }';
  if (GM_config.get('minify.giveaways'))
    styleText +=
      '.giveaway__timeleft-text { display: none; }' +
      '.g-level-icon { padding-left: 10px; background-size: 10px; }' +
      '.g-coal-icon, .g-gold-icon { padding-left: 12px; background-size: 10px; }' +
      '.giveaway { padding: 0; margin: 0; }' +
      '.giveaway__info p, .giveaway__info span, .giveaway__action { margin: 0; line-height: 10px; font-size: 10px; }' +
      '.giveaway__name { font-size: 12px; }' +
      '.giveaway__main-info { line-height: 7px; }' +
      '.giveaway__options { top: 0; right: 0; line-height: 12px; }' +
      '.giveaway__options .g-dropdown { top: 0; right: 0; padding: 0; border: none; background-color: transparent; }' +
      '.m-giveaway-form_key { padding-left: 16px; background-size: 16px; }' +
      '.giveaway-join { margin: 0; }' +
      '.giveaway-join>input[type="submit"] { padding: 1px 2px; font-size: 10px; line-height: 12px; clear: left; width: 19pt; }';
  if (GM_config.get('minify.giveaways.trust'))
    styleText +=
      '.giveaway__key-rating { font-size: 10px; top: 0; }' +
      '.giveaway__key-rating-text { line-height: 10px; padding: 0; }' +
      '.giveaway__key-rating-arrow { border-width: 5px; }' +
      '.giveaway-icons { padding: 0; zoom: 0.6; }';
  // Remove
  if (GM_config.get('hide.bet'))
    styleText += '.page>div[align="center"] { display: none; }';
  if (GM_config.get('hide.userData'))
    styleText += '.dashboard { display: none; }';
  if (GM_config.get('hide.footer'))
    styleText += '.footer { display: none; }';
  if (GM_config.get('hide.search'))
    styleText += '.giveaway-search { display: none; }';
  if (GM_config.get('hide.backToTop'))
    styleText += '.toper { display: none !important;}';
  // persist styles
  style.innerText = styleText;
  document.getElementsByTagName('head')[0].appendChild(style);
  
  // Toggle + hide
  addToggleLink('show / hide golden',     '.giveaways-block.c-golden',  !GM_config.get('show.golden'));
  addToggleLink('show / hide regular',    '.giveaways-block.c-coal',    !GM_config.get('show.regular'));
  addToggleLink('show / hide sandpit',    '.giveaways-block.c-sandbox', !GM_config.get('show.sandpit'));
  addToggleLink('show / hide completed',  '.page>.giveaways',           !GM_config.get('show.completed'));
  addToggleLink('show / hide statistics', '.top-container',             !GM_config.get('show.statistics'));
  
})();