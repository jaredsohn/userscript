alert("Important note from the Pirates Helper script author: you will get banned from the Pirates app for using this script.  The script is currently disabled.  Uninstall the it -- or if you really want to continue, edit the script and remove the first two lines from the top of the file to enable it.  You have been warned.  -Edward Teach");
return;
/* -*- javascript -*-

This is a Greasemonkey script (http://greasespot.net/).  It
provides several enhancements to the Facebook Pirates application
including a mode in which sailing and exploring are automated to a
large extent.  If you like the Pirates app and fear that it is
going to give you repetitive motion disorder from all the mouse
clicking, this script may be for you.  

FEATURES:
* Many behaviors can be customized via preference settings using
  the "about:config" URL.  The corresponding preference names are
  given in parenthesis below.  More details are in the comments 
  of the preferences initialization code below.
* Replaces the Facebook sidebar with nagivation links to the
  trading post, level upgrade, shipyard, and tavern brothel.
* Auto sailing/exploring mode (mostly hands-off, just sit back and watch it run)
  - enabled/disabled via an item in the User Script Command menu (a_auto_mode)
  - a configurable number of steps, i.e. pages, are taken on your behalf before pausing (b_max_steps)
  - auto-mode can be automatically disabled when pausing (c_auto_disable)
  - automatically searches for booty on islands
  - automatically pillages towns
  - automatically buries coins when you get more than the configured limit (d_coin_limit)
  - automatically eats ham or pauses if your hit points fall below a configured threshold (e_health_action)
  - skips bomb throwing, configurable if you want to throw bombs (f_throw_bombs)
  - skips ship attacks, configurable if you want to attack ships (g_attack_ships)
  - pauses when prompted to trade with another ship.
  - pause when you find a sextant or bomb so it can be sold immediately (h_stop_for_booty)
  - pause when you are invited to go on a quest for treasure (j_stop_for_quests)
  - from safe waters, bury coins and transition into enemy waters (i_prefer_enemy_waters)
  - resumes from the error page if you don't manually click 'Try Again' within 15 seconds.
  - stops to trade or attack merchant ships, configurable with (l_stop_for_merchant_ships)
  - configurable to maintain a minimum number of coins on-board (m_min_coins)
* Monitors the price of level upgrades and generates an alert when
  the price falls below a configured threshold (k_level_up_price_alert)
* Removes most advertising (x_strip_ads)

CAVEATS:
* This script still requires that you know what you are doing.  The
  automations only do so much and you will still have to manually
  buy, sell, trade, attack, throw bombs, level up, refresh crew, quest, etc.
* I developed this script soon after becoming a level 100 pirate.
  Needless to say its designed for my own usage patterns - the preference
  values need some tweaking for the beginner or more advanced pirate.

TIPS:
* Once you have enabled auto-mode via the "Tools/Greasemonkey/User
  Script Commands.../Pirates: enable auto-mode" menu item, you set it in
  motion by clicking 'Go Sailin', or one of the explore links on the
  sailing/exploring pages.
* Most non-numerical preference values take a "yes" or "no".  In
  reality, anything that isn't "no" is treated as a "yes", so be
  careful about typos when changing these preference values.
* To disable stopping for booty, such as bombs and sextants, set the
  h_stop_for_booty preference value to "disabled".  See the description
  in the code associated with this preference, below, for more options.
* Set the h_stop_for_booty preference value to 'killed' and auto-mode
  will pause when one of your crew members is killed.
* The best way to quickly stop auto-mode while its running is to 
  click on one of the links near the top of the page such as 'Booty', 
  or 'Leaderboard'.  If this doesnt work you can also change the
  a_auto_enabled preference value to 'no' in the about:config screen.
  To do this hit 'Ctrl-T' to open a new tab in Firefox, type
  'about:config' in the location box, hit Enter, type 'pirate' in the
  filter, hit Enter, right click on the top entry (a_auto_enabled),
  select 'Modify', type 'no', and hit Enter.
* When confronted with an "Auto-mode paused ..." popup message,
  auto-mode will resume as soon as you click on a link to continue
  sailing/exploring/booty-searching/pillaging/etc.
* When confronted with an "Auto-mode stopped ..." popup message,
  auto-mode must be manually re-enabled via the "User Script
  Commands..."  menu item.  Stopping vs. pausing is controlled with
  the c_auto_disable preference.
* To use the level upgrade price alert feature, open a new tab
  (Ctrl-T) and visit the level upgrade page.  This script will
  auto-refresh the page and check the current "price" -- e.g., the
  number of items and coins required to upgrade.  If the numbers are
  all less than the configured limits an alert is raised.  Let the
  script do its thing on this page, while you go back to the other
  tab to pillage, plunder, bomb, etc.  See the comments associated to
  the preference init code of k_level_up_price_alert, below, for more
  details.
* Go to safe waters, dig up all coins, do buisness, go
  sailin',... (auto-mode: coins buried, transition to enemy waters)

HISTORY:
* Version 1.4
  - Added 'min_coins' preference value.  The script will dig up coins to
    ensure you have at least the number configured when in enemy waters.
    The idea here is to reduce the number of crew members killed since
    rumour has it that crewmembers are randomly killed when attacking
    towns without holding enough coins.  Although not 100% effective since
    I've lost crew members going into an attack with hundreds of coins, it
    does appear to significantly reduce the number of kills.  Also, you
    can set the h_stop_for_booty preference value to 'killed' and auto
    mode will pause or stop when one of your crew members is killed.
  - Added a 60 second delay between alerts for the level upgrade price.
  - This version of the script replaces the upgrade link with an
    alert when the price is not the lower than your configured threshold,
    so be sure to disable the level up price alert feature if you don't
    care about upgrade prices.  Disable price alerts by setting the
    k_level_up_price_alert preverence value to 0,1,1,1,1,1,1
  - Added the 'Eat Ham' shortcut link.  I found out that you can eat ham during 
    PvP battles.  During the battle just click 'Eat Ham' instead of firing
    at the enemy and you will be returned back to the battle page with increased
    hit points.  With this strategy it makes sense now to attack merchant ships.
* Version 1.3
  - Added auto navigation from level_up.php back to level_upgrade.php. 
    This allows flash buying without having to move the mouse at all -- 
    in other words, one click per level upgrade purchase!
  - Fixed a problem when throwing bombs at landlubbers in which the page hangs
    after typing the landlubber's name and clicking 'Throw' (updated
    the URL exclusion rules in the script's meta-data).
* Version 1.2
  - Set error page timeout to 15 seconds (was doc'ed at 15, but actually 30).
  - Removed alert when auto-resuming from error page
* Version 1.1 
  - Documentation fixes and updates
  - added this version history (if you don't see it in your script, you have 1.0)
  - added 'stop_for_quests' preference setting
  - added 'stop_for_merchant_ships' preference setting
  - added level-upgrade price monitor mode.
  - added 'safe water' link in the shortcuts
  - added auto resume after hiring wenches
  - added auto-resume from the error page
* Version 1.0 
  - Initial version
--------------------------------------------------------------------
*/
// ==UserScript==
// @name          FB Pirates Helper
// @namespace     http://skull-xbones.org
// @description   
// @include       http://apps.facebook.com/pirates/*
// @exclude       http://apps.facebook.com/pirates/throw_bomb_pick_*
// ==/UserScript==

/*********** SETUP **************/


const pb_auto_mode_id = 'a_auto_mode';
const pb_maxsteps_id = 'b_max_steps';
const pb_auto_disable_id = 'c_auto_disable';
const pb_coin_limit_id = 'd_coin_limit';
const pb_health_action_id = 'e_health_action';
const pb_throw_bombs_id = 'f_throw_bombs';
const pb_attack_ships_id = 'g_attack_ships';
const pb_stop_for_booty_id = 'h_stop_for_booty';
const pb_prefer_enemy_waters_id = 'i_prefer_enemy_waters';
const pb_stop_for_quests_id = 'j_stop_for_quests';
const pb_level_up_price_alert_id = 'k_level_up_price_alert';
const pb_stop_for_merchant_ships_id = 'l_stop_for_merchant_ships';
const pb_min_coins_id = 'm_min_coins';
const pb_strip_ads_id = 'x_strip_ads';


const pb_numsteps_id = 'y_numsteps';
const pb_lu_alert_time_id = 'y_lu_alert_time';
const pb_auto_dig_id = 'y_auto_dig';
const pb_buried_id = 'z_buried';
const pb_coins_id = 'z_coins';
const pb_level_id = 'z_level';
const pb_miles_id = 'z_miles';
const pb_points_id = 'z_points';
const pb_waters_id = 'z_waters';


// Ensure that the named preference exists.  This method creates the
// preference if it doesn't already exist using the supplied default
// value.  This method does not alter the preference value if it
// already exists.
function init_preference( name, default_val)
{
    var value = GM_getValue(name)
    if (!value) GM_setValue(name, default_val);
}

// The following preference values are initialized the the first time
// this script is run. They can be changed at any time by entering
// "about:config" in the Firefox URL location.  This will show all
// Firefox preferences, so filter on "pirate" to reduce the list down
// to the preferences maintained by this script.

// YOU DO NOT NEED TO CHANGE THESE VALUES IN THE SCRIPT.  Use the
// "about:config" URL in Firefox instead.

init_preference( pb_auto_mode_id, 'no');       // Auto-mode is not enabled by default
init_preference( pb_maxsteps_id, 500);         // Maximum automatic steps in auto-mode is 500
init_preference( pb_auto_disable_id, 'no');    // If 'yes', disable auto-mode when max steps have been reached.
init_preference( pb_coin_limit_id, 500);       // When coins reach this limit, bury them at next opportunity
init_preference( pb_throw_bombs_id, 'no');     // Skip the opportunity to throw bombs
init_preference( pb_attack_ships_id, 'no');    // Skip the opportunity to attack other ships

// Stop when certain types of booty are found so they can be
// sold ASAP.  To disable, use a value that doesn't appear on the pirate
// web pages such as 'disabled', otherwise set to '(a)' or
// '(a|b|c|d...)' where a, b, c, d, etc. are the case-insensitive
// booty names shown in report_pillaging_results.php and
// island_booty.php.
init_preference( pb_stop_for_booty_id, '(sextant|bomb)');

// When your current hit points are less than the threshold value
// given in this preference setting, take an action such as eating
// ham, or pausing auto-mode.  The value may indicate a percentage of
// your current level or as an absolute number of hit points.  The
// value must start the '@' sign, followed by an integer or percentage
// (42, or 40%, etc), followed by a space and the action keyword.
// Supported action keywords currently include 'ham', 'pause', or
// 'disabled'.  For the 'ham' action, the script automatically has you
// eat ham.  For 'pause', auto-mode is paused so you can do something
// else manually, like visit the tavern brothel to hire wenches.  When
// 'disabled', the script takes no action regardless of the configured
// threshold value. Percentages work like this -- assume your are a
// level 42 pirate and the value is set to '@50% ham', this script
// will automatically eat ham if your hit points fall below 21
// (42*0.5).  To disable, set to '@0 disabled'.
init_preference( pb_health_action_id, '@30% ham');

// If auto-mode is enabled and you are in safe waters, this sub-mode
// will first bury any unburied coins, then transition back to enemy
// waters.
init_preference( pb_prefer_enemy_waters_id, 'no');

init_preference( pb_stop_for_quests_id, 'yes');  // Stop for quests, or not.
init_preference( pb_stop_for_merchant_ships_id, 'yes');  // Stop to trade-with or attack merchant ships


// The level_up_price_alert preference allows the "level upgrade" price
// alert feature to be customized. The preference value contains a
// comma delimted set of numbers that control the rate at which the
// checks take place and the maximum number of items and coins
// required in order to generate an alert.  The number of items
// required to level up must be less than or equal to the values given
// here in order for the alert to be triggered.  Descriptions of each
// of the 7 values is as follows:
// 1. Number of seconds between automatic refreshes of the level upgrade
//    page. This is the interval the needed amounts are checked. If this
//    value is less than 10, then the alert function is disabled.
// 2. Maximum number of gold bars
// 3. Maximum number of message in bottles
// 4. Maximum number of pirate flags
// 5. Maximum number of swords (required past level 300)
// 6. Maximum number of pistols (required past level 300)
// 7. Maximum number of coins specified as a multiplier against your current level.
//
// So if the currently required amounts of items to level up are less
// than or equal to these maximums given in 2-7, then an alert will be
// raised.  Note that if you haven't obtained level 300 status yet,
// the number of pistols and swords required will be 0 so the 1's in
// position 5 and 6 are still OK for you.
init_preference( pb_level_up_price_alert_id, '60,1,1,1,1,1,1.9');

// When in enemy waters and the number of coins is less than this value, dig this many coins.
init_preference( pb_min_coins_id, 0);

init_preference( pb_strip_ads_id, 'yes');        // Ads are removed default

// The following preference values are automatically maintained by
// this script and shouldn't be edited by hand in the about:config
// page.
init_preference( pb_numsteps_id, 0);            // Current automatic step count, default is 0
init_preference( pb_auto_dig_id, 'no');            // Mini-mode flag used when digging for min_coins
init_preference( pb_waters_id, 'unknown');      // Last know location: enemy or safe waters


// List of shortcuts placed in the sidebar.
var shortcuts = [ 
    'Buy Items', 'http://apps.facebook.com/pirates/item_exchange.php',
    'Sell Items', 'http://apps.facebook.com/pirates/item_exchange.php?action=sell',
    'Level Upgrade', 'http://apps.facebook.com/pirates/level_upgrade.php',
    'Shipyard', 'http://apps.facebook.com/pirates/shipyard.php',
    'Tavern Brothel', 'http://apps.facebook.com/pirates/wenches.php',
    'Safe Waters', 'http://apps.facebook.com/pirates/index.php?pvp=off',
    'Eat Ham', 'http://apps.facebook.com/pirates/item_action.php?item=ham'
];

// Transform the given value into a number if it isn't already.  The
// argument may contain commas, e.g. 42,000 becomes 42000.  Returns a
// primitive number, not a Number object.
function number( n)
{
    if (isNaN(n)) {
        return new Number( n.replace(/,/, '')).valueOf();
    }
    else return n;
}

// Constructor for the EMeta class.  Instances hold 'extraction meta-data'
// for extracting a bit of numerical information from the pirate pages
// (e.g., level, hit points, coins, buried coins, miles from harbor)
function EMeta( charPos, charVal, regexp, groupNum, valueName)
{
    this.charPos = charPos;
    this.charVal = charVal;
    this.regexp = regexp;
    this.groupNum = groupNum;
    this.valueName = valueName;
}
EMeta.prototype = new Object();

// Extraction meta-data
var coinsRE = /Coins: ([0-9,]+) Buried: ([0-9,]+)/;
var emetas = [ 
    new EMeta(0, 'L', /Level (\d+) \S+ Pirate/, 1, pb_level_id),
    new EMeta(0, 'H', /Hit Points: (\d+)/, 1, pb_points_id),
    new EMeta(0, 'C', coinsRE, 1, pb_coins_id),
    new EMeta(0, 'C', coinsRE, 2, pb_buried_id),
    new EMeta(-1, 'y', /(\d+) miles away/, 1, pb_miles_id)
];


// The Enable/Disable menu item is added to the Greasemonkey menu
// here.  This will appear under "Tools/Greasemonkey/User Script
// Commands..." but only when this script is active (i.e., you have to
// be looking at a page from the Pirates application).
var toggleMenuText = 'Pirates: enable auto-mode';
var auto_mode_enabled = (GM_getValue(pb_auto_mode_id) != 'no');
if  (auto_mode_enabled) toggleMenuText = 'Pirates: disable auto-mode';

GM_registerMenuCommand( toggleMenuText, function()
                        {
                            if (GM_getValue(pb_auto_mode_id) != 'no') {
                                GM_setValue(pb_auto_mode_id, 'no');
                                alert( 'Auto-mode disabled');
                            } else {
                                GM_setValue(pb_auto_mode_id, 'yes');
                                alert( 'Auto-mode enabled');
                            }
                        });


var page_url = window.location.href;
/********* UPDATE SIDEBAR / REMOVE ADVERTISING **************/

var sidebar = document.getElementById('sidebar');

if (GM_getValue(pb_strip_ads_id) != 'no')
{
    // Remove the sidebar contents
    if (sidebar) {
        while (sidebar.firstChild) sidebar.removeChild( sidebar.firstChild);
    }

    // Remove Iframes (they contains ads), but only if we aren't on
    // the captcha page since the captcha GUI is also in an iframe.
    if (page_url.indexOf('/captcha_page.php') == -1) {
        var iframes = document.getElementsByTagName('iframe');
        for (var i = 0; i < iframes.length; i++) {
            iframe = iframes[i];
            iframe.parentNode.removeChild(iframe);
        }
    }
}

// Add our shortcuts to the sidebar
if (sidebar) {
    for (var i = 0; i < shortcuts.length; i += 2) {
        var name = shortcuts[i];
        var href = shortcuts[i+1];
        var a = document.createElement('A');
        a.setAttribute('href', href);
        a.appendChild( document.createTextNode(name));
        sidebar.appendChild(a);
        sidebar.appendChild( document.createElement('BR'));
    }
}

// Exit or pause auto-mode depending on the value of the auto_disable preference.
function exit_or_pause( message)
{
    var action;
    if (GM_getValue(pb_auto_disable_id) == 'no') action = 'paused';
    else {
        GM_setValue(pb_auto_mode_id, 'no');
        action = 'stopped';
    }
    alert('Auto-mode '+action+' ' +message);
}

/*******************  RULES BASED ON THE PAGE TEXT CONTENT *******************/

var xPathResult = document.evaluate( './/text()[normalize-space(.) != ""]',
    document.body,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);


var on_explore_page = page_url.match(/\/(explore|index)\.php/);
var on_island_booty_page = (page_url.indexOf('/island_booty.php') >= 0);
var on_booty_page = (page_url.indexOf('/report_pillaging_results.php') >= 0 || on_island_booty_page);
var on_level_upgrade_page = (page_url.indexOf('/level_upgrade.php') >= 0);
var on_hire_wenches_page = (page_url.indexOf('/buy.php?u=wenches') >= 0);
var on_attack_ship_page = (page_url.indexOf('/attack_ship.php') >= 0);

var lu_need_gold_bars = 3;
var lu_need_msg_in_bottle = 3;
var lu_need_pirate_flags = 3;
var lu_need_swords = 0;
var lu_need_pistols = 0;
var lu_need_coins = 3 * GM_getValue( pb_level_id);

var stop_for_booty_str = GM_getValue( pb_stop_for_booty_id);
var stop_for_booty_re = null;
if (stop_for_booty_str.length > 0) stop_for_booty_re = new RegExp(stop_for_booty_str, 'i');

var lu_you_have_func = null; // On level up page, this is reference to a function for assigning number of items we have currently.

for (var i = 0, l = xPathResult.snapshotLength; i < l; i++) {
    var textNode = xPathResult.snapshotItem(i);
    var text = textNode.data;
    var match;
    
    // Stop for certain types of booty - sextants and bombs by default - but configurable in preferences.
    if (on_booty_page && stop_for_booty_re != null && stop_for_booty_re.exec( text))
    {
        exit_or_pause( ' for: ' + text);
        return;
    }

    // Stop if we get offered to go on a quest for treasure.
    if (on_island_booty_page && auto_mode_enabled && text.match(/quest/i))
    {
        if (GM_getValue( pb_stop_for_quests_id) != 'no') exit_or_pause( ' for quest');
        else {
            window.location.href = 'http://apps.facebook.com/pirates/index.php';
            GM_setValue( pb_numsteps_id, pb_numsteps + 1);
        }
        return;
    }

    if (on_explore_page) {

        // Stop to refresh the crew
        if (on_explore_page && text.match(/Yarrr crew demands rest, rum, and wenches!/))
        {
            exit_or_pause( ' because ' + text);
            return;
        }

        // Figure out if we are in safe or enemy waters.
        if (match = /\*(Exploring|Sailing) (\w+) waters!/.exec( text)) {
            GM_setValue( pb_waters_id, match[2]);
        }
        
        // Extract the values for level, hit points, coins, buried coins, and miles from the harbor
        for (var m = 0; m < emetas.length; m++) {
            var emeta = emetas[m];
            
            if ((emeta.charPos >= 0 && text.charAt(emeta.charPos) == emeta.charVal) ||
                (emeta.charPos < 0 && text.charAt(text.length-1) == emeta.charVal))
            {
                var match = emeta.regexp.exec( text);
                if (match) {
                    n = number( match[emeta.groupNum]);
                    try {
                        GM_setValue( emeta.valueName, n);
                    } catch (e) {
                        alert( e + ': ' + emeta.valueName +'='+ n);
                    }
                }
            }
        }
    }

    if (on_level_upgrade_page)
    {
        if (match = /^(\d+) gold bars$/.exec(text)) lu_need_gold_bars = match[1];
        if (match = /^(\d+) message in a bottle$/.exec(text)) lu_need_msg_in_bottle = match[1];
        if (match = /^(\d+) pirate flag$/.exec(text)) lu_need_pirate_flags = match[1];
        if (match = /^(\d+) swords$/.exec(text)) lu_need_swords = match[1];
        if (match = /^(\d+) pistols$/.exec(text)) lu_need_pistols = match[1];
        if (match = /^(\d+) coins$/.exec(text)) lu_need_coins = match[1];
    }

    // resume after hiring wenches
    if (on_hire_wenches_page && auto_mode_enabled && 
        text.indexOf('Your crew is now rejuvenated and ready to hit the high seas') >=0)
    {
        window.location.href = 'http://apps.facebook.com/pirates/index.php';
        GM_setValue( pb_numsteps_id, pb_numsteps + 1);
        return;
    }

    if (on_attack_ship_page && text.indexOf('You\'re fightin!') == 0)
    {
        exit_or_pause( ' to attack ship');
        return;
    }

    // If we land on the error page in auto-mode, give the user 15
    // seconds to manually click 'try again'.  After 15 seconds resume from 
    // where we left off.
    if (auto_mode_enabled && text.indexOf('Error while loading page from ') == 0) {
        unsafeWindow.setTimeout( 
            function() 
            { 
                window.location.href = window.location.href;
            }, 
            15 * 1000);
        return;
    }
}


if (on_level_upgrade_page) {

    var lu_alert_params = GM_getValue( pb_level_up_price_alert_id).split(',');
    if (lu_alert_params.length != 7) {
        alert('Malformed value for '+pb_level_up_price_alert_id+'.  7 fields required, found ' + lu_alert_params.length);
    }
    var refresh_seconds = lu_alert_params[0];
    var max_gold_bars = lu_alert_params[1];
    var max_msg_in_bottle = lu_alert_params[2];
    var max_pirate_flags = lu_alert_params[3];
    var max_swords = lu_alert_params[4];
    var max_pistols = lu_alert_params[5];
    var max_coins = lu_alert_params[6] * GM_getValue( pb_level_id);

    if (refresh_seconds >= 10) {

        /* Show the time the page was last refreshed
        if (sidebar) {
            var match = /(\d+:\d+:\d+)/.exec(new Date().toLocaleString());
            sidebar.appendChild(document.createTextNode( match[1]));
            sidebar.appendChild( document.createElement('BR'));
        }
        */

        if (lu_need_gold_bars <= max_gold_bars &&
            lu_need_msg_in_bottle <= max_msg_in_bottle &&
            lu_need_pirate_flags <= max_pirate_flags &&
            lu_need_swords <= max_swords &&
            lu_need_pistols <= max_pistols &&
            lu_need_coins <= max_coins)
        {
            var lastTime = GM_getValue( pb_lu_alert_time_id);
            if (!lastTime) lastTime = 0;
            var currTime = Math.round(new Date().getTime() / 1000);
            
            // Try to keep the alerts down to a minimum
            if ((currTime - lastTime) > 60) {
                alert( 'Level upgrade price alert!');
                GM_setValue( pb_lu_alert_time_id, currTime);
            }
        }
        else {
            var links = document.evaluate( '//a[@href]', document, null, XPathResult.ANY_TYPE, null);
            var link;
            while (link = links.iterateNext())
            {
                if (link.href.indexOf('/level_up.php') >= 0) {
                    link.href = 'javascript:alert(\'Price not lower than configured.\')';
                    break;
                }
            }

            unsafeWindow.setTimeout( 
                function() 
                { 
                    window.location.reload();
                }, 
                refresh_seconds * 1000);
        }
    }
}

/***************** RULES BASED ON PAGE URL (ANY MODE) *************************/

// Return to the level upgrade page immediately after purchasing a
// level upgrade.  This allows flash buying without having to move
// the mouse at all -- in other words, one click per level upgrade
// purchase!
if (page_url.indexOf('/level_up.php') >= 0) {
    window.location.href = 'http://apps.facebook.com/pirates/level_upgrade.php';
    return;
}


if (GM_getValue(pb_auto_mode_id) == 'no') return;

/************ ALL LOGIC BELOW THIS LINE APPLIES IN AUTO MODE ONLY **************/

var pb_maxsteps = GM_getValue(pb_maxsteps_id);
var pb_numsteps = GM_getValue(pb_numsteps_id);

if (pb_numsteps >= pb_maxsteps) {
    GM_setValue( pb_numsteps_id, 0);
    exit_or_pause( ' because max number of automatic steps reached: ' + pb_numsteps);
    return;
}

var current_waters = GM_getValue( pb_waters_id);

/***************** RULES BASED ON PAGE URL (IN AUTO MODE) *************************/


// Steer clear of enemy ships if so configured
if (page_url.indexOf('/enemy_ship.php') >= 0)
{
    var next = 'http://apps.facebook.com/pirates/attack_ship.php';
    if (GM_getValue( pb_attack_ships_id) == 'no') next = 'http://apps.facebook.com/pirates/clear_action.php';
    GM_setValue( pb_numsteps_id, pb_numsteps + 1);
    window.location.href = next;
    return;
}


// Auto-submit the pillage town page
if (page_url.indexOf('/pillage_town.php') >= 0) {
    var forms = document.forms;
    for (var i = 0; i < forms.length; i++) {
        var form = forms[i];
        if (form.action.indexOf('process_pillaging_results.php') >= 0) {
            GM_setValue( pb_numsteps_id, pb_numsteps + 1);
            form.submit();
            break;
        }
    }
    return;
}

// Bury coins when the number collected has surpassed the configured
// limit, or if we are sailing safe waters and prefer enemy waters.
var pb_coins = GM_getValue(pb_coins_id);
if (page_url.indexOf('/island.php') >= 0)
{
    var pb_coin_limit = GM_getValue(pb_coin_limit_id);

    if (pb_coins >= pb_coin_limit || (GM_getValue(pb_prefer_enemy_waters_id) != 'no' && pb_coins > 0 && current_waters == 'safe')) {
        GM_setValue( pb_numsteps_id, pb_numsteps + 1);
        window.location.href = 'http://apps.facebook.com/pirates/bury_coins_arr.php';
        return;
    }
}

// Return to sailing from the pillaging results page, bury coins page, and dug up coins page
if (page_url.indexOf('/report_pillaging_results.php') >= 0 ||
    page_url.indexOf('/bury_coins_arr.php') >= 0)
{
    GM_setValue( pb_numsteps_id, pb_numsteps + 1);
    window.location.href = 'http://apps.facebook.com/pirates/index.php';
    return;
}

if (page_url.indexOf('/index.php') >= 0 ||
    page_url.indexOf('/explore.php') >= 0)
{

    if (current_waters == 'safe') {
        // When sailing safe waters and our coin count is 0 go back to exploring enemy waters
        if (GM_getValue(pb_prefer_enemy_waters_id) != 'no' && pb_coins == 0) {
            GM_setValue( pb_numsteps_id, pb_numsteps + 1);
            window.location.href = 'http://apps.facebook.com/pirates/index.php?pvp=on';
            return;
        }
    }
    else 
    {
        // In enemy waters make sure we have the minimum number of coins on board
        var min_coins = GM_getValue( pb_min_coins_id);
        var buried_coins = GM_getValue( pb_buried_id);
        if (pb_coins < min_coins && (min_coins - pb_coins) <= buried_coins) {
            GM_setValue( pb_numsteps_id, pb_numsteps + 1);
            GM_setValue( pb_auto_dig_id, 'yes');
            window.location.href = 'http://apps.facebook.com/pirates/retrieve_coins.php';
            return;
        }
    }

    // Take action if our hit points are less than the configured threshold
    var health_action = GM_getValue( pb_health_action_id);
    var level = GM_getValue( pb_level_id);
    var points = GM_getValue( pb_points_id);

    var match = /@(\d+)(%|) (ham|pause|disabled)/.exec( health_action);
    var threshold;
    var action;
    if (!match) {
        alert('Malformed health action value\''+health_action+'\', reset to \'@30% ham\'');
        threshold = 0.3 * level;
        action = 'ham';
    }
    else {
        threshold = match[1];
        if (match[2] == '%') threshold = level * match[1] / 100;
        action = match[3];
    }

    if (action != 'disabled' && points <= threshold) 
    {
        if (action == 'ham') {
            GM_setValue( pb_numsteps_id, pb_numsteps + 1);
            window.location.href = 'http://apps.facebook.com/pirates/item_action.php?item=ham';
            return;
        }
        else if (action == 'pause') {
            exit_or_pause( ' because your hit points are below the configured threshold');
            return;
        }
        else alert('Unrecognized health action: ' + action);
    }
}

// In enemy waters make sure we have the minimum number of coins on board
var min_coins = GM_getValue( pb_min_coins_id);
var auto_dig = GM_getValue( pb_auto_dig_id);
if (min_coins > 0 && auto_dig == 'yes') {
    if (page_url.indexOf('/retrieve_coins.php') >= 0) {
        if (pb_coins < min_coins) {
            var forms = document.forms;
            for (var i = 0; i < forms.length; i++) {
                var form = forms[i];
                if (form.action.indexOf('retrieve_coins.php') >= 0) {
                    
                    var els = form.elements;
                    for (var j = 0; j < els.length; j++) {
                        var el = els[j];
                        try {
                            if (el.name == 'c') {
                                el.value = (min_coins - pb_coins);
                                break;
                            }
                        }
                        catch (e) {}
                    }
                    GM_setValue( pb_numsteps_id, pb_numsteps + 1);
                    form.submit();
                    return;
                }
            }
        }
        // Return to sailing after we have dug them up (no form on retrieve_coins.php after digging)
        GM_setValue( pb_numsteps_id, pb_numsteps + 1);
        GM_setValue( pb_auto_dig_id, 'no');
        window.location.href = 'http://apps.facebook.com/pirates/index.php';
        return;
    }
}

if (page_url.indexOf('/found_merchant_ship.php') >= 0) {
    if (GM_getValue( pb_stop_for_merchant_ships_id) != 'no') {
        exit_or_pause(' to trade with or attack merchant ship');
        return;
    }
    
    window.location.href = 'http://apps.facebook.com/pirates/index.php';
    GM_setValue( pb_numsteps_id, pb_numsteps + 1);
    return;
}



/***************** RULES BASED ON LINKS FOUND IN PAGE ********************/

var links = document.evaluate( '//a[@href]', document, null, XPathResult.ANY_TYPE, null);
var dest = '';
var link;
while (link = links.iterateNext())
{
    if (link.href.indexOf('/throw_bomb_which.php') >= 0)
    {
        if (GM_getValue(pb_throw_bombs_id) != 'no') {
            return; // Stop so the user can throw the bomb
        }
        // else skip throwing the bomb
        dest = 'http://apps.facebook.com/pirates/clear_action.php';
        break;
    }
    else if (link.href.indexOf('/explore.php') >= 0 ||
             link.href.indexOf('/head_towards_land.php') >= 0 ||
             link.href.indexOf('/island_booty.php') >= 0 ||
             link.href.indexOf('/enemy_ship.php') >= 0 ||
             link.href.indexOf('/pillage_town.php') >= 0)
    {
        // follow the link
        dest = link.href;
        if (dest.charAt( dest.length - 1) == '#')
            dest = dest.substr( 0, dest.length - 1);
        break;
    }
}

if (dest.length > 0) {
    GM_setValue( pb_numsteps_id, pb_numsteps + 1);
    window.location.href = dest;
}

