// ==UserScript==
// @name        RSI Forum (display pledge level)
// @description	Displays the pledge level (as well as backer/subscriber-status and org-SID) of a poster under his AuthorIcons
// @namespace   rsi-discussion-pledge
// @include     https://forums.robertsspaceindustries.com/discussion/*
// ==/UserScript==
if(typeof $ == 'undefined'){ var $ = unsafeWindow.jQuery; } 

$().ready(function(){
  $("div.Author").each(function() {
	var pledge = $(this).find("div.AuthorIcon img").eq(0).attr("title");
	var backer = $(this).find("div.AuthorIcon img").eq(1).attr("title");	
	var org = $(this).find("div.AuthorIcon img").eq(2).attr("title");
	var text = pledge;
	if(backer) text = text+"<br>"+backer;
	if(org) text = text+"<br>"+org;
	$(this).find("p.posts").before("<p class=\"posts\" style=\"color:#96C9E6\">"+text+"</p>");
  });
});