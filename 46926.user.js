// ==UserScript==
// @name           ImageVenue.com: only image
// @namespace      rowaasr13@gmail.com
// @description    Clears ImageVenue image view page of anything except the image itself, also bypasses adverts and countdowns.
// @include        http://*.imagevenue.com/img.php?*
// @include        http://*.imagevenue.com/loc.php?*
// @include        http://*.imagevenue.com/uploadimg*
// @include        http://*.imagevenue.com/interg.php?*
// @include        http://*.imagevenue.com/tempfull-default.php?*
// ==/UserScript==

var href=window.location.href;

if(href.indexOf("loc.php?")>0||href.indexOf("img.php?")>0){
	var thepic=document.getElementById("thepic");
	if(thepic){
		document.body.innerHTML="";
		var img=document.createElement('img');
		img.src=thepic.src;
		img.addEventListener('click', function(){ this.setAttribute('height', this.getAttribute('height')?'':'100%') }, false);
		img.style.cursor='se-resize';
		document.body.appendChild(img);
	}
}

if(href.indexOf("uploadimg")>0||href.indexOf("interg.php")>0){
	var divEnabled=document.getElementById("divEnabled")
	if(divEnabled){
		var links=divEnabled.getElementsByTagName("a")
		if(links){
			window.location.replace(links[0].href)
		}
	}
}

// Won't work until GM learns to get in before all other script on page
if(href.indexOf("tempfull-default.php")>0){
	window.location.replace(href.replace(/imagevenue\.com\/tempfull-default\.php/, 'imagevenue.com/img.php'));
}