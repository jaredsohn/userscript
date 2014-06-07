// ==UserScript==
// @name           The Settlers Online Francais (Originaly "Die Siedler Online English Language")
// @namespace      
// @description    Change la langue de The Settlers Online en Francais. Script original : http://userscripts.org/scripts/source/93510.user.js modifié afin de changer la langue en francais.
// @include        http://www.diesiedleronline.de/de/spielen
// @identifier     
// @version        1.0
// ==/UserScript==

var embed = document.getElementById("SWMMO");
var vars = [];
var getsetSupport = false; //Chrome does not support GM_* commands, sad =\
if (typeof GM_getValue=='function')
{
	GM_setValue("test",true);
	getsetSupport=GM_getValue("test");
}
for (var i=0;i<embed.attributes.length;i++)
	vars[embed.attributes[i].name.toLowerCase()]=embed.attributes[i].value;

function setLanguage(language)
{
	if (getsetSupport)
	{
		alert("Langue changée \r\nDe : "+GM_getValue("lang")+"\r\nà : "+language);
		GM_setValue("lang", language);
	}
	switchLang();
}

function setCountry(country)
{
	if (getsetSupport)
	{
		alert("Pays changé \r\nDe : "+GM_getValue("country")+"\r\nà : "+country+"\r\nLe changement sera pris en compte apres reactualisation de la page.");
		GM_setValue("country", country);
	}
}

function switchLang()
{
	document.body.innerHTML = "";
	var newembed = document.createElement("embed");
	for (var i in vars)
	{
		newembed.setAttribute(i, vars[i]);
	}
	var val=vars["flashvars"];
	if (getsetSupport)val=val.replace(/lang=[a-z]{2}-[a-z]{2}/gi,"lang="+GM_getValue("lang"));
	else val=val.replace(/lang=[a-z]{2}-[a-z]{2}/gi,"lang=fr-fr");
	if (getsetSupport)val=val.replace(/country=[a-z]{2}/gi,"country="+GM_getValue("country"));
	newembed.setAttribute("flashvars", val);
	document.body.appendChild(newembed);
}

if(getsetSupport)
{
	GM_registerMenuCommand("Changer la langue en Allemand", function(){setLanguage("de-de");});
	GM_registerMenuCommand("Changer la langue en Francais", function(){setLanguage("fr-fr");});
	GM_registerMenuCommand("Definir le pays comme Allemand", function(){setCountry("DE");});
	GM_registerMenuCommand("Definir le pays comme Francais", function(){setCountry("FR");});
	GM_registerMenuCommand("Voir la configuration", function(){alert("Language actuel : "+GM_getValue("lang")+"\r\nPays actuel : "+GM_getValue("country"));});


	if (!GM_getValue("lang"))
	{
		setLanguage("fr-fr");
	}
	if (!GM_getValue("country"))
	{
		GM_setValue("country", /country=([a-z]{2})/gi.exec(vars["flashvars"])[1]);
	}
}

switchLang();