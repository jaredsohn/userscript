// ==UserScript==
// @name           DreamWidth.org Auto Click Warning Buttons
// @namespace      DwOrgAutoClickWarnBtn
// @description    Automatically click the 'Yes I want to View This' button and go to the next page. Created based on http://userscripts.org/scripts/show/59354.
// @include        http*://*dreamwidth.org/*
// @version		0.1
// ==/UserScript==

DwOrgAutoClickWarnBtn = function() {
	var warnBtn=document.evaluate("//input[@type='submit' and contains(@value,'Yes, I want to view this content.')]",document,null,9,null).singleNodeValue;
	if(!warnBtn) return false;
	warnBtn.click();
	return true;
}
DwOrgAutoClickWarnBtn();