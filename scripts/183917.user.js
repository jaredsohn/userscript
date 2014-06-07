// ==UserScript==
// @name			OkCupid Auto Options
// @description		Automatically clicks the "More options" toggle on OkCupid profiles
// @version			1.0
// @include			http://www.okcupid.com/profile/*

// ==/UserScript==

var thing=document.getElementsByClassName('action_options');
thing[0].parentElement.setAttribute("class", 'show_options');