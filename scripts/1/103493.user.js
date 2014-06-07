// ==UserScript==
// @name           ArmoryGS
// @namespace      Hilda @ Arygos (CN)
// @include        http://*.wowarmory.com/character-sheet.xml?*
// @include        http://*.wowarmory.com/guild-info.xml?*
// @include        http://wowarmory.com/character-sheet.xml?*
// @include        http://wowarmory.com/guild-info.xml?*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// XML HTTP Request Queue class
var RequestQueue = {
	requests: [],
	add: function (args)
	{
		//		var args = {
		//			'url': url,
		//			'method': method,
		//			'data': data,
		//			'headers': headers,
		//			'onload': onload,
		//			'onerror': onerror,
		//			'onreadystatechange': onreadystatechange
		//		};

		if (args)
		{
			this.requests.push(args);
		}

		if (this.requests.length == 1)
		{
			this.execQueue();
		}
	},
	onload: function (response, requestOnload)
	{
		if (requestOnload)
		{
			requestOnload(response);
		}

		this.requests.shift();
		this.execQueue();
	},
	onerror: function (response, requestOnerror)
	{
		if (requestOnerror)
		{
			requestOnerror(response);
		}

		this.requests.shift();
		this.execQueue();
	},
	onreadystatechange: function (response, requestOnreadystatechange)
	{
		if (requestOnreadystatechange)
		{
			requestOnreadystatechange(response);
		}
	},
	execRequest: function (args)
	{
		GM_xmlhttpRequest({
			url: args.url,
			method: args.method,
			data: args.data,
			headers: args.headers,
			onload: function (response) { RequestQueue.onload(response, args.onload); },
			onerror: function (response) { RequestQueue.onerror(response, args.onerror); },
			onreadystatechange: function (response) { RequestQueue.onreadystatechange(response, args.onreadystatechange); }
		});
	},
	execQueue: function ()
	{
		if (this.requests.length > 0)
		{
			this.execRequest(this.requests[0]);
		}
	}
};

var WowArmoryGS = {
	lang: 'en-US',
	texts: {}
};

WowArmoryGS.about = function ()
{
	window.alert(this.texts.contentAbout);
};

WowArmoryGS.getUrlVars = function ()
{
	var vars = [];
	var hash;

	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

	for (var i = 0; i < hashes.length; i++)
	{
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}

	return vars;
};

WowArmoryGS.getLanguage = function()
{
	var lang = 'en-US';
	var cookieLangId;
	var cookieLangIdIndex = document.cookie.indexOf('cookieLangId');

	if(cookieLangIdIndex > -1)
	{
		cookieLangId = document.cookie.substr(cookieLangIdIndex + 13, 5);
	}

	if(cookieLangId)
	{
		switch(cookieLangId.toLowerCase())
		{
			case 'zh_tw':
				lang = 'zh-TW';
				break;
			case 'zh_cn':
				lang = 'zh-CN';
				break;
			case 'ko_kr':
				lang = 'ko-KR';
				break;
			case 'ru_ru':
				lang = 'ru-RU';
				break;
			case 'fr_fr':
				lang = 'fr-FR';
				break;
			case 'es_es':
				lang = 'es-ES';
				break;
			case 'es_mx':
				lang = 'es-ES';
				break;
			case 'eu_gb':
				lang = 'eu-GB';
				break;
			case 'de_de':
				lang = 'de-DE';
				break;
		}
	}
	else
	{
		switch(window.location.hostname.substr(0, window.location.hostname.indexOf('.')))
		{
			case 'tw':
				lang = 'zh-TW';
				break;
			case 'cn':
				lang = 'zh-CN';
				break;
			case 'kr':
				lang = 'ko-KR';
				break;
			case 'eu':
				lang = 'eu-GB';
				break;
		}
	}

	return lang;
};

WowArmoryGS.SlotScale = {
	'1': 1,			// head
	'2': 0.5625,	// neck
	'3': 0.75,		// shoulder
	'5': 1,			// chest
	'6': 0.75,		// waist
	'7': 1,			// legs
	'8': 0.75,		// feet
	'9': 0.5625,	// wrist
	'10': 0.75,		// hands
	'11': 0.5625,	// fingers
	'12': 0.5625,	// trinket				
	'13': 1,		// 1H weapon
	'14': 1,		// shield
	'15': 0.3164,	// ranged
	'16': 0.5625,	// cloak
	'17': 2,		// 2H weapon
	'21': 1,		// 1H main weapon
	'22': 1,		// 1H off-hand
	'23': 1,		// off-hand
	'25': 0.3164,	// thrown
	'28': 0.3164	// relic
};

WowArmoryGS.Formula = {
	high: {
		'2': { a: 73.000, b: 1.0000 },
		'3': { a: 81.375, b: 0.8125 },
		'4': { a: 91.450, b: 0.6500 }
	},
	low: {
		'2': { a: 8.00, b: 2.00 },
		'3': { a: 0.75, b: 1.80 },
		'4': { a: 26.0, b: 1.20 }
	}
};

WowArmoryGS.getItemGS = function (item)
{
	var gearScore = 0;
	var qualityScale = 1;
	var scale = 1.8618;

	if (item.quality == 5)
	{
		qualityScale = 1.3;
		item.quality = 4;
	}
	else if (item.quality == 0 || item.quality == 1)
	{
		qualityScale = 0.005;
		item.quality = 2;
	}
	else if (item.quality == 7)
	{
		item.quality = 3;
		item.level = 187.05;
	}

	var formula = (item.level > 120 ? this.Formula.high : this.Formula.low)[item.quality];

	if (item.quality < 2 || item.quality > 4)
	{
		return 0;
	}

	var slotScale = this.SlotScale[item.slot] || 0;
	return Math.floor(((item.level - formula.a) / formula.b) * slotScale * scale * qualityScale);
};

WowArmoryGS.getItemInfo = function (itemId, callback)
{
	if (!itemId || !callback)
	{
		return;
	}

	var itemUrl = 'http://www.wowhead.com/item=' + itemId + '&xml';

	var requestArgs = {
		url: itemUrl,
		method: 'GET',
		onload: function (response)
		{
			var xmlDoc = new DOMParser().parseFromString(response.responseText, "application/xml");
			var itemLevel = xmlDoc.evaluate('//wowhead/item/level', xmlDoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).textContent;
			var itemQuality = xmlDoc.evaluate('//wowhead/item/quality', xmlDoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).getAttribute('id');
			var itemSlot = xmlDoc.evaluate('//wowhead/item/inventorySlot', xmlDoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).getAttribute('id');
			var itemInfo = {
				id: itemId,
				level: itemLevel,
				quality: itemQuality,
				slot: itemSlot,
				gs: 0
			};

			itemInfo.gs = WowArmoryGS.getItemGS(itemInfo);
			callback(itemInfo);
		},
		onerror: function (response)
		{
			GM_log(response);
		}
	};

	RequestQueue.add(requestArgs);
};

WowArmoryGS.getCharInfo = function (realm, charName, callback)
{
	if (!realm || !charName)
	{
		return null;
	}

	var charInfo = {
		'realm': realm,
		'name': charName,
		'itemCount': 0,
		'itemQueried': 0,
		'gs': 0,
		'items': {}
	};

	var requestArgs = {
		url: 'http://' + window.location.host + '/character-sheet.xml?r=' + charInfo.realm + '&n=' + charInfo.name + '&rhtml=n',
		method: 'GET',
		onload: function (response)
		{
			var xmlDoc = new DOMParser().parseFromString(response.responseText, 'application/xml');
			var itemNodes = $(xmlDoc).find('page characterInfo characterTab items item');
			charInfo.itemCount = itemNodes.length;
			var itemId;

			itemNodes.each(function ()
			{
				itemId = $(this).attr('id');

				WowArmoryGS.getItemInfo(itemId, function (itemInfo)
				{
					charInfo.items[itemInfo.id] = itemInfo.gs || 0;
					charInfo.gs += charInfo.items[itemInfo.id];
					charInfo.itemQueried++;

					if (charInfo.itemQueried == charInfo.itemCount)
					{
						callback(charInfo);
					}
				});
			});
		},
		onerror: function (response)
		{
			GM_log(response);
		}
	};

	RequestQueue.add(requestArgs);
};

WowArmoryGS.getGuildInfo = function (realm, guildName)
{
	if (!realm || !guildName)
	{
		return null;
	}

	var requestArgs = {
		method: 'GET',
		url: 'http://' + window.location.host + '/guild-info.xml?r=' + realm + '&n=' + guildName + '&rhtml=n',
		onload: function (response)
		{
			var xmlDoc = new DOMParser().parseFromString(response.responseText, 'application/xml');
			var charNodes = $(xmlDoc).find('page guildInfo guild members character');
			var charName;
			var charGS; GM_log(charNodes.length);

			charNodes.each(function ()
			{
				if (parseInt($(this).attr('level')) == 80)
				{
					charName = $(this).attr('name');
					charGS = WowArmoryGS.getCache(realm, charName);

					if (charGS)
					{
						WowArmoryGS.showMemberGS(charName, charGS);
					}
					else
					{
						WowArmoryGS.getCharInfo(realm, charName, function (charInfo)
						{
							WowArmoryGS.setCache(charInfo.realm, charInfo.name, charInfo.gs);
							WowArmoryGS.showMemberGS(charInfo.name, charInfo.gs);
						});
					}
				}
				else
				{
					WowArmoryGS.showMemberGS(charName, -1);
				}
			});

			var th = $('#rosterTable tr.masthead th')[1];

			if (th)
			{
				$(th).find('a').text('GS');
			}

		},
		onerror: function (response)
		{
			GM_log(response);
		}
	};

	RequestQueue.add(requestArgs);
};

WowArmoryGS.showMemberGS = function (charName, gs)
{
	var gsText = $('#rosterTable a:contains("' + charName + '")').parent().parent().find('td span.achievPtsSpan');
	gsText.text(gs);
};

WowArmoryGS.showCharTotalGS = function (gs)
{
	var gsMark = document.createElement('div');
	$('#gear-profile div.gear_bg').append(gsMark);
	gsMark.setAttribute('style', 'position:absolute; bottom:0; position:absolute; left: 42px; bottom:33px; color:#613E08; font-size:13px; cursor: pointer;');
	gsMark.addEventListener('click', function () { queryItemsInfo(); }, false);
	gsMark.title = 'Click to recalculate Gearscore';
	gsMark.appendChild(document.createTextNode('GS: '));

	var gsText = document.createElement('em');
	gsMark.appendChild(gsText);
	gsText.setAttribute('style', 'margin-left:3px; font:bold 13px Georgia;');
	gsText.innerHTML = gs;
};

WowArmoryGS.showCharGearGS = function (items)
{
	var gearListTable = $('table.gear_list_table')[0];
	var tr = gearListTable.rows[0];
	tr.cells[1].className = '';
	tr.cells[1].style.textAlign = 'left';
	var tdGS = document.createElement('th');
	tdGS.innerHTML = 'GS';
	tr.insertBefore(tdGS, tr.cells[2]);
	var itemId;

	for (var i = 1; i < gearListTable.rows.length; i++)
	{
		tr = gearListTable.rows[i];
		tr.cells[1].className = '';
		tr.cells[1].style.textAlign = 'left';
		tdGS = document.createElement('td');
		tr.insertBefore(tdGS, tr.cells[2]);
		itemId = $(tr.cells[1]).find('a').attr('id');
		itemId = itemId.substring(itemId.indexOf('=') + 1, itemId.indexOf('&'));
		tdGS.innerHTML = items[itemId];
	}
};

WowArmoryGS.setCache = function (realm, charName, gs)
{
	if (window.localStorage == undefined)
	{
		return;
	}

	window.localStorage.setItem(charName + '@' + realm, gs);
};

WowArmoryGS.getCache = function (realm, charName)
{
	if (window.localStorage == undefined)
	{
		return null;
	}
	
	return window.localStorage.getItem(charName + '@' + realm);
};

WowArmoryGS.load = function ()
{
	var page = window.location.pathname;
	var vars = this.getUrlVars();
	var realm = vars['r'];

	if (page == '/guild-info.xml')
	{
		var guildName;

		if (vars['n'])
		{
			guildName = vars['n'];
		}
		else
		{
			guildName = vars['gn'];
		}

		WowArmoryGS.getGuildInfo(realm, guildName);
	}
	else if (page == '/character-sheet.xml')
	{
		var charName;

		if (vars['n'])
		{
			charName = vars['n'];
		}
		else
		{
			charName = vars['cn'];
		}

		WowArmoryGS.getCharInfo(realm, charName, function (charInfo)
		{
			WowArmoryGS.setCache(charInfo.realm, charInfo.name, charInfo.gs);
			WowArmoryGS.showCharTotalGS(charInfo.gs);
			WowArmoryGS.showCharGearGS(charInfo.items);
		});
	}
};

WowArmoryGS.init = function ()
{
	this.lang = this.getLanguage();

	switch (this.lang)
	{
		case 'zh-CN':
			this.texts.titleAbout = '关于';
			this.texts.titleClearCache = '清除缓存';
			this.texts.contentAbout = 'ArmoryGS\n\n作者 Hilda @ 亚雷戈斯 (CN)\n\n修改自 World of Warcraft Armory Gearscore (http://userscripts.org/scripts/show/20145)\n';
			break;
		default:
			this.texts.titleAbout = 'About';
			this.texts.titleClearCache = 'Clear Cache';
			this.texts.contentAbout = 'ArmoryGS\n\nWritten by Hilda @ Arygos (CN)\n\nModified from World of Warcraft Armory Gearscore (http://userscripts.org/scripts/show/20145)\n';
			break;
	}
};

WowArmoryGS.init();

$(document).ready(function ()
{
	WowArmoryGS.load();
});

// add menu commands
GM_registerMenuCommand(WowArmoryGS.texts.titleClearCache, localStorage.clear);
GM_registerMenuCommand(WowArmoryGS.texts.titleAbout, WowArmoryGS.about);