// ==UserScript==
// @name        SourceForge Skip Download Countdown
// @namespace   SFSDC
// @include     http://sourceforge.net/projects/*/files/*/download*
// @include     https://sourceforge.net/projects/*/files/*/download*
// @version     1.4
// ==/UserScript==



(function(){
	if (location.href.match(/(?:\?|&)use_mirror=(.+)/))
		return;
	var dlDiv = document.getElementById("downloading");
	if (dlDiv){
		var rwA = dlDiv.getElementsByTagName('a');
		for (i=0;i<rwA.length;i++) {
			if (rwA[i].innerHTML.match("direct link") && rwA[i].getAttribute("class") == "direct-download"){	
				window.location = rwA[i].href;
				var r=document.getElementById("downloader") || document.getElementById("dl_countdown");
				if (r!==null)
					r.parentNode.removeChild(r);
				break;
			}
		}
	}
})();