// ==UserScript==
// @name GoogleReader-Play
// @description Play button
// @homepage http://github.com/Zetruger/googlereader-play
// @author Ivan Chistyakov <zetruger@gmail.com>
// @license The MIT License (http://opensource.org/licenses/mit-license)
// @version 1.0
// @include http://www.google.com/reader/view/*
// ==/UserScript==

var formGBQF = document.querySelector("form#gbqf");
if (formGBQF && !formGBQF.querySelector("div#gbqf-player")) {
	var divPlayer = document.createElement('div');
	if (divPlayer) {
		divPlayer.id = 'gbqf-player';
		divPlayer.style.position = 'absolute';
		divPlayer.style.width = '200px';
		divPlayer.style.height = '20px';
		formGBQF.appendChild(divPlayer);
		var inputPlay = document.createElement('input');
		if (inputPlay) {
			inputPlay.type = 'button';
			inputPlay.value = 'Play';
			inputPlay.onclick = function () {
				var aLink = document.querySelector('div.audio-player-container>div.view-enclosure-parent>a');
				if (aLink && aLink.href.match(/\.mp3(\?.*)?$/i)) {
					var url = aLink.href.match(/\.mp3$/i) ? aLink.href + '?' : aLink.href;
					divPlayer.innerHTML = '<object type="application/x-shockwave-flash" data="http://flash-mp3-player.net/medias/player_mp3_mini.swf" width="200" height="20"><param name="movie" value="http://flash-mp3-player.net/medias/player_mp3_mini.swf"/><param name="bgcolor" value="#4d90fe"/><param name="FlashVars" value="autoplay=1&mp3=' + escape(url) + '"/></object>';
				} else {
					alert('Try to expand an entry.');
				}
			}
			formGBQF.insertBefore(inputPlay, divPlayer);
		}
	}
}
