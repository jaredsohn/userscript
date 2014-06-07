// ==UserScript==
// @name           BGSound to Embed v2
// @description    Altered version of original BGSOUND to EMBED script. Converts BGSOUND to EMBED tags, and provides a "control panel" to stop or pause the sound.
// @include        *
// ==/UserScript==

// Original script altered by Nikker

// Test Pages
//http://www.spacerock.com/htmlref/BGSOUND1.html
//http://www.mountaindragon.com/html/sound4.htm
//http://www.mountaindragon.com/html/sound1.htm
//http://bgmconductor.svist.net/tests/testcase.html

(function() {
    created = false;
    elm = document.getElementsByTagName('BGSOUND');
    while (elm.length > 0) {
	if (!created) { 
		var src, loop, volume;
		if ((src = elm[0].getAttribute("src")) != null && src != "") {

			loop = elm[0].getAttribute("loop");
			volume = elm[0].getAttribute("volume");
		        
	        var embed = document.createElement('EMBED');
			embed.setAttribute('src', src);
			embed.setAttribute('autostart', true);
			embed.setAttribute('loop', (loop == null || loop == "" || parseInt(loop) < 1) ? false : ((loop == "infinite" || parseInt(loop) > 10) ? true : loop));
			embed.setAttribute('style', 'position: fixed; bottom: 0px; right: 0px; z-index: 100; height: 16px;');
			//embed.setAttribute('hidden', true);
			embed.setAttribute('volume', (volume == null || volume == "") ? 100 : volume);
		    document.body.appendChild(embed);

			created = true;
		}
    }
	elm[0].parentNode.removeChild(elm[0]);
    }
})();
