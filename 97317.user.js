/* Created 2011-02-19 | Last updated 2011-02-19
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * <baussart.arnaud@gmail.com> wrote this file. As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return.
 * ----------------------------------------------------------------------------
 * "LICENCE BEERWARE" (Révision 42):
 * <baussart.arnaud@gmail.com> a créé ce fichier. Tant que vous conservez cet avertissement,
 * vous pouvez faire ce que vous voulez de ce truc. Si on se rencontre un jour et
 * que vous pensez que ce truc vaut le coup, vous pouvez me payer une bière en
 * retour.
 * ----------------------------------------------------------------------------
 */
 
// ==UserScript==
// @name          Remove Adware patched VLC & Moovida Bars
// @description   Contact me at <baussart.arnaud@gmail.com> Or commenting this script on userscripts.org to keep this list up-to-date ! || Contactez-moi a <baussart.arnaud@gmail.com> Ou commentez ce script userscripts.org pour que l'on garde cette liste a jour !
//
// http://userscripts.org/scripts/show/97317
//
// @include       *9divx.com*
// @include       *fluket.com*
// @include       *movizdb.com*
// @include       *filesdrop.com*
// @include       *bemovi.com*
// @include       *aflamizik.com*
// @include       *bladitop.net*
// @include       *stream*
// @include       *video*
// @include       *serie*
// @include       *ovie*
// @include       *movi*
// @include       *film*
// @include       *mega*
// @include       *rapid*
// @include       *telecharg*
// @include       *download*
// @include       *softwar*
// @include       *warez*
// @include       *.ws/*
// Passkeu faut pas deconner non plus... Mollo sur le scan des pages!
// @exclude       *.megaupload.com*
// @exclude       *.rapidshare.com*
// @exclude       *.depositfiles.com*

// ==/UserScript==

function remove_file(name, type)
{
	var element = (type=="js")? "script" : (type == "css")? "link" : "none"
	var target = (type == "js")? "src" : (type == "css")? "href" : "none"
	var each = document.getElementsByTagName(element);

	for (var i = each.length; i >= 0; i--)
	{
		if (each[i] && each[i].getAttribute(target)!=null && each[i].getAttribute(target).indexOf(name)!=-1)
		{
			each[i].parentNode.removeChild(each[i]);
		}	
	}
}

function remove_element(tag, attr, val)
{
var eone = document.getElementsByTagName(tag);

for (var i = eone.length; i >= 0; i--)
	{
		if (eone[i] && eone[i].getAttribute(attr)!=null && eone[i].getAttribute(attr).indexOf(val)!=-1)
		{
			eone[i].parentNode.removeChild(eone[i]);
		}	
	}
}

if(document.body.innerHTML.match("Installer le plugin VLC Player pour contourner la limite de"))
{
	remove_element("div", "class", "fixe");
	remove_element("span", "class", "fixe");
	remove_file("sps.css", "css");
	remove_file("sps2.css", "css");
}

if(document.body.innerHTML.match("Install the plugin VLC Player to avoid the 72 min"))
{
	remove_element("div", "class", "fixe");
	remove_element("span", "class", "fixe");
	remove_file("sps.css", "css");
	remove_file("sps2.css", "css");
}

if(document.body.innerHTML.match("Installez Moovida pour pouvoir lire tous les films"))
{
	remove_element("div", "class", "fixe");
	remove_element("span", "class", "fixe");
	remove_file("sps.css", "css");
	remove_file("sps2.css", "css");
}