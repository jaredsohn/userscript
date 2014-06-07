// ==UserScript==
// @name           KoL Graphical Pull Lists
// @namespace      KoLCtH
// @description		KoL UI Enhancement. A drag and drop graphical interface for creating lists of pulls at Hagnk's Ancestral Storage.
// @include        http://127.0.0.1*storage.php*
// @include        *kingdomofloathing.com/storage.php*
// ==/UserScript==
//Version 1.2: Numerous tweaks and updates. List window and setting windows are draggable. Script delays running until GS finishes loading the DB. 

if (!$('[class = "button TAKE"]'))
{
	var notReady = setInterval(function () 
	{
		if ($('[class = "button TAKE"]'))
		{
			clearInterval(notReady); 
			initializePullLists()
		}
	}, 1000)
}	
else
	initializePullLists()

function initializePullLists()
{
	if (GM_getValue('firstRun', true))
		showTutorial()
	
	//these variables are intentionally global in scope
	holderIsBeingDragged = false
	tabInfo = JSON.parse(GM_getValue('tabInfo', '{}'))
	tabCount = tabInfo.tabCount || 4
	
	document.addEventListener('dragstart', dragHandler, false)
	document.addEventListener('dragover', mouseMove, false)
	document.addEventListener('drop', dropHandler, false)
	var style = 
		'.tabTab {position:absolute; height:32px; border:solid black 3px; border-bottom-width:0px; text-align:center; line-height:30px; -moz-border-radius-topleft:8px; -moz-border-radius-topright:8px; overflow:hidden; cursor:default;} \
		.Back {background-color:lightblue; z-index:49} \
		.Fore {background-color:white; z-index:51} \
		.tabBody {position:absolute; top:32px; height:310px; background-color:white; border-top:solid black 3px; overflow-y:auto; padding:15px; counter-reset:stacks} \
		div.tabBody div.draggableNode:before {counter-increment:stacks; content:counter(stacks)": "; color:blue; font-weight:bold} \
		.arrows {font-weight:bold; font-size:32pt; position:absolute; top:0px; z-index:52; border: solid black thin; background-color:gray; height:30px; line-height:24px; vertical-align:bottom; cursor:default}'
	GM_addStyle(style)
	
	$('div.draggableNode', true).forEach(function (d)
	{
		d.setAttribute('draggable', 'true')
		d.childNodes[1].setAttribute('draggable', 'false')
	})

	$('[class = "button TAKE"]', true).forEach(function (l)
	{
		var tabsButton = l.parentNode.insertBefore(CE('input', 'type|button', 'class|button', 'value|Open pull list window', 'style|margin:10px 20px'), l.nextSibling.nextSibling)
		tabsButton.addEventListener('click', buildTabs, false)
		var settingsButton = l.parentNode.insertBefore(CE('input', 'type|button', 'class|button', 'value|Open settings window', 'style|margin:10px 20px'), l.nextSibling.nextSibling)
		settingsButton.addEventListener('click', buildSettings, false)
	})
}

function buildTabs()
{
	var pullListHolder = $('#pullListHolder')
	if (pullListHolder)
	{
		//toggle off and on with button
		pullListHolder.style.display = pullListHolder.style.display == 'none' ? 'block' : 'none'
		return
	}
	var maxWidth = 350
	var tabWidth = parseInt(tabInfo.tabWidth) || 50
	var width = ((tabWidth + 10) * tabCount) - 40
	if (width > maxWidth)
		var widthOverflow = width - maxWidth
	width = width < 250 ? 250 : width > maxWidth ? maxWidth : width
	var holderPosition = GM_getValue('pullListHolderPosition', '500px|75px').split('|')
	var holder = document.body.appendChild(CE('div', 'id|pullListHolder', 'style|position:fixed; height:455px; overflow-x:hidden; z-index:50; width:' + (width + 36) + 'px; left:' + holderPosition[0] + '; top:' + holderPosition [1] + ';'))
	var tabHolder = holder.appendChild(CE('div', 'id|tabHolder','style|position:relative; left:-5px; height:32px; width:' + (width + 30) + 'px;', 'draggable|true'))
	var bodyHolder = holder.appendChild(CE('div', 'style|border: solid black; border-width:0px 3px; height:340px'))
	holder.appendChild(CE('div', 'class|closeButton', 'text|\u00D7', 'style|top:35px; right:3px;'));
	for (var i=0;i<tabCount;i++)
	{
		tabHolder.appendChild(CE('div', 'id|tab' + i, 'class|tabTab Back', 'style|width:' + tabWidth + 'px; left:' + ((tabWidth + 10) * i + 5) + 'px;', 'text|List' + (i + 1)))
		bodyHolder.appendChild(CE('div', 'id|tabBody' + i, 'class|tabBody','style|width:' + width + 'px;'))
	}
	var buttonHolder = holder.appendChild(CE('div', 'style|background-color:white; height:80px; text-align:center; border:solid black; border-width:0px 3px 3px;'))
	buttonHolder.appendChild(CE('input', 'id|pullListButton', 'class|button', 'style|position:relative; top:12px', 'value|Pull the things in this list', 'type|button'))
	buttonHolder.appendChild(CE('br'))
	buttonHolder.appendChild(CE('input', 'id|deleteListButton', 'class|button', 'style|position:relative; top:28px', 'value|Delete this list', 'type|button'))
	buttonHolder.appendChild(CE('input', 'style|position:relative; top:28px','type|checkbox'))
	holder.addEventListener('click', function (e)
	{
		if (e.target.className == 'tabQuant')
			e.target.select()
		else if (e.target.className == 'closeButton')
			e.target.parentNode.style.display = 'none'
		else if (e.target.className == 'tabTab Back')
			raiseTab(e.target.id.substr(3))
		else if (e.target.id == 'pullListButton')
			pullList()
		else if (e.target.id == 'deleteListButton')
		{
			if (!e.target.nextSibling.checked)
				return alert('If you\'re sure you want to delete this list, click the checkbox too.')
			var tabNum = $('.Fore').id.substr(3)
			$('#tabBody' + tabNum).innerHTML = ''
			exportTabInfo()
			e.target.nextSibling.checked = false
		}
	}, false)
	holder.addEventListener('keyup', function (e)
	{
		if (e.target.className == 'tabQuant')
			exportTabInfo()
	}, false)
	importTabInfo()
	raiseTab(0)
	var TO
	if (widthOverflow)
		buildArrows()
	
	function buildArrows()
	{
		var LA = CE('span', 'id|leftArrow', 'class|arrows', 'style|left:-3px', 'text|\u2039')
		var RA = CE('span', 'id|rightArrow', 'class|arrows', 'style|right:-3px', 'text|\u203A')
		tabHolder.style.left = '9px'
		holder.appendChild(LA)
		holder.appendChild(RA)
		LA.addEventListener('mouseover', scrollTabs, false)
		LA.addEventListener('mouseout', function() {
			clearInterval(TO)
		}, false)
		RA.addEventListener('mouseover', scrollTabs, false)
		RA.addEventListener('mouseout', function() {
			clearInterval(TO)
		}, false)
	}

	function scrollTabs()
	{
		var position = parseInt(tabHolder.style.left)
		var thisId = this.id
		TO = setInterval(function ()
		{
			if (thisId == 'leftArrow')
				position = Math.min(9, (position + 15))
			else
				position = Math.max(-widthOverflow - 19, (position - 15))
			tabHolder.style.left = position + 'px'
		}, 50)
	}
}

function buildSettings()
{
	var settingsHolder = $('#settingsHolder')
	if (settingsHolder)
	{
		settingsHolder.style.display = settingsHolder.style.display == 'none' ? 'block' : 'none'
		return
	}
	var tabWidth = tabInfo.tabWidth || 50
	var holderPosition = GM_getValue('settingsHolderPosition', '75px|75px').split('|')
	var holder = CE('div', 'id|settingsHolder', 'style|position:fixed; width:200px; background-color:white; border:solid blue 2px; outline:white 1px solid; z-index:50; text-align:center; line-height:30px; left:' + holderPosition[0] + '; top:' + holderPosition[1])
	holder.appendChild(CE('div', 'id|settingsHeading', 'text|Pull list settings', 'draggable|true', 'style|font-weight:bold; color:white; background-color:blue; line-height:1.4em; cursor:default'))
	var buttonClose = holder.appendChild(CE('div', 'class|closeButton', 'text|\u00D7'));
	buttonClose.addEventListener('click', function () {this.parentNode.style.display = 'none';}, false);	
	var span = holder.appendChild(CE('span', 'text|Number of tabs: '))
	span.appendChild(CE('input', 'id|tabCount', 'style|width:30px', 'type|text', 'value|' + tabCount))
	holder.appendChild(CE('br'))
	var span = holder.appendChild(CE('span', 'text|Width of tabs: '))
	span.appendChild(CE('input', 'id|tabWidth', 'style|width:30px', 'type|text', 'value|' + tabWidth))
	var fieldset = holder.appendChild(CE('fieldset', 'id|tabNames', 'style|margin:0px 15px'))
	fieldset.appendChild(CE('legend', 'text|Tab Names'))
	var FSH = fieldset.appendChild(CE('div', 'style|overflow-y:auto; height:175px;'))
	for (var i=0;i<tabCount;i++)
	{
		var tabText = tabInfo['tab' + i] ? tabInfo['tab' + i].tabName : 'List' + (i + 1)
		var div = FSH.appendChild(CE('div', 'text|Tab ' + (i + 1) + ': '))
		div.appendChild(CE('input', 'id|tabName' + i, 'class|tabName', 'style|width:70px', 'type|text', 'value|' + tabText))
	}
	var button = holder.appendChild(CE('input', 'id|saveButton', 'class|button', 'style|margin:15px', 'type|button', 'value|Save settings'))
	button.addEventListener('click', saveSettings, false)
	var button = holder.appendChild(CE('input', 'id|saveButton', 'class|button', 'style|margin:5px', 'type|button', 'value|Show tutorial window'))
	button.addEventListener('click', showTutorial, false)
	document.body.appendChild(holder)
	
	function saveSettings()
	{
		var fields = $('input[type=text]', true, this.parentNode)
		if ((tabInfo.tabCount != fields[0].value) || (tabInfo.tabWidth != fields[1].value))
			var redraw = true
		if (isNaN(fields[0].value) || fields[0].value <= 0)
			fields[0].value = tabCount
		if (isNaN(fields[1].value) || fields[1].value <= 0)
			fields[1].value = tabWidth
		tabInfo.tabCount = fields[0].value
		tabCount = fields[0].value
		tabInfo.tabWidth = fields[1].value
		for (var i=2;i<fields.length;i++)
		{
			if (fields[i].value)
				$('#tab' + fields[i].id.substr(7)).textContent = fields[i].value
			var thisTab = 'tab' + (i-2)
			if (tabInfo[thisTab])
				tabInfo[thisTab].tabName = fields[i].value
			else
				tabInfo[thisTab] = {tabName:fields[i].value}
		}
		if (redraw)
		{
			document.body.removeChild($('#pullListHolder'))
			buildTabs()
			document.body.removeChild($('#settingsHolder'))
			buildSettings()
		}
	}
}

function importTabInfo()
{
	var imgAllowed = $('img', false, $('.draggableNode'))
	for (var i=0;i<tabCount;i++)
	{
		var tabBody = $('#tabBody' + i)
		var thisTab = 'tab' + i
		if (tabInfo[thisTab])
		{
			for (var thisItem in tabInfo[thisTab])
			{	
				if (thisItem == 'tabName')
				{
					$('#' + thisTab).textContent = tabInfo[thisTab][thisItem]
					continue
				}
				var cloneTarget = $('#' + tabInfo[thisTab][thisItem].itemNum)
				if (cloneTarget)
				{
					var clone = cloneTarget.parentNode.cloneNode(true)
					clone.firstChild.className = 'tabQuant'
				}
				else
				{
					var clone = CE('div', 'class|draggableNode', 'draggable|true')
					var contents = '<input type="text" style="width:25px" class="tabQuant" maxQuant="0">'
					if (imgAllowed)
						contents += '<img src="http://images.kingdomofloathing.com/itemimages/confused.gif" class="hand" style="vertical-align:bottom" draggable="false">'
					contents += '<span id="' + tabInfo[thisTab][thisItem].itemNum + '" quant="0">' + tabInfo[thisTab][thisItem].name + ' (0)</span>'
					clone.innerHTML = contents
				}
				clone.firstChild.value = tabInfo[thisTab][thisItem].quant
				tabBody.appendChild(clone)
			}
		}
	}
}

function exportTabInfo()
{
	var tabNum = $('.Fore').id.substr(3)
	var tabBody = $('#tabBody' + tabNum)
	if (!tabBody)
		return
	var thisTab = 'tab' + tabNum
	if (!tabInfo[thisTab])
		tabInfo[thisTab] = {}
	if (tabBody.childNodes.length)
	{
		var spans = $('span', true, tabBody)
		spans.forEach(function (s, j)
		{
			var tempQ = parseInt(s.parentNode.firstChild.value)
			tabInfo[thisTab]['item' + j] = {itemNum:s.id, name:s.textContent.match(/[^\(]+/)[0], quant:(tempQ || 0)}
		})
		//delete last item in the tab (if an item is being added, this will be blank anyway, 
		//if an item is being removed, this will be the extra item at the end after the others are moved up a notch)
		delete tabInfo[thisTab]['item' + spans.length]
	}
	else
	{
		var name = tabInfo[thisTab].tabName || 'List' + ++tabNum
		tabInfo[thisTab] = {tabName:name}
	}
	GM_setValue('tabInfo', JSON.stringify(tabInfo))
	countItemsInList(tabBody)
}

function dragHandler(e)
{
	if (e.target.nodeType == 3)
		return
	//gather info about the item being dragged
	if (e.target.id == 'tabHolder' || e.target.id == 'settingsHeading')
	{
		//dragging the whole sub-window
		holderIsBeingDragged = true
		e.dataTransfer.setData('thisId', e.target.parentNode.id)
		e.dataTransfer.setData('offsetX', e.clientX - parseInt(e.target.parentNode.style.left))
		e.dataTransfer.setData('offsetY', e.clientY - parseInt(e.target.parentNode.style.top))
	}
	else if (e.target.className == 'draggableNode')
	{
		//dragging only an item node
		e.dataTransfer.setData('parent', e.target.parentNode.tagName.toLowerCase())
		e.dataTransfer.setData('thisId', e.target.lastChild.id)
		e.dataTransfer.setData('quant', e.target.firstChild.value)
	}
}

function mouseMove(e)
{
	e.preventDefault()
	if (holderIsBeingDragged)
	{
		var draggedHolder = $('#' + e.dataTransfer.getData('thisId'))
		draggedHolder.style.zIndex = 55
		draggedHolder.style.left = e.clientX - e.dataTransfer.getData('offsetX') + 'px'
		draggedHolder.style.top = e.clientY - e.dataTransfer.getData('offsetY') + 'px'
	}
}

function dropHandler(e)
{
	e.preventDefault()
	var thisId = e.dataTransfer.getData('thisId')
	if (!thisId)
		//non node (e.g. text) dragged in
		return
	if (thisId == 'settingsHolder' || thisId == 'pullListHolder')
	{
		//sub-window being dropped
		holderIsBeingDragged = false
		var draggedHolder = $('#' + thisId)
		draggedHolder.style.zIndex = 50
		GM_setValue(thisId + 'Position', draggedHolder.style.left + '|' + draggedHolder.style.top)
		return
	}
	var tabNum = $('.Fore').id.substr(3)
	var dropZone = $('#tabBody' + tabNum)
	var draggedNode = $('#' + thisId, false, dropZone)
	//dropping node in sub-window, check for dupes then copy in
	if (droppedInDropZone(e.target, 'tabBody'))
	{
		//dragged node is already here, no more than 20 nodes per list
		if (draggedNode || dropZone.childNodes.length >= 20)
			return
		var div = $('#' + thisId).parentNode.cloneNode(true)
		div.firstChild.className = 'tabQuant'
		div.firstChild.value = e.dataTransfer.getData('quant')
		dropZone.appendChild(div)
		exportTabInfo()
	}
	else if (draggedNode)
	{
		//dropping node out of subwindow, remove it
		if (e.dataTransfer.getData('parent') == 'td')
			return
		draggedNode.parentNode.parentNode.removeChild(draggedNode.parentNode)
		exportTabInfo()
	}
	
	function droppedInDropZone(node, className)
	{
		while(node.parentNode)
		{
			if (node.className == className)
				return true
			node = node.parentNode
		}
		return false
	}
}

function pullList()
{
	var hagnk = document.body.textContent.match(/You may (not )?take (\d+)?(as many)?/)
	var pullsRemaining = hagnk[1] ? 0 : hagnk[2] ? hagnk[2] : -1
	if (pullsRemaining != -1)
	{
		var itemCount = parseInt($('#pullListButton').value.match(/\d+/)[0])
		if (itemCount > pullsRemaining)
		{
			if ($('#reportDivError'))
				$('#reportDivError').style.display = 'block'
			else
				displayReport('Hagnk turns to you with a sigh and says, "Remember that time whegn I told you that you could take only ' + pullsRemaining + ' thigngs today? Yeah? Well that rule is still ign effect."','Gno cagn do', 'Error', true, false, 'fixed')
			return
		}
	}
	var tabNum = $('.Fore').id.substr(3)
	var tabBody = $('#tabBody' + tabNum)
	var tempPullList = $('.draggableNode', true, tabBody).filter(function (n) {
		return n.firstChild.value > 0 && n.firstChild.getAttribute('maxQuant') > 0
	})
	if (tempPullList.length == 0)
		return
	var requestStrings = []
	var report = []
	var pullList = tempPullList.forEach(function (pli, index)
	{
		var a = parseInt(pli.firstChild.value)
		var b = parseInt(pli.firstChild.getAttribute('maxQuant'))
		var thisQuant = a > b ? b : a
		if (thisQuant <= 0)
			return
		var whichRequest = Math.floor(index / 10)
		var whichIndex = (index % 10) + 1
		if (whichIndex == 1) 
			requestStrings[whichRequest] = 'pwd=' + $('[name=pwd]').value + '&action=take'
		requestStrings[whichRequest] += '&whichitem' + whichIndex + '=' + pli.lastChild.id.substr(2) + '&howmany' + whichIndex + '=' + thisQuant
		var and = ''
		if (tempPullList.length > 1 && index == tempPullList.length - 1)
			and = ' and '
		report.push(and + thisQuant + ' ' + pli.lastChild.textContent.match(/(.+)\s\(/)[1])
	})
	var finalReport = 'You took ' + report.join(', ') + ' from Hagnk\'s.'
	recurse_GM_post(0)
	
	function recurse_GM_post(counter)
	{
		GM_post('/storage.php', requestStrings[counter], function (res)
		{
			if (counter == requestStrings.length - 1)
				displayReport(finalReport, 'Items pulled:', '', true, true, 'fixed')
			else
				recurse_GM_post(++counter)
		})
	}
}

function countItemsInList(tab)
{
	var stackCount = tab.childNodes.length, itemCount = 0
	var stacks = $('input', true, tab)
	stacks.forEach(function (s)
	{
		var a = parseInt(s.value) || 0
		var b = parseInt(s.getAttribute('maxQuant'))
		itemCount += Math.min(a, b)
	})
	$('#pullListButton').value = 'Pull ' + itemCount + ' things in ' + stackCount + ' stacks from this list'
	return itemCount
}

function raiseTab(whichTab)
{
	var tabs = $('.tabTab', true)
	var bodies = $('.tabBody', true)
	//bring tab and tabBody to front
	tabs[whichTab].className = 'tabTab Fore'
	bodies[whichTab].style.zIndex = '50'
	countItemsInList(bodies[whichTab])
	for (var i=0;i<tabCount;i++)
	{
		if (i == whichTab)
			continue
		//change all others tabs' style to background
		tabs[i].className = 'tabTab Back'
		bodies[i].style.zIndex = '40'
	}
}

function showTutorial()
{
	displayReport('<h3>Welcome to KoL Graphical Pull Lists</h3>To get started, click the button marked "Open pull list window". Drag an item from Hagnk\'s storage into that new window. Type how many you want to take in the text box. Hooray, you made a pull list. You can have as many pull lists as you like, each in a separate tab in the list window. Click the button marked "Open settings window" and you can choose number of tabs, and the width and name for each one. You can also drag around (drag by the top bar) or close (click on the friendly X) each of the windows to get them out of your way while you look for something. If you want to remove an item from a list, drag it out.<br>Easy like pie.', 'Tutorial', 'Tutorial', false, false)
	$('#reportDivTutorial').style.zIndex = 40
	GM_setValue('firstRun', false)
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
	var thisDiv = $('#reportDiv' + type)
	if (thisDiv)
	{
		if (contents)
			thisDiv.childNodes[2].innerHTML = contents
		if (title)
			thisDiv.childNodes[0].textContent = title
		thisDiv.style.display = 'block'
	}
	else
	{
		var div = document.body.appendChild(CE('div', 'id|reportDiv' + type, 'class|reportDiv ' + type))
		if (pos)
			div.style.position = pos
		div.appendChild(CE('div', 'class|reportHeading', 'text|' + (title || 'Results:')))
		var buttonClose = div.appendChild(CE('div', 'class|closeButton','text|\u00D7'));//alt-0215
		buttonClose.addEventListener('click', function () {this.parentNode.style.display = 'none';}, false);	
		var readout = div.appendChild(CE('center', 'style|margin:5px'))
		readout.innerHTML = contents
	}
	if (fade)
		setTimeout(function () {$('#reportDiv' + type).style.display = 'none'}, 5000)
	if (reload)
		setTimeout(function () {window.location.reload()}, 5000)
}

function GM_post(page, info, callback) {
	if (page.indexOf('http') == -1)
		page = 'http://' + window.location.host + page
	GM_xmlhttpRequest({
		method: 'POST',
		url: page,
		data: info,
		headers: {"Content-Type": "application/x-www-form-urlencoded"}, 
		onload: function (details) {
			callback(details.responseText);
		}
	});
}