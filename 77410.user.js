// ==UserScript==
// @name           Google Image Fix
// @namespace      
// @description    Google Image Fix
// @include        http://*
// @include        https://webcache.googleusercontent.com/search?*
// @exclude        https://*
// ==/UserScript==

prefix = "https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?url=";
suffix = "&container=focus&gadget=a&no_expand=1&resize_h=0&rewriteMime=image%2F*";
images = document.getElementsByTagName("img");
for (var i = 0; i < images.length; i++) {
    if (images[i].src.indexOf(prefix) == -1) {
        images[i].src = prefix + encodeURIComponent(images[i].src) + suffix;
    }
}