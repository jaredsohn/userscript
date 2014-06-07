//#################################
// Flash preview remover for sheezyart:
// Removes the flash-made preview loader and loads the image directly,
// without the flash-based loader
//#################################
// version 1.1
// 2008-08-24
// Copyright (c) 2008, Jack McSlay
// byteart.studios@yahoo.com.br
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ChangeLog:
//
// 1.1: Implemented removal of front page flash preview loaders
// 1.0: First Release
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://www.greasespot.net/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name		Preview-b-gone for SheezyArt
// @namespace	jackmcslay.sheezyart.com
// @description	Removes the flash preview loader from sheezyart.
// @include		http://www.sheezyart.com/view/*
// @include		http://www.sheezyart.com/full/*
// @include		http://*.sheezyart.com/
// @include		http://*.sheezyart.com
// ==/UserScript==

var loc = "" + window.location;
var	reg0 = new RegExp("\n|\t|\r","mg");
var reg1 = new RegExp("^http://.*\.sheezyart\.com/?$","i");
var reg2 = new RegExp("^http://www\.sheezyart\.com/(full|view)/[0-9]+/?$","i");
if (loc.match (reg1) ){
if (loc.indexOf("/www.") < 0){
	var i = 0;
	var element = document.getElementById("effect" + i);
	var name = "" + element;
	var cont;
	var aTag;
	var title;
	reg1 = new RegExp("^.*<noscript>(.*)</noscript>.*$","m");
	reg2 = new RegExp("^.*&#39;(.*)&#39;.*$","m");
	while ( name != "null" && i < 5){
		aTag = element.getElementsByTagName("a")[0];
		cont = element.innerHTML.replace(reg0,"");
		cont = cont.replace (reg1,"$1");
		element.innerHTML = "<a href=\"" + aTag.href + "\">" + 
			cont + "<br/>" + 
			cont.replace (reg2,"$1") + 
		"</a>";
		
		i++;
		element = document.getElementById("effect" + i);
		name = "" + element;
	}
} }
else if (loc.match(reg2) ){

	//create functions
	var func_full =	" onclick=\"" + 
		"document.getElementById('pbg_full').style.display='block';" + 
		"document.getElementById('pbg_medium').style.display='none';" + 
	"\"";
	var func_medium = " onclick=\"" + 
		"document.getElementById('pbg_medium').style.display='block';" + 
		"document.getElementById('pbg_full').style.display='none';" + 
	"\""; 

	//get fullview and preview elements
	var mediumArt = document.getElementById ("medium_art");
	var fullArt = document.getElementById ("full_art");

	//get tags that display fullview and preview elements
	var mediumImg = mediumArt.getElementsByTagName("a")[0];
	var fullImg = fullArt.getElementsByTagName("img")[0];
	if (typeof (fullImg) == "undefined") fullImg = fullArt.innerHTML;
	else fullImg = "<img" + 
		" src=\"" + fullImg.src + "\"" + 
		" width=\"" + fullImg.width + "\"" +  
		" height=\"" + fullImg.height + "\"" +  
		func_medium +
	"/>";	

	//get the url for the preview image
	var mediumUrl = mediumArt.getElementsByTagName("script")[0].innerHTML;
	reg2 = new RegExp("^.*imageURL=(.*?)\&.*$");

	mediumUrl = mediumUrl.replace(reg0,"");
	mediumUrl = mediumUrl.replace(reg2,"$1");

	mediumArt.innerHTML =
		"<div" + 
		" style=\"align:center\"" + 
		" id=\"pbg_medium\"" + 
		">" +
			"<span style=\"cursor:pointer;\"" + func_full + ">&lt;View full submission&gt;</span><br/>" + 
			"<div style=\"width:" + mediumImg.style.width + ";height:" + mediumImg.style.height + ";\"><img" + 
				" src=\"" + mediumUrl + "\"" + func_full + 
			"/></div>" + 
		"</div>" + 
		"<div" + 
		" style=\"align:center\"" + 
		" id=\"pbg_full\"" + 
		">" +
			"<span style=\"cursor:pointer;\"" + func_medium + ">&lt;View preview image&gt;</span><br/>" + 
			fullImg + 
		"</div>"
	;

	if(loc.indexOf("full") >= 0){
		document.getElementById("pbg_full").style.display = "block";
		document.getElementById("pbg_medium").style.display = "none";

	}
	else {
		document.getElementById("pbg_medium").style.display = "block";
		document.getElementById("pbg_full").style.display = "none";
	}
}
