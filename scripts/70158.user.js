// ==UserScript==
// @name		GrepoAlarm
// @author 		asgaroth.belem
// @version		0.1.6
// @namespace      asgblm_grepoAlarm
// @description		Grepolis Alarm script, for the units overview
// @require http://sizzlemctwizzle.com/updater.php?id=70158
// @include		http://*.grepolis.*/game/index*
// ==/UserScript==

/* CHANGELOG
 * 0.1.6
 * - Updated urls for wav files
 * 0.1.5 
 * - Added support for autoupdating http://userscripts.org/guides/45
 * 0.1.4
 * - Enhaced performance, sound are now only loaded when needed, and the script only includes the index now.
 * 0.1.3
 * - Sounds now only play when troos are returning.
 * 0.1.2
 * - Added diferent sounds for, Strenghtening, Attacks and looting, and Spying
 * 0.1.1
 * - Fixed bug where the sound wasent played
 * 0.1
 * - Initial version
 */ 
 
(function () {
	var uW;
	if (typeof unsafeWindow === 'object'){
		uW = unsafeWindow;
	} else {
		uW = window;
	}
	var $ = uW.jQuery;
	
	var lootLoaded = false;
	var loot = document.createElement('audio'); 
	var $loot = $(loot);
	$loot.attr('src', "http://www.pdsounds.org/audio/download/141/coins_dropped_on_wooden_floor.mp3");
	
	var strLoaded = false;
	var str = document.createElement('audio'); 
	var $str = $(str);
	$str.attr('src', "http://www.pdsounds.org/audio/download/47/ohhh_ahhh.mp3");
	
	var spyLoaded = false;
	var spy = document.createElement('audio'); 
	var $spy = $(spy);
	$spy.attr('src', "http://www.pdsounds.org/audio/download/44/hurray.mp3");
	
	var offset = 5;
	
	$.each(uW.UnitOverview.unit_movements, function(i,v){
		var timeout = (v.arrival_seconds_left-offset)*1000;
		if(v.incoming){
			switch(v.command_name){
				case "Increase strength":
					if(!strLoaded){
						str.load();
						strLoaded = true;
					}
					setTimeout(function(){str.play(0);}, timeout);
					break;
				case "Sea attack" : case "Resource Looting" : case "Attack":
				default:
					if(!lootLoaded){
						loot.load();
						lootLoaded = true;
					}
					setTimeout(function(){loot.play(0);}, timeout);
					break;
			}
		}
		
	});
	$.each(uW.UnitOverview.spying, function(i,v){
		var timeout = (v.arrival_seconds_left-offset)*1000;
		if(!spyLoaded){
			spy.load();
			spyLoaded = true;
		}
		setTimeout(function(){spy.play(0);}, timeout);
	});
	
	
}());
