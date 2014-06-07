// ==UserScript==
// @name				Inline Descriptions Comparison
// @description	Shows item descriptions in tooltips
// @namespace		KolCtH
// @author			Charon the Hand
// @contributor	One Ton Tomato
// @version			3.3.0
// @DBVersion		183
// @grant			GM_xmlhttpRequest
// @include			http://www.kingdomofloathing.com/game.php*
// @include			http://127.0.0.1:*/game.php*
// @include       http://localhost:*/game.php*
// ==/UserScript==
//Original script by One Ton Tomato. I hacked around with it for a  while and this is the evolved product. Added popups for effects, potion effects, familiars and skills. Also caching of tooltip info
//V100 Lots of optimization and tweaking.
//V102 New account page support and an auto-check for update function. Since this script doesn't get updated that often, I think two weeks is a good period of time between checks.
//V105 A few new uncacheables, hovering on the magnifying glass next to a select shows the tip for the current item, FF4+ compatibility
//V2.1 uncacheables moved into a separate DB file, so that it can be updated without getting the whole script again. A new versioning system, new auto-update function for both script and DB, fading tooltips, consumable effects, a ton of tooltip and logic optimizing, account page overhaul, manual doNotCache control.
//V3.0 Persistent draggable tips available for comparisons; opened by shift-clicking on an icon. All tooltips now open in the top game.php page.
//V3.1 Because tooltips only open in top window, the script only has to run there and put event listeners on each page as it loads. Various performance tweaks. Special cases for new mall interface and Bale's OCD mafia script. Now runs in Chrome with Tampermonkey.
//V3.2 Queen cookie process streamlined. New options screen section to show "do not cache" list and delete items from it. New settings for show/hide delay. Refactored to remove TOP shenanigans and finalize cross-browser compatibility. No longer needs a second instance for account.php.
//V3.3 Fading is now implemented by css transition instead of JS: no more tips getting stuck half-visible. Clicking links in a comparison tip will open the tip belonging to the link, not navigate the whole window(grr). Items which are unique per player are shown properly (big thanks to MattG for catching this and for Chrome testing)

var IDI_Settings = JSON.parse(lsg('IDI_Settings') || '{"useFade":true, "requireShift":false, "showDelay":"600", "hideDelay":"300", "lastUpdateCheck":null}');
if (!lsg('IDI_Settings')) //first run of the new version, re-initialize settings. should only happen once ever.
{
	lss('IDI_Settings', JSON.stringify(IDI_Settings));
	localStorage.removeItem('IDI_tooltipCache');
	localStorage.removeItem('IDI_lastUpdateCheck');
	localStorage.removeItem('IDI_requireShift');
	localStorage.removeItem('IDI_useFade');
}
var IDI_TooltipCache = JSON.parse(lsg('IDI_TooltipCache') || '{}');
var IDI_DB = JSON.parse(lsg('IDI_DB') || '{"doNotCache":[], "otherPlayers":[], "multiple":{}}');
updateCheck();
addCSS();
$('html').appendChild(CE('body', 'id|IDI_Body', 'style|position:absolute;'));
var showTimer = null, hideTimer = null, multiple = [];
window.addEventListener('mouseup', dragEnd, false);
window.addEventListener('mousedown', dragStart, false);
var _start = [0,0]; //mouse starting position
var _offset = [0,0]; //current element offset 
var _dragElement, _oldZIndex = 21;
$('frame[name=mainpane]').addEventListener('load', function() 
	{
		if (this.contentDocument.URL.indexOf('account.php') != -1)
			buildPrefs(this.contentDocument);
		this.contentWindow.document.addEventListener('click', Handler, true);
		this.contentWindow.document.addEventListener('mouseover', Handler, true);
	}, false);
$('frame[name=charpane]').addEventListener('load', function() 
	{
		this.contentWindow.document.addEventListener('click', Handler, true);
		this.contentWindow.document.addEventListener('mouseover', Handler, true);
	}, false);

function Handler(e)
{
	if (showTimer) //kill display timer in progress
	{
		clearTimeout(showTimer);
		showTimer = null;
	}
	if (e.target.nodeName != 'IMG')
	{
		if ($('.shown') && !hideTimer)
			hideTimer = setTimeout(hideShownTooltips, IDI_Settings.hideDelay);
		return;
	}
	var hideOthers = true, comparison = false;
	if (e.shiftKey)
	{
		if (e.type == 'click') //comparison tip open, do not hide ordinary tips
		{
			e.stopPropagation();
			e.preventDefault();
			clearTimeout(showTimer);
			comparison = true;
			hideOthers = false;
		}
	}
	else if (IDI_Settings.requireShift === true) //if requireShift but shift is not pressed
		return;
	var desc, rel, onclick = e.target.getAttribute('onclick');
	var pageName = e.target.ownerDocument.location.pathname;
	if (pageName == "/relay_OCD_dB_Manager.ash") //special case for Bale's OCD inventory KoLmafia script
		onclick = e.target.parentNode.href;
	if (pageName == "/backoffice.php") //special case for manage mall store
		rel = e.target.parentNode.parentNode.getAttribute('rel');
	if (pageName == '/campground.php') //special case for clip-art
	{
		rel =  e.target.getAttribute('rel');
		if (rel)
			rel = rel.slice(-9);
	}
	if (rel)
		desc = [null, 'item', rel];
	if (onclick)
	{
		if (onclick.indexOf('describe') != -1)
			desc = magGlass(onclick, e.target);
		else
			desc = onclick.match(/(outfit|eff|descitem|\bitem|fam|skill|trophy)[\(=][\"\']?(-?\w+)(?:,\s?(\w+))?/);
	}
	if (!desc || !desc[2])
		return;
	//desc[3] is the playerid if you are looking at someone else's equipment. it's 0 for yourself
	//this appears to only show different results for three items: crown of thrones, buddy bjorn, and skelsword. 
	if (desc[3] && (desc[3] === "0" || IDI_DB.otherPlayers.indexOf(desc[2]) == -1))
		desc[3] = null;
	//don't fade/reshow an already showing tip if it gets requested again. 
	//but also don't prevent persistent tip from opening when a temp tip is open 
	var already = document.getElementById(desc[2]);
	if (already && already.classList.contains('shown') && !comparison)
		return;
	showTimer = setTimeout(function () {showTooltip(desc[2], desc[1], hideOthers, comparison, desc[3]);}, IDI_Settings.showDelay);
}

function magGlass(onclick, tgt) 
{
	//magnifying glass next to <select> on some pages 
	var formName = onclick.match(/\(document\.(\w+)\.(\w+)\)/);
	var form = document.forms.namedItem(formName[1]) || null;
	var select = $('select[name=' + formName[2] + ']', (form || tgt.parentNode));
	if (select)
		return [null, 'item', select.options[select.selectedIndex].getAttribute('descid')];
	return null;
}

function showTooltip(descNum, type, hide, comparison, otherPlayer)
{
	if (hide)
		hideShownTooltips();	
	switch (type)
	{
		case 'outfit':
		//prevent collision between outfit ids and skill ids
			descNum += 'O';
		break;
		case 'fam':
		//prevent collision between familiar ids and skill ids	
			descNum += 'F';
			type = 'familiar';
		break;
		case 'eff':
			type = 'effect';
		break;
		case 'descitem':
			type = 'item';
		break;
	}
	var TTID = (comparison ? '_' : '') + descNum + (otherPlayer ? "_" + otherPlayer : "");
	//querySelector will not tolerate IDs that are all numeric, GEBI will.
	var span = document.getElementById(TTID);
	if (span) //tip is already on page, show it
		displayTooltip();
	else //tip is not on page yet, create span to hold it
	{
		span = CE('span', 'class|inlineDescription', 'id|' + TTID);
		var cachedTooltip = IDI_TooltipCache[descNum];
		if (cachedTooltip) //tip is cached, retrieve it
		{
			span.innerHTML = rebuildTooltip();
			displayTooltip();
		}
		else //tip needs to be fetched from the server
		{
			var URL = "/desc_" + (type == 'trophy' ? 'clantrophy' : type) + ".php?which" + (type == 'familiar' ? "" : type)  + "=" + descNum + (otherPlayer ? "&otherplayer=" + otherPlayer : "");
			GM_GET(URL, populateTooltip);
		}
	}
	
	function populateTooltip(txt) //parse the response to get the tooltip data
	{
		if (txt.indexOf('<!-- effectid: 755 -->') != -1) //special case for queen cookie. build custom tip showing effect; do not cache
		{
			var inc, increase = txt.match(/\+(\d{3}).+</);
			if (increase[0])
				inc = parseInt(increase[1]);
			cachedTooltip = {"t":"Queen Cookie", "g":"chesscookie", "d":"Gives 30 turns of the effects from King, Rook, Knight, and Bishop cookies. Screw showing four tooltips.", "e":"<b>Muscle +" + inc + "%<br>Moxie +" + inc + "%<br>Mysticality +" + inc + "%<br>+" + inc / 4 + " Stats Per Fight</b>"};
			span.innerHTML = rebuildTooltip();
		}
		else //find the text we are interested in
		{
			var end, start = txt.indexOf('<center>');
			if (type == 'item')
				end = txt.indexOf('</blockquote>') + 13;
			else
				end = txt.indexOf('</div>');
			if (start != -1 && end != -1)
				span.innerHTML = "<div>" + txt.slice(start, end) + '</div>';
			else
			{
				span.id = null;
				cachedTooltip = {"t":"Sorry!", "g":"confused", "d":"Tooltip is not in the cache and cannot be downloaded."};
				span.innerHTML = rebuildTooltip();
			}
		}
		//strip out ugliness for outfit pieces
		var outfitTable = $('table', span);
		if (outfitTable)
		{
			var linkSpan = $('span', outfitTable);
			if (linkSpan)
			{
				var outfitHTML = "<br>Outfit: <b><a class=nounder href='" + linkSpan.getAttribute('onclick').split('"')[1] + "'>" + linkSpan.textContent + "</a></b><br>&#8195;&#8195;&#8195;" + linkSpan.parentNode.nextSibling.nextSibling.textContent;
				outfitTable.parentNode.insertBefore(CE('div'), outfitTable).innerHTML = outfitHTML;
				outfitTable.parentNode.removeChild(outfitTable);
			}
		}
		var skillLink = $('a.hand', span);
		if (skillLink) //skill books have an onclick instead of href; fix that
		{
			skillLink.href = skillLink.getAttribute('onclick').match(/\"([^&]+)&/)[1];
			skillLink.className = 'nounder';
		}
		var boxedImg = $('img[onclick]', span);
		if (boxedImg) //revamp terrible sneaky pete skill
		{
			if (descNum == "15017")
			{
				var hairdos = span.querySelectorAll('img.hand');
				var tables = span.querySelectorAll('table');
				var ctr = tables[0].parentNode;
				for (var h = 0; h < 4; h++)
				{
					ctr.appendChild(CE('br'));
					var a = ctr.appendChild(CE('a', 'class|nounder', 'href|desc_effect.php?whicheffect=' + hairdos[h].getAttribute('onclick').match(/\"(\w+)\"/)[1], 'onclick|return false'));
					hairdos[h].removeAttribute('onclick');
					hairdos[h].classList.remove('hand');
					var b = a.appendChild(hairdos[h].parentNode.nextSibling.firstChild);
					b.style.verticalAlign = 'super';
					b.style.fontSize = '12pt';
					a.insertBefore(document.createTextNode(' '), a.firstChild);
					a.insertBefore(hairdos[h], a.firstChild);
					tables[h].parentNode.removeChild(tables[h]);
				}
			}
			else //revamp terrible moonthril boxes
			{
				var newA = boxedImg.parentNode.appendChild(CE('a', 'class|nounder', 'href|desc_item.php?whichitem=' + boxedImg.getAttribute('onclick').match(/(\d+)/)[1]));
				if (["705026970", "658513107", "591358121", "367369719"].indexOf(descNum) != -1)
					newA.classList.add('moonthril');
				boxedImg.classList.remove('hand');
				boxedImg.removeAttribute('onclick');
				for (var n = 0; n < 3; n++)
				{
					newA.appendChild(newA.parentNode.firstChild);
				}
			}
		}
		displayTooltip();
	}
	
	function displayTooltip() 
	{
		if (comparison)
		{
			if (span.style.visibility == 'visible')
				return;
			if (!span.classList.contains('comparison'))
			{
				span.classList.add('comparison');
				var dragbar = span.insertBefore(CE('div', 'class|dragbar'), span.firstChild);
				dragbar.appendChild(CE('div', 'class|closeButton', 'text|\u00D7'));
			}
		}
		if (!span.parentNode)
			$('body', document).appendChild(span); //make extra sure that tampermonkey finds the body tag in the top window
		var chatpaneWidth = parseInt($('frame[name=chatpane]', document).clientWidth) + 30;
		span.style.right = chatpaneWidth + 'px';
		span.classList.toggle('shown'); //trigger css transition
		cacheTooltip();
		if (descNum == multiple[multiple.length - 1])
			arrangeMultiples(); //on last item in a set of multiple tips, run the function that arranges them
		if (type == 'item' || type == 'skill')
		{
			var potionLink = $('a', span);
			if (span.id in IDI_DB.multiple) //consumable that bestows multiple effects, show them
			{
				multiple = IDI_DB.multiple[span.id];
				span.style.right = chatpaneWidth + 304 + 'px';
				for (var n = 0; n < IDI_DB.multiple[span.id].length; n++)
				{	
					showTooltip(IDI_DB.multiple[span.id][n], 'effect', false);
				}
			}
			else if (potionLink) //thing with link to another thing, show other thing
			{
				if (comparison)
					potionLink.setAttribute('onclick', 'return false');
				if (potionLink.classList.contains('moonthril')) //special case for moonthril
					span.style.right = chatpaneWidth + 608 + 'px';
				else
					span.style.right = chatpaneWidth + 304 + 'px';
				var which;
				if (potionLink.href)
					which = potionLink.href.match(/(item|effect|fam|outfit|skill)[^=]+=(\w+)/);
				if (which && which[2])
					showTooltip(which[2], which[1], false);
			}
		}
	}
	
	function arrangeMultiples()
	{
		var allShown = document.querySelectorAll('.shown:not(.comparison)');
		var len = allShown.length;
		if (allShown[0].id == '83695b70e0470a36125feca3198a16b4') 
		//sugar rush comes first in this array if it's already on the page from another tip. this messes up alignment, so re-order to prevent it
		{
			allShown = Array.prototype.slice.call(allShown);
			var sugar = allShown.shift();
			allShown.splice(1, 0, sugar);
		}
		for (var m = 2; m < len; m++)
		{
			var prev = allShown[m - 1]; //align tips below each other except...
			if (m >= 4) //5th(!) tooltip goes below main item; blast you okee-dokee soda and check mirror
			{
				prev = allShown[0];
				allShown[m].style.right = parseInt($('frame[name=chatpane]', document).clientWidth) + 334 + 'px';
			}
			var spanBox = prev.getBoundingClientRect();
			allShown[m].style.top = spanBox.bottom + 'px';
		}
	}
	
	function rebuildTooltip()
	{
		if (type == 'outfit' || type == 'familiar') //familiar/outfit tips are cached without parsing
			return "<div>" + cachedTooltip.d;
		//if tip has an enchantment, place it (effects only)
		var enchantment = cachedTooltip.e ? "<center><font color='blue'>" + cachedTooltip.e + "</font></center>" : '';
		return "<div><center><img src='http://images.kingdomofloathing.com/itemimages/" + cachedTooltip.g + ".gif'><br><b>" + cachedTooltip.t + "</b></center><blockquote>" + cachedTooltip.d + "</blockquote>" + enchantment + "</div>";
	}
		
	function cacheTooltip()
	{
		if (!span.id || otherPlayer)
			return;
		var description, gifName, title, tempId = span.id.charAt(0) == '_' ? span.id.substring(1) : span.id;
		if (IDI_TooltipCache[tempId])
		//tip already is or should not be cached
			return;
		else if (IDI_DB.doNotCache.indexOf(tempId) != -1)
			return;
		if (type == 'outfit' || type == 'familiar')
		//familiar and outfit descriptions are not in a blockquote tag, cache without parsing
			description = $('div', span);
		else
		{
			description = $('blockquote', span);
			gifName = $('img', span).src.match(/\/(\w+)\.gif$/)[1];
			title = $('b', span).textContent;
			if (type == 'skill') //skills: include the MP cost in the title
			{
				var skillbit = $('#smallbits', span).innerHTML;
				var s = skillbit.indexOf('<b>Type:');
				var e = skillbit.indexOf('<p>');
				title = '<div><font size=3>' + title + '</font></div><br>' + skillbit.slice(s, e);
			}
		}
		var fonts = description.querySelectorAll('font');
		for (var n = 0; n < fonts.length; n++)
		{
			if (fonts[n].face) //strip out font tags that only set face before cacheing
			{
				if (type != 'familiar')
					description.classList.add('small');
				for (var m = 0, len = fonts[n].childNodes.length; m < len; m++) {
					fonts[n].parentNode.insertBefore(fonts[n].firstChild, fonts[n]);
				}
				fonts[n].parentNode.removeChild(fonts[n]);
			}
		}
		var tempCache = {"g":gifName || '', "t":title || '', "d":description.innerHTML.replace('&nbsp;', ' ', 'g').replace('\u000a', ' ', 'g')};
		if (type == 'effect') //effects have a different placement for enchantments
			tempCache.e = $('[color=blue]', span).innerHTML || '';
		IDI_TooltipCache[tempId] = tempCache;
		lss('IDI_TooltipCache', JSON.stringify(IDI_TooltipCache));
	}
}

function hideShownTooltips() 
{
	hideTimer = null;
	var IST = document.querySelectorAll('.shown:not(.comparison)');
	if (IST.length === 0)
		return;
	for (var n = 0; n < IST.length; n++)
	{
		var temp = IST[n];
		temp.classList.toggle('shown');
		if (IDI_DB.doNotCache.indexOf(temp.id) != -1)
			temp.parentNode.removeChild(temp);
	}
}

function buildPrefs(doc)
{
	//this function receives a reference to the account document so it can do its work in that context
	if (!$('#privacy', doc))
		return;
	if (!$('#scripts', doc)) //scripts tab is not built, do it here
	{
		var scripts = $('ul', doc).appendChild(CE('li', 'id|scripts'));
		var a = scripts.appendChild(CE('a', 'href|#', 'text|Scripts'));
		a.insertBefore(CE('img', 'align|absmiddle', 'border|0', 'src|http://images.kingdomofloathing.com/itemimages/cmonkey1.gif', 'style|padding-right:10px'), a.firstChild);
		a.addEventListener('click', function (e)
		{
			//make our new tab active when clicked, clear out the #guts div and add our settings to it
			e.stopPropagation();
			$('.active', doc).className = '';
			$('#scripts', doc).className = 'active';
			$('#guts', doc).innerHTML = '';
			$('#guts', doc).appendChild(getSettings());
		}, false);
	}
	else //script tab already exists
	{
		$('#scripts', doc).firstChild.addEventListener('click', function (e)
		{
			//some other script is doing the activation work, just add our settings
			e.stopPropagation();
			$('#guts', doc).appendChild(getSettings());
		}, false);
	}
	
	function getSettings()
	{
		//build our settings and return them for appending
		var contents = $('body', doc).appendChild(CE('div', 'id|CTH_IDI'));
		var fieldset = contents.appendChild(CE('fieldset', 'style|width:75%; margin-top:20px'));
		fieldset.appendChild(CE('legend', 'class|subhead', 'text|Inline Descriptions Improved'));
		var section = fieldset.appendChild(CE('div', 'class|indent'));
		section.appendChild(CE('input', 'class|button', 'type|button', 'style|margin:10px 0px;', 'value|Remove all tooltips from cache')).addEventListener('click', clearCache, false);
		section.appendChild(CE('br'));
		if (navigator.userAgent.indexOf('Firefox/3.6') === -1) // old FF can't handle the function reference. fix someday?
			section.appendChild(CE('input', 'class|button', 'type|button', 'style|margin:15px 10px 15px 0px; ', 'value|Force database update')).addEventListener('click', updateCheck.getNewDB, false);
		section.appendChild(CE('span', 'id|IDI_DBCheck', 'style|font-weight:bold; display:none', 'text|Loading...'));
		section.appendChild(CE('br'));
		section.appendChild(document.createTextNode('Use fading tooltips: '));
		section.appendChild(CE('input', 'id|useFadeCheck', 'type|checkbox','style|vertical-align:middle;')).addEventListener('click', function () {
				IDI_Settings.useFade = this.checked;
				lss('IDI_Settings', JSON.stringify(IDI_Settings));
				addCSS();
			}, false);
		$('#useFadeCheck', section).checked = IDI_Settings.useFade ? true : false;
		section.appendChild(CE('br'));
		section.appendChild(CE('br'));
		section.appendChild(document.createTextNode('Require holding shift to show tooltips: '));
		section.appendChild(CE('input', 'id|requireShift', 'type|checkbox','style|vertical-align:middle;')).addEventListener('click', function () {
				IDI_Settings.requireShift = this.checked;
				lss('IDI_Settings', JSON.stringify(IDI_Settings));
			}, false);
		$('#requireShift', section).checked = IDI_Settings.requireShift ? true : false;
		section.appendChild(CE('br'));
		section.appendChild(CE('br'));
		section.appendChild(document.createTextNode('Tooltip show delay (in milliseconds): '));
		section.appendChild(CE('input', 'id|showDelay', 'type|text', 'value|' + IDI_Settings.showDelay));
		section.appendChild(CE('br'));
		section.appendChild(document.createTextNode('Tooltip hide delay (in milliseconds): '));
		section.appendChild(CE('input', 'id|hideDelay', 'type|text', 'value|' + IDI_Settings.hideDelay));
		section.appendChild(CE('input', 'class|button', 'type|button', 'style|margin:8px; position:relative; left:25px;', 'value|Set show and hide delay')).addEventListener('click', setDelay, false);
		section.appendChild(CE('br'));
		section.appendChild(CE('br'));
		section.appendChild(document.createTextNode('Add items or effects to "Do Not Cache" list: '));
		section.appendChild(CE('br'));
		section.appendChild(CE('input', 'id|newDNC', 'type|text', 'style|position:relative; width:215px; left:25px;', 'value|[comma separated description IDs]')).addEventListener('focus', function () {this.value = null;}, false);
		section.appendChild(CE('input', 'class|button', 'type|button', 'style|margin:8px; position:relative; left:25px;', 'value|Add to list')).addEventListener('click', addToDNC, false);
		section.appendChild(CE('br'));
		section.appendChild(CE('br'));
		section.appendChild(document.createTextNode('Items and effects currently in "Do Not Cache" list: '));
		section.appendChild(CE('br'));
		var currentDNC = section.appendChild(CE('select', 'style|position:relative; left:25px;', 'id|currentDNC'));
		currentDNC.appendChild(CE('option',  'text|Do not cache these items/effects'));
		currentDNC.addEventListener('change', function() 
			{
				if (this.selectedIndex === 0)
					return;
				var desc = this.options[this.selectedIndex].value;
				showTooltip(desc, desc.length > 9 ? 'effect' : 'item', true);
			}, false);
		IDI_DB.doNotCache.forEach(function (dnc) {currentDNC.appendChild(CE('option', 'text|' + dnc, 'value|' + dnc));});
		section.appendChild(CE('input', 'class|button', 'type|button', 'style|margin:8px; position:relative; left:25px;', 'value|Remove from list')).addEventListener('click', removeFromDNC, false);
		return contents;
	}
	
	function setDelay()
	{
		var SD = $('#showDelay', doc).value || null;
		var HD = $('#hideDelay', doc).value || null;
		if (SD)
			IDI_Settings.showDelay = SD;
		if (HD)
			IDI_Settings.hideDelay = HD;
		lss('IDI_Settings', JSON.stringify(IDI_Settings));
	}

	function addToDNC(e)
	{
		var text = e.target.previousSibling.value.replace(/\s+/g, '');
		this.previousSibling.value = null;
		if (!text || text.indexOf('[') != -1)
			return;
		if (text.indexOf(',') != -1)
			text = text.split(',');
		else
			text = [text];
		text.forEach(function (num) {
			if (IDI_DB.doNotCache.indexOf(num) != -1)
				return;
			IDI_DB.doNotCache.unshift(num);
			$('#currentDNC', doc).appendChild(CE('option', 'text|' + num, 'value|' + num));
			delete IDI_TooltipCache[num];
		});
		lss('IDI_DB', JSON.stringify(IDI_DB));
		lss('IDI_TooltipCache', JSON.stringify(IDI_TooltipCache));
		alert('Item/effect numbers ' + text + ' have been added to the "Do Not Cache" list.');
	}
	
	function removeFromDNC(e)
	{
		var sel = e.target.previousSibling;
		var opt = sel.options[sel.selectedIndex] || null;
		if (!opt || !opt.value)
			return;
		var ind = IDI_DB.doNotCache.indexOf(opt.value);
		if (ind == -1)
			return;
		IDI_DB.doNotCache.splice(ind, 1);
		sel.removeChild(opt);
		lss('IDI_DB', JSON.stringify(IDI_DB));
		alert('Item/effect number ' + opt.value +' has been removed from the "Do Not Cache" list.');
	}

	function clearCache()
	{
		if (confirm("Do you really want to erase the tooltip cache?"))
		{
			IDI_TooltipCache = {};
			lss('IDI_TooltipCache', "{}");
			$('body', document).innerHTML = "";
			alert("The tooltip cache is now empty. Happy hovering.");
		}
	}
}

function lsg(item)
{
	return localStorage.getItem(item);
}

function lss(item, value)
{
	localStorage.setItem(item, value);
}

function updateCheck()
{
	var NOW = new Date().getTime();
	var lastUpdateCheck = parseInt(IDI_Settings.lastUpdateCheck || 0) || 0;
	if (lastUpdateCheck + 1209600000 < NOW) //two weeks
	{
		IDI_Settings.lastUpdateCheck = NOW.toString();
		lss('IDI_Settings', JSON.stringify(IDI_Settings));
		checkVersions();
	}	

	function checkVersions()
	{		
		var metadata = GM_info.scriptMetaStr;
		var CURRENT_DB_VERSION = metadata.substr(metadata.indexOf('DBVersion'), 20).match(/\d+/)[0];
		var CURRENT_SCRIPT_VERSION = metadata.substr(metadata.indexOf('version'), 20).match(/[\.\d]+/)[0];
		GM_GET('http://userscripts.org/scripts/source/153265.meta.js', update);
		
		function update(updateText)
		{
			var SCRIPT_NAME = 'Inline Descriptions Improved';
			var DB_VERSION = updateText.substr(updateText.indexOf('DBVersion'), 20).match(/\d+/)[0];
			var SCRIPT_VERSION = updateText.substr(updateText.indexOf('version'), 20).match(/[\.\d]+/)[0];
			if (CURRENT_DB_VERSION != DB_VERSION || JSON.stringify(IDI_DB).length === 2)
				getNewDB();
			if (CURRENT_SCRIPT_VERSION != SCRIPT_VERSION) //script has new version, put banner on page
			{
				var tickler = $('body', document).appendChild(CE('center', 'style|position:fixed; font-family:Arial; top:25%; left:35%; border:solid blue; outline:white solid 1px; background-color:white; border-width:24px 1px 1px; padding:10px 40px;'));
				tickler.appendChild(CE('div', 'text|' + SCRIPT_NAME + ' Update:', 'style|position:relative; top:-32px; color:white; font-weight:bold; margin-bottom:-1em'));
				tickler.appendChild(CE('img', 'src|http://images.kingdomofloathing.com/closebutton.gif', 'style|position:absolute; top:-22px; right:1px')).addEventListener('click', function () {this.parentNode.style.display = 'none';}, false);
				tickler.appendChild(CE('a', 'target|_blank', 'href|http://userscripts.org/scripts/source/153265.user.js', 'text|Download new version of ' + SCRIPT_NAME));
			}
		}
	}

	function getNewDB()
	{
		//DB has new version, silently download it
		//to make script dl a new DB, only change the DB_version in the top metadata
		var checker = $('#IDI_DBCheck');
		if (checker)
			checker.style.display = 'inline';
		GM_GET('http://sites.google.com/site/kolcthproject/IDI_DB.txt', update);
		
		function update(DBText)
		{
			IDI_DB = JSON.parse(DBText);
			lss('IDI_DB', DBText);
			//when doNotCache gets new items, delete those tips from cache 
			IDI_DB.doNotCache.forEach(function (d) {delete IDI_TooltipCache[d];});
			lss('IDI_TooltipCache', JSON.stringify(IDI_TooltipCache));
			if (checker)
				checker.style.display = 'none';
		}
	}
}

function GM_GET(target, callback) {
   //OTT is great!
	GM_xmlhttpRequest({
		method:'GET',
		url:target,
		onload:function (details) {callback(details.responseText);}
   });
}

function CE(tag/*,attributes*/)
{
	var i, len, attr, node = document.createElement(tag);
	for (i=1,len=arguments.length;i<len;i++)
	{
		attr = arguments[i].split('|');
		if (attr[0] == 'text')
			node.textContent = attr[1];
		else
			node.setAttribute(attr[0], attr[1]);
	}
	return node;
}

function addCSS()
{
	var delay = IDI_Settings.useFade ? 0.4 : 0;
	var css = ".inlineDescription {font:12px arial; position:fixed; right:30px; top:20px; width:300px; opacity:0; z-index:20; padding:1em 0em; background-color:white; border:2px solid blue; border-radius:10px; box-shadow: 0px 0px 0px 1px white; overflow:hidden; display:block; visibility:hidden; transition:opacity " + delay + "s, visibility 0s " + delay + "s;}" +
		".comparison {border-color:orange; padding-top:0;}" + 
		".dragbar {height:22px; background-color:orange; margin-bottom:1em;}" +
		".closebutton {position:absolute; top:1px; right:2px; cursor:default; font-size:28pt; font-weight:bold; line-height:.45; height:.45em; width:.6em; background-color:white; border:black 1px solid; z-index:20;}" +
		".nounder {text-decoration: none;}" +
		".shown {visibility:visible; opacity:1; transition:opacity " + delay + "s, visibility;}";
	var style = $('#IDI_Style', top.document);
	if (style)
		style.parentNode.removeChild(style);
	$('head').appendChild(CE('style', 'id|IDI_Style', 'text|' + css));
}

function $(selector, scope)
{
	scope = scope || document;
	return scope.querySelector(selector);
}

function dragStart(e) 
{
	if (e.target.nodeName == 'FRAMESET' || e.target.className != 'dragbar')
	{
		catchClicks(e);
		return false;
	}
	_dragElement = e.target.parentNode;
	_start = [e.clientX, e.clientY];
	var box = _dragElement.getBoundingClientRect();
	_offset = [box.left || 0, box.top || 0]; 
	_dragElement.style.zIndex = ++_oldZIndex; 
	document.addEventListener('mousemove', dragMove, false);
	return false; 
}

function dragMove(e) 
{
	var left = _offset[0] + e.clientX - _start[0] ;
	var top = _offset[1] + e.clientY - _start[1];
	//_offset[0] == box starting position; e.clientX == e.pageX == mouse current position; _start[0] == mouse starting position
	//don't allow dragging offscreen
	_dragElement.style.left = Math.max(-150, Math.min(left, window.innerWidth - 150)) + 'px';
	_dragElement.style.top = Math.max(-10, Math.min(top, window.innerHeight - 20)) + 'px';
}

function dragEnd() 
{ 
	if (!_dragElement)
		return false;
	document.removeEventListener('mousemove', dragMove, false); //remove event listener until the next mousedown
	_dragElement = null;
}

function catchClicks(e)
{
	//close persistent tip if closebutton clicked
	if (e.target.className == 'closeButton')
	{
		e.target.parentNode.parentNode.classList.toggle('shown');
		return false;
	}
	//open effect/outfit/familiar tip from a persistent tip
	var which, tgt = (e.target.nodeName == 'B') ? e.target.parentNode : e.target;
	if (tgt.classList.contains('nounder'))
	{
		if (tgt.href)
		{
			which = tgt.href.match(/which(\w+)?=(\w+)/);
			if (!which)
				return false;
		}
		if (which[1] === undefined)
			which[1] = 'fam';
		showTooltip(which[2], which[1], true);
	}
	return false;
}