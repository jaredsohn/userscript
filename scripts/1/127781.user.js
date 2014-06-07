scr_meta=<><![CDATA[
// ==UserScript==
// @name          Ogrr Menu Additions
// @description   Adds menu shortcuts to ogrr for easability.
// @namespace     ogrrmenuadditions
// @include       https://www.ogrr.com/*
// @include       https://ogrr.com/*
// @include       http://www.ogrr.com/*
// @include       http://ogrr.com/*
// @version		  1.0.3
// @require 	  http://dev.tactical-gameservers.com/userscripts/updater.php?id=127781
// ==/UserScript==
]]></>.toString();
	
//links
function createLinks()
{
	var strVar="";
	strVar+="<li>";
	strVar+="<a href='/search.php?search_id=unreadposts'>Unread Posts</a>";
	strVar+="<\/li>";
	
	strVar+="<li>";
	strVar+="<a href='/search.php?search_id=activetopics'>Active Topics</a>";
	strVar+="<\/li>";
	
	strVar+="<li>";
	strVar+="<a href='/search.php?search_id=newposts'>New Posts</a>";
	strVar+="<\/li>";
	
	strVar+="<li class=\"last\">";
	strVar+="Menu Addon Version: 1.0.2";
	strVar+="<\/li>";
	
	return strVar;
}


//remove the class="last" where logout or register
linodes=document.getElementsByTagName("li");
for(i=0;i<linodes.length;i++)
{
	if(linodes[i].getAttribute('class') == "last")
	{
		linodes[i].removeAttribute('class');
		linodes[i].setAttribute("style",'font-weight: bold');
	}
}
//okay, so now that we removed the last class attribute...lets create the new links\

//add links
ulnodes=document.getElementsByTagName("ul");
for(i=0;i<ulnodes.length;i++)
{
	if(ulnodes[i].getAttribute("class")=="linklist leftside")
	{
		var cururl=document.documentURI;
		var html=createLinks();
		curHTML=ulnodes[i].innerHTML;
		curHTML+=html;
		ulnodes[i].innerHTML=curHTML;
	}
}