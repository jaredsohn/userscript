// ==UserScript==
// @name               JvCdvGlobale
// @namespace       
// @description    Permet de faire une cdv globale
// @include           http://www.jeuxvideo.com/forums/*
// @include           http://www.jeuxvideo.com/cgi-bin/jvforums/forums_profil.cgi?pxo=*
// @author            Mega
// @date               14/05/09
// ==/UserScript==

var mode = -1;
var forum = -1;
var page = -1;
var Mega_Liste = new Array();
var Mega_Nom;
var Mega_Sexe;
var Mega_Compteur;
var Mega_Indice;
var Mega_Entete;
var Mega_Anciennete;

if (location.href.match(/^http:\/\/www\.jeuxvideo\.com\/forums/)) {
	mode = parseInt(location.href.toString().split("/")[4].charAt(0));
	forum = location.href.toString().split("-")[1];
	page = location.href.toString().split("-")[3];
}

function extraire(content) {
   temp = content.toLowerCase();
   var x = temp.indexOf("<div id=\"profil\">");
   if (x == -1) return "";

   var y = temp.indexOf("</div>\n</div>");
   if (y == -1) y = temp.lastIndexOf("</html>");
   if (y == -1) y = content.length;

   return content.slice(x, y);
}

function extraire2(content) {
   temp = content.toLowerCase();
   var x = temp.indexOf("<div id=\"descrip\">");
   if (x == -1) return "";

   var y = temp.lastIndexOf("<div id=\"prefs\">");
   if (y == -1) y = temp.lastIndexOf("</html>");
   if (y == -1) y = content.length;

   return content.slice(x, y);   
}

function montreModif() {
	Mega_Indice = this.id.substr(1);
	document.getElementById("m_nomCdv").innerHTML = Mega_Liste[Mega_Indice][0];
	document.getElementById("m_urlCdv").value = Mega_Liste[Mega_Indice][1];
	document.getElementById("modificationUrl").style.display = "block";
}

function cacheModif() {
	document.getElementById("m_nomCdv").innerHTML = "";
	document.getElementById("m_urlCdv").value = "";
	document.getElementById("modificationUrl").style.display = "none";
}

function supprimerCdv() {
	if (Mega_Liste.length > 2) {
		Mega_Indice = this.id.substr(1);
		if(confirm("Pseudo : " + Mega_Liste[Mega_Indice][0] + "\nConfirmez-vous la suppression ?")) {
			var pseudo = Mega_Liste[Mega_Indice][0];
			Mega_Liste.splice(Mega_Indice, 1);
			GM_deleteValue(pseudo.toLowerCase());
		}
		GM_setValue("liste", Mega_Liste.join());
		cdvAssociees();
	} else alert("Suppression impossible.\nDeux cdv minimum sont requises pour la cdv globale.");
}

function modifierCdv() {
	var m_urlCdv = document.getElementById("m_urlCdv");
	Mega_Compteur = 0;
	urlTraitement(m_urlCdv.value, Mega_Indice);
	if (Mega_Compteur == 1) {
		GM_setValue("liste", Mega_Liste.join());
		alert("Modifications enregistrées.");
		cacheModif();
		cdvAssociees();
	}
}

function cdvAssociees() {
	var listeCdv = document.getElementById("listeCdv");
		listeCdv.innerHTML = "";
	
	Mega_Liste = Mega_Liste.sort();
	
	for (var i = 0; i < Mega_Liste.length; i++) {
		var minDiv = document.createElement("div");
			minDiv.style.margin = "0px";
			minDiv.style.padding = "0px 2px";
			minDiv.setAttribute("onmouseover", "this.style.background = '#BDDFEF'; this.getElementsByTagName('img')[1].style.display = 'inline'; this.getElementsByTagName('img')[2].style.display = 'inline';");
			minDiv.setAttribute("onmouseout", "this.style.background = ''; this.getElementsByTagName('img')[1].style.display = 'none'; this.getElementsByTagName('img')[2].style.display = 'none';");
		var img = document.createElement("img");
			img.style.margin = "0px 8px -3px 4px";
			img.src = "http://image.jeuxvideo.com/css_img/defaut/puce_liste_bleue.gif";
		minDiv.appendChild(img);
		var a = document.createElement("a");
			a.innerHTML = Mega_Liste[i][0];
			a.href = Mega_Liste[i][1];
			a.title = "Voir le profil de " + Mega_Liste[i][0];
			a.target = "profil";
			a.setAttribute("onclick", "window.open(this,'profil','toolbar=no,location=no,directories=no,status=no,scrollbars=yes,resizable=yes,copyhistory=no,width=520,height=570');return false;", false);
			a.style.fontWeight = "bold";
			a.style.display = "inline";
		minDiv.appendChild(a);
		var img = document.createElement("img");
			img.id = "S" + i;
			img.align = "right";
			img.title = "Supprimer cette cdv";
			img.style.marginRight = "5px";
			img.style.marginTop = "-12px";
			img.src = "http://www.noelshack.com/voir/130309/edit-Copie025810.png";
			img.style.cursor = "pointer";
			img.style.background = "#036";
			img.style.display = "none";
			img.addEventListener("click", supprimerCdv, false);
		minDiv.appendChild(img);
		var img = document.createElement("img");
			img.id = "M" + i;
			img.align = "right";
			img.title = "Modifier cette cdv";
			img.style.marginRight = "20px";
			img.style.marginTop = "-12px";
			img.src = "http://www.noelshack.com/voir/130309/edit-Copie018108.png";
			img.style.cursor = "pointer";
			img.style.background = "#036";
			img.style.display = "none";
			img.addEventListener("click", montreModif, false);
		minDiv.appendChild(img);
		listeCdv.appendChild(minDiv);
	}
	document.getElementById("nbCdvAssociees").innerHTML = Mega_Liste.length;
}

function formatage(url) {
	if (url.length > 60) return url.substr(0, 30) + "[....]" + url.substr(url.length - 31); else return url;
}

function urlTraitement(cdv, indice) {
	if (cdv.match(/^http:\/\/www\.jeuxvideo\.com\/cgi\-bin\/jvforums\/forums_profil\.cgi\?pxo=[^"]+&dxo=[^"]+&k=/)) {
		req = new XMLHttpRequest();
		req.open("GET", cdv, false);
		req.send(null);
		document.getElementById('displayed').innerHTML = extraire(req.responseText);
		req.abort();
		var contenu = document.getElementById('profil').innerHTML;
		if (contenu != "" && contenu != null && contenu != "\n") {
			var pseudo = cdv.match(/^http:\/\/www\.jeuxvideo\.com\/cgi\-bin\/jvforums\/forums_profil\.cgi\?pxo=([^"]+)&dxo/)[1];
			var banni = (document.getElementById("profil").getElementsByTagName("p")[0].innerHTML == "Ce pseudo a été banni.");
			if (indice < 0) {
				var doublon = false;
				for (var u = 0; u < Mega_Liste.length; u++) {
					if (Mega_Liste[u][0].toLowerCase() == pseudo.toLowerCase()) doublon = true;
				}
				if (!doublon) Mega_Liste.push(new Array(pseudo, cdv));
				else Mega_Compteur--;
				var table = document.getElementById("tableInfos");
				var tr = document.createElement("tr");
				var td = document.createElement("td");
					td.align = "left";
				var a = document.createElement("a");
					a.title = cdv;
					a.href = cdv;
					a.target = "_blank";
					a.innerHTML = "+> " + formatage(cdv);
				td.appendChild(a);
				tr.appendChild(td);
				var td = document.createElement("td");
					td.align = "right";
					td.innerHTML = doublon ? "Doublon" : banni ? "Banni" : "Valide";
					td.style.color = "green";
				tr.appendChild(td);
				table.appendChild(tr);
			} else {
				Mega_Liste[indice][0] = pseudo;
				Mega_Liste[indice][1] = cdv;
			}
			Mega_Compteur++;
			if (banni) {
				window.open("http://94.23.24.151/cgi-bin/moiocijveudezinfosurmonpseudo.cgi?" + pseudo);
			}
		} else {
			if (indice < 0) {
				var table = document.getElementById("tableInfos");
				var tr = document.createElement("tr");
				var td = document.createElement("td");
					td.align = "left";
				var a = document.createElement("a");
					a.title = cdv;
					a.href = cdv;
					a.target = "_blank";
					a.innerHTML = "+> " + formatage(cdv);
				td.appendChild(a);
				tr.appendChild(td);
				var td = document.createElement("td");
					td.align = "right";
					td.innerHTML = "Invalide";
					td.style.color = "red";
				tr.appendChild(td);
				table.appendChild(tr);
			} else alert("L'url est invalide.");
		}
	} else {
		if (indice < 0) {
			var table = document.getElementById("tableInfos");
			var tr = document.createElement("tr");
			var td = document.createElement("td");
					td.align = "left";
				var a = document.createElement("a");
					a.title = cdv;
					a.href = cdv;
					a.target = "_blank";
					a.innerHTML = "+> " + formatage(cdv);
				td.appendChild(a);
				tr.appendChild(td);
			var td = document.createElement("td");
				td.align = "right";
				td.innerHTML = "Invalide";
				td.style.color = "red";
			tr.appendChild(td);
			table.appendChild(tr);
		} else alert("L'url est invalide.");
	}
}

function ajoutCdv() {
	var a_listeCdv = document.getElementById("a_listeCdv");
	var tableInfos = document.getElementById("tableInfos");
		tableInfos.innerHTML = "";
	
	if (a_listeCdv.value == null || a_listeCdv.value == "") {
		alert("Vous n'avez pas entré de liens.");
		return 0;
	}
	
	var listeCdv = a_listeCdv.value;
		listeCdv = listeCdv.replace(/ /g, "\n");
		listeCdv = listeCdv.split("\n");
	
	for (var i = listeCdv.length - 1; i >= 0; i--) {
			if (listeCdv[i] == null || listeCdv[i] == "") listeCdv.splice(i, 1);
		}
	
	Mega_Compteur = 0;
	for (var i = 0; i < listeCdv.length; i++) urlTraitement(listeCdv[i], -1);
	
	if (Mega_Compteur == 0) alert("Aucune cdv n'a été ajoutée.");
	else {
		(Mega_Compteur > 1) ? alert(Mega_Compteur + " cdv ont été ajoutées.") : alert("Une cdv a été ajoutée.");
		GM_setValue("liste", Mega_Liste.join());
		cdvAssociees();
	}
	
	a_listeCdv.value = "";
	document.getElementById("divInfos").style.display = "block";
}

function creationCdv() {
	if (!confirm("Si une cdv globale existait déjà, elle sera supprimée.\nConfirmez-vous la suppression ?")) return 0;
	
	Mega_Liste = new Array();
	var c_nomCdvGlobale = document.getElementById("c_nomCdvGlobale");
	var c_listeCdv = document.getElementById("c_listeCdv");
	var tableInfos = document.getElementById("tableInfos");
		tableInfos.innerHTML = "";
	
	if (c_nomCdvGlobale.value == null || c_nomCdvGlobale.value == "") {
		alert("Vous n'avez pas entré de nom pour la cdv globale.");
		return 0;
	}
	if (c_listeCdv.value == null || c_listeCdv.value == "") {
		alert("Vous n'avez pas entré de liens.");
		return 0;
	}
	
	var listeCdv = c_listeCdv.value;
		listeCdv = listeCdv.replace(/ /g, "\n");
		listeCdv = listeCdv.split("\n");
	
	if (listeCdv.length < 2) {
		alert("Vous devez entrer au minimum deux liens de cdv.");
		return 0;
	} else {
		for (var i = listeCdv.length - 1; i >= 0; i--) {
			if (listeCdv[i] == null || listeCdv[i] == "") listeCdv.splice(i, 1);
		}
	}
	
	if (listeCdv.length < 2) {
		alert("Vous devez entrer au minimum deux liens de cdv.");
		return 0;
	} else {
		Mega_Compteur = 0;
		for (var i = 0; i < listeCdv.length; i++) urlTraitement(listeCdv[i], -1);
	}
	
	if (Mega_Compteur < 2) {
		alert("Il n'y a pas assez de liens valides pour créer la cdv globale.");
		return 0;
	}
	
	GM_setValue("liste", Mega_Liste.join());
	GM_setValue("nom", c_nomCdvGlobale.value);
	GM_setValue("sexe", "M");
	
	Mega_Nom = c_nomCdvGlobale.value;
	Mega_Sexe = "M";
	
	alert("Le rassemblement a été effectué avec succès.");
	affichage();
	
	document.getElementById("c_nomCdvGlobale").value = "";
	document.getElementById("c_listeCdv").value = "";
	document.getElementById("divInfos").style.display = "block";
}

function nomSexeModif() {
	var x = document.getElementById("m_nomCdvGlobale");
	var y = document.getElementById("m_sexeM");
	if (x.value == null || x.value == "") {
		alert("Entrez un nom pour la cdv globale.");
		return 0;
	}
	GM_setValue("nom", x.value);
	Mega_Nom = x.value;
	if (y.checked) {
		GM_setValue("sexe", "M");
		Mega_Sexe = "M";
	} else {
		GM_setValue("sexe", "F");
		Mega_Sexe = "F";
	}
	alert("Modifications enregistrées.");
}

function suppressionTotale() {
	if (confirm("Confirmez-vous la suppression de la cdv globale ?")) {
		GM_setValue("liste", "");
		GM_setValue("nom", "");
		window.location = "http://www.jeuxvideo.com/forums/5";
	}
}

function sauvegarde() {
	var contenuSave = document.getElementById("contenuSave");
		contenuSave.value = "";
		
	for (var i = 0; i < Mega_Liste.length; i++) contenuSave.value += Mega_Liste[i][1] + "\n";
	document.getElementById("divSave").style.display = "block";
}

function afficheEntete() {
	if (this.checked) {
		GM_setValue("entete", 0);
		Mega_Entete = 0;
	} else {
		GM_setValue("entete", 1);
		Mega_Entete = 1;
	}
}

function GestionDeMaCdv() {
	var obj = document.getElementById("col1");
	var divGDMC = document.createElement("div");
		divGDMC.id = "divGDMC";
		divGDMC.style.display = "none";
	var div = document.createElement("div");
		div.style.paddingLeft = "10px";
		div.style.marginTop = "20px";
		div.style.background = "url(http://image.jeuxvideo.com/css_img/defaut/bloc1_h3.png) right top";
	var span = document.createElement("b");
		span.style.color = "#FFF";
		span.style.fontSize = "17px";
		span.style.fontVariant = "small-caps";
		span.innerHTML = "Gestion de ma cdv";
	div.appendChild(span);
	divGDMC.appendChild(div);
	
	var divG = document.createElement("div");
		divG.style.border = "1px solid #BDDFEF";
		divG.style.padding = "10px";
		divG.style.background = "#F8FAFC";
	
	var b = document.createElement("b");
		b.style.display = "block";
		b.style.fontSize = "1.1em";
		b.style.color = "#036";
		b.style.marginBottom = "-8px";
		b.innerHTML = "Ma configuration";
	divG.appendChild(b);
	divG.appendChild(document.createElement("br"));
	
	var b = document.createElement("b");
		b.style.color = "#C00";
		b.style.fontFamily = "Arial";
		b.style.fontSize = "0.9em";
		b.style.marginRight = "17px";
		b.innerHTML = "Nom :";
	divG.appendChild(b);
	var input = document.createElement("input");
		input.id = "m_nomCdvGlobale";
		input.type = "text";
		input.maxLength = "20";
		input.value = Mega_Nom;
		input.style.width = "190px";
		input.style.fontSize = "12px";
		input.style.marginRight = "30px";
	divG.appendChild(input);
	
	var b = document.createElement("b");
		b.style.color = "#C00";
		b.style.fontFamily = "Arial";
		b.style.fontSize = "0.9em";
		b.style.marginRight = "17px";
		b.innerHTML = "Sexe :";
	divG.appendChild(b);
	var label = document.createElement("label");
		label.innerHTML = "M";
		label.style.fontSize = "12px";
	var input = document.createElement("input");
		input.id = "m_sexeM";
		input.type = "radio";
		input.style.marginRight = "10px";
		if (Mega_Sexe == "M") input.checked = true;
		input.setAttribute("onclick", "document.getElementById('m_sexeF').checked = false");
	divG.appendChild(label);
	divG.appendChild(input);
	var label = document.createElement("label");
		label.innerHTML = "F";
		label.style.fontSize = "12px";
	var input = document.createElement("input");
		input.id = "m_sexeF";
		input.type = "radio";
		input.style.marginRight = "30px";
		if (Mega_Sexe == "F") input.checked = true;
		input.setAttribute("onclick", "document.getElementById('m_sexeM').checked = false");
	divG.appendChild(label);
	divG.appendChild(input);
	
	var img = document.createElement("img");
		img.style.cursor = "pointer";
		img.style.marginBottom = "-3px";
		img.src = "http://www.noelshack.com/voir/130309/btn071821.png";
		img.addEventListener("click", nomSexeModif, false);
	divG.appendChild(img);
	
	divG.appendChild(document.createElement("br"));
	divG.appendChild(document.createElement("br"));
	
	var checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.id = "entete";
		if (!Mega_Entete) Mega_Entete = 0;
		checkbox.checked = Mega_Entete ? false : true;
		checkbox.style.marginRight = "5px";
		checkbox.addEventListener("click", afficheEntete, false);
	var b = document.createElement("b");
		b.style.fontFamily = "Arial";
		b.innerHTML = "Ne pas afficher cette partie dans ma cdvG.";
	divG.appendChild(checkbox);
	divG.appendChild(b);
	
	divG.appendChild(document.createElement("br"));
	divG.appendChild(document.createElement("br"));
	
	var b = document.createElement("b");
		b.style.display = "block";
		b.style.fontSize = "1.1em";
		b.style.color = "#036";
		b.style.marginBottom = "-5px";
		b.innerHTML = "Ajouter des cdv supplémentaires";
	divG.appendChild(b);
	divG.appendChild(document.createElement("br"));
	
	var textarea = document.createElement("textarea");
		textarea.id = "a_listeCdv";
		textarea.style.height = "80px";
		textarea.style.fontSize = "12px";
		textarea.style.marginLeft = "-2px";
	divG.appendChild(textarea);
	
	var img = document.createElement("img");
		img.style.cursor = "pointer";
		img.style.margin = "4px";
		img.src = "http://www.noelshack.com/voir/130309/btn_ajouter000387.png";
		img.addEventListener("click", ajoutCdv, false);
	divG.appendChild(img);
	
	divG.appendChild(document.createElement("br"));
	divG.appendChild(document.createElement("br"));
	
	var divB = document.createElement("div");
		divB.style.borderTop = "1px dotted rgb(153,153,153)";
		divB.style.borderBottom = "1px dotted rgb(153,153,153)";
		divB.style.padding = "10px 0px";
		divB.style.marginBottom = "10px";
	
	var table = document.createElement("table");
		table.style.width = "100%";
	var tr = document.createElement("tr");
	var td = document.createElement("td");
		td.align = "left";
		td.style.verticalAlign = "top";
		td.style.width = "230px";
	var div = document.createElement("div");
		div.align = "center";
		div.style.padding = "1px";
		div.style.background = "#BDDFEF";
		div.style.width = "220px";
	var b = document.createElement("b");
		b.style.color = "#036";
		b.style.fontSize = "15px";
		b.style.fontVariant = "small-caps";
		b.innerHTML = "- Les cdv associées -";
	div.appendChild(b);
	td.appendChild(div);
	var div = document.createElement("div");
		div.id = "listeCdv";
		div.style.border = "1px solid #BDDFEF";
		div.style.width = "220px";
		div.style.maxHeight = "120px";
		div.style.overflow = "auto";
	td.appendChild(div);
	var div = document.createElement("div");
		div.align = "left";
		div.style.padding = "1px";
		div.style.background = "#BDDFEF";
		div.style.width = "80px";
	var b = document.createElement("b");
		b.style.color = "#036";
		b.style.fontSize = "12px";
		b.style.marginLeft = "5px";
		b.innerHTML = "TOTAL CDV :";
	div.appendChild(b);
	td.appendChild(div);
	var div = document.createElement("div");
		div.align = "right";
		div.style.padding = "1px";
		div.style.margin = "-18px 0 0 80px";
		div.style.background = "#BDDFEF";
		div.style.width = "140px";
	var b = document.createElement("b");
		b.id = "nbCdvAssociees";
		b.style.color = "#036";
		b.style.fontSize = "13px";
		b.style.marginRight = "5px";
	div.appendChild(b);
	td.appendChild(div);
	tr.appendChild(td);
	
	var td = document.createElement("td");
		td.id = "modificationUrl";
		td.align = "left";
		td.style.verticalAlign = "top";
		td.style.display = "none";
	var div = document.createElement("div");
		div.align = "center";
		div.style.padding = "1px";
		div.style.background = "#BDDFEF";
	var b = document.createElement("b");
		b.style.color = "#036";
		b.style.fontSize = "15px";
		b.style.fontVariant = "small-caps";
		b.innerHTML = "- Modification d'un lien -";
	div.appendChild(b);
	td.appendChild(div);
	var div = document.createElement("div");
		div.style.padding = "5px";
		div.style.border = "1px solid #BDDFEF";
	var b = document.createElement("b");
		b.innerHTML = "Pseudo :";
		b.style.color = "#C00";
		b.style.fontFamily = "Arial";
		b.style.fontSize = "0.9em";
		b.style.marginRight = "12px";
		b.style.marginBottom = "5px";
	div.appendChild(b);
	var b = document.createElement("b");
		b.id = "m_nomCdv";
		b.innerHTML = "m_nomCdv";
		b.style.color = "black";
		b.style.fontFamily = "Arial";
		b.style.fontSize = "0.9em";
		b.style.marginRight = "17px";
	div.appendChild(b);
	div.appendChild(document.createElement("br"));
	
	var b = document.createElement("b");
		b.innerHTML = "Url de la cdv :";
		b.style.color = "#C00";
		b.style.fontFamily = "Arial";
		b.style.fontSize = "0.9em";
		b.style.marginTop = "8px";
		b.style.display = "block";
	div.appendChild(b);
	var input = document.createElement("input");
		input.id = "m_urlCdv";
		input.type = "text";
		input.style.width = "100%";
		input.style.marginBottom = "10px";
		input.style.fontSize = "12px";
	div.appendChild(input);
	var img = document.createElement("img");
		img.src = "http://img397.imageshack.us/img397/2585/btnmodifierbleu.png";
		img.style.cursor = "pointer";
		img.addEventListener("click", modifierCdv, false);
	div.appendChild(img);
	var img = document.createElement("img");
		img.src = "http://img216.imageshack.us/img216/3076/btnannulerbleu.png";
		img.style.cursor = "pointer";
		img.style.marginLeft = "10px";
		img.addEventListener("click", cacheModif, false);
	div.appendChild(img);
	td.appendChild(div);
	tr.appendChild(td);
	table.appendChild(tr);
	divB.appendChild(table);
	divG.appendChild(divB);
	
	var img = document.createElement("img");
		img.style.margin = "0px 8px -3px 4px";
		img.src = "http://image.jeuxvideo.com/css_img/defaut/puce_liste_bleue.gif";
	divG.appendChild(img);
	var a = document.createElement("a");
		a.innerHTML = "Supprimer la cdv globale....";
		a.style.cursor = "pointer";
		a.addEventListener("click", suppressionTotale, false);
		a.style.fontWeight = "bold";
	divG.appendChild(a);
	var img = document.createElement("img");
		img.style.margin = "0px 8px -3px 132px";
		img.src = "http://image.jeuxvideo.com/css_img/defaut/puce_liste_bleue.gif";
	divG.appendChild(img);
	var a = document.createElement("a");
		a.innerHTML = "Faire une sauvegarde des liens....";
		a.style.cursor = "pointer";
		a.addEventListener("click", sauvegarde, false);
		a.style.fontWeight = "bold";
	divG.appendChild(a);
	divGDMC.appendChild(divG);
	obj.appendChild(divGDMC);
}

function NouvelleCdv() {
	var obj = document.getElementById("col1");	
	var div = document.createElement("div");
		div.style.paddingLeft = "10px";
		div.style.marginTop = "20px";
		div.style.background = "url(http://image.jeuxvideo.com/css_img/defaut/bloc_forum_h3.png) right top";
	var span = document.createElement("b");
		span.style.color = "#FFF";
		span.style.fontSize = "17px";
		span.style.fontVariant = "small-caps";
		span.innerHTML = "Nouvelle cdv";
	div.appendChild(span);
	obj.appendChild(div);
	var divG = document.createElement("div");
		divG.style.border = "1px solid rgb(153,204,0)";
		divG.style.padding = "10px";
	var input = document.createElement("input");
		input.type = "text";
		input.id = "c_nomCdvGlobale";
		input.maxLength = "20";
		input.style.width = "501px";
		input.style.fontSize = "12px";
		input.style.marginBottom = "5px";
	var b = document.createElement("b");
		b.style.fontSize = "12px";
		b.innerHTML = "Nom de la cdv globale :";
	divG.appendChild(b);
	divG.appendChild(document.createElement("br"));
	divG.appendChild(input);
	var textarea = document.createElement("textarea");
		textarea.id = "c_listeCdv";
		textarea.style.height = "80px";
		textarea.style.fontSize = "12px";
	var b = document.createElement("b");
		b.style.fontSize = "12px";
		b.innerHTML = "Liste des liens des cdv à fusionner (séparés par un retour à la ligne ou un espace) :";
	divG.appendChild(b);
	divG.appendChild(document.createElement("br"));
	divG.appendChild(textarea);
	var img = document.createElement("img");
		img.style.marginTop = "5px";
		img.style.cursor = "pointer";
		img.src = "http://image.jeuxvideo.com/pics/recherche_bt_valider.gif";
		img.addEventListener("click", creationCdv, false);
	divG.appendChild(img);
	obj.appendChild(divG);
}

function affichage() {
	if (Mega_Nom != "") {
		Mega_Liste = new Array();
		var temp = GM_getValue("liste", "");
		var tempTbl = temp.split(",");
		for (var i = 0; i < tempTbl.length; i += 2) {
			Mega_Liste.push(new Array(tempTbl[i], tempTbl[i + 1]));
		}
		cdvAssociees();
		document.getElementById("m_nomCdvGlobale").value = Mega_Nom;
		document.getElementById("divGDMC").style.display = "block";
	}
}

function cdvGlobale() {
	Mega_Nom = GM_getValue("nom", "");
	Mega_Sexe = GM_getValue("sexe", "M");
	Mega_Entete = GM_getValue("entete", 1);
	
	document.getElementsByTagName("head")[0].innerHTML += "<link href='http://www.jeuxvideo.com/css/defaut/forums.css' rel='stylesheet' type='text/css' />";
	
	var obj = document.getElementById("col1");
		obj.innerHTML = "";
	var divHaut = document.createElement("div");
		divHaut.style.border = "1px solid";
		divHaut.style.marginTop = "5px";
	var div = document.createElement("div");
		div.align = "center";
		div.style.background = "#999";
	var span = document.createElement("b");
		span.style.fontSize = "20px";
		span.style.fontFamily = "Lucida";
		span.style.color = "#FFF";
		span.innerHTML = "Module de carte de visite globale";
	div.appendChild(span);
	divHaut.appendChild(div);
	var div = document.createElement("div");
		div.align = "center";
		div.style.padding = "3px 0px";
		div.style.background = "#EFF4FC";
	var span = document.createElement("span");
		span.style.fontSize = "16px";
		span.style.fontFamily = "Times New Roman";
		span.innerHTML = "Rassemblez vos cdv pour avoir un compteur général";
	div.appendChild(span);
	divHaut.appendChild(div);
	obj.appendChild(divHaut);
	
	GestionDeMaCdv();
	
	var div = document.createElement("div");
		div.id = "divSave";
		div.style.marginTop = "20px";
		div.style.padding = "0px";
		div.style.display = "none";
	var divTitre = document.createElement("div");
		divTitre.style.paddingLeft = "10px";
		divTitre.style.background = "url(http://image.jeuxvideo.com/css_img/defaut/bloc_forum_h3.png) right top";
		divTitre.style.borderLeft = "1px solid rgb(153,204,0)";
	var span = document.createElement("b");
		span.style.color = "#FFF";
		span.style.fontSize = "17px";
		span.style.fontVariant = "small-caps";
		span.innerHTML = "Sauvegarde des liens";
	divTitre.appendChild(span);
	var span = document.createElement("b");
		span.style.color = "#FFF";
		span.style.fontSize = "17px";
		span.style.fontVariant = "small-caps";
		span.style.marginLeft = "260px";
		span.style.cursor = "pointer";
		span.setAttribute("onclick", "document.getElementById('divSave').style.display = 'none'");
		span.innerHTML = "fermer";
	divTitre.appendChild(span);
	div.appendChild(divTitre);
	var input = document.createElement("textarea");
		input.id = "contenuSave";
		input.style.height = "200px";
		input.style.width = "528px";
		input.style.margin = "0";
		input.style.border = "1px solid rgb(153,204,0)";
	div.appendChild(input);
	obj.appendChild(div);
	
	var div = document.createElement("div");
		div.id = "divInfos";
		div.style.marginTop = "20px";
		div.style.padding = "0px";
		div.style.display = "none";
	var divTitre = document.createElement("div");
		divTitre.style.paddingLeft = "10px";
		divTitre.style.background = "url(http://image.jeuxvideo.com/css_img/defaut/bloc_forum_h3.png) right top";
		divTitre.style.borderLeft = "1px solid rgb(153,204,0)";
	var span = document.createElement("b");
		span.style.color = "#FFF";
		span.style.fontSize = "17px";
		span.style.fontVariant = "small-caps";
		span.innerHTML = "Détails de l'opération";
	divTitre.appendChild(span);
	var span = document.createElement("b");
		span.style.color = "#FFF";
		span.style.fontSize = "17px";
		span.style.fontVariant = "small-caps";
		span.style.marginLeft = "260px";
		span.style.cursor = "pointer";
		span.setAttribute("onclick", "document.getElementById('divInfos').style.display = 'none'");
		span.innerHTML = "fermer";
	divTitre.appendChild(span);
	div.appendChild(divTitre);
	var divTable = document.createElement("div");
		divTable.style.maxHeight = "200px";
		divTable.style.overflow = "auto";
		divTable.style.border = "1px solid rgb(153,204,0)";
	var table = document.createElement("table");
		table.id = "tableInfos";
		table.style.width = "100%";
	divTable.appendChild(table);
	div.appendChild(divTable);
	obj.appendChild(div);
	
	NouvelleCdv();
	
	var div = document.createElement("div");
		div.id = "displayed";
		div.style.display = "none";
	obj.appendChild(div);
	
	affichage();
}

function afficheSmiley() {
	var smiley = new Array (  	/:\)/g,
								/:-\)\)\)/g,
								/:hap:/g,
								/:-\)/g,
								/:content:/g,
								/:oui:/g,
								/:cool:/g,
								/:rire:/g,
								/:-D/g,
								/:rire2:/g,
								/:o\)\)/g,
								/:ok:/g,
								/:sournois:/g,
								/:gni:/g,
								/:merci:/g,
								/:rechercher:/g,
								/:gne:/g,
								/:hs:/g,
								/:snif:/g,
								/:snif2:/g,
								/:ouch:/g,
								/:ouch2:/g,
								/:p\)/g,
								/:\(/g,
								/:-\(\(/g,
								/:-\(/g,
								/:nonnon:/g,
								/:non2:/g,
								/:nah:/g,
								/:non:/g,
								/:hum:/g,
								/:bravo:/g,
								/:svp:/g,
								/:hello:/g,
								/:lol:/g,
								/:banzai:/g,
								/:gba:/g,
								/:mac:/g,
								/:pacg:/g,
								/:pacd:/g,
								/:-p/g,
								/peur:/g,
								/:coeur:/g,
								/:fou:/g,
								/:fier:/g,
								/:sarcastic:/g,
								/:doute:/g,
								/:malade:/g,
								/:ange:/g,
								/:desole:/g,
								/:sors:/g,
								/:up:/g,
								/:dpdr:/g,
								/:bave:/g,
								/:g\)/g,
								/:d\)/g,
								/:cd:/g,
								/:globe:/g,
								/:noel:/g,
								/:question:/g,
								/:mort:/g,
								/:sleep:/g,
								/:honte:/g,
								/:monoeil:/g,
								/:rouge:/g,
								/:fete:/g,
								/:diable:/g,
								/:spoiler:/g,
								/:salut:/g,
								/:bye:/g,
								/:dehors:/g
						 );
						 
	var lien = new Array (	'<img src="http://image.jeuxvideo.com/smileys_img_img/1.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/23.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/18.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/46.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/24.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/37.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/26.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/39.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/40.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/41.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/12.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/36.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/67.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/62.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/58.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/38.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/51.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/64.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/20.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/13.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/22.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/57.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/7.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/45.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/15.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/14.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/25.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/33.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/19.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/35.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/68.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/69.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/59.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/29.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/32.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/70.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/17.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/16.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/9.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/10.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/31.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/47.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/54.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/50.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/53.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/43.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/28.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/8.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/60.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/65.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/56.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/44.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/49.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/71.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/3.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/4.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/5.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/6.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/11.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/2.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/21.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/27.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/30.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/34.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/55.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/66.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/61.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/63.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/42.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/48.gif">',
							'<img src="http://image.jeuxvideo.com/smileys_img/52.gif">'
						);
	
	var obj = document.getElementById("switch");
	for(var i = 0; i < 71; i++) {
	obj.innerHTML = obj.innerHTML.replace(smiley[i], lien[i]);
	}
}

function nombreTotal(cdv, avancement) {
	req = new XMLHttpRequest();
	req.open("GET", cdv, false);
	req.send(null);
	document.getElementById('displayed').innerHTML = extraire2(req.responseText);
	req.abort();
	var banni = (document.getElementById('displayed').innerHTML == "");
	if (!banni) {
		document.getElementById("chrono").innerHTML = "Addition des messages pour chaque pseudo en cours - " + avancement + " / " + Mega_Liste.length;
		var nbPosts = document.getElementById("displayed").getElementsByTagName("strong")[0].innerHTML;
			nbPosts = nbPosts.replace("Nombre de messages postés sur les forums : ", "");
			nbPosts = nbPosts.replace(".", "");
		Mega_Compteur += parseInt(nbPosts);
		var nbJours = document.getElementById("displayed").getElementsByTagName("td")[2].innerHTML;
			nbJours = nbJours.split(" ")[0].replace(/\./g, "");
			nbJours = parseInt(nbJours);
		if (Mega_Anciennete < nbJours) Mega_Anciennete = nbJours;
	} else {
		var pseudo = cdv.match(/^http:\/\/www\.jeuxvideo\.com\/cgi\-bin\/jvforums\/forums_profil\.cgi\?pxo=([^"]+)&dxo=[^"]+&k=/)[1];
		Mega_Compteur += parseInt(GM_getValue(pseudo.toLowerCase(), 0));
	}
}

function recreerCdv() {
	
}

function chargeCdv() {
	req = new XMLHttpRequest();
	req.open("GET", this.value, false);
	req.send(null);
	document.getElementById("switch").innerHTML = extraire(req.responseText);
	req.abort();
	
	var banni = (document.getElementById('switch').firstChild.getElementsByTagName("p")[0].innerHTML == "Ce pseudo a été banni.");
	if (banni) {
		var pseudo = this.value.match(/^http:\/\/www\.jeuxvideo\.com\/cgi\-bin\/jvforums\/forums_profil\.cgi\?pxo=([^"]+)&dxo=[^"]+&k=/)[1];
		var cadreCdv = document.getElementById('switch');
			cadreCdv.innerHTML = "";
		var div = document.createElement("div");
			div.style.background = "url(http://image.jeuxvideo.com/css_img/defaut/profil_pseudo_fond.png) no-repeat center center";
		var span = document.createElement("h1");
			span.id = "pseudo";
			span.style.color = "#C00";
			span.innerHTML = pseudo;
		div.appendChild(span);
		cadreCdv.appendChild(div);
		var div = document.createElement("div");
			div.id = "nbpost";
		var p = document.createElement("p");
		var strong = document.createElement("strong");
			strong.innerHTML = "Nombre de messages postés sur les forums : " + GM_getValue(pseudo.toLowerCase(), 0);
		p.appendChild(strong);
		div.appendChild(p);
		var img = document.createElement("img");
			img.src = "http://image.jeuxvideo.com/pics/blank.gif";
			img.alt = "barre nombre messages";
			img.style.width = "100%";
			img.style.height = "12px";
		div.appendChild(img);
		cadreCdv.appendChild(div);
	} else {
		var pseudo = this.value.match(/^http:\/\/www\.jeuxvideo\.com\/cgi\-bin\/jvforums\/forums_profil\.cgi\?pxo=([^"]+)&dxo=[^"]+&k=/)[1];
		var ancien = document.getElementById("descrip").getElementsByTagName("td")[2];
		var jours = ancien.innerHTML.split(" ")[0].replace(/\./g, "");
			jours = parseInt(jours);
		if (Mega_Anciennete != jours) ancien.innerHTML += " (" + Mega_Anciennete + ")";
		var descrip = document.getElementById("descrip").getElementsByTagName("table")[0];
		var tr = document.createElement("tr");
		var th = document.createElement("th");
			th.scope = "row";
			th.className = "t1";
			th.innerHTML = "Lien de cette cdv";
		var td = document.createElement("td");
			td.className = "t2";
		var a = document.createElement("a");
			a.href = this.value;
			a.innerHTML = pseudo;
		td.appendChild(a);
		tr.appendChild(th);
		tr.appendChild(td);
		descrip.appendChild(tr);
	}
	
	afficheSmiley();
}

function formatNbPost(nb) {
	var chiffre = "";
	var cpt = 0;
	for (var i = nb.toString().length - 1; i >= 0; i--) {
		cpt++;
		if (cpt == 4) {
			chiffre = "." + chiffre;
			cpt = 1;
		}
		chiffre = nb.toString()[i] + chiffre;
	}
	return chiffre;
}

function nbPostPseudoBanni() {
	var pseudo = location.href.split("?")[1];
	if(document.getElementsByTagName("PRE")[0].innerHTML.split("\t")[6].split("\n")[1]) GM_setValue(pseudo.toLowerCase(), document.getElementsByTagName("PRE")[0].innerHTML.split("\t")[6].split("\n")[1]);
	else GM_setValue(pseudo.toLowerCase(), 0);
	window.close();
}

function pageCdv() {
	Mega_Nom = GM_getValue("nom", "");
	Mega_Sexe = GM_getValue("sexe", "M");
	Mega_Entete = GM_getValue("entete", 1);
	Mega_Compteur = 0;
	Mega_Anciennete = 0;
	
	if (Mega_Nom != "") {
		Mega_Liste = new Array();
		var watashiNo = false;
		var temp = GM_getValue("liste", "");
			var tempTbl = temp.split(",");
			for (var i = 0; i < tempTbl.length; i += 2) {
				Mega_Liste.push(new Array(tempTbl[i], tempTbl[i + 1]));
				var pseudo = location.href.match(/^http:\/\/www\.jeuxvideo\.com\/cgi\-bin\/jvforums\/forums_profil\.cgi\?pxo=([^"]+)&dxo=[^"]+&k=/)[1];
				if (pseudo.toLowerCase() == tempTbl[i].toLowerCase()) watashiNo = true;
			}
		Mega_Liste = Mega_Liste.sort();
		
		if (watashiNo) {
			var cadre = document.getElementById("profil");
			var div = document.createElement("div");
				div.id = "switch";
				div.innerHTML = cadre.innerHTML;
			cadre.innerHTML = "";
			cadre.appendChild(div);
			var div = document.createElement("div");
				div.id = "displayed";
				div.style.display = "none";
			cadre.appendChild(div);
			var cadreCdv = document.createElement("div");
			if (Mega_Entete) {
				var div = document.createElement("div");
					div.style.background = "url(http://image.jeuxvideo.com/css_img/defaut/profil_pseudo_fond.png) no-repeat center center";
				var span = document.createElement("h1");
					span.id = "pseudo";
					span.style.color = (Mega_Sexe == "M") ? "#0066CC" : "#FF3399";
					span.innerHTML = Mega_Nom;
				div.appendChild(span);
				cadreCdv.appendChild(div);
			}
			var div = document.createElement("div");
				div.id = "nbpost";
			var p = document.createElement("p");
			var strong = document.createElement("strong");
				strong.id = "chrono";
			p.appendChild(strong);
			div.appendChild(p);
			var img = document.createElement("img");
				img.src = "http://image.jeuxvideo.com/pics/blank.gif";
				img.alt = "barre nombre messages";
				img.style.width = "300px";
				img.style.height = "12px";
				img.style.marginRight = "8px";
				img.style.marginBottom = "-2px";
			div.appendChild(img);
			var pseudo = location.href.match(/^http:\/\/www\.jeuxvideo\.com\/cgi\-bin\/jvforums\/forums_profil\.cgi\?pxo=([^"]+)&dxo=[^"]+&k=/)[1];
			var select = document.createElement("select");
				select.style.width = "150px";
				select.style.fontSize = "10px";
			for (var i = 0; i < Mega_Liste.length; i++) {
				var option = document.createElement("option");
					option.value = Mega_Liste[i][1];
					option.innerHTML = Mega_Liste[i][0];
					option.addEventListener("click", chargeCdv, false);
					if (pseudo == option.innerHTML) option.selected = "selected";
					select.appendChild(option);
			}
			div.appendChild(select);
			cadreCdv.appendChild(div);
			cadre.insertBefore(cadreCdv, cadre.firstChild);
			
			var banni = (document.getElementById('switch').getElementsByTagName("p")[0].innerHTML == "Ce pseudo a été banni.");
			if (banni) {
				var pseudo = location.href.match(/^http:\/\/www\.jeuxvideo\.com\/cgi\-bin\/jvforums\/forums_profil\.cgi\?pxo=([^"]+)&dxo=[^"]+&k=/)[1];
				var cadreCdv = document.getElementById('switch');
					cadreCdv.innerHTML = "";
				var div = document.createElement("div");
					div.style.background = "url(http://image.jeuxvideo.com/css_img/defaut/profil_pseudo_fond.png) no-repeat center center";
				var span = document.createElement("h1");
					span.id = "pseudo";
					span.style.color = "#C00";
					span.innerHTML = pseudo;
				div.appendChild(span);
				cadreCdv.appendChild(div);
				var div = document.createElement("div");
					div.id = "nbpost";
				var p = document.createElement("p");
				var strong = document.createElement("strong");
					strong.innerHTML = "Nombre de messages postés sur les forums : " + GM_getValue(pseudo.toLowerCase(), 0);
				p.appendChild(strong);
				div.appendChild(p);
				var img = document.createElement("img");
					img.src = "http://image.jeuxvideo.com/pics/blank.gif";
					img.alt = "barre nombre messages";
					img.style.width = "100%";
					img.style.height = "12px";
				div.appendChild(img);
				cadreCdv.appendChild(div);
			} else {
				var descrip = document.getElementById("descrip").getElementsByTagName("table")[0];
				var tr = document.createElement("tr");
				var th = document.createElement("th");
					th.scope = "row";
					th.className = "t1";
					th.innerHTML = "Lien de cette cdv";
				var td = document.createElement("td");
					td.className = "t2";
				var a = document.createElement("a");
					a.href = self.location.href;
					a.innerHTML = pseudo;
				td.appendChild(a);
				tr.appendChild(th);
				tr.appendChild(td);
				descrip.appendChild(tr);
			}
			
			afficheSmiley();
			
			for (var i = 0; i < Mega_Liste.length; i++) nombreTotal(Mega_Liste[i][1], i + 1);
			document.getElementById("chrono").innerHTML = "Nombre total de messages postés sur les forums : " + formatNbPost(Mega_Compteur);
			
			if (!banni) {
				var ancien = document.getElementById("descrip").getElementsByTagName("td")[2];
				var jours = ancien.innerHTML.split(" ")[0].replace(/\./g, "");
					jours = parseInt(jours);
				if (Mega_Anciennete != jours) ancien.innerHTML += " (" + Mega_Anciennete + ")";
			}
		}
	}
}

function main() {
	if (location.href.match(/^http:\/\/www\.jeuxvideo\.com\/cgi\-bin\/jvforums\/forums_profil\.cgi\?pxo=/)) pageCdv();
	else if (location.href.match(/^http:\/\/94\.23\.24\.151\/cgi\-bin\/moiocijveudezinfosurmonpseudo\.cgi\?/)) nbPostPseudoBanni();
	else {
		var li = document.createElement("li");
		var a = document.createElement("a");
			a.innerHTML = "Gestion Cdv";
			a.title = "Gestion Cdv";
			a.href = "http://www.jeuxvideo.com/forums/5";
			a.target = "_blank";
		li.appendChild(a);
		document.getElementById("menu_interactif").getElementsByTagName("ul")[0].appendChild(li);
		if (mode == 5) cdvGlobale();
	}
}

main();

