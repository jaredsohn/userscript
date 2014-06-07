// ==UserScript==
// @name           Craigslist ISBN Amazon buyback linker
// @namespace      none
// @description    Looks for an ISBN on craigslist ads, then replaces ISBN with links to the amazon textbook buyback page
// @include        http://*.craigslist.org/*bks/*
// ==/UserScript==

/*

  Author: CZ

  Looks for an ISBN on craigslist ads, then replaces ISBN with links to the amazon textbook buyback page for easy resale :)
  
  Version: 1.1
    1.1 - changed userbody to postingbody
    1.0 - First Release

*/

(

function() {         	
        var html = document.getElementById('postingbody').innerHTML.toString();  
        document.getElementById('postingbody').innerHTML = html.replace(/[\d\-\s]{10,}/g,"<a target='buybackwin' href='http://www.amazon.com/gp/redirect.html?ie=UTF8&location=http%3A%2F%2Fwww.amazon.com%2Fs%3Fie%3DUTF8%26ref_%3Dnb_sb_noss%26field-keywords%3D%2520$&%26url%3Dsearch-alias%253Dtextbooks-tradein%26tag%3Dclinker-20%26linkCode%3Dur2%26camp%3D1789%26creative%3D390957'>$&</a>");
    
}


)();