// ==UserScript==
// @name          Yahoo Mail Ad Removal Good Old Old Interface 
// @namespace     http://mtk.co.il/moppy
// @description	  removes the ads Motty Katan(c) 19-10-2013 last updated -- ; intended for use with the /b/ version (old but new).
// @include       http://*.mail.yahoo.com/neo/b/*
// @include       http://*.mail.yahoo.com/neo/launch*
// ==/UserScript==
//Change Log:

function removeElementsByClassName(sClass){
aoElements = document.evaluate( "//*[@class='"+sClass+"']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );	 	
			if (aoElements.snapshotLength) {
				for (var i=0; i< aoElements.snapshotLength; i++)
				{
					//have no other option but to change type to "button" from "submit"
					aoElements.snapshotItem(i).parentNode.removeChild(aoElements.snapshotItem(i));
				}
			}

}

function removeClassName(sClass){
	aoElements = document.evaluate( "//*[contains(@class, '"+sClass+"')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );	 	
			if (aoElements.snapshotLength) {
				for (var i=0; i< aoElements.snapshotLength; i++)
				{
					//have no other option but to change type to "button" from "submit"
					aoElements.snapshotItem(i).className = aoElements.snapshotItem(i).className.replace(/with-ads/i,"");
				}
			}
}


removeElementsByClassName("mb");
removeElementsByClassName("sky-ad");
removeClassName("with-ads");