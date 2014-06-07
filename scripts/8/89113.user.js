// ==UserScript==
// @name          Facebook Disconnect
// @version       1.0
// @description   Stop Facebook from tracking the webpages you go to
// @include       *
// @exclude       http://facebook.com
// @exclude       http://*.facebook.com
// @exclude       https://facebook.com
// @exclude       https://*.facebook.com
// ==/UserScript==

/*
  A content script that stops Facebook from tracking the webpages you go to.

  Copyright 2010 Brian Kennish

  Licensed under the Apache License, Version 2.0 (the "License"); you may not
  use this file except in compliance with the License. You may obtain a copy of
  the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
  License for the specific language governing permissions and limitations under
  the License.

  Brian Kennish <byoogle@gmail.com>
*/

(function() {
	
	/* The domain names Facebook phones home with, lowercased. */
	const DOMAINS = ['facebook.com', 'facebook.net', 'fbcdn.net'];

	/*
	Determines whether any of a bucket of domains is part of a URL, regex free.
	*/
	function isMatching(url, domains) {
		const DOMAIN_COUNT = domains.length;
		for (var i = 0; i < DOMAIN_COUNT; i++) {
			if (url.toLowerCase().indexOf(domains[i], 7) >= 7) {
				// A valid URL has seven-plus characters ("http://"), then the domain.
				return true;
			}
		}
	}

	/* Traps and selectively cancels a request. */
	if (!isMatching(location.href, DOMAINS)) {
		document.addEventListener("beforeload", function(event) {
			if (isMatching(event.url, DOMAINS)) {
				event.preventDefault();
				event.stopPropagation();
				return false;
			}
		}, true);
	}
})();