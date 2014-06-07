// ==UserScript==
// @name           JvColoriser
// @namespace       
// @description    Coloriser des pseudos
// @include        http://www.jeuxvideo.com/forums/1-*
// @include        http://www.jeuxvideo.com/forums/3-*
// ==/UserScript==

var Mega_Couleur = "";
var Mega_Pseudo = "";

function rgb(x) {
	return "rgb(" + x.split("_")[0] + ", " + x.split("_")[1] + ", " + x.split("_")[2] + ")";
}

function valider() {
	if (Mega_Couleur != "0_0_0") GM_setValue("color#" + Mega_Pseudo.toLowerCase(), Mega_Couleur);
	else GM_deleteValue("color#" + Mega_Pseudo.toLowerCase());
	document.getElementById("coloriser").style.display = "none";
	colorise();
}

function defaut() {
	Mega_Couleur = "0_0_0";
	document.getElementById("appercu_couleur").style.color = "rgb(0,0,0)";
}

function couleurOn() {
	var obj = document.getElementById("appercu_couleur");
		obj.style.color = rgb(this.id);
}

function couleurOut() {
	var obj = document.getElementById("appercu_couleur");
		obj.style.color = rgb(Mega_Couleur);
}

function couleurLock() {
	Mega_Couleur = this.id;
}

function ouvre() {
	Mega_Pseudo = this.parentNode.getElementsByTagName("strong")[0].innerHTML;
	Mega_Couleur = GM_getValue("color#" + Mega_Pseudo.toLowerCase(), "0_0_0");
	document.getElementById("appercu_couleur").innerHTML = Mega_Pseudo;
	document.getElementById("appercu_couleur").style.color = rgb(Mega_Couleur);
	document.getElementById("coloriser").style.display = "block";
}

function colorise() {
	var lis = document.getElementById('col1').getElementsByTagName("li");
	for (var u = 0; lis[u]; u++) {
		if (lis[u].className == 'pseudo') {
			var pseudo = lis[u].getElementsByTagName("strong")[0];
			if (pseudo.innerHTML.toLowerCase() == Mega_Pseudo.toLowerCase())
			pseudo.style.color = rgb(Mega_Couleur);
		}
	}
}

function boite() {
	var red = 255;
	var green = 255;
	var blue = 255;
	
	for (var i = 0; i < 256; i += 5) {
		var cadre = document.createElement("img");
			cadre.src = "http://www.noelshack.com/uploads/16062009/vide062856.png";
			cadre.id = "255_" + i + "_0";
			cadre.style.width = "1px";
			cadre.style.height = "16px";
			cadre.style.background = "rgb(" + 255 + "," + i + "," + 0 + ")";
			cadre.style.cursor = "crosshair";
			cadre.addEventListener("mouseover", couleurOn, false);
			cadre.addEventListener("mouseout", couleurOut, false);
			cadre.addEventListener("click", couleurLock, false);
		document.getElementById("couleurs").appendChild(cadre);
	}
	for (var i = 255; i >= 0; i -= 5) {
		var cadre = document.createElement("img");
			cadre.src = "http://www.noelshack.com/uploads/16062009/vide062856.png";
			cadre.id = i + "_255_" + "0";
			cadre.style.width = "1px";
			cadre.style.height = "16px";
			cadre.style.background = "rgb(" + i + "," + 255 + "," + 0 + ")";
			cadre.style.cursor = "crosshair";
			cadre.addEventListener("mouseover", couleurOn, false);
			cadre.addEventListener("mouseout", couleurOut, false);
			cadre.addEventListener("click", couleurLock, false);
		document.getElementById("couleurs").appendChild(cadre);
	}
	for (var i = 0; i < 256; i += 5) {
		var cadre = document.createElement("img");
			cadre.src = "http://www.noelshack.com/uploads/16062009/vide062856.png";
			cadre.id = "0" + "_255_" + i;
			cadre.style.width = "1px";
			cadre.style.height = "16px";
			cadre.style.background = "rgb(" + 0 + "," + 255 + "," + i + ")";
			cadre.style.cursor = "crosshair";
			cadre.addEventListener("mouseover", couleurOn, false);
			cadre.addEventListener("mouseout", couleurOut, false);
			cadre.addEventListener("click", couleurLock, false);
		document.getElementById("couleurs").appendChild(cadre);
	}
	for (var i = 255; i >= 0; i -= 5) {
		var cadre = document.createElement("img");
			cadre.src = "http://www.noelshack.com/uploads/16062009/vide062856.png";
			cadre.id = "0_" + i + "_255";
			cadre.style.width = "1px";
			cadre.style.height = "16px";
			cadre.style.background = "rgb(" + 0 + "," + i + "," + 255 + ")";
			cadre.style.cursor = "crosshair";
			cadre.addEventListener("mouseover", couleurOn, false);
			cadre.addEventListener("mouseout", couleurOut, false);
			cadre.addEventListener("click", couleurLock, false);
		document.getElementById("couleurs").appendChild(cadre);
	}
	for (var i = 0; i < 256; i += 5) {
		var cadre = document.createElement("img");
			cadre.src = "http://www.noelshack.com/uploads/16062009/vide062856.png";
			cadre.id = i + "_0" + "_255";
			cadre.style.width = "1px";
			cadre.style.height = "16px";
			cadre.style.background = "rgb(" + i + "," + 0 + "," + 255 + ")";
			cadre.style.cursor = "crosshair";
			cadre.addEventListener("mouseover", couleurOn, false);
			cadre.addEventListener("mouseout", couleurOut, false);
			cadre.addEventListener("click", couleurLock, false);
		document.getElementById("couleurs").appendChild(cadre);
	}
	for (var i = 255; i >= 5; i -= 5) {
		var cadre = document.createElement("img");
			cadre.src = "http://www.noelshack.com/uploads/16062009/vide062856.png";
			cadre.id = "255_" + "0_" + i;
			cadre.style.width = "1px";
			cadre.style.height = "16px";
			cadre.style.background = "rgb(" + 255 + "," + 0 + "," + i + ")";
			cadre.style.cursor = "crosshair";
			cadre.addEventListener("mouseover", couleurOn, false);
			cadre.addEventListener("mouseout", couleurOut, false);
			cadre.addEventListener("click", couleurLock, false);
		document.getElementById("couleurs").appendChild(cadre);
	}
}

function boutton() {
	var lis = document.getElementById('col1').getElementsByTagName("li");
	for (var u = 0; lis[u]; u++) {
		if (lis[u].className == 'pseudo') {
			var pseudo = lis[u].getElementsByTagName("strong")[0];
			var color = GM_getValue("color#" + pseudo.innerHTML.toLowerCase(), "0_0_0");
			pseudo.style.color = rgb(color);
			var img = document.createElement("img");
				img.className = "couleur";
				img.title = "Coloriser";
				img.src = "http://www.noelshack.com/up/aab/coloriser-3c803a0937.png";
			var a = document.createElement("a");
				a.style.cursor = "pointer";
				a.addEventListener("click", ouvre, false);
			a.appendChild(img);
			lis[u].appendChild(a);
		}
	}
}

function Coloriser() {
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
		td.style.padding = "8px 5px";
	var span = document.createElement("span");
		span.id = "appercu_couleur";
		span.style.display = "block";
		span.style.width = "100%";
		span.style.textAlign = "center";
		span.style.padding = "2px 0px";
		span.style.fontWeight = "bold";
		span.style.border = "1px inset rgb(150,150,150)";
		span.style.background = "#EFF4FC";
	td.appendChild(span);
	tr.appendChild(td);
	var td = document.createElement("td");
		td.align = "right";
		td.style.width = "135px";
	var bouton = document.createElement("input");
		bouton.type = "submit";
		bouton.value = "DEFAUT";
		bouton.style.fontSize = "9px";
		bouton.style.fontWeight = "bold";
		bouton.style.marginRight = "5px";
		bouton.addEventListener("click", defaut, false);
	td.appendChild(bouton);
	var bouton = document.createElement("input");
		bouton.type = "submit";
		bouton.value = "VALIDER";
		bouton.style.fontSize = "9px";
		bouton.style.fontWeight = "bold";
		bouton.style.marginRight = "5px";
		bouton.addEventListener("click", valider, false);
	td.appendChild(bouton);
	tr.appendChild(td);
	table.appendChild(tr);
	cadre.appendChild(table);
	var div = document.createElement("div");
		div.id = "couleurs";
		div.style.padding = "1px";
		div.style.borderTop = "3px solid rgb(50,50,50)";
	cadre.appendChild(div);
	document.getElementById("col1").appendChild(cadre);
	
	boite();
	boutton();
}


Coloriser();

