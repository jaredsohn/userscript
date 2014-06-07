// ==UserScript==
// @name        blazingthunder's KoLCombatSummary
// @namespace   blazingthunder combat summary
// @description Summarizes each round or set of rounds of combat
// @include     *.kingdomofloathing.com/fight.php*
// @include     *127.0.0.1:600/fight.php*
// @exclude     *forums.kingdomofloathing.com*
// @version     0.1.2
// ==/UserScript==

/*
Created by blazingthunder
I used MonsterStats as a guide/resource because it does some similar things, just shows them differently. I borrowed some of the code from it and I do not claim ownership of those sections of code.
*/

/*
8/15/12: Fixed some issues. Also, if there isn't anything to summarize, instead of not making a summary, it now will tell you that nothing happened
8/15/12: Added a shiny new down arrow image, replacing the downarrow ascii
8/15/12: First public release
8/13/12: Created
*/

console.log('Summary starting')
enemyDamage = 0; attackDelevel = 0; defenseDelevel = 0; playerDamage = 0; foundEffect = ''; mpGain = 0; meatFound = 0; itemsFound = ''; expFound = ''; macroAbortion = ''; combatEnd = '';
setUpScript()
findDamageToEnemy()
findDelevelToEnemy()
findDamageToPlayer()
findEffect()
findMPGain()
findFoundMeat()
findFoundItems()
findExperience()
findMacroAbort()
findCombatEnd()
downArrow = '<img alt="" src="data:image/gif;base64,R0lGODlhEAAJAPcAAAAAAAgICBAQEBgYGCEhITExMUJCQkpKSlJSUmtra6mpqdbW1t7e3ufn5+/v7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAQAAkAAAhPAP/9Q0CQ4AEEBxEeGCBQgIMHECNKdJBAwEAFEjM+cIAggMACCzRCbNBRoEACITMuMODR5MeQDEaWdGkSQUyIFWnSRLCgQYKWOl0SYKkzIAA7" />'
addSummary()

 function setUpScript(){ //Adds the area the summary will be in
	allTables = document.getElementsByTagName('table') //creates an ordered array of table elements. Most on-screen info is displayed within tables in KoL
	for(i = 0; i < allTables.length; i++){ //searches through all entries in the array
		if(allTables[i].innerHTML.indexOf('Combat!') > -1){ //checks to see if the table is the combat area
			combatArea = allTables[i] //looks specifically at that table
		}
	}
	combatText = combatArea.innerHTML
	console.log('Script has been set up')
}

function addSummary(){
	console.log('Adding summary')
	newTable = document.createElement('table') //creates the new area
	newTable.width = '95%' //Matches it to the usual KoL blue-window size
	newTable.setAttribute('cellspacing', '0')
	newTable.setAttribute('cellpadding', '0')
	combatArea.parentNode.insertBefore(newTable, combatArea) //puts in the new table
	newTable.innerHTML = '<tbody><tr><td bgcolor="blue" width="50"></td><td bgcolor="blue" align="center" style="color: white;"><b>Combat Summary:</b></td><td bgcolor="blue" align="right" width="50" valign="center"><a href="#end">' + downArrow + '</a> &nbsp;</td></tr><tr><td style="padding: 5px; border: 1px solid blue;" colspan="3"><center id=summary><p></p><p></p><p></p></center></td></tr><tr><td height="4"></td></tr></tbody>' //html that makes it look like the usual KoL blue-windows
	jumpto = document.getElementById('jumptobot') //looks for the "jump to last round" button
	if(jumpto){
		jumpto.parentNode.removeChild(jumpto)
	}
	summaryArea = document.getElementById('summary')
	monsterSummary = ''
	if(enemyDamageInfo){
		monsterSummary = enemyDamageInfo
	}
	if(delevelInfo){
		if(monsterSummary.length > 0){
			monsterSummary = monsterSummary + '<br/>'
		}
		monsterSummary = monsterSummary + delevelInfo
	}
	playerSummary = ''
	if(playerDamageInfo){
		playerSummary = playerDamageInfo
	}
	if(mpGainInfo){
		if(playerSummary.length > 0){
			playerSummary = playerSummary + '<br/>'
		}
		playerSummary = playerSummary + mpGainInfo
	}
	if(foundEffect){
		if(playerSummary.length > 0){
			playerSummary = playerSummary + '<br/>'
		}
		playerSummary = playerSummary + foundEffect
	}
	endSummary = ''
	if(macroAbortion.length > 0){
		endSummary = macroAbortion
	}
	if(combatEnd.length > 0){
		if(endSummary.length > 0){
			endSummary = endSummary + '<br/>'
		}
		endSummary = endSummary + combatEnd
	}
	if(meatFoundInfo){
		if(endSummary.length > 0){
			endSummary = endSummary + '<br/>'
		}
		endSummary = endSummary + meatFoundInfo
	}
	if(itemsFound.length > 0){
		if(endSummary.length > 0){
			endSummary = endSummary + '<br/>'
		}
		endSummary = endSummary + itemsFound
	}
	if(expFound.length > 0){
		if(endSummary.length > 0){
			endSummary = endSummary + '<br/>'
		}
		endSummary = endSummary + expFound
	}
	if((monsterSummary.length == 0) && (playerSummary.length == 0) && (endSummary.length == 0)){
		playerSummary = 'Nothing interesting happened.'
	}
	summaryChild = summaryArea.childNodes
	summaryChild[0].innerHTML = monsterSummary
	summaryChild[1].innerHTML = playerSummary
	summaryChild[2].innerHTML = endSummary
	console.log('Summary added')
}

function findDamageToEnemy() { //looks at the combat messages and finds how much total damage was done to the enemy
	damageFound = combatText.match(/ ((your blood, to the tune of )|(stabs you for )|(sown ))?(\<font color\=[\"]?\w+[\"]?\>)?(\<b\>)?\d+(\<\/b\>)?(\<\/font\>)? (\([^\.]+\) )?(\w+ ){0,2}((damage)|((^hit) points)|(notches)|(to your opponent))/g) //matches for a regular expression. I edited some of the ones from MonsterStats
	if(damageFound){
		console.log(damageFound.toString() + ' damages found')
		for(i = 0; i < damageFound.length; i++){ //loops through the damage messages
			tempText = damageFound[i] //look at specific message
			damageAmounts = tempText.match(/[0-9]+/g) //sort out the numbers into an array
			tempDamage = 0
			console.log(damageAmounts.toString() + ' damage amounts ' + i)
			for(u = 0; u < damageAmounts.length; u++){ //add them all up
				tempDamage = tempDamage + Number(damageAmounts[u])
				console.log(tempDamage + ' ' + u)
			}
			iceRepeat = /^sown /
			if(iceRepeat.test(tempText)){ //ice cicle repeats the damage in the combat text. "reap x damage, sown x damage"
				tempDamage = tempDamage / 2
			}
			familiarHurtPlayer = /^((your blood, to the tune of )|(stabs you for ))/
			if(familiarHurtPlayer.test(tempText)){ //familiar messages that have similar text to enemy damage messages, but really are player damage messages
				playerDamage = playerDamage + tempDamage
			}
			else{
				enemyDamage = enemyDamage + tempDamage //if it's not player damage, add it to the enemy damage
				console.log(enemyDamage.toString() + ' total so far')
			}
		}
		if(combatText.indexOf('sucks some blood out of your opponent and injects it into you.') != -1){ //mosquito takes health from enemy. borrowed this straight out of MonsterStats, with a small bit of editing, so I don't claim I made this part
			bodyAfterMessage =	pageBodyText.substring(pageBodyText.indexOf('sucks some blood out of your opponent and injects it into you.')+1)
			damageText = bodyAfterMessage.match(/You gain \d+ hit point/)
			if (damageText) {
				damageAmount = damageText[0].substring(9,damageText[0].indexOf('hit point'));
				enemyDamage = enemyDamage + Number(damageAmount);
			}
		}
	}
	healFound = combatText.match(/Enemy regains \<b\>\d+\<\/b\> HP/)
	if(healFound){
		for(i = 0; i < healFound.length; i++){
			healText = healFound[i]
			healText = healText.match(/\d+/)
			healText = Number(healText[0])
			enemyDamage = enemyDamage - healText
		}
	}
	if (combatText.indexOf('until he disengages, two goofy grins on his faces.') != -1) { //boss bat sucks mp, adds to its health. Once again, borrowed from MonsterStats
        bodyAfterMessage =	pageBodyText.substring(pageBodyText.indexOf('until he disengages, two goofy grins on his faces.')+1);
        damageText = bodyAfterMessage.match(/You lose \d+/);
        if (damageText) {
          damageAmount = Number(damageText[0].substring(9));
          enemyDamage = enemyDamage - Number(damageAmount);
        }
    }
	if(enemyDamage > 0){
		enemyDamageInfo = 'Enemy lost ' + enemyDamage.toString() + ' health.'
	}
	else if(enemyDamage < 0){
		absEnemyDamage = Math.abs(enemyDamage)
		enemyDamageInfo = 'Enemy gained ' + absEnemyDamage.toString() + ' health.'
	}
	else{
		enemyDamageInfo = null
	}
	console.log('Found damage to enemy')
}

function findDelevelToEnemy(){
	console.log('Finding delevel')
	attackFound = combatText.match(/Monster attack power reduced by \<b>\d+/g)
	defenseFound = combatText.match(/Monster defense reduced by \<b\>\d+/g)
	if(attackFound){
		for(i = 0; i < attackFound.length; i++){
			tempText = attackFound[i]
			delevelText = tempText.match(/\d+/)
			attackDelevel = attackDelevel + Number(delevelText)
		}
	}
	if(defenseFound){
		for(i = 0; i < defenseFound.length; i++){
			tempText = defenseFound[i]
			delevelText = tempText.match(/\d+/)
			defenseDelevel = defenseDelevel + Number(delevelText)
		}
	}
	delevelInfo = null
	if(attackDelevel){
		delevelInfo = 'Enemy deleveled: ' + attackDelevel.toString() + ' attack'
	}
	if(defenseDelevel){
		if(delevelInfo){
			delevelInfo = delevelInfo + ', ' + defenseDelevel.toString() + ' defense'
		}
		else{
			delevelInfo = 'Enemy deleveled ' + defenseDelevel.toString() + ' defense'
		}
	}
	if(delevelInfo){
		delevelInfo = delevelInfo + '.'
	}
	console.log('Found delevel')
}

function findDamageToPlayer(){ //finds the amount of damage done to the player
	console.log('Finding player damage')
	damageFound = combatText.match(/You lose \d+ hit points/g)
	console.log('Finding player heal')
	healFound = combatText.match(/You gain \d+ hit points/g)
	if(damageFound){
		console.log(damageFound.toString() + ' player damage')
	}
	if(healFound){
		console.log(healFound.toString() + ' player heal')
	}
	if(damageFound){
		for(i = 0; i < damageFound.length; i++){
			tempText = damageFound[i]
			tempNumbers = tempText.match(/\d+/)
			tempDamage = Number(tempNumbers)
			playerDamage = playerDamage + tempDamage
		}
	}
	if(healFound){
		for(i = 0; i < healFound.length; i++){
			tempText = healFound[i]
			tempNumbers = tempText.match(/\d+/)
			tempDamage = Number(tempNumbers)
			playerDamage = playerDamage - tempDamage
		}
	}
	if(playerDamage > 0){
		playerDamageInfo = 'You lost ' + playerDamage.toString() + ' health.'
	}
	else if(playerDamage < 0){
		absPlayerDamage = Math.abs(playerDamage)
		playerDamageInfo = 'You gained ' + absPlayerDamage.toString() + ' health.'
	}
	else{
		playerDamageInfo = null
	}
	console.log('Found damage/heal to player')
}

function findEffect(){
	console.log('finding effects')
	effectFound = combatText.match(/You acquire an effect: <b>[^\<]*/)
	durationFound = combatText.match(/\(duration: \d+ Adventures\)/)
	if(effectFound){
		for(i = 0; i < effectFound.length; i++){
			effectText = effectFound[i]
			effectText = effectText.replace('acquire an effect: <b>', 'acquired an effect: ')
			durationText = durationFound[i]
			durationText = Number(durationText.substring(11, durationText.length - 12))
			effectText = effectText + ' (' + durationText + ')'
			if(foundEffect.length > 0){
				foundEffect = foundEffect + '<br/>'
			}
			foundEffect = foundEffect + effectText
		}
	}	
}

function findMPGain(){ //finds the amount mp gained. doesn't track mp used for skills, I think
	console.log('Finding MP gain')
	restoreFound = combatText.match(/You gain \d+ M[a-z]* Points/g)
	console.log('Finding MP loss')
	lossFound = combatText.match(/You lose \d+ M[a-z]* Points/g)
	if(restoreFound){
		console.log(restoreFound.toString() + ' player restore')
	}
	if(lossFound){
		console.log(lossFound.toString() + ' player mp loss')
	}
	if(restoreFound){
		for(i = 0; i < restoreFound.length; i++){
			tempText = restoreFound[i]
			tempNumbers = tempText.match(/\d+/)
			tempMP = Number(tempNumbers)
			mpGain = mpGain + tempMP
		}
	}
	if(lossFound){
		for(i = 0; i < lossFound.length; i++){
			tempText = lossFound[i]
			tempNumbers = tempText.match(/\d+/)
			tempMP = Number(tempNumbers)
			mpGain = mpGain - tempMP
		}
	}
	if(mpGain > 0){
		mpGainInfo = 'You gained ' + mpGain.toString() + ' MP.'
	}
	else if(mpGain < 0){
		absMPGain = Math.abs(mpGain)
		mpGainInfo = 'You lost ' + absMPGain.toString() + ' MP.'
	}
	else{
		mpGainInfo = null
	}
	console.log('Found MP')
}

function findFoundMeat(){
	console.log('Finding found meat')
	meatFindFound = combatText.match(/You gain \d+ Meat/g)
	meatLost = combatText.match(/You lose \d+ Meat/) //Not sure if any combats steal meat, but just in case...
	if(meatFindFound){
		for(i = 0; i < meatFindFound.length; i++){
			meatText = meatFindFound[i]
			meatText = meatText.substring(9, meatText.length - 5)
			meatFound = meatFound + Number(meatText)
		}
	}
	if(meatLost){
		for(i = 0; i < meatLost.length; i++){
			meatText = meatLost[i]
			meatText = meatText.substring(9, meatText.length - 5)
			meatFound = meatFound - Number(meatText)
		}
	}
	if(meatFound > 0){
		meatFoundInfo = 'You gained ' + meatFound.toString() + ' Meat.'
	}
	else if(meatFound < 0){
		absmeatFound = Math.abs(meatFound)
		meatFoundInfo = 'You lost ' + absmeatFound.toString() + ' Meat.'
	}
	else{
		meatFoundInfo = null
	}
	console.log('Found finned meat')
}

function findFoundItems(){
	console.log('Finding found items')
	itemFindFound = combatText.match(/You acquire an item: \<b\>[^\<]*/g)
	if(itemFindFound){
		console.log('Found items: ' + itemFindFound.toString())
		for(i = 0; i < itemFindFound.length; i++){
			itemText = itemFindFound[i]
			itemText = itemText.substring(24)
			itemsFound = itemsFound + itemText + ", "
		}
		itemsFound = itemsFound.substring(0, itemsFound.length - 2)
		if(itemFindFound.length > 1){
			itemsFound = 'You acquired some items: ' + itemsFound + '.'
		}
		else if(itemFindFound.length = 1){
			itemsFound = 'You acquired an item: ' + itemsFound + '.'
		}
	}
	console.log('Found finded items')
}

function findExperience(){
	console.log('Finding experience')
	foundMuscle = combatText.match(/You gain \d+ ((Beefiness)|(Fortitude)|(Muscleboundness)|(Strengthliness)|(Strongness))/)
	foundMyst = combatText.match(/You gain \d+ ((Enchantedness)|(Magicalness)|(Mysteriousness)|(Wizardliness))/)
	foundMoxie = combatText.match(/You gain \d+ ((Cheek)|(Chutzpah)|(Roguishness)|(Sarcasm)|(Smarm))/)
	foundMuscleUp = combatText.match(/You gain a Muscle point/)
	foundMystUp = combatText.match(/You gain a Mysticality point/)
	foundMoxieUp = combatText.match(/You gain a Moxie point/)
	console.log('Finding experience p2')
	if(foundMuscle){
		foundMuscled = foundMuscle[0].replace('gain', 'gained')
		expFound = foundMuscled + '.'
	}
	console.log('Finding experience p3')
	if(foundMuscleUp){
		foundMuscleUpd = foundMuscleUp[0].replace('gain', 'gained')
		foundMuscleUp = foundMuscleUpd + '!'
		if(expFound.length > 0){
			expFound = expFound + '<br/>' + foundMuscleUp
		}
		else{
			expFound = foundMuscleUp
		}
	}
	console.log('Finding experience p4')
	if(foundMyst){
		foundMystd = foundMyst[0].replace('gain', 'gained')
		if(expFound.length > 0){
			expFound = expFound + '<br/>' + foundMystd + '.'
		}
		else{
			expFound = foundMystd
		}
	}
	console.log('Finding experience p5')
	if(foundMystUp){
		foundMystUpd = foundMystUp[0].replace('gain', 'gained')
		foundMystUp = foundMystUpd + '!'
		if(expFound.length > 0){
			expFound = expFound + '<br/>' + foundMystUp
		}
		else{
			expFound = foundMystUp
		}
	}
	console.log('Finding experience p6')
	if(foundMoxie){
		foundMoxied = foundMoxie[0].replace('gain', 'gained')
		if(expFound.length > 0){
			expFound = expFound + '<br/>' + foundMoxied + '.'
		}
		else{
			expFound = foundMoxied
		}
	}
	console.log('Finding experience p7')
	if(foundMoxieUp){
		foundMoxieUpd = foundMoxieUp[0].replace('gain', 'gained')
		foundMoxieUp = foundMoxieUpd + '!'
		if(expFound.length > 0){
			expFound = expFound + '<br/>' + foundMoxieUp
		}
		else{
			expFound = foundMoxieUp
		}
	}
	console.log('Found experience: ' + expFound)
}

function findMacroAbort(){
	console.log('Looking for aborted macro')
	abortionFound = combatText.match(/Macro Aborted \(\"abort[^(\"\))]*\"\)/)
	if(abortionFound){
		macroAbortion = abortionFound[0]
		console.log(macroAbortion + ' aborted')
	}
	console.log('Found aborted macro')
}

function findCombatEnd(){
	console.log('Finding combat end')
	combatWin = combatText.match(/You win the fight\!/)
	combatLose = combatText.match(/ You slink away, dejected and defeated/)
	if(combatWin){
		combatEnd = 'You won the fight!'
	}
	else if(combatLose){
		combatEnd = 'You lost. You slunk away, dejected and defeated.'
	}
	console.log('Found combat end')
}