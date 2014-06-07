// ==UserScript==
// @name       Steam Market: Navigate using arrow keys
// @version    0.1
// @description  Use left and right arrow key to navigate through pages on steam market search pages and listings
// @include		http://steamcommunity.com/market/search?q=*
// @include      http://steamcommunity.com/market/listings/*
// @copyright  2012+, Summ
// ==/UserScript==


window.addEventListener("keydown", function (e) {keyListener(e)}, false);

function keyListener(event) {
   if(!g_oSearchResults)
       return false;
    
   if(event.keyCode == 37) {
       g_oSearchResults.PrevPage();
   }
   else if(event.keyCode == 39) {
       g_oSearchResults.NextPage();
   }
}

