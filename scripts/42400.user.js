// ==UserScript==
// @name           Premiumuebersicht v1.0 by Weeds (Bande:So High)
// @namespace      weeds.pennergame.de
// @description    Pennertools by Weeds
// @include        http://*pennergame.de/overview/*
// ==/UserScript==

var table = document.getElementsByTagName('table')[1];
var tr = table.getElementsByTagName('tr');
var id1 = document.getElementsByTagName('body')[0].innerHTML.split("/profil/id:");
var id = id1[1].split('/" alt');
info(id[0]);


function info(id) {
	GM_xmlhttpRequest({
    	method: 'GET',
   	url: 'http://www.pennergame.de/dev/api/user.' + id + '.xml',

        onload: function(responseDetails) {
        	var parser = new DOMParser();
        	var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
        	var gangid = dom.getElementsByTagName('id')[1].textContent;
		var td = table.getElementsByTagName('td');

		for(var x=0;x<=5;x++)
		{
			if(x<=2)
			{
			var newtr = document.createElement('tr');
			var newtd = newtr.appendChild(document.createElement('td'));
			var newtd2 = newtr.appendChild(document.createElement('td'));
			newtd.bgColor = '#2f2f2f';
			newtd2.bgColor = '#2f2f2f';
			table.getElementsByTagName('tbody')[0].insertBefore(newtr, tr[x+8]);
			}
			else if (x<=3)
			{
			var newtr = document.createElement('tr');
			var newtd = newtr.appendChild(document.createElement('td'));
			var newtd2 = newtr.appendChild(document.createElement('td'));
			var newtd3 = newtr.appendChild(document.createElement('td'));
			newtd2.bgColor = '#2f2f2f';
			newtd3.bgColor = '#2f2f2f';
			table.getElementsByTagName('tbody')[0].insertBefore(newtr, tr[x+8]);
			}
			else if(x<=5)
			{
				newtd = document.createElement('td');
				tr[x+8].insertBefore(newtd, tr[x+8].getElementsByTagName('td')[0]);
			}
		}

		try 
		{
			auslesen(gangid);
		} 
		catch(err)
		{
			td[16].innerHTML = 'Bande:';
			td[17].innerHTML = '-';
			td[18].innerHTML = 'Mitglieder:';
			td[19].innerHTML = '-';
			td[20].innerHTML = 'Position:';
			td[21].innerHTML = '-';
			td[23].innerHTML = 'Punkte:';
			td[24].innerHTML = '-';
		}
		}
	});
}

function auslesen(id) {
	GM_xmlhttpRequest({
    	method: 'GET',
   	url: 'http://www.pennergame.de/dev/api/gang.' + id + '.xml',

        onload: function(responseDetails) {
        	var parser = new DOMParser();
        	var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
        	var name = dom.getElementsByTagName('name')[0].textContent;
		var punkte = dom.getElementsByTagName('points')[0].textContent; 
		var position = dom.getElementsByTagName('position')[0].textContent;
		var member = dom.getElementsByTagName('member_count')[0].textContent
		var td = table.getElementsByTagName('td');

		td[16].innerHTML = 'Bande:';
		td[17].innerHTML = name;
		td[18].innerHTML = 'Mitglieder:';
		td[19].innerHTML = member;
		td[20].innerHTML = 'Position:';
		td[21].innerHTML = '<strong>' + position + '.</strong';
		td[23].innerHTML = 'Punkte:';
		td[24].innerHTML = punkte;
		}
	});
}
