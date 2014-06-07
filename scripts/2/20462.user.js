function parseHeaders(metadataBlock) {
  var headers = {};
  var line, name, prefix, header, key, value;
  var lines = metadataBlock.split(/\n/).filter(/\/\/ @/);
  var i=0;
  //for (line in lines) {
  for each (line in lines) { //iterating through obj values
    if (++i > lines.length) break; // to control error in looping from remote responses
    [, name, value] = line.match(/\/\/ @(\S+)\s*(.*)/);
    //[line, name, value] = line.match(/\/\/ @(\S+)\s*(.*)/);
    switch (name) {
      case 'licence':
        name = 'license';
        break;
    }
    [key, prefix] = name.split(/:/).reverse();
    if (prefix) {
      if (!headers[prefix]) 
        headers[prefix] = new Object;
      header = headers[prefix];
    } else
      header = headers;
    if (header[key] && !(header[key] instanceof Array))
      header[key] = new Array(header[key]);
    if (header[key] instanceof Array)
      header[key].push(value);
    else
      header[key] = value;
  }
  headers['licence'] = headers['license'];
  return headers;
};

var scriptMETA = parseHeaders(<><![CDATA[
// ==UserScript==
// @name           FB Monsters Enhancer VX
// @namespace      ViXaY
// @description    Has auto-play functionsto use Monsters(slayers, werewolves, vampires, zombies) applications in facebook 
// @source         http://userscripts.org/scripts/show/20462
// @identifier     http://userscripts.org/scripts/source/20462.user.js
// @uso:script     20462
// @version        2.0.0
// @date           2009-12-29 15.02.46
// @copyright      2009, Vixay Xavier (http://userscripts.org/users/42874)
// @contributor    Piotr P. Karwasz (http://userscripts.org/users/49912)
// @include        http://apps.facebook.com/slayers/*
// @include        http://apps.facebook.com/werewolves/*
// @include        http://apps.facebook.com/vampires/*
// @include        http://apps.facebook.com/zombies/*
// @require        http://code.jquery.com/jquery-latest.min.js
// @require        http://userscripts.org/scripts/source/49700.user.js
// ==/UserScript==
]]></>.toString());

// @unwrap For Debugging Purposes not needed in final script

// @require        http://userscripts.org/scripts/source/49700.user.js
// for GM_config panel script 1.1.6 at USO
// @require        http://userscripts.org/scripts/source/50018.user.js
//for extensions to GM_config object (only works with 1.1.6) script
//Examples in GM_config Guide (http://userscripts.org/guides/11) require this script as well!
// this is not clear in the guide

// @require        http://gmconfig.googlecode.com/svn/trunk/gm_config.js
//for gm_config panel script 1.1.4 at GOOGLE
//Example in GM_config DEV group work with this script!

//http://wiki.greasespot.net/Metadata_block*/
function USOversionDiff() {
  GM_xmlhttpRequest({
    method:'GET',
    url:'https://userscripts.org/scripts/source/' + scriptMETA['uso']['script'] + '.meta.js',
    headers:{
      'Accept':'text/javascript; charset=UTF-8'
    },
    overrideMimeType:'application/javascript; charset=UTF-8',
    onload:function(response) {
      var httpsMETA = parseHeaders(response.responseText);
  
      GM_log([
        "\n---------- Local ----------",
        scriptMETA['name'] + ' version ' + scriptMETA['version'],
        scriptMETA['copyright'],
        scriptMETA['license'],
        scriptMETA['description'],
        scriptMETA['include'],
        scriptMETA['exclude'],
        "\n---------- Remote ----------",
        httpsMETA['name'] + ' version ' + httpsMETA['version'],
        httpsMETA['copyright'],
        httpsMETA['license'],
        httpsMETA['description'],
        httpsMETA['include'],
        httpsMETA['exclude'],
        httpsMETA['uso']['script'],
        httpsMETA['uso']['version'],
        httpsMETA['uso']['timestamp'],
        httpsMETA['uso']['hash'],
        httpsMETA['uso']['installs'],
        httpsMETA['uso']['reviews'],
        httpsMETA['uso']['rating'],
        httpsMETA['uso']['discussions'],
        httpsMETA['uso']['fans']
      ].join("\n"));
    }
  });
}

/*jsl:option explicit*/
// bit masks
var PREF_RESET        = 0; 
var PREF_AUTOFEED     = 1; //2^0
var PREF_AUTOATTACK   = 2; //2^1
var CLANSELECT_MANUAL = 4; //2^2
var ALREADY_GOING     = 8; //2^3
var PREF_AUTOBUY      = 16; //2^4
var PREF_AUTOQUEST    = 32; //2^5
var PREF_ALL          = 255; //2^8 - 1 
 
// configurable constants
var CLAN_MIN_DIM = 8; // minimal dimension of your clan
var CLAN_MAX_DIM = 20; //maximal dimension of your clan
var TOLERANCE_TIME = 3; // The time a clan member that does not feed us remains in the clan

// messages
var MSG_REST                  = "Resting";
var MSG_PAUSE                 = "Paused";
var MSG_WAIT                  = "Waiting to %";
var MSG_PROFILE               = "Going to profile";
var MSG_FEED_HISTORY          = "Checking feed history";
var MSG_FEED_FRIENDS          = "Adding friends to clan";
var MSG_FEED_STEP1            = "Feeding %'s %";
var MSG_FEED_STEP2            = "Feeding % to %'s %";
var MSG_FEED_MANY             = "Feeding multiple friends";
var MSG_ATTACK                = "Attacking %";
var MSG_ATTACK_COMBINED       = "Attacking %'s % % times %";
var MSG_ATTACK_STEP1          = "Attacking %'s %";
var MSG_ATTACK_STEP2          = "Attacking % times %";
var MSG_ATTACK_CHECK          = "Checking delay for new attacks";
var MSG_BUY                   = "Buying stuff";
var MSG_BUY_ITEM              = "Buying % for % bucks";
var MSG_BUY_SHIELD            = "Buying shield";
var MSG_BUY_BOOMSTICK         = "Buying boomstick";
var MSG_QUEST                 = "Doing Quests";
var MSG_QUEST_REPEAT          = "Repeating Quest";
var MSG_QUEST_NEW             = "Finding new Quests";
var MSG_ERROR_IMAGINARY       = "Imaginary monster<br />";
var MSG_ERROR_FULL            = " is full<br />";
var MSG_ERROR_FEED_LIMIT      = "No feeds left<br />";
var MSG_ERROR_ATTACK_LIMIT    = "No attacks left<br />";
var MSG_ERROR_CLAN_TOO_SMALL  = "Not enough clan members<br />";
var MSG_ERROR_VICTIM_FRIENDS  = "Not enough victim friends<br />";
var MSG_ERROR_FEEDS_LEFT      = "Cannot use all feeds<br />";
var MSG_ERROR_ALREADY_FED     = "Already fed this monster<br />";

// non-configurable constants - can use const keyword in new JS specs
var MONSTER_TYPE = ['slayer', 'werewolf', 'vampire', 'zombie', 'slayers', 'werewolves', 'vampires', 'zombies'];
var ATTACK_TYPE = [ 4, 3, 2, 1 ];
//'slayer', 'werewolf', 'vampire', 'zombie',
//49, 29, 27, 17
var MONSTER_APP_IDS = [ 17801732384, 2721700161, 2458301688, 2341504841 ];
var FEEDS_NAME = ['Ruses','Feeds','Feeds','Feeds'];
var RITUALS_NAME = ['relics','totems','blood rubies','brains'];
var SLAYER = 0;
var WEREWOLF = 1;
var VAMPIRE = 2;
var ZOMBIE = 3;
var NR_MONSTERS = 4;
var PLURAL = NR_MONSTERS;
var APPS_URL = 'http://apps.facebook.com/';
var MONTH_NAMES=new Array('January','February','March','April','May','June','July','August','September','October','November','December','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
var DAY_NAMES=new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sun','Mon','Tue','Wed','Thu','Fri','Sat');

//Resources
// global variables
// variables that need saving
var mstatus;
var auto_timer;                 // default countdown value for timer
var monster;                    // the current monster
var allmonsters = new Array();  // all the monsters loaded once for testing.
var running;                    // Is the autoplayer running?

// variables that are session only
var current_type = "";
var current_page = "";
var current_params = new Object();
var now = Math.floor(new Date().getTime() / 1000); // Milliseconds give integer overflow when storing
// what to do when timer goes out
var gnext_page; // where to go, can be a string (URL) or an element (form to submit)
var ginterval = new Object(); // to store the periodic timer function
var gcountdown; // how long that function waits
var gmessage = ''; // status message to show
var galready_going = false; 
var $; // to hold jquery js library object

//http://wiki.greasespot.net/Code_snippets#Make_menu_toggle
function makeMenuToggle(key, defaultValue, toggleOn, toggleOff, prefix) {
  // Load current value into variable
  window[key] = GM_getValue(key, defaultValue);
  // Add menu toggle
  GM_registerMenuCommand((prefix ? prefix+' - ' : '') + (window[key] ? toggleOff : toggleOn), function() {
    GM_setValue(key, !window[key]);
    location.reload();
  });
}
//this also defines the variable!
makeMenuToggle('GM_DEBUG', 0, 'Enable DEBUG messages', 'Disable DEBUG messages', scriptMETA['name']);
makeMenuToggle('isRunning', true, 'Resume', 'Pause', scriptMETA['name']);
running = GM_getValue('isRunning', true);
//GM_log('running:'+running+'isRunning'+isRunning);
//GM_log('GM_DEBUG:'+GM_DEBUG);
//GM_log('GM_DEBUGwin:'+window['GM_DEBUG']+window.GM_DEBUG);

//if(!GM_DEBUG) {
//   //GM_log = function(){}; // disable GM_log functionality
//} else
if(GM_DEBUG && unsafeWindow.console){
  //GM_log = unsafeWindow.console.log; //log to firebug console
  var console = unsafeWindow.console; //enable the firebug console cmmands
}
if (!console) {
  var console =  {
   log :    function (text) { if(GM_DEBUG) GM_log(text); },
   info :   function (text) { if(GM_DEBUG) GM_log(text); },
   warn :   function (text) { if(GM_DEBUG) GM_log(text); },
   dir  :   function (text) { if(GM_DEBUG) GM_log(uneval(text)); }, //else GM_log(text);
   error :  function (text) { if(GM_DEBUG) GM_log(text); },
   'assert':function (exp, message) {if (!exp) throw new Error(message);},
   time:    function (text) { if(GM_DEBUG) GM_log(text + new Date().getTime()); },
   timeEnd: function (text) { if(GM_DEBUG) GM_log(text + new Date().getTime()); }
  };
   //dir  :   function (text) { if(GM_DEBUG && text && (typeof(text) =='object')) GM_log(text.toSource()); }, //else GM_log(text);
}

function debug() {
  if (GM_DEBUG) {
    if (console) console.log.apply(this, arguments);
    else if (GM_log) GM_log.apply(this,arguments);
  }
}

Array.prototype.remove=function(s){
  var i = this.indexOf(s);
  if(i != -1) this.splice(i, 1);
};

// Array.unique( strict ) - Remove duplicate values
//Array.prototype.unique = function( b ) {
// var a = [], i, l = this.length;
// for( i=0; i<l; i++ ) {
//  if( a.indexOf( this[i], 0, b ) < 0 ) { a.push( this[i] ); } //indexOf is slower as it incurs more overhead
// }
// return a;
//};
Array.prototype.pushUnique = function (b) {
  if (this.indexOf(b) < 0) this.push(b);
}

Array.prototype.unique = function () {
	var r = new Array();
	o:for(var i = 0, n = this.length; i < n; i++)
	{
		for(var x = 0, y = r.length; x < y; x++)
		{
			if(r[x]==this[i])
			{
				continue o;
			}
		}
		r[r.length] = this[i];
	}
	return r;
}

// converts comma numbers to int
String.prototype.toInt=function(){
  return parseInt(this.replace(/,/g,''),10);
};
/***
 * Function: Script Update Checker
 *
 * Description:
 * Script Update Checker (http://userscripts.org/scripts/show/20145)
 * written by Jarett (http://userscripts.org/users/38602).
 */
var SUC_script_num = 20462;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
// other ways of update checks
//@require http://userscripts.org/usocheckup/20462.js // actual - currently not working
//@require http://usocheckup.dune.net/20462.js //mirror

//@require http://updater.usotools.co.cc/20462.js // alternate

// objects
/* Clan Member Object Type*/
function GenericMonster(mtype,id) {
  this.id = id;
  this.type = mtype;
  this.next_feed = 0;
  this.last_fedback = 0;
  this.name = 'Anonymous';
  this.points = 0;
}

function Monster(mtype) {
  this.type = mtype;
  this.name = MONSTER_TYPE[mtype];
  this.abbrev = MONSTER_TYPE[mtype].charAt(0).toUpperCase();
  
  this.char_stats = { //need to be scraped from screen - see .getValues()
      level:1,
      points:0,
      energy:0,
      energy_max:10,
      fights:0,
      //fights_max
      feeds:0,
      //feeds_max
      bucks:0,
      rituals:0,
      army:0
    };
  //this.char_stats[RITUALS_NAME[mtype]]=0;
  this.preferences = {//set in config panel
    enabled:true,
    autofight:true,
      useweapon:'Boom Stick', //'Boom Stick'
    autofeed:true,
    autoquest:true,
      repeatquest:0,
      acquireitems:false,
    autobuy:true,
      items_tostock:'1004,2001'
  };

  this.state = {//for internal calculations/usage
    next_feed:0, //date&time
    next_fight:0, //date&time//attack
    daily_attacks_updated:false,
    next_quest:0, //date&time
    check_history:0, //date&time
    next_buy:0,
    items_tobuy:[],
    clan:[],
    clan_ids:[],
    last_feed:[0, 0, 0, 0, 0, 0, 0, 0]
  };
  /* Defaults */
  //this.buy_shield = 0;
  //this.buy_weapon = 0;
  /* Retrieve object */
  try {
    $.extend(this.char_stats ,deserialize(this.type+'char_stats',this.char_stats));
    $.extend(this.preferences ,deserialize(this.type+'preferences',this.preferences));
    $.extend(this.state ,deserialize(this.type+'state',this.state));
//    for (var objname in ['char_stats','preferences','state']) {
//      $.extend(this[objname],deserialize(this.type+objname,this[objname]));
//    }
//    this.char_stats = deserialize(this.type+'char_stats',this.char_stats);
//    this.preferences = deserialize(this.type+'preferences',this.preferences);
//    this.state = deserialize(this.type+'state',this.state);
    
  } catch(ex) {
    userLogBox.debug('Exception in Monster constructor: ' + ex); //EXCEPTION
  }
  /* next_feed consistency check */
  if (this.state.next_feed < this.state.last_feed[0] + 22 * 60 * 60) this.state.next_feed = this.state.last_feed[0] + 22 * 60 * 60;
  /* Auto-generate feeds_left */
//  this.char_stats.feeds = 0;
  if (!this.char_stats.feeds) {
    // if it's been more than 22 hours since we last fed somebody, then we should now have a feed available
    for (var i = 0; i < 8; i++) {
      if (this.state.last_feed[i] + 22 * 60 * 60 < now ) this.char_stats.feeds++;
    }
  }
}

Monster.prototype = new Object();

Monster.prototype.addClanMember = function(clanm) {
  if (clanm.name == 'You') return false;
  clanm.name = clanm.name || 'Anonymous';
  if (!clanm.id) return false;
  /* Don't duplicate clan members */
  //if (this.getClanMemberById(clanm.id,true)) return true;
  if (this.state.clan_ids.indexOf(clanm.id) + 1) return true; // check if clan memeber already exists
  if (this.state.clan.length >= CLAN_MAX_DIM) {
    return false;
  } else {
    var index;
    if ((index = this.state.clan_ids.indexOf(clanm.id)) == -1) {
      this.state.clan.push(clanm);
      this.state.clan_ids.push(clanm.id);
      return true;
    } else {
      this.state.clan[index] = clanm;
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
  for (var i = 0; i < monster.state.clan.length; i++) {
    var tmp_clanm = monster.state.clan[i];
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
  var idx = this.state.clan_ids.indexOf(replace_id);
  this.state.clan[idx] = clanm;
  this.state.clan_ids[idx] = clanm.id;
  return true;
};

Monster.prototype.canDo = function(activity) {
  if (!this.preferences.enabled) return false;
  return (this.preferences[activity]);
};

Monster.prototype.canDoNow = function(activity) {
  if (this.canDo(activity) !== false) { //to handle the undefined case for 'autoclan'
    switch(activity) {
      case 'autofight':
        if (this.state.next_fight < now || this.char_stats.fights > 0) return true;
        break;
      case 'autofeed':
        if (this.state.next_feed < now || this.char_stats.feeds > 0) return true;
        break;
      case 'autoquest':
        if (this.state.next_quest < now && this.char_stats.energy > 0) return true;
        break;
      case 'autobuy':
        if ((this.state.next_buy < now && this.char_stats.bucks > 180)
           || (this.state.items_tobuy && (this.state.items_tobuy.length && this.preferences.acquireitems)) //acquireitems should be removed later
           || (this.preferences.items_tostock && this.preferences.items_tostock.length > 0))
              return true;
        break;
      case 'autoclan':
        if (this.state.check_history < now) return true;
        break;
      default:
        break;
    }
  }
  return false;
};

Monster.prototype.canAttack = function(genericm,attackrightaway) {
  var diff = (genericm.points - this.char_stats.points);
  var percent = diff/this.char_stats.points*100;
  var max_percent = GM_config.get('max_percent') || 100;
  //debug('canAttack: diff: '+diff+' percent: '+percent+' max_percent: '+max_percent);
  if (percent <= max_percent) {
    if (attackrightaway) this.attack(genericm);
    return true;
  } else {
    return false;
  }
};

Monster.prototype.attack = function(clanm) {
  this.gotoPage('fighting-confirm', {'user_id': clanm.id, 'type': ATTACK_TYPE[clanm.type]},
    MSG_ATTACK_STEP1, clanm.name, MONSTER_TYPE[clanm.type]);
};

// Feeds the monster 'id'
Monster.prototype.feed = function(clanm) {
  this.gotoPage('feed-main', {'user_id': clanm.id}, MSG_FEED_STEP1, clanm.name, this.name);
};

Monster.prototype.getClanMemberById = function(id,fast) {
  var clanm = undefined;
  var i;
  if (fast) {
    i = this.state.clan_ids.indexOf(id);
    //debug('getClanMemberById: fast mode '+i);
    if (i >= 0) return this.state.clan[i];
    else debug('getClanMemberById:fast mode '+id+' does not exist');
  }
  for (i = 0; i < this.state.clan.length; i++) {
  if (this.state.clan[i].id == id) {
    clanm = this.state.clan[i];
    break;
    }
  }
  if (!clanm) i = -1;
  //debug('getClanMemberById: slow mode '+i);
  if (i != this.state.clan_ids.indexOf(id)) debug('getClanMemberById: clan & clan_id OUT OF sync');
  return clanm;
};

Monster.prototype.clanUpdateState = function(id,state,wait) {
// last_fedback:
//   0 -never fed us back
//   1 - was fed by us, but never fud us back
//   -1 - blacklisted, as last feed failed (imaginary monster)
//   other - Date on which they fed us

   // next_feed > now = alread fed
   // next_feed < now = hungry
  var clanm = this.getClanMemberById(id,true);
  debug('clanUpdateState:'+id+state+' wait:'+wait+' clan:'+clanm);
  console.info(clanm);
  if (!wait) wait = 22 * 60 * 60;
  if (clanm) {
    switch(state) {
      case 'imaginary-monster':
        clanm.last_fedback = -1;
        gmessage = MSG_ERROR_IMAGINARY;
        break;
      case 'monster-full'://requires wait
        clanm.next_feed = now + wait;
        gmessage += clanm.name + MSG_ERROR_FULL;
        break;
      case 'daily-limit':
        if (this.state.next_feed < now) this.state.next_feed = now + 4*3600; //delay by 4 hours
        gmessage = MSG_ERROR_FEED_LIMIT;
        break;
      case 'already-fed': //requires wait
        clanm.next_feed = now + wait;
        gmessage = MSG_ERROR_ALREADY_FED;
        break;
      case 'attack-limit':
        this.state.next_fight = now + wait;
        this.state.daily_attacks_updated = true;
        debug('attack limit reached mins: ' + errorparams.wait/60); //DEBUG
        gmessage = MSG_ERROR_ATTACK_LIMIT;
        break;
//        besides the errors what other operations we can do on the clan/monster
      case 'feed-success':
        clanm.next_feed = now + wait;
        if (clanm.last_fedback == 0) clanm.last_fedback++; // If this was a clan member on trial, his trial is over
        //update last feed times
        this.state.last_feed.shift();
        this.state.last_feed.push(now);
        if (!monster.char_stats.feeds) this.state.next_feed = this.state.last_feed[0] + 22 * 60 * 60; //update next_feed time
        break;
      case 'update-time': //requires wait
        if ((clanm.last_fedback != -1) && (clanm.last_fedback < wait)) clanm.last_fedback = wait;
        break;
      default:
        /* Unknown Error */
        debug('ClanUpdateState: unknown state:'+state);
        break;
    }
    return true;
  }
  return false;
};

Monster.prototype.composeMessage = function(message, args) {
  //console.warn(message);
  //console.info(args);
  message += '... (' + this.abbrev + ')';
  var str = '';
  for (var i = 0; message.indexOf('%') != -1; i++) {
    str = args[i] || '';
    /* We don't want accidentally to make an infinite cycle */
    if (typeof(str)=='string') str = str.replace(/%/,'');
    message = message.replace(/%/,str);
  }
  console.warn(message);
  return message;
};

Monster.prototype.gotoPage = function(page, params, message) {
  gmessage += this.composeMessage(message,Array.prototype.slice.call(arguments).slice(3));
  if (page.indexOf('http') != -1) { // if full link is provided, do not contruct link
    gnext_page = page;
  }
  else { // construct a link based on parameters
    gnext_page = APPS_URL + MONSTER_TYPE[this.type + NR_MONSTERS] + '/';
    gnext_page += page + '.php';
    if (params) {
      gnext_page += '?';
      for (i in params) {
        gnext_page += i + '=' + params[i] + '&';
      }
      if (gnext_page.charAt(gnext_page.length - 1) == '&') gnext_page = gnext_page.substr(0, gnext_page.length - 1);
    }
  }
  userLogBox.debug('gotoPage:'+gnext_page);
  gcountdown = auto_timer;
};

Monster.prototype.pressSubmitButton = function(button, message) {
  gmessage += this.composeMessage(message,Array.prototype.slice.call(arguments).slice(2));
  //GM_log('button:' + typeof(button)+' = '+ button); //DEBUG
  if (typeof(button) == 'object') { // if button is provided, do not find button, use it directly
    gnext_page = button;
  }
  else { // find button based on its value 
    //var elms =$('input[type="submit"]');
    var elms = document.getElementsByTagName('input'); //find appropriate button
    for (var i=0; i<elms.length; i++) {
      if (elms[i].type == 'submit' || elms[i].type == 'button') {
        if ((button == undefined) || (button == '')) {
          gnext_page = elms[i];
          break;
        } else if(elms[i].value == button) {
          gnext_page = elms[i];
          break;
        }
      }
    }
  }
  gcountdown = auto_timer;
};

Monster.prototype.save = function() {
  var error = this.error;
  delete this.error;
  //GM_setValue(this.type, this.toSource());
  //serialize(this.type, this);
  //debug('Saving monster:'+this.type+this.name);
  serialize(this.type+'char_stats',this.char_stats);
  serialize(this.type+'preferences',this.preferences);
  serialize(this.type+'state',this.state);
  this.error = error;
};

// Returns the clanmember that can be already fed and fed you back most recently
// or undefined if an error occured
Monster.prototype.selectClanMember = function(num) {
  if (!this.state.clan.length) return;
  var clanarr = this.state.clan;
  var clansize = clanarr.length;
  if (!num) num = 1;
  else num = num > clansize ? clansize : num; //max num of defenders
  /* Blacklisted members won't be selected */
  var last_fedback = 0;
//  var cm = new Array();
//  
//  for (var i = 0; i < clansize; i++) {
//    /* Already fed monsters */
//    if (clanarr[i].next_feed > now) continue;
//    /* Select those who fed you last */
//    if (clanarr[i].last_fedback == last_fedback) cm.push(clanarr[i]);
//    else if (clanarr[i].last_fedback > last_fedback) {
//      cm = new Array();
//      last_fedback = clanarr[i].last_fedback;
//      cm.push(clanarr[i]);
//    }
//  }
//  debug('clan members we can feed now');
//  console.info(cm); 
  //===============new method
  //sort array by last_fedback, in descending order (i.e. -1 blacklisted guys will be at end)
  // lowest first
  // <0 - b > a
  // =0 - b == a
  // >0 - b < a
//  clanarr.sort(function(a,b){
//      return (b.last_fedback - a.last_fedback);
//    });
//  this.state.clan_ids = clanarr.map(function(e){return e.id;}); //update the search array with the new sort order
  
  //OR - clone and sort the array leaving the original order unchanged - which is more expensive?
  //tests show the above is more expensive. so we'll use the below.
  clanarr = clanarr.slice(0).sort(function(a,b){
      return (b.last_fedback - a.last_fedback);
    });
  
  var cn = new Array();
  for (var i = 0; i < clansize; i++) {
    if (clanarr[i].next_feed > now) continue;
    if (clanarr[i].last_fedback >= 0) cn.push(clanarr[i]); //other than blacklisted members choose anyone
    if (cn.length >= num) break; //stop when we reach the number of desired candidates
  }
  debug('clan members we can feed now (sort method)');
  console.info(cn);
  //===============new method

  var random = Math.floor(cn.length * Math.random());
  if (num == 1) return [cn[random]];
  else return cn;
};

Monster.prototype.selectLeastClanMember = function() {
  // give the index in the Array of the least active clanMember;
  var lf = now;
  var index = undefined;
  for (var i = 0; i < this.state.clan.length; i++ ) {
    if (this.state.clan[i].last_fedback < lf) {
      lf = this.state.clan[i].last_fedback;
      index = i;
    }
  }
  return this.state.clan[index];
};

Monster.prototype.showClan = function() {
  var style = new Array();
  style.push('.list_container {background: black; margin: 10px; margin-bottom: 30px;}');
  style.push('.list_item1 { border-top: 1px dotted #bb0000; margin: 5px; padding: 5px; list-style-type: none; }'); //background-color: #eeeeee; 
  style.push('.list_item_special { border-top: 1px dotted #bb0000; margin: 5px; padding: 5px; list-style-type: none; }'); //background-color: #eebbbb; 
  style.push('.list_rank { border-right: 1px dotted #bb0000; font-weight: bold; margin-right: 5px; padding-right: 5px; }');
  style.push('.list_action_call { float: right; text-align: right; }');
  var style_el = document.createElement('style');
  style_el.type = 'text/css';
  style_el.innerHTML = style.join(''); 
  try {
    document.getElementsByTagName('head')[0].appendChild(style_el);
  } catch (ex) { 
    userLogBox.debug('Exception in Monster.ShowClan: ' + ex); //EXCEPTION
  }
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
  entry = ['<span class="list_action_call"><a href="feed-main.php?user_id=',
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

  for (var i = 0; i < this.state.clan.length; i++) {
    list_el = document.createElement('div');
    list_el.className = 'list_item1';
  
    entry[1] = this.state.clan[i].id;
    entry[3] = this.state.clan[i].name;
    if (i < 9) entry[6] = '&nbsp;' + (i + 1); else entry[6] = i + 1;
    if (this.state.clan[i].last_fedback > 100) {
      entry[9] = '<b>' + this.state.clan[i].name + '</b> fed us last time on ' + formatDate(1000 * this.state.clan[i].last_fedback,'MMM d, y');
    } else switch(this.state.clan[i].last_fedback) {
      case 0:
        entry[9] = '<b>' + this.state.clan[i].name + '</b> never fed us back.';
        break;
      case 1:
        entry[9] = '<b>' + this.state.clan[i].name + '</b> was fed, but never fed us back.';
        break;
      case -1:
        entry[9] = '<b>' + this.state.clan[i].name + '</b> is blacklisted since last feed failed (imaginary friends error).';
        break;
      default:
        entry[9] = '<b>' + this.state.clan[i].name + '</b> error: last_fedback is beyond our acceptable values';
        break;
    }
    if (this.state.clan[i].next_feed > now) {
      entry[9] = entry[9] + ' (already fed today)';
    }
    list_el.innerHTML = entry.join('');
    pnode.appendChild(list_el);
  }
};

Monster.prototype.showProfile = function() {
  //this.gotoPage('char_stats', {'nref':'i_index1'}, MSG_PROFILE);
  this.gotoPage('index', {'_fb_fromhash':'227d2ccccdd5ecdda6dc37520228a8f3'}, MSG_PROFILE);
  //http://apps.facebook.com/zombies/?_fb_fromhash=227d2ccccdd5ecdda6dc37520228a8f3
};

Monster.prototype.getValues = function() {
  var wait = 8 * 60 * 60; // 8 hours
  var statsarr = new Array();
  try {
    // fetch values from page
    var hud = $('.hud_right_container');
    if (!hud.length) throw new Error('hud not found: ' + 'app' + MONSTER_APP_IDS[current_type] + '_hud');
    var statsnames = hud.find('div.hud_char_stats div.hud_right_text');     // Energy, Fights, Feeds, Bucks, Relics, Army
    var statsvalues = hud.find('div.hud_char_stats_value div.hud_right_text');
    console.assert(statsnames.length >= 6 && statsvalues.length >= 6,'stats not of correct length current:' + statsnames.length + statsvalues.length);
    //if (statsnames.length < 6 && statsvalues.length < 6) throw new Error('stats not of correct length current:' + statsnames.length + statsvalues.length);
    console.assert(statsnames.length == statsvalues.length,'stats not of equal length: names:' + statsnames.length +' values:'+ statsvalues.length);
    //if (statsnames.length != statsvalues.length) throw new Error('stats not of equal length: names:' + statsnames.length +' values:'+ statsvalues.length);
    var cm_state = this.state;
    var cm_stats = this.char_stats;
    //var cm_stats = new Object();
    statsnames.each(function (i) {
      var tmptxt = $(this).text().trim().toLowerCase();
      var tmprslt = tmptxt.match(/(.*)\s+\(\s*(\d+).*\)/);//to deal with 'Fights (12 hrs)' and 'Energy (1:30)'
      //tmptxt = tmptxt.replace(/\(.*\)/g,'').trim(); //get rid of any bracketed figures e.g. (8 hrs) (4:30)
      if (tmprslt) {
        tmptxt = tmprslt[1].toLowerCase().trim(); //save only the name of the stat without the timer
        if (tmptxt != 'energy') {
          var mlt=1;
          if (tmprslt[0].indexOf('hrs') > -1) mlt = 3600; //multiplier depending on results of hrs or min ins timer
          else if (tmprslt[0].indexOf('min') > -1) mlt = 60;
          cm_state['next_'+tmptxt.slice(0,tmptxt.length-1)] = now + tmprslt[2].toInt()*mlt;
        }
        debug('next_'+tmptxt.slice(0,tmptxt.length-1)+':'+cm_state['next_'+tmptxt.slice(0,tmptxt.length-1)]);
        //console.info(tmprslt);//debug
      }
      //debug('statname:'+tmptxt);
      cm_stats[tmptxt] = statsvalues[i].innerHTML.toInt();
    });
    cm_stats.rituals = cm_stats[RITUALS_NAME[this.type].toLowerCase()]; // copy all blood rubies, brains, totems, relics to rituals variable
    delete cm_stats[RITUALS_NAME[this.type].toLowerCase()];
    var levelinfo = hud.find('.hud_level_box'); // level, points
    cm_stats['energy_max']  = statsvalues[0].innerHTML.split('/')[1].toInt();
    cm_stats['level'] = levelinfo.find('img').attr('src').match(/\d+/)[0].toInt();//statsarr['Level']; //Level
    cm_stats['points'] = levelinfo.find('.hud_right_text:last').text().toInt();//statsarr['Points']; //Points

    if ((cm_stats.energy == cm_stats.energy_max) && cm_state.next_quest > now) cm_state.next_quest = now;
    if ((cm_stats.energy < cm_stats.energy_max) && cm_state.next_quest < now) cm_state.next_quest = now + (cm_stats.energy_max-cm_stats.energy)*5*60; 

    
    //this.rituals = statsarr[RITUALS_NAME[this.type].toLowerCase()]; // tokens for rituals
    //this.feeds_left = statsarr[FEEDS_NAME[this.type].toLowerCase()]; //Feeds
    if (cm_stats.feeds > 0 && cm_state.next_feed > now)  cm_state.next_feed = now;
    //if (cm_state.next_feed <= now) cm_state.next_feed = feeds>0 ? now : now + wait;
    /* Correct last_feed */
    if (!cm_stats.feeds) {
      // if we still have entries that say we have last_fed earlier than 22 hours, update them to now, as we don't have any feeds available right now.
      for (var i = 0; i < 8; i++) {
        if (cm_state.last_feed[i] + 22 * 60 * 60 < now) cm_state.last_feed[i] = now;
      }
    }
    //if (this.attacks_left > 0 && cm_state.next_fight > now)  cm_state.next_fight = now;
    //if (cm_state.next_fight <= now) cm_state.next_fight = attacks>0 ? now : now + wait;
    cm_state.daily_attacks_updated = false;

    console.info(cm_stats);//DEBUG
    return true;
  } catch (ex) {
    userLogBox.debug('Exception in Monster.getValues: ' + ex); //EXCEPTION
    return false;
  }
};

Monster.prototype.updateData = function() {
  var msg = getFirstXPathResult("//input[@id='try_again_button']");
  if (msg != null) {
    //debug('error page encountered'); //DEBUG
    this.error = 'reload';
    msg.click(); //click the Try Again Button
    return false;
  }
  this.getValues();
  /* Daily attacks */
//  if (this.state.daily_attacks_updated && this.state.next_fight < now) {
//    this.attacks_left += 10 + this.char_stats.army;
//    this.state.next_fight = now + 21 * 60 * 60;
//    this.state.daily_attacks_updated = false;
//  }
  
  var errorparams = parseErrors();
  //TODO: That is not a valid item to buy!
  debug('errorparams:' + typeof(errorparams) + errorparams);
  console.info(errorparams); //DEBUG
  
  switch(current_page) {
    case 'bite':
      if (current_params.max_attacks) {
        try {
          //var msg = getElementsByClassName('message_details', 'div')[0].innerHTML;
          var msg = $('div.message_details').html();
          var wait = stringToSeconds(msg);
          this.state.daily_attacks_updated = true;
          this.error = 'daily-limit';
          this.state.next_fight = now + wait;
        } catch (ex) {
          userLogBox.debug('Exception in updateData: ' + ex); //EXCEPTION
        }
      }
      break;
      
    case 'event-history':
    case 'char_stats':
      /* Don't update our data on other people pages */
      if (current_params.user_id) break;
      var feed_list = parseFeedHistory();
      /* Update the feeding time of the monsters in our clan */
      var index;
      for (var i = 0; i < feed_list.length; i++) {
        this.clanUpdateState(feed_list[i].id,'update-time',feed_list[i].date);
//          /* Calculate new attacks */
//          //if (now - feed_list[i].date < 86400) monster.attacks_left++;
//          this.state.clan[index].last_fedback = feed_list[i].date;
//        }
      }
      // Check if items_tostock are in stock or not
      var inv = $('#app'+MONSTER_APP_IDS[current_type]+'_info_div0').find('img.item_pic');
      if (inv.length) {
        for each(var item_id in this.preferences.items_tostock.split(',')) {
          if ((item_id.length >= 4) && (!inv.filter('[src*="'+item_id+'"]').length)) {
            debug('did not find item in stock:'+item_id);
            this.state.next_buy = now; //signal to buy now, check money? i don't think so
          }
        }
      }
      break;

    case 'feed-main':
      var frds = $('img.small_avatar');
      var divtext = $('.ui_box_body_content').eq(1);
      // /Choose a victim for/.test() //when no error exists, this is what the div should say

      if (!current_params.user_id && frds.length > 1 && /can\'t be fed for another/.test(divtext.text().trim())) { //multiple user feeding mode
        debug('Found error for multiple feeding');
        //map ids to corresponding errrors, or map names to errors.
        
        //switch to single user feeding mode - so we can pinpoint the user with the error
        // add a mode switch that does either feedcycle(4) or feedcycle(1)
        // with multiple mode save info on the last 4 selected for feeding, with name and all... in a temp array
        // to update with appropriate error conditions if necessary.
        //divtext.children().each(function(){}); //parse the error message to identify it
        
      }
      /* invalid user selected for feeding */
      if (!frds.length && current_params.user_id) {
        this.error = 'imaginary-monster';
        this.clanUpdateState(current_params.user_id.toInt(),this.error);
      }
      // no break; here on purpose
    case 'feed-home':
      /* Imaginary monster */
      var clanm;
//      if (current_params.hax0r) {
//        if (clanm = this.getClanMemberById(monster.user_id)) clanm.last_fedback = -1;
//        this.error = 'imaginary-monster';
//      }
//      /* Monster full */
//      if (current_params.max_total) {
//       if (clanm = this.getClanMemberById(current_params.user_id)) {
//          clanm.next_feed = now + 22 * 60 * 60;
//        }
//        this.error = 'monster-full';
//      }
      /* Daily limit and already fed*/
      try {
        if (/out of feeds/.test($('div.main_title').text())){
          this.error = 'daily-limit';
          //if (this.state.next_feed < now) this.state.next_feed = now + 4*3600; //delay by 4 hours
          if (current_params.user_id) this.clanUpdateState(current_params.user_id.toInt(),this.error);
        }
        if(errorparams && /can\'t be fed for another/.test(errorparams.msg)){
          this.error = 'already-fed';
          this.clanUpdateState(errorparams.user_id,this.error,errorparams.wait);
        }
//          if (/feed another/.test(errorparams.msg)) {
//            this.error = 'already-fed';
//          } 
//          else if (/feed any more/.test(errorparams.msg)) {
//            this.state.next_feed = now + wait;
//            /* Correct last_feed */
//            var value = now + wait - 22 * 60 * 60;
//            for (var i = 0; i < 8; i++) {
//              if (this.state.last_feed[i] + 22 * 60 * 60 < now) this.state.last_feed[i] = value;
//            }
//            this.error = 'daily-limit';
//          }
        debug('error found:'+this.error); //DEBUG
      } catch(ex) {
        userLogBox.debug('Exception while trying to evaluate feed-main: '+ex);
      }
      /* Don't know where exactly to put this, but we need to know who we are
        * trying to feed in case of imaginary monster errors */
      //monster.user_id = current_params.user_id.toInt();
      break;
    
    case 'feed-result-redesign':
    case 'feed-result':
      var msg = unescape(current_params.fed_string)//.replace(/,/g,'');
      // escaped fed_string
      //722858413%3D17506861%2C640378523%3D9391799%2C1369341812%3D829640531%2C735409713%3D511027701%2C
      // unescaped
      //'722858413=17506861,640378523=9391799,1369341812=829640531,735409713=511027701,'
      // monster_fed=victim,...
      debug('fedstring(unescaped):'+msg);
      for each(var fedids in msg.split(',')) {
        if (fedids.length > 4) {
          current_params.user_id = fedids.split('=')[0].toInt();
          //debug(' fed:'+current_params.user_id);
          this.clanUpdateState(current_params.user_id,'feed-success');
        }
      }
      //handling multiple user error on feeding
      if (errorparams && errorparams.msgarr && errorparams.msgarr.length) {
        for each(var obj in errorparams.msgarr) {
          if (/can\'t be fed /.test(obj.msg)) { //can't be fed for now!
            this.clanUpdateState(obj.user_id,'monster-full');
          }
        }
      }
      //handle single errors
      else if(errorparams && /is full/.test(errorparams.msg)){
        this.error = 'monster-full';
        this.clanUpdateState(errorparams.user_id,this.error);
      }
      break;

    case 'fighting-main-redesign':
    case 'fighting-confirm':
    case 'fighting-main':
      if (errorparams && /You can fight more people in/i.test(errorparams.msg)) {
        this.error = 'attack-limit';
        this.clanUpdateState(errorparams.user_id,this.error,errorparams.wait);
      }
      break;

    case 'fighting-result':
//      /* Gather statistics */
//      var stats = deserialize('stats');
//      var percent = stats.next_fight;
//      if (!stats['p' + percent]) {
//        stats['p' + percent] = new Object();
//        stats['p' + percent].won = 0;
//        stats['p' + percent].total = 0;
//        stats['p' + percent].points = 0;
//      }
//      stats['p' + percent].total += parseInt(current_params.n, 10);
//      stats['p' + percent].won += parseInt(current_params.aw, 10);
//      /* If we used an item */
//      var points;
//      if (current_params.ai != '') points = parseInt(current_params.ap, 10) / 2;
//      else points = parseInt(current_params.ap, 10);
//      stats['p' + percent].points = points / parseInt(current_params.aw, 10);
//      serialize('stats', stats);
      break; 

    case 'index': //?_fb_fromhash=f8ab5b8a0954ac07b22ee0d688efd491
      //if (current_params._fb_fromhash)
      /* Don't update our data on other people pages */
      if (current_params.user_id) break;
      break;

    case 'store-main':
      /* Check if we bought something */
      //parse any buying results
      if (current_params.buy) {
        try {
          // remove item from list if it still exists since we just bought it
          this.state.items_tobuy.remove(current_params.item_type_id.toInt());
        } catch(ex) {
          userLogBox.debug('Exception in updateData while parsing buy results: ' + ex); //EXCEPTION
        }
      }
      break;

    default:
      break;
  }
  if(this.error) userLogBox.debug('Current Monster error:' + this.error);

  //this.parseNotifications(); //not used right now
};

Monster.prototype.parseNotifications = function() {
  //get list of notifications
  var notificationText = document.evaluate("//div[@id='presence_notifications_content']//div[@class='body']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  // and their times
  var notificationTime = document.evaluate("//div[@id='presence_notifications_content']//div[@class='body']/span[@class='time']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  // regular expresssions to match the correct notifications only
  var reText = /(fed|threw) one of their friends to your (.*), which earned you an additional attack today!/;
  //var reText = /attacked your (.*)\![ ]/; //for testing only as my notifications at that time didn't have any feedback info
  var reTime = /([0-9]+|a|an) (hours?|minutes?|seconds?) ago/;
  //GM_log(notificationText.snapshotLength); //DEBUG
  //GM_log(notificationTime.snapshotLength); //DEBUG
  var matches;
  var timeAgo; //timestamp of event 
  for (var i = 0; i < notificationText.snapshotLength; i++) {
    matches = notificationText.snapshotItem(i).innerHTML.match(reText);
    // check if correct notification type
    // check name of monster fed...we can determine if it's the current type or not
    // and update the corresponding monster
    if (matches != undefined && matches.length > 0) {
      
      //check if monster fed is same as ours
      if (this.name == matches[2].toLowerCase()) {
        //take appropriate action
      }
      
      //check corresponding time
      matches = notificationTime.snapshotItem(i).innerHTML.match(reTime);
      if (matches != undefined && matches.length > 0) {
        
        // convert to timestamp
        timeAgo = now;
        //GM_log('now ts: ' + timeAgo); //DEBUG
        // replace text with a number
        if (matches[1] == 'a' || matches[1] == 'an' ) {
          matches[1] = 1; 
        }
        switch(matches[2]) {
          case 'hour':
          case 'hours':
            timeAgo -= matches[1]*60*60;
            break;
          case 'minute':
          case 'minutes':
            timeAgo -= matches[1]*60;
            break;
          case 'second':
          case 'seconds':
            timeAgo -= matches[1];
            break;
          default:
            break;
        }
        //GM_log('diff  : ' + matches[1]); //DEBUG
        //GM_log('ago ts: ' + timeAgo); //DEBUG
      }
      else {
        timeAgo = 0;
      }
      // I have tested the above code and it works, timeAgo is the timestamp (in seconds) of when the action was taken
      // approximately, it's 0 if not found.
      
      //Piotr Comment
      //You can just add 1 to attacks_left whenever someone fed you and time_fed > last_fedback and update last_fedback.
      // iam not saving someone i.e. user id yet... do you want me save that info? or something else?
      // PIOTR CODE HERE
    }
  }
};

/* Manage feed clan */
function manageFeedClan_feedResult() {
  if (current_page != 'feed-result-redesign') return;
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
  var id;
  var name;
  var divs = $('div.ui_table_body_border');//getElementsByClassName("small_avatar_user_name","div");
  //divs.eq(1).toggleClass('friend_selected'); //doesn't work.. must click div somehow...
  
  //location.href = "javascript:void((function(){" + "a17801732384_update_friends_selection(854010400);" + "})());"; //this works!!!
  //location.href = "javascript:void((function(){a" + MONSTER_APP_IDS[current_type] + "_update_friends_selection("+854010400+");" + "})());"; //this works!!!
  //set to csv ids of who we want to feed.... max 4
  //$('#app'+MONSTER_APP_IDS[current_type]+'_feed_friends').val(); //have to enable the button for this to work
  var nr_added = 0;
  for (var i = 0; i < divs.length; i++) {
    if (nr_added >= monster.char_stats.feeds) break;
    name = divs.eq(i).find('tr:first').text().trim().split(' ')[0];
    /* Name */
//    url = divs[i].getElementsByTagName('a')[0];
//    name = url.innerHTML;
//    name = name.split(' ')[0];
    /* Id */
    id = divs.eq(i).attr('id').match(/_(\d+)/)[1].toInt();//parseInt(url.match(re)[1],10);
    if (!monster.getClanMemberById(id)) { 
      var clanm = new GenericMonster(monster.type, id);
      clanm.name = name;  
      // Force adding the clan member, even if the friend never fed you back.
      if (monster.addOrReplaceClanMember(clanm, true)) nr_added++;
      userLogBox.debug('forced add to clan:'+name+id+' num:'+nr_added);
    }
  }
}

function manageFeedClan_feedHistory() {
  if (current_page != 'event-history' && current_page != 'char_stats') return;
  if (current_params.zombie_id || current_params.user_id) return;
  //GM_log("manageFeedClan_feedHistory: " + this.name); //DEBUG
  
  var list = parseFeedHistory();
  var displayed_ids = new Array();
  for (var i = 0; i < list.length; i++) {
    /* Already displayed or already displayed MAX_CLAN_DIM members */
    if (displayed_ids.length >= CLAN_MAX_DIM || displayed_ids.indexOf(list[i].id) != -1) {
      //list[i].div.parentNode.removeChild(list[i].div);
      list[i].div.remove(); //jQuery version
      continue;
    }
    /* New monster */
    if (monster.state.clan_ids.indexOf(list[i].id) == -1) {
      var clanm = new GenericMonster(current_type);
      clanm.name = list[i].name;
      clanm.id = list[i].id;
      clanm.last_fedback = list[i].date;
      /* Fill the clan and then add only those who fed you
        * in the tolerance time frame. */
      if (monster.state.clan.length < CLAN_MAX_DIM || now - clanm.last_fedback < TOLERANCE_TIME * 24 * 60 * 60) monster.addOrReplaceClanMember(clanm);
    }
    displayed_ids.push(list[i].id);
  }
}

function manageFeedClan_exec() {
  if (!monster.preferences.enabled) return false;
  switch(current_page) {
    case 'char_stats':
    case 'event-history':
      if (monster.state.check_history <= now) {
        monster.state.check_history= now + 22 * 60 * 60;
        manageFeedClan_feedHistory();
      }
      monster.showClan(); 
      break;
    case 'feed-home':
      if (!current_params.id0) manageFeedClan_addFriends();
      monster.showClan();
      break;
    case 'feed-result-redesign':
      manageFeedClan_feedResult();
      break;
    default:
      break;
  }
  if (monster.state.check_history < now && current_page != 'char_stats') {
    monster.gotoPage('char_stats', {'start_tab':4,'sub_tab':2,'nref':'i_event-history1'} , MSG_FEED_HISTORY);
    return true;
  }
  return false;
}

function manageFeedClan_fallback() {
  var first_time = Infinity;//now + 22 * 60 * 60;
  var first_type = 0;
  var sw_monster;
  for (var i = 0; i < 4; i++) {
    sw_monster = allmonsters[i];
    if (sw_monster.preferences.enabled && sw_monster.state.check_history < first_time) {
      first_time = sw_monster.state.check_history;
      first_type = i;
    }
  }
  if (first_time == Infinity) return false;
  return [first_time, first_type, 'check feed history'];
}

function feedCycle_feedNext(num) {
  if (!num) num = 1;

  if (!monster.char_stats.feeds) {
    //gmessage = MSG_ERROR_FEEDS_LEFT;
    //monster.state.next_feed = now + 4 * 60 * 60;
    return false;
  }
  var clanm = monster.selectClanMember(num);
  debug('clanm length:'+clanm.length);
  if (!clanm.length) {
    if (current_page != 'feed-home') {
      gmessage = MSG_ERROR_CLAN_TOO_SMALL;
      monster.gotoPage('feed-home', null, MSG_FEED_FRIENDS);
      return true;
    }
  } else if (clanm.length == 1) {
    debug('feedCycle_feedNext clanm:' + clanm[0].id);
    monster.feed(clanm[0]);
    return true;
  }
  else { //feed multiple guys
    //debug('feedCycle_feedNext clanm:' + clanm[0].id);
    //monster.feed(clanm[0]); //do this for now, change it later
    //return true;
    var pageparams = new Object();
    for (var i=0; i < clanm.length; i++) {
      pageparams['id'+i] = clanm[i].id;
    }
    monster.gotoPage('feed-home', pageparams, MSG_FEED_MANY);
    //return clanm;
    return true;
  }
}

function feedCycle_exec() {
  if (monster.canDo('autofeed')) {
    switch(current_page) {
      case 'feed-home':
        //if (monster.error && current_params.user_id) monster.clanUpdateState(current_params.user_id.toInt(),monster.error); //no need taken care of in updateData
//        var tofeed = feedCycle_feedNext(4);
//        debug('monsters we can feed');
//        for each(var cm in tofeed) {
//          console.info(cm);
//          // find id of member on page
//          // select member
//        }
        var clickbtn = false;
        var ids=[];
        for (var i=0; i < 4; i++) {
          if (current_params['id'+i]) {
            //use location hack to call the proper function on the page to select the friend. this works!!!
            //location.href = "javascript:void((function(){a" + MONSTER_APP_IDS[current_type] + "_update_friends_selection("+current_params['id'+i]+");" + "})());"; 
            ids.push(current_params['id'+i]);
            clickbtn = true;
          }
        }
        if (clickbtn) {
          clickbtn = $('#app' + MONSTER_APP_IDS[current_type] + '_feed_submit_button');
          clickbtn.attr('disabled',''); //enable the button
          $('#app' + MONSTER_APP_IDS[current_type] + '_feed_friends').val(ids.join(',')); //ensure that all the ids we want will show up
          debug('feeding multiple:'+ids.join(','));
          //save these ids so that we can diagnose errors. TODO
          if (clickbtn.length) {
            monster.pressSubmitButton(clickbtn[0], MSG_FEED_MANY + ' ('+i+')');
            return true;
          }
        }
   //location.href = "javascript:void((function(){" + "a17801732384_update_friends_selection(854010400);" + "})());"; //this works!!!
  //set to csv ids of who we want to feed.... max 4
  //$('#app'+MONSTER_APP_IDS[current_type]+'_feed_friends').val(); //have to enable the button for this to work

        // hit submit button
        break;
      case 'feed-main':
        //for multiple users the behavior hear will change, we'll have to keep clicking on victims until 
        // the topmost victim doesn't change.
        //if (monster.error && current_params.user_id) monster.clanUpdateState(current_params.user_id.toInt(),monster.error);
        //if (!monster.error) {
          var victim = $('div.feed_list_item');
          if (!victim.length) {
            gmessage = MSG_ERROR_VICTIM_FRIENDS;
            //monster.state.next_feed = now + 4 * 60 * 60;
          } else {
            var frds = $('.friend_unselected');
            var frdnames = ' <br /> ';
            var vnames = '';
            for (var i = 0; i < (frds.length + 1); i++) {
              frdnames += $('.friend_selected').find('td:first').text().trim() + ',';
              vnames += victim.eq(i).find('label').text().trim() + ',';
              nHtml.Click(victim[i]);
              //nHtml.ClickTimeout(victim[i],100);
              //vnames += victim.eq(i).find('img').attr('title').split(' ')[0]; // or alt
            }
            //OR
            //while($('.friend_selected').length) {
            //}
            //nHtml.Click(victim[0]);
            /* Retrieving victim's name */
            //name = victim.eq(0).find('img').attr('title'); // or alt
            //name = name.split(' ')[0];
            /* Retrieving monster's name */
            var clanm 
            if (current_params.user_id) clanm = monster.getClanMemberById(current_params.user_id.toInt());
            var btn = $('input[type="submit"][fbuid]');
            if (btn.length) btn = btn[0];
            else btn = '';
            if (clanm != undefined) monster.pressSubmitButton(btn, MSG_FEED_STEP2, vnames, clanm.name, monster.name);
            else if (frds.length >= 1) monster.pressSubmitButton(btn, MSG_FEED_STEP2, vnames, frdnames, monster.name);
            else monster.pressSubmitButton(btn, MSG_FEED_STEP2, name, 'Not a clan member', monster.name);
            return true;
          }
        //}
        // no break; here on purpose
      default:
        break;
    }
    debug('next_feed:'+monster.state.next_feed+' <now:'+(monster.state.next_feed < now));
    var feednum = 1;
    if (GM_config.get('multiplefeed')) feednum = 4;
    if (feedCycle_feedNext(feednum)) return true;
    else if (monster.state.next_feed < now) monster.state.next_feed = now + 4*3600;
  }
//  /* try to switch monster */
//  var sw_monster;
//  for (var i = 0; i < 4; i++) {
//    sw_monster = allmonsters[i];
//    if (sw_monster.canDo('autofeed') && (sw_monster.state.next_feed < now || sw_monster.char_stats.feeds)) {
//      sw_monster.showProfile();
//      return true;
//    }
//  }
  return false;
}

function feedCycle_fallback() {
  var first_time = Infinity; //now + 22 * 60 * 60;
  var first_type = 0;
  var sw_monster;
  for (var i = 0; i < 4; i++) {
    sw_monster = allmonsters[i];
    if (sw_monster.canDo('autofeed') && (sw_monster.state.next_feed < first_time || sw_monster.char_stats.feeds)) {
      first_time = sw_monster.state.next_feed;
      first_type = i;
    }
  }
  if (first_time == Infinity) return false;
  return [first_time, first_type, 'feed'];
}

function attackCycle_exec() {
  if (monster.canDo('autofight') && (monster.char_stats.fights > 0)) {
    switch(current_page) {
      case 'fighting-main-redesign':
      case 'fighting-main':
      case 'fighting-confirm':
      //case 'fighting-result': //limited choice though... randomized... 
      if (!monster.error) {
        var defender = selectDefender();
        if (!defender) {
          alert("FIXME: you don't have friends playing this game ?");
          return false;
        }
        else {
          //monster.attack(defender);
          //return true;
      
      
          /* Set the number of attacks */
          var num_attacks = $('select[name="num_attacks"]');
          if (num_attacks.length) {
            num_attacks.val(num_attacks.attr('options').length);
            num_attacks = num_attacks.val();
            //num_attacks.selectedIndex = idx;
            //num_attacks = num_attacks.options[idx].innerHTML;
          }
          else num_attacks = '?';
          /* Set the item to use */
          var item_used = $('select[name="item_used"]');
          if (monster.preferences.useweapon != 'None'){
            var item_used_options = $('select[name="item_used"] option');
            //item_used_options.each(function(){console.info(this.innerHTML);});
            if (item_used.length) {
              //var opt = item_used.attr('options')[0].innerHTML;
              var opt = 'None';
              switch(monster.preferences.useweapon) {
                case 'None':
                  opt = 'None';
                  break;
                case 'Auto': //choose the item with maximum use or the first item
                  //item_used.val(item_used.attr('options')[0].innerHTML);
                  opt = item_used.attr('options')[0].innerHTML;
                  var max_uses = 5;
                  item_used_options.each(function(){
                    this.innerHTML.replace(/\((\d+).*\)/,'');
                      //item_used.val(opt.innerHTML);
                    var uses = RegExp.$1.toInt();//this.innerHTML.match(/\((\d+).*\)/)[1];
                    if (uses > max_uses){
                      opt = this.value;
                      max_uses = uses;
                      //return false;//break;
                    }
                    //console.info(this.innerHTML);
                  });                    
                  break;
                case 'Boom Stick':
                default:
                  //for (opt in item_used.attr('options')){
                  item_used_options.each(function(){
                    //debug('option name'+this.innerHTML.replace(/\((\d+).*\)/,''));
                    if (monster.preferences.useweapon == $.trim(this.innerHTML.replace(/\((\d+).*\)/,''))) {
                      //item_used.val(opt.innerHTML);
                      //var uses = RegExp.$1.toInt();//this.innerHTML.match(/\((\d+).*\)/)[1];
                      //if (uses > 5)
                      opt = this.value;
                      return false;//break;
                    }
                    //console.info(this.innerHTML);
                  }); 
                  if (opt == 'None') userLogBox.add('Cannot find item to use for attack:'+monster.preferences.useweapon);                   
                  //}
                  //$jq.trim(item_used.attr('options')[0].innerHTML.replace(/\(.*\)/,'')) == 'Boom Stick'
                  break;
              }
              item_used.val(opt);
              //item_used = 'with a ' + $.trim(item_used.attr('options')[0].innerHTML);//item_used.val();
              item_used = 'with a ' + item_used.find(':selected').text().trim();
              //item_used = 'with a ' + opt;
            }
            else item_used = '';
          }
                //item_used.selectedIndex = idx;
                //item_used = item_used.options[idx].innerHTML;
                //item_used.val(item_used.attr('options').length)
                //item_used.find(':selected').val();
                //item_used = 'with a ' + item_used.find(':selected').text().trim();//item_used.val();
          if (item_used == 'with a None') item_used = '';
          else item_used = '<br />' + item_used;
          //use the first fight link as that is the monster we selected
          //monster.pressSubmitButton($('a.action_image_link')[0], MSG_ATTACK_STEP2, num_attacks, item_used);
          //monster.pressSubmitButton(defender.link, MSG_ATTACK_STEP2, num_attacks, item_used);
          monster.pressSubmitButton(defender.link, MSG_ATTACK_COMBINED, defender.name, MONSTER_TYPE[defender.type], num_attacks, item_used);
          return true;
        }
      }
      // no break; here on purpose
      case 'fighting-result': //limited choice though... randomized... 
      //stats
      var hdr = $('div.main_header');
      if (hdr.length) {
        //var won = hdr.next().text().trim().match(/(\d+)\s+of\s+(\d+)\s+times.*(\d+)\s+points.*(\d+)/);
        var nmbrs = hdr.next().text().trim().match(/(\d+)\s+of\s+(\d+)\s+times\s+.*\s+(\d+)\s+points\s+.*\s+(\d+)/); //won 1, total 2, points 3, bucks 4
        //var nmbrs = hdr.next().text().trim().match(/(\d+)\s+of\s+(\d+)\s+times(\s+.*\s+(\d+)\s+points\s+.*\s+(\d+))?/); //won 1, total 2, (points 4, bucks 5) if 3 exists
        debug('fight results:');
        console.info(nmbrs);
      }
      var defender = selectDefender();
      // no break; here on purpose      
      default:
      /* daily-limit */
      if (current_page == 'bite' && monster.error == 'daily-limit') return false;
      var defender_type = current_type + Math.floor(1 + 3 * Math.random());
      defender_type = defender_type % 4;
      monster.gotoPage('fighting-main', {'type': ATTACK_TYPE[defender_type]}, MSG_ATTACK, MONSTER_TYPE[NR_MONSTERS + defender_type]);
      return true;
    }
  }
//  /* Switch monster */
//  var sw_monster;
//  for (var i = 0; i < 4; i++) {
//    sw_monster = allmonsters[i];
////      if (sw_monster.state.daily_attacks_updated && sw_monster.state.next_fight < now) {
////        sw_monster.char_stats.fights += 10 + sw_monster.char_stats.army;
////        sw_monster.state.next_fight = now + 21 * 60 * 60;
////        sw_monster.state.daily_attacks_updated = false;
////      }
//    if (sw_monster.canDo('autofight')) {
//      sw_monster.showProfile();
//      return true;
//    } else if (!sw_monster.state.daily_attacks_updated) {
//      sw_monster.gotoPage('bite', {'max_attacks': 1}, MSG_ATTACK_CHECK);
//      return true;
//    }
//  }
  return false;
}

function attackCycle_fallback() {
  var first_time = Infinity; //now + 22 * 60 * 60;
  var first_type = 0;
  var sw_monster;
  for (var i = 0; i < 4; i++) {
    sw_monster = allmonsters[i];
    if (sw_monster.canDo('autofight') && (sw_monster.state.next_fight < first_time || sw_monster.char_stats.fights > 0)) {
      first_time = sw_monster.state.next_fight;
      first_type = i;
    }
  }
  if (first_time == Infinity) return false;
  return [first_time, first_type, 'attack'];
}

function buyItem(id_tobuy) {
  //var $ = $jq; //for firebug only
  var allitems = $('input[type="submit"][value*="Buy"]');// all items we can buy on page
  var allitem_ids = $('input[type="hidden"][name="item_type_id"]'); //all item ids
  var alltabs = $('table.ui_tab_table td');
  var allcontents = $('div.category_content');
  console.assert(alltabs.length == allcontents.length) // 7
  
  //find id on page
  var item_tobuy = $('input[type="hidden"][name="item_type_id"][value="'+id_tobuy+'"]');
  debug('id:'+id_tobuy+' item length:'+item_tobuy.length);
  //item_tobuy.val(); //item name
  if (item_tobuy.length) {
    var item_info = item_tobuy.parents('.item_details').find('span'); //[span.item_name, span.item_owned, span.emphasis, span.emphasis, span.emphasis]
    var numowned = item_info.filter('.item_owned').text().trim().match(/\d+/);
    if (numowned) numowned=numowned[0].toInt();
    else numowned = 0;
    if (numowned) return 'already-owned'; //we already own item, no need to buy
  // find price, do we have enough money?
    var price =item_info.filter('.emphasis').text().trim().match(/(\d+(,\d+)*)/g)[0].toInt();
    if (monster.char_stats.bucks < price) return 'not-enoughbucks'; 
  // activate the section if necessary
    if (item_tobuy.parent().is(':hidden')) {
      //item_tobuy.parents('div.category_content'); //parent section
      var section_num = item_tobuy.parents('div.category_content').attr('id').substr(-1).toInt();
      if (section_num == 1) section_num++;// special case handling for weapons & armour swap
      else if (section_num == 2) section_num--;
      debug('activating tab:'+section_num);
      nHtml.Click(alltabs.eq(section_num).find('a')[0]); //make section visible
    }
    item_tobuy = item_tobuy.nextAll('input[type="submit"]'); // button to click to buy item
    console.info('iteminfo:'+item_tobuy.val()+' price:'+price+' owned:'+numowned);//debug
    //return false; //temporarily disabled
  
  // buy it if we have enough money & don't already own it
      //monster.state.items_tobuy.pop(); //delete item
      monster.pressSubmitButton(item_tobuy[0], MSG_BUY_ITEM, item_tobuy.val().replace(/buy\s*/ig,''),price);
      return 'success';
    //else  monster.state.next_buy = now + 2*3600; //postpone by 22 hours
    //else ; //try next item in list;
  }
  else {
    //item_id=1008&nref=i_quests-home1
    return 'no-itemfound';
  }
}

function buyCycle_exec() {
  if (monster.canDo('autobuy') && monster.state.next_buy <= now) {
    switch(current_page) {
      case 'store-main':
        //parse any buying results
        if (current_params.buy) {
          try {
            // remove item from list if it still exists since we just bought it
            monster.state.items_tobuy.remove(current_params.item_type_id.toInt());
          } catch(ex) {
            userLogBox.debug('Exception in buyCycle_exec: ' + ex); //EXCEPTION
          }
        }
        var ids_tostock = monster.preferences.items_tostock.split(',');
        console.info(ids_tostock);//debug
        if (monster.preferences.items_tostock.length) {
          for each(var id_tobuy in ids_tostock) {
            if (id_tobuy.length >= 4) {// is a valid id greater than equal to 4 digits
              debug('tostock:'+id_tobuy);
              switch(buyItem(id_tobuy)){
                case 'success':
                  return true;
                  break;
                case 'already-owned':
                  //continue to check the next item
                  break;
                case 'not-enoughbucks':
                  //hmm... should do something about that here
                  break;
                case 'no-itemfound':
                  //remove from to stock list?
                  userLogBox.add('Item not found, deleting from to stock list:'+id_tobuy);
                  monster.preferences.items_tostock = monster.preferences.items_tostock.replace(id_tobuy,'').replace(',,',',');
                  break;
                default:
                  debug('unknown return code from buyItem():');
                  return false;
                  break;
              }
            }
          }
        }
        console.info(monster.state.items_tobuy);
        if (monster.preferences.acquireitems) {
          while(monster.state.items_tobuy.length){
            var id_tobuy = monster.state.items_tobuy[monster.state.items_tobuy.length-1]; //get last item
            //var id_tobuy = monster.state.items_tobuy.pop(); //get last item
            if (id_tobuy == 8001) { //ignore bite club pass
              monster.state.items_tobuy.pop(); //delete item
              continue; //go to next item
            }
            switch(buyItem(id_tobuy)){
              case 'success':
                monster.state.items_tobuy.pop(); //delete item
                return true;
                break;
              case 'already-owned':
                gmessage = 'Not enough money to buy this item(id:'+id_tobuy+') or already owned, trying next item <br />';
                userLogBox.add(gmessage);
                monster.state.items_tobuy.pop(); //delete item
                //return buyCycle_exec(); //recursive call
                break;
              case 'not-enoughbucks':
                gmessage = 'Not enough money to buy this item(id:'+id_tobuy+') or already owned, trying next item <br />';
                userLogBox.add(gmessage);
                monster.state.items_tobuy.pop(); //delete item
                //return buyCycle_exec(); //recursive call
                break;
              case 'no-itemfound':
//                 if (!current_params.item_id || (current_params.item_id.toInt() != id_tobuy)){
//                   gmessage = 'Cannot find this item(id:'+id_tobuy+'), going to specific buy page ';
//                   userLogBox.add(gmessage);
//                   monster.gotoPage('store-main', {'item_id':id_tobuy,'nref':'i_quests-home1'}, MSG_BUY_ITEM, id_tobuy, '???');
//                   return true;
//                 }
//                 else {
                  gmessage = 'Cannot find this item(id:'+id_tobuy+'), trying next item <br />';
                  userLogBox.add(gmessage);
                  monster.state.items_tobuy.pop(); //delete item
                  //return buyCycle_exec();//recursive call
//                   }
                break;
              default:
                debug('unknown return code from buyItem():');
                return false;
                break;
            }
          }
        }
        //if cannot stock item or buy quest items schedule next check after 1 day
        monster.state.next_buy = now+22*3600;
        return false;
        break;
      default:
        //minimum amount required to make purchases
        if (monster.char_stats.bucks > 150 && (
            (monster.state.items_tobuy && (monster.state.items_tobuy.length && monster.preferences.acquireitems))
            || (monster.preferences.items_tostock.length >= 4)))
        { //acquireitems should be removed later
          monster.gotoPage('store-main', null, MSG_BUY);
          return true;
        } 
        else {
          monster.state.next_buy = now+22*3600;
          return false;
        }
    }
  }
  return false;
}

function buyCycle_fallback() {
  //return false;
  /* Try switching */
    var first_time = Infinity; //now + 22 * 60 * 60;
    var first_type = 0;
    var sw_monster;
    for (var i = 0; i < 4; i++) {
      sw_monster = allmonsters[i];
       if (sw_monster.canDo('autobuy') && sw_monster.state.next_buy < first_time) {
        first_time = sw_monster.state.next_buy;
        first_type = i;
      }
    }
    if (first_time == Infinity) return false;
    return [first_time, first_type, 'buy'];
//  var sw_monster;
//  for (var i = 0; i < 4; i++) {
//    sw_monster = allmonsters[i];
//    if (sw_monster.canDo('autobuy') && sw_monster.state.next_buy < now) {
//      sw_monster.showProfile();
//      return true;
//    }
//  }
}

function questCycle_exec() {
  // energy cycle, 5 mins per point, 10points = 50 minutes to get to energ_full status.
  // so next action should be + 50 minutes after energy = 0
  if (monster.canDo('autoquest') && monster.char_stats.energy) {
    switch(current_page) {
      case 'quests-home':
        // find list of items we need to buy for autobuy
        var item_missing = $('a .item_missing'); //all missing items that we can buy.
        debug('finding missing items:'+monster.preferences.acquireitems);
        //console.info(item_missing);
        if (item_missing.length && monster.preferences.acquireitems) { //monster.canDo('autobuy')) {
          var item_ids_tobuy = new Array();
          item_missing.each(function() {
            //console.info(this);//DEBUG
            var idvalue = $(this).attr('src').match(/\d+/)[0].toInt();
            if (idvalue != 8001 && idvalue != 1008) //ignore bite club pass, wooden stake
            //4006, 4005
              item_ids_tobuy.pushUnique(idvalue); //item_id
          });
          monster.state.items_tobuy = item_ids_tobuy.sort(); //$.unique(item_ids_tobuy);//item_ids_tobuy.unique();
          console.info(monster.state.items_tobuy);
          if (monster.state.items_tobuy.length) monster.state.next_buy = now;
        }

        // get list of available & doable quests
        var quests=$('div.missionImg').nextAll('a');
        //chec if have to repeat a quest over and over, otherwise
        if (monster.preferences.repeatquest > 100){
          var pageparams = new Object();
          pageparams['quest'] = monster.preferences.repeatquest; //quest number to repeat
          pageparams['nref'] = 'i_quests-home1';
          monster.gotoPage('quests-start',pageparams,MSG_QUEST_REPEAT +': '+monster.preferences.repeatquest);
          return true;
        }
        // choose last of the bunch
        else if (quests.length) {
          quests = quests.eq(quests.length-1);
          //get items required list
          var items_reqd = quests.parent().nextAll().find('.quest_requirements .item_pic');
          //ignore bite club quests
          if (items_reqd.length && items_reqd.attr('src').match(/\d+/)[0].toInt() == 8001) {
            debug('found city of eternal quest, ignoring it');
            return false;
          }
          //var quest_name = quests.prev().attr('alt');
          quest_name = quests.parent().next().find('.quest_title').text().trim();
          monster.gotoPage(quests.attr('href'), null, MSG_QUEST +': '+quest_name);
          //monster.pressSubmitButton(quests[0], MSG_QUEST +': ' +quest_name);
          return true;
        }
        else { // no quests are doable right now
          return false;
        }
        break;
      case 'quests-result':
        var quest_name = $('div.h1').text().trim();
        var doagain = $('.ui_button_mid').parent('a');
        
        if (doagain.length) {
          if (/do quest again/i.test(doagain.text().trim())) {
            debug(doagain.text().trim());
            monster.gotoPage(doagain.attr('href'), null, MSG_QUEST_REPEAT +': '+quest_name.split('\n')[0]);
            //monster.pressSubmitButton(doagain[0], MSG_QUEST_REPEAT +': '+quest_name);
            return true;
          }
          else if (/start quest/i.test(doagain.text().trim())) {
            //Check if it's COE quest, skip it and go to main quest page if it is.
            //get items required list
            var items_reqd = doagain.parent().nextAll().find('.item_pic');
            //ignore bite club quests
            if (items_reqd.length && items_reqd.attr('src').match(/\d+/)[0].toInt() == 8001) {
              debug('found city of eternal quest, ignoring it');
              return false;
            }
            quest_name = quest_name.split('\n');
            quest_name = $.trim(quest_name[quest_name.length-1]);
            //monster.gotoPage('quests-home',  {'list':1,'nref':'i_index1'}, MSG_QUEST_NEW);
            monster.gotoPage(doagain.attr('href'), null, MSG_QUEST +': '+quest_name);
            //monster.pressSubmitButton(doagain[0], MSG_QUEST_REPEAT +': '+quest_name);
            return true;
          }
          else { //out of energy - switch monsters 
            monster.state.next_quest = now + (monster.char_stats.energy_max - monster.char_stats.energy)*5*60; //50 minutes from now
          }
        }
        break;
      case 'quests-start':
        break;
      default: //base case to check if this module should execute
        if (monster.state.next_quest <= now && monster.char_stats.energy) {
          monster.gotoPage('quests-home', {'list':1,'nref':'i_index1'}, MSG_QUEST); //http://apps.facebook.com/zombies/quests-home.php?list=1&nref=i_index1
          return true;
        }
    }
//    /* Try switching */
//    //GM_log('Trying switching');
//    var sw_monster;
//    for (var i = 0; i < 4; i++) {
//      sw_monster = allmonsters[i];
//      if (sw_monster.state.next_quest < now) {
//        sw_monster.showProfile();
//        return true;
//      }
//    }
  }
  return false;
}

function questCycle_fallback() {
  // if energy is zero try switching monsters
    var first_time = Infinity; //now + 22 * 60 * 60;
    var first_type = 0;
    var sw_monster;
    for (var i = 0; i < 4; i++) {
      sw_monster = allmonsters[i];
      if (sw_monster.canDo('autoquest') && sw_monster.state.next_quest < first_time) {
        first_time = sw_monster.state.next_quest;
        first_type = i;
      }
    }
    if (first_time == Infinity) return false;
    return [first_time, first_type, 'quest'];
}

function parseErrors(strmsg) {
  var tmp = new Object();
  var errormessage = $('.error');
  if (current_params.errors && current_params.errors.length) tmp.msg = unescape(unescape(current_params.errors)).replace(/\+/g,' ');
    
  if (errormessage.length) tmp.msg = errormessage.text();
    
  if (strmsg) tmp.msg = strmsg; //override default behavior and check string for error info
  
  if (/,/.test(tmp.msg)) {
    tmp.msgarr = new Array();
    for each(var errmsg in tmp.msg.split(',')) {
      if (errmsg.length > 3) {
        errmsg = errmsg.split('|');
        //push object into array
        tmp.msgarr.push( {
          user_id:errmsg[0].toInt(),
          msg:errmsg[1]
          });
        //debug(' fed:'+current_params.user_id);
      }
    }
  }
  debug('Error array');
  console.dir(tmp.msgarr);
  
  if (tmp.msg) {
    tmp.wait = stringToSeconds(tmp.msg);
    tmp.user_id = tmp.msg.match(/\d+/);//msg.split('|')[0];
    if (tmp.user_id) tmp.user_id=tmp.user_id[0].toInt();
    else tmp.user_id = 0;
    debug('error:'+tmp.msg+' wait:'+tmp.wait+' id:'+tmp.user_id);
    return tmp;
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
  current_page = current_page.match(/(.*)\.php/);
  //this is to deal with new fangled urls : http://apps.facebook.com/vampires/?&_fb_fromhash=ef93c004c572852cd6eb4a675d173822
  //21.58 2/10/2009
  if (current_page != null) current_page = current_page[1];
  else current_page = 'index';
  debug('current_page '+current_page); //DEBUG

  /* Add all parameters as properties of current_params */
  if (tmp = tmp.split('?')[1]) {
    tmp = tmp.split('&');
    for (var i = 0; i < tmp.length; i++) {
      var pair = tmp[i].split('=');
      current_params[pair[0]] = pair[1];
        if (pair[1] == undefined) current_params[pair[0]] = true;
    }
    if(GM_DEBUG) console.info(current_params); //DEBUG
  }
}

function insertMenu() {
  var menuCode = []; // temporary array to store strings for concatenation
  var append_elm, elm; // DOM elements we will append menus to
  var linkbar_elm;
  linkbar_elm = getFirstXPathResult("//div[@id='content']//ul"); // Contains <li> with <a>, My Monster
  linkbar_elm = document.getElementById('app'+MONSTER_APP_IDS[current_type]+'_header_tabs');

// ================ Setup Statistics ==================
  var next_attack = monster.state.next_fight;
  var next_feed = monster.state.next_feed;
  var next_quest = monster.state.next_quest;
  var next_attack_type = current_type;
  var next_feed_type = current_type;
  var next_quest_type = current_type;
  /*
  var nexttime = {'fight':0,'feed':0,'quest':0};
  var nexttype = {'fight':0,'feed':0,'quest':0};
  var header
  for (var loopmonster in allmonsters) {
    for (var mode in nexttime) {
      if (loopmonster.state['next_'+mode] < nexttime[mode]) {
        nexttime[mode] = loopmonster.state['next_'+mode];
        nexttype[mode] = allmonsters.indexOf(loopmonster);
      }
    }
    var header = '<tr><th><b>M</b></th>';
    var rows = '<tr>';
    for (var statname in loopmonster.char_stats) {
      header += '<th><b>' + statname + '</b></th>';
      rows += '<td>' +loopmonster.char_stats[statname] + '</td>';
    }
    header += '</tr>';
    rows += '</tr>'
  }
  $.each(monster.char_stats, function(name,value) {
    $(name).wrap('<th><b></th></b>').html()
  });
  //*/
  for (var i = 0; i < 4; i++) {
    if (allmonsters[i].state.next_fight < next_attack) { //.preferences.autofight
      next_attack = allmonsters[i].state.next_fight;
      next_attack_type = i;
    }
    if (allmonsters[i].state.next_feed < next_feed) {
      next_feed = allmonsters[i].state.next_feed;
      next_feed_type = i;
    }
    if (allmonsters[i].state.next_quest < next_quest) {
      next_quest = allmonsters[i].state.next_quest;
      next_quest_type = i;
    }
  }
  menuCode.push('<div class="monsterHeading">-STATISTICS-</div>');
  menuCode.push('<table id="FBVX">');
  //insert the last time we cleared the flags as tooltips for the headers
  var dateformat = "MMM d, y HH:mm";
  menuCode.push('<tr><th>M</th><th>Level</th><th>Points</th><th>Bucks</th><th><b title="'+
      formatDate(monster.state.next_fight * 1000,dateformat) + '">Fights</th><th><b title="'+
      formatDate(monster.state.next_feed * 1000,dateformat) + '">Feeds</th><th><b title="'+
      formatDate(monster.state.next_quest * 1000,dateformat) + '">Energy</th><th>Army</th><th>Rituals</th></tr>');
  for (var i=0; i < NR_MONSTERS; i++) {
    menuCode.push('<tr>');
    //1st cell - monster type - also a link to the current page but for each monster
    menuCode.push('<td> <a href="' + location.href.replace(MONSTER_TYPE[PLURAL + current_type],MONSTER_TYPE[PLURAL + allmonsters[i].type])  + '">' + allmonsters[i].abbrev +' </a></td>');
    //2nd cell - monster power
    menuCode.push('<td> ' + allmonsters[i].char_stats.level + "</td>");
    menuCode.push('<td> ' + allmonsters[i].char_stats.points + "</td>");
    //3th cell - monster money
    menuCode.push('<td> ' + allmonsters[i].char_stats.bucks + "</td>");
    //4th cell - monster attacks_left
    menuCode.push('<td> ' + (allmonsters[i].char_stats.fights == -1 ? '?' : allmonsters[i].char_stats.fights)+ "</td>");
    //5th cell - monster feeds_left
    menuCode.push('<td> ' + allmonsters[i].char_stats.feeds + "</td>");
    //6th cell - monster energy_left
    menuCode.push('<td> ' + allmonsters[i].char_stats.energy + '/' + allmonsters[i].char_stats.energy_max + "</td>");
    menuCode.push('<td> ' + allmonsters[i].char_stats.army + "</td>");
    menuCode.push('<td> ' + allmonsters[i].char_stats.rituals + "</td>");
    menuCode.push('</tr>');
  }

  menuCode.push('<tr> <td colspan="0" title="'+formatDate(1000*next_attack,dateformat) + '"> ');
  if (next_attack > now) {
    menuCode.push('Next fight in ' + secondsToString(next_attack - now) + ' (' +
      allmonsters[next_attack_type].abbrev + ') </td></tr>');
  } else {
    menuCode.push('Next fight: NOW!');
  }
  menuCode.push('<tr> <td colspan="0" title="'+formatDate(1000*next_feed,dateformat) +'"> ');
  if (next_feed > now) {
    menuCode.push('Next feed in ' + secondsToString(next_feed - now) + ' (' +
      allmonsters[next_feed_type].abbrev + ') </td></tr>');
  } else {
    menuCode.push('Next feed: NOW!');
  }
  menuCode.push('<tr> <td colspan="0" title="'+formatDate(1000*next_quest,dateformat) +'"> ');
  if (next_quest > now) {
    menuCode.push('Next quest in ' + secondsToString(next_quest - now) + ' (' +
      allmonsters[next_quest_type].abbrev + ') </td></tr>');
  } else {
    menuCode.push('Next quest: NOW!');
  }
  menuCode.push('<tr><td colspan="0">Status:<br /><span id="monsteraction"></span><br /><span id="monstertimer"></span></td></tr>');
//  menuCode.push('<tr><td colspan="0">Auto Toggle:<br />');
//  menuCode.push('<button id="AutoFeed" type="button">Feed ' + (mstatus & PREF_AUTOFEED ? "on! " : "off!" ) + '</button>');
//  menuCode.push('<button id="AutoAttack" type="button">Attack ' + (mstatus & PREF_AUTOATTACK ? "on! ":"off!") + '</button>');
//  menuCode.push('<button id="AutoQuest" type="button">Quest ' + (mstatus & PREF_AUTOQUEST ? "on! " : "off!" ) + '</button>');
//  menuCode.push('<button id="AutoBuy" type="button">Buy ' + (mstatus & PREF_AUTOBUY ? "on! " : "off!" ) + '</button></td></tr>');
  menuCode.push('<tr><td colspan="0">');
  menuCode.push('<button id="PauseButton" type="button">Pause (F2)</button>');
  menuCode.push('<button id="LogPanel" type="button">Log (F8)</button>');
  menuCode.push('<button id="ConfigPanel" type="button">Config (F9)</button>');
  menuCode.push('v'+scriptMETA['version']);
  menuCode.push('</td></tr></table>');
  //menuCode.push('<a id="refreshStats">Gather Data</a>');
  
  var menu = document.createElement('div');
  menu.id = 'FBStats';
  menu.innerHTML = menuCode.join(''); // concatenate the string efficiently (faster than +)
  // see http://aymanh.com/9-javascript-tips-you-may-not-know for more information
  menuCode.length = 0; //Reset/Empty the array
  
  menuCode.push("#FBStats { position:fixed; bottom:27px; z-index: 2; right:2px; border:2px solid #6D84B4; ");//width:427px; ");
  menuCode.push("background:#EEEEEE; color:#3B5998; padding:2px; font-weight:bold; }");
  menuCode.push("#FBStats div.monsterSection { text-align:center; padding-top:2px; }");
  menuCode.push("#FBStats div.monsterHeading { text-align:center; background: #6D84B4; color: #FFFFFF; }");
  menuCode.push("#FBStats a { color: #BB0011; text-decoration:none; }");
  menuCode.push("#FBStats a:hover { color:#B22222; text-decoration:underline; }");
  menuCode.push("#FBStats table { border-spacing: 0px; }");
  menuCode.push("#FBStats table th { font-weight: bold; border-width: 1px 1px 1px 1px; padding: 2px 2px 2px 2px; border-style: solid solid solid solid; }");
  menuCode.push("#FBStats table td { border-width: 1px 1px 1px 1px; padding: 2px 2px 2px 2px; border-style: solid solid solid solid; }");
  menuCode.push("#FBStats .red { color:#f20000 }");
      
  var style = document.createElement('style');
  style.type = "text/css";
  style.innerHTML = menuCode.join(''); 
  menuCode.length = 0; //Reset/Empty the array
  
  // Insert the menu code and style into the document
  try {
    document.getElementsByTagName('head')[0].appendChild(style);
    document.body.insertBefore(menu, document.body.lastChild);
  
    // add event listeners
    var t_elm;
    t_elm = document.getElementById('PauseButton');
    t_elm.addEventListener('click',function(){
        if (running) pause();
        else unPause();
      },true);
    t_elm = document.getElementById('ConfigPanel');
    t_elm.addEventListener('click',showConfig,true);
    t_elm = document.getElementById('LogPanel');
    t_elm.addEventListener('click',function(){
      if (userLogBox) userLogBox.toggle();
      },true);
    
  } catch(ex) {
    userLogBox.debug('Exception in InsertMenu: ' + ex); //EXCEPTION
  }
}

function setupConfigPanel() {
  if (typeof(GM_config) != 'object') {
    debug('cannot initialize GM_Config as it is not an object:'+GM_config);
    return; // check if the GM_config has been defined to call GM_config.init
  }
    //var lang = GM_config.gets('lang','en'); // get the language - or set it to 'en' if it was not yet stored
    var configStyle = <><![CDATA[
   // Remove the 40% wasted space to the left
  .indent40 {
    margin-left: auto !important;
  }
  .collapsed { 
    cursor:pointer !important;
    background: red;
  }
  .field_label{
    width: 105px !important;
  }
//  input {}
  ]]></>.toString();
  //    background:transparent url(plus.gif) no-repeat top left;*/
  
  var cfg = new Object();
  for (var i = 0; i < 4; i++) {
    cfg['enabled'+i]        = {label: 'Enabled:', type: 'checkbox', default: true };
    cfg['enabled'+i].section= new Array(MONSTER_TYPE[i].toUpperCase());
    cfg['autofight'+i]      = { label: 'Fight:', type: 'checkbox', default: true };
    cfg['useweapon'+i]      = { label: 'Use weapon:', type: 'select', options:{Auto:'Auto', 'Boom Stick':'Boom Stick', None:'None'}, default: 'Boom Stick' };
    cfg['autofeed'+i]       = { label: 'Feed:', type: 'checkbox', default: true };
    cfg['autoquest'+i]      = { label: 'Quest:', type: 'checkbox', default: true };
    cfg['repeatquest'+i]      = { label: 'Repeat Quest Number:',title:'if given will only perform one type of quest' ,type: 'int', default: '0' };
    cfg['acquireitems'+i]   = { label: 'Quest autobuy items:', type: 'checkbox', default: false };
    cfg['autobuy'+i]        = { label: 'Buy:', type: 'checkbox', default: true };
    cfg['items_tostock'+i]      = { label: 'Item ID to autobuy:',title:'Comma seperated ids which to autobuy' ,type: 'text', default: '1004,2001' }; //default boomstick, shield
  }
  cfg['timer']       ={ section:['MISC'], label: 'Timer Delay (s):', type: 'int', default: 7};
  cfg['max_percent'] ={ label: 'Max Percentage:',title:'The maximum points of the opponent that you wish to fight relative to your points', type: 'int', default: 100};
  cfg['reload_timer'] ={ label: 'Reload Timer (s):',title:'The delay before reloading a hung page', type: 'int', default: 30};
  cfg['log'] ={ label: 'Enable Logging:',title:'Enable logging from script', type: 'checkbox', default: true};
  cfg['multiplefeed'] ={ label: 'Multiple Feeds:',title:'Enable feeding multiple people at one time?', type: 'checkbox', default: true};
  //console.info(cfg); //DEBUG
  
  GM_config.init('Configuration',cfg, configStyle,
    { //function hooks
      open: function() {
        var allsections = $('#GM_config').contents().find('.section_header_holder');
        //create a toggle all link
        allsections.eq(0).before('<a href="javascript:;">Toggle All Sections</a>');
        allsections.prev('a').click(function(eventObj){
          $(this).nextAll().find('div.config_var').toggle();
          $(this).nextAll().find('.section_header').toggleClass('collapsed');
        });
        // bind section headings to toggle the display of the section
        allsections.prev('a').nextAll()
          .find('.section_header')
          .attr('title','click to expand/collapse section')
          .click(function(eventObj){
          $(this).nextAll('div.config_var').toggle();
          $(this).toggleClass('collapsed');
        });
        //align all labels - not working right now
        allsections.each(function () {
          $(this).find('label').autoWidth();
        });
        nHtml.Click(allsections.prev('a')[0]); //click the toggle all button
      },
      save: function() { 
        //bind the config settings to the monster Object
        debug('binding preferences to object:'+allmonsters); //DEBUG
        for (var i=0; i <4; i++) {
          var tmpmon = allmonsters[i];
          console.log('before binding');
          console.info(tmpmon.preferences); //DEBUG
          for (var prefname in tmpmon.preferences) {
            var tmp = GM_config.get(prefname+tmpmon.type);
            //GM_log(prefname + ':' + tmpmon.type + '=' + tmp); //DEBUG
            if (tmp !== undefined) tmpmon.preferences[prefname] = tmp;
          }
          console.log('after binding');
          console.info(tmpmon.preferences); //DEBUG
          serialize(tmpmon.type+'preferences',tmpmon.preferences);
        }
      }
    }
  );
  //debug('GM_config done initializing');
}

function showConfig() {
  console.time('ShowConfig');
  //if (!GM_config) setupConfigPanel(); //to speedup script processing, only intialize if we want to show it
  if (GM_config) GM_config.open();
  console.timeEnd('ShowConfig');
}

// ================ Utility functions ==================
function createLink(sPage, sParams, sTitle, sURL) {
  sTitle = sTitle || sPage; // default title = Page name unless it's provided
  sURL = sURL || APPS_URL + MONSTER_TYPE[PLURAL + current_type] + '/'; // default to current app url
  var sExt = '.php';
  if (sPage == undefined || sPage == '') sExt = '';

  if (sParams == undefined || sParams == '') {
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

function LZ(x) {return(x<0||x>9?'':'0')+x;}

//http://www.mattkruse.com/javascript/date/source.html
// ------------------------------------------------------------------
// formatDate (date_object, format)
// Returns a date in the output format specified.
// The format string uses the same abbreviations as in getDateFromFormat()
// ------------------------------------------------------------------
function formatDate(date,format) {
  format=format+'';
  date = new Date(date);
  var result='';
  var i_format=0;
  var c='';
  var token='';
  var y=date.getYear()+'';
  var M=date.getMonth()+1;
  var d=date.getDate();
  var E=date.getDay();
  var H=date.getHours();
  var m=date.getMinutes();
  var s=date.getSeconds();
  var yyyy,yy,MMM,MM,dd,hh,h,mm,ss,ampm,HH,KK,K,kk,k;
  // Convert real date parts into formatted versions
  var value=new Object();
  if (y.length < 4) {y=''+(y-0+1900);}
  value['y']=''+y;
  value['yyyy']=y;
  value['yy']=y.substring(2,4);
  value['M']=M;
  value['MM']=LZ(M);
  value['MMM']=MONTH_NAMES[M-1];
  value['NNN']=MONTH_NAMES[M+11];
  value['d']=d;
  value['dd']=LZ(d);
  value['E']=DAY_NAMES[E+7];
  value['EE']=DAY_NAMES[E];
  value['H']=H;
  value['HH']=LZ(H);
  if (H==0){value['h']=12;}
  else if (H>12){value['h']=H-12;}
  else {value['h']=H;}
  value['hh']=LZ(value['h']);
  if (H>11){value['K']=H-12;} else {value['K']=H;}
  value['k']=H+1;
  value['KK']=LZ(value['K']);
  value['kk']=LZ(value['k']);
  if (H > 11) { value['a']='PM'; }
  else { value['a']='AM'; }
  value['m']=m;
  value['mm']=LZ(m);
  value['s']=s;
  value['ss']=LZ(s);
  while (i_format < format.length) {
    c=format.charAt(i_format);
    token='';
    while ((format.charAt(i_format)==c) && (i_format < format.length)) {
      token += format.charAt(i_format++);
      }
    if (value[token] != null) { result=result + value[token]; }
    else { result=result + token; }
    }
  return result;
}

function stringToSeconds(str) {
  if (str == null) return -1;
  var hours = str.match(/(-?\d+) hour(s)?/);
  var minutes = str.match(/(-?\d+) minute(s)?/);
  if (hours == null) hours = 0;
  else hours = hours[1];
  if (minutes == null) minutes = 0;
  else minutes = minutes[1];
  // We add one minute for rounding errors
  var wait = (60 * (1 + Math.abs(parseInt(hours,10)) + 60 * Math.abs((parseInt(minutes,10)))));
  //GM_log('hours:'+hours+' minutes:'+minutes+' wait:'+wait); //DEBUG
  return wait;
}

function secondsToString(sec) {
  var str = '';
  var tmp;
  str = (sec % 60) + ' s'; //+ //((sec % 60) == 1 ? '' : 's');
  sec = (sec - (sec % 60)) / 60;
  if (sec) {
    str = (sec % 60) + ' m ' + str;//((sec % 60) == 1 ? '' : 's') + ' ' + str;
    sec = (sec - (sec % 60)) / 60;
    if (sec) {
      str = (sec % 60) + ' h ' + str;//((sec % 60) == 1 ? '' : 's') + ' ' + str;
    }
  }
  return str;
} 

// skip dialog
function skipDialog() {
  //var dlg = getFirstXPathResult('//div[@class="dialog_buttons"]/input[@type="button" and @value="Skip"]');
  var dlg = getFirstXPathResult('//input[@type="button" and @value="Skip"]');
  debug('skipdlg:'+dlg);
  if (dlg != null) dlg.click();
}

// to take action if auto is enabled and start the timer interval 
function startActionTimer(module) {
  try {
    document.getElementById('monsteraction').innerHTML = gmessage;
    userLogBox.add(gmessage,'info Icon');
  } catch (ex) {userLogBox.debug('Exception in startActionTimer:'+ex);}
  // create annonymous function to call every second to decrement counter
  // and click when counter = 0
  // Interval function that runs every second and checks the countdown timers
  // and takes appropriate action depending on which page we are on
  ginterval.interval = setInterval(function (){
    gcountdown--;
    if (gcountdown<=0) {
      try {
        document.getElementById('monstertimer').innerHTML = 'NOW!';
      } catch (ex) {userLogBox.debug('Exception in startActionTimer:'+ex);}
      // like use the attack again link instead of visiting the main page
      if (typeof gnext_page == 'object') {
        if (!galready_going) {
          nHtml.Click(gnext_page);
          galready_going = true;
        }
      } else {
        if (!galready_going) {
          location.href = gnext_page;
          galready_going = true;
          skipDialog();
          setTimeout(skipDialog, 7000);
        }
      }
    } else {
      try {
        document.getElementById('monstertimer').innerHTML = 'in ' + secondsToString(gcountdown);
      } catch (ex) {userLogBox.debug('Exception in startActionTimer:'+ex);}
    }
  }, 1000);
  ginterval.module = module;
}

function selectDefender () {
  var defender;
  var alldefenders = new Array();
  var max_points=0;
  var def_type = MONSTER_TYPE.indexOf($('.ui_tab_selected_container').text().trim());
  var best_defender;
  
  $('a.action_image_link').each(function(i){
    //if (i==0) return true; //ignore first defender as he is not part of the sorted list
    //otherwise we'll have to sort the list on our own!
    var tmp = new GenericMonster(0,0);
    tmp.link = this; //save link for clicking to attack
    var buttontext = $(this).text().trim().toLowerCase(); // 'fight' or '3-d fight'
    if (buttontext == '3-d fight') return true; //continue, skip this element.

    var regexresult = $(this).parent().html().match(/set_defender\((\d+)(,\d+)?\)/); //id, type(optional)
    tmp.id    =regexresult[1].toInt(); //id
    if (regexresult[2]) tmp.type = ATTACK_TYPE.indexOf(regexresult[2].toInt());
    else tmp.type  =def_type;

    var ob = $(this).parents('tbody').eq(0); //panel containing stats
    tmp.name  =ob.find('.header_two').eq(0).text().trim(); //name
    tmp.points=ob.find('.hud_right_text').eq(1).text().toInt(); //power
    ob = ob.find('img.action_image_image').attr('src').search(/chicken_suit/); //check if user is wearing chicken suit
    if (ob != -1) {
      debug(tmp.name+' is wearing a chicken suit');
      // specially select this user for all attacks!
    }

    alldefenders.push(tmp);
    if (monster.canAttack(tmp)) {
      if (tmp.points > max_points) {
        max_points = tmp.points;
        best_defender = tmp;
      }
    }
    // evaluate only the top 5 defenders to speed up processing of script
    if (i >= 5) return false; //like break; exit out of jquery each loop
    else return true; //like continue;
    //return tmp;
  });
  //console.info(alldefenders);
  console.info(best_defender);
  return best_defender;
} 

function parseFeedHistory() {
  var result = new Array();
  /* This function makes sense only on certain pages */
  if (current_page != 'event-history' && current_page != 'feed-result-redesign' && current_page != 'char_stats') return result;
  
  //var divs = getElementsByClassName('list_action_call', 'span'); // //span[@class='list_action_call']/a
  
  // FIND all people who have fed you recently
  var events = $('div.list_container').eq(2).children().find("span.list_event:contains('you')");
  events.each(function() {
    //if (GM_DEBUG && console) console.info(this); //DEBUG
    var feed_event = new Object();
    //Name
    feed_event.name = $(this).text().match(/(.*)\s+(fed|and)\s+/)[1].trim();
    //$(this).text().match(/(.*)\s+and\s+(.*)(fed|feed|ruse|rused)/)[1].trim(); //\1 = user who fed us, \2 = victim.
    var tmpid = $(this).parent().find('span.list_action_call a').attr('href').match(/id=(\d*)/)[1]; //span:nth-child(3) img
    //ID
    feed_event.id = parseInt(tmpid,10);
    if (!feed_event.name) feed_event.name = 'Anonymous';
    var tmpdate = new Date();
    tmpdate = Date.parse($(this).parent().find('span.list_rank').text() + ', ' + tmpdate.getFullYear() + ' 23:59:59 PDT'); // We 'believe' it's PDT
    //Date
    feed_event.date = Math.floor(tmpdate / 1000);
    // Add the <div> DOM element to allow easy modifications
    feed_event.div = $(this).parent();
    //if (GM_DEBUG && console) console.info(feed_event.div); //DEBUG
    result.push(feed_event);
  });
  
  //var names = events.find("span.list_event:contains('you')"); //use .text() to get value
  //var ids = events.find("span.list_event > a");.map(ids, function(n,i) {return n.href.match(/id=(\d+)/)[1]});
  //var dates = events.find("span.list_rank").text(); //use .text() to get value
  //if (names.length != ids.length != Dates.length) return result; // if the sizes don't match
  return result;
}

var nHtml={
  VisitUrl:function(url) {
  	window.setTimeout(function() {
  		document.location.href=url;
  	},500+Math.floor(Math.random()*500));
  },
  ClickWin:function(win,obj,evtName) {
  	var evt = win.document.createEvent('MouseEvents');
  	evt.initMouseEvent(evtName, true, true, win,
  		0, 0, 0, 0, 0, false, false, false, false, 0, null);
  	return !obj.dispatchEvent(evt);
  },
  Click:function(obj) {
    //debug('clicking object:'+obj);
    //console.info(obj);
  	return this.ClickWin(window,obj,'click');
  },
  ClickTimeout:function(obj,millisec) {
  	window.setTimeout(function() {
  		return nHtml.ClickWin(window,obj,'click');
  	},millisec+Math.floor(Math.random()*500));
  },
  ClickUp:function(obj) {
  	this.ClickWin(window,obj,'mousedown');
  	this.ClickWin(window,obj,'mouseup');
  	this.ClickWin(window,obj,'click');
  },
  GetText:function(obj,depth) {
  	var txt='';
  	if(depth==undefined) { depth=0; }
  	if(depth>40) { return; }
  	if(obj.textContent!=undefined) { return obj.textContent; }
  	for(var o=0; o<obj.childNodes.length; o++) {
  		var child=obj.childNodes[o];
  		txt+=this.GetText(child,depth+1);
  	}
  	return txt;
  }
};

//http://www.webdeveloper.com/forum/showthread.php?t=193474
//Object.prototype.isEmpty = function() {
//    for (var prop in this) {
//        if (this.hasOwnProperty(prop)) return false;
//    }
//    return true;
//};

//http://wiki.greasespot.net/Code_snippets#Serialize.2Fdeserialize_for_GM_getValue
//var settings = {a: 1, b: 2, c: 3};
//serialize('test', settings);
//var _settings = deserialize('test'); // now 'settings == _settings' should be true

function deserialize(name, def) {
  return eval(GM_getValue(name, (def || '({})')));
}

function serialize(name, val) {
  GM_setValue(name, uneval(val)); //uneval === .toSource(), except for some minor differences.
}

//used for converting resources into img - used in userLogBox.add
//stripURI:
function stripURI(img) {
  img = img.split('"')[1];
  return img.replace('" />', '');
}//,

//used for converting resources into img - used in userLogBox.add
//String.prototype.untag = function() {
//  return this.replace(/<[^>]*>/g, '');
//};

var userLogBox={
  box:null,
  log:null,
  options:{
    enabled:true,
    visible:false,
    maxlines:100,
    contents:null
  },
  makeElement:function (type, appendto, attributes, checked, chkdefault) {
    var element = document.createElement(type);
    if (attributes != null) {
      for (var i in attributes) {
        element.setAttribute(i, attributes[i]);
      }
    }
    if ((checked != null) && (GM_getValue(checked, chkdefault) == 'checked')) element.setAttribute('checked', 'checked');
    if (appendto) appendto.appendChild(element);
    return element;
  },
  init:function() { //createlogbox
    if (!$('#gmLogBox').length) { //do not attempt to initialize again if log already exists
      // Define CSS styles.
      this.makeElement('style', document.getElementsByTagName('head')[0], {'type':'text/css'}).appendChild(document.createTextNode(
        '#gmLogBox div.mouseunderline:hover{text-decoration:underline}' +
        '#gmLogBox .logEvent{border-bottom:1px solid #333; padding:4px 0px}' +
        '#gmLogBox .eventTime{color:#888; font-size: 11px; width:75px;  float:left}' +
        '#gmLogBox .eventBody{width:315px; float:right}' +
        '#gmLogBox .eventTime,#gmLogBox .eventIcon,#gmLogBox .eventBody{}' +
        '#gmLogBox .eventBody .good {color:#52E259;font-weight:bold;}' +
        '#gmLogBox .eventBody .bad {color:#EC2D2D;font-weight:bold;}' +
        '#gmLogBox .eventBody .warn {color:#EC2D2D;}' +
        '#gmLogBox .eventBody .money {color:#00CC00;font-weight:bold;}' +
        '#gmLogBox .eventBody .expense {color:#FFD927;}' +
        '#gmLogBox .eventBody .loot {color:#FF6633;}' +
        '#gmLogBox .eventBody .user {color:#FFD927;}' +
        '#gmLogBox .eventBody .attacker {color:#EC2D2D;}' +
        '#gmLogBox .eventBody .job {color:#52E259;font-weight:bold;}' +
        '#gmLogBox .clear{clear:both}' +
        '#gmLogBox .logEvent.Icon{background-repeat: no-repeat; background-position: 75px}' +
        '#gmLogBox .logEvent.pause.Icon{background-image:url(' + stripURI(this.pauseIcon) + ')}' +
        '#gmLogBox .logEvent.play.Icon{background-image:url(' + stripURI(this.playIcon) + ')}' +
        '#gmLogBox .logEvent.info.Icon{background-image:url(' + stripURI(this.infoIcon) + ')}' +
        '#gmLogBox .logEvent.warning.Icon{background-image:url(' + stripURI(this.warningIcon) + ')}' +
        '#gmLogBox .logEvent.bad.Icon{background-image:url(' + stripURI(this.badIcon) + ')}' +
        ''));
    /*    '#gmLogBox .logEvent.process.Icon{background-image:url(' + stripURI(processIcon) + ')}' +
    //    '#gmLogBox .logEvent.search.Icon{background-image:url(' + stripURI(searchIcon) + ')}' +
    //    '#gmLogBox .logEvent.lootbag.Icon{background-image:url(' + stripURI(lootbagIcon) + ')}' +
    //    '#gmLogBox .logEvent.found.Icon{background-image:url(' + stripURI(lootbagIcon) + ')}' +
    //    '#gmLogBox .logEvent.updateGood.Icon{background-image:url(' + stripURI(updateGoodIcon) + ')}' +
    //    '#gmLogBox .logEvent.updateBad.Icon{background-image:url(' + stripURI(updateBadIcon) + ')}' +
    //    '#gmLogBox .logEvent.good.Icon{background-image:url(' + stripURI(goodIcon) + ')}' +
    //    '#gmLogBox .logEvent.experience.Icon{background-image:url(' + stripURI(experienceIcon) + ')}' +
    //    '#gmLogBox .logEvent.experience.Icon{background-image:url(' + stripURI(experienceIcon) + ')}' +
    //    '#gmLogBox .logEvent.health.Icon{background-image:url(' + stripURI(healthIcon) + ')}' +
    //    '#gmLogBox .logEvent.cash.Icon{background-image:url(' + stripURI(cashIcon) + ')}' +
    //    '#gmLogBox .logEvent.cashCuba.Icon{background-image:url(' + stripURI(cashCubaIcon) + ')}' +
    //    '#gmLogBox .logEvent.energyPack.Icon{background-image:url(' + stripURI(energyPackIcon) + ')}' +
    */
    
      var gmLogBox = this.makeElement('div', document.body, {'id':'gmLogBox', 'style':'position: fixed; right: 5px; top: 40px; bottom: 280px; width: 427px; background: black; text-align: left; padding: 5px; border: 1px solid; border-color: #FFFFFF; z-index: 1; font-size: 10pt;'});
    
      var logClrButton = this.makeElement('div', gmLogBox, {'id':'gmLogClear', 'class':'mouseunderline', 'style':'position: absolute; left: 5px; top: 0px; font-weight: 600; cursor: pointer; color: rgb(255, 217, 39);'});
        logClrButton.appendChild(document.createTextNode('clear log'));
        logClrButton.addEventListener('click', function() {userLogBox.clear();}, false);
        //$('#gmLogClear').bind('click', function() {userLogBox.clear();});
    
      var closeLogButton = this.makeElement('div', gmLogBox, {'id':'gmLogClose', 'class':'mouseunderline', 'style':'position: absolute; right: 5px; top: 0px; font-weight: 600; cursor: pointer; color: rgb(255, 217, 39);'});
        closeLogButton.appendChild(document.createTextNode('close'));
        closeLogButton.addEventListener('click', function() {userLogBox.hide();}, false);
        //$('#gmLogClose').bind('click', function() {userLogBox.hide();});
    
      var debugElt = this.makeElement('div', gmLogBox, {'id':'ap_debug_log', 'style':'display: none; position: absolute; left: 180px; top: 0px; font-weight: 600;color: rgb(255, 0, 0);'});
      debugElt.appendChild(document.createTextNode('Debug Log'));
      if (GM_DEBUG) {
        debugElt.style.display = 'block';
      }
    
      var logBox = this.makeElement('div', gmLogBox, {'id':'logBox', 'style':'position: absolute; overflow: auto; right: 0px; top: 20px; bottom: 0px; width: 425px; background-color: #111111; font-size:11px; color: #BCD2EA; text-align: left; padding: 5px; border: 1px solid;'});
    }

    this.box = $('#gmLogBox');
    this.log = $('#logBox');
    if (this.log.length) {
      this.load();
      logBox.innerHTML = this.options.contents;
      if (!this.options.visible) this.hide();
      else this.show();
    }
  },
  load:function() {
    this.options = deserialize('logoptions', this.options);
  },
  save:function() {
    //debug('saving log');
    if (this.log.length) serialize('logoptions',this.options); // if we can't find log in page, don't save (to handle errors while trying to add log to page)
  },
  show:function() {
    if(!this.box.length) this.init();
    this.box.show();//this.box.css('display','block'); // show box 
    this.options.visible = true;
    this.save();
  },
  hide:function() {
    if (!this.box.length) return; //exit if no log object found
    this.box.hide();//this.box.css('display','none'); // hide box
    this.options.visible = false;
    this.save();
  },
  toggle:function() {
    if (this.options.visible) this.hide();
    else this.show();
  },
  clear:function() {
    if (!this.log.length) return;
    this.log.html(this.options.contents = '');
    this.save();
  },
  debug:function(line, icon) {
    if (GM_DEBUG) this.add(line, 'warning Icon');
  },
  error:function(line, icon) {
    this.add(line, 'bad Icon');
  },
  add:function(line, icon) { //addtolog
    if (!GM_DEBUG && !this.options.enabled) {
      // Logging is turned off.
      return false;
    }
    // Get a log box to work with.
    if (!this.log.length) this.init();
    if (!this.log.length) return false; // if we cannot get a log to work with return false.
    
    if (icon == 'undefined') icon=''; //optional value for icon
    // Create a datestamp, formatted for the log.
    var currentTime = new Date();
    var timestampdate = formatDate(currentTime,'NNN dd'); // NNN dd
    // Create a timestamp, formatted for the log.
    var timestamptime = formatDate(currentTime,'hh:mm:ss a'); // hh:mm:ss a
    var logLen = this.log.children().length; //logBox.childNodes.length;
  
    // Determine whether the new line repeats the most recent one.
    var repeatCount;
    var insertionPoint = this.log.children(':first');
    if (logLen) {
      //var elt = logBox.firstChild.childNodes[1];
      var elt = insertionPoint.find('div.eventBody')[0];
      if (elt && elt.innerHTML.replace(/<[^>]*>/g, '').indexOf(line.replace(/<[^>]*>/g, '')) == 0) {
        if (elt.innerHTML.match(/\((\d+) times\)$/)) {
          repeatCount = parseInt(RegExp.$1) + 1;
        } else {
          repeatCount = 2;
        }
        line += ' (' + repeatCount + ' times)';
      }
    }
  
    // Create the new log entry.
    var lineToAdd = document.createElement('div');
    lineToAdd.className = 'logEvent ' + icon;
    lineToAdd.innerHTML = '<div class="eventTime">' + timestampdate + '<br/>' +
                          timestamptime + '</div><div class="eventBody">' +
                          line + '</div><div class="clear"></div>';
  
    // Put it in the log box.
    if (repeatCount) {
      //logBox.replaceChild(lineToAdd, logBox.firstChild);
      insertionPoint.replaceWith($(lineToAdd));
    } 
    else {
      this.log.prepend($(lineToAdd));
  
      // If the log is too large, trim it down.
      if (this.options.maxlines > 0) {
        while (logLen-- > this.options.maxlines) {
          this.log.children(':last').remove();
        }
      }
    }
  
    // Save the log.
    this.options.contents = this.log.html();
    this.save();
    return true;
  },
  refresh:function() {
    this.init();
  },
  playIcon:'<img src="' +
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC+0lEQVR42l1TSU9TURT+Xt9UaIHWAqUMJY2tSIwS41QEjXFhTFy54B/wF9iUhAUJxAQTt0RJkJUxLli6c6ELNcTEKV' +
  'GCYShWfNRHh1faN7aeexkinuTm3pt77ne+851zBPxnW1tbCVmSxxVVuU3XRKPRAK0N0zRf2ba9kEwmN/71F44O2WxWlCRpGj5x4sPXVXk9m0OlWuVvweZmJOLduDiYclzbmnNddyqVSnnHAD+3t0VFUV9ktT/336' +
  'x8RGtLEKqiwOfz0WsD9XoDpmWhXNnH6OUhREPBZWIzxkA4gKZpM7/+FDMrn78hEg5BlmVIokgABwQZgOu5sG0HeqGIKxcGEQ6os4lEYlLY2dlJSIq6+vL1e7k9HIaqKvyzKAogLQ4B6nBcD7bjwLJs5PcKuDNyya' +
  'ntVwYEXddn1nO7Gb1ooCXQTAAyOVl49vw5boyO4kwySYkKTEh4Xp1SsWHsVxEJtaA7HJwVjLLx9tPaZjrQ5Kdsma+AKok3//gJP/f39+N6Oo1otJPfD6uCas3E2XjXO8EwjN9ffmSjHadCqJkWahTdILGWlpag+p' +
  'sQaGmjyC66OtsxfO0q2iMRNFGa+b0iBuJdGgFUfn/fzEXDbUEuFqNXKpex+HQJ/qZmBFpD8FwXsc4IRobTiB0yKZQMnO7u0IRKpfJ2bVtL+xWZq65QBaq1Kh48fASBysg0uHVzFD2xGC+pRZWoNw72eEfonVAsFm' +
  'f0cjVTpsgqfVZkCY5jY35hEffu3sHQ+XNcPIdY2I7LK8F2JnhAwqyQz+cTlOvq6lZOZgAyAYhEkTURY8PMozK6ngeXgdCybBepvi7HKJcGeKcUCoUZ061ncprOGRz0gY/netRIRyCMQQ/pIXjObCwWm+Qeu5omqn' +
  '7/i5rt3s/t6jy66PsHoNHgzcRSYZ9FeMuWaY71xePe8TAxEFlRpiVZmdBLhlwy9nn3MZMlEW3BAMKtAceq1eZsx57q7e31TkzjkTFNaBbGaTKPx5lsg4aHjzPRPjHOfwGdsIJvkkplkQAAAABJRU5ErkJgggo=' +
  '" />',
  pauseIcon:'<img src="' +
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADEUlEQVR42l1TW08TQRg92+7sFlqwFZCL0LBCRV8Eg1wMmhiMGmOMQYNPxsSEv+ALJjyQwIt/wcTE+EYUTLwbeUADCK' +
  'J4SbRyL1ZYytLSLe1eW2cHIeqXTHY3O3PmnO87h8N/tbS0JBGedAmi0E4/pVwuB7oWNE0bNgzjTm1t7cLf+7mdl0gk4uZ5vhcu982pr2EyH4kilU6zf778fEjBChw9HDItQ79tWVZPKBSydwF+Li+7BUEciMjrHW' +
  '8mp1FY4IMoCHC5XPRvDtlsDpquI5nawolj9Sj1+wYpm04HhAHIstz3az3RPfn5G4oCfhBCwLvdFGCboANg2RYMw4QST6DpyGEEvGK/JEm3uJWVFYkXxPCzkXekOBCAKAoQCA+epwCc6w9AFqZlwzBN6LqB2EYcZ9' +
  'sazcxWqo5TFKVvPrrWrSRUFHjzKQDB95k5/FqV0dLYwFROfJhGWUkxDh0MUSkG1K00ivwFqAj4+jk1qY59mlls9eZ5qFq6neMwOvEeM3MLOHf6FGvSi+ER1FRXoa21GX+mgnRGw6Fg2Tinqurql9lIaclePzKajg' +
  'xt1tvRcczOzePC+bOMwdPnL3FAqsbJtuPwiCLyqMzYRgJ1wTKZAqRWvy9GSwN7fKxZDr1Xr4cRDv/AlcsdrAcPBodQR+mfOd3OZDos45sqaipKZC6VSo3NLMutHoGwrgt0Ao8eP8HUx2ncuH6NAdy9dx+NDfW4dP' +
  'ECdDqJLJXgPIMl/nEukUj0Kcl0d5LeLNLDzgTGJyaZhKuXL7G+DDwcQm1NDVqam9gkDNNiTLw8+rlYLCaJnrxweClKHABCAQj1gNtZru0x2nSMlm2DOhAGXbphIVRVZqrJzTrmlHg83qdZ2e6orGx7gAG4mNYdI+' +
  '2AOAz27ysCZ5v95eXlt9iONVl2ix7PQMawOqJrCrOwc/suQC7HzGTbWXbYDXtQ17TOqmDQ3g2TA0IEoZcnwk1lUyWb6hZzn1OEunKPz4tAodfUM5nbhmn0VFZW2v+kcaecntAsdNFk7saZ1gIND4szpf1PnH8DjE' +
  'h/b2bB2sAAAAAASUVORK5CYIIK' +
  '" />',
  infoIcon:'<img src="' +
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADPUlEQVR42l3Te2wMQRwH8O++aTV1WjmttueupSIedWiaqJL7QyQETdoQJyIIEsQrErlS0Wg9KooQkYq/LogSCeKt8Q' +
  'wSjcQj+INzrfbu2nu0d1drd293ze4FZZJNdnZmPzO/38yPwn/N5/PbOY5dJwiCS9N1u64DFHSfKIrtsqycmzChxDd0PvX7xe/3MzTNNiRF7PK2dXDPX/kQjSbNsVGjMjG73IEVNWUKz6aaNVWtLy0dr/4BOju7GJ' +
  '7n224/+VZ9/OxjWMgP3DAO+u9VyIsiKeiPDmLr+irMK8+7JstyrYGYQE8g2HjnWaen5fxT5FizkaJpVDpt2La83ASOnm7HK38ErKYhHBzAtjWVqHKObhpf4qijurt77AmJ/rx4y0UuZ8xIKAwNjaYwf+Y47HNXmE' +
  'B9yz087IyCUTVwBIkE+nGlpVYRKKmUCofDjQe8bzztb/xghwsAAUCArEwBedkZJhDoSyChpACNxKKqUEUZrrIibK2e2ETF4/EX5Z5bFRkCC8gyARhIZKJragFOrp1tAjsO3ca9njgEhnRSGiDwEKUUHu11vaRiA/' +
  'GgY/t1q91hhdY/gO+RQYQHFbjnlMC7ea4JrG+4idYPQeRm8CjIyQRtyYbvSxAfDy0IpYGdN6w2xxh86fuBRKTf3Ka7shjejZVp4MAttH7qI6ExyMrNRnFuJvxfA/h4kADJZPKFs/5uRYIbhkDSCIGEQm6P25kP7+' +
  'oZaeDwfbR+F83cIKUiL4tHliziuWceCSEWa/Rc+eA52xGERtFmDozHPbMA3pXT0kDzwzRATsDYHa1r2OC0om5hcRPV29tnj0jU52n773Myy5nbBLkH7lmF8K6angaOPEBr1480oKngFQUde1zKCOpnqXmRItFY46' +
  'XXQc+my28BlgBkJ0vL8nGiZooJ7D7zFBe7CUBWBjnOU8umYsmkkU2FBfl1JhAKhRheENouvA5Vb7/6DrJx3hQ1pFR0My886R4jaM1kyzVJkmpttiL1TzEZCMvxDb2ivuvko2/czfdBdMVEc6zQMhyLJluxucqmWF' +
  'i1OaXI9UVFhX+LaWgzcmKUM8dxLkXV7cY3htJ9pJTbJVk+NzY/759y/gUON2pDlqRajwAAAABJRU5ErkJgggo=' +
  '" />',
  warningIcon:'<img src="' +
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACgUlEQVR42pWST0gUURzHv29n/7S7rpuhlroW/kFdobQ8qBgdxItWB6NDkVAdukREWdShEr3YHyiicwQlJRJJEP2hOo' +
  'Vmapq1qbEuaWq7Cu6s6+7OjLuz7zU7I1aYZXP5vWHm++Hzvu8R/OURJ15YGZWZJXePsNo/ZLUPYc9jS0ykQ0yWKKen2+1bG8T/AoS+tLf4J4UmeVFEaqaueX3Z8ZY1AxZGbm+e9y2OJttDFqoAeB+N2NMNRWm7mq' +
  'bXBOAHb7YHJkMHHPnzYDEJYwNMsdA/yKi7deifgOCnqzu9I+E3jnyeuH0S5KiEApsE9wBYdpGlKrO+rWdVwMLHZl2El/pEPliWlRfAjYdALCbiTG0QnveA2Wbqs9qNFVkHn7A/Avjes0fH+4N3nBVz0FEB1zoAWQ' +
  'GcqwtCDkvoeUZQXLnh8JZjb++tAPi7T9v8EwG3ycRvSncEwaR5NN8NKR2EcGmvABbX4duoEYJg86bnpBXmnugP/waYfXnkytd+//mSqilQYQosGsHlTgPMBuBkjWIcJ6CyDl3PzXCWp7XmN7ouLANmnzbkTrrmhr' +
  'McnnW2pO8AUwKUoMtDYOKAsgxOMSCqBT/DYdxtlnJKHMV5p96Nq4CJttrO6aGx+m2VXk0nUREjGJll6rooRa8aJABMJhjoNsJRkPrIefHzfuLt2F3teuV5XVrpJWYrU7NY6rixnVPn9X3QwgokARLDBIO9RuYsz6' +
  '4mrtaSD8Kct7Rwx6KyHy3JmFZNnFDVRBfVa2GasNBg7mEOJmvyIBlqyuOn3ZGUFVeK/TqJOjU7srRFICPTwBPf/ZokvSV5I8D9PJPlMFH7VN/p0poSDRKniIYCMz8A9QcpP1oZxJMAAAAASUVORK5CYIIK' +
  '" />',
  badIcon:'<img src="' +
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADW0lEQVR42l2TW2gUVxzGv7Nz2yS7m2xMNpusuWxq3EKLfSsJjVDEtlgLIuQiWJGKF4qlVFpL2bRpDN2l1FYRxZcGBL' +
  'VaDaIkD5XapIJIQl+KNj4ktFm7ZrOX7H1mNzszOzM9O9G09j8cGGbO9zvn+18I/hfhUMjLctxBXhC2EV33GoYBg5BQaXV1WlXksc7NvtB/95NnL08eP2ZYhhnlCtLxJ1cucisz9yGnk+Y/oX4DGnt64dmzVy1yws' +
  'myrg9v8vm0dcBSOMzwPD8u3bm9e+HcaVid9WAF6zrdoKssl1DKpNF19CNwW1+/qShKfwVi7kksLweKUz/7F8+fQbWrCbzNDr0g/QugBIvNBkUSUUjE0fn+hyA9vcGOrq4hEo1EvNaCNP9g3yBnc7vhenMH3O/ux9' +
  '8jn0NZ/GvNwgub0P7lV4hcuoDknduQYjG8dOGyKrKcj6SSyUD67Hf+/G+zqKpvQNf578E6alEW84gOD4EQguYTATB2O7WQwdyh/SBFCY5Xu1H13pEgEfP5mfDAO91cTTU1SlDV2UkFQSpwQKMQQh8LFcvZLB4e+w' +
  'C1mRTA0K2FIlwXx2eJmM3Gwm+91uTwbYQmGdCTUTDtLWg59yO9SZ1poSJ+cHgPGmPLsDQ0w1JDIC4swT0xFScSBSxRQM2LHmjpRWh5CcLmLXB/ew3MU4CSyyL+ySDUhYf0mx2M0wtpPgLX5DQFSNJMvO/tbsYiQp' +
  'ejsG55Ga7R62BsTvNkmgLwtXXUTgaxLwag/DEHi9AMTbej7vKNWZLNZALymW/84sQlMM02tF65T0+pN8Vzn/ajpVGD67MbNCdOlHNp/DnQCzYhwr5rH4xDR4NkJZHwVou5+ejgGxwsMux9e+E46MfcMeo5/7tpgW' +
  '17BU0nruHR6a9hnfwBLHi4rv6k5nirz+yVbCoVwK8T/pUALRtnYJVeuUbP0O552kk6TSTrBEnmwNAGbhgKQO7eHnS3tg6tdWI8xgiCMG7cvbU7dWoEel41QZVymUFFhkrLaeOw4eMRqD07bpbkUn9re4e2PkwVCM' +
  '9xo7yUOl6cHOOK935BORZZs+D2oHrrdlh3HlCLguOkopaHN7a1ac9N47NI0pxUxpmubdDK3sogGBYmRIdnWpXlMbfH89w4/wNi4WxKCJsyDQAAAABJRU5ErkJgggo=' +
  '" />'
};

/* keypress event handler
				'f1':112,
				'f2':113,
				'f3':114, - reserved : search next in browser 
				'f4':115,
				'f5':116, - reserved : refresh in browser 
				'f6':117,
				'f7':118, - reserved : caret browsing (firefox)
				'f8':119,
				'f9':120,
				'f10':121,
				'f11':122,
				'f12':123
*/

function keypressHandler(e) { 
    switch (e.keyCode) {
      case 113: //F2
        //sysp(false);
        if (running) pause();
        else unPause();
        debug('toggle pause: ' + running);
        break;
      case 115: //F4
        //HealFast();
        userLogBox.error('test');
        //unsafeWindow.gm = arguments.callee.caller.toString();
        //console.info(monster);
        console.info(monster.char_stats);
        console.info(monster.preferences);
        console.info(monster.state);

        break;
      case 119: //F8
        debug('toggle log');
        userLogBox.toggle();
        break;
      case 120: //F9
        //userLogBox.hide()();
        showConfig();
        break;
      case 123: //F12
        debug('show log');
        userLogBox.show();
        break;
      default:
        break;
    }
}

function pause(nolog) {
  // Update the running state.
  GM_setValue('isRunning', false);
  running = false;
  $('#PauseButton').text('Resume (F2)').addClass('red');
  // stop any pending actions
  clearInterval(ginterval.interval);
  document.getElementById('monsteraction').innerHTML = MSG_PAUSE;
  document.getElementById('monstertimer').innerHTML = '';

  // Clear all timers.
//  Autoplay.clearTimeout();
//  Reload.clearTimeout();
  //clearTimeout(reloadidle); //disable reload if we are just waiting.
  if (!nolog) userLogBox.add('Autoplayer is paused.','pause Icon');
}

function unPause(nolog) {
  // Update the running state.
  GM_setValue('isRunning', true);
  running = true;
  $('#PauseButton').text('Pause (F2)').removeClass('red');
  //addToLog('play Icon', 'Autoplayer resuming...');
  if ($('#monsteraction').text().indexOf(MSG_PAUSE) != -1) $('#monsteraction').text(gmessage);
  if (!nolog) userLogBox.add('Autoplayer resuming...','play Icon');
  location.reload();
  //main(); //restart the main loop - doesn't work yet, duplicates stats and reloads page...
}

function deleteAllStates(){
  for (var i = 0; i < 4; i++) { GM_deleteValue(i+'state'); }
  debug('deleted all state values');
}

function deleteAllPrefs(){
  GM_listValues().map(GM_deleteValue);
  debug('deleted all script values');
}
// MAIN LOOP (
//(function () {
function main() {
  // Initialize variables
  auto_timer = GM_config.get('timer') || 7;
  var active_module = '';
  parseURL(location.href);
  var reloadidle = (GM_config.get('reload_timer') || 30) * 1000; //time to delay
  if (running) reloadidle = setTimeout(function(){userLogBox.debug('reloading page');location.reload();},reloadidle); // to deal with stuck pages
  // do not do anything on these pages, as it will generate errors.
  switch(current_page) {
    case 'quest-progress':
    case 'quests-start':
    case 'feed-eat':
    case 'fighting-attack':
    case 'store-buy':
      return false;
    default:
    break;
  }
  //if (current_page == 'feed-eat') return; 
  
  GM_registerMenuCommand(scriptMETA['name']+' - Reset all internal states', deleteAllStates);
  GM_registerMenuCommand(scriptMETA['name']+' - Reset all DATA', deleteAllPrefs);
  window.addEventListener('keypress', keypressHandler, true); // for handling shortcut keys
  //check if version info is saved
  var ver=GM_getValue('version');
  if (!ver) {
    GM_setValue('version',scriptMETA['version']);
    ver = GM_getValue('version');
  }
  if (scriptMETA['version'] != GM_getValue('version')) {
    //if different versions reset all data and start over
    //deleteAllPrefs();
    GM_setValue('version',scriptMETA['version']);
  }

  // The page has loaded, the ALREADY_GOING variable makes no further sense
  //mstatus = (mstatus | ALREADY_GOING) ^ ALREADY_GOING;
  galready_going = false;
  var modules = ['manageFeedClan', 'feedCycle', 'buyCycle', 'attackCycle', 'questCycle'];
  var modules_exec = [manageFeedClan_exec, feedCycle_exec, buyCycle_exec, questCycle_exec, attackCycle_exec];
  var modules_fallback = [manageFeedClan_fallback, feedCycle_fallback, buyCycle_fallback, questCycle_fallback, attackCycle_fallback];

  //allmonsters = new Array();
  for (var i = 0; i < 4; i++) {
    allmonsters.push(new Monster(i));
//    userLogBox.debug('monster:'+allmonsters[i].abbrev+
//      ' fd:'+allmonsters[i].canDo('autofeed')+
//      ' ft:'+allmonsters[i].canDo('autofight')+
//      ' qt:'+allmonsters[i].canDo('autoquest')+
//      ' by:'+allmonsters[i].canDo('autobuy'));
  }
  monster = allmonsters[current_type];
  monster.updateData();
  monster.save();
  var action_selected = false;
  //if (monster.preferences.enabled) {
  //GM_log('do modules exist in this?: ' + this[modules[1] + '_exec']); //DEBUG main.caller
  
    /* First try to do something */
    for (var i = 0; i < modules.length; i++) {
      debug('Trying to do something: ' + modules[i]); //DEBUG
      if (modules_exec[i]) action_selected = modules_exec[i]();
      //else GM_log('Error: module does not exist: ' + modules_exec[i]); //DEBUG
      if (action_selected) {
        active_module = modules[i];
        break;
      }
    }
    userLogBox.debug('Chosen Module: ' + active_module + ' action: ' + action_selected); //DEBUG
  //}
  /* If we can not do anything now, wait until the next cycle begins */
  if (!action_selected) {
    var tmp_action;
    var delayed_action = [Infinity];
    for (var i = 0; i < modules.length; i++) {
      debug('Trying to do something fallback: ' + modules[i]); //DEBUG
      if (modules_fallback[i]) tmp_action = modules_fallback[i]();
      //else GM_log('Error: module does not exist: ' + modules[i] + '_fallback'); //DEBUG
      if (tmp_action && tmp_action[0] < delayed_action[0]) {
        delayed_action = tmp_action;
        active_module = modules[i];
      }
    }
    var dl_monster;
    if (delayed_action[0] != Infinity) {
      dl_monster = new Monster(delayed_action[1]);
      //dl_monster.gotoPage('char_stats', null, MSG_WAIT, delayed_action[2]);
      dl_monster.gotoPage('index', {'_fb_fromhash':'227d2ccccdd5ecdda6dc37520228a8f3'}, MSG_WAIT, delayed_action[2]);
      gcountdown = delayed_action[0] - now;
      if (gcountdown > 30) clearTimeout(reloadidle); //disable reload if we are just waiting.
    }
    userLogBox.debug('Chosen fallback Module: ' + active_module + ' action: ' + delayed_action); //DEBUG
  }
  
  //align to left
  $('div.UIStandardFrame_Container').css('margin',0);
  //remove top ad banner
  $('#app'+MONSTER_APP_IDS[current_type] + '_top_banner').remove();
  //remove bottom footer
  $('#pagefooter').remove();
  //click skip button
  var skip=$('input[value="Skip"][name="cancel"].inputsubmit:visible');
  if (skip.length) {
    GM_log('Clicking '+skip.text());
    nHtml.Click(skip[0]);
    //skip.click();
  }
  
  insertMenu();
  //status in the browser title
  var tstr;
  if ((location.href.indexOf('fight') != -1) && monster.canDo('autofight')) tstr = ' fight ' + monster.char_stats.fights;
  else if ((location.href.indexOf('feed') != -1) && monster.canDo('autofeed')) tstr = ' feed ' + monster.char_stats.feeds;
  else tstr = ' ';
  // problem is we need to know if the current page participates in the feed or fight phase, then we can clearly say on top what mode it is. I think we may need auto_mode. or do you a better idea?
  if (monster.canDo('autofight') || monster.canDo('autofeed')) document.title = '[' + monster.abbrev + tstr + '] ' + document.title + ' enhanced by VX';
  else document.title = document.title + ' enhanced by VX';
  // Do we have any auto-functions active?
  if (running) {
    //unPause(true);
    if (gmessage != '') {
      //GM_log('gmessage: ' + gmessage + active_module); //DEBUG
      startActionTimer(active_module);
    } else {
      document.getElementById('monsteraction').innerHTML = MSG_REST;
    }
  }
  else {
    pause(true);
  }

  // Save variables
  monster.save();
//*******************************************end main function*********************************************************
}

// Initialize JS library jquery
//console.assert($ == 'undefined');
console.time('loading jQuery');
if(typeof jQuery == 'undefined' ) {
  // when not using below code
  alert('Please reinstall script to properly install dependencies. You need to have the latest version of Greasemonkey for dependencies to work.');
  // script will still work by dynamically loading the required dependencies (jQuery) but it's not a good idea, as it uses more bandwidth and is slower
  if(typeof unsafeWindow.jQuery == 'undefined') { 
    // Add jQuery dynamically
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://code.jquery.com/jquery-latest.min.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);
    // Check if it's loaded
    GM_wait();
  }
  else { 
    GM_log('jquery already used in webpage'); 
    $ = unsafeWindow.jQuery; 
    letsJQuery(); 
  }
}
else { // GM loaded jQuery correctly
  $ = jQuery; 
  letsJQuery(); 
}
// Check if jQuery's loaded
function GM_wait() {
  if(typeof unsafeWindow.jQuery == 'undefined') { 
    window.setTimeout(GM_wait,100); 
  }
  else { 
    JQ = unsafeWindow.jQuery.noConflict(); // to avoid overwriting the pages use of $
    $ = unsafeWindow.jQuery; 
    letsJQuery(); 
  }
}

// All your GM code must be inside this function
function letsJQuery() {
  //BEGIN PLUGIN SECTION
  $.fn.autoWidth = function(options){
    var settings = { limitWidth : false }
    var maxWidth = 0;
    if(options) jQuery.extend(settings, options);
    this.each(function(){
      if ($(this).width() > maxWidth){
        if(settings.limitWidth && maxWidth >= settings.limitWidth)  maxWidth = settings.limitWidth;
        else maxWidth = $(this).width();
      }
    });
  
    this.width(maxWidth);
  }
  //$('label').autoWidth(); //usage
  //To make the labels flexible, but not to go beyond a fixed width (so to not break a layout), just pass a max/limiting width you don't want them to go beyond:
  //$('label').autoWidth({limitWidth: 350}); 
  //END PLUGIN SECTION  
  debug('loaded jquery:' + $); 
  console.timeEnd('loading jQuery');
  console.time('setting up log & config');
    // Check if page was loaded correctly and not an error
  if (!document.links.length) {
    debug('page with no links found!: reloading page');
    setTimeout(function(){location.reload();},300000); // to deal with stuck pages
    return;
  }
  userLogBox.init();
  //if (GM_DEBUG) USOversionDiff(); //DEBUG
  //if (GM_config.get('log')) userLogBox.init();;
  debug('GM_config:'+GM_config);
  setupConfigPanel(); //have to initialize to access variables used by program
  //DEBUG bind variables for inspection by firebug
  if(GM_DEBUG && unsafeWindow.console){
    unsafeWindow.scriptMain = main;
    //unsafeWindow.monster = monster; //undefined at this point
    unsafeWindow.$jq = $; //expose the jquery object to the console
  }
  console.timeEnd('setting up log & config');
  console.time('main');
  main();
  console.timeEnd('main');
  if(GM_DEBUG && unsafeWindow.console){
    unsafeWindow.monster = monster;
  }
}
//Make script accessible to Firebug wiki.greasespot.net/Code_snippets#Make_script_accessible_to_Firebug
//function a() {return a.caller.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2')}
//document.body.appendChild(document.createElement('script')).innerHTML=a();
//return;

/* vim:set tw=0 sts=0 sw=2 ts=2 ft=javascript: */