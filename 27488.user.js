// ==UserScript==
// @name           IdleRPG Percentage
// @namespace      www.dp.cx/userscripts
// @include        http://idlerpg.net/playerview.php?player=*
// ==/UserScript==

var act = document.evaluate("/html/body/div[3]/p/b[8]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var idl = document.evaluate("/html/body/div[3]/p/b[10]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var today = new Date();
var epochSeconds = today.getTime() / 1000;
var actCreated = new Date();
actCreated.setTime(Date.parse(act.snapshotItem(0).nextSibling.nodeValue));
var actSeconds = actCreated.getTime() / 1000;

var availSeconds = epochSeconds - actSeconds;

var idlTime = idl.snapshotItem(0).nextSibling.nodeValue;
matches = idlTime.match(/(\d+) days?, (\d+):(\d+):(\d+)/);
var days = matches[1]; var hours = matches[2]; var minutes = matches[3]; var seconds = matches[4];
var idlSeconds = parseInt(seconds) + minutes * 60 + hours * 3600 + days * 86400;

var utilization = (idlSeconds / availSeconds * 100) + "";
utilization = utilization.replace(/^(\d+\.\d{3})\d*$/, "$1");
console.log(utilization);
idl.snapshotItem(0).nextSibling.nodeValue += " " + utilization + "% utilization";