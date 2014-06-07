// BBC Radio Player Play Externally
// version 0.21 BETA!
// 06-07-2005
// Copyright (c) 2005, Michael Pritchard
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "BBC Radio Player Play Externally", and click Uninstall.
//
// Made thanks to http://diveintogreasemonkey.org/
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          BBC Radio Player Play Externally
// @namespace     http://www.blueghost.co.uk/bbc_rp.html
// @description   Allows you to play all content externally
// @include       http://www.bbc.co.uk/radio/aod/*
// ==/UserScript==

var more 	= document.getElementById('showmore');
var emb		= document.getElementsByTagName('embed');
var base	= "http://www.bbc.co.uk";

for (var i=0; i < emb.length; i++){
	if (emb[i].type == "audio/x-pn-realaudio-plugin"){
		src = emb[i].src;
		i = emb.length; //endif
	}
}

//detect existing link via playback img
var imgs	= document.getElementsByTagName('img');
var img		= "http://www.bbc.co.uk/radio/aod/images/ico_realplayer.gif";
for (var i=0; i < imgs.length; i++){
	if (imgs[i].src == img){
		more = false;
		src	 = "";
		i = imgs.length;
	}
}

if (more && (src.length >0) ) {
	//fetch ra src from rpm file
	var addon 	= document.createElement("div");
	addon.innerHTML = '<div id="ext_play">'+
		'<strong>Getting External Link</strong>'+
		'</div>';
	more.parentNode.insertBefore(addon, more.nextSibling);
	GM_xmlhttpRequest({
    	method: 'GET',
    	url: base+src,
    	headers: {
        	'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        	'Accept': 'application/atom+xml,application/xml,text/xml',
    	},
    	onload: function(responseDetails) {
			//var addon 	= document.createElement("div");
			if (responseDetails.status == 200){ //check response ok
				addon.innerHTML = '<div id="ext_play">'+
					'<a href="'+responseDetails.responseText+'" title="Play in standalone Player">' +
					'<img src="http://www.bbc.co.uk/radio/aod/images/ico_realplayer.gif" width="16" height="12" border="0" alt="Play in RealPlayer" />' +
					'Listen using stand-alone Real Player</a>'+
					'</div>';
			}else{
				addon.innerHTML = '<div id="ext_play">'+
					'<img src="http://www.bbc.co.uk/radio/aod/images/ico_realplayer.gif" width="16" height="12" border="0" alt="File Not Available" />' +
					'<strong>Error getting Link</strong>'+
					'</div>';
			}
			more.parentNode.insertBefore(addon, more.nextSibling);
   		}
	});   
}