// ==UserScript==
// @name           pixxelatedImages
// @namespace      tech.nimbus.fi
// @description    Do not blur zoomed images. Let the pixels shine!
// @include        *
// @version        1.0
// ==/UserScript==

(function(){ // begin closure

    // style to add
    var style = "HTML, IMG { image-rendering: -moz-crisp-edges !important; }";

    // add style by sheer brute force! (I had problems with GM_addStyle)
    if (typeof document.getElementsByTagName === "function") {
        var head = document.getElementsByTagName("head");
        if (head) {
            head = head[0];
            head.innerHTML += "<style>"+ style +"</style>";
        }
    }

})(); // end closure

// eof
