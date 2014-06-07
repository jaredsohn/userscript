// ==UserScript==
// @name       RemovePopUp
// @version    1.4.2
// @description  Remove Popup from WebPages
// @match      (http(s)?://)?(([w]){3}\.)?([a-z]+\.)?([a-z]+)\.([a-z]+)(/*){0,}
// @grant       GM_getValue
// @grant       GM_setValue
// @homepage	  http://userscripts.org/scripts/show/159902
// @downloadURL	  http://userscripts.org/scripts/source/159902.user.js
// @copyright  2012+, You
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==
$(document).ready(function($) {
setInterval(function(){
setTimeout(function(){
	console.log("mail me for more: narender@unix.net");
	main($)
}, 1000);
}, 1000);
});
function main($){
	if($('.popupblock')){
		console.log("checking popupblock")
		$('.popupblock').hidden=true && $('.popupblock').hide();
	}
	 if($('#ad_creative_1')){
		console.log("checking creative")
		$('#ad_creative_1').hidden=true &&  $('#ad_creative_1').hide();
	}
	 if($('.u5')){
		console.log("checking u5")
		$('.u5').hidden=true && $('.u5').hide();
	}
	if($('#initial-feed-promo')){
		console.log("checking initial-feed-promo")		
		$('#initial-feed-promo').hidden=true && $('#initial-feed-promo').hide()
	}
	if($('.ul')){
		console.log("checking ul")
		$('.ul').hidden = true && $('.ul').hide();
	}
	if((document.location.href).match( '^(http://)userscripts.org/home/.*')){
		if($('#main')){
			console.log("checking main css setting");
			$('#content').css('overflow-x','auto');
			$('#main').css('float','right');
			$('#main').css('padding-left','22px');
		}	
	}
	if((document.location.href).match( '^(https://)www.google.co.in/')){
		if($('#pmocntr2')){
			console.log("chrome download link");
			$('#initial-feed-promo').hidden=true && $('#pmocntr2').hide();
		}
	}
}
