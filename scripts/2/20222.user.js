// ==UserScript==
// @name           McAfee SiteAdvisor Ad Skipper
// @namespace      CstrzRock (cstrzrock@gmail.com)
// @description    When you use the free edition of McAfee SiteAdvisor you get this annoying ad page before it brings you to the site report. This script bypasses the advertisement.
// @include        http://*.siteadvisor.com/presiteoffer.html?*
// ==/UserScript==

var location = window.location.toString();

if( location.indexOf('siteadvisor\.com/presiteoffer\.html\?domain\=') > -1 ) 

{
    // get rid of the ad page
    var links = document.links;
    
    for (var i = 0; i < links.length; i++) {
	

if( links[i].innerHTML.indexOf('No Thanks. Continue to site report.') > -1 ) {
	    // get to the actual site report
	    window.location.href = links[i].href; // click it
	    break;
	}
    }
}

