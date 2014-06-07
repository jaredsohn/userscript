// ==UserScript==
// @name           XDPS
// @namespace      http://playmage.com/
// @include        http://*playmage.com/*
// @include        https://*playmage.com/*
// ==/UserScript==

//Constants used for determining adventure type.
var NULL_ADVENTURE = -1;
var OPEN_BOX_OR_CHEST = 0;
var GREEN_BUTTON_BOX = 1;	// 1 = Green Button Puzzle Box
var COLOUR_BUTTON_BOX = 2;	// 2 = Colour Puzzle Box
var TREASURE_CHEST = 3;		// 3 = Treasure Chest
var BEGGAR_WELL = 4;		// 4 = Wishing Well or Beggar

//HP Values are the cost of an HP Potion at level (index)
var HP_VALUES_ARRAY = [10,20,30,40,50,72,98,128,162,200,240,288,345,414,496,595,714,856,1027,1232,1453,1714,2022,2385,2814,3320,3917,4622,5453,6434,7592,8958,10570,12472,14716,17364,20489,24177,28528,33663,39049,45296,52543,60949,70700,82012,95133,110354,123596,138427,155038,173642,194479,217816,243953,273227,306014,342735,383863,429926,481517,539299,604014,676495,757674,848594,950425,1064476,1192213,1335278,1495511,1674972,1875968,2101084,2353214,2635599,2951870,3306094,3702825,4147164,4644823,5202201,5826465,6525640,7308716,8185761,9168052,-1,-1]
//Guesses array represents solutions where 0 = red, 1 = green, 2 = blue, 3= yellow
var POSSIBLE_GUESSES_ARRAY = ["0000","0001","0002","0003","0010","0011","0012","0013","0020","0021","0022","0023","0030","0031","0032","0033","0100","0101","0102","0103","0110","0111","0112","0113","0120","0121","0122","0123","0130","0131","0132","0133","0200","0201","0202","0203","0210","0211","0212","0213","0220","0221","0222","0223","0230","0231","0232","0233","0300","0301","0302","0303","0310","0311","0312","0313","0320","0321","0322","0323","0330","0331","0332","0333","1000","1001","1002","1003","1010","1011","1012","1013","1020","1021","1022","1023","1030","1031","1032","1033","1100","1101","1102","1103","1110","1111","1112","1113","1120","1121","1122","1123","1130","1131","1132","1133","1200","1201","1202","1203","1210","1211","1212","1213","1220","1221","1222","1223","1230","1231","1232","1233","1300","1301","1302","1303","1310","1311","1312","1313","1320","1321","1322","1323","1330","1331","1332","1333","2000","2001","2002","2003","2010","2011","2012","2013","2020","2021","2022","2023","2030","2031","2032","2033","2100","2101","2102","2103","2110","2111","2112","2113","2120","2121","2122","2123","2130","2131","2132","2133","2200","2201","2202","2203","2210","2211","2212","2213","2220","2221","2222","2223","2230","2231","2232","2233","2300","2301","2302","2303","2310","2311","2312","2313","2320","2321","2322","2323","2330","2331","2332","2333","3000","3001","3002","3003","3010","3011","3012","3013","3020","3021","3022","3023","3030","3031","3032","3033","3100","3101","3102","3103","3110","3111","3112","3113","3120","3121","3122","3123","3130","3131","3132","3133","3200","3201","3202","3203","3210","3211","3212","3213","3220","3221","3222","3223","3230","3231","3232","3233","3300","3301","3302","3303","3310","3311","3312","3313","3320","3321","3322","3323","3330","3331","3332","3333"];
//Names for allies
var ALLY_NAMES = ["Demon%20Wings","Alien%20Lord","Elf%20Princess","Valkyrie","Lilith"];

var LOAD_DELAY = 500;
var DEBUG_MAX_CHARS = 60;

//constants for button images
var GREEN = "lg";
var RED = "lr";
var BLUE = "lb";
var YELLOW = "ly";
var DARK_BLUE = "db";
//Function to get the HTML to display a button given a button colour and size.
function getButtonHTML(colour, size)
{	var tmp = "<img src=\"/img/en/dream/dungeon/";
	tmp +=  colour;
	tmp += "_button.gif\" width=\"";
	tmp += size;
	tmp += "\" height=\"";
	tmp += size;
	tmp += "\">";
	return tmp;
}

//Constants for debugging
var DEBUG_GENERAL = 0; 
var DEBUG_COMBAT = 1;
var DEBUG_VERBOSE = 2;
var DEBUG_PUZZLE_BOX = 3;
var DEBUG_GREEN_BUTTON_BOX = 4;
var DEBUG_COLOUR_BUTTON_BOX = 5;
var debug = new Array();
debug[DEBUG_GENERAL] = false;
debug[DEBUG_COMBAT] = false;
debug[DEBUG_VERBOSE] = false;
debug[DEBUG_PUZZLE_BOX] = false;
debug[DEBUG_GREEN_BUTTON_BOX] = false;
debug[DEBUG_COLOUR_BUTTON_BOX] = false;
//Function to toggle debugging information from being displayed.
function toggleDebug() 
{	debug = !debug;
	clearInterval(idIntervals);
	setInterval(exploreRepeater, LOAD_DELAY/2);
}
//Simple debug function. Outputs text, but if the length is getting long, clears the box and re-adds buttons to it.
function debugOut(text, debugType)
{	if($("#xdebug").text().length > DEBUG_MAX_CHARS)
	{	$("#xdebug").text("");
	}
	if(debug[debugType])
	{	$("#xdebug").append(text);
	}
}

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
//var automatePlay;
var displayBuffs;
displayBuffs = GM_getValue( "displayBuffs", true);
isActive = GM_getValue( "isActive", true);
automatePlay = GM_getValue( "automatePlay", false);

var automationWarning = false;
var idIntervals;
//Create menu commands to enable/disable script and automation
GM_registerMenuCommand("XDPS On/Off", toggleActive,"O");
GM_registerMenuCommand("XDPS Automation", toggleAutomated,"A");
GM_registerMenuCommand("XDPS Debug", toggleDebug,"D");
GM_registerMenuCommand("XDPS Display Buffs", toggleDisplayBuffs,"D");


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
//Function to toggle Automation
function toggleAutomated() 
{	automatePlay = !automatePlay;
	GM_setValue("automatePlay", automatePlay);
	if(automatePlay)
	{	if(!automationWarning)
	    {	alert("Warning: Using this puzzle solver in automated mode may be construed as a violation of the TOS; the writer of this program assumes no liability for any repercussions of using this program.");
			automationWarning = true;
		}
	}
}
//Function to toggle Buff Display functionality
function toggleDisplayBuffs() 
{	displayBuffs = !displayBuffs;
	GM_setValue("displayBuffs", displayBuffs);
	if(displayBuffs)
	{	$("#xbuff").attr("value", "XBuff On");
	} else
	{ $("#xbuff").attr("value", "XBuff Off");
	}
}


//Start processing the page
function letsJQuery() 
{	
	$(document).ready(function() { 
		$("#topbar").prepend('<div id="xec" position="absolute" zIndex="99" />');
		$("#xec").prepend('<input type="button" id="xbuff" value="XBuff Off"/>');
		$("#xec").prepend('<input type="button" id="xswitch" value="XDPS Off"/>');
		if(isActive){ $("#xswitch").attr("value", "XDPS On"); }
		if(displayBuffs) { $("#xbuff").attr("value", "XBuff On"); }
		$("#xec").prepend('<span id="xdebug" />'); //Append a div for our debug output.
		$("#xswitch").click(toggleActive);
		$("#xauto").click(toggleAutomated);
		$("#xbuff").click(toggleDisplayBuffs);
		
		//Assign the inputAmount function immediately for future use with the beggar/well buttons.
		window.inputAmount = inputAmount;
		
		debugOut("JQ->",DEBUG_GENERAL);
		clearInterval(idIntervals);
		idIntervals = setInterval(exploreRepeater, LOAD_DELAY/2);
	});
}


//Function to determine what type adventure is being processed.
function adventureType(mobname, actionResult)
{	if(actionResult == null || mobname == null)
	{	debugOut("AT:" + NULL_ADVENTURE,DEBUG_GENERAL);
		return NULL_ADVENTURE;
	} else if (actionResult.indexOf("Inside you find:") > 0)
	{	debugOut("AT:" + OPEN_BOX_OR_CHEST,DEBUG_GENERAL);
		return OPEN_BOX_OR_CHEST;
	}
	
	if(mobname  == "A Puzzle Box")
	{	if(actionResult.indexOf("and can be opened when all 4 correct buttons are pressed") >= 0)
        {	debugOut("AT:" + GREEN_BUTTON_BOX,DEBUG_GENERAL);
	        return GREEN_BUTTON_BOX;
		} else if(actionResult.indexOf("electronically, and opens when the correct sequence of colors") >= 0)
		{	debugOut("AT:" + COLOUR_BUTTON_BOX,DEBUG_GENERAL);
			return COLOUR_BUTTON_BOX;
		}
	} else if(mobname == "A Treasure Chest")
	{	debugOut("AT:" + TREASURE_CHEST,DEBUG_GENERAL);
		return TREASURE_CHEST;
	} else if(mobname == "Wishing Well" || mobname == "A Beggar")
	{	debugOut("AT:" + BEGGAR_WELL,DEBUG_GENERAL);
		return BEGGAR_WELL;
	}
	return 0;
}
//Returns true if the sign given is an Encounter. 
function isEncounterSign(areasign)
{	if(areasign && 
		(areasign.indexOf("Encounter")> 0 || 
    	areasign.indexOf("Boss") > 0 || 
    	areasign.indexOf("Demon") > 0)
    	)
    {	return true;
	}
	return false;
}

//Main function, determines what type of adventure we have and does the appropriate action. 
function exploreRepeater() 
{	if (!isActive || document.getElementById("transdiv"))
    {   return;
    }
	var areaSign = $("td.areasign").html();
	//If this is not an encounter, figure out what it actually is and process. 
	if (!isEncounterSign(areaSign))
    {	debugOut("nC",DEBUG_GENERAL);
    	var boxType = adventureType($("span.mobname").html(), $("#actionresulttd").html());
		if(boxType == GREEN_BUTTON_BOX)
		{	solveGreenBoxes();
		} else if(boxType == COLOUR_BUTTON_BOX)
		{	solveColourBoxes();
		} else if(boxType == TREASURE_CHEST)
        {	clearInterval(idIntervals);
			idIntervals = setInterval(chestRepeater, LOAD_DELAY);
        } else if(boxType == BEGGAR_WELL && 
        			$("#amount").length > 0 && 
        			$("#btHighValue").length == 0 
        		)
        {	beggarWellHelper();
        }
    } else //If it *is* an encounter, begin encounter processing. 
    {	//Check if this is a combat that has already ended. 
	    if(displayBuffs && !($("div.battlebox").text().indexOf("You received") > 0 || 
    		$("div.battlebox").text().indexOf("Guardian of Dreams resurrected you.") > 0))
    	{   //Code for adding buff/debuff icons.
			//We are entering a combat. Reset the combat variables.
			resetCombatVariables();
			
			//Add the class and ally change buttons to the battle screen. 
			if($("#autoatt"))
			{
				var str = "";
				str += '<span id="classbuttons">';
				str += '<img src="/img/en/dream/class/devil slayer.jpg" width=20 height=20 onclick=showDiv("/dream/class?nc=swd5");setTimeout(closeDivSlide,250); >';
				str += '<img src="/img/en/dream/class/big shot.jpg" width=20 height=20 onclick=showDiv("/dream/class?nc=gun5");setTimeout(closeDivSlide,250); >';
				str += '<img src="/img/en/dream/class/divine staff.jpg" width=20 height=20 onclick=showDiv("/dream/class?nc=mag5");setTimeout(closeDivSlide,250); >';
				str += '<img src="/img/en/dream/class/jester.jpg" width=20 height=20 onclick=showDiv("/dream/class?nc=sgm");setTimeout(closeDivSlide,250);>';
				str += '&nbsp;&nbsp;&nbsp;';
				for(var i=5;i<10;i++)
				{	str += '<img src="/img/en/dream/premium/200';
					str += i;
					str += '.jpg" width=20 height=20 onclick=showDiv("/dream/pets?use=200';
					str += i;
					str += '&name=';
					str += ALLY_NAMES[i-5];
					str += '");setTimeout(closeDivSlide,250);>';
				}	
				str += '</span>';
				$("#autoatt").prepend(str);
			}
			debugOut("C",DEBUG_GENERAL);
	    	clearInterval(idIntervals);
			idIntervals = setInterval(combatRepeater, LOAD_DELAY/4);
		} else
		{
		}
	}
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
			{	debugOut("w: ",DEBUG_VERBOSE);
				debugOut(weakenCount,DEBUG_VERBOSE);
				//If we are on the same attack, the lastHP will be equal to the current HP, so we will skip adding a weaken debuff. 
				if(weakenCount < 3 && lastHP != parseInt($("#mobhp").text()))
				{	tmp = $("<img />").attr('src','/img/en/dream/pets/Elf%20Princess.jpg').attr('width','20').attr('height','20');
					$("#buffspan").prepend(tmp);
					weakenCount++;
				}
				
				if($("#mobhp").text())
				{	debugOut("h:",DEBUG_VERBOSE); 
					debugOut(parseInt($("#mobhp").text()),DEBUG_VERBOSE);
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

//Function to add buttons for quick well values entry.
//This does not neet to reset the interval function since this code only needs to run once per beggar/well 
function beggarWellHelper() {
	document.getElementById('amount').disabled=false;
	$("#amount").after(getButtonString($("span.mobname")));
	$("#btExtraHighValue").click(function() {
	    inputAmount(6);
	});
	$("#btHighValue").click(function() {
	    inputAmount(4);
	});
	$("#btLowValue").click(function() {
	    inputAmount(2);
	});
	$("#btExtraLowValue").click(function() {
	    inputAmount(3);
	});
	$("#btOneBillion").click(function() {
	    inputAmount(1000000000);
	});
}
//Function that returns a string of HTML for new buttons to add to the page based on 
//whether this is a well or a beggar encounter.
function  getButtonString(mobname)
{	var commonString = '<br/><input type="button" id="btExtraHighValue" value="+H" onclick="inputAmount(6)"/><input type="button" id="btHighValue" value="High" onclick="inputAmount(4)"/><input type="button" id="btLowValue" value="Low" onclick="inputAmount(2)"/><input type="button" id="btExtraLowValue" value="+L" onclick="inputAmount(3)"/>';
	var wellString = '<br /><input type="button" id="btOneBillion" value="One Billion" onclick="inputAmount(1000000000)"/>&nbsp;<a href="#" title="Click \'High\' and the Well will give you Energy/Money/Skill Points.\n Click \'Low\' and the Well will give you Energy/Money.';
	var beggarString = '&nbsp;<a href="#" title="Click \'High\' and the Beggar will give you an Item.\n Click \'Low\' and the Beggar will give you Energy.';
	var commonEndString = ' On Bonus Days use +H or +L instead of High/Low.">?</a><br/>';
	if (mobname.html() == "Wishing Well")
	{	return commonString + wellString + commonEndString;
	}
	return commonString + beggarString + commonEndString;
}


//Assigns the appropriate value to the input field based on the multiplier given
//and the player's level. Alerts the user if there was an error, or if they do not have enough coins.
function inputAmount(multiplier) 
{	var curLevel = $("#curlevel").html();
	var curCoins = $("#curcoins").html().replace(/[,\.]/g,"");
    var amount = (multiplier*(HP_VALUES_ARRAY[parseInt(curLevel)-1])+1);
	
    if (HP_VALUES_ARRAY[parseInt(curLevel)-1] >= 0)
    {	if (multiplier > 6) { amount = 1000000000; }
        if (parseInt(curCoins) >= amount)
        { 	$("#amount").val(amount);
        	if(automatePlay)
        	{  	if ($("span.mobname").html() == "Wishing Well")
                {	location.href = "javascript:(" + encodeURI( function() {
                        loadDiv2('/dream/explore?action=well');
                    }) + ")()";
                } else 
                {	location.href = "javascript:(" + encodeURI( function() {
                        loadDiv2('/dream/explore?action=beggar');
                    }) + ")()";
                }
            }
        } else {
            alert("You don't have enough coins for this action. You need at least " + amount + " coins.");
        }
    } else {
        alert("Sorry, your level isn't registered in this script, please update it or contact the author.")
    }
}
//Function to solve chests.
function chestRepeater() 
{	if(adventureType($("span.mobname").html(),$("#actionresulttd").html()) == TREASURE_CHEST)
	{	if(automatePlay){
			location.href = "javascript:(" + encodeURI( function() {
			    $("div.btn100").each(function(indice) {
			        if ($(this).html() == "Open")
			        {   $(this).click();
			            return false;
			        }
			    });
			}) + ")()";
		}
	}
	if ($("#mobbox > div > table > tbody > tr:last > td").length > 0)
    {	//Age box Type 1: 
        var reExample = new RegExp("My current age is (\\d+), how young will I be in (\\d+) years\\?");
        var match = reExample.exec($("#mobbox > div > table > tbody > tr:first > td").html());
        if (match)
        {	$("#answer").val(parseInt(match[1]) + parseInt(match[2]));
        } 
		//Age box Type 2: 
        reExample = new RegExp("My age will be (\\d+) in (\\d+) years\\. How young am I now\\?");
        match = reExample.exec($("#mobbox > div > table > tbody > tr:first > td").html());
        if (match)
        { 	$("#answer").val(parseInt(parseInt(match[1])-parseInt(match[2])));
        } 
        //Barrels Box. 
        reExample = new RegExp("I have (\\d+) gallons of \\w+\\.  How many (\\d+) gallon containers can I fully fill\\?");
        match = reExample.exec($("#mobbox > div > table > tbody > tr:first > td").html());
        if (match)
        {	$("#answer").val(parseInt(parseInt(match[1])/parseInt(match[2])));
        } 

        //Farm Box. 
       	reExample = new RegExp("On a farm there are ([\\w-]+) and ([\\w-]+)\\. There are total of (\\d+) heads and (\\d+) legs.  How many ([\\w-]+) are on the farm?");
        match = reExample.exec($("#mobbox > div > table > tbody > tr:first > td").html());
        if (match)
        {	var i = 0;
			var legsArray = [0,0];
			var answerArray = [0,0];
	        if (match[1] == "chickens" || match[2] == "chickens")
			{	legsArray[i] = 2;
				i++;
			}
			if (match[1] == "three-legged-cows" || match[2] == "three-legged-cows")
			{	legsArray[i] = 3;
				i++;
			}
			if (match[1] == "horses" || match[2] == "horses")
			{	legsArray[i] = 4;
			}
			var differenceInLegs = legsArray[1] - legsArray[0]; 
			//answerArray[0] = number of animals if we are looking for #animals with legsArray[0] legs
			answerArray[0] = (parseInt(match[3])*legsArray[1] - parseInt(match[4]))/differenceInLegs; 
			//answerArray[1] = number of animals if we are looking for #animals with legsArray[1] legs
			answerArray[1] = (parseInt(match[4]) - (parseInt(match[3])*legsArray[0]))/differenceInLegs;
			
			if (match[5] == "chickens")
			{	//If we are looking for Chickens then the answer will always in answerArray[0]
				$("#answer").val(answerArray[0]);
			} else if (match[5] == "three-legged-cows")
			{	//If we are looking for Cows then the answer will vary whether it is in answerArray[0] or answerArray[1]
				if (legsArray[0] == 3)
				{	$("#answer").val(answerArray[0]);
				} else 
				{	$("#answer").val(answerArray[1]);
				}
			} else if (match[5] == "horses")
			{	//If we are looking for Horses then the answer will always in answerArray[1]
				$("#answer").val(answerArray[1]);
			}
        }
    	if(automatePlay){ $("#actionbuttonimg1").click(); }
	    clearInterval(idIntervals);
        idIntervals = setInterval(exploreRepeater, LOAD_DELAY/2);
    }
}

//Function to solve the color button Puzzle
//Solves puzzle by making rggr, bbrr, yygr, gbby guesses and then passing C/P values to the mastermindSolver routine. 
function solveColourBoxes() 
{	if(automatePlay)
	{	if(adventureType($("span.mobname").html(),$("#actionresulttd").html()) == COLOUR_BUTTON_BOX)
		{	location.href = "javascript:(" + encodeURI( function() {
			    $("div.btn100").each(function(indice) {
			        if ($(this).text().trim() == "Open")
			        {	$(this).click();
			            return false;
			        }
			    });
			}) + ")()";
		}
	} else 
	{ 	//Instruct player to make rggr, bbrr, yygr and gbby guesses
		var instructString = "";
		instructString += "<div id=\"instr\">Guess: ";
		//Image string for RGGR guess
		instructString += getButtonHTML(RED, 15);
		instructString += getButtonHTML(GREEN, 15);
		instructString += getButtonHTML(GREEN, 15);
		instructString += getButtonHTML(RED, 15);
		instructString += ",&nbsp;";
		//Image string for BBRR guess
		instructString += getButtonHTML(BLUE, 15);
		instructString += getButtonHTML(BLUE, 15);
		instructString += getButtonHTML(RED, 15);
		instructString += getButtonHTML(RED, 15);
		instructString += ",&nbsp;";
		//Image string for YYGR guess
		instructString += getButtonHTML(YELLOW, 15);
		instructString += getButtonHTML(YELLOW, 15);; 
		instructString += getButtonHTML(GREEN, 15);
		instructString += getButtonHTML(RED, 15);
		instructString += ",&nbsp;";
		//Image string for GBBY guess
		instructString += getButtonHTML(GREEN, 15);
		instructString += getButtonHTML(BLUE, 15);
		instructString += getButtonHTML(BLUE, 15);
		instructString += getButtonHTML(YELLOW, 15);;
		instructString += "</div>";
		if(($("#instr") && $("#instr").html()))
		{ // do nothing
		}else
		{	$("div#resl").append(instructString);
		}
	}
	clearInterval(idIntervals);
	idIntervals = setInterval(mastermindRepeater,LOAD_DELAY);
}

//Mastermind helper. Checks 
var puzzleGuessUpdates = ["-gg-", "bbr-", "yyg-", "gbby"];
function mastermindRepeater() 
{	var valuesArray = new Array();
	if(adventureType($("span.mobname").html(),$("#actionresulttd").html()) == COLOUR_BUTTON_BOX)
	{
		if($("#mobbox > div > table > tbody > tr:first > td").html().indexOf("Number of columns with the correct color") >= 0)
		{	
// 			if(automatePlay) 
// 			{	if($("div#resl > input").length == 0 || $("div#resl > input").length == 2 || $("div#resl > input").length == 4 || $("div#resl > input").length == 6)
// 				{	location.href = "javascript:(" + encodeURI( function() {
// 						for(var i=0;i<4;i++)
// 						{	if(puzzleGuessUpdates[$("div#resl > input").length/2].charAt(i) != '-')
// 							{	updatePuzzle(puzzleGuessUpdates[$("div#resl > input").length/2].charAt(i),i);
// 							}
// 						}
// 						$("div#actionbuttonimg1").click();
// 					}) + ")()";
// 				}
// 			}
			if(automatePlay)
			{	//Make rggr guess (default is r, so set 1,2 = g and make guess)
				if ($("div#resl > input").length == 0)
				{	location.href = "javascript:(" + encodeURI( function() {
						updatePuzzle('g','1');
						updatePuzzle('g','2');
						$("div#actionbuttonimg1").click();
					}) + ")()";
				}
				//Make bbrr guess (previous guess is rggr, so we need to set bbr)
				if ($("div#resl > input").length == 2)
				{	location.href = "javascript:(" + encodeURI( function() {
						updatePuzzle('b','0');
						updatePuzzle('b','1');
						updatePuzzle('r','2');
						$("div#actionbuttonimg1").click();
					}) + ")()";
				}
				//Make yygr guess (previous guess is bbrr, so we need to set yyg)
				if ($("div#resl > input").length == 4)
				{	location.href = "javascript:(" + encodeURI( function() {
						updatePuzzle('y','0');
						updatePuzzle('y','1');
						updatePuzzle('g','2');
						$("div#actionbuttonimg1").click();
					}) + ")()";
				}
				//Make gbby guess (previous guess is yygr, so we need to set gbby)
				if ($("div#resl > input").length == 6)
				{	location.href = "javascript:(" + encodeURI( function() {
						updatePuzzle('g','0');
						updatePuzzle('b','1');
						updatePuzzle('b','2');
						updatePuzzle('y','3');
						$("div#actionbuttonimg1").click();
					}) + ")()";
				}
			}
			if ($("div#resl > input").length == 8)
			{	for(var i=0;i<8;i++)
				{	valuesArray[i] = $("div#resl > input:eq(" + i +")").val();
 				}
				mastermindSolver(valuesArray);
				clearInterval(idIntervals);
		        idIntervals = setInterval(exploreRepeater, LOAD_DELAY/2);
			}
		}
	} else
	{	clearInterval(idIntervals);
        idIntervals = setInterval(exploreRepeater, LOAD_DELAY/2);
    }
}
//Function to solve Mastermind puzzle. (color puzzle box)
//Pre: valuesArray[]  == an array containing the C/P values for rggr, bbrr, yygr, gbby guesses
function mastermindSolver(valuesArray) {
	//c1-c4 are the number of correct colors in correct positions in each guess
	c1 = parseInt(valuesArray[0]); //# correct in rggr guess
	c2 = parseInt(valuesArray[2]); //# correct in bbrr guess
	c3 = parseInt(valuesArray[4]); //# correct in yygr guess
	c4 = parseInt(valuesArray[6]); //# correct in gbby guess
	var cArray = [c1,c2,c3,c4];
	
	//t1-t4 are the total number of correct **colors** in each guess 
	t1 = c1 + parseInt(valuesArray[1]); //Total # in rggr guess
	t2 = c2 + parseInt(valuesArray[3]); //Total # in bbrr guess
	t3 = c3 + parseInt(valuesArray[5]); //Total # in yygr guess
	t4 = c4 + parseInt(valuesArray[7]); //Total # in gbby guess 
	var tArray = [t1,t2,t3,t4];

	var answersArray = new Array();
	var i = 0;
	
	for(i=0; i < POSSIBLE_GUESSES_ARRAY.length; i++)
	{	if(isValidTGuess(tArray,POSSIBLE_GUESSES_ARRAY[i]) && isValidCGuess(cArray,POSSIBLE_GUESSES_ARRAY[i]))
		{	answersArray.push(POSSIBLE_GUESSES_ARRAY[i]);
		}
	}
	if(answersArray.length==1)
	{	var cmd = "";
		var ansString = "";
 		ansString += "<div id=\"xans\">Answer:";
		for(var i = 0; i < 4; i++)
		{	if(answersArray[0].charAt(i) == 0)
			{	cmd += 'updatePuzzle("r","' + i + '"); ';
				ansString += getButtonHTML(RED, 20);
			}else if(answersArray[0].charAt(i) == 1)
			{	cmd += 'updatePuzzle("g","' + i + '"); ';
				ansString += getButtonHTML(GREEN, 20);
			}else if(answersArray[0].charAt(i) == 2)
			{	cmd += 'updatePuzzle("b","' + i + '"); ';
				ansString += getButtonHTML(BLUE, 20);
			}else if(answersArray[0].charAt(i) == 3)
			{	cmd += 'updatePuzzle("y","' + i + '"); ';
				ansString += getButtonHTML(YELLOW, 20);
			}
		}
        ansString += "</div>";
	    if($("#xans") && $("#xans").html())
	    {	//Do Nothing. Answers are already displayed.	
    	} else 
    	{	$("div#resl").prepend(ansString);
		}
	    
        if(automatePlay)
        {	eval('location.href = "javascript:(" + encodeURI( function() {' + cmd + '$("div#actionbuttonimg1").click();}) + ")()";');
        }
	}
	else if(answersArray.length==0)
		alert("Invalid Entry.  Please double check inputs and use guild-forums.com");
	else
	{	alert("You found a bug in the solver.  Multiple answers dected, displaying all of them.");
		alert(uneval(answersArray));
	}
}
//Helper function for solving mastermind puzzles. 
//Pre: tArray = the total number of correct **colors** for each guess (t[0] = rggr guess, t[1] = rrbb guess, etc)
//		guess = the guess we are testing
//Post: returns true if guess is a possible solution, false otherwise. 
function isValidTGuess(tArray, aGuess)
{	var nRed = 0;
	var nGreen = 0;
	var nBlue = 0;
	var nYellow = 0;
	var i = 0;
	//Figure out how many of each color are in the guess we are testing
	for(i=0; i <=3; i++)
	{	if(aGuess.charAt(i) == 0) 
			nRed++;
		else if(aGuess.charAt(i) == 1)
			nGreen++;
		else if(aGuess.charAt(i) == 2)
			nBlue++;
		else if(aGuess.charAt(i) == 3)
			nYellow++;
	}
	//Check the guess against first total. 
	if( (tArray[0] == 0 && (nRed+nGreen)==0) || 
		(tArray[0] == 1 && (nRed+nGreen)==1) || 
		(tArray[0] == 2 && ((nRed+nGreen)==2 || (nRed >= 2 && nGreen == 0) || (nGreen >= 2 && nRed == 0))) || 
		(tArray[0] == 3 && ((nRed >= 2 && nGreen == 1) || (nGreen >= 2 && nRed == 1))) || 
		(tArray[0] == 4 && (nRed == 2 && nGreen == 2)))
	{	//If guess passes first total test, check second total. 
		if( (tArray[1] == 0 && (nRed+nBlue)==0)||
			(tArray[1] == 1 && (nRed+nBlue)==1) ||
			(tArray[1] == 2 && ((nRed+nBlue)==2 || (nRed >= 2 && nBlue == 0) || (nBlue >= 2 && nRed == 0))) ||
			(tArray[1] == 3 && ((nRed >= 2 && nBlue == 1) || (nBlue >= 2 && nRed == 1))) ||
			(tArray[1] == 4 && (nRed == 2 && nBlue == 2)) )
		{ 	//If guess passes second total test, check third total. 
			if( (tArray[2] == 0 && (nYellow+nGreen+nRed==0)) ||
				(tArray[2] == 1 && ((nYellow==1 && nGreen ==0 && nRed==0) || (nYellow==0 && nGreen >0 && nRed==0) || (nYellow==0 && nGreen ==0 && nRed>0))) || 
				(tArray[2] == 2 && ((nYellow==1 && nGreen>=1 && nRed==0) || (nYellow==1 && nGreen==0 && nRed>=1) || ((nRed >= 1 && nGreen >= 1) && nYellow== 0) || (nYellow>=2 && nRed==0 && nGreen==0))) ||
				(tArray[2] == 3 && ((nYellow >= 2 && nGreen>=1) || (nGreen >= 1 && nYellow == 1 && nRed >=1) || (nYellow >= 2 && nRed>=1))) ||
				(tArray[2] == 4 && (nGreen == 1 && nYellow == 2 && nRed==1)) )
			{	//If guess passes third total test, check fourth total. 
				if( (tArray[3] == 0 && ((nBlue+nGreen+nYellow)==0)) ||
					(tArray[3] == 1 && ((nBlue==1 && nGreen ==0 && nYellow==0) || (nBlue==0 && nGreen >0 && nYellow==0) || (nBlue==0 && nGreen ==0 && nYellow>0))) ||
					(tArray[3] == 2 && ((nBlue==1 && nGreen>=1 && nYellow==0) || (nBlue==1 && nGreen==0 && nYellow>=1) || ((nYellow >= 1 && nGreen >= 1) && nBlue== 0) || (nBlue>=2 && nYellow==0 && nGreen==0))) ||
					(tArray[3] == 3 && ((nBlue >= 2 && nGreen>=1) || (nGreen >= 1 && nBlue == 1 && nYellow >=1) || (nBlue >= 2 && nYellow>=1))) ||
					(tArray[3] == 4 && (nGreen == 1 && nBlue == 2 && nYellow==1)) )
				{	//If guess passes fourth total test return true
					return true;
				} 
			} 
		} 
	}		
	return false;
}
//Helper function for solving mastermind puzzles. 
//Pre: cArray = the total number of correct colors in correct positions in each guess (c[0] = rggr guess, c[1] = rrbb guess, etc)
//		guess = the guess we are testing
//Post: returns true if guess is a possible solution, false otherwise. 
function isValidCGuess(cArray,aGuess)
{	//Array of strings representing the four test guesses we make.
	//RGGR, BBRR, YYGR, GBBY
	var testGuessArray = ["0110", "2200", "3310", "1223"];
	var i = 0;
	var j = 0;
	var k = 0;
	//For each one of the four test guesses
	for(i=0;i<4;i++)
	{	k = 0;
		//For each of the four "buttons" in each test guess
		for(j=0;j<4;j++)
		{	//Compare button from the test guess against the guess we are checking
			if(testGuessArray[i].charAt(j) == aGuess.charAt(j))
			{	k++; //Counts the number of correct color+position buttons in the guess we are checking.
			}
		}
		//Check if the guess we are checking has the correct k value for the test guess. 
		if(k != cArray[i])
		{	//the guess we are checking has a different number of correct color+position values
			//Therefore it must be an invalid guess. 
			return false;
		}
	}
	return true;
}

//Function to solve the green button Puzzle
function solveGreenBoxes() 
{	if (adventureType($("span.mobname").html(),$("#actionresulttd").html()) == OPEN_BOX_OR_CHEST)
	{   return;
	} else if(adventureType($("span.mobname").html(),$("#actionresulttd").html()) == GREEN_BUTTON_BOX)
	{	if(automatePlay)
		{	location.href = "javascript:(" + encodeURI( function() {
			    $("div.btn100").each(function(indice) {
			        if ($(this).html().trim() == "Open")
			        {	$(this).click();
			            return false;
			        }
			    });
			}) + ")()";
		}
	}
	if ($("#mobbox > div > table > tbody > tr:first > td").html() && $("#mobbox > div > table > tbody > tr:first > td").html().indexOf("Number indicators for each button indicate how many of button's adjacent buttons") >= 0)
	{	var numbers = $("#mobbox > div > table > tbody > tr:last > td > table > tbody > tr > td").text();
		//Fetch all possible solutions with the specified numbers. 
		var correctBoxes = getGreenButtonSolutions(numbers);
		var arrBoxIndices = new Array();
		while (correctBoxes != "")
		{	//Each possible solution is comprised of four characters representing the 4
			arrBoxIndices.push(correctBoxes.substring(0,4));
			correctBoxes = correctBoxes.substring(4);
		}
		var boxIndex = 0;
		var indexArray = 0;
		var clickIndex= -1;
	    var finalized = false;
		if($("#out").length == 0)
		{	var strAux = "";
			var i;
			//Display Solutions.
			strAux += '<table id="out"><tr><td>Solution(s)</td>'; //Create a table to hold the tables that will show the answers
			for(indexArray=0; indexArray < arrBoxIndices.length; indexArray++)
			{	strAux += '<td>';
				//For every answer create a mini 3x3 box showing the solution. 
				strAux += '<table id="in"><tr>';
				boxIndex = 0;
				for(i=1; i <= 9; i++)
				{	strAux += '<td>'
					//If the box is a correct box, mark it with an X
					if(arrBoxIndices[indexArray].charAt(boxIndex) == i-1)
					{	strAux += getButtonHTML(GREEN, 15);
						boxIndex++;
					} else
					{	//Otherwise mark it with a blue button
						strAux += getButtonHTML(DARK_BLUE, 15);
					}
					strAux += '</td>'
					if(i % 3 == 0)
					{	strAux += '</tr><tr>';
					}
				}
				strAux += '</tr></table></td><td>&nbsp;</td>'; //end of each "in" table
			}
			strAux += '</table>'; //end of "out" table
			$("div#resl").append(strAux);
	   	}
	    if(automatePlay)
		{	boxIndex = 0;
			indexArray = 0;
			clickIndex= -1;
			clearInterval(idIntervals);
			idIntervals = setInterval(function(){   
				if (adventureType($("span.mobname").html(),$("#actionresulttd").html()) != GREEN_BUTTON_BOX)
			    {   clearInterval(idIntervals);
			        idIntervals = setInterval(exploreRepeater, LOAD_DELAY/2);
			    } else if (!finalized && clickIndex != boxIndex)
				{
					eval('location.href = "javascript:(" + encodeURI( function() {updatePuzzle2("' + arrBoxIndices[indexArray].charAt(boxIndex) + '")}) + ")()";');
			        clickIndex = boxIndex;
				} else if (!finalized) 
				{ 	if ($("#bb" + arrBoxIndices[indexArray].charAt(boxIndex)).attr("src").indexOf("lg_button.gif") > 0 )
					{   boxIndex++;
			            if (boxIndex == 4)
			            {	finalized = true;
			            }
			        } else if ($("#bb" + arrBoxIndices[indexArray].charAt(boxIndex)).attr("src").indexOf("lr_button.gif") > 0 )
			        {   indexArray++;
			            boxIndex = 0;
						clickIndex = -1;
			        }
				}
			},LOAD_DELAY);
		} else
		{	clearInterval(idIntervals);
		    idIntervals = setInterval(exploreRepeater, LOAD_DELAY/2);
	    }
   	}
}
//Helper function for the Green Buttons solver
//Get solution string from the numbers string. 
function getGreenButtonSolutions(numberString) {
	switch(numberString)
	{	case "001121122":
			return "5678";
		case "010112121":
			return "2678";
		case "010211121":
			return "0678";
		case "010212131":
			return "4678";
		case "011022112":
			return "2578";
		case "011112021":
			return "2568";
		case "011122122":
			return "4578";
		case "011211021":
			return "0568";
		case "011212031":
			return "4568";
		case "011220112":
			return "0567";
		case "011221122":
			return "4567";
		case "020112111":
			return "0278";
		case "020113121":
			return "2478";
		case "020202020":
			return "0268";
		case "020203030":
			return "2468";
		case "020211111":
			return "0267";
		case "020302030":
			return "0468";
		case "020311121":
			return "0467";
		case "021112011":
			return "0258";
		case "021113021":
			return "2458";
		case "021121102":
			return "0257";
		case "021122112":
			return "2457";
		case "021211011":
			return "0256";
		case "021221112":
			return "0457";
		case "021311021":
			return "0456";
		case "030203020":
			return "0248";
		case "030212111":
			return "0247";
		case "030302020":
			return "0246";
		case "031212011":
			return "0245";
		case "100121221":
			return "3678";
		case "101031212":
			return "3578";
		case "101130212":
			return "3567";
		case "102031112":
			return "1578";
		case "102121021":
			return "1568";
		case "102130112":
			return "1567";
		case "110022211":
			return "2378";
		case "110112120":
			return "2368";
		case "110122221":
			return "3478";
		case "110211120":
			return "0368";
		case "110212130":
			return "3468";
		case "110220211":
			return "0367";
		case "110221221":
			return "3467";
		case "111031202":
			return "2357";
		case "111112020":
			return "1268";
		case "111130202":
			return "0357";
		case "111131212":
			return "3457";
		case "111211020":
			return "0168";
		case "111212030":
			return "1468";
		case "112022011":
			return "1258";
		case "112031102":
			return "1257";
		case "112122021":
			return "1458";
		case "112130102":
			return "0157";
		case "112131112":
			return "1457";
		case "112220011":
			return "0156";
		case "112221021":
			return "1456";
		case "120112110":
			return "0238";
		case "120113120":
			return "2348";
		case "120121201":
			return "0237";
		case "120122211":
			return "2347";
		case "120211110":
			return "0236";
		case "120221211":
			return "0347";
		case "120311120":
			return "0346";
		case "121112010":
			return "0128";
		case "121113020":
			return "1248";
		case "121211010":
			return "0126";
		case "121311020":
			return "0146";
		case "122121001":
			return "0125";
		case "122122011":
			return "1245";
		case "122221011":
			return "0145";
		case "130212110":
			return "0234";
		case "131212010":
			return "0124";
		case "201031211":
			return "1378";
		case "201121120":
			return "1368";
		case "201130211":
			return "1367";
		case "202031111":
			return "1358";
		case "202040202":
			return "1357";
		case "202130111":
			return "1356";
		case "211022110":
			return "1238";
		case "211031201":
			return "1237";
		case "211122120":
			return "1348";
		case "211130201":
			return "0137";
		case "211131211":
			return "1347";
		case "211220110":
			return "0136";
		case "211221120":
			return "1346";
		case "212031101":
			return "1235";
		case "212130101":
			return "0135";
		case "212131111":
			return "1345";
		case "221121100":
			return "0123";
		case "221122110":
			return "1234";
		case "221221110":
			return "0134";
			
		//3Corner or Sides Puzzles
		case "211121110":
			return "01381236";
		case "112121011":
			return "01581256";
		case "110121211":
			return "03782367";
		case "011121112":
			return "05782567";
		//Corner + cluster
		case "121212020":
			return "01481246";
		case "120212120":
			return "03482346";
		case "021212021":
			return "04582456";
		case "020212121":
			return "04782467";
		//L shaped puzzles
		case "121221111":
			return "01470345";
		case "121122111":
			return "12472345";
		case "111221121":
			return "14673456";
		case "111122121":
			return "14783458";
		// 2 Sides, or T
		case "121121101":
			return "01270235";
		case "111220111":
			return "01670356";
		case "111022111":
			return "12782358";
		case "101121121":
			return "16783568";
		//4 Solution puzzle... I don't think this puzzle ever actually comes up. 
		case "111121111":
			return "0178035812672356";
	}
	return false;
}