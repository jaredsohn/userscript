// ==UserScript==
// @name           Emusic Player
// @namespace      http://www.slothlovechunk.org/greasemonkey
// @description    Version: 0.4 .  Use a tiny flash player to play track samples instead of itunes/etc.  Written by Dana Powers @ gmail.com.  Based loosely off the del.icio.us playtagger.  I provide this to you under the terms of the GNU GPL : http://www.gnu.org/licenses/gpl.txt .
// @include        http://www.emusic.com/*
// ==/UserScript==

EP = {
	playimg: null,
	player: null,
	go: function() {
		var all = document.getElementsByTagName('a')
		for (var i = 0, o; o = all[i]; i++) {
			if(o.href.match(/m3u\/song/i)) {
				var img = o.getElementsByTagName('img')[0]
				img.addEventListener('click', EP.makeToggle(img, o.href), true)
				img.setAttribute('srcorig', img.src)
				img.style.cursor = 'pointer'
				o.parentNode.insertBefore(img, o)
				o.parentNode.removeChild(o)
	}}},
	toggle: function(img, playlist_url) {
		if (EP.playimg == img) EP.destroy()
		else {
			if (EP.playimg) EP.destroy()
			img.src = 'http://www.slothlovechunk.org/stop.gif'; EP.playimg = img;
			GM_log("Getting Sample Playlist " + playlist_url);
			GM_xmlhttpRequest({
				method:"GET",
				url: playlist_url,
				onload:function(r) {
					var track_url = r.responseText.replace(/#.*/g, '').replace(/\r?\n?/g,'');
					GM_log("Adding Flash Player with Track URL " + track_url);
					EP.player = document.createElement('span');
					EP.player.innerHTML = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"' +
						'codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0"' +
						'width="1" height="1" id="player" align="middle">' +
						'<param name="wmode" value="transparent" />' +
						'<param name="allowScriptAccess" value="sameDomain" />' +
						'<param name="flashVars" value="theLink='+track_url+'" />' +
						'<param name="movie" value="http://www.slothlovechunk.org/playtagger.swf" />' +
						'<param name="quality" value="high" />' +
						'<embed src="http://www.slothlovechunk.org/playtagger.swf" ' +
						'flashVars="theLink='+track_url+'" '+
						'quality="high" wmode="transparent" width="1" height="1" name="player" ' +
						'allowScriptAccess="sameDomain" type="application/x-shockwave-flash" ' +
						'pluginspage="http://www.macromedia.com/go/getflashplayer" /></object>';
					img.parentNode.insertBefore(EP.player, img.nextSibling);
}
			});
	}},
	destroy: function() {
		EP.playimg.src = EP.playimg.getAttribute('srcorig')
		EP.playimg = null
		EP.player.removeChild(EP.player.firstChild)
		EP.player.parentNode.removeChild(EP.player)
		EP.player = null
	},
	makeToggle: function(img, url) { return function(){ EP.toggle(img, url) }}
}

EP.go();
