// ==UserScript==
// @name         Wall Street Journal Remove Editors' Picks
// @namespace    wsjRemoveEditorsPicks
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
// @description  This userscript will remove the editors' picks panel on the Wall Street Journal.
// ==/UserScript==

(function(d){
	var ep=d.getElementById('carouselHighlightsLeft');
	if(!ep) return;
	ep.parentNode.parentNode.removeChild(ep.parentNode);
})(document);
