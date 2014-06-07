// ==UserScript==
// @name TubePop
// @description Adds a button to 'pop-out' YouTube videos.
// @include http://www.youtube.com/watch*v=*
// @run-at document-end
// ==/UserScript==

var TUBEPOP = function () {
    var urlDict = {};
    var newButton, isFeather, appendTo, playerTime;

    var urlSplit = function (thisLocation) {
        var newDict = {};
        var splitKeys = thisLocation.split("&");

        for (thisKey in splitKeys) {
            newPair = splitKeys[thisKey].split("=",2);
            newDict[newPair[0]] = newPair[1];
        }
        return newDict;
    }

    var createButton = function (buttonText) {
        var thisButton = document.createElement("button");

        thisButton.setAttribute("id", "popout");

        if (isFeather) {
            thisButton.setAttribute("class","b");
            thisButton.innerHTML = buttonText;
        }

        else {
            newSpan = document.createElement("span");
            newSpan.innerHTML = buttonText;
            newSpan.setAttribute("class", "yt-uix-button-content");

            thisButton.setAttribute("class","yt-uix-button yt-uix-tooltip");
            thisButton.setAttribute("title","Click here to pop out video in a new window");
            thisButton.setAttribute("data-tooltip-title","Click here to pop out video in a new window");

            thisButton.appendChild(newSpan);
        }
        return thisButton;
    }

    var popOut = function () {
        var playerTime = 0;
        var pagePlayer = document.getElementById("movie_player");
        if (pagePlayer.pauseVideo) {
            pagePlayer.pauseVideo();
            playerTime = pagePlayer.getCurrentTime();
        }
        popupUrl = "http://www.youtube.com/v/" + urlDict["v"] + "&start=" + playerTime;
        window.open(popupUrl);
    }

    urlDict = urlSplit(document.location.search.substr(1));

    if ("v" in urlDict) {
        isFeather = document.getElementById("su");

        newButton = createButton("Pop-out");
        newButton.addEventListener('click', popOut, 1);

        if (isFeather) {
            appendTo = document.getElementById("ud");
        }
        else {
            appendTo = document.getElementById("watch-headline-user-info");
        }
    }
    appendTo.appendChild(newButton);
}

var TP = new TUBEPOP();