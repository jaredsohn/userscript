// ==UserScript==
// @name           Torrentz.com Direct Download
// @author         SpookyET
// @namespace      http://www.studioindustryllc.com
// @description    Adds links to the .torrent files on www.torrentz.com
// @version        1.0.4
// @date           2007-03-14
// @include        http://torrentz.com/*
// @include        http://*.torrentz.com/*
// ==/UserScript==

/* NOTE:
-------------------------------------------------------------------------------
I suspect that it is possible to directly download the file without
using a derefer service. AJAX can be used to download the contents of the file.
However there is no way to save the torrent with javascript. 
The data uri has a max size of 4KiB resulting in the truncation of the torrent.
The best way would be to encode a flash movie with base64 and embed into this
script. Javascript would pass the torrent data to the flash movie, which will
invoke the SAVE dialogue.
-------------------------------------------------------------------------------
*/

(function(){		
	GM_addStyle(
		'div#p-body-download-locations p a' +
		'{' +
			'float: left !important;' +
			'width: auto !important;' +
		'}' +
		
		'div#p-body-download-locations p a.direct-download' +
		'{' +
			'margin-right: 20px;' +
		'}' +
		
		'div#p-body-download-locations p a.direct-download-disabled' +
		'{' +
			'visibility: hidden;' +
			'margin-right: 20px;' +
		'}' +
		
		'div#p-body-download-locations p:after' +
		'{' +
			'content: ".";' +
			'display: block;' +
			'height: 0;' +
			'clear: both;' +
			'visibility: hidden;' +
		'}');
		
	
	function createAnchorElement(url, classAttributeValue, idAttributeValue)
	{
	    var anchorElement = document.createElement('a');
	    anchorElement.setAttribute('href', 'http://ultimod.org/?url=' + url);
		anchorElement.setAttribute('id', idAttributeValue || null);
	    anchorElement.setAttribute(
			'class',
			classAttributeValue || 'direct-download');
			
	    anchorElement.setAttribute('title', 'Direct Dwnload');
	    anchorElement.appendChild(document.createTextNode("[D]"));
	    
	    return anchorElement;
	}
	
	function scrapeTorrentPage(requestURL, processResponseFunction)
	{		
		GM_xmlhttpRequest({
			method: 'get',
			url: requestURL,
			onload: function(response)
			{
				if (response.readyState != 4)
				{
					return;
				}

				processResponseFunction(response.responseText);
			}	
		});
	}
	
	function enableAnchorElement(
		disabledAnchorElementId,
		torrentSiteURL,
		responseContent,
		hrefRegex)
	{
		var disabledAnchorElement;
		var torrentPath = responseContent.match(hrefRegex);
		
		if (!torrentPath)
		{
			return;
		}
		
		downloadAnchorElement = createAnchorElement(
			(torrentSiteURL || '') + torrentPath);
			
		disabledAnchorElement = document.getElementById(
			disabledAnchorElementId);
			
		disabledAnchorElement.parentNode.replaceChild(
			downloadAnchorElement, disabledAnchorElement);
	}
	
	var anchorElements = document.getElementsByTagName('a');
	var downloadAnchorElement;
	var hrefAttributeValue;
	var torrentId;
	var match;
	var torrentIdRegex = /\d+/;
	var urlRegex = new RegExp(
		'(https?):\/\/' +                        // protocol
			'(www.)?([-A-Z0-9.]+)' +             // hostname
			'(\/[-A-Z0-9+&@#\/%=~_|!:,.;?]*)?',  // pathname
		'i');

	for (var index = 0, anchorElement;
		anchorElement = anchorElements[index];
		index++)
	{		
		hrefAttributeValue = anchorElement.getAttribute('href');
		match = urlRegex.exec(hrefAttributeValue);
		
		if (!match || !(match.length > 1))
		{
			continue;
		}
		
		switch (match[3])
		{
			case 'snarf-it.org':
				downloadAnchorElement = createAnchorElement(
					hrefAttributeValue.replace(
						'viewTorrent',
						'downloadTorrent').replace('.html', '.torrent'));
				break;
				
			case 'torrentspy.com':
				torrentId = hrefAttributeValue.match(torrentIdRegex);
		   		downloadAnchorElement = createAnchorElement(
		   			'http://www.torrentspy.com/download.asp?id=' + torrentId);
				break;
				
			case 'newtorrents.info':
				downloadAnchorElement = createAnchorElement(
					hrefAttributeValue.replace(
						/(http:\/\/[^\/]+\/)torrent\/\d+\/(.*?)\.html/g,
						"$1down.php?p=$2_[www.NewTorrents.info].torrent"));
				break;
				
			case 'torrentportal.com':
				downloadAnchorElement = createAnchorElement(
					hrefAttributeValue.replace('details', 'download'));
				break;
				
			case 'btmon.com':
				downloadAnchorElement = createAnchorElement(
					hrefAttributeValue.replace('.html', ''));
				break;
			
			case 'thepiratebay.org':
				torrentId = hrefAttributeValue.match(torrentIdRegex);
		    	downloadAnchorElement = createAnchorElement(
		    		'http://torrents.thepiratebay.org/hashtorrent/' +
		    		torrentId + 
		    		'.torrent/.torrent');
				break;	
				
			case 'fenopy.com':
				downloadAnchorElement = createAnchorElement(
					hrefAttributeValue.replace('index.html', 'download.html'));
				break;
							
			case 'bt-chat.com':
				downloadAnchorElement = createAnchorElement(
					hrefAttributeValue.replace(
						'?mode=details',
						'download.php?mode=torrent'));
				break;
				
			case 'mininova.org':
				downloadAnchorElement = createAnchorElement(
					hrefAttributeValue.replace('tor', 'get'));
				break;
			
			case 'mybittorrent.com':
				torrentId = hrefAttributeValue.match(torrentIdRegex);
		    	downloadAnchorElement = createAnchorElement(
		    		'http://www.mybittorrent.com/dl/' + torrentId + '/');
					
				break;	
			
			case 'meganova.org':				
				downloadAnchorElement =
					createAnchorElement(
						'#',
						'direct-download-disabled',
						'meganova-disabled');
				
				scrapeTorrentPage(
					hrefAttributeValue,
					function(responseContent)
					{
						enableAnchorElement(
							'meganova-disabled',
							'http://www.meganova.org',
							responseContent,
							/\/torrent\/[^.]+\.torrent/i);
					});
					
				break;
			
			case 'bushtorrent.com':				
				downloadAnchorElement =
					createAnchorElement(
						'#',
						'direct-download-disabled',
						'bushtorrent-disabled');
				
				scrapeTorrentPage(
					hrefAttributeValue,
					function(responseContent)
					{
						enableAnchorElement(
							'bushtorrent-disabled',
							null,
							responseContent,
							new RegExp(
								"http://dl\\.bushtorrent\\.com" +
									"/download\\.php\\?id=\\d+&name=[^\"]+",
								'i'));
					});
					
				break;
						
			default:
				downloadAnchorElement =
					createAnchorElement('#', 'direct-download-disabled');
				
				break;
		}
		
		anchorElement.parentNode.insertBefore(
			downloadAnchorElement,
			anchorElement);
			
		index++;
	}
})();