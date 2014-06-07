// ==UserScript==
// @name           Neopets - Neoquest I battle-bot
// @namespace      http://userscripts.org/users/jo-shadow
// @description    A bot that helps to automate battles in Neopet's Neoquest I. Based loosely on DaGenius's Neoquest 1 attacker.
// @author         jo-shadow
// @license        GNU GPL
// @version        0.1.5
// @updated        02/12/2011
// @language       en
// @include        http://www.neopets.com/games/neoquest/*
// @include        http://neopets.com/games/neoquest/*
// @history        0.1 Initial release
// @history        0.1.1 Fixed potion count
// @history        0.1.2 Fixed Do nothing action.
// @history        0.1.3 Added pause for random events.
// @history        0.1.4 Added auto-cast of absorption when possible.
// @history        0.1.5 Fixed false return to the map during some conversations.





// ==/UserScript==

/**************************************************************************

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

**************************************************************************/


var PAUSE_FOR_BOSS_FIGHTS = true;


var nqContent, abilities, bosses;

function initialize(){
	var i, bossFight, bosses, randomEvents, somethingHasHappened;

	nqContent = (document.evaluate(
		"//div[@class='contentModule phpGamesNonPortalView']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null)).snapshotItem(0);
		
	abilities = document.evaluate(
		"//a[@href='javascript:;']",
		nqContent,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	
	randomEvents = (document.evaluate(
		"//strong",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null))
	
	bosses = [];
	bosses.push("Xantan The Foul");
	bosses.push("Kreai");
	bosses.push("Gors the Mighty");
	bosses.push("Rollay Scaleback");
	bosses.push("Archmagus of Roo");
	bosses.push("Guardian of Fire Magic");
	bosses.push("Guardian of Ice Magic");
	bosses.push("Guardian of Shock Magic");
	bosses.push("Guardian of Spectral Magic");
	bosses.push("Guardian of Life Magic");
	bosses.push("Faelinn");
	bosses.push("Jahbal");
	bosses.push("Mastermind");
	bosses.push("Xantan Reborn");
	
	bossFight=false;
	if(PAUSE_FOR_BOSS_FIGHTS){
		for (i=0;i<bosses.length;i++){
			if (nqContent.innerHTML.indexOf(bosses[i]) !== -1){
				bossFight=true;
				i=bosses.length;
			}
		}
	}
	
	somethingHasHappened=false;
		
	for(var i=0;i<randomEvents.snapshotLength;i++){
		if(randomEvents.snapshotItem(i).innerHTML.indexOf('Something Has Happened')!=0){
			somethingHasHappened=true;
			alert("RANDOM EVENT!");
		}
	}
	
		
		
	if(!bossFight&&!somethingHasHappened){
		if(abilities.snapshotLength !==0){
			combat();
		}else if(nqContent.innerHTML.indexOf('to see what you found')!==-1){
			location.href=nqContent.getElementsByTagName('a')[0];
		}else if(nqContent.innerHTML.indexOf("You defeated")!==-1 && nqContent.innerHTML.indexOf("Start conversation over")==-1){
			submitForm("Click here to return to the map");
		}else if(nqContent.innerHTML.indexOf("You are attacked by")!==-1){
			submitForm("Click here to begin the fight!");
		}
	}
}
	
function combat(){
	var i;
		
	var temphealth=nqContent.innerHTML.split('Health: <b>')[1];
	var curHealth=temphealth.split('</b>')[0];
	var maxHealth=temphealth.split('</b>/')[1].split(' <img')[0];
	var curDamage=maxHealth-curHealth;
		
	var playerFields= (document.evaluate(
		"//td[@bgcolor='#00ff00']",
		nqContent,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null));
		
	var enemyFields= (document.evaluate(
		"//td[@bgcolor='#ff9999']",
		nqContent,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null));
		
	var enemyName=(enemyFields.snapshotItem(0).innerHTML).split('<b>')[1].split('</b>')[0];
	
	var damageTaken= getDamage(playerFields,enemyFields);
	
	var abilityList = [];
	var potionList;
	var potionCount = 0;
	var spiritGrowth = false;
	var curHeal = 0;
	for(i=0;i<abilities.snapshotLength;i++){
		abilityList.push(abilities.snapshotItem(i).innerHTML);
	}
	
	potionList = getpotionList(abilityList);
	
	if (abilityList.indexOf('Spirit of Growth') !== -1) {
		spiritGrowth = true;
	}
	if(curHealth/maxHealth < 0.20){
		alert("CAUTION! LOW HEALTH! CONSIDER FLEEING!");
	}else if(curHealth/maxHealth < 0.70){		
		for(i=0;i<potionList.length;i++){
			potionCount+=potionList[i][0];
			if (!curDamage<potionList[i][0]){
				if((i+1<potionList.length)&&(curDamage<2.5*potionList[i+1][0])){
					curHeal = potionList[i+1][0];
					i=potionList.length;
					
				}
				else{
					curHeal = potionList[i][0];
					i=potionList.length;
				}
			}
		}
		if(curHeal!==0){
			if (potionCount < 5){
				alert("CAUTION, LOW POTION COUNT! CONSIDER FLEEING");
			}else{
				for(i=0;i<abilityList.length;i++){
					if (abilityList[i].indexOf('heals '+curHeal) !== -1){
						abilities.snapshotItem(i).onclick();
						break;
					}
				}
			}
		}
		
	}
	if (abilityList.indexOf('Cast Absorption') !== -1){
		abilities.snapshotItem(abilityList.indexOf('Cast Absorption')).onclick();
	}else if (abilityList.indexOf('Attack') !== -1){
		abilities.snapshotItem(abilityList.indexOf('Attack')).onclick();
	}else if (abilityList.indexOf('Do nothing') !== -1){
		abilities.snapshotItem(abilityList.indexOf('Do nothing')).onclick();
	}
}

function getDamage(playerFields, enemyFields){
	var tempDamage=0;
	var i;
	
	for(i=1;i<enemyFields.snapshotLength;i++){
		if(enemyFields.snapshotItem(i).innerHTML.indexOf('blasts you for') !== -1){
			tempDamage+=parseInt(enemyFields.snapshotItem(i).innerHTML.split('blasts you for <b>')[1].split('</b>')[0]);
		}
	}
	
	for(i=1;i<playerFields.snapshotLength;i++){
		if(playerFields.snapshotItem(i).innerHTML.indexOf('You take ') !== -1){
			tempDamage+=parseInt(playerFields.snapshotItem(i).innerHTML.split('You take <b>')[1].split('</b>')[0]);
		}
	}
	return tempDamage;
}

function getpotionList(abilityList){
	var i;
	var temp;
	var length = abilityList.length;
	var potionArray = [];
	var tempArray;
	for(i=0;i<length;i++){
		if (abilityList[i].indexOf('Healing Potion') !== -1){
			tempArray = new Array(2);
			temp=abilityList[i].split('Healing Potion (heals ')[1];
			tempArray[0]=temp.split(') (')[0];
			tempArray[1]=temp.split(') (')[1].split(' left)')[0];
			potionArray.push(tempArray);
		}
	}
	return potionArray.sort().reverse();
}

function submitForm(text){
	for(i=0;i<document.forms.length;i++){
		if(document.forms[i].elements[0].value==text){
			document.forms[i].submit();
		}
	}
}



initialize();

