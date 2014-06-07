// ==UserScript==
// @name           LyricWiki Copy-Enabler
// @namespace      MRX_II
// @description    Disables LyricWiki's copyprotection, thus enabling the copying of lyrics. Drag, and then copy with CTRL+C
// @include        http://lyrics.wikia.com/*
// ==/UserScript==
function EnableCopy() {
	var toBeReplaced = /-moz-user-select: none; cursor: default;/gi; //What code blocks it, at least for me & Mozilla FF Edit: And the cursor to show the text-select when selecting.
	var toBeReplacedTo = ''; //Nothingness =)
	document.body.innerHTML = document.body.innerHTML.replace(toBeReplaced, toBeReplacedTo);  //Replace!
}
//Uh, something's missing.
EnableCopy();
//A-ha! =)