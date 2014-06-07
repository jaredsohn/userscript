// ==UserScript==
// @name        inject haml
// @namespace   http://userscripts.org/users/yu.w
// @description inject haml files
// @include     http://www.flickr.com/*
// @version     1
// @grant       none
// @require       http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==



if(window.location.host == 'www.flickr.com'){
    $('head').append('<link rel="service" href="https://s3.amazonaws.com/kraykray/flickr.raml"/>');
}
else if(window.location.host == 'foursquare.com'){
    $('head').append('<link rel="service" href="https://s3.amazonaws.com/kraykray/foursquare.raml"/>');
}