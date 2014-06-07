// ==UserScript==
// @name			Add Search with Google to Google Analytics Keyword Reports. http://wakeless.net
// @namespace		wakeless
// @version			0.3
// @license             BSD
// @author			Michael Gall
// @contributor		Erik Vold
// @homepage		http://wakeless.net/archive/2009/07/seo-google-analytics-greasemonkey-script-search-for-keywords
// @include			https://www.google.com/analytics/reporting/keywords?*
// @include			https://www.google.com/analytics/reporting/search_engine_detail?*
// @include			https://adwords.google.com/analytics/reporting/keywords?*
// @include			https://adwords.google.com/analytics/reporting/search_engine_detail?*
// ==/UserScript==
(function() {
	var searchEngine = "http://google.com/search";

	function isDimensionKeywords() {
		var dimensionText = document.evaluate("//div[@id='SegmentDropdown0_button']/b/b/b", document, null, 9, null).singleNodeValue;
		if( !dimensionText ) return false;

		var currentDimension = (dimensionText.innerHTML+"").replace( /^\s+/, '' ).replace( /\s+$/, '' ).toLowerCase();
		if (currentDimension != 'keyword') return false;

		return true;
	}

	function doWrapping() {
		if(!isDimensionKeywords()) return;
		var keywords = document.evaluate("//td[contains(@class,'text')]/div[contains(@class,'text_wrapper')]/div[contains(@class,'text_wrapper') and not(contains(@class,'hasSearch'))]", document, null, 7, null);
		if(keywords.snapshotLength==0) return;

		var i, keyword, keywordDiv, newA, newAs = [], firstA;
		for( i = keywords.snapshotLength-1; i > -1; i-- ) {
			keywordDiv = keywords.snapshotItem( i );
			keywordDiv.className += " hasSearch";
			keyword = keywordDiv.parentNode.title;

			firstA = document.evaluate(".//a[1]", keywordDiv, null, 9, null).singleNodeValue;
			if(firstA) firstA.setAttribute("style", "float: left;");

			newA = document.createElement('a');
			newA.title = keyword;
			newA.target = "_blank";
			newA.setAttribute("style", "float: right;");
			newA.href = searchEngine + '?q=' + encodeURIComponent(keyword);
			newA.innerHTML = "Search";

			newAs.push({
				childEle: newA,
				parentEle: keywordDiv
			});
		}
		for( i = newAs.length - 1; i > -1; i--) {
			newAs[i].parentEle.appendChild( newAs[i].childEle );
		}

		return;
	}

	doWrapping();
	document.getElementById( 'ReportContent' ).addEventListener( "DOMNodeInserted", doWrapping, false );
})();