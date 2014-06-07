// ==UserScript==
// @name          CleanDVDBA
// @version       0.0.1
// @namespace     http://wecing.org
// @description   清除dvdba.cc页面上的所有垃圾广告
// @include       http://www.dvdba.cc/*
// ==/UserScript==

// why not working?
// @require       https://ajax.googleapis.com/ajax/libs/prototype/1.7.0.0/prototype.js

(function () {
   function g(_id) {
        return document.getElementById(_id);
    }
    function r(_n) {
        if (_n) {
            _n.parentNode.removeChild(_n);
        }
    }
    function map(_list, _func) {
        for (var i = _list.length - 1; i >= 0; i--) {
            _func(_list[i]);
        }
    }

    function removeWithKeyword(tn, p) {
        var t = document.getElementsByTagName(tn);
        map(t, function (_p) {
            if (_p.id.search(p) != -1) {
                // console.log(_p.id);
                r(_p);
            }
        });
    }

    var old_f = null;
    if (window.onload) {
        old_f = window_onload;
    }
    window.onload = function () {
        if (old_f) {
            old_f();
        }

        // var t = g("czun_fadv1");
        // r(t);
        // console.log("czun_fadv1 removed");

        removeWithKeyword("div", "cproIframe");
        removeWithKeyword("iframe", "sogou_ads");
        removeWithKeyword("iframe", "cproIframe")

        // var idList = ["czun_fadv1", "cproIframe2holder", "cproIframe1holder",
        //               "sogou_ads_frame0", "cproIframe4", "sogou_ads_frame2",
        //               "sogou_ads_frame1"];
        var idList = ["czun_fadv1"];
        var adsList = document.getElementsByClassName("ad970");
        map(idList, function(_id) {
            var t = g(_id);
            r(t);
        });
        map(adsList, r);

        // t = document.getElementsByTagName("div");
        // for (var i = 0; i < t.length; i++) {
        //     if (t[i].style.zIndex == 2147483647) {
        //         r(t[i]);
        //         console.log("removed one node");
        //     }
        // }
    }
})();
