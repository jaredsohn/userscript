// ==UserScript==
// @name           Liip Yellow Gmail
// @namespace      http://liip.ch/
// @version        1.0
// @description    Replaces the GMail Favicon for Liip by a yellow one.
// @include        https://mail.google.com/mail/*
// ==/UserScript==

(function(d, h) {
    if (document.getElementsByTagName('title')[0].innerHTML.search('Liip') !== 0) {
        return;
    }

    // Create this favicon
    var ss = d.createElement('link');
    ss.rel = 'shortcut icon';
    ss.type = 'image/x-icon';
    ss.href = 'data:image/x-icon;base64,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';
    // Remove any existing favicons
    var links = h.getElementsByTagName('link');
    for (var i=0; i<links.length; i++) {
        if (links[i].href == ss.href) {
            return;
        }
        if (links[i].rel == "shortcut icon" || links[i].rel=="icon") {
            h.removeChild(links[i]);
        }
    }
    // Add this favicon to the head
    h.appendChild(ss);
    // Force browser to acknowledge
    var shim = document.createElement('iframe');
    shim.width = shim.height = 0;
    document.body.appendChild(shim);
    shim.src = "icon";
    document.body.removeChild(shim);

})(document, document.getElementsByTagName('head')[0]);