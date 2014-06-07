//
// Written by Faisal Deshmukh
// Script Version: 1.6
//
//
// ==UserScript==
// @name          Clean TheFreeDictionary.com
// @namespace	  http://userscripts.org/scripts/show/7939
// @description   Fixes various tfd.com and TheFreeDictionary.com annoyances.
// @include       http://www.thefreedictionary.com/*
// @include       http://*.thefreedictionary.com/*
// ==/UserScript==


var targetElement = document.getElementById('topline');
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}

var targetElement = document.getElementById('TDLit');
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
var targetElement = document.getElementById('TDTotalBrowser');
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
var targetElement = document.getElementById('TDDef');
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
var targetElement = document.getElementById('DefandLit');
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
var targetElement = document.getElementById('FooterCopy');
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
var targetElement = document.getElementById('FooterLinks');
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
var targetElement = document.getElementById('f2');		//removes the bottom search box
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
var targetElement = document.getElementById('f1_tfd_searchby');	//removes the search by 'Word / Article, Starts with, Ends 

with, Text' area
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
var targetElement = document.getElementById('Browsers');	//removes the related search boxes (browsers) from the bottom 

part
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}

/*
var targetElement = document.getElementById('TabSeparator');	//removes the separator b/w wiki and hutchinson
if (targetElement) {
    targetElement.parentNode.removeChild(targetElement);
}
*/


function addGlobalStyle(css) {
    var head, style;

    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.media = 'screen, tv, projection, print';
    style.innerHTML = css;
    head.appendChild(style);
}

function removeByXPath(xpath) {
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

//alert('boogeyman is here');

//addGlobalStyle( '#MainTxt {width: 76%; text-align: justify  ! important }');  	//stretches the article by increasing 

width of a known div id in this case the id==MainTx


//addGlobalStyle('#MainTxt {color: green; width: 76%  ! important }');  	//stretches and changes color of the article.

addGlobalStyle( '#MainTxt {text-align: justify  ! important }');  	//justifies the content


//  *****start of horizontal scroll bar removal*****

var targetElement = document.getElementById('MainTxt');
if (targetElement) {
    targetElement.style.overflowX = "hidden";
    targetElement.style.overflowY = "hidden";	//commenting this will produce another vertical scroll bar
}

//  *****end of horizontal scroll bar removal*****


removeByXPath('//div[@class="adv"]');
removeByXPath('//div[@class="brand_copy"]');	//wiki license
removeByXPath('//div[@class="banner_ad"]');
removeByXPath('//table[@class="sbox1"]');
removeByXPath('//td[@class="Subscr"]');
//removeByXPath('//td[@class="inactiveTab"]');
//removeByXPath('//a[@class="help help8"]');
removeByXPath('//A[@class="help help5"]');	//removes the small boxes with question marks

//removeByXPath('//map[@name="socialNetworks"]');
//removeByXPath('//table[@cellpadding="1"][@cellspacing="0"]');

//removeByXPath('//input[@ondblclick="click_block=1"][@size="65"]');	//removes only the middle input box (containing the 

link)

//removeByXPath('//table[@cellpadding="0"][@cellspacing="0"]//td[@valign="top"]');
removeByXPath('//p[.="Link to this page:"]');	//removes the box containing the 'link to copy'
removeByXPath('//b[.="Please bookmark with social media, your votes are noticed and appreciated:"]');

//removeByXPath('//th[.="Full browser"]');
removeByXPath('//div[@style="font-size: 11px; margin-left: 35px; margin-top: 5px; color: rgb(80, 134, 176);"]'); //removes 

the visitors served 

//removeByXPath('td/img');		//[@style="display: none;"]');
//removeByXPath('//div[.="Hutchinson"*]');
//removeByXPath('//td[@class="inactiveTab" and @valign="top"]/img::*');