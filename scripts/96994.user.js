// ==UserScript==
// @name           hidesages
// @description    condenses sage posts and suspect posts into toggle links
// @include        http://*.4chan.org/*
// @author         cfdk
// @namespace	   http://userscripts.org/scripts/show/96994
// ==/UserScript==

//Based on 4chan - Highlight All Sage Posts (http://userscripts.org/scripts/show/36554)

var previewLength = 80;

var functionTogglePost = document.createTextNode('function togglePost(l){	if(l.parentNode.nextSibling.style.display == "none") l.parentNode.nextSibling.style.display = "table-cell";	else l.parentNode.nextSibling.style.display = "none";}');
var scriptTag = document.createElement("script");
scriptTag.type = "text/javascript";
scriptTag.appendChild(functionTogglePost);
document.getElementsByTagName("HEAD")[0].appendChild(scriptTag);

//Hides the post and makes it toggle-able.

function hidePost(l)
{
	var contentPreview = l.getElementsByTagName("BLOCKQUOTE")[0].innerHTML.substring(0,previewLength).replace(/<br>/g, "[BR]");//Display the first few characters
	
	l.style.display = "none";
	
	l.previousSibling.innerHTML = "<a onclick='togglePost(this)'>[Sage Hidden]</a> ... " 
	+ contentPreview + " ... ";
}

// Read a hyperlink and determine if it contains "mailto:sage" or not.

function findSages(l)
{
	if(l.href.indexOf("mailto:") == 0) {
		var email = l.href.toLowerCase();
		if(email.indexOf("sage") != -1)
			hidePost(l.parentNode.parentNode);
	}
}

// Read the post content and look for red flags for general shitposts.

function findRedFlags(l)
{
	if(l.innerHTML.indexOf("𝛍") != -1)//This is the tall μ symbol.
	{
		l.innerHTML = l.innerHTML.replace(/𝛍/g,"");
		hidePost(l.parentNode);
	}
	if(l.innerHTML.indexOf("the people's champions") != -1)
	{
		hidePost(l.parentNode);
	}
}

// Read whole page on load.

function searchSages(d)
{
	Array.forEach(d.getElementsByTagName('A'), findSages);
	Array.forEach(d.getElementsByTagName('BLOCKQUOTE'), findRedFlags);
}

searchSages(document);

/*  Thread Expansion
 *
 *  When the thread expansion feature of the 4chan Firefox extension is used,
 *  the expanded posts have to be highlighted as well.
*/

//  Each expanded post comes in its own <TABLE>.
//  This function searches for all hyperlinks in a <TABLE>.

function searchNewPosts(e)
{
	if(e.target.nodeName=="TABLE")
		searchSages(e.target);	
}

//  When the page is expanded, search for new hyperlinks.

if(form = document.evaluate("child::form", document.body, null, 8, null).singleNodeValue)
	form.addEventListener("DOMNodeInserted", searchNewPosts, true );
delete form;