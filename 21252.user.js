// ==UserScript==
// @name           DateAdder
// @namespace      juggle.at
// @description    Pre-Adds date field ....
// @include        https://wwws.uni-klu.ac.at/uniklu/
// ==/UserScript==
var allDivs, thisDiv;
allDivs = document.evaluate(
    "//input[@name='datum']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    var today = new Date();
    var day = today.getDate();
    day = (day<10)?"0"+day:""+day;
    var month = today.getMonth()+1;
    month = (month<10)?"0"+month:""+month;
    thisDiv.value = day + "." + month + "." + today.getFullYear();
}
