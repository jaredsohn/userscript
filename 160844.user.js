// ==UserScript==
// @name        Neopets Autofighter
// @namespace   http://userscripts.org/users/508085
// @description Automatically fights battledome enemies
// @include     http://www.neopets.com/dome/arena.phtml
// @version     1.0
// @grant GM_log
// @require        http://userscripts.org/scripts/source/144996.user.js
// ==/UserScript==

// (Object one)[Column, Row](Object two)[Column, Row](Healing object)[Column, Row]
// The healing object will replace the object in the second slot when it is used.
// Both start at 0. The leftmost column is 0, and the top row is 0. Rightmost column is 4, bottom row is 1
var equipment = [2, 0, 1, 0, 3, 0];
// Change below to how many times the healing item can be used. Default of 1, because that is how most healing items act.
var healingItemUses = 1;
// When the pet loses this percent of total hp, it will use the healing item.
var healAtThisPercentMissing = 0.4;

var justHealed = 0;

// Start the battle
function startBattle()
{
    document.getElementById("start").click()
    if(document.getElementById("start") != null)
    {
        setTimeout(function() { startBattle(); }, 500 + rand(-100, 300));
    }
}

function rand(min, max)
{
    return Math.floor((Math.random() * max) + min);
}

// setTimeout is not applicable because it does not pause the script
// http://www.digimantra.com/tutorials/sleep-or-wait-function-in-javascript/
function sleep(ms)
{
	var dt = new Date();
	dt.setTime(dt.getTime() + ms);
	while (new Date().getTime() < dt.getTime());
}

function getHealthPercentMissing()
{
	// Return the percent of health missing
	var healthbar = document.getElementById("p1hgreen");
	return Math.abs(parseInt(healthbar.style.top)) / parseInt(healthbar.style.height); // Example return value: 0.31124124
}

function getHealthPercent()
{
	return 1.00 - getHealthPercentMissing();
}

function equip(slot, col, row)
{
    var boxID = "p1e" + slot + "m";
    sleep(300 + rand(-25, 300));
    document.getElementById(boxID).click();
    sleep(300 + rand(-25, 300));
    document.getElementsByClassName("fsmid")[0].getElementsByTagName("ul")[col].getElementsByTagName("li")[row].getElementsByTagName("img")[0].click()
}

function unequip(slot)
{
	var boxID = "p1e" + slot + "m";
    sleep(300 + rand(-25, 300));
    document.getElementById(boxID).click();
}

function checkIfReady()
{
    if(document.getElementById("p1e1m").style["cursor"] == "auto")
    {
        // I know of no better way to find the elements, I would be very glad if someone pointed me in a better direction
        equip("1", equipment[0], equipment[1]);
		/*if(healingItemUses > 0 && getHealthPercentMissing() >= healAtThisPercentMissing)
		{
			// Equip healing item
			// TODO: verify that it healed/worked
			equip("2", equipment[4], equipment[5]);
			healingItemUses--;
            justHealed = 1;
		}
		else
		{*/
			// Equip slot 2 item
			equip("2", equipment[2], equipment[3]);
		//}
        sleep(300 + rand(-25, 300));
        fight();
    }
    else
    {
        setTimeout(function() { checkIfReady(); }, 500 + rand(-100, 100));
    }
}

function fight()
{
    var continueFighting = 1;
    // Click the fight button if it is not greyed out (class "caction inactive")
    if(document.getElementById("fight").className != "caction inactive")
    {
        if(healingItemUses > 0 && getHealthPercentMissing() >= healAtThisPercentMissing)
		{
			// Equip healing item
			// TODO: verify that it healed/worked
            unequip("2");
			equip("2", equipment[4], equipment[5]);
			healingItemUses--;
            justHealed = 1;
            sleep(300 + rand(-25, 300));
		}
		else if(justHealed == 1)
		{
			// Re-equip both items
            // I do both because most of the time the used items get jumbled around
            unequip("1");
            unequip("2");
            equip("1", equipment[0], equipment[1]);
			equip("2", equipment[2], equipment[3]);
            justHealed = 0;
            sleep(300 + rand(-25, 300));
		}
        document.getElementById("fight").click();
    }
    else
    {
        // There could be a battle anim in process
        if(document.getElementById("skipreplay").className == "")
        {
            document.getElementById("skipreplay").click();
        }
        
        // See if the match has been won (Let's hope it wasn't the other way around)
        if(document.getElementsByClassName("end_ack collect").length > 0)
        {
            var random = rand(0, 1200);
            setTimeout(function() { document.getElementsByClassName("end_ack collect")[0].click(); }, 200 + random);
            setTimeout(function() { document.getElementById("bdplayagain").click(); }, 700 + random + rand(-100, 500));
            continueFighting = 0;
        }
    }
    
    if(continueFighting == 1)
    {
        setTimeout(function() { fight(); }, 500 + rand(-200, 600));
    }
}

startBattle();
checkIfReady();
