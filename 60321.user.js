// ==UserScript==
// @name			Google Analytics Referring Source Detail Links
// @author			Erik Vold
// @namespace		gaReferringSourceDetail
// @include			https://www.google.com/analytics/reporting/referring_link_detail?*
// @include			https://www.google.com/analytics/reporting/referring_source_detail?*
// @match			https://www.google.com/analytics/reporting/referring_link_detail?*
// @match			https://www.google.com/analytics/reporting/referring_source_detail?*
// @version			0.1.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-10-22
// @lastupdated		2009-12-18
// @description		This userscript will make the source on the source detail reports of Google Analytics into a link.
// ==/UserScript==

(function(){
	var newA = document.createElement('a'),
		title1=document.getElementById("report_title_details_1");
	if(!title1) return;
	var domain=title1.innerHTML.replace(/(^\s+|\s+$)/gi,"");
	newA.href="http://"+domain;
	newA.target="_blank";
	newA.innerHTML = domain;
	title1.innerHTML='';
	title1.appendChild(newA);

	newA = document.createElement('a')
	var title2=document.getElementById("report_title_details_2");
	if(!title2) return;
	var page=title2.innerHTML.replace(/(^\s+|\s+$)/gi,"");
	newA.href="http://"+domain+page;
	newA.target="_blank";
	newA.innerHTML = page;
	title2.innerHTML='';
	title2.appendChild(newA);
})();