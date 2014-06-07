// ==UserScript==
// @name           vampireWars
// @namespace		Facebook
// @description		Autoplayer for the Vampire Wars game
// @version			2.3.2
// @include        http://apps.facebook.com/vampiresgame/*
// @include       http://apps.new.facebook.com/vampiresgame/*
// @author 			blannie
// @contributor		IEF
// ==/UserScript==

var settingsOpen = false;
var logOpen      = false;
var delay = 3000;
var blood2Update = 120000;

var SCRIPT = {
	url: 'http://userscripts.org/scripts/source/36917.user.js',
	version: '2.3.2',
	name: 'vampiresgame',
	appID: 'app25287267406',
	presentationurl: 'http://userscripts.org/scripts/show/36917'
};

var missions = new Array(
	["Feast on a Human's Blood",1,0],
	["Destroy a Renegade Vampire",3,0],	 
	["Eliminate a Street Gang",5,0],
	["Raid a Blood Bank",7,0],
	["Fight a Sewer Wererat",1,0],
	["Kill a Drug Dealer",2,0],
	["Rescue an Ally From an Insane Asylum",2,0],
	["Fight Ghouls in the Deep Woods",3,1],
	["Destroy a Circle of Warlocks",3,1],
	["Tame a Shadow Demon",4,1],
	["Feed in Central Park",10,1],
	["Attack a Vampiric Lair",15,1],	 
	["Sneak into Vampires' Nest",5,1],
	["Fight a Vampire Slayer",5,1],
	["End the Unlife of a Lich",5,1],
	["Challenge a Haitian Voodoo Gang",6,2],
	["Fight a Pack of Werewolves",18,2],
	["Retrieve a Lost Relic From the High Desert",7,2],
	["Fight Another Vampire For Mental Dominance",8,2],
	["Take Control of a Neighborhood",25,2],
	["Save a Vampire From Hunters",10,2],
	["Clear a Laboratory of Hideous Mutants",13,2],	
	["Battle a Werewolf Lord",30,3],
	["Rescue an Ally from the Underworld",15,2],	
	["Fight Government Agents in Foundry",25,3],
	["Banish Summoned Demon",25,3],
	["Face a Rival Clan Alone",35,3],
	["Destroy a Demonic Lord",40,3],
	["Exterminate A Rival Clan",40,3]
	);

var XMLHttpFactories = [
    function () {return new XMLHttpRequest()},
    function () {return new ActiveXObject("Msxml2.XMLHTTP")},
    function () {return new ActiveXObject("Msxml3.XMLHTTP")},
    function () {return new ActiveXObject("Microsoft.XMLHTTP")}
];

 String.prototype.toInt = function() {
	return parseInt(this.replace(/,/g, ''));   
  }
  
function getPositionLeft(This){
var el = This;var pL = 0;
while(el){pL+=el.offsetLeft;el=el.offsetParent;}
return pL
}

function getPositionTop(This){
var el = This;var pT = 0;
while(el){pT+=el.offsetTop;el=el.offsetParent;}
return pT
}
var giftbox = 'data:image/gif;base64,R0lGODlhFgAWAPcAAI6BgnBiZJWIilpNUIJwdId1eqOUmFdJTV9SVraqrnpnbq2fpMC1uWZUW7CgplZHTWdWXV9QVsW7v1hFTmFQWFpIUV1LVI10g11FVZd3joptgnZMbE8zSEwyRl8/V1k7UnRRbGxDY1I1TF8/WFA1Sn5VdamMo3ZEbVQzTls4VGxEZFMwTXtJc4hZgHVObodbgIhfgZBnio9qimAsWl0vV0cWQk8bSnhCc3dFcqN1n0sUR0kVRVEbTWYqYmMqX3c4c3lLdohchSoCKDEDL0EFPkMHQEUIQikGJ0kLRnEwbX42e4VAgWMwYbCArkYAREIAQEEAPzIAMTEAMDcBNkUDQ1gGVkgFRkQFQj8FPT0FOz0GPDsGOUQLQlIOUEsNSUQMQmwlaoBAfmIAYWEAYVYAVT4APkMBQmEGYVIFUUoFSUsJS3QQdG4TbmwYa2AbYIApf3gnd4AugIs8ip9NnqxtrOfS52sAbWIAZWEAYloAW1EAUk0ATkoAS0QARnMCdmQCZUkCSlkDWlcGWVEHUoIchHgae5Etk5k3nHMqdJQ9lY07jpJClKUArp4Ap5UAnI8Al44AlIwAk4EAh38AhHIAdnEAdW0Ac2gAbWUAamQAaVwAYKIBq3kBf3cBe2sBb5UCnY0ClGUCaXUDeoYGjXcFfVQEV58Ip2gGbJoKoX8Ig3wJgZALlpMMmmwKcIoNj6EVp3gQfYYSi48clYcsjLA6tqM5qZlHnKUAsJ8ArLE0uqwOurkyxstz07SxrHpybYV6eV1RUX1tbWNXV2xfX2ZaWmVZWWldXWFWVmBVVV9UVFhOToh5eX9xcXZpaXVoaHNmZmxgYGtfX1pQUIN1dYFzc3ptbXFlZW9jY2dcXGZbW1xSUlVMTH1wcGleXlZNTYt9fYR3d3dra2NZWVlQUFFJSYh7e4Z5eVdPT5aJiZ6RkYJ3d5OHh6mdnaaampyRkZuQkJqPj56Tk6ecnJ+VlZ2Tk7OpqbaursW9vb21tcO8vMC5ubu0tMrDw8nCwuXi4v///yH5BAEAAP8ALAAAAAAWABYAAAj/AP8JHEiQYCNJlwoqXMhoE6U+CyMKFCUJj5QoEh2BGhXrx5tXqzABUgNLYidIkThRCrVn0iZPgvyoMjRHoQs9d9zgABOoDB9LmjKlcoXK1CdZOQQ+U+Djy5EhW6YIKfWI1ClEQWLIUERnwbd/14YFoIEmT6tZQOAwosVrly5ctUysC8YMLDRsO6B00bCv15Jbuer4a7JmzAlqzcL9w5bNmI0nNYBFUxeH1SET8y60+cNiGrSB2pCtMKPjmLQDSUBcEJAuA5szIbqdGyhN2wMsXCwkG4DAl7x27WBU4TFBGrKByY5V0JKFhDZtwn6xiwdghpMU3bCJGyiumAUsWTp4ovMmDBy6cgR6kFHhbBhBYtgoGCHCwRs5bczQ0TOgRMyGatcQJI4xDSBxhQjjbJMMAPXYk4AcdpRAjTMEHUMMBF5Y8YE22yADzz36MLBIJS8sYw1BwCQTgRdpeCCMMsi8w08+EtjSSQvcYKMQBkVQMUI3yQjzTj80JmLHDRIVMggK3QiTDT394ONAGIRINBATyBwTTTz4uFOAlQppk40560gUEAA7';

//Initialize global pause var
if (GM_getValue('paused')==undefined) GM_setValue('paused',1);

//Get absolute banner position
bannerTop = getPositionTop(document.getElementById('app25287267406_banner_row')); //140
bannerLeft = getPositionLeft(document.getElementById('app25287267406_banner_row')); // 300
var pauseButton = document.createElement("div");

if (GM_getValue('paused')==0) {
	pauseButton.setAttribute("style", "position: absolute; left: "+(bannerLeft+300)+"px; top: "+(bannerTop+140)+"px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer; color:green;");
	pauseButton.innerHTML = "Pause Autoplayer";
	pauseButton.addEventListener('click', pausePlayer, false);
	document.body.appendChild(pauseButton);
} 
else {
	pauseButton.setAttribute("style", "position: absolute; left: "+(bannerLeft+300)+"px; top: "+(bannerTop+140)+"px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer; color:red;");
	pauseButton.innerHTML = "Resume Autoplayer";
	pauseButton.addEventListener('click', resumePlayer, false);
	document.body.appendChild(pauseButton);
}
// reload logic
if((GM_getValue('autoClick', '') == "checked")&& (GM_getValue('paused')==0))
{
    var timeWait = Math.floor(parseFloat(GM_getValue('r1', '6')) + parseFloat((GM_getValue('r2', '11'))-parseFloat(GM_getValue('r1', '6')))*Math.random())*1000;
    setTimeout("document.location = '"+"http://apps.facebook.com/"+SCRIPT.name+ GM_getValue('refreshPage', "/index.php")+"'", timeWait);
}

// status parameters
var level =  parseInt(document.body.innerHTML.split('Level:')[1]);
var clan =  parseInt(document.body.innerHTML.split('my clan (')[1]);
var td = document.getElementById(SCRIPT.appID+'_stats_table').getElementsByTagName('td');
var blood = document.getElementById( SCRIPT.appID+'_current_cash').innerHTML.toInt();
var health = parseInt(document.getElementById( SCRIPT.appID+'_current_health').innerHTML);
var energy = document.getElementById( SCRIPT.appID+'_current_energy').innerHTML.toInt();
var rage =parseInt(document.getElementById( SCRIPT.appID+'_current_stamina').innerHTML);
	var bankpopup = document.getElementById(SCRIPT.appID+'_bank_popup');
	var bank = bankpopup.getElementsByTagName('span')[0].innerHTML;
    var lottery = document.getElementById(SCRIPT.appID+'_lottery');
    if (lottery!=null) {
    	var lotterymsg = lottery.getElementsByTagName('div')[7];
    }
    var treasurebox = document.getElementById(SCRIPT.appID+'_crypt_hot_tip_treasure_box');
    
//Create Bank status
	statsTop = getPositionTop(document.getElementById(SCRIPT.appID+'_stats_div'));
	statsLeft = getPositionLeft(document.getElementById(SCRIPT.appID+'_stats_div'));
	var bankStat = document.createElement("div");
	bankStat.setAttribute("style", "position: absolute; left: "+(statsLeft+92)+"px; top: "+(statsTop+149)+"px; font-family: Times,serif; font-size: 14px; font-weight: 400; -moz-user-select: none; -khtml-user-select: none; cursor: pointer; color: white;");
	bankStat.innerHTML = 'Bank: '+bank;
	document.body.appendChild(bankStat);	    
    
// menu logic
var settingsButton = makeElement('div', document.body);
	settingsButton.innerHTML = "open settings";
	settingsButton.setAttribute("style", "position: absolute; left: "+(bannerLeft+10)+"px; top: "+(bannerTop+10)+"px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer; color: #AA0000;");
	settingsButton.addEventListener('click', toggleSettings, false);
    
var uncheckButton = makeElement('div', document.body);
	uncheckButton.innerHTML = "uncheck all";
	uncheckButton.setAttribute("style", "position: absolute; left: "+(bannerLeft+10)+"px; top: "+(bannerTop+28)+"px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer; color: #AA0000;");
	uncheckButton.addEventListener('click', uncheckAll, false);

var checkButton = makeElement('div', document.body);
	checkButton.innerHTML = "check all";
	checkButton.setAttribute("style", "position: absolute; left: "+(bannerLeft+10)+"px; top: "+(bannerTop+46)+"px;font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;color: #AA0000;");
	checkButton.addEventListener('click', checkAll, false);

if (GM_getValue('autoLog', '') == 'checked')
{		
    var viewLogButton = makeElement('div', document.body);
        viewLogButton.innerHTML = "view rs log";
        viewLogButton.setAttribute("style", "position: absolute; left: "+(bannerLeft+450)+"px; top: "+(bannerTop+10)+"px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;color: #AA0000;");
        viewLogButton.addEventListener('click', toggleLogBox, false);

    var clrLogButton = makeElement('div', document.body);
        clrLogButton.innerHTML = "clear log";
        clrLogButton.setAttribute("style", "position: absolute; left: "+(bannerLeft+450)+"px; top: "+(bannerTop+28)+"px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;color: #AA0000;");
        clrLogButton.addEventListener('click', clearLog, false);
}

var settingsBox = makeElement('div', document.body);
	settingsBox.setAttribute("style", "position: absolute; left: "+bannerLeft+"px; top: "+(bannerTop+28)+"px;  width: 748px; height: 365px; background: black url(http://facebook5.vampires.static.zynga.com/31993/css/ui/border_deco_fb.jpg); font-family: tahoma; font-size: 10pt; text-align: left; padding: 5px; border: 1px dotted; visibility: hidden; z-index: 100;");

var logBox =  makeElement('div', document.body);
    logBox.innerHTML = GM_getValue('itemLog', 'log empty');
	logBox.setAttribute("style", "position: absolute; overflow: scroll; left: "+bannerLeft+"px; top: "+(bannerTop+28)+"px;  width: 450px; height: 250px; background: black url(http://facebook5.vampires.static.zynga.com/31993/css/ui/border_deco_fb.jpg); font-family: tahoma; font-size: 10pt; color: #FFFFFF; text-align: left; padding: 5px; border: 1px dotted; visibility: hidden; z-index: 999999;");

var versionBox = makeElement('div', settingsBox);
    versionBox.innerHTML  = "<img src='http://www.zynga.com/images/games/gameSmall_vampires.jpg'/><strong> "+SCRIPT.version+" </strong>";
    versionBox.setAttribute("style", "position: absolute;  left: 40px;color: #FFFFFF;");

var autoClick = makeElement('div', settingsBox);
    autoClick.innerHTML  = "<input type='checkbox' id='autoClick' value='checked' "+GM_getValue('autoClick', '')+">enable auto-refresh";
    autoClick.setAttribute("style", "position: absolute; left: 40px; top: 100px; color: #FFFFFF;");

var refreshTimes = makeElement('div', settingsBox);
	refreshTimes.innerHTML = "refresh every <input type='text' style='border: none; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('r1', '30') + "' id='r1' size='2'>";
	refreshTimes.innerHTML += " to <input type='text' style='border: none; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('r2', '110') + "'id='r2' size='2'> seconds";
	refreshTimes.setAttribute("style", "position: absolute; left: 40px; top: 125px; color: #FFFFFF;");

var refreshPage = makeElement('div', settingsBox);
	refreshPage.innerHTML = "url: <input type='text' style='border: none; width: 270px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('refreshPage', '/index.php') + "' id='refreshPage' size='200'>";
    refreshPage.setAttribute("style", "position: absolute; left: 40px; top: 150px;color: #FFFFFF;");

//	var autoClan = makeElement('div', settingsBox);
//        autoClan.innerHTML  = "<input type='checkbox' id='autoClan' value='checked' "+GM_getValue('autoClan', '')+">enable auto-Clan update";
//        autoClan.setAttribute("style", "position: absolute; top: 150px;color: #FFFFFF;");
    
var autoMission = makeElement('div', settingsBox);
    autoMission.innerHTML  = "<input type='checkbox' id='autoMission' value='checked' "+GM_getValue('autoMission', 'checked')+">enable auto-Mission";
    autoMission.setAttribute("style", "position: absolute; left: 40px; top: 175px;color: #FFFFFF;");

var missionMastery = makeElement('div', settingsBox);
	missionMastery.innerHTML  = "<input type='checkbox' id='missionMastery' value='checked' "+GM_getValue('missionMastery', 'checked')+">Mastery";
    missionMastery.setAttribute("style", "position: absolute; left: 200px; top: 175px;color: #FFFFFF;");

var selectMission = document.createElement("select");
	for each (var mission in missions ){
		var choice = document.createElement('option');
		choice.value = mission[0];
		choice.appendChild(document.createTextNode(mission[0]));
		selectMission.appendChild(choice);
	}
	selectMission.selectedIndex = GM_getValue('selectMission', 1);
	selectMission.setAttribute("style", "position: absolute; left: 40px; top: 200px;");
    settingsBox.appendChild(selectMission);
		 
var autoBank = makeElement('div', settingsBox);
    autoBank.innerHTML  = "<input type='checkbox' id='autoBank' value='checked' "+GM_getValue('autoBank', 'checked')+">enable auto-Bank";
    autoBank.setAttribute("style", "position: absolute; left: 40px; top: 235px;color: #FFFFFF;");

var bankConfig = makeElement('div', settingsBox);
	bankConfig.innerHTML = "above: <input type='text' style='border: none; width: 100px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('bankConfig', '100000') + "' id='bankConfig' size='8'>"+" keep: <input type='text' style='border: none; width: 100px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('bankKeep', '50000') + "' id='bankKeep' size='8'>";
    bankConfig.setAttribute("style", "position: absolute;  left: 40px; top: 260px;left: 15px;color: #FFFFFF;");

var autoHeal = makeElement('div', settingsBox);
    autoHeal.innerHTML  = "<input type='checkbox' id='autoHeal' value='checked' "+GM_getValue('autoHeal', 'checked')+">enable auto-Heal";
    autoHeal.setAttribute("style", "position: absolute; left: 40px; top:285px;color: #FFFFFF;");

var healthLevel = makeElement('div', settingsBox);
	healthLevel.innerHTML = "min. health: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('healthLevel', '50') + "' id='healthLevel' size='1'>";
    healthLevel.setAttribute("style", "position: absolute; left: 40px; top: 310px;color: #FFFFFF;");

var healthRage = makeElement('div', settingsBox);
	healthRage.innerHTML = "max. Rage: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('healthRage', '5') + "' id='healthRage' size='1'>";
    healthRage.setAttribute("style", "position: absolute; left: 160px;top: 310px;color: #FFFFFF;");

var updateButton = makeElement('div', settingsBox);
    updateButton.innerHTML  = "<button>check for updates</button>";
    updateButton.addEventListener('click', updateScript, false);
    updateButton.setAttribute("style", "position: absolute;left: 150px; top: 335px;");
		
var autoFight = makeElement('div', settingsBox);
    autoFight.innerHTML  = "<input type='checkbox' id='autoFight' value='checked' "+GM_getValue('autoFight', '')+">enable auto-Fight";
	autoFight.setAttribute("style", "position: absolute; left: 300px; top: 25px; color: #FFFFFF;");

var fightKeepRage = makeElement('div', settingsBox);
	fightKeepRage.innerHTML = "fight above Rage: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('fightKeepRage', '0') + "' id='fightKeepRage' size='1'>";
	fightKeepRage.setAttribute("style", "position: absolute; left: 320px; top: 50px; color: #FFFFFF;");
		
var fightRandom = makeElement('div', settingsBox);
    fightRandom.innerHTML  = "<input type='radio' name='r1' id='fightRandom' value='checked' "+GM_getValue('fightRandom', '')+"> fight random vampires";
    fightRandom.setAttribute("style", "position: absolute; left: 300px; top: 75px;color: #FFFFFF;");
	
var fightLevel = makeElement('div', settingsBox);
    fightLevel.innerHTML = "max. level: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('fightLevel', '100') + "' id='fightLevel' size='1'>";
    fightLevel.setAttribute("style", "position: absolute; left: 320px; top: 100px;color: #FFFFFF;");

var fightClanSize = makeElement('div', settingsBox);
	fightClanSize.innerHTML = "max. clan: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('fightClanSize', '502') + "' id='fightClanSize' size='1'>";
	fightClanSize.setAttribute("style", "position: absolute; left: 320px; top: 125px; color: #FFFFFF;");
    
var fightClanRating = makeElement('div', settingsBox);
	fightClanRating.innerHTML = "min. rating: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('fightClanRating', '500') + "' id='fightClanRating' size='1'>";
	fightClanRating.setAttribute("style", "position: absolute; left: 320px; top: 150px; color: #FFFFFF;");

// var freshMeat = document.createElement("div");
    // freshMeat.innerHTML  = "<input type='radio' name='r1' id='freshMeat' value='checked' "+GM_getValue('freshMeat', '')+"> go for fresh Meat";
	// freshMeat.setAttribute("style", "position: absolute; left: 300px; top: 150px; color: #FFFFFF;");
    // settingsBox.appendChild(freshMeat);

var fightList = makeElement('div', settingsBox);
	fightList.innerHTML  = "<input type='radio' name='r1' id='rFightList' value='checked' " + GM_getValue('rFightList', '') + "> fight list:<br/><textarea style='border: none; background-color: transparent; color: #AA0000; width: 180px; height: 130px;' id='fightList'>" + GM_getValue('fightList', '') + "</textarea>";
	fightList.setAttribute("style", "position: absolute; left: 300px; top: 175px; color: #FFFFFF;");

var autoBuff = makeElement('div', settingsBox);
    autoBuff.innerHTML  = "<input type='checkbox' id='autoBuff' value='checked' "+GM_getValue('autoBuff', 'checked')+">enable auto-Buff";
    autoBuff.setAttribute("style", "position: absolute; left: 500px; top:25px;color: #FFFFFF;");

var autoMinion = makeElement('div', settingsBox);
    autoMinion.innerHTML  = "<input type='checkbox' id='autoMinion' value='checked' "+GM_getValue('autoMinion', 'checked')+">enable auto minion purchace";
    autoMinion.setAttribute("style", "position: absolute; left: 500px; top:50px;color: #FFFFFF;");
		
var autoStats = makeElement('div', settingsBox);
    autoStats.innerHTML  = "<input type='checkbox' id='autoStats' value='checked' "+GM_getValue('autoStats', 'checked')+">enable auto-Stats";
    autoStats.setAttribute("style", "position: absolute; left: 500px; top:75px;color: #FFFFFF;");

var AttackStat = makeElement('div', settingsBox);
	AttackStat.innerHTML = "Attack Strength: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('attackStat', '0') + "' id='AttackStat' size='1'>";
    AttackStat.setAttribute("style", "position: absolute; left: 520px; top: 100px;color: #FFFFFF;");

var DefenceStat = makeElement('div', settingsBox);
	DefenceStat.innerHTML = "Defense Strength: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('defenceStat', '0') + "' id='DefenceStat' size='1'>";
	DefenceStat.setAttribute("style", "position: absolute; left: 520px; top: 125px;color: #FFFFFF;");
    
var EnergyStat = makeElement('div', settingsBox);
	EnergyStat.innerHTML = "Maximum Energy: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('energyStat', '0') + "' id='EnergyStat' size='1'>";
	EnergyStat.setAttribute("style", "position: absolute; left: 520px; top: 150px;color: #FFFFFF;");
    
var HealthStat = makeElement('div', settingsBox);
	HealthStat.innerHTML = "Maximum Health: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('healthStat', '0') + "' id='HealthStat' size='1'>";
	HealthStat.setAttribute("style", "position: absolute; left: 520px; top: 175px;color: #FFFFFF;");

var RageStat = makeElement('div', settingsBox);
	RageStat.innerHTML = "Maximum Rage: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('rageStat', '0') + "' id='RageStat' size='1'>";
	RageStat.setAttribute("style", "position: absolute; left: 520px; top: 200px;color: #FFFFFF;");
    
var autoLog = makeElement('div', settingsBox);
	autoLog.innerHTML  = "<input type='checkbox' id='autoLog' value='checked' "+GM_getValue('autoLog', 'checked')+">enable auto logging";
	autoLog.setAttribute("style", "position: absolute; left: 500px; top:225px;color: #FFFFFF;");
        
    var autoGamble = document.createElement("div");
        autoGamble.innerHTML  = "<input type='checkbox' id='autoGamble' value='checked' "+GM_getValue('autoGamble', 'checked')+">enable auto Akem's Gamble";
        autoGamble.setAttribute("style", "position: absolute; left: 500px; top:250px;color: #FFFFFF;");
        settingsBox.appendChild(autoGamble);

	var gamblebox1 = document.createElement("div");
		gamblebox1.innerHTML  = "<input type='radio' name='rBoxes' id='rBoxLeft' value='checked' " + GM_getValue('rBoxLeft', '') + "> Left ";
		gamblebox1.setAttribute("style", "position: absolute; left: 500px; top: 275px; color: #FFFFFF;");
    	settingsBox.appendChild(gamblebox1);

	var gamblebox2 = document.createElement("div");
		gamblebox2.innerHTML  = "<input type='radio' name='rBoxes' id='rBoxMiddle' value='checked' " + GM_getValue('rBoxMiddle', '') + "> Middle ";
		gamblebox2.setAttribute("style", "position: absolute; left: 550px; top: 275px; color: #FFFFFF;");
    	settingsBox.appendChild(gamblebox2);

	var gamblebox3 = document.createElement("div");
		gamblebox3.innerHTML  = "<input type='radio' name='rBoxes' id='rBoxRight' value='checked' " + GM_getValue('rBoxRight', '') + "> Right ";
		gamblebox3.setAttribute("style", "position: absolute; left: 610px; top: 275px; color: #FFFFFF;");
    	settingsBox.appendChild(gamblebox3);

    var autoTreasure = document.createElement("div");
        autoTreasure.innerHTML  = "<input type='checkbox' id='autoTreasure' value='checked' "+GM_getValue('autoTreasure', 'checked')+">enable opening Treasure Chest";
        autoTreasure.setAttribute("style", "position: absolute; left: 500px; top:300px;color: #FFFFFF;");
        settingsBox.appendChild(autoTreasure);
  	
    	
var saveButton = makeElement('div', settingsBox);
	saveButton.innerHTML  = "<button>save settings</button>";
	saveButton.addEventListener('click', saveSettings, false);
	saveButton.setAttribute("style", "position: absolute;left: 300px; top: 335px;");

    var saveNotification = document.createElement("div");
         saveNotification.innerHTML = "<strong>Settings Saved</strong>";
         saveNotification.setAttribute("style","position: absolute;left:450px;top:335px;color:red;visibility:hidden;font-size:14px;");
         settingsBox.appendChild(saveNotification);

// message logic here...
if (GM_getValue('autoLog', '') == "checked" && document.body.innerHTML.indexOf('message_body') != -1)
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
		addToLog("acquired Rare Ability " + boxes[1].innerHTML.split('return true;">')[1].split('</a>')[0]);
	else if(messagebox.innerHTML.indexOf('You withdrew') != -1)
		addToLog("withrew " + messagebox.innerHTML.split('blood.gif">')[1].toInt());
	else if(messagebox.innerHTML.indexOf('deposited and stored safely') != -1)
		addToLog("deposit " + messagebox.innerHTML.split('blood.gif">')[1].toInt());
	else if(messagebox.innerHTML.indexOf('more health') != -1)
	{
		var addHealth = messagebox.innerHTML.split('You get')[1].split('more health')[0];
		var cost = 0;
		if(messagebox.innerHTML.indexOf('blood.gif">') != -1)
			addToLog("health +"+ addHealth + " for " + messagebox.innerHTML.split('blood.gif">')[1].toInt()	);
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
				addToLog("fought "+ user + " WON " +battleResult.innerHTML.split('blood.gif">')[1].toInt());
			}
			battleResult = document.evaluate("//span[@class='bad']",document,null,9,null).singleNodeValue;
			if(battleResult!=null && battleResult.innerHTML.indexOf('blood.gif">') != -1)
			{
				addToLog("fought "+ user + " LOST " +battleResult.innerHTML.split('blood.gif">')[1].toInt());
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
		var minionIncome = minions.snapshotItem(index).getElementsByTagName('td')[1].getElementsByTagName('div')[1].innerHTML.split('blood.gif">')[1].toInt();
		var minionCost = minions.snapshotItem(index).getElementsByTagName('td')[2].getElementsByTagName('td')[0].innerHTML.split('blood.gif">')[1].toInt();
		if (minionCost / minionIncome < minReturn)
			minReturn = minionCost / minionIncome;
	}

	var minions = document.evaluate("//tr[@class='lightRow']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var index = 0 ; index < minions.snapshotLength - 1 ; index++)
	{
		var minionIncome = minions.snapshotItem(index).getElementsByTagName('td')[1].getElementsByTagName('div')[1].innerHTML.split('blood.gif">')[1].toInt();
		var minionCost = minions.snapshotItem(index).getElementsByTagName('td')[2].getElementsByTagName('td')[0].innerHTML.split('blood.gif">')[1].toInt();
		if (minionCost / minionIncome < minReturn)
			minReturn = minionCost / minionIncome;
	}

	var minions = document.evaluate("//tr[@class='darkRow']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var index = 0 ; index < minions.snapshotLength ; index++)
	{
		var minionIncome = minions.snapshotItem(index).getElementsByTagName('td')[1].getElementsByTagName('div')[1].innerHTML.split('blood.gif">')[1].toInt();
		var minionCost = minions.snapshotItem(index).getElementsByTagName('td')[2].getElementsByTagName('td')[0].innerHTML.split('blood.gif">')[1].toInt();
		var divSpot = minions.snapshotItem(index).getElementsByTagName('td')[1].getElementsByTagName('div')[3];
		var divbox = document.createElement('div');
		if (minionCost / minionIncome == minReturn)
		{
					divbox.innerHTML = 'Cost per blood: <strong class="good"><img src="http://facebook.vampires.static.zynga.com/graphics/icon-blood.gif"/>' + (minionCost / minionIncome).toFixed(2) + '</strong>';
					if(GM_getValue('autoMinion', '') == "checked" && blood > minionCost*10)
					{
						var minionForm = minions.snapshotItem(index).getElementsByTagName('td')[2].getElementsByTagName('td')[1].getElementsByTagName('form')[0];
						minionForm.getElementsByTagName('select')[0].value =10;
						setTimeout(function(){minionForm.submit();},delay);
						return;
					}
				}
				else
					divbox.innerHTML = 'Cost per blood: <strong class="money"><img src="http://facebook.vampires.static.zynga.com/graphics/icon-blood.gif"/>' + (minionCost / minionIncome).toFixed(2) + '</strong>';
				divSpot.parentNode.insertBefore(divbox, divSpot.nextSibling);
		}
						
		var minions = document.evaluate("//tr[@class='lightRow']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var index = 0 ; index < minions.snapshotLength - 1; index++)
		{
				var minionIncome = minions.snapshotItem(index).getElementsByTagName('td')[1].getElementsByTagName('div')[1].innerHTML.split('blood.gif">')[1].toInt();
				var minionCost = minions.snapshotItem(index).getElementsByTagName('td')[2].getElementsByTagName('td')[0].innerHTML.split('blood.gif">')[1].toInt();
				var divSpot = minions.snapshotItem(index).getElementsByTagName('td')[1].getElementsByTagName('div')[3];
				var divbox = document.createElement('div');
				if ((minionCost / minionIncome) == minReturn)
				{
					divbox.innerHTML = 'Cost per blood: <strong class="good"><img src="http://facebook.vampires.static.zynga.com/graphics/icon-blood.gif"/>' + (minionCost / minionIncome).toFixed(2) + '</strong>';
					if(GM_getValue('autoMinion', '') == "checked" && blood > minionCost*10)
					{
						var minionForm = minions.snapshotItem(index).getElementsByTagName('td')[2].getElementsByTagName('td')[1].getElementsByTagName('form')[0];
						minionForm.getElementsByTagName('select')[0].value =10;
						setTimeout(function(){minionForm.submit();},delay);
						return;
					}
				}
				else
					divbox.innerHTML = 'Cost per blood: <strong class="money"><img src="http://facebook.vampires.static.zynga.com/graphics/icon-blood.gif"/>' + (minionCost / minionIncome).toFixed(2) + '</strong>';
				divSpot.parentNode.insertBefore(divbox, divSpot.nextSibling);
		}
}

// gifting hyperlink on stats page
if (location.href.indexOf(SCRIPT.name+'/stats') != -1 || location.href.indexOf(SCRIPT.name+'/comments') != -1)
{
	var user = document.evaluate("//div[@class='zy_popup_box_bg']",document,null,9,null).singleNodeValue;
	var newImg = document.createElement("img");
	newImg.setAttribute("src", giftbox);
	newImg.addEventListener('click',giftPlayer(location.href.split('user=')[1]), false);
	user.parentNode.insertBefore(newImg,user);
}

function giftPlayer(mobid)
{
	return function ()	{ window.location = "http://apps.facebook.com/"+SCRIPT.name+"/gift.php?user_id="+mobid;	}
}

// groupwall reference
if (location.href.indexOf(SCRIPT.name+'/groupwall') != -1)
{
	var users = document.evaluate("//td[@class='collapseCell']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var index = 0 ; index < users.snapshotLength ; index++)
	{
		var img = users.snapshotItem(index).getElementsByTagName('img')[0];
		if(img!=null)
			img.addEventListener('click',statsPlayer(img.getAttribute('uid')), false);
	}
}

function statsPlayer(mobid)
{
	return function ()	{ window.location = "http://apps.facebook.com/"+SCRIPT.name+"/comments.php?user="+mobid;}
}

// buffs logic
if((GM_getValue('autoBuff', '') == "checked") && (GM_getValue('paused')==0))
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
if((GM_getValue('autoClan', '') == "unused" && clan!=GM_getValue('clanSize', 1)) && (GM_getValue('paused')==0))
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
if((GM_getValue('autoMission', '') == "checked") && (GM_getValue('paused')==0))
{
	if( energy>=missions[GM_getValue('selectMission', 1)][1])
	{
		// if (location.href.indexOf(SCRIPT.name+"/jobs.php?currentTier="+missions[GM_getValue('selectMission', 1)][2]) != -1)
		if (location.href.indexOf(SCRIPT.name+"/jobs.php") != -1)
		{
			var missionsList = document.evaluate("//input[@value='Do Mission']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
			for (var index = 0 ; index < missionsList.snapshotLength ; index++)
			{
				var sform = missionsList.snapshotItem(index);
				if(sform.parentNode.getElementsByTagName('input')[sform.parentNode.getElementsByTagName('input').length-4].value == GM_getValue('selectMission', 0)+1)
				{
					if(GM_getValue('missionMastery', '') == "checked")
					{
						var masteryList = document.evaluate("//td[@class='job_desc']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
						if(masteryList.snapshotItem(index).innerHTML.indexOf('Mission Mastered') != -1)
						{
							if( parseInt(GM_getValue('selectMission', 1))+1 <  missions.length)
								GM_setValue('selectMission', parseInt(GM_getValue('selectMission', 1))+1 % missions.length);
							else
								GM_setValue('missionMastery', '');
								
							window.location = "http://apps.facebook.com/"+SCRIPT.name+"/jobs.php?currentTier="+missions[GM_getValue('selectMission', 1)][2];
							return;
						}
					}
					setTimeout(function(){sform.click();},delay);
					return;
				}
			}
		}
		else
			window.location = "http://apps.facebook.com/"+SCRIPT.name+"/jobs.php?currentTier="+missions[GM_getValue('selectMission', 1)][2];
		return;
	}	
}	 

// bank logic here
if((GM_getValue('autoBank', '') == "checked") && (GM_getValue('paused')==0))
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

//autoGamble logic
if((GM_getValue('autoGamble', '') == "checked") && (location.href.indexOf("index.php")!=-1) &&  (GM_getValue('paused')==0))
{
	//Check frontpage for free gamble
	if ((lotterymsg.innerHTML.indexOf('It never pays to be greedy')==-1) && (lotterymsg.innerHTML.indexOf('You may only gamble for free ONCE a day')!=-1)) {
		//Free 24hr gamble
		if (GM_getValue('rBoxLeft')=='checked') {
			BoxToOpen=1;
		} else if (GM_getValue('rBoxMiddle')=='checked') {
			BoxToOpen=2;
		} else {
			BoxToOpen=3;
		}
			addToLog("Free gamble, opening Chest no. "+BoxToOpen+".");
			document.location = 'http://apps.facebook.com/'+SCRIPT.name+'/lottery.php?viewState=openChest&chest='+BoxToOpen+'&useFP=1';
	}
	
	if (location.href.indexOf("lottery.php?viewState=openChest")!=-1) {
		//Opened chest. Log the results.
		var chestresult = document.getElementById('app25287267406_content').childNodes[1].childNodes[1].childNodes[0].childNodes[3].childNodes[1].childNodes[4].innerHTML;
		addToLog('Akems Gamble result: '+chestresult);
	}
}

//autoTreasure logic
if((GM_getValue('autoTreasure', '') == "checked") && (location.href.indexOf("index.php")!=-1) &&  (GM_getValue('paused')==0))
{
	//Check frontpage to see if chest is available to be clicked
	if (treasurebox!=null) {
		if (treasurebox.innerHTML.indexOf('Click Akem Manah')!=-1) {
			var treasureform = treasurebox.getElementsByTagName('form')[0];
			addToLog("Opening Akem Manah Treasurebox.");
			treasureform.submit();
		}
	}

	if ((location.href.indexOf('treasure.php')!=-1) && (location.href.indexOf('chest=clicked')!=-1)) {
		//Opened treasure chest. Log the results.
		var chestresult = document.getElementById('app25287267406_content').innerHTML;
		var chestloot = chestresult.substring(chestresult.indexOf('You have obtained'),chestresult.indexOf('Akem Manah eagerly awaits your next visit.'));
		addToLog(chestloot);
	}
}

// autoheal
if((GM_getValue('autoHeal', '') == "checked") && (GM_getValue('paused')==0))
{
	if(health<GM_getValue('healthLevel', '')  && rage>GM_getValue('healthRage', '') )
	{
		document.getElementById(SCRIPT.appID+'_health_refill_popup').style.display = 'block';
		setTimeout(function(){document.getElementById(SCRIPT.appID+'_health_refill_popup').getElementsByTagName('form')[0].submit();},delay);
		return;
	}
}
			
// autofight
if((GM_getValue('autoFight', '') == "checked" && rage>GM_getValue('fightKeepRage', 0)) && (GM_getValue('paused')==0))
{
	if(health>19)
	{
		if(GM_getValue('fightRandom', '') == "checked")
		{
			if (location.href.indexOf(SCRIPT.name+'/fight') != -1)
			{
				var opponents  = document.evaluate("//input[@name='opponent_id']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);//.singleNodeValue;
				var fightIndex = Math.floor(Math.random()*opponents.snapshotLength);
				//for (var fightIndex=0;fightIndex<opponents.snapshotLength;fightIndex++) {
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
				catch (e) 
				{
					//continue;
				}
				//}
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

// autostats
if((GM_getValue('autoStats', '') == "checked" && level!=GM_getValue('currentlevel', 1)) && (GM_getValue('paused')==0))
{
	if (location.href.indexOf(SCRIPT.name+'/stats') != -1)
	{
		var skillpoints = document.body.innerHTML.split('You have <span class="good">')[1];
		if(skillpoints!=null)
		{
			skillpoints = parseInt(skillpoints);
			var attributes = document.evaluate("//table[@class='main']",document,null,9,null).singleNodeValue;
		
			var strength = parseInt(attributes.getElementsByTagName('tr')[1].getElementsByTagName('td')[1].innerHTML);
			if(GM_getValue('attackStat', 0)>strength && skillpoints>0)
			{
				setTimeout("document.location = '"+attributes.getElementsByTagName('tr')[1].getElementsByTagName('a')[0].href+"'", delay);
				return;
			}
			else if(GM_getValue('attackStat', 0)<strength)
				 GM_setValue('attackStat', strength);
				 
			var defence = parseInt(attributes.getElementsByTagName('tr')[2].getElementsByTagName('td')[1].innerHTML);
			if(GM_getValue('defenceStat', 0)>defence && skillpoints>0)
			{
				setTimeout("document.location = '"+attributes.getElementsByTagName('tr')[2].getElementsByTagName('a')[0].href+"'", delay);
				return;
			}
			else if(GM_getValue('defenceStat', 0)<defence)
				 GM_setValue('defenceStat', defence);

			var energy = parseInt(attributes.getElementsByTagName('tr')[3].getElementsByTagName('td')[1].innerHTML);
			if(GM_getValue('energyStat', 0)>energy && skillpoints>0)
			{
				setTimeout("document.location = '"+attributes.getElementsByTagName('tr')[3].getElementsByTagName('a')[0].href+"'", delay);
				return;
			}
			else if(GM_getValue('energyStat', 0)<energy)
				GM_setValue('energyStat', energy);

			var health = parseInt(attributes.getElementsByTagName('tr')[4].getElementsByTagName('td')[1].innerHTML);
			if(GM_getValue('healthStat', 0)>health && skillpoints>0)
			{
				setTimeout("document.location = '"+attributes.getElementsByTagName('tr')[4].getElementsByTagName('a')[0].href+"'", delay);
				return;
			}
			else if(GM_getValue('healthStat', 0)<health)
				GM_setValue('healthStat', health);

			var rage = parseInt(attributes.getElementsByTagName('tr')[5].getElementsByTagName('td')[1].innerHTML);
			if(GM_getValue('rageStat', 0)>rage && skillpoints>1)
			{
				setTimeout("document.location = '"+attributes.getElementsByTagName('tr')[5].getElementsByTagName('a')[0].href+"'", delay);
				return;
			}
			else if(GM_getValue('rageStat', 0)<rage)
				GM_setValue('rageStat', rage);
		}
		GM_setValue('currentlevel', level);
	}
	else
		window.location = "http://apps.facebook.com/"+SCRIPT.name+"/stats.php";
}

function toggleSettings()
{
    if(settingsOpen == false)
    {
        settingsOpen = true;
        settingsButton.innerHTML = "close settings";
        settingsBox.style.visibility = "visible";
        saveNotification.style.visibility = "hidden";
    }
    else
    {
        settingsOpen = false;
        settingsButton.innerHTML = "open settings";
        settingsBox.style.visibility = "hidden";
        saveNotification.style.visibility = "hidden";
    }
}

function saveSettings()
{
    GM_setValue('autoClick', document.getElementById('autoClick').checked ? 'checked' : '0');
    //GM_setValue('autoClan', document.getElementById('autoClan').checked ? 'checked' : '0');
    GM_setValue('autoMission', document.getElementById('autoMission').checked ? 'checked' : '0');
    GM_setValue('missionMastery', document.getElementById('missionMastery').checked ? 'checked' : '0');
    GM_setValue('autoBank', document.getElementById('autoBank').checked ? 'checked' : '0');
    GM_setValue('autoHeal', document.getElementById('autoHeal').checked ? 'checked' : '0');
    GM_setValue('autoBuff', document.getElementById('autoBuff').checked ? 'checked' : '0');
    GM_setValue('autoFight', document.getElementById('autoFight').checked ? 'checked' : '0');
    GM_setValue('fightRandom', document.getElementById('fightRandom').checked ? 'checked' : '0');
    //GM_setValue('freshMeat', document.getElementById('freshMeat').checked ? 'checked' : '0');
    GM_setValue('rFightList', document.getElementById('rFightList').checked ? 'checked' : '0');
    GM_setValue('autoLog', document.getElementById('autoLog').checked ? 'checked' : '0');
    GM_setValue('autoGamble', document.getElementById('autoGamble').checked ? 'checked' : '0');
    GM_setValue('autoTreasure', document.getElementById('autoTreasure').checked ? 'checked' : '0');
    GM_setValue('rBoxLeft', document.getElementById('rBoxLeft').checked ? 'checked' : '0');
    GM_setValue('rBoxMiddle', document.getElementById('rBoxMiddle').checked ? 'checked' : '0');
    GM_setValue('rBoxRight', document.getElementById('rBoxRight').checked ? 'checked' : '0');
    GM_setValue('autoStats', document.getElementById('autoStats').checked ? 'checked' : '0');
    GM_setValue('autoMinion', document.getElementById('autoMinion').checked ? 'checked' : '0');
    GM_setValue('refreshPage', document.getElementById('refreshPage').value);
    GM_setValue('selectMission', selectMission.selectedIndex );
    GM_setValue('bankConfig', document.getElementById('bankConfig').value);
    GM_setValue('bankKeep', document.getElementById('bankKeep').value);
    GM_setValue('r1', document.getElementById('r1').value);
    GM_setValue('r2', document.getElementById('r2').value);
    GM_setValue('fightList', document.getElementById('fightList').value);
    GM_setValue('healthLevel', document.getElementById('healthLevel').value);
    GM_setValue('healthRage', document.getElementById('healthRage').value);
    GM_setValue('fightKeepRage', document.getElementById('fightKeepRage').value);
    GM_setValue('fightLevel', document.getElementById('fightLevel').value);
    GM_setValue('fightClanSize', document.getElementById('fightClanSize').value);
    GM_setValue('fightClanRating', document.getElementById('fightClanRating').value);
    GM_setValue('attackStat', document.getElementById('AttackStat').value);
    GM_setValue('defenceStat', document.getElementById('DefenceStat').value);
    GM_setValue('energyStat', document.getElementById('EnergyStat').value);
    GM_setValue('healthStat', document.getElementById('HealthStat').value);
    GM_setValue('rageStat', document.getElementById('RageStat').value);
    //alert("settings saved.");
    //document.location = location.href;
    saveNotification.style.visibility = "visible";
    setTimeout("document.location = location.href",1000);
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

function pausePlayer()
{
		GM_setValue('paused',1);
		document.location = location.href;
}

function resumePlayer()
{
		GM_setValue('paused',0);
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
	var month = 1+ parseInt(currentTime.getMonth());
//ORIG code for log date was- var timestamp = currentTime.getDate()+ "/" + month+ "/" +currentTime.getFullYear() +" " +currentTime.getHours() + ":" + currentTime.getMinutes()+" ";   
	var timestamp = month+ "/" + currentTime.getDate()+ "/" +currentTime.getFullYear() +" " +currentTime.getHours() + ":" + currentTime.getMinutes()+" ";
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

function makeElement(type, appendto, attributes, checked, chkdefault) {
  var element = document.createElement(type);
  if (attributes != null) {
    for (var i in attributes) {
      element.setAttribute(i, attributes[i]);
    }
  }
  if (checked != null) {
    if (GM_getValue(checked, chkdefault) == 'checked') {
      element.setAttribute('checked', 'checked');
    }
  }
  if (appendto) {
    appendto.appendChild(element);
  }
  return element;
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
)();
*/
