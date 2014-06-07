// ==UserScript==
// @name           indigo.map.bm2
// @description    map buildmap MOD
// @include        http://*.pokemonindigo.*/map.php*
// ==/UserScript==

function buildMap2(map, x_coord, y_coord, has_leader)
{

	document.getElementById('scrollZone').innerHTML = '<div onclick="move()" id="cursorZone"><img  src="http://staropramen.pokemonindigo.com/images/ajax-circle-big-map.gif" alt="Please wait..." style="margin-top:22px;" /></div>';
	
	if(!x_coord || !y_coord) {
	
		var x_coord = randomNumber(19, 22);
		var y_coord = randomNumber(19, 19);
		
	}
	
	document.getElementById("bgOverWaitScreenNavigationScreen").style.display = "block";
	document.getElementById("bgWaitScreenNavigationScreen").style.display = "block";
	
	var pokemonIDs 			= new Array("196");
	var pokemonNames 		= new Array("Espeon");
	var pokemonIDSprites 	= new Array("196");
	var pokemonRangeStart 	= new Array("1");
	var pokemonRangeEnd 	= new Array("100");
	var pokemonLevelStart 	= new Array("9999999998");
	var pokemonLevelEnd 	= new Array("9999999999");
	
	var randomEvent = randomNumber(1, 4);
	
	if (randomEvent == 2) {
	
		var randomPokemon = randomNumber(0, (pokemonIDs.length - 1));
		var randomLevel = randomNumber(pokemonLevelStart[randomPokemon], pokemonLevelEnd[randomPokemon]);
		
		var randomShiny = randomNumber(1, 14);
		
			var shinyImg 	= "_shiny";
			var shinyMsg 	= " shiny ";
			var shinyForm 	= "<input type='hidden' name='shiny' value='1' />";
		
		document.getElementById('eventScreen').innerHTML = '<div style="float:left"><img src="http://staropramen.pokemonindigo.com/img_library/pokemon_sprites' + shinyImg + '/' + pokemonIDSprites[randomPokemon] + '.png" width="80" height="80" /></div> <div style="float:left; padding:18px 6px 6px 6px; width:210px; text-align:center"><strong>Wild ' + shinyMsg + pokemonNames[randomPokemon] + ' appeared!</strong><br /> <small>Level ' + randomLevel + '</small></div> 			<div style="float:left; padding:18px 3px 3px 3px;"> 			<form method="post" action="battle.php?type=wild"> 	<input type="hidden" name="mapType" value="room" />		<input type="hidden" name="id_pokemon" value="' + pokemonIDs[randomPokemon] + '" /> 	' + shinyForm + '		<input type="hidden" name="level" value="' + randomLevel + '" /> 			<input type="hidden" name="id_map" value="' + map + '" /> 			<input type="hidden" name="x" value="' + x_coord + '" /> 			<input type="hidden" name="y" value="' + y_coord + '" /> 			<input type="image" name="Fight" src="http://staropramen.pokemonindigo.com/images/button-fight.gif" style="width:72px; height:38px; border:0px solid;" alt="Fight" /> 			</form> 			</div>';
		
	} else {
		
		document.getElementById('eventScreen').innerHTML = '<div style="width:100%; padding-top:25px;" align="center">No event.</div>';
		
	}
	
	genScroll(map, x_coord, y_coord, has_leader);	
	loadPlayersCoords(x_coord, y_coord);
	//xajax_buildMap(map, x_coord, y_coord, has_leader);
	return false;
}

function setbm2()
{
 document.getElementById('cursorZone').innerHTML = "<img src=\"http://staropramen.pokemonindigo.com/images/navigation.png\" alt=\"Navigation cursor\" usemap=\"#Map\" border=\"0\">
<map name=\"Map\" id=\"Map\">
<area shape=\"poly\" coords=\"43,43,88,3,-2,2\" href=\"javascript:void(0);\" onclick=\"return buildMap2('1', '14', '10', 'yes');\">
<area shape=\"poly\" coords=\"42,44,45,42,89,-1,87,90\" href=\"javascript:void(0);\" onclick=\"return buildMap2('1', '15', '11', 'yes');\">
<area shape=\"poly\" coords=\"1,89,43,45,88,89\" href=\"javascript:void(0);\" onclick=\"return buildMap2('1', '14', '12', 'yes');\">
<area shape=\"poly\" coords=\"0,3,43,44,1,87\" href=\"javascript:void(0);\" onclick=\"return buildMap2('1', '13', '11', 'yes');\">
</map>";
 setTimeout(setbm2, 1000);
}

setTimeout(setbm2, 1000);