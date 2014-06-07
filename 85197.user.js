
// ==UserScript==
// @name           tromaktiko show full article
// @namespace      http://goog
// @description    Shows the full article in the same page when clicking "Read more" on tromaktiko so that you don't have to navigate away from the main page.
// @include        http://google.com/asdas
// @version        1.0
// ==/UserScript==

function getSomeDataFrom(link) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: link,
		onload: function(responseDetails) {
			var holder = document.createElement('div');
			holder.innerHTML = responseDetails.responseText.split(/<body[^>]*>((?:.|\n|\r)*)<\/body>/i)[1];
			var theObject = document.evaluate('.//*[@id="ap_span"]', holder, null, 9, null).singleNodeValue;
			alert(theObject.innerHTML);
		}
	});
}

getSomeDataFrom("http://www.google.com/");