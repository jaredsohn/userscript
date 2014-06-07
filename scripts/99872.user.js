// ==UserScript==
// @name           Google Reader Feed Name in Title
// @namespace      http://userscripts.org/scripts/show/99872
// @description    Adds the name of the current feed to the window title
// @include        http://www.google.*/reader/*
// @include        https://www.google.*/reader/*
// ==/UserScript==

var isCustomTitleUpdate = false;
//var x = 0;

function UpdateTitle() {
    if (isCustomTitleUpdate) {
        isCustomTitleUpdate = false;
        return;
    }
    //x++;
    var strAppTitle = document.title.replace(/.+ \[/i, '').replace("\]", '');
    var strFeedTitle = strAppTitle;
    //Get the feed or folder title from the 'chrome-title' element
    if (document.getElementById('chrome').className.search(/\bhidden\b/i) == -1) {
        strFeedTitle = document.getElementById('chrome-title').innerHTML;
        strFeedTitle = strFeedTitle.replace(/<a.+?>/i, ''); 
        strFeedTitle = strFeedTitle.replace(/ <span.+/i, '');
        strFeedTitle = strFeedTitle.replace(/<.+?>/g, '');
        //Decode the HTML so ampersands, etc. display properly
        var div = document.createElement('div');
        div.innerHTML = strFeedTitle;
        strFeedTitle = div.firstChild.nodeValue;
        //Append Google Reader app name onto the end
        strFeedTitle = strFeedTitle + ' - [' + strAppTitle + ']';
    }
    //strFeedTitle = strFeedTitle + ':: ' + x.toString();
    isCustomTitleUpdate = true;
    document.title = strFeedTitle;
}

//due to differences in event handling, Chrome should use a different event than other browsers
if (navigator.userAgent.search(/\bchrome\b/i) >= 0) {
    document.getElementsByTagName('title')[0].addEventListener('DOMSubtreeModified', UpdateTitle, false);
    document.getElementById('chrome-title').addEventListener('DOMSubtreeModified', UpdateTitle, false);
} else {
    document.getElementsByTagName('title')[0].addEventListener('DOMNodeInserted', UpdateTitle, false);
    document.getElementById('chrome-title').addEventListener('DOMNodeInserted', UpdateTitle, false);
}
UpdateTitle();