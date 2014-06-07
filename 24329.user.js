// ==UserScript==
// @name           twitterverse
// @namespace      twitterverse
// @description    Live in a different twitter universe
// @include        http://twitter.com/home
// ==/UserScript==



var allLabels, thisLabel;
var newLabel;allLabels = document.evaluate(    "//form[@id='doingForm']/fieldset/div/h3/label",    document,    null,    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,    null);for (var i = 0; i < allLabels.snapshotLength; i++) {    thisLabel = allLabels.snapshotItem(i) ;
    newLabel = document.createTextNode("What do you wish you were doing?");
    var div = thisLabel.parentNode;
    div.insertBefore(newLabel, thisLabel);
    div.removeChild(thisLabel);}