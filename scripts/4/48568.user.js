// ==UserScript==
// @name                Nubinox
// @namespace           Nukezone
// @description         Just for m00ser
// @include             http://www.nukezone.nu/game.asp?Action=Main
// ==/UserScript==

var tds = document.getElementsByTagName('td');
for (var i=0; i < tds.length; i++)
{
	var td = tds[i];
	if (td.innerHTML == "What's Next")
	{
		var newtd = document.createElement('td');
		newtd.setAttribute('width', '100%')
		var newtr = document.createElement('tr');
		var newb = document.createElement('b');
		var newli = document.createElement('li');
		var newul = document.createElement('ul');
		var newfont = document.createElement('font');
		newul.setAttribute('id', 'quickLinks');
		newfont.setAttribute('color', '#52544E');
		newb.innerHTML = 'Equinox';
		newfont.appendChild(newb);
		newfont.innerHTML += ' is a nub';
		newli.appendChild(newfont);
		newul.appendChild(newli);
		newtd.appendChild(newul);
		newtr.appendChild(newtd);
		
		td.parentNode.parentNode.insertBefore(newtr, td.parentNode.nextSibling);
	}
}