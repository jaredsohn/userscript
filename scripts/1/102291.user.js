// ==UserScript==
// @name           Sell Stuff Helper Rewrite
// @namespace      KoLCtH
// @author			Charon the Hand
// @contributor		One Ton Tomato
// @version 		1.0
// @description		KoL UI Enhancement. Replicates the function of a lost OTT script, allows you to mark items on the autosell page and select them all as a group, or make them off limits to autoselling.
// @include        http://*kingdomofloathing.com/sellstuff*
// @include        http://127.0.0.1:*/sellstuff*
// ==/UserScript==
(function ()
{

	var whichPage = window.location.pathname.indexOf('ugly');
	var listNames = [null, 'Important', 'Sell_All', 'Keep_One'];
	var listColors = ['white', 'rgb(255, 102, 102)', 'rgb(153, 204, 153)', 'rgb(153, 204, 255)'];
	var listContents = {};
	var sellButton = $('.button');
	sellButton.addEventListener('click', confirmImportant, false);
	var div = sellButton.parentNode.appendChild(CE('div'));
	for (n = 1; n < listNames.length; n++)
	{
		var temp = GM_getValue(listNames[n], null);
		if (!temp)
			temp = [];
		else if (temp.indexOf('|') != -1)
			temp = temp.split('|');
		else
			temp = [temp];
		listContents[listNames[n]] = temp;
		listColors[n] = GM_getValue(listNames[n] + 'Color', listColors[n]);
		if (n == 1)
			continue;
		var button = div.appendChild(CE('input', 'id|' + listNames[n], 'class|button', 'type|button', 'style|margin:10px 5px;', 'value|Toggle list: ' + listNames[n].replace('_', ' ')));
		button.addEventListener('click', toggleList, false);
	}
	var wrench = div.appendChild(CE('img', 'src|http://images.kingdomofloathing.com/itemimages/wrench.gif', 'style|border:2px solid black; position:relative; top:10px;'));
	wrench.addEventListener('click', toggleSettings, false);
	changeColorAtLoad();
	if (whichPage == -1)
	{
		document.addEventListener('contextmenu', function (e) 
		{
			var tag = e.target.tagName.toLowerCase();
			if (tag == 'option')
			{
				e.preventDefault();
				var itemNum = e.target.value;
				changeColor(e.target, itemNum);
			}
		}, false);
	}
	else
	{
		document.addEventListener('contextmenu', function (e) 
		{
			var tag = e.target.tagName.toLowerCase();
			if ((tag == 'td' && e.target.previousSibling) || tag == 'b' || (tag == 'font' && e.target.getAttribute('size') == '1'))
			{
				e.preventDefault();
				var node = e.target;
				if (tag == 'font')
					node = node.parentNode;
				else if (tag == 'b')
					node = node.parentNode.parentNode;
				var itemNum = node.previousSibling.firstChild.value;
				changeColor(node, itemNum);
			}
		}, false);
	}

	function changeColor(node, iNum)
	{
		var BGColor = node.style.backgroundColor || 'white';
		var currentIndex = listColors.indexOf(BGColor);
		var newIndex = currentIndex == (listColors.length - 1) ? 0 : currentIndex + 1;
		node.style.backgroundColor = listColors[newIndex];
		if (listNames[currentIndex])
		{
			var currentList = listContents[listNames[currentIndex]];
			currentList.splice(currentList.indexOf(iNum), 1);
			GM_setValue(listNames[currentIndex], currentList.join('|'));
		}
		if (listNames[newIndex])
		{
			var newList = listContents[listNames[newIndex]];
			newList.push(iNum);
			GM_setValue(listNames[newIndex], newList.join('|'));
		}
	}

	function changeColorAtLoad()
	{
		for (dbName in listContents)
		{
			var thisColor = listColors[listNames.indexOf(dbName)];
			if ($('#' + dbName))
				$('#' + dbName).style.backgroundColor = GM_getValue(dbName + 'Color', thisColor);
			if (listContents[dbName].length > 0)
			{
				for (item in listContents[dbName])
				{
					var node = $('[value = "' + listContents[dbName][item] + '"]');
					if (!node)
						continue
					if (whichPage == -1)
						node.style.backgroundColor = thisColor;
					else 
						node.parentNode.nextSibling.style.backgroundColor = thisColor;
				}
			}
		}
	}

	function toggleList()
	{
		var radio = whichPage == -1 ? 'type' : 'mode'
		$('[name = ' + radio + ']', true)[listNames.indexOf(this.id) - 2].checked = true;
		for (var iNum in listContents[this.id])
		{
			var tog = $('[value = "' + listContents[this.id][iNum] + '"]');
			if (!tog)
				continue
			if (whichPage == -1)
				tog.selected = !tog.selected;
			else
				tog.checked = !tog.checked;
		}
	}

	function confirmImportant(e)
	{
		e.preventDefault();
		var anyChecked = listContents.Important.some(function (imp)
		{
			var node = $('[value = "' + imp + '"]')
			if (!node)
				return false
			return node.selected || node.checked;
		});
		if (anyChecked)
		{
			if (!confirm("You have an item marked as important slated for sale, are you sure you want to sell it?"))
				return;
		}
		document.forms[0].submit();
	}

	function toggleSettings(e)
	{
		var settingsDiv = $('#settingsDiv');
		if (settingsDiv)
		{
			settingsDiv.style.display = 'block';
			return;
		}
		settingsDiv = $('body').appendChild(CE('div', 'id|settingsDiv', 'style|position:fixed; text-align:center; top:30%; right:20%;background-color:white; border:2px solid blue;'));
		settingsDiv.appendChild(CE('span', 'text|Change colors for lists:'));
		var close = settingsDiv.appendChild(CE('img', 'src|http://images.kingdomofloathing.com/closebutton.gif', 'style|position:absolute; top:1px; right:1px;'));
		close.addEventListener('click', function () {this.parentNode.style.display = 'none'}, false);
		settingsDiv.appendChild(CE('br'));
		for (var n = 1; n < listNames.length; n++)
		{
			var button = settingsDiv.appendChild(CE('span', 'id|' + listNames[n], 'style|width:80px; height:30px; border:2px solid black; font-weight:bold; margin:5px; display:inline-block; background-color: ' + listColors[n], 'text|' + listNames[n].replace('_', ' ')));
			button.addEventListener('click', pickColor, false);
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

	function pickColor()
	{
		this.className = 'picking';
		if ($('#colorPicker'))
		{	
			$('#colorPicker').style.display = 'block';
			return;
		}
		var allColors = [];
		var combo = ['66', '99', 'CC', 'FF'];
		var len = combo.length;
		for (i=0;i<len;i++)
		{
			for (j=0;j<len;j++)
			{
				for (k=0;k<len;k++)
				{
					allColors.push('#' + combo[i] + combo[j] + combo[k]);
				}
			}
		}	
		var div = document.body.appendChild(CE('div', 'id|colorPicker','style|position:fixed; top:45%; right:13%; z-index:100; cursor:default; background-color:white; padding:3px; border:3px solid black;'));
		div.addEventListener('click', setColor, false);
		var limit = Math.pow(len, 2);
		GM_addStyle('.colorBlock {display:inline-block; border:1px black solid; width:24px; height:24px;}');
		for (var n=0;n<allColors.length;n++)
		{
			div.appendChild(CE('span', 'class|colorBlock', 'style|background-color:' + allColors[n], 'text|\u00AD'));
			if (n % limit == limit - 1)
				div.appendChild(CE('br'));
		}
		
		function setColor(e)
		{
			if (e.target.id)
				return;
			var whichList = $('.picking');
			listColors[listNames.indexOf(whichList.id)] = whichList.style.backgroundColor = e.target.style.backgroundColor;
			whichList.className = null;
			this.style.display = 'none';
			GM_setValue(whichList.id + 'Color', e.target.style.backgroundColor);
			changeColorAtLoad();
		}
	}
})();