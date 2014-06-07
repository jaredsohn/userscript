// ==UserScript==
// @name           autosell from mall
// @namespace      KoLCtH
// @include        *kingdomofloathing.com/manageprices.php*
// @include        *kingdomofloathing.com/managestore.php*
// ==/UserScript==

var scope = $('center>div') || $('form')
var rows = $('tr', true, scope)
rows.forEach(function (r)
{
	if (r.textContent.match(/Item/))
		return false
	var linkHolder = r.appendChild(CE('td'))
	var sellLink = linkHolder.appendChild(CE('a', 'text| autosell all ', 'style|font-size|11pt', 'href|#'))
	var checkbox = linkHolder.appendChild(CE('input', 'type|checkbox'))
	sellLink.addEventListener('click', function () {autosellThis(this.parentNode.parentNode)}, false)
})

function autosellThis(itemRow)
{
	var itemNum = itemRow.childNodes[4].innerHTML.match(/(price|=)(\d+)/)[2]
	if (!itemNum)
		return
	var itemQuant = itemRow.childNodes[1].textContent.match(/(\d+)?\)?$/)
	itemQuant = itemQuant ? itemQuant[1] : 1
	if (itemRow.lastChild.lastChild.checked)
	{
		GM_xmlhttpRequest({
			method: "GET",
			url: 'http://' + window.location.host + '/managestore.php?action=takeall&whichitem=' + itemNum,
			onload: function (res)
			{
				GM_xmlhttpRequest({
					method: "GET",
					url: 'http://' + window.location.host + '/sellstuff.php?action=sell&ajax=1&type=quant&whichitem=' + itemNum + '&howmany=' + itemQuant + '&pwd=' + document.forms[0].childNodes[1].value,
					onload: function (res2)
					{
						window.location.reload(true)
					}
				})
			},
		}); 
	}
	else
		alert('You have to check the box if you want to autosell these things')
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
