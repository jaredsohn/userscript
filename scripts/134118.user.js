// ==UserScript==
// @name           GLB Play Auto-Mute
// @namespace      GLB
// @description    Auto checks the 'Mute Sound' button on replays
// @include        http://goallineblitz.com/game/replay.pl?*
// @include        http://glb.warriorgeneral.com/game/replay.pl?*
// ==/UserScript==

window.setTimeout( function()
	{
		mute = document.getElementById("use_mute");
		if(mute !=undefined) {
			mute.checked = true;
			unsafeWindow.updateMute();		
		}
	}
)
