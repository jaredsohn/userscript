// ==UserScript==
// @name           SW_lightGame
// @namespace      none
// @include        http://spaceswars.fr/univers*
// @include        http://www.spaceswars.fr/univers*
// @include        http://spaceswars.com/univers*
// @include        http://www.spaceswars.com/univers*
// ==/UserScript==
//
//
// Script created by NiArK, SpacesWars.com
//
//
//
// DATE : 08/09/2011
var nom_script = "SW_lightGame";
var lien_script = "http://userscripts.org/scripts/source/110427.user.js";
var date = "08/09/2011";
date = date.split("/");
if (GM_getValue("maj_"+nom_script) == undefined) GM_setValue("maj_"+nom_script, 0);
var regUni = /univers([1-9])/;
var uni = regUni.exec(window.location.href)[1];
var regOverview = /overview/;
//
//
//
//
/////////////////////////////////////////////////////////////////////
///////////////////////// CHECK NEW VERSION /////////////////////////
/////////////////////////////////////////////////////////////////////
if (GM_getValue("maj_"+nom_script) == 1 && !document.getElementById("maj_"+nom_script) && regOverview.test(window.location.href) && !document.getElementById("scripts"))
{
	var p = document.createElement("p");
	p.id = "maj_"+nom_script;
	p.innerHTML = "Une nouvelle version de "+nom_script+" est disponible. Téléchargement : <a target='_blank' href='"+lien_script+"'>ICI</a>";
	document.getElementById("default_main").appendChild(p);
}
else if (GM_getValue("maj_"+nom_script) == 1 && document.getElementById("maj_"+nom_script))
	document.getElementById("maj_"+nom_script).style.display = "block";
else if (GM_getValue("maj_"+nom_script) == 0 && document.getElementById("maj_"+nom_script))
	document.getElementById("maj_"+nom_script).style.display = "none";



var today = "";
var dtoday = new Date();
today += (dtoday.getDate()) + "/" + (dtoday.getMonth()+1) + "/" + dtoday.getFullYear();

var last_maj = new Date();
if (GM_getValue("last_maj") == undefined) GM_setValue("last_maj", last_maj.getDate() + "/" + (last_maj.getMonth()+1) + "/" + last_maj.getFullYear	());
last_maj = GM_getValue("last_maj");

today = today.split("/");
last_maj = last_maj.split("/");




if ((today[0]-last_maj[0] >= 1 && today[1]-last_maj[1] == 0 && today[2]-last_maj[2] == 0)|| (today[1]-last_maj[1] >= 1 && today[2]-last_maj[2] == 0	) || today[2]-last_maj[2] >= 1)
{
	var Stext = "";
	
		GM_xmlhttpRequest({ url: lien_script, method: "GET",
		onload: function(response) {
		
		Stext += response.responseText;
		var regdate = /DATE\s:\s([0-9]?[0-9]\/[0-9]?[0-9]\/[0-9]{4})/;
		
		if (regdate.test(Stext)) {
			var Sversion = regdate.exec(Stext);
			Sversion = Sversion[1].split("/");
		
			if ((Sversion[0]-date[0] >= 1 && Sversion[1]-date[1] == 0 && Sversion[2]-date[2] == 0)|| (Sversion[1]-date[1] >= 1 && Sversion[2]-date[	2] 	== 0) || Sversion[2]-date[2] >= 1)
				GM_setValue("maj_"+nom_script, 1);
			else { GM_setValue("maj_"+nom_script, 0); GM_setValue("last_maj", today[0]+"/"+today[1]+"/"+today[2]); }
		}
	
		}});


}
if (document.getElementById("scripts"))
{
	var tr = document.createElement("tr");
	tr.style.height = "30px";
	var html = "<td style='color:lime; border:1px solid white; width:12%;'>SW_lightGame</td>";
	html += "<td style='border:1px solid white; width:38%;'>Enlève toutes les images pour une meilleure navigation</td>";
	html += "<td style='border:1px solid white; width:20%;'>";
	if (GM_getValue("maj_"+nom_script) == 1 && !document.getElementById("maj_"+nom_script))
		html += "Oui ! <a href='"+lien_script+"'>cliquez ici</a></td>";
	else html += "Non</td>";
	html += "<td style='border:1px solid white; width:30%;'>/</td>";
	tr.innerHTML = html;
	document.getElementById("scripts_tab").appendChild(tr);
}
/////////////////////////////////////////////////////////////////////
///////////////////////// END CHECKING //////////////////////////////
/////////////////////////////////////////////////////////////////////


var regImg = /background:\s?url\(.*\)/;
var alltags = document.evaluate("//div[@style]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i=0; i<alltags.snapshotLength; i++)
{
	element = alltags.snapshotItem(i);
	if (regImg.test(element.getAttribute('style')))
		element.parentNode.parentNode.removeChild(element.parentNode);
}