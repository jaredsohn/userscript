// ==UserScript==
// @name          No useless flash on Yacado
// @description   Make yacado (French games website) browsing more comfortable
// @include       http://www.yacado.com/*
// ==/UserScript==

// Agbeladem -- Version 1.0

function CheckAndDel (name) {
 if(document.getElementById(name)==null)
   return false
 else {
  document.getElementById(name).innerHTML='';
  return true;
 }

}


CheckAndDel('SkyFlottant');
CheckAndDel('entete_flash');

document.getElementById('corps').getElementsByTagName('td')[0].innerHTML='';


