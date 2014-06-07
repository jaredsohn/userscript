// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Show new enough prices
// @namespace     http://stroebele.us/
// @description   Don't want to give your emails address to newenough.com, everytime you need to see a price, use this script.
// @include       http://www.newenough.com/*
// ==/UserScript==




var links = document.evaluate("//a[.=string('Click Here for Pricing')]", document, null, XPathResult.ANY_TYPE, null); 

var thisLink = links.iterateNext(); 
while (thisLink) {
	//Find the number to the link
	var linkOnclick = (thisLink.getAttribute("onclick"));
	var lastSlash = linkOnclick.lastIndexOf("/");
	var lastTick = linkOnclick.lastIndexOf("'");
	var num = linkOnclick.substring(lastSlash+1,lastTick);
	

	//Create the new link
	newLink = document.createElement('A');
	var url = "http://www.newenough.com/pricing/private/" + num;

	newLink.setAttribute("href", url);
	newLink.innerHTML = " Just show me the price already";
	
	//Release the link
    thisLink.parentNode.replaceChild(newLink, thisLink);
	
	//Keep on rockin
	thisLink = links.iterateNext();
}	
