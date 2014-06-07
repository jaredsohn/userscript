// ==UserScript==
// @name        ck101 images
// @namespace   http://ck101.com/viewthread
// @include     http://ck101.com/*
// @include     http://www.ck101.com/*
// @version     2
// @grant       none
// ==/UserScript==


function onLoad() {
    jQuery = unsafeWindow.jQuery;
    jQuery('img[file]').each(function() { 
        $this = jQuery(this); 
        $this.attr('src', $this.attr('file'))
    })

    jQuery('a[href*="mod=viewthread"]').each(function() {
        $this=jQuery(this); 
        $this.attr('href', ($this.attr('href').replace(/page%3D\d+/, '')))
    })
}

window.addEventListener('load', onLoad, true)
