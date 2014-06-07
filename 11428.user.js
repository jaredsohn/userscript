// ==UserScript==
// @name           EJK
// @namespace      http://d.hatena.ne.jp/koyachi/
// @description    Keybind(j/k) for moving between blog entries with Hatena Star.
// @include        *
// ==/UserScript==
//
// 2007-09-28 t.koyachi
//  repond to HatenaStar.js updates.
//  this version not support overrode Hatena.Star.EntryLoader.loadEntries.
//
// 2007-08-14 t.koyachi
//  upload to userscript.org
//
// 2007-06-07 t.koyachi
//

window.addEventListener('load', EJK, true);

function EJK() {
  if (typeof(unsafeWindow.Hatena) == 'undefined') return;
  if (typeof(unsafeWindow.Hatena.Star) == 'undefined' ) return;

//=================================================
// copy from IJK
// http://userscripts.org/scripts/show/8671

var SPACE_SCROLL_AMOUNT = 30;
var MARGIN = 10;
var MIN_OBJECT_SIZE = 100;
var IME_OFF = true;

var BUTTON_LEFT = 0;

var KEY_NEXT = charCode('J');
var KEY_PREVIOUS = charCode('K');
var KEY_SPACE = charCode(' ');

// start by ctrl + LEFT-click
var START_HANDLER = 'click';
function IS_START_EVENT(e){
  return e.ctrlKey && e.button == BUTTON_LEFT;
}

// ----[Application]-------------------------------------------------
window.addEventListener(START_HANDLER, onStart, true);

function onStart(e) {
  if(!IS_START_EVENT(e)) return;

  IME_OFF && imeOff();
  
  window.removeEventListener(START_HANDLER, onStart, true);
  cancel(e);

/*
  // 挿入要素の位置が確定してないので差分だけとか出来ない
  getElements(document);
  if (window.AutoPagerize && window.AutoPagerize.addFilter) {
    window.AutoPagerize.addFilter(function(pageElements) {
      log('ap.addfilter');
      pageElements.forEach(function(page) {
        getElements(page);
      });
    });
  }
*/
  window.addEventListener('keydown', onKeyDown, false);
  jump(1);
}

function onKeyDown(e) {
  if(e.ctrlKey || e.altKey)
    return;
  
  switch(e.keyCode) {
  case KEY_SPACE:
    viewTop(viewTop() + (e.shiftKey ? -1 : 1) * SPACE_SCROLL_AMOUNT);
    cancel(e);
    return;
    
  case KEY_NEXT:
    jump(true);
    return;
    
  case KEY_PREVIOUS:
    jump(false);
    return;
  }
}

function jump(next){
  var elms = getElements();
  var op = next ? gt : lt;
  var most = null;
  var border = viewTop();
  
  for (var i=l=elms.length; i; i--) {
    var elm = elms[next ? l-i : i-1];
    var top = absoluteTop(elm) - MARGIN;
    var index = next ? l-i : i-1;
    if (op(top, border) && 
        (most==null || op(most, top))) {

      most = top;
    }
  }
  viewTop(most);
}

function getHeaders(parent) {
//  var t = unsafeWindow.Hatena.Star.EntryLoader.headerTagAndClassName;
//  return unsafeWindow.Ten.DOM.getElementsByTagAndClassName(t[0], t[1], parent);

  var c = unsafeWindow.Hatena.Star.EntryLoader;
  var tendom = unsafeWindow.Ten.DOM;
  if (c.headerTagAndClassName) {
    var t = c.headerTagAndClassName;
    if (typeof(t[0]) == 'string') {
      return tendom.getElementsByTagAndClassName(t[0], t[1], parent);
    }
    else {
      var elements = [];
      for (var i = 0; i < t.length; i++) {
        var elems = tendom.getElementsByTagAndClassName(t[i][0], t[i][1], document);
        for (var j = 0; j < elems.length; j++) {
          elements.push(elems[j]);
        }
      }
      return elements;      
    }
  }
  else if (c.loadEntries) {
    return [];
  }
  else {
    if (!unsafeWindow.Hatena.Star.SiteConfig) return;
    var conf = unsafeWindow.Hatena.Star.SiteConfig.entryNodes;
    if (!conf) return;
    for (var eselector in conf) {
      var enodes = unsafeWindow.Ten.Selector.getElementsBySelector(eselector);
      if (!enodes) continue;
      return enodes;
    }
  }
}
// ref. http://d.hatena.ne.jp/hatenastar/20070707
function getElements(parent) {
  var headers = getHeaders(document);
  var results = [];
  for (var i = 0; i < headers.length; i++) {
    var header = headers[i];
    var a = header.getElementsByTagName('a')[0];
    if (!a) continue;
    results.push(header);
  }
  return results;
}


// ----[Utility]-------------------------------------------------
function log() {
  unsafeWindow.console.log.apply(unsafeWindow.console,
                                 Array.slice(arguments))
}

function gt(a, b){return a > b}
function lt(a, b){return a < b}

function absoluteTop(elm, top){
  if (top == null)
    top = 0;
  
  if (!elm)
    return top;
  
  return absoluteTop(elm.offsetParent, top + elm.offsetTop)
}

function viewTop(top) {
  var view = document.compatMode=='CSS1Compat'
    ? document.documentElement
    : document.body;
  
  return top==null ? view.scrollTop : (view.scrollTop=top);
}

function cancel(e) {
  e.preventDefault();
}

function charCode(c) {
  return c.charCodeAt();
}

// Original code : http://a-h.parfe.jp/einfach/archives/2006/0905214308.html
function imeOff() {
  var top = viewTop();
  
  var elm = document.body.appendChild(document.createElement('input'));
  elm.type = 'password';
  elm.style.width = '0px';
  elm.focus();
  
  viewTop(top);
  
  document.body.removeChild(elm);
  
  window.blur();
  window.focus();
}
};
