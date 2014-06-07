// ==UserScript== 
// @name           Bloglines Clip Real URL 
// @namespace      http://tps12.50webs.com
// @description    Use the real item URL instead of the BlogLines preview when clipping or blogging an item.
// @include        *bloglines.com/saveitem?* 
// ==/UserScript==  

(function() {

	var ClipRealUrl = {
		checkPage: function() {
			if (/^http:\/\/(www\.)?bloglines\.com\/saveitem?/.exec(location.href)) {
				this.fixUrl();
			}
		},
		fixUrl: function () {
			// get the Bloglines preview URL
			// at load time, there is only anchor in the 'notes' iframe
			var rte = document.getElementById('notes');
			var doc = rte.contentDocument;
			var a = doc.getElementsByTagName('a')[0];
			
			// load preview
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://www.bloglines.com' + a.getAttribute('href'),
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'text/html'
				},
				onload: function(responseDetails) {
					// grab item and set href
					var matches = /<h3><a title=\\"[^"]*\\" href=\\"([^"]*)\\" target=_top>[^<]*<\/a><\/h3>/.exec(responseDetails.responseText);
					if(matches)
						a.setAttribute('href', matches[1]);
				}
			});
		}
	}
	
	window.addEventListener('load', function() { ClipRealUrl.checkPage(); }, true);	
	
})();