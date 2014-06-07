// ==UserScript==
// @name          XVIDEOS - NoFlash-Player
// @namespace     https://userscripts.org/users/99860
// @description   replaces Flash-Player
// @downloadURL   https://userscripts.org/scripts/source/154945.user.js
// @updateURL     https://userscripts.org/scripts/source/154945.user.js
// @version       0.2
// @match         http://www.xvideos.com/video*
// @grant         none
// ==/UserScript==

var conf = [];

// config start:
conf["autostart"] = true;
conf["loop"] = false;
conf["width"] = 588;
conf["height"] = 476;
// config end

function Stream(url, title, player) {
	this.url = url;
	this.title = title;
	this.player = player;
}

function buildPlayer(url) {
	var player = document.createElement('EMBED');
	player.setAttribute('type', 'application/x-mplayer2');
	player.setAttribute('width', conf['width']);
	player.setAttribute('height', conf['height']);
	player.setAttribute('src', url);
	player.setAttribute('autostart', conf['autostart']);
	player.setAttribute('loop', conf['loop']);
	return player
}

function buildControlPanel(streams, activeStream, replaceElement) {
	var controlPanel = document.createElement('p');
	for (var i in streams) {
		stream = streams[i];
		if (stream == activeStream) {
			var playLink = document.createElement('b');
		} else {
			var playLink = document.createElement('a');
			playLink.style.cursor = 'pointer';
			(function() {
				var persistentCopyOfStream = stream;
				playLink.addEventListener('click', function(){replacePlayer(streams, persistentCopyOfStream, replaceElement);}, false);
			})();
		}
		playLink.appendChild(document.createTextNode(stream.title));
		controlPanel.appendChild(playLink);
		if (stream.url != null) {
			controlPanel.appendChild(document.createTextNode(' - '));
			downloadLink = document.createElement('a');
			downloadLink.href = stream.url;
			downloadLink.appendChild(document.createTextNode('Download'));
			controlPanel.appendChild(downloadLink);
		}
		controlPanel.appendChild(document.createElement('br'));
	}
	return controlPanel;
}

function replacePlayer(streams, activeStream, replaceElement) {
	var container = document.createElement('div');
	var player = buildPlayer(activeStream);
	var controlPanel = buildControlPanel(streams, activeStream, container);
	container.appendChild(activeStream.player);
	container.appendChild(controlPanel);
	replaceElement.parentNode.replaceChild(container, replaceElement);
}

function install(replaceElement) {
	var streams = getStreams();
	var preferredStream = getPreferredStream(streams);
	replacePlayer(streams, preferredStream, replaceElement);
}

function getStreams() {
	var flashPlayer = document.getElementById('flash-player-embed');
	var flashVars = flashPlayer.attributes['flashvars'].value;
	var flvUrlStart = flashVars.indexOf('flv_url=')+8;
	var flvUrlEnd = flashVars.indexOf('&', flvUrlStart);
	var url = unescape(flashVars.substring(flvUrlStart, flvUrlEnd));
	var stream = new Stream(url, 'Standard', buildPlayer(url));
	return [stream];
}

function getPreferredStream(streams) {
	return streams[0];
}

var videoContainer = document.getElementById('player');
install(videoContainer);
