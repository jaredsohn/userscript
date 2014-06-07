// ==UserScript==
// @name         Wall Street Journal Remove Related Stories
// @namespace    wsjRemoveRelatedStories
// @include      http://*.wsj.com/*
// @include      http://wsj.com/*
// @include      https://*.wsj.com/*
// @include      https://wsj.com/*
// @match        http://*.wsj.com/*
// @match        http://wsj.com/*
// @match        https://*.wsj.com/*
// @match        https://wsj.com/*
// @datecreated  2010-03-12
// @lastupdated  2010-03-12
// @version      0.1
// @author       Erik Vergobbi Vold
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description  This userscript will remove the related stories sections on the Wall Street Journal.
// ==/UserScript==

(function(d){
	var relatedArticles=d.getElementsByClassName('relatedArticlesAuto'),
		ra;
	for(var i=0; i<relatedArticles.length; i++){
		ra=relatedArticles[i];
		ra.parentNode.removeChild(ra);
	}
})(document);
