// ==UserScript==
// @name           Traductor para el The Settlers Online
// @namespace      http://userscripts.org/users/Drogas
// @description    Le permite cambiar el idioma del juego
// @include        http://www.diesiedleronline.de/de/spielen
// @include        http://www.tsotesting.com/en/play
// @include        http://www.thesettlersonline.ru/ru/play
// @include        http://www.thesettlersonline.es/es/jugar
// @include        http://www.thesettlersonline.pl/pl/graj
// @identifier     http://userscripts.org/scripts/source/93510.user.js
// @version        1.1.1
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
		alert("Setting language\r\nFrom: "+GM_getValue("lang")+"\r\nTo: "+language);
		GM_setValue("lang", language);
	}
	switchLang();
}

function setCountry(country)
{
	if (getsetSupport)
	{
		alert("Set country\r\nFrom: "+GM_getValue("country")+"\r\nTo: "+country+"\r\nChanges will be seen after page reload.");
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
	else val=val.replace(/lang=[a-z]{2}-[a-z]{2}/gi,"lang=es-es");
	if (getsetSupport)val=val.replace(/country=[a-z]{2}/gi,"country="+GM_getValue("country"));
	// Remove comments to make default country to RU (or any other if you change value)
	//else val=val.replace(/country=[a-z]{2}/gi,"country=RU");

	newembed.setAttribute("flashvars", val);
	document.body.appendChild(newembed);
}

if(getsetSupport)
{
	GM_registerMenuCommand("Play in English (English)", function(){setLanguage("en-us");});
	GM_registerMenuCommand("Spielen in der deutschen (Deutsch)", function(){setLanguage("de-de");});
	GM_registerMenuCommand("Русский язык", function(){setLanguage("ru-ru");});
	GM_registerMenuCommand("Zagraj w French (Français)", function(){setLanguage("fr-fr");});
	GM_registerMenuCommand("Gra w języku polskim (Polski)", function(){setLanguage("pl-pl");});
	GM_registerMenuCommand("Jugar en Español (Español)", function(){setLanguage("es-es");});
	GM_registerMenuCommand("-------------", function(){void(0);});
	GM_registerMenuCommand("Country - England (England)", function(){setCountry("EN");});
	GM_registerMenuCommand("Country - Deutschland (Deutschland)", function(){setCountry("DE");});
	GM_registerMenuCommand("Страна - Россия", function(){setCountry("RU");});
	GM_registerMenuCommand("Pays - France (France)", function(){setCountry("FR");});
	GM_registerMenuCommand("Kraj - Polska (Polska)", function(){setCountry("PL");});
	GM_registerMenuCommand("País - España (España)", function(){setCountry("ES");});
	GM_registerMenuCommand("-------------", function(){void(0);});
	GM_registerMenuCommand("Показать текущие настройки", function(){alert("Текущий язык: "+GM_getValue("lang")+"\r\nТекущая страна: "+GM_getValue("country"));});


	if (!GM_getValue("lang"))
	{
		setLanguage("en-us");
	}
	if (!GM_getValue("country"))
	{
		GM_setValue("country", /country=([a-z]{2})/gi.exec(vars["flashvars"])[1]);
	}
}

switchLang();