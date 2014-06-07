// ==UserScript==
// @name           BGSOUND to EMBED
// @description    Converts BGSOUND to EMBED tags.
// @include        *
//==/UserScript==

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
			embed.setAttribute('loop', (loop == null || loop == "" || parseInt(loop) < 1) ? false : loop);
		        embed.setAttribute('hidden', true);
			embed.setAttribute('volume', (volume == null || volume == "") ? 100 : volume);
		        document.body.appendChild(embed);

			created = true;
		}
        }
	elm[0].parentNode.removeChild(elm[0]);
    }
})();
