// ==UserScript==
// @name          Remote Random Gmail Signature for Firefox
// @version       .9beta
// @namespace     http://gmail.com
// @description   Add  random signature to Gmail
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @include       http://gmail.google.com/*
// @include       https://gmail.google.com/*
// @author        ravard@gmail.com
// @grant         GM_xmlhttpRequest
// @grant         GM_setValue
// @grant         GM_getValue
// ==/UserScript==

//User changeable variables
var sigHeader = '<br><br>-----------------<br>'
var urlString = 'http://CHANGEME.com/sigs.txt'
var txtType = 1 //1 for Plain text, 2 for HTML code
//For Old Look: 'editable  LW-yrriRe'
//For New Look: 'editable  LW-avf'
//End of user changeable variables

var allBody = document.evaluate("//body[@class='editable LW-avf']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

if (allBody.snapshotItem(0)) {

        var htmlSignature = changeSignature();
        allBody.snapshotItem(0).innerHTML = htmlSignature + allBody.snapshotItem(0).innerHTML;
}

function changeSignature() {
          var dynamic_part;
	  GM_xmlhttpRequest({
	    method: 'GET',
	    url: urlString,
	    headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	        'Accept': 'text/plain',
	    },
	    onload: function(responseDetails) {
	      tagline_array = responseDetails.responseText.split('%');
	      if (txtType==1) {
	      dynamic_part = sigHeader + '<pre style="font-size: normal; font-family:arial">' + tagline_array[Math.floor(Math.random()*tagline_array.length)] + '</pre>';
	      	}
	      	else
	      	{
		dynamic_part = sigHeader + tagline_array[Math.floor(Math.random()*tagline_array.length)];
		}
              GM_setValue("sig", dynamic_part);
	    }
	});
    //return(dynamic_part);
  return GM_getValue("sig", "Default")
};

