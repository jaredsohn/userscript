// ==UserScript==
// @name           Vonage CallerID Substitute
// @namespace      http://home.comcast.net/~userscripts/userscripts
// @description    Replace phone number on Vonage activity screens with Caller ID info
// @include        https://secure.vonage.com/vonage-web/dashboard/*
// @include        https://secure.vonage.com/vonage-web/activity/*
// ==/UserScript==

var allNames, thisName, parentName;
var allNumbers, thisNumber;

allNames = document.evaluate(
    "//a/img[contains(@src, 'icon_caller_id.gif')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allNames.snapshotLength; i++) {
    thisName = allNames.snapshotItem(i);
    parentName = thisName.parentNode;
    {
    	var libCall, displayName, phoneNumber;
    	//Grab the 'onclick' attribute and pull out the phone number and caller ID
        //Phone number is what's between <CENTER> and <br>    	
        //Name is what's between <b> and </b>
    	libCall = parentName.getAttribute('onclick');
    	if (/CENTER/.test(libCall.toUpperCase())){  //Do we even have one?
    		phoneNumber=libCall.slice(libCall.indexOf('<CENTER>')+8,libCall.indexOf('<br>'));
    		displayName=libCall.slice(libCall.indexOf('<b>')+3,libCall.indexOf('</b>'));
    		if(displayName) GM_setValue(phoneNumber, displayName);
//    		GM_log(phoneNumber + ' ' + displayName);
    	}

    }
}

//Now, change all the phone numbers, which are in divs with class=phoneNumber
allNumbers = document.evaluate(
    "//div[@class='phoneNumber']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

for (var i = 0; i < allNumbers.snapshotLength; i++) {
	thisNumber = allNumbers.snapshotItem(i);
	thisNumber.innerHTML = GM_getValue(thisNumber.innerHTML, thisNumber.innerHTML);
    
}