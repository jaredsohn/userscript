// ==UserScript==
// @name          video.mail.ru native player
// @namespace     http://dmitriy.geels.googlepages.com/
// @description   Watch flash videos from Video@mail.ru with MPlayer/Xine/VLC
// @include       http://video.mail.ru/*.html*
// ==/UserScript==

var content_type = 'video/flv';
// embed height adjust value for totem plugin
var controls_height = 27;

var video_url = window.location.href.replace(new RegExp("^(http://video.mail.ru/.+)/([^/]+)\.html"), "$1/v-$2.flv");
var placeholder = document.getElementById('FlashPlayerId');

var new_embed = document.createElement('object');
new_embed.setAttribute('width', 450);
new_embed.setAttribute('height', 375);
new_embed.setAttribute('loop', 'no');
new_embed.setAttribute('autoplay', 'no');
new_embed.setAttribute('type', content_type);
new_embed.setAttribute('data', video_url);

if(placeholder.tagName == 'OBJECT') {
	new_embed.style.textAlign = "center";
	new_embed.setAttribute('width', placeholder.getAttribute('width'));
	new_embed.setAttribute('height', parseInt(placeholder.getAttribute('height')) + controls_height);

	var parentNode = placeholder.parentNode;
	parentNode.replaceChild(new_embed, placeholder);
} else {
	placeholder.style.textAlign = "center";
	while(placeholder.firstChild) placeholder.removeChild(placeholder.firstChild);

	placeholder.appendChild(new_embed);
}
