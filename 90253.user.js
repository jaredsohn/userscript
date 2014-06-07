// ==UserScript==
// @name           Shorten URLs
// @version        1
// @author         xtranophilist
// @namespace      http://motorscript.com/
// @description    Automatically shortens URLs before tweeting them.
// @include        http*://*twitter.com/*
//
// ==/UserScript==

function shortenText(theEditor) {
    var str = theEditor.value;
    //the regex for url
    var regex = /\b((?:(https?|ftp):\/\/|(www)\d{0,3}[.]|([a-z0-9.\-]+)([.][a-z]{2,4}\/))(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
    while (str.search(regex) != -1) {
        var result = str.match(regex);
        var part = str.substr(0, result[0].length + str.search(regex));
        url = new Object();
        url.hrefx = part.match(regex)[0];
        url.editorx = theEditor;
        url.startx = theEditor.value.search(url.hrefx);
        url.lengthx = result[0].length;
        str = str.replace(part, "");
        doRequest(url);
    }
}

function doRequest(url) {
    var myhref = url.hrefx;
    if (myhref.substr(0, 7) != "http://") myhref = "http://" + myhref;
    if (myhref.length > 18) {

        myhref = "http://ur.ly/new.json?href=" + myhref;
        GM_xmlhttpRequest({
            method: "GET",
            url: myhref,
            headers: {
                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
                'Accept': 'application/json'
            },
            onload: function (xhr) {
                response = eval("(" + xhr.responseText + ")");
                url.editorx.value = url.editorx.value.replace(url.hrefx, "http://ur.ly/" + response.code);
                var evt = document.createEvent("HTMLEvents");
                evt.initEvent("change", true, true);
                url.editorx.dispatchEvent(evt);
                url.editorx.focus();
            }
        });

    }
}

function getElementsByClass(className, tagName, tree) {
    tagName = typeof(tagName) != 'undefined' ? tagName : '*';
    var result = new Array();
    var c = 0;
    var tags = tree.getElementsByTagName(tagName);
    for (var i = 0; i < tags.length; i++) {
        if (tags[i].className == className) {
            result[c++] = tags[i];
        }
    }
    return result;
}

function replaceExp(str, re) {
    for (key in re) {
        //create new regular expression key, case insensitive one
        rx = new RegExp(key, 'i');
        //search for the regular expression in the string
        index = str.search(rx);
        //if the search finds something
        while (index != -1) {
            //Check if capital letter
            if (str.charAt(index) >= "A" && str.charAt(index) <= "Z") {
                //replace it with capitalized word
                str = str.replace(rx, capitalize(re[key]));
            }
            else {
                //perform the replacement
                str = str.replace(rx, re[key]);
            }
            //search for the next match
            index = str.search(rx);
        }
    }
    return str;
}

function capitalize(str) { // Returns: a copy of str with the first letter capitalized
    return str.charAt(0).toUpperCase() + str.substring(1);
}

function init() {
    var rows = getElementsByClass("tweet-row", "div", document);
    if (rows.length == 0) setTimeout(init, 1000);
    else kickOff();
}

function addButtonToRow(theRow) {
    var tweetCounter = getElementsByClass("tweet-spinner", "img", theRow);
    var shortenButton = document.createElement('a');
    shortenButton.href = "#";
    shortenButton.className = "shorten-button button";
    shortenButton.setAttribute("style", "margin-right:10px;");
    shortenButton.innerHTML = "Shorten URLs!";
    theRow.insertBefore(shortenButton, tweetCounter[0]);
    return shortenButton;
}

function kickOff() {
    var theButton = addButtonToRow(getElementsByClass("tweet-button-container", "div", document)[0]);
    var theEditor = getElementsByClass("twitter-anywhere-tweet-box-editor", "textarea", document)[0];
    theButton.addEventListener("click", function () {
        shortenText(theEditor);
    }, false);
}

function checkInsertion(event) {
    var theButton;
    if (event.target.className == "twitter-anywhere-tweet-box-editor") { //catching the text box insertion
        theButton = document.getElementById("shorten-button-dialog-" + c);
        theButton.addEventListener("click", function () {
            shortenText(event.target);
        }, false);
    }
    if (event.target.className == "tweet-box condensed") { //catching the tweet-box insertion
        theButton = addButtonToRow(getElementsByClass("tweet-button-container", "div", event.target)[0]);
        theButton.id = "shorten-button-dialog-" + (++c);
    }

}

var c = 0;
document.addEventListener('DOMNodeInserted', checkInsertion, false);
init();