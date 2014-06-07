// ==UserScript==
// @name           8bc green fix
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
				.replace('e039b4', '33aa22')
				.replace('e039b4', '11aa11')
				.replace('e039b4', '11cc11')
				.replace('ff00ba', '000000')
				.replace('f987da', '00cc00')
				.replace('ff00ba', '000000')
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


