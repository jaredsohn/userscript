// ==UserScript==
// @name           indigobattle
// @description    auto battle
// @include        http://*.pokemonindigo.*/battle.php*
// ==/UserScript==

function autobattle()
{
  if(document.getElementById("rivalsPokemonBanch").innerHTML != "<img src=\"http://staropramen.pokemonindigo.com/images/ajax-circle-big.gif\" alt=\"Hold on...\" style=\"padding: 15px;\">")
{
   if(document.getElementById("turnsBox").innerHTML == "Your turn...")
   {
     document.getElementById("attack4").checked = true;
document.getElementById("PPLeft3").value = 20;
     if(document.getElementById("AttackButton").style.display == "none")
     {
       if(document.getElementById("ContinueButton").style.display == "block")
       {
        document.getElementById("ContinueButton").click();
        return autobattle();
       }
       else
       {
        //return window.location = "battle.php?type=autotrainer&tid=535493&map=19";
        return window.location = document.getElementById("Back2MapButton").parentNode.href;
       }
     }
     else
     {
      document.getElementById("AttackButton").click();
      return setTimeout(autobattle, 1000);
     }
   }
   else if(document.getElementById("turnsBox").innerHTML == "You won the battle!")
   {
    //return window.location = "battle.php?type=autotrainer&tid=535494&map=20";
return window.location = document.getElementById("Back2MapButton").parentNode.href;
   }
   else
   {
   return setTimeout(autobattle, 1000);
   }
}
else
{
return setTimeout(autobattle, 1000);
}
}
setTimeout(autobattle, 5000);