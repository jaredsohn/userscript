// ==UserScript==
// @name          SchülerVZ Gruppeneinladungen ausblenden
// @description   blendet nervige Gruppeneinladungen aus
// @version       1.0
// @author        Eric Lanfer,Samuel Essig
// @namespace     afflatus-arts.com
// @homepage      http://afflatus-arts.com
// @copyright     2010, Afflatus-Arts.com
// @license       No distribution!
// @include       http://*.schuelervz.net*
// ==/UserScript==

try {
  if(document.getElementById('GroupInvitation'))
    document.getElementById('GroupInvitation').innerHTML = '';
} 
catch(e) {};