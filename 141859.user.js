// ==UserScript==
// @id             scrollpercentagestatus
// @name           Scroll percentage in status bar
// @version        1.0
// @namespace      BuhoSolitario
// @author         BuhoSolitario
// @description    Show scroll percentage in status bar
// @include        *
// @run-at         document-end
// ==/UserScript==

function calculateScrollPosition(){
	var percent = ((document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100);
	window.status = "Scroll: "+percent.toFixed(0)+"%";
}

window.addEventListener("scroll", calculateScrollPosition, false);