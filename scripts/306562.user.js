// ==UserScript==
// @name        Markierer
// @namespace   Happy
// @include     *rpg-city.de*Thread*
// @version     1
// @grant       none
// ==/UserScript==

//Strg+Alt+A drücken um alle zu markieren
//Strg+Alt+S drücken um alle zu demarkieren

document.addEventListener("keydown", keyDown);

function keyDown(e)
{
  if((e.keyCode == 65 || e.keyCode == 83) && e.ctrlKey && e.altKey)
  {
    for(var i=0;i<document.getElementsByTagName("input").length;i++)
    {
      if(document.getElementsByTagName("input")[i].type == "checkbox" && /wcf\d+/.test(document.getElementsByTagName("input")[i].id))
      {
        document.getElementsByTagName("input")[i].click();
        if(e.keyCode == 65) document.getElementsByTagName("input")[i].checked = true;
        else document.getElementsByTagName("input")[i].checked = false;
      }
    }
  }
}