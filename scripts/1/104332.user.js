// ==UserScript==
// @name          V2EX Target Blank
// @namespace     http://userstyles.org
// @description	  nope
// @author        Reorx
// @homepage      http://nope.xx/
// @include       http://v2ex.com/*
// @include       https://v2ex.com/*
// @include       http://*.v2ex.com/*
// @include       https://*.v2ex.com/*
// @include       http://v2ex.appspot.com/*
// @include       https://v2ex.appspot.com/*
// @include       http://*.v2ex.appspot.com/*
// @include       https://*.v2ex.appspot.com/*
// @include       http://www.v2ex.com/t*
// @include       http://v2ex.appspot.com/t*
// @include       http://www.v2ex.com/settings*
// @include       http://v2ex.appspot.com/settings*
// @include       http://www.v2ex.com/recent*
// @include       http://v2ex.appspot.com/recent*
// ==/UserScript==
(function () {
    var TagAs = document.getElementsByTagName("a");
    for (i=0;i<TagAs.length;i++) {
        var TagA = TagAs[i];
        if (TagA.hasAttribute('href')) {
            var TagALink = TagA.getAttribute('href');
            if (!(TagALink.match('/signout') || TagALink.match('/favorite/') || TagALink.match('follow/'))) {
                if (TagALink[0] != '#') {
                    TagA.setAttribute('target', '_blank');
                }
            }
        }
    }
})();
