// ==UserScript==
// @name         Better Google Drive Chat
// @version	     1.1.3
// @namespace    RedBanHammer
// @description  Adds timestamping, history, message notifications, and hyperlinking to the Google Drive Chat.
// @match		 http://docs.google.com/*
// @match		 https://docs.google.com/*
// @match		 http://drive.google.com/*
// @match		 https://drive.google.com/*
// @copyright    2012+, RedBanHammer
// @grant        none
// ==/UserScript==

// --Options-- //
var showAMandPM = false;
var use24HourTime = false;
// This is Webkit only; sorry Firefox users!
var showNotifications = true;
// Show the notification regardless if the window is hidden or not
var alwaysShowNotification = true;
// How many messages to load when scrolling up and initially
var chatHistoryLoadSize = 50;

// --Script Variables-- //
var lMsg = 0;
var curSpeaker = "Google Drive Chat";
var n;
var nClear;
var curHist;
var curHistSize;
var cacheKey = "";
getCacheKey();
if (cacheKey == "") {
    unsafeWindow.addEventListener ? unsafeWindow.addEventListener("load", getCacheKey(), false) : unsafeWindow.attachEvent && unsafeWindow.attachEvent("onload", getCacheKey());
}
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var loadedHistory = 0;
var historyInterval;

if (supports_html5_storage()) {
    var historyInterval = setInterval(function () {
        if (cacheKey != "" && document.getElementById("docs-chat-messages")) {
            showChat();
            loadHistory();
            clearInterval(historyInterval);
        }
    }, 500);
}

// Interval setting
setInterval(function () {
    addTimestamp(getCurrentTime(), getSeconds());
    if (document.getElementById("docs-chat-messages") && document.getElementsByClassName("docs-chat-pane-container").length > 0 && document.getElementsByClassName("docs-chat-pane-container")[0].style.display != "none" && document.getElementById("docs-chat-messages").scrollTop <= 30 && loadedHistory > 0 && loadedHistory < curHistSize) {
        setTimeout(function () {
            if (document.getElementById("docs-chat-messages").scrollTop <= 30) {
                console.log("Loading more chat messages...");
                loadMoreMessages();
            }
        }, 200);
    }
}, 150);

// --Script Functions-- //
function showChat() {
    var el = document.getElementById("docs-presence-menubar");
    if (el && el.firstChild && el.firstChild.style.display != "block") el.firstChild.style.display = "block";
}

// Get URL key for chat history caching
function getCacheKey() {
    var metaTags = document.body.getElementsByTagName("meta");
    for (i = 0; i < metaTags.length; i++) {
        if (metaTags[i].getAttribute("itemprop") == "url") {
            cacheKey = metaTags[i].content;
            curHist = unsafeWindow.localStorage.getItem("chatHistory-" + cacheKey);
            return;
        }
    }
    cacheKey = "";
}

// Storage functions
// TODO: Add a method of pruning messages in the event the local storage space runs out
function supports_html5_storage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

function addToHistory(type, time, message, from) {
    var curHist = unsafeWindow.localStorage.getItem("chatHistory-" + cacheKey);
    var setStr = "";
    if (curHist) {
        setStr = curHist + ">" + type + (time != "" ? "<" + time : "") + "<" + message + (from != "" ? "<" + from : "");
    } else {
        setStr = type + (time != "" ? "<" + time : "") + "<" + message;
    }
    unsafeWindow.localStorage.setItem("chatHistory-" + cacheKey, setStr);
}

function loadMoreMessages() {
    if (curHist && curHist != "") {
        var origScroll = document.getElementById("docs-chat-messages").scrollHeight;
        var msgArr = curHist.split(">");
        var tempLoadedHistory = loadedHistory;
        for (i = (msgArr.length - 1 - loadedHistory); i >= Math.max(0, msgArr.length - 1 - loadedHistory - chatHistoryLoadSize); i--) {
            var msgData = msgArr[i].split("<");
            if (msgData[0] == "ts") {
                addChatTimestamp(msgData[1], true);
            } else if (msgData[0] == "sys") {
                addChatSysMsg(msgData[1], msgData[2], true);
            } else if (msgData[0] == "msg1") {
                addChatMsg1(msgData[1], msgData[2], msgData[3], true);
            } else if (msgData[0] == "msg2") {
                addChatMsg2(msgData[1], msgData[2], true);
            }
            tempLoadedHistory++;
        }
        loadedHistory = tempLoadedHistory;
        document.getElementById("docs-chat-messages").scrollTop = document.getElementById("docs-chat-messages").scrollHeight - origScroll;
    }
}

function loadHistory() {
    if (curHist && curHist != "") {
        var msgArr = curHist.split(">");
        curHistSize = msgArr.length;
        for (i = Math.max(0, msgArr.length - chatHistoryLoadSize); i < msgArr.length; i++) {
            var msgData = msgArr[i].split("<");
            if (msgData[0] == "ts") {
                addChatTimestamp(msgData[1], false);
            } else if (msgData[0] == "sys") {
                addChatSysMsg(msgData[1], msgData[2], false);
            } else if (msgData[0] == "msg1") {
                addChatMsg1(msgData[1], msgData[2], msgData[3], false);
            } else if (msgData[0] == "msg2") {
                addChatMsg2(msgData[1], msgData[2], false);
            }
            loadedHistory++;
        }
    }
}

function addChatMsg1(time, msg, from, prepend) {
    var tArr = time.split(":");
    tArr[0] = parseHours(tArr[0]);
    var mP = document.createElement("div");
    mP.setAttribute("class", "docs-chat-message");
    mP.setAttribute("role", "listitem");
    mP.setAttribute("tabindex", "-1");
    mP.innerHTML = replaceURLWithHTMLLinks(msg);
    var mC = document.createElement("span");
    mC.setAttribute("class", "docs-chat-name");
    mC.innerHTML = from + ":&nbsp;";
    mP.insertBefore(mC, mP.firstChild);
    var ts = document.createElement("span");
    ts.setAttribute("style", "color: #AAA; font-weight: normal; font-size: .8em;");
    ts.setAttribute("class", "docs-chat-timestamp");
    ts.innerHTML = tArr[0] + ":" + tArr[1] + " ";
    attachRolloverEvents(ts, tArr[0] + ":" + tArr[1], tArr[2]);
    mC.insertBefore(ts, mC.firstChild);
    if (!prepend) {
        document.getElementById("docs-chat-messages").appendChild(mP);
    } else {
        document.getElementById("docs-chat-messages").insertBefore(mP, document.getElementById("docs-chat-messages").firstChild);
    }
}

function addChatMsg2(time, msg, prepend) {
    var tArr = time.split(":");
    tArr[0] = parseHours(tArr[0]);
    var mP = document.createElement("div");
    mP.setAttribute("class", "docs-chat-message");
    mP.setAttribute("role", "listitem");
    mP.setAttribute("tabindex", "-1");
    mP.innerHTML = replaceURLWithHTMLLinks(msg);
    var ts = document.createElement("span");
    ts.setAttribute("style", "color: #AAA; font-weight: normal; font-size: .8em;");
    ts.setAttribute("class", "docs-chat-timestamp");
    ts.innerHTML = tArr[0] + ":" + tArr[1] + " ";
    attachRolloverEvents(ts, tArr[0] + ":" + tArr[1], tArr[2]);
    mP.insertBefore(ts, mP.firstChild);
    if (!prepend) {
        document.getElementById("docs-chat-messages").appendChild(mP);
    } else {
        document.getElementById("docs-chat-messages").insertBefore(mP, document.getElementById("docs-chat-messages").firstChild);
    }
}

function addChatTimestamp(msg, prepend) {
    var mP = document.createElement("div");
    mP.setAttribute("class", "docs-chat-message");
    mP.setAttribute("role", "listitem");
    mP.setAttribute("tabindex", "-1");
    mP.innerHTML = "<span class=\"docs-chat-timestamp\"></span><div style=\"border-top: 1px solid #D3D3D3; border-bottom: 1px solid #D3D3D3; text-align: center; color: #AAAAAA; margin: 10px 0;\">" + msg + "</div>";
    if (!prepend) {
        document.getElementById("docs-chat-messages").appendChild(mP);
    } else {
        document.getElementById("docs-chat-messages").insertBefore(mP, document.getElementById("docs-chat-messages").firstChild);
    }
}

function addChatSysMsg(time, msg, prepend) {
    var tArr = time.split(":");
    tArr[0] = parseHours(tArr[0]);
    var mP = document.createElement("div");
    mP.setAttribute("class", "docs-chat-message");
    mP.setAttribute("role", "listitem");
    mP.setAttribute("tabindex", "-1");
    var mC = document.createElement("span");
    mC.setAttribute("class", "docs-chat-status");
    mC.innerHTML = msg;
    mP.appendChild(mC);
    var ts = document.createElement("span");
    ts.setAttribute("style", "color: #AAA; font-weight: normal; font-size: .8em;");
    ts.setAttribute("class", "docs-chat-timestamp");
    ts.innerHTML = tArr[0] + ":" + tArr[1] + " ";
    attachRolloverEvents(ts, tArr[0] + ":" + tArr[1], tArr[2]);
    mC.insertBefore(ts, mC.firstChild);
    if (!prepend) {
        document.getElementById("docs-chat-messages").appendChild(mP);
    } else {
        document.getElementById("docs-chat-messages").insertBefore(mP, document.getElementById("docs-chat-messages").firstChild);
    }
}

// Time functions
function getCurrentTime() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    if (!use24HourTime && hours > 12) hours -= 12;
    if (!use24HourTime && hours == 0) hours = 12;
    var minutes = currentTime.getMinutes();
    if (minutes < 10) minutes = "0" + minutes;
    return hours + ":" + minutes + (showAMandPM ? (hours > 11 ? "pm" : "am") : "");
}

function getCurrentDate() {
    var currentTime = new Date();
    return monthNames[currentTime.getMonth()] + " " + currentTime.getDate() + ", " + currentTime.getFullYear();
}

function getSeconds() {
    var s = new Date().getSeconds();
    if (s < 10) s = "0" + s;
    return s;
}

function parseHours(hours) {
    hours = parseInt(hours);
    if (!use24HourTime && hours > 12) hours -= 12;
    if (!use24HourTime && hours == 0) hours = 12;
 	return hours.toString();   
}

function addTimestamp(t, s) {
    try {
        var msg = document.getElementsByClassName("docs-chat-message");
        var needsScrolling = false;
        for (i = 0; i < msg.length; i++) {
            if (msg[i].getElementsByClassName("docs-chat-timestamp").length < 1) {
                // Show notification
                if ((document.webkitHidden || alwaysShowNotification) && showNotifications && parseFrom(msg[i]) != "me") showNotification(parseFrom(msg[i]), parseMessage(msg[i]));
                // Check if we need to insert a date chat message in the chat history
                if (supports_html5_storage()) {
                    try {
                        var lT = unsafeWindow.localStorage.getItem("lastTime-" + cacheKey);
                        if (!lT || (lT && lT != getCurrentDate())) {
                            // Insert a timestamp in the history
                            addToHistory("ts", "", getCurrentDate());
                            unsafeWindow.localStorage.setItem("lastTime-" + cacheKey, getCurrentDate());
                        }
                        // Add this message to our chat history
                        addToHistory((parseFrom(msg[i]) != "Google Drive Chat" ? ("msg" + (msg[i].getElementsByClassName("docs-chat-name").length > 0 ? "1" : "2")) : "sys"), t + ":" + s, parseMessage(msg[i]), (msg[i].getElementsByClassName("docs-chat-name").length > 0 && parseFrom(msg[i]) != "Google Drive Chat" ? parseFrom(msg[i]) : ""));
                    } catch (e) {};
                }
                needsScrolling = true;
                var ts = document.createElement("span");
                ts.setAttribute("style", "color: #AAA; font-weight: normal; font-size: .8em;");
                ts.setAttribute("class", "docs-chat-timestamp");
                ts.innerHTML = t + " ";
                attachRolloverEvents(ts, t, s);
                msg[i].innerHTML = replaceURLWithHTMLLinks(msg[i].innerHTML);
                var msgContent = msg[i].getElementsByTagName("span")[0];
                if (msgContent) {
                    msgContent.insertBefore(ts, msgContent.firstChild);
                } else {
                    msg[i].insertBefore(ts, msg[i].firstChild);
                }
            }
        }
        if (needsScrolling && document.getElementById("docs-chat-messages").scrollTop != document.getElementById("docs-chat-messages").scrollHeight) {
            document.getElementById("docs-chat-messages").scrollTop = document.getElementById("docs-chat-messages").scrollHeight;
        }
    } catch (e) {};
}

// CREDIT: http://stackoverflow.com/questions/37684/how-to-replace-plain-urls-with-links
function replaceURLWithHTMLLinks(text) {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(exp, "<a href='$1' target='_blank'>$1</a>");
}

function parseFrom(el) {
    var n = el.getElementsByClassName("docs-chat-name");
    if (n.length > 0) {
        curSpeaker = n[0].innerHTML.split(":&nbsp;")[0];
    } else if (el.getElementsByClassName("docs-chat-status").length > 0) {
        curSpeaker = "Google Drive Chat";
    }
    return curSpeaker;
}

function parseMessage(el) {
    var mEl = el.getElementsByClassName("docs-chat-status");
    if (mEl.length == 0) {
        var m = el.innerHTML.split("</span>");
        return m[m.length - 1];
    } else {
        return mEl[0].innerHTML;
    }
}

function attachRolloverEvents(ts, t, s) {
    ts.onmouseover = function () {
        ts.innerHTML = t + ":" + s + " ";
    };
    ts.onmouseout = function () {
        ts.innerHTML = t + " ";
    };
}
setupPerms();

function setupPerms() {
    if (window.webkitNotifications.checkPermission() != 0) window.webkitNotifications.requestPermission(permissionGranted);
}

function showNotification(from, message) {
    if (n) n.cancel();
    if (nClear) {
        clearInterval(nClear);
        nClear = null;
    }
    n = window.webkitNotifications.createNotification("https://ssl.gstatic.com/docs/doclist/images/infinite_arrow_favicon_4.ico", from, message);
    n.onclick = function(x) {
        window.focus();
        this.cancel();
    };
    n.show();
    nClear = setTimeout(function () {
        n.cancel();
    }, 5000);
}