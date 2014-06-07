// ==UserScript==
// @name           vampireWars
// @namespace      facebook
// @description		Autoplayer for the Vampire Wars game this script work of "blannie" with simple change to attack when health >19
// @version        2.2.3
// @include        http://apps.facebook.com/vampiresgame/*
// @include       http://apps.new.facebook.com/vampiresgame/*
// ==/UserScript==

var settingsOpen = false;
var logOpen      = false;
var delay = 3000;
var blood2Update = 120000;

var SCRIPT = {
	url: 'http://userscripts.org/scripts/source/36917.user.js',
	version: '2.2.3',
	name: 'vampiresgame',
	appID: 'app25287267406',
	presentationurl: 'http://userscripts.org/scripts/show/36917'
};

var missions = new Array(
	["Feast on a Human's Blood",1],
	["Destroy a Renegade Vampire",3],	 
	["Eliminate a Street Gang",5],
	["Raid a Blood Bank",7],
	["Fight a Sewer Wererat",1],
	["Kill a Drug Dealer",2],
	["Rescue an Ally From an Insane Asylum",2],
	["Fight Ghouls in the Deep Woods",3],
	["Destroy a Circle of Warlocks",3],
	["Tame a Shadow Demon",4],
	["Feed in Central Park",10],
	["Attack a Vampiric Lair",15],	 
	["Sneak into Vampires' Nest",5],
	["Fight a Vampire Slayer",5],
	["End the Unlife of a Lich",5],
	["Challenge a Haitian Voodoo Gang",6],
	["Fight a Pack of Werewolves",18],
	["Retrieve a Lost Relic From the High Desert",7],
	["Fight Another Vampire For Mental Dominance",8],
	["Take Control of a Neighborhood",25],
	["Save a Vampire From Hunters",10],
	["Clear a Laboratory of Hideous Mutants",13],	
	["Battle a Werewolf Lord",30],
	["Rescue an Ally from the Underworld",15],	
	["Fight Government Agents in Foundry",25],
	["Banish Summoned Demon",25],
	["Face a Rival Clan Alone",35],
	["Destroy a Demonic Lord",40],
	["Exterminate A Rival Clan",40]
	);

var XMLHttpFactories = [
    function () {return new XMLHttpRequest()},
    function () {return new ActiveXObject("Msxml2.XMLHTTP")},
    function () {return new ActiveXObject("Msxml3.XMLHTTP")},
    function () {return new ActiveXObject("Microsoft.XMLHTTP")}
];

// reload logic
if(GM_getValue('autoClick', '') == "checked")
{
    var timeWait = Math.floor(parseFloat(GM_getValue('r1', '6')) + parseFloat((GM_getValue('r2', '11'))-parseFloat(GM_getValue('r1', '6')))*Math.random())*1000;
      setTimeout("document.location = '"+"http://apps.facebook.com/"+SCRIPT.name+ GM_getValue('refreshPage', "/index.php")+"'", timeWait);
}

// status parameters
	var clan =  parseInt(document.body.innerHTML.split('my clan (')[1]);
	var td = document.getElementById(SCRIPT.appID+'_stats_table').getElementsByTagName('td');
	var blood = document.getElementById( SCRIPT.appID+'_current_cash').innerHTML;
	blood = parseInt(blood.replace(/,/g, ''));

	var health = parseInt(document.getElementById( SCRIPT.appID+'_current_health').innerHTML);
    var energy = document.getElementById( SCRIPT.appID+'_current_energy').innerHTML;
	energy = parseInt(energy.replace(/,/g, ''));
    var rage =parseInt(document.getElementById( SCRIPT.appID+'_current_stamina').innerHTML);
	
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
        viewLogButton.innerHTML = "view rs log";
        viewLogButton.setAttribute("style", "position: absolute; right: 5px; top: 3px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");
        viewLogButton.addEventListener('click', toggleLogBox, false);
        document.body.appendChild(viewLogButton);

    var clrLogButton = document.createElement("div");
        clrLogButton.innerHTML = "clear log";
        clrLogButton.setAttribute("style", "position: absolute; right: 5px; top: 21px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");
        clrLogButton.addEventListener('click', clearLog, false);
        document.body.appendChild(clrLogButton);

    var settingsBox = document.createElement("div");
	settingsBox.setAttribute("style", "position: absolute; left: 5px; top: 21px; width: 500px; height: 360px; background: black url(http://facebook3.vampires.static.zynga.com/24863/css/ui/border_deco_fb.jpg); font-family: tahoma; font-size: 10pt; text-align: left; padding: 5px; border: 1px dotted; visibility: hidden; z-index: 100;");
        document.body.appendChild(settingsBox);

    var logBox = document.createElement("div");
        logBox.innerHTML = GM_getValue('itemLog', 'log empty');
	logBox.setAttribute("style", "position: absolute; overflow: scroll; right: 5px; top: 21px; width: 450px; height: 250px; background: black url(http://facebook3.vampires.static.zynga.com/24863/css/ui/border_deco_fb.jpg); font-family: tahoma; font-size: 10pt; color: #FFFFFF; text-align: left; padding: 5px; border: 1px dotted; visibility: hidden; z-index: 999999;");
        document.body.appendChild(logBox);

    var versionBox = document.createElement("div");
        versionBox.innerHTML  = "<img src='http://www.zynga.com/images/games/gameSmall_vampires.jpg'/><strong> "+SCRIPT.version+" </strong>";
        versionBox.setAttribute("style", "position: absolute; color: #FFFFFF;");
        settingsBox.appendChild(versionBox);

    var autoClick = document.createElement("div");
        autoClick.innerHTML  = "<input type='checkbox' id='autoClick' value='checked' "+GM_getValue('autoClick', '')+">enable auto-refresh";
        autoClick.setAttribute("style", "position: absolute; top: 100px; color: #FFFFFF;");
        settingsBox.appendChild(autoClick);
		
	var refreshTimes = document.createElement("div");
	refreshTimes.innerHTML = "refresh every <input type='text' style='border: none; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('r1', '30') + "' id='r1' size='2'>";
	refreshTimes.innerHTML += " to <input type='text' style='border: none; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('r2', '110') + "'id='r2' size='2'> seconds";
	refreshTimes.setAttribute("style", "position: absolute; top: 125px; color: #FFFFFF;");
        settingsBox.appendChild(refreshTimes);

   var refreshPage = document.createElement("div");
	refreshPage.innerHTML = "url: <input type='text' style='border: none; width: 270px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('refreshPage', '/index.php') + "' id='refreshPage' size='200'>";
        refreshPage.setAttribute("style", "position: absolute; top: 150px;color: #FFFFFF;");
        settingsBox.appendChild(refreshPage);

//	var autoClan = document.createElement("div");
//        autoClan.innerHTML  = "<input type='checkbox' id='autoClan' value='checked' "+GM_getValue('autoClan', '')+">enable auto-Clan update";
//        autoClan.setAttribute("style", "position: absolute; top: 150px;color: #FFFFFF;");
//        settingsBox.appendChild(autoClan);
    
	var autoMission = document.createElement("div");
         autoMission.innerHTML  = "<input type='checkbox' id='autoMission' value='checked' "+GM_getValue('autoMission', 'checked')+">enable auto-Mission";
         autoMission.setAttribute("style", "position: absolute; top: 175px;color: #FFFFFF;");
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
		selectMission.setAttribute("style", "position: absolute; top: 200px;");
        settingsBox.appendChild(selectMission);
		 
    var autoBank = document.createElement("div");
         autoBank.innerHTML  = "<input type='checkbox' id='autoBank' value='checked' "+GM_getValue('autoBank', 'checked')+">enable auto-Bank";
         autoBank.setAttribute("style", "position: absolute; top: 235px;color: #FFFFFF;");
         settingsBox.appendChild(autoBank);

    var bankConfig = document.createElement("div");
	bankConfig.innerHTML = "above: <input type='text' style='border: none; width: 100px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('bankConfig', '100000') + "' id='bankConfig' size='8'>"+" keep: <input type='text' style='border: none; width: 100px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('bankKeep', '50000') + "' id='bankKeep' size='8'>";
        bankConfig.setAttribute("style", "position: absolute; top: 260px;left: 15px;color: #FFFFFF;");
        settingsBox.appendChild(bankConfig);

    var autoHeal = document.createElement("div");
        autoHeal.innerHTML  = "<input type='checkbox' id='autoHeal' value='checked' "+GM_getValue('autoHeal', 'checked')+">enable auto-Heal";
        autoHeal.setAttribute("style", "position: absolute; top:285px;color: #FFFFFF;");
        settingsBox.appendChild(autoHeal);

    var healthLevel = document.createElement("div");
	healthLevel.innerHTML = "min. health: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('healthLevel', '50') + "' id='healthLevel' size='1'>";
        healthLevel.setAttribute("style", "position: absolute; top: 310px;color: #FFFFFF;");
        settingsBox.appendChild(healthLevel);

    var healthRage = document.createElement("div");
	healthRage.innerHTML = "max. Rage: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('healthRage', '5') + "' id='healthRage' size='1'>";
        healthRage.setAttribute("style", "position: absolute; left: 120px;top: 310px;color: #FFFFFF;");
        settingsBox.appendChild(healthRage);

    var autoBuff = document.createElement("div");
        autoBuff.innerHTML  = "<input type='checkbox' id='autoBuff' value='checked' "+GM_getValue('autoBuff', 'checked')+">enable auto-Buff";
        autoBuff.setAttribute("style", "position: absolute; top:335px;color: #FFFFFF;");
        settingsBox.appendChild(autoBuff);

	var updateButton = document.createElement("div");
        updateButton.innerHTML  = "<button>check for updates</button>";
        updateButton.addEventListener('click', updateScript, false);
        updateButton.setAttribute("style", "position: absolute;left: 150px; top: 335px;");
        settingsBox.appendChild(updateButton);		
		
    var autoFight = document.createElement("div");
        autoFight.innerHTML  = "<input type='checkbox' id='autoFight' value='checked' "+GM_getValue('autoFight', '')+">enable auto-Fight";
	autoFight.setAttribute("style", "position: absolute; left: 300px; top: 25px; color: #FFFFFF;");
        settingsBox.appendChild(autoFight);

    var fightRandom = document.createElement("div");
        fightRandom.innerHTML  = "<input type='radio' name='r1' id='fightRandom' value='checked' "+GM_getValue('fightRandom', '')+"> fight random vampires";
        fightRandom.setAttribute("style", "position: absolute; left: 300px; top: 50px;color: #FFFFFF;");
        settingsBox.appendChild(fightRandom);
	
    var fightLevel = document.createElement("div");
		fightLevel.innerHTML = "max. level: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('fightLevel', '100') + "' id='fightLevel' size='1'>";
        fightLevel.setAttribute("style", "position: absolute; left: 300px; top: 75px;color: #FFFFFF;");
        settingsBox.appendChild(fightLevel);

    var fightClanSize = document.createElement("div");
		fightClanSize.innerHTML = "max. clan: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('fightClanSize', '502') + "' id='fightClanSize' size='1'>";
		fightClanSize.setAttribute("style", "position: absolute; left: 300px; top: 100px; color: #FFFFFF;");
        settingsBox.appendChild(fightClanSize);

    var fightClanRating = document.createElement("div");	
		fightClanRating.innerHTML = "min. rating: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('fightClanRating', '500') + "' id='fightClanRating' size='1'>";
		fightClanRating.setAttribute("style", "position: absolute; left: 300px; top: 125px; color: #FFFFFF;");
        settingsBox.appendChild(fightClanRating);

    var freshMeat = document.createElement("div");
        freshMeat.innerHTML  = "<input type='radio' name='r1' id='freshMeat' value='checked' "+GM_getValue('freshMeat', '')+"> go for fresh Meat";
	freshMeat.setAttribute("style", "position: absolute; left: 300px; top: 150px; color: #FFFFFF;");
        settingsBox.appendChild(freshMeat);

	var fightList = document.createElement("div");
	fightList.innerHTML  = "<input type='radio' name='r1' id='rFightList' value='checked' " + GM_getValue('rFightList', '') + "> fight list:<br/><textarea style='border: none; background-color: transparent; color: #AA0000; width: 180px; height: 130px;' id='fightList'>" + GM_getValue('fightList', '') + "</textarea>";
	fightList.setAttribute("style", "position: absolute; left: 300px; top: 175px; color: #FFFFFF;");
        settingsBox.appendChild(fightList);

    var saveButton = document.createElement("div");
        saveButton.innerHTML  = "<button>save settings</button>";
        saveButton.addEventListener('click', saveSettings, false);
        saveButton.setAttribute("style", "position: absolute;left: 300px; top: 335px;");
        settingsBox.appendChild(saveButton);

// message logic here...
if (document.body.innerHTML.indexOf('message_body') != -1)
{		
	var boxes = document.getElementById(SCRIPT.appID+'_content').getElementsByTagName('span');
	if(boxes.length>0)
	{
	var messagebox = boxes[0];
	// skip this messagebox... for now
	if(messagebox.innerHTML.indexOf('Someone has invited you to join their Clan') != -1)
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
	else if(messagebox.innerHTML.indexOf('You successfully dominated') != -1)
	{
		var minion = messagebox.innerHTML.split('You successfully dominated ')[1];
		minion = minion.split('.')[0];
		addToLog("You successfully dominated " + minion);
	}
	else if(messagebox.innerHTML.indexOf('Rare Ability') != -1)
	{
		var ability = boxes[1].innerHTML.split('return true;">')[1].split('</a>')[0];
		addToLog("acquired Rare Ability " + ability);
	}
	else if(messagebox.innerHTML.indexOf('You withdrew') != -1)
	{
		var deposit	= messagebox.innerHTML.split('blood.gif">')[1];
		deposit = deposit.replace(",","");
		deposit = deposit.replace(",","");
		deposit = parseInt(deposit);
		addToLog("withrew " + deposit);
	}
	else if(messagebox.innerHTML.indexOf('deposited and stored safely') != -1)
	{
		var deposit	= messagebox.innerHTML.split('blood.gif">')[1];
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
		cost	 = cost.replace(",","");
		cost	 = cost.replace(",","");
		cost	 = parseInt(cost	);
		addToLog("health +"+ addHealth + " for " + cost	);
	}
	else if(messagebox.innerHTML.indexOf('You fought with') != -1)
	{
		if(GM_getValue('freshMeat', '') != "checked")
		{
			var user = messagebox.innerHTML.split('href="')[1].split('"')[0];
			var username = messagebox.innerHTML.split('true;">')[1].split('</a>')[0];
			user = '<a href="'+user+'">'+username+'</a>';

			var battleResult = document.evaluate("//span[@class='good']",document,null,9,null).singleNodeValue;
			if(battleResult!=null && battleResult.innerHTML.indexOf('blood.gif">') != -1)
			{
				var cost = battleResult.innerHTML.split('blood.gif">')[1];	
				cost = cost.replace(",","");
				cost = cost.replace(",","");
				addToLog("fought "+ user + " WON " +parseInt(cost));
			}
			battleResult = document.evaluate("//span[@class='bad']",document,null,9,null).singleNodeValue;
			if(battleResult!=null && battleResult.innerHTML.indexOf('blood.gif">') != -1)
			{
				var cost = battleResult.innerHTML.split('blood.gif">')[1];	
				cost = cost.replace(",","");
				cost = cost.replace(",","");
				addToLog("fought "+ user + " LOST " +parseInt(cost));
			}
			for (var i=1;i<boxes.length;i++)
				if(boxes[i].innerHTML.indexOf('found')!= -1)
				{
					addToLog("found "+ boxes[i].innerHTML.split('found ')[1].split('while fighting ')[0]);
					i=boxes.length;
				}
			if(GM_getValue('rFightList', '') == "checked")
				CycleFightList();	
		}
	}
	else if(messagebox.innerHTML.indexOf('too weak to fight') != -1)
	{
		if(GM_getValue('rFightList', '') == "checked")
			CycleFightList();	
	}
	else if(messagebox.innerHTML.indexOf('You cannot fight a member of your Clan') != -1)
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
	else if(messagebox.innerHTML.indexOf('The Wheel and fate has smiled upon you') != -1)
	{
		addToLog(messagebox.innerHTML.split('smiled upon you.<br>')[1].split('Repay the favor')[0]);
	}
	else  if(messagebox.innerHTML.indexOf('The wheel halts suddenly') != -1)
	{
		addToLog(messagebox.innerHTML.split('<br>')[1]);
		setTimeout("document.location ='" + "http://apps.facebook.com/"+SCRIPT.name+"/buffs.php", delay);
		return;		
	}
	else if(messagebox.innerHTML.indexOf('hours and') != -1)
	{
		// index page shows crypt timer
		if (location.href.indexOf(SCRIPT.name+'/index') != -1)
		{
			// do nothing for now
		}
		// buffs page shows buff timer
		if (location.href.indexOf(SCRIPT.name+'/buffs') != -1)
		{
			var now = Math.floor(new Date().getTime() / 1000);
			time = 3600 * parseInt(messagebox.innerHTML.split('hours')[0]);
			time = time + 60 *(1+ parseInt(messagebox.innerHTML.split('hours and')[1]));
			GM_setValue('spin',now + time );
		}
		
	}
	else if(messagebox.innerHTML.indexOf('Fresh Meat') != -1)
	{
	// do nothing 
	}
	else if(messagebox.innerHTML.indexOf('icon-blood.gif') != -1)
	{
	// do nothing 
	}
	else if(messagebox.innerHTML.indexOf('You cannot heal so fast') != -1)
	{
		document.getElementById(SCRIPT.appID+'_health_refill_popup').style.display = 'block';
		setTimeout(function(){document.getElementById(SCRIPT.appID+'_health_refill_popup').getElementsByTagName('form')[0].submit();},delay);
		return;
	}
	else if(messagebox.innerHTML.indexOf('You do not have enough favor points to spin the wheel again') != -1)
	{
		window.location = "http://apps.facebook.com/"+SCRIPT.name+"/buffs.php";
		return;
	}	
//	else
//		alert(messagebox.innerHTML);
	}
}

// show return per minion
if (location.href.indexOf(SCRIPT.name+'/properties') != -1)
{
		var minions = document.evaluate("//tr[@class='darkRow']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var minReturn = 9999999;
		for (var index = 0 ; index < minions.snapshotLength ; index++)
		{
				var minionIncome = minions.snapshotItem(index).getElementsByTagName('td')[1].getElementsByTagName('div')[1];
				minionIncome = minionIncome.innerHTML.split('blood.gif">')[1];
				minionIncome = minionIncome.replace(",", "");
				minionIncome = minionIncome.replace(",", "");
				minionIncome = parseInt(minionIncome);
				var minionCost = minions.snapshotItem(index).getElementsByTagName('td')[2].getElementsByTagName('td')[0];
				minionCost = minionCost.innerHTML.split('blood.gif">')[1];
				minionCost = minionCost.replace(",", "");
				minionCost = minionCost.replace(",", "");
				minionCost = parseInt(minionCost);
				var minionReturn = minionCost / minionIncome;
				if (minionReturn < minReturn)
				{
						minReturn = minionReturn;
				}
		}

		var minions = document.evaluate("//tr[@class='lightRow']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var index = 0 ; index < minions.snapshotLength - 3 ; index++)
		{
				var minionIncome = minions.snapshotItem(index).getElementsByTagName('td')[1].getElementsByTagName('div')[1];
				minionIncome = minionIncome.innerHTML.split('blood.gif">')[1];
				minionIncome = minionIncome.replace(",", "");
				minionIncome = minionIncome.replace(",", "");
				minionIncome = parseInt(minionIncome);
				var minionCost = minions.snapshotItem(index).getElementsByTagName('td')[2].getElementsByTagName('td')[0];
				minionCost = minionCost.innerHTML.split('blood.gif">')[1];
				minionCost = minionCost.replace(",", "");
				minionCost = minionCost.replace(",", "");
				minionCost = parseInt(minionCost);
				var minionReturn = minionCost / minionIncome;
				if (minionReturn < minReturn)
				{
						minReturn = minionReturn;
				}
		}

		var minions = document.evaluate("//tr[@class='darkRow']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var index = 0 ; index < minions.snapshotLength ; index++)
		{
				var minionIncome = minions.snapshotItem(index).getElementsByTagName('td')[1].getElementsByTagName('div')[1];
				minionIncome = minionIncome.innerHTML.split('blood.gif">')[1];
				minionIncome = minionIncome.replace(",", "");
				minionIncome = minionIncome.replace(",", "");
				minionIncome = parseInt(minionIncome);
				var minionCost = minions.snapshotItem(index).getElementsByTagName('td')[2].getElementsByTagName('td')[0];
				minionCost = minionCost.innerHTML.split('blood.gif">')[1];
				minionCost = minionCost.replace(",", "");
				minionCost = minionCost.replace(",", "");
				minionCost = parseInt(minionCost);
				minionCost = minionCost / minionIncome;
				var divSpot = minions.snapshotItem(index).getElementsByTagName('td')[1].getElementsByTagName('div')[3];
				var divbox = document.createElement('div');
				if (minionCost == minReturn)
				{
						divbox.innerHTML = 'Cost per blood: <strong class="good"><img src="http://facebook.vampires.static.zynga.com/graphics/icon-blood.gif"/>' + minionCost.toFixed(2) + '</strong>';
				}
				else
				{
						divbox.innerHTML = 'Cost per blood: <strong class="money"><img src="http://facebook.vampires.static.zynga.com/graphics/icon-blood.gif"/>' + minionCost.toFixed(2) + '</strong>';
				}
				divSpot.parentNode.insertBefore(divbox, divSpot.nextSibling);
		}

		var minions = document.evaluate("//tr[@class='lightRow']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var index = 0 ; index < minions.snapshotLength ; index++)
		{
				var minionIncome = minions.snapshotItem(index).getElementsByTagName('td')[1].getElementsByTagName('div')[1];
				minionIncome = minionIncome.innerHTML.split('blood.gif">')[1];
				minionIncome = minionIncome.replace(",", "");
				minionIncome = minionIncome.replace(",", "");
				minionIncome = parseInt(minionIncome);
				var minionCost = minions.snapshotItem(index).getElementsByTagName('td')[2].getElementsByTagName('td')[0];
				minionCost = minionCost.innerHTML.split('blood.gif">')[1];
				minionCost = minionCost.replace(",", "");
				minionCost = minionCost.replace(",", "");
				minionCost = parseInt(minionCost);
				minionCost = minionCost / minionIncome;
				var divSpot = minions.snapshotItem(index).getElementsByTagName('td')[1].getElementsByTagName('div')[3];
				var divbox = document.createElement('div');
				if (minionCost == minReturn)
				{
						divbox.innerHTML = 'Cost per blood: <strong class="good"><img src="http://facebook.vampires.static.zynga.com/graphics/icon-blood.gif"/>' + minionCost.toFixed(2) + '</strong>';
				}
				else
				{
						divbox.innerHTML = 'Cost per blood: <strong class="money"><img src="http://facebook.vampires.static.zynga.com/graphics/icon-blood.gif"/>' + minionCost.toFixed(2) + '</strong>';
				}
				divSpot.parentNode.insertBefore(divbox, divSpot.nextSibling);
		}
}

// buffs logic
if(GM_getValue('autoBuff', '') == "checked")
{
	var now = Math.floor(new Date().getTime() / 1000);
	if (now > GM_getValue('spin',0)) //14400 seconds
	{
		if (location.href.indexOf(SCRIPT.name+'/buffs') != -1)
		{
			var time = document.evaluate("//span[@class='treasure_timer']",document,null,9,null).singleNodeValue;
			if(time==null) // time run out... do the buff
				window.location = "http://apps.facebook.com/"+SCRIPT.name+"/buffs.php?doBuff=1";
			else
			{
				GM_setValue('spin',now + 3600 * parseInt(time.innerHTML.split('hours')[0])+  60 *(1+ parseInt(time.innerHTML.split('hours and')[1])));
			}
		}
		else
			window.location = "http://apps.facebook.com/"+SCRIPT.name+"/buffs.php";
	}
}

// clan logic here
if(GM_getValue('autoClan', '') == "unused" && clan!=GM_getValue('clanSize', 1)) 
{
	if(blood< blood2Update)
	{
		if (location.href.indexOf(SCRIPT.name+'/bloodbank') != -1)
		{
			var sform = document.getElementsByTagName('form')[1];
			document.getElementsByName("amount")[0].value =  blood2Update-blood;
			setTimeout(function(){sform.submit();},delay);
		}
		else
			window.location = "http://apps.facebook.com/"+SCRIPT.name+"/bloodbank.php";
	}
	else if (location.href.indexOf(SCRIPT.name+'/index') != -1)
	{
		var required =  parseInt(document.body.innerHTML.split('Requires ')[1]);
		if(clan >= required)
		{
			var sform = document.getElementsByTagName('form')[1];
			setTimeout(function(){sform.submit();},delay);
		}
		else
			window.location = "http://apps.facebook.com/"+SCRIPT.name+"/properties.php";
	}
	else if (location.href.indexOf(SCRIPT.name+'/properties') != -1)
	{
		var required = document.evaluate("//div[@class='property_members']",document,null,9,null).singleNodeValue;
	    required = parseInt(required.innerHTML);
		if(clan >= required)
			 setTimeout(function(){document.getElementsByTagName('form')[1].submit();},delay);
		GM_setValue('clanSize', clan);
	}
	else
		window.location = "http://apps.facebook.com/"+SCRIPT.name+"/index.php";
	return;
}
	
// automission logic here
if(GM_getValue('autoMission', '') == "checked")
{
	if( energy>=missions[GM_getValue('selectMission', 1)][1])
	{
		if (location.href.indexOf(SCRIPT.name+'/jobs') != -1)
		{
			var missionsList = document.evaluate("//input[@value='Do Mission']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
			var sform = missionsList.snapshotItem(GM_getValue('selectMission', 0));
			setTimeout(function(){sform.click();},delay);
		}
		else
			window.location = "http://apps.facebook.com/"+SCRIPT.name+"/jobs.php";
		return;
	}	
}	 

// bank logic here
if(GM_getValue('autoBank', '') == "checked")
{
	if(blood>parseInt(GM_getValue('bankConfig', 100000))+10)
	{
		document.getElementById(SCRIPT.appID+'_bank_popup').style.display = 'block';
		var sform = document.getElementById(SCRIPT.appID+'_bank_popup').getElementsByTagName('form')[1];
		document.getElementsByName("amount")[1].value = blood-GM_getValue('bankKeep', 50000);
		setTimeout(function(){sform.submit();},delay);
		return;
	}
}	

// autoheal
if(GM_getValue('autoHeal', '') == "checked")
{
	if(health<GM_getValue('healthLevel', '')  && rage>GM_getValue('healthRage', '') )
	{
		document.getElementById(SCRIPT.appID+'_health_refill_popup').style.display = 'block';
		setTimeout(function(){document.getElementById(SCRIPT.appID+'_health_refill_popup').getElementsByTagName('form')[0].submit();},delay);
		return;
	}
}
			
// autofight
if(GM_getValue('autoFight', '') == "checked" && rage>0)
{
	if(health>19)
	{
		if(GM_getValue('fightRandom', '') == "checked")
		{
			if (location.href.indexOf(SCRIPT.name+'/fight') != -1)
			{
				var opponents  = document.evaluate("//input[@name='opponent_id']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);//.singleNodeValue;
				//var fightIndex = Math.floor(Math.random()*opponents.snapshotLength);
				for (var fightIndex=0;fightIndex<opponents.snapshotLength;fightIndex++) {
				try {
					var fightNode =opponents.snapshotItem(fightIndex).parentNode.parentNode.parentNode; 
					var opponentLevel =  parseInt(fightNode.innerHTML.split('Level ')[1]);
					var opponentRating = fightNode.innerHTML.split('groupsize">')[1];
					opponentRating = parseInt(opponentRating.replace(",", ""));
					var opponentClan = parseInt(fightNode.innerHTML.split('groupsize">')[2]);
					if(opponentLevel< GM_getValue('fightLevel', '100') && opponentClan<GM_getValue('fightClanSize', '502') && opponentRating>GM_getValue('fightClanRating', '500'))
					{
						setTimeout("document.location = '"+"http://apps.facebook.com/"+SCRIPT.name+"/fight.php?opponent_id="+opponents.snapshotItem(fightIndex).value+"&action=attack"+"'", delay);
						return;
					}
				}
				catch (e) {continue;}
				}
				setTimeout("document.location ='" + "http://apps.facebook.com/"+SCRIPT.name+"/fight.php"+"'", delay);
			}
			else
				window.location = "http://apps.facebook.com/"+SCRIPT.name+"/fight.php";
		}
		
		if(GM_getValue('freshMeat', '') == "checked")
			setTimeout("document.location ='" + "http://apps.facebook.com/"+SCRIPT.name+"/fight.php?opponent_id= &action=face_friend_invite"+"'", delay);

		if(GM_getValue('rFightList', '') == "checked")
			setTimeout("document.location = '"+"http://apps.facebook.com/"+SCRIPT.name+"/fight.php?opponent_id="+parseInt(GM_getValue('fightList', ''))+"&action=attack"+"'", delay);
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

//    if(document.getElementById('autoClan').checked == true)
//        GM_setValue('autoClan', 'checked');
//    else
//        GM_setValue('autoClan', '0');

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

    if(document.getElementById('autoBuff').checked == true)
        GM_setValue('autoBuff', 'checked');
    else
        GM_setValue('autoBuff', '0');       

    if(document.getElementById('autoFight').checked == true)
        GM_setValue('autoFight', 'checked');
    else
        GM_setValue('autoFight', '0');

    if(document.getElementById('fightRandom').checked == true)
        GM_setValue('fightRandom', 'checked');
    else
        GM_setValue('fightRandom', '0');
	
    if(document.getElementById('freshMeat').checked == true)
        GM_setValue('freshMeat', 'checked');
    else
        GM_setValue('freshMeat', '0');

    if(document.getElementById('rFightList').checked == true)
        GM_setValue('rFightList', 'checked');
    else
        GM_setValue('rFightList', '0');

    GM_setValue('refreshPage', document.getElementById('refreshPage').value);
    GM_setValue('selectMission', selectMission.selectedIndex );
    GM_setValue('bankConfig', document.getElementById('bankConfig').value);
    GM_setValue('bankKeep', document.getElementById('bankKeep').value);
    GM_setValue('r1', document.getElementById('r1').value);
    GM_setValue('r2', document.getElementById('r2').value);
    GM_setValue('fightList', document.getElementById('fightList').value);
    GM_setValue('healthLevel', document.getElementById('healthLevel').value);
    GM_setValue('healthRage', document.getElementById('healthRage').value);
    GM_setValue('fightLevel', document.getElementById('fightLevel').value);
    GM_setValue('fightClanSize', document.getElementById('fightClanSize').value);
    GM_setValue('fightClanRating', document.getElementById('fightClanRating').value);

    alert("settings saved.");
    document.location = location.href;
}

function uncheckAll()
{
		GM_setValue('autoBank', '0');
		GM_setValue('autoClick', '0');
		GM_setValue('autoFight', '0');
		GM_setValue('autoMission', '0');
		GM_setValue('autoHeal', '0');
		GM_setValue('autoBuff', '0');
		autoBuff
		document.location = location.href;
}

function checkAll()
{
		GM_setValue('autoBank', 'checked');
		GM_setValue('autoClick', 'checked');
		GM_setValue('autoFight', 'checked');
		GM_setValue('autoMission', 'checked');
		GM_setValue('autoHeal', 'checked');
		GM_setValue('autoBuff', 'checked');
		document.location = location.href;
}

function addToLog(line)
{
	var currentTime = new Date()
	var timestamp = currentTime.getDate()+ "/" + currentTime.getMonth()+ "/" +currentTime.getFullYear() +" " +currentTime.getHours() + ":" + currentTime.getMinutes()+" ";
	GM_setValue('itemLog', GM_getValue('itemLog', '') + timestamp + line + "<br/>")
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
/*
(
  function() {
    // Give a link to the News on the icon Exp
    var expIcon = document.evaluate("//img[contains(@src, 'icon-experience.gif')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (!expIcon) return;
    var expLink = document.createElement("a");
    expLink.href = "http://apps.facebook.com/vampiresgame/news_index.php";
    expLink.target = "_top";
    expLink.innerHTML = "<img src='http://facebook2.vampires.zynga.com/graphics/icon-experience.gif' />";
    expIcon.parentNode.insertBefore(expLink, expIcon);
    expIcon.parentNode.removeChild(expIcon);

    // Give a link to the mission "Exterminate A Rival Clan" on the icon Energy
    var energyIcon = document.evaluate("//img[contains(@src, 'icon-energy.gif')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (!energyIcon) return;
    var energyLink = document.createElement("a");
    energyLink.href = "http://apps.facebook.com/vampiresgame/jobs.php?action=Do+Job&job=29";
    energyLink.target = "_top";
    energyLink.innerHTML = "<img src='http://facebook2.vampires.zynga.com/graphics/icon-energy.gif' />";
    energyIcon.parentNode.insertBefore(energyLink, energyIcon);
    energyIcon.parentNode.removeChild(energyIcon);

    // Give a link to the HitList on the icon Rage
    var rageIcon = document.evaluate("//img[contains(@src, 'icon-stamina.gif')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (!rageIcon) return;
    var rageLink = document.createElement("a");
    rageLink.href = "http://apps.facebook.com/vampiresgame/hits.php";
    rageLink.target = "_top";
    rageLink.innerHTML = "<img src='http://facebook2.vampires.zynga.com/graphics/icon-stamina.gif' />";
    rageIcon.parentNode.insertBefore(rageLink, rageIcon);
    rageIcon.parentNode.removeChild(rageIcon);

    // Give a link to the Minions on the icon Blood
    var bloodIcon = document.evaluate("//img[contains(@src, 'icon-blood.gif')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (!bloodIcon) return;
    var bloodLink = document.createElement("a");
    bloodLink.href = "http://apps.facebook.com/vampiresgame/properties.php";
    bloodLink.target = "_top";
    bloodLink.innerHTML = "<img src='http://facebook2.vampires.zynga.com/graphics/icon-blood.gif' />";
    bloodIcon.parentNode.insertBefore(bloodLink, bloodIcon);
    bloodIcon.parentNode.removeChild(bloodIcon);

    // Give a link to the BloodBank on the icon Health
    var healthIcon = document.evaluate("//img[contains(@src, 'icon-health.gif')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (!healthIcon) return;
    var healthLink = document.createElement("a");
    healthLink.href = "http://apps.facebook.com/vampiresgame/bloodbank.php";
    healthLink.target = "_top";
    healthLink.innerHTML = "<img src='http://facebook2.vampires.zynga.com/graphics/icon-health.gif' />";
    healthIcon.parentNode.insertBefore(healthLink, healthIcon);
    healthIcon.parentNode.removeChild(healthIcon);
  }
)();*/