// Mr. TopMenu v1.0
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
// @name        Mr. TopMenu
// @namespace   Mr-TopMenu
// @description	KoL top menu functionalizer
// @version		1.0
// @author		Lukifer
// @contributor Hellion
// @include     http://127.0.0.1:60*/topmenu*
// @include		http://*localhost:*/topmenu*
// @include     http://*kingdomofloathing.com/topmenu*
// @exclude     http://images.kingdomofloathing.com/*
// @exclude     http://forums.kingdomofloathing.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @unwrap
// ==/UserScript==

var server = location.host;

var swordGuyURL = 'skills.php'; //URL to go to when you click on the SwordGuy picture
var moveqs = 1;					//Move quick-skills?  1=left, 2=right.
var shortlinks = 3;				//
var splitinv = 1; 				//Split Inventory link?
var splitquest = 1; 			//Split quest link?
var splitmsg = 1; 				//Split message link?
var logoutconf = 1; 			//Add logout confirmation?
var malllink = 1;				//mall link goes direct to search

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
		
//hack to make JQuery work in Chrome
addJQuery(at_topmenu);


//at_topmenu();

//---------------

function at_topmenu()
{
var server = location.host;

var swordGuyURL = 'skills.php'; //URL to go to when you click on the SwordGuy picture
var moveqs = 1;					//Move quick-skills?  1=left, 2=right.
var shortlinks = 3;				//
var splitinv = 1; 				//Split Inventory link?
var splitquest = 1; 			//Split quest link?
var splitmsg = 1; 				//Split message link?
var logoutconf = 1; 			//Add logout confirmation?
var malllink = 1;				//mall link goes direct to search

	var compactmode = document.getElementsByName('loc').length; // compact mode has a dropdown listbox called 'loc', full mode doesn't.
	if (compactmode > 0) {	
		at_compactmenu(shortlinks, splitinv, splitquest, splitmsg, logoutconf, malllink);
		return;
	}
	var iconmode = document.getElementsByClassName('menuitem').length;
	if (iconmode > 0) {
		return;
	}

	
	// Test if quickskills is present. TODO: Find a cleaner way to do this.
	var quickSkills = 0;
	if ($('center:first').html().indexOf("javascript:skillsoff();") != -1) {	
		quickSkills = 1; 
//		moveqs = 1; //GetPref('moveqs');
		// tweak the topmenu frame size if quickskills is present.
		var topframeset = top.document.getElementsByTagName && top.document.getElementsByTagName("frameset");
		if (topframeset && topframeset[1] && topframeset[1].rows) { 
//			GM_log("tweaking!"); 
			topframeset[1].rows = "56,*"; 
		}
	}
	
var menu1link = {
	0: ['market;town_market.php'],
	1: ['hermit;hermit.php'],
	2: ['untinker;forestvillage.php?place=untinker'],
	3: ['mystic;mystic.php'],
	4: ['hunter;bhh.php'],
	5: ['guildstore'],
	6: ['general;store.php?whichstore=m'],
	7: ['doc;galaktik.php'],
	8: ['lab;cobbsknob.php?action=dispensary'],
	9: ['fruit;store.php?whichstore=h'],
};

var menu2link = {
	0: ['buy;searchmall.php'],
	1: ['trade;makeoffer.php'],
	2: ['sell;managestore.php'],
	3: ['collection;managecollection.php'],
	4: ['closet;closet.php'],
	5: ['hagnk\'s;storage.php'],
	6: ['attack;pvp.php'],
	7: ['wiki;http://kol.coldfront.net/thekolwiki/index.php/Main_Page'],
	8: ['calendar;http://noblesse-oblige.org/calendar'],
	9: [';'],
};
	// Set defaults if needed
//	Defaults(0);

	var toprow1 = 0, toprow2, toprow3, front;
	var shorttop = 0, haveLair = 0, weBuildHere;
	if (shortlinks % 2 > 0) {
		shorttop = 1;
		toprow1 = document.createElement('span');
		toprow2 = document.createElement('span');
		front = 1; //GetPref('toprow');
	}

	// Find all links and attach event handlers
	$('a').each(function(ind) {
		var a = $(this);
		var txt = a.text();

		// prefs


		// Map / Skills links
		if (ind == 0 && quickSkills == 1 && moveqs > 0)
			a.parent().attr('style','display:none;');

		// Yes I know this link only applies to a handful of people. I'm doing it anyway.
		if (txt == "devster panel") a.html("devster");
		
		// shorten things up to make some room for our other additions
		if (txt == "campground") a.html("camp");
		if (txt == "mountains") a.html("mtns");
		
		// change default mall link
		if ((txt == "mall") && malllink == 1)  
			a.attr("href","searchmall.php");

		// Lair
		if (txt == "lair") haveLair = 1;

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

//			GM_log("checking level in topmenu: is currently "+integer(GetCharData('level')));
//			if (integer(GetCharData('level')) > 9) 
				a.after(' <a href="beanstalk.php" target="mainpane">stalk</a>');

			// This is as good a place as any; get span for adding links later.
			weBuildHere = a.parent().get(0);
			weBuildHere.parentNode.setAttribute('nowrap','nowrap');
		}
		
		if (txt == "beach") {
//			if (integer(GetCharData('level')) > 12) 
			a.after(' <a href="thesea.php" target="mainpane">sea</a>');
		}
		
		if (txt == "town") {
			a.html("town:");
			a.after(' <a href="dungeons.php" target="mainpane">dungeons</a>');
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
			a.after(' <a href="inventory.php?which=4" target="mainpane">fav</a>');	// 21Dec09 Hellion: added favorites link.
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
	var swordGuy = $('img:first[src*=smallleft]');
	if (swordGuyURL != '' && swordGuy.length > 0) {
		var guy = document.createElement('a');
		if (swordGuyURL.indexOf("http://") != -1)
			guy.setAttribute('target','_blank');
		else guy.setAttribute('target','mainpane');
		guy.setAttribute('href', swordGuyURL);
		swordGuy.attr('border',0);
		swordGuy.attr('id','swordguy');	// add ID tag for later easy selection
		swordGuy.wrap(guy);

//		swordGuy.get(0).addEventListener('contextmenu', function(event) {
//			var NewRef = prompt('Where would you like this link to point?',
//				GetPref('swordguy'));
//			var ln = this.parentNode;
//			if (NewRef) {
//				SetPref('swordguy', NewRef);
//				swordGuy = NewRef;
//			}
//			ln.setAttribute('href', NewRef);
//			if (NewRef.indexOf("http://") != -1)
//				ln.setAttribute('target','_blank');
//			else ln.setAttribute('target','mainpane');
//			event.preventDefault(); event.stopPropagation();
//			return false;
//		}, false);

		swordGuy = swordGuy.parent().get(0); // For use later
	}

	// Add rows of links
	if (shorttop) {
		var a;

		toprow1.setAttribute("name","toprow1");
		if (front != 1) toprow1.setAttribute("style","display: none;");

		for (var j=0; j<10; j++) {
			var zoiks = menu1link[j][0]; //GetPref('menu1link'+j); 
			var tarjay = 'mainpane';
			var zplit = zoiks.split(';');
			if (zplit[0] == "guildstore") {
				AddTopLink(toprow1, 'mainpane', 'fnord', '', 1);
				AddTopLink(toprow1, 'mainpane', 'smeg', '', 1);
				GM_get(server+'/store.php?whichstore=2', function(t) {
					if (t.length>10 && t.indexOf("You don't belong") == -1)
						$('a[href=fnord]')
						.attr('href', 'store.php?whichstore=2')
						.html('gouda');
				});
				GM_get(server+'/store.php?whichstore=3', function(t) {
					if (t.length>10 && t.indexOf("You don't belong") == -1)
						$('a[href=smeg]')
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
		AddTopLink(toprow1, 'mainpane', 'craft.php?mode=combine', 'combine', 1);
		AddTopLink(toprow1, 'mainpane', 'sellstuff.php', 'sell', 1);
		AddTopLink(toprow1, 'mainpane', 'craft.php?mode=cook', 'cook', 1);
		AddTopLink(toprow1, 'mainpane', 'craft.php?mode=cocktail', 'mix', 1);
		AddTopLink(toprow1, 'mainpane', 'craft.php?mode=smith', 'smith', 1);
		AddTopLink(toprow1, 'mainpane', 'council.php', 'council', 1);
		AddTopLink(toprow1, 'mainpane', 'guild.php', 'guild', 1);
		if (haveLair == 1) // && integer(GetCharData('level')) == 13)
			AddTopLink(toprow1, 'mainpane', 'lair2.php?action=door', 'door', 1);
		a = document.createElement('a'); a.innerHTML = "more"; a.setAttribute('href','#');
		a.addEventListener('click', function(event) {
			var tr1 = document.getElementsByName("toprow1")[0];
			var tr2 = document.getElementsByName("toprow2")[0];
			tr1.style.display = "none"; tr2.style.display = "inline";
//			SetPref('toprow', 2);
		}, true); toprow1.appendChild(a);

		toprow2.setAttribute("name","toprow2");
		if (front != 2) toprow2.setAttribute("style","display: none;");

		for (var j=0; j<10; j++) {
			var zoiks = menu2link[j][0]; // GetPref('menu2link'+j); 
			var tarjay = 'mainpane';
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
		a = document.createElement('a'); a.innerHTML = "more"; a.setAttribute('href','#');
		a.addEventListener('click', function(event) {
			var tr2 = document.getElementsByName("toprow2")[0];
			var tr1 = document.getElementsByName("toprow1")[0];
			tr2.style.display = "none"; tr1.style.display = "inline";
//			SetPref('toprow', 1);
		}, true); toprow2.appendChild(a);

		// Actually add the stuffy-stuff to the span we grabbed earlier
		weBuildHere.appendChild(toprow1);
		weBuildHere.appendChild(toprow2);

		GoGoGadgetPlunger();
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
// some defensive coding:  don't assume that "javascript:skillson()" is always document.link[1].
// go hunt it down specifically.
		for (var i=0; i< document.links.length; i++) {
//			GM_log("doclinks["+i+"]="+foo);
			if (document.links[i].href.indexOf("skillson") != -1) break;
		}
		if (document.links[i].href.indexOf("skillson") != -1) {
			GM_log("calling skillson");
			document.location = document.links[i];
		}
	}
//}

// COMPACTMENU: Add options to menus and stuff.
function at_compactmenu(shortlinks, splitinv, splitquest, splitmsg, logoutconf, malllink) {
	var selectItem, links, oonTD, linkTD;
	var quickSkills = 0, moveqs = 0;
	


	// Set defaults if needed
//	Defaults(0);

	moveqs = 1; // GetPref('moveqs');
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
	if (shortlinks % 2 > 0 || splitinv == 1) {
		selectItem = document.getElementsByTagName('select')[0];
		//selectItem.setAttribute('style','font-size: 9pt;');
		selectItem.parentNode.parentNode.setAttribute('nowrap','nowrap');
		for (i=0; i<selectItem.options.length; i++)	{	
			if (splitinv == 1 && selectItem.options[i].innerHTML == "Inventory") {	
				selectItem.options[i].innerHTML = "Consumables";
				selectItem.options[i].value = "inventory.php?which=1";
				AddTopOption("Equipment", "inventory.php?which=2", selectItem, selectItem.options[i+1]);
				AddTopOption("Miscellaneous", "inventory.php?which=3", selectItem, selectItem.options[i+2]);
				AddTopOption("Favorites","inventory.php?which=4",selectItem,selectItem.options[i+3]);
				if (shortlinks % 2 == 0) break;
			}
// if splitquest pref is set, make Quests go to Current Quests and add a Notes entry.
// otherwise Quests always goes to the Notes page.
			if (selectItem.options[i].innerHTML == "Quests") {	
				if (splitquest == 1) {
					AddTopOption("Notes","questlog.php?which=4", selectItem, selectItem.options[i+1]);
					selectItem.options[i].value="questlog.php?which=1";
				}
				else selectItem.options[i].value="questlog.php?which=4";
			}

			if (selectItem.options[i].innerHTML == "Options") { // Account Menu") {	
				AddTopOption("-", "nothing", selectItem, selectItem.options[i+1]);
				AddTopOption("Multi-Use", "multiuse.php", selectItem, selectItem.options[i+2]);
				AddTopOption("Combine", "craft.php?mode=combine", selectItem, selectItem.options[i+3]);
				AddTopOption("Sell Items", "sellstuff.php", selectItem, selectItem.options[i+4]);
				AddTopOption("Cook Food", "craft.php?mode=cook", selectItem, selectItem.options[i+5]);
				AddTopOption("Mix Drinks", "craft.php?mode=cocktail", selectItem, selectItem.options[i+6]);
				AddTopOption("Smith/Smash", "craft.php?mode=smith", selectItem, selectItem.options[i+7]);
				AddTopOption("Closet", "closet.php", selectItem, selectItem.options[i+8]);
				AddTopOption("-", "nothing", selectItem, selectItem.options[i+9]);
				GM_get(server + "/knoll.php",function(response)	{	
					if (response == "") return;
					var s = document.getElementsByTagName('select')[0];
					for (var i=0; i<s.options.length; i++) {
						if (s.options[i].value == "craft.php?mode=combine")
						{	s.options[i].value = "knoll.php?place=paster"; break;
						}	
					}	
				});
			}
			if (logoutconf == 1 && selectItem.options[i].innerHTML == "Log Out") {
				selectItem.options[i].value = "logout";
				selectItem.setAttribute('onchange', 'if (document.navform1.loc.value!="logout") goloc(); ' +
					'else if (confirm("Log out?")) parent.frames[2].location = "logout.php"; ' +
					'else this.selectedIndex=0;');
			}
		}	
	}

	// Camera Two!
	if (shortlinks % 2 > 0) {
		selectItem = document.getElementsByTagName('select')[1];
		selectItem.parentNode.parentNode.setAttribute('nowrap','nowrap');
		for (var i=0, len = selectItem.options.length; i<len; i++) {
			if (selectItem.options[i].innerHTML.indexOf("Nearby Plains") != -1) {
				AddTopOption("The Beanstalk", "beanstalk.php", selectItem, selectItem.options[i+1]);
				AddTopOption("Spookyraven Manor", "manor.php", selectItem, selectItem.options[i+2]);
				len += 2;	// extend loop to cover new options just added.
			}	
			if  (malllink == 1 && selectItem.options[i].innerHTML == "The Mall") {
				selectItem.options[i].value = "searchmall.php";
			}
			if (selectItem.options[i].innerHTML.indexOf("Seaside Town") != -1) {
				AddTopOption("Town: Wrong side","town_wrong.php", selectItem, selectItem.options[i+1]);
				AddTopOption("Town: Right side","town_right.php", selectItem, selectItem.options[i+2]);
				AddTopOption("Town: Dungeons","dungeons.php", selectItem, selectItem.options[i+3]);
				len += 3;
			}
			if (selectItem.options[i].innerHTML.indexOf("Desert Beach") != -1) {
				if (integer(GetCharData('level')) > 12) {
					AddTopOption("The Sea","thesea.php",selectItem, selectItem.options[i+1]);
					// len++;
				}
			}
		}

		AddTopOption("-", "nothing", selectItem, 0);
		AddTopOption("Council of Loathing", "council.php", selectItem, 0);
		AddTopOption("Class Guild", "guild.php", selectItem, 0);
		AddTopOption("Market Square", "town_market.php", selectItem, 0);
		AddTopOption("Hermitage", "hermit.php", selectItem, 0);
		AddTopOption("Untinker", "forestvillage.php?place=untinker", selectItem, 0);
		AddTopOption("Mystic Crackpot", "mystic.php", selectItem, 0);
		AddTopOption("Bounty Hunter", "bhh.php", selectItem, 0);
		AddTopOption("Gouda's Grocery", "store.php?whichstore=2", selectItem, 0);
		AddTopOption("Smacketeria", "store.php?whichstore=3", selectItem, 0);
		AddTopOption("General Store", "store.php?whichstore=m", selectItem, 0);
		AddTopOption("Doc Galaktik", "galaktik.php", selectItem, 0);
		AddTopOption("Laboratory", "cobbsknob.php?action=dispensary", selectItem, 0); // was "store.php?whichstore=g", selectItem, 0);
		AddTopOption("Hippy Store", "store.php?whichstore=h", selectItem, 0);
		AddTopOption("Display Case", "managecollection.php", selectItem, 0);
		AddTopOption("Hagnk","storage.php",selectItem,0);
	}
}


// ADDTOPOPTION: Add a menu option in compact mode.
function AddTopOption(name, url, select, putBefore)
{	
	var option = document.createElement('option');
	option.innerHTML = name; option.value = url;
	if (putBefore == 0) select.appendChild(option);
	else select.insertBefore(option, putBefore);
}


// ADDTOPLINK: Much easier for a function to do all the work.
function AddTopLink(putWhere, target, href, html, space)
{
	if (href == "") return;
	var a = document.createElement('a');
	if (target != 0) a.setAttribute('target', target);
	a.setAttribute('href', href);
	a.innerHTML = html;

	putWhere.appendChild(a);
	if (space) putWhere.appendChild(document.createTextNode(" "));
}

// GOGOGADGETPLUNGER: Convert meat-paste links to The Plunger.
function GoGoGadgetPlunger()
{	
	GM_get(server + "/knoll.php",function(response) {
		if (response != "")	{	
			$('a[href*="craft.php?mode=combine"]').each(function() {
				href = this.getAttribute('href');
				href = href.replace('&a=','&item1=');
				href = href.replace('&b=','&item2=');
				href = href.replace('action=craft','action=combine');
				this.setAttribute("href", href.replace(
					"craft.php?mode=combine", "knoll.php?place=paster"));
			});
		}
	});	
}

// GM_GET: Stolen gleefully from OneTonTomato. Tee-hee!
function GM_get(dest, callback, errCallback)
{	
	if (typeof(callback)=='function' ) {
		callback('');
	}	
	
//	GM_xmlhttpRequest({
//	  method: 'GET',
//	  url: 'http://' + dest,
//	  	onerror:function(error) {
//			if (typeof(errCallback)=='function' )
//				callback(details.responseText);
//			else GM_log("GM_get Error: " + error);
//	  	},
//		onload:function(details) {
//			if (typeof(callback)=='function' ) {
//				callback(details.responseText);
//			}	
//		}	
//	});	
}

}


