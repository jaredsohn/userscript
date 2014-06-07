// ==UserScript==
// @name           Convert linktext to a http address
// @author         SpecifcallyTrained
// @namespace      asfasdfasdf
// @description    show the links address instead of text
// @include        http://www.*
// @include        http://*
// ==/UserScript==

/*************************************************************************
To Use:

1) Install userscipt
2) Rightclick the monkey icon -> User Script Commands -> --show links

**************************************************************************/

GM_registerMenuCommand('--Show Links', showLinks);

function showLinks(e) {
    var allLinks = document.getElementsByTagName("a");
    for (var i = 0; i < allLinks.length; i++) {
        var linkText = allLinks[i].href;
        if (linkText != "") {
            allLinks[i].innerHTML = linkText;
        }
    }
}