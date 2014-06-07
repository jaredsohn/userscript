// ==UserScript==
// @name           Open Torrent with Torrent2exe
// @namespace      http://twitter.com/demanuel88
// @include        http://*
// @exclude        
// @version        1
// ==/UserScript==

(function(){
		var l = document.getElementsByTagName("a");
		var i = l.length; 
		while (i--) {
			if (l[i].href.match(/^https*:([^?]+|[^:]+)\.(torrent)$/i)) {
				var ico = document.createElement("img");
				ico.src = "http://torrent2exe.com/favicon.ico";
				l[i].parentNode.insertBefore(ico, l[i]);
				l[i].href = 'http://torrent2exe.com/scripts/get_exe.php?undefined&type=norm&url=' + l[i].href;
			}
		}
	}
})();