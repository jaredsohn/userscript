// ==UserScript==
// @name        LoL-Tribunal
// @namespace   loltribunal
// @description Extends the lol-tribunal-chatlog
// @include     http://euw.leagueoflegends.com/tribunal/*
// @version     2
// @grant       none
// ==/UserScript==
/*******
Userscript by Valerionn for the League of Legends-Tribunal
*******/
document.getElementsByTagName("body")[0].onload = function()
{
  changeDivs();
}
function changeDivs()
{
  //change chat height
  var divs = document.getElementsByClassName("chat-scroll");
  for(var i = 0; i < divs.length; i++)
  {
    divs[i].style.maxHeight = "500px";
  }
}
