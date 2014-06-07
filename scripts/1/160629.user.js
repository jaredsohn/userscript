// ==UserScript==
// @name        Jarlberg's Easy Bake Oven
// @namespace   KoLCtH
// @include     http://www.kingdomofloathing.com/shop.php?whichshop=jarl&cookbook=1*
// @include     *127.0.0.1:*/shop.php?whichshop=jarl&cookbook=1*
// @version     1
// ==/UserScript==

var foodDB = {
	72:{49:'consummate toast', 56:'consummate cheese slice'}, 
	73:{48:'consummate brownie', 66:'consummate ice cream'}, 
	74:{47:'consummate hot dog bun', 62:'consummate frankfurter'}, 
	75:{46:'consummate sliced bread', 44:'consummate egg salad'}, 
	76:{46:'consummate sliced bread', 56:'consummate cheese slice', 61:'consummate cold cuts'}, 
	77:{53:'consummate salad', 42:'consummate hard-boiled egg', 61:'consummate cold cuts'}, 
	78:{43:'consummate fried egg', 58:'consummate bacon', 49:'consummate toast'}, 
	79:{47:'consummate hot dog bun', 62:'consummate frankfurter', 55:'consummate sauerkraut'}, 
	80:{51:'consummate soup', 60:'consummate steak', 64:'consummate baked potato'}, 
	81:{52:'consummate corn chips', 54:'consummate salsa', 57:'consummate melted cheese', 68:'consummate sour cream'}, 
	82:{45:'consummate bagel', 43:'consummate fried egg', 58:'consummate bacon', 56:'consummate cheese slice'}, 
	83:{64:'consummate baked potato', 58:'consummate bacon', 57:'consummate melted cheese', 68:'consummate sour cream'}, 
	84:{66:'consummate ice cream', 67:'consummate whipped cream', 69:'consummate strawberries', 48:'consummate brownie'}, 
	85:{55:'consummate sauerkraut', 6215:'mediocre lager'}, 
	86:{50:'passable stout', 61:'consummate cold cuts'}, 
	87:{65:'acceptable vodka', 47:'consummate hot dog bun'}, 
	88:{65:'acceptable vodka', 68:'consummate sour cream'}, 
	89:{65:'acceptable vodka', 54:'consummate salsa'}, 
	90:{71:'adequate rum', 57:'consummate melted cheese'}, 
	91:{71:'adequate rum', 63:'consummate french fries'}, 
	92:{71:'adequate rum', 43:'consummate fried egg'}
}
var ingredientDB = {
	42:"egg", 43:"egg", 44:"egg", 
	45:"dough", 46:"dough", 47:"dough", 48:"dough", 49:"dough", 50:"dough", 
	51:"vegetable", 52:"vegetable", 53:"vegetable", 54:"vegetable", 55:"vegetable", 
	56:"cheese", 57:"cheese", 
	58:"potted meat", 59:"potted meat", 60:"potted meat", 61:"potted meat", 62:"potted meat", 
	63:"potato", 64:"potato", 65:"potato", 
	66:"cream", 67:"cream", 68:"cream", 
	69:"fruit", 70:"fruit", 71:"fruit",
	72:"mediocre lager"
}
var craftable = $('td[style *= "padding"]');
var available = $('a[href="campground.php"]').parentNode.previousSibling;
$('table[cellpadding = "3"]').style.position = 'relative';
var pendingImg = CE('img', 'id|pending', 'src|http://images.kingdomofloathing.com/itemimages/karma.gif', 'style|position:absolute;');

var bah = $('td[align="right"]').parentNode.parentNode
var newTR = bah.appendChild(CE('tr'))
newTR.innerHTML = "<td align=right><table><tr><td><img style='vertical-align: middle' class=hand src='/images/itemimages/jarl_meltcheese.gif'></td><td><img src=/images/itemimages/lplus.gif></td><td><img style='vertical-align: middle' class=hand src='/images/itemimages/scpowder.gif'></td><td><img src=/images/itemimages/lplus.gif></td><td><img style='vertical-align: middle' class=hand src='/images/itemimages/bonechips.gif'></td><td><img src=/images/itemimages/lplus.gif></td><td><img style='vertical-align: middle' class=hand src='/images/itemimages/disease.gif'></td><td><img src=/images/itemimages/lequals.gif></td><td></td><td><img style='vertical-align: middle' class=hand src='/images/itemimages/crudeoil.gif'></td></tr></table></td>"

$('td[align="right"]', true).forEach(function (td, index)
{
	td.firstChild.firstChild.firstChild.appendChild(CE('input', 'type|button', 'class|button', 'value|Make this!', 'rel|' + parseInt(index + 72)));
});

document.addEventListener('click', makeComplexFood, false);
	
function makeComplexFood(e)
{
	if (e.target.value != 'Make this!')
		return;
	var food = [e.target.getAttribute('rel')];
	if (food[0] == 93)
	{
		if ($('#goo'))
		{
			$('#goo').style.display = 'block'
			return
		}
		document.body.style.position = 'relative'
		var blah = document.body.appendChild(CE('div', 'id|goo', 'style|position:absolute; top:1300px; left: 10px; background:white; border:blue solid 2px; width:95%; padding:10px;'))
		blah.innerHTML = '<p>You mix various random things together in your cosmic pan and cook them for a while, shaking the pan to keep the food(?) from sticking. As the stuff swirls around, it breaks down into finer and finer particles until you can no longer tell which bit was cheese, or spooky powder, or a bone fragment(?!). Eventually the smell becomes so revolting that you decide to give up and dump the mess in the compost heap at your campground. <p>Two days later, the puddle of goop gains sentience. The day after that, you are surprised at your house by an intelligent and cultured, but oozy and revolting, goo who vows (politely and urbanely) to destroy all you hold dear. Since you\'ve heard it all before, you just shovel it out of the bedroom so you can crash. <p>The next day, the goo has grown over the main part of town and subsumed the council. "Good," you think, "I\'d been thinking of doing that myself." <p>Next day, it has covered all of Seaside town. "I never liked the meatsmith anyway. But I am kinda miffed about Susie." <p>Day after, it has gotten all of the gnomes and the whole desert and begins work on the plains. <p>On then next day, when it hits the spooky forest, you start getting mildly worried. You take your raft to the Mysterious island and make common cause with the pirates, hippys, and fratboys to stop the ooze. <p>In a valiant and storied battle taking almost 20 minutes, the goop kills and consumes you all quite handily.<p>You are dead.<p><center><input type="button" class="button" value="Wait, what?">'
		blah.addEventListener('click', function () {$('#goo').style.display = 'none'}, false)
		return
	}
	var formula = foodDB[food[0]];
	var counter = 0, craftFailure = [], ingredientFailure = [], failureString = '';
	for (basic in formula)
	{
		//find item in craftable matrix
		if (basic != 6215)
		{
			var canCraft = $('[title = "' + formula[basic] +'"]', false, craftable).parentNode.parentNode.parentNode.parentNode.parentNode;
			//uncraftable intermediate foods have a white background
			if (canCraft.getAttribute('bgcolor') == 'white')
			{
				craftFailure.push(formula[basic]);
				continue;
			}
		}
		//find base ingredient in available things
		var haveIngredients = $('[title *= "' + ingredientDB[basic] +'"]', false, available);
		if (!haveIngredients)
		{
			ingredientFailure.push('cosmic ' + ingredientDB[basic]);
			continue;
		}
		//find intermediate food in available things
		var isAvailable = $('[title = "' + formula[basic] +'"]', false, available);
		if (isAvailable)
			continue;
		//whatever needs to be and can be crafted gets added to this array along with the resulting food
		food.unshift(basic);
	}
	if (craftFailure[0])
		failureString += 'You don\'t have the skill to create a ' + oxford(craftFailure, 'or') + '.\n';
	if (ingredientFailure[0])
		failureString += 'You need to summon a ' + oxford(ingredientFailure, 'and') + ' before you can make that.\n';
	if (food.length == 1)
		failureString += 'There is no way you can make that food. Or drink. Whatever.';
	if (failureString)
		alert(failureString);
	else
	{
		var pending = e.target.parentNode.appendChild(pendingImg);
		recurse(counter);
	}

	
	function recurse(counter)
	{
		GM_get('/shop.php?whichshop=jarl&action=buyitem&quantity=1&whichrow=' + food[counter], function (res)
		{
			if (res.indexOf('class=effect') == -1)
			{
					pending.parentNode.removeChild(pending);
					return false;
			}
			if (counter == food.length - 1)
			{
				var temp = CE('div');
				temp.innerHTML = res;
				var center = $('#results');
				if (center)
					center.innerHTML = '';
				else
					center = document.body.insertBefore(CE('center', 'id|results'), document.body.firstChild);
				center.appendChild($('table', false, temp));
				var oldPage = $('#kitchen') || $('table[width = "95%"]', true)[2];
				oldPage.id = '';
				var newPage = $('table', false, temp);
				newPage.id = 'kitchen';
				oldPage.parentNode.replaceChild(newPage, oldPage);
				pending.parentNode.removeChild(pending);
			}
			 else
				recurse(++counter);
		})
	}
}

function CE(tag/*,attributes*/)
{
	var node = document.createElement(tag);
	for (var i=1,len=arguments.length;i<len;i++)
	{
		var attr = arguments[i].split('|');
		node.setAttribute(attr[0], attr[1]);
	}
	return node;
}

function $(selector, all, scope)
{
	scope = scope || document;
	if (all)
		return Array.prototype.slice.call(scope.querySelectorAll(selector));
	else
		return scope.querySelector(selector);
}

function GM_get(target, callback, err) 
{
   //OTT is great!
	if (target.indexOf('http') == -1)
		target = 'http://' + window.location.host + target;
	GM_xmlhttpRequest({
		method: 'GET',
		url: target,
		onload: function(details) {
			callback(details.responseText);
		}
   });
}

function oxford(array, string)
{
	var returnString = '';
	var len = array.length - 1;
	if (len > 0)
		array[len] = ' ' + string + ' ' + array[len];
	for (var i = 0; i <= len; i++)
	{
		returnString += array[i] + (i < len - 1 ? ', ' : '');
	}
	return returnString;
}
