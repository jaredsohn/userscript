// ==UserScript==
// @name Icon Mod Golden Aura
// @namespace k-guare.com/
// @description Gives Icon Mods the golden aura they so rightfully deserve.
// @include http://*newgrounds.com/bbs/topic/*
// @include http://*.newgrounds.com/
// @include http://*.newgrounds.com/news/
// @include http://*.newgrounds.com/news/post/*
// ==/UserScript==

var modArray = new Array("14hourlunchbreak", "Afro-Ninja", "Alaska", "altr", "Aprime", "Archawn",
"Armour", "ArtDanVal", "Ashman", "Auz", "Bahamut", "Blounty", "Boss", "Captain-Ben", "Carmilla", "cast", "Coleco", "CommanderWalrus", "digital-musician", "Domo", "Donut",
"DumbassDude", "dx5231", "Egoraptor", "EJR", "EmmDubya", "ForNoReason", "Fro", "Goonie", "Havegum", "HeavyTank", "Heinrich", "IncendiaryProduction", "Ismael92",
"ItsRangasLife", "Joe", "Jolly", "K-Guare", "Keith", "Kevin", "Krinkels", "LDAF", "life", "Lizzardis", "Manly-Chicken", "Mollywop", "Narcissy",
"NegativeONE", "Oolaph", "PeterM", "psychicpebble", "Rabid-Animals", "RageVI", "reverend", "Saint-Jesus", "Sectus", "Sh0T-D0wN", "shunshuu", "simon", "Sir-Nuts", "speeling", "StalkerGuy", "TehSlapHappy", "TheLavaMuffin", "thenewbies",
"ThePigeonMaster", "TrevorW", "WeirdAlthe3rd", "Zachary");

function dotest() {
var allElements = document.getElementsByTagName("*");
var statsArray = new Array();
var onUserPage = false;
var userlevel;

var ilink;
var dindex;

if(isIconMod(linkToName(window.location.toString()
))) onUserPage = true;

for(i=0; i<allElements.length; i++) {
if(allElements[i].className == "userstats") statsArray.push(allElements[i]);
}

if(onUserPage) {
userlevel = document.getElementById("ulevel");
ilink = userlevel.style.backgroundImage;
dindex = ilink.length - 7;
if(ilink.charAt(ilink.length-2) != "'" && ilink.charAt(ilink.length-2) != '"') dindex++; // Chrome fix for not displaying quotes in url("")
userlevel.style.backgroundImage = ilink.substring(0,dindex) + "G" + ilink.substring(dindex + 1);
} else {
for(i=0; i<statsArray.length; i++) {
var anchorarray = statsArray[i].getElementsByTagName("a");
thename = linkToName(anchorarray[0].href);
if(!isIconMod(thename)) continue;

// If we're here, they're an approved Icon Mod.

var imgarray = statsArray[i].getElementsByTagName("img");
for(j=0; j<imgarray.length; j++) {

ilink = imgarray[j].src;
dindex = ilink.length - 5;
imgarray[j].src = ilink.substring(0,dindex) + "G" + ilink.substring(dindex + 1);
}
}
}
}

function linkToName(u) {
var endPos = 0;
name = u.slice(7);
for(l=0; l<name.length; l++) {
if(name.charAt(l) == ".") {
endPos = l;
break;
}
}
name = name.substring(0, endPos);
return name.toLowerCase();
}

function isIconMod(n) {
for(h=0; h<modArray.length; h++){
if(n == modArray[h].toLowerCase()) return true;
}
return false;
}

dotest();
