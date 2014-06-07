//
// GreaseMonkey KoC Upgrade Script
// Author: Jeffrey Davis


// ==UserScript==
// @name	KoC Upgrade Script
// @description	 Determines the correct time to buy new Siege/Fort upgrades (by race), and how much to bank in order to buy those upgrades
// @include	http://*kingsofchaos.com/armory.php*
// ==/UserScript==


// function codes
function extractText(haystack, needle1, needle2) {
  var x = haystack.indexOf(needle1);
  if (x < 0) return null;
  var y = haystack.indexOf(needle2, x + needle1.length);
  if (y < 0) return null;
  return haystack.substring(x + needle1.length, y);
}


function write(text) {
	var el = document.getElementById('statusDiv');
	if (!el) {
		el = document.body.appendChild(document.createElement('div'));
		el.id = 'statusDiv';
		el.setAttribute('style', 'background: #000; position: fixed; top: 10px; left: 10px; background:# 000; border: 1px solid #0f0; padding: 5px;');
		}
	el.innerHTML += text;
}


// variables
var myrace = extractText(document.body.innerHTML, '<td><img src="/images/', '/small_topbanner_01.gif"></td>');

var mysa = extractText(document.body.innerHTML, '<td><b>Strike Action</b></td>\n\t\t<td align="right">', '</td>');
	var mysa = mysa.replace(/\,/g,'');

var mysiege = extractText(document.body.innerHTML, '<th class="subh" align="left">Current Siege Technology</th>\n        <th class="subh" width="50%">Upgrade</th>\n    </tr>\n    <tr>\n        <td>', '</td>');

var myda = extractText(document.body.innerHTML, '<td><b>Defensive Action</b></td>\n\t\t<td align="right">', '</td>');
	var myda = myda.replace(/\,/g,'');

var myfort = extractText(document.body.innerHTML, '<th class="subh" align="left">Current Fortification</th>\n        <th class="subh" width="50%">Upgrade</th>\n    </tr>\n    <tr>\n        <td>', '</td>');

var message1;

var message2;


// SA Arrays
var siege=new Array();
siege[0]="None";
siege[1]="Flaming Arrows";
siege[2]="Ballistas";
siege[3]="Battering Ram";
siege[4]="Ladders";
siege[5]="Trojan Horse";
siege[6]="Catapults";
siege[7]="War Elephants";
siege[8]="Siege Towers";
siege[9]="Trebuchets";
siege[10]="Black Powder";
siege[11]="Sappers";
siege[12]="Dynamite";
siege[13]="Greek Fire";
siege[14]="Cannons";


var sa_message=new Array();
sa_message[0]="No Siege Upgrades Needed!!";
sa_message[1]="Time to upgrade to Flaming Arrows!!" + "\n" + "sell 1 BPMs and buy the upgrade!!";
sa_message[2]="Time to upgrade to Ballistas!!" + "\n" + "sell 1 BPMs and buy the upgrade!!";
sa_message[3]="Time to upgrade to Battering Ram!!" + "\n" + "sell 1 BPMs and buy the upgrade!!";
sa_message[4]="Time to upgrade to Ladders!!" + "\n" + "sell 1 BPMs and buy the upgrade!!";
sa_message[5]="Time to upgrade to Trojan Horse!!" + "\n" + "sell 2 BPMs and buy the upgrade!!";
sa_message[6]="Time to upgrade to Catapults!!" + "\n" + "sell 3 BPMs and buy the upgrade!!";
sa_message[7]="Time to upgrade to War Elephants!!" + "\n" + "sell 5 BPMs and buy the upgrade!!";
sa_message[8]="Time to upgrade to Siege Towers!!" + "\n" + "sell 9 BPMs and buy the upgrade!!";
sa_message[9]="Time to upgrade to Trebuchets!!" + "\n" + "sell 17 BPMs and buy the upgrade!!";
sa_message[10]="Time to upgrade to Black Powder!!" + "\n" + "sell 33 BPMs and buy the upgrade!!";
sa_message[11]="Time to upgrade to Sappers!!" + "\n" + "sell 65 BPMs and buy the upgrade!!";
sa_message[12]="Time to upgrade to Dynamite!!" + "\n" + "sell 129 BPMs and buy the upgrade!;!";
sa_message[13]="Time to upgrade to Greek Fire!!" + "\n" + "sell 258 BPMs and buy the upgrade!!";
sa_message[14]="Time to upgrade to Cannons!!" + "\n" + "sell 515 BPMs and buy the upgrade!!";



// SA Functions
function orc_sa() {
	if (mysiege==siege[0] && mysa>=180000) { message1=sa_message[1]; }
	else if (mysiege==siege[1] && mysa>=240000) { message1=sa_message[2]; }
	else if (mysiege==siege[2] && mysa>=300000) { message1=sa_message[3]; }
	else if (mysiege==siege[3] && mysa>=720000) { message1=sa_message[4]; }
	else if (mysiege==siege[4] && mysa>=1680000) { message1=sa_message[5]; }
	else if (mysiege==siege[5] && mysa>=3840000) { message1=sa_message[6]; }
	else if (mysiege==siege[6] && mysa>=8910000) { message1=sa_message[7]; }
	else if (mysiege==siege[7] && mysa>=21000000) { message1=sa_message[8]; }
	else if (mysiege==siege[8] && mysa>=49500000) { message1=sa_message[9]; }
	else if (mysiege==siege[9] && mysa>=116280000) { message1=sa_message[10]; }
	else if (mysiege==siege[10] && mysa>=269880000) { message1=sa_message[11]; }
	else if (mysiege==siege[11] && mysa>=621180000) { message1=sa_message[12]; }
	else if (mysiege==siege[12] && mysa>=1417500000) { message1=sa_message[13]; }
	else if (mysiege==siege[13] && mysa>=3408840000) { message1=sa_message[14]; }
	else { message1=sa_message[0]; }
};

function undead_sa() {
	if (mysiege==siege[0] && mysa>=144000) { message1=sa_message[1]; }
	else if (mysiege==siege[1] && mysa>=192000) { message1=sa_message[2]; }
	else if (mysiege==siege[2] && mysa>=240000) { message1=sa_message[3]; }
	else if (mysiege==siege[3] && mysa>=576000) { message1=sa_message[4]; }
	else if (mysiege==siege[4] && mysa>=1344000) { message1=sa_message[5]; }
	else if (mysiege==siege[5] && mysa>=3072000) { message1=sa_message[6]; }
	else if (mysiege==siege[6] && mysa>=7128000) { message1=sa_message[7]; }
	else if (mysiege==siege[7] && mysa>=16800000) { message1=sa_message[8]; }
	else if (mysiege==siege[8] && mysa>=39600000) { message1=sa_message[9]; }
	else if (mysiege==siege[9] && mysa>=93024000) { message1=sa_message[10]; }
	else if (mysiege==siege[10] && mysa>=215904000) { message1=sa_message[11]; }
	else if (mysiege==siege[11] && mysa>=496944000) { message1=sa_message[12]; }
	else if (mysiege==siege[12] && mysa>=1134000000) { message1=sa_message[13]; }
	else if (mysiege==siege[13] && mysa>=2727072000) { message1=sa_message[14]; }
	else { message1=sa_message[0]; }
};

function others_sa() {
	if (mysiege==siege[0] && mysa>=120000) { message1=sa_message[1]; }
	else if (mysiege==siege[1] && mysa>=160000) { message1=sa_message[2]; }
	else if (mysiege==siege[2] && mysa>=200000) { message1=sa_message[3]; }
	else if (mysiege==siege[3] && mysa>=480000) { message1=sa_message[4]; }
	else if (mysiege==siege[4] && mysa>=1120000) { message1=sa_message[5]; }
	else if (mysiege==siege[5] && mysa>=2560000) { message1=sa_message[6]; }
	else if (mysiege==siege[6] && mysa>=5940000) { message1=sa_message[7]; }
	else if (mysiege==siege[7] && mysa>=14000000) { message1=sa_message[8]; }
	else if (mysiege==siege[8] && mysa>=33000000) { message1=sa_message[9]; }
	else if (mysiege==siege[9] && mysa>=77520000) { message1=sa_message[10]; }
	else if (mysiege==siege[10] && mysa>=179920000) { message1=sa_message[11]; }
	else if (mysiege==siege[11] && mysa>=414120000) { message1=sa_message[12]; }
	else if (mysiege==siege[12] && mysa>=945000000) { message1=sa_message[13]; }
	else if (mysiege==siege[13] && mysa>=2272560000) { message1=sa_message[14]; }
	else { message1=sa_message[0]; }
};



if (myrace=="Orcs") { orc_sa(); }
else if (myrace=="Undead") { undead_sa(); }
else { others_sa(); }


// DA Arrays
var fort=new Array();
fort[0]="Camp";
fort[1]="Stockade";
fort[2]="Rabid Pitbulls";
fort[3]="Walled Town";
fort[4]="Towers";
fort[5]="Battlements";
fort[6]="Portcullis";
fort[7]="Boiling Oil";
fort[8]="Trenches";
fort[9]="Moat";
fort[10]="Drawbridge";
fort[11]="Fortress";
fort[12]="Stronghold";
fort[13]="Palace";
fort[14]="Keep";
fort[15]="Citadel";
fort[16]="Hand of God";


var da_message=new Array();
da_message[0]="No Defense Upgrades Needed!!";
da_message[1]="Time to upgrade to Stockade!!" + "\n" + "sell 1 IS and buy the upgrade!!";
da_message[2]="Time to upgrade to Rabid Pitbulls!!" + "\n" + "sell 1 IS and buy the upgrade!!";
da_message[3]="Time to upgrade to Walled Town!!" + "\n" + "sell 1 IS and buy the upgrade!!";
da_message[4]="Time to upgrade to Towers!!" + "\n" +  "sell 1 IS and buy the upgrade!!";
da_message[5]="Time to upgrade to Battlements!!" + "\n" + "sell 2 IS and buy the upgrade!!";
da_message[6]="Time to upgrade to Portcullis!!" + "\n" + "sell 3 IS and buy the upgrade!!";
da_message[7]="Time to upgrade to Boiling Oil!!" + "\n" + "sell 5 IS and buy the upgrade!!";
da_message[8]="Time to upgrade to Trenches!!" + "\n" + "sell 10 IS and buy the upgrade!!";
da_message[9]="Time to upgrade to Moat!!" + "\n" + "sell 19 IS and buy the upgrade!!";
da_message[10]="Time to upgrade to Drawbridge!!" + "\n" + "sell 37 IS and buy the upgrade!!";
da_message[11]="Time to upgrade to Fortress!!" + "\n" + "sell 73 IS and buy the upgrade!!";
da_message[12]="Time to upgrade to Stronghold!!" + "\n" + "sell 146 IS and buy the upgrade!!";
da_message[13]="Time to upgrade to Palace!!" + "\n" + "sell 292 IS and buy the upgrade!!";
da_message[14]="Time to upgrade to Keep!!" + "\n" + "sell 583 IS and buy the upgrade!!";
da_message[15]="Time to upgrade to Citadel!!" + "\n" + "sell 1,166 IS and buy the upgrade!!";
da_message[16]="Time to upgrade to Hand of God!!" + "\n" + "sell 2,331 and buy the upgrade!!";



// DA Functions
function orcs_da () {
	if (myfort==fort[0] && mysa>=120000) { message2=da_message[1]; }
	else if (myfort==fort[1] && myda>=150000) { message2=da_message[2]; }
	else if (myfort==fort[2] && myda>=270000) { message2=da_message[3]; }
	else if (myfort==fort[3] && myda>=420000) { message2=da_message[4]; }
	else if (myfort==fort[4] && myda>=960000) { message2=da_message[5]; }
	else if (myfort==fort[5] && myda>=2565000) { message2=da_message[6]; }
	else if (myfort==fort[6] && myda>=6000000) { message2=da_message[7]; }
	else if (myfort==fort[7] && myda>=14190000) { message2=da_message[8]; }
	else if (myfort==fort[8] && myda>=32940000) { message2=da_message[9]; }
	else if (myfort==fort[9] && myda>=76440000) { message2=da_message[10]; }
	else if (myfort==fort[10] && myda>=175980000) { message2=da_message[11]; }
	else if (myfort==fort[11] && myda>=401625000) { message2=da_message[12]; }
	else if (myfort==fort[12] && myda>=909120000) { message2=da_message[13]; }
	else if (myfort==fort[13] && myda>=2674185000) { message2=da_message[14]; }
	else if (myfort==fort[14] && myda>=4561650000) { message2=da_message[15]; }
	else if (myfort==fort[15] && myda>=10127760000) { message2=da_message[16]; }
	else { message2=da_message[0]; }
};


function dwarves_da () {
	if (myfort==fort[0] && mysa>=160000) { message2=da_message[1]; }
	else if (myfort==fort[1] && myda>=200000) { message2=da_message[2]; }
	else if (myfort==fort[2] && myda>=360000) { message2=da_message[3]; }
	else if (myfort==fort[3] && myda>=560000) { message2=da_message[4]; }
	else if (myfort==fort[4] && myda>=1280000) { message2=da_message[5]; }
	else if (myfort==fort[5] && myda>=3420000) { message2=da_message[6]; }
	else if (myfort==fort[6] && myda>=8000000) { message2=da_message[7]; }
	else if (myfort==fort[7] && myda>=18920000) { message2=da_message[8]; }
	else if (myfort==fort[8] && myda>=43920000) { message2=da_message[9]; }
	else if (myfort==fort[9] && myda>=101920000) { message2=da_message[10]; }
	else if (myfort==fort[10] && myda>=234640000) { message2=da_message[11]; }
	else if (myfort==fort[11] && myda>=535500000) { message2=da_message[12]; }
	else if (myfort==fort[12] && myda>=1212160000) { message2=da_message[13]; }
	else if (myfort==fort[13] && myda>=3565580000) { message2=da_message[14]; }
	else if (myfort==fort[14] && myda>=6082200000) { message2=da_message[15]; }
	else if (myfort==fort[15] && myda>=13503680000) { message2=da_message[16]; }
	else { message2=da_message[0]; }
};


function others_da() {
	if (myfort==fort[0] && mysa>=100000) { message2=da_message[1]; }
	else if (myfort==fort[1] && myda>=125000) { message2=da_message[2]; }
	else if (myfort==fort[2] && myda>=225000) { message2=da_message[3]; }
	else if (myfort==fort[3] && myda>=350000) { message2=da_message[4]; }
	else if (myfort==fort[4] && myda>=800000) { message2=da_message[5]; }
	else if (myfort==fort[5] && myda>=2137500) { message2=da_message[6]; }
	else if (myfort==fort[6] && myda>=5000000) { message2=da_message[7]; }
	else if (myfort==fort[7] && myda>=11825000) { message2=da_message[8]; }
	else if (myfort==fort[8] && myda>=27450000) { message2=da_message[9]; }
	else if (myfort==fort[9] && myda>=63700000) { message2=da_message[10]; }
	else if (myfort==fort[10] && myda>=146650000) { message2=da_message[11]; }
	else if (myfort==fort[11] && myda>=334687500) { message2=da_message[12]; }
	else if (myfort==fort[12] && myda>=757600000) { message2=da_message[13]; }
	else if (myfort==fort[13] && myda>=2228487500) { message2=da_message[14]; }
	else if (myfort==fort[14] && myda>=3801375000) { message2=da_message[15]; }
	else if (myfort==fort[15] && myda>=8439800000) { message2=da_message[16]; }
	else { message2=da_message[0]; }
};



if (myrace=="Orcs") { orcs_da(); }
else if (myrace=="Dwarves") { dwarves_da(); }
else { others_da(); }


// Call Function
write(message1 + "<br><br>" + message2);