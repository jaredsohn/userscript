// ==UserScript==
// @name           Spambots? In my /b/?
// @namespace      org.4chan.11.12.13.spamhider
// @description    hides the spamposts on 4chan
// @include        http://boards.4chan.org/*
// ==/UserScript==


var blackstrings_val_name = 'blackstrings'
var blackstrings_splitter = ';'

function setTriggerStrings()
{
	
	var oldStr = GM_getValue(blackstrings_val_name,'http://teye.info/;http://liencs.fr/;/xuta.me;/ts-escort-jasmine.co.uk/;http://tvf.me;mirclaire.com;2dl.us;CCCCPPP;ur3.us;http://4shr.us;http://lustmix.com;http://gink.us;http://00.uz/')
	
	var newStr = prompt('Enter blacklisted phrases, separate with semicolon(;)',oldStr)
	if (newStr == null) return;
	
	GM_setValue(blackstrings_val_name,newStr)
	hidePosts()
}
function getTriggerStrings()
{
	var s = GM_getValue(blackstrings_val_name,'http://teye.info/;http://liencs.fr/;/xuta.me;/ts-escort-jasmine.co.uk/;http://tvf.me;mirclaire.com;2dl.us;CCCCPPP;ur3.us;http://4shr.us;http://lustmix.com;http://gink.us;http://00.uz')
	var a = s.split(blackstrings_splitter)
	return a;
}

function hidePosts() {
	var triggerStrings = getTriggerStrings()
	var triggerStringsLen=triggerStrings.length
	var tables = document.getElementsByTagName('table')

	for (var x = tables.length - 1;  x >= 0;  --x)
	{
		//search through all posts in thread, starting from behind
		var blockquotes = tables[x].getElementsByTagName('blockquote')
		//tables with no blockquote? ignore
		if (!blockquotes.length) continue
		txt = blockquotes[0].innerHTML
		for (var y = triggerStringsLen - 1;  y >= 0;  --y)
		{
			//Check for triggerStrings one by one
			if (txt.indexOf(triggerStrings[y]) != -1)
			{
				//found a triggerString in post, kill with fire
				tables[x].style.display = 'none'
			}
			else
			{
				//tables[x].style.display = 'none'
			}
		}
	}
}

GM_registerMenuCommand('Edit blacklist strings',setTriggerStrings,'e')
hidePosts();

