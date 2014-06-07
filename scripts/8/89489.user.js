// ==UserScript==
// @name           Familiar drop tracker
// @namespace      KoLCtH
// @include        *kingdomofloathing.com/game.php
// @include        *kingdomofloathing.com/charpane.php*
// @include        *kingdomofloathing.com/fight.php*
// @include        *kingdomofloathing.com/valhalla.php*
// @include        *127.0.0.1*/game.php
// @include        *127.0.0.1*/charpane.php*
// @include        *127.0.0.1*/fight.php*
// @include        *127.0.0.1*/valhalla.php*
// @description	   Tracks items dropped by badger, green pixie, llama, sandworm, and rogue program, as well as hipster fights.
// Copyright (c) 2010, Charon the Hand
// Great thanks to OneTonTomato for the GM_get() function and a lot of awesome scripts to model
// ==/UserScript==

var famNames = {
	//gif name:[fam name, item drop, actual drop text, actual fam name on familiar.php]
	'badger':['.badger','_shrooms', 'astral mushroom', 'Astral Badger'], 
	'pictsie':['.pixie','_absinthes','tiny bottle of absinthe', 'Green Pixie'], 
	'llama':['.llama', '_gongs', 'llama lama gong', 'Llama Lama'], 
	'babyworm':['.sandworm', '_aguas', 'agua de vida', 'Baby Sandworm'], 
	'tronguy':['.program', '_tokens', 'Game Grid token', 'Rogue Program'], 
	'organgoblin':['.grinder', '_pies', 'organ grinder pie', 'Knob Goblin Organ Grinder'], 
	'minihipster':['.hipster', '_fights', 'hipster fight', 'Mini-Hipster']
}

switch(window.location.pathname)
{
	case '/game.php':
		GM_deleteValue('CurrentCharName')
	break
	case '/charpane.php':
		var charName = GM_getValue('CurrentCharName', null)
		if (!charName)
		{
			//first run in session, get name
			charNameNode = document.querySelector('b')
			if (charNameNode)
			{
				charName = charNameNode.textContent;
				GM_setValue('CurrentCharName',charName);
			}
			else return
			//find available familiars
			GM_get('/familiar.php', parseFamiliars)
			//reset drops if it is after rollover
			if (GM_getValue(charName + '.rollover', 0) < unsafeWindow.rollover)
			{
				GM_setValue(charName + '.rollover', unsafeWindow.rollover)
				for (name in famNames)
				{
					GM_deleteValue(charName + famNames[name][0] + famNames[name][1])
				}
			}
		}
		buildFamiliarReadout()
	break
	case '/fight.php':
		//only count when the fight ends, to avoid multiple counts
		if ($('a:contains("Adventure Again")') || ($('#monname').textContent == ' Ed the Undying'))
		{
			var charName = GM_getValue('CurrentCharName')
			var currentFam = GM_getValue(charName + '.currentFam', '')
			if (currentFam == 'minihipster')
				lookForFight()
			else if (currentFam in famNames)
			//don't look for a drop unless one of the target familiars is equipped
				lookForDrop(currentFam)
		}
	break
	case '/valhalla.php':
		var charName = GM_getValue('CurrentCharName')
		for (n in famNames)
		{
			GM_deleteValue(charName + famNames[n][0])
			GM_deleteValue(charName + famNames[n][0] + famNames[n][1])
		}		
		GM_deleteValue('CurrentCharName')
	break
}

function buildFamiliarReadout()
{
	var familiar = document.querySelector('.familiarpick')
	if (!familiar)
		return false
	GM_setValue(charName + '.currentFam', familiar.firstChild.src.match(/(\w+)\.gif/)[1] || '')
	familiar = familiar.parentNode
	if (familiar.tagName.toLowerCase() == 'center')
		var compactMode = familiar
	else if (familiar.tagName.toLowerCase() == 'td')
		var fullMode = familiar.parentNode
	if (!fullMode && !compactMode)
		return
	var famDrops = {}
	for (name in famNames)
	{
		//if you have the familiar, find the number of drops
		if (GM_getValue(charName + famNames[name][0], false))
			famDrops[famNames[name][2]] = GM_getValue(charName + famNames[name][0] + famNames[name][1], 0)
	}
	for (fam in famDrops)
	{
		if (famDrops[fam] == 0)
			continue
		var td = CE('tr').appendChild(CE('td','align|center', 'colspan|2'))
		td.textContent = (fam == 'tiny bottle of absinthe') ? 'Absinthe Bottles: ' : capitalize(fam) + 's: '
td.appendChild(CE('span', 'style|font-weight:bold;', 'text|' + famDrops[fam]))
		if (compactMode)
		{
			//compact mode gets a new table
			var table = $('#famDrops') || compactMode.appendChild(CE('table', 'id|famDrops'))
			table.appendChild(td.parentNode)
		}
		else if (fullMode)
		{	
			//full mode gets a row in the table
			fullMode.parentNode.parentNode.removeAttribute('width')
			fullMode.parentNode.appendChild(td.parentNode)
		}
	}
}

function lookForDrop(currentFam)
{
	var famListing = famNames[currentFam]
	$('.effect', true).forEach(function(item)
	{
		//mr script restates stolen items at the end of combat, don't double count
		if (item.textContent.indexOf('yoinked') != -1)
			return
		//special case for the stupid organ pies
		if (currentFam == 'organgoblin')
		{
			if (item.textContent.match(/((organ|let|lights|igloo|fish|badass) pie|turnover)/))
				GM_setValue(charName + '.grinder_pies', GM_getValue(charName + '.grinder_pies', 0) + 1)
			return		
		}
		if (item.textContent.indexOf(famListing[2]) != -1)
		{
			var thisItem = famListing[0] + famListing[1]
			GM_setValue(charName + thisItem, GM_getValue(charName + thisItem, 0) + 1)
			return
		}
	})
}

function lookForFight()
{
	//hipster fights have a black box unlike anything else
	if ($('[bgcolor="black"]'))
		GM_setValue(charName + '.hipster_fights', GM_getValue(charName + '.hipster_fights', 0) + 1)
}

function parseFamiliars(text)
{
	//callback to parse familiar.php for available fams
	for (name in famNames)
	{
		var state = text.indexOf('-pound ' + famNames[name][3]) != -1 ? true : false
		GM_setValue(charName + famNames[name][0], state)
	}
}
function CE(tag/*,attributes*/)
{
	var node = document.createElement(tag)
	for (i=1,len=arguments.length;i<len;i++)
	{
		var attr = arguments[i].split('|')
		if (attr[0] == 'text')
			node.textContent = attr[1]
		else
			node.setAttribute(attr[0], attr[1])
	}
	return node
}

function $(selector, all, scope)
{
	scope = scope || document
	if (selector.indexOf(':contains') != -1)
	{
		var test = selector.match(/([\.#\w]+):contains\(["'](.+)["']\)/)
		//return [0]th member of the array (there should only be one member anyway)
		return Array.prototype.slice.call(scope.querySelectorAll(test[1])).filter(function(v)
		{
			return v.textContent.indexOf(test[2]) != -1
		})[0]
	}
	if (all)
		return Array.prototype.slice.call(scope.querySelectorAll(selector))
	else
		return scope.querySelector(selector)
}

function GM_get(target, callback) {
   GM_xmlhttpRequest({
	  method: 'GET',
	  url: 'http://' + location.host + target,
	  onload: function(details) {
		 if (typeof callback=='function'){
			callback(details.responseText);
		 }
	  }
   });
}
function capitalize(text)
{
	return text.replace(/\b([a-z])/g, function(l)
	{
		return l.toUpperCase()
	})
}
