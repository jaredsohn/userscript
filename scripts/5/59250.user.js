// ==UserScript==
// @name           spiegel col swap
// @namespace      none
// @include        http://www.spiegel.de/*
// ==/UserScript==
//

var teaserColumn =  document.getElementById("spTeaserColumn");
var smallTeaserColumn = document.getElementById("spSmallTeaserColumn");
smallTeaserColumn.style.marginRight = "0px";
smallTeaserColumn.style.marginLeft = "30px";
if (teaserColumn !== null) {
	teaserColumn.parentNode.insertBefore(teaserColumn, smallTeaserColumn);
} else {
	var articleColumn = document.getElementById("spArticleColumn");
	articleColumn.style.cssFloat = "left";
}

