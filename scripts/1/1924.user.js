// Google Reader Mousewheel and Keyboard Enhancer 0.6

// ==UserScript==
// @name          Google Reader Mousewheel and Keyboard Enhancer
// @namespace     http://hansschmucker.free.fr/
// @description	  Adds support for mousewheel scrolling to Google Reader and Enabled ArrowKey/PgUP/PgDn/Home controlls.
// @include       http://www.google.com/reader*
// ==/UserScript==

document.getElementById('queue-container').addEventListener('DOMMouseScroll', s, false);
document.addEventListener('keydown',k,false);
function s(e){ if(!e.altKey){if(e.detail>0)t.down(); else t.up();}else{if(e.detail>0)t.ma();else t.na();}  e.preventDefault();}

function k(e){
var h=0;
switch (e.which) {
case 40: t.down();h=1;break;
case 38: t.up();h=1; break;
case 36: t.top();h=1; break;
case 34: t.ma();h=1; break;
case 33: t.na();h=1; break;
default: break;
}
if(h) e.preventDefault();e.which=0;e.KeyCode=0;
}

