// ==UserScript==
// @name           MB. add alias sort name
// @version        2012-06-15_1935
// @description    Copy as you type it alias name into alias sort name (only if the situation allows it and is appropriate) instead of letting empty sort name
// @namespace      http://userscripts.org/scripts/show/133889
// @author         Tristan DANIEL (jesus2099)
// @contact        http://miaou.ions.fr
// @licence        GPL (http://www.gnu.org/copyleft/gpl.html)
// @include        http://*musicbrainz.org/*/add-alias
// @include        http://*musicbrainz.org/*/alias/*/edit
// ==/UserScript==
(function () {
var oldaliasname = "";
if ((aliasname = document.getElementById("id-edit-alias.name")) && (aliassortname = document.getElementById("id-edit-alias.sort_name"))) {
	if (self.location.href.match(/add-alias$/)) { aliassortname.value = aliasname.value; }
	aliasname.style.setProperty("background-color", "#eef");
	oldaliasname = aliasname.value;
	aliasname.focus();
	aliasname.addEventListener("keyup", function(e) {
		if (aliassortname.value == oldaliasname || aliassortname.value == "") {
			aliassortname.value = aliasname.value;
		}
		oldaliasname = aliasname.value;
	}, false);
}
})();