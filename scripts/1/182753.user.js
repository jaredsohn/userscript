// ==UserScript==
// @name       NyaaTorrents - Transform download link into magnet link
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Transform download link into magnet link
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @match http://www.nyaa.se/?page=view&tid=*
// @copyright  2012+, You
// ==/UserScript==

function extractUrlParams(){	
	var t = location.search.substring(1).split('&');
	var f = [];
	for (var i=0; i<t.length; i++){
		var x = t[ i ].split('=');
		f[x[0]]=x[1];
	}
	return f;
}

var params = extractUrlParams();
var link = "http://www.nyaa.se/?page=download&tid="+ params["tid"] +"&magnet=1";
$( "div.viewdownloadbutton a" ).attr("href", link);
