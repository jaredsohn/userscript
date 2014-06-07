// ==UserScript==
// @name           Stainds
// @namespace       
// @description    Ajoute ses fora préférés dans le menu latéral gauche.
// @include        http://www.jeuxvideo.com/forums/*
// @author         Mega
// @date            12/07/09
// ==/UserScript==

var Mega_Forums = new Array();

function ajouter() {
	var url;
	var trouve = false;
	
	if (self.location.href.match(/^http:\/\/www\.jeuxvideo\.com\/forums\/0/)) url = self.location.href;
	else url = "http://www.jeuxvideo.com/forums/0-" + self.location.href.split("-")[1] + "-0-1-0-1-0-0.htm";
	
	for (i = 0; i < Mega_Forums.length; i++) {
		if (Mega_Forums[i][1] == url) trouve = true;
	}
	
	if (!trouve) {
		var titre = prompt("Entrez le nom du forum :");
		if (titre != "" && titre != null) {
			Mega_Forums.push(new Array(titre, url));
			Mega_Forums = Mega_Forums.sort();
			GM_setValue("forums", Mega_Forums.join());
			afficheListe();
		}
	}
}

function click(event) {
	if (event.which == 1) self.location.href = Mega_Forums[this.id][1];
	else {
		if (confirm("Forum : " + this.innerHTML + "\nConfirmez-vous la suppression ?")) {
			Mega_Forums.splice(this.id, 1);
			Mega_Forums = Mega_Forums.sort();
			GM_setValue("forums", Mega_Forums.join());
			if (Mega_Forums.length > 0) afficheListe();
			else document.getElementById("menu_rubriques").removeChild(document.getElementById("menu_forums"));
		}
	}
}	

function afficheListe() {
	if (document.getElementById("menu_forums")) document.getElementById("menu_rubriques").removeChild(document.getElementById("menu_forums"));
	
	var div = document.createElement("div");
		div.id = "menu_forums";
		div.style.background = "url(http://www.noelshack.com/uploads/16062009/forum043075.PNG)";
	var h3 = document.createElement("h3");
	var span = document.createElement("span");
		span.innerHTML = "Forums";
	h3.appendChild(span);
	div.appendChild(h3);
	var ul = document.createElement("ul");
	
	for (var i = 0; i < Mega_Forums.length; i++) {
		var li = document.createElement("li");
		var a = document.createElement("a");
			a.id = i;
			a.innerHTML = Mega_Forums[i][0];
			a.style.cursor = "pointer";
			a.setAttribute("oncontextmenu", "return false;");
			a.addEventListener("mouseup", click, false);
		li.appendChild(a);
		ul.appendChild(li);
		}
	div.appendChild(ul);
	
	var bloc = document.getElementById("menu_concours");
	var parent = bloc.parentNode;
	parent.insertBefore(div, bloc);
}

function main() {
	var li = document.createElement("li");
	var a = document.createElement("a");
		a.innerHTML = "Ajouter ce forum";
		a.style.cursor = "pointer";
		a.addEventListener("click", ajouter, false);
	li.appendChild(a);
	var bloc = document.getElementById("menu_interactif").getElementsByTagName("ul")[0];
		bloc.insertBefore(li, bloc.firstChild);
	
	var temp = GM_getValue("forums", "");
	if (temp != "") {
		var tempTbl = temp.split(",");
		for (var i = 0; i < tempTbl.length; i += 2) Mega_Forums.push(new Array(tempTbl[i], tempTbl[i + 1]));
		Mega_Forums = Mega_Forums.sort();
	}
	
	if (Mega_Forums.length > 0) afficheListe();
}

main();
