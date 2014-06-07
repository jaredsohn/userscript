/*
// ==UserScript==
// @name		JuTób Logo
// @description		Zamienia logo YouTube na takie z napisem "JuTób".
// @namespace		IQuben
// @version		1.0
// @include		http://*youtube.com*
// ==/UserScript==
*/
document.getElementById('masthead').
	getElementsByTagName('a')[0].
		innerHTML='<img id="logo" class="master-sprite" src="http://img199.imageshack.us/img199/197/jutoblogo.jpg" alt="YouTube home">';