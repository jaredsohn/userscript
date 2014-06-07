// ==UserScript==
// @name        NukeZone Power Calc
// @namespace   NZ
// @description Calculates lowest possible power usage
// @include     http://www.nukezone.nu/clan.asp?Action=SpyReports&X=*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==

var RL = 4000;
var MS = 10000;
var CC = 1800;
var SY = 700;
var AF = 600;
var WF = 900;
var BR = 550;
var TL = 350;
var SS = 400;
var MT = 550;
var MGT = 425;
var AMS = 1700;
var PP = 3000;
var APP = 15000;

var power = 0;
var used = 0;

var tables = $('table .content');
var tableNr = 6;

if (tables.length == 2) {
	tableNr = 1;
}

	$('table .content:eq('+tableNr+') tr').not(':first').not(':last').each(function() {
		var building = $(this).find('td:eq(0) b').text().split(':')[0];
		var amount =  $(this).find('td:eq(1)').text().split('(')[1].split('-')[0];
		amount = amount.replace(/\,/g,'');
		
		switch (building) {
			case 'Research Labs': 
				used += (parseInt(amount, 10) * parseInt(RL, 10));
				break;
			case 'Missile Silos': 
				used += (parseInt(amount, 10) * parseInt(MS, 10));
				break;
			case 'Command Centres': 
				used += (parseInt(amount, 10) * parseInt(CC, 10));
				break;
			case 'Shipyards': 
				used += (parseInt(amount, 10) * parseInt(SY, 10));
				break;
			case 'Airfields': 
				used += (parseInt(amount, 10) * parseInt(AF, 10));
				break;
			case 'War Factories': 
				used += (parseInt(amount, 10) * parseInt(WF, 10));
				break;
			case 'Barracks': 
				used += (parseInt(amount, 10) * parseInt(BR, 10));
				break;
			case 'Torpedo Launchers': 
				used += (parseInt(amount, 10) * parseInt(TL, 10));
				break;
			case 'SAM Sites': 
				used += (parseInt(amount, 10) * parseInt(SS, 10));
				break;
			case 'Missile Turrets': 
				used += (parseInt(amount, 10) * parseInt(MT, 10));
				break;
			case 'Machinegun Turrets': 
				used += (parseInt(amount, 10) * parseInt(MGT, 10));
				break;
			case 'Anti-Missile Systems': 
				used += (parseInt(amount, 10) * parseInt(AMS, 10));
				break;	
		}

		amount =  $(this).find('td:eq(1)').text().split('(')[1].split('-')[1].split(')')[0];
		amount = amount.replace(/\,/g,'');
		switch (building) {
			case 'Power Plants': 
				power += (parseInt(amount, 10) * parseInt(PP, 10));
				break;
			case 'Advanced Power Plants': 
				power += (parseInt(amount, 10) * parseInt(APP, 10));
				break;
		}

	});

var usage = Math.round(parseInt(used, 10) * 10000 / parseInt(power, 10)) / 100;
var PpeUsage = Math.round(parseInt(used, 10) * 10000 / (parseInt(power, 10) * 1.5)) / 100;

if (!isFinite(usage) || !isFinite(PpeUsage))
{
    usage = PpeUsage = "No PP found";
} else {
	usage = usage + '%';
	PpeUsage = PpeUsage + '%';
}


$('table .content:eq('+tableNr+')').after('<br><table class="content" border="0" width="85%"><TR class="header"><TD width="100%" align="center" colspan=2>Power</TD></TR><TR><TD width="50%"><B>Power Usage:</TD><TD>' + usage + '</TD></TR><TR><TD width="50%"><B>PPE Power Usage:</TD><TD>' + PpeUsage + '</TD></TR><TR class="header"><TD height="4" colspan="2"></TD></TR></table>');