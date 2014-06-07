// ==UserScript==
// @name        Guardian - no paralympics or olympics
// @namespace   http://userscripts.org/users/lorriman
// @description Gets rid of the paralympics section of the front page
// @include     http://www.guardian.co.uk/*
// @match     http://www.guardian.co.uk/*
// @version     1
// ==/UserScript==

item=document.getElementsByClassName('component paralympics-2012 bento	');
item[0].style.display='none';
