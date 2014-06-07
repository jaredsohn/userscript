// ==UserScript==
// @name           server auto sélection FR
// @namespace      ikariam
// @description    Selection auto univers Beta
// @include        http://ikariam.fr/
// @include        http://www.ikariam.fr/
// @include        http://ikariam.fr/index.php
// ==/UserScript==

//opts = document.getElementById('server').getElementsByTagName('option');
// Changer l'index d'opts de 0 a? 7 (alpha a? theta) pour changer l'univers par défaut
//opts[3].selected = true;





function setInfomation() {
    var serverold = GM_getValue("Server", "Entrez juste le chiffre ici");
    GM_setValue("Server", prompt("Entrez le chiffre de votre server\nen sachant que :\n\n 0 =Alpha\n 1 = Beta\n 2 = Gamma\n 3 = Delta\n 4 = Epsilon\n 5 = Zeta\n 6 = Eta\n 7 = Theta\n 8 = Iota\n 9 = Kappa\n", serverold) || serverold);
   

window.location.reload();
};

GM_registerMenuCommand("option du script => ikariam.fr server auto-selection", setInfomation);

var SERVER = GM_getValue("Server", "SERVER");



if (SERVER == "SERVER") {
  setInfomation();
} else {


opts = document.getElementById('universe').getElementsByTagName('option');
opts[SERVER].selected = true;

}