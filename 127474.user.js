// ==UserScript==
// @name           ImageFlea Album Viewer
// @namespace      imageflea-viewer
// @description    When clicking on photos in ImageFlea albums, the full sized image is displayed in the centre of the screen instead of opening a new webpage.
// @include		   http://www.imageflea.com/s/gallery/*
// ==/UserScript==

writeDisplayScript();
removeAllHyperlinksFromPage();

var colThumbs   = null;
var sTag        = null;
var sImgSrc     = null;

colThumbs = document.getElementsByClassName ("thumb"); // elements with a class "thumb"
for (x=0 ; x<colThumbs.length ; x++) // loop through the thumb elements
{
	sTag = colThumbs[x].nodeName.toLowerCase(); // elements' tag type
	if (sTag == "img")
	{
		sImgSrc = colThumbs[x].attributes["src"].value;
		sImgSrc = sImgSrc.replace ("t_", "");
		colThumbs[x].setAttribute ("onclick", "displayImage('"+sImgSrc+"');");
	}
}

function writeDisplayScript () // create a script element in the HTML which holds the functions for the image overlay
{
	var elScript = document.createElement ("script");
	elScript.setAttribute ("language", "JavaScript");
	elScript.setAttribute ("type", "text/javascript");
	elScript.innerHTML = "function displayImage (sImgPath)";
	elScript.innerHTML+= "{";
	elScript.innerHTML+= "	var elDiv = document.createElement ('div');";
	elScript.innerHTML+= "	elDiv.setAttribute ('style', 'position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.6); text-align: center; overflow: auto;');";
	elScript.innerHTML+= "	elDiv.setAttribute ('id', 'imageOverlay');";
	elScript.innerHTML+= "	elDiv.setAttribute ('onclick', 'removeImage();');";
	elScript.innerHTML+= "	var elImg = document.createElement ('img');";
	elScript.innerHTML+= "	elImg.setAttribute ('src', sImgPath);";
	elScript.innerHTML+= "	elDiv.appendChild (elImg);";
	elScript.innerHTML+= "	document.body.appendChild (elDiv);";
	elScript.innerHTML+= "}";
	elScript.innerHTML+= "function removeImage ()";
	elScript.innerHTML+= "{";
	elScript.innerHTML+= "	var elDiv = document.getElementById ('imageOverlay');";
	elScript.innerHTML+= "	document.body.removeChild (elDiv);";
	elScript.innerHTML+= "}";
	document.body.appendChild (elScript);
}

function removeAllHyperlinksFromPage ()
{
	var elaA = elaA = document.getElementsByTagName ("a"); // all <a> elements
	for (x=0 ; x<elaA.length ; x++) // remove all hyperlinks
	{
		elaA[x].removeAttribute ("href");
	}
}

/* debugging functions */

function display (sText)
{
	var divNew = document.createElement ("div");
	divNew.innerHTML = sText;
	document.body.appendChild (divNew);
}

function displayAttributesOfAllElementsInACollection (colElements)
{
	for (x=0 ; x<colElements.length ; x++)
	{
		displayElementAttributes (colElements[x]);
	}
}

function displayElementAttributes (elElement)
{
	var colAttribs   = null;
	var sAttribName  = null;
	var sAttribValue = null;
	
	colAttribs  = elElement.attributes;
	for (x=0 ; x<colAttribs.length ; x++)
	{
		sAttribName  = colAttribs[x].name;
		sAttribValue = colAttribs[x].value;
		display (sAttribName + " : " + sAttribValue);
	}
}