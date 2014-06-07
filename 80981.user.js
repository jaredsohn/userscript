// ==UserScript==
// @name           KoL Graphical Storage
// @namespace      KolCtH
// @version			1.4.0
// @include        *kingdomofloathing.com/storage.php*
// @include        *kingdomofloathing.com/clan_stash.php*
// @include        *kingdomofloathing.com/closet.php*
// @include        *kingdomofloathing.com/account.php*
// @include        http://127.0.0.1*/storage.php*
// @include        http://127.0.0.1*/clan_stash.php*
// @include        http://127.0.0.1*/closet.php*
// @include        http://127.0.0.1*/account.php*
// @description		Kingdom of Loathing UI improvement, shows graphical lists in Hagnk's storage, closet and clan stash.
// ==/UserScript==
/////////////////////////autoexecute/////////////////////////
//version 1.4 Numerous tweaks and improvements. Update function to detect script and DB changes. Script fails gracefully if DB is not present. Support for new account page. Free pulls should not choke the script anymore. Unknown items will update the DB from their own descitem windows. Ideally, this will happen only once per item. 

var TOP = window.top.wrappedJSObject

switch(window.location.pathname)
{
	case '/account.php':
		var scriptID = 'CTH_GS';
		var scriptName = 'Graphical Storage';
		buildPrefs();
		return;
	break
	break
	case '/storage.php':
	case '/closet.php':
	case '/clan_stash.php':
		var location = window.location.pathname.match(/([a-z_]+)\.php/)[1].replace('_', ' ');
		if (!GM_getValue(location + ".enabled", 'true'))
			return;
	break
}
var style = '.sectionBox {position:relative; width:98%; border:solid blue; border-width: 26px 1px 1px; margin-bottom: 5px;} \
	.sectionHeadings {position:relative; top:-24px; font-weight:bold; color:white; text-decoration:none; cursor:pointer; } \
	.sectionTables {margin: 10px 0px 25px 0px;} \
	.totop {position:absolute; top:-23px; right:10px; color:white !important; font-weight:bold; text-decoration:none;} \
	div.Pulls {width:10%; left:87%; top:12px; position:fixed;} \
	div.Pulls center {font-size:200%;} \
	div.Jump {width:40%; left:30%;} \
	.reportDiv {position:absolute; background-color:white; width:70%; top:50px; left:15%; border:blue solid 2px; outline:white 1px solid; text-align:center; z-index:100} \
	.reportHeading {font-weight:bold; color:white; background-color:blue;} \
	.closeButton {position:absolute; top:0px; right:-1px; cursor:default; font-size:28pt; font-weight:bold; line-height:.4; height:.45em; width:.6em; background-color:white; border:black 1px solid; overflow:hidden; z-index:55;} \
	div.closeButton:hover {background-color:red; border-color:white}';
GM_addStyle(style);

document.addEventListener('keyup', function (e)
{
	if (e.keyCode == 90 && e.altKey)
		jumpMenu();
	if (e.target.tagName.toUpperCase() == 'INPUT')
	{
		if (e.keyCode == 13)
			moveItems();
		else if (e.target.className.match(/box/))
			countItemsInPage(e.target);
	}
}, false)

switch (location)
{
	//annoying text problems
	case 'closet':
		var evilText = $('td>div:contains("Though your")');
		if (evilText)
			evilText.style.display = 'none';
		var evilText = $('td>div>div:contains("Note: ")');
		if (evilText)
			evilText.style.display = 'none';
	break
	case 'storage':
		var hagnk = document.body.textContent.match(/You may (not )?take (\d+)?(as many)?/);
		if (!hagnk)
			return;
		//hagnk tells you you have none, some or unlimited pulls left
		var pullsRemaining = (hagnk[1]) ? 0 : (hagnk[2]) ? hagnk[2] : -1;
		var favColor = GM_getValue('favColor', 'lightskyblue');
	break
}
var forms = $('form', true);

//closet and stash are really narrow for some reason, let them breathe
forms[0].parentNode.parentNode.parentNode.parentNode.parentNode.width = '100%';
loadDB();
checkForUpdates();


function buildTable(form)
{
	var select = $('select', false, form);
	if (!select)
		return;
	switch (form.name)
	{
		case 'addgoodies':
			var whichTable = 'PUT';
			var buttonText = 'Put items in ' + location;
		break
		case 'takegoodies':
			var whichTable = 'TAKE';
			var buttonText = 'Take items from ' + location;
		break
		case 'freepulls':
			var whichTable = 'FREE';
			var buttonText = 'Take free item from storage';
		break
		default:
			return;
		break
	}
	var unclassified = [];
	var center = document.forms[1].parentNode.parentNode.appendChild(CE('center', 'id|' + whichTable, 'style|width:100%'));
	center.appendChild(CE('br'));
	var button1 = center.appendChild(CE('input', 'class|button ' + whichTable, 'type|button', 'value|' + buttonText));
	button1.addEventListener('click', moveItems, false);
	center.appendChild(CE('br'));
	center.appendChild(CE('br'));
	var toggleSettings = JSON.parse(GM_getValue('toggleSettings' + '.' + location + '.' + whichTable, '{}'));
	var headings = [
		["Favorites", "fav"],["Food and Drink", "eat"], ["Booze", "drink"], 
		["Miscellaneous Consumables", "spleen"], ["Hats", "hats"], ["Shirts","shirts"], 
		["Melee Weapons", "melee"], ["Ranged Weapons","ranged"], ["Offhand", "offhand"], 
		["Pants", "pants"], ["Accessories", "acc"], ["Familiars and Equipment", "fam"], 
		["Miscellaneous Items",  "MiscI"], ["Combat Items", "combat"], ["Potions", "potions"], 
		["Gifts", "gift"], ["Alice's Army Cards", "AACards"], ["Bones", "bones"]
	];
	if (whichTable == 'TAKE' && location == 'storage')
		center.addEventListener('contextmenu', addFav, true);
	if (whichTable == 'FREE')
		headings = [['Free Pulls', 'free']];
	headings.forEach(function (h, index)
	{
		//build tables for items
		if (location != 'storage' && index == 0)
			//do not build favorites heading except at Hagnk's
			return;
		var section = center.appendChild(CE('div', 'id|' + h[0], 'class|sectionBox'));
		var tempHeading = h[0] + ' \u21CB '+ (whichTable == 'PUT' ? 'inventory' : location);
		var heading = section.appendChild(CE('span', 'class|sectionHeadings', 'text|' + tempHeading));
		heading.addEventListener('click', toggle, false);
		section.appendChild(CE('a', 'class|totop', 'text|\u21D1', 'href|javascript:scroll(0,0)'));
		section.appendChild(CE('br','style|line-height:0'));
		section.appendChild(CE('table', 'id|' + whichTable + '_' + h[1], 'class|sectionTables'));
		section.appendChild(CE('br','style|line-height:0'));
		var button3 = section.appendChild(CE('input', 'class|button selectAll ' + whichTable, 'style|position:relative; top:-10px', 'value|Select all in this section', 'type|button'));
        button3.addEventListener('click', selectAllInSection, false);
		//collapse sections if necessary
		if ((GM_getValue('collapsed', 'false') && toggleSettings[h[1]] != 'on') || toggleSettings[h[1]] == 'off')
            toggle(heading);
	})
	//build item nodes from dropdown list
	$('option', true, select).forEach(splatter)
	if (location == 'storage' && whichTable == 'TAKE')
		//color favorites and add them to their own section
		shadeFavs();
	$('.sectionTables', true).forEach(function (t)
	{
		//hide any sections that are empty
		if (t.childNodes.length == 0)
			t.parentNode.style.display = 'none';
	})
	center.appendChild(CE('br'));
	var button2 = center.appendChild(CE('input', 'class|button ' + whichTable, 'type|button', 'value|' + buttonText));
	button2.addEventListener('click', moveItems, false);
	center.appendChild(CE('br'));
	center.appendChild(CE('br'));
	//place divider
	if (whichTable == 'PUT')
		center.appendChild(CE('hr', 'style|width:80%; height:15px; background-color:darkblue'));
	//if there are any items without DB entries, look up their tooltips
	if (unclassified.length > 0)
		classify(0, unclassified);
	switch(location)
	{	
		case 'closet':
		case 'storage':
			form.parentNode.style.display = 'none';
		break
		case 'clan stash':
			form.style.display = form.previousSibling.style.display = 'none';
		break
	}

	function splatter(o)
	{
		if (o.value == 0)
			return;
		var temp = TOP.GS_DB.items[o.value];
		if (!temp)
		{
			//no DB entry, add to unclassified array for later checking
			var descid = o.getAttribute('descid');
			unclassified.push([o.value, descid, whichTable]);
			temp = {"descid":(descid ? descid : "00000000"), "gif":"confused", "tab":"MiscI"};
		}
		var tab = temp.tab
		if (!tab || (tab == 'free' && (location != 'storage' || pullsRemaining == -1)))
			//if item has no DB entry or is a free pull but location is not hagnk's 
			//or location is hagnk's and there are no pull restrictions, put it in MiscI
			//(free items get put into the main items dropdown after ronin/prism break)
			tab = 'MiscI';
		var table = $('#' + whichTable + '_' + tab);
		if (!table.lastChild || table.lastChild.childNodes.length == 3)
			var thisRow = table.appendChild(CE('tr'));
		else
			var thisRow = table.lastChild;
		var td = thisRow.appendChild(CE('td', 'style|width:18em'));
		var div = td.appendChild(CE('div'));
		if (location == 'storage' && whichTable != 'FREE')
			//make nodes identifiable for pull lists
			div.className = 'draggableNode';
		var quant = o.textContent.match(/\((\d+)\)/);
		quant = quant ? quant[1] : 1;
		var tempText = o.textContent;
		if (location == 'clan stash' && whichTable == 'TAKE')
		{
			//[1] is item name, [2] is karma
			var info = o.textContent.match(/([^\(]+).+(\(-\d+\))/);
			if (quant == 1)
				//the TAKE section of clan stash does not put a default quantity of (1) for single items
				tempText = info ? (info[1] + ' (1) ' + info[2]) : o.textContent;
		}
		var inputbox = div.appendChild(CE('input',  'class|' + whichTable + 'box', 'style|width:25px', 'type|text', 'maxQuant|' + quant));
		if (GM_getValue('allowImages.enabled', true))
			var img = div.appendChild(CE('img', 'class|hand', 'style|vertical-align:bottom', 'onclick|descitem(' + temp.descid+ ')', 'src|http://images.kingdomofloathing.com/itemimages/' + temp.gif + '.gif'));
		var name = div.appendChild(CE('span', 'id|ID' + o.value, 'text|' + tempText));
	}
	
	function classify(counter, UCItems)
	{
		//get the item decription and parse it for item type and gif, then add to DB
		GM_log("updating item number " + UCItems[counter][0]);
		GM_get('/desc_item.php?whichitem=' + UCItems[counter][1], function (text)
		{
			var imgName = text.match(/\/(\w+)\.gif/)[1];
			var type = text.match(/Type:\s<b>([\w-]+)/);
			type = type ? type[1] : 'MiscI';
			switch (type)
			{
				case 'food': type = 'eat'; break;
				case 'booze': type = 'drink'; break;
				case 'usable': type = 'MiscI'; break;
				case 'weapon': type = 'melee'; break;
				case 'off-hand': type = 'offhand'; break;
				case 'familiar': type = 'fam'; break;
				case 'accessory': type = 'acc'; break;
				case 'shirt': case 'potion': case 'hat': type = type + 's'; break;
				//ranged, pants, combat stay the same
				case 'ranged': case 'pants': case 'combat': break;
				default: type = 'MiscI'; break;
			}
			var node = $('#ID' + UCItems[counter][0]);
			node.previousSibling.src = 'http://images.kingdomofloathing.com/itemimages/' + imgName + '.gif';
			moveNode(node.parentNode.parentNode, type, UCItems[counter][2]);
			TOP.GS_DB.items[UCItems[counter][0]] = {descid:UCItems[counter][1], tab:type, gif:imgName};
			if (counter == UCItems.length - 1)
				GM_setValue('GS_DB', JSON.stringify(TOP.GS_DB));
			else
				classify(++counter, UCItems);
		}, function (){GM_log('oops ' + UCItems)})
	}
}

function toggle(e)
{
	//this function is called both by another function and by clicks
	if (e.type == 'click')
	{
		e.preventDefault();
		//holding ctrl changes all sections to the state of the clicked one
		if (e.ctrlKey)
		{
			$('.sectionTables', true).forEach(function(t)
			{
				t.style.display = t.nextSibling.nextSibling.style.display = e.target.nextSibling.nextSibling.nextSibling.style.display;
			})
			return;
		}
	}
	var tgt = e.target || e;
	var table = tgt.parentNode.childNodes[3];
	var button = tgt.parentNode.childNodes[5];
	table.style.display = button.style.display = (table.style.display == 'none') ? 'inline-table' : 'none';
	//save toggle settings
	var whichTable = table.id.match(/([A-Z]+)_(\w+)/);
	var toggleSettings = JSON.parse(GM_getValue('toggleSettings' + '.' + location + '.' + whichTable[1], '{}'));
	toggleSettings[whichTable[2]] = table.style.display == 'none' ? 'off' : 'on';
	GM_setValue('toggleSettings' + '.' + location + '.' + whichTable[1], JSON.stringify(toggleSettings));
}

function selectAllInSection(e)
{
	$('input', true, this.previousSibling.previousSibling).forEach(function (b)
    {
        var max = b.getAttribute('maxQuant');
        b.value = b.value != max ? max : null;
    })
    countItemsInPage(this);
}

function addFav(e)
{
	//only fire on spans with ids (the text for an item)
	if (e.target.tagName != 'SPAN' || !e.target.id)
		return;
	e.preventDefault();
	var thisId = e.target.id.substr(2);
	var favs = GM_getValue('favorites', null);
	//make sure favs is an array
	if (!favs)
		favs = [];
	else if (favs.indexOf('|') != -1)
		favs = favs.split('|');
	else
		favs = [favs];
	if (e.target.style.backgroundColor != favColor)
	{
		//item being added, add it to fav list and color the node
		favs.push(e.target.id);
		e.target.style.backgroundColor = favColor;
		moveNode(e.target.parentNode.parentNode, 'fav');
	}
	else
	{
		//item being removed, take it out and uncolor the node
		favs.splice(favs.indexOf(e.target.id), 1);
		e.target.style.backgroundColor = 'white';
		var temp = TOP.GS_DB.items[thisId];
		var dest = temp ? temp.tab : 'MiscI';
		moveNode(e.target.parentNode.parentNode, dest);
	}
	if (favs.length == 0)
		GM_deleteValue('favorites');
	else
		GM_setValue('favorites', favs.join('|'));
}

function shadeFavs()
{
	//color and move favorite nodes at load time
	var favs = GM_getValue('favorites', null);
	if (!favs)
		favs = [];
	else if (favs.indexOf('|') != -1)
		favs = favs.split('|');
	else
		favs = [favs];
	favs.forEach(function (fav)
	{
		var thisFav = $('#' + fav);
		if (!thisFav)
			return;
		moveNode(thisFav.parentNode.parentNode, 'fav');
		thisFav.style.backgroundColor = favColor;
	})
	if ($('#TAKE_fav').childNodes.length == 0)
		$('#Favorites').style.display = 'none';
}

function moveNode(node, dest, transaction)
{
	//origin and destination are pointers to the tables involved
	//node is the td, dest is the name of the destination table
	transaction = transaction || 'TAKE';
	var origin = node.parentNode.parentNode;
	var destination = $('#' + transaction + '_' + dest);
	var destList = $('td', true, destination);
	destList.push(node);
	destList.sort(alphaSort);
	//reflow destination nodes
	destList.forEach(function (destNode, destIndex)
	{
		var thisRow = destination.childNodes[Math.floor(destIndex/3)] || destination.appendChild(CE('tr'));
		thisRow.appendChild(destNode);
	})
	destination.parentNode.style.display = 'block';
	var origList = $('td', true, origin);
	origList.sort(alphaSort);
	//reflow origin nodes
	origList.forEach(function (origNode, origIndex)
	{
		var thisRow = origin.childNodes[Math.floor(origIndex/3)];
		thisRow.appendChild(origNode);
	})
	if (origList.length == 0)
		origin.parentNode.style.display = 'none';
		
	function alphaSort(a, b) {
		return a.textContent.toLowerCase() > b.textContent.toLowerCase();
	}
}

function moveItems()
{
	//make list of things being taken and submit to KoL
	var transaction = document.activeElement.className.match(/PUT|TAKE|FREE/);
	if (!transaction || (pullsRemaining == 0 && transaction != 'FREE'))
		return;
	if ($('#reportDivPulls'))
	{
		var count = $('.Pulls>center').textContent.split('/');
		if (+count[0] > +count[1])
		{	
			displayReport('Hagnk turns to you with a sigh and says, "Remember that time whegn I told you that you could take only ' + pullsRemaining + ' thigngs today? Yeah? Well that rule is still ign effect."', 'Gno cagn do', 'Error', true, false, 'fixed');
			return;
		}
	}
	var tokenI = 'whichitem';
	var tokenQ = 'howmany';
	var reportHead = 'You retrieved ';
	var reportTail = ' from your ';
	var exclaim = '';
	//damned inconsistent forms!
	if (transaction == 'TAKE')
	{
		if (location == 'clan stash')
		{
			action = 'takegoodies';
			tokenQ = 'quantity';
			var single = true;
		}
		else
			action = 'take';
	}
	else if (transaction == 'PUT')
	{
		reportHead = 'You placed ';
		reportTail = ' into your ';
		if (location == 'clan stash')
		{
			action = 'addgoodies';
			tokenI = 'item';
			tokenQ = 'qty';
		}		
		else
			action = 'put';
	}
	else if (transaction == 'FREE')
	{
		action = 'freepull';
		var single = true;
		tokenQ = 'quantity';
		exclaim = '(for free!) ';
	}
	var requestStrings = [];
	var reportBody = [];
	var tempMoveList = $('.' + transaction + 'box', true).filter(function (b) {
		return b.value;
	})
	if (tempMoveList.length == 0)
		return;
	tempMoveList.forEach(function (box, index)
	{
		var whichIndex = single ? '' : (index % 10) + 1;
		var whichRequest = single ? index : Math.floor(index / 10);
		if (whichIndex == 1 || whichIndex === '')
			requestStrings[whichRequest] = 'pwd=' + $('[name=pwd]').value + '&action=' + action;
		requestStrings[whichRequest] += "&"+ tokenI + whichIndex + "=" + box.nextSibling.nextSibling.id.substr(2) + "&" + tokenQ + whichIndex + "=" + box.value;
		var and = '';
		if (tempMoveList.length > 1 && index == tempMoveList.length - 1)
			and = ' and ';
		reportBody.push(and + box.value + ' ' + box.nextSibling.nextSibling.textContent.match(/(.+)\s\(/)[1]);
	})
	var finalReport = reportHead + exclaim + reportBody.join(', ') + reportTail + location + '.';
	recurse_GM_post(0);
	
	function recurse_GM_post(counter)
	{
		GM_post(window.location.pathname, requestStrings[counter], function (res)
		{
			if (counter == requestStrings.length - 1)
				displayReport(finalReport, 'Results:', '', true, true, 'fixed');
			else
				recurse_GM_post(++counter);
		})
	}
}

function countItemsInPage()
{
	var type = document.activeElement.className.match(/PUT|TAKE|FREE/);
	if (type == 'FREE')
		return;
	var boxes = $('.' + type + 'box', true);
	var total = 0;
	for (a in boxes)
	{
		if (isNaN(boxes[a].value) || boxes[a].value == 0)
			boxes[a].value = null;
		if (boxes[a].value)
		{
			var maxQuant = +boxes[a].getAttribute('maxQuant');
			boxes[a].value = Math.min(boxes[a].value, maxQuant);
			total += +boxes[a].value;
		}
	}
	if (location == 'storage')
		displayReport(total + (pullsRemaining != -1 ? '/'+ pullsRemaining : ''), 'Pulls', 'Pulls');
}

function jumpMenu()
{
	var jumpMenu = $('#reportDivJump');
	if (jumpMenu)
	{
		jumpMenu.style.display = 'block';
		return;
	}
	var report = '<select size=10 id="jumpMenu">';
	$('.sectionTables', true).forEach(function (t)
	{
		if (t.parentNode.style.display != 'none')
			report += '<option value=' + t.id + '>' + t.parentNode.firstChild.textContent + '</option>';
	})
	displayReport(report + '</select>', 'Jump to Section:', 'Jump', false, false, 'fixed');
	$('#jumpMenu').addEventListener('dblclick', jump, false);
	
	function jump()
	{
		this.parentNode.parentNode.style.display = 'none';
		$('#' + this.value).parentNode.scrollIntoView(true);
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
			$('#guts').appendChild(getSettings())
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
		var contents = CE('div', 'id|' + scriptID);
		var fieldset = contents.appendChild(CE('fieldset', 'style|margin-top:20px; width:33%'));
		fieldset.appendChild(CE('legend', 'class|subhead', 'text|' + scriptName));
		var section = fieldset.appendChild(CE('div', 'class|indent'));
		//call function in main script to actually make the settings
		section.appendChild(buildSettings());
		return contents;
	}
	
	function buildSettings()
	{
		var section = CE('div');
		section.addEventListener('click', changeSettings, false);
		var type = ["storage", "closet", "clan stash", "display case"];
		for (var i=0;i<3;i++)
		{
			section.appendChild(CE('input', 'id|' + type[i], 'class|button', 'type|button', 'style|margin:15px; display:block', 'value|Script enabled for ' + type[i] + ': ' + GM_getValue(type[i] + ".enabled", true)));
		}
		section.appendChild(CE('input', 'id|collapsed', 'class|button', 'type|button', 'style|margin:15px; display:block;', 'value|Start with headings collapsed: ' + GM_getValue("collapsed.enabled", false)));
		section.appendChild(CE('input', 'id|allowImages', 'class|button', 'type|button', 'style|margin:15px; display:block;', 'value|Show item images: ' + GM_getValue("allowImages.enabled", true)));
		section.appendChild(CE('input', 'id|colorButton', 'class|button', 'type|button', 'style|margin:15px; display:block; background-color:' + GM_getValue('favColor', favColor), 'value|Change the favorite color at Hagnk\'s'));
		return section;
	}
	
	function changeSettings(e)
	{
		if (e.target.className != 'button')
			return;
		if (e.target.id == 'colorButton')
		{
			pickColor();
			return;
		}
		var enabled = GM_getValue(e.target.id + ".enabled", 'true');
		GM_setValue(e.target.id + ".enabled", !enabled);
		e.target.value = e.target.value.replace(enabled, !enabled);
	}
	
	function pickColor()
	{
		if ($('#colorPicker'))
		{	
			$('#colorPicker').style.display = 'block';
			return;
		}
		var allColors = [];
		var combo = ['66', '99', 'CC', 'FF'];
		var len = combo.length;
		for (var i=0;i<len;i++)
		{
			for (var j=0;j<len;j++)
			{
				for (var k=0;k<len;k++)
				{
					allColors.push('#' + combo[i] + combo[j] + combo[k]);
				}
			}
		}	
		var div = document.body.appendChild(CE('div', 'id|colorPicker','style|position:fixed; top:40%; left:12%; z-index:100; cursor:default; background-color:white; padding:3px; border:3px solid black;'));
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
			$('#colorButton').style.backgroundColor = e.target.style.backgroundColor;
			this.style.display = 'none';
			GM_setValue('favColor', e.target.style.backgroundColor);
		}
	}
}

function loadDB()
{
	const CURRENT_DB = GM_getValue('GS_DB', null);
	if (!CURRENT_DB)
		//DB is blank, get new one
		getDB();
	else
		initializeScript(CURRENT_DB);
}

function getDB()
{
	//DB has new version, download it
	GM_get('http://sites.google.com/site/kolcthproject/GS_DB.txt', function (DBText)
	{
		if (DBText.charAt(0) != '{')
		{
			//downloaded DBText is not the DB we want
			getDBFailure();
			return;
		}
		//cache DB and load to top, overriding the version already loaded
		GM_setValue('GS_DB', DBText);
		GM_setValue('DB_VERSION', DBText.match(/([\d\.]+)/)[1]);
		initializeScript(DBText);
	}, getDBFailure);
	
	function getDBFailure()
	{
		//fail utterly
		displayReport('No item database found, tell Charon he\'s a dope.', 'Database error', 'DB', false, false, 'fixed');
	}
}

function initializeScript(DB)
{
	//make sure another script hasn't loaded it before loading DB
	if (!TOP.GS_DB)
		TOP.GS_DB = JSON.parse(DB);
	if (!$('[class = "button TAKE"]'))
		forms.forEach(buildTable);
}

function checkForUpdates()
{
	const NOW = new Date().getTime();
	var lastUpdateCheck = +GM_getValue('lastUpdateCheck', 0);
	if (NOW > lastUpdateCheck + 1209600000)
	{
		//two weeks since last update
		const SCRIPT_NAME = "Graphical Storage";
		const SCRIPT_VERSION = "1.3.2";
		GM_setValue('lastUpdateCheck', NOW.toString());
		GM_get('http://sites.google.com/site/kolcthproject/allversions.txt', function (versionText)
		{
			var allVersions = JSON.parse(versionText);
			var build = 0, report = ''
			if (allVersions[SCRIPT_NAME] != SCRIPT_VERSION)
				//script has new version
				build++
			if (allVersions.masterDB != GM_getValue('DB_VERSION', null))
			{	
				//DB has new version, get it
				build++
				getDB();
			}
			switch (build)
			{
				case 2:
					//tell user about new DB download
					report = '<p>Getting new version of database, please be patient.</p>'
				//fall through here
				case 1:
					//tell user about new script version
					report = '<a href="http://userscripts.org/scripts/source/80981.user.js">Download new version of ' + SCRIPT_NAME + '</a>' + report
				break
				case 0:
					//tell user both are fine
					report = '<p>Script and database are up to date</p>'
				break
			}
			displayReport(report, SCRIPT_NAME + ' Update:', 'Update', (build != 1), false, 'fixed');
		})
	}
}

function CE(tag/*, attributes*/)
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

function displayReport(contents, title, type, fade, reload, pos)
{
	//feedback window for user, shows errors, results
	var thisDiv = $('#reportDiv'+ type);
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
		setTimeout(function () {$('#reportDiv'+ type).style.display = 'none'}, 5000);
	if (reload)
		setTimeout(function () {window.location.reload()}, 5000);
}

function GM_get(target, callback, err) {
	if (target.indexOf('http') == -1)
		target = 'http://' + window.location.host + target;
	GM_xmlhttpRequest({
		method: 'GET',
		url: target,
		onload: function (details) {
			callback(details.responseText);
		},
		onerror: function (details) {
			if (err)
				err(details.responseText);
		}
	});
}

function GM_post(page, info, callback) {
	if (page.indexOf('http') == -1)
		page = 'http://' + window.location.host + page;
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
