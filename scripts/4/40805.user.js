// ==UserScript==
// @name           idragonZ
// @namespace      Facebook
// @include        http://apps.facebook.com/dragonwars/*
// @description    auto dragon
// @exclude        http://apps.facebook.com/dragonwars/epic.php
// @exclude        http://apps.facebook.com/dragonwars/properties.php
// @exclude        http://apps.facebook.com/dragonwars/recruit*
// @exclude        http://apps.facebook.com/dragonwars/stats*
// @exclude        http://apps.facebook.com/dragonwars/inventory*
// @exclude        http://apps.facebook.com/dragonwars/hits*
// ==/UserScript==
// SET VARIABLES  ************************************************
var done = 0 ;
var goldvar = 500000 ;
var settingsOpen = false;
var logOpen      = false;
var delay = 3000 ;
var appName = 'dragonwars';
var appID = 'app17217211796';
var missions = new Array(
    ["Steal a Dragon's Egg ",1],
    ["Kill One Skeleton and Claim the Treasure Chest(3D)",1],    
    ["Raid the Dungeon Crypts ",3],
    ["Destroy the Undead",5],
    ["Destroy skeleton patrols(3D)",6],
    ["Shoot Down Harpies",7],
    ["Banish Skeletons from the Graveyard",1],
    ["Rid the Monastery of Rabid Wolves",2],
    ["Cleanse Goblin-Infested Caves",2],
    ["Defeat Crypt Guardians(3D)",10],
    ["Open the gate of Draconis(3D)",5],
    ["Behead a Vile Witch",3],    
    ["Raid a Sorceror's Tower",3],
    ["Plunder a Yeti's Lair",4],
    ["Lead the Hunt for a Manticore",10],
    ["Attack Trolls in their Lair ",15],
    ["Clear out the Ghoul-Infested Granary",5],
    ["Capture the Rogue Executioner",5],
    ["Slay the Goblin General",5],
    ["Hunt Down a Giant Bull Spider",6],
    ["Repel Border Raiders",18],
    ["Battle a Marauding Adult Dragon",25],
    ["Capture the Isle of the Ancient Troll",7],
    ["Destroy the Undead Fortress",8],
    ["Map the Ancient Catacombs",10],
    ["Vanquish a Fire-Breathing Dragon",13],
    ["Invade the Palace of the Burning Sands",15],
    ["Repel the Dark Mage's Army",25],
    ["Battle against Valkyries in Valhalla",25],
    ["Protect your Nation against a Marauding Army",35]
    // more will follow soon...
        );
var XMLHttpFactories = [
    function () {return new XMLHttpRequest()},
    function () {return new ActiveXObject("Msxml2.XMLHTTP")},
    function () {return new ActiveXObject("Msxml3.XMLHTTP")},
    function () {return new ActiveXObject("Microsoft.XMLHTTP")}
];
// UPDATE MESSAGE LOGS  ************************************
if (document.body.innerHTML.indexOf('message_body') != -1)
{       
  var boxes = document.getElementById(appID+'_content_row').getElementsByTagName('span');
    var messagebox = boxes[0];
    if(messagebox.innerHTML.indexOf('You just bought') != -1)
    {
        var item = messagebox.innerHTML.split('You just bought')[1].split('for')[0];
        addToLog("You just bought " + item);
    }
    else if(messagebox.innerHTML.indexOf('You successfully dominated') != -1)
    {
        var minion = messagebox.innerHTML.split('You successfully dominated a')[1];
        minion = minion.split('.')[0];
        addToLog("You successfully dominated " + minion);
    }
    else if(messagebox.innerHTML.indexOf('Rare Ability') != -1)
    {
        var ability = messagebox.innerHTML.split('bold;">')[1].split('</span>')[0];
        addToLog("acquired Rare Ability " + ability);
    }
    else if(messagebox.innerHTML.indexOf('You withdrew') != -1)
    {
        var deposit    = messagebox.innerHTML.split('blood.gif">')[1];
        deposit = deposit.replace(",","");
        deposit = deposit.replace(",","");
        deposit = parseInt(deposit);
        addToLog("withrew " + deposit);
    }
    else if(messagebox.innerHTML.indexOf('deposited and stored safely') != -1)
    {
        var deposit    = messagebox.innerHTML.split('blood.gif">')[1];
        deposit = deposit.replace(",","");
        deposit = deposit.replace(",","");
        deposit = parseInt(deposit);
        addToLog("deposit " + deposit);
    }
    else if(messagebox.innerHTML.indexOf('more health') != -1)
    {
        var addHealth = messagebox.innerHTML.split('You get')[1].split('more health')[0];
        var cost = 0;
        if(messagebox.innerHTML.indexOf('blood.gif">') != -1)
            cost = messagebox.innerHTML.split('blood.gif">')[1];
        cost     = cost.replace(",","");
        cost     = cost.replace(",","");
        cost     = parseInt(cost    );
        addToLog("health +"+ addHealth + " for " + cost    );
    }
    else if(messagebox.innerHTML.indexOf('You fought with') != -1)
    {
        if(GM_getValue('freshMeat', '') != "checked")
        {
            var user = messagebox.innerHTML.split('user=')[1];
            var battleResult = document.evaluate("//span[@class='good']",document,null,9,null).singleNodeValue;
            if(battleResult!=null && battleResult.innerHTML.indexOf('blood.gif">') != -1)
            {
                var cost = battleResult.innerHTML.split('blood.gif">')[1];    
                cost = cost.replace(",","");
                cost = cost.replace(",","");
                addToLog("fight "+ parseInt(user) + " WON " +parseInt(cost));
            }
            battleResult = document.evaluate("//span[@class='bad']",document,null,9,null).singleNodeValue;
            if(battleResult!=null && battleResult.innerHTML.indexOf('blood.gif">') != -1)
            {
                var cost = battleResult.innerHTML.split('blood.gif">')[1];    
                cost = cost.replace(",","");
                cost = cost.replace(",","");
                addToLog("fight "+ parseInt(user) + " LOST " +parseInt(cost));
            }
            for (var i=1;i<boxes.length;i++)
                if(boxes[i].innerHTML.indexOf('found')!= -1)
                    addToLog("found "+ boxes[i].innerHTML.split('found ')[1].split('while fighting ')[0]);
        }
    }
    else if(messagebox.innerHTML.indexOf('Your opponent is already dead or too weak to fight') != -1)
    {
        var opponents = GM_getValue('fightList', '').split("\n");
        
        var opponentList="";
        for (var i=1;i<opponents.length;i++)
        {
            opponentList = opponentList+ opponents[i]+"\n";
        }
        opponentList = opponentList + opponents[0];
        GM_setValue('fightList', opponentList);
    }
    else if(messagebox.innerHTML.indexOf('You cannot heal so fast') != -1)
    {
        addToLog("couldn't heal that fast") ;    
    }
if(GM_getValue('turbo', '') == "checked")
	var done = 0 ;
else	
	var done = 2 ;
}
// GET INFO FROM REFRESHED PAGE  ************************************
    var td = document.getElementById(appID+'_stats_table').getElementsByTagName('td');
    var gold = td[0].getElementsByTagName('strong')[0].innerHTML.split('>')[1];
    gold = gold.replace(",","");
    gold = gold.replace(",","");
    gold = parseInt(gold);
    var health =parseInt(document.getElementById( appID+'_current_health').innerHTML);
    var energy = parseInt(document.getElementById( appID+'_current_energy').innerHTML);
    var rage =parseInt(document.getElementById( appID+'_current_stamina').innerHTML);
    var alliance =  parseInt(document.body.innerHTML.split('my alliance (')[1]);
// AUTHOR *************
var author = document.createElement("div");
    if(GM_getValue('autoClick', '') == "checked")
        author.innerHTML = "robert palmer aglobetraveller@hotmail.com  *v4.0*23Jan09*";
     else
        author.innerHTML = "";
        author.setAttribute("style", "position: absolute; top: 30px; left: 5px; font-family: tahoma; font-size: 6pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");
        document.body.appendChild(author);
// REVIEW *************
var review = document.createElement("div");
    if(GM_getValue('autoClick', '') == "checked")
        review.innerHTML = "";
     else
	review.innerHTML = "click here to review iDragon";
        review.setAttribute("style", "position: absolute; top: 25px; left: 100px; font-family: tahoma; font-size: 10pt; color: #FF0000; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");
        review.addEventListener('click', getreview, false);
        document.body.appendChild(review);
// AUTO RUN BUTTON *************************************    
    var pauseButton = document.createElement("div");
    if(GM_getValue('autoClick', '') == "checked")
       pauseButton.innerHTML = "iDragon";
     else
        pauseButton.innerHTML = "PAUSED";
        pauseButton.setAttribute("style", "position: absolute; left: 5px; top: 41px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");
        pauseButton.addEventListener('click', togglePause, false);
        document.body.appendChild(pauseButton);
// SETTINGS BUTTON ************************************    
 var settingsButton = document.createElement("div");
   if(GM_getValue('autoClick', '') == "checked")
        settingsButton.innerHTML = "";
      else
        settingsButton.innerHTML = "START";
        settingsButton.setAttribute("style", "position: absolute; left: 5px; top: 25px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");
        settingsButton.addEventListener('click', toggleSettings, false);
        document.body.appendChild(settingsButton);
// LOG BUTTON  ****************************************
    var viewLogButton = document.createElement("div");
	if(GM_getValue('autoClick', '') == "checked")
        viewLogButton.innerHTML = "";
	else
	viewLogButton.innerHTML = "view rs log";
        viewLogButton.setAttribute("style", "position: absolute; right: 5px; top: 25px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");
        viewLogButton.addEventListener('click', toggleLogBox, false);
        document.body.appendChild(viewLogButton);
// CLEAR LOG BUTTON  *****************************************
    var clrLogButton = document.createElement("div");
	if(GM_getValue('autoClick', '') == "checked")
	clrLogButton.innerHTML = "";
	else
        clrLogButton.innerHTML = "clear log";
        clrLogButton.setAttribute("style", "position: absolute; right: 5px; top: 43px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");
        clrLogButton.addEventListener('click', clearLog, false);
        document.body.appendChild(clrLogButton);
// SETTINGS BOX *****************************************
    var settingsBox = document.createElement("div");
        settingsBox.setAttribute("style", "position: absolute; left: 5px; top: 43px; width: 330px; height: 450px; background-color: #87CEEB; font-family: tahoma; font-size: 10pt; text-align: left; padding: 5px; border: 1px dotted; visibility: hidden; z-index: 100;");
        document.body.appendChild(settingsBox);
// LOG BOX  **************************************
    var logBox = document.createElement("div");
        logBox.innerHTML = GM_getValue('itemLog', 'log empty');
        logBox.setAttribute("style", "position: absolute; overflow: scroll; right: 5px; top: 61px; width: 350px; height: 250px; background-color: #87CEEB; font-family: tahoma; font-size: 10pt; text-align: left; padding: 5px; border: 1px dotted; visibility: hidden; z-index: 999999;");
        document.body.appendChild(logBox);
// SETTINGS BOX CONTENTS ********************************************************************************
   var autoClick = document.createElement("div");
        autoClick.innerHTML = "iDRAGON auto refresh: <input type='text' style='border: none; text-align: center; ' value='"+GM_getValue('r1', '5')+"' id='r1' size='2'> seconds.";
        autoClick.setAttribute("style", "position: absolute; top: 2px; left:12px;");
        settingsBox.appendChild(autoClick);
// HEAL  **************
   var autoHeal = document.createElement("div");
        autoHeal.innerHTML  = "<input type='checkbox' id='autoHeal' value='checked' "+GM_getValue('autoHeal', 'checked')+"> auto heal:";
        autoHeal.innerHTML  += " <input type='text' style='border: none; width: 30px; text-align: center; ' value='"+GM_getValue('healthLevel', '90')+"' id='healthLevel' size='1'> health.";
        autoHeal.setAttribute("style", "position: relative; top: 15px;");
        settingsBox.appendChild(autoHeal);
// BANK  ****************
   var autoBank = document.createElement("div");
         autoBank.innerHTML  = "<input type='checkbox' id='autoBank' value='checked' "+GM_getValue('autoBank', 'checked')+"> auto bank:";
         autoBank.innerHTML  +=" leave <input type='text' style='border: none; width: 100px; text-align: center; ' value='"+GM_getValue('bankConfig', '0')+"' id='bankConfig' size='5'>"+" gold unbanked.";
         autoBank.setAttribute("style", "position: relative; top: 15px;");
         settingsBox.appendChild(autoBank);
// QUESTS  ******************
   var autoMission = document.createElement("div");
         autoMission.innerHTML  = "<input type='checkbox' id='autoMission' value='checked' "+GM_getValue('autoMission', 'checked')+"> auto quests.";
         autoMission.setAttribute("style", "position: relative; top: 15px");
         settingsBox.appendChild(autoMission);
// QUEST SELECT ********************
   var selectMission = document.createElement("select");
        selectMission.innerHTML  = "mission <input type='combobox' id='selectMission'" ;
		var choice = document.createElement('option');
		for each (var mission in missions )
		{
			choice = document.createElement('option');
			choice.value = mission[0];
			choice.appendChild(document.createTextNode(mission[0]));
			selectMission.appendChild(choice);
		}
		selectMission.selectedIndex = GM_getValue('selectMission', 1);
		selectMission.setAttribute("style", "position: relative; top: 15px");
        settingsBox.appendChild(selectMission);
// BATTLE  *****************		 
   var autoFight = document.createElement("div");
        autoFight.innerHTML  = "<input type='checkbox' id='autoFight' value='checked' "+GM_getValue('autoFight', 'checked')+"> auto fight selected dragon slayers:"; 
        autoFight.setAttribute("style", "position: relative; top: 15px;");
        settingsBox.appendChild(autoFight);
   var autoHit = document.createElement("div");
        autoHit.innerHTML  = "<input type='checkbox' id='autoHit' value='checked' "+GM_getValue('autoHit', 'checked')+"> auto hit list selected dragon slayers:"; 
        autoHit.setAttribute("style", "position: relative; top: 15px;");
        settingsBox.appendChild(autoHit);
// BATTLE SELECTED PLAYERS ---- NOTE ENTER ONE FACE BOOK ID NUMBER PER LINE ********
    var fightList = document.createElement("div");
        fightList.innerHTML  = "fb user code <br /><textarea style='border: none; width: 75px; height: 180px;' id='fightList'>"+GM_getValue('fightList', '')+"</textarea>";
        fightList.setAttribute("style", "position: relative; left: 25px; top: 15px;");
        settingsBox.appendChild(fightList);
  var fightName = document.createElement("div");
        fightName.innerHTML  = "-----name (optional)----- <br /><textarea style='border: none; width: 140px; height: 180px;' id='fightName'>"+GM_getValue('fightName', '')+"</textarea>";
        fightName.setAttribute("style", "position: absolute; right: 40px; bottom: 95px;");
        settingsBox.appendChild(fightName);
   var freshMeat = document.createElement("div");
        freshMeat.innerHTML  ="<input type='checkbox' id='freshMeat' value='checked' "+GM_getValue('freshMeat', 'checked')+"> auto fight random.";
        freshMeat.setAttribute("style", "position: relative; top: 15px;");
        settingsBox.appendChild(freshMeat);
var autoStamina = document.createElement("div"); 
        autoStamina.innerHTML = "keep <input type='text' style='border: none; text-align: center; ' value='"+GM_getValue('fightStamina', '10')+"'id='fightStamina' size='2'>"+" stamina.";
        autoStamina.setAttribute("style", "position: relative; top: 15px; left:10px;");
        settingsBox.appendChild(autoStamina);
 var turbo = document.createElement("div");
        turbo.innerHTML  ="<input type='checkbox' id='turbo' value='checked' "+GM_getValue('turbo', 'checked')+"> Turbo iDragon";
        turbo.setAttribute("style", "position: relative; top: 15px;");
        settingsBox.appendChild(turbo);
// SAVE BUTTON ********************  	
   var saveButton = document.createElement("div");
        saveButton.innerHTML  = "<button>++++++++ iDragon ++++++++</button>";
        saveButton.addEventListener('click', saveSettings, false);
        saveButton.setAttribute("style", "position: absolute; bottom: 15px; right: 70px;");
        settingsBox.appendChild(saveButton);
// PRIORITISED LOGIC FOR iDRAGON  ******************************************************************
// AUTO HEAL  ****************
if (health>GM_getValue('maxHealth', 0))
{
	GM_setValue('maxHealth', health);
}
if(GM_getValue('autoClick', '') == "checked"  && GM_getValue('autoHeal', '') == "checked" && health<GM_getValue('healthLevel', '') && done == "0")
   {
        if (location.href.indexOf(appName+'/hospital') != -1)
	    {
            setTimeout(function(){document.getElementsByTagName('form')[1].submit();},delay);
	    var done = 1 ;
	    GM_setValue('healNow', 0);
	     }
        else
      	     {
             window.location = "http://apps.facebook.com/"+appName+"/hospital.php";
             return;
	     }
   }
// AUTO BANK ************* 50,000 VARIANCE BEFORE BANKING AND HEALTH ABOVE REHEAL LEVEL
if(GM_getValue('autoClick', '') == "checked" && GM_getValue('autoBank', '') == "checked" && health>GM_getValue('healthLevel', '') && done == "0")
   {
   	 if(gold>parseInt(GM_getValue('bankConfig', 100000000))+goldvar)
    	 {
        	if (location.href.indexOf(appName+'/bank') != -1)
        	{
            		var sform = document.getElementsByTagName('form')[2];
            		document.getElementsByName("amount")[1].value = gold-parseInt(GM_getValue('bankConfig', 100000000));
			setTimeout(function(){sform.submit();},delay);
			var done = 1 ;
       		}
       		else
                {
           		window.location = "http://apps.facebook.com/"+appName+"/bank.php";
                	return;
                }
    	 }
        else if(gold<parseInt(GM_getValue('bankConfig', 100000000))-goldvar)
    	{
        	if (location.href.indexOf(appName+'/bank') != -1)
        	{
               		var sform = document.getElementsByTagName('form')[2];
           		document.getElementsByName("amount")[1].value = "";
                        var sform = document.getElementsByTagName('form')[1];
            		document.getElementsByName("amount")[0].value = parseInt(GM_getValue('bankConfig', 100000000))-gold;
            		setTimeout(function(){sform.submit();},delay);
			var done = 1 ;
        	}
        	else
        	{
            		window.location = "http://apps.facebook.com/"+appName+"/bank.php";
            		return;
        	}
        }
    }
// AUTO QUESTS 
if(GM_getValue('autoClick', '') == "checked" && health>GM_getValue('healthLevel', '') && GM_getValue('autoMission', '') == "checked" && energy>=missions[GM_getValue('selectMission', 1)][1] && done == "0")
   {
        if (location.href.indexOf(appName+'/jobs') != -1)
        	{
            	var sform = document.getElementsByTagName('form')[GM_getValue('selectMission', 1)+1];
            	setTimeout(function(){sform.submit();},delay);
		var done = 1 ;
        	}
        else
         	{
                window.location = "http://apps.facebook.com/"+appName+"/jobs.php";
             	return;
                }   
   }
// AUTO HIT LIST
{
	if(GM_getValue('autoClick', '') == "checked" && GM_getValue('autoHit', '') == "checked" && 0<GM_getValue('fightList', '').length && rage>GM_getValue('fightStamina', '') && done == "0")
	{
		var hitNow = GM_getValue('hitSlayer', 0) ;
		if(hitNow>10)
			{
			var fightAttempt = parseInt( GM_getValue('fightList', '') ) ;
			GM_setValue('FightAttempt', fightAttempt ) ;
			if (location.href.indexOf(appName+'/hits.php?action=set&target_id='+fightAttempt) != -1)
        			{
				var sform = document.getElementsByTagName('form')[1];
        			setTimeout(function(){sform.submit();},delay);
				var done = 1 ;
				GM_setValue('hitSlayer', 0);
       				}
        		else
        			{
            			window.location = "http://apps.facebook.com/"+appName+"/hits.php?action=set&target_id="+fightAttempt ;
            			return;
        			}
			}
		else
		if(hitNow<11)
			{
				var hitNow = hitNow+ 1;
				GM_setValue('hitSlayer', hitNow);
			}
	}
}
// AUTO FIGHT
if(GM_getValue('autoClick', '') == "checked" && health>GM_getValue('healthLevel', '') && rage>GM_getValue('fightStamina', '') && done == "0")
{
	//SHARE FIGHT
	if(GM_getValue('autoFight', '') == "checked" && 0<GM_getValue('fightList', '').length && GM_getValue('freshMeat', '') == "checked")
		{
		var selectFight = 0 ;
		selectFight = Math.floor(100 * Math.random()) ;
		if (selectFight > 50)
  			{
    			// FIGHT LIST
                     		var fightAttempt = parseInt( GM_getValue('fightList', '') ) ;
                 		GM_setValue('FightAttempt', fightAttempt ) ;
                 		setTimeout("document.location = '"+"http://apps.facebook.com/"+appName+"/fight.php?opponent_id="+fightAttempt+"&action=attack"+"'", delay ) ;
				var done = 1 ;
                   	}
        	else
       			{
			// FRESH MEAT
				setTimeout("document.location ='" + "http://apps.facebook.com/"+appName+"/fight.php?opponent_id= &action=face_friend_invite"+"'", delay);
				var done = 1 ;
        		}
 		}
        //FIGHT OPPONENT ONLY
	else if(GM_getValue('autoFight', '') == "checked" && 0<GM_getValue('fightList', '').length)
		{
                     	var fightAttempt = parseInt( GM_getValue('fightList', '') ) ;
                 	GM_setValue('FightAttempt', fightAttempt ) ;
               		setTimeout("document.location = '"+"http://apps.facebook.com/"+appName+"/fight.php?opponent_id="+fightAttempt+"&action=attack"+"'", delay ) ;
			var done = 1 ;
                 }
	//FRESH MEAT ONLY - no opponents to fight
        else if(GM_getValue('freshMeat', '') == "checked")
		{
			// setTimeout("document.location ='" + "http://apps.facebook.com/"+appName+"/fight.php?opponent_id= &action=face_friend_invite"+"'", delay);
			
			if (location.href.indexOf(appName+'/fight') != -1)
			{
				var opponents  = document.evaluate("//input[@name='opponent_id']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);//.singleNodeValue;
				var fightIndex = Math.floor(Math.random()*opponents.snapshotLength);
				var fightNode =opponents.snapshotItem(fightIndex).parentNode.parentNode.parentNode; 
				var opponentLevel =  parseInt(fightNode.innerHTML.split('Level ')[1]);
				var opponentClan = parseInt(fightNode.innerHTML.split('groupsize">')[1]);

				if(opponentLevel< 130 && opponentClan< 502)
					{
					setTimeout("document.location = '"+"http://apps.facebook.com/"+appName+"/fight.php?opponent_id="+opponents.snapshotItem(fightIndex).value+"&action=attack"+"'", delay);
					var done = 1 ;
					}
				else
					setTimeout("document.location ='" + "http://apps.facebook.com/"+appName+"/fight.php"+"'", delay);
			}
			else
				window.location = "http://apps.facebook.com/"+appName+"/fight.php";
		}
}
// NOTHING TO DO **************************************
 if(GM_getValue('autoClick', '') == "checked" && done == "0")
   {
	var timewait = ( GM_getValue('r1', '3') * 1000) ;	
	setTimeout("window.location = '"+"http://apps.facebook.com/"+appName+"/index.php"+"'",timewait);
   }
// SHOW HITLIST AFTER MESSAGE AND BEFORE NEXT TASK **************************************
 if(GM_getValue('autoClick', '') == "checked" && done == "2")
   {
	var timewait = ( GM_getValue('r1', '3') * 1000) ;	
	setTimeout("window.location = '"+"http://apps.facebook.com/"+appName+"/index.php"+"'",timewait);
   }
// FUNCTIONS  *************************************************************************
function getreview()
{
	alert("thanks for taking the time to give iDragons a review. Best wishes. Rob")	
	window.open('http://userscripts.org/scripts/reviews/40805');
}
function togglePause()
{
 if(GM_getValue('autoClick', '') == "checked")
        {
        GM_setValue('autoClick', '0');
        document.location = location.href;    
        }
    else
        {
        settingsOpen = true;
        }
}
function toggleSettings()
{
    if(settingsOpen == false)
    {
        settingsOpen = true;
        settingsButton.innerHTML = "close settings";
        settingsBox.style.visibility = "visible";
    }
    else
    {
        settingsOpen = false;
        settingsButton.innerHTML = "START";
        settingsBox.style.visibility = "hidden";
    }
}
function saveSettings()
{
        GM_setValue('autoClick', 'checked');
 if(document.getElementById('autoHeal').checked == true)
        GM_setValue('autoHeal', 'checked');
    else
        GM_setValue('autoHeal', '0');
 if(document.getElementById('autoBank').checked == true)
        GM_setValue('autoBank', 'checked');
    else
        GM_setValue('autoBank', '0');
 if(document.getElementById('autoFight').checked == true)
        GM_setValue('autoFight', 'checked');
    else
        GM_setValue('autoFight', '0');  
 if(document.getElementById('autoHit').checked == true)
        GM_setValue('autoHit', 'checked');
    else
        GM_setValue('autoHit', '0'); 
 if(document.getElementById('freshMeat').checked == true)
        GM_setValue('freshMeat', 'checked');
    else
        GM_setValue('freshMeat', '0');
 if(document.getElementById('autoMission').checked == true)
        GM_setValue('autoMission', 'checked');
    else
        GM_setValue('autoMission', '0');
 if(document.getElementById('turbo').checked == true)
        GM_setValue('turbo', 'checked');
    else
        GM_setValue('turbo', '0');
    GM_setValue('healthLevel', document.getElementById('healthLevel').value);
    GM_setValue('bankConfig', document.getElementById('bankConfig').value);
    GM_setValue('r1', document.getElementById('r1').value);
    GM_setValue('fightList', document.getElementById('fightList').value);
    GM_setValue('fightName', document.getElementById('fightName').value);
    GM_setValue('fightStamina', document.getElementById('fightStamina').value);
    GM_setValue('selectMission', selectMission.selectedIndex );
    GM_setValue('hitSlayer', 0);
    GM_setValue('healNow', 0);
    GM_setValue('maxHealth', 0);
    document.location = location.href;
}
function addToLog(line)
{
    var currentTime = new Date()
    var timestamp = currentTime.getDate()+ "/" + currentTime.getMonth()+ "/" +currentTime.getFullYear() +" " +currentTime.getHours() + ":" + currentTime.getMinutes()+" ";
    GM_setValue('itemLog', GM_getValue('itemLog', '')+ timestamp + line+"<br />");
}
function clearLog()
{
    GM_setValue('itemLog', '');
    logBox.innerHTML = "";
}
function toggleLogBox()
{
    if(logOpen == false)
    {
        logOpen = true;
        viewLogButton.innerHTML = "hide rs log";
        logBox.style.visibility = "visible";
    }
    else
    {
        logOpen = false;
        viewLogButton.innerHTML = "view rs log";
        logBox.style.visibility = "hidden";
    }
}
function createXMLHTTPObject() {
    var xmlhttp = false;
    for (var i=0;i<XMLHttpFactories.length;i++) {
        	try {
          		  xmlhttp = XMLHttpFactories[i]();
       		 }
        	catch (e) {
            		continue;
        	}
        	break;
    }
    return xmlhttp;
}
