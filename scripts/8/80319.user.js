// ==UserScript==
// @name           hatter buffer
// @namespace      KolCtH
// @include        *kingdomofloathing.com/inventory.php*
// @include        *127.0.0.1:*/inventory.php*
// ==/UserScript==
var hats = $('#hats')
if (!hats)
	return
var div = hats.parentNode.appendChild(CE('div', 'align|center'))
var button = div.appendChild(CE('input', 'type|button', 'class|button', 'value|Show Mad Hatter Tea Party hat buffs'))
button.addEventListener('click', showBuffs, false)

function showBuffs()
{
	var thisDiv = $('#ReportDivHats')
	if (thisDiv)
	{
		thisDiv.style.display = 'block'
		return
	}
	const hatDB = {
		4:"Monster Level +20", 6:"Familiar Experience +3", 7:"Moxie +10", 8:"Muscle +10", 
		9:"Weapon Damage +15", 10:"Mysticality +10", 11:"Spell Damage +30%", 12:"Maximum HP +50", 
		13:"Maximum MP +25", 14:"Sleaze Damage +10", 15:"Spell Damage +15", 16:"Cold Damage +10", 
		17:"Spooky Damage +10", 18:"Stench Damage +10", 19:"Hot Damage +10", 20:"Weapon Damage +30%", 
		21:"Regenerate 5-10 MP per Adventure", 22:"+40% Meat from Monsters", 23:"Mysticality +20%", 
		24:"+5 to Familiar Weight", 25:"+3 Stat Gains from Fights", 26:"Moxie +20%", 27:"Muscle +20%", 
		28:"+20% Items from Monsters", 29:"Regenerate 10-20 HP per Adventure", 30:"Combat Initiative +40%"
	}
	var report = ''
	GM_addStyle('center>span:nth-of-type(even) {color:blue;} center>span:nth-of-type(odd) {color:green;} center>span {font-weight:bold;} #reportDivHats center {line-height: 1.4em;}')
	var hatList = $('b.ircm', true, hats)
	hatList.unshift($('#curequip').firstChild.firstChild.childNodes[2].firstChild)
	hatList.forEach(function (h, i)
	{
		report += "<span>" + hatDB[h.firstChild.textContent.replace(/[\s]/g, '').length] + "</span> from <span>" + h.firstChild.textContent + ((i == 0) ? " (equipped)" : "") + "</span><br>"
	})
	displayReport(report, 'Mad Hatter Tea Party Buffs', 'Hats')
	$('#reportDivHats').setAttribute('style', 'position:absolute; top:650px; width:40%; left:30%')
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

function $(selector, all, scope)
{
	scope = scope || document
	if (all)
		return Array.prototype.slice.call(scope.querySelectorAll(selector))
	else
		return scope.querySelector(selector)
}

function displayReport(contents, title, type, fade, reload, pos)
{
	//feedback window for user, shows errors, results
	var thisDiv = $('#reportDiv'+ type)
	if (thisDiv)
	{
		if (contents)
			thisDiv.childNodes[2].innerHTML = contents
		if (title != '')
			thisDiv.childNodes[0].textContent = title
		thisDiv.style.display = 'block'
	}
	else
	{
		var style = '.reportDiv {position:absolute; background-color:white; width:70%; top:50px; left:15%; border:blue solid 2px; outline:black 1px solid; text-align:center; z-index:100} \
		.reportHeading {font-weight:bold; color:white; background-color:blue;} \
		.closeButton {position:absolute; top:-1px; right:-1px; cursor:default; font-size:28pt; font-weight:bold; padding-top:1px; line-height:.4; height:.45em; width:.6em; background-color:white; border:black 1px solid; overflow:hidden} \
		div.closeButton:hover {background-color:red; border-color:white}'
		GM_addStyle(style)
		var div = document.body.appendChild(CE('div', 'id|reportDiv' + type, 'class|reportDiv ' + type))
		if (pos)
			div.style.position = pos
		div.appendChild(CE('div', 'class|reportHeading', 'text|' + (title || 'Results:')))
		var buttonClose = div.appendChild(CE('div', 'class|closeButton','text|×'));//alt-0215
		buttonClose.addEventListener('click', function () {this.parentNode.style.display = 'none';}, false);	
		var readout = div.appendChild(CE('center', 'class|' + type, 'style|margin:5px'))
		readout.innerHTML = contents
	}
	if (fade)
		setTimeout(function(){$('#reportDiv'+ type).style.display = 'none'}, 5000)
	if (reload)
		setTimeout(function(){window.location.reload()}, 5000)
}
