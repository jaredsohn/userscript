// ==UserScript==
// @name        diablo 3 change item appearances
// @namespace   andydremeaux.com
// @include     http://us.battle.net/d3/en/item/*/*
// @version     1
// ==/UserScript==

GM_registerMenuCommand("Demon Hunter Male", dhm);
GM_registerMenuCommand("Demon Hunter Female", dhf);
GM_registerMenuCommand("Barbarian Male", bm);
GM_registerMenuCommand("Barbarian Female", bf);
GM_registerMenuCommand("Witch Doctor Male", wdm);
GM_registerMenuCommand("Witch Doctor Female", wdf);
GM_registerMenuCommand("Wizard Male", wm);
GM_registerMenuCommand("Wizard Female", wf);
GM_registerMenuCommand("Monk Male", mm);
GM_registerMenuCommand("Monk Female", mf);

var classes = ["demonhunter_male", "demonhunter_female",
	"barbarian_male", "barbarian_female",
	"witchdoctor_male", "witchdoctor_female",
	"wizard_male", "wizard_female",
	"monk_male", "monk_female"];
var classs = GM_getValue("class", classes[0]);
if (classs == classes[0]) return;
var images = document.getElementsByClassName("icon-item-inner");
for (var i = 0; i < images.length; i++) {
  if (images[i].style.backgroundImage.indexOf("demonhunter_male") !== -1) {
    images[i].style.backgroundImage = 
    	images[i].style.backgroundImage.replace("demonhunter_male", classs);
  }
}

function dhm() { GM_setValue("class", classes[0]); location.reload(true);}
function dhf() { GM_setValue("class", classes[1]); location.reload(true);}
function bm() { GM_setValue("class", classes[2]); location.reload(true);}
function bf() { GM_setValue("class", classes[3]); location.reload(true);}
function wdm() { GM_setValue("class", classes[4]); location.reload(true);}
function wdf() { GM_setValue("class", classes[5]); location.reload(true);}
function wm() { GM_setValue("class", classes[6]); location.reload(true);}
function wf() { GM_setValue("class", classes[7]); location.reload(true);}
function mm() { GM_setValue("class", classes[8]); location.reload(true);}
function mf() { GM_setValue("class", classes[9]); location.reload(true);}