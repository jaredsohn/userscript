// ==UserScript==
// @id             youtube.related.video@kyu
// @name           youtube show published date to related video
// @version        1.1
// @namespace      http://userscripts.org/users/417618
// @author         kyu
// @description    
// @include        http://www.youtube.com/watch*
// @grant          GM_xmlhttpRequest
// @grant          GM_xpath
// @domain         www.youtube.com
// @domain         www.googleapis.com
// @downloadURL    http://userscripts.org/scripts/source/171923.user.js
// @run-at         document-end
// ==/UserScript==

(function () {
	/*
	 * API_KEY
	 * https://developers.google.com/youtube/registering_an_application
	 */
	var API_KEY = 'PLEASE_YOUR_API_KEY';

	if (typeof GM_xpath == 'undefined') {  // for Greasemonkey and Chrome (not Scriptish)
		var GM_xpath = function(arg) {
			var nl = document.evaluate(
				arg.path,
				(arg.node || document),
				null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
				null
			);
			if (arg.all) {
				for (var i = 0, l = nl.snapshotLength, elms = []; i < l; i++) {
					elms[i] = nl.snapshotItem(i);
				}
				return elms;
			} else {
				return (nl.snapshotLength > 0) ? nl.snapshotItem(0) : null;
			}
		};
	}
	
	function VideoInfo(videoId, uploaded) {
		this.videoId = videoId;
		this.uploaded = uploaded;
		this.relatedNode = document;
	}

	var RemakeVideoInfo = (function() {

		function RemakeVideoInfo() {
			this.method = 'GET';
			this.isFirstNodeInserted = true;
			this.relatedNode = document;
		}

		RemakeVideoInfo.prototype.relatedVideo = function() {
			var videoIdButtons = GM_xpath({
				path: './/button[@data-video-ids]',
				all: true,
				node: this.relatedNode
			});

			var idArray = [];
			for (var i = 0; i < videoIdButtons.length; ++i) {
				idArray.push(videoIdButtons[i].attributes.getNamedItem('data-video-ids').value);
			}

			var idsString = idArray.join(',');
			var requestURI = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + idsString + '&fields=items(id%2Csnippet(publishedAt))&key=' + API_KEY;

			GM_xmlhttpRequest({
				method: this.method,
				url:    requestURI,
				onload: this.responseCallback.bind(this),
				onerror: function (res) {
					console.error(res);
				}
			});
		};

		RemakeVideoInfo.prototype.responseCallback = function(response) {
			var relatedVideo = JSON.parse(response.responseText);
			var videoInfos = this.jsonParse(relatedVideo);

			this.remakeRelatedVideo(videoInfos);
		};

		RemakeVideoInfo.prototype.jsonParse = function(json) {
			var items = json.items;

			var videoInfos = [];
			for (var i = 0; i < items.length; ++i) {
				var videoID = items[i].id;
				var uploaded = items[i].snippet.publishedAt;

				videoInfos[videoID] = new VideoInfo(videoID, uploaded);
			}

			return videoInfos;
		};

		RemakeVideoInfo.prototype.remakeRelatedVideo = function(videoInfos) {
			var relatedLists = GM_xpath({
				path: ".//li[@class='video-list-item related-list-item']",
				all:  true,
				node: this.relatedNode
			});

			for (var i = 0; i < relatedLists.length; ++i) {
				var dataVideoIds = GM_xpath({
					path: './/button[@data-video-ids]',
					node: relatedLists[i]
				});

				if (dataVideoIds === null) {
					continue;
				}

				var id = dataVideoIds.attributes.getNamedItem('data-video-ids').value;

				var link = relatedLists[i].firstChild;

				if (id in videoInfos) {
					var range = document.createRange();
					range.selectNodeContents(document.body);
					var date = new Date(videoInfos[id].uploaded).toLocaleString();
					link.appendChild(range.createContextualFragment('<span class="stat publishedAt">' + date + '</span>'));
				}
			}

			if (WATCH_RELATED !== null) {
				WATCH_RELATED.addEventListener('DOMNodeInserted', updateLRelatedVideo, false);
			}
			
		};

		return RemakeVideoInfo;
	})();

	function updateLRelatedVideo(event) {
		if (WATCH_RELATED !== null) {
			WATCH_RELATED.removeEventListener('DOMNodeInserted', updateLRelatedVideo, false);
		}
		WATCH_RELATED = null;

		setTimeout(function() {
			remake.relatedNode = event.relatedNode;
			remake.relatedVideo();
		}, 50);
	}

	var WATCH_RELATED = GM_xpath({
		path: 'id("watch-related")'
	});

	var remake = new RemakeVideoInfo();
	remake.relatedNode = WATCH_RELATED;
	remake.relatedVideo();
})();
