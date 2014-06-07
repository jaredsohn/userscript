// ==UserScript==
// @name		Quickrep
// @namespace	tag:h@nneswalter.de;2012-02-28:Quickrep
// @description	Display the steamrep of user on his profile page.
// @include		http://steamcommunity.com/id/*
// @include		http://steamcommunity.com/profiles/*
// ==/UserScript==

var profileId	= document.location.href.match(/\w+/gi)[4];

if(document.getElementById("mainBody") == null) //No profile is being displayed
	return;

GM_xmlhttpRequest({
	method: "GET",
	url: "http://www.steamrep.com/index.php?id=" + profileId,
	overrideMimeType: "text/html",
	onload:
		function(response) {
			
			var docType		= document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
			var steamRepDoc	= document.implementation.createDocument(null, null, docType);
			var html		= document.createElement('html');

			html.innerHTML = response.responseText;
			steamRepDoc.appendChild(html);

			if(steamRepDoc == null)
				return;

			var rep = steamRepDoc.getElementById("repbox").className;
			
			if(rep == "repbox scammerbox") {
				var borderColor	= "#FF0000";
				var bgColor		= "rgba(255,0,0,0.1);"
			} else if(rep == "repbox cautionbox") {
				var borderColor = "#FC970A";
				var bgColor		= "rgba(252,151,10,0.1);"
			} else if(rep == "repbox trustedbox") {
				var borderColor = "#40BF00";
				var bgColor		= "rgba(64,191,0,0.1);"
			} else  {
				return;
			}

			if(steamRepDoc.getElementsByClassName("infobox scammerbox")[0] != null)
				var infoBox = steamRepDoc.getElementsByClassName("infobox scammerbox")[0].cloneNode(true);
			else if(steamRepDoc.getElementsByClassName("infobox cautionbox")[0] != null)
				var infoBox = steamRepDoc.getElementsByClassName("infobox cautionbox")[0].cloneNode(true);
			else if(steamRepDoc.getElementsByClassName("infobox trustedbox")[0] != null)
				var infoBox = steamRepDoc.getElementsByClassName("infobox trustedbox")[0].cloneNode(true);
			else
				var infoBox = createHTMLElement("div");

			var profileInfo = steamRepDoc.getElementById("profileinfo").cloneNode(true);
				
			var steamRepBox = createHTMLElement(
				"div", {
					"style":	"border: 6px solid " + borderColor + ";border-radius: 6px;" +
								"width: 635px;background-color: " + bgColor + "padding: 0 10px 0; margin-bottom: 6px;"
				},[
					profileInfo,
					infoBox
				]);

			document.getElementById("mainContents").insertBefore(steamRepBox,document.getElementsByClassName("mainSectionHeader")[0]);
		}
	});

function createHTMLElement(tag, attributes, childNodes) {
	var element = document.createElement(tag);
	
	if(attributes != undefined) {
		for( var attribute in attributes) {
			if(attributes.hasOwnProperty(attribute))
				element.setAttribute(attribute,attributes[attribute]);
		}
	}
	
	if(childNodes != undefined) {
		for(var node in childNodes) {
			element.appendChild(childNodes[node]);
		}
	}
	
	return element;
}
