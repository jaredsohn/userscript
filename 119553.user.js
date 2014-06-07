// ==UserScript==
// @name           FeedsportalSkip
// @description    Skip the ad page on feedsportal.com
// @namespace      -oxo-
// @include        http://da.feedsportal.com/*
// ==/UserScript==

var divs = document.getElementsByTagName('div');
for (var idx in divs) {
    var div = divs[idx];
    if (div.getAttribute('align') == 'right') {
        var as = div.getElementsByTagName('a');
        var url = as[0].getAttribute('href');
        // alert(url);
        document.location = url;
        break;
    }
}

