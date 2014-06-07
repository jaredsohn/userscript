// ==UserScript==
// @name        Jarlsberg Food Only
// @namespace   KoLCtH
// @include     http://www.kingdomofloathing.com/inventory.php*
// @include     *127.0.0.1*/inventory.php*
// @version     1
// ==/UserScript==

var foodSection = $('#food')
if (!foodSection)
	return false;
var boozeSection = $('#booze')
var hidden = [];
var hiddenSection = document.createElement('table')
hiddenSection.appendChild(document.createElement('tr'))
var food = $('.i', true, foodSection);
food = food.filter(function (p, index) 
	{
		var id = parseInt(p.firstChild.id.substr(2));
		if (id >= 6176 && id <= 6237)
			return p;
		else
			hidden.push(p);
	});
var booze = $('.i', true, boozeSection);
booze = booze.filter(function (p, index) 
	{
		var id = parseInt(p.firstChild.id.substr(2));
		if (id == 2743 || (id >= 6176 && id <= 6237))
			return p;
		else
			hidden.push(p);
	});
reflow(hidden, hiddenSection)
reflow(food, foodSection.firstChild)
reflow(booze, boozeSection.firstChild)

function $(selector, all, scope)
{
	scope = scope || document;
	if (all)
		return Array.prototype.slice.call(scope.querySelectorAll(selector));
	else
		return scope.querySelector(selector);
}

function reflow(array, table)
{
	for (i = 0; i < array.length; i++)
	{
		var row = table.childNodes[Math.floor(i / 3)] || table.appendChild(document.createElement('tr'))
		if (row)
			row.appendChild(array[i])
	}
}
