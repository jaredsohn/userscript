// ==UserScript==
// @name        Go Defrustrator
// @namespace   http://github.com/programmiersportgruppe/go-defrustrator
// @description Greasemonkey script to defrustrate the ThoughtWorks Go user interface experience.
// @version     0.36
// @include     http://*:8153/go/*
// @grant       none
// @copyright   2013 Programmiersportgruppe
// ==/UserScript==


var addConfigLink = function() {
    var configUrl = window.location.pathname
        .replace(RegExp('/go/tab/pipeline/history/([^/]+)$'), '/go/admin/pipelines/$1/materials')
        .replace(RegExp('/go/pipelines/([^/]+)/[^/]+/([^/]+)/[^/]+(/pipeline)?$'), '/go/admin/pipelines/$1/stages/$2/settings')
        .replace(RegExp('/go/tab/build/detail/([^/]+)/[^/]+/([^/]+)/[^/]+/([^/]+)$'), '/go/admin/pipelines/$1/stages/$2/job/$3/tasks');

    if (configUrl != window.location.pathname)
        (document.getElementsByTagName("h1")[0] ||
         document.getElementsByTagName("h2")[0])
        .appendChild(document.createElement('a')).outerHTML = '<a href="' + configUrl + '" style="margin-left: 1em; font-size: 1em">[Edit Config]</a>';
};

var applyRegex = function(body, pattern, change) {
    body.innerHTML = body.innerHTML.replace(pattern, change);
};

var addColors = function(body) {
    applyRegex(body,/\n(.*)LoadError(.*)\n/g, "\n<span style='color: red;'>$1LoadError$2</span>\n");
    applyRegex(body,/\[go\](.*)\n/g, "<span style='color: gray;'>[go] $1</span>\n");
    applyRegex(body,/Failures: ([1-9])(.*)\n/g, "<span style='color: red;'>Failures: $1$2</span>\n");
    applyRegex(body,/(\[?\bERROR\b.*)\n/gi, "<span style='color: red;'>$1</span>\n");
    applyRegex(body,/Failed tests(.*)\n/g, "<span style='color: red;'>Failed tests$1</span>\n");
    applyRegex(body,/\[1m(.*)\[0m/g, "<b>$1</b>");
    applyRegex(body,/Exception/g, "<b>Exception</b>");
    applyRegex(body,/\[.*32m(.*)\[0m/g, "<span style='color: green;'>$1</span>");
    applyRegex(body,/\[.*36m(.*)\[0m/g, "<span style='color: brown;'>$1</span>");
    applyRegex(body,/\[.*33m(.*)\[0m/g, "<span style='color: brown;'>$1</span>");
    applyRegex(body,/\[.*35m(.*)\[0m/g, "<span style='color: red;'>$1</span>");
    applyRegex(body,/\[.*31m(.*)\[0m/g, "<span style='color: red;'>$1</span>");
};


addConfigLink();


window.onload=function(){
    var frame = document.getElementById("console_iframe");
    frame.onload = function() {
        addColors(frame.contentDocument.body);
    };
    frame.onload();
};

var buildoutput_pre = document.getElementById("buildoutput_pre");
if (buildoutput_pre) {
    addColors(buildoutput_pre);
}

