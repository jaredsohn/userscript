// ==UserScript==
// @name       The Replacer Amazon Fucking URL With Shorter
// @namespace  http://aycabta.github.io/
// @version    0.3
// @description  Replace long URL with short URL
// @include    http://www.amazon.*/*
// @copyright  2013+, Code Ass
// ==/UserScript==

(function(){
    function replaceFuckingAmazonURL(url) {
        url = url.replace(/http:\/\/www\.amazon\.([^\/]+)\/(?:.*\/)*ASIN\/([A-Z0-9]{10}|[A-Z0-9]{10}|[A-Z0-9]{12}).*$/g, 'http://www.amazon.$1/dp/$2');
        url = url.replace(/http:\/\/www\.amazon\.([^\/]+)\/(?:.*\/)*(?:[a-z]p)\/(?:.*\/)*([A-Z0-9]{10}|[A-Z0-9]{10}|[A-Z0-9]{12}).*$/, 'http://www.amazon.$1/dp/$2');
        return url;
    }

    var url = replaceFuckingAmazonURL(document.location.href);
    if (document.location.href != url) {
        document.location.href = url;
    } else {
        var links = document.getElementsByTagName('a');
        for (i = 0; i < links.length; i++) {
            var link = links[i];
            var replacedHref = replaceFuckingAmazonURL(link.href);
            if (replacedHref != link) {
                link.href = replacedHref;
            }
        }
    }
})();
