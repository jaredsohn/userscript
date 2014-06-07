// ==UserScript==
// @name           AlloTorrents
// @namespace      wujowan
// @description   ajoute un lien sur allocine pour télécharger les films depuis un site torrent
// @include        http://*/film/fichefilm_gen_cfilm=*.html
// @include       http://*/series/ficheserie_gen_cserie=*.html

// ==/UserScript==
var listeSiteTorrent = new Array();
var listeSiteSousTitres = new Array();
listeSiteTorrent["Mininova"] = "http://www.mininova.org/search/?search=";
listeSiteTorrent["IsoHunt"] = "http://isohunt.com/torrents/?ihq=";
listeSiteTorrent["ThePirateBay"] = "http://thepiratebay.org/s/?page=0&orderby=7&video=on&searchTitle=on&q=";
listeSiteSousTitres["Subbiee"] = "http://www.subbiee.com/?title=";
listeSiteSousTitres["OpenSub"] = "http://www.opensubtitles.com/search?MovieName=";
listeSiteSousTitres["SubScene"]="http://subscene.com/filmsearch.aspx?q="


//cherche le titre du film et formate la chaine de caractère
var titre = document.getElementsByTagName("title")[0].innerHTML;
titre = titre.replace(/[àâä]/gi,"a") ;
titre = titre.replace(/[éè]/gi,"e") ;

//cherche l'emplacement ou les div vont être inséré (ici en dessous du div contenant les tags)
var exp = /.*(Distributor:|Distribué par|Réalisé par|Série créée par|Directed by).*/gi;
var arrayElement = document.getElementsByTagName("h4");
var listNode;
var element = document.createElement("div");
for (i = 0; i < arrayElement.length; i++)
{
	if(arrayElement[i].innerHTML.search(exp) != -1)
	{
		listNode = arrayElement[i].parentNode.parentNode;
		break;
	}
}
// insere un lien pour télécharger le film avec son titre allocine
htmlContent = "<table BORDER=\"1\" CELLPADDING=2>"
	+"<tr><th><h4 style=\"color:green\">Torrent("+titre+"): </h4></th>";
	for (site in listeSiteTorrent) 
		htmlContent += "<td><h4><a target=\"_blank\" href=\""+listeSiteTorrent[site]+titre+"\">"+site+"</a></h4> </td>";
	htmlContent += "</tr>"
	+"<tr><th><h4 style=\"color:green\">Sous-titres/Subtitles: </h4></th>";
	for (site in listeSiteSousTitres) 
		htmlContent += "<td><h4><a target=\"_blank\" href=\""+listeSiteSousTitres[site]+titre+"\">"+site+"</a></h4> </td>";
	htmlContent += "</tr>";
//cherche le titre original du film
exp = /.*(Titre Original|Original title).*<i>(.*)<\/i>/gi;
arrayElement = document.getElementsByTagName("h4");

for (i = 0; i < arrayElement.length; i++)
{
	//si le titre original est different du titre francais alors creation du lien pour télécharger le film avec ce lien
	if(arrayElement[i].innerHTML.search(exp) != -1)
	{
		titre = RegExp.$2;	
		element = document.createElement("div");

		htmlContent += ""
			+"<tr><th><h4 style=\"color:purple\">Torrent("+titre+"): </h4></th>";
			for (site in listeSiteTorrent) 
				htmlContent += "<td><h4><a target=\"_blank\" href=\""+listeSiteTorrent[site]+titre+"\">"+site+"</a></h4> </td>";
			htmlContent += "</tr>"
			+"<tr><th><h4 style=\"color:purple\">Sous-titres/Subtitles: </h4></th>";
			for (site in listeSiteSousTitres) 
				htmlContent += "<td><h4><a target=\"_blank\" href=\""+listeSiteSousTitres[site]+titre+"\">"+site+"</a></h4> </td>";
			htmlContent += "</tr>";
		break;
	}
}
htmlContent += "</table>";
htmlContent += "<table>";
htmlContent += "<tr><td><h4><a href=\"http://fr.wikipedia.org/wiki/Bittorrent\" target=\"_blank\">Torrent?</a></h4></td>";
htmlContent += "  =>  <td><h4><a href=\"http://www.commentcamarche.net/telecharger/telechargement-196-utorrent\" target=\"_blank\">Software</a></h4></td></tr>"
htmlContent += "</table>";
element.innerHTML=htmlContent; 
listNode.appendChild(element);
