// ==UserScript==
// @name          YouPorn - NoFlash-Player
// @namespace     https://userscripts.org/users/99860
// @description   replaces Flash-Player
// @downloadURL   https://userscripts.org/scripts/source/63454.user.js
// @updateURL     https://userscripts.org/scripts/source/63454.user.js
// @version       0.2
// @match         http://www.youporn.com/watch/*
// @grant         none
// ==/UserScript==

var conf = [];

// config start:
conf["autostart"] = true;
conf["loop"] = false;
conf["width"] = 600;
conf["height"] = 470;
conf["quality"] = ['480p_370k', '480p_1200k', '240p_240k']; // descending order
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
	var downloadList = document.getElementsByClassName('downloadList')[0];
	var downloadLinks = downloadList.getElementsByTagName('a');
	var streams = [];
	for (var i in downloadLinks) {
		var link = downloadLinks[i];
		if (typeof link.href != 'undefined' && typeof link.title != 'undefined') {
			var stream = new Stream(link.href, link.innerHTML, buildPlayer(link.href));
			streams.push(stream);
		}
	}
	return streams;
}

function getPreferredStream(streams) {
	for (var i in conf["quality"]) {
		quality = conf["quality"][i];
		for (var j in streams) {
			stream = streams[j];
			if (stream.url.indexOf(quality) >= 0) {
				return stream;
			}
		}
	}
}

var videoContainer = document.getElementById('videoContainer');
install(videoContainer);
