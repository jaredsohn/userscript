// ==UserScript==
// @name           Gmail UI edits
// @version        2011.10.27.001
// @namespace  http://glomerate.com
// @description  Misc. UI edits to Gmail.
// @include        http*://mail.google.com/*
// ==/UserScript==

(function(){

var is_safari = /safari/i.test(navigator.userAgent);

if (!is_safari) {
  return setTimeout(writeStyles, 0);
}

var index = 0;
var interval = setInterval(bruteForceWriteStyles, 100);

function bruteForceWriteStyles() {
  if (++index > 20) {
    clearInterval(interval);
    return;
  }
  writeStyles();
}

function writeStyles() {

  addStyle(''
    + '/* Logo/Search header */'
    + '.GcwpPb-imj1dd {'
    + '  margin-top: 20px !important;'
    + '}'
    + ''
    + '/* Gmail logo */'
    + '.GcwpPb-VArq {'
    + '  background: url(https://www.google.com/a/glomerate.com/images/logo.gif?alpha=1) no-repeat top left transparent;'
    + '  margin-top: 13px !important;'
    + '  margin-left: 18px !important;'
    + '  height: 44px !important;'
    + '}'
    + ''
    + '/* Search button */'
    + '.GcwpPb-uq0Mrf .J-Zh-I-Js-Zq {'
    + '  margin-left: 8px !important;'
    + '  margin-right: 8px !important;'
    + '}'
    + ''
    + '/* Filter Options */'
    + '.GcwpPb-txTtjf {'
    + '  color: #555 !important;'
    + '  line-height: 13px !important;'
    + '  padding-left: 1px !important;'
    + '}'
    + ''
    + '/* Email/Contact/Tasks Switcher */'
    + '.CX, .T4 {'
    + '  padding-left: 0 !important;'
    + '}'
    + ''
    + '/* Next/Previous Buttons */'
    + '.iHkD0e, .A65iE, .SOLoEf, .P1rG1b {'
    + '  width: 40px !important;'
    + '  background-position: center center !important;'
    + '}'
    + ''
    + '/* Left and Right Screen Edges */'
    + '.q0CeU, .l2 {'
    + '  margin-right: 18px !important;'
    + '}'
    + 'div.pp {'
    + '  margin-left: 18px !important;'
    + '  margin-right: 8px !important;'
    + '}'
    + ''
    + '/* Compose Email Button */'
    + '.z0 .J-Zh-I, .MX .J-Zh-I {'
    + '  padding: 7px 27px !important;'
    + '}'
    + ''
    + '/* Labels */'
    + '.TN {'
    + '  padding-top: 2px !important;'
    + '  padding-bottom: 2px !important;'
    + '}'
    + ''
    + '/* List view row height */'
    + '.xY {'
    + '  padding-top: 4px !important;'
    + '  padding-bottom: 3px !important;'
    + '  padding-left: inherit;'
    + '  padding-right: inherit;'
    + '}'
    + 'td.oZ-x3 {'
    + '  padding: 0 !important;'
    + '}');

}

function addStyle(css) {
    if (is_safari && !canvasFrameIsReady()) return false;
    var head, style;
    head = getCanvasFrame().getElementsByTagName('head')[0];
    if (!head) { return false; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
    clearInterval(interval);
}

function getCanvasFrame() {
    if (!is_safari) return document;
    return canvasFrameIsReady() ? document.getElementById('canvas_frame').contentDocument.documentElement : null;
}

function canvasFrameIsReady() {
    var canvas_frame = document.getElementById('canvas_frame');
    if (typeof canvas_frame != 'undefined' && canvas_frame !== null) {
        var canvas_document = canvas_frame.contentDocument.documentElement;
        return (typeof canvas_document != 'undefined' && canvas_document !== null);
    }
    return false;
}

})();
