// ==UserScript==
// @name        Howrse buy50
// @namespace   myHowrse
// @description Change the first option on the droppings buy menu to 50 instead of 1.
// @include     http://*.howrse.com/marche/centre
// @author      daexion
// @version     1
// ==/UserScript==
window.setTimeout(changeBuyMenu,1000);
function changeBuyMenu()
{
	buyMenu = document.getElementById("purchase69");
	optionVals = buyMenu.getElementsByTagName("option");
	optionVals[0].setAttribute("value",50);
	optionVals[0].textContent = "50";
}