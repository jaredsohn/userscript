// ==UserScript==
// @name           AoA Choices
// @description    Modifies WTG profile to add AoA choices
// @include        http://community.watchtheguild.com/*
// @match        http://community.watchtheguild.com/*
// ==/UserScript==

{
    var ps = document.getElementsByName("question_35")
	if (ps) {
		ps[0].innerHTML = ps[0].innerHTML + "<option value=\"Fawkes\">Fawkes</option><option value=\"Venom\">Venom</option><option value=\"Bruiser\">Bruiser</option><option value=\"Kwan\">Kwan</option><option value=\"Valkyrie\">Valkyrie</option>"
	}
}
