/*

Following code belongs to Readibility Enhancer for Google+.
Copyright (C) 2013 Jackson Tan

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
// @id             AutoStreamRefreshWKit
// @name           Auto Refresh for Google+ (WebKit)
// @version        1.2.22
// @namespace      ASR
// @author         Jackson Tan
// @description    Restore auto-refresh feature for Google+ (WebKit Compatible).
// @include        https://plus.google.com/*
// @run-at         document-end
// ==/UserScript==

GM_addStyle = function (css) {
    var head = document.getElementsByTagName('head')[0], style = document.createElement('style');
    if (!head) { return }
    style.type = 'text/css';
    try { style.innerHTML = css } catch (x) { style.innerText = css }
    head.appendChild(style);
}

var css_Auto_Refresh = ".tke.oDc {\nvisibility: hidden;\n}\n\n.tke.oDc.qDc.pDc {\nvisibility: visible !important;\n}\n}";
GM_addStyle(css_Auto_Refresh);

var autoRefreshTrigger = setInterval(autoRefresh, 2000);

function autoRefresh() {
    if (document.getElementsByClassName("tke oDc")[0] != undefined) {
        clearInterval(autoRefreshTrigger);
        if (typeof InstallTrigger != 'undefined') {
            document.getElementsByClassName("tke oDc")[0].addEventListener('DOMSubtreeModified', function () {
                if (document.getElementsByClassName("d-k-l b-c b-c-U JFd JZ").length != 0) {
                    if (document.documentElement.scrollTop <= 200 && document.getElementById("gbsfw").childNodes[0].getAttribute("aria-hidden") == "true" && document.getElementsByClassName("XH Qp").length == 0) {
                        document.getElementsByClassName("d-k-l b-c b-c-U JFd JZ")[0].click();
                    }
                }
            }, false);
        }
        else {
            var element = document.getElementsByClassName("tke oDc")[0], bubbles = false;
            var observer = new WebKitMutationObserver(function (mutations) {
                mutations.forEach(attrModified);
            });
            observer.observe(element, { attributes: true, subtree: bubbles });
            function attrModified(mutation) {
                if (document.getElementsByClassName("d-k-l b-c b-c-U JFd JZ").length != 0) {
                    if (document.documentElement.scrollTop <= 200 && gbsfw.childNodes[0].getAttribute("aria-hidden") == "true" && document.getElementsByClassName("XH Qp").length == 0) {
                        document.getElementsByClassName("d-k-l b-c b-c-U JFd JZ")[0].click();
                    }
                }
            }
        }
    }
}