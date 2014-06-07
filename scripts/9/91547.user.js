// ==UserScript==
// @name          reddit.com/r/codbo tagger
// @namespace     http://http://userscripts.org
// @description	  Quick'n'dirty attempt at an /r/codbo tagger script
// @author        djgibbon/phevans

// @include       http://reddit.com/r/codbo*
// @include       https://reddit.com/r/codbo*
// @include       http://*.reddit.com/r/codbo*
// @include       https://*.reddit.com/r/codbo*

// ==/UserScript==

(function() {

		var jsonURL = "https://spreadsheets.google.com/feeds/list/0AkMS8Rumm159dGtwaElaelJHdEZhbEY4WEt0V3JNZ3c/od6/public/values?alt=json";
		
		GM_xmlhttpRequest({
			method : 'GET',
			url    : jsonURL,
			onload : function(r){
				GM_log(r);
				var data = JSON.parse(r.responseText);
				var cssArray = [".author[href$=\"/DJGibbon\"]:after{content: \"(phevans)[PS3]\" !important;}\n"];
				for (i = 0; i < data.feed.entry.length; i++)
				{
					cssArray.push(".author[href$=\"/" + data.feed.entry[i].gsx$yourredditusername.$t + "\"]:after{content: \"(" + data.feed.entry[i].gsx$gamertag.$t + ")[" + data.feed.entry[i].gsx$system.$t + "]\" !important;}\n");
				}
				var newSS = document.createElement('style');
				newSS.type = "text/css";
				newSS.innerHTML = cssArray.join();
				document.getElementsByTagName("head")[0].appendChild(newSS);
			}
		});
})();