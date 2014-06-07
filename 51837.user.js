// ==UserScript==
// @name           Locate Domain in Search Results
// @filename       locate_domain_in_search_.user.js
// @author         Mark Stoecker
// @homepage       http://www.poundbangwhack.com
// @namespace      http://www.poundbangwhack.com/greasemonkey/highlight-domain-in-search-results/
// @version        1.1.1
// @description    Locate a specific domain easily within the results of a Google, Yahoo!, or Bing Search
// @include        http://www.google.com/search*
// @include        http://google.com/search*
// @include        http://www.google.co.uk/search*
// @include        http://google.co.uk/search*
// @include        http://uk.search.yahoo.com/search*
// @include        http://search.yahoo.com/*
// @include        http://bing.com/search*
// @include        http://www.bing.com/search*
// ==/UserScript==

// Changes
// 	1.1 -
// 		Multiple domain feature added by Alex Hall - http://www.devseo.co.uk
// 		Included functionality for google.co.uk and uk.search.yahoo.com - Added by Alex Hall
// 	1.1.1 -
//		Added an Event Listener to wait to run the script until the page is done loading

//***********************BEGIN CONFIGURATION**********************//
// Set the array of sites you wish to locate (without www is best) - syntax [['mydomain.com', '#color'], ['mydomain2.com', '#color']];
// Set the color variable to the background color you wish to use to highlight your domain (defaults to light red)
var sites = [['poundbangwhack.com', '#fcc'], ['myspace.com', '#CCC'], ['devseo.co.uk', '#C2D9EF']];
var siteLen = sites.length;
//var color='#fcc';
//************************END CONFIGURATION***********************//


//*******************DO NOT EDIT PAST THIS LINE*******************//
//****************UNLESS YOU KNOW WHAT YOU'RE DOING***************//
window.addEventListener("load", function(e) {
 var all_links = document.getElementsByTagName('a');
 var linkLen = all_links.length;
 if (location.hostname.indexOf("google.com")!=-1) {
    for (i=0; i<linkLen; i++) {
    	if (all_links[i].className!='l') { continue; }
    	var href = all_links[i].getAttribute('href');
    	for(j=0;j<siteLen;j++){
           if (href.indexOf(sites[j][0])==-1) { continue; }
           var result=all_links[i].parentNode.parentNode;
           result.style.backgroundColor=sites[j][1];
           result.style.overflow='hidden';
    	}
    }
 } else if (location.hostname.indexOf("google.co.uk")!=-1) {
    for (i=0; i<linkLen; i++) {
    	if (all_links[i].className!='l') { continue; }
    	var href = all_links[i].getAttribute('href');
    	for(j=0;j<siteLen;j++){
           if (href.indexOf(sites[j][0])==-1) { continue; }
           var result=all_links[i].parentNode.parentNode;
           result.style.backgroundColor=sites[j][1];
           result.style.overflow='hidden';
    	}
    }
 } else if (location.hostname.indexOf("yahoo.com")!=-1) {
    for (i=0; i<linkLen; i++) {
       	if (all_links[i].className!=('yschttl spt')) { continue; }
       	var href = all_links[i].getAttribute('href');
    	for(j=0;j<siteLen;j++){
	       	if (href.indexOf(sites[j][0])==-1) { continue; }
	      	var result=all_links[i].parentNode.parentNode.parentNode;
	      	result.style.backgroundColor=sites[j][1];
           	result.style.overflow='hidden';
	    }
    }
 } else if (location.hostname.indexOf("bing.com")!=-1) {
 var all_divs=document.getElementsByTagName('div');
	for (i=0; i<linkLen; i++) {
        if (all_divs[i].className!='sb_tlst') { continue; }
        var link = all_divs[i].childNodes[0].childNodes[0];
        var href=link.getAttribute('href');
    	for(j=0;j<siteLen;j++){
            if (href.indexOf(sites[j][0])==-1) { continue; }
            var result=link.parentNode.parentNode.parentNode;
            result.style.backgroundColor=sites[j][1];
        }
    }
 }
}, true);
