// ==UserScript==
// @name           Server Auto Selection
// @namespace      ikariam
// @description    Selection auto univers Beta
// @include        http://ikariam.gr/
// @include        http://www.ikariam.gr/
// @include        http://ikariam.gr/index.php
// ==/UserScript==






function setInfomation() {
    var serverold = GM_getValue("Server", "Επιλογή Server");
    GM_setValue("Server", prompt("Επιλογή προεπιλεγμένου server\n\n 0 =Alpha\n 1 = Beta\n 2 = Gamma\n 3 = Delta\n 4 = Epsilon\n 5 = Zeta\n 6 = Eta\n 7 = Theta\n ", serverold) || serverold);
   

window.location.reload();
};

GM_registerMenuCommand("ΕΠΙΛΟΓΗ ΠΡΟΕΠΟΙΛΕΓΜΕΝΟΥ SERVER(ΙΚΑRIAM.GR) ", setInfomation);

var SERVER = GM_getValue("Server", "SERVER");



if (SERVER == "SERVER") {
  setInfomation();
} else {


opts = document.getElementById('universe').getElementsByTagName('option');
opts[SERVER].selected = true;

}

