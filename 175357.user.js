// ==UserScript==
// @name        Wareztuga Server Choose
// @namespace   localhost
// @description Auto-choose Wareztuga servers!
// @include     *://www.wareztuga.me/serie.php?s=*&ep=*
// @include     *://wareztuga.me/movie.php?m=*
// @version     0.1
// ==/UserScript==

document.addEventListener("DOMNodeInserted",
function() {
    if(document.getElementsByClassName("putlocker")[0]) {
        document.getElementsByClassName("putlocker")[0].click();
    } else if(document.getElementsByClassName("sockshare")[0]) {
        document.getElementsByClassName("sockshare")[0].click();
    } else {
        document.getElementsByClassName("bayfiles")[0].click();
    }
}, false);