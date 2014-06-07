// ==UserScript==
// @name           Ignorar Topicos
// @description    Ignorar topicos dos usuarios cujo uid voce informar.
// @include        http://www.orkut.com*/*CommTopics?cmm=*
// ==/UserScript==

var UIDs = new Array (
"0641"
);

var trs = document.getElementsByTagName("tr");
for (i = 0; i < trs.length; i++) {
	if (trs[i].className.indexOf("list") > -1) {
		var perfil = trs[i].getElementsByTagName("a")[1].href;
		for (j = 0; j < UIDs.length; j++) {
			if (perfil.indexOf(UIDs[j]) > -1) {
				trs[i].style.display = "none";
				break;
			}
		}
	}
}