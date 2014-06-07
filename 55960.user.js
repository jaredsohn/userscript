// ==UserScript==
// @name           Add Mob Wars / Mafia Wars Add link to friend's profiles
// @namespace      http://userscripts.org/users/75115
// @description    Replaces the 'Poke User' link with 'Add Mob/Mafia'
// @include        http://*.facebook.com/*
// @exclude        http://apps.facebook.com/*
// ==/UserScript==
//
// http://userscripts.org/scripts/show/55960
// --------------------------------------------------

fixPoke();
window.setInterval(function (){fixPoke()}, 5000);


function fixPoke()
{
   //The add links for the two applications.
   //These can be changed to the add links for any application:
   var addMob = "http://apps.facebook.com/mobwars/mob/do.php?join_id=";

   // these mafia wars links are broken
   //var addMafia = "http://apps.facebook.com/inthemafia/remote/html_server.php?xw_controller=war&xw_action=add&xw_city=1&friend_id=";
   //var addMafia = "http://apps.facebook.com/inthemafia/status_invite.php?from=";

   //Get the Poke element
   var sendPoke = document.getElementById("profile_action_poke");

   if (sendPoke)
   {
      var pokeStr = sendPoke.toString();  //convert the element to a usable string

      var fStart = pokeStr.indexOf("can_poke");  //Get the FB profile ID start point
      var fEnd = pokeStr.indexOf("pokeback") - 1; //Get the FB profile ID end point

      //set the onclick event to open Mafia Wars in a new window/tab
      //following line is broken
      //sendPoke.setAttribute("onclick","window.open('" + addMafia + pokeStr.slice(fStart+9,fEnd) + "')");
      sendPoke.setAttribute("onclick","");   //setting onclick to blank until mafia wars fix found

      //set the href to open Mob Wars in the current window
      sendPoke.setAttribute("href", addMob + pokeStr.slice(fStart+9,fEnd));
      //changes the Poke link
      sendPoke.innerHTML = "Add to Mob/Mafia";
      sendPoke.setAttribute("ID", "AddMafiaMob");
      sendPoke.setAttribute("REL", "");
   }
}