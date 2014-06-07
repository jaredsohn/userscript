// ==UserScript==
// @name       Show Github commit user email
// @version    0.1
// @description  Github is hiding Git commit emails on diffs. This will show it using Github API
// @match      https://github.com/*
// ==/UserScript==
/*jslint browser: true, regexp: true*/
/*global GM_xmlhttpRequest*/
(function () {
    'use strict';

    function parseCommitShowEmail(result) {
        var node = document.querySelector('div.commit.full-commit > div.commit-meta.clearfix > div > span > *'),
            author = JSON.parse(result.response).commit.author;
        if (node.innerHTML !== author.name) {
            node.innerHTML = author.name + ' (' + node.innerHTML + ')';
        }
        node.parentNode.innerHTML = node.parentNode.innerHTML + ' &lt;<a href="mailto:' + author.email + '" style="color: #4183c4">' + author.email + '</a>&gt;';
    }

    function main() {
        var matchedUrl = /^https:\/\/github.com\/([^\/]*)\/([^\/]*)\/commit\/([\da-f]{4,40})$/.exec(location.href);
        if (matchedUrl) {
            GM_xmlhttpRequest({
                method: 'GET',
                url: 'https://api.github.com/repos/' + matchedUrl[1] + '/' + matchedUrl[2] + '/commits/' + matchedUrl[3],
                onload: parseCommitShowEmail
            });
        }
    }

    main();

    // proxy history api
    (function (old) {
        history.pushState = function () {
            old.apply(window.history, arguments);
            main();
        };
    }(window.history.pushState));
}());