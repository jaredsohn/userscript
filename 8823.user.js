// ==UserScript==
// @name           Strat-O-Matic Baseball
// @namespace      http://www.baseballsimulator.com
// @description    Pitcher and hitter salary totals.
// @include        *sportingnews.com/baseball/stratomatic/*/team/team_other.html?user_id=*
// @include        *sportingnews.com/stratomatic/*/team_other.html?user_id=*
// ==/UserScript==

var pitcherSalary = 0;
var pitcherSalaryTotal = 0;
var hitterSalary = 0;
var hitterSalaryTotal = 0;
var s = 0;
var count  = document.evaluate("//td[@class='title']/text()",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var pitcher = count.snapshotItem(0);
var pitcherString = pitcher.data;
var pitcherIndex = pitcherString.lastIndexOf('(');
var pitcherString = pitcherString.substring(pitcherIndex + 1, pitcherIndex + 3);

var hitter = count.snapshotItem(1);
var hitterString = hitter.data;
var hitterIndex = hitterString.lastIndexOf('(');
var hitterString = hitterString.substring(hitterIndex + 1, hitterIndex + 3);

//var allPlayers = document.evaluate("//td[@class='tcenter']/following-sibling::td/text()",
//document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var allPlayers = document.evaluate("//td[not(@class='text12')]/text()[contains(string(),'M')]",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 1; i < parseInt(pitcherString) + 1; i++) {

var node = allPlayers.snapshotItem(i);
pitcherSalary = parseFloat(node.data);
pitcherSalaryTotal = pitcherSalaryTotal + pitcherSalary;

}

//for (var i = parseInt(pitcherString) + 2; i < allPlayers.snapshotLength; i++) {
for (var i = parseInt(pitcherString) + 1; i < allPlayers.snapshotLength -1; i++) {	
var node = allPlayers.snapshotItem(i);

hitterSalary = parseFloat(node.data);
hitterSalaryTotal = hitterSalaryTotal + hitterSalary;
GM_log(hitterSalary);

}

var pitcherBold = document.createElement("b");
pitcherBold.innerHTML = Math.round(pitcherSalaryTotal*100)/100 + "M";

var pitcherTable = document.evaluate("//td[@class='tleft'][@colspan=3]/following-sibling::td/text()",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var pitcherSpace = pitcherTable.snapshotItem(1);
    replacement = document.createTextNode(Math.round(pitcherSalaryTotal*100)/100 + "M");

pitcherSpace.parentNode.replaceChild(pitcherBold,pitcherSpace);

var hitterBold = document.createElement("b");
hitterBold.innerHTML = Math.round(hitterSalaryTotal*100)/100 + "M";

var hitterTable = document.evaluate("//td[@class='tleft'][@colspan=4]/following-sibling::td/text()",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var hitterSpace = hitterTable.snapshotItem(1);
    replacement = document.createTextNode(Math.round(hitterSalaryTotal*100)/100 + "M");
    

hitterSpace.parentNode.replaceChild(hitterBold,hitterSpace);

