// ==UserScript==
// @name        czysciciel-blog-pl
// @namespace   http://weblove.pl/
// @include     http://*blog.pl*
// @include     http://*uchwycone-chwile.pl*
// @include     http://*piszecomysle.pl*
// @include     http://*crazylife.pl*
// @include     http://*blogujaca.pl*
// @include     http://*blogujacy.pl*
// @include     http://*blogonet.pl*
// @include     http://*onetblog.pl*
// @include     http://*blog.onet.pl*
// @version     1.1.0
// ==/UserScript==

//if(document.getElementById("") == null) return;

var headID = document.getElementsByTagName('head')[0];
var style = document.createElement('style');   
    style.type = 'text/css';
style.innerHTML = '<!-- html {margin-top: 0 !important;} body #slidebox, #ad_slot_container, #blogBarTopBar, #slideboxBottomContainer, #TB_overlay, #TB_window, #onet-ad-top, body center div iframe {display: none !important;} -->';
  headID.appendChild(style);