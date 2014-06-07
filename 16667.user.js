// ==UserScript==
// @name           Orkut Pics Enlarger!
// @description    This one basically replaces, all small pictures in orkut with their bigger counterpart!
It does not resizes pictures locally BUT fetches bigger picture from orkut server automatically! 
// @include        http://*.orkut.com/*
// ==/UserScript==


(function() {
		var i=document.getElementsByTagName('img');
		for (var j=i.length-1; j>1; j--) {
			var linkdata =  i[j].getAttribute("src");
			if (linkdata.match("small") == "small" ) {
				linkdata=linkdata.replace(/small/,'medium');
				//GM_log(linkdata);
				var newi = document.createElement ('img');
				newi.src = linkdata;
				i[j].parentNode.replaceChild( newi ,i[j]);
			}
 		}

	})();

//CSS fix needed here on window OnLoad event