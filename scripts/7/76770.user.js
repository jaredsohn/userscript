// ==UserScript==
// @name           Partis leech ratio
// @namespace      partis_leech_ratio
// @description    Shows leech ratio
// @include        http://www.partis.si/torrent/brskaj*
// ==/UserScript==

function start()
{
   var container = document.getElementById("torrentlist");
   var divz = container.getElementsByTagName("div");
   var sejalcev = 0.0;
   var pijavk = 0.0
   for(i=0;i<divz.length;i++)
   {
      if(divz[i].className == "listeknovo")
      {
         sejalcev = divz[i+10].innerHTML;
         pijavk = divz[i+11].innerHTML;
         if(sejalcev == 0)
         {
               divz[i+12].innerHTML += "<br /><font color=\"red\" size=\"5\">⇎</font>";
         }
         else
         {
            if(pijavk/sejalcev>1)
            {
               if(sejalcev == 1)
               {
                     divz[i+12].innerHTML += "<br /><font color=\"orange\" size=\"5\">⇝</font>";
               }
               else
               {
                  divz[i+12].innerHTML += "<br /><font color=\"green\">" + roundNumber(pijavk/sejalcev, 2) + "</font>";
               }
            }
            else
            {
               divz[i+12].innerHTML += "<br /><font color=\"red\">" + roundNumber(pijavk/sejalcev, 2) + "</font>";
            }
         }
      }
   }
}
function roundNumber(num, dec)
{
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}

start();