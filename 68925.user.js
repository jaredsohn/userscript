// ==UserScript==
// @name           YouTube Video Downloader
// @version        1.5
// @namespace      rparman
// @include        http://*youtube.com/watch*
// @include        http://*youtube.com/user*
// @description    Hover your mouse over the bottom edge of the browser viewport to see download options.
// ==/UserScript==

(rparman_youtube_video_downloader = function() {

	// Include DOMBuilder <http://github.com/skyzyx/dombuilder/>, compressed with Google Closure Compiler.
	(function(){var h=function(e,c){var a=this,g=document,f;a.e=g.createElement(e);if(c)for(f in c)if(f.toString()==="class")a.e.className=c[f];else a.e.setAttribute(f,c[f]);a.child=function(b){if(typeof b!=="object"||typeof b.length!=="number"||typeof b.splice!=="function")b=[b];for(var d=0,i=b.length;d<i;d++){if(typeof b[d]==="undefined")break;typeof b[d].asDOM!=="undefined"?a.e.appendChild(b[d].asDOM()):a.e.appendChild(b[d])}return a};a.html=function(b,d){if(d=d||false)a.e.innerHTML=b;else a.e.innerHTML+=b;return a};a.asDOM=function(){return a.e};a.asHTML=function(){var b=g.createElement("div");b.appendChild(a.e);return b.innerHTML};return a};window.DOMBuilder=function(e,c){return new h(e,c)};window.DOMBuilder.DOM=function(e){var c=document.createDocumentFragment();for(e=(new h("div")).child(e).asDOM().childNodes;e.length;)c.appendChild(e[0]);return c}})();

	// Define shortcuts and variables
	var _ = DOMBuilder,
		baseURL = null,
		formatList = null,
		layerStyles = '',
		indexOf;

	// Write some CSS for our nodes
	layerStyles += 'div#rparman_ytdl {width:100%; font-family:"Lucida Grande",Verdana,sans-serif; font-size:12px; text-align:right; opacity:0.1; position:fixed; bottom:0; left:0; color:#fff; background-color:#000; background-attachment:fixed; -webkit-transition:opacity 0.3s; -moz-transition:opacity 0.3s}';
	layerStyles += 'div#rparman_ytdl:hover {opacity:0.7;}';
	layerStyles += 'div#rparman_ytdl div {padding:5px 10px;}';
	layerStyles += 'div#rparman_ytdl div a {color:#fff;}';

	// Add the <style> tag.
	if (navigator.userAgent.match(/AppleWebKit/)) { // Safari
		var style = _('style', { 'type':'text/css' }).asDOM();
		document.getElementsByTagName('head')[0].appendChild(style);
		style.innerText = layerStyles;
	}
	else { // Everything else
		document.getElementsByTagName('head')[0].appendChild(
			_('style', { 'type':'text/css' }).html(layerStyles).asDOM()
		);
	}

	// Fail
	if (!document.getElementsByTagName('embed')[0]) {
		document.body.appendChild(_.DOM(
			_('div', { 'id':'rparman_ytdl' }).child(
				_('div').html('Flash blocker? Whitelist YouTube and refresh.')
			)
		));
		return false;
	}

	// Format map
	var formatMap = [];
	if (typeof featuredVideoMetadata !== 'undefined') {
		formatMap = unescape(featuredVideoMetadata.swf_args.fmt_url_map).split(',');
	}
	else {
		formatMap = unescape(document.getElementsByTagName('embed')[0].getAttribute('flashvars')).split('fmt_url_map=')[1].split(',');
	}

	formatMap = (function(formatMap) {
		var out = [], i, max, keypair;
		for (i = 0, max = formatMap.length; i < max; i++) {
			keypair = formatMap[i].split('|');
			out[keypair[0]] = keypair[1];
		}
		return out;
	})(formatMap);

	// Add this function to determine whether a value is contained in an array
	indexOf = function(array, item) {
		for (var i = 0, l = array.length; i < l; i++) if (array[i] === item) return true;
		return false;
	};

	// Return the list of available formats for the video
	formatList = (function() {
		var formats, collect = [], i, max;
		formats = decodeURI(document.getElementsByTagName('embed')[0].getAttribute('flashvars').split('fmt_map=')[1].split('&')[0]).split('%2C');
		for (i = 0, max = formats.length; i < max; i++) {
			collect.push(parseInt(formats[i].split('%2F')[0], 10));
		}
		return collect;
	})();

	// Add the layer to the bottom of the screen
	document.body.appendChild(_.DOM(
		_('div', { 'id':'rparman_ytdl' }).child(
			_('div').html('Download: ').html(function() {
				return (indexOf(formatList, 37) ? (_('a', { 'href':formatMap[37], 'title':'Higher definition MP4.' }).html('1080p').asHTML() + ' | ') : '') + // If available
					(indexOf(formatList, 22) ? (_('a', { 'href':formatMap[22], 'title':'High definition MP4.' }).html('720p').asHTML() + ' | ') : '') + // If available
					_('a', { 'href':formatMap[18], 'title':'Standard definition MP4.' }).html('480p').asHTML() + ' | ' + // Always
					_('a', { 'href':formatMap[34], 'title':'Low definition Flash Video (FLV).' }).html('320p').asHTML(); // Always
			}())
		)
	));

	window.rparman_youtube_video_downloader_reset = function() {
		// Reset if we need to
		var node = document.getElementById('rparman_ytdl');
		if (node) {
			node.parentElement.removeChild(node);
		}
		rparman_youtube_video_downloader();
	};
})();
