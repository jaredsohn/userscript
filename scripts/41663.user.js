// ==UserScript==
// @name           ScienceDirect popup-blocker
// @namespace      geological-supplies.com
// @description    Opens PDFs in the same window, not a pop-up
// @include        http://www.sciencedirect.com*
// ==/UserScript==
if (document.getElementsByClassName("noul")){
	a  = document.getElementsByClassName("noul");
	if (a[4]){
		a[4].setAttribute("target", "");
		a[4].setAttribute("onclick", "");
	} else if (a[3]){
		a[3].setAttribute("target", "");
		a[3].setAttribute("onclick", "");
	} else if (a[2]) {
		a[2].setAttribute("onclick", "");
		a[2].setAttribute("target", "");
	} else if (a[1]) {
		a[1].setAttribute("onclick", "");
		a[1].setAttribute("target", "");
	}
}