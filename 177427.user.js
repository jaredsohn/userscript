// ==UserScript==
// @name        Outlook.com
// @namespace   https://dub114.mail.live.com/
// @include     https://dub114.mail.live.com/*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @grant       none
// ==/UserScript==


var $j = jQuery.noConflict();

var stylemebetter = function()
{
    $j('#RightRailContainer').css('display', "none");
    $j('#MainContent').css('right', "0px");
    $j('.InboxTableBody LI').css('height', "22px");
    $j('.InboxTableBody LI .Ck').css('padding-top', "0px");
    $j('.InboxTableBody LI .Lt').css('padding-top', "0px");
    $j('.InboxTableBody LI .Rt').css('padding-top', "0px");
    $j('.InboxTableBody LI .Sb').css('padding-top', "0px");
    $j('.lnav_itemLnk').css('min-height', "22px");
    $j('.lnav_itemLnk .Caption').css('line-height', "1em");
    
    $j('#mlPinBoard').css('border-bottom', "solid 2px #000");
    $j('#mlPinBoard').css('padding-bottom', "5px");
    
    $j('.lnav_itemLnk').click(function(event){
        stylemebetter();
        setTimeout(stylemebetter, 500);
    });
}

stylemebetter();

$j('html').click(function(event){
    stylemebetter();
});



