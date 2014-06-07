// ==UserScript==
// @name           Clean Seesmic
// @namespace      Clean Seesmic
// @description    Clears side bar and header from seesmic web view.
// @include        https://seesmic.com/web/*
// @match          https://seesmic.com/web/*
// ==/UserScript==
function cleanSeesmic(){
	if(/Opera|Chrome|Chromium/.test(navigator.userAgent)) {
		unsafeWindow = window;
		if(/Chrome|Chromium/.test(navigator.userAgent)){
			var div = document.createElement("div");
			div.setAttribute("onclick", "return window;");
			unsafeWindow = div.onclick();
		}
	}
	var s= unsafeWindow.document.createElement('script');
	s.src='http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js';
	s.addEventListener("load", function(){
		function getSeconds(fullTimeInSeconds) {
			fullTimeInSeconds = Math.ceil(fullTimeInSeconds);
			var output = ((fullTimeInSeconds) % 60).toFixed();
			return (output < 10 ? '0' : '') + output;
		}
		function getMinutes(fullTimeInSeconds) {
			return Math.floor((fullTimeInSeconds) / 60);
		}
		unsafeWindow.jQuery = unsafeWindow.jQuery.noConflict()
		jQuery = unsafeWindow.jQuery;
jQuery('body').append("<a href=\"javascript:undefined;\" onclick=\"if(jQuery(this).attr('data')=='hide'){jQuery('table#sideBarPanel').css('display','none');jQuery('table#headerPanel').parent().css('display','none');jQuery(this).attr('data','show').addClass('appsSideBarButtonColapse');}else{jQuery('table#sideBarPanel').css('display','inline');jQuery('table#headerPanel').parent().css('display','inline');jQuery(this).attr('data','hide').removeClass('appsSideBarButtonColapse');}jQuery('table#mainPanel a.appsSideBarButton').css('width','0').trigger('click').delay(200).trigger('click'); return false;\" data=\"hide\" style=\"position:fixed;top:0;left:0;\" class=\"appsSideBarButton\" ></a>");
	},false);
	unsafeWindow.document.getElementsByTagName('head')[0].appendChild(s);
};
window.addEventListener ("load", cleanSeesmic(), false);
