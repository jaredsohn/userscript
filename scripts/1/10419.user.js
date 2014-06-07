// ==UserScript==
// @name           Rewrite hostname in links, forms, src, and embeds.
// @namespace      http://www.strangecode.com/
// ==/UserScript==

(function () {
    
    var links = document.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        if (links[i].getAttribute('href')) {
            links[i].setAttribute('href', links[i].getAttribute('href').replace(/(https?:\/\/([^\/]*)?)flickr.com/, '$1flickr.burb.tv'));
        }
    }
    
    var imgs = document.getElementsByTagName('img');
    for (var i = 0; i < imgs.length; i++) {
        if (imgs[i].getAttribute('src')) {
            imgs[i].setAttribute('src', imgs[i].getAttribute('src').replace(/(https?:\/\/([^\/]*)?)flickr.com/, '$1flickr.burb.tv'));
        }
    }
    
    var forms = document.getElementsByTagName('form');
    for (var i = 0; i < forms.length; i++) {
        if (forms[i].getAttribute('action')) {
            forms[i].setAttribute('action', forms[i].getAttribute('action').replace(/(https?:\/\/([^\/]*)?)flickr.com/, '$1flickr.burb.tv'));
        }
    }
    
    var embeds = document.getElementsByTagName('embed');
    for (var i = 0; i < embeds.length; i++) {
        if (embeds[i].getAttribute('flashvars')) {
            embeds[i].setAttribute('flashvars', embeds[i].getAttribute('flashvars').replace(/(https?:\/\/([^\/]*)?)flickr.com/, '$1flickr.burb.tv'));
        }
    }

})();
