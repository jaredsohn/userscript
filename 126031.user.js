// ==UserScript==
// @name        *veedama* Hatena::Star AutoSupplement
// @namespace   https://www.hatena.ne.jp/noromanba/
// @description Auto supplement Hatena::Star with AutoPatchWork / AutoPagerize for UserScript
// @include     http://*
// @include     https://*.hatena.tld/*
// @exclude     http://serif.hatelabo.jp/*
// @exclude     http://*.hatenablog.tld/*
// @exclude     http://*.hatenadiary.tld/*
// @exclude     http://*.hateblo.jp/*
// @version     2012.12.7.1
// @homepage    https://userscripts.org/scripts/show/126031
// @downloadURL https://userscripts.org/scripts/source/126031.user.js
// @installURL  https://userscripts.org/scripts/source/126031.user.js
// @updateURL   https://userscripts.org/scripts/source/126031.meta.js
// @license     MIT License http://nrm.mit-license.org/2012
// @copyright   (c) 2012 noromanba (https://www.hatena.ne.jp/noromanba/)
// @author      noromanba
// @icon        http://farm1.staticflickr.com/95/242189975_544ce3b6f3_s.jpg
// @icon64      http://farm1.staticflickr.com/95/242189975_544ce3b6f3_s.jpg
// ==/UserScript==

// Devel
// https://gist.github.com/1862384

// Icon (CC BY-NC-SA 2.0 by Ben McLeod)
// http://creativecommons.org/licenses/by-nc-sa/2.0/deed.en
// http://www.flickr.com/photos/44124472651@N01/242189975

(function () {
    // c.f. http://subtech.g.hatena.ne.jp/secondlife/20091228/1262001989
    //      https://gist.github.com/761858
    var executeBrowserContext = function (funcOrString) {
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.charset = 'utf-8';
        s.appendChild(document.createTextNode('(' + funcOrString.toString() + ')();'));
        (document.head || document.body).appendChild(s);
    };

    // c.f. https://github.com/hotchpotch/hatena-star-autopageload-googlechrome/blob/master/src/HatenaStarLoad.js
    var supplyStar = function () {
        if (!window.Hatena || !window.Hatena.Star) return;

        var loadContainer = function (node) {
            if (Hatena.Star.EntryLoader && Hatena.Star.EntryLoader.loadNewEntries) {
                Hatena.Star.EntryLoader.loadNewEntries(node);
            }
        };

        // TODO debouncing function calls or replace to MutationObserber
        // c.f. https://developer.mozilla.org/en-US/docs/DOM/MutationObserver
        //      http://www.w3.org/TR/domcore/#mutationobserver
        document.body.addEventListener('AutoPatchWork.DOMNodeInserted', function (evt) {
            loadContainer(evt.target);
        }, false);

        document.body.addEventListener('AutoPagerize_DOMNodeInserted', function (evt) {
            loadContainer(evt.target);
        }, false);

        // if you use 'AutoPager Chrome', remove '/*' and '*/'. no needed to AutoPager for Firefox
        // https://chrome.google.com/webstore/detail/autopager-chrome/mmgagnmbebdebebbcleklifnobamjonh
        /*
        document.body.addEventListener('AutoPagerAfterInsert', function (evt) {
            loadContainer(evt.target);
        }, false);
        */
    };

    executeBrowserContext(supplyStar);
})();