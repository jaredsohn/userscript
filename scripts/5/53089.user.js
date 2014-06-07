// ==UserScript==
// @name MafiaWarsInviter
// @description MafiaWars Automatic Inviter
// @namespace facebook
// @version 1.4
// @include http://apps.facebook.com/inthemafia/*
// ==/UserScript==
url = window.location;
urlcheck = "http://apps.facebook.com/inthemafia/remote/html_server.php?xw_controller=recruit&xw_action=view"; 
	var allDivs, thisDiv;
	allDivs = document.evaluate("//input[@class='inputcheckbox ']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

	var num=allDivs.snapshotLength/2;

if ( url == urlcheck && confirm("Do you want to try to add the remaining "+num+" friends on your list?") )
{

	for (var i = 0; i < num; i++) {
		thisDiv = allDivs.snapshotItem(i);
		url = 'http://apps.facebook.com/inthemafia/remote/html_server.php?xw_controller=war&xw_action=add&xw_city=1&friend_id='+thisDiv.value;
		GM_xmlhttpRequest( {method:"GET", url: url, headers:{"User-Agent":"Mozilla/5.0","Accept":"text/xml"} } );
	}
	alert("THE END");
}
