// ==UserScript==
// @name           dAmn restyler
// @namespace      //
// @description    Style the dAmn chat rooms using admin "embedable" style sheets
// @include        http://chat.deviantart.com/chat/*
// @Author        Trezoid
// @version       1.2
// ==/UserScript==

/* inspired by the dAmn styler script by sumopiggy, using the method of stylesheet embeding designed for that, and created out of my frustration at dAmnStyler 2 not working.*/

var currentSkin = null;
var currentURL = "";
function getSkin()
{
  var chatSkin = "";
  
  /*Ugly kludge to get the current chat*/
  var currentChat = "";
  var allDivs = document.getElementsByTagName("div")
  for (var i = 0; i < allDivs.length; i++)
  {
    if (allDivs[i].className =="damncr" && allDivs[i].style.visibility =="visible")
    {
      currentChat = allDivs[i]
      i = allDivs.length;
    }
  }
  
  var abbrs = currentChat.getElementsByTagName("abbr");
  for(var i = abbrs.length - 1; i >= 0; i--)
  {
    console.log(abbrs[i].getAttribute("title"));
    if (abbrs[i].getAttribute("title").indexOf("stylesheet") != -1)
    {
      chatSkin = abbrs[i].getAttribute("title");
      chatSkin = chatSkin.replace("stylesheet:", "");
      if(abbrs[i].getAttribute("title").indexOf("http") == -1)
      {
        chatSkin = "http://"+chatSkin;
      }
      
    }
  }
  
  currentURL = chatSkin;
  var styleLink = document.createElement("link");
  styleLink.setAttribute("type", "text/css");
  styleLink.setAttribute("href", chatSkin);
  styleLink.setAttribute("id", currentSkin);
  styleLink.setAttribute("rel", "stylesheet");
  
  var chatSpace = document.getElementsByTagName("head");
  chatSpace[0].appendChild(styleLink);
  
  changeSkin();
}

function startDelay()
{
  currentSkin  = unsafeWindow.dAmnChatTab_active;
  if(currentSkin != null)
  {
    getSkin();
  }
  else
  {
    setTimeout(startDelay, 1000)
  }
}

function changeSkin()
{
  var oldSkin = currentSkin;
  if(currentURL.length > 0)
  {
    var oldURL = currentURL;
  }
  currentSkin = unsafeWindow.dAmnChatTab_active;
  currentURL = document.getElementById(oldSkin).getAttribute("href");
  if((oldSkin != currentSkin) || (oldURL != currentURL))
  {
    var remSkin = document.getElementById(oldSkin);
    var head = document.getElementsByTagName("head");
    head[0].removeChild(remSkin);
    setTimeout(getSkin, 0);
  }
  else
  {
    setTimeout(changeSkin, 1000);
  }
}

startDelay();