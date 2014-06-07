// ==UserScript==
// @name          Download FB Album - zipper
// @version       0.0.1
// @description   Download Facebook Album by One Click.
// @namespace     http://userscripts.org/users/473528
// @include       htt*://*.facebook.com/media/set/*
// @match         http://*.facebook.com/media/set/*
// @match         https://*.facebook.com/media/set/*
// @exclude       htt*://*static*.facebook.com*
// @exclude       htt*://*channel*.facebook.com*
// @exclude       htt*://developers.facebook.com/*
// @exclude       htt*://upload.facebook.com/*
// @exclude       htt*://*onnect.facebook.com/*
// @exclude       htt*://*acebook.com/connect*
// @exclude       htt*://*.facebook.com/plugins/*
// @exclude       htt*://*.facebook.com/l.php*
// @exclude       htt*://*.facebook.com/ai.php*
// @exclude       htt*://*.facebook.com/extern/*
// @exclude       htt*://*.facebook.com/pagelet/*
// @exclude       htt*://api.facebook.com/static/*
// @exclude       htt*://*.facebook.com/contact_importer/*
// @exclude       htt*://*.facebook.com/ajax/*
// @exclude       htt*://www.facebook.com/places/map*_iframe.php*
// ==/UserScript==

(function(){
var anu = document.querySelectorAll('#album_pagelet i.uiMediaThumbImg');
var title=document.getElementsByTagName("h2");
var titleuser = window.prompt("What filename do you want?",title[0].innerHTML;
var zipperurl="http://localhost/zipper/zipper.php?filename="+titleuser;
for(i=0;i<anu.length;i++){
	var temp = anu[i].style.cssText;
	temp = temp.replace("background-image: url(","");
	temp = temp.replace("a.jpg);","n.jpg");
	zipperurl=zipperurl+'&file'+(i+1)+'='+temp;
}
document.getElementById("contentCol").innerHTML='<a style="font-size:20px;" href="'+zipperurl+'" target="_blank">Click here to download</a></h4>'+document.getElementById("contentCol").innerHTML;}
)()