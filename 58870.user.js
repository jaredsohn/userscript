// ==UserScript==
// @name           SudocRSS
// @namespace      http://bibliotheques.wordpress.com/
// @description    Ajoute un lien RSS pour des recherches dans le Sudoc
// @include        http://www.sudoc.abes.fr/*
// @include        http://corail.sudoc.abes.fr/*
// ==/UserScript==

var keywords;
keywords = document.evaluate(
		"/html/body/div[@class=\"lrmargin\"]/div/div[@class=\"tb15\"]/span/table/tbody/tr/td[@class=\"result_trm\"]",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);

// On quitte si la ligne "rechercher (et)	(Tous les mots)" n'est pas présente
if (!keywords.snapshotLength) { return; }

// On récupère la balise qui contient la requête : <queryvar ... ">mot clé</queryvar>
var a = keywords.snapshotItem(0);

// On supprime la balise queryVar qui correspond à du XML sudoc dont on n'a pas besoin
var req = a.innerHTML;
reg=new RegExp("<.[^<>]*>", "gi" );
req = req.replace(reg, "");

// On ajoute le bouton RSS à la fin de la ligne TR qui correspond à la ligne où est affichée la requête
var RSSbutton = document.createElement("td");
RSSbutton.innerHTML = "&nbsp;|&nbsp;<a title='Fil RSS pour cette recherche' href='http://pipes.yahoo.com/pipes/pipe.run?_render=rss&_id=hEjNWoX23RGKPI2V_g6H4A&search=" + req + "'><img  style='border:0px' src='http://www.sylvainmachefert.com/images/rss.gif' alt='RSS'/></a>";
a.parentNode.appendChild(RSSbutton);
