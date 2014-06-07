// ==UserScript==
// @name        Naver KR dic mp3 links
// @namespace   http://krdic.naver.com/
// @description Adds direct links to mp3s in naver's Korean dict
// @include     http://krdic.naver.com/*
// @version     1
// ==/UserScript==

var foundList = document.getElementsByClassName("btn_play");
for (var i = 0; i < foundList.length; i++) {

    // getting url and word
    var foundNode = foundList[i];
    var url = foundNode.getAttribute("pUrl");

    // creating link
    var newNode = document.createElement("a");
    newNode.setAttribute("href", url);
    newNode.setAttribute("style", "margin-left:4px;"); // center between buttons
    newNode.appendChild(document.createTextNode("mp3"));

    foundNode.parentNode.appendChild(newNode);
}
