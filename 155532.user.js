// ==UserScript==
// @name NAB No-Popup
// @namespace au.id.brenecki.adam.greasemonkey
// @description Circumvents the popup-forcing code in National Australia Bank's Internet Banking, so you can log in to it directly by navigating to http://www.nab.com.au/cgi-bin/ib/301_start.pl?browser=correct - but be warned, IB may not log you out automatically when you close the tab, so you'll need to remember to click 'log out'
// @include https://ib.nab.com.au/*
// @include http://www.nab.com.au/cgi-bin/ib/301_start.pl*
// @include https://www.nab.com.au/cgi-bin/ib/301_start.pl*
// @run-at document-start
// @grant none
// ==/UserScript==

// one of the external JS files looks at window.name to see if it's in the popup, so let's fake it
window.name = "ib"
window.opener = window

// there's inline JS on the login page that redirects the user back to the homepage
// it's ugly, but the only way to disable this AFAICT is to actually remove that line of code
window.addEventListener('beforescriptexecute', function(e){
	if (e.target.innerHTML.indexOf('location.replace("http://www.nab.com.au/");') != -1){
		// stop the original script from running
		e.stopPropagation()
		e.preventDefault()
		
		// remove the offending line from the source
		var fixedSource = e.target.innerHTML.replace('location.replace("http://www.nab.com.au/");', '')
		
		// reinsert the source
		// this ensures that the other functions defined in this block are run
		var newScript = document.createElement('script');
		newScript.type = 'text/javascript'
		newScript.innerHTML = fixedSource
		e.target.parentNode.insertBefore(newScript, e.target.nextSibling)
		
		// remove the original source
		// this is only really to reduce confusion when looking at the inspector
		// as, thanks to our calls to stopPropagation and preventDefault it won't run anyway
		e.target.parentNode.removeChild(e.target)
	}
})