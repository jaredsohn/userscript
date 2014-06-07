// Wykop KURWA
// Version 1.0.0
// 2010-03-22

// -----------------------------------Informacje-------------------------------------
// Skrypt zrobiony na przekór administracji i w celu szerzenia wolności słowa.
//
// Autor: Bakuj 
// Na podstawie "Uncensor The Internet Plus"
//
// "Nie mów mi kurwa co jest dobre a co złe. Zostaw to sądowi ostatecznemu.(...)"
//
// ----------------------------------------------------------------------------------

var pagerization = false;


// ==UserScript==
// @name Wykop KURWA
// @namespace wykopkurwa
// @description Wyłączenie cenzury w nowym Wykopie
// @include　*.wykop.pl/link/*
// @include　*.wykop.pl/ludzie/*
// @include　*.wykop.pl/wpis/*
// @include　*.wykop.pl/artykul/*
// @include　www.wykop.pl/moj/*
// @include　*.wykop.pl/
// @exclude　*.wykop.pl/comment/edit/* 
// ==/UserScript==

var regex = [], replacements = [];

makeRegExp({

//Wpierdalam
	"(\\b)*([Ww])pier[!@#$%^&*]{2}lam": "$1$2pierdalam", // wpierdalam

//Sukinsyn
	"(\\b)*([Ss])[!@#$%^&*]{4}syn": "$1$2ukinsyn", // Sukinsyn

//Kutas
	"(\\b)*([Kk])[!@#$%^&*]{4}": "$1$2utas", // Kutas

//Kurwa
	"(\\b)*([Kk])[!@#$%^&*]{3}": "$1$2urw",
	"(\\b)*([Kk])[!@#$%^&*]{4}sko": "$1$2urewsko", //Kurewsko

//Spierdalać, wypierdalać, popierdalać itp.
	"(\\b)*[Pp][!@#$%^&*]{6}[aA]": "pierdala", // *pierdala*
  
//Pierdolić
	"(\\b)*([Pp])[!@#$%^&*]{6}": "$1$2ierdol", // *pierdol*

//Chuj
	"(\\b)*([Hh])[!@#$%^&*]{2}": "$1$2uj", // *huj*

//Cipa
	"(\\b)*([Cc])[!@#$%^&*]{3}": "$1$2ipa", // Cipa

//Jebać
	"(\\b)*([Jj])[!@#$%^&*]{2}": "$1$2eb", // *jeb*

//Debil (WTF? Co to za przekleństwo w ogóle?)
	"(\\b)*([Dd])[!@#$%^&*]{4}": "$1$2ebil", // Debil*

//Pizda
	"(\\b)*([Pp])[!@#$%^&*]{3}": "$1$2izd", // *pizd*
}, "g");


function makeRegExp(replacers, flags) {
	for(var key in replacers)
	{
		regex.push(new RegExp(key, flags));
		replacements.push(replacers[key]);
	}
} 

function uncensor(text)
{
	for (var j = 0; j < regex.length; j++)
	{
		text = text.replace(regex[j], replacements[j]);
	}
	return text;
}

function main()
{
	if(document.title) document.title = uncensor(document.title);
	var textnodes = document.evaluate( "//body//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < textnodes.snapshotLength; i++)
	{
		node = textnodes.snapshotItem(i);
		node.data = uncensor(node.data);
	}
}

main();

if (pagerization) addFilter(function () {main();});

function addFilter(func, i) {
	i = i || 4;
	if (window.AutoPagerize && window.AutoPagerize.addFilter) {
		window.AutoPagerize.addFilter(func);
	}
	else if (i > 1) {
		setTimeout(arguments.callee, 1000, func, i - 1);
	}
	else {
		(function () {
			func(document);
			setTimeout(arguments.callee, 200);
		})();
	}
}