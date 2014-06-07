// ==UserScript==
// @name           Noiseporn Download Always
// @namespace      noiseporn.com
// @description    The play-only flash player gets a download option :)
// @include        http://www.noiseporn.com/
// ==/UserScript==

var entries = document.getElementById("entries");
var objectsInEntries = entries.getElementsByTagName('object');

for(x=0;x<objectsInEntries.length;x++) {
	if(objectsInEntries[x].id.substr(0,11) == "audioplayer") {
		var player = objectsInEntries[x];
		var params = player.getElementsByTagName("param");
		for(y=0;y < params.length; y++) {
			if(params[y].name=="FlashVars") {
				urlMess = params[y].value;
				var r = new RegExp(/soundFile=(.+)$/gi);			
				var m = r.exec(urlMess);
				url = unescape(m[1]);
				elem = document.createElement('a');
				elem.innerHTML="Download MP3"
				elem.href=url;
    			player.parentNode.insertBefore(elem, player.nextSibling);
			}
		}
	}	
}
