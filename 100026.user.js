// ==UserScript==
// @name CmsMembersControl Unveiler
// @namespace http://k11i.biz/
// @include http://techtarget.itmedia.co.jp/tt/news/*
// ==/UserScript==

const CMS_MEMBERS_CONTROL_IN = "CmsMembersControlIn";
const CMS_MEMBERS_CONTROL_JS_ON = "CmsMembersControlJsOn";

(function () {
    var allDivElements = document.getElementsByTagName("div");
    for (var i = 0; i < allDivElements.length; i++) {
	var elem = allDivElements[i];

	if (elem.className == CMS_MEMBERS_CONTROL_IN) {
	    elem.style.background = "#ffffff";
	    elem.style.opacity = 1;
	    
	} else if (elem.className == CMS_MEMBERS_CONTROL_JS_ON) {
	    elem.style.display = "none";
	}
    }
})();