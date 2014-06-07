//
// ==UserScript==
// @name          Elven
// @description   Elven GO
// @namespace     http://pn.com/
// @include       http://apps.facebook.com/elvenblood/*
// @include       http://apps.new.facebook.com/elvenblood/*
// @include       http://alumni.soe*
// @include       http://release/*
//
// ==/UserScript==

// Globals
var attackPower = 0;
var defPower = 0;
var goldNum = 0;
var currStamina = 0;
var maxStamina = 0;
var currHp = 0;
var maxHp = 0;
var totalHit = 0; //number of target hit triggered
var hasManualEquip = false;
var isCharPage = false;
var autoAttack = false;
var autoAttackTarget = ' ';
var warReload = 90;
var targetHit = 0;
var targets = new Array();
var targetElem;

var goldHighCap = 200000;
var goldLowCap = 100000;

var unloadCode = "";
var debugMode = GM_getValue('debug', false);
var attackMode = GM_getValue('attack', true);
/*
 *
function GM_log(str) {
	print(str);
}
function GM_setValue() {
}

function GM_getValue() {
}
*/

// Print wrapper

GM_setValue('debug',false);
//GM_setValue('shopItem',0);
//GM_setValue('shopCap',100);
//GM_setValue('shopCurr',0);

/* Random number of different range for various purpose */
var rand_no_5 = Math.ceil(5 * Math.random());
var rand_no_10 = Math.ceil(10 * Math.random());
var rand_no_30 = Math.ceil(30 * Math.random());



function DBG(str) {
	debugMode = GM_getValue('debug');
	if (debugMode) {
		GM_log(str);
	}
	//print(str);
}

function INFO(str) {
	//print(str);
	GM_log(str);
}

/*---------------------------------------------------------------------------*/
/* XPATH CODE */

function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function xpathSingle(query) {
	res = document.evaluate(query, document, null, 
			XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	if (res) {
		return res.singleNodeValue;
	}

	return null;
}

function xpathDig(query, node) {
    return document.evaluate(query, node, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}


function xpathItor(query) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
}



function white_space(field)
{
     field.value = (field.value).replace(/^\s*|\s*$/g,'');
}


String.prototype.fullTrim = function()
{
   return this.replace(/\s+/g," ").replace(/^\s*([\s\S]*\S+)\s*$|^\s*$/,"$1");
}


var staminaXp = "//div[@id='app_content_21371199019']/div/div/div[2]/div/table/tbody/tr[2]/td[2]/div/div[2]/div";
var hpXp	  = "//div[@id='app_content_21371199019']/div/div/div[2]/div/table/tbody/tr[1]/td[2]/div/div[2]/div";
var goldXp    = "//div[@id='app_content_21371199019']/div/div/div[2]/div/div";
var warXp     = "//div[@id='app_content_21371199019']/div/div/div[5]/div[1]/div/table/tbody/tr";
var noAttk    = "//div[@id='app_content_21371199019']/div/div/div[5]/div[1]/div[1]";

var warTitleXp 	 = "//div[@id='app_content_21371199019']/div/div/div[5]/div[1]/div/div";
var charTittleXp = "//div[@id='app_content_21371199019']/div/div/div[5]/div[1]/table[1]/tbody/tr/td[1]/div";
var cPartyXp 	 = "//div[@id='app_content_21371199019']/div/div/div[5]/div[1]/table[2]/tbody/tr/td[2]/table/tbody/tr[6]/td[2]";

var pPartyXp     = "//div[@id='app_content_21371199019']/div/div/div[5]/div[1]/table[2]/tbody/tr[2]/td[4]"
//var pPartyXp 	 = "//div[@id='app_content_21371199019']/div/div/div[5]/div[1]/table/tbody/tr/td[2]/table/tbody/tr[2]/td[4]";
//var pNameXp 	 = "//div[@id='app_content_21371199019']/div/div/div[5]/div[1]/div[1]";
var pNameXp	     = "//div[@id='app_content_21371199019']/div/div/div[5]/div[1]/table[1]/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/div/span";

var homeBXp      = "//div[@id='app_content_21371199019']/div/div/table[2]/tbody/tr/td[1]/center/a";
var shopBXp      = "//div[@id='app_content_21371199019']/div/div/table[2]/tbody/tr/td[3]/center/a";
var warBXp       = "//div[@id='app_content_21371199019']/div/div/table[2]/tbody/tr/td[5]/center/a";

var locNameXp    = "//div[@id='app_content_21371199019']/div/div/div[3]/table/tbody/tr[1]/td/table/tbody/tr/td/div/b";
var locNameXp2   = "//div[@id='app_content_21371199019']/div/div[2]/div[3]/table/tbody/tr[1]/td/table/tbody/tr/td/div/b";
//				   "//div[@id='app_content_21371199019']/div/div/div[3]/table/tbody/tr[1]/td/table/tbody/tr/td/div/b"

var weaponVal = new Array();

weaponVal[0] = ["Unknown Weapon",   0, 0]; 
weaponVal[1] = ["Artemis Bow",   6, 1]; 
weaponVal[2] = ["Helius",        8, 1]; 
weaponVal[3] = ["Mars Scythe",  10, 2]; 
weaponVal[4] = ["Atlas Silver", 10, 4]; 
weaponVal[5] = ["Excalibur"   , 14, 4]; 
weaponVal[6] = ["Silver Edge", 16, 2]; 
weaponVal[7] = ["Heilige spear",20, 0]; 
weaponVal[8] = ["Delacroix heirloom",16, 2]; 
weaponVal[9] = ["Mythril axe",       25, 0]; 
weaponVal[10] = ["Redemption",       24, 2]; 
weaponVal[11] = ["Jeweled dagger",   26, 1]; 
weaponVal[12] = ["Heartseeker",   			28, 5]; 
weaponVal[13] = ["Vampiric scythe",  		30, 0]; 
weaponVal[14] = ["Royal battlesword",   	33, 5]; 
weaponVal[15] = ["3 Fates",   				30, 5]; 
weaponVal[16] = ["Nightmare blade",			25, 10]; 
weaponVal[17] = ["Nova",   					35, 0]; 
weaponVal[18] = ["Sylvain's bow",			20, 20]; 
weaponVal[19] = ["Belief", 					25, 25]; 
weaponVal[20] = ["Starfell",   				30, 20]; 
weaponVal[21] = ["Unholy regard",			40, 10]; 
weaponVal[22] = ["Injustice",   			45, 10]; 
weaponVal[23] = ["Hell star",				50, 0]; 
weaponVal[24] = ["Armageddon",   			50, 0]; 
weaponVal[25] = ["Angelbane",   			35, 30]; 
weaponVal[26] = ["Psychotic Lust",			35, 25]; 
weaponVal[27] = ["Seraphim bow",  			60, 0]; 
weaponVal[28] = ["Rendition X",   			50, 20]; 
weaponVal[29] = ["Ragnarok",   				70, 0]; 
weaponVal[30] = ["Ouroboros whip",   		55, 25]; 
weaponVal[31] = ["Thousand angels",   		80, 0]; 
weaponVal[32] = ["Angelbane",   			35, 30]; 
//weaponVal[17] = ["Nova",   					35, 0]; 
//weaponVal[17] = ["Nova",   					35, 0]; 
//weaponVal[12] = ["Heilige spear",20, 0]; 
//weaponVal[13] = ["Heilige spear",20, 0]; 


var armorVal = new Array();

armorVal[0] = ["Unknown Armor", 	0,0];
armorVal[1] = ["Shield", 			0,2];
armorVal[2] = ["Gauntlets", 		0,4];
armorVal[3] = ["Leather Armor",		0,6];
armorVal[4] = ["Gold Wings", 		0,7];
armorVal[5] = ["Holy Wings", 		2,7];
armorVal[6] = ["Glacius", 			1,10];
armorVal[7] = ["Dragon gauntlets",	2,12];
armorVal[8] = ["Blood wings", 		5,15];
armorVal[9] = ["Drow mail", 		3,17];
armorVal[10] = ["Elven plate", 		4,18];
armorVal[11] = ["Assassin mail",	5,19];
armorVal[12] = ["Inferno",			10,15];
armorVal[13] = ["Mirror shield",	5,15];
armorVal[14] = ["Demonguard",		20,10];
armorVal[15] = ["Dream armor",		15,15];
armorVal[16] = ["Archangel helm",	15,25];
armorVal[17] = ["Grand wings",		10,25];
armorVal[18] = ["Phoenix wing",		10,25];
armorVal[19] = ["Damascus guard",	15,25];
armorVal[20] = ["Ascension",		20,20];
armorVal[21] = ["Angelguard",		25,25];
armorVal[22] = ["Archangel wings",	25,25];
armorVal[23] = ["Tainted wings",	30,30];
armorVal[24] = ["Disbelief",		25,25];
armorVal[25] = ["Cloak of Invisibility",35,35];
armorVal[26] = ["Forcefield",		30,50];
//armorVal[21] = ["Angelguard",		25,25];

var accVal = new Array();
accVal[0] = ["Unknown Acc", 			0,0];
accVal[1] = ["Flame crystal", 			1,0];
accVal[2] = ["Curse of Atlantis", 		2,0];
accVal[3] = ["Star of Atlantis", 		1,0];
accVal[4] = ["Dragon amulet", 			4,3];
accVal[5] = ["Ring of the lich", 		5,5];
accVal[6] = ["Darkness spell", 			3,6];
accVal[7] = ["Assassin masque", 		3,8];
accVal[8] = ["Rebellion gloves", 		4,9];
accVal[9] = ["Throwing knives", 		6,9];
accVal[10] = ["Hell crystal ", 			15,0];
accVal[11] = ["Twilight cape", 			0,15];
accVal[12] = ["Claws of Fenrir", 		5,10];
accVal[13] = ["Rendition V", 			10,15];
accVal[14] = ["Eternal flame", 			10,10];
accVal[15] = ["Invisibility spell", 		10,10];
accVal[16] = ["Shockwave", 				12,12];
accVal[17] = ["Sacrificial dagger", 		15,10];
accVal[18] = ["Dragon tail", 			15,15];
accVal[19] = ["Cloak of Crows", 			15,20];
accVal[20] = ["Crown Superbia", 			20,20];
accVal[21] = ["Flamearrow spell", 		20,15];
accVal[22] = ["Blackhole spell", 		20,25];
accVal[23] = ["Heal spell", 			25,45];
//accVal[16] = ["Shockwave", 				12,12];
//accVal[16] = ["Shockwave", 				12,12];
//accVal[0] = ["Ring", 		5,5];

var mountVal = new Array();
mountVal[0] = ["Unknown Mount",			0,0];
mountVal[1] = ["Horse",					1,1];
mountVal[2] = ["Unicorn",				2,2];
mountVal[3] = ["Dark Pegasus",			4,3];
mountVal[4] = ["Leviathan",				4,6];
mountVal[5] = ["Dragonlet",				8,4];
mountVal[6] = ["Vampire dragon",		12,3];
mountVal[7] = ["Planar panther",		12,6];
mountVal[8] = ["Phoenix",				13,8];
mountVal[9] = ["Griffin",				15,10];
mountVal[10] = ["Undead dragon",		18,10];
mountVal[11] = ["Nightmare",			20,5];
mountVal[12] = ["Dracolich",			20,25];
mountVal[13] = ["Chimera",				20,10];
mountVal[14] = ["Behemoth",				20,15];
mountVal[15] = ["Abyssal demon",		25,20];
mountVal[16] = ["Hydra",				20,25];
//mountVal[11] = ["Nightmare",			20,5];


/*---------------------------------------------------------------------------*/
/* MENU CODE */
INFO("Adding menu");

function toggleDebug(){
	if (debugMode) {
		GM_setValue('debug',false);
	} else {
		GM_setValue('debug',true);
	}
}

function toggleAttack(){
	if (attackMode) {
		GM_setValue('attack',false);
	} else {
		GM_setValue('attack',true);
	}
}

GM_registerMenuCommand('Debug Mode' , toggleDebug);
GM_registerMenuCommand('Attack Mode' , toggleAttack);

/* Add current mode to the city name */
locName = xpathSingle(locNameXp);
if (null == locName) {
	locName = xpathSingle(locNameXp2);
}

INFO(locName.textContent);
locName.textContent = locName.textContent + ' | AutoEB by nepal boy [' + debugMode + '] ATK [' + attackMode + '] ';


function isInList(name, list) 
{
	for (var itor = 0; itor < list.length; itor++){
		if (name == list[itor][0]) {
			return true;	
		}	
	}
	return false;
}

function isWeapon(name)
{
	return isInList(name, weaponVal);

}

function isArmor(name)
{
	return isInList(name, armorVal);

}

function isMount(name)
{
	return isInList(name, mountVal);
}

function isAcc(name)
{
	return isInList(name, accVal);
}

function getVal(name, list) 
{
	for (var itor = 0; itor < list.length; itor++){
		if (name == list[itor][0]) {
			return list[itor];
		}	
	}

	INFO("Could not find item: " +name);
	return list[0];
}	
function getWeaponVal(name) 
{
	return getVal(name, weaponVal);
}


function getArmorVal(name) 
{
	return getVal(name, armorVal);
}

function getMountVal(name) 
{
	return getVal(name, mountVal);
}

function addStats(itemList, itemVal, partySize)
{
	var itemCount = 0;
	for (var itor = 0; itor < itemList.length; itor++){
		itemCount += itemList[itor][1];
	}

	if (itemCount > partySize) {
		DBG("Item count: " + itemCount + " party size: " +partySize);
		var diffCount = itemCount - partySize;
		for (var itor = 0; itor < itemList.length; itor++){
			if (diffCount > itemList[itor][1]) {
				DBG("Trimming " +itemList[itor][1]+" "+ itemList[itor][0]);
				diffCount -= itemList[itor][1];
				itemList[itor][1] = 0;
			} else {
				itemList[itor][1] -= diffCount;
				DBG("Trimming " +diffCount+" "+ itemList[itor][0]);
				break;
			}
		}

	}
	for (var itor = 0; itor < itemList.length; itor++){
		val = getVal(itemList[itor][0], itemVal);
		attackPower += val[1] * itemList[itor][1];
		defPower += val[2] * itemList[itor][1];
	}		
	INFO("Total attack: " + attackPower + "  Total def: " + defPower);

}	
function getMountVal(name) 
{
	//DBG("Searching for: "+ name);

	for (var itor = 0; itor < armorVal.length(); itor++){
		if (name == armorVal[itor][0]) {
			return armorVal[itor];
		}	
	}

	DBG("Could not find weapon: " +name);
	return armorVal[0];
}


function getSimpleList(checkFunc) {
	var itemList = new Array();

	allItem = xpath('//div[@class="itemSimple"]');

	for (var i = 0; i < allItem.snapshotLength; i++) {
		//DBG(allItem.snapshotItem(i).textContent);


		itemSplit = allItem.snapshotItem(i).textContent.split(' x');
		if (itemSplit.length > 1) {
			itemName = itemSplit[0].fullTrim();
			itemCount = itemSplit[1].fullTrim();

			if (checkFunc(itemName)) {
				var item = new Array();
				item[0] = itemName;
				item[1] = parseInt(itemCount);
				itemList.push(item);
				DBG('Name: '+ itemName + ' Count: ' +itemCount);
			}
		}
	}

	return itemList;
}

function getWeaponList()
{
	return getSimpleList(isWeapon);
}


function getArmorList()
{
	return getSimpleList(isArmor);
}


function getMountList()
{
	return getSimpleList(isMount);
}


function getAccList()
{
	return getSimpleList(isAcc);
}


function getStamina() 
{
	stamE = xpath(staminaXp);

	split = stamE.snapshotItem(0).textContent.split('/');
	currStamina = parseInt(split[0]);
	maxStamina = parseInt(split[1]);
	DBG("Curr: " + currStamina + " Max: " + maxStamina);
}

function getHealth()
{
	healthE = xpath(hpXp);
	split = healthE.snapshotItem(0).textContent.split('/');
	currHp = parseInt(split[0]);
	maxHp = parseInt(split[1]);
	DBG("Curr: " + currStamina + " Max: " + maxStamina);
}


function getPercentStamina()
{
	return (currStamina * 100) / maxStamina;
}
function getGold()
{
	goldE = xpath(goldXp);
	goldStr = goldE.snapshotItem(0).textContent.match('[0-9]+g');
	DBG("Gold : " + goldStr);
	goldNum = parseInt(goldStr[0].match('[0-9]+'));
}

function detectManual()
{
	manual = xpath('//input[@value="autoequip"]')

	if (manual != null) {
		DBG("Has manual equip");
		hasManualEquip = true;
		return true;
	}		
	return false;
}

function insertText(query, text) 
{
	var locR = xpath(query);
	if (locR == null) {
		return false;
	}
	var loc = locR.snapshotItem(0);	
	var e = document.createElement('p');
	e.textContent = text;
	
	loc.appendChild(e);

}

function insertLink(query, ahref, text)
{
	var locR = xpath(query);
	if (locR == null) {
		return false;
	}
	var loc = locR.snapshotItem(0);	

	var e = ahref.cloneNode(true);
	e.textContent = e.textContent + text;
	loc.appendChild(e);
}

function insertAnchor(node, name)
{
	var e = document.createElement('a');
	e.name = name;
	
	node.appendChild(e);

}

//----------------------------------------------------------------------------
//


if (/.*char\.php/.test(location.pathname)) {
	DBG("Character page");

	//get party size
	detectManual();

	var partySize = parseInt(xpath(cPartyXp).snapshotItem(0).textContent);	

	var weaponList = getWeaponList();
	addStats(weaponList, weaponVal, partySize);

	var armorList = getArmorList();
	addStats(armorList, armorVal, partySize);

	var mountList = getMountList();
	addStats(mountList, mountVal, partySize);

	var accList = getAccList();
	addStats(accList, accVal, partySize);

	GM_setValue('AP',attackPower);
	GM_setValue('DP',defPower);

	DBG('Setting AP: ' + attackPower + ' DP: ' +defPower);

	insertText(charTittleXp, 'AP: ' + attackPower + ' DP: ' +defPower);
}

function clickAttack()
{
	//Find the submit button
	submit = xpathSingle("//input[@type='submit']");
	if (submit) {
		//Reset the flag
		DBG("Triggering");
		GM_setValue('autoattack', false);
		GM_setValue('closeprofile', true);
		submit.focus();
		submit.click();
	} else {
		window.setTimeout(profToWar, (10 + rand_no_10) * 1000);
		DBG("Can't find submit button");
	}
}

function profToWar(){
	var evt = document.createEvent("HTMLEvents");
	evt.initEvent("click", true, true);
	link = document.getElementsByClassName('menuLink')[4];
	link.dispatchEvent(evt);
	window.location = 'war.php';
}

function toShop(){
	var evt = document.createEvent("HTMLEvents");
	evt.initEvent("click", true, true);
	link = document.getElementsByClassName('menuLink')[1];
	link.dispatchEvent(evt);
	window.location = 'shop.php';
}

/****************************************************************************
 *
 * PROFILE PAGE
 */
if (/.*profile\.php/.test(location.pathname)) {
	DBG("Profile page");

	needClose = GM_getValue('closeprofile');

	if (needClose) {
		getGold();
		INFO("Trying to go back to war window");
		GM_setValue('closeprofile', false);
		if (goldNum > goldHighCap) {
			window.setTimeout(toShop, (10 + rand_no_10) * 1000);
		}
		else {
			window.setTimeout(profToWar, (10 + rand_no_10) * 1000);
		}			
		return;
	}

	var myAP = GM_getValue('AP', 0);
	var myDP = GM_getValue('DP', 0);

	var partySize = parseInt(xpath(pPartyXp).snapshotItem(0).textContent);	

	var weaponList = getWeaponList();
	addStats(weaponList, weaponVal, partySize);

	var armorList = getArmorList();
	addStats(armorList, armorVal, partySize);

	var mountList = getMountList();
	addStats(mountList, mountVal, partySize);

	var accList = getAccList();
	addStats(accList, accVal, partySize);

	DBG('Opponent AP: ' + attackPower + ' DP: ' +defPower);
	DBG('My AP: '+ myAP + ' DP: ' + myDP);
	var elmNewContent = document.createElement('p');
	elmNewContent.textContent = 'My AP:' + myAP + ' DP: ' + myDP + ' | Theirs AP: ' +
			attackPower + ' DP: ' + defPower;
	var elmFoo = xpathSingle(pNameXp);
	elmFoo.parentNode.insertBefore(elmNewContent, elmFoo);


	//Now figure out if we are auto attacking
	autoattack = GM_getValue('autoattack');
	if (autoattack) {
		DBG("Auto attack on profile page");
		if ((myAP > (attackPower * 2)) &&
			(myDP > (defPower * 2))){
			//Trigger the auto attack
			window.setTimeout(clickAttack, (10 + rand_no_10) * 1000);
		} else {
			window.setTimeout(profToWar, (10 + rand_no_10) * 1000);
		}
		//Reset the flag
		GM_setValue('autoattack', false);
	}
}

function loadAttackPage()
{
	DBG("Loading Auto Attack");
	GM_setValue('autoattack', true);
	window.open(autoAttackTarget);
	//GM_openInTab(autoAttackTarget);

	window.setTimeout("document.location.reload();", 60 * 1000);
}


function attackTarget()
{
	DBG("Loading Auto Attack " + targets[targetHit]); 
	GM_setValue('autoattack', true);
	window.open(targets[targetHit]);
	targetHit ++;
}

function isTarget(gold, xp)
{
	staminaLevel = getPercentStamina();

	warReload = 30;
/*
	if (staminaLevel > 90) {
		warReload = 5;
		if ((xp == 3) && (gold > 4000)) {
			return true;
		}
	}

	if (staminaLevel > 80) {
		warReload = 10;
		if ((xp == 3) && (gold > 4000)) {
			return true;
		}
	}

	if (staminaLevel > 50) {
		warReload = 30;
   		if ((xp == 3) && (gold > 4000)) {
			return true;
		}
	}

	if (staminaLevel > 30) {
		warReload = 60;
   		if ((xp < 10) && (gold > 4000)) {
			return true;
		}
	}

	if ((xp == 3) && (gold > 4000)) {
		return true;
	}

	if ((xp < 10) && (gold > 4000)) {
		return true;
	}
*/
	if ((xp == 3) && (gold > 4000)) {
		return true;
	}
	warReload = 90;
	return false;

}


function reloadHome() {
	var evt = document.createEvent("HTMLEvents");
	evt.initEvent("click", true, true);
	link = document.getElementsByClassName('menuLinkHighlight')[0];
	link.dispatchEvent(evt);
	window.location = 'index.php';
}


function reloadWar() {
	var evt = document.createEvent("HTMLEvents");
	evt.initEvent("click", true, true);
	link = document.getElementsByClassName('menuLinkHighlight')[0];
	link.dispatchEvent(evt);
	window.location = 'war.php';
}

function loadTargetProfile() {
	var evt = document.createEvent("HTMLEvents");
	evt.initEvent("click", true, true);
	window.targetElem.dispatchEvent(evt);
	window.location = window.targetElem.href;
}

/****************************************************************************
 *
 * 	WAR page
 */
if (/.*war\.php/.test(location.pathname)) {
	var aElem;
	DBG("War page");
	getGold();
	var targetCount = 0;
	currTargetGold = 0;

	GM_setValue('autoattack', false);
	GM_setValue('closeprofile', false);

	getHealth();
	getStamina();

	//can't fight if we are too weak, wait a while
	if (currHp < 30) {
		window.setTimeout(reloadWar,  10 * 60 * 1000);
		return;
	}


	if (goldNum > goldHighCap) {
		window.setTimeout(toShop,  (5 + rand_no_10)  * 1000);
		return;
	}
	tList = xpath(warXp);

	if (tList == null) {
		window.setTimeout(reloadWar, 15 * 60 * 1000);
		INFO("Got error, reloading");
		return;
	}
	minGold = 0.75 * (goldNum/16);

	if (minGold > 4000) {
		minGold = 4000;
	}

	DBG('Got ' + tList.snapshotLength);
	DBG("Min gold " + minGold);
		
	for (var i = 1; i < tList.snapshotLength; i++) {
		person = xpathDig('td[4]', tList.snapshotItem(i));
		html = person.snapshotItem(0).innerHTML;
		lines = html.split('<br>');
		xp = parseInt(lines[0].match('[0-9]+'));
		gold = parseInt(lines[1].match('[0-9]+'));
		
		if (isTarget(gold, xp)) {
			DBG("XP: " +xp + " Gold: " +gold + "<<<<<");
			//insertAnchor(tList.snapshotItem(i), 'TARGET'+targetCount);

			// try to find the link
			link = xpathDig('td/a', tList.snapshotItem(i));
			aElem = link.snapshotItem(0);
			targetLink =aElem.href;

			targets[targetCount] = targetLink;
			targetCount ++;
			DBG(targetLink);

			insertLink(warTitleXp, aElem, ' '+ gold + ' ');
		
			
			//Pick the one with most gold
			if (gold > currTargetGold) {
				window.targetElem = aElem;
				currTargetGold = gold;
			}

		} else {
			//DBG("XP: " +xp + " Gold: " +gold);
		}
	}
	insertText(warTitleXp, 'Found ' + targetCount);	

	if ((currStamina > 6) && (targetCount > 0) && attackMode) {
		GM_setValue('autoattack', true);
		window.setTimeout(loadTargetProfile, (25 + rand_no_10) * 1000);
		return;
	}

	if (currStamina < 6) {
		if (goldNum > goldLowCap) {
			window.setTimeout(toShop,  (5 + rand_no_10)  * 1000);
		} else {
			//Go to sleep for a long time
			window.setTimeout(reloadWar,  140 * 60 * 1000);
		}
		return;
	}

	if (targetCount == 0) {
		window.setTimeout(reloadWar,  (5 + rand_no_5) * 1000);
	}
}	


// Sending out the buy request
function triggerBuy()
{
	/*
	var shopCurr = GM_getValue('shopCurr');
	var shopCap = GM_getValue('shopCap');
	var shopItem = GM_getValue('shopItem');
	INFO("Curr " + shopCurr + " Cap " + shopCap + " Item " + shopItem);
	*/
		submit = xpath("//input[@type='submit']").snapshotItem(0);
		submit.focus();
		submit.click();
		/*
	if (shopCurr < shopCap) {
		//shopCurr ++;
		//GM_setValue('shopCurr', shopCurr);
		//submit = xpath("//input[@type='submit']").snapshotItem(shopItem);
	} else {
		if (shopItem == 5) {
			GM_setValue('shopItem', 7);
			GM_setValue('shopCurr', 0);
		
		}
	}*/
}


function reloadBuy()
{
	var evt = document.createEvent("HTMLEvents");
	evt.initEvent("click", true, true);
	link = document.getElementsByClassName('menuLinkHighlight')[0];
	link.dispatchEvent(evt);
	window.location = 'war.php';
	window.location="shop.php";
}

/* AUTO SHOP */
if (/.*shop\.php/.test(location.pathname)) {
	getGold();
	if (goldNum > goldLowCap) {
		window.setTimeout(triggerBuy, (10 + rand_no_10) * 1000);
	} else {
		window.setTimeout(profToWar, (10 + rand_no_10) * 1000);
	}
}


if (/.*index\.php/.test(location.pathname)) {
//	window.setTimeout(reloadHome, 15*1000);
}



/*
failed = xpath("//input[@name='try_again_button']");
if (failed) {
	button = failed.snapshotItem(0);
	if (button) {
		INFO("Retrying");
		window.setTimeout(autoClick(button), 10*1000);
	}
}
*/