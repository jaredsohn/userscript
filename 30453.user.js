// ==UserScript==
// @name           PornoTube.com Video Download
// @namespace      http://www.mathemaniac.org
// @include        http://pornotube.com/media.php?*
// @include        http://www.pornotube.com/media.php?*
// ==/UserScript==

(function() { // start script scope
	var reportDiv = document.evaluate('//div[@id="icon_subscribe"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var downloadDiv = document.createElement('div');
	downloadDiv.className = "mediaUtils";
	downloadDiv.id = 'icon_download';
	GM_addStyle("div#icon_download { background: url('../images/icon_addfavorite.png') left center no-repeat; } div#icon_download a { line-height: 50px }");
	var downloadLink = document.createElement('a');
	downloadLink.appendChild(document.createTextNode('Download this video!'));
	downloadLink.href="http://www.mathemaniac.org"; // Temporary filler. Alternative line:
//	downloadLink.href="#";								         // It doesn't really matter, 'cause the href is changed as soon as we get a response from the server.
	downloadDiv.appendChild(downloadLink);
	reportDiv.parentNode.insertBefore(downloadDiv,reportDiv.nextSibling); // So much fun, this line is.
	
	
	var movieParam = document.evaluate('//param[@name="movie"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var movieHash = movieParam.getAttribute('value').match(/v=(\w+)/)[1];
	
	resourceText('http://pornotube.com//player/player.php?'+movieHash,function(res) {
		var downloadLink = document.evaluate('//div[@id="icon_download"]/a', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		var mediaId = res.match(/mediaId=(\d+)/)[1];
		var userId = res.match(/userId=(\d+)/)[1];
		var mediaDomain = res.match(/mediaDomain=(\w+)/)[1];
		downloadLink.href = 'http://'+mediaDomain+'.pornotube.com/'+userId+'/'+mediaId+'.flv'; // sprintf please kthx
	});

	
})(); // end script scope

// snagged from http://userscripts.org/users/55607.
function resourceText(url,func,key,post)
{
	if (!post && key && window.GM_getResourceText)
	{
		func(GM_getResourceText(key));
	} else {
		var options = {
			"url":url,
			"method": ( post ? "post" : "get" ),
			"headers":{
			     "User-Agent":"Mozilla/5.0 (Windows; U; Windows NT 5.1; pt-BR; rv:1.8.1.14) Gecko/20080404 Firefox/2.0.0.14",
			     "Accept":"text/json,text/xml,text/html"
			},
			"onload":function (e) {
				var ok = true;
				if (url.match("[?&]type=json"))
				{
					var rjson = evalValue(e.responseText).response;
					if (rjson.errorMessage)
					{
						if (!rjson.actions) ok = false;
						alert(rjson.errorMessage);
					}
					else if (rjson.warningMessage)
					{
						alert(rjson.warningMessage);
					}
					if (rjson.location && (!rjson.location[0] || !GM_getValue(rjson.location[0],false)))
					{
						GM_openInTab(rjson.location[1]);
						if (rjson.location[0])
						{
							alert("A new tab was opened.\nUrl: " + rjson.location[1]);
							GM_log(rjson.location);
							GM_getValue(rjson.location[0],true);
						}
					}

					if (ok)
					{
						func(e.responseText);
					}
				} else {
					if (ok)
					{
						func(e.responseText);
					}
				}
			},
			"onerror":function (e) {
				alert("An error has ocurred while requesting "+url);
			}
		};
		if (post)
		{
			var data = "";
			for ( n in key )
			{
				data += "&" + n + "=" + encodeURIComponent(key[n]);
			}
			data = data.substr(1);

			options.headers["Content-type"] = "application/x-www-form-urlencoded";
			options.headers["Content-length"] = data.length;
			options.data = data;
		}
		GM_xmlhttpRequest(options);
	}
}
