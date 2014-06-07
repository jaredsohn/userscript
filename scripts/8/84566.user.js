// ==UserScript==
// @name           skip_linkbuck
// @namespace      script de Levi59
// @description    passe automatiquement le bandeau de pub de linkbuck
// @include        *.linkbucks.com/
// @include        *.wslinx.com/
// ==/UserScript==

if (document.location.href.match(/linkbucks\.com/)){
    window.location=document.getElementById("content").src;
}

if (document.location.href.match(/wslinx\.com/)){
    window.location=document.getElementById("iframe").src;
}

