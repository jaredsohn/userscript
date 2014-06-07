// ==UserScript==
// @name	test
// @description testing

// @include	http://www.facebook.com/
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
style('#rightCol #pagelet_ego_pane_w .ego_column {display:none !important;}');

