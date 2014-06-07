// ==UserScript==
// @name           mushroom planter
// @namespace      KoLCtH
// @include        *kingdomofloathing.com/knoll_mushrooms.php*
// @include        *127.0.0.1*/knoll_mushrooms.php*
// ==/UserScript==

var select = $('select')
select.nextSibling.nextSibling.style.display = select.style.display = 'none'
var mushroomChoice = window.top.wrappedJSObject.mushroomChoice || null
for (var m=0;m<3;m++)
{
	var radio = select.parentNode.appendChild(CE('input', 'type|radio', 'name|choice', 'value|' + m))
	if (m == mushroomChoice)
		radio.checked = true
	select.parentNode.appendChild(CE('span', 'text|Plant a ' + select.options[m].text, 'style|line-height:1.5em'))
	select.parentNode.appendChild(CE('br'))
}
$('#buyspores').style.display = 'block'
$('center>p>table').addEventListener('click', plantSpore, false)

function plantSpore(e)
{
	var whichRadio = $('input:checked')
	if (e.target.title.indexOf('empty dirt') == -1 || !whichRadio)
		return
	e.preventDefault()
	window.top.wrappedJSObject.mushroomChoice = select.selectedIndex = whichRadio.value
	document.forms.namedItem('buyspores').submit()
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
