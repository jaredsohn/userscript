// ==UserScript==
// @name          Search IMDb Item on Netflix
// @namespace     OTACON120
// @author        OTACON120
// @version       1.0.1
// @description   Places a "Search for this on Netflix" button on the main page of any TV show/movie page on IMDb
// @updateURL     http://userscripts.org/scripts/source/142014.meta.js
// @downloadURL   http://userscripts.org/scripts/source/142014.user.js
// @website       http://otacon120.com/user-scripts/miscellaneous/search-imdb-item-on-netflix/
// @include       http://*.imdb.com/title/tt*
// @match         http://*.imdb.com/title/tt*
// ==/UserScript==

if (document.title.match(/\(Video Game [0-9]{4}\) - IMDb/) == null) {
	var movieTitle = document.title.substr(0, document.title.indexOf(document.title.match(/ \([0-9]{4}\) -/)[0])).replace('\n', ''),
		mainImage = document.getElementById('img_primary');
		searchNetflixBtn = document.createElement('a');

	// Netflix Button
	searchNetflixBtn.href = 'http://www.netflix.com/Search?v1=' + encodeURIComponent(movieTitle);
	searchNetflixBtn.title = 'Search for ' + movieTitle + ' on Netflix';

	// Inline CSS for Netflix button
	searchNetflixBtn.style.display = 'block';
	searchNetflixBtn.style.height = '37px';
	searchNetflixBtn.style.margin = '2px 0 0';
	searchNetflixBtn.style.textIndent = '100%';
	searchNetflixBtn.style.whiteSpace = 'nowrap';
	searchNetflixBtn.style.overflow = 'hidden';

	// Netflix button image
	searchNetflixBtn.style.background = '#B9090B url(\'data:image/png;base64,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\') no-repeat center top';

	//Insert Netflix onto page
	mainImage.appendChild(searchNetflixBtn);
} else return;