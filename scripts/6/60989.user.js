// ==UserScript==
// @name           Google Video FavIcon
// @namespace      http://userscripts.org/users/115457
// @include        http://video.google.tld/*
// ==/UserScript==

(function () {
    /* getElementByClass
    /**********************/

    var all_divs = new Array();

    function getElementByClass(theClass) {

    //Create Array of All div Tags
    var all_divs=document.getElementsByTagName("div");

    //Loop through all tags using a FOR loop
    for (i=0; i<all_divs.length; i++) {

    //Get all tags with the specified class name.
    if (all_divs[i].className==theClass) {

    //Place any code you want to apply to all
    //pages with the class specified.

    vid_domain = all_divs[i].innerHTML;
    all_divs[i].innerHTML = '<img class="favicon" src="http://'+vid_domain+'/favicon.ico"> <a href="http://'+vid_domain+'">'+vid_domain+'</a>'
    }
    }
    }
   getElementByClass('rl-domain-below');
})();