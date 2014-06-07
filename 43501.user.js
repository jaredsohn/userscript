// ==UserScript==
// @name           indigoinfmasterball
// @description    infinite master balls
// @include        http://*.pokemonindigo.*/battle.php*
// ==/UserScript==

function autobattle()
{
  document.getElementById("itemBox").innerHTML = "<div style=\"border-bottom: 1px solid rgb(59, 149, 202); padding: 1px; background: rgb(213, 235, 249) none repeat scroll 0% 0%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial; font-family: Verdana,Arial,Helvetica,sans-serif;\">
		<div style=\"float: left;\">
			<img src=\"http://staropramen.pokemonindigo.com/img_library/items/rsitem305.png\" alt=\"Items\" style=\"vertical-align: middle;\">
			<strong>Item's List</strong>
		</div>
		<div style=\"float: right;\">
			<strong>
				<a href=\"javascript:void(0);\" onclick=\"javascript:document.getElementById('itemBox').style.display='none';\">CLOSE</a>&nbsp;&nbsp;
			</strong>
		</div>
		<div class=\"clear\">
			<img src=\"http://staropramen.pokemonindigo.com/images/spacer.gif\" alt=\"sp\">
		</div>
	</div>
	<div class=\"itemSelectBox\">
		<img src=\"http://staropramen.pokemonindigo.com/img_library/items/23.png\" alt=\"PkBall\" align=\"left\" border=\"0\">
		<strong>Poke Ball</strong>
		<i>(X6)</i>
		<br>
  		<small>
			<i>
				<a href=\"javascript:void(0);\" onclick=\"document.getElementById('itemBox').style.display='none'; return setBattle('0', '', '', '', '', '', '', '23');\">Use</a>
			</i>
		</small>
	</div>									
	<div class=\"itemSelectBox\">
		<img src=\"http://staropramen.pokemonindigo.com/img_library/items/26.png\" alt=\"PkBall\" align=\"left\" border=\"0\">
		<strong>Master Ball</strong>
		<i>(X12)</i>
		<br>
  		<small>
			<i>
				<a href=\"javascript:void(0);\" onclick=\"document.getElementById('itemBox').style.display='none'; return setBattle('0', '', '', '', '', '', '', '26');\">Use</a>
			</i>
		</small>
	</div>";

  return setTimeout(autobattle, 5000);
}
setTimeout(autobattle, 10000);