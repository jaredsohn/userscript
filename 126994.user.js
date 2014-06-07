// ==UserScript==
// @name           Clancy's instruments
// @namespace      KoLCtH
// @include        http://www.kingdomofloathing.com/charpane.php*
// @include        http://127.0.0.1*/charpane.php*
// ==/UserScript==

var clancy = document.querySelector('[src *= clancy]')
if (clancy)
	clancy.addEventListener('contextmenu', showInstruments, false)
	
function showInstruments(e)
{
	e.preventDefault()
	var inst = document.querySelector('#instruments')
	if (inst)
	{
		var disp = inst.style.display
		inst.style.display = disp == 'none' ? 'block' : 'none'
		return
	}
	clancy.parentNode.style.position = 'relative'
	var div = CE('div', 'id|instruments', 'style|position:absolute; width:96px; left:-30px; top:100px; border:1px solid blue; background:white;')
	div.appendChild(CE('img', 'src|http://images.kingdomofloathing.com/itemimages/clancy_sackbut.gif', 'style|border:blue 1px solid', 'id|5547', 'title|sackbut : healing'))
	div.appendChild(CE('img', 'src|http://images.kingdomofloathing.com/itemimages/clancy_crumhorn.gif', 'style|border:blue 1px solid', 'id|5549', 'title|crumhorn : stats'))
	div.appendChild(CE('img', 'src|http://images.kingdomofloathing.com/itemimages/clancy_lute.gif', 'style|border:blue 1px solid', 'id|5551', 'title|lute : items'))
	div.addEventListener('click', chooseInstrument, false)
	clancy.parentNode.insertBefore(div, clancy.nextSibling)
	
	function chooseInstrument(e)
	{
		e.target.parentNode.style.display = 'none'
		unsafeWindow.dojax('inv_use.php?ajax=1&pwd=' + unsafeWindow.pwdhash + '&whichitem=' + e.target.id);
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