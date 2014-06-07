// ==UserScript==
// @name                Nukezome Forums Page Navigator
// @namespace           noes
// @description         This script allows you to go to other pages in a topic without scrolling to the bottom
// @include             http://*nukezone.nu/forum/*
// ==/UserScript==

var tds = document.getElementsByTagName('td');
var copypasta = 0;
if (document.location.href.search('Action=Display') != -1)
for (var i=0; i < tds.length; i++)
{
	if (tds[i].getElementsByTagName('a').length != 0 && tds[i].getElementsByTagName('td').length == 0 && tds[i].innerHTML.search('Page=') != -1)
	{
		var a = tds[i].getElementsByTagName('a')[0];
		copypasta = a.parentNode.innerHTML;
	}
}

if (copypasta != 0)
{
	var as = document.body.getElementsByTagName('a');
	var count = 0;
	for (var j=0; j < as.length; j++)
	{
		if (as[j].getAttribute('href').search('Action=NewTopic') != -1)
		{
			var newstuff = document.createElement('td');
			newstuff.setAttribute('valign', 'bottom');
			newstuff.setAttribute('align', 'left');
			newstuff.innerHTML = copypasta;
			newstuff.getElementsByTagName('b')[1].parentNode.removeChild(newstuff.getElementsByTagName('b')[1]);
			var select = newstuff.getElementsByTagName('select');
			for (var k=0; k < select.length; k++)
			{
				select[k].parentNode.removeChild(select[k]);
			}
			as[j].parentNode.insertBefore(newstuff, as[j].nextSibling.nextSibling);
			count++;
		}
		if (count > 0)
			break;
	}
}