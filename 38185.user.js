// ==UserScript==
// @name           OdnoklassnikiFriendsActivity
// @namespace      odnoklassniki
// @include        http://*odnoklassniki.ru/*
// @include        http://*odnoklassniki.ua/*
// ==/UserScript==


function removeActivityFeed() {
    var activityDivId = 'friendsFeedPanel';
    parentObj = document.getElementById(activityDivId).parentNode;
    childObj = document.getElementById(activityDivId); 

    parentObj.removeChild(childObj);
}

removeActivityFeed();