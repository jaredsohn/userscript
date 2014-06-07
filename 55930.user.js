// ==UserScript==
// @name          No useless flash on Toilokdo
// @description   Make toilokdo (French games website) browsing more comfortable
// @include       http://www.toilokdo.com/*
// ==/UserScript==

// Agbeladem -- Version 1.0.5

function CheckAndDel (name) {
 if(document.getElementById(name)==null)
   return false
 else {
  document.getElementById(name).innerHTML='';
  return true;
 }

}


CheckAndDel('logo_flash');
CheckAndDel('publicite_right_jeux');
CheckAndDel('publicite_right_jouer');
CheckAndDel('publicite_index');
CheckAndDel('publicite_right');
CheckAndDel('compteur');
CheckAndDel('mimi_trailer');
CheckAndDel('lateledemimi');