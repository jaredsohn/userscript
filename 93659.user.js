// ==UserScript==
// @name           OGame Max Ship Build
// @namespace      AngelAshley-OGame-MaxShipBuild
// @include        http://*.ogame.*/game/index.php?page=shipyard*
// @include        http://*.ogame.*/game/index.php?page=defense*
// ==/UserScript==

var metal = getIntById('resources_metal', 'innerHTML');
var crystal = getIntById('resources_crystal', 'innerHTML');
var deut = getIntById('resources_deuterium', 'innerHTML');

var workDone = false;

document.getElementById('detail').addEventListener('DOMSubtreeModified', function() {
	if (workDone == false)
	{
		var costWrapper = document.getElementById('costswrapper');
		if (costWrapper)
		{
			var resItems = getElementsByClassName("metal", "li", costWrapper);
		
			var cost_metal = 0
			var cost_crystal = 0
			var cost_deut = 0;
		
			for (var i = 0; i < resItems.length; i++)
			{
				var costElems = getElementsByClassName("cost", "span", resItems[i]);
				var cost = extractInt(costElems[0].innerHTML);
				if (costElems[0].innerHTML.indexOf('M') > -1)
					cost *= 1000000;
				
				if (resItems[i].title.indexOf('Metal') > -1)
				{
					cost_metal = cost;
				}
				if (resItems[i].title.indexOf('Crystal') > -1)
				{
					cost_crystal = cost;
				}
				if (resItems[i].title.indexOf('Deuterium') > -1)
				{
					cost_deut = cost;
				}
			}
			
			var max_metal = 0;
			var max_crystal = 0;
			var max_deut = 0;
			
			var max_ships = 999999999;
			var limitedBy = '';
			
			if (cost_metal > 0)
			{
				max_metal = parseInt(metal / cost_metal);
				if (max_metal < max_ships)
				{
					max_ships = max_metal;
					limitedBy = 'Metal';
				}
			}
			if (cost_crystal > 0)
			{
				max_crystal = parseInt(crystal / cost_crystal);
				if (max_crystal < max_ships)
				{
					max_ships = max_crystal;
					limitedBy = 'Crystal';
				}
			}
			if (cost_deut > 0)
			{
				max_deut = parseInt(deut / cost_deut);
				if (max_deut < max_ships)
				{
					max_ships = max_deut;
					limitedBy = 'Deuterium';
				}
			}
			
			actionDiv = document.getElementById('action');
			if (actionDiv)
			{
				var timeSpan = getElementsByClassName('time', 'span', actionDiv)[0];
				var timeLi = timeSpan.parentNode;
				
				var ms = document.getElementById('max_span');
				if (!ms)
				{
					var max_span = document.createElement("span");
					max_span.id = 'max_span';
					max_span.innerHTML = '<br />Max Build: ' + max_ships + ' (Limited by ' + limitedBy + ')<br />';
					
					var max_button = document.createElement("input");
					max_button.type = "button";
					max_button.value = 'Build ' + max_ships;
					max_button.addEventListener("click", function(e) { document.getElementById('number').value = max_ships; }, false);
					
					workDone = true;
					timeLi.appendChild(max_span);
					timeLi.appendChild(max_button);
					workDone = false;
				}
			}
		}
	}
}, false);

function getElementsByClassName(className, tag, elm){
	var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
	var tag = tag || "*";
	var elm = elm || document;
	var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
	var returnElements = [];
	var current;
	var length = elements.length;
	for(var i=0; i<length; i++){
		current = elements[i];
		if(testClass.test(current.className)){
			returnElements.push(current);
		}
	}
	return returnElements;
}

function getIntById(id, property, rx)
{
	var node = document.getElementById(id);
	property = property || 'innerHTML';
	if (!node || !node[property])
	{
		return null;
	}
	return extractInt(node[property], rx);
}
		
function extractInt(str, rx)
{
	if (!str) return null;
	str = str.toString();
		
	if (!rx)
		return parseInt1(str);

	str = str.match(rx);
	if (!str) return null;
	else return parseInt1(str[1]);
}
		
function parseInt1(str)
{
	if (!str) return null;
	return parseInt(str.replace(/[^\d\-]/g, ''), 10);
}
