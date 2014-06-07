// ==UserScript==
// @name        OGame: Advertencia por pocos espacios de flota libres
// @namespace   advertencia-pocos-espacios
// @include     http://*.ogame.*/game/index.php?page=*
// @downloadURL https://userscripts.org/scripts/source/163856.user.js
// @updateURL   http://userscripts.org/scripts/source/163856.meta.js 
// @version     1.1
// @date        2013-04-05
// @require     http://userscripts.org/scripts/source/118453.user.js
// ==/UserScript==

if((typeof(oGameVersionCheck) != "undefined")) {
	oGameVersionCheck('Advertencia por pocos espacios de flota libres','5.6.99.99','http://userscripts.org/scripts/show/163838');
}
if (document.location.href.indexOf ("/game/index.php?page=fleet1") < 0) return;

window.addEventListener("load", function(e) {
  
    /* Aquí se puede editar el valor */
    var freeFleetSlots = 1; // Recomendando =1
    
    /* No editar desde aquí */
    if(document.location.href.indexOf("/game/index.php?page=fleet1") > 0) {
      var slots    = (document.getElementById('slots').innerHTML).split('</span>')[1];
      var bussy    = parseInt((slots.split('/')[0]).replace(' <span class="overmark">',''));
      var total    = parseInt(slots.split('/')[1]);
      
      if(bussy >= (total - freeFleetSlots)){
        alert('¡CUIDADO! Sólo queda 1 espacio de flota libre')
        return;
      }
    }
    
}, false);