// ==UserScript==
// @name        Neopets Autobattler
// @namespace   http://userscripts.org/users/161304
// @description Automatically fights battledome enemies
// @include     http://www.neopets.com/dome/arena.phtml
// @version     1.0
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @grant       GM_log
// ==/UserScript==

// (Object one)[Column, Row](Object two)[Column, Row](Ability 1)[Column, Row](Ability 2)[Column, Row]
// Both start at 0. The leftmost column is 0, and the top row is 0. Rightmost column is 3, bottom row is 1
// Object one - Strongest weapon - multi use
// Object two - 2nd strongest weapon - Multi use
//Ability one - Lens flare or other once per battle - If none, just put static cling (or other constants) okay?
//Ability two - Multi use - eg. Static cling, or icicle or etc
var equipment = [3, 1, 1, 1, 1, 0, 2, 0];
var bomb = [2, 0];


//Max number of iterations
var max_iter = 30;

GM_setValue( "round", 0 );
GM_setValue( "bombed", 0 );
GM_setValue( "equipped", 0 );


var test = GM_getValue("count",100);
if ( test == 100)
{
GM_setValue("count", 0 );
GM_log("set value of count")
}


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

function equip2(col, row)
{
    document.getElementsByClassName("fsmid")[2].getElementsByClassName("ability")[col].getElementsByTagName("img")[row].click()
}	//getElementsByTagName("table")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].

function checkIfReady()
{
	
    if(document.getElementById("p1e2m").style["cursor"] == "auto")
    {

		if (GM_getValue("bombed") == 0)
		{
		GM_log("equip 1st weapon and bomb")
        sleep(300 + rand(-25, 300));
        document.getElementById("p1e1m").click();
        sleep(300 + rand(-25, 300));
        equip(equipment[0], equipment[1]);
        sleep(300 + rand(-25, 300));
        document.getElementById("p1e2m").click();
        sleep(300 + rand(-25, 300));
        //equip(equipment[2], equipment[3]);
		equip(bomb[0], bomb[1]);
        sleep(300 + rand(-25, 300));
		document.getElementById("p1am").click();
        sleep(300 + rand(-25, 300));
        equip2(equipment[6], equipment[7]);
        sleep(300 + rand(-25, 300));
		GM_setValue( "bombed", 1 );
		}
		
		fight();
    }
    else
    {
        setTimeout(function() { checkIfReady(); },500 + rand(-100, 100));
    }
}

function fight()
{
    var continueFighting = 1;
	
	if (GM_getValue("bombed") == 1 && GM_getValue("round") == 2)
	{
		GM_log("equip 2nd weapon")
		sleep(2000 + rand(-25, 300));
        document.getElementById("p1e2m").click();
        sleep(300 + rand(-25, 300));
		document.getElementById("p1e2m").click();
        equip(equipment[2], equipment[3]);
		sleep(300 + rand(-25, 300));
		document.getElementById("p1am").click();
        sleep(300 + rand(-25, 300));
		document.getElementById("p1am").click();
		sleep(300 + rand(-25, 300));
		equip2(equipment[4], equipment[5]);
		//equip(bomb[0], bomb[1]);
        sleep(300 + rand(-25, 300));
	}
	
    // Click the fight button if it is not greyed out (class "caction inactive")
    if(document.getElementById("fight").className != "caction inactive")
    {
        document.getElementById("fight").click();
		var rnd = GM_getValue("round");
		rnd = rnd + 1;
		GM_setValue("round",rnd);
		
		document.title = "count" + GM_getValue("count") + "round: " + GM_getValue("round");
		
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
			continueFighting = 0;
			GM_setValue( "equipped", 0 );
			GM_setValue( "bombed", 0 );
			var cou = GM_getValue("count");
			cou = cou + 1;
			GM_setValue("count",cou);
			
            setTimeout(function() { document.getElementsByClassName("end_ack collect")[0].click(); }, 200 + random);
            if ( GM_getValue( "count") < max_iter)
			{
			setTimeout(function() { document.getElementById("bdplayagain").click(); }, 700 + random + rand(-100, 500));
			GM_deleteValue( "equipped");
			GM_deleteValue( "bombed");
			GM_deleteValue( "round");
			}
			else
			{
			setTimeout(function() { document.getElementById("bdexit").click(); }, 700 + random + rand(-100, 500));
			GM_deleteValue( "count");
			GM_deleteValue( "equipped");
			GM_deleteValue( "bombed");
			GM_deleteValue( "round");
			}
			
            
        }
    }
    
    if(continueFighting == 1)
    {
        setTimeout(function() { fight(); }, 500 + rand(-200, 600));
    }
}
GM_log(GM_getValue("count"))
// create button
var btn = document.createElement( 'input' );
btn.onclick = function() { clear_variables() };
with( btn ) {
  setAttribute( 'value', 'Delete variables!' );
  setAttribute( 'type', 'button' );
}

// append at end
document.getElementsByTagName( 'body' )[ 0 ].appendChild( btn );

function clear_variables()
{
GM_deleteValue( "count");
GM_deleteValue( "equipped");
GM_deleteValue( "bombed");
GM_deleteValue( "round");

GM_log('variables all cleared')
}


if ( GM_getValue("count") < max_iter)
{

startBattle();
checkIfReady();
}

