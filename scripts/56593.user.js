// ==UserScript==
// @name           SpaceWars
// @description    autoplayer for the SpaceWars game
// @namespace      facebook
// @version        1.2.2
// @include        http://apps.facebook.com/spacewarsgame/*
// ==/UserScript==

var settingsOpen = false;
var logOpen      = false;
var delay = 3000;
var credits2Update = 100000;

var SCRIPT = {
	url: 'http://userscripts.org/scripts/source/20648.user.js',
	version: '1.2.2',
	name: 'spacewarsgame',
	appID: 'app36842288331',
	money: 'credit',
	clan: 'fleet',
	presentationurl: 'http://userscripts.org/scripts/show/20648'
};

var image = 'data:image/gif;base64,R0lGODlhEAAQAOZ/APV+AfaRA/748/qdVfvKpvl0CvV6APunC/54AvZ8JP/7+P/t3f/9/P/49PijB/2rDv/59P3Dk/7z6v/ewP/HaPeBAvx7DP/u4P62OPzBVv+xSfidBv3o2f/Kc/eQRf/z6fyiM//cr/7q2fSPAfuwKvzQsP/FYvuLBf2uDv+xa//69fuLDv++T//9+/V1Fv+4cP25QvR2APmwJv/VkPSDAPWgAvyqDf/Kmv67RvecBf/lzf/w4v/KcfRpAf/37/iPQf/MlPaEBv/Vp//dpP/gxPipB/q0gP/YtfvJo/eiDvzLpf/isf/Nof/XsvzUtv/IbP+mRP2pEf6sE/+vF/iaVfyfUv+TJf+vGPqoGP/17P717v/VmPusbvmLNPytbv2safaCLf+9dfuZJPhvAf+jU/+mV//DXP/RhvWUAv/Xk/WBAP/38vehBvmmCf2pDvV5H//Lnf/8+fy6RP2XP//+/fafBP7AV//lz/+ybf+/U/++Uf7CWPx9CvRpBP/27v///yH5BAEAAH8ALAAAAAAQABAAAAezgH+Cg39ZO4SIiE0piY0QeAgijYgTYSBck4MKEVsZBReIDAo+C3dHQkMUYnM3RAt+cUxlZC9AIUtpT3saUFZ8BV4qVSswHTNnPCZmdnIyQT9afwwDFVgYLHl6OCRJAD8Ngy0DYwdSU1dRGz0e4IQfFm4PNg8HOX0ciToIKG1sDg51YjhJBOdEETQGDASoQcNIoi8B1CQgUAIMgBFUEnVxEUGAIAVI3iSgQ0iBEgmJ1hBoFwgAOw==';

var missions = new Array(
	["Rescue Stranded Miners",1,1], //1
	["Repel Space Pirates",3,1],	 //2
	["Smuggle Illicit Goods",5,1],//3
	["Clear asteroid field",6,1],//4
	["Destroy Alien Nest",7,1],//5
	["Free Outer Colony Prisoners",10,2], // 6
	["Sell Ammunition to Rebels",15,2], // 7
	["Intercept Interstellar Gold Shipment",18,3], //8
	["Assassinate Galactic Dictator",25,3], // 9
	["Invade Planet",22,4],//10
	["Excavate remnants of alien civilization",1,1], //11
	["Mine comet tail",2,1], //12
	["Prevent an ambassador's assassination",5,2], //13
	["Prevent android uprising ",6,2], //14
	["Investigate anomalous planet",8,3], //15
	["Pacify warring factions",13,3],//16
	["Win an interstellar race",19,4], //17
	["Infiltrate Imperial research networks",25,4],//18
	["Fly through wormhole",25,4],//19
	["Thwart Imperial Coup",40,4] //20
	// more will follow soon...
	);

var XMLHttpFactories = [
    function () {return new XMLHttpRequest()},
    function () {return new ActiveXObject("Msxml2.XMLHTTP")},
    function () {return new ActiveXObject("Msxml3.XMLHTTP")},
    function () {return new ActiveXObject("Microsoft.XMLHTTP")}
];
document.getElementsByXPath = function(sValue){ var aResult = new Array();var a = this.evaluate(sValue, ((arguments.lenth > 1) ? arguments[1] : this), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);for ( var i = 0 ; i < a.snapshotLength ; i++ ){aResult.push(a.snapshotItem(i));}return aResult;};

// reload logic
if(GM_getValue('autoClick', '') == "checked")
{
    var timeWait = Math.floor(parseFloat(GM_getValue('r1', '6')) + parseFloat((GM_getValue('r2', '11'))-parseFloat(GM_getValue('r1', '6')))*Math.random())*1000;
    setTimeout("document.location = '"+"http://apps.facebook.com/"+SCRIPT.name+"/index.php"+"'", timeWait);
}

	var fleet =  parseInt(document.body.innerHTML.split('my fleet (')[1]);
	var credits = document.getElementById(SCRIPT.appID+'_stats_table').innerHTML.split('$')[1];
	credits = credits.replace(",","");
	credits = credits.replace(",","");
	credits = parseInt(credits);

	var health = parseInt(document.getElementById( SCRIPT.appID+'_current_health').innerHTML);
	var energy = parseInt(document.getElementById( SCRIPT.appID+'_current_energy').innerHTML);
    var munition =parseInt(document.getElementById( SCRIPT.appID+'_current_stamina').innerHTML);

// menu logic
    var settingsButton = document.createElement("div");
        settingsButton.innerHTML = "open settings";
        settingsButton.setAttribute("style", "position: absolute; left: 5px; top: 3px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");
        settingsButton.addEventListener('click', toggleSettings, false);
        document.body.appendChild(settingsButton);

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
        settingsBox.setAttribute("style", "position: absolute; left: 5px; top: 21px; width: 460px; height: 360px; background-color: #000000;background-image: url(http://facebook2.spacewars.static.zynga.com/graphics/content.jpg); font-family: tahoma; font-size: 10pt; text-align: left; padding: 5px; border: 1px dotted; visibility: hidden; z-index: 100;");
        document.body.appendChild(settingsBox);

    var logBox = document.createElement("div");
        logBox.innerHTML = GM_getValue('itemLog', 'log empty');
        logBox.setAttribute("style", "position: absolute; overflow: scroll; right: 5px; top: 21px; width: 450px; height: 250px; background-color: #FFFFFF; font-family: tahoma; font-size: 10pt; text-align: left; padding: 5px; border: 1px dotted; visibility: hidden; z-index: 999999;");
        document.body.appendChild(logBox);

    var versionBox = document.createElement("div");
        versionBox.innerHTML  = "<img src='http://www.zynga.com/images/games/gameSmall_spacewars.jpg'/><strong> "+SCRIPT.version+" </strong>";
        versionBox.setAttribute("style", "position: absolute; color: #FFFFFF;");
        settingsBox.appendChild(versionBox);
		
    var autoClick = document.createElement("div");
        autoClick.innerHTML  = "<input type='checkbox' id='autoClick' value='checked' "+GM_getValue('autoClick', '')+">enable auto-refresh";
        autoClick.setAttribute("style", "position: absolute; top: 100px; color: #FFFFFF;");
        settingsBox.appendChild(autoClick);
		
   var refreshTimes = document.createElement("div");
        refreshTimes.innerHTML  = "refresh every <input type='text' style='border: none; text-align: center; background-color: #EEEEEE;' value='"+GM_getValue('r1', '30')+"' id='r1' size='2'>";
        refreshTimes.innerHTML += " to <input type='text' style='border: none; text-align: center; background-color: #EEEEEE;' value='"+GM_getValue('r2', '110')+"'id='r2' size='2'> seconds";
        refreshTimes.setAttribute("style", "position: absolute; top: 125px;color: #FFFFFF;");
        settingsBox.appendChild(refreshTimes);

	var autofleet = document.createElement("div");
        autofleet.innerHTML  = "<input type='checkbox' id='autofleet' value='checked' "+GM_getValue('autofleet', '')+">enable auto-"+SCRIPT.clan+" update";
        autofleet.setAttribute("style", "position: absolute; top: 150px;color: #FFFFFF;");
        settingsBox.appendChild(autofleet);
    
	var autoMission = document.createElement("div");
         autoMission.innerHTML  = "<input type='checkbox' id='autoMission' value='checked' "+GM_getValue('autoMission', '')+">enable auto-Mission";
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
		selectMission.selectedIndex = GM_getValue('selectMission', 1)
		selectMission.setAttribute("style", "position: absolute; top: 200px;");
        settingsBox.appendChild(selectMission);
		 
    var autoBank = document.createElement("div");
         autoBank.innerHTML  = "<input type='checkbox' id='autoBank' value='checked' "+GM_getValue('autoBank', '')+">enable auto-Bank";
         autoBank.setAttribute("style", "position: absolute; top: 235px;color: #FFFFFF;");
         settingsBox.appendChild(autoBank);

    var bankConfig = document.createElement("div");
        bankConfig.innerHTML = "min. amount: <input type='text' style='border: none; width: 100px; text-align: center; background-color: #EEEEEE;' value='"+GM_getValue('bankConfig', '50000')+"' id='bankConfig' size='5'>";
        bankConfig.setAttribute("style", "position: absolute; top: 260px;left: 15px;color: #FFFFFF;");
        settingsBox.appendChild(bankConfig);

    var autoHeal = document.createElement("div");
        autoHeal.innerHTML  = "<input type='checkbox' id='autoHeal' value='checked' "+GM_getValue('autoHeal', 'checked')+">enable auto-Heal";
        autoHeal.setAttribute("style", "position: absolute; top:285px;color: #FFFFFF;");
        settingsBox.appendChild(autoHeal);

    var healthLevel = document.createElement("div");
        healthLevel.innerHTML = "min. health: <input type='text' style='border: none; width: 30px; text-align: center; background-color: #EEEEEE;' value='"+GM_getValue('healthLevel', '50')+"' id='healthLevel' size='1'>";
        healthLevel.setAttribute("style", "position: absolute; top: 310px;color: #FFFFFF;");
        settingsBox.appendChild(healthLevel);

    var healthRage = document.createElement("div");
        healthRage.innerHTML = "max. munition: <input type='text' style='border: none; width: 30px; text-align: center; background-color: #EEEEEE;' value='"+GM_getValue('healthmunition', '-1')+"' id='healthmunition' size='1'>";
        healthRage.setAttribute("style", "position: absolute; left: 120px;;top: 310px;color: #FFFFFF;");
        settingsBox.appendChild(healthRage);

	var updateButton = document.createElement("div");
        updateButton.innerHTML  = "<button>check for updates</button>";
        updateButton.addEventListener('click', updateScript, false);
        updateButton.setAttribute("style", "position: absolute;left: 70px; top: 335px;");
        settingsBox.appendChild(updateButton);		
		
    var autoFight = document.createElement("div");
        autoFight.innerHTML  = "<input type='checkbox' id='autoFight' value='checked' "+GM_getValue('autoFight', '')+">enable auto-Fight";
        autoFight.setAttribute("style", "position: absolute; left: 260px;top: 25px;color: #FFFFFF;");
        settingsBox.appendChild(autoFight);

    var fightRandom = document.createElement("div");
        fightRandom.innerHTML  = "<input type='radio' name='r1' id='fightRandom' value='checked' "+GM_getValue('fightRandom', '')+"> fight random";
        fightRandom.setAttribute("style", "position: absolute; left: 260px; top: 50px;color: #FFFFFF;");
        settingsBox.appendChild(fightRandom);
	
    var fightLevel = document.createElement("div");
        fightLevel.innerHTML = "max. level: <input type='text' style='border: none; width: 30px; text-align: center; background-color: #EEEEEE;' value='"+GM_getValue('fightLevel', '100')+"' id='fightLevel' size='1'>";
        fightLevel.setAttribute("style", "position: absolute; left: 260px; top: 75px;color: #FFFFFF;");
        settingsBox.appendChild(fightLevel);

    var fightClanSize = document.createElement("div");
        fightClanSize.innerHTML = "max. league: <input type='text' style='border: none; width: 30px; text-align: center; background-color: #EEEEEE;' value='"+GM_getValue('fightClanSize', '502')+"' id='fightClanSize' size='1'>";
        fightClanSize.setAttribute("style", "position: absolute; left: 360px;top: 75px;color: #FFFFFF;");
        settingsBox.appendChild(fightClanSize);

    var freshMeat = document.createElement("div");
        freshMeat.innerHTML  = "<input type='radio' name='r1' id='freshMeat' value='checked' "+GM_getValue('freshMeat', '')+"> go for fresh Meat";
        freshMeat.setAttribute("style", "position: absolute; left: 260px; top: 100px;color: #FFFFFF;");
        settingsBox.appendChild(freshMeat);

	var fightList = document.createElement("div");
        fightList.innerHTML  = "<input type='radio' name='r1' id='rFightList' value='checked' "+GM_getValue('rFightList', '')+"> fight list:<br /><textarea style='border: none; background-color: #EEEEEE; width: 180px; height: 180px;' id='fightList'>"+GM_getValue('fightList', '')+"</textarea>";
        fightList.setAttribute("style", "position: absolute; left: 260px;top: 125px;color: #FFFFFF;");
        settingsBox.appendChild(fightList);

    var saveButton = document.createElement("div");
        saveButton.innerHTML  = "<button>save settings</button>";
        saveButton.addEventListener('click', saveSettings, false);
        saveButton.setAttribute("style", "position: absolute;left: 300px; top: 335px;");
        settingsBox.appendChild(saveButton);

// message logic here...
if (document.body.innerHTML.indexOf('message_body') != -1)
{		
	var boxes = document.getElementById(SCRIPT.appID+'_content_row').getElementsByTagName('span');
	if(boxes.length>0)
	{
	var messagebox = boxes[0];
	// skip this messagebox... for now
	if(messagebox.innerHTML.indexOf('Someone has invited you to join their fleet') != -1)
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
	else if(messagebox.innerHTML.indexOf('You successfully purchased') != -1)
	{
		var minion = messagebox.innerHTML.split('You successfully purchased')[1];
		minion = minion.split('.')[0];
		addToLog("You successfully purchased " + minion);
	}
	else if(messagebox.innerHTML.indexOf('gained a loot item') != -1)
	{
		// for (var i=1;i<boxes.length;i++)
				// alert(boxes[i].innerHTML);
		var ability = messagebox.innerHTML.split('bold;">')[1].split('</span>')[0];
		addToLog("gained a loot item " + ability);
	}
	else if(messagebox.innerHTML.indexOf('You withdrew') != -1)
	{
		var deposit	= messagebox.innerHTML.split('money">$')[1];
		deposit = deposit.replace(",","");
		deposit = deposit.replace(",","");
		deposit = parseInt(deposit);
		addToLog("withrew " + deposit);
	}
	else if(messagebox.innerHTML.indexOf('deposited and stored safely') != -1)
	{
		var deposit	= messagebox.innerHTML.split('money">$')[1];
		deposit = deposit.replace(",","");
		deposit = deposit.replace(",","");
		deposit = parseInt(deposit);
		addToLog("deposit " + deposit);
	}
	else if(messagebox.innerHTML.indexOf('more shield') != -1)
	{
		var addHealth = messagebox.innerHTML.split('ship with <strong>')[1].split('more shield')[0];
		var cost = 0;
		if(messagebox.innerHTML.indexOf('money">$') != -1)
			cost = messagebox.innerHTML.split('money">$')[1];
		cost	 = cost.replace(",","");
		cost	 = cost.replace(",","");
		cost	 = parseInt(cost	);
		addToLog("shield +"+ addHealth + " for " + cost	);
	}
	else if(messagebox.innerHTML.indexOf('You battled against') != -1)
	{
		if(GM_getValue('freshMeat', '') != "checked")
		{
			var user = messagebox.innerHTML.split('user=')[1];
			var battleResult = document.evaluate("//span[@class='good']",document,null,9,null).singleNodeValue;
			if(battleResult!=null && battleResult.innerHTML.indexOf('$') != -1)
			{
				var cost = battleResult.innerHTML.split('$')[1];	
				cost = cost.replace(",","");
				cost = cost.replace(",","");
				addToLog("fight "+ parseInt(user) + " WON " +parseInt(cost));
			}
			battleResult = document.evaluate("//span[@class='bad']",document,null,9,null).singleNodeValue;
			if(battleResult!=null && battleResult.innerHTML.indexOf('$') != -1)
			{
				var cost = battleResult.innerHTML.split('$')[1];	
				cost = cost.replace(",","");
				cost = cost.replace(",","");
				addToLog("fight "+ parseInt(user) + " LOST " +parseInt(cost));
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
	else if(messagebox.innerHTML.indexOf('Your opponent is already dead or too weak to fight') != -1)
	{
		if(GM_getValue('rFightList', '') == "checked")
			CycleFightList();
	}
	else if(messagebox.innerHTML.indexOf('Buy items at the Ship Upgrades Page') != -1)
	{
		GM_setValue('autoMission', '');
	}
	else if(messagebox.innerHTML.indexOf('You cannot heal so fast') != -1)
	{
		return;
	}
//	else
//		alert(messagebox.innerHTML);
	}
}

// show return per minion
if (location.href.indexOf(SCRIPT.name+'/properties') != -1)
{
	var minions = document.evaluate("//tr[@class='darkRow']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for(var index = 1 ; index<minions.snapshotLength;index++)
	{
		var minionIncome = minions.snapshotItem(index).getElementsByTagName('td')[1].getElementsByTagName('div')[1];
		minionIncome = minionIncome.innerHTML.split('money">$')[1];
		minionIncome	 = minionIncome.replace(",","");
		minionIncome	 = minionIncome.replace(",","");
		minionIncome	 = parseInt(minionIncome	);
		var minionCost = minions.snapshotItem(index).getElementsByTagName('td')[2].getElementsByTagName('td')[0];
		minionCost = minionCost.innerHTML.split('$')[1];
		minionCost	 = minionCost.replace(",","");
		minionCost	 = minionCost.replace(",","");
		minionCost	 = parseInt(minionCost	);
		minionCost = minionCost / minionIncome;
		var divSpot = minions.snapshotItem(index).getElementsByTagName('td')[1].getElementsByTagName('div')[3];
		var divbox = document.createElement('div');
		divbox.innerHTML =  'Cost per '+SCRIPT.money+': <strong class="money">$'+minionCost.toFixed(2)+'</strong>';
		divSpot.parentNode.insertBefore(divbox,divSpot.nextSibling);
	}

	var minions = document.evaluate("//tr[@class='lightRow']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for(var index = 0 ; index<minions.snapshotLength;index++)
	{
		var minionIncome = minions.snapshotItem(index).getElementsByTagName('td')[1].getElementsByTagName('div')[1];
		minionIncome = minionIncome.innerHTML.split('money">$')[1];
		minionIncome	 = minionIncome.replace(",","");
		minionIncome	 = minionIncome.replace(",","");
		minionIncome	 = parseInt(minionIncome	);
		var minionCost = minions.snapshotItem(index).getElementsByTagName('td')[2].getElementsByTagName('td')[0];
		minionCost = minionCost.innerHTML.split('$')[1];
		minionCost	 = minionCost.replace(",","");
		minionCost	 = minionCost.replace(",","");
		minionCost	 = parseInt(minionCost	);
		minionCost = minionCost / minionIncome;
		var divSpot = minions.snapshotItem(index).getElementsByTagName('td')[1].getElementsByTagName('div')[3];
		var divbox = document.createElement('div');
		divbox.innerHTML =  'Cost per '+SCRIPT.money+': <strong class="money">$'+minionCost.toFixed(2)+'</strong>';
		divSpot.parentNode.insertBefore(divbox,divSpot.nextSibling);
	}
}
// fleet logic here
if(GM_getValue('autofleet', '') == "checked" && fleet!=GM_getValue('fleetSize', 1)) 
{
	if(credits< credits2Update)
	{
		if (location.href.indexOf(SCRIPT.name+'/bank') != -1)
		{
			var sform = document.getElementsByTagName('form')[1];
			document.getElementsByName("amount")[0].value =  credits2Update-credits;
			setTimeout(function(){sform.submit();},delay);
		}
		else
			window.location = "http://apps.facebook.com/"+SCRIPT.name+"/bank.php";
	} 
	else if (location.href.indexOf(SCRIPT.name+'/index') != -1)
	{
		var required =  parseInt(document.body.innerHTML.split('Requires ')[1]);
		if(fleet >= required)
		{
			var sform = document.getElementsByTagName('form')[1];
			setTimeout(function(){sform.submit();},delay);
		}		
		else
			window.location = "http://apps.facebook.com/"+SCRIPT.name+"/properties.php";
	}
	else if (location.href.indexOf(SCRIPT.name+'/properties') != -1)
	{
		var required = document.body.innerHTML.split('Requires:</div>')[1];
		 required = required.split('<div style="float: left; margin-left: 4px;">')[1];
	    required = parseInt(required);
		if(fleet >= required)
			 setTimeout(function(){document.getElementsByTagName('form')[1].submit();},delay);
		GM_setValue('fleetSize', fleet);
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
			var mission = GM_getValue('selectMission', 1)+1;
			var sform = document.evaluate("//form[@id='"+SCRIPT.appID+"_doJob_"+mission+"']",document,null,9,null).singleNodeValue;
			setTimeout(function(){sform.submit();},delay);
		}
		else
			window.location = "http://apps.facebook.com/"+SCRIPT.name+"/jobs.php?tab="+missions[GM_getValue('selectMission', 1)][2];
		return;
	}	
}	 

// bank logic here
if(GM_getValue('autoBank', '') == "checked")
{
	if(credits>parseInt(GM_getValue('bankConfig', 100000))+10)
	{
		if (location.href.indexOf(SCRIPT.name+'/bank') != -1)
		{
			var sform = document.getElementsByTagName('form')[2];
			document.getElementsByName("amount")[1].value = credits;
			setTimeout(function(){sform.submit();},delay);
		}
		else
			window.location = "http://apps.facebook.com/"+SCRIPT.name+"/bank.php";
		return;
	}
}	

// autoheal
if(GM_getValue('autoHeal', '') == "checked")
{
	if(health<GM_getValue('healthLevel', '')  && munition>GM_getValue('healthmunition', '') )
	{
		if (location.href.indexOf(SCRIPT.name+'/hospital') != -1)
			setTimeout(function(){document.getElementsByTagName('form')[1].submit();},delay);
		else
			window.location = "http://apps.facebook.com/"+SCRIPT.name+"/hospital.php";
		return;
	}
}
			
// autofight
if(GM_getValue('autoFight', '') == "checked" && munition>0)
{
	if(health>19)
	{
		if(GM_getValue('fightRandom', '') == "checked")
		{
			if (location.href.indexOf(SCRIPT.name+'/fight') != -1)
			{
				var opponents  = document.evaluate("//input[@name='opponent_id']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);//.singleNodeValue;
				var fightIndex = Math.floor(Math.random()*opponents.snapshotLength);
				var fightNode =opponents.snapshotItem(fightIndex).parentNode.parentNode.parentNode; 
				var opponentLevel =  parseInt(fightNode.innerHTML.split('Level ')[1]);
				var opponentClan = parseInt(fightNode.innerHTML.split('groupsize">')[1]);

				if(opponentLevel< GM_getValue('fightLevel', '100') && opponentClan<GM_getValue('fightClanSize', '502'))
					setTimeout("document.location = '"+"http://apps.facebook.com/"+SCRIPT.name+"/fight.php?opponent_id="+opponents.snapshotItem(fightIndex).value+"&action=attack"+"'", delay);
				else
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

//Grab the last known request form ID
var reqID = GM_getValue('reqformID',false);

//If we don't have a reqID or its older than a day, grab a fresh one.
if (!reqID) 
{
	if (location.href.indexOf(SCRIPT.name+'/recruit') != -1)
	{
		Array.forEach(document.getElementsByTagName("input"),
			function(obj)
			{
				if (obj.id.indexOf('mfs_typeahead_req_form_') != -1) 
				{
					GM_setValue('reqformID',obj.id.replace('mfs_typeahead_req_form_',''));
					return;
				}
			}
		);
	}
	else
		window.location = "http://apps.facebook.com/"+SCRIPT.name+"/recruit.php";
	return;
}

var members = document.getElementsByXPath("//a[contains(@href,'/"+SCRIPT.name+"/stats.php?user=')]");
//First link is always yourself from the 'my stats' link at the top
 Array.forEach(members,
	 function(member){
		var mobid = member.href.match(/\d+$/);
		var newImg = document.createElement("img");
		newImg.setAttribute("src", image);
		newImg.addEventListener('click',invitePlayer(mobid), false);
		member.parentNode.insertBefore(newImg,member);
	 }
	 );
 
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

    if(document.getElementById('autofleet').checked == true)
        GM_setValue('autofleet', 'checked');
    else
        GM_setValue('autofleet', '0');

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
    GM_setValue('selectMission', selectMission.selectedIndex );
    GM_setValue('bankConfig', document.getElementById('bankConfig').value);
    GM_setValue('r1', document.getElementById('r1').value);
    GM_setValue('r2', document.getElementById('r2').value);
    GM_setValue('fightList', document.getElementById('fightList').value);
    GM_setValue('healthLevel', document.getElementById('healthLevel').value);
    GM_setValue('healthmunition', document.getElementById('healthmunition').value);
    GM_setValue('fightLevel', document.getElementById('fightLevel').value);
    GM_setValue('fightClanSize', document.getElementById('fightClanSize').value);

    alert("settings saved.");
    document.location = location.href;
}

function addToLog(line)
{
	var currentTime = new Date()
	var month = 1+ parseInt(currentTime.getMonth());
	var timestamp = currentTime.getDate()+ "/" + month+ "/" +currentTime.getFullYear() +" " +currentTime.getHours() + ":" + currentTime.getMinutes()+" ";
    GM_setValue('itemLog', GM_getValue('itemLog', '')+ timestamp + line+"<br />")
}

function clearLog()
{
    GM_setValue('itemLog', '');
    logBox.innerHTML = "";
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
		if (!GM_getValue)
			return;
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
		alert(ex);
	}
}

//invite users (By Andy Calderbank  and others, updated version by me)
function invitePlayer(mobid)
{
	return function () 
	{
		if (window.confirm('Do you want to invite this person ? ' + mobid)) 
		{
			GM_xmlhttpRequest({
			method: "POST",
			url: "http://apps.facebook.com/"+SCRIPT.name+"/recruit.php?action=create",
			headers:{'Content-type':'application/x-www-form-urlencoded'},
			data:reqID + '=Start+Typing+a+Friend%27s+Name&ids%5B%5D=' + mobid,
			onload: function(xhr) { }
			});
		}
	}
}
