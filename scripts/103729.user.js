// ==UserScript==
// @name           Hagnk's Retro Storage
// @namespace      KoLCtH
// @description    KoL UI Enhancement. Returning the Hagnk's storage interface to dropdown lists on the storage page. 
// @version        1.0
// @include        http://*kingdomofloathing.com/game.php*
// @include        http://*kingdomofloathing.com/storage.php*
// @include        http://*kingdomofloathing.com/afterlife.php*
// @include        http://127.0.0.1:*/game.php*
// @include        http://127.0.0.1:*/storage.php*
// @include        http://127.0.0.1:*/afterlife.php*
// ==/UserScript==

if (window.location.pathname == '/game.php')
{
	GM_deleteValue('CurrentCharName')
	return
}
else if (window.location.pathname == '/afterlife.php')
{
	var charName = getCharName()
	GM_deleteValue(charName + '.storageContents')
	GM_deleteValue('CurrentCharName')
	return
}
else if (window.location.pathname == '/storage.php')
{
	var charName = getCharName()
	var storageContents = GM_getValue(charName + '.storageContents', null)
	if (storageContents)
		storageContents = JSON.parse(storageContents)
	if (!$('img[src *= "hagnk"]'))
	{
		var itemName
		document.addEventListener('click', listenForGraphicalPulls, true)
		document.addEventListener('keyup', listenForGraphicalPulls, true)
		return
	}
	var style = 'div.Pulls {width:10%; left:87%; top:12px;} \
		div.Pulls center {font-size:200%;} \
		.reportDiv {position:fixed; background-color:white; width:70%; top:50px; left:15%; border:blue solid 2px; outline:white 1px solid; text-align:center; z-index:100} \
		.reportHeading {font-weight:bold; color:white; background-color:blue;} \
		.closeButton {position:absolute; top:0px; right:-1px; cursor:default; font-size:28pt; font-weight:bold; line-height:.4; height:.45em; width:.6em; background-color:white; border:black 1px solid; overflow:hidden; z-index:55;}';
	GM_addStyle(style);
	document.addEventListener('keyup', countPulls, false)
	var hagnk = document.body.textContent.match(/You may (not )?take (\d+)?(as many)?/);
	var pullsRemaining = (!hagnk || hagnk[1]) ? 0 : hagnk[2] ? hagnk[2] : -1;
	buildDDLs()
}

function buildDDLs()
{
	var holder = $('td>center').appendChild(CE('div', 'id|retroHagnk'))
	var pullsHolder = holder.appendChild(CE('fieldset', 'style|position:relative; margin:0px 25px; padding:15px; border:solid black 2px; min-width:60%;'))
	pullsHolder.appendChild(CE('legend', 'text|Pulls'))
	pullsHolder.appendChild(CE('img', 'src|http://images.kingdomofloathing.com/itemimages/wrench.gif', 'style|position:relative; top:15px; right:25%; border:black 2px solid;')).addEventListener('click', buildSettings, false)
	pullsHolder.appendChild(CE('input', 'type|button', 'class|button', 'value|Pull', 'style|margin:10px;')).addEventListener('click', pullList, false)
	pullsHolder.appendChild(CE('input', 'type|button', 'class|button', 'value|\u254b', 'style|position:relative; left:25%;')).addEventListener('click', function () 
	{
		var DDLs = $('select', true).length - 1 // - 2 if integrating with favorites
		if (DDLs <= 10)
		{
			var clone = this.nextSibling.cloneNode(true)
			clone.firstChild.value = null
			this.parentNode.insertBefore(clone, this.nextSibling)
		}
	}, false)
	var ddl = pullsHolder.appendChild(CE('div'))
	ddl.appendChild(CE('input', 'type|text', 'style|width:30px; margin:5px 10px'))
	var pulls = ddl.appendChild(CE('select'))
	pulls.appendChild(CE('option', 'value|0', 'text|\u25c4 Pulls \u25ba'))
	
	var freeHolder = holder.appendChild(CE('fieldset', 'style|display:none; margin:25px; padding:15px; border:solid black 2px; min-width:60%'))
	freeHolder.appendChild(CE('legend', 'text|Free Pulls'))
	freeHolder.appendChild(CE('input', 'type|button', 'class|button', 'value|Free Pull', 'style|margin:10px;')).addEventListener('click', pullList, false)
	freeHolder.appendChild(CE('br'))
	freeHolder.appendChild(CE('input', 'type|text', 'style|width:30px; margin:0px 10px;'))
	var free = freeHolder.appendChild(CE('select', 'name|Free'))
	free.appendChild(CE('option', 'value|0', 'text|\u25c4 Free Pulls \u25ba'))
	if (storageContents)
		populateFromVar()
	else
		populateFromPage()

	function populateFromVar()
	{
		for (var item in storageContents)
		{
			var which = storageContents[item][2] ? free : pulls
				which.appendChild(CE('option', 'value|' + storageContents[item][0], 'text|' + item + ' (' + storageContents[item][1] + ')'))
			if (free.childNodes.length >= 2)
				freeHolder.style.display = 'block'
		}
	}
	
	function populateFromPage()
	{
		var allItems = [], freeItems = [], done = 1, frag = CE('div'), storageContents = {}
		var freebies = [894, 897, 898, 899, 914, 924, 954, 961, 1026, 1081, 1083, 1242, 1263, 1304, 1307, 1308, 1349, 1373, 1488, 1536, 1599, 1621, 1649, 1703, 1923, 1961, 1967, 1970, 1995, 2019, 2190, 2206, 2380, 2447, 2650, 2836, 2845, 2937, 2939, 3042, 3055, 3216, 3219, 3220, 3280, 3351, 3431, 3434, 3481, 3482, 3578, 3618, 3799, 3946, 3947, 3999, 4148, 4190, 4223, 4227, 4228, 4274, 4328, 4468, 4507, 4574, 4619, 4732, 4734, 4939, 4940]
		var extraFreebies = GM_getValue('extraFreebies', '')
		if (extraFreebies != '')
			extraFreebies = extraFreebies.split('|')
		for (var n = 0; n < extraFreebies.length; n++)
		{
			if (extraFreebies[n])
				freebies.push(+extraFreebies[n])
		}
		GM_GET('http://' + window.location.host + '/storage.php?which=1', inject)

		function inject(text)
		{
			frag.innerHTML = text
			var items = $('b.ircm', true, frag)
			items.forEach(function (i) {
				var quant = i.nextSibling.nextSibling.textContent.match(/\d+/)
				quant = quant ? +quant[0] : 1
				var itemNum = +i.parentNode.id.slice(1)
				if (freebies.indexOf(itemNum) != -1)
					freeItems.push([i.textContent, itemNum, quant])
				else
					allItems.push([i.textContent, itemNum, quant])
			})
			if (done < 3)
				GM_GET('http://' + window.location.host + '/storage.php?which=' + ++done, inject)
			else
			{
				if (freeItems.length > 0)
				{
					freeItems.sort(function (a, b) {return a[0].toLowerCase() > b[0].toLowerCase()})
					freeItems.forEach(function (i) {
						free.appendChild(CE('option', 'value|' + i[1], 'text|' + i[0] + ' (' + i[2] + ')'))
						storageContents[i[0]] = [i[1], i[2], true]
					})
					freeHolder.style.display = 'block'
				}
				allItems.sort(function (a, b) {return a[0].toLowerCase() > b[0].toLowerCase()})
				allItems.forEach(function (i) {
					pulls.appendChild(CE('option', 'value|' + i[1], 'text|' + i[0] + ' (' + i[2] + ')'))
					storageContents[i[0]] = [i[1], i[2]]
				})
				GM_setValue(charName + '.storageContents', JSON.stringify(storageContents))
			}
		}
	}
}


function pullList()
{
	if (pullsRemaining == 0 && this.value != 'Free Pull')
		return hawHaw()
	var pullsRequested = 0, requests = 0, report = []
	var getString = '/storage.php?action=pull&pwd=' + unsafeWindow.pwd
	$('input[type = text]', true, this.parentNode).forEach(function (i)
	{
		var selected = i.nextSibling.options[i.nextSibling.selectedIndex]
		if (selected.value == 0)
			return
		var thisQuant = parseInt(i.value)
		var data = selected.textContent.match(/(.+)\s\((\d+)\)/)
		var maxQuant = parseInt(data[2])
		if (thisQuant > maxQuant)
			i.value = thisQuant = maxQuant
		pullsRequested += thisQuant
		if (thisQuant >= 1)
		{
			report.push(thisQuant + ' ' + data[1]);
			getString += '&whichitem' + ++requests + '=' + selected.value + '&howmany' + requests + '=' + thisQuant
		}
	})
	if (!report.length)
		return
	if (pullsRemaining > 0 && pullsRequested > pullsRemaining)
		return hawHaw()
	GM_GET('http://' + window.location.host + getString, function (text) 
	{
		pullsRemaining -= pullsRequested
		$('.pullsLeft', true).forEach(function (p) {p.textContent = pullsRemaining})
		displayReport('You took ' + report.join(', ') + ' from Hagnk\'s.', 'Items pulled:', '', true);
		for each (var item in report)
		{
			var start = item.search(/\s/)
			var iName = item.slice(start + 1)
			if (!storageContents[iName])
				continue
			storageContents[iName][1] -= item.slice(0, start)
			if (storageContents[iName][1] == 0)
				delete storageContents[iName]
		}
		GM_setValue(charName + '.storageContents', JSON.stringify(storageContents))
		if ($('.Pulls'))
		    $('.Pulls').style.display = 'none'
		$('#retroHagnk').parentNode.removeChild($('#retroHagnk'))
		buildDDLs()
	})
	
	function hawHaw()
	{
		displayReport('Hagnk turns to you with a sigh and says, "Remember that time whegn I told you that you could take only ' + pullsRemaining + ' thigngs today? Yeah? Well that rule is still ign effect."', 'Gno cagn do', 'Error', true);
	}
}

function countPulls(e)
{
	if (e.target.id == 'newCache')
		return
	var total = 0
	$('input[type = text]', true, document.activeElement.parentNode.parentNode).forEach(function (i)
	{
		if (i.name)
			return
		var selected = i.nextSibling.options[i.nextSibling.selectedIndex]
		if (isNaN(i.value) || selected.value == 0)
		{
			i.value = null
			return
		}
		var thisQuant = +i.value
		var maxQuant = +selected.textContent.match(/\((\d+)\)/)[1]
		if (thisQuant > maxQuant)
			i.value = thisQuant = maxQuant
		total += thisQuant
	})
	if (document.activeElement.type != 'text' || document.activeElement.nextSibling.name == 'Free')
		return
	if (total == 0)
	{
		if ($('.Pulls'))
			$('.Pulls').style.display = 'none'
	}
	else
		displayReport(total + (pullsRemaining == -1 ? '' : '/' + pullsRemaining), 'Pulls', 'Pulls');
}

function listenForGraphicalPulls(e)
{
	if (e.keyCode && e.keyCode == 13 && document.activeElement.type == 'text')
		//enter key how many button
		var pullQuant = document.activeElement.value
	else if (!e.target.className)
		//non-links and section toggle links
		return
	else if (e.target.value == 'Pull')
		//click how many button
		var pullQuant = e.target.previousSibling.previousSibling.value
	else if (e.target.className.indexOf('takelink') != -1)
	{
		itemName = e.target.parentNode.parentNode.firstChild.textContent
		if (e.target.getAttribute('onclick'))
			//click [some]
			return
		var pullQuant = e.target.href.match(/howmany1=(\d+)/)[1]
	}
	if (isNaN(pullQuant))
		return
	storageContents[itemName][1] -= +pullQuant
	if (storageContents[itemName][1] <= 0)
		delete storageContents[itemName]
	GM_setValue(charName + '.storageContents', JSON.stringify(storageContents))
}

function buildSettings()
{
	displayReport('<input id=FSD type=button class=button value="Force storage download" style="margin:10px"><hr width=70%><br><input id=newCache width=200px type=text value="[item number]"><br><input id=FPB type=button class=button value="Add to free pull list" style="margin:10px;"><br><span id=FPR style="visibility:hidden; height:1em">Free pull added</span>', 'Hagnk\'s Retro Settings', 'Settings')
	$('#reportDivSettings').setAttribute('style', 'width:220px; top:40%; left:20%;')
	$('#FPB').addEventListener('click', addToFreebies, false)
	$('#FSD').addEventListener('click', function () {GM_deleteValue(charName + '.storageContents')}, false)
	
	function addToFreebies()
	{
		var num = this.previousSibling.previousSibling.value.match(/(\d+)/)
		if (!num)
			return
		num = +num[1]
		this.previousSibling.previousSibling.value = null
		var free = GM_getValue('extraFreebies', '')
		free += num + '|'
		GM_setValue('extraFreebies', free)
		for each (var arr in storageContents)
		{
			if (arr[0] == num && !arr[2])
			{
				arr[2] = true
				$('#FPR').style.visibility = 'visible'
				setTimeout(function () {$('#FPR').style.visibility = 'hidden'}, 1500)
				GM_setValue(charName + '.storageContents', JSON.stringify(storageContents))
				break
			}
		}
	}
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
	if (all)
		return Array.prototype.slice.call(scope.querySelectorAll(selector));
	else
		return scope.querySelector(selector);
}

function displayReport(contents, title, type, fade, reload, pos)
{
	//feedback window for user, shows errors, results
	var thisDiv = $('#reportDiv' + type);
	if (thisDiv)
	{
		if (contents)
			thisDiv.childNodes[2].innerHTML = contents;
		if (title)
			thisDiv.childNodes[0].textContent = title;
		thisDiv.style.display = 'block';
	}
	else
	{
		var div = document.body.appendChild(CE('div', 'id|reportDiv' + type, 'class|reportDiv ' + type));
		if (pos)
			div.style.position = pos;
		div.appendChild(CE('div', 'class|reportHeading', 'text|' + (title || 'Results:')));
		var buttonClose = div.appendChild(CE('div', 'class|closeButton','text|\u00D7'));//alt-0215
		buttonClose.addEventListener('click', function () {this.parentNode.style.display = 'none';}, false);	
		var readout = div.appendChild(CE('center', 'style|margin:5px'));
		readout.innerHTML = contents;
	}
	if (fade)
		setTimeout(function () {$('#reportDiv' + type).style.display = 'none'}, 5000);
	if (reload)
		setTimeout(function () {window.location.reload()}, 5000);
}

function getCharName()
{
	var charName = GM_getValue('CurrentCharName', null);
	if (!charName)
	{
		var charNameNode = $('b', false, top.frames[1].document);
		if (!charNameNode)
			return
		charName = charNameNode.textContent;
		GM_setValue('CurrentCharName', charName);
	}
	return charName
}

function GM_GET(target, callback) {
   //OTT is great!
	GM_xmlhttpRequest({
		method:'GET',
		url:target,
		onload:function (details) {callback(details.responseText);}
   });
}