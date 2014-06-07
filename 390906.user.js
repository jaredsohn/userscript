// ==UserScript==
// @name           HTML5 video auto-pause
// @author         Vincent Beers (modified by zaidgs)
// @namespace      http://vincent.tengudev.com/
// @include        *
// @version        2013-11-01
// ==/UserScript==

var sTimeOut = setTimeout(function(){
    var elems = document.querySelectorAll("video");
    
    console.log("HTML video auto pause: pausing all HTML5 videos on page load (timeout)");
    for (var i = 0; i < elems.length; i++) {
        elems[i].pause();
    }

    clearTimeout(sTimeOut);
},500);

document.addEventListener('DOMContentLoaded',function() {
    var elems = document.querySelectorAll("video");
    
    console.log("HTML video auto pause: pausing all HTML5 videos on page load");
    for (var i = 0; i < elems.length; i++) {
        elems[i].pause();
    }
});


//Pause newly created video elements
document.addEventListener("DOMNodeInserted", function(e) {
    var elem = e.target;
    if (elem.nodeName == "VIDEO") {
        elem.addEventListener("canplay", function(e) {
            console.log("HTML video auto pause: Video element was inserted after page load, pausing");
        	elem.pause();
        });
    }
}, false);
