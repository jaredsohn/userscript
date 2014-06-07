// twirl URL shortener
// Based on URL shortener from http://userscripts.org/scripts/show/22029
//
// ==UserScript==
// @name		twirl URL shortener
// @namespace		twirl.at
// @description	Submit a URL from the location bar to twirl.at and retrieve the short link. Just press Shift+T to shrink the URL from the location bar (the site that your are on is shortened and returned) You can enable instant copy to your clipboard. See the source of this script (click Edit).
// @version			0.2.3
// @date			2008-08-05
// @include			*
// @exclude			http://www.google.com/reader/*
// ==/UserScript==

//////////////////////////////////////////////////////////
// ENABLE DIRECT COPYING TO YOUR CLIPBOARD:
//
// If you would like this to be automatically copied in the future, 
// visit 'about:config' the address bar. 
// Search for 'signed.applets.codebase_principal_support' and set
// its value to true.

var service = 1;
var twirlat = 1;
var url, regexp;

switch(service) {
	case twirlat:
		url = 'http://twirl.at/api.php?url='+encodeURIComponent(location.href);
		regexp = '(http:\/\/twirl.at\/[A-Za-z0-9]+)';
		break;
}

function getshortlink() {
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		onload: function(response) {
			if (response.status == 200){
				if (linkhref = response.responseText.match(regexp)) {
					if (linkhref.length > 1) {
						setclip(linkhref[linkhref.length-1]);
					}
					else{
						setclip(linkhref[0]);
					}
				}
				else{
					reportError(response);
				}
			}
			else{
				reportError(response);
			}
		},
		onerror: function(response) {
			reportError(response);
		}
	});	
}

// Reports an error to the user.
function reportError(response) {
  GM_log('Error: ' + response.responseText);
  window.status = "Error with action: " + response.responseText;
}

function setclip(text) {
	// you have to sign the code to enable this, or see notes below
	try {
		unsafeWindow.netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
		
		var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
		str.data= text;
		
		// make transferable
		var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
		if (!trans) return;
		
		// specify data type; TEXT
		trans.addDataFlavor('text/unicode');
		trans.setTransferData("text/unicode",str,text.length*2);
		
		// make interface clipboard
		var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
		if (!clip) return;
		var clipid=Components.interfaces.nsIClipboard;
		clip.setData(trans,null,clipid.kGlobalClipboard);
	}
	catch (e) {
		 prompt("Here is your link:", text);
	}
}

document.addEventListener('keypress', function(event) {
	// Everything is a shift combo. Ignore the search field.
	if (!event.shiftKey || event.ctrlKey || event.metaKey || event.altKey || (event.target.type && event.target.type.match(/text/))) {
		return;
	}
	
	// Shift+T
	if (event.charCode == 84) {
		getshortlink();
	}
}, false);