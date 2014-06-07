// ==UserScript==
// @name            HKGalden Code Prettifier
// @namespace       http://about.me/hkgsherlock
// @description     Prettify codes in HKGalden using "highlight.js" library.
// @version         20140223T2020+8
// @author          hkgsherlock
// @license         Public Domain
// @run-at          document-end
// @icon            https://hkgalden.com/favicon.ico
// @include         http://hkgalden.com/view/*
// @include         http://hkgalden.com/ajax/loadReplies/*
// @require         http://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.0/highlight.min.js
// @updateURL       https://userscripts.org/scripts/source/393503.meta.js
// @downloadURL     https://userscripts.org/scripts/source/393503.user.js
// ==/UserScript==

// main thread
var script1 = document.createElement("script");
script1.src = "http://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.0/highlight.min.js";
document.getElementsByTagName('head')[0].appendChild(script1);
hljs.initHighlighting();

var style = document.createElement("style");
style.type = "text/css";
style.innerHTML  = ".hljs { font-family: Consolas, \"Lucida Console\", Monaco, \"Courier New\", Courier, monospace; }";
style.innerHTML += ".gpt .r .hljs { background: transparent !important; }";
style.innerHTML += ".prevcon.hljs { background: " + getPreBgColour() + " !important; }";
if (getPreBgColour() == "rgba(255, 255, 255, 0.3)") // same color as comments color in light theme
    style.innerHTML += ".smartquote, .hljs-comment, .hljs-annotation, .hljs-template_comment, .diff .hljs-header, .hljs-chunk, .asciidoc .hljs-blockquote, .markdown .hljs-blockquote { color: #555 !important; }";
document.getElementsByTagName('head')[0].appendChild(style);

var link = document.createElement("link");
link.href = "http://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.0/styles/default.min.css";
link.rel = "stylesheet";
link.type = "text/css";
if (!isTooLightYIQ(getPreBgColour(), 64)) {
    link.href = "http://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.0/styles/ir_black.min.css";
}
document.getElementsByTagName('head')[0].appendChild(link);

var timerDynamicFormat;
document.addEventListener('DOMNodeInserted', function() {
    clearInterval(timerDynamicFormat);
    timerDynamicFormat = setTimeout(function() {
        var notFormatted = document.querySelectorAll('pre code:not(.hljs)');
        for (var i = 0; i < notFormatted.length; i++) {
            hljs.highlightBlock(notFormatted[i]);
        }
    }, 500);
}, false);

// function list
function getPreBgColour() {
    var testDark = document.querySelectorAll('.gpt .r pre')[0];
    if (typeof testDark != "undefined") {
        var strPreBgColour = window.getComputedStyle(testDark).getPropertyValue("background-color");
        return strPreBgColour;
    }
    return null;
}

function isTooLightYIQ(value, std) { // stackoverflow 5477702
    var r = 0;
    var g = 0;
    var b = 0;
    if (value.indexOf("#",0) == 0) {
        r = parseInt(hexcolor.substr(1,2),16);
        g = parseInt(hexcolor.substr(3,2),16);
        b = parseInt(hexcolor.substr(5,2),16);
    } else if (value.indexOf("rgb(",0) == 0 && value.lastIndexOf(")") > -1) {
        var colourNotSplitted = value.substring(value.indexOf("(") + 1, value.indexOf(")", value.indexOf("(")));
         while (colourNotSplitted.indexOf(" ") > -1)
            colourNotSplitted = colourNotSplitted.replace(" ", "");
        var colourSplitted = colourNotSplitted.split(",");
        r = parseInt(colourSplitted[0]);
        g = parseInt(colourSplitted[1]);
        b = parseInt(colourSplitted[2]);
    } else if (value.indexOf("rgba(",0) == 0 && value.lastIndexOf(")") > -1) {
        var colourNotSplitted = value.substring(value.indexOf("(") + 1, value.indexOf(")", value.indexOf("(")));
        while (colourNotSplitted.indexOf(" ") > -1)
            colourNotSplitted = colourNotSplitted.replace(" ", "");
        var colourSplitted = colourNotSplitted.split(",");
        var a = parseFloat(colourSplitted[3]);
        r = parseFloat(colourSplitted[0]) * a;
        g = parseFloat(colourSplitted[1]) * a;
        b = parseFloat(colourSplitted[2]) * a;
    } else {
        return true;
    }
    var yiq = ((r*299)+(g*587)+(b*114))/1000;
    return yiq >= std;
}