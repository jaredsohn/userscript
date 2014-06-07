// ==UserScript==
// @name           trainer v2
// @namespace      By Azaret / modificacion Waly
// @description    v2 of eRepublik for man
// @include        http://*.erepublik.com/*
// ==/UserScript==

// URL Setup
var currURL = location.href;
var arrURL = currURL.split('/');
//alert(arrURL[4]);

switch(arrURL[4])
{
case 'work':
		var bg2ch = document.getElementById("content");
		bg2ch.style.backgroundImage = "url(\"http://revistaarsenioerico.com/images/Feb09/lilian.jpg\")";
		var tx2ch = document.getElementById("healthLevel1");
		tx2ch.innerHTML = tx2ch.innerHTML.replace("Emma","Lilian");
	break;
case 'train':
		var bg2ch = document.getElementById("content");
		bg2ch.style.backgroundImage = "url(\"http://carneargenta.com/wp-content/uploads/2009/09/65948_Larissa_riquelme_Shomp_scans_filtered_123_134lo.jpg\")";
		var tx2ch = document.getElementById("healthLevel1");
		tx2ch.innerHTML = tx2ch.innerHTML.replace("Lana","Larissa");
	break;
case 'entertain':
		var bg2ch = document.getElementById("content");
		bg2ch.style.backgroundImage = "url(\"http://3.bp.blogspot.com/_rSkJsRcaXIo/RqfY519OYcI/AAAAAAAAAAM/7lfotJWGwk0/s320/pic26500.jpg\")";
		var tx2ch = document.getElementById("healthLevel1");
		tx2ch.innerHTML = tx2ch.innerHTML.replace("Lisa","Mirna");
	break;
case 'study':
		var bg2ch = document.getElementById("content");
		bg2ch.style.backgroundImage = "url(\"http://www.vefutbol.com.mx/img/2010/03/Fut/dallysferreira.jpg\")";
		var tx2ch = document.getElementById("healthLevel1");
		tx2ch.innerHTML = tx2ch.innerHTML.replace("Gina","Dallys");
	break;
	
}