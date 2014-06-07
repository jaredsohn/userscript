// ==UserScript==
// @name            Motherless Full Image Links
// @namespace       MoFuL
// @include         http://motherless.com/*
// @version         1.0
// ==/UserScript==

// <a href="http://motherless.com/FB7C2B8" class="img-container" target="_blank">

var links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
        var aClass = links[i].getAttribute('class');
        if (aClass == 'img-container') {
                var pType = links[i].parentNode.getAttribute('class');

                if (pType.match(/image/)) {
                        var oldLink = links[i].getAttribute('href');
                        var newLink = oldLink + '?full';
                        links[i].setAttribute('href', newLink);
                }
        }
}

