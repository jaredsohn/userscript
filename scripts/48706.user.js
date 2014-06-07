// ==UserScript==
// @name                Nukezone DB Storage
// @namespace           NukezoneDB
// @description         Use a remote database to store your stuff. Early test version only.
// @include             http://www.nukezone.nu/*
// @exclude				http://www.nukezone.nu/forum/*
// @exclude				http://www.nukezone.nu/clanstatistics.asp*
// ==/UserScript==

var serverURL = GM_getValue('serverURL', getGMValue('serverURL')); // the server location
var databasename = GM_getValue('databaseName', getGMValue('databaseName'));// database name
var serverlogin = GM_getValue('login', getGMValue('login')); // server db login
var serverpass = GM_getValue('password', getGMValue('password'));// server db pass
var setPage = 'store.php'; // storage for your province
var setMassPage = 'storemass.php'; // storage for other provinces related stuff

var tds = document.getElementsByTagName('td');

var provinceID = getID();

var money = document.getElementById('show01').innerHTML.replace('&nbsp;', '').replace('$', '');
var turns = document.getElementById('show02').innerHTML;
var land = document.getElementById('show03').innerHTML.replace('&nbsp;', '');
land = land.substr(0, land.length - 3);
var morale = document.getElementById('show04').innerHTML;
var moralepool = morale.substring(morale.indexOf('(') + 1, morale.lastIndexOf('%'));
morale = morale.substring(0, morale.indexOf('%'));
var networth = document.getElementById('show05').innerHTML.replace('&nbsp;', '').replace('$', '');

sendStuff("money", money);
sendStuff("turns", turns);
sendStuff("land", land);
sendStuff("morale", morale);
sendStuff("moralepool", moralepool);
sendStuff("networth", networth);

if (document.location.href.search('http://www.nukezone.nu/attack.asp') != -1)
{
	var enemylist1;
	var enemylist2;
	var enemylist3;
	
	var options = document.getElementsByTagName('select')[0].getElementsByTagName('option');
	var temp = 0;
	for ( var i=0; i < options.length; i++) {
		var option = options[i];
		if (option.getAttribute('value') == '')
			temp = 0;
		if (temp == 3)
		{
			temp++;
			sendStuff('enemylist3', option.getAttribute('value'));
		}
		if (temp == 2)
		{
			temp++;
			sendStuff('enemylist2', option.getAttribute('value'));
		}
		if (temp == 1)
		{
			temp++;
			sendStuff('enemylist1', option.getAttribute('value'));
		}
		if (option.innerHTML.search('Recently Attacked:') != -1)
			temp = 1;
	}
	
}

if (document.location.href.search('http://www.nukezone.nu/research.asp') != -1)
{
	var researchbm;
	var researchee;
	var researchmd;
	var researchmst;
	var researchmp;
	var researchst;
	var researchte;

	var currentresearch;
	var timeremaining;
	

	
}
if (document.location.href.search('http://www.nukezone.nu/market.asp') != -1 || document.location.href.search('http://www.nukezone.nu/build.asp') != -1)
{
	var tables = document.getElementsByTagName('table');
	for (var i=0; i < tables.length; i++) {
		if (tables[i].getAttribute('class') == 'content')
		{
			var namecol;
			var owncol;
			var missilecol;
			
			var table = tables[i];
			var trs = table.getElementsByTagName('tr');
			
			var header = trs[0];
			
			for (var a=0; a < header.getElementsByTagName('td').length; a++)
			{
				if (header.getElementsByTagName('td')[a].innerHTML == 'Name')
					namecol = a;
				if (header.getElementsByTagName('td')[a].innerHTML == 'You Own')
					owncol = a;
				if (header.getElementsByTagName('td')[a].innerHTML == 'Ordered')
					missilecol = a;
			}
			var tag = 'sea_';
			for (var b=1; b < trs.length; b++)
			{
				var unittds = trs[b].getElementsByTagName('td');
				if (unittds.length > 1)
				{
					var unitname = unittds[namecol].innerHTML;
					var ownraw = unittds[owncol].innerHTML;
					
					unitname = unitname.substr(unitname.indexOf(';') + 1);
					var owned = ownraw.substr(0, ownraw.indexOf('(') - 1);
					var ordered;
					if (document.location.href.search('Action=Missiles') == -1)
						 ordered = ownraw.substring(ownraw.indexOf('(') + 1, ownraw.indexOf(')'));
					else
					{
						ordered = unittds[missilecol].innerHTML;
					}
					
					
					if (document.location.href.search('Action=Buildings') == -1 && document.location.href.search('Action=Missiles') == -1)
					{
						if (document.location.href.search('Action=SeaUnits') != -1)
							tag = 'sea_';
						if (document.location.href.search('Action=AirUnits') != -1)
							tag = 'air_';
						if (document.location.href.search('Action=Vehicles') != -1)
							tag = 'veh_';
						if (document.location.href.search('Action=Infantries') != -1)
							tag = 'inf_';
						
						
						sendStuff(tag + unitname, owned);
						sendStuff(tag + unitname + '_order', ordered);
					}
					else if (document.location.href.search('Action=Buildings') != -1)
					{
						sendStuff('building_' + unitname, ownraw);
					}
					else if (document.location.href.search('Action=Missiles') != -1)
					{
						sendStuff('missile_' + unitname, ownraw);
						sendStuff('missile_' + unitname + '_ordered', ordered);
					}
				}
				else
				{
					if (tag == 'sea_')
						tag = 'air_';
					else if (tag == 'air_')
						tag = 'veh_';
					else if (tag == 'veh_')
						tag = 'inf_';
				}
			}
		}
	}
}

var bankinterest;
var bankmaxdeposit;

var satdaysinorbit;
var satcurrent;
var satcrashtimeleft;



if (document.location.href == 'http://www.nukezone.nu/game.asp?Action=Main')
{
	var missilepower;
	var satellitepower;
	var powerstatus;
	
	var bs = document.getElementsByTagName('b');
	for(var i=0; i < bs.length; i++)
	{
		if (bs[i].innerHTML == 'Missile Power:')
		{
			missilepower = bs[i].parentNode.parentNode.getElementsByTagName('td')[1].innerHTML.substring('0', bs[i].parentNode.parentNode.getElementsByTagName('td')[1].innerHTML.indexOf('%'));
			sendStuff("missilepower", missilepower);
		}
		if (bs[i].innerHTML == 'Satellite Power:')
		{
			satellitepower = bs[i].parentNode.parentNode.getElementsByTagName('td')[1].innerHTML;
			if (satellitepower != "N/A")
			{
			satellitepower = satellitepower.substring('0', satellitepower.lastIndexOf('%'));
			sendStuff("satellitepower", satellitepower);
			}
		}
	}
	
	for (var j=0; j < tds.length; j++)
	{
		if (tds[j].getAttribute('class') == 'large b')
			sendStuff('powerstatus', tds[j].innerHTML);
	}
}




function sendStuff(name, value) {
	if (serverURL.charAt(serverURL.length - 1) != '/')
		serverURL += '/';
	GM_xmlhttpRequest({
		method: 'POST',
		url: serverURL + setPage,
		headers: { 'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('db=' + databasename + '&login=' + serverlogin + '&pass=' + serverpass + '&provID=' + provinceID + '&var=' + name + '&val=' + value)
	});

}

function getID()
{
	var spans = document.getElementsByTagName('span');
	for (var k=0; k < spans.length; k++)
	{
		if (spans[k].getAttribute('class') == 'BigText')
		{
			return spans[k].innerHTML.substring(spans[k].innerHTML.indexOf('#') + 1, spans[k].innerHTML.lastIndexOf(')'));
		}
	}
}

function getGMValue(value)
{
	if (GM_getValue(value) == null)
	{
		var newlink = prompt('Please enter your ' + value, '');
		GM_setValue(value, newlink);
		return newlink;
	}
	return GM_getValue(value);
}