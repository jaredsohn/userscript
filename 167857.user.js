// ==UserScript==
// @name        Watch Escapist Magazine Videos In VLC
// @description Watch Escapist Magazine Videos In VLC via VLC's HTTP Command Interface
// @include     http*://www.escapistmagazine.com/videos/view/*/*
// @version     1
// @grant       none
// ==/UserScript==


var res = document.evaluate("//param", document, null, 7, null);

var snapshotLen = res.snapshotLength;
for(var i = 0; i < snapshotLen; ++i)
{
	var currentItem = res.snapshotItem(i);
	if(currentItem.hasAttribute('name'))
	{
		if(currentItem.getAttribute('name') == 'flashvars')
		{
			var flashVarsValue = currentItem.getAttribute('value');
			if(flashVarsValue.length > 0)
			{
				var configStringToStrip = 'config=';
				if(flashVarsValue.indexOf(configStringToStrip) === 0)
				{
					var urlToJsonContainingVidUrl = decodeURIComponent(flashVarsValue.substr(configStringToStrip.length));
					GM_xmlhttpRequest({ method: "GET", url: urlToJsonContainingVidUrl, onload: function(response)
					{
						var jsonData = JSON.parse(response.responseText.replace("'", '"', 'g'));
						if(jsonData.playlist.length > 1)
						{
							var vlcUrlEncoded = "http://127.0.0.1:6669/requests/status.xml?command=in_play&input=" + encodeURIComponent(jsonData.playlist[1].url);
							GM_xmlhttpRequest({ method: "GET", url: vlcUrlEncoded, onload: function(response2){}});
						}
					}});
				}
			}
			break;
		}
	}
}