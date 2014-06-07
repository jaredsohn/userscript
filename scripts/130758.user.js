// ==UserScript==
// @name           Embiggen G+
// @namespace      who.is.matt.burns
// @description    Extends the G+ stream to reduce whitespace on wide screens
// @include        https://plus.google.*
// ==/UserScript==

function fixGooglePlusLayout() {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = ".lzqA1d { padding-right:400px!important; }  div.ncGWdc { width:100%!important; margin-right:-340px!important; }  .L9ru2b { width:266px!important; }  div.KSB3fe > div:not(.mbKrWe) { padding-right:380px!important; }  div.hsHREd { left:auto!important; right:20px!important; }  div.hm6vRc { float:none!important; margin-left:100px!important; }  div.t0Scwf { width:100%!important; text-align:center!important; }  div.c0Q1bc { float:none!important; margin-left:10px; }  div.Ffh0jb { float:none!important; }  div.fB2X4e { padding-right:20px!important; }  div.VR1Mme { float:left!important; }  div.Te,div.KSB3fe,div.SG,div.HWkrRb,div.N3caIc,div.MwLwy,div.siuEse,div.jbhX0d,div.RazREb.ZI35oe.c-wa-Da.ncGWdc > div { width:100%!important; }  div.kSwsJc,.CPLjOe { width:auto!important; }";
    head.appendChild(style);
}

fixGooglePlusLayout();