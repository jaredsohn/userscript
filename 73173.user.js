// ==UserScript==
// @name           Custom Gmail Background 
// @namespace      CGB
// @description    Edit the script and replace the URL for image in the script with the image of your choice (height < 90px)
// @include        https://mail.google.com/*
// ==/UserScript==


//////////////////////////////
// EDIT VALUE FOR URL ONLY!!//
var MyUrl =  'http://www.azharb.com/buzz.gif';

////////////////////////////////
//No Editing Beyond this point//
////////////////////////////////

var css = '.aC {background: url("'+MyUrl+'") no-repeat scroll right top transparent !important }';
    var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.innerHTML = css;
		heads[0].appendChild(node); 
	}