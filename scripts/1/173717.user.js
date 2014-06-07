// ==UserScript==
// @name        gimme my tags back
// @namespace   http://noseyhedgehog.co.uk
// @description gimme my tags back
// @include     http://*.tumblr.com*
// @include     https://*.tumblr.com*
// @version     1
// @author      theaeblackthorn
// @grant       
// ==/UserScript==



var jQuery = unsafeWindow.jQuery;

jQuery.noConflict();

jQuery(document).ready ( function() 
{
    jQuery('.post_full .post_tags').css('white-space', 'inherit');

});