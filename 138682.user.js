// ==UserScript==
// @name	zoom
// @description testing

// @include	http://www.facebook.com/
// ==/UserScript==

function click(css) {
    var e,s;
    e= document.getElementsByTagName('head')[0];
  //alert(e.length);
    if (!e){ return; }
    s = document.createElement('style');
    s.type = 'text/css';
    s.innerHTML = css;
    e.appendChild(s);
}
click(' ::selection {font-size:150%;color:red;} ::-moz-selection{font-size:150%;color:red;}');
