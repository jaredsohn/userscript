// ==UserScript==
// @name           Mute Current Song
// @namespace      http://userscripts.org/users/449946
// @include        *plug.dj/*/*
// ==/UserScript==


if(window.navigator.vendor.match(/Google/)) { 
  var div = document.createElement("div");
  div.setAttribute("onclick", "return window;");
  unsafeWindow = div.onclick();
};

function toggle(event){if (unsafeWindow.Playback.isMuted){
		setTimeout(function(){unsafeWindow.Playback.onSoundButtonClick()},2000)
	}
	unsafeWindow.API.removeEventListener(unsafeWindow.API.DJ_ADVANCE,toggle)
}

setTimeout(function() {
unsafeWindow.$('#volume').append("<div id='muteSong' style='position: absolute; top: 32px;border-style:solid; border-width:1px; padding: 1px; '> Mute current song</div>")
unsafeWindow.$('#muteSong').click(function(){
	unsafeWindow.Playback.onSoundButtonClick()

	unsafeWindow.API.addEventListener(unsafeWindow.API.DJ_ADVANCE, toggle)
	console.log('done')
})
},5000);
	
