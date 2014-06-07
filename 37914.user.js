// ==UserScript==
// @name           JvLastPage
// @namespace       
// @description    Accès à la dernière page de chaque topic par son icône
// @include        http://www.jeuxvideo.com/forums/0-*
// ==/UserScript==

function surf(event) {
	var nb = this.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
		nb = parseInt(nb / 20 + 1);
	var url = this.parentNode.nextSibling.nextSibling.getElementsByTagName("a")[0].href;
	if (event.which == 1) url = url.replace(/(\/1\-[0-9]+\-[0-9]+\-)[0-9]+(\-)/g, "$1" + nb + "$2");
	else url = url.replace(/\/1\-([0-9]+\-[0-9]+\-)[0-9]+(\-[^"]+)/g, "/3-" + "$1" + nb + "$2" + "#form_post");
	window.location.href = url;
	return false;
}

function main() {
	var tr = document.getElementById('liste_topics').getElementsByTagName("tr");
	for (var i = 1; i < tr.length; i++) {
		var img = tr[i].getElementsByTagName("td")[0].getElementsByTagName("img")[0];
			img.title = "Left : Dernière page - Right : Répondre";
			img.setAttribute("oncontextmenu", "return false;");
			img.style.cursor = "pointer";
			img.addEventListener("mouseup", surf, false);
	}
}

main();