// ==UserScript==
// @name	   Appshopper: Appulo.us Link Getter
// @namespace      TrixIsOwned
// @description    Adds a link to the Appulo.us page of the App you are currently viewing.
// @include        http://*appshopper.com/*
// @author         TrixIsOwned
// ==/UserScript==

var query_url = "http://appulo.us/appdb/";
var search_query = "?page=viewapp&id=";
var apptitle = document.title.substring(13,document.title.indexOf('(')-1);
var test = "NOT FOUND";

GM_xmlhttpRequest({
	method:"GET",
	url:'http://appulo.us/appdb/i/applist.php?=&filter='+apptitle,
	onload:function(responseDetails) {
		var o = responseDetails.responseText.match(/<a [^<]*rev/);
		
		var appid = o.toString().substring(o.toString().lastIndexOf('=')+1,o.toString().indexOf('#'));
		var find_app_url = query_url + search_query + appid;
		document.getElementsByTagName("h2")[0].innerHTML += '<br/><span style="font-size:13px;"><img src="http://appulo.us/favicon.png"/> <a href="' + find_app_url + '" target="_blank">Get ' + apptitle + ' from Appulo.us!</a>';
	}
});