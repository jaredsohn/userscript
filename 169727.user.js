// ==UserScript==
// @name		Furaffinity - Better title
// @namespace		about:blank
// @description		Make a better title for any picture.
// @include		http://www.furaffinity.net/view/*
// @include		https://www.furaffinity.net/view/*
// @grant		none
// @version     	1.3
// ==/UserScript==

function mktitle(name)
{
	var author, pictitle, fulltitle;
	author = name.replace(/(^.*) by (.*?$)/g, "$2");
	pictitle = name.replace(/(^.*) by (.*?$)/g, "$1");
	fulltitle = author + " - " + pictitle;
	// Remplace les caractères spéciaux :
	fulltitle = fulltitle.replace(/[?.*+_~=`]/g, " ");
	// Remplace les barres obliques :
	fulltitle = fulltitle.replace(/[\/\\]/g, "-");
	// Remplace les deux-points :
	fulltitle = fulltitle.replace(/:/g, " - ");
	// Supprime l'indication de commission
	fulltitle = fulltitle.replace(/(C|c)omm?(ission|ish)?(\s*)?/g, "");
	// Supprime les doubles tirets :
	fulltitle = fulltitle.replace(/\- \-+/g, "-");
	// Supprime les doubles espaces :
	fulltitle = fulltitle.replace(/\s+/g, " ");
	// Supprime les espaces en début et fin de chaine :
	fulltitle = fulltitle.replace(/^\s|\s$/g, "");
	return fulltitle;
}

var i;
var elatester = document.getElementsByTagName("a");
var tempel = document.createElement('div');
var pagename = document.title.substr(0,document.title.length-26);

tempel.innerHTML = document.title;
document.title = tempel.textContent;
tempel.innerHTML = mktitle(pagename);

for(i=0 ; i < elatester.length ; i++)
{
	if(elatester[i].textContent.match(" Download "))
	{
		elatester[i].title=tempel.textContent;
		elatester[i].innerHTML=tempel.innerHTML;
	}
}

tempel.innerHTML = document.title;
document.title = tempel.textContent;
