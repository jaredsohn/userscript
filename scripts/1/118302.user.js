// ==UserScript==
// @name          VisualSvnBreadCrumbs
// @namespace     
// @description	  inserts breadcrumbs into visualsvn
// @include       https://svn.*.com/svn/*
// ==/UserScript==

var debug = false;

if (!debug) 
{
    var GM_log = function() {};
} 
else if (unsafeWindow.console) 
{
var GM_log = unsafeWindow.console.log;
} 

// the innerText property is not defined in all browsers, check here if it can be used or not.
var hasInnerText = (document.getElementsByTagName("body")[0].innerText != undefined) ? true : false;

GM_log("VisualSvnBreadCrumbs has loaded.");

Crumble();

// the end

function Crumble()
{
	var mDash = String.fromCharCode(0x2014);

	var currentURL = document.URL;
	GM_log("currentURL: " + currentURL)

	var revHeader = document.getElementsByClassName("rev")[0];

	GM_log("revHeader: " + revHeader);

	var origText = getTextContent(revHeader);

	if (origText.indexOf(mDash + " Revision ") < 1)
	{
		GM_log("Not in an actual repository, aborting crumbling process.")
		Return;
	}

	GM_log("origText: " + origText);

	var revDetail = origText.split(" ");

	var repo = revDetail[0];
	GM_log("repo: " + repo);

	var pos = currentURL.indexOf("/" + repo + "/")
	GM_log("pos: " + pos);

	var rootURL = currentURL.substring(0, pos + 1);
	var baseURL = rootURL + repo;

	GM_log("rootURL: " + rootURL);
	GM_log("baseURL: " + baseURL);

	var revision = revDetail[3];
	GM_log("revision: " + revision);

	setTextContent(revHeader, "");

	// root element
	var theLink = document.createElement("a");
	var text = document.createTextNode("(*)");
	theLink.setAttribute("href", rootURL);
	theLink.appendChild(text);
	revHeader.appendChild(theLink);	

	// split
	text = document.createTextNode(" "); 
	revHeader.appendChild(text);

	// repo
	theLink = document.createElement("a");
	text = document.createTextNode(repo);
	theLink.setAttribute("href", baseURL);
	theLink.appendChild(text);
	revHeader.appendChild(theLink);	

	// revision
	text = document.createTextNode(" " + mDash + " Revision " + revision);
	revHeader.appendChild(text);

	// crumbled path
	var linkRef = baseURL;
	var relativePath = origText.split(": ")[1];
	GM_log("relativePath: " + relativePath);

	var crumbs = relativePath.split("/");


	//crumbs[0] will always be NULL, because the string starts with a "/"
	for (var i = 1; i < crumbs.length ; i++ )
	{
		GM_log("Adding link for: " + crumbs[i]);
	   
		text = document.createTextNode(" / "); 
		revHeader.appendChild(text);

		theLink = document.createElement("a");
		text = document.createTextNode(crumbs[i]);
		linkRef += "/" + crumbs[i];
		theLink.setAttribute("href", linkRef);
		theLink.appendChild(text);
		revHeader.appendChild(theLink);	
	}
}

function getTextContent(node)
{
    if(!hasInnerText){
		text = node.textContent;
	} else{
		text = node.innerText;
	}
    return text;
}

function setTextContent(node, text)
{
    if(!hasInnerText){
		node.textContent = text;
	} else{
		node.innerText = text;
	}
}

