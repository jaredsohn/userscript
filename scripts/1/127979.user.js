// ==UserScript==
// @name           Deus lo Vult! Suggestions
// @namespace      http://userscripts.org/users/62031
// @include        http://www.deuslovult.org/*
// ==/UserScript==

function getPageHeight() {
    c = document.getElementById('content').clientHeight;
    s = document.getElementById('sidebar').clientHeight;
    return Math.max(c,s) + 200; /* erro do footer? */   
}

function setPageHeight() {    
    e = document.getElementById('wrapper');
    e.style.height = getPageHeight() + 'px'; 
}

window.onload=setPageHeight;

