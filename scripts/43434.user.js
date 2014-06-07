// ==UserScript==
// @name           indigopkcenter
// @description    auto pkcenter
// @include        http://*.pokemonindigo.*/pokemon_center.php*
// ==/UserScript==

function autopkcenter()
{
  if(document.getElementById("battleTeamZone").innerHTML != "&nbsp;")
  {
    document.getElementById("recoveredZone").innerHTML = "<a href=\"javascript:void(0)\" name=\"healmoko\" id=\"healmoko\" onclick=\"return recoverMyPokemon();\"><img src=\"http://staropramen.pokemonindigo.com/images/button-recover-pokemon.gif\" alt=\"Recover my Pokémon\" id=\"healButton\" width=\"226\" border=\"0\" height=\"38\"></a>";

    if(document.getElementById("recoveredZone").innerHTML == "Your Pokemon is now at full health. Come back any time.")
    {
      return window.location = "battle.php?type=autotrainer&tid=535493&map=19";
    }
    else
    {
      //document.getElementById("healmoko").click();
      xajax_recoverMyPokemon();
      return setTimeout(autopkcenter, 5000);
    }

  }
  else
  {
    return setTimeout(autopkcenter, 100);
  }
}

setTimeout(autopkcenter, 1000);