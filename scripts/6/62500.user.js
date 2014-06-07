// ==UserScript==
// @name           Tea House Fix
// @namespace      none atm
// @description    Tea House restoration (borrowed code from http://userscripts.org/scripts/show/40957)
// @include        http://www.google.com/*
// @include        https://www.google.com/*
// ==/UserScript==
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
var x=document.body.offsetWidth;
addGlobalStyle(
'#nhdrwrapinner {\nheight:162px;\n}\n' +
'#btnI {\nleft:13px;\n-moz-border-radius-topleft:15px;\n-moz-border-radius-bottomleft:15px;\n}\n' +
'#nhdrwrapsizer{height:220px!important;}'+
'.gradient {\nposition:relative;\ntop:1px;\nz-index:0 !important;\n}\n' +
'.bottomline, .topline {\ndisplay:none\n}\n' +
'#enable_chat, #bottom_nav {\ndisplay:none ;\n}'  +
'#footerwrap {height:auto !important}' +
'#footerwrapinner,#sfrm iframe {display:none !important;}' );