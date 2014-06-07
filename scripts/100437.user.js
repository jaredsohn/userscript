// ==UserScript==
// @name          Reddit New Tabs
// @namespace     hertzdonut.org
// @description   Open reddit posts and comments in a new tab.
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @include http://*reddit.com/*
// ==/UserScript==

$(document).ready(function() {   
    $('a.title,a.comments').attr('target','_blank');
});
