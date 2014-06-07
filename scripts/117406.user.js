// ==UserScript==
// @name           Google Search for Simple
// @namespace      http://polygonpla.net/
// @description    Google Search for Simple
// @include        http*://www.google.*/search*
// @include        http*://www.google.*/*q=*
// @include        http*://www.google.*/
// @include        http*://www.google.*/*
// @include        https://encrypted.google.*/search*
// @include        https://encrypted.google.*/*q=*
// @include        https://encrypted.google.*/
// @include        https://encrypted.google.*/*
// @author         polygon planet
// @version        1.15
// @updateURL      https://userscripts.org/scripts/source/117406.meta.js
// ==/UserScript==
(function() {

const SELECTOR_LIST    = 'h3.r a';
const SELECTOR_NEXT    = '#pnnext';
const SELECTOR_SEARCH  = '#search #ires';
const SELECTOR_SEARCH2 = '#res #search';
const SELECTOR_INPUT   = 'input.gsfi';
const SELECTOR_INPUT2  = 'input#gbqfq';

const DELAY = 200;

var done, first, processing = 0, tabIndex = 1, step = 20;


window.addEventListener('DOMContentLoaded', function() {
  window.removeEventListener('DOMContentLoaded', arguments.callee, false);
  setCSS();
}, false);


window.addEventListener('load', function() {
  window.removeEventListener('load', arguments.callee, false);
  setCSS();
}, false);


// ----- functions -----

function hasResult() {
  return !!((select(SELECTOR_SEARCH)  && select(SELECTOR_INPUT)) ||
            (select(SELECTOR_SEARCH2) && select(SELECTOR_INPUT2)));
}


function select(expr, multi) {
  return multi ?
    Array.prototype.slice.call(document.querySelectorAll(expr)) || [] :
    document.querySelector(expr) || null;
}


function setTabIndex() {
  select(SELECTOR_LIST, true).forEach(function(a) {
    if (a) {
      try {
        a.tabIndex = tabIndex++;
      } catch (e) {}
      if (!first) {
        first = a;
      }
    }
  });
  if (first) {
    try {
      select(SELECTOR_NEXT).tabIndex = tabIndex++;
    } catch (e) {}
  }
}


function setCSS() {
  if (++processing >= 2) {
    return;
  }
  setTimeout(function() {
    if (!hasResult()) {
      step += 10;
      if (step >= DELAY) {
        step = DELAY;
      }
      setTimeout(arguments.callee, step);
      return;
    }
    if (!done) {
      done = true;
      putCSS();
      setTimeout(function() {
        setTabIndex();
      }, 0);
    }
  }, 0);
}


function putCSS() {
  GM_addStyle(getCSS());
}


function getCSS() {
  // CSS from 2ch Google cache code
  return [
    '#gb_119.gbzt, #logocont,',
    '#rhs, div #results,',
    '#tpa1, #mbEnd, #tads, #tadsb, #vspb,',
    '.vspi, .vspib {',
    '  display: none !important;',
    '}',
    '#center_col, #foot, #ires, #res {',
    '  margin-right: 0 !important;',
    '}',
    '#cnt, .s, .mw {',
    '  max-width: none !important;',
    '}',
    '#tsf {',
    '  max-width: 80% !important;',
    '}',
    '#center_col, #foot {',
    '  width: 70% !important;',
    '}'
  ].join('\n');
}


}());
