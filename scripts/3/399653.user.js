// ==UserScript==
// @name        MyBacky
// @namespace   Made by: Ian & Jesper
// @description This script adds a background to Facebook
// @include     http://www.facebook.com/*
// @include	https://www.facebook.com/*
// @include	facebook.com/*
// @include	www.facebook.com/*
// @version     1.0
// @run-at document-end
// ==/UserScript==

var requrl = "http://mybacky.com/fbdb.php?fburl=";
var fburl = "nope";
//Check if the user is on Facebook.
window.onload = image();


function image(){
fburl = window.top.location;
fburl = ''+fburl;
if(fburl.indexOf('facebook.com')!=-1){

var fburlslash = fburl.indexOf('/',25);
var fburlquestionmark = fburl.indexOf('?');
var imgurl = "nope";
var color = "nope";
if(fburlslash!=-1){
fburl=fburl.substring(fburlslash,-length);
}
if(fburlquestionmark!=-1){
fburl=fburl.substring(fburlquestionmark,-length);
}
requrl += fburl;
//Check the database for background.
GM_xmlhttpRequest ({
  method: "GET",
  url: requrl,
  onload: function(response) {
	text=response.responseText;
	if(text.indexOf('#')==0){
	imgurl="nope";
	color=text;
	}else{
		imgurl=text;
        
	}
	//Set the background.
if(imgurl=="nope"){
	if(color!="nope"){
	GM_addStyle('body{background:'+color+' !important} #leftCol{background-color:#fff !important;}');		
	}else{
	GM_addStyle('body{background:#fff !important;color:#000 !important;line-height:1.28;margin:0;padding:0;text-align:left;direction:ltr;unicode-bidi:embed) !important} #leftCol{background-color:#fff !important;}');
	}
}else{
GM_addStyle('body{background:#fff !important;color:#000 !important;background-image:url("'+imgurl+'") !important} #leftCol{background-color:#fff !important;}');
}

}
  }
);
}
}