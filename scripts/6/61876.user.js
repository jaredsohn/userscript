// ==UserScript==
// @name                Nukezone Enhanced Statistics Central
// @namespace           Nukezone
// @description         With the help of bookmarks, this enhances the statistics central. Because someone has to do it.
// @include             http://www.nukezone.nu/clanstatistics.asp*
// @include				http://www.nukezone.nu/clan.asp?Action=Sharing*
// @include             http://www.nukezone.se/clanstatistics.asp*
// @include				http://www.nukezone.se/clan.asp?Action=Sharing*
// @include			 	http://www.nukezone.nu/clan.asp?Action=Clans
// @include			 	http://www.nukezone.se/clan.asp?Action=Clans
// ==/UserScript==

// Changing the way the SC is opened. Instead of a new window, it's opened in the same window.
// This makes it much bigger, and we need all the room we can get!
if (document.location.href.search("Action=Clans") != -1) {
	var as = document.getElementsByTagName('a');

	for ( var i = 0; i < as.length; i++) {
		var a = as[i];
		if (a.innerHTML.search('Statistics Central') != -1) {
			a.setAttribute('href', 'clanstatistics.asp');
		}
	}
}

/*
 * Displaying Stats
 */
if (document.location.href.search('clanstatistics.asp') != -1) {
	if (document.location.href.search('X=') == -1) {
		//Overview Page
		
		var tables = document.getElementsByTagName('table');
		for (var i=0; i < tables.length; i++) {
			if (tables[i].getAttribute('class') == 'content') {
				var suffered = document.createElement('td');
				var mlost = document.createElement('td');
				var bonus = document.createElement('td');
				var bank = document.createElement('td');
				
				suffered.setAttribute('Align', 'right');
				mlost.setAttribute('Align', 'right');
				bonus.setAttribute('Align', 'right');
				bank.setAttribute('Align', 'right');
				suffered.setAttribute('Width', '5%');
				mlost.setAttribute('Width', '5%');
				bank.setAttribute('Width', '12%');
				suffered.innerHTML = 'Atks Sfrd';
				mlost.innerHTML = 'Wasted';
				bonus.innerHTML = 'Bonus';
				bank.innerHTML = 'Bank';
				
				var namecol;
				var logincol;
				var attackcol;
				var lpdcol;
				var apdcol; // attacks made
				var sufferedcol;
				var ppacol;
				var ptscol;
				var mlostcol;
				var spiedcol;
				var bankcol;
				var nwcol;
				var bonuscol;
				
				var table = tables[i];
				var trs = table.getElementsByTagName('tr');
				
				var header = trs[0];
				var entries = header.getElementsByTagName('td');
				header.insertBefore(mlost, entries[6]);
				header.insertBefore(suffered, entries[6]);

				header.insertBefore(bank, entries[10]);
				header.appendChild(bonus);
				
				entries = header.getElementsByTagName('td');
				entries[5].innerHTML = 'Atks Made';
				
				header = trs[0];
				for ( var a = 0; a < header.getElementsByTagName('td').length; a++) {
					if (header.getElementsByTagName('td')[a].innerHTML == 'Province Name')
						namecol = a;
					else if (header.getElementsByTagName('td')[a].innerHTML == 'Last Login')
						logincol = a;
					else if (header.getElementsByTagName('td')[a].innerHTML == 'Last Attack')
						attackcol = a;
					else if (header.getElementsByTagName('td')[a].innerHTML == 'LPD')
						lpdcol = a;
					else if (header.getElementsByTagName('td')[a].innerHTML == 'Atks Made')
						apdcol = a;
					else if (header.getElementsByTagName('td')[a].innerHTML == 'Atks Sfrd')
						sufferedcol = a;
					else if (header.getElementsByTagName('td')[a].innerHTML == 'PPA')
						ppacol = a;
					else if (header.getElementsByTagName('td')[a].innerHTML == 'Points')
						ptscol = a;
					else if (header.getElementsByTagName('td')[a].innerHTML == 'Wasted')
						mlostcol = a;
					else if (header.getElementsByTagName('td')[a].innerHTML == 'Spied')
						spiedcol = a;
					else if (header.getElementsByTagName('td')[a].innerHTML == 'Bank')
						bankcol = a;
					else if (header.getElementsByTagName('td')[a].innerHTML == 'Networth')
						networthcol = a;
					else if (header.getElementsByTagName('td')[a].innerHTML == 'Bonus')
						bonuscol = a;
				}
				
				entries[1].setAttribute('Width', '15%');

				
				for ( var b = 1; b < trs.length - 1; b++) {
					var tds = trs[b].getElementsByTagName('td');
					var name = tds[namecol].innerHTML;
					var id = name.substring(name.indexOf('#') + 1, name
							.indexOf(')'));

					var suftd = document.createElement('td');
					var mlosttd = document.createElement('td');
					var bonustd = document.createElement('td');
					var banktd = document.createElement('td');
					suftd.setAttribute('align', 'right');
					mlosttd.setAttribute('align', 'right');
					bonustd.setAttribute('align', 'right');
					banktd.setAttribute('align', 'right');

					trs[b].insertBefore(suftd, tds[sufferedcol]);
					trs[b].insertBefore(mlosttd, tds[mlostcol]);
					trs[b].insertBefore(bonustd, tds[bonuscol]);
					trs[b].insertBefore(banktd, tds[bankcol]);
					
					tds = trs[b].getElementsByTagName('td');
					var testvar = retrieve(id, 'morale') + "";
					if (testvar.search('%') != -1) {

						tds[apdcol].innerHTML = retrieve(id, "attacks") + " (" + retrieve(id, "attackwars") + ")";
						tds[sufferedcol].innerHTML = retrieve(id, "randoms") + " (" + retrieve(id, "randomwars") + ")";
						tds[mlostcol].innerHTML = retrieve(id, "moralelost");
						tds[bonuscol].innerHTML = retrieve(id, "startbonus");
						tds[bankcol].innerHTML = retrieve(id, "bank") + " (" + retrieve(id, "bankunlocked") + ")";
					}
				}
				
	
				trs[trs.length - 1].getElementsByTagName('td')[0].setAttribute(
						'colspan', '14');
				
			
			}
			
		}
		// adjust widths
		// data loop
		
		
	} else if (document.location.href.search('X=Military') != -1) {
		//insert blatant copy paste hacking here for the military page
		var tables = document.getElementsByTagName('table');
		for ( var i = 0; i < tables.length; i++) {
			if (tables[i].getAttribute('class') == 'content') {
				var mp = document.createElement('td');
				var sp = document.createElement('td');
				var clanbonus = document.createElement('td');
				mp.setAttribute('Width', '3%');
				sp.setAttribute('Width', '3%');
				mp.setAttribute('Align', 'right');
				sp.setAttribute('Align', 'right');
				mp.innerHTML = 'MP';
				sp.innerHTML = 'SP';
				clanbonus.setAttribute('Width', '10%');
				clanbonus.innerHTML = 'Bonus';

				var namecol;
				var moralecol;
				var landcol;
				var unitscol;
				var unittypecol;
				var mpcol;
				var spcol;
				var clanbonuscol;

				var table = tables[i];
				var trs = table.getElementsByTagName('tr');

				var header = trs[0];
				var entries = header.getElementsByTagName('td');
				for ( var z = 0; z < entries.length; z++) {
					if (entries[z].innerHTML == 'Morale') {
						header.insertBefore(mp, entries[z + 1]);
						header.insertBefore(sp, entries[z + 1]);
						header.appendChild(clanbonus);
					}
				}
				entries = header.getElementsByTagName('td');
				for (var t=0; t < entries.length; t++)
				{
					if (entries[t].innerHTML == 'Buildings')
						entries[t].setAttribute('width', '5%');
					else if (entries[t].innerHTML == 'Units')
						entries[t].setAttribute('width', '5%');
					else if (entries[t].innerHTML == 'Unit Types')
						entries[t].setAttribute('width', '5%');
				}
				header = trs[0];
				for ( var a = 0; a < header.getElementsByTagName('td').length; a++) {
					if (header.getElementsByTagName('td')[a].innerHTML == 'Province Name')
						namecol = a;
					else if (header.getElementsByTagName('td')[a].innerHTML == 'Morale')
						moralecol = a;
					else if (header.getElementsByTagName('td')[a].innerHTML == 'Units')
						unitscol = a;
					else if (header.getElementsByTagName('td')[a].innerHTML == 'Unit Types')
						unittypecol = a;
					else if (header.getElementsByTagName('td')[a].innerHTML == 'MP')
						mpcol = a;
					else if (header.getElementsByTagName('td')[a].innerHTML == 'SP')
						spcol = a;
					else if (header.getElementsByTagName('td')[a].innerHTML == 'Land')
						landcol = a;
					else if (header.getElementsByTagName('td')[a].innerHTML == 'Bonus')
						clanbonuscol = a;
				}

				for ( var b = 1; b < trs.length - 1; b++) {
					var tds = trs[b].getElementsByTagName('td');
					var name = tds[namecol].innerHTML;
					var id = name.substring(name.indexOf('#') + 1, name
							.indexOf(')'));

					var mptd = document.createElement('td');
					var sptd = document.createElement('td');
					var clanbonustd = document.createElement('td');
					mptd.setAttribute('align', 'right');
					sptd.setAttribute('align', 'right');

					trs[b].insertBefore(sptd, tds[spcol]);
					trs[b].insertBefore(mptd, tds[mpcol]);
					trs[b].insertBefore(clanbonustd, tds[clanbonuscol]);

					tds = trs[b].getElementsByTagName('td');
					var testvar = retrieve(id, 'morale') + "";
					if (testvar.search('%') != -1) {

						tds[moralecol].innerHTML = retrieve(id, "morale");
						tds[landcol].innerHTML = retrieve(id, "land");
						tds[mpcol].innerHTML = retrieve(id, "mp");
						tds[spcol].innerHTML = retrieve(id, "sp");
						tds[clanbonuscol].innerHTML = retrieve(id, "clanbonus");
					}
				}
				trs[trs.length - 1].getElementsByTagName('td')[0].setAttribute(
						'colspan', '13');
			}
		}
	}
}

/*
 * Getting Stats
 */
if (document.location.href.search('Action=Sharing') != -1
		&& document.location.href.search('Q=1') != -1) {
	var land;
	var morale;
	var mp;
	var sp;
	var bank;
	var bankunlocked;
	var startbonus;
	var clanbonus;
	var attacks;
	var attackwars;
	var randoms;
	var randomwars;
	var moralelost;

	/*
	 * Gathering
	 */
	var tables = document.getElementsByTagName('table');
	for ( var i = 0; i < tables.length; i++) {
		var table = tables[i];
		if (table.getAttribute('class') == 'content') {
			var trs = table.getElementsByTagName('tr');
			for ( var j = 0; j < trs.length; j++) {
				//Each tr has 2 tds. The first with the name in bold, the second with the value
				var tr = trs[j];
				var tds = tr.getElementsByTagName('td');
				if (tds[0].innerHTML.search('Land:') != -1)
					land = tds[1].innerHTML;
				else if (tds[0].innerHTML.search('Morale:') != -1)
					morale = tds[1].innerHTML;
				else if (tds[0].innerHTML.search('Missile Power:') != -1)
					mp = tds[1].innerHTML;
				else if (tds[0].innerHTML.search('Satellite Power') != -1
						&& tds[0].innerHTML.search('pri') != -1)
					sp = tds[1].innerHTML;
				else if (tds[0].innerHTML.search('Total Money in Bank:') != -1)
					bank = tds[1].innerHTML;
				else if (tds[0].innerHTML
						.search('Total Unlocked Money in Bank:') != -1)
					bankunlocked = tds[1].innerHTML;
				else if (tds[0].innerHTML.search('Starting Bonus:') != -1)
					startbonus = tds[1].innerHTML;
				else if (tds[0].innerHTML.search('Clan Bonus:') != -1)
					clanbonus = tds[1].innerHTML;
				else if (tds[0].innerHTML.search('Attacks Made') != -1
						&& tds[0].innerHTML.search('during clan wars') != -1)
					attackwars = tds[1].innerHTML;
				else if (tds[0].innerHTML.search('Attacks Made:') != -1)
					attacks = tds[1].innerHTML;
				else if (tds[0].innerHTML.search('Attacks Suffered') != -1
						&& tds[0].innerHTML.search('during clan wars') != -1)
					randomwars = tds[1].innerHTML;
				else if (tds[0].innerHTML.search('Attacks Suffered:') != -1)
					randoms = tds[1].innerHTML;
				else if (tds[0].innerHTML.search('Morale Lost:') != -1)
					moralelost = tds[1].innerHTML;
			}
		}
	}

	/*
	 * Formatting
	 */

	// Land needs "unused" removed
	// Morale needs "pool" removed
	// Clan bonus needs only the time
	land = land.replace(' unused', '');
	morale = morale.replace(' pool', '');
	clanbonus = clanbonus.substring(clanbonus.indexOf('('));

	/*
	 * Get ID
	 */
	var id;
	var selects = document.getElementsByTagName('select');
	for ( var i = 0; i < selects.length; i++) {
		var select = selects[i];
		if (select.getAttribute('name') == "X") {
			var options = select.getElementsByTagName('option');
			for ( var j = 0; j < options.length; j++) {
				var option = options[j];
				if (option.getAttribute('selected') == "")
					id = option.getAttribute('value');
			}
		}
	}

	/*
	 * Get Timestamp
	 */
	var timestamp;
	var tds = document.getElementsByTagName('td');
	var td = tds[tds.length - 2];
	timestamp = td.innerHTML.substring(td.innerHTML.lastIndexOf('/') + 9);
	timestamp = timestamp.replace('.', '');

	/*
	 * Storage
	 */
	store(id, "land", land);
	store(id, "morale", morale);
	store(id, "mp", mp);
	store(id, "sp", sp);
	store(id, "bank", bank);
	store(id, "bankunlocked", bankunlocked);
	store(id, "startbonus", startbonus);
	store(id, "clanbonus", clanbonus);
	store(id, "attacks", attacks);
	store(id, "attackwars", attackwars);
	store(id, "randoms", randoms);
	store(id, "randomwars", randomwars);
	store(id, "moralelost", moralelost);
	store(id, "timestamp", timestamp);

}

/*
 * Functions for easy editing if they fuck up
 */
function store(id, storagename, value) {
	GM_setValue(id + storagename + "", value + "");
}

function retrieve(id, storagename) {
	return GM_getValue(id + storagename);
}
