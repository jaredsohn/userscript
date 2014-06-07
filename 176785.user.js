// ==UserScript==
  
// @name            GM dynamische menu verwijderen
  
// @author          Tjeerdo
// @version         1.0i   
// @description     verwijderd het dynamische menu
// @include         http://nl*.tribalwars.nl/game.php?*
  
// ==/UserScript==

function dynamicMenu()
{
$(".menu_column").remove();
}
function injectScript(func) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + func + ')();';
    document.body.appendChild(script); // run the script
    document.body.removeChild(script); // clean up
}

injectScript(dynamicMenu);
