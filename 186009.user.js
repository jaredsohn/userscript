// ==UserScript==
// @name        BTC-E Trollbox remover
// @namespace   https://btc-e.com
// @description Removes the trollbox/chatbox from BTC-e.com
// @include     http*://btc-e.com/*
// @include     http*://*.btc-e.com/*
// @include     http*://*.btc-e.com/*
// @grant       none
// @version     1
// ==/UserScript==
/*
* Author:       David van der Sluis
* Website:      http://www.davidvandersluis.nl
* Date:         12-12-2013
* Description:  Removes the chatbox from btc-e.com
*/

//DS: Find the trollbox:
try{
    if(typeof document.getElementById('nChatCon') !="undefined"){
        var TrollBox = document.getElementById('nChatCon');
        var TrollBoxParent = TrollBox.parentNode;
        TrollBoxParent.removeChild(TrollBox);
        TrollBoxParent.parentNode.removeChild(TrollBoxParent); //DS: Also remove the parent for cleanliness in the gui
    }
}catch(e){
//DS: fail gracefully
}



