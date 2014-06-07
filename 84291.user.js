// ==UserScript==
// @name           Videos Image Link
// @description    Turns embedded videos (Blip.tv, DailyMotion, Vimeo, YouTube and more) into images with link to video.
// @license        GPL <http://www.gnu.org/licenses/gpl.html>
// @replaces       http://userscripts.org/scripts/show/12159
// @replaces       http://userscripts.org/scripts/show/12213
// @replaces       http://userscripts.org/scripts/show/55308
// @include        *
// @exclude        http://*blip.tv/*
// @exclude        http://*dailymotion.*
// @exclude        http://*vimeo.*
// @exclude        http://*youtube.*
// ==/UserScript==

function getJSON(url, callback, callback_args) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		onload: function (result) {
			var r = result.responseText.trim();
			if(r[0] == '{') r = '['+r+']';
			
			// try JSON.parse() if available
			if(JSON && JSON.parse) {
				try {
					var json = JSON.parse(r);
				} catch(e) {
					GM_log('JSON.parse() failed, url: '+this.url+'\nexception: '+e+'\ncontent:\n'+r);
				}
			}
			
			// fall back to eval()
			if(!json) {
				if(!confirm('JSON.parse() failed on <'+this.url+'>. Do you want to use the unsafe eval() function?')) return;
				try {
					var json = eval(r);
				} catch(e) {
					if(JSON && JSON.parse) GM_log('JSON parsing with eval() failed too for: '+this.url);
					else GM_log('JSON parsing with eval() failed, url: '+this.url+'\nexception: '+e+'\ncontent:\n'+r);
					return;
				}
			}
			
			this.callback(json, this.callback_args);
		},
		onerror: function (result) {
			GM_log('download of "'+this.url+'" failed:\nstatus: '+result.status+'\nresponseText:\n'+result.responseText);
		},
		callback: callback,
		callback_args: callback_args
	});
}

function replace(element, site_name, url, thumbnailURL) {
	// replace an <object> or <embed> by a thumbnail in a link
	div = document.createElement('div');
	div.innerHTML =
		'<strong>' + site_name + ' Video</strong><br />' +
		'<a href="' + url + '" class="videoimagelink">' +
		'<img src="' + thumbnailURL + '" alt="Link to the video (thumbnail is unavailable)" style="max-width: 100%; max-height: 100%;"></a>';
	element.parentNode.replaceChild(div, element);
}

function test(element, str) {
	// search for a known URL in str and replace element with an image link
	
	// Blip.tv (requires JSON)
	if(m = str.match(/https?:\/\/blip.tv\/play\/([^\/&"']+)/)) {
		var url = 'http://blip.tv/players/episode/'+m[1];
		getJSON(
			url+'?skin=json&version=2&no_wrap=1',
			function (json, args) {
				args.push(json[0].thumbnailUrl);
				replace.apply(null, args);
			},
			[element, 'Blip.tv', url]
		);
	}
	
	// Dailymotion
	else if(m = str.match(/https?:\/\/.*dailymotion\..*\/.*\/([^\/&"'\?_]+)/)) {
		var id = m[1];
		replace(element, 'Dailymotion', 'http://dailymotion.com/video/'+id, 'http://dailymotion.com/thumbnail/160x120/video/'+id);
	}
	
	// Vimeo (requires JSON)
	else if(m = str.match(/https?:\/\/.*vimeo\..*(swf\?.*clip_id=|video\/)([^\/&"'\?]+)/)) {
		var id = m[2];
		var video_url = 'http://vimeo.com/'+id;
		getJSON(
			'http://vimeo.com/api/v2/video/'+id+'.json',
			function (json, args) {
				args.push(json[0].thumbnail_large);
				replace.apply(null, args);
			},
			[element, 'Vimeo', video_url]
		);
	}
	
	// Youtube
	else if(m = str.match(/https?:\/\/.*youtube(-nocookie)?\..*\/(v|embed)\/([^\/&"'\?]+)/)) {
		var id = m[3];
		if (id == "videoseries") return;
		replace(element, 'Youtube', 'http://youtube.com/watch?v='+id, 'http://img.youtube.com/vi/'+id+'/0.jpg');
	}
}


// iterate through <object>, <embed> and <iframe> elements
// we need arrays for safe iteration, i.e. make sure we don't miss some
// which can happen because some are replaced asynchronously and HTMLCollection is dynamic

var objects = Array.prototype.slice.call(document.getElementsByTagName('object'));
for(var i = 0; i < objects.length; i++) {
	var obj = objects[i];
	test(obj, obj.innerHTML);
}
var embeds = Array.prototype.slice.call(document.getElementsByTagName('embed'));
for(var i = 0; i < embeds.length; i++) {
	var embed = embeds[i];
	if(embed.parentNode.tagName.toLowerCase() == 'object') {
		continue;
	}
	test(embed, embed.src);
}
var iframes = Array.prototype.slice.call(document.getElementsByTagName('iframe'));
for(var i = 0; i < iframes.length; i++) {
	var iframe = iframes[i];
	test(iframe, iframe.src);
}


// if we're inside a frame that looks like it's using something like swfobject.js
// replace it with a link to the real media location

if (window != window.parent) {
	var flashvars = unsafeWindow.flashvars;
	if (flashvars.media) {
		replace(document.documentElement, window.location.host, flashvars.media, flashvars.preroll);
	}
}
