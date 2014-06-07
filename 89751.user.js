// ==UserScript==
// @name           Lockerz AutoPlayNext
// @version        1.0
// @description    in co-operation with my other script called "Lockerz Playlister" this will automatically play the next video in line if you enter the captcha correctly
// @namespace      http://userscripts.org/users/244381/autoplaynext
// @include        http://www.lockerz.com/p/watch/*:*
// @require        http://userscripts.org/scripts/source/85365.user.js
// ==/UserScript==
var $ = unsafeWindow.jQuery;
var jQuery = $;

$(document).ready(function(){
	var isInIFrame = (unsafeWindow.location != unsafeWindow.parent.location) ? true : false;
	if(isInIFrame){

		$("#header").remove();
		$("#playerDiv").css("margin", "0");
		$("#contentCaptcha form").css("margin", "0 160px");
		$("#captchaInstructions").css("margin", "0").css("text-align","left");
		
		unsafeWindow.confirmWatch = function confirmWatch() {
			$.post("/content/video/award_pointz", {recaptcha_challenge_field: $("[name=recaptcha_challenge_field]").val(), recaptcha_response_field: $("[name=recaptcha_response_field]").val(), pid: unsafeWindow.videoPID, dat: unsafeWindow.comm, authenticity_token: $(".authenticity_token:first").val()}, function(data){
			
			unsafeWindow.addFinishingMessage(data);
			//alert(data.status);
			if(data.status == "success")
			{
				unsafeWindow.parent.nextVid();
				//alert("nextVid");
			}
			
			}, "json");
			return false;
		};
	}

});