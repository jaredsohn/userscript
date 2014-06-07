// ==UserScript==
// @name           Page Title Suite
// @namespace      http://www.alushinrio.com/
// @description    Allows user-specified page titles to be changed and also offers other options.
// @include        *
// ==/UserScript==
//History:
//Version 1.2 - Added whitelisting and blacklisting of filters.
//Version 1.1 -  Made "OO."  Internal release.
//Version 1.0 - The first version

//FILTERS
//If you have any of the following turned on, they will NOT be applied to pages
//which you specifically overrode.

//You can use any or all of these filters at once, but be warned, it might get pointless.
//For instance, if you have Randomize going, none of the other filters do much of anything.
//You could change the order around, but you'll have to do that coding yourself.
//Filters can be turned on/off through User Script Commands in the GM menu.

//Filter descriptions are as follows:

//Obfuscation chops out all non-alphanumerics.
//Why you would want this on, I'm not sure, but in case you do, it's available.
var obfuscate = GM_getValue('titleobfuscate',false);

//Removal removes various common words, the identities of which can be
//changed via the handy array following.
var removal = GM_getValue('titleremoval',false);
var remove_these = new Array ('the','a','an','of','in','on');

//Decimation removes each Nth letter, N being controlled via the handy
//variable following.  For correctness, I've set it to 10, but that's hardly
//a huge reduction, so set it lower if you want.  Or set it to 1 and watch
//all the titles magically disappear.
var decimate = GM_getValue('titledecimate',false);
var decimate_by = 10;

//Randomization gives each page a random title from the array below.
//Change it, or make it only one item, or whatever.
var randomize = GM_getValue('titlerandomize',false);
var random_titles = new Array('Gloogle', 'Yaboo', 'Some Page','I Rule the World!',
	'Sexxxy Sexxxy Cows!', 'Hot Naked Amish', 'Ask.corn','Firefox Add-Offs',
	'XXX Moonshine','Porn!','Microscoff','Wikipaedia','MyFace','Spacebook',
	'My First Homepage','This Title Randomized','Visit www.alushinrio.com');

//Oooh, new filter options.
//Engage the whitelist if you want to filter all titles except pages on the whitelist.
//Engage the blacklist if you want to filter no titles except pages on the blacklist.
//No, you cannot use them both.  They are accessible from the GM User Script menu too.
var whitelist_on = GM_getValue('whiteliston',false);
var blacklist_on = GM_getValue('blackliston',false);

//The new class structure!

function TitleReplaceArray()
{
	this._rarray = new Array();
	this.serialize = serializeReplaceArray;
	this.unserialize = unserializeReplaceArray;
	this.findPosition = findPositionReplaceArray;
	this.getTitle = getTitleReplaceArray;
	this.addLocation = addLocationReplaceArray;
	this.deleteLocation = deleteLocationReplaceArray;
	this.unserialize();
}

//Serialization functions to store the location/new title array
function serializeReplaceArray()
{
	if(this._rarray.length)
	{
		this._rarray.sort();
		temparray = new Array();
		for(i = 0; i < this._rarray.length; i++)
		{
		     temparray[i] = this._rarray[i].join('\u000B\u000B');
		}
		GM_setValue('titlereplace',temparray.join('\u000C\u000C'));
	}
}


function unserializeReplaceArray()
{
	this._rarray = new Array();
	temps = GM_getValue('titlereplace',false);
	if(temps != '')
	{
		temparray = temps.split('\u000C\u000C');
		for(i = 0; i < temparray.length; i++)
		{
		     this._rarray[i] = temparray[i].split('\u000B\u000B');
		}
		this._rarray.sort();
	}
}

//Since the array gets sorted, I can get away with using this algorithm.
//As the array will be searched much more often than it will be added to, it seemed
//like a fair trade.
function findPositionReplaceArray(loc)
{
	if(this._rarray)
	{
		loc = loc.toLowerCase();
		var begin = 0;
		var end = this._rarray.length;
		var middle = Math.floor(end/2);
		while(middle != begin && middle != end)
		{
			if(this._rarray[middle][0] == loc)
			{
				return middle;
			}
			else if(this._rarray[middle][0] > loc)
			{
				begin = middle;
				middle = Math.floor((end-begin)/2);
			}
			else
			{
				end = middle;
				middle = Math.floor((end-begin)/2);
			}
		}
	}
	return -1;
}

function getTitleReplaceArray(pos)
{
	return this._rarray[pos][1];
}

function addLocationReplaceArray(loc, newtitle)
{
	loc = loc.toLowerCase();
	pos = this.findPosition(loc);
	if(pos == -1)
	{
		this._rarray.push(Array(loc, newtitle));
	}
	else
	{
	     this._rarray[pos] = Array(loc, newtitle);
	}
	this.serialize();
}

function deleteLocationReplaceArray(loc)
{
	pos = this.findPosition(loc);
	if(pos != -1)
	{
		this._rarray.splice(pos, 1);
		this.serialize();
	}
}

//Whitelist/Blacklist class
function WBList(type)
{
	this._larray = new Array();
	this.serialize = serializeWBList;
	this.unserialize = unserializeWBList;
	this.type = type;
	//Javascript "OO" is so funny.  Not funny "ha-ha," funny "boo-hoo that totally sucks."
	if(this.type != 'white')
	{
		this.type == 'black';
	}
	this.findLocation = findLocationWBList;
	this.addLocation = addLocationWBList;
	this.deleteLocation = deleteLocationWBList;
	this.unserialize();
}

function serializeWBList()
{
	if(this._larray.length)
	{
		this._larray.sort();
		GM_setValue(this.type + 'list', this._larray.join('\u000C\u000C'));
	}
}

function unserializeWBList()
{
	this._larray = new Array();
	temps = GM_getValue(this.type + 'list', '');
	if(temps != '')
	{
		this._larray = temps.split('\u000C\u000C');
		this._larray.sort();
	}
}

function findLocationWBList(loc)
{
	if(this._larray)
	{
		loc = loc.toLowerCase();
		var begin = 0;
		var end = this._larray.length;
		var middle = Math.floor(end/2);
		while(middle != begin && middle != end)
		{
			if(this._larray[middle] == loc)
			{
				return middle;
			}
			else if(this._larray[middle] > loc)
			{
				begin = middle;
				middle = Math.floor((end-begin)/2);
			}
			else
			{
				end = middle;
				middle = Math.floor((end-begin)/2);
			}
		}
	}
	return -1;
}

function addLocationWBList(loc)
{
	loc = loc.toLowerCase();
	pos = this.findLocation(loc);
	if(pos == -1)
	{
		this._larray.push(loc);
		this.serialize();
	}
	//If it's already on the list, we don't need to do anything.
}

function deleteLocationWBList(loc)
{
	pos = this.findLocation(loc);
	if(pos != -1)
	{
		this._larray.splice(pos, 1);
		this.serialize();
	}
}

//Filtering functions
function obfuscator(str)
{
	return str.replace(/\W/gi,'');     //Pretty simple, no?
}

function remover(str)
{
	var temps = remove_these.join('|');
	var re = new RegExp('(\\s)(' + temps +')\\s', 'ig');
	new RegExp("(\\s)("+ temps + ")(?=\\s)", 'gi');
	return str.replace(re, '$1');
}

//This one could probably be done more efficiently as well.
function decimator(str)
{
	retval = '';
	for(i = 0; i < str.length; i++)
	{
	     if(((i + 1) % decimate_by) != 0)
	     {
	          retval += str[i];
	     }
	}
	return retval;
}

function randomizer()
{
     pick = Math.floor(Math.random()*random_titles.length);
     return random_titles[pick];
}

//Prompt handler
function titlePrompt()
{
	loc = window.location.href;
	newtitle = prompt("Enter new title for page: " + loc +
		"\nLeave blank to revert to original page title.");
	if(newtitle=='')
	{
	     customlist.deleteLocation(loc);
	}
	else
	{
	     customlist.addLocation(loc, newtitle);
	}
	document.location.reload();
}

function whitelistPage()
{
	loc = window.location.href;
	whitelist.addLocation(loc);
	document.location.reload();
}
function dewhitelistPage()
{
	loc = window.location.href;
	whitelist.deleteLocation(loc);
	document.location.reload();
}
function blacklistPage()
{
	loc = window.location.href;
	blacklist.addLocation(loc);
	document.location.reload();
}
function deblacklistPage()
{
	loc = window.location.href;
	blacklist.deleteLocation(loc);
	document.location.reload();
}

//Filter toggles
//There's probably some single-function way of doing this, so if there is, please
//feel free to let me know.
function toggleObfuscation()
{
	obfuscate = (!obfuscate);
	GM_setValue('titleobfuscate',obfuscate);
	document.location.reload();
}

function toggleRemoval()
{
	removal = (!removal);
	GM_setValue('titleremoval',removal);
	document.location.reload();
}

function toggleDecimation()
{
	decimate = (!decimate);
	GM_setValue('titledecimate',decimate);
	document.location.reload();
}

function toggleRandomization()
{
	randomize = (!randomize);
	GM_setValue('titlerandomize',randomize);
	document.location.reload();
}

function doLists(wl, bl)
{
	GM_setValue('whiteliston',wl);
	GM_setValue('blackliston',bl);
}

function toggleWhitelisting()
{
	if(whitelist_on)
	{
		whitelist_on = false;
	}
	else
	{
		blacklist_on = false
		whitelist_on = true;
	}
	doLists(whitelist_on, blacklist_on);
	document.location.reload();
}

function toggleBlacklisting()
{
	if(blacklist_on)
	{
		blacklist_on = false;
	}
	else
	{
		whitelist_on = false
		blacklist_on = true;
	}
	doLists(whitelist_on, blacklist_on);
	document.location.reload();
}

//HERE BEGINS THE SCRIPTING!
//A lot of setup for a hideous letdown, I should say.

//The various lists
var customlist = new TitleReplaceArray();
var whitelist, blacklist;

var new_title = document.title;
var loc = window.location.href;
var pos = customlist.findPosition(loc);
var custom = false;
var filter = true;
if(pos != -1)
{
	new_title = customlist.getTitle(pos);
	custom = true;
}
else
{
	if(whitelist_on)
	{
		whitelist = new WBList('white');
		pos = whitelist.findLocation(loc);
		if(pos != -1)
		{
			filter = false;
		}
	}
	else if(blacklist_on)
	{
		blacklist = new WBList('black');
		pos = blacklist.findLocation(loc);
		if(pos == -1)
		{
			filter = false;
		}
	}

	if(filter)
	{
		if(obfuscate)
		{
			new_title = obfuscator(new_title);
		}
		if(removal)
		{
			new_title = remover(new_title);
		}
		if(decimate)
		{
			new_title = decimator(new_title);
		}
		if(randomize)
		{
			new_title = randomizer();
		}
	}
}
document.title = new_title;

//Menu command registration
var tf = '';
obfuscate ? tf = "Off" : tf = "On";
GM_registerMenuCommand("Turn " + tf + " Title Obfuscation", toggleObfuscation);

removal ? tf = "Off" : tf = "On";
GM_registerMenuCommand("Turn " + tf + " Title Word Removal", toggleRemoval);

decimate ? tf = "Off" : tf = "On";
GM_registerMenuCommand("Turn " + tf + " Title Decimation", toggleDecimation);

randomize ? tf = "Off" : tf = "On";
GM_registerMenuCommand("Turn " + tf + " Title Randomization", toggleRandomization);

whitelist_on ? tf = "Off" : tf = "On";
GM_registerMenuCommand("Turn " + tf + " Title Whitelisting", toggleWhitelisting);

blacklist_on ? tf = "Off" : tf = "On";
GM_registerMenuCommand("Turn " + tf + " Title Blacklisting", toggleBlacklisting);

GM_registerMenuCommand("Custom Title This Page", titlePrompt);
//To keep down on menu commands filling up the screen, you only see the Whitelist/Blacklist
//commands if that feature is turned on.
if(whitelist_on && !custom)
{
	if(filter)
	{
     	GM_registerMenuCommand("Whitelist This Page", whitelistPage);
	}
	else
	{
     	GM_registerMenuCommand("Remove Page From Whitelist", dewhitelistPage);
	}
}
else if(blacklist_on && !custom)
{
	if(filter)
	{
     	GM_registerMenuCommand("Remove Page From Blacklist", deblacklistPage);
	}
	else
	{
     	GM_registerMenuCommand("Blacklist This Page", blacklistPage);
	}
}
