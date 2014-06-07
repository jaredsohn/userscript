// ==UserScript==
// @name        keep that anxiety away from me
// @namespace   http://noseyhedgehog.co.uk
// @description keep that anxiety away from me
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
    jQuery('.controls_section a.activity span').remove();

});