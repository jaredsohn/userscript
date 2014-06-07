// ==UserScript==
// @name           Shelfari - Relink groupimages to discussionpage
// @namespace      http://mathiasbaert.be/userscripts/shelfari.com/relinkimages
// @description    Changes the links on groupimages to point to the discussionpage of that group, instead of the aboutpage
// @include        http://www.shelfari.com/*/clubs
// @include        http://www.shelfari.com/*/groups
// @include        http://www.shelfari.com/explore/exploreGroups
// ==/UserScript==

// startpoint of this script
subtituteLinks(getGroupLinks(), /clubabout\.aspx/, 'ClubDiscussions.aspx');

// functions
/**
  * @param array
  * @param regex
  * @param string
  */
function subtituteLinks(elements, pattern, replacement){
	for ( var i=0; i<elements.length; i++ ) {
		elements[i].href = elements[i].href.replace(pattern, replacement);
	}
}
	/**
	  * @return array
	  */
function getGroupLinks(){
	return getElementsByXPath("//div[@class='friendIcon']//a[starts-with(@href, 'http://www.shelfari.com/clubabout')]");
}
	/**
	 * @param string
	 * @return array
	 */
function getElementsByXPath(expression){
	var result;
	var elements = [];
	result = document.evaluate(
		expression,
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for ( var i = 0; i < result.snapshotLength; i++ ) {
		elements.push(result.snapshotItem(i));
	}
	return elements;
}