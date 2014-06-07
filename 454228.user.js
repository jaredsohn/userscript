// ==UserScript==
// @name           remove-leicester-university-banner
// @version        1
// @description    remove leicester university banners
// @namespace      http://blackboard.le.ac.uk/webapps/
// @include        https://blackboard.le.ac.uk/webapps/*
// @include        https://blackboard.le.ac.uk/webapps/portal/*
// @include        http://webmail.le.ac.uk/
// @require        http://code.jquery.com/jquery-2.1.0.js
// @grant          unsafeWindow
// ==/UserScript==

// Greasemonkey //

try{
    $("iframe#navFrame").remove();
} catch(e){
    console.log(e.message);
}

try{
    $("html body div:first a img").remove();
    $("div#header div:nth-child(2) img").remove();
} catch(e){
    console.log(e.message);
}
