// ==UserScript==
// @name        AutoBookmark
// @namespace   http://jayrajput.blogspot.com
// @description Script to auto bookmark URLs
// @include     https:/*.*.*.*
// @version     1
// @grant       none
// ==/UserScript==
//

// this is where you need to make updates to get your hostname.
// Script assumes that hostname is available on the webpage and
// can be extracted using javascript.
function getServerName() {
    // in my case the hostname of the webserver was available in a span tag.
    return document.getElementById("hostname").textContent;
}

// if already bookmarked do not bookmark it again.
if (document.cookie.indexOf('jayvisited') < 0 ) {
    // use setTimeout to give sometime for page to load.
    setTimeout(function(){
        hostname = getServerName();
	if (hostname != null) {
            window.sidebar.addPanel(hostname, location.href, '');
            document.cookie = "jayvisited=1";
	}
    }, 5000);
}