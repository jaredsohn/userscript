// ==UserScript==
// @name        Extract Search Results
// @namespace   Search
// @description Extract Results from Search Results Pages
// @include     http://www.google.com/search*
// @include     https://www.google.com/*
// @include     http://www.bing.com/*
// @include     https://www.bing.com/*
// @include     *search.yahoo.com/*
// @downloadURL https://userscripts.org/scripts/show/93359
// @grant       none
// @version     2.1
// ==/UserScript==

var href_div='<div width="100%" style="padding-bottom:25px">',
    host=location.hostname.split('.').splice(-2,1).pop().toString().toLowerCase(),
    resultsDiv="",
    resultItems=[],
    i=0,
    len=0;

// div IDs of results and drill down paramenters for querySelectorAll ( https://developer.mozilla.org/en-US/docs/Web/API/Element.querySelectorAll )
var resultDivIdsQuerySelectors={
    bing: { divId: 'results', querySelectorAllString: 'li.sa_wr  div.sb_tlst > h3 >  a[href^=http]' },
    google: { divId: 'res', querySelectorAllString: 'div.rc > h3.r >a[href^=http]' },
    yahoo: { divId: 'web', querySelectorAllString: 'div > h3 > a[href^=http]' },
};

var ParseSerpResults=function() {
    resultsDiv=document.getElementById(resultDivIdsQuerySelectors[host].divId);
	if(resultsDiv){
		resultItems=resultsDiv.querySelectorAll(resultDivIdsQuerySelectors[host].querySelectorAllString);

		for ( len=resultItems.length; i <len; i++) {
			href_div += resultItems[i] + '<br/>';
		}
	
        resultsDiv.innerHTML += href_div +'</div>';            
	}
	return resultsDiv;    
};

var CheckRealTimeSerpResults=function() {
	if(!ParseSerpResults()){
		setTimeout(ParseSerpResults, 500);    
	}    
};

if(resultDivIdsQuerySelectors[host]){
	CheckRealTimeSerpResults();
}
