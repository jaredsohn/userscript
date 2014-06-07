// ==UserScript==
// @name			Facebook:Anti-Autolike
// @namespace		Zahlii
// @description		prevents you from unintended clicking on FB "like"-button (e.g. on fake video portals)
// @version 		1.0.1
// @include			*
// @require			http://street-kicker.eu/js/jquery.js
// @require			http://street-kicker.eu/js/jQueryUI/js/jquery-ui-1.8.10.custom.min.js
// ==/UserScript==

var SCRIPTVERSION = 101;

var lang = {
	de_DE:{
		warning_found:"Achtung, es wurde ein verdächtiger Frame (ID: %id) gefunden! Soll nach Videos gesucht werden oder soll der entsprechende Frame entfernt werden?",
		warning_found_title:"Frame gefunden",
		video_found:"Video gefunden (Quelle: %url), soll es aufgerufen werden?",
		video_found_title:"Video gefunden",
		button_search:"Suchen",
		button_watch:"Aufrufen",
		button_cancel:"Abbrechen",
		button_remove:"Entfernen"
	},
	en_US:{
		warning_found:"Attention, suspicious frame found (ID: %id)! Should I search for a video or should the frame be removed?",
		warning_found_title:"Found Frame",
		video_found:"Found video (Source: %url), you want to watch it?",
		video_found_title:"Video Found",
		button_search:"Search",
		button_watch:"Watch",
		button_cancel:"Cancel",
		button_remove:"Remove"
	}
};
var i18n = 'de_DE';


(function($) {
	var IFRAMES = $('iframe');
	$.each(IFRAMES,function(i,raw) {
		var src = raw.src;
		var style = raw.getAttribute("style");
		var parent = raw.parentNode;
		var parent_style = parent.getAttribute("style");
		var parent_node_name = parent.nodeName;
		if(parent_node_name.toLowerCase() == "div") {
			if(src.match(/fblike/i)) {
				//if(raw.id == 'ifra') {
					triggerFound(raw);
				//}
			}
		}
	});

function triggerFound(raw) {
	$('head').get(0).innerHTML += '<link rel="stylesheet" type="text/css" href="http://street-kicker.eu/js/jQueryUI/css/ui-darkness/jquery-ui-1.8.10.custom.css" />';
	var msg = lang[i18n].warning_found.replace('%id',raw.id);
	var foundButtons = {};
	foundButtons[lang[i18n].button_search] = function() {
		$( this ).dialog( "close" );
		triggerSearch();
	};
	foundButtons[lang[i18n].button_remove] = function() {
		$( this ).dialog( "close" );
		$(raw).parent().remove();					
	};		
	$('<div>'+msg+'</div>').dialog({
		modal:true,
		title:lang[i18n].warning_found_title,
		buttons: foundButtons
	});
}

function triggerSearch() {
	var embed = $('embed');
	$.each(embed,function(i,value) {
		var msg2 = lang[i18n].video_found.replace('%url',value.src);
		var searchButtons = {};
		searchButtons[lang[i18n].button_watch] = function() {
			$( this ).dialog( "close" );
			location.href = value.src;
		};
		searchButtons[lang[i18n].button_cancel] = function() {
			$( this ).dialog( "close" );				
		};
		$('<div>'+msg2+'</div>').dialog({
			modal:true,
			title:lang[i18n].video_found_title,
			buttons: searchButtons
		});
	});
}
})(unsafeWindow.jQuery.noConflict());