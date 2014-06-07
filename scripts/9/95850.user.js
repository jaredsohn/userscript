// ==UserScript==
// @name           Politopia Bigger Shoutbox
// @namespace      KarlSRuher
// @description    Mouse click on [+/-] before Shoutbox increases the height of the shoutbox
// @include        http://www.politopia.de/*
// @match 		   http://*.politopia.de/*
// ==/UserScript==

function toggleShoutboxHeight()
{
   var shoutbox = document.getElementById('vbshout'); 
   if (shoutbox.style.height == "80px")
      shoutbox.style.height = "500px";
   else shoutbox.style.height = "80px";
}


var links = document.getElementsByTagName('a');
for (var i = 0; i < links.length; i++)
{
   if (links[i].href == "http://www.politopia.de/vbshout.php?do=archive") 
   {
      var shoutbox_link = links[i];
      shoutbox_link.parentNode.innerHTML = "<a id='toggleShoutboxHeight' href='#'>[+/-]</a>" + shoutbox_link.parentNode.innerHTML.substr(1);
      document.getElementById('toggleShoutboxHeight').addEventListener("click", toggleShoutboxHeight, true);
      break;
   }
}