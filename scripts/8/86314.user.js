// ==UserScript==
// @name           CAB Macro bar
// @namespace      KoLCtH
// @include        *kingdomofloathing.com/fight.php*
// @include        *127.0.0.1*/fight.php*
// ==/UserScript==

GM_addStyle('#macromenu A IMG {float:left} #macromenu A SPAN {display:block}')
setTimeout(cooptMacro, 0)

function cooptMacro()
{
	var macroButton = $('body').appendChild(CE('div', 'id|macroButton', 'style|position:absolute; top:13px; text-align:center'))
	macroButton.appendChild(CE('img','id|macros','src|http://images.kingdomofloathing.com/itemimages/assembly2.gif', 'style|border: black outset 3px; cursor:pointer'))
	macroButton.appendChild(CE('br'))
	macroButton.appendChild(CE('span','text|macros', 'style|font-size:7pt'))
	document.addEventListener('click', toggleMacroMenu, false)
	var macroMenu = $('body').appendChild(CE('div', 'id|macromenu', 'class|contextmenu', 'style|width:175px; top:51px; display:none'))
	macroButton.style.left = macroMenu.style.left = $('.actionbar').offsetLeft - 36
	var macros = document.querySelectorAll('[_type=macro]')
	for (var i=0;i<macros.length;i++)
	{
		macroMenu.appendChild(macros[i])
	}
}

function toggleMacroMenu(e)
{
	var menu = $('#macromenu')
	var button = $('#macros')
	if (e.target != button|| menu.style.display == 'block')
	{
		menu.style.display = 'none'
		button.style.border = 'outset'
	}
	else
	{
		button.style.border = 'inset'
		menu.style.display = 'block'
	}
}

function CE(tag/*,attributes*/)
{
	var node = document.createElement(tag)
	for (var i=1,len=arguments.length;i<len;i++)
	{
		var attr = arguments[i].split('|')
		if (attr[0] == 'text')
			node.textContent = attr[1]
		else
			node.setAttribute(attr[0], attr[1])
	}
	return node
}

function $(selector)
{
	return document.querySelector(selector)
}