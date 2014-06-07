// ==UserScript==
// @name           Facebook Monsters Enhancer
// @namespace      http://userscripts.org/users/49912
// @description    Creates a menu to use those applications in facebook and has auto-play functions
// @source         http://userscripts.org/scripts/show/25396
// @identifier     http://userscripts.org/scripts/source/25396.user.js
// @version        1.1
// @date           2008-06-30
// @creator        ViXaY XaVieR and Piotr P. Karwasz
// @include        http://apps.facebook.com/slayers/*
// @include        http://apps.facebook.com/werewolves/*
// @include        http://apps.facebook.com/vampires/*
// @include        http://apps.facebook.com/zombies/*
// ==/UserScript==
/*jsl:option explicit*/
/* $Revision: 85 $ */
// bit masks
var PREF_RESET = 0; 
var PREF_AUTOFEED = 1; //2^0
var PREF_AUTOATTACK = 2; //2^1
var CLANSELECT_MANUAL = 4; //2^2
var ALREADY_GOING = 8; //2^3
var PREF_AUTOBUY = 16; //2^4
var PREF_ALL = 255; //2^8 - 1 
 

// configurable constants
var CLAN_MIN_DIM = 8; // minimal dimension of your clan
var CLAN_MAX_DIM = 20; //maximal dimension of your clan
var APP_NAME = "Facebook Monsters Enhancer";
/* The time a clan member that does not feed us remains in the clan */
var TOLERANCE_TIME = 3;

// messages
var MSG_REST = "Resting";
var MSG_WAIT = "Waiting to %";
var MSG_PROFILE = "Going to profile";
var MSG_FEED_HISTORY = "Checking feed history";
var MSG_FEED_FRIENDS = "Adding friends to clan";
var MSG_FEED_STEP1 = "Feeding %'s %";
var MSG_FEED_STEP2 = "Feeding % to %'s %";
var MSG_ATTACK = "Attacking %";
var MSG_ATTACK_STEP1 = "Attacking %'s %";
var MSG_ATTACK_STEP2 = "Attacking % times %";
var MSG_ATTACK_CHECK = "Checking delay for new attacks";
var MSG_BUY = "Buying stuff";
var MSG_BUY_SHIELD = "Buying shield";
var MSG_BUY_BOOMSTICK = "Buying boomstick";
var MSG_ERROR_IMAGINARY = "Imaginary monster<br />";
var MSG_ERROR_FULL = " is full<br />";
var MSG_ERROR_FEED_LIMIT = "No feeds left<br />";
var MSG_ERROR_ATTACK_LIMIT = "No attacks left<br />";
var MSG_ERROR_CLAN_TOO_SMALL = "Not enough clan members<br />";
var MSG_ERROR_VICTIM_FRIENDS = "Not enough victim friends<br />";
var MSG_ERROR_FEEDS_LEFT = "Cannot use all feeds<br />";
var MSG_ERROR_ALREADY_FED = "Already fed this monster<br />";

// non-configurable constants
var MONSTER_TYPE = ["slayer", "werewolf", "vampire", "zombie", "slayers", "werewolves", "vampires", "zombies"];
var ATTACK_TYPE = [ 49, 29, 27, 17 ];
var MONSTER_APP_IDS = [ 17801732384, 2721700161, 2458301688, 2341504841 ];
var SLAYER = 0;
var WEREWOLF = 1;
var VAMPIRE = 2;
var ZOMBIE = 3;
var NR_MONSTERS = 4;
var PLURAL = NR_MONSTERS;
var APPS_URL = "http://apps.facebook.com/";
var MONTH_NAMES=new Array('January','February','March','April','May','June','July','August','September','October','November','December','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
var DAY_NAMES=new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sun','Mon','Tue','Wed','Thu','Fri','Sat');

// global variables
// variables that need saving
var mstatus;
var auto_timer; // default countdown value for timer
var monster; /* the current monster */

// variables that are session only
var current_type = "";
var current_page = "";
var current_params = new Object();
// Milliseconds give integer overflow when storing
var now = Math.floor(new Date().getTime() / 1000);
// what to do when timer goes out
var gnext_page; // where to go, can be a string (URL) or an element (form to submit)
var ginterval = new Object(); // to store the periodic timer function
var gcountdown; // how long that function waits
var gmessage = ''; // status message to show


/***
 * Function: Script Update Checker
 *
 * Description:
 * Script Update Checker (http://userscripts.org/scripts/show/20145)
 * written by Jarett (http://userscripts.org/users/38602).
 */
var version_scriptNum = 25396;
var version_timestamp = 1214776644704; 
function updateCheck(forced){if((forced)||(parseInt(GM_getValue("lastUpdate","0"),10)+86400000<=(new Date().getTime()))){try{GM_xmlhttpRequest({method:"GET",url:"http://userscripts.org/scripts/review/"+version_scriptNum+"?"+new Date().getTime(),headers:{'Cache-Control':'no-cache'},onload:function(xhrResponse){GM_setValue("lastUpdate",new Date().getTime()+"");var rt=xhrResponse.responseText.replace(/&nbsp;?/gm," ").replace(/<li>/gm,"\n").replace(/<[^>]*>/gm,"");var scriptName=(/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue("targetScriptName",scriptName);if(parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1],10)>version_timestamp){if(confirm("There is an update available for the Greasemonkey script \""+scriptName+".\"\nWould you like to go to the install page now?")){GM_openInTab("http://userscripts.org/scripts/show/"+version_scriptNum);}}else if(forced){alert("No update is available for \""+scriptName+".\"");}}});}catch(err){if(forced){alert("An error occurred while checking for updates:\n"+err);}}}}GM_registerMenuCommand(GM_getValue("targetScriptName","???")+" - Manual Update Check",function(){updateCheck(true);});updateCheck(false);


// objects
/* FIXME: better description */
function GenericMonster(mtype,id) {
	this.id = id;
	this.type = mtype;
	this.next_feed = 0;
	this.last_fedback = 0;
	this.name = 'Anonymous';
}

function Monster(mtype) {
	this.type = mtype;
	/* Defaults */
	this.power = 0;
	this.next_feed = 0;
	this.attacks_left = 0;
	this.next_attack = 0;
	this.check_history = 0;
	this.buy_shield = 0;
	this.buy_weapon = 0;
	this.army_size = 0;
	this.money = 0;
	this.daily_attacks_updated = false;
	this.clan = new Array();
	this.clan_ids = new Array();
	/* 8 times 0 */
	this.last_feed = [0, 0, 0, 0, 0, 0, 0, 0];
	/* Retrieve object */
	try {
		var obj = eval(GM_getValue(mtype));
		if (typeof obj == "object") {
			for (var i in obj) this[i] = obj[i];
		}
	} catch(ex) {
		GM_log("Monster constructor: " + ex);
	}
	/* next_feed consistency check */
	if (this.next_feed < this.last_feed[0] + 22 * 60 * 60) this.next_feed = this.last_feed[0] + 22 * 60 * 60;
	/* Auto-generate feeds_left */
	this.feeds_left = 0;
	for (var i = 0; i < 8; i++) {
		if (this.last_feed[i] < (now - 22 * 60 * 60)) this.feeds_left++;
	}
}

Monster.prototype = new Object();

Monster.prototype.addClanMember = function(clanm) {
	if (clanm.name == 'You') return false;
	clanm.name = clanm.name || 'Anonymous';
	if (!clanm.id) return false;
	/* Don't duplicate clan members */
	if (this.clan_ids.indexOf(clanm.id) + 1) return true;
	if (this.clan.length >= CLAN_MAX_DIM) {
		return false;
	} else {
		var index;
		if ((index = this.clan_ids.indexOf(clanm.id)) == -1) {
			this.clan.push(clanm);
			this.clan_ids.push(clanm.id);
			return true;
		} else {
			this.clan[index] = clanm;
			return true;
		}
	}
};

Monster.prototype.addOrReplaceClanMember = function(clanm, force) {
	/* Don't add 'You' */
	if (clanm.name == 'You') return false;
	/* If clan is not full or clan member is already there */
	if (this.addClanMember(clanm)) return true;
	/* Don't add if there is no id */
	if (!clanm.id) return false;
	/* Check if the name exists */
	clanm.name = clanm.name || 'Anonymous';

	var replace_id;
	/* We check if there is someone to replace */
	for (var i = 0; i < monster.clan.length; i++) {
		var tmp_clanm = monster.clan[i];
		/* Value of 0 are clan members on trial
 		 * they cannot be replaced by other members on trial, but
 		 * only by feeders. */
		if (tmp_clanm.last_fedback == 0) {
			if (clanm.last_fedback) {
				replace_id = tmp_clanm.id;
				break;
			}
		/* The clan members that did not feed us for a week are replaced */
		/* Blacklisted monsters fall into this category */
		} else if (now - tmp_clanm.last_fedback > TOLERANCE_TIME * 24 * 60 * 60) {
			replace_id = tmp_clanm.id;
			break;
		}
	}
	/* Return if we have noone to replace and force is false*/
	if (!replace_id) {
		if (!force) return false;
		else {
			tmp_clanm = monster.selectLeastClanMember();
			replace_id = tmp_clanm.id;
		}
	}

	/* Replace the clan member */
	var idx = this.clan_ids.indexOf(replace_id);
	this.clan[idx] = clanm;
	this.clan_ids[idx] = clanm.id;
	return true;
};

Monster.prototype.attack = function(clanm) {
	this.gotoPage('fighting-confirm',
		{'defender_fbuserid': clanm.id,
		'defender_monster_type_id': ATTACK_TYPE[clanm.type]},
		MSG_ATTACK_STEP1, clanm.name, MONSTER_TYPE[clanm.type]);
};

// Feeds the monster 'id'
Monster.prototype.feed = function(clanm) {
	this.gotoPage('feed-main', {'consumer_id': clanm.id}, MSG_FEED_STEP1, clanm.name, MONSTER_TYPE[this.type]);
};

Monster.prototype.getClanMemberById = function(id) {
	var clanm = undefined;
	for (var i = 0; i < this.clan.length; i++) {
	if (this.clan[i].id == id) {
		clanm = this.clan[i];
		break;
		}
	}
	return clanm;
};

Monster.prototype.gotoPage = function(page, params, message) {
	message += "... (" + MONSTER_TYPE[this.type].charAt(0).toUpperCase() + ")";
	var str = '';
	for (var i = 3; message.indexOf('%') != -1; i++) {
		str = arguments[i];
		str = str || '';
		/* We don't want accidentally to make an infinite cycle */
		str = str.replace(/%/,'');
		message = message.replace(/%/,str);
	}
	gmessage += message;
	gcountdown = auto_timer;
	gnext_page = APPS_URL + MONSTER_TYPE[this.type + NR_MONSTERS] + "/";
	gnext_page += page + ".php";
	if (params) {
		gnext_page += "?";
		for (i in params) {
			gnext_page += i + "=" + params[i] + "&";
		}
		if (gnext_page.charAt(gnext_page.length - 1) == '&') gnext_page = gnext_page.substr(0, gnext_page.length - 1);
	}
};

Monster.prototype.pressSubmitButton = function(button, message) {
	message += "... (" + MONSTER_TYPE[this.type].charAt(0).toUpperCase() + ")";
	var str = '';
	for (var i = 2; message.indexOf('%') != -1; i++) {
		str = arguments[i];
		str = str || '';
		/* We don't want accidentally to make an infinity cycle */
		str = str.replace(/%/,'');
		message = message.replace(/%/,str);
	}
	gmessage += message;
	var elms = document.getElementsByTagName('input');
	for (var i=0; i<elms.length; i++) {
		if (elms[i].type == 'submit') {
			if ((button == undefined) || (button == "")) {
				gnext_page = elms[i];
				break;
			} else if(elms[i].value == button) {
				gnext_page = elms[i];
				break;
			}
		}
	}
	gcountdown = auto_timer;
};

Monster.prototype.save = function() {
	var error = this.error;
	delete this.error;
	GM_setValue(this.type, this.toSource());
	this.error = error;
};

// Returns the clanmember that can be already fed and fed you back most recently
// or undefined if an error occured
Monster.prototype.selectClanMember = function() {
	if (!this.clan.length) return;
	/* Blacklisted members won't be selected */
	var last_fedback = 0;
	var cm = new Array();
	for (var i = 0; i < this.clan.length; i++) {
		/* Already fed monsters */
		if (this.clan[i].next_feed > now) continue;
		/* Select those who fed you last */
		if (this.clan[i].last_fedback == last_fedback) cm.push(this.clan[i]);
		else if (this.clan[i].last_fedback > last_fedback) {
			cm = new Array();
			last_fedback = this.clan[i].last_fedback;
			cm.push(this.clan[i]);
		}
	}
	var random = Math.floor(cm.length * Math.random());
	return cm[random];
};

Monster.prototype.selectLeastClanMember = function() {
	// give the index in the Array of the least active clanMember;
	var lf = now;
	var index = undefined;
	for (var i = 0; i < this.clan.length; i++ ) {
		if (this.clan[i].last_fedback < lf) {
			lf = this.clan[i].last_fedback;
			index = i;
		}
	}
	return this.clan[index];
};

Monster.prototype.showClan = function() {
	var style = new Array();
	style.push('.list_container { margin: 10px; }');
	style.push('.list_item { border-top: 1px dotted #bb0000; margin: 5px; padding: 5px; list-style-type: none; background-color: #eeeeee; }');
	style.push('.list_item_special { border-top: 1px dotted #bb0000; margin: 5px; padding: 5px; list-style-type: none; background-color: #eebbbb; }');
	style.push('.list_rank { border-right: 1px dotted #bb0000; font-weight: bold; margin-right: 5px; padding-right: 5px; }');
	style.push('.list_action_call { float: right; text-align: right; }');
	var style_el = document.createElement('style');
	style_el.type = "text/css";
	style_el.innerHTML = style.join(''); 
	try {
		document.getElementsByTagName('head')[0].appendChild(style_el);
	} catch (ex) {}
	// Show the list of the actual clan Members
	// pnode is the node that contains everything
	var pnode = document.getElementById('app_content_' + MONSTER_APP_IDS[this.type]).firstChild;
	var iframe = pnode.getElementsByTagName('iframe')[1];
	var div = document.createElement('div');
	div.className = 'list_container';
	pnode.insertBefore(div,iframe);
	pnode = div;
	
	// The title
	var list_el = document.createElement('div');
	list_el.className = 'list_item';
	list_el.innerHTML = '<span class="list_event"><h1>My Clan</h1></span>';
	pnode.appendChild(list_el);

	var entry = new Array();
	entry = ['<span class="list_action_call"><a href="feed-main.php?consumer_id=',
		'', // Index 1: the ID of the ClanMember
		'">Feed ',
		'', // Index 3: the name of the ClanMember
		'!</a></span>',
		'<span class="list_rank">',
		'', // Index 6: the position in the Clan
		'.</span>',
		'<span class="list_event">',
		'', // Index 9: the message to show
		'</span>'
		];

	for (var i = 0; i < this.clan.length; i++) {
		list_el = document.createElement('div');
		list_el.className = 'list_item';
	
		entry[1] = this.clan[i].id;
		entry[3] = this.clan[i].name;
		if (i < 9) entry[6] = '&nbsp;' + (i + 1); else entry[6] = i + 1;
		if (this.clan[i].last_fedback > 100) {
			entry[9] = '<b>' + this.clan[i].name + '</b> fed us last time on ' + formatDate(1000 * this.clan[i].last_fedback,'MMM d, y');
		} else switch(this.clan[i].last_fedback) {
			case 0:
				entry[9] = '<b>' + this.clan[i].name + '</b> never fed us back.';
				break;
			case 1:
				entry[9] = '<b>' + this.clan[i].name + '</b> was fed, but never fed us back.';
				break;
			case -1:
				entry[9] = '<b>' + this.clan[i].name + '</b> is blacklisted since last feed failed (imaginary friends error).';
				break;
			default:
				entry[9] = '<b>' + this.clan[i].name + '</b> error: last_fedback is beyond our acceptable values';
				break;
		}
		if (this.clan[i].next_feed > now) {
			entry[9] = entry[9] + ' (already fed today)';
		}
		list_el.innerHTML = entry.join('');
		pnode.appendChild(list_el);
	}
};

Monster.prototype.showProfile = function() {
	this.gotoPage('side-nav', {"ref": "top_nav"}, MSG_PROFILE);
};

Monster.prototype.updateData = function() {
	/* Daily attacks */
	if (this.daily_attacks_updated && this.next_attack < now) {
		this.attacks_left += 10 + this.army_size;
		this.next_attack = now + 22 * 60 * 60;
		this.daily_attacks_updated = false;
	}
	switch(current_page) {
		case 'bite':
			if (current_params.max_attacks) {
				var msg = getElementsByClassName('status', 'h1')[0].innerHTML;
				msg = msg.match(/(-?\d+) hours and (-?\d+) minutes/);
				/* We add one minute for rounding errors */
				var wait = 60 * (1 + parseInt(msg[2],10) + 60 * (parseInt(msg[1],10)));
				this.next_attack = now + wait;
				this.daily_attacks_updated = true;
				this.error = 'daily-limit';
			}
			break;
			
		case 'event-history':
			/* Don't update our data on other people pages */
			if (current_params.zombie_id) break;
			var feed_list = parseFeedHistory();
			/* Update the feeding time of the monsters in our clan */
			var index;
			for (var i = 0; i < feed_list.length; i++) {
				if ((index = this.clan_ids.indexOf(feed_list[i].id)) != -1 &&
							this.clan[index].last_fedback != -1 &&
							this.clan[index].last_fedback < feed_list[i].date) {
					/* Calculate new attacks */
					if (now - feed_list[i].date < 86400) monster.attacks_left++;
					this.clan[index].last_fedback = feed_list[i].date;
				}
			}
			break;

		case 'feed-main':
			/* Imaginary monster */
			var clanm;
			if (current_params.hax0r) {
				if (clanm = this.getClanMemberById(monster.consumer_id)) clanm.last_fedback = -1;
				this.error = 'imaginary-monster';
			}
			/* Monster full */
			if (current_params.max_total && (clanm = this.getClanMemberById(current_params.consumer_id))) {
				clanm.next_feed = now + 22 * 60 * 60;
				this.error = 'monster-full';
			}
			/* Daily limit and already fed*/
			try {
				var msg = getElementsByClassName('header_message_error', 'div')[0].innerHTML;
				var time = msg.match(/(-?\d+) hours and (-?\d+) minutes/);
				var wait = 60 * (1 + parseInt(time[2],10) + 60 * (parseInt(time[1],10)));
				if (msg.search(/feed another/) + 1) {
					var clanm = this.getClanMemberById(current_params.consumer_id);
					clanm.next_feed = now + wait;
					this.error = 'already-fed';
				} else if (msg.search(/feed any more/) + 1) {
					this.next_feed = now + wait;
					/* Correct last_feed */
					var value = now + wait - 22 * 60 * 60;
					for (var i = 0; i < 8; i++) {
						if (this.last_feed[i] + 22 * 60 * 60 < now) this.last_feed[i] = value;
					}
					this.error = 'daily-limit';
				}
			} catch(ex) {}
			/* Don't know where exactly to put this, but we need to know who we are
 			 * trying to feed in case of imaginary monster errors */
			monster.consumer_id = current_params.consumer_id;
			break;

		case 'feed-result':
			this.attacks_left++;
			this.feeds_left--;
			this.last_feed.shift();
			this.last_feed.push(now);
			if (!monster.feeds_left) this.next_feed = this.last_feed[0] + 22 * 60 * 60;
			var clanm;
			if (clanm = this.getClanMemberById(current_params.consumer_id)) {
				clanm.next_feed = now + 22 * 60 * 60;
				/* If this was a clan member on trial, his trial is over */
				if (clanm.last_fedback == 0) clanm.last_fedback++;
			}
			break;

		case 'fighting-confirm':
		case 'fighting-main':
			var title = document.getElementById('app' + MONSTER_APP_IDS[current_type] + '_main_sub_title').innerHTML;
			title = title.match(/(\d+)[ ]*attacks left/)[1];
			title = parseInt(title,10);
			monster.attacks_left = title;
			break;

		case 'fighting-result':
			this.power += parseInt(current_params.ap,10);
			this.money += parseInt(current_params.c,10);
			this.attacks_left -= parseInt(current_params.n,10);
			break; 

		case 'side-nav':
			/* Don't update our data on other people pages */
			if (current_params.zombie_id) break;
			/* Money */
			var msg = getFirstXPathResult('//span[@class="emphasis"]/sup');
			msg = msg.parentNode.innerHTML;
			msg = msg.replace(/,/, '');
			this.money = parseInt(msg.match(/\d+/)[0],10);
			/* Power */
			msg = getElementsByClassName('centered_text emphasis', 'td')[0].innerHTML;
			msg = msg.replace(/,/, '');
			this.power = parseInt(msg.match(/\d+/)[0],10);
			/* Buying variables */
			/* Default */
			this.buy_shield = false;
			this.buy_weapon = false;
			var node;
			/* Check if we need to buy a shield */
			if (this.money > 150) {
				node = getFirstXPathResult("//img[contains(@src,'shield.png')]");
				if (!node) this.buy_shield = true;
			}
			/* Check if we need to buy a boom stick */
			if (this.money > 3000) {
				node = getFirstXPathResult("//img[contains(@src,'boomstick.png')]");
				if (!node) this.buy_weapon = true;
			}
			/* Army size */
			node = getElementsByClassName('small_avatar_user_name', 'div');
			this.army_size = node.length;
			break;

		case 'store-main':
			/* Check if we bought something */
			if (current_params.buy) {
				if (current_params.item_type_id == '2001') this.buy_shield = false;
				if (current_params.item_type_id == '1004') this.buy_weapon = false;
			}
			/* Money */
			var msg = getElementsByClassName('larger_text')[0].innerHTML;
			msg = msg.replace(/,/, '');
			this.money = parseInt(msg.match(/\d+/)[0],10);
			break;

		default:
			break;
	}
};

/* Manage feed clan */
function manageFeedClan_feedResult() {
	if (current_page != 'feed-result') return;
	/* When at feed-result we will be given the feeding history of the
 * monster we just fed. We use this list to replace all our clan members
 * that did not feed us in the last TOLERANCE_TIME days. */
	/* Feeding list */
	var list = parseFeedHistory();

	for (var i = 0; i < list.length; i++) {
		/* Not me */
		if (list[i].name == 'You') continue;
		/* Sanity check */
		if (!list[i].id) continue;
		/* Stop when entries are too old */
		if (now - list[i].date > TOLERANCE_TIME * 24 * 60 * 60) break;
		var clanm = new GenericMonster(current_type);
		clanm.name = list[i].name;
		clanm.id = list[i].id;
		/* Break when one insert fails. Most probably we cannot replace any more
 * monsters */
		if (!monster.addOrReplaceClanMember(clanm)) break;
	}
}

function manageFeedClan_addFriends() {
	var re = /consumer_id=(\d+)/;
	var id;
	var url;
	var name;
	var divs = getElementsByClassName("small_avatar_user_name","div");

	var nr_added = 0;
	for (var i = 0; i < divs.length; i++) {
		if (nr_added >= monster.feeds_left) break;
		url = divs[i].getElementsByTagName('a')[0];
		/* Name */
		name = url.innerHTML;
		name = name.split(' ')[0];
		/* Id */
		url = url.href;
		id = parseInt(url.match(re)[1],10);
		if (!monster.getClanMemberById(id)) { 
			var clanm = new GenericMonster(monster.type, id);
			clanm.name = name;	
			// Force adding the clan member, even if the friend never fed you back.
			if (monster.addOrReplaceClanMember(clanm, true)) nr_added++;
		}
	}
	/* Show the clan */
	monster.showClan();
}

function manageFeedClan_feedHistory() {
	if (current_page != 'event-history') return;
	if (current_params.zombie_id || current_params.consumer_id) return;
	var list = parseFeedHistory();
	var displayed_ids = new Array();
	for (var i = 0; i < list.length; i++) {
		/* Already displayed or already displayed MAX_CLAN_DIM members */
		if (displayed_ids.length >= CLAN_MAX_DIM || displayed_ids.indexOf(list[i].id) != -1) {
			list[i].div.parentNode.removeChild(list[i].div);
			continue;
		}
		/* New monster */
		if (monster.clan_ids.indexOf(list[i].id) == -1) {
			var clanm = new GenericMonster(current_type);
			clanm.name = list[i].name;
			clanm.id = list[i].id;
			clanm.last_fedback = list[i].date;
			/* Fill the clan and then add only those who fed you
 			 * in the tolerance time frame. */
			if (monster.clan.length < CLAN_MAX_DIM || now - clanm.last_fedback < TOLERANCE_TIME * 24 * 60 * 60) monster.addOrReplaceClanMember(clanm);
		}
		displayed_ids.push(list[i].id);
	}
	monster.showClan();	
}

function manageFeedClan_exec() {
	switch(current_page) {
		case 'event-history':
			monster.check_history = now + 22 * 60 * 60;
			manageFeedClan_feedHistory();
			break;
		case 'feed-home':
			manageFeedClan_addFriends();
			break;
		case 'feed-result':
			manageFeedClan_feedResult();
			break;
		default:
			break;
	}
	if (monster.check_history < now && current_page != 'event-history') {
		monster.gotoPage('event-history', null, MSG_FEED_HISTORY);
		return true;
	}
	return false;
}

function manageFeedClan_fallback() {
	var first_time = now + 22 * 60 * 60;
	var first_type = 0;
	var sw_monster;
	for (var i = 0; i < 4; i++) {
		sw_monster = new Monster(i);
		if (sw_monster.check_history < first_time) {
			first_time = sw_monster.check_history;
			first_type = i;
		}
	}
	return [first_time, first_type, 'check feed history'];
}

function feedCycle_feedNext() {
	var clanm = monster.selectClanMember();
	if (!clanm) {
		if (monster.feeds_left) {
			if (current_page != 'feed-home') {
				gmessage = MSG_ERROR_CLAN_TOO_SMALL;
				monster.gotoPage('feed-home', null, MSG_FEED_FRIENDS);
				return true;
			} else {
				gmessage = MSG_ERROR_FEEDS_LEFT;
				monster.next_feed = now + 4 * 60 * 60;
				return false;
			}
		}
	} else {
		monster.feed(clanm);
		return true;
	}
}

function feedCycle_exec() {
	if (mstatus && PREF_AUTOFEED) {
		switch(current_page) {
			case 'feed-main':
				switch(monster.error) {
					case 'imaginary-monster':
						gmessage = MSG_ERROR_IMAGINARY;
						break;
					case 'monster-full':
						var clanm = monster.getClanMemberById(current_params.consumer_id);
						if (clanm) gmessage = clanm.name;
						gmessage += MSG_ERROR_FULL;
						break;
					case 'daily-limit':
						gmessage = MSG_ERROR_FEED_LIMIT;
						break;
					case 'already-fed':
						gmessage = MSG_ERROR_ALREADY_FED;
						break;
					default:
						/* Unknown Error */
						break;
				}
				if (!monster.error) {
					/* Select victim */
					var input = getFirstXPathResult("//div[@class='list_item']//input");
					if (!input) {
						gmessage = MSG_ERROR_VICTIM_FRIENDS;
						monster.next_feed = now + 4 * 60 * 60;
					} else {
						input.checked = true;
						/* Retrieving victim's name */
						var node = input.parentNode.parentNode;
						node = node.getElementsByTagName('img')[0];
						var name = node.alt;
						name = name.split(' ')[0];
						/* Retrieving monster's name */
						var clanm = monster.getClanMemberById(current_params.consumer_id);
						monster.pressSubmitButton('', MSG_FEED_STEP2, name, clanm.name, MONSTER_TYPE[monster.type]);
						return true;
					}
				}
				/* No break; here */
			default:
				if (monster.next_feed < now && feedCycle_feedNext()) return true;
				/* Here we should try to switch monster */
				var sw_monster;
				for (var i = 0; i < 4; i++) {
					sw_monster = new Monster(i);
					if (sw_monster.next_feed < now) {
						sw_monster.showProfile();
						return true;
					}
				}
				break;
		}
	}
	return false;
}

function feedCycle_fallback() {
	if (mstatus & PREF_AUTOFEED) {
		var first_time = now + 22 * 60 * 60;
		var first_type = 0;
		var sw_monster;
		for (var i = 0; i < 4; i++) {
			sw_monster = new Monster(i);
			if (sw_monster.next_feed < first_time) {
				first_time = sw_monster.next_feed;
				first_type = i;
			}
		}
		return [first_time, first_type, 'feed'];
	}
	return false;
}

function attackCycle_exec() {
	if (mstatus & PREF_AUTOATTACK) {
		if (monster.attacks_left) {
			switch(current_page) {
				case 'fighting-main':
					var defender = selectDefender();
					if (!defender) {} /* FIXME: and if you don't have friends playing this game ?*/
					monster.attack(defender);
					return true;

				case 'fighting-confirm':
					/* Set the number of attacks */
					var num_attacks = document.getElementsByName("num_attacks")[0];
					var idx = num_attacks.options.length - 1;
					num_attacks.selectedIndex = idx;
					num_attacks = num_attacks.options[idx].innerHTML;
					/* Set the item to use */
					var item_used = document.getElementsByName("item_used")[0];
					idx = item_used.options.length - 1;
					item_used.selectedIndex = idx;
					item_used = item_used.options[idx].innerHTML;
					item_used = 'with a ' + item_used;
					if (item_used == 'with a None') item_used = '';
					monster.pressSubmitButton('', MSG_ATTACK_STEP2, num_attacks, item_used);
					return true;

				default:
					/* daily-limit */
					if (current_page == 'bite' && monster.error == 'daily-limit') return false;
					var defender_type = current_type + Math.floor(1 + 3 * Math.random());
					defender_type = defender_type % 4;
					monster.gotoPage('fighting-main', {'monster_type': MONSTER_TYPE[defender_type]}, MSG_ATTACK, MONSTER_TYPE[NR_MONSTERS + defender_type]);
					return true;
			}
		}
		/* Switch monster */
		var sw_monster;
		for (var i = 0; i < 4; i++) {
			sw_monster = new Monster(i);
			if (sw_monster.daily_attacks_updated && sw_monster.next_attack < now) {
				sw_monster.attacks_left += 10 + sw_monster.army_size;
				sw_monster.next_attack = now + 22 * 60 * 60;
				sw_monster.daily_attacks_updated = false;
			}
			if (sw_monster.attacks_left) {
				sw_monster.showProfile();
				return true;
			} else if (!sw_monster.daily_attacks_updated) {
				sw_monster.gotoPage('bite', {'max_attacks': 1}, MSG_ATTACK_CHECK);
				return true;
			}
		}
	}
	return false;
}

function attackCycle_fallback() {
	if (mstatus & PREF_AUTOATTACK) {
		var first_time = now + 22 * 60 * 60;
		var first_type = 0;
		var sw_monster;
		for (var i = 0; i < 4; i++) {
			sw_monster = new Monster(i);
			if (sw_monster.next_attack < first_time) {
				first_time = sw_monster.next_attack;
				first_type = i;
			}
		}
		return [first_time, first_type, 'attack'];
	}
	//return false;
}

function buyCycle_exec() {
	if (mstatus & PREF_AUTOBUY) {
		switch(current_page) {
			case 'store-main':
				if (monster.buy_shield) {
					monster.pressSubmitButton('Buy Shield!', MSG_BUY_SHIELD);
					return true;
				}
				if (monster.buy_weapon) {
					monster.pressSubmitButton('Buy Boom Stick!', MSG_BUY_BOOMSTICK);
					return true;
				}
				break;
			default:
				if (monster.buy_shield || monster.buy_weapon) {
					monster.gotoPage('store-main', null, MSG_BUY);
					return true;
				}
		}
		/* Try switching */
		var sw_monster;
		for (var i = 0; i < 4; i++) {
			sw_monster = new Monster(i);
			if (sw_monster.buy_shield || monster.buy_weapon) {
				sw_monster.showProfile();
				return true;
			}
		}
	}
	return false;
}

function parseURL (url) {
	var tmp = url.split('/')[3];
	current_type = MONSTER_TYPE.indexOf(tmp) - NR_MONSTERS;
	tmp = url.split('/')[4];
	/* Get rid of the fragment identifier */
	tmp = tmp.split('#')[0];
	current_page = tmp.split('?')[0];
	current_page = current_page.match(/(.*).php/)[1];
	/* Add all parameters as properties of current_params */
	if (tmp = tmp.split('?')[1]) {
		tmp = tmp.split('&');
		for (var i = 0; i < tmp.length; i++) {
			var pair = tmp[i].split('=');
			current_params[pair[0]] = pair[1];
		}
	}
}


function insertMenu() {

	var menuCode = []; // temporary array to store strings for concatenation
	var append_elm, elm; // DOM elements we will append menus to

	// Fighting tab	
	append_elm = document.getElementById('toggle_tabs_unused').childNodes[2]; // the 3rd tab is for fighting
	append_elm.getElementsByTagName('a')[0].innerHTML = 'Fight against...';
	elm = document.createElement('ul');
	elm.className = 'tabs';
	append_elm.appendChild(elm);
	append_elm = elm;
	for (var i=0; i < NR_MONSTERS; i++) {
		elm = document.createElement('li');
		elm.innerHTML = createLink("fighting-main","monster_type=" + MONSTER_TYPE[i], MONSTER_TYPE[PLURAL + i]);
		append_elm.appendChild(elm);
	}
	// Fighting history
	elm = document.createElement('li');
	elm.innerHTML = createLink("fighting-history","","Fight history...");
	append_elm.appendChild(elm);
	append_elm = elm;
	elm = document.createElement('ul');
	elm.className = 'tabs';
	append_elm.appendChild(elm);
	append_elm = elm;
	for (var i=0; i < NR_MONSTERS; i++) {
		elm = document.createElement('li');
		elm.innerHTML = createLink("fighting-history","", MONSTER_TYPE[PLURAL + i], APPS_URL + MONSTER_TYPE[PLURAL + i] + '/');
		append_elm.appendChild(elm);
	}
	
	// Feeding tab
	append_elm = document.getElementById('toggle_tabs_unused').childNodes[5]; // the 6th tab is for feeding
	append_elm.getElementsByTagName('a')[0].innerHTML = 'Feed/Ruse...';
	elm = document.createElement('ul');
	elm.className = 'tabs';
	append_elm.appendChild(elm);
	append_elm = elm;
	for (var i=0; i < NR_MONSTERS; i++) {
		elm = document.createElement('li');
		elm.innerHTML = createLink("feed-home","", MONSTER_TYPE[PLURAL + i], APPS_URL + MONSTER_TYPE[PLURAL + i] + '/');
		append_elm.appendChild(elm);
	}
	// Feeding history
	elm = document.createElement('li');
	elm.innerHTML = createLink("event-history","","Feed history...");
	append_elm.appendChild(elm);
	append_elm = elm;
	elm = document.createElement('ul');
	elm.className = 'tabs';
	append_elm.appendChild(elm);
	append_elm = elm;
	for (var i=0; i < NR_MONSTERS; i++) {
		elm = document.createElement('li');
		elm.innerHTML = createLink("event-history","", MONSTER_TYPE[PLURAL + i], APPS_URL + MONSTER_TYPE[PLURAL + i] + '/');
		append_elm.appendChild(elm);
	}

	// Rank tab
	append_elm = document.getElementById('toggle_tabs_unused').childNodes[1]; // the 2nd tab is for rank
	elm = document.createElement('ul');
	elm.className = 'tabs';
	append_elm.appendChild(elm);
	append_elm = elm;
	// Friends Rank
	var rank_tab = append_elm; // contains the 'ul' Rank Tab element
	elm = document.createElement('li');
	elm.innerHTML = createLink('friend-rank', 'ref=top_menu', 'Friends Rank');
	append_elm.appendChild(elm);
	append_elm = elm;
	elm = document.createElement('ul');
	elm.className = 'tabs';
	append_elm.appendChild(elm);
	append_elm = elm;
	for (var i=0; i < NR_MONSTERS; i++) {
		elm = document.createElement('li');
		elm.innerHTML = createLink("friend-rank","ref=top_menu", MONSTER_TYPE[PLURAL + i], APPS_URL + MONSTER_TYPE[PLURAL + i] + '/');
		append_elm.appendChild(elm);
	}
	// Global Rank
	append_elm = rank_tab;
	elm = document.createElement('li');
	elm.innerHTML = createLink('global-rank', 'ref=top_menu', 'Global Rank');
	append_elm.appendChild(elm);
	append_elm = elm;
	elm = document.createElement('ul');
	elm.className = 'tabs';
	append_elm.appendChild(elm);
	append_elm = elm;
	for (var i=0; i < NR_MONSTERS; i++) {
		elm = document.createElement('li');
		elm.innerHTML = createLink("global-rank","ref=top_menu", MONSTER_TYPE[PLURAL + i], APPS_URL + MONSTER_TYPE[PLURAL + i] + '/');
		append_elm.appendChild(elm);
	}

	// Store tab
	append_elm = document.getElementById('toggle_tabs_unused').childNodes[6]; // the 7th tab is for store
	elm = document.createElement('ul');
	elm.className = 'tabs';
	append_elm.appendChild(elm);
	append_elm = elm;
	for (var i=0; i < NR_MONSTERS; i++) {
		elm = document.createElement('li');
		elm.innerHTML = createLink("store-main","", MONSTER_TYPE[PLURAL + i], APPS_URL + MONSTER_TYPE[PLURAL + i] + '/');
		append_elm.appendChild(elm);
	}
	
	menuCode.push('ul.tabs { height: 0; }');
	menuCode.push('ul.toggle_tabs ul { display: block; background-color: transparent; position: relative; overflow: visible; visibility: hidden; list-style: none; padding-top: 0; z-index: 99; }');
	menuCode.push('ul.toggle_tabs ul li a { border-bottom: 1px solid rgb(137, 137, 137); border-left: 1px solid rgb(137, 137, 137); border-right: 1px solid rgb(137, 137, 137); border-top: 0px none transparent; }');
	menuCode.push('ul.toggle_tabs ul li { padding: 0; border-top: 0px none transparent; }');
	menuCode.push('ul.toggle_tabs li { overflow: visible; }');
	menuCode.push('ul.toggle_tabs > li { float: left; overflow: visible; padding-bottom: 0; }');
	menuCode.push('ul.toggle_tabs li, ul.toggle_tabs a { display: block; }');
	menuCode.push('ul.toggle_tabs ul ul { position: relative; top: -2em; left: 95%; visibility: hidden;}');
	menuCode.push('ul.toggle_tabs li:hover ul ul { visibility: hidden; }');
	menuCode.push('ul.toggle_tabs li:hover ul, ul.toggle_tabs ul li:hover ul { visibility: visible; }');
	

	var style = document.createElement('style');
	style.type = "text/css";
	style.innerHTML = menuCode.join(''); 
	menuCode.length = 0; //Reset/Empty the array
	
	// Insert the menu code and style into the document
	try {
		document.getElementsByTagName('head')[0].appendChild(style);
	} catch (ex) {}

// ================ Setup Statistics ==================
	var monsters = new Array();
	var next_attack = monster.next_attack;
	var next_feed = monster.next_feed;
	var next_attack_type = current_type;
	var next_feed_type = current_type;
	for (var i = 0; i < 4; i++) {
		monsters.push(new Monster(i));
		if (monsters[i].next_attack < next_attack) {
			next_attack = monsters[i].next_attack;
			next_attack_type = i;
		}
		if (monsters[i].next_feed < next_feed) {
			next_feed = monsters[i].next_feed;
			next_feed_type = i;
		}
	}
	menuCode.push('<div class="monsterHeading">-STATISTICS-</div>');
	menuCode.push('<table>');
	//insert the last time we cleared the flags as tooltips for the headers
	var dateformat = "MMM d, y HH:mm";
	menuCode.push('<tr><th><b>M</b></th><th><b>Points</b></th><th><b>Bucks</b></th><th><b title="'+
			formatDate(monster.next_attack * 1000,dateformat) + '">Fights</b></th><th><b title="'+
			formatDate(monster.next_feed * 1000,dateformat) + '">Feeds</b></th></tr>');
	for (var i=0; i < NR_MONSTERS; i++) {
		menuCode.push('<tr>');
		//1st cell - monster type - also a link to the current page but for each monster
		menuCode.push('<td> <a href="' + location.href.replace(MONSTER_TYPE[PLURAL + current_type],MONSTER_TYPE[PLURAL + monsters[i].type])  + '">' + MONSTER_TYPE[monsters[i].type].charAt(0).toUpperCase() +' </a></td>');
		//2nd cell - monster power
		menuCode.push('<td id="' + MONSTER_TYPE[i] + '/power">' + monsters[i].power + "</td>");
		//3th cell - monster money
		menuCode.push('<td id="' + MONSTER_TYPE[i] + '/money">' + monsters[i].money + "</td>");
		//4th cell - monster attacks_left
		menuCode.push('<td id="' + MONSTER_TYPE[i] + '/attacks_left">' + (monsters[i].attacks_left == -1 ? '?' : monsters[i].attacks_left )+ "</td>");
		//5th cell - monster feeds_left
		menuCode.push('<td id="' + MONSTER_TYPE[i] + '/feeds_left">' + monsters[i].feeds_left + "</td>");
		menuCode.push('</tr>');
	}

	menuCode.push('<tr> <td colspan="0" title="'+formatDate(1000*next_attack,dateformat) + '"> ');
	if (next_attack > now) {
		menuCode.push('Next fight in ' + secondsToString(next_attack - now) + ' (' +
			MONSTER_TYPE[next_attack_type].charAt(0).toUpperCase() + ') </td></tr>');
	} else {
		menuCode.push('Next fight: NOW!');
	}
	menuCode.push('<tr> <td colspan="0" title="'+formatDate(1000*next_feed,dateformat) +'"> ');
	if (next_feed > now) {
		menuCode.push('Next feed in ' + secondsToString(next_feed - now) + ' (' +
			MONSTER_TYPE[next_feed_type].charAt(0).toUpperCase() + ') </td></tr>');
	} else {
		menuCode.push('Next feed: NOW!');
	}
	menuCode.push('<tr><td colspan="0">Status:<br /><span id="monsteraction"></span><br /><span id="monstertimer"></span></td></tr>');
	menuCode.push('<tr><td colspan="0">Auto Toggle:<br />');
	menuCode.push('<button id="AutoFeed" type="button">Feed ' + (mstatus & PREF_AUTOFEED ? "on! " : "off!" ) + '</button>');
	menuCode.push('<button id="AutoAttack" type="button">Attack ' + (mstatus & PREF_AUTOATTACK ? "on! ":"off!") + '</button>');
	menuCode.push('<button id="AutoBuy" type="button">Buy ' + (mstatus & PREF_AUTOBUY ? "on! " : "off!" ) + '</button></td></tr>');
	menuCode.push('</table>');
	//menuCode.push('<a id="refreshStats">Gather Data</a>');
	
	var menu = document.createElement('div');
	menu.id = 'FBStats';
	menu.innerHTML = menuCode.join(''); // concatenate the string efficiently (faster than +)
	// see http://aymanh.com/9-javascript-tips-you-may-not-know for more information
	menuCode.length = 0; //Reset/Empty the array
	
	menuCode.push("#FBStats { position:fixed; bottom:27px; left:2px; border:2px solid #6D84B4; background:#EEEEEE; color:#3B5998; padding:2px; font-weight:bold; }");
	menuCode.push("#FBStats div.monsterSection { text-align:center; padding-top:2px; }");
	menuCode.push("#FBStats div.monsterHeading { text-align:center; background: #6D84B4; color: #FFFFFF; }");
	menuCode.push("#FBStats a { color: #BB0011; text-decoration:none; }");
	menuCode.push("#FBStats a:hover { color:#B22222; text-decoration:underline; }");
	menuCode.push("#FBStats table { border-spacing: 0px; }");
	menuCode.push("#FBStats table th { border-width: 1px 1px 1px 1px; padding: 2px 2px 2px 2px; border-style: solid solid solid solid; }");
	menuCode.push("#FBStats table td { border-width: 1px 1px 1px 1px; padding: 2px 2px 2px 2px; border-style: solid solid solid solid; }");
			
	style = document.createElement('style');
	style.type = "text/css";
	style.innerHTML = menuCode.join(''); 
	menuCode.length = 0; //Reset/Empty the array
	
	// Insert the menu code and style into the document
	try {
		document.getElementsByTagName('head')[0].appendChild(style);
	} catch(e) {}
	document.body.insertBefore(menu, document.body.lastChild);
	
	// add event listeners
	var t_elm = document.getElementById('AutoAttack');
	t_elm.addEventListener('click',toggleAutobit(PREF_AUTOATTACK,'Attack'),true);
	t_elm = document.getElementById('AutoFeed');
	t_elm.addEventListener('click',toggleAutobit(PREF_AUTOFEED,'Feed'),true);
	t_elm = document.getElementById('AutoBuy');
	t_elm.addEventListener('click',toggleAutobit(PREF_AUTOBUY,'Buy'),true);
}

// ================ Utility functions ==================
function createLink(sPage, sParams, sTitle, sURL) {
	sTitle = sTitle || sPage; // default title = Page name unless it's provided
	sURL = sURL || APPS_URL + MONSTER_TYPE[PLURAL + current_type] + '/'; // default to current app url
	var sExt = '.php';
	if (sPage == undefined || sPage == "") sExt = '';

	if (sParams == undefined || sParams == "") {
		return '<a href="' + sURL + sPage.toLowerCase() + sExt + '">' + sTitle + '</a>';
	} else {
			sParams = '?' + sParams;
			return '<a href="' + sURL + sPage.toLowerCase() + sExt + sParams + '">' + sTitle + '</a>';
	}
}

// Returns null if expr didn't match anything
function getFirstXPathResult(expr, node)
{
	node = node || document;
	var res = document.evaluate(expr, node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	return res.singleNodeValue;
}

function getElementsByClassName(className, tag, elm){
	tag = tag || '*';
	elm = elm || document;
	var xpathExpression;
	var returnElements = new Array();
	xpathExpression = ".//" + tag + "[contains(concat(' ', @class, ' '), ' " + className + " ')]";
	var xpathResult = document.evaluate(xpathExpression, elm, null, XPathResult.ANY_TYPE, null);
	var node;
	while (node = xpathResult.iterateNext()) {
		returnElements.push(node);
	}
	return returnElements;
}

function LZ(x) {return(x<0||x>9?"":"0")+x;}

//http://www.mattkruse.com/javascript/date/source.html
// ------------------------------------------------------------------
// formatDate (date_object, format)
// Returns a date in the output format specified.
// The format string uses the same abbreviations as in getDateFromFormat()
// ------------------------------------------------------------------
function formatDate(date,format) {
	format=format+"";
	date = new Date(date);
	var result="";
	var i_format=0;
	var c="";
	var token="";
	var y=date.getYear()+"";
	var M=date.getMonth()+1;
	var d=date.getDate();
	var E=date.getDay();
	var H=date.getHours();
	var m=date.getMinutes();
	var s=date.getSeconds();
	var yyyy,yy,MMM,MM,dd,hh,h,mm,ss,ampm,HH,KK,K,kk,k;
	// Convert real date parts into formatted versions
	var value=new Object();
	if (y.length < 4) {y=""+(y-0+1900);}
	value["y"]=""+y;
	value["yyyy"]=y;
	value["yy"]=y.substring(2,4);
	value["M"]=M;
	value["MM"]=LZ(M);
	value["MMM"]=MONTH_NAMES[M-1];
	value["NNN"]=MONTH_NAMES[M+11];
	value["d"]=d;
	value["dd"]=LZ(d);
	value["E"]=DAY_NAMES[E+7];
	value["EE"]=DAY_NAMES[E];
	value["H"]=H;
	value["HH"]=LZ(H);
	if (H==0){value["h"]=12;}
	else if (H>12){value["h"]=H-12;}
	else {value["h"]=H;}
	value["hh"]=LZ(value["h"]);
	if (H>11){value["K"]=H-12;} else {value["K"]=H;}
	value["k"]=H+1;
	value["KK"]=LZ(value["K"]);
	value["kk"]=LZ(value["k"]);
	if (H > 11) { value["a"]="PM"; }
	else { value["a"]="AM"; }
	value["m"]=m;
	value["mm"]=LZ(m);
	value["s"]=s;
	value["ss"]=LZ(s);
	while (i_format < format.length) {
		c=format.charAt(i_format);
		token="";
		while ((format.charAt(i_format)==c) && (i_format < format.length)) {
			token += format.charAt(i_format++);
			}
		if (value[token] != null) { result=result + value[token]; }
		else { result=result + token; }
		}
	return result;
}

// Change the default auto-timer value used for countdowns
function changeTimer() {
	var entry = prompt('Enter a delay in seconds between 1 and 30:',auto_timer);
	if (entry != null) {
		//statements to execute with the value
		if ((entry >= 1) && (entry <= 30)) {
			GM_setValue("timer",entry);
			auto_timer = entry;
		}
	}
}

function secondsToString(sec) {
	var str = '';
	var tmp;
	str = (sec % 60) + " s"; //+ //((sec % 60) == 1 ? "" : "s");
	sec = (sec - (sec % 60)) / 60;
	if (sec) {
		str = (sec % 60) + " m " + str;//((sec % 60) == 1 ? "" : "s") + " " + str;
		sec = (sec - (sec % 60)) / 60;
		if (sec) {
			str = (sec % 60) + " h " + str;//((sec % 60) == 1 ? "" : "s") + " " + str;
		}
	}
	return str;
} 

// to take action if auto is enabled and start the timer interval 
function startActionTimer(module) {
	
	document.getElementById('monsteraction').innerHTML = gmessage;
	// create annonymous function to call every second to decrement counter
	// and click when counter = 0
	// Interval function that runs every second and checks the countdown timers
	// and takes appropriate action depending on which page we are on
	ginterval.interval = setInterval(function (){
		gcountdown--;
		if (gcountdown<=0) {
		document.getElementById('monstertimer').innerHTML = 'NOW!';
		// like use the attack again link instead of visiting the main page
			if (typeof gnext_page == "object") {
				if (!(mstatus & ALREADY_GOING)) {
					gnext_page.click();
					mstatus |= ALREADY_GOING;
				}
			} else {
				if (!(mstatus & ALREADY_GOING)) {
					location.href = gnext_page;
					mstatus |= ALREADY_GOING;
				}
			}
		} else {
			document.getElementById('monstertimer').innerHTML = 'in ' + secondsToString(gcountdown);
		}
	}, 1000);
	ginterval.module = module;
}

// bit is the bit to toggle, e.g. PREF_AUTOATTACK
// message is the message to show, e.g. 'AutoAttack' and the id of the button
function toggleAutobit(bit, message) {
	return function() {

		var temp_status = GM_getValue('status',0);
		if (temp_status & bit) {
			document.getElementById("Auto" + message).innerHTML = message + " off!";
			/* Stop the counter only if the actions match */
			if (message.toLowerCase() + "cycle" == ginterval.module.toLowerCase()) {
				clearInterval(ginterval.interval);
				document.getElementById('monsteraction').innerHTML = MSG_REST;
				document.getElementById('monstertimer').innerHTML = '';
			}
		} else {
			document.getElementById("Auto" + message).innerHTML = message + " on!";
		}
		temp_status ^= bit;
		GM_setValue('status', temp_status);
		gmessage = MSG_REST;
		if (temp_status & bit) location.reload();
	};
}

function selectDefender () {
	var divs = document.getElementsByTagName("td");
	if (divs.length < 3) return;
	/* Get the list of all enemies */
	var powers = getElementsByClassName("small_avatar_experience", "div", divs[2]);
	var names = getElementsByClassName('small_avatar_user_name', 'div', divs[2]);
	var urls = getElementsByClassName('small_avatar_attack_link', 'div', divs[2]);
	/* Check if we can attack an enemy */
	for (var i = 0; i < powers.length; i++) {
		var tmp = new Object();
		tmp.power = powers[i].innerHTML;
		tmp.power = tmp.power.replace(/,/,'');
		tmp.power = parseInt(tmp.power.match(/\d+/)[0],10);
		if (!canAttack(monster.power,tmp.power)) continue;
		/* We retrieve the other data */
		/* Name */
		tmp.name = names[i].getElementsByTagName('a')[0];
		tmp.name = tmp.name.innerHTML;
		/* Facebook id */
		var url = urls[i].getElementsByTagName('a')[0];
		url = url.href;
		url = url.match(/defender_fbuserid=(\d+)&defender_monster_type_id=(\d+)/);
		tmp.id = parseInt(url[1],10);
		tmp.type = ATTACK_TYPE.indexOf(parseInt(url[2],10));
		var as = [tmp.type, tmp.id, tmp.name, tmp.power];
		return tmp;
	}
}	

function canAttack(attackerP, defenderP) {
	var diff = defenderP - attackerP;
	var percent = diff/attackerP*100;
	// less than double of our power? then attack!
	if (percent <= 100) {
	return true;
	} else {
		return false;
	}
}

function parseFeedHistory() {
	var result = new Array();
	/* This function makes sense only on certain pages */
	if (current_page != 'event-history' && current_page != 'feed-result') return result;
	
	var divs = getElementsByClassName('list_action_call', 'span');
	/* Parse the informations of every list item */
	for (var i = 0; i < divs.length; i++) {
		divs[i] = divs[i].parentNode;
		var feed_event = new Object();
		/* Name and id of the feeder */

		/* Due to various errors with missing monster names some anchors may
 		 * not be there. Normally with have 3 anchors */
		var nodes = divs[i].getElementsByTagName('a');
		for (var j = 0; j < nodes.length; j++) {
			/* The first anchor does not have consumer_ids on certain pages
 			 * so we want to leave the information from the first anchor if
 			 * available */
			/* First anchor */
			if (nodes[j].href.search(/consumer_id/) + 1) {
				feed_event.name = nodes[j].innerHTML.match(/(Feed|Ruse) (.*)!/)[2];
				feed_event.id = parseInt(nodes[j].href.match(/consumer_id=(\d*)/)[1],10);
			}
			if (feed_event.id) break;
			/* Third anchor */
			if (nodes[j].nextSibling.nodeValue.search(/and|fed/)) {
				feed_event.id = parseInt(nodes[j].href.match(/id=(\d*)/)[1],10);
			}
		}
		if (!feed_event.id) continue;
		if (!feed_event.name) feed_event.name = 'Anonymous';

		/* Feeding date */
		var nodes = getElementsByClassName('list_rank', 'span', divs[i])[0];
		var feed_date = new Date();
		/* We "believe" it's PDT */
		feed_date = Date.parse(nodes.innerHTML + ", " + feed_date.getFullYear() +
			" 23:59:59 PDT");
		feed_date = Math.floor(feed_date / 1000);
		feed_event.date = feed_date;
		
		/* Add the <div> DOM element to allow easy modifications */
		feed_event.div = divs[i];
		result.push(feed_event);
	}
	return result;
}

(function () {
	// Initialize variables
	auto_timer = GM_getValue('timer',5);
	mstatus = GM_getValue('status',0);
	var active_module = '';
	parseURL(location.href);

	// The page has loaded, the ALREADY_GOING variable makes no further sense
	mstatus = (mstatus | ALREADY_GOING) ^ ALREADY_GOING;
	var modules = ['manageFeedClan', 'feedCycle', 'buyCycle', 'attackCycle'];

	monster = new Monster(current_type);
	monster.updateData();
	monster.save();
	var action_selected = false;
	/* First try to do something */
	for (var i = 0; i < modules.length; i++) {
		if (this[modules[i] + '_exec']) action_selected = this[modules[i] + '_exec']();
		if (action_selected) {
			active_module = modules[i];
			break;
		}
	}
	/* If we can not do anything now, wait until the next cycle begins */
	if (!action_selected) {
		var tmp_action;
		var delayed_action = [Infinity];
		for (var i = 0; i < modules.length; i++) {
			if (this[modules[i] + '_fallback']) tmp_action = this[modules[i] + '_fallback']();
			if (tmp_action && tmp_action[0] < delayed_action[0]) {
				delayed_action = tmp_action;
				active_module = modules[i];
			}
		}
		var sw_monster;
		if (delayed_action[0] != Infinity) {
			sw_monster = new Monster(delayed_action[1]);
			sw_monster.gotoPage('side-nav', null, MSG_WAIT, delayed_action[2]);
			gcountdown = delayed_action[0] - now;
		}
	}

	insertMenu();
	
	// Do we have any auto-functions active?
	if (gmessage != '') {
	startActionTimer(active_module);
	} else {
	document.getElementById('monsteraction').innerHTML = MSG_REST;
	}

	// Save variables
	monster.save();
	GM_setValue('status',mstatus);
//end main function
} ) ();
/* vim:set tw=0 sts=0 sw=2 ts=2 ft=javascript: */ 
