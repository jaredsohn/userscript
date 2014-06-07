// ==UserScript==
// @name           Switch playoff OBP and SLG.
// @namespace      baseballsimulator.com
// @description    Switches the OBP and SLG columns on a team's playoff page so that it matches the column order on the regular season page.
// @include *sportingnews.com/baseball/stratomatic/*/playoffs/team.html*stats=playoffs
// @include *sportingnews.com/baseball/stratomatic/*/playoffs/team_other.html?user_id=*&stats=playoffs
// @include *sportingnews.com/baseball/stratomatic/*/playoffs/team.html
// @include *sportingnews.com/stratomatic/playoffs/team.html*stats=playoffs
// @include *sportingnews.com/stratomatic/playoffs/team.html
// @include *sportingnews.com/stratomatic/playoffs/team_other.html?user_id=*&stats=playoffs
// ==/UserScript==

var nodeOBP, nodeSLG;
var slgElement,obpElement;

//Replace SLG title with OBP title
var mySLG = document.evaluate("//tr/td[text()='SLG']",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var mySLG = mySLG.snapshotItem(0);

var myBold = document.createElement("td");
myBold.innerHTML = "OBP";

//Replace OBP title with SLG title
var myOBP = document.evaluate("//tr/td[text()='OBP']",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var myOBP = myOBP.snapshotItem(0);

var myBold2 = document.createElement("td");
myBold2.innerHTML = "SLG";

mySLG.parentNode.replaceChild(myBold,mySLG);
myOBP.parentNode.replaceChild(myBold2,myOBP);

//Get pitcher count
var count  = document.evaluate("//td[@class='title']/text()",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var pitcher = count.snapshotItem(0);
var pitcherString = pitcher.data;
var pitcherIndex = pitcherString.lastIndexOf('(');
var pitcherString = pitcherString.substring(pitcherIndex + 1, pitcherIndex + 3);

//Switch SLG and OBP values
var allPlayersOBP = document.evaluate("//td[@class='tcenter']/preceding-sibling::td[1]/text()",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var allPlayersSLG = document.evaluate("//td[@class='tcenter']/preceding-sibling::td[2]/text()",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = parseInt(pitcherString) + 2; i < allPlayersOBP.snapshotLength; i++) {
nodeOBP = allPlayersOBP.snapshotItem(i);
nodeSLG = allPlayersSLG.snapshotItem(i);
slgElement = document.createElement("div");
obpElement = document.createElement("div");
slgElement.innerHTML = nodeSLG.nodeValue;
obpElement.innerHTML = nodeOBP.nodeValue;
nodeSLG.parentNode.replaceChild(obpElement,nodeSLG);
nodeOBP.parentNode.replaceChild(slgElement,nodeOBP);
}

//Switch SLG and OBP totals
var totals = document.evaluate("//td/b[starts-with(text(),'  .')]/text()",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var totalsOBP = totals.snapshotItem(1);
var totalsSLG = totals.snapshotItem(2);

var obptotalsElement = document.createElement("b");
obptotalsElement.innerHTML = totalsOBP.nodeValue;

var slgtotalsElement = document.createElement("b");
slgtotalsElement.innerHTML = totalsSLG.nodeValue;

totalsSLG.parentNode.replaceChild(obptotalsElement,totalsSLG);
totalsOBP.parentNode.replaceChild(slgtotalsElement,totalsOBP);
