// ==UserScript==
// @name       Image URL changer
// @namespace  http://kreozot
// @version    0.2
// @description  Change URLs of some images (i.e. to add proxy prefix in case of blocking by url) with proxy prefix
// @include     http://*
// @copyright  2012+, Kreozot
// ==/UserScript==

"use strict";
    
//Array of blocked domains
var blockedDomains = ['pit.dirty.ru'];
        
//Prefix of the prefered proxy service
var proxyPrefix = 'https://zend2.com/vip.php?u=';

!function(win) {

    if (window != window.top) return
    var doc = win.document
    
    win.addEventListener("DOMContentLoaded", function() {
        
        var images = document.getElementsByTagName('img');
        for (var i = 0; i < images.length; i++) {
            var image = images[i];
            for (var j = 0; j < blockedDomains.length; j++) {
                var domain = 'http://' + blockedDomains[j];
                if (image.src.match(domain)) {
                    image.src = image.src.replace(domain, proxyPrefix + domain);
                }	
            }
        }
    }, false);
    
}(typeof unsafeWindow == 'undefined' ? window : unsafeWindow)