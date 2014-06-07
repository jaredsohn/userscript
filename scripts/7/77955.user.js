// ==UserScript==
// @name           Alexa Traffic Rank for links
// @namespace      http://userscripts.org/users/75950
// @description    Show alexa traffic rank for all links
// @include        *
// ==/UserScript==

function htmltocontext(source) {
   // Thanks Seniltai

   var dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
   var doc = document.implementation.createDocument('','', dt);
   html = doc.createElement('html');
   html.innerHTML = source;
   doc.appendChild(html);

   return doc;
} 

window.addEventListener('load', addMouseOverListeners, false);

function addMouseOverListeners() {
   var theLinks = document.links;

   for(var i=0; i<theLinks.length; i++) {
	var gmatch = theLinks[i].href.match( /http.*:\/\/(.[^/]+)\// );
	var linkDomain = '';
	if(gmatch) linkDomain = gmatch[1];
	if(document.domain != linkDomain) theLinks[i].addEventListener('mouseover', handleMouseOver, false);
   }
}

function handleMouseOver(event) {
	var theTarget = event.target;
	if (theTarget.tagName == 'IMG') theTarget = theTarget.parentNode;
	if (theTarget.tagName != 'A') return;
	var gmatch = theTarget.href.match( /http.*:\/\/(.[^/]+)\// );
	var linkDomain = '';
	if(gmatch) linkDomain = gmatch[1];
   
	GM_xmlhttpRequest({
	  method: 'GET',
	  url: 'http://www.alexa.com/siteinfo/'+linkDomain,
	  onload: function ( xhr ) {
		var theDoc = htmltocontext(xhr.responseText);
		var theDivHTML = theDoc.getElementById('siteStats').getElementsByClassName('data')[1].innerHTML;
		theDivHTML = theDivHTML.replace(/^\s*|\s*$/gi, '');
		gmatch = theDivHTML.match( /.*>\s*(.+)$/ );
		if(gmatch) theDivHTML = gmatch[1];
		theTarget.title = 'Alexa Traffic Rank: '+theDivHTML;
	  }
	});

   event.target.removeEventListener('mouseover', handleMouseOver, false);
}