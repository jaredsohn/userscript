// ==UserScript==
// @name          Badoo native video player
// @namespace     http://dmitriy.geels.googlepages.com/
// @description   Watch Badoo videos with MPlayer/Xine/VLC
// @include       http://*.badoo.*/p*
// @include       http://*.badoo.*/e*
// @include       http://badoo.*/*/p*
// @include       http://badoo.*/*/e*
// ==/UserScript==

var content_type = 'video/flv';
// embed height adjust value for totem plugin
var controls_height = 27;

var video_info = null;

if(typeof unsafeWindow != 'undefined') video_info = unsafeWindow.vars.video;
else video_info = vars.video;

// if it is a video
if (video_info != null && video_info.v && video_info.v.length > 0)
{
	var width = video_info.ow;
	var height = video_info.oh;
	var src = video_info.v;
	var placeholder = document.getElementById('pw');

	if (placeholder != null)
	{
		var new_embed = document.createElement('object');
		new_embed.setAttribute('width', width);
		new_embed.setAttribute('height', parseInt(height) + controls_height);
		new_embed.setAttribute('loop', 'no');
		new_embed.setAttribute('autoplay', 'no');
		new_embed.setAttribute('type', content_type);
		new_embed.setAttribute('data', src);

		while(placeholder.firstChild) placeholder.removeChild(placeholder.firstChild);
		placeholder.appendChild(new_embed);
	}
	else
	  alert('Badoo native video player script needs updating, it is no longer compatible.');
}
