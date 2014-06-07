// ==UserScript==
// @name LearnJCU Content Unwrapper
// @description Unwrap the links on the JCU Blackboard v9.0 site, increasing load times and allowing you to save resources links directly.
// @namespace http://userscripts.org/scripts/show/95301
// @version 1.0
// @include https://learnjcu.jcu.edu.au/*
// ==/UserScript==

if (typeof(content) != "undefined") { // since I'm too lazy to define @include in proper detail
    var allLinks = content.getElementsByTagName("a");

    for (var i = 0; i < allLinks.length; i++) {
        if (allLinks[i].getAttribute("href") == null) {
            continue;
        } else if (allLinks[i].getAttribute("href").indexOf("http") == 0) {
            allLinks[i].setAttribute("target", "_top");
        } else if (allLinks[i].getAttribute("onclick") == null) {
            continue;
        } else if (allLinks[i].getAttribute("onclick").match("contentWrapper.jsp") == null) {
            continue;
        } else {
            allLinks[i].removeAttribute("onclick");
            allLinks[i].setAttribute("target", "_top");
        }
    }
}