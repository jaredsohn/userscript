// ==UserScript==
// @name			BvS - Secret Trophies
// @namespace		Thosha
// @description		Show the Secret Trophies
// @include			http://*animecubed.com/billy/bvs/trophyroom.html
// @require			http://userscripts.org/scripts/source/74144.user.js
// @version			1.6
// @history			1.6 Added Open Your Eyes (http://www.youtube.com/watch?v=CC_Y4zOUdcI)
// @history         1.5.2 Fixed a typo where all season collections only where worth 1 point
// @history			1.5.1 Some code optimize
// @history			1.5 Added TACOCAT
// @history			1.4 Added Scrapbook Hero and The Long Dream
// @history			1.3 Now with auto update! Fixed Smile For The Camera. Added S-5
// @history			1.2 Trying out auto update
// @history			1.1 Fixed fruit stand, added Gift Giver
// @history			1.0 Initial Release
// @licence			MIT; http://www.opensource.org/licenses/mit-license.php
// @copyright		2010-2011, Thosha
// ==/UserScript==


try {
	ScriptUpdater.check(93505, '1.6');
} catch(e) { };

//Find the trophy table
var trophytable = document.evaluate("//td/i/b[text()='The Shadow Mark']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (trophytable.snapshotLength > 0) {
	trophytablenode = trophytable.snapshotItem(0).parentNode.parentNode.parentNode.parentNode;
}
else {
	alert('Could not detect Trophy Table Node');
}

function create_trophy(trophy) {
	var newitem = document.createElement('tr');
	var newitem1 = document.createElement('td');
	var newitem2 = document.createElement('td');

	newitem1.innerHTML = '<img src="http://img.photobucket.com/albums/v328/angelhunter/BvS/0x.jpg">';

	switch (trophy) {
		case 'Enough Already':
		trophy_name = 'Enough Already'; trophy_points = 1; trophy_desc = 'Achieve the maximum Season'; break;
		case 'S-1':
		trophy_name = 'S-1'; trophy_points = 5; trophy_desc = 'Get the Season One Collection'; break;
		case 'S-2':
		trophy_name = 'S-2'; trophy_points = 5; trophy_desc = 'Get the Season Two Collection'; break;
		case 'S-3':
		trophy_name = 'S-3'; trophy_points = 5; trophy_desc = 'Get the Season Three Collection'; break;
		case 'S-4':
		trophy_name = 'S-4'; trophy_points = 5; trophy_desc = 'Get the Season Four Collection'; break;
		case 'S-5':
		trophy_name = 'S-5'; trophy_points = 5; trophy_desc = 'Get the Season Five Collection'; break;
		case 'Fruit Dealer':
		trophy_name = 'Fruit Dealer'; trophy_points = 10; trophy_desc = 'Eat Fresh Fruit while having 50+ Cool'; break;
		case 'Gift Giver':
		trophy_name = 'Gift Giver'; trophy_points = 10; trophy_desc = 'Put an Over 11000 or a Sho Nuff Elixir into the Hidden HoClaus gift pile'; break;
		case 'Smile For The Camera':
		trophy_name = 'Smile For The Camera'; trophy_points = 10; trophy_desc = 'Get 11 treats, a mask and a party invite in Candyween'; break;
		case 'Okkusenman':
		trophy_name = 'Okkusenman'; trophy_points = 20; trophy_desc = 'Achieve a Rank of S against a WorldKaiju'; break;
		case 'Open Your Eyes':
		trophy_name = 'Open Your Eyes'; trophy_points = 20; trophy_desc = 'Complete all Vertices of the Eleven-Pronged Seal'; break;
		case 'Rising Sun':
		trophy_name = 'Rising Sun'; trophy_points = 20; trophy_desc = 'Defeat Triple-H-Lvl-2 in a Mahjong Match'; break;
		case 'Scrapbook Hero':
		trophy_name = 'Scrapbook Hero'; trophy_points = 20; trophy_desc = 'Collect all six Bromides from Candyween'; break;
		case 'The Festival':
		trophy_name = 'The Festival'; trophy_points = 20; trophy_desc = 'Defeated the Eleven Tails at The Festival'; break;
		case 'The Long Dream':
		trophy_name = 'The Long Dream'; trophy_points = 20; trophy_desc = 'Defeat FutureMiku, the final boss of Billy Idol'; break;
		case 'Tiny Three':
		trophy_name = 'Tiny Three'; trophy_points = 20; trophy_desc = 'Bank 3+ different Tiny Bee Weapons'; break;
		case 'TACOCAT':
		trophy_name = 'TACOCAT'; trophy_points = 20; trophy_desc = 'Beat the final character battle in Flower Wars'; break;
		case 'Choosing Sides':
		trophy_name = 'Choosing Sides'; trophy_points = 60; trophy_desc = 'Gain the Fate or Destiny Bloodline'; break;
		default:
		trophy_name = 'Undefined'; trophy_points = 0; trophy_desc = 'This trophy was generated cause of en error, please report to the maker Thosha'; break;
	}
	newitem2.innerHTML = '<i><b>'+trophy_name+'</b></i> : <b><font color="337133">'+trophy_points+'</font> Points</b> <font color="770000" style="font-variant:small-caps"><b><i>Secret Trophy</i></b></font><br>'+trophy_desc;
	newitem2.style.color='444444';

	newitem.appendChild(newitem1);
	newitem.appendChild(newitem2);

	//Create the black line seperator
	blackbar = document.createElement('tr');
	blackbar1 = document.createElement('td');
	blackbar1.colSpan="2";
	blackbar1.innerHTML='<img src="/billy/layout/missionbar/blackbar.gif" width="460" height="1">';
	blackbar.appendChild(blackbar1);

	trophytablenode.appendChild(blackbar);
	trophytablenode.appendChild(newitem);
}

var snap = document.evaluate("//td/i/b[text()='Enough Already']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (snap.snapshotLength == 0) { create_trophy('Enough Already');}

var snap = document.evaluate("//td/i/b[text()='S-1']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (snap.snapshotLength == 0) { create_trophy('S-1');}
var snap = document.evaluate("//td/i/b[text()='S-2']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (snap.snapshotLength == 0) { create_trophy('S-2');}
var snap = document.evaluate("//td/i/b[text()='S-3']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (snap.snapshotLength == 0) { create_trophy('S-3');}
var snap = document.evaluate("//td/i/b[text()='S-4']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (snap.snapshotLength == 0) { create_trophy('S-4');}
var snap = document.evaluate("//td/i/b[text()='S-5']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (snap.snapshotLength == 0) { create_trophy('S-5');}

var snap = document.evaluate("//td/i/b[text()='Fruit Dealer']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (snap.snapshotLength == 0) { create_trophy('Fruit Dealer');}
var snap = document.evaluate("//td/i/b[text()='Gift Giver']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (snap.snapshotLength == 0) { create_trophy('Gift Giver');}
var snap = document.evaluate("//td/i/b[text()='Smile For The Camera']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (snap.snapshotLength == 0) { create_trophy('Smile For The Camera');}

var snap = document.evaluate("//td/i/b[text()='Okkusenman']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (snap.snapshotLength == 0) { create_trophy('Okkusenman');}
var snap = document.evaluate("//td/i/b[text()='Open Your Eyes']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (snap.snapshotLength == 0) { create_trophy('Open Your Eyes');}
var snap = document.evaluate("//td/i/b[text()='Rising Sun']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (snap.snapshotLength == 0) { create_trophy('Rising Sun');}
var snap = document.evaluate("//td/i/b[text()='Scrapbook Hero']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (snap.snapshotLength == 0) { create_trophy('Scrapbook Hero');}
var snap = document.evaluate("//td/i/b[text()='The Festival']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (snap.snapshotLength == 0) { create_trophy('The Festival');}
var snap = document.evaluate("//td/i/b[text()='The Long Dream']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (snap.snapshotLength == 0) { create_trophy('The Long Dream');}
var snap = document.evaluate("//td/i/b[text()='Tiny Three']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (snap.snapshotLength == 0) { create_trophy('Tiny Three');}
var snap = document.evaluate("//td/i/b[text()='TACOCAT']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (snap.snapshotLength == 0) { create_trophy('TACOCAT');}

var snap = document.evaluate("//td/i/b[text()='Choosing Sides']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (snap.snapshotLength == 0) { create_trophy('Choosing Sides');}