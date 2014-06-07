// ==UserScript==
// @name           GLB Auto-Replay
// @namespace      GLBScripts/ReplayS4
// @include        http://goallineblitz.com/game/replay.pl?*
// @version        09.01.12
// ==/UserScript==

/*
 *
 * By Joe Buffington @ userscripts.org
 * Modified By mw54finest @ GLB
 * Modified by pabst
 *
 */

if (unsafeWindow.play_data == null) {
    setTimeout(nextPlay,2000);    
}
else if (unsafeWindow.play_data[1] == null) {
    setTimeout(nextPlay,2000);    
}

function nextPlay() {
    if (unsafeWindow.pause) {
        unsafeWindow.pause();
    }
    var Buttons = document.getElementsByTagName("a");
    var ButtonsCount = Buttons.length;
    for(var i=0; i<ButtonsCount; i++) {
        var Button = Buttons[i];
	    var ButtonText = Button.innerHTML;
        if(ButtonText.indexOf("Next Play &gt;")!=-1) {
	        setTimeout("window.location.href = '" + Buttons[i].href.toString() + "';",2000);
            unsafeWindow.currentFrame = 0;
        }
    }
}

unsafeWindow.nextFrame = function() {
    if(unsafeWindow.frameSpeed == 100) {
        unsafeWindow.currentFrame++;
    }
    else {
        unsafeWindow.currentFrame += 0.5;
    }
    if (unsafeWindow.currentFrame >= unsafeWindow.play_data.length) {
        nextPlay();
    }
    else {
        unsafeWindow.updateFrame();
    }
}

