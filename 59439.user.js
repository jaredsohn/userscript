// ==UserScript==
// @name           StreetRacing
// @description    autoplayer for the StreetRacing game
// @namespace      facebook
// @version        1.7.0
// @include        http://apps.facebook.com/streetracinggame/*
// ==/UserScript==
document.getElementById("menubar_container").style.display = "none";

var settingsOpen = false;
var logOpen      = false;
var delay = 3000;

var SCRIPT = {
	url: 'http://userscripts.org/scripts/source/39285.user.js',
	version: '1.7.0',
	name: 'streetracinggame',
	appID: 'app32375531555',
	money: 'dollar',
	clan: 'crew',
	presentationurl: 'http://userscripts.org/scripts/show/39285'
};

var image = 'data:image/gif;base64,R0lGODlhEAAQAOZ/APV+AfaRA/748/qdVfvKpvl0CvV6APunC/54AvZ8JP/7+P/t3f/9/P/49PijB/2rDv/59P3Dk/7z6v/ewP/HaPeBAvx7DP/u4P62OPzBVv+xSfidBv3o2f/Kc/eQRf/z6fyiM//cr/7q2fSPAfuwKvzQsP/FYvuLBf2uDv+xa//69fuLDv++T//9+/V1Fv+4cP25QvR2APmwJv/VkPSDAPWgAvyqDf/Kmv67RvecBf/lzf/w4v/KcfRpAf/37/iPQf/MlPaEBv/Vp//dpP/gxPipB/q0gP/YtfvJo/eiDvzLpf/isf/Nof/XsvzUtv/IbP+mRP2pEf6sE/+vF/iaVfyfUv+TJf+vGPqoGP/17P717v/VmPusbvmLNPytbv2safaCLf+9dfuZJPhvAf+jU/+mV//DXP/RhvWUAv/Xk/WBAP/38vehBvmmCf2pDvV5H//Lnf/8+fy6RP2XP//+/fafBP7AV//lz/+ybf+/U/++Uf7CWPx9CvRpBP/27v///yH5BAEAAH8ALAAAAAAQABAAAAezgH+Cg39ZO4SIiE0piY0QeAgijYgTYSBck4MKEVsZBReIDAo+C3dHQkMUYnM3RAt+cUxlZC9AIUtpT3saUFZ8BV4qVSswHTNnPCZmdnIyQT9afwwDFVgYLHl6OCRJAD8Ngy0DYwdSU1dRGz0e4IQfFm4PNg8HOX0ciToIKG1sDg51YjhJBOdEETQGDASoQcNIoi8B1CQgUAIMgBFUEnVxEUGAIAVI3iSgQ0iBEgmJ1hBoFwgAOw==';

var missions = new Array(
	["Fix 'er up",1,1], //1
	["Child's Play",3,1],	//2 
	["If you got it, Flaunt it!",5,1],	 //3
	["The Lake Show",6,1],	 //4
	["Bragging Rights",7,1], //5
	["Five-0",10,2],	 //6
	["Land of Freedom",15,2],//7	 
	["All American Muscle",16,2], //8	 
	["C-Rocket",16,2], //9
	["Trick or Treat",18,2], //10
	["Hello Kitty?", 25,3], // 11
	["Get Sideways", 22,3], //12
	["One-up", 24,3], //13
	["Capcom Rules", 25,3],//14
	["R-E-S-P-E-C-T", 25,3],//15
	["Smack Talking", 27,4], //16
	["London Bridge", 27,4], //17
	["Manchester Run", 28,4], //18
	["Rachel's Got Game", 30,4], //19
	["UK Cross Country Challenge", 40,4], //20
	["They've lost their minds!",12,1], //21
	["PS3",22,2], //22
	["Initial D",28,3], //23
	["Kiss kiss", 45,4] //24
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
    var crew = parseInt(document.getElementById( SCRIPT.appID+'_headerCrewLink').innerHTML.split('true;">')[1]);
	var cash = document.evaluate("//td[@title='Gain Cash in Races, Bounties, and Sponsors.']",document,null,9,null).singleNodeValue;
	cash = cash.innerHTML.split('$')[1];
	cash = parseInt(cash.replace(/,/g, ''));
	var gas =  parseInt(document.getElementsByXPath("//span[contains(@id,'current_energy')]")[0].innerHTML);
	var health =  parseInt(document.getElementsByXPath("//span[contains(@id,'current_health')]")[0].innerHTML);
	var adrenaline =  parseInt(document.getElementsByXPath("//span[contains(@id,'current_stamina')]")[0].innerHTML);

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
        settingsBox.setAttribute("style", "position: absolute; left: 5px; top: 21px; width: 460px; height: 360px; background-color: #000000;background-image: url(http://facebook3.streetracing.static.zynga.com/25573/graphics/main_background_tile.gif); font-family: tahoma; font-size: 10pt; text-align: left; padding: 5px; border: 1px dotted; visibility: hidden; z-index: 100;");
        document.body.appendChild(settingsBox);

    var logBox = document.createElement("div");
        logBox.innerHTML = GM_getValue('itemLog', 'log empty');
        logBox.setAttribute("style", "position: absolute; overflow: scroll; right: 5px; top: 21px; width: 450px; height: 250px; background-color: #000000;background-image: url(http://facebook3.streetracing.static.zynga.com/25573/graphics/main_background_tile.gif); font-family: tahoma; font-size: 10pt; text-align: left; padding: 5px; border: 1px dotted; visibility: hidden; z-index: 999999;");
        document.body.appendChild(logBox);

    var versionBox = document.createElement("div");
        versionBox.innerHTML  = "<img src='http://www.zynga.com/images/games/gameSmall_streetracing.jpg'/><strong> "+SCRIPT.version+" </strong>";
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

	var autoClan = document.createElement("div");
         autoClan.innerHTML  = "<input type='checkbox' id='autocrew' value='checked' "+GM_getValue('autocrew', '')+">enable auto-"+SCRIPT.clan+" update";
        autoClan.setAttribute("style", "position: absolute; top: 150px;color: #FFFFFF;");
        settingsBox.appendChild(autoClan);
    
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
         autoBank.innerHTML  = "<input type='checkbox' id='autoBank' value='checked' "+GM_getValue('autoBank', '')+">enable auto-Bank";
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
        healthLevel.innerHTML = "min. health: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='"+GM_getValue('healthLevel', '50')+"' id='healthLevel' size='1'>";
        healthLevel.setAttribute("style", "position: absolute; top: 310px;color: #FFFFFF;");
        settingsBox.appendChild(healthLevel);

    var healthAdrenaline = document.createElement("div");
        healthAdrenaline.innerHTML = "max. Adrenaline: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='"+GM_getValue('healthAdrenaline', '5')+"' id='healthAdrenaline' size='1'>";
        healthAdrenaline.setAttribute("style", "position: absolute; left: 120px;;top: 310px;color: #FFFFFF;");
        settingsBox.appendChild(healthAdrenaline);

   var autoBuff = document.createElement("div");
        autoBuff.innerHTML  = "<input type='checkbox' id='autoBuff' value='checked' "+GM_getValue('autoBuff', 'checked')+">enable auto-Fill";
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
        fightRandom.innerHTML  = "<input type='radio' name='r1' id='fightRandom' value='checked' "+GM_getValue('fightRandom', '')+"> race random";
        fightRandom.setAttribute("style", "position: absolute; left: 300px; top: 50px;color: #FFFFFF;");
        settingsBox.appendChild(fightRandom);
	
    var fightLevel = document.createElement("div");
	fightLevel.innerHTML = "max. level: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('fightLevel', '100') + "' id='fightLevel' size='1'>";
        fightLevel.setAttribute("style", "position: absolute; left: 300px; top: 75px;color: #FFFFFF;");
        settingsBox.appendChild(fightLevel);

    var fightClanSize = document.createElement("div");
        fightClanSize.innerHTML = "max. "+SCRIPT.clan+": <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='"+GM_getValue('fightClanSize', '502')+"' id='fightClanSize' size='1'>";
        fightClanSize.setAttribute("style", "position: absolute; left: 300px;top: 100px;color: #FFFFFF;");
        settingsBox.appendChild(fightClanSize);

    var freshMeat = document.createElement("div");
        freshMeat.innerHTML  = "<input type='radio' name='r1' id='freshMeat' value='checked' "+GM_getValue('freshMeat', '')+"> go for fresh Crew";
	freshMeat.setAttribute("style", "position: absolute; left: 300px; top: 125px; color: #FFFFFF;");
        settingsBox.appendChild(freshMeat);

	var fightList = document.createElement("div");
	fightList.innerHTML  = "<input type='radio' name='r1' id='rFightList' value='checked' " + GM_getValue('rFightList', '') + "> fight list:<br/><textarea style='border: none; background-color: transparent; color: #AA0000; width: 180px; height: 155px;' id='fightList'>" + GM_getValue('fightList', '') + "</textarea>";
	fightList.setAttribute("style", "position: absolute; left: 300px; top: 150px; color: #FFFFFF;");
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
	if(messagebox.innerHTML.indexOf('Someone has invited you to join their alliance') != -1)
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
	else if(messagebox.innerHTML.indexOf('You raced against') != -1)
	{
		if(GM_getValue('freshMeat', '') != "checked")
		{
			var user = messagebox.innerHTML.split('user=')[1];
			var battleResult = document.evaluate("//span[@class='good']",document,null,9,null).singleNodeValue;
			if(battleResult!=null && battleResult.innerHTML.indexOf('$') != -1)
			{
				var cost = battleResult.innerHTML.split('$')[1];	
				addToLog("fight "+ parseInt(user) + " WON " +parseInt(cost.replace(/,/g, '')));
			}
			battleResult = document.evaluate("//span[@class='bad']",document,null,9,null).singleNodeValue;
			if(battleResult!=null && battleResult.innerHTML.indexOf('$') != -1)
			{
				var cost = battleResult.innerHTML.split('$')[1];	
				addToLog("fight "+ parseInt(user) + " LOST " +parseInt(cost.replace(/,/g, '')));
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
	else if(messagebox.innerHTML.indexOf('too weak to race') != -1)
	{
		if(GM_getValue('rFightList', '') == "checked")
			CycleFightList();	
	}
	//else
	//  alert(messagebox.innerHTML);
	}
}

// show return per minion
if (location.href.indexOf(SCRIPT.name+'/properties') != -1)
{
		var minions = document.evaluate("//tr[@class='darkRow']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var minReturn = 9999999;
		for (var index = 1 ; index < minions.snapshotLength ; index++)
		{
			if(minions.snapshotItem(index).innerHTML.indexOf('sold_out') == -1)
			{
				var minionIncome = minions.snapshotItem(index).getElementsByTagName('td')[1].getElementsByTagName('div')[1];
				minionIncome = minionIncome.innerHTML.split('money">$')[1];
				minionIncome = parseInt(minionIncome.replace(/,/g, ''));
				var minionCost = minions.snapshotItem(index).getElementsByTagName('td')[2].getElementsByTagName('td')[0];
				minionCost = minionCost.innerHTML.split('$')[1];
				minionCost = parseInt(minionCost.replace(/,/g, ''));
				var minionReturn = minionCost / minionIncome;
				if (minionReturn < minReturn)
					minReturn = minionReturn;
			}
		}

		var minions = document.evaluate("//tr[@class='lightRow']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var index = 0 ; index < minions.snapshotLength - 3 ; index++)
		{
			if(minions.snapshotItem(index).innerHTML.indexOf('sold_out') == -1)
			{
				var minionIncome = minions.snapshotItem(index).getElementsByTagName('td')[1].getElementsByTagName('div')[1];
				minionIncome = minionIncome.innerHTML.split('money">$')[1];
				minionIncome = parseInt(minionIncome.replace(/,/g, ''));
				var minionCost = minions.snapshotItem(index).getElementsByTagName('td')[2].getElementsByTagName('td')[0];
				minionCost = minionCost.innerHTML.split('$')[1];
				minionCost = parseInt(minionCost.replace(/,/g, ''));
				var minionReturn = minionCost / minionIncome;
				if (minionReturn < minReturn)
					minReturn = minionReturn;
			}
		}

		var minions = document.evaluate("//tr[@class='darkRow']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var index = 1 ; index < minions.snapshotLength ; index++)
		{
				var minionIncome = minions.snapshotItem(index).getElementsByTagName('td')[1].getElementsByTagName('div')[1];
				minionIncome = minionIncome.innerHTML.split('money">$')[1];
				minionIncome = parseInt(minionIncome.replace(/,/g, ''));
				var minionCost = minions.snapshotItem(index).getElementsByTagName('td')[2].getElementsByTagName('td')[0];
				minionCost = minionCost.innerHTML.split('$')[1];
				minionCost = parseInt(minionCost.replace(/,/g, ''));
				minionCost = minionCost / minionIncome;
				var divSpot = minions.snapshotItem(index).getElementsByTagName('td')[1].getElementsByTagName('div')[3];
				var divbox = document.createElement('div');
				divbox.innerHTML = 'Cost per '+SCRIPT.money+': <strong class='+(minionCost == minReturn ? "good":"bad")+'>$' + minionCost.toFixed(2) + '</strong>';
				divSpot.parentNode.insertBefore(divbox, divSpot.nextSibling);
		}

		var minions = document.evaluate("//tr[@class='lightRow']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var index = 0 ; index < minions.snapshotLength ; index++)
		{
				var minionIncome = minions.snapshotItem(index).getElementsByTagName('td')[1].getElementsByTagName('div')[1];
				minionIncome = minionIncome.innerHTML.split('money">$')[1];
				minionIncome = parseInt(minionIncome.replace(/,/g, ''));
				var minionCost = minions.snapshotItem(index).getElementsByTagName('td')[2].getElementsByTagName('td')[0];
				minionCost = minionCost.innerHTML.split('$')[1];
				minionCost = parseInt(minionCost.replace(/,/g, ''));
				minionCost = minionCost / minionIncome;
				var divSpot = minions.snapshotItem(index).getElementsByTagName('td')[1].getElementsByTagName('div')[3];
				var divbox = document.createElement('div');
				divbox.innerHTML = 'Cost per '+SCRIPT.money+': <strong class='+(minionCost == minReturn ? "good":"bad")+'>$' + minionCost.toFixed(2) + '</strong>';
				divSpot.parentNode.insertBefore(divbox, divSpot.nextSibling);
		}
}

// buffs logic
if(GM_getValue('autoBuff', '0') == "checked")
{
	if (location.href.indexOf(SCRIPT.name+'/index') != -1)
	{
		var sform = document.evaluate("//input[@name='fb_sig_user']",document,null,9,null).singleNodeValue;
		var userID = sform.value; 

		// fuel crew button
		var sform = document.evaluate("//form[@id='"+SCRIPT.appID+"_refuel_crew']",document,null,9,null).singleNodeValue;
   		if(sform!=null && sform.innerHTML.indexOf('button_fuelcrew_on') != -1)
		{
			addToLog("fueling crew");
			GM_xmlhttpRequest({
				method: "POST",
				url: "http://apps.facebook.com/fbml/fbjs_ajax_proxy.php",
				headers:{'Content-type':'application/x-www-form-urlencoded'},
				svn_rev:'157323', //156318 
				referer:'http://apps.facebook.com/streetracinggame/index.php',
          		data:'url=http%3A%2F%2Ffacebook3.streetracing.zynga.com%2Findex.php'
				+'&query[action]=refuel&query[ajax]=1&type=2'
				+'&require_login=1&fb_mockajax_context=O:16:"CanvasFBMLFlavor":1:{s:9:"_fbml_env";a:15:{'
				+'s:4:"user";i:'+userID+';'
				+'s:6:"app_id";i:32375531555;'
				+'s:10:"fb_page_id";i:0;s:10:"canvas_url";'
    			+'s:51:"http://apps.facebook.com/streetracinggame/index.php";'
				+'s:10:"source_url";s:49:"http://facebook3.streetracing.zynga.com/index.php";'
				+'s:9:"loggedout";b:0;s:7:"non-tos";b:0;s:11:"flavor_code";i:3;'
				+'s:14:"on_canvas_info";b:0;s:8:"is_tosed";b:1;s:8:"fb_frame";'
				+'s:16:"streetracinggame";s:14:"user_triggered";b:1;'
				+'s:12:"fb_js_string";b:0;s:11:"image_cache";N;s:14:"ajax_triggered";b:1;}}'
				+'&fb_mockajax_context_hash=9670db79635e'
				+'&appid=32375531555'
				+'&post_form_id=244b80d0b404ab834c191ab92010104b'
				+'&post_form_id_source=AsyncRequest'
				+'&nectar_impid=812cf8cf90a26c30a0cbb558f759bfda'
				+'&nctrct=1239130122073',
				onload: function(xhr) { }
			});
			return;
		}	

		//get fuel bonus	
		var sform = document.evaluate("//div[@class='gas_bonus_right_top_text']",document,null,9,null).singleNodeValue;
		var fuelbonus = parseInt(sform.innerHTML.split('fueled ')[1]); 
		if(fuelbonus>6)
		{
			alert("getting clan fuel");
			addToLog("getting clan fuel");
			var sform = document.evaluate("//form[@id='"+SCRIPT.appID+"_retrieve_fuel_crew']",document,null,9,null).singleNodeValue;
			if(sform!=null)
			{
				GM_xmlhttpRequest({
				method: "POST",
				url: "http://apps.facebook.com/fbml/fbjs_ajax_proxy.php",
				headers:{'Content-type':'application/x-www-form-urlencoded'},
				svn_rev:'157323', //156318  
				referer:'http://apps.facebook.com/streetracinggame/index.php',
				data:'url=http://facebook3.streetracing.zynga.com/index.php'
				   +'&query[action]=retrieve_fuel&query[ajax]=1&type=2'
				   +'&require_login=1&fb_mockajax_context=O:16:"CanvasFBMLFlavor":1:{s:9:"_fbml_env";a:13:{'
				   +'s:4:"user";i:'+userID+';'
				   +'s:6:"app_id";i:32375531555;'
				   +'s:10:"fb_page_id";i:0;s:10:"canvas_url";'
				   +'s:51:"http://apps.facebook.com/streetracinggame/index.php";'
				   +'s:10:"source_url";s:49:"http://facebook3.streetracing.zynga.com/index.php";'
				   +'s:9:"loggedout";b:0;s:7:"non-tos";b:0;s:11:"flavor_code";i:3;'
				   +'s:14:"on_canvas_info";b:0;s:8:"is_tosed";b:1;s:8:"fb_frame";'
				   +'s:16:"streetracinggame";s:14:"user_triggered";b:0;'
				   +'s:12:"fb_js_string";b:0;}}'
				   +'&fb_mockajax_context_hash=5f336c7532d2'
				   +'&appid=32375531555'
				   +'&post_form_id=8ff7e6b64ad391fbde94125550afbb18' //98392b0cb0f1829a327360305b86f6be'
				   +'&post_form_id_source=AsyncRequest'
				   +'&nectar_impid=515d89e7b8cd0bb72fe93bfee841a9e3' //91a1cfdab44f41f126166021d5971041'
				   +'&nctrct=1239255798228',//1239044869984',
				onload: function(xhr) { }				
				});
			}
			setTimeout("document.location ='" + "http://apps.facebook.com/"+SCRIPT.name+"/index.php"+"'", delay);
			return;
		}
	}
}
// crew logic here
if(GM_getValue('autocrew', '') == "checked" && crew!=GM_getValue('crewSize', 1)) 
{
	if (location.href.indexOf(SCRIPT.name+'/index') != -1)
	{
		var required =  parseInt(document.body.innerHTML.split('Requires ')[1]);
		if(crew >= required)
		{
			var sform = document.evaluate("//form[@id='"+SCRIPT.appID+"_viral_loot_form']",document,null,9,null).singleNodeValue;
			setTimeout(function(){sform.submit();},delay);
		}		
		else
			window.location = "http://apps.facebook.com/"+SCRIPT.name+"/properties.php";
	}
	else
	if (location.href.indexOf(SCRIPT.name+'/properties') != -1)
	{
		var prop = document.evaluate("//tr[@class='darkRow']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		var required = prop.innerHTML.split('Requires:</div>')[1];
		required = required.split('<div style="float: left; margin-left: 4px;">')[1];
		required = required.replace(/^\s+/,''); 
	    required = parseInt(required);
		if(crew >= required)
			setTimeout(function(){prop.getElementsByTagName('form')[0].submit();},delay);
		GM_setValue('crewSize', crew);
	}
	else
		window.location = "http://apps.facebook.com/"+SCRIPT.name+"/properties.php";
	return;
}
	
// automission logic here
if(GM_getValue('autoMission', '') == "checked")
{
	if( gas>=missions[GM_getValue('selectMission', 1)][1])
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
	// deposit cash
	if(cash>parseInt(GM_getValue('bankConfig', 100000))+10)
	{
		document.getElementById(SCRIPT.appID+'_bank_popup').style.display = 'block';
		var sform =document.getElementById(SCRIPT.appID+'_bank_popup').getElementsByTagName('form')[0];
		
		Array.forEach(sform.getElementsByTagName("input"),
			function(obj)
			{
				if (obj.name == "amount") 
					obj.value = cash-GM_getValue('bankKeep', 50000);
			}
		);
		setTimeout(function(){sform.submit();},delay);
		return;
	}
	// widraw cash
	if(cash<parseInt(GM_getValue('bankKeep', 50000)))
	{
		document.getElementById(SCRIPT.appID+'_bank_popup').style.display = 'block';
		var sform =document.getElementById(SCRIPT.appID+'_bank_popup').getElementsByTagName('form')[1];
		
		Array.forEach(sform.getElementsByTagName("input"),
			function(obj)
			{
				if (obj.name == "amount") 
					obj.value = GM_getValue('bankKeep', 50000) - cash;
			}
		);
		setTimeout(function(){sform.submit();},delay);
		return;
	}
}	

// autoheal
if(GM_getValue('autoHeal', '') == "checked")
{
	if(health<GM_getValue('healthLevel', '')  && adrenaline>GM_getValue('healthAdrenaline', '') )
	{
		document.getElementById(SCRIPT.appID+'_health_refill_popup').style.display = 'block';
		setTimeout(function(){document.getElementById(SCRIPT.appID+'_health_refill_popup').getElementsByTagName('form')[0].submit();},delay);
		return;
	}
}
			
// autofight
if(GM_getValue('autoFight', '') == "checked" && adrenaline>0)
{
	if(health>25)
	{
		if(GM_getValue('fightRandom', '') == "checked")
		{
			if (location.href.indexOf(SCRIPT.name+'/fight') != -1)
			{
				var opponents  = document.evaluate("//td[@class='action']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
				var fightIndex = Math.floor(Math.random()*opponents.snapshotLength);
				var fightNode =opponents.snapshotItem(fightIndex).parentNode;
				var opponentLevel =  parseInt(fightNode.innerHTML.split('Level ')[1]);
				var opponentClan = parseInt(fightNode.innerHTML.split('groupsize">')[1]);
				opponents = opponents.snapshotItem(fightIndex).innerHTML;
				opponents = parseInt(opponents.split('directAttack(false, ')[1]);	
				if(opponentLevel< GM_getValue('fightLevel', '100') && opponentClan<GM_getValue('fightClanSize', '502'))
				    setTimeout("document.location = '"+"http://apps.facebook.com/"+SCRIPT.name+"/fight.php?opponent_id="+opponents+"&action=attack"+"'", delay);
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

    if(document.getElementById('autocrew').checked == true)
        GM_setValue('autocrew', 'checked');
    else
        GM_setValue('autocrew', '0');

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

    GM_setValue('selectMission', selectMission.selectedIndex );
    GM_setValue('bankConfig', document.getElementById('bankConfig').value);
    GM_setValue('bankKeep', document.getElementById('bankKeep').value);
    GM_setValue('r1', document.getElementById('r1').value);
    GM_setValue('r2', document.getElementById('r2').value);
    GM_setValue('fightList', document.getElementById('fightList').value);
    GM_setValue('healthLevel', document.getElementById('healthLevel').value);
    GM_setValue('healthAdrenaline', document.getElementById('healthAdrenaline').value);
    GM_setValue('fightLevel', document.getElementById('fightLevel').value);
    GM_setValue('fightClanSize', document.getElementById('fightClanSize').value);

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

(
  function() {

	// let property link refresh page for property logic
   var link  = document.evaluate("//a[@href='http://apps.facebook.com/"+SCRIPT.name+"/properties.php']",document,null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
   if (!link) alert("no link found");
   var propLink = document.createElement("a");
   propLink.href = "http://apps.facebook.com/"+SCRIPT.name+"/properties.php";
   propLink.innerHTML = link.innerHTML;
   link.parentNode.insertBefore(propLink, link);
   link.parentNode.removeChild(link);
  }
)();