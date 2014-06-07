// ==UserScript==
// @name           FrEe-hAcK extended message warning
// @namespace      by big earl 4 FrEe-hAcK
// @namespace      ICQ: 	226722385
// @namespace      Jabber: 	bigearl@jabber.ccc.de
// @namespace      MSN:		bigearl@live.de
// @include        http://free-hack.com/*
// ==/UserScript==

var obj = document.getElementsByTagName('td');

for ( var i = 0; i < obj.length; i++ )
{
	if ( obj[i].getAttribute('class',0) == 'alt2' )
	{
		if ( obj[i].getAttribute('nowrap',0) == 'nowrap' )
		{
			if ( document.getElementById('notifications') )
			{
				var txt = document.getElementById('notifications');
				var c = txt.innerHTML.substr(txt.innerHTML.indexOf('<strong>',0)+8, txt.innerHTML.indexOf('</strong>',0)-txt.innerHTML.indexOf('<strong>',0)-8);
				if ( c > 0 )
				{
					obj[i].style.backgroundColor = '#FF9900';
				}
				i = obj.length;
			}
		}
	}
}