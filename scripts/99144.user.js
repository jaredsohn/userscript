// ==UserScript==
// @name           Pardus Combat Rounds
// @namespace      http://kpac.hit.bg/
// @description    Illegal!!1!
// @include        *artemis.pardus.at/ship2opponent_combat.php*
// @include        *artemis.pardus.at/ship2ship_combat.php*
// @include        *orion.pardus.at/ship2opponent_combat.php*
// @include        *orion.pardus.at/ship2ship_combat.php*
// @include        *pegasus.pardus.at/ship2opponent_combat.php*
// @include        *pegasus.pardus.at/ship2ship_combat.php*
// ==/UserScript==




var combatForm = document.getElementsByTagName('form')[1];

combatForm.getElementsByTagName('select')[0].getElementsByTagName('option')[19].setAttribute('selected','');


var buf = '';

combatForm.getElementsByTagName('div')[1].innerHTML = buf;