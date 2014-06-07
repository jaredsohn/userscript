// ==UserScript==
// @name Remove Face Chat
// @author Vasil Dinkov
// @namespace http://vadikom.com/dailies/how-to-disable-and-hide-the-facebook-chat/
// @version 1.2
// @description Makes sure you are unavailbe for chat, hides the obtrusive chat floating box/sidebar and centers the rest of the page.
// @include http://*.facebook.com/*
// @include https://*.facebook.com/*
// ==/UserScript==

(function () {

var DOM = {
	addCSS: function(cssText) {
		var style = document.createElement('style');
		style.setAttribute('type', 'text/css');
		style.setAttribute('media', 'screen,projection');
		style.appendChild(document.createTextNode(cssText));
		document.getElementsByTagName('head')[0].appendChild(style);
	}
}

DOM.addCSS('\
	.fbChatSidebar, .fbDockWrapper  {\
		display:none !important;\
	}\
');
var signOut = 'if(window.chatOptions)chatOptions.sendVisibility(false);',
	disableSidebar = 'if(window.ChatSidebar)ChatSidebar.disable();';
location.href = "javascript:if(window.Arbiter){Arbiter.subscribe('sidebar/initialized',function(){" + disableSidebar + signOut + "});window.addEventListener('resize',function(){" + disableSidebar + "},false);};void(0)";

})();