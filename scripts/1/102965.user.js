// ==UserScript==
// @name           AndroidReferenceLink
// @namespace      http://mstssk.blogspot.com/
// @description    Add link to github.com/android/some_packages in Android official reference page.
// @include        http://developer.android.com/*
// @include        https://developer.android.com/*
// ==/UserScript==

var baseUrl = 'https://github.com/android/platform_frameworks_base/blob/master/core/java/';

var d = document
    // Code borrowed and modified from http://www.otchy.net/20090120/first-five-lines-of-greasemonkey/ 
    ,_ = function(o){return o != null ? (o.wrappedJSObject||o) : o;}
    ,$ = function(id){return _(d.getElementById(id))}
    ,$x = function(xp,c){return _(d.evaluate(xp,c||d,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue)}
    ,getText = function(e){return (e.textContent || e.innerText).trim()}

var headerTab = $("header-tabs")
    ,title = $x("//h1")
    ,clazz = $x("//td[@colspan=1]");

if (headerTab == null || headerTab.className != "reference" || title == null || clazz == null) {
    return;
}

var className = getText(clazz)
    ,innerClass = getText(title).split(".")[1];

if (innerClass) {
    className = className.replace(new RegExp("." + innerClass), "");
}

var url = baseUrl + className.replace(/\./g, "/").replace(/<[^>]+?>/, "").replace(/<\w+>$/, "") + ".java"
    ,html = '<a target="_blank" href="' + url 
        + '"><img src="https://github.com/favicon.ico" title="' 
        + url + '"/></a>';

title.innerHTML += html;
