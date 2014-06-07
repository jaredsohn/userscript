// ==UserScript==
// @name			Inline Descriptions Improved
// @description		Shows item descriptions in tooltips
// @namespace		KolCtH
// @author			Charon the Hand
// @contributor		One Ton Tomato
// @version			2.1.5
// @include			http://*kingdomofloathing.com/*
// @include			http://127.0.0.1:*
// @exclude			http://forums.kingdomofloathing.com/*
// @exclude			http://images.kingdomofloathing.com/*
//Original script by One Ton Tomato. I hacked around with it for a  while and this is the evolved product. Added popups for effects, potion effects, familiars and skills. Also caching of tooltip info
//V100 Lots of optimization and tweaking.
//V102 New account page support and an auto-check for update function. Since this script doesn't get updated that often, I think a week is a good period of time between checks.
//V105 A few new uncacheables, hovering on the magnifying glass next to a select shows the tip for the current item, FF4 compatibility
//V2.1 uncacheables moved into a separate DB file, so that it can be updated without getting the whole script again. A new versioning system, new auto-update function for both script and DB, fading tooltips, consumable effects, a ton of tooltip and logic optimizing, account page overhaul, manual doNotCache control.
// ==/UserScript==

var TOP = window.top.wrappedJSObject;
switch(window.location.pathname)
{
	case '/game.php':
		//using wrappedJSObject allows the tooltip database to be attached once to the top window
		//and accessed by all of the frames instead of having a different instance for each frame
		TOP.IDI_TooltipCache = JSON.parse(GM_getValue('tooltipCache', '{}'));
		loadDBAndUpdateCheck();
	break
	case '/account.php':
		buildPrefs();
	break
}

switch(unsafeWindow.name)
{
	case 'mainpane':
		const css = ".inlineDescription {position:fixed; right:30px; width:300px; opacity:0; z-index:100; padding:1em 0em; background-color:white; border:2px solid blue; -moz-border-radius:10px; outline:thin solid white; -moz-outline-radius:10px;}";
		GM_addStyle(css);
	break
	case 'charpane':
		window.addEventListener('beforeunload', function ()
		{
			//hides visible tooltip if charpane reloads (e.g. shrugging a buff)
			if (!shownTooltips[0])
				return;
			shownTooltips[0].style.display = 'none';
			shownTooltips[0].style.opacity = 0;
		}, false);
	break
	default:
		return;
	break
}
//showTimer is global so it can be killed when necessary
//shownTooltips holds references to the currently shown tips collected for easy parsing
var showTimer, hideTimer, useFade = GM_getValue('useFade', true), shownTooltips = [];
window.addEventListener('mouseover', hoverHandler, true);

function hoverHandler(e)
{
	if (e.shiftKey) //holding shift temporarily stops the hover function
		return;
	if (showTimer) //kill display timer in progress
	{
		clearTimeout(showTimer);
		showTimer = null;
	}
	if (e.target.getAttribute('onclick'))
		startHover(e.target.getAttribute('onclick')); 
	else if (shownTooltips[0]) //if there are tips displayed, check if mouse is over them
	{
		var hovering = shownTooltips.some(function (t) {
			return t.compareDocumentPosition(e.target) % 10 == 0;
			//20 (t is ancestor of target) or 0 (t is target): keep tooltip visible
			//all other responses: hide it
		});
		if (!hovering && !hideTimer)
			hideTimer = setTimeout(hideShownTooltips, 300);
	}
}

function startHover(onclick) 
{
	if (onclick.indexOf('describe') != -1) //magnifying glass next to <select> on some pages 
	{	
		var formName = onclick.match(/\(document\.(\w+)\.(\w+)\)/);
		var select = document.forms.namedItem(formName[1]).querySelector('[name=' + formName[2] + ']');
		if (select)
			var desc = [null, 'item', select.options[select.selectedIndex].getAttribute('descid')];
	}
	else
		//match 'descitem' so you don't also catch multiuse links
		var desc = onclick.match(/(eff|descitem|\bitem|fam|skill)[\(=]\"?(\w+)/);
	if (desc && desc[2])
		showTimer = setTimeout(function () {showTooltip(desc[2], desc[1]);}, 400);
}

function showTooltip(descNum, type)
{
	if (type == 'fam') //prevent collision between familiar ids and skill ids
	{
		descNum += 'F';
		type = 'familiar';
	}
	else if (type == 'eff')
	{
		type = 'effect';
		if (shownTooltips[0] && shownTooltips[0].id.length < 10) //move item tip over to make room for effect tip(s)
			shownTooltips[0].style.right = '334px';
	}
	else if (type == 'descitem')
		type = 'item';
	var doc = top.frames[2].document;
	var span = doc.getElementById(descNum);
	if (span) //tip is already on page, show it
		displayTooltip();
	else //tip is not on page yet, create span to hold it
	{
		span = doc.createElement('span');
		span.className = 'inlineDescription';
		span.id = descNum;
		var cachedTooltip = TOP.IDI_TooltipCache[descNum];
		if (cachedTooltip) //tip is cached, retrieve it
		{
			span.innerHTML = rebuildTooltip();
			displayTooltip();
		}
		else //tip needs to be fetched from the server
		{
			if (descNum == 'QC')
			{
				//double fuck you, queen cookie. get tip for king cookie to find stat increase
				descNum = 'c3f6b286c4cab341465ab4675143190d';
				var queenCookie = true;
			}
			var URL = "/desc_" + type + ".php?which" + (type == 'familiar' ? '' : type) + "=" + descNum;
			GM_GET(URL, populateTooltip);
		}
	} 
	
	function populateTooltip(txt) 
	{
		if (queenCookie) //triple fuck you, queen cookie. build custom tip showing stat increase, do not cache
		{
			var increase = txt.match(/\+(\d{2}).+</);
			cachedTooltip = {"t":"Queen Cookie", "g":"chesscookie", "d":"Gives 30 turns of the effects from King, Rook, Knight, and Bishop cookies. Screw showing four tooltips.", "e":"<b>All Attributes +" + increase[1] * 4 + "%<br>" + increase[0] + "/b>"};
			span.innerHTML = rebuildTooltip();
		}
		else //find the text we are interested in
		{
			var start = txt.indexOf('<div id="description"');
			var end = txt.indexOf((type == 'item' ? '<script type=' : '</div>'));
			if (start != -1 && end != -1)
				span.innerHTML = txt.slice(start, end) + '</div>';
			else
			{
				span.id = null;
				cachedTooltip = {"t":"Sorry!", "g":"confused", "d":"Tooltip is not in the cache and cannot be downloaded."};
				span.innerHTML = rebuildTooltip();
			}
		}
		displayTooltip();
	}
	
	function displayTooltip() 
	{
		if (type != 'effect' && shownTooltips[0]) //hide any tips already showing, except for item effects
			hideShownTooltips();
		shownTooltips.push(span);
		if (!span.parentNode)
			doc.body.appendChild(span);
		span.style.display = 'block';
		span.style.top = '20px';
		if (shownTooltips.length > 2) //multiple effects, position each below previous
		{	
			var prev = shownTooltips[shownTooltips.length - 2]
			if (shownTooltips.length > 4)
			{
				prev = shownTooltips[0]
				span.style.right = '334px'
			}
			var height = parseInt(getComputedStyle(prev, null).getPropertyValue('top')) + parseInt(getComputedStyle(prev, null).getPropertyValue('height')) + 37
			span.style.top = height + 'px'
		}
		fade(span, 'in');
		cacheTooltip();
		if (type == 'item')
		{
			var potionLink = $('a', span);
			if (span.id in TOP.IDI_DB.multiple) //consumable that bestows multiple effects, show them
			{
				for each (var eff in TOP.IDI_DB.multiple[span.id]) {	
					showTooltip(eff[1], 'eff');
				}
			}
			else if (span.id == '574685883') //fuck you, queen cookie. do not show 4 effects, build a special tip
				showTooltip('QC', 'eff');
			else if (potionLink) //potion with link to effect, show the effect
				showTooltip(potionLink.href.match(/=(\w+)/)[1], 'eff');
			else if (span.id in TOP.IDI_DB.intrinsic) //equip with intrinsic effect, show the effect
				showTooltip(TOP.IDI_DB.intrinsic[span.id], 'eff');
			else if (span.id in TOP.IDI_DB.consumable) //consumable that bestows effect, show the effect
				showTooltip(TOP.IDI_DB.consumable[span.id], 'eff');
		}
	}

	function rebuildTooltip()
	{
		if (type == 'familiar') //familiar tip looks different than others
			return "<div id='description'><center><div><b>" + cachedTooltip.t + "</b></div><br><img src='http://images.kingdomofloathing.com/itemimages/" + cachedTooltip.g + ".gif'><br></center><blockquote>" + cachedTooltip.d + "</blockquote>";
		//if tip has an effect, place it (effects only)
		var tooltipEffect = cachedTooltip.e ? "<center><font color='blue'>" + cachedTooltip.e + "</font></center>" : '';
		return "<div id='description' class='small'><center><img src='http://images.kingdomofloathing.com/itemimages/" + cachedTooltip.g + ".gif'><br><b>" + cachedTooltip.t + "</b></center><blockquote>" + cachedTooltip.d + "</blockquote>" + tooltipEffect + "</div>";
	}
		
	function cacheTooltip()
	{
		//tip already is or should not be cached
		if (!span.id || TOP.IDI_TooltipCache[span.id] || TOP.IDI_DB.doNotCache.indexOf(span.id) != -1)
			return;
		var gifName = $('img', span).src.match(/\/(\w+)\.gif$/)[1];
		var title = $('b', span).textContent;
		if (type == 'skill') //skills: include the MP cost in the title
		{
			var skillbit = $('#smallbits', span);
			title = '<div><font size=3>' + title + '</font></div><br>' + skillbit.firstChild.innerHTML;
		}
		//item description includes enchantment, familiar description is not in a blockquote tag
		var description = $('blockquote', span) || span.querySelectorAll('font')[3];
		var fonts = description.querySelectorAll('font');
		for (var n = 0; n < fonts.length; n++)
		{
			if (fonts[n].face) //strip out font tags that only set face before caching
			{
				if (type != 'familiar')
					description.className = 'small';
				for (var m = 0, len = fonts[n].childNodes.length; m < len; m++) {
					fonts[n].parentNode.insertBefore(fonts[n].firstChild, fonts[n]);
				}
				fonts[n].parentNode.removeChild(fonts[n]);
			}
		}
		var tempCache = {"g":gifName, "t":title, "d":description.innerHTML.replace('&nbsp;', ' ', 'g').replace('\u000a', ' ', 'g')};
		if (type == 'effect') //effects: the effect has a different placement
			tempCache.e = $('[color=blue]', span).innerHTML
		TOP.IDI_TooltipCache[span.id] = tempCache;
		GM_setValue('tooltipCache', JSON.stringify(TOP.IDI_TooltipCache));
	}
}

function hideShownTooltips() 
{
	shownTooltips.forEach(function (t) {fade(t, 'out');});
	shownTooltips = [];
	hideTimer = null
}

function buildPrefs()
{
	if (!$('#privacy'))
		return;
	if (!$('#scripts')) //scripts tab is not built, do it here
	{
		var scripts = $('ul').appendChild(CE('li', 'id|scripts'));
		var a = scripts.appendChild(CE('a', 'href|#', 'text|Scripts:'));
		a.insertBefore(CE('img', 'align|absmiddle', 'border|0', 'src|http://images.kingdomofloathing.com/itemimages/cmonkey1.gif', 'style|padding-right:10px'), a.firstChild);
		a.addEventListener('click', function (e)
		{
			//make our new tab active when clicked, clear out the #guts div and add our settings to it
			e.stopPropagation();
			$('.active').className = '';
			$('#scripts').className = 'active';
			$('#guts').innerHTML = '';
			$('#guts').appendChild(getSettings());
		}, false);
	}
	else //script tab already exists
	{
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
		var contents = $('body').appendChild(CE('div', 'id|CTH_IDI'));
		var fieldset = contents.appendChild(CE('fieldset', 'style|width:34%; margin-top:20px'));
		fieldset.appendChild(CE('legend', 'class|subhead', 'text|Inline Descriptions Improved'));
		var section = fieldset.appendChild(CE('div', 'class|indent'));
		section.appendChild(CE('input', 'class|button', 'type|button', 'style|margin:10px 0px;', 'value|Remove all tooltips from cache')).addEventListener('click', clearCache, false);
		section.appendChild(CE('br'))
		section.appendChild(CE('input', 'class|button', 'type|button', 'style|margin:15px 10px 15px 0px; ', 'value|Force database update')).addEventListener('click', getNewDB, false);
		section.appendChild(CE('span', 'id|IDI_DBCheck', 'style|font-weight:bold; display:none', 'text|Loading...'))
		section.appendChild(CE('br'))
		section.appendChild(document.createTextNode('Use fading tooltips: '));
		section.appendChild(CE('input', 'type|checkbox', 'checked|' + GM_getValue('useFade', true))).addEventListener('click', function () {
			GM_setValue('useFade', !GM_getValue('useFade', true));
		}, false);
		section.appendChild(CE('br'))
		section.appendChild(CE('br'))
		section.appendChild(document.createTextNode('Add items or effects to do not cache list: '));
		section.appendChild(CE('input', 'id|newCache', 'type|text', 'style|width:215px', 'value|[comma separated description IDs]')).addEventListener('focus', function () {this.value = null}, false)
		section.appendChild(CE('input', 'class|button', 'type|button', 'style|margin:8px 0px;', 'value|Add to list')).addEventListener('click', addToDNC, false);
		return contents;
	}
	
	function addToDNC(e)
	{
		var text = this.previousSibling.value.replace(/\s+/g, '');
		this.previousSibling.value = null;
		if (!text || text.indexOf('[') != -1)
			return;
		if (text.indexOf(',') != -1)
			text = text.split(',');
		else
			text = [text];
		text.forEach(function (num) {
			if (TOP.IDI_DB.doNotCache.indexOf(num) != -1)
				return;
			TOP.IDI_DB.doNotCache.unshift(num);
			delete TOP.IDI_TooltipCache[num];
		});
		GM_setValue('DB', JSON.stringify(TOP.IDI_DB));
		GM_setValue('tooltipCache', JSON.stringify(TOP.IDI_TooltipCache));
	}

	function clearCache()
	{
		if (confirm("Do you really want to erase the tooltip cache?"))
		{
			TOP.IDI_TooltipCache = {};
			GM_deleteValue('tooltipCache');
			alert("The tooltip cache is now empty. Happy hovering.");
		}
	}
}

function loadDBAndUpdateCheck()
{
	const DB = GM_getValue('DB', null);
	const DB_Version = GM_getValue('DB_Version', null);
	const NOW = new Date().getTime();
	var lastUpdateCheck = parseInt(GM_getValue('lastUpdateCheck', 0));
	if (!DB || !DB_Version)
		getNewDB();
	else if (lastUpdateCheck + 1209600000 < NOW)
	{
		GM_setValue('lastUpdateCheck', NOW.toString());
		checkVersions();
	}
	else if (!TOP.IDI_DB)
		TOP.IDI_DB = JSON.parse(DB);

	function checkVersions()
	{		
		GM_GET('http://sites.google.com/site/kolcthproject/allversions.txt', function (versionText)
		{
			const SCRIPT_NAME = "Inline Descriptions Improved";
			const SCRIPT_VERSION = '2.1.5';
			var allVersions = JSON.parse(versionText);
			if (allVersions[SCRIPT_NAME] != SCRIPT_VERSION) //script has new version, put banner on main pane
			{
				$('html').appendChild(CE('body'))
				var tickler = $('body').appendChild(CE('center', 'style|position:fixed; font-family:Arial; top:25%; left:35%; border:solid blue; outline:white solid 1px; background-color:white; border-width:24px 1px 1px; padding:10px 40px;'));
				tickler.appendChild(CE('div', 'text|' + SCRIPT_NAME + ' Update:', 'style|position:relative; top:-32px; color:white; font-weight:bold; margin-bottom:-1em'));
				tickler.appendChild(CE('img', 'src|http://images.kingdomofloathing.com/closebutton.gif', 'style|position:absolute; top:-22px; right:1px')).addEventListener('click', function () {this.parentNode.style.display = 'none'}, false);
				tickler.appendChild(CE('a', 'target|_blank', 'href|http://userscripts.org/scripts/source/68402.user.js', 'text|Download new version of ' + SCRIPT_NAME));
			}
			if (allVersions.IDI_DB != DB_Version)
				getNewDB();
			else if (!TOP.IDI_DB)
				TOP.IDI_DB = JSON.parse(DB);
		});
	}
}

function getNewDB()
{
	//DB has new version, silently download it
	var checker = $('#IDI_DBCheck');
	if (checker)
		checker.style.display = 'inline';
	GM_GET('http://sites.google.com/site/kolcthproject/IDI_DB.txt', function (DBText)
	{
		GM_setValue('DB', DBText);
		TOP.IDI_DB = JSON.parse(DBText);
		if (!TOP.IDI_TooltipCache)
			TOP.IDI_TooltipCache = JSON.parse(GM_getValue('tooltipCache', '{}'));
		//when doNotCache gets new items, delete those tips from cache 
		TOP.IDI_DB.doNotCache.forEach(function (d) {delete TOP.IDI_TooltipCache[d];});
		GM_setValue('tooltipCache', JSON.stringify(TOP.IDI_TooltipCache));
		GM_setValue('DB_Version', TOP.IDI_DB.version);//341
		if (checker)
			checker.style.display = 'none';
	});
}

function GM_GET(target, callback) {
   //OTT is great!
	GM_xmlhttpRequest({
		method:'GET',
		url:target,
		onload:function (details) {callback(details.responseText);}
   });
}

function fade(node, dir)
{
	if (!node)
		return;
	var checkForFlicker, steps = 16, start = 0, inc = 1 / steps;
	var step = useFade ? 0 : steps - 1;
	if (dir == 'out')
	{
		inc *= -1;
		start++;
		if (node.id.length > 10)
			checkForFlicker = true
	}
	var interval = setInterval(function () 
	{
		if (checkForFlicker && node.style.opacity != start + step * inc)
			step = steps - 1
		node.style.opacity = start + ++step * inc;
		if (step == steps)
			clearInterval(interval);
		if (node.style.opacity == 0)
			node.style.display = 'none';
		else if (node.style.display == 'none')
			node.style.display = 'block';
	}, 25);
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

function $(selector, scope)
{
	scope = scope || document
	return scope.querySelector(selector)
}
