// ==UserScript==
// @name           change_stupid_mailto_to_webmail, codename "sexual healing"
// @namespace      vikas_reddy
// @description    changes mailto links to point to a webmail of your choice (I'll generalize this eventually)
// ==/UserScript==

function getmailtoproperty(source, startIndicator, endIndicator) 
{
	var startPosition = source.indexOf(startIndicator);
	if(startPosition == -1) return "";
	startPosition += 1;
	var property = source.substring(startPosition + startIndicator.length,source.length);
	var terminationPosition = property.indexOf(endIndicator);
	if(terminationPosition == -1) terminationPosition = property.length;
	property = property.substring(0,terminationPosition);
	return property;	
}

var links = document.getElementsByTagName('a');
var x;

for(x in links) 
{
	var href = links[x].href;
	if(href != null && href.substring(0,7) == "mailto:") 
	{
		var address = getmailtoproperty(href,"mailto","?");
		var subject = getmailtoproperty(href,"subject","&");
		var cc = getmailtoproperty(href,"cc","&");
		var bcc = getmailtoproperty(href,"bcc","&");
		var body = getmailtoproperty(href,"body","&");

		links[x].href = "https://mail.google.com/mail/?fs=1&view=cm&shva=1&to=" + address + "&su=" + subject + "&cc=" + cc + "&bcc=" + bcc + "&body=" + body;
	}
}