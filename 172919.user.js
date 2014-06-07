// ==UserScript==
// @name        jQuery Loader
// @version     1.10.2
// @description Import jQuery functionality into page
// @include     *://*
// @icon        http://jquery.com/favicon.ico
// @copyright   2013, Lindblum
// ==/UserScript==

if(!window.jQuery){
    var script = document.createElement("script");
    script.src = "http://code.jquery.com/jquery-1.10.2.min.js";	//https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
    script.type = "text/javascript";
    (document.body || document.head || document.documentElement).appendChild(script);
}
