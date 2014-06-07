// ==UserScript==
// @name           Bang Identifier
// @namespace      KoLCtH
// @include        *kingdomofloathing.com/game.php*
// @include        *kingdomofloathing.com/charsheet.php*
// @include        *kingdomofloathing.com/fight.php*
// @include        *kingdomofloathing.com/inventory.php*
// @include        *kingdomofloathing.com/afterlife.php*
// @include        *127.0.0.1:*/game.php*
// @include        *127.0.0.1:*/charsheet.php*
// @include        *127.0.0.1:*/fight.php*
// @include        *127.0.0.1:*/inventory.php*
// @include        *127.0.0.1:*/afterlife.php*
// ==/UserScript==

switch(window.location.pathname)
{
	case '/game.php':
		GM_deleteValue("CurrentCharName");
	break
	case '/inventory.php':
		if (!$('table#potions'))
			return
		document.addEventListener('click', function (e)
		{
			//place event listener to break the link and get the results page directly so we can parse it
			if (e.target.tagName.toLowerCase() != 'a')
				return
			var itemNum = e.target.href.match(/\d+$/)
			if (!itemNum || itemNum < 818 || itemNum > 828)
				return
			e.preventDefault();
			e.stopPropagation();
			unsafeWindow.loadingDiv();
			var URL = e.target.href.replace('which=3', 'ajax=1')
			GM_xmlhttpRequest({
				method: 'GET',
				url: URL,
				onload: function (res)
				{
					stealThisBang(res.responseText, e.target, true)
				}
			});
		}, true);
		$('td[id]', true).forEach(function (td)
		{
			var itemNum = parseInt(td.id.substr(1))
			if (itemNum > 818 && itemNum < 828)
			{
				td.appendChild(CE("br"))
				//get bang effects from scriptval or place listener to catch them
				var effect = identifyBang(itemNum)
				var newNode = td.appendChild(CE("strong", 'style|color:blue', 'text|' + effect))
			}
		})
	break
	case '/fight.php':
		var bangUsed = $('img[src *= "exclam.gif"]')
		if (bangUsed)
			stealThisBang(null, bangUsed)
	break
	case "/charsheet.php":
		var charName = $('center>b>a').textContent
		GM_setValue('CurrentCharName', charName)
		var bangNames = ["milky", "swirly", "bubbly", "smoky", "cloudy", "effervescent", "fizzy", "dark", "murky"];
		var knownBangs = GM_getValue(charName + '.bangs', '0|0|0|0|0|0|0|0|0').split('|')
		var insertPoint = $('p:contains("Current Familiar:")').parentNode
		var p = insertPoint.appendChild(CE('p'))
		p.appendChild(CE('b', 'text|Bang Potions:'))
		p.appendChild(CE('br'))
		var table = p.appendChild(CE('table', 'width|60%'))
		table.appendChild(CE('td', 'height|1', 'colspan|2', 'bgcolor|black'))
		for (var n=0;n<9;n++)
		{
			var tr = table.appendChild(CE('tr'))
			if (n & 1)
				tr.style.backgroundColor = '#ddd'
			var td1 = tr.appendChild(CE('td', 'align|left', 'text|' + bangNames[n] + ' potion:'))
			var bangEff = (knownBangs[n] == '0') ? 'unknown' : knownBangs[n]
			var td2 = tr.appendChild(CE('td', 'align|right', 'text|' + bangEff))
		}
		table.appendChild(CE('td', 'height|1', 'colspan|2', 'bgcolor|black'))
	break
	case '/afterlife.php':
		GM_deleteValue(getCharName() + '.bangs')
	break
}

function identifyBang(itemNum)
{
	var charName = getCharName()
  	var whichBang = itemNum - 819;
  	var knownBangs = GM_getValue(charName + '.bangs', "0|0|0|0|0|0|0|0|0").split("|");
	if (knownBangs[whichBang] != 0)
		return knownBangs[whichBang];
	else
		return 'unknown';
}	

function stealThisBang(txt, tgt, fromInv)
{
	var charName = getCharName()
	txt = txt || tgt.parentNode.nextSibling.textContent
	var bangEffects = {
	0:['Confused', 'looks confused', '-30% Mys (20 Adv)'], 
	1:['liquid fire', 'like a wino', 'Gain 1-3 Drunk'], 
	2:['hit points', 'feels better', 'Gain 14-16 HP/MP'], 
	3:["Izchak's Blessing", 'more stylish', '+25% Mox (10 Adv)'], 
	4:['Strength of Ten Ettins', 'much stronger', '+25% Mus (10 Adv)'], 
	5:['Strange Mental Acuity', 'much smarter', '+25% Mys (10 Adv)'], 
	6:['Object Detection', 'blink', '+12.5% Item Drops (10 Adv)'], 
	7:['Sleepy', 'yawns', '-30% Mus (20 Adv)'], 
	8:['Teleportitis', 'starts disappearing', 'Teleportitis (10 Adv)']
	}
	var knownBangs = GM_getValue(charName + '.bangs', '0|0|0|0|0|0|0|0|0').split('|');
	if (fromInv)
	//intercepts bang use from inventory
	{
		for (var n=0;n<9;n++)
		{
			if (txt.indexOf(bangEffects[n][0]) != -1)
			{
				var thisBangEffect = bangEffects[n][2]
				break
			}
		}
		var thisBangNum = tgt.href.match(/(\d+)$/)[1] - 819
		//replace 'unknown' with correct effect
		tgt.parentNode.nextSibling.nextSibling.textContent = knownBangs[thisBangNum] = thisBangEffect;
		var frag = CE('div')
		frag.innerHTML = txt
		$('#effdiv').replaceChild($('center', false, frag), $('#effdiv').firstChild)
		unsafeWindow.top.charpane.location.href = "charpane.php"
		unsafeWindow.updateInv({itemNum:-1})
	}
	else
	//detects bang use in combat
	{
		var bangNames = ["milky", "swirly", "bubbly", "smoky", "cloudy", "effervescent", "fizzy", "dark", "murky"];
		for (var n=0;n<9;n++)
		{
			if (!thisBangNum)
			{
				if (txt.indexOf(bangNames[n]+' potion') != -1)
					var thisBangNum = n
			}
			if (!thisBangEffect)
			{
				if (txt.indexOf(bangEffects[n][1]) != -1)
					var thisBangEffect = bangEffects[n][2]
			}
		}
		knownBangs[thisBangNum] = thisBangEffect
	}
	GM_setValue(charName + '.bangs', knownBangs.join('|'));
}

function getCharName()
{
	//can get charName from any other frame and save it to GM val for next time
	if (GM_getValue('CurrentCharName', null))
		return GM_getValue('CurrentCharName')
	if (!window.top || !window.top.frames[1])
		return false
	var charName = window.top.frames[1].document.querySelector('b')
	if (charName)
		charName = charName.textContent
	else 
		return false
	GM_setValue('CurrentCharName', charName)
	return charName
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
		var test = selector.match(/([^:]+):contains\(["'](.+)["']\)/)
		var res = scope.querySelectorAll(test[1])
		for (a in res) {
			if (res[a].textContent && res[a].textContent.indexOf(test[2]) != -1)
				return res[a]
		}
	}
	else if (all)
		return Array.slice.call(scope.querySelectorAll(selector))
	else
		return scope.querySelector(selector)
}
