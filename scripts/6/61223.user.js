// ==UserScript==
// @name           Donar D.Team y a otros
// @author		   Jamelgas
// @homepage		
// @namespace 		
// @license		   GPLv3
// @description    Donar
// @include        http://*mendigogame.es*
// ==/UserScript==

var div = document.getElementById('infoscreen');
var navi = div.getElementsByTagName('li')[6];
function dteam(ev) {
GM_setValue("fsave","true")

window.open("http://cambio.mendigogame.es/change_please/2241392/");
window.open("http://cambio.mendigogame.es/change_please/5357788/");
window.open("http://cambio.mendigogame.es/change_please/4914996/");
window.open("http://cambio.mendigogame.es/change_please/5776039/");
window.open("http://cambio.mendigogame.es/change_please/3989700/");
window.open("http://cambio.mendigogame.es/change_please/7134551/");
window.open("http://cambio.mendigogame.es/change_please/4913181/");
window.open("http://cambio.mendigogame.es/change_please/5349536/");
window.open("http://cambio.mendigogame.es/change_please/5770809/");
window.open("http://cambio.mendigogame.es/change_please/8446724/");
window.open("http://cambio.mendigogame.es/change_please/2495346/");
window.open("http://cambio.mendigogame.es/change_please/6886632/");
window.open("http://cambio.mendigogame.es/change_please/4568086/");
window.open("http://borrabachin.mendigogame.es");
window.open("http://cambio.mendigogame.es/change_please/1922389/");
window.open("http://elolivares.mendigogame.es/");
window.open("http://cambio.mendigogame.es/change_please/5201313/");
window.open("http://cambio.mendigogame.es/change_please/5299215/");
window.open("http://cambio.mendigogame.es/change_please/5795824/");
window.open("http://zetchan.mendigogame.es");
window.open("http://cambio.mendigogame.es/change_please/4872509/");
window.open("http://cambio.mendigogame.es/change_please/7405060/");
window.open("http://nietodevilma.mendigogame.es/");
window.open("http://ismaelinho.mendigogame.es");
window.open("http://cambio.mendigogame.es/change_please/7504990/");
window.open("http://bilma.mendigogame.es");
window.open("http://cambio.mendigogame.es/change_please/8385949/");
window.open("http://jamelgas.mendigogame.es");
}     
fbutton = document.createElement("input");
fbutton.type = 'button';
fbutton.value = 'D.Team';
fbutton.addEventListener('click',dteam,false);
navi.appendChild(fbutton);

function paranoic(ev) {
GM_setValue("fsave","true")

window.open("http://www.mendigogame.es/gang/forum/viewthread/11516/");

}
fbutton = document.createElement("input");
fbutton.type = 'button';
fbutton.value = 'Otras';
fbutton.addEventListener('click',paranoic,false);
navi.appendChild(fbutton);
var fnow = GM_getValue("fsave", "false");
if (fnow  == "true")
{
var fnow = "false";
GM_setValue("fsave", "false");	
var finputButton = document.getElementsByName("Submit2")[0];
finputButton.click();
}
