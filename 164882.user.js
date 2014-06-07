// ==UserScript==
// @name           Ogspy teste
// @namespace      CorVuS
// @description	   Rajout de l'armada
// @include        http://*.ogame.*/game/index.php?page=galaxy*
// ==/UserScript==
var pseudo = 'CorVuS'
var fullTable = document.getElementsByTagName("table")[0].getElementsByTagName("tr")[2];

var totalPoints = fullTable.getElementsByTagName("table")[2].getElementsByTagName("tr")[3].getElementsByTagName("th")[2];

alert('pseudo'); 