// ==UserScript==
// @name        GitHub Improved
// @namespace   http://userscripts.org/scripts/show/161397
// @description Pull Requests and Wiki in fullscreen
// @include     https://github.com/*
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @author      shenault
// @version     1.0.1
// ==/UserScript==
this.$ = this.jQuery = jQuery.noConflict(true);

this.$(document).ready(function($){
    if ($("div#wiki-wrapper").size() > 0 || $("div.view-pull-request").size() > 0) {
        $("div.container").width("80%");
    }
    
    $("div.info span.css-truncate").removeClass("css-truncate-target");
    $("div.info span.css-truncate").removeClass("css-truncate");
});