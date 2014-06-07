// ==UserScript==
// @name         Steam Cards Button
// @namespace    mF4dUS.SteamCardsButton
// @version      0.1
// @description  Create Button link to list the game's Steam Cards if exist, based on 7-elephant's http://userscripts.org/scripts/show/186163
// @match        http://store.steampowered.com/app/*
// @copyright    2014, mF4dUS
// ==/UserScript==

function cardsButton()
{
    var divNames = document.getElementsByClassName("name");
    var divSiteInfo = document.getElementsByClassName("apphub_OtherSiteInfo");
    var steamCardExist = false;
    
    for (var i in divNames)
    {
        if(divNames[i].textContent === "Steam Trading Cards") 
        {
            steamCardExist = true;            
            break;
        }
    }
    
    if (steamCardExist == true) 
    {
        var url = document.documentURI;
       	var patt = /^http[s]?:\/\/store.steampowered.com\/app\//i;
        var pattEnd = /[^0-9].*$/i;
        var appID = url.replace(patt,"").replace(pattEnd,"");
        
        divSiteInfo[0].innerHTML = divSiteInfo[0].innerHTML + 
        	" &nbsp;<a class=\"btn_darkblue_white_innerfade btn_medium\"" +
            " href=\"http://steamcommunity.com/my/gamecards/"+appID+"\">" +
            "<span>Trading Cards</span></a>";
    }
}
cardsButton();