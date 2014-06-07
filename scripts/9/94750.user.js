// ==UserScript==
// @name           Battlefield Counter rewrite
// @namespace      KoLCtH
// @description    Kingdom of Loathing script to count the remaining number of hippies and fratboys on The Battlefield
// @version			1.2.2
// @include        *kingdomofloathing.com/game.php*
// @include        *kingdomofloathing.com/*island.php*
// @include        *kingdomofloathing.com/fight.php*
// @include        *kingdomofloathing.com/council.php*
// @include        *kingdomofloathing.com/charpane.php*
// @include        *kingdomofloathing.com/afterlife.php*
// @include        http://127.0.0.1:60*/game.php*
// @include        http://127.0.0.1:60*/*island.php*
// @include        http://127.0.0.1:60*/fight.php*
// @include        http://127.0.0.1:60*/council.php*
// @include        http://127.0.0.1:60*/charpane.php*
// @include        http://127.0.0.1:60*/afterlife.php*
// ==/UserScript==
switch(window.location.pathname)
{
	case "/game.php":
		GM_deleteValue('CurrentCharName');
	break
	case "/charpane.php":
		var charName = GM_getValue('CurrentCharName', null);
		if (!charName)
		{
			var charNameNode = $('b');
			if (charNameNode)
			{
				charName = charNameNode.textContent;
				GM_setValue('CurrentCharName', charName);
				//reset config on first run
				if (!GM_getValue(charName + '.active', null))
					resetConfig();
			}
		}
	break
	case '/postwarisland.php':
	case '/bigisland.php':
		showKillCount();
		showSubquestCredit();
		var pageText = document.body.textContent;
		var charName = GM_getValue('CurrentCharName', null);
		var whichAction = window.location.search.match(/action=(\w+)/);
		if (!whichAction)
		{
			//these are the only non-action sub-pages that need work done
			switch(window.location.search)
			{
				case '?place=junkyard':
					document.addEventListener('click', catchJunkZone, false);
				break
				case '?place=concert':
					//finish quest
					if (pageText.indexOf("If you have any flyers left") != -1)
					{			
						if (pageText.indexOf("inhaling some kind of smoke") != -1)
							var arena = 'hippy';
						else if (pageText.indexOf("enjoying an ice-cold beer") != -1)
							var arena = 'fratboy';
						GM_setValue(charName + '.arenaComplete', arena);
					}
				break
			}
			return 
		}
		switch(whichAction[1])
		{
			case 'junkman':
				//finish quest
				if (pageText.indexOf("All right") != -1) 
				{			
					if (pageText.match(/spark plug|baling wire|gearbox/))
						var junkyard = 'hippy';
					else if (pageText.match(/rusty chain|sawblade|wrench/))
						var junkyard = 'fratboy';
					GM_setValue(charName + '.junkyardComplete', junkyard);
					return;
				}
				//process Yossarian's spoiler text about where to find the next tool
				var tool = pageText.match(/The last time I saw my (\w+)/);
				if (tool) 
				{
					var junkyardTool = tool[1];
					var junkyardLocation  = pageText.match(/barrel with something burning in it|abandoned refrigerator|old tires|rusted-out car/)[0];
					GM_setValue(charName + '.junkyardTool', junkyardTool);
					GM_setValue(charName + '.junkyardLocation', junkyardLocation);
				}
				//catch zone clicked for proper gremlin messages
				document.addEventListener('click', catchJunkZone, false);
				var junkyardComplete = GM_getValue(charName + '.junkyardComplete', 'no');
				//Add quest spoiler to the junkyard map
				if (junkyardComplete == 'no' && junkyardTool != 'unknown') 
				{
					switch(junkyardTool) {
						case 'hammer': 
							var enemy = 'batwinged'; break;
						case 'screwdriver': 
							var enemy = 'vegetable'; break;
						case 'pliers': 
							var enemy = 'spider'; break;
						case 'wrench': 
							var enemy = 'erudite'; break;
					}
					var nudge = CE('center', 'style|color:red; font-size:80%; width: 100%', 'text|Current tool is the ' + junkyardTool + ', located near the ' + junkyardLocation + '.  Enemy: ' + enemy + ' gremlin.');
					document.body.insertBefore(nudge, document.body.firstChild);
				}
			break
			case 'farmer':
				//finish quest
				if (pageText.indexOf("Ach, the dooks are gone") != -1) 
				{			
					if (pageText.indexOf("to help feed") != -1)
						var farm = 'hippy';
					else if (pageText.indexOf("make better beer") != -1)
						var farm = 'fratboy';
					GM_setValue(charName + '.farmComplete', farm);
				}
			break
			case 'stand':
				//finish quest
				if (pageText.indexOf("The heart of the filthworm queen") != -1) 
					creditSubquest('orchardComplete');
			break
			case 'pyro':
				//finish quest
				if (pageText.indexOf("my bombs for you") != -1) 
					creditSubquest('lighthouseComplete');
			break
			//nuns quest is finished inside the combat function 
		}
	break
	case '/afterlife.php':
		resetConfig();
	break
	case '/fight.php':
		runFight();
	break
	case '/council.php':
		var charName = GM_getValue('CurrentCharName', null);
		var active = GM_getValue(charName + '.active', 'no');
		if (active == 'complete')
			return;
		var pageText = document.body.textContent;
		if (pageText.indexOf("decorated war hero.") != -1 || pageText.indexOf("Wossname") != -1) 
		{
			//finished quest
			resetConfig();
			active = 'complete';
		}
		else if (pageText.indexOf("hippies and frat boys") != -1) 
		{
			//received quest
			resetConfig();
			active = 'started';
		}
		else if (pageText.indexOf("Franz Ferdinand") != -1)
			//quest active
			active = 'started';
		else if (pageText.indexOf("Excellent") != -1) 
			//quest active
			active = 'started';
		else if (GM_getValue(charName + '.active') == 'started') 
			//No messages relating to the level 12 quest found.  Deactivating quest.
			active = 'complete';
		GM_setValue(charName + '.active', active);
	break
}

function resetConfig()
{
	//Resets configurations to beginning-of-quest values
	var charName = GM_getValue('CurrentCharName', null);
	const configs = {"active":"no", "deadHippies":0, "deadFratboys":0, "nunsMeat":0, "deltaFratboys":1, "deltaHippies":1, "arenaComplete":"no", "junkyardComplete":"no", "orchardComplete":"no", "lighthouseComplete":"no", "nunsComplete":"no", "farmComplete":"no", "junkyardTool":"unknown", "junkyardLocation":"unknown"};
	for (var c in configs)
	{
		GM_setValue(charName + '.' + c, configs[c]);
	}
}

function runFight()
{

	var charName = GM_getValue('CurrentCharName', null);
	if (GM_getValue(charName + '.active') != 'started')
		return;
	if ($('img[src $= "nun.gif"]'))
	{
		nunMeat();
		return;
	}
	var monname = $('#monname').textContent;
	if (monname.indexOf('gremlin') != -1)
	{
		gremlinTool();
		return;
	}
	var advAgain = $('a:contains("Adventure Again")');
	if (advAgain)
	{
		//monsters in the verge of war that should not be counted
		if (monname.match(/cadet|drill sergeant|Pledge|Spy/))
			return;
		//evaluate the monster name to make sure this is a relevant kill
		if (monname.match(/Bailey|Green Ops Soldier|Sweat Lodge|War Hippy|C\.A\.R\.N\.I\.V\.O\.R\.E\.|Glass of Orange Juice|Neil|Slow Talkin|Zim Merman/)) 
			var side = 'Hippies';
		else if (monname.match(/Beer Bongadier|Heavy Kegtank|Sorority|Panty Raider|War Frat|Brutus|Danglin|Monty|Next-generation/)) 
			var side = 'Fratboys';
		else 
			return;
		var pageText = document.body.textContent
		//don't count unless you win
		if (pageText.indexOf('You win the fight!') == -1)
			return;
		var delta = processKill(side);
		//update and store counter
		GM_setValue(charName + '.delta' + side, delta);
		var prevCount = GM_getValue(charName + '.dead' + side);
		var currentCount = Math.min(parseInt(prevCount) + parseInt(delta), 1000);
		GM_setValue(charName + '.dead' + side, currentCount);
		var counterMsg = currentCount + ' ' + side + ' down, ' + (1000 - currentCount) + ' to go (+' + delta + '). ';
		var turnsLeft = Math.ceil((1000 - currentCount) / delta);
		var turnsMsg = turnsLeft + ' turns left.';
		//Check for new unlocked areas
		var unlockMsg = '';
		if (side == 'Hippies') 
		{
			var msgColor = 'seagreen';
			if (turnsLeft == 0)
			{
				turnsMsg = "Dude! You spanked the whole Hippy Army!";
				counterMsg = '';
			}
			if (turnsLeft < 4) 
				turnsMsg += " Don't forget to cash in your nickels, bra.";
			if (currentCount >= 64 && prevCount < 64)
				unlockMsg = 'Orchard unlocked!';
			else if (currentCount >= 192 && prevCount < 192)
				unlockMsg = 'Nuns unlocked!';
			else if (currentCount >= 458 && prevCount < 458)	
				unlockMsg = 'Farm unlocked!';
		}
		else if (side == 'Fratboys') 
		{
			var msgColor = 'indianred';
			if (turnsLeft == 0)
			{
				turnsMsg = "Whoa! You totally smoked the Fratboy Army!";
				counterMsg = '';
			}
			if (turnsLeft < 4) 
				turnsMsg += " Don't forget to cash in your dimes, man.";
			if (currentCount >= 64 && prevCount < 64)
				unlockMsg = 'Lighthouse unlocked!';
			else if (currentCount >= 192 && prevCount < 192)
				unlockMsg = 'Junkyard unlocked!';
			else if (currentCount >= 458 && prevCount < 458)	
				unlockMsg = 'Arena unlocked!';
		}
		var center = CE("center", 'style|font-weight:bold; color:' + msgColor, 'text|' + counterMsg + turnsMsg);
		if (unlockMsg)
			center.appendChild(CE('div', 'text|' + unlockMsg));
		var placement = $('#content_') || $('center')
		placement.insertBefore(center, placement.firstChild);
		placement.appendChild(center.cloneNode(true));
	}

	function processKill(side)
	{
		//look for messages indicating extra dead fratboys or hippies
		var delta = GM_getValue(GM_getValue('CurrentCharName') + '.delta' + side, 1);
		//delta never goes down, so only search for messages from higher tiers
		//Array.some() method returns true if any pieces of text of a given tier are in the page text
		switch (delta)
		{
			case 1:
				if (['karmic retribution!', 'staring at his hands', 'Elsewhere', 'You see a Grill Sergeant', 'You see a Fire Spinner', 'Ultimate Frisbee', 'alcohol poisoning', 'entranced by the sun', 'redistributing his wealth', 'smash the can', 'crunch a bulb of garlic', 'M.C. Escher', 'loading his didgeridooka', 'big plate of brownies', 'violating his deeply held', 'garotting', 'over for a high-five', 'You glance out', 'turning himself into smoke and dust', 'by her own ferrets', 'bra... yeah', 'As the hippy falls'].some(search))
					return 2;
			case 2:
				if (['You hear chanting', 'a whirl of flame and pain', 'three ridiculously drunk', 'a stock market crash', 'Over the next hill', 'excited chittering', 'white-hot chicken wing sauce', 'As you finish', 'incense to burn', 'simultaneous paddling', 'Some mercenaries drive up', 'lob a sake bomb'].some(search))
					return 4;
			case 4:
				if (['nods almost imperceptibly', 'You leap out of the way', 'detonates a bomb underneath', 'giant purple squirrels', 'a complicated beer bong', 'out of their dreadlocks', 'gasping for air', 'You see a Grillmaster'].some(search))
					return 8;
			case 8:
				if (['complex hand gestures', 'You see a platoon', 'You look over and see a funk', 'Nearby, a platoon', 'A streaking', 'personal airship', 'POW of the frat', 'guess the outcome'].some(search))
					return 16;
			case 16:
				if (['fits of nauseated coughing', 'She told me she was 18, bra!', 'You see a regiment', 'Absolutely nothing!', 'glass sculpture', 'one more six-pack.'].some(search))
					return 32;
			case 32:
				if (['You see an airborne', 'public address system', 'storm clouds bubble and roil', 'filthy, filthy eyes', 'Not the wagons', 'and possibly both'].some(search))
					return 64;
                        default:
				return delta
			break
		}
	}
	
	function search(txt)
	{
		return (pageText.indexOf(txt) != -1);
	}
}

function nunMeat()
{
	//handle nun meat
	var charName = GM_getValue('CurrentCharName', null);
	var meatMsgs = $('img[src *= "meat.gif"]', true);
	//use the last meat gain message, in case of meat stealing familiars
	var amt = meatMsgs[meatMsgs.length - 1].parentNode.nextSibling.textContent.match(/(\d+) Meat/)[1];
	var newTotal = parseInt(GM_getValue(charName + '.nunsMeat')) + parseInt(amt);
	GM_setValue(charName + '.nunsMeat', newTotal);
	if (newTotal >= 100000 || document.body.textContent.indexOf('I think this is the last of it') != -1)
	{
		//finish quest
		GM_setValue(charName + '.nunsMeat', 0);
		var pageText = $('#fightform').nextSibling.nextSibling.textContent;
		if (pageText.indexOf('serve as a massage parlor') != -1)
			var nuns = 'fratboy';
		else if (pageText.indexOf('serve as a hospital') != -1)
			var nuns = 'hippy';
		GM_setValue(charName + '.nunsComplete', nuns)
		return
	}
	var color = getColor(newTotal);
	var div = $('img[src $= "nun.gif"]').parentNode.nextSibling.appendChild(CE('div', 'text|Meat collected for Nuns: '));
	var span = div.appendChild(CE('span', 'text|' + newTotal, 'style|font-weight:bold; color:' + color));
	span.addEventListener('dblclick', function() {
		var input = prompt('Change the current meat amount?', this.textContent);
		if (!isNaN(input))
		{
			GM_setValue(charName + '.nunsMeat', input);
			this.textContent = input;
			this.style.color = getColor(input);
		}
	}, false);
	return;
	
	function getColor(amt)
	{
		const colors = {75000:'green', 50000:'gold', 25000:'darkorange', 0:'red'};
		for (var n in colors)
		{
			if (amt >= n)
				return colors[n];
		}
	}	
}

function gremlinTool()	
{
	var pageText = $('#fightform').parentNode.textContent;
	if ($('a:contains("Adventure Again")')) 
	{
		if (pageText.match(/molybdenum (hammer|pliers|crescent wrench|screwdriver)/))
		{
			//if one of the above strings is found on end-of-combat, it means we grabbed a tool successfully
			var charName = GM_getValue('CurrentCharName', null);
			GM_setValue(charName + '.junkyardTool', 'unknown');
			GM_setValue(charName + '.junkyardLocation', 'unknown');
		}
		if (GM_getValue('wrongGremlin', false))
			//delete message for non-important gremlin
			GM_setValue('wrongGremlin', false)
		return
	}
	var gremlins = {182:['batwinged', 'bombing run', 'out a hammer'], 184:['erudite', 'automatic eyeball', 'crescent wrench'], 183:['spider', 'fibula with', 'pair of pliers'], 185:['vegetable', 'off of itself', 'out a screwdriver']};
	var monname = $('#monname');
	monname.parentNode.appendChild(CE('br'));
	var gremlinReadout = monname.parentNode.appendChild(CE('span', 'style|font-size:16pt; color:red'));
	var thisGremlin = gremlins[GM_getValue('junkyardZone', 0)] || null;
	if (!thisGremlin)
	{
		//fail if the script doesn't know what zone you're in
		gremlinReadout.textContent = "No idea where you are, try visiting Yossarian.";
		return;
	}
	//Look for the tool-related messages
	if (GM_getValue('wrongGremlin', false) || monname.textContent.indexOf(thisGremlin[0]) == -1 || pageText.indexOf(thisGremlin[1]) != -1)
	{	
		//set message for non-important gremlin (wrong gremlin for zone or non-tool-holder)
		gremlinReadout.textContent = "Not the gremlin you're looking for.";
		GM_setValue('wrongGremlin', true)
	}
	else if (pageText.indexOf(thisGremlin[2]) != -1)
		gremlinReadout.textContent = "Use the maaaaaagnet!";
	else
	{
		for (var n=0, dots='', turn=unsafeWindow.onturn;n<turn;n++)
			dots += '.';
		gremlinReadout.textContent = "Wait for it" + dots;
	}
}

function showKillCount()
{
	var charName = GM_getValue('CurrentCharName', null);
	if (GM_getValue(charName + '.active', 'no') != 'started')
		return;
	var HSubquests = 0; 
	var FSubquests = 0;
	var HDead = GM_getValue(charName + '.deadHippies');
	var FDead = GM_getValue(charName + '.deadFratboys');
	//count unlocked areas
	if (HDead >= 458)
		HSubquests = 3;
	else if (HDead >= 192)
		HSubquests = 2;
	else if (HDead >= 64)
		HSubquests = 1;
	if (FDead >= 458)
		FSubquests = 3;
	else if (FDead >= 192)
		FSubquests = 2;
	else if (FDead >= 64)
		FSubquests = 1;
	var HMessage = HDead + ' hippies killed, ' + (1000 - HDead) + ' to go. (' + HSubquests + ' areas unlocked.)';
	var FMessage = FDead + ' fratboys killed, ' + (1000 - FDead) + ' to go. (' + FSubquests + ' areas unlocked.)';
	var HSpan = CE('span', 'style|font-weight:bold; color:seagreen; position:relative; float:right; right:5%', 'text|' + HMessage);
	var FSpan = CE('span', 'style|font-weight:bold; color:indianred; position:relative; left:5%', 'text|' + FMessage);
	document.body.insertBefore(HSpan, document.body.firstChild);
	document.body.insertBefore(FSpan, document.body.firstChild);
}

function showSubquestCredit()
{
	var offsets = {"arenaComplete":[100, -356], "junkyardComplete":[165, -414], "orchardComplete":[247, -434], "lighthouseComplete":[190, -124], "nunsComplete":[370, -130], "farmComplete":[470, -221]};
	var startingOffset = getOffset($('[src $= "bigisland/left.gif"]'));
	var charName = GM_getValue('CurrentCharName', null);
	for (var q in offsets)
	{
		var questValue = GM_getValue(charName + '.' + q);
		if (questValue == 'hippy')
			var node = document.body.appendChild(CE('div', 'style|position:relative; width:0; line-height:0; font-family:serif; font-weight:bold; font-size:16pt; color:seagreen', 'text|H'));
		else if (questValue == 'fratboy')
			var node = document.body.appendChild(CE('div', 'style|position:relative; width:0; line-height:0; font-family:serif; font-weight:bold; font-size:16pt; color:indianred', 'text|F'));
		else
			continue;
		node.style.left = (startingOffset[0] + offsets[q][0]) + 'px';
		node.style.top = offsets[q][1] + 'px';
	}
	function getOffset(node)
	{
		var X = 0, Y = 0;
		while (node.offsetParent)
		{
			X += node.offsetLeft;
			Y += node.offsetTop;
			node = node.offsetParent;
		}
		return [X, Y];
	}
}

function creditSubquest(whichQuest)
{
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://' + window.location.host + '/api.php?what=status&for=Charon_the_Hand+Battlefield_Counter',
		onload: function(res)
		{
			var status = JSON.parse(res.responseText)
			var hat = status.equipment.hat == 2069 ? 'fratboy' : 'hippy'
			GM_setValue(charName + '.' + whichQuest, hat)
		}
	})
}

function catchJunkZone(e)
{
	if (e.target.parentNode && e.target.parentNode.href)
	{	
		var thisHref = e.target.parentNode.href.match(/snarfblat=(\d+)/) || [null,0];
		if (thisHref)
			GM_setValue('junkyardZone', thisHref[1]);
	}
}

function CE(tag/*,attributes*/)
{
	var node = document.createElement(tag);
	for (i=1,len=arguments.length;i<len;i++)
	{
		var attr = arguments[i].split('|');
		if (attr[0] == 'text')
			node.textContent = attr[1];
		else
			node.setAttribute(attr[0], attr[1]);
	}
	return node;
}

function $(selector, all, scope)
{
	scope = scope || document;
	if (selector.indexOf(':contains') != -1)
	{
		var test = selector.match(/([\.#\w]+):contains\(["'](.+)["']\)/);
		var res = scope.querySelectorAll(test[1])
		for (a in res) {
			if (res[a].textContent && res[a].textContent.indexOf(test[2]) != -1)
				return res[a]
		}
	}
	else if (all)
		return Array.prototype.slice.call(scope.querySelectorAll(selector));
	else
		return scope.querySelector(selector);
}
