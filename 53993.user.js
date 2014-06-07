// ==UserScript==
// @name           MegaMix
// @namespace       
// @description    Plusieurs fonctionnalités.
// @include        http://www.jeuxvideo.com/forums/*
// @author         Mega
// @date             19/07/09
// ==/UserScript==

var mode = parseInt(self.location.href.toString().split("/")[4].charAt(0));
var forum = self.location.href.toString().split("-")[1];
var urlRepondre = self.location.href.toString().replace(/(http:\/\/www.jeuxvideo.com\/forums\/)1(\-[^"]+)/, "$1" + "3" + "$2") + "#form_post";
var Mega_Liste = new Array();
var Mega_Forums = new Array();

function format(nick) {
	return nick.substr(0, 1).toString().toUpperCase() + nick.substr(1);
}

function getCol(content) {
   temp = content.toLowerCase();
   var x = temp.indexOf("<div id=\"profil\">");
   if (x == -1) return "";
   var y = temp.lastIndexOf("<div id=\"prefs\">");
   if (y == -1) y = temp.indexOf("</div>");
   if (y == -1) y = temp.lastIndexOf("</html>");
   if (y == -1) y = content.length;
   return content.slice(x, y);   
}

function newLook() {
	var cache = document.createElement("div");
		cache.id = "cache";
		cache.style.display = "none";
	document.getElementById("col1").appendChild(cache);
	var lis = document.getElementById('col1').getElementsByTagName("div");
	document.getElementById("col1").style.visibility = "hidden";
	
	for (var u = 0; lis[u]; u++) {
		if (lis[u].id.match('message_')) {
			req = new XMLHttpRequest();
			req.open("GET", lis[u].getElementsByTagName("a")[0].href, false);
			req.send(null);
			cache.innerHTML = getCol(req.responseText);
			
			var banni = (cache.getElementsByTagName("p")[0].innerHTML == "Ce pseudo a été banni.");
			var parent = lis[u];
			var contenu = parent.getElementsByTagName("ul")[0];
			var pseudo = contenu.getElementsByTagName("strong")[0];
				pseudo.style.display = "block";
				pseudo.style.marginBottom = "5px";
			var dateTemp = contenu.getElementsByTagName("li")[1].innerHTML.split("\n")[1];
				dateTemp = dateTemp.replace("Posté le", "");
				dateTemp = dateTemp.replace("à", "<br>");
			var date = document.createElement("span");
				date.innerHTML = dateTemp;
				date.style.fontSize = "10px";
				date.style.marginTop = "5px;"
				date.style.display = "block";
			var post = contenu.getElementsByTagName("li")[2];
				post.style.background = "none";
				post.style.listStyle = "none";
				post.style.border = "0";
				post.style.paddingLeft = "5px";
				post.style.display = "block";
			var ancre = contenu.getElementsByTagName("li")[3];
				ancre.style.listStyle = "none";
				ancre.style.position = "absolute";
				ancre.style.marginLeft = "-80px";
				ancre.style.marginTop = "-18px";
			var a = contenu.getElementsByTagName("a")[0];
			
			if (!banni)	h1 = document.getElementById("pseudo");
			if (!banni) pseudo.style.color = (h1.className == "sexe_f") ? "#ff3399" : "#0066cc";
			else pseudo.style.color = "#C00";
			
			var img = document.createElement("img");
				img.title = "Avatar";	
				img.style.padding = "0";
				img.style.marginTop = "5px";
				img.style.marginBottom = "5px";
				img.style.display = "block";
					
			if (!banni)	img.src = document.getElementById("cache").getElementsByTagName("img")[0].src;
			else img.src = "http://www2.noelshack.com/uploads/rip045441.jpg";
				
			var exImg = contenu.getElementsByTagName("img")[0];
			a.replaceChild(img, exImg);
				
			var nbTemp;
			if (!banni) {
				nbTemp = document.getElementById("cache").getElementsByTagName("strong")[0].innerHTML;
				nbTemp = nbTemp.replace("Nombre de messages postés sur les forums : ", "");
				nbTemp += " posts.<br><br>";
			} else nbTemp = "¤";
			
			var nb = document.createElement("span");
				nb.innerHTML = nbTemp;
				nb.style.fontFamilily = "Arial";
				nb.style.fontSize = "10px";
				nb.style.fontWeight = "bold";
			var table = document.createElement("table");
				table.className = "li";
				table.style.width = "100%";
			var tr = document.createElement("tr");
			var td = document.createElement("td");
				td.align = "center";
				td.style.verticalAlign = "top";
			switch (lis[u].className) {
				case "msg msg1" : td.style.borderRight = "1px solid #c0d7ed"; break;
				case "msg msg2" : td.style.borderRight = "1px solid #d1d1d1"; break;
				}
			td.style.padding = "10px";
			td.style.width = "110px";
			td.appendChild(pseudo);
			td.appendChild(a);
			td.appendChild(nb);
			td.appendChild(date);	
			tr.appendChild(td);
				
			var span = document.createElement("span");
				span.appendChild(document.createTextNode("Contenu du message :"));
				span.style.fontWeight = "bold";
			var minTd = document.createElement("td");
				minTd.align = "left";
				minTd.appendChild(span);
			var minTr = document.createElement("tr");
				minTr.appendChild(minTd);
			var a = contenu.getElementsByTagName("a")[0];
			var minTd = document.createElement("td");
				minTd.className = "lesBoutons";
				minTd.align = "right";
				minTd.appendChild(a);
			minTr.appendChild(minTd);
			var minTable = document.createElement("table");
				minTable.style.borderBottom = "1px solid rgb(200,200,200)";
				minTable.style.width = "100%";
				minTable.appendChild(minTr);
			var div = document.createElement("div");
				div.style.padding = "0";
				div.style.marginLeft = "-3px";
				div.appendChild(minTable);
				div.style.paddingLeft = "5px";
				div.style.paddingTop = "5px";
			var td = document.createElement("td");
				td.style.padding = "0";
				td.style.paddingBottom = "20px";
				td.style.verticalAlign = "top";
				td.appendChild(div);
				td.appendChild(post);
			tr.appendChild(td);
			var td = document.createElement("td");
				td.style.padding = "0";
				td.style.verticalAlign = "bottom";
				td.appendChild(ancre);
			tr.appendChild(td);
			table.appendChild(tr);
			
			lis[u].replaceChild(table, contenu);
		}
	}
	document.getElementById("col1").style.visibility = "visible";
}

function writeCitation() {
	var pseudo = GM_getValue("pseudo", "Inconnu");
	var date = GM_getValue("date", "à une date imaginaire");
	var post = GM_getValue("post", "Ce copier/coller n'a pas reçu de données de départ. :(");
	var ancre = GM_getValue("ancre", "Il n'y a pas de lien pour un post qui n'existe pas.");
	
	GM_setValue("pseudo", "");
	GM_setValue("date", "");
	GM_setValue("post", "");
	GM_setValue("ancre", "");
	GM_setValue("citation", 0);
	
	var ligneIn = ".................................. .................................. ................................. .................................. ..................................";
	message = document.getElementById("newmessage");
	message.innerHTML = pseudo + " a écrit ";
	message.innerHTML += date + "....\n" + ligneIn + "\n" + post + "\n" + ligneIn + "\n" + ancre + "\n\n+> ";
	message.focus();
}

function citerMode1() {
	var parent = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
	var pseudo = parent.getElementsByTagName("strong")[0].innerHTML;
	var date = parent.getElementsByTagName("span")[1].innerHTML;
		date = "le " + date.split("<br>")[0] + "à" + date.split("<br>")[1];
	var post = parent.getElementsByTagName("li")[0].innerHTML;
		post = post.replace(/ ?<img src="[^"]+" alt="([^"]+)" ?\/?> ?/gi, " $1 ");
		post = post.replace(/<a href="([^"]+)" target="_blank">[^"]+<\/a>/gi, "$1");
		post = post.replace(/\n/g, "");
		post = post.replace(/<br>/g, "\n");
		post = post.replace(/\n\n*/g, "\n");
	var ancre = parent.getElementsByTagName("li")[1].innerHTML;
		ancre = ancre.replace(/<a href="([^"]+)">Lien permanent<\/a>/, "$1");
	
	GM_setValue("pseudo", pseudo);
	GM_setValue("date", date);
	GM_setValue("post", post);
	GM_setValue("ancre", ancre);
	GM_setValue("citation", 1);
	
	self.location.href = urlRepondre;
}

function citerMode3() {
	var parent = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
	var pseudo = parent.getElementsByTagName("strong")[0].innerHTML;
	var date = parent.getElementsByTagName("span")[1].innerHTML;
		date = "le " + date.split("<br>")[0] + "à" + date.split("<br>")[1];
	var post = parent.getElementsByTagName("li")[0].innerHTML;
		post = post.replace(/ ?<img src="[^"]+" alt="([^"]+)" ?\/?> ?/gi, " $1 ");
		post = post.replace(/<a href="([^"]+)" target="_blank">[^"]+<\/a>/gi, "$1");
		post = post.replace(/\n/g, "");
		post = post.replace(/<br>/g, "\n");
		post = post.replace(/\n\n*/g, "\n");
	var ancre = parent.getElementsByTagName("td")[3].lastChild.href;
		ancre = ancre.split("&");
		ancre = "http://www.jeuxvideo.com/forums/1-" + ancre[1].split("=")[1] + "-" + ancre[2].split("=")[1] + "-" + ancre[4].split("=")[1] + "-0-1-0-0.htm#message_" + ancre[3].split("=")[1];
	
	var ligneIn = ".................................. .................................. ................................. .................................. ..................................";
	message = document.getElementById("newmessage");
	message.value += pseudo + " a écrit ";
	message.value += date + "....\n" + ligneIn + "\n" + post + "\n" + ligneIn + "\n" + ancre + "\n\n+> ";
	message.focus();
}

function citerButton() {
	if (document.getElementById('col1')) {
		var td = document.getElementById('col1').getElementsByTagName("td");
		for (var u = 0; td[u]; u++) {
			if (td[u].className == 'lesBoutons') {
				var img = document.createElement("img");
					img.title = "Citer";
					img.src = "http://www.noelshack.com/uploads/citer052028.gif";
					img.style.marginRight = "4px";
				var a = document.createElement("a");
					a.style.cursor = "pointer";
				switch (mode) {
					case 1: a.addEventListener("click", citerMode1, false); break;
					case 3: a.addEventListener("click", citerMode3, false); break;
					}
				a.appendChild(img);
				td[u].insertBefore(a, td[u].firstChild);
				}
			}
		}
}

function ignorer() {
	var parent = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
	var pseudo = parent.getElementsByTagName("strong")[0].innerHTML;
		pseudo = pseudo.toLowerCase();
	Mega_Liste.push(pseudo);
	this.firstChild.title = "Voir";
	this.firstChild.src = "http://www.noelshack.com/uploads/16062009/voir022197.gif";
	this.addEventListener("click", voir, false);
	GM_setValue("ignore", Mega_Liste.join());
	applique();
}

function voir() {
	var parent = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
	var pseudo = parent.getElementsByTagName("strong")[0].innerHTML;
		pseudo = pseudo.toLowerCase();
	for (var i = 0; i < Mega_Liste.length; i++) {
		if (Mega_Liste[i].match(pseudo)) Mega_Liste.splice(i, 1);
	}
	if (Mega_Liste.length < 0) GM_setValue("ignore", Mega_Liste.join());
	else GM_setValue("ignore", "");
	self.location = self.location;
}

function ignorerButton() {
	if (document.getElementById('col1')) {
		var td = document.getElementById('col1').getElementsByTagName("td");
		for (var u = 0; u < td.length; u++) {
			if (td[u].className == 'lesBoutons') {
				var parent = td[u].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
				var ignore = (parent.getElementsByTagName("li")[0].innerHTML == "<i>Ce pseudo est ignoré.</i>");
				var img = document.createElement("img");
					img.title = ignore ? "Voir" : "Ignorer";
					img.src = ignore ? "http://www.noelshack.com/uploads/16062009/voir022197.gif" : "http://www.noelshack.com/uploads/16062009/ignorer067955.gif";
					img.style.marginRight = "4px";
				var a = document.createElement("a");
					a.style.cursor = "pointer";
					if (ignore) a.addEventListener("click", voir, false);
					else a.addEventListener("click", ignorer, false);
					a.appendChild(img);
				td[u].insertBefore(a, td[u].firstChild);
			}
		}
	}
}

function applique() {
	if (document.getElementById('col1')) {
		var table = document.getElementById('col1').getElementsByTagName("table");
		for (var u = 0; u < table.length; u++) {
			if (table[u].className == 'li') {
				var pseudo = table[u].getElementsByTagName("strong")[0].innerHTML;
					pseudo = pseudo.toLowerCase();
				var bool = false;
				for (var i = 0; i < Mega_Liste.length; i++) {
					if (Mega_Liste[i].match(pseudo)) bool = true;
				}
				if (bool) table[u].getElementsByTagName("li")[0].innerHTML = "<i>Ce pseudo est ignoré.</i>";
			}
		}
	}
}

function citer() {
	citerButton();
	if (GM_getValue("citation", 0) == 1) writeCitation();
}

function statistiques() {
	var a = document.createElement("a");
		a.href = "http://jvstats.planet-shitfliez.net/stats/inflate.php?num=" + forum;
		a.target = "_blank";
		a.innerHTML = "Statistiques";
	var li = document.createElement("li");
		li.appendChild(a);
	document.getElementById("menu_interactif").getElementsByTagName("ul")[0].appendChild(li);
}

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

function forums() {
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

function main() {
	if (mode != 0) {
		newLook();
		var lst = GM_getValue("ignore", "");
		if (lst != "") Mega_Liste = lst.split(",");
		applique();
		ignorerButton();
		citer();
	}
	statistiques();
	forums();
}

main();


