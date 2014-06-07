// Mr. WineScript v1.0
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
// @name        WineScript
// @namespace   http://www.noblesse-oblige.org/hellion/wine
// @version		1.0
// @description track and solve the drops in Spookyraven Winecellar
// @author		Hellion
// @include     http://127.0.0.1:60*/manor*
// @include		http://*localhost:*/manor*
// @include     http://*kingdomofloathing.com/manor*
// @include     http://127.0.0.1:60*/fight*
// @include		http://*localhost:*/fight*
// @include     http://*kingdomofloathing.com/fight*
// @exclude     http://images.kingdomofloathing.com/*
// @exclude     http://forums.kingdomofloathing.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @unwrap
// ==/UserScript==

var place = location.pathname.replace(/\/|\.(php|html)$/gi, "").toLowerCase();
var server = location.host;
//GM_log("place="+place);
if (place == 'manor') at_manor();
else if (place == 'manor3') at_manor3();
else if (place == 'fight') at_fight();

// end top-level declarative code.

function at_fight() {
	var monsterName = document.getElementById('monname').innerHTML;
//	GM_log("fight: monster="+monsterName);
	if ((monsterName == "a skeletal sommelier" || monsterName == "a possessed wine rack") && (/WINWINW/.test(document.body.innerHTML))) {
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
//					GM_log("cref="+cref);
				var corner = "corner" + cref.match(/snarfblat=(\d+)/)[1];
				var winesfound = GM_getValue(corner);
				winesfound |= dropcode;
				GM_setValue(corner, winesfound);
			}
		}
	}
}

function at_manor() {
// detect sm8.gif == empty hallway to reset variables (sm8b.gif == trapdoor exposed)
	$('img[src*=sm8.gif]').each(function(){
//		GM_log("resetting variables");
		GM_setValue("corner178",0);
		GM_setValue("corner179",0);
		GM_setValue("corner180",0);
		GM_setValue("corner181",0);
		GM_setValue("winelist",'');
		GM_setValue("wineHTML",'');
		GM_setValue("winesNeeded",'');
	});
}

// GM_GET: Stolen gleefully from OneTonTomato. Tee-hee!
function GM_get(dest, callback, errCallback)
{	GM_xmlhttpRequest({
	  method: 'GET',
	  url: 'http://' + dest,
	  	onerror:function(error)
	  	{	if( typeof(errCallback)=='function' )
				callback(details.responseText);
			else GM_log("GM_get Error: " + error);
	  	},
		onload:function(details) {
			if( typeof(callback)=='function' ){
				callback(details.responseText);
}	}	});	}

// MANOR3: display wine-bottle glyph info.
function at_manor3()
{
//	GM_log("in manor3");
// basic spoilers, part 1: display glyphs while selecting the wines.
	var wineDB = {'2275':'278847834','2271':'163456429','2276':'147519269',
				  '2273':'905945394','2272':'289748376','2274':'625138517'};

// new way: use the glyph info we gathered once while building the wine list.
	$('select:first').change(function()
	{	
	var winelist = eval('('+GM_getValue("winelist")+')');	// {2271:["name",glyphid], 2272:["name",glyphid], etc.}
	var wine = this.childNodes[this.selectedIndex].value;
		if (wine > 0) {
			var glyph = $('#daglyph');
			if (glyph.length == 0)		// if it doesn't exist, add it.
			{	$('select:first').parent().parent().append(
					$(document.createElement('img')).attr('id', 'daglyph'));
				glyph = $('#daglyph');
			}
			glyph.attr('src',
				'http://images.kingdomofloathing.com/' +
				'otherimages/manor/glyph'+winelist[wine][1]+'.gif');
		}
	});
	
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
		0:[25,"Merlot, Pinot Noir, Port"], 
		1:[42,"Marsala, Pinot Noir, Zinfandel"], 
		2:[52,"Muscat, Port, Zinfandel"],
		3:[7,"Marsala, Merlot, Muscat"]
	};
	var CornerSpoilers = document.createElement('table');
	CornerSpoilers.setAttribute('border','1');

	// get the what-dropped-where info that we grabbed in at_fight().
	var NW = GM_getValue("corner178"); if (NW === undefined) NW = 0;
	var NE = GM_getValue("corner179"); if (NE === undefined) NE = 0;
	var SW = GM_getValue("corner180"); if (SW === undefined) SW = 0;
	var SE = GM_getValue("corner181"); if (SE === undefined) SE = 0;
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
	function getBottleInfo(txt) {
		var bottleOf = txt.match(/dusty bottle of (.*?)\</)[1];
		var glyphNum = txt.match(/\/glyph([0-9])/)[1];
		var bInfo = [bottleOf, glyphNum];	
		return bInfo;
	}
	// helper function 2: check player inventory for quantity of wines.
	function countWines(wl, needs) {	
	// wl is an array of bInfo's from the getBottleInfo() function; needs is an array of the wine IDs that are required for the altar.
		GM_get(server+'/js_inv.php?for=MrScript',function(response) {
			if (response[0] != '{') {		
				var i1 = response.split('inventory = ')[1].split(';')[0];	// should get everything from { to }, inclusive.
				response = i1;
			}
			var invcache = eval('('+response+')');
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
	
	function toggleDisplay()
	{	if (wineDisplay.style.display == "none") {
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
	
	
	var wineHTML = GM_getValue("wineHTML");
	var winesneeded;
	if (wineHTML != undefined && wineHTML.length > 0) {	// If we already did this the long way, just display the saved results.
//		GM_log("easy way :-)");
		wineDisplay.innerHTML = wineHTML;
		winelist = eval('('+GM_getValue("winelist")+')');
		winesneeded = eval('('+GM_getValue("winesNeeded")+')');
		document.body.appendChild(wineDisplay);
		countWines(winelist, winesneeded); 
	} else {											// No saved results: Better do it the long way.... 
//		GM_log("hard way :-( ");
		GM_get(server+"/manor3.php?place=goblet", function (atext) {	// check the altar for the glyphs we need
			var pdiv = document.createElement('div');
//			GM_log("place=goblet text:"+atext);
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
			GM_get(server+"/desc_item.php?whichitem="+wineDB[2271], function(b1) {	// get the glyph number off the wine descriptions
				winelist[2271]=getBottleInfo(b1);
				GM_get(server+"/desc_item.php?whichitem="+wineDB[2272], function(b2) {
					winelist[2272] = getBottleInfo(b2);
					GM_get(server+"/desc_item.php?whichitem="+wineDB[2273], function(b3) {
						winelist[2273] = getBottleInfo(b3);
						GM_get(server+"/desc_item.php?whichitem="+wineDB[2274], function(b4) {
							winelist[2274] = getBottleInfo(b4);
							GM_get(server+"/desc_item.php?whichitem="+wineDB[2275], function(b5) {
								winelist[2275] = getBottleInfo(b5);
								GM_get(server+"/desc_item.php?whichitem="+wineDB[2276], function(b6) {
									winelist[2276] = getBottleInfo(b6);
									wineDisplay.innerHTML = "<tr><th>Name:</th><th>Glyph:</th><th>Effect:</th></tr>";
									for (var i=2271;i<2277;i++) {
										wineDisplay.innerHTML += "<tr><td align=center>" + winelist[i][0]+"</td><td align=center>"+
										"<img src=http://images.kingdomofloathing.com/otherimages/manor/glyph"+winelist[i][1]+".gif"+
										" </td><td>Yields "+wineeffectlist[winelist[i][1]]+"</td></tr>";
									}
									document.body.appendChild(wineDisplay);

									// this was an expensive process, let's only do it once.  Save the table display:
									GM_setValue("wineHTML",wineDisplay.innerHTML);	
									// and save the list of wine->glyph mappings and the list of which wines we actually need.
									var json = "{"; var json2 = "{";
									for (i=2271;i<2277;i++) {
										for (j=0;j<glyphids.length;j++)
										if (winelist[i][1] == glyphids[j]) json = json + j + ":" + i + ",";
										json2 = json2 + i+':["'+winelist[i][0]+'",'+winelist[i][1]+'],';
									}
									json = json + "}"; json2 = json2 + "}";
									GM_setValue("winesNeeded",json);
									GM_setValue("winelist",json2);
									winesneeded = eval('('+json+')');
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
