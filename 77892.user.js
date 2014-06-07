// ==UserScript==
// @name           Nettby ads fix!
// @description    Fjerner reklamen på nettby. 
// @include        http://*nettby.no*
// ==/UserScript==

//hoved
document.getElementById("GLOB_bg").style.marginTop = "-15px";
document.getElementById("rekl").style.display = "none";
document.getElementById("rekl_180_center").style.display = "none";

//Fiks for profiler som har css
document.getElementById("rekl").style.visibility = "hidden";
document.getElementById("rekl").style.marginTop = "-150px";

//Fiks for profiler med pimp min profil
document.getElementById("PMP_topp").style.marginTop = "15px";
