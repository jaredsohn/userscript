// ==UserScript==
// @name           Disable Realtime Facebook Feed
// @version        1.0
// @description    Removes the new realtime feed from your Facebook page.
// @namespace      djnemec
// @include        *://*.facebook.com/*
// ==/UserScript==

retries = 3;

function main(){
  var ticker = document.getElementById("pagelet_ticker");
  if(ticker == null && retries > 0){
    retries--;
    setTimeout(main, 1000);
  }
  else if(ticker != null){
    ticker.className = "hidden_elem";
    var chatbar = document.getElementsByClassName("fbChatSidebarBody");
    if(chatbar.length > 0){
      chatbar[0].style.height = "95%";
    }
  }
}

//if(document.getElementById("pagelet_ticker") == null){
  window.addEventListener("load", main, false);
//}
//else{
//  main();
//}
