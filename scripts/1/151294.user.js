// ==UserScript==
// @name        Magento live warnings
// @description Sets warning message on the magento logo line (maybe only usable with vanilla admin skins without modification)
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @grant       none
// @include     https://*yourshopenvironment.tld/*youradmin/*
// @version     1
// ==/UserScript==

jQuery.noConflict(true);
jQuery(document).ready(function() {
	jQuery('.header-top a').after('<div style="position: absolute; width: 100%; letter-spacing: 12px; text-align: center; text-shadow: 1px 4px 2px black; top: 35px; color: red; font-size: 30px;" class="admin-warning-live"><blink>-&gt;WARNING - LIVE&lt;-</blink></div>');
});
