// ==UserScript==
// @name           Orderly Weaponry
// @namespace      KoLCtH
// @include        *kingdomofloathing.com/inventory.php*
// @include        *127.0.0.1*/inventory.php*
// ==/UserScript==
if (!$('#weapons'))
	return
var weaponDB = JSON.parse('{"1":"club", "4":"totem", "5":"utensil", "7":"saucepan", "19":"knife", "21":"sword", "32":"club", "35":"sword", "36":"utensil", "57":"saucepan", "60":"mace", "68":"utensil", "71":"spear", "77":"staff", "93":"sword", "103":"staff", "108":"staff", "110":"staff", "113":"sword", "114":"staff", "116":"sword", "117":"spear", "123":"club", "127":"spear", "129":"flail", "147":"sword", "148":"staff", "163":"club", "227":"sword", "228":"staff", "235":"sword", "241":"club", "269":"sword", "292":"axe", "310":"polearm", "334":"knife", "351":"sword", "354":"flail", "362":"axe", "378":"sword", "379":"staff", "381":"sword", "382":"staff", "384":"sword", "385":"staff", "414":"staff", "435":"sword", "472":"club", "473":"club", "494":"knife", "499":"axe", "555":"axe", "586":"sword", "596":"umbrella", "600":"knife", "619":"spear", "626":"wand", "634":"whip", "635":"umbrella", "648":"sword", "657":"sword", "659":"staff", "668":"club", "671":"polearm", "690":"sword", "726":"knife", "768":"utensil", "773":"utensil", "776":"club", "777":"utensil", "833":"sword", "840":"club", "870":"club", "875":"sword", "885":"axe", "892":"sword", "920":"sword", "938":"sword", "943":"staff", "1029":"whip", "1030":"whip", "1031":"whip", "1032":"whip", "1045":"utensil", "1123":"polearm", "1127":"sword", "1132":"sword", "1137":"flail", "1151":"staff", "1157":"polearm", "1224":"club", "1230":"club", "1246":"staff", "1303":"utensil", "1325":"sword", "1396":"flail", "1409":"club", "1424":"knife", "1465":"sword", "1466":"sword", "1467":"staff", "1468":"sword", "1469":"polearm", "1490":"utensil", "1492":"polearm", "1493":"sword", "1502":"club", "1528":"utensil", "1533":"sword", "1541":"polearm", "1669":"knife", "1673":"polearm", "1679":"sword", "1680":"staff", "1681":"sword", "1682":"staff", "1684":"sword", "1685":"staff", "1706":"sword", "1707":"staff", "1709":"sword", "1710":"flail", "1712":"sword", "1713":"staff", "1715":"sword", "1716":"staff", "1718":"sword", "1719":"polearm", "1721":"sword", "1722":"staff", "1728":"sword", "1729":"staff", "1731":"sword", "1732":"staff", "1734":"sword", "1735":"meat", "1737":"sword", "1738":"staff", "1740":"sword", "1741":"staff", "1743":"sword", "1744":"staff", "1746":"sword", "1747":"staff", "1750":"utensil", "1751":"utensil", "1752":"utensil", "1753":"utensil", "1754":"utensil", "1755":"utensil", "1756":"utensil", "1757":"utensil", "1758":"utensil", "1771":"utensil", "1772":"utensil", "1773":"utensil", "1775":"whip", "1779":"sword", "1780":"staff", "1782":"staff", "1793":"staff", "1910":"sword", "1911":"staff", "1921":"sword", "1931":"polearm", "1933":"spear", "1934":"sword", "1936":"sword", "1938":"sword", "1972":"utensil", "2060":"sword", "2071":"club", "2077":"flail", "2136":"flail", "2178":"knife", "2219":"sword", "2241":"spear", "2244":"spear", "2285":"knife", "2336":"club", "2387":"club", "2388":"utensil", "2451":"umbrella", "2455":"whip", "2457":"whip", "2478":"whip", "2482":"whip", "2558":"flail", "2559":"club", "2560":"saucepan", "2561":"utensil", "2577":"spear", "2578":"chefstaff", "2580":"whip", "2601":"chefstaff", "2602":"chefstaff", "2607":"whip", "2623":"whip", "2625":"whip", "2629":"whip", "2642":"club", "2656":"sword", "2688":"whip", "2690":"club", "2692":"flail", "2701":"sword", "2722":"chefstaff", "2723":"chefstaff", "2740":"chefstaff", "2749":"chefstaff", "2814":"club", "2826":"chefstaff", "2839":"artsything", "2971":"club", "2977":"sword", "2998":"sword", "3004":"sword", "3051":"sword", "3085":"flail", "3104":"knife", "3105":"club", "3132":"polearm", "3133":"polearm", "3134":"polearm", "3135":"polearm", "3136":"polearm", "3138":"club", "3163":"spear", "3172":"umbrella", "3197":"crop", "3205":"axe", "3222":"umbrella", "3253":"club", "3285":"knife", "3380":"polearm", "3386":"sword", "3389":"staff", "3390":"chefstaff", "3435":"staff", "3436":"chefstaff", "3437":"chefstaff", "3438":"chefstaff", "3441":"club", "3456":"club", "3466":"sword", "3492":"sword", "3493":"staff", "3508":"sword", "3542":"club", "3552":"knife", "3591":"spear", "3624":"club", "3644":"club", "3647":"knife", "3666":"chefstaff", "3695":"axe", "3705":"sword", "3709":"club", "3710":"utensil", "3714":"staff", "3717":"club", "3818":"fish", "3881":"whip", "3931":"club", "3933":"club", "3938":"club", "3939":"club", "3940":"club", "3941":"club", "3942":"club", "3943":"club", "3956":"sword", "3966":"club", "3967":"club", "3968":"club", "3972":"club", "3974":"club", "4004":"flail", "4020":"club", "4021":"polearm", "4028":"club", "4047":"whip", "4055":"spear", "4058":"club", "4066":"rod", "4075":"polearm", "4082":"club", "4086":"axe", "4120":"club", "4165":"chefstaff", "4179":"club", "4180":"knife", "4206":"knife", "4213":"knife", "4219":"club", "4244":"club", "4263":"axe", "4276":"club", "4277":"staff", "4317":"flail", "4332":"knuckles", "4376":"club", "4378":"club", "4379":"knife", "4381":"whip", "4399":"sword", "4403":"chefstaff", "4419":"whip", "4441":"club", "4452":"sword", "4453":"sword", "4473":"club", "4520":"club", "4527":"spear", "4572":"spade", "4580":"umbrella", "4589":"whip", "4590":"whip", "4591":"whip", "4631":"club", "4654":"utensil", "4684":"club", "4702":"polearm", "4737":"polearm", "4749":"boomerang", "4750":"bow", "4751":"knife", "4752":"club", "4768":"chefstaff", "4841":"polearm"}')

var table = $('#weapons')
var div = table.parentNode.appendChild(CE('div','align|center'))
var sortType = ['type', 'power', 'hands']
for (n=0;n<3;n++)
{
	var b = div.appendChild(CE('input', 'type|button', 'class|button', 'value|Sort by '+sortType[n]))
	b.addEventListener('click', function () {sortWeapons(this.value.substr(8))}, false)
	div.appendChild(document.createTextNode(' '))
}

var prevMethod = ''
var nodes = $('.i', true, table)
var len = nodes.length
$('a[href *= "inv_equip"], s', true, table).forEach(function (w, index)
{
	//items you can't equip have a strikeout tag, not anchor. they are one layer deeper too
	if (w.tagName.toUpperCase() == 'S')
		w = w.parentNode
	var itemNum = w.parentNode.parentNode.id.match(/\d+/)
	var type = weaponDB[itemNum] || 'unknown'
	w.parentNode.lastChild.textContent = w.parentNode.lastChild.textContent.split(')')[0] + ' ' + type + ')'
	var info = w.parentNode.lastChild.textContent.match(/(\d+),\s(\dh)/)
	if (!info)
		return
	nodes[index].setAttribute('type', type)
	nodes[index].setAttribute('power', info[1])
	nodes[index].setAttribute('hands', info[2])
})

function sortWeapons(method)
{
	nodes.sort(function(a,b)
	{
		if (method == 'power')
			return (a.getAttribute(method) - b.getAttribute(method))
		return a.getAttribute(method) + a.getAttribute(prevMethod) > b.getAttribute(method) + a.getAttribute(prevMethod)
	})
	prevMethod = method
	for (i=0;i<len;i++)
	{
		thisRow = table.firstChild.childNodes[Math.floor(i/3)]
		thisRow.appendChild(nodes[i])
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
	if (all)
		return Array.prototype.slice.call(scope.querySelectorAll(selector))
	else
		return scope.querySelector(selector)
}
