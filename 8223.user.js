// ==UserScript==
// @name          RegionalHelpWantedJSRedirectFix
// @namespace     jdmort@gmail.com
// @description   Changes javascript links to html links so you can tabbed browse at RegionalHelpWanted.com
// @include       http://regionalhelpwanted.com/*
// ==/UserScript==


//Super fast recursive lookup taken from the GmailTo script by andrinvr@gmail.com
function goUp(target,howmany) {
	if(howmany>0) {
		if(target.nodeName=="A") {
			if(target.href.indexOf("javascript:")==0) {
				job=target.href.substring(23,31);
				target.href="http://regionalhelpwanted.com/Search/details_nav.cfm?SN=1&ID="+job;
				target.target="_blank";
			} else {
				return;
			}
		} else {
			if(target.parentNode!=null) {
				goUp(target.parentNode,--howmany);
			} else {
				return;
			}
		}
	} else {
		return;
	}
}

window.addEventListener("click",function(e) {
	if(e.which==1) {
		job=goUp(e.target,5)
	}
}, false);
