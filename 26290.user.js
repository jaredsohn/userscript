//
// Written by Faisal Deshmukh
// Script Version: 1.0
//
//
// ==UserScript==
// @name          BBC ad remover
// @namespace	  http://userscripts.org/scripts/show/7939
// @description   Removes ads and other annoying stuff from BBC News
// @include       http://*.bbc.co.uk/*
// ==/UserScript==



function removeByXPath(xpath) 
{
    var allElements, thisElement;
    allElements = document.evaluate(
            xpath,
            document,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null);
    for (var i = 0; i < allElements.snapshotLength; i++) {
        thisElement = allElements.snapshotItem(i);
        thisElement.parentNode.removeChild(thisElement);
    }
}


//  *****removal by known div id / id*****

var targetElement = document.getElementById('bbccom_mpu');	//removes Ad and "Advertisement" from RHS
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}

var targetElement = document.getElementById('socialBookMarks');		//facebook, reddit,etc
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}

var targetElement = document.getElementById('bbccom_leaderboard');	//removes top ad
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}

var targetElement = document.getElementById('bbccom_bottom');	//removes bottom ad
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}

var targetElement = document.getElementById('bbccom_button');	//removes bottom on LHS
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}

//  *****removal by known classes*****

removeByXPath('//div[@class="feeds"]');		//removes news feeds from top right area
removeByXPath('//SPAN[@class="feedslink"]');	//removes news feeds just above "most popular stories now"
removeByXPath('//div[@class="lang"]');		//removes "Languages" from LHS

removeByXPath('//div[@class="siteVersion"]');	//removes site version selection (uk or international)

removeByXPath('//div[@class="mvtb"]');		//removes "email this to a friend and printable version"
