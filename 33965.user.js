// ==UserScript==
// @name           unSpoil
// @namespace      http://userscripts.org/users/33073/scripts
// @description    Macht Spoiler klickbar
// @include        http://forum.mods.de/bb/thread.php*
// ==/UserScript==


// style fuer den link
const unspoil   = "font-size: 14pt; font-weight: bold; color: #ddd; cursor: pointer;";
// style fuer den spoiler
const unspoiled = "border: 1px solid #ccc; padding: 3px;"



GM_addStyle(".unspoil {" + unspoil + "} .unspoiled {" + unspoiled + "} .spoiler { display: none; }");
var spoilers = document.evaluate("//td[@vAlign='top' and @align='left']//i[.='Spoiler']", document, null, 6, null), i, spoiler;
for (i=0; i<spoilers.snapshotLength; i++) {
	spoiler = spoilers.snapshotItem(i);
	spoiler.nextSibling.textContent = "";
	spoiler.className = "unspoil";
	spoiler.addEventListener("click", function() {
		var div = this.nextSibling.nextSibling.nextSibling.nextSibling;
		div.className = div.className == "unspoiled" ? "spoiler" : "unspoiled";
	}, false);
}