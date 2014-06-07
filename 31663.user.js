// ==UserScript==
// @name           Wikipedia Did You Mean
// @namespace      wpdidyoumean
// @description    Adds a "Did You Mean" to Wikipedia search.
// @include        http://*.wikipedia.org/*search=*
// ==/UserScript==

	var search = document.getElementById ('searchText').value;

	GM_xmlhttpRequest ({
		method: 'GET',
		url: 'http://www.google.com/search?q='+search,
		onload: function (response) {
			try {
				var data = response.responseText;

				// look for <font color="#cc0000" ... </font>, and then till <br>
				var match = data.match (/<font color="#cc0000".+?<\/font>(.+?)&nbsp;&nbsp;<br>/);

				// strip off all the html from the captured regex, and we have the clean query
				var query = match [1].replace (/<[^>]+?>/g, '');
				var queryHTML = 'Did you mean: <span class="searchmatch"><a href="/?search='+query+'">'+query+'</a></span><hr>';

				var didyoumean = document.createElement ('p');
				didyoumean.id = 'didyoumean';

				var search = document.getElementById ('search');
				search.parentNode.insertBefore (didyoumean, search.nextSibling);

				document.getElementById ('didyoumean').innerHTML = queryHTML;
			} catch (e) {
			}
		}
	});
