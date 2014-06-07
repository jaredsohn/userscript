// ==UserScript==
// @name           Facebook Mafia Wars
// @namespace      mafiawars
// @description    Mafia Wars
// @include        http://apps.facebook.com/inthemafia/*
// @include        http://apps.new.facebook.com/inthemafia/*
// @version 0.4.97
// ==/UserScript==

// 0.3.7 updated regexp for various amounts


if (!initialized) {
	var settingsOpen = false;
	var logOpen      = false;
	var delay = 3000;
	var blood2Update = 120000;


	var SCRIPT = {
		url: 'http://userscripts.org/scripts/source/45080.user.js',
		version: '0.4.97',
		name: 'inthemafia',
		appID: 'app10979261223',
		presentationurl: 'http://userscripts.org/scripts/show/45080',
		controller: '/remote/html_server.php?&xw_controller=',
		action: '&xw_action=',
		opponent: '&opponent_id=',
		user: '&user_id='
	};



	// job description, energy cost, job number, tab number
	if (!missions) 
	{
		var missions = new Array(
		["Mugging",1,1,1],
		["Corner Store Hold-up",3,2,1],	 
		["Warehouse Robbery",5,3,1],
		["Auto Theft",7,4,1],
		["Beat Up Rival Gangster",2,5,1],
		["Rob a pimp",3,8,1],
		["Collect on a Loan",2,37,1],
		["Collect Protection Money",2,6,2],
		["Rough up Dealers",2,7,2],
		["Take out a Rogue Cop",3,9,2],
		["Perform a Hit",3,10,2],
		["Bank Heist",10,11,2],	 
		["Jewelry Store Job",15,12,2],
		["Hijack a Semi",8,38,2],
		["Destroy an Enemy Mob Hideout",5,13,3],
		["Kill a Protected Snitch",5,14,3],
		["Bust a Made Man Out of Prison",5,15,3],
		["Museum Break-in",18,16,3],
		["Fight a Haitian Gang",6,17,3],
		["Clip the Irish Mob's Local Enforcer",10,39,3],
		["Steal a Tanker Truck",8,40,3],
		["Federal Reserve Raid",25,18,4],	
		["Smuggle Across the Border",7,19,4],
		["Liquor Smuggling",30,22,4],	
		["Run Illegal Poker Game",20,26,4],
		["Wiretap the Cops",30,28,4],
		["Rob an Electronics Store",24,41,4],
		["Burn Down a Tenement",18,42,4],
		["Distill Some Liquor",10,23,4],
		["Manufacture Tokens",10,24,4],
		["Get a Cheating Deck",10,25,4],	
		["Overtake Phone Central",10,27,4],
		["Repel the Yakuza",13,29,5],
		["Disrupt Rival Smuggling Ring",15,30,5],
		["Invade Tong-controlled Neighborhood",25,31,5],
		["Sell Guns to the Russion Mob",25,32,5],
		["Protect your City against a Rival Family",35,33,5],
		["Assassinate a Political Figure",35,34,5],	
		["Exterminate a Rival Family",40,35,5],
		["Obtain Compromising Photos",28,43,5],
		["Frame a Rival Capo",26,44,5],
		["Steal an Air Freight Delivery",32,45,6],
		["Run a Biker Gang Out of Town",35,46,6],
		["Flip a Snitch",25,47,6],
		["Steal Bank Records",30,48,6],	
		["Loot the Police Impound",60,49,6],
		["Recruit a Rival Crew Member",30,50,6],
		["Dodge an FBI Tail",20,51,6],
		["Whack a Rival Crew Leader",28,52,6],
		["Influence a Harbor Official",50,53,7],
		["Move Stolen Merchandise",36,54,7],
		["Snuff a Rat",44,55,7],	
		["Help a fugitive Flee the Country",40,56,7],
		["Dispose of a Body",25,57,7],
		["Ransom a Businessman's Kids",60,58,7],
		["Fix the Big Game",50,59,7],
		["Steal an Arms Shipment",45,60,7],
		["Extort a Corrupt Judge",24,61,8],
		["Embezzle Funds through a phony Co",50,62,8],
		["Break Into the Armory",50,63,8],
		["Rip off the Armenian Mob",50,64,8],
		["Muscle in on a Triad Operation",45,65,8],
		["Ambush a Rival at a Sit Down",55,66,8],
		["Order a Hit on a Public Official",35,67,8],
		["Take Over an Identity Theft Ring",36,68,8],
		["Settle a Beef... Permanently",40,69,9],
		["Buy Off a Federal Agent",35,70,9],
		["Make a Deal with the Mexican Cartel",40,71,9],
		["Blackmail the District Attorney",44,72,9],
		["Shake Down a City Council Member",85,73,9],
		["Make Arrangements for a Visiting Don",40,74,9],
		["Take Control of a Casino",70,75,9],
		["Travel to the Old Country",52,76,9]
	
	);
	}

	var initialized = true;
}

var XMLHttpFactories = [
    function () {return new XMLHttpRequest()},
    function () {return new ActiveXObject("Msxml2.XMLHTTP")},
    function () {return new ActiveXObject("Msxml3.XMLHTTP")},
    function () {return new ActiveXObject("Microsoft.XMLHTTP")}
];


// reload logic
if(GM_getValue('autoClick', '') == "checked"  )
{
    var timeWait = Math.floor(parseFloat(GM_getValue('r1', '6')) + parseFloat((GM_getValue('r2', '11'))-parseFloat(GM_getValue('r1', '6')))*Math.random())*1000;
    setTimeout("document.location = '"+"http://apps.facebook.com/"+SCRIPT.name+"/index.php"+"'", timeWait);
}

// added regex logic to shorten code
// status parameters
	var mafia =  parseInt(document.body.innerHTML.split('My Mafia (')[1]);
	var cash = document.getElementById( SCRIPT.appID+'_user_cash').innerHTML;
	cash = cash.replace("$", "");
	cash = cash.replace(/,/g, '');
	cash = parseInt(cash);

	var health = parseInt(document.getElementById( SCRIPT.appID+'_user_health').innerHTML);
	var energy = parseInt(document.getElementById( SCRIPT.appID+'_user_energy').innerHTML);
	var stamina =parseInt(document.getElementById( SCRIPT.appID+'_user_stamina').innerHTML);
	var level =parseInt(document.getElementById( SCRIPT.appID+'_user_level').innerHTML);
	
// menu logic
    var settingsButton = document.createElement("div");
        settingsButton.innerHTML = "open settings";
        settingsButton.setAttribute("style", "position: absolute; left: 5px; top: 3px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");
        settingsButton.addEventListener('click', toggleSettings, false);
        document.body.appendChild(settingsButton);

	var uncheckButton = document.createElement("div");
		uncheckButton.innerHTML = "uncheck all";
		uncheckButton.setAttribute("style", "position: absolute; left: 5px; top: 21px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");
		uncheckButton.addEventListener('click', uncheckAll, false);
		document.body.appendChild(uncheckButton);

	var checkButton = document.createElement("div");
		checkButton.innerHTML = "check all";
		checkButton.setAttribute("style", "position: absolute; left: 5px; top: 39px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");
		checkButton.addEventListener('click', checkAll, false);
		document.body.appendChild(checkButton);

    var viewLogButton = document.createElement("div");
        viewLogButton.innerHTML = "view mafia log";
        viewLogButton.setAttribute("style", "position: absolute; right: 5px; top: 3px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");
        viewLogButton.addEventListener('click', toggleLogBox, false);
        document.body.appendChild(viewLogButton);

    var clrLogButton = document.createElement("div");
        clrLogButton.innerHTML = "clear log";
        clrLogButton.setAttribute("style", "position: absolute; right: 5px; top: 21px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");
        clrLogButton.addEventListener('click', clearLog, false);
        document.body.appendChild(clrLogButton);

//made the box skinnier and longer
    var settingsBox = document.createElement("div");
		settingsBox.setAttribute("style", "position: absolute; left: 5px; top: 25px; width: 280px; height: 715px; background: black url(http://mwdirectfb3.static.zynga.com/mwfb/graphics/MW_FB_Background_760.gif); font-family: tahoma; font-size: 10pt; text-align: left; padding: 5px; border: 1px dotted; visibility: hidden; z-index: 100;");
        document.body.appendChild(settingsBox);

	var mafiaLogBox = document.createElement("div");
		mafiaLogBox.setAttribute("style", "position: absolute; right: 5px; top: 25px; width: 450px; height: 715px; background: black url(http://mwdirectfb3.static.zynga.com/mwfb/graphics/MW_FB_Background_760.gif); font-family: tahoma; font-size: 10pt; text-align: left; padding: 5px; border: 1px dotted; visibility: hidden; z-index: 100;");
        document.body.appendChild(mafiaLogBox);

// made default value of clanMember unchecked
    var clanMember = document.createElement("div");
		clanMember.innerHTML  = "<input type='checkbox' id='clanMember' value='checked' "+GM_getValue('clanMember', '0')+">Avoid Fighting Mafia Families <img src='http://mwdirectfb3.static.zynga.com/mwfb/graphics/icon_mymafia.gif'/>";
        clanMember.setAttribute("style", "position: absolute; right: 150px; top: 50px;color: #FFFFFF;");
        mafiaLogBox.appendChild(clanMember);

// moved clan to right side
    var clanName = document.createElement("div");
		clanName.innerHTML = "<textarea style='border-color: #790102; background-color: #080c14; color: #AA0000; width: 180px; height: 105px;' id='clanName'>" + GM_getValue('clanName', '') + "</textarea>";
		clanName.setAttribute("style", "position: absolute; top: 75px; right: 180px;color: #FFFFFF;");
        mafiaLogBox.appendChild(clanName);

    var logBox = document.createElement("div");
        logBox.innerHTML = GM_getValue('itemLog', 'log empty');
		logBox.setAttribute("style", "position: absolute; overflow: scroll; right: 0px; top: 210px; width: 450px; height: 465px; background-color: black; font-family: tahoma; font-size: 10pt; color: #FFFFFF; text-align: left; padding: 5px; border: 1px dotted; visibility: hidden; z-index: 999999;");
        mafiaLogBox.appendChild(logBox);

// added additional save button        
    var saveButton2 = document.createElement("div");
        saveButton2.innerHTML  = "<button>save settings</button>";
        saveButton2.addEventListener('click', saveSettings, false);
        saveButton2.setAttribute("style", "position: absolute;right: 10px; top: 150px;");
        mafiaLogBox.appendChild(saveButton2);

    var versionBox = document.createElement("div");
        versionBox.innerHTML  = "<img src='http://www.zynga.com/images/games/gameSmall_mafiawars.jpg'/><strong> "+SCRIPT.version+" </strong>";
        versionBox.setAttribute("style", "position: absolute; color: #FFFFFF;");
        settingsBox.appendChild(versionBox);

    var autoClick = document.createElement("div");
		autoClick.innerHTML  = "<input type='checkbox' id='autoClick' value='checked' "+GM_getValue('autoClick', '')+">Enable auto-refresh <img style='position: absolute; top: 5px; left: 157px' src='http://mwdirectfb3.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif'/>";
        autoClick.setAttribute("style", "position: absolute; top: 100px; color: #FFFFFF;");
        settingsBox.appendChild(autoClick);

	var refreshTimes = document.createElement("div");
		refreshTimes.innerHTML = "Refresh every <input type='text' style='border: none; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('r1', '30') + "' id='r1' size='2'>";
		refreshTimes.innerHTML += " to <input type='text' style='border: none; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('r2', '110') + "'id='r2' size='2'> seconds";
		refreshTimes.setAttribute("style", "position: absolute; top: 125px; color: #FFFFFF;");
        settingsBox.appendChild(refreshTimes);

	var autoMission = document.createElement("div");
		autoMission.innerHTML  = "<input type='checkbox' id='autoMission' value='checked' "+GM_getValue('autoMission', 'checked')+">Enable auto-Mission <img style='position: absolute; top: 5px; left: 157px' src='http://mwdirectfb3.static.zynga.com/mwfb/graphics/icon_experience_16x16_01.gif'/>" ;
         autoMission.setAttribute("style", "position: absolute; top: 200px;color: #FFFFFF;");
         settingsBox.appendChild(autoMission);

	var selectMission = document.createElement("select");
		for each (var mission in missions )
		{
			var choice = document.createElement('option');
			choice.value = mission[0];
			choice.appendChild(document.createTextNode(mission[0]));
			selectMission.appendChild(choice);
		}
		selectMission.selectedIndex = GM_getValue('selectMission', 1);
		selectMission.setAttribute("style", "position: absolute; top: 225px;");
        settingsBox.appendChild(selectMission);

// This is the new Wheelman bonus section
// added this Wheelman section
	var wheelmanBonus = document.createElement("div");
		wheelmanBonus.innerHTML  = "Wheelman Energy Savings <img style='position: absolute; top: 5px; left: 200px' src='http://mwdirectfb3.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif'/>" ;
         wheelmanBonus.setAttribute("style", "position: absolute; top: 260px;color: #FFFFFF;");
         settingsBox.appendChild(wheelmanBonus);

	var selectText = document.createElement("div");
		selectText.innerHTML  = "Energy Savings Percentage % " ;
         selectText.setAttribute("style", "position: absolute; top: 285px;color: #FFFFFF;");
         settingsBox.appendChild(selectText);

	var selectEnergyBonus = document.createElement("select");
		for (i=0;i<16;i++)
		{
			var choice = document.createElement('option');
			choice.value = i;
			choice.appendChild(document.createTextNode(i));
			selectEnergyBonus.appendChild(choice);
		}
		selectEnergyBonus.selectedIndex = GM_getValue('selectEnergyBonus', 0);
		selectEnergyBonus.setAttribute("style", "position: absolute; left: 230px; top: 285px;");
        settingsBox.appendChild(selectEnergyBonus);
        
// End of new Wheelman bonus section

    var autoHeal = document.createElement("div");
		autoHeal.innerHTML  = "<input type='checkbox' id='autoHeal' value='checked' "+GM_getValue('autoHeal', 'checked')+">enable auto-Heal <img style='position: absolute; top: 5px; left: 157px' src='http://mwdirectfb3.static.zynga.com/mwfb/graphics/icon_health_16x16_01.gif'/>";
        autoHeal.setAttribute("style", "position: absolute; top:310px; color: #FFFFFF;");
        settingsBox.appendChild(autoHeal);

    var healthLevel = document.createElement("div");
		healthLevel.innerHTML = "min. health: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('healthLevel', '50') + "' id='healthLevel' size='1'>";
		healthLevel.setAttribute("style", "position: absolute; top: 335px; left: 15px; color: #FFFFFF;");
        settingsBox.appendChild(healthLevel);


    var autoBank = document.createElement("div");
		autoBank.innerHTML  = "<input type='checkbox' id='autoBank' value='checked' "+GM_getValue('autoBank', 'checked')+">enable auto-Bank <img style='position: absolute; top: 5px; left: 157px' src='http://mwdirectfb3.static.zynga.com/mwfb/graphics/icon_cash_16x16_01.gif'/>";
        autoBank.setAttribute("style", "position: absolute; top: 360px;color: #FFFFFF;");
        settingsBox.appendChild(autoBank);

    var bankConfig = document.createElement("div");
		bankConfig.innerHTML = "min. amount: <input type='text' style='border: none; width: 80px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('bankConfig', '50000') + "' id='bankConfig' size='5'>";
		bankConfig.setAttribute("style", "position: absolute; top: 385px;left: 15px;color: #FFFFFF;");
        settingsBox.appendChild(bankConfig);

    var autoRob = document.createElement("div");
		autoRob.innerHTML  = "<input type='checkbox' id='autoRob' value='checked' "+GM_getValue('autoRob', '')+">enable auto-Rob";
		autoRob.setAttribute("style", "position: absolute; top: 410px; color: #FFFFFF;");
	settingsBox.appendChild(autoRob);

    var robConfig = document.createElement("div");
		robConfig.innerHTML = "max. mafia: <input type='text' style='border: none; width:45px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('robMafia', '501') + "' id='robMafia' size='1'>";
		robConfig.setAttribute("style", "position: absolute; top: 435px; left: 15px; color: #FFFFFF;");
	settingsBox.appendChild(robConfig);

    var autoFight = document.createElement("div");
		autoFight.innerHTML  = "<input type='checkbox' id='autoFight' value='checked' "+GM_getValue('autoFight', '')+">enable auto-Fight <img src='http://mwdirectfb3.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif'/>";
		autoFight.setAttribute("style", "position: absolute; top: 460px; color: #FFFFFF;");
        settingsBox.appendChild(autoFight);

    var fightRandom = document.createElement("div");
        fightRandom.innerHTML  = "<input type='radio' name='r1' id='fightRandom' value='checked' "+GM_getValue('fightRandom', '')+"> fight random mafia";
        fightRandom.setAttribute("style", "position: absolute; left: 10px; top: 485px;color: #FFFFFF;");
        settingsBox.appendChild(fightRandom);

//check to make sure that max level is above current level
    var fightLevel = document.createElement("div");
		fightLevel.innerHTML = "max. level:    <input type='text' id='fightLevelText' style='border: none; width: 45px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('fightLevel', '100') + "' id='fightLevel' size='1'>";
        fightLevel.setAttribute("style", "position: absolute; left: 25px; top: 510px;color: #FFFFFF;");
		fightLevel.addEventListener('change',maxLevelCheck,false);
        settingsBox.appendChild(fightLevel);

    var fightmafiaSize = document.createElement("div");
		fightmafiaSize.innerHTML = "max. mafia: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('fightmafiaSize', '502') + "' id='fightmafiaSize' size='1'>";
		fightmafiaSize.setAttribute("style", "position: absolute; left: 25px; top: 530px; color: #FFFFFF;");
        settingsBox.appendChild(fightmafiaSize);

//Include gray color for text area fightlist
	var fightList = document.createElement("div");
		fightList.innerHTML  = "<input type='radio' name='r1' id='rFightList' value='checked' " + GM_getValue('rFightList', '') + "> fight list:<br/><textarea style='border-color: #790102; background-color: #080c14; color: #AA0000; width: 180px; height: 105px;' id='fightList'>" + GM_getValue('fightList', '') + "</textarea>";
		fightList.setAttribute("style", "position: absolute; left: 10px; top: 555px; color: #9A9AA4;");
        settingsBox.appendChild(fightList);

    var saveButton = document.createElement("div");
        saveButton.innerHTML  = "<button>save settings</button>";
        saveButton.addEventListener('click', saveSettings, false);
        saveButton.setAttribute("style", "position: absolute;left: 160px; top: 690px;");
        settingsBox.appendChild(saveButton);


	var updateButton = document.createElement("div");
        updateButton.innerHTML  = "<button>check for updates</button>";
		updateButton.addEventListener('click', updateScript, false);
        updateButton.setAttribute("style", "position: absolute;left: 10px; top: 690px;");
        settingsBox.appendChild(updateButton);		


// message logic here...
// moving messages to xmlhttprequests
// detect if you tookout opponent
// detect job mastery
// detect tier mastery
// detect special items
if (document.body.innerHTML.indexOf('message_body') != -1 )
{		
	var boxes = document.getElementById(SCRIPT.appID+'_content_row').getElementsByTagName('td');
	if(boxes.length>0)
	{
	var messagebox = boxes[0];
	// skip this messagebox... for now
	if(messagebox.innerHTML.indexOf('join their Mafia') != -1)
	{
		if(boxes[1].innerHTML.indexOf('New') != -1)
			messagebox = boxes[2];
		else
			messagebox = boxes[1];
	}
	if(messagebox.innerHTML.indexOf('You just bought') != -1)
	{
		var item = messagebox.innerHTML.split('You just bought')[1].split('for')[0];
		addToLog("You just bought " + item);
	}
	else if(messagebox.innerHTML.indexOf('You withdrew') != -1)
	{
		var deposit	= messagebox.innerHTML.split('$')[1];
		deposit = deposit.replace("$","");
deposit = deposit.replace(/,/g, ''); 
		deposit = parseInt(deposit);
		addToLog("withrew " + deposit);
	}
	else if(messagebox.innerHTML.indexOf('was deposited in your account after the') != -1)
	{
		var deposit	= messagebox.innerHTML.split('$')[1];
deposit = deposit.replace(/,/g, '');
		deposit = parseInt(deposit);
		addToLog("deposit " + deposit);
	}
	
	}
}

//autoMission logic
if(GM_getValue('autoMission', '') == "checked" && energy >= calcEnergyCost())
{
	var jobno = missions[GM_getValue('selectMission', 1)][2]
	var tabno = missions[GM_getValue('selectMission', 1)][3]
	var link = "http://apps.facebook.com/"+SCRIPT.name+SCRIPT.controller+"job"+SCRIPT.action+"dojob&job="+jobno+"&tab="+tabno;
	takeAction(link,"job");

}	 


// bank logic here
if(GM_getValue('autoBank', '') == "checked" )
{
	if(cash>parseInt(GM_getValue('bankConfig', 100000))+10)
	{
		if (document.body.innerHTML.indexOf('title">The Bank') != -1)
		{
			var sform = document.evaluate("//input[@value='Deposit' and @type='submit']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
			setTimeout(function(){sform.snapshotItem(0).click()},delay);
			
		}
		else
			window.location = "http://apps.facebook.com/"+SCRIPT.name+SCRIPT.controller+"bank"+SCRIPT.action+"view"
		return;
	}
}	



// autoheal
if(GM_getValue('autoHeal', '') == "checked" && health<GM_getValue('healthLevel', ''))
{
	var link = 'http://apps.facebook.com/' + SCRIPT.name + SCRIPT.controller + 'hospital' + SCRIPT.action + 'heal';
	takeAction(link,"heal");
}

			
// autofight
if(GM_getValue('autoFight', '') == "checked" && stamina>0 && health>25)
{
	if(GM_getValue('fightRandom', '') == "checked")
		{
			if (document.body.innerHTML.indexOf('main_table fight_table') != -1)
			{
				var opponents  = document.evaluate("//a[contains(@href,'opponent_id')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);//.singleNodeValue;
				// Thanks Liquidor for the loop code
				var validOpponents = [];
				for (tmp = 0; tmp < opponents.snapshotLength; tmp++)
				{
					var fightNode = opponents.snapshotItem(tmp).parentNode.parentNode; 
					var opponentLevel = parseInt(fightNode.innerHTML.split('Level ')[1]);
					var opponentmafia = parseInt(fightNode.getElementsByTagName('td')[1].innerHTML);
					var username = fightNode.innerHTML.split('true;">')[1].split('</a>')[0];
					if (opponentLevel < GM_getValue('fightLevel', '100') && opponentmafia<GM_getValue('fightmafiaSize', '502')  && notFamily(username))
						validOpponents.push(tmp);
				}
				if(validOpponents.length > 0)
				{
					var fightIndex = validOpponents[Math.floor(Math.random()*validOpponents.length)];
					var fightNode = opponents.snapshotItem(fightIndex).parentNode.parentNode; 
					var opponentLevel = parseInt(fightNode.innerHTML.split('Level ')[1]);
					var opponentmafia = parseInt(fightNode.getElementsByTagName('td')[1].innerHTML);
					var link = opponents.snapshotItem(fightIndex).toString();
					takeAction(link,"fight");			
				}
				else
					setTimeout("document.location ='" + "http://apps.facebook.com/"+SCRIPT.name+SCRIPT.controller+"fight"+SCRIPT.action+"view"+"'", delay);	
			}
			else
				setTimeout("document.location ='" + "http://apps.facebook.com/"+SCRIPT.name+SCRIPT.controller+"fight"+SCRIPT.action+"view"+"'", delay);	
		}
	if(GM_getValue('rFightList', '') == "checked")
	{
		var link = "http://apps.facebook.com/"+SCRIPT.name+SCRIPT.controller+"fight"+SCRIPT.action+"attack&opponent_id="+parseInt(GM_getValue('fightList', ''))
		takeAction(link,"fight");
	}
}	 

// autorob
if(GM_getValue('autoRob', '') == "checked" && stamina>0 && health>25)
{
	if (document.body.innerHTML.indexOf('Robbing List') != -1)
	{
		var opponents = document.evaluate("//a[contains(@href,'property_id=12')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);//.singleNodeValue;
		var validOpponents = [];
		for (tmp = 0; tmp < opponents.snapshotLength; tmp++)
		{
			var robNode = opponents.snapshotItem(tmp).parentNode.parentNode;
			var opponentMafia = parseInt(robNode.getElementsByTagName('td')[1].innerHTML);
			if (opponentMafia < GM_getValue('robMafia', '100'))
				validOpponents.push(tmp);
		}
		if(validOpponents.length > 0)
		{
			var robIndex = validOpponents[Math.floor(Math.random()*validOpponents.length)];
			var robNode = opponents.snapshotItem(robIndex).parentNode.parentNode;
			var opponentMafia = parseInt(robNode.getElementsByTagName('td')[1].innerHTML);
			var link = opponents.snapshotItem(robIndex).toString();
			takeAction(link,"racket");
		}
		else
			setTimeout("document.location = '" + "http://apps.facebook.com/"+SCRIPT.name+SCRIPT.controller+"racket"+SCRIPT.action+"view"+"'", delay);
	}
	else
		setTimeout("document.location = '" + "http://apps.facebook.com/"+SCRIPT.name+SCRIPT.controller+"racket"+SCRIPT.action+"view"+"'", delay);
}

// autostats
if(GM_getValue('autoStats', '') == "checked" && stats>0)
{
}

function toggleSettings()
{
    if(settingsOpen == false)
    {
        settingsOpen = true;
	settingsButton.innerHTML = "";
        settingsButton.innerHTML = "close settings";
        settingsBox.style.visibility = "visible";
    }
    else
    {
        settingsOpen = false;
	settingsButton.innerHTML = "";
        settingsButton.innerHTML = "open settings";
        settingsBox.style.visibility = "hidden";
    }
}


function saveSettings()
{
    if(document.getElementById('autoClick').checked == true)
        GM_setValue('autoClick', 'checked');
    else
        GM_setValue('autoClick', '0');
        
    if(document.getElementById('clanMember').checked == true)
        GM_setValue('clanMember', 'checked');
    else
        GM_setValue('clanMember', '0');
        
    if(document.getElementById('autoMission').checked == true)
        GM_setValue('autoMission', 'checked');
    else
        GM_setValue('autoMission', '0');

    if(document.getElementById('autoBank').checked == true)
        GM_setValue('autoBank', 'checked');
    else
        GM_setValue('autoBank', '0');


    if(document.getElementById('autoHeal').checked == true)
        GM_setValue('autoHeal', 'checked');
    else
        GM_setValue('autoHeal', '0');

    if(document.getElementById('autoRob').checked == true)
	GM_setValue('autoRob', 'checked');
    else
	GM_setValue('autoRob', '0');

    if(document.getElementById('autoFight').checked == true)
        GM_setValue('autoFight', 'checked');
    else
        GM_setValue('autoFight', '0');

    if(document.getElementById('fightRandom').checked == true)
        GM_setValue('fightRandom', 'checked');
    else
        GM_setValue('fightRandom', '0');

    if(document.getElementById('rFightList').checked == true)
        GM_setValue('rFightList', 'checked');
    else
        GM_setValue('rFightList', '0');

    GM_setValue('clanName', document.getElementById('clanName').value);
    GM_setValue('selectMission', selectMission.selectedIndex );
    GM_setValue('bankConfig', document.getElementById('bankConfig').value);
    GM_setValue('r1', document.getElementById('r1').value);
    GM_setValue('r2', document.getElementById('r2').value);
    GM_setValue('robMafia', document.getElementById('robMafia').value);
    GM_setValue('fightList', document.getElementById('fightList').value);
    GM_setValue('healthLevel', document.getElementById('healthLevel').value);
    GM_setValue('fightLevel', document.getElementById('fightLevelText').value);
    GM_setValue('fightmafiaSize', document.getElementById('fightmafiaSize').value);
	GM_setValue('selectEnergyBonus', selectEnergyBonus.selectedIndex );

    alert("settings saved ");
    setTimeout("document.location = '"+"http://apps.facebook.com/"+SCRIPT.name+"/index.php"+"'", 300);
}


//ensure that any additions are added here
function uncheckAll()
{
		GM_setValue('autoBank', '0');
		GM_setValue('autoClick', '0');
		GM_setValue('autoFight', '0');
		GM_setValue('autoRob', '0');
		GM_setValue('autoMission', '0');
		GM_setValue('autoHeal', '0');
		GM_setValue('clanMember', '0');
		document.location = location.href;
alert('All options have been disabled');
}

function calcEnergyCost()
{
	if (missions[GM_getValue('selectMission', 1)][1] > 5)
		return Math.floor(missions[GM_getValue('selectMission', 1)][1] * (1 - GM_getValue('selectEnergyBonus','0')/100));
	else
		return missions[GM_getValue('selectMission', 1)][1];
}	

function notFamily(username)
{
	var clans = GM_getValue('clanName', '').split("\n");
	for (var i=1;i<clans.length;i++)
	{
		if (username.indexOf(clans[i]) != -1)
			return false;
	}
	return true;
}


function checkAll()
{
		GM_setValue('autoBank', 'checked');
		GM_setValue('autoClick', 'checked');
		GM_setValue('autoMission', 'checked');
		GM_setValue('autoRob', 'checked');
		GM_setValue('autoHeal', 'checked');
		GM_setValue('clanMember', 'checked');
		document.location = location.href;
alert('All options have been enabled');
}

function addToLog(line)
{
	if (GM_getValue('logOn', '0') == 'checked') {
		var currentTime = new Date()
		var timestamp = currentTime.getDate()+ "/" + currentTime.getMonth()+ "/" +currentTime.getFullYear() +" " +currentTime.getHours() + ":" + currentTime.getMinutes()+ ":" + currentTime.getSeconds()+ " ";
		GM_setValue('itemLog', GM_getValue('itemLog', '') + timestamp + line + "<br/>")
	}
}

function CycleFightList()
{
	var opponents = GM_getValue('fightList', '').split("\n");
	var opponentList="";
	for (var i=1;i<opponents.length;i++)
		opponentList = opponentList+ opponents[i]+"\n";
	opponentList = opponentList + opponents[0];
	GM_setValue('fightList', opponentList);
}

function clearLog()
{
    GM_setValue('itemLog', '');
    logBox.innerHTML = "";
alert('Log Box has been cleared');
}

function toggleLogBox()
{
    if(logOpen == false)
    {
        logOpen = true;
        viewLogButton.innerHTML = "hide mafia log";
        logBox.style.visibility = "visible";
        mafiaLogBox.style.visibility = "visible";
    }
    else
    {
        logOpen = false;
        viewLogButton.innerHTML = "view mafia log";
        logBox.style.visibility = "hidden";
        mafiaLogBox.style.visibility = "hidden";
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

function maxLevelCheck() {
	if (level > document.getElementById('fightLevelText').value)
	{
		alert('Max level must be higher than your current level');
		document.getElementById('fightLevelText').focus();
	}	
}

//update the script (by Richard Gibson; changed by ms99 and blannie)
function updateScript() {
	try {
		if (!GM_getValue) return;
		GM_xmlhttpRequest({
			method: 'GET',
			url: SCRIPT.url + '?source', // don't increase the 'installed' count; just for checking
			onload: function(result) {
				if (result.status != 200) return;
				if (!result.responseText.match(/@version\s+([\d.]+)/)) return;
				var theOtherVersion = RegExp.$1;
				if (theOtherVersion == SCRIPT.version) {
					alert('you have the latest version' + ' (v ' + SCRIPT.version + ') !');
					return;
				} else if (theOtherVersion < SCRIPT.version) {
					alert('Beta version' + ' (v ' + SCRIPT.version + ') installed ?!');
					return;
				} else {
					if (window.confirm('new version ' + ' (v ' + theOtherVersion + ') available!\n\n' + 'Do you want to update?' + '\n')) {
						window.location.href = SCRIPT.url;
					}
				}
			}
		});
	} catch (ex) {
	}
}

function takeAction(link,action)
{
	GM_setValue('actionType',action);
	GM_xmlhttpRequest({ method: "GET", 
		url: link, 
		headers:{'Content-type':'application/x-www-form-urlencoded'}, 
		onload: function(responseDetails) {
			logResponse(responseDetails); 
		}});
}

function logResponse (responseDetails)
{
	
	var doc = document.createElement('div');
	doc.innerHTML = responseDetails.responseText;	
	var xpathExpression = '//table[@class=\'messages\']'; //gets message box
	var results = document.evaluate(xpathExpression, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var messagebox = results.snapshotItem(0);
	

	switch (GM_getValue('actionType',''))
	{
		case "fight":		//fight
			if(messagebox.innerHTML.indexOf('fought against') != -1)
			{
				var user = messagebox.innerHTML.split('href="')[1].split('"')[0];
				var username = messagebox.innerHTML.split('true;">')[1].split('</a>')[0];
				if(messagebox.innerHTML.indexOf('@class=\'good\'') == -1 && messagebox.innerHTML.indexOf('$') != -1)
				{
					user = '<a style="color:green" href="'+user+'">'+username+'</a>';
					var cost = messagebox.innerHTML.split('$')[1];
					cost = cost.replace(/,/g, '');	
					addToLog("fought "+ user + " WON " +parseInt(cost));
				}
				else 
				{
					user = '<a style="color:red" href="'+user+'">'+username+'</a>';
					var cost = messagebox.innerHTML.split('$')[1];	
					cost = cost.replace(/,/g, '');
					addToLog("fought "+ user + " LOST " +parseInt(cost));
				}
				if(messagebox.innerHTML.indexOf('found')!= -1)
					addToLog("found "+ messagebox.innerHTML.split('found a ')[1].split(' while fighting ')[0]);
				
				if(GM_getValue('rFightList', '') == "checked")
					CycleFightList();	
			}
			else if(messagebox.innerHTML.indexOf('too weak to fight') != -1)
			{
				if(GM_getValue('rFightList', '') == "checked")
					CycleFightList();	
			}
			else if(messagebox.innerHTML.indexOf('You cannot fight a member of your Mafia') != -1)
			{
				if(GM_getValue('rFightList', '') == "checked")
				{
					var opponents = GM_getValue('fightList', '').split("\n");
					var opponentList="";
					for (var i=1;i<opponents.length;i++)
						opponentList = opponentList+ opponents[i]+"\n";
					GM_setValue('fightList', opponentList);
				}
			}
			break;

		case "racket":		//rob
			if(messagebox.innerHTML.indexOf('robbed') != -1)
			{
				if (messagebox.innerHTML.indexOf('Your opponent\'s property is under police investigation and can not be robbed.') != -1) {
					addToLog("robbing failed");
				}
				else {
					var user = messagebox.innerHTML.split('href="')[1].split('"')[0];
					var username = messagebox.innerHTML.split('true;">')[1].split('</a>')[0];
					if(messagebox.innerHTML.indexOf('You <strong>successfully</strong> robbed') != -1 && messagebox.innerHTML.indexOf('$') != -1)
					{
						user = '<a style="color:#0c0" href="'+user+'">'+username+'</a>';
						var cost = messagebox.innerHTML.split('$')[1];
						cost = cost.replace(/,/g, '');
						addToLog("robbed "+ user + " received " +parseInt(cost));
					}
					else
					{
						user = '<a style="color:#c00" href="'+user+'">'+username+'</a>';
						var cost = messagebox.innerHTML.split('$')[1];
						cost = cost.replace(/,/g, '');
						addToLog("robbed "+ user + " lost " + parseInt(cost));
					}
				}
			}
			break;

		case "heal":		//heal
			if(messagebox.innerHTML.indexOf('doctor healed') != -1)
			{
				var addHealth = messagebox.innerHTML.split('doctor healed <strong>')[1].split('health')[0];
				var cost = 0;
				if(messagebox.innerHTML.indexOf('$') != -1)
					cost = messagebox.innerHTML.split('$')[1];
				cost = cost.replace(/,/g, '');
				cost	 = parseInt(cost	);
				addToLog("health +"+ addHealth + " for " + cost	);
			}
			else if(messagebox.innerHTML.indexOf('You cannot heal so fast') != -1)
			{
				addToLog("Attempted to heal too quickly");
			}
			break;
		case "job":
			if (messagebox.innerHTML.indexOf('You gained a') != -1)
			{
				var loot = messagebox.innerHTML.split('You gained a ')[1].split('.</td>​​​​​')[0];
				addToLog("You got a " + loot + " in a job");
			}
			if (messagebox.innerHTML.indexOf('You have mastered the') != -1)
			{
				addToLog("You have mastered the " + missions[GM_getValue('selectMission', 1)][0] + " job.");
			    if (GM_getValue('selectMission',1) == missions.length-1)
			    	addToLog("You have mastered the final job");
			    else
			    {
			    	GM_setValue('selectMission', (selectMission.selectedIndex + 1));
			    	addToLog("Current job switched to " + missions[GM_getValue('selectMission', 1)][0]);
			    }	
			}
			if (messagebox.innerHTML.indexOf('You don\'t have the necessary items to perform this job') != -1)
			{
				addToLog("You don\'t have the items necessary to do " + missions[GM_getValue('selectMission', 1)][0] );
			    if (GM_getValue('selectMission',1) == missions.length-1)
			    {
			    	addToLog("You are on the last job");
			    	addToLog("Job processing will stop");
			    	GM_setValue('autoMission', '0');
			    }
			    else
			    {
			    	GM_setValue('selectMission', (selectMission.selectedIndex + 1));
			    	addToLog("Current job switched to " + missions[GM_getValue('selectMission', 1)][0]);
			    }	
			}		
			if (messagebox.innerHTML.indexOf('You are not high enough level to do this job') != -1)
			{
				addToLog("You are not high enough level to " + missions[GM_getValue('selectMission', 1)][0] );
			    addToLog("Job processing will stop");
			    GM_setValue('autoMission', '0');
			}
					
			break;			
			
		default:
			GM_log('Neither Fight nor Heal');
	}
	GM_setValue('actionType','');
	setTimeout("document.location = '"+"http://apps.facebook.com/"+SCRIPT.name+"/index.php"+"'", delay);
  
}
