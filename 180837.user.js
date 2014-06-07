// ==UserScript==
// @name        LightboxTabClick
// @namespace   rampion.github.com
// @description open lightbox images in a new tab by clicking on them
// @include     http://www.tumblr.com/dashboard
// @version     1
// @grant       none
// ==/UserScript==

jQuery(document.body).on('click', 'img#tumblr_lightbox_center_image', function() { window.open(this.src) });