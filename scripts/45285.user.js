// ==UserScript==
// @name           Ikariam Attack Counter
// @namespace      http://aoeu.org/gm/
// @description    Counts the number of attack reports for each town name in last 24 hours
// @include        http://*.ikariam.*/index.php?view=militaryAdvisorCombatReports*
// @version        1.1
// ==/UserScript==

var battlere = /^Battle for /;
var seabatre = /^Sea battle near /;





function parsedate(date){
	date = date.replace(/\n/g, '');
	date = date.replace(/  +/g, '');
	s=date.split(' ');
	d=s[0].split('.');
	t=s[1].split(':');
	return new Date("2009",d[1]-1,d[0],t[0],t[1]);

}

var towns = [];
var counts = [];

function townadd(name){
	for(var n=0;n<towns.length;n++)
	{
		if(towns[n] == name){
			counts[n]++;
			return;
		}
	}
	towns.push(name);
	counts.push(1);
}

var reports = document.getElementById('finishedReports').getElementsByTagName('tr');
var servertime = parsedate(document.getElementById('servertime').innerHTML);
var rows = 0;
var end = 0;
for(var i=0;i<reports.length && end == 0;i++)
{
	var cells = reports[i].getElementsByTagName('td');
	for(var j=2;j<cells.length;j++)
	{
		if(cells[j].getAttribute('class') == "date")
		{
			var rtime = parsedate(cells[j].innerHTML);
			if((servertime.getTime() - rtime.getTime()) < (1000*60*60*24)){
				cells[j].innerHTML = "<b>" + cells[j].innerHTML + "</b>";
				if(cells[j+1].getAttribute('class') == "subject won"
				   || cells[j+1].getAttribute('class') == "subject won new"){
					t = cells[j+1].getElementsByTagName('a')[0].getAttribute('title');
					t = t.replace(battlere, '');
					t = t.replace(seabatre, '');
					townadd(t);
				}
				rows++;
			} else {
				end = 1;
				break;
			}

		}
	}

}
for(var i=0;i<rows;i++)
{
	var cell = reports[i].getElementsByTagName('td')[3]; //hardcoded offset, bad
	if(cell == null)
		continue;
	if(!cell.getAttribute('class').match('won'))
		continue;

	t = cell.getElementsByTagName('a')[0].getAttribute('title');
	t = t.replace(battlere, '');
	t = t.replace(seabatre, '');

	for(var n=0;n<towns.length;n++)
		if(towns[n] == t){
			cell.innerHTML += "&nbsp;&nbsp;[ " + counts[n] + " ]";
		}
}

