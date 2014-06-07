// ==UserScript==
// @name           Reddit add custom subreddits to header
// @namespace      Reddit
// @include        *.reddit.com*
// @version			1.0
// ==/UserScript==

//User Script Commands -> Customize


GM_registerMenuCommand("Customize Header Subreddits", popupCustomize, "c");

function popupCustomize() {
   var list = prompt("Enter subreddits seperated by commas", subs.replace(/,/g, ", "));
   GM_setValue("subs", list);
   location.reload(true);
}

var subs = GM_getValue("subs", "pics, funny, starcraft");
subs = subs.replace(/\s/g, '');
var links = subs.split(",");

//var allHTMLTags = new Array();
function get2ndUL(theClass) {
	var allHTMLTags=document.getElementsByTagName("ul");
	var c = new Array();
	var count = 0;

	for (i=0; i<allHTMLTags.length; i++)
		if (allHTMLTags[i].className==theClass)
			if (count++ == 1) return allHTMLTags[i];
}



function appendSubreddits ( reddits, container )	{
	var htmlstr='';	
	for (i=0; i < links.length; i++) {
		htmlstr += "<li><a href='http://www.reddit.com/r/" + links[i] + "'>" + links[i] + "</a><span class='separator'>-</span></li>";	
	}
	container.innerHTML = htmlstr + container.innerHTML;
}
var list = get2ndUL("flat-list sr-bar hover");
appendSubreddits(links,list);



