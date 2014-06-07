// ==UserScript==
// @name        No Image Cache
// @namespace   gaiarch_v3
// @match       http://*.gaiaonline.com/*
// @version     2.1
// @grant       none
// ==/UserScript==

(function() {
    var image = document.getElementsByTagName('img');
    var img, regex, res, nsrc;
    
    for(idx in image) {
        img = image[idx];
        regex = /(http:\/\/img-cache.cdn.gaiaonline.com\/[a-z0-9]+\/)/;
        res = regex.test(img.src);
        if(res) {
            nsrc = img.src.replace(regex,'');
            img.src = nsrc;
        }
    }
})();
