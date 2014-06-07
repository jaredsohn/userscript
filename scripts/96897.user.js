// ==UserScript==
// @name           KOL Consumption Tracker 
// @namespace      KoLCtH
// @description   Adds info about inventory items, tracks fullness, spleen.
// @include       *www.kingdomofloathing.com/game.php*
// @include       *www.kingdomofloathing.com/charpane.php*
// @include       *www.kingdomofloathing.com/inventory.php*
// @include       *www.kingdomofloathing.com/skills.php*
// @include       *www.kingdomofloathing.com/cafe.php*
// @include       *www.kingdomofloathing.com/account.php*
// @include       *www.kingdomofloathing.com/multiuse.php*
// @include       *www.kingdomofloathing.com/afterlife.php*
// @include       *www.kingdomofloathing.com/storage.php*
// @include       *www.kingdomofloathing.com/closet.php*
// @include       http://127.0.0.1:*game.php*
// @include       http://127.0.0.1:*charpane.php*
// @include       http://127.0.0.1:*inventory.php*
// @include       http://127.0.0.1:*skills.php*
// @include       http://127.0.0.1:*cafe.php*
// @include       http://127.0.0.1:*account.php*
// @include       http://127.0.0.1:*multiuse.php*
// @include       http://127.0.0.1:*afterlife.php*
// @include       http://127.0.0.1:*storage.php*
// @include       http://127.0.0.1:*closet.php*
// @include       http://localhost:*game.php*
// @include       http://localhost:*charpane.php*
// @include       http://localhost:*inventory.php*
// @include       http://localhost:*skills.php*
// @include       http://localhost:*cafe.php*
// @include       http://localhost:*account.php*
// @include       http://localhost:*multiuse.php*
// @include       http://localhost:*afterlife.php*
// @include       http://localhost:*storage.php*
// @include       http://localhost:*closet.php*
// @version       1.1.6
// ==/UserScript==
//An all new script based in part on JHunz's KOL Consumption Management. Should have most, if not all of the same features, with an updated database. Tracks current Full and Spleen in the charpane above Drunk. Will warn you when you are about to overdrink and allow you to contine or stop. Also works on multiple items consumed at the same time. Allows sorting of consumables by name, fullness or quality. Database and script should check for updates every two weeks. Great thanks to Dibzannia, Muroni, Mutant Pickles and Knitbone for their testing help.

var TOP = window.top.wrappedJSObject
switch(window.location.pathname)
{
	case '/game.php':
		GM_deleteValue("CurrentCharName");
		GM_deleteValue("CurrentPWD");
		loadDB();
		/*GM_get('/api.php?what=status&for=CTHConsumptionTracker', function (res)
			{
				console.log(res)
			});*/
	break
	case '/account.php':
		buildPrefs();
	break
	case '/charpane.php':
		var charName = GM_getValue('CurrentCharName', null)
		if (!charName)
		{
			charNameNode = $('b');
			if (charNameNode)
			{
				charName = charNameNode.textContent;
				GM_setValue('CurrentCharName', charName);
			}
			else return;
		}
		if (!GM_getValue('CurrentPWD', null))
		{
			if (unsafeWindow.pwdhash)
				var pwd = unsafeWindow.pwdhash
			else if ($('a[href ^= "/kolproxy-frame-page"]'))
				var pwd = $('a[href ^= "/kolproxy-frame-page"]').href.match(/pwd=(\w+)/)[1]
			GM_setValue('CurrentPWD', pwd)
		}
		//if script has not been run before for this char or new ascension, set values to default
		if (!GM_getValue(charName + '.overdrunk', null))
		{
			GM_setValue(charName + '.overdrunk', 15);
			GM_setValue(charName + '.overfull', 16);
			GM_setValue(charName + '.overspleen', 16);
		}
		//if rollover has occurred since last login, reset 
		if (unsafeWindow.rollover > GM_getValue(charName + '.rollover', 0))
		{
			GM_setValue(charName + '.rollover', unsafeWindow.rollover)
			GM_setValue(charName + '.currentDrunk', 0);
			GM_setValue(charName + '.currentFull', 0);
			GM_setValue(charName + '.currentSpleen', 0);
		}		
		var moxTextNode = $('td:contains("Mox")');
		if (!moxTextNode)
			return;
		var drunkTextNode = moxTextNode.parentNode.nextSibling
		if (!$('img[src $= "hourglass.gif"]'))
			//in compact mode, there's one more sibling here
			drunkTextNode = drunkTextNode.nextSibling;
		//get drunkenness 
		if (drunkTextNode)
		{
			//native full counter is first
			if (drunkTextNode.textContent.indexOf('Full') != -1)
				drunkTextNode = drunkTextNode.nextSibling
			if (drunkTextNode)
			{
				var currentDrunk = parseInt(drunkTextNode.childNodes[1].textContent);
				GM_setValue(charName + '.currentDrunk', currentDrunk);
			}
		}
		//build and insert fullness and spleen readouts after the moxie node.
		var showFull = GM_getValue(charName + '.showFull', true);
		if (showFull)
		{
			var currentFull = GM_getValue(charName + '.currentFull', 0);
			if (currentFull != 0) 
			{
				var fullDisplayTR = moxTextNode.parentNode.parentNode.appendChild(CE('tr'));
				fullDisplayTR.appendChild(CE('td', 'align|right', 'text|Full: '));
				fullDisplayTR.appendChild(CE('td', 'style|font-weight:bold', 'text|' + currentFull));
				fullDisplayTR.addEventListener('dblclick', function (e) {setThreshhold("Full", e.target.parentNode)}, false)
			}
		}
		var currentSpleen = GM_getValue(charName + '.currentSpleen', 0);
		if (currentSpleen != 0) 
		{
			var spleenDisplayTR = moxTextNode.parentNode.parentNode.appendChild(CE('tr'));
			spleenDisplayTR.appendChild(CE('td', 'align|right', 'text|Spleen: '));
			spleenDisplayTR.appendChild(CE('td', 'style|font-weight:bold', 'text|' + currentSpleen));
			spleenDisplayTR.addEventListener('dblclick', function (e) {setThreshhold("Spleen", e.target.parentNode)}, false)
		}
	break
	case '/inventory.php':
		checkForUpdates();
		if (!TOP.Consumption_DB)
			return;
		var colors = {'EPIC':'purple', 'Awesome':'blue', 'Good':'green', 'Decent':'black', 'Crappy':'gray', undefined:'firebrick'};
		$('td[id]', true).forEach(function (td)
		{
			var itemNum = parseInt(td.id.substr(1));
			var temp = TOP.Consumption_DB.items[itemNum];
			if (!temp) 
			{
					var descID = td.previousSibling
					if (!descID)
						return
					descID = descID.firstChild.getAttribute('onclick').match(/(\d+)/)[1]
					classify([itemNum, descID, td]);
					return;
			}
			var newNode = td.appendChild(CE("strong", 'style|font-size:8pt; color:' + colors[temp.qual]));
			if (temp.amt)
				newNode.appendChild(document.createTextNode(" [" + temp.amt + (temp.qual ? ' ' + temp.qual : '') + (temp.level ? " L" + temp.level : '') + "]"));
			if (temp.eff)
			{
				newNode.appendChild(CE("br"));
				newNode.appendChild(document.createTextNode(temp.eff));
			}
			if (itemNum == 2614) //mojo filter cleans 1 spleen
			{
				$('a', false, td).addEventListener('click', function ()
				{
					var charName = GM_getValue('CurrentCharName')
					var spleen = GM_getValue(charName + '.currentSpleen', 0);
					GM_setValue(charName + '.currentSpleen', Math.max(spleen - 1, 0));
				}, false);
			}
			else if (itemNum == 3433) //spice melange cleans 3 full and 3 drunk
			{
				$('a', false, td).addEventListener('click', function ()
				{
					var charName = GM_getValue('CurrentCharName')
					var full = GM_getValue(charName + '.currentFull', 0);
					GM_setValue(charName + '.currentFull', Math.max(full - 3, 0));
				}, false);
			}
		});
		if ($('[name="Food"]'))
		{
			//set event listener to catch clicks on eat/drink/use links on inv page 1
			document.addEventListener('click', stealThisFood, true);
			var sortButtonHolder = $('td>center').parentNode.appendChild(CE('div', 'align|center'));
			var sortTypes = ['name', 'quality', 'full'];
			for (var n=0;n<3;n++)
			{
				var b = sortButtonHolder.appendChild(CE('input', 'type|button', 'class|button', 'style|margin:5px', 'value|Sort by ' + sortTypes[n]));
				b.addEventListener('mousedown', function (e) {sortConsumables(this.value.substr(8), e.button)}, false);
				b.addEventListener('contextmenu', function (e) {e.preventDefault()}, false);
			}
			sortConsumables();
		}
	break;
	case "/multiuse.php":
		var startSpleen = GM_getValue(GM_getValue('CurrentCharName') + '.currentSpleen', 0);
		$('.button').addEventListener('click', function (e)
		{
			e.preventDefault();
			var quant = $('[name=quantity]').value;
			var item = $('[name=whichitem]').options[$('[name=whichitem]').selectedIndex].value;
			for (var n=0;n<quant;n++)
			{
				//if multiusing spleen items goes overspleen, KoL uses none of them
				//so reset spleen to pre-use level
				if (!addSpleenness(itemNum))
				{
					GM_setValue(GM_getValue('CurrentCharName') + '.currentSpleen', startSpleen);
					return;
				}
			}
			this.parentNode.submit();
		}, false);
	break;
	case "/skills.php":
		//add spleen from using medicinal herbs at the tiny skills menu
		if (window.location.search == '?tiny=1')
		{
			var select = $('select', true)[1];
			var tinybutton = $('.tinybutton', true)[1];
			if (tinybutton)
			{
				tinybutton.addEventListener('click', function (e)
				{
					if (select.options[select.selectedIndex].value == 1274) 
						addSpleenness(1274);
				},false);
			}
		}
	break
	case "/afterlife.php":
		//Reset thresholds upon ascension
		var charName = GM_getValue('CurrentCharName', null);
		if (charName)
		{
			GM_setValue(charName + '.currentDrunk', 0);
			GM_setValue(charName + '.currentFull', 0);
			GM_setValue(charName + '.currentSpleen', 0);
			GM_setValue(charName + '.overdrunk', 15);
			GM_setValue(charName + '.overfull', 16);
			GM_setValue(charName + '.overspleen', 16);
		}
	break
	case "/cafe.php":
		processCafe();
	break
}

function classify(item)
{
	var URL = "/desc_item.php?whichitem=" + item[1];
	GM_get(URL, function (results)
	{
		var div = $("#classify") || CE('div', 'id|classify');
		div.innerHTML = results;
		var bs = $('b', true, div);
		var index = 0;
		var isItConsumable = bs.some(function (b, i)
		{
			if (b.textContent.indexOf('booze') != -1 || b.textContent.indexOf('food') != -1)
			{
				index = i
				return true;
			}
			else 
				return false;
		})
		if (!isItConsumable)
			return false;
		var type = bs[index].textContent.indexOf('booze') != -1 ? 'D' : 'F'
		var temp = {};
		temp.amt = bs[index + 1].textContent + type
		var qual = bs[index].textContent.match(/\((\w+)\)/)[1]
		temp.qual = qual.charAt(0).toUpperCase() + qual.slice(1);
		var level = bs[index + 2].textContent;
		if (level.indexOf('Meat') == -1 && level.indexOf('Quest') == -1)
			temp.level = level
		var newNode = item[2].appendChild(CE("strong", 'style|font-size:8pt; color:' + colors[temp.qual]));
		newNode.appendChild(document.createTextNode(" [" + temp.amt + " " + temp.qual + (temp.level ? " L" + temp.level : '') + "]"));
		TOP.Consumption_DB.items[item[0]] = temp;
		GM_setValue('Consumption_DB', JSON.stringify(TOP.Consumption_DB));
		//race condition!?
	})
}

function sortConsumables(sortBy, direction)
{
	if (!sortBy)
	{
		var sortVal = GM_getValue('sortBy', null);
		if (!sortVal)
			return
		sortBy = sortVal.match(/name|full|quality/)[0]
		direction = sortVal.match(/\s\((a|d)/)[1]
	}
	var numCols = unsafeWindow.numcols || 3;
	$('.guts', true).forEach(function (table)
	{
		var items = $('.i', true, table);
		if (sortBy == 'full')
			items.sort(sortByFull);
		else if (sortBy == 'quality')
			items.sort(sortByQuality);
		else if (sortBy == 'name')
			items.sort(sortByName);
		items.forEach(function (item, index)
		{
			var thisRow = table.firstChild.childNodes[Math.floor(index/numCols)];
			thisRow.appendChild(item);
		})
		function sortByFull(a, b)
		{
			var aS = $('font+strong', false, a);
			if (aS)
				aS = aS.textContent.match(/(\d+)(F|D|S)/);
			aS = aS ? aS[1] : 0;
			var bS = $('font+strong', false, b);
			if (bS)
				bS = bS.textContent.match(/(\d+)(F|D|S)/);
			bS = bS ? bS[1] : 0;
			if (direction == 0)
				return aS > bS;
			else
				return aS < bS;
		}
		function sortByQuality(a, b)
		{
			var aS = $('font+strong', false, a);
			if (aS)
				aS = aS.textContent.match(/Crappy|Decent|Good|Awesome|EPIC/);
			aS = aS || 'none';
			var bS = $('font+strong', false, b);
			if (bS)
				bS = bS.textContent.match(/Crappy|Decent|Good|Awesome|EPIC/);
			bS = bS || 'none';
			const qual = {none:0, Crappy:1, Decent:2, Good:3, Awesome:4, EPIC:5};
			if (direction == 0)
				return qual[aS] > qual[bS];
			else
				return qual[aS] < qual[bS];
		}
		function sortByName(a, b)
		{
			var aS = $('b', false, a).textContent.toLowerCase();
			var bS = $('b', false, b).textContent.toLowerCase();
			if (direction == 0)
				return aS > bS;
			else
				return aS < bS;
		}
	})
}

function consumeThis(link)
{
	var itemNum = link.href.match(/\d+$/)[0];
	if (!itemNum)
		return false;
	var type = link.href.match(/_(eat|booze|use)/)[1];
	if (type == 'booze')
	{
		if (!overdrinkProtect(itemNum, link))
		//oP() says this is would be an overdrink, do not allow to continue to the consumption section
			return false;
	}	
	else if (type == 'eat' && GM_getValue(charName + '.showFull', true))
		addFullness(itemNum);
	else if (type == 'use')
		addSpleenness(itemNum);
	if (itemNum == 3325 || itemNum == 3327) 
	{
		//jar of fermented pickle juice and extra-greasy slider clean 5 spleen
		var spleen = GM_getValue(charName + '.currentSpleen', 0);
		GM_setValue(charName + '.currentSpleen', Math.max(spleen - 5, 0));
	}
	//use the page functions to show the results in a loading div
	var thisHref = link.href.replace('&which=', '&ajax=');
	unsafeWindow.loadingDiv();
	unsafeWindow.dojax(thisHref);
}

function overdrinkProtect(itemNum, link, multi) 
{
	//check if the drink attempted would cause overdrunkness, returns true for overdrunk, false for not
	//Get current values for drunkenness and overdrunk, since they might have changed
	var charName = GM_getValue('CurrentCharName', null);
	var currentDrunk = parseInt(GM_getValue(charName + '.currentDrunk', 0));
	if (itemNum == 2743) //steel margarita
		GM_setValue(charName + '.overdrunk', 20);
	var overdrunk = parseInt(GM_getValue(charName + '.overdrunk', 15));
	var addDrunk = parseInt(howMuchConsumption(itemNum));
	if (addDrunk == 999) {
		var risky = confirm("Unknown drink. Drink at your own risk.");
		if (risky)
			return true;
		link.textContent = "[risky drink]";
		setTimeout(function () {link.textContent = "[drink]"}, 10000);
		return false;
	}
	if (multi) {
		if (currentDrunk + addDrunk * multi >= overdrunk)
			return confirm("That many drinks will make you overdrunk.");
	}
	if (currentDrunk + addDrunk >= overdrunk) {
		var OD = confirm("This drink will make you overdrunk.");
		if (OD)
			return true;
		link.textContent = "[overdrink]";
		setTimeout(function () {link.textContent = "[drink]"}, 10000);
		return false;
	}
	//not unknown or overdrunk, it gets the oP() seal of approval
	return true;
}

function addFullness(itemNum) 
{
	var charName = GM_getValue('CurrentCharName', null)
	var addFull = howMuchConsumption(itemNum);
	if (addFull == 999) 
		return;
	var currentFull = GM_getValue(charName + '.currentFull');
	var overfull = GM_getValue(charName + '.overfull');
	var newFull = parseInt(currentFull) + parseInt(addFull)
	if (itemNum == 2742) //steel lasagna
		GM_setValue(charName + '.overfull', 21);
	if (newFull < overfull) 
		GM_setValue(charName + '.currentFull', newFull);
	return
}

function addSpleenness(itemNum, multi) 
{
	var charName = GM_getValue('CurrentCharName', null);
	var addSpleen = howMuchConsumption(itemNum);
	if (addSpleen == 999)
		return true;
	var currentSpleen = GM_getValue(charName + '.currentSpleen');
	var overspleen = GM_getValue(charName + '.overspleen');
	var newSpleen = parseInt(currentSpleen) + parseInt(addSpleen);
	if (itemNum == 2744) //steel air
		GM_setValue(charName + '.overspleen', 21);
	if (newSpleen < overspleen) 
		GM_setValue(charName + '.currentSpleen', newSpleen);
	else 
		return false;
	return true;
}

//returns drunkenness/fullness/spleen, or 999 if unknown
function howMuchConsumption(itemNum) 
{
	//cafe food has negative itemNum
	if (itemNum < 0)
		return 2 - itemNum;
	var temp = TOP.Consumption_DB.items[itemNum];
	if (temp && temp.amt)
		return temp.amt.match(/\d+/)[0];
	return 999;
}

function stealThisFood(e) 		
{	
	if (e.button != 0 || e.target.tagName.toLowerCase() != 'a')
		return;
	if (e.target.textContent.match(/\[(use|eat|drink)/))
	{
		var itemNum = e.target.href.match(/\d+$/) || e.target.id.substr(2);
		if (!TOP.Consumption_DB.items[itemNum])
			return;
		e.preventDefault();
		e.stopPropagation();
		if (e.target.textContent.match(/(some|multiple)/))
		{
			var offset = getOffset(e.target);
			offset[0] -= 25; offset[1] -= 90;
			var popup = $('#MUpopup');
			if (popup)
			{
				popup.style.display = 'block';
				popup.style.top = offset[1];
				popup.style.left = offset[0];
				popup.childNodes[1].focus();
				popup.setAttribute('rel', itemNum);
				return;
			}
			popup = $('body').appendChild(CE('center', 'id|MUpopup', 'rel|' + itemNum, 'style|position:absolute; width:130px; top:' + offset[1] + '; left:' + offset[0] + '; background-color:white; border:solid black 1px;'));
			popup.appendChild(CE('div', 'style|background-color:blue; color:white; font-weight:bold;', 'text|How Many?'));
			var quant = popup.appendChild(CE('input', 'id|quant', 'type|text', 'style|width:100px; margin:4px'));
			quant.focus();
			var close = popup.appendChild(CE('img', 'src|http://images.kingdomofloathing.com/closebutton.gif', 'style|position:absolute; top:1px; right:1px'));
			close.addEventListener('click', function () {this.parentNode.style.display = 'none'}, false);
			var button = popup.appendChild(CE('input', 'type|button', 'class|button', 'value|Consume!'));
			button.addEventListener('click', multiuse, false);
			quant.addEventListener('keyup', multiuse, false);
		}
		else
			consumeThis(e.target);
	}

	function multiuse(e)
	{
		if (e.type == 'keyup' && e.keyCode != 13)
			return;
		var itemNum = $('#MUpopup').getAttribute('rel');
		var quant = $('#quant').value;
		$('#quant').value = null;
		$('#MUpopup').style.display = 'none';
		var temp = TOP.Consumption_DB.items[itemNum];
		if (quant < 1 || isNaN(quant) || !temp)
			return false;
		var type = temp.amt ? temp.amt.charAt(1) : 'S';
		//var url = 'http://' + window.location.host;
		var url = type == 'F' ? 'inv_eat.php?' : type == 'D' ? 'inv_booze.php?' : 'multiuse.php?action=useitem&';
		url += 'pwd=' + GM_getValue('CurrentPWD') + '&which=1&whichitem=' + itemNum + '&ajax=1&quantity=' + quant;
		var startSpleen = GM_getValue(GM_getValue('CurrentCharName') + '.currentSpleen', 0);
		for (var j=0;j<quant;j++)
		{
			if (type == 'D' && !overdrink)
			{
				var overdrink = overdrinkProtect(itemNum, null, quant);
				if (!overdrink)
					return false;
			}
			if (type == 'F' && GM_getValue(charName + '.showFull', true))
				addFullness(itemNum);
			else if (type == 'S')
			{
				if (!addSpleenness(itemNum))
				{
					GM_setValue(GM_getValue('CurrentCharName') + '.currentSpleen', startSpleen);
					return;
				}
			}
		}
		//console.log(url, itemNum, quant, unsafeWindow.dojax)
		unsafeWindow.dojax(url)
		//console.log(unsafeWindow.dojax(url));
		unsafeWindow.updateInv({itemNum:'-' + quant});
	}
}

function processCafe()
{
	var cafeForm = document.forms[0];
	var cafeId = cafeForm.firstChild.value;
	if (!cafeId)
		return;
	var charName = GM_getValue('CurrentCharName');
	var cafeFood = {"1":{"-1":"[3F]", "-2":"[4F]", "-3":"[5F]"}, 
		"2":{"-1":"[3D]", "-2":"[3D]", "-3":"[3D]"}, 
		"3":{"571":"[1F] -X HP +10X MP", "570":"[3F] +Mox -Mus", "569":"[3F] +Mys -Mox", "568":"[3F] +Mus -Mys", "470":"[1D] +Mus -Mox +9 MP"}};
	var submitButton = $('.button');
	submitButton.type = 'button';
	cafeForm.addEventListener('change', function (e) 
	{
		submitButton.value = 'Order ' + e.target.parentNode.parentNode.nextSibling.textContent;
	}, false);
	$('[type="radio"]', true, cafeForm).forEach(function (r)
	{
		var place = r.parentNode.parentNode;
		var newRow = place.parentNode.insertBefore(CE('tr'), place.nextSibling);
		var newCell = newRow.appendChild(CE('td', 'colspan|3', 'style|text-align:center; color:blue; font-weight:bold'));
		if (cafeFood[cafeId] && cafeFood[cafeId][r.value])
			var fdAmount = cafeFood[cafeId][r.value];
		else if (TOP.Consumption_DB && TOP.Consumption_DB.items[r.value])
			var fdAmount = '[' + TOP.Consumption_DB.items[r.value].amt + ']';
		else
			var fdAmount = '[??]';
		newCell.textContent = fdAmount;
	})
	submitButton.addEventListener('click', function () 
	{
		var itemNum = $('input:checked').value;
		var type = this.value.substr(-2, 1);
		if (type == 'F' && GM_getValue(charName + '.showFull', true)) 
			//add full amount and submit
			addFullness(itemNum);
		else if (type == 'D') 
		{
			//overdrink protection
			var currentDrunk = GM_getValue(charName + '.currentDrunk');
			var overdrunk = GM_getValue(charName + '.overdrunk');
			var drunkAmt = this.value.substr(-3, 1);
			if ((currentDrunk + parseInt(drunkAmt)) >= overdrunk) 
			{
				if (this.value.indexOf('(overdrink)') == -1) 
				{
					alert("This drink will cause you to overdrink");
					this.value = 'Order (overdrink) ' + this.value.substr(-4, 4);
					return;
				}
			}
		}
		cafeForm.submit();
	},false);
}

function getOffset(node)
{
	var X = 0, Y = 0;
	while (node.offsetParent)
	{
		X += node.offsetLeft;
		Y += node.offsetTop;
		node = node.offsetParent;
	}
	return [X, Y];
}

function CE(tag/*,attributes*/)
{
	var node = document.createElement(tag);
	for (var i=1,len=arguments.length;i<len;i++)
	{
		var attr = arguments[i].split('|');
		if (attr[0] == 'text')
			node.textContent = attr[1];
		else
			node.setAttribute(attr[0], attr[1]);
	}
	return node;
}

function $(selector, all, scope)
{
	scope = scope || document;
	if (selector.indexOf(':contains') != -1)
	{
		var test = selector.match(/([^:]+):contains\(["'](.+)["']\)/);
		var res = scope.querySelectorAll(test[1])
		for (a in res) {
			if (res[a].textContent && res[a].textContent.indexOf(test[2]) != -1)
				return res[a]
		}
	}
	else if (all)
		return Array.prototype.slice.call(scope.querySelectorAll(selector));
	else
		return scope.querySelector(selector);
}

function GM_get(target, callback, err) {
	if (target.indexOf('http') != 0)
		target = 'http://' + window.location.host + target;
	GM_xmlhttpRequest({
		method: 'GET',
		url: target,
		onload: function(details) {
			callback(details.responseText);
		},
		onerror: function () {
			if (err)
				err();
		}
	});
}

function loadDB()
{
	const CURRENT_DB = GM_getValue('Consumption_DB', null);
	if (!CURRENT_DB)
		//DB is blank, get new one
		getDB();
	else
		initializeScript(CURRENT_DB);
}

function getDB()
{
	//DB has new version, download it
	GM_get('http://sites.google.com/site/kolcthproject/Consumable_DB.txt', function (DBText)
	{
		if (DBText.charAt(0) != '{')
		{
			//downloaded DBText is not the DB we want
			getDBFailure('Bad');
			return;
		}
		//cache DB and load to top, overriding the version already loaded
		GM_setValue('Consumption_DB', DBText);
		GM_setValue('DB_VERSION', DBText.match(/([\d\.]+)/)[1]);
		initializeScript(DBText);
	}, getDBFailure);
	

	function getDBFailure(bad)
	{
		//want to get new DB but failed
		GM_log(bad ? 'Bad database' : 'Download request failed');
	}
}

function initializeScript(DB)
{
	//make sure another script hasn't loaded it before loading DB
	if (!TOP.Consumption_DB)
		TOP.Consumption_DB = JSON.parse(DB);
}

function checkForUpdates(force)
{
	const NOW = new Date().getTime();
	var lastUpdateCheck = parseInt(GM_getValue('lastUpdateCheck', 0));
	if (NOW > lastUpdateCheck + 1209600000 || force)
	{
		const SCRIPT_NAME = "Consumption Tracker";
		const SCRIPT_VERSION = "1.1.6";
		//two weeks since last update
		GM_setValue('lastUpdateCheck', NOW.toString());
		GM_get('http://sites.google.com/site/kolcthproject/allversions.txt', function (versionText)
		{
			var allVersions = JSON.parse(versionText);
			var build = 0;
			if (allVersions[SCRIPT_NAME] != SCRIPT_VERSION)
				//script has new version, put download banner on main pane
				build++;
			if (allVersions.masterDB != GM_getValue('DB_VERSION', null))
				getDB();
			buildTickler(build);
		});
	}
		
	function buildTickler(build)
	{
		var alert = document.body.appendChild(CE('center', 'id|tickler', 'style|position:fixed; top:10%; left:20%; width:30%; border:solid blue; background-color:white; border-width:24px 1px 1px; padding:10px 40px;'));
		alert.appendChild(CE('div', 'style|position:relative; top:-32px; color:white; font-weight:bold; margin-bottom:-1em', 'text|' + SCRIPT_NAME + ' Update:'));
		var close = alert.appendChild(CE('img', 'src|http://images.kingdomofloathing.com/closebutton.gif', 'style|position:absolute; top:-22px; right:1px'));
		close.addEventListener('click', function () {this.parentNode.style.display = 'none'}, false);
		switch (build)
		{
			case 1:
				//tell user about new script version
				alert.appendChild(CE('a', 'text|Download new version of ' + SCRIPT_NAME, 'href|http://userscripts.org/scripts/source/96897.user.js', 'target|_blank'));
			break;
			case 0:
				//tell user both are fine
				alert.appendChild(CE('span', 'text|Script and Database are up to date'));
				setTimeout(function () {alert.style.display = 'none'}, 5000);
			break;
		}
	}
}

function buildPrefs()
{
	if (!$('#privacy'))
		return;
	if (!$('#scripts'))
	{
		//scripts tab is not built, do it here
		var scripts = $('ul').appendChild(CE('li', 'id|scripts'));
		var a = scripts.appendChild(CE('a', 'href|#'));
		var img = a.appendChild(CE('img', 'style|paddingRight:10px', 'border|0', 'align|absmiddle', 'src|http://images.kingdomofloathing.com/itemimages/cmonkey1.gif'));
		a.appendChild(document.createTextNode('Scripts'));
		a.addEventListener('click', function (e)
		{
			//make our new tab active when clicked, clear out the #guts div and add our settings to it
			e.stopPropagation();
			$('.active').className = '';
			$('#scripts').className = 'active';
			$('#guts').innerHTML = '<div class="scaffold"></div>';
			$('#guts').appendChild(getSettings());
		}, false);
	}
	else
	{
		//script tab already exists
		$('#scripts').firstChild.addEventListener('click', function (e)
		{
			//some other script is doing the activation work, just add our settings
			e.stopPropagation();
			$('#guts').appendChild(getSettings());
		}, false);
	}

	function getSettings()
	{
		//build our settings and return them for appending
		var contents = CE('div', 'id|CTH_CT');
		var fieldset = contents.appendChild(CE('fieldset', 'style|margin-top:20px; width:40%'));
		fieldset.appendChild(CE('legend', 'class|subhead', 'text|Consumption Tracker'))
		var section = fieldset.appendChild(CE('div', 'class|indent'));
		//call function in main script to actually make the settings
		section.appendChild(buildSettings());
		return contents;
	}

	function buildSettings()
	{
		var section = CE('div');
		var types = [["Liver", "drunk"], ["Stomach", "full"], ["Spleen", "spleen"]];
		var charName = GM_getValue('CurrentCharName');
		var over = 15;
		for (var i=0;i<3;i++)
		{
			var val = GM_getValue(charName + '.over' + types[i][1]);
			over = Math.max(val, over);
			section.appendChild(CE('span', 'text|Current over' + types[i][1] + ': ' + val));
			var button = section.appendChild(CE('input', 'id|' + types[i][1], 'class|button', 'type|button', 'style|margin:10px;', 'value|Steel ' + types[i][0] + '?'));
			section.appendChild(CE('br'));
			button.addEventListener('click', changeSettings, false);
		}
		if (over > 19)
		{
			for (var i=0;i<3;i++)
			{
				section.childNodes[i*3+1].disabled = true;
				section.childNodes[i*3+1].style.color = 'gray';
			}
		}
		button = section.appendChild(CE('input', 'id|reset', 'class|button', 'type|button', 'style|margin:10px 25%;', 'align|center', 'value|Reset threshholds'));
		button.addEventListener('click', function () 
		{
			for (var i=0;i<3;i++)
			{
				var thisButton = section.childNodes[i*3+1];
				var thisText = thisButton.previousSibling.textContent.match(/(.+)\s(\d+)/);
				if (thisText[2] > 16)
					thisText[2] -= 5;
				thisButton.previousSibling.textContent = thisText[1] + ' ' + thisText[2];
				thisButton.disabled = false;
				thisButton.style.color = 'black';
				GM_setValue(charName + '.overdrunk', 15);
				GM_setValue(charName + '.overspleen', 16);
				GM_setValue(charName + '.overfull', 16);
			}
		}, false);
		section.appendChild(CE('br'));
		var showFull = GM_getValue(charName + '.showFull', true);
		button = section.appendChild(CE('input', 'id|showFood', 'class|button', 'type|button', 'style|margin:10px 25%;', 'align|center', 'value|Track fullness: ' + showFull));
		button.addEventListener('click', function () 
		{
			showFull = !showFull
			GM_setValue(charName + '.showFull', showFull);
			this.value = 'Track fullness: ' + showFull
		}, false);
		section.appendChild(CE('br'));
		section.appendChild(CE('span', 'text|Sort consumables by: '));
		var select = section.appendChild(CE('select', 'style|margin:10px;'));
		var selVals = ["name (ascending)", "name (descending)", "full (ascending)", "full (descending)", "quality (ascending)",  "quality (descending)"];
		for (var n=0;n<6;n++)
		{
			select.appendChild(CE('option', 'value|' + n, 'text|' + selVals[n]));
			if (GM_getValue('sortBy') == selVals[n])
				select.selectedIndex = n;
		}
		select.addEventListener('change', function ()
		{
			GM_setValue('sortBy', selVals[this.selectedIndex]);
		}, false);
		button = section.appendChild(CE('input', 'id|update', 'class|button', 'type|button', 'style|margin:10px 25%;', 'align|center', 'value|Check for updates'));
		button.addEventListener('click', function () {checkForUpdates(true)}, false);
		return section;
	}

	function changeSettings()
	{
		var text = this.previousSibling.textContent.match(/(.+)\s(\d+)/);
		var val = parseInt(text[2]) + 5;
		this.previousSibling.textContent = text[1] + ' ' + val;
		for (var i=0;i<3;i++)
		{
			this.parentNode.childNodes[i*3+1].disabled = true;
			this.parentNode.childNodes[i*3+1].style.color = 'gray';
		}
		GM_setValue(GM_getValue('CurrentCharName') + '.over' + this.id, val);
	}
}

function setThreshhold(which, tgt)
{
    var newT = prompt("Change your current " + which + " amount?")
    if (newT && !isNaN(newT))
    {
        tgt.lastChild.textContent = newT
        GM_setValue(charName + '.current' + which, newT);
    }
}
