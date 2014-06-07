// gmail-colored-diffs.user.js
// version 0.2
// 2009-12-09
// Copyright (c) 2009, Fabrice Bellingard
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
//
// ==UserScript==
// @name           	GMail Ad Remover
// @description	Removes add in GMail
// @namespace	http://gmail-ad-remover.devs.bellingard.fr
// @include        	http://mail.google.com/*
// @include        	https://mail.google.com/*
// @version        	0.2
// ==/UserScript==
//
//
// History:
//
// 0.2 - 2009/12/09 - Fix to make it work with GMail updated version
// 0.1 - 2008/08/25 - First version, needs to be widely tested.
//
// --------------------------------------------------------------------


const DEBUG = false;

window.addEventListener(
	'load', 
	function()
	{
		if (unsafeWindow.gmonkey) 
		{
			unsafeWindow.gmonkey.load(
				'1.0', 
				function(gmail) 
				{	
					debug( "Starting script..." );
				    gmail.registerViewChangeCallback( viewTypeTrigger );
				    viewTypeTrigger();

				    unsafeWindow.s_gmail = gmail;	
					
					function viewTypeTrigger(){
						var view = gmail.getActiveViewType();
						if ( view == "cv" ) {
							hideAd();
						}
					}
					
					function hideAd () {
						var conv = gmail.getActiveViewElement() ;
						debug ( conv );
						if ( conv != null ) {
							conv.childNodes[0].childNodes[1].childNodes[0].childNodes[2].style.display = "none";
						}
					}
					
				});
		}
	}, 
	true
);

function debug( message ) {
	if (DEBUG && console) {
		console.log(message);
	}
}