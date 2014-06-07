// ==UserScript==
// @name           	Hide Tab Igoogle
// @namespace      	http://userscripts.org/users/347715
// @description    	Hide igoogle's left tab
// @autor			Francisco Javier Garcia (franjavi99(at)gmail(dot)com)
// @include        	http://www.google.tld/ig*
// @include        	http://www.google.es/ig*
// @include        	http://www.google.de/ig*
// @include        	http://www.google.com/ig*
// @date			06/09/2011
// @version			1.5
// ==/UserScript==


// ----- Initialization and Variables (EDITABLE)----------------------------

// Initial state (true -> hide , false -> displayed)
var isHidden = true;

// Hide and show strings
var openText = ">>>";
var closeText = "<<<";

// Attempt counter (due ajax)
var cont = 3;

// ------------------------------------------------------------------------
// --------- Preparing Style -------------------------------------

// Style Id 
var styleId = "style_hideTabIgoogle";
// The tab has no Id. Use the Class as identifier (it's unique) 
var tabClass = "G-LS";

// Where the button is displayed
var buttonDiv = "G-ML";

// Adding display style
var styleText;

if (isHidden)
	styleText = "." + tabClass + "{display:none !important;}"
else
	styleText = "." + tabClass + "{display:table-cell !important;}"
	
addStyleWithId(styleText, styleId);


// -------- Display the show/hide button --------------------------
if (isHidden)
	createButton(openText);
else
	createButton(closeText);

	
// -------- Functions ----------------------------------------------	

// Put the style with id in the head	
function addStyleWithId(css, styleId)
{
	var parent = document.getElementsByTagName("head")[0];
	if (parent)
	{
		var style = document.createElement("style");
		style.type = "text/css";
		style.id = styleId;
		var styleTextNode = document.createTextNode(css);
		style.appendChild(styleTextNode);
		parent.appendChild(style);
	}
}


function createButton(text)
{
	var parent = getElementByClass(buttonDiv, document.getElementById("bodyContainer"));

	if (parent)
	{
		var button = document.createElement("div");
		button.id = "hideLeftTabButton";
		button.style.cursor = "pointer";
		button.style.width = "20px";
		button.style.marginLeft = "10px";
		button.style.marginTop = "3px";
		button.style.fontWeight = "bold";

		button.addEventListener("click", changeLeftTabDisplay, true);
		
		var textButton = document.createTextNode(text);
		button.appendChild(textButton);
		parent.appendChild(button);
		cont = -1;
	}
	else // The page is not load yet (Ajax). Try up to cont times. Wait 100 miliseconds
	{
		if (cont >= 0) 
		{
			cont--;
			//GM_log("Button tag not found");
			window.setTimeout(createButton, 100, text);
		}
		else
		{
			//GM_log("Button tag not found. Button not created.");
		}
	}
}


// Hide or display the left tab
function changeLeftTabDisplay()
{
	if (isHidden) // show
	{
		var style = document.getElementById(styleId);
		style.firstChild.nodeValue = "."+tabClass+"{display:table-cell !important;}";
		changeButtonText(1);
		isHidden = false;
	}
	else // hide
	{
		var style = document.getElementById(styleId);
		style.firstChild.nodeValue = "."+tabClass+"{display:none !important;}";
		changeButtonText(0);
		isHidden = true;
	}
}


// Mode ( 0 = text for show, 1 = text for hide)
function changeButtonText(mode)
{
	var button = document.getElementById("hideLeftTabButton");
	
	if (mode == 0)
		button.firstChild.nodeValue = openText;
	else
		button.firstChild.nodeValue = closeText;
}


// Get the first element with class = theClass
function getElementByClass(theClass,parentNode) 
{
	if (!parentNode)
	{
		parentNode = document;
	}
	
	var node = undefined;
	
    // Only div
    var htmlNodes = parentNode.getElementsByTagName("div");

    for (i=0; i<htmlNodes.length && node == undefined; i++) 
	{
        if (htmlNodes[i].className.search(theClass) > -1)
		{
            var node = htmlNodes[i];
        }
    }
	
	return node;
}