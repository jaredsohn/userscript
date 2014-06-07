// ==UserScript==
// @name           BBC News Headline Editor
// @namespace      http://philonoism.blogspot.com
// @description    Adds a custom text string to the beginning and/or end of BBC News headlines.
// @include        http://news.bbc.co.uk/*
// ==/UserScript==
var prefix = 'Oh no! '
var phrase = ' with a parrot' //change these phrases to whatever you want
var allA, thisA;              //to append to the headlines
allA = document.evaluate(
    "//a[@class='tsh']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allA.snapshotLength; i++) {
    thisA = allA.snapshotItem(i);
    // do something with thisA
    thisA.innerHTML = prefix + thisA.innerHTML + phrase
    }
    
allA = document.evaluate(
    "//a[@class='shl']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allA.snapshotLength; i++) {
    thisA = allA.snapshotItem(i);
    // do something with thisA
    thisA.innerHTML = prefix + thisA.innerHTML + phrase
    }
    
allA = document.evaluate(
    "//a[@class='tsl']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allA.snapshotLength; i++) {
    thisA = allA.snapshotItem(i);
    // do something with thisA
    thisA.innerHTML = prefix + thisA.innerHTML + phrase
    }

var allDiv, thisDiv;
    
allDiv = document.evaluate(
    "//div[@class='arr']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDiv.snapshotLength; i++) {
    thisDiv = allDiv.snapshotItem(i);
    // do something with thisDiv
    var a_list = thisDiv.getElementsByTagName('a')
    for (var j = 0; j < a_list.length; j++){
        thisA = a_list[j];
        thisA.innerHTML = prefix + thisA.innerHTML + phrase
        }
    }
    
allA = document.evaluate(
    "//a[@class='pbl']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allA.snapshotLength; i++) {
    thisA = allA.snapshotItem(i);
    // do something with thisDiv
    var b_list = thisA.getElementsByTagName('b')
    for (var j = 0; j < b_list.length; j++){
        thisB = b_list[j];
        thisB.innerHTML = prefix + thisB.innerHTML + phrase
        }
    }
    
var allUL, thisUL, thisLI;

allUL = document.evaluate(
    "//ul[@class='popstoryList']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allUL.snapshotLength; i++) {
    thisUL = allUL.snapshotItem(i);
    // do something with thisDiv
    var li_list = thisUL.getElementsByTagName('li')
    for (var j = 0; j < li_list.length; j++){
        thisLI = li_list[j]
        var a_list = thisLI.getElementsByTagName('a')
        for (var k = 0; k < a_list.length; k++){
            thisA = a_list[k];
            thisA.innerHTML = prefix + thisA.innerHTML + phrase
            }
        }
    }
