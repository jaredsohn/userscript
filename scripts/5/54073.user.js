// ==UserScript==
// @name           WhatTheMovie - GuessField Focus
// @include        http://whatthemovie.com/shot/*
// @namespace      http://userscripts.org/users/99643
// @description    sets the focus into the guessing field for the movie title. So you can guess right away without having to scroll down or click the input field
// ==/UserScript==

var input = document.getElementById('guess');
if(input){
	input.focus();
}