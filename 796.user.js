// ==UserScript==
// @name          Slashdot Logo Replacer
// @description	  Replaces the Slashdot logo.
// @include       http://slashdot.org/*
// @exclude       http://politics.slashdot.org/*

//by Josh Wheeler (deltalima@gmail.com)
// ==/UserScript==

(function () {
    const xpath = '//img[@src="//images.slashdot.org/title.gif"]';
    var images = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var i = 0; i < images.snapshotLength; ++i) {
        var image = images.snapshotItem(i);
        var src = image.getAttribute('src');

        if (src == '//images.slashdot.org/title.gif') {
            src = 'http://i2.photobucket.com/albums/y6/220040DeltaLima/Avatars/slashlogo.gif';
        }
        image.setAttribute('src', src);
    }
})();