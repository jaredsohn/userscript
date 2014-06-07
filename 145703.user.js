// ==UserScript==
// @name            Coursera EXT - Play/Pause with [space bar] or click
// @description     Coursera Extension -- Enables space bar to play/pause the video. Based on http://userscripts.org/scripts/show/139512 by loopkid
// @namespace       http://sepczuk.com/
// @version         0.03
// @include         https://*.coursera.org/*/lecture/view*
// @include         https://*.coursera.org/*/lecture/preview_view*
// @match           https://*.coursera.org/*/lecture/view*
// @match           https://*.coursera.org/*/lecture/preview_view*
// @copyright       2012-2013, Damian Sepczuk, damian at sepczuk period delme com; loopkid
// @downloadURL     https://userscripts.org/scripts/source/145703.user.js
// @updateURL       https://userscripts.org/scripts/source/145703.meta.js
// ==/UserScript==

function contentEval(source) {
	if ('function' == typeof source) {
		source = '(' + source + ')();';
	}
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.textContent = source;
	document.body.appendChild(script);
	document.body.removeChild(script);
}


function fixVideoPlayerShortcuts() {

	// Check every 300ms if video player has finished loading
	var qlchecker = window.setInterval(function () { checkForQL_player(); }, 300);

	function checkForQL_player() {
		if (typeof QL_player == "undefined") return;

        // Disable checking of video player load status
        window.clearInterval(qlchecker);
		var playOrPause = function(player, media) {
            if (media.paused || media.ended) {
                media.play();
            } else {
                media.pause();
            };
        };
        SPACEBAR_KEY = 32;

        QL_player.mediaelement_handle.options.keyActions.push({keys: [SPACEBAR_KEY], action: playOrPause});
        QL_player.mediaelement_media.addEventListener('click', function(){playOrPause(undefined, QL_player.mediaelement_media)});
	}
}

contentEval(fixVideoPlayerShortcuts);