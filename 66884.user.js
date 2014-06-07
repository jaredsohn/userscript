// ==UserScript==

// @name           Pardus Quick Building Attack

// @namespace      pardus.at

// @description    Links to attack pilots directly on building welcome screen

// @include        http://*.pardus.at/building.php*

//
//==Notes==

// This GreaseMonkey script was reverse engineered from Jarius's (Orion)/Janarius's (Artemis) Quick Commands script.

// It adds Attack/Trade buttons to the building menu, allowing these functions to be reached in 1 click rather than 2.

// Please ensure that http://*.pardus.at/building.php* is added to this script's Included Pages.


// Initial Release: Aegnor (Artemis), 02/07/09 - Wes R (Artemis) with bugfixes sometime after that.


// User Preferences


var enableBuildingPVP = true; // Adds an attack button to every other player on the building screen

var enableBuildingPlayerTrade = true; // Adds a trade button to every other player on the building screen
var buildingButtonFontSize = 1; // Input the size you want the attack/trade buttons to appear (1 or 2 recommended)


// End of User Preferences



var menuframe = null;

if(window.parent.frames.length > 0)
  menuframe = window.parent.frames[0].document;


var msgframe = null;

if(window.parent.frames.length > 1)
  msgframe = window.parent.frames[1].document;


var mainframe = null;

if(window.parent.frames.length > 2)
  mainframe = window.parent.frames[2].document;



if(location.pathname.search(/building.php/i)!=-1)
{
  
for(var i=0;i<document.links.length;i++)

  {
    
   var a = document.links[i];

   if(a.getAttribute('href').search(/building.php[?]detail_type=player/i)!=-1 && a.getAttribute('href').search(/squadron&detail_id/i)==-1 && a.innerHTML.indexOf('class="nf"')==-1 && a.innerHTML.indexOf("class='nf'")==-1)

    {

      var playerid = a.getAttribute('href').replace("building.php?detail_type=player&detail_id=", "");

      var child = document.createElement("font");

      child.setAttribute("size", buildingButtonFontSize);

      if(enableBuildingPVP || enableBuildingPlayerTrade) child.innerHTML = child.innerHTML + "";

      if(enableBuildingPlayerTrade) child.innerHTML = child.innerHTML + "<a href='ship2ship_transfer.php?playerid=" + playerid + "'>Trade</a>";

      if(enableBuildingPVP && enableBuildingPlayerTrade) child.innerHTML = child.innerHTML + "&nbsp;|&nbsp;";

      if(enableBuildingPVP) child.innerHTML = child.innerHTML + "<a href='ship2ship_combat.php?playerid=" + playerid + "'>Attack</a>";

      if(enableBuildingPVP || enableBuildingPlayerTrade) child.innerHTML = child.innerHTML + "<br>";

      if(enableBuildingPVP || enableBuildingPlayerTrade) a.parentNode.insertBefore(child,a.nextSibling.nextSibling.nextSibling);

    }
  
  }

}



// ==/UserScript==