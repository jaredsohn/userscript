// ==UserScript==
// @name	yahoo
// @description testing

// @include	http://www.*.*.yahoo.com/*
// ==/UserScript==

function style(css) {
    var e,s;
    e= document.getElementsByTagName('head')[0];
  //alert(e.length);
    if (!e){ return; }
    s = document.createElement('style');
    s.type = 'text/css';
    s.innerHTML = css;
    e.appendChild(s);
}
style('#yom-ad-LREC, #yom-ad-MREC {display:none !important;}');

