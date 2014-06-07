// ==UserScript==
// @name           Team Liquid Sidebar Updater
// @namespace      http://visual77.com/blog/
// @description    periodically update the sidebars on teamliquid.net
// @include        http://*.teamliquid.net/*
// @version        0.1.4
// @date           2011-11-01
// ==/UserScript==

(function () {
	var initializer = function () {
		var mainBody = document
			.getElementsByTagName('table')[0]
			.getElementsByTagName('tr')[0]
			.getElementsByTagName('table')[2]
			.getElementsByTagName('tr')[0],
			leftSidebar = mainBody.childNodes[0],
			rightSidebar =  mainBody.childNodes[7],
			xhr = new XMLHttpRequest();
		
		xhr.onreadystatechange = function () {
			var leftDetails = {
					start : '<table width=1136 cellpadding=0 cellspacing=0><tr><td valign="top" width=180 rowspan=2 style="text-align: center">',
					end : /TeamSpeak 3<\/a> \([0-9]* users\)<\/p>/
				},
				rightDetails = {
				    start : '<!--Right sidebar start-->\n<td valign="top" style="text-align:center">',
				    end : '</td>\n<!--Right sidebar end-->'	
				};
			if (xhr.readyState === 4) {
				
				leftDetails.startIndex = xhr.responseText.indexOf(leftDetails.start) + leftDetails.start.length;
				leftDetails.endMatch = xhr.responseText.match(leftDetails.end);
				leftDetails.replacement = xhr.responseText.substring(
					leftDetails.startIndex, 
					(leftDetails.endMatch.index + leftDetails.endMatch[0].length)
				);
				
				rightDetails.startIndex = xhr.responseText.indexOf(rightDetails.start) + rightDetails.start.length;
				rightDetails.endIndex = xhr.responseText.indexOf(rightDetails.end) + rightDetails.end.length;
				rightDetails.replacement = xhr.responseText.substring(
					rightDetails.startIndex, 
					(rightDetails.endIndex - rightDetails.end.length)
				);
				
				leftSidebar.innerHTML = leftDetails.replacement;
				rightSidebar.innerHTML = rightDetails.replacement;
			}
		};
		
		if(leftSidebar && rightSidebar) {
		    setInterval(function () {
				xhr.open('get', 'http://www.teamliquid.net', true);
				xhr.send(true);
		    }, 60000);
		}
	};
	if (document.readyState === 'complete') {
		initializer();
	} else {
		window.addEventListener('load', initializer, false);
	}
}());