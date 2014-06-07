// ==UserScript==
// @name           erepublik newspaper advanced
// @namespace      erepublik newspaper advanced
// @description    erepublik newspaper advanced
// @include        http://www.erepublik.com/en/article/*
// ==/UserScript==

var arrdiv = document.getElementsByTagName("div");
for(var i = 0; i < arrdiv.length; i++)
{
	if (arrdiv[i].className == 'articlecomments')
	{
		var id = 0;
		var arra = arrdiv[i].getElementsByTagName("a");				
		for(var j = 0; j < arra.length; j++)
		{
			if(arra[j].className == 'nameholder')
			{
				id = arra[j].href.substr(44);
			}
		}
		//arrdiv[i].innerHTML += 'id: ' + id;

		var arrp = arrdiv[i].getElementsByTagName("p");		
		for(var k = 0; k < arrp.length; k++)
		{
			if(arrp[k].className == 'smallholder')
			{
				arrp[k].innerHTML += '<br />';
				arrp[k].innerHTML += '<a target="_blank" href="http://www.erepublik.com/en/main/messages-compose/' + id + '">[Send Message]</a>';
				arrp[k].innerHTML += '&nbsp;&nbsp;';
				arrp[k].innerHTML += '<a target="_blank" href="http://economy.erepublik.com/en/citizen/donate/' + id + '">[Donate Item]</a>';
				arrp[k].innerHTML += '&nbsp;&nbsp;';
				arrp[k].innerHTML += '<a target="_blank" href="http://economy.erepublik.com/en/citizen/donate/money/' + id + '">[Donate Money]</a>';
			}
		}

	}
}