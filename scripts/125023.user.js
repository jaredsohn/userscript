// ==UserScript==
// @name           Geocaching.com highlight event date
// @namespace      maeki.org
// @description    Make event date font bolder and bigger
// @include        http://www.geocaching.com/seek/cache_details.aspx*
// ==/UserScript==

var mcd = document.getElementsByClassName('minorCacheDetails');
for(var i=0;i<mcd.length;i++) {
    if(mcd[i].textContent.match('Event Date')) {
        mcd[i].style.fontWeight='bolder';
        mcd[i].style.fontSize='14px';
    }  
}