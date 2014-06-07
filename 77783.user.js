// ==UserScript==
// @name           JobMarket - Job Detail Fix
// @namespace      ArShui
// @description    Remove javascript from job detail link
// @include        http://www.jobmarket.com.hk/search/search_result.jsp*
// ==/UserScript==
//javascript:open_win_jobdetails('http://www.jobmarket.com.hk/Premium/jobdetails.jsp?job_ref_nbr=790088&source=JS');
var jdRegexp = new RegExp(/open_win_jobdetails/i);
var fixRegexp = new RegExp(/(javascript:open_win_jobdetails\(')|('\);)/mi);
var anchors = document.getElementsByTagName("a");

if (anchors.length > 0) {
	for each (var anchor in anchors) {
		if (jdRegexp.exec(anchor.href)) {
			anchor.href = anchor.href.replace(fixRegexp, "");
		}
	}
	
	window.status = "Executed Successfully (JobMark - Job Detail Fix)";
}

