// ==UserScript==
// @name           SyntaxHighlighter
// @namespace      http://www.kodewerx.org/
// @description    Enable syntax highlighting on raw source code text, using Alex Gorbachev's SyntaxHighlighter library: http://alexgorbatchev.com/
// @include        *
// @require        http://alexgorbatchev.com.s3.amazonaws.com/pub/sh/3.0.83/scripts/shCore.js
// @require        http://alexgorbatchev.com.s3.amazonaws.com/pub/sh/3.0.83/scripts/shBrushCpp.js
// @require        http://alexgorbatchev.com.s3.amazonaws.com/pub/sh/3.0.83/scripts/shBrushCss.js
// @require        http://alexgorbatchev.com.s3.amazonaws.com/pub/sh/3.0.83/scripts/shBrushJScript.js
// @require        http://alexgorbatchev.com.s3.amazonaws.com/pub/sh/3.0.83/scripts/shBrushXml.js
// @resource       shCore_css http://alexgorbatchev.com.s3.amazonaws.com/pub/sh/3.0.83/styles/shCore.css
// @resource       shThemeDefault_css http://alexgorbatchev.com.s3.amazonaws.com/pub/sh/3.0.83/styles/shThemeDefault.css
// ==/UserScript==

var file_ext = {
    // C, C++
    "c": [
        "c", "cc", "cpp", "cxx", "h", "hpp", "hxx", "m"
    ],

    // JavaScript
    "js": [],

    // CSS
    "css": [],

    // HTML
    "html": [
        "htm", "html", "xhtml", "shtml", "xml", "xslt"
    ]
};
var media_types = [
    "application/javascript",
    "application/x-javascript",
    "text/css",
    "text/javascript",
    "text/plain"
];

var loc = document.URL;

var wants_highlight = false;
for (var i in file_ext) {
    var exp = "\.(%s)$";

    if (file_ext[i].length) {
        exp = exp.replace("%s", file_ext[i].join("|"));
    }
    else {
        exp = exp.replace("%s", i);
    }

    var rx = new RegExp(exp);
    if (rx.test(loc)) {
        wants_highlight = i;
        break;
    }
}

var content_types = new RegExp("^(%s)$".replace("%s", media_types.join("|")));
if ((content_types.test(document.contentType)) && (wants_highlight)) {
    var head = document.getElementsByTagName("head")[0];

    window.addEventListener("load", function () {
        var pre = document.getElementsByTagName("pre")[0];
        pre.setAttribute("class", "brush: " + wants_highlight + "; toolbar: false; quick-code: false;");

        create_style(head, "shCore_css");
        create_style(head, "shThemeDefault_css");

        SyntaxHighlighter.highlight();
    }, false);
}

function create_style(parent, resource) {
    var style = document.createElement("style");

    style.setAttribute("type", "text/css");
    style.innerHTML = GM_getResourceText(resource);

    parent.appendChild(style);
}
