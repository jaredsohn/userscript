// ==UserScript==
// @name        	DC - Chat On/Off
// @namespace   	DreadCast
// @include     	http://www.dreadcast.net/Main
// @grant       	none
// @author 		Ianouf
// @date 		06/03/2014
// @version 		0.0
// @description 	Permet de cacher/afficher le chat.
// @compat 		Firefox, Chrome
// @require      	http://code.jquery.com/jquery-1.10.2.min.js
// ==/UserScript==

jQuery.noConflict();

var isChatVisible = 0;

jQuery(document).ready(function() {
	var chatOnOff = '<div id="chatOnOff" ></div>';
	jQuery('#zone_chat').prepend(chatOnOff);
	jQuery('#chatOnOff')
		.css({'position': 'absolute', 
			'top': '3px', 
			'right': '3px', 
			'z-index': '200', 
			'width': '25px',  
			'height': '25px', 
			'background': 'url("../images/fr/design/boutons/btn_interface.png") no-repeat scroll 0 -75px rgba(0, 0, 0, 0)' 
		})
		.click(function(){
			chatOnOff = jQuery('#chatOnOff');
			zonechat = jQuery('#zone_chat .delimiter');
			if(isChatVisible == 0){
				isChatVisible=1;
				chatOnOff.css({'background-position':'-25px -75px'});
				zonechat.css({'display': 'none'});
			}else{
				zonechat.css({'display': 'inline'});
				chatOnOff.css({'background-position':'0 -75px'});
				isChatVisible = 0;
			}
		});
});

