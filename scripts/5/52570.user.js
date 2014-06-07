// ==UserScript==
// @name           ztitle2
// @namespace      http://www.somethingselse.com
// @description    original code by be98se (ztitle) mod by meddlesome
// @include        *.org:88/*
// ==/UserScript==

function stripHTML(txt){
	var re = /(<([^>]+)>)/gi;
	return txt.replace(re, "");
}
if (document.getElementsByTagName("H1")[0]) 
	var title_str = stripHTML(document.getElementsByTagName("H1")[0].innerHTML);
else
	var title_str = stripHTML(document.getElementsByTagName("P")[0].innerHTML);

var title_array = title_str.split("&gt;");
//define your Site Name
var site_name = "--- ";

var page_name = window.location.href.substring(25,location.href.indexOf(".php"));
var pagearg_name = window.location.href.substring(location.href.indexOf("=")+1,location.href.indexOf("&"));
var old_title = stripHTML(document.getElementsByTagName("title")[0].innerHTML).substring(6);
var pageargArray = new Array("viewforum","newtopic","reply");

if(title_array.length>1)
	document.title = site_name + title_array[0] + " > " +  title_array[1];
else if(old_title =="")
	document.title = site_name + page_name.replace(/\b\w/g, function(match){return match.toUpperCase();});
else{
	for (i in pageargArray){
		if(pageargArray[i]==pagearg_name)
			 old_title = title_str;
	}
	document.title = site_name + old_title;
}