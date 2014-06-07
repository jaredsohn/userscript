// ==UserScript==
// @name        Google SSL Web Cache
// @namespace   org.upsuper.google
// @include     http://www.google.com/*
// @include     https://www.google.com/*
// @include     http://www.google.co.jp/*
// @include     https://www.google.co.jp/*
// @include     http://www.google.com.hk/*
// @include     https://www.google.com.hk/*
// @include     https://webcache.googleusercontent.com/*
// @version     1
// @grant       none
// ==/UserScript==

(function () {
    function $(q) { return document.querySelectorAll(q); }

    function updateAnchors() {
        var $anchors = $('a[href^="http://webcache.googleusercontent.com/"]');
        for (var i = 0; i < $anchors.length; i++) {
            var $a = $anchors[i];
            $a.onmousedown = undefined;
            $a.href = $a.href.replace(/^http:/, 'https:');
        }
    }
    updateAnchors();

    var $main = $('#main');
    if ($main.length > 0) {
        $main[0].addEventListener('DOMSubtreeModified', function (evt) {
            if (evt.target.id == 'search')
                updateAnchors();
        });
    }
})();
