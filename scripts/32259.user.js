// Written by amras666
// version 1.0.0
// ==UserScript==
// @name           Grono.net Cleaner
// @namespace      http://grono.net*
// @description    Skrypt usuwa reklamy z serwisu Grono.net
// @include        *
// ==/UserScript==

function init() {


//reklamy graficzne

div=document.getElementsByTagName("div");
for(i=0;i<div.length;i++){


	if(div[i].innerHTML == "MP3 znajomych" ||  div[i].id == "mp3player" || div[i].className == "advertismentTop ad-billboard" || div[i].className == "ads" || div[i].className == "ad-rectangle" || div[i].className == "advertisment3"  ){
		div[i].style.display= "none";}}
		
//reklamy z boxa tekstowego
		div=document.getElementsByTagName("p");
for(i=0;i<div.length;i++){
	if(div[i].className == "adsCell"){
		div[i].style.display= "none";

	}

}
//linki do strefy, mp3, etc

div=document.getElementsByTagName("a");
for(i=0;i<div.length;i++){
	if(div[i].href.match("grono.net/strefa") || div[i].href.match("/pub/adserver/") || div[i].href.match("/users/musician/upload/") ){
		div[i].style.display= "none";

	}

}

//durne flashe

div=document.getElementsByTagName("object");
for(i=0;i<div.length;i++){
	if(div[i].id == "swffoo"){
		div[i].style.display= "none";

	}

}




}
init();