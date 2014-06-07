// ==UserScript==
// @name           XP-DEV Enhanced
// @namespace      http://
// @include        http://www.xp-dev.com/*, http://www2.xp-dev.com/*
// ==/UserScript==

(function() {

var cent = document.getElementsByTagName("div");

GM_addStyle([
		"h1 {font-weight: bold;color:#7f0000; }",
		"h2 {font-weight: bold;color:#7f0000;}",
		"h3, h4, h5, h6 {font-weight: bold;color:#000000;}",
		"div.wikiText h1 {font-weight: bold;color:#7f0000;}",
		"div.wikiText h2 {font-weight: bold;color:#7f0000;}",
		"div.wikiText h3, div.wikiText h4, div.wikiText h5, div.wikiText h6 {font-weight: bold;color:#000000;}",
		"div.wikiText { background-color: #ffffff; border-color: #7F7F7F #7F7F7F; border-style:solid; border-width: 0px; padding: 32px; font-family: 'lucida grande',tahoma,verdana,arial,sans-serif; margin:0.2em 0 1.5em 0; font-size: 1em; margin:0px 0px 0px 0px; }",
		"div.forumTopic { background-color: #eeffee; border-color: #7F7F7F #7F7F7F; border-style:solid; border-width: 1px; font-family: 'lucida grande',tahoma,verdana,arial,sans-serif; padding: 8px }",
		"div.markItUp { background-color: #F2F2CC; border-color: #7F7F7F #7F7F7F; border-style:solid; border-width: 1px; padding: 8px; margin-left: auto; margin-right: auto; }",
		"div.eventEntryodd { clear:both;width:100%; overflow:hidden; background-color: #FFFFF1; border-bottom: 1px solid #AFAFAF; padding: 0px; spacing: 0px; margin:1px 16px 1px 1px; }",
		"div.eventEntryeven { clear:both;width:100%; overflow:hidden; background-color: #F5F5E7; border-bottom: 1px solid #AFAFAF; padding: 0px; spacing: 0px; margin:1px 16px 1px 1px; }",
		"div.eventEntryodd p { margin:0px 0px 0px 0px; }",
		"div.eventEntryeven p { margin:0px 0px 0px 0px; }",
		"div.commentodd { clear:both;width:100%; overflow:hidden; background-color: #FFFFF1; border-bottom: 1px solid #AFAFAF; padding: 0px; spacing: 0px; margin:1px 16px 1px 1px; }",
		"div.commenteven { clear:both;width:100%; overflow:hidden; background-color: #F5F5E7; border-bottom: 1px solid #AFAFAF; padding: 0px; spacing: 0px; margin:1px 16px 1px 1px; }",
		"div.commentodd p { margin:0px 0px 0px 0px; }",
		"div.commenteven p { margin:0px 0px 0px 0px; }",
		"div.commentHeader p strong { font-size: 1.2em; font-family: 'lucida grande',tahoma,verdana,arial,sans-serif; } ",
		"div.commentHeader p { font-size: 1.0em; font-family: 'lucida grande',tahoma,verdana,arial,sans-serif; } ",
		"div.commentMessage { font-size: 1.2em; font-family: 'lucida grande',tahoma,verdana,arial,sans-serif; }",
		"div.projectMenu { font-size: 1em; }",
		"pre { color: #00004F; background: #EFEFEF; margin: 5px 15px 15px 32px; padding: 8px; border-left: 4px solid #666666; overflow : auto; font: 1em/1.5 Courier News, monospace; }",
		"body { background-color: #FFFFFF; font-size: 0.75em; font-family: 'lucida grande',tahoma,verdana,arial,sans-serif; }",
		"div.tabNavi { background-color: #FFFFFF; font-size: 0.8em; padding: 0px; margin:0px 0px 0px 0px; }",
		"div.tabContents { background-color: #FFFFFF; font-size: 0.8em; border-color: #7F7F7F #7F7F7F; border-style:solid; border-width: 1px; padding: 8px; margin:0px 0px 0px 0px; }",
	].join("\n\n"));


for(var i = 0; i < cent.length; i ++)
{
	if (cent[i].className == "adblock center")
	{
		cent[i].style.display = "none";
	}
	else
	if (cent[i].className == "center")
	{
		if(cent[i].previousElementSibling.tagName == "SCRIPT")
			 cent[i].style.display = "none";
	}
	else
	if (cent[i].className == "comment")
	{
		if (i & 1)
		{
			cent[i].className = "commenteven";
		}
		else
		{
			cent[i].className = "commentodd";
		}
	}
	else
	if (cent[i].className == "eventEntry")
	{
		if (i & 1)
		{
			cent[i].className = "eventEntryeven";
		}
		else
		{
			cent[i].className = "eventEntryodd";
		}
	}
}

})();