// ==UserScript==
// @name           Geeksworld skin'n nav
// @namespace      http://userscripts.org/scripts/show/60605
// @description    geeksworld.org new skin and navigation shortcuts  
// @homepage       http://userscripts.org/scripts/show/60605
// @include        http://www.geeksworld.org/*
// ==/UserScript==

var css = 
    "@namespace url(http://www.w3.org/1999/xhtml); "+
    "div#content { padding : 0 0.5em 0.5em 255px; !important; } "+
    "div#content { background : none; !important; } "+
    "div#content, div#leftbar { font-family : Arial, sans-serif; !important; } "+
    "div#content, div#leftbar { font-size : small; !important; } "+
    "body { background : none; !important; } "+
    "div#leftbar { border-right : 1px solid #C9D7F1; !important; } "+
    "div#leftbar { padding : 10px; !important; } "+
    "div#leftbar { top : 0px; !important; } "+
    "div#leftbar { width : 225px; !important; } "+
    "img[src='/imgs/cookie.png'] { padding : 4px; !important; } "+
    "html > body div#comment_Salagir { background : none; !important; } "+
    "a { color : blue; !important; } "+
    "a { text-decoration : none; !important; } "+
    "a:active { color : red; !important; } "+
    "a:link, a:visited { color : #2200cc; !important; } "+
    "div#leftbar h2 { border-width : 0px; !important; } "+
    "div#leftbar h2 { border-top : 1px solid #6B90DA; !important; } "+
    "div#leftbar h2 { background : #F0F7F9 none repeat scroll 0 0; !important; } "+
    "div#leftbar h2 { -moz-border-radius : 0px; !important; } "+
    "div#leftbar h2 { margin-bottom : 0.5em; !important; } "+
    "div#leftbar div.menu { border-width : 0px; !important; } "+
    "div#leftbar div.menu { margin-bottom : 1.5em; !important; } "+
    "div.reader_comment { border-width : 0px; !important; } "+
    "div.author_comment { border-width : 0px; !important; } "+
    "div.author_comment h2, div.reader_comment h2 { border-width : 0px; !important; } "+
    "div.author_comment h2, div.reader_comment h2 { border-top : 1px solid #6b90da; !important; } "+
    "div.author_comment h2, div.reader_comment h2 { background : #f0f7f9; !important; } "+
    "div.author_comment h2, div.reader_comment h2 { -moz-border-radius : 0px; !important; } "+
    "div.author_comment h2, div.reader_comment h2 { color : black; !important; } "+
    "div.author_comment h2, div.reader_comment h2 { padding-top : 3px; !important; } "+
    "div.author_comment h2, div.reader_comment h2 { padding-bottom : 3px; !important; } "+
    "div.author_comment h2, div.reader_comment span.date { color : black; !important; } "+
    "div.author_comment h2, div.reader_comment { margin-bottom : 1em; !important; } "+
    "div.reader_comment div.rep { background : #e2ecf0; !important; } "+
    "div.reader_comment div.rep { color : #000066; !important; } "+
    "div.reader_comment div.rep { border : 1px dotted #6b90da; !important; } "+
    "div.half h4 { background : #F0F7F9; !important; } "+
    "div.half h4 { border-top : 1px solid #6B90DA; !important; } "+
    "div.half h4 { padding : 3px 0 3px 0; !important; } "+
    "div.author_comment h4 { color : black; !important; } "+
    "div.reader_comment form h2 input, div.reader_comment form textarea { background : #e2ecf0; !important; } "+
    ".commenthelp { background : #F0F7F9; !important; } "+
    "div.reader_comment { background : none; !important; } "+
    "div > img#dastrip { background : #F0F7F9; !important; } "+
    "div > img#dastrip { border : 2px solid #e2ecf0; !important; } "+
    "div#leftbar div.small { border : 1px solid #880; !important; } "+
    "div#leftbar div.small { padding : 15px; !important; } "+
    "div > img#dastrip { -moz-border-radius : 10px; !important; } "+
    "div > img#dastrip { margin-top : 15px; !important; } "+
    "div > img#dastrip { margin-bottom : 15px; !important; } "+
    "div#runningags { display : none; !important; } "+
    "div#megatitre { display : none; !important; } "+
    "#avatar { display : none; !important; } "+
    "div#content > p:first-child { display : none; !important; } "+
    " "+


    "";

// ===== CSS Loader ( based on http://userscripts.org/scripts/show/9691 ) =====
if (typeof GM_addStyle != "undefined") {
    GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
    addStyle(css);
} else {
    var heads = document.getElementsByTagName("head");
    if (heads.length > 0) {
        var node = document.createElement("style");
        node.type = "text/css";
        node.innerHTML = css;
        heads[0].appendChild(node); 
    }
}
// ===== CSS Loader ( based on http://userscripts.org/scripts/show/9691 ) =====

function GM_add_css(href) {
    var node = document.createElement('link');
    node.rel = 'stylesheet';
    node.href = href;
    node.type = 'text/css';
    document.getElementsByTagName('head')[0].appendChild(node);
}
function GM_add_script_ref(src) {
    var node = document.createElement('script');
    node.src = src;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
}
function GM_add_script_content(content) {
    var node = document.createElement('script');
    node.type = 'text/javascript';
    node.text = content;
    document.getElementsByTagName('head')[0].appendChild(node);
}
// ===== jQuery Loader ( based on http://joanpiedra.com/jquery/greasemonkey/ ) =====
var GM_jquery_version = "1.3";

GM_add_script_ref('http://ajax.googleapis.com/ajax/libs/jquery/' + GM_jquery_version + '/jquery.min.js');
GM_add_script_content("jQuery.noConflict();");

// Check if jQuery's loaded
function GM_wait() {
    // if an older (or other) version of jquery already exist in the page, we wait until our version is loaded
    if((typeof unsafeWindow.jQuery == 'undefined') || (unsafeWindow.jQuery.fn.jquery.substring(0,GM_jquery_version.length) != GM_jquery_version)) { 
        window.setTimeout(GM_wait,100); 
    } else { 
        jQuery = unsafeWindow.jQuery; 
        mainJQueryCode(jQuery); 
    }
}
GM_wait();
// ===== jQuery Loader ( based on http://joanpiedra.com/jquery/greasemonkey/ ) =====

// ===== main jQuery code =====
function mainJQueryCode($) {
    var VK = {
        BACKSPACE: 8, 
        TAB: 9,
        ENTER: 13, 
        SHIFT: 16, 
        CONTROL: 17, 
        CAPS_LOCK: 20, 
        ESCAPE: 27, 
        SPACE: 32, 
        PAGE_UP: 33, 
        PAGE_DOWN: 34, 
        END: 35, 
        HOME: 36, 
        LEFT: 37, 
        UP: 38,
        RIGHT: 39, 
        DOWN: 40, 
        INSERT: 45, 
        DELETE: 46, 
        
        A:65,
        B:66,
        C:67,
        D:68,
        E:69,
        F:70,
        G:71,
        H:72,
        I:73,
        J:74,
        K:75,
        L:76,
        M:77,
        N:78,
        O:79,
        P:80,
        Q:81,
        R:82,
        S:83,
        T:84,
        U:85,
        V:86,
        W:87,
        X:88,
        Y:89,
        Z:90,

        NUMPAD_MULTIPLY: 106, 
        NUMPAD_ADD: 107, 
        NUMPAD_ENTER: 108, 
        NUMPAD_SUBTRACT: 109, 
        NUMPAD_DECIMAL: 110, 
        NUMPAD_DIVIDE: 111, 
        COMMA: 188, 
        PERIOD: 190
    };
    function setlocation(selector) {
        var href=$(selector).attr("href");
        if (href != null) {
            document.location = href;
        }
    }
    $(document).keydown(function(e){
        if (e.which == VK.LEFT) { setlocation("a[accesskey='p']"); } 
        else if (e.which == VK.RIGHT) { setlocation("a[accesskey='n']"); } 
        else if (e.which == VK.F) { setlocation("a[accesskey='f']"); } 
        else if (e.which == VK.P) { setlocation("a[accesskey='p']"); } 
        else if (e.which == VK.N) { setlocation("a[accesskey='n']"); } 
        else if (e.which == VK.L) { setlocation("a[accesskey='l']"); } 
        else if (e.which == VK.X) { setlocation("a[accesskey='x']"); } 
        else if (e.which == VK.C) { setlocation("a[accesskey='c']"); } 
        else if (e.which == VK.V) { setlocation("a[accesskey='v']"); } 
        else if (e.which == VK.B) { setlocation("a[accesskey='b']"); } 
    });
}
// ===== main jQuery code =====
