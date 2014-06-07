// ==UserScript==
// @name           Yahoo HK News 'Small Link' Removal
// @namespace      mailto:ch_xxvi@yahoo.com.hk
// @description    Remove the small searching link of hot words in Yahoo HK news articles.
// @include        http://hk.news.yahoo.com/*
// @author         XXVi
// ==/UserScript==

tagsSmall = document.getElementsByTagName('small');
for (i=0;i<tagsSmall.length;i++) {
	tagsSmall[i].innerHTML = null;
}
if (i>0) {
	pmtText = unescape("<-- %u5DF2%u96B1%u85CF%u300C%u76F8%u95DC%u65B0%u805E%20-%20%u7DB2%u7AD9%u300D%u9023%u7D50%u3002%u5982%u8981%u56DE%u5FA9%uFF0C%u53EF%u5148%u66AB%u6642%u95DC%u4E0A Greasemonkey -->");
	pmt = document.createTextNode(pmtText);
	pmt = document.createElement('em').appendChild(pmt.cloneNode(true));
	pmt = document.createElement('p').appendChild(pmt.cloneNode(true));
	document.getElementById('ynstory').appendChild(pmt);
}
document.getElementById('ov_btm_ctnr').appendChild(document.getElementById('ynstory').getElementsByTagName('table')[0]);