// ==UserScript==
// @name           Ricopolis casino Apuesta automatica
// @namespace      Ricopolis
// @description    Click automatico en la apuesta para casinos en ricopolis
// @author	   Rantes
// @includes	   http://www.ricopolis.com/casinos.usuario.php?casino=*
// @includes	   http://www.ricopolis.com/casinos.usuario.php*
// ==/UserScript==

var fichitas = document.getElementById("fichas");
fichitas.value = 605;

setInterval("apostar()",3000);