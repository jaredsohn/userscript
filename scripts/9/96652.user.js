// ==UserScript==
// @name           dAmnsettingProbe
// @namespace      //
// @include        http://chat.deviantart.com/chat/*
// ==/UserScript==

function probe()
{
var currentSkin = unsafeWindow.dAmnChatTab_active;

  var currentChat = "";
  var allDivs = document.getElementsByTagName("div")
  for (var i = 0; i < allDivs.length; i++)
  {
    if (allDivs[i].className =="damncr")
    {
      currentChat+= i+" - "+allDivs[i].style.visiblity;
    }
  }
  
  SkinTab  = unsafeWindow.dAmnChatTab_active;
  var remSkin = document.getElementById(SkinTab).getAttribute("href");
  
  alert(currentSkin +", " + currentChat +", " + remSkin);
  }
  
  GM_registerMenuCommand("Get Settings", probe);