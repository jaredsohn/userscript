// ==UserScript==
// @name       Google search result URL filter
// @namespace  http://martin-liu.github.io/
// @updateURL  https://raw.githubusercontent.com/martin-liu/mUserScripts/master/googleRealUrl/googleRealUrl.js
// @version    0.2
// @description  This script replace the url of google search result to the real url
// @include    https://www.google.com.hk/search*
// @include    https://www.google.com/search*
// @copyright  2014+, Martin Liu
// ==/UserScript==


[].forEach.call(
    // Get containers of the links
    document.getElementsByClassName('r'), function(e){
        // Get link element
        var link = e.firstChild;
        var url = link.href;
        link.addEventListener('click', function(e){
            link.href = url;
        });
    });
