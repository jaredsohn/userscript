// ==UserScript==
//Author: Hemant Aggarwal
//Written: 12/02/2014
//Last modified: 12/02/2014
//The script hides the Sponsored Stories on Facebook.
// @name		Hides Facebook's Sponsored Ads
// @description	Hides the sponsored stories on Facebook whatsover
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @include	http://*.facebook.com/*
// @exclude	http://*.facebook.com/login.php
// @include	https://*.facebook.com/*
// @exclude	https://*.facebook.com/login.php
// @version     2.3
// ==/UserScript==

// prevents jQuery conflicts with Facebook
this.$ = this.jQuery = jQuery.noConflict(true);

//Find and hide Sponsored Ads
var target = document.querySelector('body');
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        jQuery('#pagelet_side_ads').css({'display':'table'});
        jQuery('#pagelet_side_ads').css({'display':'none'});
        jQuery('.ego_column').has('span.adsCategoryTitleLink').css({'display':'none'});
        jQuery('div[data-ft]').has('a.uiStreamSponsoredLink').css({'display':'none'});
    });
});
observer.observe(target, { subtree: true, characterData: true, childList: true });