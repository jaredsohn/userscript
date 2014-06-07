// ==UserScript==
// @name           HideRecommendationFor163Weibo
// @namespace      http://www.raymondchen.com/greasemonkey/HideRecommendationFor163Weibo
// @description    Hide Recommendation For 163 Weibo. Dedicated to Strong(http://twitter.com/strongcn), an experienced Linux system administrator.
// @include        http://t.163.com/*
// @version	   1.0
// ==/UserScript==

var divList=document.getElementsByTagName("div");
for (var i=0;i<divList.length;i++) {
	if (divList[i].getAttribute("class")=="recommend") {
		divList[i].setAttribute("style","display: none");
		break;
	}
}