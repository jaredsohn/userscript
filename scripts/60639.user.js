// ==UserScript==
// @name          Facebook + Golden Girls
// @namespace     http://jeffpalm.com/goldengirls/
// @description   Plays the Golden Girls theme whenever you log into facebook
// @include       http://www.facebook.com/home.php*
// ==/UserScript==

/*
 * Copyright 2009 Jeffrey Palm.
 */
const TESTING = false;

function main() {
    var div = document.createElement("div");
    div.innerHTML = '<object width="0" height="0"><param name="autoplay" value="true"><param name="movie" value="http://www.youtube.com/v/QFl7r2dUmTA&hl=en&fs=1&autoplay=1"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/QFl7r2dUmTA&hl=en&fs=1&autoplay=1" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="0" height="0"></embed></object>';
    div.style.width = "0px";
    div.style.height = "0px";
    document.body.appendChild(div);
    
}

try {main();} catch (e) {if (TESTING) alert("ERROR:" + e);}