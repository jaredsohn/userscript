// ==UserScript==
// @name           Integrum unwrapper
// @namespace      http://aafnet.integrum.ru/artefact3/ia/ia5.aspx?lv=3*
// @description    Integrum unwrapper
// @include        http://aafnet.integrum.ru/artefact3/ia/ia5.aspx?lv=3*
// ==/UserScript==


function createFrame(sniplink)
{

var myFrame = document.createElement("iframe");
myFrame.src = sniplink;
myFrame.width = "100%";
myFrame.height = 600;
return myFrame;

}

var allAs, thisA;

allAs = document.getElementsByTagName("a");

for (var i=0; i<allAs.length; i++)
{
thisA = allAs[i];
var sniplink;

	if(thisA.getAttribute("class") && (thisA.getAttribute("class") == "afparam")&& thisA.getAttribute("href"))
	{
	
	
		sniplink = 'http://aafnet.integrum.ru/artefact3/ia/';
		
		sniplink+= thisA.getAttribute("href");
		
		var newFrame = createFrame(sniplink);
		thisA.parentNode.appendChild(newFrame);
	
	}

}