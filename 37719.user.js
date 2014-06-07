// Eulim Al Madim - עולים על מדים
// version 0.1
// 2008-08-03
// Copyright (c) 2008, Ofir K.
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// http://www.gnu.org/licenses/gpl.html
// 
// ==UserScript==
// @name           עולים על מדים
// @namespace      http://userscripts.org/users/61719
// @description    תיקון בעיות באתר עולים על מדים של צה"ל
// @include        http://www.aka.idf.il/giyus/*
// @include        https://www.aka.idf.il/giyus/*
// ==/UserScript==

// Set the url and convert it to string
url = window.location + '';

// From: http://icant.co.uk/sandbox/css-scanner-tool/
function addClassToElement(oElm, strClassName) {
    if(!mfsct.check(oElm, strClassName)){
        oElm.className+=oElm.className?' '+strClassName:strClassName;
    }
}

function getElementsByClassName(classname, node)  {
    if(!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}


allElements = getElementsByClassName("ImpDataArea");
for (var i=0; i < allElements.length; i++) {
        allElements[i].style.backgroundColor = "#FFFFFF";
}

regex = new RegExp('http(?:[s]){0,1}\:\/\/(?:[^\/]+)\/giyus\/Login\/login\.asp[?]moduleToGoTo=([-]){0,1}[0-9]+', "i");
if (regex.test(url)) {
    regex2 = new RegExp('window\.navigate[(]\"([^\"]+)\"[)]', "i");
    if (regex2.test(document.getElementsByTagName("body")[0].innerHTML)) {
        redirectTo = regex2.exec(document.getElementsByTagName("body")[0].innerHTML)[1];
        location.href = redirectTo;
    }
}

hideForumDetailsOriginal = unsafeWindow.hideForumDetails;
unsafeWindow.hideForumDetails = function () {
    hideForumDetailsOriginal();
}

