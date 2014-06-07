// ==UserScript==
// @name Unicreatures Egg pop-up
// @namespace Unicreatures Egg pop-up
// @description Unicreatures Egg pop-up
// @include http://unicreatures.com/explore.php*
// @include http://www.unicreatures.com/explore.php*
// ==/UserScript==

var y = document.body.innerHTML;


if(y.indexOf("You find a Noble")> 0)
{
alert('Egg Alert');
}



if(y.indexOf("You find an Exalted")> 0)
{
alert('Egg Alert');
}



if(y.indexOf("Tictoc egg nearby!")> 0)
{
alert('Egg Alert');
}
