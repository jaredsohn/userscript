// Mr. Script v1.8
//
// --------------------------------------------------------------------
// This is a user script.  To install it, you need Greasemonkey 0.8 or
// later. Get it at https://addons.mozilla.org/en-US/firefox/addon/748
// To uninstall, go to Tools/Manage User Scripts, select "Mr. Script",
// check "Also uninstall associated preferences" and click "Uninstall".
// Released under the GPL license: http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
//
// ==UserScript==
// @name        Mr. Script
// @namespace   http://www.noblesse-oblige.org/lukifer/scripts/
// @description	interface overhauler for KingdomofLoathing.com
// @version		1.8
// @author		Lukifer
// @contributor	Ohayou
// @contributor Hellion
// @contributor	Tard
// @contributor JiK4eva
// @contributor BeingEaten
// @contributor Picklish
// @contributor	CharonTheHand
// @include     http://127.0.0.1:60*/*
// @include		http://*localhost:*/*
// @include     http://*kingdomofloathing.com/*
// @exclude     http://images.kingdomofloathing.com/*
// @exclude     http://forums.kingdomofloathing.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant	GM_log
// @grant	GM_setValue
// @grant	GM_getValue
// @grant	GM_deleteValue
// @grant	GM_xmlhttpRequest
// @unwrap
// ==/UserScript==


var place = location.pathname.replace(/\/|\.(php|html)$/gi, "").toLowerCase();
if(place === "place") {
	var match = location.search.match(/whichplace=([0-9a-zA-Z_\-]*)/);
	if(match.length > 1) place = match[1];
}
//console.time("Mr. Script @ " + place);
//GM_log("at:" + place);

// n.b. version number should always be a 3-digit number.  If you move to 1.9, call it 1.9.0.  Don't go to 1.8.10 or some such.
var VERSION = 180;
var MAXLIMIT = 999;
var ENABLE_QS_REFRESH = 1;
var DISABLE_ITEM_DB = 0;

var thePath = location.pathname;

var global = this; //, mr = unsafeWindow.top.mr = global;

// server variable lets you be logged on to different servers with different characters and keep them straight.
// not nearly so nifty now that there's only www and dev....
var server = location.host + "/";
var serverNo = (server.match(/(.)\./) || {1:"L"})[1]; 	// the "7" in www7.X, or an "L" if no . is in the hostname.

var pwd = GM_getValue('hash.' + server.split('.')[0]);

var prefAutoclear = GetPref('autoclear');
var prefSpoilers = GetPref('zonespoil') == 1;

//really cool hack to capture DomNodeInserts without having to use the deprecated DOMNodeInserted event,
//which is apparently a huge performance drain:
//after the document is loaded, slap an invisible animation onto any "interesting" new elements that arrive.
//bind a handler to the animation-start event which then does whatever needs doing with the new elements.
//in our case, the AJAX 'Results:' boxes are always starting with <center><center> and are in a div named effdiv.

addCss('@-moz-keyframes nodeInserted { from { clip: rect(1px,auto,auto,auto) } to { clip: rect(0px,auto,auto,auto) } }');

//specify what an "interesting" element is... any "Results:" block has this form.

addCss('center > center > table > tbody > tr > td > b { animation-duration: 0.001s; animation-name: nodeInserted }');
//this gets us right down to a <b>Results:</b> header, I hope.

$(document).on('animationstart',ResultHandler);

anywhere(); // stuff we always add where we can

// town_right to cover gourds, and forestvillage for untinkered results...
if (/^(adventure|choice|craft|knoll|shore|town_right|forestvillage|place|multiuse)$/.test(place)) {
	dropped_item();
}
// where are we and what do we thus want to do?
var handler;
if ((handler = global["at_" + place])) {
	handler();
}
if ((handler = prefSpoilers && global["spoil_" + place])) {
	handler();
}

global = null;
handler = null;

// no imperative top-level code below here; the rest is function definitions:

jQuery.prototype.toString = function() {
  return "[jQuery:" + this.length + "]";
};

String.prototype.trim = function () {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
}

// ANYWHERE: stuff that we want to do on every possible occasion.
function anywhere() {
	if (prefAutoclear) {
		$('input[value=1]').each(function(i) {
			AddAutoClear(this, prefAutoclear);
		});
	}
}

// Dropped_Item: Add stuffy-stuff to dropped items.
function dropped_item() {
	$('img').each(function() {
		var onclick = this.getAttribute("onclick");
		if (/desc/.test(onclick || "")) {
			AddLinks(onclick, this.parentNode.parentNode, null, thePath);
		}
	});
}

function addCss(cssString) {
	var head = document.getElementsByTagName('head')[0];
	if (head === undefined) return;
	var newCss = document.createElement('style');
	newCss.type = "text/css";
	newCss.innerHTML = cssString;
	head.appendChild(newCss);
}

function ResultHandler(e) {
	if (e.originalEvent.animationName == 'nodeInserted') {
		var target = e.target;
		if ($(target).parents("#effdiv").length === 0) {
			return;
		}
		var mystuff = $(target).parents('#effdiv').children('center:first').html();
		var effdiv = $(target).parents('#effdiv');
// TODO:
// we need to check multiple <b> nodes here, for cases where there is, for example, multi-stage crafting.
		var bnode = effdiv.find('b:eq(1)');
		var btext = bnode.text();
		var goHere = checkForRedirects(mystuff);
		if (goHere != "") {
			mainpane_goto(goHere);
		} else if (mystuff.indexOf("You equip an item:") != -1) {
			process_equip(btext, bnode);
		} else if (mystuff.indexOf("You put on an Outfit:") != -1) {
			process_outfit(btext, bnode);
		} else if (mystuff.indexOf("You acquire an item:") != -1) {
			var theItem = $(bnode).parent().parent().get(0);
			AddLinks(null, theItem, null, thePath);
		} else if (mystuff.indexOf("You acquire an effect:") != -1) {
			process_effect(btext, bnode);
		} else { // some non-equip/acquire event took place, such as a quest item opening a zone.
			btext = $(target).parents('#effdiv').children('center:first').text();
			var insertAt = $(target).parents('#effdiv').find('blockquote:first');
			if (insertAt.length === 0)
				insertAt = $(target).parent('#effdiv').children('center:first').find('tr:last')
			process_results(btext, insertAt);
		}
	}
}

function process_effect(effectname, jnode) {
	switch(effectname) {
		case 'Filthworm Larva Stench':		jnode.after(AppendLink('[drone chamber (1)]',snarfblat(128))); 			break;
		case 'Filthworm Drone Stench':		jnode.after(AppendLink('[guard chamber (1)]',snarfblat(129))); 			break;
		case 'Filthworm Guard Stench':		jnode.after(AppendLink('[Queen! (1)]',snarfblat(130)));				    break;
		case 'Stone-Faced':			        jnode.after(AppendLink('[hidden temple (1)]',snarfblat(280)));			break;
		case 'Down the Rabbit Hole':		jnode.after(AppendLink('[go down]',to_place('rabbithole')))
            								.after(AppendLink('[tea party!]',to_place('rabbithole&action=rabbithole_teaparty')));	break;
		case 'Knob Goblin Perfume':		    jnode.after(AppendLink('[knob]','cobbsknob.php'));				        break;
	}
}


function process_equip(itemname, jnode) {
	switch(itemname) {
		case 'continuum transfunctioner':	jnode.after(AppendLink('[8-bit realm (1)]',snarfblat(73)));		break;
		case 'huge mirror shard':		    jnode.after(AppendLink('[chamber]','lair6.php?place=1'));	    break;
		case 'snorkel':				        jnode.after(AppendLink('[map]',inv_use(26)));					break;
		case 'pool cue':			        jnode.after(AppendLink('[chalk it!]',inv_use(1794)));			break;
		case "Talisman o' Nam":			    jnode.after(AppendLink('[Dome moD]',to_place('palindome')));	break;
		case 'worm-riding hooks':		    jnode.after(AppendLink('[drum!]',inv_use(2328)));				break;
        case 'Mega Gem':                    jnode.after(AppendLink("[Dr. Awkward Office (1)]",to_place('palindome&action=pal_droffice'))); break;
		case 'dingy planks':			    jnode.after(AppendLink('[boat]', inv_use(146)));				break;
		case "makeshift SCUBA gear": 		jnode.after(AppendLink('[odor]', 'lair2.php?action=odor'));		break;
        case 'worthless gew-gaw':
        case 'worthless knick-knack':
        case 'worthless trinket':           jnode.after(AppendLink('[hermit]','hermit.php'));               break;

		case "Lord SpookyRaven's spectacles":
			if (weCameFrom('manor3')) {
				mainpane_goto('/manor3.php');
			}
			break;
		case "swashbuckling pants":
			if (weCameFrom("choice.php")) {
				jnode.after(AppendLink('[visit Caronch (1)]',snarfblat(157)));
			}
			break;
		case "Victor, the Insult Comic Hellhound Puppet":
		case "observational glasses":
		case "hilarious comedy prop":		jnode.after(AppendLink('[visit Mourn]','pandamonium.php?action=mourn')); 	break;
	}
}

function process_outfit(outfitname, jnode) {
	switch(outfitname) {
		case 'Knob Goblin Harem Girl Disguise':
			jnode
				.after(AppendLink('[perfume]',inv_use(307)))
				.after(AppendLink('[knob]','cobbsknob.php'));
			break;
		case 'Knob Goblin Elite Guard Uniform':
			jnode.after(AppendLink('[knob]','cobbsknob.php'));
			break;
		case 'Swashbuckling Getup':
			jnode.after(AppendLink('[island]','island.php'));
			break;
		case 'Filthy Hippy Disguise':
			if (weCameFrom('store.php')) {
				mainpane_goto('/store.php?whichstore=h');
			} else  {
				jnode.after(AppendLink('[buy fruit]','store.php?whichstore=h'));
			}
			break;
		case 'Mining Gear':
			jnode.after(AppendLink('[dwarf mine]','mining.php?mine=1'));
			break;
		case 'Bugbear Costume':
			if (weCameFrom('store.php')) {
				mainpane_goto('/store.php?whichstore=b');
			} else {
				jnode.after(AppendLink('[bakery]','store.php?whichstore=b'));
			}
			break;
		case 'eXtreme Cold-Weather Gear':
			jnode.after(AppendLink('[Trapper]','trapper.php'));
			jnode.after(AppendLink('[hit the slopes (1)]',snarfblat(273)));
			break;
		case 'Cloaca-Cola Uniform':
		case 'Dyspepsi-Cola Uniform':
			jnode.after(AppendLink('[battlefield (1)]',snarfblat(85)));
			break;
		case 'Frat Warrior Fatigues':
		case 'War Hippy Fatigues':
			jnode.after(AppendLink('[island]','island.php'));
			break;
	}
}

// Don't ask why this guy bothered to write wrapper functions. He just did. :-)
function persist(key, value) {
	try {
		GM_setValue(key, value);
	} catch(e) {
		console.error('Error while setting ' + key + ' to ' + value + ': ' + e.message);
	}
}

function integer(n) {
	if (typeof n == 'string') n.replace(/^\D+|,/g, "");
	return parseInt(n, 10);
}

function text(x) {
	switch (typeof x) {
	case "object":
		if ("undefined" != typeof x.textContent)
			return $.trim(x.textContent);
		break;
	case "string":
		return $.trim(x);
		break;
	}
	throw new Error("Failed to textify "+ x);
}

// inv_use: save ourselves some typing.
function inv_use(item) {
	return "inv_use.php?pwd="+pwd+"&which=3&whichitem="+item;
}

// multiuse: ditto
function multiuse(item,qty) {
	return 'multiuse.php?pwd='+pwd+'&action=useitem&quantity='+qty+'&whichitem='+item;
}

// snarfblat: ditto
function snarfblat(locNumber) {
	return "adventure.php?snarfblat="+locNumber;
}

// to_place: ditto
function to_place(locName) {
	return "place.php?whichplace="+locName;
}

// equip: return a link to equip the specified object.
function equip(o) {
	var ie = "inv_equip.php?pwd=" + pwd + "&which=2";
	ie = ie + "&action=" + (o.a || 'equip');
	if (o.oname !== undefined) ie += "&outfitname=" + o.oname;
	if (o.onum	!== undefined) ie += "&whichoutfit=" + o.onum;
	if (o.i		!== undefined) ie += "&whichitem=" + o.i;
	if (o.s		!== undefined) ie += "&slot=" + o.s;
	return ie;
}

function parseItem(tbl) {
	tbl = $(tbl);
	var rel = tbl.attr('rel');
	var data = {};
	if (!rel) return data;
	var parts = rel.split('&');
	for (i in parts) {
		if (!parts.hasOwnProperty(i)) continue;
		var kv = parts[i].split('=');
		tbl.data(kv[0], kv[1]);
		data[kv[0]] = kv[1];
	}
	return data;
}

// Set/GetPref: store/retrieve data that applies to the script as a whole.
function SetPref(which, value) {
	persist("pref." + which, value);
}

function GetPref(which) {
	return GM_getValue("pref." + which);
}

// Set/GetData: store/retrieve data related to a particular session
function SetData(which, value) {
	persist(serverNo + which, value);
}

function GetData(which) {
	return GM_getValue(serverNo + which);
}

// Set/GetCharData: store/retrieve data related to a particular account/ascension
function SetCharData(which, value) {
	var charname = GetData("charname");
	persist(charname + which, value);
}
function GetCharData(which) {
	var charname = GetData("charname");
	return GM_getValue(charname + which);
}
function DelCharData(which) {
	var charname = GetData("charname");
	GM_deleteValue(charname + which);
}

// Password hash functions.  whee.
function SetPwd(hash) {
	persist('hash.' + server.split('.')[0], hash);
}
function FindHash() {
	GM_get(server + 'api.php?what=status&for=MrScript', function(html) {
		var CharInfo = JSON.parse(html);
		var hash = CharInfo["pwd"];
		SetPwd(hash);
        SetData("charname",CharInfo["name"]);
        var moonsign = CharInfo["sign"];
        if ((moonsign == "Mongoose") || (moonsign == "Wallaby") || (moonsign == "Vole")) {
            SetCharData("friendlyknoll",true);
        } else {
            SetCharData("friendlyknoll",false);
        }
	});
}

// FINDMAXQUANTITY: Figure out how many MP restoratives to use
function FindMaxQuantity(item, howMany, deefault, safeLevel) {
	var min, max, avg, result;
	var hp = 0;

	switch(integer(item))
	{
		case 344: min = 8; max = 12; break; 	// Knob Goblin Seltzer
		case 345: min = 25; max = 29; break; 	// Knob Goblin Superseltzer
		case 347: min = 10; max = 14; break;  	// Dyspepsi-Cola
		case 357: min = 6; max = 9; break;  	// Mountain Stream Soda
		case 465: min = 55; max = 79; break;  	// Blue Pixel Potion
		case 466: min = 31; max = 40; break;  	// Green Pixel Potion
		case 518: 				                // Magical Mystery Juice
			min = 4 + (1.5 * GetCharData("level")); max = min + 2; break;
		case 593: min = 46; max = 50 ; break;  	// Phonics Down
		case 592: min = 20; max = 24; break;  	// Tiny House
		case 882: min = 20; max = 25; break;  	// Blatantly Canadian
		case 909:				                // Wint-o-Fresh mint
		case 1003: min = 3; max = 5; break;  	// Soda Water
		case 1334: min = 10; max = 14; break;  	// Cloaca-Cola
		case 1559: min = 30; max = 50; break;  	// Tonic Water
		case 1658: case 1659: case 1660: min = 7; max = 9; break;  // Flavored Cloaca Colas
		case 1788: min = 50; max = 60; break;  	// Unrefined Mountain Stream Syrup
		case 1950: min = 100; max = 100; break;	// Tussin
		case 1965: min = 45 ; max = 64; break;  // Monsieur Bubble
		case 2616: min = 50; max = 60; break;  	// Magi-Wipes
		case 2600: min = 60; max = 70; break;  	// Lily
		case 2576: min = 30; max = 39; break;  	// Locust
		case 2389:				                // Monstar
		case 2367: min = 70; max = 80; break;  	// Soy! Soy!
		case 2639: min = 9; max = 11; break;  	// Black Cherry
		case 2035: min = 30; max = 40; break;  	// Marquis de Poivre Soda
		case 2370: min = 80; max = 120; break;  // fennel Sooooooda
		case 2378: min = 40; max = 100; break;  // banana spritzer
		case 2437: min = 140; max = 160; break; // New Cloke!
		case 2606: min = 35; max = 45; break;  	// palm-frond fan
		case 3357: min = 30; max = 40; break;  	// delicious moth
		case 3450: min = 7; max = 15; break;  	// cotton candy pinch
		case 3451: min = 11; max = 23; break;  	// cotton candy smidgen
		case 3452: min = 15; max = 30; break;  	// cc skoche
		case 3453: min = 19; max = 38; break;  	// cc plug
		case 3454: min = 26; max = 52; break;  	// cc cone
		case 3455: min = 34; max = 68; break;  	// cc pillow
		case 3456: min = 41; max = 82; break;  	// cc bale
		case 3697: min = 150; max = 200; break; // high-pressure seltzer bottle
		case 3727: min = 50; max = 70; break;  	// Nardz
		case 4192: min = 5; max = 10; break;  	// sugar shard

		case 231: min = 3; max = 5; hp = 1; break;  // Doc G's Pungent Unguent
		case 232: min = 8; max = 10; hp = 1; break;  // Doc G's Ailment Ointment
		case 233: min = 13; max = 15; hp = 1; break;  // Doc G's Restorative Balm
		case 234: min = 18; max = 20; hp = 1; break;  // Doc G's Homeopathic Elixir
		case 474: min = 15; max = 20; hp = 1; break;  // Cast
		case 869: min = 5; max = 10; hp = 1; break;  // Forest Tears

		case 1450: case 1451: case 1452: 		// Wads
		case 1453: case 1454: case 1455:
			if (howMany > 15) return 15;
			else return howMany; break;
		case 1154: case 1261: 				// Air, Hatorade
			if (howMany > 3) return 3;
			else return howMany; break;
		case 226: case 2096: 				// Minotaur, Bee Pollen
			if (howMany > 5) return 5;
			else return howMany; break;
		case 5302: return 1; break;			//your own black heart

		case 4255: min = 200; max = 300; break;	//Wolfman Nardz
		case 4819: min = 80; max = 100; break;	//CRIMBCOLA
		case 4879: min = 40; max = 40; break;	//bacon bath ball
		case 6037: min = 35; max = 45; break; 	// creepy ginger ale
		case 4670: min = 15; max = 20; break;	// beer-scented teddy bear
		case 3983: min = 10; max = 20; break;	// dueling turtle
		case 5019: case 5020:  case 5021: 	// natto, tobiko, wasabi marble soda
			min = 5; max = 10; break;
		case 5292:				// d6
			min = 2.5 * GetCharData("level");
			max = min * 1.1;
			min = min * 0.9;
			break;

		default:
			if (deefault == 1)
			{	if (howMany > MAXLIMIT) return MAXLIMIT;
				else return howMany;
			} else return 0;
	}

	switch(safeLevel)
	{	case 0: avg = (min+max)/2.0; break;
		case 1: avg = ((max*2)+min)/3.0; break;
		case 2: avg = max; break;
	}
	if (hp == 1) result = integer(GetCharData("maxHP")-GetCharData("currentHP"));
	else		 result = integer(GetCharData("maxMP")-GetCharData("currentMP"));
	if (result == 0) return 0;
	result = result / avg;
	if (result > howMany) result = howMany;
	if (result > 0)	return integer(result);
	else		return 1;
}

// GM_GET: Stolen gleefully from OneTonTomato. Tee-hee!
function GM_get(dest, callback, errCallback) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://' + dest,
		headers: {"Referer": "http://" + location.host + "/game.php"},
		onerror:function(error) {
			if (typeof(errCallback)=='function' ) {
				errCallback(error);
			} else {
				GM_log("GM_get Error: " + error);
			}
		},
		onload:function(details) {
			if (typeof(callback)=='function' ) {
				callback(details.responseText);
			}
		}
	});
}

// APPENDLINK: Create link and return pointer to span
// will ajax the link unless it's a snarfblat URL or the jaxify flag is FALSE.
function AppendLink(linkString, linkURL,jaxify) {

	if (typeof jaxify == 'undefined') {
		if ((linkURL.indexOf("inv_") != -1) || (linkURL.indexOf("multiuse") != -1)) {
			jaxify = true; // auto-ajax inv_ (equip, eat, use, booze) and multiuse.
		}
		else jaxify = false;
	}

	var font = document.createElement('font');

	$(font)
		.addClass('mrfont')
		.attr('size', 1)
		.html(' ' + linkString);

	var link = document.createElement('a');

	$(link)
		.addClass('mrlink')
		.attr('href', linkURL)
		.attr('target', 'mainpane')
		.append(font);

	if (jaxify) {
		$(link).click(function(e) {
			e.preventDefault();
			ajaxit(linkURL);
			e.stopPropagation();
		});
	}

	var finalSpan = document.createElement('span');
	$(finalSpan)
		.addClass('mrspan')
		.append(' ')
		.append(link);

	return finalSpan;
}

// APPENDBUYBOX: Return HTML for buying an item.
function AppendBuyBox(itemNumber, whichStore, buttonText, noQuantityBox) {
	var eventString = ""; var htmlString = ""; var quantityString;
	if (noQuantityBox == 1) quantityString = "hidden";
	else quantityString = "text";
	if (prefAutoclear == 2) eventString = ' onFocus="this.select();"' +
		'onClick="this.select();" OnDblClick="this.select();"';
	else if (prefAutoclear == 1) eventString =
	' onFocus="javascript:if(this.value==1) this.value=\'\';"' +
	' onClick="javascript:if(this.value==1) this.value=\'\';"' +
	' onBlur="javascript:if(this.value==\'\') this.value=1;" ';

	htmlString =
		'<center><form action="store.php" method="post">' +
		'<input type="hidden" name="whichstore" value="' + whichStore +
		'"><input type="hidden" name="buying" value="Yep.">' +
		'<input type="hidden" name="phash" value="' + pwd +
		'"><input type="' + quantityString + '" class="text" size="2" ' +
		'value="1" name="howmany"' + eventString +
		'> <input type="hidden" name="whichitem" value="' + itemNumber +
		'"><input type="submit" class="button" value="' + buttonText + '"></form></center>';

	return(htmlString);
}

// NUMBERLINK: Fine, you think of a good function name.
// causes clicking on a number to fill that number in to the first "quantity" or "itemquantity" field available.
/*
function NumberLink(b) {
	var num = b.textContent.split(' ')[0];
	while(num.indexOf(',') != -1) num = num.split(',')[0] + num.split(',')[1];
	num = integer(num);
	if (num < 26) {
		var txt = b.textContent.substring(
			b.textContent.indexOf(' '),b.textContent.length);
		var func = "var q = document.getElementsByName(\"quantity\");" +
			"if(q.length==0) q = document.getElementsByName(\"itemquantity\");"+
			"if(q.length) q[0].value=" + num + "; return false;";
		b.innerHTML = "<a href='javascript:void(0);' onclick='" + func + "'>" + num + "</a>" + txt;
	}
}
*/

// APPENDOUTFITSWAP: Aren't unified interfaces just keen?
function AppendOutfitSwap(outfitNumber, text) {
	var span = document.createElement('span');
	var button1 = 0; var hidden;

	hidden = document.createElement('input');
	$(hidden)
		.attr('name','swap')
		.attr('type','hidden')
		.attr('value',outfitNumber);
	button1 = document.createElement('input');
	$(button1)
		.attr('type','submit')
		.attr('class','button')
		.attr('value',text)
	.click(function() {
		this.setAttribute('disabled','disabled');
		var backup = GetPref('backup');
		var which = $('input[name="swap"]').val();
		if (which <= 0 || backup == "") {
			mainpane_goto(equip({a:'outfit', oid:which}));
			//('/inv_equip.php?action=outfit&which=2&whichoutfit=' + which + '&pwd=' + pwd);
		} else {
			GM_get(server +
			equip({a:'customoutfit', oname:backup}),
			//'inv_equip.php?action=customoutfit&which=2&outfitname=' + backup + '&pwd=' + pwd,
			function(response) {
				var which = $('input[name="swap"]').val();
				mainpane_goto('/inv_equip.php?action=outfit&which=2&whichoutfit=' + which + '&pwd=' + pwd);
			});
		}
		return false;
	});
	$(span)
		.append(button1)
		.append(hidden);

	// Revert to backup
	if (outfitNumber == 0) {
		GM_get(server + "account_manageoutfits.php", function(response) {
			var swap = $('input[name="swap"]');
			var val; var index2; var backup = GetPref('backup');
			var index = response.indexOf(' value="' + backup + '"');
			if (index != -1) index = response.indexOf('name=delete',index) + 11;
			if (index != -1) index2 = response.indexOf('>',index);
			if (index != -1 && index2 != -1) {
				val = '-' + response.substring(index,index2);
				swap.attr('value',val);
			} else {
				swap.prev()
					.attr('disabled','disabled')
					.val('Backup Outfit Unavailable');
			}
		});
	}
	return span;
}

// ADDINVCHECK: Extra links for items, independently of where they're displayed.
function AddInvCheck(img) {
	if (img != undefined && img.getAttribute("onclick").indexOf("desc") != -1) {
		if ($(img).parents("table.item").size() > 0) return;	// this image already has an RCM attached; don't override.
																// (thank you, CDMoyer, for this idea!)
		img.addEventListener('contextmenu', InvChecker, true);
	}
}

function InvChecker(event) {
	if (this.getAttribute("done")) return;
	var item = this.parentNode.previousSibling.firstChild.getAttribute("value");
	if (item === null) {
		item = this.parentNode.previousSibling.firstChild.nextSibling.getAttribute("value");
	}
	if (item && item.length > 4) item = item.substring(0,item.length-9); // correct for prices in the mall

	var add = document.createElement('span');
	var br = document.createElement('br');
	var itemname = $(this).parent().next().text();

	$(add).attr('class','tiny').attr('id','span'+item).text("checking: "+itemname+ "...");
	$(this).parent().next().append(br).append(add);

    GM_get(server + 'submitnewchat.php?pwd='+pwd+'&graf=/count '+itemname, function(details) {
        itemqty = details.match(/ou have (\d+)/)[1];
        if (itemqty === undefined) itemqty = 0;
        addText = "(" + itemqty + " in inventory)";
        $('#span'+item).text(addText);
	});
	this.setAttribute("done","done"); event.stopPropagation(); event.preventDefault();
}

//AJAXIT: retrieve some ajax results and stick 'em in at the top of the main pane.
//gleefully stolen straight from KoL itself (with some drastic simplifications).
function ajaxit(dourl) {
	$.ajax({type:'GET',url:dourl+"&ajax=1", cache: false, data: null, global: false,
		success: function(out) {
			if (out.match(/no\|/)) {
				$('#ChatWindow').append('<font color="green">Oops!  Sorry, no can do.</font><br />\n');
				return;
			}
			$(top.mainpane.document).find("#effdiv").remove();
			var $eff = $(top.mainpane.document).find("#effdiv");
			if ($eff.length == 0) {
				var d = top.mainpane.document.createElement('div');
				d.id = 'effdiv';
				var b = top.mainpane.document.body;
				b.insertBefore(d, b.firstChild);
				$eff = $(d);
			}
			$eff.find('a[name="effdivtop"]').remove().end()
				.prepend('<a name="effdivtop"></a><center>'+out+'</center>').css('display','block');
			top.mainpane.document.location = top.mainpane.document.location+"#effdivtop";
		}
	});
}

// ADDTOPLINK: Add a link into the text-based top menu pane.
function AddTopLink(putWhere, target, href, html, space) {
	if (href == "") return;
	var a = document.createElement('a');
	if (target != 0) $(a).attr('target',target);
	$(a).attr('href',href).html(html);
	$(putWhere).append(a);
	if (space) $(putWhere).append(document.createTextNode(" "));
	return a;
}

function mainpane_goto(go_here) {
	top.document.getElementsByName('mainpane')[0].contentDocument.location.pathname = go_here;
}
// ADDLINKS: Extra links, etc. for items, independently of where they are.
function AddLinks(descId, theItem, formWhere, path) {
	var itemNo = $(theItem).parents('.item');
	var itemQty = 0;
	var itemNum = 0;
	var rel = '';
	if (itemNo) {
		rel = parseItem(itemNo);
		itemNum = rel.id;
		itemQty = rel.n;
	}

	if (!itemNum) {
		GM_log("unable to locate item number in AddLinks()");
		return '';
	}
	AddInvCheck(theItem.firstChild.firstChild);

	var doWhat, addWhere = $(theItem).children().eq(1);

	switch (integer(itemNum)) {
		case  518: case  344: case 2639: case 1658: case 1659: case 1660:		// MP restorers.  link to skillcasting.
			doWhat = 'skill'; break;

		case   14: case   15: case   16: case  196: case  340: case  341:		// spleen items.
		case  343: case  687: case  744: case 1261: case 1290: case 1512:
		case 1513: case 1514: case 1515: case 1605: case 2595: case 3368:
			doWhat = 'use'; break;

		case   20: case   21: case   22: case   33: case   59: case   71:		// various gear... RCM should make this obsolete.
		case 1465: case 1466: case 1467: case 1468: case 1469:
		case 1470: case 1471: case 1472: case 1473: case 1474: case 1475:
		case 1476: case 1477: case 1478: case 1479: case 1480: case 1481:
		case 1482: case 1483: case 1484: case 2302: case 6679:
		case 3526: case 3508:
			doWhat = 'equip'; break;

		case  486: case 458: case 1916:											// talisman o' nam, spookyraven's specs.
			doWhat = 'equipacc'; break;

		case   69: case  438: case  440: case  678: case  829:					// various items and campground gear... RCM again?
		case 1274: case 1622: case 1650: case 1794: case 1963: case 2258:
		case 2344: case 2345: case 2346: case 2655: case 2660: case 2950:
		case 2963: case 2964: case 2965: case 3353:
		case 3808:																//mer-kin trailmap
			doWhat = 'oneuse'; break;

		case  146:																// dinghy plans
			SetCharData("insults","0;0;0;0;0;0;0;0");
			doWhat = 'oneuse'; break;

		case   55: case 1445: case 1446: case 1447: case 1448: case 1449:		// pepper and nuggets.
			doWhat = 'cook'; break;

		case 247:																// fermenting powder.
			doWhat = 'cocktail'; break;

		case   74: case   75: case   76:										// spooky temple stuff
			itemNum = 74; doWhat = 'oneuse'; break;

		case  275: case  191: case  313: case 1244: case 1245:	case 675:		// larva, boss bat bandana, KGKing items, dagon skull,
		case 2334: case	2766: case  2829:										// MacGuffin, solid gold bowling ball, really dense meat stack
			addWhere.append(AppendLink('[council]','council.php',false)); break;

		case   32: case   50: case   54: case   57: case   60: case   68: 		// EWs
		case 2556: case 2557: case 2558: case 2559: case 2560: case 2561: 		// LEWs
		case  150: case  151: case  152: case  153: case  154: case  155:		// Epic Hats
		case 4504: case 3291:													// heart of volcano, secret tropical map
			addWhere.append(AppendLink('[take to guild]','guild.php?place=scg')); break;
		case 2550: case 2551: case 2552: case 2553: case 2554: case 2555:		// LEW parts
			addWhere.append(AppendLink('[smith]','craft.php?mode=smith')); break;
		case 454: 																// rusty screwdriver
			addWhere.append(AppendLink('[untinker]',to_place('forestvillage&action=fv_untinker'))); break;

		case 134: 																// bitchin' meatcar
			addWhere.append(AppendLink('[guild]','guild.php?place=paco')); break;

		case  459: case  460: case  461: case  462: case  463:					// pixels
			addWhere.append(AppendLink('[mystic]',to_place('forestvillage&action=fv_mystic'))); break;

		case  535: 																// bridge
			addWhere.append(AppendLink('[chasm]',to_place('orc_chasm&action=bridge0'))); break;

		case  602: 																// Degrassi Knoll shopping list
			if (GetCharData("friendlyknoll") == true) addWhere.append(AppendLink('[gnoll store]', "store.php?whichstore=4"));
			else addWhere.append(AppendLink('[Knoll]', to_place('knoll_hostile')));
			break;

		case  609:                                                              // S.O.C.K
            addWhere.append(AppendLink('[giant Basement (1)]',snarfblat(322))); break;

		case  727:	case 728: 													// Hedge maze puzzle piece/key
			addWhere.append(AppendLink('[maze]', 'hedgepuzzle.php', false)); break;

		case 1766:                                                              // ballroom key
            addWhere.append(AppendLink('[ballroom (1)]',snarfblat(109))); break;

		case 2267: 																// Mega Gem
			addWhere.append(AppendLink('[equip as acc2]', equip({i:2267,s:2})));
			break;

		case 2052: 																// Blackbird
			addWhere.append(AppendLink('[use map]',inv_use(2054))); break;

		case 2050: case 2051:													// bird parts
			addWhere.append(AppendLink('[bird]', 'craft.php?mode=combine' +
								'&action=craft&a=2050&b=2051&pwd=' + pwd +
								'&quantity=1')); break;

		case 2182: case 2183: 													// Harold's hammer parts
			addWhere.append(AppendLink('[make hammer]', 'craft.php?mode=combine' +
								 '&action=craft&a=2182&b=2183&pwd=' + pwd +
								 '&quantity=1')); break;
		case 2184: 																// harold's hammer
			addWhere.append(AppendLink('[give to Harold (1)]', snarfblat(112))); break;

		case 1549: 																// MSG
			addWhere.append(AppendLink('[bam!]', 'guild.php?place=wok')); break;

		case 2441: 																// KG encryption key
			addWhere.append(AppendLink('[use map]',inv_use(2442))); break;

		case 2277: 																// Fernswarthy's key
			if (place == 'adventure') addWhere.append(AppendLink('[visit guild]','guild.php?place=ocg'));
			else addWhere.append(AppendLink('[go to ruins]','fernruin.php'));
			break;

		case 2279: 																// Dusty Old Book
			addWhere.append(AppendLink('[take back to guild]','guild.php?place=ocg')); break;

		case 2326:																// stone rose
			addWhere.append(AppendLink('[Gnasir]',to_place('desertbeach&action=db_gnasir'))); break;

		case 3000: 																// Caronch's dentures
			addWhere.append(AppendLink("[equip swashbuckling pants]", equip({i:402}))); break;

		case 4668: 																// observational glasses
			addWhere.append(AppendLink("[visit Mourn]","pandamonium.php?action=mourn")); break;

		case   23: 																// gum
			if (weCameFrom('hermit') && path == "/store.php") {	// came to the store from the hermit?  use it automatically.
                if (itemQty > 3) itemQty = 3;
                var dourl = inv_use(23)+"&itemquantity="+itemQty+"&quantity="+itemQty+"&ajax=1";
                ajaxit(dourl);
			} else 	{
				addWhere.append(AppendLink('[use]', inv_use(23)+"&itemquantity="+itemQty+"&quantity="+itemQty));
			}
			break;

		case   42: 																// hermit permit
        case   43: case  44: case  45:                                          // worthless thingies
			if (weCameFrom('hermit') && path == "/store.php") {
				mainpane_goto('/hermit.php');
			} else {
				addWhere.append(AppendLink('[hermit]', 'hermit.php'));
			}
			break;

		case 1003: 																// soda water
			addWhere
				.append(AppendLink('[mix]', 'craft.php?mode=cocktail'))
				.append(AppendLink('[still]', 'guild.php?place=still'));
			break;

		case   40: 																// casino pass
			if (weCameFrom('casino') && path == "/store.php") {
				mainpane_goto('/casino.php');
			} else {
				addWhere.append(AppendLink('[casino]', 'casino.php'));
			}
			break;

		case  236: 																// cocktailcrafting kit
			if (weCameFrom('craft') && path == "/store.php") {		// bought via Mr. Script button? auto-use.
				mainpane_goto(inv_use(236) + '&bounce=craft.php?a=1');
			} else {
				doWhat = 'oneuse';
			}
			break;

		case  157: 																// E-Z cook oven
			if (weCameFrom('craft') && path == "/store.php") {		// bought via Mr. Script button?  auto-use.
				mainpane_goto(inv_use(157) + '&bounce=craft.php?a=1');
			} else {
				doWhat = 'oneuse';
			}
			break;

		case  530: 																// spray paint
			addWhere.append(AppendLink('[the wall]', 'town_grafwall.php')); break;

		case   24: 																// Clover
			addWhere.append(AppendLink('[disassemble]', 'multiuse.php?pwd='+ pwd +
							'&action=useitem&quantity=1&whichitem=24'));
			break;

		case  140: 																// dingy Planks
			addWhere.append(AppendLink('[boat]', inv_use(146)));
			break;

		case   47: 																// Roll
			addWhere
			.append(AppendLink('[casino]', 'casino.php'))
			.append(AppendLink('[rock+roll]', 'craft.php?mode=smith&' +
					'action=craft&a=47&b=30&pwd='+ pwd + '&quantity=1'));
			break;

		case   52: 																// banjo Strings
			addWhere.append(AppendLink('[twang]', 'craft.php?mode=smith&' +
							'action=craft&a=52&b=30&pwd='+ pwd +
							'&quantity=1'));
			break;

		case  135: case  136: 													// Rims, Tires
			addWhere.append(AppendLink('[wheels]','craft.php?mode=combine&' +
							'action=craft&a=135&b=136&pwd='+ pwd +
							'&quantity=1'));
			break;

		case 2044: 																// MacGuffin
			addWhere.append(AppendLink('[read]',"diary.php?textversion=1")); break;

		case  485: 																// snakehead charrrm: make talisman
			addWhere.append(AppendLink('[man, o nam]', 'craft.php?mode=combine&' +
							'action=craft&a=485&b=485&pwd='+ pwd +
							'&quantity=1'));
			break;

		case 2338: 																// Black Pudding
			addWhere.append(AppendLink('[eat]','inv_eat.php?pwd='+ pwd +
							'&which=1&whichitem='+itemNum)); break;
		case 2054:                                                              // black market map
			//add link to switch to blackbird or crow
			addWhere.append(AppendLink('[switch to blackbird]','familiar.php?action=newfam&newfam=59'));
				break;

		case 2064: 																// Forged documents
			addWhere.append(AppendLink('[shore]',to_place('desertbeach'))); break;
		case 2266:							                                    // wet stunt nut stew
			addWhere.append(AppendLink('[visit Mr. Alarm]',to_place('palindome&action=pal_mroffice'))); break;
		case 2347:	                                                            //heart of the filthworm queen
			addWhere.append(AppendLink('[turn it in!]','bigisland.php?place=orchard&action=stand&pwd='+pwd)); break;
		case 3471:                                                              // damp old boot
			addWhere.append(AppendLink('[old man, see?]','oldman.php')); break;
		case 4621: 																// Game Grid Token
			addWhere.append(AppendLink('[arcade]','arcade.php')); break;

		case 450: 	case 451: 	case 1258:										// Pretentious artist's stuff
			addWhere.append(AppendLink('[artiste]',to_place('town_wrong&action=townwrong_artist_quest'))); break;

		case 4961:  case 4948: 	case 4949: 	case 4950:							// subject 37 file, GOTO, weremoose spit, abominable blubber
			addWhere.append(AppendLink('[visit 37]','cobbsknob.php?level=3&action=cell37')); break;
		case 5193:	case 5194:													// 11-inch knob sausage, exorcised sandwich
			addWhere.append(AppendLink('[back to the guild]','guild.php?place=challenge')); break;
		case 5221:                                                              // fat loot token
			addWhere.append(AppendLink('[spend it!]','shop.php?whichshop=damachine',false)); break;
		case 1764:												                // spookyraven library key
			addWhere.append(AppendLink('[library (1)]',snarfblat(104))); break;
		case 5570:                                                              // ninja carabiner
			addWhere.append(AppendLink('[Open the Peak!]',to_place('mclargehuge&action=cloudypeak'))); break;
		case 5571:
			addWhere.append(AppendLink('[visit the John]',to_place('mclargehuge&action=trappercabin'))); break;
		case 5690:                                                              // bugbear invasion: goldblum larva
			addWhere.append(AppendLink('[mothership!]',to_place('bugbearship&action=bb_bridge'))); break;
		case 5782:  case 5783:  case 5784:  case 5785:  case 5786:  case 5787:  // smut orc building materials
			addWhere.append(AppendLink('[build!]',to_place('orc_chasm&action=bridge'))); break;
		case 6693:  case 6694:                                                  // McClusky file, page 5, binder clip
			addWhere.append(AppendLink('[bind!]',inv_use(6694))); break;
		case 7179:  case 7182:  case 7184:                                      // First Pizza, Stankara Stone, Shield of Brook
			addWhere.append(AppendLink('[Copperhead Club (1)]',snarfblat(383))); break;
		case 7185: case 7178:                                                   // copperhead charms
			addWhere.append(AppendLink('[man, o nam]', 'craft.php?mode=combine&' +
								'action=craft&a=7185&b=7178&pwd='+ pwd +
								'&qty=1'));
			break;
		case 7262: case 7270:                                                   // I Love Me, 2 Love Me
			doWhat = "oneuse";
			//addWhere.append(AppendLink('[The Dr is In!]',to_place('palindome&action=pal_droffice'))); break;
		case 4029:		                                                        // Hyboria: memory of a grappling hook
			if (GetCharData("Krakrox") == "A") {
				SetCharData("Krakrox","B");
			} else {
				SetCharData("Krakrox","F");
			}
			break;
		case 4032:		// Hyboria: memory of half a stone circle
			SetCharData("Krakrox","D"); break;
		case 4034:		// Hyboria: memory of an iron key
			SetCharData("Krakrox","G"); break;
		case 4030:		// Hyboria: memory of a small stone block
			SetCharData("Krakrox","I"); break;
		case 4031:		// Hyboria: memory of a little stone block
			SetCharData("Krakrox","K"); break;
		case 4033:		// Hyboria: memoryof a stone half-circle
			SetCharData("Krakrox","M"); break;

	}

	switch (doWhat) {
		case "equip":
			addWhere.append(AppendLink('[equip]', equip({i:itemNum})));
			break;

		case "equipacc":
			addWhere.append(AppendLink('[equip]', equip({i:itemNum,s:3})));
			break;

		case "oneuse":
			addWhere.append(AppendLink('[use]',inv_use(itemNum)));
			break;

		case "use":
			if (formWhere != null) {
			//	AppendUseBox(itemNum, 0, 0, formWhere.get(0));	//need to replace this function....
			} else {
				addWhere.append(AppendLink('[use]', 'multiuse.php?pwd=' +
					pwd + '&action=useitem&quantity=1&whichitem='+itemNum));
			}
			break;

		case "skill":
			if (formWhere != null) {
			//	AppendUseBox(itemNum, 1, 1, formWhere.get(0));
			} else {
				addWhere.append(AppendLink('[use]', 'inv_use.php?pwd='+ pwd +
					'&action=useitem&bounce=skills.php?action=useditem&itemquantity=1&whichitem='+
					itemNum));
			}
		break;

		case "malus":
			addWhere.append(AppendLink('[malus]', 'guild.php?place=malus'));
			break;

		default:
			if (doWhat) {
				addWhere.append(AppendLink('['+ doWhat +']', doWhat+'.php'));
			}
	}

	return doWhat;
}

// RIGHTCLICKMP: Fill up with standard restoratives.
function RightClickMP(e) {
	var json = GetCharData("mplist");
	if (json != undefined && json != "") {
		var num = 0;
		var quant = 0;
		var list = $.parseJSON(json);
		if 	(list['518'])  num = "518";	// MMJ
		else if (list['344'])  num = "344";	// KG seltzer
		else if (list['2639']) num = "2639";// BCSoda
		else if (list['1658']) num = "1658";// Cherry Cloaca
		else if (list['1659']) num = "1659";// Diet Cloaca
		else if (list['1660']) num = "1660";// Regular Cloaca
		if (num > 0) {
			quant = FindMaxQuantity(integer(num), list[num], 0, GetPref("safemax"));
			var url = server + 'inv_use.php?pwd='+ pwd +
				'&action=useitem&bounce=skills.php?action=useditem&itemquantity='+quant+'&whichitem='+num;
			GM_get(url, function(result)
				{	document.location.reload(); });
		}
	}
	e.stopPropagation(); e.preventDefault(); return false;
}

// RIGHTCLICKHP: Heal up with spells.
function RightClickHP(e) {
	var json = GetCharData("hplist");
	if (json != undefined && json != "") {
		var num = 0;
		var quant = 0;
		var list = $.parseJSON(json);
		var order;
		var heal = GetCharData("maxHP") - GetCharData("currentHP");

		if (heal == 0) {
			GM_log("no healing needed.");
			return;
		}
		if (heal < 20) order = ['3009','5007','1007','1010','5011','3012'];
		else if (heal < 35) order = ['1010','5011','3012','3009','5007','1007'];
		else if (heal < 45) order = ['5011','1010','3012','3009','5007','1007'];
		else order = ['3012','5011','1010','3009','5007','1007'];

		for(i=0; i<6; i++) if (list[order[i]]) { num = order[i]; break; }
		if (num > 0) {
			var url = server+'skills.php?action=Skillz&whichskill='+num+"&quantity="+1+'&pwd='+pwd;
			GM_get(url, function(result) {
				document.location.reload();
			});
		}
	}
	e.stopPropagation(); e.preventDefault(); return false;
}

// PARSESELECTQUANTITY: Figure out how many of a given restorative are present.
function ParseSelectQuantity(selectItem, endToken) {
	var index = selectItem.selectedIndex;
	var howMany = 1;
	if (selectItem.options[index].textContent.indexOf("(") != -1) {
		howMany = selectItem.options[index].textContent;
		if (howMany.charAt(0) == '(') return 999999;
		howMany = howMany.split("(")[1];
		howMany = howMany.split(endToken)[0];
	}
	return integer(howMany);
}

// MAKEMAXBUTTON: Wrap a "max" button around a text box.
function MakeMaxButton(textField, maxfunction) {
	var img = document.createElement('img');
	var table = document.createElement('table');
	var tr = document.createElement('tr');
	var td1 = document.createElement('td');
	var td2 = document.createElement('td');
	var stizzyle = 'border: 1px solid black; border-left: 0px; padding: 0px;';

	$(img).attr('src', 'data:image/gif;base64,R0lGODlhCQAQAPAAMf%2F%2F%2FwAAACwA' +
						'AAAACQAQAAACGgSCaGvB7d6KM1HJLHa3nZxg2%2FRwo2RmJFAAADs%3D')

	.click(maxfunction)

	.mousedown(function() {
		$(this).parent().attr('style',
		"background-color:#999999; " + stizzyle);
	})

	.mouseup(function() {
		$(this).parent().attr('style', "background-color:#ffffff; " + stizzyle);
	});

	// I am a horrible, horrible hack. If anyone knows how to make it
	// impossible to drag the max image into the text box, I'm all ears.
	$(textField)
		.attr('style','border: none;')
		.before(table)
		.mouseover(function() {
			if (this.value.length > 5) this.value = "1";
		});

	$(table)
		.attr('style', 'display: inline; vertical-align: bottom; ' +
			'border-spacing: 0px; padding: 0;')
		.append(tr);
	$(tr)
		.append(td1)
		.append(td2);
	$(td1)
		.attr('style', 'border: 1px solid black; padding: 1px;')
		.append(textField);
	$(td2)
		.attr('style', stizzyle)
		.append(img);
}

// SKILLUSELIMIT: Calculate how many times various skills should be cast.
function SkillUseLimit(skillNum) {
	var limit = 999999; var min = 0; var max = 0;
	var safeLevel = GetPref('safemax');
	switch(integer(skillNum)) {
		case 8000: case 8001: case 8002: limit = 3; break;	// 3 Tomes maximum.
		case 3012: limit = 1;  break;						// Cannelloni Cocoon
		case 8200: case 8201: limit = 1; break;				// Grimoires
		case 45:   case 53: limit = 1; break;				// vent rage gland, summon crimbo candy
		case 3006: case 4006: case 5014: limit = 5; break;	// summon noodles, reagents, garnishes
		case 3009: min=10; max=30; break;					// lasagna bandages
		case 1007: min=10; max=20; break;					// tongue of the otter
		case 1010: min=30; max=40; break;					// tongue of the walrus
		case 5011: min=40; max=40; break;					// disco power nap
		case 5007: min=20; max=20; break;					// disco nap
		case 6020: case 6021: case 6022:
		case 6023: case 6024: case 6025: limit = 10; break;	// AT Hobo skills
		case 6026: limit = 50; break;						// AT Sea skill
		case 6028: limit = 5; break;						// AT Trader skill (Inigo's)
	}
	if (max != 0) {
		var hp = GetCharData("maxHP") - GetCharData("currentHP");
		switch(safeLevel) {
			case 0: limit = integer(0.5+hp/((min+max)/2.0)); break;
			case 1: limit = integer(0.5+hp/(((max*2)+min)/3.0)); break;
			case 2: limit = integer(0.5+hp/max); break;
		}
	}
	return limit;
}

// ONFOCUS: Make text input boxes clear on focus
function AddAutoClear(box, setting) {
	if (setting == 2) {
		$(box)
			.attr('onFocus', 'this.select();')
			.attr('onClick', 'this.select();')
			.attr('OnDblClick', 'this.select();');
	} else if (setting == 1) {
		$(box)
			.attr('onFocus', 'if (this.value==1) this.value="";')
			.attr('onClick', 'if (this.value==1) this.value="";')
			.attr('onBlur',  'if (this.value=="") this.value=1;');
	}
}

// DEFAULTS: Pay no attention to the function behind the curtain.
function Defaults(revert) {
	var basePrefs = [["splitinv",1],
			 ["splitquest",1],
			 ["splitmsg",0],
			 ["outfitmenu",1],
			 ["shortlinks",3],
			 ["autoclear",1],
		   	 ['toprow', 1],
		   	 ['safemax', 1],
		   	 ['moveqs', 2],
		   	 ['logout', 1],
		   	 ['zonespoil', 1],
		   	 ['klaw', 1],
		  	 ['quickequip', 0],
		  	 ['nodisable', 0],
		   	 ['docuse', 0],
		   	 ['swordguy', 'skills.php'],
		   	 ['backup', 'Backup'],
		   	 ['telescope', 1],
		  	 ['lairspoil', 1],
		 	 ['moonslink', 1],
			 ['malllink', 1],
			 ['ascension_list','cooked key pies, exploded chef, exploded bartender, discarded karma, bought a skill'],
             ['compressfam', 0],
             ['questbottom', 0],
			 ['inlineitemdesc', 1],
             ['monsterlinks',1],
             ['choicelinks',1]
			];
	var menu1 = ['market;town_market.php','hermit;hermit.php',
		'untinker;place.php?whichplace=forestvillage&action=fv_untinker',
		'mystic;place.php?whichplace=forestvillage&action=fv_mystic',
		'hunter;bhh.php',
		'guildstore',
		'general;store.php?whichstore=m',
		'doc;galaktik.php',
		'lab;cobbsknob.php?action=dispensary',
		'fruit;store.php?whichstore=h'];

	var menu2 = ['buy;mall.php',
		'trade;makeoffer.php',
		'sell;managestore.php',
		'collection;managecollection.php',
		'closet;closet.php',
		'hagnk\'s;storage.php',
		'attack;pvp.php',
		'wiki;http://kol.coldfront.net/thekolwiki/index.php/Main_Page',
		'calendar;http://noblesse-oblige.org/calendar',
		 ';'];
	var i;

	if (revert == 0) {
		for (i = 0; i < basePrefs.length; i++)	{ if (GetPref(basePrefs[i][0]) == undefined) SetPref(basePrefs[i][0], basePrefs[i][1]) }
		for (i = 0; i < menu1.length; i++) 	{ if (GetPref("menu1link"+i) == undefined) SetPref("menu1link"+i,menu1[i]) }
		for (i = 0; i < menu2.length; i++) 	{ if (GetPref("menu2link"+i) == undefined) SetPref("menu2link"+i,menu2[i]) }
	}
	else if (revert == 1) { for (i = 0; i < menu1.length; i++) { SetPref("menu1link"+i,menu1[i]) } }
	else if (revert == 2) { for (i = 0; i < menu2.length; i++) { SetPref("menu2link"+i,menu2[i]) } }
}

// ADDTOPOPTION: Add a menu option in compact mode.
function AddTopOption(name, url, select, putBefore) {
	var option = document.createElement('option');
	option.innerHTML = name; option.value = url;
	if (putBefore == 0) select.appendChild(option);
	else select.insertBefore(option, putBefore);
}

// MAKEOPTION: Does what it says. Yup.
// text == label for the option.  (human-readable description)
// num = number of options to make.  Negative -> create a text input box instead of listbox.
//		-1: create straight up input box.
//		-2: create 2 input boxes, first one as label, second as value.
// pref = name of GM flag that this option is setting.
// opt1, opt2 = labels of first 2 options to create.  (options beyond 2 must be created manually after calling this routine.)
function MakeOption(text, num, pref, opt1, opt2) {
	var table = document.createElement('table');
	var tr = document.createElement('tr');
	var td = document.createElement('td');
	var prefVal = GetPref(pref);
	var select;

	var selectid = "_mrscript_opt_"+pref.replace(" ", "_");

	if (num == -2) td.innerHTML = "<input style='font-size:11px;width:70px;' name=" + pref +
	"tag maxlength=16 type=text class=text value=" + text + ">";
	else td.innerHTML = "<span style='font-size:12px;padding-right:3px;'>" +
						"<label style=\"display:inline;\" for=\""+selectid+"\">" + text + "</label></span>";
	if (num == -1) td.setAttribute('width','50%');
	else if (num == -2) td.setAttribute('width','30%');
	else td.setAttribute('width','65%');
	td.setAttribute('align','right');
	tr.appendChild(td);

	td = document.createElement('td');
	if (num < 0) {
		select = document.createElement('input');
		select.setAttribute("id", selectid);
		select.setAttribute('type','text');
		select.setAttribute('class','text');
		select.setAttribute('maxlength','256');
		if (num == -2) {
			var preflink = prefVal.split(';')[1];
			if (preflink != undefined) select.setAttribute('value', preflink);
			else select.setAttribute('value', '');
		}
		else select.setAttribute('value', prefVal);
	} else {
		select = document.createElement('select');
		select.setAttribute("id", selectid);
		for (var i=0; i<num; i++) {
			var option = document.createElement('option');
			if (i == prefVal) option.setAttribute('selected',1);
			option.value = i; select.appendChild(option);
			if (i == 0 && opt1 != 0) option.innerHTML = opt1;
			if (i == 1 && opt2 != 0) option.innerHTML = opt2;
		}
	}
	select.setAttribute('style','width:95%;font-size:11px;');
	select.setAttribute('name',pref);
	if (num > -2) select.addEventListener('change', function(event)
	{
		if (this.selectedIndex != undefined) SetPref(this.name, this.selectedIndex);
		else SetPref(this.name, this.value);
		switch(this.name)	// changing a setting affecting topmenu?  reload it now.
		{
			case 'shortlinks':
			case 'splitinv':
			case 'moveqs':
			case 'swordguy':
			case 'logout':
			case 'splitquest':
			case 'splitmsg':
				top.frames[0].location.reload(); break;
		}
	}, true);
	td.appendChild(select);
	tr.appendChild(td);
	table.setAttribute('width','280');
	table.setAttribute('align','center');
	table.appendChild(tr);

	return table;
}

// ADDTOTOPOFMAIN: insert an element at the top of the main frame, but under the combat bar if present.
// function yoinked from JHunz's island management thingy
function AddToTopOfMain(newElement,refDocument) {
	var fightElement = refDocument.evaluate('//b[contains(.,"Combat") and contains(.,"!")]/ancestor::tr[1]',refDocument,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	if (fightElement) {
		fightElement.parentNode.insertBefore(newElement,fightElement);
	} else {
		var element = refDocument.getElementsByTagName("tr")[0];
		if (element && element.parentNode) {
			element.parentNode.insertBefore(newElement,element);
		}
	}
}

// INLINEITEMDESCRIPTIONS: Because window.open makes baby Jesus cry
function InlineItemDescriptions() {

	if(GetPref("inlineitemdesc") == 0) return;

	$("img[width=30][onclick*='descitem(']").addClass("hand");

	document.addEventListener("click", function(e) {

		if(e.target.tagName === "IMG") {

			if(e.shiftKey || e.altKey || e.metaKey || e.button === 2) return true;

			var $img = $(e.target);
			window.$img = $img;
			var onclick = $img.attr("onclick");
			var regex = false;
			var which = false;
			if(onclick) {
				if(onclick.indexOf("descitem(") !== -1) {
					which = 'item';
					regex = /descitem\(\"?([a-z0-9\-_]*)/;
				}
				else if(onclick.indexOf("eff(") !== -1) {
					which = 'effect';
					regex = /eff\(\"?([a-z0-9\-_]*)/;
				}
			}

			if(regex) {

				var item = onclick.match(regex)[1];
				if(!item) return true;

				var $body = $("body");
				var pos = $img.position();
				var x = pos.left - - 15 - 150;
				var y = pos.top  - - 15;

				if(!window.$overlay) {
					window.$overlay = $('<div id="_descitem_overlay"></div>')
						.css({
							"background": "transparent",
							"position": "fixed",
							"top": 0,
							"bottom": 0,
							"left": 0,
							"right": 0,
							"zIndex": "100"
						});

					window.$overlay.on("click", function(e) {
						window.$overlay.hide();
						var $desc = $("._descitem");
						$desc.css({"transform": "scale(0.1)"});
						setTimeout(function(){ $desc.remove(); }, 120);
					});

					$(document).on("keyup.descitem", function(e) {
						if(e.keyCode == 27) window.$overlay.triggerHandler("click");
						$(document).off("keyup.descitem");
					});

					$body
						.append('<style type="text/css">'
							+'img.hand {position:relative; top:0; left:0; z-index: 200;}'
							+'#pop_ircm {z-index: 300;}</style>')
						.append(window.$overlay[0]);
				}

				window.$overlay.triggerHandler("click");

				var $desc = $('<div class="_descitem"></div>')
					.css({
						"background": "white",
						"border": "1px solid black",
						"paddingTop": 10,
						"boxShadow": "0 0 3px gray",
						"display": "none",
						"position": "absolute",
						"overflow": "auto",
						"maxHeight": 450,
						"width": 300,
						"zIndex": "300",
						"transform": "scale(0.1)",
						"transition": "transform linear 120ms"
					});
				$body.append($desc[0]);

				var url = '/desc_'+which+'.php?which'+which+'='+item;
				GM_get(server+url, function(html) {

					if(which == "item") {
						var start = html.indexOf('<center>');
						var end	= html.lastIndexOf('</blockquote>');

						$desc
							.html(html.slice(start, end - - 13))
							.css({"top": y, "left": parseInt(x), "display": "block" });
						$desc
							.children("blockquote")
							.css("margin", "15px");
					}

					else if(which == "effect") {
						var start = html.indexOf('<font');
						var end	= html.lastIndexOf('</font>');

						$desc
							.html(html.slice(start, end - - 7))
							.css({"top": y, "left": parseInt(x), "display": "block" });

						$desc
							.find("center:eq(1)")
							.css("marginBottom", "15px");
					}

					$desc.css({
						"top": y - ($desc.height() / 2),
						"opacity": 1,
						"transform": "scale(1)"
					})

					var $b = $desc.find("b:first");
					$b.wrap('<a href="http://kol.coldfront.net/thekolwiki/index.php/Special:'+
						'Search?search='+ $b.text().replace(/\s/g, '+').replace('"', '')+
						'&go=Go" target="_blank"></a>');

					$desc.find("a").each(function(n, el) {
						var $a = $(this);
						var url = $a.attr("href");

						if(url.indexOf("desc_effect") !== -1) {
							$a.attr("href", "javascript:void(0);");
							$a.on("click", function(e) {
								GM_get(server+url, function(html) {
									var start = html.indexOf('<font');
									var end	= html.lastIndexOf('</font>');
									$desc.html(html.slice(start, end - - 7));
									$desc.find("center:eq(1)").css("marginBottom", "15px");
								});
							});
						}

						else $a.attr("target", "_blank");
					});

					window.$overlay.show();

				}, function(err){  alert(err); });

				e.preventDefault();
				e.stopPropagation();

				return false;
			}
		}

		return true;

	}, true);
}


// MAIN.HTML: Resize top pane a bit and store password hash.
// was main_c
function at_main() {
	FindHash();
	setTimeout("if (top.frames[0].location == 'about:blank')" +
		 " top.frames[0].location = 'topmenu.php'", 1500);	// fix for top menu not always loading properly

	// n.b. the :eq(1) below is important because of the nested-table layout.  only select the inner TR.
	$('tr:contains("Noob."):eq(1)').append(AppendLink('[Toot]','tutorial.php?action=toot'));	// fresh from valhalla?  get things rolling.
	$('tr:contains("responded to a trade offer"):eq(1)').append(AppendLink('[trade]', 'makeoffer.php'));
	$('tr:contains("new announcement"):eq(1)').append(AppendLink('[go read it]', 'clan_hall.php'));

	var update = GetData("Update");
	if (update != '') {
		$('table:first').before(update);
		SetData("Update",'');
	}
// may also want to add a check for Funkslinging here.
}

// GAME: look for updates and post link if needed.
// n.b. game.php is the outermost, non-frame window that contains all the frames.
// 	as such, the script only sees it exactly once, when you're logging in.
function at_game() {
	var lastUpdated = integer(GM_getValue('MrScriptLastUpdate', 0));
	var currentHours = integer(new Date().getTime()/3600000);

	// reload topmenu exactly once after charpane has finished processing:
	setTimeout('top.frames[0].location.reload();',2000);

	// If over X hours, check for updates
	if ((currentHours - lastUpdated) > 6)
	{
	GM_get("noblesse-oblige.org/hellion/scripts/MrScript.version.json",
		function(txt)
		{	txt = txt.replace(/\n/,'');		// strip carriage returns so that eval() doesn't blow up
			var json = $.parseJSON(txt);
			if (!json.version) return;
			var vnum = json.version.replace(/\./g, "");	// strip points: 1.4.3 => 143.
			if (!vnum) return;
			if (integer(vnum) <= VERSION)		// number returned via lookup is not newer than what this script says it is...
			{	persist('MrScriptLastUpdate',
					integer(new Date().getTime()/3600000)); return;
			}
			// If we're still here, then we need an update link.
			var html =
				'<div style="font-size:14px;text-decoration:none;text-align:center;">' +
				'Mr. Script v' + json.version + ' is available!<br /><br />' +
				'<a href="' + json.url1 + '" target="_blank">';
			if (json.url2 && json.url2.length > 0) {
				html +=
				'Uncompressed</a>&nbsp;&nbsp;&nbsp;&nbsp;<b>OR</b>' +
				'&nbsp;&nbsp;&nbsp;&nbsp;<a href="' + json.url2 +
				'" target="_blank">Minified</a>&nbsp;&nbsp;<span style="font-size:10px;"></span><br />';
			} else {
				html += 'Update</a><br />';
			}
			html += (json.desc ?
			'<p style="margin:0 auto; text-align:left; font-size:10px;">'+
			json.desc+'</p>' : '<br />') + '</div>';
			SetData("Update",html);
		});
	}
}

function at_bedazzle() {
	dropped_item();
}

function setItem(sel, itemName) {
	for (var i=1; i < sel.options.length; i++) {
		if (sel.options[i].text.indexOf(itemName) != -1) {
			sel.options.selectedIndex = i;
			break;
		}
	}
}

// FIGHT: special processing for certain critters
function at_fight() {

	InlineItemDescriptions();

// code for NS Lair spoilers borrowed shamelessly from Tard's NS Trainer v0.8
	// monster name:[preferred combat item, funkslinging item, is this lair-spoilery, special treatment flag]
	// special treatment: 0=nothing; 1=any gremlin; 2=non-tool gremlin; 3=hidden city; 4=pirate insults.
	var MonsterArray = {
	"a Beer Batter":            ["baseball","",1,0],
	"a best-selling novelist":  ["plot hole","",1,0],
	"a Big Meat Golem":         ["meat vortex","",1,0],
	"a Bowling Cricket":        ["sonar-in-a-biscuit","",1,0],
	"a Bronze Chef":            ["leftovers of indeterminate origin","",1,0],
	"a collapsed mineshaft golem":["stick of dynamite","",1,0],
	"a concert pianist":        ["Knob Goblin firecracker","",1,0],
	"the darkness":             ["inkwell","",1,0],
	" El Diablo":               ["mariachi G-string","",1,0],		// note: leading space is very important.  do not remove it.
	"an Electron Submarine":    ["photoprotoneutron torpedo","",1,0],
	"an endangered inflatable white tiger":["pygmy blowgun","",1,0],
	"an Enraged Cow":           ["barbed-wire fence","",1,0],
	"a fancy bath slug":        ["fancy bath salts","",1,0],
	"the Fickle Finger of F8":  ["razor-sharp can lid","",1,0],
	"a Flaming Samurai":        ["frigid ninja stars","",1,0],
	"a giant bee":              ["tropical orchid","",1,0],
	"a giant fried egg":        ["black pepper","",1,0],
	"a Giant Desktop Globe":    ["NG (","",1,0],
	"an Ice Cube":              ["hair spray","",1,0],
	"a malevolent crop circle": ["bronzed locust","",1,0],
	"a possessed pipe-organ":   ["powdered organs","",1,0],
	"a Pretty Fly":             ["spider web","",1,0],
	"a Tyrannosaurus Tex":      ["chaos butterfly","",1,0],
	"a Vicious Easel":          ["disease","",1,0],
	"The Guy Made Of Bees":     ["antique hand mirror","",0,0],
	"an erudite gremlin":       ["band flyers","molybdenum magnet",0,1],
	"a vegetable gremlin":      ["band flyers","molybdenum magnet",0,1],
	"an A.M.C. gremlin":        ["band flyers","",0,1],
	"a spider gremlin":         ["band flyers","molybdenum magnet",0,1],
	"a batwinged gremlin":      ["band flyers","molybdenum magnet",0,1],
	" Ed the Undying":          ["band flyers","",0,0],
	"a clingy pirate":          ["cocktail napkin","",0,0],
	"a sassy pirate":           ["The Big Book of Pirate Insults","",0,4],
	"a shady pirate":           ["The Big Book of Pirate Insults","",0,4],
	"a shifty pirate":          ["The Big Book of Pirate Insults","",0,4],
	"a smarmy pirate":          ["The Big Book of Pirate Insults","",0,4],
	"a swarthy pirate":         ["The Big Book of Pirate Insults","",0,4],
	"a tetchy pirate":          ["The Big Book of Pirate Insults","",0,4],
	"a toothy pirate":          ["The Big Book of Pirate Insults","",0,4],
	"a tipsy pirate":           ["The Big Book of Pirate Insults","",0,4]
	};

	var $monster = $("#monname");
	var monsterName = $monster.text();
	var monsterNameShort = monsterName.replace(/^an?\s/, '');
	var infight = GetCharData("infight");

    if (GetPref("monsterlinks") == 1) {
    	$monster.html(' <a href="http://kol.coldfront.net/thekolwiki/index.php/'+
	    	'Special:Search?search='+ monsterNameShort.replace(/\s/g, '+').replace('"', '')+
    		'&go=Go" target="_blank">'+monsterName+'</a>');
    }
	// fix the ugly new Hell Ion image...
	if (monsterName == "a Hellion") {
		$('#monpic')
			.attr("src","http://images.kingdomofloathing.com/otherimages/customavatars/250730.gif")
			.attr("width",60).attr("height",100);
	} else if (monsterName == "The Guy Made Of Bees") {
		SetCharData("saidbeeguy",0);
	}


	// always process the pirate insult book if it's in the combat item list:
	$('option[value="2947"]').each(function(){
		var insultsList = GetCharData("insults"); if (insultsList == undefined) insultsList = "0;0;0;0;0;0;0;0";
		var insultsArray = insultsList.split(";");
		var numInsults = 0;
		for (var i = 0; i < insultsArray.length; i++) {
			numInsults += integer(insultsArray[i]);
		}
		var bookname = $(this).text();
		bookname = bookname.replace("Insults","Insults["+numInsults+"/8]");
		$(this).text(bookname);
	});

// PART 1: FIRST-ROUND STUFF
	if (infight != "Y") {	// first time through this particular fight?
		SetCharData("infight","Y");
		SetCharData("special",0);	// defensive clearing in case it got left set somehow.
		var monsterItem = MonsterArray[monsterName];
		if (monsterItem != undefined && GetPref('lairspoil') != 1 && monsterItem[2] == 1) return;	// found something, spoilers are off, and this is a spoilery monster?
		if (monsterItem != undefined) {	// let's do something specific with this critter.
			var dropdown = document.getElementsByName('whichitem');
			if (dropdown.length) setItem(dropdown[0], monsterItem[0]);
			if (monsterItem[1] != "") {	// is there a funkslinging preference given?
				dropdown = document.getElementsByName('whichitem2');
				if (dropdown.length) setItem(dropdown[0], monsterItem[1]);
			}
			// n.b. we set this in a separate long-term variable so that we can tweak it mid-fight if needed.
			SetCharData("special",monsterItem[3]);
		}
	}
// PART 2: SPECIAL-PROCESS STUFF
	if (GetCharData("special") != 0) {	// in a fight with something special?
		switch (GetCharData("special"))
		{
			case 1:	// gremlins
				ProcessGremlinCombat(monsterName);
			break;

			case 2: // gremlins that we know don't have the tool:
				var tr = document.createElement('tr');
				tr.innerHTML = '<tr><td><div style="color: red;font-size: 100%;width: 100%;text-align:center">' +
								'<b>SMACK THE LITTLE BUGGER DOWN!</b></div></td></tr>';
				AddToTopOfMain(tr, document);
			break;
			//case 3 used to be for the hidden city when we needed to figure out what sphere was for what altar.

			case 4: // insulting pirates:
				ProcessPirateInsults();
				break;
			default:
			break;
		}
	}

// PART 3: LAST-ROUND STUFF
	// post-win processing:
	if (/WINWINW/.test(document.body.innerHTML)) {
		SetCharData("infight","N");
		SetCharData("special",0);
		var square=GetCharData("square");
		SetCharData("square",false);
		//special: friar check:
		if (GetCharData("hasflorist") === true) {
			if ($('img[src*=friarplant]').length == 0) {
				$('#monpic').parent().parent()
					.append('<td><a href="'+to_place('forestvillage&action=fv_friar')+'">Flower Power!</a></td>');
			}
		}
		// Location-specific stuff:
		if (square) {
			CheckLocation(square);
		}
		// Monster-specific stuff:
		switch (monsterName) {
		case "a skeletal sommelier":
		case "a possessed wine rack":
			ProcessWineCellarDrops();
			break;
		case " Dr. Awkward":
			$("p:contains('Adventure')").html('<a href="inventory.php?which=2"><font size="4">CLICK HERE TO CHANGE YOUR GEAR</font></a>');
			$("p:contains('Go back to')").html('');
			break;
		case "Groar":
			$("<center><p><a href='place.php?whichplace=mclargehuge&action=trappercabin'>Back to the Trapper</a></p></center><br />").prependTo($("p:contains['McLargeHuge']"));
			break;
		case "a dirty thieving brigand":
			ProcessNunMeatDrops();
			break;
		case "a giant bird-creature":
			SetCharData("Krakrox","C");
			break;
		case "a giant octopus":
			SetCharData("Krakrox","E");
			break;
		case "a giant spider":
			SetCharData("Krakrox","H");
			break;
		case "a giant jungle python":
			SetCharData("Krakrox","J");
			break;
		case "a wild seahorse":
			$('<center><a href="seafloor.php?action=currents">Go to Mer-Kin DeepCity</a></center><br><br>')
				.prependTo($("p:contains('Adventure')"));
			break;
		}
		showYoinks(true);
		dropped_item();
	}
	// post-loss processing:
	else if (	/>Go back to/.test(document.body.innerHTML) ||
				/You lose.  You slink away,/.test(document.body.innerHTML) ||
				/You run away, like a sissy/.test(document.body.innerHTML)
				) {
		SetCharData("infight","N");
		SetCharData("special",0);
		SetCharData("square",false);
		showYoinks(false);
	}
// PART 4: ANY-ROUND STUFF
	// yoinked-item processing
	else if (document.body.innerHTML.indexOf(">You acquire an item: <") != -1) {
		var imgs = document.body.getElementsByTagName("img");
		for (var i = 0; i < imgs.length; i++)
		{
			var img = imgs[i];
			if (img.getAttribute("class") != "hand")
				continue;
			// nobody cares about toast, dammit
			if (img.getAttribute("onClick") == "descitem(931984879)")
				continue;
			// don't try to "yoink" things that aren't actually items.
			if (img.getAttribute("onClick").indexOf("descitem") == -1)
				continue;

			var text = img.parentNode.parentNode.parentNode.parentNode.parentNode.innerHTML;
			text = text.replace(/ acquire /, " yoinked ");

			var yoinked = GetCharData("yoink");
			if (yoinked == undefined) yoinked = "";
			SetCharData("yoink", yoinked + text);
			break;
		}
	}
}

function CheckLocation (square) {
	if (square.indexOf("cellar.php") != -1) {	// add "explore L/R/U/D" links
		link_cellar(square);
	} else {	// handling adventure.php?snarfblat=X options.
		var location = integer(square.match(/(\d+)/)[1]);	// the 185 in "adventure.php?snarfblat=185"
		switch (location)	{
			case 182:
			case 183:
			case 184:
			case 185:	// Junkyard: add onclick to "adventure again" link to tell ourselves where we are.
				$('a:contains("dventure")').click(function() {
					var a = $(this);
					SetCharData("square",a.attr('href'));
				});
			break;
		}
	}
}

function ProcessGremlinCombat(monsterName) {
	//	array = 		monster name:		  zone	has-item						doesnt-have-item
	var gremlininfo	= {	"a batwinged gremlin":[182, "whips out a hammer", 			"a bombing run over"],
						"a spider gremlin"	 :[183, "whips out a pair of pliers", 	"fibula with its mandibles"],
						"an erudite gremlin" :[184, "whips out a crescent wrench", 	"automatic eyeball-peeler"],
						"a vegetable gremlin":[185, "whips out a screwdriver", 		"off of itself and"],
						"an A.M.C. gremlin"  :[186, "blah blah hruugh", 			"an A.M.C. gremlin"]
					  };

	var zonetext = GetCharData("square");	// should have something like "adventure.php?snarfblat=182"
	var zone = zonetext ? integer(zonetext.match(/(\d+)/)[1]) : 0;

	// if the monster doesn't drop the item in this zone, or we see the "i-don't-have-it" message...
	if ((zone && (gremlininfo[monsterName][0] != zone)) ||
		(document.body.innerHTML.indexOf(gremlininfo[monsterName][2]) != -1)) { // gremlin showed the no-tool message?
		var tr = document.createElement('tr');
		tr.innerHTML = '<tr><td><div style="color: red;font-size: 100%;width: 100%;text-align:center">' +
						'<b>SMACK THE LITTLE BUGGER DOWN!</b></div></td></tr>';
		AddToTopOfMain(tr, document);
		SetCharData("special",2);	// mark them as non-tool gremlins.
	} else {								// the monster might drop the item.
		if (document.body.innerHTML.indexOf(gremlininfo[monsterName][1]) != -1) {	// and there it is!
			var tr = document.createElement('tr');
			tr.innerHTML = '<tr><td><div style="color: green;font-size: 100%;width: 100%;text-align:center">' +
							'<b>MAGNET IT NOW!</b></div></td></tr>';
			AddToTopOfMain(tr, document);

			var itemSelect = document.getElementsByName('whichitem');
			var funkSelect = document.getElementsByName('whichitem2');

			if (funkSelect.length) {	// default funk action: flyers + magnet
				setItem(itemSelect[0], "band flyer");
				setItem(funkSelect[0], "molybdenum magnet");
				if (itemSelect[0].options[itemSelect[0].selectedIndex].text.indexOf("band flyers") == -1) { // no flyers? just magnet.
					setItem(itemSelect[0], "molybdenum magnet");
					funkSelect[0].selectedIndex = 0;
				}
			} else {
				setItem(itemSelect[0], "molybdenum magnet");
			}
		} else {
			var tr = document.createElement('tr');
			tr.innerHTML = '<tr><td><div style="color: blue;font-size: 80%;width: 100%;text-align:center">' +
							'<b>Wait for it....</b></div></td></tr>';
			AddToTopOfMain(tr, document);
		}
	}
}

function ProcessNunMeatDrops() {
	//TODO: figure out how to find the right meatline between hobo monkey (shows up before nun meat)
	//      and Sneaky Pete's bike (shows up after nun meat).
	//      use 'first' below in an SP run, 'last' otherwise.
	var meatline = $("img[src*='meat.gif']:first").parent().next().text();	// should be "You gain X meat"
	var meat = integer(meatline.match(/You gain (\d+) Meat/)[1]);
	var meatSoFar = integer(GetCharData("nunmoney"));

	if ((meatSoFar == undefined) || isNaN(meatSoFar)) meatSoFar = 0;
	meatSoFar += meat;
	$("img[src*='meat.gif']:last").parent().next()
		.append("<font color='blue'>&nbsp;("+meatSoFar+" collected total).</font>");
	if (meatSoFar > 100000) meatSoFar = 0;
	SetCharData("nunmoney",meatSoFar);
}

function ProcessWineCellarDrops() {
	var winebits = {"Merlot":1,"Marsala":2,"Muscat":4,"Pinot Noir":8,"Port":16,"Zinfandel":32};
	var imgs = document.getElementsByTagName('img');
	if (imgs.length > 1) {		// image 0 is the monster pic.  anything else might be a drop.
		var dropcode = 0;
		for (var i=1; i<imgs.length;i++) {
			var itemname = imgs[i].getAttribute('alt');
			if (itemname && itemname.indexOf("dusty bottle of") != -1) {
				itemname = itemname.slice(16);
				dropcode |= winebits[itemname];
			}
		}
		// save info about what wines dropped for the wine location solver.
		if (dropcode != 0) {
			var cref = $('a[href*="snarfblat"]').attr("href");
			var corner = "corner" + cref.match(/snarfblat=(\d+)/)[1];
			var winesfound = GetCharData(corner);
			winesfound |= dropcode;
			SetCharData(corner, winesfound);
		}
	}
}

function ProcessPirateInsults() {
	var insultsList = GetCharData("insults"); if (insultsList == undefined) insultsList = "0;0;0;0;0;0;0;0";
	var insultsArray = insultsList.split(";");
	var numInsults = 0;
	var s = $('body').text();
	var insultText = [
		"neither your tongue nor your wit is sharp enough",
		"be any worse than the smell of your breath",
		"tell your wife and sister I had a lovely time",
		"yellow would be more your color",
		"comfortable being compared to your girlfriend",
		"honor to learn from such an expert in the field",
		"do you manage to shave without using a mirror",
		"only seems that way because you have"];
	for (var i = 0; i < 8; i++) {
		if (s.match(insultText[i])) {
			insultsArray[i] = 1;
			break;
		}
	}
	for (var i=0;i<insultsArray.length;i++) {
		numInsults += integer(insultsArray[i]);
	}
	insultsList = insultsArray.join(";");
	SetCharData("insults",insultsList);
	$('p:contains("Dang, man.")')
		.html("Dang, man.  That hurts.  <font color='blue'>("+numInsults+"/8 insults gathered.)</font>");
}

function link_cellar(square) {
	var thissq = square.match(/(\d+)/)[1]; // get number from "cellar.php?action=explore&whichspot=19"
	thissq = integer(thissq);
	var myhrefbase = "cellar.php?action=explore&whichspot=";
	var myhref = "";
	var UP = 8;
	var DOWN = 4;
	var LEFT = 2;
	var RIGHT = 1;
	var dtable=$('<table id="dirlinks"><tr>'+
					'<td id=ul>&nbsp;</td>'+
					'<td id=up><a>&nbsp;</a></td>'+
					'<td id=ur>&nbsp;</td></tr>'+
					'<tr><td id=left><a>&nbsp;</a></td>'+
					'<td id=c>&nbsp;</td>'+
					'<td id=right><a>&nbsp;</a></td></tr>'+
					'<tr><td id=bl>&nbsp;</td>'+
					'<td id=down><a>&nbsp;</a></td>'+
					'<td id=br>&nbsp;</td></tr></table>');

	// grid: 1 hex digit per square for each of the 25 squares.
	// 		8 = show UP link
	//		4 =      DOWN
	// 		2 =      LEFT
	//      1 = 	 RIGHT
	// plus a 0 at the front because Jick uses 1-based indexing for the tavern, the bastard.
	var grid = [0,5,7,7,6,0,13,15,15,15,6,13,15,15,15,14,13,15,15,15,14,9,11,11,11,10];
	var beenTo = GetCharData("squarelist") + ";" ;

	//get the square you land on if you move in direction D from square S.
	function move(s,d) {
		if (d == UP) s = s-5;
		if (d == DOWN) s = s+5;
		if (d == LEFT) s = s-1;
		if (d == RIGHT) s = s+1;
		return s;
	}

	//if we need to show a link for direction D from square S, return true.
	function check(s,d) {
		if (grid[s] & d) {	//if possible to move in that direction from here
			s = move(s,d);
			if (beenTo.indexOf(s + ";") == -1) { //and we haven't already visited that destination
				return true;
			} else {
				return false;
			}
		}
		else return false;
	}

	function cLink(s,d,t) {
		s = move(s, d);
		return "<a class=cellarlinker href='cellar.php?action=explore&whichspot="+s+"'>"+t+"</a>";
	}

	dtable.prependTo($('center:last')).hide();
	if (check(thissq,UP))  $('#up > a').replaceWith(cLink(thissq,UP,"Up"));
	if (check(thissq,DOWN)) $('#down > a').replaceWith(cLink(thissq,DOWN,"Down"));
	if (check(thissq,LEFT)) $('#left > a').replaceWith(cLink(thissq,LEFT,"Left"));
	if (check(thissq,RIGHT)) $('#right > a').replaceWith(cLink(thissq,RIGHT,"Right"));
	$('.cellarlinker').click(cellar_linker);
	dtable.show();
}

// SHOWYOINKS:  display pickpocketed items.
// Todo: figure out how to specify the correct placement via jquery....
function showYoinks(wonCombat) {
	var yoink = GetCharData("yoink");
	if (yoink == undefined) yoink = "";
	yoink = HTMLDecode(yoink);
	if (yoink != "") {
		SetCharData("yoink", "");
		var yoinkNode = document.createElement("table");
		yoinkNode.innerHTML = yoink;
		var rel = yoink.match(/rel="([^">]*)">/)[1];
		$(yoinkNode).attr('class','item').attr('style','float: none').attr('rel',rel);
		if (wonCombat) {
			var centers = document.body.getElementsByTagName("center");
			for (var i = 0; i < centers.length; i++) {
				if (centers[i].innerHTML.indexOf("You win the fight") == 0) {
					centers[i].insertBefore(yoinkNode, centers[i].childNodes[3]);
					break;
				}
			}
		} else {
			$('a:contains("Adventure Again")').parent().prepend(yoinkNode);
		}
	}
}

function HTMLDecode(html) {
	return String(html)
			.replace(/&amp;/g, '&')
			.replace(/&quot;/g, '"')
			.replace(/&#39;/g, "'")
			.replace(/&lt;/g, '<')
			.replace(/&gt;/g, '>');
}

// LOGGEDOUT: Clear things that should only be checked once per session.
function at_loggedout() {
	SetPwd(0);
	SetCharData("NSDoorCode",'');
}

// LOGIN: clear password hash, just to be safe.
function at_login() {
	at_loggedout();
}

// AFTERLIFE: what they're calling Valhalla after the revamp.
function at_afterlife() {
	at_valhalla();
}
// VALHALLA: clear things that may change when you ascend.
function at_valhalla() {
	// door code resets
	SetCharData("NSDoorCode",'');
	// might not go muscle sign this time
//	SetCharData("plungeraccess",'');
	// wipe the cellar wine info
	SetCharData("corner178",0);
	SetCharData("corner179",0);
	SetCharData("corner180",0);
	SetCharData("corner181",0);
	SetCharData("winelist",'');
	SetCharData("wineHTML",'');
	SetCharData("winesNeeded",'');
	// clear the hidden city stone settings
	SetCharData("altar1",'');
	SetCharData("altar2",'');
	SetCharData("altar3",'');
	SetCharData("altar4",'');
	// reset pirate insult knowledge
	SetCharData("insults",'0;0;0;0;0;0;0;0');
	// clear last-rat info
	SetCharData("lastrat",0);
	// reset nun counter, just in case
	SetCharData("nunmoney",0);
	// reset pandamonium arena solution marker
	SetCharData("pandabandsolved",false);
	// reset list of explored squares in the cellar
	SetCharData("squarelist","");
	// reset tracking of what items were where while mining
	clearwhiches();
	// reset count of beeguy summonses
	SetCharData("saidbeeguy",0);
	// reset Hyboria quest status
	SetCharData("Krakrox","A");
}

// COVE: display pirate insult information
function at_cove() {
	var insultsList=GetCharData("insults");
	if (insultsList == undefined) { insultsList = "0;0;0;0;0;0;0;0"; SetCharData("insults",insultsList); }
	var insultsArray = insultsList.split(";");
	var numInsults = 0;
	for (var i=0;i<insultsArray.length;i++) {
		numInsults += integer(insultsArray[i]);
	}
	var iColor={0:"red",1:"red",2:"red",3:"red",4:"red",5:"maroon",6:"blue",7:"green",8:"green"};

	//Create the page element
	var InsultDisplay = document.createElement('tr');
	InsultDisplay.innerHTML = '<tr><td><div style="color: '+iColor[numInsults]+';font-size: 80%;width: 40%;text-align:left;">' + 'Insult tracking: ' + numInsults + '\/8</div></td></tr>';
	var resetLink = document.createElement('tr');
	resetLink.innerHTML = '<font size=1><a id=H_insultreset href=#>[reset insult tracking]</a></font>';
	//Insert it at the top of the page
	var element = document.getElementsByTagName("tr")[0];
	element.parentNode.insertBefore(InsultDisplay,element);
	element.parentNode.insertBefore(resetLink,InsultDisplay);
	$('#H_insultreset').click(function(){SetCharData("insults","0;0;0;0;0;0;0;0");window.location = "cove.php";});
}

// Cellar_Linker: remember what square we clicked on.
function cellar_linker() {
	var a = $(this);
	SetCharData("square", a.attr('href'));
	var squarenum = a.attr('href').match(/(\d+)/)[0];
	var sqlist = GetCharData("squarelist");
	sqlist = sqlist + ";" + squarenum;
	SetCharData("squarelist",sqlist);
}

// CELLAR: track what square we clicked on in order to provide exploration links later.
function at_cellar() {
	$('a').click(cellar_linker);
}

// COBBS KNOB: Spoilers for Prisoner 37
function at_cobbsknob() {
	$('p').each(function() {
		var txt = $(this).text();
		if ((txt.indexOf("I'll give it a shot") != -1) ||
			(txt.indexOf("I'll get right on it") != -1))  { $(this).append(AppendLink('[lab (1)]',snarfblat(50))); }
		if ((txt.indexOf("them on Menagerie level 1") != -1) ||
			(txt.indexOf("First, I'm going to need") != -1)) { $(this).append(AppendLink('[menagerie-1 (1)]',snarfblat(51))); }
		else if ((txt.indexOf("Okay, the next thing") != -1) ||
			(txt.indexOf("flartble") != -1)) { $(this).append(AppendLink('[menagerie-2 (1)]',snarfblat(52))); }
		else if ((txt.indexOf("This is the last thing I need") != -1) ||
			(txt.indexOf("be right back") != -1)) { $(this).append(AppendLink('[menagerie-3 (1)]',snarfblat(53))); }
	});
	// stupid not-<p>-tagged option...
	$("td:contains('How embarrassing.'):last").append(AppendLink('[menagerie-2 (1)]',snarfblat(52)));
}

// ADVENTURE: provide "Explore next square" link when we hit a non-combat in the Hidden City.
// Also provide extra functionality for certain other noncombats.
function at_adventure() {
	//fix for kolproxy futzing with the URL on the first round of combat.
	if (document.location.search.indexOf("snarfblat") !== -1) {
		if ($('input').length > 0) {
			at_fight();
			return;
		}
	}
	var square=GetCharData("square");
	SetCharData("square",false);
	if (square) {
		if (square.indexOf("hiddencity") != -1) link_hiddencity(square);
//		if (square.indexOf("cellar.php") != -1) link_cellar(square);
	}
	var $NCTitle = $('b:eq(1)');
	var NCText = $NCTitle.text();
//	console.log("NCTtext=["+$NCTitle.text()+"]");
	switch (NCText) {
	case "Rotting Matilda":
		var cardlink = document.createElement('table');
		cardlink.innerHTML = '<table class="item" style="float: none" rel="id=1963&s=55&q=0&d=1&g=0&t=1&n=1&m=0&u=u"><tr><td><img src="http://images.kingdomofloathing.com/itemimages/guildapp.gif" alt="dance card" title="dance card" class=hand onClick="descitem(223939661)"></td></tr></table>';
		$NCTitle.append(cardlink);
		$(cardlink).attr('rel','id=1963&s=55&q=0&d=1&g=0&t=1&n=1&m=0&p=0&u=u').addClass('item');
		break;
	case "It's Always Swordfish":
		$('<center><br /><a href="adventure.php?snarfblat=160">Adventure Belowdecks</a></center><br />').prependTo($('a:last').parent());
		break;
	case "Mr. Alarm":
		$('<center><a href="adventure.php?snarfblat=100">Adventure in WHITEY\'S GROVE</a></center><br />').prependTo($('a:last').parent());
		break;
	case "It's A Sign!":
		$('<center><a href="adventure.php?snarfblat=100">Adventure Again (Whitey\'s Grove)</a></center><br />').prependTo($('a:last').parent());
		$('<center><a href="adventure.php?snarfblat=99">Adventure on the Road to White Citadel</a></center><br />').prependTo($('a:last').parent());
		break;
//	case "F-F-Fantastic!":
//		$('<center><a href="adventure.php?snarfblat=82">Adventure in the Castle in the Clouds in the Sky</a></center><br />').prependTo($('a:last').parent());
//		break;
	case "We'll All Be Flat":
		$('<center><a href="manor3.php">Head to the Wine Cellar</a></center><br />').prependTo($('a:last').parent());
		SetCharData("corner178",0);
		SetCharData("corner179",0);
		SetCharData("corner180",0);
		SetCharData("corner181",0);
		SetCharData("winelist",'');
		SetCharData("wineHTML",'');
		SetCharData("winesNeeded",'');
		SetCharData("altar1",'');
		SetCharData("altar2",'');
		SetCharData("altar3",'');
		SetCharData("altar4",'');
		break;
	case "Whee!":
		$('<center><a href="adventure.php?snarfblat=125">Adventure in the Middle Chamber</a></center><br />').prependTo($('a:last').parent());
		break;
	case "Polo Tombstone":
		$('a[href="adventure.php?snarfblat=103"]').remove();		// don't need to adventure again once we have the key.
		$('<center><a href="adventure.php?snarfblat=106">Adventure in the Haunted Gallery</a></center><br />').prependTo($('a:last').parent());
		break;
	case "Entour Rage":
	case "A Pertinent Imp":
	case "Primo Donno":
	case "Your Bassist Impulses":
	case "Suckubus? You Hardly Know Us!":
	case "A Dicey Situation":
		$('<center><a href="pandamonium.php?action=sven">Check with Sven</a></center><br />').prependTo($('a:last').parent());
		break;
	case "The Manor in Which You're Accustomed":
		$('<center><a href="manor.php">Go on inside</a></center><br />').prependTo($('a:last').parent());
		break;
	case "3 eXXXtreme 4ever 6pack":
		$('<center><a href="'+to_place('mclargehuge&action=cloudypeak') + '">Open the Peak!</a></center><br />').appendTo($('p:last').parent());
		break;
	case "The Journey Continues":
		var p1 = $('p:contains("Having finally fought")').text;
		nextZoneName = p1.match(/This must be (\w+),/)[1];
		$('a:contains("Adventure Again")').replaceWith('<a href="adventure.php?snarfblat=320">Adventure in '+nextZoneName+'</a>');
		break;
	case "Sphinx for the Memories":
		$('a:contains("Adventure Again")').replaceWith('<a href="adventure.php?snarfblat=320">Adventure in the next zone</a>');
		break;
	case "Top of the Castle, Ma":
		$('<center><a href="'+snarfblat(324)+'">Adventure on the TOP FLOOR</a></center><br />').prependTo($('a:last').parent());
		break;
	case "Plucked":
		$('<center><a href="cobbsknob.php?action=throneroom">Take out the KING</a></center><br />').prependTo($('a:last').parent());
		break;
	case "This Adventure Bites":
		$('<br /><center><p><font color="blue">You need:<br/>frilly skirt equipped, and 3 hot wings OR<br/>orcish frat boy outfit equipped OR<br/>mullet wig equipped, and a briefcase<br/>before using those blueprints</font></center>').appendTo($('a:last').parent());
		break;
	case "A Sietch in Time": // put stuff here
		break;
	case "Not So Much With The Humanity":
		$('<center><a href="'+snarfblat(385)+'">Adventure in the Red Zeppelin</a></center><br />').prependTo($('a:last').parent());
		break;
	case "":	// got a "You shouldn't be here" or other reject message... (or an untitled Limerick Dungeon adventure, sigh)
		if (document.location.search=="?snarfblat=100") {	// we were trying for Whitey's Grove; go get the quest from the guild.
			mainpane_goto("guild.php?place=paco");
		} else if (document.location.search=="?snarfblat=141") { // we were at the Pond (frozen dooks)
			$('<center><a href="adventure.php?snarfblat=142">Adventure in the Back 40</a></center><br />')
				.prependTo($('a:last').parent());
		} else if (document.location.search=="?snarfblat=142") { // we were at the Back 40 (hot dooks)
			$('<center><a href="adventure.php?snarfblat=143">Adventure in the Other Back 40</a></center><br />')
				.prependTo($('a:last').parent());
		} else if (document.location.search=="?snarfblat=143") { // we were at the Other Back 40 (spooky dooks)
			$('<center><a href="bigisland.php?place=farm&action=farmer&pwd='+pwd+'">See the Farmer</a></center><br />')
				.prependTo($('a:last').parent());
		} else if (document.location.search=="?snarfblat=324") { // no access to top floor of castle
			$('<center><a href="'+snarfblat(323)+'">Work the Ground Floor Some More</a></center><br />')
				.prependTo($('a:last').parent());
		}
		break;
	}
}

// GUILD: links for what your guild folks ask you to do
function at_guild() {
	$('img').each(function()
	{
		var onclick = this.getAttribute('onclick');
		if (onclick != undefined && onclick.indexOf("desc") != -1) {
			AddLinks(onclick, this.parentNode.parentNode, null, thePath);
		}
	});
	var subloc = document.location.search;
	var td = $('center table tr td center table tr td:first');
	var tdtext = $(td).text();
	switch (subloc) {
		case "?place=paco":
			if (tdtext.indexOf("White Citadel") != -1) {
				td.append(AppendLink('[Whitey\'s Grove (1)]', snarfblat(100)));
				td.append(AppendLink('[Road to WC (1)]', snarfblat(99)));
			}
			else if ((tdtext.indexOf("with the meatcar?") != -1) || (tdtext.indexOf("meatcar parts") != -1)) {
				if (GetCharData("friendlyknoll") == true) {
					td.append(AppendLink('[gnoll store]', "store.php?whichstore=5"));
				} else {
					 td.append(AppendLink('[Knoll]', to_place('knoll_hostile')));
				}
			}
		break;
		case "?place=ocg":
			if (tdtext.indexOf("Misspelled Cemetary") != -1) {	// common opening phrase to find F's key.
				$('p:last').append(AppendLink('[Misspelled Cemetary (1)]',snarfblat(21)));
			} else if  ((tdtext.indexOf("brought me Fernswarthy's key") != -1) || 	// mus inter for finding F's key
				 (tdtext.indexOf("brought the key to") != -1) ||					// mys inter
				 (tdtext.indexOf("haven't got Fern") != -1))						// mox inter
			{
				td.append(AppendLink('[Misspelled Cemetary (1)]',snarfblat(21)));
			} else if ((tdtext.indexOf("searching the ruins") != -1) ||		// mus post-key/pre-dusty book
				 (tdtext.indexOf("a very busy man") != -1) ||				// mys
				 (tdtext.indexOf("searching the tower") != -1))				// mox
			{
				td.append(AppendLink('[Tower Ruins (1)]',snarfblat(22)));
			}
		break;
		case "?place=scg":
			if (tdtext.indexOf("the two oldest and wisest") != -1) 		// common opening phrase, yay.
			{
				$('p:last').append(AppendLink('[hermit]','hermit.php')).append(AppendLink('[casino]','casino.php'));
			} else if ((tdtext.indexOf("not completed your Epic") != -1) ||		// Mus interstitial
					   (tdtext.indexOf("not yet completed your Epic") != -1) || // Mys interstitial
					   (tdtext.indexOf("delay on that epic") != -1))			// Mox interstitial
			{
				td.append(AppendLink('[hermit]','hermit.php')).append(AppendLink('[casino]','casino.php'));
			} else if (tdtext.indexOf("Beelzebozo") != -1) 						// EW->LEW assignment, all classes.
			{
				$('p:last').append(AppendLink('[Fun House (1)]',snarfblat(20)));
			} else if ((tdtext.indexOf("restore the Legendary") != -1) || 			// mus inter
					   (tdtext.indexOf("acquire the Legendary") != -1) || 			// mys inter
					   (tdtext.indexOf("with that Legendary") != -1))				// mox inter
			{
				td.append(AppendLink('[Fun House (1)]',snarfblat(20)));
			} else if (tdtext.indexOf("on your map") != -1) 				// Cave assignment, all classes
			{
				if ($('p').length) $('p:last').append(AppendLink('[nemesis cave]','cave.php'));
				else td.append(AppendLink('[nemesis cave]','cave.php'));
			} else if ((tdtext.indexOf("defeated your Nemesis yet") != -1) ||		// Mus inter
				(tdtext.indexOf("need you to defeat") != -1) ||						// Mys inter
				(tdtext.indexOf("beat your Nemesis yet, eh?") != -1))				// Mox inter
			{
				td.append(AppendLink('[nemesis cave]','cave.php'));
			} else if (tdtext.indexOf("volcano lair or something") != -1) {	// all classes: start of assassin encounters
				td.append('<p><font color="blue">(Come back after you get the Secret Tropical Volcano Lair map from a nemesis assassin.)</font>');
			} else if (tdtext.indexOf("I was hoping you could lend me one") != -1) { // all classes: island openable
				$('p:last').append(AppendLink('[equip fledges]',equip({i:3033,s:3})))
						   .append(AppendLink('[Poop Deck (1)]',snarfblat(159)));
			}
		break;
		case "?place=challenge":
			//add links here for going to haunted pantry, sleazy back alley, or Cobb's Knob.
			if ((tdtext.indexOf("So you wanna join the Department of Shadowy") != -1) ||    // moxie quest opener
				(tdtext.indexOf("manage to steal your own pants") != -1)) {                 // moxie not-done-yet
				$('p:last').append(AppendLink('[back alley (1)]',snarfblat(112)));
			} else if ((tdtext.indexOf("particularly the big ones") != -1) ||               // muscle opener
					   (tdtext.indexOf("it has to be a really big one") != -1)) {           // muscle not-done-yet
				$('p:last').append(AppendLink('[knob outskirts (1)]',snarfblat(114)));
			} else if ((tdtext.indexOf("particular poltersandwich") != -1) ||               // myst opener
                        (tdtext.indexOf("cinnabonshee") != -1)) {                           // myst not-done-yet
                $('p:last').append(AppendLink('[haunted pantry (1)]',snarfblat(113)));
            }
		break;
	}
}


// ARCADE: display # of tokens and tickets on the main arcade screen.
function at_arcade() {
	GM_get(server+'api.php?what=inventory&for=MrScript',function(response) {
		var invcache = $.parseJSON(response);
		var tokens = ((invcache[4621] === undefined) ? "no" : invcache[4621]) + " token" + ((invcache[4621] == 1) ? " " : "s ");
		var tickets = ((invcache[4622] === undefined) ? "no" : invcache[4622]) + " ticket" + ((invcache[4622] == 1) ? ". " : "s. ");
		var arcadeInfo = document.createElement('div');
		arcadeInfo.innerHTML = "<center><p>You have "+tokens+" and "+tickets+"</center>";
		document.body.appendChild(arcadeInfo);
	});
}

// CHOICE: special functions for choice adventure text.
function at_choice() {

	InlineItemDescriptions();

	var square = GetCharData("square");
	SetCharData("square",false);
	var $NCTitle = $('b:eq(0)');
	var NCText = $NCTitle.text();

	if((NCText !== "Results:") && (GetPref("choicelinks") == 1)) {
    	$NCTitle.wrap('<a style="color:white;" href="http://kol.coldfront.net/thekolwiki/index.php/'+
			'Special:Search?search='+ NCText.replace(/\s/g, '+').replace('"', '') +'&go=Go" '+
			'target="_blank"></a>');
    }
	if (square) {
		if (square.indexOf("hiddencity") != -1) link_hiddencity(square);
		if (square.indexOf("cellar.php") != -1) {
			if (NCText != "Results:") {
				SetCharData("square",square);	// not "Results:" means it's the choosing half of the choice, where you don't need links.
												// but it will be "Results:" after we choose something, so pass our Square data onward.
			} else {
				link_cellar(square);			// "Results:" means it's the result of the choice, where you need the links.
			}
		}
	}
	var cNum = 0;

	var inputs = $('input[name="whichchoice"]');
	if (inputs && inputs[0]) { cNum = inputs[0].value; }
	if (cNum >= 366 && cNum <= 386) {
		spoil_Krakrox(cNum);
	}
	if (cNum == 872) {  //new palindome shelves
		var sels = $('select');
		if (sels.length) {
			sels.val(function(index, value) {
				return [2259,7264,7263,7265][index];
			});
		}
		return;
	}

	var choicetext = $('body').text(); // for finding stuff that's not in a <p> tag.  sigh.
	$('div[style*="green"] > p').addClass("greenP");
	var p = $("p").not(".greenP");
//	var p=document.getElementsByTagName('p');
	if (p.length) {
		var p0 = p.get(0); //p[0];
		var p0text = p0.textContent;
		if (p0text.indexOf("actually a book.") != -1) {	// The Oracle
			p0.appendChild(AppendLink('[go ahead, read it already]',inv_use(818)));
		} else if (p0text.indexOf("a new pledge") != -1) {	// Orcish Frat House Blueprints adventure
			$('a [href="adventure.php?snarfblat=27"]')
				.attr('href',snarfblat(157))
				.text("Adventure in BARRRNEY'S BARRR");
		} else if (p0text.indexOf("go tell Bart") != -1) {  // the Tavern Faucet
			p0.appendChild(AppendLink('[go on already]','tavern.php?place=barkeep'));
		} else if (choicetext.indexOf("Goth Giant's turn to take out") != -1) { // finished new castle wheel
			$('a:last').parent()
				.prepend('<center><a href=' + snarfblat(324) +
				'>Adventure Again (The Castle in the Clouds in the Sky (Top Floor))</a></center><br/>');
		} else if (p0text.indexOf("You step up behind the man") != -1) {	// found Mr. Alarm
			$('<center><a href="adventure.php?snarfblat=100">Adventure in WHITEY\'S GROVE</a></center><br />')
				.prependTo($('a:last').parent());
			// add a link to cooking here.
		} else if (p0text.indexOf("clutching your pants triumphantly") != -1) { // AT guild-opening quest
			p0.appendChild(AppendLink('[back to the guild]','guild.php?place=challenge'));
		} else if (p0text == "Blech.") {
			$('a:contains("Adventure Again (McMillicancuddy")')
				.prepend('<center><a href=adventure.php?snarfblat=141>Go to the Pond</a></center><br />');
		} else if (p0text.indexOf('children Stephen and Elizabeth') != -1) {
			$('<center><a href="adventure.php?snarfblat=103">Adventure in The Conservatory</a></center><br />')
				.prependTo($('a:last').parent());
		} else if (p0text.indexOf("you find yourself face to face with... yourself") != -1) {
			var saidgmob = GetCharData("saidbeeguy");
			if (saidgmob == undefined) saidgmob = 0;
			$('p:last')
				.append("<br /><font color='blue'>You have said 'Guy made of bees' "
					+ saidgmob + " times.</font><br />");
		} else if (choicetext.indexOf("Guy made of bees.") != -1) {
			var gmob = GetCharData("saidbeeguy");
			if ((gmob == undefined) || (gmob == 0)) gmob = 1;
			else gmob = gmob + 1;
			SetCharData("saidbeeguy",gmob);
		} else if (p0text.indexOf("metal staircase descending from") != -1) {
			p0.appendChild(AppendLink('[go upstairs]','manor2.php'));
		} else if (p0text.indexOf("weird pink-headed guys") != -1) { // big brother sea monkey
			$('<center><a href="monkeycastle.php?who=1">See Little Brother</a></center><br />')
				.prependTo($('a:contains("Adventure Again")').parent());
		} else if ((choicetext.indexOf("You glimpse a giant chore wheel on the wall") != -1) ||
				(choicetext.indexOf("You see a chore wheel hanging high on the wall") != -1))
		{
			$('<center><a href="'+snarfblat(323)+'">Adventure on the GROUND FLOOR</a></center><br />')
				.prependTo($('a:contains("Adventure Again")').parent());
		} else if (p0text.indexOf("The ground floor is lit much better") != -1) {
			$('<center><a href="'+snarfblat(324)+'">Adventure on the TOP FLOOR</a></center><br />')
				.prependTo($('a:contains("Go back to")').parent());
		} else if (choicetext.indexOf("You give the wheel a mighty turn") != -1) {
			mainpane_goto('pyramid.php');
		} else if (p0text.indexOf("You make your way up into") != -1) {
			$('<center><a href="'+to_place('hiddencity')+'">Visit Beautiful Downtown Hidden City</a></center><br />')
				.prependTo($('a:contains("Go back to")').parent());
			//	p0.appendChild(AppendLink('[hidden city]',to_place('hiddencity')));
		} else if (choicetext.indexOf("hacienda. You do find an") != -1) {
			var clueText = /You do find an (\.*?),/.match(choicetext)[1];
			clueText = "<br /><font color='blue'>You found <b>" + clueText + "</b></font><br/>";
			$(clueText).appendTo($(p).find(':last'));
		} else if (choicetext.indexOf('Having finally fought your way') != -1) {
			var p1 = $('p:contains("Having finally fought")').text;
			nextZoneName = p1.match(/This must be (\w+),/)[1];
			$('a:contains("Adventure Again")')
				.replaceWith('<a href="adventure.php?snarfblat=320">Adventure in '+nextZoneName+'</a>');
		} else if (p0text.indexOf("Then good luck to you on your travels") != -1) {
			//probably got something from Gnasir!
			p0.appendChild(AppendLink('[use pamphlet]',inv_use(6854)));
		} else {
			var kText = [["The lever slides down and stops","L"],
					["some sort of intervention was called","N"],
					["You give the iron gate a mighty kick","O"],
					["You fit the two halves of the stone","P"]
				];
			for (var i=0; i<kText.length; i++) {
				if (p0text.indexOf(kText[i][0]) != -1) SetCharData("Krakrox",kText[i][1]);
			}
		}
	}
}

// Forest Village: Untinker linker.
function at_forestvillage() {
	var plunger = GetCharData("friendlyknoll");
	var linkloc = plunger ? to_place("knoll_friendly&action=dk_innabox") : to_place('knoll_hostile');
	var linkname = plunger ? "[get it from Innabox]" : "[head to degrassi knoll]";
	$('td:contains("just lost without my"):last').append(AppendLink(linkname,linkloc));
	$('td:contains("luck finding my screw"):last').append(AppendLink(linkname,linkloc));
	if (plunger) $('b:contains("Untinker")').append(AppendLink('[innabox]',linkloc));
}

function at_town_wrong() {
	if (document.location.search.indexOf("artist") != -1) {
		$('p').each(function()	{
			var p = $(this);
			var txt = p.text();
			if (txt.indexOf('Knob Goblin') != -1) 		p.append(AppendLink('[Knob outskirts (1)]',snarfblat(114)));
			if (txt.indexOf('Haunted Pantry') != -1) 	p.append(AppendLink('[Pantry (1)]',snarfblat(113)));
			if (txt.indexOf('Back Alley') != -1) 		p.append(AppendLink('[Alley (1)]',snarfblat(112)));
		});
	}
}

// BHH: provide some convenience links here too.
function at_bounty() {

	InlineItemDescriptions();

	var bountyloc = [
		//item name, link display, adventure location ID
		["bean-shaped rocks",               "[chamber (1)]",         "33"],
		["bloodstained briquettes",         "[outskirts (1)]",       "114"],
		["broken petri dishes",             "[lab (1)]",             "50"],
		["broken plunger handles",          "[restroom (1)]",        "351"],
		["bundles of receipts",             "[treasury (1)]",        "260"],
		["callused fingerbones",            "[border (1)]",          "45"],
		["crumpled pink slips",             "[brawl (1)]",           "233"],
		["drops of filthy ichor",           "[alley (1)]",           "112"],
		["empty greasepaint tubes",         "[funhouse (1)]",        "20"],
		["half-empty bottles of eyedrops",  "[gym (1)]",             "353"],
		["handfuls of meatberries",         "[conservatory (1)]",    "103"],
		["important bat files",             "[junction (1)]",        "31"],
		["pink bat eyes",                   "[entry (1)]",           "30"],
		["pieces of triffid bark",          "[forest (1)]",          "15"],
		["shredded can labels",             "[pantry (1)]",          "113"],
		["suspicious moles",                "[menagerie (1)]",       "53"],

		["absences of moss",                "[oasis (1)]",           "122"],
		["bits of wilted lettuce",          "[palindome (1)]",       "119"],
		["burned-out arcanodiodes",         "[airship (1)]",         "81"],
		["coal buttons",                    "[snowmen (1)]",         "272"],
		["discarded pacifiers",             "[castle:top (1)]",      "324"],
		["dusty wings",                     "[desert (1)]",          "364"],
		["disintegrating corks",            "[cellar (1)]",          "178"],
		["lengths of bent pipe",            "[camp (1)]",            "12354"],
		["non-Euclidean hooves",            "[gallery (1)]",         "106"],
		["bits of sticky stardust",         "[hole (1)]",            "83"],
		["beard crumbs",                    "[castle:basement (1)]", "322"],
		["rusty tap handles",               "[bathroom (1)]",        "107"],
		["spare abacus beads",              "[hidden city (1)]",     "343"],
		["spent handwarmers",               "[slope (1)]",           "273"],
		["warrrrrts",                       "[poop deck (1)]",       "159"],
		["worthless pieces of yellow glass","[dungeons of doom (1)]","39"],

		/*
		["chunks of hobo gristle",          "[Back Alley (1)]",     "112"],
		["oily rags",                       "[Knoll (1)]",          "18"],
		["empty aftershave bottles",        "[frat house (1)]",     "27"],
		["greasy dreadlocks",               "[hippy camp (1)]",     "26"],
		["vials of pirate sweat",           "[pirate's cove (1)]",  "66"],
		["balls of white lint",             "[Whitey's Grove (1)]", "100"],
		["worthless pieces of yellow glass","[Dungeons of Doom (1)]","39"],
		["billy idols",                     "[Goatlet (1)]",        "271"],
		["burned-out arcanodiodes",         "[Airship (1)]",        "81"],
		["coal buttons",                    "[Ninja Snowmen (1)]",  "272"],
		["discarded pacifiers",             "[Castle:Top (1)]",     "324"],
		["disintegrating corks",            "[Wine Cellar (1)]",    "178"],
		["non-Euclidean hooves",            "[Louvre (1)]",         "106"],
		["sammich crusts",                  "[Roflmfao (1)]",       "80"],
		*/
	];
	// going back to see the BHH gives the relevant text in the first <p>.

	$('img[width=30][class!=hand]').each(function(n, el) {
		var $img = $(this); if($img.attr("title") === "filthy lucre") return true;
		var $td = $img.parent().parent().children("td:eq(1)");

		var txt = $td.text();
		if(txt) for (var i=0; i<bountyloc.length; i++) {
			if (txt.indexOf(bountyloc[i][0]) !== -1) {
				$td.append(AppendLink(bountyloc[i][1], snarfblat(bountyloc[i][2])));
				break;
			}
		}
	});



/*
	$('p:first').each(function() {
		var p = $(this);
		var txt = p.text();
		for (var i=0; i<bountyloc.length; i++) {
			if (txt.indexOf(bountyloc[i][0]) !== -1) {
				p.append(AppendLink(bountyloc[i][1],snarfblat(bountyloc[i][2])));
				break;
			}
		}
	});
*/

	// visiting the BHH for the first time gives the text in the first <td> of the second <table>.
	// going back to see the BHH subsequently also gives the text in the first <td>, but that <td> also encompasses the rest of the form.

/*
	$('table:eq(1) td:first').each(function() {
		var p = $(this);
		var txt = p.text();
		if (txt.indexOf("Manual of Transcendent Olfaction") != -1) return;	// we'll be modifying the <p> above instead.
		for (var i=0; i<bountyloc.length; i++) {
			if (txt.indexOf(bountyloc[i][0]) != -1) {
				p.append(AppendLink(bountyloc[i][1],snarfblat(bountyloc[i][2])));
				break;
			}
		}
	});
*/

}

function at_mall() {
	$('center table tr td center table:first').prepend('<tr><td><center><a href=managestore.php>Manage your Store</a><br /><br /></center></td></tr>');
}

function at_managestore() {
	$('a[href="storelog.php"]').parent().append('<br /><br /><a href=mall.php>Search the Mall</a><br />');
}

// MALLSTORE: add fun links to (some of) the things you buy!
function at_mallstore() {
	var img = document.images[0];
	if (img == undefined) return;
	var onclick = img.getAttribute("onclick");
	if (onclick != undefined && onclick.indexOf("desc") != -1) {
		AddLinks(onclick, img.parentNode.parentNode, img.parentNode.parentNode.parentNode.parentNode.parentNode, thePath);
	}
	for (var i=1,len=document.images.length; i<len; i++) {
		img = document.images[i];
		onclick = img.getAttribute("onclick");
		if (onclick != undefined && onclick.indexOf("desc") != -1) AddInvCheck(img);
	}
}

// BEERPONG: Auto-choose pirate insults.
function at_beerpong() {
	var val = 0, html = $('img[src*="beerpong"]').parent().parent().html();
	if (html) {
		if (html.indexOf('ll flay') != -1) val = 1;
		else if (html.indexOf('craven') != -1) val = 2;
		else if (html.indexOf('pestilent') != -1) val = 3;
		else if (html.indexOf('run red') != -1) val = 4;
		else if (html.indexOf('ned goat') != -1) val = 5;
		else if (html.indexOf('tle girl') != -1) val = 6;
		else if (html.indexOf('some worm') != -1) val = 7;
		else if (html.indexOf('ngle man') != -1) val = 8;

		var sel = $('select[name="response"]');
		sel.children().each(function() {
			if ($(this).val() > 8) $(this).attr('disabled','disabled');
		});
		if (val > 0) {
			var opt = sel.find('option[value="'+val+'"]');
			if (opt.length > 0) opt.attr('selected','selected');
			else val = 0;
		}
		if (val == 0) {
			sel.prepend($(document.createElement('option'))
				.attr('selected','selected').attr('value','0')
				.html(' '));
			$('table:last').append("<br /><center><font color='blue'>'"+
								"You don't have the right response for that insult.</font></center>");
		}
	}
	if ($('p:first').text().indexOf("You laugh as Ricket") != -1) {		// insert only upon beerpong success.
		$('a[href="cove.php"]').parent().prepend("<center><a href='"+snarfblat(158)+"'>Adventure in the F'c'le</a></center><br />");
	}
}

function at_showplayer() {
	InlineItemDescriptions();
}

// INVENTORY: Add shortcuts when equipping outfits
function at_inventory() {

	InlineItemDescriptions();

	var firstTable = document.getElementsByTagName('table')[0];

	var gearpage = 0; // Man, this is annoying.
	var searchString = document.location.search;
	if (searchString.indexOf("which=2") != -1) gearpage = 1;

	// Miscellaneous messages that always route you back to inventory:
	else if (searchString.indexOf("action=message") != -1) {
		var fimg = $('img:first');
		var src = fimg.attr('src');
		if (src.indexOf('blackbird1') != -1) {									// blackbird
			fimg.append(AppendLink('[use map]',inv_use(2054)));
		}
		else if (src.indexOf('scroll1.gif') != -1) {							// 31337 scroll
			var clov = $('b:lt(5):contains(clover)');
			if (clov.length > 0) {
				var quant = clov.text().match(/^[0-9]*/);
				if (!quant) quant = 1;
				clov.append(AppendLink('[disassemble]','multiuse.php?pwd='+
				pwd+'&action=useitem&quantity='+quant+'&whichitem=24'));
			}
		}
	}

	// Real-time filtration (not ready for prime-time)
//	if(GetPref("inlineitemfilter"))
	$("#filter input").on("keyup", function(e) {
		var $input = $(this);
		var filterVal = $input.val().toLowerCase();
		if(!filterVal) { $(".item").show(); return true; }

		if(!window.currentItems) {
			window.currentItems = {};
			$(".item").each(function() {
				var $item = $(this);
				window.currentItems[$item.find("b").text().toLowerCase()] = $item;
			});
		}

		$.each(window.currentItems, function(k, $item) {
			$item.toggle(k.indexOf(filterVal) !== -1);
		});
	});


	// Equipment page only
	if (gearpage == 1) {
		var backup = GetPref('backup');
		var quickequip = GetPref("quickequip");
		var lnks = document.links;
		var unlink, famLock;
		var didQElink = false;
		var selecty = document.getElementsByTagName('select')[0];

		if (backup != '') {
			for (var i=0, len=lnks.length; i<len; i++) {
				var lnk = lnks[i];

				if (/familiar\.php/.test(lnk.href)) {
					famLock = lnk; continue;
				}

				if (lnk.text == "[unequip all]"
				 || lnk.text == "Manage your Custom Outfits")
				{
					var processingUnequipAll = 1;
					if (lnk.text != "Manage your Custom Outfits")
						unlink = lnk;
					else {
						processingUnequipAll = 0;
						unlink = selecty.parentNode.previousSibling;
						if (unlink != null) {
							unlink.firstChild.appendChild(
								document.createElement('tr'));
							unlink.firstChild.lastChild.appendChild(
								document.createElement('td'));
							unlink = unlink.firstChild.lastChild.lastChild;
							unlink.setAttribute('align','center');
							unlink.setAttribute('colspan','3');
							unlink.appendChild(document.createElement('font'));
							unlink = unlink.firstChild;
							unlink.setAttribute('size','1');
							unlink.appendChild(document.createTextNode(' '));
							unlink = unlink.lastChild;
						}
					}
					if (processingUnequipAll == 1) {
						var newlink = document.createElement('a');
						newlink.innerHTML = "[backup]";
						newlink.href = "#";
						//newlink.addEventListener('contextmenu',function(event)
						//{	alert('pow!');}, false);
						newlink.addEventListener('click',function(event) {
							this.innerHTML = "[backing up...]";
							GM_get(server + equip({a:'customoutfit',oname:GetPref('backup')}),
//							'/inv_equip.php?action=customoutfit&which=2&outfitname=' + GetPref('backup'),
							function(response) {
								for (var i=0, len=document.links.length; i<len; i++) {
									if (document.links[i].text.indexOf("...") != -1) {
										if (response.indexOf("custom outfits") == -1)
											document.links[i].innerHTML = "[done]";
										else document.links[i].innerHTML = "[too many outfits]";
										break;
									}
								}
							}); event.stopPropagation(); event.preventDefault();
						}, false);
						unlink.parentNode.insertBefore(newlink,unlink);
						unlink.parentNode.insertBefore(document.createTextNode(" - "),unlink);
					}

					// Save contents of outfit menu
					var nunewlink; var opty;
					for (i=1, len=selecty.options.length; i<len; i++) {
						opty = selecty.options[i];
						if (opty.text == backup) {
							nunewlink = document.createElement('a');
							nunewlink.innerHTML = "[revert to " + backup.toLowerCase() + "]";
							nunewlink.href = equip({a:'outfit',oid:opty.value});
							//"inv_equip.php?action=outfit&which=2&whichoutfit=" + opty.value;
						}
					}

					if (nunewlink)
						unlink.parentNode.insertBefore(nunewlink,unlink);
					if (processingUnequipAll == 1) unlink.parentNode.insertBefore(
						document.createTextNode(" - "),unlink);
					break;
				}
			}
		}
	} // equippage
// this is where we go back to a useful location if we've done/used something elsewhere that caused the inventory page to load.
	if (GetPref('shortlinks') > 1 && firstTable.rows[0].textContent == "Results:") {
		var resultsText = firstTable.rows[1].textContent;
		var jb = $('b:eq(1)');
		var bText = jb.text();
		var goHere = checkForRedirects(resultsText);
		if (goHere != "") {
			mainpane_goto(goHere);
		}
// and this is where we add all the nifty little links after equipping something.
		else if (resultsText.indexOf("You equip an item") != -1) {
			process_equip(bText, jb);
		}
		else if (resultsText.indexOf("Outfit:") != -1) {
			process_outfit(bText, jb);
		}
		else if (resultsText.indexOf('You acquire an item') != -1) {
			var theItem = jb.parent().parent().get(0);
			AddLinks(null, theItem, null, thePath);
		}
		else if (resultsText.indexOf('acquire an effect') != -1) {
			process_effect(bText, jb);
		}
		else {
			process_results(resultsText, $(firstTable.rows[1]).children(':last'));
		}
	}
}

function process_results(rText, insLoc) {
	if (rText.indexOf("You can easily climb the branches") != -1) {
		insLoc.append(AppendLink('[temple (1)]',snarfblat(280)));
	} else if (rText.indexOf("You should go to A-Boo Peak") != -1) {
		if (insLoc.parent().find('p').length === 0) {
			insLoc.append(AppendLink('[A-Boo! (1)]',snarfblat(296)));
		} else {
			insLoc.parent().find('p').append(AppendLink('[A-Boo! (1)]',snarfblat(296)));
		}
	} else if (rText.indexOf("You give the wheel a mighty turn") != -1) {
		mainpane_goto('pyramid.php');
	} else if (rText.indexOf("it just seemed like a cool spy thing") != -1) {
		insLoc.append(AppendLink('[venture into the Knob]','cobbsknob.php'));
	} else if (rText.indexOf("At least now you know where the pyramid is") != -1) {
		insLoc.append(AppendLink('[$64,000 pyramid, baby]',to_place('desertbeach&action=db_pyramid1')));
	} else if (rText.indexOf("named Mr. Alarm that Dr. Awkward") != -1) {
		insLoc.append(AppendLink('[knob lab (1)',snarfblat(50)));
	} else if (rText.indexOf("insane, egotistical ramblings") != -1) {
		insLoc.append(AppendLink('[Go to Dr, do tog]',to_place('palindome&action=pal_droffice')));
	} else if (rText.indexOf('second volume is more of the same') != -1) {
		insLoc.append(AppendLink('[Go see Mr Alarm, ee! sog.]', to_place('palindome&action=pal_mroffice')));
	}
}



function checkForRedirects(resultsText) {
	var cl = [
		// "found this","came from here","send to here."
		["ladder into the Bat Hole","bathole",'/place.php?whichplace=bathole'],
		["cheap ratchet","pyramid","/pyramid.php"],
		["All items unequipped","lair6","/lair6.php"],
		["All items unequipped","lair1","/lair1.php"],
		["You discard your Instant Karma","lair6","/lair6.php"],
		["a tiny black hut with a sign","","/shop.php?whichshop=blackmarket"]
	];
	var i;
	var arrl = cl.length;
	for (i=0; i < arrl; i++) {
		if (resultsText.indexOf(cl[i][0]) != -1 && weCameFrom(cl[i][1])) {
			return cl[i][2];
		}
	}
	return "";
}

function at_palindome() {
	if ($('body').text().indexOf("accessible to you") != -1) {
		$('td:contains("That place"):last')
			.append(AppendLink('[equip Talisman, o Nam, silat! pi uqe?]',equip({i:486,s:3})));
	}
}

function weCameFrom(somepage) {
	if (document.referrer.indexOf(somepage) != -1) return true;
	else if (somepage == "") return true;
	else return false;
}

//helper function for kolproxy
function at_inv_use() {
	at_inventory();
}
function at_inv_equip() {
	at_inventory();
}

// GALAKTIK: Add use boxes when buying
function at_galaktik() {

	InlineItemDescriptions();

	var row = $('table:first tr:eq(1):contains("You acquire")'), txt;
	if (row.length == 1) {
		var num = 1;
		txt = row.text();
		if (txt.indexOf("an item:") == -1)
			num = $('b:eq(1)').text().split(" ")[0];
		var docG = integer($('table.item').attr('rel').match(/id=(\d+)/)[1]);
		if (GetPref('docuse') == 1 && docG < 233) {	// 231=unguent, 232=ointment.  we can auto-use those.
			var sanitycheck = FindMaxQuantity(docG, num, 0, 0) + 1;
			if (num > sanitycheck) num = sanitycheck;
			ajaxit('/multiuse.php?action=useitem&quantity=' + num +
				'&pwd=' + pwd + '&whichitem=' + docG
			);
		} else {
	//		AppendUseBox(docG, 0, 1, row.find('td center').get(0));
	//		if (num > 1) NumberLink($('b:eq(1)').get(0));
		}
	}
	var howMany = $('input[name="howmany"]');
	var check = $(document.createElement('input'))
		.attr("type","checkbox")
		.attr("name","usecheckbox")
		.attr("style","height:12px;width:12px;");
	if (GetPref('docuse') == 1) check.attr("checked",true);
	check.change(function() {
		var box = $('input[name="usecheckbox"]');
		if (box.attr('checked')) SetPref('docuse',1);
		else SetPref('docuse',0);
	});
	var checkSpan = $(document.createElement('span'))
		.attr("class","small")
		.append(document.createElement('br'))
		.append(document.createElement('br'))
		.append(check)
		.append(document.createTextNode("Auto-Use Unguents And Ointments"));
	howMany.after(checkSpan);
	$("img[src*='otherimages']:first")
	.attr('title','right-click to equip Travoltan Trousers')
	.attr('id','proprietor')
	.bind('contextmenu',pants);
}

// BIGISLAND: add inventory check, max buttons to Frat/Hippy Trade-In stores.
function at_bigisland() {
	$('img').each(function()
	{	var onclick = this.getAttribute('onclick');
		if (onclick != undefined && onclick.indexOf("desc") != -1)
			AddInvCheck(this);
	});
	// if we're showing the junkyard, add onclick events to track which junkyard zone we go into.
	if ((document.location.search == "?place=junkyard") || (document.location.search.indexOf("action=junkman") != -1)) {
		$('a:lt(4)').click(function() {
		var a = $(this);
		SetCharData("square",a.attr('href'));
		});
	}
	// add MAX buttons to the trade-in boxes
	var select = document.getElementsByTagName("select");
	if (select && select.length > 0) {	// Items to trade in at the store?
//		select[0].options.selectedIndex = 1;
		var qty = document.getElementsByName("quantity")[0];
		MakeMaxButton(qty, function(event) {
			var selectItem = document.getElementsByName('whichitem')[0];
			var box = document.getElementsByName('quantity')[0];
			var quant = ParseSelectQuantity(selectItem, ")");
			box.value = quant;
		});
	}
}

function pants(evt) {
	GM_get('http://'+server+equip({i:1792}), //inv_equip.php?pwd='+pwd+'&which=2&action=equip&whichitem=1792'
	function(txt) {
		var pimg = document.getElementById('proprietor');
		pimg.removeAttribute('id');
		pimg.parentNode.nextSibling.innerHTML +=
		'<br /><div class="tiny">' +
		(txt.indexOf('You equip') != -1 ?
		'Travoltan Trousers Equipped' :
		'Travoltan Trousers Could Not Be Equipped') + '</span>';
	});
	evt.stopPropagation();
	evt.preventDefault();
}

function at_mrstore() {
	InlineItemDescriptions();
}

// STORE: Add use boxes and links as appropriate
function at_store() {

	InlineItemDescriptions();

	var firstTable = $('table:first tbody');		// we're interested in this when it's the "Results:" box from buying something.
	var whichstore; var noform = 1;

	var insput = $('input[name="whichstore"]');
	if (insput.length > 0) {
		whichstore = insput.attr('value'); noform = 0;
	} else whichstore = document.location.search.match(/whichstore\=([a-z0-9])/)[1];

	// Refresh hash
	var inphash = $('input[name="phash"]');
	if (inphash.length>0) SetPwd(inphash.val());

	// Quantity checking
	$('img').each(function()
	{	var onclick = this.getAttribute('onclick');
		if (onclick != undefined && onclick.indexOf("desc") != -1)
			AddInvCheck(this);
	});

	// You can thank Mr. Mag for this one...
	// right-click on the image of the shopkeeper to put on your travoltan trousers without leaving the store.

	$("img[src*='otherimages']:first")
		.attr('title','right-click to equip Travoltan Trousers')
		.attr('id','proprietor')
		.bind('contextmenu',pants);

	if (GetPref('shortlinks') > 1 && firstTable != undefined &&
		firstTable.children('tr:first').text() == "Market Results:" &&
		firstTable.children('tr:eq(1)').text().indexOf("You acquire") != -1)
	{
		var descId = $('img:first').get(0).getAttribute('onclick');
		var acquireString = firstTable.children('tr:eq(1)').text();
		var acquireText = firstTable.find('tr:eq(1) td:first *:first');
		var bText = $('b:eq(1)').attr('valign','baseline');
		switch(whichstore) {
			case 'b':		// everything from the bugbear bakery is cookable.
				bText.parent().append(AppendLink('[cook]', '/craft.php?mode=cook')); break;
			case 'j':		// everything from the jeweler is pliable
				bText.parent().append(AppendLink('[ply]', 'craft.php?mode=jewelry'));
				break;
			case 's':		// everything from the meatsmith is smithable.
				if (weCameFrom('craft'))    //did we just buy a hammer?  go smithing.
					mainpane_goto('/craft.php?mode=smith');
				bText.parent().append(AppendLink('[smith]', 'craft.php?mode=smith'));
				break;
			case 'h':		// everything from the hippy is cook/mix/stillable.
				bText.parent()
					.append(AppendLink('[cook]', 'craft.php?mode=cook'))
					.append(AppendLink('[mix]', 'craft.php?mode=cocktail'))
					.append(AppendLink('[still]', 'guild.php?place=still'));
				break;
			case 'r':		// pirate store: untinker the dictionary.
				if (acquireString.indexOf('dictionary') != -1)
					bText.parent().append(AppendLink('[untinker]', to_place('forestvillage&action=fv_untinker')));
				break;
		}

		if (descId != undefined) {
			var whut = AddLinks(descId, bText.parent().parent().get(0), acquireText, thePath);
			//if ((whut == 'skill' || whut == 'use') && firstTable.children('tr:eq(1)').text().indexOf("an item:") == -1)
				//NumberLink(bText.get(0));
		}
	}

	var swap;
	if (GetPref('shortlinks') > 1) {
		if (whichstore == 'h') {
			if (noform == 1) swap = AppendOutfitSwap(2, "Like, Get Groovy, Man", 0);
			else swap = AppendOutfitSwap(0, "Whoa, Clear Your Head, Man", 0);
			$('p:first').append(swap);
		} else if (whichstore == 'b') {
			if (noform == 1) swap = AppendOutfitSwap(1,"Wave Your Hand And Say \"But I Am A Bugbear.\"", 0);
			else swap = AppendOutfitSwap(0,"Sneak Away Before The Bugbear Catches On", 0);
			$('p:first').append(swap);
		}
	}
}

function at_monkeycastle() {
	$('img:first').each(function()
	{
		var onclick = this.getAttribute('onclick');
		if (onclick != undefined && onclick.indexOf("desc") != -1)
			AddLinks(onclick, this.parentNode.parentNode, null, thePath);
	});
	//addWhere.append(AppendLink('[old man, see?]','oldman.php')); break;
}


// CASINO: Add link for buying pass.
function at_casino() {
	if (GetPref('shortlinks') > 1) {
		if ($('table:first tr:eq(1)').text().indexOf("Casino Pass") != -1)
			$('p:first').html(AppendBuyBox(40, 'm', 'Buy Casino Pass', 1));
	}
}

// CRAFT: Buttons for buying ovens, etc.
function at_craft() {
	var mode, mlink, store;
	var itemNeeded = 0, desc = "";
	mode = $('input[name="mode"]').val();
	var dtext = [	["combine","meat pastables"],["cook","foods"],["smith","arms + armor"],
			["cocktail","booze"],["jewelry","jewelry"],["multi","miscellaneous"]];
	var dlinks = "<tr><td><center><font size=2>Discoveries:&nbsp;";
	for (var i = 0; i < dtext.length; i++) {
		dlinks = dlinks + "[<a href=craft.php?mode=discoveries&what=" + dtext[i][0] + ">" + dtext[i][1] + "</a>]&nbsp;";
	}
	dlinks = dlinks + "</font></center></td></tr>";
	$("table:first tr:eq(2)").after(dlinks);
	mlink = $('b:contains("Results:")');
	ilink = $('a[href*="inv_use"]');	// link to install an already-owned campground item.  If it exists, we won't put up our buy button.
	var tbltext = mlink.parents('table:first').text();
	if (tbltext.indexOf("more advanced cooking appliance") != -1)   { itemNeeded = 157; desc = "Buy & Install a Dramatic Range"; 	store = 'm';}
	else if (tbltext.indexOf("cocktail set is not advanced") != -1) { itemNeeded = 236; desc = "Buy & Install a Queue du Coq kit"; 	store = 'm';}
	else if (tbltext.indexOf("haven't got a hammer") != -1)         { itemNeeded = 338; desc = "Buy a tenderizing hammer"; 		store = 's';}
	// buy from the Bad Moon store if it's available, since the stuff is half-price there.
	if (GetPref('shortlinks') > 1 && mlink.length > 0 && ilink.length == 0 && itemNeeded > 0) {
		mlink.parent().parent().parent().find('center:first').after('<span id="buyspan"></span>');
		GM_get(server + 'heydeze.php', function(txt)
		{	if (txt != '') store = 'y';
			$('#buyspan').html(AppendBuyBox(itemNeeded, store, desc, 1));
		});
	}

	switch(mode) {
		case 'combine':
			break;

		case 'smith':
			// The smith needs its layout fixed
			var box = $('form[name="pulverize"] input[name="qty"]');
			if (box.length > 0) {
				var smash = $('select[name="smashitem"]');
				smash.attr('style', 'vertical-align:top;');
				MakeMaxButton(box.get(0), function(event) {
					box.val(ParseSelectQuantity(smash.get(0), " "));
				});
				var parTabl = box.parent().parent().parent().parent();
				parTabl.attr('style', parTabl.attr('style') +
					' vertical-align:middle;');
			}

			$('b').each(function() {
				var bParent = $(this).parent();
				var txt = $(this).text();
				if (txt.indexOf("powder") != -1) {
					bParent.append(AppendLink('[malus]',
						'guild.php?place=malus'));
				}
				else if (txt.indexOf("nugget") != -1) {
					bParent.append(AppendLink('[malus]',
						'guild.php?place=malus'));
					if (txt.indexOf("twink") == -1)
						bParent.append(AppendLink('[cook]',
						'/craft.php?mode=cook'));
				}
			});
			break;
	}
}

// HERMIT: Add form for buying permits.
function at_hermit() {
	$('img').each(function() {
		var onclick = this.getAttribute('onclick');
		if (onclick != undefined && onclick.indexOf(":item") != -1)	// Hermit calls js:item(descid) instead of js:descitem(descid)
		{
			var newclick = onclick.split(':')[0] + ":desc" + onclick.split(':')[1];
			this.setAttribute('onclick',newclick);
			AddInvCheck(this);
		}
	});
	if (GetPref('shortlinks') > 1) {
		var p = $('p:first');
		var txt = $('body').text();
		if (txt.indexOf("Hermit Permit required,") != -1) {			// no permit
			var a = $('b:eq(1)');
			a.parent().prepend('<br>' + AppendBuyBox(42, 'm', 'Buy Permit', 1)+'<br>');
		}
		else if (txt.indexOf("disappointed") != -1)	{			// no trinkets
			GM_get(server+'api.php?what=inventory&for=MrScript',function(response) {		// Check gum and permit counts.
				var invcache = $.parseJSON(response);
				var gum = invcache[23]; if (gum === undefined) gum = 0;
				gum = integer(gum);
				var hpermit = invcache[42]; if (hpermit === undefined) hpermit = 0;

				if (gum == 0) {
					p.get(0).innerHTML += '<br><br>' + AppendBuyBox(23, 'm', 'Buy Gum', 0);
				}
				p.append('<br><br><center><font color="blue">You have '+(gum==0?" no ":gum)+(gum!=1?" gums ":" gum ")
//					+" and "+(hpermit==0?" no ":hpermit)+(hpermit!=1?" permits ":" permit ")
					+"in inventory.</font></center><br>");
				switch (gum) {
				case 0: //do nothing
					break;
				case 1:
					p.append('<br><center><a href="'+inv_use(23)+'">Use a chewing gum</a></center>');
					break;
				case 2:
					p.append('<br><center><a href="multiuse.php?whichitem=23&quantity=2&action=useitem&pwd='
							+pwd+'">Use 2 chewing gums</a></center>');
					break;
				default:
					p.append('<br><center><a href="multiuse.php?whichitem=23&action=useitem&quantity=3&pwd='
							+pwd+'">Use 3 chewing gums</a></center>');
					break;
				}
			});
		}

		var tr = $('table:first tr:contains("Results")');
		if (tr.next().text().indexOf("You acquire") != -1) {
			var descId = $('img:first').get(0).getAttribute('onclick');
			var bText = $('b:eq(1)').attr('valign','baseline');
			if (bText.text().indexOf("ten-leaf clovers") != -1) {
				var num = integer(bText.text().split(" ten-leaf")[0]);
				bText.parent().append(AppendLink('[disassemble]', 'multiuse.php?pwd=' +
				pwd + '&action=useitem&quantity=' + num + '&whichitem=24'));
			}
			else AddLinks(descId, bText.parent().parent().get(0), p, thePath);
		}
	}
}

function at_knoll_friendly() {
	if (document.location.search.indexOf("dk_mayor") != -1) {
		p = $('p:first');
		p.append(AppendLink('[spooky barrow (1)]','adventure.php?snarfblat=48'));
		p.append(AppendLink('[bugbear pens (1)]','adventure.php?snarfblat=47'));
	}
	var txt = $("tr:eq(1) > td:first > center tr:first").text();
	if(txt && txt.indexOf("No, no, no.") !== -1) {
		document.location = 'craft.php?mode=combine';
	}
}

function at_cafe() {
	InlineItemDescriptions();
}

// SHOP: link back to the 8-bit realm if we're at the mystic shop.
function at_shop() {

	InlineItemDescriptions();

	if (document.location.search == "?whichshop=mystic") {
		$('<center><br /><a href="adventure.php?snarfblat=73">Adventure in the 8-Bit Realm</a><br /><br /></center>').prependTo($('a:last').parent());
	}

	//Quantity Checking
	$('img').each(function() {
		var onclick = this.getAttribute('onclick');
		if (onclick && onclick.indexOf("desc") != -1) {
			AddInvCheck(this);
		}
	});
}

// BARREL: add links to the results of your barrel droppings.
function at_barrel() {
	$('img').each(function() {
		var onclick = this.getAttribute("onclick");
		if (onclick == undefined) return;
		if (onclick.indexOf("desc") != -1) {
			AddLinks(onclick, this.parentNode.parentNode, null, thePath);
		}
	});
}

// COUNCIL: Add shortcut links for current quests.
function at_council() {
	if (GetPref('shortlinks') > 1) {
		$('p').each(function() {
			var p = $(this);
			var txt = p.text();
			if (txt.indexOf("Toot") != -1)
				p.append(AppendLink('[toot]', 'tutorial.php?action=toot'));
			else if (txt.indexOf("larva") != -1 && txt.indexOf("Thanks") == -1)
				p.append(AppendLink('[woods]', 'woods.php'));
			else if (txt.indexOf("Typical Tavern") != -1)
				p.append(AppendLink('[Bart Ender]','tavern.php?place=barkeep'));
			else if (txt.indexOf("Boss Bat") != -1)
				p.append(AppendLink('[bat hole]', to_place("bathole")));
			else if (txt.indexOf("Guild") != -1)
				p.append(AppendLink('[guild]', 'guild.php'));
			else if (txt.indexOf("Goblin King") != -1 &&
				txt.indexOf("slaying") == -1)
			{
				var derr = AppendLink('[harem outfit]', equip({a:'outfit',oid:4}));
				p.append(derr);
				if (GetPref('backup') != "") {
					$(derr).children('*:last')
						.attr('href', 'javascript:void(0);').click(function() {
							GM_get(server + equip({a:'customoutfit',oname:GetPref('backup')}),
								function(response) {
									parent.frames[2].location = 'http://' + server
									+ equip({a:'outfit',oid:4});
								});
								return false;
								//event.stopPropagation(); event.preventDefault();
							}
						);
				}
				derr = AppendLink('[guard outfit]', "inv_equip.php" +
					"?action=outfit&which=2&whichoutfit=5");
				p.append(derr);
				if (GetPref('backup') != "") {
					$(derr).children('*:last')
						.attr('href', 'javascript:void(0);').click(function() {
							GM_get(server + equip({a:'customoutfit',oname:GetPref('backup')}),
								function(response) {
									parent.frames[2].location = 'http://' + server + equip({a:'outfit',oid:5});
								});
								return false;
								//event.stopPropagation(); event.preventDefault();
							}
						);
				}
				p.append(AppendLink('[perfume]', inv_use(307)));
				p.append(AppendLink('[knob]', 'cobbsknob.php'));
			}
			else if (txt.indexOf("the Outskirts") != -1)
				p.append(AppendLink('[use map+key]',inv_use(2442)));
			else if (txt.indexOf("Sinister") != -1)
				p.append(AppendLink('[cave]', 'cave.php'));
			else if ((txt.indexOf("Deep Fat") != -1) || (txt.indexOf("Friars") != -1))
				p.append(AppendLink('[copse]', 'friars.php'));
			else if (txt.indexOf("Cyrpt") != -1)
				p.append(AppendLink('[cyrpt]', 'crypt.php'));
			else if (txt.indexOf("the Trapper") != -1)
				p.append(AppendLink('[John, M.D.]', to_place('mclargehuge&action=trappercabin')));
			else if (txt.indexOf("Chasm") != -1)
				p.append(AppendLink('[mountains]', 'mountains.php'));
			else if ((txt.indexOf("Highland Lord") != -1) || (txt.indexOf("Black Angus") != -1)) {
				p.append(AppendLink('[chasm]',to_place('orc_chasm')));
				p.append(AppendLink('[highlands]',to_place('highlands')));
			}
			if (txt.indexOf("invaded!") != -1 || txt.indexOf("pirates") != -1)
			{
				var derr = AppendLink('[swashbuckle]',equip({a:'outfit',oid:9}));
				p.append(derr);
				if (GetPref('backup') != "") {
					$(derr).children('*:last').attr('href', '#')
					.click(function(event) {
						GM_get(server + equip({a:'customoutfit',oname:GetPref('backup')}),
						function(response)
						{
							parent.frames[2].location = 'http://'+server+equip({a:'outfit',oid:9});
						}); return false;
						//event.stopPropagation(); event.preventDefault();
					});
				}
				p.append(AppendLink('[island]', 'island.php'));
			}
			else if (txt.indexOf("garbage") != -1
				&& txt.indexOf("Thanks") == -1)
			{
				if (txt.indexOf("sky") != -1) {
					p.append(AppendLink('[plant bean]',to_place('plains&action=garbage_grounds')));
					top.frames[0].location.reload();
				} else p.append(AppendLink('[beanstalk]', to_place('beanstalk')));
			}
			else if (txt.indexOf("her Lair") != -1)
				p.append(AppendLink('[lair]', 'lair.php'));
			else if (txt.indexOf("Black Forest") != -1)
				p.append(AppendLink('[forest (1)]', snarfblat(111)));
			else if (txt.indexOf("war") != -1 && txt.indexOf("Island") != -1)
				p.append(AppendLink('[island]', 'island.php'));
		});

		$('b').each(function() {
			var b = $(this);
			var txt = b.text();
			if (txt.indexOf("leaflet") != -1)
				b.append(AppendLink('[read]', 'leaflet.php'));
			else if (txt.indexOf("Knob map") != -1)
				b.append(AppendLink('[use map+key]',inv_use(2442)));
			else if ((txt.indexOf("dragonbone") != -1) || (txt.indexOf("batskin") != -1)) {
				b.append(AppendLink('[make belt]', 'craft.php?mode=combine&action=craft&a=676&b=192&pwd=' +
					pwd + '&quantity=1'));
			}
		});
	}
	$('img').each(function() {
		var onclick = this.getAttribute('onclick');
		if (onclick != undefined && onclick.indexOf("desc") != -1)
			AddLinks(onclick, this.parentNode.parentNode, null, thePath);
	});
}

// QUESTLOG: Add MORE shortcut links for current quests!
function at_questlog() {
	// If this ever breaks, the following line will probably be why:
	if (document.links[0].href.indexOf("?which=1") == -1
		&& GetPref('shortlinks') > 1)
	{
		$('b').each(function() {
			var b = $(this);
			var txt = b.text();
			var gotit = true;
			switch (txt) {
				case "Looking for a Larva in All the Wrong Places":
					b.append(AppendLink('[woods]', 'woods.php'));
					break;
				case "Ooh, I Think I Smell a Bat.":
					b.append(AppendLink('[bat hole]', to_place("bathole")));
					break;
				case "The Goblin Who Wouldn't Be King":
					var derr = AppendLink('[disguise]', "inv_equip.php?action=outfit&which=2&whichoutfit=4");
					b.append(derr);
					if (GetPref('backup') != "") {
						$(derr).children('*:last')
						.attr('href', 'javascript:void(0);').click(function() {
							GM_get(server + equip({a:'customoutfit',oname:GetPref('backup')}),
							function(response) {
								parent.frames[2].location = 'http://'+server + equip({a:'outfit',oid:4});
							}); return false;
							//event.stopPropagation(); event.preventDefault();
						});
					}
					b.append(AppendLink('[perfume]', inv_use(307)));
					b.append(AppendLink('[knob]', 'cobbsknob.php'));
					break;
				case "Trial By Friar":
					b.append(AppendLink('[copse]', 'friars.php'));
					break;
				case "Cyrptic Emanations":
					b.append(AppendLink('[cyrpt]', 'crypt.php'));
					break;
				case "Am I My Trapper's Keeper?":
					b.append(AppendLink('[trapz0r]', 'trapper.php'));
					break;
				case "A Quest, LOL":
					b.append(AppendLink('[mountains]', 'mountains.php'));
					var derr = AppendLink('[swashbuckle]', equip({a:'outfit',oid:9}));
					b.append(derr);
					if (GetPref('backup') != "") {
						$(derr).children('*:last')
						.attr('href', 'javascript:void(0);')
						.click(function(event) {
							 GM_get(server + equip({a:'customoutfit',oname:GetPref('backup')}),
							function(response) {
								parent.frames[2].location = 'http://'+server + equip({a:'outfit',oid:9});
							}); return false;
							//event.stopPropagation(); event.preventDefault();
						});
					}
					b.append(AppendLink('[island]', 'island.php'));
					b.append(AppendLink('[bookstore]', 'store.php?whichstore=r'));
					break;
				case "The Rain on the Plains is Mainly Garbage":
					b.append(AppendLink('[beanstalk]', to_place('beanstalk')));
					break;
				case "Never Odd Or Even":
					var subtext = $(this).parent().text(); // contents().get(2).data;
					if (subtext.indexOf("get into the Palindome.") != -1) {  // swash, cove.
					} else if (subtext.indexOf("discovered the fabulous Palindome") != -1) { // talisman, palindome
					} else if (subtext.indexOf("but then you lost it again") != -1) { // lab
					} else if (subtext.indexOf("has agreed to help you nullify") != -1) { // whitey's grove, lab
					} else if (subtext.indexOf("got the Mega Gem") != -1) { // talisman, gem, palindome
					}
					b.append(AppendLink("[o' nam]", 'inv_equip.php?pwd='+pwd+
						"&which=2&slot=3&action=equip&whichitem=486"));
					b.append(AppendLink('[palindome (1)]', snarfblat(119)));
					b.append(AppendLink('[poop deck (1)]', snarfblat(159)));
					break;
				case "A Pyramid Scheme":
					b.append(AppendLink('[beach]', 'beach.php'));
					break;
				case "Gotta Worship Them All":
					b.append(AppendLink('[hidden city]', 'hiddencity.php'));
					break;
				case "In a Manor of Spooking":
					b.append(AppendLink('[ballroom (1)]', snarfblat(109)));
					b.append(AppendLink('[wine cellars]', 'manor3.php'));
					break;
				case "Make War, Not... Oh, Wait":
					b.append(AppendLink("[pre-war island]","island.php"));
					b.append(AppendLink("[post-war island]","bigisland.php"));
					break;
				case "Ooh, I Think I Small a Rat":
					b.append(AppendLink('[tavern]', 'cellar.php'));
					break;
				case "My Other Car is Made of Meat":
					b.append(AppendLink('[untinker]', to_place('forestvillage&action=fv_untinker')));
					b.append(AppendLink('[plains]', to_place('plains')));
					break;
				case "The Wizard of Ego":
					b.append(AppendLink('[plains]', to_place('plains')));
					break;
				case "Me and My Nemesis":
					var subtext = $(this).parent().text();
					if (subtext == undefined) break;
					if (subtext.indexOf("smith an Epic Weapon") != -1) {
						b.append(AppendLink("[casino]","town_wrong.php?place=casino"));
						b.append(AppendLink("[hermit]","hermit.php"));
						b.append(AppendLink("[smith]","craft.php?mode=smith"));
					} else if (subtext.indexOf("defeat Beelzebobo") != -1)
						b.append(AppendLink("[funhouse (1)]",snarfblat(20)));
					else if (subtext.indexOf("head back to your guild") != -1)
						b.append(AppendLink("[guild]","guild.php?place=scg"));
					else if (subtext.indexOf("map to the secret") != -1)
						b.append(AppendLink("[poop deck (1)]",snarfblat(159)));
					else if (subtext.indexOf("arrived at the secret") != -1)
						b.append(AppendLink("[volcano]","volcanoisland.php"));
					else if (subtext.indexOf("Well, you defeated") != -1)
						b.append(AppendLink("[nemesis lair (1)]","adventure.php?snarfblat=??"));
					else if (subtext.indexOf("It took long enough, jeez!") != -1)
						b.append(AppendLink("[cave]","cave.php"));
					break;
				case "A Dark and Dank and Sinister Quest":
					b.append(AppendLink("[cave]","cave.php"));
					break;
				case "What's Up, Doc?":
					b.append(AppendLink("[Harem (1)]",snarfblat(259)));
					b.append(AppendLink("[Elbow (1)]",snarfblat(0)));
					b.append(AppendLink("[Slums (1)]",snarfblat(248)));
					b.append(AppendLink("[Cemetery (1)]",snarfblat(58)));
					break;
				case "Driven Crazy":
					b.append(AppendLink('[plains]', to_place('plains')));
					break;
				case "The Final Ultimate Epic Final Conflict":
					b.html("The Ultimate Showdown Of Ultimate Destiny");
					b.append(AppendLink('[lair]', 'lair.php'));
					break;
// can't process these here, we're doing full-string matching and we don't have %playername and %familiarname available.
//				case "and the Quest for the Holy MacGuffin":
//				case "Go To White Citadel":
				case "I Rate, You Rate":
					var derr = AppendLink('[swashbuckle]', equip({a:'outfit',oid:9}));
					b.append(derr);
					if (GetPref('backup') != "")
					{
						$(derr).children('*:last')
						.attr('href', 'javascript:void(0);')
						.click(function(event)
						{
							GM_get(server + equip({a:'customoutfit',oname:GetPref('backup')}), function(response)
							{   parent.frames[2].location = 'http://'+server + equip({a:'outfit',oid:9})
							}); return false;
							//event.stopPropagation(); event.preventDefault();
						});
					}
					b.append(AppendLink('[cove]', 'cove.php'));
					break;
				case "Toot!":
					b.append(AppendLink('[toot]', 'tutorial.php?action=toot'));
					break;
				case "When Rocks Attack":
					b.append(AppendLink('[Doc G]', 'galaktik.php'));
					break;
				case "Suffering For His Art":
					b.append(AppendLink('[artist]', 'town_wrong.php?place=artist'));
					break;
				case "A Bugbear of a Problem":
					b.append(AppendLink('[bugbear pens (1)]',snarfblat(47)));
					b.append(AppendLink('[barrow (1)]', snarfblat(48)));
					b.append(AppendLink('[shrooms]', 'knoll_mushrooms.php'));
					break;
				case "Out of Your Gourd":
					var subtext = $(this).parent().text();
					if (subtext.indexOf("Back Alley") != -1)
						b.append(AppendLink('[alley (1)]', snarfblat(112)));
					else if (subtext.indexOf("Haunted Pantry") != -1)
						b.append(AppendLink('[pantry (1)]', snarfblat(113)));
					else if (subtext.indexOf("Outskirts") != -1)
						b.append(AppendLink('[outskirts (1)]', snarfblat(114)));
					break;
				case "An Old Guy and The Ocean":
					b.append(AppendLink("[octopus' garden (1)]",snarfblat(190)));
					b.append(AppendLink("[wreck (1)]",snarfblat(191)));
					b.append(AppendLink("[sea monkey castle]","monkeycastle.php"));
					break;
				case "Hey, Hey, They're Sea Monkees":
					b.append(AppendLink("[wreck (1)]",snarfblat(191)));
					b.append(AppendLink("[sea monkey castle]","monkeycastle.php"));
					break;
				case "Primordial Fear":
					b.append(AppendLink('[soup (1)]', snarfblat(204)));
					break;
				case "Hyboria? I don't even...":
					b.append(AppendLink('[jungle (1)]', snarfblat(205)));
					break;
				case "Future":
					b.append(AppendLink('[future (1)]', snarfblat(206)));
					break;
				case "Hammer Time":
					b.append(AppendLink('[alley (1)]', snarfblat(112)));
					break;
				case "Scapegoat":
					break;
				case "The Pretty Good Escape":
					var subtext = $(this).parent().text();
					if      (subtext.indexOf("level 1")) b.append(AppendLink("[level 1 (1)]",snarfblat(51)));
					else if (subtext.indexOf("Level 2")) b.append(AppendLink("[level 2 (1)]",snarfblat(52)));
					else if (subtext.indexOf("Level 3")) b.append(AppendLink("[level 3 (1)]",snarfblat(53)));
					else if (subtext.indexOf("ject 37")) b.append(AppendLink("[subject 37]","cobbsknob.php?level=3&action=cell37"));
					break;
				case "The Quest for the Legendary Beat":
					break;
				case "Repair the Elves' Shield Generator":
					break;
				case "Going Postal":
					break;
				default:
					gotit = false;
					break;
			}
			if (gotit) return;		// did what we need in the switch, don't waste effort down here.
// Here we put all the quests that have variable text in their labels, like %Playername.
			if (txt.indexOf("White Citadel") != -1)
				b.append(AppendLink('[woods]', 'woods.php'));
			else if (txt.indexOf("Azazel in Hell") != -1)
				b.append(AppendLink('[gate (1)]', snarfblat(79)));
			else if (txt.indexOf("Quest for the Holy MacGuffin") != -1) {
				var subtext = $(this).parent().text(); //contents().get(2).data;
				if (subtext.indexOf("find the Black Market") != -1)
					b.append(AppendLink("[black forest (1)]",snarfblat(111)));
				else if (subtext.indexOf("now to hit the Travel Agency") != -1)
					b.append(AppendLink("[shore]",to_place('desertbeach')));
			}
			else if (txt.indexOf("Delivery Service") != -1) {
				b.append(AppendLink("[guild]","guild.php?place=paco"));
				// add link to equip mining gear
				// add link to mine
			}
		});
	}
}

function CompressThrallAndFamiliar(compressLevel) {
    var weight = 0;
    var $fp1 = $('.familiarpick:first');
    var $fp2 = $('.familiarpick:eq(1)');
    var fInfo = $fp2.siblings().text();
    if (!fInfo) return;         // no familiar info found
    fInfo = fInfo.slice(6);     //cut off ", the"
    weight = $fp2.next().children('b').text();
    if (compressLevel == 2) {   //show weight and XP only
        $fp2.siblings('font').find('table').appendTo($fp1.parents('p:first')); //entire XP table, if present
        $fp2.next('font')
            .text('(' + weight + ' lb)')
            .appendTo($fp1);
        $fp2.hide();
    } else {                    //show nothing
        $fp2.parent().hide();
    }
    $fp1.appendTo('b:contains(Familiar)').attr('title',fInfo);

    var tParent = $('b:contains(Thrall)').parent();

    tParent.siblings('font').children('b').text('');    //nuke the name
    var thrallInfo = tParent.siblings('font').text();
    tParent.siblings(':not(img, center, p)').hide();
    tParent.siblings('img:first').attr('title',thrallInfo);
}

// CHARPANE: Find HP, MP, do effects stuff.
function at_charpane() {
	// var centerThing = document.getElementsByTagName('center');
	var imgs = document.images;
	if (imgs.length == 0 || imgs == null) return;
	var compactMode = imgs[0].getAttribute('height') < 60 || imgs[0].getAttribute('src').indexOf("clancy") > -1;
//if clancy is the first image, we're in compact mode, but he's 100 pixels tall, the little bastard.
	var bText = document.getElementsByTagName('b');
	var curHP, maxHP, curMP, maxMP, level, str, advcount, effLink;
	var oldcount = integer(GetCharData('advcount'));
	var effectsDB = {
	'd33505':3,		// confused
	'cb5404':58,	// teleportitis
	'454d46':139,	// purple tongue
	'94e112':140,	// green tongue
	'61c56f':141,	// orange tongue
	'a4a570':142,	// red tongue
	'ec5873':143,	// blue tongue
	'cf4844':144,	// black tongue
	'173a9c':165,	// smooth
	'5e788a':166,	// musk
	'087638':189,	// hotform
	'a3c871':190,	// coldform
	'9574fa':191,	// spookyform
	'9a6852':192,	// stenchform
	'801f28':193,	// sleazeform
	'3e2eed':221,	// chalky hand
	'ec7f2f':275,	// ultrahydrated
	'79289e':292,	// Tetanus
	'15f811':295,	// socialismydia
	'c69907':297,	// temporary amnesia
	'9a12b9':301,	// Cunctatitis
	'ebaff6':357,	// Absinthe-minded
	'91635b':331,	// On The Trail
	'aa5dbf':510,   // Shape Of...Mole!
	'8c2bea':846,   // Transpondent
	'17c22c':549,	// Fishy
	'907cb5':725	// Down the Rabbithole
	};

//	SetData("charname",bText[0].textContent);
    var compressfam = GetPref("compressfam");
    if (compressfam > 0) {
        CompressThrallAndFamiliar(compressfam);
    }

	// Compact Mode
	if (compactMode) {
		var mp=0;
		for (var i=4, len=bText.length; i<len; i++) {
			str = bText[i].textContent;
			var spl = str.split('/');
			if (spl.length > 1) {
				if (mp == 0) {
					curHP = integer(spl[0]);
					maxHP = integer(spl[1]); mp++;
					bText[i].parentNode.previousSibling
						.addEventListener('contextmenu', RightClickHP,true);
				} else {
					curMP = integer(spl[0]);
					maxMP = integer(spl[1]);
					bText[i].parentNode.previousSibling
						.addEventListener('contextmenu',RightClickMP,true);
					break;
				}
			}
		}
		advcount = integer($('a:contains("Adv"):first').parent().next().text());

		var lvlblock = $("center:contains('Lvl.'):first").text();	// this text is always present in compact mode
		//kolproxy fix: icon is suppressed.  look for level the other way if needed.
		if (lvlblock === undefined) lvlblock = $('td:contains("Level"):first').text();
		level = 13;
		if (lvlblock) level = lvlblock.match(/Lvl. (\d+)/)[1];
		SetCharData("level", level);

		SetCharData("currentHP", curHP); SetCharData("maxHP", maxHP);
		SetCharData("currentMP", curMP); SetCharData("maxMP", maxMP);
	} else { // Full Mode
		function parse_cur_and_max(names, data) {
			for each (var name in names) {
				var cur_max = data.shift().split('/').map(integer);
        		SetCharData("current"+ name, cur_max[0]);
				SetCharData("max"    + name, cur_max[1]);
			}
		}
		var lvlblock = $("td:contains('Level'):first").text();
		if (lvlblock) {
			level = lvlblock.match(/Level (\d+)/)[1];
			SetCharData("level", level);
		} else {
			SetCharData("level",13);		// failsafe setting if we couldn't find the level block, generally due to a custom title.
			level = 13;
		}
        var $statusblock = $('img[alt*="Hit Points"]').parent().parent().parent().parent();
        $statusblock.wrap('<div id="statusblock></div>');
        var $statusitems = $statusblock.find('span.black, span.red');
		var data = $.makeArray($statusitems.slice(0, 4)).map(text);
        if (data.length == 2) { //I forget what this was guarding against already.
            data = $.makeArray($('td[valign="center"]').slice(1, 5)).map(text);
        }
        // parse regular hp/mp display
  		parse_cur_and_max(["HP", "MP"], data);
	    //data.shift(); // meat, if MP are present
    	advcount = integer(data[1]); // data[1] will be adv if HP/MP are present
        if (isNaN(advcount)) advcount = integer(data[0]); // data[0] is adv if no MP is on display (e.g. ZombieMaster)

		// Change image link for costumes
		var img = imgs[0];
		if (GetPref('backup')) {
			img.parentNode.parentNode.nextSibling
				.setAttribute('id','outfitbkup');
			img.addEventListener('contextmenu',function(event)
			{	GM_get(server + 'inv_equip.php?action=customoutfit&which=2&outfitname=' +
				GetPref('backup'),function(response)
				{	var msg; if (response.indexOf("custom outfits") == -1) msg = "Outfit Backed Up";
					else msg = "Too Many Outfits";
					document.getElementById('outfitbkup').innerHTML +=
					"<span class='tiny'><center>"+msg+"</center></span>";
				}); event.stopPropagation(); event.preventDefault();
			}, true);
		}

		// Add SGEEA to Effects right-click
		var bEff = $('b:gt(4):contains(Effects)');
		if (bEff.length>0) bEff.get(0).setAttribute("oncontextmenu",
			"top.mainpane.location.href='http://" + server +
			"uneffect.php'; return false;");
	}	// end full mode processing

	if ($('#nudgeblock div:contains("a work in progress")').length > 0) $('#nudgeblock').hide();
    if ($('#nudgeblock div:contains("none")').length > 0) $('#nudgeblock').hide();
    //make this configurable:
    if (GetPref("questbottom") == 1) {
        $('#nudgeblock').appendTo($('center:eq(1)'));
    }

	// Re-hydrate (0)
	var temphydr = integer(GetCharData('hydrate'));

	if (temphydr) {
		if (advcount > oldcount) {
			temphydr+=(advcount-oldcount);
			SetCharData('hydrate', temphydr);
		}
		if (advcount < temphydr) SetCharData('hydrate', false);
		else if (advcount == temphydr) {
			if (compactMode) $('a[href="adventure.php?snarfblat=364"]')
				.after(':<br /><a href="adventure.php?snarfblat=122' +
				'" style="color:red;" target="mainpane">Oasis</a>');
			else $('a[href="adventure.php?snarfblat=364"]')
				.after('<br /><br /><a href="adventure.php?snarfblat=122" '+
			'target="mainpane" style="color:red;">Re-Ultrahydrate</a><br />')
				.parent().parent().attr('align','center');
		}
	}
	SetCharData('advcount', advcount);

	// Poison and other un-effecty things
	SetCharData("phial",0);
	for (i=0,len=imgs.length; i<len; i++) {
		var img = imgs[i], imgClick = img.getAttribute('onclick');
		var imgSrc = img.src.substr(img.src.lastIndexOf('/')+1);
		if (imgSrc == 'mp.gif')
			img.addEventListener('contextmenu', RightClickMP, false);
		else if (imgSrc == 'hp.gif')
			img.addEventListener('contextmenu', RightClickHP, false);
		if (imgClick == null || imgClick.substr(0,4) != "eff(") continue;
		var effName = (compactMode ? img.getAttribute('title') : img.parentNode.nextSibling.firstChild.innerHTML);

		if (imgSrc == 'poison.gif')	{
			img.parentNode.parentNode.setAttribute('name','poison');
			img.addEventListener('contextmenu', function(event)	{
				document.getElementsByName('poison')[0].childNodes[1].innerHTML = "<i><span style='font-size:10px;'>Un-un-unpoisoning...</span></i>";
				GM_get(server+'api.php?what=inventory&for=MrScript',function(response) {			// see if we have some anti-anti-antidote onhand
					var invcache = $.parseJSON(response); //eval('('+response+')');
					var antianti = invcache[829];
					if (antianti === undefined) antianti = 0;
					if (antianti > 0) {
						GM_get(server + inv_use(829),function(event)	// yes: use it.
						{
							top.frames[1].location.reload();
						});
					}	else {																		// no: buy it
						GM_get(server+'galaktik.php?howmany=1&action=buyitem&whichitem=829&pwd='+pwd,
						function(result)
						{
							if (result.indexOf('acquire') != -1)									// buy success: use it.
								GM_get(server + inv_use(829),function(event)
								{	top.frames[1].location.reload(); });
						});
					}
				}); event.stopPropagation(); event.preventDefault();
			}, false);
		}
		else // if (img.getAttribute('oncontextmenu') == null)
		{
			var hydr = false;

			// Effect descIDs are 32 characters?? Bah, I'm not using strings that long. Six characters will do.
			var effNum = effectsDB[imgClick.substr(5,6)];
			if (effNum == undefined) continue;
			switch (effNum) {
				case 275: // hydrated
					var hydtxt = img.parentNode.nextSibling.textContent;
					if (/\(1\)/.test(hydtxt)) {			// 1 turn left?  set marker to add rehydrate link next adventure.
						SetCharData('hydrate', advcount-1);
                    }
					else if (/\(5\)/.test(hydtxt) || /\(20\)/.test(hydtxt))		// got 5 turns (or 20 from clover) now?  add Desert link.
					{	if (compactMode) $('a[href="adventure.php?snarfblat=122"]')
						.after(':<br /><a href="adventure.php?' +
						'snarfblat=364" target="mainpane">' +
						'Desert</a>');
						else $('a[href="adventure.php?snarfblat=122"]')
						.after('<br /><br /><a href="adventure.php?' +
						'snarfblat=364" target="mainpane">' +
						'The Arid, Extra-Dry Desert</a><br />')
						.parent().parent().attr('align','center');
					}
					break;

				case 221: // chalk: right-click to use more
					var func = "top.mainpane.location.href = 'http://";
					func += server + inv_use(1794) + '; return false; ';
					if (img.getAttribute('oncontextmenu') == null) img.setAttribute('oncontextmenu', func);
					break;

				case 357:	// absinthe-minded: link to wormwood; light up on 9/5/1 turns left.
					var abstxt = img.parentNode.nextSibling.textContent;
					var fontA, fontB;
					if (/\(9/.test(abstxt) || /\(5/.test(abstxt) || /\(1\)/.test(abstxt)) { fontA = '<font color="red">'; fontB = '</font>'; }
					else { fontA = ''; fontB = ''; }
					img.parentNode.nextSibling.innerHTML = '<a target=mainpane href="' +
						to_place("wormwood") + '">' + fontA + '<b>' +
						img.parentNode.nextSibling.innerHTML + '</b>' + fontB + '</a>';
					break;
				case 510:
					$(img).parent().next().children('font').wrap('<a target=mainpane href="mountains.php" />');
					break;
				case 725:
					$(img).parent().next().children('font').wrap('<a target=mainpane href="'+to_place('rabbithole') + '"/>');
					break;
				case 549:
					var fishyturns = img.parentNode.nextSibling.textContent;
					if (/\(1\)/.test(fishyturns)) {  // last turn of fishy?
						$(img).parent().next().wrap('<font color="red" />');
					}
					break;

				case 189: case 190: case 191: case 192: case 193:
					SetCharData("phial", effNum);
					break;
				case 846:
					var transtext = img.parentNode.nextSibling.textContent;
					img.parentNode.nextSibling.innerHTML = '<a target=mainpane href="' + to_place('spaaace&arrive=1') +
						'">' + img.parentNode.nextSibling.innerHTML + '</a>';
					break;
				default:
					if (effName == undefined) effName = "";
					func = "if (confirm('Uneffect "+effName+"?')) top.mainpane.location.href = 'http://";
					func += server + "uneffect.php?using=Yep.&whicheffect="+effNum+"&pwd="+pwd+"';return false;";
					if (img.getAttribute('oncontextmenu') == null) img.setAttribute('oncontextmenu', func);
					break;
			}
		}
	}
}

// SKILLPAGE: Autofill the proper "maxed-out" number in the use box.
function at_skills() {
	var miniSkills = document.location.search.indexOf("tiny=1") != -1;
	var inputStuff = document.getElementsByTagName("input");
	var noDisable = GetPref('nodisable');

	// Remove stupid "The " from menu
	if (miniSkills) {
		var sel = document.getElementsByTagName("select")[0];
		var json = "{";
		for (var i=0, len=sel.childNodes.length; i<len; i++) {
			var s = sel.childNodes[i];
			//s.setAttribute('style','max-width:180px;'); //this doesn't work anymore???
			var temp = s.value;
			// Store healing spells
			if (temp == 3012 || temp == 1010 || temp == 5011
			 || temp == 1007 || temp == 5007 || temp == 3009)
				json += ('"'+temp+'":1,');
			if (noDisable > 0 && sel.childNodes[i].getAttribute('disabled') != null) {
				switch(integer(temp)) {
					case 3: case 16: case 17: case 4006: case 5014: case 3006:
						break;
					default: sel.childNodes[i].removeAttribute('disabled');
						break;
				}
			}
			if (temp < 6004 || sel.childNodes[i].tagName == "OPTGROUP")
				continue;
			if (temp == 6004 || temp == 6006 || temp == 6007 || temp == 6008
				|| temp == 6011 || temp == 6014 || temp == 6015)
				sel.childNodes[i].innerHTML = sel.childNodes[i].innerHTML.substr(4);
		}
		if (json == '{') json = ''; else json += '}';
		SetCharData("hplist", json);
	}

	// Store list of restoratives we care about
	var vich = document.getElementsByName("whichitem");		// the MP-restorers item dropdown.
	if (vich[0] != undefined) {
		var json = "{"; var opt = vich[0].childNodes;
		for (i=0, len=opt.length; i<len; i++) {
			var optval = opt[i].value; var temp;
			switch (integer(optval)) {
				case 344: case 1559: case 518: case 1658: case 1659: case 1660: case 2639:
					if (opt[i].innerHTML.indexOf('(') == -1) temp = 1;
					else {
						temp = opt[i].innerHTML.split('(')[1];
						temp = temp.split(')')[0];
					}
					json += "\""+optval+"\":"+temp+",";
					break;
				default:
					break;
			}
		}
		if (json == '{') json = ""; else json += "}";
		SetCharData("mplist",json);
	}

	for (var i=0, len=inputStuff.length; i<len; i++) {
		var temp = inputStuff[i];

		// Attach maximum skills event handler and "Max" button
		if (temp.value == "1" && temp.name == "quantity") {
			temp.addEventListener('keydown', function(event) {
				if (event.which == 77 || event.which == 88 || event.which == 72) // 'm', 'x', 'h'
				{
					var selectItem = document.getElementsByName('whichskill')[0];
					var cost = ParseSelectQuantity(selectItem, " ");
					var limit = SkillUseLimit(selectItem.options[selectItem.selectedIndex].value);
					var val = integer(GetCharData("currentMP") / cost);
					if (event.which == 72) val = integer(val/2); // half
					if (val > limit) this.value = limit;
					else this.value = val;
					event.stopPropagation(); event.preventDefault();
				} else if (ENABLE_QS_REFRESH == 1 && event.which == 82) self.location.reload();	// 'r'
			}, true);

			if (!miniSkills && temp.getAttribute('id') != 'skilltimes') {
				MakeMaxButton(temp, function(event) {
					var selectItem = document.getElementsByName('whichskill')[0];
					var box = document.getElementsByName('quantity')[0];
					var cost = ParseSelectQuantity(selectItem, " ");
					var limit = SkillUseLimit(selectItem.options[selectItem.selectedIndex].value);
					var val = integer(GetCharData("currentMP") / cost);
					if (val > limit) box.value = limit;
					else box.value = val;
				});
			}
		}

		// Attach maximum buffs event handler and "Max" button
		if (temp.value == "1" && temp.name == "bufftimes") {
			var padding = document.createElement('div');
			padding.setAttribute('style','padding-top: 4px');
			temp.parentNode.insertBefore(padding, temp);
			temp.addEventListener('keydown', function(event) {
				if (event.which == 77 || event.which == 88) // 77 = 'm', 88 = 'x'
				{
					var selectItem = document.getElementsByName('whichskill')[1];
					var cost = ParseSelectQuantity(selectItem, " ");
					this.value = integer(GetCharData("currentMP") / cost);
					event.stopPropagation(); event.preventDefault();
				}
			}, true);
			MakeMaxButton(temp, function(event) {
				var selectItem = document.getElementsByName('whichskill')[1];
				var box = document.getElementsByName('bufftimes')[0];
				var cost = ParseSelectQuantity(selectItem, " ");
				box.value = integer(GetCharData("currentMP") / cost);
			});
		}

		// Attach maximum items event handler and "Max" button
		if (temp.value == "1" && temp.name == "itemquantity") {
			temp.addEventListener('keyup', function(event) {
				if (event.which == 77 || event.which == 88 || event.which == 72) // 77 = 'm', 88 = 'x', 72 = 'h'
				{
					var selectItem = document.getElementsByName('whichitem')[0];
					var quant = ParseSelectQuantity(selectItem, ")");
					var index = selectItem.selectedIndex;
					var val = FindMaxQuantity(selectItem.options[index].value, quant, 0, GetPref('safemax'));
					if (event.which == 72) val = integer(val/2); // half
					this.value = val;
					event.stopPropagation(); event.preventDefault();
				}
				else if (ENABLE_QS_REFRESH == 1 && event.which == 82) self.location.reload();	// 82 = 'r'
			}, false);

			if (!miniSkills) {
				MakeMaxButton(temp, function(event) {
					var selectItem = document.getElementsByName('whichitem')[0];
					var index = selectItem.selectedIndex;
					var box = document.getElementsByName('itemquantity')[0];
					var quant = ParseSelectQuantity(selectItem, ")");
					box.value = FindMaxQuantity(selectItem.options[index].value, quant, 0, GetPref('safemax'));
				});
			}
			break;
		}
	}
}

// MULITUSE: Autofill the proper "maxed-out" number in the use box.
function at_multiuse() {
	var inputStuff = document.getElementsByTagName("input");
	for (var i=0, len=inputStuff.length; i<len; i++) {
		var temp = inputStuff[i];
		if (temp.name == "quantity") {
			temp.addEventListener('keydown', function(event) {
				if (event.which == 77 || event.which == 88) // 'm', 'x'
				{
					this.value = "";
					//event.stopPropagation(); event.preventDefault();
				}
			}, true);

			temp.addEventListener('keyup', function(event) {
				if (event.which == 77 || event.which == 88) // 77 = 'm', 'x'
				{
					var selectItem = document.getElementsByName("whichitem")[0];
					var quant = ParseSelectQuantity(selectItem, ")");
					var index = selectItem.selectedIndex;
					this.value = FindMaxQuantity(selectItem.options[index].value, quant, 1, GetPref('safemax'));
				} event.stopPropagation(); event.preventDefault();
			}, false);

			MakeMaxButton(temp, function(event) {
				var box = document.getElementsByName('quantity')[0];
				var selectItem = document.getElementsByName('whichitem')[0];
				var quant = ParseSelectQuantity(selectItem, ")");
				var index = selectItem.selectedIndex;
				box.value = FindMaxQuantity(selectItem.options[index].value, quant, 1, GetPref('safemax'));
			});
			break;
		}
	}
}

// MR. KLAW: Mr. Vanity Klaw
function at_clan_rumpus() {
	if (document.location.search == "?action=click&spot=3&furni=3" && GetPref('klaw') == 1) {
		var tr = $('table:first tr:first:contains("Results")');
		if (tr.length > 0) {
			txt = tr.next().text();
			if (txt.indexOf("wisp of smoke") == -1 &&
				txt.indexOf("broken down") == -1 &&
				txt.indexOf("claw slowly descends") != -1)
			window.setTimeout('self.location = "http://' + server +
				'clan_rumpus.php?action=click&spot=3&furni=3";',500);
		}
	}
}


// MR. VIP KLAW: look, more stuffies
function at_clan_viplounge() {
	if (document.location.search == "?action=klaw" && GetPref('klaw') == 1) {
		var tr= $('table:first tr:first:contains("Results")');
		if (tr.length > 0) {
			txt = tr.next().text();
			if (txt.indexOf("You probably shouldn't play") == -1)  {
				window.setTimeout('self.location = "http://' + server +
				'clan_viplounge.php?action=klaw";',500);
			}
		}
	}
	else if (document.location.search == "?action=shower") {
		$('option').each(function(){
			var tt = $(this).text();
			var addme;
			switch (this.value) {
				case "1": addme = ' (3-4 shards of double ice)'	; break;
				case "2": addme = ' (50 turns of +5% moxie)'	; break;
				case "3": addme = ' (50 turns of +5% myst)'		; break;
				case "4": addme = ' (50 turns of +5% muscle)'	; break;
				case "5": addme = ' (+1000 MP, chance of a recipe)'	; break;
				default:  addme = ' (???)'						; break;
			}
			$(this).text(tt + addme);
		});
	}
}

// CHARSHEET: decode resistance level text.
function at_charsheet() {

	InlineItemDescriptions();

	// see if the character qualifies for the Myst-Class innate 5% resistance bonus...
	var mystBonus = 0;
	var HPMPstats = $("table table table td:lt(10)").text();
	if (HPMPstats.indexOf("Mana Points") != -1) mystBonus = 5;

	$('td:contains("Protection"):not(:has(table))').each(function() {
		var pstring = $(this).next().text();
		var resistance = 0;
		var ProtNum = 0;
		var PLevels = ["Very Low","Low","Moderate","Considerable"];
		for (var j = 0; j < 4; j++) {
			if (pstring.indexOf(PLevels[j]) != -1) {
				ProtNum = j+1;
				resistance = ProtNum * 10;
				break;
			}
		}
		if (ProtNum == 0) {	// it wasn't any of the easy ones
			ProtNum = 5;	// so it must be "(...) High"
			// additive modifiers
			if (pstring.indexOf("Very") != -1) ProtNum += 1;
			if (pstring.indexOf("Really") != -1) ProtNum += 1;
			if (pstring.indexOf("Extremely") != -1) ProtNum += 3;
			// exclusive modifiers
			if (pstring.indexOf("Amazingly") != -1) ProtNum += 6;
			else if (pstring.indexOf("Extraordinarily") != -1) ProtNum += 12;
			else if (pstring.indexOf("Incredibly") != -1) ProtNum += 18;
			else if (pstring.indexOf("Staggeringly") != -1) ProtNum += 24;
			else if (pstring.indexOf("Mind-bogglingly") != -1) ProtNum += 30;
			else if (pstring.indexOf("Inconceivably") != -1) ProtNum += 36;
			else if (pstring.indexOf("Unthinkably") != -1) ProtNum += 42;
			else if (pstring.indexOf("Indescribably") != -1) ProtNum += 48;
			else if (pstring.indexOf("Impossibly") != -1) ProtNum += 54;
//			if (pstring.indexOf("" != -1) ProtNum += 0;
			resistance = 90 - (50*Math.pow(0.83333333,ProtNum-4));
		}
		resistance += mystBonus;
		resistance += '';	// convert to a string
		resistance = resistance.substring(0,5);	// and chop to at most 2 decimal places
		$(this).next().html($(this).next().html()+" (Lvl " + ProtNum + ", "+resistance + "%)");
	});
}

// THESEA: if the sea is not present, talk to the old man.
function at_thesea() {
	if (document.body.textContent.indexOf("Uh Oh!") != -1)
		mainpane_goto(to_place("sea_oldman&action=oldman_oldman"));
//	if (document.body.textContent.length == 0)
//		mainpane_goto('/oldman.php?action=talk');
}

// OLDMAN: If the old man is not present, put up a SCUBA gear reminder.
function at_oldman() {
	if (document.body.textContent.length == 0) {
		var style = $(document.createElement('style'))
			.attr('type', 'text/css')
			.html("body {font-family: Arial, Helvetica, sans-serif; background-color: white; color: black;} " +
			"td {font-family: Arial, Helvetica, sans-serif;} input.button {border: 2px black solid; " +
			"font-family: Arial, Helvetica, sans-serif; font-size: 10pt; font-weight: bold; background-color: #FFFFFF;}");
		//document.firstChild.firstChild.appendChild(style);
		$('head').append(style);

		var tabl = $(document.createElement('table'))
			.attr('width','95%')
			.attr('style','font-family: Arial, Helvetica, sans-serif')
			.attr('cellspacing','0')
			.attr('cellpadding','0')
			.append(document.createElement('tbody'));
		tabl.children('tbody')
			.append(document.createElement('tr'))
			.append(document.createElement('tr'));
		var td = $(document.createElement('td'))
			.attr('bgcolor','blue')
			.attr('align','center')
			.attr('style','color: white;')
			.html('<b>No old man, see?</b>');
		tabl.find('tbody tr:first').append(td);
		td = $(document.createElement('td'))
			.attr('style','border: 1px solid blue; padding: 5px;')
			.attr('align','center')
			.append('<p>You need some makeshift SCUBA gear, matey.<br>');
		tabl.find('tbody tr:eq(1)').append(td);
		var centre = $(document.createElement('center'))
			.append(tabl);
		$('body').append(centre);
	}
}

function at_spookyraven1() {
    if (document.body.textContent.indexOf("know where that is.") != -1) {
        mainpane_goto('/town_right.php');
    }
	else if (GetPref('zonespoil') == 1) {
		$('img').each(function() {
			var img = $(this);
			var src = img.attr('src');
			if (src.indexOf("sm1.gif") != -1)
				img.attr('title','ML: 105-115');
			else if (src.indexOf("sm4.gif") != -1)
				img.attr('title','ML: 20');
			else if (src.indexOf("sm3.gif") != -1)
				img.attr('title','ML: 7-9');
			else if (src.indexOf("sm6.gif") != -1)
				img.attr('title','ML: 3-5');
			else if (src.indexOf("sm7.gif") != -1)
				img.attr('title','ML: 49-57');
			else if (src.indexOf("sm9.gif") != -1)
				img.attr('title','ML: 1-2');
		});
	}
}
// MANOR: If manor is not present, redirect to town.
function at_manor() {
	if (document.body.textContent.length == 0)
		mainpane_goto('/town_right.php');
	else if (GetPref('zonespoil') == 1) {
		$('img').each(function() {
			var img = $(this);
			var src = img.attr('src');
			if (src.indexOf("sm1.gif") != -1)
				img.attr('title','ML: 105-115');
			else if (src.indexOf("sm4.gif") != -1)
				img.attr('title','ML: 20');
			else if (src.indexOf("sm3.gif") != -1)
				img.attr('title','ML: 7-9');
			else if (src.indexOf("sm6.gif") != -1)
				img.attr('title','ML: 3-5');
			else if (src.indexOf("sm7.gif") != -1)
				img.attr('title','ML: 49-57');
			else if (src.indexOf("sm9.gif") != -1)
				img.attr('title','ML: 1-2');
		});
	}
}

// MANOR3: display wine-bottle glyph info.
function at_manor3() {
	at_spookyraven3();
} // FIXME: which one?

function at_spookyraven3() {
// basic spoilers, part 1: display glyphs while selecting the wines.
	var wineDB = {'2275':'278847834','2271':'163456429','2276':'147519269',
				  '2273':'905945394','2272':'289748376','2274':'625138517'};

// new way: use the glyph info we scraped once while building the wine list.
	$('select:first').change(function()	{
	var winelist = $.parseJSON(GetCharData("winelist"));	// {2271:["name",glyphid], 2272:["name",glyphid], etc.}
	var wine = this.childNodes[this.selectedIndex].value;
		if (wine > 0) {
			var glyph = $('#daglyph');
			if (glyph.length == 0) {		// if it doesn't exist, add it.
				$('select:first').parent().parent().append(
					$(document.createElement('img')).attr('id', 'daglyph'));
				glyph = $('#daglyph');
			}
			glyph.attr('src',
				'http://images.kingdomofloathing.com/' +
				'otherimages/manor/glyph'+winelist[wine][1]+'.gif');
		}
	});

// basic spoilers, part 2: link to equip spectacles when needed.
// this part is all-but-unnecessary, only being needed on someone's first runthrough, but
// we'll leave it here on the off chance that someone uses Mr. Script that early in their KoL career.
	$('img[src*="lar2a"]')
		.attr('title','Click to Equip Spectacles')
		.attr('border','0')
		.wrap('<a target="mainpane" href="inv_equip.php?pwd=' +
			pwd + '&which=2&action=equip&whichitem=1916&slot=3"></a>');

// advanced spoilers:
// phase 1: generate "which wine is in which corner" spoilage.

	var winelist = [];
	var wineeffectlist = {
		1:"3-4 adv/2 drunk",
		2:"Effect: Full of Vinegar",
		3:"3-4 adv/2 drunk, Effect: Kiss of the Black Fairy",
		4:"5-7 adv/2 drunk",
		5:"3-4 adv/2 drunk, lose 60-70% of maxHP",
		6:"0 adv/2 drunk, lose 80-90% of maxHP"
	};
	var wineConfig = {
		0:[25,"Merlot, Pinot Noir, Port"],          //25 = 011001
		1:[42,"Marsala, Pinot Noir, Zinfandel"],    //42 = 101010
		2:[52,"Muscat, Port, Zinfandel"],           //52 = 110100
		3:[7,"Marsala, Merlot, Muscat"]             // 7 = 000111
	};
	var CornerSpoilers = document.createElement('table');
	CornerSpoilers.setAttribute('border','1');

	// get the what-dropped-where info that we grabbed in at_fight().
	var NW = GetCharData("corner178"); if (NW === undefined) NW = 0;
	var NE = GetCharData("corner179"); if (NE === undefined) NE = 0;
	var SW = GetCharData("corner180"); if (SW === undefined) SW = 0;
	var SE = GetCharData("corner181"); if (SE === undefined) SE = 0;
	// load it up into an array for comparing "what-dropped-where" with "what-combos-are-possible".
	var oldsum = 0;
	var newsum = 0;
	var match = {178:[0,0,0,0,0],179:[0,0,0,0,0],180:[0,0,0,0,0],181:[0,0,0,0,0],182:[0,0,0,0,0]};
	for (i=0;i<4;i++) {
		match[178][i] = ((NW | wineConfig[i][0]) == wineConfig[i][0])? 1: 0;
		match[179][i] = ((NE | wineConfig[i][0]) == wineConfig[i][0])? 1: 0;
		match[180][i] = ((SW | wineConfig[i][0]) == wineConfig[i][0])? 1: 0;
		match[181][i] = ((SE | wineConfig[i][0]) == wineConfig[i][0])? 1: 0;
	}
	for (n=178;n<182;n++) {				// calculate the "sum-of" data.  If the total of the first 4 columns is 1, this row is
		for (i=0; i<4; i++) {			// fully ID'd--only 1 possible configuration matches what dropped.  Conversely, if the
			match[n][4] += match[n][i];	// total of the first 4 row entries is 1, only 1 drop pattern is left that can fit that
			match[182][i] += match[n][i];	// configuration.
			newsum = newsum + match[n][i];
		}
	}

	// reduce the matrix of drops-vs.-possibilities to its most-restricted form:
	while (oldsum != newsum) {
		oldsum = newsum;
		// reduce the matrix of possibilities row-wise
		for (check=178; check<182; check++) {
			if (match[check][4] == 1) {								// fully-ID'd row?
				for (i=0; i<4; i++) if (match[check][i]) break;		// find the set ID column
				for (set=178; set<182; set++) {						// unset it in all the other rows
					if (set==check) continue;						// I said all the OTHER rows, see?
					if (match[set][i] == 1) {						// if it's set,
						match[set][4] -= 1;							//    decrement the sum-of-array total
						match[182][i] -= 1;							//    and the other sum-of-array total
						newsum--;									//    and the sum-of-sum total
						match[set][i] = 0;							//    and unset it.
					}
				}
			}
		}
		// and then reduce it column-wise
		for (check=0;check<4;check++) {
			if (match[182][check] == 1) {								// fully-ID'd column?
				for (j=178;j<182; j++) if (match[j][check]) break;		// find the set ID row
				for (set=0; set<4; set++) {							// unset it in all the other columns
					if (set==check) continue;						// I said all the OTHER columns, see?
					if (match[j][set] == 1) {						// if it's set,
						match[j][4] -= 1;							//    decrement the sum-of-array total
						match[182][set] -= 1;						//    and the other sum-of-array total
						newsum--;									//    and the sum-of-sum total
						match[j][set] = 0;							//    and unset it.
					}
				}
			}
		}
	}

	// convert array of drop possibilities into a list of corners for display.
	var possibilities = ["","","",""];
	var cornername = {178:" NW ", 179: " NE ", 180:" SW ", 181:" SE "};
	for (i=0; i<4; i++) {
		for (n=178; n<182; n++) if (match[n][i] == 1) possibilities[i] += cornername[n];
	}

	// build the display table.
	var th1 = document.createElement('th');
	th1.textContent = "this set of wines:";
	CornerSpoilers.appendChild(th1);
	th1 = document.createElement('th');
	th1.textContent = "could be in the:";
	CornerSpoilers.appendChild(th1);

	var tr1;
	var td1;
	for (i=0;i<4;i++) {
		tr1 = document.createElement('tr');
		td1 = document.createElement('td');
		td1.textContent = wineConfig[i][1];
		tr1.appendChild(td1);
		td1 = document.createElement('td');
		td1.textContent = possibilities[i];
		tr1.appendChild(td1);
		CornerSpoilers.appendChild(tr1);
	}

// phase 2: get info about which wine is which glyph this run
	// helper function 1: get the glyph info out of a wine's description page
	function scrape(txt) {
		var bottleOf = txt.match(/dusty bottle of (.*?)\</)[1];
		var glyphNum = txt.match(/\/glyph([0-9])/)[1];
		var bInfo = [bottleOf, glyphNum];
		return bInfo;
	}
	// helper function 2: check player inventory for quantity of wines.
	function countWines(wl, needs) {
	// wl is an array of bInfo's from the scrape() function; needs is an array of the wine IDs that are required for the altar.
		GM_get(server+'api.php?what=inventory&for=MrScript',function(response) {	// was: js_inv.php?for=MrScript
			if (response[0] != '{') {
				var i1 = response.split('inventory = ')[1].split(';')[0];	// should get everything from { to }, inclusive.
				response = i1;
			}
			var invcache = $.parseJSON(response);
			var dustyX;
			var dustylist = new Array();
			for (var i=2271; i<2277; i++) {
				dustyX = invcache[i]; if (dustyX === undefined) dustyX = 0;
				dustylist[i] = dustyX;
			}
			var youNeed = "You need: ";
			if (needs[0] == undefined) {	// may be undefined due to calling this function after the altar is completed.
				youNeed = "";
			} else {
				for (i=0;i<3;i++) {
					youNeed += winelist[needs[i]][0];
					youNeed += " (you have "+dustylist[needs[i]]+"), ";
				}
				youNeed = youNeed.slice(0, -2);
			}
			getWinelist.innerHTML = youNeed;
		});
	}

	var wineDisplay = document.createElement('table');
	wineDisplay.setAttribute('id','wineDisplay');
	wineDisplay.setAttribute('cellpadding','2');
	wineDisplay.setAttribute('width','95%');
	wineDisplay.style.display = "none";

	function toggleDisplay() {
		if (wineDisplay.style.display == "none") {
			wineDisplay.style.display = "block";
		} else {
			wineDisplay.style.display = "none";
		}
	}

	var wineToggler = document.createElement('span');
	var wtl = document.createElement('u');
	wtl.textContent = "[Toggle Wine List display]";
	with (wineToggler) {
		appendChild(wtl);
		className = "toggler";
		addEventListener('click',toggleDisplay,'true');
	}

	var getWinelist = document.createElement('p');
	document.body.appendChild(getWinelist);
	document.body.appendChild(CornerSpoilers);
	document.body.appendChild(wineToggler);
	getWinelist.innerHTML='Checking wine information....';


	var wineHTML = GetCharData("wineHTML");
	var winesneeded;
	if (wineHTML != undefined && wineHTML.length > 0) {	// If we already did this the long way, just display the saved results.
		wineDisplay.innerHTML = wineHTML;
		winelist = $.parseJSON(GetCharData("winelist"));
		winesneeded = $.parseJSON(GetCharData("winesNeeded"));
		document.body.appendChild(wineDisplay);
		countWines(winelist, winesneeded);
	} else {											// No saved results: Better do it the long way....
		GM_get(server+"manor3.php?place=goblet", function (atext) {	// check the altar for the glyphs we need
			var pdiv = document.createElement('div');
			pdiv.innerHTML = atext;
			var glimgs = pdiv.getElementsByTagName('img');
			var glyphids = new Array();
			if (glimgs[0].getAttribute('src').indexOf('cellar1') != -1) {	// no glyphs?!  You must be missing something.
				getWinelist.innerHTML =
					"You need: Lord Spookyraven's spectacles! <font size='2'><a href=adventure.php?snarfblat=108>[bedroom (1)]</a></font>";
				return;
			} // else...
			if (atext.indexOf("Nothing more to see here.") == -1) {	// make sure we're not trying this after the chamber has been emptied
				glyphids[0] = glimgs[0].getAttribute('src').match(/(?:otherimages\/manor\/glyph)(\d)/)[1];
				glyphids[1] = glimgs[1].getAttribute('src').match(/(?:otherimages\/manor\/glyph)(\d)/)[1];
							//glimgs[2] is the big encircled-triangle in the middle.
				glyphids[2] = glimgs[3].getAttribute('src').match(/(?:otherimages\/manor\/glyph)(\d)/)[1];
			}
			GM_get(server+"desc_item.php?whichitem="+wineDB[2271], function(b1) {	// get the glyph number off the wine descriptions
				winelist[2271]=scrape(b1);
				GM_get(server+"desc_item.php?whichitem="+wineDB[2272], function(b2) {
					winelist[2272] = scrape(b2);
					GM_get(server+"desc_item.php?whichitem="+wineDB[2273], function(b3) {
						winelist[2273] = scrape(b3);
						GM_get(server+"desc_item.php?whichitem="+wineDB[2274], function(b4) {
							winelist[2274] = scrape(b4);
							GM_get(server+"desc_item.php?whichitem="+wineDB[2275], function(b5) {
								winelist[2275] = scrape(b5);
								GM_get(server+"desc_item.php?whichitem="+wineDB[2276], function(b6) {
									winelist[2276] = scrape(b6);
									wineDisplay.innerHTML = "<tr><th>Name:</th><th>Glyph:</th><th>Effect:</th></tr>";
									for (var i=2271;i<2277;i++) {
										wineDisplay.innerHTML += "<tr><td align=center>" + winelist[i][0]+"</td><td align=center>"+
										"<img src=http://images.kingdomofloathing.com/otherimages/manor/glyph"+winelist[i][1]+".gif"+
										" </td><td>Yields "+wineeffectlist[winelist[i][1]]+"</td></tr>";
									}
									document.body.appendChild(wineDisplay);

									// this was an expensive process, let's only do it once.  Save the table display:
									SetCharData("wineHTML",wineDisplay.innerHTML);
									// and save the list of wine->glyph mappings and the list of which wines we actually need.
									var json = "{"; var json2 = "{";
									for (i=2271;i<2277;i++) {
										for (j=0;j<glyphids.length;j++)
										if (winelist[i][1] == glyphids[j]) json = json + j + ":" + i + ",";
										json2 = json2 + i+':["'+winelist[i][0]+'",'+winelist[i][1]+'],';
									}
									json = json + "}"; json2 = json2 + "}";
									SetCharData("winesNeeded",json);
									SetCharData("winelist",json2);
									winesneeded = $.parseJSON(json);
									countWines(winelist, winesneeded);
								});
							});
						});
					});
				});
			});
		});
	}
}

// PALINSHELVES: fill in the correct choices to summon Dr. Awkward.
function at_palinshelves() {
	for (var i=0,len=document.images.length; i<len; i++) {
		var img = document.images[i];
		var onclick = img.getAttribute("onclick");
		if (onclick != undefined && onclick.indexOf("desc") != -1)
			AddLinks(onclick, img.parentNode.parentNode, null, thePath);
	}
	var sels = document.getElementsByTagName('select');
	if (sels.length > 0) {
		sels[0].value = 2259; sels[1].value = 2260;
		sels[2].value = 493; sels[3].value = 2261;
	}
}

function at_pandamonium() {
	var gotitem = $('.effect > b').text();
	if (gotitem == "Azazel's unicorn") SetCharData("pandabandsolved",false);	// defensive clear for next time through
	if (document.location.search=='?action=sven')	{
		var bognort = 0, stinkface = 0, flargwurm = 0, jim = 0;
		var pandasolved = GetCharData("pandabandsolved");
		if ((pandasolved == false) || (pandasolved == undefined)) {	// no solution found yet?
			var itemlist = $('select[name="togive"]');
			var set1 = 0, set2 = 0;
			var bear = false, paper = false, marsh = false;
			var cake = false, cherry = false, pillow = false;
			itemlist.children().each(function(){
				var myval = integer(this.value);
				switch (myval) {
					case 4670: set1++; bear = true; break;
					case 4673: set1++; marsh = true; break;
					case 4675: set1++; paper = true; break;
					case 4671: set2++; cherry = true; break;
					case 4672: set2++; pillow = true; break;
					case 4674: set2++; cake = true; break;
					default: break;
				}
			});
			if ((set1 < 2) || (set2 < 2)) {
				$('form[name="bandcamp"]').prepend('<p><font color="blue">No solution available yet.</font></p>');
				$('select').attr('style','color:red');
			} else {	// >=2 of each set available-- solve it!
				if (marsh) bognort = 4673; // "marshmallow"; //4673;
				else bognort = 4675; // "blotter paper"; // 4675;
				if (bear) stinkface = 4670; // "bear"; // 4670;
				else stinkface = 4675; // "blotter paper"; // 4675;
				if (cherry) flargwurm = 4671; // "cherry"; // 4671;
				else flargwurm = 4674; // "cake"; // 4674;
				if (pillow) jim = 4672; // "pillow"; // 4672;
				else jim = 4674; // "cake"; // 4674;
				SetCharData("bognort",bognort);
				SetCharData("stinkface",stinkface);
				SetCharData("flargwurm",flargwurm);
				SetCharData("jim",jim);
				SetCharData("pandabandsolved",true);
				at_pandamonium();	// process and present our new solution, I hope
			}
		} else {	// time to implement the solution!
			bognort = GetCharData("bognort");
			stinkface = GetCharData("stinkface");
			flargwurm = GetCharData("flargwurm");
			jim = GetCharData("jim");
			$('form[name="bandcamp"]').prepend('<p><font color="blue">Solution found!  Click [Give It]!</font></p>');
			var members = $('select[name="bandmember"]');
			var items = $('select[name="togive"]').get(0);
// this is ugly-looking, but solid.
			members.val("Bognort");				// Try to select this bandmember.
												// (This will fail if he already got his item.)
			if (members.val()=="Bognort") { 	// were we able to select him successfully?
				items.value = bognort; 			// select his item.
				members.attr('style','color:green');
				items.setAttribute('style','color:green');
			}
			else {
				members.val("Stinkface");
				if (members.val() == "Stinkface") {
					items.value = stinkface;
					members.attr('style','color:green');
					items.setAttribute('style','color:green');
				}
				else {
					members.val("Flargwurm");
					if (members.val() == "Flargwurm") {
						items.value = flargwurm;
						members.attr('style','color:green');
						items.setAttribute('style','color:green');
					}
					else {
						members.val("Jim");
						items.value = jim;
						members.attr('style','color:green');
						items.setAttribute('style','color:green');
					}
				}
			}
		}
	}
	else if (document.location.search == "?action=mourn") {
		$('input.button[value*="Insult"]').parent().append(AppendLink('[put on Victor (offhand)]','inv_equip.php?pwd='+pwd+'&which=2&action=equip&whichitem=4667'));
		$('input.button[value*="Observational"]').parent().append(AppendLink('[put on observational glasses (acc1)]','inv_equip.php?pwd='+pwd+'&which=2&action=equip&whichitem=4668&slot=1'));
		$('input.button[value*="Comedy"]').parent().append(AppendLink('[put on hilarious comedy Prop (weapon)]','inv_equip.php?pwd='+pwd+'&which=2&action=equip&whichitem=4669'));
	}
}

// PYRAMID: Display ratchets and other goodies.
function at_pyramid() {
	var ratch = document.createElement('a');
	ratch.innerHTML = '<font size="2">[use a ratchet]</font>';
	ratch.setAttribute('href',inv_use(2540));
	var checkInv = document.createElement('a');
	checkInv.innerHTML = '<font size="2">[check inventory]</font>';
	checkInv.setAttribute('href', '#');
	checkInv.addEventListener('click', function(evt) {
		checkInv.innerHTML = '<font size="2">[checking...]</font>';
		GM_get(server+'api.php?what=inventory&for=MrScript',function(response) {
			if (response[0] != '{') {
				var i1 = response.split('inventory = ')[1].split(';')[0];	// should get everything from { to }, inclusive.
				response = i1;
			}
			var invcache = $.parseJSON(response); //eval('('+response+')');
			var ratchet = invcache[2540]; if (ratchet === undefined) ratch = 0;
			var token = invcache[2317]; if (token === undefined) token = 0;
			var bomb = invcache[2318]; if (bomb === undefined) bomb = 0;
			var html = "You have ";
			if (token > 0) html += "an ancient bronze token";
			else if (bomb > 0) html += "an ancient bomb";
			if (ratchet > 0) {
				if (html != "You have ") html += " and ";
				html += ratchet + " <a href='" + inv_use(2540);
				html += "'>tomb ratchet"; if (ratchet > 1) html += "s";
				html += "</a>";
			}
			if (html == "You have ") html = "Nothing special in inventory. (Sorry.)";
			if (document.location.pathname == "/pyramid.php") {
				$('#pyr_inv').html('<br /><font size="2">'+html+'</font>');
			}
		});
	}, false);

	var pyr = document.createElement('div');
	pyr.setAttribute('id', 'pyr_inv');
	pyr.setAttribute('style','text-align:center;');
	pyr.appendChild(ratch);
	pyr.appendChild(document.createTextNode(' - '));
	pyr.appendChild(checkInv);
	var t = document.getElementsByTagName('table');
	t[t.length-2].parentNode.appendChild(pyr);

// pyramid de-ratter cheerfully swiped from JiK4Eva
	var elements = document.getElementsByTagName("td");
	for(var i=0;i<elements.length;i++){
		var q = elements[i].innerHTML;
		// replace the <a><img></a> with just <img> if we're on image 2 or 5.
		// this renders the "rats" portions of the pyramid unclickable.  yay.
		// must match the href at the start of the TD element only, or this will over-match and step on our ratchet/inv links above.
		if (q.match(/^<a href="pyramid\.php\?action=lower">.*pyramid4_[25]\.gif/)) {
			elements[i].innerHTML = q.replace(/<a href="pyramid\.php\?action=lower">(<img src="[^>]*pyramid4_[25]\.gif"[^>]*>)<\/a>/, "$1");
		}
	}
// end de-ratter
}

// AT_CAVE: spoil that nemesis quest.
function at_cave() {
	var dooritem = {"/mus_door1.gif":[37,"a viking helmet"],
					"/mys_door1.gif":[560,"a stalk of asparagus"],
					"/mox_door1.gif":[565,"a pair of dirty hobo gloves"],
					"/mus_door2.gif":[316,"an insanely spicy bean burrito"],
					"/mys_door2.gif":[319,"an insanely spicy enchanted bean burrito"],
					"/mox_door2.gif":[1256,"an insanely spicy jumping bean burrito"],
					"/sc_door3.gif":[2478,"a clown whip"],
					"/tt_door3.gif":[2477,"a clownskin buckler"],
					"/sa_door3.gif":[420,"a tomato juice of powerful power"],
					"/pm_door3.gif":[579,"a bowl of boring spaghetti"],
					"/db_door3.gif":[9999,"any of the 12 'normal' Advanced Cocktailcrafting drinks"],
					"/at_door3.gif":[9999,"at least 15 turns of the 'Polka of Plenty' buff"]
					};
	var subloc = document.location.search;
	if (subloc.indexOf("action=door") != -1) {
		doorpicname = $('img:first').attr('src');
		var door = doorpicname.slice(doorpicname.lastIndexOf('/'));
		if (dooritem[door]) {	// item is in our list
			var descid = $('option[value="'+dooritem[door][0]+'"]').attr('descid');
			if (descid) { 	// item is in the selection list
				$('select[name="whichitem"]').attr('style','color:green');	// mark as selected
				$('option[value="'+dooritem[door][0]+'"]').attr('selected','selected');// select the right item
			} else {
				var failnote = "<center><p><font color='blue'>You need "+dooritem[door][1]+" to proceed.</font></center>";
				$('select[name="whichitem"]')
					.attr('style','color:red')
					.parent().append(failnote);
				if (door == '/db_door3.gif') {	// if it's the DB door 3, un-red it and add a little note.
					$('select[name="whichitem"]')
						.attr('style','color=black')
						.parent().append('<center><p><font color="blue">(Go ahead, pick one from the list if you have one.)</font></center>');
				} else if (door == '/at_door3.gif') {	// if it's the AT door 3, check for success.
					if ($('p:eq(2)').text().indexOf("could really use a regular") == -1) {	// if we don't see success, display failure info.
						$('p:eq(2)').append(failnote);
					}
				}
			}
		}
	}
}

// LAIR1: More linkies.
function at_lair1() {
	if (document.location.search == "?action=mirror") {
		$('p:last:contains("Only those comfortable")').append(AppendLink("[get nekkid]","inv_equip.php?pwd="+pwd+"&action=unequipall"));
		return;
	}
	if (document.location.search == "?action=gates") {
		for (var i=0; i<3; i++)
		{	var p = document.getElementsByTagName('p')[i];
			var ptxt = p.textContent;
	// gate 1:
			if (ptxt.indexOf("Suc Rose") != -1) p.appendChild(AppendLink('[sugar rush]',inv_use(540)));
			else if (ptxt.indexOf("Hilarity") != -1) p.appendChild(AppendLink('[gremlin juice]',inv_use(2631)));
			else if (ptxt.indexOf("Humility") != -1) p.appendChild(AppendLink('[wussiness]',inv_use(469)));
			else if (ptxt.indexOf("Morose Morbidity") != -1) p.appendChild(AppendLink('[thin black candle]',inv_use(620)));
			else if (ptxt.indexOf("Slack") != -1) p.appendChild(AppendLink('[mick\'s IVH rub]',inv_use(618)));
			else if (ptxt.indexOf("Spirit") != -1) p.appendChild(AppendLink('[pygmy pygment]',inv_use(2242)));
			else if (ptxt.indexOf("Porcupine") != -1) p.appendChild(AppendLink('[super-spiky hair gel]',inv_use(587)));
			else if (ptxt.indexOf("Viper") != -1) p.appendChild(AppendLink('[adder bladder]',inv_use(2056)));
			else if (ptxt.indexOf("Locked Gate") != -1) p.appendChild(AppendLink('[Black No. 2]',inv_use(2059)));
	// gate 2:
			else if (ptxt.indexOf("Machismo") != -1) p.appendChild(AppendLink('[meleegra]',inv_use(1158)));
			else if (ptxt.indexOf("Flame") != -1) p.appendChild(AppendLink('[jabanero gum]',inv_use(300)));
			else if (ptxt.indexOf("Intrigue") != -1) p.appendChild(AppendLink('[handsomeness]',inv_use(1162)));
			else if (ptxt.indexOf("Mystery") != -1) p.appendChild(AppendLink('[pickle gum]',inv_use(299)));
			else if (ptxt.indexOf("the Dead") != -1) p.appendChild(AppendLink('[marzipan skull]',inv_use(1163)));
			else if (ptxt.indexOf("Torment") != -1) p.appendChild(AppendLink('[tamarind gum]',inv_use(297)));
			else if (ptxt.indexOf("Zest") != -1) p.appendChild(AppendLink('[lime & chile gum]',inv_use(298)));
	// gate 3:
			else if (ptxt.indexOf("Hidden") != -1) p.appendChild(AppendLink('[dod potion - object]','multiuse.php',false));
			else if (ptxt.indexOf("Light") != -1) p.appendChild(AppendLink('[dod potion - moxie]','multiuse.php',false));
			else if (ptxt.indexOf("Mind") != -1) p.appendChild(AppendLink('[dod potion - myst]','multiuse.php',false));
			else if (ptxt.indexOf("Ogre") != -1) p.appendChild(AppendLink('[dod potion - muscle]','multiuse.php',false));
			else if (ptxt.indexOf("Not a Gate") != -1) p.appendChild(AppendLink('[dod potion - teleport]','multiuse.php',false));
		}
		var letsgetnaked = $("p:last").text();
		if ((letsgetnaked.indexOf("path is now clear") != -1) || (letsgetnaked.indexOf("is clear") != -1))
			$("p:last").append("<a class='tiny' href='inv_equip.php?pwd="+pwd+"&action=unequipall'>[get nekkid]</a>");
	}
}

// LAIR2: I am the keymaster!
function at_lair2() {
	if (GetPref("lairspoil") == 1) {
		var bodyHTML = document.getElementsByTagName("body")[0].innerHTML;
		if (bodyHTML.indexOf("10 buttons must ye push") != -1) {
			var selects = document.getElementsByTagName("select");
			// n.b. selects[0] and [1] are already set to the correct value of 0.
			selects[2].options.selectedIndex = 1;
			selects[3].options.selectedIndex = 1;
			selects[4].options.selectedIndex = 2;
			selects[5].options.selectedIndex = 3;
			selects[6].options.selectedIndex = 2;
			selects[7].options.selectedIndex = 3;
			selects[8].options.selectedIndex = 4;
			selects[9].options.selectedIndex = 5;
		} else if (bodyHTML.indexOf("Though spelling's not our strongest case") != -1) {
			document.getElementsByTagName("input")[1].value = "phish";
		} else if (bodyHTML.indexOf("I am a fish, blind as can be") != -1) {
			document.getElementsByTagName("input")[1].value = "fsh";
		} else if (bodyHTML.indexOf("I do not walk, I do not fly") != -1) {
			document.getElementsByTagName("input")[1].value = "fish";
		}
	}
}

// LAIR6: links, door codes, familiars.
function at_lair6() {
	var tabl = document.getElementsByTagName('table');
	img = document.images;
	if (tabl[1].innerHTML.indexOf("fying seri") != -1) {
		tabl[1].parentNode.innerHTML +=
		"<br><a href='inv_equip.php?pwd="+pwd+
		"&which=2&action=equip&whichitem=726'>Equip Shard</a>";
	}
	if (img.length == 2 && img[1].src.indexOf("gash.gif") != -1) {
		var zif = img[1].parentNode.parentNode;
		zif.setAttribute('align','center');
		zif.innerHTML += "<br><br><a class='tiny' href='storage.php'>Hagnk's</a>";
		zif.innerHTML += "<br><a class='tiny' href='inv_equip.php?pwd="+pwd+"&action=unequipall'>get nekkid</a>";
		zif.innerHTML += "<br><br><br><a class='tiny' href='inventory.php?which=1&action=discard&pwd="+pwd+"&whichitem=4448'>discard a karma</a>";
	}
// door and familiar coding shamelessly borrowed from Tard's NS Trainer script v0.8
	if (window.location.search == "" && GetPref("lairspoil") == 1) {
		aP = document.getElementsByTagName("p");
		if (aP[1] && aP[1].innerHTML.indexOf("BEWARE") != -1) {
			p7 = aP[11].innerHTML;
			p5 = aP[9].innerHTML;
			p6 = aP[10].innerHTML;
			p8 = aP[12].innerHTML;
			p11 = aP[15].innerHTML;
			p13 = aP[17].innerHTML;
			p14 = aP[18].innerHTML;
			if (p7.match(/\d/)) {
				S = p5.match(/\d/)[0];
				T = p6.match(/\d/)[0];
				V = p8.match(/\d/)[0];
				Z = p13.match(/\d/)[0];
				if (p13.indexOf("East") != -1) {
					SetCharData("NSDoorCode",String.concat(T,V,Z));
				} else {
					SetCharData("NSDoorCode",String.concat(S,V,Z));
				}
			} else {
				T = p5.match(/\d/)[0];
				X = p11.match(/\d/)[0];
				Y = p14.match(/\d/)[0];
				SetCharData("NSDoorCode",String.concat(T,X,Y));
			}
		} else {
			code = GetCharData("NSDoorCode");
			if (code && document.getElementsByTagName("input")[1]) document.getElementsByTagName("input")[1].value = code;
		}
	} else if (GetPref("lairspoil") == 1 && (window.location.search == "?place=3" || window.location.search == "?place=4")) {
		window.addEventListener("load",function(e) {
			var bodyHTML = document.getElementsByTagName("body")[0].innerHTML;
			var newDiv = document.createElement("div");
			newDiv.id = "nsTools";
			document.getElementsByTagName("center")[0].insertBefore(newDiv,document.getElementsByTagName("table")[0]);
			var oDiv = document.getElementById("nsTools");
			with(oDiv.style) {width = "95%";marginBottom="10px"}

			newDiv = document.createElement("div");
			with(newDiv) {id = "nsToolsHead";innerHTML = "Naughty Sorceress Tools:";}
			with(newDiv.style) {background = "blue";textAlign = "center";fontSize = "16px";color="white";fontWeight="bold";}
			oDiv.appendChild(newDiv);

			newDiv = document.createElement("div");
			with(newDiv) {id = "nsToolsContent";}
			with(newDiv.style) {textAlign = "center";fontSize = "13px";border="1px solid blue";borderTop="0px";padding="5px";}
			oDiv.appendChild(newDiv);
			oDiv = document.getElementById("nsToolsContent");
			var famId,famName;
			if (bodyHTML.indexOf("goat.gif") != -1) {
				famId = 1;famName = "Mosquito";
			} else if (bodyHTML.indexOf("mosquito.gif") != -1) {
				famId = 5;famName = "Sabre-Toothed Lime";
			} else if (bodyHTML.indexOf("lime.gif") != -1) {
				famId = 3;famName = "Levitating Potato";
			} else if (bodyHTML.indexOf("potato.gif") != -1) {
				famId = 8;famName = "Barrrnacle";
			} else if (bodyHTML.indexOf("barrrnacle.gif") != -1) {
				famId = 4;famName = "Angry Goat";
			}
			if (famId) oDiv.innerHTML = '<a href="familiar.php?action=newfam&newfam=' + famId + '">Use the ' + famName + ', Luke!</a>';
		},false);
	}
}

// FAMILIAR: Blackbird singing in the dead of night.
function at_familiar() {
	if ($('img:first').attr('src').indexOf('blackbird') != -1)
	{
		$('img:first').nextAll('b:first').after(AppendLink('[map it!]',inv_use(2054)));
	}
}

// MINING: uber-twinklify all twinkly images.
function at_mining() {
// Image courtesy of Picklish's Mining Helper script.
	var staticSparkleImg = "data:image/gif;base64,R0lGODlhMgAyAOMPAP39/dvb2zc3NycnJ5qams3NzQUFBRAQEGtra6enp7W1te3t7UZGRldXV319ff///yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJAQAPACwAAAAAMgAyAAAEW/DJSau9OOvNu/9gKI5kaZ5oqq5s675wLM90bd94ru8rg/AUR+AAfBwCgd/OMFA4GguEQXcEJAQEQGM3ECAAUSIwkJgWn0WJwZxuu9/wuHxOr9vv+Lx+z+/77xEAIfkECQEADwAsAAAAADIAMgAABGvwyUmrvTjrzbv/YCiOZGmeaKqubOu+cCzPdG3feM4Jhm4FA18lIRBSEgzjpKDoGRmLAsJAddYaBEJAMQB4AYqbIKuILhwCRlAXWKyNWaVEKn8kEHVCo36w1v+AgYKDhIWGh4iJiouMjY4kEQAh+QQJAQAPACwAAAAAMgAyAAAEl/DJSau9OOvNu/9gKI5kaZ5oqq5s675wLLeHMXNHYd/aAAy83i+YMRQERMwhgEhefA6npQFISCmGQEJ3NTAUhYMCYRM0CMCYoYEoAAi1Adi9OMoGhXwgIDAcHAsJDEE7Bgl8eQM7TkYACotXVA1XFD6DlBIDC2mYRpyUOUiYD56jpAWXowqfpq2ur7CxsrO0tba3uLm6GhEAIfkECQEADwAsAAAAADIAMgAABGvwyUmrvTjrzbv/YCiOZGmeaKqubOu+cCzPdG3feM4Jhm4FA18lIRBSEgzjpKDoGRmLAsJAddYaBEJAMQB4AYqbIKuILhwCRlAXWKyNWaVEKn8kEHVCo36w1v+AgYKDhIWGh4iJiouMjY4kEQAh+QQJAQAPACwAAAAAMgAyAAAEW/DJSau9OOvNu/9gKI5kaZ5oqq5s675wLM90bd94ru8rg/AUR+AAfBwCgd/OMFA4GguEQXcEJAQEQGM3ECAAUSIwkJgWn0WJwZxuu9/wuHxOr9vv+Lx+z+/77xEAOw==";
	$("img[src*='wallsparkle']").attr("src",staticSparkleImg);
	if (document.location.search.indexOf("mine=1") != -1) {	// don't display quest data in the knob shaft (mine=2), only the dwarf mine (mine=1).
		var oretype = GetCharData("oretype");
		var orenumber = GetCharData("orenumber");
		if (oretype != '') {
			// first, process any items we've just received.
			var founditem = $('.item').attr("rel");
			var foundamount = 0;
			if (founditem) {
				founditem = integer(founditem.match(/id=(\d+)/)[1]);
				if (founditem >= 363) {
					foundamount = GetCharData("ore"+founditem);
					foundamount++;
					SetCharData("ore"+founditem,foundamount);
				}
			}
			// second, display our quest info.
			var msg = "You need 3 "+oretype+" ores.";
			foundamount = GetCharData("ore"+orenumber);
			if (foundamount) msg +=" (You've found "+foundamount+" so far.)";
			$('b:contains("Itznotyerzitz")').parent().append('<tr><td><center><font color="white">'+msg+'</font></center></td></tr>');
			if (foundamount >= 3) {
				$('<center><br /><a href="trapper.php>Visit the Tr4pz0r</a></center>').appendTo($('a:last').parent());
			}
		}
	}
// track what each square gave us:
	// first, add onclick() to track what square we just clicked on.
	$('a[href*="mining.php"]').click(function() {
		var a = $(this);
		var setwhich = integer(a.attr("href").match(/which=(\d+)/)[1]);
		SetCharData("mining_which",setwhich);
	});
	//also add onclick() to the "Find new cavern" button to wipe out our stored values.
	$('input').click(function() {
		clearwhiches();
	});		// if mining_which is set, it's because we just reloaded the page after clicking on a square.
	var which = GetCharData("mining_which");
	SetCharData("mining_which", 0);
	if (which != 0 && which !== undefined) {
		var got = $('.item tr td img').attr("src");		// see what we got.
		SetCharData("which"+which,got);					// save it.
	}
	$('img[alt*="Open Cavern"]').each(function() {		// replace each "Open Cavern" picture with the image we saved.
		var alt = $(this).attr('alt');
		var xc = integer(alt.match(/(\d)/g)[0]);		// convert from "Open Cavern (1, 4) to the number in the "mine=1?which=xx" link.
		var yc = integer(alt.match(/(\d)/g)[1]);
		var foo = (xc + (yc*8));
		if (foo > 54) return;	// that's the last of the mine-able squares
		var myimage = GetCharData("which"+foo);
		if (myimage !== undefined) {
			$(this).attr('src',myimage);
		}
	});
}

function clearwhiches() {
	for (var i=9; i<=54; i++) {
		 DelCharData("which"+i);
	}
}

function at_gamestore() {
	var select = document.getElementsByTagName("select");
	if (select) {	// cards to trade in, while at the cashier.
		select[0].options.selectedIndex = 1;	// select first card, saving clicks for tradeins.
		var qty = document.getElementsByName("quantity");
		// put the Max Button on the last "quantity" box (out of ronin/HC, there's also a "quantity" box for buying store items with credit):
		if (qty.length == 2) {
			MakeMaxButton(qty[1], function(event) {
				var selectItem = document.getElementsByTagName("select")[0];
				var box = document.getElementsByName('quantity')[1];
				var quant = ParseSelectQuantity(selectItem, ")");
				box.value = quant;
			});
		} else {	// length should equal 1
			MakeMaxButton(qty[0], function(event) {
				var selectItem = document.getElementsByTagName("select")[0];
				var box = document.getElementsByName('quantity')[0];
				var quant = ParseSelectQuantity(selectItem, ")");
				box.value = quant;
			});
		}
	}
}

// OCEAN: Lat/Long spoilers.
function at_ocean() {
	$("input[name=lat]").parents("table:first").before(
	'<select onchange="var spl=this.value.split(\',\'); document.getElementsByName(\'lon\')[0].value = spl[0]; document.getElementsByName(\'lat\')[0].value = spl[1];">'+
	'<option> </option>'+
	'<option value="12,84">Muscle 1</option>'+
	'<option value="23,66">Mysticality 1</option>'+
	'<option value="22,62">Moxie 1</option>'+
	'<option value="56,14">Muscle 2</option>'+
	'<option value="89,44">Mysticality 2</option>'+
	'<option value="13,91">Moxie 2</option>'+
	'<option value="19,59">Muscle 3</option>'+
	'<option value="13,86">Mysticality 3</option>'+
	'<option value="52,45">Moxie 3</option>'+
	'<option value="184,25">shimmering rainbow sand</option>'+
	'<option value="30,85">sinister altar fragment</option>'+
	'<option value="48,47">El Vibrato power sphere</option>'+
	'<option value="63,29">Plinth / Trapezoid</option>'+
	'<option value="37,37">Random Treasure</option>'+
	'</select>');
}

// CAMPGROUND: Telescope spoilers
function at_campground() {
	var resultsBar = $('td:first:contains("Results")');
	if (GetPref("telescope")
		&& resultsBar.length > 0
		&& resultsBar.parent().next().text().indexOf('eyepiece of the telescope') != -1)
	{
		resultsBar.parent().next().find('p').each(function(t) {
			var txt = this.textContent;
			var snarf = false;
			var gateInfo = [
                //note that using functions to define where to go just KILLS performance since the array must then be constructed on every page instead of
                //being a static, pre-defined object.  drat.
                //identifying text              item required           image           where to go                                     link text               item ID
                ["carving of an armchair",      ['pygmy pygment',       'pigment',      'hiddencity.php',                               'hidden city',          '2242']],
				["carving of a cowardly-l",     ['wussiness potion',    'potion5',      'friars.php',                                   'deep fat friars',      '469']],
				["carving of a banana peel",    ['gremlin juice',       'potion6',      'bigisland.php?place=junkyard',                 'island',               '2631']],
				["carving of a coiled viper",   ['adder bladder',       'bladder',      'adventure.php?snarfblat=111',                  'black forest (1)',     '2056']],
				["carving of a rose",           ['Angry Farmer candy',  'rcandy',       'adventure.php?snarfblat=324',                  'castle top floor (1)', '617']],
				["carving of a glum teenager",  ['thin black candle',   'bcandle',      'adventure.php?snarfblat=324',                  'castle top floor (1)', '620']],
				["carving of a hedgehog",       ['super-spiky hair gel','balm',         'adventure.php?snarfblat=81',                   'fantasy airship (1)',  '587']],
				["carving of a raven",          ['Black No. 2',         'blackdye',     'adventure.php?snarfblat=111',                  'black forest (1)',     '2059']],
				["carving of a smiling man",    ['Mick\'s IcyVapoHotness Rub','balm',   'adventure.php?snarfblat=324',                  'castle top floor (1)', '618']],
				["baseball bat",                ['baseball',            'baseball',     'adventure.php?snarfblat=31',                   'guano junction (1)',   '181']],
				["made of Meat",                ['meat vortex',         'vortex',       'adventure.php?snarfblat=80',                   'valley (1)',           '546']],
				["amber waves",                 ['bronzed locust',      'locust1',      'place.php?whichplace=desertbeach',             'beach',                '2575']],
				["slimy eyestalk",              ['fancy bath salts',    'potion4',      'adventure.php?snarfblat=107',                  'bathroom (1)',         '2091']],
				["flaming katana",              ['frigid ninja stars',  'ninjastars',   'adventure.php?snarfblat=272',                  'ninja snowmen lair (1)','353']],
				["translucent wing",            ['spider web',          'web',          'adventure.php?snarfblat=112',                  'sleazy back alley (1)','27']],
				["looking tophat",              ['sonar-in-a-biscuit',  'biscuit',      'adventure.php?snarfblat=31',                   'guano junction (1)',   '563']],
				["of albumen",                  ['black pepper',        'blpepper',     'adventure.php?snarfblat=111',                  'black forest (1)',     '2341']],
				["white ear",                   ['pygmy blowgun',       'tinyblowgun',  'hiddencity.php',                               'hidden city',          '2237']],
				["cowboy hat",                  ['chaos butterfly',     'butterfly',    'adventure.php?snarfblat=323',                  'castle ground floor (1)','615']],
				["periscope",                   ['photoprotoneutron torpedo','torpedo', 'adventure.php?snarfblat=81',                   'fantasy airship (1)',  '630']],
				["strange shadow",              ['inkwell',             'inkwell',      'adventure.php?snarfblat=104',                  'haunted library (1)',  '1958']],
				["moonlight reflecting",        ['hair spray',          'spraycan',     'store.php?whichstore=m',                       'General Store',        '744']],
				["wooden frame",                ['disease',             'disease',      'adventure.php?snarfblat=259',                  'knob harem (1)',       '452']],
				["long coattails",              ['Knob Goblin firecracker','firecrack', 'adventure.php?snarfblat=114',                  'knob outskirts (1)',   '747']],
				["steam shooting",              ['powdered organs',     'scpowder',     'pyramid.php',                                  'pyramid',              '2538']],
				["holding a spatula",           ['leftovers of indeterminate origin','leftovers','adventure.php?snarfblat=102',         'haunted kitchen (1)',  '1777']],
				["bass guitar",                 ['mariachi G-string',   'string',       'adventure.php?snarfblat=45',                   'south of the border (1)','1159']],
				["North Pole",                  ['NG',                  'ng',           'adventure.php?snarfblat=80',                   'valley (1)',           '624']],
				["writing desk",                ['plot hole',           'hole',         'adventure.php?snarfblat=323',                  'castle ground floor (1)','613']],
				["cuticle",                     ['razor-sharp can lid', 'canlid',       'adventure.php?snarfblat=113',                  'haunted pantry (1)',   '559']],
				["formidable stinger",          ['tropical orchid',     'troporchid',   'place.php?whichplace=desertbeach',             'shore',                '2492']],
				["pair of horns",               ['barbed-wire fence',   'fence',        'place.php?whichplace=desertbeach',             'shore',                '145']],
				["wooden beam",                 ['stick of dynamite',   'dynamite',     'place.php?whichplace=desertbeach',             'shore',                '2493']]
			];
			for (var i = 0; i < gateInfo.length; i++) {
				if (txt.indexOf(gateInfo[i][0]) != -1) {
					snarf = gateInfo[i][1];
					break;
				}
			}
			if (snarf) {
				var html =
'<div style="width:180px; font-size:12px; margin-left:10px; vertical-align:top; text-align:right; float:right;">' +
'<img style="float:right; margin:0 0 2px 5px;" src="http://images.kingdomofloathing.com/itemimages/'+snarf[1]+'.gif"/>' +
'<b class="combatitem" itemno="'+snarf[4]+'">' + snarf[0] + '</b><br/>' +
'<a class="small" href="'+snarf[2] +
'" target="mainpane">[' + snarf[3] + ']</a></div>';
				$(this).before(html)
					.after('<div style="clear:both;"></div>');
			}
		});
		GM_get(server + 'api.php?what=inventory&for=MrScript', function(txt) {
			var inventory = $.parseJSON(txt);
			$('b[class=combatitem]').each(function() {
				var itemno = $(this).attr('itemno');
				if (inventory[itemno] != undefined) $(this).attr('style','color:green;');
				else $(this).attr('style','color:red;');
			});
		});
	}
}

// BASEMENT: Im in ur base, spoilin ur puzzlez.
function at_basement() {
	var bq = document.getElementsByTagName('blockquote')[0];
	var ins = document.getElementsByTagName('input');
	// Phial link
	for (var i=0, len=ins.length; i<len; i++) {
		if (ins[i].type != 'submit') continue;
		var phial = 0; var temp = ins[i].value;
		var curphial = GetCharData("phial");
		if (temp.indexOf("Drunk's Drink") != -1) phial = 1638;
		else if (temp.indexOf("Pwn the Cone") != -1) phial = 1640;
		else if (temp.indexOf("Hold your nose") != -1) phial = 1641;
		else if (temp.indexOf("Typewriter,") != -1) phial = 1637;
		else if (temp.indexOf("Vamps") != -1) phial = 1639;
		if (phial > 0 && phial != (curphial+1448)) { // In the biz, we call this this the Phial Phudge Phactor.
			var bq = document.getElementsByTagName('blockquote')[0];
			var aa = document.createElement('a');
			var phnames = {"1637":"Hot","1638":"Cold","1639":"Spooky","1640":"Stench","1641":"Sleaze"};
			aa.innerHTML = "Use " + phnames[phial] + " Phial"; aa.setAttribute('href','#');
			aa.setAttribute('id','usephial');
			if (curphial > 0) //if the charpane sez we're already phialed, then we have to unphial first.
				aa.setAttribute('curphial',"uneffect.php?using=Yep.&pwd=" + pwd + "&whicheffect=" + curphial);
			aa.setAttribute('phial',inv_use(phial));
			aa.addEventListener('click',function(event) {
				this.innerHTML = "Using Phial...";
				if (this.getAttribute('curphial')) //remove old phial effect if present
				GM_get(server + this.getAttribute('curphial'),function(details) {
					var ph = document.getElementById('usephial');
					if (details.indexOf("Effect removed.") != -1) {
						GM_get(server + ph.getAttribute('phial'),function(details2) {
							var ph = document.getElementById('usephial'); ph.innerHTML = "";
							top.frames[1].location.reload();
						});
					}
				});
				else GM_get(server + this.getAttribute('phial'),function(details) {
					var ph = document.getElementById('usephial'); ph.innerHTML = "";
					top.frames[1].location.reload();
				});
				event.stopPropagation(); event.preventDefault();
			}, false);
			var cr = document.createElement('center');
			bq.appendChild(cr); cr.appendChild(aa);
		}
	}

	// OMGSPOILERS
	var lvl; var str = ""; var trs = document.getElementsByTagName('tr');
	for (var j=0; j<trs.length; j++) {
		lvl = document.getElementsByTagName('tr')[j].textContent;
		if (lvl.charAt(0) == "F") break;
	}
	lvl = lvl.substring(lvl.indexOf("Level ")+6, lvl.length);
	var bim = document.images[document.images.length-1];
	var bimg = bim.getAttribute('src');
	bimg = bimg.substring(bimg.lastIndexOf("/")+1, bimg.length);

	switch (bimg) {
		case "earbeast.gif":
			//str = "Monster Level: " + integer(Math.pow(lvl,1.4));
			break;
		case "document.gif": lvl = 4.5*Math.pow(lvl,1.4)+8;
			str = "Hot & Spooky: " + integer(lvl*.95) + " to " + integer(lvl*1.05) + " Damage";
			break;
		case "coldmarg.gif": lvl = 4.5*Math.pow(lvl,1.4)+8;
			str = "Cold & Sleaze: " + integer(lvl*.95) + " to " + integer(lvl*1.05) + " Damage";
			break;
		case "fratbong.gif": lvl = 4.5*Math.pow(lvl,1.4)+8;
			str = "Sleaze & Stench: " + integer(lvl*.95) + " to " + integer(lvl*1.05) + " Damage";
			break;
		case "onnastick.gif": lvl = 4.5*Math.pow(lvl,1.4)+8;
			str = "Stench & Hot: " + integer(lvl*.95) + " to " + integer(lvl*1.05) + " Damage";
			break;
		case "snowballbat.gif": lvl = 4.5*Math.pow(lvl,1.4)+8;
			str = "Spooky & Cold: " + integer(lvl*.95) + " to " + integer(lvl*1.05) + " Damage";
			break;
		case "sorority.gif": case "bigbaby.gif":
		case "pooltable.gif": case "goblinaxe.gif": lvl = Math.pow(lvl,1.4);
			str = "Moxie Needed: " + integer(lvl*.9) + " to " + integer(lvl*1.1);
			break;
		case "mops.gif": case "voodoo.gif": case "darkshards.gif": lvl = Math.pow(lvl,1.4);
			str = "Mysticality Needed: " + integer(lvl*.9) + " to " + integer(lvl*1.1);
			break;
		case "typewriters.gif": case "bigstatue.gif": case "bigmallet.gif": lvl = Math.pow(lvl,1.4);
			str = "Muscle Needed: " + integer(lvl*.9) + " to " + integer(lvl*1.1);
			break;
		case "haiku11.gif": lvl = Math.pow(lvl,1.4) * 10;
			str = "HP Needed: " + integer(lvl*.94) + " to " + integer(lvl*1.06) + "(lowered by DA)";
			break;
		case "powderbox.gif": lvl = Math.pow(lvl,1.4) * 1.67;
			str = "MP Needed: " + integer(lvl*.94) + " to " + integer(lvl*1.06);
			break;
	}
	if (str != "") bim.parentNode.innerHTML += "<br><span class='small'><b>"+str+"</b></span>";
}

function at_bathole() {
	GM_get(server + "api.php?what=inventory&for=MrScript", function(rv) {
		var inv = $.parseJSON(rv);
		var sonar = inv['563'];
	//	if (sonar === undefined) sonar = 0;
		if (sonar) {
			$("a:last").append("<br /><center><a href='"+inv_use('563')+"'><font color='blue'>Use a sonar</font></a></center>");
		}
	});
}

function spoil_knoll_friendly() {
	$('#dk_pens > a > img').attr('title','ML: 13-20');
	$('#dk_burrow > a > img').attr('title','ML: 55-65 (must have gravy fairy as active familiar)');
}

function spoil_knoll_hostile() {
	$('#kh_zone1 > a > img').attr('title','ML: 10-13');
	$('#kh_zone2 > a > img').attr('title','ML: 12-15');
	$('#kh_zone3 > a > img').attr('title','ML: 9-11; skirts here');
	$('#kh_zone4 > a > img').attr('title','ML: 10-12; car parts and screwdriver here');
}

//Spoil_Krakrox: walk through the entire Jungles of Hyboria quest.
function spoil_Krakrox(cNum) {
var Krakrox = {
		366: {
			A:"Go North",
			B:"Go North",
			C:"Go North",
			D:"Go North",
			E:"Go North",
			F:"Go North",
			G:"Go North",
			H:"Go North",
			I:"Go North",
			J:"Go North",
			K:"Go North",
			L:"Go North",
			M:"Go North",
			N:"Go North",
			O:"Go North",
			P:"Go North"
		},
		367: {	O:"Unlock the temple door",
			P:"Enter the temple (fight!)"//wrong place?
		},
		368: {	A:"Go West",
			B:"Go West",
			C:"Go West",
			D:"Examine Well",
			E:"Examine Well",
			F:"Go East",
			G:"Go East",
			H:"Go East",
			I:"Go East",
			J:"Go East",
			K:"Go North",
			L:"Go East",
			M:"Go East",
			N:"Go North",
			O:"Go North",
			P:"Go North"
		},
		369: {	K:"Go North",
			L:"Go South",
			N:"Go North",
			O:"Go North",
			P:"Go North"
		},
		370: {	F:"Go North",
			G:"Go North",
			H:"Go North",
			I:"Go South",
			J:"Go South",
			L:"Go South",
			M:"Go South"
		},
		371: {	A:"Go South",
			B:"Go North",
			C:"Go North"
		},
		372: {	D:"Climb down well (fight giant octopus)",
			E:"Take grappling hook"
		},
		373: {	K:"Place both blocks and pull lever, then go south",
			L:"Go South",
			N:"Kick down the gate",
			O:"Go North",
			P:"Go North"
		},
		374: {	B:"Climb Tower (fight giant bird-creature)",
			C:"Climb Tower (get memory of half a stone circle)",
		},
		375: {	F:"Go Upstairs (get memory of an iron key)",
			G:"Go Downstairs",
			H:"Go Downstairs",
		},
		376: {	O:"Unlock the Temple Door",
			P:"Enter the Temple (fight!)"
		},
		377: {
			I:"Go Upstairs",
			J:"Go Upstairs",
			L:"Go Downstairs",
			M:"Go Downstairs"
		},
		378: {	A:"Search"
		},
		379: {	G:"Search the webs (fight giant spider)",
			H:"Search the webs (find memory of a small stone block)"
		},
		380: {	I:"Search the vines (fight giant jungle python)",
			J:"Cut open the snake (find memory of a little stone block)"
		},
		381: {	L:"Crawl into the Tunnel",
			M:"Crawl into the Tunnel"
		},
		382: {	L:"Go West",
			M:"Go West"
		},
		383: {	L:"Go South",
			M:"Go North"
		},
		384: {	L:"Open Chest, then smash it (get memory of a stone half-circle)"
		},
		385: {	M:"Go North"
		},
		386: {	M:"Ponder the Weights"
		}
	}
	var QuestStatus = GetCharData("Krakrox");
	if (QuestStatus == null) { QuestStatus = "A"; SetCharData("Krakrox",QuestStatus); }
	var spoilText = Krakrox[cNum][QuestStatus];
	$("body").append("<br /><center><p><font color='blue'>"+spoilText+"</font></p></center><br />");
}



// SPOIL_(ZONE): Display ML on mouseover.
function spoil_town_wrong() {
	$('#townwrong_9 img').attr('title','ML: 1');
}
function spoil_tutorial() {
	$('img[title^="Noob"]')		.attr('title','ML: 0');
	$('img[title^="The Dire"]')	.attr('title','ML: 1');
}

function spoil_hiddencity() {
	$('#hc_altar1 > a > img').attr('title','ML: 144');
	$('#hc_altar2 > a > img').attr('title','ML: 144');
	$('#hc_altar3 > a > img').attr('title','ML: 144');
	$('#hc_altar4 > a > img').attr('title','ML: 144');
	$('#hc_zone1 > a > img').attr('title','ML: 142-150; get thrice-cursed effect');
	$('#hc_zone2 > a > img').attr('title','ML: 142-152; get/wear surgeon gear\nhalf-size scalpel, head mirror, surgical mask, surgical apron, bloodied surgical dungarees');
	$('#hc_zone3 > a > img').attr('title','ML: 142-150; assemble McClusky file (5 parts + binder)\n(parts drop from accountants)');
	$('#hc_zone4 > a > img').attr('title','ML: 142-154; get bowling balls');
	$('#hc_zone5 > a > img').attr('title','ML: 145-156; acquire antique machete to clear vines from altars for free');
	$('#hc_final > a > img').attr('title','ML: 144 (vines)/164 (boss); get stone triangles from altars to fight boss here');
}

function spoil_canadia() {
    $('#lc_outskirts > a > img').attr('title','ML: 2-3');
    $('#lc_camp > a > img').attr('title','ML: 35-40');
}

function spoil_marais() {
    $('#swamp1 > a > img').attr('title','ML: 14-20; open swamp, sanctuargh');   //edge
    $('#swamp2 > a > img').attr('title','ML: 19-36; open bog, tower');          //swamp
    $('#swamp3 > a > img').attr('title','ML: 34-51; fight Bunion (axe)');       //bog
    $('#swamp4 > a > img').attr('title','ML: 27-55; get navigator for beaver maze');    //wizard tower
    $('#swamp5 > a > img').attr('title','ML: 19-37; open beavers, village');    //sanctuarrrrgh
    $('#swamp6 > a > img').attr('title','ML: 27-54; fight hippy (wood)');       //beaver
    $('#swamp7 > a > img').attr('title','ML: 36-58; fight skunk (bouquet)');    //village
}

function spoil_bugbearship() {
	$('#bb_waste > a > img').attr('title','ML:5-8; get/use juicy garbage until comm badge, equip it and adv once more');
	$('#bb_medbay > a > img').attr('title','ML:8-15; kill anesthesiologists until robo-surgeon');
	$('#bb_sonar > a > img').attr('title','ML:25; knobs = 2 / 4 / 8');
	$('#bb_science > a > img').attr('title','ML:45-55; use 10 quantum webs on scientists');
	$('#bb_morgue > a > img').attr('title','ML:60-65; collect tweezers, use in NC');
	$('#bb_specops > a > img').attr('title','ML:90; use UV monocular, flaregun, fluorescent lightbulb, rain-doh green lantern to get more fights');
	$('#bb_engineering > a > img').attr('title','ML:125-140; use 6 drone self-destruct chips on liquid metal bugbears');
	$('#bb_navigation > a > img').attr('title','ML:140-175; defeat 10 N-space assistants');
	$('#bb_galley > a > img').attr('title','ML:220 (+20 per "very"); defeat 10,000(?) ML worth of cavebugbears');
	$('#bb_bridge > a > img').attr('title','ML:280');
}

function spoil_highlands() {
	$('#peak1 > a > img').attr('title','ML: 71-78');
	$('#peak2 > a > img').attr('title','ML: 81-93');
	$('#peak3 > a > img').attr('title','ML: 85');
}

function spoil_orc_chasm() {
	$('#smut_orc_camp > a > img').attr('title','ML: 75-85');
}

function spoil_spookyraven1() {
	spoil_manor();
}
function spoil_manor() {
	$('#sr1_pantry img')		.attr('title','ML: 1-2');
	$('#sr1_kitchen img')		.attr('title','ML: 3-5');
	$('#sr1_conservatory img')	.attr('title','ML: 7-9');
	$('#sr1_billiards img')		.attr('title','ML: 20');
	$('#sr1_library img')		.attr('title','ML: 49-57');
	$('#sr1_gallery img')		.attr('title','ML: 105-115');
}

function spoil_spookyraven2() {
	spoil_manor2();
}
function spoil_manor2() {
	$('img').each(function() {
		var ml = null; var src = this.getAttribute('src');
		if (src.indexOf("sm2_1") != -1) ml = '147-173';
		else if (src.indexOf("sm2_7") != -1) ml = '76-100';
		else if (src.indexOf("sm2_5") != -1) ml = '110';
		if (ml) this.setAttribute('title','ML: '+ml);
	});
}

function spoil_spookyraven3() {
	spoil_manor3();
}
function spoil_manor3() {
	var msg = null;
	$('img').each(function() {
		var ml = null;
		var src = this.getAttribute('src');
		if (src.indexOf("cellar") != -1) msg = 'ML: 158-168';
		else if (src.indexOf("chambera") != -1) msg = 'ML: 170';
		if (msg) this.setAttribute('title', msg);
	});
}

function spoil_beach() {
	$('img').each(function() {
		var ml = null; var src = this.getAttribute('src');
		if (src.indexOf("newbeach9") != -1) ml = '20-25';
		else if (src.indexOf("desert.gif") != -1) ml = '134-142';
		else if (src.indexOf("oasis") != -1) ml = '132-137';
		if (ml) this.setAttribute('title','ML: '+ml);
	});
}

function spoil_pyramid() {
	var msg = null;
	$('img').each(function() {
		var ml = null;
		var src = this.getAttribute('src');
		if (src.indexOf("mid2") != -1) msg = 'ML: 162-176';
		else if (src.indexOf("mid3b") != -1) msg = 'ML: 162-180';
		else if (src.indexOf("mid4_5") != -1) msg = 'Keep Going...';
		else if (src.indexOf("mid4_2") != -1) msg = 'Keep Going...';
		else if (src.indexOf("mid4_4") != -1) msg = 'Phase 1: Token';
		else if (src.indexOf("mid4_3") != -1) msg = 'Phase 2: ???';
		else if (src.indexOf("mid4_1.") != -1) msg = 'Phase 3: Profit!';
		if (msg) this.setAttribute('title', msg);
	});
}

function spoil_bathole() {
    $('#bathole_entryway > a > img').attr('title','ML: 11-16');
    $('#bathole_junction > a > img').attr('title','ML: 14-18');
    $('#bathole_burrow > a > img').attr('title','ML: 16-20');
    $('#bathole_chamber > a > img').attr('title','ML: 22');
    $('#bathole_lair > a > img').attr('title','ML: 26-35\nMCD=4 for Boss Bat Britches (+5 mox pants)\nMCD=8 for Boss Bat Bling (+3 Mus/+3 Mox accessory)');
}

function spoil_plains() {
	$('img').each(function() {
		var ml = null; var src = this.getAttribute('src');
		if (src.indexOf("knob1") != -1) ml = '1-2';
		else if (src.indexOf("funhouse") != -1) ml = '14-20';
		else if (src.indexOf("knoll1") != -1) ml = '10-13';
		else if (src.indexOf("cemetary") != -1) ml = '18-20 / 53-59';
		else if (src.indexOf("dome") != -1) ml = '116-135';
		if (ml) this.setAttribute('title','ML: '+ml);
	});
}

function spoil_plains2() {
	$('img').each(function() {
		var ml = null; var src=this.getAttribute('src');
		if (src.indexOf("battlefield") != -1) ml = '30 (in uniform)';
		if (ml) this.setAttribute('title','ML: '+ml);
	});
}

/* // DEPRECATED; confirm that these are no longer needed
function spoil_knob() {
	$('img').each(function() {
		var ml = null; var src = this.getAttribute('src');
		if (src.indexOf("knob3") != -1) ml = '1-2';
		else if (src.indexOf("knob4") != -1) ml = '20-22';
		else if (src.indexOf("knob6") != -1) ml = '24-32';
		else if (src.indexOf("knob7") != -1) ml = '26-32';
		else if (src.indexOf("knob9") != -1) ml = '57';
		if (ml) this.setAttribute('title','ML: '+ml);
	});
}

function spoil_knob2() {
	$('img').each(function() {
		var ml = null; var src = this.getAttribute('src');
		if (src.indexOf("knob22") != -1) ml = '40-45';
		else if (src.indexOf("knob23") != -1) ml = '50-56';
		else if (src.indexOf("knob26") != -1) ml = '60-66';
		else if (src.indexOf("knob29") != -1) ml = '70-76';
		else if (src.indexOf("shaft2") != -1) ml = '30';
		if (ml) this.setAttribute('title','ML: '+ml);
});	}
*/

function spoil_cobbsknob() {
	$('area').each(function() {
		var ml = null; var alt = this.getAttribute('alt');
		if (alt.indexOf('Outskirts') != -1) ml = '1-2';
		else if (alt.indexOf('Barracks') != -1) ml = '22-30';
		else if (alt.indexOf('Kitchens') != -1) ml = '20-23';
		else if (alt.indexOf('Harem') != -1) ml = '25-30';
		else if (alt.indexOf('Treasury') != -1) ml = '21-25';
		else if (alt.indexOf('Throne') != -1) ml = '57\nMCD=3 for Glass Balls (+14 Mys)\nMCD=7 for Codpiece (+7 Mox)';
		else if (alt.indexOf('Laboratory') != -1) ml = '38-45';
		else if (alt.indexOf('Knob Shaft') != -1) ml = '30';
		else if (alt.indexOf('Menagerie Level 1') != -1) ml = '50-56';
		else if (alt.indexOf('Menagerie Level 2') != -1) ml = '60-66';
		else if (alt.indexOf('Menagerie Level 3') != -1) ml = '70-76';

		if (ml) this.setAttribute('title','ML: '+ml);
	});
}

// this is for the new, post-revamp version of the cyrpt.
function spoil_crypt() {
	$('img').each(function() {
		var ml = null; var src = this.getAttribute('src');
		if (src.indexOf("ul.gif") != -1) ml = '53-57, +Item'; // nook
		else if (src.indexOf("ur.gif") != -1) ml = '56-59, olfact dirty old lihc'; // niche
		else if (src.indexOf("ll.gif") != -1) ml = '55; +ML, +NC'; // cranny
		else if (src.indexOf("lr.gif") != -1) ml = '54-58, +Init'; //alcove
		if (ml) this.setAttribute('title','ML: '+ml);
	});
	$('area').each(function() {
		var ml = null; var alt = this.getAttribute('alt');
		if (alt.indexOf("Haert of the Cyrpt") != -1) ml = '91\nMCD=5 for Rib (2h staff, +5Mus/+5Mys/+15spellDmg)\nMCD=10 for vertebra (+hemp string=acc, +5Mus/+5Mys/+30Init)';
		if (ml) this.setAttribute('title','ML: '+ml);
	});
}

function spoil_woods() {
	$('img').each(function() {
		var ml = null; var src = this.getAttribute('src');
		if (src.indexOf("8bitdoor") != -1) ml = '20-25';
		else if (src.indexOf("kforest") != -1) ml = '123-133';
		else if (src.indexOf("hiddencity") != -1) ml = '145-156';
		else if (src.indexOf("forest") != -1) ml = '5';
		else if (src.indexOf("barrow") != -1) ml = '56-65';
		else if (src.indexOf("pen.") != -1) ml = '13-20';
		else if (src.indexOf("grove") != -1) ml = '34-36';
		else if (src.indexOf("temple") != -1) ml = 'scales to 50';
//		else if (src.indexOf("tavern") != -1) ml = '10';
		if (ml) this.setAttribute('title','ML: '+ml);
	});
}

function spoil_tavern() {
	$('area').each(function() {
		var ml = null; var src = this.getAttribute('title');
		if (src.indexOf("A Barroom Brawl") != -1) ml = '6-10';
		else if (src.indexOf("Tavern Cellar") != -1) ml = '10';
		if (ml) this.setAttribute('title','ML: '+ml);
	});
}

function spoil_island() {
	$('img').each(function() {
		var ml = null; var src = this.getAttribute('src');
		if (src.indexOf("island4") != -1) ml = '39-41';
		else if (src.indexOf("island6") != -1) ml = '39-41';
		else if (src.indexOf("cove") != -1) ml = '61-69';
		if (ml) this.setAttribute('title','ML: '+ml);
	});
}

function spoil_cove() {
	$('img').each(function() {
		var ml = null; var src = this.getAttribute('src');
		if (src.indexOf("cove3_2x1") != -1) ml = '80-83';
		else if (src.indexOf("cove3_3x1b") != -1) ml = '100';
		else if (src.indexOf("cove3_3x3b") != -1) ml = '120';
		else if (src.indexOf("cove3_5x2b") != -1) ml = '140';
		if (ml) this.setAttribute('title','ML: '+ml);
	});
}

function spoil_da() {		// dungeoneer's association, yay.
	$('img').each(function()
	{ 	var ml = null; var src = this.getAttribute('src');
		if (src.indexOf('ddoom') != -1) ml = '57-61';
		else if (src.indexOf('haikudungeon') != -1) ml = '3-5';
		else if (src.indexOf('limerickdungeon') != -1) ml = 'N/A';
		else if (src.indexOf('dailydungeon') != -1) ml = '12-20';
		else if (src.indexOf('greater.gif') != -1) ml = '55-60?';
		if (ml) this.setAttribute('title','ML: '+ml);
	});
}

function spoil_friars() {
	$('img').each(function() {
		var ml = null; var src = this.getAttribute('src');
		if (src.indexOf("neck") != -1) ml = '40-52';
		else if (src.indexOf("heart") != -1) ml = '42-50';
		else if (src.indexOf("elbow") != -1) ml = '44-48';
		else if (src.indexOf("stones") != -1) ml = '40-52';		// post-Azazel
		if (ml) this.setAttribute('title','ML: '+ml);
	});
}

function spoil_pandamonium()
{	$('area').each(function()
	{	var ml = null;
		var alt = this.getAttribute('alt');
		if (alt.indexOf('Slums') != -1) ml = '40-52';
		else if (alt.indexOf('Go Inside') != -1) ml = '60-66; CH imp';
		else if (alt.indexOf('Go Backstage') != -1) ml = '55-60; serialbus';
		if (ml) this.setAttribute('title','ML: '+ml);
	});
}

function spoil_beanstalk() {
	$('#stalk_airship > a > img').attr('title','ML: 91-120');
	$('#stalk_hole > a > img').attr('title','ML: 151-169');
}

function spoil_giantcastle() {
	$('#castle_basement > a > img').attr('title','ML: 125-150');
	$('#castle_groundfloor > a > img').attr('title','ML: 125-130');
	$('#castle_topfloor > a > img').attr('title','ML: 130-150');
}

function spoil_fernruin() {
	$('img[src*="ruins_5"]').attr('title','ML: 16-24');
}

function spoil_lair3() {
	var hedge = $('img[src*="hedgemaze.gif"]');
	if (hedge.length>0) {
		hedge.attr('title','ML: 232');
		$('img[src*="castletoptower.gif"]')
			.before(AppendLink('[hedge puzzle]', 'hedgepuzzle.php', false))
			.before('<br /><br />')
			.parent().attr('style','text-align:center;');
	}
}

function spoil_mountains() {
	$("img[src*='roflvalley']").attr('title','ML: 75-87');
	$("img[src*='bigbarrel']").attr('title','ML: 15/25/35');
}

function spoil_mclargehuge() {
	$('img').each(function() {
		var ml = null; var src = this.getAttribute('src');
		if (src.indexOf("goatlet") != -1) ml = '68';
		else if (src.indexOf("lair") != -1) ml = '80-90';
		else if (src.indexOf("mine") != -1) ml = '53-58';
		else if (src.indexOf("slope") != -1) ml = '73-75';
		else if (src.indexOf("peak") != -1) ml = '105-107';
		else if (src.indexOf("") != -1) ml = '';
		if (ml) this.setAttribute('title','ML: '+ml);
	});
}

function spoil_cave() {			// dark and dank and sinister cave, that is...
	$('img[src*="chamberbottom"]').attr('title','ML: 20-25');
	$('img[src*="chamber_door"]').attr('title','ML: 27');
}

function spoil_bigisland() {
	$('img').each(function() {
		var ml = null; var src = this.getAttribute('src');
		if (src.indexOf("nunnery1") != -1) ml = 'ML: 168';
		else if (src.indexOf("bfleft") != -1) ml = this.getAttribute('title') + ' (ML: 170-210)'; // don't overwrite image number info
		else if (src.indexOf("bfright") != -1) ml = this.getAttribute('title') + ' (ML: 170-210)';
		else if (src.indexOf("junk1") != -1) ml = 'ML: 168-172';
		else if (src.indexOf("junk3") != -1) ml = 'ML: 168-172';
		else if (src.indexOf("junk5") != -1) ml = 'ML: 168-172';
		else if (src.indexOf("junk7") != -1) ml = 'ML: 168-172';
		else if (src.indexOf("filth4") != -1) ml = 'ML: 165';
		else if (src.indexOf("filth6") != -1) ml = 'ML: 167';
		else if (src.indexOf("filth8") != -1) ml = 'ML: 169';
		else if (src.indexOf("filth9") != -1) ml = 'ML: 173';
		else if (src.indexOf("farm1d") != -1) ml = 'ML: 170-179, cold (weak=hot/spooky)';
		else if (src.indexOf("farm2d") != -1) ml = 'ML: 170-177, hot (weak=stench/sleaze)';
		else if (src.indexOf("farm3d") != -1) ml = 'ML: 173, sleaze (weak=cold/spooky)';
		else if (src.indexOf("farm4d") != -1) ml = 'ML: 175 (no elemental alignment)';
		else if (src.indexOf("farm5d") != -1) ml = 'ML: 166-168';
		else if (src.indexOf("farm6d") != -1) ml = 'ML: 169-174, stench (weak=cold/sleaze)';
		else if (src.indexOf("farm7d") != -1) ml = 'ML: 171-175, spooky (weak=hot/stench)';
		// farm8 is McMillicancuddy, he's never an adventurable zone
		else if (src.indexOf("farm9d") != -1) ml = 'ML: 165-180 (no elemental alignment)';
		else if (src.indexOf("bmim24") != -1) ml = 'ML: 240-250';		// wrong section?  hippy camp, bombed.
		else if (src.indexOf("bmim23") != -1) ml = 'ML: 230-255';		// wrong section?  frat house, bombed.
		else if (src.indexOf("lighthouse_left") != -1) ml = 'ML: 171';

		if (ml) this.setAttribute('title',ml);
	});
}

function spoil_postwarisland() {
	$('img').each(function() {
		var ml = null; var src = this.getAttribute('src');
		// Note to wiki peoples: more spoilers, plz
		if (src.indexOf("nunnery1") != -1) ml = '168';
		else if (src.indexOf("22.gif") != -1) ml = '61-69';		// pirate cove, undisguised
		else if (src.indexOf("23.gif") != -1) ml = '230-255';	// frathouse, bombed
		else if (src.indexOf("24.gif") != -1) ml = '240-250'; 	// hippy camp, bombed
		else if (src.indexOf("25.gif") != -1) ml = '169-172';	// Junkyard
		else if (src.indexOf("26.gif") != -1) ml = '169-180';	// McMillicancuddy
		else if (src.indexOf("27.gif") != -1) ml = '39-41'; 	// frathouse, unbombed
		else if (src.indexOf("28.gif") != -1) ml = '39-41'; 	// hippy camp, unbombed
		if (ml) this.setAttribute('title','ML: '+ml);
	});
}

function spoil_thesea() {
	$('img').each(function() {
		var ml= null; var src = this.getAttribute('src');
		if      (src.indexOf("sea1") != -1) ml = '300-330';		// briny
		else if (src.indexOf("sea2") != -1) ml = '350-400';		// brinier
		else if (src.indexOf("sea3") != -1) ml = '375-425';		// briniest
		if (ml) this.setAttribute('title','ML: '+ml);
	});
}

function spoil_seafloor() {
	$('img').each(function() {
		var ml= null; var src = this.getAttribute('src');
		if      (src.indexOf("garden") != -1) ml = '350-450';		// octopus's garden
		else if (src.indexOf("divebar") != -1) ml = '400-600';		// dive bar
		else if (src.indexOf("mine") != -1) ml = '400-500';			// anemone mine
		else if (src.indexOf("trench") != -1) ml = '400-550';		// marinara trench
		else if (src.indexOf("utpost") != -1) ml = '650-750';		// mer-kin outpost
		else if (src.indexOf("shipwreck") != -1) ml = '400-700';	// Fitzsimmons
		else if (src.indexOf("reef") != -1) ml = '400-500';			// Madness Reef
		else if (src.indexOf("abyss") != -1) ml = '600-650';		// Calyginous Abyss
		else if (src.indexOf("corral") != -1) ml = '600-750';		// Coral Corral
//		else if (src.indexOf("") != -1) ml = '';
		if (ml) this.setAttribute('title','ML: '+ml);
	});
}
function spoil_sea_merkin() {
	$('area').each(function() {
		var ml = null;
		var title = this.getAttribute('title');
		if      (title.indexOf('Mer-kin Colosseum') != -1) ml = '800-1300';
		else if (title.indexOf('Mer-kin Gymnasium') != -1) ml = '720-780';
		else if (title.indexOf('Mer-kin Elementary School') != -1 ) ml = '600-700';
		else if (title.indexOf('Mer-kin Library') != -1) ml = '750-850';
		else if (title.indexOf('Mer-kin Temple') != -1) ml = '4000 (as gladiator), 400 (as scholar), 42000 (Dad)';
		if (ml) this.setAttribute('title','ML: '+ml);
	});
}

function spoil_sea_skatepark() {
	$('img').each(function() {
		var ml = null;
		var src = this.getAttribute('src');
		if      (src.indexOf("rumble") != -1) ml = "ML: 350-450";
		else if (src.indexOf("ice_territory") != -1) ml = "ML: 350-400";
		else if (src.indexOf("roller_territory") != -1) ml = "ML: 350-450";
		else if (src.indexOf("lutz") != -1) ml = "receive 30 turns of Fishy (underwater adventures take only 1 turn)";
		else if (src.indexOf("comet") != -1) ml = "receive 30 turns of Finstrong (reduce diving penalty by 30)";

		if (ml) this.setAttribute('title',ml);
	});
}

function spoil_wormwood() {
	$('img').each(function() {
		var ml= null; var src = this.getAttribute('src');
		if (src.indexOf("wormwood3") != -1) ml = 'ML scales up to 125\nturn 9-7 for skirt, STLT, myst\nturn 5-4 for !pipe, necklace, moxie\nturn 1 for flask, mask, muscle'; // Mansion
		if (src.indexOf("wormwood4") != -1) ml = 'ML scales up to 125\nturn 9-7 for mask, !pipe, muscle\nturn 5-4 for skirt, flask, myst\nturn 1 for STLT, necklace, moxie'; // dome
		if (src.indexOf("wormwood8") != -1) ml = 'ML scales up to 125\nturn 9-7 for necklace, flask, moxie\nturn 5-4 for mask, STLT, muscle\nturn 1 for skirt, !pipe, myst'; // windmill
		if (ml) this.setAttribute('title',ml);
	});
}

// MTNOOB: Open letter! Yay!
function at_tutorial() {
	if (location.search.indexOf("toot") == -1) return;
	$('b:contains("Ralph")').append(
		AppendLink('[read]', inv_use(1155)));
}

// DESC_ITEM: Add use boxes/links to item descriptions
function at_desc_item() {
  linkKOLWiki();
}

function at_desc_effect() {
  linkKOLWiki();
}

function linkKOLWiki() {
  var b = $('b:first');
  b.wrap('<a href="http://kol.coldfront.net/thekolwiki/index.php/'+
	 'Special:Search?search='+ b.text().replace(/\s/g, '+').replace('"', '') +'&go=Go" '+
	 'target="_blank"></a>');
}

// ICONMENU:  maybe one day we'll do something to make this travesty of a menu more useful, but I don't know how right now.
function at_iconmenu() {
}

// TOPMENU: Add some new links to the top pane.
function at_topmenu() {
	// moonslink script cheerfully borrowed from Beingeaten
	if (GetPref('moonslink')== 1) {
		var moons = $('img[src*="moon"]');
		var calendarURL = 'http://noblesse-oblige.org/calendar/';
		var moonlink = document.createElement('a');
		moonlink.setAttribute('target','_blank');
		moonlink.setAttribute('href', calendarURL);
		moons.attr('border',0);
		moons.wrap(moonlink);
	}
//end moonslink

	// some housekeeping stuff that I want to make sure gets checked regularly and can't think of a better place for...
	// gotta clear these out when you ascend, which you may do on a different computer occasionally.
	if (integer(GetCharData('level')) < 10) {
		SetCharData("corner178",0);
		SetCharData("corner179",0);
		SetCharData("corner180",0);
		SetCharData("corner181",0);
		SetCharData("winelist",'');
		SetCharData("wineHTML",'');
		SetCharData("winesNeeded",'');
		SetCharData("altar1",'');
		SetCharData("altar2",'');
		SetCharData("altar3",'');
		SetCharData("altar4",'');
		SetCharData("nunmoney",0);
	}
	var compactmode = document.getElementsByName('loc').length; // compact mode has a dropdown listbox called 'loc', full mode doesn't.
	if (compactmode > 0) {
		at_compactmenu();
		return;
	}
	var iconmode = document.getElementsByClassName('menuitem').length;
	if (iconmode > 0) {
		at_iconmenu();
		return;
	}

	// Test if quickskills is present. TODO: Find a cleaner way to do this.
	var quickSkills = 0, moveqs = 0;
	if ($('center:first').html().indexOf("javascript:skillsoff();") != -1)
	{
		quickSkills = 1;
		moveqs = GetPref('moveqs');
		// tweak the topmenu frame size if quickskills is present.
		var topframeset = top.document.getElementsByTagName && top.document.getElementsByTagName("frameset");
		if (topframeset && topframeset[1] && topframeset[1].rows) {
			topframeset[1].rows = "56,*";
		}
	}

	// Set defaults if needed
	Defaults(0);

	var toprow1 = 0, toprow2, toprow3, front;
	var shorttop = 0, haveLair = 0, weBuildHere;
	if (GetPref('shortlinks') % 2 > 0) {
		shorttop = 1;
		toprow1 = document.createElement('span');
		toprow2 = document.createElement('span');
		front = GetPref('toprow');
	}

	// Find all links and attach event handlers
	$('a').each(function(ind) {
		var a = $(this);
		var txt = a.text();

		// prefs
		var splitinv = GetPref('splitinv');
		var splitquest = GetPref('splitquest');
		var splitmsg = GetPref('splitmsg');
		var logoutconf = GetPref('logout');

		// Map / Skills links
		if (ind == 0 && quickSkills == 1 && moveqs > 0)
			a.parent().attr('style','display:none;');


		// Yes I know this link only applies to a handful of people. I'm doing it anyway.
		if (txt == "devster panel") a.html("devster");

		// shorten things up to make some room for our other additions
		if (txt == "campground") a.html("camp");
		if (txt == "mountains") a.html("mtns");

		// change default mall link
		//if ((txt == "mall") && GetPref("malllink") == 1) a.attr("href","searchmall.php");

		// Lair
		if (txt == "lair") haveLair = 1;

		// bugbear challenge run
		if (txt == "ship") a.attr("href",to_place("bugbearship"));

		// Confirm logout
		if (txt == "log out" && logoutconf == 1) {
			a.after('<a href="javascript:void(0);" onclick="this.' +
'previousSibling.innerHTML=\'logout\'; this.innerHTML=\'\';"></a>');
			a.replaceWith('<a target="_top" href="logout.php" ' +
'onclick="if(this.innerHTML!=\'sure?\') { this.blur(); ' +
'this.innerHTML=\'sure?\'; this.nextSibling.' +
'innerHTML=\' (nope)\'; return false; }">log out</a>');
		}

		if (txt == "plains") {
			a.after(' <a href="manor.php" target="mainpane">manor</a>');

			if (integer(GetCharData('level')) > 9)
				a.after(' <a href="' + to_place('beanstalk') + '" target="mainpane">stalk</a>');

			// This is as good a place as any; get span for adding links later.
			weBuildHere = a.parent().get(0);
			weBuildHere.parentNode.setAttribute('nowrap','nowrap');
		}

		if (txt == "beach") {
			if (integer(GetCharData('level')) > 12)
			a.after(' <a href="' + to_place("thesea") +'" target="mainpane">sea</a>');
		}

		if (txt == "town") {
			a.html("town:");
			a.after(' <a href="da.php" target="mainpane">dungeons</a>');
//			a.after(' <a href="forestvillage.php" target="mainpane">F-ville</a>');
			a.after(' <a href="bordertown.php" target="mainpane">B-town</a>');
			a.after(' <a href="town_right.php" target="mainpane">R)</a>');
			a.after(' <a href="town_wrong.php" target="mainpane">(W</a>');
		}

		// Remove last row, which will be manually re-added.
		if (shorttop) {
			if (txt == "documentation" || txt == "report bug"
			||  txt == "store" ||  txt == "donate" ||  txt == "forums")
			{	a.html("");
				a.get(0).nextSibling.textContent = "";
			} if (txt.indexOf("radio") != -1) a.html("");
		}

		// Inventory
		if (txt == "inventory" && splitinv == 1) {
			a.html('ory').attr('href','inventory.php?which=3')
				.before('<a href="inventory.php?which=1" '+
					'target="mainpane">inv</a>')
				.before('<a href="inventory.php?which=2" ' +
					'target="mainpane">ent</a>');
			a.after(' <a href="inventory.php?which=f0" target="mainpane">fav</a>');	// 21Dec09 Hellion: added favorites link.
		}

		// Quests
		if (txt == "quests" && splitquest == 1) {
			a.html('sts').attr('href','questlog.php?which=4')
				.before('<a href="questlog.php?which=1" '+
					'target="mainpane">que</a>');
		}

		// Messages
		if (txt == "messages" && splitmsg > 0) {
			switch (splitmsg) {
				case 2: a.attr('href','messages.php?box=Outbox'); break;
				case 3: a.attr('href','messages.php?box=Saved'); break;
				case 4: a.attr('href','messages.php?box=PvP'); break;
				default: a.attr('href','sendmessage.php');
			}
			a.html('ages').before('<a href="messages.php" ' +
				'target="mainpane">mess</a>');
		}

		// Ass-metric link. Surround it in a named span for easy hiding.
		if (moveqs > 0 && txt == "Asymmetric Publications, LLC") {
			a.parent().wrapAll('<span name="assy" id="menus"></span>');
		}
	});

	// Attach skills link to Sword and Martini Guy
	var swordGuy = $('img:first[src*="smallleft"]');
	var swordGuyURL = GetPref('swordguy');
	if (swordGuyURL != '' && swordGuy.length > 0) {
		var guy = document.createElement('a');
		if (swordGuyURL.indexOf("http://") != -1)
			guy.setAttribute('target','_blank');
		else guy.setAttribute('target','mainpane');
		guy.setAttribute('href', swordGuyURL);
		swordGuy.attr('border',0);
		swordGuy.attr('id','swordguy');	// add ID tag for later easy selection
		swordGuy.wrap(guy);

		swordGuy.get(0).addEventListener('contextmenu', function(event) {
			var nuhref = prompt('Where would you like this link to point?',
				GetPref('swordguy'));
			var ln = this.parentNode;
			if (nuhref) {
				SetPref('swordguy', nuhref);
				swordGuy = nuhref;
			}
			ln.setAttribute('href', nuhref);
			if (nuhref.indexOf("http://") != -1)
				ln.setAttribute('target','_blank');
			else ln.setAttribute('target','mainpane');
			event.preventDefault(); event.stopPropagation();
			return false;
		}, false);

		swordGuy = swordGuy.parent().get(0); // For use later
	}

	// Add rows of links
	if (shorttop) {
		var a;

		toprow1.setAttribute("name","toprow1");
		if (front != 1) toprow1.setAttribute("style","display: none;");

		for (var j=0; j<10; j++) {
			var zoiks = GetPref('menu1link'+j); var tarjay = 'mainpane';
			var zplit = zoiks.split(';');
			if (zplit[0] == "guildstore") {
				AddTopLink(toprow1, 'mainpane', 'fnord', '', 1);
				AddTopLink(toprow1, 'mainpane', 'smeg', '', 1);
				GM_get(server+'store.php?whichstore=2', function(t) {
					if (t.length>10 && t.indexOf("You don't belong") == -1)
						$('a[href="fnord"]')
						.attr('href', 'store.php?whichstore=2')
						.html('gouda');
				});
				GM_get(server+'store.php?whichstore=3', function(t) {
					if (t.length>10 && t.indexOf("You don't belong") == -1)
						$('a[href="smeg"]')
						.attr('href', 'store.php?whichstore=3')
						.html('smack');
				})

			} else if (zoiks != "") {
				if (zoiks.indexOf("http://") != -1) tarjay = '_blank';
				AddTopLink(toprow1, tarjay, zplit[1], zplit[0], 1);
			} else break;
		}
		toprow1.appendChild(document.createElement('br'));
		var poop = document.createElement('span'); poop.innerHTML = "&nbsp;";
		toprow1.appendChild(poop);
						AddTopLink(toprow1, 'mainpane', 'multiuse.php', 'multi-use', 1);
		var aPaste =	AddTopLink(toprow1, 'mainpane', 'craft.php?mode=combine', 'combine', 1);
						AddTopLink(toprow1, 'mainpane', 'sellstuff.php', 'sell', 1);
		var aCook =		AddTopLink(toprow1, 'mainpane', 'craft.php?mode=cook', 'cook', 1);
		var aBooze =	AddTopLink(toprow1, 'mainpane', 'craft.php?mode=cocktail', 'mix', 1);
		var aSmith =	AddTopLink(toprow1, 'mainpane', 'craft.php?mode=smith', 'smith', 1);
						AddTopLink(toprow1, 'mainpane', 'council.php', 'council', 1);
						AddTopLink(toprow1, 'mainpane', 'guild.php', 'guild', 1);

		// Right craft links to do discoveries instead
		$([aPaste,aCook,aBooze,aSmith]).on("contextmenu", function(e) {
			e.preventDefault();
			top.frames[2].location = this.href.replace('mode=', 'mode=discoveries&what=');
			return false;
		});

		if (haveLair == 1 && integer(GetCharData('level')) == 13)
			AddTopLink(toprow1, 'mainpane', 'lair2.php?action=door', 'door', 1);

		a = document.createElement('a');
		a.innerHTML = '';
		a.setAttribute('id','florist');
		a.setAttribute('href','#');
		a.setAttribute('target','mainpane');
		toprow1.appendChild(a);
		GM_get(server+to_place('forestvillage&action=fv_friar'), function(t) {
			if (t.length>10 && t.indexOf("Back to the Distant Woods") == -1) {
				$('#florist').html('florist')
					.attr('href',to_place('forestvillage&action=fv_friar'));
				SetCharData("hasflorist",true);
			} else {
				SetCharData("hasflorist",false);
			}
		});
		toprow1.appendChild(document.createTextNode(" "));

		a = document.createElement('a');
		a.innerHTML = "more";
		a.setAttribute('href','#');
		a.addEventListener('click', function(event) {
			var tr1 = document.getElementsByName("toprow1")[0];
			var tr2 = document.getElementsByName("toprow2")[0];
			tr1.style.display = "none";
			tr2.style.display = "inline";
			SetPref('toprow', 2);
		}, true);
		toprow1.appendChild(a);
		toprow1.appendChild(document.createTextNode(" "));

		toprow2.setAttribute("name","toprow2");
		if (front != 2) toprow2.setAttribute("style","display: none;");

		for (var j=0; j<10; j++) {
			var zoiks = GetPref('menu2link'+j); var tarjay = 'mainpane';
			if (zoiks != "") {
				if (zoiks.indexOf("http://") != -1 || zoiks.indexOf("searchplayer") != -1) tarjay = '_blank';
				AddTopLink(toprow2, tarjay, zoiks.split(';')[1], zoiks.split(';')[0], 1);
			} else break;
		}

		toprow2.appendChild(document.createElement('br'));
		AddTopLink(toprow2, 'mainpane', 'doc.php?topic=home', 'documentation', 1);
		AddTopLink(toprow2, 'mainpane', 'adminmail.php', 'report bug', 1);
		AddTopLink(toprow2, '_blank', 'http://store.asymmetric.net', 'store', 1);
		AddTopLink(toprow2, '_blank', 'donatepopup.php', 'donate', 1);
		AddTopLink(toprow2, '_blank', 'http://forums.kingdomofloathing.com', 'forums', 1);
		AddTopLink(toprow2, '_blank', 'radio.php', 'radio', 1);

		a = document.createElement('a');
		a.innerHTML = "more";
		a.setAttribute('href','#');
		a.addEventListener('click', function(event) {
			var tr2 = document.getElementsByName("toprow2")[0];
			var tr1 = document.getElementsByName("toprow1")[0];
			tr2.style.display = "none";
			tr1.style.display = "inline";
			SetPref('toprow', 1);
		}, true);
		toprow2.appendChild(a);

		// Actually add the stuffy-stuff to the span we grabbed earlier
		weBuildHere.appendChild(toprow1);
		weBuildHere.appendChild(toprow2);
	}

	// Move Quick-Skills
	if (moveqs > 0)	{
		weBuildHere.setAttribute('id','menus2');

		var if1 = $('#skillpane');
		var if2 = if1.clone(true);
		if1.remove();
		if (moveqs == 1) {
			$('#swordguy').parent().parent().prepend(if2).wrap('<td />');
		}
		else if (moveqs == 2) {
			$('#themoons').parent().parent().append(if2).wrap('<td />');
		}
		for (var i=0; i< document.links.length; i++) {
			if (document.links[i].href.indexOf("skillson") != -1) break;
		}
		if (document.links[i].href.indexOf("skillson") != -1) {
			document.location = document.links[i];
		}
	}
}

// ASCEND: Make sure we're really ready to jump into that gash.
function at_ascend() {
	var checklist = GetPref('ascension_list');
	if (checklist != '') {
		checklist = checklist.replace(/,/g,"<br>");
		checklist = "<center><b>Checklist:</b><br>" + checklist + "</center>";
		var clDisplay = document.createElement('div');
		clDisplay.innerHTML = checklist;
		document.body.appendChild(clDisplay);
	}
}

// COMPACTMENU: Add options to menus and stuff.
function at_compactmenu() {
	var selectItem, links, oonTD, linkTD;
	var quickSkills = 0, moveqs = 0;

	// Set defaults if needed
	Defaults(0);

	moveqs = GetPref('moveqs');
	links = document.getElementsByTagName('a');
	for (var i=0, len=links.length; i<len; i++) {
		var temp = links[i];

		if (temp.text.indexOf("menu") != -1) {
			quickSkills = 1;
			if (moveqs > 0) {
				temp.innerHTML = "";
				linkTD = temp.parentNode;
			}
		}

		if (temp.innerHTML.indexOf("20") != -1) {
			if (moveqs > 0 && quickSkills > 0) {
				oonTD = temp.parentNode;
				temp.innerHTML = '';

				var iframe = document.getElementsByName('skillpane')[0];
				var menuspan = document.getElementsByName('menus')[0];
				linkTD.nextSibling.childNodes[1].setAttribute('id','menus2');
				linkTD.nextSibling.setAttribute('style','width:100%;');
				oonTD.appendChild(iframe.parentNode);
				if (moveqs == 1) // Left
					linkTD.parentNode.insertBefore(oonTD, linkTD.nextSibling);
				else // Right
					oonTD.parentNode.insertBefore(linkTD, oonTD);

				// Remove Moons label. Sneakily.
				temp = document.getElementsByTagName('b')[0];
				if (temp.innerHTML.indexOf('Moons') != -1) {
					var umspan = document.createElement('span');
					temp.parentNode.setAttribute('style','display:none;');
					umspan.setAttribute('id','menus');
					temp.parentNode.appendChild(umspan);
					umspan.appendChild(temp);
				}
				iframe.contentWindow.setTimeout('self.location = "skills.php?tiny=1";',50);
			}
		}
	}

	// Camera One!
	if (GetPref('shortlinks') % 2 > 0 || GetPref('splitinv') == 1) {
		selectItem = document.getElementsByTagName('select')[0];
		//selectItem.setAttribute('style','font-size: 9pt;');
		selectItem.parentNode.parentNode.setAttribute('nowrap','nowrap');
		for (i=0; i<selectItem.options.length; i++)	{
			if (GetPref('splitinv') == 1 && selectItem.options[i].innerHTML == "Inventory") {
				selectItem.options[i].innerHTML = "Consumables";
				selectItem.options[i].value = "inventory.php?which=1";
				AddTopOption("Equipment", "inventory.php?which=2", selectItem, selectItem.options[i+1]);
				AddTopOption("Miscellaneous", "inventory.php?which=3", selectItem, selectItem.options[i+2]);
				AddTopOption("Favorites","inventory.php?which=f0",selectItem,selectItem.options[i+3]);
				if (GetPref('shortlinks') % 2 == 0) break;
			}
// if splitquest pref is set, make Quests go to Current Quests and add a Notes entry.
// otherwise Quests always goes to the Notes page.
			if (selectItem.options[i].innerHTML == "Quests") {
				if (GetPref('splitquest')) {
					AddTopOption("Notes","questlog.php?which=4", selectItem, selectItem.options[i+1]);
					selectItem.options[i].value="questlog.php?which=1";
				}
				else selectItem.options[i].value="questlog.php?which=4";
			}

			if (selectItem.options[i].innerHTML == "Options") {
				AddTopOption("-", "nothing", selectItem, selectItem.options[i+1]);
				AddTopOption("Multi-Use", "multiuse.php", selectItem, selectItem.options[i+2]);
				AddTopOption("Combine", "craft.php?mode=combine", selectItem, selectItem.options[i+3]);
				AddTopOption("Sell Items", "sellstuff.php", selectItem, selectItem.options[i+4]);
				AddTopOption("Cook Food", "craft.php?mode=cook", selectItem, selectItem.options[i+5]);
				AddTopOption("Mix Drinks", "craft.php?mode=cocktail", selectItem, selectItem.options[i+6]);
				AddTopOption("Smith/Smash", "craft.php?mode=smith", selectItem, selectItem.options[i+7]);
				AddTopOption("Closet", "closet.php", selectItem, selectItem.options[i+8]);
				AddTopOption("-", "nothing", selectItem, selectItem.options[i+9]);
			}
			if (GetPref('logout') == 1 && selectItem.options[i].innerHTML == "Log Out") {
				selectItem.options[i].value = "logout";
				selectItem.setAttribute('onchange', 'if (document.navform1.loc.value!="logout") goloc(); ' +
					'else if (confirm("Log out?")) parent.frames[2].location = "logout.php"; ' +
					'else this.selectedIndex=0;');
			}
		}
	}

	// Camera Two!
	if (GetPref('shortlinks') % 2 > 0) {
		selectItem = document.getElementsByTagName('select')[1];
		selectItem.parentNode.parentNode.setAttribute('nowrap','nowrap');
		for (var i=0, len = selectItem.options.length; i<len; i++) {
			if (selectItem.options[i].innerHTML.indexOf("Nearby Plains") != -1) {
				AddTopOption("The Beanstalk", to_place("beanstalk"), selectItem, selectItem.options[i+1]);
				AddTopOption("Spookyraven Manor", "manor.php", selectItem, selectItem.options[i+2]);
				len += 2;	// extend loop to cover new options just added.
			}
			if (selectItem.options[i].innerHTML.indexOf("Seaside Town") != -1) {
				AddTopOption("Town: Wrong side","town_wrong.php", selectItem, selectItem.options[i+1]);
				AddTopOption("Town: Right side","town_right.php", selectItem, selectItem.options[i+2]);
				AddTopOption("Town: Dungeons","da.php", selectItem, selectItem.options[i+3]);
				len += 3;
			}
			if (selectItem.options[i].innerHTML.indexOf("Desert Beach") != -1) {
				if (integer(GetCharData('level')) > 12) {
					AddTopOption("The Sea",to_place("thesea"),selectItem, selectItem.options[i+1]);
					// len++;
				}
			}
		}

		AddTopOption("-", "nothing", selectItem, 0);
		AddTopOption("Council of Loathing", "council.php", selectItem, 0);
		AddTopOption("Class Guild", "guild.php", selectItem, 0);
		AddTopOption("Market Square", "town_market.php", selectItem, 0);
		AddTopOption("Hermitage", "hermit.php", selectItem, 0);
		AddTopOption("Untinker",to_place('forestvillage&action=fv_untinker'), selectItem, 0);
		AddTopOption("Mystic Crackpot", to_place("forestvillage&action=fv_mystic"), selectItem, 0);
		AddTopOption("Bounty Hunter", "bhh.php", selectItem, 0);
		AddTopOption("Gouda's Grocery", "store.php?whichstore=2", selectItem, 0);
		AddTopOption("Smacketeria", "store.php?whichstore=3", selectItem, 0);
		AddTopOption("General Store", "store.php?whichstore=m", selectItem, 0);
		AddTopOption("Doc Galaktik", "galaktik.php", selectItem, 0);
		AddTopOption("Laboratory", "cobbsknob.php?action=dispensary", selectItem, 0);
		AddTopOption("Hippy Store", "store.php?whichstore=h", selectItem, 0);
		AddTopOption("Display Case", "managecollection.php", selectItem, 0);
		AddTopOption("Hagnk","storage.php",selectItem,0);
		GM_get(server+to_place('forestvillage&action=fv_friar'), function(t) {
			if (t.length>10 && t.indexOf("Back to the Distant Woods") == -1) {
				AddTopOption("Florist",to_place('forestvillage&action=fv_friar'),selectItem, 0);
				SetCharData("hasflorist",true);
			} else {
				SetCharData("hasflorist",false);
			}
		});
	}
}

// ------------------------------

function buildPrefs() {
	if (!document.querySelector('#privacy')) return;
	var scriptID = "MrScript";
	var scriptName = "Mr. Script's Choicetastic Optionarium";
	if (!document.querySelector('#scripts')) {
		//scripts tab is not built, do it here
		var scripts = document.querySelector('ul').appendChild(document.createElement('li'));
		scripts.id = 'scripts';
		var a = scripts.appendChild(document.createElement('a'));
		a.href = 'javascript:void(0);';
		var img = a.appendChild(document.createElement('img'));
		img.src = 'http://images.kingdomofloathing.com/itemimages/cmonkey1.gif';
		img.align = 'absmiddle';
		img.border = '0';
		img.style.paddingRight = '10px';
		a.appendChild(document.createTextNode('Scripts'));
		a.style = 'padding: 10px 15px 10px 0';
		a.addEventListener('click', function (e) {
			//make our new tab active when clicked, clear out the #guts div and add our settings to it
			e.stopPropagation();
			document.querySelector('.active').className = '';
			document.querySelector('#scripts').className = 'active';
			document.querySelector('#guts').innerHTML = '<div class="scaffold"></div>';
			document.querySelector('#guts').appendChild(buildSettings());
			//click handler for everything in this section
			//document.querySelector('#' + scriptID).addEventListener('click', changeSettings, false);
		}, false);
	} else {
		//script tab already exists
		document.querySelector('#scripts').firstChild.addEventListener('click', function (e) {
			//some other script is doing the activation work, just add our settings
			e.stopPropagation();
			document.querySelector('#guts').appendChild(buildSettings());
			//click handler for everything in this section
			//document.querySelector('#' + scriptID).addEventListener('click', changeSettings, false);
		}, false);
	}

	function createPrefPage(prefSpan) {

		// Reset only new prefs that the user has never seen before
		Defaults(0);

		var choice = MakeOption("Clicking Number Boxes: ", 3, 'autoclear', "Does Zilch", "Clears");
		var select = choice.firstChild.cells[1].firstChild;
		select.options[2].innerHTML = "Highlights";
		prefSpan.appendChild(choice);

		choice = MakeOption("Max HP/MP Calculation: ", 3, 'safemax', "Average", "Safe");
		select = choice.firstChild.cells[1].firstChild;
		select.options[2].innerHTML = "Really Safe";
		prefSpan.appendChild(choice);

		choice = MakeOption("Extra Shortcut Links: ", 4, 'shortlinks', "Off", "Top Only");
		select = choice.firstChild.cells[1].firstChild;
		select.options[2].innerHTML = "Main Only";
		select.options[3].innerHTML = "On";
		prefSpan.appendChild(choice);

		choice = MakeOption("Omnipresent Quick-Skills: ", 3, 'moveqs', "Off", "On (Left)");
		select = choice.firstChild.cells[1].firstChild;
		select.options[2].innerHTML = "On (Right)";
		prefSpan.appendChild(choice);

		prefSpan.appendChild(MakeOption("Inline Item Descriptions: ", 2, 'inlineitemdesc', "Off", "On"));

		prefSpan.appendChild(MakeOption("Split Inventory Link: ", 2, 'splitinv', "Off", "On"));
		prefSpan.appendChild(MakeOption("Split Quest Link: ", 2, 'splitquest', "Off", "On"));
		choice = MakeOption("Split Messages Link: ", 5, 'splitmsg', "Off", "New Message");
		select = choice.firstChild.cells[1].firstChild;
		select.options[2].innerHTML = "Outbox";
		select.options[3].innerHTML = "Saved";
		select.options[4].innerHTML = "PvP";
		prefSpan.appendChild(choice);
//		prefSpan.appendChild(MakeOption("Mall Link -> Search", 2, 'malllink', "Off", "On"));

		prefSpan.appendChild(MakeOption("ML and zone Spoilers: ", 2, 'zonespoil', "Off", "On"));
		prefSpan.appendChild(MakeOption("Never Grey Out Skills: ", 2, 'nodisable', "Off", "On"));
		prefSpan.appendChild(MakeOption("1-Klick Klaw: ", 2, 'klaw', "Off", "On"));
		prefSpan.appendChild(MakeOption("Logout Confirmation: ", 2, 'logout', "Off", "On"));
		prefSpan.appendChild(MakeOption("Telescope Spoilers: ", 2, 'telescope', "Off", "On"));
		prefSpan.appendChild(MakeOption("Lair Spoilers: ", 2, 'lairspoil', "Off", "On"));
		prefSpan.appendChild(MakeOption("Moons link to NO Calendar: ", 2, 'moonslink', "No", "Yes"));
		prefSpan.appendChild(MakeOption("Sword-Guy Link: ", -1, 'swordguy', 0, 0));
		prefSpan.appendChild(MakeOption("Backup Outfit Name: ", -1, 'backup', 0, 0));
		prefSpan.appendChild(MakeOption("Ascension Checklist: ", -1, 'ascension_list', 0, 0));

        choice = MakeOption("Compress familiar/thrall info: ", 3, 'compressfam', "No", "Yes");
        select = choice.firstChild.cells[1].firstChild;
        select.options[2].innerHTML = "Show Fam Wgt/XP";
        prefSpan.appendChild(choice);

        prefSpan.appendChild(MakeOption("Questblock to bottom of charpane: ", 2, 'questbottom', "No", "Yes"));
        prefSpan.appendChild(MakeOption("Monster name links to wiki: ", 2, 'monsterlinks', "No", "Yes"));
        prefSpan.appendChild(MakeOption("Choice Title links to wiki: ", 2, 'choicelinks', "No", "Yes"));
	}

	function createMenu1(menu1Span) {
		// Customized Links, Take 1
		for (var j=0; j<10; j++) {
			var menutxt = GetPref('menu1link'+j);
			if (menutxt != undefined) menutxt = menutxt.split(';')[0];
			else menutxt = "";
			menu1Span.appendChild(MakeOption(menutxt, -2, 'menu1link'+j), 0, 0);
		}
		var select = document.createElement('a');
		select.innerHTML = 'Restore Defaults'; select.href = '#';
		select.setAttribute('class','tiny');
		select.addEventListener('click',function(event) {
			event.stopPropagation(); event.preventDefault();
			if (confirm("Restore default menu options? (Just double-checking.)") == false) return;
			Defaults(1);
			for (var i=0; i<10; i++) {
				var tag = document.getElementsByName('menu1link'+i+'tag')[0];
				var link = document.getElementsByName('menu1link'+i)[0];
				tag.value = GetPref('menu1link'+i).split(';')[0];
				if (tag.value == "undefined") tag.value = "";
				link.value = GetPref('menu1link'+i).split(';')[1];
				if (link.value == "undefined") link.value = "";
			} top.frames[0].location.reload();
		}, true);
		var choice = document.createElement('input');
		choice.type = 'submit'; choice.setAttribute('class','button');
		choice.value = 'Apply'; choice.href = '#';
		choice.addEventListener('click',function(event) {
			event.stopPropagation(); event.preventDefault();
			for (var i=0; i<10; i++) {
				var tag = document.getElementsByName('menu1link'+i+'tag')[0].value;
				var link = document.getElementsByName('menu1link'+i)[0].value;
				if (tag != undefined && link != undefined && tag != "")
					SetPref('menu1link'+i,tag+';'+link);
				else SetPref('menu1link'+i,';');
			} top.frames[0].location.reload();
		}, true);
		menu1Span.appendChild(document.createElement('center'));
		menu1Span.lastChild.appendChild(select);
		menu1Span.lastChild.appendChild(document.createElement('br'));
		menu1Span.lastChild.appendChild(document.createElement('br'));
		menu1Span.lastChild.appendChild(choice);
	}

	function createMenu2(menu2Span) {
		// Customized Links, Take 2
		for (var j=0; j<10; j++) {
			var menutxt = GetPref('menu2link'+j);
			if (menutxt != undefined) menutxt = menutxt.split(';')[0];
			else menutxt = "";
			menu2Span.appendChild(MakeOption(menutxt, -2, 'menu2link'+j), 0, 0);
		}
		var select = document.createElement('a');
		select.innerHTML = 'Restore Defaults'; select.href = '#';
		select.setAttribute('class','tiny');
		select.addEventListener('click',function(event) {
			event.stopPropagation(); event.preventDefault();
			if (confirm("Restore default menu options? (Just double-checking.)") == false) return;
			Defaults(2);
			for (var i=0; i<10; i++) {
				var tag = document.getElementsByName('menu2link'+i+'tag')[0];
				var link = document.getElementsByName('menu2link'+i)[0];
				tag.value = GetPref('menu2link'+i).split(';')[0];
				if (tag.value == "undefined") tag.value = "";
				link.value = GetPref('menu2link'+i).split(';')[1];
				if (link.value == "undefined") link.value = "";
			} top.frames[0].location.reload();
		}, true);
		var choice = document.createElement('input');
		choice.type = 'submit'; choice.setAttribute('class','button');
		choice.value = 'Apply'; choice.href = '#';
		choice.addEventListener('click',function(event) {
			for (var i=0; i<10; i++) {
				var tag = document.getElementsByName('menu2link'+i+'tag')[0].value;
				var link = document.getElementsByName('menu2link'+i)[0].value;
				if (tag != undefined && link != undefined && tag != "")
					SetPref('menu2link'+i,tag+';'+link);
				else SetPref('menu2link'+i,';');
			} top.frames[0].location.reload(); event.stopPropagation(); event.preventDefault();
		}, true);
		menu2Span.appendChild(document.createElement('center'));
		menu2Span.lastChild.appendChild(select);
		menu2Span.lastChild.appendChild(document.createElement('br'));
		menu2Span.lastChild.appendChild(document.createElement('br'));
		menu2Span.lastChild.appendChild(choice);
	}

	function createBottomBar(centeredlinks) {
		var ulspan = document.createElement('div');
		var ul = document.createElement('a');
		ul.setAttribute('href','#');
		ul.innerHTML = "Check For Update";
		ul.addEventListener('click',function(event) {
			GM_get("noblesse-oblige.org/hellion/scripts/MrScript.version.txt", function(txt) {
				var uspan = document.getElementsByName('updatespan')[0];
				var txtsplit = txt.split(',');
				var versionNumber = txtsplit[0].replace('.','').replace('.','');
				if (integer(versionNumber) <= VERSION) {
					uspan.innerHTML = "<br>No Update Available.";
					persist('MrScriptLastUpdate', integer(new Date().getTime()/3600000)); return;
				} else {
					uspan.innerHTML = "<br>Version " + txtsplit[0] + " Available: <a target='_blank' href='" +
						txtsplit[1] + "'>Update</a>";
				}
			}); event.stopPropagation(); event.preventDefault();
		}, true);

		var ul4 = document.createElement('a');
		ul4.setAttribute('href','javascript:void(0);');
		ul4.innerHTML = "Renew Password Hash";
		ul4.setAttribute('id','hashrenew');
		ul4.addEventListener('click',function(event)
		{	this.innerHTML = 'Working...';
			GM_get(server + 'store.php?whichstore=m', function(txt)
			{	var nupwd = txt.match(/phash\svalue\=\"([a-z0-9]+)\"/)[1];
				if (nupwd) { $("#hashrenew").html('Done'); SetPwd(nupwd); }
				else $("#hashrenew").html('Fail!');
		});	}, true);
		ulspan.setAttribute('class','tiny');
		ulspan.setAttribute('name','updatespan');
		ulspan.appendChild(ul);
		ulspan.appendChild(document.createTextNode(' - '));
		ulspan.appendChild(ul4);
		ulspan.appendChild(document.createElement('br'));
		centeredlinks.appendChild(ulspan);
	}

	function buildSettings() {
		//build our settings and return them for appending
		var guts = document.createElement("div");
		guts.id = scriptID;
		var subhead = document.createElement("div");
		guts.appendChild(subhead);
		subhead.className = "subhead";
		subhead.textContent = "Mr. Script's Choicetastic Optionarium";

		var outerdiv = document.createElement('div');
		outerdiv.setAttribute('id','MrDiv');
		outerdiv.style["border"] = "1px solid blue";
		outerdiv.style["width"] = "95%";
		var bigSpan = document.createElement('span');
		bigSpan.setAttribute('id','scriptpref');
		bigSpan.style["margin"] = "0 auto";
		bigSpan.style["display"] = "table-cell";
		bigSpan.style["overflowX"] = "hidden";
		bigSpan.style["overflowY"] = "auto";
		bigSpan.style["textalign"] = "left";
		bigSpan.style["lineHeight"] = "2em";
		bigSpan.style["padding"] = "5px";

		var spanSpan = document.createElement('span');
		var clicky1 = 'javascript:document.getElementById("scriptpref1").setAttribute("style","");' +
		'javascript:document.getElementById("scriptpref2").setAttribute("style","display:none;");' +
		'javascript:document.getElementById("scriptpref3").setAttribute("style","display:none;");';
		var clicky2 = 'javascript:document.getElementById("scriptpref1").setAttribute("style","display:none;");' +
		'javascript:document.getElementById("scriptpref2").setAttribute("style","");' +
		'javascript:document.getElementById("scriptpref3").setAttribute("style","display:none;");';
		var clicky3 = 'javascript:document.getElementById("scriptpref1").setAttribute("style","display:none;");' +
		'javascript:document.getElementById("scriptpref2").setAttribute("style","display:none;");' +
		'javascript:document.getElementById("scriptpref3").setAttribute("style","");';

		spanSpan.innerHTML = "<a class=MrTabber id=show1 href='"+clicky1+"'>[Settings]</a>" +
			"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " +
			"<a class=MrTabber id=show2 href='"+clicky2+"'>[Custom Links 1]</a>" +
			"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " +
			"<a class=MrTabber id=show3 href='"+clicky3+"'>[Custom Links 2]</a>";
		spanSpan.setAttribute('style','font-size:12px;text-align:center;');
		var prefSpan = document.createElement('span');
		prefSpan.setAttribute('id','scriptpref1');

		createPrefPage(prefSpan);

		var menu1Span = document.createElement('span');
		var menu2Span = document.createElement('span');
		menu1Span.setAttribute('id','scriptpref2');
		menu1Span.setAttribute('style','display: none');
		menu2Span.setAttribute('id','scriptpref3');
		menu2Span.setAttribute('style','display: none');

		createMenu1(menu1Span);
		createMenu2(menu2Span);

		var centeredlinks = document.createElement('center');
		createBottomBar(centeredlinks);

		// Put it all together
		bigSpan.appendChild(spanSpan);
		bigSpan.appendChild(document.createElement('hr'));
		bigSpan.appendChild(prefSpan);
		bigSpan.appendChild(menu1Span);
		bigSpan.appendChild(menu2Span);
		bigSpan.appendChild(document.createElement('hr'));
		bigSpan.appendChild(centeredlinks);

		outerdiv.appendChild(bigSpan);

		guts.appendChild(outerdiv);
		return guts;
	}
}

// ---------------
function at_account() { // new option menu, yay
	buildPrefs();
	return;
}

// HAGNK'S/MANAGESTORE/STASH: Support autoclear for added rows
function at_managestore() {
  autoclear_added_rows();
}
function at_clan_stash() {
  autoclear_added_rows();
}
function at_storage() {
  autoclear_added_rows();
}
function at_sendmessage() {
  autoclear_added_rows();
}

function autoclear_added_rows() {
	$('a[href^="javascript"]').each(function()
	{
		var link = $(this);
		if (link.attr('href').indexOf('add') == -1) return;

		// A mouseout event is the easy way out, since I couldn't find a way
		// to trigger the event AFTER the extra row was added. Meh.
		link.mouseout(function()
		{	var prefAutoclear = GetPref('autoclear');
			if (prefAutoclear == 0) return;
			$('input[value=1][type=text]').each(function()
			{	if (this.getAttribute('onclick') == null)
					AddAutoClear(this, prefAutoclear);
			});
		});
	});
}

function at_adminmail() {
	function showBRform() {
		$('table:first').attr('style','display:inline');
	}

	var msg = 	"<div><center><font size=4 color='blue'><p>You currently have Greasemonkey enabled and at least 1 script active.</p>" +
				"<p>Before reporting a bug, please make sure that you can reproduce " +
				"the issue with Greasemonkey disabled.</p></font><center><a id='H_MRS_BR1' href=#'>[click to continue]</a><br /></center></div>";
	$('body').prepend(msg);
	$('table:first').attr('style','display:none');
	$('#H_MRS_BR1').click(showBRform);
}

// MAINT: Refresh until rollover is over.
function at_maint() {
	document.title="KoL Rollover";
	window.setTimeout('self.location = "http://www.kingdomofloathing.com";',60000);
}

//console.timeEnd("Mr. Script @ " + place);
