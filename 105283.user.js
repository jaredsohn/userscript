// ==UserScript==
// @name           DDO Ignore Forum
// @namespace      http://forums.ddo.com/showthread.php?t=322786
// @description    Removes the PvP, Suggestions, German, and French Forums from the New Posts page. Can be edited to remove any forums.
// @include        http://forums.ddo.com/search.php?searchid=*
// ==/UserScript==

// note: I'm hiding the PvP forum (f=184) and the Suggestions forum (f=75). You can edit the entries below to remove whatever forums you don't want to see.
// german: Deutschsprachige Foren (f=241), Rekrutierung (f=242), Allgemeine Diskussionen (f=243), Ankündigungen & Service-News (f=251)
// french: Forums francophones (f=182), Annonces et Services - Actualités (f=252), Discussions générales (f=244), Recrutement (f=39)

var rows = document.evaluate(
'//tr/td/a[@href="forumdisplay.php?f=184" or @href="forumdisplay.php?f=75" or @href="forumdisplay.php?f=241" or @href="forumdisplay.php?f=242" or @href="forumdisplay.php?f=243" or @href="forumdisplay.php?f=251" or @href="forumdisplay.php?f=182" or @href="forumdisplay.php?f=252" or @href="forumdisplay.php?f=244" or @href="forumdisplay.php?f=39"]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null)
for (i = 0; i < rows.snapshotLength; i++) {
foo = rows.snapshotItem(i).parentNode.parentNode
foo.parentNode.removeChild(foo)
}
