// ==UserScript==
// @name           I need your ID
// @namespace      wowhead
// @description    Gets IDs for items, spells, npcs, objects, quests, factions and zones
// @include        http://www.wowhead.com/*
// ==/UserScript==



// *** LOCALIZATION ***

// Factions
var g_factions = {
	1037: 'Alliance Vanguard',
	1106: 'Argent Crusade',
	529:  'Argent Dawn',
	1012: 'Ashtongue Deathsworn',
	87:   'Bloodsail Buccaneers',
	21:   'Booty Bay',
	910:  'Brood of Nozdormu',
	609:  'Cenarion Circle',
	942:  'Cenarion Expedition',
	909:  'Darkmoon Faire',
	530:  'Darkspear Trolls',
	69:   'Darnassus',
	577:  'Everlook',
	930:  'Exodar',
	1068: 'Explorers\' League',
	1104: 'Frenzyheart Tribe',
	729:  'Frostwolf Clan',
	369:  'Gadgetzan',
	92:   'Gelkis Clan Centaur',
	54:   'Gnomeregan Exiles',
	946:  'Honor Hold',
	1052: 'Horde Expedition',
	749:  'Hydraxian Waterlords',
	47:   'Ironforge',
	989:  'Keepers of Time',
	1090: 'Kirin Tor',
	1098: 'Knights of the Ebon Blade',
	978:  'Kurenai',
	1011: 'Lower City',
	93:   'Magram Clan Centaur',
	1015: 'Netherwing',
	1038: 'Ogri\'la',
	76:   'Orgrimmar',
	470:  'Ratchet',
	349:  'Ravenholdt',
	1031: 'Sha\'tari Skyguard',
	1077: 'Shattered Sun Offensive',
	809:  'Shen\'dralar',
	911:  'Silvermoon City',
	890:  'Silverwing Sentinels',
	970:  'Sporeggar',
	730:  'Stormpike Guard',
	72:   'Stormwind',
	70:   'Syndicate',
	932:  'The Aldor',
	933:  'The Consortium',
	510:  'The Defilers',
	1126: 'The Frostborn',
	1067: 'The Hand of Vengeance',
	1073: 'The Kalu\'ak',
	509:  'The League of Arathor',
	941:  'The Mag\'har',
	1105: 'The Oracles',
	990:  'The Scale of the Sands',
	934:  'The Scryers',
	935:  'The Sha\'tar',
	1094: 'The Silver Covenant',
	1119: 'The Sons of Hodir',
	1124: 'The Sunreavers',
	1064: 'The Taunka',
	967:  'The Violet Eye',
	1091: 'The Wyrmrest Accord',
	59:   'Thorium Brotherhood',
	947:  'Thrallmar',
	81:   'Thunder Bluff',
	576:  'Timbermaw Hold',
	922:  'Tranquillien',
	68:   'Undercity',
	1050: 'Valiance Expedition',
	1085: 'Warsong Offensive',
	889:  'Warsong Outriders',
	471:  'Wildhammer Clan',
	589:  'Wintersaber Trainers',
	270:  'Zandalar Tribe'
};



var kinds = {
	Item:                                                ['[item=#]',          '',       'http://www.wowhead.com/?items&filter=na=#'],
	NPC:                                                 ['[url=/?npc=#]',     '[/url]', 'http://www.wowhead.com/?npcs&filter=na=#'],
	Object:                                              ['[url=/?object=#]',  '[/url]', 'http://www.wowhead.com/?objects&filter=na=#'],
	Spell:                                               ['[spell=#]',         '',       'http://www.wowhead.com/?spells&filter=na=#'],
	"Spell (<acronym title=\"Last rank\">LR</acronym>)": ['[spell=#]',         '',       'http://www.wowhead.com/?spells&filter=na=#;cr=12;crs=1;crv=0'],
	Quest:                                               ['[quest=#]',         '',       'http://www.wowhead.com/?quests&filter=na=#'],
	Faction:                                             ['[url=/?faction=#]', '[/url]', g_factions],
	Zone:                                                ['[url=/?zone=#]',    '[/url]', unsafeWindow.g_zones]
};


var tempResult = {};


function SeekID(kind)
{
	var choice = document.getElementById('seekIDchoice');
	choice.innerHTML = '';
	choice.style.visibility = 'hidden';

	var selectedText = unsafeWindow.trim(GetSelectedText(document.getElementById('editBox'))).toLowerCase();

	if(selectedText == '')
	{
		DisplayNote('nothing selected', '#FF0000');
		return;
	}

	if(typeof kinds[kind][2] == 'string')
	{
		unsafeWindow.Ajax(unsafeWindow.str_replace(kinds[kind][2], '#', unsafeWindow.urlencode(selectedText)), { onSuccess: SeekIDOnSuccess, onFailure: SeekIDOnFailure, selectedText: selectedText, kind: kind });
		DisplayNote('querying...', '#00FF00');
	}
	else if(typeof kinds[kind][2] == 'object')
	{
		for(var i in kinds[kind][2])
		{
			if(kinds[kind][2][i].toLowerCase() == selectedText)
			{
				unsafeWindow.g_insertTag('editBox', unsafeWindow.str_replace(kinds[kind][0], '#', i), kinds[kind][1]);
				DisplayNote('');
				return;
			}
		}

		DisplayNote('nothing found', '#FF0000');
	}
}

function SeekIDOnSuccess(xhr, opt)
{
	// selection changed
	if(unsafeWindow.trim(GetSelectedText(document.getElementById('editBox'))).toLowerCase() != opt.selectedText)
	{
		DisplayNote('text selection changed', '#FF0000');
		return;
	}

	// search for items info
	var bigDirty = xhr.responseText.match("^new Listview(.*);$", "im");

	if(bigDirty)
		bigDirty = eval('(' + bigDirty[1].replace(/template.*data:/i, 'data:') + ')');

	if(bigDirty && bigDirty.data)
	{
		bigDirty = bigDirty.data;

		var matches = [];

		for(var i in bigDirty)
		{
			var fc = bigDirty[i].name.charAt(0);
			if(fc == '@' || fc == '0' || fc == '1' || fc == '2' || fc == '3' || fc == '4' || fc == '5' || fc == '6' || fc == '7')
			{
				bigDirty[i].quality = fc;
				bigDirty[i].name = bigDirty[i].name.substr(1);
			}

			if(bigDirty[i].name.toLowerCase() == opt.selectedText)
				matches.push(i);
		}

		if(matches.length == 1)
		{
			unsafeWindow.g_insertTag('editBox', unsafeWindow.str_replace(kinds[opt.kind][0], '#', bigDirty[matches[0]].id), kinds[opt.kind][1], (kinds[opt.kind][1] == ''? function() { return ''; }: 0));
			DisplayNote('');
			return;
		}
		else if(matches.length > 1)
		{
			tempResult.selectedText = opt.selectedText;
			tempResult.kind = opt.kind;
			tempResult.data = bigDirty;

			var choice = document.getElementById('seekIDchoice');
			choice.style.visibility = 'visible';

			for(var i in matches)
			{
				// Link
				var a = document.createElement('a');
				a.href = '/?' + opt.kind.toLowerCase() + '=' + bigDirty[matches[i]].id;
				a.target = '_blank';

				if(bigDirty[matches[i]].quality)
					a.className = 'q' + (7 - bigDirty[matches[i]].quality);

				a.appendChild(document.createTextNode(bigDirty[matches[i]].name));
				choice.appendChild(a);

				// ' -> '
				choice.appendChild(document.createTextNode(' -> '));

				// Select
				a = document.createElement('a');
				a.href = 'javascript:;';
				unsafeWindow.aE(a, 'click', function(i) { return function() { SelectChoice(i); }; }(i) );
				a.appendChild(document.createTextNode('Select'));
				choice.appendChild(a);

				choice.appendChild(document.createElement('br'));
			}

			DisplayNote(matches.length + ' matches - <a href="javascript:;" id="seekIDhide">Hide</a>', '#FFFFFF');
			unsafeWindow.aE(document.getElementById('seekIDhide'), 'click', HideChoice );
			return;
		}
		else
		{
			DisplayNote('nothing found', '#FF0000');
		}
	}
}

function SeekIDOnFailure(xhr, opt)
{
	DisplayNote('an error occured', '#FF0000');
}

function SelectChoice(i)
{
	var choice = document.getElementById('seekIDchoice');
	choice.innerHTML = '';
	choice.style.visibility = 'hidden';

	// selection changed
	if(unsafeWindow.trim(GetSelectedText(document.getElementById('editBox'))).toLowerCase() != tempResult.selectedText)
	{
		DisplayNote('text selection changed', '#FF0000');
		return;
	}

	unsafeWindow.g_insertTag('editBox', unsafeWindow.str_replace(kinds[tempResult.kind][0], '#', tempResult.data[i].id), kinds[tempResult.kind][1], (kinds[tempResult.kind][1] == ''? function() { return ''; }: 0));
	DisplayNote('');
}

function HideChoice()
{
	var choice = document.getElementById('seekIDchoice');
	choice.innerHTML = '';
	choice.style.visibility = 'hidden';
}

function GetSelectedText(n)
{
	if(n.selectionStart != null)
	{
		var s = n.selectionStart,
		    e = n.selectionEnd,
		    sL = n.scrollLeft,
		    sT = n.scrollTop;

		return n.value.substring(s, e);
	}
	else if(document.selection && document.selection.createRange)
	{
		var range = document.selection.createRange();

		if(range.parentElement() != n)
			return '';

		return range.text;
	}
}

function DisplayNote(note, col)
{
	var n = document.getElementById('seekIDnote');

	if(note != '')
		n.innerHTML = '(' + note + ')';
	else
		n.innerHTML = '';

	if(col)
		n.style.color = col;
}





// *** INTERFACE ***

var editBox = document.getElementById('editBox');
if(editBox)
{
	// box
	var box = document.createElement('div');
	box.style.cssFloat = box.style.styleFloat = 'left';
	box.style.whiteSpace = 'nowrap';
	box.style.marginLeft = '50px';

	// <b>Get ID</b>
	var b = document.createElement('b');
	b.appendChild(document.createTextNode('Get ID'));
	box.appendChild(b);

	// <small>Note</small>
	var s = document.createElement('small');
	s.id = 'seekIDnote';
	s.style.marginLeft = '30px';
	box.appendChild(s);

	// <br />
	box.appendChild(document.createElement('br'));

	// Links
	var first = true;
	for(var i in kinds)
	{
		if(!first) // not the first one
			box.appendChild(document.createTextNode(', '));
		else
			first = false;

		var a = document.createElement('a');
		a.innerHTML = i;
		a.href = 'javascript:;';
		unsafeWindow.aE(a, 'click', function(kind) { return function() { SeekID(kind); }; }(i) );
		box.appendChild(a);
	}

	// <div> Choice...
	var d = document.createElement('div');
	d.id = 'seekIDchoice';
	d.style.padding = '5px';
	d.style.backgroundColor = '#181818';
	d.style.border = '1px solid #404040';
	d.style.maxHeight = '100px';
	d.style.overflow = 'scroll';
	d.style.visibility = 'hidden';
	box.appendChild(d);

	// append the box to the form

	var Bs = document.getElementsByTagName('b');

	for(var i in Bs)
		if(Bs[i].innerHTML == 'Colors')
			editBox = Bs[i].parentNode;

	while(editBox.className != 'clear' && editBox.nextSibling)
		editBox = editBox.nextSibling;

	editBox.parentNode.insertBefore(box, editBox);
}
