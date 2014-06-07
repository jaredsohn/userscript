// ==UserScript==
// @name       	Piwik De-Duplication Helper
// @namespace  	bombledmonk
// @version    	0.1
// @description Changes aliased urls back to clickable links in the Piwik Dashboard
// @require 	http://code.jquery.com/jquery-1.10.1.min.js
// @match      	http://yourURL.com/piwikDirectory*
// @grant       none
// ==/UserScript==

/* 
Many dynamically rendered websites pass key=value pairs to the server in order to display context specific pages.  Other websites employing key=value pair passing use it for analytics or other context free situations.  Piwik is targeted for the latter and thus has tried to automatically "clean up" URLs containing duplicate keys in a url.  This is a problem when the keys in the key=value pairs are significant and found multiple times in a query string (for example in a <input type=select multiple> form input).  This user scripts assists in maintaining the significance of complete urls without having to dive into the bowels of Piwik code.   
Ex. 
http://example.com/search?pv5=1&pv5=5&pv5=10&otherparam=true&anotherParam=true 
is recorded in piwik as
http://example.com/search?pv5=10&otherparam=true&anotherParam=true 

To employ modify the piwik javascript or image tracker to report a URL with the ampersand (&) aliased to some other string that is not likely to show up in the normal course of site navigation. In the code below, the alias  is 'xxx'.
http://example.com/search?pv5=1xxxpv5=5xxxpv5=10xxxotherparam=truexxxanotherParam=true

To modify:
1. Change the url @match string above to your installation of Piwik leaving the wildcard at the end.
2. Change the instances of xxx below to whatever your alias string may be.
*/
setInterval(replaceAlias, 1000); // keeps updating the links that ajax continuously adds to the page.
            
function replaceAlias(){
    $('a[href*=xxx]').each(function(){
        $(this).attr('href', $(this).attr('href').replace(/xxx/gi, '&'));
    });       
}