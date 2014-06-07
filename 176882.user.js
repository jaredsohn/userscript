// ==UserScript==
// @name           connect-anticlip-comments
// @namespace      http://userscripts.org/users/484734
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @icon           http://cdn.ohnopub.net/cdn/binki/images/connect-797558-logo-clipped.png
// @description    https://connect.microsoft.com/Connect/feedback/details/797558
// @include        https://connect.microsoft.com/*
// @include        http://connect.microsoft.com/*
// @version        0.3
// ==/UserScript==
this.jQuery = jQuery.noConflict(true);
this.jQuery(document).ready(function() {
    var s = document.createElement('style');
    s.textContent='.FeedbackDetailsTabPageOuterRegion{width:auto;}';
    jQuery('head').append(s);
});
