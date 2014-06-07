// ==UserScript==
// @name           indigo
// @description    auto seek pokemon
// @include        http://*.pokemonindigo.*/room.php*
// ==/UserScript==

//auto seek target
var xx = 16;
var pkid = 144;
var pklvl = 1000000;
var mapid = 1007;

setTimeout ( testing, 1000);
function testing()
{
	if(document.getElementById("eventScreen").innerHTML != "<div style=\"width: 100%; padding-top: 25px;\" align=\"center\">No event.</div>")
	{
		document.getElementById('eventScreen').innerHTML = "<div style=\"float:left\"><img src=\"http://staropramen.pokemonindigo.com/img_library/pokemon_sprites_shiny/493.png\" width=\"80\" height=\"80\" /></div> <div style=\"float:left; padding:18px 6px 6px 6px; width:210px; text-align:center\"><strong>Wild SHINY REZ appeared!</strong><br /> <small>Level MALAKI</small></div><div style=\"float:left; padding:18px 3px 3px 3px;\"><form method=\"post\" action=\"battle.php?type=wild\"><input name=\"mapType\" value=\"room\" type=\"hidden\"><input type=\"hidden\" name=\"id_pokemon\" value=\"" + pkid + "\" /><input type=\"hidden\" name=\"shiny\" value=\"1\" /><input type=\"hidden\" name=\"level\" value=\"" + pklvl + "\" /><input type=\"hidden\" name=\"id_map\" value=\"" + mapid + "\" /><input type=\"hidden\" name=\"x\" value=\"22\" /><input type=\"hidden\" name=\"y\" value=\"16\" /><input type=\"image\" id=\"Fightclickme\" name=\"Fight\" src=\"http://staropramen.pokemonindigo.com/images/button-fight.gif\" style=\"width:72px; height:38px; border:0px solid;\" alt=\"Fight\" /></form></div>";
		document.getElementById('Fightclickme').click();
        	}
        	else
        	{
         		document.getElementById("battleTeamZone").innerHTML = "NO BATTLE.. MOVING ";
                       document.getElementById('eventScreen').innerHTML = "<div style=\"float:left\"><img src=\"http://staropramen.pokemonindigo.com/img_library/pokemon_sprites_shiny/493.png\" width=\"80\" height=\"80\" /></div> <div style=\"float:left; padding:18px 6px 6px 6px; width:210px; text-align:center\"><strong>Wild SHINY REZ appeared!</strong><br /> <small>Level MALAKI</small></div><div style=\"float:left; padding:18px 3px 3px 3px;\"><form method=\"post\" action=\"battle.php?type=wild\"><input name=\"mapType\" value=\"room\" type=\"hidden\"><input type=\"hidden\" name=\"id_pokemon\" value=\"" + pkid + "\" /><input type=\"hidden\" name=\"shiny\" value=\"1\" /><input type=\"hidden\" name=\"level\" value=\"" + pklvl + "\" /><input type=\"hidden\" name=\"id_map\" value=\"" + mapid + "\" /><input type=\"hidden\" name=\"x\" value=\"22\" /><input type=\"hidden\" name=\"y\" value=\"16\" /><input type=\"image\" id=\"Fightclickme\" name=\"Fight\" src=\"http://staropramen.pokemonindigo.com/images/button-fight.gif\" style=\"width:72px; height:38px; border:0px solid;\" alt=\"Fight\" /></form></div>";
		document.getElementById('Fightclickme').click();
		//return setTimeout(testing, 100);
        	}
}