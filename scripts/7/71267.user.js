// ==UserScript==
// @name         Wall Street Journal Remove News Reel
// @namespace    wsjRemoveNewsReel
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
// @description  This userscript removes the news reel from the Wall Street Journal.
// ==/UserScript==

(function(d){
	var newsReel = d.getElementById('newsReel'),
		newsReelIFrame = d.getElementById('newsreeliframe');
	if(newsReel) newsReel.parentNode.removeChild(newsReel);
	if(newsReelIFrame) newsReelIFrame.parentNode.removeChild(newsReelIFrame);
})(document);
