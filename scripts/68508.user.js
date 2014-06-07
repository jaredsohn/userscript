// ==UserScript==
// @name           SearchKeywordChangeColor.
// @namespace      http://greasemonkey.4web8.com/
// @description    Search Keyword by Google change color to red.
// @include        http://*
// @exclude        http://www.google.*
// ==/UserScript==

(function() {
	var referrer = document.referrer;
	var body = document.getElementsByTagName("body")[0].innerHTML;
	var nowurl = new RegExp( "q=" );

	if( referrer.match( nowurl ) )
	{
		var result = referrer.match(/q=([^&]*)/);
		result = RegExp.$1;

		var keywords = result.split("+");

		for( i=0; i<keywords.length; i++ )
		{
			key = decodeURI( keywords[i] );
			var reg = new RegExp( key,"gi");


			body = body.replace(reg,"<font color=red>" + key + "</font>");
		}
	}

	document.getElementsByTagName("body")[0].innerHTML = body;
})();

