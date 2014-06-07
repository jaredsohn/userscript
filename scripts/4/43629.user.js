// ==UserScript==
// @name           indigo.map
// @description    auto map battler part 2
// @include        http://*.pokemonindigo.*/map.php*
// ==/UserScript==

setTimeout ( testing, 1000);
function testing()
{
	if(document.getElementById("eventScreen").innerHTML != "<div style=\"width: 100%; padding-top: 25px;\" align=\"center\">No event.</div>")
	{
window.history.back();
        }
        else
        {
window.history.back();
        }
}