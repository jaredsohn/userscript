// ==UserScript==
// @name           JvRecherche
// @namespace       
// @description    Recherche intra-topic pour les forums de jeuxvideo.com
// @include        http://www.jeuxvideo.com/forums/*
// @author         Mega
// @date           06/05/09
// ==/UserScript==

var mode = self.location.href.toString().split("/")[4].split("-")[0];
var forum = self.location.href.toString().split("-")[1];
var page = self.location.href.toString().split("-")[3];
var Mega_NomForum;
var Mega_NomTopic;
var Mega_NbPages;
var Mega_Url;
var Mega_Stop = true;
var Mega_Ordre = false;

function extraire(content) {
   temp = content.toLowerCase();
   var x = temp.indexOf("<div id=\"col1\">");
   if (x == -1) return "";

   var y = temp.lastIndexOf("<div id=\"col2\">");
   if (y == -1) y = temp.lastIndexOf("</html>");
   if (y == -1) y = content.length;

   return content.slice(x, y);   
}

function envoi() {
	var p = document.getElementsByTagName("p");
	var stop = true;
	for (var i = 0; i < p.length && stop; i++) {
		if (p[i].className == "pagination") {
			var a = p[i].getElementsByTagName("a");
			// Le nombre de pages
			if (p[i].lastChild.innerHTML == "»") GM_setValue("nb_pages", a[a.length - 2].innerHTML);
			else GM_setValue("nb_pages", p[i].lastChild.innerHTML);
			stop = false;
		}
	}
	// Le titre du forum
	GM_setValue("nom_forum", document.getElementById("col1").innerHTML.match(/<h3><span class=\"txt\">[^"]+<\/span>([^"]+)<\/h3>/)[1]);
	// Le titre du topic
	GM_setValue("nom_topic", document.getElementById("col1").innerHTML.match(/<h4 class=\"sujet\"><span>[^"]+<\/span>([^"]+)<\/h4>/)[1]);
	// L'url du topic
	GM_setValue("url", window.location.href);
	// On ouvre la page de recherche
	window.open("http://www.jeuxvideo.com/forums/Recherche");
}

function verification(o, v) {
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

function donneesCorrectes() {
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
		if (y == null || y == "" || y < 1 || y > parseInt(Mega_NbPages)) {
			alert("La borne de départ est incorrecte.");
			document.getElementById("borneMin").focus();
			return false;
		}
		var z = parseInt(document.getElementById("borneMax").value); // Valeur d'arrivée
		if (z == null || z == "" || z < 1 || z > parseInt(Mega_NbPages)) {
			alert("La borne d'arrivée est incorrecte.");
			document.getElementById("borneMax").focus();
			return false;
		}
	}
	if (!document.getElementById("tfpseudo").checked && !document.getElementById("tfpost").checked) return false;
	return true;
}

function chargement(indice, depart, fin, ordre) {
	var url = Mega_Url;
	var x = url.split("-");
	if (ordre) x[3] = parseInt(fin) - parseInt(indice);
	else x[3] = parseInt(indice) + parseInt(depart);
	url = x.join().toString().replace(/,/g, "-");
	req = new XMLHttpRequest();
	req.open("GET", url, false);
	req.send(null);
	document.getElementById('displayed').innerHTML = extraire(req.responseText); // On intègre le contenu récupéré
	req.abort();
}

function calculTemps(x, y) {
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

function recherche() {
	if (donneesCorrectes()) {
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
		var ordre = (document.getElementById("tfbornes").checked) ? Mega_Ordre : false;
		Mega_Stop = false;
		// On vérifie si la recherche est limitée oopas
		if (document.getElementById("tfbornes").checked) {
			premierePage = document.getElementById("borneMin").value;
			dernierePage = document.getElementById("borneMax").value;
			nbPages = dernierePage - premierePage + 1;
		} else {
			premierePage = 1;
			dernierePage = nbPages = Mega_NbPages;
		}
		// On parcourt les pages
		document.getElementById('infos').innerHTML = "Balayage des pages....";
		var debut = new Date;
		for (var u = 0; u < nbPages && !Mega_Stop; u++) {
			var un = 100 / nbPages;
			var rouge = un * (u + 1);
			var noir = 100 - rouge;
			document.getElementById('infos').innerHTML = "Balayage des pages.... (" + (u + 1) + "/" + nbPages + ")";
			document.getElementById('rouge').style.width = rouge + "px";
			document.getElementById('noir').style.width = noir + "px";
			chargement(u, premierePage, dernierePage, ordre);
			var message = document.getElementById("displayed").getElementsByTagName("div");
			if (ordre) {
				for (var i = message.length; i > 0; i--) {
					if (message[i - 1].id.match("message_")) {
						nbPosts++;
						var verif = false;
						if (document.getElementById("tfpseudo").checked) {
							if (verification(message[i - 1], "pseudo")) verif = true;
						}
						if (document.getElementById("tfpost").checked) {
							if (verification(message[i - 1], "post")) verif = true;
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
							if (verification(message[i], "pseudo")) verif = true;
						}
						if (document.getElementById("tfpost").checked) {
							if (verification(message[i], "post")) verif = true;
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
		Mega_Stop = true;
		// Informations sur la recherche
		document.getElementById("nb_pages_topic").innerHTML = "Nombre de pages analysées : " + nbPagesParcourues;
		document.getElementById("nb_posts_topic").innerHTML = "Nombre de messages analysés : " + nbPosts;
		document.getElementById("nb_posts_trouves").innerHTML = "Nombre de messages récupérés : " + tblResults.length;
		document.getElementById("tps_recherche").innerHTML = calculTemps(debut, fin);
		// Gestion de l'affichage
		document.getElementById("wait").style.display = "none";
		document.getElementById("complement").style.display = "block";
		if (tblResults.length > 0) {
			document.getElementById("resultsHead").style.display = "block";
			document.getElementById("results").style.display = "block";
		} else document.getElementById("bide").style.display = "block";
	}
}

function arretPrecoce() {
	Mega_Stop = true;
}

function changerOrdre() {
	if (Mega_Stop) {
		if (Mega_Ordre) {
			Mega_Ordre = false;
			document.getElementById("tfbornes").checked = true;
			this.innerHTML = "=>";
		} else {
			Mega_Ordre = true;
			document.getElementById("tfbornes").checked = true;
			this.innerHTML = "<=";
		}
	}
}

if (mode == 1) {
// On ajoute le bouton de recherche
var td = document.getElementsByTagName("td");
for (var i = 0; i < td.length; i++) {
	if (td[i].className == "moder") {
		var img = document.createElement("img");
			img.src = "http://www.noelshack.com/voir/130309/bt_forum_repondre037607.png";
			img.alt = "Rechercher";
		var a = document.createElement("a");
			a.addEventListener("click", envoi, false);
			a.style.cursor = "pointer";
			a.appendChild(img);
		td[i].appendChild(a);
	}
}
}

if (mode == "Recherche") {
	// On récupère les valeurs envoyées
	Mega_NomForum = GM_getValue("nom_forum", "Problème résolution nom forum");
	Mega_NomTopic = GM_getValue("nom_topic", "Problème résolution nom topic");
	Mega_NbPages = GM_getValue("nb_pages", 0);
	Mega_Url = GM_getValue("url", "0");
	
	// On ajoute un lien vers une feuille de css du site
	document.getElementsByTagName("head")[0].innerHTML += "<link href='http://www.jeuxvideo.com/css/defaut/forums.css' rel='stylesheet' type='text/css' />";
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
		span.innerHTML = Mega_NomForum;
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
		span.innerHTML = Mega_NomTopic;
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
		input.value = Mega_NbPages;
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
		b.addEventListener("click", changerOrdre, false);
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
		img.addEventListener("click", recherche, false);
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
		btn.addEventListener("click", arretPrecoce, false);
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