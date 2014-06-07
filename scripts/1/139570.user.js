// ==UserScript==
// @name        Guardian Olympics frontpage section remover
// @namespace   http://userscripts.org/users/lorriman
// @description 'Hiding' the front page olympics section doesn't stick. This addresses that.
// @include     http://www.guardian.co.uk/*
// @match     http://www.guardian.co.uk/*
// @version     .1
// ==/UserScript==

item=document.getElementsByClassName('component olympics-2012 bento');
item[0].style.display='none';

