// Name: Highrise VOIP Callto
// Author: Tim Copeland
// License: BSD
// Tunes phone numbers in the Highrise CRM (www.highrisehq.com) into links which you can launch 
// with a VOIP softphone such a X-light
//
//
// ==UserScript==
// @name           Highrise Callto
// @namespace      http://userscripts.org/scripts/review/59696
// @include        http://*.highrisehq.com/*
// @include        https://*.highrisehq.com/*
// @exclude        http://www.highrisehq.com/*
// @exclude        http://forum.highrisehq.com/*
// @exclude        https://www.highrisehq.com/*
// ==/UserScript==


document.getElementByXPath = function(sValue) { var a = this.evaluate(sValue, this, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); if (a.snapshotLength > 0) { return a.snapshotItem(0); } };
String.prototype.trim = function() { return this.replace(/^\s+|\s+$/, ''); };

String.prototype.makePhoneNumber = function() { 

	var number = this
	
		number = number.replace(/\s+/g, '');  	// remove all spaces
		number = number.replace('+',"00")		// replace + with 00 for international calling
		number = number.replace('++',"00")
	
	return number
	
};


location = window.location + ""

 
//Check we are not in edit mode
if (location.indexOf('edit') != -1){ return false }

 
	//Check we are on the PEOPLE page and there is a phone number for this record
	if( location.indexOf('people') != -1 &
		document.getElementByXPath("/html/body/div[3]/div[2]/div/div[2]/div/div[3]/div/div/table/tbody/tr/th").textContent == "Phone"){		 
 
		var contactInfo = document.getElementByXPath("/html/body/div[3]/div[2]/div/div[2]/div/div[3]/div/div/table/tbody");			
		for( var i =0; i < contactInfo.getElementsByTagName("td").length; i++ ){

 			var phoneType = contactInfo.getElementsByTagName("span")[i].textContent
 			var phoneNumberNode = contactInfo.getElementsByTagName("td")[i]
 			var phoneNumber = phoneNumberNode.textContent.replace(phoneType,"").trim()
 		
			phoneNumberNode.innerHTML =  "<a href='callto:" + phoneNumber.makePhoneNumber() + "'/>" + phoneNumber + "</a> <span>"+ phoneType +"</span>"
 	
 	}
} 