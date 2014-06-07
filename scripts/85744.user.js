// ==UserScript==
// @name           Downloader of Videos from Youtube.
// @namespace      www.userscripts.org
// @include        *youtube.com/watch?v=*
// @description    Download Youtube videos.
// ==/UserScript==

(function() {
	
	(function(){var h=function(e,c){var a=this,g=document,f;a.e=g.createElement(e);if(c)for(f in c)if(f.toString()==="class")a.e.className=c[f];else a.e.setAttribute(f,c[f]);a.child=function(b){if(typeof b!=="object"||typeof b.length!=="number"||typeof b.splice!=="function")b=[b];for(var d=0,i=b.length;d<i;d++){if(typeof b[d]==="undefined")break;typeof b[d].asDOM!=="undefined"?a.e.appendChild(b[d].asDOM()):a.e.appendChild(b[d])}return a};a.html=function(b,d){if(d=d||false)a.e.innerHTML=b;else a.e.innerHTML+=b;return a};a.asDOM=function(){return a.e};a.asHTML=function(){var b=g.createElement("div");b.appendChild(a.e);return b.innerHTML};return a};window.DOMBuilder=function(e,c){return new h(e,c)};window.DOMBuilder.DOM=function(e){var c=document.createDocumentFragment();for(e=(new h("div")).child(e).asDOM().childNodes;e.length;)c.appendChild(e[0]);return c}})();
	function indexOf(array, item) {
		for (var i = 0, l = array.length; i < l; i++) if (array[i] === item) return true;
		return false;
	};
	var _ = DOMBuilder,
	dlURL = null,
	formatList = null,
	layerStyles = '',
	indexOf;
	
	layerStyles += 'div#download_links {width:100%;text-align:right;position:fixed;left:0;bottom:0;color:rgb(0,0,0);}';
	
	document.getElementsByTagName('head')[0].appendChild(
	_('style', { 'type':'text/css' }).html(layerStyles).asDOM()
	);
	
	
	var inputs = document.getElementsByTagName('input'),
	video_id, keyString, key;
	
	for (i = 0, max = inputs.length; i < max; i++) {
		if (inputs[i].name == 'video_id') {
			video_id = inputs[i].value;
			break;
		}
	};
	
	video_info = document.getElementsByTagName('embed')[0].getAttribute('flashvars');
	token = video_info.substr(video_info.search(/&t=[^&]/)).split('&')[1];
	var dlURL = 'http://www.youtube.com/get_video?video_id=' + video_id + '&asv=3&' + token;

	var formats, collect = [], i, max;
	formats = decodeURI(document.getElementsByTagName('embed')[0].getAttribute('flashvars').split('fmt_map=')[1].split('&')[0]).split('%2C');
	for (i = 0, max = formats.length; i < max; i++) {
		collect.push(parseInt(formats[i].split('%2F')[0], 10));
	}
	var formatList = collect;
	
	document.body.appendChild(_.DOM(
	_('div', { 'id':'download_links' }).child(
	_('div').html(function() {
		return (indexOf(formatList, 37) ? (_('a', { 'href':dlURL+'&fmt=37', 'title':'HD(higher) MP4.' }).html('1080p').asHTML() + ' | ') : '') +
		(indexOf(formatList, 22) ? (_('a', { 'href':dlURL+'&fmt=22', 'title':'HD(lower) MP4' }).html('720p').asHTML() + ' | ') : '') +
		_('a', { 'href':dlURL+'&fmt=18', 'title':'Standard MP4' }).html('480p').asHTML() + ' | ' +
		_('a', { 'href':dlURL+'&fmt=34', 'title':'Low quality FLV' }).html('320p').asHTML();
	}())
	)
	));
})();
