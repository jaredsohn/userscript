// ==UserScript==
// @name           rapidshare auto download
// @namespace      rapidshare
// @description    rapidshare
// @include        http://*rapidshare.com/files/*
// ==/UserScript==
;(function() {
	var config = {
mymirrors : 'TeliaSonera #3,TeliaSonera #2,TeliaSonera'
	}
	if ( unsafeWindow.c && unsafeWindow.fc) {
		var wait = unsafeWindow.c - 1;
		unsafeWindow.c = 0;
		unsafeWindow.fc();
		
		var f = document.getElementsByTagName("form");
		if ( f && f[0] ) {
			var html = f[0].innerHTML;
			if ( config.mymirrors && !config.mymirrors.match(/^\s+$/) ) {
				var regprefix = "document\\.dlf\\.action='(http[^']*)'[^>]*>\\s+";
				var regpostfix = "<br\\>";
				var favs = config.mymirrors.split(",");
				for ( var i = 0; i < favs.length; i++ ) {
					var r = new RegExp(regprefix+favs[i]+regpostfix).exec(html);
					if ( r ) {
						f[0].action = r[1];
						GM_log("Change action to: " + f[0].action);
						break;
					}
				}
			}
			GM_log("wait " + wait + " second to start");			
			setTimeout(function() {
				f[0].submit();
			},wait * 1000);
		}		
	} else {
		var f = document.getElementById("ff");
		if ( f ) {
			GM_log("submit to free user download page");
			f.submit();
		}
	}
})();