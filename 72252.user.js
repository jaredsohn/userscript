// ==UserScript==
// @name	  Læsevenlige udgaver af Version2, Computerworld og Comon.dk
// @version	  1.00
// @description	   Udskrifts- og læsevenlige udgaver af siderne
// @include	  http://www.version2.dk/*
// @include	  http://version2.dk/*
// @include   version2.dk/*
// @include   comon.dk/*
// ==/UserScript==

var allDivs, thisDiv;
allDivs = document.evaluate(
	"//div[@class='debatbox']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
	thisDiv = allDivs.snapshotItem(i);
	thisDiv.parentNode.removeChild(thisDiv);// Delete it
};
allDivs = document.evaluate(
	"//*[@id='layout-left']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
	thisDiv = allDivs.snapshotItem(i);
	thisDiv.parentNode.removeChild(thisDiv);// Delete it
};
allDivs = document.evaluate(
	"//*[@id='layout-right']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
	thisDiv = allDivs.snapshotItem(i);
	thisDiv.parentNode.removeChild(thisDiv);// Delete it
};
allDivs = document.evaluate(
	"//*[@id='header']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
	thisDiv = allDivs.snapshotItem(i);
	thisDiv.parentNode.removeChild(thisDiv);// Delete it
};
allDivs = document.evaluate(
	"//*[@id='scroll_bottom-nav']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
	thisDiv = allDivs.snapshotItem(i);
	thisDiv.parentNode.removeChild(thisDiv);// Delete it
};
allDivs = document.evaluate(
	"//*[@id='layout-pad-footer']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
	thisDiv = allDivs.snapshotItem(i);
	thisDiv.parentNode.removeChild(thisDiv);// Delete it
};
allDivs = document.evaluate(
	"//*[@id='farRight']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
	thisDiv = allDivs.snapshotItem(i);
	thisDiv.parentNode.removeChild(thisDiv);// Delete it
};
//Delete id = simple-login-box
allDivs = document.evaluate(
	"//*[@id='simple-login-box']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
	thisDiv = allDivs.snapshotItem(i);
	thisDiv.parentNode.removeChild(thisDiv);// Delete it
};
// Delete id = layout-footer
allDivs = document.evaluate(
	"//*[@id='layout-footer']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
	thisDiv = allDivs.snapshotItem(i);
	thisDiv.parentNode.removeChild(thisDiv);// Delete it
};
// Delete class rightColumn
allDivs = document.evaluate(
	"//div[@class='rightColumn']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
	thisDiv = allDivs.snapshotItem(i);
	thisDiv.parentNode.removeChild(thisDiv);// Delete it
};
//Delete right_job
allDivs = document.evaluate(
	"//div[@class='job_list']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
	thisDiv = allDivs.snapshotItem(i);
	thisDiv.parentNode.removeChild(thisDiv);// Delete it
};
allDivs = document.evaluate(
	"//div[@class='header']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
	thisDiv = allDivs.snapshotItem(i);
	thisDiv.parentNode.removeChild(thisDiv);// Delete it
};
allDivs = document.evaluate(
	"//div[@class='twoColumns']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
	thisDiv = allDivs.snapshotItem(i);
	thisDiv.parentNode.removeChild(thisDiv);// Delete it
};
allDivs = document.evaluate(
	"//div[@class='sideBar']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
	thisDiv = allDivs.snapshotItem(i);
	thisDiv.parentNode.removeChild(thisDiv);// Delete it
};
allDivs = document.evaluate(
	"//div[@class='twoColumnsRightHeavy']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
	thisDiv = allDivs.snapshotItem(i);
	thisDiv.parentNode.removeChild(thisDiv);// Delete it
};
allDivs = document.evaluate(
	"//div[@class='discussion']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
	thisDiv = allDivs.snapshotItem(i);
	thisDiv.parentNode.removeChild(thisDiv);// Delete it
};
allDivs = document.evaluate(
	"//div[@class='newsBox']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
	thisDiv = allDivs.snapshotItem(i);
	thisDiv.parentNode.removeChild(thisDiv);// Delete it
};
//Comon.dkDiv class leftColumn
allDivs = document.evaluate(
	"//div[@class='leftColumn']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
	thisDiv = allDivs.snapshotItem(i);
	thisDiv.parentNode.removeChild(thisDiv);// Delete it
};