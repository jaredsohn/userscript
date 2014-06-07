// ==UserScript==
// @name           SiteAdvisor Copilot
// @namespace      http://www.chezpoor.com/greasemonkey/
// @description    Complements SiteAdvisor by checking ad links for browsing safety
// @include        *
// @exclude       *.google.*
// @exclude       *.yahoo.*
// @exclude       *.msn.*
// ==/UserScript==

// Version 0.1 2007-04-05
// Written by D. Shep Poor
// Derived in part from "SiteAdvisor Clone for Google" http://userscripts.org/scripts/show/7993 (2007-03-23 version)
// See namespace url for version history & other notes

// If set to True the diagnostic messages will to the javascript console.
// You will see one set of comments per iframe, not one per page.
var boolDebug = false;
var strDebug = "";

// Apparently too many queries to /sites/domain blocks your IP. Use restricted.html
var strLookupUrl = 'http://www.siteadvisor.com/restricted.html?domain=';


if (boolDebug) GM_log('Starting for '+window.location.href);

var vecLinks = document.getElementsByTagName('a');
for (var i=0; i<vecLinks.length; i++) {
	// Checks for AdBrite adds
	if (vecLinks[i].className == 'adHeadline') {
        var strDomain = ExtractDomainName(vecLinks[i].getAttribute('onmouseover'));
        if (strDomain != null) {
        	if (boolDebug)
				GM_log('Checking domain: '+strDomain+'   Extracted from: '+vecLinks[i].getAttribute('onmouseover'));
			objSpan = document.createElement('span');
	        objNewNode = objSpan.cloneNode(true);
	        objNewNode.setAttribute('id', 'siteadvisorcopilot_'+i);
			vecLinks[i].parentNode.insertBefore(objNewNode,vecLinks[i].nextSibling);
			// Use restricted.html Apparently too many queries to /sites/domain blocks your IP
        	checkAdvisory(strDomain, 'siteadvisorcopilot_'+i);
		}
	// Checks for Google adds
	} else if (vecLinks[i].href.indexOf('googlesyndication.com') >= 0) {
        var strDomain = ExtractDomainName(vecLinks[i].href);
        if (strDomain != null) {
        	if (boolDebug)
				GM_log('Checking Google ads domain: '+strDomain+'   Extracted from: '+vecLinks[i].href);
			objSpan = document.createElement('span');
	        objNewNode = objSpan.cloneNode(true);
	        objNewNode.setAttribute('id', 'siteadvisorcopilot_'+i);
	        // Lots of styles of Google adds. Try to make it look good in all cases.
	        if (vecLinks[i].childNodes.length <= 1) {
				vecLinks[i].appendChild(objNewNode);
			} else {
				vecLinks[i].firstChild.appendChild(objNewNode); }
        	checkAdvisory(strDomain, 'siteadvisorcopilot_'+i);
		}
	}
}

if (boolDebug) GM_log('Done.');



// Check the site advisor website
function checkAdvisory(strDomain, strId) {
    GM_xmlhttpRequest({
        method:"GET",
        url:strLookupUrl+strDomain,
        onload:function(result) {
	        if (result.responseText.indexOf('is rated green') !== -1) {
				document.getElementById(strId).innerHTML = ' <img src="chrome://safe/content/green.gif" style="border-style:none; border-width:0px; text-decoration:none;" title="This site '+strDomain+' is rated green. Click to see SiteAdvisor site" onclick="window.open(\''+strLookupUrl+strDomain+'\'); return false;">';
	            }
	        else if (result.responseText.indexOf('is rated yellow') !== -1) {
				document.getElementById(strId).innerHTML = ' <img src="chrome://safe/content/yellow.gif" style="border-style:none; border-width:0px; text-decoration:none;" title="This site '+strDomain+' is rated yellow. Click to see SiteAdvisor site" onclick="window.open(\''+strLookupUrl+strDomain+'\'); return false;">';
	            }
	        else if (result.responseText.indexOf('is rated red') !== -1) {
				document.getElementById(strId).innerHTML = ' <img src="chrome://safe/content/red.gif" style="border-style:none; border-width:0px; text-decoration:none;" title="This site '+strDomain+' is rated red. Click to see SiteAdvisor site" onclick="window.open(\''+strLookupUrl+strDomain+'\'); return false;">';
	            }
        }
    });
    // Returning "false" with the onclick prevents the a href link from opening
}

// Extract domain name from a string
// Code originally obtained from http://willmaster.com/possibilities/
// Expanded 2007-04-05 to handle most js embedding
function ExtractDomainName(s) {
	// Feed this function anything that looks like 
	//   a domain name or URL. It will do its best 
	//   to extract the domain without subdomains.
	
	// Some more details and limitations:
	//	Try to extract from anything including a js fn such as an onclick event
	//	It does not handle regular expressions yet
	//	The param must either contain "//" (such as http://), or 
	//	if no "//" then the domain must start at the begining of the param
	//	If there are more than one "//" then use the last one in the param
	//		(this is best for ad redirectors)
	
	// For the comments, let's assume that param s equals
	//   "window.location='http://www.books.Example.co.uk:80/page.html';"
	
	// Remove http:// and everything before, if present.
	// this will get other protocols too, such as https://
	// (Result is "www.books.Example.co.uk:80/page.html';")
	// Repeat so it gets the last http web address in the url/uri
	var i = s.indexOf('//');
	while (i > -1) {
		s = s.substr(i+2); 
		i = s.indexOf('//'); }
	
	// Remove path/file information, if present.
	// (Result is "www.books.Example.co.uk:80")
	i = s.indexOf('/');
	if(i > -1) { s = s.substr(0,i); }
	
	// Remove anything starting with a quote (single or double)
	// This is important for js fns where there was no path/file info.
	i = s.indexOf("'");
	if(i > -1) { s = s.substr(0,i); }
	i = s.indexOf('"');
	if(i > -1) { s = s.substr(0,i); }
	
	// Remove port number, if present.
	// (Result is "www.books.Example.co.uk")
	i = s.indexOf(':');
	if(i > -1) { s = s.substr(0,i); }
	
	// Return s if no letters (could be an IP address).
	// (Doesn't apply to the example)
	var re = /[a-z]/i;
	if(! re.test(s)) { return s; }
	
	// Split s into chunks on periods, store in array a.
	// (Result is 
	//          "www"
	//          "books"
	//          "Example"
	//          "co"
	//          "uk"
	//    (5 chunks) )
	var a = s.split('.');
	
	// If less than 2 chunks, it's not really a domain name. Return null.
	if(a.length < 2) { return null; }
	
	// Create domain name with last 2 chunks of array a.
	// (Result is "co.uk")
	var domain = a[a.length-2] + '.' + a[a.length-1];
	
	// If more than 2 chunks ...
	// (Yes, the example has 5 chunks)
	if(a.length > 2) {
	   // ... and if the last two chunks are each exactly 
	   //   2 characters long, it's probably a domain with 
	   //   the format Example.co.uk. Therefore, insert the 
	   //   third from last chunk of array a into the front 
	   //   of the domain name.
	   // (The example "co.uk" matches those criteria where, if  
	   //   "example.com" had been the domain, it would not.)
	   // (Result is "Example.co.uk")
	   if(a[a.length-2].length==2 && a[a.length-1].length==2) {
	      domain = a[a.length-3] + '.' + domain;
	      }
	   }
	
	// Lowercase the domain name and return it.
	// (Result is "example.co.uk")
	return domain.toLowerCase();
}
