// ==UserScript==
// @name           Monster
// @namespace      Monster1
// @include        http://jobsearch.monster.*/jobs/*
// ==/UserScript==

// Remove popup Toolbar

var element = document.getElementById('toolbar');
element.parentNode.removeChild(element);

// Remove right sidebar

var element = document.getElementById('sidebarRight');
element.parentNode.removeChild(element);

// Expand results

var element = document.getElementById('contentWell');
element.style.width = '100%';

var element = document.getElementById('centerColumn');
element.style.width = '746px';

// Remove iframes (ads)

while((el=document.getElementsByTagName('iframe')).length){el[0].parentNode.removeChild(el[0]);}

