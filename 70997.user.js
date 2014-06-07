// ==UserScript==
// @name         Google Groups Link Cleaner
// @namespace    ggroupsLinkCleaner
// @include      https://groups.google.com/group/*
// @match        https://groups.google.com/group/*
// @datecreated  2010-03-09
// @lastupdated  2010-03-09
// @version      0.1
// @author       Erik Vergobbi Vold
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description  This userscript will change links in google group threads so that the 'target' attribute is removed and the 'href' attribute goes directly to the desired link and not google's redirection url.
// ==/UserScript==

(function(d){
	var msgs = d.getElementById('msgs');
	if(!msgs) return;

	var link, links = d.evaluate("//a[contains(@href,'http://www.google.com/url?')]",d,null,7,null);
	if(links.snapshotLength === 0) return;

	for(var i=0; i < links.snapshotLength; i++){
		link = links.snapshotItem(i);
		link.removeAttribute("target");
		link.href = link.href.replace(/^http:\/\/www\.google\.com\/url\?sa=D&q=/i,"").replace(/&usg=[^=]*$/,"");
	}
})(document);
