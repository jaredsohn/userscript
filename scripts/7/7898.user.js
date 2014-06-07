// ==UserScript==
// @name           Shelfari - Linkify Discussions
// @namespace      http://mathiasbaert.be/userscripts/shelfari.com/linkifydiscussions
// @description    Fixes plaintext links to clickable ones, adds an install icon after links to userscripts.org
// @include        http://www.shelfari.com/clubdiscussiondetails*
// ==/UserScript==

// startpoint of this script
prepareDocument();

// functions
// --> setup
	/**
	 * Changes the document to toggling posts
	 */
function prepareDocument(){
	linkify(document.getElementById('ctl00_ContentPlaceHolder1_DiscussionText'));
	var posts = getPostBodies();
	for ( var i=0; i<posts.length; i++ ) {
		linkify(posts[i]);
	}
}
//<-- setup

//--> elementGetters
	/**
	 * @return array of HTMLElements
	 */
function getPostBodies(){
	return getElementsByXPath("//td[@class='opinionResponseList']");
}
//<-- elementGetters

//--> DOMhelpers
	/**
	 * @return HTMLElement
	 */
function makeImageScriptAdd(){
	var img = document.createElement('img');
	img.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAK9SURBVBgZBcHLi1VlAADw3/edc+fRmOP4YEzERxQYZGaQaQ8qRDCK+gPcGC1rYbjRWtqiTaAULWrRItwVVAaFBUIvhqjAyixIE41JB8fxzsy9c+855ztfv1/IOYPDH1/bg5N3rxnb169b/bpVt62Vpu1iCTeRsIB5fIizJUDbNI/s2rhq39EnNwCAXtVO9qt2cmGQNlc1S8Pkys1lX1zqHcCREqBtmunVIwFcu510QlAGipLRTrRlNCpi1CnYvXncpsmJte//OPtWBEh1vXqipGlZqoJuze0h3QHdAfMrzC0ncPz0Vfu2T7h/fWdDCZDqeu2dI1FvSG+QxBiUKApiQSEoAi1CWjRzecEvV7uzJUCqqunJ8UJ3pdEfZjFmRSSmoIgUsqJALtxYHDr11d+LOFwCNFW1dXp1R3eQNZApUhAzEoWszFGbSZ2kqZrtn7762K0IkKrh1o2To3pVFiJFCCIiAiBkcqYZDqVqmKCEgye+HC+LODLaiaqURBlZRhJAQIzUKVnu9RssQgnNsNowMTEmBlrIhEAU5EwIXLx0xl+XP7fUXzAV+0V3+cbrHHyjhFQN7ygnRpSRIgapDeSsRQj8+udH5vtfe/rxh21ee69zFz4JM79fP7H3lU1r4hNHTq9vqurEnh1bXF/MrtxIbi0lvYqUsxCyny6c9uCOXVJMdt11QAq1vTsfhZfLVFX78ezPF/+xsFJaHmZ1yoZ1UDWtJrWWuv/phFWeue8lcHT/e8789i4+GytTXT/0wlMPjL92aC8ASJk6ZVXD88e7Lsz+4Pzsd44d+MCbZ180VozCoNi48+A9U5MTz80v1a7O9cwtDiz2a3WTFTEa6QQpDX3zxxnbpre52f9Xtzfn+/PfWrw9PBV2Hzq5HkewFeuwDlOYwuTYSKczNtYRRs5ZSTPaPEDok9+eeWf22P/PLlOL9Py8xgAAAABJRU5ErkJggg==');
	return img;
}
	/**
	 * @param HTMLElement
	 * @param string
	 * @return HTMLElement link
	 */
function wrapElementInAnchor(element, href){
	var a = document.createElement('a');
	a.setAttribute('href', href||'#');
	element.parentNode.insertBefore(a, element);
	a.appendChild(element);
	return a;
}
	/**
	 * @param HTMLElement
	 * @return HTMLElement
	 */
function insertAfter(insert, marker){
	if ( marker.nextSibling ) {
		marker.parentNode.insertBefore(insert, marker.nextSibling);
	} else {
		marker.parentNode.appendChild(insert);
	}
	return insert;
}
	/**
	 * @param string
	 * @param string
	 * @return array
	 */
function getElementsByXPath(expression, element){
	var result;
	var elements = [];
	result = document.evaluate(
		expression,
		(element || document),
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for ( var i = 0; i < result.snapshotLength; i++ ) {
		elements.push(result.snapshotItem(i));
	}
	return elements;
}
	/**
	 * @param string
	 * @param HTMLElement optional
	 * @return HTMLElement or false
	 */
function getElementByXPath(expression, element){
	var result;
	if ( result = getElementsByXPath(expression, element) ) {
		return result[0];
	}
	return false;
}
	/**
	 * @param HTMLElement
	 * @todo  there are probably more efficient ways to do this
	 */
function linkify(element){
	element.innerHTML = element.innerHTML.replace(/(https?:\/\/[A-Za-z0-9-_]+\.(?:&amp;|[A-Za-z0-9-_%&\?\/.=])+)(?!['"])([^A-Za-z0-9-_%&\?\/.=]|$)/g, '<a href="$1">$1</a>$2');
	var userscriptLinks = getElementsByXPath("descendant-or-self::a[starts-with(@href, 'http://userscripts.org/scripts/')]", element);
	for ( var i=0; i<userscriptLinks.length; i++ ) {
		wrapElementInAnchor(insertAfter(makeImageScriptAdd(), userscriptLinks[i]), 'http://userscripts.org/scripts/source/'+(userscriptLinks[i].href.replace(/\D/g,''))+'.user.js').setAttribute('title','Install');
	}
}
//<-- DOMhelpers