// ==UserScript==
// @name Facebook No-Chat!
// @author Vasil Dinkov
// @namespace http://vadikom.com/dailies/how-to-disable-and-hide-the-facebook-chat/
// @version 1.1
// @description Makes sure you are unavailabe for chat, hides the obtrusive chat floating box/sidebar and centers the rest of the page.
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

// hide the chat sidebar/floating box
DOM.addCSS('\
	.fbChatSidebar, .fbDockWrapper  {\
		display:none !important;\
	}\
');

// sign out of chat, disable the sidebar on init and on window resize
// so idiotic approach due to Chrome's lack of support for unsafeWindow
var signOut = 'if(window.chatOptions)chatOptions.sendVisibility(false);',
	disableSidebar = 'if(window.ChatSidebar)ChatSidebar.disable();';
location.href = "javascript:if(window.Arbiter){Arbiter.subscribe('sidebar/initialized',function(){" + disableSidebar + signOut + "});window.addEventListener('resize',function(){" + disableSidebar + "},false);};void(0)";

})();