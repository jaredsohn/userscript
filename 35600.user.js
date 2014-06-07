// ==UserScript==
// @name          Quotedb Random Gmail Signature for Firefox
// @version       0.2
// @namespace     http://gmail.com
// @description   Add random signature to Gmail from quotedb.com
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @include       http://gmail.google.com/*
// @include       https://gmail.google.com/*
// @author        guandalf@gmail.com
// ==/UserScript==

// See http://www.quotedb.com for info about choosing which quotes to display
//User changeable variables
var sigHeader = '<br><br>'
var urlString = 'http://www.quotedb.com/quote/quote.php?action=random_quote&=&=&'
var txtType = 1 //1 for Plain text, 2 for HTML code
//End of user changeable variables

var allBody = document.evaluate("//body[@class='editable LW-avf']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

if (allBody.snapshotItem(0)) {

        var htmlSignature = changeSignature();
        allBody.snapshotItem(0).innerHTML = allBody.snapshotItem(0).innerHTML + htmlSignature;
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
	      var tagline = responseDetails.responseText.split(/'/);
 	      if (txtType==1) {
	      dynamic_part = sigHeader + '<pre style="font-size: normal; font-family:arial">' + tagline[1] + tagline[3] + '</pre>';
	      	}
	      	else
	      	{
		dynamic_part = sigHeader + tagline[1] + ' - ' + tagline[3];
		}
              GM_setValue("sig", dynamic_part);
	    }
	});
//    return(dynamic_part);
  return GM_getValue("sig", "Default")
};

