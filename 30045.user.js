// ==UserScript==
// @name           PM Re: nur einmal
// @namespace      http://userscripts.org/users/33073/scripts
// @description    keine 20 Re: mehr
// @include        http://forum.mods.de/bb/pm/*
// ==/UserScript==

var input = document.evaluate("//input[@class='w' and @name='subj']", document, null, 6, null), i, k;
for (i=0; i<input.snapshotLength; i++) {
	k = input.snapshotItem(i);
	k.value = k.value.replace(/^(Re:\s)*/g, "");
	k.value = "Re: "+k.value;
}