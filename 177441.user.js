// ==UserScript==
// @name        gamestar.de TV for free by judgeu
// @namespace   http://www.gamestar.de/
// @description gamestar.de TV for free by judgeu
// @include     http://www.gamestar.de/videos/gamestar-tv,1/*
// @version     1
// @grant       GM_xmlhttpRequest
// ==/UserScript==

window.addEventListener('load', function (e)  {
			var url = document.location.href;
			var match = false;
			if (!(match = url.toString().match(/.*?,(\d+)\.html/)))
			{
				return false;
			}
	
			var id = match[1];
			var player_div = document.getElementById('player_div');
			
			var vidUrl = false;
			var reqUrl = 'http://www.gamestar.de/_misc/videos/portal/getVideoUrl.cfm?premium=0&videoId=###ID###&gtnjs=1';
			reqUrl = reqUrl.replace('###ID###', id);
			
			GM_xmlhttpRequest({
              method: "HEAD",
              url: reqUrl,
              onload: function(response) {
                vidUrl = response.finalUrl;
                
                if (!vidUrl)
                {
                    return;
                }   
                var str = '<div style="width:936px;height:559px;" id="mediaplayer"><object width="936" height="559" type="application/x-shockwave-flash" data="/jw5/player.swf" name="playerID" id="playerID"><param value="true" name="allowfullscreen"><param value="always" name="allowscriptaccess"><param value="high" name="quality"><param value="opaque" name="wmode"><param value="file=' + vidUrl + '" name="flashvars"></object></div>';
    			player_div.innerHTML = str;
              }
            });
}, false);
