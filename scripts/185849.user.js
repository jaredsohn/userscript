// ==UserScript==
// @name Mr. Mine Autoseller
// @author BIRDIE
// @namespace *
// @include http://*.mrmine.com/*
// @include http://mrmine.com/*
// @version 0.1
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==


function sellAll()
{
    $("#UPALLB").click();
    $("#PLACE1").click();
    $("#SB2").click(); /*Coal*/
    $("#SB3").click(); /*Cooper*/
    $("#SB4").click(); /*Silver*/
    $("#SB5").click(); /*Gold*/
    $("#SB6").click(); /*Platinum*/
    $("#SB7").click(); /*Diamond*/
    $("#SB8").click(); /*Coltan*/
    $("#SB9").click(); /*Painite*/
    $("#SB10").click(); /*Black opal*/
    $("#SB11").click(); /*Red Diamond*/
    $("#SB12").click(); /*Obsidian*/
    $("#SB13").click(); /*Californium*/
    $("#CLOSEs").click();
    window.setTimeout(sellAll, 120000);
}
sellAll();