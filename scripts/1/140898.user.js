// ==UserScript==
// @name        RapidGator Premium Downloader
// @version     0.3
// @description Downloads from RapidGator account
// @namespace   https://github.com/ohec/RapidGator-Premium-Downloader
// @downloadURL https://github.com/ohec/RapidGator-Premium-Downloader/raw/master/RapidGator_Premium_Downloader.user.js
// @include     http://rapidgator.net/file/*
// @include     http://www.rapidgator.net/file/*
// ==/UserScript==
(function () {
	var gm_plugin = function () {
		var options = {
			debug:    false,
			openLink: true,  // Open by clicking the link
			openUrl:  false   // Open by setting the window href
		};

		return {
			/**
			 * Do the click
			 */
			init: function () {
				if (document.title == 'File not found') {
					this.log('File not found - Closing');
					unsafeWindow.close();
				} else {
					var downloadLinks;
					downloadLinks = document.evaluate('//div[@class="btm"]/p/a', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
					for (var i = 0; i < downloadLinks.snapshotLength; i++) {
						var link = downloadLinks.snapshotItem(i);
						var url = link.href;

						if(options.openUrl == 1) {
							unsafeWindow.location.href = url;
						} else if(options.openLink == 1) {
							link.click();
						} else {
							this.log('Opening ' + url);
						}
						//unsafeWindow.location.href = link.href;
						//link.click();
					}
				}
			},

			/**
			 * Log message
			 *
			 * @param message
			 */
			log: function (message) {
				if (options.debug > 0) {
					console.log(message);
				}
			}
		};
	}

	var gm = new gm_plugin();
	gm.init();
})();