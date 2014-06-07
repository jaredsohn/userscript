//ShareQuick Download Time Delay Bypass
//v. 1.1

// ==UserScript==
// @name          sharequick.com download time delay bypass
// @namespace     http://www.digivill.net/~joykillr
// @description   This script allows you to bypass the download time countdown on sharequick.com
// @include       http://*.sharequick.com/*
// ==/UserScript==


(function(){ 
	var xpathResult = document.evaluate('//html/body/center[1]/table[2]/tbody/tr/td/center[3]/script', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
	var str1 = xpathResult.singleNodeValue.textContent.toString();
	if (str1.indexOf('onClick=') != -1) {
		str1 = str1.split('onClick="window.location=\\\'')[1].split('\\\'')[0];
		GM_addStyle("#dl {display: none !important;}");
		var dlbox = document.createElement("div");
		dlbox.setAttribute("style", "display: block !important;");
		dlbox.innerHTML = '<table style="width:auto; background-color:blue; color:#ffffff; border: 2px solid #000000;"><tbody><tr>' +
			'<td style="text-align:left;">' +
			'<a href="' + str1 + '" style="color: #ffffff; text-decoration: bold; background-color: blue;">Click here to download file</a>' + 
			'<br /></td></tr></tbody></table>';
		document.getElementById("dl").parentNode.insertBefore(dlbox, document.getElementById("dl").parentNode.lastChild);
	}
})();
		

