// ==UserScript==
// @name        CEN Unbuggerer
// @namespace   none
// @description Fix all the Cambridge Evening News annoyances (ads, social media nonsense, etc)
// @include     http://www.cambridge-news.co.uk/*
// @version     5.0
// @grant       none
// ==/UserScript==

function HideSection(xpath)
{
var snapResults = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = snapResults.snapshotLength - 1; i >= 0; i--) {
          snapResults.snapshotItem(i).style.display="none"; 
}
}

function ExpandSection(xpath)
{
var snapResults = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = snapResults.snapshotLength - 1; i >= 0; i--) {
          snapResults.snapshotItem(i).style.width="100%"; 
}
}

//Append new CSS which removes background image
var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'data:text/css,' +
            'body { background-image:none !important;}';
document.getElementsByTagName("HEAD")[0].appendChild(link);

//Get rid of the top section altogether
HideSection("//header[@class='clearfix']");

//If there is a header div, hide it
//I think this is deprecated now... comment-out for the time being
//HideSection("//div[@class='ILFE-container']/div[not(contains(@class,'article')) and not(contains(@class,'section'))]");

//Nuke the right-hand column as it's nothing but adverts and tweets. Expand body to 100%
HideSection("//section[@id='col-2']");
HideSection("//section[@id='quick-links']");
ExpandSection("//section[@id='col-1']");
ExpandSection("//section[@id='col-art']");

// And now they've added a rubbish panel of trashy gossipy weblinks at the bottom of every page, nuke these too
HideSection("//div[@id='taboola-div']");