// ==UserScript==
// @name           MetaFilter No Hugs
// @namespace      http://plutor.org/
// @description    Replaces the "Everyone needs a hug" note with a random fortune
// @include        http://metatalk.metafilter.com/*
// ==/UserScript==
//
// Note that this script uses the amazing and useful fortune service as 
// described here: <http://tonycode.com/wiki/index.php?title=The_Fortune_Service>
//
// Thanks, Tony Primerano!
//

function mnh_init() {
    var prevRow2 = document.getElementById('prevRow2');
    if (!prevRow2) return;

    for (var i=0; i<prevRow2.childNodes.length; ++i) {
        var ch = prevRow2.childNodes[i];
        if (!ch || !ch.tagName || !ch.childNodes) continue;
        for (var j=0; j<ch.childNodes.length; ++j) {
            var gc = ch.childNodes[j];
            if (gc &&
                gc.tagName && gc.tagName.toLowerCase() == 'span' &&
                gc.className && gc.className.toLowerCase() == 'smallcopy' &&
                gc.innerHTML.toLowerCase() == 'note: everyone needs a hug.') {
                GM_log("Okay!");
                mnh_replace(gc);
                return;
            }
        }
    }
}

function mnh_replace(element) {
    element.innerHTML = "";
    var ajax = GM_xmlhttpRequest({
        method: 'get',
        url: 'http://tonycode.com/service/fortune-0.1/fortune.php',
        onload: function(details) { mnh_done(details, element) }
    });
}

function mnh_done(details, element) {
    // Test the response to make sure it's not wacky
    var text = details.responseText;
    text.match(/^(\w| |[[:punct:]]|<br \/>|&nbsp;)*$/);
 
    element.innerHTML = details.responseText;
}

mnh_init();

