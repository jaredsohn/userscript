// ==UserScript==
// @name        jc_mute
// @namespace   http://localhost/jiichen
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @include     http://*
// @exclude     https://*
// @downloadURL https://userscripts.org/scripts/source/140884.user.js 
// @updateURL  https://userscripts.org/scripts/source/140884.meta.js
// @description		靜音 (移除所有背景音樂的物件)
// @grant       GM_addStyle
// @grant       GM_log
// @version     2012.09.16.23h.00m
// ==/UserScript==

// 靜音

GM_addStyle("#jcMuteArea { position: fixed; right:5px; top:160px; font-size:11px; color:black; z-index:100; }");
GM_addStyle("#jcMuteArea button { font-size:11px;   font-family:Tahoma,sans-serif;   background-color:#CCDDCC;   border-top-style:solid;   border-top-color:#333333;   border-top-width:2px;   border-bottom-style:solid;   border-bottom-color:#333333;   border-bottom-width:2px;   border-left-style:solid;   border-left-color:#333333;   border-left-width:2px;   border-right-style:solid;   border-right-color:#333333;   border-right-width:2px; margin-right:1px; padding:0px;  }");

//var jquery_version = $().jquery;	// return 1.7.2

var arrAudioElements = ['embed' , 'object' , 'audio' , 'bgsound'];

$(document).ready(function() {
	
	var url_self = window.location.href;
	try {
		var url_parent = window.parent.location.href;
	} catch(e) {
		var url_parent = '';
	}
	
	if ( url_self == url_parent ) {
	
		if (jcMuteAudioElementsExists()) {
		
			var area = $('<div id="jcMuteArea"><button id="jcMuteButton" type="button" title="Remove music objects." >Mute</button><button type="button" id="jcMuteHideButton" title="Hide" >-</button></div>');
			$('body').append(area);
			
			var arrAudioElements = ['embed' , 'object' , 'audio' , 'bgsound'];
			
			$('#jcMuteButton').click(function() {
					for(var idx in arrAudioElements) {
						try {
							var sg = arrAudioElements[idx];
							$(sg).remove();
							$('iframe').contents().find(sg).remove();
							
						} catch(e) {
						}
					}
			});
			
			$('#jcMuteHideButton').click(function() {
					area.hide();
			});
			
			//area.find('#jcMuteHideButton').attr('title' , url_self );
		
		}
	
	}
	
});

function jcMuteAudioElementsExists() {
		var is_exists = false;
		for(var idx in arrAudioElements) {
			try {
				var sg = arrAudioElements[idx];
				if ($(sg).length > 0) {
					is_exists = true;
				}
				if ($('iframe').contents().find(sg).length > 0) {
					is_exists = true;
				}
				
			} catch(e) {
			}
		} // for
		return is_exists;
}
