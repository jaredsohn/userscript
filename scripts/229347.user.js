// ==UserScript==
// @name        VineScope AutoNext
// @namespace   http://userscripts.org/users/506397
// @description		Automatically go to the next or previous vine at VineScope.com after a chosen amount of loops.
// @include     http://vinescope.com/*
// @grant		metadata
// @run-at		document-end
// @version     1
// ==/UserScript==

// ----- USER OPTIONS -----

// Amount of loops for each vine
var loops = 1;

// Forwards is true, backwards is false
var direction = true;

// ----- END OF USER OPTIONS -----

function initializeAutoNext()
{
    var vid = document.getElementById('post_html5_api');
    
    if (vid == null)
    {
        setTimeout(initializeAutoNext, 500);
    }
    else
    {
        var nextBtn = document.getElementById(direction ? 'next' : 'prev');
        var currLoops = 0;
        vid.loop = false;
        vid.onended = function() { currLoops++; if (currLoops == loops) { nextBtn.click(); } else { vid.play(); } };
    }
}

initializeAutoNext();
