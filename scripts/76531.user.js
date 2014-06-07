// Geffect 
// version 0.2 BETA!
// 2010-05-11
// Copyright (c) 2010, geffect
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Geffect", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Geffect
// @description   delete effect on google france homepage
// @include       http://www.google.fr/imghp?*
// @include       http://www.google.fr/webhp?*
// @include       http://www.google.fr/firefox*
// @include       http://www.google.fr/
// @exclude       http://diveintogreasemonkey.org/*
// @exclude       http://www.diveintogreasemonkey.org/*
// ==/UserScript==

//liste des variables du script et utilités:
//urlsite= contient l'url de la page visité
//resultat=oui/non sommes nous sur google firefox
//mavariable=contient le contenu de la 2e balise script
//envoi = va ton envoyer la requete google ou va t-on la rediriger sur google.fr

var urlsite = document.URL;
var resultat = urlsite.match("http://www.google.fr/firefox.*")  
if(resultat==null)
{
	document.getElementsByTagName('html')[0].removeAttribute("onmousemove");
	var Mavariable=document.getElementsByTagName('script')[2].innerHTML;
	if (Mavariable=="if(google.j.b)document.body.style.visibility='hidden';")
	{
		document.getElementsByTagName('script')[2].innerHTML= "if(google.j.b)document.body.style.visibility='none';";
	}

	for(x in document.getElementsByTagName('input'))
	{
		if(document.getElementsByTagName('input')[x].name=="q")
		{
			document.getElementsByTagName('input')[x].removeAttribute("onblur");
		}
	}
	document.getElementById("ghead").setAttribute("style","opacity: 1;");
	document.getElementById("sbl").setAttribute("style","opacity: 1;");
	document.getElementById("fctr").setAttribute("style","opacity: 1;");
}else{
document.getElementsByTagName('form')[0].setAttribute("onSubmit","var envoi=true;if(document.getElementById('sf').value.length==0){envoi= false;window.location.replace('http://www.google.fr/');}else{envoi= true;}return envoi;");
}

 