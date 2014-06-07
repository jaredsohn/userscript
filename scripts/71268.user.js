// ==UserScript==
// @name         Wall Street Journal Remove Header
// @namespace    wsjRemoveHeader
// @include      http://online.wsj.com/*
// @include      https://online.wsj.com/*
// @match        http://online.wsj.com/*
// @match        https://online.wsj.com/*
// @datecreated  2010-03-12
// @lastupdated  2010-03-15
// @version      0.1.1
// @author       Erik Vergobbi Vold
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description  This userscript will remove the header of the Wall Street Journal.
// ==/UserScript==

(function(d){
	var hat = d.getElementById('hat_div'),
		head = d.getElementsByClassName('header')[0];
	if(hat) hat.parentNode.removeChild(hat);
	if(head) head.parentNode.removeChild(head);
})(document);
