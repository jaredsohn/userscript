// ==UserScript==
// @name           Sugar re-equip
// @namespace      KoLCtH
// @include        *kingdomofloathing.com/fight.php*
// @include        *127.0.0.1:*/fight.php*
// ==/UserScript==

$('.effect',true).forEach(function(eff)
{
	if (eff.textContent.indexOf('sugar shards') != -1)
	{
		var center = eff.parentNode.parentNode.parentNode.parentNode
		var item = center.previousSibling.textContent.match(/sugar\s(\w+)/)
		if (!item[1])
			return
		var itemNums = {shirt:4192, shotgun:4178, shillelagh:4179, shank:4180, chapeau:4181, shorts:4182, shield:4183}
		var linkHolder = center.appendChild(CE('span', 'id|sugarLinks'))
		var foldLink = linkHolder.appendChild(CE('a', 'text|[Fold a new ' + item[1] + ']', 'href|sugarsheets.php?pwd=' + pwd + '&action=fold&ajax=1&whichitem=' + itemNums[item[1]]))
		linkHolder.appendChild(document.createTextNode(' '))
		var equipLink = linkHolder.appendChild(CE('a', 'text|[Equip a new ' + item[1] + ']', 'href|inv_equip.php?pwd=' + pwd + '&action=equip&ajax=1&whichitem=' + itemNums[item[1]]))
	}
})

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
		return Array.slice.call(scope.querySelectorAll(selector))
	else
		return scope.querySelector(selector)
}