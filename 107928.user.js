// ==UserScript==
// @name            yunfile
// @namespace       yunfileAutoDown@fckmm
// @description     增强 yunfile 功能
// @include         http://www.yunfile.com/file/*
// @include         http://yunfile.com/file/*
// @author          fckmm
// @version         0.0.1
// @version         0.0.2
// ==/UserScript==
var url = window.location.href;
var scope = /down.*\.html$/.test(url) ? "downpage" : "prepage";
var yunfile = {
    init: function (scope) {
        this[scope]();
    },
    downpage: function () {
        var downloaded = false;
        function done(e) {
            window.removeEventListener(e.type, arguments.callee, false);
            if (downloaded) return;
            downloaded = true;
            try {
                document.getElementById("down_from").submit();
            } catch (ex) {}
        }
        window.addEventListener("DOMContentLoaded", done, false);
        window.addEventListener("load", done, false);
    },
    prepage: function () {
        var flags = false;
        function done(e) {
            window.removeEventListener(e.type, arguments.callee, false);
            if (flags) return;
            flags = true;
            if (/down.*\.html$/.test(document.referrer)) return;
            var win = (typeof unsafeWindow != 'undefined') ? unsafeWindow : window;
            var url = win.location.href;
            url = url.replace(/\/file\/(?=[^/]+?\/)(.+?)(\/?)$/, "/file/down/$1.html"); 
            win.location.replace(url);
        }
        window.addEventListener("DOMContentLoaded", done, false); // opera firefox
        window.addEventListener("load", done, false);
    }
}
yunfile.init(scope);
