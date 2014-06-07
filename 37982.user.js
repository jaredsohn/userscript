// ==UserScript==   
// @name           Twitter and FriendFeed Short URL Expander
// @description    Expands snipr, tinyurl.com, is.gd, zz.gd and bit.ly urls on Twitter and FriendFeed to show you where they're pointing. 
// @namespace      http://amzn1995.googlepages.com
// @include        http://*twitter.com/*
// @include        http://twitter.com/*
// @include        https://*twitter.com/*
// @include        https://twitter.com/*
// @include        http://friendfeed.com/*
// @include        https://friendfeed.com/*
// ==/UserScript==
//bump
// User settings:
// activate the bit.ly expander by getting your bit.ly login and api key at 
// http://bit.ly/app/developers and entering them here.
//------------------------------------------------------------------------------------------
//var bitly_apiKey = "R_98f00aba8c747d28ff1089c28631c7a44";
//var bitly_login = "jadi";
var bitly_apiKey = "";
var bitly_login = "";
//------------------------------------------------------------------------------------------

var bitly_url = 'http://api.bit.ly/expand?version=2.0.1&login='+bitly_login+'&apiKey='+bitly_apiKey+'&shortUrl=';
var zzgd_url = 'http://zz.gd/api-decrypt.php?url=';
var tinyurl_url = 'http://tinyurl.com/preview.php?num=';
var isgd_url = '-';
var snipr_url = 'http://snipurl.com/resolveurl?id=';


var headers = { 'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Accept': 'application/atom+xml,application/xml,text/xml'};


var url_from_zzgd_response = function(response) { return response.responseText; }
var url_from_isgd_response = function(response) { return 'http://'+response.responseText.split('">http://')[1].split('</a>')[0]; }
var url_from_tinyurl_response = function(response) { return response.responseText.split('redirecturl" href="')[1].split('">Proceed')[0]; }
var url_from_bitly_response = function(response) { return response.responseText.split('longUrl": "')[1].split('"')[0]; }
var url_from_snipr_response = function(response) { return response.responseText; }

function expand(link,url_to_query,url_from_function){
	GM_xmlhttpRequest( {    
		method: 'GET', 
		url: url_to_query,
		headers: headers, 
		onload: function(response){ 
			var expanded_url = url_from_function(response);
			link.href = expanded_url; 
			link.firstChild.nodeValue = expanded_url; } });
}


var links = document.getElementsByTagName('a');


for (var i=0;i<links.length;i++){

	var link = links[i];	
	var linkText = link.firstChild;

	if (linkText && linkText.nodeName == '#text'){ 

		if ( /http:\/\/zz\.gd/.test(link.href) && 
			/http:\/\/zz\.gd/.test(linkText.nodeValue) ) { 
			expand( link, zzgd_url+link.href, url_from_zzgd_response );

		} else if (/http:\/\/is\.gd/.test(link.href) && 
			/http:\/\/is\.gd/.test(linkText.nodeValue) ) { 
			expand( link, link.href+isgd_url, url_from_isgd_response );

		} else if (/http:\/\/tinyurl\.com/.test(link.href) && 
			/http:\/\/tinyurl\.com/.test(linkText.nodeValue) ) { 
			expand( link, tinyurl_url+link.href.split('tinyurl.com/')[1], url_from_tinyurl_response );

		} else if (/http:\/\/snipr\.com/.test(link.href) && 
			/http:\/\/snipr\.com/.test(linkText.nodeValue) ) { 
			expand( link, snipr_url+link.href.split('snipr.com/')[1], url_from_snipr_response );

		} else if (bitly_apiKey && bitly_login && 
			/http:\/\/bit\.ly/.test(link.href) && 
			/http:\/\/bit\.ly/.test(linkText.nodeValue)){ 
			expand( link, bitly_url+link.href, url_from_bitly_response );
		}

	}
}



