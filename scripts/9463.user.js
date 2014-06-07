// ==UserScript==
// @name           studivz annoyances remover
// @description    Entfernt die Werbeblöcke bei studivz
// @include        http://www.studivz.net/*
// ==/UserScript==
// 
// ChangeLog
// v0.1 first release
//
// v0.2 entfernt jetzt auch den Telegramm Block
//
// v0.3 die Yahoo Suche und der announce-Block werden entfernt
//
// v0.4 Yahoo Sponsored Links werden entfernt
//
// v0.5 Schaufenster entfernt, Code aufgeräumt, Empfehlungen von 
//      11lein und lazka eingepflegt, doubleclick-Werbung entfernt




(function() {
	var announce;
	announce = document.evaluate(
		"//div[@class='leftmess']|//div[@class='yahoo_leftnav']|//div[@class='yahoo_sponsored_links']|//div[contains(div/h2/span,'Schaufenster')]|//div[contains(div/h2/span,'Telegramm')]|//div[contains(div/h2/span,'Neuigkeiten')]|//div[contains(script,'doubleclick')]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < announce.snapshotLength; i++) {
 		announce.snapshotItem(i).style.display="none";

	}
}
)();
