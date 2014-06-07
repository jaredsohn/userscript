// ==UserScript==
// @name		ShowMyGear - MaxDPS
// @namespace	http://www.naturalstudios.nl/userscripts/maxdps
// @version		0.88
// @description	When 'getting' an armory character, this userscript will (should) mark you current items visualy.
// @match		http://*.maxdps.com/*
// @require		http://code.jquery.com/jquery-1.7.2.min.js
// @copyright	2012+, SvenL
// ==/UserScript==

// History
//  - 0.8  Initial public release
//  - 0.81 Added a little visual box to show the character whose gear is currently shown
//         including a button to reset this.
//  - 0.82 Changed @match http*:// - http:// (wildcard in protocol not supported by GreaseMonkey.
//  - 0.83 Added easy console for FF environment.
//  - 0.84 Cross domain ajax not supported on FireFox, FF now uses GM_xmlhttpRequest.
//  - 0.85 Add button to auto-fill filter.
//  - 0.86 Changed visual effects and changed score to a relative score.
//  - 0.87 Added MoP-support.
//	- 0.88 Added Two-Hand & Ranged supported, fix bug from Chrome.

var wnd = $.browser.mozilla ? window : unsafeWindow;
var isTopWindow = $.browser.mozilla ? wnd == wnd.parent : wnd.top == wnd.self;
var displayHtmlLogging = isTopWindow && $.browser.mozilla; // || $.broswer.msie;

if(false) // displayHtmlLogging || typeof (console) === 'undefined')
{
	console = { };
	console.outputId = 'console_log';

	console.formatObject = function(obj, options)
	{
		if(typeof(obj) !== 'object') return obj;
		
		options = options || {};
		options.indent = options.indent || 0;
		
		var indent = options != null && typeof(options.indent) === 'number' ? Array(options.indent).join('&nbsp;') : '';
		var lines = [];

		for(prop in obj)
		{
			var label = prop + ':';
			var value = obj[prop];
			
			if(value == null)
			{
				value = '<i>null</i>';
			}
			
			if(typeof(value) === 'object')
			{
				label = prop + ':<br />';
				value = console.formatObject(value, { indent: options.indent + 8 });
			}

			lines.push(indent + label + value);
		}
		
		return lines.join('<br />');
	}

	console.log = function(message) {
		if(typeof (console.output) == 'undefined') {
			var output = $('#' + console.outputId);

			if(output.length == 0) {
				output = $('<div />').attr("id", console.outputId).appendTo('body');

				output
					.css('position', 'fixed')
					.css('bottom', '0')
					.css('left', '10%')
					.css('width', '80%')
					.css('height', '12em')
					.css('border', 'solid 1px black')
					.css('color', 'darkblue')
					.css('background-color', 'lightblue')
					.css('z-index', '250000') // Some menu's are placed at 99999.
					.css('padding-left', '5')
					.css('padding-right', '5')
					.css('overflow', 'scroll');
			}
			else {
				output.show();
			}

			console.output = output;
		}
		
		if(typeof(message) == 'object')
		{
			message = console.formatObject(message);
		}

		$('<div />').html(message).prependTo(console.output);
	};
}

if(wnd == 'undefined')
{
    log('Error: window-object not found.');
    alert('Error: window-object not found.');
    return;
}

if (!isTopWindow)
{
	log('Detected that the script is being loaded in an iframe, exiting.');
	return;
}

if(typeof($) == 'undefined')
{
    log('jQuery not found.');
    return;
}

function clearLog()
{
    if(console && console.clear)
    {
        console.clear();
    }
}

function log()
{
    if(console && console.log)
    {
        console.log.apply(console, arguments);
    }
}

function appendParams(url, args)
{
    if(args == null || args.length == 0) return url;

    var qPos = url.indexOf('?');
    var qString = qPos >= 0 ? url.substring(qPos + 1) : '';
    var baseUrl = qPos >= 0 ? url.substring(0, qPos) : url;

    var params = [];
    if(qString.length > 0){
        var kvp = qString.split('&');
        var i = kvp.length;
        var x;
        while(i--) 
        {
            x = kvp[i].split('=');
            params[x[0]] = x[1];
        }
    }
    
    for (var name in args)
    {
        if (!args.hasOwnProperty(name)) continue;
        
        value = escape(args[name]);
        name = escape(name);
        
        params[name] = value;
    }
    
    var qParams = [];
    for (var name in params)
    {
        if(name == null || typeof(params[name]) == 'undefined') continue;
        qParams[qParams.length] = name + '=' + params[name];
    }
    

    qString = qParams.join('&');

    return baseUrl + '?' + qString;
}

var urlParams = {};
(function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
})();

var zone = urlParams['z'];
var realm = urlParams['r'];
var name = urlParams['n'];

function processItems(data, status, xhr)
{
    // thumbnail: http://<z>.battle.net/static-render/<z>/<thumbnail>
    //log('GET RESPONSE');
    //log(data);
    characterData = data;
    UpdateUI();
}

var characterData = null;
var timeoutToken = null;
var slots = {
    // slotName: [ [0] = Item table text, [1] = Enchant table text, [2] = armory object key(s) ]
    'Head': ['Head', 'Enchant', ['head']],
    'Neck': ['Neck', null, ['neck']],
    'Shoulder': ['Shoulder', 'Enchant', ['shoulder']],
    'Back': ['Back', 'Enchant', ['back']],
    'Chest': ['Chest', 'Enchant', ['chest']],
    'Wrist': ['Wrist', 'Enchant', ['wrist']],
    'Hands': ['Hands', 'Enchant', ['hands']],
    'Waist': ['Waist', null, ['waist']],
    'Legs': ['Legs', 'Enchant', ['legs']],
    'Feet': ['Feet', 'Enchant', ['feet']],
    'Finger': ['Finger', null, ['finger1', 'finger2']],
    'Trinket': ['Trinket', null, ['trinket1', 'trinket2']],
    'Main Hand Weapon': ['Main Hand', 'Enchant', ['mainHand']],
    'Weapon - Main Hand': ['Main Hand', null, ['mainHand']],
    'Weapon - Off Hand': ['Off Hand', null, ['offHand']],
    'Weapons': ['Two-Hand', 'Enchant', ['mainHand']],
    'Dual Wield': ['Weapon', 'Enchant', ['mainHand', 'offHand']],
    'Two-Hand Staff': ['Two-Hand', 'Enchant', ['mainHand']],
    'Held in Off Hand': ['Held In Off-hand', 'Enchant', ['offHand']],
    'Ranged': ['Ranged', null, ['mainHand']],
    'Wand': ['Ranged', null, ['ranged']],
    'Relic': ['Relic', null, ['ranged']],
    'Consumables': false,
    'Gems': false,
}

function UpdateUI(slotName, e)
{
    var table = $($('#ajaxcontentarea > table:first-child').get(0));

    if(table.length != 0)
    {
        var tmp = parseInt(table.attr('cellpadding')) + parseInt(table.attr('cellspacing'));
        table.attr('cellpadding', '0').attr('cellspacing', '0');
        $('td', table).css('padding', '' + tmp);
    }
    
    if(characterData == null)
    {
        log('No data retrieved for character.');
        return;
    }

    var icon = $('img#smg_characterIcon:hidden');
    if(icon.length == 1)
    {
        // Note: the 'toLowerCase' for the zone is required else you will receive a 'file not found' (HTTP404) .... bad blizzard!
        var iconUrl = 'http://' + zone + '.battle.net/static-render/' + zone.toLowerCase() + '/' + characterData.thumbnail;
        icon.attr('src', iconUrl).show();
    }
    
    var selectedSlot = $('li[class=\'selected\'] a[rel=\'ajaxcontentarea\'] img', '#maintab').attr('alt');
    var mappings = slots[selectedSlot];
    
    if(mappings != null && !mappings)
    {
        log('No mappings found for slot:', selectedSlot);
        return;
    }
    else if(mappings == null)
    {
        log('No mapping defined for: ' + selectedSlot);
        return;
    }
    else if(mappings.length != 3)
    {
        log('Mappings for [' + selectedSlot + '] are incomplete.');
        return;
    }
    
    // mappings[0] = Item table text
    // mappings[1] = Enchant table text
    // mappings[2] = armory object key(s)

    var currentSlot = $('td[class=\'tableType\']:contains(\'' + mappings[0] + '\')', '#ajaxcontentarea');

    if(currentSlot.length == 0)
    {
        if(timeoutToken != null)
        {
            clearInterval(timeoutToken);
            timeoutToken = null;
        }

        log('Delay ::  not found [' + mappings[0] + '] for [' + selectedSlot + '].');
        timeoutToken = setTimeout(UpdateUI, 1000);
        return;
    }
    
    if(characterData == null)
    {
        log('Character data not available...');
        return;
    }

    var itemsTable = currentSlot.closest('table');
    var items = [];
    
    var dataKeys = mappings[2];
    
    log('characterData:', characterData);
    log('dataKeys:', dataKeys);

    for(var key in dataKeys)
    {
        log('key:', dataKeys[key]);
        items.push(characterData.items[dataKeys[key]]);
    }
    
    if(items == null || items.length == 0)
    {
        log('Item [' + selectedSlot + '] not found.');
        return;
    }
    
    var rows = [];
    
    for(var idx = 0; idx < items.length; idx++)
    {
        var item = items[idx];
        log('items[' + idx + ']' ,item);
        var itemLink = $('a[href$=\'' + item.id + '\']', itemsTable);
        if(itemLink.length == 0)
        {
            //log('No row found for item: ' + item.id + ' [' + item.name + ']');
            $('<tr><td></td><td colspan="4">Currently geared with ' +
              '<a style="font-size:13px;" target="_blank" href="http://www.wowhead.com/item=' + item.id + '">' + item.name + '</a>; ' +
              'this item is not listed below. It is either filtered out due to the settings above or lower than the gear listed.</td>' +
              '<td colspan="3"></td></tr>').insertAfter(currentSlot.parent().next());
            continue;
        }
        var itemRow = itemLink.closest('tr');
        itemRow.addClass('gotIt');
        
        var cells = $('td', itemRow);
        
        cells.last().html('&nbsp;'); // Fix layout for FF.
        
        rows.push({
            //iLevel: $(cells.get(3)).text(),
            score: parseFloat($(cells.get(4)).text().replace(',','')),
            row: itemRow
        });
        
        var iLvlCell = $(cells.get(3));
        var iLvl = parseInt(iLvlCell.text());
        
        iLvlCell.wrapInner('<abbr title="' + characterData.items.averageItemLevelEquipped + ' (' + characterData.items.averageItemLevel + ')" />');
        $('abbr', iLvlCell).addClass(iLvl > characterData.items.averageItemLevelEquipped ? 'okGear' : 'lowGear')
    }

    if(rows.length == items.length)
    {
        if(rows.length > 1)
        {
            rows.sort(function(l,r){ return l.score > r.score ? 1 : -1; });
        }
    
        rows[0].row.nextAll().addClass('lesserItem');

        var columnCell = rows[0].row.find('td').get(4);
   		var tableRows = currentSlot.parent().next().nextAll();
		var baseScore = rows[0].score;

        var cellWidth = $(columnCell).width();
        var itemRowIndex = tableRows.index(rows[0].row);
        
        var minScore = parseFloat($($('td', tableRows.last()).get(4)).text().replace(',',''));
        var maxScore = parseFloat($($('td', tableRows.first()).get(4)).text().replace(',',''));
        var perScore = cellWidth / (maxScore - minScore);
        var baseOffset = perScore * (baseScore - minScore);

		for(var idx = 0; idx < tableRows.length; idx++)
		{
			var currentRow = $(tableRows[idx]);
			var cell = $($('td', currentRow).get(4));
            cell.width(cellWidth);
			var rowScore = parseFloat(cell.text().replace(',',''));
			var relativeScore = rowScore - baseScore;
    
			if(relativeScore == 0) cell.html('&nbsp;');

            relativeScore = Math.round(relativeScore * 10) / 10;

            var textDiv = $('div', cell);
            var barDiv = $('<div style="position: absolute; padding: 0px; height: 16px;" />').css('background-color', '#92c183');
            
            textDiv.removeAttr('style').css('position', 'relative').css('padding', '1px').css('z-index', '16');
            
            barDiv.insertBefore(textDiv);
            
			if(relativeScore > 0)
			{
                barDiv.css('margin-left', baseOffset);
                barDiv.css('width', relativeScore * perScore);
				textDiv.text('+' + relativeScore);
			}
			else
			{
                var w = -relativeScore * perScore;
                barDiv.css('margin-left', baseOffset - w);
                barDiv.css('width', w).css('background-color', '#c18383');
				textDiv.text('' + relativeScore);
			}
		}
    }
}

var uiInitialized = false;

function EnsureUI(showCharacter)
{
    if(uiInitialized) return;

    if(zone != null)
    {
        // Set EU as default...
        $("select[name='zone']").val(zone);
    }

    if(!showCharacter)
    {
        return;
    }
    
    // Intercept click...
    $('a[rel=\'ajaxcontentarea\']').click(UpdateUI);

    $('form').each(function(index, element){
        // Adjust urls of forms to 'remember' the currently loaded character.
        // Note: the subsequent redirect (HTTP302) kills this :(
        //       'solved' this by using GM_getValue/GM_setValue below, in wanted
        //       side effect: when you visit the site later on, it still shows
        //       your other characters gear... maybe add a reset button?
        var form = $(this);
        var url = form.attr('action');
        url = appendParams(url, {z: zone, r: realm, n: name});
        form.attr('action', url);
    });

    var styleBlock = $('#mineStyles', 'head');
    
    if(styleBlock.length == 0){
        styleBlock = $('style').attr('type', 'text/css').attr('id', 'mineStyles');
        styleBlock.appendTo('head');
        // Yellow
        styleBlock.append('.gotIt > td { background-color: rgba(255, 255, 0, .3); border-top: solid 2px #FFFF00; border-bottom: solid 2px #FFFF00; }');
        styleBlock.append('.gotIt > td:first-child { border-left: solid 2px #FFFF00; }');
        styleBlock.append('.gotIt > td:last-child { border-right: solid 2px #FFFF00; }');
        // Light blue
        //styleBlock.append('.gotIt > td { background-color: rgba(128, 255, 240, .3); border-top: solid 2px #80FFF0; border-bottom: solid 2px #80FFF0; }');
        //styleBlock.append('.gotIt > td:first-child { border-left: solid 10px green; }');
        //  styleBlock.append('.lesserItem { text-decoration: line-through; color: #a0a0a0!important; }');
        styleBlock.append('.lesserItem > td { opacity: .3; }');
        //  styleBlock.append('.lesserItem > td a { color: #a0a0a0!important; font-weight: normal; }');
        styleBlock.append('abbr.lowGear { color: red; font-weight: bold; }');
        styleBlock.append('abbr.okGear { color: green; }');
        styleBlock.append('abbr { cursor: help; border-bottom: 1px dotted #999; }');
        // Strangely, this block is added a second time :s weird, right? [Chrome only]
    }
    
    var infoHeader = $($('div#content div:first-child').get(0));
    if(infoHeader.length != 0)
    {
        // After reading: http://www.learningjquery.com/2009/03/43439-reasons-to-use-append-correctly
        // Changed my block by block approach to a big-html-string-at-once approach.
        var html = '<table id="smg_infoHeader" cellpadding="0" cellspacing="0" border="0"><caption>Show the gear of:</caption><tr>' +
            '<td rowspan="3"><img id="smg_characterIcon" style="display: none;" height="84" width="84" /></td>' +
            '<td>' + name + '</td></tr><tr><td>of ' + realm + '[' + zone + ']</td></tr><tr><td ' +
            'style="text-align: right;"><button id="smg_fillFilterButton">Adjust filter </button>' +
            '<button id="smg_resetButton">Reset</button></td></tr></table>';
        
        $(html).appendTo(infoHeader);
        $('button#smg_resetButton').click(ResetStoredValues);
        $('button#smg_fillFilterButton').click(AdjustFilter);
        
        //var headerText = $('.colHeaderText');
        $('caption', '#smg_infoHeader')
            .css('left', '9px') // headerText.css('left'))
            .css('position', 'relative') // headerText.css('position'))
            .css('font-size', '19px')
            .css('font-weight', 'bold');
        
        $('tr > td:last-child', '#smg_infoHeader').css('padding', '4');
        $('tr:last-child', '#smg_infoHeader').css('horizontal-alignment', 'bottom');
    }

    uiInitialized = true;
}

// See: http://<zone>.battle.net/api/wow/data/character/races
var alliance = [1/*Human*/,3/*Dwarf*/,4/*Night Elf*/,7/*Gnome*/,11/*Draenei*/,22/*Worgen*/];
var horde = [2/*Orc*/,5/*Undead*/,6/*Tauren*/,8/*Troll*/,9/*Goblin*/,10/*Blood Elf*/];

var instances = [
    // MoP
    { key: '548', name: 'Heart of Fear Raid Finder', minLvl: 90, iLvl: 440 },
    { key: '542', name: 'Heart of Fear', minLvl: 90, iLvl: 440 },
    { key: '545', name: 'Heart of Fear Heroic', minLvl: 90, iLvl: 440 },
    { key: '549', name: 'Mogu\'shan Vaults Raid Finder', minLvl: 90, iLvl: 440 },
    { key: '543', name: 'Mogu\'shan Vaults', minLvl: 90, iLvl: 440 },
    { key: '546', name: 'Mogu\'shan Vaults Heroic', minLvl: 90, iLvl: 440 },
    { key: '550', name: 'Terrace of Endless Spring Raid Finder', minLvl: 90, iLvl: 440 },
    { key: '544', name: 'Terrace of Endless Spring', minLvl: 90, iLvl: 440 },
    { key: '547', name: 'Terrace of Endless Spring Heroic', minLvl: 90, iLvl: 440 },
    // Cata
    { key: '470', name: 'Dragon Soul', minLvl: 85, iLvl: 372 },
    { key: '471', name: 'Dragon Soul Heroic', minLvl: 85, iLvl: 372 },
    { key: '473', name: 'Dragon Soul Raid Finder', minLvl: 85, iLvl: 372 },
    { key: '441', name: 'Firelands', minLvl: 85, iLvl: 359 },
    { key: '442', name: 'Firelands Heroic', minLvl: 85, iLvl: 359 },
    { key: '336', name: 'Blackwing Decent', minLvl: 85, iLvl: 342 },
    { key: '337', name: 'Blackwing Decent Heroic', minLvl: 85, iLvl: 342 },
    { key: '338', name: 'Bastion of Twilight', minLvl: 85, iLvl: 342 },
    { key: '339', name: 'Bastion of Twilight Heroic', minLvl: 85, iLvl: 342 },
    { key: '340', name: 'Throne of 4 Winds', minLvl: 85, iLvl: 342 },
    { key: '341', name: 'Throne of 4 Winds Heroic', minLvl: 85, iLvl: 342 },
    { key: 'cataFiveMan', name: '5-man dungeons', minLvl: 77, iLvl: 226, details: [
        { name: 'Abyssal Maw: Throne of the Tides', minLvl: 77, iLvl: 226 },
        { name: 'Blackrock Caverns', minLvl: 77, iLvl: 226 },
        { name: 'Grim Batol', minLvl: 83, iLvl: 305 },
        { name: 'Halls of Origination', minLvl: 83, iLvl: 305 },
        { name: 'Lost City of the Tol\'vir', minLvl: 83, iLvl: 305 },
        { name: 'The Stonecore', minLvl: 80, iLvl: 272 },
        { name: 'The Vortex Pinnacle', minLvl: 80, iLvl: 272 }
    ] },
    { key: 'cataFiveManHeroic', name: 'Heroic 5-man dungeons', minLvl: 85, iLvl: 329, details: [
        { name: 'Abyssal Maw: Throne of the Tides', minLvl: 85, iLvl: 329 },
        { name: 'Blackrock Caverns', minLvl: 85, iLvl: 329 },
        { name: 'End Time', minLvl: 85, iLvl: 353 },
        { name: 'Grim Batol', minLvl: 85, iLvl: 329 },
        { name: 'Halls of Origination', minLvl: 85, iLvl: 329 },
        { name: 'Hour of Twilight', minLvl: 85, iLvl: 353 },
        { name: 'Lost City of the Tol\'vir', minLvl: 85, iLvl: 329 },
        { name: 'The Stonecore', minLvl: 85, iLvl: 329 },
        { name: 'The Vortex Pinnacle', minLvl: 85, iLvl: 329 },
        { name: 'Well of Eternity', minLvl: 85, iLvl: 353 },
        { name: 'Zul\'Aman', minLvl: 85, iLvl: 346 },
        { name: 'Zul\'Gurub', minLvl: 85, iLvl: 346 },
    ] },
    { key: 'mopFiveMan', name: '5-man dungeons', minLvl: 85, iLvl: 358, details: [
        { name: 'Temple of the Jade Serpent', minLvl: 85, iLvl: 358 },
        { name: 'Stormstout Brewery', minLvl: 85, iLvl: 358 },
        { name: 'Mogu\'shan Palace', minLvl: 87, iLvl: 393 },
        { name: 'Shado-Pan Monastery', minLvl: 87, iLvl: 393 }
    ] },
    { key: 'mopFiveManHeroic', name: '5-man dungeons', minLvl: 90, iLvl: 440, details: [
        { name: 'Temple of the Jade Serpent', minLvl: 90, iLvl: 440 },
        { name: 'Stormstout Brewery', minLvl: 90, iLvl: 440 },
        { name: 'Mogu\'shan Palace', minLvl: 90, iLvl: 440 },
        { name: 'Shado-Pan Monastery', minLvl: 90, iLvl: 440 },
        { name: 'Gate of the Setting Sun', minLvl: 90, iLvl: 440 },
        { name: 'Siege of Niuzao Temple', minLvl: 90, iLvl: 440 }
    ] },
    { key: '328', name: 'Justice Points', minLvl: 60, iLvl: 50 },
    { key: '327', name: 'Valor Points', minLvl: 85, iLvl: 50 },
    { key: '9', name: 'PVP', minLvl: 91, iLvl: 0 },
    { key: 'expansionOlder', name: 'Older expansion(s)', minLvl: 0, iLvl: 0 },
    { key: 'expansionCata', name: 'Cataclysm', minLvl: 80, iLvl: 0 },
    { key: 'expansionWrath', name: 'Wrath of the Lich King', minLvl: 68, iLvl: 0 }
];

function AdjustFilter()
{
    var faction = alliance.indexOf(characterData.race) >= 0 ? 1 : 2;
    var ilvl = /*characterData.items.averageItemLevelEquipped*/ characterData.items.averageItemLevel;
    
    $('input[name=\'faction[]\'][value=\'' + faction +'\']').attr('checked', 'checked');
    $('input[name=\'faction[]\'][value=\'' + (faction == 1 ? 2 : 1) +'\']').removeAttr('checked');

    var levelSelect = $('select[name=\'reqlevel\']');
    var tmp = levelSelect.val();
    levelSelect.val(characterData.level);
    
    if(levelSelect.val() != characterData.level)
    {
        levelSelect.val(tmp);
    }
    
    for(var idx = 0; idx < instances.length; idx++)
    {
        var instance = instances[idx];
        var selector = 'input[name=\'zoneArray[]\'][value=\'' + instance.key + '\']';
        var checkbox = $(selector);

        if(instance.minLvl > characterData.level || instance.iLvl > ilvl)
        {
            // Uncheck it.
            checkbox.removeAttr('checked');
        }
        else
        {
            // Check it.
            checkbox.attr('checked', 'checked');
            
            if(typeof(instance.details) !== 'undefined')
            {
                var available = [];

                for(var dx = 0; dx < instance.details.length; dx++)
                {
                    var dungeon = instance.details[dx];
                    
                    if(dungeon.minLvl <= characterData.level && dungeon.iLvl <= ilvl)
                    {
                        available.push(dungeon.name);
                    }
                }
                
                if(available.length != instance.details.length)
                {
                    var tooltipText = available.join('&#x0a;'); // new lines in title.
                    var labelCell = checkbox.parent().next().next();
                    labelCell.wrapInner('<abbr title="' + tooltipText + '" />');
                }
            }
        }
    }
}


function ResetStoredValues()
{
    var settings = null;
    var settingString = GM_getValue('settings');
    
    if(settingString != null)
    {
        settings = JSON.parse(settingString);
    }
    
    if(settings == null)
    {
        return;
    }

    if(settings[location.pathname] != null)
    {
        settings[location.pathname].name = null;
    }

    // Store values.
    settingString = JSON.stringify(settings);
    GM_setValue('settings', settingString);
    
    location.href = location.pathname;
}

(function()
{
    var showCharacter = !(name == null || realm == null || zone == null);

    if(!showCharacter)
    {
        var settings = null;
        var settingString = GM_getValue('settings');

        if(settingString != null)
        {
            settings = JSON.parse(settingString);
            var zrn = settings[location.pathname];
            if(zrn != null)
            {
                zone = zrn.zone;
                realm = zrn.realm;
                name = zrn.name;
            }
        }
        
        showCharacter = !(name == null || realm == null || zone == null);
    }
    else
    {
        var settings = null;
        var settingString = GM_getValue('settings');
        
        if(settingString != null)
        {
            settings = JSON.parse(settingString);
            //log(settings);
        }
        
        if(settings == null)
        {
            settings = {};
        }
        
        settings[location.pathname] = { name: name, realm: realm, zone: zone };

        // Store values.
        settingString = JSON.stringify(settings);
        GM_setValue('settings', settingString);
    }
        
    EnsureUI(showCharacter);
        
    if(!showCharacter)
    {
        return;
    }

    log('name: ', name);
    log('realm: ', realm);
    log('zone: ', zone);

    // construct url
    var url = 'http://' + zone + '.battle.net/api/wow/character/' + realm + '/' + name + '?fields=items';

    // [20140226] Add '|| true'; $.ajax gets blocked due to 'Access-Control-Allow-Origin'
	if($.browser.mozilla || true)
	{
		GM_xmlhttpRequest({
		  method: "GET",
		  url: url,
		  headers: { "Accept": "application/json" },
		  onload: function(response) { processItems(JSON.parse(response.responseText)); }
		});
	}
	else
	{
		$.ajax({
			url: url,
			type: 'GET',
            processData: true,
			dataType: 'json',
			success: processItems
		});
	}
})();
