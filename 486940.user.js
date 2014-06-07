/*

Following code belongs to Auto Refresh for Twitter.
Copyright (C) 2014 Jackson Tan

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.

*/

// ==UserScript==
// @id             AutoRefreshTwitter
// @name           Auto Refresh for Twitter
// @version        1.0.1
// @namespace      AST
// @author         Jackson Tan
// @description    Auto-Refresh Support for Twitter (WebKit and Firefox Compatible).
// @include        https://twitter.com/*
// @run-at         document-end
// ==/UserScript==

var autoRefreshTrigger = setInterval(autoRefresh, 2000);

function autoRefresh() {
    var refreshBtnTree = document.getElementsByClassName("stream-container")[0];
    if (refreshBtnTree != undefined) {
        clearInterval(autoRefreshTrigger);
        document.getElementsByClassName("stream-container")[0].addEventListener("DOMSubtreeModified", function () {
            if (document.getElementsByClassName("new-tweets-bar").length != 0)
                    document.getElementsByClassName("new-tweets-bar")[0].click();
        }, false);

        var element = document.getElementsByClassName("stream-container")[0], bubbles = false;
        var observer = new WebKitMutationObserver(function (mutations) {
            mutations.forEach(attrModified);
        });
        observer.observe(element, { attributes: true, subtree: bubbles });
        function attrModified(mutation) {
            if (document.getElementsByClassName("new-tweets-bar").length != 0)
                document.getElementsByClassName("new-tweets-bar")[0].click();
        }
    }
}