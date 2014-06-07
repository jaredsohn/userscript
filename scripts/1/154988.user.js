// ==UserScript==
// @name           SDPS
// @namespace      http://playmage.com/
// @include        http://*playmage.com/*
// @include        https://*playmage.com/*
// @version 	   1.2
// ==/UserScript==

//Names for allies
var ALLY_NAMES = ["Elf","Val","Lilith","Eli","Huntress"];

var LOAD_DELAY = 500;

// Add jQuery
if(typeof(unsafeWindow)=='undefined') { unsafeWindow=window; }
if(typeof unsafeWindow.jQuery == 'undefined') {
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://code.jquery.com/jquery-latest.min.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);
}
// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

//Initialize our automation and active preferences based on previous instance of program.
var isActive;
isActive = GM_getValue( "isActive", true);

var idIntervals;
//Create menu commands to enable/disable script and automation
GM_registerMenuCommand("XDPS On/Off", toggleActive,"O");

//Function to toggle puzzle solver on/off
function toggleActive() 
{	isActive = !isActive;
	GM_setValue("isActive", isActive);
	if(isActive)
	{ $("#xswitch").attr("value", "XDPS On");
      idIntervals = setInterval(exploreRepeater, LOAD_DELAY/2);
	} else
	{	$("#xswitch").attr("value", "XDPS Off");
        if (idIntervals)
        {	clearInterval(idIntervals);
        }
	}
}

//Start processing the page
function letsJQuery() 
{	
	$(document).ready(function() { 
		$("#topbar").prepend('<div id="xec" position="absolute" zIndex="99" />');
		$("#xec").prepend('<input type="button" id="xswitch" value="XDPS Off"/>');
		if(isActive){ $("#xswitch").attr("value", "XDPS On"); }
		$("#xswitch").click(toggleActive);
		
		clearInterval(idIntervals);
		idIntervals = setInterval(exploreRepeater, LOAD_DELAY/2);
	});
}

//Main function, determines what type of adventure we have and does the appropriate action. 
function exploreRepeater() 
{	if (!isActive || document.getElementById("transdiv"))
    {   return;
    }
    	//Check if this is a combat that has already ended. 
	    if (!($("div.battlebox").text().indexOf("You received") > 0 || 
    		$("div.battlebox").text().indexOf("Guardian of Dreams resurrected you.") > 0))
    	{   //Code for adding buff/debuff icons.
			//We are entering a combat. Reset the combat variables.
			resetCombatVariables();
			
			//Add the class and ally change buttons to the battle screen. 
			if($("#autoatt"))
			{ 
				var str = "";
				str += '<span id="classbuttons">';
				str += '<img src="/img/en/dream/class/divine blade.jpg" width=20 height=20 onclick=showDiv("/dream/class?nc=swd6");setTimeout(closeDivSlide,250); >';
				str += '<img src="/img/en/dream/class/mega shot.jpg" width=20 height=20 onclick=showDiv("/dream/class?nc=gun6");setTimeout(closeDivSlide,250); >';
				str += '<img src="/img/en/dream/class/divine sage.jpg" width=20 height=20 onclick=showDiv("/dream/class?nc=mag6");setTimeout(closeDivSlide,250); >';
				str += '<img src="/img/en/dream/class/dragonlord.jpg" width=20 height=20 onclick=showDiv("/dream/class?nc=sgm2");setTimeout(closeDivSlide,250);>';
				str += '&nbsp;&nbsp;&nbsp;';
				for(var i=0;i<2;i++)
				{	str += '<img src="/img/en/dream/premium/201';
					str += i;
					str += '.jpg" width=20 height=20 onclick=showDiv("/dream/pets?use=201';
					str += i;
					str += '&name=';
					str += ALLY_NAMES[i+3];
					str += '");setTimeout(closeDivSlide,250);>';
				}
                for(var i=7;i<10;i++)
				{	str += '<img src="/img/en/dream/premium/200';
					str += i;
					str += '.jpg" width=20 height=20 onclick=showDiv("/dream/pets?use=200';
					str += i;
					str += '&name=';
					str += ALLY_NAMES[i-7];
					str += '");setTimeout(closeDivSlide,250);>';
				}	
              
				str += '</span>';
				$("#autoatt").prepend(str);
			}
	    	clearInterval(idIntervals);
			idIntervals = setInterval(combatRepeater, LOAD_DELAY/4);
		} else
		{
		}
		return false;
	
}

//Combat variables; tells us whether we have different buffs cast already
var weakenCount = 0;
var lastHP = 0;
//Arrays to hold values for current buff status
var currentBuffStatus = [false,false,false,false,false,false,false];
var numCombatBuffs = 4;
var BUFF_NAMES_ARRAY = ["Banish Dance","Big Bang", "Divine Light", "Call Bunnies", "You feel more protected.", "Your chance of parrying increased.", "You aim has become better."];
var BUFF_IMAGE_ARRAY = ["Banish%20Dance.gif", "Big%20Bang.gif", "Divine%20Light.gif", "Call%20Bunnies.gif", "Shield.gif", "Guard.gif", "Aim.gif"];
//Function to reset our buffs to false.
function resetCombatVariables()
{	for(var i=0;i < currentBuffStatus.length;i++)
	{	currentBuffStatus[i] = false;
	}
	weakenCount = 0;
	lastHP = 0;
}

//Returns true if the sign given is an Encounter. 
function isEncounterSign(areasign)
{	if(areasign && 
		(areasign.indexOf("Encounter")> 0 || 
    	areasign.indexOf("Boss") > 0 || 
    	areasign.indexOf("Demon") > 0 || 
    	areasign.indexOf("Fallen") > 0 ||
        areasign.indexOf("Poseidon") > 0 ||
    	areasign.indexOf("Arena") > 0)
    	)
    {	return true;
	}
	return false;
}

//Repeater for combat. Displays buffs, tracks stats on combat.
function combatRepeater()
{	var battleStatus = $("#battlestatustd").text();
	if(battleStatus)
	{	var reBuffSpell = new RegExp("You([^,\\d]+)\\.");
		var reCharDmg = new RegExp("You (critically )?hit ((\\w+)(\\s\\w+){0,2}) (with\\s((\\w+)(\\s\\w+)?))?\\sfor (\\d+) damage points");
		var reAllyDmg = new RegExp("((\\w+)(\\s\\w+){0,2}) hit ((\\w+)(\\s\\w+){0,2}) with weaken for (\\d+) damage points");
		//You (critically )?hit ((\\w+)\\s?(\\w+)?\\s?(\\w+)?) (with )?((\\w+)\\s?(\\w+)?\\s?)?for (\\d+) damage points
	
		var bSpellMatch = reBuffSpell.exec(battleStatus); //Matches if Guard, SHield or Aim are cast
		var cDmgMatch = reCharDmg.exec(battleStatus); //Matces if the player did damage with an ability
		var aDmgMatch = reAllyDmg.exec(battleStatus); //Matches if the player's ally did damage with *weaken* only.
		var cSpellIndex = 6;
        var tmp;
        var out = false;
        if($("#buffspan") && $("#buffspan").html())
	    {	for(var i=0;i<currentBuffStatus.length;i++)
		    {	if(bSpellMatch && i>=numCombatBuffs)
	    		{	if(bSpellMatch[0].trim() == BUFF_NAMES_ARRAY[i].trim() && currentBuffStatus[i] == false)
				    {	out = true;
		        	}
		        } else if(cDmgMatch && cDmgMatch[cSpellIndex] && i < numCombatBuffs)
	        	{	if(cDmgMatch[cSpellIndex].trim() == BUFF_NAMES_ARRAY[i] && currentBuffStatus[i] == false)
		        	{	out = true;
		        	}
	        	}
	        	if(out)
	        	{	tmp = $("<img />").attr('src','/img/en/dream/skills/' + BUFF_IMAGE_ARRAY[i]).attr('width','20').attr('height','20');
			        currentBuffStatus[i] = true;
			        $("#buffspan").append(tmp);
		        }
		        out = false;
			}
			if(aDmgMatch)
			{	
				//If we are on the same attack, the lastHP will be equal to the current HP, so we will skip adding a weaken debuff. 
				if(weakenCount < 3 && lastHP != parseInt($("#mobhp").text()))
				{	tmp = $("<img />").attr('src','/img/en/dream/pets/Elf%20Princess.jpg').attr('width','20').attr('height','20');
					$("#buffspan").prepend(tmp);
					weakenCount++;
				}
				
				if($("#mobhp").text())
				{	
					lastHP = parseInt($("#mobhp").text());
				}
			}
		} else
		{	tmp = "<span id=\"buffspan\" zIndex=\"99\">&nbsp;</span>";
	        $("#mobbox > div.t > div.b > div.l > div.r > div.bl > div.br > div.tl > div.tr > div.in").after(tmp);
	        
    	}
	}
	if($("div.battlebox").text().indexOf("You received") > 0 || 
		$("div.battlebox").text().indexOf("You were knocked into oblivion") > 0 || 
			!isEncounterSign($("td.areasign").html())
    	 	)
	{	clearInterval(idIntervals);
		idIntervals = setInterval(exploreRepeater, LOAD_DELAY/2);
	}
}