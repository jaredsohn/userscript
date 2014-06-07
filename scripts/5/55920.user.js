// ==UserScript==
// @name           Locate Multiple Domains in Search Results
// @filename       multiple-domains.user.js
// @author         Alex Hall
// @homepage       http://www.devseo.co.uk
// @namespace      http://www.devseo.co.uk/blog/view/greasemonkey-script
// @version        1.0
// @description    Locate specific domains easily within the results of a Google, Yahoo!, or Bing Search
// @include        http://www.google.com/search*
// @include        http://google.com/search*
// @include        http://www.google.com/#*
// @include        http://google.com/#*
// @include        http://www.google.co.uk/search*
// @include        http://google.co.uk/search*
// @include        http://www.google.co.uk/#*
// @include        http://google.co.uk/#*
// @include        http://uk.search.yahoo.com/search*
// @include        http://search.yahoo.com/*
// @include        http://bing.com/search*
// @include        http://www.bing.com/search*
// ==/UserScript==


//***********************BEGIN CONFIGURATION**********************//
// Set the array of sites you wish to locate (without www is best) - syntax [['mydomain.com', '#color'], ['mydomain2.com', '#color']];
// Set the color variable to the background color you wish to use to highlight your domain (defaults to light red)
var sites = [
	['devseo.co.uk', '#C2D9EF'],
	['syst3m32.co.uk', '#98292B'],
	['myspace.com', '#CCC']
];

var siteLen = sites.length;
var numNot = 0;

//************************END CONFIGURATION***********************//


//*******************DO NOT EDIT PAST THIS LINE*******************//
//****************UNLESS YOU KNOW WHAT YOU'RE DOING***************//
setTimeout(startItOff, 1000);
function startItOff()
{
	var all_links = document.getElementsByTagName('a');
	var linkLen = all_links.length;
	if (location.hostname.indexOf("google.com")!=-1) {
	    for (i=0; i<linkLen; i++) {
	    	if (all_links[i].className!='l') { continue; }
	    	var href = all_links[i].getAttribute('href');
			if(all_links[i].parentNode.tagName.toLowerCase() === 'h4'){
				numNot++;
			}
	    }
	    for (i=0; i<linkLen; i++) {
	    	if (all_links[i].className!='l') { continue; }
	    	var href = all_links[i].getAttribute('href');

	    	for(j=0;j<siteLen;j++){
	           if (href.indexOf(sites[j][0])==-1) { continue; }
	           var result=all_links[i].parentNode.parentNode;
	           result.style.backgroundColor=sites[j][1];
	           result.style.overflow='hidden';
	           result.style.width='740px';

			   var listingNum = all_links[i].getAttribute('onmousedown');
			   listingNum = listingNum.split(',');
			   listingNum = listingNum[4].split('\'');
			   listingNum = listingNum[1];
			   var resultDiv = document.createElement('div');
			   result.appendChild(resultDiv);
			   resultDiv.style.cssText = 'float: right;font-size:16px;margin:0 5px 5px 0;background: #FFF;padding: 5px;';
			   resultDiv.innerHTML = 'Result ' + (listingNum - numNot);
	    	}
	    }
	} else if (location.hostname.indexOf("google.co.uk")!=-1) {
	    for (i=0; i<linkLen; i++) {
	    	if (all_links[i].className!='l') { continue; }

	    	var href = all_links[i].getAttribute('href');
			if(all_links[i].parentNode.tagName.toLowerCase() === 'h4'){
				numNot++;
			}
	    }
	    for (i=0; i<linkLen; i++) {
	    	if (all_links[i].className!='l') { continue; }
	    	var href = all_links[i].getAttribute('href');

	    	for(j=0;j<siteLen;j++){
	           if (href.indexOf(sites[j][0])==-1) { continue; }
	           var result=all_links[i].parentNode.parentNode;
	           result.style.backgroundColor=sites[j][1];
	           result.style.overflow='hidden';
	           result.style.width='740px';

			   var listingNum = all_links[i].getAttribute('onmousedown');
			   listingNum = listingNum.split(',');
			   listingNum = listingNum[4].split('\'');
			   listingNum = listingNum[1];
			   var resultDiv = document.createElement('div');
			   result.appendChild(resultDiv);
			   resultDiv.style.cssText = 'float: right;font-size:16px;margin:0 5px 5px 0;background: #FFF;padding: 5px;';
			   resultDiv.innerHTML = 'Result ' + (listingNum - numNot);
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
			result.style.clear = 'both';
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
}