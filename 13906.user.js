// ==UserScript==
// @name           Cricbuzz de-Framer
// @namespace      http://www.jawaji.com
// @description    Cricbuzz de-framer removes all the frames and advertising on www.cricbuzz.com and also removes the width restrictions so that cricket scores can be viewed at full page length.
// @include        http://www.cricbuzz.com/livecricketscore/*/commentary.html
// @include        http://www.cricbuzz.com/live*
// @include        http://live.cricbuzz.com/*
// ==/UserScript==

cricbuzz_js = "<script language='javascript'>\n" + 
    "<!-- \n" + 
    "function cbcomm_pageTitle(str) {document.title =  str ;}\n" +
    "-->\n" + 
    "</script>\n";

addHTML(document.body, cricbuzz_js);

window.addEventListener("load", function(e) 
{
	var ifrm = document.getElementById('crbz_det_frame');
	var divs = document.getElementsByTagName('div');
	if (ifrm) {
		var newloc = ifrm.getAttribute('src');
		if (newloc.indexOf('http') == -1)
			newloc = 'http://www.cricbuzz.com' + newloc;
		top.location.href = newloc;
	} else if (divs.length > 0) {
		
		
		if (divs[0].hasAttribute('style')) divs[0].removeAttribute('style');
		
		// Remove advertisements
		for(var i = divs.length-1; i>=0; i--) {
			if (divs[i].hasAttribute('class') && divs[i].hasAttribute('style')) {
				if (divs[i].getAttribute('class') == 'C') divs[i].parentNode.removeChild(divs[i]);
			}
		}
	}
},false);

// function copied from http://www.faqts.com/knowledge_base/view.phtml/aid/11698 and customized to the needs
function addHTML (ele, html) {
	if (document.createRange) {
	    var range = document.createRange();
	    range.setStartAfter(ele.lastChild);
	    var docFrag = range.createContextualFragment(html);
	    ele.appendChild(docFrag);
  }
}