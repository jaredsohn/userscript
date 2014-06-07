// ==UserScript==
// @name          FB Chat Pop
// @author        David Tyler, Tyler Menezes
// @namespace     http://arson-media.com/
// @description   Replaces the "pling" with the old "pop" on Facebook chat.
// @include       http://facebook.com/
// @include       http://*.facebook.com/
// @match         http://facebook.com/
// @match         http://*.facebook.com/
//
// @include       https://facebook.com/
// @include       https://*.facebook.com/
// @match         https://facebook.com/
// @match         https://*.facebook.com/

// ==/UserScript==
//
unsafeWindow.onload = function(){
	var body = unsafeWindow.document.getElementsByTagName('body')[0];
	var script= document.createElement('script');
	script.type= 'text/javascript';
	script.textContent = "ChatTab.mixin('Arbiter', {playSound: function(){if(ChatConfig.get('sound_enabled')&&chatOptions.getSetting('sound'))Sound.play('/sound/pop.mp3',true);}});";
	body.appendChild(script);
};