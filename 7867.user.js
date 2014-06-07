// ==UserScript==
// @name           Shelfari - link avatars in discussions to the user page
// @namespace      http://mathiasbaert.be/userscripts/shelfari.com/linkavatars
// @description    Creates a link on the avatars in a discussion-thread, pointing to the userpage
// @include        http://www.shelfari.com/clubdiscussiondetails*
// @include        http://www.shelfari.com/bookdiscussiondetails*
// ==/UserScript==

// startpoint of this script
linkQuestionImage();
linkResponseImages();

// functions
function linkQuestionImage(){
	wrapElementInLink(getQuestionImage(), getQuestionLink());
}
function linkResponseImages(){
	var images = getResponseImages();
	for ( var i=0; i<images.length; i++ ) {
		wrapElementInLink(images[i], getResponseLink(images[i].id.replace(/^.*ResponseList_ctl(\d+).*$/,'$1')));
	}
}
	/**
	 * @return HTMLElement
	 */
function getQuestionImage(){
	return getElementsByXPath("//img[@id='ctl00_ContentPlaceHolder1_UserImage']")[0];
}
	/**
	 * @return string
	 */
function getQuestionLink(){
	return getElementsByXPath("//a[@id='ctl00_ContentPlaceHolder1_UserLink']")[0].href;
}
	/**
	 * @return array
	 */
function getResponseImages(){
	return getElementsByXPath("//img[starts-with(@id, 'ctl00_ContentPlaceHolder1_ResponseList_ct')]")
}
	/**
	 * @param int
	 * @return string
	 */
function getResponseLink(index){
	return getElementsByXPath("//a[@id='ctl00_ContentPlaceHolder1_ResponseList_ctl"+index+"_UserLink']")[0].href;
}
	/**
	 * @param HTMLElement
	 * @param string
	 */
function wrapElementInLink(element, href){
	var link = document.createElement('a');
	link.setAttribute('href', href);
	element.parentNode.insertBefore(link, element);
	link.appendChild(element);
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
