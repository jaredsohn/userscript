// ==UserScript==
// @name           HBR Blog Cleanup
// @namespace      http://www.aaronbeals.com/
// @description    Script to make the HBR blog site more readable.
// @include        http://blogs.hbr.org/*
// @include        http://hbr.org/*
// ==/UserScript==

function kill(elementName)
{
    var elementInQuestion = document.getElementById(elementName);
    elementInQuestion.parentNode.removeChild(elementInQuestion);
}

// remove the featured ("upsell") box
kill("pageRightSubColumn");

// remove superfluous header elements
kill("superNavHeadContainer");
kill("mastheadEditionBar");
kill("pageHeadline");

// misc cleanup
kill("shareWidgetTop");
kill("shareWidgetBottom");
kill("articleFooterLinks");

// remove the vertical-line background image
var pageContent = document.getElementById("pageContent");
pageContent.style.background = "none";

// make the left column full width
var leftColumn = document.getElementById("pageLeftColumn");
leftColumn.style.width = "100%";

// make the comments full-width
var comments = document.getElementById("disqusComments");
comments.style.width = "95%";

// tidy up the right column
var rightColumn = document.getElementById("pageRightColumn");
rightColumn.removeChild(document.getElementById("stay_connected"));
rightColumn.removeChild(document.getElementById("facebookActivityWidget"));

// make the font more readable
var articleBody = document.getElementById("articleBody");
articleBody.style.fontFamily = "Verdana";
articleBody.style.fontSize = "15px";