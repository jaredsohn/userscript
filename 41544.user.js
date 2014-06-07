// ==UserScript==
// @name           iciba hy
// @namespace      cavingdeep
// @description    Includes a iciba script in every page to help you use translations.
// @include        http://*
// ==/UserScript==

function GM_LoadjQuery() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "http://code.jquery.com/jquery-latest.min.js";
        document.getElementsByTagName("head")[0].appendChild(script);
    }
    waitForScriptLoading();
}

function waitForScriptLoading() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(waitForScriptLoading, 100);
    } else {
        unsafeWindow.jQuery.noConflict();
        $ = unsafeWindow.jQuery;
        letsjQuery();
    }
}

function letsjQuery() {
    if (typeof unsafeWindow.KSHY == 'undefined') {
        // $('<span id="kshy_switch"></span>').appendTo('body');
        $('<script type="text/javascript" src="http://z6qlgq.blu.livefilestore.com/y1pMXZ3p02cLF1TTOErOCAKj2lt4N-Cpb_xC_4r1LRldsr1bfIqXSiCMf78OqCv8aBJqDjtdx15i1I-gpARxOjE4g/hy.js" charset="UTF-8"></script>').appendTo('body');
    }
}

GM_LoadjQuery();
