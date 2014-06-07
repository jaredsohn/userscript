// Copyright (C) 2011, 2012 by Ashley Ross
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//
// ==UserScript==
// @name           Gmail From Sorter
// @namespace      http://27.am/
// @description    Gmail's "Send mail as" feature is great, but for one thing: the From address field is unsorted, making life painful when you have more than a few accounts. This script sorts the list of options in the From field alphabetically, for pure send-as pleasure.
// @copyright      Ashley Ross
// @version        1.6
// @include        http://mail.google.com/mail/*
// @include        https://mail.google.com/mail/*
// ==/UserScript==

(function () {
    // Only run in the outermost window
    if (window.top !== window.self) {
        return;
    }

    var sortedTag = "gfs_SelectOptionsSorted";
    var initializeInterval;
    var initializeAttemptCount = 0;
    var gmailDoc;
    var fromElements;

    var checkForUpdates = function () {
        var currentVersion = "1.6";

        // Only check for updates if we have access to Greasemonkey's API
        if (typeof GM_xmlhttpRequest == "undefined" || typeof GM_getValue == "undefined" || typeof GM_setValue == "undefined") {
            return;
        }

        var lastCheckTime = GM_getValue("lastCheckTime", 0);
        var lastCheckVersion = GM_getValue("lastCheckVersion", 0);

        // Ensure that the Greasemonkey API functions haven't been defined as NOP functions by Chrome
        if (typeof lastCheckTime == "undefined" || typeof lastCheckVersion == "undefined") {
            return;
        }

        var scriptId = "99830";
        var scriptUrl = "https://userscripts.org/scripts/source/" + scriptId + ".user.js";
        var checkIntervalSeconds = 2 * 24 * 60 * 60;
        var currentTimeSeconds = Math.round(new Date().getTime() / 1000);
        var targetElement = null;
        var messageElement;

        var checkRemoteUserscript = function (e) {
            GM_xmlhttpRequest({
                method: "GET",
                url: "https://userscripts.org/scripts/source/" + scriptId + ".meta.js",
                headers: {
                    "User-agent": "Mozilla/4.0 (compatible) Greasemonkey",
                    "Accept": "text/plain"
                },
                onload: handleRemoteReponse
            });
        };

        var handleRemoteReponse = function (response) {
            GM_setValue("lastCheckTime", currentTimeSeconds);

            var remoteName = /@name\s+(.*)[\r\n]/.exec(response.responseText)[1];
            var remoteVersion = /@version\s+([.\d]+)[\r\n]/.exec(response.responseText)[1];

            if (isNewer(remoteVersion, currentVersion) && isNewer(remoteVersion, lastCheckVersion)) {
                notifyOfUpdate(remoteName, remoteVersion);
            }
        };

        var isNewer = function (a, b) {
            /(\d+)\.(\d+)(?:\.(\d+))?\|(\d+)\.(\d+)(?:\.(\d+))?/.exec(a + "|" + b);
            with (RegExp) {
                if (parseInt($4 || "0") < parseInt($1 || "0")) return true;
                if (parseInt($5 || "0") < parseInt($2 || "0")) return true;
                if (parseInt($6 || "0") < parseInt($3 || "0")) return true;
            }
            return false;
        };

        var notifyOfUpdate = function (remoteName, remoteVersion) {
            tryInitializeTargetElement();

            if (targetElement) {
                buildMessage(remoteName, remoteVersion);
                showMessage();
            } else {
                if (window.confirm("An updated version of " + remoteName + " is available. Do you want to install it?")) {
                    window.location.href = scriptUrl;
                } else {
                    GM_setValue("lastCheckVersion", remoteVersion);
                }
            }
        };

        var tryInitializeTargetElement = function () {
            // gmailDoc may be null if the frame wasn't found or didn't load successfully
            if (gmailDoc) {
                var notificationElements = gmailDoc.getElementsByClassName("vh");

                // Ensure we actually have something to work with
                if (notificationElements && notificationElements.length > 0) {
                    targetElement = notificationElements[0];
                }
            }
        }

        var buildMessage = function (remoteName, remoteVersion) {
            messageElement = gmailDoc.createElement("div");
            messageElement.setAttribute("style", "padding: 2px 0px;");

            messageElement.appendChild(gmailDoc.createTextNode("An updated version of " + remoteName + " is available."));

            var spacer = gmailDoc.createElement("span");
            spacer.innerHTML = "&nbsp;&nbsp;";
            messageElement.appendChild(spacer);

            var update = gmailDoc.createElement("a");
            update.setAttribute("href", scriptUrl);
            update.setAttribute("target", "_blank");
            update.setAttribute("id", "gfs_update");
            update.setAttribute("class", "ad SL7K4c");
            update.addEventListener("click", hideMessage, false);
            update.appendChild(gmailDoc.createTextNode("Update to " + remoteVersion));
            messageElement.appendChild(update);

            spacer = gmailDoc.createElement("span");
            spacer.innerHTML = "&nbsp;&nbsp;";
            messageElement.appendChild(spacer);

            var skip = gmailDoc.createElement("span");
            skip.setAttribute("idlink", "");
            skip.setAttribute("role", "link");
            skip.setAttribute("tabindex", "0");
            skip.setAttribute("id", "gfs_skip");
            skip.setAttribute("class", "ag ca");
            skip.addEventListener("click", skipUpdate, false);
            skip.appendChild(gmailDoc.createTextNode("Skip this version"));
            messageElement.appendChild(skip);

            spacer = gmailDoc.createElement("span");
            spacer.innerHTML = "&nbsp;&nbsp;";
            messageElement.appendChild(spacer);

            var hide = gmailDoc.createElement("span");
            hide.setAttribute("idlink", "");
            hide.setAttribute("role", "link");
            hide.setAttribute("tabindex", "1");
            hide.setAttribute("id", "gfs_hide");
            hide.setAttribute("class", "ag ca");
            hide.addEventListener("click", hideUpdate, false);
            hide.appendChild(gmailDoc.createTextNode("Hide"));
            messageElement.appendChild(hide);
        };

        var showMessage = function () {
            targetElement.appendChild(messageElement);
            targetElement.parentNode.parentNode.style.visibility = "visible";
        }

        var hideMessage = function (ev) {
            targetElement.parentNode.parentNode.style.visibility = "hidden";
            targetElement.removeChild(messageElement);
        }

        var skipUpdate = function (ev) {
            hideUpdate(ev);
            GM_setValue("lastCheckVersion", remoteVersion);
        };

        var hideUpdate = function (ev) {
            ev.preventDefault();
            hideMessage(ev);
        }

        if (currentTimeSeconds > (lastCheckTime + checkIntervalSeconds)) {
            // Allow some time to pass before running the check
            window.setTimeout(checkRemoteUserscript, 15000);
        }
    }

    var sortSelectOptions = function (selectElement) {
        var selectClassName = selectElement.getAttribute("class");

        // Check that we haven't sorted this SELECT element before
        if (selectClassName.indexOf(sortedTag) == -1) {
            var optionsNodeList = selectElement.getElementsByTagName("option");

            // Ensure that we actually got something back
            if (optionsNodeList && optionsNodeList.length > 0) {
                // Convert the OPTIONs NodeList to an array so we can sort it
                var optionsArray = [];
                for (var i = 0, len = optionsNodeList.length; i != len; optionsArray.push(optionsNodeList[i++]));

                // Sort the array, keeping the selected item at the top
                var optionsSorted = optionsArray.sort(function (a, b) {
                    if (a.getAttribute("selected") == "selected")
                        return -1;
                    if (b.getAttribute("selected") == "selected")
                        return 1;
                    return a.textContent.localeCompare(b.textContent);
                });

                // Replace the SELECT's OPTIONs with our sorted list
                for (var i = 0, len = optionsSorted.length; i != len; selectElement.appendChild(optionsSorted[i++]));

                // Add our tag to this SELECT, to avoid sorting it again
                selectElement.setAttribute("class", selectClassName + " " + sortedTag);
            }
        }
    };

    var sortFromElements = function (e) {
        // fromElements points to a live NodeList, which is automatically updated as elements are inserted and removed
        if (fromElements.length > 0) {
            for (var i = 0, len = fromElements.length; i != len; sortSelectOptions(fromElements[i++]));
        }
    };

    var initialize = function (e) {
        // Stop trying to initialize if we've been trying for too long
        if (++initializeAttemptCount == 60) {
            window.clearInterval(initializeInterval);
            return;
        }

        // Look for the Gmail frame - no use in doing anything if we don't have it
        var gmailFrame = document.getElementById("canvas_frame");

        if (gmailFrame) {
            gmailDoc = gmailFrame.contentDocument;

            if (gmailDoc) {
                window.clearInterval(initializeInterval);

                // Get all the "from" fields below the root element; this returns a live NodeList, so we don't need to do this repeatedly
                fromElements = gmailDoc.getElementsByName("from");

                // "from" fields are all loaded in dynamically, so this has to be done as event listener
                gmailDoc.addEventListener("mousedown", sortFromElements, true);
                gmailDoc.addEventListener("keydown", sortFromElements, true);
            }
        }
    };

    initializeInterval = window.setInterval(initialize, 1000);
    checkForUpdates();
})();