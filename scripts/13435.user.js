// ==UserScript==
// @name           Hotmail Show CC and BCC
// @version        1.0
// @namespace      Hotmail
// @description    Show CC and BCC - by Darius Gai
// @include        http*://*mail.live*
// ==/UserScript==


	var CC, BCC;
	CC=document.getElementById('Cc');
	BCC=document.getElementById('Bcc');
	CC.style.display='';
	BCC.style.display='';
