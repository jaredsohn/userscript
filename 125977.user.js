// ==UserScript==
// @name           Twitter Replace Connect with Mentions
// @namespace      http://www.stealthmonkey.com
// @description    Replaces the Connect button at the top of the page with a Mentions button
// @include        http*://twitter.*
// @version        1.1
// ==/UserScript==

var connectUrlText = "/i/connect";
var mentionsUrlText = "/mentions";

var globalActions = document.getElementById('global-actions');
if (globalActions != null) {
    var peopleElements = globalActions.getElementsByClassName('people');
    if (peopleElements.length == 1) {
        var peopleElement = peopleElements[0];
        peopleElement.innerHTML = peopleElement.innerHTML.replace(connectUrlText, mentionsUrlText);
    }
}