// ==UserScript==
// @name           Guest Mode Timezone Converter
// @namespace      www.courtrivals.com/
// @description    Converts Gust Mode Times to your timezone. 
// @include        http://www.courtrivals.com/guestgym.php
// ==/UserScript==

var currenttime = new Date();
var currenthour = currenttime.getHours();
var currentminute = currenttime.getMinutes();
var currentsecond = currenttime.getSeconds();

var settingtime = document.evaluate(
	'//p[@class="loginBottomText"]',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null).snapshotItem(0).innerHTML;

settingtime = settingtime.slice(settingtime.indexOf(' at')+3);
settingtime = settingtime.slice(settingtime.indexOf(':')-2,settingtime.lastIndexOf(':')+3);
var settinghour = settingtime.slice(0,2) * 1;
var settingminute = settingtime.slice(3,5) * 1;
var settingsecond = settingtime.slice(6,8) * 1;

seconddifference = currenthour*60*60 + currentminute*60 + currentsecond - settinghour*60*60 - settingminute*60 - settingsecond;
hourdifference = Math.floor(seconddifference/60/60);

var cells = document.evaluate(
	'//td',
	document,
	null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
	null);

var completiontime = new Array();

for(var i = 0; i < cells.snapshotLength; i++)
{
	if(cells.snapshotItem(i).innerHTML == 'Completion')
	{
		completiontime[0] = cells.snapshotItem(i + 3);
		completiontime[1] = cells.snapshotItem(i + 6);
		completiontime[2] = cells.snapshotItem(i + 9);
		completiontime[3] = cells.snapshotItem(i + 12);
		completiontime[4] = cells.snapshotItem(i + 15);
		break;
	}
}

var hour;

for(var i = 0; i < 5; i++)
{
	if(completiontime[i].innerHTML.indexOf(':') != -1)
	{
		hour = completiontime[i].innerHTML.slice(0,2) * 1 + hourdifference;

		if(hour >= 24)
		{
			hour -= 24;
		}
		else if(hour < 0)
		{
			hour += 24;
		}

		if(hour < 10)
		{
			hour = '0' + hour;
		}

		completiontime[i].innerHTML = hour + completiontime[i].innerHTML.slice(2)
	}
}

