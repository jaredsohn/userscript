// ==UserScript==
// @name           DicingDangers : Shortcuts
// @namespace      http://gm.wesley.eti.br/dicingdangers
// @include        http://92.48.103.52/fantasy/*
// ==/UserScript==

(function()
{	// script scope

	// your Player Id
	var id = GM_getValue('PlayerId');
	if (!id)
		GM_setValue('PlayerId', prompt('What is your Player ID?'));

	// ordered by position of key on the keyboard
	const Shortcut = {
		'1' : 'screen=SCROLLS&command=use&var5=' + id + '&var1=Lesser+Focus+Scroll',
		'2' : 'screen=SCROLLS&command=use&var5=' + id + '&var1=Lesser+Shield+Scroll',
		'3' : 'screen=SCROLLS&command=use&var5=' + id + '&var1=Summon+Skeleton',
		'4' : 'screen=SCROLLS&command=use&var5=' + id + '&var1=Shield+Scroll',
		'5' : 'screen=SCROLLS&command=use&var5=' + id + '&var1=Focus+Scroll',
		'6' : '',
		'7' : 'screen=INVENTORY',
		'8' : 'screen=INVENTORY&command=equip&var1=Lesser+Healing+Potion',
		'9' : 'screen=INVENTORY&command=equip&var1=Healing+Potion',
		'0' : 'screen=INVENTORY&command=equip&var1=Greater+Healing+Potion',
		'm' : '',	// -
		'k' : '',	// =

		'Q' : 'screen=CHAT',
		'W' : 'screen=CHAT&var2=7593',
		'E' : 'screen=CHAT&var2=10375',
		'R' : 'screen=CHAT&var2=12783',
		'T' : 'screen=CHAT&var2=12886',
		'Y' : 'screen=CHAT&var2=12472',
		'U' : '',
		'I' : 'screen=EXPLORING',
		'O' : 'screen=COMBAT',
		'P' : '',

		'A' : 'screen=LOCATION',
		'S' : 'screen=LOCATION&command=Move&var1=Gorin+Castle',
		'D' : 'screen=LOCATION&command=Move&var1=Castle+Dark+1001',
		'F' : 'screen=LOCATION&command=Move&var1=Darkvale+of+Vai',
		'G' : 'screen=LOCATION&command=Move&var1=Krali+Mountains',
		'H' : '',
		'J' : 'command=Flee',
		'K' : 'command=Rest',
		'L' : 'command=Prayer',
		';' : '',

		'Z' : 'command=swapcharacter&var1=17782',
		'X' : 'command=swapcharacter&var1=16030',
		'C' : '',
		'V' : 'screen=COMBAT&command=fightboss',
		'B' : '',
		'N' : 'screen=ADVANCEDCOMBAT',
		'M' : 'screen=ADVANCEDCOMBAT&command=updaterule&Submit2=Submit&var1=Potion&var2=Lesser+Healing+Potion&var3=%3C+100%25&var4=%3E+0&var5=%3E+0&var6=None&var7=PvPPvM&var8=100&var10=',
		'¼' : '', // <
		'¾' : 'screen=STATS', // >
		'¿' : 'screen=OTHERS', // :

		'\t': '',	// TAB
		'\r': 'screen=CLAN',	// ENTER
		' ' : 'screen=STATS&command=hunting'	// SPACE
	};

	document.addEventListener('keyup', function(e)
	{
		if (!(e.altKey || e.ctrlKey || e.metaKey || e.target && (e.target.nodeName.toLowerCase() == 'textarea' || e.target.nodeName.toLowerCase() == 'input' && /^(?:text|file)$/i.test(e.target.type))))
		{
			var char = String.fromCharCode(e.keyCode);

			if (char in Shortcut)
			{
				if (Shortcut[char])
					top.location.href = 'http://92.48.103.52/fantasy/game.php?' + Shortcut[char];
			}
			else
				alert('Character: ' + char);
		}
	}, false);

})();