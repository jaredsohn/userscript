// ==UserScript==
// @name           Google Reader Layout Expander
// @namespace      http://polygonpla.net/
// @description    Expand/Hide left side for new Google Reader.
// @author         polygon planet
// @version        1.05
// @include        http*://www.google.*/reader/view/*
// @exclude        http*://www.google.*/reader/view/feed/*
// @updateURL      https://userscripts.org/scripts/source/116959.meta.js
// ==/UserScript==
(function() {

var LANG = function(n) {
  return ((n && (n.language || n.userLanguage     ||
          n.browserLanguage || n.systemLanguage)) ||
          'en').split(/[^a-zA-Z0-9]+/).shift().toLowerCase();
}(navigator);


var LABELS = {
  translate : function(name) {
    return LABELS[name][LANG === 'en' && LANG || 'ja'];
  },
  SHOW_LEFT : {
    ja : '左を表示',
    en : 'Show left side'
  },
  HIDE_LEFT : {
    ja : '左を非表示',
    en : 'Hide left side'
  }
};

var GM_GOOGLE_STATE_KEY = 'GOOGLE_READER_LAYOUT_EXPANDER_STATE';
var STATE_SHOW = true;
var STATE_HIDE = false;

document.addEventListener('DOMContentLoaded', function() {
  var toggle, target;
  target = $('#viewer-refresh');
  toggle = createButton('span', '←', LABELS.translate('HIDE_LEFT'), function() {
    toggleLeft(toggle);
  });
  target.parentNode.insertBefore(toggle, target);
  if (GM_getValue(GM_GOOGLE_STATE_KEY) === STATE_HIDE) {
    toggleLeft(toggle);
  }
}, true);


function $(expr, doc, multi) {
  doc || (doc = document);
  return multi ?
    Array.prototype.slice.call(doc.querySelectorAll(expr)) :
    doc.querySelector(expr);
}


function toggleLeft(elem) {
  var LEFT_SIZE = '264px';
  var section, chrome, nav;
  section = $('#lhn-add-subscription-section');
  chrome  = $('#chrome');
  nav     = $('#nav');
  if (elem.textContent == '←') {
    section.style.width     = '';
    chrome.style.marginLeft = '0px';
    nav.style.width         = '5px';
    nav.style.overflow      = 'hidden';
    elem.textContent = '→';
    elem.title       = LABELS.translate('SHOW_LEFT');
    GM_setValue(GM_GOOGLE_STATE_KEY, STATE_HIDE);
  } else {
    section.style.width     = LEFT_SIZE;
    chrome.style.marginLeft = LEFT_SIZE;
    nav.style.width         = LEFT_SIZE;
    setTimeout(function() {
      nav.style.overflow = '';
    }, 0);
    elem.textContent = '←';
    elem.title       = LABELS.translate('HIDE_LEFT');
    GM_setValue(GM_GOOGLE_STATE_KEY, STATE_SHOW);
  }
}


function createButton(tag, text, title, onClick) {
  var elem = document.createElement(tag);
  elem.setAttribute('style', [
    '-moz-border-radius : 3px;',
    '-moz-user-select   : none;',
    'background         : #f6f6f6;',
    'border             : 1px solid #777;',
    'color              : #777;',
    'cursor             : pointer;',
    'float              : left;',
    'height             : 14px;',
    'line-height        : 1;',
    'margin             : 4px 16px 2px 8px;',
    'padding            : 2px 4px;',
    'text-align         : center;',
    'width              : 12px;'
  ].join('\n'));
  if (text != null) {
    elem.appendChild(document.createTextNode(text));
  }
  if (title != null) {
    elem.title = title;
  }
  if (onClick) {
    elem.addEventListener('click', function(ev) {
      onClick(ev);
    }, true);
  }
  return elem;
}


})();

