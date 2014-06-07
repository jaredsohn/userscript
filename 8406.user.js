// PlayIt, UI enhancements for del.icio.us
// Copyright: Daniel Kinzler, brightbyte.de, 2007
// Version: 0.3, 20070319
// License: GPL
//
// ==UserScript==
// @name          playit
// @namespace     http://brightbyte.de/gm/
// @description   inline players for links to media on del.icio.us 
// @include       http://del.icio.us/*
// ==/UserScript==

var playitWidth = 425;
var playitHeight = 350;

var playitSites = {
	'youtube': {
		pattern: /^http:\/\/www.youtube.com\/watch\?v=([a-zA-Z0-9_]+).*/,
		url: 'http://www.youtube.com/v/<&&id&&>&autoplay=1',
	},

	'googlevideo': {
		pattern: /^http:\/\/video.google.[a-z]+\/videoplay\?docid=([-a-zA-Z0-9_]+).*/,
		url: 'http://video.google.com/googleplayer.swf?docId=<&&id&&>&autoplay=1',
	},

	'sevenload': {
		pattern: /^http:\/\/en.sevenload.com\/videos\/([a-zA-Z0-9_]+).*/,
		url: 'http://en.sevenload.com/pl/<&&id&&>/<&&w&&>x<&&h&&>/swf',
	},

	/* bah, need different id for embedded playback
	'dailymotion': {
		pattern: /^http:\/\/www.dailymotion.com\/.*video\/([a-zA-Z0-9]+)(.+)?/,
		url: 'http://www.dailymotion.com/swf/<&&id&&>',
	}
	*/
};

////////////////////////////////////////////////////////////////////////////////////////////////////////

var playitURI = 'http://brightbyte.de/gm/playit';
var playitUA = playitURI + ' using Greasemonkey on ' + navigator.userAgent;

var playitDefaultPlayer= '<object width="<&&w&&>" height="<&&h&&>" type="application/x-shockwave-flash" data="<&&url&&>">\n'
			+ '<param name="movie" value="<&&url&&>"/>\n'
			+ '<param name="wmode" value="transparent"/>\n'
			+ '<embed type="application/x-shockwave-flash" src="<&&url&&>"'
			+ 'wmode="transparent" width="<&&w&&>" height="<&&h&&>"/>" \n'
			+ '</object>\n';

var playitCurrent = null;
////////////////////////////////////////////////////////////////////////////////////////////////////////

function playitPlay(post, button, kind, id) {
	if (playitCurrent) {
		playitStop(playitCurrent.post, playitCurrent.button, playitCurrent.kind);
	}

	button.className = "playit-stop";
	button.removeChild(button.firstChild);
	button.appendChild(document.createTextNode("x_x"));

	var player = document.createElement("div");
	player.className = "playit-player";

	var html;
	if (kind.player) html = kind.player;
	else html = playitDefaultPlayer.replace(/<&&url&&>/g, kind.url);

	html = html.replace(/<&&id&&>/g, id).replace(/<&&w&&>/g, playitWidth).replace(/<&&h&&>/g, playitHeight);
	player.innerHTML = html;

	post.insertBefore(player, null);
	playitCurrent = { post: post, kind: kind, button: button, id: id };
}

function playitStop(post, button, kind) {
	var player = document.evaluate('.//*[@class="playit-player"]', post, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	if (!player) return;

	if (kind.stop) kind.stop(player);
	player.parentNode.removeChild(player);

	button.className = "playit-play";
	button.removeChild(button.firstChild);
	button.appendChild(document.createTextNode("O.O"));

	playitCurrent = null;
}

function playitToggle(post, button, kind, id) {
	if (button.className == "playit-play") {
		playitPlay(post, button, kind, id);
	}
	else {
		playitStop(post, button, kind);
	}
}

function playitDecorateItem(e) {
	var link = document.evaluate('.//h4[@class="desc"]/a', e, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	
	for (kind in playitSites) {
		var info = playitSites[kind];
		var m = info.pattern.exec(link.href);
		if (m) {
			var id = m[ info.group ? info.group : 1 ];
			var btn = document.createElement("a");
			btn.href = "javascript:void(0)";
			btn.className = "playit-play";
			btn.title = "play it";
			btn.style.fontSize = "110%";
			btn.style.fontWeight = "bold";
			btn.style.color = "black ! important";
			btn.appendChild(document.createTextNode("O.O"));
			btn.addEventListener('click', function(ev) { playitToggle(e, btn, info, id); }, false);
			
			var cmds = document.evaluate('.//*[@class="commands"]', e, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
			cmds.appendChild( document.createTextNode("  ("));
			cmds.appendChild(btn);
			cmds.appendChild( document.createTextNode(")  "));
			break;
		}
	}
}

function playitDecorateAllItems() {
	var entries = document.evaluate('//li[starts-with(@class,"post")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var i = 0;
	var e;
	while ( (e = entries.snapshotItem(i++) ) !=null ) {
		playitDecorateItem(e);
	}
}

playitDecorateAllItems();
