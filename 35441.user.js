// ==UserScript==
// @name           stämme - angriff
// @namespace      stämme - angriff
// @description    stämme - angriff
// @include        http://de*.die-staemme.de/game.php?village=*&screen=place
// ==/UserScript==
document.addEventListener('keypress', function(event){
  inputs=["spear","sword","axe","archer","spy","light","marcher","heavy","ram","catapult","knight","snob","x","y"];
  defaults={"spear":"100","sword":"100","axe":"","archer":"100","spy":"","light":"","marcher":"","heavy":"","ram":"","catapult":"","knight":"","snob":"1","x":"","y":""} //Falls nichts eingespeichert ist
  if(event.which == 101){    //e
    for(unit in inputs)
      document.getElementsByName(inputs[unit])[0].value=GM_getValue(inputs[unit],defaults[inputs[unit]]);
  }
	if(event.which == 115){    //s
    for(unit in inputs)
      GM_setValue(inputs[unit], document.getElementsByName(inputs[unit])[0].value);
	}
}, true);