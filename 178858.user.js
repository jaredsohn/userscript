// ==UserScript==
// @name        OGame: Campos Disponibles
// @namespace   sigma-reef-campos-disponibles
// @description Muestra la cantidad de campos que te quedan disponibles en un planeta
// @include        http://*.ogame.*/game/index.php?page=*
// @version     1
// @downloadURL https://userscripts.org/scripts/source/178858.user.js
// @updateURL   http://userscripts.org/scripts/source/178858.meta.js
// ==/UserScript==

(function () {
/* START CRIPT */
  
	var calculateAbailableFields = (function () {
    $('.smallplanet').each(function( index ) {
      var fields = (($(this).html()).split("km (")[1]).split(")<BR>")[0];
      var abailable = fields.split("/")[1] - fields.split("/")[0];
      var abailableString = (abailable > 9 ? '<font style="color: lime">' : '<font style="color: red">0') + abailable + '</font> ';
      var newText = abailableString + $(this).find(".planet-name").text();     
      $(this).find(".planet-name").html( newText );
    });

  }).toString ();
	var script = document.createElement ("script");
	script.setAttribute ("type", "application/javascript");
	script.textContent = "(" + calculateAbailableFields + ") ();";
	document.body.appendChild (script);
  
/* !SCRIPT */
})();