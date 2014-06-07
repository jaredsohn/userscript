// ==UserScript==
// @name           SC Forum Cleanup
// @description    WIP CSS and other fixes for SC forum
// @author         John Tennyson
// @include        http://www.robertsspaceindustries.com/forum/*
// @include        https://www.robertsspaceindustries.com/forum/*
// @version        0.2
// ==/UserScript==

GM_addStyle ('.postbit-lite { background: rgba(250, 250, 250, 0.3) !important; }');
GM_addStyle ('.postbit-lite .postbithead { background: rgba(242, 246, 248, 0.22) !important; }');

for( i = 0; (l = document.getElementsByTagName("link")[i]); i++ ) {
    if( l.getAttribute("href").indexOf("vb-only.css") >= 0 ) l.disabled = true;
}
