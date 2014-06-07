// ==UserScript==
// @name			Monzoo Help
// @author			Mahab, sur la base d'un ancien script de Mikey : merci pour son initiative ;)
// @description		script aidant à gérer son zoo
// @version			1.4.15.12
// @source 			http://userscripts.org/scripts/show/63727
// @identifier 		http://userscripts.org/scripts/show/63727.user.js
// @include			http://www.monzoo.net/*
// @include			http://monzoo.beemoov.com/*
// @grant			GM_addStyle
// @grant			GM_deleteValue
// @grant			GM_getValue
// @grant			GM_setValue
// @grant			GM_xmlhttpRequest

// ==/UserScript==
// 3092

if (window.top !== window.self) return;

var antipub = $t("div"), i;
for (i=0;i<antipub.length;i++) if (antipub[i].style.left == "835px") { antipub[i].innerHTML = ""; break; }

var this_version = "1.4.15.12";

function $(eid) { return document.getElementById(eid); }
function $n(ename) { return document.getElementsByName(ename)[0]; }
function $c(eclasse) { return document.getElementsByClassName(eclasse); }
function $t(balise, doc)
{	var doc = doc ? doc : document;
	if (doc.getElementsByTagName(balise)[0]) return doc.getElementsByTagName(balise);
	else return false;
}

function alertesonore()
{
	if (GM_getValue("son", 1) == 1)
	{	//var output = new Audio();
		//output.mozSetup(2, 44100);
		//var alson = new Float32Array(44100), i0;
		//for (i0=0;i0<alson.length/2;i0++) alson[i0] = Math.sin(i0 / (5 + 10*i0/alson.length));
		//for (i0=alson.length/2;i0<alson.length;i0++) alson[i0] = Math.sin(i0 / (20 - 10*i0/alson.length));
		//output.mozWriteAudio(alson);
		var baudio = document.createElement("audio");
		baudio.src = "http://montdm.shost.ca/ScriptMonZoo/alerte.mp3";
		baudio.setAttribute("autoplay", "true");
		document.body.appendChild(baudio);
	}
}

function alert2(valtxt)
{
	alertesonore();
	alert(valtxt);
}

function confirm2(valtxt)
{
	alertesonore();
	return confirm(valtxt);
}

function Animal(aprix, aenclos, abonus, anom, agroupe, astock)
{
	if (!abonus || abonus == '') abonus = false;
	if (!anom) anom = "";
	if (!agroupe) agroupe = 0;
	if (!astock) astock = false;
	this.prix = aprix;
	this.enclos = aenclos;
	this.bonus = abonus;
	this.nom = anom;
	this.groupe = agroupe;
	this.stock = astock;
}

function AnimBonus(image1, bnom, image2)
{
	this.image1 = image1;
	this.nom = bnom;
	this.image2 = !image2 ? image1 : image2;
}

function serialize(stab) // pour transformer un tableau en string pour pouvoir le stocker
{
	if (typeof(stab) != "undefined")
	{	var sstring = "", i1;
		for (i1 in stab)
			sstring += i1 + "," + stab[i1] + ";";
		return sstring;
	}
}

function unserialize(ustring) // retransforme une chaine en tableau, voire en double tableau
{
	var utab = new Array(), i2, i3, sousstring;
	if (typeof(ustring) != "undefined")
	{	while (ustring != "")
		{	i2 = ustring.substring(0, ustring.indexOf(","));
			sousstring = ustring.substring(ustring.indexOf(",") + 1, ustring.indexOf(";"));
			if (sousstring.indexOf(",") != -1)
			{	utab[i2] = new Array(), i3 = 0;
				while(sousstring.indexOf(",") != -1)
				{	utab[i2][i3] = sousstring.substring(0, sousstring.indexOf(","));
					i3++;
					sousstring = sousstring.substring(sousstring.indexOf(",") + 1);
				}
				utab[i2][i3] = sousstring;
			}
			else utab[i2] = sousstring;
			ustring = ustring.substring(ustring.indexOf(";") + 1);
		}
	}
	return utab;
}

function serialize2(stab) // pour transformer un double tableau en string pour pouvoir le stocker
{
	if (typeof(stab) != "undefined")
	{	var sstring = "", i1, ii1;
		for (i1 in stab)
			if (typeof(stab[i1]) == "object")
			{	sstring += i1 + ",";
				for (ii1 in stab[i1]) sstring += ii1 + "," + stab[i1][ii1] + ",";
				sstring = sstring.substring(0, sstring.length-1);
				sstring += ";";
			}
			else sstring += i1 + "," + stab[i1] + ";";
		return sstring;
	}
}

function unserialize2(ustring) // retransforme une chaine en double tableau
{
	var utab = new Array(), i2, i3, sousstring;
	if (typeof(ustring) != "undefined")
	{	while (ustring != "")
		{	i2 = ustring.substring(0, ustring.indexOf(","));
			sousstring = ustring.substring(ustring.indexOf(",") + 1, ustring.indexOf(";"));
			if (sousstring.indexOf(",") != -1)
			{	utab[i2] = new Array();
				while(sousstring.indexOf(",") != -1)
				{	i3 = sousstring.substring(0, sousstring.indexOf(","));
					sousstring = sousstring.substring(sousstring.indexOf(",") + 1);
					if (sousstring.indexOf(",") != -1)
					{	utab[i2][i3] = sousstring.substring(0, sousstring.indexOf(","));
						sousstring = sousstring.substring(sousstring.indexOf(",") + 1);
					}
					else utab[i2][i3] = sousstring;
				}
			}
			else utab[i2] = sousstring;
			ustring = ustring.substring(ustring.indexOf(";") + 1);
		}
	}
	return utab;
}

function ajoute_br(abelt) // ajoute un saut de ligne à un élément
{
	var abbr = document.createElement("br");
	abelt.appendChild(abbr);
}

function positionX(elt, niveau) // récupère la position Left d'un élément
{
	var vx = 0;
	if (!niveau) niveau = null;
	while (elt != niveau)
	{	vx += elt.offsetLeft - elt.scrollLeft;
		elt = elt.offsetParent;
	}
	return vx;
}

function positionY(elt, niveau) // récupère la position Top d'un élément
{
	var vy = 0;
	if (!niveau) niveau = null;
	while (elt != niveau)
	{	vy += elt.offsetTop - elt.scrollTop;
		elt = elt.offsetParent;
	}
	return vy;
}

function enclosclasses(numenc)
{
	if (numenc < 10) return numenc+1;
	else if (numenc < 16) return numenc+10;
	else if (numenc < 30) return numenc+20;
	else if (numenc < 41) return numenc+30;
	else if (numenc < 46) return numenc-30;
	else if (numenc < 51) return numenc-20;
	else if (numenc < 56) return numenc-1;
	else if (numenc < 61) return numenc+15;
	else return numenc;
}

function nom_enclos(tne, vne) // donne le nom de l'enclos tel que sur la carte
{
	if (vne == null)
	{	vne = tne % 100;
		tne = Math.floor(tne/100);
	}
	if (tne == 1)
	{	switch(vne)
		{	case 0: return "Volière";
			case 1: return "Aquarium";
			case 2: return "Vivarium";
			case 3: return "Noctarium";
			case 4: return "Insectarium";
		}
	}
	else
	{	if (vne < 10) return "Savane n° " + (vne+1);
		else if (vne < 16) return "Bassin n° " + (vne-9);
		else if (vne < 20) return "bad";
		else if (vne < 30) return "Terre n° " + (vne-19);
		else if (vne < 41) return "Forêt n° " + (vne-29);
		else if (vne < 46) return "Savane n° " + (vne-30);
		else if (vne < 51) return "Bassin n° " + (vne-39);
		else if (vne < 56) return "Terre n° " + (vne-40);
		else if (vne < 61) return "Forêt n° " + (vne-44);
	}
	return "bad";
}

function listetypeenclos(nameenclos)
{
	switch(nameenclos)
	{	case "Volière": return unserialize("0,100;");
		case "Aquarium": return unserialize("0,101;");
		case "Vivarium": return unserialize("0,102;");
		case "Noctarium": return unserialize("0,103;");
		case "Insectarium": return unserialize("0,104;");
		case "Savane": return unserialize("0,0;1,1;2,2;3,3;4,4;5,5;6,6;7,7;8,8;9,9;10,41;11,42;12,43;13,44;14,45;");
		case "Bassin": return unserialize("0,10;1,11;2,12;3,13;4,14;5,15;6,46;7,47;8,48;9,49;10,50;");
		case "Terre": return unserialize("0,20;1,21;2,22;3,23;4,24;5,25;6,26;7,27;8,28;9,29;10,51;11,52;12,53;13,54;14,55;");
		default: return unserialize("0,30;1,31;2,32;3,33;4,34;5,35;6,36;7,37;8,38;9,39;10,40;11,56;12,57;13,58;14,59;15,60;");
	}
}

function nommisavanc(nummis)
{
	switch(parseInt(nummis))
	{	case 1 : return "world peace";
		case 2 : return "papier alu";
		case 3 : return "parité";
		case 4 : return "invasion";
		case 5 : return "espionnage";
		case 6 : return "la légende";
		case 7 : return "chauvinisme";
		case 8 : return "dérèglement climatique";
		case 9 : return "yin yang";
		case 10 : return "pas de jaloux";
	}
}

function millier(nbre) // transforme un nombre quelconque en string avec espaces
{
	nbre = nbre.toString();
	var entier = nbre, deci = "", debu = "", lgn;
	if (nbre.indexOf(".") != -1) { entier = nbre.substring(0,nbre.indexOf(".")); deci = nbre.substring(nbre.indexOf(".")+1); }
	while (entier.length > 3)
	{	lgn = entier.length - 3*Math.floor((entier.length-1)/3);
		debu += entier.substring(0, lgn) + " ";
		entier = entier.substring(lgn);
	}
	entier = debu + entier;
	if (deci != "")
	{	debu = "";
		while (deci.length > 3)
		{	debu += deci.substring(0,3) + " ";
			deci = deci.substring(3);
		}
		deci = debu + deci;
		return entier + "." + deci;
	}
	return entier;
}

function recherche_param(url, param) // recupère la valeur d'un paramètre dans l'url
{
	if (url.indexOf("?") != -1)
	{	url = url.replace("?", "&");
		param = "&" + param + "=";
		if (url.indexOf(param) != -1)
		{	url = url.substring(url.indexOf(param)+param.length);
			if (url.indexOf("&") != -1) url = url.substring(0, url.indexOf("&"));
			return url;
		}
		return "";
	}
	return "";
}

function testheurebourse()
{
	var heureth = new Date();
	heureth = new Date(Date.parse(heureth) + GM_getValue("decalagehoraire", 0));
	var heurebourseth = GM_getValue("heure", "");
	if (heureth.getDate() + "/" + (heureth.getMonth() + 1) + "/" + heureth.getFullYear() !=
		(heurebourseth != "" ? heurebourseth.substring(0, heurebourseth.lastIndexOf("/")) : "")) return true;
	else if (Math.floor(heureth.getHours()/3) != Math.floor(heurebourseth.substring(heurebourseth.lastIndexOf("/")+1)/3)) return true;
	return false;
}

function mise_a_jour() // vérification de nouvelles versions et téléchargement si désiré
{
	var monScript = 'http://userscripts.org/scripts/source/63727.';
	GM_xmlhttpRequest(
	{	method: 'GET',
		url: monScript + 'meta.js',
		onload: function(result)
		{	if (result.status != 200) return;
			if (!result.responseText.match(/@version\s+([\d.]+)/)) return;
			var VersionServer = RegExp.$1;
			if (parseInt(this_version.replace(".","","g")) < parseInt(VersionServer.replace(".","","g")) &&
				confirm("La version " + VersionServer + " de Monzoo Help est disponible.\n\nVoulez-vous la télécharger maintenant ?"))
					pagesuivante(monScript + 'user.js');
		}
	});
}

function est_connecte() // test de la connexion
{
	if (/www.monzoo.net/.test(window.location) || /monzoo.beemoov.com/.test(window.location))
	{	var bdivec = $t("div"), nomec = "", ic;
		for (ic=20;ic<bdivec.length;ic++) if (bdivec[ic].style.width == "125px") { nomec = bdivec[ic].innerHTML; break; }
		return nomec != "" ? nomec : false;
	}
	return false;
}

function titrefen(ttitre, oufen)
{
	$t("title")[0].innerHTML = "Monzoo - " + ttitre;
	var reseau = $t("div"), ti;
	if (!oufen) window.scroll(0, positionY($c("minibarre")[0]) + 1); // 1 pour tenir compte de largeligne
	else window.scroll(0, oufen);
}

function modification_menu() // ajout dans le menu d'une image et d'un bouton pour les options, modification de certains libellés
{
	//affichage d'une image en haut du menu
	var iimg = document.createElement("img");
	//iimg.src = "http://www.fotosearch.com/bthumb/CSP/CSP068/k0688841.jpg"; // panda
	//iimg.src = "http://montdm.shost.ca/ScriptMonZoo/images/P1010909.jpg"; // bouquetin
	//iimg.src = "http://montdm.shost.ca/ScriptMonZoo/images/P1080954.jpg"; // écureuil
	//iimg.src = "http://montdm.shost.ca/ScriptMonZoo/images/P1100900.jpg"; // moutons
	//iimg.src = "http://montdm.shost.ca/ScriptMonZoo/images/P1130237.jpg"; // renne
	//iimg.src = "http://montdm.shost.ca/ScriptMonZoo/images/P1250336.jpg"; // martins-pêcheurs
	iimg.src = "data:image/jpeg;base64,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"; // martins-pêcheurs
	iimg.setAttribute("style", "position:absolute;top:3px;left:14px;width:164px;height:112px;border:0px");
	iimg.setAttribute("onmouseout", "UnTip()");
	iimg.setAttribute("onmouseover", "Tip('Martins-pêcheurs (photo prise en Albanie)', BGCOLOR, '#FFFFAA', FONTFACE, 'Courier New', FONTSIZE, '8pt', ABOVE, 'true', " +
		"TEXTALIGN, 'center')");

	// bouton des options
	var btnmm = document.createElement("input");
	btnmm.type = "button";
	btnmm.id = "boptions";
	btnmm.value = "Options du script";
	btnmm.addEventListener("click", optionsfct, true);
	btnmm.setAttribute("onmouseout", "UnTip()");
	btnmm.setAttribute("onmouseover", "Tip(\"Cliquez ici pour accéder aux options :<br>- d'affichage dans les enclos,<br>- des vieux,<br>- de gestion des mourants," +
		"<br>- de gestion des PA,<br>- de gestion des stocks,<br>- des alertes,<br>- d'affichage sur le forum,<br>- de tri dans les rapports,<br>- de gestion " +
		"du nombre maximal d'adultes,<br>- des graphiques.\", BGCOLOR, '#FFFFAA', FONTFACE, 'Courier New', FONTSIZE, '8pt', ABOVE, 'true', TEXTALIGN, 'center')");
	btnmm.style.cursor = "pointer";
	var div_btn = document.createElement("div");
	div_btn.setAttribute("class", "link");
	div_btn.appendChild(btnmm);

	var menu = $c("menu")[0], liens = $t("a", menu), i4;
	for (i4=0;i4<liens.length;i4++)
	{	if (/animaux.php/.test(liens[i4].href))
		{	liens[i4].innerHTML = "Vos animaux"; continue; }
		if (/bourse.php/.test(liens[i4].href))
		{	liens[i4].setAttribute("style", "color:#634425"); continue; }
		if (/event.php/.test(liens[i4].href))
		{	liens[i4].setAttribute("style", "color:#634425"); continue; }
		if (/team.php/.test(liens[i4].href))
		{	if (GM_getValue("team_"+id_zoo, false))
				liens[i4].innerHTML = "Ma team";
			break;
		}
	}
	menu.appendChild(iimg);
	menu.insertBefore(div_btn, liens[0].parentNode);
}

function optionsfct() // fenêtre des options
{
	var bdivop = $("options");
	if (!bdivop)
	{	bdivop = document.createElement("div");
		bdivop.id = "options";
		bdivop.className = "info_bulle";
		bdivop.style.top = "0px";
		document.body.appendChild(bdivop);

		var i4, choixop, nomop;
		var texto = document.createElement("h4");
		texto.setAttribute("style", "margin-top:3px");
		texto.innerHTML = "- Type d'encadrement dans les enclos pour les naissances, les mourants et les vieux (choix pris en compte immédiatement) :";
		bdivop.appendChild(texto);

		// type d'affichage : 1 = encadrement de l'image et de la barre de vie, 2 = uniquement de la barre de vie
		var listeop = document.createElement("select");
		listeop.setAttribute("style", "background-color:#eac893;font-size:12px");
		listeop.id = "choix_affichage";
		for (i4=1;i4<3;i4++)
		{	choixop = document.createElement("option");
			choixop.value = i4;
			choixop.innerHTML = i4 == 1 ? "Encadrement complet (image + barre)" : "Encadrement uniquement de la barre de vie";
			listeop.appendChild(choixop);
		}
		listeop.selectedIndex = parseInt(GM_getValue("p_affichage", 1)) - 1;
		bdivop.appendChild(listeop);
		ajoute_br(bdivop);

		texto = document.createElement("h4");
		texto.innerHTML = "- Age maximum des vieux (choix pris en compte immédiatement) :";
		bdivop.appendChild(texto);

		// âge des vieux, 10 par défaut
		choixop = document.createElement("input");
		choixop.type = "text";
		choixop.name = "choix_vieux";
		choixop.setAttribute("style", "font-size:11px;padding:0px;text-align:center");
		choixop.size = "3";
		choixop.value = parseInt(GM_getValue("vieux", 10));
		nomop = document.createElement("label");
		nomop.setAttribute("for", "choix_vieux");
		nomop.innerHTML = " (minimum = 5; maximum = 92)";
		bdivop.appendChild(choixop);
		bdivop.appendChild(nomop);
		ajoute_br(bdivop);

		texto = document.createElement("h4");
		texto.innerHTML = "- Suppression automatique des mourants lors du scan initial (choix pris en compte à la prochaine MAJ) :";
		bdivop.appendChild(texto);

		// suppression des mourants : 1 = non, 2 = oui
		listeop = document.createElement("select");
		listeop.setAttribute("style", "background-color:#eac893;font-size:12px");
		listeop.id = "choix_suppmourants";
		for (i4=1;i4<3;i4++)
		{	choixop = document.createElement("option");
			choixop.value = i4;
			choixop.innerHTML = i4 == 1 ? "Non" : "Oui";
			listeop.appendChild(choixop);
		}
		listeop.selectedIndex = parseInt(GM_getValue("supp_mourants", 2)) - 1;
		bdivop.appendChild(listeop);
		ajoute_br(bdivop);

		texto = document.createElement("h4");
		texto.innerHTML = "- Mettre à jour automatiquement les PA après un achat ou une vente (choix pris en compte immédiatement) :";
		bdivop.appendChild(texto);

		// MAJ auto des PA : 1 = oui, 2 = non
		listeop = document.createElement("select");
		listeop.setAttribute("style", "background-color:#eac893;font-size:12px");
		listeop.id = "choix_majautoPA";
		for (i4=1;i4<3;i4++)
		{	choixop = document.createElement("option");
			choixop.value = i4;
			choixop.innerHTML = i4 == 1 ? "Oui" : "Non merci, je me débrouille très bien tout seul";
			listeop.appendChild(choixop);
		}
		listeop.selectedIndex = parseInt(GM_getValue("majautoPA", 1)) - 1;
		bdivop.appendChild(listeop);
		ajoute_br(bdivop);

		texto = document.createElement("h4");
		texto.innerHTML = "- Contrer partiellement le bug de la double MAJ (choix pris en compte immédiatement) :";
		bdivop.appendChild(texto);

		// pour contrer le bug de la double MAJ : 1 = on contre en doublant les stocks, 2 = on ne fait rien
		listeop = document.createElement("select");
		listeop.setAttribute("style", "background-color:#eac893;font-size:12px");
		listeop.id = "choix_antibug";
		for (i4=1;i4<3;i4++)
		{	choixop = document.createElement("option");
			choixop.value = i4;
			choixop.innerHTML = i4 == 1 ? "Je double les stocks" : "Je ne fais rien";
			listeop.appendChild(choixop);
		}
		listeop.selectedIndex = parseInt(GM_getValue("antibug", 1)) - 1;
		bdivop.appendChild(listeop);
		ajoute_br(bdivop);

		texto = document.createElement("h4");
		texto.innerHTML = "- A la fin ou en cas d'interruption d'un cycle long (scan, recherche d'animal bonus, achat multiple...), me prévenir avec une " +
			"alerte sonore (choix pris en compte immédiatement) :";
		bdivop.appendChild(texto);

		// alerte sonore : 1 = oui, 2 = non
		listeop = document.createElement("select");
		listeop.setAttribute("style", "background-color:#eac893;font-size:12px");
		listeop.id = "choix_son";
		for (i4=1;i4<3;i4++)
		{	choixop = document.createElement("option");
			choixop.value = i4;
			choixop.innerHTML = i4 == 1 ? "Emettre un son" : "M'alerter mais sans émettre de son";
			listeop.appendChild(choixop);
		}
		listeop.selectedIndex = parseInt(GM_getValue("son", 1)) - 1;
		bdivop.appendChild(listeop);
		ajoute_br(bdivop);

		texto = document.createElement("h4");
		texto.innerHTML = "- Affichage sur le forum des achats et/ou des ventes (choix pris en compte immédiatement, après que vous ayez actualisé éventuellement la " +
			"page du forum) :";
		bdivop.appendChild(texto);

		// affichage des achats/ventes sur le forum : 1 = tout afficher, 2 = rien, 3 = les achats, 4 = les ventes
		listeop = document.createElement("select");
		listeop.setAttribute("style", "background-color:#eac893;font-size:12px");
		listeop.id = "choix_achatforum";
		for (i4=1;i4<5;i4++)
		{	choixop = document.createElement("option");
			choixop.value = i4;
			switch(i4)
			{	case 1 : choixop.innerHTML = "Tout afficher"; break;
				case 2 : choixop.innerHTML = "Ne rien afficher"; break;
				case 3 : choixop.innerHTML = "N'afficher que les achats"; break;
				case 4 : choixop.innerHTML = "N'afficher que les ventes";
			}
			listeop.appendChild(choixop);
		}
		listeop.selectedIndex = parseInt(GM_getValue("achatforum", 1)) - 1;
		bdivop.appendChild(listeop);
		ajoute_br(bdivop);

		texto = document.createElement("h4");
		texto.innerHTML = "- Tri des naissances, des achats, des ventes et des trouvailles dans les rapports (choix pris en compte immédiatement, après que vous " +
			"ayez actualisé éventuellement la page du forum ou relancé le rapport) :";
		bdivop.appendChild(texto);

		// Tri des espèces dans les rapports : 1 = alphabétique, 2 = prix décroissant
		listeop = document.createElement("select");
		listeop.setAttribute("style", "background-color:#eac893;font-size:12px");
		listeop.id = "choix_trirapports";
		for (i4=1;i4<3;i4++)
		{	choixop = document.createElement("option");
			choixop.value = i4;
			choixop.innerHTML = i4 == 1 ? "Tri par ordre alphabétique" : "Tri selon le prix (de base) décroissant des animaux";
			listeop.appendChild(choixop);
		}
		listeop.selectedIndex = parseInt(GM_getValue("trirapports", 2)) - 1;
		bdivop.appendChild(listeop);
		ajoute_br(bdivop);

		texto = document.createElement("h4");
		texto.innerHTML = "- Gérer le nombre d'adultes maxi de chaque espèce pour chaque enclos (choix pris en compte immédiatement. La vente automatique se fait " +
			"lors du scan initial) :";
		bdivop.appendChild(texto);

		// afficher les adultes maxi et gérer les futurs adultes : 1 = non, 2 = oui sans gestion, 3 = oui avec gestion (alertes)
		listeop = document.createElement("select");
		listeop.setAttribute("style", "background-color:#eac893;font-size:12px");
		listeop.id = "choix_afficheadulte";
		for (i4=1;i4<5;i4++)
		{	choixop = document.createElement("option");
			choixop.value = i4;
			switch(i4)
			{	case 1 : choixop.innerHTML = "Non"; break;
				case 2 : choixop.innerHTML = "Oui, mais sans être alerté sur les adultes en trop"; break;
				case 3 : choixop.innerHTML = "Oui, avec alertes"; break;
				case 4 : choixop.innerHTML = "Oui, et vendre automatiquement les adultes en trop";
			}
			listeop.appendChild(choixop);
		}
		listeop.selectedIndex = parseInt(GM_getValue("afficheadulte", 3)) - 1;
		bdivop.appendChild(listeop);
		ajoute_br(bdivop);

		texto = document.createElement("h4");
		texto.setAttribute("style", "margin-bottom:2px");
		texto.innerHTML = "- Graphiques du suivi (choix pris en compte immédiatement) :";
		bdivop.appendChild(texto);

		var tableauop = document.createElement("table");
		tableauop.setAttribute("style", "border-collapse:collapse");
		var ligneop = document.createElement("tr");
		var caseop = document.createElement("td");
		caseop.width = "7px";
		ligneop.appendChild(caseop);
		caseop = document.createElement("td");
		caseop.width = "250px";
		texto = document.createElement("h4");
		texto.setAttribute("style", "margin-top:0px;color:#634425");
		texto.innerHTML = "- nbr maxi de points à afficher en même temps :";
		caseop.appendChild(texto);

		// nombre de points à afficher en même temps
		choixop = document.createElement("input");
		choixop.type = "text";
		choixop.name = "choix_nbpoints";
		choixop.setAttribute("style", "font-size:11px;padding:0px;text-align:center");
		choixop.size = "3";
		choixop.value = parseInt(GM_getValue("nb_points", 50));
		nomop = document.createElement("label");
		nomop.setAttribute("for", "choix_nbpoints");
		nomop.innerHTML = " (minimum = 20)";
		caseop.appendChild(choixop);
		caseop.appendChild(nomop);
		ligneop.appendChild(caseop);
		tableauop.appendChild(ligneop);

		ligneop = document.createElement("tr");
		caseop = document.createElement("td");
		ligneop.appendChild(caseop);
		caseop = document.createElement("td");
		caseop.setAttribute("style", "padding-bottom:7px");
		texto = document.createElement("h4");
		texto.setAttribute("style", "margin-top:4px;color:#634425");
		texto.innerHTML = "- choix dans la répartition des points :";
		caseop.appendChild(texto);

		// répartition des points : 1 = équilibré, 2 = les derniers, 3 = tous
		listeop = document.createElement("select");
		listeop.setAttribute("style", "background-color:#eac893;font-size:12px");
		listeop.id = "choix_répartition";
		listeop.setAttribute("onmouseout", "UnTip()");
		listeop.setAttribute("onmouseover", "Tip(\"- choix 1 = on affiche les points équitablement répartis depuis l'origine jusqu'aux dernières données<br>" +
			"- choix 2 = on n'affiche que les dernières données<br>- choix 3 = on affiche tous les points, avec ajout d'un ascenseur si on dépasse le nombre " +
			"maxi défini ci-dessus\", WIDTH, 395, BGCOLOR, '#FFFFAA', FONTFACE, 'Courier New', FONTSIZE, '8pt', ABOVE, 'true', TEXTALIGN, 'center')");
		for (i4=1;i4<4;i4++)
		{	choixop = document.createElement("option");
			choixop.value = i4;
			switch(i4)
			{	case 1 : choixop.innerHTML = "Le nombre demandé, équitablement répartis"; break;
				case 2 : choixop.innerHTML = "Le nombre demandé, les derniers"; break;
				case 3 : choixop.innerHTML = "Tous les points";
			}
			listeop.appendChild(choixop);
		}
		listeop.selectedIndex = parseInt(GM_getValue("typerepartition", 3)) - 1;
		caseop.appendChild(listeop);
		ligneop.appendChild(caseop);
		tableauop.appendChild(ligneop);
		bdivop.appendChild(tableauop);

		// boutons et version
		tableauop = document.createElement("table");
		ligneop = document.createElement("tr");
		// bouton enregistrer
		caseop = document.createElement("td");
		caseop.style.textAlign = "right";
		caseop.width = "160px";
		var btnop = document.createElement("input");
		btnop.type = "button";
		btnop.value = "Sauvegarder";
		btnop.addEventListener("click", enregistre_options, true);
		caseop.appendChild(btnop);
		ligneop.appendChild(caseop);
		// bouton annuler
		caseop = document.createElement("td");
		caseop.style.textAlign = "center";
		caseop.width = "120px";
		btnop = document.createElement("input");
		btnop.type = "button";
		btnop.value = "Annuler";
		btnop.addEventListener("click", annule_options, true);
		caseop.appendChild(btnop);
		ligneop.appendChild(caseop);
		caseop = document.createElement("td");
		caseop.style.width = "55px";
		ligneop.appendChild(caseop);
		// version
		caseop = document.createElement("td");
		caseop.innerHTML = "Version : " + this_version;
		caseop.setAttribute("style", "text-align:center;font-weight:bold;width:130px;border:1px solid #B86242");
		ligneop.appendChild(caseop);
		tableauop.appendChild(ligneop);
		bdivop.appendChild(tableauop);
		bdivop.style.width = "";
		bdivop.style.left = (window.innerWidth - bdivop.clientWidth) / 2 + "px";
		if (bdivop.clientHeight + ($("largeligne") && window.scrollMaxX > 0 ? 17 : 0) > window.innerHeight)
		{	bdivop.style.height = window.innerHeight - 12 - ($("largeligne") && window.scrollMaxX > 0 ? 17 : 0) + "px";
			bdivop.style.width = bdivop.clientWidth + 26 + "px";
		}
	}
}

function annule_options() // ferme la fenêtre des options après confirmation si modifs
{
	var oldop;
	if (GM_getValue("p_affichage", 1) != 1 + $("choix_affichage").selectedIndex || parseInt(GM_getValue("supp_mourants", 2)) != 1 + $("choix_suppmourants").selectedIndex ||
		parseInt(GM_getValue("antibug", 1)) != 1 + $("choix_antibug").selectedIndex || parseInt(GM_getValue("majautoPA", 1)) != 1 + $("choix_majautoPA").selectedIndex ||
		parseInt(GM_getValue("son", 1)) != 1 + $("choix_son").selectedIndex || parseInt(GM_getValue("achatforum", 1)) != 1 + $("choix_achatforum").selectedIndex ||
		parseInt(GM_getValue("trirapports", 2)) != 1 + $("choix_trirapports").selectedIndex || parseInt(GM_getValue("nb_points", 50)) != parseInt($n("choix_nbpoints").value) ||
		parseInt(GM_getValue("vieux", 10)) != parseInt($n("choix_vieux").value) || parseInt(GM_getValue("typerepartition", 3)) != 1 + $("choix_répartition").selectedIndex ||
		(parseInt(GM_getValue("afficheadulte", 3)) != 1 + $("choix_afficheadulte").selectedIndex && ($("choix_afficheadulte").selectedIndex != -1 ||
		parseInt(GM_getValue("afficheadulte", 3)) != 5)))
	{	if (confirm("Etes-vous sûr de vouloir annuler les modifications apportées ?"))
			oldop = $("options").parentNode.removeChild($("options"));
	}
	else oldop = $("options").parentNode.removeChild($("options"));
}

function enregistre_options() // enregistre les options
{
	var badval = false, modif_choix = false, reactualisergr = false;
	var graph = $t("title")[0].innerHTML == "Monzoo - Suivi";
	reactualiser = false;

	if (GM_getValue("p_affichage", 1) != 1 + $("choix_affichage").selectedIndex)
	{	modif_choix = true;
		GM_setValue("p_affichage", 1 + $("choix_affichage").selectedIndex);
		if (/enclosgestion1.php/.test(window.location)) reactualiser = true;
	}
	if (parseInt(GM_getValue("supp_mourants", 2)) != 1 + $("choix_suppmourants").selectedIndex)
	{	modif_choix = true;
		GM_setValue("supp_mourants", 1 + $("choix_suppmourants").selectedIndex);
	}
	if (parseInt(GM_getValue("majautoPA", 1)) != 1 + $("choix_majautoPA").selectedIndex)
	{	modif_choix = true;
		GM_setValue("majautoPA", 1 + $("choix_majautoPA").selectedIndex);
	}
	if (parseInt(GM_getValue("antibug", 1)) != 1 + $("choix_antibug").selectedIndex)
	{	modif_choix = true;
		GM_setValue("antibug", 1 + $("choix_antibug").selectedIndex);
		if (/bureau4.php/.test(window.location)) reactualiser = true;
	}
	if (parseInt(GM_getValue("son", 1)) != 1 + $("choix_son").selectedIndex)
	{	modif_choix = true;
		GM_setValue("son", 1 + $("choix_son").selectedIndex);
	}
	if (parseInt(GM_getValue("achatforum", 1)) != 1 + $("choix_achatforum").selectedIndex)
	{	modif_choix = true;
		GM_setValue("achatforum", 1 + $("choix_achatforum").selectedIndex);
	}
	if (parseInt(GM_getValue("trirapports", 2)) != 1 + $("choix_trirapports").selectedIndex)
	{	modif_choix = true;
		GM_setValue("trirapports", 1 + $("choix_trirapports").selectedIndex);
	}
	if (parseInt(GM_getValue("afficheadulte", 3)) != 1 + $("choix_afficheadulte").selectedIndex && ($("choix_afficheadulte").selectedIndex != -1 ||
		parseInt(GM_getValue("afficheadulte", 3)) != 5))
	{	var modifok = false;
		if (1 + $("choix_afficheadulte").selectedIndex == 4)
		{	var typeoption = null;
			switch(parseInt(GM_getValue("afficheadulte", 3)))
			{	case 1 : alert("Il n'est pas possible de passer directement de l'option 'sans gestion du nombre de couples adultes' à l'option 'avec vente automatique des " +
					"adultes en trop'.\n\nAvant de passer à la vente automatique, très dangereuse, merci de choisir une option de gestion des adultes maxi (avec ou sans " +
					"alertes, le choix avec alertes étant conseillé), de vérifier les valeurs maxi de TOUTES vos espèces dans TOUS vos enclos et de tester cela pendant " +
					"suffisamment de temps.\n\nQuand vous serez certain de vos valeurs maxi, alors vous pourrez passez à la vente automatique."); break;
				case 2: typeoption = "l'option 'avec alertes'"; break;
				case 3: typeoption = "avec l'option en cours";
			}
			if (typeoption)
				if (confirm("ATTENTION, DANGER !!!\n\nIl est dangereux de passer à la vente automatique des adultes en trop (lorsque, pour une espèce donnée d'un enclos, " +
					"les futurs adultes dépassent la valeur des adultes maxi, les plus vieux adultes en trop sont vendus).\n\nIl est conseillé de vérifier les valeurs maxi " +
					"de TOUTES vos espèces dans TOUS vos enclos et de tester " + typeoption + " pendant suffisamment de temps avant de basculer sur l'option 'vente " +
					"automatique'.\n\nMais si vous pensez être prêt dès maintenant pour passer à cette option, vous pouvez alors cliquer sur 'OK'.")) modifok = true;
		}
		else modifok = true;
		if (modifok)
		{	modif_choix = true;
			GM_setValue("afficheadulte", 1 + $("choix_afficheadulte").selectedIndex);
			trienclosavoir();
			if (/enclosgestion1.php/.test(window.location) || /vente_animaux.php/.test(window.location) || /vente_animaux_group.php/.test(window.location) ||
				/achat_animaux.php/.test(window.location) || /achat_animauxconfirm.php/.test(window.location) || window.location.href.indexOf(monzoo) != -1 ||
				window.location.href == urlSite + "animaux.php" || /bourse.php/.test(window.location) || /event.php/.test(window.location)) reactualiser = true;
		}
	}
	if (parseInt(GM_getValue("typerepartition", 3)) != 1 + $("choix_répartition").selectedIndex)
	{	modif_choix = true;
		GM_setValue("typerepartition", 1 + $("choix_répartition").selectedIndex);
		if (graph) reactualisergr = true;
	}

	var choixeo = $n("choix_nbpoints").value;
	var i4 = parseInt(choixeo);
	if (i4 > 19 && parseFloat(choixeo) - i4 == 0)
	{	if (parseInt(GM_getValue("nb_points", 50)) != i4)
		{	modif_choix = true;
			GM_setValue("nb_points", i4);
			if (graph) reactualisergr = true;
		}
	}
	else
	{	badval = true;
		alert("valeur incorrecte pour le nombre de points des graphiques :\nmerci de saisir une valeur entière supérieure ou égale à 20");
	}

	choixeo = $n("choix_vieux").value;
	i4 = parseInt(choixeo);
	if (i4 > 4 && i4 < 93 && parseFloat(choixeo) - i4 == 0)
	{	if (parseInt(GM_getValue("vieux", 10)) != i4)
		{	modif_choix = true;
			GM_setValue("vieux", i4);
			if (/enclosgestion1.php/.test(window.location) || window.location.href == urlSite + "animaux.php" || /bourse.php/.test(window.location) ||
				window.location.href.indexOf(monzoo) != -1) reactualiser = true;
			MAJvieux();
		}
	}
	else
	{	badval = true;
		alert("valeur incorrecte pour l'âge maximum des vieux :\nmerci de saisir une valeur entière entre 5 et 92 compris");
	}

	if (!badval)
	{	var oldop = $("options").parentNode.removeChild($("options"));
		var txtalert;
		if (modif_choix && (reactualisergr || (reactualiser && !graph)))
		{	txtalert = "Vos nouveaux choix ont été enregistrés.\n\nLa page va être rechargée, merci de patienter.";
			if (/vente_animaux_group.php/.test(window.location) || /achat_animauxconfirm.php/.test(window.location))
				txtalert += "\n\nATTENTION, IMPORTANT : merci de cliquer sur le bouton\n'Renvoyer' dans le message qui va suivre afin d'éviter tout\nplantage du script";
		}
		else if (modif_choix) txtalert = "Vos nouveaux choix ont été enregistrés";
		else txtalert = "Vous n'avez rien changé !";
		alert(txtalert);
		if (reactualiser && !graph) window.location.reload(true);
		else if (reactualisergr) suivifct();
	}
}

function MAJvieux()
{
	var synthvieuxmv = unserialize(GM_getValue("synthvieux_" + id_zoo, ""));
	var valvieux = parseInt(GM_getValue("vieux", 10));
	var numenclosmv, sexev, cptv, agets, age1, agedv, i5;
	for (numenclosmv in synthvieuxmv) break;
	if (numenclosmv)
	{	for (numenclosmv in synthvieuxmv)
		{	for (i5=0; i5<synthvieuxmv[numenclosmv].length;i5+=9)
			{	for (sexev=0; sexev<2; sexev++)
				{	cptv = 0;
					agedv = "";
					agets = synthvieuxmv[numenclosmv][i5+5+sexev] + synthvieuxmv[numenclosmv][i5+7+sexev];
					while (agets.indexOf("/") != -1)
					{	age1 = agets.substring(1);
						age1 = age1.indexOf("/") != -1 ? age1.substring(0, age1.indexOf("/")) : age1;
						if (parseInt(age1) <= valvieux)
						{	agedv += "/" + age1;
							agets = agets.substring(age1.length + 1);
							cptv++;
						}
						else break;
					}
					synthvieuxmv[numenclosmv][i5+3+sexev] = cptv;
					synthvieuxmv[numenclosmv][i5+5+sexev] = agedv;
					synthvieuxmv[numenclosmv][i5+7+sexev] = agets;
				}
			}
		}
		GM_setValue("synthvieux_" + id_zoo, serialize(synthvieuxmv));
		if (/vente_animaux.php/.test(window.location) || /vente_animaux_group.php/.test(window.location) || /achat_animaux.php/.test(window.location) ||
			/achat_animauxconfirm.php/.test(window.location))
		{	var enclosmv = unserialize(GM_getValue("enclos", ""));
			var especemv;
			for (especemv in enclosmv) break;
			if (especemv)
			{	reactualiser = true;
				numenclosmv = GM_getValue("numenclos");
				for (i5=0; i5<synthvieuxmv[numenclosmv].length;i5+=9)
				{	enclosmv[synthvieuxmv[numenclosmv][i5]][2] = synthvieuxmv[numenclosmv][i5+3];
					enclosmv[synthvieuxmv[numenclosmv][i5]][3] = synthvieuxmv[numenclosmv][i5+4];
				}
				GM_setValue("enclos", serialize(enclosmv));
			}
		}
	}
}

function montre_zoos() // affiche et masque la liste des zoos sur le forum
{
	$("liste_zoo").style.display = $("liste_zoo").style.display == "none" ? "" : "none";
}

function affichedefis(ou, prad)
{
	if (!prad) prad = "";
	var defi2ad = GM_getValue("defi_" + prad + id_zoo, "5 bébés Carpe ancestrale/3 bébés Diable de tasmanie");
	var defi1ad = defi2ad.substring(0,defi2ad.indexOf("/"));
	defi2ad = defi2ad.substring(defi2ad.indexOf("/")+1);
	var but1 = parseInt(defi1ad.substring(0, defi1ad.indexOf(" ")));
	var but2 = parseInt(defi2ad.substring(0, defi2ad.indexOf(" ")));
	var etape2ad = GM_getValue("etapes_" + prad + id_zoo, "0/0");
	var etape1ad = parseInt(etape2ad.substring(0,etape2ad.indexOf("/")));
	etape2ad = parseInt(etape2ad.substring(etape2ad.indexOf("/")+1));
	var m1 = etape1ad < but1 ? "non atteint" : ou == "forum" ? "[color=#4bb86c]réussi[/color]" : "<span style='color:#4bb86c;font-weight:bold;font-size:15px;'>réussi</span>";
	var m2 = etape2ad < but2 ? "non atteint" : ou == "forum" ? "[color=#4bb86c]réussi[/color]" : "<span style='color:#4bb86c;font-weight:bold;font-size:15px;'>réussi</span>";
	var avancement2 = GM_getValue("avancement_" + prad + id_zoo, "0/0");
	var avancement1 = parseInt(avancement2.substring(0,avancement2.indexOf("/")));
	avancement2 = parseInt(avancement2.substring(avancement2.indexOf("/")+1));
	var m3 = etape1ad == 0 ? "" : avancement1 != 0 ? " (avancement : + " + avancement1 + ")" : " (sans changement)";
	var m4 = etape2ad == 0 ? "" : avancement2 != 0 ? " (avancement : + " + avancement2 + ")" : " (sans changement)";
	if (ou == "forum")
		return "\r\n[u][b]Défi 1 " + m1 + "[/b][/u] : " + etape1ad + " / " + defi1ad + m3 + "\r\n[u][b]Défi 2 " + m2 + "[/b][/u] : " + etape2ad + " / " + defi2ad + m4;
	else if (ou == "carte")
	{	var diffdefi = GM_getValue("defi_" + id_zoo, "5 bébés Carpe ancestrale/3 bébés Diable de tasmanie") !=
			GM_getValue("defi", "5 bébés Carpe ancestrale/3 bébés Diable de tasmanie");
		var tabdef = new Array();
		tabdef[0] = diffdefi ? "" : m1 == "non atteint" ? m3 : " (" + m1 + ")";
		tabdef[1] = diffdefi ? "" : m2 == "non atteint" ? m4 : " (" + m2 + ")";
		return tabdef;
	}
	else return "Défi 1 " + m1 + " : " + etape1ad + " / " + defi1ad + m3 + "<br>Défi 2 " + m2 + " : " + etape2ad + " / " + defi2ad + m4;
}

function testzonemembre()
{
	var affdeftz = GM_getValue("news", "") != "" &&  GM_getValue("news", "") != "init";
	var defi1tz = btd[1].innerHTML;
	defi1tz = defi1tz.substring(defi1tz.indexOf("</strong>")+9).trim();
	defi1tz = defi1tz.substring(8, defi1tz.indexOf("</stron")).replace("<strong>", "");
	var defi2tz = btd[4].innerHTML;
	defi2tz = defi2tz.substring(defi2tz.indexOf("</strong>")+9).trim();
	defi2tz = defi2tz.substring(8, defi2tz.indexOf("</stron")).replace("<strong>", "");
	if (GM_getValue("defi", "") != defi1tz + "/" + defi2tz)
	{	GM_setValue("defi", defi1tz + "/" + defi2tz);
		if (affdeftz) GM_setValue("affnewdefi", true);
	}
	if (affdeftz && GM_getValue("defi") != GM_getValue("defi_" + id_zoo, GM_getValue("defi"))) GM_setValue("chgdef", true);

	var batz = $t("a"), i5;
	for (i5=0;i5<batz.length;i5++) if (batz[i5].href.indexOf("news.php") != -1) break;
	if (batz[i5].innerHTML == "") batz[i5].innerHTML = "bug page des news : ne cliquez pas ici !";
	if (GM_getValue("news", "") != batz[i5].innerHTML && batz[i5].innerHTML != "bug page des news : ne cliquez pas ici !")
	{	if (affdeftz) GM_setValue("affnews", true);
		GM_setValue("news", batz[i5].innerHTML);
	}
	return affdeftz;
}

function creeMAJold(numzoo, oldMAJ)
{
	GM_setValue("string_naissances_o_" + numzoo, GM_getValue("string_naissances_o_" + numzoo, "") + oldMAJ + GM_getValue("string_naissances_" + numzoo, ""));
	GM_setValue("string_trouvailles_o_" + numzoo, GM_getValue("string_trouvailles_o_" + numzoo, "") + oldMAJ + GM_getValue("string_trouvailles_" + numzoo, ""));
	GM_setValue("string_vols_o_" + numzoo, GM_getValue("string_vols_o_" + numzoo, "") + oldMAJ + GM_getValue("string_vols_" + numzoo, ""));
	GM_setValue("string_achats_o_" + numzoo, GM_getValue("string_achats_o_" + numzoo, "") + oldMAJ + GM_getValue("string_achats_" + numzoo, ""));
	GM_setValue("string_ventes_o_" + numzoo, GM_getValue("string_ventes_o_" + numzoo, "") + oldMAJ + GM_getValue("string_ventes_" + numzoo, ""));
	GM_setValue("totalachats_o_" + numzoo, GM_getValue("totalachats_o_" + numzoo, "") + oldMAJ + GM_getValue("totalachats_" + numzoo, 0));
	GM_setValue("totalventes_o_" + numzoo, GM_getValue("totalventes_o_" + numzoo, "") + oldMAJ + GM_getValue("totalventes_" + numzoo, 0));
	GM_setValue("etapes_o_" + numzoo, GM_getValue("etapes_o_" + numzoo, "") + oldMAJ + GM_getValue("etapes_" + numzoo, "0/0"));
	GM_setValue("avancement_o_" + numzoo, GM_getValue("avancement_o_" + numzoo, "") + oldMAJ + GM_getValue("avancement_" + numzoo, "0/0"));
	GM_setValue("defi_o_" + numzoo, GM_getValue("defi_o_" + numzoo, "") + oldMAJ + GM_getValue("defi_" + numzoo, "0 /0 "));
	GM_setValue("tornadefo_o_" + numzoo, GM_getValue("tornadefo_o_" + numzoo, "") + oldMAJ + GM_getValue("tornadefo_" + numzoo, false));
	GM_setValue("oeuffo_o_" + numzoo, GM_getValue("oeuffo_o_" + numzoo, "") + oldMAJ + GM_getValue("oeuffo_" + numzoo, ""));
	GM_setValue("mnaiss_o_" + numzoo, GM_getValue("mnaiss_o_" + numzoo, "") + oldMAJ + GM_getValue("mnaiss_" + numzoo, ""));
	GM_setValue("mavanc_o_" + numzoo, GM_getValue("mavanc_o_" + numzoo, "") + oldMAJ + GM_getValue("mavanc_" + numzoo, ""));
	GM_setValue("attractionfo_o_" + numzoo, GM_getValue("attractionfo_o_" + numzoo, "") + oldMAJ + GM_getValue("attractionfo_" + numzoo, ""));
}

function suppMAJold(numzoo, vart)
{
	if (!vart) vart = "";
	GM_deleteValue("string_naissances_o" + vart + "_" + numzoo);
	GM_deleteValue("string_trouvailles_o" + vart + "_" + numzoo);
	GM_deleteValue("string_vols_o" + vart + "_" + numzoo);
	GM_deleteValue("string_achats_o" + vart + "_" + numzoo);
	GM_deleteValue("string_ventes_o" + vart + "_" + numzoo);
	GM_deleteValue("totalachats_o" + vart + "_" + numzoo);
	GM_deleteValue("totalventes_o" + vart + "_" + numzoo);
	GM_deleteValue("etapes_o" + vart + "_" + numzoo);
	GM_deleteValue("avancement_o" + vart + "_" + numzoo);
	GM_deleteValue("defi_o" + vart + "_" + numzoo);
	GM_deleteValue("tornadefo_o" + vart + "_" + numzoo);
	GM_deleteValue("oeuffo_o" + vart + "_" + numzoo);
	GM_deleteValue("mnaiss_o" + vart + "_" + numzoo);
	GM_deleteValue("mavanc_o" + vart + "_" + numzoo);
	GM_deleteValue("attractionfo_o" + vart + "_" + numzoo);
}

function numMAJ(num, typeM)
{
	var valM = GM_getValue(typeM), dervalM;
	while (num > 0 && valM != "")
	{	dervalM = valM.substring(valM.lastIndexOf("#")+1);
		valM = valM.substring(0, valM.lastIndexOf("#"));
		num--;
	}
	if (valM == "" && num > 0) return -1;
	GM_setValue(typeM.replace("_o_", "_ot_"), dervalM.substring(dervalM.indexOf("%")+1));
	return dervalM.substring(0, dervalM.indexOf("%"));
}

function insere_liste() // publie le rapport sur le forum
{
	var mes_naissances, mes_trouvailles, mes_vols, mes_achats, mes_ventes, messdefi, tornadefo, oeuffo, mnaiss, mavanc, attractionfo, insereMAJ = "";

	for (id_zoo in tab_zoo)
		if (this.id == tab_zoo[id_zoo][0]) break;
	var achatforum = parseInt(GM_getValue("achatforum", 1));
	var MAJ = GM_getValue("dateConnexion_"+id_zoo, "");
	var dateMAJ = MAJ.substring(0, MAJ.lastIndexOf("/"));
	if (GM_getValue("string_naissances_o_" + id_zoo, "") != "" && GM_getValue("nbMAJfo", 1) > 1)
	{	var valMAJ, nbMAJ = GM_getValue("nbMAJfo") - 1;
		while (nbMAJ > 0)
		{	valMAJ = numMAJ(nbMAJ, "string_naissances_o_" + id_zoo);
			if (valMAJ != -1)
			{	mes_naissances = listes("naissances", "forum", "ot_", nbMAJ);
				valMAJ = numMAJ(nbMAJ, "string_trouvailles_o_" + id_zoo);
				mes_trouvailles = listes("trouvailles", "forum", "ot_");
				valMAJ = numMAJ(nbMAJ, "string_vols_o_" + id_zoo);
				mes_vols = listes("vols", "forum", "ot_");
				valMAJ = numMAJ(nbMAJ, "string_achats_o_" + id_zoo);
				valMAJ = numMAJ(nbMAJ, "totalachats_o_" + id_zoo);
				mes_achats = achatforum == 1 || achatforum == 3 ? listes("achats", "forum", "ot_") : "";
				valMAJ = numMAJ(nbMAJ, "string_ventes_o_" + id_zoo);
				valMAJ = numMAJ(nbMAJ, "totalventes_o_" + id_zoo);
				mes_ventes = achatforum == 1 || achatforum == 4 ? listes("ventes", "forum", "ot_") : "";
				valMAJ = numMAJ(nbMAJ, "etapes_" + "o_" + id_zoo);
				valMAJ = numMAJ(nbMAJ, "avancement_" + "o_" + id_zoo);
				valMAJ = numMAJ(nbMAJ, "defi_" + "o_" + id_zoo);
				messdefi = affichedefis("forum", "ot_");
				valMAJ = numMAJ(nbMAJ, "tornadefo_o_" + id_zoo);
				tornadefo = GM_getValue("tornadefo_ot_" + id_zoo, "false") == "true" ? "\r\n[color=#FA2104][b]Vous avez eu une tornade ![/b][/color]" : "";
				valMAJ = numMAJ(nbMAJ, "oeuffo_o_" + id_zoo);
				oeuffo = GM_getValue("oeuffo_ot_" + id_zoo, "") != "" ? "\r\n[color=#4bb86c][b]Vous avez trouvé un oeuf de " + GM_getValue("oeuffo_ot_" + id_zoo) +
					" ![/b][/color]" : "";
				valMAJ = numMAJ(nbMAJ, "mnaiss_o_" + id_zoo);
				mnaiss = GM_getValue("mnaiss_ot_" + id_zoo, "") != "" ? "\r\n[color=#4bb86c][b]Vous avez réussi " + GM_getValue("mnaiss_ot_" + id_zoo) +
					" mission" + (parseInt(GM_getValue("mnaiss_ot_" + id_zoo)) > 1 ? "s" : "") + " du pack des missions naissances.[/b][/color]" : "";
				valMAJ = numMAJ(nbMAJ, "mavanc_o_" + id_zoo);
				mavanc = GM_getValue("mavanc_ot_" + id_zoo, "") != "" ? "\r\n[color=#4bb86c][b]Vous avez réussi la mission " + GM_getValue("mavanc_ot_" + id_zoo) +
					" (" + nommisavanc(GM_getValue("mavanc_ot_" + id_zoo)) + ") du pack des missions avancées.[/b][/color]" : "";
				valMAJ = numMAJ(nbMAJ, "attractionfo_o_" + id_zoo);
				attractionfo = GM_getValue("attractionfo_ot_" + id_zoo, "") != "" ? "\r\n[color=#4bb86c][b]Vous avez une attraction exceptionnelle : l'espèce " +
					GM_getValue("attractionfo_ot_" + id_zoo) + " est disponible à l'achat ![/b][/color]" : "";
				insereMAJ += "[u][b]MAJ n°[/b][/u] " + valMAJ + " [u][b]du[/b][/u] " + dateMAJ + tornadefo + oeuffo + mnaiss + mavanc + attractionfo + messdefi + "\r\n" +
					mes_naissances + mes_trouvailles + mes_vols + mes_achats + mes_ventes + "\r\n\r\n";
			}
			nbMAJ--;
		}
		suppMAJold(id_zoo, "t");
	}
	MAJ = MAJ.substring(MAJ.lastIndexOf("/")+1);
	mes_naissances = listes("naissances", "forum");
	mes_trouvailles = listes("trouvailles", "forum");
	mes_vols = listes("vols", "forum");
	mes_achats = achatforum == 1 || achatforum == 3 ? listes("achats", "forum") : "";
	mes_ventes = achatforum == 1 || achatforum == 4 ? listes("ventes", "forum") : "";
	messdefi = affichedefis("forum");
	tornadefo = GM_getValue("tornadefo_" + id_zoo, false) ? "\r\n[color=#FA2104][b]Vous avez eu une tornade ![/b][/color]" : "";
	oeuffo = GM_getValue("oeuffo_" + id_zoo, "") != "" ? "\r\n[color=#4bb86c][b]Vous avez trouvé un oeuf de " + GM_getValue("oeuffo_" + id_zoo) + " ![/b][/color]" : "";
	mnaiss = GM_getValue("mnaiss_" + id_zoo, "") != "" ? "\r\n[color=#4bb86c][b]Vous avez réussi " + GM_getValue("mnaiss_" + id_zoo) + " mission" +
		(parseInt(GM_getValue("mnaiss_" + id_zoo)) > 1 ? "s" : "") + " du pack des missions naissances.[/b][/color]" : "";
	mavanc = GM_getValue("mavanc_" + id_zoo, "") != "" ? "\r\n[color=#4bb86c][b]Vous avez réussi la mission " + GM_getValue("mavanc_" + id_zoo) +
		" (" + nommisavanc(GM_getValue("mavanc_" + id_zoo)) + ") du pack des missions avancées.[/b][/color]" : "";
	attractionfo = GM_getValue("attractionfo_" + id_zoo, "") != "" ? "\r\n[color=#4bb86c][b]Vous avez une attraction exceptionnelle : l'espèce " +
		GM_getValue("attractionfo_" + id_zoo) + " est disponible à l'achat ![/b][/color]" : "";
	$("req_message").value += "\r\n[quote][u][b]Version :[/b][/u] " + this_version + "\r\n[u][b]Parc :[/b][/u] " + tab_zoo[id_zoo][0] +
		"\r\n\r\n" + insereMAJ + "[u][b]MAJ n°[/b][/u] " + MAJ + " [u][b]du[/b][/u] " + dateMAJ + tornadefo + oeuffo + mnaiss + mavanc + attractionfo + messdefi + "\r\n" +
		mes_naissances + mes_trouvailles + mes_vols + mes_achats + mes_ventes + "[/quote]\r\n";
}

function affiche_rapport(btdar, scan_fait) // affiche le rapport
{
	var contenu_rapport = "<div class=\"bloc_rapport\"><h6>Enclos</h6>";
	if (!scan_fait)
	{	contenu_rapport += "<span class=\"attention\">Attention,</span><br>";
		contenu_rapport += "<span>il y a peut-être un déséquilibre de PA dans un certain nombre de vos enclos</span><br>";
		contenu_rapport += "<span>et vos stocks de nourriture sont peut-être insuffisants :</span><br>";
		contenu_rapport += "<span>vérifiez vos enclos et vos stocks par vous-même,</span><br>";
		contenu_rapport += "<span>ou mettez tout à jour automatiquement en relançant ce rapport.</span><br>";
	}
	else contenu_rapport += "<span>Les PA de tous vos enclos et vos stocks de nourriture sont à jour.</span><br>";

	contenu_rapport += "</div><hr class=\"separateur\" />";
	contenu_rapport += "<div class=\"bloc_rapport\">" + listes("naissances", "rapport") + "</div><hr class=\"separateur\" />";
	contenu_rapport += "<div class=\"bloc_rapport\">" + listes("trouvailles", "rapport") + "</div><hr class=\"separateur\" />";
	contenu_rapport += "<div class=\"bloc_rapport\">" + listes("vols", "rapport") + "</div><hr class=\"separateur\" />";
	contenu_rapport += "<div class=\"bloc_rapport\">" + listes("achats", "rapport") + "</div><hr class=\"separateur\" />";
	contenu_rapport += "<div class=\"bloc_rapport\">" + listes("ventes", "rapport") + "</div>";

	btdar.innerHTML = contenu_rapport;
	var bimgar = $t("img");
	titrefen("Rapport", positionY(bimgar[bimgar.length-1]));
}

function listes(type_liste, publication, prem, nbMAJnaiss) // crée les listes (vols, naissances, trouvailles, mourants, trop, achats, ventes) pour le rapport et le forum
{
	if (!prem) prem = "";
	if (!nbMAJnaiss) nbMAJnaiss = 0;
	var ma_liste = "", tabli, tableautemp;
	if (type_liste == "vols")
	{	if (GM_getValue("string_vols_" + prem + id_zoo, "") != "")
		{	tabli = unserialize(GM_getValue("string_vols_" + prem + id_zoo, ""));
			var idvol;
			if (publication == "rapport")
			{	for (idvol in tabli) 
				{	if (parseInt(idvol) > 10)
						ma_liste += "<span class=\"attention\">Catastrophe : " + tabli[idvol] + " !</span><br>";
					else ma_liste += "<span class=\"bonus\">Réussi : " + tabli[idvol] + " !</span><br>";
				}
				return "<h6>Vols</h6>" + ma_liste;
			}
			else
			{	for (idvol in tabli) 
				{	if (parseInt(idvol) > 10)
						ma_liste += "[b][color=#FA2104]Catastrophe : " + tabli[idvol] + " ![/color][/b] ";
					else ma_liste += "[b][color=#4bb86c]Réussi : " + tabli[idvol] + " ![/color][/b] ";
				}
				ma_liste = ma_liste.substring(0, ma_liste.length-1);
				return "[u][b]Vols :[/b][/u] " + ma_liste + "\r\n";
			}
		}
		else return publication == "rapport" ? "<h6>Vols</h6><span>Aucun vol réussi.</span>" : "[u][b]Aucun vol réussi[/b][/u].\r\n";
	}
	else
	{	tableautemp = unserialize(GM_getValue("string_" + type_liste + "_" + (publication == "trop" || publication == "mourants" ? publication : prem + id_zoo), ""));
		var enclosli, i6, nbli = 0;
		var ordreli = new Array(), especes = new Array(), nb_animaux = new Array(), cptli = 0;
		if (publication == "mourants" || publication == "trop") { var tli = new Array(), vli = new Array(); tabli = tableautemp; }
		else
		{	tabli = new Array();
			tabli[0] = new Array();
			var trouve, i7;
			for (enclosli in tableautemp)
			{	for (i6=0; i6<tableautemp[enclosli].length; i6+=2)
				{	trouve = false;
					for (i7=0; i7<tabli[0].length; i7+=2)
						if (tabli[0][i7] == tableautemp[enclosli][i6])
						{	tabli[0][i7+1] = parseInt(tabli[0][i7+1]) + parseInt(tableautemp[enclosli][i6+1]);
							trouve = true;
							break;
						}
					if (!trouve)
					{	tabli[0][i7] = tableautemp[enclosli][i6];
						tabli[0][i7+1] = parseInt(tableautemp[enclosli][i6+1]);
					}
				}
			}
		}
		for (enclosli in tabli)
		{	for (i6=0; i6<tabli[enclosli].length; i6+=2)
			{	ordreli[cptli] = cptli;
				especes[cptli] = tabli[enclosli][i6];
				nb_animaux[cptli] = tabli[enclosli][i6+1];
				if (publication == "mourants" || publication == "trop")
				{	tli[cptli] = Math.floor(parseInt(enclosli)/100);
					vli[cptli] = parseInt(enclosli) % 100;
				}
				cptli++;
			}
		}
		ordreli.sort(function (a, b)
		{	if ((publication == "mourants" || publication == "trop") && tli[a]*100+vli[a] != tli[b]*100+vli[b])
				return enclosclasses(tli[a]*100+vli[a]) - enclosclasses(tli[b]*100+vli[b]);
			else if (publication == "mourants" || publication == "trop" || parseInt(GM_getValue("trirapports", 2)) == 1)
			{	if (especes[a] < especes[b])
					return -1;
				else if (especes[a] > especes[b])
					return 1;
				else return 0;
			}
			else return ANIMAUX[especes[b]].prix - ANIMAUX[especes[a]].prix;
		});
		for (i6=0;i6<ordreli.length;i6++)
		{	if (publication == "rapport")
			{	ma_liste += "<span";
				ma_liste += /albinos/.test(especes[ordreli[i6]]) ? " class=\"albinos\"" : ANIMAUX[especes[ordreli[i6]]].bonus ? " class=\"bonus\"" :
					ANIMAUX[especes[ordreli[i6]]].prix > 75000 ? " class=\"cher\"" : "";
				ma_liste += ">" + especes[ordreli[i6]].replace(" ", "&nbsp;", "g") + "&nbsp;:&nbsp;" + nb_animaux[ordreli[i6]] + "</span>, ";
			}
			else if (publication == "mourants" || publication == "trop")
			{	ma_liste += "<span";
				ma_liste += /albinos/.test(especes[ordreli[i6]]) ? " class=\"albinos\"" : ANIMAUX[especes[ordreli[i6]]].bonus ? " class=\"bonus\"" :
					ANIMAUX[especes[ordreli[i6]]].prix > 75000 ? " class=\"cher\"" : "";
				if (i6 != ordreli.length-1 && tli[ordreli[i6]]*100+vli[ordreli[i6]] == tli[ordreli[i6+1]]*100+vli[ordreli[i6+1]])
					enclosli = "";
				else
				{	enclosli = nom_enclos(tli[ordreli[i6]], vli[ordreli[i6]]).replace(" ", "&nbsp;", "g");
					enclosli = "&nbsp;(<a href=\"" + urlSite + "enclosgestion1.php?t=" + tli[ordreli[i6]] + "&v=" + vli[ordreli[i6]] + "\" >" + enclosli + "</a>)";
				}
				ma_liste += ">" + especes[ordreli[i6]].replace(" ", "&nbsp;", "g") + "&nbsp;:&nbsp;" + nb_animaux[ordreli[i6]] + "</span>" + enclosli + ", ";
			}
			else
			{	ma_liste += /albinos/.test(especes[ordreli[i6]]) ? "[b][color=#31b9E4]" : ANIMAUX[especes[ordreli[i6]]].bonus ? "[b][color=#1bb86c]" :
					ANIMAUX[especes[ordreli[i6]]].prix > 75000 ? "[b][color=#2732c7]" : "";
				ma_liste += especes[ordreli[i6]] + " : " + nb_animaux[ordreli[i6]];
				ma_liste += /albinos/.test(especes[ordreli[i6]]) || ANIMAUX[especes[ordreli[i6]]].bonus || ANIMAUX[especes[ordreli[i6]]].prix > 75000 ? "[/color][/b]" : "";
				ma_liste += ", ";
			}
			nbli += parseInt(nb_animaux[ordreli[i6]]);
		}
		if (i6 > 0) ma_liste = ma_liste.substring(0, ma_liste.length -2);
		var sli = nbli > 1 ? "s" : "";
		if (type_liste == "naissances")
		{	var suivi_naiss = GM_getValue("suivi_naissances_" + id_zoo, "");
			suivi_naiss = suivi_naiss.substring(0, suivi_naiss.length - 1);
			while (nbMAJnaiss > 0)
			{	suivi_naiss = suivi_naiss.substring(0, suivi_naiss.lastIndexOf(";"));
				nbMAJnaiss--;
			}
			var la_MAJ = suivi_naiss.substring(suivi_naiss.lastIndexOf(";")+1);
			la_MAJ = new decompose(la_MAJ);
			var males = parseInt(la_MAJ.males), femelles = parseInt(la_MAJ.femelles);
			var s1 = males > 1 ? "s" : "";
			var s2 = femelles > 1 ? "s" : "";
			if (publication == "rapport")
			{	if (nbli == 0) ma_liste = "<span>Aucune naissance.</span>";
				return "Nombre d'animaux&nbsp;:&nbsp;<strong>" + millier(la_MAJ.nbanim) + "</strong>, âge moyen des animaux&nbsp;:&nbsp;<strong>" + la_MAJ.agemoyen +
					"&nbsp;jours restant à vivre</strong>,<br />Nombre de couples adultes&nbsp;:&nbsp;<strong>" + millier(la_MAJ.couples) + "</strong>, nombre de couples " + 
					"adultes de félins&nbsp;:&nbsp;<strong>" + GM_getValue("felins_" + id_zoo, 0) + "</strong>,<br />Valeur réelle du parc&nbsp;:&nbsp;<strong>" +
					millier(la_MAJ.valeurT).replace(" ", "&nbsp;", "g") + "&nbsp;Zoo'z</strong><hr class=\"separateur\" /><h6>" + nbli + " naissance" + sli +
					" (" + males + " mâle" + s1 +"/" + femelles +" femelle" + s2 + ") pour " + la_MAJ.nb_th + " naissances théoriques</h6>Valeur des " +
					"naissances&nbsp;:&nbsp;<strong>" + millier(la_MAJ.valeur).replace(" ", "&nbsp;", "g") + "&nbsp;Zoo'z</strong>, valeur théorique&nbsp;:&nbsp;<strong>" +
					millier(la_MAJ.valeur_th).replace(" ", "&nbsp;", "g") + "&nbsp;Zoo'z</strong>,<br />Valeur moyenne des naissances&nbsp;:&nbsp;<strong>" +
					millier(la_MAJ.moyenne).replace(" ", "&nbsp;", "g") + "&nbsp;Zoo'z</strong>, moyenne théorique&nbsp;:&nbsp;<strong>" +
					millier(la_MAJ.moyenne_th).replace(" ", "&nbsp;", "g") + "&nbsp;Zoo'z</strong><br><br>" + ma_liste;
			}
			else
			{	if (nbli > 0) ma_liste += "\r\n";
				else ma_liste = "aucune naissance.\r\n";
				return "[u][b]Nombre d'animaux :[/b][/u] " + millier(la_MAJ.nbanim) + "\r\n[u][b]Age moyen des animaux :[/b][/u] " + la_MAJ.agemoyen +
					" jours restant à vivre\r\n[u][b]Nombre de couples adultes :[/b][/u] " + millier(la_MAJ.couples) + "\r\n[u][b]Valeur réelle du parc :[/b][/u] " +
					millier(la_MAJ.valeurT) + " Zoo'z\r\n[u][b]" + nbli + " naissance" + sli + "[/b][/u] (" + males + " mâle" + s1 +"/" + femelles +" femelle" + s2 +
					") pour " + la_MAJ.nb_th + " naissances théoriques, [u][b]valeur:[/b][/u] " + millier(la_MAJ.valeur) + " Zoo'z (théorie: " + millier(la_MAJ.valeur_th) +
					"), [u][b]moyenne:[/b][/u] " + millier(la_MAJ.moyenne) + " Zoo'z (théorie: " + millier(la_MAJ.moyenne_th) + "), [u][b]détail:[/b][/u] " + ma_liste;
			}
		}
		else if (type_liste == "trouvailles")
		{	if (publication == "rapport")
			{	if (nbli > 0) return "<h6>" + nbli + " trouvaille" + sli + "</h6>" + ma_liste;
				else return "<h6>Trouvailles</h6><span>Aucune trouvaille.</span>";
			}
			else
			{	if (nbli > 0) return "[u][b]" + nbli + " trouvaille" + sli + " :[/b][/u] " + ma_liste + "\r\n";
				else return "[u][b]Aucune trouvaille[/b][/u].\r\n";
			}
		}
		else if (type_liste == "achats")
		{	if (publication == "rapport")
			{	if (nbli > 0) return "<h6>" + nbli + " achat" + sli + " pour un total de " + millier(GM_getValue("totalachats_" + prem + id_zoo, 0)) +
					" Zoo'z</h6>" + ma_liste;
				else return "<h6>Achats</h6><span>Aucun achat.</span>";
			}
			else
			{	if (nbli > 0) return "[u][b]" + nbli + " achat" + sli + " pour un total de " + millier(GM_getValue("totalachats_" + prem + id_zoo, 0)) +
					" Zoo'z :[/b][/u] " + ma_liste + "\r\n";
				else return "[u][b]Aucun achat[/b][/u].\r\n";
			}
		}
		else
		{	if (publication == "rapport")
			{	if (nbli > 0) return "<h6>" + nbli + " vente" + sli + " pour un total de " + millier(GM_getValue("totalventes_" + prem + id_zoo, 0)) +
					" Zoo'z</h6>" + ma_liste;
				else return "<h6>Ventes</h6><span>Aucune vente.</span>";
			}
			else if (publication == "mourants")
				return "<h4>" + nbli + " mourant" + sli + " pour un total de " + millier(GM_getValue("totalventes_mourants", 0)) + " Zoo'z :</h4>" + ma_liste + "<br>";
			else if (publication == "trop")
				return "<h4>" + nbli + " adulte" + sli + " en trop pour un total de " + millier(GM_getValue("totalventes_trop", 0)) + " Zoo'z :</h4>" + ma_liste + "<br>";
			else
			{	if (nbli > 0) return "[u][b]" + nbli + " vente" + sli + " pour un total de " + millier(GM_getValue("totalventes_" + prem + id_zoo, 0)) +
					" Zoo'z :[/b][/u] " + ma_liste + "\r\n";
				else return "[u][b]Aucune vente[/b][/u].\r\n";
			}
		}
	}
}

function lancerscan()
{
	var ordrels = unserialize(GM_getValue("ordre"));
	var ind = 0;
	var touslesenclosls = unserialize(GM_getValue("touslesenclos_" + id_zoo, ""));
	while ((touslesenclosls[ordrels[ind]] == "Enclos non construit" || touslesenclosls[ordrels[ind]] == "Vide") && ind < 62) ind++;
	if (ind < 62)
	{	var numen = parseInt(ordrels[ind]);
		pagesuivante(urlSite + "enclosgestion1.php?t=" + Math.floor(numen/100) + "&v=" + (numen % 100));
	}
	else // on n'a construit aucun enclos ou ils sont tous vides
	{	GM_deleteValue("ordre");
		var derdatls = GM_getValue("suivi_naissances_" + id_zoo, ""), ajounaisls = false;
		if (derdatls != "")
		{	derdatls = derdatls.substring(0, derdatls.lastIndexOf(":"));
			if (derdatls.indexOf(";") != -1) derdatls = derdatls.substring(derdatls.lastIndexOf(";")+1);
			if (derdatls != GM_getValue("dateConnexion_" + id_zoo)) ajounaisls = true;
		}
		else ajounaisls = true;
		if (ajounaisls)
		{	GM_setValue("suivi_naissances_" + id_zoo, GM_getValue("suivi_naissances_" + id_zoo, "") + GM_getValue("dateConnexion_" + id_zoo) + ":0/0/0/0,0/0,0/0,0/0,0/0;");
			GM_deleteValue("couples_" + id_zoo);
			GM_deleteValue("valeurT_" + id_zoo);
			GM_deleteValue("agemoyen_" + id_zoo);
			GM_deleteValue("valeur_th_" + id_zoo);
			GM_deleteValue("sexes_" + id_zoo);
		}
		var suivicltempls = GM_getValue("suivicltemp", "");
		if (suivicltempls != "")
		{	suivicltempls = suivicltempls.replace("PTS", GM_getValue("ptstemp"));
			GM_setValue("suivi_cl_" + id_zoo, GM_getValue("suivi_cl_" + id_zoo, "") + suivicltempls);
			GM_deleteValue("ptstemp");
			GM_deleteValue("suivicltemp");
		}
		cherchestocks();
	}
}

function cherchestocks()
{
	var stockstempcs = new Array(), espececs, encloscs, listecs, i6, i7;
	var touslesencloscs = unserialize(GM_getValue("touslesenclos_" + id_zoo, ""));
	var synthanimcs = unserialize(GM_getValue("synthanimaux_" + id_zoo, ""));
	for (espececs in ANIMAUX)
	{	if (ANIMAUX[espececs].stock != false || espececs == 'ours rastafarai') // pour rechercher si disponible à l'achat (pas d'animaux à stocks de type bassin !)
		{	encloscs = ANIMAUX[espececs].enclos;
			listecs = "";
			stockstempcs[espececs] = -1;
			listecs = listetypeenclos(encloscs);
			if (listecs.length == 1) stockstempcs[espececs] = listecs[0];
			else
			{	for (i6=0;i6<listecs.length;i6++)
					if (touslesencloscs[listecs[i6]] == "Enclos non construit" || touslesencloscs[listecs[i6]] == "Vide")
					{ stockstempcs[espececs] = listecs[i6]; break; }
				if (stockstempcs[espececs] == -1)
				{	if (ANIMAUX[espececs].groupe > 0) // si l'espèce vit seule
					{	for (i6=0;i6<listecs.length;i6++)
						{	for (i7=0;i7<synthanimcs[listecs[i6]].length;i7+=3)
								if (synthanimcs[listecs[i6]][i7] == espececs || ANIMAUX[synthanimcs[listecs[i6]][i7]].groupe == ANIMAUX[espececs].groupe)
								{ stockstempcs[espececs] = listecs[i6]; i6 = listecs.length; break; }
						}
						if (stockstempcs[espececs] == -1)
						{	var bonusencl = ANIMBONUS[encloscs].nom.toLowerCase();
							for (i6=0;i6<listecs.length;i6++)
								if (synthanimcs[listecs[i6]].length == 3 && synthanimcs[listecs[i6]][0] == bonusencl)
								{ stockstempcs[espececs] = listecs[i6]; break; }
						}
					}
					else
					{	var bonusencl = ANIMBONUS[encloscs].nom.toLowerCase();
						for (i6=0;i6<listecs.length;i6++)
						{	for (i7=0;i7<synthanimcs[listecs[i6]].length;i7+=3)
								if (ANIMAUX[synthanimcs[listecs[i6]][i7]].groupe == 0 && (synthanimcs[listecs[i6]][i7] != bonusencl || synthanimcs[listecs[i6]].length == 3))
								{ stockstempcs[espececs] = listecs[i6]; i6 = listecs.length; break; }
						}
					}
				}
			}
		}
	}
	var listetrieecs = new Array();
	for (espececs in stockstempcs) listetrieecs.push(espececs);
	listetrieecs.sort(function (a, b) { return stockstempcs[a] - stockstempcs[b]; });
	GM_setValue("stockstemp", serialize(stockstempcs));
	GM_setValue("listetriee", serialize(listetrieecs));

	i6 = 0;
	encloscs = parseInt(stockstempcs[listetrieecs[i6]]);
	var stockscs = new Array();
	while (encloscs == -1)
	{	stockscs[listetrieecs[i6]] = "?";
		i6++;
		encloscs = parseInt(stockstempcs[listetrieecs[i6]]);
	}
	GM_setValue("stocks_" + id_zoo, serialize(stockscs));
	var tcs = Math.floor(encloscs/100);
	var vcs = encloscs % 100;
	if (touslesencloscs[encloscs] == "Enclos non construit")
		pagesuivante(urlSite + "enclosgestion1.php?t=" + tcs + "&v=" + vcs);
	else
	{	vtemp = 1000*tcs + vcs;
		pagesuivante(urlSite + "achat_animaux.php?t=" + tcs + "&vtemp=" + vtemp + "&v=" + vcs);
	}
}

function achatcouple(e) // achat multiple de couples, mâles ou femelles en un seul clic
{
	var nomac = e.target.id.substring(0, e.target.id.indexOf(";"));
	var typeac = nomac.substring(nomac.length-1), genre;
	if (typeac == "1" || typeac == "2")
	{	nomac = nomac.substring(0, nomac.length-1);
		genre = typeac == "1" ? "mâle" : "femelle";
	}
	else
	{	genre = "couple";
		typeac = "1";
	}
	var txtac = $n(nomac).value;
	var nbrac = parseInt(txtac);
	var maxachatsac = parseInt(e.target.id.substring(e.target.id.lastIndexOf(";")+1));
	if (nbrac > 0 && nbrac <= maxachatsac && parseFloat(txtac) - nbrac == 0)
	{	var prixac = parseInt(e.target.id.substring(e.target.id.indexOf(";")+1, e.target.id.lastIndexOf(";")));
		var bdivac = $t("div"), i7;
		for (i7=20; i7<bdivac.length;i7++) if (bdivac[i7].style.width == "125px") break;
		if (bdivac[i7+1].innerHTML.indexOf("<span") != -1)
		{	var innac = bdivac[i7+1].innerHTML;
			innac = innac.substring(innac.indexOf(">")+1);
			bdivac[i7+1].innerHTML = innac.substring(0, innac.indexOf("<"));
		}
		var argentac = parseInt(bdivac[i7+1].innerHTML);
		if (confirm("Vous êtes sur le point d'acheter :\n- " + nbrac + " " + genre + (nbrac > 1 ? "s" : "") + "\n- de l'espèce \"" + nomac + "\"\n- pour un montant total de " +
			millier(nbrac * prixac) + " Zoo'z.\n\nArgent disponible : " + millier(argentac) + " Zoo'z.\nIl vous restera donc : " + millier(argentac - nbrac * prixac) +
			" Zoo'z après cet achat.\n\nConfirmez-vous votre choix ?"))
		{	var binputac = $t("input");
			for (i7=0;i7<binputac.length;i7++) if (binputac[i7].value == nomac + typeac) { binputac[i7].checked = true; break; }
			GM_setValue("achatcouple", nbrac + ";" + nomac + typeac);
			GM_setValue("nbrcouples", nbrac);
			GM_setValue("cache"+window.name, true);
			if (genre == "mâle") GM_setValue("achatmale", true);
			else if (genre == "femelle") GM_setValue("achatfemelle", true);
			for (i7=binputac.length-1;i7>=0;i7--) if (binputac[i7].value == "Acheter l'animal") break;
			binputac[i7].dispatchEvent(clickmouse);
		}
	}
	else if (maxachatsac > 1)
		alert("Valeur incorrecte, merci de saisir :\n- un nombre entier strictement positif\n- inférieur ou égal à " + maxachatsac);
	else
		alert("Saisie incorrecte, seule la valeur 1 est autorisée pour cette espèce");
}

function trouvebonus(e)
{
	var nombonus = e.target.id.substring(0, e.target.id.indexOf(";"));
	var prixtb = e.target.id.substring(e.target.id.indexOf(";")+1);
	var nomachattb = prixtb.substring(0, prixtb.indexOf(";"));
	var sexetb = prixtb.substring(prixtb.indexOf(";")+1);
	prixtb = parseInt(sexetb.substring(0, sexetb.indexOf(";")));
	sexetb = sexetb.substring(sexetb.indexOf(";")+1);
	var valmaxtb = parseInt(sexetb.substring(2));
	sexetb = sexetb.substring(0, 1);
	var txttb = $n(nombonus.toLowerCase()).value;
	var nbrtb = parseInt(txttb);
	if (nbrtb > 0 && nbrtb <= valmaxtb && parseFloat(txttb) - nbrtb == 0)
	{	txttb = "Vous êtes sur le point de lancer une recherche pour essayer de trouver :\n- un" + (sexetb == "1" ? " mâ" : "e femel") + "le de l'espèce \"" + nombonus +
			"\"\n\nen achetant le nombre de fois nécessaire :\n- des " + (sexetb == "1" ? "mâ" : "femel") + "les de l'espèce \"" + nomachattb + "\"\n- au prix de " +
			millier(prixtb) + " Zoo'z.\n\nL'animal acheté étant immédiatement revendu, chaque tentative vous" + (nbrtb > 1 && nbrtb != valmaxtb ? "\n" : " ") +
			"coûtera en réalité " + millier(prixtb - Math.round(prixtb * 0.594)) + " Zoo'z.\n\n";
		if (nbrtb > 1)
			txttb += "Les " + nbrtb + " " + (nbrtb < valmaxtb ? "premières " : "") + "tentatives se réaliseront automatiquement (vous ne " + (nbrtb < valmaxtb ? "\n" : "") +
				"pourrez pas les stopper)." + (nbrtb < valmaxtb - 1 ? " Les tentatives suivantes se feront si vous le demandez." : nbrtb == valmaxtb - 1 ?
				" La dernière tentative possible se fera si vous la demandez." : "") + "\n\n";
		txttb += "La recherche s'arrêtera :\n- si vous trouvez l'animal bonus,\n- ou si vous avez atteint la limite des 30 achats";
		if (nbrtb < valmaxtb)
			txttb += ",\n- ou si vous décidez de l'arrêter (possible " + (nbrtb > 1 ? ("à la fin de la " + nbrtb + "ème") : "dès la fin de la 1ère") + " tentative)";
		txttb += ".\n\nConfirmez-vous votre choix ?";
		if (confirm(txttb))
		{	var binputtb = $t("input"), i7;
			nomachattb = nomachattb.toLowerCase();
			for (i7=0; i7<binputtb.length;i7++) if(binputtb[i7].value == nomachattb + sexetb) { binputtb[i7].checked = true; break; }
			GM_setValue("cherchebonus", nomachattb + sexetb + ";1;" + nbrtb + ";" + valmaxtb);
			GM_setValue("cache"+window.name, true);
			for (i7=binputtb.length-1;i7>=0;i7--) if (binputtb[i7].value == "Acheter l'animal") break;
			binputtb[i7].dispatchEvent(clickmouse);
		}
	}
	else if (valmaxtb > 1)
		alert("Valeur incorrecte, merci de saisir :\n- un nombre entier strictement positif\n- inférieur ou égal à " + valmaxtb);
	else
		alert("Saisie incorrecte, vous ne pouvez faire qu'une seule tentative.\nSeule la valeur 1 est donc autorisée.");
}

function classementf(e)
{
	GM_setValue("cache"+window.name, true);
	if (e.target.innerHTML == "Mon class. points")
	{	GM_setValue("classement", "points");
		pagesuivante(urlSite + "classement.php?choix_class=1");
	}
	else if (e.target.innerHTML == "Mon class. prestige")
	{	GM_setValue("classement", "prestige");
		pagesuivante(urlSite + "classement.php?choix_class=2");
	}
	else
	{	GM_setValue("classement", "mensuel");
		pagesuivante(urlSite + "classement.php?choix_class=4");
	}
}

function clteam()
{
	if (GM_getValue("team_" + id_zoo, false))
	{	GM_setValue("classement", "team");
		GM_setValue("cache"+window.name, true);
		pagesuivante(urlSite + "team.php");
	}
	else pagesuivante(urlSite + "classement.php?choix_class=3");
}

function tableau_animauxf(enclosta) // affiche le tableau des animaux de l'enclos
{
	if (!enclosta) enclosta = new Array();
	var pageenclos = /enclosgestion1.php/.test(window.location), especeta;
	for (especeta in enclosta) break;
	if (especeta)
	{	var animaux_tries = new Array(), i8, i9, maxita, trop, ctitreta;
		var albinosta = unserialize(GM_getValue("albinos_" + id_zoo, ""));
		var alb0ta, alb1ta;
		for (especeta in enclosta) animaux_tries.push(especeta);
		animaux_tries.sort();
		var bdivta = $("animaux_enclos");
		if (bdivta) var oldta = bdivta.parentNode.removeChild(bdivta);

		var styletipta = ", BGCOLOR, '#FFFFAA', FONTFACE, 'Courier New', FONTSIZE, '8pt', ABOVE, 'true', TEXTALIGN, 'center')\"";
		var valtip = " onmouseout=\"UnTip()\" onmouseover=\"Tip('Si c&rsquo;est possible, met le nom des animaux sur plusieurs lignes'" + styletipta;
		var clnsel = pageenclos ? "nsel" : "nsel2";
		var mourantta = $c("mourant"), listemourant = new Array(), nomta, animourant;
		for (i8=0;i8<mourantta.length;i8++)
		{	nomta = mourantta[i8].className == " mourant" ? new String(mourantta[i8].parentNode.className) : new String(mourantta[i8].className);
			nomta = nomta.substring(nomta.indexOf("animal")+7);
			nomta = nomta.substring(0, nomta.indexOf(nomta.indexOf("mâle") != -1 ? " mâle" : " femelle"));
			listemourant[i8] = nomta.replace("%20", " ", "g");
		}
		var naissta = $c("naissance"), listenaiss = new Array(), aninaiss;
		for (i8=0;i8<naissta.length;i8++)
		{	nomta = naissta[i8].className == " mourant" ? new String(naissta[i8].parentNode.className) : new String(naissta[i8].className);
			nomta = nomta.substring(nomta.indexOf("animal")+7);
			nomta = nomta.substring(0, nomta.indexOf(nomta.indexOf("mâle") != -1 ? " mâle" : " femelle"));
			listenaiss[i8] = nomta.replace("%20", " ", "g");
		}
		var tab_animaux = '<table width="100%"><tr style="text-align:center;margin:2px"><td><input type="checkbox" name="affichertabanimauxn" id="affichertabanimauxn"';
		if (GM_getValue("affichertabanimaux", true)) tab_animaux += ' checked="checked"';
		tab_animaux += '><label for="affichertabanimauxn">Afficher</label></input></td></tr></table><div id="tabanimaux" style="width:100%;text-align:' +
			'center;margin:2px"><table width="100%"><tr style="text-align:center"><td><input type="checkbox" name="etroitn" id="etroitn"' + valtip;
		if (GM_getValue("etroit", false)) tab_animaux += ' checked="checked"';
		tab_animaux += "><label for=\"etroitn\"" + valtip + ">Tableau étroit</label></input></td>";
		if (pageenclos) tab_animaux += "<td><input style='font-family:garamond arial sans serif;width:50px' type='button' onmouseout=\"UnTip()\" onmouseover=\"Tip('Cliquez " +
			"sur les images des animaux que vous<br>souhaitez vendre avant de cliquer sur ce bouton'" + styletipta + " value='Vendre'></input></td>";
		tab_animaux += "</tr></table><table width=\"100%\" id=\"liste_animaux\"><tr><th class=\"" + (pageenclos ? "sel" : "nsel2") + "\" onmouseout=\"UnTip()\" " +
			"onmouseover=\"Tip('Liste des espèces présentes dans cet enclos";
		if (pageenclos) tab_animaux += "<br>Cliquez ici + sur une espèce pour sélectionner tous les animaux de cette espèce";
		tab_animaux += "'";
		if (pageenclos) tab_animaux += ", WIDTH, 553";
		tab_animaux += styletipta + ">Animal</th><th onmouseout=\"UnTip()\" onmouseover=\"Tip('Animaux nécessitant des stocks'" + styletipta + ">St</th>" + "<th class=\"" +
			clnsel + "\"><img src=\"images/icones/male.gif\" onmouseout=\"UnTip()\" " + "onmouseover=\"Tip('Nombre de mâles-nombre de vieux mâles";
		if (pageenclos) tab_animaux += "<br>Cliquez ici + sur une espèce pour ne sélectionner que les mâles de cette espèce";
		tab_animaux += "'";
		if (pageenclos) tab_animaux += ", WIDTH, 553";
		tab_animaux += styletipta + "></th><th class=\"" + clnsel + "\"><img src=\"images/icones/female.gif\" onmouseout=\"UnTip()\" " + "onmouseover=\"Tip('Nombre de " +
			"femelles-nombre de vieilles femelles";
		if (pageenclos) tab_animaux += "<br>Cliquez ici + sur une espèce pour ne sélectionner que les femelles de cette espèce";
		tab_animaux += "'";
		if (pageenclos) tab_animaux += ", WIDTH, 574";
		tab_animaux += styletipta + "></th>";
		if (parseInt(GM_getValue("afficheadulte", 3)) > 1)
		{	tab_animaux += "<th style='font-size:10px' onmouseout=\"UnTip()\" onmouseover=\"Tip('Nombre de mâles adultes à la prochaine MAJ/nombre de femelles adultes " +
				"à la prochaine MAJ<br>nb : les espèces albinos sont complétées avec l&rsquo;espèce source', WIDTH, 616" + styletipta + ">Futurs<br>adultes</th>";
			if (pageenclos) tab_animaux += "<th onmouseout=\"UnTip()\" onmouseover=\"Tip('Nombre maximum d&rsquo;adultes que vous souhaitez pour chaque espèce.<br>Cliquez " +
				"ici pour enregistrer vos modifications'" + styletipta + "><input style='font-family:garamond arial sans serif;font-size:8px;width:35px' type='button' " +
				"value='Adultes\nmaxi'></input></th>";
			else tab_animaux += "<th style='font-size:9px' onmouseout=\"UnTip()\" onmouseover=\"Tip('Nombre maximum d&rsquo;adultes'" + styletipta + ">Adultes<br>maxi</th>";
		}
		tab_animaux += "</tr>";
		var stocksta = unserialize(GM_getValue("stocks_" + id_zoo), "");
		var numencl = GM_getValue("numenclos", -1), stck, alb2, alb3;
		for (i8=0;i8<animaux_tries.length;i8++)
		{	animourant = "";
			aninaiss = "";
			especeta = animaux_tries[i8];
			if (!pageenclos) for (i9=0;i9<6;i9++) enclosta[especeta][i9] = parseInt(enclosta[especeta][i9]);
			for (i9=0;i9<listemourant.length;i9++)
				if (listemourant[i9] == especeta) { animourant = " animourant"; break; }
			for (i9=0;i9<listenaiss.length;i9++)
				if (listenaiss[i9] == especeta) { aninaiss = " aninaiss"; break; }
			alb0ta = 0; alb1ta = 0;
			if (albinosta[numencl])
			{	if (especeta.indexOf("albinos") != -1)
				{	for (i9=0;i9<albinosta[numencl].length;i9+=9)
					{	if (albinosta[numencl][i9] == especeta.replace(" albinos", ""))
						{	alb0ta = 0 - parseInt(albinosta[numencl][i9+1]);
							alb1ta = 0 - parseInt(albinosta[numencl][i9+2]);
							break;
						}
					}
				}
				else
				{	for (i9=0;i9<albinosta[numencl].length;i9+=9)
					{	if (albinosta[numencl][i9] == especeta)
						{	alb0ta = parseInt(albinosta[numencl][i9+7]);
							alb1ta = parseInt(albinosta[numencl][i9+8]);
							break;
						}
					}
				}
			}
			trop = parseInt(GM_getValue("afficheadulte", 3)) > 2 && parseInt(animauxmax[especeta][numencl]) <= 15 && 
				enclosta[especeta][0] > 15 + alb0ta && enclosta[especeta][1] > 15 + alb1ta ? " trop" : "";
			stck = ANIMAUX[especeta].stock != false ? stocksta[especeta] : "N";
			if (!stck) stck = "?";
			tab_animaux += "<tr" + (enclosta[especeta][0] - alb0ta != enclosta[especeta][1] - alb1ta ? " class=\"desequilibre\"" : "") + "><td class=\"" + (pageenclos ?
				"titre" : "titre3") + animourant + aninaiss +"\">" + especeta.replace(" ","&nbsp;","g") + "</td><td" + (stck != "N" ?
				" style='background-color:#f44;color:#fff'" : "") + ">" + stck + "</td><td class=\"mâle actu" + trop + "\">" + enclosta[especeta][0] + "<span>-" +
				enclosta[especeta][2] + "</span><td class=\"femelle actu" + trop + "\">" + enclosta[especeta][1] + "<span>-" + enclosta[especeta][3] + "</span></td>";
			if (parseInt(GM_getValue("afficheadulte", 3)) > 1)
			{	if (parseInt(GM_getValue("afficheadulte", 3)) > 2)
				{	alb0ta = 0; alb1ta = 0; alb2 = 0; alb3 = 0;
					if (especeta.indexOf("albinos") != -1 && albinosta[numencl])
					{	for (i9=0;i9<albinosta[numencl].length;i9+=9)
						{	if (albinosta[numencl][i9] == especeta.replace(" albinos", ""))
							{	alb0ta = parseInt(albinosta[numencl][i9+7]);
								alb1ta = parseInt(albinosta[numencl][i9+8]);
								break;
							}
						}
					}
					else if (albinosta[numencl])
					{	for (i9=0;i9<albinosta[numencl].length;i9+=9)
						{	if (albinosta[numencl][i9] == especeta.replace(" albinos", ""))
							{	alb2 = parseInt(albinosta[numencl][i9+7]);
								alb3 = parseInt(albinosta[numencl][i9+8]);
								break;
							}
						}
					}
					maxita = parseInt(animauxmax[especeta][numencl]);
					trop = enclosta[especeta][4] > maxita + alb0ta || enclosta[especeta][5] > maxita + alb1ta ? " trop" : "";
					trop += trop == "" && ((enclosta[especeta][4] > enclosta[especeta][5] && enclosta[especeta][0] > maxita + alb2) ||
						(enclosta[especeta][5] > enclosta[especeta][4] && enclosta[especeta][1] > maxita + alb3)) ? " averif" : "";
				}
				else trop = "";
				tab_animaux += "<td class=\"futur" + trop + "\">" + "<span class=\"mâle\">" + enclosta[especeta][4] + "</span> / <span class=\"femelle\">" +
					enclosta[especeta][5] + "</span></td>";
				if (pageenclos) tab_animaux += "<td style='padding:0px'><input style='font-size:10px;padding:0px;text-align:center' class='maxi' size='2' " +
					"type='text' name='" + especeta + "' value='" + animauxmax[especeta][numencl] +"'></input></td>";
				else tab_animaux += "<td style='padding:0px;font-size:11px;text-align:center'>" + animauxmax[especeta][numencl] +"</td>";
			}
			tab_animaux += "</tr>";
		}
		tab_animaux += "</table>";
		if (pageenclos)
		{	valtip = "onmouseout=\"UnTip()\" onmouseover=\"Tip('Si vous filtrez et que vous sélectionnez une espèce,<br>il ne s&rsquo;affichera que cette espèce ainsi " +
				"que<br>les mourants et les naissances éventuels'" + styletipta;
			tab_animaux += "<table width='100%'><tr style='text-align:center'><td style='padding:2px 2px 0px'><input type='checkbox'" + valtip + " name='filtren' id='filtren'";
			if (GM_getValue("filtre", false)) tab_animaux += ' checked="checked"';
			tab_animaux += "><label for='filtren' " + valtip + ">Filtrer</label></input></td></tr>";
			tab_animaux += '<tr style="text-align:center;"><td style="padding:0px 2px"><input type="checkbox" name="triespn" id="triespn"';
			if (GM_getValue("triesp", false)) tab_animaux += ' checked="checked"';
			tab_animaux += '><label for="triespn">Tri par espèce</label></input></td></tr></table>';
		}
		tab_animaux += "</div>";
		if (GM_getValue("etroit", false)) tab_animaux = tab_animaux.replace("&nbsp;", " <br>", "g");
		else tab_animaux = tab_animaux.replace(" <br>", "&nbsp;", "g");
		bdivta = document.createElement("div");
		bdivta.id = "animaux_enclos";
		bdivta.setAttribute("class", "info_bulle");
		bdivta.setAttribute("style", "top:0px;right:0px");
		bdivta.innerHTML = tab_animaux;
		document.body.appendChild(bdivta);

		$("tabanimaux").style.display = GM_getValue("affichertabanimaux", true) ? "" : "none";
		bdivta.style.width = "";
		if (pageenclos)
		{	ctitreta = $c("titre");
			for (i8=0;i8<ctitreta.length;i8++) ctitreta[i8].addEventListener("click", souligneclick, true);
			var csel = $c("sel");
			csel[0].addEventListener("click", typeselclick, true);
			var cnsel = $c("nsel");
			for (i8=0;i8<2;i8++) cnsel[i8].addEventListener("click", typeselclick, true);
			if (GM_getValue("clique", "") == "") GM_deleteValue("colonne");
			typesel(GM_getValue("colonne", 0));
		}
		else
		{	if (/vente_animaux.php/.test(window.location) || /achat_animauxconfirm.php/.test(window.location) || /achat_animaux.php/.test(window.location))
			{	especeta = /vente_animaux.php/.test(window.location) ? GM_getValue("temp_vente") : /achat_animaux.php/.test(window.location) ?
					GM_getValue("clique", "") : GM_getValue("temp_achat", "");
				if (especeta != "")
				{	if (especeta.indexOf("/") != -1) especeta = especeta.substring(0, especeta.indexOf("/"));
					var espece1 = especeta.replace(" ", " <br>", "g");
					var espece2 = especeta.replace(" ", "&nbsp;", "g");
					ctitreta = $c("titre3");
					for (i8=0;i8<ctitreta.length;i8++)
						if (ctitreta[i8].innerHTML == espece1 || ctitreta[i8].innerHTML == espece2) { ctitreta[i8].className = "titre4"; break; }
				}
			}
		}
	}
	if (pageenclos) enclosavoirf();
}

function tabteam() // affiche le tableau de suivi de la team
{
	var lstt = unserialize(GM_getValue("listeteam"));
	var tabt = "<table>", i8;
	for (i8=0;i8<lstt.length;i8++)
		tabt += "<tr><td>" + lstt[i8][0] + "</td><td>" + lstt[i8][1] + "</td></tr>";
	tabt += "</table>";
	var bdivtt = document.createElement("div");
	bdivtt.id = "tabt";
	bdivtt.setAttribute("class", "info_bulle");
	bdivtt.setAttribute("style", "top:0px;right:0px");
	bdivtt.innerHTML = tabt;
	document.body.appendChild(bdivtt);
}

function affichertabanimauxf(coche)
{
	GM_setValue("affichertabanimaux", coche);
	$("tabanimaux").style.display = coche ? "" : "none";
	MAJpostab();
}

function etroitf(coche)
{
	var titre, i8;
	GM_setValue("etroit", coche);
	if (coche)
	{	titre = $c("titre");
		for (i8=0;i8<titre.length;i8++) titre[i8].innerHTML = titre[i8].innerHTML.replace("&nbsp;", " <br>", "g");
		titre = $c("titre2");
		for (i8=0;i8<titre.length;i8++) titre[i8].innerHTML = titre[i8].innerHTML.replace("&nbsp;", " <br>", "g");
		titre = $c("titre3");
		for (i8=0;i8<titre.length;i8++) titre[i8].innerHTML = titre[i8].innerHTML.replace("&nbsp;", " <br>", "g");
		titre = $c("titre4");
		for (i8=0;i8<titre.length;i8++) titre[i8].innerHTML = titre[i8].innerHTML.replace("&nbsp;", " <br>", "g");
	}
	else
	{	titre = $c("titre");
		for (i8=0;i8<titre.length;i8++) titre[i8].innerHTML = titre[i8].innerHTML.replace(" <br>", "&nbsp;", "g");
		titre = $c("titre2");
		for (i8=0;i8<titre.length;i8++) titre[i8].innerHTML = titre[i8].innerHTML.replace(" <br>", "&nbsp;", "g");
		titre = $c("titre3");
		for (i8=0;i8<titre.length;i8++) titre[i8].innerHTML = titre[i8].innerHTML.replace(" <br>", "&nbsp;", "g");
		titre = $c("titre4");
		for (i8=0;i8<titre.length;i8++) titre[i8].innerHTML = titre[i8].innerHTML.replace(" <br>", "&nbsp;", "g");
	}
	MAJpostab();
}

function filtref(coche)
{
	GM_setValue("filtre", coche);
	if (GM_getValue("clique", "") != "") souligne(GM_getValue("clique"), false);
}

function sauvemaxi()
{
	var goodval = true, maxism = $c("maxi"), i8, jsm;
	for (i8=0;i8<maxism.length;i8++)
	{	jsm = parseInt(maxism[i8].value);
		if (jsm < 1 || parseFloat(maxism[i8].value) - jsm != 0) { goodval = false; break; }
	}
	if (goodval)
	{	var especesm, newanimmax, modifval = false;
		var couples15sm = unserialize(GM_getValue("couples15_" + id_zoo, ""));
		var couples15temp = new Array();
		for (i8 in couples15sm) if (i8 != numenclos) couples15temp[i8] = couples15sm[i8];
		couples15sm = couples15temp;
		if (numenclos < 100) var listencsm, nomencsm;
		for (i8=0;i8<maxism.length;i8++)
		{	especesm = maxism[i8].name;
			newanimmax = parseInt(maxism[i8].value);
			if (newanimmax != parseInt(animauxmax[especesm][numenclos]))
			{	animauxmax[especesm][numenclos] = newanimmax;
				modifval = true;
				if (numenclos < 100)
				{	nomencsm = nom_enclos(numenclos);
					nomencsm = nomencsm.substring(0, nomencsm.indexOf(" "));
					if (confirm("La valeur maxi de l'espèce '" + especesm + "' a été modifiée.\n\nSouhaitez-vous que cette valeur s'applique :\n- pour tous les autres enclos " +
						"de type " + nomencsm + " (cliquez alors sur 'OK')\n- ou uniquement pour l'enclos en cours (cliquez alors sur 'Annuler') ?"))
					{	listencsm = listetypeenclos(nomencsm);
						for (jsm=0;jsm<listencsm.length;jsm++) animauxmax[especesm][listencsm[jsm]] = newanimmax;
					}
				}
			}
		}
		if (modifval)
		{	GM_setValue("animauxmax_"+id_zoo, serialize2(animauxmax));
			var alb0sm, alb1sm;
			if (albinos[numenclos])
			{	calcalb();
				GM_setValue("enclos", serialize(enclos));
			}
			for (i8=0;i8<maxism.length;i8++)
			{	especesm = maxism[i8].name;
				newanimmax = parseInt(maxism[i8].value);
				alb0sm = 0; alb1sm = 0; albi2ca = 0; albi3ca = 0;
				if (albinos[numenclos])
				{	if (especesm.indexOf("albinos") != -1)
					{	for (jsm=0;jsm<albinos[numenclos].length;jsm+=9)
						{	if (albinos[numenclos][jsm] == especesm.replace(" albinos", ""))
							{	alb0sm = parseInt(albinos[numenclos][jsm+7]);
								alb1sm = parseInt(albinos[numenclos][jsm+8]);
								break;
							}
						}
					}
					else if (parseInt(GM_getValue("afficheadulte", 3)) == 5)
					{	for (jsm=0;jsm<albinos[numenclos].length;jsm+=9)
						{	if (albinos[numenclos][jsm] == especesm)
							{	albi2ca = parseInt(albinos[numenclos][jsm+7]);
								albi3ca = parseInt(albinos[numenclos][jsm+8]);
								break;
							}
						}
					}
				}
				if (enclos[especesm][4] > newanimmax + alb0sm || enclos[especesm][5] > newanimmax + alb1sm)
				{	if (!couples15sm[numenclos])
						couples15sm[numenclos] = new Array();
					jsm = couples15sm[numenclos].length;
					couples15sm[numenclos][jsm] = especesm;
					couples15sm[numenclos][jsm+1] = enclos[especesm][4] > newanimmax + alb0sm ? enclos[especesm][4] - newanimmax - alb0sm : 0;
					couples15sm[numenclos][jsm+2] = enclos[especesm][5] > newanimmax + alb1sm ? enclos[especesm][5] - newanimmax - alb1sm : 0;
					couples15sm[numenclos][jsm+3] = 1;
				}
				else if (parseInt(GM_getValue("afficheadulte", 3)) == 5 && ((enclos[especesm][4] > enclos[especesm][5] && enclos[especesm][0] > newanimmax + albi2ca) ||
					(enclos[especesm][5] > enclos[especesm][4] && enclos[especesm][1] > newanimmax + albi3ca)))
				{	if (!couples15sm[numenclos])
						couples15sm[numenclos] = new Array();
					jsm = couples15sm[numenclos].length;
					couples15sm[numenclos][jsm] = especesm;
					couples15sm[numenclos][jsm+1] = enclos[especesm][4] > enclos[especesm][5] && enclos[especesm][0] > newanimmax ? enclos[especesm][4] - enclos[especesm][5] : 0;
					couples15sm[numenclos][jsm+2] = enclos[especesm][5] > enclos[especesm][4] && enclos[especesm][1] > newanimmax ? enclos[especesm][5] - enclos[especesm][4] : 0;
					couples15sm[numenclos][jsm+3] = 0;
				}
			}
			GM_setValue("couples15_" + id_zoo, serialize(couples15sm));
			trienclosavoir();
			alert("Les valeurs maxi ont été sauvegardées.");
			var bdivsm = $("lien_enclos");
			var oldsm = bdivsm.parentNode.removeChild(bdivsm);
			lien_enclosf();
			bdivsm = $("animaux_enclos");
			oldsm = bdivsm.parentNode.removeChild(bdivsm);
			tableau_animauxf(enclos);
		}
		else alert("Vous n'avez modifié aucune valeur !");
	}
	else if (maxism.length == 1)
		alert("La valeur saisie est incorrecte : seul un nombre entier strictement positif est autorisé.");
	else
		alert("Une au moins des valeurs est incorrecte.\n\nMerci de saisir uniquement des valeurs entières\nstrictement positives.");
}

function calcalb()
{
	var espececa, numalbca, couples_albica, margeca, espece_sourceca;
	albinos[numenclos] = new Array(); // 07=especesource;12=malefemelle manquant;34=malefemelle non tres vieux manquant;56=malefemelle non bébé manquant;78=max
	for (espececa in enclos)
	{	if (espececa.indexOf("albinos") != -1)
		{	espece_sourceca = espececa.replace(" albinos", "");
			if (enclos[espece_sourceca])
			{	numalbca = albinos[numenclos].length;
				albinos[numenclos][numalbca] = espece_sourceca;
				if (transfertmale[espececa] != null && transfertfemelle[espececa] != null)
				{	enclos[espece_sourceca][4] += transfertmale[espececa];
					enclos[espece_sourceca][5] += transfertfemelle[espececa];
					enclos[espececa][4] -= transfertmale[espececa];
					enclos[espececa][5] -= transfertfemelle[espececa];
				}
				couples_albica = Math.min(parseInt(animauxmax[espececa][numenclos]), enclos[espececa][0], enclos[espececa][1]);
				margeca = Math.max(0, parseInt(animauxmax[espececa][numenclos]) - Math.min(enclos[espececa][0], enclos[espececa][1]));
				albinos[numenclos][numalbca+1] = Math.min(enclos[espececa][1] - couples_albica, margeca);
				albinos[numenclos][numalbca+2] = Math.min(enclos[espececa][0] - couples_albica, margeca);
				couples_albica = Math.min(parseInt(animauxmax[espececa][numenclos]), enclos[espececa][0] - albinostvieux[espececa][0], enclos[espececa][1] -
					albinostvieux[espececa][1]);
				margeca = Math.max(0, parseInt(animauxmax[espececa][numenclos]) - Math.min(enclos[espececa][0] - albinostvieux[espececa][0], enclos[espececa][1] -
					albinostvieux[espececa][1]));
				albinos[numenclos][numalbca+3] = Math.min(enclos[espececa][1] - albinostvieux[espececa][1] - couples_albica, margeca);
				albinos[numenclos][numalbca+4] = Math.min(enclos[espececa][0] - albinostvieux[espececa][0] - couples_albica, margeca);
				couples_albica = Math.min(parseInt(animauxmax[espececa][numenclos]), enclos[espececa][4], enclos[espececa][5]);
				margeca = Math.max(0, parseInt(animauxmax[espececa][numenclos]) - Math.min(enclos[espececa][4], enclos[espececa][5]));
				albinos[numenclos][numalbca+5] = Math.min(enclos[espececa][5] - couples_albica, margeca);
				albinos[numenclos][numalbca+6] = Math.min(enclos[espececa][4] - couples_albica, margeca);
				albinos[numenclos][numalbca+7] = Math.max(albinos[numenclos][numalbca+1], albinos[numenclos][numalbca+3], albinos[numenclos][numalbca+5]);
				albinos[numenclos][numalbca+8] = Math.max(albinos[numenclos][numalbca+2], albinos[numenclos][numalbca+4], albinos[numenclos][numalbca+6]);
				transfertmale[espececa] = albinos[numenclos][numalbca+7];
				transfertfemelle[espececa] = albinos[numenclos][numalbca+8];
				enclos[espece_sourceca][4] -= transfertmale[espececa];
				enclos[espece_sourceca][5] -= transfertfemelle[espececa];
				enclos[espececa][4] += transfertmale[espececa];
				enclos[espececa][5] += transfertfemelle[espececa];
			}
		}
	}
	GM_setValue("albinos_" + id_zoo, serialize(albinos));
}

function triespf(coche)
{
	testbebe();
	GM_setValue("triesp", coche);
	if (coche)
	{	if (!triespecesfait)
		{	trier_espece();
			triespecesfait = true;
		}
		else papa.replaceChild(newdiv2, newdiv);
	}
	else
		papa.replaceChild(newdiv, newdiv2);
	MAJpostab();
	souligne(GM_getValue("clique", ""), false);
}

function trier_espece() // pour trier les espèces dans l'enclos
{
	var btdte, i8, btdte2, i9, clonetd, nomclass;
	for (i8=0;i8<especes_triees.length;i8++)
	{	btdte2 = $c("animal " + especes_triees[i8].replace(" ", "%20", "g"));
		for (i9=0;i9<btdte2.length;i9++)
		{	clonetd = btdte2[i9].cloneNode(true);
			$t("img", clonetd)[0].addEventListener("click", selvente, true);
			newdiv2.appendChild(clonetd);
		}
		if (btdte2[btdte2.length-1].className.indexOf("naissance") != -1) nomclass = "animal " + especes_triees[i8].replace(" ", "%20", "g") + " separation naissance";
		else if (btdte2[0].className.indexOf("mourant") != -1) nomclass = "animal " + especes_triees[i8].replace(" ", "%20", "g") + " separation mourant";
		else nomclass = "animal " + especes_triees[i8].replace(" ", "%20", "g") + " separation";
		if (i8 != especes_triees.length-1)
		{	btdte = document.createElement("td");
			btdte.className = nomclass;
			btdte.setAttribute("style","width:593px;margin:5px 0px;background-color:#FF8888;border:2px solid #B86242");
			newdiv2.appendChild(btdte);
		}
	}
	papa.replaceChild(newdiv2, newdiv);
}

function typeselclick(e) // on a cliqué sur une colonne dans le tableau
{
	var clcol = e.target.textContent ? 0 : e.target.getAttribute("src").indexOf("female") != -1 ? 2 : 1;
	if (clcol == 0) GM_deleteValue("colonne");
	else GM_setValue("colonne", clcol);
	typesel(clcol);
}

function typesel(col) // souligne la colonne 'col'
{
	var sel = $c("sel");
	sel[0].className = "nsel";
	var nsel = $c("nsel");
	nsel[col].className = "sel";
	souligne(GM_getValue("clique", ""), false);
}

function souligneclick(e) // on a cliqué sur une espèce dans le tableau
{
	var txtsc = e.target.textContent;
	txtsc = txtsc.replace("\u00A0", " ", "g") + "/" + $("animaux_enclos").scrollTop;
	GM_setValue("clique", txtsc);
	souligne(txtsc, true);
}

function souligne(especesg, onaclic) // sélectionne/désélectionne une espèce (femelle, mâle ou les 2)
{
	testbebe();
	if (especesg.indexOf("/") != -1) especesg = especesg.substring(0, especesg.indexOf("/"));
	var especesg1 = especesg.replace(" ", " <br>", "g");
	var especesg2 = especesg.replace(" ", "&nbsp;", "g");
	especesg = especesg.replace(" ", "%20", "g");
	var deja = false; // si true, on a cliqué sur le même animal : on efface tout
	var titre2 = $c("titre2"), tdg, i9;

	if (titre2.length != 0 || especesg == "")
	{	if (onaclic && (titre2[0].innerHTML == especesg1 || titre2[0].innerHTML == especesg2)) deja = true;
		if (titre2.length != 0) titre2[0].className = titre2[0].className.replace("titre2", "titre").replace("aninaiss2", "aninaiss").replace("animourant2", "animourant");
		tdg = $c("animal");
		for (i9=0;i9<tdg.length;i9++) tdg[i9].style.display = "";
		tdg = $c("filtre_mâle");
		while (tdg.length > 0) tdg[0].className = tdg[0].className.replace(" filtre_mâle", "", "g");
		tdg = $c("filtre_femelle");
		while (tdg.length > 0) tdg[0].className = tdg[0].className.replace(" filtre_femelle", "", "g");
		tdg = $c("filtre");
		while (tdg.length > 0) tdg[0].className = tdg[0].className.replace(" filtre", "", "g");
	}
	if (!deja && especesg != "")
	{	var titre = $c("titre");
		for (i9=0;i9<titre.length;i9++)
			if (titre[i9].innerHTML == especesg1 || titre[i9].innerHTML == especesg2)
			{	titre[i9].className = titre[i9].className.replace("titre", "titre2").replace("aninaiss", "aninaiss2").replace("animourant", "animourant2");
				break;
			}
		titre2 = $c("titre2");
		if (titre2.length == 0) GM_deleteValue("clique");
		else
		{	var colonne = GM_getValue("colonne", 0);
			tdg = $c("animal " + especesg + (colonne == 0 ? "" : colonne == 1 ? " mâle" : " femelle"));
			for (i9=0;i9<tdg.length;i9++)
				tdg[i9].className = tdg[i9].className + " filtre_" + (tdg[i9].className.indexOf("mâle") != -1 ? "mâle" : "femelle") + " filtre";
			if (GM_getValue("filtre", false))
			{	tdg = $c("naissance");
				if (p_affichage == 1)
				{	for (i9=0;i9<tdg.length;i9++)
						tdg[i9].className = tdg[i9].className + " filtre";
				}
				else
				{	for (i9=0;i9<tdg.length;i9++)
						tdg[i9].parentNode.className = tdg[i9].parentNode.className + " filtre";
				}
				tdg = $c("mourant");
				if (p_affichage == 1)
				{	for (i9=0;i9<tdg.length;i9++)
						tdg[i9].className = tdg[i9].className + " filtre";
				}
				else
				{	for (i9=0;i9<tdg.length;i9++)
						tdg[i9].parentNode.className = tdg[i9].parentNode.className + " filtre";
				}
				if (colonne != 0) // pour faire apparaître le trait de séparation dans ce cas particulier (avec les espèces triées)
				{	tdg = $c("animal " + especesg + " separation");
					for (i9=0;i9<tdg.length;i9++)
						tdg[i9].className = tdg[i9].className + " filtre";
				}
				tdg = $c("animal");
				for (i9=0;i9<tdg.length;i9++)
					tdg[i9].style.display = "none";
				tdg = $c("filtre");
				for (i9=0;i9<tdg.length;i9++)
					tdg[i9].style.display = "";
				if (tdg[tdg.length-1].className.indexOf("separation") != -1) tdg[tdg.length-1].style.display = "none";
			}
		}
	}
	else GM_deleteValue("clique");
	
	if (GM_getValue("bebes", "") != "") // on a demandé l'ouverture de la page sur les plus jeunes
	{	var bstrongsl = $t("strong");
		window.scroll(0, positionY(bstrongsl[bstrongsl.length - 17]) - window.innerHeight - 40 + ($("largeligne") && window.scrollMaxX > 0 ? 17 : 0));
	}
	if ($("lien_deplacement")) MAJpostab(); // on met à jour le tableau des déplacements
}

function testbebe()
{
	var bstrongtb = $t("strong"), i8;
	for(i8=0;i8<bstrongtb.length;i8++) if (bstrongtb[i8].innerHTML == "Vos employés") break;
	if (positionY(bstrongtb[i8]) - window.innerHeight - 40 + ($("largeligne") && window.scrollMaxX > 0 ? 17 : 0) == window.pageYOffset)
		GM_setValue("bebes", "ok");
}

function enclosavoirf() // création des boutons précédent et suivant sur les pages des enclos avec naissances/mourants/adultes en trop
{
	var bdivev = $("enclosavoir");
	if (!bdivev)
	{	var enclosav = unserialize(GM_getValue("enclosavoir_" + id_zoo, ""));
		var pendant = "", numencloseav;
		var styletip = "', LEFT, 'true', OFFSETX, 3, OFFSETY, -13, BGCOLOR, '#FFFFAA', FONTFACE, 'Courier New', FONTSIZE, '8pt', ABOVE, 'true', TEXTALIGN, 'center')\"></input>";
		avant = ""; //variables générales définies hors de la fonction
		apres = "";
		if (numenclos != -1)
		{	for (numencloseav in enclosav)
				if (pendant != "")
				{	apres = enclosav[numencloseav];
					break;
				}
				else if (enclosav[numencloseav] == numenclos)
					pendant = enclosav[numencloseav];
				else avant = enclosav[numencloseav];
			if (pendant != "")
			{	if (avant == "") avant = "messages";
				if (apres == "") apres = "messages";
			}
		}
		else // on est sur la page des messages
		{	for (numencloseav in enclosav) break;
			if (numencloseav)
			{	apres = enclosav[numencloseav];
				avant = enclosav.pop();
				pendant = "messages";
			}
		}
		if (pendant != "")
		{	bdivev = document.createElement("div");
			bdivev.id = "enclosavoir";
			bdivev.className = "info_bulle";
			var vtip = avant == "messages" ? "Pour revenir sur la page des messages" : pendant == "messages" ? "Pour aller sur le dernier enclos avec des " +
				GM_getValue("typeavoir_" + id_zoo, "") : "Pour revenir au précédent enclos avec des " + GM_getValue("typeavoir_" + id_zoo, "");
			var valbouton = "nt\" style=\"font-size:9px;padding:0px\" type=\"button\" value=\"";
			var precedent = "<input id=\"precede" + valbouton + "précédent\" onmouseout=\"UnTip()\" onmouseover=\"Tip('" + vtip + styletip;
			vtip = apres == "messages" ? "Pour revenir sur la page des messages" : pendant == "messages" ? "Pour aller sur le premier enclos avec des " +
				GM_getValue("typeavoir_" + id_zoo, "") : "Pour passer au prochain enclos avec des " + GM_getValue("typeavoir_" + id_zoo, "");
			var suivant = "<input id=\"suiva" + valbouton + "suivant\" onmouseout=\"UnTip()\" onmouseover=\"Tip('" + vtip + styletip;
			bdivev.innerHTML = "<table><tr><td width=\"70px\">" + precedent + "</td><td width=\"40px\">" + suivant + "</td></tr></table>";
			bdivev.style.top = "0px";
			document.body.appendChild(bdivev);
			$("precedent").addEventListener("click", enclosprecedent, true);
			$("suivant").addEventListener("click", enclossuivant, true);
		}
	}
	if (bdivev)
	{	var bdivev2 = $("animaux_enclos");
		if (!bdivev2)
		{	bdivev2 = $("enclos_naissances");
			if (!bdivev2) { lien_enclosf(); bdivev2 = $("lien_deplacement"); }
		}
		bdivev.style.right = bdivev2.clientWidth + (bdivev2.scrollHeight - bdivev2.clientHeight > 1 ? 25 : 8) + "px";
	}
}

function enclosprecedent()
{
	var txtep = urlSite;
	if (avant != "messages")
	{	txtep += "enclosgestion1.php?t=" + Math.floor(avant/100) + "&v=" + (avant % 100);
		GM_setValue("bebes", "ok");
	}
	else txtep += "event.php";
	pagesuivante(txtep);
}

function enclossuivant()
{
	var txtes = urlSite;
	if (apres != "messages")
	{	txtes += "enclosgestion1.php?t=" + Math.floor(apres/100) + "&v=" + (apres % 100);
		GM_setValue("bebes","ok");
	}
	else txtes += "event.php";
	pagesuivante(txtes);
}

function lien_enclosf() // affiche les tableaux de tous les enclos, des autres liens et des déplacements + gère la largeur de la fenêtre
{
	var diven = $("lien_enclos"), i10;
	if (!diven)
	{	var liste_enclos = '<table width="100%"><tr style="text-align:center;margin:2px;"><td><input type="checkbox" name="etroit2n" id="etroit2n"';
		if (GM_getValue("etroit2", false)) liste_enclos += 'checked="checked"';
		liste_enclos += '><label for="etroit2n">Tableau étroit</label></input></td></tr></table>';
		var liste_enclos1 = "<table id=\"liste_enclos1\">";
		var liste_enclos2 = "<table id=\"liste_enclos2\">";
		var totalesp = 0, especen, tabespece = new Array();
		for (especen in ANIMAUX)
		{	totalesp++;
			tabespece[especen] = 0;
		}
		var bulleavoiren = unserialize(GM_getValue("bulleavoir_" + id_zoo, ""));
		var ten, ven, v2, alternen = false, separe, numenclle, valt, lt;
		var touslesenclosle = unserialize(GM_getValue("touslesenclos_" + id_zoo, ""));

		for (ten=0;ten<2;ten++)
		{	for (ven=0;ven<(ten == 0 ? 41 : 5);ven++)
			{	separe = ven == 0 || ven == 10 || ven == 20 || ven == 30 ? " class=\"separe\"" : "";
				numenclle = ten*100 + ven;
				valt = " href=\"" + urlSite + "enclosgestion1.php?t=" + ten + "&v=" + ven + "\" " + onmouse(touslesenclosle[numenclle] +
					(bulleavoiren[numenclle] ? "<br><br>" + new String(bulleavoiren[numenclle]).replace(" : ", "&nbsp;:&nbsp;", "g") : ""), true) + ">";
				lt = "<td class=\"lenclos" + (bulleavoiren[numenclle] ? " avoir" : "") + "\"><a" + valt + nom_enclos(ten,ven) + "</a> / <a name=\"bebes\"" + valt + "BB</a></td>";
				liste_enclos1 += alternen ? lt + "</tr>" : "<tr" + separe + ">" + lt;
				liste_enclos2 += "<tr" + separe + ">" + lt + "</tr>";
				lt = touslesenclosle[numenclle];
				lt = lt == "Vide" || lt == "Enclos non construit" || lt.indexOf("Initialisation") != -1 ? "" : lt.substring(lt.indexOf(":")+2) + " / ";
				while (lt != "")
				{	especen = lt.substring(0,lt.indexOf(" /"));
					lt = lt.substring(lt.indexOf(" /")+3);
					tabespece[especen] = 1;
				}
				alternen = !alternen;
				if (ven == 15) ven = 19;
				if (ven == 9 || ven == 19 || ven == 29 || ven == 40)
				{	for (i10=0;i10<5;i10++)
					{	v2 = Math.floor((ven-9)/2) + 41 + i10;
						valt = " href=\"" + urlSite + "enclosgestion1.php?t=" + ten + "&v=" + v2 + "\" " + onmouse(touslesenclosle[v2] +
							(bulleavoiren[v2] ? "<br><br>" + new String(bulleavoiren[v2]).replace(" : ", "&nbsp;:&nbsp;", "g") : ""), true) + ">";
						lt = "<td class=\"lenclos" + (bulleavoiren[v2] ? " avoir" : "") + "\"><a" + valt + nom_enclos(ten,v2) + "</a> / <a name=\"bebes\"" + valt + "BB</a></td>"; 
						liste_enclos1 += alternen ? lt + "</tr>" : "<tr" + separe + ">" + lt;
						liste_enclos2 += "<tr" + separe + ">" + lt + "</tr>";
						lt = touslesenclosle[v2];
						lt = lt == "Vide" || lt == "Enclos non construit" || lt.indexOf("Initialisation") != -1 ? "" : lt.substring(lt.indexOf(":")+2) + " / ";
						while (lt != "")
						{	especen = lt.substring(0,lt.indexOf(" /"));
							lt = lt.substring(lt.indexOf(" /")+3);
							tabespece[especen] = 1;
						}
						alternen = !alternen;
					}
					if (ven != 40) liste_enclos1 += "<td></td></tr>";
					alternen = false;
				}
			}
		}
		liste_enclos1 += "<td></td></tr>";
		var dispo = 0, dispo2 = new Array(), manque2 = new Array();
		for (especen in tabespece) if (tabespece[especen] == 1) { dispo++; dispo2.push(especen); } else manque2.push(especen);
		var manque = totalesp - dispo;
		dispo2.sort();
		manque2.sort();
		var dispo3 = "";
		for (i10=0;i10<dispo2.length;i10++) dispo3 += dispo2[i10] + " / ";
		if (dispo3.length > 3) dispo3 = dispo3.substring(0, dispo3.length - 3);
		if (dispo == 0) dispo = "Vous n&rsquo;avez aucune espèce";
		else if (dispo > 1) dispo = "Vous avez " + dispo + " espèces :<br>" + dispo3;
		else dispo = "Vous avez 1 seule espèce :<br>" + dispo3;
		var manque3 = "", manque4 = new Array();
		for (i10=0;i10<manque2.length;i10++) { manque3 += manque2[i10] + " / "; manque4[manque2[i10]] = "mq"; }
		if (manque3.length > 3) manque3 = manque3.substring(0, manque3.length - 3);
		if (manque == 0) manque = "Il ne vous manque aucune espèce";
		else if (manque > 1) manque = "Il vous manque " + manque + " espèces :<br>" + manque3;
		else manque = "Il vous manque 1 seule espèce :<br>" + manque3;
		lt = "<tr class=\"separe\"><td class=\"manque\" " + onmouse(dispo) + ">Espèces<br>présentes</td>";
		liste_enclos1 += lt;
		liste_enclos2 += lt + "</tr><tr>";
		lt = "<td class=\"manque\" " + onmouse(manque) + ">Espèces<br>manquantes</td></tr>";
		liste_enclos1 += lt;
		liste_enclos2 += lt;
		GM_setValue("manquante_"+id_zoo, serialize(manque4));
		liste_enclos1 += "</table>";
		liste_enclos2 += "</table>";
		diven = document.createElement("div");
		diven.id = "lien_enclos";
		diven.setAttribute("class", "info_bulle");
		diven.style.top = "0px";
		diven.style.left = "0px";
		diven.innerHTML = liste_enclos + liste_enclos1 + liste_enclos2;
		document.body.appendChild(diven);
	}
	if (GM_getValue("etroit2", false)) { $("liste_enclos1").style.display = "none"; $("liste_enclos2").style.display = ""; }
	else { $("liste_enclos1").style.display = ""; $("liste_enclos2").style.display = "none"; }

	if ((/enclosgestion1.php/.test(window.location) || /achat_animaux.php/.test(window.location) || /vente_animaux.php/.test(window.location) ||
		/achat_animauxconfirm.php/.test(window.location) || /bureau.php/.test(window.location) || /enclosconfirm.php/.test(window.location) ||
		/vente_animaux_group.php/.test(window.location)))
	{	var nomle = "";
		if (!/achat_animauxconfirm.php/.test(window.location) && !/enclosconfirm.php/.test(window.location) && !/vente_animaux_group.php/.test(window.location) &&
			!/bureau.php/.test(window.location))
				nomle = nom_enclos(parseInt(recherche_param(window.location.search, "t")), parseInt(recherche_param(window.location.search, "v")));
		else if (GM_getValue("nom_enclos", "") != "")
			nomle = GM_getValue("nom_enclos");
		if (nomle != "")
		{	GM_setValue("nom_enclos", nomle);
			var lenclos = $c("lenclos");
			for (i10=0;i10<lenclos.length;i10++)
			{	if ($t("a", lenclos[i10])[0].innerHTML == nomle)
				{	if (GM_getValue("suivi", "") != "ok2" && GM_getValue("rapport", "") == "")
					{	$t("a", lenclos[i10])[0].className = "encours";
						$t("a", lenclos[i10])[1].className = "encours";
						lenclos[i10].className = lenclos[i10].className + " encours";
						$t("a", lenclos[i10+62])[0].className = "encours"; // pour les liens du tableau étroit
						$t("a", lenclos[i10+62])[1].className = "encours";
						lenclos[i10+62].className = lenclos[i10+62].className + " encours";
					}
					else
					{	$t("a", lenclos[i10])[0].className = "";
						$t("a", lenclos[i10])[1].className = "";
						lenclos[i10].className = lenclos[i10].className.replace(" encours", "", "g");
						$t("a", lenclos[i10+62])[0].className = "";
						$t("a", lenclos[i10+62])[1].className = "";
						lenclos[i10+62].className = lenclos[i10+62].className.replace(" encours", "", "g");
					}
					break;
				}
			}
		}
	}
	else if (GM_getValue("invasion", "") != window.name && GM_getValue("message", "") != window.name && GM_getValue("pgteam", "") != window.name) GM_deleteValue("nom_enclos");

	var divli = $("lien_autres");
	if (!divli)
	{	divli = document.createElement("div");
		divli.id = "lien_autres";
		divli.setAttribute("class", "info_bulle");
		var listeli = '<table width="100%"><tr><td style="text-align:center;margin:2px;"><input type="checkbox" name="afficheautresn" id="afficheautresn"';
		if (GM_getValue("afficheautres", true)) listeli += 'checked="checked"';
		listeli += '><label for="afficheautresn">Afficher les liens</label></input></td></tr></table>';
		var styletipli = "', BGCOLOR, '#FFFFAA', FONTFACE, 'Courier New', FONTSIZE, '8pt', ABOVE, 'true', TEXTALIGN, 'center')\">";
		listeli += "<table id=\"autres\"><tr class=\"separe\"><td><a href=\"" + urlSite + "zonemembre.php\">Carte du zoo</a></td></tr><tr><td><a href=\"" +
			urlSite + "toutou.php\">Votre chien</a></td></tr><tr><td><a href=\"" + urlSite + "enclosgestion.php?t=5&v=0\">Le Musée</a></td></tr>" +
			"<tr><td><a href=\"" + urlSite + "botanica.php\">La Botanica</a></td></tr><tr><td><a href=\"" + urlSite + "parrainage.php\">Parrainage</a></td></tr>" +
			"<tr><td><a href=\"" + urlSite + "news.php\">News</a></td></tr><tr class=\"separe\"><td><a href=\"" + urlSite + "bureau.php\">Personnel</a></td></tr>" +
			"<tr><td><a href=\"" + urlSite + "bureau2.php\">Recettes</a></td></tr><tr><td><a href=\"" + urlSite + "bureau4.php\">Stocks</a></td></tr>" + 
			"<tr><td><a href=\"" + urlSite + "espion.php\">Espions</a></td></tr><tr><td><a href=\"" + urlSite + "explorateur.php\">Explorateur</a></td></tr>" +
			"<tr><td><a class=\"rapport\" id=\"rapportlien\" onmouseout=\"UnTip()\" onmouseover=\"Tip('Synthèse de la MAJ actuelle, après contrôle et mise à " +
			"niveau<br> éventuel de tous les PA et des stocks" + styletipli + "Rapport</a></td></tr><tr><td><a name=\"suivilien\" class=\"rapport\" id=\"suivilien\" " +
			"onmouseout=\"UnTip()\" onmouseover=\"Tip('Afficher le suivi historique de son parc sous forme de graphiques" + styletipli + "Suivi</a></td></tr>" +
			"<tr class=\"separe\"><td><a href=\"" + urlSite + "enclosgestion.php?t=4&v=0\">Souvenirs</a></td></tr><tr><td><a href=\"" + urlSite +
			"enclosgestion.php?t=4&v=1\">Restauration rapide</a></td></tr><tr><td><a href=\"" + urlSite + "enclosgestion.php?t=4&v=2\">Boissons</a></td></tr>" +
			"<tr><td><a href=\"" + urlSite + "enclosgestion.php?t=4&v=3\">Glaces</a></td></tr><tr class=\"separe\"><td><a href=\"" + urlSite + "animaux.php\">Vos animaux" +
			"</a></td></tr><tr><td><a class=\"rapport\" href=\"" + urlSite + "bourse.php\" onmouseout=\"UnTip()\" onmouseover=\"Tip('<strong>Aide à la gestion</strong>, " +
			"avec un tableau des vieux animaux et<br>un tableau de synthèse de tous les animaux, incluant les prix" + styletipli + "La bourse</a></td></tr><tr><td><a href=\"" +
			urlSite + "missions.php\">Vos missions</a></td></tr><tr><td><a href=\"" + urlSite + "records.php\">Vos records</a></td></tr><tr><td><a class=\"rapport\" " +
			"href=\"" + urlSite + "event.php\">Vos messages</a></td></tr><tr><td><a href=\"" + urlSite + "team.php\">" + (GM_getValue("team_"+id_zoo, false) ? "Ma team" :
			"Les teams") + "</a></td></tr><tr><td><a href=\"" + urlSite + "index.php?deco\">Déconnexion</a></td></tr><tr class=\"separe\"><td><a id=\"mespoints\">" +
			"Mon class. points</a></td></tr><tr><td><a id=\"prestige\">Mon class. prestige</a></td></tr><tr><td><a id=\"mensuel\">Mon class. mensuel</a></td></tr>" +
			"<tr><td><a id=\"mateam\">" + (GM_getValue("team_"+id_zoo, false) ? "Notre class. team" : "Class. des teams") + "</a></td></tr>";
		if (num_zoo != "NC")
			listeli += "<tr class=\"separe\"><td><a class=\"rapport\" href=\"" + urlSite + monzoo + "\" onmouseout=\"UnTip()\" onmouseover=\"Tip('<strong>Aide à la " +
			"gestion</strong>, avec un tableau des vieux animaux et<br>un tableau de synthèse de tous les animaux, sans les prix" + styletipli + "Listes du zoo</a></td></tr>";
		listeli += "</table>";
		divli.innerHTML = listeli;
		document.body.appendChild(divli);
		$("mespoints").addEventListener("click", classementf, true);
		$("prestige").addEventListener("click", classementf, true);
		$("mensuel").addEventListener("click", classementf, true);
		$("mateam").addEventListener("click", clteam, true);
		$("rapportlien").addEventListener("click", rapport, true);
		$("suivilien").addEventListener("click", suivifct, true);
	}

	var divll = $("largeligne");
	if (!divll)
	{	divll = document.createElement("div");
		divll.setAttribute("style", "width:100%;height:1px");
		$c("header")[0].parentNode.insertBefore(divll, $c("header")[0]);
		divll.id = "largeligne";
	}

	var divdp = $("lien_deplacement");
	if (!divdp)
	{	divdp = document.createElement("div");
		divdp.id = "lien_deplacement";
		divdp.setAttribute("class", "info_bulle");
		divdp.style.right = "0px";
		divdp.style.top = "0px";
		document.body.appendChild(divdp);
		var HtPg = positionY($c("minibarre")[0]), bld;
		i10 = 0;
		if (/items/.test(window.location))
		{	bld = $t("a");
			for(i10=0;i10<bld.length;i10++)
				if (/Retour/.test(bld[i10].innerHTML)) break;
		}
		else if (!/missions.php/.test(window.location) && GM_getValue("rapport", "") == "")
		{	bld = $t("td");
			for(i10=bld.length-1;i10>=0;i10--)
				if (/Licencier/.test(bld[i10].innerHTML) || (/bureau/.test(window.location) && /total/.test(bld[i10].innerHTML.toLowerCase())) ||
					/souhaite vendre/.test(bld[i10].innerHTML)) break;
		}
		var BaPg = GM_getValue("rapport", "") == "" && i10 > 0 ? positionY(bld[i10]) - window.innerHeight + 71 + ($("largeligne") && window.scrollMaxX > 0 ? 17 : 0): document.body.clientHeight;
		if (BaPg < HtPg) BaPg = HtPg;
		if (GM_getValue("rapport", "") == "ok" || GM_getValue("suivi", "") != "")
		{	var bimgdp = $t("img");
			divdp.innerHTML = "<table id=\"deplacement\"><tr><td><a href=\"javascript:window.scroll(window.pageXOffset," + HtPg + ")\">Haut de page</a></td></tr>" +
				"<tr><td><a href=\"javascript:window.scroll(window.pageXOffset," + positionY(bimgdp[bimgdp.length-1]) + ")\">" + (GM_getValue("rapport", "") == "ok" ?
				"Haut du rapport" : "Suivi") + "</a></td></tr><tr><td><a href=\"javascript:window.scroll(window.pageXOffset," + BaPg + ")\">Bas de page</a></td></tr></table>";
		}
		else if ($("animaux_enclos") && /enclosgestion1.php/.test(window.location))
		{	divdp.innerHTML = "<table id=\"deplacement\"><tr><td><a href=\"javascript:window.scroll(window.pageXOffset," + HtPg + ")\">Haut de page</a></td></tr>" +
				"<tr><td><a href=\"javascript:window.scroll(window.pageXOffset," + positionY($t("strong")[3]) + ")\">Haut animaux</a></td></tr>" +
				"<tr><td><a id=\"deplaceBB\">Bébés</a></td></tr>" +
				"<tr><td><a id=\"BasPg\">Bas de page</a></td></tr></table>";
			MAJdeplaceBB();
		}
		else if ($("animaux_enclos") && /vente_animaux_group.php/.test(window.location))
		{	divdp.innerHTML = "<table id=\"deplacement\"><tr><td><a href=\"javascript:window.scroll(window.pageXOffset," + HtPg + ")\">Haut de page</a></td></tr>" +
				"<tr><td><a id=\"BasPg\">Bas de page</a></td></tr></table>";
			MAJdeplaceBas();
		}
		else if (/team.php/.test(window.location) && GM_getValue("team_" + id_zoo, false))
		{	bld = $t("a");
			for(i10=0;i10<bld.length;i10++) if (bld[i10].innerHTML == (nom_zoo[0] + nom_zoo.substring(1).toLowerCase())) break;
			var deplaceHaut = positionY(bld[i10]) - window.innerHeight/2 + 30;
			bld = bld[i10].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
			bld = $t("td", bld);
			for(i10=0;i10<bld.length;i10++) bld[i10].setAttribute("bgcolor", "#eac893");
			bld = $t("strong");
			for(i10=0;i10<bld.length;i10++) if (bld[i10].innerHTML == "Messagerie de la team") break;
			divdp.innerHTML = "<table id=\"deplacement\"><tr><td><a href=\"javascript:window.scroll(window.pageXOffset," + HtPg + ")\">Haut de page</a></td></tr>" +
				"<tr><td><a href=\"javascript:window.scroll(window.pageXOffset," + deplaceHaut + ")\">Ma place</a></td></tr>" +
				"<tr><td><a href=\"javascript:window.scroll(window.pageXOffset," + (positionY(bld[i10]) - window.innerHeight/2 + 70) + ")\">Messagerie</a></td></tr>" +
				"<tr><td><a href=\"javascript:window.scroll(window.pageXOffset," + (positionY($n("2")) - 18) + ")\">Missions team</a></td></tr>" +
				"<tr><td><a href=\"javascript:window.scroll(window.pageXOffset," + BaPg + ")\">Bas de page</a></td></tr></table>";
		}
		else if (/missions.php/.test(window.location))
		{	divdp.innerHTML = "<table id=\"deplacement\"><tr><td><a href=\"javascript:window.scroll(window.pageXOffset," + HtPg + ")\">Haut de page</a></td></tr>" +
				"<tr><td><a href=\"javascript:window.scroll(window.pageXOffset," + positionY($("tm0")) + ")\">Missions naissances</a></td></tr>" +
				(icim ? "<tr><td><a href=\"javascript:window.scroll(window.pageXOffset," + (positionY(btr[icim]) +
				btr[icim].clientHeight/2 - window.innerHeight/2) + ")\">Missions avancées</a></td></tr>" : "") + "<tr><td><a href=\"javascript:window.scroll(window.pageXOffset," +
				BaPg + ")\">Bas de page</a></td></tr></table>";
		}
		else if (/explorateur.php/.test(window.location))
		{	bld = $t("a");
			for(i10=0;i10<bld.length;i10++) if (bld[i10].href.indexOf("?case=1") != -1) break;
			divdp.innerHTML = "<table id=\"deplacement\"><tr><td><a href=\"javascript:window.scroll(window.pageXOffset," + HtPg + ")\">Haut de page</a></td></tr>" +
				"<tr><td><a href=\"javascript:window.scroll(window.pageXOffset," + (positionY(bld[i10]) - 35) + ")\">Carte</a></td></tr>" +
				"<tr><td><a href=\"javascript:window.scroll(window.pageXOffset," + BaPg + ")\">Bas de page</a></td></tr></table>";
		}
		else divdp.innerHTML = "<table id=\"deplacement\"><tr><td><a href=\"javascript:window.scroll(window.pageXOffset," + HtPg + ")\">Haut de page</a></td></tr>" +
			"<tr><td><a href=\"javascript:window.scroll(window.pageXOffset," + BaPg + ")\">Bas de page</a></td></tr></table>";
	}
}

function etroit2f(coche)
{
	GM_setValue("etroit2", coche);
	if (coche) { $("liste_enclos1").style.display = "none"; $("liste_enclos2").style.display = ""; }
	else { $("liste_enclos1").style.display = ""; $("liste_enclos2").style.display = "none"; }
	MAJpostab();
}

function afficheautresf(coche)
{
	GM_setValue("afficheautres", coche);
	MAJpostab();
}

function onmouse(texte, amq) // affichage des bulles d'info sur les liens des enclos
{
	if (!texte) texte = " ";
	texte = new String(texte);
	var texte2, ligne1;
	if (texte.indexOf("<br>") != -1) { texte2 = texte.substring(texte.indexOf("<br>")+4); ligne1 = 18; }
	else { texte2 = texte; ligne1 = 0; }
	texte2 = texte2.replace("&nbsp;", " ", "g");
	var mini = Math.max(450, 70 + texte2.length * Math.ceil(11800 / (window.innerHeight - ligne1)) / 100);
	var taillecarac = '8pt';
	if (mini > window.innerWidth)
	{	mini = Math.max(450, 70 + texte2.length * Math.ceil(8000 / (window.innerHeight - ligne1)) / 100);
		taillecarac = '7pt';
	}
	return "onmouseover=\"Tip('" + texte + "', " + (!amq ? "WIDTH, " + Math.min(mini, Math.ceil(texte2.length * 5.62)) + ", " : "") + "BGCOLOR, '#FFFFAA', FONTFACE, " +
		"'Courier New', FONTSIZE, '" + taillecarac + "', ABOVE, 'true', TEXTALIGN, 'center')\" onmouseout=\"UnTip()\"";
}

function MAJdeplaceBB()
{
	var bstrongdb = $t("strong"), i11;
	for(i11=0;i11<bstrongdb.length;i11++) if (bstrongdb[i11].innerHTML == "Vos employés") break;
	var deplaceBB = positionY(bstrongdb[i11]) - window.innerHeight - 40 + (window.scrollMaxX > 0 ? 17 : 0);
	$("deplaceBB").href = "javascript:window.scroll(window.pageXOffset," + deplaceBB + ")";
	var btdmj = $t("td");
	for(i11=btdmj.length-1;i11>=0;i11--) if (/Licencier/.test(btdmj[i11].innerHTML)) break;
	$("BasPg").href = "javascript:window.scroll(window.pageXOffset," + (positionY(btdmj[i11]) - window.innerHeight + 90) + ")";
	if (GM_getValue("bebes", "") != "") window.scroll(window.pageXOffset, deplaceBB);
}

function MAJdeplaceBas()
{
	var HtPgmb = positionY($c("minibarre")[0]);
	var btdmb = $t("td"), i11;
	for(i11=btdmb.length-1;i11>=0;i11--)
		if (/souhaite vendre/.test(btdmb[i11].innerHTML)) break;
	var BaPgmb = positionY(btdmb[i11]) - window.innerHeight + 71 + ($("largeligne") && window.scrollMaxX > 0 ? 17 : 0);
	if (BaPgmb < HtPgmb) BaPgmb = HtPgmb;
	$("BasPg").href = "javascript:window.scroll(window.pageXOffset," + BaPgmb + ")";
}

function MAJpostab() // pour mettre à jour la taille des différents tableaux, avec éventuellement des ascenseurs
{
	var ascfenH = window.scrollMaxX > 0  ? 17 : 0;
	var bdivc = $c("conteneur")[0];

	var diven = $("lien_enclos");
	diven.style.height = "";
	diven.style.width = "";
	var divli = $("lien_autres");
	divli.style.height = "";
	divli.style.width = "";
	var lali = 15;
	if (GM_getValue("afficheautres", true))
	{	$("autres").style.display = "";
		divli.style.top = "0px";
		if (divli.clientHeight + 6 > window.innerHeight - ascfenH)
		{	divli.style.height = window.innerHeight - 12 - ascfenH + "px";
			if (divli.scrollHeight - divli.clientHeight > 1) { divli.style.width = divli.clientWidth + 29 + "px"; lali = 32; }
		}
		if (diven.clientHeight + 2 > window.innerHeight - ascfenH)
		{	diven.style.height = window.innerHeight - 12 - ascfenH + "px";
			if (diven.scrollHeight - diven.clientHeight > 1)
			{	diven.style.width = diven.clientWidth + 29 + "px";
				divli.style.left = diven.clientWidth + 25 + "px";
				lali += 17;
			}
		}
		else
			divli.style.left = diven.clientWidth + 8 + "px";
		bdivc.style.left = (825 - window.innerWidth)/2 + diven.clientWidth + divli.clientWidth + lali + 8 + "px";
	}
	else
	{	$("autres").style.display = "none";
		divli.style.left = "0px";
		if (diven.clientHeight + divli.clientHeight + 13 > window.innerHeight - ascfenH)
		{	diven.style.height = window.innerHeight - divli.clientHeight - 20 - ascfenH + "px";
			if (diven.scrollHeight - diven.clientHeight > 1)
			{	diven.style.width = diven.clientWidth + 29 + "px";
				if (divli.clientWidth < diven.clientWidth) lali = 32;
			}
		}
		bdivc.style.left = (825 - window.innerWidth)/2 + Math.max(divli.clientWidth, diven.clientWidth) + lali + "px";
		divli.style.top = diven.clientHeight + 8 + "px";
	}
	$c("header")[0].style.left = bdivc.style.left;
	var ldivc = parseFloat(bdivc.offsetLeft) + 800;

	var bdivl = $("largeligne"), ldiv;
	var divdp = $("lien_deplacement");
	divdp.style.height = "";
	divdp.style.width = "";
	var divan = $("animaux_enclos");
	if (divan)
	{	divan.style.height = "";
		divan.style.width = "";
		ldiv = 5;
		if (divan.clientHeight + divdp.clientHeight + 14 > window.innerHeight - ascfenH)
		{	divan.style.height = window.innerHeight - divdp.clientHeight - 19 - ascfenH + "px";
			if (divan.scrollHeight - divan.clientHeight > 1)
			{	divan.style.width = divan.clientWidth + 29 + "px";
				if ($("enclosavoir")) $("enclosavoir").style.right = divan.clientWidth + 25 + "px";
				ldiv = 22;
			}
			else if ($("enclosavoir")) $("enclosavoir").style.right = divan.clientWidth + 8 + "px";
			var ctitre = $c("titre2"); if (ctitre[0]) $("animaux_enclos").scrollTop = parseInt(GM_getValue("clique").substring(GM_getValue("clique").indexOf("/")+1));
			ctitre = $c("titre4"); if (ctitre[0]) $("animaux_enclos").scrollTop = positionY(ctitre[0], $("animaux_enclos")) - divan.clientHeight/2;
		}
		else if ($("enclosavoir")) $("enclosavoir").style.right = divan.clientWidth + 7 + "px";
		if ($("enclosavoir")) ldiv += 137;
		divdp.style.top = divan.clientHeight + 8 + "px";
		bdivl.style.width = ldivc + ldiv + divan.clientWidth + "px";
	}
	else
	{	divan = $("enclos_naissances");
		if (divan)
		{	divan.style.height = "";
			divan.style.width = "";
			ldiv = 5;
			if (divan.clientHeight + divdp.clientHeight + 14 > window.innerHeight - ascfenH)
			{	divan.style.height = window.innerHeight - divdp.clientHeight - 20 - ascfenH + "px";
				if (divan.scrollHeight - divan.clientHeight > 1)
				{	divan.style.width = divan.clientWidth + 29 + "px";
					if ($("enclosavoir")) $("enclosavoir").style.right = divan.clientWidth + 25 + "px";
					ldiv = 22;
				}
				else if ($("enclosavoir")) $("enclosavoir").style.right = divan.clientWidth + 8 + "px";
			}
			else if ($("enclosavoir")) $("enclosavoir").style.right = divan.clientWidth + 8 + "px";
			if ($("enclosavoir")) ldiv += 137;
			divdp.style.top = divan.clientHeight + 8 + "px";
			bdivl.style.width = ldivc + ldiv + divan.clientWidth + "px";
		}
		else
		{	divan = $("tableau_vieux");
			if (divan)
			{	divan.style.height = "";
				divan.style.width = "";
				var divan2 = $("tableau_animaux");
				divan2.style.height = "";
				divan2.style.width = "";
				ldiv = 13;
				if (GM_getValue("affichertabanim", true))
				{	if (divan2.clientHeight + divdp.clientHeight + 14 > window.innerHeight - ascfenH)
					{	divan2.style.height = window.innerHeight - divdp.clientHeight - 19 - ascfenH + "px";
						if (divan2.scrollHeight - divan2.clientHeight > 1)
						{	divan2.style.width = divan2.clientWidth + 29 + "px";
							divan.style.right = divan2.clientWidth + 25 + "px";
							ldiv = 30;
						}
					}
					else divan.style.right = divan2.clientWidth + 8 + "px";
				}
				else divan.style.right = divan2.clientWidth + 8 + "px";
				if (GM_getValue("affichertabvieux", true))
				{	if (divan.clientHeight + divdp.clientHeight + 14 > window.innerHeight - ascfenH)
					{	divan.style.height = window.innerHeight - 10 - ascfenH + "px";
						if (divan.scrollHeight - divan.clientHeight > 1) { divan.style.width = divan.clientWidth + 29 + "px"; ldiv += 17; }
					}
				}
				divdp.style.top = divan2.clientHeight + 8 + "px";
				bdivl.style.width = ldivc + ldiv + divan.clientWidth + divan2.clientWidth + "px";
			}
			else
			{	divdp.style.top = 0 + "px";
				bdivl.style.width = ldivc + divdp.clientWidth + "px";
				divan = $("tabt");
				if (divan)
				{	divan.style.height = "";
					divan.style.width = "";
					divan.style.top = divdp.clientHeight + 8 + "px";
				}
			}
		}
	}
	if ((ascfenH == 0 && window.scrollMaxX > 0) || (ascfenH == 17 && window.scrollMaxX == 0)) { MAJpostab(); return; }
	if ($("deplaceBB")) MAJdeplaceBB();
	if (/enclosgestion1.php/.test(window.location) && !GM_getValue("MAJPA2", false)) GM_deleteValue("bebes");
	if (/achat_animaux.php/.test(window.location))
		window.scroll(bdivl.clientWidth, window.pageYOffset);
	else if (/enclosgestion1.php/.test(window.location) || /vente_animaux.php/.test(window.location))
		window.scroll(0, window.pageYOffset);
	else if (/vente_animaux_group.php/.test(window.location))
	{	window.scroll(0, window.pageYOffset + (window.pageYOffset != positionY($c("minibarre")[0]) ? ascfenH : 0));
		MAJdeplaceBas();
	}
	else
		window.scroll((bdivl.clientWidth - window.innerWidth)/2, window.pageYOffset);
}

function trienclosavoir()
{
	var indexte = null;
	var tab_naissanceste = unserialize(GM_getValue("string_naissances_" + id_zoo, ""));
	var mourantste = unserialize(GM_getValue("mourants_" + id_zoo, ""));
	var tabtriete = new Array();
	var naissmourant = false, typeavoir = "";
	for (indexte in tab_naissanceste) break;
	if (indexte)
	{	naissmourant = true;
		typeavoir = "naissances";
		for (indexte in tab_naissanceste)
		{	indexte = parseInt(indexte);
			tabtriete[enclosclasses(indexte)] = indexte;
		}
	}
	indexte = null;
	for (indexte in mourantste) break;
	if (indexte)
	{	naissmourant = true;
		if (typeavoir != "") typeavoir += "/";
		typeavoir += "mourants";
		for (indexte in mourantste)
		{	indexte = parseInt(indexte);
			tabtriete[enclosclasses(indexte)] = indexte;
		}
	}
	if (parseInt(GM_getValue("afficheadulte", 3)) > 2)
	{	indexte = null;
		var couples15te = unserialize(GM_getValue("couples15_" + id_zoo, ""));
		var newcouples15te = new Array();
		for (indexte in couples15te) break;
		if (indexte)
		{	naissmourant = true;
			if (typeavoir != "") typeavoir += "/";
			typeavoir += "adultes en trop";
			for (indexte in couples15te)
			{	indexte = parseInt(indexte);
				tabtriete[enclosclasses(indexte)] = indexte;
			}
		}
	}
	GM_setValue("enclosavoir_" + id_zoo, serialize(tabtriete));
	GM_setValue("typeavoir_" + id_zoo, typeavoir);
	indexte = null;
	var bulle = new Array();
	for (indexte in tabtriete) break;
	if (indexte)
	{	var newtab_naissances = new Array();
		var newmourants = new Array();
		var animtriete, nbanimte, i0, nbte;
		for (indexte in tabtriete)
		{	bulle[tabtriete[indexte]] = "";
			if (tab_naissanceste[tabtriete[indexte]])
			{	animtriete = new Array(); nbanimte = new Array();
				for (i0=0;i0<tab_naissanceste[tabtriete[indexte]].length;i0+=2)
				{	animtriete.push(tab_naissanceste[tabtriete[indexte]][i0]);
					nbanimte[tab_naissanceste[tabtriete[indexte]][i0]] = tab_naissanceste[tabtriete[indexte]][i0+1];
				}
				animtriete.sort();
				newtab_naissances[tabtriete[indexte]] = new Array();
				nbte = 0;
				for (i0=0;i0<animtriete.length;i0++)
				{	newtab_naissances[tabtriete[indexte]][2*i0] = animtriete[i0];
					newtab_naissances[tabtriete[indexte]][2*i0+1] = nbanimte[animtriete[i0]];
					bulle[tabtriete[indexte]] += animtriete[i0] + " : " + nbanimte[animtriete[i0]] + ", ";
					nbte += parseInt(nbanimte[animtriete[i0]]);
				}
				bulle[tabtriete[indexte]] = bulle[tabtriete[indexte]].substring(0, bulle[tabtriete[indexte]].length - 2);
				bulle[tabtriete[indexte]] = nbte + " naissance" + (nbte > 1 ? "s" : "") + " :<br>" + bulle[tabtriete[indexte]];
			}
			if (mourantste[tabtriete[indexte]])
			{	if (bulle[tabtriete[indexte]] != "") bulle[tabtriete[indexte]] += "<br><br>";
				bulle[tabtriete[indexte]] += "% mourant :<br>";
				animtriete = new Array(); nbanimte = new Array();
				for (i0=0;i0<mourantste[tabtriete[indexte]].length;i0+=2)
				{	animtriete.push(mourantste[tabtriete[indexte]][i0]);
					nbanimte[mourantste[tabtriete[indexte]][i0]] = mourantste[tabtriete[indexte]][i0+1];
				}
				animtriete.sort();
				newmourants[tabtriete[indexte]] = new Array();
				nbte = 0;
				for (i0=0;i0<animtriete.length;i0++)
				{	newmourants[tabtriete[indexte]][2*i0] = animtriete[i0];
					newmourants[tabtriete[indexte]][2*i0+1] = nbanimte[animtriete[i0]];
					bulle[tabtriete[indexte]] += animtriete[i0] + " : " + nbanimte[animtriete[i0]] + ", ";
					nbte += parseInt(nbanimte[animtriete[i0]]);
				}
				bulle[tabtriete[indexte]] = bulle[tabtriete[indexte]].substring(0, bulle[tabtriete[indexte]].length - 2);
				bulle[tabtriete[indexte]] = bulle[tabtriete[indexte]].replace("%", nbte);
				if (nbte > 1) bulle[tabtriete[indexte]] = bulle[tabtriete[indexte]].replace("mourant", "mourants");
			}
			if (parseInt(GM_getValue("afficheadulte", 3)) > 2)
			{	if (couples15te[tabtriete[indexte]])
				{	if (bulle[tabtriete[indexte]] != "") bulle[tabtriete[indexte]] += "<br><br>";
					bulle[tabtriete[indexte]] += "$ adulte en trop :<br>";
					animtriete = new Array(); nbmalete = new Array(); nbfemte = new Array(); typete = new Array();
					for (i0=0; i0<couples15te[tabtriete[indexte]].length;i0+=4)
					{	animtriete.push(couples15te[tabtriete[indexte]][i0]);
						nbmalete[couples15te[tabtriete[indexte]][i0]] = couples15te[tabtriete[indexte]][i0+1];
						nbfemte[couples15te[tabtriete[indexte]][i0]] = couples15te[tabtriete[indexte]][i0+2];
						typete[couples15te[tabtriete[indexte]][i0]] = couples15te[tabtriete[indexte]][i0+3];
					}
					animtriete.sort();
					newcouples15te[tabtriete[indexte]] = new Array();
					nbte = 0;
					for (i0=0;i0<animtriete.length;i0++)
					{	newcouples15te[tabtriete[indexte]][4*i0] = animtriete[i0];
						newcouples15te[tabtriete[indexte]][4*i0+1] = nbmalete[animtriete[i0]];
						newcouples15te[tabtriete[indexte]][4*i0+2] = nbfemte[animtriete[i0]];
						newcouples15te[tabtriete[indexte]][4*i0+3] = typete[animtriete[i0]];
						bulle[tabtriete[indexte]] += animtriete[i0] + " : " + (parseInt(nbmalete[animtriete[i0]]) + parseInt(nbfemte[animtriete[i0]])) + ", ";
						nbte += parseInt(nbmalete[animtriete[i0]]) + parseInt(nbfemte[animtriete[i0]]);
					}
					bulle[tabtriete[indexte]] = bulle[tabtriete[indexte]].substring(0, bulle[tabtriete[indexte]].length - 2);
					bulle[tabtriete[indexte]] = bulle[tabtriete[indexte]].replace("$", nbte);
					if (nbte > 1) bulle[tabtriete[indexte]] = bulle[tabtriete[indexte]].replace("adulte", "adultes");
				}
			}
		}
		GM_setValue("string_naissances_" + id_zoo, serialize(newtab_naissances));
		GM_setValue("mourants_" + id_zoo, serialize(newmourants));
		if (parseInt(GM_getValue("afficheadulte", 3)) > 2)
			GM_setValue("couples15_" + id_zoo, serialize(newcouples15te));
	}
	GM_setValue("bulleavoir_" + id_zoo, serialize(bulle));
}

function enclos_naissancesf() // affiche le tableau des enclos avec naissances / mourants / adultes en trop
{
	var liste_enclosn = "", tn, vn, bullen, alterne = false, indexn = null, enclosn = null, nbindex = 0;
	var divn = $("enclos_naissances");
	if (!divn)
	{	var titen = parseInt(GM_getValue("supp_mourants", 2)) == 2 ? "" : "<br>et mourant(s)";
		var aucun = parseInt(GM_getValue("supp_mourants", 2)) == 2 ? "" : "<br>aucun mourant";
		titen = parseInt(GM_getValue("afficheadulte", 3)) == 3 ? titen != "" ? ",<br>mourant(s) et<br>adulte(s) en trop" : "<br>et adulte(s) en trop" : titen;
		aucun += parseInt(GM_getValue("afficheadulte", 3)) == 3 ? "<br>aucun adulte en trop" : "";

		var enclosavoir = unserialize(GM_getValue("enclosavoir_" + id_zoo, ""));
		for (enclosn in enclosavoir) break;
		if (enclosn)
		{	var bulleavoir = unserialize(GM_getValue("bulleavoir_" + id_zoo, ""));
			for (indexn in enclosavoir)
			{	nbindex++;
				tn = Math.floor(enclosavoir[indexn]/100);
				vn = enclosavoir[indexn] % 100;
				bullen = new String(bulleavoir[enclosavoir[indexn]]);
				bullen = bullen.replace(" : ", "&nbsp;:&nbsp;", "g");
				if (!alterne) liste_enclosn += "<tr>";
				liste_enclosn += "<td><a name=\"bebes\" href=\"enclosgestion1.php?t=" + tn + "&v=" + vn + "\" " +
					onmouse(bullen, true) + ">" + nom_enclos(tn, vn).replace(" ", "&nbsp;", "g") + "</a></td>";
				if (alterne) liste_enclosn +="</tr>";
				alterne = !alterne;
			}
			if (alterne)
			{	if (nbindex > 1) liste_enclosn += "<td></td>";
				liste_enclosn += "</tr>";
			}
		}
		else liste_enclosn = "<tr><td>aucune naissance" + aucun + "</td></tr>";
		liste_enclosn = "<div id=\'afficheenclosnaissanceid\' style=\'cursor:pointer;font-weight:bold;text-align:center;padding-top:4px;padding-bottom:5px\' " +
			"onmouseout=\"UnTip()\" onmouseover=\"Tip('Cliquez ici pour afficher ou masquer le tableau', BGCOLOR, '#FFFFAA', FONTFACE, 'Courier New', FONTSIZE, " +
			"'8pt', ABOVE, 'true', LEFT, 'true', OFFSETX, 3, OFFSETY, -10, TEXTALIGN, 'center')\">Enclos avec naissance(s)" + titen + "</div><table " +
			"id=\"tenclosnaissance\">" + liste_enclosn + "</table>";
		divn = document.createElement("div");
		divn.id = "enclos_naissances";
		divn.setAttribute("class", "info_bulle");
		divn.style.top = "0px";
		divn.style.right = "0px";
		divn.innerHTML = liste_enclosn;
		document.body.appendChild(divn);
	}
	if (GM_getValue("afficheenclosnaissance", true)) $("tenclosnaissance").style.display = "";
	else $("tenclosnaissance").style.display = "none";
}

function afficheenclosnaissancef()
{
	GM_setValue("afficheenclosnaissance", !GM_getValue("afficheenclosnaissance", true));
	if (GM_getValue("afficheenclosnaissance", true)) $("tenclosnaissance").style.display = "";
	else $("tenclosnaissance").style.display = "none";
	MAJpostab();
}

function invasion() // calcule les données nécessaires au tableau invasion
{
	var i11, i12, animin, numgr, maxin;
	var listefor_m = new Array();
	var listefor_b = new Array();
	var listencli = unserialize("0,30;1,31;2,32;3,33;4,34;5,35;6,36;7,37;8,38;9,39;10,40;11,56;12,57;13,58;14,59;15,60;");
	var synthanimauxin = unserialize(GM_getValue("synthanimaux_" + id_zoo, ""));
	var prixboursein = unserialize(GM_getValue("prixbourse"));
	for (animin in ANIMAUX)
		if (ANIMAUX[animin].enclos == "Forêt" && !ANIMAUX[animin].stock && !ANIMAUX[animin].bonus && animin != "tapir" && animin != "chamois")
		{	numgr = ANIMAUX[animin].groupe;
			maxin = 50;
			for (i11=0;i11<listencli.length;i11++)
			{	if (synthanimauxin[listencli[i11]])
				{	for (i12=0;i12<synthanimauxin[listencli[i11]].length;i12+=3)
						if (synthanimauxin[listencli[i11]][i12] == animin)
							maxin = maxin - parseInt(synthanimauxin[listencli[i11]][i12+1]) - parseInt(synthanimauxin[listencli[i11]][i12+2]);
				}
			}
			if (maxin > 0)
			{	if (!listefor_m[numgr]) listefor_m[numgr] = animin;
				else if (parseInt(prixboursein[animin]) < parseInt(prixboursein[listefor_m[numgr]])) listefor_m[numgr] = animin;
				if (!listefor_b[numgr]) listefor_b[numgr] = animin;
				else if (ANIMAUX[animin].prix < ANIMAUX[listefor_b[numgr]].prix) listefor_b[numgr] = animin;
			}
		}
	var listeinv = new Array();
	for(i11=0;i11<listencli.length;i11++)
	{	listeinv[listencli[i11]] = new Array();
		numgr = 0;
		listeinv[listencli[i11]][0] = 0;
		listeinv[listencli[i11]][1] = 0;
		if (synthanimauxin[listencli[i11]])
		{	for (i12=0;i12<synthanimauxin[listencli[i11]].length;i12+=3)
				if (synthanimauxin[listencli[i11]][i12] == "ecureuil")
				{	listeinv[listencli[i11]][0] = synthanimauxin[listencli[i11]][i12+1];
					listeinv[listencli[i11]][1] = synthanimauxin[listencli[i11]][i12+2];
					break;
				}
			for (i12=0;i12<synthanimauxin[listencli[i11]].length;i12+=3)
				if (synthanimauxin[listencli[i11]][i12] != "ecureuil") { numgr = ANIMAUX[synthanimauxin[listencli[i11]][i12]].groupe; break; }
		}
		listeinv[listencli[i11]][2] = listefor_m[numgr] ? listefor_m[numgr] : "aucune";
		listeinv[listencli[i11]][3] = listefor_m[numgr] ? parseInt(prixboursein[listefor_m[numgr]]) - Math.round(parseInt(prixboursein[listefor_m[numgr]]) * 0.594) : 0;
		listeinv[listencli[i11]][4] = listefor_m[numgr] ? Math.round((parseInt(prixboursein[listefor_m[numgr]])/ANIMAUX[listefor_b[numgr]].prix - 1) * 10000) / 100 : -100;
	}

	if (testheurebourse()) patience("bourse");

	return listeinv;
}

function changetriinv(typeinv)
{
	var ict;
	for (ict=1;ict<4;ict++) $("tb"+ict).style.display = "none";
	ict = typeinv.substring(3);
	$("tb"+ict).style.display = "";
}

function changetrimiss(typemis)
{
	var tabtricm = new Array(), ict, ni = ifin-ideb, ictm = /team.php/.test(window.location) ? 7 : 6;
	for (ict=0;ict<ictm;ict++) $("tm"+ict).style.display = "none";
	ict = parseInt(typemis.substring(4));
	var ictcl = /team.php/.test(window.location) ? ict+5 : ict+7;
	for (i=0;i<ni;i++) tabtricm[i] = i;
	tabtricm.sort(function (a, b) { return listemissions[b][ict+1] - listemissions[a][ict+1]; });
	var intb = debtab;
	for (i=0;i<ni;i++) intb += "<tr" + ( i % 2 == 1 ? " style='background-color:#FDF0DF'" : "") + ">" + listemissions[tabtricm[i]][0] + "</tr>";
	$("tm"+ict).innerHTML = intb;
	$t("td", $("tm"+ict))[ictcl].className = "selmis";
	$("tm"+ict).style.display = "";
}

function MAJpagemission()
{
	pagesuivante(urlSite + "missions.php");
}

function MAJpagemessage()
{
	pagesuivante(urlSite + "event.php");
}

function MAJpageteam()
{
	pagesuivante(urlSite + "team.php");
}

function patience(typep) // fenêtre pour patienter
{
	var divp = document.createElement("div"), inner;
	divp.id = "patience";
	divp.className = "info_bulle";
	if (typep == "PAm")
	{	var totalPA = GM_getValue("totalPAm");
		var np = totalPA.substring(4, totalPA.indexOf("r"));
		var n1p = np.substring(1, np.indexOf(" su"));
		totalPA = totalPA.replace(np, "e " + (parseInt(n1p) + 1) + " su");
		inner = "Licenciement des employés en trop :</h2></span><span>" + totalPA;
		GM_setValue("totalPAm", totalPA);
	}
	else if (typep == "PAp")
	{	var totalPA = GM_getValue("totalPAp");
		var np = totalPA.substring(4, totalPA.indexOf("r"));
		var n1p = np.substring(1, np.indexOf(" su"));
		totalPA = totalPA.replace(np, "e " + (parseInt(n1p) + 1) + " su");
		inner = "Recrutement des employés nécessaires :</h2></span><span>" + totalPA;
		GM_setValue("totalPAp", totalPA);
	}
	else if (typep == "Connexion")
		inner = "Veuillez patienter, connection en cours...</h2>";
	else if (typep == "enchere0")
		inner = "Actualisation de la page.</h2>";
	else if (typep == "enchere1")
		inner = "Tentative n° " + (6 - parseInt(GM_getValue("encherir_" + nom, 6))) + " en cours.</h2>";
	else if (typep == "enchere2")
		inner = "L'enchère n° " + (6 - parseInt(GM_getValue("encherir_" + nom, 6))) + " n'est pas nécessaire :<br>actualisation de la page.</h2>";
	else
	{	if (typep == "encheremaxi")
			inner = "Enchère maxi atteinte : arrêt des enchères à la tentative n° " + (6 - parseInt(GM_getValue("encherir_"+nom, 6))) + ".</h2>";
		else if (typep == "zooinsuf")
			inner = "Vous n'avez pas assez de zoo'z<br>pour enchérir : arrêt des enchères<br>à la tentative n° " + (6 - parseInt(GM_getValue("encherir_"+nom, 6))) + ".</h2>";
		else if (typep == "HDepass")
			inner = "Ce cycle des enchères est terminé : arrêt des enchères à la tentative n° " + (6 - parseInt(GM_getValue("encherir_"+nom, 6))) + ".</h2>";
		else if (typep == "bourse")
			inner = "Cours de bourse</h2>Attention, ils ne semblent pas à jour, le tableau 'invasion' est donc sûrement erroné.<br>" +
				"Allez sur la page 'bourse' pour corriger cela.<br>";
		else if (typep == "chgtmaj")
		{	inner = "Le site de monzoo est passé maintenant sur la MAJ n° " + verifauj + ".</h2>Vous pouvez la lancer quand vous voulez simplement en vous déconnectant et en vous reconnectant.<br>";
			divp.setAttribute("style", "z-index:80");
		}
		inner += "<br><a style=\"cursor:pointer;\" id=\"fenpatience\">Fermer</a>";
	}
	divp.innerHTML = "<span><h2 style=\"text-align:center;font-size:14px;color:#B86242;cursor:default\">" + inner + "</span>";
	document.body.appendChild(divp);
}

function fermefenpatience()
{
	var oldfp = $('patience').parentNode.removeChild($('patience'));
	if (GM_getValue("chgtmaj", false))
	{	GM_setValue("verifauj", verifauj);
		GM_deleteValue("chgtmaj");
	}
	if (!GM_getValue("enchereauto"+typeit, false) && (/items.php/.test(window.location) || /items_botanica.php/.test(window.location))) pagesuivante(window.location);
}

function hautbasforum() // affiche 2 liens haut et bas sur le forum
{
	var divfo = document.createElement("div");
	divfo.id = "lien_forum";
	divfo.setAttribute("class", "fenetre");
	divfo.style.top = "0px";
	divfo.style.right = "0px";
	divfo.innerHTML = "<table id=\"forum\"><tr><td><a href=\"javascript:window.scroll(0,0)\">Haut de page</a></td></tr>" +
		"<tr><td><a href=\"javascript:window.scroll(0,document.body.clientHeight)\">Bas de page</a></td></tr></table>"
	document.body.appendChild(divfo);
}

function reecriture_url() // réécriture des urls qui ne fonctionnent pas
{
	var les_liens = $t("a"), i12;
	for (i12=0;i12<les_liens.length;i12++)
	{	if (/enclosgestion.php\?t=0&v=1000/.test(les_liens[i12].href) || /enclosgestion1.php\?t=0&v=1000/.test(les_liens[i12].href))
			les_liens[i12].href = "enclosgestion1.php?t=1&v=0";
		else if (/enclosgestion.php\?t=0&v=1001/.test(les_liens[i12].href) || /enclosgestion1.php\?t=0&v=1001/.test(les_liens[i12].href))
			les_liens[i12].href = "enclosgestion1.php?t=1&v=1";
		else if (/enclosgestion.php\?t=0&v=1002/.test(les_liens[i12].href) || /enclosgestion1.php\?t=0&v=1002/.test(les_liens[i12].href))
			les_liens[i12].href = "enclosgestion1.php?t=1&v=2";
		else if (/enclosgestion.php\?t=0&v=1003/.test(les_liens[i12].href) || /enclosgestion1.php\?t=0&v=1003/.test(les_liens[i12].href))
			les_liens[i12].href = "enclosgestion1.php?t=1&v=3";
		else if (/enclosgestion.php\?t=0&v=1004/.test(les_liens[i12].href) || /enclosgestion1.php\?t=0&v=1004/.test(les_liens[i12].href))
			les_liens[i12].href = "enclosgestion1.php?t=1&v=4";
	}
}

function filtremes(numradio)
{
	GM_setValue("filtremessages", parseInt(numradio));
	var mesnaisf = $c("mesnais"), i12;
	var vdisplayf = numradio == 1 ? "" : "none";
	for (i12=0;i12<mesnaisf.length;i12++) mesnaisf[i12].style.display = vdisplayf;
}

function boutiquef()
{
	GM_setValue("boutique", true);
	GM_setValue("cache"+window.name, true);
	pagesuivante(urlSite + "enclosgestion.php?v=" + v + "&t=4&achat=100");
}

function maxtentatives()
{
	var maxt = $("MaxT");
	maxt = maxt.getAttribute("onmouseover");
	maxt = maxt.substring(maxt.indexOf("tive(s)")+10);
	maxt = maxt.substring(0, maxt.indexOf("', BG"));
	$n(newnom.toLowerCase()).value = maxt;
}

function tableau_vieux() // affiche les tableaux des vieux et de tous les animaux
{
	var i12, i13, enclostv, tv, vv, couleur, tabtrie, divinn, alb0, alb1, prixB, pourcenttv, signetv, anim, lignev, animtrie, nbav, animax;
	var prixboursetv = unserialize(GM_getValue("prixbourse"));
	var albinostv = unserialize(GM_getValue("albinos_" + id_zoo, ""));
	var bdivtv = $("tableau_vieux");
	if (!bdivtv)
	{	var synthvieuxtv = unserialize(GM_getValue("synthvieux_" + id_zoo, ""));
		var tvieux, svieux = false;
		tabtrie = new Array();
		for (enclostv in synthvieuxtv) break;
		if (enclostv)
		{	for (enclostv in synthvieuxtv)
			{	tvieux = 0;
				for (i12=0; i12<synthvieuxtv[enclostv].length;i12+=9)
					tvieux += parseInt(synthvieuxtv[enclostv][i12+3]) + parseInt(synthvieuxtv[enclostv][i12+4]);
				if (tvieux > 0) // il y a des vieux dans cet enclos
				{	svieux = true;
					enclostv = parseInt(enclostv);
					tabtrie[enclosclasses(enclostv)] = enclostv;
				}
			}
		}
		var numlig = 0;
		var dontip = "', BGCOLOR, '#FFFFAA', FONTFACE, 'Courier New', FONTSIZE, '8pt', ABOVE, 'true', TEXTALIGN, 'center'";
		divinn = "<div id=\'affichertabvieuxid\' style=\'width:100%;cursor:pointer;font-weight:bold;font-size:15px;text-align:center\' onmouseout=\"UnTip()\" " +
			"onmouseover=\"Tip('Cliquez ici pour afficher ou masquer la liste" + dontip + ", LEFT, 'true', OFFSETX, 3, OFFSETY, -10)\">Liste des vieux</div>";
		divinn += '<div id="tabvieux" style="width:100%;text-align:center;margin:2px"><table width="100%"><tr><td></td></tr>';
		if (svieux)
		{	divinn += '<tr><td><input type="checkbox" name="etroit3" id="etroit3"';
			if (GM_getValue("etroit3", false)) divinn += ' checked="checked"';
			divinn += '><label for="etroit3">Tableau étroit</label></input></td>';
			if (parseInt(GM_getValue("afficheadulte", 3)) > 1)
			{	divinn += '<td><input type="checkbox" name="filtre2" id="filtre2"';
				if (GM_getValue("filtre2", false)) divinn += ' checked="checked"';
				divinn += "><label for='filtre2' onmouseout=\"UnTip()\" onmouseover=\"Tip('Ne pas afficher les espèces incomplètes ni les espèces<br>avec suffisamment de " +
					"bébés pour remplacer tous les vieux" + dontip + ")\">Filtre</label></input></td>";
			}
			divinn += '</tr></table><table width="100%" style="border-top:1px solid #000;border-right:1px solid #000;border-left:1px solid #000">' +
				'<tr style="font-weight:bold"><td><input type="radio" name="choixvieux" id="choixvieux1" value=1';
			if (GM_getValue("choixvieux", 1) == 1) divinn += ' checked="checked"';
			divinn += '><label for="choixvieux1">Tri par enclos puis par espèce</label></input></td></tr>';
			divinn += '<tr style="font-weight:bold"><td><input type="radio" name="choixvieux" id="choixvieux2" value=2';
			if (GM_getValue("choixvieux", 1) == 2) divinn += ' checked="checked"';
			divinn += '><label for="choixvieux2">Tri par âge</label></input></td></tr>';
			divinn += '<tr style="font-weight:bold"><td><input type="radio" name="choixvieux" id="choixvieux3" value=3';
			if (GM_getValue("choixvieux", 1) == 3) divinn += ' checked="checked"';
			divinn += '><label for="choixvieux3">Tri par % croissant</label></input></td></tr></table>';
			divinn += "<table width=\"100%\" id=\"liste_vieux1\">";
			var entetev = "<tr><th>Enclos</th><th onmouseout=\"UnTip()\" onmouseover=\"Tip('Espèces avec des vieux" + dontip + ")\">Animal</th>";
			if (parseInt(GM_getValue("afficheadulte", 3)) == 5)
				entetev += "<th>Bad</th>";
			entetev += "<th><img src=\"images/icones/male.gif\" onmouseout=\"UnTip()\" onmouseover=\"Tip('Nombre de mâles-nombre de vieux mâles" + dontip + ")\"></th>" +
				"<th><img src=\"images/icones/female.gif\" onmouseout=\"UnTip()\" onmouseover=\"Tip('Nombre de femelles-nombre de vieilles femelles" + dontip + "')\"></th>" +
				"<th onmouseout=\"UnTip()\" onmouseover=\"Tip('Reste à vivre de l&rsquo;animal le + vieux<br />pour l&rsquo;espèce et l&rsquo;enclos considérés" +
				dontip + ")\">&#194;ge</th>";
			if (parseInt(GM_getValue("afficheadulte", 3)) > 1)
				entetev += "<th style='font-size:9px' onmouseout=\"UnTip()\" onmouseover=\"Tip('Nombre maximum d&rsquo;adultes" + dontip + "')\">Adultes<br>maxi</th>";
			entetev += "</tr>";
			divinn += entetev;
			var mqv, agev = new Array(), vieuxm, vieuxf, vieuxmb, vieuxfb, mvieuxm, mvieuxf, manquevm, manquevf, vieuxtip, mouseesp, prcent = new Array();
			lignev = new Array();
			for (enclostv in tabtrie)
			{	animtrie = new Array(); nbav = new Array();
				for (i12=0; i12<synthvieuxtv[tabtrie[enclostv]].length;i12+=9)
				{	tvieux = parseInt(synthvieuxtv[tabtrie[enclostv]][i12+3]) + parseInt(synthvieuxtv[tabtrie[enclostv]][i12+4]);
					if (tvieux > 0)
					{	animtrie.push(synthvieuxtv[tabtrie[enclostv]][i12]);
						nbav[synthvieuxtv[tabtrie[enclostv]][i12]] = new Array();
						for (i13=1;i13<5;i13++) nbav[synthvieuxtv[tabtrie[enclostv]][i12]][i13] = parseInt(synthvieuxtv[tabtrie[enclostv]][i12+i13]);
						for (i13=5;i13<7;i13++) nbav[synthvieuxtv[tabtrie[enclostv]][i12]][i13] = synthvieuxtv[tabtrie[enclostv]][i12+i13];
					}
				}
				animtrie.sort();
				tv = Math.floor(tabtrie[enclostv]/100);
				vv = tabtrie[enclostv] % 100;
				couleur = nom_enclos(tv, vv);
				if (couleur.indexOf(" n") != -1) couleur = couleur.substring(0, couleur.indexOf(" n"));
				couleur = couleur.toLowerCase();
				manquevm = new Array(), manquevf = new Array();
				for (i12=0;i12<animtrie.length;i12++)
				{	manquevm[i12] = 0;
					manquevf[i12] = 0;
					alb0 = 0; alb1 = 0;
					if (albinostv[tabtrie[enclostv]])
					{	for (i13=0;i13<albinostv[tabtrie[enclostv]].length;i13+=9)
						{	if (albinostv[tabtrie[enclostv]][i13] == animtrie[i12])
							{	alb0 = parseInt(albinostv[tabtrie[enclostv]][i13+7]);
								alb1 = parseInt(albinostv[tabtrie[enclostv]][i13+8]);
								break;
							}
							/*if (animtrie[i12].indexOf("albinos") != -1 && albinostv[tabtrie[enclostv]][i13] == animtrie[i12].replace(" albinos", ""))
							{	alb0 = 0-parseInt(albinostv[tabtrie[enclostv]][i13+1]);
								alb1 = 0-parseInt(albinostv[tabtrie[enclostv]][i13+2]);
								break;
							}*/
						}
					}
					if (parseInt(nbav[animtrie[i12]][1]) >= parseInt(animauxmax[animtrie[i12]][tabtrie[enclostv]])+alb0 && parseInt(nbav[animtrie[i12]][2]) >=
						parseInt(animauxmax[animtrie[i12]][tabtrie[enclostv]])+alb1)
					{	if (parseInt(nbav[animtrie[i12]][1])-parseInt(nbav[animtrie[i12]][3]) < parseInt(animauxmax[animtrie[i12]][tabtrie[enclostv]])+alb0)
							manquevm[i12] = parseInt(animauxmax[animtrie[i12]][tabtrie[enclostv]])+alb0 - (parseInt(nbav[animtrie[i12]][1])-parseInt(nbav[animtrie[i12]][3]));
						if (parseInt(nbav[animtrie[i12]][2])-parseInt(nbav[animtrie[i12]][4]) < parseInt(animauxmax[animtrie[i12]][tabtrie[enclostv]])+alb1)
							manquevf[i12] = parseInt(animauxmax[animtrie[i12]][tabtrie[enclostv]])+alb1 - (parseInt(nbav[animtrie[i12]][2])-parseInt(nbav[animtrie[i12]][4]));
					}
				}
				nextinsuffisant = 0;
				for (i12=0;i12<animtrie.length;i12++)
				{	mouseesp = " onmouseout=\"UnTip()\" onmouseover=\"Tip('prix bourse : ";
					prixB = prixboursetv[animtrie[i12]];
					pourcenttv = Math.round((parseInt(prixB)/ANIMAUX[animtrie[i12]].prix - 1) * 10000) / 100;
					prcent[numlig] = pourcenttv;
					if (pourcenttv >= 0) signetv = "+";
					else { signetv = "-"; pourcenttv = 0 - pourcenttv ; }
					mouseesp += millier(prixB) + " Z<br>%/base : " + signetv + "&nbsp;" + pourcenttv + " %<br>diff/base : " + signetv + "&nbsp;" +
						millier(Math.abs(prixB - ANIMAUX[animtrie[i12]].prix)) + " Z" + dontip + ")\"";
					vieuxm = nbav[animtrie[i12]][5];
					vieuxf = nbav[animtrie[i12]][6];
					if (vieuxm != "")
					{	mvieuxm = vieuxm.substring(1);
						if (mvieuxm.indexOf("/") != -1) mvieuxm = mvieuxm.substring(0, mvieuxm.indexOf("/"));
						vieuxmb = "";
						mqv = manquevm[i12];
						while (mqv > 0)
						{	vieuxmb = vieuxm.substring(vieuxm.lastIndexOf("/")) + vieuxmb;
							vieuxm = vieuxm.substring(0, vieuxm.lastIndexOf("/"));
							mqv--;
						}
						if (vieuxm != "") vieuxm = vieuxm.substring(1);
						if (vieuxmb != "") vieuxmb = "<span style=\\'color:#F00\\'>" + vieuxmb.substring(1) + "</span>";
						if (vieuxm != "" && vieuxmb != "") vieuxm += "/";
						vieuxm = "âge des vieux mâles : " + vieuxm + vieuxmb;
					}
					else mvieuxm = "99";
					mvieuxm = parseInt(mvieuxm);
					if (vieuxf != "")
					{	mvieuxf = vieuxf.substring(1);
						if (mvieuxf.indexOf("/") != -1) mvieuxf = mvieuxf.substring(0, mvieuxf.indexOf("/"));
						vieuxfb = "";
						mqv = manquevf[i12];
						while (mqv > 0)
						{	vieuxfb = vieuxf.substring(vieuxf.lastIndexOf("/")) + vieuxfb;
							vieuxf = vieuxf.substring(0, vieuxf.lastIndexOf("/"));
							mqv--;
						}
						if (vieuxf != "") vieuxf = vieuxf.substring(1);
						if (vieuxfb != "") vieuxfb = "<span style=\\'color:#F00\\'>" + vieuxfb.substring(1) + "</span>";
						if (vieuxf != "" && vieuxfb != "") vieuxf += "/";
						vieuxf = "âge des vieilles femelles : " + vieuxf + vieuxfb;
					}
					else mvieuxf = "99";
					mvieuxf = parseInt(mvieuxf);
					vieuxtip = " onmouseout=\"UnTip()\" onmouseover=\"Tip('";
					vieuxtip += vieuxm;
					if (vieuxm != "" && vieuxf != "") vieuxtip += "<br>";
					vieuxtip += vieuxf + dontip + ", OFFSETY, 15)\">";
					nbrow = 0;
					if (i12 == nextinsuffisant && (manquevm[i12] + manquevf[i12]) == 0)
					{	for (i13=nextinsuffisant+1;i13<animtrie.length;i13++) if (manquevm[i12] + manquevf[i12] > 0) break;
						nbrow = i13 - nextinsuffisant;
						nextinsuffisant = i13;
					}
					if (i12 == nextinsuffisant && (manquevm[i12] + manquevf[i12]) > 0)
					{	for (i13=nextinsuffisant+1;i13<animtrie.length;i13++) if (manquevm[i12] + manquevf[i12] == 0) break;
						nbrow = i13 - nextinsuffisant;
						nextinsuffisant = i13;
					}
					lignev[numlig] = "<tr class=\"" + couleur + (manquevm[i12] + manquevf[i12] == 0 ? " ok" : "") + "\">";
					lignev[numlig] += "<td class=\"enclosv\"><a href=\"" + urlSite + "enclosgestion1.php?t=" + tv + "&v=" + vv + "\">" +
						nom_enclos(tv,vv).replace(" ", "&nbsp;") + "</a></td>";
					lignev[numlig] += "<td class=\"animvieux\"" + mouseesp + ">" + animtrie[i12].replace(" ", "&nbsp;", "g") + "</td>";
					if (parseInt(GM_getValue("afficheadulte", 3)) == 5)
						lignev[numlig] += "<td" + (manquevm[i12] + manquevf[i12] > 0 ? vieuxtip + (manquevm[i12] + manquevf[i12]) : ">") + "</td>";
					lignev[numlig] += "<td class=\"mâle\"" + vieuxtip + nbav[animtrie[i12]][1] + "<span>-" + nbav[animtrie[i12]][3] +
						"</span><td class=\"femelle\"" + vieuxtip + nbav[animtrie[i12]][2] + "<span>-" + nbav[animtrie[i12]][4] + "</span></td>";
					lignev[numlig] += "<td" + vieuxtip;
					lignev[numlig] += mvieuxm < mvieuxf ? mvieuxm : mvieuxf;
					lignev[numlig] += "</td>";
					if (parseInt(GM_getValue("afficheadulte", 3)) > 1)
					{	animax = animauxmax[animtrie[i12]][tabtrie[enclostv]];
						if (albinostv[tabtrie[enclostv]])
						{	for (i13=0;i13<albinostv[tabtrie[enclostv]].length;i13+=9)
							{	if (albinostv[tabtrie[enclostv]][i13] == animtrie[i12])
								{	animax = (parseInt(animax) + parseInt(albinostv[tabtrie[enclostv]][i13+7])) + "/" +
										(parseInt(animax) + parseInt(albinostv[tabtrie[enclostv]][i13+8]));
									break;
								}
							}
						}
						lignev[numlig] += "<td style='padding:0px;font-size:11px;text-align:center'>" + animax +"</td>";
					}
					lignev[numlig] += "</tr>";
					divinn += lignev[numlig];
					agev[numlig] = mvieuxm < mvieuxf ? mvieuxm : mvieuxf;
					numlig++;
				}
			}
			divinn += "</table><table width=\"100%\" id=\"liste_vieux2\">" + entetev;
			var ordrel = new Array();
			for (i12=0;i12<lignev.length;i12++) ordrel[i12] = i12;
			ordrel.sort(function (a, b) { return parseInt(agev[a]) - parseInt(agev[b]); });
			for (i12=0;i12<lignev.length;i12++)
				divinn += lignev[ordrel[i12]].replace("enclosv", "enclosv2").replace("animvieux", "animvieux2");
			divinn += "</table><table width=\"100%\" id=\"liste_vieux3\">" + entetev;
			ordrel = new Array();
			for (i12=0;i12<lignev.length;i12++) ordrel[i12] = i12;
			ordrel.sort(function (a, b) { return parseFloat(prcent[a]) - parseFloat(prcent[b]); });
			for (i12=0;i12<lignev.length;i12++)
				divinn += lignev[ordrel[i12]].replace("enclosv", "enclosv3").replace("animvieux", "animvieux3");
			divinn += "</table></div>";
		}
		else divinn += "</table><div style=\"border:1px SOLID #000\" id=\"liste_vieux1\">aucun vieux</div><div style=\"border:1px SOLID #000\" " +
			"id=\"liste_vieux2\">aucun vieux</div><div style=\"border:1px SOLID #000\" id=\"liste_vieux3\">aucun vieux</div></div>";
		bdivtv = document.createElement("div");
		bdivtv.id = "tableau_vieux";
		bdivtv.setAttribute("class", "info_bulle");
		bdivtv.style.top = "0px";
		bdivtv.style.right = "0px";
		bdivtv.innerHTML = divinn;
		document.body.appendChild(bdivtv);
		if (numlig > 0)
		{	var listerow = ["enclosv", "enclosv2", "enclosv3", "animvieux", "animvieux2", "animvieux3"];
			var btdv, cl1, cl2, oldtd, cptrv;
			for (j=0;j<6;j++)
			{	btdv = $c(listerow[j]);
				for (i12=0;i12<btdv.length-1;i12++)
				{	cptrv = 1;
					cl1 = btdv[i12].parentNode.className;
					cl2 = btdv[i12+1].parentNode.className;
					while(btdv[i12+1].innerHTML == btdv[i12].innerHTML && ((cl1.indexOf("ok") != -1 && cl2.indexOf("ok") != -1) ||
						(cl1.indexOf("ok") == -1 && cl2.indexOf("ok") == -1)))
					{	cptrv++;
						oldtd = btdv[i12+1].parentNode.removeChild(btdv[i12+1]);
						if (i12+1 < btdv.length) cl2 = btdv[i12+1].parentNode.className;
						else break;
					}
					if (cptrv != 1)
						btdv[i12].setAttribute("rowspan", cptrv);
				}
			}
		}
	}

	var pageb = /bourse.php/.test(window.location) ? "b" : "i";
	var bdiv2v = $("tableau_animaux");
	if (!bdiv2v)
	{	var synthanimauxv = unserialize(GM_getValue("synthanimaux_" + id_zoo, ""));
		var animalpr = false, listea = new Array();
		enclostv = null;
		for (enclostv in synthanimauxv) break;
		if (enclostv)
		{	animalpr = true;
			tabtrie = new Array();
			for (enclostv in synthanimauxv)
			{	enclostv = parseInt(enclostv);
				tabtrie[enclosclasses(enclostv)] = enclostv;
			}
		}
		divinn = "<div id=\'affichertabanimid\' style=\'width:100%;cursor:pointer;font-weight:bold;font-size:15px;text-align:center\' onmouseout=\"UnTip()\" " +
			"onmouseover=\"Tip('Cliquez ici pour afficher ou masquer la liste'" + dontip + ", LEFT, 'true', OFFSETX, 3, OFFSETY, -10)\">Liste des animaux</div>";
		divinn += '<div id="tabanim" style="width:100%;text-align:center;margin:2px"><table width="100%"><tr><td></td></tr>';
		divinn += '<tr><td><input type="checkbox" name="etroit4" id="etroit4"';
		if (GM_getValue("etroit4", false)) divinn += ' checked="checked"';
		divinn += "><label for='etroit4'>Tableau étroit</label></input></td></tr><tr><td onmouseout=\"UnTip()\" onmouseover=\"Tip('Cliquez ici pour vérifier si " +
			"des animaux périodiques<br>sont maintenant disponibles.<br><br>nb : après un mini scan, le script reviendra sur cette page.'" + dontip +
			")\"><input style='font-size:10px' type='button' value='Vérifier les périodiques'></input></td></tr></table>";
		divinn += '<table width="100%" style="border-collapse:collapse;border-top:1px solid #000;border-right:1px solid #000;border-left:1px solid #000">' +
			'<tr style="font-weight:bold"><td><input type="radio" name="choixliste" id="choixliste1" value=1';
		if (GM_getValue("choixliste" + pageb, 1) == 1) divinn += ' checked="checked"';
		divinn += '><label for="choixliste1">Tri par enclos</label></input></td></tr>';
		divinn += '<tr style="font-weight:bold"><td><input type="radio" name="choixliste" id="choixliste2" value=2';
		if (GM_getValue("choixliste" + pageb, 1) == 2) divinn += ' checked="checked"';
		divinn += '><label for="choixliste2">Tri par espèce</label></input></td></tr>';
		if (/bourse.php/.test(window.location))
		{	divinn += '<tr style="font-weight:bold"><td><input type="radio" name="choixliste" id="choixliste3" value=3';
			if (GM_getValue("choixliste" + pageb, 1) == 3) divinn += ' checked="checked"';
			divinn += '><label for="choixliste3">Tri par prix</label></input></td></tr>';
			divinn += '<tr style="font-weight:bold"><td><input type="radio" name="choixliste" id="choixliste4" value=4';
			if (GM_getValue("choixliste" + pageb, 1) == 4) divinn += ' checked="checked"';
			divinn += '><label for="choixliste4">Tri par %</label></input></td></tr>';
		}
		divinn += '</table>';
		var colsp = parseInt(GM_getValue("afficheadulte", 3)) == 1 ? " colspan=\"2\"" : "";
		if (GM_getValue("choixaffanim" + pageb, 4) == 5 && parseInt(GM_getValue("afficheadulte", 3)) == 1) GM_setValue("choixaffanim" + pageb, 1);
		divinn += '<table width="100%" id="radioanim" style="font-size:9.3px;border-collapse:collapse;border-left:1px solid #000;border-right:1px solid #000;' +
			'border-top:1px solid #000"><tr><td width=\"34%\"' +
			'><input type="radio" name="choixaffanim" id="choixaffanim1" value=1';
		if (GM_getValue("choixaffanim" + pageb, 4) == 1) divinn += ' checked="checked"';
		divinn += '><label for="choixaffanim1">Espèces&nbsp;présentes</label></input></td>';
		divinn += '<td width=\"25%\" align=\"right\"><input type="radio" name="choixaffanim" id="choixaffanim2" value=2';
		if (GM_getValue("choixaffanim" + pageb, 4) == 2) divinn += ' checked="checked"';
		divinn += '><label for="choixaffanim2">Manquantes</label></input></td>';
		divinn += '<td><input type="radio" name="choixaffanim" id="choixaffanim3" value=3';
		if (GM_getValue("choixaffanim" + pageb, 4) == 3) divinn += ' checked="checked"';
		divinn += '><label for="choixaffanim3">Toutes</label></input></td></tr>';
		divinn += '<tr><td' + colsp + '><input type="radio" name="choixaffanim" id="choixaffanim4" value=4';
		if (GM_getValue("choixaffanim" + pageb, 4) == 4) divinn += ' checked="checked"';
		divinn += "><label for=\"choixaffanim4\" onmouseout=\"UnTip()\" onmouseover=\"Tip('Nombre de mâles différent du nombre de femelles'" + dontip +
			")\">Déséquilibrées</label></input></td>";
		if (parseInt(GM_getValue("afficheadulte", 3)) > 1)
		{	divinn += '<td align=\"right\"><input type="radio" name="choixaffanim" id="choixaffanim5" value=5';
			if (GM_getValue("choixaffanim" + pageb, 4) == 5) divinn += ' checked="checked"';
			divinn += "><label for=\"choixaffanim5\" onmouseout=\"UnTip()\" onmouseover=\"Tip('Espèces que vous avez qui n&rsquo;ont pas encore atteint le nombre " +
				"maxi souhaité'" + dontip + ")\">Incomplètes</label></input></td>";
		}
		divinn += '<td' + (parseInt(GM_getValue("afficheadulte", 3)) == 1 ? ' align=\"left\"' : '') + '><input type="radio" name="choixaffanim" id="choixaffanim6" value=6';
		if (GM_getValue("choixaffanim" + pageb, 4) == 6) divinn += ' checked="checked"';
		divinn += "><label for=\"choixaffanim6\" onmouseout=\"UnTip()\" onmouseover=\"Tip('Espèces des missions team'" + dontip + ")\">Missions team</label></input></td>";
		divinn += "</tr></table>";
		divinn += "<table width=\"100%\" id=\"liste_anim1\">";
		if (animalpr)
		{	divinn += "<tr><th>Enclos</th><th>Animal</th><th onmouseout=\"UnTip()\" onmouseover=\"Tip('Animaux vivant en groupe'" + dontip + ")\">Gr</th>" +
				"<th onmouseout=\"UnTip()\" onmouseover=\"Tip('Animaux nécessitant des stocks'" + dontip + ")\">St</th>" +
				"<th width=\"20px\"><img src=\"images/icones/male.gif\" onmouseout=\"UnTip()\" onmouseover=\"Tip('Nombre de mâles'" + dontip + ")\"></th>" +
				"<th width=\"20px\"><img src=\"images/icones/female.gif\" onmouseout=\"UnTip()\" onmouseover=\"Tip('Nombre de femelles'" + dontip + "')\"></th>";
			if (parseInt(GM_getValue("afficheadulte", 3)) > 1)
				divinn += "<th style='font-size:9px' onmouseout=\"UnTip()\" onmouseover=\"Tip('Nombre maximum d&rsquo;adultes'" + dontip + ")\">Adultes<br>maxi</th>";
			if (/bourse.php/.test(window.location)) divinn += "<th onmouseout=\"UnTip()\" onmouseover=\"Tip('Prix bourse'" + dontip + ")\">Prix</th><th " +
				"onmouseout=\"UnTip()\" onmouseover=\"Tip('% par rapport au prix de base'" + dontip + ")\">%</th>";
			divinn += "</tr>";
		}
		else divinn += "<tr><td>aucun animal</td></tr>";
		var stocks = unserialize(GM_getValue("stocks_" + id_zoo), "");
		if (animalpr)
		{	for (enclostv in tabtrie)
			{	animtrie = new Array(); nbav = new Array();
				for (i12=0; i12<synthanimauxv[tabtrie[enclostv]].length;i12+=3)
				{	anim = synthanimauxv[tabtrie[enclostv]][i12];
					animtrie.push(anim);
					nbav[anim] = new Array();
					for (j=1;j<3;j++) nbav[anim][j] = parseInt(synthanimauxv[tabtrie[enclostv]][i12+j]);
					if (!listea[anim])
						listea[anim] = new Array();
					listea[anim].push(tabtrie[enclostv]);
					listea[anim].push(parseInt(synthanimauxv[tabtrie[enclostv]][i12+1]));
					listea[anim].push(parseInt(synthanimauxv[tabtrie[enclostv]][i12+2]));
				}
				animtrie.sort();
				tv = Math.floor(tabtrie[enclostv]/100);
				vv = tabtrie[enclostv] - tv*100;
				couleur = nom_enclos(tv, vv);
				if (couleur.indexOf(" n") != -1) couleur = couleur.substring(0, couleur.indexOf(" n"));
				couleur = couleur.toLowerCase();
				for (i12=0;i12<animtrie.length;i12++)
				{	if (i12 == 0)
						divinn += "<tr class=\"" + couleur + "\"><td rowspan=\"" + animtrie.length + "\" class=\"enclos2\"><a href=\"" + urlSite +
							"enclosgestion1.php?t=" + tv + "&v=" + vv + "\">" + nom_enclos(tv,vv).replace(" ","&nbsp;", "g") + "</a></td>";
					else divinn += "<tr class=\"" + couleur + "\">";
					gr = ANIMAUX[animtrie[i12]].groupe > 0 ? "N" : "O";
					st = ANIMAUX[animtrie[i12]].stock != false ? stocks[animtrie[i12]] : "N";
					if (!st) st = "?";
					stylest = st != "N" ? " style='background-color:#f44;color:#fff'" : "";
					divinn += "<td class=\"espece\">" + animtrie[i12].replace(" ","&nbsp;","g") + "</td><td>" + gr + "</td><td" + stylest + ">" + st + "</td><td class=\"mâle\">" + nbav[animtrie[i12]][1] +
						"<td class=\"femelle\">" + nbav[animtrie[i12]][2] + "</td>";
					if (parseInt(GM_getValue("afficheadulte", 3)) > 1)
					{	animax = animauxmax[animtrie[i12]][tabtrie[enclostv]];
						divinn += "<td style='padding:0px;font-size:11px;text-align:center'>" + animax +"</td>";
					}
					if (/bourse.php/.test(window.location))
					{	prixB = prixboursetv[animtrie[i12]];
						pourcenttv = Math.round((parseInt(prixB)/ANIMAUX[animtrie[i12]].prix - 1) * 10000) / 100;
						if (pourcenttv >= 0) signetv = "+";
						else { signetv = "-"; pourcenttv = 0 - pourcenttv ; }
						divinn += "<td>" + millier(prixB).replace(" ", "&nbsp;", "g"); + "</td>";
						divinn += "<td>" + signetv + "&nbsp;" + pourcenttv + "</td>";
					}
					divinn += "</tr>";
				}
			}
		}
		divinn += "</table>";
		for (anim in ANIMAUX)
		{	if (!listea[anim])
			{	listea[anim] = new Array();
				listea[anim][0] = "aucun";
				listea[anim][1] = 0;
				listea[anim][2] = 0;
			}
		}
		divinn += "<table width=\"100%\" id=\"liste_anim2\">";
		var entetetv = "<tr><th>Animal</th><th onmouseout=\"UnTip()\" onmouseover=\"Tip('Les espèces manquantes sont soulignées en rouge dans cette " +
			"colonne', BGCOLOR, '#FFFFAA', FONTFACE, 'Courier New', FONTSIZE, '8pt', ABOVE, 'true', TEXTALIGN, 'center')\">Enclos</th>" +
			"<th onmouseout=\"UnTip()\" onmouseover=\"Tip('Animaux vivant en groupe', BGCOLOR, '#FFFFAA', FONTFACE, 'Courier New', FONTSIZE, " +
			"'8pt', ABOVE, 'true', TEXTALIGN, 'center')\">Gr</th><th onmouseout=\"UnTip()\" onmouseover=\"Tip('Animaux nécessitant des stocks', " +
			"BGCOLOR, '#FFFFAA', FONTFACE, 'Courier New', FONTSIZE, '8pt', ABOVE, 'true', TEXTALIGN, 'center')\">St</th><th width=\"20px\"><img src=\"images/icones/" +
			"male.gif\" onmouseout=\"UnTip()\" onmouseover=\"Tip('Nombre de mâles', BGCOLOR, '#FFFFAA', FONTFACE, 'Courier New', FONTSIZE, '8pt', " +
			"ABOVE, 'true', TEXTALIGN, 'center')\"></th><th width=\"20px\"><img src=\"images/icones/female.gif\" onmouseout=\"UnTip()\" onmouseover=\"Tip('Nombre " +
			"de femelles', BGCOLOR, '#FFFFAA', FONTFACE, 'Courier New', FONTSIZE, '8pt', ABOVE, 'true', TEXTALIGN, 'center')\"></th>";
		if (parseInt(GM_getValue("afficheadulte", 3)) > 1)
		{	entetetv += "<th style='font-size:9px' onmouseout=\"UnTip()\" onmouseover=\"Tip('Nombre maximum d&rsquo;adultes', BGCOLOR, '#FFFFAA', FONTFACE, 'Courier New', FONTSIZE, '8pt', ABOVE, 'true', TEXTALIGN, 'center')\">Adultes<br>maxi</th>";
		}
		if (/bourse.php/.test(window.location)) entetetv += "<th onmouseout=\"UnTip()\" onmouseover=\"Tip('Prix bourse', " +
			"BGCOLOR, '#FFFFAA', FONTFACE, 'Courier New', FONTSIZE, '8pt', ABOVE, 'true', TEXTALIGN, 'center')\">Prix</th><th onmouseout=\"UnTip()\" onmouseover=\"Tip('% par rapport au prix de base', " +
			"BGCOLOR, '#FFFFAA', FONTFACE, 'Courier New', FONTSIZE, '8pt', ABOVE, 'true', TEXTALIGN, 'center')\">%</th>";
		entetetv += "</tr>";
		divinn += entetetv;
		var listetriee = new Array(), nteam;
		lignev = new Array();
		alb0 = new Array(); alb1 = new Array();
		for (anim in listea)
		{	listetriee.push(anim);
			enclostrie = new Array(); nbav = new Array();
			for (i12=0; i12<listea[anim].length;i12+=3)
			{	enclostv = listea[anim][i12];
				enclostrie.push(enclostv);
				nbav[enclostv] = new Array();
				for (j=1;j<3;j++) nbav[enclostv][j] = parseInt(listea[anim][i12+j]);
			}
			enclostrie.sort();
			var compl = new Array();
			var equil = new Array();
			for (i12=0;i12<enclostrie.length;i12++)
			{	alb0[i12] = 0; alb1[i12] = 0;
				if (albinostv[enclostrie[i12]])
				{	for (i13=0;i13<albinostv[enclostrie[i12]].length;i13+=9)
					{	if (albinostv[enclostrie[i12]][i13] == anim)
						{	alb0[i12] = parseInt(albinostv[enclostrie[i12]][i13+7]);
							alb1[i12] = parseInt(albinostv[enclostrie[i12]][i13+8]);
							//alert(anim+" "+alb0[i12]);
							break;
						}
						if (anim.indexOf("albinos") != -1 && albinostv[enclostrie[i12]][i13] == anim.replace(" albinos", ""))
						{	alb0[i12] -= parseInt(albinostv[enclostrie[i12]][i13+1]);
							alb1[i12] -= parseInt(albinostv[enclostrie[i12]][i13+2]);
							break;
						}
					}
				}
				equil[i12] = nbav[enclostrie[i12]][1]-alb0[i12] == nbav[enclostrie[i12]][2]-alb1[i12] || (nbav[enclostrie[i12]][1]-alb0[i12] >= parseInt(animauxmax[anim][enclostrie[i12]]) && nbav[enclostrie[i12]][2]-alb1[i12] >= parseInt(animauxmax[anim][enclostrie[i12]])) ? "equil " : "";
				compl[i12] = equil[i12] == "" ? "" : anim.indexOf("albinos") != -1 ? "compl " : enclostrie[i12] == "aucun" ? "compl " : nbav[enclostrie[i12]][1] < parseInt(animauxmax[anim][enclostrie[i12]]) || nbav[enclostrie[i12]][2] < parseInt(animauxmax[anim][enclostrie[i12]]) ? "" : "compl ";
			}
			nextequil = 0;
			for (i12=0;i12<enclostrie.length;i12++)
			{	if (enclostrie[i12] != "aucun")
				{	tv = Math.floor(enclostrie[i12]/100);
					vv = enclostrie[i12] - tv*100;
					couleur = nom_enclos(tv, vv);
					if (couleur.indexOf(" n") != -1) couleur = couleur.substring(0, couleur.indexOf(" n"));
					couleur = couleur.toLowerCase();
					a = "<a href=\"" + urlSite + "enclosgestion1.php?t=" + tv + "&v=" + vv + "\">" + nom_enclos(tv,vv).replace(" ", "&nbsp;", "g") + "</a>";
					cl = "présente ";
					b = "";
				}
				else { a = ANIMAUX[anim].enclos; b = " style='background-color:#f44;color:#fff'"; cl = "absente "; couleur = ANIMAUX[anim].enclos.toLowerCase(); }
				nteam = ANIMAUX[anim].prix <= 75000 ? "nteam " : "";
				if (i12 == nextequil)
				{	if (i12 == 0) lignev[anim] = new Array();
					for (j=nextequil+1;j<enclostrie.length;j++) if (equil[j] != equil[nextequil] || compl[j] != compl[nextequil]) break;
					nbrow = j - nextequil;
					lignev[anim][i12] = "<tr class=\"" + cl + equil[nextequil] + compl[i12] + nteam + couleur + "\"><td rowspan=\"" + nbrow + "\" class=\"espece\">" +
						anim.replace(" ","&nbsp;","g") + "</td>";
				}
				else lignev[anim][i12] = "<tr class=\"" + cl + equil[nextequil-1] + compl[i12] + nteam + couleur + "\">";
				gr = ANIMAUX[anim].groupe > 0 ? "N" : "O";
				st = ANIMAUX[anim].stock != false ? stocks[anim] : "N";
				if (!st) st = "?";
				stylest = st != "N" ? " style='background-color:#f44;color:#fff'" : "";
				lignev[anim][i12] += "<td class=\"enclos2\"" + b + ">" + a + "</td><td>" + gr + "</td><td" + stylest + ">" + st + "</td><td class=\"mâle\">" + 
					nbav[enclostrie[i12]][1] + "<td class=\"femelle\">" + nbav[enclostrie[i12]][2] + "</td>";
				if (parseInt(GM_getValue("afficheadulte", 3)) > 1)
				{	animax = enclostrie[i12] == "aucun" ? 15 : alb0[i12] >= 0 && alb1[i12] >= 0 && alb0[i12] + alb1[i12] != 0 ?
						(parseInt(animauxmax[anim][enclostrie[i12]]) + parseInt(alb0[i12])) + "/" + (parseInt(animauxmax[anim][enclostrie[i12]]) + parseInt(alb1[i12])) :
						animauxmax[anim][enclostrie[i12]];
					//if (equil[i12] == "") alert(anim+" "+alb0[i12]+" "+alb1[i12]);
					lignev[anim][i12] += "<td style='padding:0px;font-size:11px;text-align:center'>" + animax +"</td>";
				}
				if (/bourse.php/.test(window.location) && i12 == nextequil)
				{	prixB = prixboursetv[anim];
					pourcenttv = Math.round((parseInt(prixB)/ANIMAUX[anim].prix - 1) * 10000) / 100;
					if (pourcenttv >= 0) signetv = "+";
					else { signetv = "-"; pourcenttv = 0 - pourcenttv ; }
					lignev[anim][i12] += "<td rowspan=\"" + nbrow + "\">" + millier(prixB).replace(" ", "&nbsp;", "g") + "</td>";
					lignev[anim][i12] += "<td rowspan=\"" + nbrow + "\">" + signetv + "&nbsp;" + pourcenttv + "</td>";
				}
				if (i12 == nextequil)
					nextequil = j;
				lignev[anim][i12] += "</tr>";
			}
		}
		listetriee.sort();
		for (anim in listetriee)
		{	for (i12=0;i12<lignev[listetriee[anim]].length;i12++)
				divinn += lignev[listetriee[anim]][i12];
		}
		divinn += "</table>";
		divinn += "<table width=\"100%\" id=\"liste_anim3\">" + entetetv;
		if (/bourse.php/.test(window.location))
		{	listetriee.sort(function (a, b) { return parseInt(prixboursetv[a]) - parseInt(prixboursetv[b]) });
			for (anim in listetriee)
			{	for (i12=0;i12<lignev[listetriee[anim]].length;i12++)
					divinn += lignev[listetriee[anim]][i12];
			}
		}
		divinn += "</table>";
		divinn += "<table width=\"100%\" id=\"liste_anim4\">" + entetetv;
		if (/bourse.php/.test(window.location))
		{	listetriee.sort(function (a, b) { return parseInt(prixboursetv[a])/ANIMAUX[a].prix - parseInt(prixboursetv[b])/ANIMAUX[b].prix; });
			for (anim in listetriee)
			{	for (i12=0;i12<lignev[listetriee[anim]].length;i12++)
					divinn += lignev[listetriee[anim]][i12];
			}
		}
		divinn += "</table>";
		divinn += "</div>";
		bdiv2v = document.createElement("div");
		bdiv2v.id = "tableau_animaux";
		bdiv2v.setAttribute("class", "info_bulle");
		bdiv2v.style.top = "0px";
		bdiv2v.style.right = "0px";
		bdiv2v.innerHTML = divinn;
		document.body.appendChild(bdiv2v);
	}

	$("tabvieux").style.display = GM_getValue("affichertabvieux", true) ? "" : "none";
	if (GM_getValue("choixvieux", 1) == 1)
	{	$("liste_vieux1").style.display = "";
		$("liste_vieux2").style.display = "none";
		$("liste_vieux3").style.display = "none";
	}
	else if (GM_getValue("choixvieux", 1) == 2)
	{	$("liste_vieux1").style.display = "none";
		$("liste_vieux2").style.display = "";
		$("liste_vieux3").style.display = "none";
	}
	else
	{	$("liste_vieux1").style.display = "none";
		$("liste_vieux2").style.display = "none";
		$("liste_vieux3").style.display = "";
	}
	if (GM_getValue("etroit3", false))
	{	anim = $c("animvieux");
		for (j=0;j<anim.length;j++) anim[j].innerHTML = anim[j].innerHTML.replace("&nbsp;", " <br>", "g");
		anim = $c("animvieux2");
		for (j=0;j<anim.length;j++) anim[j].innerHTML = anim[j].innerHTML.replace("&nbsp;", " <br>", "g");
		anim = $c("animvieux3");
		for (j=0;j<anim.length;j++) anim[j].innerHTML = anim[j].innerHTML.replace("&nbsp;", " <br>", "g");
		enclostv = $c("enclosv");
		for (j=0;j<enclostv.length;j++) enclostv[j].innerHTML = enclostv[j].innerHTML.replace("&nbsp;", " <br>");
		enclostv = $c("enclosv2");
		for (j=0;j<enclostv.length;j++) enclostv[j].innerHTML = enclostv[j].innerHTML.replace("&nbsp;", " <br>");
		enclostv = $c("enclosv3");
		for (j=0;j<enclostv.length;j++) enclostv[j].innerHTML = enclostv[j].innerHTML.replace("&nbsp;", " <br>");
	}
	else
	{	anim = $c("animvieux");
		for (j=0;j<anim.length;j++) anim[j].innerHTML = anim[j].innerHTML.replace(" <br>", "&nbsp;", "g");
		anim = $c("animvieux2");
		for (j=0;j<anim.length;j++) anim[j].innerHTML = anim[j].innerHTML.replace(" <br>", "&nbsp;", "g");
		anim = $c("animvieux3");
		for (j=0;j<anim.length;j++) anim[j].innerHTML = anim[j].innerHTML.replace(" <br>", "&nbsp;", "g");
		enclostv = $c("enclosv");
		for (j=0;j<enclostv.length;j++) enclostv[j].innerHTML = enclostv[j].innerHTML.replace(" <br>", "&nbsp;", "g");
		enclostv = $c("enclosv2");
		for (j=0;j<enclostv.length;j++) enclostv[j].innerHTML = enclostv[j].innerHTML.replace(" <br>", "&nbsp;", "g");
		enclostv = $c("enclosv3");
		for (j=0;j<enclostv.length;j++) enclostv[j].innerHTML = enclostv[j].innerHTML.replace(" <br>", "&nbsp;", "g");
	}
	if (GM_getValue("filtre2", false))
	{	ok = $c("ok");
		if (ok) for (i12=0;i12<ok.length;i12++) ok[i12].style.display = "none";
	}

	$("tabanim").style.display = GM_getValue("affichertabanim", true) ? "" : "none";
	if (GM_getValue("choixliste" + pageb, 1) == 1)
	{	$("liste_anim2").style.display = "none";
		$("radioanim").style.display = "none";
		$("liste_anim3").style.display = "none";
		$("liste_anim4").style.display = "none";
	}
	else if (GM_getValue("choixliste" + pageb, 1) == 2)
	{	$("liste_anim1").style.display = "none";
		$("liste_anim3").style.display = "none";
		$("liste_anim4").style.display = "none";
	}
	else if (GM_getValue("choixliste" + pageb, 1) == 3)
	{	$("liste_anim1").style.display = "none";
		$("liste_anim2").style.display = "none";
		$("liste_anim4").style.display = "none";
	}
	else
	{	$("liste_anim1").style.display = "none";
		$("liste_anim2").style.display = "none";
		$("liste_anim3").style.display = "none";
	}
	if (GM_getValue("choixaffanim" + pageb, 4) == 1)
	{	abse = $c("absente");
		for(i12=0;i12<abse.length;i12++)
			abse[i12].style.display = "none";
	}
	else if (GM_getValue("choixaffanim" + pageb, 4) == 2)
	{	pres = $c("présente");
		for(i12=0;i12<pres.length;i12++)
			pres[i12].style.display = "none";
	}
	else if (GM_getValue("choixaffanim" + pageb, 4) == 4)
	{	abse = $c("absente");
		for(i12=0;i12<abse.length;i12++)
			abse[i12].style.display = "none";
		equil = $c("equil");
		for(i12=0;i12<equil.length;i12++)
			equil[i12].style.display = "none";
	}
	else if (GM_getValue("choixaffanim" + pageb, 4) == 5)
	{	compl = $c("compl");
		for(i12=0;i12<compl.length;i12++)
			compl[i12].style.display = "none";
	}
	else if (GM_getValue("choixaffanim" + pageb, 4) == 6)
	{	nteam = $c("nteam");
		for(i12=0;i12<nteam.length;i12++)
			nteam[i12].style.display = "none";
	}
	if (GM_getValue("etroit4", false))
	{	anim = $c("espece");
		for (j=0;j<anim.length;j++) anim[j].innerHTML = anim[j].innerHTML.replace("&nbsp;", " <br>", "g");
		enclostv = $c("enclos2");
		for (j=0;j<enclostv.length;j++) enclostv[j].innerHTML = enclostv[j].innerHTML.replace("&nbsp;", " <br>");
	}
	else
	{	anim = $c("espece");
		for (j=0;j<anim.length;j++) anim[j].innerHTML = anim[j].innerHTML.replace(" <br>", "&nbsp;", "g");
		enclostv = $c("enclos2");
		for (j=0;j<enclostv.length;j++) enclostv[j].innerHTML = enclostv[j].innerHTML.replace(" <br>", "&nbsp;", "g");
	}
	bdivtv.style.width = "";
	bdiv2v.style.width = "";
}

function testperiodiquef()
{
	GM_setValue("testperiodique", window.location.href);
	GM_setValue("cache"+window.name, true);
	cherchestocks();
}

function affichertabvieuxf()
{
	GM_setValue("affichertabvieux", !GM_getValue("affichertabvieux", true));
	$("tabvieux").style.display = GM_getValue("affichertabvieux", true) ? "" : "none";
	MAJpostab();
}

function affichertabanimf()
{
	GM_setValue("affichertabanim", !GM_getValue("affichertabanim", true));
	$("tabanim").style.display = GM_getValue("affichertabanim", true) ? "" : "none";
	MAJpostab();
}

function etroit3f(coche)
{
	var animvieux, enclos, j;
	GM_setValue("etroit3", coche);
	if (GM_getValue("etroit3", false))
	{	animvieux = $c("animvieux");
		for (j=0;j<animvieux.length;j++) animvieux[j].innerHTML = animvieux[j].innerHTML.replace("&nbsp;", " <br>", "g");
		animvieux = $c("animvieux2");
		for (j=0;j<animvieux.length;j++) animvieux[j].innerHTML = animvieux[j].innerHTML.replace("&nbsp;", " <br>", "g");
		animvieux = $c("animvieux3");
		for (j=0;j<animvieux.length;j++) animvieux[j].innerHTML = animvieux[j].innerHTML.replace("&nbsp;", " <br>", "g");
		enclos = $c("enclosv");
		for (j=0;j<enclos.length;j++) enclos[j].innerHTML = enclos[j].innerHTML.replace("&nbsp;", " <br>");
		enclos = $c("enclosv2");
		for (j=0;j<enclos.length;j++) enclos[j].innerHTML = enclos[j].innerHTML.replace("&nbsp;", " <br>");
		enclos = $c("enclosv3");
		for (j=0;j<enclos.length;j++) enclos[j].innerHTML = enclos[j].innerHTML.replace("&nbsp;", " <br>");
	}
	else
	{	animvieux =$c("animvieux");
		for (j=0;j<animvieux.length;j++) animvieux[j].innerHTML = animvieux[j].innerHTML.replace(" <br>", "&nbsp;", "g");
		animvieux =$c("animvieux2");
		for (j=0;j<animvieux.length;j++) animvieux[j].innerHTML = animvieux[j].innerHTML.replace(" <br>", "&nbsp;", "g");
		animvieux =$c("animvieux3");
		for (j=0;j<animvieux.length;j++) animvieux[j].innerHTML = animvieux[j].innerHTML.replace(" <br>", "&nbsp;", "g");
		enclos = $c("enclosv");
		for (j=0;j<enclos.length;j++) enclos[j].innerHTML = enclos[j].innerHTML.replace(" <br>", "&nbsp;", "g");
		enclos = $c("enclosv2");
		for (j=0;j<enclos.length;j++) enclos[j].innerHTML = enclos[j].innerHTML.replace(" <br>", "&nbsp;", "g");
		enclos = $c("enclosv3");
		for (j=0;j<enclos.length;j++) enclos[j].innerHTML = enclos[j].innerHTML.replace(" <br>", "&nbsp;", "g");
	}
	MAJpostab();
}

function choixvieuxf(numradio)
{
	GM_setValue("choixvieux", parseInt(numradio));
	if (GM_getValue("choixvieux", 1) == 1)
	{	$("liste_vieux1").style.display = "";
		$("liste_vieux2").style.display = "none";
		$("liste_vieux3").style.display = "none";
	}
	else if (GM_getValue("choixvieux", 1) == 2)
	{	$("liste_vieux1").style.display = "none";
		$("liste_vieux2").style.display = "";
		$("liste_vieux3").style.display = "none";
	}
	else
	{	$("liste_vieux1").style.display = "none";
		$("liste_vieux2").style.display = "none";
		$("liste_vieux3").style.display = "";
	}
	MAJpostab();
}

function filtre2f(coche)
{
	GM_setValue("filtre2", coche);
	var ok = $c("ok"), i12;
	if (ok)
	{	var vdisplay = GM_getValue("filtre2", false) ? "none" : "";
		for (i12=0;i12<ok.length;i12++) ok[i12].style.display = vdisplay;
	}
	MAJpostab();
}

function etroit4f(coche)
{
	var anim, enclos, j;
	GM_setValue("etroit4", coche);
	if (GM_getValue("etroit4", false))
	{	anim = $c("espece");
		for (j=0;j<anim.length;j++) anim[j].innerHTML = anim[j].innerHTML.replace("&nbsp;", " <br>", "g");
		enclos = $c("enclos2");
		for (j=0;j<enclos.length;j++) enclos[j].innerHTML = enclos[j].innerHTML.replace("&nbsp;", " <br>");
	}
	else
	{	anim = $c("espece");
		for (j=0;j<anim.length;j++) anim[j].innerHTML = anim[j].innerHTML.replace(" <br>", "&nbsp;", "g");
		enclos = $c("enclos2");
		for (j=0;j<enclos.length;j++) enclos[j].innerHTML = enclos[j].innerHTML.replace(" <br>", "&nbsp;", "g");
	}
	MAJpostab();
}

function choixliste(numradio)
{
	var pagecl = /bourse.php/.test(window.location) ? "b" : "i";
	GM_setValue("choixliste" + pagecl, parseInt(numradio));
	if (GM_getValue("choixliste" + pagecl, 1) == 1)
	{	$("liste_anim1").style.display = "";
		$("liste_anim2").style.display = "none";
		$("radioanim").style.display = "none";
		$("liste_anim3").style.display = "none";
		$("liste_anim4").style.display = "none";
	}
	else if (GM_getValue("choixliste" + pagecl, 1) == 2)
	{	$("liste_anim4").style.display = "none";
		$("liste_anim1").style.display = "none";
		$("liste_anim2").style.display = "";
		$("radioanim").style.display = "";
		$("liste_anim3").style.display = "none";
	}
	else if (GM_getValue("choixliste" + pagecl, 1) == 3)
	{	$("liste_anim1").style.display = "none";
		$("liste_anim2").style.display = "none";
		$("radioanim").style.display = "";
		$("liste_anim3").style.display = "";
		$("liste_anim4").style.display = "none";
	}
	else
	{	$("liste_anim1").style.display = "none";
		$("liste_anim2").style.display = "none";
		$("radioanim").style.display = "";
		$("liste_anim3").style.display = "none";
		$("liste_anim4").style.display = "";
	}
	MAJpostab();
}

function choixaffanim(numradio)
{
	var pageca = /bourse.php/.test(window.location) ? "b" : "i";
	var oldch = GM_getValue("choixaffanim" + pageca, 4), pres, abse, equil, nteam, i12;
	GM_setValue("choixaffanim" + pageca, parseInt(numradio));
	if (GM_getValue("choixaffanim" + pageca, 4) == 1)
	{	if (oldch == 6)
		{	nteam = $c("nteam");
			for(i12=0;i12<nteam.length;i12++)
				nteam[i12].style.display = "";
		}
		if (oldch == 4)
		{	equil = $c("equil");
			for(i12=0;i12<equil.length;i12++)
				equil[i12].style.display = "";
		}
		if (oldch == 5)
		{	compl = $c("compl");
			for(i12=0;i12<compl.length;i12++)
				compl[i12].style.display = "";
		}
		if (oldch == 2)
		{	pres = $c("présente");
			for(i12=0;i12<pres.length;i12++)
				pres[i12].style.display = "";
		}
		if (oldch != 1)
		{	abse = $c("absente");
			for(i12=0;i12<abse.length;i12++)
				abse[i12].style.display = "none";
		}
	}
	else if (GM_getValue("choixaffanim" + pageca, 4) == 2)
	{	if (oldch == 6)
		{	nteam = $c("nteam");
			for(i12=0;i12<nteam.length;i12++)
				nteam[i12].style.display = "";
		}
		if (oldch == 5)
		{	compl = $c("compl");
			for(i12=0;i12<compl.length;i12++)
				compl[i12].style.display = "";
		}
		if (oldch != 2)
		{	pres = $c("présente");
			for(i12=0;i12<pres.length;i12++)
				pres[i12].style.display = "none";
		}
		if (oldch == 1 || oldch == 4)
		{	abse = $c("absente");
			for(i12=0;i12<abse.length;i12++)
				abse[i12].style.display = "";
		}
	}
	else if (GM_getValue("choixaffanim" + pageca, 4) == 3)
	{	if (oldch == 6)
		{	nteam = $c("nteam");
			for(i12=0;i12<nteam.length;i12++)
				nteam[i12].style.display = "";
		}
		if (oldch == 4)
		{	equil = $c("equil");
			for(i12=0;i12<equil.length;i12++)
				equil[i12].style.display = "";
		}
		if (oldch == 5)
		{	compl = $c("compl");
			for(i12=0;i12<compl.length;i12++)
				compl[i12].style.display = "";
		}
		if (oldch == 2)
		{	pres = $c("présente");
			for(i12=0;i12<pres.length;i12++)
				pres[i12].style.display = "";
		}
		if (oldch == 1 || oldch == 4)
		{	abse = $c("absente");
			for(i12=0;i12<abse.length;i12++)
				abse[i12].style.display = "";
		}
	}
	else if (GM_getValue("choixaffanim" + pageca, 4) == 4)
	{	if (oldch == 6)
		{	nteam = $c("nteam");
			for(i12=0;i12<nteam.length;i12++)
				nteam[i12].style.display = "";
		}
		if (oldch == 5)
		{	compl = $c("compl");
			for(i12=0;i12<compl.length;i12++)
				compl[i12].style.display = "";
		}
		if (oldch == 2)
		{	pres = $c("présente");
			for(i12=0;i12<pres.length;i12++)
				pres[i12].style.display = "";
		}
		if (oldch == 2 || oldch == 3)
		{	abse = $c("absente");
			for(i12=0;i12<abse.length;i12++)
				abse[i12].style.display = "none";
		}
		if (oldch != 4)
		{	equil = $c("equil");
			for(i12=0;i12<equil.length;i12++)
				equil[i12].style.display = "none";
		}
	}
	else if (GM_getValue("choixaffanim" + pageca, 4) == 5)
	{	if (oldch == 6)
		{	nteam = $c("nteam");
			for(i12=0;i12<nteam.length;i12++)
				nteam[i12].style.display = "";
		}
		if (oldch == 1)
		{	abse = $c("absente");
			for(i12=0;i12<abse.length;i12++)
				abse[i12].style.display = "";
		}
		if (oldch == 2)
		{	pres = $c("présente");
			for(i12=0;i12<pres.length;i12++)
				pres[i12].style.display = "";
		}
		if (oldch == 4)
		{	equil = $c("equil");
			for(i12=0;i12<equil.length;i12++)
				equil[i12].style.display = "";
		}
		if (oldch != 5)
		{	compl = $c("compl");
			for(i12=0;i12<compl.length;i12++)
				compl[i12].style.display = "none";
		}
	}
	else
	{	if (oldch == 1)
		{	abse = $c("absente");
			for(i12=0;i12<abse.length;i12++)
				abse[i12].style.display = "";
		}
		if (oldch == 2)
		{	pres = $c("présente");
			for(i12=0;i12<pres.length;i12++)
				pres[i12].style.display = "";
		}
		if (oldch == 4)
		{	equil = $c("equil");
			for(i12=0;i12<equil.length;i12++)
				equil[i12].style.display = "";
		}
		if (oldch == 5)
		{	compl = $c("compl");
			for(i12=0;i12<compl.length;i12++)
				compl[i12].style.display = "";
		}
		if (oldch != 6)
		{	nteam = $c("nteam");
			for(i12=0;i12<nteam.length;i12++)
				nteam[i12].style.display = "none";
		}
	}
	MAJpostab();
}

function DrawLine(x1,y1,x2,y2,color)
{
	// on calcule la longueur du segment
	var lg = Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
	// on détermine le nombre de points nécessaires
	var nbPoints = Math.floor(lg);
	// stepX, stepY = distance entre deux points;
	var stepX = (x2-x1)/lg;
	var stepY = (y2-y1)/lg;
	var Points='';
	for (var i14=0;i14<nbPoints+1;i14+=4)
		Points += '<div style="font-size:3px;cursor:default;width:3px;heigth:3px;background-color:' + color + ';position:absolute;top:' + (y1-1+i14*stepY) +
			'px;left:' + (x1+i14*stepX) + 'px">&nbsp;</div>';
	// on rajoute le point de départ
	Points += '<div style="font-size:3px;cursor:default;width:3px;heigth:3px;background-color:#000000;position:absolute;top:' + (y1-1) + 'px;left:' + x1 + 'px">&nbsp;</div>';
	// et le point d'arrivée
	Points += '<div style="font-size:3px;cursor:default;width:3px;heigth:3px;background-color:#000000;position:absolute;top:' + (y2-1) + 'px;left:' + x2 + 'px">&nbsp;</div>';
	return Points;
}

function decompose(extraitsuivi)
{
	var donnees = extraitsuivi, sousdonnees;
	this.date = donnees.substring(0, donnees.indexOf(":"));
	jour = this.date.substring(0,this.date.indexOf("/"));
	mois = this.date.substring(this.date.indexOf("/")+1);
	an = mois.substring(mois.indexOf("/")+1);
	mois = mois.substring(0,mois.indexOf("/"));
	if (an.indexOf("/") != -1) an = an.substring(0,an.indexOf("/"));
	val = parseInt(an) * 500 + parseInt(mois) * 40 + parseInt(jour);
	donnees = donnees.substring(donnees.indexOf(":")+1);
	sousdonnees = donnees.substring(0, donnees.indexOf(","));
	if (sousdonnees.indexOf("/") != -1)
	{	this.couples = parseInt(sousdonnees.substring(0, sousdonnees.indexOf("/")).replace(" ","","g"));
		sousdonnees = sousdonnees.substring(sousdonnees.indexOf("/")+1);
		if (sousdonnees.indexOf("/") != -1)
		{	this.valeurT = parseInt(sousdonnees.substring(0, sousdonnees.indexOf("/")).replace(" ","","g"));
			sousdonnees = sousdonnees.substring(sousdonnees.indexOf("/")+1);
			this.nbanim = parseInt(sousdonnees.substring(0, sousdonnees.indexOf("/")).replace(" ","","g"));
			this.agemoyen = parseFloat(sousdonnees.substring(sousdonnees.indexOf("/")+1).replace(" ","","g"));
		}
		else if (val >= 1005046)
		{	this.valeurT = parseInt(sousdonnees.substring(sousdonnees.indexOf("/")+1).replace(" ","","g"));
			this.nbanim = -1;
			this.agemoyen = -1;
		}
		else
		{	this.valeurT = -1; // on ne tient pas compte des valeurs anciennes, erronées
			this.nbanim = -1;
			this.agemoyen = -1;
		}
	}
	else
	{	this.couples = parseInt(sousdonnees.replace(" ","","g"));
		this.valeurT = -1;
		this.nbanim = -1;
		this.agemoyen = -1;
	}
	donnees = donnees.substring(donnees.indexOf(",")+1);
	if (donnees.indexOf(",") != -1)
	{	sousdonnees = donnees.substring(0, donnees.indexOf(","));
		this.nb = parseInt(sousdonnees.substring(0, sousdonnees.indexOf("/")));
		this.nb_th = parseFloat(sousdonnees.substring(sousdonnees.indexOf("/")+1));
		donnees = donnees.substring(donnees.indexOf(",")+1);
		if (donnees.indexOf(",") != -1)
		{	sousdonnees = donnees.substring(0, donnees.indexOf(","));
			this.valeur = parseInt(sousdonnees.substring(0, sousdonnees.indexOf("/")).replace(" ","","g"));
			if (val >= 1005005) this.valeur_th = parseInt(sousdonnees.substring(sousdonnees.indexOf("/")+1).replace(" ","","g"));
			else this.valeur_th = -1; // on ne tient pas compte des valeurs anciennes, erronées
			donnees = donnees.substring(donnees.indexOf(",")+1);
			if (donnees.indexOf(",") != -1)
			{	sousdonnees = donnees.substring(0, donnees.indexOf(","));
				this.moyenne = parseInt(sousdonnees.substring(0, sousdonnees.indexOf("/")).replace(" ","","g"));
				if (sousdonnees.substring(sousdonnees.indexOf("/")+1) == "NaN") this.moyenne_th = -1;
				else if (val >= 1005005) this.moyenne_th = parseInt(sousdonnees.substring(sousdonnees.indexOf("/")+1).replace(" ","","g"));
				else this.moyenne_th = -1;
				donnees = donnees.substring(donnees.indexOf(",")+1);
				this.males = parseInt(donnees.substring(0, donnees.indexOf("/")));
				this.femelles = parseInt(donnees.substring(donnees.indexOf("/")+1));
			}
			else
			{	this.moyenne = parseInt(donnees.substring(0, donnees.indexOf("/")).replace(" ","","g"));
				if (donnees.substring(donnees.indexOf("/")+1) == "NaN") this.moyenne_th = -1;
				else if (val >= 1005005) this.moyenne_th = parseInt(donnees.substring(donnees.indexOf("/")+1).replace(" ","","g"));
				else this.moyenne_th = -1;
				this.males = -1;
				this.femelles = -1;
			}
		}
		else
		{	this.valeur = parseInt(donnees.substring(0, donnees.indexOf("/")).replace(" ","","g"));
			this.valeur_th = -1;
			this.moyenne = parseInt(donnees.substring(donnees.indexOf("/")+1).replace(" ","","g"));
			this.moyenne_th = -1;
			this.males = -1;
			this.femelles = -1;
		}
	}
	else
	{	this.nb = parseInt(donnees.substring(0, donnees.indexOf("/")));
		this.nb_th = parseFloat(donnees.substring(donnees.indexOf("/")+1));
		this.valeur = -1;
		this.valeur_th = -1;
		this.moyenne = -1;
		this.moyenne_th = -1;
		this.males = -1;
		this.femelles = -1;
	}
}

function decompose2(extraitsuiviav)
{
	var donnees = extraitsuiviav;
	this.date = donnees.substring(0, donnees.indexOf(":"));
	donnees = donnees.substring(donnees.indexOf(":")+1);
	this.totachats = parseInt(donnees.substring(0, donnees.indexOf("/")));
	this.totventes = parseInt(donnees.substring(donnees.indexOf("/")+1));
}

function decompose3(extraitsuivicl)
{
	var donnees = extraitsuivicl;
	this.date = donnees.substring(0, donnees.indexOf(":"));
	donnees = donnees.substring(donnees.indexOf(":")+1);
	this.pts = parseInt(donnees.substring(0, donnees.indexOf("/")));
	sousdonnees = donnees.substring(donnees.indexOf("/")+1);
	this.clpts = parseInt(sousdonnees.substring(0, sousdonnees.indexOf("/")));
	sousdonnees = sousdonnees.substring(sousdonnees.indexOf("/")+1);
	this.pr = parseFloat(sousdonnees.substring(0, sousdonnees.indexOf("/")));
	sousdonnees = sousdonnees.substring(sousdonnees.indexOf("/")+1);
	if (sousdonnees.indexOf("/") != -1)
	{	this.clpr = parseInt(sousdonnees.substring(0, sousdonnees.indexOf("/")));
		sousdonnees = sousdonnees.substring(sousdonnees.indexOf("/")+1);
		this.team = parseFloat(sousdonnees.substring(0, sousdonnees.indexOf("/")));
		this.clte = parseInt(sousdonnees.substring(sousdonnees.indexOf("/")+1));
	}
	else
	{	this.clpr = parseInt(sousdonnees);
		this.team = -1;
		this.clte = -1;
	}
}

function decompose4(extraitsuiviclm)
{
	var donnees = extraitsuiviclm;
	this.date = donnees.substring(0, donnees.indexOf(":"));
	donnees = donnees.substring(donnees.indexOf(":")+1);
	this.men = parseInt(donnees.substring(0, donnees.indexOf("/")));
	this.clmen = parseInt(donnees.substring(donnees.indexOf("/")+1));
}

function analyse_suivi()
{
	var suivinaiss = GM_getValue("suivi_naissances_" + id_zoo, "");
	var i15 = 0;
	while (suivinaiss != "")
	{	tab_suivi[i15] = new decompose(suivinaiss.substring(0,suivinaiss.indexOf(";")));
		i15++;
		suivinaiss = suivinaiss.substring(suivinaiss.indexOf(";")+1);
	}
	imax = i15;
	/*for (i15=0;i15<imax;i15++)
	{	suivinaiss += tab_suivi[i15].date + ":" + tab_suivi[i15].couples + "/" + tab_suivi[i15].valeurT + "," + tab_suivi[i15].nb + "/" + tab_suivi[i15].nb_th + "," +
			tab_suivi[i15].valeur + "/" + tab_suivi[i15].valeur_th + "," + tab_suivi[i15].moyenne + "/" + tab_suivi[i15].moyenne_th + "," + tab_suivi[i15].males + "/" +
			tab_suivi[i15].femelles + "\n";
	} alert(suivinaiss);*/
	for (i15=0;i15<imax;i15++)
	{	if (mingr.couples == -1) mingr.couples = tab_suivi[i15].couples;
		else if (tab_suivi[i15].couples < mingr.couples && tab_suivi[i15].couples >= 0) mingr.couples = tab_suivi[i15].couples;
		if (mingr.valeurT == -1) mingr.valeurT = tab_suivi[i15].valeurT;
		else if (tab_suivi[i15].valeurT < mingr.valeurT && tab_suivi[i15].valeurT >= 0) mingr.valeurT = tab_suivi[i15].valeurT;
		if (mingr.nbanim == -1) mingr.nbanim = tab_suivi[i15].nbanim;
		else if (tab_suivi[i15].nbanim < mingr.nbanim && tab_suivi[i15].nbanim >= 0) mingr.nbanim = tab_suivi[i15].nbanim;
		if (mingr.agemoyen == -1) mingr.agemoyen = tab_suivi[i15].agemoyen;
		else if (tab_suivi[i15].agemoyen < mingr.agemoyen && tab_suivi[i15].agemoyen >= 0) mingr.agemoyen = tab_suivi[i15].agemoyen;
		if (mingr.nb == -1) mingr.nb = tab_suivi[i15].nb;
		else if (tab_suivi[i15].nb < mingr.nb && tab_suivi[i15].nb >= 0) mingr.nb = tab_suivi[i15].nb;
		if (mingr.nb_th == -1) mingr.nb_th = tab_suivi[i15].nb_th;
		else if (tab_suivi[i15].nb_th < mingr.nb_th && tab_suivi[i15].nb_th > 0) mingr.nb_th = tab_suivi[i15].nb_th;
		if (mingr.valeur == -1) mingr.valeur = tab_suivi[i15].valeur;
		else if (tab_suivi[i15].valeur < mingr.valeur && tab_suivi[i15].valeur >= 0) mingr.valeur = tab_suivi[i15].valeur;
		if (mingr.valeur_th == -1) mingr.valeur_th = tab_suivi[i15].valeur_th;
		else if (tab_suivi[i15].valeur_th < mingr.valeur_th && tab_suivi[i15].valeur_th > 0) mingr.valeur_th = tab_suivi[i15].valeur_th;
		if (mingr.moyenne == -1) mingr.moyenne = tab_suivi[i15].moyenne;
		else if (tab_suivi[i15].moyenne < mingr.moyenne && tab_suivi[i15].moyenne >= 0) mingr.moyenne = tab_suivi[i15].moyenne;
		if (mingr.moyenne_th == -1) mingr.moyenne_th = tab_suivi[i15].moyenne_th;
		else if (tab_suivi[i15].moyenne_th < mingr.moyenne_th && tab_suivi[i15].moyenne_th > 0) mingr.moyenne_th = tab_suivi[i15].moyenne_th;
		if (mingr.males == -1) mingr.males = tab_suivi[i15].males;
		else if (tab_suivi[i15].males < mingr.males && tab_suivi[i15].males >= 0) mingr.males = tab_suivi[i15].males;
		if (mingr.femelles == -1) mingr.femelles = tab_suivi[i15].femelles;
		else if (tab_suivi[i15].femelles < mingr.femelles && tab_suivi[i15].femelles >= 0) mingr.femelles = tab_suivi[i15].femelles;
	}
	for (i15=0;i15<imax;i15++)
	{	if (maxgr.couples == -1) maxgr.couples = tab_suivi[i15].couples;
		else if (tab_suivi[i15].couples > maxgr.couples) maxgr.couples = tab_suivi[i15].couples;
		if (maxgr.valeurT == -1) maxgr.valeurT = tab_suivi[i15].valeurT;
		else if (tab_suivi[i15].valeurT > maxgr.valeurT) maxgr.valeurT = tab_suivi[i15].valeurT;
		if (maxgr.nbanim == -1) maxgr.nbanim = tab_suivi[i15].nbanim;
		else if (tab_suivi[i15].nbanim > maxgr.nbanim) maxgr.nbanim = tab_suivi[i15].nbanim;
		if (maxgr.agemoyen == -1) maxgr.agemoyen = tab_suivi[i15].agemoyen;
		else if (tab_suivi[i15].agemoyen > maxgr.agemoyen) maxgr.agemoyen = tab_suivi[i15].agemoyen;
		if (maxgr.nb == -1) maxgr.nb = tab_suivi[i15].nb;
		else if (tab_suivi[i15].nb > maxgr.nb) maxgr.nb = tab_suivi[i15].nb;
		if (maxgr.nb_th == -1) maxgr.nb_th = tab_suivi[i15].nb_th;
		else if (tab_suivi[i15].nb_th > maxgr.nb_th) maxgr.nb_th = tab_suivi[i15].nb_th;
		if (maxgr.valeur == -1) maxgr.valeur = tab_suivi[i15].valeur;
		else if (tab_suivi[i15].valeur > maxgr.valeur) maxgr.valeur = tab_suivi[i15].valeur;
		if (maxgr.valeur_th == -1) maxgr.valeur_th = tab_suivi[i15].valeur_th;
		else if (tab_suivi[i15].valeur_th > maxgr.valeur_th) maxgr.valeur_th = tab_suivi[i15].valeur_th;
		if (maxgr.moyenne == -1) maxgr.moyenne = tab_suivi[i15].moyenne;
		else if (tab_suivi[i15].moyenne > maxgr.moyenne) maxgr.moyenne = tab_suivi[i15].moyenne;
		if (maxgr.moyenne_th == -1) maxgr.moyenne_th = tab_suivi[i15].moyenne_th;
		else if (tab_suivi[i15].moyenne_th > maxgr.moyenne_th) maxgr.moyenne_th = tab_suivi[i15].moyenne_th;
		if (maxgr.males == -1) maxgr.males = tab_suivi[i15].males;
		else if (tab_suivi[i15].males > maxgr.males) maxgr.males = tab_suivi[i15].males;
		if (maxgr.femelles == -1) maxgr.femelles = tab_suivi[i15].femelles;
		else if (tab_suivi[i15].femelles > maxgr.femelles) maxgr.femelles = tab_suivi[i15].femelles;
	}
	var suiviachven = GM_getValue("suivi_achven_" + id_zoo, "");
	i15 = 0;
	while (suiviachven != "")
	{	tab_suiviav[i15] = new decompose2(suiviachven.substring(0,suiviachven.indexOf(";")));
		i15++;
		suiviachven = suiviachven.substring(suiviachven.indexOf(";")+1)
	}
	imaxav = i15;
	/*for (i15=0;i15<imaxav;i15++)
	{	suiviachven += tab_suiviav[i15].date + ":" + tab_suiviav[i15].totachats + "," + tab_suiviav[i15].totventes + "\n";
	}alert(suiviachven);*/
	for (i15=0;i15<imaxav;i15++)
	{	if (mingrav.totachats == -1) mingrav.totachats = tab_suiviav[i15].totachats;
		else if (tab_suiviav[i15].totachats < mingrav.totachats && tab_suiviav[i15].totachats >= 0) mingrav.totachats = tab_suiviav[i15].totachats;
		if (mingrav.totventes == -1) mingrav.totventes = tab_suiviav[i15].totventes;
		else if (tab_suiviav[i15].totventes < mingrav.totventes && tab_suiviav[i15].totventes >= 0) mingrav.totventes = tab_suiviav[i15].totventes;
	}
	for (i15=0;i15<imaxav;i15++)
	{	if (maxgrav.totachats == -1) maxgrav.totachats = tab_suiviav[i15].totachats;
		else if (tab_suiviav[i15].totachats > maxgrav.totachats) maxgrav.totachats = tab_suiviav[i15].totachats;
		if (maxgrav.totventes == -1) maxgrav.totventes = tab_suiviav[i15].totventes;
		else if (tab_suiviav[i15].totventes > maxgrav.totventes) maxgrav.totventes = tab_suiviav[i15].totventes;
	}
	var suivicl = GM_getValue("suivi_cl_" + id_zoo, "");
	i15 = 0;
	while (suivicl != "")
	{	tab_suivicl[i15] = new decompose3(suivicl.substring(0,suivicl.indexOf(";")));
		i15++;
		suivicl = suivicl.substring(suivicl.indexOf(";")+1)
	}
	imaxcl = i15;
	/*for (i15=0;i15<imaxcl;i15++)
	{	suivicl += tab_suivicl[i15].date + ":" + tab_suivicl[i15].pts + "," + tab_suivicl[i15].clpts + tab_suivicl[i15].pr + "," + tab_suivicl[i15].clpr + "\n";
	}alert(suivicl);*/
	for (i15=0;i15<imaxcl;i15++)
	{	if (mingrcl.pts == -1) mingrcl.pts = tab_suivicl[i15].pts;
		else if (tab_suivicl[i15].pts < mingrcl.pts && tab_suivicl[i15].pts >= 0) mingrcl.pts = tab_suivicl[i15].pts;
		if (mingrcl.clpts == -1) mingrcl.clpts = tab_suivicl[i15].clpts;
		else if (tab_suivicl[i15].clpts < mingrcl.clpts && tab_suivicl[i15].clpts >= 0) mingrcl.clpts = tab_suivicl[i15].clpts;
		if (mingrcl.pr == -1) mingrcl.pr = tab_suivicl[i15].pr;
		else if (tab_suivicl[i15].pr < mingrcl.pr && tab_suivicl[i15].pr >= 0) mingrcl.pr = tab_suivicl[i15].pr;
		if (mingrcl.clpr == -1) mingrcl.clpr = tab_suivicl[i15].clpr;
		else if (tab_suivicl[i15].clpr < mingrcl.clpr && tab_suivicl[i15].clpr >= 0) mingrcl.clpr = tab_suivicl[i15].clpr;
		if (mingrcl.team == -1) mingrcl.team = tab_suivicl[i15].team;
		else if (tab_suivicl[i15].team < mingrcl.team && tab_suivicl[i15].team >= 0) mingrcl.team = tab_suivicl[i15].team;
		if (mingrcl.clte == -1) mingrcl.clte = tab_suivicl[i15].clte;
		else if (tab_suivicl[i15].clte < mingrcl.clte && tab_suivicl[i15].clte >= 0) mingrcl.clte = tab_suivicl[i15].clte;
	}
	for (i15=0;i15<imaxcl;i15++)
	{	if (maxgrcl.pts == -1) maxgrcl.pts = tab_suivicl[i15].pts;
		else if (tab_suivicl[i15].pts > maxgrcl.pts) maxgrcl.pts = tab_suivicl[i15].pts;
		if (maxgrcl.clpts == -1) maxgrcl.clpts = tab_suivicl[i15].clpts;
		else if (tab_suivicl[i15].clpts > maxgrcl.clpts) maxgrcl.clpts = tab_suivicl[i15].clpts;
		if (maxgrcl.pr == -1) maxgrcl.pr = tab_suivicl[i15].pr;
		else if (tab_suivicl[i15].pr > maxgrcl.pr) maxgrcl.pr = tab_suivicl[i15].pr;
		if (maxgrcl.clpr == -1) maxgrcl.clpr = tab_suivicl[i15].clpr;
		else if (tab_suivicl[i15].clpr > maxgrcl.clpr) maxgrcl.clpr = tab_suivicl[i15].clpr;
		if (maxgrcl.team == -1) maxgrcl.team = tab_suivicl[i15].team;
		else if (tab_suivicl[i15].team < maxgrcl.team && tab_suivicl[i15].team >= 0) maxgrcl.team = tab_suivicl[i15].team;
		if (maxgrcl.clte == -1) maxgrcl.clte = tab_suivicl[i15].clte;
		else if (tab_suivicl[i15].clte < maxgrcl.clte && tab_suivicl[i15].clte >= 0) maxgrcl.clte = tab_suivicl[i15].clte;
	}
	var suiviclm = GM_getValue("suivi_clm_" + id_zoo, "");
	i15 = 0;
	while (suiviclm != "")
	{	tab_suiviclm[i15] = new decompose4(suiviclm.substring(0,suiviclm.indexOf(";")));
		i15++;
		suiviclm = suiviclm.substring(suiviclm.indexOf(";")+1)
	}
	imaxclm = i15;
	/*for (i15=0;i15<imaxclm;i15++)
	{	suiviclm += tab_suiviclm[i15].date + ":" + tab_suiviclm[i15].pts + "," + tab_suiviclm[i15].clpts + tab_suiviclm[i15].pr + "," + tab_suiviclm[i15].clpr + "\n";
	}alert(suiviclm);*/
	for (i15=0;i15<imaxclm;i15++)
	{	if (mingrclm.men == -1) mingrclm.men = tab_suiviclm[i15].men;
		else if (tab_suiviclm[i15].men < mingrclm.men && tab_suiviclm[i15].men >= 0) mingrclm.men = tab_suiviclm[i15].men;
		if (mingrclm.clmen == -1) mingrclm.clmen = tab_suiviclm[i15].clmen;
		else if (tab_suiviclm[i15].clmen < mingrclm.clmen && tab_suiviclm[i15].clmen >= 0) mingrclm.clmen = tab_suiviclm[i15].clmen;
	}
	for (i15=0;i15<imaxclm;i15++)
	{	if (maxgrclm.men == -1) maxgrclm.men = tab_suiviclm[i15].men;
		else if (tab_suiviclm[i15].men < maxgrclm.men && tab_suiviclm[i15].men >= 0) maxgrclm.men = tab_suiviclm[i15].men;
		if (maxgrclm.clmen == -1) maxgrclm.clmen = tab_suiviclm[i15].clmen;
		else if (tab_suiviclm[i15].clmen < maxgrclm.clmen && tab_suiviclm[i15].clmen >= 0) maxgrclm.clmen = tab_suiviclm[i15].clmen;
	}
}

function graphique(btdgr)
{	var i16, j, min2, afmax2, afmin2;
	var x1, y1, x2, y2, txt, date1 = "", date2 = "";
	var graexist = $("bullegraphe"), oldgra;
	if (graexist)
		oldgra = graexist.parentNode.removeChild(graexist);
	graexist = $("traitgraphe");
	if (graexist)
		oldgra = graexist.parentNode.removeChild(graexist);
	scrOui = false;
	deb = 0;
	pas = 1;
	jmax = 0;
	iclic = 1 + $("choix_trace").selectedIndex;
	if (iclic == 8) iclic = 6; // changement de l'ordre des choix
	else if (iclic == 6) iclic = 7;
	else if (iclic == 7) iclic = 8;
	var btable1 = $("suivitable");
	if (!btable1)
	{	btable1 = document.createElement("table");
		btable1.id = "suivitable";
		btable1.setAttribute("style", "border-collapse:collapse;width:" + largeurgraphique + "px;height:" +
			(hauteurgraphique + 71) + "px");
		bligne11 = document.createElement("tr");
		bligne12 = document.createElement("tr");
		bligne13 = document.createElement("tr");
		bcase11 = document.createElement("td");
		bcase12 = document.createElement("td");
		bcase13 = document.createElement("td");
		bcase14 = document.createElement("td");
		bcase15 = document.createElement("td");
		btable2 = document.createElement("table");
		btable2.setAttribute("style", "border-collapse:collapse;");
		bligne21 = document.createElement("tr");
		bligne22 = document.createElement("tr");
		bligne23 = document.createElement("tr");
		bligne24 = document.createElement("tr");
		bcase21 = document.createElement("td");
		bcase22 = document.createElement("td");
		bcase23 = document.createElement("td");
		bcase24 = document.createElement("td");
		bcase11.setAttribute("style", "vertical-align:top");
		bcase13.setAttribute("style", "vertical-align:top");
		bcase12.setAttribute("style", "position:absolute;padding:0px;margin:-1px;overflow-x:auto");
		bcase12.setAttribute("rowspan", "2");
		bcase12.appendChild(btable2);
		bligne11.appendChild(bcase11);
		bligne11.appendChild(bcase12);
		bligne12.appendChild(bcase13);
		bligne13.appendChild(bcase14);
		bligne13.appendChild(bcase15);
		bcase11.id = "caseMAX";
		bcase12.id = "casegrapheaffiche";
		bcase13.id = "caseMIN";
		bcase21.id = "casegraphetotal";
		bcase22.id = "case22";
		bcase23.innerHTML = "";
		bcase24.id = "casecadre";
		bcase15.innerHTML = "<div id=\"divG1\" style=\"position:absolute;font-size:10px\">|</div><div id=\"divD1\" " +
			"style=\"position:absolute;font-size:10px\">|</div><div id=\"divG2\" style=\"position:absolute;font-size:13px\"></div><div id=\"divinfo\" " +
			"style=\"position:absolute;text-align:center;font-size:10px;font-weight:bold\"></div><div id=\"divD2\" " +
			"style=\"position:absolute;text-align:right;font-size:13px\"></div>";
		bligne21.appendChild(bcase21);
		bligne22.appendChild(bcase22);
		bligne23.appendChild(bcase23);
		bligne24.appendChild(bcase24);
		btable1.appendChild(bligne11);
		btable1.appendChild(bligne12);
		btable1.appendChild(bligne13);
		btable2.appendChild(bligne21);
		btable2.appendChild(bligne22);
		btable2.appendChild(bligne23);
		btable2.appendChild(bligne24);
		btdgr.appendChild(btable1);
		document.addEventListener("mousemove", suivisouris, true);
		bcase12.addEventListener('scroll', suiviscroll, true);
	}
	extrait = new Array();
	extrait2 = new Array();
	moyenne = new Array();
	dategr = new Array();
	nb_points = parseInt(GM_getValue("nb_points", 50));
	typerepartition = parseInt(GM_getValue("typerepartition", 3));
	switch (iclic)
	{	case 1:
			for (i16=0;i16<imax;i16++)
				if (tab_suivi[i16].nbanim >= 0)
				{	extrait[jmax] = tab_suivi[i16].nbanim;
					if (date1 == "") date1 = tab_suivi[i16].date;
					dategr[jmax] = tab_suivi[i16].date;
					date2 = dategr[jmax];
					jmax++;
				}
			if (jmax - 1 > nb_points)
			{	if (typerepartition == 2)
				{	deb = jmax - nb_points;
					for (i16=deb;i16<=jmax;i16++)
					{	if (i16 == deb) { min2 = extrait[i16]; max2 = extrait[i16]; date1 = dategr[i16]; }
						else
						{	if (extrait[i16] < min2) min2 = extrait[i16];
							if (extrait[i16] > max2) max2 = extrait[i16];
						}
					}
					jmax = nb_points;
				}
				else if (typerepartition == 1)
				{	pas = (jmax - 1)/ (nb_points - 1);
					for (i16=0;i16<nb_points;i16++)
					{	if (i16 == 0) { min2 = extrait[i16]; max2 = extrait[i16]; }
						else
						{	if (extrait[Math.floor(i16*pas)] < min2) min2 = extrait[Math.floor(i16*pas)];
							if (extrait[Math.floor(i16*pas)] > max2) max2 = extrait[Math.floor(i16*pas)];
						}
					}
					jmax = nb_points;
				}
				else
				{	max2 = maxgr.nbanim;
					min2 = mingr.nbanim;
				}
			}
			else
			{	max2 = maxgr.nbanim;
				min2 = mingr.nbanim;
			}
			break;
		case 2:
			for (i16=0;i16<imax;i16++)
				if (tab_suivi[i16].agemoyen >= 0)
				{	extrait[jmax] = tab_suivi[i16].agemoyen;
					if (date1 == "") date1 = tab_suivi[i16].date;
					dategr[jmax] = tab_suivi[i16].date;
					date2 = dategr[jmax];
					jmax++;
				}
			if (jmax - 1 > nb_points)
			{	if (typerepartition == 2)
				{	deb = jmax - nb_points;
					for (i16=deb;i16<=jmax;i16++)
					{	if (i16 == deb) { min2 = extrait[i16]; max2 = extrait[i16]; date1 = dategr[i16]; }
						else
						{	if (extrait[i16] < min2) min2 = extrait[i16];
							if (extrait[i16] > max2) max2 = extrait[i16];
						}
					}
					jmax = nb_points;
				}
				else if (typerepartition == 1)
				{	pas = (jmax - 1)/ (nb_points - 1);
					for (i16=0;i16<nb_points;i16++)
					{	if (i16 == 0) { min2 = extrait[i16]; max2 = extrait[i16]; }
						else
						{	if (extrait[Math.floor(i16*pas)] < min2) min2 = extrait[Math.floor(i16*pas)];
							if (extrait[Math.floor(i16*pas)] > max2) max2 = extrait[Math.floor(i16*pas)];
						}
					}
					jmax = nb_points;
				}
				else
				{	max2 = maxgr.agemoyen;
					min2 = mingr.agemoyen;
				}
			}
			else
			{	max2 = maxgr.agemoyen;
				min2 = mingr.agemoyen;
			}
			break;
		case 3:
			for (i16=0;i16<imax;i16++)
				if (tab_suivi[i16].couples >= 0)
				{	extrait[jmax] = tab_suivi[i16].couples;
					if (date1 == "") date1 = tab_suivi[i16].date;
					dategr[jmax] = tab_suivi[i16].date;
					date2 = dategr[jmax];
					jmax++;
				}
			if (jmax - 1 > nb_points)
			{	if (typerepartition == 2)
				{	deb = jmax - nb_points;
					for (i16=deb;i16<=jmax;i16++)
					{	if (i16 == deb) { min2 = extrait[i16]; max2 = extrait[i16]; date1 = dategr[i16]; }
						else
						{	if (extrait[i16] < min2) min2 = extrait[i16];
							if (extrait[i16] > max2) max2 = extrait[i16];
						}
					}
					jmax = nb_points;
				}
				else if (typerepartition == 1)
				{	pas = (jmax - 1)/ (nb_points - 1);
					for (i16=0;i16<nb_points;i16++)
					{	if (i16 == 0) { min2 = extrait[i16]; max2 = extrait[i16]; }
						else
						{	if (extrait[Math.floor(i16*pas)] < min2) min2 = extrait[Math.floor(i16*pas)];
							if (extrait[Math.floor(i16*pas)] > max2) max2 = extrait[Math.floor(i16*pas)];
						}
					}
					jmax = nb_points;
				}
				else
				{	max2 = maxgr.couples;
					min2 = mingr.couples;
				}
			}
			else
			{	max2 = maxgr.couples;
				min2 = mingr.couples;
			}
			break;
		case 4:
			for (i16=0;i16<imax;i16++)
				if (tab_suivi[i16].valeurT >= 0)
				{	extrait[jmax] = tab_suivi[i16].valeurT;
					if (date1 == "") date1 = tab_suivi[i16].date;
					dategr[jmax] = tab_suivi[i16].date;
					date2 = dategr[jmax];
					jmax++;
				}
			if (jmax - 1 > nb_points)
			{	if (typerepartition == 2)
				{	deb = jmax - nb_points;
					for (i16=deb;i16<=jmax;i16++)
					{	if (i16 == deb) { min2 = extrait[i16]; max2 = extrait[i16]; date1 = dategr[i16]; }
						else
						{	if (extrait[i16] < min2) min2 = extrait[i16];
							if (extrait[i16] > max2) max2 = extrait[i16];
						}
					}
					jmax = nb_points;
				}
				else if (typerepartition == 1)
				{	pas = (jmax - 1)/ (nb_points - 1);
					for (i16=0;i16<nb_points;i16++)
					{	if (i16 == 0) { min2 = extrait[i16]; max2 = extrait[i16]; }
						else
						{	if (extrait[Math.floor(i16*pas)] < min2) min2 = extrait[Math.floor(i16*pas)];
							if (extrait[Math.floor(i16*pas)] > max2) max2 = extrait[Math.floor(i16*pas)];
						}
					}
					jmax = nb_points;
				}
				else
				{	max2 = maxgr.valeurT;
					min2 = mingr.valeurT;
				}
			}
			else
			{	max2 = maxgr.valeurT;
				min2 = mingr.valeurT;
			}
			break;
		case 5:
			for (i16=0;i16<imax;i16++)
				if (tab_suivi[i16].nb >= 0)
				{	extrait[jmax] = tab_suivi[i16].nb;
					extrait2[jmax] = tab_suivi[i16].nb_th;
					if (date1 == "") date1 = tab_suivi[i16].date;
					dategr[jmax] = tab_suivi[i16].date;
					date2 = dategr[jmax];
					jmax++;
				}
			if (jmax - 1 > nb_points)
			{	if (typerepartition == 2)
				{	deb = jmax - nb_points;
					for (i16=deb;i16<=jmax;i16++)
					{	if (i16 == deb) { min2 = extrait[i16]; max2 = extrait[i16]; date1 = dategr[i16]; }
						else
						{	if (extrait[i16] < min2) min2 = extrait[i16];
							if (extrait[i16] > max2) max2 = extrait[i16];
						}
						if (extrait2[i16] > 0 && extrait2[i16] < min2) min2 = extrait2[i16];
						if (extrait2[i16] > max2) max2 = extrait2[i16];
					}
					jmax = nb_points;
				}
				else if (typerepartition == 1)
				{	pas = (jmax - 1)/ (nb_points - 1);
					for (i16=0;i16<nb_points;i16++)
					{	if (i16 == 0) { min2 = extrait[i16]; max2 = extrait[i16]; }
						else
						{	if (extrait[Math.floor(i16*pas)] < min2) min2 = extrait[Math.floor(i16*pas)];
							if (extrait[Math.floor(i16*pas)] > max2) max2 = extrait[Math.floor(i16*pas)];
						}
						if (extrait2[Math.floor(i16*pas)] > 0 && extrait2[Math.floor(i16*pas)] < min2) min2 = extrait2[Math.floor(i16*pas)];
						if (extrait2[Math.floor(i16*pas)] > max2) max2 = extrait2[Math.floor(i16*pas)];
					}
					jmax = nb_points;
				}
				else
				{	max2 = Math.max(maxgr.nb, maxgr.nb_th);
					min2 = Math.min(mingr.nb, mingr.nb_th);
				}
			}
			else
			{	max2 = Math.max(maxgr.nb, maxgr.nb_th);
				min2 = Math.min(mingr.nb, mingr.nb_th);
			}
			break;
		case 6:
			for (i16=0;i16<imax;i16++)
				if (tab_suivi[i16].males >= 0)
				{	extrait[jmax] = tab_suivi[i16].males;
					extrait2[jmax] = tab_suivi[i16].femelles;
					if (date1 == "") date1 = tab_suivi[i16].date;
					dategr[jmax] = tab_suivi[i16].date;
					date2 = dategr[jmax];
					jmax++;
				}
			if (jmax - 1 > nb_points)
			{	if (typerepartition == 2)
				{	deb = jmax - nb_points;
					for (i16=deb;i16<=jmax;i16++)
					{	if (i16 == deb) { min2 = extrait[i16]; max2 = extrait[i16]; date1 = dategr[i16]; }
						else
						{	if (extrait[i16] < min2) min2 = extrait[i16];
							if (extrait[i16] > max2) max2 = extrait[i16];
						}
						if (extrait2[i16] < min2) min2 = extrait2[i16];
						if (extrait2[i16] > max2) max2 = extrait2[i16];
					}
					jmax = nb_points;
				}
				else if (typerepartition == 1)
				{	pas = (jmax - 1)/ (nb_points - 1);
					for (i16=0;i16<nb_points;i16++)
					{	if (i16 == 0) { min2 = extrait[i16]; max2 = extrait[i16]; }
						else
						{	if (extrait[Math.floor(i16*pas)] < min2) min2 = extrait[Math.floor(i16*pas)];
							if (extrait[Math.floor(i16*pas)] > max2) max2 = extrait[Math.floor(i16*pas)];
						}
						if (extrait2[Math.floor(i16*pas)] < min2) min2 = extrait2[Math.floor(i16*pas)];
						if (extrait2[Math.floor(i16*pas)] > max2) max2 = extrait2[Math.floor(i16*pas)];
					}
					jmax = nb_points;
				}
				else
				{	max2 = Math.max(maxgr.males, maxgr.femelles);
					min2 = Math.min(mingr.males, mingr.femelles);
				}
			}
			else
			{	max2 = Math.max(maxgr.males, maxgr.femelles);
				min2 = Math.min(mingr.males, mingr.femelles);
			}
			break;
		case 7:
			for (i16=0;i16<imax;i16++)
				if (tab_suivi[i16].valeur >= 0)
				{	extrait[jmax] = tab_suivi[i16].valeur;
					extrait2[jmax] = tab_suivi[i16].valeur_th;
					if (date1 == "") date1 = tab_suivi[i16].date;
					dategr[jmax] = tab_suivi[i16].date;
					date2 = dategr[jmax];
					jmax++;
				}
			if (jmax - 1 > nb_points)
			{	if (typerepartition == 2)
				{	deb = jmax - nb_points;
					for (i16=deb;i16<=jmax;i16++)
					{	if (i16 == deb) { min2 = extrait[i16]; max2 = extrait[i16]; date1 = dategr[i16]; }
						else
						{	if (extrait[i16] < min2) min2 = extrait[i16];
							if (extrait[i16] > max2) max2 = extrait[i16];
						}
						if (extrait2[i16] > 0 && extrait2[i16] < min2) min2 = extrait2[i16];
						if (extrait2[i16] > max2) max2 = extrait2[i16];
					}
					jmax = nb_points;
				}
				else if (typerepartition == 1)
				{	pas = (jmax - 1)/ (nb_points - 1);
					for (i16=0;i16<nb_points;i16++)
					{	if (i16 == 0) { min2 = extrait[i16]; max2 = extrait[i16]; }
						else
						{	if (extrait[Math.floor(i16*pas)] < min2) min2 = extrait[Math.floor(i16*pas)];
							if (extrait[Math.floor(i16*pas)] > max2) max2 = extrait[Math.floor(i16*pas)];
						}
						if (extrait2[Math.floor(i16*pas)] > 0 && extrait2[Math.floor(i16*pas)] < min2) min2 = extrait2[Math.floor(i16*pas)];
						if (extrait2[Math.floor(i16*pas)] > max2) max2 = extrait2[Math.floor(i16*pas)];
					}
					jmax = nb_points;
				}
				else
				{	max2 = Math.max(maxgr.valeur, maxgr.valeur_th);
					min2 = Math.min(mingr.valeur, mingr.valeur_th);
				}
			}
			else
			{	max2 = Math.max(maxgr.valeur, maxgr.valeur_th);
				min2 = Math.min(mingr.valeur, mingr.valeur_th);
			}
			break;
		case 8:
			for (i16=0;i16<imax;i16++)
				if (tab_suivi[i16].moyenne >= 0)
				{	extrait[jmax] = tab_suivi[i16].moyenne;
					extrait2[jmax] = tab_suivi[i16].moyenne_th;
					if (date1 == "") date1 = tab_suivi[i16].date;
					dategr[jmax] = tab_suivi[i16].date;
					date2 = dategr[jmax];
					jmax++;
				}
			if (jmax - 1 > nb_points)
			{	if (typerepartition == 2)
				{	deb = jmax - nb_points;
					for (i16=deb;i16<=jmax;i16++)
					{	if (i16 == deb) { min2 = extrait[i16]; max2 = extrait[i16]; date1 = dategr[i16]; }
						else
						{	if (extrait[i16] < min2) min2 = extrait[i16];
							if (extrait[i16] > max2) max2 = extrait[i16];
						}
						if (extrait2[i16] > 0 && extrait2[i16] < min2) min2 = extrait2[i16];
						if (extrait2[i16] > max2) max2 = extrait2[i16];
					}
					jmax = nb_points;
				}
				else if (typerepartition == 1)
				{	pas = (jmax - 1)/ (nb_points - 1);
					for (i16=0;i16<nb_points;i16++)
					{	if (i16 == 0) { min2 = extrait[i16]; max2 = extrait[i16]; }
						else
						{	if (extrait[Math.floor(i16*pas)] < min2) min2 = extrait[Math.floor(i16*pas)];
							if (extrait[Math.floor(i16*pas)] > max2) max2 = extrait[Math.floor(i16*pas)];
						}
						if (extrait2[Math.floor(i16*pas)] > 0 && extrait2[Math.floor(i16*pas)] < min2) min2 = extrait2[Math.floor(i16*pas)];
						if (extrait2[Math.floor(i16*pas)] > max2) max2 = extrait2[Math.floor(i16*pas)];
					}
					jmax = nb_points;
				}
				else
				{	max2 = Math.max(maxgr.moyenne, maxgr.moyenne_th);
					min2 = Math.min(mingr.moyenne, mingr.moyenne_th);
				}
			}
			else
			{	max2 = Math.max(maxgr.moyenne, maxgr.moyenne_th);
				min2 = Math.min(mingr.moyenne, mingr.moyenne_th);
			}
			if (min2 == -1) min2 = 0;
			break;
		case 9:
			for (i16=0;i16<imaxav;i16++)
				if (tab_suiviav[i16].totachats >= 0)
				{	extrait[jmax] = tab_suiviav[i16].totachats;
					extrait2[jmax] = tab_suiviav[i16].totventes;
					if (date1 == "") date1 = tab_suiviav[i16].date;
					dategr[jmax] = tab_suiviav[i16].date;
					date2 = dategr[jmax];
					jmax++;
				}
			if (jmax - 1 > nb_points)
			{	if (typerepartition == 2)
				{	deb = jmax - nb_points;
					for (i16=deb;i16<=jmax;i16++)
					{	if (i16 == deb) { min2 = extrait[i16]; max2 = extrait[i16]; date1 = dategr[i16]; }
						else
						{	if (extrait[i16] < min2) min2 = extrait[i16];
							if (extrait[i16] > max2) max2 = extrait[i16];
						}
						if (extrait2[i16] < min2) min2 = extrait2[i16];
						if (extrait2[i16] > max2) max2 = extrait2[i16];
					}
					jmax = nb_points;
				}
				else if (typerepartition == 1)
				{	pas = (jmax - 1)/ (nb_points - 1);
					for (i16=0;i16<nb_points;i16++)
					{	if (i16 == 0) { min2 = extrait[i16]; max2 = extrait[i16]; }
						else
						{	if (extrait[Math.floor(i16*pas)] < min2) min2 = extrait[Math.floor(i16*pas)];
							if (extrait[Math.floor(i16*pas)] > max2) max2 = extrait[Math.floor(i16*pas)];
						}
						if (extrait2[Math.floor(i16*pas)] < min2) min2 = extrait2[Math.floor(i16*pas)];
						if (extrait2[Math.floor(i16*pas)] > max2) max2 = extrait2[Math.floor(i16*pas)];
					}
					jmax = nb_points;
				}
				else
				{	max2 = Math.max(maxgrav.totachats, maxgrav.totventes);
					min2 = Math.min(mingrav.totachats, mingrav.totventes);
				}
			}
			else
			{	max2 = Math.max(maxgrav.totachats, maxgrav.totventes);
				min2 = Math.min(mingrav.totachats, mingrav.totventes);
			}
			break;
		case 10:
			for (i16=0;i16<imaxcl;i16++)
				if (tab_suivicl[i16].pts >= 0)
				{	extrait[jmax] = tab_suivicl[i16].pts;
					if (date1 == "") date1 = tab_suivicl[i16].date;
					dategr[jmax] = tab_suivicl[i16].date;
					date2 = dategr[jmax];
					jmax++;
				}
			if (jmax - 1 > nb_points)
			{	if (typerepartition == 2)
				{	deb = jmax - nb_points;
					for (i16=deb;i16<=jmax;i16++)
					{	if (i16 == deb) { min2 = extrait[i16]; max2 = extrait[i16]; date1 = dategr[i16]; }
						else
						{	if (extrait[i16] < min2) min2 = extrait[i16];
							if (extrait[i16] > max2) max2 = extrait[i16];
						}
					}
					jmax = nb_points;
				}
				else if (typerepartition == 1)
				{	pas = (jmax - 1)/ (nb_points - 1);
					for (i16=0;i16<nb_points;i16++)
					{	if (i16 == 0) { min2 = extrait[i16]; max2 = extrait[i16]; }
						else
						{	if (extrait[Math.floor(i16*pas)] < min2) min2 = extrait[Math.floor(i16*pas)];
							if (extrait[Math.floor(i16*pas)] > max2) max2 = extrait[Math.floor(i16*pas)];
						}
					}
					jmax = nb_points;
				}
				else
				{	max2 = maxgrcl.pts;
					min2 = mingrcl.pts;
				}
			}
			else
			{	max2 = maxgrcl.pts;
				min2 = mingrcl.pts;
			}
			break;
		case 11:
			for (i16=0;i16<imaxcl;i16++)
				if (tab_suivicl[i16].clpts >= 0)
				{	extrait[jmax] = 0-tab_suivicl[i16].clpts;
					if (date1 == "") date1 = tab_suivicl[i16].date;
					dategr[jmax] = tab_suivicl[i16].date;
					date2 = dategr[jmax];
					jmax++;
				}
			if (jmax - 1 > nb_points)
			{	if (typerepartition == 2)
				{	deb = jmax - nb_points;
					for (i16=deb;i16<=jmax;i16++)
					{	if (i16 == deb) { min2 = extrait[i16]; max2 = extrait[i16]; date1 = dategr[i16]; }
						else
						{	if (extrait[i16] < min2) min2 = extrait[i16];
							if (extrait[i16] > max2) max2 = extrait[i16];
						}
					}
					jmax = nb_points;
				}
				else if (typerepartition == 1)
				{	pas = (jmax - 1)/ (nb_points - 1);
					for (i16=0;i16<nb_points;i16++)
					{	if (i16 == 0) { min2 = extrait[i16]; max2 = extrait[i16]; }
						else
						{	if (extrait[Math.floor(i16*pas)] < min2) min2 = extrait[Math.floor(i16*pas)];
							if (extrait[Math.floor(i16*pas)] > max2) max2 = extrait[Math.floor(i16*pas)];
						}
					}
					jmax = nb_points;
				}
				else
				{	max2 = 0-maxgrcl.clpts;
					min2 = 0-mingrcl.clpts;
				}
			}
			else
			{	max2 = 0-maxgrcl.clpts;
				min2 = 0-mingrcl.clpts;
			}
			break;
		case 12:
			for (i16=0;i16<imaxcl;i16++)
				if (tab_suivicl[i16].pr >= 0)
				{	extrait[jmax] = tab_suivicl[i16].pr;
					if (date1 == "") date1 = tab_suivicl[i16].date;
					dategr[jmax] = tab_suivicl[i16].date;
					date2 = dategr[jmax];
					jmax++;
				}
			if (jmax - 1 > nb_points)
			{	if (typerepartition == 2)
				{	deb = jmax - nb_points;
					for (i16=deb;i16<=jmax;i16++)
					{	if (i16 == deb) { min2 = extrait[i16]; max2 = extrait[i16]; date1 = dategr[i16]; }
						else
						{	if (extrait[i16] < min2) min2 = extrait[i16];
							if (extrait[i16] > max2) max2 = extrait[i16];
						}
					}
					jmax = nb_points;
				}
				else if (typerepartition == 1)
				{	pas = (jmax - 1)/ (nb_points - 1);
					for (i16=0;i16<nb_points;i16++)
					{	if (i16 == 0) { min2 = extrait[i16]; max2 = extrait[i16]; }
						else
						{	if (extrait[Math.floor(i16*pas)] < min2) min2 = extrait[Math.floor(i16*pas)];
							if (extrait[Math.floor(i16*pas)] > max2) max2 = extrait[Math.floor(i16*pas)];
						}
					}
					jmax = nb_points;
				}
				else
				{	max2 = maxgrcl.pr;
					min2 = mingrcl.pr;
				}
			}
			else
			{	max2 = maxgrcl.pr;
				min2 = mingrcl.pr;
			}
			break;
		case 13:
			for (i16=0;i16<imaxcl;i16++)
				if (tab_suivicl[i16].clpr >= 0)
				{	extrait[jmax] = 0-tab_suivicl[i16].clpr;
					if (date1 == "") date1 = tab_suivicl[i16].date;
					dategr[jmax] = tab_suivicl[i16].date;
					date2 = dategr[jmax];
					jmax++;
				}
			if (jmax - 1 > nb_points)
			{	if (typerepartition == 2)
				{	deb = jmax - nb_points;
					for (i16=deb;i16<=jmax;i16++)
					{	if (i16 == deb) { min2 = extrait[i16]; max2 = extrait[i16]; date1 = dategr[i16]; }
						else
						{	if (extrait[i16] < min2) min2 = extrait[i16];
							if (extrait[i16] > max2) max2 = extrait[i16];
						}
					}
					jmax = nb_points;
				}
				else if (typerepartition == 1)
				{	pas = (jmax - 1)/ (nb_points - 1);
					for (i16=0;i16<nb_points;i16++)
					{	if (i16 == 0) { min2 = extrait[i16]; max2 = extrait[i16]; }
						else
						{	if (extrait[Math.floor(i16*pas)] < min2) min2 = extrait[Math.floor(i16*pas)];
							if (extrait[Math.floor(i16*pas)] > max2) max2 = extrait[Math.floor(i16*pas)];
						}
					}
					jmax = nb_points;
				}
				else
				{	max2 = 0-maxgrcl.clpr;
					min2 = 0-mingrcl.clpr;
				}
			}
			else
			{	max2 = 0-maxgrcl.clpr;
				min2 = 0-mingrcl.clpr;
			}
			break;
		case 14:
			for (i16=0;i16<imaxcl;i16++)
				if (tab_suivicl[i16].team >= 0)
				{	extrait[jmax] = tab_suivicl[i16].team;
					if (date1 == "") date1 = tab_suivicl[i16].date;
					dategr[jmax] = tab_suivicl[i16].date;
					date2 = dategr[jmax];
					jmax++;
				}
			if (jmax - 1 > nb_points)
			{	if (typerepartition == 2)
				{	deb = jmax - nb_points;
					for (i16=deb;i16<=jmax;i16++)
					{	if (i16 == deb) { min2 = extrait[i16]; max2 = extrait[i16]; date1 = dategr[i16]; }
						else
						{	if (extrait[i16] < min2) min2 = extrait[i16];
							if (extrait[i16] > max2) max2 = extrait[i16];
						}
					}
					jmax = nb_points;
				}
				else if (typerepartition == 1)
				{	pas = (jmax - 1)/ (nb_points - 1);
					for (i16=0;i16<nb_points;i16++)
					{	if (i16 == 0) { min2 = extrait[i16]; max2 = extrait[i16]; }
						else
						{	if (extrait[Math.floor(i16*pas)] < min2) min2 = extrait[Math.floor(i16*pas)];
							if (extrait[Math.floor(i16*pas)] > max2) max2 = extrait[Math.floor(i16*pas)];
						}
					}
					jmax = nb_points;
				}
				else
				{	max2 = maxgrcl.team;
					min2 = mingrcl.team;
				}
			}
			else
			{	max2 = maxgrcl.team;
				min2 = mingrcl.team;
			}
			break;
		case 15:
			for (i16=0;i16<imaxcl;i16++)
				if (tab_suivicl[i16].clte >= 0)
				{	extrait[jmax] = 0-tab_suivicl[i16].clte;
					if (date1 == "") date1 = tab_suivicl[i16].date;
					dategr[jmax] = tab_suivicl[i16].date;
					date2 = dategr[jmax];
					jmax++;
				}
			if (jmax - 1 > nb_points)
			{	if (typerepartition == 2)
				{	deb = jmax - nb_points;
					for (i16=deb;i16<=jmax;i16++)
					{	if (i16 == deb) { min2 = extrait[i16]; max2 = extrait[i16]; date1 = dategr[i16]; }
						else
						{	if (extrait[i16] < min2) min2 = extrait[i16];
							if (extrait[i16] > max2) max2 = extrait[i16];
						}
					}
					jmax = nb_points;
				}
				else if (typerepartition == 1)
				{	pas = (jmax - 1)/ (nb_points - 1);
					for (i16=0;i16<nb_points;i16++)
					{	if (i16 == 0) { min2 = extrait[i16]; max2 = extrait[i16]; }
						else
						{	if (extrait[Math.floor(i16*pas)] < min2) min2 = extrait[Math.floor(i16*pas)];
							if (extrait[Math.floor(i16*pas)] > max2) max2 = extrait[Math.floor(i16*pas)];
						}
					}
					jmax = nb_points;
				}
				else
				{	max2 = 0-maxgrcl.clte;
					min2 = 0-mingrcl.clte;
				}
			}
			else
			{	max2 = 0-maxgrcl.clte;
				min2 = 0-mingrcl.clte;
			}
			break;
		case 16:
			for (i16=0;i16<imaxclm;i16++)
				if (tab_suiviclm[i16].men >= 0)
				{	extrait[jmax] = tab_suiviclm[i16].men;
					if (date1 == "") date1 = tab_suiviclm[i16].date;
					dategr[jmax] = tab_suiviclm[i16].date;
					date2 = dategr[jmax];
					jmax++;
				}
			if (jmax - 1 > nb_points)
			{	if (typerepartition == 2)
				{	deb = jmax - nb_points;
					for (i16=deb;i16<=jmax;i16++)
					{	if (i16 == deb) { min2 = extrait[i16]; max2 = extrait[i16]; date1 = dategr[i16]; }
						else
						{	if (extrait[i16] < min2) min2 = extrait[i16];
							if (extrait[i16] > max2) max2 = extrait[i16];
						}
					}
					jmax = nb_points;
				}
				else if (typerepartition == 1)
				{	pas = (jmax - 1)/ (nb_points - 1);
					for (i16=0;i16<nb_points;i16++)
					{	if (i16 == 0) { min2 = extrait[i16]; max2 = extrait[i16]; }
						else
						{	if (extrait[Math.floor(i16*pas)] < min2) min2 = extrait[Math.floor(i16*pas)];
							if (extrait[Math.floor(i16*pas)] > max2) max2 = extrait[Math.floor(i16*pas)];
						}
					}
					jmax = nb_points;
				}
				else
				{	max2 = maxgrclm.men;
					min2 = mingrclm.men;
				}
			}
			else
			{	max2 = maxgrclm.men;
				min2 = mingrclm.men;
			}
			break;
		case 17:
			for (i16=0;i16<imaxclm;i16++)
				if (tab_suiviclm[i16].clmen >= 0)
				{	extrait[jmax] = 0-tab_suiviclm[i16].clmen;
					if (date1 == "") date1 = tab_suiviclm[i16].date;
					dategr[jmax] = tab_suiviclm[i16].date;
					date2 = dategr[jmax];
					jmax++;
				}
			if (jmax - 1 > nb_points)
			{	if (typerepartition == 2)
				{	deb = jmax - nb_points;
					for (i16=deb;i16<=jmax;i16++)
					{	if (i16 == deb) { min2 = extrait[i16]; max2 = extrait[i16]; date1 = dategr[i16]; }
						else
						{	if (extrait[i16] < min2) min2 = extrait[i16];
							if (extrait[i16] > max2) max2 = extrait[i16];
						}
					}
					jmax = nb_points;
				}
				else if (typerepartition == 1)
				{	pas = (jmax - 1)/ (nb_points - 1);
					for (i16=0;i16<nb_points;i16++)
					{	if (i16 == 0) { min2 = extrait[i16]; max2 = extrait[i16]; }
						else
						{	if (extrait[Math.floor(i16*pas)] < min2) min2 = extrait[Math.floor(i16*pas)];
							if (extrait[Math.floor(i16*pas)] > max2) max2 = extrait[Math.floor(i16*pas)];
						}
					}
					jmax = nb_points;
				}
				else
				{	max2 = 0-maxgrclm.clmen;
					min2 = 0-mingrclm.clmen;
				}
			}
			else
			{	max2 = 0-maxgrclm.clmen;
				min2 = 0-mingrclm.clmen;
			}
			break;
	}
	i16min = Math.floor((0 - deb)/pas);
	jscr = jmax;
	stopscr = false;
	for (j=0;j<jmax;j++) moyenne[j] = 0;
	for (j=0;j<jmax;j++)
	{	for (i16=Math.max(i16min,j-14);i16<=j;i16++) moyenne[j] += extrait[Math.floor(deb+i16*pas)];
		if (iclic == 14) moyenne[j] = Math.round(1000 * moyenne[j] / (i16 - Math.max(i16min,j-14))) / 1000;
		else if (iclic == 2 || iclic == 5 || iclic == 6 || iclic == 12) moyenne[j] = Math.round(100 * moyenne[j] / (i16 - Math.max(i16min,j-14))) / 100;
		else if (iclic == 1 || iclic == 3) moyenne[j] = Math.round(10 * moyenne[j] / (i16 - Math.max(i16min,j-14))) / 10;
		else moyenne[j] = Math.round(moyenne[j] / (i16 - Math.max(i16min,j-14)));
		if (moyenne[j] < min2) min2 = moyenne[j];
		if (moyenne[j] > max2) max2 = moyenne[j];
	}
	if (iclic == 6 || iclic == 9)
	{	moyenne2 = new Array();
		for (j=0;j<jmax;j++) moyenne2[j] = 0;
		for (j=0;j<jmax;j++)
		{	for (i16=Math.max(i16min,j-14);i16<=j;i16++) moyenne2[j] += extrait2[Math.floor(deb+i16*pas)];
			if (iclic == 6) moyenne2[j] = Math.round(100 * moyenne2[j] / (i16 - Math.max(i16min,j-14))) / 100;
			else moyenne2[j] = Math.round(moyenne2[j] / (i16 - Math.max(i16min,j-14)));
			if (moyenne2[j] < min2) min2 = moyenne2[j];
			if (moyenne2[j] > max2) max2 = moyenne2[j];
		}
	}
	if (min2 == max2) { min2 += -1; max2 += 1; min2 = parseInt(min2*1000)/1000; }
	hy = max2 - min2;
	afmax2 = jmax == 0 ? "?&nbsp;" : millier(max2).replace(" ","&nbsp;","g");
	afmin2 = jmax == 0 ? "?&nbsp;" : millier(min2).replace(" ","&nbsp;","g");
	if (iclic == 11 || iclic == 13 || iclic == 15 || iclic == 17)
	{	afmax2 = afmax2.replace("-", "");
		afmax2 += "e";
		afmin2 = afmin2.replace("-", "");
		afmin2 += "e";
	}
	$("caseMAX").innerHTML = afmax2 + "&nbsp;-";
	$("caseMIN").innerHTML = afmin2 + "&nbsp;-";;
	$("caseMIN").style.height = "1px";
	$("caseMAX").style.width = "0px";
	$("casegrapheaffiche").style.width = largeurgraphique - $("caseMAX").clientWidth + "px";
	$("casecadre").innerHTML = "";
	$("casegrapheaffiche").scrollLeft = 0;
	if (nb_points > jmax) nb_points = jmax;
	if (nb_points > 1) pasx = (largeurgraphique - $("caseMAX").clientWidth-12)/(nb_points-1);
	else pasx = largeurgraphique - $("caseMAX").clientWidth - 12;
	hauteurgraphique = jmax <= nb_points ? hauteurgraphique2 : hauteurgraphique1;
	$("casegraphetotal").style.height = hauteurgraphique + 16 + "px";
	$("caseMAX").style.height = hauteurgraphique + 1 + "px";
	if (jmax == 0) txt = "Aucun point à afficher";
	else if (jmax == 1) txt = "1 seul point existant";
	else if (typerepartition == 1) txt = jmax + " points équitablement répartis.";
	else if (typerepartition == 2) txt = "Les " + jmax + " derniers points.";
	else txt = "Tous les " + jmax + " points."
	if (jmax > 1)
	{	var nbpts = 15;
		if (jmax < 15) nbpts = jmax;
		if (iclic != 6 && iclic != 9)
			txt += "<br>En orange, moyenne glissante des " + nbpts + " derniers points."
		else if (iclic == 6)
		{	txt += "<br>En orange (mâles) et en bleu ciel (femelles), moyenne glissante des " + nbpts + " derniers points."
			$("titre_trace").setAttribute("style", "color:#B86242;font-weight:bold;font-size:12px");
		}
		else
		{	txt += "<br>En orange (achats) et en bleu ciel (ventes), moyenne glissante des " + nbpts + " derniers points."
			$("titre_trace").setAttribute("style", "color:#B86242;font-weight:bold;font-size:12px");
		}
	}
	$("titre_trace").innerHTML = txt;
	var bdivinfo = $("divinfo");
	bdivinfo.innerHTML = "";
	XX = 5;
	YY = 11;
	scrOui = true;
	$("casegraphetotal").innerHTML = (typerepartition == 3 && jmax > nb_points ? tracegraphe(jmax - nb_points, jmax - 1, true) : tracegraphe(0, jmax - 1));
	var bdivG1 = $("divG1");
	var bdivD1 = $("divD1");
	var bdivG2 = $("divG2");
	var bdivD2 = $("divD2");
	var posxgr = positionX($("casegrapheaffiche")) - positionX($c("content_site")[0]);
	var posygr = positionY($("casegrapheaffiche")) - positionY($c("content_site")[0]) + $("casegraphetotal").clientHeight;
	posygr += typerepartition == 3 && jmax > nb_points ? 22 : 0;
	bdivG1.style.top = posygr + "px";
	bdivD1.style.top = posygr + "px";
	bdivG2.style.top = posygr + 13 + "px";
	bdivD2.style.top = posygr + 13 + "px";
	bdivinfo.style.top = posygr + 8 + "px";
	var droite = typerepartition == 3 && $("casegrapheaffiche").clientWidth != $("casegrapheaffiche").scrollWidth ? 5 : jmax > 1 ? (jmax - 1)*pasx + 5 : pasx + 5;
	var xdroite = jmax > 1 ? Math.max(0, Math.floor(0.5 + ((droite - 6) / pasx))) : 0;
	bdivG1.style.left = posxgr + 6 +"px";
	bdivD1.style.left = posxgr + droite + "px";
	bdivG2.style.left = posxgr + 2 +"px";
	if (typerepartition != 3 || $("casegrapheaffiche").clientWidth == $("casegrapheaffiche").scrollWidth)
	{	bdivG2.innerHTML = date1;
		bdivD2.innerHTML = jmax > 0 ? dategr[Math.floor(deb+xdroite*pas)] : "";
	}
	bdivD2.style.left = posxgr + droite + 6 - bdivD2.clientWidth + "px";
	bdivinfo.style.left = posxgr + bdivG2.clientWidth + 12 + "px";
	bdivinfo.style.width = $("casegrapheaffiche").clientWidth - bdivG2.clientWidth - bdivD2.clientWidth - 20 + "px";
	$("casecadre").innerHTML = "<div style=\"position:absolute;border:1px solid #000;top:0px;left:0px;width:" + ($("casegrapheaffiche").scrollWidth-2) +
		"px;height:" + $("casegraphetotal").clientHeight + "px\">&nbsp;</div>";
	scrMax = 0;
	if (typerepartition == 3 && $("casegrapheaffiche").clientWidth != $("casegrapheaffiche").scrollWidth)
		$("casegrapheaffiche").scrollLeft = $("casegrapheaffiche").scrollWidth;
	else
		soustitre(0, xdroite);
}

function tracegraphe(j0, j1, trace1)
{
	var txt = "", j, x1, x2, y1, y2;
	var min2, afmax2, afmin2;
	if (jmax > 1)
	{	if (typerepartition == 3)
		{	for (j=j0;j<j1+1;j++)
			{	if (j == j0) { min2 = extrait[Math.floor(deb+j*pas)]; max2 = min2; }
				else
				{	if (extrait[Math.floor(deb+j*pas)] < min2) min2 = extrait[Math.floor(deb+j*pas)];
					if (extrait[Math.floor(deb+j*pas)] > max2) max2 = extrait[Math.floor(deb+j*pas)];
				}
				if (moyenne[j] < min2) min2 = moyenne[j];
				if (moyenne[j] > max2) max2 = moyenne[j];
				if (iclic > 4 && iclic < 10)
				{	if (extrait2[Math.floor(deb+j*pas)] < min2) min2 = extrait2[Math.floor(deb+j*pas)];
					if (extrait2[Math.floor(deb+j*pas)] > max2) max2 = extrait2[Math.floor(deb+j*pas)];
				}
				if (iclic == 6 || iclic == 9)
				{	if (moyenne2[Math.floor(deb+j*pas)] < min2) min2 = moyenne2[Math.floor(deb+j*pas)];
					if (moyenne2[Math.floor(deb+j*pas)] > max2) max2 = moyenne2[Math.floor(deb+j*pas)];
				}
			}
			if (max2 == min2) { max2 += 1; min2 += -1; min2 = parseInt(min2*1000)/1000; }
			hy = max2 - min2;
			afmax2 = millier(max2).replace(" ","&nbsp;","g");
			afmin2 = millier(min2).replace(" ","&nbsp;","g");
			if (iclic == 11 || iclic == 13 || iclic == 15 || iclic == 17)
			{	afmax2 = afmax2.replace("-", "");
				afmax2 += "e";
				afmin2 = afmin2.replace("-", "");
				afmin2 += "e";
			}
			$("caseMAX").innerHTML = afmax2 + "&nbsp;-";
			$("caseMIN").innerHTML = afmin2 + "&nbsp;-";
			$("caseMIN").style.height = "1px";
			$("caseMAX").style.width = "0px";
			$("casegrapheaffiche").style.width = largeurgraphique - $("caseMAX").clientWidth + "px";
			if (!trace1)
			{	if (nb_points > 1) pasx = (largeurgraphique - $("caseMAX").clientWidth - 10)/(nb_points-1);
				else pasx = largeurgraphique - $("caseMAX").clientWidth - 10;
				XX = $("casegrapheaffiche").scrollLeft + 5 - j0*pasx;
			}
		}
		if (!trace1)
		{	for (j=j0;j<j1;j++)
			{	x1 = XX+j*pasx;
				y1 = YY + hauteurgraphique*(max2-extrait[Math.floor(deb+j*pas)])/hy;
				x2 = XX+(j+1)*pasx;
				y2 = YY+hauteurgraphique*(max2-extrait[Math.floor(deb+(j+1)*pas)])/hy;
				txt += DrawLine(x1,y1,x2,y2,"#B86242");
				x1 = XX+j*pasx;
				y1 = YY+hauteurgraphique*(max2-moyenne[j])/hy;
				x2 = XX+(j+1)*pasx;
				y2 = YY+hauteurgraphique*(max2-moyenne[j+1])/hy;
				txt += DrawLine(x1,y1,x2,y2,"#E2AD13");
				if (extrait2.length > 0)
				{	if (iclic != 6 && iclic != 9)
					{	if (extrait2[Math.floor(deb+j*pas)] > 0 && extrait2[Math.floor(deb+(j+1)*pas)] > 0)
						{	x1 = XX+j*pasx;
							y1 = YY+hauteurgraphique*(max2-extrait2[Math.floor(deb+j*pas)])/hy;
							x2 = XX+(j+1)*pasx;
							y2 = YY+hauteurgraphique*(max2-extrait2[Math.floor(deb+(j+1)*pas)])/hy;
							txt += DrawLine(x1,y1,x2,y2,"#2732c7");
						}
					}
					else
					{	if (extrait2[Math.floor(deb+j*pas)] >= 0 && extrait2[Math.floor(deb+(j+1)*pas)] >= 0)
						{	x1 = XX+j*pasx;
							y1 = YY+hauteurgraphique*(max2-extrait2[Math.floor(deb+j*pas)])/hy;
							x2 = XX+(j+1)*pasx;
							y2 = YY+hauteurgraphique*(max2-extrait2[Math.floor(deb+(j+1)*pas)])/hy;
							txt += DrawLine(x1,y1,x2,y2,"#2732c7");
						}
						x1 = XX+j*pasx;
						y1 = YY+hauteurgraphique*(max2-moyenne2[j])/hy;
						x2 = XX+(j+1)*pasx;
						y2 = YY+hauteurgraphique*(max2-moyenne2[j+1])/hy;
						txt += DrawLine(x1,y1,x2,y2,"#19D5D4");
					}
				}
			}
		}
	}
	else if (jmax == 1)
	{	x1 = XX;
		y1 = YY+hauteurgraphique*(max2-extrait[Math.floor(deb)])/hy;
		x2 = XX+pasx;
		y2 = y1;
		txt += DrawLine(x1,y1,x2,y2,"#B86242");
		if (extrait2.length > 0)
		{	if (extrait2[Math.floor(deb)] > 0)
			{	x1 = XX;
				y1 = YY+hauteurgraphique*(max2-extrait2[Math.floor(deb)])/hy;
				x2 = XX+pasx;
				y2 = y1;
				txt += DrawLine(x1,y1,x2,y2,"#2732c7");
			}
		}
	}
	oldScr = $("casegrapheaffiche").scrollLeft;
	return txt + "<div style=\"font-size:3px;width:3px;height:1px;position:absolute;top:0px;left:" + (5+(jmax-1)*pasx) +
		"px\">&nbsp;</div>";
}

function soustitre(p1, p2)
{
	if (jmax > 1)
	{	if (iclic < 5 || iclic > 9)
		{	if (extrait[Math.floor(deb+p1*pas)] != 0)
			{	var pourcent = 100 * (extrait[Math.floor(deb+p2*pas)] - extrait[Math.floor(deb+p1*pas)]) / extrait[Math.floor(deb+p1*pas)];
				pourcent = Math.round(10 * pourcent) / 10;
				if (pourcent >= 0) $("divinfo").innerHTML = "Progression entre ces 2 dates :<br>+ " + millier(pourcent) + "&nbsp;%";
				else
				{	pourcent = 0 - pourcent;
					$("divinfo").innerHTML = "Progression entre ces 2 dates :<br>- " + millier(pourcent) + "&nbsp;%";
				}
			}
			else $("divinfo").innerHTML = "Progression entre ces 2 dates : calcul impossible";
		}
		else
		{	var totreel = 0, totth = 0, type, debut, j, sst = "", txtprct = "";
			for (j=p1;j<=p2;j++) { totreel += extrait[Math.floor(deb+j*pas)]; totth += extrait2[Math.floor(deb+j*pas)]; }
			var ecartmoy = (totreel - totth) / (p2 + 1 - p1);
			ecartmoy = iclic < 7 ? Math.round(100 * ecartmoy) / 100 : Math.round(ecartmoy);
			switch(iclic)
			{	case 5 : type = " naissance"; if (Math.abs(ecartmoy) > 1) sst = "s"; break;
				case 6 : type = " naissance"; if (Math.abs(ecartmoy) > 1) sst = "s"; break;
				default : type = " Zoo'z"
			}
			debut = iclic == 6 ? "Ecart moyen entre mâles et femelles entre ces 2 dates :<br>" : iclic == 9 ? "Ecart moyen entre achats et ventes entre ces 2 dates :<br>" : "Ecart moyen entre réalité et théorie entre ces 2 dates :<br>";
			if (iclic < 9)
			{	if (totth != 0)
				{	var pourcent = 100 * (totreel - totth) / totth;
					pourcent = Math.round(100 * pourcent) / 100;
					if (pourcent >= 0) txtprct = " / + " + millier(pourcent) + " %";
					else { pourcent = 0 - pourcent; txtprct = " / - " + millier(pourcent) + " %"; }
				}
			}
			if (ecartmoy >= 0) $("divinfo").innerHTML = debut + "+ " + millier(ecartmoy) + type + sst + txtprct;
			else
			{	ecartmoy = 0 - ecartmoy;
				$("divinfo").innerHTML = debut + "- " + millier(ecartmoy) + type + sst + txtprct;
			}
		}
	}
}

function suivisouris(e)
{
	var posx = positionX($("casegrapheaffiche"));
	var posy = positionY($("casegrapheaffiche"));
	var sourisX = e.clientX - posx;
	var sourisX1 = sourisX - $("casegrapheaffiche").scrollLeft;
	var sourisX2 = sourisX1 - $("casegrapheaffiche").clientWidth;
	if (typerepartition == 3)
	{	sourisX2 += Math.max(0, 6 - Math.floor(pasx/2));
		sourisX1 += Math.min(0, Math.floor(pasx/2) - 6);
	}
	var sourisY = window.scrollY + e.clientY;
	var sourisY1 = sourisY - posy;
	var sourisY2 = sourisY1 - $("casegraphetotal").clientHeight;
	if (sourisX1 <= 0 || sourisY1 <= 0 || sourisX2 >= 0 || sourisY2 >= 0)
	{	var grexist = $("bullegraphe"), oldgr;
		if (grexist) oldgr = grexist.parentNode.removeChild(grexist);
		grexist = $("traitgraphe");
		if (grexist) oldgr = grexist.parentNode.removeChild(grexist);
	}
	else
	{	var x = Math.max(0, Math.floor(0.5 + ((sourisX - XX - 1) / pasx)));
		if (x > jmax - 1) x = jmax -1;
		var type, qualif = "", type2, type3 = "Moyenne glissante", type4 = "Ecart", ecart, prct;
		type4 += iclic > 4 && iclic < 10 ? " moy gl / th" : "";
		switch (iclic)
		{	case 1 : type = "Nombre d'animaux"; break;
			case 2 : type = "Age moyen"; qualif = " jour"; break;
			case 3 : type = "Nombre de couples adultes"; break;
			case 4 : type = "Valeur réelle"; qualif = " Zoo'z"; break;
			case 5 : type = "Nombre de naissances"; type2 = "Théorie"; break;
			case 6 : type = "Nombre de naissances mâles"; type2 = "Nombre de naissances femelles";
				type3 = "Moyenne glissante mâles"; type4 = "Moyenne glissante femelles"; break;
			case 7 : type = "Valeur des naissances"; qualif = " Zoo'z"; type2 = "Valeur théorique"; break;
			case 8 : type = "Valeur moyenne des naissances"; qualif = " Zoo'z"; type2 = "Valeur moyenne théorique"; break;
			case 9 : type = "Total des achats"; type2 = "Total des ventes"; type3 = "Moyenne glissante achats"; type4 = "Moyenne glissante ventes"; qualif = " Zoo'z"; break;
			case 10 : type = "Nombre de points"; break;
			case 11 : type = "Classement points"; qualif = "e"; break;
			case 12 : type = "Prestige"; qualif = " %"; break;
			case 13 : type = "Classement prestige"; qualif = "e"; break;
			case 14 : type = "Points team"; break;
			case 15 : type = "Classement team"; qualif = "e"; break;
			case 16 : type = "Points mensuel"; break;
			case 17 : type = "Classement mensuel"; qualif = "e";
		}
		var j = Math.floor(deb+x*pas);
		var txt = "Date MAJ : " + dategr[j] + "<br><b>" + type + " : " + millier(extrait[j]).replace("-", "") + qualif;
		if (iclic == 2 && parseFloat(extrait[j]) > 1) txt += "s";
		if ((iclic == 11 || iclic == 13 || iclic == 15 || iclic == 17) && parseInt(extrait[j]) == -1) txt += "r";
		if (iclic != 6 && iclic != 9) txt += "</b>";
		if (iclic > 4 && iclic < 10) txt += "<br>" + type2 + " : " + (extrait2[j] == -1 ? "?" : (millier(extrait2[j]) + qualif));
		if (iclic == 6 || iclic == 9) txt += "</b>";
		txt += "<br>" + type3 + " : " + millier(moyenne[x]).replace("-", "") + qualif;
		if (iclic == 2 && parseFloat(moyenne[x]) > 1) txt += "s";
		if ((iclic == 11 || iclic == 13 || iclic == 15 || iclic == 17) && parseInt(moyenne[j]) == -1) txt += "r";
		ecart = iclic == 6 || iclic == 9 ? moyenne2[x] : iclic > 4 && iclic < 10 ? moyenne[x] - extrait2[j] :
			iclic == 11 || iclic == 13 || iclic == 15 || iclic == 17 ? moyenne[x] - extrait[j] : extrait[j] - moyenne[x];
		if (iclic == 2 || iclic == 5 || iclic == 6 || iclic == 12 || iclic == 14) ecart = Math.round(100 * ecart) / 100;
		else if (iclic == 1 || iclic == 3) ecart = Math.round(10 * ecart) / 10;
		var signe = iclic == 6 || iclic == 9 || ecart == 0 ? "" : ecart > 0 ? "+ " : "- ";
		ecart = Math.abs(ecart);
		if (iclic == 11 || iclic == 13 || iclic == 15 || iclic == 17) qualif = " place";
		txt += "<br>" + type4 +" : " + (extrait2[j] == -1 ? "?" : (signe + millier(ecart) + qualif));
		if ((iclic == 2 || iclic == 11 || iclic == 13 || iclic == 15 || iclic == 17) && Math.abs(ecart) > 1) txt += "s";
		if (iclic != 6 && iclic != 9)
		{	prct = iclic > 4 && iclic < 10 ? 100 * (moyenne[x] - extrait2[j]) /  extrait2[j] : 100 * (extrait[x] - moyenne[j]) /  moyenne[j];
			prct = Math.round(100 * prct) / 100;
			signe = prct == 0 || isNaN(prct) ? "" : prct > 0 ? "+ " : "- ";
			prct = isNaN(prct) ? "% incalculable" : millier(Math.abs(prct)) + " %";
			txt += " / " + (extrait2[j] == -1 ? "?" : (signe + prct));
		}
		var bdiv = $("bullegraphe");
		var bdiv2 = $("traitgraphe");
		if (!bdiv)
		{	bdiv = document.createElement("div");
			bdiv.id = "bullegraphe";
			bdiv.setAttribute("style", "border:1px solid #000;z-index:999;display:block;position:absolute;background-color:#FFFFAA;" +
				"padding:3px;text-align:center;font-family:garamond arial sans serif;font-size:13px;color:#000044");
			document.body.appendChild(bdiv);
			bdiv2 = document.createElement("div");
			bdiv2.id = "traitgraphe";
			bdiv2.setAttribute("style", "border-left:1px solid #000;z-index:999;display:block;position:absolute;width:0px");
			document.body.appendChild(bdiv2);
		}
		bdiv.innerHTML = txt;
		posx += parseInt(XX + x*pasx);
		posy += YY;
		bdiv.style.top = sourisY - bdiv.clientHeight - 5 + "px";
		bdiv.style.left = posx - bdiv.clientWidth + "px";
		bdiv2.style.left = posx + 1 + "px";
		var posgraphe1 = posy + hauteurgraphique*(max2-extrait[j])/hy;
		var posgraphe2 = iclic > 4 && iclic < 10 && extrait2[j] != -1 ? posy + hauteurgraphique*(max2-extrait2[j])/hy : posgraphe1;
		var posgraphe3 = posy + hauteurgraphique*(max2-moyenne[x])/hy;
		var posgraphe4 = iclic == 6 || iclic == 9 ? posy + hauteurgraphique*(max2-moyenne2[x])/hy : posgraphe3;
		var haut = Math.min(posgraphe1, posgraphe2, posgraphe3, posgraphe4);
		var bas = Math.max(posgraphe1, posgraphe2, posgraphe3, posgraphe4);
		//alert(posgraphe1+" "+posgraphe2+" "+posgraphe3+" "+posgraphe4);
		if (sourisY <= haut)
		{	bdiv2.style.top = sourisY - 5 + "px";
			bdiv2.style.height = bas + 5 - sourisY + "px";
		}
		else if (sourisY >= bas)
		{	bdiv2.style.top = haut + "px";
			bdiv2.style.height = sourisY - 5 - haut + "px";
		}
		else
		{	bdiv2.style.top = haut + "px";
			bdiv2.style.height = bas - haut + "px";
		}
	}
}

function suiviscroll(e)
{
	if (scrOui)
	{	scrMax = e.target.scrollWidth - e.target.clientWidth;
		//var suitescr = true;
		var pasScr = scrMax / (jmax-nb_points);
		if (e.target.scrollLeft > oldScr)
		{	if (e.target.scrollLeft - oldScr < pasScr && !stopscr)
			{	e.target.scrollLeft = oldScr + Math.ceil(pasScr);
				if (scrMax - e.target.scrollLeft < pasScr/2) e.target.scrollLeft = scrMax+100;
			}
			//suitescr = false;
			jscr = Math.floor(e.target.scrollLeft * (jmax-nb_points) / scrMax);
		}
		if (e.target.scrollLeft < oldScr)
		{	if (oldScr - e.target.scrollLeft < pasScr && !stopscr)
			{	e.target.scrollLeft = oldScr - pasScr;
				if (e.target.scrollLeft < pasScr) e.target.scrollLeft = 0;
			}
			//suitescr = false;
			jscr = Math.floor(e.target.scrollLeft * (jmax-nb_points) / scrMax);
		}
		//if (suitescr)
		{	var xgauche = scrMax > 0 ? Math.floor(e.target.scrollLeft * (jmax-nb_points) / scrMax) : 0;
			var xdroite = xgauche + nb_points - 1;
			$("casegraphetotal").innerHTML = tracegraphe(xgauche, xdroite);
			if (e.target.scrollWidth - e.target.clientWidth != scrMax)
				{ e.target.scrollLeft = Math.ceil(jscr * (e.target.scrollWidth - e.target.clientWidth) / (jmax-nb_points)); stopscr = true; }
			else stopscr = false;
			var gauche = positionX(e.target) + e.target.scrollLeft - positionX($c("content_site")[0]) + 5;
			var droite = gauche + pasx * (nb_points - 1);
			if (droite == gauche) droite = gauche + pasx;
			$("divG1").style.left = gauche + "px";
			$("divD1").style.left = droite + "px";
			$("divG2").style.left = gauche - 3 + "px";
			$("divG2").innerHTML = dategr[Math.floor(deb+xgauche*pas)] ? dategr[Math.floor(deb+xgauche*pas)] : "";
			$("divD2").innerHTML = dategr[Math.floor(deb+xdroite*pas)];
			$("divD2").style.left = droite + 5 - $("divD2").clientWidth + "px";
			soustitre(xgauche, xdroite);
			$("casecadre").innerHTML = "<div style=\"position:absolute;border:1px solid #000;top:0px;left:0px;width:" + ($("casegrapheaffiche").scrollWidth-2) +
				"px;height:" + $("casegraphetotal").clientHeight + "px\">&nbsp;</div>";
		}
	}
	else
	{	$("divG2").innerHTML = "";
		$("divD2").innerHTML = "";
		$("divinfo").innerHTML = "";
	}
}

function entetef()
{
	var bdiv = $t("div"), i17;
	for (i17=20; i17<bdiv.length;i17++) if (bdiv[i17].attributes[0].value.indexOf("width: 125px") != -1 || bdiv[i17].attributes[0].value.indexOf("width:125px") != -1) break; // 1ère condition pour Firefox 3, 2e pour Firefox 4
	var nom = bdiv[i17].innerHTML;
	var zooz = bdiv[i17+1].innerHTML;
	var visiteurs = bdiv[i17+2].innerHTML;
	var barres = bdiv[i17+3].innerHTML, barrerouge, barrebleue;
	if (bdiv[i17].attributes[0].value.indexOf("width: 125px") != -1)
		barrerouge = barres.substring(barres.indexOf("width")+7,barres.indexOf("%"));
	else
		barrerouge = barres.substring(barres.indexOf("width")+6,barres.indexOf("%"));
	barres = barres.substring(barres.indexOf("%")+1);
	if (bdiv[i17].attributes[0].value.indexOf("width: 125px") != -1)
		barrebleue = barres.substring(barres.indexOf("width")+7,barres.indexOf("%"));
	else
		barrebleue = barres.substring(barres.indexOf("width")+6,barres.indexOf("%"));
	var points = bdiv[i17+6].innerHTML.trim();
	rs = GM_getValue("suivi", "") != "" ? "s" : GM_getValue("rapport", "") != "" ? "r" : "n";
	return "nom="+nom+"&zooz="+zooz+"&visiteurs="+visiteurs+"&barrerouge="+barrerouge+"&barrebleue="+barrebleue+"&points="+points+"&rs="+rs+"&auj="+aujourd_hui;
}

function pagevierge()
{
	var valentete = "?" + entetef();
	var nom = recherche_param(valentete, "nom");
	var zooz = recherche_param(valentete, "zooz");
	var visiteurs = recherche_param(valentete, "visiteurs");
	var barrerouge = recherche_param(valentete, "barrerouge");
	var barrebleue = recherche_param(valentete, "barrebleue");
	var points = recherche_param(valentete, "points");
	var rs = recherche_param(valentete, "rs");
	if (rs == "s") rs = 'data:image/jpeg;base64,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';
	else rs = 'data:image/jpeg;base64,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';
	var contenu = "<!-- PAGE -->";
	contenu += "<table width=\"600\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">";
	contenu += "	<tr><td>";
	contenu += "		<div style=\"position:relative;background-image:url(images/barremenu.gif);width:600px;height:50px; color:#a44f21; font-weight:bold; margin:0px; padding:0px;\">";
	contenu += "			<div style=\"position:relative; float:left; width:125px; margin-top:20px; padding-left:10px; text-align:center;\">" + nom + "</div>";
	contenu += "			<div style=\"position:relative; float:left; width:79px; margin-top:23px; margin-left:21px; text-align:center; cursor:pointer;\" onmouseover=\"Tip('Votre argent virtuel.', BALLOON, true, ABOVE, true)\" onmouseout=\"UnTip()\">" + zooz + "</div>";
	contenu += "			<div style=\"position:relative; float:left; width:50px; margin-top:20px; margin-left:52px;  text-align:center; cursor:pointer;\" onmouseover=\"Tip('Nombre de visiteurs dans votre parc.', BALLOON, true, ABOVE, true)\" onmouseout=\"UnTip()\">" + visiteurs + "</div>";
	contenu += "			<div style=\"position:relative;float:left; width:100px; margin-top:23px; margin-left:35px; height:18px; text-align:left; cursor:pointer;\" onmouseover=\"Tip('Santé et moral de vos animaux.', BALLOON, true, ABOVE, true)\" onmouseout=\"UnTip()\">";
	contenu += "				<div style=\"width:" + barrerouge + "%; background-image:url(images/barrerouge.jpg); height:8px; margin-top:1px; font-size:1px;\"></div>";
	contenu += "				<div style=\"width:" + barrebleue + "%; background-image:url(images/barrebleue.jpg); height:8px; margin-top:1px; font-size:1px;\"></div>";
	contenu += "			</div>";
	contenu += "			<div style=\"position:relative; float:left; width:75px; margin-top:20px; margin-left:23px;  text-align:center; cursor:pointer;\" onmouseover=\"Tip('Vos points.', BALLOON, true, ABOVE, true)\" onmouseout=\"UnTip()\">" + points + "</div>";
	contenu += "		</div>";
	contenu += "		<br>";
	contenu += "		<table width=\"600\" height=\"49\" border=\"0\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" background=\"images/bureau/bureau_header.gif\">";
	contenu += "			<tr><td>";
	contenu += "				<a href=\"bureau.php\" style=\"margin:0; padding:0; border:0;\">";
	contenu += "					<div style=\"width:120px; height:49px; cursor:pointer; float:left; margin:0; padding:0; border:0;\"></div>";
	contenu += "				</a><a href=\"bureau2.php\" style=\"margin:0; padding:0; border:0;\">";
	contenu += "					<div style=\"width:120px; height:49px; cursor:pointer; float:left; margin:0; padding:0; border:0;\"></div>";
	contenu += "				</a><a href=\"bureau3.php\" style=\"margin:0; padding:0; border:0;\">";
	contenu += "					<div style=\"width:120px; height:49px; cursor:pointer; float:left; margin:0; padding:0; border:0;\"></div>";
	contenu += "				</a><a href=\"bureau4.php\" style=\"margin:0; padding:0; border:0;\">";
	contenu += "					<div style=\"width:120px; height:49px; cursor:pointer; float:left; margin:0; padding:0; border:0;\"></div>";
	contenu += "				</a><a href=\"bureau5.php\" style=\"margin:0; padding:0; border:0;\">";
	contenu += "					<div style=\"width:120px; height:49px; cursor:pointer; float:left; margin:0; padding:0; border:0;\"></div>";
	contenu += "				</a></td>";
	contenu += "			</tr>";
	contenu += "		</table>";
	contenu += "		<table width=\"600\" border=\"0\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" background=\"images/bureau/bureau_body.gif\">";
	contenu += "			<tr><td><img alt=\"\" width=\"600\" height=\"38\" src=\"" + rs + "\" /></td></tr>";
	contenu += "			<tr><td>";
	contenu += "				<div align=\"center\">";
	contenu += "					<table width=\"550\" cellpadding=\"8\" cellspacing=\"0\" bgcolor=\"#FCF0DB\" style=\"border:1px solid #E9CA94;\" >";
	contenu += "					<tr><td name=\"casearemplir\"></td></tr>";
	contenu += "					</table>";
	contenu += "				</div>";
	contenu += "			</td></tr>";
	contenu += "			<tr><td height=\"21\" background=\"images/bureau/bureau_footer.gif\"></td></tr>";
	contenu += "		</table>";
	contenu += "		<br />";
	contenu += "	</td></tr>";
	contenu += "</table>";
	contenu += "<!--";
	contenu += "  ";
	contenu += "-->";
	return contenu;
}

function rapport()
{
	patience("Connexion");
	GM_setValue("rapport", "ok");
	var datarp = entetef();
	var i18;
	if (!GM_getValue("verifmessage", false))
		GM_xmlhttpRequest({
			method: "POST",
			url: "http://montdm.shost.ca/ScriptMonZoo/rapportnew4.php",
			data: datarp,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			onload: function(result) {
				if (result.status != 200) return;
			}
		});

	var contenupage = $c("content_site");
	contenupage[0].innerHTML = pagevierge();
	fenpat = $("patience");
	var old = fenpat.parentNode.removeChild(fenpat);
	var btdra = $n("casearemplir");
	btdra.innerHTML = "";
	if (!GM_getValue("verifmessage", false))
	{	GM_setValue("verifmessage", true);
		GM_setValue("cache"+window.name, true);
		pagesuivante(urlSite + "event.php");
	}
	else 
	{	if (!scan)
		{	if (confirm("Souhaitez-vous vérifier et mettre à jour les PA de tous vos enclos ?"))
			{	btdra.innerHTML = "Veuillez patienter : démarrage du scan en cours...";
				GM_setValue("scan", true);
				var touslesenclosrp = unserialize(GM_getValue("touslesenclos_" + id_zoo, ""));
				var ordre = new Array(), nurl, numenclos;
				for (i18=0;i18<16;i18++) ordre[i18] = i18;
				for (i18=20;i18<61;i18++) ordre[i18-4] = i18;
				for (i18=100;i18<105;i18++) ordre[i18-43] = i18;
				j = 0;
				while (touslesenclosrp[ordre[j]] == "Enclos non construit" && j < 62) j++;
				if (j < 62)
				{	GM_setValue("ordre", serialize(ordre));
					numenclos = parseInt(ordre[j]);
					var t = Math.floor(numenclos/100);
					var v = numenclos - t*100;
					nurl = urlSite + "enclosgestion1.php?t=" + t + "&v=" + v;
				}
				else nurl = urlSite + "bureau4.php";
				pagesuivante(nurl);
			}
			else
			{	GM_deleteValue("verifmessage");
				fincache();
				lien_enclosf();
				MAJpostab();
				affiche_rapport(btdra, false);
			}
		}
		else // le scan pour le rapport est terminé
		{	GM_deleteValue("scan");
			scan = false;
			GM_deleteValue("verifmessage");
			fincache();
			lien_enclosf();
			MAJpostab();
			alertesonore();
			affiche_rapport(btdra, true);
		}
	}
}

function suivifct()
{
	patience("Connexion");
	GM_deleteValue("rapport");
	var datasu = entetef();
	var i18;
	if (GM_getValue("suivi", "") == "ok")
		GM_xmlhttpRequest({
			method: "POST",
			url: "http://montdm.shost.ca/ScriptMonZoo/rapportnew4.php",
			//url: "http://montdm.shost.ca/ScriptMonZoo/did.php",
			data: datasu,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			onload: function(result) {
				if (result.status != 200) return;
				// si did.php
				//var contenupage = $c("content_site");
				//contenupage[0].innerHTML = result.responseText;
			}
		});

	var suexist = $("animaux_enclos"), old;
	if (suexist)
		old = suexist.parentNode.removeChild(suexist);
	suexist = $("enclos_naissances");
	if (suexist)
		old = suexist.parentNode.removeChild(suexist);
	suexist = $("tableau_vieux");
	if (suexist)
		old = suexist.parentNode.removeChild(suexist);
	suexist = $("tableau_animaux");
	if (suexist)
		old = suexist.parentNode.removeChild(suexist);
	suexist = $("enclosavoir");
	if (suexist)
		old = suexist.parentNode.removeChild(suexist);
	suexist = $("lien_deplacement");
	if (suexist)
		old = suexist.parentNode.removeChild(suexist);
	fenpat = $("patience");
	old = fenpat.parentNode.removeChild(fenpat);
	if (GM_getValue("suivi", "") == "ok2") { lien_enclosf(); MAJpostab(); }
	var contenupage = $c("content_site");
	contenupage[0].innerHTML = pagevierge();
	analyse_suivi();
	var btdsu = $n("casearemplir");
	btdsu.innerHTML = "";
	var bdiv = document.createElement("div"), choix, txt;
	bdiv.id = "type_trace";
	bdiv.setAttribute("class", "bloc_graphe");
	liste = document.createElement("select");
	liste.setAttribute("style", "background-color:#F7E3C0");
	liste.name = "choix_trace";
	liste.id = "choix_trace";
	for (i18=1;i18<=17;i18++)
	{	choix = document.createElement("option");
		choix.value = i18;
		switch (i18)
		{	case 1:
				choix.innerHTML = "Suivi du nombre d'animaux";
				break;
			case 2:
				choix.innerHTML = "Suivi de l'âge moyen des animaux";
				break;
			case 3:
				choix.innerHTML = "Suivi du nombre de couples adultes";
				break;
			case 4:
				choix.innerHTML = "Suivi de la valeur réelle du zoo";
				break;
			case 5:
				choix.innerHTML = "Suivi des naissances (marron) et des naissances théoriques (bleu)";
				choix.style.backgroundColor = "#EBD090";
				break;
			case 8:
				choix.innerHTML = "Suivi des naissances mâles (marron) et des naissances femelles (bleu)";
				break;
			case 6:
				choix.innerHTML = "Suivi de la valeur des naissances (marron) et de la théorie (bleu)";
				choix.style.backgroundColor = "#EBD090";
				break;
			case 7:
				choix.innerHTML = "Suivi de la valeur moyenne des naissances (marron) et de la théorie (bleu)";
				choix.style.backgroundColor = "#EBD090";
				break;
			case 9:
				choix.innerHTML = "Suivi des achats (marron) et des ventes (bleu)";
				break;
			case 10:
				choix.innerHTML = "Suivi du nombre de points";
				choix.style.backgroundColor = "#EBC080";
				break;
			case 11:
				choix.innerHTML = "Suivi du classement points";
				choix.style.backgroundColor = "#EBC080";
				break;
			case 12:
				choix.innerHTML = "Suivi du prestige";
				choix.style.backgroundColor = "#EBC080";
				break;
			case 13:
				choix.innerHTML = "Suivi du classement prestige";
				choix.style.backgroundColor = "#EBC080";
				break;
			case 14:
				choix.innerHTML = "Suivi des points team";
				choix.style.backgroundColor = "#EBC080";
				break;
			case 15:
				choix.innerHTML = "Suivi du classement team";
				choix.style.backgroundColor = "#EBC080";
				break;
			case 16:
				choix.innerHTML = "Suivi des points mensuel";
				choix.style.backgroundColor = "#EBC080";
				break;
			case 17:
				choix.innerHTML = "Suivi du classement mensuel";
				choix.style.backgroundColor = "#EBC080";
		}
		liste.appendChild(choix);
	}
	liste.addEventListener('change', graphique, true);
	bdiv.appendChild(liste);
	ajoute_br(bdiv);
	btdsu.appendChild(bdiv);
	var bhr = document.createElement("hr");
	bhr.setAttribute("class", "separateur");
	btdsu.appendChild(bhr);
	bdiv=document.createElement("div");
	bdiv.id = "titre_trace";
	bdiv.setAttribute("class", "bloc_rapport");
	bdiv.setAttribute("style", "color:#B86242;font-weight:bold");
	btdsu.appendChild(bdiv);
	var bimg = $t("img");
	largeurgraphique = btdsu.clientWidth;
	hauteurgraphique1 = window.innerHeight - (positionY(bdiv) - positionY(bimg[bimg.length-1]) + 110);
	hauteurgraphique2 = hauteurgraphique1 + 22;
	graphique(btdsu);
	if (GM_getValue("suivi", "") == "ok") { GM_setValue("suivi", "ok2"); suivifct(); }
	else
	{	var bimg = $t("img");
		titrefen("Suivi", positionY(bimg[bimg.length-1]));
	}
}

function enregistreachat()
{
	var listeachat = unserialize(GM_getValue("string_achats_"+id_zoo, ""));
	var nom_achat = GM_getValue("temp_achat", "");
	if (ANIMAUX[nom_achat])
	{	GM_setValue("compteur_achats_"+id_zoo, GM_getValue("compteur_achats_"+id_zoo, 0) + 1);
		if (GM_getValue("constructionenclos", "") == window.name)
		{	GM_setValue("maxachats_"+id_zoo, parseInt(GM_getValue("maxachats_"+id_zoo, 30)) + 1);
			GM_deleteValue("constructionenclos");
		}
		if (!listeachat[0])
		{	listeachat[0] = new Array();
			listeachat[0][0] = nom_achat;
			listeachat[0][1] = 1;
		}
		else
		{	temoin = false;
			for (i=0; i<listeachat[0].length; i+=2)
				if (listeachat[0][i] == nom_achat) { temoin = true; listeachat[0][i+1] = parseInt(listeachat[0][i+1]) + 1; }
			if (!temoin)
			{	listeachat[0][i] = nom_achat;
				listeachat[0][i+1] = 1;
			}
		}
		GM_setValue("string_achats_"+id_zoo, serialize(listeachat));
		GM_setValue("totalachats_"+id_zoo, parseInt(GM_getValue("totalachats_"+id_zoo, 0)) + parseInt(GM_getValue("val_achat")));
		var stocks = unserialize(GM_getValue("stocks_" + id_zoo), "");
		if (stocks[nom_achat])
		{	if (stocks[nom_achat] != "?")
			{	stocks[nom_achat] = parseInt(stocks[nom_achat]) - 1;
				GM_setValue("stocks_" + id_zoo, serialize(stocks));
			}
		}
		if (GM_getValue("cherchebonus", "") == "") GM_setValue("testerbonus", true);
		var suiviachven = GM_getValue("suivi_achven_"+id_zoo, "");
		var derdate = suiviachven.substring(0, suiviachven.lastIndexOf(":")+1);
		var dervente = suiviachven.substring(suiviachven.lastIndexOf("/"));
		suiviachven = derdate + GM_getValue("totalachats_"+id_zoo) + dervente;
		GM_setValue("suivi_achven_"+id_zoo, suiviachven);
	}
	else
		alert("Il ne sert à rien de cliquer 2 fois sur un bouton : un bouton marche comme une touche de clavier ou une touche de votre télécommande, un seul clic suffit.\n2 clics provoquent une erreur de frappe, vous font arriver sur une mauvaise chaîne de TV, ou vous affichent un message qui ne vous plaît pas forcément !");
	GM_deleteValue("temp_achat");
	GM_deleteValue("val_achat");
	if (parseInt(GM_getValue("majautoPA", 1)) == 1) { GM_setValue("MAJPA2", true); GM_setValue("cache"+window.name, true); }
}

function enregistrevente()
{
	var listevente = unserialize(GM_getValue("string_ventes_"+id_zoo, ""));
	var nom_vente = GM_getValue("temp_vente", "");
	if (ANIMAUX[nom_vente])
	{	if (!listevente[numenclos])
		{	listevente[numenclos] = new Array();
			listevente[numenclos][0] = nom_vente;
			listevente[numenclos][1] = 1;
		}
		else
		{	temoin = false;
			for (i=0; i<listevente[numenclos].length; i+=2)
				if (listevente[numenclos][i] == nom_vente) { temoin = true; listevente[numenclos][i+1] = parseInt(listevente[numenclos][i+1]) + 1; }
			if (!temoin)
			{	listevente[numenclos][i] = nom_vente;
				listevente[numenclos][i+1] = 1;
			}
		}
		GM_setValue("string_ventes_"+id_zoo, serialize(listevente));
		GM_setValue("totalventes_"+id_zoo, parseInt(GM_getValue("totalventes_"+id_zoo, 0)) + parseInt(GM_getValue("val_vente")));
		var suiviachven = GM_getValue("suivi_achven_"+id_zoo, "");
		var derdate = suiviachven.substring(0, suiviachven.lastIndexOf(":")+1);
		var derachat = suiviachven.substring(suiviachven.lastIndexOf(":")+1, suiviachven.lastIndexOf("/")+1);
		suiviachven = derdate + derachat + GM_getValue("totalventes_"+id_zoo) + ";";
		GM_setValue("suivi_achven_"+id_zoo, suiviachven);
	}
	else
		alert("Il ne sert à rien de cliquer 2 fois sur un bouton : un bouton marche comme une touche de clavier ou une touche de votre télécommande, un seul clic suffit.\n2 clics provoquent une erreur de frappe, vous font arriver sur une mauvaise chaîne de TV, ou vous affichent un message qui ne vous plaît pas forcément !");
	GM_deleteValue("temp_vente");
	GM_deleteValue("val_vente");
	if (parseInt(GM_getValue("majautoPA", 1)) == 1) { GM_setValue("MAJPA2", true); GM_setValue("cache"+window.name, true); }
}

function enregistreventemulti()
{
	var bli = $t("li"), ivm, jvm, temoin;
	var listevente = unserialize(GM_getValue("string_ventes_"+id_zoo, ""));
	var totalventes = parseInt(GM_getValue("totalventes_"+id_zoo, 0));
	if (GM_getValue("ventetrop", false) || GM_getValue("ventemourants", false))
	{	var listeventetr = unserialize(GM_getValue("string_ventes_" + (GM_getValue("ventemourants", false) ? "mourants" : "trop"), ""));
		var totalventestr = parseInt(GM_getValue("totalventes_" + (GM_getValue("ventemourants", false) ? "mourants" : "trop"), 0));
	}
	for (ivm=0; ivm<bli.length; ivm++)
	{	nom_vente = bli[ivm].innerHTML;
		val_vente = parseInt(nom_vente.substring(nom_vente.indexOf("vente")+16, nom_vente.indexOf("</strong> Zo")).replace(" ", "", "g"));
		if (nom_vente.indexOf("femelle") != -1) nom_vente = nom_vente.substring(8, nom_vente.indexOf(" femelle"));
		else if (nom_vente.indexOf("patriote") != -1) nom_vente = "coq patriote";
		else nom_vente = nom_vente.substring(8, nom_vente.indexOf(" mâle"));
		if (ANIMAUX[nom_vente])
		{	if (!listevente[numenclos])
			{	listevente[numenclos] = new Array();
				listevente[numenclos][0] = nom_vente;
				listevente[numenclos][1] = 1;
			}
			else
			{	temoin = false;
				for (jvm=0; jvm<listevente[numenclos].length; jvm+=2)
				if (listevente[numenclos][jvm] == nom_vente) { temoin = true; listevente[numenclos][jvm+1] = parseInt(listevente[numenclos][jvm+1]) + 1; }
				if (!temoin)
				{	listevente[numenclos][jvm] = nom_vente;
					listevente[numenclos][jvm+1] = 1;
				}
			}
			totalventes += val_vente;
			if (GM_getValue("ventetrop", false) || GM_getValue("ventemourants", false))
			{	if (!listeventetr[numenclos])
				{	listeventetr[numenclos] = new Array();
					listeventetr[numenclos][0] = nom_vente;
					listeventetr[numenclos][1] = 1;
				}
				else
				{	temoin = false;
					for (jvm=0; jvm<listeventetr[numenclos].length; jvm+=2)
						if (listeventetr[numenclos][jvm] == nom_vente) { temoin = true; listeventetr[numenclos][jvm+1] = parseInt(listeventetr[numenclos][jvm+1]) + 1; }
					if (!temoin)
					{	listeventetr[numenclos][jvm] = nom_vente;
						listeventetr[numenclos][jvm+1] = 1;
					}
				}
				totalventestr += val_vente;
			}
		}
		else
			alert("Il ne sert à rien de cliquer 2 fois sur un bouton : un bouton marche comme une touche de clavier ou une touche de votre télécommande, un seul clic suffit.\n2 clics provoquent une erreur de frappe, vous font arriver sur une mauvaise chaîne de TV, ou vous affichent un message qui ne vous plaît pas forcément !");
	}
	GM_setValue("string_ventes_"+id_zoo, serialize(listevente));
	GM_setValue("totalventes_"+id_zoo, totalventes);
	if (GM_getValue("ventetrop", false) || GM_getValue("ventemourants", false))
	{	GM_setValue("string_ventes_" + (GM_getValue("ventemourants", false) ? "mourants" : "trop"), serialize(listeventetr));
		GM_setValue("totalventes_" + (GM_getValue("ventemourants", false) ? "mourants" : "trop"), totalventestr);
	}
	var suiviachven = GM_getValue("suivi_achven_"+id_zoo, "");
	var derdate = suiviachven.substring(0, suiviachven.lastIndexOf(":")+1);
	var derachat = suiviachven.substring(suiviachven.lastIndexOf(":")+1, suiviachven.lastIndexOf("/")+1);
	suiviachven = derdate + derachat + totalventes + ";";
	GM_setValue("suivi_achven_"+id_zoo, suiviachven);
	if (parseInt(GM_getValue("majautoPA", 1)) == 1 && !scan) { GM_setValue("MAJPA2", true); GM_setValue("cache"+window.name, true); }
}

function listeventemulti()
{	var binput = $t("input"), ias;
	var listeas = new Array();
	for (ias=0; ias<binput.length;ias++)
	{	if (parseInt(binput[ias].value) < 1000) break;
		else if (binput[ias].checked) listeas.push(binput[ias].value);
	}
	GM_setValue("listeas", serialize(listeas));
	testbebe();
	if (GM_getValue("bebes", "" ) == "") GM_setValue("retour", window.scrollY);
}

function selvente(e)
{
	var casecheck = $t("input", e.target.parentNode);
	casecheck[0].checked = !casecheck[0].checked;
	e.target.parentNode.style.opacity = e.target.parentNode.style.opacity == "0.5" ? "1": "0.5";
	e.target.parentNode.className = e.target.parentNode.style.opacity == "0.5" ? "vente "+ e.target.parentNode.className : e.target.parentNode.className.replace("vente ", "");
}

function selvente2(e)
{
	var cible = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
	cible.style.opacity = cible.style.opacity == "0.5" ? "1": "0.5";
	cible.className = cible.style.opacity == "0.5" ? "vente "+ cible.className : cible.className.replace("vente ", "");
}

function encherenormale()
{
	if (encherisseur == nom_zoo)
	{	alert("Vous êtes déjà le meilleur enchérisseur !");
		$n("propose").value = "";
	}
	else
	{	valeur = $n("propose").value;
		enchere = unserialize(GM_getValue("enchere_"+id_zoo, ""));
		enchere[nom] = valeur;
		GM_setValue("enchere_"+id_zoo, serialize(enchere));
	}
}

function encherir()
{
	if (encherisseur == nom_zoo) alert("Vous êtes apparemment déjà le meilleur enchérisseur.\nVous pouvez cliquer sur 'Actualiser les enchères' pour\nle vérifier avant de réenchérir.");
	else
	{	nvprix = prix + 1;
		binput = $t("input", btable);
		binput[1].value = nvprix;
		enchere = unserialize(GM_getValue("enchere_"+id_zoo, ""));
		enchere[nom] = nvprix;
		GM_setValue("enchere_"+id_zoo, serialize(enchere));
		binput[2].dispatchEvent(clickmouse);
	}
}

function encherir5()
{
	var typeit = nom[0];
	var binput = $t("input", btable);
	if (GM_getValue("encherir_"+nom, "") == "")
	{	patience("enchere0");
		GM_setValue("encherir_"+nom, 6);
		GM_setValue("cache"+window.name, true);
		pagesuivante(window.location);
	}
	else
	{	GM_setValue("encherir_"+nom, parseInt(GM_getValue("encherir_"+nom))-1);
		if (GM_getValue("enchereauto"+typeit, false) && parseInt($t("strong")[2].innerHTML.substring(0,2)) > parseInt(GM_getValue("h_ench")))
		{	patience("HDepass");
			fincache();
			GM_deleteValue("encherir_"+nom);
			GM_deleteValue("enchereauto" + typeit);
		}
		else
		{	var bdiv = $t("div"), ienc;
			for (ienc=20; ienc<bdiv.length;ienc++)
				if (bdiv[ienc].attributes[0].value.indexOf("width: 125px") != -1 || bdiv[ienc].attributes[0].value.indexOf("width:125px") != -1)
					break; // 1ère condition pour Firefox 3, 2e pour Firefox 4
			var zooz = bdiv[ienc+1].innerHTML;
			var nvprix = prix + 1;
			if (nvprix > zooz)
			{	patience("zooinsuf");
				fincache();
				GM_deleteValue("encherir_"+nom);
			}
			else
			{	var enchere = unserialize(GM_getValue("enchere_"+id_zoo, ""));
				var encheremaxi = new Array();
				if (GM_getValue("enchereauto"+typeit, false))
					encheremaxi[nom] = GM_getValue("encheremaxiGl_"+id_zoo, 0);
				else encheremaxi = unserialize(GM_getValue("encheremaxi_"+id_zoo, ""));
				if (encheremaxi[nom] > 0)
				{	if (nvprix <= encheremaxi[nom] && encherisseur != nom_zoo)
					{	patience("enchere1");
						binput[1].value = nvprix;
						enchere[nom] = nvprix;
						GM_setValue("enchere_"+id_zoo, serialize(enchere));
						binput[2].dispatchEvent(clickmouse);
					}
					else if (nvprix > encheremaxi[nom])
					{	patience("encheremaxi");
						fincache();
						GM_deleteValue("encherir_"+nom);
					}
					else
					{	patience("enchere2");
						if (parseInt(GM_getValue("encherir_"+nom)) == 1)
						{	fincache();
							GM_deleteValue("encherir_"+nom);
						}
						pagesuivante(window.location);
					}
				}
				else
				{	if (encherisseur != nom_zoo)
					{	patience("enchere1");
						binput[1].value = nvprix;
						enchere[nom] = nvprix;
						GM_setValue("enchere_"+id_zoo, serialize(enchere));
						binput[2].dispatchEvent(clickmouse);
					}
					else
					{	patience("enchere2");
						if (parseInt(GM_getValue("encherir_"+nom)) == 1)
						{	fincache();
							GM_deleteValue("encherir_"+nom);
						}
						pagesuivante(window.location);
					}
				}
			}
		}
	}
}

function sauveencheremaxi()
{
	encheremaxi[nom] = $("MaxiEnch"+nom).value;
	GM_setValue("encheremaxi_"+id_zoo, serialize(encheremaxi));
}

function sauveencheremaxiGl()
{
	GM_setValue("encheremaxiGl_"+id_zoo, parseInt($("MaxiGlEnch").value));
}

function majliensmusee(numradio)
{
	GM_setValue("liensmusee", parseInt(numradio));
	pagesuivante(window.location);
}

function majlancerencheresauto(numradio)
{
	GM_setValue("lancerencheresauto", parseInt(numradio));
}

function ventemulti()
{
	testbebe();
	if (GM_getValue("bebes", "" ) == "") GM_setValue("retour", window.scrollY);
	var bvente = $c("vente");
	if (bvente.length > 0)
	{	var listevente = new Array(), liste = unserialize(GM_getValue("liste"));
		if (bvente.length > 1)
		{	var touslesenclosvm = unserialize(GM_getValue("touslesenclos_" + id_zoo, ""));
			for (i20 in touslesenclosvm)
			{	if (touslesenclosvm[i20].indexOf("anima") != -1)
					touslesenclosvm[i20] = parseInt(touslesenclosvm[i20].substring(0, touslesenclosvm[i20].indexOf(" anima")));
				else if (touslesenclosvm[i20] == "Vide") touslesenclosvm[i20] = 0;
				else touslesenclosvm[i20] = 1000;
			}
			var tableau1 = new Array(), tableau2 = new Array();
			for (i20 in touslesenclosvm) { tableau1.push(parseInt(touslesenclosvm[i20])); tableau2[touslesenclosvm[i20]] = i20; }
			tableau1.sort(function (a, b) { return a - b; });
			enclosmini = tableau2[tableau1[0]];
			var txt = urlSite + "vente_animaux.php?t=";
			txt += Math.floor(enclosmini/100) + "&v=";
			enclosmini = enclosmini - Math.floor(enclosmini/100)*100;
			txt += enclosmini + "&vtemp=";
			ba = $t("a", bvente[0]);
			txt += recherche_param(ba[0].href, "vtemp") + "&ids=";
			message = "Liste des animaux à vendre :\n";
		}
		else message = "Vous avez sélectionné un seul animal à vendre :\n";
		for (i20=0;i20<bvente.length;i20++)
		{	ba = $t("a", bvente[i20]);
			if (i20 == bvente.length - 1) listevente.push(ba[0].href);
			else listevente.push(txt + recherche_param(ba[0].href, "ids"));
		}
		GM_setValue("listevente", serialize(listevente));
		total = 0;
		for (i20=0;i20<listevente.length;i20++)
		{	numids = recherche_param(listevente[i20], "ids");
			txt = String(liste[numids]);
			prix = txt.substring(txt.indexOf("vente :")+8);
			prix = parseInt(prix.substring(0,prix.indexOf(" Zoo")).replace(" ", "", "g"));
			total += prix;
			message += "- " + txt.substring(0, txt.indexOf("<br>")) + ", prix de vente : " + millier(prix) + " Zoo'z\n";
		}
		if (bvente.length > 1) message += "\nsoit un prix de vente total de : " + millier(total) + " Zoo'z.\n";
		if (mvscours)
		{	message += "\nAttention, ";
			message += bvente.length > 1 ? "ces prix ne sont qu'indicatifs" : "ce prix n'est qu'indicatif";
			message += " : allez sur la page 'bourse' pour le";
			message += bvente.length > 1 ? "s" : "";
			message += "\nmettre à jour.\n";
		}
		message += "\nConfimez-vous votre choix ?";
		if (confirm(message))
		{	firstvente = listevente.shift();
			GM_setValue("listevente", serialize(listevente));
			GM_setValue("venteauto", true);
			GM_setValue("cache"+window.name, true);
			pagesuivante(firstvente);
		}
		else GM_deleteValue("listevente");
	}
	else alert("Vous n'avez sélectionné aucun animal :\ncliquez sur les animaux que vous souhaitez vendre\navant de recliquer sur ce bouton");
}

function MAJPA(e)
{
	var lienmaj = e.target; // lien pour mettre à jour tous les PA d'un coup
	var btable = $t("table"), last_tablebureau, i21, badma = false;
	for (i21=btable.length-1;i21>=0;i21--)
		if (btable[i21].getAttribute("cellpadding") == 4) { last_tablebureau = btable[i21]; break; }
	var btdma = $t("td", last_tablebureau);
	var PAdispo = new Array(), PAplus = new Array(), PA1 = new Array();
	for (i21=0;i21<5;i21++)
	{	PAplus[i21] = 0;
		PAdispo[i21] = parseInt(btdma[i21].innerHTML.substring(btdma[i21].innerHTML.indexOf("PA dispo :")+11, btdma[i21].innerHTML.indexOf("</strong")));
	}
	for (i21=8;i21<btdma.length;i21+=8) // contrôle des PA
		PA1[i21/8-1] = parseInt(btdma[i21].innerHTML.substring(0, btdma[i21].innerHTML.indexOf("<br>")));
	for (i21=8;i21<btdma.length;i21+=8)
	{	if (btdma[i21+3].innerHTML.indexOf("<br>") == -1) PA2=parseInt(btdma[i21+3].innerHTML);
		else PA2=parseInt(btdma[i21+3].innerHTML.substring(0, btdma[i21+3].innerHTML.indexOf("<br>")));
		j = i21/8-1;
		if (j==0 && PA2 == 0)
		{	if (PA1[1] != "0" || PA1[2] != "3" || PA1[3] != "0" || PA1[4] != "5")
			{ btdma[35].innerHTML = 4; GM_setValue("MAJPA2", true); GM_setValue("retour", window.scrollY); badma = true; }
		}
		if (PA1[j] > PA2) badma = true;
		if (PA1[j] < PA2)
		{	badma = true;
			PAplus[j] = Math.max(Math.ceil((PA2-PA1[j]-PAdispo[j])/10), 0);
		}
	}
	if (badma) // si les PA sont incorrects, on corrige en embauchant éventuellement
	{	if (PAplus[0]+PAplus[1]+PAplus[2]+PAplus[3]+PAplus[4] == 0) // pas besoin d'embaucher
		{	GM_setValue("retour", window.scrollY);
			e.target.href = lienmaj;
		}
		else
		{	var lienplus = urlSite + "bureau.php?achat=1&j="; // lien pour embaucher
			tot = PAplus[0]+PAplus[1]+PAplus[2]+PAplus[3]+PAplus[4];
			GM_setValue("totalPAp", "étape 0 sur " + tot);
			for (i21=0;i21<5;i21++)
			{	if (PAplus[i21]>0)
				{	lienplus += i21+1;
					PAplus[i21] += -1;
					GM_setValue("plus",serialize(PAplus));
					GM_setValue("paraenclos", t+"_"+v);
					GM_setValue("MAJPA", true);
					GM_setValue("retour", window.scrollY);
					GM_setValue("cache"+window.name, true);
					e.target.href = lienplus;
					break;
				}
			}
		}
	}
	else
	{	alert("il n'était pas nécessaire de cliquer ici : tous les PA sont déjà corrects");
		newtarget = urlSite + "enclosgestion1.php?t=" + t + "&v=" + v;
		GM_setValue("retour", window.scrollY);
		e.target.href = newtarget;
	}
}

function fermefenndefi()
{
	GM_deleteValue("affnewdefi");
	var oldfnd = $('ndefi').parentNode.removeChild($('ndefi'));
	affmasqfenetre();
}

function fermefendefi()
{
	GM_deleteValue("affdefi");
	var oldfd = $('iddefi').parentNode.removeChild($('iddefi'));
	affmasqfenetre();
}

function fermefennews()
{
	GM_deleteValue("affnews");
	var oldfn = $('news').parentNode.removeChild($('news'));
	affmasqfenetre();
}

function fermefenretmess()
{
	GM_deleteValue("retourmess");
	var oldfn = $('retmess').parentNode.removeChild($('retmess'));
	affmasqfenetre();
}

function allersurmess()
{
	GM_deleteValue("retourmess");
	pagesuivante(urlSite + "event.php");
}

function fermefenconseil()
{
	GM_deleteValue("messagesauvegarde");
	var oldfc = $('conseil').parentNode.removeChild($('conseil'));
	affmasqfenetre();
}

function fermefenoeuf()
{
	GM_deleteValue("oeuf");
	var oldfo = $('oeuf').parentNode.removeChild($('oeuf'));
	affmasqfenetre();
}

function fermefenpaul()
{
	GM_deleteValue("periodique");
	var oldfo = $('paul').parentNode.removeChild($('paul'));
	affmasqfenetre();
}

function fermefenbonus()
{
	var oldfb = $('trouvebonus').parentNode.removeChild($('trouvebonus'));
}

function fermefenvol()
{
	GM_deleteValue("vol");
	var oldfv = $('vol').parentNode.removeChild($('vol'));
	affmasqfenetre();
}

function tabattraction()
{
	var bdiv = $("attraction");
	if (!bdiv)
	{	bdiv = document.createElement("div");
		bdiv.id = "attraction";
		bdiv.className = "info_bulle";
		var txt = GM_getValue("attraction_"+id_zoo, "");
		if (txt.indexOf("animaux") != -1) txt += "<br>";
		txt += " est exceptionnellement disponible à l'achat<br>jusqu'à votre prochaine mise à jour.";
		var img_attraction = txt.indexOf("fennec") != -1 ? "savane_fennec.jpg" : txt.indexOf("calamar géant") != -1 ? "aquarium_calamar geant.jpg" : txt.indexOf("tatou") != -1 ? "terre_tatou.jpg" : txt.indexOf("tapir") != -1 ? "foret_tapir.jpg" : txt.indexOf("requin marteau") != -1 ? "bassin_requin marteau.jpg" : txt.indexOf("chamois") != -1 ? "foret_chamois.jpg" : txt.indexOf("gavial") != -1 ? "terre_gavial.jpg" : txt.indexOf("cigogne") != -1 ? "voliere_cigogne blanche.jpg" : txt.indexOf("gérénuk") != -1 ? "savane_gerenuk.jpg" : txt.indexOf("narval") != -1 ? "bassin_narval.jpg" : "";
		if (img_attraction != "") img_attraction = "<img src=\'images/animaux/" + img_attraction + "\' height=\"80\" width=\"80\" hspace=\"6\" />";
		bdiv.innerHTML = "<div style=\"width:550px;text-align:center;font-size:14px;font-weight:bold;color:#B86242;\">Attraction exceptionnelle dans votre parc !" +
			"</div><br><div style=\"text-align:center\">L" + txt + "</div><div style=\"text-align:center;margin-top:20px;\">" + img_attraction +
			"<br><br><a style=\"cursor:pointer;\" id=\"fenattracttemp\" name=\"1\">Me rappeler ce message dans 1 minute</a>" +
			"<br><a style=\"cursor:pointer;\" id=\"fenattracttemp\" name=\"5\">Me rappeler ce message dans 5 minutes</a>" +
			"<br><a style=\"cursor:pointer;\" id=\"fenattracttemp\" name=\"15\">Me rappeler ce message dans 15 minutes</a>" +
			"<br><br><a style=\"cursor:pointer;\" id=\"fenattract\">Fermer définitivement cette fenêtre</a></div>";
		document.body.appendChild(bdiv);
	}
	else bdiv.style.display = "";
}

function fermefenattract()
{
	var oldfv = $('attraction').parentNode.removeChild($('attraction'));
	GM_deleteValue("attracttemp");
	GM_deleteValue("attraction_"+id_zoo)
}

function fermefenattracttemp(duree)
{
	$('attraction').style.display = "none";
	if (GM_getValue("attraction_"+id_zoo, "") != "")
	{	duree = parseInt(duree);
		duree = Date.now() + (duree == 1 ? 60000 : duree == 5 ? 300000 : 900000);
		duree = "t" + duree;
		GM_setValue("attracttemp", duree);
		window.setTimeout(reafficheattract, parseInt(GM_getValue("attracttemp").substring(1)) - Date.now());
	}
	else alert("Le message a déjà été fermé dans un autre onglet : impossible de relancer l'affichage");
}

function reafficheattract()
{
	GM_setValue("attracttemp", "t0");
	tabattraction();
}

function fermefenmour()
{
	GM_deleteValue("ancmourants");
	var oldfm = $('idmourant').parentNode.removeChild($('idmourant'));
	affmasqfenetre();
}

function fermefentrop()
{
	GM_deleteValue("anctrop");
	var oldfm = $('idtrop').parentNode.removeChild($('idtrop'));
	affmasqfenetre();
}

function fermefentorn()
{
	GM_deleteValue("tornade");
	var oldft = $('tornade').parentNode.removeChild($('tornade'));
	affmasqfenetre();
}

function fermefenluxe()
{
	GM_deleteValue("nonluxe");
	var oldft = $('nonluxe').parentNode.removeChild($('nonluxe'));
	affmasqfenetre();
}

function reinimusee()
{
	GM_setValue("inim"+window.name, true);
	pagesuivante(urlSite + "musee.php");
}

function reinibota()
{
	GM_setValue("inib"+window.name, true);
	pagesuivante(urlSite + "botanica.php");
}

function testitem()
{
	if (/musee.php/.test(window.location) || /botanica.php/.test(window.location))
	{	GM_setValue("testitems"+typeit+window.name, true);
		GM_setValue("cache"+window.name, true);
		for (numero=1;numero<21;numero++)
			if (itemaacheter[numero])
				if (itemaacheter[numero] != "ok") itemaacheter[numero] = "ok";
		GM_setValue("itemaacheter"+typeit, serialize(itemaacheter));
		for (numero=1;numero<21;numero++)
			if (itemaacheter[numero]) break;
		var dateitem1 = new Date();
		dateitem1 = dateToheure(dateitem1);
		GM_setValue("dateitem1", dateitem1);
		if (musee) pagesuivante(urlSite + "items.php?num_item=" + numero);
		else pagesuivante(urlSite + "items_botanica.php?num_item=" + numero);
	}
}

function cz(nbr)
{
	if (nbr < 10) return "0"+nbr;
	else return nbr;
}

function heureTonbr(H)
{
	return parseInt(H.substring(0,2),10)*3600+parseInt(H.substring(3,5),10)*60+parseInt(H.substring(6),10);
}

function dateToheure(H)
{
	var heureH = H.getHours();
	var heureM = H.getMinutes();
	var heureS = H.getSeconds();
	return cz(heureH)+":"+cz(heureM)+":"+cz(heureS);
}

function heureserveur(heurelocale)
{
	var decalage = GM_getValue("decalageitem", 0);
	var nbr1 = heureTonbr(heurelocale) + parseInt(decalage,10);
	var H = Math.floor(nbr1 / 3600);
	var M = Math.floor((nbr1 - H*3600) / 60);
	var S = nbr1 - H*3600 - M*60;
	return cz(H)+":"+cz(M)+":"+cz(S);
}

function relancermusbot()
{	if (GM_getValue("inim"+window.name, false))
		pagesuivante(urlSite + "musee.php");
	else if (GM_getValue("inib"+window.name, false))
		pagesuivante(urlSite + "botanica.php");
}

function fincache()
{
	GM_deleteValue("cache"+window.name);
	if (!$("boptions")) modification_menu();
}

function SupEmplFct()
{
	var btable = $t("table"), last_tablebureau, i21;
	for (i21=btable.length-1;i21>=0;i21--)
		if (btable[i21].getAttribute("cellpadding") == 4) { last_tablebureau = btable[i21]; break; }
	var btdse = $t("td", last_tablebureau);
	var PAdispo = new Array(), PAmoins = new Array();
	for (i21=0;i21<5;i21++)
		PAdispo[i21] = parseInt(btdse[i21].innerHTML.substring(btdse[i21].innerHTML.indexOf("PA dispo :")+11, btdse[i21].innerHTML.indexOf("</strong")));
	for (i=0;i<5;i++)
		PAmoins[i]=Math.floor(PAdispo[i]/10);
	if (PAmoins[0]+PAmoins[1]+PAmoins[2]+PAmoins[3]+PAmoins[4] != 0)
	{	tot = PAmoins[0]+PAmoins[1]+PAmoins[2]+PAmoins[3]+PAmoins[4];
		GM_setValue("totalPAm", "étape 0 sur " + tot);
		GM_setValue("cache"+window.name, true);
		GM_setValue("retour", window.scrollY);
		var lienmoins = urlSite + "bureau.php?achat=1&l="; // lien pour diminuer de 10 les PA
		for (i=0;i<5;i++)
		{	if (PAmoins[i]>0)
			{	lienmoins += i+1;
				PAmoins[i] += -1;
				GM_setValue("moins",serialize(PAmoins));
				GM_setValue("paraenclos", recherche_param(window.location.search, "t") + "_" + recherche_param(window.location.search, "v"));
				pagesuivante(lienmoins);
				break;
			}
		}
	}
	else alert("Vous n'avez aucun employé en trop.");
}

function forumMAJ(nrad)
{
	if (nrad != 1)
	{	if (nrad.indexOf("dern") != -1) nrad = parseInt(nrad.substring(0, nrad.indexOf(" dern")));
		else nrad = parseInt(nrad.substring(nrad.indexOf("_")+1));
	}
	GM_setValue("nbMAJfo", nrad);
	for (idz=0;idz<tab_zoo.length;idz++)
		if ($("nbMAJfo_"+idz+"_"+nrad)) $("nbMAJfo_"+idz+"_"+nrad).checked = true;
		else if ($("nbMAJfo_"+idz+"_1"))
		{	var idz2 = nrad;
			while (!$("nbMAJfo_"+idz+"_"+idz2)) idz2--;
			$("nbMAJfo_"+idz+"_"+idz2).checked = true;
		}
}

function pagesuivante(urlpage)
{
	var reponseok = testcarac(urlpage);
	if (reponseok) window.location.replace(urlpage);
}

function testcarac(urltc)
{
	if (!urltc) urltc = "";
	var btc = $c("menu");
	if (!btc[0]) return true;
	else if (btc[0].innerHTML.indexOf("+ de Mise à jour") != -1) return true;
	else
	{	var bcarac = document.createElement("div");
		bcarac.id = "badcarac";
		bcarac.className = "info_bulle";
		bcarac.innerHTML = "<div style=\"text-align:center;margin-top:4px;font-size:16px;font-weight:bold;color:#B86242\">Mauvais encodage !</div>" +
			"<div style=\"text-align:center;margin-top:12px;margin-bottom:4px;font-size:14px;color:#FA2104\">" + 
			"Vous avez un problème d'encodage des caractères sur cette page.<br>" +
			"Pour corriger cela, allez <b>maintenant</b> dans le menu de Firefox \"Affichage/Encodage des caractères\", et sélectionnez \"Occidentale (ISO-8859-1)\".</div>" +
			"<br>" +
			"<div style=\"text-align:center;color:#B86242\">" + 
			"Le script reprendra normalement après votre intervention.<br><br>" +
			"NB : si nécessaire, cliquez sur 'Renvoyer' dans l'éventuelle alerte suivante.</div>";
		document.body.appendChild(bcarac);
		GM_setValue("suitescript", urltc);
		return false;
	}
}

function ajoutetrouvaille(especeat)
{
	var tab_trouvaillesat = unserialize(GM_getValue("string_trouvailles_"+id_zoo, ""));
	if (!tab_trouvaillesat[0])
	{	tab_trouvaillesat[0] = new Array();
		tab_trouvaillesat[0][0] = especeat;
		tab_trouvaillesat[0][1] = 1;
	}
	else
	{	var temoinat = false, jat;
		for (jat=0; jat<tab_trouvaillesat[0].length; jat+=2)
			if (tab_trouvaillesat[0][jat] == especeat) { temoinat = true; tab_trouvaillesat[0][jat+1] = parseInt(tab_trouvaillesat[0][jat+1]) + 1; break; }
		if (!temoinat)
		{	tab_trouvaillesat[0][jat] = especeat;
			tab_trouvaillesat[0][jat+1] = 1;
		}
	}
	GM_setValue("string_trouvailles_"+id_zoo, serialize(tab_trouvaillesat));
}

function chercheteamf()
{
	GM_setValue("cht", true);
	GM_setValue("nbch", parseInt($("nbch").value));
	var debct = parseInt($("debch").value);
	GM_setValue("debch", debct + parseInt($("nbch").value)*30);
	GM_setValue("cache"+window.name, true);
	pagesuivante(urlSite + "classement.php?choix_class=2&deb=" + debct);
}

function chercheespf()
{
	GM_setValue("cht", true);
	GM_setValue("espch", $("espch").value.toLowerCase().trim());
	GM_setValue("cache"+window.name, true);
	GM_setValue("listeteam", "")
	ba = $t("table");
	ba = $t("a", ba[0]);
	var listecht = new Array();
	for (i=0;i<ba.length; i++)
		if (ba[i].href.indexOf("voirzoo.php") != -1) listecht.push(ba[i].href);
	var nextzoo = listecht.shift();
	GM_setValue("listecht", serialize(listecht));
	pagesuivante(nextzoo);
}

function affichageclassement(afftit)
{	if (afftit)
	{	var choix_classac = recherche_param(window.location.search, "choix_class");
		var typeclac = choix_classac == "1" ? "points" : choix_classac == "2" || choix_classac == "" ? "prestige" : choix_classac == "4" ? "mensuel" : "team";
		titrefen("Classement " + typeclac);
	}
	var bstrongac = $t("strong");
	var ptsac = bstrongac[6].innerHTML;
	ptsac = ptsac.substring(0, ptsac.indexOf(" "));
	bstrongac[6].innerHTML = bstrongac[6].innerHTML.replace(ptsac, millier(ptsac));
	var inteamac = bstrongac[10].innerHTML.indexOf("pts") != -1 ? 2 : 0; // 2 si on est dans une team
	ptsac = bstrongac[12+inteamac].innerHTML;
	ptsac = ptsac.substring(0, ptsac.indexOf(" pt"));
	bstrongac[12+inteamac].innerHTML = bstrongac[12+inteamac].innerHTML.replace(ptsac, millier(ptsac));
	var clac = bstrongac[3].innerHTML;
	clac = clac.substring(0,clac.indexOf("è"));
	bstrongac[3].innerHTML = bstrongac[3].innerHTML.replace(clac, millier(clac));
	clac = bstrongac[7].innerHTML;
	clac = clac.substring(0,clac.indexOf("è"));
	bstrongac[7].innerHTML = bstrongac[7].innerHTML.replace(clac, millier(clac));
	clac = bstrongac[13+inteamac].innerHTML;
	clac = clac.substring(0,clac.indexOf("è"));
	bstrongac[13+inteamac].innerHTML = bstrongac[13+inteamac].innerHTML.replace(clac, millier(clac));
	if (inteamac == 2)
	{	clac = bstrongac[11].innerHTML;
		clac = clac.substring(0,clac.indexOf("è"));
		bstrongac[11].innerHTML = bstrongac[11].innerHTML.replace(clac, millier(clac));
	}
	var btdac = $t("td"), i23;
	for (i23=0;i23<btdac.length;i23++)
	{	if (btdac[i23].width == "41" && btdac[i23].align == "center")
			btdac[i23].innerHTML = millier(btdac[i23].innerHTML);
		if (btdac[i23].width == "60" && btdac[i23].innerHTML.indexOf(" <!--") != -1)
		{	btdac[i23].innerHTML = "";
			btdac[i23].setAttribute("width", "0");
		}
	}
	for (i23=0;i23<bstrongac.length;i23++)
		if (bstrongac[i23].innerHTML.indexOf("-") != -1)
		{	clac = bstrongac[i23].innerHTML.substring(0,bstrongac[i23].innerHTML.indexOf("-"));
			if (clac.indexOf(" ") == -1)
			{	bstrongac[i23].innerHTML = bstrongac[i23].innerHTML.replace(clac, millier(clac)+" ").replace(" ", "&nbsp;", "g");
				bstrongac[i23].parentNode.parentNode.style.width = "65px";
			}
		}
}

function affmasqfenetre()
{
	var avantmess = false;
	if ($("ndefi")) $("ndefi").style.display = "none";
	if ($("iddefi")) $("iddefi").style.display = "none";
	if ($("nonluxe")) $("nonluxe").style.display = "none";
	if ($("tornade")) $("tornade").style.display = "none";
	if ($("idtrop")) $("idtrop").style.display = "none";
	if ($("idmourant")) $("idmourant").style.display = "none";
	if ($("vol")) $("vol").style.display = "none";
	if ($("oeuf")) $("oeuf").style.display = "none";
	if ($("paul")) $("paul").style.display = "none";
	if ($("news")) $("news").style.display = "none";
	if ($("conseil")) $("conseil").style.display = "none";
	if ($("retmess")) $("retmess").style.display = "none";

	if ($("conseil")) { $("conseil").style.display = ""; avantmess = true; }
	else if ($("tornade")) { $("tornade").style.display = ""; avantmess = true; }
	else if ($("oeuf")) { $("oeuf").style.display = ""; avantmess = true; }
	else if ($("vol")) { $("vol").style.display = ""; avantmess = true; }
	else if ($("ndefi")) { $("ndefi").style.display = ""; avantmess = true; }
	else if ($("iddefi")) { $("iddefi").style.display = ""; avantmess = true; }
	else if ($("idtrop")) { $("idtrop").style.display = ""; avantmess = true; }
	else if ($("idmourant")) { $("idmourant").style.display = ""; avantmess = true; }
	else if ($("nonluxe")) { $("nonluxe").style.display = ""; avantmess = true; }
	else if ($("paul")) { $("paul").style.display = ""; avantmess = true; }
	else if ($("news")) { $("news").style.display = ""; avantmess = true; }
	
	if (GM_getValue("retourmess", false) && !avantmess)
	{	if (!(/event.php/.test(window.location))) $("retmess").style.display = "";
		else GM_deleteValue("retourmess");
	}
}

function verifaujf()
{
	var aujth = new Date();
	aujth = new Date(Date.parse(aujth) + GM_getValue("decalagehoraire", 0));
	return aujth.getDate() + "/" + (aujth.getMonth()+1) + "/" + aujth.getFullYear() + "/" + (aujth.getHours() < 14 ? 1 : 2);
}

function decalH(decalParis)
{
	var dateauj = new Date();
	GM_setValue("decalagehoraire", 3600000 * (decalParis + dateauj.getTimezoneOffset()/60));
	calcauj(dateauj);
}

function calcauj(dateauj)
{
	dateauj = new Date(Date.parse(dateauj) + GM_getValue("decalagehoraire", 0));
	var numconnect = dateauj.getHours() < 14 ? 1 : 2;
	dateauj = dateauj.getDate() + "/" + (dateauj.getMonth() + 1) + "/" + dateauj.getFullYear();
	var oldauj = GM_getValue("aujourd_hui", "");
	var dateoldauj = oldauj != "" ? oldauj.substring(0, oldauj.lastIndexOf("/")) : "";
	aujourd_hui = dateauj + "/" + numconnect;
	if (oldauj != aujourd_hui)
	{	GM_deleteValue("debug");
		window.name = "";
		var id;
		if (dateauj == dateoldauj)
		{	for (id=0;id<tab_zoo.length;id++)
			{	dateConnexion = GM_getValue("dateConnexion_"+id, "");
				dateC = dateConnexion.indexOf("b") != -1 ? dateConnexion.substring(0, dateConnexion.indexOf("b")) : dateConnexion;
				if (dateC == oldauj)
				{	oldM = "#" + dateConnexion.substring(dateConnexion.lastIndexOf("/")+1) + "%";
					creeMAJold(id, oldM);
				}
			}
		}
		else
			for (id=0;id<tab_zoo.length;id++) suppMAJold(id);
		GM_setValue("aujourd_hui", aujourd_hui);
		mise_a_jour();
	}
	var olddh = $("patience").parentNode.removeChild($("patience"));
}

function decalH1()
{
	patience("Connexion");
	GM_xmlhttpRequest(
	{	method: "POST",
		url: "http://montdm.shost.ca/ScriptMonZoo/horaire.php",
		data: "",
		timeout: 1000,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		ontimeout: function(result) { decalH2(); },
		onload: function(result) { decalH(parseInt(new String(result.responseText))/3600); }
	});
}

function decalH2()
{
	GM_xmlhttpRequest(
	{	method: "POST",
		url: "http://www.horlogeparlante.com/",
		data: "",
		timeout: 1000,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		ontimeout: function(result) { decalH3(); },
		onload: function(result)
		{	var extrait = new String(result.responseText);
			extrait = extrait.substring(extrait.indexOf("GMT</abbr"));
			extrait = extrait.substring(extrait.indexOf("</a>")+4);
			decalH(parseInt(extrait.substring(0,extrait.indexOf(":")).replace(" ", "", "g")));
		}
	});
}

function decalH3()
{
	GM_xmlhttpRequest(
	{	method: "POST",
		url: "http://24timezones.com/fr_temps/paris_temps_local.php",
		data: "",
		timeout: 1000,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		ontimeout: function(result) { calcauj(new Date()); },
		onload: function(result)
		{	var extrait = new String(result.responseText);
			extrait = extrait.substring(extrait.indexOf("horaire actuel:"));
			extrait = extrait.substring(extrait.indexOf("UTC/GMT")+8);
			decalH(parseInt(extrait.substring(0,extrait.indexOf("heure")).trim()));
		}
	});
}





// début du script
var urlSite = 'http://www.monzoo.net/', jscr, stopscr = false;
var nom_zoo, id_zoo, num_zoo, monzoo, exist, bad;
var newdiv, newdiv2, avant, apres, reactualiser;
var oldwindow = GM_getValue("windowname", ":0");
if (window.name == "")
{	var newwindow = parseInt(oldwindow.substring(oldwindow.lastIndexOf(":")+1)) + 1;
	GM_setValue("windowname", oldwindow + ":" + newwindow);
	window.name = new String(newwindow);
}
else if (parseInt(window.name) > parseInt(oldwindow.substring(oldwindow.lastIndexOf(":")+1)))
	GM_setValue("windowname", oldwindow + ":" + window.name);
if (GM_getValue("constructionenclos", "") == window.name) GM_deleteValue("constructionenclos");
var scan = GM_getValue("scan", false); // si true, on est entrain de scanner tous les enclos
var deb, pas, pasx, jmax, iclic, extrait, extrait2, moyenne, moyenne2, dategr, max2, hy, XX, YY, nb_points, typerepartition, oldScr, scrMax, scrOui;
var tab_suivi = new Array(), imax, largeurgraphique, hauteurgraphique, hauteurgraphique1, hauteurgraphique2;
var tab_suiviav = new Array(), imaxav;
var tab_suivicl = new Array(), imaxcl;
var tab_suiviclm = new Array(), imaxclm;
var mingr = new decompose("1/1/2010:-1/-1/-1/-1,-1/-1,-1/-1,-1/-1,-1/-1");
var maxgr = new decompose("1/1/2010:-1/-1/-1/-1,-1/-1,-1/-1,-1/-1,-1/-1");
var mingrav = new decompose2("1/1/2011:-1/-1");
var maxgrav = new decompose2("1/1/2011:-1/-1");
var mingrcl = new decompose3("1/1/2011:-1/-1/-1/-1/-1/-1");
var maxgrcl = new decompose3("1/1/2011:-1/-1/-1/-1/-1/-1");
var mingrclm = new decompose4("1/1/2013:-1/-1");
var maxgrclm = new decompose4("1/1/2013:-1/-1");
var aujourd_hui = GM_getValue("aujourd_hui", ""), dateConnexion, dateC, oldM;
var tab_zoo = unserialize(GM_getValue("liste_zoo", "")); // liste des zoos sur ce PC
GM_deleteValue("rapport"); // si en cours de jeu la variable existe, c'est qu'on est sur la page rapport
GM_deleteValue("suivi"); // si en cours de jeu la variable existe, c'est qu'on est sur la page suivi
GM_addStyle(".info_bulle {border:3px solid #000;border-radius:10px;z-index:40;display:block;position:fixed;background-color:#FADFB0;" +
	"padding:3px;font-family:garamond arial sans serif;font-size:12px}");
GM_addStyle("#options {width:465px;overflow-y:auto;z-index:100}" +
	"#options h4{color:#B86242;margin-top:8px;margin-bottom:2px}");
GM_addStyle(".bloc_rapport {width:100%;margin:4px;text-align:center}");
GM_addStyle(".bloc_rapport h6{font-size:16px;margin:4px;text-decoration:underline;color:#000}");
GM_addStyle(".bloc_rapport h5{font-size:13px;margin:4px;text-decoration:underline;color:#000}");
GM_addStyle(".bloc_rapport span{font-weight:bold;font-size:11px}");
GM_addStyle(".bloc_rapport span a{font-size:11px;margin:8px}");
GM_addStyle(".separateur {width:50%;margin-top:20px;margin-bottom:20px}");
GM_addStyle(".bonus {color:#1bb86c}" +
	".cher {color:#2732c7}" +
	".albinos {color:#31b9E4}" +
	".attention {color:#FA2104}");
GM_addStyle(".filtre {background-color:#B86242}");
GM_addStyle(".manquante {background-color:#f44;color:#fff}");
GM_addStyle(".filtre_mâle {background-color:#8888FF}");
GM_addStyle(".filtre_femelle {background-color:#FF8888}");
GM_addStyle(".animal {float:left;width:92px;border:2px solid #FADFB0}");
GM_addStyle(".selmis {background-color:#B86242;color:#fff4d0}");
GM_addStyle(".nselmis {background-color:#FAEFDB;color:#634425}");
GM_addStyle("#animaux_enclos {padding:2px;padding-right:6px;font-size:11px;cursor:default;overflow-y:auto}" +
	"#liste_animaux {border-collapse:collapse;text-align:center;border:1px solid #000;font-weight:bold}" +
	"#liste_animaux .sel{background-color:#B86242;color:#fff4d0}" +
	"#liste_animaux .nsel{cursor:pointer;color:#000;height:24px;}" +
	"#liste_animaux .nsel2{color:#000;height:24px}" +
	"#liste_animaux td, #liste_animaux th{border:1px solid #000;padding:1px 2px;}" +
	"#liste_animaux .titre{cursor:pointer;text-align:center;font-size:11px;color:#000;}" +
	"#liste_animaux .titre2{cursor:pointer;text-align:center;font-size:11px;background-color:#B86242;color:#fff4d0;}" +
	"#liste_animaux .titre3{text-align:center;font-size:11px;}" +
	"#liste_animaux .titre4{text-align:center;font-size:11px;background-color:#B86242;color:#fff4d0;}" +
	"#liste_animaux .mâle{font-family:Arial;font-size:11px;color:#394AE2;text-align:center;width:24px}" +
	"#liste_animaux .femelle{font-family:Arial;font-size:11px;color:#A016ba;text-align:center;width:24px}" +
	"#liste_animaux .mâle span, #liste_animaux .femelle span{font-size:10px;font-weight:normal}" +
	"#liste_animaux .trop{background-color:#CCC}" +
	"#liste_animaux tr.desequilibre{background-color:#F7C992}" +
	"#liste_animaux td.animourant{background-color:#f00}" +
	"#liste_animaux td.animourant2{background-color:#f66}" +
	"#liste_animaux td.aninaiss{background-color:#BD0}" +
	"#liste_animaux td.aninaiss2{background-color:#8A2}");
if (parseInt(GM_getValue("afficheadulte", 3)) == 5) GM_addStyle("#liste_animaux .averif{background-color:#BD0}");
GM_addStyle("#enclosavoir {padding:3px;font-size:11px;position:fixed;cursor:default;overflow-y:auto}");
GM_addStyle("#tableau_vieux {padding:2px;padding-right:6px;font-size:11px;position:fixed;cursor:default;overflow-y:auto}" +
	"#liste_vieux1 {border-collapse:collapse;text-align:center;border:1px solid #000;background-color:#FADFB0;font-weight:bold}" +
	"#liste_vieux1 td, #liste_vieux1 th{border:1px solid #000;padding:1px 2px}" +
	"#liste_vieux1 th{background-color:#eac893;height:30px}" +
	"#liste_vieux1 tr.savane{background-color:#FEE58C}" +
	"#liste_vieux1 tr.bassin{background-color:#8AC3FF}" +
	"#liste_vieux1 tr.terre{background-color:#98E586}" +
	"#liste_vieux1 tr.forêt{background-color:#6BD949}" +
	"#liste_vieux1 tr.volière{background-color:#FAFFFE}" +
	"#liste_vieux1 tr.aquarium{background-color:#A1E9FF}" +
	"#liste_vieux1 tr.vivarium{background-color:#CBBE7C}" +
	"#liste_vieux1 tr.noctarium{background-color:#A4C0BD}" +
	"#liste_vieux1 tr.insectarium{background-color:#FFFB3F}" +
	"#liste_vieux1 .mâle{font-family:Arial;font-size:11px;color:#394AE2;text-align:center;width:24px}" +
	"#liste_vieux1 .femelle{font-family:Arial;font-size:11px;color:#A016ba;text-align:center;width:24px}" +
	"#liste_vieux1 .mâle span, #liste_vieux1 .femelle span{font-size:10px;font-weight:normal}" +
	"#liste_vieux2 {border-collapse:collapse;text-align:center;border:1px solid #000;background-color:#FADFB0;font-weight:bold;}" +
	"#liste_vieux2 td, #liste_vieux2 th{border:1px solid #000;padding:1px 2px;}" +
	"#liste_vieux2 th{background-color:#eac893;height:30px}" +
	"#liste_vieux2 tr.savane{background-color:#FEE58C}" +
	"#liste_vieux2 tr.bassin{background-color:#8AC3FF}" +
	"#liste_vieux2 tr.terre{background-color:#98E586}" +
	"#liste_vieux2 tr.forêt{background-color:#6BD949}" +
	"#liste_vieux2 tr.volière{background-color:#FAFFFE}" +
	"#liste_vieux2 tr.aquarium{background-color:#A1E9FF}" +
	"#liste_vieux2 tr.vivarium{background-color:#CBBE7C}" +
	"#liste_vieux2 tr.noctarium{background-color:#A4C0BD}" +
	"#liste_vieux2 tr.insectarium{background-color:#FFFB3F}" +
	"#liste_vieux2 .mâle{font-family:Arial;font-size:11px;color:#394AE2;text-align:center;width:24px}" +
	"#liste_vieux2 .femelle{font-family:Arial;font-size:11px;color:#A016ba;text-align:center;width:24px}" +
	"#liste_vieux2 .mâle span, #liste_vieux2 .femelle span{font-size:10px;font-weight:normal}" +
	"#liste_vieux3 {border-collapse:collapse;text-align:center;border:1px solid #000;background-color:#FADFB0;font-weight:bold;}" +
	"#liste_vieux3 td, #liste_vieux3 th{border:1px solid #000;padding:1px 2px;}" +
	"#liste_vieux3 th{background-color:#eac893;height:30px}" +
	"#liste_vieux3 tr.savane{background-color:#FEE58C}" +
	"#liste_vieux3 tr.bassin{background-color:#8AC3FF}" +
	"#liste_vieux3 tr.terre{background-color:#98E586}" +
	"#liste_vieux3 tr.forêt{background-color:#6BD949}" +
	"#liste_vieux3 tr.volière{background-color:#FAFFFE}" +
	"#liste_vieux3 tr.aquarium{background-color:#A1E9FF}" +
	"#liste_vieux3 tr.vivarium{background-color:#CBBE7C}" +
	"#liste_vieux3 tr.noctarium{background-color:#A4C0BD}" +
	"#liste_vieux3 tr.insectarium{background-color:#FFFB3F}" +
	"#liste_vieux3 .mâle{font-family:Arial;font-size:11px;color:#394AE2;text-align:center;width:24px}" +
	"#liste_vieux3 .femelle{font-family:Arial;font-size:11px;color:#A016ba;text-align:center;width:24px}" +
	"#liste_vieux3 .mâle span, #liste_vieux3 .femelle span{font-size:10px;font-weight:normal}");
GM_addStyle("#tableau_animaux {padding:2px;padding-right:6px;font-size:11px;position:fixed;cursor:default;overflow-y:auto;}" +
	"#liste_anim1 {border-collapse:collapse;text-align:center;border:1px solid #000;background-color:#FADFB0;font-weight:bold;}" +
	"#liste_anim1 td, #liste_anim1 th{border:1px solid #000;padding:1px 2px;}" +
	"#liste_anim1 th{background-color:#eac893;height:30px}" +
	"#liste_anim1 tr.savane{background-color:#FEE58C}" +
	"#liste_anim1 tr.bassin{background-color:#8AC3FF}" +
	"#liste_anim1 tr.terre{background-color:#98E586}" +
	"#liste_anim1 tr.forêt{background-color:#6BD949}" +
	"#liste_anim1 tr.volière{background-color:#FAFFFE}" +
	"#liste_anim1 tr.aquarium{background-color:#A1E9FF}" +
	"#liste_anim1 tr.vivarium{background-color:#CBBE7C}" +
	"#liste_anim1 tr.noctarium{background-color:#A4C0BD}" +
	"#liste_anim1 tr.insectarium{background-color:#FFFB3F}" +
	"#liste_anim1 .mâle{font-family:Arial;font-size:11px;color:#394AE2;text-align:center;width:24px}" +
	"#liste_anim1 .femelle{font-family:Arial;font-size:11px;color:#A016ba;text-align:center;width:24px}" +
	"#liste_anim2 {border-collapse:collapse;text-align:center;border:1px solid #000;background-color:#FADFB0;font-weight:bold;}" +
	"#liste_anim2 td, #liste_anim2 th{border:1px solid #000;padding:1px 2px;}" +
	"#liste_anim2 th{background-color:#eac893;height:30px}" +
	"#liste_anim2 tr.savane{background-color:#FEE58C}" +
	"#liste_anim2 tr.bassin{background-color:#8AC3FF}" +
	"#liste_anim2 tr.terre{background-color:#98E586}" +
	"#liste_anim2 tr.forêt{background-color:#6BD949}" +
	"#liste_anim2 tr.volière{background-color:#FAFFFE}" +
	"#liste_anim2 tr.aquarium{background-color:#A1E9FF}" +
	"#liste_anim2 tr.vivarium{background-color:#CBBE7C}" +
	"#liste_anim2 tr.noctarium{background-color:#A4C0BD}" +
	"#liste_anim2 tr.insectarium{background-color:#FFFB3F}" +
	"#liste_anim2 .mâle{font-family:Arial;font-size:11px;color:#394AE2;text-align:center;width:24px}" +
	"#liste_anim2 .femelle{font-family:Arial;font-size:11px;color:#A016ba;text-align:center;width:24px}" +
	"#liste_anim3 {border-collapse:collapse;text-align:center;border:1px solid #000;background-color:#FADFB0;font-weight:bold;}" +
	"#liste_anim3 td, #liste_anim3 th{border:1px solid #000;padding:1px 2px;}" +
	"#liste_anim3 th{background-color:#eac893;height:30px}" +
	"#liste_anim3 tr.savane{background-color:#FEE58C}" +
	"#liste_anim3 tr.bassin{background-color:#8AC3FF}" +
	"#liste_anim3 tr.terre{background-color:#98E586}" +
	"#liste_anim3 tr.forêt{background-color:#6BD949}" +
	"#liste_anim3 tr.volière{background-color:#FAFFFE}" +
	"#liste_anim3 tr.aquarium{background-color:#A1E9FF}" +
	"#liste_anim3 tr.vivarium{background-color:#CBBE7C}" +
	"#liste_anim3 tr.noctarium{background-color:#A4C0BD}" +
	"#liste_anim3 tr.insectarium{background-color:#FFFB3F}" +
	"#liste_anim3 .mâle{font-family:Arial;font-size:11px;color:#394AE2;text-align:center;width:24px}" +
	"#liste_anim3 .femelle{font-family:Arial;font-size:11px;color:#A016ba;text-align:center;width:24px}" +
	"#liste_anim4 {border-collapse:collapse;text-align:center;border:1px solid #000;background-color:#FADFB0;font-weight:bold;}" +
	"#liste_anim4 td, #liste_anim4 th{border:1px solid #000;padding:1px 2px;}" +
	"#liste_anim4 th{background-color:#eac893;height:30px}" +
	"#liste_anim4 tr.savane{background-color:#FEE58C}" +
	"#liste_anim4 tr.bassin{background-color:#8AC3FF}" +
	"#liste_anim4 tr.terre{background-color:#98E586}" +
	"#liste_anim4 tr.forêt{background-color:#6BD949}" +
	"#liste_anim4 tr.volière{background-color:#FAFFFE}" +
	"#liste_anim4 tr.aquarium{background-color:#A1E9FF}" +
	"#liste_anim4 tr.vivarium{background-color:#CBBE7C}" +
	"#liste_anim4 tr.noctarium{background-color:#A4C0BD}" +
	"#liste_anim4 tr.insectarium{background-color:#FFFB3F}" +
	"#liste_anim4 .mâle{font-family:Arial;font-size:11px;color:#394AE2;text-align:center;width:24px}" +
	"#liste_anim4 .femelle{font-family:Arial;font-size:11px;color:#A016ba;text-align:center;width:24px}");
GM_addStyle("#lien_enclos {padding:3px;font-size:9px;position:fixed;overflow-y:auto;z-index:40}" +
	"#liste_enclos1 {border-collapse:collapse;border:3px double #000;font-weight:bold;}" +
	"#liste_enclos1 td{border:1px solid #000;padding:1px 2px;text-align:center;}" +
	"#liste_enclos1 td.manque{border:1px solid #000;padding:1px 2px;text-align:center;color:#B86242;cursor:help;}" +
	"#liste_enclos1 .avoir{background-color:#CCC;}" +
	"#liste_enclos1 .encours{background-color:#B86242;color:#FFF}" +
	"#liste_enclos1 a.encours{color:#FFF;}" +
	"#liste_enclos1 .separe{border-top:3px double;}" +
	"#liste_enclos2 {border-collapse:collapse;border:3px double #000;font-weight:bold;}" +
	"#liste_enclos2 td{border:1px solid #000;padding:1px;text-align:center;}" +
	"#liste_enclos2 td.manque{border:1px solid #000;padding:1px;text-align:center;color:#B86242;cursor:help;}" +
	"#liste_enclos2 .avoir{background-color:#CCC;}" +
	"#liste_enclos2 .encours{background-color:#B86242;color:#FFF}" +
	"#liste_enclos2 a.encours{color:#FFF;}" +
	"#liste_enclos2 .separe{border-top:3px double;}");
GM_addStyle("#lien_autres {padding:3px;font-size:12px;position:fixed;overflow-y:auto;;z-index:40}" +
	"#autres {border-collapse:collapse;border:3px double #000;font-weight:bold}" +
	"#autres td{border:1px solid #000;padding:1px 2px;text-align:center}" +
	"#autres .rapport{color:#634425}" +
	"#autres .separe{border-top:3px double #000}" +
	"#mespoints {cursor:pointer}" +
	"#prestige {cursor:pointer}" +
	"#mensuel {cursor:pointer}" +
	"#rapportlien {cursor:pointer}" +
	"#suivilien {cursor:pointer}" +
	"#mateam {cursor:pointer}");
GM_addStyle("#lien_deplacement {padding:3px;font-size:13px;position:fixed}" +
	"#deplacement {border-collapse:collapse;border:3px double #000;font-weight:bold}" +
	"#deplacement td{border:1px solid #000;padding:1px 2px;text-align:center}");
GM_addStyle("#enclos_naissances {padding:3px;font-size:13px;position:fixed;overflow-y:auto}" +
	"#tenclosnaissance {border-collapse:collapse;border:3px double #000;font-weight:bold;width:100%}" +
	"#tenclosnaissance td{border:1px solid #000;padding:1px 2px;text-align:center}");
GM_addStyle(".fenetre {border:3px solid #000;-moz-border-radius:10px;z-index:90;display:block;position:absolute;background-color:#EEF1F1;" +
		"padding:5px;font-family:garamond arial sans serif;font-size:12px}");
GM_addStyle("#lien_forum {padding:3px;font-size:14px;position:fixed}" +
	"#forum {border-collapse:collapse;border:3px double #000;background-color:#F2F6F6;font-weight:bold}" +
	"#forum td{border:1px solid #000;padding:1px 2px;text-align:center}");
var largeur_ecran = window.innerWidth;
_left = (largeur_ecran - 550) / 2;
_left2 = (largeur_ecran - 500) / 2;
_left3 = (largeur_ecran - 350) / 2;
_left4 = (largeur_ecran - 400) / 2;
GM_addStyle("#badcarac {top:50px;left:" + _left2 + "px;width:500px;z-index:70;background-color:#FADFB0}");
GM_addStyle("#attraction {top:25px;left:" + _left + "px;width:550px;z-index:60;background-color:#FADFB0}");
GM_addStyle("#vol {top:25px;left:" + _left4 + "px;width:400px;z-index:50;background-color:#FADFB0}");
GM_addStyle("#idtrop {top:35px;left:" + _left + "px;width:550px;z-index:50;background-color:#FADFB0}");
GM_addStyle("#idtrop h4{margin-top:16px;margin-bottom:2px}");
GM_addStyle("#idmourant {top:35px;left:" + _left4 + "px;width:400px;z-index:50;background-color:#FADFB0}");
GM_addStyle("#idmourant h4{margin-top:16px;margin-bottom:2px}");
GM_addStyle("#nonluxe {top:50px;left:" + _left4 + "px;width:400px;z-index:50;background-color:#FADFB0}");
GM_addStyle("#conseil {top:35px;left:" + _left2 + "px;width:500px;z-index:50;background-color:#FADFB0}");
GM_addStyle("#tornade {top:50px;left:" + _left4 + "px;width:400px;z-index:50;background-color:#FADFB0}");
GM_addStyle("#ndefi {top:50px;left:" + _left4 + "px;width:400px;z-index:50;background-color:#FADFB0}");
GM_addStyle("#iddefi {top:50px;left:" + _left4 + "px;width:400px;z-index:50;background-color:#FADFB0}");
GM_addStyle("#oeuf {top:50px;left:" + _left3 + "px;width:350px;z-index:50;background-color:#FADFB0}");
GM_addStyle("#paul {top:50px;left:" + _left3 + "px;width:350px;z-index:50;background-color:#FADFB0}");
GM_addStyle("#news {top:50px;left:" + _left3 + "px;width:350px;z-index:50;background-color:#FADFB0}");
GM_addStyle("#retmess {top:50px;left:" + _left3 + "px;width:350px;z-index:50;background-color:#FADFB0}");
GM_addStyle("#trouvebonus {top:50px;left:" + _left4 + "px;width:400px;z-index:50;background-color:#FADFB0}");
GM_addStyle(".bloc_graphe{width:100%;margin:4px;text-align:center;position:relative;font-size:12px}");
GM_addStyle(".naissance {border:2px solid #0f0}");
GM_addStyle(".mourant {border:2px solid #f00}");
GM_addStyle(".vieux {border:2px solid #00f}");
_left = (largeur_ecran - 250) / 2;
GM_addStyle("#patience {top:40px;left:" + _left + "px;width:250px;position:fixed;text-align:center}");
GM_addStyle(".rapport_forum {cursor:pointer;float:left;margin-right:10px;font-size:10px;font-weight:bold}" +
	".rapport_forum a {color:#BB00BB}" +
	".rapport_forum a:hover {color:magenta}");

var ANIMAUX = new Array();ANIMAUX['shagya criniere de feu'] = new Animal(1000000, 'Terre');ANIMAUX['markhor'] = new Animal(950000, 'Terre');
ANIMAUX['colocolo'] = new Animal(900000, 'Forêt', '', '', 0, true);
ANIMAUX['dauphin d hector'] = new Animal(800000, 'Bassin');ANIMAUX['dugong'] = new Animal(750000, 'Bassin');ANIMAUX['dendrobate a ventre tachete'] = new Animal(700000, 'Terre');
ANIMAUX['tigre blanc'] = new Animal(500000, 'Forêt', '', '', 1);ANIMAUX['hippocampe divin'] = new Animal(500000, 'Aquarium', true);
ANIMAUX['gorfou a crete'] = new Animal(500000, 'Bassin');ANIMAUX['lycaon'] = new Animal(450000, 'Savane', '', '', 1);
ANIMAUX['lycaon'] = new Animal(450000, 'Savane', '', '', 1);ANIMAUX['phoque'] = new Animal(400000, 'Bassin');ANIMAUX['saiga'] = new Animal(400000, 'Savane');
ANIMAUX['loup rouge'] = new Animal(400000, 'Forêt', '', '', 2);ANIMAUX['douc a queue rayee'] = new Animal(400000, 'Forêt');
ANIMAUX['rhinopitheque de chine'] = new Animal(390000, 'Forêt');ANIMAUX['panda'] = new Animal(350000, 'Forêt');ANIMAUX['once'] = new Animal(350000, 'Terre', '', '', 3);
ANIMAUX['sasquatch'] = new Animal(350000, 'Forêt', true, '', 3);ANIMAUX['poisson clown divin'] = new Animal(350000, 'Aquarium');
ANIMAUX['lamentin'] = new Animal(340000, 'Bassin');ANIMAUX['beluga'] = new Animal(300000, 'Bassin', '', '', 3);ANIMAUX['tamandua'] = new Animal(300000, 'Forêt', '', '', 0, true);
ANIMAUX['crabe percussionniste'] = new Animal(300000, 'Aquarium');ANIMAUX['hyene'] = new Animal(300000, 'Savane', '', '', 1);ANIMAUX['casoar'] = new Animal(300000, 'Forêt');
ANIMAUX['narval'] = new Animal(300000, 'Bassin', true);ANIMAUX['fossa'] = new Animal(275000, 'Forêt', '', '', 9);ANIMAUX['koala'] = new Animal(250000, 'Forêt');
ANIMAUX['ange royal'] = new Animal(250000, 'Aquarium');ANIMAUX['dik dik zebre'] = new Animal(245000, 'Savane');ANIMAUX['unau'] = new Animal(230000, 'Forêt');
ANIMAUX['dragon de komodo'] = new Animal(230000, 'Vivarium');ANIMAUX['fugu'] = new Animal(225000, 'Aquarium');ANIMAUX['serpent nasique'] = new Animal(225000, 'Vivarium', true);
ANIMAUX['komondor'] = new Animal(215000, 'Terre', '', '', 0, true);ANIMAUX['libellule deesse precieuse'] = new Animal(200000, 'Insectarium', '', '', 0, true);
ANIMAUX['guepard'] = new Animal(200000, 'Savane', '', '', 2);ANIMAUX['caracal'] = new Animal(200000, 'Savane', '', '', 4);
ANIMAUX['panda roux'] = new Animal(200000, 'Forêt');ANIMAUX['ours rastafarai'] = new Animal(200000, 'Bassin', true);
ANIMAUX['olinguito'] = new Animal(190000, 'Noctarium');
ANIMAUX['dendrobate fraise'] = new Animal(185000, 'Terre');ANIMAUX['espadon'] = new Animal(176000, 'Aquarium');
ANIMAUX['ours polaire'] = new Animal(175000, 'Bassin', '', '', 4);ANIMAUX['tuit tuit'] = new Animal(175000, 'Volière', '', '', 0, true);
ANIMAUX['touraco de schalow'] = new Animal(175000, 'Volière', '', '', 0, true);ANIMAUX['diable de tasmanie'] = new Animal(175000, 'Noctarium');
ANIMAUX['mandrill'] = new Animal(170000, 'Forêt', '', '', 5);ANIMAUX['calao buffle'] = new Animal(170000, 'Volière');
ANIMAUX['toucan bec sanglant'] = new Animal(150000, 'Terre');ANIMAUX['meduse des bermudes'] = new Animal(150000, 'Aquarium');
ANIMAUX['grizzly'] = new Animal(150000, 'Forêt', '', '', 6);ANIMAUX['salamandre de feu'] = new Animal(145000, 'Noctarium');ANIMAUX['anaconda'] = new Animal(142000, 'Vivarium');
ANIMAUX['ibis sacre'] = new Animal(140000, 'Volière');ANIMAUX['paon bleu'] = new Animal(135000, 'Terre');ANIMAUX['marsouin argente'] = new Animal(133000, 'Bassin');
ANIMAUX['kakapo'] = new Animal(133000, 'Noctarium');ANIMAUX['tigre'] = new Animal(125000, 'Forêt', '', '', 1);ANIMAUX['hemione'] = new Animal(115000, 'Terre');
ANIMAUX['napoleon'] = new Animal(110000, 'Aquarium');ANIMAUX['tarsier'] = new Animal(110000, 'Noctarium');
ANIMAUX['requin nourrice'] = new Animal(105000, 'Bassin', '', '', 1);ANIMAUX['dunnart castor'] = new Animal(104000, 'Noctarium');
ANIMAUX['lion'] = new Animal(100000, 'Savane', '', '', 3);ANIMAUX['lion albinos'] = new Animal(200000, 'Savane', true, '', 3);
ANIMAUX['scorpion aiguille ecarlate'] = new Animal(100000, 'Vivarium');ANIMAUX['condor des andes'] = new Animal(95000, 'Volière');
ANIMAUX['requin marteau'] = new Animal(95000, 'Bassin', '', '', 1);ANIMAUX['hermine'] = new Animal(94000, 'Terre');ANIMAUX['raton laveur'] = new Animal(90000, 'Forêt');
ANIMAUX['pingouin'] = new Animal(90000, 'Terre');ANIMAUX['cameleon luminophore'] = new Animal(90000, 'Vivarium');
ANIMAUX['criquet du mato grosso'] = new Animal(85000, 'Insectarium');ANIMAUX['phalanger renard'] = new Animal(85000, 'Noctarium');
ANIMAUX['python royal'] = new Animal(83000, 'Vivarium');ANIMAUX['loup blanc'] = new Animal(80000, 'Forêt', '', '', 2);
ANIMAUX['caribou de noel'] = new Animal(79000, 'Forêt', true);ANIMAUX['mygale geante asiatique'] = new Animal(75000, 'Vivarium');
ANIMAUX['calamar geant'] = new Animal(75000, 'Aquarium');ANIMAUX['alpaga'] = new Animal(75000, 'Terre', '', '', 0, true);
ANIMAUX['muscardin'] = new Animal(74000, 'Noctarium');ANIMAUX['muscardin albinos'] = new Animal(148000, 'Noctarium', true);
ANIMAUX['perlinsky'] = new Animal(73000, 'Terre');ANIMAUX['axolotl'] = new Animal(72000, 'Aquarium', '', '', 0, true);
ANIMAUX['oryx'] = new Animal(72000, 'Savane');ANIMAUX['faisan dore'] = new Animal(72000, 'Volière');ANIMAUX['fennec'] = new Animal(70000, 'Savane');
ANIMAUX['orque'] = new Animal(70000, 'Bassin', '', '', 2);ANIMAUX['ouistiti'] = new Animal(70000, 'Forêt');ANIMAUX['ibis rouge'] = new Animal(70000, 'Volière');
ANIMAUX['messager sagittaire'] = new Animal(70000, 'Volière');ANIMAUX['mamba noir'] = new Animal(68000, 'Vivarium');
ANIMAUX['scorpion coton du mexique'] = new Animal(65000, 'Vivarium');ANIMAUX['chouette leptogramme'] = new Animal(63000, 'Noctarium', '', '', 0, true);
ANIMAUX['raie lunaire'] = new Animal(62500, 'Aquarium');ANIMAUX['paul le poulpe'] = new Animal(62000, 'Aquarium', true);
ANIMAUX['dauphin'] = new Animal(60000, 'Bassin');ANIMAUX['jaseur boreal'] = new Animal(60000, 'Volière', '', '', 0, true);
ANIMAUX['dauphin albinos'] = new Animal(120000, 'Bassin', true);ANIMAUX['massasauga argente'] = new Animal(60000, 'Vivarium');
ANIMAUX['orang outan'] = new Animal(57000, 'Forêt', '', '', 10);ANIMAUX['puma'] = new Animal(57000, 'Forêt', '', '', 8);
ANIMAUX['caribou'] = new Animal(55000, 'Forêt');ANIMAUX['tortue geante'] = new Animal(55000, 'Terre');ANIMAUX['elaphe noir'] = new Animal(55000, 'Vivarium');
ANIMAUX['papillon du crepuscule'] = new Animal(55000, 'Volière');ANIMAUX['chimpanze zombie'] = new Animal(55000, 'Forêt', true);
ANIMAUX['musaraigne elephant'] = new Animal(54000, 'Noctarium');ANIMAUX['heron agami'] = new Animal(53000, 'Terre');
ANIMAUX['mamba rouge'] = new Animal(52000, 'Vivarium');ANIMAUX['tapir'] = new Animal(50000, 'Forêt');ANIMAUX['kangourou'] = new Animal(50000, 'Savane');
ANIMAUX['kangourou albinos'] = new Animal(100000, 'Savane', true);ANIMAUX['husky'] = new Animal(49000, 'Forêt', '', '', 2);
ANIMAUX['hippocampe lumineux'] = new Animal(49000, 'Aquarium');ANIMAUX['renard polaire'] = new Animal(48000, 'Terre', '', '', 2);
ANIMAUX['effraie des clochers'] = new Animal(48000, 'Noctarium');ANIMAUX['copris lunaire'] = new Animal(47000, 'Insectarium');
ANIMAUX['requin bleu'] = new Animal(45000, 'Bassin', '', '', 1);ANIMAUX['elephant rose'] = new Animal(45000, 'Savane', true);
ANIMAUX['tatou'] = new Animal(45000, 'Terre');ANIMAUX['raie des sables'] = new Animal(45000, 'Aquarium');ANIMAUX['ara pyrodactile'] = new Animal(45000, 'Volière');
ANIMAUX['tortue caouanne'] = new Animal(42000, 'Bassin');ANIMAUX['cameleon allumette'] = new Animal(41000, 'Vivarium');
ANIMAUX['cervicapre'] = new Animal(40000, 'Savane');ANIMAUX['panthere noire'] = new Animal(40000, 'Forêt', '', '', 4);
ANIMAUX['iguane vert'] = new Animal(39000, 'Vivarium');ANIMAUX['iguane vert albinos'] = new Animal(78000, 'Vivarium', true);
ANIMAUX['poulpe a anneaux bleus'] = new Animal(36000, 'Aquarium');ANIMAUX['mante religieuse'] = new Animal(35500, 'Insectarium');
ANIMAUX['lynx'] = new Animal(35000, 'Forêt', '', '', 7);ANIMAUX['kiwi'] = new Animal(35000, 'Noctarium');
ANIMAUX['coq patriote'] = new Animal(35000, 'Volière', true);ANIMAUX['quetzal'] = new Animal(35000, 'Volière', '', '', 0, true);
ANIMAUX['tarentule rosea'] = new Animal(35000, 'Vivarium');ANIMAUX['hibou grand duc'] = new Animal(34000, 'Noctarium');
ANIMAUX['panthere'] = new Animal(32500, 'Forêt', '', '', 4);ANIMAUX['canard mandarin'] = new Animal(32000, 'Terre', '', '', 0, true);
ANIMAUX['morse'] = new Animal(32000, 'Bassin');ANIMAUX['poisson clown sable'] = new Animal(32000, 'Aquarium');ANIMAUX['dendrobate bleu'] = new Animal(30000, 'Terre');
ANIMAUX['elephant'] = new Animal(30000, 'Savane');ANIMAUX['raie furtive'] = new Animal(30000, 'Aquarium');ANIMAUX['ara ararauna'] = new Animal(30000, 'Volière');
ANIMAUX['gerenuk'] = new Animal(29000, 'Savane', true);ANIMAUX['abeille'] = new Animal(29000, 'Insectarium');ANIMAUX['murene commune'] = new Animal(28000, 'Aquarium');
ANIMAUX['loup gris'] = new Animal(27500, 'Forêt', '', '', 2);ANIMAUX['vipere des dunes'] = new Animal(27000, 'Vivarium');
ANIMAUX['luciole'] = new Animal(26500, 'Insectarium');ANIMAUX['elan'] = new Animal(26000, 'Forêt');ANIMAUX['gavial'] = new Animal(26000, 'Terre', true, '', 4);
ANIMAUX['vigogne a bosses'] = new Animal(26000, 'Terre');ANIMAUX['girafe'] = new Animal(25000, 'Savane');
ANIMAUX['girafe albinos'] = new Animal(50000, 'Savane', true);ANIMAUX['hippocampe roux'] = new Animal(25000, 'Aquarium');
ANIMAUX['perroquet gris du gabon'] = new Animal(25000, 'Volière', '', '', 0, true);ANIMAUX['leopard de mer'] = new Animal(25000, 'Bassin');
ANIMAUX['blue dragon'] = new Animal(25000, 'Aquarium');
ANIMAUX['western pipistrelle'] = new Animal(24000, 'Noctarium');ANIMAUX['cobra royal'] = new Animal(23500, 'Vivarium');
ANIMAUX['gorille'] = new Animal(23000, 'Forêt', '', '', 3);ANIMAUX['gorille albinos'] = new Animal(46000, 'Forêt', true, '', 3);
ANIMAUX['papillon joyeux'] = new Animal(22500, 'Volière');ANIMAUX['dingo'] = new Animal(22000, 'Savane', '', '', 0, true);
ANIMAUX['buffle du cap'] = new Animal(22000, 'Savane');ANIMAUX['bison'] = new Animal(21000, 'Terre');ANIMAUX['chimpanze'] = new Animal(20000, 'Forêt');
ANIMAUX['tarentule infernale'] = new Animal(20000, 'Vivarium');ANIMAUX['phasme feuille de java'] = new Animal(20000, 'Insectarium', true, 'Phasme feuille de java');
ANIMAUX['sternocera aequisignata'] = new Animal(19500, 'Insectarium', '', '', 0, true);ANIMAUX['crocodile'] = new Animal(19500, 'Terre', '', '', 1);
ANIMAUX['crocodile albinos'] = new Animal(39000, 'Terre', true, '', 1);ANIMAUX['manchot empereur'] = new Animal(19000, 'Bassin');
ANIMAUX['lemming des toundras'] = new Animal(19000, 'Noctarium');ANIMAUX['lama'] = new Animal(19000, 'Terre');ANIMAUX['lemurien'] = new Animal(18500, 'Forêt');
ANIMAUX['hippopotame'] = new Animal(18500, 'Terre');ANIMAUX['ornithorynque'] = new Animal(18000, 'Terre');ANIMAUX['cameleon sanguin'] = new Animal(18000, 'Vivarium');
ANIMAUX['grand tetra'] = new Animal(18000, 'Volière');ANIMAUX['poisson clown'] = new Animal(17500, 'Aquarium');
ANIMAUX['boa constrictor'] = new Animal(17500, 'Vivarium');ANIMAUX['boa constrictor albinos'] = new Animal(35000, 'Vivarium', true);
ANIMAUX['zebre'] = new Animal(17000, 'Savane');ANIMAUX['castor'] = new Animal(17000, 'Terre');ANIMAUX['rhinoceros'] = new Animal(16000, 'Savane');
ANIMAUX['scorpion amazone'] = new Animal(16000, 'Vivarium');ANIMAUX['renard veloce'] = new Animal(15000, 'Terre', '', '', 2);
ANIMAUX['aigle royal'] = new Animal(15000, 'Volière');ANIMAUX['colombe'] = new Animal(15000, 'Volière', true);ANIMAUX['chamois'] = new Animal(15000, 'Forêt');
ANIMAUX['phasme baton du diable'] = new Animal(14500, 'Insectarium');ANIMAUX['otarie'] = new Animal(14000, 'Bassin');
ANIMAUX['raie ventouse'] = new Animal(14000, 'Aquarium');ANIMAUX['sanglier'] = new Animal(13000, 'Forêt');ANIMAUX['phacochere'] = new Animal(13000, 'Savane');
ANIMAUX['cardinal rouge'] = new Animal(12500, 'Volière', '', '', 0, true);
ANIMAUX['autruche'] = new Animal(12000, 'Savane');ANIMAUX['marmotte'] = new Animal(12000, 'Terre', '', '', 0, true);
ANIMAUX['dromadaire'] = new Animal(11000, 'Savane');ANIMAUX['loutre'] = new Animal(10000, 'Bassin');
ANIMAUX['poisson clown cuivre'] = new Animal(10000, 'Aquarium');ANIMAUX['aigle noir'] = new Animal(10000, 'Volière');
ANIMAUX['pelican'] = new Animal(9500, 'Terre');ANIMAUX['gypaete barbu'] = new Animal(9100, 'Volière');ANIMAUX['cygne'] = new Animal(9000, 'Terre');
ANIMAUX['crotale diamantin'] = new Animal(9000, 'Vivarium');ANIMAUX['bourdon terrestre'] = new Animal(9000, 'Insectarium');
ANIMAUX['chevre naine'] = new Animal(8000, 'Terre');ANIMAUX['barbotte nicoise'] = new Animal(7500, 'Aquarium');ANIMAUX['nautile'] = new Animal(7200, 'Aquarium');
ANIMAUX['flamant rose'] = new Animal(7000, 'Terre');ANIMAUX['ara fantome'] = new Animal(7000, 'Volière');
ANIMAUX['grabote de paques'] = new Animal(7000, 'Aquarium', true, "Grabote de Pâques");ANIMAUX['couleuvre agile'] = new Animal(6500, 'Vivarium');
ANIMAUX['gazelle'] = new Animal(6000, 'Savane');ANIMAUX['cameleon des roches'] = new Animal(6000, 'Vivarium');
ANIMAUX['cigogne blanche'] = new Animal(6000, 'Volière');ANIMAUX['fourmi rousse'] = new Animal(5600, 'Insectarium');
ANIMAUX['saumon rouge gorge'] = new Animal(5500, 'Aquarium');ANIMAUX['scorpion africain'] = new Animal(5400, 'Vivarium');
ANIMAUX['carpe ancestrale'] = new Animal(5000, 'Aquarium');ANIMAUX['mygale moderatum'] = new Animal(5000, 'Vivarium');
ANIMAUX['vautour imperial'] = new Animal(5000, 'Volière');ANIMAUX['colibri thalassin'] = new Animal(5000, 'Volière', true, "Colibri thalassin");
ANIMAUX['papillon du soleil'] = new Animal(4500, 'Volière');ANIMAUX['barbotte du mistral'] = new Animal(4000, 'Aquarium');
ANIMAUX['cobra perce roches'] = new Animal(3500, 'Vivarium');ANIMAUX['vautour cendre'] = new Animal(3500, 'Volière');
ANIMAUX['aigle antique'] = new Animal(3240, 'Volière');ANIMAUX['gecko poudre d or'] = new Animal(3000, 'Vivarium', true, "Gecko poudre d'or");
ANIMAUX['saumon banni'] = new Animal(3000, 'Aquarium');ANIMAUX['suricate'] = new Animal(3000, 'Savane', true, "Suricate");
ANIMAUX['carpe venimeuse'] = new Animal(3000, 'Aquarium');ANIMAUX['saumon ardent'] = new Animal(2500, 'Aquarium');
ANIMAUX['vautour des marais'] = new Animal(2500, 'Volière');ANIMAUX['coccinelle a 7 points'] = new Animal(2500, 'Insectarium', true, "Coccinelle à 7 points");
ANIMAUX['etoile de mer'] = new Animal(2500, 'Bassin', true, "Etoile de mer");ANIMAUX['barbotte de berlin'] = new Animal(2000, 'Aquarium');
ANIMAUX['herisson'] = new Animal(2000, 'Noctarium', true, "Hérisson");ANIMAUX['bernard l ermite'] = new Animal(2000, 'Aquarium', true, "Bernard l'ermite");
ANIMAUX['carpe koi'] = new Animal(1500, 'Aquarium');ANIMAUX['ecureuil'] = new Animal(1000, 'Forêt', true, "Ecureuil");ANIMAUX['rainette verte'] = new Animal(500, 'Terre', true, "Rainette verte");

var ANIMBONUS = new Array;
ANIMBONUS['Savane'] = new AnimBonus('savane_suricate', 'Suricate');
ANIMBONUS['Bassin'] = new AnimBonus('bassin_etoile%20de%20mer', 'Etoile de mer');
ANIMBONUS['Terre'] = new AnimBonus('terre_rainette%20verte', 'Rainette verte');
ANIMBONUS['Forêt'] = new AnimBonus('foret_ecureuil', 'Ecureuil');
ANIMBONUS['Volière'] = new AnimBonus('voliere_colibri%20thalassin', 'Colibri thalassin');
ANIMBONUS['Aquarium'] = new AnimBonus('aquarium_grabote%20de%20paques', 'Grabote de Pâques ou Bernard l\'ermite', 'aquarium_bernard%20l%20ermite');
ANIMBONUS['Vivarium'] = new AnimBonus('vivarium_gecko%20poudre%20d%20or', 'Gecko poudre d\'or');
ANIMBONUS['Noctarium'] = new AnimBonus('noctarium_herisson', 'Hérisson');
ANIMBONUS['Insectarium'] = new AnimBonus('insectarium_coccinelle%20a%207%20points', 'Coccinelle à 7 points ou Phasme feuille de java', 'insectarium_phasme%20feuille%20de%20java');
var animauxmax = new Array();
var clickmouse = document.createEvent("MouseEvents"); // pour simuler le click de la souris
clickmouse.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
var bstrong, btd, espece, touslesenclos;
var debug = unserialize(GM_getValue("debug", ""));
nom_zoo = est_connecte();
if (debug.length == 0)
	debug[debug.length] = nom_zoo + ":" + window.location.href;
else debug[debug.length] = nom_zoo + ":" + window.location.pathname + window.location.search;
GM_setValue("debug", serialize(debug));
document.addEventListener('click', function(e)
	{	if (e.target.name == "bebes") GM_setValue("bebes","ok");
		if (e.target.name == "suivilien") GM_setValue("suivi","ok");
		if (e.target.src == "http://www.monzoo.net/images/icones/icone_achat.png") { testbebe(); if (GM_getValue("bebes", "" ) == "") GM_setValue("retour", window.scrollY); }
		if (e.target.innerHTML == "cliquez ici" || e.target.innerHTML == "cliquez ici.")
			{ testbebe(); if (GM_getValue("bebes", "" ) == "") GM_setValue("retour", window.scrollY); }
		if (e.target.value == "Adultes\nmaxi") sauvemaxi();
		if (e.target.value == "Vérifier les périodiques") testperiodiquef();
		if (e.target.value == "Ok" && (/items.php/.test(window.location)  || /items_botanica.php/.test(window.location))) encherenormale();
		if (e.target.name == "vente_group[]") selvente2(e);
		if (e.target.value == "Vendre") ventemulti();
		if (e.target.value == "Max") maxtentatives();
		if (e.target.value == "Oui je souhaite vendre" && /vente_animaux.php/.test(window.location)) enregistrevente();
		if (e.target.value == "Oui je souhaite vendre" && /vente_animaux_group.php/.test(window.location)) enregistreventemulti();
		if (e.target.value == "Vendre les animaux sélectionnés") listeventemulti();
		if (e.target.value == "Validez votre achat" || (e.target.value == "Validez la construction" && GM_getValue("constructionenclos", "") != ""))
			enregistreachat();
		if (e.target.name == "filtremessages") filtremes(e.target.value);
		if (e.target.name == "liensmusee") majliensmusee(e.target.value);
		if (e.target.name == "lancerencheresauto") majlancerencheresauto(e.target.value);
		if (e.target.name == "affichertabanimauxn") affichertabanimauxf(e.target.checked);
		if (e.target.name == "etroitn") etroitf(e.target.checked);
		if (e.target.name == "filtren") filtref(e.target.checked);
		if (e.target.name == "triespn") triespf(e.target.checked);
		if (e.target.name == "etroit2n") etroit2f(e.target.checked);
		if (e.target.name == "afficheautresn") afficheautresf(e.target.checked);
		if (e.target.id == "affichertabvieuxid") affichertabvieuxf();
		if (e.target.id == "afficheenclosnaissanceid") afficheenclosnaissancef();
		if (e.target.id == "affichertabanimid") affichertabanimf();
		if (e.target.name == "etroit3") etroit3f(e.target.checked);
		if (e.target.name == "filtre2") filtre2f(e.target.checked);
		if (e.target.name == "choixvieux") choixvieuxf(e.target.value);
		if (e.target.id == "fenpatience") fermefenpatience();
		if (e.target.id == "fenndefi") fermefenndefi();
		if (e.target.id == "fendefi") fermefendefi();
		if (e.target.id == "fennews") fermefennews();
		if (e.target.id == "fenretmess") fermefenretmess();
		if (e.target.id == "retournepagemess") allersurmess();
		if (e.target.id == "fenconseil") fermefenconseil();
		if (e.target.id == "fenoeuf") fermefenoeuf();
		if (e.target.id == "fenpaul") fermefenpaul();
		if (e.target.id == "fenbonus") fermefenbonus();
		if (e.target.id == "fenvol") fermefenvol();
		if (e.target.id == "fenattract") fermefenattract();
		if (e.target.id == "fenattracttemp") fermefenattracttemp(e.target.name);
		if (e.target.id == "fenmour") fermefenmour();
		if (e.target.id == "fentrop") fermefentrop();
		if (e.target.id == "fentorn") fermefentorn();
		if (e.target.id == "fenluxe") fermefenluxe();
		if (e.target.id.indexOf("miss") != -1) changetrimiss(e.target.id);
		if (e.target.id.indexOf("inv") != -1) changetriinv(e.target.id);
		if (e.target.name == "etroit4") etroit4f(e.target.checked);
		if (e.target.name == "choixliste") choixliste(e.target.value);
		if (e.target.name == "choixaffanim") choixaffanim(e.target.value);
		if (e.target.textContent == "Déconnexion" && aujourd_hui != "")
			if (!confirm("Vous allez vous déconnecter.\n\nPour éviter tout problème, il est conseillé de vérifier son stock\n" +
				"et ses PA (avec le rapport) avant de sortir : cliquez sur Annuler\nsi vous voulez rester connecté.\n\n" +
				"Cliquez sur OK si vous voulez confirmer votre déconnexion.")) e.target.href = window.location.pathname + window.location.search;
		if (typeof(e.target.href) != "undefined" && e.target.href.indexOf("enclosgestion1.php?bot=1") != -1) MAJPA(e);
		if (e.target.innerHTML.indexOf("Afficher uniquement la dernière MAJ") != -1) forumMAJ(1);
		if (e.target.innerHTML.indexOf("Afficher toutes les MAJ de la journée") != -1) forumMAJ(e.target.id);
		if (e.target.innerHTML.indexOf("Afficher les ") != -1) forumMAJ(e.target.innerHTML.substring(13));
		if (e.target.name.indexOf("nbMAJfo") != -1) forumMAJ(e.target.value);
	}, true);

if (/wait.php/.test(window.location))
{	if (GM_getValue("invasion", "") == window.name)
		window.setTimeout(MAJpagemission, 900000);
	else if (GM_getValue("message", "") == window.name)
		window.setTimeout(MAJpagemessage, 900000);
	else if (GM_getValue("pgteam", "") == window.name)
		window.setTimeout(MAJpageteam, 900000);
	else
	{	var txt = "encherir_m";
		for (i=0;i<21;i++) GM_deleteValue(txt+i);
		txt = " encherir_b";
		for (i=0;i<21;i++) GM_deleteValue(txt+i);
		if (GM_getValue("testitemsm"+window.name, false))
		{	GM_setValue("inim"+window.name, true); GM_deleteValue("testitemsm"+window.name); }
		if (GM_getValue("testitemsb"+window.name, false))
		{	GM_setValue("inib"+window.name, true); GM_deleteValue("testitemsb"+window.name); }
		window.setTimeout(relancermusbot, 900000);
	}
}
else if (GM_getValue("suitescript", "") != "")
{	var suitescript = GM_getValue("suitescript");
	GM_deleteValue("suitescript");
	pagesuivante(suitescript);
}
else if (nom_zoo) // si le parc est connecté
{	exist = false, bad = false;
	for (i in tab_zoo)
	{	if (nom_zoo == tab_zoo[i]) { id_zoo = i; bad = true; break; }
		if (nom_zoo == tab_zoo[i][0])
			{ id_zoo = i; num_zoo = tab_zoo[i][1]; monzoo = "voirzoo.php?idparc=" + num_zoo; exist = true; break; }
	}

	if (GM_getValue("creacompte", "") != "") // on est entrain de créer un nouveau compte
	{	if (!/classement.php/.test(window.location))
			pagesuivante(urlSite + "classement.php");
		else if (GM_getValue("creacompte", "") == "1")
		{	var binput = $t("input");
			binput[0].value = nom_zoo;
			GM_setValue("creacompte", "2");
			if (testcarac()) binput[1].dispatchEvent(clickmouse);
		}
		else if (GM_getValue("creacompte", "") == "2")
		{	var ba = $t("a");
			var nom = nom_zoo[0] + nom_zoo.substring(1).toLowerCase();
			for (i=20;i<ba.length;i++)
				if (ba[i].innerHTML == nom)
				{	num_zoo = recherche_param(ba[i].href, "idparc");
					break;
				}
			if (!bad) id_zoo = tab_zoo.length;
			tab_zoo[id_zoo] = new Array();
			tab_zoo[id_zoo][0] = nom_zoo;
			tab_zoo[id_zoo][1] = num_zoo;
			GM_setValue("liste_zoo", serialize(tab_zoo));
			GM_deleteValue("creacompte");
			pagesuivante(urlSite + "zonemembre.php");
		}
	}
	else if (!exist)
	{	GM_setValue("creacompte", "1");
		if (GM_getValue("news", "") == "") alert("Bonjour et merci d'avoir installé ce script d'aide à la gestion de vos parcs.\n\nPour commencer, cliquez sur 'OK' pour " +
			"que le script récupère le numéro d'identifiant de votre parc (indispensable pour pouvoir accéder par la suite aux 'Listes du zoo' que vous verrez apparaître " +
			"dans le tableau des liens).");
		else alert("Bonjour,\n\nCe parc est pour la première fois géré par le script sur cet ordinateur.\n\nAprès que vous ayez cliqué sur 'ok', le script va récupérer le " +
			"numéro d'identifiant de ce zoo\n(servant aux 'listes du zoo' dans le tableau des liens), puis le scan initial classique démarrera.");
		pagesuivante(urlSite + "classement.php");
	}
	else
	{	if (GM_getValue("newanimal", "") != "")
		{	var newanimalc = unserialize(GM_getValue("newanimal"));
			i = 0;
			var futurnew = new Array();
			var ii = 0, jc, animauxmaxic = unserialize2(GM_getValue("animauxmax_"+id_zoo));
			var listeenclosanimc, nbanc;
			while (newanimalc[i])
			{	if (!ANIMAUX[newanimalc[i]])
				{	for (jc=3;jc<6;jc++) newanimalc[i+jc] = newanimalc[i+jc] == "true" ? true : false;
					ANIMAUX[newanimalc[i]] = new Animal(newanimalc[i+1], newanimalc[i+2], newanimalc[i+3], '', newanimalc[i+4], newanimalc[i+5]);
					if (!animauxmaxic[newanimalc[i]])
					{	animauxmaxic[newanimalc[i]] = new Array();
						listeenclosanimc = listetypeenclos(ANIMAUX[newanimalc[i]].enclos);
						for (jc=0;jc<listeenclosanimc.length;jc++) animauxmaxic[newanimalc[i]][listeenclosanimc[jc]] = 15;
					}
					else if (animauxmaxic[newanimalc[i]] == parseInt(animauxmaxic[newanimalc[i]]))
					{	nbanc = parseInt(animauxmaxic[newanimalc[i]]);
						animauxmaxic[newanimalc[i]] = new Array();
						listeenclosanimc = listetypeenclos(ANIMAUX[newanimalc[i]].enclos);
						for (jc=0;jc<listeenclosanimc.length;jc++) animauxmaxic[newanimalc[i]][listeenclosanimc[jc]] = nbanc;
					}
					for (jc=0;jc<6;jc++) futurnew[ii+jc] = newanimalc[i+jc];
					ii = ii+6;
				}
				i = i+6;
			}
			GM_setValue("animauxmax_"+id_zoo, serialize2(animauxmaxic));
			GM_setValue("newanimal", serialize(futurnew));
		}

		if (GM_getValue("oldstock", "") != "")
		{	var oldstockc = unserialize(GM_getValue("oldstock"));
			i = 0;
			var futurold = new Array();
			var ij = 0;
			while (oldstockc[i])
			{	if (ANIMAUX[oldstockc[i]].stock)
				{	ANIMAUX[oldstockc[i]].stock = false;
					futurold[ij] = oldstockc[i];
					ij++;
				}
				i++;
			}
			GM_setValue("oldstock", serialize(futurold));
		}

		// si c'est la première fois qu'on utilise le script
		if (GM_getValue("news", "") == "")
		{	var txt = "La récupération de l'identifiant s'est bien passée.\n\n";
			if (aujourd_hui == "")
				txt += "L'étape suivante nécessite une initialisation. Pour cela, vous allez devoir vous déconnecter. Vous pourrez ensuite vous reconnecter " +
					"immédiatement. Le script démarrera alors";
			else
				txt += "Le script va maintenant poursuivre";
			txt += " avec un scan de vos messages puis de tous vos enclos. Il mettra à jour vos stocks, lancera vos espions, etc : laissez le faire, vous aurez à nouveau " +
				"la main dès que tout sera fini.\n\nUne fois le scan terminé, je vous conseille d'aller faire un tour dans les options du script pour voir ce qu'il " +
				"peut faire : n'hésitez pas à sélectionner et tester vos propres choix d'exécution.\n\nPour toute question, commencez par consulter le site où vous " +
				"avez trouvé ce script. Si nécessaire, vous pouvez y déposer un message.\n\nBon jeu !\n\n";
			if (aujourd_hui == "")
				txt += "Maintenant, c'est à vous (cliquez sur 'OK', déconnectez-vous puis reconnectez-vous).";
			else
				txt += "Cliquez sur 'OK' pour continuer.";
			alert(txt);
			GM_setValue("version", this_version);
			GM_setValue("news", "init")
		}
		else if (GM_getValue("version", "") != this_version)
		{	GM_setValue("version", this_version);
			alert("Bienvenue dans la version " + this_version + " du script 'Monzoo Help'.\n\n" +
				"Cette version prend en compte les modifications suivantes :\n" +
				//"- ,\n" +
				//"- ,\n" +
				//"- ,\n" +
				"- correction d'un bug lors de l'achat d'un animal quand le moins cher était un animal exceptionnel (type chamois),\n" +
				//"- ,\n" +
				//"- ,\n" +
				"- changement de méthode pour l'émission d'une alerte sonore.\n\n" +
				//"- ,\n" +
				//"- .\n\n" +
				// mieux gérer les vols
				//"- poursuite de l'optimisation des fonctions du script.\n\n" + ???????????????????????????????
				//"- .\n\n" +
				"Je suis rentré en France, et je prépare activement la suite. En attendant, pour connaitre les dernières infos sur mon voyage, n'hésitez pas à me rendre visite sur 'montdm.shost.ca' ( = nouvelle adresse depuis début novembre).\n\n" +
				"Si vous vous voulez me contacter par rapport à ce script, vous pouvez me laisser des messages directement sur :\n                                      " +
				"- http://userscripts.org/scripts/show/63727\n                                        - ou sur mon courriel privé sur le forum.");
		}

		if (GM_getValue("attracttemp", "t0") != "t0")
			window.setTimeout(reafficheattract, parseInt(GM_getValue("attracttemp").substring(1)) - Date.now());

		var redemarrescan = false;
		if (scan && GM_getValue("messages_releves_"+id_zoo, "") == "" && (/zonemembre.php/.test(window.location) ||
			(!/enclosgestion1.php/.test(window.location) && !/event.php/.test(window.location) && !/enclosgestion.php/.test(window.location) &&
			!/achat_animaux.php/.test(window.location) && !/bureau.php/.test(window.location) && !/bureau2.php/.test(window.location) &&
			!/bureau4.php/.test(window.location) && !/espion.php/.test(window.location) && !/toutou.php/.test(window.location) &&
			!/bourse.php/.test(window.location) && !/classement.php/.test(window.location) && !/missions.php/.test(window.location) && 
			!/vente_animaux_group.php/.test(window.location)))) // on était en train de scanner et il y a eu un problème : on réinitialise tout
				redemarrescan = true;

		var pageconstructionenclos = false;
		if (/enclosgestion1.php/.test(window.location))
		{	bstrong = $t("strong");
			if (bstrong[0].innerHTML.indexOf("construire") != -1)
				pageconstructionenclos = true;
		}

		if (!/musee.php/.test(window.location) && !/botanica.php/.test(window.location) && !/items.php/.test(window.location) && !/items_botanica.php/.test(window.location))
		{	GM_deleteValue("inib"+window.name);
			GM_deleteValue("inim"+window.name);
			GM_deleteValue("signaler");
		}

		if (GM_getValue("pgteam", "") == window.name && !/team.php/.test(window.location)) GM_deleteValue("pgteam");
		if (GM_getValue("message", "") == window.name && !/event.php/.test(window.location)) GM_deleteValue("message");
		if (GM_getValue("invasion", "") == window.name && !/missions.php/.test(window.location)) GM_deleteValue("invasion");

		// si c'est une nouvelle MAJ ou une MAJ bonus, on efface les données précédentes
		dateConnexion = GM_getValue("dateConnexion_"+id_zoo, "");
		dateC = dateConnexion.indexOf("b") != -1 ? dateConnexion.substring(0, dateConnexion.indexOf("b")) : dateConnexion;
		if (dateC != aujourd_hui || /zonemembre.php\?maj_bonus/.test(window.location) || redemarrescan)
		{	if (num_zoo != "NC" && !redemarrescan)
			{	if (dateC == aujourd_hui) // on utilise une MAJ bonus
				{	oldM = "#" + dateConnexion.substring(dateConnexion.lastIndexOf("/")+1) + "%";
					dateC = dateConnexion.indexOf("b") != -1 ? dateConnexion.substring(0, dateConnexion.indexOf("b")+1) + (parseInt(dateConnexion.substring(dateConnexion.indexOf("b")+1)) + 1) : (dateConnexion + "b1");
					GM_setValue("dateConnexion_"+id_zoo, dateC);
					creeMAJold(id_zoo, oldM);
				}
				else GM_setValue("dateConnexion_"+id_zoo, aujourd_hui);
			}
			GM_deleteValue("string_naissances_"+id_zoo); // naissances
			GM_deleteValue("mourants_"+id_zoo); // mourants
			GM_deleteValue("synthvieux_"+id_zoo); // synthèse des vieux
			GM_deleteValue("albinos_"+id_zoo); // pour équilibrer les espèces sources
			GM_deleteValue("synthanimaux_"+id_zoo); // synthèse des animaux
			GM_deleteValue("couples15_"+id_zoo); // animaux en trop
			if (!redemarrescan)
			{	GM_deleteValue("string_vols_"+id_zoo);  // vols
				GM_deleteValue("string_ventes_"+id_zoo); // ventes
				GM_deleteValue("totalventes_"+id_zoo); // montant des ventes
				GM_deleteValue("ancmourants"); // décompte des mourants supprimés
				GM_deleteValue("anctrop"); // témoin des adultes en trop supprimés
				GM_deleteValue("string_ventes_trop"); // ventes des adultes en trop
				GM_deleteValue("totalventes_trop"); // montant des ventes des adultes en trop
				GM_deleteValue("string_ventes_mourants"); // ventes des mourants
				GM_deleteValue("totalventes_mourants"); // montant des ventes des mourants
				GM_deleteValue("string_trouvailles_"+id_zoo); // trouvailles
				GM_deleteValue("string_achats_"+id_zoo); // achats
				GM_deleteValue("totalachats_"+id_zoo); // montant des achats
				GM_setValue("compteur_achats_"+id_zoo, 0);
				GM_setValue("maxachats_"+id_zoo, 30);
			}
			GM_deleteValue("messages_releves_"+id_zoo); // messages
			GM_deleteValue("attraction_"+id_zoo); // attraction exceptionnelle
			GM_deleteValue("attracttemp"); //  variable temporaire attraction exceptionnelle
			GM_deleteValue("stockstemp"); // variable temporaire pour gérer les stocks
			GM_deleteValue("stocks_" + id_zoo); // stocks
			GM_deleteValue("ventemourants"); // vente automatique des mourants
			GM_deleteValue("listetriee"); // liste utile pour les stocks
			GM_deleteValue("nonluxe"); // contrôle des enclos de luxe
			GM_deleteValue("verifauj"); // pour vérifier la date du jour
			GM_deleteValue("valeurC_"+id_zoo); // variable qui n'est plus utilisée
			GM_deleteValue("initialisation");  // variable qui n'est plus utilisée
			GM_deleteValue("nobulles");  // variable qui n'est plus utilisée
			GM_deleteValue("team");  // variable qui n'est plus utilisée
			GM_deleteValue("posY");  // variable qui n'est plus utilisée
			GM_deleteValue("choixliste");  // variable qui n'est plus utilisée
			GM_deleteValue("choixaffanim");  // variable qui n'est plus utilisée
			GM_deleteValue("mourants_");  // variable qui n'est plus utilisée
			GM_deleteValue("cache");  // variable qui n'est plus utilisée
			GM_deleteValue("nbpoints");  // variable qui n'est plus utilisée
			GM_deleteValue("oeuf_"+id_zoo);  // variable qui n'est plus utilisée
			GM_deleteValue("messages_"+id_zoo);  // variable temporaire, pas encore utilisée
			GM_deleteValue("scan");
			GM_deleteValue("verifmessage");
			GM_deleteValue("pas un animal bonus");
			GM_deleteValue("cherchebonus");
			GM_deleteValue("plus");
			GM_deleteValue("oeuf");
			GM_deleteValue("moins");
			GM_deleteValue("tornade");
			GM_deleteValue("tornadefo_"+id_zoo);
			GM_deleteValue("oeuffo_"+id_zoo);
			GM_deleteValue("mnaiss_"+id_zoo);
			GM_deleteValue("mavanc_"+id_zoo);
			GM_deleteValue("attractionfo_"+id_zoo);
			GM_deleteValue("affnewdefi");
			scan = false;
			var listeenclosanim;
			if (GM_getValue("animauxmax_"+id_zoo, "") == "")
			{	for (espece in ANIMAUX)
				{	animauxmax[espece] = new Array();
					listeenclosanim = listetypeenclos(ANIMAUX[espece].enclos);
					for (i=0;i<listeenclosanim.length;i++) animauxmax[espece][listeenclosanim[i]] = 15;
				}
				GM_setValue("animauxmax_"+id_zoo, serialize2(animauxmax));
			}
			else
			{	animauxmax = unserialize2(GM_getValue("animauxmax_"+id_zoo));
				var nban;
				for (espece in ANIMAUX)
				{	if (!animauxmax[espece])
					{	animauxmax[espece] = new Array();
						listeenclosanim = listetypeenclos(ANIMAUX[espece].enclos);
						for (i=0;i<listeenclosanim.length;i++) animauxmax[espece][listeenclosanim[i]] = 15;
					}
					else if (animauxmax[espece] == parseInt(animauxmax[espece]))
					{	nban = parseInt(animauxmax[espece]);
						animauxmax[espece] = new Array();
						listeenclosanim = listetypeenclos(ANIMAUX[espece].enclos);
						for (i=0;i<listeenclosanim.length;i++) animauxmax[espece][listeenclosanim[i]] = nban;
					}
				}
				GM_setValue("animauxmax_"+id_zoo, serialize2(animauxmax));
			}
			touslesenclos = unserialize(GM_getValue("touslesenclos_" + id_zoo, ""));
			if (touslesenclos[NaN])
				GM_setValue("touslesenclos_" + id_zoo, "");
			for (i=0;i<16;i++) if (!touslesenclos[i]) { GM_setValue("touslesenclos_" + id_zoo, ""); break; }
			for (i=20;i<61;i++) if (!touslesenclos[i]) { GM_setValue("touslesenclos_" + id_zoo, ""); break; }
			for (i=100;i<105;i++) if (!touslesenclos[i]) { GM_setValue("touslesenclos_" + id_zoo, ""); break; }
			if (GM_getValue("touslesenclos_" + id_zoo, "") == "")
			{	touslesenclos = new Array();
				for (i=0;i<16;i++) touslesenclos[i] = "Initialisation0";
				for (i=20;i<61;i++) touslesenclos[i] = "Initialisation0";
				for (i=100;i<105;i++) touslesenclos[i] = "Initialisation0";
				GM_setValue("touslesenclos_" + id_zoo, serialize(touslesenclos));
			}
			var data = entetef();
			GM_xmlhttpRequest({
				method: "POST",
				url: "http://montdm.shost.ca/ScriptMonZoo/rapportnew4.php",
				data: data,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				onload: function(result) {
					if (result.status != 200) return;
				}
			});
			if (num_zoo == "NC")
			{	tab_zoo[id_zoo] = nom_zoo;
				GM_setValue("liste_zoo", serialize(tab_zoo));
				GM_setValue("creacompte", "1");
				pagesuivante(urlSite + "classement.php");
			}
			else
			{	if (/zonemembre.php/.test(window.location))
				{	var defi = $("bloc1");
					btd = $t("td", defi);
					var affdef = testzonemembre();
					var etape1 = parseInt($t("strong", btd[1])[3].innerHTML);
					var etape2 = parseInt($t("strong", btd[4])[3].innerHTML);
					var oldetape2 = GM_getValue("chgdef", false) ? "0/0" : GM_getValue("etapes_" + id_zoo, "0/0");
					var oldetape1 = parseInt(oldetape2.substring(0,oldetape2.indexOf("/")));
					oldetape2 = parseInt(oldetape2.substring(oldetape2.indexOf("/")+1));
					GM_setValue("avancement_" + id_zoo, (etape1-oldetape1) + "/" + (etape2-oldetape2));
					GM_setValue("etapes_" + id_zoo, etape1 + "/" + etape2);
					GM_setValue("defi_" + id_zoo, GM_getValue("defi"));
					GM_deleteValue("chgdef");
					if (affdef) GM_setValue("affdefi", true);
				}
				var suivachven = GM_getValue("suivi_achven_"+id_zoo, ""), ajousuiv = false;
				if (suivachven != "")
				{	var derdat = suivachven.substring(0, suivachven.lastIndexOf(":"));
					if (derdat.indexOf(";") != -1) derdat = derdat.substring(derdat.lastIndexOf(";")+1);
					if (derdat != GM_getValue("dateConnexion_" + id_zoo)) ajousuiv = true;
				}
				else ajousuiv = true;
				if (ajousuiv)
					GM_setValue("suivi_achven_"+id_zoo, suivachven + GM_getValue("dateConnexion_" + id_zoo) + ":0/0;");
				GM_setValue("cache"+window.name, true);
				pagesuivante(urlSite + "event.php");
			}
		}
		else
		{	animauxmax = unserialize2(GM_getValue("animauxmax_"+id_zoo));
			verifauj = verifaujf();
			if (verifauj != aujourd_hui && verifauj != GM_getValue("verifauj", ""))
			{	GM_setValue("chgtmaj", true);
				patience("chgtmaj");
			}
		}

		if (!GM_getValue("cache"+window.name, false)) // si on n'est pas dans un cas où on masque l'image des options et le menu, on les affiche
			modification_menu();

		if (/enclosconfirm.php/.test(window.location) && testcarac())
		{	var binput = $t("input");
			if (binput.length > 1)
			{	if (parseInt($n("t").value) < 2)
				{	if (GM_getValue("constructionenclos", "") != "") alert("Attention, cette construction ne sera pas comptabilisée correctement !\n\nMerci de construire les enclos un par un, sur un seul onglet et dans une seule fenêtre !");
					else
					{	GM_setValue("constructionenclos", window.name);
						GM_setValue("temp_achat", binput[2].value);
						bstrong = $t("strong");
						GM_setValue("val_achat", parseInt(bstrong[0].innerHTML.substring(0, bstrong[0].innerHTML.indexOf(" Z")).trim()));
					}
				}
			}
		}
		else if (/achat_animaux.php/.test(window.location) && GM_getValue("achatcouple","") != "") // achat multiple
		{	var binput = $t("input");
			if (binput)
			{	espece = GM_getValue("achatcouple");
				espece = espece.substring(espece.indexOf(";")+1);
				var trouvesp = false;
				for (i=0; i<binput.length;i++) if (binput[i].value == espece) { binput[i].checked = true; trouvesp = true; break; }
				if (trouvesp) binput[binput.length-1].dispatchEvent(clickmouse);
				else
				{	alert2("Vous ne pouvez pas terminer la procédure d'achat multiple :\nl'espèce demandée n'est plus disponible à l'achat.");
					GM_deleteValue("achatcouple");
					GM_setValue("venteauto", true);
					pagesuivante(urlSite + "enclosgestion1.php?t=" + recherche_param(window.location.search, "t") + "&v=" + recherche_param(window.location.search, "v"));
				}
			}
			else // max de 30 achats atteint
			{	alert2("Vous ne pouvez pas terminer la procédure d'achat multiple :\nvous avez atteint le maximum d'achats possibles pour aujourd'hui.");
				GM_deleteValue("achatcouple");
				GM_setValue("venteauto", true);
				pagesuivante(urlSite + "enclosgestion1.php?t=" + recherche_param(window.location.search, "t") + "&v=" + recherche_param(window.location.search, "v"));
			}
		}
		else if (/achat_animaux.php/.test(window.location) && GM_getValue("cherchebonus", "") != "") // on fait un autre essai pour trouver un animal bonus
		{	var binput = $t("input");
			var cherche = GM_getValue("cherchebonus");
			var tentative = cherche.substring(cherche.indexOf(";")+1);
			var maxtent = tentative.substring(tentative.indexOf(";")+1);
			tentative = parseInt(tentative.substring(0,tentative.indexOf(";")));
			var MAXI = parseInt(maxtent.substring(maxtent.indexOf(";")+1));
			maxtent = parseInt(maxtent.substring(0,maxtent.indexOf(";")));
			if (binput)
			{	tentative++;
				if (tentative <= maxtent)
				{	cherche = cherche.substring(0, cherche.indexOf(";"));
					GM_setValue("cherchebonus", cherche + ";" + tentative + ";" + maxtent + ";" + MAXI);
					for (i=0; i<binput.length;i++) if (binput[i].value == cherche) binput[i].checked = true;
					binput[binput.length-1].dispatchEvent(clickmouse);
				}
				else
				{	var txt;
					if (tentative == maxtent + 1 && maxtent > 1) txt = "Les " + maxtent + " tentatives demandées ont toutes";
					else txt = "La tentative précédente a";
					txt += " échoué.\n\n";
					var finbonus = false;
					if (tentative <= MAXI)
					{	if (confirm2(txt + "Souhaitez-vous faire un nouvel essai (n° " + tentative + ")\npour trouver un animal bonus ?"))
						{	cherche = cherche.substring(0, cherche.indexOf(";"));
							GM_setValue("cherchebonus", cherche + ";" + tentative + ";" + maxtent + ";" + MAXI);
							for (i=0; i<binput.length;i++) if (binput[i].value == cherche) binput[i].checked = true;
							binput[binput.length-1].dispatchEvent(clickmouse);
						}
						else finbonus = true;
					}
					else
					{	txt += "Vous n'avez malheureusement plus assez d'argent\npour faire un autre essai.";
						alert2(txt);
						finbonus = true;
					}
					if (finbonus)
					{	GM_deleteValue("cherchebonus");
						GM_setValue("venteauto", true); // simulation, pour exécuter le fincache
						var t = recherche_param(window.location.search, "t");
						var v = recherche_param(window.location.search, "v");
						pagesuivante(urlSite + "enclosgestion1.php?t=" + t + "&v=" + v);
					}
				}
			}
			else // max de 30 achats atteint
			{	var s = tentative>1?"s":"";
				alert2("Après " + tentative + " essai" + s + ", vous avez atteint le maximum des\n30 achats : fin de la recherche d'un animal bonus.");
				GM_deleteValue("cherchebonus");
				GM_setValue("venteauto", true); // simulation, pour exécuter le fincache
				var t = recherche_param(window.location.search, "t");
				var v = recherche_param(window.location.search, "v");
				pagesuivante(urlSite + "enclosgestion1.php?t=" + t + "&v=" + v);
			}
		}
		else if ((/achat_animaux.php/.test(window.location) || pageconstructionenclos) && GM_getValue("stockstemp", "") != "")
		{	var stockstemp = unserialize(GM_getValue("stockstemp"));
			var stocks = unserialize(GM_getValue("stocks_" + id_zoo), ""), stock;
			var listetriee = unserialize(GM_getValue("listetriee"));
			var numenclos = parseInt(recherche_param(window.location.search, "t")) * 100 + parseInt(recherche_param(window.location.search, "v"));
			var periodique = unserialize(GM_getValue("periodique", ""));
			numespece = 0;
			while (stockstemp[listetriee[numespece]] != numenclos) numespece++;
			btd = $t("td");
			var trouvst = true, synthanimaux = new Array();
			touslesenclos = new Array();
			while (stockstemp[listetriee[numespece]] == numenclos && trouvst)
			{	espece = listetriee[numespece];
				if (btd.length > 10)
				{	trouvst = espece == "ours rastafarai" ? true : false;
					for (i=0;i<btd.length;i++)
					{	if ((btd[i].width == 180) && btd[i].innerHTML.indexOf("Femelle") != -1)
						{	nom = btd[i-1].innerHTML;
							nom = nom.substring(nom.indexOf("images/animaux/"));
							nom = nom.substring(nom.indexOf("_")+1, nom.indexOf(".jpg"));
							nom = nom.replace("%20", " ", "g");
							nom = nom.replace("2", "", "g");
							if (nom == espece && espece != "ours rastafarai")
							{	trouvst = true;
								if (btd[i].innerHTML.indexOf("Stock") != -1)
								{	stock = btd[i].innerHTML.substring(btd[i].innerHTML.indexOf("Stock")+8);
									stock = stock.indexOf(", ") != -1 ? parseInt(stock.substring(0, stock.indexOf(", "))) : parseInt(stock.substring(0, stock.indexOf("</div>")));
									stocks[espece] = stock;
								}
								else
								{	alert2("L'espèce \"" + espece + "\" n'est plus une espèce à stock :\n\nmise à jour automatique du script.");
									var oldstock = unserialize(GM_getValue("oldstock", ""));
									var nbold = oldstock.length;
									oldstock[nbold] = espece;
									GM_setValue("oldstock",serialize(oldstock));
								}
							}
							else if (nom == "paul le poulpe") periodique.push("Paul le poulpe (aquarium)");
							else if (nom == "hippocampe divin") periodique.push("Hippocampe divin (aquarium)");
							else if (nom == "ours rastafarai") periodique.push("Ours rastafarai (bassin)");
							else if (nom == "caribou de noel") periodique.push("Caribou de noel (forêt)");
							else if (nom == "chimpanze zombie") periodique.push("Chimpanze zombie (forêt)");
							else if (nom == "coq patriote") periodique.push("Coq patriote (volière)");
							else if (nom == "colombe") periodique.push("Colombe (volière)");
							else if (nom == "elephant rose") periodique.push("Elephant rose (savane)");
							GM_setValue("periodique", serialize(periodique));
						}
					}
				}
				if (!trouvst)
				{	touslesenclos = unserialize(GM_getValue("touslesenclos_" + id_zoo, ""));
					touslesenclos[numenclos] = "Initialisation1";
					GM_setValue("touslesenclos_" + id_zoo, serialize(touslesenclos));
					synthanimaux = unserialize(GM_getValue("synthanimaux_" + id_zoo, ""));
					synthanimaux[numenclos] = "";
					GM_setValue("synthanimaux_" + id_zoo, serialize(synthanimaux));
					cherchestocks();
				}
				else numespece++;
			}
			if (trouvst)
			{	GM_setValue("stocks_" + id_zoo, serialize(stocks));
				if (listetriee[numespece])
				{	enclos = stockstemp[listetriee[numespece]];
					t = Math.floor(enclos/100);
					v = enclos - t*100;
					touslesenclos = unserialize(GM_getValue("touslesenclos_" + id_zoo, ""));
					if (touslesenclos[enclos] == "Enclos non construit")
						pagesuivante(urlSite + "enclosgestion1.php?t=" + t + "&v=" + v);
					else
					{	vtemp = 1000*t + v;
						pagesuivante(urlSite + "achat_animaux.php?t=" + t + "&vtemp=" + vtemp + "&v=" + v);
					}
				}
				else
				{	GM_deleteValue("stockstemp");
					GM_deleteValue("listetriee");
					if (GM_getValue("testperiodique", "") == "") pagesuivante(urlSite + "bureau4.php");
					else
					{	if (GM_getValue("periodique", "") == "") GM_setValue("periodique", "0,aucun;");
						pagesuivante(GM_getValue("testperiodique"));
					}
				}
			}
		}
		else if (/enclosgestion1.php/.test(window.location) && GM_getValue("stockstemp", "") != "")
		{	touslesenclos = unserialize(GM_getValue("touslesenclos_" + id_zoo, ""));
			var numenclos = parseInt(recherche_param(window.location.search, "t")) * 100 + parseInt(recherche_param(window.location.search, "v"));
			touslesenclos[numenclos] = "Initialisation2";
			GM_setValue("touslesenclos_" + id_zoo, serialize(touslesenclos));
			if (testcarac()) cherchestocks();
		}
		else if (/parrainage.php/.test(window.location) && testcarac())
			titrefen("Parrainage");
		else if ((/achat_animaux.php/.test(window.location) || pageconstructionenclos) && !scan && testcarac()) // on corrige l'orthographe de Gabarit et on rajoute prix de base, rapport prix sur prix de base, achat de couple et trouver un animal bonus
		{	bstrong = $t("strong");
			for (i=0;i<bstrong.length;i++)
				{ if (bstrong[i].innerHTML == "Gabari :") bstrong[i].innerHTML = "Gabarit :"; }
			if (GM_getValue("venteauto", false))
			{	GM_deleteValue("venteauto");
				fincache();
			}
			var txt, newtr, newtd, newtxt, newa, nom, nom0, prix, valmax, pourcent, achatexiste = false, centreici = null, supbr, maxanim;
			var maxsingles = GM_getValue("maxachats_"+id_zoo, 30) - GM_getValue("compteur_achats_"+id_zoo, 0);
			var maxcouples = Math.floor(maxsingles / 2);
			var enclos = unserialize(GM_getValue("enclos", ""));
			var manquante = unserialize(GM_getValue("manquante_"+id_zoo, ""));
			for (espece in enclos) break;
			var argent, liste, j, bdiv = $t("div");
			for (i=25; i<bdiv.length;i++) if (bdiv[i].attributes[0].value.indexOf("width: 125px") != -1 || bdiv[i].attributes[0].value.indexOf("width:125px") != -1) break; // 1ère condition pour Firefox 3, 2e pour Firefox 4
			if (bdiv[i+1].innerHTML.indexOf("<span") != -1)
			{	inn = bdiv[i+1].innerHTML;
				inn = inn.substring(inn.indexOf(">")+1);
				bdiv[i+1].innerHTML = inn.substring(0,inn.indexOf("<"));
			}
			argent = parseInt(bdiv[i+1].innerHTML);
			var nomenclos = nom_enclos(parseInt(recherche_param(window.location.search, "t")), parseInt(recherche_param(window.location.search, "v")));
			if (nomenclos.indexOf(" ") != -1) nomenclos = nomenclos.substring(0, nomenclos.indexOf(" "));
			liste = listetypeenclos(nomenclos);
			var synthanim = unserialize(GM_getValue("synthanimaux_"+id_zoo, ""));
			btd = $t("td");
			var clique = GM_getValue("clique", ""), achetable;
			clique = clique != "" ? clique.substring(0,clique.indexOf("/")) : "";
			for (i=0;i<btd.length;i++)
			{	if (btd[i].width == 180)
				{	achatexiste = true;
					nom = btd[i-1].innerHTML;
					nom = nom.substring(nom.indexOf("images/animaux/"));
					nom = nom.substring(nom.indexOf("_")+1, nom.indexOf(".jpg"));
					nom = nom.replace("%20", " ", "g");
					if (nom.indexOf("1") == -1  && (nom.indexOf("2") == -1)) nom = nom + "1";
					txt = " Zoo\'z<br>";
					nom0 = nom.substring(0,nom.length-1);
					if (nom0 == clique)
					{	btd[i-1].className = "filtre";
						centreici = btd[i-1];
					}
					else if (manquante[nom0]) btd[i-1].className = "manquante";
					if (nom.indexOf("1") != -1)
					{	if (!ANIMAUX[nom0])
						{	alert("L'espèce \""+ nom0 + "\" est inconnue dans le script pour l'instant.\n\nLe script va la créer automatiquement en " +
								"allant sur la page 'bourse'\n(avant de revenir sur cette page) dès que vous aurez cliqué sur 'OK'.");
							GM_setValue("creeranimal", nom0);
							var retour = new String(window.location);
							retour = retour.substring(7);
							GM_setValue("retourbourse", retour);
							GM_setValue("groupe", btd[i].innerHTML.indexOf("Groupe :</strong> oui") != -1 ? 0 : 1);
							GM_setValue("stocktemp", btd[i].innerHTML.indexOf("Stock") != -1 ? true : false);
							GM_setValue("cache"+window.name, true);
							pagesuivante(urlSite + "bourse.php");
							return;
						}
						else
						{	txt += "<strong>Base :</strong> " + millier(ANIMAUX[nom0].prix) + " Zoo\'z<br>";
							prix = btd[i].innerHTML;
							prix = prix.substring(prix.indexOf("Prix")+16);
							prix = prix.substring(0, prix.indexOf(" Zoo"));
							btd[i].innerHTML = btd[i].innerHTML.replace(prix + " Zoo\'z<br>", millier(prix) + txt);
						}
						if (!pageconstructionenclos)
						{	btd[i].parentNode.parentNode.parentNode.width = 270;
							btd[i].width = 135;
							bbr = $t("br", btd[i].parentNode.parentNode.parentNode.parentNode);
							supbr = btd[i].parentNode.parentNode.parentNode.parentNode.removeChild(bbr[bbr.length-1]);
							btd[i].parentNode.parentNode.parentNode.parentNode.width = 270;
						}
					}
					else
					{	maxanim = 50;
						for (j=0; j<liste.length; j++)
						{	if (synthanim[liste[j]])
							{	for (k=0; k<synthanim[liste[j]].length; k+=3)
									if (synthanim[liste[j]][k] == nom0)
										maxanim = maxanim - parseInt(synthanim[liste[j]][k+1]) - parseInt(synthanim[liste[j]][k+2]);
							}
						}
						maxanim = Math.max(0, maxanim);
						if (!pageconstructionenclos)
						{	btd[i].parentNode.parentNode.parentNode.width = 270;
							btd[i].width = 135;
							bbr = $t("br", btd[i].parentNode.parentNode.parentNode.parentNode);
							supbr = btd[i].parentNode.parentNode.parentNode.parentNode.removeChild(bbr[bbr.length-1]);
							btd[i].parentNode.parentNode.parentNode.parentNode.width = 270;
						}
						if (ANIMAUX[nom0])
						{	prix = btd[i].innerHTML.substring(btd[i].innerHTML.indexOf("Prix")+16);
							prix = parseInt(prix.substring(0, prix.indexOf(" Zoo")));
							pourcent = Math.round((prix/ANIMAUX[nom0].prix - 1) * 10000) / 100;
							if (pourcent >= 0) plus = "+";
							else { plus = "-"; pourcent = 0 - pourcent ; }
							txt += "<strong>Prix/Base :</strong> " + plus + "&nbsp;" + pourcent + "&nbsp;%<br>";
							btd[i].innerHTML = btd[i].innerHTML.replace(prix + " Zoo\'z<br>", millier(prix) + txt);
							if (!pageconstructionenclos && btd[i+1].innerHTML.indexOf("radio") != -1)
							{	if (btd[i].innerHTML.indexOf("Stock") != -1)
								{	stock = btd[i].innerHTML.substring(btd[i].innerHTML.indexOf("Stock")+8);
									stock = parseInt(stock.substring(0, stock.indexOf("</div>")));
								}
								else stock = 100;
								if (stock > 0)
								{	valmax = Math.min(stock, maxsingles, maxanim, Math.floor(argent / prix));
									coumax = Math.min(Math.floor(stock / 2), maxcouples, Math.floor(maxanim / 2), Math.floor(argent / (2 *prix)));
									newtd = document.createElement("td");
									newtd.setAttribute("style", "font-size:10px;margin:0px;text-align:center;padding:0px;background-color:#FCF0DB;border:1px solid #E9CA94");
									if (valmax > 0)
									{	newtxt = document.createElement("input");
										newtxt.type = "text";
										newtxt.setAttribute("style", "font-size:10px;padding:0px;text-align:center");
									}
									else newtxt = newtd;
									newtxt.setAttribute("onmouseout", "UnTip()");
									lim1 = Math.min(stock, maxsingles, maxanim);
									lim2 = Math.min(Math.floor(stock / 2), maxcouples, Math.floor(maxanim / 2));
									nextcouple = coumax + 1 <= lim2 ? (coumax + 1) * 2 * prix - argent : 0;
									nextsingle = valmax + 1 <= lim1 ? (valmax + 1) * prix - argent : 0;
									sc = coumax > 1 ? "s" : "";
									sv = valmax > 1 ? "s" : "";
									txt = maxanim == 0 ? "Vous avez déjà au moins 50 animaux de cette espèce" : "nb max de couple" +
										sc + " à l&rsquo;achat = " + coumax + "<br>argent nécessaire pour un couple supplémentaire = " +
										millier(nextcouple) + " Zoo&rsquo;z<br>nb max de mâle" + sv + " ou femelle" + sv + " à l&rsquo;achat = " +
										valmax + "<br>argent nécessaire pour un individu supplémentaire = " + millier(nextsingle) + " Zoo&rsquo;z";
									newtxt.setAttribute("onmouseover", "Tip('" + txt + "', BGCOLOR, '#FFFFAA', FONTFACE, 'Courier New', " +
										"FONTSIZE, '8pt', ABOVE, 'true', TEXTALIGN, 'center')");
									if (valmax > 0)
									{	newtxt.size = "1";
										newtxt.name = nom0;
										newtxt.value = "1";
										newtd.appendChild(newtxt);
										newtxt = document.createElement("p");
										newtxt.setAttribute("style", "margin:0px");
										newtxt.innerHTML = "achat(s) de";
										newtd.appendChild(newtxt);
										newa = document.createElement("a");
										newa.addEventListener("click", achatcouple, true);
										newa.innerHTML = "- mâle<br><br>";
										newa.setAttribute("style", "cursor:pointer");
										newa.id = nom0 +"1;"+prix+";"+valmax;
										newtd.appendChild(newa);
										newa = document.createElement("a");
										newa.addEventListener("click", achatcouple, true);
										newa.innerHTML = "- femelle<br><br>";
										newa.style.cursor = "pointer";
										newa.id = nom0 +"2;"+prix+";"+valmax;
										newtd.appendChild(newa);
									}
									if (coumax > 0)
									{	newa = document.createElement("a");
										newa.addEventListener("click", achatcouple, true);
										newa.innerHTML = "- couple";
										newa.style.cursor = "pointer";
										prix = prix * 2;
										newa.id = nom0 +";"+prix+";"+coumax;
										newtd.appendChild(newa);
									}
									btd[i].parentNode.parentNode.parentNode.parentNode.parentNode.insertBefore(newtd, btd[i].parentNode.parentNode.parentNode.parentNode.nextSibling);
								}
							}
						}
						if (!pageconstructionenclos)
						{	newtr = document.createElement("tr");
							newtd = document.createElement("td");
							newtd.height = 10;
							newtr.appendChild(newtd);
							btd[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.insertBefore(newtr, btd[i].parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling);
						}
					}
				}
			}
			if (achatexiste && !pageconstructionenclos)
			{	var lasti = null;
				var j, k;
				for (i=btd.length-1;i>0;i--)
				{	if ((btd[i].width == 135) && btd[i].innerHTML.indexOf("Stock") == -1 && btd[i+1].innerHTML.indexOf("input") != -1)
					{	maxanim = 50;
						nom0 = btd[i].innerHTML;
						nom0 = nom0.substring(nom0.indexOf("Nom")+15, nom0.indexOf("<br"));
						for (j=0; j<liste.length; j++)
						{	if (synthanim[liste[j]])
							{	for (k=0; k<synthanim[liste[j]].length; k+=3)
									if (synthanim[liste[j]][k] == nom0.toLowerCase())
										maxanim = maxanim - parseInt(synthanim[liste[j]][k+1]) - parseInt(synthanim[liste[j]][k+2]);
							}
						}
						if (maxanim > 0)
						{	lasti = i;
							break;
						}
					}
				}
				if (lasti)
				{	var newanim = btd[lasti].parentNode.parentNode.parentNode.parentNode.parentNode.cloneNode(true);
					var btd2 = $t('td', newanim);
					var btd22 = btd2[2].innerHTML;
					var oldnom = nom0;
					var bimg = $t("img", newanim);
					bimg[0].setAttribute("src", "images/animaux/" + ANIMBONUS[nomenclos].image1 + ".jpg");
					bimg[1].setAttribute("src", "images/animaux/" + ANIMBONUS[nomenclos].image2 + ".jpg");
					btd2[1].className = "";
					btd2[6].className = "";
					var newnom = ANIMBONUS[nomenclos].nom;
					prix = btd22.substring(btd22.indexOf("Prix"));
					prix = prix.substring(prix.indexOf("> ")+2, prix.indexOf(" Zoo"));
					prix = prix.replace(" ", "", "g");
					btd2[2].innerHTML = "<strong>Nom :</strong> " + newnom + "<br><strong>Gabarit :</strong> 1<br><strong>Sexe :</strong> Mâle<br><strong>Groupe :</strong> oui<br>";
					btd22 = btd2[9].innerHTML;
					var btdanim = false;
					valmax = Math.min(maxsingles, maxanim, Math.floor(argent / prix));
					valmax2 = Math.min(maxsingles, Math.max(0, 1 + Math.floor((argent - prix ) / (prix - Math.round(prix*0.594)))));
					if (btd22 != "")
					{	newa = document.createElement("a");
						newa.addEventListener("click", trouvebonus, true);
						newa.innerHTML = "Trouver cet animal bonus";
						newa.style.cursor = "pointer";
						newa.id = newnom + ";" + oldnom + ";" + prix + ";1;" + valmax2;
						btd2[2].appendChild(newa);
					}
					btd2[7].innerHTML = "<strong>Nom :</strong> " + newnom + "<br><strong>Gabarit :</strong> 1<br><strong>Sexe :</strong> Femelle<br><strong>Groupe :</strong> oui<br>";
					if (btd22 != "")
					{	newa = document.createElement("a");
						newa.addEventListener("click", trouvebonus, true);
						newa.innerHTML = "Trouver cet animal bonus";
						newa.style.cursor = "pointer";
						newa.id = newnom + ";" + oldnom + ";" + prix + ";2;" + valmax2;
						btd2[7].appendChild(newa);
						btd22 = btd22.replace(oldnom.toLowerCase(), newnom.toLowerCase(), "g");
						btd22 = btd22.replace("name", "value=\"1\" name");
					}
					else
					{	btd22 = newanim.innerHTML;
						btdanim = true;
					}
					btd22 = btd22.substring(0,btd22.indexOf("Tip")+15) + btd22.substring(btd22.indexOf("mâle"));
					btd22 = btd22.substring(0,btd22.indexOf("Tip")+15) + "tentatives" + btd22.substring(btd22.indexOf("achat")+5);
					btd22 = btd22.replace(" individu", "e tentative");
					var mover = "tive(s) = " + valmax;
					if (valmax != valmax2)
					{	btd22 = btd22.replace("tives = " + valmax, "tives = " + valmax2);
						mover = "tive(s) = " + valmax2;
					}
					var nextsingle2 = valmax2 == maxsingles ? 0 : prix - Math.round(prix * 0.594) - (argent - prix - valmax2 * (prix - Math.round(prix * 0.594)));
					btd22 = btd22.replace(millier(nextsingle), millier(nextsingle2));
				
					if (!btdanim) btd22 = btd22.substring(0,btd22.lastIndexOf("achat")) + "tenta-tive(s)</p><br /><input style='font-family:garamond arial sans serif;" +
						"width:34px' type='button' onmouseout=\"UnTip()\" onmouseover=\"Tip('Cliquez ici pour préremplir avec le nombre maximal de tenta" + mover + "', " +
						"BGCOLOR, '#FFFFAA', FONTFACE, 'Courier New', FONTSIZE, '8pt', ABOVE, 'true', TEXTALIGN, 'center')\" value='Max' id='MaxT'></input>";
					if (btdanim) newanim.innerHTML = btd22;
					else btd2[9].innerHTML = btd22;
					btd2[8].innerHTML = " ";
					btd2[3].innerHTML = " ";
					btd[lasti].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild(newanim);
					if (!pageconstructionenclos)
					{	newtr = document.createElement("tr");
						newtd = document.createElement("td");
						newtd.height = 10;
						newtr.appendChild(newtd);
						btd[lasti].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild(newtr);
					}
					if (clique != "" && ANIMAUX[clique].nom != "")
					{	btd2[1].className = "filtre";
						btd2[6].className = "filtre";
						centreici = btd2[6];
					}
				}
			}
			var nomencl = " l'enclos " + nom_enclos(parseInt(recherche_param(window.location.search, "t")), parseInt(recherche_param(window.location.search, "v")));
			if (!pageconstructionenclos)
			{	if (centreici)
					titrefen("Acheter un animal pour" + nomencl, positionY(centreici) - window.innerHeight/2 + 40);
				else
				{	titrefen("Acheter un animal pour" + nomencl);
					if (clique != "" && achatexiste) alert("L'espèce " + clique + " n'est pas disponible à l'achat pour l'instant");
				}
				tableau_animauxf(enclos);
			}
			else
				titrefen("Construire" + nomencl);
		}
		else if (/achat_animauxconfirm.php/.test(window.location) && testcarac()) // on rajoute nom, sexe et enclos de l'animal acheté
																//(si on n'est pas en train de faire des achats multiples ou une recherche d'animal bonus)
		{	var binput = $t("input");
			bstrong = $t("strong");
			if (binput && binput.length > 1)
			{	espece = binput[0].value == "Options du script" ? binput[2].value : binput[1].value;
				GM_setValue("temp_achat", espece);
				GM_deleteValue("constructionenclos");
				GM_setValue("val_achat", parseInt(bstrong[0].innerHTML.trim()));
			}
			if (GM_getValue("achatcouple", "") != "") // on fait des achats multiples
			{	if (binput)
				{	achat = GM_getValue("achatcouple");
					numero = parseInt(GM_getValue("nbrcouples")) - parseInt(achat.substring(0, achat.indexOf(";"))) + 1;
					sexe = achat.substring(achat.length-1) == "1" ? "u mâle" : "e la femelle";
					couple = GM_getValue("achatmale", false) || GM_getValue("achatfemelle", false) ? "":" du couple";
					if (sexe == "u mâle")
					{	if (GM_getValue("achatmale", false))
						{	nbr = parseInt(achat.substring(0,achat.indexOf(";"))) - 1;
							if (nbr > 0) GM_setValue("achatcouple", nbr + achat.substring(achat.indexOf(";"),achat.length-1) + "1");
							else GM_setValue("achatcouple", "fin");
						}
						else GM_setValue("achatcouple", achat.substring(0,achat.length-1) + "2");
					}
					else
					{	nbr = parseInt(achat.substring(0,achat.indexOf(";"))) - 1;
						if (nbr > 0)
						{	if (GM_getValue("achatfemelle", false)) GM_setValue("achatcouple", nbr + achat.substring(achat.indexOf(";"),achat.length-1) + "2");
							else GM_setValue("achatcouple", nbr + achat.substring(achat.indexOf(";"),achat.length-1) + "1");
						}
						else GM_setValue("achatcouple", "fin");
					}
					binput[4].style.visibility = "hidden";
					bstrong[1].innerHTML = "Ne touchez à rien, achat automatique d" + sexe + couple + " n° " + numero + " en cours...";
					binput[4].dispatchEvent(clickmouse);
				}
				else // on ne peut plus continuer
				{	alert2("Vous ne pouvez pas terminer la procédure automatique d'achat d'animaux.");
					GM_deleteValue("achatcouple");
					fincache();
				}
			}
			else if (GM_getValue("cherchebonus", "") != "") // on cherche un animal bonus
			{	var nbr = GM_getValue("cherchebonus");
				nbr = nbr.substring(nbr.indexOf(";")+1);
				nbr = parseInt(nbr.substring(0,nbr.indexOf(";")));
				if (binput) // on a assez d'argent
				{	binput[4].style.visibility = "hidden";
					bstrong[1].innerHTML = "Ne touchez à rien, recherche n° " + nbr + " d'un animal bonus en cours...";
					binput[4].dispatchEvent(clickmouse);
				}
				else // on n'a plus d'argent
				{	nbr--;
					s = nbr > 1 ? "s" : "";
					if (nbr > 0) alert2("Après " + nbr + " essai" + s + ", vous n'avez plus assez d'argent pour faire une\nnouvelle tentative : fin de la recherche d'un animal bonus.");
					else alert("Vous n'avez pas assez d'argent pour faire une tentative\ndans cet enclos : fin de la recherche d'un animal bonus.");
					GM_deleteValue("cherchebonus");
					GM_setValue("venteauto", true); // simulation, pour exécuter le fincache
					var ba = $t("a");
					for(i=0;i<ba.length;i++) if (ba[i].innerHTML == "retour enclos") break;
					pagesuivante(ba[i].href);
				}
			}
			else
			{	if (binput && binput.length > 1)
				{	var sexe = (binput[4].value == 1 ? "mâle" : "femelle");
					var bdiv = $t("div");
					var enclos = nom_enclos(parseInt(binput[1].value), parseInt(binput[3].value));
					for (i=0;i<bdiv.length;i++)
					{	if (bdiv[i].getAttribute("align") == "justify")
						{	if (espece == "coq patriote")
							{	if (sexe == "mâle" ) { espece = "coq"; sexe = "patriote"; }
								else { espece = "poule"; sexe = "patriote"; }
							}
							var txt = "cet animal (<strong>" + espece + " " + sexe + "</strong>) pour l'enclos <strong>" + enclos + "</strong>";
							bdiv[i].innerHTML = bdiv[i].innerHTML.replace("cet animal", txt);
							bdiv[i].innerHTML = bdiv[i].innerHTML.replace("zoo", "Zoo");
						}
					}
				}
				tableau_animauxf(unserialize(GM_getValue("enclos")));
				titrefen("Confirmation d'achat d'un animal");
			}
		}
		else if (/bureau4.php/.test(window.location) && scan) // correction automatique des stocks à la fin des scans
		{	bstrong = $t("strong");
			var decalage = bstrong[0].innerHTML.indexOf("Vous n'avez pas assez de") != -1 ? 2 : 0;
			var actuel = parseInt(bstrong[decalage+0].innerHTML);
			var besoins = parseInt(bstrong[decalage+4].innerHTML.replace(" ","","g"));
			if (parseInt(GM_getValue("antibug", 1)) == 1) besoins = 2 * (besoins - 1.5*Math.ceil(parseFloat(GM_getValue("nb_th_"+id_zoo, "0"))));
			bstrong[decalage+4].innerHTML = "- " + (0-besoins);
			var total = actuel + besoins;
			if (total >= 0) { txtotal = "+ " + total; bstrong[decalage+6].parentNode.parentNode.setAttribute("style", "font-size:20px;color:#6BBF36;"); }
			else { txtotal = "- " + (0 - total); bstrong[decalage+6].parentNode.parentNode.setAttribute("style", "font-size:20px;color:#DE422C;"); }
			bstrong[decalage+5].innerHTML = "TOTAL (cf. vos options)";
			bstrong[decalage+6].innerHTML = txtotal;
			if (decalage == 2)
				alert2("Vous n'avez pas assez de Zoo'z pour mettre à niveau vos stocks !");
			else if (total < 0)
			{	var ba =$t("a");
				for (i=ba.length-1; i>0; i--) if (ba[i].href == "http://www.monzoo.net/bureau4.php?achat=1") break;
				if (total + 900 > 0) pagesuivante(ba[i].href);
				else if (total + 9900 > 0) pagesuivante(ba[i+1].href);
				else pagesuivante(ba[i+2].href);
			}
			if ((decalage == 2 || total >= 0) && testcarac())
			{	if (GM_getValue("messages_releves_"+id_zoo, "") == "")
					pagesuivante(urlSite + "enclosgestion.php?t=4&v=0");
				else rapport();
			}
		}
		else if (/bureau4.php/.test(window.location) && testcarac()) // correction du total des stocks
		{	titrefen("Stocks");
			bstrong = $t("strong");
			var decalage = bstrong[0].innerHTML.indexOf("Vous n'avez pas assez de") != -1 ? 2 : 0;
			var actuel = parseInt(bstrong[decalage].innerHTML);
			var besoins = parseInt(bstrong[decalage+4].innerHTML.replace(" ","","g"));
			if (parseInt(GM_getValue("antibug", 1)) == 1) besoins = 2 * (besoins - 1.5*Math.ceil(parseFloat(GM_getValue("nb_th_"+id_zoo, "0"))));
			bstrong[decalage+4].innerHTML = "- " + (0-besoins);
			var total = actuel + besoins;
			if (total >= 0) { total = "+ " + total; bstrong[decalage+6].parentNode.parentNode.setAttribute("style", "font-size:20px;color:#6BBF36;"); }
			else { total = 0 - total; total = "- " + total; bstrong[decalage+6].parentNode.parentNode.setAttribute("style", "font-size:20px;color:#DE422C;"); }
			bstrong[decalage+5].innerHTML = "TOTAL (cf. vos options)";
			bstrong[decalage+6].innerHTML = total;
		}
		else if (/zonemembre.php/.test(window.location))
		{	if (GM_getValue("classement", "") != "") // on a cliqué sur classement points, prestige ou team mais on devait être déconnecté
			{	GM_setValue("cache"+window.name, true);
				if (GM_getValue("classement") == "team")
					pagesuivante(urlSite + "team.php");
				else if (GM_getValue("classement") == "points")
					pagesuivante(urlSite + "classement.php?choix_class=1");
				else if (GM_getValue("classement") == "prestige")
					pagesuivante(urlSite + "classement.php?choix_class=2");
				else
					pagesuivante(urlSite + "classement.php?choix_class=4");
			}
			else if (GM_getValue("verifmessage", false)) // on a cliqué sur rapport ou sur le lancement du contrôle des PA mais on devait être déconnecté
			{	GM_setValue("cache"+window.name, true);
				GM_deleteValue("scan");
				pagesuivante(urlSite + "event.php");
			}
			else if (GM_getValue("espion", false)) // on a cliqué sur le lancement des espions mais on devait être déconnecté
			{	GM_setValue("cache"+window.name, true);
				pagesuivante(urlSite + "espion.php");
			}
			else
			{	if (GM_getValue("cherchebonus", false)) // on a cliqué sur la recherche d'animal bonus mais on devait être déconnecté
				{	GM_deleteValue("cherchebonus");
					GM_deleteValue("pas un animal bonus");
				}
				if (GM_getValue("achatcouple", "") != "") // on a cliqué sur l'achat de couples mais on devait être déconnecté
				{	GM_deleteValue("achatcouple");
					GM_deleteValue("nbrcouples");
					GM_deleteValue("achatmale");
					GM_deleteValue("achatfemelle");
				}
				if (GM_getValue("messages_releves_"+id_zoo, "") != "" && testcarac()) // page de la carte du zoo
				{	GM_deleteValue("cache"+window.name);
					var defi = $("bloc1");
					btd = $t("td", defi);
					titrefen("Carte du zoo");
					if (testzonemembre())
					{	var resultdef = new Array();
						resultdef = affichedefis("carte");
						btd[1].innerHTML = btd[1].innerHTML.substring(0, btd[1].innerHTML.length-5) + resultdef[0] + ".";
						btd[4].innerHTML = btd[4].innerHTML.substring(0, btd[4].innerHTML.length-28) + resultdef[1] + ".";
					}
					var zonemess = $t("a");
					for (i=0;i<zonemess.length;i++) if (zonemess[i].innerHTML.indexOf("messages") != -1 && zonemess[i].innerHTML.indexOf("Vos") == -1) break;
					if (parseInt(zonemess[i].innerHTML.substring(0, zonemess[i].innerHTML.indexOf(" ", 1))) < 2)
						zonemess[i].innerHTML = zonemess[i].innerHTML.replace("messages", "message");
					for (i=0;i<zonemess.length;i++) if (zonemess[i].innerHTML.indexOf("jour bonus") != -1) break;
					zonemess[i].innerHTML = zonemess[i].innerHTML.replace("Mise", "mise");
					if (parseInt(zonemess[i].innerHTML.substring(0, zonemess[i].innerHTML.indexOf(" ", 1))) < 2)
						zonemess[i].innerHTML = zonemess[i].innerHTML.replace("mises", "mise");
				}
			}
		}
		else if (/classement.php/.test(window.location) && scan)
		{	bstrong = $t("strong");
			var derdate = GM_getValue("suivi_cl_" + id_zoo, "");
			var suivicl = false;
			var auj = aujourd_hui.substring(0, aujourd_hui.lastIndexOf("/"));
			if (derdate != "")
			{	derdate = derdate.substring(0, derdate.lastIndexOf(":"));
				derdate = derdate.substring(derdate.lastIndexOf(";")+1);
				if (derdate != auj) suivicl = true;
			}
			else suivicl = true;
			var inteam = bstrong[10].innerHTML.indexOf("pts") != -1; // true si on est dans une team
			if (suivicl)
			{	GM_setValue("ptstemp", bstrong[6].innerHTML.substring(0,bstrong[6].innerHTML.indexOf(" pt")));
				var suivicltemp = auj + ":PTS/";
				suivicltemp += bstrong[7].innerHTML.indexOf("è") != -1 ? bstrong[7].innerHTML.substring(0,bstrong[7].innerHTML.indexOf("è")) : "-1";
				suivicltemp += "/" + bstrong[2].innerHTML.substring(0,bstrong[2].innerHTML.indexOf(" %")) + "/";
				suivicltemp += bstrong[3].innerHTML.indexOf("è") != -1 ? bstrong[3].innerHTML.substring(0,bstrong[3].innerHTML.indexOf("è")) : "-1";
				suivicltemp += "/";
				suivicltemp += inteam ? bstrong[10].innerHTML.substring(0,bstrong[10].innerHTML.indexOf("pts")).trim() : "-1";
				suivicltemp += "/";
				suivicltemp += bstrong[11].innerHTML.indexOf("è") != -1 ? bstrong[11].innerHTML.substring(0,bstrong[11].innerHTML.indexOf("è")).trim() : "-1";
				GM_setValue("suivicltemp", suivicltemp + ";");
			}
			derdate = GM_getValue("suivi_clm_" + id_zoo, "");
			var suiviclm = false;
			if (derdate != "")
			{	derdate = derdate.substring(0, derdate.lastIndexOf(":"));
				derdate = derdate.substring(derdate.lastIndexOf(";")+1);
				if (derdate != aujourd_hui) suiviclm = true;
			}
			else suiviclm = true;
			if (suiviclm)
			{	inteam = inteam ? 2 : 0;
				var suiviclmtemp = GM_getValue("dateConnexion_" + id_zoo) + ":";
				suiviclmtemp += bstrong[12+inteam].innerHTML.indexOf("pts") != -1 ? bstrong[12+inteam].innerHTML.substring(0,bstrong[12+inteam].innerHTML.indexOf("pts")).trim() : "-1";
				suiviclmtemp += "/";
				suiviclmtemp += bstrong[13+inteam].innerHTML.indexOf("è") != -1 ? bstrong[13+inteam].innerHTML.substring(0,bstrong[13+inteam].innerHTML.indexOf("è")).trim() : "-1";
				GM_setValue("suivi_clm_" + id_zoo, GM_getValue("suivi_clm_" + id_zoo, "") + suiviclmtemp + ";");
			}
			if (suivicl) pagesuivante(urlSite + "bureau2.php");
			else lancerscan();
		}
		else if (/classement.php/.test(window.location) && GM_getValue("classement", "") != "") // mon classement points, prestige ou mensuel, 1ère partie
		{	bstrong = $t("strong");
			var cl;
			if (GM_getValue("classement", "") == "prestige" && testcarac())
			{	cl = bstrong[3].innerHTML;
				GM_deleteValue("classement");
				if (cl.indexOf("Non Class") != -1)
				{	alert("Vous n'avez pas encore de classement prestige");
					fincache();
					affichageclassement(true);
				}
				else
				{	cl = cl.substring(0,cl.indexOf("è"));
					cl = Math.max(0, parseInt(cl) - 3);
					GM_setValue("scrollcl", true);
					pagesuivante(urlSite + "classement.php?choix_class=2&deb=" + cl);
				}
			}
			else if (GM_getValue("classement", "") == "points" && testcarac())
			{	cl = bstrong[7].innerHTML;
				GM_deleteValue("classement");
				if (cl == "Non Class")
				{	alert("Vous n'avez pas encore de classement points");
					fincache();
					affichageclassement(true);
				}
				else
				{	cl = cl.substring(0,cl.indexOf("è"));
					cl = Math.max(0, parseInt(cl) - 3);
					GM_setValue("scrollcl", true);
					pagesuivante(urlSite + "classement.php?choix_class=1&deb=" + cl);
				}
			}
			else if (GM_getValue("classement", "") == "mensuel" && testcarac())
			{	var inteam = bstrong[10].innerHTML.indexOf("pts") != -1; // true si on est dans une team
				cl = inteam ? bstrong[15].innerHTML : bstrong[13].innerHTML;
				var ptscl = inteam ? bstrong[14].innerHTML : bstrong[12].innerHTML;
				GM_deleteValue("classement");
				if (ptscl == "0 pts, ")
				{	cl = cl.substring(0,cl.indexOf("è")+3);
					alert("Vous n'avez pas encore de points mensuel :\n\n- votre classement théorique est" + cl + ",\n- mais votre classement réel (votre place parmi tous les joueurs qui ont 0 point) est impossible à trouver avec le script.");
					fincache();
					affichageclassement(true);
				}
				else if (cl.indexOf("Non Class") != -1)
				{	alert("Vous n'avez pas encore de classement mensuel");
					fincache();
					affichageclassement(true);
				}
				else
				{	cl = cl.substring(0,cl.indexOf("è"));
					cl = Math.max(0, parseInt(cl) - 6);
					GM_setValue("scrollcl", true);
					pagesuivante(urlSite + "classement.php?choix_class=4&deb=" + cl);
				}
			}
		}
		else if (/classement.php/.test(window.location) && GM_getValue("scrollcl", false)) // mon classement points, prestige, mensuel ou team 2ème partie
		{	bstrong = $t("strong");
			var cl, choix_class = recherche_param(window.location.search, "choix_class");
			if (choix_class != "3" && choix_class != "4")
			{	var nom = nom_zoo[0] + nom_zoo.substring(1).toLowerCase();
				var ba = $t("a");
				for (i=35;i<60;i++) 
					if (ba[i].innerHTML == nom)
					{	ba[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.setAttribute("bgcolor", "#eac893");
						break;
					}
			}
			else if (choix_class == "4")
			{	var nom = nom_zoo[0] + nom_zoo.substring(1).toLowerCase();
				var it = GM_getValue("team_"+id_zoo, false) ? 2 : 0;
				for (i=0;i<bstrong.length;i++) 
					if (bstrong[i].innerHTML == nom) break;
				if (i == bstrong.length)
				{	var mespts = bstrong[12+it].innerHTML.substring(0, bstrong[12+it].innerHTML.indexOf(" pt"));
					if (bstrong[18+it].innerHTML != mespts)
						alert2("Je ne vous ai pas trouvé, le classement a dû être modifié par un autre joueur pendant la recherche !");
					else
					{	cl = parseInt(recherche_param(window.location.search, "deb")) - 29;
						pagesuivante(urlSite + "classement.php?choix_class=4&deb=" + cl);
						return;
					}
				}
				else if (i != 32 + it)
				{	cl = parseInt(recherche_param(window.location.search, "deb")) - (32 + it - i)/3;
					pagesuivante(urlSite + "classement.php?choix_class=4&deb=" + cl);
					return;
				}
				else bstrong[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.setAttribute("bgcolor", "#eac893");
			}
			else
			{	cl = GM_getValue("team_" + id_zoo, cl) + "-";
				for (i=0;i<bstrong.length;i++)
					if (bstrong[i].innerHTML == cl)
					{	bstrong[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.setAttribute("bgcolor", "#eac893");
						break;
					}
			}
			affichageclassement(false);
			var typecl = choix_class == "1" ? "Mon classement points" : choix_class == "2" ? "Mon classement prestige" : choix_class == "4" ? "Mon classement mensuel" : "Notre classement team";
			titrefen(typecl, 250);
			GM_deleteValue("scrollcl");
			fincache();
		}
		else if (/classement.php/.test(window.location) && GM_getValue("cht", false))
		{	var ba = $t("a"), bdiv;
			var listecht = unserialize(GM_getValue("listecht", ""));
			var envoimesnon = unserialize(GM_getValue("envoimesnon", "")), j;
			for (i=0;i<ba.length; i++)
				if (ba[i].href.indexOf("voirzoo.php") != -1)
				{	for (j=0;j<envoimesnon.length;j++) if (ba[i].innerHTML.toLowerCase() == envoimesnon[j].toLowerCase()) break;
					if (j == envoimesnon.length)
					{	btd = ba[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
						bdiv = $t("div", btd);
						if (parseInt(bdiv[2].innerHTML) > 249) listecht.push(ba[i].innerHTML);
					}
				}
			GM_setValue("listecht", serialize(listecht));
			var nbch = parseInt(GM_getValue("nbch")) - 1;
			if (nbch > 0)
			{	GM_setValue("nbch", nbch);
				for (i=0;i<ba.length; i++) if (ba[i].innerHTML.indexOf("Suivant") != -1) break;
				ba[i].dispatchEvent(clickmouse);
			}
			else
			{	GM_deleteValue("nbch");
				pagesuivante(urlSite + "team.php");
			}
		}
		else if (/classement.php/.test(window.location) && testcarac()) // page classement normale
		{	affichageclassement(true);
			if (GM_getValue("venteauto", false))
			{	GM_deleteValue("venteauto");
				fincache();
			}
		}
		else if (/team.php/.test(window.location) && GM_getValue("classement", "") != "") // page des teams, pour le classement
		{	var bspan = $t("span"), cl;
			if (bspan)
			{	cl = bspan[bspan.length-1].innerHTML.trim();
				GM_deleteValue("classement");
				if (cl != "Non classée")
				{	cl = cl.substring(0, cl.length - 15);
					GM_setValue("team_" + id_zoo, cl);
					cl = Math.max(0, parseInt(cl) - 7);
					GM_setValue("scrollcl", true);
					pagesuivante(urlSite + "classement.php?choix_class=3&deb=" + cl);
				}
				else
				{	alert("Votre team n'est pas encore classée");
					GM_setValue("venteauto", true); // simulation, pour exécuter le fincache
					pagesuivante(urlSite + "classement.php?choix_class=3");
				}
			}
			else if (testcarac())
			{	fincache();
				GM_deleteValue("team_"+id_zoo);
				GM_deleteValue("classement");
			}
		}
		else if (/team.php/.test(window.location) && testcarac()) // page des teams
		{	if (!GM_getValue("cht", false) && !GM_getValue("triteam", false)) // pour trier les joueurs
			{	GM_setValue("triteam", true);
				pagesuivante(urlSite + 'team.php');
				return;
			}
			else GM_deleteValue("triteam");
			if (GM_getValue("venteauto", false))
			{	GM_deleteValue("venteauto");
				fincache();
			}
			if (!GM_getValue("cht", false))
			{	var bspan = $t("span");
				if (bspan.length > 2) // vérification d'appartenance à une team
					GM_setValue("team_" + id_zoo, true);
				else GM_deleteValue("team_" + id_zoo);
				titrefen("Team");
				if (GM_getValue("team_" + id_zoo, false))
				{	for (i=0;i<bspan.length;i++) if (bspan[i].innerHTML.indexOf("Coeff") != -1) break;
					bspan[i].innerHTML = bspan[i].innerHTML.replace("Coeff 2", "Coeff 0.5").replace("Coeff 3", "Coeff 5").replace("Mission", "Missions", "g");
					bspan[i].innerHTML = bspan[i].innerHTML.replace("Coeff 1 x Nb_joueur", "si cl_mensuel < 51 : (51 - cl_mensuel) * nb_joueurs_team / 20<br><span style='padding-left:125px'>sinon : 0</span>");
					var btr = $t("tr");
					for (i=5;i<btr.length;i++)
						if (btr[i].innerHTML.indexOf("5 par joueur") != -1) break;
					i += 3;
					var ideb = i;
					while (btr[i].innerHTML.indexOf("realise0.jpg") != -1 || btr[i].innerHTML.indexOf("realise1.jpg") != -1)
					{	btr[i].style.height = "";
						btr[i].style.height = "39px";
						i++;
					}
					var ifin = i;
					btr[ideb].parentNode.parentNode.id = "tm0";
					$("tm0").setAttribute("style", "width:100%;border:1px solid #E9CA94");
					$("tm0").setAttribute("cellpadding", "0");
					btd = $t("td", $("tm0"));
					for (i=0;i<btd.length;i++) btd[i].setAttribute("style", "padding:1px 4px 0px");
					btd[5].setAttribute("bgcolor", "#FAEFDB");
					btd[5].setAttribute("colspan", "2");
					btd[5].innerHTML = "Animaux<br />&gt; à 75 000 Zoo'z";
					btd[6].innerHTML = "Naissances team du jour";
					btd[6].width = "86px";
					for (i=5;i<12;i++)
					{	btd[i].id = "miss" + (i-5);
						btd[i].setAttribute("style", "padding:1px 4px 0px;cursor:pointer;text-align:center");
						btd[i].setAttribute("onmouseout", "UnTip()");
						if (i>6) btd[i].innerHTML = (i-6)*10;
					}
					btd[12].parentNode.removeChild(btd[12]);
					var listemissions = new Array(), tabtri = new Array(), btd2, j;
					for (i=ideb;i<ifin;i++)
					{	listemissions[i-ideb] = new Array();
						listemissions[i-ideb][0] = btr[i].innerHTML;
						btd2 = $t("td", btr[i]);
						listemissions[i-ideb][1] = btd2[1].innerHTML;
						listemissions[i-ideb][2] = parseInt($t("div", btd2[2])[0].innerHTML);
						for (j=3;j<8;j++) listemissions[i-ideb][j] = btd2[j].innerHTML.indexOf("lise0") != -1 ? 0 : 1;
					}
					var donntip = "', BGCOLOR, '#FFFFAA', FONTFACE, 'Courier New', FONTSIZE, '8pt', ABOVE, 'true', TEXTALIGN, 'center')", cptok = 0, cptna = 0;
					btd[5].setAttribute("onmouseover", "Tip('Cette colonne contient " + (ifin-ideb) + " animaux.<br>Cliquez ici pour trier selon cette colonne" + donntip);
					btd[5].className = "nselmis";
					for (j=0;j<ifin-ideb;j++) { cptok += listemissions[j][2]; if (listemissions[j][2] > 0) cptna++; }
					btd[6].setAttribute("onmouseover", "Tip('Cette colonne contient " + cptok + " naissance" + (cptok > 1 ? "s" : "") + " pour " + cptna + (cptna == 1 ? " seule" : "") + " espèce" + (cptna > 1 ? "s différentes" : "") + "." + (cptok > 0 ? "<br>Cliquez ici pour trier selon cette colonne" : "") + donntip);
					btd[6].className = "nselmis";
					for (i=7;i<12;i++)
					{	cptok = 0;
						for (j=0;j<ifin-ideb;j++) cptok += listemissions[j][i-4];
						btd[i].setAttribute("onmouseover", "Tip('Cette colonne contient " + cptok + " OK." + (cptok > 1 ? "<br>Cliquez ici pour mieux les voir" : cptok == 1 ? "<br>Cliquez ici pour mieux le voir" : "") + donntip);
						btd[i].className = "nselmis";
						if (i == 8) cptna = cptok;
					}
					var tm, debtab = "<tr>" + btr[ideb-3].innerHTML + "</tr><tr>" + btr[ideb-2].innerHTML + "</tr><tr>" + btr[ideb-1].innerHTML + "</tr>";
					$t("td", $("tm0"))[5].className = "selmis";
					for (j=1;j<7;j++)
					{	tm = document.createElement("table");
						tm.setAttribute("style", "width:100%;border:1px solid #E9CA94");
						tm.setAttribute("cellspacing", "0");
						tm.id = "tm" + j;
						tm.innerHTML = debtab;
						$t("td", $c("content_site")[0])[0].insertBefore(tm, $("tm"+(j-1)).nextSibling);
						$t("td", $("tm"+j))[j+5].className = "selmis";
					}
					for (i=1;i<7;i++) $("tm"+i).style.display = "none";
				}
				GM_setValue("pgteam", window.name);
				window.setTimeout(MAJpageteam, 900000);
			}
			if (parseInt(GM_getValue("afficheadulte", 3)) == 5)
			{	if (!GM_getValue("cht", false))
				{	if (GM_getValue("listeteam", "") != "") tabteam();
					var binput = document.createElement("input");
					binput.type = "text";
					binput.id = "espch";
					binput.setAttribute("style", "font-size:12px;padding:0px;text-align:center");
					binput.size = "18";
					binput.value = GM_getValue("espch", "");
					var nom = document.createElement("label");
					nom.setAttribute("for", "espch");
					nom.innerHTML = " espèce à trouver : ";
					var bdiv = $t("div");
					ajoute_br(bdiv[50]);
					ajoute_br(bdiv[50]);
					bdiv[50].appendChild(nom);
					bdiv[50].appendChild(binput);
					var ba = document.createElement("a");
					ba.innerHTML = "Chercher";
					ba.id = "chercheesp";
					ba.addEventListener("click", chercheespf, true);
					ba.setAttribute("style", "cursor:pointer;padding-left:10px");
					bdiv[50].appendChild(ba);
				}
				var bform = $t("form");
				for (i=0;i<bform.length;i++) if (bform[i].innerHTML.indexOf("Inviter un joueur") != -1) break;
				if (i < bform.length)
				{	if (!GM_getValue("cht", false))
					{	ajoute_br(bform[0]);
						ajoute_br(bform[0]);
						binput = document.createElement("input");
						binput.type = "text";
						binput.id = "debch";
						binput.setAttribute("style", "font-size:12px;padding:0px;text-align:center");
						binput.size = "4";
						binput.value = parseInt(GM_getValue("debch", 0));
						nom = document.createElement("label");
						nom.setAttribute("for", "debch");
						nom.innerHTML = " début classement prestige : ";
						bform[0].appendChild(nom);
						bform[0].appendChild(binput);
						binput = document.createElement("input");
						binput.type = "text";
						binput.id = "nbch";
						binput.setAttribute("style", "font-size:12px;padding:0px;text-align:center");
						binput.size = "2";
						binput.value = parseInt(GM_getValue("nbch", 1));
						nom = document.createElement("label");
						nom.setAttribute("for", "nbch");
						nom.innerHTML = " ; nb pages classement : ";
						bform[0].appendChild(nom);
						bform[0].appendChild(binput);
						ba = document.createElement("a");
						ba.innerHTML = "Recruter";
						ba.id = "chercheteam";
						ba.addEventListener("click", chercheteamf, true);
						ba.setAttribute("style", "cursor:pointer;padding-left:10px");
						bform[0].appendChild(ba);
						ajoute_br(bform[0]);
					}
					else
					{	var binput = $t("input", bform[0]);
						var listecht = unserialize(GM_getValue("listecht", ""));
						var oldch = GM_getValue("oldch", "");
						if (oldch != "")
						{	if ($t("strong")[0].innerHTML.indexOf("Message non env") == -1)
							{	GM_setValue("envoimes", GM_getValue("envoimes", "") + oldch +";");
								GM_setValue("envoimesnb", parseInt(GM_getValue("envoimesnb", 0)) + 1);
							}
						}
						if (listecht.length > 0)
						{	binput[0].value = listecht.shift();
							GM_setValue("oldch", binput[0].value);
							GM_setValue("listecht", serialize(listecht));
							binput[1].dispatchEvent(clickmouse);
						}
						else
						{	GM_deleteValue("cht");
							GM_deleteValue("oldch");
							GM_setValue("venteauto", true); // simulation, pour exécuter le fincache
							pagesuivante(window.location.href);
						}
					}
				}
			}
		}
		else if (/voirzoo.php/.test(window.location) && testcarac()) // page des listes du zoo
		{	if (!GM_getValue("cht", false))
			{	if (GM_getValue("testperiodique" , "") != "") { fincache(); GM_deleteValue("testperiodique"); }
				var bp = $t("p"), txt;
				txt = "</p><p>Vous êtes sur la page des listes, la carte ci-dessus est inactive.<br>Pour accéder à la carte interactive, cliquez sur \'Carte du zoo\' dans le menu du jeu ou dans le tableau des liens.</p><p a";
				bp[0].parentNode.innerHTML = bp[0].parentNode.innerHTML.replace("</p><p a", txt);
				if (window.location.href.indexOf(monzoo) != -1)
				{	var bimg = $t("img"), item;
					var enchere = unserialize(GM_getValue("enchere_" + id_zoo, ""));
					for (i=0;i<bimg.length;i++)
					{	if (bimg[i].src.indexOf("musee") != -1 || bimg[i].src.indexOf("botanica") != -1)
						{	nom = bimg[i].src;
							nom = nom.substring(nom.indexOf("mages")+6, nom.indexOf(".jpg"));
							nom = nom[0] + nom.substring(nom.indexOf("/")+1);
							item = nom[0] == "m" ? "Item" : "Plante";
							bimg[i].setAttribute("onmouseout", "UnTip()");
							if (!enchere[nom]) valenchere = "???";
							else valenchere = millier(enchere[nom]);
							numero = nom.substring(1);
							bimg[i].setAttribute("onmouseover", "Tip('" + item + " " + numero + ", prix d&rsquo;achat : " + valenchere + " Zoo&rsquo;z', BGCOLOR, '#FFFFAA', FONTFACE, 'Courier New', FONTSIZE, '8pt', ABOVE, 'true', TEXTALIGN, 'center')");
						}
					}
					tableau_vieux();
				}
				var nomzoo = $t("strong", $c("title_site")[0])[0].innerHTML.substring(6).trim();
				titrefen("Listes du zoo \"" + nomzoo + "\"");
			}
			else
			{	bstrong = $t("table");
				for (i=0;i<bstrong.length;i++)
					if (bstrong[i].width == "290") break;
				bstrong = $t("strong", bstrong[i]);
				var espch = GM_getValue("espch", "");
				for (i=0;i<bstrong.length;i++)
					if (bstrong[i].innerHTML.toLowerCase().trim() == espch) break;
				var zteam = $c("title_site")[0].innerHTML;
				zteam = zteam.substring(zteam.indexOf("Zoo - ")+6, zteam.indexOf("</stro")).trim();
				var listeteam = unserialize(GM_getValue("listeteam", ""));
				var nbt = listeteam.length;
				listeteam[nbt] = new Array();
				listeteam[nbt][0] = zteam;
				listeteam[nbt][1] = i < bstrong.length ? parseInt(bstrong[i+1].innerHTML.substring(2)) : 0;
				GM_setValue("listeteam", serialize(listeteam));
				var listecht = unserialize(GM_getValue("listecht", ""));
				if (listecht.length > 0)
				{	var nextzoo = listecht.shift();
					GM_setValue("listecht", serialize(listecht));
					pagesuivante(nextzoo);
				}
				else
				{	GM_deleteValue("cht");
					GM_setValue("venteauto", true); // simulation, pour exécuter le fincache
					pagesuivante(urlSite + "team.php");
				}
			}
		}
		else if (/missions.php/.test(window.location) && scan) // page des missions en cours de scan
		{	var btr = $t("tr");
			for (i=btr.length-1;i>=5;i--) if (btr[i].innerHTML.indexOf("<a name=\"2") != -1) break;
			var ideb = i+4, icim = null, mesp = null;
			for (i=ideb;i<btr.length;i++)
			{	if (btr[i].innerHTML.indexOf("En cours") != -1) icim = i;
				if (btr[i].innerHTML.indexOf("Espionage") != -1) mesp = i;
				if (icim && mesp) break;
			}
			if (icim || GM_getValue("misencours_" + id_zoo, "") != "" || GM_getValue("lctoutou", false))
			{	if (btr[mesp].innerHTML.indexOf("bloquer") != -1 && !GM_getValue("lctoutou", false))  // la mission espionnage n'a pas encore été réalisée, étape 1
				{	GM_setValue("misencours_" + id_zoo, icim);
					GM_setValue("debloc", true);
					var ba = $t("a", btr[mesp])[0];
					ba.dispatchEvent(clickmouse);
				}
				else if (GM_getValue("misencours_" + id_zoo, "") != "" && !GM_getValue("debloc", false)) // étape 3
				{	var txt = btr[mesp].innerHTML;
					txt = txt.substring(txt.indexOf(" : ")+3);
					nbr = parseInt(txt.substring(0, txt.indexOf(" Zoo")));
					if (nbr < 300000 || (btr[mesp].innerHTML.indexOf("alid") != -1 && GM_getValue("finmis", false))) // on réactive la mission d'origine
					{	icim = GM_getValue("misencours_" + id_zoo, "");
						GM_deleteValue("misencours_" + id_zoo);
						GM_deleteValue("finmis");
						GM_setValue("lctoutou", true);
						var ba = $t("a", btr[icim])[0];
						ba.dispatchEvent(clickmouse);
					}
					else if (btr[mesp].innerHTML.indexOf("alid") != -1) // la mission a été validée !
					{	GM_setValue("finmis", true);
						pagesuivante(urlSite + "espion.php");
					}
					else pagesuivante(urlSite + "toutou.php"); // on a réussi la mission, mais elle n'est pas encore validée : on attend la maj suivante
				}
				else if (GM_getValue("lctoutou", false)) // étape 4
				{	GM_deleteValue("lctoutou");
					pagesuivante(urlSite + "toutou.php");
				}
				else // étape 2
				{	GM_deleteValue("debloc");
					pagesuivante(urlSite + "espion.php");
				}
			}
			else pagesuivante(urlSite + "espion.php");
		}
		else if (/missions.php/.test(window.location) && testcarac()) // page des missions, mise en évidence de la mission en cours
		{	GM_setValue("invasion", window.name);
			var txt, nbr, nbr2, j, ideb, ifin;
			var bdiv = $c("title_site");
			bdiv[0].style.height = "";
			bdiv[0].style.height = "34px";
			bdiv = $c("title_site2");
			bdiv[0].style.height = "";
			bdiv[1].style.height = "";
			bdiv[0].style.height = "36px";
			bdiv[1].style.height = "36px";
			var btr = $t("tr");
			for (i=5;i<btr.length;i++)
				if (btr[i].innerHTML.indexOf("realise0.jpg") != -1) break;
			btr[i].style.height = "";
			btr[i].style.height = "139px";
			i += 5;
			ideb = i;
			while (btr[i].innerHTML.indexOf("realise0.jpg") != -1 || btr[i].innerHTML.indexOf("realise1.jpg") != -1)
			{	if (btr[i].innerHTML.indexOf("bonus_phasme") != -1) btr[i].innerHTML = btr[i].innerHTML.replace("bonus_phasme", "insectarium_phasme");
				btr[i].style.height = "";
				btr[i].style.height = "40px";
				i++;
			}
			ifin = i;
			for (i=ifin;i<btr.length;i++)
			{	if (btr[i].innerHTML.indexOf("Invasion") != -1)
				{	btr[i].style.height = "";
					btr[i].style.height = "130px";
					break;
				}
			}
			btr[ideb].parentNode.parentNode.id = "tm0";
			$("tm0").setAttribute("style", "width:100%;border:1px solid #E9CA94");
			$("tm0").setAttribute("cellpadding", "0");
			btd = $t("td", $("tm0"));
			for (i=0;i<btd.length;i++) btd[i].setAttribute("style", "padding:1px 4px 0px");
			btd[7].setAttribute("bgcolor", "#FAEFDB");
			btd[7].setAttribute("colspan", "2");
			for (i=7;i<13;i++)
			{	btd[i].id = "miss" + (i-7);
				btd[i].setAttribute("style", "padding:1px 4px 0px;cursor:pointer;text-align:center;font-size:16px;font-weight:bold");
				btd[i].setAttribute("onmouseout", "UnTip()");
				if (i>7 && i<12) btd[i].innerHTML = i-7;
			}
			btd[7].innerHTML = "Animaux";
			btd[12].innerHTML = 300;
			btd[13].parentNode.removeChild(btd[13]);
			var listemissions = new Array(), btd2;
			for (i=ideb;i<ifin;i++)
			{	listemissions[i-ideb] = new Array();
				listemissions[i-ideb][0] = btr[i].innerHTML;
				btd2 = $t("td", btr[i]);
				listemissions[i-ideb][1] = btd2[1].innerHTML;
				for (j=2;j<6;j++) listemissions[i-ideb][j] = btd2[j].innerHTML.indexOf("lise0") != -1 ? 0 : 1;
				listemissions[i-ideb][6] = $t("div", btd2[6])[1].innerHTML;
				listemissions[i-ideb][6] = parseInt(listemissions[i-ideb][6].substring(0, listemissions[i-ideb][6].indexOf("/")));
			}
			var donntip = "', BGCOLOR, '#FFFFAA', FONTFACE, 'Courier New', FONTSIZE, '8pt', ABOVE, 'true', TEXTALIGN, 'center')", cptok, cptna;
			btd[7].setAttribute("onmouseover", "Tip('Cette colonne contient " + (ifin-ideb) + " animaux.<br>Cliquez ici pour trier selon cette colonne" + donntip);
			btd[7].className = "nselmis";
			for (i=8;i<12;i++)
			{	cptok = 0;
				for (j=0;j<ifin-ideb;j++) cptok += listemissions[j][i-6];
				btd[i].setAttribute("onmouseover", "Tip('Cette colonne contient " + cptok + " OK." + (cptok > 1 ? "<br>Cliquez ici pour mieux les voir" : cptok == 1 ? "<br>Cliquez ici pour mieux le voir" : "") + donntip);
				btd[i].className = "nselmis";
				if (i == 8) cptna = cptok;
			}
			cptok = 0;
			for (j=0;j<ifin-ideb;j++) cptok += listemissions[j][6];
			btd[12].setAttribute("onmouseover", "Tip('Cette colonne contient " + cptok + " naissances pour " + cptna + " espèces différentes." + (cptok > 0 ? "<br>Cliquez ici pour trier selon cette colonne" : "") + donntip);
			btd[12].className = "nselmis";
			var tm, debtab = "<tr>" + btr[ideb-3].innerHTML + "</tr>" + "<tr>" + btr[ideb-2].innerHTML + "</tr>" + "<tr>" + btr[ideb-1].innerHTML + "</tr>";
			$t("td", $("tm0"))[7].className = "selmis";
			for (j=1;j<6;j++)
			{	tm = document.createElement("table");
				tm.setAttribute("style", "width:100%;border:1px solid #E9CA94");
				tm.setAttribute("cellspacing", "0");
				tm.id = "tm" + j;
				tm.innerHTML = debtab;
				$t("td", $c("content_site")[0])[0].insertBefore(tm, $("tm"+(j-1)).nextSibling);
			}
			for (i=1;i<6;i++) $("tm"+i).style.display = "none";
			var ideb2 = ifin + 1;
			var bfont, naiss = unserialize(GM_getValue("string_naissances_" + id_zoo, ""));
			for (i=ideb2;i<btr.length;i++)
			{	if (btr[i].innerHTML.indexOf("d peace") != -1)
				{	txt = btr[i].innerHTML;
					for (nbr in naiss)
						for (j=0;j<naiss[nbr].length;j+=2)
						{	if (naiss[nbr][j] == "colombe")
								txt = txt.replace(naiss[nbr][j], "<font color='green' size='3'><strong>" + naiss[nbr][j] + "</strong></font>");
							if (naiss[nbr][j] == "ours rastafarai")
								txt = txt.replace("ours rastafaraï", "<font color='green' size='3'><strong>ours rastafaraï</strong></font>");
						}
					btr[i].innerHTML = txt;
				}
				else if (btr[i].innerHTML.indexOf("Papier alu") != -1)
				{	txt = btr[i].innerHTML;
					nbr = parseInt(txt.substring(txt.indexOf("motte :")+8, txt.indexOf(" / ")));
					txt = txt.substring(txt.indexOf(" / ")+3);
					nbr2 = parseInt(txt.substring(0, txt.indexOf("<")));
					nbr = nbr < nbr ? nbr : nbr;
					nbr = "<br><br>" + parseInt(10000 * nbr / nbr2) / 100 + "&nbsp;% réalisé";
					bfont = $t("font", btr[i]);
					bfont[0].innerHTML = bfont[0].innerHTML + nbr;
				}
				else if (btr[i].innerHTML.indexOf("Invasion") != -1)
				{	var listei = invasion(), tabfo;
					do
						tabfo = listei.shift();
					while (typeof(tabfo) == "undefined");
					listei.unshift(tabfo);
					txt = btr[i].innerHTML;
					var txt2 = txt.replace("ecureuil", "écureuil");
					txt2 = txt2.replace("<br>", "¤");
					txt2 = txt2.replace(" <br>", "");
					var encl, t, v;
					txt2 = txt2.replace("foret", "forêt", "g");
					var listencl = unserialize("0,30;1,31;2,32;3,33;4,34;5,35;6,36;7,37;8,38;9,39;10,40;11,56;12,57;13,58;14,59;15,60;");
					var cpt = 0;
					var ligne = new Array();
					while (txt2.indexOf("- ") != -1)
					{	encl = listencl.shift();
						if (parseInt(txt2.substring(txt2.indexOf(" : ")+3, txt2.indexOf("/1"))) == 0)
						{	t = Math.floor(encl/100);
							v = encl - t*100;
							ligne[cpt] = "<tr><td align='left' style='border:1px solid #000;padding:0px 3px'>@ <a href='" + urlSite + "enclosgestion1.php?t=" + t + "&v=" + v + "'>" + txt2.substring(txt2.indexOf("- ")+2, txt2.indexOf(" : ")) + "</a> €" + txt2.substring(txt2.indexOf(" : ")+2, txt2.indexOf("/1")+1) + "2";
						}
						else ligne[cpt] = "<tr><td align='left' style='padding:0px 3px'>@ " + txt2.substring(txt2.indexOf("- ")+2, txt2.indexOf(" : ")) + " €" + txt2.substring(txt2.indexOf(" : ")+2, txt2.indexOf("/1")+1) + "2";
						txt2 = txt2.replace(txt2.substring(txt2.indexOf("- "), txt2.indexOf("/1")+2), ligne[cpt]);
						cpt++;
					}
					var txt3 = "</td><td style='border:1px solid #000;padding:0px 3px;background-color:#6BD949'>";
					txt = txt.substring(txt.indexOf(" : ")+3);
					nbr = 0; cpt = 0;
					var caseligne = new Array(), caseligne2 = new Array(), txt4, afftab = false;
					while (txt.indexOf(" : ") != -1)
					{	nbr2 = parseInt(txt.substring(txt.indexOf(" : ")+3, txt.indexOf("/1")));
						tabfo = listei.shift();
						if (typeof(tabfo) == "undefined")
						{	do
								tabfo = listei.shift();
							while (typeof(tabfo) == "undefined");
						}
						if (nbr2 == 0)
						{	afftab = true;
							caseligne[cpt] = parseInt(tabfo[3]);
							caseligne2[cpt] = parseFloat(tabfo[4]);
							txt4 = txt3 + tabfo[0] + txt3 + tabfo[1] + txt3 + tabfo[2] + txt3 + millier(tabfo[3]) + txt3 + (tabfo[4]<0 ? "- " : "+ ") + (tabfo[4]<0 ? 0-tabfo[4] : tabfo[4]) + " %</td></tr>";
						}
						else
						{	caseligne[cpt] = 10000000;
							caseligne2[cpt] = 1000;
							txt4 = "</td></tr>";
						}
						txt2 = txt2.replace("<br>", txt4 + (txt.indexOf("16") != 35 ? "" : "</table>"));
						ligne[cpt] += txt4;
						txt = txt.substring(txt.indexOf("/")+1);
						nbr += nbr2 < 1 ? nbr2 : 1;
						cpt++;
					}
					nbr = "<br><br>" + parseInt(10000 * nbr / 16) / 100 + "&nbsp;% réalisé";
					var entete = afftab ? "<tr><td id='inv1' align='left' style='cursor:pointer' onmouseout=\"UnTip()\" onmouseover=\"Tip('Cliquez ici pour trier selon cette colonne', BGCOLOR, '#FFFFAA', FONTFACE, 'Courier New', FONTSIZE, '8pt', ABOVE, 'true', TEXTALIGN, 'center')\">Naissance écureuils :</td><th width=\"20px\" style='border:1px solid #000;padding:0px;background-color:#eac893'><img src=\"images/icones/male.gif\" onmouseout=\"UnTip()\" onmouseover=\"Tip('Nombre d&rsquo;écureuils mâles', BGCOLOR, '#FFFFAA', FONTFACE, 'Courier New', FONTSIZE, '8pt', ABOVE, 'true', TEXTALIGN, 'center')\"></th><th width=\"20px\" style='border:1px solid #000;padding:0px;background-color:#eac893'><img src=\"images/icones/female.gif\" onmouseout=\"UnTip()\" onmouseover=\"Tip('Nombre d&rsquo;écureuils femelles', BGCOLOR, '#FFFFAA', FONTFACE, 'Courier New', FONTSIZE, '8pt', ABOVE, 'true', TEXTALIGN, 'center')\"></th><th style='border:1px solid #000;padding:0px 3px;background-color:#eac893' onmouseout=\"UnTip()\" onmouseover=\"Tip('Espèce à acheter pour rechercher un écureuil', BGCOLOR, '#FFFFAA', FONTFACE, 'Courier New', FONTSIZE, '8pt', ABOVE, 'true', TEXTALIGN, 'center')\">EspèceR</th><th id='inv2' style='border:1px solid #000;cursor:pointer;padding:0px 3px;background-color:#eac893' onmouseout=\"UnTip()\" onmouseover=\"Tip('Prix de recherche (achat moins revente)<br><br>Cliquez ici pour trier selon cette colonne', BGCOLOR, '#FFFFAA', FONTFACE, 'Courier New', FONTSIZE, '8pt', ABOVE, 'true', TEXTALIGN, 'center')\">PrixR</th><th id='inv3' style='border:1px solid #000;cursor:pointer;padding:0px;background-color:#eac893' onmouseout=\"UnTip()\" onmouseover=\"Tip('% par rapport au prix de base de l&rsquo;animal le moins cher de son groupe<br><br>Cliquez ici pour trier selon cette colonne', BGCOLOR, '#FFFFAA', FONTFACE, 'Courier New', FONTSIZE, '8pt', ABOVE, 'true', TEXTALIGN, 'center')\">%</th></tr>" : "<tr><td align='left'>Naissance écureuils :</td></tr>";
					txt2 = txt2.replace(txt2.substring(txt2.indexOf("Naissa"), txt2.indexOf(" :")+2), "<table id='tb1' style='border-collapse:collapse;text-align:center;cursor:default;font-size:12px'>" + entete);
					btr[i].innerHTML = txt2;
					bfont = $t("font", btr[i]);
					bfont[0].innerHTML = bfont[0].innerHTML + nbr;
					btd = $t("td",btr[i])[1].innerHTML;
					btd += "<table id='tb2' style='border-collapse:collapse;text-align:center;cursor:default;font-size:12px'>" + entete;
					var lignetriee = new Array();
					for (j=0;j<ligne.length;j++) lignetriee.push(j);
					lignetriee.sort(function (a, b) { return caseligne[a] - caseligne[b]; });
					for (j=0;j<lignetriee.length;j++) btd += ligne[lignetriee[j]];
					btd += "</table>";
					btd += "<table id='tb3' style='border-collapse:collapse;text-align:center;cursor:default;font-size:12px'>" + entete;
					lignetriee.sort(function (a, b) { return caseligne2[a] - caseligne2[b]; });
					for (j=0;j<lignetriee.length;j++) btd += ligne[lignetriee[j]];
					btd += "</table>";
					btd = btd.replace("/2", "/1", "g");
					btd = btd.replace("@", "-", "g");
					btd = btd.replace("€", ":", "g");
					btd = btd.replace("¤", "<br><br>", "g")
					$t("td",btr[i])[1].innerHTML = btd;
					$("tb2").style.display = "none";
					$("tb3").style.display = "none";
				}
				else if (btr[i].innerHTML.indexOf("Espionage") != -1)
				{	txt = btr[i].innerHTML;
					btr[i].innerHTML = txt.replace("piona", "pionna");
					txt = txt.substring(txt.indexOf(" : ")+3);
					nbr = parseInt(txt.substring(0, txt.indexOf(" Zoo")));
					nbr = nbr < 300000 ? nbr : 300000;
					nbr2 = "<br><br>" + parseInt(10000 * nbr / 300000) / 100 + "&nbsp;% réalisé";
					btr[i].innerHTML = btr[i].innerHTML.replace(nbr, millier(nbr));
					bfont = $t("font", btr[i]);
					bfont[0].innerHTML = bfont[0].innerHTML + nbr2;
					if (btr[i].innerHTML.indexOf("En cours") != -1)
						btr[i].innerHTML = btr[i].innerHTML.replace("Zoo'z</td", "Zoo'z<br /><br /><strong>NB : il n'est pas conseillé de débloquer cette mission : le script le fera automatiquement juste avant de lancer vos espions, ce qui vous permet d'avoir 2 missions avancées activées en même temps ;)<br /><br />EXCEPTION : si cette mission est à '100% réalisé', laissez la mission en mode 'en cours' afin qu'à la prochaine maj elle soit validée !</strong></td");
				}
				else if (btr[i].innerHTML.indexOf("légende") != -1)
				{	btr[i].innerHTML = btr[i].innerHTML.replace("Sasqua", "sasqua", "g");
					btr[i].style.height = "";
					btr[i].style.height = "96px";
				}
				else if (btr[i].innerHTML.indexOf("Chauv") != -1)
				{	txt = btr[i].innerHTML;
					for (nbr in naiss)
						for (j=0;j<naiss[nbr].length;j+=2)
						{	if (naiss[nbr][j] == "dendrobate bleu" || naiss[nbr][j] == "paon bleu" || naiss[nbr][j] == "cigogne blanche" || naiss[nbr][j] == "loup blanc" ||
								naiss[nbr][j] == "mamba rouge" || naiss[nbr][j] == "ibis rouge")
								txt = txt.replace(naiss[nbr][j], "<font color='green' size='3'><strong>" + naiss[nbr][j] + "</strong></font>");
							if (naiss[nbr][j] == "coq patriote")
							{	txt = txt.replace("<span style=\"background-color:#999999\"><span class=\"Style14\">coq</span>", "<font color='green' size='3'><strong>coq</strong></font>");
								txt = txt.replace("<span class=\"Style12\">patr</span>", "<font color='green' size='3'><strong>patr</strong></font>");
								txt = txt.replace("<span class=\"Style9\">iote</span></span>", "<font color='green' size='3'><strong>iote</strong></font>");
							}
						}
					btr[i].innerHTML = txt;
				}
				else if (btr[i].innerHTML.indexOf("climat") != -1)
				{	txt = btr[i].innerHTML;
					for (nbr in naiss)
						for (j=0;j<naiss[nbr].length;j+=2)
							if (naiss[nbr][j] == "renard polaire" || naiss[nbr][j] == "ours polaire" || naiss[nbr][j] == "phoque")
								txt = txt.replace(naiss[nbr][j], "<font color='green' size='3'><strong>" + naiss[nbr][j] + "</strong></font>");
					btr[i].innerHTML = txt;
				}
				else if (btr[i].innerHTML.indexOf("Yin") != -1)
				{	txt = btr[i].innerHTML;
					for (nbr in naiss)
						for (j=0;j<naiss[nbr].length;j+=2)
						{	if (naiss[nbr][j] == "zebre")
								txt = txt.replace("zèbre", "<font color='green' size='3'><strong>zèbre</strong></font>");
							if (naiss[nbr][j] == "orque" || naiss[nbr][j] == "pingouin" || naiss[nbr][j] == "panda")
								txt = txt.replace(naiss[nbr][j], "<font color='green' size='3'><strong>" + naiss[nbr][j] + "</strong></font>");
							if (naiss[nbr][j] == "ibis sacre")
								txt = txt.replace("ibis sacré", "<font color='green' size='3'><strong>ibis sacré</strong></font>");
						}
					btr[i].innerHTML = txt;
				}
				else if (btr[i].innerHTML.indexOf("jaloux") != -1)
				{	btr[i].innerHTML = btr[i].innerHTML.replace("vivair", "vivari", "g");
					var bulleav = unserialize(GM_getValue("bulleavoir_" + id_zoo, ""));
					var nbnais1 = new String(bulleav[100]);
					nbnais1 = nbnais1 ? (nbnais1.indexOf("naissance") != -1 ? parseInt(nbnais1.substring(0, nbnais1.indexOf(" naissance"))) : 0) : 0;
					txt = "naissances volière : " + nbnais1;
					var nbnais2 = new String(bulleav[101]);
					nbnais2 = nbnais2 ? (nbnais2.indexOf("naissance") != -1 ? parseInt(nbnais2.substring(0, nbnais2.indexOf(" naissance"))) : 0) : 0;
					txt += ", aquarium : " + nbnais2;
					var nbnais3 = new String(bulleav[102]);
					nbnais3 = nbnais3 ? (nbnais3.indexOf("naissance") != -1 ? parseInt(nbnais3.substring(0, nbnais3.indexOf(" naissance"))) : 0) : 0;
					txt += ", vivarium : " + nbnais3;
					if (nbnais1 > 4 && nbnais2 > 4 && nbnais3 > 4 && nbnais1 == nbnais2 && nbnais2 == nbnais3)
						txt = "<font color='green' size='3'><strong>" + txt + "</strong></font>";
					btr[i].innerHTML = btr[i].innerHTML.replace("aquarium, vivarium, voliere", txt);
					btr[i].style.height = "";
					btr[i].style.height = "96px";
				}
			}
			var icim = null;
			for (i=ideb2;i<btr.length;i++)
				if (btr[i].innerHTML.indexOf("En cours") != -1) { icim = i; break; }
			if (!icim) // aucune mission avancée n'a été débloquée...
			{	for (i=ideb2;i<btr.length;i++)
					if (btr[i].innerHTML.indexOf("bloquer") != -1) { icim = i; break; } // ... mais il en reste à débloquer
					// si toutes les missions avancées ont été faites -> à voir
			}
			if (btr[icim].innerHTML.indexOf("Débloquer") == -1)
			{	btr[icim].setAttribute("bgcolor", "#eac893");
				btd = $t("td", btr[icim]);
				for (j=0;j<btd.length;j++) btd[j].setAttribute("bgcolor", "");
				btd = $t("font", btr[icim]);
				btd[btd.length-1].setAttribute("color", "indigo");
			}
			titrefen("Vos missions");
			window.setTimeout(MAJpagemission, 900000);
		}
		else if (/vente_animaux.php/.test(window.location) && GM_getValue("pas un animal bonus", "") != "") // on vend l'animal pas bonus
		{	var binput = $t("input");
			bstrong = $t("strong");
			bstrong[1].innerHTML = "Veuillez patienter, vente automatique en cours...";
			espece = GM_getValue("cherchebonus");
			GM_setValue("temp_vente", espece.substring(0, espece.indexOf(";")-1));
			GM_setValue("val_vente", parseInt(bstrong[0].innerHTML.trim()));
			var numenclos = parseInt($n("v").value);
			numenclos += parseInt($n("t").value)*100;
			binput[5].style.visibility = "hidden";
			if (testcarac()) binput[5].dispatchEvent(clickmouse);
		}
		else if (/vente_animaux.php/.test(window.location) && GM_getValue("venteauto", false))
		{	var binput = $t("input");
			bstrong = $t("strong");
			bstrong[1].innerHTML = "Veuillez patienter, vente automatique en cours...";
			var bimg = $t("img");
			var nom = bimg[bimg.length-1].src;
			nom = nom.substring(nom.indexOf("_")+1, nom.indexOf(".jpg"));
			nom = nom.replace("%20", " ", "g");
			nom = nom.replace("2", "");
			GM_setValue("temp_vente", nom);
			GM_setValue("val_vente", parseInt(bstrong[0].innerHTML.trim()));
			var numenclos = parseInt($n("v").value);
			numenclos += parseInt($n("t").value)*100;
			binput[5].style.visibility = "hidden";
			if (testcarac()) binput[5].dispatchEvent(clickmouse);
		}
		else if (/vente_animaux.php/.test(window.location) && testcarac()) // si on vend un animal, on ajoute ses caractéristiques
		{	titrefen("Vente d'un animal");
			bstrong = $t("strong");
			GM_setValue("val_vente", parseInt(bstrong[0].innerHTML.trim()));
			btd = $t("td");
			var liste = new Array();
			var libelle, numero, txt;
			for (i=0;i<btd.length;i++)
			{	if (btd[i].width == "100")
				{	libelle = btd[i+2].innerHTML;
					numero = recherche_param(window.location.search, "ids");
					liste = unserialize(GM_getValue("liste", ""));
					txt = new String(liste[numero]);
					txt = txt.substring(0, txt.indexOf("prix de ve"));
					txt = txt.replace("z<br>bourse", "z, bourse");
					var bimg = $t("img");
					var nom = bimg[bimg.length-1].src;
					nom = nom.substring(nom.indexOf("_")+1, nom.indexOf(".jpg"));
					nom = nom.replace("%20", " ", "g");
					nom = nom.replace("2", "");
					GM_setValue("temp_vente", nom);
					libelle = libelle.substring(0,12) + ":<br><strong>" + txt + "</strong><br>" + libelle.substring(11,libelle.length-1) + ".";
					btd[i+2].innerHTML = libelle;
					if (btd[i+2].innerHTML.indexOf("cervicapre femelle") != -1)
					{	txt = btd[i].innerHTML;
						txt = txt.replace("capre.jpg", "capre2.jpg");
						btd[i].innerHTML = txt;
					}
					var numenclos = parseInt($n("v").value);
					numenclos += parseInt($n("t").value)*100;
					break;
				}
			}
			tableau_animauxf(unserialize(GM_getValue("enclos")));
		}
		else if (/vente_animaux_group.php/.test(window.location) && testcarac())
		{	var listeas = unserialize(GM_getValue("listeas", ""));
			var liste = unserialize(GM_getValue("liste", ""));
			var bli = $t("li"), txt;
			for (i=0; i<bli.length; i++)
			{	val_vente = bli[i].innerHTML;
				val_vente = parseInt(val_vente.substring(val_vente.indexOf(" (")+2, val_vente.indexOf(" Zo")));
				txt = new String(liste[listeas[i]]);
				if (txt.indexOf("z<br>bourse") != -1) txt = txt.replace("z<br>bourse", "z, bourse");
				txt = "<strong>" + txt.substring(0, txt.indexOf("vente :")+8).replace(",", "</strong>,") + "<strong>" + millier(val_vente) + "</strong> Zoo'z";
				bli[i].innerHTML = txt;
			}
			bstrong = $t("strong");
			txt = new String(bstrong[bstrong.length-1].innerHTML);
			val_vente = txt.substring(txt.indexOf("total de")+9, txt.indexOf(" Zoo"));
			bstrong[bstrong.length-1].innerHTML = txt.replace(val_vente, millier(parseInt(val_vente)));
			var numenclos = parseInt($n("vtemp").value);
			numenclos = numenclos > 900 ? numenclos - 1000 : numenclos;
			numenclos += parseInt($n("t").value)*100;
			var binput = $t("input");
			if (!GM_getValue("ventemourants", false) && !GM_getValue("ventetrop", false))
			{	titrefen("Liste des animaux à vendre", Math.max(positionY(binput[binput.length-1]) - window.innerHeight + 40, positionY($c("minibarre")[0]) + 1));
				tableau_animauxf(unserialize(GM_getValue("enclos")));
			}
			else binput[binput.length-1].dispatchEvent(clickmouse);
		}
		else if (/enclosgestion.php/.test(window.location) && testcarac()) // boutique et autres
		{	var t = parseInt(recherche_param(window.location.search, "t"));
			var v = parseInt(recherche_param(window.location.search, "v"));
			bad = false;
			var typepage;
			if (t == 4) // boutique
			{	var miniprov = 150 * (v + 1);
				bstrong = $t("strong");
				if (bstrong.length > 2) // la boutique a été construite
				{	var actupr = parseInt(bstrong[2].innerHTML);
					var MAJfait = "";
					if (GM_getValue("boutique", false) || scan)
					{	if (actupr < miniprov)
							{ bad = true; pagesuivante(urlSite + "enclosgestion.php?v=" + v + "&t=4&achat=100"); }
						else if (!scan)
						{	GM_deleteValue("boutique");
							fincache();
							MAJfait = "maintenant ";
						}
					}
					if (!GM_getValue("boutique", false) && !scan)
					{	var bdiv = $t("div");
						if (actupr < miniprov)
						{	if (v == 0) txt = "Il est conseillé d'avoir un minimum de 150 provisions dans cette boutique";
							else if (v == 1) txt = "Il est conseillé d'avoir un minimum de 300 provisions dans cette boutique";
							else if (v == 2) txt = "Il est conseillé d'avoir un minimum de 450 provisions dans cette boutique";
							else txt = "Il est conseillé d'avoir un minimum de 600 provisions dans cette boutique";
						}
						else txt = "Vous avez " + MAJfait + "des provisions suffisantes";
						var lastdiv = -1;
						for (i=0;i<bdiv.length;i++)
							if (bdiv[i].innerHTML.indexOf("provisions dans cette boutique") != -1) lastdiv = i;
						if (lastdiv >= 0)
						{	bdiv[lastdiv].innerHTML = bdiv[lastdiv].innerHTML.substring(0,bdiv[lastdiv].innerHTML.length-1) + ".<br><b>" + txt + "</b>.";
							bdiv[lastdiv].setAttribute("style", "text-align:justify");
						}
						if (actupr < miniprov)
						{	btd = bdiv[lastdiv].parentNode;
							btd.setAttribute("style", "text-align:center");
							var btn = document.createElement("input");
							btn.type = "button";
							btn.setAttribute("onmouseout", "UnTip()");
							btn.setAttribute("onmouseover", "Tip('Cliquez ici pour atteindre les " + miniprov + " provisions', BGCOLOR, '#FFFFAA', FONTFACE, 'Courier New', FONTSIZE, '8pt', ABOVE, 'true', TEXTALIGN, 'center')");
							btn.value = "Mettre à niveau les provisions";
							btn.addEventListener("click", boutiquef, true);
							btd.appendChild(btn);
						}
					}
				}
				if (!bad)
				{	if (scan)
					{	if (v<3) { v++; pagesuivante(urlSite + "enclosgestion.php?t=4&v=" + v); }
						else pagesuivante(urlSite + "missions.php");
						return;
					}
					else
					{	switch(v)
						{	case 0 : typepage = "Souvenirs"; break;
							case 1 : typepage = "Restauration rapide"; break;
							case 2 : typepage = "Boissons"; break;
							case 3 : typepage = "Glaces";
						}
						$c("title_site")[0].innerHTML = typepage;
					}
				}
			}
			else
			{	switch(t)
				{	case 2 : typepage = "Hôtel"; break;
					case 3 : typepage = "Aire de repos n° " + (v+1);break;
					case 5 : typepage = "Musée"; break;
					case 6 : typepage = "Gare"; break;
					case 8 : typepage = "Grande roue"; break;
					case 9 : typepage = "Zone de spectacle " + (v == 0 ? "otarie" : "perroquet"); break;
					case 10 : typepage = "Port";
				}
			}
			if (!bad) titrefen(typepage);
		}
		else if ((/items.php/.test(window.location) && GM_getValue("enchereautom", false)) || (/items_botanica.php/.test(window.location) && GM_getValue("enchereautob", false))) // achat automatique d'items
		{	var bimg = $t("img");
			var nom = bimg[bimg.length-1].src;
			nom = nom.substring(nom.indexOf("mages")+6, nom.indexOf(".jpg"));
			nom = nom[0] + nom.substring(nom.indexOf("/")+1);
			var btr = $t("tr");
			for (i=0;i<btr.length;i++) if (btr[i].getAttribute("bgcolor") == "#fcf0db" || btr[i].getAttribute("bgcolor") == "#FCF0DB") break;
			btd = $t("td", btr[i+1]);
			if (btd[0].innerHTML.indexOf("Vous avez d") == -1)
			{	btd = $t("td", btr[i]);
				var encherisseur = $t("strong", btr[i])[0].innerHTML;
				var prix = btd[1].innerHTML;
				prix = prix.substring(0, prix.indexOf(" Zo"));
				if (prix == "") prix = 9999;
				else prix = parseInt(prix);
				if (GM_getValue("encherir_"+nom, "") == "")
				{	var heureServ = $t("strong")[2].innerHTML;
					var delai = heureServ.substring(0,3)+"59:52";
					delai = (heureTonbr(delai) - heureTonbr(heureServ))*1000;
					if (delai > 0 && delai < 120000)
						window.setTimeout(encherir5, delai);
					var btable = btr[i].parentNode;
					var ligne = document.createElement("tr");
					ligne.setAttribute("style", "text-align:center;background-color:#eac893");
					var tabcase = document.createElement("td");
					tabcase.setAttribute("colspan", 2);
					var txt = document.createElement("strong");
					var txtin;
					if (delai > 0 && delai < 120000)
					{	txtin = "Démarrage des enchères automatiques dans ";
						var delaiM = Math.floor(delai / 60000);
						var delaiS = Math.floor((delai - delaiM * 60000) / 1000);
						if (delaiM > 0)
						{	txtin += delaiM + " minute";
							txtin += delaiM > 1 ? "s ":" ";
						}
						txtin += delaiS + " seconde";
						if (delaiS > 1) txtin += "s";
						GM_setValue("h_ench", heureServ.substring(0,2));
					}
					else
					{	txtin = "Il est trop tard pour démarrer les enchères !";
						GM_deleteValue("enchereauto" + nom[0]);
						fincache();
					}
					txt.innerHTML = txtin;
					tabcase.appendChild(txt);
					ligne.appendChild(tabcase);
					btable.appendChild(ligne);
				}
				else encherir5();
			}
			else
			{	fincache();
				GM_deleteValue("encherir_"+nom);
			}
		}
		else if ((/items.php/.test(window.location) && GM_getValue("testitemsm"+window.name, false)) || (/items_botanica.php/.test(window.location) && GM_getValue("testitemsb"+window.name, false))) // recherche des cours actuels des enchères
		{	var numero1, numero2;
			var btr = $t("tr");
			var musee = /items.php/.test(window.location);
			var typeit = musee ? "m" : "b";
			for (i=0;i<btr.length;i++) if (btr[i].getAttribute("bgcolor") == "#fcf0db" || btr[i].getAttribute("bgcolor") == "#FCF0DB") break;
			btd = $t("td", btr[i]);
			var prix = btd[1].innerHTML;
			prix = prix.substring(0, prix.indexOf(" Zo"));
			if (prix == "") prix = 9999;
			else prix = parseInt(prix);
			var itemaacheter = unserialize(GM_getValue("itemaacheter"+typeit, ""));
			for (numero1=1;numero1<21;numero1++)
				if (itemaacheter[numero1] == "ok") break;
			itemaacheter[numero1] = prix;
			GM_setValue("itemaacheter"+typeit, serialize(itemaacheter));
			for (numero2=numero1;numero2<21;numero2++)
				if (itemaacheter[numero2] == "ok") break;
			if (numero2 < 21)
				if (musee) pagesuivante(urlSite + "items.php?num_item=" + numero2);
				else pagesuivante(urlSite + "items_botanica.php?num_item=" + numero2);
			else
			{	var dateitem2 = new Date();
				var heureServ = $t("strong")[2].innerHTML;
				dateitem2 = dateToheure(dateitem2);
				var decalage = heureTonbr(heureServ) - heureTonbr(dateitem2);
				GM_setValue("dateitem2", heureServ);
				GM_setValue("decalageitem", decalage);
				if (musee) pagesuivante(urlSite + "musee.php");
				else pagesuivante(urlSite + "botanica.php");
			}
		}
		else if ((/items.php/.test(window.location) || /items_botanica.php/.test(window.location)) && testcarac()) // items en consultation normale
		{	var btr = $t("tr");
			for (i=0;i<btr.length;i++) if (btr[i].getAttribute("bgcolor") == "#fcf0db" || btr[i].getAttribute("bgcolor") == "#FCF0DB") break;
			var bimg = $t("img");
			var nom = bimg[bimg.length-1].src;
			nom = nom.substring(nom.indexOf("mages")+6, nom.indexOf(".jpg"));
			nom = nom[0] + nom.substring(nom.indexOf("/")+1);
			btd = $t("td", btr[i+1]);
			if (btd[0].innerHTML.indexOf("Vous avez d") == -1)
			{	btd = $t("td", btr[i]);
				var encherisseur = $t("strong", btr[i])[0].innerHTML;
				var prix = btd[1].innerHTML;
				prix = prix.substring(0, prix.indexOf(" Zo"));
				if (prix == "") prix = 9999;
				else prix = parseInt(prix);
				btable = btr[i].parentNode;
				if (GM_getValue("encherir_"+nom, "") == "")
				{	ligne = document.createElement("tr");
					ligne.setAttribute("style", "text-align:center;background-color:#eac893");
					tabcase = document.createElement("td");
					tabcase.setAttribute("colspan", 2);
					btn = document.createElement("input");
					btn.type = "button";
					btn.value = "Enchérir 1 seule fois";
					btn.setAttribute("style", "margin-right:10px");
					btn.addEventListener("click", encherir, true);
					tabcase.appendChild(btn);
					ligne.appendChild(tabcase);
					btable.appendChild(ligne);
					ligne = document.createElement("tr");
					ligne.setAttribute("style", "text-align:center;background-color:#eac893");
					tabcase = document.createElement("td");
					tabcase.setAttribute("colspan", 2);
					btn = document.createElement("input");
					btn.type = "button";
					btn.value = "Enchérir 5 fois";
					btn.setAttribute("style", "margin-right:10px");
					btn.addEventListener("click", encherir5, true);
					tabcase.appendChild(btn);
					txt = document.createElement("strong");
					txt.innerHTML = "Enchère maxi : ";
					txt.style.cursor = "default";
					tabcase.appendChild(txt);
					txt = document.createElement("input");
					txt.type = "text";
					txt.size = "10";
					txt.name = "MaxiEnch"+nom;
					txt.id = "MaxiEnch"+nom;
					txt.setAttribute("onmouseout", "UnTip()");
					txt.setAttribute("onmouseover", "Tip('Entrer l&rsquo;enchère que vous ne voulez pas dépasser<br><br>NB1 : la case est préremplie avec 0 ou<br>avec votre précédente saisie pour cet item<br>NB2 : mettre &rsquo;0&rsquo; si vous ne souhaitez aucune limitation', BGCOLOR, '#FFFFAA', FONTFACE, 'Courier New', FONTSIZE, '8pt', ABOVE, 'true', TEXTALIGN, 'center')");
					var encheremaxi = unserialize(GM_getValue("encheremaxi_"+id_zoo, ""));
					if (!encheremaxi[nom]) encheremaxi[nom] = 0;
					else encheremaxi[nom] = parseInt(encheremaxi[nom]);
					txt.value = encheremaxi[nom];
					tabcase.appendChild(txt);
					btn = document.createElement("input");
					btn.type = "button";
					btn.value = "Sauver";
					btn.addEventListener("click", sauveencheremaxi, true);
					tabcase.appendChild(btn);
					ligne.appendChild(tabcase);
					btable.appendChild(ligne);
				}
				else { encherir5(); return; }
			}
			else
			{	GM_deleteValue("encherir_"+nom);
				if (GM_getValue("cache"+window.name), false) fincache();
			}
			var item = nom[0] == "m" ? "Item" : "Plante";
			titrefen(item + " n° " + nom.substring(1));
		}
		else if ((/musee.php/.test(window.location) || /botanica.php/.test(window.location)) && testcarac())
		{	var musee = /musee.php/.test(window.location);
			var typeit = musee ? "m" : "b";
			var bdiv = $c("content_site");
			var btable = $t("table");
			if (btable[btable.length-1].align == "center")
			{	if (GM_getValue("ini"+typeit+window.name, false))
				{	GM_deleteValue("ini"+typeit+window.name);
					window.setTimeout(testitem, 30000);
				}
				var choix, nom;
				btd = $t("td", btable[btable.length-1]);
				for (i=0;i<btd.length;i++) btd[i].style.width = 150 + "px";
				var newtable = btable[btable.length-1].cloneNode(true);
				var ligne = document.createElement("tr");
				ligne.setAttribute("style", "text-align:center;background-color:#eac893");
				var tabcase = document.createElement("td");
				tabcase.setAttribute("colspan", 4);
				ajoute_br(tabcase);
				var liensmusee = GM_getValue("liensmusee", 1);
				if (!liensmusee) liensmusee = 2; // à cause du changement de fonctionnement de cette variable, booléenne avant
				for (i=1;i<=2;i++)
				{	choix = document.createElement("input");
					choix.type = "radio";
					choix.name = "liensmusee";
					choix.id = "liensmusee"+i;
					choix.value = i;
					if (i == liensmusee) choix.checked = true;
					nom = document.createElement("label");
					nom.setAttribute("for", "liensmusee"+i);
					nom.innerHTML = i == 1 ? "Afficher tous les liens&nbsp;&nbsp;&nbsp;" : "Masquer les liens inutiles";
					tabcase.appendChild(choix);
					tabcase.appendChild(nom);
				}
				ajoute_br(tabcase);
				ligne.appendChild(tabcase);
				btable[btable.length-1].appendChild(ligne);
				var testitems = GM_getValue("testitems"+typeit+window.name, false);
				var itemaacheter;
				if (!testitems)
				{	itemaacheter = new Array();
					GM_deleteValue("signaler"+typeit);
					GM_deleteValue("enchereauto"+typeit);
				}
				var bimg = $t("img");
				var it1 = bimg.length;
				for (i=0;i<bimg.length;i++)
					if (bimg[i].src.indexOf("images/musee") != -1 || bimg[i].src.indexOf("images/botanica") != -1)
					{	it1 = i;
						break;
					}
				if (!musee && !testitems) var itemexist = new Array();
				var item = musee ? "Item" : "Plante";
				var numero, valenchere;
				var enchere = unserialize(GM_getValue("enchere_" + id_zoo, ""));
				for (i=it1;i<bimg.length;i++)
				{	numero = bimg[i].src;
					numero = parseInt(numero.substring(numero.lastIndexOf("/")+1, numero.indexOf(".png")));
					if (numero != 0)
					{	nom = typeit + numero;
						if (!musee && numero == 1)
						{	valstyle = bimg[i].parentNode.getAttribute("style");
							valstyle += "z-index:500";
							bimg[i].parentNode.setAttribute("style", valstyle);
						}
						bimg[i].setAttribute("onmouseout", "UnTip()");
						if (!enchere[nom]) valenchere = "???";
						else valenchere = millier(enchere[nom]);
						bimg[i].setAttribute("onmouseover", "Tip('" + item + " " + numero + ", prix d&rsquo;achat : " + valenchere + " Zoo&rsquo;z', BGCOLOR, '#FFFFAA', FONTFACE, 'Courier New', FONTSIZE, '8pt', ABOVE, 'true', TEXTALIGN, 'center')");
						if (!musee && !testitems) itemexist[numero] = "ok";
					}
					else if (musee && !testitems)
						itemaacheter[i+1-it1] = "ok";
				}
				if (!musee && !testitems)
				{	for (numero=1;numero<21;numero++)
						if (btd[numero-1].innerHTML.indexOf("Enchère fermée") == -1 && !itemexist[numero]) itemaacheter[numero] = "ok";
				}
				if (!testitems)
					GM_setValue("itemaacheter"+typeit, serialize(itemaacheter));
				else itemaacheter = unserialize(GM_getValue("itemaacheter"+typeit, ""));
				if (liensmusee == 2)
				{	var item2 = musee ? "cet item" : "cette plante";
					for (numero=1;numero<21;numero++)
					{	if (!itemaacheter[numero] && btd[numero-1].innerHTML.indexOf("Enchère fermée") == -1)
						{	nom = typeit + numero;
							btd[numero-1].innerHTML = item + " n° " + numero;
							btd[numero-1].setAttribute("onmouseout", "UnTip()");
							if (!enchere[nom]) valenchere = "???";
							else valenchere = millier(enchere[nom]);
							btd[numero-1].setAttribute("onmouseover", "Tip('Vous avez acheté " + item2 + " : " + valenchere + " Zoo&rsquo;z', BGCOLOR, '#FFFFAA', FONTFACE, 'Courier New', FONTSIZE, '8pt', ABOVE, 'true', TEXTALIGN, 'center')");
							btd[numero-1].style.cursor = "default";
						}
					}
				}
				var nbrit = 0, heureS = 0, valmini = -1, itemini = new Array(), nummini = new Array();
				for (numero=1;numero<21;numero++)
					if (itemaacheter[numero]) nbrit++;
				for (numero=1;numero<21;numero++)
					if (itemaacheter[numero]) break;
				if (numero < 21)
				{	btable[btable.length-1].parentNode.appendChild(newtable);
					btd = $t("td", btable[btable.length-1]);
					var encheremaxiGl = GM_getValue("encheremaxiGl_"+id_zoo, "");
					if (encheremaxiGl == "") encheremaxiGl = 0;
					else encheremaxiGl = parseInt(encheremaxiGl);
					GM_setValue("encheremaxiGl_"+id_zoo, encheremaxiGl);
					for (numero=1;numero<21;numero++)
					{	if (testitems && itemaacheter[numero])
						{	valmini = valmini == -1 ? parseInt(itemaacheter[numero]) : parseInt(itemaacheter[numero]) < valmini ? parseInt(itemaacheter[numero]) : valmini;
							if (parseInt(itemaacheter[numero]) < encheremaxiGl || encheremaxiGl == 0)
							{	itemini[numero] = parseInt(itemaacheter[numero]); nummini.push(numero); }
							valenchere = millier(itemaacheter[numero]);
							valenchere = valenchere == "9 999" ? "Aucune enchère" : valenchere + " Zoo&rsquo;z";
							btd[numero-1].innerHTML = valenchere;
							btd[numero-1].setAttribute("onmouseout", "UnTip()");
							btd[numero-1].setAttribute("onmouseover", "Tip('Prix actuel de l&rsquo;item " + numero + "', BGCOLOR, '#FFFFAA', FONTFACE, 'Courier New', FONTSIZE, '8pt', ABOVE, 'true', TEXTALIGN, 'center')");
						}
						else { btd[numero-1].innerHTML = ""; btd[numero-1].style.height = "20px"; }
					}
					var signaler = GM_getValue("signaler"+typeit, 0);
					var lancerencheresauto = parseInt(GM_getValue("lancerencheresauto", 1));
					if (testitems)
					{	heure = new Date();
						heure = heureserveur(dateToheure(heure));
						heureH = parseInt(heure.substring(0,2),10);
						if (signaler == 0)
						{	delai = musee ? heureH+1 : heureH+4;
							delai = delai - 6*parseInt(delai / 6);
							delai = (5 - delai) * 3600000;
							delai += (heureTonbr(cz(heureH)+":58:00") - heureTonbr(heure)) * 1000;
							fincycle = delai + 120000;
							if (delai > 1050000) delai = 900000;
							else if (delai <= 0)
							{	if (lancerencheresauto == 2)
								{	heureS = Math.floor(40 - (heureTonbr(GM_getValue("dateitem2")) - heureTonbr(heureserveur(GM_getValue("dateitem1")))));
									if (heureS < 0) { delai = 0; signaler = 4; }
									else
									{	delai = (heureTonbr(cz(heureH)+":59:"+cz(heureS)) - heureTonbr(heure)) * 1000;
										fincycle = (heureTonbr(cz(heureH+1)+":00:00") - heureTonbr(heure)) * 1000;
										if (delai > 0) GM_setValue("signaler"+typeit, 2);
										else { delai = 0; signaler = 4; }
									}
								}
								else
								{	delai = 0;
									if (encheremaxiGl == 0 || (valmini < encheremaxiGl && valmini > 0))
									{	signaler = 5; alert2("Il y a des enchères inférieures à votre seuil"); }
									else signaler = 3;
								}
							}
							else GM_setValue("signaler"+typeit, 1);
						}
						else if (signaler == 1)
						{	if (lancerencheresauto == 2)
							{	heureS = Math.floor(40 - (heureTonbr(GM_getValue("dateitem2")) - heureTonbr(heureserveur(GM_getValue("dateitem1")))));
								if (heureS < 0) { delai = 0; signaler = 4; }
								else
								{	delai = (heureTonbr(cz(heureH)+":59:"+cz(heureS)) - heureTonbr(heure)) * 1000;
									fincycle = (heureTonbr(cz(heureH+1)+":00:00") - heureTonbr(heure)) * 1000;
									if (delai > 0) GM_setValue("signaler"+typeit, 2);
									else { delai = 0; signaler = 4; }
								}
							}
							else
							{	delai = 0;
								if (encheremaxiGl == 0 || (valmini < encheremaxiGl && valmini > 0))
								{	signaler = 5; alert2("Il y a des enchères inférieures à votre seuil"); }
								else signaler = 3;
							}
						}
						else if (signaler == 2)
						{	delai = 0;
							if (encheremaxiGl == 0 || (valmini < encheremaxiGl && valmini > 0))
								GM_setValue("enchereauto"+typeit, true);
							else signaler = 3;
						}
					}
					ligne = document.createElement("tr");
					ligne.setAttribute("style", "text-align:center;background-color:#eac893");
					tabcase = document.createElement("td");
					tabcase.setAttribute("colspan", 4);
					if (testitems)
					{	bspan = document.createElement("p");
						bspan.setAttribute("style", "font-weight:bold");
						txt = "Début analyse = " + heureserveur(GM_getValue("dateitem1")) + " / fin = " + GM_getValue("dateitem2") + "<br>";
						if (delai > 0)
						{	delaiH = Math.floor(delai / 3600000);
							delaiM = Math.floor((delai - delaiH * 3600000) / 60000);
							delaiS = Math.round((delai - delaiH * 3600000 - delaiM * 60000) / 1000);
							txt += "Prochaine MAJ automatique dans ";
							txt += delaiH > 0 ? delaiH + " heure " : "";
							if (delaiM > 0)
							{	txt += delaiM + " minute";
								txt += delaiM > 1 ? "s " : " ";
							}
							if (delaiS > 0)
							{	txt += delaiS + " seconde";
								txt += delaiS > 1 ? "s" : "";
							}
							fincycleH = Math.floor(fincycle / 3600000);
							fincycleM = Math.floor((fincycle - fincycleH * 3600000) / 60000);
							fincycleS = Math.round((fincycle - fincycleH * 3600000 - fincycleM * 60000) / 1000);
							txt += "<br>Fin du cycle d'enchères dans ";
							txt += fincycleH > 0 ? fincycleH + " heure " : "";
							if (fincycleM > 0)
							{	txt += fincycleM + " minute";
								txt += fincycleM > 1 ? "s " : " ";
							}
							if (fincycleS > 0)
							{	txt += fincycleS + " seconde";
								txt += fincycleS > 1 ? "s" : "";
							}
						}
						else if (signaler == 3)
						{	txt += "Toutes les enchères dépassent votre enchère maxi à scruter<br>Démarrage du prochain cycle dans ";
							if (musee) txt += "7 minutes";
							else txt += "12 minutes";
						}
						else if (signaler == 4)
						{	txt += "Vous n'avez plus assez de temps pour tester les enchères de ce cycle.<br>Démarrage du prochain cycle dans ";
							if (musee) txt += "7 minutes";
							else txt += "12 minutes";
						}
						else txt += "Il y a des enchères inférieures à votre seuil";
						bspan.innerHTML = txt;
						tabcase.appendChild(bspan);
					}
					btn = document.createElement("input");
					btn.type = "button";
					if (!testitems) btn.value = "Récupérer le prix actuel des enchères";
					else btn.value = "Relancer l'analyse des enchères maintenant";
					btn.addEventListener("click", testitem, true);
					btn.setAttribute("onmouseout", "UnTip()");
					btn.setAttribute("onmouseover", "Tip('Cliquez ici pour aller vérifier le prix des enchères<br>de tous les items que vous n&rsquo;avez pas', BGCOLOR, '#FFFFAA', FONTFACE, 'Courier New', FONTSIZE, '8pt', ABOVE, 'true', TEXTALIGN, 'center')");
					tabcase.appendChild(btn);
					ligne.appendChild(tabcase);
					btable[btable.length-1].appendChild(ligne);
					ligne = document.createElement("tr");
					ligne.setAttribute("style", "text-align:center;background-color:#eac893");
					tabcase = document.createElement("td");
					tabcase.setAttribute("colspan", 4);
					txt = document.createElement("strong");
					txt.innerHTML = "Enchère maxi à scruter : ";
					txt.style.cursor = "default";
					txt.setAttribute("onmouseout", "UnTip()");
					contenu = "Saisir l&rsquo;enchère que vous voulez scruter :<br>c&rsquo;est l&rsquo;enchère maxi que vous êtes près à payer pour un item.<br>Mettre 0 si vous ne souhaitez pas limiter vos enchères."
					if (lancerencheresauto == 1) contenu += "<br>Si 2 minutes avant la fin des enchères, une des enchères est inférieure à l&rsquo;enchère maxi à scruter, elle vous sera signalée."
					txt.setAttribute("onmouseover", "Tip('" + contenu + "', BGCOLOR, '#FFFFAA', FONTFACE, 'Courier New', FONTSIZE, '8pt', ABOVE, 'true', TEXTALIGN, 'center')");
					tabcase.appendChild(txt);
					txt = document.createElement("input");
					txt.type = "text";
					txt.size = "10";
					txt.name = "MaxiGlEnch";
					txt.id = "MaxiGlEnch";
					if (encheremaxiGl > 0) txt.value = encheremaxiGl;
					else txt.value = 0;
					tabcase.appendChild(txt);
					btn = document.createElement("input");
					btn.type = "button";
					btn.value = "Sauver";
					btn.addEventListener("click", sauveencheremaxiGl, true);
					tabcase.appendChild(btn);
					ligne.appendChild(tabcase);
					btable[btable.length-1].appendChild(ligne);
					if (lancerencheresauto == 2)
					{	ligne = document.createElement("tr");
						ligne.setAttribute("style", "text-align:center;background-color:#eac893");
						tabcase = document.createElement("td");
						tabcase.setAttribute("colspan", 4);
						for (i=1;i<=2;i++)
						{	choix = document.createElement("input");
							choix.type = "radio";
							choix.name = "lancerencheresauto";
							choix.id = "lancerencheresauto"+i;
							choix.value = i;
							nom = document.createElement("label");
							nom.setAttribute("for", "lancerencheresauto"+i);
							if (i == lancerencheresauto) choix.checked = true;
							nom.innerHTML = i == 1 ? "Afficher une alerte&nbsp;&nbsp;&nbsp;" : "Lancer des enchères automatiquement";
							nom.setAttribute("onmouseout", "UnTip()");
							if (i == 1) nom.setAttribute("onmouseover", "Tip('Si 2 minutes avant la fin des enchères, une des enchères est inférieure à l&rsquo;enchère maxi à scruter, elle vous sera signalée.', BGCOLOR, '#FFFFAA', FONTFACE, 'Courier New', FONTSIZE, '8pt', ABOVE, 'true', TEXTALIGN, 'center')");
							else nom.setAttribute("onmouseover", "Tip('Si 20 secondes avant la fin des enchères, une des enchères est inférieure à l&rsquo;enchère maxi à scruter, une tentative d&rsquo;enchères automatiques sera effectuée.', WIDTH, 400, BGCOLOR, '#FFFFAA', FONTFACE, 'Courier New', FONTSIZE, '8pt', ABOVE, 'true', TEXTALIGN, 'center')");
							tabcase.appendChild(choix);
							tabcase.appendChild(nom);
						}
						ajoute_br(tabcase);
						ligne.appendChild(tabcase);
						btable[btable.length-1].appendChild(ligne);
					}
				}
				GM_deleteValue("testitems"+typeit+window.name);
				if (testitems)
					fincache();
				if (testitems)
				{	if (GM_getValue("enchereauto"+typeit, false))
					{	GM_deleteValue("signaler"+typeit);
						heureH = heureH + 1;
						encheremini = GM_getValue("encheremini", "") + heureH + ":" + valmini + ";";
						GM_setValue("encheremini", encheremini);
						if (musee) txt = urlSite + "items.php?num_item=";
						else txt = urlSite + "items_botanica.php?num_item=";
						var nbfen = 0;
						nummini.sort(function (a, b)
						{	return parseInt(itemini[a]) - parseInt(itemini[b]);
						});
						for (i in nummini)
							if (nbfen < 3) { window.open(txt + nummini[i]); nbfen++; }
						if (musee) window.setTimeout(reinimusee, 420000);
						else window.setTimeout(reinibota, 720000);
					}
					else if (delai > 0)
						window.setTimeout(testitem, delai);
					else
					{	GM_deleteValue("signaler"+typeit);
						heureH = heureH + 1;
						encheremini = GM_getValue("encheremini", "") + heureH + ":" + valmini + ";";
						GM_setValue("encheremini", encheremini);
						if (signaler < 5)
						{	if (musee) window.setTimeout(reinimusee, 420000);
							else window.setTimeout(reinibota, 720000);
						}
					}
				}
				if (musee) titrefen("Le Musée", document.body.clientHeight);
				else titrefen("La Botanica", document.body.clientHeight);
			}
			else
			{	if (musee) titrefen("Le Musée");
				else titrefen("La Botanica");
			}
		}
		else if (/toutou.php/.test(window.location))
		{	var bdiv = $t("div"), actionchien = false;
			for (i=bdiv.length-1;i>=0;i--) if (bdiv[i].align == "left") break;
			maction = bdiv[i].innerHTML;
			maction = maction.substring(maction.indexOf(":")+2);
			if (maction.indexOf("<a ") != -1)
			{	var ba = $t("a", bdiv[i]);
				actionchien = true;
				pagesuivante(ba[0]);
			}
			else if (maction.indexOf("  poin") != -1)
				bdiv[i].innerHTML = bdiv[i].innerHTML.replace(maction, "Action déjà réalisée pour aujourd'hui");
			if (!actionchien && GM_getValue("messages_releves_"+id_zoo, "") == "")
			{	GM_setValue("messages_releves_"+id_zoo, "ok");
				GM_setValue("messagesauvegarde", true);
				GM_setValue("retourmess", true);
				trienclosavoir();
				pagesuivante(urlSite + "event.php");
			}
			else if (testcarac())
				titrefen("Votre chien");
		}
		else if (/news.php/.test(window.location) && testcarac())
		{	GM_deleteValue("affnews");
			titrefen("News");
		}
		else if (/animaux.php/.test(window.location) && !/achat_animaux.php/.test(window.location) && !/vente_animaux.php/.test(window.location) &&
			!/vente_animaux_group.php/.test(window.location) && testcarac())
		{	if (GM_getValue("testperiodique" , "") != "") { fincache(); GM_deleteValue("testperiodique"); }
			titrefen("Vos animaux");
			$c("title_site")[0].innerHTML = "Vos animaux";
			tableau_vieux();
		}
		else if (/bourse.php/.test(window.location))
		{	if (GM_getValue("testperiodique" , "") != "") { fincache(); GM_deleteValue("testperiodique"); }
			btd = $t("td");
			var prixbourse = new Array();
			creeranimal = GM_getValue("creeranimal", "");
			for (i=btd.length-1;i>=0;i--) if (btd[i].width == "239") break;
			var debi = i;
			var prix, enclos, newanimal, nbnew, ifeuille;
			for (j=0;j<2;j++)
			{	for (i=debi;i>=0;i-=6)
				{	if (btd[i].width != "239") break;
					else
					{	espece = $t("b", btd[i+2])[0].innerHTML.toLowerCase();
						prixbourse[espece] = btd[i+4].innerHTML;
						if (espece == "phasme feuille de java") ifeuille = i+1;
						if (espece == creeranimal)
						{	prix = btd[i+3].innerHTML;
							enclos = btd[i+1].innerHTML;
							enclos = enclos.substring(enclos.indexOf("animaux")+8);
							enclos = enclos.substring(0,enclos.indexOf("_"));
							enclos = enclos[0].toUpperCase() + enclos.substring(1);
							if (enclos == "Voliere") enclos = "Volière";
							if (enclos == "Foret") enclos = "Forêt";
							newanimal = unserialize(GM_getValue("newanimal", ""));
							nbnew = newanimal.length;
							newanimal[nbnew] = espece;
							newanimal[nbnew+1] = prix;
							newanimal[nbnew+2] = enclos;
							newanimal[nbnew+3] = j == 0 ? true : false;
							newanimal[nbnew+4] = GM_getValue("groupe");
							newanimal[nbnew+5] = GM_getValue("stocktemp");
							GM_setValue("newanimal",serialize(newanimal));
						}
					}
				}
				debi = i - 1;
			}
			GM_setValue("prixbourse", serialize(prixbourse));
			var heure = new Date();
			var decalagehoraire = GM_getValue("decalagehoraire", 0);
			heure = new Date(Date.parse(heure)+decalagehoraire);
			heure = heure.getDate()+"/"+(heure.getMonth()+1)+"/"+heure.getFullYear()+"/"+heure.getHours();
			GM_setValue("heure", heure);
			if (GM_getValue("messages_releves_"+id_zoo, "") == "")
				pagesuivante(urlSite + "classement.php");
			else if (creeranimal != "")
			{	GM_deleteValue("creeranimal");
				GM_deleteValue("groupe");
				GM_deleteValue("stocktemp");
				retour = GM_getValue("retourbourse");
				GM_deleteValue("retourbourse");
				GM_setValue("venteauto", true); // simulation d'une vente auto, pour finir le cache
				pagesuivante("http://" + retour);
			}
			else if (testcarac())
			{	btd[ifeuille].innerHTML = btd[ifeuille].innerHTML.replace("bonus_phasme", "insectarium_phasme");
				titrefen("La bourse");
				tableau_vieux();
			}
		}
		else if ((/enclosgestion1.php/.test(window.location)) && GM_getValue("achatcouple", "") != "" && GM_getValue("achatcouple", "") != "fin") // achat de couples
		{	var bimg = $t("img"), derimg, ba, iloc;
			for (i=bimg.length-1;i>=0;i--) if (bimg[i].getAttribute("src") == "images/icones/baby.png") { derimg = i; break; }
			var ids1 = 0, ids2, animalbonus;
			for (i=derimg;i>=0;i-=4)
			{	if (bimg[i].getAttribute("src") == "images/icones/baby.png")
				{	ba = $t("a", bimg[i].parentNode);
					ids2 = parseInt(recherche_param(ba[0].href, "ids"));
					if (ids2 > ids1) { ids1 = ids2; animalbonus = i-2; }
				}
				else break;
			}
			var animal = bimg[animalbonus].getAttribute("src");
			animal = animal.substring(animal.indexOf("_")+1, animal.indexOf(".jpg"));
			animal = animal.replace("2", "", "g");
			var achat = GM_getValue("achatcouple");
			achat = achat.substring(achat.indexOf(";")+1);
			var sexe = achat.substring(achat.length-1);
			sexe = GM_getValue("achatmale", false) ? "m" : GM_getValue("achatfemelle", false) ? "f" : sexe == "1" ? "f" : "m";
			achat = achat.substring(0, achat.length-1);
			if (animal != achat) // on a trouvé un animal bonus !
			{	if (GM_getValue("espbon1", "") == "")
				{	GM_setValue("espbon1", animal);
					GM_setValue("trouvebon" + sexe + "1", 1);
				}
				else if (GM_getValue("espbon1", "") == animal)
					GM_setValue("trouvebon" + sexe + "1", parseInt(GM_getValue("trouvebon" + sexe + "1", 0)) + 1);
				else
				{	GM_setValue("espbon2", animal);
					GM_setValue("trouvebon" + sexe + "2", parseInt(GM_getValue("trouvebon" + sexe + "2", 0)) + 1);
				}
				ajoutetrouvaille(animal);
			}
			ba = $t("a");
			for (i=0;i<ba.length;i++) if (ba[i].innerHTML == "cliquez ici.") { iloc = i; break; }
			pagesuivante(ba[iloc]);
		}
		else if ((/enclosgestion1.php/.test(window.location)) && GM_getValue("cherchebonus", "") != "") // recherche d'un animal bonus
		{	var ba;
			if (GM_getValue("pas un animal bonus", "") == "oui") // on revient de la vente de l'animal qui n'a rien donné
			{	GM_deleteValue("pas un animal bonus");
				var iloc;
				ba = $t("a");
				for (i=0;i<ba.length;i++) if (ba[i].innerHTML == "cliquez ici." || ba[i].innerHTML == "cliquez ici") { iloc = i; break; }
				pagesuivante(ba[iloc]);
			}
			else
			{	if (GM_getValue("pas un animal bonus", "") == "non") // on revient de la vente de l'animal qui a trouvé l'animal bonus
				{	var nbr = GM_getValue("cherchebonus");
					nbr = nbr.substring(nbr.indexOf(";")+1);
					nbr = parseInt(nbr.substring(0, nbr.indexOf(";")));
					var s = nbr > 1 ? "s" : "";
					GM_deleteValue("cherchebonus");
				}
				var bimg = $t("img"), derimg;
				for (i=bimg.length-1;i>=0;i--) if (bimg[i].getAttribute("src") == "images/icones/baby.png") { derimg = i; break; }
				var ids1 = 0, ids2, deranimal;
				for (i=derimg;i>=0;i-=4)
				{	if (bimg[i].getAttribute("src") == "images/icones/baby.png")
					{	ba = $t("a", bimg[i].parentNode);
						ids2 = parseInt(recherche_param(ba[0].href, "ids"));
						if (ids2 > ids1) { ids1 = ids2; deranimal = i-2; }
					}
					else break;
				}
				var animal = bimg[deranimal].getAttribute("src");
				animal = animal.substring(animal.indexOf("_")+1, animal.indexOf(".jpg"));
				if (GM_getValue("pas un animal bonus", "") == "non")
				{	GM_deleteValue("pas un animal bonus");
					var sexe = animal.substring(animal.length - 1);
					sexe = sexe == "2" ? "femelle" : "mâle";
					animal = animal.replace("2", "", "g");
					ajoutetrouvaille(animal);
					animal = ANIMAUX[animal].nom;
					alert2("Après " + nbr + " essai" + s + ", vous avez trouvé un animal bonus :\n- " + sexe + "\n- de l'espèce \"" + animal + "\"\n\nFélicitations !");
					GM_setValue("venteauto", true); // simulation d'une vente auto, pour finir le cache
					pagesuivante(window.location);
				}
				else // on vient d'acheter un animal
				{	if (animal[animal.length-1] != "2") animal += "1";
					var cherche = GM_getValue("cherchebonus");
					cherche = cherche.substring(0, cherche.indexOf(";"));
					if (animal == cherche) // on n'a rien trouvé, on supprime
					{	GM_setValue("pas un animal bonus", "oui");
						ba = $t("a", bimg[deranimal+2].parentNode);
						pagesuivante(ba[0]);
					}
					else // c'est un animal bonus ! on supprime l'animal qu'on a acheté et on arrête
					{	GM_setValue("pas un animal bonus", "non");
						var ids3 = 0, baachat; // on recherche l'animal acheté
						for (i=derimg;i>=0;i-=4)
							if (bimg[i].getAttribute("src") == "images/icones/baby.png")
							{	ba = $t("a", bimg[i].parentNode);
								ids2 = parseInt(recherche_param(ba[0].href, "ids"));
								if (ids2 > ids3 && ids2 < ids1) { ids3 = ids2; baachat = ba; }
							}
							else break;
						pagesuivante(baachat[0]);
					}
				}
			}
		}
		else if ((/enclosgestion1.php/.test(window.location)) && GM_getValue("venteauto", false) && GM_getValue("listevente", "") != "") // retour d'une vente auto
		{	var listevente = unserialize(GM_getValue("listevente", ""));
			nextvente = listevente.shift();
			GM_setValue("listevente", serialize(listevente));
			pagesuivante(nextvente);
		}
		else if (/enclosgestion1.php/.test(window.location) && GM_getValue("MAJPA", false)) // on revient de l'embauche d'employés pour la MAJ des PA
		{	var btable = $t("table"), last_tablelien;
			for (i=btable.length-1;i>=0;i--)
				if (btable[i].getAttribute("bgcolor") == "#faefdb" || btable[i].getAttribute("bgcolor") == "#FAEFDB") { last_tablelien = btable[i]; break ; }
			var lienmaj = $t("a", last_tablelien); // lien pour mettre à jour tous les PA d'un coup
			lienmaj = lienmaj[0].getAttribute("href");
			GM_deleteValue("MAJPA");
			GM_setValue("venteauto", true); // simulation, pour exécuter le fincache
			pagesuivante(urlSite + lienmaj);
		}
		else if (/enclosgestion1.php/.test(window.location) && !scan && !GM_getValue("MAJPA2", false) && testcarac()) // enclos
		{	var btd2, last_tablebureau, t, v, numenclos, construit = true, enclosbulle = "", ba;
			var nom, age, tableau, s, btable, txt, old_txt, bdiv, debi;
			var temourant = false, vieux = parseInt(GM_getValue("vieux", 10));
			bstrong = $t("strong");
			var enclos = new Array(), liste = new Array(), numero;

			// correction du nom de l'enclos 
			t = parseInt(recherche_param(window.location.search, "t"));
			v = parseInt(recherche_param(window.location.search, "v"));
			nomencl = nom_enclos(t, v);
			if (nomencl != GM_getValue("nom_enclos", "")) GM_deleteValue("clique");
			nomencl = " Enclos " + nomencl;
			numenclos = t * 100 + v;
			GM_setValue("numenclos", numenclos);
			btable = $t("table");
			if (btable[2].innerHTML.indexOf("constu") != -1) // si l'enclos a été construit
			{	txt = "construit :</strong>" + nomencl;
				old_txt = btable[2].innerHTML.substring(btable[2].innerHTML.indexOf("constu"));
			}
			else
			{	txt = "construire :</strong>" + nomencl;
				old_txt = btable[2].innerHTML.substring(btable[2].innerHTML.indexOf("constr"));
				construit = false;
				enclosbulle = "Enclos non construit";
			}
			old_txt = old_txt.substring(0, old_txt.indexOf("<br>"));
			btable[2].innerHTML = btable[2].innerHTML.replace(old_txt, txt);
			btable[3].setAttribute("cellspacing","2");

			if (construit) // si l'enclos est construit
			{	var temoin, j, sexe;
				if (GM_getValue("testerbonus", false)) // on vient d'acheter un animal, on teste si on a trouvé un animal bonus
				{	var bimg = $t("img"), derimg;
					for (i=bimg.length-1;i>=0;i--) if (bimg[i].getAttribute("src") == "images/icones/baby.png") { derimg = i; break; }
					var ids = 0, ids2, animalbonus;
					for (i=derimg;i>=0;i-=4)
					{	if (bimg[i].getAttribute("src") == "images/icones/baby.png")
						{	ba = $t("a", bimg[i].parentNode);
							ids2 = parseInt(recherche_param(ba[0].href, "ids"));
							if (ids2 > ids) { ids = ids2; animalbonus = i-2; }
						}
						else break;
					}
					espece = bimg[animalbonus].getAttribute("src");
					espece = espece.substring(espece.indexOf("_")+1,espece.indexOf(".jpg"));
					sexe = espece.indexOf("2") != -1 ? "f" : "m";
					espece = espece.replace("2", "", "g");
					if (ANIMAUX[espece].nom != "") // on a trouvé un animal bonus !
					{	if (GM_getValue("achatcouple", "") == "fin")
						{	if (GM_getValue("espbon1", "") == "")
							{	GM_setValue("espbon1", espece);
								GM_setValue("trouvebon" + sexe + "1", 1);
							}
							else if (GM_getValue("espbon1", "") == espece)
								GM_setValue("trouvebon" + sexe + "1", parseInt(GM_getValue("trouvebon" + sexe + "1", 0)) + 1);
							else
							{	GM_setValue("espbon2", espece);
								GM_setValue("trouvebon" + sexe + "2", parseInt(GM_getValue("trouvebon" + sexe + "2", 0)) + 1);
							}
						}
						else alert2("Bravo : vous venez de trouver un animal bonus :\n- " + (sexe == "m" ? "mâle" : "femelle") + "\n- de l'espèce \"" + espece + "\"\n\nCliquez sur 'OK' pour continuer.");
						ajoutetrouvaille(espece);
					}
					GM_deleteValue("testerbonus");
				}
				if (GM_getValue("achatcouple", "") == "fin")
				{	if (GM_getValue("nbrcouples", 0) > 1 || !(GM_getValue("achatmale", false) || GM_getValue("achatfemelle", false))) alertesonore();
					GM_deleteValue("achatcouple");
					GM_deleteValue("nbrcouples");
					GM_deleteValue("achatmale");
					GM_deleteValue("achatfemelle");
					fincache();
					if (GM_getValue("trouvebonm1", 0) + GM_getValue("trouvebonf1", 0) + GM_getValue("trouvebonm2", 0) + GM_getValue("trouvebonf2", 0) != 0)
					{	var btrb = document.createElement("div");
						btrb.id = "trouvebonus";
						btrb.className = "info_bulle";
						var nbbon = GM_getValue("trouvebonm1", 0) + GM_getValue("trouvebonf1", 0) + GM_getValue("trouvebonm2", 0) + GM_getValue("trouvebonf2", 0);
						nbbon = nbbon == 1 ? "1 animal" : nbbon + " animaux";
						var typebon = new Array;
						typebon[0] = GM_getValue("trouvebonm1", 0) != 0 ? "- " + GM_getValue("trouvebonm1", 0) + " mâle" + (GM_getValue("trouvebonm1", 0) > 1 ? "s" : "") : "";
						typebon[0] += typebon[0] != "" ? " de l'espèce " + GM_getValue("espbon1", "") + "<br>" : "";
						typebon[1] = GM_getValue("trouvebonf1", 0) != 0 ? "- " + GM_getValue("trouvebonf1", 0) + " femelle" + (GM_getValue("trouvebonf1", 0) > 1 ? "s" : "") : "";
						typebon[1] += typebon[1] != "" ? " de l'espèce " + GM_getValue("espbon1", "") + "<br>" : "";
						typebon[2] = GM_getValue("trouvebonm2", 0) != 0 ? "- " + GM_getValue("trouvebonm2", 0) + " mâle" + (GM_getValue("trouvebonm2", 0) > 1 ? "s" : "") : "";
						typebon[2] += typebon[2] != "" ? " de l'espèce " + GM_getValue("espbon2", "") + "<br>" : "";
						typebon[3] = GM_getValue("trouvebonf2", 0) != 0 ? "- " + GM_getValue("trouvebonf2", 0) + " femelle" + (GM_getValue("trouvebonf2", 0) > 1 ? "s" : "") : "";
						typebon[3] += typebon[3] != "" ? " de l'espèce " + GM_getValue("espbon2", "") + "<br>" : "";
						btrb.innerHTML = "<div style=\"text-align:center;margin-top:4px;font-size:18px;font-weight:bold;color:#29b86c\">Animaux bonus</div>" +
							"<br><div style=\"text-align:center;margin-top:8px;margin-bottom:4px;font-size:13px\">Bravo ! Lors de vos achats multiples, vous avez trouvé <b>" +
							nbbon + " bonus</b> :<br>" + typebon[0] + typebon[1] + typebon[2] + typebon[3] + "<br><a style=\"cursor:pointer\" id=\"fenbonus\">Fermer</a></div>";
						document.body.appendChild(btrb);
						GM_deleteValue("trouvebonm1");
						GM_deleteValue("trouvebonf1");
						GM_deleteValue("trouvebonm2");
						GM_deleteValue("trouvebonf2");
						GM_deleteValue("espbon1");
						GM_deleteValue("espbon2");
					}
				}
				else if (GM_getValue("venteauto", false))
				{	GM_deleteValue("venteauto");
					fincache();
				}
				ba = $t("a");
				for (i=0;i<ba.length;i++)
					if (ba[i].innerHTML.indexOf("cliquez ici") != -1)
					{	divbis = ba[i].parentNode.innerHTML;
						nbachats = parseInt(GM_getValue("compteur_achats_" + id_zoo, 0));
						s = nbachats>1?"ux":"l";
						maxachats = parseInt(GM_getValue("maxachats_" + id_zoo, 30));
						if (nbachats < maxachats) txt = "NB : vous avez pour l'instant acheté " + nbachats + " anima" + s + " sur les " + maxachats + " possibles.";
						else txt = "NB : vous avez déjà acheté " + nbachats + " anima" + s + " sur les " + maxachats + " possibles.";
						if (divbis.indexOf("en acheter") != -1)
						{	txt = "acheter.<br><br>" + txt;
							ba[i].parentNode.innerHTML = ba[i].parentNode.innerHTML.replace("acheter.", txt);
						}
						else
						{	txt = "</a><br><br>" + txt;
							ba[i].parentNode.innerHTML = ba[i].parentNode.innerHTML.replace("</a>", txt);
						}
					}
					else if (ba[i].innerHTML.indexOf("niveau tous") != -1)
					{	divbis = ba[i].parentNode;
						divbis.innerHTML = divbis.innerHTML.replace("Pour pouvoir faire ça, vous devez posséder assez de personnels dans les 5 tranches de métier ", "Les employés nécessaires seront automati-quement recrutés.");
						var ba = document.createElement("a");
						ba.innerHTML = "Licencier tous les employés en trop";
						ba.id = "SupEmpl";
						ba.style.cursor = "pointer";
						ba.addEventListener("click", SupEmplFct, true);
						ajoute_br(divbis);
						divbis.appendChild(ba);
						var btxt = document.createElement("label");
						btxt.innerHTML = ". Attention, en cliquant sur ce lien, les PA ne sont pas contrôlés. Les employés en trop sont les employés ayant des PA dispo >= 10.";
						divbis.appendChild(btxt);
					}
				bdiv = $t("div");
				for (i=bdiv.length-1;i>=0;i--)
					if (bdiv[i].innerHTML.indexOf("séléctionnez") != -1)
					{	bdiv[i].innerHTML = bdiv[i].innerHTML.replace("séléct", "sélect");
						break;
					}
				for (i=bstrong.length-1;i>=0;i--)
					if (bstrong[i].innerHTML == "requis")
						bstrong[i].innerHTML = "&nbsp;requis";

				var oldsynthvieux = unserialize(GM_getValue("synthvieux_" + id_zoo, ""));
				var synthvieux = new Array();
				for (i in oldsynthvieux) if (parseInt(i) != numenclos) synthvieux[i] = oldsynthvieux[i];
				var oldsynthanimaux = unserialize(GM_getValue("synthanimaux_" + id_zoo, ""));
				var synthanimaux = new Array();
				for (i in oldsynthanimaux) if (parseInt(i) != numenclos) synthanimaux[i] = oldsynthanimaux[i];

				for (i=0;i<btable.length;i++) { if (btable[i].innerHTML.indexOf("bureau.php") != -1) last_tablebureau = i; }
				last_tablebureau = btable[last_tablebureau];
				btd2 = $t("td", last_tablebureau);
				if (btd2[11].innerHTML == "0" ) // si enclos vide
				{	btd2[35].innerHTML = 0;
					btd2[32].id = 'grand2';
					btd2[0].innerHTML = btd2[0].innerHTML.replace("Employé simple", "Balayeur");
					enclosbulle = "Vide";
				}
				else
				{	var albinostvieux = new Array();
					var prixbourse = unserialize(GM_getValue("prixbourse", ""));
					var p_affichage = parseInt(GM_getValue("p_affichage", 1)); // préférences pour entourer les animaux
					var mvscours = testheurebourse() ? "<br><br>Attention, les cours ne semblent pas à jour.<br>Allez sur la page &rsquo;bourse&rsquo; pour corriger cela." : "";
					btable3 = $t("table")[3].innerHTML;
					debut = "";
					for (i=0;i<2;i++)
					{	debut += btable3.substring(0,btable3.indexOf("</div>")+6);
						btable3 = btable3.substring(btable3.indexOf("</div>")+6);
					}
					debut = debut.substring(debut.indexOf("<div"));
					tabcase = document.createElement("td");
					tabcase.innerHTML = debut;
					tabcase.setAttribute("colspan","6");
					tabcase.setAttribute("style","width:600px");
					ligne = document.createElement("tr");
					ligne.appendChild(tabcase);
					newdiv = document.createElement("div");
					newdiv.setAttribute("style","text-align:center");
					newdiv.appendChild(ligne);
					newdiv2 = document.createElement("div");
					newdiv2.setAttribute("style","text-align:center");
					lignebis = ligne.cloneNode(true);
					newdiv2.appendChild(lignebis);

					// entourage, comptage et bulle d'info des mourants
					var nb = 0;
					btd = $t("td");
					for (debi=0;debi<btd.length;debi++)
					{	bdiv = $t("div", btd[debi]);
						if (bdiv[0])
						{	if (bdiv[0].innerHTML == "<strong>Les mourants</strong>")
							{	temourant = true; 
								tabcase = btd[debi].parentNode.parentNode.parentNode.parentNode.parentNode.cloneNode(true);
								newdiv.appendChild(tabcase);
								ajoute_br(newdiv);
								break;
							}
						}
					}
					if (temourant)
					{	debi++;
						for (i=debi;i<btd.length;i+=2)
						{	if (btd[i].align == "center")
							{	btd[i].setAttribute("style", "height:135px;padding-top:5px;margin:1px");
								bimg = $t("img", btd[i+1]);
								for (j=0;j<3;j++) bimg[j].vspace = 0;
								bdiv = $t("div", btd[i+1]);
								bdiv[0].setAttribute("style", "margin-top:3px");
								nb++;
								nom = btd[i].innerHTML.substring(25);
								nom = nom.substring(nom.indexOf("_") + 1, nom.indexOf(".jpg"));
								nom = nom.replace("%20", " ", "g");
								nom = nom.replace("2", "", "g");
								if (btd[i+1].innerHTML.indexOf("female.png") != -1) { sexe = "femelle"; nsexe = 1; }
								else { sexe = "mâle"; nsexe = 0; }
								if (!enclos[nom])
								{	enclos[nom] = new Array()
									for (j=0;j<6;j++) enclos[nom][j] = 0; //01=total;23=vieux;45=futurs adultes
								}
								enclos[nom][nsexe] += 1;
								bdiv = $t("div", btd[i]);
								if (p_affichage == 1) tableau = btd[i];
								else tableau = bdiv[0];
								tableau.className = " mourant";
								enclos[nom][nsexe+2] += 1;
								if (!synthvieux[numenclos])
								{	synthvieux[numenclos] = new Array();
									synthvieux[numenclos][0] = nom;
									for (j=1;j<5;j++) synthvieux[numenclos][j] = 0; //0918=especes;12=tous;34=vieux;56=age+vieux;78=age-vieux
									for (j=5;j<9;j++) synthvieux[numenclos][j] = "";
									synthvieux[numenclos][nsexe+3] = 1;
									synthvieux[numenclos][nsexe+5] = "/0";
								}
								else
								{	temoin = false;
									for (j=0; j<synthvieux[numenclos].length; j+=9)
										if (synthvieux[numenclos][j] == nom)
										{	temoin = true;
											synthvieux[numenclos][j+nsexe+3] = parseInt(synthvieux[numenclos][j+nsexe+3]) + 1;
											synthvieux[numenclos][j+nsexe+5] += "/0";
											break;
										}
									if (!temoin)
									{	synthvieux[numenclos][j] = nom;
										for (k=1;k<5;k++) synthvieux[numenclos][j+k] = 0;
										for (k=5;k<9;k++) synthvieux[numenclos][j+k] = "";
										synthvieux[numenclos][j+nsexe+3] = 1;
										synthvieux[numenclos][j+nsexe+5] = "/0";
									}
								}
								if (nom.indexOf("albinos") != -1)
								{	if (!albinostvieux[nom])
									{	albinostvieux[nom] = new Array()
										for (j=0;j<2;j++) albinostvieux[nom][j] = 0; //01=tresvieuxmalefemelle
									}
									albinostvieux[nom][nsexe] += 1;
								}
								tabcase = btd[i].cloneNode(true);
								tabcase.className = "animal " + nom.replace(" ", "%20", "g") + " " + sexe + btd[i].className;
								bourse = parseInt(prixbourse[nom]);
								pourcent = Math.round((bourse/ANIMAUX[nom].prix - 1) * 10000) / 100;
								if (nom == "coq patriote")
								{	if (sexe == "femelle") { nom = "poule"; sexe = "patriote"; }
									else { nom = "coq"; sexe = "patriote"; }
								}
								numero = btd[i+1].innerHTML.substring(btd[i+1].innerHTML.indexOf("ids")+4);
								numero = numero.substring(0, numero.indexOf("\""));
								liste[numero] = nom + " " + sexe + ", reste à vivre : 0 jour<br>prix bourse : ";
								if (pourcent >= 0) plus = "+";
								else { plus = "-"; pourcent = 0 - pourcent ; }
								liste[numero] += millier(bourse) + " Zoo'z<br>" + "bourse/base : " + plus + " " + pourcent + " %";
								prix = Math.round(bourse*0.006);
								liste[numero] += "<br>prix de vente : " + millier(prix) + " Zoo'z";
								tabcase.setAttribute("onmouseout", "UnTip()");
								tabcase.setAttribute("onmouseover", "Tip('" + liste[numero].replace("'", "&rsquo;", "g") + mvscours + "', BGCOLOR, '#FFFFAA', FONTFACE, 'Courier New', FONTSIZE, '8pt', ABOVE, 'true', TEXTALIGN, 'center')");
								bimg = $t("img", tabcase);
								bimg[0].addEventListener("click", selvente, true);
								newdiv.appendChild(tabcase);
							}
							else if (btd[i].innerHTML == "&nbsp;") i--;
							else break;
						}
					}
					// comptage des mâles et femelles, bulle d'info et affichage du tableau
					for (debi=0;debi<btd.length;debi++)
					{	bdiv = $t("div", btd[debi]);
						if (bdiv[0])
							{	if (bdiv[0].innerHTML == "<strong>Vos animaux</strong>")
								{	tabcase = btd[debi].parentNode.parentNode.parentNode.parentNode.parentNode.cloneNode(true);
									newdiv.appendChild(tabcase);
									tabcase2 = tabcase.cloneNode(true);
									newdiv2.appendChild(tabcase2);
									break;
								}
							}
					}
					debi++;
					for (i=debi;i<btd.length;i+=2)
					{	btd[i].setAttribute("style", "padding-top:5px;margin:1px");
						bdiv = $t("div", btd[i]);
						if (bdiv[0])
						{	age = parseInt(parseFloat(bdiv[1].style.width.substring(0,bdiv[1].style.width.length - 2))/.71);
							if (age < vieux+2 || age == 99)
							{	if (p_affichage == 1) tableau = btd[i];
								else tableau = bdiv[0];
								if (age < vieux+2) { tableau.className = " vieux"; btd[i].setAttribute("style", "height:135px;margin:1px;padding-top:5px"); }
								else { tableau.className = " naissance"; btd[i].setAttribute("style", "height:137px;margin:1px;padding-top:5px"); }
							}
						}
						else break;
					}
					var naisstri = new Array(), nomtri = new Array(), ordretri = new Array(), cptr = 0;
					for (i=debi;i<btd.length;i+=2)
					{	if (btd[i].align == "center")
						{	tabcase = btd[i].cloneNode(true);
							nb++;
							nom = btd[i].innerHTML.substring(25);
							nom = nom.substring(nom.indexOf("_") + 1, nom.indexOf(".jpg"));
							nom = nom.replace("%20", " ", "g");
							nom = nom.replace("2", "", "g"); // animaux à une image par sexe
							if (btd[i+1].innerHTML.indexOf("female.png") != -1) { sexe = "femelle"; nsexe = 1; }
							else { sexe = "mâle"; nsexe = 0; }
							if (!enclos[nom])
							{	enclos[nom] = new Array()
								for (j=0;j<6;j++) enclos[nom][j] = 0; //01=total;23=vieux;45=futurs adultes
							}
							enclos[nom][nsexe] += 1;
							bdiv = $t("div", btd[i]);
							age = parseInt(parseFloat(bdiv[1].style.width.substring(0,bdiv[1].style.width.length - 2))/.71);
							if (age < vieux+2)
								enclos[nom][nsexe+2] += 1;
							if (nom.indexOf("albinos") != -1)
							{	if (!albinostvieux[nom])
								{	albinostvieux[nom] = new Array()
									for (j=0;j<2;j++) albinostvieux[nom][j] = 0; //01=tresvieuxmalefemelle
								}
								if (age < 7) albinostvieux[nom][nsexe] += 1;
							}
							if (age < 94)
							{	if (!synthvieux[numenclos])
								{	synthvieux[numenclos] = new Array();
									synthvieux[numenclos][0] = nom;
									for (j=1;j<5;j++) synthvieux[numenclos][j] = 0; //0918=especes;12=tous;34=vieux;56=age+vieux;78=age-vieux
									for (j=5;j<9;j++) synthvieux[numenclos][j] = "";
									if (age < vieux+2)
									{	synthvieux[numenclos][nsexe+3] = 1;
										synthvieux[numenclos][nsexe+5] = "/" + (age-1);
									}
									else synthvieux[numenclos][nsexe+7] = "/" + (age-1);
								}
								else
								{	temoin = false;
									for (j=0;j<synthvieux[numenclos].length;j+=9)
										if (synthvieux[numenclos][j] == nom)
										{	temoin = true;
											if (age < vieux+2)
											{	synthvieux[numenclos][j+nsexe+3] = parseInt(synthvieux[numenclos][j+nsexe+3]) + 1;
												synthvieux[numenclos][j+nsexe+5] += "/" + (age-1);
											}
											else synthvieux[numenclos][j+nsexe+7] += "/" + (age-1);
											break;
										}
									if (!temoin)
									{	synthvieux[numenclos][j] = nom;
										for (k=1;k<5;k++) synthvieux[numenclos][j+k] = 0;
										for (k=5;k<9;k++) synthvieux[numenclos][j+k] = "";
										if (age < vieux+2)
										{	synthvieux[numenclos][j+nsexe+3] = 1;
											synthvieux[numenclos][j+nsexe+5] = "/" + (age-1);
										}
										else synthvieux[numenclos][j+nsexe+7] = "/" + (age-1);
									}
								}
							}
							if (age < 95)
								enclos[nom][4+nsexe] += 1;
							age -= 1;
							s = age > 1 ? "s" : "";
							tabcase.className = "animal " + nom.replace(" ", "%20", "g") + " " + sexe + btd[i].className;
							bourse = parseInt(prixbourse[nom]);
							pourcent = Math.round((bourse/ANIMAUX[nom].prix - 1) * 10000) / 100;
							if (nom == "coq patriote") {
								if (sexe == "femelle") { nom = "poule"; sexe = "patriote"; }
								else { nom = "coq"; sexe = "patriote"; }
							}
							numero = btd[i+1].innerHTML.substring(btd[i+1].innerHTML.indexOf("ids")+4);
							numero = numero.substring(0, numero.indexOf("\""));
							liste[numero] = nom + " " + sexe + ", reste à vivre : " + age + " jour" + s + "<br>prix bourse : ";
							if (pourcent >= 0) plus = "+";
							else { plus = "-"; pourcent = 0 - pourcent ; }
							liste[numero] += millier(bourse) + " Zoo'z<br>" + "bourse/base : " + plus + " " + pourcent + " %";
							prix = Math.round(bourse*(age+1)*0.006);
							liste[numero] += "<br>prix de vente : " + millier(prix) + " Zoo'z";
							tabcase.setAttribute("onmouseout", "UnTip()");
							tabcase.setAttribute("onmouseover", "Tip('" + liste[numero].replace("'", "&rsquo;", "g") + mvscours + "', BGCOLOR, '#FFFFAA', FONTFACE, 'Courier New', FONTSIZE, '8pt', ABOVE, 'true', TEXTALIGN, 'center')");
							bimg = $t("img", tabcase);
							bimg[0].addEventListener("click", selvente, true);
							if (age < 98) newdiv.appendChild(tabcase);
							else { naisstri.push(tabcase); nomtri.push(nom == "poule" ? "coq" : nom); ordretri.push(cptr); cptr++; }
						}
						else
						{	btd[i+9].innerHTML = btd[i+9].innerHTML.replace("Employé simple", "Balayeur");
							break;
						}
					}
					ordretri.sort(function (a, b)
						{	if (nomtri[a] < nomtri[b]) return -1;
							else if (nomtri[a] > nomtri[b]) return 1;
							else return 0;
						});
					for (i=0;i<naisstri.length;i++)
						newdiv.appendChild(naisstri[ordretri[i]]);
					if (synthvieux[numenclos])
					{	for (i=0;i<synthvieux[numenclos].length;i+=9) // on récupère le nombre d'animaux de chaque espèce
						{	synthvieux[numenclos][i+1] = enclos[synthvieux[numenclos][i]][0];
							synthvieux[numenclos][i+2] = enclos[synthvieux[numenclos][i]][1];
						}
					}
					var espece_source, numalb, marge, albpres = false;
					var especes_triees = new Array();
					for (espece in enclos)
					{	especes_triees.push(espece);
						if (espece.indexOf("albinos") != -1 && enclos[espece.replace(" albinos", "")]) albpres = true;
					}
					var albinos = unserialize(GM_getValue("albinos_" + id_zoo, ""));
					if (albpres)
					{	var transfertmale = new Array(), transfertfemelle = new Array();
						calcalb();
					}
					especes_triees.sort();
					for (i=0;i<especes_triees.length;i++)
						enclosbulle += especes_triees[i] +" / ";
					anim = nb>1?" animaux":" animal";
					s = especes_triees.length>1?"s":"";
					var papa = $t("table")[3].parentNode;
					papa.replaceChild(newdiv,$t("table")[3]);
					var triespecesfait = false;
					if (GM_getValue("triesp", false)) // si on trie par espèce
					{	trier_espece();
						triespecesfait = true;
					}
					enclosbulle = enclosbulle.substring(0, enclosbulle.length - 3);
					enclosbulle = nb + anim + ".<br>" + especes_triees.length + " espèce" + s + " : " + enclosbulle;
					synthanimaux[numenclos] = new Array();
					i=-3;
					for (espece in enclos)
					{	i+=3;
						synthanimaux[numenclos][i] = espece;
						synthanimaux[numenclos][i+1] = enclos[espece][0];
						synthanimaux[numenclos][i+2] = enclos[espece][1];
					}
				}
				GM_setValue("liste", serialize(liste));
				GM_setValue("synthvieux_" + id_zoo, serialize(synthvieux));
				GM_setValue("synthanimaux_"+id_zoo, serialize(synthanimaux));
			}

			GM_setValue("enclos", serialize(enclos));
			touslesenclos = unserialize(GM_getValue("touslesenclos_" + id_zoo, ""));
			touslesenclos[numenclos] = enclosbulle;
			GM_setValue("touslesenclos_" + id_zoo, serialize(touslesenclos));
			if (GM_getValue("bebes", "") != "") // on a demandé l'ouverture de la page sur les plus jeunes
				titrefen(nomencl, Math.max(positionY(bstrong[bstrong.length - 17]), 790) - window.innerHeight - 40 + ($("largeligne") && window.scrollMaxX > 0 ? 17 : 0));
			else if (GM_getValue("retour", "") != "") // on revient d'une vente
			{	titrefen(nomencl, parseInt(GM_getValue("retour")));
				GM_deleteValue("retour");
			}
			else titrefen(nomencl);
			tableau_animauxf(enclos);
		}
		else if (/enclosgestion1.php/.test(window.location) && (scan || GM_getValue("MAJPA2", false)) && testcarac()) // on scanne tous les enclos pour le rapport ou pour les naissances théoriques
		{	var param_enclos = recherche_param(window.location.search, "t") + "_" + recherche_param(window.location.search, "v");
			touslesenclos = unserialize(GM_getValue("touslesenclos_" + id_zoo, ""));
			var ordre = unserialize(GM_getValue("ordre", ""));
			var j, k, tot, vide = false, connexion1, nb;
			var couples, sexes, nb_th, valeur_th, felins, derenclos;
			var btable = $t("table"), last_tablebureau, last_tablelien, tab_param_enclos = param_enclos.split("_");
			var numenclos = parseInt(tab_param_enclos[0]) * 100 + parseInt(tab_param_enclos[1]);
			var ptstemp = parseInt(GM_getValue("ptstemp", 0));
			connexion1 = GM_getValue("messages_releves_"+id_zoo, "") == ""; // si true, on scanne pour la 1ère connexion de la journée, sinon pour le rapport
			j = 61;
			if (!connexion1) while (touslesenclos[ordre[j]] == "Enclos non construit" && j >= 0) j--;
			else while ((touslesenclos[ordre[j]] == "Enclos non construit" || (touslesenclos[ordre[j]] == "Vide" && ordre[j] != numenclos)) && j >= 0) j--;
			if (j >= 0)
			{	var numordre = parseInt(ordre[j]);
				derenclos = Math.floor(numordre/100);
				numordre -= derenclos*100;
				derenclos += "_" + numordre;
			}
			else derenclos = "Aucun"; // cas d'un seul enclos avec uniquement des mourants que l'on a vendus
			for (i=btable.length-1;i>=0;i--)
				if (btable[i].getAttribute("cellpadding") == 4) { last_tablebureau = btable[i]; break; }
			for (i=btable.length-1;i>=0;i--)
				if (btable[i].getAttribute("bgcolor") == "#faefdb" || btable[i].getAttribute("bgcolor") == "#FAEFDB") { last_tablelien = btable[i]; break ; }
			if (last_tablebureau && last_tablelien) // si l'enclos a été construit
			{	if (scan)
				{	btd = $t("td");
					if (btd[0].innerHTML.indexOf("Construire") != -1)
					{	var nonluxe = unserialize(GM_getValue("nonluxe", ""));
						nonluxe[numenclos] = "bad";
						GM_setValue("nonluxe", serialize(nonluxe));
					}
				}
				var supp_mourants = parseInt(GM_getValue("supp_mourants", 2)) == 2; // si true, on vend les mourants
				var testder = false;
				if (connexion1 && !GM_getValue("bad", false) && !GM_getValue("ventemourants", false) && !GM_getValue("ventetrop", false)) // si c'est la 1ère connexion de la MAJ
				{	var mourants = unserialize(GM_getValue("mourants_" + id_zoo, "")), vieux = parseInt(GM_getValue("vieux", 10));
					var couples15 = unserialize(GM_getValue("couples15_" + id_zoo, ""));
					var synthvieux = unserialize(GM_getValue("synthvieux_" + id_zoo, ""));
					var albinos = unserialize(GM_getValue("albinos_" + id_zoo, ""));
					var albinostvieux = new Array();
					var agemoyen = parseInt(GM_getValue("agemoyen_" + id_zoo, 0));
					var enclosbulle = "", albi0, albi1;
					btd = $t("td", last_tablebureau);
					if (parseInt(btd[11].innerHTML) > 0) // enclos non vide
					{	btd = $t("td"); // on compte les couples pour en déduire les naissances théoriques
						var enclos = new Array(), enclosbis = new Array(), especes_triees = new Array();
						var prixbourse = unserialize(GM_getValue("prixbourse", ""));
						var sexe;
						nb = 0;
						var valeurT = parseInt(GM_getValue("valeurT_" + id_zoo, 0));

						var temourant = false, debi, bdiv;
						for (debi=0;debi<btd.length;debi++)
						{	bdiv = $t("div", btd[debi]);
							if (bdiv[0])
							{ if (bdiv[0].innerHTML == "<strong>Les mourants</strong>") { temourant = true; break; } }
						}
						if (temourant)
						{	debi++;
							var binput, liste = new Array(), numero;
							for (i=debi;i<btd.length;i+=2)
							{	if (btd[i].align == "center")
								{	nb++;
									espece = btd[i].innerHTML.substring(25);
									espece = espece.substring(espece.indexOf("_") + 1, espece.indexOf(".jpg"));
									espece = espece.replace("%20", " ", "g");
									espece = espece.replace("2", "", "g");
									bdiv = $t("div", btd[i]);
									valeurT += Math.round(parseInt(ANIMAUX[espece].prix) * 6 / 1000);
									agemoyen += 1;
									sexe = btd[i+1].innerHTML.indexOf("female.png") != -1 ? 1 : 0;
									if (!enclos[espece])
									{	enclos[espece] = new Array()
										for (j=0;j<8;j++) enclos[espece][j] = 0; //01=adultes;23=naissances;45=adultes à la prochaine MAJ;67=tous
									}
									enclos[espece][sexe] += 1;
									if (espece.indexOf("albinos") != -1)
									{	if (!albinostvieux[espece])
										{	albinostvieux[espece] = new Array()
											for (j=0;j<2;j++) albinostvieux[espece][j] = 0; //01=tresvieuxmalefemelle
										}
									}
									if (!supp_mourants)
									{	enclos[espece][sexe+6] += 1;
										enclosbis[espece] = "ok";
										if (!mourants[numenclos])
										{	mourants[numenclos] = new Array();
											mourants[numenclos][0] = espece;
											mourants[numenclos][1] = 1;
										}
										else
										{	temoin = false;
											for (j=0; j<mourants[numenclos].length; j+=2)
												if (mourants[numenclos][j] == espece) { temoin = true; mourants[numenclos][j+1] = parseInt(mourants[numenclos][j+1]) + 1; }
											if (!temoin)
											{	mourants[numenclos][j] = espece;
												mourants[numenclos][j+1] = 1;
											}
										}
										if (espece.indexOf("albinos") != -1)
											albinostvieux[espece][sexe] += 1;
										if (!synthvieux[numenclos])
										{	synthvieux[numenclos] = new Array();
											synthvieux[numenclos][0] = espece;
											for (j=1;j<5;j++) synthvieux[numenclos][j] = 0; //0918=especes;12=tous;34=vieux;56=age+vieux;78=age-vieux
											for (j=5;j<9;j++) synthvieux[numenclos][j] = "";
											synthvieux[numenclos][sexe+3] = 1;
											synthvieux[numenclos][sexe+5] = "/0";
										}
										else
										{	temoin = false;
											for (j=0; j<synthvieux[numenclos].length; j+=9)
												if (synthvieux[numenclos][j] == espece)
												{	temoin = true;
													synthvieux[numenclos][j+sexe+3] = parseInt(synthvieux[numenclos][j+sexe+3]) + 1;
													synthvieux[numenclos][j+sexe+5] += "/0";
													break;
												}
											if (!temoin)
											{	synthvieux[numenclos][j] = espece;
												for (k=1;k<5;k++) synthvieux[numenclos][j+k] = 0;
												for (k=5;k<9;k++) synthvieux[numenclos][j+k] = "";
												synthvieux[numenclos][j+sexe+3] = 1;
												synthvieux[numenclos][j+sexe+5] = "/0";
											}
										}
									}
									else
									{	numero = btd[i+1].innerHTML.substring(btd[i+1].innerHTML.indexOf("ids")+4);
										numero = numero.substring(0, numero.indexOf("\""));
										sexe = sexe == 0 ? "mâle" : "femelle";
										if (espece == "coq patriote")
										{	if (sexe == "femelle") { espece = "poule"; sexe = "patriote"; }
											else { espece = "coq"; sexe = "patriote"; }
										}
										prix = Math.round(parseInt(prixbourse[espece])*0.006);
										liste[numero] = espece + " " + sexe + ", vente : " + millier(prix) + " Zoo'z";
										binput = $t("input", btd[i]);
										binput[0].dispatchEvent(clickmouse);
									}
								}
								else if (btd[i].innerHTML == "&nbsp;") i--;
								else
								{	if (supp_mourants)
									{	GM_setValue("liste", serialize(liste));
										GM_setValue("ventemourants", true);
										GM_setValue("ancmourants", parseInt(GM_getValue("ancmourants", 0)) + nb);
										nb = 0;
									}
									break;
								}
							}
						}
						for (debi=0;debi<btd.length;debi++)
						{	bdiv = $t("div", btd[debi]);
							if (bdiv[0])
								{ if (bdiv[0].innerHTML == "<strong>Vos animaux</strong>") break; }
						}
						debi++;
						for (i=debi;i<btd.length;i+=2)
						{	if (btd[i].align == "center")
							{	nb++;
								espece = btd[i].innerHTML.substring(25);
								espece = espece.substring(espece.indexOf("_") + 1, espece.indexOf(".jpg"));
								espece = espece.replace("%20", " ", "g");
								espece = espece.replace("2", "", "g");
								enclosbis[espece] = "ok";
								bdiv = $t("div", btd[i]);
								age = parseInt(parseFloat(bdiv[1].style.width.substring(0,bdiv[1].style.width.length - 2))/.71);
								agemoyen += age;
								valeurT += Math.round(parseInt(ANIMAUX[espece].prix) * age * 0.006);
								sexe = btd[i+1].innerHTML.indexOf("female.png") != -1 ? 1 : 0;
								if (!enclos[espece])
								{	enclos[espece] = new Array()
									for (j=0;j<8;j++) enclos[espece][j] = 0; //01=adultes;23=naissances;45=adultes à la prochaine MAJ;67=tous
								}
								enclos[espece][sexe+6] += 1;
								if (espece.indexOf("albinos") != -1)
								{	if (!albinostvieux[espece])
									{	albinostvieux[espece] = new Array();
										for (j=0;j<2;j++) albinostvieux[espece][j] = 0; //01=tresvieuxmalefemelle
									}
									if (age < 7) albinostvieux[espece][sexe] += 1;
								}
								if (age < 94)
								{	enclos[espece][sexe] += 1;
									if (!synthvieux[numenclos])
									{	synthvieux[numenclos] = new Array();
										synthvieux[numenclos][0] = espece;
										for (j=1;j<5;j++) synthvieux[numenclos][j] = 0; //0918=especes;12=tous;34=vieux;56=age+vieux;78=age-vieux
										for (j=5;j<9;j++) synthvieux[numenclos][j] = "";
										if (age < vieux+2)
										{	synthvieux[numenclos][sexe+3] = 1;
											synthvieux[numenclos][sexe+5] = "/" + (age-1);
										}
										else synthvieux[numenclos][sexe+7] = "/" + (age-1);
									}
									else
									{	temoin = false;
										for (j=0; j<synthvieux[numenclos].length; j+=9)
											if (synthvieux[numenclos][j] == espece)
											{	temoin = true;
												if (age < vieux+2)
												{	synthvieux[numenclos][j+sexe+3] = parseInt(synthvieux[numenclos][j+sexe+3]) + 1;
													synthvieux[numenclos][j+sexe+5] += "/" + (age-1);
												}
												else synthvieux[numenclos][j+sexe+7] += "/" + (age-1);
												break;
											}
										if (!temoin)
										{	synthvieux[numenclos][j] = espece;
											for (k=1;k<5;k++) synthvieux[numenclos][j+k] = 0;
											for (k=5;k<9;k++) synthvieux[numenclos][j+k] = "";
											if (age < vieux+2)
											{	synthvieux[numenclos][j+sexe+3] = 1;
												synthvieux[numenclos][j+sexe+5] = "/" + (age-1);
											}
											else synthvieux[numenclos][j+sexe+7] = "/" + (age-1);
										}
									}
								}
								if (age < 95)
									enclos[espece][sexe+4] += 1;
								if (age == 99)
								{	enclos[espece][sexe+2] += 1;
									ptstemp -= (50 + Math.round(parseInt(prixbourse[espece])/100));
								}
							}
							else break;
						}
						GM_setValue("ptstemp", ptstemp);
						if (synthvieux[numenclos])
						{	for (i=0;i<synthvieux[numenclos].length;i+=9) // on récupère le nombre d'animaux de chaque espèce
							{	synthvieux[numenclos][i+1] = enclos[synthvieux[numenclos][i]][6];
								synthvieux[numenclos][i+2] = enclos[synthvieux[numenclos][i]][7];
							}
						}
						var espece_source, numalb, marge;
						for (espece in enclos)
						{	if (espece.indexOf("albinos") != -1)
							{	espece_source = espece.replace(" albinos", "");
								if (enclos[espece_source])
								{	if (!albinos[numenclos])
										albinos[numenclos] = new Array(); // 0=especesource;12=malefemelle manquant;34=malefemelle non tres vieux manquant;56=malefemelle non bébé manquant;78=max
									numalb = albinos[numenclos].length;
									albinos[numenclos][numalb] = espece_source;
									couples_albi = Math.min(parseInt(animauxmax[espece][numenclos]), enclos[espece][6], enclos[espece][7]);
									marge = Math.max(0, parseInt(animauxmax[espece][numenclos]) - Math.min(enclos[espece][6], enclos[espece][7]));
									albinos[numenclos][numalb+1] = Math.min(enclos[espece][7] - couples_albi, marge);
									albinos[numenclos][numalb+2] = Math.min(enclos[espece][6] - couples_albi, marge);
									couples_albi = Math.min(parseInt(animauxmax[espece][numenclos]), enclos[espece][6] - albinostvieux[espece][0], enclos[espece][7] - albinostvieux[espece][1]);
									marge = Math.max(0, parseInt(animauxmax[espece][numenclos]) - Math.min(enclos[espece][6] - albinostvieux[espece][0], enclos[espece][7] - albinostvieux[espece][1]));
									albinos[numenclos][numalb+3] = Math.min(enclos[espece][7] - albinostvieux[espece][1] - couples_albi, marge);
									albinos[numenclos][numalb+4] = Math.min(enclos[espece][6] - albinostvieux[espece][0] - couples_albi, marge);
									couples_albi = Math.min(parseInt(animauxmax[espece][numenclos]), enclos[espece][4], enclos[espece][5]);
									marge = Math.max(0, parseInt(animauxmax[espece][numenclos]) - Math.min(enclos[espece][4], enclos[espece][5]));
									albinos[numenclos][numalb+5] = Math.min(enclos[espece][5] - couples_albi, marge);
									albinos[numenclos][numalb+6] = Math.min(enclos[espece][4] - couples_albi, marge);
									albinos[numenclos][numalb+7] = Math.max(albinos[numenclos][numalb+1], albinos[numenclos][numalb+3], albinos[numenclos][numalb+5]);
									albinos[numenclos][numalb+8] = Math.max(albinos[numenclos][numalb+2], albinos[numenclos][numalb+4], albinos[numenclos][numalb+6]);
									couples_albi = Math.min(enclos[espece][0], enclos[espece][1]);
									enclos[espece_source][0] += enclos[espece][0] - couples_albi;
									enclos[espece_source][1] += enclos[espece][1] - couples_albi;
									enclos[espece][0] = couples_albi;
									enclos[espece][1] = couples_albi;
									transfertmale = albinos[numenclos][numalb+7];
									transfertfemelle = albinos[numenclos][numalb+8];
									enclos[espece_source][4] -= transfertmale;
									enclos[espece_source][5] -= transfertfemelle;
									enclos[espece][4] += transfertmale;
									enclos[espece][5] += transfertfemelle;
								}
							}
						}

						couples = parseInt(GM_getValue("couples_" + id_zoo, 0));
						nb_th = parseFloat(GM_getValue("nb_th_" + id_zoo, "0"));
						sexes = unserialize(GM_getValue("sexes_" + id_zoo, "0,0;1,0;"));
						sexes[0] = parseInt(sexes[0]);
						sexes[1] = parseInt(sexes[1]);
						valeur_th = parseFloat(GM_getValue("valeur_th_" + id_zoo, "0"));
						felins = parseInt(GM_getValue("felins_" + id_zoo, 0));
						for (espece in enclos)
						{	if (espece == "lion" || espece == "lion albinos" || espece == "tigre" || espece == "panthere" || espece == "panthere noire" || espece == "lynx" ||
							espece == "once" || espece == "tigre blanc" || espece == "guepard" || espece == "puma" || espece == "caracal" || espece == "colocolo")
									felins += Math.min(enclos[espece][0], enclos[espece][1]);
							couples += Math.min(enclos[espece][0], enclos[espece][1]);
							maxi = parseInt(animauxmax[espece][numenclos]);
							albi0 = 0; albi1 = 0; albi2 = 0; albi3 = 0;
							if (albinos[numenclos])
							{	if (espece.indexOf("albinos") != -1)
								{	for (i=0;i<albinos[numenclos].length;i+=9)
									{	if (albinos[numenclos][i] == espece.replace(" albinos", ""))
										{	albi0 = parseInt(albinos[numenclos][i+7]);
											albi1 = parseInt(albinos[numenclos][i+8]);
											break;
										}
									}
								}
								else
								{	for (i=0;i<albinos[numenclos].length;i+=9)
									{	if (albinos[numenclos][i] == espece)
										{	albi2 = parseInt(albinos[numenclos][i+7]);
											albi3 = parseInt(albinos[numenclos][i+8]);
											break;
										}
									}
								}
							}
							//alert(espece + " " + albi0 + " "+ albi1);
							if (enclos[espece][4] > maxi + albi0 || enclos[espece][5] > maxi + albi1)
							{	if (GM_getValue("afficheadulte", 3) > 3) GM_setValue("ventetrop", true);
								if (!couples15[numenclos])
									couples15[numenclos] = new Array();
								j = couples15[numenclos].length;
								couples15[numenclos][j] = espece;
								couples15[numenclos][j+1] = enclos[espece][4] > maxi + albi0 ? enclos[espece][4] - maxi - albi0 : 0;
								couples15[numenclos][j+2] = enclos[espece][5] > maxi + albi1 ? enclos[espece][5] - maxi - albi1 : 0;
								couples15[numenclos][j+3] = 1;
							}
							else if (parseInt(GM_getValue("afficheadulte", 3)) == 5 && ((enclos[espece][4] > enclos[espece][5] && enclos[espece][6] > maxi + albi2) || (enclos[espece][5] > enclos[espece][4] && enclos[espece][7] > maxi + albi3)))
							{	if (!couples15[numenclos])
									couples15[numenclos] = new Array();
								j = couples15[numenclos].length;
								couples15[numenclos][j] = espece;
								couples15[numenclos][j+1] = enclos[espece][4] > enclos[espece][5] && enclos[espece][6] > maxi + albi2 ? enclos[espece][4] - enclos[espece][5] : 0;
								couples15[numenclos][j+2] = enclos[espece][5] > enclos[espece][4] && enclos[espece][7] > maxi + albi3 ? enclos[espece][5] - enclos[espece][4] : 0;
								couples15[numenclos][j+3] = 0;
							}
							if (parseInt(ANIMAUX[espece].prix) <= 100000)
							{	nb_th += Math.min(enclos[espece][0], enclos[espece][1]) * 0.03;
								valeur_th += Math.min(enclos[espece][0], enclos[espece][1]) * parseInt(ANIMAUX[espece].prix) * 0.03;
							}
							else if (parseInt(ANIMAUX[espece].prix) <= 250000)
							{	nb_th += Math.min(enclos[espece][0], enclos[espece][1]) * 0.0252;
								valeur_th += Math.min(enclos[espece][0], enclos[espece][1]) * parseInt(ANIMAUX[espece].prix) * 0.0252;
							}
							else if (parseInt(ANIMAUX[espece].prix) <= 500000)
							{	nb_th += Math.min(enclos[espece][0], enclos[espece][1]) * 0.0242;
								valeur_th += Math.min(enclos[espece][0], enclos[espece][1]) * parseInt(ANIMAUX[espece].prix) * 0.0242;
							}
							else
							{	nb_th += Math.min(enclos[espece][0], enclos[espece][1]) * 0.0227;
								valeur_th += Math.min(enclos[espece][0], enclos[espece][1]) * parseInt(ANIMAUX[espece].prix) * 0.0227;
							}
							sexes[0] += enclos[espece][2];
							sexes[1] += enclos[espece][3];
						}
						espece = null;
						for (espece in enclosbis) break;
						if (espece)
						{	for (espece in enclosbis) especes_triees.push(espece);
							especes_triees.sort();
							for (i=0;i<especes_triees.length;i++)
								enclosbulle += especes_triees[i] +" / ";
							anim = nb > 1 ? " animaux" : " animal";
							s = especes_triees.length > 1 ? "s" : "";
							enclosbulle = enclosbulle.substring(0, enclosbulle.length - 3);
							enclosbulle = nb + anim + ".<br>" + especes_triees.length + " espèce" + s + " : " + enclosbulle;
						}
						else enclosbulle = "Vide"; // cas où il n'y aurait que des mourants que l'on vend
						touslesenclos[numenclos] = enclosbulle;
						var synthanimaux = unserialize(GM_getValue("synthanimaux_" + id_zoo, ""));
						synthanimaux[numenclos] = new Array();
						i=0;
						for (espece in enclos)
						{	if (enclos[espece][6] + enclos[espece][7] > 0) // on ne tient pas compte des espèces constituées que de mourants que l'on vend
							{	synthanimaux[numenclos][i] = espece;
								synthanimaux[numenclos][i+1] = enclos[espece][6];
								synthanimaux[numenclos][i+2] = enclos[espece][7];
								i+=3;
							}
						}
						GM_setValue("couples_" + id_zoo, couples);
						GM_setValue("agemoyen_" + id_zoo, agemoyen);
						GM_setValue("nb_th_" + id_zoo, (Math.round(nb_th*10000)/10000).toString());
						GM_setValue("sexes_" + id_zoo, serialize(sexes));
						GM_setValue("valeur_th_" + id_zoo, valeur_th.toString());
						GM_setValue("valeurT_" + id_zoo, valeurT);
						GM_setValue("felins_" + id_zoo, felins);
						GM_setValue("mourants_" + id_zoo, serialize(mourants));
						GM_setValue("couples15_" + id_zoo, serialize(couples15));
						GM_setValue("synthvieux_" + id_zoo, serialize(synthvieux));
						GM_setValue("albinos_" + id_zoo, serialize(albinos));
						GM_setValue("synthanimaux_" + id_zoo, serialize(synthanimaux));
						GM_setValue("touslesenclos_" + id_zoo, serialize(touslesenclos));
						
					}
					else
					{	enclosbulle = "Vide";
						touslesenclos[numenclos] = enclosbulle;
						GM_setValue("touslesenclos_" + id_zoo, serialize(touslesenclos));
						if (param_enclos == derenclos) testder = true;
					}
				}
				else if (connexion1 && GM_getValue("ventemourants", false))
				{	GM_deleteValue("ventemourants");
					if (param_enclos == derenclos || derenclos == "Aucun") testder = true;
				}
				else if (connexion1 && GM_getValue("ventetrop", false))
				{	GM_deleteValue("ventetrop");
					if (param_enclos == derenclos) testder = true;
				}
				else
				{	GM_deleteValue("bad");
					if (param_enclos == derenclos) testder = true;
				}
			}
			else if (connexion1 && touslesenclos[numenclos].indexOf("Initialisation") != -1)
			{	touslesenclos[numenclos] = "Enclos non construit";
				GM_setValue("touslesenclos_" + id_zoo, serialize(touslesenclos));
				var fini = true;
				for (i=0;i<62;i++)
					if (touslesenclos[ordre[i]].indexOf("Initialisation") != -1) { fini = false; break; }
				if (fini) testder = true;
			}
			if (testder)
			{	couples = parseInt(GM_getValue("couples_" + id_zoo, 0));
				agemoyen = parseInt(GM_getValue("agemoyen_" + id_zoo, 0));
				nb_th = parseFloat(GM_getValue("nb_th_" + id_zoo, "0"));
				valeur_th = parseFloat(GM_getValue("valeur_th_" + id_zoo, "0"));
				valeurT = parseInt(GM_getValue("valeurT_" + id_zoo, 0));
				sexes = unserialize(GM_getValue("sexes_" + id_zoo, "0,0;1,0;"));
				sexes[0] = parseInt(sexes[0]);
				sexes[1] = parseInt(sexes[1]);
			}

			if (GM_getValue("ventemourants", false))
			{	binput = $t("input");
				binput[binput.length-1].dispatchEvent(clickmouse);
			}
			else if (GM_getValue("ventetrop", false))
			{	var trsexe, debi, bdiv, sexe, age, prix, liste = new Array(), nb0, j2;
				var prixbourse = unserialize(GM_getValue("prixbourse", ""));
				var couples15 = unserialize(GM_getValue("couples15_" + id_zoo, ""));
				var synthvieux = unserialize(GM_getValue("synthvieux_" + id_zoo, "")), vieux = parseInt(GM_getValue("vieux", 10));
				var synthanimaux = unserialize(GM_getValue("synthanimaux_" + id_zoo, ""));
				var nbt = 0;
				btd = $t("td");
				for (debi=0;debi<btd.length;debi++)
				{	bdiv = $t("div", btd[debi]);
				if (bdiv[0])
					{ if (bdiv[0].innerHTML == "<strong>Vos animaux</strong>") break; }
				}
				debi++;
				for (i=debi;i<btd.length;i+=2)
				{	if (btd[i].align == "center")
					{	espece = btd[i].innerHTML.substring(25);
						espece = espece.substring(espece.indexOf("_") + 1, espece.indexOf(".jpg"));
						espece = espece.replace("%20", " ", "g");
						espece = espece.replace("2", "", "g");
						sexe = btd[i+1].innerHTML.indexOf("female.png") != -1 ? 1 : 0;
						for (j=0;j<couples15[numenclos].length;j+=4)
						{	if (parseInt(couples15[numenclos][j+3]) == 1)
							{	trsexe = parseInt(couples15[numenclos][j+1]) > 0 ? 0 : 1;
								if (espece == couples15[numenclos][j] && sexe == trsexe)
								{	nbt++;
									numero = btd[i+1].innerHTML.substring(btd[i+1].innerHTML.indexOf("ids")+4);
									numero = numero.substring(0, numero.indexOf("\""));
									sexe = sexe == 0 ? "mâle" : "femelle";
									bdiv = $t("div", btd[i]);
									age = parseInt(parseFloat(bdiv[1].style.width.substring(0,bdiv[1].style.width.length - 2))/.71);
									prix = Math.round(parseInt(prixbourse[espece])*age*0.006);
									if (espece == "coq patriote")
									{	if (sexe == "femelle") { espece = "poule"; sexe = "patriote"; }
										else { espece = "coq"; sexe = "patriote"; }
									}
									liste[numero] = espece + " " + sexe + ", vente : " + millier(prix) + " Zoo'z";
									binput = $t("input", btd[i]);
									binput[0].dispatchEvent(clickmouse);
									couples15[numenclos][j+1+trsexe] = parseInt(couples15[numenclos][j+1+trsexe]) - 1;
									if (parseInt(couples15[numenclos][j+1]) == 0 && parseInt(couples15[numenclos][j+2]) == 0)
										couples15[numenclos].splice(j, 4);
									for (j2=0;j2<synthvieux[numenclos].length;j2+=9)
									{	if (synthvieux[numenclos][j2] == espece)
										{	synthvieux[numenclos][j2+1+trsexe] = parseInt(synthvieux[numenclos][j2+1+trsexe]) - 1;
											if (age < vieux+2)
											{	synthvieux[numenclos][j2+3+trsexe] = parseInt(synthvieux[numenclos][j2+3+trsexe]) - 1;
												synthvieux[numenclos][j2+5+trsexe] = synthvieux[numenclos][j2+5+trsexe].substring(synthvieux[numenclos][j2+5+trsexe].indexOf("/", 1));
											}
											else
												synthvieux[numenclos][j2+7+trsexe] = synthvieux[numenclos][j2+7+trsexe].substring(synthvieux[numenclos][j2+7+trsexe].indexOf("/", 1));
											break;
										}
									}
									for (j2=0;j2<synthanimaux[numenclos].length;j2+=3)
									{	if (synthanimaux[numenclos][j2] == espece)
											synthanimaux[numenclos][j2+1+trsexe] = parseInt(synthanimaux[numenclos][j2+1+trsexe]) - 1;
									}
									nb0 = touslesenclos[numenclos].substring(0, touslesenclos[numenclos].indexOf(" anim"));;
									touslesenclos[numenclos] = touslesenclos[numenclos].replace(nb0, parseInt(nb0)-1);
									break;
								}
							}
						}
						nb0 = 0;
						for (j=0;j<couples15[numenclos].length;j+=4)
							if (parseInt(couples15[numenclos][j+3]) == 0) nb0++;
						if (couples15[numenclos].length == 4*nb0) break;
					}
					else break;
				}
				GM_setValue("liste", serialize(liste));
				GM_setValue("couples15_" + id_zoo, serialize(couples15));
				GM_setValue("synthvieux_" + id_zoo, serialize(synthvieux));
				//GM_setValue("albinos_" + id_zoo, serialize(albinos));
				GM_setValue("synthanimaux_" + id_zoo, serialize(synthanimaux));
				GM_setValue("touslesenclos_" + id_zoo, serialize(touslesenclos));
				GM_setValue("anctrop", parseInt(GM_getValue("anctrop", 0)) + nbt);
				binput = $t("input");
				binput[binput.length-1].dispatchEvent(clickmouse);
			}
			else
			{	if (GM_getValue("afficheadulte", 3) > 3)
				{	var couples15 = unserialize(GM_getValue("couples15_" + id_zoo, "")), newcouples15 = new Array();
					i == null;
					for (i in couples15) break;
					if (i)
						for (i in couples15) if (couples15[i]) newcouples15[i] = couples15[i];
					GM_setValue("couples15_" + id_zoo, serialize(newcouples15));
				}
				btd = $t("td", last_tablebureau);
				var lienmaj = $t("a", last_tablelien); // lien pour mettre à jour tous les PA d'un coup
				lienmaj = lienmaj[0].getAttribute("href");
				var PAdispo = new Array(), PAplus = new Array(), PAmoins = new Array();
				for (i=0;i<5;i++)
				{	PAplus[i] = 0; PAmoins[i] = 0;
					PAdispo[i] = parseInt(btd[i].innerHTML.substring(btd[i].innerHTML.indexOf("PA dispo :")+11, btd[i].innerHTML.indexOf("</strong")));
				}
				bad = false;
				for (i=8;i<btd.length;i+=8) // contrôle des PA
				{	if (btd[i].getAttribute("id") == "grand1" || btd[i].getAttribute("id") == "grand2")
					{	PA1 = parseInt(btd[i].innerHTML.substring(0, btd[i].innerHTML.indexOf("<br>")));
						if (btd[i+3].innerHTML.indexOf("<br>") == -1) PA2=parseInt(btd[i+3].innerHTML);
						else PA2=parseInt(btd[i+3].innerHTML.substring(0, btd[i+3].innerHTML.indexOf("<br>")));
						j = i/8-1;
						if (j==0 && PA2 == 0) vide = true;
						if (j==2 && vide && 
							(PA1 != PA2 || parseInt(btd[40].innerHTML.substring(0, btd[40].innerHTML.indexOf("<br>"))) != parseInt(btd[43].innerHTML.substring(0, btd[43].innerHTML.indexOf("<br>")))))
								vide = false; // si enclos vide mais réparateur ou paysagiste pas bon, on ajuste les PA avant de mettre le PA gardien à 0
						if (j==3 && vide) PA2 = 0;
						if (PA1 > PA2 && !(j==3 && vide)) bad = true;
						if (PA1 < PA2)
						{	bad = true;
							PAplus[j] = Math.max(Math.ceil((PA2-PA1-PAdispo[j])/10), 0);
						}
					}
				}
				if (bad) // si les PA sont incorrects, on corrige en embauchant éventuellement
				{	if (connexion1) GM_setValue("bad", true);
					if (PAplus[0]+PAplus[1]+PAplus[2]+PAplus[3]+PAplus[4] == 0) // pas besoin d'embaucher
						pagesuivante(urlSite + lienmaj);
					else
					{	var lienplus = urlSite + "bureau.php?achat=1&j="; // lien pour embaucher
						tot = PAplus[0]+PAplus[1]+PAplus[2]+PAplus[3]+PAplus[4];
						GM_setValue("totalPAp", "étape 0 sur " + tot);
						if (GM_getValue("MAJPA2", false)) GM_setValue("MAJPA", true);
						for (i=0;i<5;i++)
						{	if (PAplus[i]>0)
							{	lienplus += i+1;
								PAplus[i] += -1;
								GM_setValue("plus",serialize(PAplus));
								GM_setValue("paraenclos", param_enclos);
								pagesuivante(lienplus);
								break;
							}
						}
					}
				}
				else
				{	if (!connexion1) // on scanne pour le rapport ou on met les PA à niveau pour un enclos particulier
					{	if (vide && parseInt(btd[32].innerHTML.substring(0, btd[32].innerHTML.indexOf("<br>"))) > 0) // si enclos vide mais il y a des PA gardiens, on met les PA gardien à 0
						{	var lien = $t("a", btd[31]);
							lien = urlSite + lien[0].getAttribute("href");
							bad = true;
							pagesuivante(lien);
						}
						else if (param_enclos == derenclos && !GM_getValue("MAJPA2", false))  // si c'est le dernier enclos, on contrôle une dernière fois les PA pour licencier éventuellement les employés en trop
						{	for (i=0;i<5;i++) PAmoins[i]=Math.floor(PAdispo[i]/10);
							if (PAmoins[0]+PAmoins[1]+PAmoins[2]+PAmoins[3]+PAmoins[4] != 0)
							{	tot = PAmoins[0]+PAmoins[1]+PAmoins[2]+PAmoins[3]+PAmoins[4];
								GM_setValue("totalPAm", "étape 0 sur " + tot);
								bad = true;
								var lienmoins = urlSite + "bureau.php?achat=1&l="; // lien pour diminuer de 10 les PA
								for (i=0;i<5;i++)
								{	if (PAmoins[i]>0)
									{	lienmoins += i+1;
										PAmoins[i] += -1;
										GM_setValue("moins",serialize(PAmoins));
										GM_setValue("paraenclos", param_enclos);
										pagesuivante(lienmoins);
										break;
									}
								}
							}
						}
					}
					if (!bad && !GM_getValue("MAJPA2", false)) // on passe à l'enclos suivant
					{	var next_enclos = new Array();
						i = parseInt(tab_param_enclos[0]) * 100 + parseInt(tab_param_enclos[1]);
						j = 0;
						while (parseInt(ordre[j]) != i) j++;
						j++;
						if (!connexion1) while (touslesenclos[ordre[j]] == "Enclos non construit" && j < 62) j++;
						else while ((touslesenclos[ordre[j]] == "Enclos non construit" || touslesenclos[ordre[j]] == "Vide") && j < 62) j++;
						if (j < 62)
						{	numenclos = parseInt(ordre[j]);
							next_enclos[0] = Math.floor(numenclos/100);
							next_enclos[1] = numenclos - next_enclos[0]*100;
							pagesuivante(urlSite + "enclosgestion1.php?t=" + next_enclos[0] + "&v=" + next_enclos[1]);
						}
						else
						{	//GM_deleteValue("ordre");
							if (connexion1) // on a fini le scan pour les naissances théoriques
							{	var tableau = unserialize(GM_getValue("string_naissances_" + id_zoo, ""));
								nb = 0;
								var valeur = 0, moyenne = 0, nbanim = 0;
								for (numenclos in tableau)
								{	for (i=0;i<tableau[numenclos].length;i+=2)
									{	nb += parseInt(tableau[numenclos][i+1]);
										valeur += parseInt(ANIMAUX[tableau[numenclos][i]].prix * parseInt(tableau[numenclos][i+1]));
									}
								}
								if (nb > 0) moyenne = Math.round(valeur/nb);
								for (i in touslesenclos)
								{	if (touslesenclos[i] != "Vide" && touslesenclos[i] != "Enclos non construit")
										nbanim += parseInt(touslesenclos[i].substring(0, touslesenclos[i].indexOf(" ")));
								}
								nbanim += parseInt(GM_getValue("ancmourants", 0)) + parseInt(GM_getValue("anctrop", 0)); // on rajoute les mourants et adultes en trop vendus
								if (nbanim > 0) agemoyen = Math.round(100 * agemoyen / nbanim) / 100;
								else agemoyen = 0;
								moy_th = nb_th > 0 ? Math.round(valeur_th/nb_th) : 0;
								var suivinaiss = GM_getValue("suivi_naissances_"+id_zoo, ""), ajounais = false;
								if (suivinaiss != "")
								{	var derdat = suivinaiss.substring(0, suivinaiss.lastIndexOf(":"));
									if (derdat.indexOf(";") != -1) derdat = derdat.substring(derdat.lastIndexOf(";")+1);
									if (derdat != GM_getValue("dateConnexion_" + id_zoo)) ajounais = true;
								}
								else ajounais = true;
								if (ajounais)
								{	suivinaiss = GM_getValue("dateConnexion_" + id_zoo) + ":" + millier(couples) + "/" + millier(valeurT)+ "/" + millier(nbanim)+ "/" +
										agemoyen  + "," + nb + "/" + Math.round(100*nb_th)/100 + "," + millier(valeur) + "/" + millier(Math.round(valeur_th)) + "," +
										millier(moyenne) + "/" + millier(moy_th) + "," + sexes[0] + "/" + sexes[1] + ";"; // a/c du 5/1/10, valeurT à la place de valeurC
									suivinaiss = GM_getValue("suivi_naissances_"+id_zoo, "") + suivinaiss;
									GM_setValue("suivi_naissances_"+id_zoo, suivinaiss);
								}
								GM_deleteValue("couples_" + id_zoo);
								GM_deleteValue("valeurT_" + id_zoo);
								GM_deleteValue("agemoyen_" + id_zoo);
								GM_deleteValue("valeur_th_" + id_zoo);
								GM_deleteValue("sexes_" + id_zoo);
								var suivicltemp = GM_getValue("suivicltemp", "");
								if (suivicltemp != "")
								{	var suivicl = GM_getValue("suivi_cl_" + id_zoo, "");
									suivicltemp = suivicltemp.replace("PTS", ptstemp);
									suivicl += suivicltemp;
									GM_setValue("suivi_cl_" + id_zoo, suivicl);
									GM_deleteValue("ptstemp");
									GM_deleteValue("suivicltemp");
								}
								cherchestocks();
							}
							else // on a fini le scan pour le rapport, on vérifie les stocks
								pagesuivante(urlSite + "bureau4.php");
						}
					}
					else if (!bad)
					{	GM_deleteValue("MAJPA2");
						GM_setValue("venteauto", true); // simulation, pour exécuter le fincache
						pagesuivante(urlSite + "enclosgestion1.php?t=" + tab_param_enclos[0] + "&v=" + tab_param_enclos[1]);
					}
				}
			}
		}
		else if (/bureau.php/.test(window.location))
		{	if (scan || GM_getValue("MAJPA", false) || GM_getValue("totalPAm", "") != "") // si on est entrain de scanner, on embauche ou licencie ce qui va bien
			{	var PAplus = unserialize(GM_getValue("plus","0,0;1,0;2,0;3,0;4,0;"));
				var PAmoins = unserialize(GM_getValue("moins","0,0;1,0;2,0;3,0;4,0;"));
				for (i=0;i<5;i++) { PAplus[i] = parseInt(PAplus[i]); PAmoins[i] = parseInt(PAmoins[i]); }
				if (PAplus[0]+PAplus[1]+PAplus[2]+PAplus[3]+PAplus[4] == 0)
				{	if (PAmoins[0]+PAmoins[1]+PAmoins[2]+PAmoins[3]+PAmoins[4] == 0)
					{	if (GM_getValue("totalPAm", "") != "")
						{	patience("PAm");
							GM_deleteValue("totalPAm");
							if (!scan) GM_setValue("venteauto", true); // simulation, pour exécuter le fincache
						}
						else if (GM_getValue("totalPAp", "") != "")
						{	patience("PAp");
							GM_deleteValue("totalPAp");
						}
						var paraenclos = GM_getValue("paraenclos");
						GM_deleteValue("paraenclos");
						pagesuivante(urlSite + "enclosgestion1.php?t=" + paraenclos.substring(0, paraenclos.indexOf("_")) + "&v=" + paraenclos.substring(paraenclos.indexOf("_")+1));
					}
					else
					{	var lienmoins = urlSite + "bureau.php?achat=1&l=";
						patience("PAm");
						for (i=0;i<5;i++)
						{	if (PAmoins[i]>0)
							{	lienmoins += i+1;
								PAmoins[i] += -1;
								GM_setValue("moins",serialize(PAmoins));
								pagesuivante(lienmoins);
								break;
							}
						}
					}
				}
				else
				{	var lienplus = urlSite + "bureau.php?achat=1&j=";
					patience("PAp");
					for (i=0;i<5;i++)
					{	if (PAplus[i]>0)
						{	lienplus += i+1;
							PAplus[i] += -1;
							GM_setValue("plus",serialize(PAplus));
							pagesuivante(lienplus);
							break;
						}
					}
				}
			}
			else if (testcarac()) // page du personnel en cours de jeu
			{	var bspan = $t("span");
				var txt = bspan[0].innerHTML;
				txt = txt.replace("employé(s) simple(s)","balayeur(s)");
				bspan[0].innerHTML = txt;
				var ba = $t("a");
				txt = ba[41].innerHTML;
				txt = txt.replace("employé simple","balayeur");
				ba[41].innerHTML = txt;
				titrefen("Personnel");
			}
		}
		else if (/bureau2.php/.test(window.location))
		{	if (scan)
			{	var bdiv = $c("content_site")[0].innerHTML;
				bdiv = bdiv.substring(bdiv.indexOf("aire de re")+19);
				bdiv = parseInt(bdiv.substring(0, bdiv.indexOf(" %")));
				var ptstemp = parseInt(GM_getValue("ptstemp"));
				ptstemp -= bdiv*3;
				var entete = entetef();
				var sante = parseInt(recherche_param("?"+entete, "barrerouge"));
				var moral = parseInt(recherche_param("?"+entete, "barrebleue"));
				if (sante == 100 && ptstemp != 10) ptstemp -= 100;
				if (sante == 0) ptstemp += 500;
				if (moral == 100 && ptstemp != 10) ptstemp -= 100;
				if (moral == 0) ptstemp += 500;
				GM_setValue("ptstemp", ptstemp);
				lancerscan();
			}
			else if (testcarac())
				titrefen("Recettes");
		}
		else if (/records.php/.test(window.location) && testcarac())
			titrefen("Vos records");
		else if (/explorateur.php/.test(window.location) && testcarac())
		{	var ba = $t("a");
			for(i=0;i<ba.length;i++) if (ba[i].href.indexOf("?case=1") != -1) break;
			titrefen("Explorateur", positionY(ba[i]) - 35);
		}
		else if (/event.php/.test(window.location) && GM_getValue("messages_releves_" + id_zoo, "") == "") // relevé des messages lors de la 1ère connexion du jour
		{	reecriture_url();
			var tab_naissances = new Array();
			tab_naissances = /&deb=/.test(window.location) ? unserialize(GM_getValue("string_naissances_" + id_zoo, "")) : unserialize("");

			var messages = $t("div"), bug = false;
			var txt = "", nom_naissance = "", enclos, t, v;
			for (i=0;i<messages.length;i++)
			{	if (messages[i].style.width == "560px") // c'est un message
				{	if (messages[i].innerHTML.indexOf("Grand moment dans votre parc") != -1) // c'est une naissance
					{	txt = messages[i].innerHTML;
						txt = txt.substring(txt.indexOf("eventid=")+8);
						nom_naissance = txt.substring(txt.indexOf("Grand moment dans votre parc, un")+38, txt.indexOf(" vient de voir le jour"));
						nom_naissance = nom_naissance.substring(0, nom_naissance.lastIndexOf(" "));
						enclos = txt.substring(txt.indexOf("href")+6,txt.indexOf("\">Cl"));
						enclos = enclos.replace("amp;","");
						t = parseInt(recherche_param(enclos,"t"));
						v = parseInt(recherche_param(enclos,"v"));
						if (nom_enclos(t, v) != "bad")
						{
							enclos = t*100 + v;
							if (!tab_naissances[enclos])
							{	tab_naissances[enclos] = new Array();
								tab_naissances[enclos][0] = nom_naissance;
								tab_naissances[enclos][1] = 1;
							}
							else
							{	temoin = false;
								for (j=0; j<tab_naissances[enclos].length; j+=2)
									if (tab_naissances[enclos][j] == nom_naissance) { temoin = true; tab_naissances[enclos][j+1] = parseInt(tab_naissances[enclos][j+1]) + 1; }
								if (!temoin)
								{	tab_naissances[enclos][j] = nom_naissance;
									tab_naissances[enclos][j+1] = 1;
								}
							}
						}
						else
						{	alert2("BUG ! BUG ! BUG ! de monzoo.net !!!\n\nUn animal est né dans un enclos qui n'existe pas !\nNom de l'animal : " +
								nom_naissance + "\nEnclos : " + enclos + "\n\nMerci de me transmettre ces éléments sur :\n                 " +
								"http://userscripts.org/scripts/show/63727\npour une prise en compte dans une prochaine version du script.\n\n" +
								"En attendant, arrêt du scan ! Désolé !");
							GM_setValue("messages_releves_" + id_zoo, "ok");
							GM_deleteValue("scan");
							scan = false;
							GM_deleteValue("ordre");
							GM_deleteValue("verifmessage");
							fincache();
							bug = true;
							break;
						}
					}
					else if (messages[i].innerHTML.indexOf("Attraction exceptionnelle") != -1) // c'est une attraction exceptionnelle
					{	txt = messages[i].innerHTML.substring(messages[i].innerHTML.indexOf("Attraction exceptionnelle"));
						txt = txt.substring(45);
						txt = txt.substring(0, txt.indexOf(") ")+1).toLowerCase();
						GM_setValue("attraction_" + id_zoo, txt);
						GM_setValue("attracttemp", "t0");
						txt = txt.substring(txt.indexOf(" ")+1, txt.indexOf(" ("));
						GM_setValue("attractionfo_" + id_zoo, txt);
					}
					else if (messages[i].innerHTML.indexOf("Alerte") != -1) // c'est une tornade
					{	txt = messages[i].innerHTML;
						GM_setValue("tornade", true);
						GM_setValue("tornadefo_" + id_zoo, true);
					}
					else if (messages[i].innerHTML.indexOf("oeuf") != -1) // un mystérieux oeuf est apparu
					{	bstrong = $t("strong", messages[i]);
						GM_setValue("oeuf", bstrong[1].innerHTML.toLowerCase());
						GM_setValue("oeuffo_" + id_zoo, bstrong[1].innerHTML.toLowerCase());
					}
					else if (messages[i].innerHTML.indexOf("Mission Naissances") != -1) // on a réussi au moins 1 mission naissances
					{	txt = messages[i].innerHTML;
						txt = txt.substring(txt.indexOf("de finir")+9, txt.indexOf(" missions du"));
						GM_setValue("mnaiss_" + id_zoo, txt);
					}
					else if (messages[i].innerHTML.indexOf("Missions avanc") != -1) // on a réussi une mission avancée
					{	txt = messages[i].innerHTML;
						txt = txt.substring(txt.indexOf("finir la")+17, txt.indexOf(" du Pack M"));
						GM_setValue("mavanc_" + id_zoo, txt);
					}
				}
			}
			if (!bug)
			{	GM_setValue("string_naissances_" + id_zoo, serialize(tab_naissances));
				// si on a plus de 20 messages, on passe à la page suivante
				var tous_liens = $t("a"), messsuivant = false;
				for (i=0;i<tous_liens.length;i++)
				{	if (tous_liens[i].innerHTML == "[ Les 20 suivants ]")
					{	messsuivant = true;
						pagesuivante(tous_liens[i].href);
						break;
					}
				}
				if (!messsuivant)
				{	GM_setValue("couples_" + id_zoo, 0);
					GM_setValue("agemoyen_" + id_zoo, 0);
					GM_setValue("nb_th_" + id_zoo, "0");
					GM_setValue("sexes_" + id_zoo, "0,0;1,0;");
					GM_setValue("valeur_th_" + id_zoo, "0");
					GM_setValue("valeurT_" + id_zoo, 0);
					GM_setValue("felins_" + id_zoo, 0);
					var prix = new Array(), numenclos = new Array(), j, temp;
					touslesenclos = unserialize(GM_getValue("touslesenclos_" + id_zoo, ""));
					for (i=0;i<16;i++) prix[i] = 0;
					for (i=20;i<61;i++) prix[i] = 0;
					for (i=100;i<105;i++) prix[i] = 0;
					for (enclos in tab_naissances)
					{	for (i=0;i<tab_naissances[enclos].length;i+=2)
						{	if (i == 0) prix[enclos] = ANIMAUX[tab_naissances[enclos][i]].prix;
							else if (prix[enclos] < ANIMAUX[tab_naissances[enclos][i]].prix) prix[enclos] = ANIMAUX[tab_naissances[enclos][i]].prix;
						}
						if (touslesenclos[enclos] == "Vide" || touslesenclos[enclos] == "Enclos non construit")
							touslesenclos[enclos] = "Initialisation3";
					}
					GM_setValue("touslesenclos_" + id_zoo, serialize(touslesenclos));
					for (i in prix) numenclos.push(i);
					numenclos.sort(function (a, b)
					{	if (parseInt(prix[b]) != parseInt(prix[a]))
							return parseInt(prix[b]) - parseInt(prix[a]);
						else return a-b;
					});
					GM_setValue("ordre", serialize(numenclos));
					GM_setValue("scan", true); // on démarre le scan initial
					pagesuivante(urlSite + "bourse.php");
				}
			}
		}
		else if (/event.php/.test(window.location) && testcarac()) // page des messages en cours de jeu
		{	reecriture_url();
			var messages = $t("div"), mes1 = -1, supbr;
			if (!GM_getValue("verifmessage", false)) // on est en consultation simple
			{	if (scan)
				{	GM_deleteValue("scan");
					scan = false;
					alertesonore();
					fincache();
				}
				titrefen("Vos messages");
				for (i=0;i<messages.length;i++)
				{	if (messages[i].style.width == "560px")
					{	if (mes1 == -1) mes1 = i;
						messages[i].innerHTML = messages[i].innerHTML.replace(" cet espèc", " cette espèc", "g");
						messages[i].innerHTML = messages[i].innerHTML.replace("en clos", "enclos", "g");
						if (messages[i].innerHTML.indexOf("Cette dernière a été ajouté ") != -1)
							messages[i].innerHTML = messages[i].innerHTML.replace("ajouté ", "ajoutée ","g");
						if (messages[i].innerHTML.indexOf("Grand moment dans votre parc") != -1)
							messages[i].className = "mesnais";
						/*liste = messages[i].childNodes;
						heuremessage = liste[1].innerHTML;
						textemessage = liste[7].nodeValue.trim();
						alert("%"+heuremessage+"%\n%"+textemessage+"%");*/
					}
				}
				if (mes1 != -1)
				{	var liste = messages[mes1].parentNode.childNodes;
					for(i=0;i<liste.length;i++) if (liste[i].nodeName == "BR") supbr = liste[i].parentNode.removeChild(liste[i]);
					var bdiv = document.createElement("div");
					bdiv.setAttribute("style", "width:100%;text-align:center");
					var filtremessages = parseInt(GM_getValue("filtremessages", 1)), choix, nom;
					for (i=1;i<=2;i++)
					{	choix = document.createElement("input");
						choix.type = "radio";
						choix.name = "filtremessages";
						choix.id = "filtremessages"+i;
						choix.value = i;
						nom = document.createElement("label");
						nom.setAttribute("for", "filtremessages"+i);
						if (i == filtremessages) choix.checked = true;
						nom.innerHTML = i == 1?"Tous les messages&nbsp;&nbsp;&nbsp;":"Pas les naissances";
						bdiv.appendChild(choix);
						bdiv.appendChild(nom);
					}
					ajoute_br(bdiv);
					ajoute_br(bdiv);
					messages[mes1].parentNode.insertBefore(bdiv, messages[mes1].previousSibling);
					if (filtremessages == 2)
					{	var mesnais = $c("mesnais");
						for (i=0;i<mesnais.length;i++) mesnais[i].style.display = "none";
					}
				}
				var tpage = $c("title_site");
				var ba = $t("a");
				for (i=0;i<ba.length;i++) if (ba[i].innerHTML.indexOf("Effacer tous") != -1) break;
				var nbpages = ba[i].innerHTML.substring(ba[i].innerHTML.indexOf("(")+1, ba[i].innerHTML.indexOf(")"));
				nbpages = parseInt((parseInt(nbpages)-1)/20) + 1;
				var numpg = recherche_param(window.location.search, "deb");
				numpg = numpg == "" ? 1 : parseInt(numpg)/20+1;
				tpage[0].innerHTML = tpage[0].innerHTML + " (page " + numpg + "/" + nbpages + ")";
				enclos_naissancesf();
				var numenclos = -1;
				enclosavoirf();
				GM_setValue("message", window.name);
				window.setTimeout(MAJpagemessage, 900000);
			}
			else // on est en train de vérifier les messages
			{	var tab_vols = unserialize(GM_getValue("string_vols_"+id_zoo, ""));
				var contenu_div = "";
				for (i=0;i<messages.length;i++)
				{	if (messages[i].style.width == "560px")
					{	if (messages[i].innerHTML.indexOf("Catastrophe, un espion") != -1) // on s'est fait voler un animal
						{	contenu_div = messages[i].innerHTML;
							contenu_div = contenu_div.substring(contenu_div.indexOf("eventid=")+8);
							id = contenu_div.substring(0, contenu_div.indexOf("\""));
							if (!tab_vols[id])
							{	contenu_div = contenu_div.substring(contenu_div.indexOf("vous voler")+17);
								tab_vols[id] = "on vous a volé un animal de l'espèce " + contenu_div;
							}
						}
					}
				}
				GM_setValue("string_vols_"+id_zoo, serialize(tab_vols));

				var tous_liens = $t("a"), messsuivant = false;
				for (var i=0;i<tous_liens.length;i++)
				{	if (tous_liens[i].innerHTML == "[ Les 20 suivants ]") // si on a plus de 20 messages, on passe à la page suivante
					{	messsuivant = true;
						pagesuivante(tous_liens[i].href);
						break;
					}
				}
				if (!messsuivant) rapport();
			}
		}
		else if (/espion.php/.test(window.location) && testcarac()) // page des espions
		{	var binput = $t("input");
			binput[binput.length-1].style.visibility = "hidden";
			var bdiv = $t("div");
			for (i=0;i<bdiv.length;i++)
			{	if (bdiv[i].style.width == "570px")
				{	if (bdiv[i].innerHTML.indexOf("Votre espion a r") != -1) // on a réussi un vol !
					{	var prix_vol = bdiv[i].innerHTML.substring(bdiv[i].innerHTML.indexOf("Ce dernier a ") + 70);
						prix_vol = prix_vol.substring(0, prix_vol.indexOf(" Zo"));
						var tab_vols = unserialize(GM_getValue("string_vols_" + id_zoo, "")), der_vol = -1, j;
						for (j in tab_vols) if (j > der_vol && j < 10) der_vol = j;
						der_vol++;
						tab_vols[der_vol] = bdiv[i].innerHTML.substring(bdiv[i].innerHTML.indexOf("Votre espion a r") + 67, 
							bdiv[i].innerHTML.indexOf("Ce dernier a ")).replace(/<br>|<br \/>/g, "") + " pour " + millier(prix_vol) + " Zoo'z";
						GM_setValue("string_vols_" + id_zoo, serialize(tab_vols));
						GM_setValue("vol", true);
					}
					break;
				}
			}
			if (GM_getValue("messages_releves_"+id_zoo, "") == "") // scan initial
			{	var restant = binput[binput.length-1].parentNode.innerHTML;
				restant = parseInt(restant.substring(restant.indexOf("il vous") + 22, restant.indexOf(" espion")));
				if (restant > 0) binput[binput.length-1].dispatchEvent(clickmouse);
				else if (GM_getValue("misencours_" + id_zoo, "") != "") pagesuivante(urlSite + "missions.php");
				else pagesuivante(urlSite + "toutou.php");
			}
			else
			{	titrefen("Espions");
				$c("title_site")[0].innerHTML = "Espions";
			}
		}
		else if (/vip.php/.test(window.location) && testcarac()) // page des bonus vip
			titrefen("Bonus VIP");
		else if (/bureau3/.test(window.location) && testcarac()) // pages des banques
			titrefen("Banque");
		else if (/moncompte.php/.test(window.location) && testcarac()) // page de la gestion de son compte
			titrefen("Mon compte");
		else if (/cbd.php/.test(window.location) && testcarac()) // page du tutoriel
			titrefen("Tutoriel");
		else if (/regle.php/.test(window.location) && testcarac()) // page des règles
			titrefen("Règles du jeu");
		else if (/potion.php/.test(window.location) && testcarac()) // page de la potion
			titrefen("Potion");

		if (GM_getValue("messagesauvegarde", false) && GM_getValue("messages_releves_"+id_zoo, "") != "" && !GM_getValue("cache"+window.name, false))
		{	var bdiv3 = document.createElement("div");
			bdiv3.id = "conseil";
			bdiv3.className = "info_bulle";
			bdiv3.innerHTML = "<div style=\"width:500px;text-align:center;font-size:14px;font-weight:bold;color:#B86242\">Vous venez de terminer le scan initial" +
				"</div><br><div style=\"text-align:center;height:100px\">Beaucoup de données ont été calculées et mises à jour.<br>Il est conseillé de fermer " +
				"Firefox maintenant (sans forcément vous déconnecter)<br>afin d'enregistrer ces données sur votre ordinateur.<br>Vous pourrez " +
				"ensuite réouvrir immédiatement votre navigateur préféré pour poursuivre normalement.<br><br><a style=\"cursor:pointer;\" " +
				"id=\"fenconseil\">Fermer</a></div>";
			document.body.appendChild(bdiv3);
		}
		if (GM_getValue("affnews", false) && GM_getValue("messages_releves_"+id_zoo, "") != "" && !/news.php/.test(window.location) && !GM_getValue("cache"+window.name, false))
		{	var bnews = document.createElement("div");
			bnews.id = "news";
			bnews.className = "info_bulle";
			bnews.innerHTML = "<div style=\"text-align:center;margin-top:4px;font-size:14px;font-weight:bold;color:#B86242\">Une news vient d'être publiée</div>" +
				"<br><div style=\"text-align:center;margin-top:8px;margin-bottom:4px;font-size:13px\"><a style=\"cursor:pointer;\" onClick=\"window.location.replace(" +
				"'news.php')\">Cliquez ici</a> pour y accéder<br><br><a style=\"cursor:pointer;\" id=\"fennews\">Fermer</a> (si vous ne voulez pas la voir)</div>";
			document.body.appendChild(bnews);
		}
		if (GM_getValue("oeuf", "") != "" && GM_getValue("messages_releves_"+id_zoo, "") != "" && !GM_getValue("cache"+window.name, false))
		{	var boeuf = document.createElement("div");
			boeuf.id = "oeuf";
			boeuf.className = "info_bulle";
			boeuf.innerHTML = "<div style=\"text-align:center;margin-top:4px;font-size:14px;font-weight:bold;color:#B86242\">Vous venez de trouver un oeuf mystérieux</div>" +
				"<br><div style=\"text-align:center;margin-top:8px;margin-bottom:4px;font-size:13px\">Il s'agit d'un <strong>" + GM_getValue("oeuf") + "</strong>." +
				"<br><br><a style=\"cursor:pointer;\" id=\"fenoeuf\">Fermer</a></div>";
			document.body.appendChild(boeuf);
		}
		if (GM_getValue("periodique", "") != "" && GM_getValue("messages_releves_"+id_zoo, "") != "" && !GM_getValue("cache"+window.name, false))
		{	var bpaul = document.createElement("div");
			bpaul.id = "paul";
			bpaul.className = "info_bulle";
			var periodique = unserialize(GM_getValue("periodique"));
			if (periodique[0] != "aucun")
			{	var nbper = periodique.length, inper = "";
				while (periodique.length > 0)
					inper += "<div style=\"text-align:center;margin-top:4px;font-size:18px;font-weight:bold;color:#29b86c\">" + periodique.shift() + "</div>";
				bpaul.innerHTML = inper + "<br><div style=\"text-align:center;margin-top:8px;margin-bottom:4px;font-size:13px\">" +
					(nbper == 1 ? "Cette espèce est actuellement disponible" : "Ces " + nbper + " espèces sont actuellement disponibles") + " à l'achat.<br>" +
					"Profitez-en bien !<br><br><a style=\"cursor:pointer;\" id=\"fenpaul\">Fermer</a></div>";
			}
			else
				bpaul.innerHTML = "<div style=\"text-align:center;margin-top:4px;font-size:18px;font-weight:bold;color:#29b86c\">Animaux périodiques</div>" +
					"<br><div style=\"text-align:center;margin-top:8px;margin-bottom:4px;font-size:13px\">Il n'y a actuellement aucun animal périodique disponible à l'achat.<br><br><a style=\"cursor:pointer;\" id=\"fenpaul\">Fermer</a></div>";
			document.body.appendChild(bpaul);
		}
		if (GM_getValue("vol", "") != "" && GM_getValue("messages_releves_"+id_zoo, "") != "" && !GM_getValue("cache"+window.name, false))
		{	var tab_vols = unserialize(GM_getValue("string_vols_"+id_zoo, "")), nb_vols = tab_vols.length;
			var txt = nb_vols > 1 ? "Des espions ont réussi à voler des animaux :" : "Un de vos espions a réussi à voler un animal :";
			txt += "</div><br><div style=\"text-align:center;margin-top:8px;margin-bottom:4px;font-size:13px\">";
			for (i=0;i<nb_vols;i++)
			{	if (i > 0) txt += "<br>";
				txt += "- ";
				txt += "de l'espèce " + tab_vols[i];
			}
			if (nb_vols == 1) txt = txt.replace(" pour ", "<br>- pour un montant de ", "g");
			var bvol = document.createElement("div");
			bvol.id = "vol";
			bvol.className = "info_bulle";
			bvol.innerHTML = "<div style=\"text-align:center;margin-top:4px;font-size:14px;font-weight:bold;color:#4bb86c\">" + txt + ".<br><br><div style=\"text-align:" +
				"center;margin-top:0px;font-size:14px;font-weight:bold;color:#4bb86c\">Félicitations !</div><br><a style=\"cursor:pointer;\" id=\"fenvol\">Fermer</a></div>";
			document.body.appendChild(bvol);
		}
		if (GM_getValue("attraction_"+id_zoo, "") != "" && GM_getValue("messages_releves_"+id_zoo, "") != "" && GM_getValue("attracttemp", "t0") == "t0" && !GM_getValue("cache"+window.name, false))
			tabattraction();

		if (GM_getValue("ancmourants", "") != "" && GM_getValue("messages_releves_"+id_zoo, "") != "" && !GM_getValue("cache"+window.name, false))
		{	var bmour = document.createElement("div");
			bmour.id = "idmourant";
			bmour.className = "info_bulle";
			bmour.innerHTML = "<div style=\"text-align:center;margin-top:4px;font-size:14px;font-weight:bold;color:#B86242\">Conformément à votre demande " +
				"(cf. vos options),<br>tous vos <u>mourants</u> ont été vendus.</div><div style=\"text-align:center;margin-top:8px;margin-bottom:4px;font-size:13px\">" +
				listes("ventes", "mourants") + "<br><a style=\"cursor:pointer;\" id=\"fenmour\">Fermer</a></div>";
			document.body.appendChild(bmour);
		}
		if (GM_getValue("anctrop", "") != "" && GM_getValue("messages_releves_"+id_zoo, "") != "" && !GM_getValue("cache"+window.name, false))
		{	var btrop = document.createElement("div");
			btrop.id = "idtrop";
			btrop.className = "info_bulle";
			btrop.innerHTML = "<div style=\"text-align:center;margin-top:4px;font-size:14px;font-weight:bold;color:#B86242\">Conformément à votre demande " +
				"(cf. vos options),<br>tous vos <u>adultes en trop</u> ont été vendus.</div><div style=\"text-align:center;margin-top:8px;margin-bottom:4px;font-size:13px\">" +
				listes("ventes", "trop") + "<br><a style=\"cursor:pointer;\" id=\"fentrop\">Fermer</a></div>";
			document.body.appendChild(btrop);
		}
		if (GM_getValue("tornade", false) && GM_getValue("messages_releves_"+id_zoo, "") != "" && !GM_getValue("cache"+window.name, false))
		{	var btorn = document.createElement("div");
			btorn.id = "tornade";
			btorn.className = "info_bulle";
			btorn.innerHTML = "<div style=\"text-align:center;font-size:14px;font-weight:bold;color:#B86242\">Alerte !!! Tornade !!!</div>" +
				"<br><div style=\"text-align:center\">Les animaux font grise mine et les visiteurs fuient...<br>Le syndicat des zoos ravagés par une " +
				"tornade vous offre<br>une prime de catastrophe climatique de 10.000 Zoo'z.<br><br><a style=\"cursor:pointer;\" " +
				"id=\"fentorn\">Fermer</a></div>";
			document.body.appendChild(btorn);
		}
		if (GM_getValue("nonluxe", "") != "" && GM_getValue("messages_releves_"+id_zoo, "") != "" && !GM_getValue("cache"+window.name, false))
		{	var bnluxe = document.createElement("div");
			bnluxe.id = "nonluxe";
			bnluxe.className = "info_bulle";
			var nluxe = unserialize(GM_getValue("nonluxe"));
			var txtencl = "", t1, v1, cpt1 = 0;
			for (i in nluxe)
			{	cpt1++;
				t1 = Math.floor(parseInt(i)/100);
				v1 = parseInt(i) - t1*100;
				txtencl += "<a href=\"" + urlSite + "enclosgestion1.php?t=" + t1 + "&v=" + v1 + "\" >" +
					nom_enclos(t1, v1).replace(" ", "&nbsp;", "g") + "</a>, ";
			}
			txtencl = txtencl.substring(0, txtencl.length - 2);
			if (cpt1 > 1) txtencl = "Les " + cpt1 + " enclos suivants ne sont pas construits à leur niveau maximal :<br><br>" + txtencl;
			else txtencl = "L'enclos suivant n'est pas construit à son niveau maximal :<br><br>" + txtencl;
			bnluxe.innerHTML = "<div style=\"text-align:center;font-size:14px;font-weight:bold;color:#B86242\">Enclos de luxe</div>" +
				"<br><div style=\"text-align:center\">" + txtencl + "<br><br><a style=\"cursor:pointer;\" " +
				"id=\"fenluxe\">Fermer</a></div>";
			document.body.appendChild(bnluxe);
		}
		if (GM_getValue("affdefi", false) && GM_getValue("messages_releves_"+id_zoo, "") != "" && !GM_getValue("cache"+window.name, false))
		{	var bdefi = document.createElement("div");
			bdefi.id = "iddefi";
			bdefi.className = "info_bulle";
			var messdef = affichedefis("fen");
			bdefi.innerHTML = "<div style=\"text-align:center;font-size:14px;font-weight:bold;color:#B86242\">Etat d'avancement de vos défis</div>" +
				"<br><div style=\"text-align:center\">" + messdef +
				"<br><br><a style=\"cursor:pointer;\" id=\"fendefi\">Fermer</a></div>";
			document.body.appendChild(bdefi);
		}
		if (GM_getValue("affnewdefi", false) && GM_getValue("messages_releves_"+id_zoo, "") != "" && !GM_getValue("cache"+window.name, false))
		{	var bndefi = document.createElement("div");
			bndefi.id = "ndefi";
			bndefi.className = "info_bulle";
			var defi2 = GM_getValue("defi");
			var defi1 = defi2.substring(0,defi2.indexOf("/"));
			defi2 = defi2.substring(defi2.indexOf("/")+1);
			bndefi.innerHTML = "<div style=\"text-align:center;font-size:14px;font-weight:bold;color:#B86242\">Il y a 2 nouveaux défis !</div>" +
				"<br><div style=\"text-align:center\">Obtenir " + defi1 + 
				"<br>Obtenir " + defi2 +
				"<br><br><a style=\"cursor:pointer;\" id=\"fenndefi\">Fermer</a></div>";
			document.body.appendChild(bndefi);
		}
		if (GM_getValue("retourmess", false) && !(/event.php/.test(window.location)) && GM_getValue("messages_releves_"+id_zoo, "") != "" && !GM_getValue("cache"+window.name, false))
		{	var bmess = document.createElement("div");
			bmess.id = "retmess";
			bmess.className = "info_bulle";
			bmess.innerHTML = "<div style=\"text-align:center;margin:20px 20px 10px\">Pour revenir à la page des messages, <a style=\"cursor:pointer;\" id=\"retournepagemess\">cliquez ici</a>." +
				"<br><br><a style=\"cursor:pointer;\" id=\"fenretmess\">Fermer</a> (si vous ne voulez pas y aller)</div>";
			document.body.appendChild(bmess);
		}
		affmasqfenetre();

		if (!GM_getValue("cache"+window.name, false))
		{	lien_enclosf(); MAJpostab(); }
	}
}
else if(/forum/.test(window.location)) // on est sur le forum
{	if ($("toolbar"))
	{	var bspan, supsp;
		// on supprime les span en fin de toolbar
		while ($("toolbar").lastChild.nodeName == "span" || $("toolbar").lastChild.nodeName == "SPAN")
		{	bspan = $("toolbar").lastChild;
			supsp = $("toolbar").removeChild(bspan);
		}
		bspan = document.createElement("span");
		bspan.style.padding = "0px 2px 0px 0px";
		$("toolbar").appendChild(bspan);

		var trombone = document.createElement("img");
		trombone.src = "http://img16.imageshack.us/img16/4205/trombones004.gif";
		trombone.title = "Cliquez ici, puis sur le nom du zoo désiré pour insérer le rapport";
		trombone.alt = "Rapport";
		trombone.addEventListener("click", montre_zoos, true);
		$("toolbar").appendChild(trombone);

		var bdiv = document.createElement("div");
		bdiv.id = "liste_zoo";
		bdiv.style.padding = "5px";
		bdiv.style.display = "none";
		var ba, choix, nbMAJfo = GM_getValue("nbMAJfo", 1), dateCo, i2m, majo, j, nbparc = 0;

		for (i=0;i<tab_zoo.length;i++)
		{	dateCo = GM_getValue("dateConnexion_"+i, "");
			dateCo = dateCo.indexOf("b") != -1 ? dateCo.substring(0, dateCo.indexOf("b")) : dateCo;
			if (dateCo == aujourd_hui)
			{	bspan = document.createElement("span");
				bspan.setAttribute("class","rapport_forum");
				ba = document.createElement("a");
				ba.innerHTML = tab_zoo[i][0];
				ba.id = tab_zoo[i][0];
				ba.addEventListener("click", insere_liste, true);
				bspan.appendChild(ba);
				bdiv.appendChild(bspan);
				if (GM_getValue("string_naissances_o_" + i, "") != "")
				{	majo = GM_getValue("string_naissances_o_" + i);
					i2m = 1;
					while (majo.indexOf("#") != -1)
					{	i2m++;
						majo = majo.substring(majo.indexOf("#")+1);
					}
					for (j=1;j<=i2m;j++)
					{	choix = document.createElement("input");
						choix.type = "radio";
						choix.name = "nbMAJfo_" + i;
						choix.id = "nbMAJfo_" + i + "_" + j;
						choix.value = j;
						choix.setAttribute("style", "cursor:pointer");
						if (j == nbMAJfo) choix.checked = true;
						if (j == i2m && nbMAJfo > i2m) choix.checked = true;
						bdiv.appendChild(choix);
						bspan = document.createElement("span");
						bspan.setAttribute("style", "cursor:pointer;font-weight:bold;font-size:10px;padding-left:3px;vertical-align:top");
						if (j == i2m) bspan.id = "span" + i + "_" + i2m;
						nom = j == 1 ? document.createTextNode("Afficher uniquement la dernière MAJ") : j == i2m ? document.createTextNode("Afficher toutes " +
							"les MAJ de la journée") : document.createTextNode("Afficher les " + j + " dernières MAJ");
						bspan.appendChild(nom);
						bdiv.appendChild(bspan);
						bspan = document.createElement("span");
						bspan.setAttribute("style", "padding-right:15px");
						bdiv.appendChild(bspan);
					}
				}
				ajoute_br(bdiv);
				bspan = document.createElement("hr");
				bspan.setAttribute("style", "margin-top:-1px;margin-bottom:-1px;display:none");
				bspan.setAttribute("class","separ");
				bdiv.appendChild(bspan);
				nbparc++;
			}
		}
		$("req_message").parentNode.id = "ici";
		$("ici").parentNode.insertBefore(bdiv, $("ici"));
		$("ici").parentNode.style.width="100%";
		if (nbparc > 1) { var separ = $c("separ"); for (j=0;j<separ.length-1;j++) separ[j].style.display = ""; }
	}
	hautbasforum();
}
else if ((/index.php/.test(window.location) || window.location == "http://www.monzoo.net/" || window.location == "www.monzoo.net")) // on est déconnecté
{	oldwindow = GM_getValue("windowname", ":0");
	var lastwindow = parseInt(oldwindow.substring(oldwindow.lastIndexOf(":")+1));
	for (i=0;i<=lastwindow;i++) GM_deleteValue("cache"+i);
	GM_deleteValue("windowname");
	GM_deleteValue("pgteam");
	GM_deleteValue("message");
	GM_deleteValue("invasion");
	decalH1();
}