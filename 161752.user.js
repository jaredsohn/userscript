// ==UserScript==
// @name       YouTube Clean Feed
// @version    1.1
// @description  Removes the recommended videos by YouTube
// @match      http://www.youtube.com/
// @copyright  2013+, ich01
// ==/UserScript==
var anzahl = document.getElementsByClassName("system-icon").length;
for (var i = 0;i<anzahl;i++) {
 document.getElementsByClassName("system-icon")[i].parentNode.parentNode.parentNode.parentNode.style.display="none";
}
var anzahl2 = document.getElementsByClassName("feed-thumb-watched").length;
for (var i = 0;i<anzahl2;i++) {
 document.getElementsByClassName("feed-thumb-watched")[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display="none";
}
var anzahl3 = document.getElementsByClassName("watched").length;
for (var i = 0;i<anzahl3;i++) {
 document.getElementsByClassName("watched")[i].parentNode.parentNode.style.display="none";
}
var anzahl4 = document.getElementsByClassName("feed-item-post").length;
for (var i = 0;i<anzahl4;i++) {
 document.getElementsByClassName("feed-item-post")[i].parentNode.parentNode.parentNode.parentNode.style.display="none";
}
var anzahl5 = document.getElementsByClassName("playlist-titles").length;
for (var i = 0;i<anzahl5;i++) {
 document.getElementsByClassName("playlist-titles")[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display="none";
}
