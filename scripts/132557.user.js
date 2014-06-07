// ==UserScript==
// @name           Torn Travel Links
// @namespace      *torn.com*
// @description    Torn Travel Links
// @include        *torn.com/index.php
// ==/UserScript==

var i, il;
var title;

// Get all the images on the page in an array
var allTitle = document.getElementsByTagName("title");	
	
for(i = 0, il = allTitle.length; i < il; i++) {    
    title = allTitle[i].innerHTML;
	
    if(title.indexOf("TRAVELLING") > 0) {
        var allTbody = document.getElementsByTagName("tbody");
        
        // Create Events link
        textEvents = document.createTextNode("Events");
        arrowEvents = document.createTextNode("> ");
        linkEvents = document.createElement('a');
        linkEvents.setAttribute('href', 'events.php');
        linkEvents.appendChild(textEvents);
        tdEvents = document.createElement('td');
        tdEvents.setAttribute('width', '25%');
        tdEvents.setAttribute('align', 'center');
        tdEvents.appendChild(arrowEvents);
        tdEvents.appendChild(linkEvents);
	
        // Create Messages link
        textMessages = document.createTextNode("Messages");
        arrowMessages = document.createTextNode("> ");
        linkMessages = document.createElement('a');
        linkMessages.setAttribute('href', 'messages.php');
        linkMessages.appendChild(textMessages);
        tdMessages = document.createElement('td');
        tdMessages.setAttribute('width', '25%');
        tdMessages.setAttribute('align', 'center');
        tdMessages.appendChild(arrowMessages);
        tdMessages.appendChild(linkMessages);
        
        // Create Forums link
        textForums = document.createTextNode("Forums");
        arrowForums = document.createTextNode("> ");
        linkForums = document.createElement('a');
        linkForums.setAttribute('href', 'forums.php');
        linkForums.appendChild(textForums);
        tdForums = document.createElement('td');
        tdForums.setAttribute('width', '25%');
        tdForums.setAttribute('align', 'center');
        tdForums.appendChild(arrowForums);
        tdForums.appendChild(linkForums);
	
        // Create the new table row
        trLinks = document.createElement('tr');
        trLinks.setAttribute('align', 'center');
        trLinks.appendChild(tdEvents);
        trLinks.appendChild(tdMessages);
        trLinks.appendChild(tdForums);

        for(i = 0, il = allTbody.length; i < il; i++) {
            element = allTbody[i];
            element.appendChild(trLinks);
        }
    }
}