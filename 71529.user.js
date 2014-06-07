// ==UserScript==
// @name         Foreign Policy Remove Share Boxes
// @namespace    fpRemoveShareBox
// @include      http://www.foreignpolicy.com/articles/*
// @include      https://www.foreignpolicy.com/articles/*
// @match        http://www.foreignpolicy.com/articles/*
// @match        https://www.foreignpolicy.com/articles/*
// @datecreated  2010-03-15
// @lastupdated  2010-03-15
// @version      0.1
// @author       Erik Vergobbi Vold
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description  This userscript will remove the share box from Foreign Policy articles.
// ==/UserScript==

(function(d){
	var shareBox=d.getElementById('share-box');
	if (shareBox) shareBox.parentNode.removeChild(shareBox);

	shareBox=d.getElementById('share-more');
	if (shareBox) shareBox.parentNode.removeChild(shareBox);
})(document);
