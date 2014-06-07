// ==UserScript==
// @name           sparkly
// @version        1.0
// @namespace      https://greasyfork.org/users/38
// @author         JakeCee
// @description    Removes clutter from SparkNotes
// @include        http://www.sparknotes.com/*
// @include        http://www.community.sparknotes.com/*
// @include        http://www.gsearch.sparknotes.com/*
// @downloadURL    https://greasyfork.org/scripts/101/code.user.js
// @updateURL      https://greasyfork.org/scripts/101/code.meta.js
// @run-at         document-end
// ==/UserScript==

// sparknotes home
$(document).ready(function(){
    $('div.top-ad').remove();
    $('div.rotator').remove();
    $('figure').remove();
    $('h3').empty();
    $('div.number-story').remove();
    $('img.fixed-media').remove();
    $('div.media-text').remove();
    $('div.social-container-homepage').remove();
    $('div.slideshowTitle').remove();
    $('img.slideshow-img').remove();
    $('div.slideshows-homepage').remove();
    $('div.readers-posts').remove();
});

// navigation
$(document).ready(function(){
    $('#sparklife').remove();
    $('#mindhut').remove();
});

// literature study guides
$(document).ready(function(){
    $('div.more-help').remove();
    $('div.containerUGC').remove();
    $('div.lit-guides-social').remove();
    $('div.blog-feature').remove();
    $('div.sidebar-media').remove();
    $('div.light-blue-background.border-blue.content').remove();
});