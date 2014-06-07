// ==UserScript==
// @name           Classic GameFAQs Topic Icons
// @namespace      http://www.curtisbright.com/gfaqs8/
// @description    Adds the classic topic icons on the GameFAQs boards.  Meant to be used with the classic style: http://userstyles.org/styles/13343 
// @include        http://www.gamefaqs.com/boards/*
// ==/UserScript==

var imgs = document.getElementsByTagName("img");
for(var i=0; i<imgs.length; i++)
{	var imgsrc = imgs[i].getAttribute("src");
	if(imgsrc.indexOf("default/sticky")!=-1)
	{	var newimg = document.createElement("img");
		newimg.setAttribute("src", "http://www.gamefaqs.com/images/sticky.gif");
		newimg.setAttribute("alt", "");
		newimg = imgs[i].parentNode.nextSibling.nextSibling.insertBefore(newimg, imgs[i].parentNode.nextSibling.nextSibling.firstChild);
	}
	if(imgsrc.indexOf("_closed")!=-1||imgsrc.indexOf("archived")!=-1)
	{	var newimg = document.createElement("img");
		newimg.setAttribute("src", "http://www.gamefaqs.com/images/closed.gif");
		newimg.setAttribute("alt", "**CLOSED**");
		newimg = imgs[i].parentNode.nextSibling.nextSibling.insertBefore(newimg, null);
	}
}
