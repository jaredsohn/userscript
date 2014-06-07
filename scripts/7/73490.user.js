// ==UserScript==
// @name           Facebook: Fix logo going to 'Top News'
// @namespace      http://userscripts.org/users/145274
// @description    Clicking on the logo will now send you to the "Most Recent" section of your homepage instead of "Top News".
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @include        http://facebook.com/*
// @include        https://facebook.com/*
// ==/UserScript==

var anchors = document.getElementsByTagName("a");
for (var i=0; i<anchors.length; i++) {
    var anchor = anchors[i]
    var href = anchor.href
    if (href == "http://www.facebook.com/?ref=logo") {
        anchor.href = "http://www.facebook.com/?ref=logo&sk=lf";
    } else if (href == "http://www.facebook.com/?sk=nf") {
        anchor.href = "http://www.facebook.com/?sk=lf";
    }
}

var divs = document.getElementsByTagName("div");
for (var i=0; i<divs.length; i++) {
    var div = divs[i];
    var className = div.className;

    if (className == "uiTextTitle fbx_action_list uiHeaderActions rfloat") {
        div.innerHTML = "";
    }
}
