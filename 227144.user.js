// ==UserScript==
// @name			OkCupid Save/Load Search Enabler
// @description		Restores the Save/Load search options functionality to the search page
// @version			1.0
// @include			http://www.okcupid.com/match*

// ==/UserScript==

var thing=document.getElementById('load_button');
thing.style.display='block';
thing.style.cssFloat='right';

thing=document.getElementById('save_button');
thing.style.display='block';
thing.style.cssFloat='right';