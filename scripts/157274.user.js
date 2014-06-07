// ==UserScript==
// @name          xHamster - NoFlash-Player
// @namespace     https://userscripts.org/users/99860
// @description   replaces Flash-Player
// @downloadURL   https://userscripts.org/scripts/source/157274.user.js
// @updateURL     https://userscripts.org/scripts/source/157274.user.js
// @version       0.3
// @match         http://xhamster.com/movies/*
// @match         http://*.xhamster.com/movies/*
// @grant         none
// ==/UserScript==

var conf = [];

// config start:
conf["autostart"] = true;
conf["loop"] = false;
conf["width"] = 638;
conf["height"] = 505;
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
	var scripts = document.getElementsByTagName('script');
	for (var i in scripts) {
		var script = scripts[i].text;
		if (script.indexOf('flashvars') == -1) {
			continue;
		}
		var server = script.split('\'srv\': \'')[1].split('\',')[0];
		var file = script.split('\'file\': \'')[1].split('\',')[0];
		if (file.substr(0,4) == 'http') {
			var url = decodeURIComponent(file);
		} else {
			var url = server+'/key='+file;
		}
		var stream = new Stream(url, 'Standard', buildPlayer(url));
		return [stream];
	}
}

function getPreferredStream(streams) {
	return streams[0];
}

var videoContainer = document.getElementById('player').parentNode;
install(videoContainer);
