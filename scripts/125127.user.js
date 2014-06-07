// ==UserScript==
// @name           GT+
// @namespace      Protectator
// @description    Ajoute des raccourcis dans la barre du bas ainsi qu'un lien Tools4TW a coté des liens
// @include        *.guerretribale.fr/*
// ==/UserScript==

// Entrez ici votre id de joueur 

var id_joueur = "962075";

// (Regardez le lien de votre page de profil, il s'agit du chiffre après "&id=" )

//
//
//
//
// NE PLUS RIEN TOUCHER
//
//
//
//

// css
var css = document.createElement("style");
css.type = "text/css";
var css_append = "a.info {position: relative;text-decoration: none;z-index: 8999;}a.info:hover {background-color: #FFFF00;z-index: 9000;}a.info span {z-index: 99000; display: none;}a.info:hover span {background-color: #D2C09E; z-index: 99000; border: 2px solid #603000;color: #603000;display: block;left: 0em;padding: 0px;position: absolute;text-align: justify;top: 2em;}";
css_append += ".main {overflow: visible;}";
css.innerHTML = css_append;
document.body.appendChild(css);

// fonction insertAfter
function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

// barre raccourcis
var adresse = document.location.href;
var serv = adresse.substring(0, 11);

var numero = serv.substring(9, 11);

var tools4tw = "http://fr.tools4tribalwars.com/tribalwars-detail_joueur.village-";
var num_village = adresse.substr(46, adresse.indexOf("&", 0)-46);
tools4tw += num_village;
tools4tw += ".html";

var html = " &nbsp;-&nbsp; <a href=\"";
html += serv;
html += ".guerretribale.fr/game.php?screen=place&mode=sim\"><img src=\"http://s11.postimage.org/xqctib36n/simu.png\">Simulateur</a> &nbsp;-&nbsp; <a target=\"_blank\" href=\"";
html += tools4tw;
html += "\"><img src=\"http://s15.postimage.org/vsa24pxrb/icont4tneutre.gif\">Tools4TribalWars</a> &nbsp;-&nbsp; <a href=\"";
html += serv;
html += ".guerretribale.fr/game.php?screen=forum\"><img src=\"http://s14.postimage.org/9ij9vow0t/forum.png\">Forum tribu</a>  &nbsp;-&nbsp; <a target=\"_blank\" href=\"http://diidyn.epfl.ch/Restauration/IntExt/Rest/offresjours.php\"><img src=\"http://s16.postimage.org/4e0fx1cmp/viande.png\">Bouffe</a>";

document.getElementById('footer_left').innerHTML += html;

// definitions, recup elements
var links = document.getElementsByTagName('a');
var len = links.length;

var patt = /screen=info_player/;
var patttr = /screen=info_ally/;
var pattvi = /screen=info_village/;
var pattov = /screen=overview/;

var pattcoord = /((\d+)|(\d+))/;

var test200 = /&screen=overview_villages/;

var pattno1 = /screen=overview_/;
var pattno2 = /screen=overview&/;

var pattid = /screen=info_player&id=(\d+)/;
var patttrid = /screen=info_ally&id=(\d+)/;
var pattviid = /screen=info_village&id=(\d+)/;
var pattovid = /village=(\d+)&screen=overview/;

// map sur Page profil
if (patt.test(adresse)){
	var tablecarte = document.createElement("table");
	var codehtml = "<thead><tr><th>Carte villages</th></tr></thead><tbody><tr><td width=\"322\" height=\"365\" style = \" background: url('";
	var titre = document.getElementsByTagName('title')[0].innerHTML;
	var limite = titre.indexOf("|", 0);
	var x = titre.substr(limite-3, 3);
	var y = titre.substr(limite+1, 3);
	var image = "http://fr.tools4tribalwars.com/images_png/graph_map2_fr_13_322_";
	image += x;
	image += "_";
	image += y;
	image += "_4_0_1_1_1__TR1-32_TC1-5_JO7-";
	image += id_joueur;
	image += "_JC7-210_JO1-";
	image += pattid.exec(adresse)[1];
	image += "_JC1-60";
	image += ".png";
	
	codehtml += image;
	codehtml += "') no-repeat; width:322px; height:365px;\"></td></tr></tbody>";
	tablecarte.innerHTML = codehtml;
	insertAfter(document.getElementById("villages_list"), tablecarte);
	insertAfter(document.getElementById("villages_list"), document.createElement("br"));
}

//bulles info
for (i = 0; i < len*2; i++) {
	var link = links.item(i).getAttribute('href');
	
	if (patt.test(link)) {
		var link_tools = pattid.exec(link);
		link_ok = link_tools[1];
		var link_final = "http://fr.tools4tribalwars.com/tribalwars-detail_joueur.monde-";
		link_final += numero;
		link_final += ".joueur-";
		link_final += link_ok;
		link_final += ".html";
		var el = document.createElement("a");
		var image = "http://fr.twstats.com/fr";
		image += numero;
		image += "/image.php?type=playergraph&graph=points&id=";
		image += link_ok;
		el.href = link_final;
		el.target = "_blank";
		el.className = "info";
		var htmlImage = "&nbsp;<img src=\"http://s13.postimage.org/judbe99ub/icont4t.gif\"><span><img src=\"";
		htmlImage += image;
		htmlImage += "\"></span>";
		el.innerHTML = htmlImage;
		insertAfter(links.item(i), el);
	}
	
	if (patttr.test(link)) {
		var link_tools = patttrid.exec(link);
		link_ok = link_tools[1];
		var link_final = "http://fr.tools4tribalwars.com/tribalwars-detail_tribu.tribu-";
		link_final += link_ok;
		link_final += ".monde-";
		link_final += numero;
		link_final += ".html";
		var el = document.createElement("a");
		var image = "http://fr.twstats.com/fr";
		image += numero;
		image += "/image.php?type=tribegraph&graph=points&id=";
		image += link_ok;
		el.href = link_final;
		el.target = "_blank";
		el.className = "info";
		var htmlImage = "&nbsp;<img src=\"http://s17.postimage.org/co9ulriuz/icont4tri.gif\"><span><img src=\"";
		htmlImage += image;
		htmlImage += "\"></span>";
		el.innerHTML = htmlImage;
		insertAfter(links.item(i), el);
	}
	
	linkimg = "http://fr.tools4tribalwars.com/images_png/graph_map2_fr_13_250_563_527_5_0_1_1_0__TR1-32_TC1-5_JO7-962075_JC7-210.png";
	
	if (pattvi.test(link)) {
		var link_tools = pattviid.exec(link);
		link_ok = link_tools[1]; 
		var link_final = "http://fr.tools4tribalwars.com/tribalwars-detail_village.village-";
		link_final += link_ok;
		link_final += ".monde-";
		link_final += numero;
		link_final += ".html";
		var el = document.createElement("a");
		
		var contenu = links.item(i).innerHTML;
		limite = contenu.indexOf("|", 0);
		var x = contenu.substr(limite-3, 3);
		var y = contenu.substr(limite+1, 3);
		
		if (limite<1) {
			contenu = links.item(i).parentNode.parentNode.innerHTML;
			limite = contenu.indexOf("|", 0);
			x = contenu.substr(limite-3, 3);
			y = contenu.substr(limite+1, 3);
		}
		
		var image = "http://fr.tools4tribalwars.com/images_png/graph_map2_fr_13_200_";
		image += x;
		image += "_";
		image += y
		image += "_5_0_1_1_0__TR1-32_TC1-5_JO7-";
		image += id_joueur;
		image += "_JC7-210.png";
		
		el.href = link_final;
		el.target = "_blank";
		el.className = "info";
		var htmlImage = "&nbsp;<img src=\"http://s18.postimage.org/afynmcvut/icont4vi.gif\"><span style=\"background: url('";
		htmlImage += image;
		htmlImage += "') no-repeat; width:200px; height:200px;\"><img src=\"http://i.imgur.com/R5ogl.png\"></span>";
		el.innerHTML = htmlImage;
		insertAfter(links.item(i), el);
	}
	
	if (pattov.test(link)) {
		if (!(pattno1.test(link) || pattno2.test(link))){
			var link_tools = pattovid.exec(link);
			link_ok = link_tools[1]; 
			var link_final = "http://fr.tools4tribalwars.com/tribalwars-detail_village.village-";
			link_final += link_ok;
			link_final += ".monde-";
			link_final += numero;
			link_final += ".html";
			var el = document.createElement("a");
			
			var contenu = links.item(i).parentNode.parentNode.innerHTML;
			var limite = contenu.indexOf("|", 0);
			var x = contenu.substr(limite-3, 3);
			var y = contenu.substr(limite+1, 3);
			
			var image = "http://fr.tools4tribalwars.com/images_png/graph_map2_fr_13_200_";
			image += x;
			image += "_";
			image += y
			image += "_5_0_1_1_0__TR1-32_TC1-5_JO7-";
			image += id_joueur;
			image += "_JC7-210.png";
			
			el.href = link_final;
			el.target = "_blank";
			el.className = "info";
			var htmlImage = "&nbsp;<img src=\"http://s18.postimage.org/afynmcvut/icont4vi.gif\"><span style=\"background: url('";
			htmlImage += image;
			htmlImage += "') no-repeat; width:200px; height:200px;\"><img src=\"http://i.imgur.com/R5ogl.png\"></span>";
			el.innerHTML = htmlImage;
			insertAfter(links.item(i), el);
		}
	}
	
}