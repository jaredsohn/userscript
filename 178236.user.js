<html><head></head><body><pre style="word-wrap: break-word; white-space: pre-wrap;">// ==UserScript==
// @name           DRES
// @namespace      http://playmage.com/
// @include        http://*playmage.com/*
// @include        https://*playmage.com/*
// @require        http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==
var dwap = (function() {
    var my = {};
    var MAX_DELAY = 500;
    my.Counter = 0;
    my.TimerId;
    var mysteryBoxAction = GM_getValue("mysteryBoxAction", 0);
    var positionToEnchant = GM_getValue("positionToEnchant", 0);
    var positionToTrain = GM_getValue("positionToTrain", 0);
    var isActive = GM_getValue( "isActive", true);
	var automatePlay = GM_getValue( "automatePlay", true);
	var isEvent = GM_getValue( "isEvent", true);
	var isBillion = GM_getValue( "isBillion", false);
	var useTalisman = GM_getValue( "useTalisman", true);
	var wiseFight = GM_getValue( "wiseFight", false);
	var dustFight = GM_getValue( "dustFight", false);
	var autoUseDust = GM_getValue( "autoUseDust", true);
	// ==Constants used for determining adventure type==
	var NULL_ADVENTURE = -1;
	var OPEN_BOX_OR_CHEST = 0;
	var GREEN_BUTTON_BOX = 1;	// 1 = Green Button Puzzle Box
	var COLOUR_BUTTON_BOX = 2;	// 2 = Colour Puzzle Box
	var TREASURE_CHEST = 3;		// 3 = Treasure Chest
	var WELL = 4;		        // 4 = Wishing Well
	var LITTLE_IMP = 5          // 5 = Little Imp
	var DUST_MERCHANT = 6;      // 6 = Dust Merchant
	var GAMBLER = 7;            // 7 = Gambler
	var WISEMAN = 8;            // 8 = Wiseman
	var GARDIAN_OF_DREAMS = 9;  // 9 = Guardian of Dreams
	var MAGIC_ELF = 10;         // 10 = Magic Elf
	var MUSHROOM = 11;          // 11 = Magic Mushrooms
	var MAP = 12;               // 12 = A Treasure map
	var BEGGAR = 13;            // 13 = Beggar
	var FOUND_ENHANCE_POT = 14;
	var FOUND_MYSTERY_BOX = 15;
    var MSSANTA = 16;
	// ==/Constants used for determining adventure type==
	//HP Values are the cost of an HP Potion at level (index)
	var HP_VALUES_ARRAY = [10,20,30,40,50,72,98,128,162,200,240,288,345,414,496,595,714,856,1027,1232,1453,1714,2022,2385,2814,3320,3917,4622,5453,6434,7592,8958,10570,12472,14716,17364,20489,24177,28528,33663,39049,45296,52543,60949,70700,82012,95133,110354,123596,138427,155038,173642,194479,217816,243953,273227,306014,342735,383863,429926,481517,539299,604014,676495,757674,848594,950425,1064476,1192213,1335278,1495511,1674972,1875968,2101084,2353214,2635599,2951870,3306094,3702825,4147164,4644823,5202201,5826465,6525640,7308716,8185761,9168052,10268218,11500404,12880452,14426106,16157238,18096106,20267638,22699754,25423724,28474570,31891518,35718500,40004720]
	//Names for allies
	var ALLY_NAMES = ["Alien%20Lord","Elf%20Princess","Valkyrie","Lilith","Princess%20Eli","Huntress"];
    // ==Toggles==
    //Function to toggle DWAP on/off
	function toggleActive() {	
		isActive = !isActive;
		GM_setValue("isActive", isActive);
		if(isActive)
		{ 
			//useItems('mystery box');
	      	$("#xswitch").attr("value", "On");
	      	my.Start();
		}
		else
		{	
			$("#xswitch").attr("value", "Off");
	        if (my.TimerId)
	        {
	        	my.Pause();
	        }
		}
	}
	function toggleMysteryBoxAction() {
		switch(mysteryBoxAction) {
			case 0 : mysteryBoxAction = 1;
					 $("#xmb").attr("value", "MB:Use");
				break;
			case 1 : mysteryBoxAction = 0;
					 $("#xmb").attr("value", "MB:Store");
				break;
		}
		GM_setValue("mysteryBoxAction", mysteryBoxAction);
	}
	function toggleEnchantPosition() {
		switch(positionToEnchant) {
			case 0 : positionToEnchant = 1;
					 $("#xenchant").attr("value", "Pot:Weapon");
				break;
			case 1 : positionToEnchant = 2;
					 $("#xenchant").attr("value", "Pot:Armor");
				break;
			case 2 : positionToEnchant = 3;
					 $("#xenchant").attr("value", "Pot:Ring");
				break;
			case 3 : positionToEnchant = 4;
					 $("#xenchant").attr("value", "Pot:Store");
				break;
			case 4 : positionToEnchant = 0;
					 $("#xenchant").attr("value", "Pot:None");
				break;
		}
		GM_setValue("positionToEnchant", positionToEnchant);
	}
	function toggleTrainPosition() {
		switch(positionToTrain) {
			case 0 : positionToTrain = 1;
					 $("#xtrain").attr("value", "Book:1");
				break;
			case 1 : positionToTrain = 2;
					 $("#xtrain").attr("value", "Book:2");
				break;
			case 2 : positionToTrain = 3;
					 $("#xtrain").attr("value", "Book:3");
				break;
			case 3 : positionToTrain = 0;
					 $("#xtrain").attr("value", "Book:None");
				break;
		}
		GM_setValue("positionToTrain", positionToTrain);
	}
    //Function to toggle Talisman functionality
	function toggleTalisman() {	
		useTalisman = !useTalisman;
		GM_setValue("useTalisman", useTalisman);
		if(useTalisman)
		{	
			$("#xtal").attr("value", "Talisman");
		}
		else
		{ 
			$("#xtal").attr("value", "Weapon");
		}
	}
	//Function to toggle Auto Use Dust functionality
	function toggleAutoUseDust() {
		autoUseDust = !autoUseDust;
		GM_setValue("autoUseDust", autoUseDust);
		if(autoUseDust)
		{
			$("#xadust").attr("value", "Dust:ON");
		}
		else
		{ 
			$("#xadust").attr("value", "Dust:OFF");
		}
	}
	//Function to toggle Wiseman functionality
	function toggleWiseman() {
		wiseFight = !wiseFight;
		GM_setValue("wiseFight", wiseFight);
		if(wiseFight)
		{
			$("#xwise").attr("value", "Wise:Fight");
		}
		else
		{ 
			$("#xwise").attr("value", "Wise:Accept");
		}
	}
	//Function to toggle Dust Merchant functionality
	function toggleDustMerchant() {
		dustFight = !dustFight;
		GM_setValue("dustFight", dustFight);
		if(dustFight)
		{
			$("#xdust").attr("value", "Dust:Fight");
		}
		else
		{
			$("#xdust").attr("value", "Dust:Accept");
		}
	}
	//Function to toggle Event functionality
	function toggleEvent() {	
		isEvent = !isEvent;
		GM_setValue("isEvent", isEvent);
		if(isEvent)
		{	
			$("#xevent").attr("value", "Event");
		} 
		else
		{ 
			$("#xevent").attr("value", "Regular");
		}
	}
	//Function to toggle Billion functionality
	function toggleBillion() {
		isBillion = !isBillion;
		GM_setValue("isBillion", isBillion);
		if(isBillion)
		{
			$("#xbil").attr("value", "Rage");
		}
		else
		{ 
			$("#xbil").attr("value", "Energy");
		}
	}
    // ==/Toggles==
    // Returns random delay between each timeouts
    function getRandomDelay() {
    	return (Math.round(Math.random() * (MAX_DELAY)) + 500) / 2;
    }
    //Function to determine what type adventure is being processed.
	function adventureType(mobname, actionResult, battleResult){
		if(actionResult == null || mobname == null) {	
			return NULL_ADVENTURE;
		} else if (actionResult.indexOf("Inside you find:") &gt; 0) {
			return OPEN_BOX_OR_CHEST;
		}
		
		if(mobname  == "A Puzzle Box") {	
			if(actionResult.indexOf("and can be opened when all 4 correct buttons are pressed") &gt;= 0) {	
	        	return GREEN_BUTTON_BOX;
			} else if(actionResult.indexOf("electronically, and opens when the correct sequence of colors") &gt;= 0) {	
				return COLOUR_BUTTON_BOX;
			}
		} else if(mobname == "A Treasure Chest") {	
			return TREASURE_CHEST;
		} else if(mobname == "Wishing Well") {	
			return WELL;
	    } else if(mobname == "A Beggar"){	
			return BEGGAR;
		} else if(mobname == "Little Imp") {
	        return LITTLE_IMP;
		} else if(mobname == "The Gambler") {
	        return GAMBLER;
		} else if(mobname == "Dust Merchant") {
	        return DUST_MERCHANT;
		} else if(mobname == "The Wiseman") {
	        return WISEMAN;
		} else if(mobname == "Guardian of Dreams") {
	        return GARDIAN_OF_DREAMS;
		} else if(mobname == "Magic Elf") {
	        return MAGIC_ELF;
		} else if(mobname == "Magic Mushrooms") {
	        return MUSHROOM;
	    } else if(mobname == "A Treasure Map") {
	        return MAP;
        } else if(mobname == "Ms. Santa") {
        	return MSSANTA;
        }
		return 0;
	}
	//Returns true if the sign given is an Encounter. 
	function isEncounterSign(areasign)
	{	if(areasign &amp;&amp; 
			(areasign.indexOf("Encounter")&gt; 0 || 
	    	(areasign.indexOf("Boss") &gt; 0 &amp;&amp; areasign.indexOf("Mu Boss") == 0) || 
	    	areasign.indexOf("Demon") &gt; 0)
	    	)
	    {	return true;
		}
		return false;
	}
	function getExploreButton() {
		var explore = $("div.btn100:contains('Explore')");
		if(explore.length &gt; 1) {
			var newExplore = explore.last();
			return newExplore;
		} else {
			return explore;
		}
	}
	//Main function, determines what type of adventure we have and does the appropriate action. 
	my.ExploreRepeater = function() 
	{	
		if(my.Counter &gt;= 30)
		{
			my.Pause();
		}
	    if (!isActive || document.getElementById("transdiv"))
	    {
	    	return;
	    }
		var areaSign = $("td.areasign").html();
		
		//If this is not an encounter, figure out what it actually is and process. 
		if (!isEncounterSign(areaSign))
	    {	
	    	var boxType = adventureType($("span.mobname").html(), $("#actionresulttd").html(), $("div.battletextmiddle").html());
			
			if(boxType == OPEN_BOX_OR_CHEST) {
				getExploreButton().click();
			} else if(boxType == FOUND_MYSTERY_BOX) {
				alert('box');
			} else if(boxType == FOUND_ENHANCE_POT) {
				alert('pot');
			}
			if(boxType == GREEN_BUTTON_BOX)
			{
				solveGreenBoxes();
			} else if(boxType == COLOUR_BUTTON_BOX)
			{
				solveColourBoxes();
			} else if(boxType == TREASURE_CHEST)
	        {	
	        	solveChest();
	        } else if(boxType == BEGGAR || boxType == WELL)
	        {
	        	beggarWellHelper(boxType);
	        } else if(boxType == LITTLE_IMP || boxType == DUST_MERCHANT || boxType == GAMBLER || boxType == WISEMAN || boxType == GARDIAN_OF_DREAMS || boxType == MAGIC_ELF)
	        {
	        	attack(boxType);
	        } else if(boxType == MUSHROOM) {
	            $(".btn100:contains('Taste')").click();
	            getExploreButton().click();
	            return false;
	        } else if(boxType == MAP) {
	            $(".btn100:contains('Sell')").click();
	            getExploreButton().click();
	            return false;
            } else if(boxType == MSSANTA) {
                $("div.btn100:contains('Ask for gift')").click();
                getExploreButton().click();
	            return false;
            }
	    } else //If it *is* an encounter, begin encounter processing. 
	    {	
	    	//$("#xdebug").val($('table#invtable tr').length);
	        //Check if this is a combat that has already ended.
	        if(autoUseDust) {
		        // USE FAIRY
		        var fairyDust = $("a.item:contains('fairy dust')");
		        if(fairyDust &amp;&amp; fairyDust.is(":visible")) {
		            fairyDust.siblings(".btn40:contains('Use')").click();
		            return false;
		        }
		        delete fairyDust;
	        }
	        if(useTalisman) {
	            // USE TALISMAN
	            var talisman = $("a.item:contains('Talisman')");
	            if(talisman || talisman.is(":visible")) {
	                talisman.siblings(".btn40:contains('Use')").click();
	                if(getExploreButton().is(':visible')) {
	                     getExploreButton().click();
	                }
	                
	                if($("div.btn100:contains('Continue')").is(':visible')) {
	                     $("div.btn100:contains('Continue')").click();
	                }
	                return false;
	            }
	            delete talisman;
	        } else {
	            var explore = getExploreButton();
	            var contin = $(".btn100:contains('Continue')");
	            if(explore.is(":visible") || contin.is(":visible")) {
	            	if(explore.is(":visible")) {
	            		explore.click();
	                	return false;
	            	} else {
	            		contin.click();
	                	return false;
	            	}
	                
	            } else {
	                $("div#attbt.btn100").click();
	                return false;
	            }
	        }
		}
	};
	//Function to add buttons for quick well values entry.
	//This does not neet to reset the interval function since this code only needs to run once per beggar/well 
	function beggarWellHelper(boxType) {
	    if($("#amount").is(":visible")) {
	        if(isBillion &amp;&amp; boxType == WELL) {
	            inputAmount(8);
	        } else {
	            if(isEvent) {
	                inputAmount(3);
	            } else {
	                inputAmount(2);
	            }
	        }
	        if(boxType == WELL) {
	        	$("div.btn100:contains('Throw')").click();
	        } else if(boxType == BEGGAR) {
	        	$("div.btn100:contains('Give')").click()
	        }
	        
	        return false;
	    } else {
	    	getExploreButton().click();
	    }
	}
	//Assigns the appropriate value to the input field based on the multiplier given
	//and the player's level. Alerts the user if there was an error, or if they do not have enough coins.
	function inputAmount(multiplier) 
	{	
		var curLevel = $("#curlevel").html();
		var curCoins = $("#curcoins").html().replace(/[,\.]/g,"");
	    var amount = (multiplier*(HP_VALUES_ARRAY[parseInt(curLevel)-1])+1);
		
	    if (HP_VALUES_ARRAY[parseInt(curLevel)-1] &gt;= 0)
	    {	if (multiplier &gt; 6) { amount = 1000000000; }
	        if (parseInt(curCoins) &gt;= amount)
	        { 	$("#amount").val(amount);
	        } else {
	            alert("You don't have enough coins for this action. You need at least " + amount + " coins.");
	        }
	    } else {
	        alert("Sorry, your level isn't registered in this script, please update it or contact the author.")
	    }
	}
	//Function to solve chests.
	function solveChest() 
	{
		$("div.btn100:contains('Open')").click();
	    $("#actionbuttonimg2").click();
	}
	//Function to solve the color button Puzzle
	function solveColourBoxes() 
	{
		$("div.btn100:contains('Open')").click();
		$("#actionbuttonimg2").click();
	}
	//Function to solve the green button Puzzle
	function solveGreenBoxes()
	{
		$("div.btn100:contains('Open')").click();
		$("span#actionbuttonimg1").click();
	}
	//Function to attack IMP/GoD
	function attack(boxType) {
	    if(boxType == LITTLE_IMP || boxType == GARDIAN_OF_DREAMS || boxType == GAMBLER) {
	        $("div.btn100:contains('Fight')").click();
        } else if(boxType == MAGIC_ELF) {
	        $("div.btn100:contains('Attack')").click();
	    } else if(boxType == WISEMAN) {
	        var accept = $("div.btn100:contains('Accept')");
	        var fight = $("div.btn100:contains('Fight')");
	        var explore = getExploreButton();
	        
	        if(accept.is(":visible") || fight.is(":visible")) {
	            if(wiseFight) {
	                fight.click();
	            } else {
	                accept.click();
	            }
	            return false;
	        } else {
	            explore.click();
	            return false;
	        }
	    } else if(boxType == DUST_MERCHANT) {
	        var accept = $("div.btn100:contains('Accept')");
	        var fight = $("div.btn100:contains('Fight')");
	        var explore = getExploreButton();
	        
	        if(accept.is(":visible") || fight.is(":visible")) {
	            if(dustFight) {
	                fight.click();
	            } else {
	                accept.click();
	            }
	            return false;
	        } else {
	            explore.click();
	            return false;
	        }
	    }
	}
	function addStyle() {
		GM_addStyle((&lt;&gt;&lt;![CDATA[
		   #xec {
			    height:42px;
			    background-color:#6CA6CD;
			    padding:3px;
			    border:solid 1px black;
			}
			.col {
			    float:left;
			}
			.tablecol {
			    width:150px;
			    float:left;
			}
			.tablecol {
				margin-top:-3px;
			}
			.tablecol table tr td img{
			    padding:0 3px 0 0;
			}
			.myButtons {
			    display:block;
			    float:left;
			    margin:0 5px 2px 0;
			    background-color:#FFFFFF;
			    border:1px solid #000000;
			    height:20px;
			    font-family:"Lucida Grande", Tahoma, Arial, Verdana, sans-serif;
			    font-size:11px;
			    text-decoration:none;
			    font-weight:bold;
			    color:#565656;
			    cursor:pointer;
			    padding:2px; /* Links */
			}
			.small {
			    width:50px;
			}
			.medium {
			    width:75px;
			}
			.large {
			    width:100px;
			}
		]]&gt;&lt;/&gt;).toString());
	}
	addStyle();
    // Include buttons in the game
    function includeButtons() {
    	$('#maindiv').css('margin-top', '50px');
    	$('#maindiv').css('height', '647px');
		$('&lt;div id="xec"&gt;&lt;/div&gt;').insertBefore('#maindiv');
		$('#guildfooter').css('top', '671px');
		var $col1 = $('&lt;div class="col" style="width:575px" /&gt;');
		var $col1btn1 = $('&lt;input type="button" class="myButtons small" id="xswitch" value="Off" /&gt;');
		var $col1btn2 = $('&lt;input type="button" class="myButtons small" id="xuse" value="Loot" /&gt;');
		var $col2btn1 = $('&lt;input type="button" class="myButtons medium" id="xevent" value="Regular" /&gt;');
        var $col2btn2 = $('&lt;input type="button" class="myButtons medium" id="xtal" value="Talisman" /&gt;');
        var $col2btn3 = $('&lt;input type="button" class="myButtons medium" id="xbil" value="Rage" /&gt;');
		var $col3btn1 = $('&lt;input type="button" class="myButtons large" id="xwise" value="Wise:Fight" /&gt;');
        var $col3btn2 = $('&lt;input type="button" class="myButtons large" id="xdust" value="Dust:Fight" /&gt;');
		var $col4btn1 = $('&lt;input type="button" class="myButtons medium" id="xadust" value="Dust:ON" /&gt;');
        var $col5btn1 = $('&lt;input type="button" class="myButtons large" id="xenchant" value="Pot:None" /&gt;');
        var $col5btn2 = $('&lt;input type="button" class="myButtons large" id="xtrain" value="Book:None" /&gt;');
		var $col5btn3 = $('&lt;input type="button" class="myButtons large" id="xmb" value="MB:Store" /&gt;');
		var $col6btn1 = $('&lt;input type="button" class="myButtons medium" id="xbossattack" value="Boss Att" /&gt;');
		       
		$col1.append($col1btn1);
		$col1.append($col1btn2);
		$col1.append($col2btn1);
        $col1.append($col2btn2);
        $col1.append($col2btn3);
        $col1.append($col3btn1);
        $col1.append($col3btn2);
        $col1.append($col4btn1);
        $col1.append($col5btn1);
        $col1.append($col5btn2);
        $col1.append($col5btn3);
        $col1.append($col6btn1);
		$('#xec').append($col1);
		var menu='';
		menu += '&lt;div class="tablecol"&gt;';
        menu += '&lt;table&gt;';
        menu += '&lt;tr&gt;';
        menu += '&lt;td&gt;';
        menu += '&lt;img src="/img/en/dream/premium/2006.jpg" width="18" height="18" title="'+decodeURIComponent(ALLY_NAMES[0])+'" onclick=showDiv("/dream/pets?use=2006&amp;name='+ALLY_NAMES[0]+'");setTimeout(closeDivSlide,250); /&gt;';
        menu += '&lt;/td&gt;';
        menu += '&lt;td&gt;';
        menu += '&lt;img src="/img/en/dream/premium/2008.jpg" width="18" height="18" title="'+decodeURIComponent(ALLY_NAMES[2])+'" onclick=showDiv("/dream/pets?use=2008&amp;name='+ALLY_NAMES[2]+'");setTimeout(closeDivSlide,250); /&gt;';
        menu += '&lt;/td&gt;';
        menu += '&lt;td&gt;';
        menu += '&lt;img src="/img/en/dream/premium/2010.jpg" width="18" height="18" title="'+decodeURIComponent(ALLY_NAMES[4])+'" onclick=showDiv("/dream/pets?use=2010&amp;name='+ALLY_NAMES[4]+'");setTimeout(closeDivSlide,250); /&gt;';
        menu += '&lt;/td&gt;';
        menu += '&lt;/tr&gt;';
        menu += '&lt;tr&gt;';
        menu += '&lt;td&gt;';
        menu += '&lt;img src="/img/en/dream/premium/2007.jpg" width="18" height="18" title="'+decodeURIComponent(ALLY_NAMES[1])+'" onclick=showDiv("/dream/pets?use=2007&amp;name='+ALLY_NAMES[1]+'");setTimeout(closeDivSlide,250); /&gt;';
        menu += '&lt;/td&gt;';
        menu += '&lt;td&gt;';
        menu += '&lt;img src="/img/en/dream/premium/2009.jpg" width="18" height="18" title="'+decodeURIComponent(ALLY_NAMES[3])+'" onclick=showDiv("/dream/pets?use=2009&amp;name='+ALLY_NAMES[3]+'");setTimeout(closeDivSlide,250); /&gt;';
        menu += '&lt;/td&gt;';
        menu += '&lt;td&gt;';
        menu += '&lt;img src="/img/en/dream/premium/2011.jpg" width="18" height="18" title="'+decodeURIComponent(ALLY_NAMES[5])+'" onclick=showDiv("/dream/pets?use=2011&amp;name='+ALLY_NAMES[5]+'");setTimeout(closeDivSlide,250); /&gt;';
        menu += '&lt;/td&gt;';
        menu += '&lt;/tr&gt;';
        menu += '&lt;/table&gt;';
        menu += '&lt;/div&gt;';
        $('#xec').append(menu);
        if(mysteryBoxAction == 0) { $("#xmb").attr("value", "MB:Store"); }
        if(mysteryBoxAction == 1) { $("#xmb").attr("value", "MB:Use"); }
        if(positionToEnchant == 0) { $("#xenchant").attr("value", "Pot:None"); }
        if(positionToEnchant == 1) { $("#xenchant").attr("value", "Pot:Weapon"); }
        if(positionToEnchant == 2) { $("#xenchant").attr("value", "Pot:Armor"); }
        if(positionToEnchant == 3) { $("#xenchant").attr("value", "Pot:Ring"); }
        if(positionToEnchant == 4) { $("#xenchant").attr("value", "Pot:Store"); }
        if(positionToEnchant == 0) { $("#xtrain").attr("value", "Book:None"); }
        if(positionToEnchant == 1) { $("#xtrain").attr("value", "Book:1"); }
        if(positionToEnchant == 2) { $("#xtrain").attr("value", "Book:2"); }
        if(positionToEnchant == 3) { $("#xtrain").attr("value", "Book:3"); }
        if(isActive){ $("#xswitch").attr("value", "On"); }
		if(isEvent) { $("#xevent").attr("value", "Event"); }
        if(isBillion) { $("#xbil").attr("value", "Rage"); }
        if(useTalisman) { $("#xtal").attr("value", "Talisman"); }
        if(wiseFight) { $("#xwise").attr("value", "Wise:Fight"); }
        if(dustFight) { $("#xdust").attr("value", "Dust:Fight"); }
        if(autoUseDust) { $("#xadust").attr("value", "Dust:ON"); }
        $("#xenchant").click(toggleEnchantPosition);
        $("#xtrain").click(toggleTrainPosition);
        $("#xadust").click(toggleAutoUseDust);
		$("#xswitch").click(toggleActive);
		$("#xevent").click(toggleEvent);
        $("#xbil").click(toggleBillion);
        $("#xtal").click(toggleTalisman);
        $("#xwise").click(toggleWiseman);
        $("#xdust").click(toggleDustMerchant);
        $("#xmb").click(toggleMysteryBoxAction);
        $("#xuse").click(function() {
        	my.UseItems();
        });
        $("#xbossattack").click(function() {
        	my.AttackBoss();
        });
    };
    includeButtons();
    
    my.AttackBoss = function() {
    	$("#skilltable tr.vskill:last-child").click();
    	var skbt = $("#skbt");
    	var pwbr = $("#powerbar");
    	var x = 0;
    	var skbtClicked = false;
    	var spamInterval = setInterval(function() {
    		if(skbt.css("display") != "none" &amp;&amp; skbtClicked==false) {
    			skbt.click();
    			skbtClicked = true;
    			console.log("skbt click");
    		} else if(pwbr.css("display") != "none"){
    			pwbr.click();
    			skbtClicked = false;
    			console.log("pwbr click");
    			x++;
    		}
    		if (x === 10) {
    			console.log("clear interval");
	           	clearInterval(spamInterval);
	        }
    	}, 100);
    	//$("#powerbarwidth").css("width", "44");
    	//$("#powerbar").css("display", "inline");
		
		//alert(document.getElementById("powerbarwidth").style.width);
		/*var spamInterval = setInterval(function() {
			//console.log(i);
			//if(i&lt;5) {*/
				/*location.href = "javascript:(" + encodeURI( function() {
		        	loadDiv2('/dream/battle?skill'); 
		        }) + ")()";*/
			/*//}
			//i++;
		}, 200);
		setTimeout(function(){
			clearInterval(spamInterval);
		},3000);
		*/
    };
    my.UseItems = function() {
    	my.Pause();
    	$("td.menubar:contains('Inventory')").click();
    	var toCheck = 2;
		var loopInterval = setInterval(function() {
			var rowHtml = $("table#tinvtb tr:nth-child("+toCheck+")").html();
			// Fairy Dust
			if(rowHtml.indexOf("fairy dust") &gt; 0) {
				var use = $("table#tinvtb tr:nth-child("+toCheck+") td:nth-child(4) div.btn50");
				use.click();
			}
			// Mystery Box
			else if(rowHtml.indexOf("mystery box") &gt; 0) {
				if(mysteryBoxAction == 1) {
					var use = $("table#tinvtb tr:nth-child("+toCheck+") td:nth-child(4) div.btn50");
					use.click();
				} else if(mysteryBoxAction == 0) {
					var store = $("table#tinvtb tr:nth-child("+toCheck+") td:nth-child(5) div.btn50");
					store.click();
				}
			}
			// Enhance Pot
			else if(rowHtml.indexOf("enhance pot") &gt; 0) {
				if(positionToEnchant &gt; 0 &amp;&amp; positionToEnchant &lt; 4) {
					var use = $("table#tinvtb tr:nth-child("+toCheck+") td:nth-child(4) div.btn50");
					use.click();
					setTimeout(function() {
						var enhance = $("div#enhance-id table tr:nth-child("+positionToEnchant+") td:nth-child(5) div.btn50");
						enhance.click();
						setTimeout(function() {
							var close = $("span.btn100:contains('Close')");
							close.click();
						}, 100);
					}, 350);
				} else if(positionToEnchant == 4){
					var store = $("table#tinvtb tr:nth-child("+toCheck+") td:nth-child(5) div.btn50");
					store.click();
				} else {
					if(toCheck &lt; 5) {
						toCheck++;
					}
				}
			}
			// Ally Skill Book
			else if(rowHtml.indexOf("Ally Skill Book") &gt; 0) {
				if(positionToTrain != 0) {
					var use = $("table#tinvtb tr:nth-child("+toCheck+") td:nth-child(4) div.btn50");
					use.click();
					setTimeout(function() {
						var enhance = $("div#enhance-id table tr:nth-child("+positionToTrain+") td:nth-child(6) div.btn50");
						enhance.click();
						setTimeout(function() {
							var close = $("span.btn100:contains('Close')");
							close.click();
						}, 100);
					}, 350);
				} else {
					if(toCheck &lt; 5) {
						toCheck++;
					}
				}
			}
			// Guardian Doll || Arena Pass || positron || drow
			else if(rowHtml.indexOf("Guardian Doll") &gt; 0 ||
					rowHtml.indexOf("Arena Pass") &gt; 0 ||
					(rowHtml.indexOf("positron") &gt; 0 &amp;&amp; (rowHtml.indexOf("+8") &gt; 0 || rowHtml.indexOf("+9") &gt; 0)) ||
					(rowHtml.indexOf("dream world") &gt; 0 &amp;&amp; (rowHtml.indexOf("+8") &gt; 0 || rowHtml.indexOf("+9") &gt; 0)) ||
					(rowHtml.indexOf("drow") &gt; 0 &amp;&amp; (rowHtml.indexOf("+8") &gt; 0 || rowHtml.indexOf("+9") &gt; 0))) {
				var store = $("table#tinvtb tr:nth-child("+toCheck+") td:nth-child(5) div.btn50");
				store.click();
			} else {
				if(toCheck &lt; 5) {
					toCheck++;
				}
			}
		}, 500);
		
    	setTimeout(function() {
    		clearInterval(loopInterval);
    		$("span.navbutton:contains('Close')").click();
    		my.Start();
    	}, 5000);
    };
    my.Pause = function() {
        clearTimeout(my.TimerId);
    };
    my.Start = function() {
        my.TimerId = setTimeout(function() {
            my.Counter++;
            my.ExploreRepeater();
	        my.Start();
            
        }, getRandomDelay());
    };
    if(isActive) {
    	my.Start();
    }
    $(document).keydown(function(e) {
      console.log("the numeric code for the key you pressed: " + e.which);
    });
    return my;
}());</pre></body></html>