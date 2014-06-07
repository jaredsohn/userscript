// ==UserScript==
// @author		Martin Ruiz
// @name           muxtape + twitter love
// @namespace      Martin Ruiz
// @description    'Love' your muxtape tracks to twitter
// @include        http://*.muxtape.com/*
// borrowed code from muxtape script by Nemanja Stefanovic
// ==/UserScript==

var lis = document.getElementsByTagName('li');
//var hexes = unsafeWindow.muxtape.hexes;

for(var i=0; i<lis.length; i++)
{
	if(lis[i].getAttribute("class") == "song")
	{		
		song_name = lis[i].childNodes[1].textContent.replace(/[\n\t]+/,'');
		var txt = "just loved "+song_name;//+" "+unsafeWindow.location.href
		
		var lv_a = document.createElement('a');
		lv_a.innerHTML=" | Love me! | ";
		lis[i].appendChild(lv_a);
		lv_a.setAttribute('style','font-weight:bold;');
		lv_a.setAttribute('id','love');
		lv_a.setAttribute('love',txt);
		lv_a.addEventListener('click', function(e) { TwitThis(e.target.getAttribute('love'),unsafeWindow.location.href); }, false);
	}
}

function TwitThis(t,url) {
	var n = t+' '+encodeURIComponent(url)
	GM_xmlhttpRequest({
		method: 'POST',
		url: 'http://twitter.com/statuses/update.xml', 
		headers: {'Content-type': 'application/x-www-form-urlencoded'}, 
		data: 'source=GRSharing&status=' + n
	})
}