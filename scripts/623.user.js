// ==UserScript==
// @name           CPAN Image Fixer
// @namespace      http://chocolatey.com/code/js
// @description    Display images on CPAN when referrer logging is disabled
// @author         chocolateboy <chocolate.boy@email.com>
// @include        http://cpan.org
// @include        http://cpan.org/*
// @include        http://*.cpan.org
// @include        http://*.cpan.org/*
// ==/UserScript==

(function () {
    const xpath = '//img[@src="/s/img/cpan_banner.png" or starts-with(@src, "/s/img/stars-")]';
    var images = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var i = 0; i < images.snapshotLength; ++i) {
        var image = images.snapshotItem(i);
        var src = image.getAttribute('src');

        if (src == '/s/img/cpan_banner.png') {
            src = 'http://cpan.org/misc/jpg/cpan.jpg';
        } else {
            src = src.replace(/^\/s\/img\/stars-(\d)\.(\d)\.gif$/, 'http://cpanratings.perl.org/images/stars-$1.$2.png');
        }

        image.setAttribute('src', src);
    }
})();
