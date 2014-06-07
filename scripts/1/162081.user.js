// ==UserScript==
// @name        Neopets Autofighter
// @namespace   http://userscripts.org/users/508085
// @description Automatically fights battledome enemies
// @include     http://www.neopets.com/dome/arena.phtml
// @version     1.0
// @grant none
// ==/UserScript==

// (Object one)[Column, Row](Object two)[Column, Row]
// Both start at 0. The leftmost column is 0, and the top row is 0. Rightmost column is 4, bottom row is 1
var equipment = [1, 1, 1, 0];

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

function equip(col, row)
{
    document.getElementsByClassName("fsmid")[0].getElementsByTagName("ul")[col].getElementsByTagName("li")[row].getElementsByTagName("img")[0].click()
}

function checkIfReady()
{
    if(document.getElementById("p1e1m").style["cursor"] == "auto")
    {
        // I know of no better way to find the elements, I would be very glad if someone pointed me in a better direction
        sleep(300 + rand(-25, 300));
        document.getElementById("p1e1m").click();
        sleep(300 + rand(-25, 300));
        equip(equipment[0], equipment[0]);
        sleep(300 + rand(-25, 300));
        document.getElementById("p1e2m").click();
        sleep(300 + rand(-25, 300));
        equip(equipment[0], equipment[1]);
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