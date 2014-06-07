// ==UserScript==
// @name           ATBanReasons
// @namespace      b.gameforge.ikariam.go
// @description    Adds links to easily populate the ban reason field.
// @include        http://*.ikariam.org/admintool/admin/user_ban.php*
// @version        0.1
// ==/UserScript==

var banLinks = new Array(
	{ title: 'Fleet Contact', text: 'Fleet Contact' },
	{ title: 'Pushing', text: 'Pushing' },
	{ title: 'Pushed', text: 'Pushed' },
	{ title: 'Bashing', text: 'Bashing', br: true },
	{ title: 'Light Insult', text: 'Light Insult' },
	{ title: 'Heavy Insult', text: 'Heavy Insult' },
	{ title: 'Non-English Message', text: 'Non-English', br: true },
	{ title: 'Account Sitting Violation', text: 'Account Sitting' },
	{ title: 'Account Sharing', text: 'Account Sharing', br: true },
	{ title: 'Bug Using', text: 'Bug Using' },
	{ title: 'Scripting', text: 'Scripting', br: true },
	{ title: 'Racism', text: 'Racism' },
	{ title: 'Real-Life Threats', text: 'RL Threats' },
	{ title: 'Staff Insults', text: 'Staff Insults', br: true },
	{ title: 'Contact Me', text: 'Contact Me' },
	{ title: 'Contact Me - Inappropriate Player Name', text: 'Player Name' },
	{ title: 'Contact Me - Inappropriate Town Name', text: 'Town Name' },
	{ title: 'Contact Me - Inappropriate Alliance Text', text: 'Alliance Text', br: true },
	{ title: 'Report Tool Abuse', text: 'Report Abuse' }
);

var addLinks = new Array(
	{ title: 'Multi 1/2', text: 'Multi 1/2', before: '2 Multis:' },
	{ title: 'Multi 2/2', text: 'Multi 2/2', br: true },
	{ title: 'Multi 1/3', text: 'Multi 1/3', before: '3 Multis:' },
	{ title: 'Multi 2/3', text: 'Multi 2/3' },
	{ title: 'Multi 3/3', text: 'Multi 3/3', br: true },
	{ title: 'Multi 1', text: '1', before: 'Multi:' },
	{ title: 'Multi 2', text: '2' },
	{ title: 'Multi 3', text: '3' },
	{ title: 'Multi 4', text: '4' },
	{ title: 'Multi 5', text: '5' },
	{ title: 'Multi 6', text: '6' },
	{ title: 'Multi 7', text: '7' },
	{ title: 'Multi 8', text: '8' },
	{ title: 'Multi 9', text: '9' },
	{ title: 'Multi 10', text: '10' },
	{ title: 'Multi 11', text: '11' },
	{ title: 'Multi 12', text: '12' },
	{ title: 'Multi 13', text: '13' },
	{ title: 'Multi 14', text: '14' },
	{ title: 'Multi 15', text: '15' },
	{ title: 'Multi 16', text: '16' },
	{ title: 'Multi 17', text: '17' },
	{ title: 'Multi 18', text: '18' },
	{ title: 'Multi 19', text: '19' },
	{ title: 'Multi 20', text: '20', br: true },
	{ title: '/4', text: '4', before: '<span style="padding-left: 14px; padding-right: 32px;">Of:</span>' },
	{ title: '/5', text: '5' },
	{ title: '/6', text: '6' },
	{ title: '/7', text: '7' },
	{ title: '/8', text: '8' },
	{ title: '/9', text: '9' },
	{ title: '/10', text: '10' },
	{ title: '/11', text: '11' },
	{ title: '/12', text: '12' },
	{ title: '/13', text: '13' },
	{ title: '/14', text: '14' },
	{ title: '/15', text: '15' },
	{ title: '/16', text: '16' },
	{ title: '/17', text: '17' },
	{ title: '/18', text: '18' },
	{ title: '/19', text: '19' },
	{ title: '/20', text: '20', br: true },
	{ title: 'Mass Multi', text: 'Mass Multi', br: true },
	{ title: ' (2nd Offence)', text: '2<sup>nd</sup>', before: 'Offence: ' },
	{ title: ' (3rd Offence)', text: '3<sup>rd</sup>' },
	{ title: ' (4th Offence)', text: '4<sup>th</sup>', br: true }
);

function processBanLinks()
{
	var result = '';
	var links = banLinks;
	
	for (var i = 0; links[i] != null; i++)
	{
		result += '<a href="#" onclick="setBanReason(\'' + links[i].title + '\'); fixBanInfo(); return false;">' + links[i].text + '<a><br />\n';
		if (links[i].br)
			result += '<br />\n';
	}
		
	return result;
}

function processAddLinks()
{
	var result = '';
	var links = addLinks;
	
	for (var i = 0; links[i] != null; i++)
	{
		if (links[i].before != null)
			result += links[i].before + ' ';
		
		result += '<a href="#" onclick="appendBanReason(\'' + links[i].title + '\'); fixBanInfo(); return false;">' + links[i].text + '</a> ';
		
		if (links[i].br)
			result += '<br />\n';
	}
	
	return result;
}

function fixBanInfo()
{
	var duration = document.getElementsByTagName('table')[0].rows[1].getElementsByTagName('input')[0];
	var reason = document.getElementsByTagName('table')[0].rows[2].getElementsByTagName('input')[0];
	var vacation = document.getElementsByTagName('table')[0].rows[3].getElementsByTagName('input')[0];
	
	newDuration = 365;
	newVacation = true;
	
	switch (reason.value)
	{
	case 'Light Insult':
	case 'Non-English Message':
	case 'Report Tool Abuse':
	case 'Spam':
		newDuration = 2;
		break;
	case 'Pushing':
	case 'Pushed':
	case 'Bashing':
		newDuration = 3;
		break;
	case 'Light Insult (2nd Offence)':
	case 'Non-English Message (2nd Offence)':
	case 'Report Tool Abuse (2nd Offence)':
	case 'Spam (2nd Offence)':
		newDuration = 4;
		break;
	case 'Pushing (2nd Offence)':
	case 'Pushed (2nd Offence)':
	case 'Bashing (2nd Offence)':
	case 'Account Sitting Violation':
	case 'Light Insult (3rd Offence)':
	case 'Non-English Message (3rd Offence)':
	case 'Report Tool Abuse (3rd Offence)':
	case 'Spam (3rd Offence)':
		newDuration = 7;
		break;
	case 'Heavy Insult':
		newDuration = 1;
		newVacation = false;
		break;
	case 'Heavy Insult (2nd Offence)':
		newDuration = 3;
		newVacation = false;
		break;
	case 'Heavy Insult (3rd Offence)':
		newDuration = 7;
		newVacation = false;
		break;
	}
	
	duration.value = newDuration;
	vacation.checked = newVacation;
}

function setBanReason(reason)
{
	var reasonInput = document.getElementsByTagName('table')[0].rows[2].getElementsByTagName('input')[0];
	reasonInput.value = reason;
}

function appendBanReason(text)
{
	var reasonInput = document.getElementsByTagName('table')[0].rows[2].getElementsByTagName('input')[0];
	reasonInput.value += text;
}

function clearBanReason()
{
	var reasonInput = document.getElementsByTagName('table')[0].rows[2].getElementsByTagName('input')[0];
	reasonInput.value = '';
}

// Stolen from Greasemonkey
// http://wiki.greasespot.net/Code_snippets#Embed_a_function_in_the_current_page
function embedFunction(f)
{
	var script = document.createElement('script');
	script.innerHTML = f.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
	document.body.appendChild(script);
}

embedFunction(setBanReason);
embedFunction(appendBanReason);
embedFunction(clearBanReason);
embedFunction(fixBanInfo);

// Float ban table left.
var banTable = document.getElementsByTagName('table')[0];
banTable.style.cssFloat = 'left';

// Create reason link div.
var reasonDiv = document.createElement('div');
reasonDiv.style.cssFloat = 'right';
reasonDiv.style.width = '200px';
reasonDiv.style.fontSize = '10px';
reasonDiv.innerHTML = processBanLinks();

banTable.parentNode.insertBefore(reasonDiv, banTable);

// Create add link div.
var addDiv = document.createElement('div');
addDiv.style.float = 'left';
addDiv.style.width = '400px';
addDiv.style.fontSize = '11px';
addDiv.style.lineHeight = '1.5em';
addDiv.innerHTML = processAddLinks();
addDiv.innerHTML += '<br /><a href="#" onclick="clearBanReason(); fixBanInfo(); return false;">Clear Ban Reason</a>';

banTable.parentNode.appendChild(addDiv);

// Create clear div.
var clearDiv = document.createElement('div');
clearDiv.style.clear = 'both';

banTable.parentNode.appendChild(clearDiv);