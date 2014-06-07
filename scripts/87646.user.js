// ==UserScript==
// @name           Yapper
// @namespace      Doorbellscript
// @description    If you have the purse rat as your familiar, randomly places "YAP" images across all frames and screens
// @include        *kingdomofloathing.com*
// ==/UserScript==

Init();

function StartYipping(sPageHtml)
{
  if(sPageHtml.indexOf("purserat") > 0)
  {
    var eYipString = document.createElement("input");
    eYipString.type = "hidden";
    eYipString.name = "yipstring";
    eYipString.id = "yipstring";
    eYipString.value = "var yipdiv=document.createElement('div'); yipdiv.name='yipdiv'; yipdiv.innerHTML='<b>YAP</b>'; yipdiv.style.position='absolute'; yipdiv.style.left=Math.floor(Math.random() * (document.body.clientWidth - 10)); yipdiv.style.top=Math.floor(Math.random() * (document.body.clientHeight - 10)); yipdiv.style.color = 'red'; document.body.appendChild(yipdiv); if(Math.floor(Math.random() * 100) < 98) setTimeout(document.getElementById(\"yipstring\").value, Math.floor(Math.random() * 2000));";
    document.body.appendChild(eYipString);
    setTimeout(document.getElementById("yipstring").value, 50);
  }
}

function Init()
{
  if(location.href.indexOf("charpane") > 0)
    StartYipping(document.body.innerHTML);
  else
  {
    GM_xmlhttpRequest
    ({
      method:"GET",
      url:"http://" + window.location.host + "/charpane.php",
      onload: function(response){ if(response.readyState == 4) StartYipping(response.responseText);}
    });
  }
}

