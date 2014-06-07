// ==UserScript== //
// @name           Live Hotmail Clean-Up
// @version        1.0
// @namespace      http://scripting.douweikkuh.nl
// @description    Removes all of the ads and other unnecessary stuff in Windows Live Hotmail
// @include        http://*.mail.live.com/mail/*
// ==/UserScript== //

//FUNCTIONS 
var allPageTags = new Array(); 

function hideClass(theClass) {
    //Populate the array with all the page tags
    var allPageTags=document.getElementsByTagName("*");
    //Cycle through the tags using a for loop
    for (i=0; i<allPageTags.length; i++) {
        //Pick out the tags with our class name
        if (allPageTags[i].className==theClass) {
            //Manipulate this in whatever way you want
            allPageTags[i].style.display='none';
        }
    }
}

function widthClass(theClass,theWidth) {
    //Populate the array with all the page tags
    var allPageTags=document.getElementsByTagName("*");
    //Cycle through the tags using a for loop
    for (i=0; i<allPageTags.length; i++) {
        //Pick out the tags with our class name
        if (allPageTags[i].className==theClass) {
            //Manipulate this in whatever way you want
            allPageTags[i].style.width=theWidth;
        }
    }
}

//CLEANING

var todayPage = widthClass('cTodayPage','99%');

var todayPage2 = widthClass('cContentInner','99%');

var adSide = hideClass('dSideAds');

var adSide2 = document.getElementById('cRadAdsToday');
if (adSide2) {
    adSide2.parentNode.removeChild(adSide2);
}

var Privacy = hideClass('cPrivacyPane');

var button = document.getElementById('cToolsCustomerCommunication');
if (button) {
    button.parentNode.removeChild(button);
}

var button2 = hideClass('cToolsCustomerCommunication');

var adBar = document.getElementById('RadAd_Banner');
if (adBar) {
    adBar.parentNode.removeChild(adBar);
}

var adBar2 = document.getElementById('RadAd_TodayPage_Banner');
if (adBar2) {
    adBar2.parentNode.removeChild(adBar2);
}

var footer = hideClass('FooterLink');
 
var readPane = document.getElementById('ReadMessagePane');
if (readPane) {
    readPane.style.height = '99%';
}