// ==UserScript==
// @name           AppBrain Timeline Cleaner
// @namespace      http://www.maisdisdonc.com
// @description    AppBrain Timeline Cleaner remove all elements in your timeline. IMPORTANT ! Remove it after cleaning.
// @include        http://*.appbrain.com/user/*/timeline/*
// @include        http://*.appbrain.com/user/*/stream
// @author         Merimac
// @version        1.0.3
// @date           15:27 18/05/2012
// @license        Creative Commons Attribution-NonCommercial-ShareAlike 2.0 France
// ==/UserScript==

(function () {
    var t, deleteStr = "Delete this item";
    function cleaner() {
        if (document.getElementsByClassName("GI5UI5NBMU")) {
            document.getElementsByClassName("GI5UI5NBMU")[0].click();
            var el = document.getElementsByClassName("menu-entry");
            if (el && el[(el.length - 1)].innerHTML == deleteStr) {
                el[(el.length - 1)].click();
            }
            clearInterval(t);
        }
    }

    function addLoadListener(func) {
        if (window.addEventListener) {
            window.addEventListener("load", func(), false);
        } else if (document.addEventListener) {
            document.addEventListener("load", func(), false);
        } else if (window.attachEvent) {
            window.attachEvent("onload", func());
        }
    }

    if (document.getElementById && document.createTextNode) {
        setInterval(function () {
            t = addLoadListener(cleaner);
        }, 5000);
    }
})();
