// ==UserScript==
// @name           WK_reminder
// @namespace      SirDuck36
// @description    Don't forget those bonuses
// @include        http://*animecubed.com/billy/bvs/worldkaiju-fight*
// ==/UserScript==


bonustext = [
    "Scratchy Enhancer Bonus",  "Scratchy Enhancer Bonus",
    "Tiny Bear Pistols",        "Tiny Bear Pistols",
    "KaijuBomb Bonus",          "KaijuBombs (Juice)",
    "Field Practice Bonus",     "Field Practice (r00t)",
    "Reach Bonus",              "Reach (Mahjong)",
    "Ride Bonus",               "Pizzawitch Rides",
    "Elemental Mastery Bonus",  "WK Combo",
    "Season Collection Bonus",  "Show Watchin Bonus"
];


var missedbonus = [];

for (var i=0; i < bonustext.length; i+=2)
    if (document.body.innerHTML.indexOf(bonustext[i]) < 0)
	missedbonus.push(bonustext[i+1]);


if (missedbonus.length)
{
    missedbonus.push("");

    oldText = "-- Damage Bonuses --<br></font></b>";
    
    insertText = '<div style="color:black"><i><b>' +
	"Missing Bonuses:<br>" +
	missedbonus.join("<br>") +
	"<br></b></i></div>";
    
    newText = oldText + insertText;
    
    document.body.innerHTML = document.body.innerHTML.replace(oldText, newText);
}