// Currently listening from Last.fm user script
// version 1.4.0
// 2008-07-14
// Copyright (c) 2007, Jarno Elovirta
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name          Currently listening from Last.fm
// @namespace     http://elovirta.com/greasemonkey/
// @description   Retrieves currently listening information from Last.fm and fills in the information to LiveJournal or Diary.Ru post form. Version 1.4.0
// @include       http://www.livejournal.com/update.bml*
// @include       http://www.livejournal.com/editjournal.bml*
// @include       http://*.diary.ru/*?newpost
// @include       http://diary.ru/*?newpost
// @include       http://*.diary.ru/*?editpost&postid=*
// @include       http://diary.ru/*?editpost&postid=*
// ==/UserScript==

var RESPONSE_UNKNOWN = "No user exists with this name.";

var USER_NAME = "lastfm.username";
// http://static.last.fm/depth/header/searchbutton_nav.gif
var ICON_URL = "data:image/gif;base64,R0lGODlhEwASAOYAAM8fPPr6+u2qteR+j/T09PHy8vb39/G6w/j5+eeMm93e3/39/f7+/uqap9TW1+vs7OHi495keejp6dZAWdVidfbR19JabtRnedt/juXm5v33+Nl3h/rx8tpxgtdjdvjg4+bFy/PU2fXM0uugrNNwgfjt8NdLY/z8/NVccNjO0dh/ju/P1N5+jttVbPbc4Pju8N6jruaNm+XS1tyhq9O0utlXbdvJzfjj5tZAWthMZN+FlNZKYvG+xua/xu67w+Ta2956jO/m6OjAyOOosu21vumjr/TX3Oerte+1vu7CydxdcvDHzurh49hFXtpNZd5wg+bd4Pfx8u7M0uWVouzO1PHY3dxkePPP1fHAx+26w+ilsNhNZPC/x+CRnvTV2u/ByOmap9hMY95gddna2+7v79U1UP///wA0/wD//wD/+gChcwCoQQAAAAAAAAAACQA4AAAAAQAMCgAAAAAAAAAMDAB4zwC//wDgIgAiQgB0cgBBAAAAQQAAAAAAAAAAAAAEACH5BAEAAAAALAAAAAATABIAQAf/gACCghghZodmIRiDgwQEERFaBFNOTUoEUi0tYhGOjBYpY6KjoikWjAAlJy4CAkhXXlitrS4nJYIbEjI4Zb2+NVASNTgyEhuDHQwMGh8VIiIVHxrKHYMrCD4JYAgIS19RCEQJ4z4IKwBkZDm9QunuZEC9OemCKBAQMxO+vhMz9yioKHBARNAMBwqoPCxYcIPHgYcQedxY6EEQiwAvRjTgEqBjACMNQo54EYAFAAMGYgzIYiDJgAFFDFR5OSAGSgAFCvR6UiCIlS1UChzZlxMAiAc6fHXp0WMIkwcPwpTR8QCEoB8ZYOzzZcJEGRgZfjC6oECBDRU7eu1QYaPsBVSDC0jQcEDXAQ0ScAMBADs=";
var NS_XHTML = "http://www.w3.org/1999/xhtml";
var WS_URL = "http://ws.audioscrobbler.com/1.0/user/%s/recenttracks.rss";

var UI_MESSAGES =  {
    en: {
        retrieving: "retrieving...",
        unable: "unable to find recent tracks",
        user_not_found: "Last.fm user %s not found",
        user_name: "Last.fm username:",
        error_status: "Request for RSS feed returned: %s",
        last_fm: "Last.fm",
        get: "Get currently music from Last.fm"
    }
};
var DEFAULT_UI_LANGUAGE = "en";

var messages;
var currentMusicInput;
var currentMusicSelect = null;
var getMusicButton;
var active = false;
var username;

function promptForUserName(message) {
    var username = window.prompt((message === undefined ? "" : (message + "\n\n")) + messages.user_name);
    if (username === null || username.match(/^\s*$/)) {
        username = "";
    }
    GM_setValue(USER_NAME, username);
    return username;
}

function requestHandler(responseDetails) {
    if (responseDetails.status === 200) {
        var parser = new DOMParser();
        var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
        var ns = dom.getElementsByTagName("item");
        // clear list
        while (currentMusicSelect.firstChild !== null) {
            currentMusicSelect.removeChild(currentMusicSelect.firstChild);
        }
        // populate list
        for (var i = 0; i < ns.length; i++) {
            var titles = ns[i].getElementsByTagName("title");
            if (titles.length > 0) {
                var option = document.createElementNS(NS_XHTML, "option");
                option.value = titles[0].firstChild.data;
                if (i === 0) {
                    option.selected = true;
                }
                option.appendChild(document.createTextNode(titles[0].firstChild.data));
                currentMusicSelect.appendChild(option);
            }
        }
        if (currentMusicSelect.firstChild) {
            // add empty option
            var empty = document.createElementNS(NS_XHTML, "option");
            currentMusicSelect.insertBefore(empty, currentMusicSelect.firstChild);
            setResultMessage();
            currentMusicSelect.disabled = false;
            currentMusicSelect.style.display = "block";
            currentMusicInput.disabled = true;
            currentMusicInput.style.display = "none";

        } else {
            setErrorMessage(messages.unable);
            currentMusicInput.disabled = false;
        }
    } else if (responseDetails.status === 404 &&
               responseDetails.responseText === RESPONSE_UNKNOWN) {
        setResultMessage();
        username = promptForUserName(messages.user_not_found.replace("%s", username));
        if (username !== "") {
            active = false;
            currentMusicInput.disabled = false;
            getCurrentMusic();
        }
    } else {
        setResultMessage();
        alert(messages.error_status.replace("%s", responseDetails.statusText));
        currentMusicInput.disabled = false;
    }
    active = false;
}

function resetCurrentMusic(event) {
    var value;
    var options = currentMusicSelect.options;
    for (var i = 0; i < options.length; i++) {
        if (options[i].selected) {
            if (options[i].value === "") {
                currentMusicSelect.disabled = true;
                currentMusicSelect.style.display = "none";
                currentMusicInput.disabled = false;
                currentMusicInput.style.display = "block";
            }
            break;
        }
    }
}

function setProcessMessage(message) {
    currentMusicInput.style.color = "gray";
    currentMusicInput.value = message === undefined ? "" : message;    
}

function setResultMessage(message) {
    currentMusicInput.style.color = "";
    currentMusicInput.value = message === undefined ? "" : message;    
}

function setErrorMessage(message) {
    currentMusicInput.addEventListener("focus", musicFieldFocus, false);
    setProcessMessage(message);
    //window.setTimeout(musicFieldFocus, 1500, undefined);
}

function musicFieldFocus(event) {
    currentMusicInput.removeEventListener("focus", musicFieldFocus, false);
    setResultMessage();
}

function setUiLanguage() {
    var root = document.documentElement;
    var lang = root.getAttribute("lang");
    if (lang === null) {
        lang = root.getAttributeNS(NS_XHTML, "lang");
    }
    if (lang === null) {
        lang = DEFAULT_UI_LANGUAGE;
    }
    if (UI_MESSAGES[lang] === undefined) {
        lang = lang.substring(0, lang.indexOf("-"));
        if (UI_MESSAGES[lang] === undefined) {
            lang = DEFAULT_UI_LANGUAGE;
        }
    }
    messages = UI_MESSAGES[lang];
}

function getCurrentMusic(event) {
    if (active) {
        return;
    }
    
    username = GM_getValue(USER_NAME, "");
    if (username === "") {
        username = promptForUserName();
        if (username === "") {
            return;
        }
    }
    active = true;

    if (currentMusicSelect === null) {
        currentMusicSelect = document.createElementNS(NS_XHTML, "select");
        if (window.location.hostname.indexOf("livejournal")) {
            currentMusicSelect.name = "prop_current_music";
        } else {
            currentMusicSelect.name = "current_music";
        }
        currentMusicSelect.className = "select";
        currentMusicSelect.tabIndex = currentMusicInput.tabIndex;
        currentMusicSelect.style.width = currentMusicInput.offsetWidth + "px";
        currentMusicSelect.disabled = true;
        currentMusicSelect.style.display = "none";
        currentMusicSelect.addEventListener("change", resetCurrentMusic, false);
        currentMusicInput.parentNode.insertBefore(currentMusicSelect, currentMusicInput);
    }
    currentMusicSelect.disabled = true;
    currentMusicSelect.style.display = "none";
    currentMusicInput.disabled = true; //false;
    currentMusicInput.style.display = "block";
    setProcessMessage(messages.retrieving);
    GM_xmlhttpRequest({
        method: 'GET',
        url: WS_URL.replace('%s', username),
        headers: {
            'User-agent': window.navigator.userAgent + ' Greasemonkey'
        },
        onload: requestHandler
    });
}

function init() {
    setUiLanguage();

    if (window.location.hostname.indexOf("livejournal")) {
        currentMusicInput = document.getElementById("prop_current_music");
    } else {
        currentMusicInput = document.getElementById("atMusic");
    }
    if (currentMusicInput) {
        currentMusicButton = document.createElementNS(NS_XHTML, "img");
        currentMusicButton.src = ICON_URL;
        currentMusicButton.alt = messages.last_fm;
        currentMusicButton.title = messages.get;
        currentMusicButton.addEventListener("click", getCurrentMusic, false);
        currentMusicInput.parentNode.appendChild(currentMusicButton);
    }
}

init();