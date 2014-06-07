// ==UserScript==
// @name           Instagram2Webstagram
// @namespace      de.matthiasboll.instagram2webstagram
// @description    Inserts links to web.stagram.com on an instagr.am page
// @include        http://instagr.am/p/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

function dostuff()
{
// linkify the USERNAME and the COMMENTS
$(".username").map(function () {
	var name = $(this).text().trim();
	var link = document.createElement("a")
	$(link).attr("href","http://web.stagram.com/n/"+name);
	$(link).text(name);
	$(this).removeClass("username");
	$(link).addClass("username");
	$(link).css("text-decoration","none");
	$(this).text("");
	
	$(this).append(link);
});

// linkify the LIKES
$('.likes.group li').map(function () {
	var name = $(this).text().trim();
	var link = document.createElement("a")
	$(link).attr("href","http://web.stagram.com/n/"+name);
	$(link).css("text-decoration","none");
	$(link).css("color","#666666");
	
	$(this).wrap(link);	
});

}

// wait for document to finish loading
window.addEventListener('load',dostuff,false);
