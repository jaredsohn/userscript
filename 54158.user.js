// ==UserScript==
// @name           8bc fix
// @namespace      http://8bc.org
// @include        http://8bc.org/music/*
// ==/UserScript==

var num;
var player = document.getElementById('mp3player');
if (player) {
	var params = player.getElementsByTagName('param');
	for (var p = 0; p < params.length; p++) {
		if (params[p].name == 'FlashVars') {
			params[p].value = params[p].value
				.replace('e039b4', '33aaff')
				.replace('e039b4', '1177ff')
				.replace('e039b4', '1177ff')
				.replace('ff00ba', '66cc00')
				.replace('f987da', '0099ee')
				.replace('ff00ba', '66cc00')
				;
			reloadquick();
			setTimeout("reloadquick()", 400);
			break;
		}
	}
}

function reloadquick(){
  player.innerHTML = player.innerHTML;
}


