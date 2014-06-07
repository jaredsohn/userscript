// ==UserScript==
// @name        Tribunal-Review
// @namespace   loltribunal_varlerionn
// @description Improves the tribunal review
// @include     http://*.leagueoflegends.com/tribunal/*/justice-review/*
// @version     1
// @grant       none
// ==/UserScript==
/*******
Userscript by Valerionn for the League of Legends-Tribunal
*******/
document.getElementsByTagName("body")[0].onload = function()
{
  $.each($('#justice-review .data-table tbody tr'), function(index, value)
  {
    var correct = false;
    //German
    if(value.children[1].innerHTML == "Überspringen") return;
    if(value.children[1].innerHTML == "Bestrafen" && value.children[3].innerHTML != "Vergeben") correct = true;
    if(value.children[1].innerHTML == "Vergeben" && value.children[3].innerHTML == "Vergeben") correct = true;
    //English
    if(value.children[1].innerHTML == "Skip") return;
    if(value.children[1].innerHTML == "Punish" && value.children[3].innerHTML != "Pardon") correct = true;
    if(value.children[1].innerHTML == "Pardon" && value.children[3].innerHTML == "Pardon") correct = true;
    
    //Color cases
    if(correct) $(value).css("background-color", "limegreen");
    else $(value).css("background-color", "darkorange");
  });
}