// ==UserScript==
// @name           Jv.Mega
// @namespace       
// @description    Ajoute des fonctionnalités à jeuxvideo.com
// @include           http://www.jeuxvideo.com/forums/*
// @include           http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// @include           http://www.jeuxvideo.com/cgi-bin/jvforums/forums_profil.cgi?pxo=*
// @include           http://94.23.24.151/*
// @author            Mega
// @date                13/08/09
// ==/UserScript==

{ // ----- Variables globales ----- //
var mode = -1;
var forum = -1;
var topic = -1;
var page = -1;
var index = -1;
var urlRepondre = -1;
var nbPagesTopic = -1;

if (location.href.match(/^http:\/\/www\.jeuxvideo\.com\/forums/)) {
	mode = location.href.toString().split("/")[4].split("-")[0];
	forum = location.href.toString().split("-")[1];
	topic = location.href.toString().split("-")[2];
	page = location.href.toString().split("-")[3];
	index = location.href.toString().split("-")[6];
	urlRepondre = self.location.href.toString().replace(/(http:\/\/www.jeuxvideo.com\/forums\/)1(\-[^"]+)/, "$1" + "3" + "$2");
	urlRepondre = (GM_getValue("extra#pseudos", 0) && GM_getValue("pseudos#liste", "") != "") ? "http://www.jeuxvideo.com/cgi-bin/admin/logout.cgi?url=" + urlRepondre : urlRepondre;
	/* ----- Le nombre de pages du topic ----- */
	var p = document.getElementsByTagName("p");
	var stop = true;
	for (var i = 0; i < p.length && stop; i++) {
		if (p[i].className == "pagination") {
			var a = p[i].getElementsByTagName("a");
			if (p[i].lastChild.innerHTML == "»") nbPagesTopic = parseInt(a[a.length - 2].innerHTML);
			else nbPagesTopic = parseInt(p[i].lastChild.innerHTML);
			stop = false;
		}
	}
}

/* ----- Les url des boutons et images ----- */
var btnCiter = "http://www.noelshack.com/uploads/citer052028.gif";
var btnIgnorer = "http://www.noelshack.com/uploads/16062009/ignorer067955.gif";
var btnVoir = "http://www.noelshack.com/uploads/16062009/voir022197.gif";
var btnColoriser = "http://www.noelshack.com/up/aab/coloriser-3c803a0937.png";
var btnHelpMaj = "http://www.noelshack.com/uploads/maj089092.gif";
var btnCdvPlus = "http://www.noelshack.com/up/aac/add-d449773483.png";
var btnCdvMoins = "http://www.noelshack.com/up/aac/remove-5b2d504044.png";
var imgVide = "http://www.noelshack.com/uploads/16062009/vide062856.png";
}

{ // ----- Css ----- //
var css = "<style type='text/css'>a.tlf {color: white !important; font-weight: bold; font-size: 11px;} a.tlf:hover {color: yellow !important;}</style>";
document.getElementsByTagName("head")[0].innerHTML += css;
}

{ // ----- Liste des smileys de jvc avec leurs urls ----- //
var Jvc_smiley = new Array();
	Jvc_smiley.push(new Array(/:\)/g, "http://image.jeuxvideo.com/smileys_img/1.gif", ":)"));
	Jvc_smiley.push(new Array(/:-\)/g, "http://image.jeuxvideo.com/smileys_img/46.gif", ":-)"));
	Jvc_smiley.push(new Array(/:-\)\)\)/g, "http://image.jeuxvideo.com/smileys_img/23.gif", ":-)))"));
	Jvc_smiley.push(new Array(/:hap:/g, "http://image.jeuxvideo.com/smileys_img/18.gif", ":hap:"));
	Jvc_smiley.push(new Array(/:content:/g, "http://image.jeuxvideo.com/smileys_img/24.gif", ":content:"));
	Jvc_smiley.push(new Array(/:oui:/g, "http://image.jeuxvideo.com/smileys_img/37.gif", ":oui:"));
	Jvc_smiley.push(new Array(/:cool:/g, "http://image.jeuxvideo.com/smileys_img/26.gif", ":cool:"));
	Jvc_smiley.push(new Array(/:-D/g, "http://image.jeuxvideo.com/smileys_img/40.gif", ":-D"));
	Jvc_smiley.push(new Array(/:rire:/g, "http://image.jeuxvideo.com/smileys_img/39.gif", ":rire:"));
	Jvc_smiley.push(new Array(/:rire2:/g, "http://image.jeuxvideo.com/smileys_img/41.gif", ":rire2:"));
	Jvc_smiley.push(new Array(/:o\)\)/g, "http://image.jeuxvideo.com/smileys_img/12.gif", ":o))"));
	Jvc_smiley.push(new Array(/:sournois:/g, "http://image.jeuxvideo.com/smileys_img/67.gif", ":sournois:"));
	Jvc_smiley.push(new Array(/:snif:/g, "http://image.jeuxvideo.com/smileys_img/20.gif", ":snif:"));
	Jvc_smiley.push(new Array(/:snif2:/g, "http://image.jeuxvideo.com/smileys_img/13.gif", ":snif2:"));
	Jvc_smiley.push(new Array(/:ouch:/g, "http://image.jeuxvideo.com/smileys_img/22.gif", ":ouch:"));
	Jvc_smiley.push(new Array(/:ouch2:/g, "http://image.jeuxvideo.com/smileys_img/57.gif", ":ouch2:"));
	Jvc_smiley.push(new Array(/:p\)/g, "http://image.jeuxvideo.com/smileys_img/7.gif", ":p)"));
	Jvc_smiley.push(new Array(/:\(/g, "http://image.jeuxvideo.com/smileys_img/45.gif", ":("));
	Jvc_smiley.push(new Array(/:-\(/g, "http://image.jeuxvideo.com/smileys_img/14.gif", ":-("));
	Jvc_smiley.push(new Array(/:-\(\(/g, "http://image.jeuxvideo.com/smileys_img/15.gif", ":-(("));
	Jvc_smiley.push(new Array(/:nonnon:/g, "http://image.jeuxvideo.com/smileys_img/25.gif", ":nonnon:"));
	Jvc_smiley.push(new Array(/:non2:/g, "http://image.jeuxvideo.com/smileys_img/33.gif", ":non2:"));
	Jvc_smiley.push(new Array(/:nah:/g, "http://image.jeuxvideo.com/smileys_img/19.gif", ":nah:"));
	Jvc_smiley.push(new Array(/:non:/g, "http://image.jeuxvideo.com/smileys_img/35.gif", ":non:"));
	Jvc_smiley.push(new Array(/:hum:/g, "http://image.jeuxvideo.com/smileys_img/68.gif", ":hum:"));
	Jvc_smiley.push(new Array(/:gba:/g, "http://image.jeuxvideo.com/smileys_img/17.gif", ":gba:"));
	Jvc_smiley.push(new Array(/:mac:/g, "http://image.jeuxvideo.com/smileys_img/16.gif", ":mac:"));
	Jvc_smiley.push(new Array(/:pacg:/g, "http://image.jeuxvideo.com/smileys_img/9.gif", ":pacg:"));
	Jvc_smiley.push(new Array(/:pacd:/g, "http://image.jeuxvideo.com/smileys_img/10.gif", ":pacd:"));
	Jvc_smiley.push(new Array(/:-p/g, "http://image.jeuxvideo.com/smileys_img/31.gif", ":-p"));
	Jvc_smiley.push(new Array(/:peur:/g, "http://image.jeuxvideo.com/smileys_img/47.gif", ":peur:"));
	Jvc_smiley.push(new Array(/:fou:/g, "http://image.jeuxvideo.com/smileys_img/50.gif", ":fou:"));
	Jvc_smiley.push(new Array(/:fier:/g, "http://image.jeuxvideo.com/smileys_img/53.gif", ":fier:"));
	Jvc_smiley.push(new Array(/:sarcastic:/g, "http://image.jeuxvideo.com/smileys_img/43.gif", ":sarcastic:"));
	Jvc_smiley.push(new Array(/:doute:/g, "http://image.jeuxvideo.com/smileys_img/28.gif", ":doute:"));
	Jvc_smiley.push(new Array(/:malade:/g, "http://image.jeuxvideo.com/smileys_img/8.gif", ":malade:"));
	Jvc_smiley.push(new Array(/:bravo:/g, "http://image.jeuxvideo.com/smileys_img/69.gif", ":bravo:"));
	Jvc_smiley.push(new Array(/:bave:/g, "http://image.jeuxvideo.com/smileys_img/71.gif", ":bave:"));
	Jvc_smiley.push(new Array(/:g\)/g, "http://image.jeuxvideo.com/smileys_img/3.gif", ":g)"));
	Jvc_smiley.push(new Array(/:d\)/g, "http://image.jeuxvideo.com/smileys_img/4.gif", ":d)"));
	Jvc_smiley.push(new Array(/:cd:/g, "http://image.jeuxvideo.com/smileys_img/5.gif", ":cd:"));
	Jvc_smiley.push(new Array(/:globe:/g, "http://image.jeuxvideo.com/smileys_img/6.gif", ":globe:"));
	Jvc_smiley.push(new Array(/:ok:/g, "http://image.jeuxvideo.com/smileys_img/36.gif", ":ok:"));
	Jvc_smiley.push(new Array(/:noel:/g, "http://image.jeuxvideo.com/smileys_img/11.gif", ":noel:"));
	Jvc_smiley.push(new Array(/:mort:/g, "http://image.jeuxvideo.com/smileys_img/21.gif", ":mort:"));
	Jvc_smiley.push(new Array(/:honte:/g, "http://image.jeuxvideo.com/smileys_img/30.gif", ":honte:"));
	Jvc_smiley.push(new Array(/:monoeil:/g, "http://image.jeuxvideo.com/smileys_img/34.gif", ":monoeil:"));
	Jvc_smiley.push(new Array(/:rouge:/g, "http://image.jeuxvideo.com/smileys_img/55.gif", ":rouge:"));
	Jvc_smiley.push(new Array(/:coeur:/g, "http://image.jeuxvideo.com/smileys_img/54.gif", ":coeur:"));
	Jvc_smiley.push(new Array(/:question:/g, "http://image.jeuxvideo.com/smileys_img/2.gif", ":question:"));
	Jvc_smiley.push(new Array(/:fete:/g, "http://image.jeuxvideo.com/smileys_img/66.gif", ":fete:"));
	Jvc_smiley.push(new Array(/:ange:/g, "http://image.jeuxvideo.com/smileys_img/60.gif", ":ange:"));
	Jvc_smiley.push(new Array(/:diable:/g, "http://image.jeuxvideo.com/smileys_img/61.gif", ":diable:"));
	Jvc_smiley.push(new Array(/:sleep:/g, "http://image.jeuxvideo.com/smileys_img/27.gif", ":sleep:"));
	Jvc_smiley.push(new Array(/:gni:/g, "http://image.jeuxvideo.com/smileys_img/62.gif", ":gni:"));
	Jvc_smiley.push(new Array(/:banzai:/g, "http://image.jeuxvideo.com/smileys_img/70.gif", ":banzai:"));
	Jvc_smiley.push(new Array(/:spoiler:/g, "http://image.jeuxvideo.com/smileys_img/63.gif", ":spoiler:"));
	Jvc_smiley.push(new Array(/:sors:/g, "http://image.jeuxvideo.com/smileys_img/56.gif", ":sors:"));
	Jvc_smiley.push(new Array(/:rechercher:/g, "http://image.jeuxvideo.com/smileys_img/38.gif", ":rechercher:"));
	Jvc_smiley.push(new Array(/:hs:/g, "http://image.jeuxvideo.com/smileys_img/64.gif", ":hs:"));
	Jvc_smiley.push(new Array(/:lol:/g, "http://image.jeuxvideo.com/smileys_img/32.gif", ":lol:"));
	Jvc_smiley.push(new Array(/:dpdr:/g, "http://image.jeuxvideo.com/smileys_img/49.gif", ":dpdr:"));
	Jvc_smiley.push(new Array(/:desole:/g, "http://image.jeuxvideo.com/smileys_img/65.gif", ":desole:"));
	Jvc_smiley.push(new Array(/:merci:/g, "http://image.jeuxvideo.com/smileys_img/58.gif", ":merci:"));
	Jvc_smiley.push(new Array(/:svp:/g, "http://image.jeuxvideo.com/smileys_img/59.gif", ":svp:"));
	Jvc_smiley.push(new Array(/:salut:/g, "http://image.jeuxvideo.com/smileys_img/42.gif", ":salut:"));
	Jvc_smiley.push(new Array(/:hello:/g, "http://image.jeuxvideo.com/smileys_img/29.gif", ":hello:"));
	Jvc_smiley.push(new Array(/:up:/g, "http://image.jeuxvideo.com/smileys_img/44.gif", ":up:"));
	Jvc_smiley.push(new Array(/:bye:/g, "http://image.jeuxvideo.com/smileys_img/48.gif", ":bye:"));
	Jvc_smiley.push(new Array(/:gne:/g, "http://image.jeuxvideo.com/smileys_img/51.gif", ":gne:"));
	Jvc_smiley.push(new Array(/:dehors:/g, "http://image.jeuxvideo.com/smileys_img/52.gif", ":dehors:"));

function jvcSmileys(x) {
	var obj = document.getElementById(x);
	for (var i = 0; i < Jvc_smiley.length; i++) {
	obj.innerHTML = obj.innerHTML.replace(Jvc_smiley[i][0], "<img src='" + Jvc_smiley[i][1] + "'>");
	}
}
}

{ //----- Cdv Globale ----- //
var CGV_Liste = new Array();
var CGV_Nom;
var CGV_Sexe;
var CGV_Compteur;
var CGV_Indice;
var CGV_Entete;
var CGV_Anciennete;

function CGFextraire(content) {
   temp = content.toLowerCase();
   var x = temp.indexOf("<div id=\"profil\">");
   if (x == -1) return "";

   var y = temp.indexOf("</div>\n</div>");
   if (y == -1) y = temp.lastIndexOf("</html>");
   if (y == -1) y = content.length;

   return content.slice(x, y);
}

function CGFextraire2(content) {
   temp = content.toLowerCase();
   var x = temp.indexOf("<div id=\"descrip\">");
   if (x == -1) return "";

   var y = temp.lastIndexOf("<div id=\"prefs\">");
   if (y == -1) y = temp.lastIndexOf("</html>");
   if (y == -1) y = content.length;

   return content.slice(x, y);   
}

function CGFmontreModif() {
	CGV_Indice = this.id.substr(1);
	document.getElementById("m_nomCdv").innerHTML = CGV_Liste[CGV_Indice][0];
	document.getElementById("m_urlCdv").value = CGV_Liste[CGV_Indice][1];
	document.getElementById("modificationUrl").style.display = "block";
}

function CGFcacheModif() {
	document.getElementById("m_nomCdv").innerHTML = "";
	document.getElementById("m_urlCdv").value = "";
	document.getElementById("modificationUrl").style.display = "none";
}

function CGFsupprimerCdv() {
	if (CGV_Liste.length > 2) {
		CGV_Indice = this.id.substr(1);
		if (confirm("Pseudo : " + CGV_Liste[CGV_Indice][0] + "\nConfirmez-vous la suppression ?")) {
			var pseudo = CGV_Liste[CGV_Indice][0];
			CGV_Liste.splice(CGV_Indice, 1);
			GM_deleteValue("cdv#" + pseudo.toLowerCase());
		}
		GM_setValue("CG#liste", CGV_Liste.join());
		CGFcdvAssociees();
	} else alert("Suppression impossible.\nDeux cdv minimum sont requises pour la cdv globale.");
}

function CGFmodifierCdv() {
	var m_urlCdv = document.getElementById("m_urlCdv");
	CGV_Compteur = 0;
	CGFurlTraitement(m_urlCdv.value, CGV_Indice);
	if (CGV_Compteur == 1) {
		GM_setValue("CG#liste", CGV_Liste.join());
		alert("Modifications enregistrées.");
		CGFcacheModif();
		CGFcdvAssociees();
	}
}

function CGFcdvAssociees() {
	var listeCdv = document.getElementById("listeCdv");
		listeCdv.innerHTML = "";
	CGV_Liste = CGV_Liste.sort();
	for (var i = 0; i < CGV_Liste.length; i++) {
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
			a.innerHTML = CGV_Liste[i][0];
			a.href = CGV_Liste[i][1];
			a.title = "Voir le profil de " + CGV_Liste[i][0];
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
			img.addEventListener("click", CGFsupprimerCdv, false);
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
			img.addEventListener("click", CGFmontreModif, false);
		minDiv.appendChild(img);
		listeCdv.appendChild(minDiv);
	}
	document.getElementById("nbCdvAssociees").innerHTML = CGV_Liste.length;
}

function CGFformatage(url) {
	if (url.length > 60) return url.substr(0, 30) + "[....]" + url.substr(url.length - 31); else return url;
}

function CGFurlTraitement(cdv, indice) {
	if (cdv.match(/^http:\/\/www\.jeuxvideo\.com\/cgi\-bin\/jvforums\/forums_profil\.cgi\?pxo=[^"]+&dxo=[^"]+&k=/)) {
		req = new XMLHttpRequest();
		req.open("GET", cdv, false);
		req.send(null);
		document.getElementById('displayed').innerHTML = CGFextraire(req.responseText);
		req.abort();
		var contenu = document.getElementById('profil').innerHTML;
		if (contenu != "" && contenu != null && contenu != "\n") {
			var pseudo = cdv.match(/^http:\/\/www\.jeuxvideo\.com\/cgi\-bin\/jvforums\/forums_profil\.cgi\?pxo=([^"]+)&dxo/)[1];
			var banni = (document.getElementById("profil").getElementsByTagName("p")[0].innerHTML == "Ce pseudo a été banni.");
			if (indice < 0) {
				var doublon = false;
				for (var u = 0; u < CGV_Liste.length; u++) {
					if (CGV_Liste[u][0].toLowerCase() == pseudo.toLowerCase()) doublon = true;
				}
				if (!doublon) CGV_Liste.push(new Array(pseudo, cdv));
				else CGV_Compteur--;
				var table = document.getElementById("tableInfos");
				var tr = document.createElement("tr");
				var td = document.createElement("td");
					td.align = "left";
				var a = document.createElement("a");
					a.title = cdv;
					a.href = cdv;
					a.target = "_blank";
					a.innerHTML = "+> " + CGFformatage(cdv);
				td.appendChild(a);
				tr.appendChild(td);
				var td = document.createElement("td");
					td.align = "right";
					td.innerHTML = doublon ? "Doublon" : banni ? "Banni" : "Valide";
					td.style.color = "green";
				tr.appendChild(td);
				table.appendChild(tr);
			} else {
				CGV_Liste[indice][0] = pseudo;
				CGV_Liste[indice][1] = cdv;
			}
			CGV_Compteur++;
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
					a.innerHTML = "+> " + CGFformatage(cdv);
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
					a.innerHTML = "+> " + CGFformatage(cdv);
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

function CGFajoutCdv() {
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
	
	CGV_Compteur = 0;
	var un = 100 / listeCdv.length;
	document.getElementById('rouge').style.width = "0px";
	document.getElementById('noir').style.width = "100px";
	document.getElementById("wait").style.display = "block";
	for (var i = 0; i < listeCdv.length; i++) {
		var rouge = un * i + 1;
		var noir = 100 - rouge;
		document.getElementById('rouge').style.width = rouge + "px";
		document.getElementById('noir').style.width = noir + "px";
		CGFurlTraitement(listeCdv[i], -1);
	}
	document.getElementById("wait").style.display = "none";
	
	if (CGV_Compteur == 0) alert("Aucune cdv n'a été ajoutée.");
	else {
		(CGV_Compteur > 1) ? alert(CGV_Compteur + " cdv ont été ajoutées.") : alert("Une cdv a été ajoutée.");
		GM_setValue("CG#liste", CGV_Liste.join());
		CGFcdvAssociees();
	}
	
	a_listeCdv.value = "";
	document.getElementById("divInfos").style.display = "block";
}

function CGFcreationCdv() {
	if (!confirm("Si une cdv globale existait déjà, elle sera supprimée.\nConfirmez-vous la suppression ?")) return 0;
	
	CGV_Liste = new Array();
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
		CGV_Compteur = 0;
		var un = 100 / listeCdv.length;
		document.getElementById('rouge').style.width = "0px";
		document.getElementById('noir').style.width = "100px";
		document.getElementById("wait").style.display = "block";
		for (var i = 0; i < listeCdv.length; i++) {
			var rouge = un * i + 1;
			var noir = 100 - rouge;
			document.getElementById('rouge').style.width = rouge + "px";
			document.getElementById('noir').style.width = noir + "px";
			CGFurlTraitement(listeCdv[i], -1);
		}
		document.getElementById("wait").style.display = "none";
	}
	
	if (CGV_Compteur < 2) {
		alert("Il n'y a pas assez de liens valides pour créer la cdv globale.");
		return 0;
	}
	
	GM_setValue("CG#liste", CGV_Liste.join());
	GM_setValue("CG#nom", c_nomCdvGlobale.value);
	GM_setValue("CG#sexe", "M");
	
	CGV_Nom = c_nomCdvGlobale.value;
	CGV_Sexe = "M";
	
	alert("Le rassemblement a été effectué avec succès.");
	CGFaffichage();
	
	document.getElementById("c_nomCdvGlobale").value = "";
	document.getElementById("c_listeCdv").value = "";
	document.getElementById("divInfos").style.display = "block";
}

function CGFnomSexeModif() {
	var x = document.getElementById("m_nomCdvGlobale");
	var y = document.getElementById("m_sexeM");
	if (x.value == null || x.value == "") {
		alert("Entrez un nom pour la cdv globale.");
		return 0;
	}
	GM_setValue("CG#nom", x.value);
	CGV_Nom = x.value;
	if (y.checked) {
		GM_setValue("CG#sexe", "M");
		CGV_Sexe = "M";
	} else {
		GM_setValue("CG#sexe", "F");
		CGV_Sexe = "F";
	}
	alert("Modifications enregistrées.");
}

function CGFsuppressionTotale() {
	if (confirm("Confirmez-vous la suppression de la cdv globale ?")) {
		GM_deleteValue("CG#liste");
		GM_deleteValue("CG#nom");
		GM_deleteValue("CG#sexe");
		window.location = "http://www.jeuxvideo.com/forums/CdvGlobale";
	}
}

function CGFsauvegarde() {
	var contenuSave = document.getElementById("contenuSave");
		contenuSave.value = "";
		
	for (var i = 0; i < CGV_Liste.length; i++) contenuSave.value += CGV_Liste[i][1] + "\n";
	document.getElementById("divSave").style.display = "block";
}

function CGFafficheEntete() {
	if (this.checked) {
		GM_setValue("CG#entete", 0);
		CGV_Entete = 0;
	} else {
		GM_setValue("CG#entete", 1);
		CGV_Entete = 1;
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
		input.value = CGV_Nom;
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
		if (CGV_Sexe == "M") input.checked = true;
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
		if (CGV_Sexe == "F") input.checked = true;
		input.setAttribute("onclick", "document.getElementById('m_sexeM').checked = false");
	divG.appendChild(label);
	divG.appendChild(input);
	
	var img = document.createElement("img");
		img.style.cursor = "pointer";
		img.style.marginBottom = "-3px";
		img.src = "http://www.noelshack.com/voir/130309/btn071821.png";
		img.addEventListener("click", CGFnomSexeModif, false);
	divG.appendChild(img);
	
	divG.appendChild(document.createElement("br"));
	divG.appendChild(document.createElement("br"));
	
	var checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.id = "entete";
		if (!CGV_Entete) CGV_Entete = 0;
		checkbox.checked = CGV_Entete ? false : true;
		checkbox.style.marginRight = "5px";
		checkbox.addEventListener("click", CGFafficheEntete, false);
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
		img.addEventListener("click", CGFajoutCdv, false);
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
		img.addEventListener("click", CGFmodifierCdv, false);
	div.appendChild(img);
	var img = document.createElement("img");
		img.src = "http://img216.imageshack.us/img216/3076/btnannulerbleu.png";
		img.style.cursor = "pointer";
		img.style.marginLeft = "10px";
		img.addEventListener("click", CGFcacheModif, false);
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
		a.addEventListener("click", CGFsuppressionTotale, false);
		a.style.fontWeight = "bold";
	divG.appendChild(a);
	var img = document.createElement("img");
		img.style.margin = "0px 8px -3px 132px";
		img.src = "http://image.jeuxvideo.com/css_img/defaut/puce_liste_bleue.gif";
	divG.appendChild(img);
	var a = document.createElement("a");
		a.innerHTML = "Faire une sauvegarde des liens....";
		a.style.cursor = "pointer";
		a.addEventListener("click", CGFsauvegarde, false);
		a.style.fontWeight = "bold";
	divG.appendChild(a);
	divGDMC.appendChild(divG);
	obj.appendChild(divGDMC);
	var div = document.createElement("div");
		div.id = "wait";
		div.align = "center";
		div.style.position = "fixed";
		div.style.zIndex = "1";
		div.style.display = "none";
		div.style.left = window.innerWidth / 2 - 150 + "px";
		div.style.top = window.innerHeight / 2  + "px";
	var img = document.createElement("img");
		img.src = "http://www.noelshack.com/up/aac/loading-446828c596.gif";
		img.style.display = "block";
	div.appendChild(img);
	var img = document.createElement("img");
		img.id = "rouge";
		img.src = "http://www.noelshack.com/voir/130309/barre087246.jpg";
		img.style.height = "10px";
	div.appendChild(img);
	var img = document.createElement("img");
		img.id = "noir";
		img.src = "http://www.noelshack.com/voir/130309/barre002928.jpg";
		img.style.height = "10px";
	div.appendChild(img);
	obj.appendChild(div);
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
		img.addEventListener("click", CGFcreationCdv, false);
	divG.appendChild(img);
	obj.appendChild(divG);
}

function CGFaffichage() {
	if (CGV_Nom != "") {
		CGV_Liste = new Array();
		var temp = GM_getValue("CG#liste", "");
		var tempTbl = temp.split(",");
		for (var i = 0; i < tempTbl.length; i += 2) {
			CGV_Liste.push(new Array(tempTbl[i], tempTbl[i + 1]));
		}
		CGFcdvAssociees();
		document.getElementById("m_nomCdvGlobale").value = CGV_Nom;
		document.getElementById("divGDMC").style.display = "block";
	}
}

function CGFcdvGlobale() {
	document.getElementsByTagName("head")[0].innerHTML += "<link href='http://www.jeuxvideo.com/css/defaut/forums.css' rel='stylesheet' type='text/css' />";
	document.title = "Module de carte de visite";
	
	CGV_Nom = GM_getValue("CG#nom", "");
	CGV_Sexe = GM_getValue("CG#sexe", "M");
	CGV_Entete = GM_getValue("CG#entete", 1);
	
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
	
	CGFaffichage();
}

function CGFnombreTotal(cdv, avancement) {
	req = new XMLHttpRequest();
	req.open("GET", cdv, false);
	req.send(null);
	document.getElementById('displayed').innerHTML = CGFextraire2(req.responseText);
	req.abort();
	var banni = (document.getElementById('displayed').innerHTML == "");
	if (!banni) {
		document.getElementById("chrono").innerHTML = "Addition des messages pour chaque pseudo en cours - " + avancement + " / " + CGV_Liste.length;
		var nbPosts = document.getElementById("displayed").getElementsByTagName("strong")[0].innerHTML;
			nbPosts = nbPosts.replace("Nombre de messages postés sur les forums : ", "");
			nbPosts = nbPosts.replace(".", "");
		CGV_Compteur += parseInt(nbPosts);
		var nbJours = document.getElementById("displayed").getElementsByTagName("td")[2].innerHTML;
			nbJours = nbJours.split(" ")[0].replace(/\./g, "");
			nbJours = parseInt(nbJours);
		if (CGV_Anciennete < nbJours) CGV_Anciennete = nbJours;
	} else {
		var pseudo = cdv.match(/^http:\/\/www\.jeuxvideo\.com\/cgi\-bin\/jvforums\/forums_profil\.cgi\?pxo=([^"]+)&dxo=[^"]+&k=/)[1];
		CGV_Compteur += parseInt(GM_getValue("cdv#" + pseudo.toLowerCase(), 0));
	}
}

function CGFchargeCdv() {
	req = new XMLHttpRequest();
	req.open("GET", this.value, false);
	req.send(null);
	document.getElementById("switch").innerHTML = CGFextraire(req.responseText);
	req.abort();
	
	if (GM_getValue("extra#avatar", 0)) hideAvatar();
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
			strong.innerHTML = "Nombre de messages postés sur les forums : " + CGFformatNbPost(GM_getValue("cdv#" + pseudo.toLowerCase(), 0));
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
		if (CGV_Anciennete != jours) ancien.innerHTML += "<br>(" + CGFformatNbPost(CGV_Anciennete) + " jours)";
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
	
	jvcSmileys("switch");
}

function CGFformatNbPost(nb) {
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

function CGFnbPostPseudoBanni() {
	var pseudo = location.href.split("?")[1];
	if(document.getElementsByTagName("PRE")[0].innerHTML.split("\t")[6].split("\n")[1]) GM_setValue("cdv#" + pseudo.toLowerCase(), document.getElementsByTagName("PRE")[0].innerHTML.split("\t")[6].split("\n")[1]);
	else GM_setValue("cdv#" + pseudo.toLowerCase(), 0);
	window.close();
}

function CGFpageCdv() {
	CGV_Nom = GM_getValue("CG#nom", "");
	CGV_Sexe = GM_getValue("CG#sexe", "M");
	CGV_Entete = GM_getValue("CG#entete", 1);
	CGV_Compteur = 0;
	CGV_Anciennete = 0;
	
	if (CGV_Nom != "") {
		CGV_Liste = new Array();
		var watashiNo = false;
		var temp = GM_getValue("CG#liste", "");
			var tempTbl = temp.split(",");
			for (var i = 0; i < tempTbl.length; i += 2) {
				CGV_Liste.push(new Array(tempTbl[i], tempTbl[i + 1]));
				var pseudo = location.href.match(/^http:\/\/www\.jeuxvideo\.com\/cgi\-bin\/jvforums\/forums_profil\.cgi\?pxo=([^"]+)&dxo=[^"]+&k=/)[1];
				if (pseudo.toLowerCase() == tempTbl[i].toLowerCase()) watashiNo = true;
			}
		CGV_Liste = CGV_Liste.sort();
		
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
			if (CGV_Entete) {
				var div = document.createElement("div");
					div.style.background = "url(http://image.jeuxvideo.com/css_img/defaut/profil_pseudo_fond.png) no-repeat center center";
				var span = document.createElement("h1");
					span.id = "pseudo";
					span.style.color = (CGV_Sexe == "M") ? "#0066CC" : "#FF3399";
					span.innerHTML = CGV_Nom;
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
			for (var i = 0; i < CGV_Liste.length; i++) {
				var option = document.createElement("option");
					option.value = CGV_Liste[i][1];
					option.innerHTML = CGV_Liste[i][0];
					option.addEventListener("click", CGFchargeCdv, false);
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
					strong.innerHTML = "Nombre de messages postés sur les forums : " + GM_getValue("cdv#" + pseudo.toLowerCase(), 0);
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
			
			jvcSmileys("switch");
			
			for (var i = 0; i < CGV_Liste.length; i++) CGFnombreTotal(CGV_Liste[i][1], i + 1);
			document.getElementById("chrono").innerHTML = "Nombre total de messages postés sur les forums : " + CGFformatNbPost(CGV_Compteur);
			
			if (!banni) {
				var ancien = document.getElementById("descrip").getElementsByTagName("td")[2];
				var jours = ancien.innerHTML.split(" ")[0].replace(/\./g, "");
					jours = parseInt(jours);
				if (CGV_Anciennete != jours) ancien.innerHTML += "<br>(" + CGFformatNbPost(CGV_Anciennete) + " jours)";
			}
		} else jvcSmileys("cartevisite0");
	}
}

function CGtraitementDirect() {
	var cdv = (GM_getValue("skin#newlook", 0)) ? this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByTagName("a")[0].href : this.parentNode.getElementsByTagName("a")[0].href;
	var pseudo = cdv.match(/^http:\/\/www\.jeuxvideo\.com\/cgi\-bin\/jvforums\/forums_profil\.cgi\?pxo=([^"]+)&dxo/)[1];
	
	req = new XMLHttpRequest();
	req.open("GET", cdv, false);
	req.send(null);
	document.getElementById('displayed').innerHTML = CGFextraire(req.responseText);
	req.abort();
	
	var banni = (document.getElementById("profil").getElementsByTagName("p")[0].innerHTML == "Ce pseudo a été banni.");
	var doublon = false;
	for (var u = 0; u < CGV_Liste.length; u++) {
		if (CGV_Liste[u][0].toLowerCase() == pseudo.toLowerCase()) doublon = true;
	}
	if (!doublon) {
		CGV_Liste.push(new Array(pseudo, cdv));
		if (banni) window.open("http://94.23.24.151/cgi-bin/moiocijveudezinfosurmonpseudo.cgi?" + pseudo);
	} else {
		if (confirm("Pseudo : " + pseudo + "\nConfirmez-vous la suppression ?")) {
			for (var u = 0; u < CGV_Liste.length; u++) {
				if (CGV_Liste[u][0].toLowerCase() == pseudo.toLowerCase()) CGV_Liste.splice(u, 1);
			}
			GM_deleteValue("cdv#" + pseudo.toLowerCase());
		}
	}
	GM_setValue("CG#liste", CGV_Liste.join());
	CGboutons();
}

function CGboutons() {
	if (GM_getValue("skin#newlook", 0)) {
		if (document.getElementById('col1')) {
			var td = document.getElementById('col1').getElementsByTagName("td");
			for (var u = 0; td[u]; u++) {
				if (td[u].className == 'lesBoutons') {
					var parent = td[u].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
					var cdv = parent.getElementsByTagName("a")[0].href;
					var pseudo = cdv.match(/^http:\/\/www\.jeuxvideo\.com\/cgi\-bin\/jvforums\/forums_profil\.cgi\?pxo=([^"]+)&dxo/)[1];
					var doublon = false;
					for (var i = 0; i < CGV_Liste.length; i++) {
						if (CGV_Liste[i][0].toLowerCase() == pseudo.toLowerCase()) doublon = true;
					}
					var aru = -1;
					var imgs = td[u].getElementsByTagName("img");
					for (var i = 0; i < imgs.length; i++) {
						if (imgs[i].className == "b_cdvg") aru = i;
					}
					var img = (aru > -1) ? imgs[aru] : document.createElement("img");
						img.className = "b_cdvg";
						img.title = doublon ? "Retirer ce pseudo de ma cdv globale" : "Ajouter ce pseudo à ma cdv globale";
						img.src = doublon ? btnCdvMoins : btnCdvPlus;
						img.style.marginRight = "4px";
					if (aru == -1) {
						var a = document.createElement("a");
							a.style.cursor = "pointer";
							a.addEventListener("click", CGtraitementDirect, false);
							a.appendChild(img);
						td[u].insertBefore(a, td[u].lastChild);
					}
				}
			}
		}
	} else {
		var lis = document.getElementById('col1').getElementsByTagName("li");
		for (var u = 0; lis[u]; u++) {
			if (lis[u].className == 'pseudo') {
				lis[u].getElementsByTagName("img")[0].style.marginRight = "1px";
				var cdv = lis[u].getElementsByTagName("a")[0].href;
				var pseudo = cdv.match(/^http:\/\/www\.jeuxvideo\.com\/cgi\-bin\/jvforums\/forums_profil\.cgi\?pxo=([^"]+)&dxo/)[1];
				var doublon = false;
				for (var i = 0; i < CGV_Liste.length; i++) {
					if (CGV_Liste[i][0].toLowerCase() == pseudo.toLowerCase()) doublon = true;
				}
				var aru = -1;
				var imgs = lis[u].getElementsByTagName("img");
				for (var i = 0; i < imgs.length; i++) {
					if (imgs[i].className == "b_cdvg") aru = i;
				}
				var img = (aru > -1) ? imgs[aru] : document.createElement("img");
					img.className = "b_cdvg";
					img.title = doublon ? "Retirer ce pseudo de ma cdv globale" : "Ajouter ce pseudo à ma cdv globale";
					img.src = doublon ? btnCdvMoins : btnCdvPlus;
					img.style.marginRight = "4px";
				if (aru == -1) {
					var a = document.createElement("a");
						a.style.cursor = "pointer";
						a.addEventListener("click", CGtraitementDirect, false);
						a.appendChild(img);
					lis[u].appendChild(a);
				}
			}
		}
	}
}

function CdvGlobale() {
	var li = document.createElement("li");
	var a = document.createElement("a");
		a.innerHTML = "Gestion Cdv";
		a.title = "Gestion Cdv";
		a.href = "http://www.jeuxvideo.com/forums/CdvGlobale";
		a.target = "gestioncdv";
	li.appendChild(a);
	document.getElementById("menu_interactif").getElementsByTagName("ul")[0].appendChild(li);
	
	if (mode == 1 || mode == 3) {
		if (GM_getValue("CG#nom", "") != "") {
			CGV_Liste = new Array();
			var temp = GM_getValue("CG#liste", "");
			var tempTbl = temp.split(",");
			for (var i = 0; i < tempTbl.length; i += 2) {
				CGV_Liste.push(new Array(tempTbl[i], tempTbl[i + 1]));
			}
			var div = document.createElement("div");
				div.id = "displayed";
				div.style.display = "none";
			document.getElementById("col1").appendChild(div);
			CGboutons();
		}
	}
}
} //----- Fin Cdv Globale -----//

{ //----- Citer ----- //
function CFhtml(msg) {
	msg = msg.replace("&gt;", ">");
	msg = msg.replace("&lt;", "<");
	return msg;
}

function CFtoDisappear(x) {
	for (var z = x.childNodes.length - 1; z >= 0; z--) {
		if (x.childNodes[z].className == "toDisappear") x.removeChild(x.childNodes[z]);
	}
	return x.innerHTML;
}

function CFwriteCitation() {
	var pseudo = GM_getValue("C#pseudo", "Inconnu");
	var date = GM_getValue("C#date", "jour de sa mort");
	var post = GM_getValue("C#post", "Cette citation n'a pas reçu de données de départ. :(");
	var ancre = GM_getValue("C#ancre", "Il n'y a pas de lien pour un post qui n'existe pas.");
	
	GM_deleteValue("C#pseudo");
	GM_deleteValue("C#date");
	GM_deleteValue("C#post");
	GM_deleteValue("C#ancre");
	GM_deleteValue("C#citation");
	
	var ligneIn = ".................................. .................................. ................................. .................................. ..................................";
	
	if (post.match(ligneIn))
	ligneIn = "-------------------------------- ------------------------------- -------------------------------- --------------------------------";
	
	message = document.getElementById("newmessage");
	
	if (GM_getValue("C#style", "jvm") == "jvm") {
		message.innerHTML = pseudo + " a écrit le ";
		message.innerHTML += date + "....\n" + ligneIn + "\n" + post + "\n" + ligneIn + "\n" + ancre + "\n\n+> ";
	} else {
		post = post.replace(/\n/g, "\n| ");
		message.innerHTML = "| " + ancre + "\n";
		message.innerHTML += "| Citation de : " + pseudo + "\n";
		message.innerHTML += "| Date du message : " + date + "\n";
		message.innerHTML += "| Contenu du message :\n| " + post + "\n\n+> ";
		
	}
	message.focus();
}

function CFciterMode1() {
	var pseudo;
	var date;
	var post;
	var ancre;
	
	if (GM_getValue("skin#newlook", 0)) {
		var parent = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
		pseudo = parent.getElementsByTagName("strong")[0].innerHTML;
		date = parent.getElementsByTagName("span")[1].innerHTML;
		date = date.split("<br>")[0] + "à" + date.split("<br>")[1];
		post = CFtoDisappear(parent.getElementsByTagName("li")[0]);
		ancre = parent.getElementsByTagName("li")[1].innerHTML;
		ancre = ancre.replace(/<a href="([^"]+)">Lien permanent<\/a>/, "$1");
	} else {
		pseudo = this.parentNode.getElementsByTagName("strong")[0].innerHTML;
		date = this.parentNode.nextSibling.nextSibling.innerHTML.split("\n")[1].replace("Posté ", "");
		post = CFtoDisappear(this.parentNode.nextSibling.nextSibling.nextSibling.nextSibling);
		ancre = this.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
		ancre = ancre.replace(/<a href="([^"]+)">Lien permanent<\/a>/, "$1");
	}
	
	var ligneIn = ".................................. .................................. ................................. .................................. ..................................";
	var ligneOut = "-------------------------------- ------------------------------- -------------------------------- --------------------------------";
	
	for (var v = 0; v < Mega_smileys.length; v++) post = post.replace(new RegExp("<img src=\"" + Mega_smileys[v][2] + "\">", "g"), Mega_smileys[v][1]); // Mes smileys
	post = post.replace(/<img src="http:\/\/www\.noelshack\.com\/uploads\/16062009\/ligne2076795\.png" style="margin: 8px 0px; width: 100%; height: 2px;">/g, ligneIn); // Premier niveau
	post = post.replace(/<img src="http:\/\/www\.noelshack\.com\/up\/aac\/ligne2076795-33cacaba2\.png" style="margin: 8px 0px; width: 100%; height: 2px;">/g, ligneOut); // Second niveau
	post = post.replace(/ ?<img src="[^"]+" alt="([^"]+)" ?\/?> ?/gi, " $1 "); // Les smileys de Jvc
	post = post.replace(/<a style="display: none;" href="([^"]+)" target="_blank" rel="nofollow">[^"]+<\/a>/g, "$1"); // Les liens des images et des vidéos qui sont affichées
	post = post.replace(/<a href="([^"]+)" target="_blank" rel="nofollow">[^"]+<\/a>/g, "$1"); // Les liens des images et des vidéos qui sont affichées
	post = post.replace(/<a href="([^"]+)" target="_blank">[^"]+<\/a>/gi, "$1");
	post = post.replace(/^\s+|\s+$|<br>/g, "");
	post = post.replace(/\n{2,}/g, "\n\n");
	post = CFhtml(post);
	
	GM_setValue("C#pseudo", pseudo);
	GM_setValue("C#date", date);
	GM_setValue("C#post", post);
	GM_setValue("C#ancre", ancre);
	GM_setValue("C#citation", 1);
	
	self.location.href = urlRepondre;
}

function CFciterMode3() {
	var pseudo;
	var date;
	var post;
	var ancre;
	
	if (GM_getValue("skin#newlook", 0)) {
		var parent = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
		pseudo = parent.getElementsByTagName("strong")[0].innerHTML;
		date = parent.getElementsByTagName("span")[1].innerHTML;
		date = date.split("<br>")[0] + "à" + date.split("<br>")[1];
		post = CFtoDisappear(parent.getElementsByTagName("li")[0]);
		ancre = parent.getElementsByTagName("td")[3].lastChild.href;
		ancre = ancre.split("&");
		ancre = "http://www.jeuxvideo.com/forums/1-" + ancre[1].split("=")[1] + "-" + ancre[2].split("=")[1] + "-" + ancre[5].split("=")[1] + "-0-1-0-0.htm#message_" + ancre[3].split("=")[1];
	} else {
		pseudo = this.parentNode.getElementsByTagName("strong")[0].innerHTML;
		date = this.parentNode.nextSibling.nextSibling.innerHTML.split("\n")[1].replace("Posté ", "");
		post = CFtoDisappear(this.parentNode.nextSibling.nextSibling.nextSibling.nextSibling);
		ancre = this.parentNode.parentNode.getElementsByTagName("li")[1].getElementsByTagName("a")[0].href;
		ancre = ancre.split("&");
		ancre = "http://www.jeuxvideo.com/forums/1-" + ancre[1].split("=")[1] + "-" + ancre[2].split("=")[1] + "-" + ancre[5].split("=")[1] + "-0-1-0-0.htm#message_" + ancre[3].split("=")[1];
	}
	
	var ligneIn = ".................................. .................................. ................................. .................................. ..................................";
	var ligneOut = "-------------------------------- ------------------------------- -------------------------------- --------------------------------";
	
	for (var v = 0; v < Mega_smileys.length; v++) post = post.replace(new RegExp("<img src=\"" + Mega_smileys[v][2] + "\">", "g"), Mega_smileys[v][1]); // Mes smileys
	post = post.replace(/<img src="http:\/\/www\.noelshack\.com\/uploads\/16062009\/ligne2076795\.png" style="margin: 8px 0px; width: 100%; height: 2px;">/g, ligneIn); // Premier niveau
	post = post.replace(/<img src="http:\/\/www\.noelshack\.com\/up\/aac\/ligne2076795-33cacaba2\.png" style="margin: 8px 0px; width: 100%; height: 2px;">/g, ligneOut); // Second niveau
	post = post.replace(/ ?<img src="[^"]+" alt="([^"]+)" ?\/?> ?/gi, " $1 "); // Les smileys de Jvc
	post = post.replace(/<a style="display: none;" href="([^"]+)" target="_blank" rel="nofollow">[^"]+<\/a>/g, "$1"); // Les liens des images et des vidéos qui sont affichées
	post = post.replace(/<a href="([^"]+)" target="_blank" rel="nofollow">[^"]+<\/a>/g, "$1"); // Les liens des images et des vidéos qui sont affichées
	post = post.replace(/<a href="([^"]+)" target="_blank">[^"]+<\/a>/gi, "$1");
	post = post.replace(/^\s+|\s+$|<br>/g, "");
	post = post.replace(/\n{2,}/g, "\n\n");
	post = CFhtml(post);
	
	message = document.getElementById("newmessage");
	
	if (GM_getValue("C#style", "jvm") == "jvm") {
		message.value += pseudo + " a écrit le ";
		message.value += date + "....\n" + ligneIn + "\n" + post + "\n" + ligneIn + "\n" + ancre + "\n\n+> ";
	} else {
		post = post.replace(/\n/g, "\n| ");
		message.value = "| " + ancre + "\n";
		message.value += "| Citation de : " + pseudo + "\n";
		message.value += "| Date du message : " + date + "\n";
		message.value += "| Contenu du message :\n| " + post + "\n\n+> ";
		
	}
	message.focus();
}

function CFstyleCitation() {
	if (this.className == 'no') {
		var you = (this.id == "s_jvf") ? "s_jvm" : "s_jvf";
			you = document.getElementById(you);
			you.className = "no";
			you.style.color = "#666666";
			you.style.background = "#FFF";
			you.style.cursor = "pointer";
		this.className = "yes";
		this.style.color = "#FFF";
		this.style.background = "#666666";
		this.style.cursor = "default";
		GM_setValue("C#style", this.id.substr(2));
	}
}

function CFciterButton() {
	if (GM_getValue("skin#newlook", 0)) {
		if (document.getElementById('col1')) {
			var td = document.getElementById('col1').getElementsByTagName("td");
			for (var u = 0; td[u]; u++) {
				if (td[u].className == 'lesBoutons') {
					var img = document.createElement("img");
						img.className = "b_citer";
						img.title = "Citer";
						img.src = btnCiter;
						img.style.marginRight = "4px";
					var a = document.createElement("a");
						a.style.cursor = "pointer";
					switch (parseInt(mode)) {
						case 1: a.addEventListener("click", CFciterMode1, false); break;
						case 3: a.addEventListener("click", CFciterMode3, false); break;
						}
					a.appendChild(img);
					td[u].insertBefore(a, td[u].lastChild);
				}
			}
		}
	} else {
		var lis = document.getElementById('col1').getElementsByTagName("li");
		for (var u = 0; lis[u]; u++) {
			if (lis[u].className == 'pseudo') {
				lis[u].getElementsByTagName("img")[0].style.marginRight = "1px";
				var img = document.createElement("img");
					img.className = "b_citer";
					img.title = "Citer";
					img.src = btnCiter;
					img.style.marginRight = "4px";
				var a = document.createElement("a");
					a.style.cursor = "pointer";
				switch (parseInt(mode)) {
					case 1: a.addEventListener("click", CFciterMode1, false); break;
					case 3: a.addEventListener("click", CFciterMode3, false); break;
					}
				a.appendChild(img);
				lis[u].appendChild(a);
			}
		}
	}
}

function CFchooseStyle() {
	var div = document.createElement("div");
	var span = document.createElement("span");
		span.innerHTML = " | STYLE CITATION : ";
	div.appendChild(span);
	var span = document.createElement("span");
		span.id = "s_jvf";
		span.className = (GM_getValue("C#style", "jvm") == "jvf") ? "yes" : "no";
		span.innerHTML = "JvF";
		span.style.color = (span.className == 'yes') ? "#FFF" : "#666666";
		span.style.height = "22px";
		span.style.margin = "0px 4px";
		span.style.padding = "0px 2px";
		span.style.background = (span.className == 'yes') ? "#666666" : "#FFF";
		span.style.cursor = (span.className == 'yes') ? "default" : "pointer";
		span.setAttribute("onmouseover", "if (this.className == 'no') { this.style.background = '#999999'; this.style.color = '#FFF'; }");
		span.setAttribute("onmouseout", "if (this.className == 'no') { this.style.background = '#FFF'; this.style.color = '#666666'; }");
		span.addEventListener("click", CFstyleCitation, false);
	div.appendChild(span);
	var span = document.createElement("span");
		span.innerHTML = " / ";
	div.appendChild(span);
	var span = document.createElement("span");
		span.id = "s_jvm";
		span.className = (GM_getValue("C#style", "jvm") == "jvm") ? "yes" : "no";
		span.innerHTML = "JvM";
		span.style.color = (span.className == 'yes') ? "#FFF" : "#666666";
		span.style.height = "22px";
		span.style.margin = "0px 4px";
		span.style.padding = "0px 2px";
		span.style.background = (span.className == 'yes') ? "#666666" : "#FFF";
		span.style.cursor = (span.className == 'yes') ? "default" : "pointer";
		span.setAttribute("onmouseover", "if (this.className == 'no') { this.style.background = '#999999'; this.style.color = '#FFF'; }");
		span.setAttribute("onmouseout", "if (this.className == 'no') { this.style.background = '#FFF'; this.style.color = '#666666'; }");
		span.addEventListener("click", CFstyleCitation, false);
	div.appendChild(span);
	var ft1 = document.getElementById("ft1");
	var parent = ft1.parentNode;
	parent.insertBefore(div, ft1);
}

function Citer() {
	if (mode != 3) CFchooseStyle();
	if (mode != 0) {
		CFciterButton();
		if (GM_getValue("C#citation", 0) == 1) CFwriteCitation();
	}
}
} //----- Fin Citer -----//

{ //----- Coloriser ----- //
var CLV_Couleur = "";
var CLV_Pseudo = "";
var CLV_Actif = false;

function CLFrgb(x) {
	return "rgb(" + x.split("_")[0] + "," + x.split("_")[1] + "," + x.split("_")[2] + ")";
}

function CLFcolorise() {
	if (GM_getValue("skin#newlook", 0)) {
		var td = document.getElementById('col1').getElementsByTagName("td");
		for (var u = 0; td[u]; u++) {
			if (td[u].className == 'lesBoutons') {
				var parent = td[u].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
				var pseudo = parent.getElementsByTagName("strong")[0];
				if (pseudo.innerHTML.toLowerCase() == CLV_Pseudo.toLowerCase())
				pseudo.style.color = CLFrgb(CLV_Couleur);
			}
		}
	} else {
		var lis = document.getElementById('col1').getElementsByTagName("li");
		for (var u = 0; lis[u]; u++) {
			if (lis[u].className == 'pseudo') {
				var pseudo = lis[u].getElementsByTagName("strong")[0];
				if (pseudo.innerHTML.toLowerCase() == CLV_Pseudo.toLowerCase())
				pseudo.style.color = CLFrgb(CLV_Couleur);
			}
		}
	}
}

function CLFvalider() {
	if (GM_getValue("skin#newlook", 0)) {
		var label = document.getElementById("appercu_couleur");
		if (CLV_Couleur != Mega_NewLook[label.className]) GM_setValue("color#" + CLV_Pseudo.toLowerCase(), CLV_Couleur);
		else GM_deleteValue("color#" + CLV_Pseudo.toLowerCase());
	} else {
		var label = document.getElementById("appercu_couleur");
		if (CLV_Couleur != Mega_Normal[label.className]) GM_setValue("color#" + CLV_Pseudo.toLowerCase(), CLV_Couleur);
		else GM_deleteValue("color#" + CLV_Pseudo.toLowerCase());
	}
	document.getElementById("coloriser").style.display = "none";
	CLFcolorise();
}

function CLFdefaut() {
	var label = document.getElementById("appercu_couleur");
	CLV_Couleur = (GM_getValue("skin#newlook", 0)) ? Mega_NewLook[label.className] : Mega_Normal[label.className];
	label.style.color = CLFrgb(CLV_Couleur);
	document.getElementById("rgb_red").value = document.getElementById("rgb_red").defaultValue = CLV_Couleur.split("_")[0];
	document.getElementById("rgb_green").value = document.getElementById("rgb_green").defaultValue = CLV_Couleur.split("_")[1];
	document.getElementById("rgb_blue").value = document.getElementById("rgb_blue").defaultValue = CLV_Couleur.split("_")[2];
	document.getElementById("carre_couleur").style.background = CLFrgb(CLV_Couleur);
	CLFbarreColor();
}

function CLFcouleurOn() {
	document.getElementById("appercu_couleur").style.color = CLFrgb(this.id);
	document.getElementById("carre_couleur").style.background = CLFrgb(this.id);
}

function CLFcouleurOut() {
	document.getElementById("appercu_couleur").style.color = CLFrgb(CLV_Couleur);
	document.getElementById("carre_couleur").style.background = CLFrgb(CLV_Couleur);
}

function CLFcouleurLock() {
	CLV_Couleur = this.id;
	document.getElementById("rgb_red").value = document.getElementById("rgb_red").defaultValue = this.id.split("_")[0];
	document.getElementById("rgb_green").value = document.getElementById("rgb_green").defaultValue = this.id.split("_")[1];
	document.getElementById("rgb_blue").value = document.getElementById("rgb_blue").defaultValue = this.id.split("_")[2];
	document.getElementById("carre_couleur").style.background = CLFrgb(CLV_Couleur);
	CLFbarreColor();
}

function CLFouvre() {
	if (GM_getValue("skin#newlook", 0)) {
		var parent = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
		var pseudo = parent.getElementsByTagName("strong")[0];
		CLV_Pseudo = pseudo.innerHTML;
		CLV_Couleur = GM_getValue("color#" + CLV_Pseudo.toLowerCase(), Mega_NewLook[pseudo.className]);
		document.getElementById("appercu_couleur").className = pseudo.className;
	} else {
		var pseudo = this.parentNode.getElementsByTagName("strong")[0];
		CLV_Pseudo = pseudo.innerHTML;
		CLV_Couleur = GM_getValue("color#" + CLV_Pseudo.toLowerCase(), Mega_Normal[pseudo.className]);
		document.getElementById("appercu_couleur").className = pseudo.className;
	}
	document.getElementById("appercu_couleur").innerHTML = CLV_Pseudo;
	document.getElementById("appercu_couleur").style.color = CLFrgb(CLV_Couleur);
	document.getElementById("carre_couleur").style.background = CLFrgb(CLV_Couleur);
	document.getElementById("rgb_red").value = document.getElementById("rgb_red").defaultValue = CLV_Couleur.split("_")[0];
	document.getElementById("rgb_green").value = document.getElementById("rgb_green").defaultValue = CLV_Couleur.split("_")[1];
	document.getElementById("rgb_blue").value = document.getElementById("rgb_blue").defaultValue = CLV_Couleur.split("_")[2];
	document.getElementById("coloriser").style.display = "block";
	CLFbarreColor();
}

function CLFboite(max) {
	var nb = 51;
	var nan = 5;//max / nb;
	for (var i = 0; i < nb; i++) {
		var cadre = document.createElement("img");
			cadre.src = imgVide;
			cadre.id = max + "_" + parseInt(i * nan) + "_0";
			cadre.style.width = "1px";
			cadre.style.height = "16px";
			cadre.style.background = "rgb(" + max + "," + parseInt(i * nan) + ",0)";
			cadre.style.cursor = "crosshair";
			cadre.addEventListener("mouseover", CLFcouleurOn, false);
			cadre.addEventListener("mouseout", CLFcouleurOut, false);
			cadre.addEventListener("click", CLFcouleurLock, false);
		document.getElementById("couleurs").appendChild(cadre);
	}
	for (var i = nb; i > 0; i--) {
		var cadre = document.createElement("img");
			cadre.src = imgVide;
			cadre.id = parseInt(i * nan) + "_" + max + "_0";
			cadre.style.width = "1px";
			cadre.style.height = "16px";
			cadre.style.background = "rgb(" + parseInt(i * nan) + "," + max + ",0)";
			cadre.style.cursor = "crosshair";
			cadre.addEventListener("mouseover", CLFcouleurOn, false);
			cadre.addEventListener("mouseout", CLFcouleurOut, false);
			cadre.addEventListener("click", CLFcouleurLock, false);
		document.getElementById("couleurs").appendChild(cadre);
	}
	for (var i = 0; i < nb; i++) {
		var cadre = document.createElement("img");
			cadre.src = imgVide;
			cadre.id = "0_" + max + "_" + parseInt(i * nan);
			cadre.style.width = "1px";
			cadre.style.height = "16px";
			cadre.style.background = "rgb(0," + max + "," + parseInt(i * nan) + ")";
			cadre.style.cursor = "crosshair";
			cadre.addEventListener("mouseover", CLFcouleurOn, false);
			cadre.addEventListener("mouseout", CLFcouleurOut, false);
			cadre.addEventListener("click", CLFcouleurLock, false);
		document.getElementById("couleurs").appendChild(cadre);
	}
	for (var i = nb; i > 0; i--) {
		var cadre = document.createElement("img");
			cadre.src = imgVide;
			cadre.id = "0_" + parseInt(i * nan) + "_" + max;
			cadre.style.width = "1px";
			cadre.style.height = "16px";
			cadre.style.background = "rgb(0," + parseInt(i * nan) + "," + max + ")";
			cadre.style.cursor = "crosshair";
			cadre.addEventListener("mouseover", CLFcouleurOn, false);
			cadre.addEventListener("mouseout", CLFcouleurOut, false);
			cadre.addEventListener("click", CLFcouleurLock, false);
		document.getElementById("couleurs").appendChild(cadre);
	}
	for (var i = 0; i < nb; i++) {
		var cadre = document.createElement("img");
			cadre.src = imgVide;
			cadre.id = parseInt(i * nan) + "_0" + "_" + max;
			cadre.style.width = "1px";
			cadre.style.height = "16px";
			cadre.style.background = "rgb(" + parseInt(i * nan) + ",0," + max + ")";
			cadre.style.cursor = "crosshair";
			cadre.addEventListener("mouseover", CLFcouleurOn, false);
			cadre.addEventListener("mouseout", CLFcouleurOut, false);
			cadre.addEventListener("click", CLFcouleurLock, false);
		document.getElementById("couleurs").appendChild(cadre);
	}
	for (var i = nb; i > 0; i--) {
		var cadre = document.createElement("img");
			cadre.src = imgVide;
			cadre.id = max + "_0_" + parseInt(i * nan);
			cadre.style.width = "1px";
			cadre.style.height = "16px";
			cadre.style.background = "rgb(" + max + ",0," + parseInt(i * nan) + ")";
			cadre.style.cursor = "crosshair";
			cadre.addEventListener("mouseover", CLFcouleurOn, false);
			cadre.addEventListener("mouseout", CLFcouleurOut, false);
			cadre.addEventListener("click", CLFcouleurLock, false);
		document.getElementById("couleurs").appendChild(cadre);
	}
}

function CLFboutton() {
	if (GM_getValue("skin#newlook", 0)) {
		var td = document.getElementById('col1').getElementsByTagName("td");
		for (var u = 0; td[u]; u++) {
			if (td[u].className == 'lesBoutons') {
				var parent = td[u].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
				var pseudo = parent.getElementsByTagName("strong")[0];
				var color = GM_getValue("color#" + pseudo.innerHTML.toLowerCase(), Mega_NewLook[pseudo.className]);
				pseudo.style.color = CLFrgb(color);
				var img = document.createElement("img");
					img.className = "b_couleur";
					img.title = "Coloriser";
					img.src = btnColoriser;
					img.style.marginRight = "4px";
				var a = document.createElement("a");
					a.style.cursor = "pointer";
					a.addEventListener("click", CLFouvre, false);
				a.appendChild(img);
				td[u].insertBefore(a, td[u].lastChild);
			}
		}
	} else {
		var lis = document.getElementById('col1').getElementsByTagName("li");
		for (var u = 0; lis[u]; u++) {
			if (lis[u].className == 'pseudo') {
				lis[u].getElementsByTagName("img")[0].style.marginRight = "1px";
				var pseudo = lis[u].getElementsByTagName("strong")[0];
				var color = GM_getValue("color#" + pseudo.innerHTML.toLowerCase(), Mega_Normal[pseudo.className]);
				pseudo.style.color = CLFrgb(color);
				var img = document.createElement("img");
					img.className = "b_couleur";
					img.title = "Coloriser";
					img.src = btnColoriser;
					img.style.marginRight = "4px";
				var a = document.createElement("a");
					a.style.cursor = "pointer";
					a.addEventListener("click", CLFouvre, false);
				a.appendChild(img);
				lis[u].appendChild(a);
			}
		}
	}
}

function CLFapercuColor() {
	CLV_Couleur = document.getElementById("rgb_red").value + "_" + document.getElementById("rgb_green").value + "_" + document.getElementById("rgb_blue").value;
	document.getElementById("appercu_couleur").style.color = CLFrgb(CLV_Couleur);
	document.getElementById("carre_couleur").style.background = CLFrgb(CLV_Couleur);
}

function CLFbarreColor() {
	document.getElementById("barre_red").style.left = parseInt(window.innerWidth / 2 - 115) + parseInt(document.getElementById("rgb_red").value) + "px";
	document.getElementById("barre_green").style.left = parseInt(window.innerWidth / 2 - 115) + parseInt(document.getElementById("rgb_green").value) + "px";
	document.getElementById("barre_blue").style.left = parseInt(window.innerWidth / 2 - 115) + parseInt(document.getElementById("rgb_blue").value) + "px";
}

function CLFcheckColor() {
	if (this.value != "") { 
		if (isNaN(parseInt(this.value))) this.value = this.defaultValue;
		else {
			if (this.value > 255) this.value = 255;
			this.value = this.defaultValue = parseInt(this.value);
			CLFapercuColor();
			CLFbarreColor();
		}
	}
}

function CLFdefaultColor() {
	if (this.value == "") {
		switch (this.id) {
			case "rgb_red": this.value = this.defaultValue = CLV_Couleur.split("_")[0];
			case "rgb_green": this.value = this.defaultValue = CLV_Couleur.split("_")[1];
			case "rgb_blue": this.value = this.defaultValue = CLV_Couleur.split("_")[2];
		}
	}
}

function CLFmoveCursor(e) {
	if (CLV_Actif) {
		if (e.clientX < window.innerWidth / 2 - 111) this.firstChild.style.left = window.innerWidth / 2 - 115 + "px";
		else if (e.clientX > window.innerWidth / 2 + 143) this.firstChild.style.left = window.innerWidth / 2 + 140 + "px";
		else this.firstChild.style.left = e.clientX - 4 + "px";
		document.getElementById(this.firstChild.className).value = document.getElementById(this.firstChild.className).defaultValue = parseInt(this.firstChild.style.left.replace("px", "")) - parseInt(window.innerWidth / 2 - 115);
		CLFapercuColor();
	}
}

function CLFclickCursor(e) {
	if (e.clientX < window.innerWidth / 2 - 112) this.firstChild.style.left = window.innerWidth / 2 - 115 + "px";
	else if (e.clientX > window.innerWidth / 2 + 143) this.firstChild.style.left = window.innerWidth / 2 + 140 + "px";
	else this.firstChild.style.left = e.clientX - 4 + "px";
	document.getElementById(this.firstChild.className).value = document.getElementById(this.firstChild.className).defaultValue = parseInt(this.firstChild.style.left.replace("px", "")) - parseInt(window.innerWidth / 2 - 115);
	CLFapercuColor();
}

function ColoriserMain() {
	var cadre = document.createElement("div");
		cadre.id = "coloriser";
		cadre.style.display = "none";
		cadre.style.border = "3px solid rgb(60,60,60)";
		cadre.style.background = "rgb(150,150,150)";
		cadre.style.position = "fixed";
		cadre.style.zIndex = "1";
		cadre.style.left = window.innerWidth / 2 - 150 + "px";
		cadre.style.top = window.innerHeight / 2 - 150 + "px";
	var div = document.createElement("div");
		div.align = "right";
		div.style.background = "rgb(60,60,60)";
	var span = document.createElement("b");
		span.align = "center";
		span.style.color = "#FFF";
		span.style.fontSize = "17px";
		span.style.margin = "0px 75px 0px 0px";
		span.style.display = "block";
		span.innerHTML = "Coloriser un pseudo";
	div.appendChild(span);
	var img = document.createElement("img");
		img.src = "http://www2.noelshack.com/uploads/fermeture033943.png";
		img.title = "Fermer";
		img.style.margin = "-20px 1px 2px 0px";
		img.style.cursor = "pointer";
		img.setAttribute("onclick", "document.getElementById('coloriser').style.display = 'none'");
	div.appendChild(img);
	cadre.appendChild(div);
	
	var table = document.createElement("table");
		table.style.width = "100%";
	var tr = document.createElement("tr");
	var td = document.createElement("td");
		td.style.padding = "8px 0px 0px 5px";
		td.style.width = "25px";
	var img = document.createElement("img");
		img.id = "carre_couleur";
		img.src = imgVide;
		img.style.width = "20px";
		img.style.height = "20px";
	td.appendChild(img);
	tr.appendChild(td);
	var td = document.createElement("td");
		td.style.paddingTop = "8px";
	var span = document.createElement("span");
		span.id = "appercu_couleur";
		span.style.display = "block";
		span.style.width = "98%";
		span.style.textAlign = "center";
		span.style.padding = "2px 0px";
		span.style.fontWeight = "bold";
		span.style.border = "1px inset rgb(150,150,150)";
		span.style.background = "#EFF4FC";
	td.appendChild(span);
	tr.appendChild(td);
	var td = document.createElement("td");
		td.align = "right";
		td.style.paddingTop = "8px";
	var bouton = document.createElement("input");
		bouton.type = "submit";
		bouton.value = "DEFAUT";
		bouton.style.width = "65px";
		bouton.style.fontSize = "9px";
		bouton.style.fontWeight = "bold";
		bouton.style.marginRight = "5px";
		bouton.addEventListener("click", CLFdefaut, false);
	td.appendChild(bouton);
	tr.appendChild(td);
	table.appendChild(tr);
	
	var tr = document.createElement("tr");
	var td = document.createElement("td");
		td.setAttribute("colspan", 2);
		td.style.paddingLeft = "5px";
	var span = document.createElement("b");
		span.innerHTML = "Rouge :";
		span.style.color = "#FFF";
		span.style.marginRight = "4px";
	td.appendChild(span);
	var input = document.createElement("input");
		input.id = "rgb_red";
		input.type = "text";
		input.maxLength = 3;
		input.style.width = "26px";
		input.style.marginRight = "8px";
		input.addEventListener("keyup", CLFcheckColor, false);
		input.addEventListener("change", CLFdefaultColor, false);
	td.appendChild(input);
	var span = document.createElement("b");
		span.innerHTML = "Vert :";
		span.style.color = "#FFF";
		span.style.marginRight = "4px";
	td.appendChild(span);
	var input = document.createElement("input");
		input.id = "rgb_green";
		input.type = "text";
		input.maxLength = 3;
		input.style.width = "26px";
		input.style.marginRight = "8px";
		input.addEventListener("keyup", CLFcheckColor, false);
		input.addEventListener("change", CLFdefaultColor, false);
	td.appendChild(input);
	var span = document.createElement("b");
		span.innerHTML = "Bleu :";
		span.style.color = "#FFF";
		span.style.marginRight = "4px";
	td.appendChild(span);
	var input = document.createElement("input");
		input.id = "rgb_blue";
		input.type = "text";
		input.maxLength = 3;
		input.style.width = "26px";
		input.addEventListener("keyup", CLFcheckColor, false);
		input.addEventListener("change", CLFdefaultColor, false);
	td.appendChild(input);
	tr.appendChild(td);
	
	var td = document.createElement("td");
		td.align = "right";
	var bouton = document.createElement("input");
		bouton.type = "submit";
		bouton.value = "VALIDER";
		bouton.style.width = "65px";
		bouton.style.fontSize = "9px";
		bouton.style.fontWeight = "bold";
		bouton.style.marginRight = "5px";
		bouton.addEventListener("click", CLFvalider, false);
	td.appendChild(bouton);
	tr.appendChild(td);
	table.appendChild(tr);
	cadre.appendChild(table);
	
	var div = document.createElement("div");
		div.id = "couleurs";
		div.style.padding = "1px";
		div.style.borderTop = "3px solid rgb(50,50,50)";
	cadre.appendChild(div);
	
	var div = document.createElement("div");
		div.id = "allcolors";
		div.style.padding = "2px";
		div.style.borderTop = "3px solid rgb(50,50,50)";
	
	var span = document.createElement("b");
		span.innerHTML = "R :";
		span.style.color = "white";
		span.style.margin = "0px 5px";
		span.style.display = "inline";
	var divR = document.createElement("div");
		divR.style.width = "262px";
		divR.style.height = "12px";
		divR.style.background = "url(http://www.noelshack.com/up/aac/blanc-a13c0f5d61.png) no-repeat center center";
		divR.style.margin = "-13px 0px 4px 30px";
		divR.addEventListener("mousemove", CLFmoveCursor, true);
		divR.addEventListener("click", CLFclickCursor, true);
	var divC = document.createElement("div");
		divC.id = "barre_red";
		divC.className = "rgb_red";
		divC.style.background = "rgb(45,58,77)";
		divC.style.height = "12px";
		divC.style.width = "7px";
		divC.style.position = "fixed";
		divC.addEventListener("mousedown", function() { CLV_Actif = true; }, true);
		divC.addEventListener("mouseup", function() { CLV_Actif = false; }, true);
	divR.appendChild(divC);
	div.appendChild(span);
	div.appendChild(divR);
	
	var span = document.createElement("b");
		span.innerHTML = "V :";
		span.style.color = "white";
		span.style.margin = "0px 5px";
		span.style.display = "inline";
	var divR = document.createElement("div");
		divR.style.width = "262px";
		divR.style.height = "12px";
		divR.style.background = "url(http://www.noelshack.com/up/aac/blanc-a13c0f5d61.png) no-repeat center center";
		divR.style.margin = "-13px 0px 4px 30px";
		divR.addEventListener("mousemove", CLFmoveCursor, true);
		divR.addEventListener("click", CLFclickCursor, true);
	var divC = document.createElement("div");
		divC.id = "barre_green";
		divC.className = "rgb_green";
		divC.style.background = "rgb(45,58,77)";
		divC.style.height = "12px";
		divC.style.width = "7px";
		divC.style.position = "fixed";
		divC.addEventListener("mousedown", function() { CLV_Actif = true; }, true);
		divC.addEventListener("mouseup", function() { CLV_Actif = false; }, true);
	divR.appendChild(divC);
	div.appendChild(span);
	div.appendChild(divR);
	
	var span = document.createElement("b");
		span.innerHTML = "B :";
		span.style.color = "white";
		span.style.margin = "0px 5px";
		span.style.display = "inline";
	var divR = document.createElement("div");
		divR.style.width = "262px";
		divR.style.height = "12px";
		divR.style.background = "url(http://www.noelshack.com/up/aac/blanc-a13c0f5d61.png) no-repeat center center";
		divR.style.margin = "-13px 0px 4px 30px";
		divR.addEventListener("mousemove", CLFmoveCursor, true);
		divR.addEventListener("click", CLFclickCursor, true);
	var divC = document.createElement("div");
		divC.id = "barre_blue";
		divC.className = "rgb_blue";
		divC.style.background = "rgb(45,58,77)";
		divC.style.height = "12px";
		divC.style.width = "7px";
		divC.style.position = "fixed";
		divC.addEventListener("mousedown", function() { CLV_Actif = true; }, true);
		divC.addEventListener("mouseup", function() { CLV_Actif = false; }, true);
	divR.appendChild(divC);
	div.appendChild(span);
	div.appendChild(divR);
	
	cadre.appendChild(div);
	
	document.getElementById("col1").appendChild(cadre);

	CLFboite(255);
	CLFboutton();
}

function Coloriser() {
	if (mode != 0) ColoriserMain();
}
} //----- Fin Coloriser -----//

{ //----- Ignorer ----- //
var IV_Liste = new Array();

function IFtraitement() {
	var pseudo;
	if (GM_getValue("skin#newlook", 0)) {
		var parent = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
		pseudo = parent.getElementsByTagName("strong")[0].innerHTML;
		pseudo = pseudo.toLowerCase();
	} else {
		pseudo = this.parentNode.getElementsByTagName("strong")[0].innerHTML;
		pseudo = pseudo.toLowerCase();
	}
	var indice = -1;
	for (var i = 0; i < IV_Liste.length; i++) {
		if (IV_Liste[i] == pseudo) indice = i;
	}
	if (indice == -1) {
		IV_Liste.push(pseudo);
		GM_setValue("I#ignore", IV_Liste.join());
		IFboutons();
	} else {
		IV_Liste.splice(indice, 1);
		if (IV_Liste.length < 0) GM_setValue("I#ignore", IV_Liste.join());
		else GM_deleteValue("I#ignore");
		self.location.reload();
	}
}

function IFboutons() {
	if (GM_getValue("skin#newlook", 0)) {
		var td = document.getElementById('col1').getElementsByTagName("td");
		for (var u = 0; u < td.length; u++) {
			if (td[u].className == 'lesBoutons') {
				var parent = td[u].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
				var pseudo = parent.getElementsByTagName("strong")[0].innerHTML;
				var post = parent.getElementsByTagName("li")[0];
				var ignore = false;
				for (var i = 0; i < IV_Liste.length; i++) {
					if (IV_Liste[i] == pseudo.toLowerCase()) ignore = true;
				}
				var aru = -1;
				var imgs = td[u].getElementsByTagName("img");
				for (var i = 0; i < imgs.length; i++) {
					if (imgs[i].className == "b_ignorer") aru = i;
				}
				var img = (aru > -1) ? imgs[aru] : document.createElement("img");
					img.className = "b_ignorer";
					img.title = ignore ? "Voir" : "Ignorer";
					img.src = ignore ? btnVoir : btnIgnorer;
					img.style.marginRight = "4px";
				if (aru == -1) {
					var a = document.createElement("a");
						a.style.cursor = "pointer";
						a.addEventListener("click", IFtraitement, false);
						a.appendChild(img);
					td[u].insertBefore(a, td[u].lastChild);
				}
				if (ignore) post.innerHTML = "<i>Ce pseudo est ignoré.</i>";
			}
		}
	} else {
		var lis = document.getElementById('col1').getElementsByTagName("li");
		for (var u = 0; u < lis.length; u++) {
			if (lis[u].className == 'pseudo') {
				lis[u].getElementsByTagName("img")[0].style.marginRight = "1px";
				var pseudo = lis[u].getElementsByTagName("strong")[0].innerHTML;
				var parent = lis[u].parentNode;
				var post = parent.getElementsByTagName("li")[2];
				var ignore = false;
				for (var i = 0; i < IV_Liste.length; i++) {
					if (IV_Liste[i] == pseudo.toLowerCase()) ignore = true;
				}
				var aru = -1;
				var imgs = lis[u].getElementsByTagName("img");
				for (var i = 0; i < imgs.length; i++) {
					if (imgs[i].className == "b_ignorer") aru = i;
				}
				var img = (aru > -1) ? imgs[aru] : document.createElement("img");
					img.className = "b_ignorer";
					img.title = ignore ? "Voir" : "Ignorer";
					img.src = ignore ? btnVoir : btnIgnorer;
					img.style.marginRight = "4px";
				if (aru == -1) {
					var a = document.createElement("a");
						a.style.cursor = "pointer";
						a.addEventListener("click", IFtraitement, false);
						a.appendChild(img);
					lis[u].appendChild(a);
				}
				if (ignore) post.innerHTML = "<i>Ce pseudo est ignoré.</i>";
			}
		}
	}
}

function Ignorer() {
	if (mode != 0) {
		var lst = GM_getValue("I#ignore", "");
		if (lst != "") IV_Liste = lst.split(",");
		IFboutons();
	}
}
} //----- Fin Ignorer -----//

{ //----- Recherche ----- //
var RV_NomForum;
var RV_NomTopic;
var RV_NbPages;
var RV_Url;
var RV_Stop = true;
var RV_Ordre = false;

function RFextraire(content) {
   temp = content.toLowerCase();
   var x = temp.indexOf("<div id=\"col1\">");
   if (x == -1) return "";

   var y = temp.lastIndexOf("<div id=\"col2\">");
   if (y == -1) y = temp.lastIndexOf("</html>");
   if (y == -1) y = content.length;

   return content.slice(x, y);   
}

function RFenvoi() {
	/*var p = document.getElementsByTagName("p");
	var stop = true;
	for (var i = 0; i < p.length && stop; i++) {
		if (p[i].className == "pagination") {
			var a = p[i].getElementsByTagName("a");
			// Le nombre de pages
			if (p[i].lastChild.innerHTML == "»") GM_setValue("R#nb_pages", a[a.length - 2].innerHTML);
			else GM_setValue("R#nb_pages", p[i].lastChild.innerHTML);
			stop = false;
		}
	}*/
	// Le nombre de pages
	GM_setValue("R#nb_pages", nbPagesTopic);
	// Le titre du forum
	GM_setValue("R#nom_forum", document.getElementById("col1").innerHTML.match(/<h3><span class=\"txt\">[^"]+<\/span>([^"]+)<\/h3>/)[1]);
	// Le titre du topic
	GM_setValue("R#nom_topic", document.getElementById("col1").innerHTML.match(/<h4 class=\"sujet\"><span>[^"]+<\/span>([^"]+)<\/h4>/)[1]);
	// L'url du topic
	GM_setValue("R#url", window.location.href);
	// On ouvre la page de recherche
	window.open("http://www.jeuxvideo.com/forums/Recherche", "recherche");
}

function RFverification(o, v) {
	switch (v) {
		case "pseudo":
			var pseudo = o.getElementsByTagName("strong")[0].innerHTML.toLowerCase();
			var pseudoE = document.getElementById("pseudo").value.toLowerCase();
			if (pseudo.match(pseudoE)) return true; else return false;
			break;
		case "post":
			var post = o.getElementsByTagName("li")[2].innerHTML.toLowerCase();
				post = post.replace(/ ?<img src="[^"]+" alt="([^"]+)" ?\/?> ?/gi, " $1 ");
				post = post.replace(/<a href="([^"]+)" target="_blank">[^"]+<\/a>/gi, "$1");
				post = post.replace(/<br>/g, "\n");
			var postE = document.getElementById("post").value.toLowerCase();
			if (post.match(postE)) return true; else return false;
			break;
	}
}

function RFdonneesCorrectes() {
	if (document.getElementById("tfpseudo").checked) { // Pseudo
		var x = document.getElementById("pseudo").value;
		if (x == null || x == "" || x.length < 3) {
			alert("La valeur entrée dans le champs du pseudo est incorrecte (3 caractères minimum).");
			document.getElementById("pseudo").focus();
			return false;
		}
	}
	if (document.getElementById("tfpost").checked) { // Message
		var x = document.getElementById("post").value;
		if (x == null || x == "" || x.length < 3) {
			alert("La valeur entrée dans le champs du message est incorrecte (3 caractères minimum).");
			document.getElementById("post").focus();
			return false;
		}
	}
	if (document.getElementById("tfbornes").checked) { // Bornes
		// Si la valeur de départ et supérieur à celle d'arrivée, on les inverse
		var x = 0;
		if (parseInt(document.getElementById("borneMin").value) > parseInt(document.getElementById("borneMax").value)) {
			x = document.getElementById("borneMin").value;
			document.getElementById("borneMin").value = document.getElementById("borneMax").value;
			document.getElementById("borneMax").value = x;
		}
		// Les valeurs doivent être comprises entre 1 et le nombre de pages du topic
		var y = parseInt(document.getElementById("borneMin").value); // Valeur de départ
		if (y == null || y == "" || y < 1 || y > parseInt(RV_NbPages)) {
			alert("La borne de départ est incorrecte.");
			document.getElementById("borneMin").focus();
			return false;
		}
		var z = parseInt(document.getElementById("borneMax").value); // Valeur d'arrivée
		if (z == null || z == "" || z < 1 || z > parseInt(RV_NbPages)) {
			alert("La borne d'arrivée est incorrecte.");
			document.getElementById("borneMax").focus();
			return false;
		}
	}
	if (!document.getElementById("tfpseudo").checked && !document.getElementById("tfpost").checked) return false;
	return true;
}

function RFchargement(indice, depart, fin, ordre) {
	var url = RV_Url;
	var x = url.split("-");
	if (ordre) x[3] = parseInt(fin) - parseInt(indice);
	else x[3] = parseInt(indice) + parseInt(depart);
	url = x.join().toString().replace(/,/g, "-");
	req = new XMLHttpRequest();
	req.open("GET", url, false);
	req.send(null);
	document.getElementById('displayed').innerHTML = RFextraire(req.responseText); // On intègre le contenu récupéré
	req.abort();
}

function RFcalculTemps(x, y) {
	var xS = x.getSeconds();
	var xM = x.getMinutes();
	var xH = x.getHours();
	var yS = y.getSeconds();
	var yM = y.getMinutes();
	var yH = y.getHours();
	
	var secondes = yS - xS;
	if (secondes < 0) { secondes += 60; yM--; }
	if (yM < 0) yM += 60;
	var minutes = yM - xM;
	if (minutes < 0) { minutes += 60; yH--; }
	if (yH < 0) yH += 24;
	var heures = yH - xH;
	
	var phrase = "Recherche effectuée en ";
	if (heures != 0) {
		phrase += (heures > 1) ? heures + " heures" : heures + " heure";
		if (minutes != 0) {
			phrase += (minutes > 1) ? ", " + minutes + " minutes" : ", " + minutes + " minute";
			if (secondes != 0) {
				phrase += (secondes > 1) ? " et " + secondes + " secondes." : " et " + secondes + " seconde.";
			} else {
				phrase += ".";
			}
		} else {
			if (secondes != 0) {
				phrase += (secondes > 1) ? " et " + secondes + " secondes." : " et " + secondes + " seconde.";
			} else {
				phrase += ".";
			}
		}
	} else {
		if (minutes != 0) {
			phrase += (minutes > 1) ? minutes + " minutes" : minutes + " minute";
			if (secondes != 0) {
				phrase += (secondes > 1) ? " et " + secondes + " secondes." : " et " + secondes + " seconde.";
			} else {
				phrase += ".";
			}
		} else {
			if (secondes != 0) {
				phrase += (secondes > 1) ? secondes + " secondes." : secondes + " seconde.";
			} else {
				phrase += "moins d'une seconde.";
			}
		}
	}
	
	return phrase;
}

function RFrecherche() {
	if (RFdonneesCorrectes()) {
		// On remet l'affichage à 0
		document.getElementById("found").style.display = "none";
		document.getElementById("bide").style.display = "none";
		document.getElementById("complement").style.display = "none";
		document.getElementById("resultsHead").style.display = "none";
		document.getElementById("results").style.display = "none";
		document.getElementById("results").innerHTML = "";
		document.getElementById("wait").style.display = "block";
		// Initialisation
		var tblResults = new Array();
		var nbPages;
		var premierePage;
		var dernierePage;
		var nbPosts = 0;
		var nbPagesParcourues = 0;
		var ordre = (document.getElementById("tfbornes").checked) ? RV_Ordre : false;
		RV_Stop = false;
		// On vérifie si la recherche est limitée oopas
		if (document.getElementById("tfbornes").checked) {
			premierePage = document.getElementById("borneMin").value;
			dernierePage = document.getElementById("borneMax").value;
			nbPages = dernierePage - premierePage + 1;
		} else {
			premierePage = 1;
			dernierePage = nbPages = RV_NbPages;
		}
		// On parcourt les pages
		document.getElementById('infos').innerHTML = "Balayage des pages....";
		var debut = new Date;
		for (var u = 0; u < nbPages && !RV_Stop; u++) {
			var un = 100 / nbPages;
			var rouge = un * (u + 1);
			var noir = 100 - rouge;
			document.getElementById('infos').innerHTML = "Balayage des pages.... (" + (u + 1) + "/" + nbPages + ")";
			document.getElementById('rouge').style.width = rouge + "px";
			document.getElementById('noir').style.width = noir + "px";
			RFchargement(u, premierePage, dernierePage, ordre);
			var message = document.getElementById("displayed").getElementsByTagName("div");
			if (ordre) {
				for (var i = message.length; i > 0; i--) {
					if (message[i - 1].id.match("message_")) {
						nbPosts++;
						var verif = false;
						if (document.getElementById("tfpseudo").checked) {
							if (RFverification(message[i - 1], "pseudo")) verif = true;
						}
						if (document.getElementById("tfpost").checked) {
							if (RFverification(message[i - 1], "post")) verif = true;
						}
						if (verif) {
							tblResults.push(message[i - 1]);
							document.getElementById('found').style.display = "inline";
							document.getElementById('found').innerHTML = "Nombre de messages récupérés : " + tblResults.length + "<br>";
						}
					}
				}

			} else {
				for (var i = 0; i < message.length; i++) {
					if (message[i].id.match("message_")) {
						nbPosts++;
						var verif = false;
						if (document.getElementById("tfpseudo").checked) {
							if (RFverification(message[i], "pseudo")) verif = true;
						}
						if (document.getElementById("tfpost").checked) {
							if (RFverification(message[i], "post")) verif = true;
						}
						if (verif) {
							tblResults.push(message[i]);
							document.getElementById('found').style.display = "inline";
							document.getElementById('found').innerHTML = "Nombre de messages récupérés : " + tblResults.length + "<br>";
						}
					}
				}
			}
			nbPagesParcourues++;
		}
		var fin = new Date;
		// On remet la barre de chargement à 0
		document.getElementById('displayed').innerHTML = "";
		document.getElementById('rouge').style.width = "0px";
		document.getElementById('noir').style.width = "100px";
		if (tblResults.length > 0) {
			// On met en page les résultats
			document.getElementById('infos').innerHTML = "Mise en page des résultats";
			for (var i = 0; i < tblResults.length; i++) {
				var un = 100 / tblResults.length;
				var rouge = un * (i + 1);
				var noir = 100 - rouge;
				document.getElementById('rouge').style.width = rouge + "px";
				document.getElementById('noir').style.width = noir + "px";
				document.getElementById("results").appendChild(tblResults[i]);
			}
		}
		RV_Stop = true;
		// Informations sur la recherche
		document.getElementById("nb_pages_topic").innerHTML = "Nombre de pages analysées : " + nbPagesParcourues;
		document.getElementById("nb_posts_topic").innerHTML = "Nombre de messages analysés : " + nbPosts;
		document.getElementById("nb_posts_trouves").innerHTML = "Nombre de messages récupérés : " + tblResults.length;
		document.getElementById("tps_recherche").innerHTML = RFcalculTemps(debut, fin);
		// Gestion de l'affichage
		document.getElementById("wait").style.display = "none";
		document.getElementById("complement").style.display = "block";
		if (tblResults.length > 0) {
			document.getElementById("resultsHead").style.display = "block";
			document.getElementById("results").style.display = "block";
		} else document.getElementById("bide").style.display = "block";
	}
}

function RFarretPrecoce() {
	RV_Stop = true;
}

function RFchangerOrdre() {
	if (RV_Stop) {
		if (RV_Ordre) {
			RV_Ordre = false;
			document.getElementById("tfbornes").checked = true;
			this.innerHTML = "=>";
		} else {
			RV_Ordre = true;
			document.getElementById("tfbornes").checked = true;
			this.innerHTML = "<=";
		}
	}
}

function RechercheButton() {
// On ajoute le bouton de recherche
var td = document.getElementsByTagName("td");
for (var i = 0; i < td.length; i++) {
	if (td[i].className == "moder") {
		var img = document.createElement("img");
			img.src = "http://www.noelshack.com/voir/130309/bt_forum_repondre037607.png";
			img.alt = "Rechercher";
		var a = document.createElement("a");
			a.addEventListener("click", RFenvoi, false);
			a.style.cursor = "pointer";
			a.appendChild(img);
		td[i].appendChild(a);
	}
}
}

function Recherche() {
	// On ajoute un lien vers une feuille de css du site
	document.getElementsByTagName("head")[0].innerHTML += "<link href='http://www.jeuxvideo.com/css/defaut/forums.css' rel='stylesheet' type='text/css' />";
	document.title = "Module de recherche de posts";
	// On récupère les valeurs envoyées
	RV_NomForum = GM_getValue("R#nom_forum", "Problème résolution nom forum");
	RV_NomTopic = GM_getValue("R#nom_topic", "Problème résolution nom topic");
	RV_NbPages = GM_getValue("R#nb_pages", 0);
	RV_Url = GM_getValue("R#url", "0");
	// On récupère la partie centrale de la page
	var obj = document.getElementById("col1");
		obj.innerHTML = "";
	// On crée le bloc titre, forum, topic **************************
	var divHaut = document.createElement("div");
		divHaut.style.border = "1px solid";
		divHaut.style.marginTop = "5px";
	// Titre
	var div = document.createElement("div");
		div.style.background = "#999";
		div.align = "center";
	var span = document.createElement("b");
		span.style.fontSize = "20px";
		span.style.fontFamily = "Lucida";
		span.style.color = "#FFF";
		span.innerHTML = "Module de recherche de posts";
	div.appendChild(span);
	divHaut.appendChild(div);
	// Forum
	var div = document.createElement("div");
		div.style.background = "#EFF4FC";
		div.style.padding = "3px 0px";
		div.align = "center";
	var span = document.createElement("b");
		span.style.fontSize = "16px";
		span.style.fontFamily = "Times New Roman";
		span.innerHTML = RV_NomForum;
	div.appendChild(span);
	divHaut.appendChild(div);
	// Topic
	var div = document.createElement("div");
		div.style.background = "#F9F9F9";
		div.style.padding = "2px 0px";
		div.align = "center";
	var span = document.createElement("span");
		span.style.fontSize = "14px";
		span.style.fontFamily = "Lucida";
		span.innerHTML = RV_NomTopic;
	div.appendChild(span);
	divHaut.appendChild(div);
	obj.appendChild(divHaut);
	// Fin du bloc titre, forum, topic -----------------------------------
	obj.appendChild(document.createElement("br"));
	obj.appendChild(document.createElement("br"));
	// Début formulaire de recherche ***********************
	// Titre
	var div = document.createElement("div");
		div.style.paddingLeft = "10px";
		div.style.background = "url(http://image.jeuxvideo.com/css_img/defaut/bloc_forum_h3.png) right top";
	var span = document.createElement("b");
		span.style.color = "#FFF";
		span.style.fontSize = "17px";
		span.style.fontVariant = "small-caps";
		span.innerHTML = "Formulaire";
	div.appendChild(span);
	obj.appendChild(div);
	// Pseudo
	var div = document.createElement("div");
		div.style.border = "1px solid rgb(153,204,0)";
		div.align = "left";
		div.style.padding = "10px";
	var checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.id = "tfpseudo";
		checkbox.style.marginRight = "5px";
	var input = document.createElement("input");
		input.type = "text";
		input.id = "pseudo";
		input.maxLength = "15";
		input.style.fontSize = "12px";
		input.style.marginBottom = "5px";
	var b = document.createElement("b");
		b.style.fontSize = "12px";
		b.style.marginRight = "10px";
		b.innerHTML = "Pseudo :";
	div.appendChild(checkbox);
	div.appendChild(b);
	div.appendChild(input);
	// Bornes
	var checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.id = "tfbornes";
		checkbox.style.marginRight = "5px";
		checkbox.style.marginLeft = "100px";
	var input = document.createElement("input");
		input.type = "text";
		input.id = "borneMin";
		input.value = "1";
		input.maxLength = "15";
		input.style.width = "40px";
		input.style.fontSize = "12px";
		input.style.marginBottom = "5px";
	var b = document.createElement("b");
		b.style.fontSize = "12px";
		b.style.marginRight = "10px";
		b.innerHTML = "Bornes :";
	div.appendChild(checkbox);
	div.appendChild(b);
	div.appendChild(input);
	var input = document.createElement("input");
		input.type = "text";
		input.id = "borneMax";
		input.value = RV_NbPages;
		input.maxLength = "15";
		input.style.width = "40px";
		input.style.fontSize = "12px";
		input.style.marginBottom = "5px";
	var b = document.createElement("span");
		b.id = "ordre";
		b.title = "Changer le sens de la recherche";
		b.style.cursor = "pointer";
		b.style.fontSize = "14px";
		b.style.margin = "0px 10px";
		b.innerHTML = "=>";
		b.addEventListener("click", RFchangerOrdre, false);
	div.appendChild(b);
	div.appendChild(input);
	div.appendChild(document.createElement("br"));
	// Message
	var textarea = document.createElement("textarea");
		textarea.id = "post";
	var b = document.createElement("b");
		b.style.fontSize = "12px";
		b.innerHTML = "Message :<br>";
	var checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.id = "tfpost";
		checkbox.style.marginRight = "5px";
	div.appendChild(checkbox);
	div.appendChild(b);
	div.appendChild(textarea);
	// Bouton de recherche
	var img = document.createElement("img");
		img.title = "Lancer la recherche";
		img.style.marginTop = "5px";
		img.style.cursor = "pointer";
		img.src = "http://image.jeuxvideo.com/pics/recherche_bt_valider.gif";
		img.addEventListener("click", RFrecherche, false);
	div.appendChild(img);
	obj.appendChild(div);
	// Fin formulaire de recherche --------------------------------------------
	// La partie qui reçoit les pages chargées
	var div = document.createElement("div");
		div.id = "displayed";
		div.style.display = "none";
	obj.appendChild(div);
	// La partie de chargement et d'attente ********************
	var div = document.createElement("div");
		div.id = "wait";
		div.align = "center";
		div.style.display = "none";
		div.style.marginTop = "20px";
		div.style.padding = "10px";
		div.style.border = "1px solid";
	var b = document.createElement("b");
		b.id = "infos";
		b.style.fontSize = "12px";
		b.innerHTML = "Traitement";
	div.appendChild(b);
	div.appendChild(document.createElement("br"));
	var b = document.createElement("b");
		b.id = "found";
		b.style.fontSize = "12px";
		b.style.display = "none";
		b.innerHTML = "";
	div.appendChild(b);
	//div.appendChild(document.createElement("br"));
	var img = document.createElement("img");
		img.id = "rouge";
		img.src = "http://www.noelshack.com/voir/130309/barre087246.jpg";
		img.style.height = "10px";
		img.style.width = "0px";
	div.appendChild(img);
	var img = document.createElement("img");
		img.id = "noir";
		img.src = "http://www.noelshack.com/voir/130309/barre002928.jpg";
		img.style.height = "10px";
		img.style.width = "100px";
	div.appendChild(img);
	div.appendChild(document.createElement("br"));
	var btn = document.createElement("div");
		btn.innerHTML = "ABREGER LA RECHERCHE";
		btn.style.color = "#FFF";
		btn.style.fontFamily = "Tahoma";
		btn.style.fontSize = "10px";
		btn.style.fontWeight = "bold";
		btn.style.display = "block";
		btn.style.marginTop = "4px";
		btn.style.padding = "1px 0px";
		btn.style.width = "174px";
		btn.style.height = "13px";
		btn.style.cursor = "pointer";
		btn.style.background = "url(http://www2.noelshack.com/uploads/btn2035777.png) left top";
		btn.setAttribute("onmouseover", "this.style.backgroundPosition = 'left bottom'");
		btn.setAttribute("onmouseout", "this.style.backgroundPosition = 'left top'");
		btn.addEventListener("click", RFarretPrecoce, false);
	div.appendChild(btn);
	obj.appendChild(div);
	// Fin partie de chargement et d'attente -------------------------------------
	// La partie des informations sur la recherche *****************
	var div = document.createElement("div");
		div.id = "complement";
		div.align = "center";
		div.style.display = "none";
		div.style.marginTop = "20px";
		div.style.padding = "10px";
		div.style.border = "1px solid";
	// Nombre de pages analysées
	var b = document.createElement("b");
		b.id = "nb_pages_topic";
		b.style.fontSize = "12px";
	div.appendChild(b);
	div.appendChild(document.createElement("br"));
	// Nombre de posts analysés
	var b = document.createElement("b");
		b.id = "nb_posts_topic";
		b.style.fontSize = "12px";
	div.appendChild(b);
	div.appendChild(document.createElement("br"));
	// Nombre de posts récupérés
	var b = document.createElement("b");
		b.id = "nb_posts_trouves";
		b.style.fontSize = "12px";
	div.appendChild(b);
	div.appendChild(document.createElement("br"));
	// Temps de la recherche
	var b = document.createElement("b");
		b.id = "tps_recherche";
		b.style.fontSize = "12px";
	div.appendChild(b);
	obj.appendChild(div);
	// Fin partie des informations sur la recherche -----------------------------
	// La partie qui affiche les résultats ***********************
	var div = document.createElement("div");
		div.id = "resultsHead";
		div.style.paddingLeft = "10px";
		div.style.marginTop = "20px";
		div.style.display = "none";
		div.style.background = "url(http://image.jeuxvideo.com/css_img/defaut/bloc_forum_h3.png) right top";
	// Titre
	var span = document.createElement("b");
		span.style.fontSize = "17px";
		span.style.fontVariant = "small-caps";
		span.style.color = "#FFF";
		span.innerHTML = "Résultats de la recherche";
	div.appendChild(span);
	obj.appendChild(div);
	// Résultats
	var div = document.createElement("div");
		div.id = "results";
		div.style.padding = "5px 10px 0px 5px";
		div.style.maxHeight = "600px";
		div.style.overflow = "auto";
		div.style.border = "1px solid rgb(153,204,0)";
		div.style.display = "none";
		div.innerHTML = "";
	obj.appendChild(div);
	// Fin partie qui affiche les résultats ------------------------------------
	// Résultat bidesque
	var div = document.createElement("div");
		div.id = "bide";
		div.align = "center";
		div.style.display = "none";
		div.style.padding = "20px";
	var img = document.createElement("img");
		img.src = "http://www.noelshack.com/voir/130309/49037191.png";
	div.appendChild(img);
	obj.appendChild(div);
}
} //----- Fin Recherche -----//

{ //----- EasySmiley ----- //
function ESFpassCode() {
	var idField = "newmessage";
	var code = this.title;
	var oField = document.getElementById(idField);
	var contenu = oField.value;
	var text = "";
	if (document.selection && document.selection.createRange) {
		var textarea = document.getElementById(idField);
		textarea.focus();
		sel = document.selection.createRange();
		sel.text = " " + code + " ";
	} else {
		if (typeof(oField.selectionStart) == "number" && typeof(oField.selectionEnd) == "number") {
			if ((contenu.length == 0) || (contenu == "Ne postez pas d'insultes, évitez les majuscules, faites une recherche avant de poster pour voir si la question n'a pas déjà été posée...\n\nTout message d'incitation au piratage est strictement interdit et sera puni d'un bannissement.") || (contenu == "Ne postez pas d'insultes, évitez les majuscules, faites une recherche avant de poster pour voir si la question n'a pas déjà été posée...\r\n\r\nTout message d'incitation au piratage est strictement interdit et sera puni d'un bannissement.")) text = code;
			else {
				deb = oField.selectionStart;
				objectValueDeb = contenu.substring(0, deb);
				objectValueFin = contenu.substring(deb, oField.textLength);
				text = objectValueDeb + " " + code + " " + objectValueFin;
			}
			document.getElementById(idField).value = text;
		}
	}
}

function ESFaffiche() {
	var obj = document.getElementById("displayed_easysmiley");
	obj.style.display = (obj.style.display == "none") ? "block" : "none";
}

function ESFmain() {
	var obj = document.getElementById("col1");
	var div = document.createElement("div");
		div.id = "displayed_easysmiley";
		div.style.position = "absolute";
		div.style.left = "655px";
		div.style.display = "none";
		div.style.zIndex = 3;
		div.style.paddingTop = 0;
	var plus = (mode == 0) ? 50 : 0;
	if (GM_getValue("extra#pseudos", 0)) div.style.marginTop = plus - 32 + "px";
	else if (document.getElementById("mdpasse")) div.style.marginTop = plus + 21 + "px";
	else if (mode == 0) div.style.marginTop = plus + "px";
	var a = obj.getElementsByTagName("a");
	for (var i = 0; i < a.length; i++) {
		if (a[i].name == "form_post") obj.insertBefore(div, a[i]);
	}
	
	var table = document.createElement("table");
		table.style.width = "100%";
	var td = document.createElement("td");
		td.align = "left";
	var tr = document.createElement("tr");
		tr.appendChild(td);
	var img = document.createElement("img");
		img.alt = "";
		img.title = "Ouvrir le panneau de smileys";
		if (GM_getValue("extra#milieu", 0)) img.src = "http://www.noelshack.com/up/aac/11-1af6127623.gif";
		else img.src = "http://image.jeuxvideo.com/smileys_img/11.gif";
		img.style.cursor = "pointer";
		img.addEventListener("click", ESFaffiche, false);
	var td = document.createElement("td");
		td.align = "right";
		td.appendChild(img);
	tr.appendChild(td);
	table.appendChild(tr);
	var p = obj.getElementsByTagName("p");
	for (var i = 0; i < p.length; i++) {
		if (p[i].className == "message") {
			var tete = p[i].getElementsByTagName("label")[0];
			p[i].insertBefore(table, tete);
			table.getElementsByTagName("td")[0].appendChild(tete);
		}
	}
	
	var table = document.createElement("table");
		table.setAttribute("cellpadding", 0);
		table.setAttribute("cellspacing", 0);
		table.style.textAlign = "center";
		table.style.width = "300px";
		table.style.height = "340px";
	if (GM_getValue("extra#milieu", 0)) table.style.padding = "10px 22px 10px 10px";
	else table.style.padding = "10px 10px 10px 22px";
	if (GM_getValue("extra#milieu", 0)) table.style.background = "url(http://www.noelshack.com/up/aac/fond047017-130af43773.png) no-repeat";
	else table.style.background = "url(http://www.noelshack.com/uploads/fond047017.png) no-repeat";
	var td = document.createElement("tr");
	var minTable = document.createElement("table");
		minTable.style.width = "100%";
	var minTr = document.createElement("tr");
	var a = 0;
	for (var i = 0; i < 48; i++) {
			var img = document.createElement("img");
				img.src = Jvc_smiley[i][1];
				img.title = Jvc_smiley[i][2];
				img.alt = Jvc_smiley[i][2];
				img.style.cursor = "pointer";
				img.addEventListener("click", ESFpassCode, true);
			var minTd = document.createElement("td");
				minTd.appendChild(img);
			minTr.appendChild(minTd);
			a++;
			if (a == 12) {
				minTable.appendChild(minTr);
				minTr = document.createElement("tr");
				a = 0;
			}
	}
	td.appendChild(minTable);
	var minTable = document.createElement("table");
		minTable.style.width = "100%";
	var minTr = document.createElement("tr");
	for (var i = 48; i < 56; i++) {
			var img = document.createElement("img");
				img.src = Jvc_smiley[i][1];
				img.title = Jvc_smiley[i][2];
				img.alt = Jvc_smiley[i][2];
				img.style.cursor = "pointer";
				img.addEventListener("click", ESFpassCode, true);
			var minTd = document.createElement("td");
				minTd.appendChild(img);
			minTr.appendChild(minTd);
	}
	minTable.appendChild(minTr);
	td.appendChild(minTable);
	var minTable = document.createElement("table");
		minTable.style.width = "100%";
	var minTr = document.createElement("tr");
	a = 0;
	for (var i = 56; i < 68; i++) {
			var img = document.createElement("img");
				img.src = Jvc_smiley[i][1];
				img.title = Jvc_smiley[i][2];
				img.alt = Jvc_smiley[i][2];
				img.style.cursor = "pointer";
				img.addEventListener("click", ESFpassCode, true);
			var minTd = document.createElement("td");
				minTd.appendChild(img);
			minTr.appendChild(minTd);
			a++;
			if (a == 4) {
				minTable.appendChild(minTr);
				minTr = document.createElement("tr");
				a = 0;
			}
	}
	td.appendChild(minTable);
	var minTable = document.createElement("table");
		minTable.style.width = "100%";
	var minTr = document.createElement("tr");
	for (var i = 68; i < 71; i++) {
			var img = document.createElement("img");
				img.src = Jvc_smiley[i][1];
				img.title = Jvc_smiley[i][2];
				img.alt = Jvc_smiley[i][2];
				img.style.cursor = "pointer";
				img.addEventListener("click", ESFpassCode, true);
			var minTd = document.createElement("td");
				minTd.appendChild(img);
			minTr.appendChild(minTd);
	}
	minTable.appendChild(minTr);
	td.appendChild(minTable);
	var tr = document.createElement("tr");
		tr.appendChild(td);
	table.appendChild(tr);
	
	document.getElementById("displayed_easysmiley").appendChild(table);
}

function EasySmiley() {
	if (mode == 0 & index == 0 || mode == 3) ESFmain();
}
} //----- Fin EasySmiley -----//

{ // ----- Regroupement ----- //
var RGV_Liste = new Array();
var RGV_Id;

function RGFformat(code) {
	var x = code;
		x = x.replace(/\[/g, "#1");
		x = x.replace(/\]/g, "#2");
	return x;
}

function RGFsupprimerPsd() {
	var rgp = this.alt.split("|")[0];
	var psd = this.alt.split("|")[1];
	var liste = RGV_Liste[rgp][1].split(" ");
		liste.splice(psd, 1);
	if (liste.length == 0) RGV_Liste.splice(rgp, 1);
	else RGV_Liste[rgp][1] = liste.join().replace(/,/g, " ");
	if (RGV_Liste.length == 0) GM_deleteValue("rgp#liste");
	else GM_setValue("rgp#liste", RGV_Liste.join());
	if (liste.length == 0) {
		document.getElementById("cadre_psd").style.display = "none";
		RGFmesRegroupements();
	} else {
		RGV_Id = rgp;
		RGFpseudosAssocies();
	}
}

function RGFaddPsd() {
	var id = document.getElementById("select_gp").value;
	var liste = document.getElementById("psd_a").value;
		liste = liste.replace(/^\s+|\s+$/g, "");
		liste = liste.replace(/\s+/g, " ");
		liste = liste.toLowerCase();
		liste = liste.split(" ");
	for (var i = liste.length - 1; i >= 0; i--) {
		if (liste[i].length < 3 || liste[i].length > 15) liste.splice(i, 1);
	}
	if (liste.length == 0) {
		alert("Entrez au moins un pseudo !");
		return 0;
	}
	for (var i = liste.length - 1; i >= 0; i--) {
		if (RGFformat(RGV_Liste[id][1]).match(new RegExp("^" + RGFformat(liste[i]) + " | " + RGFformat(liste[i]) + " | " + RGFformat(liste[i]) + "$|^" + RGFformat(liste[i]) + "$"))) liste.splice(i, 1);
	}
	if (liste.length > 0) {
		liste = liste.concat(RGV_Liste[id][1].split(" "));
		liste = liste.sort();
		RGV_Liste[id][1] = liste.join().replace(/,/g, " ");
		RGV_Liste = RGV_Liste.sort();
		GM_setValue("rgp#liste", RGV_Liste.join());
	}
	document.getElementById("psd_a").value = "";
	document.getElementById("cadre_psd").style.display = "none";
}

function RGFmodifierRgp() {
	var rgp = prompt("Nom du regroupement : " + RGV_Liste[this.alt][0] + "\nEntrez un nouveau nom pour ce regroupement :", "");
	if (rgp != null) {
		rgp = rgp.replace(/^\s+|\s+$/g, "");
		if (rgp != "") {
			rgp = rgp.replace(/\s+/g, " ");
			if (rgp.length < 16) {
				var found = false;
				for (var i = 0; i < RGV_Liste.length; i++) {
					if (RGFformat(rgp).toLowerCase() == RGFformat(RGV_Liste[i][0]).toLowerCase()) found = true;
				}
				if (!found) {
					RGV_Liste[this.alt][0] = rgp;
					RGV_Liste = RGV_Liste.sort();
					GM_setValue("rgp#liste", RGV_Liste.join());
					RGFmesRegroupements();
				} else alert("Ce nom de regroupement existe déjà.");
			} else alert("15 caractères maximum !");
		}
	}
}

function RGFsupprimerRgp() {
	if (confirm("Nom du regroupement : " + RGV_Liste[this.alt][0] + "\nSupprimer ce regroupement ?")) {
		RGV_Liste.splice(this.alt, 1);
		if (RGV_Liste.length == 0) GM_deleteValue("rgp#liste");
		else GM_setValue("rgp#liste", RGV_Liste.join());
		document.getElementById("cadre_psd").style.display = "none";
		RGFmesRegroupements();
	}
}

function RGFnewRgp() {
	var found = false;
	var nom = document.getElementById("new_gp").value;
		nom = nom.replace(/^\s+|\s+$/g, "");
	if (nom.replace(/\s+/g, "") == "") {
		alert("Entrez un nom de regroupement !");
		return 0;
	}
	for (var i = 0; i < RGV_Liste.length; i++) {
		if (nom.toLowerCase() == RGV_Liste[i][0].toLowerCase()) found = true;
	}
	if (found) {
		alert("Ce nom de regroupement existe déjà.");
		return 0;
	}
	var liste = document.getElementById("psd_a").value;
		liste = liste.replace(/^\s+|\s+$/g, "");
		liste = liste.replace(/\s+/g, " ");
		liste = liste.toLowerCase();
		liste = liste.split(" ");
	for (var i = liste.length - 1; i >= 0; i--) {
		if (liste[i].length < 3 || liste[i].length > 15) liste.splice(i, 1);
	}
	liste = liste.sort();
	for (var i = liste.length - 1; i > 0; i--) {
		if (liste[i] == liste[i - 1]) liste.splice(i, 1);
	}
	if (liste.length == 0) {
		alert("Entrez au moins un pseudo !");
		return 0;
	}
	RGV_Liste.push(new Array(nom, liste.join().replace(/,/g, " ")));
	RGV_Liste = RGV_Liste.sort();
	GM_setValue("rgp#liste", RGV_Liste.join());
	document.getElementById("new_gp").value = document.getElementById("psd_a").value = "";
	RGFmesRegroupements();
}

function RGFpseudosAssocies() {
	var id;
	if (this == "[object XPCNativeWrapper [object Window]]") id = RGV_Id;
	else id = this.id;
	var listePsd = document.getElementById("liste_psd");
		listePsd.innerHTML = "";
	var Psd_Liste = RGV_Liste[id][1].split(" ");
		Psd_Liste = Psd_Liste.sort();
	for (var i = 0; i < Psd_Liste.length; i++) {
		var minDiv = document.createElement("div");
			minDiv.style.margin = "0px";
			minDiv.style.padding = "0px 2px";
			minDiv.setAttribute("onmouseover", "this.style.background = '#BDDFEF'; this.getElementsByTagName('img')[1].style.display = 'inline';");
			minDiv.setAttribute("onmouseout", "this.style.background = ''; this.getElementsByTagName('img')[1].style.display = 'none';");
		var img = document.createElement("img");
			img.style.margin = "0px 8px -3px 4px";
			img.src = "http://image.jeuxvideo.com/css_img/defaut/puce_liste_bleue.gif";
		minDiv.appendChild(img);
		var span = document.createElement("span");
			span.innerHTML = Psd_Liste[i];
			span.style.color = "#0a77b8";
			span.style.fontWeight = "bold";
			span.style.cursor = "default";
			span.style.display = "inline";
		minDiv.appendChild(span);
		var img = document.createElement("img");
			img.alt = id + "|" + i;
			img.align = "right";
			img.title = "Supprimer ce regroupement";
			img.style.marginRight = "5px";
			img.style.marginTop = "-12px";
			img.src = "http://www.noelshack.com/voir/130309/edit-Copie025810.png";
			img.style.cursor = "pointer";
			img.style.background = "#036";
			img.style.display = "none";
			img.addEventListener("click", RGFsupprimerPsd, false);
		minDiv.appendChild(img);
		listePsd.appendChild(minDiv);
	}
	document.getElementById("nb_psd").innerHTML = Psd_Liste.length;
	document.getElementById("cadre_psd").style.display = "block";
}

function RGFmesRegroupements() {
	if (RGV_Liste.length == 0) {
		document.getElementById("div_a").style.display = "none";
		document.getElementById("donnees").style.display = "none";
	} else {
		var listeRgp = document.getElementById("liste_rgp");
			listeRgp.innerHTML = "";
		
		RGV_Liste = RGV_Liste.sort();
		
		var select = document.getElementById("select_gp");
			select.innerHTML = "";
		for (var i = 0; i < RGV_Liste.length; i++) {
			var option = document.createElement("option");
				option.value = i;
				option.innerHTML = RGV_Liste[i][0];
			select.appendChild(option);
		}
		for (var i = 0; i < RGV_Liste.length; i++) {
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
				a.id = i;
				a.innerHTML = RGV_Liste[i][0];
				a.style.fontWeight = "bold";
				a.style.cursor = "pointer";
				a.style.display = "inline";
				a.addEventListener("click", RGFpseudosAssocies, true);
			minDiv.appendChild(a);
			var img = document.createElement("img");
				img.alt = i;
				img.align = "right";
				img.title = "Supprimer ce regroupement";
				img.style.marginRight = "5px";
				img.style.marginTop = "-12px";
				img.src = "http://www.noelshack.com/voir/130309/edit-Copie025810.png";
				img.style.cursor = "pointer";
				img.style.background = "#036";
				img.style.display = "none";
				img.addEventListener("click", RGFsupprimerRgp, false);
			minDiv.appendChild(img);
			var img = document.createElement("img");
				img.alt = i;
				img.align = "right";
				img.title = "Modifier ce regroupement";
				img.style.marginRight = "20px";
				img.style.marginTop = "-12px";
				img.src = "http://www.noelshack.com/voir/130309/edit-Copie018108.png";
				img.style.cursor = "pointer";
				img.style.background = "#036";
				img.style.display = "none";
				img.addEventListener("click", RGFmodifierRgp, false);
			minDiv.appendChild(img);
			listeRgp.appendChild(minDiv);
		}
		document.getElementById("nb_rgp").innerHTML = RGV_Liste.length;
		document.getElementById("div_a").style.display = "inline";
		document.getElementById("donnees").style.display = "block";
	}
}

function RGFactiverGroupes() {
	if (this.checked == true) GM_setValue("rgp#replace", 1);
	else {
		document.getElementById("original").checked = false;
		GM_setValue("rgp#replace", 0);
		GM_setValue("rgp#original", 0);
	}
}

function RGFpseudoOriginal() {
	if (this.checked == true) {
		document.getElementById("replace").checked = true;
		GM_setValue("rgp#replace", 1);
		GM_setValue("rgp#original", 1);
	} else GM_setValue("rgp#original", 0);
}

function GestionRegroupement() {
	document.title = "Module de regroupement de pseudonymes";
	//GM_deleteValue("rgp#liste");
	var temp = GM_getValue("rgp#liste", ""); // Mes regroupements
	if (temp != "") {
		var tempTbl = temp.split(",");
		for (var i = 0; i < tempTbl.length; i += 2) RGV_Liste.push(new Array(tempTbl[i], tempTbl[i + 1]));
	}
	// La partie centrale
	var obj = document.getElementById("col1");
		obj.innerHTML = "";
	// Le titre
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
		span.innerHTML = "Module de regroupement de pseudonymes";
	div.appendChild(span);
	divHaut.appendChild(div);
	var div = document.createElement("div");
		div.align = "center";
		div.style.padding = "3px 0px";
		div.style.background = "#EFF4FC";
	var span = document.createElement("span");
		span.style.fontSize = "16px";
		span.style.fontFamily = "Times New Roman";
		span.innerHTML = "Affichez une liste de pseudos sous un seul nom";
	div.appendChild(span);
	divHaut.appendChild(div);
	obj.appendChild(divHaut);
	// Le cadre de gestion
	var divGDMC = document.createElement("div");
	// La bande
	var div = document.createElement("div");
		div.style.paddingLeft = "10px";
		div.style.marginTop = "20px";
		div.style.background = "url(http://image.jeuxvideo.com/css_img/defaut/bloc1_h3.png) right top";
	var span = document.createElement("b");
		span.style.color = "#FFF";
		span.style.fontSize = "17px";
		span.style.fontVariant = "small-caps";
		span.innerHTML = "Mes regroupements";
	div.appendChild(span);
	divGDMC.appendChild(div);
	// Le cadre bleu
	var divG = document.createElement("div");
		divG.style.border = "1px solid #BDDFEF";
		divG.style.padding = "10px";
		divG.style.background = "#F8FAFC";
	// Sous-titre
	var b = document.createElement("b");
		b.style.display = "block";
		b.style.fontSize = "1.1em";
		b.style.color = "#036";
		b.style.marginBottom = "-8px";
		b.innerHTML = "Créez ou modifiez vos regroupements";
	divG.appendChild(b);
	divG.appendChild(document.createElement("br"));
	// Créer
	var input = document.createElement("input");
		input.id = "choix_n";
		input.type = "radio";
		input.style.margin = "0px 5px 0px 0px";
		input.checked = true;
		input.setAttribute("onclick", "document.getElementById('choix_a').checked = false");
	divG.appendChild(input);
	var b = document.createElement("b");
		b.style.color = "#C00";
		b.style.fontFamily = "Arial";
		b.style.fontSize = "0.9em";
		b.style.marginRight = "10px";
		b.style.cursor = "default";
		b.innerHTML = "Créer :";
		b.setAttribute("onclick", "document.getElementById('choix_n').checked = true; document.getElementById('choix_a').checked = false;");
	divG.appendChild(b);
	var input = document.createElement("input");
		input.id = "new_gp";
		input.type = "text";
		input.maxLength = "15";
		input.style.width = "150px";
		input.style.fontSize = "12px";
		input.style.marginRight = "28px";
		input.setAttribute("onclick", "document.getElementById('choix_n').checked = true; document.getElementById('choix_a').checked = false;");
	divG.appendChild(input);
	// Ajouter
	var div = document.createElement("div");
		div.id = "div_a";
	var input = document.createElement("input");
		input.id = "choix_a";
		input.type = "radio";
		input.style.marginRight = "5px";
		input.checked = false;
		input.setAttribute("onclick", "document.getElementById('choix_n').checked = false");
	div.appendChild(input);
	var b = document.createElement("b");
		b.style.color = "#C00";
		b.style.fontFamily = "Arial";
		b.style.fontSize = "0.9em";
		b.style.marginRight = "10px";
		b.style.cursor = "default";
		b.innerHTML = "Ajouter à :";
		b.setAttribute("onclick", "document.getElementById('choix_n').checked = false; document.getElementById('choix_a').checked = true;");
	div.appendChild(b);
	var select = document.createElement("select");
		select.id = "select_gp";
		select.style.width = "170px";
		select.style.fontSize = "12px";
		select.setAttribute("onclick", "document.getElementById('choix_n').checked = false; document.getElementById('choix_a').checked = true;");
	div.appendChild(select);
	divG.appendChild(div);
	// Espace
	divG.appendChild(document.createElement("br"));
	divG.appendChild(document.createElement("br"));
	// Liste des pseudos à ajouter
	var b = document.createElement("b");
		b.style.color = "#C00";
		b.style.fontFamily = "Arial";
		b.style.fontSize = "0.9em";
		b.innerHTML = "Pseudos à regrouper (séparés par un espace ou un retour à la ligne) :";
	divG.appendChild(b);
	var textarea = document.createElement("textarea");
		textarea.id = "psd_a";
		textarea.style.height = "80px";
		textarea.style.fontSize = "12px";
		textarea.style.margin = "5px 0px 0px -2px";
	divG.appendChild(textarea);
	// Bouton pour valider
	var b = document.createElement("b");
		b.style.fontFamily = "Arial";
		b.style.fontSize = "11px";
		b.innerHTML = "* Il faut associer au moins un pseudo pour créer un regroupement";
	divG.appendChild(b);
	var img = document.createElement("img");
		img.style.margin = "5px 0px 0px 80px";
		img.style.cursor = "pointer";
		img.src = "http://www.noelshack.com/voir/130309/btn_ajouter000387.png";
		img.addEventListener("click", function() { if (document.getElementById('choix_n').checked == true) RGFnewRgp(); else RGFaddPsd(); }, false);
	divG.appendChild(img);
	// Espace
	divG.appendChild(document.createElement("br"));
	divG.appendChild(document.createElement("br"));
	// Les listes
	var divB = document.createElement("div");
		divB.id = "donnees";
		divB.style.borderTop = "1px dotted rgb(153,153,153)";
		divB.style.padding = "10px 0px";
		divB.style.marginBottom = "10px";
	// Début table
	var table = document.createElement("table");
		table.style.width = "100%";
	var tr = document.createElement("tr");
	var td = document.createElement("td");
		td.align = "left";
		td.style.verticalAlign = "top";
		td.style.width = "230px";
	// Mes regroupements
	var div = document.createElement("div");
		div.align = "center";
		div.style.padding = "1px";
		div.style.background = "#BDDFEF";
		div.style.width = "220px";
	var b = document.createElement("b");
		b.style.color = "#036";
		b.style.fontSize = "15px";
		b.style.fontVariant = "small-caps";
		b.innerHTML = "- Mes regroupements -";
	div.appendChild(b);
	td.appendChild(div);
	var div = document.createElement("div");
		div.id = "liste_rgp";
		div.style.border = "1px solid #BDDFEF";
		div.style.width = "220px";
		div.style.height = "120px";
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
		b.innerHTML = "TOTAL :";
	div.appendChild(b);
	td.appendChild(div);
	var div = document.createElement("div");
		div.align = "right";
		div.style.padding = "1px";
		div.style.margin = "-18px 0 0 80px";
		div.style.background = "#BDDFEF";
		div.style.width = "140px";
	var b = document.createElement("b");
		b.id = "nb_rgp";
		b.style.color = "#036";
		b.style.fontSize = "13px";
		b.style.marginRight = "5px";
	div.appendChild(b);
	td.appendChild(div);
	tr.appendChild(td);
	// Mes pseudos associés
	var td = document.createElement("td");
		td.id = "cadre_psd";
		td.align = "left";
		td.style.verticalAlign = "top";
		td.style.paddingLeft = "50px";
		td.style.display = "none";
	var div = document.createElement("div");
		div.align = "center";
		div.style.padding = "1px";
		div.style.background = "#BDDFEF";
		div.style.width = "220px";
	var b = document.createElement("b");
		b.style.color = "#036";
		b.style.fontSize = "15px";
		b.style.fontVariant = "small-caps";
		b.innerHTML = "- Pseudos associés -";
	div.appendChild(b);
	td.appendChild(div);
	var div = document.createElement("div");
		div.id = "liste_psd";
		div.style.border = "1px solid #BDDFEF";
		div.style.width = "220px";
		div.style.height = "120px";
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
		b.innerHTML = "TOTAL :";
	div.appendChild(b);
	td.appendChild(div);
	var div = document.createElement("div");
		div.align = "right";
		div.style.padding = "1px";
		div.style.margin = "-18px 0 0 80px";
		div.style.background = "#BDDFEF";
		div.style.width = "140px";
	var b = document.createElement("b");
		b.id = "nb_psd";
		b.style.color = "#036";
		b.style.fontSize = "13px";
		b.style.marginRight = "5px";
	div.appendChild(b);
	td.appendChild(div);
	tr.appendChild(td);
	table.appendChild(tr);
	divB.appendChild(table);
	divG.appendChild(divB);
	// Mes options
	var divB = document.createElement("div");
		divB.style.display = "block";
		divB.style.borderTop = "1px dotted rgb(153,153,153)";
		divB.style.padding = "10px 0px";
		divB.style.marginBottom = "10px";
	// Remplacer les pseudos par leur nom de regroupement
	var checkbox = document.createElement("input");
		checkbox.id = "replace";
		checkbox.type = "checkbox";
		checkbox.checked = GM_getValue("rgp#replace", 1) ? true : false;
		checkbox.style.marginRight = "5px";
		checkbox.addEventListener("click", RGFactiverGroupes, false);
	var b = document.createElement("b");
		b.style.fontFamily = "Arial";
		b.innerHTML = "Remplacer les pseudos par leur nom de regroupement.";
	divB.appendChild(checkbox);
	divB.appendChild(b);
	// Espace
	divB.appendChild(document.createElement("br"));
	// Afficher le pseudo réellement utilisé entre parenthèses
	var checkbox = document.createElement("input");
		checkbox.id = "original";
		checkbox.type = "checkbox";
		checkbox.checked = GM_getValue("rgp#original", 1) ? true : false;
		checkbox.style.marginRight = "5px";
		checkbox.addEventListener("click", RGFpseudoOriginal, false);
	var b = document.createElement("b");
		b.style.fontFamily = "Arial";
		b.innerHTML = "Afficher le pseudo réellement utilisé entre parenthèses.";
	divB.appendChild(checkbox);
	divB.appendChild(b);
	// Fin des options
	divG.appendChild(divB);
	divGDMC.appendChild(divG);
	obj.appendChild(divGDMC);
	// Affichage
	RGFmesRegroupements();
}

function RGFPsdToRgp() {
	if (GM_getValue("skin#newlook", 0)) {
		var td = document.getElementById('col1').getElementsByTagName("td");
		for (var u = 0; td[u]; u++) {
			if (td[u].className == 'lesBoutons') {
				var parent = td[u].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
				var pseudo = parent.getElementsByTagName("strong")[0];
				var tsuzuku = true;
				for (var i = 0; i < RGV_Liste.length && tsuzuku; i++) {
					if (RGFformat(RGV_Liste[i][1]).match(new RegExp("^" + RGFformat(pseudo.innerHTML.toLowerCase()) + " | " + RGFformat(pseudo.innerHTML.toLowerCase()) + " | " + RGFformat(pseudo.innerHTML.toLowerCase()) + "$|^" + RGFformat(pseudo.innerHTML.toLowerCase()) + "$"))) {
						if (GM_getValue("rgp#original", 0)) {
							var b = document.createElement("b");
								b.style.margin = "-4px 0px 10px 0px";
								b.style.fontSize = "10px";
								b.style.display = "block";
								b.innerHTML = "(" + pseudo.innerHTML + ")";
							var a = parent.getElementsByTagName("a")[0];
								a.parentNode.insertBefore(b, a);
						} else pseudo.title = pseudo.innerHTML;
						pseudo.innerHTML = RGV_Liste[i][0];
						tsuzuku = false;
					}
				}
			}
		}
	} else {
		var lis = document.getElementById('col1').getElementsByTagName("li");
		for (var u = 0; u < lis.length; u++) {
			if (lis[u].className == 'pseudo') {
				var pseudo = lis[u].getElementsByTagName("strong")[0];
				var tsuzuku = true;
				for (var i = 0; i < RGV_Liste.length && tsuzuku; i++) {
					if (RGFformat(RGV_Liste[i][1]).match(new RegExp("^" + RGFformat(pseudo.innerHTML.toLowerCase()) + " | " + RGFformat(pseudo.innerHTML.toLowerCase()) + " | " + RGFformat(pseudo.innerHTML.toLowerCase()) + "$|^" + RGFformat(pseudo.innerHTML.toLowerCase()) + "$"))) {
						if (GM_getValue("rgp#original", 0)) {
							var b = document.createElement("b");
								b.style.marginLeft = "4px";
								b.style.fontSize = "10px";
								b.innerHTML = "(" + pseudo.innerHTML + ")";
							lis[u].insertBefore(b, lis[u].childNodes[2]);
						} else pseudo.title = pseudo.innerHTML;
						pseudo.innerHTML = RGV_Liste[i][0];
						tsuzuku = false;
					}
				}
			}
		}
	}
}

function Regroupement() {
	// On ajoute le bouton de recherche
	var li = document.createElement("li");
	var a = document.createElement("a");
		a.innerHTML = "Regroupement";
		a.href = "http://www.jeuxvideo.com/forums/Regroupement";
		a.target = "_blank";
	li.appendChild(a);
	document.getElementById("menu_interactif").getElementsByTagName("ul")[0].appendChild(li);
	
	if (mode == 1 || mode == 3) {
		if (GM_getValue("rgp#replace", 1)) {
			var temp = GM_getValue("rgp#liste", ""); // Mes regroupements
			if (temp != "") {
				var tempTbl = temp.split(",");
				for (var i = 0; i < tempTbl.length; i += 2) RGV_Liste.push(new Array(tempTbl[i], tempTbl[i + 1]));
			}
			RGFPsdToRgp();
		}
	}
}
} // ----- Fin Regroupement ----- //

{ // ----- New Look ----- //
function NLFgetCol(content) {
   temp = content.toLowerCase();
   var x = temp.indexOf("<div id=\"profil\">");
   if (x == -1) return "";
   var y = temp.lastIndexOf("<div id=\"prefs\">");
   if (y == -1) y = temp.indexOf("</div>");
   if (y == -1) y = temp.lastIndexOf("</html>");
   if (y == -1) y = content.length;
   return content.slice(x, y);   
}

function NewLook() {
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
			cache.innerHTML = NLFgetCol(req.responseText);
			
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
			
			if (!banni)	{
				h1 = document.getElementById("pseudo");
				pseudo.style.color = (pseudo.className == "moderateur") ? Mega_NewLook[pseudo.className] : Mega_NewLook[h1.className];
				pseudo.className = (pseudo.className == "moderateur") ? pseudo.className : h1.className;
			} else {
				pseudo.className = "sexe_b";
				pseudo.style.color = Mega_NewLook[pseudo.className];
			}
			
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
} // ----- Fin New Look ----- //

{ // ----- Les Mega_Variables ----- //
var Mega_selected = "";
var Mega_id = "";
var Mega_Normal = new Array();
	Mega_Normal[""] = "0_0_0";
	Mega_Normal["moderateur"] = "204_0_0";
var Mega_NewLook = new Array();
	Mega_NewLook["sexe_f"] = "255_51_153";
	Mega_NewLook["sexe_m"] = "0_102_204";
	Mega_NewLook["sexe_b"] = "192_0_0";
	Mega_NewLook["moderateur"] = "34_177_76";
var Mega_favoris = new Array();
var Mega_topics = new Array();
var Mega_smileys = new Array();
var Mega_pseudos = new Array();
var Mega_menu = new Array();
	Mega_menu.push(new Array(1, "Fonctions", "fcts", "fonctions", "117px"));
	Mega_menu.push(new Array(1, "Extra", "extra", "extra", "212px"));
	Mega_menu.push(new Array(1, "Mes pseudos", "pseudos", "pseudos", "282px"));
	Mega_menu.push(new Array(1, "Mes smileys", "smiley", "smiley", "398px"));
	Mega_menu.push(new Array(1, "Skins", "skin", "skins", "509px"));
	Mega_menu.push(new Array(GM_getValue("menu#forum", 0), "Forums préférés", "forum", "favoris", "581px"));
	Mega_menu.push(new Array(GM_getValue("menu#topic", 0), "Topics préférés", "topic", "topics", GM_getValue("menu#forum", 0) ? "716px" : "581px"));
	Mega_menu.push(new Array(1, "A propos", "apropos", "aPropos"));
	//Mega_menu.push();
var Mega_fcts = new Array();
	Mega_fcts.push(new Array("Cdv Globale", "Permet de regrouper ses cdv pour créer un compteur global", "http://www.noelshack.com/up/aac/cdvg-2f7218c594.jpg", "spt#cdvglobale", "http://www.noelshack.com/up/aac/cdv017418-a6880d6159.png"));
	Mega_fcts.push(new Array("Citer", "Permet de citer des messages", "http://www.noelshack.com/up/aac/temp-aa5e722223.gif", "spt#citer", "http://www.noelshack.com/up/aac/jvm-8c641ee746.jpg"));
	Mega_fcts.push(new Array("Coloriser", "Permet de coloriser des pseudos", "http://www.noelshack.com/up/aac/temp-d378986213.png", "spt#color", "http://www.noelshack.com/up/aac/color-71fc43f275.jpg"));
	Mega_fcts.push(new Array("Ignorer", "Permet d'ignorer des messages", "http://www.noelshack.com/up/aac/temp-1fdeebb466.gif", "spt#ignorer", "http://www.noelshack.com/up/aac/ignorer-7a14ce9428.jpg"));
	Mega_fcts.push(new Array("Recherche", "Permet de faire des recherches intra-topic", "http://www.noelshack.com/voir/130309/bt_forum_repondre037607.png", "spt#recherche", "http://www.noelshack.com/up/aac/screen065653-e50d2f1e74.png"));
	Mega_fcts.push(new Array("Regroupement", "Permet de regrouper des pseudos", "http://www.noelshack.com/up/aac/groupe-572911ff7.jpg", "spt#regroupement", "http://www.noelshack.com/up/aac/regroupement-26db674519.jpg"));
	Mega_fcts.push(new Array("Smileys rapides", "Affiche la liste des smileys de jvc à droite du formulaire pour poster", "http://www.noelshack.com/up/aac/smi-c03f131215.jpg", "spt#easysmiley", "http://www.noelshack.com/up/aac/screen037045-53045f9743.jpg"));
	//Mega_fcts.push(new Array());
var Mega_extra = new Array();
	Mega_extra.push(new Array("Afficher mes forums préférés dans le menu", GM_getValue("menu#forum", 0), "menu#forum"));
	Mega_extra.push(new Array("Afficher mes topics préférés dans le menu", GM_getValue("menu#topic", 0), "menu#topic"));
	Mega_extra.push(new Array("Accéder à la dernière page d'un topic par un clic gauche sur son icône", GM_getValue("extra#lastpage", 0), "extra#lastpage"));
	Mega_extra.push(new Array("Accéder au formulaire de post d'un topic par un clic droit sur son icône", GM_getValue("extra#postpage", 0), "extra#postpage"));
	Mega_extra.push(new Array("Afficher les smileys de jeuxvideo.com dans les cartes de visite", GM_getValue("extra#smljvc", 0), "extra#smljvc"));
	Mega_extra.push(new Array("Afficher mes smileys persos dans les posts", GM_getValue("extra#smlperso", 0), "extra#smlperso"));
	Mega_extra.push(new Array("Afficher les images dans les posts", GM_getValue("extra#img", 0), "extra#img"));
	Mega_extra.push(new Array("Afficher les vidéos dans les posts", GM_getValue("extra#video", 0), "extra#video"));
	Mega_extra.push(new Array("Utiliser ma liste de pseudos dans les formulaires", GM_getValue("extra#pseudos", 0), "extra#pseudos"));
	Mega_extra.push(new Array("Activer la signature (nulle par défaut)", GM_getValue("extra#signature", 0), "extra#signature"));
	Mega_extra.push(new Array("Activer la barre d'upload NoelShack", GM_getValue("extra#noelshack", 0), "extra#noelshack"));
	Mega_extra.push(new Array("Ajouter les statistiques dans le menu latéral gauche (Interactif)", GM_getValue("extra#stats", 0), "extra#stats"));
	Mega_extra.push(new Array("Désactiver la partie latérale droite (Les autres forums, Boutique)", GM_getValue("extra#cotedroit", 0), "extra#cotedroit"));
	Mega_extra.push(new Array("Elargir la partie centrale (les posts et la liste des topics)", GM_getValue("extra#milieu", 0), "extra#milieu"));
	Mega_extra.push(new Array("Mettre en évidence les messages correspondant aux liens permanents", GM_getValue("extra#findpost", 0), "extra#findpost"));
	Mega_extra.push(new Array("Activer le champ d'accès rapide aux pages des topics", GM_getValue("extra#accespage", 0), "extra#accespage"));
	Mega_extra.push(new Array("Séparer la barre de recherche des topics en deux", GM_getValue("extra#search", 0), "extra#search"));
	//Mega_extra.push(new Array("Ajouter le critère Profils dans le formulaire de recherches (Jeux - News)", GM_getValue("extra#profils", 0), "extra#profils"));
	Mega_extra.push(new Array("Désactiver l'avatar dans les cartes de visite", GM_getValue("extra#avatar", 0), "extra#avatar"));
	//Mega_extra.push(new Array("", GM_getValue("", 0), ""));
var Mega_skins = new Array();
	Mega_skins.push(new Array("New Look", "http://www.noelshack.com/up/aac/nl-2e98fe6b90.jpg", "skin#newlook"));
	//Mega_skins.push(new Array("", "", ""));
}

{ // -----  Fonctions ----- //
function cadreApropos() {
	var cadre = document.createElement("div");
		cadre.id = "cadre_apropos";
		cadre.style.display = "none";
		cadre.style.border = "3px solid rgb(60,60,60)";
		cadre.style.position = "fixed";
		cadre.style.zIndex = "2";
		cadre.style.left = window.innerWidth / 2 - 140 + "px";
		cadre.style.top = window.innerHeight / 2 - 150 + "px";
	var div = document.createElement("div");
		div.align = "right";
		div.style.background = "rgb(60,60,60)";
	var span = document.createElement("b");
		span.innerHTML = "A propos de Jv.Mega";
		span.style.color = "#FFF";
		span.style.fontSize = "17px";
		span.style.marginRight = "55px";
		span.style.display = "block";
	div.appendChild(span);
	var img = document.createElement("img");
		img.src = "http://www2.noelshack.com/uploads/fermeture033943.png";
		img.title = "Fermer";
		img.style.margin = "-20px 1px 2px 0px";
		img.style.cursor = "pointer";
		img.setAttribute("onclick", "document.getElementById('cadre_apropos').style.display = 'none'");
	div.appendChild(img);
	cadre.appendChild(div);
	var img = document.createElement("img");
		img.src = "http://www.noelshack.com/up/aab/mega_man2_strat_screen-3e3ef37244.png";
	cadre.appendChild(img);
	var img = document.createElement("img");
		img.src = imgVide;
		img.title = "Cliquez pour effectuer une mise à jour";
		img.style.width = "60px";
		img.style.height = "15px";
		img.style.position = "absolute";
		img.style.zIndex = "2";
		img.style.left = "60px";
		img.style.bottom = "46px";
		img.style.cursor = "pointer";
		img.addEventListener("click", function() { location.href = "http://userscripts.org/scripts/source/58309.user.js" }, false);
	cadre.appendChild(img);
	document.getElementById("col1").appendChild(cadre);
}

function aPropos() {
	document.getElementById("ssmenu").style.display = "none";
	document.getElementById("cadre_apropos").style.display = "block";
}

function verifPseudo(psd, mdp, alerte) {
	var bool = true;
	psd.value = psd.value.replace(/ /g, "");
	mdp.value = mdp.value.replace(/ /g, "");
	if (psd.value == "") {
		if (alerte) alert("Entrez un pseudo !");
		else psd.style.background = "rgb(255,180,180)";
		bool = false;
	}
	if (psd.value.length < 3) {
		if (alerte) alert("Un pseudo fait entre 3 et 15 caractères !");
		else psd.style.background = "rgb(255,180,180)";
		bool = false;
	}
	if (mdp.value == "") {
		if (alerte) alert("Entrez le mot de passe du pseudo !");
		else mdp.style.background = "rgb(255,180,180)";
		bool = false;
	}
	return bool;
}

function verifModifierPseudo() {
	var psd = document.getElementById("psd_pseudos");
	var mdp = document.getElementById("mdp_pseudos");
	var cdv = document.getElementById("cdv_pseudos");
	var mail = document.getElementById("mail_pseudos");
	if (verifPseudo(psd, mdp, 1)) {
		Mega_pseudos[Mega_id] = new Array(psd.value, mdp.value, cdv.value, mail.value);
		GM_setValue("pseudos#liste", Mega_pseudos.join());
		document.getElementById("gestionPseudosModif").style.display = "none";
	}
}

function modifierPseudo() {
	document.getElementById("psd_pseudos").value = Mega_pseudos[this.id.substr(1)][0];
	document.getElementById("mdp_pseudos").value = Mega_pseudos[this.id.substr(1)][1];
	document.getElementById("cdv_pseudos").value = Mega_pseudos[this.id.substr(1)][2];
	document.getElementById("mail_pseudos").value = Mega_pseudos[this.id.substr(1)][3];
	document.getElementById("gestionPseudosModif").style.display = "block";
	Mega_id = this.id.substr(1);
}

function verifAjouterPseudo() {
	var table = document.getElementById("grillePseudo");
	var tr = table.getElementsByTagName("tr");
	var nb = tr.length - 1;
	for (var i = 0; i < nb; i++) {
		var psd = tr[i].getElementsByTagName("input")[0];
			psd.style.background = "#FFF";
		var mdp = tr[i].getElementsByTagName("input")[1];
			mdp.style.background = "#FFF";
		var cdv = tr[i].getElementsByTagName("input")[2];
			cdv.style.background = "#FFF";
		var mail = tr[i].getElementsByTagName("input")[3];
			mail.style.background = "#FFF";
		if (verifPseudo(psd, mdp, 0)) {
			var trouve = false;
			for (u = 0; u < Mega_pseudos.length; u++) {
				if (Mega_pseudos[u][0] == psd.value) trouve = true;
			}
			if (!trouve) Mega_pseudos.push(new Array(psd.value, mdp.value, cdv.value, mail.value));
			table.removeChild(tr[i]);
			i--;
			nb--;
		}
	}
	GM_setValue("pseudos#liste", Mega_pseudos.join());
	if (table.getElementsByTagName("tr").length == 1)
	document.getElementById("gestionPseudosAjout").style.display = "none";
}

function ajouterPseudo() {
	disappear();
	document.getElementById("grillePseudo").innerHTML = "";
	addTableRowPseudo();
	document.getElementById("gestionPseudosAjout").style.display = "block";
}

function supprimerPseudo() {
	Mega_pseudos.splice(this.id.substr(1), 1);
	if (Mega_pseudos.length == 0) GM_deleteValue("pseudos#liste");
	else GM_setValue("pseudos#liste", Mega_pseudos.join());
	pseudos();
}

function removeTableRow() {
	var tr = this.parentNode.parentNode;
	var parent = tr.parentNode;
		parent.removeChild(tr);
}

function addTableRowPseudo() {
	var parent = document.getElementById("grillePseudo");
	if (this == parent.lastChild || this == "[object XPCNativeWrapper [object Window]]") {
		var tr = document.createElement("tr");
			tr.addEventListener("keypress", addTableRowPseudo, false);
		var td = document.createElement("td");
			td.style.paddingBottom = "5px";
		var text = document.createElement("input");
			text.type = "text";
			text.maxLength = 15;
			text.style.width = "155px";
		td.appendChild(text);
		tr.appendChild(td);
		var td = document.createElement("td");
			td.style.paddingBottom = "5px";
		var text = document.createElement("input");
			text.type = "text";
			text.maxLength = 12;
			text.style.width = "155px";
		td.appendChild(text);
		tr.appendChild(td);
		var td = document.createElement("td");
			td.style.paddingBottom = "5px";
		var text = document.createElement("input");
			text.type = "text";
			text.style.width = "300px";
		td.appendChild(text);
		tr.appendChild(td);
		var td = document.createElement("td");
			td.style.paddingBottom = "5px";
		var text = document.createElement("input");
			text.type = "text";
			text.style.width = "300px";
		td.appendChild(text);
		tr.appendChild(td);
		var td = document.createElement("td");
			td.style.paddingBottom = "5px";
			td.style.visibility = "hidden";
		var img = document.createElement("img");
			img.src = "http://www.noelshack.com/up/aac/fermer-copie-6fe919bf44.png";
			img.title = "Supprimer cette ligne";
			img.style.background = "#FFF";
			img.style.cursor = "pointer";
			img.setAttribute("onmouseover", "this.style.background = 'rgb(60,60,60)'");
			img.setAttribute("onmouseout", "this.style.background = '#FFF'");
			img.addEventListener("click", removeTableRow, false);
		td.appendChild(img);
		tr.appendChild(td);
		if (this == parent.lastChild) {
			this.lastChild.style.visibility = "visible";
			this.getElementsByTagName("td")[0].style.borderBottom = "1px dashed #FFF";
			this.getElementsByTagName("td")[1].style.borderBottom = "1px dashed #FFF";
			this.getElementsByTagName("td")[2].style.borderBottom = "1px dashed #FFF";
			this.getElementsByTagName("td")[3].style.borderBottom = "1px dashed #FFF";
			this.getElementsByTagName("td")[4].style.borderBottom = "1px dashed #FFF";
		}
		parent.appendChild(tr);
	}
}

function cadrePseudosAjout() {
	var cadre = document.createElement("div");
		cadre.id = "gestionPseudosAjout";
		cadre.style.display = "none";
		cadre.style.border = "3px solid rgb(60,60,60)";
		cadre.style.background = "rgb(150,150,150)";
		cadre.style.paddingBottom = "4px";
		cadre.style.position = "fixed";
		cadre.style.zIndex = "2";
		cadre.style.left = window.innerWidth / 2 - 499 + "px";
		cadre.style.top = window.innerHeight / 2 - 150 + "px";
	var div = document.createElement("div");
		div.align = "right";
		div.style.background = "rgb(60,60,60)";
	var span = document.createElement("b");
		span.innerHTML = "Ajouter des pseudos";
		span.style.color = "#FFF";
		span.style.fontSize = "17px";
		span.style.marginRight = "415px";
		span.style.display = "block";
	div.appendChild(span);
	var img = document.createElement("img");
		img.src = "http://www2.noelshack.com/uploads/fermeture033943.png";
		img.title = "Fermer";
		img.style.margin = "-20px 1px 2px 0px";
		img.style.cursor = "pointer";
		img.setAttribute("onclick", "document.getElementById('gestionPseudosAjout').style.display = 'none'");
	div.appendChild(img);
	cadre.appendChild(div);
	var table = document.createElement("table");
	var tr = document.createElement("tr");
	var th = document.createElement("th");
		th.align = "center";
		th.innerHTML = "Pseudo";
		th.style.color = "white";
		th.style.width = "157px";
	tr.appendChild(th);
	var th = document.createElement("th");
		th.align = "center";
		th.innerHTML = "Mot de passe";
		th.style.color = "white";
		th.style.width = "157px";
	tr.appendChild(th);
	var th = document.createElement("th");
		th.align = "center";
		th.innerHTML = "Lien de la carte de visite";
		th.style.color = "white";
		th.style.width = "301px";
	tr.appendChild(th);
	var th = document.createElement("th");
		th.align = "center";
		th.innerHTML = "E-mail de création du pseudo";
		th.style.color = "white";
		th.style.width = "308px";
	tr.appendChild(th);
	table.appendChild(tr);
	cadre.appendChild(table);
	var table = document.createElement("table");
		table.id = "grillePseudo";
		table.style.borderBottom = "2px solid rgb(60,60,60)";
		table.style.overflow = "auto";
		table.style.maxHeight = "310px";
		table.style.display = "block";
		table.style.padding = "0px 20px 2px 0px";
		table.style.marginBottom = "4px";
	cadre.appendChild(table);
	var span = document.createElement("b");
		span.innerHTML = "Le pseudo et le mot de passe sont obligatoires.";
		span.style.color = "#FFF";
		span.style.marginLeft = "4px";
	var bouton = document.createElement("input");
		bouton.type = "submit";
		bouton.value = "ENREGISTRER";
		bouton.style.fontSize = "9px";
		bouton.style.fontWeight = "bold";
		bouton.style.marginLeft = "610px";
		bouton.addEventListener("click", verifAjouterPseudo, false);
	cadre.appendChild(span);
	cadre.appendChild(bouton);
	document.getElementById("col1").appendChild(cadre);
}

function cadrePseudosModif() {
	var cadre = document.createElement("div");
		cadre.id = "gestionPseudosModif";
		cadre.style.display = "none";
		cadre.style.border = "3px solid rgb(60,60,60)";
		cadre.style.background = "rgb(150,150,150)";
		cadre.style.position = "fixed";
		cadre.style.zIndex = "2";
		cadre.style.left = window.innerWidth / 2 - 250 + "px";
		cadre.style.top = window.innerHeight / 2 - 150 + "px";
	var div = document.createElement("div");
		div.align = "right";
		div.style.background = "rgb(60,60,60)";
	var span = document.createElement("b");
		span.align = "left";
		span.innerHTML = "Modification de pseudo";
		span.style.color = "#FFF";
		span.style.fontSize = "17px";
		span.style.marginRight = "116px";
		span.style.display = "block";
	div.appendChild(span);
	var img = document.createElement("img");
		img.src = "http://www2.noelshack.com/uploads/fermeture033943.png";
		img.title = "Fermer";
		img.style.margin = "-20px 1px 2px 0px";
		img.style.cursor = "pointer";
		img.setAttribute("onclick", "document.getElementById('gestionPseudosModif').style.display = 'none'");
	div.appendChild(img);
	cadre.appendChild(div);
	var table = document.createElement("table");
		table.style.width = "100%";
	var tr = document.createElement("tr");
	var td = document.createElement("td");
		td.style.padding = "8px 2px 1px 4px";
	var span = document.createElement("span");
		span.innerHTML = "Pseudo* :";
		span.style.color = "white";
		span.style.fontWeight = "bold";
	td.appendChild(span);
	tr.appendChild(td);
	var td = document.createElement("td");
		td.style.padding = "8px 4px 1px 2px";
	var text = document.createElement("input");
		text.id = "psd_pseudos";
		text.type = "text";
		text.maxLength = 15;
		text.style.width = "155px";
	td.appendChild(text);
	tr.appendChild(td);
	table.appendChild(tr);
	var tr = document.createElement("tr");
	var td = document.createElement("td");
		td.style.padding = "8px 2px 1px 4px";
	var span = document.createElement("span");
		span.innerHTML = "Mot de passe* :";
		span.style.color = "white";
		span.style.fontWeight = "bold";
	td.appendChild(span);
	tr.appendChild(td);
	var td = document.createElement("td");
		td.style.padding = "8px 4px 1px 2px";
	var text = document.createElement("input");
		text.id = "mdp_pseudos";
		text.type = "text";
		text.maxLength = 12;
		text.style.width = "155px";
	td.appendChild(text);
	tr.appendChild(td);
	table.appendChild(tr);
	var tr = document.createElement("tr");
	var td = document.createElement("td");
		td.style.padding = "8px 2px 1px 4px";
	var span = document.createElement("span");
		span.innerHTML = "Lien cdv :";
		span.style.color = "white";
		span.style.fontWeight = "bold";
	td.appendChild(span);
	tr.appendChild(td);
	var td = document.createElement("td");
		td.style.padding = "8px 4px 1px 2px";
	var text = document.createElement("input");
		text.id = "cdv_pseudos";
		text.type = "text";
		text.style.width = "300px";
	td.appendChild(text);
	tr.appendChild(td);
	table.appendChild(tr);
	var tr = document.createElement("tr");
	var td = document.createElement("td");
		td.style.padding = "8px 2px 1px 4px";
	var span = document.createElement("span");
		span.innerHTML = "E-mail :";
		span.style.color = "white";
		span.style.fontWeight = "bold";
	td.appendChild(span);
	tr.appendChild(td);
	var td = document.createElement("td");
		td.style.padding = "8px 4px 1px 2px";
	var text = document.createElement("input");
		text.id = "mail_pseudos";
		text.type = "text";
		text.style.width = "300px";
	td.appendChild(text);
	tr.appendChild(td);
	table.appendChild(tr);
	cadre.appendChild(table);
	var bouton = document.createElement("input");
		bouton.type = "submit";
		bouton.value = "ENREGISTRER LES MODIFICATIONS";
		bouton.style.fontSize = "9px";
		bouton.style.fontWeight = "bold";
		bouton.style.margin = "10px 100px 5px 100px";
		bouton.addEventListener("click", verifModifierPseudo, false);
	cadre.appendChild(bouton);
	document.getElementById("col1").appendChild(cadre);
}

function pseudos() {
	var cadre = document.getElementById("ssmenu");
		cadre.align = "left";
		cadre.innerHTML = "";
		cadre.style.minWidth = "200px";
	var minCadre = document.createElement("div");
		minCadre.style.maxHeight = "400px";
		minCadre.style.overflow = "auto";
	Mega_pseudos = Mega_pseudos.sort();
	for (var i = 0; i < Mega_pseudos.length; i++) {
		var minDiv = document.createElement("div");
			minDiv.style.margin = "0px";
			minDiv.style.padding = "0px 2px";
			minDiv.style.borderTop = '1px dashed rgb(50,50,50)';
			minDiv.style.borderBottom = '1px dashed rgb(50,50,50)';
			minDiv.setAttribute("onmouseover", "this.style.borderTop = '1px dashed rgb(150,150,150)'; this.style.borderBottom = '1px solid rgb(150,150,150)'; this.getElementsByTagName('img')[1].style.visibility = 'visible'; this.getElementsByTagName('img')[2].style.visibility = 'visible';");
			minDiv.setAttribute("onmouseout", "this.style.borderTop = '1px dashed rgb(50,50,50)'; this.style.borderBottom = '1px solid rgb(50,50,50)'; this.getElementsByTagName('img')[1].style.visibility = 'hidden'; this.getElementsByTagName('img')[2].style.visibility = 'hidden';");
		var img = document.createElement("img");
			img.style.margin = "0px 8px -3px 4px";
			img.src = "http://image.jeuxvideo.com/css_img/defaut/puce_liste_bleue.gif";
		minDiv.appendChild(img);
		var a = document.createElement("a");
			a.className = "tlf";
			a.innerHTML = Mega_pseudos[i][0];
			a.href = Mega_pseudos[i][2];
			a.title = (Mega_pseudos[i][3] == "") ? "" : Mega_pseudos[i][3];
			if (Mega_pseudos[i][2] == "") a.setAttribute("onclick", "return false;");
			else a.setAttribute("onclick", "window.open(this,'profil','toolbar=no,location=no,directories=no,status=no,scrollbars=yes,resizable=yes,copyhistory=no,width=520,height=570');return false;");
		minDiv.appendChild(a);
		var img = document.createElement("img");
			img.id = "M" + i;
			img.align = "right";
			img.title = "Modifier ce pseudo";
			img.style.margin = "-12px 20px 0px 15px";
			img.src = "http://www.noelshack.com/up/aab/modifier-f893d43144.png";
			img.style.cursor = "pointer";
			img.style.background = "white";
			img.setAttribute("onmouseover", "this.style.background = 'yellow'");
			img.setAttribute("onmouseout", "this.style.background = 'white'");
			img.style.visibility = "hidden";
			img.addEventListener("click", modifierPseudo, false);
		minDiv.appendChild(img);
		var img = document.createElement("img");
			img.id = "S" + i;
			img.align = "right";
			img.title = "Retirer ce pseudo de la liste";
			img.style.margin = "-12px 5px 0px 15px";
			img.src = "http://www.noelshack.com/up/aab/fermer-b43081ef5.png";
			img.style.cursor = "pointer";
			img.style.background = "white";
			img.setAttribute("onmouseover", "this.style.background = 'yellow'");
			img.setAttribute("onmouseout", "this.style.background = 'white'");
			img.style.visibility = "hidden";
			img.addEventListener("click", supprimerPseudo, false);
		minDiv.appendChild(img);
		minCadre.appendChild(minDiv);
	}
	cadre.appendChild(minCadre);
	var minDiv = document.createElement("div");
		minDiv.style.margin = "0px";
		minDiv.style.padding = "0px 2px 2px 2px";
	var img = document.createElement("img");
		img.style.margin = "0px 6px -2px 4px";
		img.src = "http://image.jeuxvideo.com/css_img/defaut/puce_base2.gif";
	minDiv.appendChild(img);
	var a = document.createElement("a");
		a.className = "tlf";
		a.innerHTML = "Ajouter des pseudos";
		a.style.cursor = "pointer";
		a.addEventListener("click", ajouterPseudo, false);
	minDiv.appendChild(a);
	cadre.appendChild(minDiv);
}

function formatSmiley(code) {
	var x = code;
	x = x.replace(/\\/g, "\\");
	x = x.replace(/\//g, "\\/");
	x = x.replace(/\./g, "\\.");
	x = x.replace(/\$/g, "\\$");
	x = x.replace(/\[/g, "\\[");
	x = x.replace(/\]/g, "\\]");
	x = x.replace(/\(/g, "\\(");
	x = x.replace(/\)/g, "\\)");
	x = x.replace(/\{/g, "\\{");
	x = x.replace(/\}/g, "\\}");
	x = x.replace(/\^/g, "\\^");
	x = x.replace(/\?/g, "\\?");
	x = x.replace(/\*/g, "\\*");
	x = x.replace(/\+/g, "\\+");
	x = x.replace(/\-/g, "\\-");
	x = x.replace(/&/g, "&amp;");
	x = x.replace(/\"/g, "&quot;");
	x = x.replace(/</g, "&lt;");
	x = x.replace(/>/g, "&gt;");
	return x;
}

function verifSmiley(racS, urlS, alerte) {
	var bool = true;
	racS.value = racS.value.replace(/ /g, "");
	urlS.value = urlS.value.replace(/ /g, "");
	if (racS.value == "") {
		if (alerte) alert("Entrez un raccourci pour le smiley.");
		else racS.style.background = "rgb(255,180,180)";
		bool = false;
	}
	if (racS.value.length < 3) {
		if (alerte) alert("Le raccourci doit faire au moins 3 caractères.");
		else racS.style.background = "rgb(255,180,180)";
		bool = false;
	}
	if (urlS.value == "") {
		if (alerte) alert("Entrez l'url du smiley.");
		else urlS.style.background = "rgb(255,180,180)";
		bool = false;
	}
	return bool;
}

function verifModifierSmiley() {
	var racS = document.getElementById("raccourci_sml");
	var urlS = document.getElementById("url_sml");
	if (verifSmiley(racS, urlS, 1)) {
		Mega_smileys[Mega_id] = new Array(racS.value, formatSmiley(racS.value), urlS.value);
		GM_setValue("smiley#liste", Mega_smileys.join());
		document.getElementById("gestionSmlModif").style.display = "none";
	}
}

function modifierSmiley() {
	document.getElementById("raccourci_sml").value = Mega_smileys[Mega_id][0];
	document.getElementById("url_sml").value = Mega_smileys[Mega_id][2];
	document.getElementById("gestionSmlModif").style.display = "block";
}

function verifAjouterSmiley() {
	var table = document.getElementById("grilleSmiley");
	var tr = table.getElementsByTagName("tr");
	var nb = tr.length - 1;
	for (var i = 0; i < nb; i++) {
		var racS = tr[i].getElementsByTagName("input")[0];
			racS.style.background = "#FFF";
		var urlS = tr[i].getElementsByTagName("input")[1];
			urlS.style.background = "#FFF";
		if (verifSmiley(racS, urlS, 0)) {
			var trouve = false;
			for (u = 0; u < Mega_smileys.length; u++) {
				if (Mega_smileys[u][0] == racS.value) trouve = true;
			}
			if (!trouve) Mega_smileys.push(new Array(racS.value, formatSmiley(racS.value), urlS.value));
			table.removeChild(tr[i]);
			i--;
			nb--;
		}
	}
	GM_setValue("smiley#liste", Mega_smileys.join());
	if (table.getElementsByTagName("tr").length == 1)
	document.getElementById("gestionSmlAjout").style.display = "none";
}

function ajouterSmiley() {
	disappear();
	document.getElementById("grilleSmiley").innerHTML = "";
	addTableRowSmiley();
	document.getElementById("gestionSmlAjout").style.display = "block";
}

function supprimerSmiley() {
	Mega_smileys.splice(Mega_id, 1);
	if (Mega_smileys.length == 0) GM_deleteValue("smiley#liste");
	else GM_setValue("smiley#liste", Mega_smileys.join());
	smiley();
}

function smiley_detail() {
	document.getElementById("modifier").style.visibility = "visible";
	document.getElementById("supprimer").style.visibility = "visible";
	if (Mega_id != "") document.getElementById(Mega_id).style.border = "1px dotted rgb(50,50,50)";
	this.style.border = "1px dotted white";
	Mega_id = this.id;
	var img = document.createElement("img");
		img.src = Mega_smileys[this.id][2];
	document.getElementById("aper").innerHTML = "";
	document.getElementById("aper").appendChild(img);
}

function addTableRowSmiley() {
	var parent = document.getElementById("grilleSmiley");
	if (this == parent.lastChild || this == "[object XPCNativeWrapper [object Window]]") {
		var tr = document.createElement("tr");
			tr.addEventListener("keypress", addTableRowSmiley, false);
		var td = document.createElement("td");
			td.style.paddingBottom = "5px";
		var text = document.createElement("input");
			text.type = "text";
			text.maxLength = 12;
			text.style.width = "130px";
		td.appendChild(text);
		tr.appendChild(td);
		var td = document.createElement("td");
			td.style.paddingBottom = "5px";
		var text = document.createElement("input");
			text.type = "text";
			text.style.width = "500px";
		td.appendChild(text);
		tr.appendChild(td);
		var td = document.createElement("td");
			td.style.paddingBottom = "5px";
			td.style.visibility = "hidden";
		var img = document.createElement("img");
			img.src = "http://www.noelshack.com/up/aac/fermer-copie-6fe919bf44.png";
			img.title = "Supprimer cette ligne";
			img.style.background = "#FFF";
			img.style.cursor = "pointer";
			img.setAttribute("onmouseover", "this.style.background = 'rgb(60,60,60)'");
			img.setAttribute("onmouseout", "this.style.background = '#FFF'");
			img.addEventListener("click", removeTableRow, false);
		td.appendChild(img);
		tr.appendChild(td);
		if (this == parent.lastChild) {
			this.lastChild.style.visibility = "visible";
			this.getElementsByTagName("td")[0].style.borderBottom = "1px dashed #FFF";
			this.getElementsByTagName("td")[1].style.borderBottom = "1px dashed #FFF";
			this.getElementsByTagName("td")[2].style.borderBottom = "1px dashed #FFF";
		}
		parent.appendChild(tr);
	}
}

function cadreSmileyAjout() {
	var cadre = document.createElement("div");
		cadre.id = "gestionSmlAjout";
		cadre.style.display = "none";
		cadre.style.border = "3px solid rgb(60,60,60)";
		cadre.style.background = "rgb(150,150,150)";
		cadre.style.paddingBottom = "4px";
		cadre.style.position = "fixed";
		cadre.style.zIndex = "2";
		cadre.style.left = window.innerWidth / 2 - 350 + "px";
		cadre.style.top = window.innerHeight / 2 - 150 + "px";
	var div = document.createElement("div");
		div.align = "right";
		div.style.background = "rgb(60,60,60)";
	var span = document.createElement("b");
		span.innerHTML = "Ajouter des smileys";
		span.style.color = "#FFF";
		span.style.fontSize = "17px";
		span.style.marginRight = "255px";
		span.style.display = "block";
	div.appendChild(span);
	var img = document.createElement("img");
		img.src = "http://www2.noelshack.com/uploads/fermeture033943.png";
		img.title = "Fermer";
		img.style.margin = "-20px 1px 2px 0px";
		img.style.cursor = "pointer";
		img.setAttribute("onclick", "document.getElementById('gestionSmlAjout').style.display = 'none'");
	div.appendChild(img);
	cadre.appendChild(div);
	var table = document.createElement("table");
	var tr = document.createElement("tr");
	var th = document.createElement("th");
		th.align = "center";
		th.innerHTML = "Raccourci";
		th.style.color = "white";
		th.style.width = "130px";
	tr.appendChild(th);
	var th = document.createElement("th");
		th.align = "center";
		th.innerHTML = "Url du smiley";
		th.style.color = "white";
		th.style.width = "500px";
	tr.appendChild(th);
	table.appendChild(tr);
	cadre.appendChild(table);
	var table = document.createElement("table");
		table.id = "grilleSmiley";
		table.style.borderBottom = "2px solid rgb(60,60,60)";
		table.style.overflow = "auto";
		table.style.maxHeight = "310px";
		table.style.display = "block";
		table.style.padding = "0px 20px 2px 0px";
		table.style.marginBottom = "4px";
	cadre.appendChild(table);
	var span = document.createElement("b");
		span.innerHTML = "N'entrez pas d'url invalide pour tester le programme, car il n'effectue pas de vérification.";
		span.style.color = "#FFF";
		span.style.marginLeft = "4px";
	var bouton = document.createElement("input");
		bouton.type = "submit";
		bouton.value = "ENREGISTRER";
		bouton.style.fontSize = "9px";
		bouton.style.fontWeight = "bold";
		bouton.style.marginLeft = "84px";
		bouton.addEventListener("click", verifAjouterSmiley, false);
	cadre.appendChild(span);
	cadre.appendChild(bouton);
	document.getElementById("col1").appendChild(cadre);
}

function cadreSmileyModif() {
	var cadre = document.createElement("div");
		cadre.id = "gestionSmlModif";
		cadre.style.display = "none";
		cadre.style.border = "3px solid rgb(60,60,60)";
		cadre.style.background = "rgb(150,150,150)";
		cadre.style.position = "fixed";
		cadre.style.zIndex = "2";
		cadre.style.left = window.innerWidth / 2 - 150 + "px";
		cadre.style.top = window.innerHeight / 2 - 150 + "px";
	var div = document.createElement("div");
		div.align = "right";
		div.style.background = "rgb(60,60,60)";
	var span = document.createElement("b");
		span.innerHTML = "Modification de smiley";
		span.style.color = "#FFF";
		span.style.fontSize = "17px";
		span.style.marginRight = "120px";
		span.style.display = "block";
	div.appendChild(span);
	var img = document.createElement("img");
		img.src = "http://www2.noelshack.com/uploads/fermeture033943.png";
		img.title = "Fermer";
		img.style.margin = "-20px 1px 2px 0px";
		img.style.cursor = "pointer";
		img.setAttribute("onclick", "document.getElementById('gestionSmlModif').style.display = 'none'");
	div.appendChild(img);
	cadre.appendChild(div);
	var table = document.createElement("table");
		table.style.width = "100%";
	var tr = document.createElement("tr");
	var td = document.createElement("td");
		td.style.padding = "8px 2px 1px 4px";
	var span = document.createElement("span");
		span.innerHTML = "Raccourci :";
		span.style.color = "white";
		span.style.fontWeight = "bold";
	td.appendChild(span);
	tr.appendChild(td);
	var td = document.createElement("td");
		td.style.padding = "8px 4px 1px 2px";
	var text = document.createElement("input");
		text.id = "raccourci_sml";
		text.type = "text";
		text.maxLength = 12;
		text.style.width = "100px";
	td.appendChild(text);
	tr.appendChild(td);
	table.appendChild(tr);
	var tr = document.createElement("tr");
	var td = document.createElement("td");
		td.style.padding = "1px 2px 3px 4px";
	var span = document.createElement("span");
		span.innerHTML = "Url du smiley :";
		span.style.color = "white";
		span.style.fontWeight = "bold";
	td.appendChild(span);
	tr.appendChild(td);
	var td = document.createElement("td");
		td.style.padding = "1px 4px 3px 2px";
	var text = document.createElement("input");
		text.id = "url_sml";
		text.type = "text";
		text.style.width = "300px";
	td.appendChild(text);
	tr.appendChild(td);
	table.appendChild(tr);
	cadre.appendChild(table);
	var bouton = document.createElement("input");
		bouton.type = "submit";
		bouton.align = "center";
		bouton.value = "ENREGISTRER LES MODIFICATIONS";
		bouton.style.fontSize = "9px";
		bouton.style.fontWeight = "bold";
		bouton.style.margin = "2px 100px";
		bouton.addEventListener("click", verifModifierSmiley, false);
	cadre.appendChild(bouton);
	document.getElementById("col1").appendChild(cadre);
}

function smiley() {
	Mega_id = "";
	var cadre = document.getElementById("ssmenu");
		cadre.innerHTML = "";
	var table = document.createElement("table");
	var tr = document.createElement("tr");
	var td = document.createElement("td");
		td.style.verticalAlign = "top";
	var fieldset = document.createElement("fieldset");
		fieldset.style.height = "180px";
		fieldset.style.width = "120px";
		fieldset.style.margin = "6px 5px 10px 10px";
		fieldset.style.paddingRight = "4px";
		fieldset.style.border = "1px solid white";
	var legend = document.createElement("legend");
		legend.style.fontSize = "10px";
		legend.style.fontWeight = "bold";
		legend.style.margin = "0px 4px";
		legend.style.padding = "0px 4px";
		legend.innerHTML = "Mes smileys";
	var div = document.createElement("div");
		div.id = "general";
		div.style.maxHeight = "163px";
		div.style.overflow = "auto";
	fieldset.appendChild(legend);
	fieldset.appendChild(div);
	td.appendChild(fieldset);
	tr.appendChild(td);
	
	var td = document.createElement("td");
		td.style.verticalAlign = "top";
	var fieldset = document.createElement("fieldset");
		fieldset.style.height = "150px";
		fieldset.style.margin = "6px 10px 10px 5px";
		fieldset.style.border = "1px solid white";
	var legend = document.createElement("legend");
		legend.style.fontSize = "10px";
		legend.style.fontWeight = "bold";
		legend.style.margin = "0px 4px";
		legend.style.padding = "0px 4px";
		legend.innerHTML = "Aperçu";
	fieldset.appendChild(legend);
	var minTable = document.createElement("table");
		minTable.style.width = "100%";
	var minTr = document.createElement("tr");
	var minTd = document.createElement("td");
		minTd.id = "aper";
		minTd.align = "center";
		minTd.style.height = "130px";
		minTd.style.verticalAlign = "center";
	minTr.appendChild(minTd);
	minTable.appendChild(minTr);
	fieldset.appendChild(minTable);
	td.appendChild(fieldset);
	
	var bouton = document.createElement("input");
		bouton.type = "submit";
		bouton.style.height = "18px";
		bouton.style.marginLeft = "5px";
		bouton.style.fontSize = "8px";
		bouton.style.fontWeight = "bold";
		bouton.value = "NOUVEAU";
		bouton.addEventListener("click", ajouterSmiley, false);
	td.appendChild(bouton);
	var bouton = document.createElement("input");
		bouton.id = "modifier";
		bouton.type = "submit";
		bouton.style.height = "18px";
		bouton.style.marginLeft = "10px";
		bouton.style.fontSize = "8px";
		bouton.style.fontWeight = "bold";
		bouton.style.visibility = "hidden";
		bouton.value = "MODIFIER";
		bouton.addEventListener("click", modifierSmiley, false);
	td.appendChild(bouton);
	var bouton = document.createElement("input");
		bouton.id = "supprimer";
		bouton.type = "submit";
		bouton.style.height = "18px";
		bouton.style.margin = "0px 8px 0px 10px";
		bouton.style.fontSize = "8px";
		bouton.style.fontWeight = "bold";
		bouton.style.visibility = "hidden";
		bouton.value = "SUPPRIMER";
		bouton.addEventListener("click", supprimerSmiley, false);
	td.appendChild(bouton);
	
	tr.appendChild(td);
	table.appendChild(tr);
	cadre.appendChild(table);
	
	var obj = document.getElementById("general");
	for (var i = 0; i < Mega_smileys.length; i++) {
		var div = document.createElement("div");
			div.id = i;
			div.align = "left";
			div.style.fontSize = "11px";
			div.style.paddingLeft = "4px";
			div.style.margin = "2px 4px";
			div.style.cursor = "pointer";
			div.style.border = "1px dotted rgb(50,50,50)";
			div.innerHTML = Mega_smileys[i][0];
			div.addEventListener("click", smiley_detail, false);
			div.setAttribute("onmouseover", "this.style.background = 'rgb(150,150,150)'");
			div.setAttribute("onmouseout", "this.style.background = ''");
			obj.appendChild(div);
	}
}

function changerSkin() {
	var bool = GM_getValue(Mega_skins[Mega_id][2], 0);
	if (bool) {
		GM_setValue(Mega_skins[Mega_id][2], 0);
		GM_deleteValue("skin#active");
		document.getElementById("valider").value = "ACTIVER";
		document.getElementById("etat").innerHTML = "Skin activé : Aucun";
	} else {
		GM_setValue(Mega_skins[Mega_id][2], 1);
		GM_setValue("skin#active", Mega_skins[Mega_id][0]);
		document.getElementById("valider").value = "DESACTIVER";
		document.getElementById("etat").innerHTML = "Skin activé : " + Mega_skins[Mega_id][0];
	}
}

function skins_detail() {
	document.getElementById("valider").style.visibility = "visible";
	if (Mega_id != "") document.getElementById(Mega_id).style.border = "1px dotted rgb(50,50,50)";
	this.style.border = "1px dotted white";
	Mega_id = this.id;
	var img = document.createElement("img");
		img.src = Mega_skins[this.id][1];
	document.getElementById("aper").innerHTML = "";
	document.getElementById("aper").appendChild(img);
	var statut = GM_getValue(Mega_skins[this.id][2], 0);
	var btn = document.getElementById("valider");
	if (statut) btn.value = "DESACTIVER";
	else btn.value = "ACTIVER";
}

function skins() {
	Mega_id = "";
	var cadre = document.getElementById("ssmenu");
		cadre.innerHTML = "";
	var table = document.createElement("table");
	var tr = document.createElement("tr");
	var td = document.createElement("td");
		td.style.verticalAlign = "top";
	var fieldset = document.createElement("fieldset");
		fieldset.id = "listeskins";
		fieldset.style.width = "120px";
		fieldset.style.height = "180px";
		fieldset.style.margin = "6px 5px 10px 10px";
		fieldset.style.border = "1px solid white";
	var legend = document.createElement("legend");
		legend.style.fontSize = "10px";
		legend.style.fontWeight = "bold";
		legend.style.margin = "0px 4px";
		legend.style.padding = "0px 4px";
		legend.innerHTML = "Skins";
	fieldset.appendChild(legend);
	td.appendChild(fieldset);
	tr.appendChild(td);
	
	var td = document.createElement("td");
		td.style.verticalAlign = "top";
	var fieldset = document.createElement("fieldset");
		fieldset.style.width = "260px";
		fieldset.style.height = "150px";
		fieldset.style.margin = "6px 10px 10px 5px";
		fieldset.style.border = "1px solid white";
	var legend = document.createElement("legend");
		legend.style.fontSize = "10px";
		legend.style.fontWeight = "bold";
		legend.style.margin = "0px 4px";
		legend.style.padding = "0px 4px";
		legend.innerHTML = "Aperçu";
	fieldset.appendChild(legend);
	var minTable = document.createElement("table");
		minTable.style.width = "100%";
	var minTr = document.createElement("tr");
	var minTd = document.createElement("td");
		minTd.id = "aper";
		minTd.align = "center";
		minTd.style.height = "130px";
		minTd.style.verticalAlign = "center";
	minTr.appendChild(minTd);
	minTable.appendChild(minTr);
	fieldset.appendChild(minTable);
	td.appendChild(fieldset);
	var minTable = document.createElement("table");
		minTable.style.width = "100%";
		minTable.style.fontSize = "11px";
		minTable.style.fontWeight = "bold";
	var minTr = document.createElement("tr");
	var minTd = document.createElement("td");
		minTd.align = "left";
	var etat = document.createElement("div");
		etat.id = "etat";
		etat.innerHTML = GM_getValue("skin#active", 0) ? "Skin activé : " + GM_getValue("skin#active", "Aucun") : "Skin activé : Aucun";
	minTd.appendChild(etat);
	minTr.appendChild(minTd);
	var minTd = document.createElement("td");
		minTd.align = "right";
	var valider = document.createElement("input");
		valider.id = "valider";
		valider.type = "submit";
		valider.style.height = "18px";
		valider.style.margin = "0px 5px";
		valider.style.fontSize = "8px";
		valider.style.fontWeight = "bold";
		valider.style.visibility = "hidden";
		valider.value = "ACTIVER";
		valider.addEventListener("click", changerSkin, false);
	minTd.appendChild(valider);
	minTr.appendChild(minTd);
	minTable.appendChild(minTr);
	td.appendChild(minTable);
	
	tr.appendChild(td);
	table.appendChild(tr);
	cadre.appendChild(table);
	
	var obj = document.getElementById("listeskins");
	for (var i = 0; i < Mega_skins.length; i++) {
		var div = document.createElement("div");
			div.id = i;
			div.align = "left";
			div.style.fontSize = "11px";
			div.style.paddingLeft = "4px";
			div.style.margin = "2px 4px";
			div.style.cursor = "pointer";
			div.style.border = "1px dotted rgb(50,50,50)";
			div.innerHTML = Mega_skins[i][0];
			div.addEventListener("click", skins_detail, false);
			div.setAttribute("onmouseover", "this.style.background = 'rgb(150,150,150)'");
			div.setAttribute("onmouseout", "this.style.background = ''");
			obj.appendChild(div);
	}
}

function changerOption() {
	var id = this.id.substr(4);
	if (this.id.match("vrai")) {
		this.style.display = "none";
		document.getElementById("img"+this.id).style.display = "inline";
		document.getElementById("imgfaux"+id).style.display = "none";
		document.getElementById("faux"+id).style.display = "inline";
		document.getElementById("faux"+id).checked = false;
		GM_setValue(Mega_extra[id][2], 1);
		Mega_extra[id][1] = 1;
	} else {
		this.style.display = "none";
		document.getElementById("img"+this.id).style.display = "inline";
		document.getElementById("imgvrai"+id).style.display = "none";
		document.getElementById("vrai"+id).style.display = "inline";
		document.getElementById("vrai"+id).checked = false;
		GM_setValue(Mega_extra[id][2], 0);
		Mega_extra[id][1] = 0;
	}
}

function extra() {
	var cadre = document.getElementById("ssmenu");
		cadre.align = "left";
		cadre.innerHTML = "";
		cadre.style.minWidth = "250px";
	for (i = 0; i < Mega_extra.length; i++) {
		var minDiv = document.createElement("div");
			minDiv.style.margin = "0px";
			minDiv.style.padding = "0px 2px";
		var input = document.createElement("input");
			input.id = "vrai" + i;
			input.type = "radio";
			input.style.display = Mega_extra[i][1] ? "none" : "inline";
			input.addEventListener("click", changerOption, false);
		minDiv.appendChild(input);
		var img = document.createElement("img");
			img.id = "imgvrai" + i;
			img.src = "http://www.noelshack.com/up/aab/oui-2f8622ce72.png";
			img.style.marginBottom = "-1px";
			img.style.marginLeft = "4px";
			img.style.display = Mega_extra[i][1] ? "inline" : "none";
		minDiv.appendChild(img);
		var input = document.createElement("input");
			input.id = "faux" + i;
			input.type = "radio";
			input.style.display = Mega_extra[i][1] ? "inline" : "none";
			input.addEventListener("click", changerOption, false);
		minDiv.appendChild(input);
		var img = document.createElement("img");
			img.id = "imgfaux" + i;
			img.src = "http://www.noelshack.com/up/aab/nonnon-a41b4d1637.png";
			img.style.marginBottom = "-1px";
			img.style.display = Mega_extra[i][1] ? "none" : "inline";
		minDiv.appendChild(img);
		var span = document.createElement("span");
			span.style.fontSize = "12px";
			span.style.margin = "-13px 5px 5px 45px";
			span.style.display = "block";
			span.style.cursor = "default";
			span.innerHTML = Mega_extra[i][0];
		minDiv.appendChild(span);
		cadre.appendChild(minDiv);
	}
}

function ajouterTopic() {
	var temp = location.href.toString().split("-");
		temp[3] = 0;
	var url = temp.join().replace(/,/g, "-");
	var trouve = false;
	
	for (i = 0; i < Mega_topics.length; i++) {
		if (Mega_topics[i][1] == url) trouve = true;
	}
	
	if (!trouve) {
		var titreF = document.getElementById("col1").getElementsByTagName("h3")[0].innerHTML.replace("<span class=\"txt\">Forum : </span>", "");
		var titreT = document.getElementById("col1").getElementsByTagName("h4")[0].innerHTML.replace("<span>Sujet : </span>«&nbsp;", "");
			titreT = titreT.replace("&nbsp;»", "");
		Mega_topics.push(new Array(titreT, url, titreF));
		GM_setValue("topic#liste", Mega_topics.join());
		if (Mega_selected == "topic") topics();
	}
}

function supprimerTopic() {
	Mega_topics.splice(this.id.substr(1), 1);
	if (Mega_topics.length == 0) GM_deleteValue("topic#liste");
	else GM_setValue("topic#liste", Mega_topics.join());
	topics();
}

function topics() {
	var cadre = document.getElementById("ssmenu");
		cadre.align = "left";
		cadre.innerHTML = "";
		cadre.style.minWidth = "250px";
	var minCadre = document.createElement("div");
		minCadre.style.maxHeight = "400px";
		minCadre.style.overflow = "auto";
	if (Mega_topics.length == 0) {
		var i = document.createElement("i");
			i.innerHTML = " ---------------------------- La liste est vide ---------------------------- ";
		minCadre.appendChild(i);
	} else {
		Mega_topics = Mega_topics.sort();
		for (var i = 0; i < Mega_topics.length; i++) {
			var minDiv = document.createElement("div");
				minDiv.style.margin = "0px";
				minDiv.style.padding = "0px 2px";
				minDiv.style.borderTop = '1px dashed rgb(50,50,50)';
				minDiv.style.borderBottom = '1px dashed rgb(50,50,50)';
				minDiv.setAttribute("onmouseover", "this.style.borderTop = '1px dashed rgb(150,150,150)'; this.style.borderBottom = '1px solid rgb(150,150,150)'; this.getElementsByTagName('img')[1].style.visibility = 'visible'; this.getElementsByTagName('img')[2].style.visibility = 'visible';");
				minDiv.setAttribute("onmouseout", "this.style.borderTop = '1px dashed rgb(50,50,50)'; this.style.borderBottom = '1px solid rgb(50,50,50)'; this.getElementsByTagName('img')[1].style.visibility = 'hidden'; this.getElementsByTagName('img')[2].style.visibility = 'hidden';");
			var img = document.createElement("img");
				img.style.margin = "0px 8px -3px 4px";
				img.src = "http://image.jeuxvideo.com/css_img/defaut/puce_liste_bleue.gif";
			minDiv.appendChild(img);
			var a = document.createElement("a");
				a.className = "tlf";
				a.innerHTML = Mega_topics[i][0];
				a.href = Mega_topics[i][1];
				a.title = Mega_topics[i][2];
				//a.addEventListener("click", disappear, true);
			minDiv.appendChild(a);
			var a = document.createElement("a");
				a.href = (Mega_extra[8][1] && Mega_pseudos.length > 0) ? "http://www.jeuxvideo.com/cgi-bin/admin/logout.cgi?url=" + Mega_topics[i][1].replace("/1-", "/3-") : Mega_topics[i][1].replace("/1-", "/3-");
				a.addEventListener("click", disappear, true);
			var img = document.createElement("img");
				img.align = "right";
				img.title = "Répondre";
				img.style.margin = "-12px 20px 0px 15px";
				img.src = "http://www.noelshack.com/up/aab/reponse-d4f3c89e55.png";
				img.style.cursor = "pointer";
				img.style.background = "white";
				img.setAttribute("onmouseover", "this.style.background = 'yellow'");
				img.setAttribute("onmouseout", "this.style.background = 'white'");
				img.style.visibility = "hidden";
			a.appendChild(img);
			minDiv.appendChild(a);
			var img = document.createElement("img");
				img.id = "S" + i;
				img.align = "right";
				img.title = "Supprimer ce topic";
				img.style.margin = "-12px 5px 0px 15px";
				img.src = "http://www.noelshack.com/up/aab/fermer-b43081ef5.png";
				img.style.cursor = "pointer";
				img.style.background = "white";
				img.setAttribute("onmouseover", "this.style.background = 'yellow'");
				img.setAttribute("onmouseout", "this.style.background = 'white'");
				img.style.visibility = "hidden";
				img.addEventListener("click", supprimerTopic, false);
			minDiv.appendChild(img);
			minCadre.appendChild(minDiv);
		}
	}
	cadre.appendChild(minCadre);
}

function ajouterFavori() {
	var url = "http://www.jeuxvideo.com/forums/0-" + self.location.href.split("-")[1] + "-0-1-0-1-0-0.htm";
	var trouve = false;
	
	for (i = 0; i < Mega_favoris.length; i++) {
		if (Mega_favoris[i][1] == url) trouve = true;
	}
	
	if (!trouve) {
		var titre = document.getElementById("col1").getElementsByTagName("h3")[0].innerHTML.replace("Forum : ", "");
		Mega_favoris.push(new Array(titre, url));
		GM_setValue("forum#liste", Mega_favoris.join());
		if (Mega_selected == "forum") favoris();
		favorisBis();
	}
	return false;
}

function supprimerFavori() {
	Mega_favoris.splice(this.id.substr(1), 1);
	if (Mega_favoris.length == 0) GM_deleteValue("forum#liste");
	else GM_setValue("forum#liste", Mega_favoris.join());
	favoris();
	favorisBis();
}

function favoris() {
	var cadre = document.getElementById("ssmenu");
		cadre.align = "left";
		cadre.innerHTML = "";
		cadre.style.minWidth = "250px";
	var minCadre = document.createElement("div");
		minCadre.style.maxHeight = "400px";
		minCadre.style.overflow = "auto";
	Mega_favoris = Mega_favoris.sort();
	for (var i = 0; i < Mega_favoris.length; i++) {
		var minDiv = document.createElement("div");
			minDiv.style.margin = "0px";
			minDiv.style.padding = "0px 2px";
			minDiv.style.borderTop = '1px dashed rgb(50,50,50)';
			minDiv.style.borderBottom = '1px dashed rgb(50,50,50)';
			minDiv.setAttribute("onmouseover", "this.style.borderTop = '1px dashed rgb(150,150,150)'; this.style.borderBottom = '1px solid rgb(150,150,150)'; this.getElementsByTagName('img')[1].style.visibility = 'visible';");
			minDiv.setAttribute("onmouseout", "this.style.borderTop = '1px dashed rgb(50,50,50)'; this.style.borderBottom = '1px solid rgb(50,50,50)'; this.getElementsByTagName('img')[1].style.visibility = 'hidden';");
		var img = document.createElement("img");
			img.style.margin = "0px 8px -3px 4px";
			img.src = "http://image.jeuxvideo.com/css_img/defaut/puce_liste_bleue.gif";
		minDiv.appendChild(img);
		var a = document.createElement("a");
			a.className = "tlf";
			a.href = Mega_favoris[i][1];
			a.innerHTML = Mega_favoris[i][0];
			//a.addEventListener("click", disappear, true);
		minDiv.appendChild(a);
		var img = document.createElement("img");
			img.id = "S" + i;
			img.align = "right";
			img.title = "Supprimer ce forum";
			img.style.margin = "-12px 5px 0px 15px";
			img.src = "http://www.noelshack.com/up/aab/fermer-b43081ef5.png";
			img.style.cursor = "pointer";
			img.style.background = "white";
			img.setAttribute("onmouseover", "this.style.background = 'yellow'");
			img.setAttribute("onmouseout", "this.style.background = 'white'");
			img.style.visibility = "hidden";
			img.addEventListener("click", supprimerFavori, false);
		minDiv.appendChild(img);
		minCadre.appendChild(minDiv);
	}
	cadre.appendChild(minCadre);
	var minDiv = document.createElement("div");
		minDiv.style.margin = "0px";
		minDiv.style.padding = "0px 2px 2px 2px";
	var img = document.createElement("img");
		img.style.margin = "0px 6px -2px 4px";
		img.src = "http://image.jeuxvideo.com/css_img/defaut/puce_base2.gif";
	minDiv.appendChild(img);
	var a = document.createElement("a");
		a.className = "tlf";
		a.innerHTML = "Tous les forums";
		a.href = "http://www.jeuxvideo.com/forums.htm";
		//a.addEventListener("click", disappear, true);
	minDiv.appendChild(a);
	cadre.appendChild(minDiv);
}

function changerEtat() {
	var bool = GM_getValue(Mega_fcts[Mega_id][3], 0);
	if (bool) {
		GM_setValue(Mega_fcts[Mega_id][3], 0);
		document.getElementById("valider").value = "ACTIVER";
		document.getElementById("etat").innerHTML = "Etat : Désactivé";
	} else {
		GM_setValue(Mega_fcts[Mega_id][3], 1);
		document.getElementById("valider").value = "DESACTIVER";
		document.getElementById("etat").innerHTML = "Etat : Activé";
	}
}

function fcts_detail() {
	document.getElementById("valider").style.visibility = "visible";
	if (Mega_id != "") document.getElementById(Mega_id).style.border = "1px dotted rgb(50,50,50)";
	this.style.border = "1px dotted white";
	Mega_id = this.id;
	document.getElementById("desc").innerHTML = Mega_fcts[this.id][1];
	var top = screen.height / 2 - 400;
	var left = screen.width / 2 - 440;
	var img = document.createElement("img");
		img.src = Mega_fcts[this.id][2];
		img.alt = Mega_fcts[this.id][4];
		img.style.cursor = "pointer";
		img.setAttribute("onclick", "window.open(this.alt,'profil','toolbar=no,location=no,directories=no,status=no,scrollbars=yes,resizable=no,copyhistory=no,width=880,height=600,top="+top+",left="+left+"');return false;");
	document.getElementById("aper").innerHTML = "";
	document.getElementById("aper").appendChild(img);
	var statut = GM_getValue(Mega_fcts[this.id][3], 0);
	var btn = document.getElementById("valider");
	if (statut) {
		document.getElementById("etat").innerHTML = "Etat : Activé";
		btn.value = "DESACTIVER";
	} else {
		document.getElementById("etat").innerHTML = "Etat : Désactivé";
		btn.value = "ACTIVER";
	}
}

function fonctions() {
	Mega_id = "";
	var cadre = document.getElementById("ssmenu");
		cadre.innerHTML = "";
	var table = document.createElement("table");
	var tr = document.createElement("tr");
	var td = document.createElement("td");
		td.style.verticalAlign = "top";
	var fieldset = document.createElement("fieldset");
		fieldset.id = "fonc";
		fieldset.style.width = "120px";
		fieldset.style.height = "180px";
		fieldset.style.margin = "6px 5px 10px 10px";
		fieldset.style.border = "1px solid white";
	var legend = document.createElement("legend");
		legend.style.fontSize = "10px";
		legend.style.fontWeight = "bold";
		legend.style.margin = "0px 4px";
		legend.style.padding = "0px 4px";
		legend.innerHTML = "Fonctions";
	fieldset.appendChild(legend);
	td.appendChild(fieldset);
	tr.appendChild(td);
	
	var td = document.createElement("td");
		td.style.verticalAlign = "top";
	var fieldset = document.createElement("fieldset");
		fieldset.style.width = "260px";
		fieldset.style.height = "50px";
		fieldset.style.margin = "6px 10px 10px 5px";
		fieldset.style.border = "1px solid white";
	var legend = document.createElement("legend");
		legend.style.fontSize = "10px";
		legend.style.fontWeight = "bold";
		legend.style.margin = "0px 4px";
		legend.style.padding = "0px 4px";
		legend.innerHTML = "Description";
	fieldset.appendChild(legend);
	var contenu = document.createElement("div");
		contenu.id = "desc";
		contenu.align = "left";
		contenu.style.margin = 0;
		contenu.style.padding = "0px 5px";
	fieldset.appendChild(contenu);
	td.appendChild(fieldset);
	
	var fieldset = document.createElement("fieldset");
		fieldset.style.width = "260px";
		fieldset.style.height = "90px";
		fieldset.style.margin = "6px 10px 10px 5px";
		fieldset.style.border = "1px solid white";
	var legend = document.createElement("legend");
		legend.style.fontSize = "10px";
		legend.style.fontWeight = "bold";
		legend.style.margin = "0px 4px";
		legend.style.padding = "0px 4px";
		legend.innerHTML = "Aperçu - Cliquer pour des explications";
	fieldset.appendChild(legend);
	var minTable = document.createElement("table");
		minTable.style.width = "100%";
	var minTr = document.createElement("tr");
	var minTd = document.createElement("td");
		minTd.id = "aper";
		minTd.align = "center";
		minTd.style.height = "70px";
		minTd.style.verticalAlign = "center";
	minTr.appendChild(minTd);
	minTable.appendChild(minTr);
	fieldset.appendChild(minTable);
	td.appendChild(fieldset);
	
	var minTable = document.createElement("table");
		minTable.style.width = "100%";
		minTable.style.fontSize = "11px";
		minTable.style.fontWeight = "bold";
	var minTr = document.createElement("tr");
	var minTd = document.createElement("td");
		minTd.align = "left";
	var etat = document.createElement("div");
		etat.id = "etat";
		etat.innerHTML = "Etat :";
	minTd.appendChild(etat);
	minTr.appendChild(minTd);
	var minTd = document.createElement("td");
		minTd.align = "right";
	var valider = document.createElement("input");
		valider.id = "valider";
		valider.type = "submit";
		valider.style.height = "18px";
		valider.style.margin = "0px 5px";
		valider.style.fontSize = "8px";
		valider.style.fontWeight = "bold";
		valider.style.visibility = "hidden";
		valider.value = "ACTIVER";
		valider.addEventListener("click", changerEtat, false);
	minTd.appendChild(valider);
	minTr.appendChild(minTd);
	minTable.appendChild(minTr);
	td.appendChild(minTable);
	
	tr.appendChild(td);
	table.appendChild(tr);
	cadre.appendChild(table);
	
	var obj = document.getElementById("fonc");
	for (var i = 0; i < Mega_fcts.length; i++) {
		var div = document.createElement("div");
			div.id = i;
			div.align = "left";
			div.style.fontSize = "11px";
			div.style.paddingLeft = "4px";
			div.style.margin = "2px 4px";
			div.style.cursor = "pointer";
			div.style.border = "1px dotted rgb(50,50,50)";
			div.innerHTML = Mega_fcts[i][0];
			div.addEventListener("click", fcts_detail, false);
			div.setAttribute("onmouseover", "this.style.background = 'rgb(150,150,150)'");
			div.setAttribute("onmouseout", "this.style.background = ''");
			obj.appendChild(div);
	}
}

function NoelShack() {
	document.getElementById("rech").style.position = "relative";
	document.getElementById("rech").style.top = 0;
	var table = document.createElement("table");
		table.style.width = "100%";
		table.style.marginTop = "6px";
	var tr = document.createElement("tr");
	var td = document.createElement("td");
		td.style.height = "90px";
		td.style.width = "246px";
		td.innerHTML = document.getElementById("recherche").innerHTML;
	tr.appendChild(td);
	var td = document.createElement("td");
	var div = document.createElement("div");
		div.id = "megashack";
		div.style.height = "90px";
		div.style.border = "1px solid rgb(219,0,0)";
		div.style.background = "url(http://www.noelshack.com/up/aac/ba-5fddaa8f3.png) repeat-x";
		div.style.width = "99%";
	var minTable = document.createElement("table");
		minTable.style.width = "100%";
		minTable.style.marginLeft = "-3px";
		minTable.style.marginTop = "-2px";
	var minTr = document.createElement("tr");
	var minTd = document.createElement("td");
		minTd.style.verticalAlign = "top";
	var img = document.createElement("img");
		img.src = "http://www.noelshack.com/up/aac/ns-8ed01df680.png";
	minTd.appendChild(img);
	minTr.appendChild(minTd);
	var minTd = document.createElement("td");
		minTd.align = "center";
	var span = document.createElement("span");
		span.style.color = "#FFF";
		span.style.fontSize = "12px";
		span.style.fontWeight = "bold";
		span.style.cursor = "default";
		span.innerHTML = "Taille max. : 8 Mo<br>Formats acceptés : JPG, PNG, GIF, BMP, SWF, PSD";
	minTd.appendChild(span);
	var form = document.createElement("form");
		form.setAttribute("method", "post");
		form.setAttribute("target", "noel");
		form.setAttribute("action", "http://www.noelshack.com/index.php");
		form.setAttribute("enctype", "multipart/form-data");
		var top = screen.height / 2 - 400;
		var left = screen.width / 2 - 375;
		form.setAttribute("onsubmit", "window.open('','noel','menubar=no,toolbar=no,location=no,directories=no,status=no,scrollbars=no,resizable=no,copyhistory=no,width=750,height=800,top="+top+",left="+left+"')");
		form.style.position = "relative";
		form.style.background = "url()";
		form.style.border = "1px solid transparent";
		form.style.top = 2;
		form.style.left = 0;
		form.style.width = "100%";
	var input = document.createElement("input");
		input.id = "fichier";
		input.type = "file";
		input.name = "fichier";
		input.setAttribute("size", 28);
	form.appendChild(input);
	var input = document.createElement("input");
		input.type = "submit";
		input.name = "submit";
		input.value = "UPLOAD";
		input.style.fontSize = "8px";
		input.style.fontWeight = "bold";
		input.style.height = "18px";
		input.style.marginTop = "4px";
	form.appendChild(input);
	minTd.appendChild(form);
	minTr.appendChild(minTd);
	minTable.appendChild(minTr);
	div.appendChild(minTable);
	td.appendChild(div);
	tr.appendChild(td);
	table.appendChild(tr);
	
	document.getElementById("recherche").innerHTML = "";
	document.getElementById("recherche").appendChild(table);
}

function cadreSsMenu() {
	var cadre = document.getElementById("ssmenu");
	if (Mega_selected != this.id) {
		if (Mega_selected != "") document.getElementById(Mega_selected).style.background = "url(http://www.noelshack.com/up/aaa/milieunoir-82bafd1d33.png) repeat-x bottom";
		Mega_selected = this.id;
		for (var i = 0; i < Mega_menu.length; i++) {
			if (this.id == Mega_menu[i][2]) {
				cadre.style.left = Mega_menu[i][4];
				if (i == 4) skins(); else eval(Mega_menu[i][3] + "();");
			}
		}
		cadre.style.display = "block";
	} else {
		Mega_selected = "";
		cadre.style.display = "none";
	}
}

function onMouseOver() {
	this.style.background = "url(http://www.noelshack.com/up/aaa/survol-e958fdf426.png) repeat-x bottom";
}

function onMouseOut() {
	if (this.id != Mega_selected) this.style.background = "url(http://www.noelshack.com/up/aaa/milieunoir-82bafd1d33.png) repeat-x bottom";
}

function creationMenu() {
	var body = document.getElementsByTagName("body")[0];
	var page = document.getElementById("global");
		page.style.paddingTop = GM_getValue("#tool", 1) ? "30px" : "0px";
		page.addEventListener("click", disappear, true);
	var bloc = document.createElement("div");
		bloc.id = "barremenu";
		bloc.style.width = "100%";
		bloc.style.height = "30px";
		bloc.style.color = "white";
		bloc.style.position = "fixed";
		bloc.style.zIndex = "5";
		bloc.style.padding = "0";
		bloc.style.display = GM_getValue("#tool", 1) ? "block" : "none";
	var titre = document.createElement("b");
		titre.style.fontSize = "12px";
		titre.style.paddingRight = "10px";
		titre.innerHTML = "Jv.Mega :";
	var table = document.createElement("table");
		table.setAttribute("cellpadding", 0);
		table.setAttribute("cellspacing", 0);
		table.style.width = "100%";
	var tr = document.createElement("tr");
	var td = document.createElement("td");
		td.style.width = "55px";
		td.style.height = "25px";
		td.style.paddingTop = "2px";
		td.style.background = "url(http://www.noelshack.com/up/aaa/gauchenoir-6e5c291d95.png) no-repeat bottom left";
	tr.appendChild(td);
	var td = document.createElement("td");
		td.align = "left";
		td.style.height = "25px";
		td.style.paddingTop = "2px";
		td.style.background = "url(http://www.noelshack.com/up/aaa/milieunoir-82bafd1d33.png) repeat-x bottom";
		td.appendChild(titre);
		
	for (var i = 0; i < Mega_menu.length; i++) {
		if (Mega_menu[i][0]) {
			var titre = document.createElement("b");
				titre.id = Mega_menu[i][2];
				titre.style.height = "25px";
				titre.style.fontSize = "12px";
				titre.style.padding = "6px 20px 4px 20px";
				titre.addEventListener("mouseover", onMouseOver, true);
				titre.addEventListener("mouseout", onMouseOut, true);
				if (i == Mega_menu.length - 1) titre.addEventListener("click", eval(Mega_menu[i][3]), false);
				else titre.addEventListener("click", cadreSsMenu, false);
				titre.style.cursor = "pointer";
				titre.innerHTML = Mega_menu[i][1];
			td.appendChild(titre);
		}
	} tr.appendChild(td);
	
	var td = document.createElement("td");
		td.style.width = "55px";
		td.style.height = "25px";
		td.style.paddingTop = "2px";
		td.style.background = "url(http://www.noelshack.com/up/aaa/droitenoir-7854c1e186.png) no-repeat bottom right";
	tr.appendChild(td);
	table.appendChild(tr);
	bloc.appendChild(table);
	
	var cadre = document.createElement("div");
		cadre.id = "ssmenu";
		cadre.style.color = "white";
		cadre.style.background = "rgb(50,50,50)";
		cadre.style.border = "3px double rgb(115,115,115)";
		cadre.style.position = "fixed";
		cadre.style.zIndex = "1";
		cadre.style.top = "26px";
		cadre.style.display = "none";
	
	body.insertBefore(bloc, page);
	body.appendChild(cadre);
	if (document.getElementById("banner")) document.getElementById("banner").parentNode.removeChild(document.getElementById("banner"));
	if (document.getElementById("pub_carre1")) document.getElementById("pub_carre1").parentNode.removeChild(document.getElementById("pub_carre1"));
	if (document.getElementById("sponsor_google")) document.getElementById("sponsor_google").parentNode.removeChild(document.getElementById("sponsor_google"));
	if (document.getElementById("fiche_infos2")) document.getElementById("fiche_infos2").parentNode.removeChild(document.getElementById("fiche_infos2"));
	if (document.getElementById("header")) document.getElementById("header").style.zIndex = 0;
	
	cadrePseudosAjout();
	cadrePseudosModif();
	cadreSmileyAjout();
	cadreSmileyModif();
	cadreApropos();
}

function disappear() {
	document.getElementById("ssmenu").style.display = "none";
	if (Mega_selected != "") document.getElementById(Mega_selected).style.background = "url(http://www.noelshack.com/up/aaa/milieunoir-82bafd1d33.png) repeat-x bottom";
	Mega_selected = "";
}

function surf(event) {
	var nb = this.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
		nb = parseInt(nb / 20 + 1);
	var url = this.parentNode.nextSibling.nextSibling.getElementsByTagName("a")[0].href;
	if (event.which == 1 && GM_getValue("extra#lastpage", 0)) url = url.replace(/(\/1\-[0-9]+\-[0-9]+\-)[0-9]+(\-)/g, "$1" + nb + "$2");
	else if (event.which == 3 && GM_getValue("extra#postpage", 0)) {
			if (GM_getValue("extra#pseudos", 0) && Mega_pseudos.length > 0)
			url = "http://www.jeuxvideo.com/cgi-bin/admin/logout.cgi?url=" + url.replace(/\/1\-([0-9]+\-[0-9]+\-)[0-9]+(\-[^"]+)/g, "/3-" + "$1" + nb + "$2");
			else
			url = url.replace(/\/1\-([0-9]+\-[0-9]+\-)[0-9]+(\-[^"]+)/g, "/3-" + "$1" + nb + "$2" + "#form_post");
		 }
	else return 0;
	window.location.href = url;
	return false;
}

function statistiques() {
	var a = document.createElement("a");
		a.href = "http://jvstats.planet-shitfliez.net/stats/inflate.php?num=" + forum;
		a.target = "_blank";
		a.innerHTML = "Statistiques";
	var li = document.createElement("li");
		li.appendChild(a);
	var bloc = document.getElementById("menu_interactif").getElementsByTagName("ul")[0];
		bloc.insertBefore(li, bloc.childNodes[1]);
}

function displayVideo(msg) {
	var a = msg.getElementsByTagName("a");
	for (var v = 0; v < a.length; v++) {
		if (a[v].href.match(/^http:\/\/www\.youtube\.com\/[^"]+/) || a[v].href.match(/^http:\/\/www\.dailymotion\.com\/[^"]+/)) {
			var object = document.createElement("object");
				object.style.display = "block";
				object.style.margin = "4px";
			var embed = document.createElement("embed");
				embed.type = "application/x-shockwave-flash";
				if (a[v].href.match(/^http:\/\/www\.youtube\.com\/[^"]+/))
				embed.src = "http://www.youtube.com/v/" + a[v].href.split("#")[0].split("=")[1] + "&hl=fr&fs=1&color1=0x3a3a3a&color2=0x999999";
				else if (a[v].href.match(/^http:\/\/www\.dailymotion\.com\/[^"]+/))
				embed.src = "http://www.dailymotion.com/swf/" + a[v].href.split("/")[4].split("_")[0] + "&colors=background:E3DEDE;special:FDFCFF;";
				embed.setAttribute("allowscriptaccess", "always");
				embed.setAttribute("allowFullScreen", "true");
				embed.style.width = "300px";
				embed.style.height = "180px";
			object.appendChild(embed);
			a[v].style.display = "none";
			msg.insertBefore(object, a[v]);
		}
	}
}

function displayImage(msg) {
	var a = msg.getElementsByTagName("a");
	for (var v = 0; v < a.length; v++) {
		if (a[v].href.match(/\.jpg$/) || a[v].href.match(/\.png$/) || a[v].href.match(/\.gif$/) || a[v].href.match(/\.bmp$/) || a[v].href.match(/\.swf$/) || a[v].href.match(/\.psd$/)) {
			var img = document.createElement("img");
				img.src = a[v].href;
				img.style.maxWidth = "300px";
				img.style.display = "block";
				img.style.margin = "4px";
				img.style.cursor = "pointer";
				img.setAttribute("onclick", "window.open(this.src)");
			a[v].style.display = "none";
			msg.insertBefore(img, a[v]);
		}
	}
}

function displaySmiley(msg) {
	for (var v = 0; v < Mega_smileys.length; v++) msg.innerHTML = msg.innerHTML.replace(new RegExp(Mega_smileys[v][1], "g"), "<img src='" + Mega_smileys[v][2] + "'>");
}

function scinder() {
	var p = document.getElementById("recherche_forum").getElementsByTagName("p")[0];
		p.getElementsByTagName("select")[0].id = "recherche_select";
		p.getElementsByTagName("select")[0].style.display = "none";
	var input = document.createElement("input");
		input.id = "recherche_auteur";
		input.type = "text";
		input.defaultValue = "Auteur";
		input.style.width = "120px";
		input.setAttribute("onfocus", "clearText(this)");
		input.setAttribute("onblur", "initText(this)");
		input.setAttribute("onchange", "document.getElementById('textfield_forum').value = this.value; document.getElementById('recherche_select').value = 1");
		input.style.marginLeft = "5px";
	p.insertBefore(input, p.firstChild);
	var input = document.createElement("input");
		input.id = "recherche_sujet";
		input.type = "text";
		input.defaultValue = "Sujet";
		input.style.width = "120px";
		input.setAttribute("onfocus", "clearText(this)");
		input.setAttribute("onblur", "initText(this)");
		input.setAttribute("onchange", "document.getElementById('textfield_forum').value = this.value; document.getElementById('recherche_select').value = 2");
	p.insertBefore(input, p.firstChild);
	document.getElementById("textfield_forum").style.display = "none";
	document.getElementById("submit").style.display = "none";
}

function selectionPseudo() {
	document.getElementById('newnom').value = Mega_pseudos[this.value][0];
	document.getElementById('mdpasse').value = Mega_pseudos[this.value][1];
}

function creationListePseudos() {
	Mega_pseudos = Mega_pseudos.sort();
	var obj = document.getElementById("login_pass");
	var p = obj.getElementsByTagName("p");
	for (var i = 0; p[i]; i++) {
		switch (p[i].className) {
			case 'login' : case 'password' : case 'retenir_id' : p[i].style.display = "none";
		}
	}
	var p = document.createElement("p");
		p.style.margin = "0.5em 0";
	var label = document.createElement("label");
		label.innerHTML = "* Pseudo :";
	var select = document.createElement("select");
		select.size = 1;
		select.style.fontFamily = "Arial";
		select.style.fontSize = "12px";
		select.style.marginLeft = "70px";
		select.addEventListener("change", selectionPseudo, true);
	var courant = GM_getValue("pseudo_actuel", "");
	for (var i = 0; i < Mega_pseudos.length; i++) {
		var option = document.createElement("option");
			option.value = i;
			option.innerHTML = Mega_pseudos[i][0];
		if (courant == Mega_pseudos[i][0].toLowerCase()) {
			option.setAttribute("selected", "selected");
			document.getElementById('newnom').value = Mega_pseudos[i][0];
			document.getElementById('mdpasse').value = Mega_pseudos[i][1];
		}
		select.appendChild(option);
	}
	p.appendChild(label);
	p.appendChild(select);
	obj.insertBefore(p, obj.firstChild);
}

function hideAvatar() {
	if (document.getElementById("avatar0")) document.getElementById("avatar0").style.display = "none";
}

function verifSignature() {
	var obj = document.getElementById("signature");
	var check = obj.value;
		check = check.replace(/ /g, "");
		check = check.replace(/\n/g, "");
		check = check.replace(/<br>/g, "");
	if (check == "")
		GM_deleteValue("signature#value");
	else {
		GM_setValue("signature#value", obj.value);
		document.getElementById("newmessage").value += "\n\n" + obj.value;
	}
}

function addSignature() {
	var label = document.createElement("label");
		label.setAttribute("for", "signature");
		label.style.display = "block";
		label.style.margin = "5px 0px 8px 0px";
		label.innerHTML = "* Signature :";
	var textarea = document.createElement("textarea");
		textarea.id = "signature";
		textarea.setAttribute("cols", 40);
		textarea.setAttribute("rows", 4);
		textarea.style.marginBottom = "6px";
		textarea.innerHTML = GM_getValue("signature#value", "");
	var p = document.createElement("p");
		p.className = "signature";
		p.appendChild(label);
		p.appendChild(textarea);
	var message = document.getElementById("boutons_repondre");
	var parent = message.parentNode;
		parent.insertBefore(p, message);
	document.getElementById("post").addEventListener("submit", verifSignature, false);
}
/*
function openProfile() {
	if (document.getElementById("rech_ou").value == 4) {
		var pseudo = document.getElementById("rech_txt").value;
		var taille = document.getElementById("taille").value;
		this.action = "http://antre-jv.com/profils.php?recherche=" + pseudo + "&taille=" + taille;
		this.method = "post";
		this.target = "_blank";
	} else {
		this.action = "http://www.jeuxvideo.com/cgi-bin/redsearch.cgi";
		this.method = "get";
		this.target = "";
	}
}

function findProfile() {
	var obj = document.getElementById("rech_ou");
		obj.style.width = "165px";
		obj.style.marginTop = "9px";
	var option = document.createElement("option");
		option.value = 4;
		option.innerHTML = "Dans les profils";
	obj.appendChild(option);
	var select = document.createElement("select");
		select.id = "taille";
	for (var i = 3; i < 16; i++) {
		var option = document.createElement("option");
			option.innerHTML = option.value = i;
		select.appendChild(option);
	}
	var btn = document.getElementById("rech_valid");
		btn.style.margin = "9px 0px 0px 5px";
	var obj = document.getElementById("rech").getElementsByTagName("fieldset")[0];
		obj.insertBefore(select, btn);
		obj.appendChild(document.getElementById("rech_txt"));
		obj.appendChild(document.getElementById("rech_valid"));
	document.getElementById("rech_txt").style.width = "142px";
	var obj = document.getElementById("rech");
		obj.addEventListener("submit", openProfile, false);
}*/

function displayTool() {
	var page = document.getElementById("global");
	var tool = document.getElementById("barremenu");
	//var body = document.getElementsByTagName("body")[0];
	var bool = (tool.style.display == "block");
	page.style.paddingTop = bool ? "0px" : "30px";
	tool.style.display = bool ? "none" : "block";
	//body.style.backgroundPosition = bool ? "center 0px" : "center 30px";
	this.innerHTML = bool ? "JvM Tool : Off" : "JvM Tool : On";
	if (bool) GM_setValue("#tool", 0);
	else GM_setValue("#tool", 1);
}

function etatJvM() {
	//var body = document.getElementsByTagName("body")[0];
	//	body.style.backgroundPosition = GM_getValue("#tool", 1) ? "center 30px" : "center 0px";
	var a = document.createElement("a");
		a.innerHTML = GM_getValue("#tool", 1) ? "JvM Tool : On" : "JvM Tool : Off";
		a.style.cursor = "pointer";
		a.addEventListener("click", displayTool, false);
	var li = document.createElement("li");
		li.appendChild(a);
	var bloc = document.getElementById("menu_interactif").getElementsByTagName("ul")[0];
		bloc.insertBefore(li, bloc.firstChild);
}

function checkPage() {
	if (this.value != "") { 
		if (isNaN(parseInt(this.value))) this.value = "";
		else {
			if (this.value > nbPagesTopic) this.value = nbPagesTopic;
			if (this.value < 1) this.value = 1;
			this.value = parseInt(this.value);
		}
	}
}

function accesPage() {
	var td = document.getElementById("col1").getElementsByTagName("td");
	for (var i = 0; i < td.length; i++) {
		if (td[i].className == "revenir") {
			var input = document.createElement("input");
				input.type = "text";
				input.defaultValue = input.value = "Accès page";
				input.style.width = "55px";
				input.style.height = "12px";
				input.style.fontSize = "9px";
				input.style.textAlign = "center";
				input.style.margin = "-10px 0px 0px 0px";
				input.style.padding = 0;
				input.addEventListener("keyup", checkPage, false);
				input.addEventListener("focus", function() {if (this.value == this.defaultValue) this.value = "";}, true);
				input.addEventListener("blur", function() {if (this.value == "") this.value = this.defaultValue;}, true);
			var form = document.createElement("form");
				form.appendChild(input);
				form.addEventListener("submit", function() {var x = this.getElementsByTagName("input")[0].value; this.action = self.location.href.replace(/(http:\/\/www\.jeuxvideo\.com\/forums\/1\-[0-9]+\-[0-9]+\-)[0-9]+(\-[^"]+)/, "$1" + x + "$2");}, false);
			td[i].appendChild(form);
		}
	}
}

function favorisBis() {
	document.getElementById("bloc_forums_img").innerHTML = "JVM: MES FORUMS PREFERES";
	Mega_favoris = Mega_favoris.sort();
	var liste_forums = document.getElementById("liste_forums") ? document.getElementById("liste_forums") : document.getElementById("liste_forums_pref");
		liste_forums.id = "liste_forums";
		liste_forums.style.maxHeight = "375px";
		liste_forums.style.overflow = "auto";
		liste_forums.innerHTML = "";
	for (var i = 0; i < Mega_favoris.length; i++) {
		var a = document.createElement("a");
			a.href = Mega_favoris[i][1];
			a.innerHTML = Mega_favoris[i][0];
		var img = document.createElement("div");
			img.id = "R" + i;
			img.title = "Supprimer ce forum";
			img.style.background = "url(http://www.noelshack.com/up/aac/bt_forum_supp_pref-1426b9f877.png) left top";
			img.style.width = "9px";
			img.style.height = "10px";
			img.style.cursor = "pointer";
			img.setAttribute("onmouseover", "this.style.backgroundPosition = 'left bottom'");
			img.setAttribute("onmouseout", "this.style.backgroundPosition = 'left top'");
			img.addEventListener("click", supprimerFavori, false);
		var div = document.createElement("div");
			div.setAttribute("onmouseover", "this.style.background = '#f5f5f5'; this.getElementsByTagName('td')[1].style.visibility = 'visible'");
			div.setAttribute("onmouseout", "this.style.background = ''; this.getElementsByTagName('td')[1].style.visibility = 'hidden'");
		var table = document.createElement("table");
			table.style.width = "100%";
			table.style.marginTop = "-3px";;
		var tr = document.createElement("tr");
		var td = document.createElement("td");
			td.style.margin = td.style.padding = 0;
			td.appendChild(a);
		tr.appendChild(td);
		var td = document.createElement("td");
			td.align = "center";
			td.style.verticalAlign = "center";
			td.style.visibility = "hidden";
			td.style.width = "5%";
			td.style.margin = td.style.padding = 0;
			td.appendChild(img);
		tr.appendChild(td);
		table.appendChild(tr);
		div.appendChild(table);
		var li = document.createElement("li");
			li.appendChild(div);
		liste_forums.appendChild(li);
	}
	liste_forums.parentNode.parentNode.style.width = "300px";
	liste_forums.parentNode.parentNode.style.position = "fixed";
	liste_forums.parentNode.parentNode.style.zIndex = "1";
}

function coeurAjouter() {
	var coeur = document.getElementById("coeur_ajouter");
	var parent = coeur.parentNode;
	var img = document.createElement("img");
		img.src = "http://image.jeuxvideo.com/pics/forums/bt_forum_pref.gif";
		img.title = img.alt = "Ajouter ce forum à mes forums préférés";
		img.style.cursor = "pointer";
		img.addEventListener("click", ajouterFavori, false);
	parent.replaceChild(img, coeur);
}
}

function appliqueChoix() {
	//GM_deleteValue("smiley#liste");
	//GM_deleteValue("pseudos#liste");
	{ // ----- On récupère les listes personnelles ----- //
	var temp = GM_getValue("forum#liste", ""); // Mes forums préférés
	if (temp != "") {
		var tempTbl = temp.split(",");
		for (var i = 0; i < tempTbl.length; i += 2) Mega_favoris.push(new Array(tempTbl[i], tempTbl[i + 1]));
	}
	var temp = GM_getValue("topic#liste", ""); // Mes topics préférés
	if (temp != "") {
		var tempTbl = temp.split(",");
		for (var i = 0; i < tempTbl.length; i += 3) Mega_topics.push(new Array(tempTbl[i], tempTbl[i + 1], tempTbl[i + 2]));
	}
	var temp = GM_getValue("pseudos#liste", ""); // Mes pseudos
	if (temp != "") {
		var tempTbl = temp.split(",");
		for (var i = 0; i < tempTbl.length; i += 4) Mega_pseudos.push(new Array(tempTbl[i], tempTbl[i + 1], tempTbl[i + 2], tempTbl[i + 3]));
	}
	var temp = GM_getValue("smiley#liste", ""); // Mes smileys
	if (temp != "") {
		var tempTbl = temp.split(",");
		for (var i = 0; i < tempTbl.length; i += 3) Mega_smileys.push(new Array(tempTbl[i], tempTbl[i + 1], tempTbl[i + 2]));
	}
	}
	
	// ----- L'image qui remplace les lignes de points ----- //
	var ligneIn = /\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\. \.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\. \.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\. \.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\. \.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\.\./g;
	var ligneOut = /\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\- \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\- \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\- \-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-/g;
	
	// ----- On récupère le pseudo actuellement utilisé ----- //
	if (document.getElementsByTagName("body")[0].innerHTML.match(/var pseudomni = \"([^"]+)\"/)) {
	GM_setValue("pseudo_actuel", document.getElementsByTagName("body")[0].innerHTML.match(/var pseudomni = \"([^"]+)\"/)[1].toLowerCase());
	}
	
	// ----- On applique le skin choisi s'il y en a un ----- //
	if (GM_getValue("skin#newlook", 0) && (mode == 1 || mode == 3)) NewLook();
	
	if (mode != -1) {
		// ----- Les ajoutes sans contraintes ----- //
		coeurAjouter();
		favorisBis();
		if (GM_getValue("extra#noelshack", 0)) NoelShack();
		if (GM_getValue("extra#stats", 0)) statistiques();
		//if (GM_getValue("extra#profils", 0)) findProfile();
		//if (GM_getValue("", 0)) ;
		
		// ----- Les fonctions ----- //
		if (GM_getValue("spt#citer", 0)) Citer();
		if (GM_getValue("spt#ignorer", 0)) Ignorer();
		if (GM_getValue("spt#regroupement", 0)) Regroupement();
		if (GM_getValue("spt#color", 0)) Coloriser();
		if (GM_getValue("spt#cdvglobale", 0)) CdvGlobale();
		if (GM_getValue("spt#easysmiley", 0)) EasySmiley();
		if (GM_getValue("spt#recherche", 0) && mode == 1) RechercheButton();
		//if (GM_getValue("", 0)) ;
		
		// ----- Extra ----- //
		if (GM_getValue("extra#cotedroit", 0)) document.getElementById("col2").style.display = "none";
		if (GM_getValue("extra#milieu", 0)) {
			GM_setValue("extra#cotedroit", 1);
			Mega_extra[11][1] = 1;
			document.getElementById("col2").style.display = "none";
			var div = document.getElementById('col1').getElementsByTagName("div");
			for (var u = 0; u < div.length; u++) {
				if (div[u].className == 'discu_boutons' || div[u].className == 'navig_pages topics' || div[u].className == 'navig_pages') {
					div[u].getElementsByTagName("table")[0].style.width = "100%";
				}
			}
			document.getElementById("col1").style.width = "100%";
		}
	}
	
	if (mode == 0) {
		if (GM_getValue("extra#lastpage", 0) || GM_getValue("extra#postpage", 0)) {
			if (document.getElementById('liste_topics')) {
				var tr = document.getElementById('liste_topics').getElementsByTagName("tr");
				for (var i = 1; i < tr.length; i++) {
					var img = tr[i].getElementsByTagName("td")[0].getElementsByTagName("img")[0];
						img.title = GM_getValue("extra#lastpage", 0) ? GM_getValue("extra#postpage", 0) ? "Left : Dernière page - Right : Répondre" : "Left : Dernière page" : "Right : Répondre";
						img.setAttribute("oncontextmenu", "return false;");
						img.style.cursor = "pointer";
						img.addEventListener("mouseup", surf, false);
				}
			}
		}
		if (GM_getValue("extra#search", 0)) scinder();
		if (GM_getValue("extra#pseudos", 0) && Mega_pseudos.length > 0) creationListePseudos();
		//if (GM_getValue("", 0)) ;
	}
	
	if (mode == 1) {
		if (GM_getValue("menu#topic", 0)) {
			var img = document.createElement("img");
				img.src = "http://www.noelshack.com/up/aab/bt_topic-04cda9ed25.png";
				img.style.position = "absolute";
				img.style.top = "7px";
				img.style.right = "20px";
			var a = document.createElement("a");
				a.title = "Ajouter ce topic à mes topics préférés";
				a.style.marginRight = "5px";
				a.style.cursor = "pointer";
				a.addEventListener("click", ajouterTopic, false);
				a.appendChild(img);
			var p = document.getElementById("forum_pref");
				p.appendChild(a);
		}
		if (GM_getValue("extra#accespage", 0)) accesPage();
	}
	
	if (mode == 1 || mode == 3) {
		if (GM_getValue("extra#pseudos", 0) && Mega_pseudos.length > 0) {
			var a = document.getElementById('col1').getElementsByTagName("a");
			for (var u = 0; u < a.length; u++) {
				if (a[u].className == 'bt_repondre') a[u].href = urlRepondre;
			}
		}
		if (GM_getValue("extra#findpost", 0)) {
			var post = self.location.href.split("#")[1];
			if (post && post != "form_post") document.getElementById(post).style.background = "rgb(232,232,244)";
		}
		var div = document.getElementById('col1').getElementsByTagName("div");
		for (var u = 0; u < div.length; u++) {
			if (div[u].id.match('message_')) {
				var post;
				if (GM_getValue("skin#newlook", 0)) post = div[u].getElementsByTagName("li")[0];
				else post = div[u].getElementsByTagName("li")[2];
				post.innerHTML = post.innerHTML.replace(ligneIn, "<img src='http://www.noelshack.com/uploads/16062009/ligne2076795.png' style='width: 100%; height: 2px; margin: 8px 0px;'>");
				post.innerHTML = post.innerHTML.replace(ligneOut, "<img src='http://www.noelshack.com/up/aac/ligne2076795-33cacaba2.png' style='width: 100%; height: 2px; margin: 8px 0px;'>");
				if (GM_getValue("extra#img", 0)) displayImage(post);
				if (GM_getValue("extra#video", 0)) displayVideo(post);
				if (GM_getValue("extra#smlperso", 0)) displaySmiley(post);
				//if (GM_getValue("extra#", 0)) ;
			}
		}
		//if (GM_getValue("", 0)) ;
	}
	
	if (mode == 3 || mode == 5) {
		if (GM_getValue("extra#pseudos", 0) && Mega_pseudos.length > 0) {
			self.location += "#form_post";
			creationListePseudos();
		}
		if (GM_getValue("extra#signature", 0)) addSignature();
	}
	
	if (mode == -1) {
		if (document.getElementsByTagName("li")[2] && document.getElementsByTagName("li")[2].className == "post") {
			var post = document.getElementsByTagName("li")[2];
				post.innerHTML = post.innerHTML.replace(ligneIn, "<img src='http://www.noelshack.com/uploads/16062009/ligne2076795.png' style='width: 100%; height: 2px; margin: 8px 0px;'>");
				post.innerHTML = post.innerHTML.replace(ligneOut, "<img src='http://www.noelshack.com/up/aac/ligne2076795-33cacaba2.png' style='width: 100%; height: 2px; margin: 8px 0px;'>");
			if (GM_getValue("extra#img", 0)) displayImage(post);
			if (GM_getValue("extra#video", 0)) displayVideo(post);
			if (GM_getValue("extra#smlperso", 0)) displaySmiley(post);
		}
	}
}

function main() {
	if (location.href.match(/^http:\/\/www\.jeuxvideo\.com\/cgi\-bin\/jvforums\/forums_profil\.cgi\?pxo=/)) {
		if (GM_getValue("extra#avatar", 0)) hideAvatar();
		if (GM_getValue("spt#cdvglobale", 0)) CGFpageCdv();
		else if (GM_getValue("extra#smljvc", 0)) jvcSmileys("cartevisite0");
	} else
	if (location.href.match(/^http:\/\/94\.23\.24\.151\/cgi\-bin\/moiocijveudezinfosurmonpseudo\.cgi\?/)) {
		if (GM_getValue("spt#cdvglobale", 0)) CGFnbPostPseudoBanni();
	} else if (mode == "CdvGlobale") CGFcdvGlobale();
	  else if (mode == "Recherche") Recherche();
	  else if (mode == "Regroupement") GestionRegroupement();
	else {
		if (mode != -1) {
			creationMenu();
			etatJvM();
		}
		appliqueChoix();
	}
}

main();
