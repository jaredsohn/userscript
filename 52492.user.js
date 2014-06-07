// ==UserScript==
// @name           JvAnnivAlert
// @namespace       
// @description    Affiche une alerte lorsque c'est l'anniversaire d'un forumeur
// @include        http://www.jeuxvideo.com/forums/0-13756-0-1-0-1-0-0.htm
// @include        http://www.jeuxvideo.com/forums/1-13756-5434-*-0-1-0-0.htm
// @author         Mega
// @date            27/06/09
// ==/UserScript==

var mode = parseInt(self.location.href.toString().split("/")[4].charAt(0));
var today = new Date();
var lien = GM_getValue("lien", "http://www.jeuxvideo.com/forums/1-13756-5434-17-0-1-0-0.htm#message_86399");
var id = lien.split("#")[1];
var pseudo = "";
var mois = "";
var calendar = new Array();
var fete = new Array();

function extraire(content) {
   temp = content.toLowerCase();
   var x = temp.indexOf("<div id=\"col1\">");
   if (x == -1) return "";

   var y = temp.lastIndexOf("<div id=\"col2\">");
   if (y == -1) y = temp.lastIndexOf("</html>");
   if (y == -1) y = content.length;

   return content.slice(x, y);   
}

function numero(mois) {
	var liste = new Array();
		liste["JANVIER"] = 0;
		liste["FEVRIER"] = 1;
		liste["MARS"] = 2;
		liste["AVRIL"] = 3;
		liste["MAI"] = 4;
		liste["JUIN"] = 5;
		liste["JUILLET"] = 6;
		liste["AOUT"] = 7;
		liste["SEPTEMBRE"] = 8;
		liste["OCTOBRE"] = 9;
		liste["NOVEMBRE"] = 10;
		liste["DECEMBRE"] = 11;
	return liste[mois];
}

function liste(fete) {
	if (fete.length == 0) return "Aujourd'hui, ce n'est l'anniversaire de personne.<br>Mais vous pouvez toujours souhaiter un joyeux non-anniversaire à tous !<br><br><img src='http://image.jeuxvideo.com/smileys_img/12.gif'>   <img src='http://image.jeuxvideo.com/smileys_img/11.gif'>";
	
	var phrase =  "Aujourd'hui, c'est l'anniversaire de ";
	if (fete.length == 1) phrase += fete[0] + ".";
	else if (fete.length == 2) phrase += fete[0] + " et " + fete[1] + ".";
		else {
			for (var i = 0; i < fete.length - 1; i++) {
				phrase += fete[i] + ", ";
			}
			phrase += " et " + fete[fete.length - 1] + ".";
		}
	return phrase;
}

function bye() {
	document.getElementById("alerte").style.display = "none";
}

function hello() {
	document.getElementById("alerte").style.display = "block";
}

function save() {
	if (confirm("Les alertes d'anniversaires seront basées sur ce post.\nConfirmez-vous l'enregistrement de ce post ?")) GM_setValue("lien", this.href);
}

function accueil() {
	var div = document.createElement("div");
	div.id = "displayed";
	div.style.display = "none";
	document.getElementById("col1").appendChild(div);

	req = new XMLHttpRequest();
	req.open("GET", lien, false);
	req.send(null);
	document.getElementById("displayed").innerHTML = extraire(req.responseText);
	req.abort();

	var post = document.getElementById(id).getElementsByTagName("li")[2];
	var tbl = post.innerHTML.split(/<br>/g);

	for (var i = tbl.length - 1; i >= 0; i--) {
		if (tbl[i] == "\n") tbl.splice(i, 1);
	}

	for (i = 0; i < tbl.length; i++) {
		if (tbl[i].match("~~")) {
			mois = tbl[i].replace(/\n?~~ ([^"]+) ~~\n?/, "$1");
		} else {
			pseudo = tbl[i].replace("&gt;&gt;", "");
			pseudo = pseudo.replace("\n", "");
			pseudo = pseudo.replace(/ /g, "");
			calendar.push(new Array(numero(mois), parseInt(pseudo.split(":")[1]), pseudo.split(":")[0]));
		}
	}

	for (i = 0; i < calendar.length; i++) {
		if (calendar[i][0] == today.getMonth()) {
			if (calendar[i][1] == today.getDate()) fete.push(calendar[i][2]);
		}
	}
	
	var obj = document.getElementById("rafraichir");
	var img = document.createElement("img");
		img.src = "http://www.noelshack.com/uploads/16062009/btn_anniversaire035660.png";
		img.title = "Anniversaire";
		img.style.marginRight = "5px";
		img.style.cursor = "pointer";
	var a = document.createElement("a");
		a.addEventListener("click", hello, false);
		a.appendChild(img);
	obj.insertBefore(a, obj.firstChild); 

	var cadre = document.createElement("div");
		cadre.id = "alerte";
		cadre.style.display = "none";
		cadre.style.width = "300px";
		cadre.style.minHeight = "120px";
		cadre.style.paddingBottom = "10px";
		cadre.style.border = "2px solid rgb(59,98,114)";
		cadre.style.background = "#EFF4FC";
		cadre.style.position = "fixed";
		cadre.style.zIndex = "1";
		cadre.style.left = window.innerWidth / 2 - 150 + "px";
		cadre.style.top = window.innerHeight / 2 - 150 + "px";
	var div = document.createElement("div");
		div.align = "right";
		div.style.background = "rgb(59,98,114)";
	var span = document.createElement("b");
		span.align = "center";
		span.style.color = "#FFF";
		span.style.fontSize = "17px";
		span.style.margin = "0px 70px 0px 0px";
		span.style.display = "block";
		span.innerHTML = "Alerte Anniversaire";
	div.appendChild(span);
	var img = document.createElement("img");
		img.src = "http://www2.noelshack.com/uploads/fermeture033943.png";
		img.title = "Fermer";
		img.style.margin = "-20px 1px 2px 0px";
		img.style.cursor = "pointer";
		img.addEventListener("click", bye, false);
	div.appendChild(img);
	cadre.appendChild(div);
	var table = document.createElement("table");
		table.style.width = "95%";
	var tr = document.createElement("tr");
	var td = document.createElement("td");
		td.style.width = "20%";
	var img = document.createElement("img");
		img.src = "http://www2.noelshack.com/uploads/gateau073454.jpg";
	td.appendChild(img);
	tr.appendChild(td);
	var td = document.createElement("td");
		td.align = "center";
		td.style.width = "80%";
		td.style.paddingTop = "15px";
	var span = document.createElement("b");
		span.style.color = "black";
		span.style.fontSize = "12px";
		span.innerHTML = liste(fete);
	td.appendChild(span);
	tr.appendChild(td);
	table.appendChild(tr);
	cadre.appendChild(table);
	var img = document.createElement("img");
		img.src = "http://image.jeuxvideo.com/css_img/defaut/puce_liste_bleue.gif";
		img.style.margin = "10px 4px -4px 8px";
	cadre.appendChild(img);
	var a = document.createElement("a");
		a.href = lien.split("#")[0].replace("/1-", "/3-") + "#form_post";
		a.innerHTML = "Ecrire un message";
	cadre.appendChild(a);
	document.getElementById("col1").appendChild(cadre);
}

function topic() {
	var lis = document.getElementById('col1').getElementsByTagName("li");
	for (var u = 0; u < lis.length; u++) {
		if (lis[u].className == 'ancre') {
			lis[u].setAttribute("title", "Enregistrer ce post");
			lis[u].firstChild.addEventListener("click", save, false);
		}
	}
}

function main() {
	if (mode == 0) accueil(); else topic();
}

main();
