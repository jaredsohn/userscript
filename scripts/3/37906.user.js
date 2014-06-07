// ==UserScript==
// @name Pooflinger's Mousehuntizer
// @namespace		Pooflinger
// @description		Enhance Facebook with Mousehunt Experience!
// @include        	http://*.facebook.com/*
// @include        	http://furoma.com/*
// @author 		   Peter Limpiyawon - peter [at] furoma.com

// ==/UserScript==
//===============================================================================

var source_location = "http://furoma.com/mhizer/firefox/"; // "http://userscripts.org/scripts/show/37906"; 



var the_param='obsolete_update';
var last_update_reminder=GM_getValue(the_param, "never");

if(last_update_reminder == "never"){

	var today_date = new Date();
	GM_setValue(the_param, String(today_date));
	
	ask_for_update();

}
else{
	var today = new Date();
	var one_day = 24 * 60 * 60 * 1000; //One day in milliseconds
	var interval=0;
	
	today = today.getTime(); //Get today's date
	var last_update_time = new Date(last_update_reminder).getTime();
	interval = (today - last_update_time) / one_day; //Find out how much days have passed	
	
	
	if(interval >= 7)			
			ask_for_update();
}


function ask_for_update(){

if(confirm("The MHizer has been updated and moved to a new location. You are advised to uninstall this MHizer and install the new one. \n\nWould you like to go to the new MHizer page?\n\nRemember to uninstall this MHizer afterwards.\n\nIf you click Cancel or do not uninstall this MHizer, you will be reminded every 7 days.")){							
			var today_date = new Date();
			GM_setValue(the_param, String(today_date));
			window.location.href = source_location;
			
		}

}

