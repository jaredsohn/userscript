// ==UserScript==
// @name        FaceRig Messaging Intensifies
// @namespace   http://rarobertson.net/
// @description Shakes the message indicator when you have a new personal message
// @include     https://facerig.com/en/forum/*
// @version     1
// @grant       none
// ==/UserScript==

function $xpath(p)
{
    var i, arr = [], xpr = document.evaluate(p, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; item = xpr.snapshotItem(i); i++)
       arr.push(item);
    return arr;
}

function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function shake()
{
    messages.style.left = getRandomInt(-3, 3) + "px";
    messages.style.top = getRandomInt(-3, 3) + "px";
}

var messages = $xpath("//a[@href = '/en/messages' and text()[contains(.,'new')]]");

if (messages.length == 1)
{
    messages = messages[0];
    messages.style.position = "relative";
    window.setInterval(shake, 50);
}