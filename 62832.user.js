// ==UserScript==
// @name          randomZP
// @namespace     
// @description   Puts a 'random' button on Zero Punctuation sites
// @copyright Justin A. Tisi; justintisi@hotmail.com
// @include       http://www.escapistmagazine.com/videos/view/zero-punctuation*
// ==/UserScript==

var nextSibling = document.getElementById('video_player');
if ( ! nextSibling ) {
	nextSibling = document.evaluate(
		"//body//div[@class='filmstrip_video']",
		document,
		null,
		XPathResult.FIRST_ORDERED_NODE_TYPE,
		null
	);
	if (nextSibling) {
		nextSibling = nextSibling.singleNodeValue;
	}
}
if ( ! nextSibling ) {
	//give up
	return;
}

var statusEl = document.createElement('span');
statusEl.style.width = '100%';
statusEl.style.textAlign = 'right';
statusEl.style.cssFloat = 'right';

var linkEl = document.createElement('a');
linkEl.href = '#';
linkEl.innerHTML = 'randomZP';
linkEl.style.width = '100%';
linkEl.style.textAlign = 'right';
linkEl.style.cssFloat = 'right';
linkEl.addEventListener('click', function(event) {
	var videoUrls = [];
	var foundUrls = {};	//for deduping
	
	var pickRandomAndRedirect = function() {
		statusEl.innerHTML = 'Choosing a random video and redirecting';
		
		if (videoUrls.length === 0) {
			statusEl.innerHTML = 'There was an error: did not find any videos.';
			return;
		}
		
		var index = Math.floor(Math.random() * videoUrls.length);
		window.location = videoUrls[index];
	};
	
	//slurp the list of videos by fetching all pages with this url and parsing them for something like a link to a video
	var baseListUrl = 'http://www.escapistmagazine.com/videos/view/zero-punctuation?page=';
	var pageNum = 1;
	var getPageFn = function() {
		statusEl.innerHTML = 'Getting and parsing page ' + pageNum + ' of videos';
		
		GM_xmlhttpRequest({
			method: 'GET',
			url: baseListUrl + pageNum,
			onerror: function() { setTimeout(pickRandomAndRedirect, 1); },
			onload: function(response) {
				var videoLinkRegex = /<div class='filmstrip_video'><a href='(http:\/\/www.escapistmagazine.com\/videos\/view\/zero-punctuation\/[^']+?)'>/g;
				var matchFound = false;
				for (;;) {
					var regexResult = videoLinkRegex.exec(response.responseText);
					if ( !regexResult || !regexResult[1] ) {
						break;
					}
					var url = regexResult[1];
					if (! foundUrls[url]) {
						matchFound = true;
						videoUrls.push(regexResult[1]);
						foundUrls[url] = 1;
					}
				}
				if (matchFound) {
					setTimeout(getPageFn, 1);
				} else {
					setTimeout(pickRandomAndRedirect, 1);
				}
			}
		});
		pageNum++;
	};
	setTimeout(getPageFn, 1);
	
	event.stopPropagation();
	event.preventDefault();
	return false;
}, false);

nextSibling.parentNode.insertBefore(linkEl, nextSibling);
nextSibling.parentNode.insertBefore(statusEl, nextSibling);