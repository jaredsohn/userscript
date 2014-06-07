// ==UserScript==
// @name          GameQ Select All Button
// @namespace     http://giggas2.dyndns.org
// @include       http://www.gamefly.com/Queue/Default/
// @description   This script will add a select all button to the GameQ page for easy removal of all games.
// ==/UserScript==

var div = document.getElementById("gamesOnList");
if (document.body.childNodes.length > 15 && div != null)
{
   var button = document.createElement("button");
   button.setAttribute('id', 'select-all');
   button.addEventListener('click', function (e) {for (var x = 0; x < document.getElementsByName("del").length; x++) { document.getElementsByName("del")[x].checked = true;}}, true);
   button.innerHTML = "Select All Games";
   button.setAttribute('style', 'position: absolute; top: 1003px;');
   div.appendChild(button);
}