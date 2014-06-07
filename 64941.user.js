// ==UserScript==
// @name           Castle Age - Battle Master
// @namespace      Castle Age
// @description    This script assists in the fine details of battles. Construction details, Construction Logging to chat, times left, army members assisting in battle, and more. Originally ported from a japanese Info Extractor and expanded.
// @include        http://apps.facebook.com/castle_age/*
// @include        https://apps.facebook.com/castle_age/*
// @include        http://www.facebook.com/*?filter=app_46755028429*
// @include        https://www.facebook.com/*?filter=app_46755028429*
// @require        http://userscripts.org/scripts/source/49700.user.js
// @require        http://sizzlemctwizzle.com/updater.php?id=64941&days=1
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @version        1.1.70
// ==/UserScript==

var version = '1.1.70';

/*
Changelog:
1.0.0 - Initial Script Release
1.0.1 - Added Damage and Phase Tracking reports when battling a monster. Allows giving you more details to help control attacks on the monsters. Also added ability for siege types to display the amount of REAL hitpoints (approximate is given based on an average) remaining. This will allow you to see how much more attacks must be dealt to ensure the siege weapons will kill it.
1.0.2 - Fix for construction/damage loggers working when disabled. Too strict of a false check, ugh. Also shows amount of Weapon Damage of next Siege weapon you are currently building, so you can compare to current health points remaining.
1.0.3 - Added Mephis details. Also fix for Kiera's spelling :)
1.0.4 - Updates for the GM Config required script changes
1.0.5 - Added The Earth Elemental Boss details and fixed script homepage link
1.0.6 - Old debug fixes, fixed code where I was debugging other features I ended up leaving out. Should be back to fully working now.
1.0.7 - Fixed issue due to CastleAge AutoPlayer now setting ad section to hidden.
1.1.0 - Changed location of BM Details Box and added Skaar monster. - Requested
1.1.1 - Added BM Option to display in sidebar or top. After changing this be sure to refresh your page! - Requested
1.1.2 - Changed RTF stuff to empty Ad Message. This way displays only what you enter without Please RTF! Added before the message. - Requested
1.1.32 - Updates for latest monsters.
1.1.40 - Updates for new GM_config updates, new menu styles, added option to display actual hp left if available. Some small checks for siege stuff added. Fixed a bug where total siege had missing ;
1.1.41 - Added new option to show the summoner's name instead of siege weapon in construction logger.
1.1.42 - Bugfix release for loggers, oops lol.
1.1.50 - Rewrite of obtaining boss name for a backup for "problematic" CA usernames.
1.1.51 - Added additional logging code for debugging CA name issues.
1.1.52 - New method for pulling boss name and changed array of bosses for this new way.
1.1.53 - Fix for unknowns and false reports in eta, health, etc.
1.1.54 - Beta Test Phase: For sidebar version, added several new options, layout, and styling.
1.1.55 - Beta Test Phase: Added draggable box capability to the Title portion of CABM (Where it says Castle Age Battle Master).
1.1.56 - Beta Test Phase: Added checks to keep within up/down page bounds.
1.1.57 - Beta Test Phase: Added Achievement reporting, can be toggled.
1.1.58 - Beta Test Phase: Added new style to build info to Center Top Box, so it matches sidebar box.
1.1.59 - Beta Test Phase: Fixed Horde achievement and added secondary acheivement type system.
1.1.60 - Out of beta, added Power Attack/Defense Buttons to Battle Master (top and side bar). Optimized code for displaying results.
1.1.61 - Rewrote Attack/Defend to simply link to original buttons to perform the actions. 
1.1.62 - Fixed bug with Colossus name. Fixed issue with certain monsters and attack/defend buttons.
1.1.63 - Work on pulling profile ID automatically for achievement stuff, should fix those users who are not having it work.
1.1.64 - Fixed a retarded change by Castle Age for monster battle layouts.
1.1.641 - Fixed issue with pulling Summoner's name in construction logging.
1.1.70  - Fixed issue with assistElem. Fixed Siege spelling. Updated for new CA layout for names, attackers details, etc.
*/

/* 
to-do:
	1. Rewrite to use regex to pull monster name from a string like CWWM does, then load off the monster list from there!
*/

// Image pre-loading
var imgs = {
	bg : "http://i45.tinypic.com/raq4x3.png",
	logo : "http://i41.tinypic.com/6fmvme.jpg",
	icon : "http://photos-f.ak.fbcdn.net/photos-ak-sf2p/v43/25/46755028429/app_2_46755028429_6218.gif",
	attack : "http://i41.tinypic.com/16jiuyu.jpg",
	defend : "http://i42.tinypic.com/1zd905k.jpg"
};
for(var img in imgs) new Image().src = imgs[img];

// $g by JoeSimmons. Supports ID, Class, and XPath (full with types) in one query
// Supports multiple id/class grabs in one query (split by spaces), and the ability to remove all nodes regardless of type
// See script page for syntax examples: http://userscripts.org/scripts/show/51532
function $g(que, O) {
if(!que||typeof(que)!='string'||que==''||!(que=que.replace(/^\s+/,''))) return false;
var obj=O||({del:false,type:6,node:document}), r, t,
	idclass_re=/^[#\.](?!\/)[^\/]/, xp_re=/^\.?(\/{1,2}|count|id)/;
if(idclass_re.test(que)) {
var s=que.split(' '), r=new Array(), c;
for(var n=0; n<s.length; n++) {
switch(s[n].substring(0,1)) {
case '#': r.push(document.getElementById(s[n].substring(1))); break;
case '.': c=document.getElementsByClassName(s[n].substring(1));
		  if(c.length>0) for(var i=0; i<c.length; i++) r.push(c[i]); break;
}
}
if(r.length==1) r=r[0];
} else if(xp_re.test(que)) {
r = document.evaluate(que,(obj['node']||document),null,((t=obj['type'])||6),null);
if(typeof t=="number" && /[12389]/.test(t)) r=r[(t==1?"number":(t==2?"string":(t==3?"boolean":"singleNode")))+"Value"];
}
if(r && obj['del']===true) {
if(r.nodeType==1) r.parentNode.removeChild(r);
else if(r.snapshotItem) for(var i=r.snapshotLength-1; (item=r.snapshotItem(i)); i--) item.parentNode.removeChild(item);
else if(!r.snapshotItem) for(var i=r.length-1; i>=0; i--) if(r[i]) r[i].parentNode.removeChild(r[i]);
} return r;
}

// Define GM_addStyle if it's not Firefox
var GM_addStyle = function(css) {
        var head = document.getElementsByTagName('head')[0], style = document.createElement('style');
        if(head) {
        style.type = 'text/css';
        try {style.innerHTML = css} catch(x) {style.innerText = css}
        head.appendChild(style);
		}
};

GM_config.init("<img src='"+imgs.logo+"'> v"+version, {
	'sidebar' : {
		'section' : [
		"Main Options"
		],
		'label' : "Place BM In Sidebar? (refresh page after changing this)",
		'type' : "checkbox",
		'default' : false
	},
	'position' : {
		'label' : "Keep center box static on screen?",
		'type' : "select",
		'options' : {
			'absolute' : "Absolute",
			'fixed' : "Fixed"
			},
		"default" : "absolute",
		'title' : "Absolute is default, but fixed (not sidebar)"
	},
	'xpos' : {
		'label' : "X Position for Center Box",
		'type' : "text",
		'default' : "200",
		'title' : "This affects the left to right position of the Center style Box for details (not sidebar)"
	},
	'ypos' : {
		'label' : "Y Position for Center Box",
		'type' : "text",
		'default' : "152",
		'title' : "This affects the up and down position of the Center style Box for details (not sidebar)"
	},
	'showHealth' : {
		'section' : [
		"Monster Options"
		],
		'label' : "Show estimated health when available?",
		'type' : "checkbox",
		'default' : false
	},
	'showSiege' : {
		'label' : "Show Siege Details",
		'type' : "checkbox",
		'default' : true
	},
	'showESiege' : {
		'label' : "Show Extended Siege Details",
		'type' : "checkbox",
		'default' : false
	},
	'showAchievements' : {
		'label' : "Show Achievement Status",
		'type' : "checkbox",
		'default' : true
	},
	'showAttackers' : {
		'label' : "Show Attackers Details",
		'type' : "checkbox",
		'default' : true
	},
	'guild' : {
		'section' : [
		"Logger Options"
		],
		'label' : "Guild Name",
		'type' : "text",
		'default' : ""
	},
	'rtf' : {
		'label' : "Ad Message (Displays after Assist Msg)",
		'type' : "text",
		'default' : ""
	},
	'conLogEnabled' : {
		'label' : "Construction Logger Enabled",
		'type' : "checkbox",
		'default' : true
	},
	'showName' : {
		'label' : "Show summoner's name?",
		'type' : "checkbox",
		'default' : true,
		'title' : "This will cause the construction logger to show the name of the summoner instead of the siege weapon summoned."
	},
	'damLogEnabled' : {
		'label' : "Critical Hit Logger Enabled",
		'type' : "checkbox",
		'default' : false
	},
	'minposts' : {
		'section' : [
		"News Filter Options"
		],
		'label' : "Minimum number of posts to show",
		'type' : "select",
		'options' : {
		'off' : "Off",
		 5 : "5",
		10 : "10",
		20 : "20",
		30 : "30",
		40 : "40",
		50 : "50"
		},
		"default" : "10"
	}
},  // Custom styling for the options interface
"body {color:#FFFFFF !important; margin:0 !important; background:transparent url('"+imgs.bg+"') !important;}"+
".section_header {background:#333333 !important;}"+
".section_header_holder {padding:0 6px 0 6px !important; margin-top:8px !important;}"+
".field_label {font-size:11px !important;}"+
"#resetLink {color: #FFFFFF !important;}"+
"span>label.field_label {margin-right:3px !important;}"+
"#header {font-size:18px !important;}"+
"span.config_var {display:inline !important; margin-left:14px !important;}"+
"#saveBtn, #cancelBtn {position:fixed; background-color: #000000 !important; -moz-border-radius: 4px !important; border: 1px solid #4E483D !important;}"+
"#saveBtn {color: #5B9337 !important; bottom:4px; right:80px;}"+
"#cancelBtn {color: #BB0000 !important; bottom:4px; right:6px;}");

var cabm = {
	profileRegex : /facebook\.com\/([^?]+)/i,
	opts : {},
	profile : '',
	masterBox : null,
	linkBox : null,
	monsterBox : null,
	attackersBox : null,
	buttonsBox : document.getElementById('CABM_AttackDefendButtons'),

	config : function() {
		if(!document.getElementById("GM_config")) GM_config.open();
	},

	click : function(obj) {
		if (!obj) {
			return;
		}
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("click", true, true, window,
			0, 0, 0, 0, 0, false, false, false, false, 0, null);
		return obj.dispatchEvent(evt);
	},

	// Created by avg, modified by JoeSimmons. shortcut to create an element
	create : function(a,b,c) {
		if(a=="text") {return document.createTextNode(b);}
		var ret=document.createElement(a.toLowerCase());
		if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
			else if(",style,accesskey,id,name,src,href,which,rel".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
			else ret[prop]=b[prop];
		if(c) c.forEach(function(e) { ret.appendChild(e); });
		return ret;
	},

	buildListBox : function() {
		if(GM_config.get("sidebar")==true)
		{
			var theBox = document.createElement('div');
			theBox.setAttribute('id', 'CABM_Container');
			theBox.setAttribute('style', 'clear: both; text-align: center; border-width: 2px; border-style: solid; margin-bottom: 5px; background-color: #B09060;');
		} else {
			var theBox = document.createElement('div');
			theBox.setAttribute('id', 'CABM_Container');
			theBox.setAttribute('style', 'clear: both; position: '+cabm.opts["position"]+'; background-color: #B09060; text-align: center; border-width: 2px; width: 618px; border-style: solid; margin-bottom: 5px; top:'+cabm.opts["xpos"]+'px; left:'+cabm.opts["ypos"]+'px; z-index:998;');
		}
		
		var theTitle = document.createElement('div');
		theTitle.setAttribute('id', 'CABM_Title');
		theTitle.setAttribute('style', 'background-color: #E0C691; padding-left: 3px; padding-right: 3px; font-weight: bold; border-bottom-style: solid;');
		theTitle.innerHTML = 'Battle Master';
		theTitle.addEventListener('mousedown', function(e){dragControl.dragStart(e);}, false);
		theBox.appendChild(theTitle);

		var theInfo = document.createElement('div');
		theInfo.setAttribute('id', 'CABM_Info');
		theInfo.setAttribute('style', 'text-align: left; padding-left: 3px; padding-right: 3px;');
		theInfo.innerHTML = '';
		
		var detailBox = document.createElement('div');
		detailBox.setAttribute('id', 'CABM_MonsterDetails');
		detailBox.setAttribute('style', 'padding-right: 3px; text-align: left; width: 33%; float: left;');
		theInfo.appendChild(detailBox);
		var attackBox = document.createElement('div');
		attackBox.setAttribute('id', 'CABM_AttackerDetails');
		attackBox.setAttribute('style', 'padding-right: 3px; text-align: left; width: 30%; float: left');
		theInfo.appendChild(attackBox);
		var buttonBox = document.createElement('div');
		buttonBox.setAttribute('id', 'CABM_AttackDefendButtons');
		buttonBox.setAttribute('style', 'padding-right: 3px; padding-left: 3px; padding-top: 10px; text-align: center; width: 33%; float: right;');
		theInfo.appendChild(buttonBox);
		theBox.appendChild(theInfo);

		var theAssist = document.createElement('div');
		theAssist.setAttribute('id', 'CABM_AssistLink');
		theAssist.setAttribute('style', 'clear: both; padding-left: 3px; padding-right: 3px; font-weight: bold; border-bottom-style: solid;');
		theAssist.innerHTML = '';
		theBox.appendChild(theAssist);

		var theScript = document.createElement('div');
		theScript.setAttribute('id', 'CABM_ScriptSection');
		theScript.setAttribute('style', 'background-color: #E0C691; padding-left: 3px; padding-right: 3px; border-top-style: solid;');
		theScript.innerHTML = '<a href="http://userscripts.org/scripts/show/64941" target=_blank>Script Homepage</a> | <a href="http://userscripts.org/users/muaddib" target=_blank>MuadDib\'s Scripts</a>';
		theBox.appendChild(theScript);

		var theOptions = document.createElement('div');
		theOptions.setAttribute('id', 'CABM_OptionsSection');
		theOptions.setAttribute('style', 'background-color: #E0C691; padding-left: 3px; padding-right: 3px; border-top-style: solid;');
		theOptions.innerHTML = '<a>Battle Master Options</a>';
		theOptions.addEventListener('click', function(e) {
			cabm.config();
		},false);
		theBox.appendChild(theOptions);

		if(GM_config.get("sidebar")==true)
		{
			if (FindByAttr(document.body, 'div', 'className', 'UIStandardFrame_SidebarAds')) {
				FindByAttr(document.body, 'div', 'className', 'UIStandardFrame_SidebarAds').style.display='block';
			}		
		
			var theAds = document.getElementById('sidebar_ads');
			theAds.innerHTML = '';
			theAds.parentNode.appendChild(theBox);
		} else {
			var theContent = document.getElementById('app_content_46755028429');
			theContent.parentNode.appendChild(theBox);
		}
		
		cabm.masterBox = document.getElementById('CABM_Container');
		cabm.linkBox = document.getElementById('CABM_AssistLink');
		cabm.monsterBox = document.getElementById('CABM_MonsterDetails');
		cabm.attackersBox = document.getElementById('CABM_AttackerDetails');
		cabm.buttonsBox = document.getElementById('CABM_AttackDefendButtons');
	},

	monsterAttack : function(id) {
		theInput = $g("//input[@value='"+id+"']");
		theForm = theInput.snapshotItem(0).parentNode;
		var found = false;
		for(var theNodes in theForm.childNodes)
		{
			if (theForm.childNodes[theNodes].childNodes.length > 0)
			{
				switch(theForm.childNodes[theNodes].className) {
					case "imgButton" : cabm.click(theForm.childNodes[theNodes].	childNodes[0]); found = true; break;
					default: break;
				}
				if (found)
					break;
			}
		}
	}
};

// http://castleage.wikia.com/wiki/Castle_Age_Wiki for monster info
var globalContainer = document.querySelector('#app46755028429_globalContainer')
  , clickUrl        = window.location.href
  , bosses          = {
        'Cronus, The World Hydra'       : {mpool : 3, army : false, duration: 168 , siege : 6, zh_tw : 'Cronus',
			health: 123000000, goal : 500000, gtype : 1,
			phase: '/graphics/monster_siege_small', levels: {
            'Levels 90+'   : group('90+: '  ,30),
            'Levels 60-90' : group('60-90: ',30),
            'Levels 30-60' : group('30-60: ',30),
            'Levels 1-30'  : group('01-30: ',40),
			},
			
			phaseAmounts : {
            'Catapult'   : 1340000,
            'Ballista'   : 2680000,
            'Cannons'   : 5360000,
            'Blizzard'   : 14700000,
            'Firestorm'   : 28200000,
            'Last Stand'   : 37520000 }
        },

        'Battle of the Dark Legion'       : {mpool : 3, army : false, duration: 168 , siege : 6, zh_tw : 'The Horde',
			health: 100000000, goal : 1000, gtype : 2, defend: true, defend_bar: 'seamonster_ship_health.jpg',
			phase: '/graphics/castle_siege_small', levels : {
            'Levels 90+'   : group('90+: '  ,40),
            'Levels 60-90' : group('60-90: ',30),
            'Levels 30-60' : group('30-60: ',30),
            'Levels 1-30'  : group('01-30: ',30)},

			phaseAmounts : {
            'Dwarven Allies'   : 3000000,
            'Archer Allies'   : 4500000,
            'Elven Allies'   : 6000000,
            'Knight Allies'   : 9000000,
            'Paladin Allies'   : 12000000,
            'Hero Allies'   : 15000000 }
		},

        'Genesis, The Earth Elemental'       : {mpool : 3, army : false, duration: 168 , siege : 5, zh_tw : 'Genesis',
			health: 100000000, goal : 1000000, gtype : 1, defend: true, defend_bar: 'repair_bar_grey.jpg',
			phase: '/graphics/earth_siege_small', levels : {
            'Levels 90+'   : group('90+: '  ,40),
            'Levels 60-90' : group('60-90: ',30),
            'Levels 30-60' : group('30-60: ',30),
            'Levels 1-30'  : group('01-30: ',30)},

			phaseAmounts : {
            'Valerian Soldiers'   : 6600000,
            'Elven Rangers'   : 8250000,
            'Valerian Knights'   : 9900000,
            'Order of Mages'   : 13200000,
            'Silverlight Angels'   : 16500000 }
		},

        'Ragnarok, The Ice Elemental'       : {mpool : 3, army : false, duration: 168 , siege : 5, zh_tw : 'Ragnarok',
			health: 100000000, defend: true, defend_bar: 'bar_dispel.gif',
			phase: '/graphics/water_siege_small', levels : {
            'Levels 90+'   : group('90+: '  ,70),
            'Levels 60-90' : group('60-90: ',70),
            'Levels 30-60' : group('30-60: ',50),
            'Levels 1-30'  : group('01-30: ',30)},

			phaseAmounts : {
            'Catapults'   : 7260000,
            'Ballistas'   : 9075000,
            'Fire Catapults'   : 10890000,
            'Silverlight Angels'   : 14520000,
            'Phoenixes'   : 18150000 }
		},
		
		'Skaar Deathrune'       : {mpool : 1, army : false, duration: 168 , siege : 5, zh_tw : 'Skaar Deathrune',
			health: 100000000, goal : 1000000, gtype : 1, defend: true, defend_bar: 'bar_dispel.gif',
			phase: '/graphics/death_siege_small', levels : {
            'Levels 90+'   : group('90+: '  ,70),
            'Levels 60-90' : group('60-90: ',70),
            'Levels 30-60' : group('30-60: ',50),
            'Levels 1-30'  : group('01-30: ',30)},

			phaseAmounts : {
            'Elven Soldiers'   : 6600000,
            'Order of Mages'   : 8250000,
            'Valerian Knights'   : 9900000,
            'Elder Dragons'   : 13200000,
            'Phoenixes'   : 16500000 }
		},

		// Bahamut the volcanic dragon!
		'nm_volcanic_title.jpg'       : {mpool : 3, army : false, duration: 168 , siege : 5, zh_tw : 'Bahamut',
			health: 100000000, goal : 1000000, gtype : 1, defend: true, defend_bar: 'bar_dispel.gif',
			phase: '/graphics/death_siege_small', levels : {
            'Levels 150+'   : group('150+: '  ,20),
            'Levels 100-149' : group('100-149: ',30),
            'Levels 50-99' : group('50-99: ',30),
            'Levels 1-49'  : group('01-49: ',30)},

			phaseAmounts : {
            'Catapults'   : 7986000,
            'Ballista'   : 9982500,
            'Fire Catapult'   : 11979000,
            'Silverlight Angels'   : 15972000,
            'Phoenixes'   : 19965000 }
		},
		
        'Gildamesh, The Orc King'       : {mpool : 1, army : true , duration: 72 , siege : 0, health : 55000,   goal : 15000, gtype : 1, zh_tw : 'Gildamesh', general : 'Zarevok', levels : {'' : group('',10)}},
        'Colossus of Terra'         : {mpool : 1, army : true , duration: 72 , siege : 0, health : 125000,  goal : 20000, gtype : 1, zh_tw : 'Colossus of Terra', levels : {'' : group('',15)}},
        'Sylvanas the Sorceress Queen'  : {mpool : 1, army : true , duration: 48 , siege : 1, health : 1200000, goal : 50000, gtype : 1, zh_tw : 'Sylvanas'  , levels : {
			'' : group('',20)},
			
			phaseAmounts : {
            'Drain Life'   : 500000 }
		},
        'Keira the Dread Knight'        : {mpool : 1, army : true , duration: 48 , siege : 0, health : 780000,   goal : 30000, gtype : 1, zh_tw : 'Keira'  , levels : {'' : group('',10)}},
        'Mephistopheles'                : {mpool : 1, army : true , duration: 72 , siege : 0, health : 2650000,  zh_tw : 'Mephistopheles'  , levels : {'' : group('',20)}},
        'Lotus Ravenmoore'              : {mpool : 1, army : true , duration: 48 , siege : 0, health : 11250000, goal : 500000, gtype : 1, zh_tw : 'Lotus Ravenmoore'  , levels : {'' : group('',15)}},

        'Emerald Dragon'            : {mpool : 2, army : true , duration: 72 , siege : 0, health : 250000,  goal : 100000, gtype : 1, zh_tw : 'The Emerald Dragon'  , levels : {'' : group('',50)}},
        'Frost Dragon'              : {mpool : 2, army : true , duration: 72 , siege : 0, health : 750000,  goal : 100000, gtype : 1, zh_tw : 'The Frost Dragon'  , levels : {'' : group('',50)}},
        'Gold Dragon'               : {mpool : 2, army : true , duration: 72 , siege : 0, health : 1500000, goal : 100000, gtype : 1, zh_tw : 'The Gold Dragon'  , levels : {'' : group('',50)}},
        'Ancient Red Dragon'        : {mpool : 2, army : true , duration: 72 , siege : 0, health : 3000000, goal : 100000, gtype : 1, zh_tw : 'The Ancient Red Dragon'  , levels : {'' : group('',50)}},

        'Emerald Sea Serpent'       : {mpool : 2, army : true , duration: 72 , siege : 0, defend: true, defend_bar: 'seamonster_ship_health.jpg',
			health : 1500000, zh_tw : 'The Emerald Sea Serpent', levels : {'' : group('',50)}},
        'Sapphire Sea Serpent'      : {mpool : 2, army : true , duration: 72 , siege : 0, defend: true, defend_bar: 'seamonster_ship_health.jpg',
			health : 3000000, zh_tw : 'The Sapphire Sea Serpent', levels : {'' : group('',50)}},
        'Amethyst Sea Serpent'      : {mpool : 2, army : true , duration: 72 , siege : 0, defend: true, defend_bar: 'seamonster_ship_health.jpg',
			health : 6000000, zh_tw : 'The Amethyst Sea Serpent', levels : {'' : group('',50)}},
        'Ancient Sea Serpent'       : {mpool : 2, army : true , duration: 72 , siege : 0, defend: true, defend_bar: 'seamonster_ship_health.jpg',
			health : 9000000, zh_tw : 'The Ancient Sea Serpent', levels : {'' : group('',50)}}
    };

function handleAttack() {

    // Check Url
    var arrUrl = clickUrl.split('?',2), query;
    if(!(/\/battle_monster.php$/.test(arrUrl[0])
        && arrUrl.length == 2 && (query = parseQuery(arrUrl[1]))
        && query.user && query.mpool))
		{
			return ;
		}

    // Extract info
    var summoner = query.user
      , mpool    = query.mpool
      , time     = $("#app46755028429_monsterTicker").text().split(":")
      , boss_name, boss, group_name = '', attacker = '', phase, dmgTotal = 0
      ;

	GM_config.log("Looking up Monster Name");
	boss_name = $('img[uid*='+summoner+']').parent().parent().parent().children().eq(2).text();
	boss_name = $.trim(boss_name.substring(boss_name.indexOf('\'s')+3));
	GM_config.log('Monster Name Pulled: '+boss_name);
	GM_config.log('Monster Name Length: '+boss_name.length);
	// Could be the new monster style, so let's check for it!
	if (boss_name.length == 0)
	{
		// This alert verifies the new background image to get the name. I am thinking of re-writing this
		// whole damn thing to use regex fields like the CWWM. Probably easier to pull monster names using
		// a regex on the subs anyway. Yeah, might mean defining stuff in 2 places instead of just 1, but
		// that would make it easier to pull and read I think.
		//alert($('img[uid*='+summoner+']').parent().parent().children().eq(1).attr('style'));
		GM_config.log('This is a known new monster, but not yet supported. Will require a new system I am thinking about. No need to report this one.');
	}

	if (bosses[boss_name])
	{
		boss = bosses[boss_name];
		GM_config.log('Monster Name Success');
	} else {
		cabm.monsterBox.innerHTML = 'Monster Not Supported! Report Error Console Messages!';
		GM_config.log('Aquiring Name Failed!');
		return;
	}

	$("div.statsT2 table table table tr").each(
        function(idx) {
            var td_0 = $(this).children().eq(0);
			var td_1 = $(this).children().eq(1);
			var td_2 = $(this).children().eq(2);
            if(td_0.attr("colspan") == '2') {
                group_name = $("b", td_0).text();
            } else if(td_2.html() != null && group_name != '') {
                boss.levels[group_name].count ++;
				if ($(this).children().eq(1).html().match(cabm.profile))
				{
					var pText = $(this).children().eq(2).text().trim();
					var dmg = 0, def = 0;
					switch(boss.gtype) {
						case 1 :	dmg = parseFloat((pText.toString().replace('dmg',"")).replace('def', '').split('/')[0].replace(/[^0-9\.]/g,""));
									if (boss.defend)
										def = parseFloat((pText.toString().replace('dmg',"")).replace('def', '').split('/')[1].replace(/[^0-9\.]/g,""));
									dmgTotal = dmg + def;
									break;
						case 2 :	dmgTotal = pText.toString().replace('orcs killed', '');
									break;
					}
				}
            }
        }
    );

    for(var p in boss.levels) {
        attacker += boss.levels[p].label + boss.levels[p].count + " / " + boss.levels[p].max + "<br />";
        boss.levels[p].count = 0;
    }

    if ( time.length == 3 )
	{
        var hpPercent   = $("img[src*=/graphics/monster_health_background.jpg]").parent().css("width").replace(/%/,'');
		var hpReal = boss.health?( Math.ceil((hpPercent / 100) * boss.health) ):false;
		
        var miss = $.trim($("#app46755028429_action_logs").prev().children().eq(3).children().eq(2).children().eq(1).text().replace(/.*:\s*Need (\d+) more answered calls to launch/, "$1"));

		phase = $('img[src*=' + boss.phase + ']').size();
        
		var T2K = hpPercent * boss.duration / 100;
        var T2KHours = Math.floor(T2K);
        var T2KMins = Math.floor((T2K - T2KHours) * 60);		
        var totalSiegeDamagePossible = boss.siege ? calcPhaseDamage(boss, phase, 0):0;
        var hpAAS = boss.siege ? hpReal - calcPhaseDamage(boss, phase + 1, 1):hpReal;
        var hpPercentAAS = boss.siege ? hpAAS / (boss.health - totalSiegeDamagePossible) * 100:hpAAS / boss.health * 100; // AAS = after all sieges. *100 to have same format as hpPercent above.
        var T2KAAS = hpPercentAAS  * boss.duration / 100;
        var T2KAASHours = Math.floor(T2KAAS);
        var T2KAASMins = Math.floor((T2KAAS - T2KAASHours) * 60);

		var phaseHp = 0;
		if (phase != 0)
		{
			phaseHp = ( ((boss.health - calcPhaseDamage(boss, phase, 1)) / boss.health) * 100 );
		}
		var phaseHpReal = (boss.health - calcPhaseDamage(boss, phase, 1));
		
		var info;
		if(GM_config.get("sidebar"))
		{
			cabm.monsterBox.style.width = '100%';
			cabm.attackersBox.style.width = '100%';
			cabm.buttonsBox.style.width = '100%';
		}

		var title = (boss.zh_tw ? '<strong><center>' + boss.zh_tw + ' Details</center></strong><br />' : '');
		var misc  = '<u>Misc Details</u><br />' +
					'Health: ' + ( GM_config.get('showHealth')?addCommas(hpReal):Math.floor(hpPercent) + '%' ) + (boss.defend ? " / Defense: " +  Math.floor($("img[src*=" + boss.defend_bar + "]").parent().css("width").replace(/%/,'')) + "%" : '') + '<br />' +
					'Time Left: ' + time[0] + ' hr ' + time[1] + ' min<br />' +
					'ETA: ' + T2KAASHours  + ' hr ' + T2KAASMins + ' min<br />' +
					(GM_config.get('showAchievements') && boss.goal?'Achievement: ' + (boss.goal-dmgTotal>0?'<font color="red">' + dmgTotal + ' / ' + boss.goal:'<font color="green">Completed!') +  '</font><br /><br />': '<br />');
		var siege = '';
		if (boss.siege && GM_config.get('showSiege'))
		{
			siege = '<u>Siege Details</u><br />' +
					'Siege Stage: ' + Math.min(phase+1, boss.siege) + ' / ' + boss.siege + ', ' + (isNaN(+miss) ? 0 : miss) + ' needed<br />' +
					'Siege Damage: ' + addCommas(calcPhaseDamage(boss, phase+1, 2)) + '<br />' +
					(GM_config.get('showESiege')?'All Siege Dmg: ' + addCommas(totalSiegeDamagePossible) + '<br />Health AAS: ' + ( GM_config.get('showHealth')?addCommas(hpAAS):Math.floor(hpPercentAAS) + '%' ) + '<br />' : '') + '<br />';
		}
		var attackers = (GM_config.get('showAttackers')?('<center><b>Attacker Details</b></center><br />'+(boss.levels[''] ? "Number of attackers: " : "") + attacker + "<br />"):'');
		var buttons = 	'<a style="vertical-align: middle; display: block;" href="javascript:void(0);"><img id="'+(boss.defend?'attackDragon':'attackDragon5')+'" src="'+imgs['attack']+'" title="Attack!" alt="Attack!" /></a><br />' +
						(boss.defend?'<a style="vertical-align: middle; display: block;" href="javascript:void(0);" ><img id="attackDragon5" src="'+imgs['defend']+'" title="Defend!" alt="Defend!" /></a><br />':'')
			;
		
		cabm.monsterBox.innerHTML = title + misc + siege;
		cabm.attackersBox.innerHTML = attackers;
		cabm.buttonsBox.innerHTML = buttons;
		
		var attack1 = document.getElementById("attackDragon");
		var attack2 = document.getElementById("attackDragon5");
		if (attack1)
		{
			attack1.addEventListener('click', function(e) {
				cabm.monsterAttack(e.target.id);
			},false);
		}
		attack2.addEventListener('click', function(e) {
			cabm.monsterAttack(e.target.id);
		},false);

		cabm.linkBox.innerHTML = "<a href='http://apps.facebook.com/castle_age/battle_monster.php?user=" + summoner + "&mpool=" + mpool + "&action=doObjective' >Link to Assist</a><br>";
	} else {
        cabm.monsterBox.innerHTML = "<br /><b>Time Left: Done!</b>";
    }

	checkBattleResults(summoner);
}

function checkBattleResults(summoner) {
	var results = document.evaluate("//div[@class='result']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if ( results.snapshotLength < 1 )
	{
		return;
	}
	
	var htmlResult = results.snapshotItem(0).textContent; 
	var myResult = htmlResult.replace(/(<([^>]+)>)/ig,"");
	if ( myResult.indexOf('You were the') != -1 )
	{
		constructionLogger(myResult, summoner);
	} else if ( myResult.indexOf('CRITICAL HIT') != -1 ) {
		damageLogger(myResult);
	}
};

function calcPhaseDamage(boss, phase, type) {
// If Type =, then
// 0 returns the total damage done through all phases.
// 1 returns the remaining amount of damage the rest of the phases will do if completed.
// 2 returns an individual phase's damage
	var i = 1;
	var amount = 0;
	var damagePossible = 0;
	var damageAvailable = 0;
	var currentPhaseDamage = 0;

	for(var level in boss.phaseAmounts)
	{
		damagePossible += boss.phaseAmounts[level];
		if ( i >= phase )
		{
			damageAvailable += boss.phaseAmounts[level];
		}
		if ( i == phase )
		{
			currentPhaseDamage = boss.phaseAmounts[level];
		}
		i += 1;
	}

	if ( type == 0 ) {
		return damagePossible;
	} else if ( type == 1 ) {
		return damageAvailable ;
	} else if ( type == 2 ) {
		return currentPhaseDamage;
	}
};

function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function constructionLogger(myResult, summoner) {
	if(GM_config.get("conLogEnabled")==false)
	{
		return;
	}

	var mpos = myResult.indexOf('to help summon');
	var npos = myResult.indexOf('You were the') + 13;
	var tpos = myResult.indexOf('needed to summon the') + 21;
	
	if (mpos == -1)
	{
		mpos = myResult.indexOf('required to summon');
		npos = -1;
		tpos = mpos + 23;
	}

	if (mpos != -1)
	{
		var myNumber;
		if (npos != -1)
		{
			myNumber = myResult.substring(npos, mpos-1);
		} else {
			myNumber = 'Last';
		}
		var theType;
		if (myNumber != 'Last')
		{
			theType = myResult.substring(tpos);
		} else {
			theType = myResult.substring(tpos, (myResult.indexOf('. The')+1));
		}
		
		var summonerName = $('img[uid*='+summoner+']').parent().parent().parent().parent().children().eq(2).text();
		summonerName = $.trim(summonerName.substring(0, summonerName.indexOf('\'')));

		var chatValue = '';
		if(GM_config.get("guild").length != 0)
		{
			chatValue += '[' + GM_config.get("guild") + '] ';
		}
		chatValue += myNumber + ' for ' + (GM_config.get('showName')? summonerName:theType);
		if(GM_config.get("rtf").length != 0)
		{
			chatValue += ' ' + GM_config.get("rtf");
		}
		
		var textAreas = document.evaluate("//textarea[@id='app46755028429_comment_text_area']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var chatBox = textAreas.snapshotItem(0);

		chatBox.value = chatValue;

		var inputs = document.evaluate("//input[@id='app46755028429_text_submit_button']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var chatSubmit = inputs.snapshotItem(0);
		chatSubmit.click();
	}
};

function damageLogger(myResult) {
	if(GM_config.get("damLogEnabled")==false)
	{
		return;
	}

	var mpos = myResult.indexOf('Damage[');
	var npos = myResult.indexOf(']!')+2;

	if (mpos != -1)
	{
		var chatValue = '';
		if(GM_config.get("guild").length != 0)
		{
			chatValue += '[' + GM_config.get("guild") + '] ';
		}
		chatValue += 'Critical Hit ' + myResult.substring(mpos, npos);
		if(GM_config.get("rtf").length != 0)
		{
			chatValue += ' ' + GM_config.get("rtf");
		}
		
		var textAreas = document.evaluate("//textarea[@id='app46755028429_comment_text_area']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var chatBox = textAreas.snapshotItem(0);

		chatBox.value = chatValue;

		var inputs = document.evaluate("//input[@id='app46755028429_text_submit_button']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var chatSubmit = inputs.snapshotItem(0);
		chatSubmit.click();
	}
};

function parseQuery(query) {
    var arr = query.split("&"), obj = {};
    for(var i=0 ; i < arr.length ; i++) {
        var kv = arr[i].split('=');
        if(kv.length == 2)
            obj[kv[0]] = kv[1];
    }
    return obj;
}

function group(label, max) {
    return {
        'label'   : label,
        'max'     : max,
        'count'   : 0
    };
}

function FindByAttr(obj,tag,attr,className) {
	if(className.exec==undefined) {
		if(attr=="className") { attr="class"; }
		var q=document.evaluate(".//"+tag+"[@"+attr+"='"+className+"']",obj,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
		if(q && q.singleNodeValue) { return q.singleNodeValue; }
		return null;
	}
	var divs=obj.getElementsByTagName(tag);
	for(var d=0; d<divs.length; d++) {
		var div=divs[d];
		if(className.exec!=undefined) {
			if(className.exec(div[attr])) {
				return div;
			}
		} else if(div[attr]==className) {
			return div;
		}
	}
	return null;
};

function FindByAttrContains(obj,tag,attr,className) {
	if(attr=="className") { attr="class"; }
	className=className.toLowerCase();
	var q=document.evaluate(".//"+tag+
		"[contains(translate(@"+attr+",'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'),'"+className+
		"')]",obj,null,
		XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	if(q && q.singleNodeValue) { return q.singleNodeValue; }
	return null;
};

if (globalContainer) {
	globalContainer.addEventListener('click', function(event) {
		var obj = event.target;

		while(obj && !obj.href)
		{
			obj = obj.parentNode;
		}

		if (obj == undefined)
		{

		}
		
		if(obj != undefined && obj.href)
		{
			clickUrl = obj.href;
			var assistElem = document.getElementById('CABM_AssistLink');
			if (assistElem != 'undefined')
				assistElem.innerHTML = '';
			cabm.monsterBox.innerHTML = '';
			cabm.attackersBox.innerHTML = '';
			cabm.buttonsBox.innerHTML = '';
		}


	}, true);

	globalContainer.addEventListener('DOMNodeInserted', function(event) {
		if(event.target.id == 'app46755028429_battle_monster' ||
		   event.target.querySelector("#app46755028429_battle_monster")) {
			var assistElem = document.getElementById('CABM_AssistLink');
			if (assistElem != 'undefined')
				assistElem.innerHTML = '';
			setTimeout(handleAttack, 0);
		}
	}, true);
}

GM_registerMenuCommand("Castle Age - Battle Master Options", GM_config.open);

// method to speed up script considerably
var tempopts={}, settings=GM_config.settings;
for(var thing in settings) { // go through the options making cached options copy
var g=GM_config.get(thing), kids=settings[thing].kids;
switch(typeof g) {
case "boolean": tempopts[thing] = g ? true : false; break;
case "number": tempopts[thing] = g || 0; break;
case "text": tempopts[thing] = g || ""; break;
default: tempopts[thing] = g;
}
if(kids && typeof kids=="object") for(var kid in kids) { // go through the extended settings also
var k=GM_config.get(kid);
switch(typeof k) {
case "boolean": tempopts[kid] = k ? true : false; break;
case "number": tempopts[kid] = k || 0; break;
case "text": tempopts[kid] = k || ""; break;
default: tempopts[kid] = k;
}
}
}
cabm.opts = tempopts; tempopts=null; k=null; g=null;

var prof=document.evaluate("//a[contains(@id, 'navAccountName')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
if(prof)
	cabm.profile = prof.href.indexOf("id=") != -1? prof.href.split("id=")[1].split("&")[0] : prof.href.match(cabm.profileRegex)[1];


// From base example by JoeSimmons from USO
var dragControl = {
	device : new Object(),
	x : 0,
	y : 0,
	
	dragStart : function(e) {
		var dragObj = dragControl.device;
		if (dragObj.zIndex == undefined || dragObj.zIndex == null)
			dragObj.zIndex = 0;
		dragObj.elNode = e.target.parentNode;
		if (dragObj.elNode.nodeType == 3) dragObj.elNode = dragObj.elNode.parentNode;
		dragObj.cursorStartX = e.clientX + window.scrollX;
		dragObj.cursorStartY = e.clientY + window.scrollY;
		dragObj.elStartLeft  = parseInt(dragObj.elNode.style.left, 10);
		dragObj.elStartTop   = parseInt(dragObj.elNode.style.top,  10);
		dragObj.elNode.style.zIndex = ++dragObj.zIndex;
		document.addEventListener("mousemove", dragControl.dragGo,   true);
		document.addEventListener("mouseup",   dragControl.dragStop, true);
		e.preventDefault();
	},
	
	dragGo : function(e) {
		e.preventDefault();
		var dragObj = dragControl.device;
		var x = e.clientX + window.scrollX,
			y = e.clientY + window.scrollY;
		var maxY = (window.innerHeight-(document.getElementById('CABM_Container')).offsetHeight)+10;
		if((y>=50 && (y-window.scrollY)<maxY))
		{
			dragObj.elNode.style.top = (dragObj.elStartTop  + y - dragObj.cursorStartY) + "px";
			dragObj.elNode.style.left = (dragObj.elStartLeft + x - dragObj.cursorStartX) + "px";
		}
	},

	dragStop : function(e) {
		document.removeEventListener("mousemove", dragControl.dragGo,   true);
		document.removeEventListener("mouseup",   dragControl.dragStop, true);
	}
};

var newsfeed = {
	expandOn : false,
	
	cleanup : function() {
		switch(newsfeed.expandOn && cabm.opts["minposts"] != "off") {
			case true: newsfeed.expand(); break;
		}
	},
	
	expand : function() {
		var posts=$g("count(.//li[starts-with(@id,'stream_story_') and contains(@class,'46755028429')])", {node:$('home_stream'), type:1}),
		more=$g("//div[@class='UIShowMore_ShowMore']/a[@class='PagerMoreLink' and @rel='async' and not(contains(@class,'async_saving'))]", {type:9});
		if (typeof posts != 'number')
			posts = 0;
		if (posts == 0)
			posts=$g("count(.//div[starts-with(@id,'div_story_') and contains(@class,'46755028429')])", {node:$('home_stream'), type:1});
		if (typeof posts != 'number')
			posts = 0;
		if(more) switch(posts < parseInt(cabm.opts["minposts"])) {
			case true: cabm.click(more); break;
			case false: newsfeed.expandOn=false; break;
		}
	}
};

window.addEventListener("load", function(event) {
	if (window.location.href.indexOf('home.php') != -1 && window.location.href.indexOf('?filter=app_46755028429') != -1)
	{
		var f=$g("//div[starts-with(@id, 'pagelet_navigation')]", {type:9});
		if(f) {
			// Add checking and creation if needed, of the WallManagerHolder div system here so all wall managers can use it.
			if(!document.getElementById('navigation_item_wall_managers')) {
				var navDiv = document.createElement('div');
				navDiv.id='navigation_item_wall_managers';
				navDiv.innerHTML="<div class=\"clearfix uiHeader uiHeaderNav online_header uiHeaderTopBorder\"><div class=\"lfloat\" style=\"height:12px;\"><h4>Wall Managers<\/h4><\/div>";

				f.insertBefore(navDiv, f.childNodes[0]);
			}
			f.insertBefore((cabm.create("a", {className:"item", href:"javascript:void(0);", onclick:cabm.config}, new Array(
				cabm.create("span", {className:"imgWrap"}, new Array(cabm.create("img", {src:imgs.icon}))),
				cabm.create("span", {innerHTML:"Battle Master "+version+" Options<br />"})
			))), f.childNodes[1]
			);
		}
		setTimeout(newsfeed.cleanup, 0);
	} else if (window.location.href.indexOf('facebook.com/castle_age/') != -1) {
		cabm.buildListBox();
		if(event.target.querySelector("#app46755028429_battle_monster")) {
			var assistElem = document.getElementById('CABM_AssistLink');
			if (assistElem != 'undefined')
				assistElem.innerHTML = '';
			setTimeout(handleAttack, 0);
		}
	}
},false);