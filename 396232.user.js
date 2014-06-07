// ==UserScript==
// @name        NeoQuest II RCZ
// @namespace   http://nq2guy.tz/
// @description Automatically moves character based on user defined path. (1=north, 2=south, 3=west, 4=east, 5=northwest, 6=southwest, 7=northeast, 8=southeast
// @include     http://www.neopets.com/games/nq2/nq2*
// ==/UserScript==
//Copyright 2014 OPEN SOURCED ---
//script licensed under, GNU GPL V3 , see http://www.gnu.org/licenses/gpl.txt for details

//DON'T FORGET TO COMMENT THE "fact = ****" LINES WHEN YOUR CHARACTER DOES NOT HAVE A CERTAIN SKILL YET!
//MOST IMPORTANT : Haste; Shield & Damage Shield
//GO DISABLE THEM IN EACH CHARACTER'S ATTACK PHASE BELOW!

//Edit them from about:config , filter:greasmonkey.scriptvals (firefox greasemonkey only!)
YOU CAN NOW RESTART THE PROGRAM (By example, if you want to stop training or you inputted something wrong) BY PRESSING THE DOWN ARROW BUTTON AFTER A PAGE LOADS! YEY!

//pathIndex = GM_setValue("pathIndex",0);
var isFleeing = GM_getValue("isFleeing", false);
var isTraining = GM_getValue("isTraining", false);
var isShielded = GM_getValue("isShielded", false);
var isThorned = GM_getValue("isThorned", false);

// IF THE POTION SYSTEM IS BUGGED; YOU CAN UNCOMMENT THE LINE BELOW AND REPLACE THE 300** WITH THE POTION YOU WANT TO START USING! LOOK BELOW FOR VALUES!

//var healingPot = GM_setValue("healingPot",30023);

var healingPot = GM_getValue("healingPot");
var thornsTimer = GM_getValue("thornsTimer");
var shieldTimer = GM_getValue("shieldTimer");
var hasteTimer = GM_getValue("hasteTimer");
//var firstRun = GM_setValue("runCheck1",true);
var firstRun = GM_getValue("runCheck1");


pathIndex = GM_getValue("pathIndex", 0);
if (pathIndex == 0) { //First run
        isTraining = confirm("Press OK if you are doing training." + '\n' + "Press CANCEL if you are travelling.");
        if (!isTraining) {
                GM_setValue("Path", prompt("Set the path for the party to walk.", "0"));
                isFleeing = confirm("Press OK if you want to flee from battles." + '\n' + "Press CANCEL if you want the script to automatically battle for you.");
                GM_setValue("isFleeing", isFleeing);
                GM_setValue("isTraining", isTraining);
        } else { //Continuation
                isFleeing = false;
                GM_setValue("isFleeing", isFleeing);
                pathIndex = -1;
                GM_setValue("pathIndex", pathIndex);
                GM_setValue("isTraining", isTraining);
        }
}
 
/*
Notes on coordinates
 
javascript: dosub(int)
 
1=north
2=south
3=west
4=east
5=northwest
6=southwest
7=northeast
8=southeast
*/
function KeyCheck(e)
{
    pathIndex = GM_setValue("pathIndex",0);
	alert("Program Resetted");
}

window.addEventListener('keydown', KeyCheck, true);
 
var i = 0;
var hiccup = 1;
var divs = document.getElementsByTagName('div');
for (i = 0; i < divs.length; i++) {
        if (divs[i].className == "contentModuleHeader") {
                hiccup = 0; //No hiccup has happened
                break;
        }
}
 
if (hiccup) {
        document.location.href = "http://www.neopets.com/games/nq2/nq2.phtml";
} else {
        var elements = document.getElementsByTagName('img');
 
        // BATTLE STUFF
        var useid = -1; // use special item??
        var nxactor = 1; // who fightsS??' default =1: rohane
        var fact = 3; // default is attack , will override for low health
        var hitTarget = GM_getValue("hitTarget", 5); //hittargets 1-4 are reserved for allies
       
        var healingItem = GM_getValue("healingItem", healingPot); // get the healing item in case HP turns red or yellow
        /*
        Healing items:
        30011   Healing Vial     15 HP
        30012   Healing Flask    25 HP
        30013   Healing Potion   35 HP
        30014   Healing Bottle   50 HP
        30021   Potion of Regeneration   60 HP
        30022   Potion of Fortitude      70 HP
        30023   Potion of Growth         80 HP
        30031   Potion of Potent Health  90 HP
        30032   Potion of Greater Health        100 HP
        30033   Potion of Abundant Health       110 HP
        30041   Vitality Potion  120 HP
        30042   Stamina Potion   130 HP
        30043   Constitution Potion      140 HP
        30051   Faerie's Gift Potion     150 HP
        30052   Fyora's Blessing Potion  160 HP
        30053   Jhudora's Lifeforce Potion      170 HP
        */
   
        var isHasted = GM_getValue("isHasted", false);
    	var isShielded = GM_getValue("isShielded", false);
    	var isDamShielded = GM_getValue("isThorned", false);
    
        var j = 0; // used for looping to find out whose turn is it
 
        var i = 0;
    
    	var enemyN = 0;
        for (i = 0; i < elements.length; i++) {
                switch (elements[i].src) {
                        case "http://images.neopets.com/nq2/x/com_begin.gif":
                                if (!isFleeing) {
                                        GM_setValue("hitTarget", 5);
                                        GM_setValue("isHasted", false);
                                    	GM_setValue("isShielded", false);
                                    	GM_setValue("isThorned",false);
                                    	GM_setValue("hasteTimer",0);
                                    	GM_setValue("shieldTimer",0);
                                    	GM_setValue("thornsTimer",0);
                                }
                        		var imgs = document.getElementsByTagName("img");
                        		var zo = 0;
                        		for (zo = 0; zo < imgs.length; ++zo){
                         			if(imgs[zo].width == 130 || imgs[zo].width == 200 || imgs[zo].width == 199)
                          			{
                                        enemyN++;
                                        
                                        
                           			}
                                    if(imgs[zo].src == "http://images.neopets.com/nq2/x/com_begin.gif")
                                    {
                                        GM_setValue("enC", enemyN);
                                        break;
                                    }
                     		    }	
                       			GM_setValue("enemyN", enemyN); 
                                document.location.href = "http://www.neopets.com/games/nq2/nq2.phtml?start=1";
                                break;
                        case "http://images.neopets.com/nq2/x/com_atk.gif":
                                if (!isFleeing) {
                                        var texts = document.getElementsByTagName("font");
                                        var doMultipleTargets = 0;
                                    	var tempEn = GM_getValue("enemyN")
                                    	var maxTargets = GM_getValue("enC");
                                    	maxTargets = parseInt(maxTargets);
                                        for (j = 0; j < texts.length; j++) {
                                                //check to increment target
                                                if (((texts[j].innerHTML.search(/for it has already been defeated!/)) != -1) || (texts[j].innerHTML.search(/You must select a valid target to cast/) != -1) || (texts[j].innerHTML.search(/You cannot/) != -1)) {
                                                        hitTarget++;
                                                        if (hitTarget >= (4 + maxTargets)) {
                                                                GM_setValue("hitTarget", 4);
                                                        } else {
                                                                GM_setValue("hitTarget", hitTarget);
                                                        }
                                                }
                                            	;
                                            	tempEn = parseInt(tempEn);
                                            	if(tempEn == 1){
                                                hitTarget = 5;
                                            	}
                                                //check character's status
                                                switch (texts[j].innerHTML) {
                                                        case "<b>Rohane</b>":
                                                        		console.log("Rohane's turn");
                                                        		var l = 0;
                                                        		var enemies = true;
                                                       			for (l = 0; l < elements.length; l++) {
                                                                        //makes sure the script isn't checking enemies hp
                                                                        if (elements[l].src == "http://images.neopets.com/nq2/x/donothing.gif") {
                                                                                enemies = false;
                                                                        }
                                                                        //if checking allies HP
                                                                        if (enemies) {
                                                                                //is the picture a health bar?
                                                                                if (elements[l].src == "http://images.neopets.com/nq2/x/exp_red.gif") {
                                                                                        if (elements[l].width < 8) //45 is full health
                                                                                        {
                                                                                            if(tempEn > 1){
                                                                                                hitTarget++;
                                                                                            	break;
                                                                                            }
                                                                                        }
                                                                                }
                                                                        }
                                                                }
                                                                if ((texts[j + 1].color == "#d0d000") || (texts[j + 1].color == "red")) {
                                                                        fact = 5
                                                                        var bleh;
																		for(bleh = 0; bleh < texts.length; ++bleh)
                                                                        {
                                                                                if (texts[bleh].innerHTML == "You don't have any of that item!<br>")
                                                                                {
                                                                                    	var hTem = parseInt(healingPot)%10;
                                                                                    	if(hTem == 4)
                                                                                        {
                                                                                         healingPot = healingPot + 7;
                                                                                        }
                                                                                    	else
                                                                                        {
																						++healingPot;
                                                                                        }
                                                                                        GM_setValue("healingPot",healingPot);                                                                      
                                                                                        healingItem = GM_getValue("healingItem", healingPot);
                                                                                }
                                                                                
                                                                        }
                                                                        useid = healingItem;
                                                                }
                                                                break;
                                                        case "<b>Mipsy</b>":
                                                                nxactor = 2;
                                                                console.log("Mipsy's turn");
                                                        		var bs = document.getElementsByTagName('b');
                                      					 		var an = 0;
                                                                fact = 9202; //use group damage
                                                        		
                                                        		var theTimeHasCome = GM_getValue("thornsTimer");   
                                                        		var testr = parseFloat(theTimeHasCome);
                                                        		var recaste = testr + 27.5;
                                                        		for (an = 0; bs.length; ++an){
                                                                    if(bs[an].innerHTML == "Elapsed Time:"){
                                                   						   var emm = bs[an].nextSibling.data;
                                                                           var almost = emm.split(" ");
                                                                           var recastf = parseFloat(almost[1]);	
                                                                       		 if(recastf > recaste){
                                                                        	 GM_setValue("isThorned",false);
                                                                       		 }
                                                                           break;
                                                                    }
                                                                    
                                                                }
                                                       			if (!isThorned && isHasted) {
                                                                        //fact = 9205;
                                                                        GM_setValue("isThorned", true);
                                            							for (an = 0; bs.length; ++an){
                                                						if(bs[an].innerHTML == "Elapsed Time:"){
                                                   						   emm = bs[an].nextSibling.data;
                                                                           var almost = emm.split(" ");
                                                 						   GM_setValue("thornsTimer",almost[1]);
                                                                            
                                                 						   break;
                                             						   	}	
                                            			
                                         						   	 }
                                                			
                                                                }
                                                                theTimeHasCome = GM_getValue("hasteTimer");   
                                                        		testr = parseFloat(theTimeHasCome);
                                                        		recaste = testr + 27.5;
                                                        		for (an = 0; bs.length; ++an){
                                                                    if(bs[an].innerHTML == "Elapsed Time:"){
                                                   						   var emm = bs[an].nextSibling.data;
                                                                           var almost = emm.split(" ");
                                                                           var recastf = parseFloat(almost[1]);	
                                                                       		 if(recastf > recaste){
                                                                        	 GM_setValue("isHasted",false);
                                                                       		 }
                                                                           break;
                                                                    }
                                                                    
                                                                }
                                                                if (!isHasted) {
                                                                        fact = 9203;
                                                                        GM_setValue("isHasted", true);
                                            							for (an = 0; bs.length; ++an){
                                                						if(bs[an].innerHTML == "Elapsed Time:"){
                                                   						   emm = bs[an].nextSibling.data;
                                                                           var almost = emm.split(" ");
                                                 						   GM_setValue("hasteTimer",almost[1]);
                                                                            
                                                 						   break;
                                             						   	}	
                                            			
                                         						   	 }
                                                			
                                                                }
                                                                if ((texts[j + 1].color == "#d0d000") || (texts[j + 1].color == "red")) {
                                                                        fact = 5;
                                                                   		var bleh;
																		for(bleh = 0; bleh < texts.length; ++bleh)
                                                                        {
                                                                                if (texts[bleh].innerHTML == "You don't have any of that item!<br>")
                                                                                {
																						var hTem = parseInt(healingPot)%10;
                                                                                    	if(hTem == 4)
                                                                                        {
                                                                                         healingPot = healingPot + 7;
                                                                                        }
                                                                                    	else
                                                                                        {
																						++healingPot;
                                                                                        }
                                                                                        GM_setValue("healingPot",healingPot);                                                                      
                                                                                        healingItem = GM_getValue("healingItem", healingPot);
                                                                                }
                                                                                
                                                                        }
                                                                        useid = healingItem;
                                                                }
                                                                break;
                                                        case "<b>Talinia</b>":
                                                                var multipleTargets = /Multiple Targets/;
                                                                var k = 0;
                                                                var links = document.getElementsByTagName('a');
                                                                for (k = 0; k < links.length; k++) {
                                                                        if ((links[k].innerHTML.search(multipleTargets)) != -1) {
                                                                                fact = 9302;
                                                                        }
                                                                }
                                                                nxactor = 3;
                                                                if ((texts[j + 1].color == "#d0d000") || (texts[j + 1].color == "red")) {
                                                                        fact = 5;
																		var bleh;
																		for(bleh = 0; bleh < texts.length; ++bleh)
                                                                        {
                                                                                if (texts[bleh].innerHTML == "You don't have any of that item!<br>")
                                                                                {
																						var hTem = parseInt(healingPot)%10;
                                                                                    	if(hTem == 4)
                                                                                        {
                                                                                         healingPot = healingPot + 7;
                                                                                        }
                                                                                    	else
                                                                                        {
																						++healingPot;
                                                                                        }
                                                                                        GM_setValue("healingPot",healingPot);                                                                      
                                                                                        healingItem = GM_getValue("healingItem", oomph);
                                                                                }
                                                                                
                                                                        }
                                                                        useid = healingItem;
                                                                }
                                                                break;
                                                        case "<b>Velm</b>":
                                                                var l = 0; // loops to see if velm is wasting his time healing
                                                        		//var k = 0;
                                                        		var fullhp = 0; //if its 4 then all 4 people are fully healed
                                                                var allies = false;
                                                        
                                                        
                                                        		var bs = document.getElementsByTagName('b');
                                      					 		var an = 0;
                                                        		var theTimeHasCome = GM_getValue("shieldTimer");   
                                                        		var testr = parseFloat(theTimeHasCome);
                                                        		var recaste = testr + 27.5;
                                                        		for (an = 0; bs.length; ++an){
                                                                    if(bs[an].innerHTML == "Elapsed Time:"){
                                                   						   var emm = bs[an].nextSibling.data;
                                                                           var almost = emm.split(" ");
                                                                           var recastf = parseFloat(almost[1]);	
                                                                       		 if(recastf > recaste){
                                                                        	 GM_setValue("isShielded",false);
                                                                       		 }
                                                                           break;
                                                                    }
                                                                    
                                                                }
                                                        
                                                        
                                                                //loop through all pictures if it's velm's turn
                                                                for (l = 0; l < elements.length; l++) {
                                                                        //makes sure the script isn't checking enemies hp
                                                                        if (elements[l].src == "http://images.neopets.com/nq2/x/donothing.gif") {
                                                                                allies = true;
                                                                        }
                                                                        //if checking allies HP
                                                                        if (allies) {
                                                                                //is the picture a health bar?
                                                                                if (elements[l].src == "http://images.neopets.com/nq2/x/exp_green.gif") {
                                                                                        if (elements[l].width > 37) //45 is full health
                                                                                        {
                                                                                                fullhp++;
                                                                                        }
                                                                                }
                                                                        }
                                                                }
                                                                nxactor = 4;
                                                                fact = 9402; // velm heals, trust me you will need this
                                                                if (fullhp == 4) {
                                                                        fact = GM_getValue("VelmAction", 9405);
                                                                }
                                                        		if (!isShielded) {
                                                                        fact = 9403;
                                                                        GM_setValue("isShielded", true);
                                            							for (an = 0; bs.length; ++an){
                                                						if(bs[an].innerHTML == "Elapsed Time:"){
                                                   						   emm = bs[an].nextSibling.data;
                                                                           var almost = emm.split(" ");
                                                 						   GM_setValue("shieldTimer",almost[1]);
                                                                            
                                                 						   break;
                                             						   	}	
                                            			
                                         						   	 }
                                                			
                                                                }
                                                        	
                                                        		//var links = document.getElementsByTagName('a');
                                                                //for (k = 0; k < links.length; k++) {
                                                                //        if ((links[k].innerHTML.search(multipleTargets)) != -1) {
                                                                //                fact = 9302;
                                                                //        }
                                                                //}
                                                                if ((texts[j + 1].color == "#d0d000") || (texts[j + 1].color == "red")) {
                                                                        fact = 5;
																		var bleh;
																		for(bleh = 0; bleh < texts.length; ++bleh)
                                                                        {
                                                                                if (texts[bleh].innerHTML == "You don't have any of that item!<br>")
                                                                                {
																						var hTem = parseInt(healingPot)%10;
                                                                                    	if(hTem == 4)
                                                                                        {
                                                                                         healingPot = healingPot + 7;
                                                                                        }
                                                                                    	else
                                                                                        {
																						++healingPot;
                                                                                        }
                                                                                        GM_setValue("healingPot",healingPot);                                                                      
                                                                                        healingItem = GM_getValue("healingItem", healingPot);
                                                                                }
                                                                                
                                                                        }
                                                                        useid = healingItem;
                                                                }
 
                                                                break;
 
                                                }
                                        }
                                        document.location.href = "http://www.neopets.com/games/nq2/nq2.phtml?&fact=" + fact + "&target=" + hitTarget + "&use_id=" + useid + "&nxactor=" + nxactor;
                                } else {
                                        document.location.href = "javascript:setaction(4); document.ff.submit()";
                                }
                                break;
                        case "http://images.neopets.com/nq2/x/com_end.gif":
                        		GM_setValue("runCheck1",true);
                                document.location.href = "javascript:setaction(2); document.ff.submit()";
                                break;
                        case "http://images.neopets.com/nq2/x/tomap.gif":
                                if (!isFleeing) {
 
                                        GM_setValue("hitTarget", 5);
                                        GM_setValue("isHasted", false);
                                }
                                document.location.href = "http://www.neopets.com/games/nq2/nq2.phtml?finish=1";
                                break;
                        case "http://images.neopets.com/nq2/x/com_next.gif":
                                document.location.href = "javascript:setaction(1); document.ff.submit();";
                                break;
                        case "http://images.neopets.com/nq2/x/nav.gif":
                                if (!isTraining) {
                                        if ((GM_getValue("Path").length) != pathIndex) {
                                                //alert("javascript:dosub(" + GM_getValue("Path")[pathIndex] + ");");
                                                document.location.href = "http://www.neopets.com/games/nq2/nq2.phtml?act=move&dir=" + GM_getValue("Path")[pathIndex];
                                                GM_setValue("pathIndex", pathIndex + 1);
                                        } else {
                                                alert("You have arrived at your destination. Please disable this script to take control.");
                                                GM_setValue("pathIndex", 0)
                                        }
                                } else {
                                        pathIndex = -1;
                                        GM_setValue("pathIndex", pathIndex);
                                        if (GM_getValue("goLeft")) {
                                                document.location.href = "javascript:dosub(3)";
                                                GM_setValue("goLeft", false);
                                        } else {
                                                document.location.href = "javascript:dosub(4)";
                                                GM_setValue("goLeft", true);
                                        }
                                }
                                break;
                }
        }
}
//window.setTimeout(function() { document.location.href="http://www.neopets.com/games/nq2/nq2.phtml" }, 20000);