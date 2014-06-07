// ==UserScript==
// @name           Twitter - Fix Connect Tab to Interactions
// @namespace      https://twitter.com/talamus_
// @description    Fixes Connect button to Interactions instead of Mentions 
// @include        http*://twitter.*
// @version        1.0
// ==/UserScript==

var connectUrlText = "/i/connect";
var mentionsUrlText = "/mentions";

var globalActions = document.getElementById('global-actions');
if (globalActions != null) {
    var peopleElements = globalActions.getElementsByClassName('people');
    if (peopleElements.length == 1) {
        var peopleElement = peopleElements[0];
        peopleElement.innerHTML = peopleElement.innerHTML.replace(mentionsUrlText, connectUrlText);
    }
}