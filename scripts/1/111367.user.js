
// BIP Chat Developpez.com
// version 0.1 BETA!
// 2011-06-20
// Copyright (c) 2010, Shikiryu
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "BIP Chat Developpez", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          BIP Chat Developpez
// @namespace     http://labs.shikiryu.com
// @description   Adding options in http://chat.developpez.com/
// @include       http://chat.developpez.com/
// ==/UserScript==

function getGlobal(callback) {
	
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.textContent = "(" + callback.toString() + ")();";
	document.body.appendChild(script);
	
}
 
function shikimain() {
	
	var shikisound 					= new Audio('http://canhelpme.com/chatdvp/ok.wav');
	var shikinotification 			= 1; // merci le "Bonjour" d'entrée :) on le compte d'avance pour éviter le *bip*
	var shikiplay 					= true;
	var shikiongletcount			= 0;
	
	$("#barreOutils").append('<a href="#" id="shikisound" title="alerte sonore">&nbsp;</a>');
	$('#shikisound').css({float:'right', width: '16px', height: '16px', 'background-image': 'url(http://canhelpme.com/chatdvp/sons.png)', 'background-position': '-16px 16px', 'display' : 'block', 'text-decoration':'none'});
	$('#shikisound').live('click', function(e){
		e.preventDefault();
		if(shikiplay){
			shikiplay = false;
			$(this).css({'background-position': '0px 16px'});
		}else{
			shikiplay = true;
			$(this).css({'background-position': '-16px 16px'});
		}
	});
	
	function shikisaveSession(){
		var onglet = $('.ongletMessage');
		var fleche = $('#conversation0 img[src="images/fleche.png"]');
		if(fleche.length !== 0 || onglet.length !== 0){
			var shikinotif = fleche.length;
			if(shikinotif > shikinotification){
				if(shikiplay) shikisound.play();
				shikinotification = shikinotif;
			}
			shikinotif = onglet.length;
			if(shikinotif > shikiongletcount){
				if(shikiplay) shikisound.play();
			}
			shikiongletcount = shikinotif;
		}
	}
		
	$(document).ajaxComplete(function(){shikisaveSession();});
	
}

getGlobal(shikimain);