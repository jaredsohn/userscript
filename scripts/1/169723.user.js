// ==UserScript==
// @name		deviantArt - Better Title
// @namespace		about:blank
// @description		Make a better title for any picture.
// @include		http://*.deviantart.*
// @grant		none
// @version 		1.3
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

function da_alter(name)
{
	var dlbutton, smallpic, navzone;
	dlbutton = document.getElementById("download-button");
	if(!dlbutton)
	{
		smallpic = document.getElementById("gmi-ResViewSizer_fullimg");
		if(smallpic)
		{
			dlbutton = document.createElement("a");
			dlbutton.id = "download-button";
			dlbutton.className = "smbutton smbutton-textonly";
			dlbutton.href = smallpic.src;
			navzone = document.getElementsByClassName("iconset-art icons vicons devlinkzone");
			navzone[0].appendChild(dlbutton);
		}
	}
	dlbutton.innerHTML = '<span><i class="i7"></i><h5>' + name + '</h5></span>';
	dlbutton.download = name;
}

var pic, imgpic, pagename, imgname;
pic = document.getElementById("zoomed-in");
//imgpic = document.getElementById("gmi-ResViewSizer_img");
if(pic)
{
	pagename = document.title.substr(0, document.title.length - 14);
	imgname = mktitle(pagename);
	da_alter(imgname);
}
