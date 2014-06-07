// ==UserScript==
// @name           uso Remove spam flood scripts from /scripts
// @namespace      Vivre
// @author         Vivre
// @description    Removes current script flooding on uso/scripts incl search listings
// @copyright      2012+, Vivre
// @license        Free for personal and/or non-commercial use
// @version        18.09.12 v0.3
// @website        http://userscripts.org/scripts/show/146612
// @include        http*://userscripts.org/scripts*
// @match          http*://userscripts.org/scripts*
// ==/UserScript==
version = "18.09.12 v0.3";

/*************************************************************************

    This small script is meant to give you relief on uso scripts pages
    by removing the spam-scripts from the listings - incl search results

    you will still need to walk through the page history to reach the next 
    continuation of the normal listing*, but this way you don't miss single 
    scripts that had been uploaded at the same time of the flooding and 
    might be strayed in between.
    
    This script might hopefully be outdated pretty soon
    but until then I hope it's of helpful use to some of you

    greets ~ Vivre

    *update: v0.2 now auto-forwards to next page with valuable listing
    v0.3: catch no-forwarding if already root search-result is empty
    
**************************************************************************/


//
//scripts pollution by user/484405
//current script-title variations:
//FileExchangeMadeEasy Exchange File Everywhere wherever you arennnnn
//Share Transfer Files wherever you arennnnn
//

function remv() {
var count = -1;

var unTr = document.querySelectorAll('tr');

for (i=0; i<unTr.length; i++) {
	var unList = unTr[i].querySelector('tr > td > a[title*="wherever you are"]');
	if(unList) unTr[i].parentNode.removeChild(unTr[i]);
	else {count = count +1;};
	}

if (count == 0 && window.location.href.match(/page=/)) {
	var url = window.location.href.toString();
	num1 = url.replace(/.*page=/, '');
	num2 = num1.replace(/\d+/, function(a) {return parseInt(a)+1;} );
	url2 = url.replace(/[0-9].*/, num2);
	window.location.href = url2
} else if (count == 0 && window.location.href.match(/search\?q=/)) {
	window.location.href = window.location.href.replace(/search\?q=/, 'search?page=2&q=');
	};

} 

// timeout to realize those scripts are there. Adjust time or
// Switch uncommenting with alternative row without delay

if (!window.location.href.match(/users\/484405/)) setTimeout(remv, 500);
// if (!window.location.href.match(/users\/484405/)) remv();



// End of sript
