// ==UserScript==
// @name           Ignorer
// @namespace       
// @description    Permet d'ignorer les gens
// @include        http://www.jeuxvideo.com/forums/1-*
// @include        http://www.jeuxvideo.com/forums/3-*
// ==/UserScript==

var Mega_Liste = new Array();

function ignorer() {
	var pseudo = this.parentNode.getElementsByTagName("strong")[0].innerHTML;
		pseudo = pseudo.toLowerCase();
	Mega_Liste.push(pseudo);
	this.firstChild.title = "Voir";
	this.firstChild.src = "http://www.noelshack.com/uploads/16062009/voir022197.gif";
	this.addEventListener("click", voir, false);
	GM_setValue("ignore", Mega_Liste.join());
	applique();
}

function voir() {
	var pseudo = this.parentNode.getElementsByTagName("strong")[0].innerHTML;
		pseudo = pseudo.toLowerCase();
	for (var i = 0; i < Mega_Liste.length; i++) {
		if (Mega_Liste[i] == pseudo) Mega_Liste.splice(i, 1);
	}
	if (Mega_Liste.length < 0) GM_setValue("ignore", Mega_Liste.join());
	else GM_setValue("ignore", "");
	self.location = self.location;
}

function boutons() {
	if (document.getElementById('col1')) {
		var lis = document.getElementById('col1').getElementsByTagName("li");
		for (var u = 0; u < lis.length; u++) {
			if (lis[u].className == 'pseudo') {
				var ignore = (lis[u].nextSibling.nextSibling.nextSibling.nextSibling.innerHTML == "<i>Ce pseudo est ignoré.</i>");
				var img = document.createElement("img");
					img.title = ignore ? "Voir" : "Ignorer";
					img.src = ignore ? "http://www.noelshack.com/uploads/16062009/voir022197.gif" : "http://www.noelshack.com/uploads/16062009/ignorer067955.gif";
					img.style.marginLeft = "4px";
				var a = document.createElement("a");
					a.style.cursor = "pointer";
					if (ignore) a.addEventListener("click", voir, false);
					else a.addEventListener("click", ignorer, false);
					a.appendChild(img);
				lis[u].appendChild(a);
			}
		}
	}
}

function applique() {
	if (document.getElementById('col1')) {
		var lis = document.getElementById('col1').getElementsByTagName("li");
		for (var u = 0; u < lis.length; u++) {
			if (lis[u].className == 'pseudo') {
				var pseudo = lis[u].getElementsByTagName("strong")[0].innerHTML;
					pseudo = pseudo.toLowerCase();
				var bool = false;
				for (var i = 0; i < Mega_Liste.length; i++) {
					if (Mega_Liste[i] == pseudo) bool = true;
				}
				if (bool) lis[u].nextSibling.nextSibling.nextSibling.nextSibling.innerHTML = "<i>Ce pseudo est ignoré.</i>";
			}
		}
	}
}

function main() {
	var lst = GM_getValue("ignore", "");
	if (lst != "") Mega_Liste = lst.split(",");
	applique();
	boutons();
}

main();
