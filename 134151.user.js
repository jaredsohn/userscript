// ==UserScript==
// @name        Update the google search results with direct links instead of google-redirected ones.
// @namespace   http://vjani.blogspot.com
// @author Vivek Jani
// @description Directly visit links in google search results instead of redirection/tracking by google, thereby reaching the pages faster!
// @include     http://*.google.*
// @include     https://*.google.*
// @version     1
// ==/UserScript==
(function(){

    var links = document.getElementsByTagName("a");

    for(var i=0;i<links.length;i++){
            var mousedown = links[i].getAttribute("onmousedown");
            if(mousedown && mousedown.substring(0,10) == "return rwt")
                links[i].removeAttribute("onmousedown");
                  
    }

})();