// Original Release Date: 2007-08-01
// Last Updated: 2007-08-13
// Copyright (c) 2007, Michael E. Locasto
// Released under the GNU GPL license
// http://www.gnu.org/copyleft/gpl.html
//-----------------------------------------------------------------------
// ==UserScript==
// @name           DarkenCNNCaptions
// @namespace      http://www1.cs.columbia.edu/~locasto/
// @description    Make gray captions for images on CNN black and bold
// @include        http://*.cnn.com/*
// @include        http://www.cnn.com/*
// ==/UserScript==
//-----------------------------------------------------------------------
// CNN.com just went to a new style. I find the default coloring on image
// captions to be utterly unreadable. After a couple of unacknowledged
// feedback attempts to prod them to change it, I decided to Greasemoneky
// the thing. Serves as a nice 'Hello, World.' I got the basic code for
// finding the appropriate DIV from the Greasemonkey tutorial at
// diveintogreasemoneky.org
//
// This DIV: <div class='cnnStoryPhotoCaptionBox'>
//  has another inside it with a strange class name. Examples include
//  things like 'cnn3pxTB9pxLRPad', which I do not trust to remain the 
//  same across pages or over time.
//-----------------------------------------------------------------------
// You can change the properties that are set inside the if() statement to
// your liking (for example, non-bold fontWeight, medium fontSize, etc.)
//-----------------------------------------------------------------------


var allDivs, thisDiv;
var innerP;

allDivs = document.evaluate(
    "//div[@class='cnnStoryPhotoCaptionBox']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++)
{
    thisDiv = allDivs.snapshotItem(i);
    //if CNN messes with the layout, this may have to change.
    //They currently have <DIV><DIV><p><comment>Caption</comment></p></DIV></DIV>
    innerP = thisDiv.getElementsByTagName("p")[0];
    if(innerP)
    {
      //innerP.style.background = 'white';
      innerP.style.color = 'black';
      innerP.style.fontSize = 'small'; //medium, x-small, large
      innerP.style.fontWeight = 'bold';
    }
    /* An alternative. Not appealing, as it doesn't really help. */
    //thisDiv.innerHTML = "<b>" + thisDiv.innerHTML + "</b>";
}

allDivs = document.evaluate(
    "//div[@class='cnnImgCaption']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++)
{
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.style.color = 'black';
}

allDivs = document.evaluate(
    "//div[@class='cnnT1capTxt']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++)
{
    thisDiv = allDivs.snapshotItem(i);
    thisDiv.style.color = 'white';
    thisDiv.style.fontSize = 'small';
}

// Summary of CHANGES and TODO:
// 20070802: Fix typo in comments. Remove debug 'alert' statement from if()
// 20070803: Fixed font-size problem.
// 20070804: Handled 'cnnImgCaption' as well.
// 20070813: Handled 'cnnT1capTxt' (front page photos)
// TODO: In a multi-image series, only the initial caption is changed.
//       Subsequent images retain the original CNN style. Page reloading
//       doesn't help, as it merely resets the sequence to the first image.
