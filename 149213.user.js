// ==UserScript==
// @name        CoolRom Auto Download
// @namespace   CRAutoDL
// @include     http://coolrom.com/dlpop.php?id=*
// @version     1
// ==/UserScript==

function getDownloadLink() {
	var inputs = document.getElementsByTagName('input');

	for (var i=0; i < inputs.length; i++) {
		if (inputs[i].getAttribute('value') == 'Download Your File') {
			var form = inputs[i].parentNode;
		    return form.getAttribute('action');
		}
	}
	return null;
}

function tryDownload() {
	var link = getDownloadLink();
	if (link == null)
		return;
	clearInterval(downint);
	window.opener.location = link;
	window.close();
   	return;
}

if ( typeof unsafeWindow.time != "undefined" ) 
	unsafeWindow.time = 0;
else if (typeof time != "undefined") 
	time = 0;

var downint = setInterval(tryDownload, 100);