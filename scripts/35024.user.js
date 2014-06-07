// ==UserScript==
// @name		Urban Dead Map Links
// @description		Creates links next to the suburb's name to wiki's and RedRum's maps.
// @include		http://urbandead.com/map.cgi*
// @include		http://www.urbandead.com/map.cgi*
// @exclude		http://urbandead.com/map.cgi?logout
// @exclude		http://www.urbandead.com/map.cgi?logout
// ==/UserScript==

/* Urban Dead Map Links
 * v1.3
 * 
 * Copyright (C) 2008 Ville Jokela -- midianian@mbnet.fi
 *
 * Released under the terms of the GNU GPL V2, which can be found at http://www.gnu.org/copyleft/gpl.html
 *
 * Changes:
 *   1.3:
 *     * GM4IE, Opera and Greasemetal compatible
 *
 *   1.2:
 *     * Some two-part suburb names had the latter part in lowercase, which caused problems
 *
 *   1.1:
 *     * Standardized and cleaned up the code. Works now on FF 3.0.
 */


function insertMaps() {
	var rrSuburbs = {
		'Dakerstown':		1,
		'Jensentown':		2,
		'Quarlesbank':		3,
		'West Boundwood':	4,
		'East Boundwood':	5,
		'Lamport Hills':	6,
		'Chancelwood':		7,
		'Earletown':		8,
		'Rhodenbank':		9,
		'Dulston':		10,
		'Roywood':		11,
		'Judgewood':		12,
		'Gatcombeton':		13,
		'Shuttlebank':		14,
		'Yagoton':		15,
		'Millen Hills':		16,
		'Raines Hills':		17,
		'Pashenton':		18,
		'Rolt Heights':		19,
		'Pescodside':		20,
		'Peddlesden Village':	21,
		'Chudleyton':		22,
		'Darvall Heights':	23,
		'Eastonwood':		24,
		'Brooke Hills':		25,
		'Shearbank':		26,
		'Huntley Heights':	27,
		'Santlerville':		28,
		'Gibsonton':		29,
		'Dunningwood':		30,
		'Dunell Hills':		31,
		'West Becktown':	32,
		'East Becktown':	33,
		'Richmond Hills':	34,
		'Ketchelbank':		35,
		'Roachtown':		36,
		'Randallbank':		37,
		'Heytown':		38,
		'Spracklingbank':	39,
		'Paynterton':		40,
		'Owsleybank':		41,
		'Molebank':		42,
		'Lukinswood':		43,
		'Havercroft':		44,
		'Barrville':		45,
		'Ridleybank':		46,
		'Pimbank':		47,
		'Peppardville':		48,
		'Pitneybank':		49,
		'Starlingtown':		50,
		'Grigg Heights':	51,
		'Reganbank':		52,
		'Lerwill Heights':	53,
		'Shore Hills':		54,
		'Galbraith Hills':	55,
		'Stanbury Village':	56,
		'Roftwood':		57,
		'Edgecombe':		58,
		'Pegton':		59,
		'Dentonside':		60,
		'Crooketon':		61,
		'Mornington':		62,
		'North Blythville':	63,
		'Brooksville':		64,
		'Mockridge Heights':	65,
		'Shackleville':		66,
		'Tollyton':		67,
		'Crowbank':		68,
		'Vinetown':		69,
		'Houldenbank':		70,
		'Nixbank':		71,
		'Wykewood':		72,
		'South Blythville':	73,
		'Greentown':		74,
		'Tapton':		75,
		'Kempsterbank':		76,
		'Wray Heights':		77,
		'Gulsonside':		78,
		'Osmondville':		79,
		'Penny Heights':	80,
		'Foulkes Village':	81,
		'Ruddlebank':		82,
		'Lockettside':		83,
		'Dartside':		84,
		'Kinch Heights':	85,
		'West Grayside':	86,
		'East Grayside':	87,
		'Scarletwood':		88,
		'Pennville':		89,
		'Fryerbank':		90,
		'New Arkham':		91,
		'Old Arkham':		92,
		'Spicer Hills':		93,
		'Williamsville':	94,
		'Buttonville':		95,
		'Wyke Hills':		96,
		'Hollomstown':		97,
		'Danversbank':		98,
		'Whittenside':		99,
		'Miltown':		100,
	};

	tdList = document.evaluate('//td[@class="sb"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	subName = tdList.snapshotItem(0);
	suburb = subName.textContent;
	subName.textContent += ' ';
	
	mapLinks = document.createElement('small');
	mapLinks.textContent += '(';

	maps = document.createElement('span');
	maps.textContent = 'maps: ';

	wikiMapLink = document.createElement('a');
	wikiMapLink.textContent = 'wiki';
	wikiMapLink.href = 'http://wiki.urbandead.com/index.php/' + suburb + '#Suburb_Map';
	wikiMapLink.style.color = '#faa';
	wikiMapLink.target = 'blank';

	if (rrSuburbs[suburb] >= 1 && rrSuburbs[suburb] <= 100) {
		rrMapLink = document.createElement('a');
		rrMapLink.textContent = 'RR';
		rrMapLink.href = 'http://redrum.soul-fantasy.net/map.php?suburb=' + rrSuburbs[suburb];
		rrMapLink.style.color = '#faa';
		rrMapLink.target = 'blank';
	} else
		rrMapLink = null;
	
	mapLinks.appendChild(maps);
	mapLinks.appendChild(wikiMapLink);
	if (rrMapLink != null) {
		mapLinks.appendChild(document.createTextNode(', '));
		mapLinks.appendChild(rrMapLink);
	}
	mapLinks.appendChild(document.createTextNode(')'));
	subName.appendChild(mapLinks);
}

insertMaps();
