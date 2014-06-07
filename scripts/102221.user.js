// ==UserScript==
// @name           The Settlers Online Test Server Language Change 
// @namespace      http://userscripts.org/users/bropiter
// @description    Plik został zrobiony na podstawie Die Siedler Online Language Change by Drogas
// @include        http://www.tsotesting.com/en/play
// @identifier     http://userscripts.org/scripts/source/102221.user.js
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
		alert("Wybierz język \r\nz: "+GM_getValue("lang")+"\r\nna: "+language+"\r\nZmiana nastąpi po odświeżeniu strony.");
		GM_setValue("lang", language);
	}
	switchLang();
}

function setCountry(country)
{
	if (getsetSupport)
	{
		alert("Wybierz kraj \r\nz: "+GM_getValue("country")+"\r\nna: "+country+"\r\nZmiana nastąpi po odświeżeniu strony.");
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
	else val=val.replace(/lang=[a-z]{2}-[a-z]{2}/gi,"lang=pl-pl");
	if (getsetSupport)val=val.replace(/country=[a-z]{2}/gi,"country="+GM_getValue("country"));
	newembed.setAttribute("flashvars", val);
	document.body.appendChild(newembed);
}

if(getsetSupport)
{
	GM_registerMenuCommand("Zmień język na Niemiecki", function(){setLanguage("de-de");});
	GM_registerMenuCommand("Zmień język na Angielski", function(){setLanguage("en-us");});
	GM_registerMenuCommand("Zmień język na Polski", function(){setLanguage("pl-pl");});
        GM_registerMenuCommand("Ustaw kraj na Niemiecki", function(){setCountry("DE");});
	GM_registerMenuCommand("Ustaw kraj na Angielski", function(){setCountry("EN");});
	GM_registerMenuCommand("Ustaw kraj na Polski", function(){setCountry("PL");});
	GM_registerMenuCommand("Pokaż ustawienia", function(){alert("Bieżący język: "+GM_getValue("lang")+"\r\nBieżący kraj: "+GM_getValue("country"));});


	if (!GM_getValue("lang"))
	{
		setLanguage("pl-pl");
	}
	if (!GM_getValue("country"))
	{
		GM_setValue("country", /country=([a-z]{2})/gi.exec(vars["flashvars"])[1]);
	}
}

switchLang();