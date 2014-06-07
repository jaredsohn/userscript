// ==UserScript==
// @name                UrbanDead title info prev
// @namespace           http://chillidonut.com/
// @description         Displays current AP/HP/XP in title
// @include             http://*urbandead.com/map.cgi*
// ==/UserScript==

updateTitle();

function updateTitle()
{
	document.title = 'Urban Dead'
	
	var ap = parseForValue(/You have <b>([0-9]+)<\/b> Action Points? remaining/);
	if (ap == null) return;

	document.title += ' ('+ap+'ap';
	
	var hp = parseForValue(/You have <b>([0-9]+)<\/b> Hit Points/);
	if (hp > null) {
		document.title += ' / '+hp+'hp';
	}

	var xp = parseForValue(/<b>([0-9]+)<\/b> Experience Points\./);
	if (xp > null) {
		document.title += ' / '+xp+'xp';
	}
	
	document.title += ')';
}

function parseForValue(re)
{
	var matches;
	
	if (re.test(document.body.innerHTML))
	{
		matches = re.exec(document.body.innerHTML);
		
		return parseInt(matches[1]);
	}
	
	return null;
}