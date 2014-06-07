// ==UserScript==
// @name           ebay amazon ISBN linker
// @namespace      None
// @include        http://cgi.ebay.com/*
// ==/UserScript==

/*

  Author: CZ

  Looks for an ISBN on ebay, then replaces ISBN with links to the amazon textbook buyback page for easy resale :)
  
  Version: 1.0
    1.0 - First Release

*/

(

function() {         	
        var html = document.getElementById('vi-content').innerHTML.toString();  
        document.getElementById('vi-content').innerHTML = html.replace(/[\>][\d\-\s]{10,}[\<]/g,"><a target='buybackwin' href='http://www.amazon.com/gp/redirect.html?ie=UTF8&location=http%3A%2F%2Fwww.amazon.com%2Fs%3Fie%3DUTF8%26ref_%3Dnb_sb_noss%26field-keywords%3D%2520$&%26url%3Dsearch-alias%253Dtextbooks-tradein%23&tag=clinker-20&linkCode=ur2&camp=1789&creative=390957'>$&</a><");
    
}


)();