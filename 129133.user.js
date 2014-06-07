// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Link to Story 2
// @namespace      loominate.net
// @version        1.4
// @description    Used on github.com to convert a story id to a link to the pivotal tracker story.
// @include        https://github.com/*/commits/*
// @include        https://github.com/*/commits
// @include        https://github.com/*/commit/*
// @include        https://github.com/*/pull/*
// ==/UserScript==
"use strict";
var regex = /\[[^\]]*#([0-9]{8}).*\]/;

function alwaysTrue(x) { return true; }

function createLinksToStories(className, elementFilter)
{
    if (!elementFilter) {
        elementFilter = alwaysTrue;
    }

    var elements = document.getElementsByClassName(className);
    for (var index in elements) {
        var element = elements[index];
        if (elementFilter(element)) {
            var matches = regex.exec(element.innerHTML);
            if (matches) {
                element.innerHTML = element.innerHTML + "<a href='https://www.pivotaltracker.com/story/show/" + matches[1] + "'><img src='https://www.pivotaltracker.com/favicon.ico'/></a>"
            }
        }
    }
}


var pullRequestRegex = new RegExp("https://github.com/.*/.*/pull/[0-9]*");
function isPullRequestPage() {
    return pullRequestRegex.test(document.location);
}

function isAnchor(element) {
    return (element.localName === "a");
}

createLinksToStories('commit-title');
createLinksToStories('content-title');

if (isPullRequestPage()) {
    createLinksToStories('message', isAnchor);
}


