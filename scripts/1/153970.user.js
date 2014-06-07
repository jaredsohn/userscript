// ==UserScript==
// @name        Quora_remove_user_invites
// @namespace   http://localhost
// @include     http://www.quora.com/*
// @include     https://www.quora.com/*
// @version     1
// ==/UserScript==

var invites = document.getElementsByClassName('section people_you_might_know');

for (i=0;i<invites.length;i++)

{
	invites[i].style.visibility = 'hidden';
}