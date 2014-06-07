// ==UserScript==
// @name           Welt.de Klickstrecker
// @namespace      janschejbal-weltde-klickstrecker
// @description    Faltet auf Wunsch (Benutzerskript-Befehl im Greasemonkey-Menü) Klickstrecken auf Welt.de auf
// @include        http://www.welt.de/*
// ==/UserScript==


function weltdeOpen() {
	var eintraege = document.getElementsByClassName('galleryContent');
	for each (var eintrag in eintraege) eintrag.style.display = 'block';
}

GM_registerMenuCommand("Welt.de Klickstrecken strecken", weltdeOpen);