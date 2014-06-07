// ==UserScript==
// @name          TheOneTrueOne
// @namespace     http://neowin.net/
// @description	  Removes header at the top of neowin.net (may require Adblock+)
// @include       http://www.neowin.net/
// ==/UserScript==
who=document.getElementById('header-promos');
who.parentNode.removeChild(who);