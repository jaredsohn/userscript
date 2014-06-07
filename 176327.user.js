// ==UserScript==
// @name       	    Pocket Auto Redirect
// @namespace  	    http://www.eclectide.com
// @version    	    1.2
// @description     Redirects Pocket sites to the original website
// @include         http://getpocket.com/a/read/*
// @author          Darek Kay <darekkay@gmail.com>
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require         https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

waitForKeyElements (".original a[href]", redirect, false);

function redirect(node) {
    var url = decodeURIComponent(node.attr("href").substr(34));
    console.log("Redirecting to: " + url);
    window.location.assign(url);
}