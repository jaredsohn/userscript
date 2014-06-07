// ==UserScript==
// @name           SSW RPS Assistant
// @namespace      http://homeworlds.secretsocietywars.com/nardo
// @description    Helps locate sectors to search for RPS items
// @include        http://www.secretsocietywars.com/index.php?p=space*
// @include        http://www.secretsocietywars.com/index.php?p=quests&a=quest
// ==/UserScript==

var inserted = false;

if(document.body.innerHTML.indexOf('Degree: 24') > -1) {
	if(document.location.href.indexOf('p=quests') > -1) {
		check_for_quest();
	} else if(GM_getValue('active', false)) {
		shade_spacenav();
	}
} else if(document.body.innerHTML.indexOf('Degree: ') > -1) {
	/* somehow we missed the collection of all rps items */
	GM_setValue('active', false);
} else if(GM_getValue('active', false)) {
	shade_sectors();
}

function shade_sectors() {
	if(document.location.href.indexOf('a=sector_map') > -1) {
		shade_sector_map();
	} else {
		shade_spacenav();
	}
}

function shade_spacenav() {
	var spacenav_links = document.evaluate('//table[contains(@style, "border-collapse: collapse;")]//a[contains(@href, "index.php?p=space&a=move&destination=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var sectors;
	var current_sector = get_current_sector();

	if(!inserted) {
		insert_nardocom();
		inserted = true;
	}

	if(document.body.innerHTML.indexOf('Giving 1 RPS') > -1) {
		var found = eval(GM_getValue('found', '[]'));
		var already_found = false;
		for(var i = 0; i < found.length; i++) {
			if(found[i] == current_sector) {
				already_found = true;
			}
		}
		if(!already_found) {
			found.push(current_sector);
		}
		GM_setValue('found', found.toSource());
		if(found.length == 3) {
			GM_setValue('active', false);
			alert("RPS Assistant: You've found your third RPS item!");
		}
	}

	remove_sector(current_sector);
	sectors = get_sectors();
	
	for(var i = 0; i < spacenav_links.snapshotLength; i++) {
		var sectorobj = spacenav_links.snapshotItem(i);
		var sectornum;
		var re;
		
		if(re = /destination=(\d+)/.exec(sectorobj.href)) {
			sectornum = parseInt(re[1]);
			if(sectors[sectornum]) {
				var td = find_parent(sectorobj, "TD");
				td.style.background = "red";
			}
		}
	}
}

function remove_sector(sector) {
	var searched = eval(GM_getValue("searched", "[]"));

	searched[sector] = true;
	GM_setValue("searched", searched.toSource());
}

function shade_sector_map() {
	var maplinks = document.evaluate('//a[contains(@href, "p=space&a=blastoff") or contains(@href, "p=space&a=move")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var sectors = get_sectors();
	for(var i = 0; i < maplinks.snapshotLength; i++) {
		var s = parseInt(maplinks.snapshotItem(i).innerHTML);
		if(sectors[s]) {
			maplinks.snapshotItem(i).style.background = "red";
		}
	}
}

function get_sectors() {
	var sectors = new Array();
	var triplets = eval(GM_getValue('triplets', '[]'));
	var searched = eval(GM_getValue('searched', '[]'));
	var found = eval(GM_getValue('found', '[]'));
	var found_at = new Array();
	
	for(var i = 0; i < found.length; i++) {
		found_at[found[i]] = true;
	}

	for(var i = 0; i < triplets.length; i++) {
		t = triplets[i];
		if((!searched[t[0]] || found_at[t[0]]) && (!searched[t[1]] || found_at[t[1]]) && (!searched[t[2]] || found_at[t[2]])) {
			var matched = true;
			for(var j = 0; j < found.length; j++) {
				if((t[0] != found[j]) && (t[1] != found[j]) && (t[2] != found[j])) {
					matched = false;
				}
			}
			if(matched) {
				for(var j = 0; j < t.length; j++) {
					if(!found_at[t[j]]) {
						sectors[t[j]] = true;
					}
				}
//				sectors[t[0]] = sectors[t[1]] = sectors[t[2]] = true;
			}
		}
	}
	return sectors;
}

function get_current_sector() {
	var sectortext = document.evaluate('//a[contains(@href, "index.php?p=space&a=view_sector")]//text()[contains(., "SECTOR")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var re;
	var sector = 1;

	if(re = /SECTOR\s*(\d+)/.exec(sectortext.data)) {
		sector = parseInt(re[1]);
	}
	return sector;	
}

function insert_nardocom() {
	var nardocom = document.createElement('span');
	var button = document.createElement('input');
	
	nardocom.id = "nardocom3";
	nardocom.style.display = "none";
	button.type = "button";
	button.value = "increase";
	button.addEventListener('click', shade_spacenav, false);
	nardocom.appendChild(button);
	document.body.appendChild(nardocom);
}

function check_for_quest() {
	var re;
	var total_sectors = 0;
	var sectors = new Array();
	var searched = new Array();
	
	if(re = /sectors that the modules are\s+in is ([\d,]+)/.exec(document.body.innerHTML)) {
		var sum = parseInt(re[1].replace(/,/, ''));
		var possibilities = find_rps_solutions(sum, []);
		GM_setValue('sum', sum);
		GM_setValue('active', true);
		for(var i = 0; i <= 1089; i++) {
			searched[i] = false;
		}
		GM_setValue('searched', searched.toSource());
		GM_setValue('found', '[]');
		GM_setValue('triplets', possibilities.toSource());
		sectors = get_sectors();
		GM_setValue('sectors', sectors.toSource());
		for(var i = 0; i < sectors.length; i++) {
			if(sectors[i]) {
				total_sectors++;
			}
		}
		alert("RPS Assistant\nSum: " + sum + "\nThere are " + total_sectors + " different sectors that the items could be in.");
	}
}

function find_rps_solutions(sum, found) {
	var primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997, 1009, 1013, 1019, 1021, 1031, 1033, 1039, 1049, 1051, 1061, 1063, 1069, 1087];
	var matches = new Array();

	for(var i = 0; i < primes.length; i++) {
		for(var j = i; j < primes.length; j++) {
			for(var k = j; k < primes.length; k++) {
				if(primes[i] + primes[j] + primes[k] == sum) {
					matches.push([primes[i], primes[j], primes[k]]);
				}
			}
		}
	}
	return matches;
}

function find_parent(node, nodetype) {
	while(node && (node.nodeName != nodetype)) {
		node = node.parentNode;
	}
	return node;
}