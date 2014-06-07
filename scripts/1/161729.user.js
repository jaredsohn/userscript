// ==UserScript==
// @name            Beige's Keyboard Script
// @namespace       www.pardus.at
// @description     Provides additional keyboard-based functionality.
// @grant           none
// @include         http*://artemis.pardus.at/*
// @include         http*://orion.pardus.at/*
// @include         http*://pegasus.pardus.at/*
// @exclude         http*://*.pardus.at/msgframe.php*
// @exclude         http*://*.pardus.at/game.php*
// @exclude         http*://*.pardus.at/menu.php*
// @version         4.2
// @require         http://www.grandunifyingalliance.com/gm/pal/0.7/pal.js
// @author          Richard Broker (Beigeman)
// ==/UserScript==

/* **************************************************************************************************************
 * Note to users, you do not need to be here, everything can be configured from the "Options" tab inside Pardus!
 * **************************************************************************************************************/
var PAL = PardusMonkey("Beige's Combat Script", "PAL52028fe910329");
var doc = document;
var url = doc.location.href; // Don't move this down in the code!
var CONFIG_VERSION = 4.2;    // Only update this if the config changes, or users will lose their config.

/*
 * Localstorage value keys. Used to load script configuration.
 */
var CONFIG_STORAGE_STR = "config";
var COMBAT_MODE_STRING = 'combatMode';

if (!PAL.GetValue("ql_index", null, PAL.e_storageType.SESSION))
    PAL.SetValue("ql_index", 0, PAL.e_storageType.SESSION);

var in_combat = false;
var in_npc_combat = false;
var on_nav = false;
var on_building = false;
var on_building_trade = false;
var on_base = false;
var on_ambush = false;
var on_dock = false;
var on_as = false;
var pilots = [];
var pilot_index = 0;
var ql_index = parseInt(PAL.GetValue("ql_index", 0, PAL.e_storageType.SESSION), 10);
var master_div = doc.createElement('div'); // Create this here, because cloning elements is faster than creating them.

/*
 * QL indexing variables
 * QL Layout: d;m;t;r;;fuen;;;;;;Size;Class;Alliances;Individuals;f;;Size;Class;Alliances;Individuals;20;e
 */
var QL_LENGTH_LEGACY = 22;
var QL_ATTACK_MODE = 0;
var QL_USE_MISSILES = 1;
var QL_TRIGGER_FACTIONS = 5;
var QL_TRIGGER_SIZES = 11;
var QL_TRIGGER_CLASSES = 12;
var QL_TRIGGER_ALLIANCES = 13;
var QL_TRIGGER_INDIVIDUALS = 14;
var QL_EXCLUDE_FACTIONS = 16;
var QL_EXCLUDE_SIZES = 17;
var QL_EXCLUDE_CLASSES = 18;
var QL_EXCLUDE_ALLIANCES = 19;
var QL_EXCLUDE_INDIVIDUALS = 20;
var QL_COMBAT_ROUNDS = 21;

/*
 * Default keybindings
 */
var DEFAULT_KEY_RETREAT = 'r';
var DEFAULT_KEY_RETURN_NAV = 'n';
var DEFAULT_KEY_AMBUSH = 'a';
var DEFAULT_KEY_AMBUSH_RETREAT = 's';
var DEFAULT_KEY_CLOAK = 'c';
var DEFAULT_KEY_DOCK = 'd';
var DEFAULT_KEY_ENTER_BUILDING = 'e';
var DEFAULT_KEY_FLY_CLOSE = 'f';
var DEFAULT_KEY_SET_RP = 'z';
var DEFAULT_KEY_JUMP_WH = 'j';
var DEFAULT_KEY_REFRESH = 'q';
var DEFAULT_KEY_ATTACK_QL_1 = '1';
var DEFAULT_KEY_ATTACK_QL_2 = '2';
var DEFAULT_KEY_ATTACK_QL_3 = '3';
var DEFAULT_KEY_ATTACK_QL_4 = '4';
var DEFAULT_KEY_RAID_BUILDING = '6';
var DEFAULT_KEY_DAMAGE_BUILDING = '7';
var DEFAULT_KEY_PREMIUM_1 = '8';
var DEFAULT_KEY_PREMIUM_2 = '9';
var DEFAULT_KEY_PREMIUM_3 = '0';
var DEFAULT_KEY_PREMIUM_4 = '-';
var DEFAULT_KEY_PREMIUM_5 = '=';
var DEFAULT_KEY_NEXT_QL = ']';
var DEFAULT_KEY_PREVIOUS_QL = '[';
var DEFAULT_KEY_USE_BOTS = 'b';
var DEFAULT_KEY_PREVIOUS_TARGET = ',';
var DEFAULT_KEY_NEXT_TARGET = '.';
var DEFAULT_KEY_COMBAT_MODE_OC = 'i';
var DEFAULT_KEY_COMBAT_MODE_BAL = 'o';
var DEFAULT_KEY_COMBAT_MODE_DC = 'p';
var DEFAULT_KEY_CURRENT_QL = 'v';
var DEFAULT_KEY_SHOW_TARGET = 't';
var DEFAULT_KEY_AUTO_TRADE = ' ';

/*
 * Ship data, name to size/class mappings.
 * Ship names here should match the name of the ship in the image pack!
 */
var SHIP_DATA = { "sabre":{size:12,skulls:1},"rustclaw":{size:63,skulls:0},"interceptor":{size:8,skulls:6},"lanner_mini":{size:45,skulls:0},"harrier":{size:56,skulls:2},"mercury":{size:27,skulls:5},"hercules":{size:66,skulls:1},"lanner":{size:98,skulls:0},"hawk":{size:33,skulls:6},"gargantua":{size:79,skulls:4},"behemoth":{size:206,skulls:0},"liberator":{size:82,skulls:4},"leviathan":{size:408,skulls:0},"wasp":{size:14,skulls:4},"adder":{size:18,skulls:1},"thunderbird":{size:29,skulls:2},"viper_defence_craft":{size:10,skulls:6},"babel_transporter":{size:92,skulls:0},"piranha":{size:24,skulls:6},"nighthawk":{size:29,skulls:6},"nighthawk_deluxe":{size:36,skulls:6},"mantis":{size:134,skulls:2},"extender":{size:104,skulls:0},"gauntlet":{size:68,skulls:6},"doomstar":{size:101,skulls:5},"war_nova":{size:250,skulls:5},"ficon":{size:17,skulls:4},"tyrant":{size:74,skulls:0},"spectre":{size:34,skulls:1},"shadow_stealth_craft":{size:7,skulls:6},"venom":{size:46,skulls:4},"constrictor":{size:131,skulls:0},"phantom_advanced_stealth_craft":{size:23,skulls:6},"dominator":{size:88,skulls:5},"boa_ultimate_carrier":{size:182,skulls:0},"mooncrusher":{size:142,skulls:3},"rustfire":{size:60,skulls:2},"marauder":{size:14,skulls:6},"junkeriv":{size:52,skulls:0},"slider":{size:38,skulls:3},"elpadre":{size:140,skulls:0},"chitin":{size:40,skulls:5},"horpor":{size:78,skulls:4},"scorpion":{size:84,skulls:5},"rover":{size:20,skulls:5},"reaper":{size:50,skulls:6},"blood_lanner":{size:98,skulls:3},"sudden_death":{size:75,skulls:6},"harvester":{size:59,skulls:5},"trident":{size:26,skulls:5},"celeus":{size:90,skulls:0},"pantagruel":{size:39,skulls:5},"vulcan":{size:30,skulls:4},"nano":{size:9,skulls:6},"liberator_eps":{size:85,skulls:4} };

/* *******************************************
 * Main Operations
 * *******************************************/
/* Load configuration from local storage, if it exists. */
var config = JSON.parse(PAL.GetValue(CONFIG_STORAGE_STR));

/* Update old configurations if necessary. Configs from pre-4.0 are no longer readable! */
if (config !== null)
{
    if (config.version !== CONFIG_VERSION)
    {
        if (config.version == 4.1)
        {
            upgrade_4_1_to_4_2();
            PAL.Toast("Your configuration has been successfully updated from 4.1 to 4.2!");
        }
        else
        {
            PAL.Toast("Your configuration for this universe has been reset after a script update because no safe upgrade could be performed from " + config.version + " to " + CONFIG_VERSION, PAL.e_toastStyle.NOTIFY);
            config = null;
        }
    }
}

/* If we have no configuration, use defaults. */
if (config === null)
{
    ApplyDefaultConfig();
    ParseQL();
}

/* Enable debug logging if it's specified in the config. */
SetLoggingLevel();

/*
 * Modify pages we want to before we enable the keypress listeners.
 */
 /* Only do something on the nav if this universe is selected. */
if (config.universeEnabled)
{
    if (PAL.PageIs(PAL.e_page.SHIP_2_SHIP))
    {
        in_combat = true;

        GetCurrentCombatModePvP();
        SetCombatRounds();
        CheckRaid();
        CheckAllMissiles();

        if (config.calculateBotUsage)  UseBots();
        if (config.lowAPWarning)       CheckAP();
    }
    else if (PAL.PageIs(PAL.e_page.NAV))
    {
        CommonNav();

        if (config.useFastCombatModes)
            InjectCombatModeButtons();

        InjectAgiBoostAndTimebombButtons();

        if (PAL.PREnabled())
            PAL.AddPRCallback(CommonNav);
    }
    else if (PAL.PageIs(PAL.e_page.BUILDING))
    {
        on_building = true;

        if (config.lowAPWarning)
            CheckAP();

        if (config.showBuildingHP)
            ShowBuildingHP();

        if (config.checkMissilesMO)
            CheckAllMissilesMO();
    }
    else if (PAL.PageIs(PAL.e_page.BUILDING_TRADE) || PAL.PageIs(PAL.e_page.STARBASE_TRADE) || PAL.PageIs(PAL.e_page.PLANET_TRADE))
    {
        on_building_trade = true;
    }
    else if (PAL.PageIs(PAL.e_page.AMBUSH))
    {
        on_ambush = true;
        var qls = [config.ql1, config.ql2, config.ql3, config.ql4];
        doc.getElementById('readlist').getElementsByTagName('textarea')[0].textContent = qls[ql_index];
    }
    else if (PAL.PageIs(PAL.e_page.ADVANCED_SKILLS))
    {
        on_as = true;
        GetCurrentCombatMode();
    }
    else if (PAL.PageIs(PAL.e_page.STARBASE))
    {
        on_base = true;
    }
    else if (PAL.PageIs(PAL.e_page.LOGOUT))
    {
        on_dock = true;
    }
    else if (PAL.PageIs(PAL.e_page.SHIP_2_NPC))
    {
        in_npc_combat = true;
        GetCurrentCombatModePvP();
        SetCombatRoundsNPC();

        if (config.calculateBotUsage)  UseBots();
        if (config.lowAPWarning)       CheckAP();
    }

    /* Begin listening for keypresses if the script is enabled in this universe. */
    AddKeyboardListener();
}

/* Treat the options page as a special case, because we want to be able to re-enable a page even if it is disabled with config.universeEnabled */
if (PAL.PageIs(PAL.e_page.OPTIONS))
{
    InjectOptionsForm();
}

/* *******************************************
 * Supporting Functions
 * *******************************************/
function ApplyDefaultConfig()
{
    config = {};
    config.version = CONFIG_VERSION;
    config.universeEnabled = true;
    config.ql1 = "d;;;;;feun;;;;;;;;;;;;;;;;1;e";
    config.ql2 = "d;;;;;feun;;;;;;;;;;;;l:145;456;;;1;e";
    config.ql3 = "r;;;;;feun;;;;;;;;;;;;;;;;1;e";
    config.ql4 = "d;m;;;;feun;;;;;;;;;;;;;;;;1;e";
    config.pql = [ {}, {}, {}, {}];    // Parsed QL, contains pre-processed chunks of targeting information.
    config.maxArmor = 540;
    config.armorStrength = 5;          // Required for bot calculation.
    config.newbieThreshold = 240000;   // Pilots with newbie protection.
    config.lowAPThreshold = 2000;      // Level below which to display low AP warning
    config.checkMissilesMO = true;     // Fire all missiles against buildings, or not?
    config.calculateBotUsage = true;   // Auto-fill bot form when dogfighting or not?
    config.alwaysBotToMax = false;     // Always fill the bot form full, even if it wastes a robot.
    config.priorityTargets = "";       // Name priority targets which takes precedence over QL searching.
    config.arrPriorityTargets = [];
    config.useFastRepair = true;       // Add repair links to nav screen?
    config.useFastAB = true;           // Add Agi boost button to nav?
    config.useFastCombatModes = true;  // Add OC/BAL/DC buttons to nav?
    config.useFastTBDeploy = true;     // Add timebomb buttons to nav?
    config.useExclude = true;          // Take into account exclude portion of QL or not (alliance/individuals).
    config.useRangeExclude = true;     // Exclude by size and class as well as individual or alliance.
    config.useRangeInclude = true;     // Include by size and class.
    config.lowAPWarning = true;        // use custom "low AP" warning level
    config.stopOnFirstHostile = true;  // Stop searching for targets after the first QL hit.
    config.showBuildingHP = true;      // Determine buildin health and display it as a number.
    config.enableDebugLogging = false; // Indicates whether to use verbose or minimal logging.
    config.quickMouse = false;         // Enable clicking ship pictures on nav to attack pilots.
    config.key_retreat = DEFAULT_KEY_RETREAT;
    config.key_return_nav = DEFAULT_KEY_RETURN_NAV;
    config.key_ambush = DEFAULT_KEY_AMBUSH;
    config.key_ambush_retreat = DEFAULT_KEY_AMBUSH_RETREAT;
    config.key_cloak = DEFAULT_KEY_CLOAK;
    config.key_dock = DEFAULT_KEY_DOCK;
    config.key_enter_building = DEFAULT_KEY_ENTER_BUILDING;
    config.key_fly_close = DEFAULT_KEY_FLY_CLOSE;
    config.key_set_rp = DEFAULT_KEY_SET_RP;
    config.key_jump_wh = DEFAULT_KEY_JUMP_WH;
    config.key_refresh = DEFAULT_KEY_REFRESH;
    config.key_attack_ql_1 = DEFAULT_KEY_ATTACK_QL_1;
    config.key_attack_ql_2 = DEFAULT_KEY_ATTACK_QL_2;
    config.key_attack_ql_3 = DEFAULT_KEY_ATTACK_QL_3;
    config.key_attack_ql_4 = DEFAULT_KEY_ATTACK_QL_4;
    config.key_raid_building = DEFAULT_KEY_RAID_BUILDING;
    config.key_damage_building = DEFAULT_KEY_DAMAGE_BUILDING;
    config.key_premium_1 = DEFAULT_KEY_PREMIUM_1;
    config.key_premium_2 = DEFAULT_KEY_PREMIUM_2;
    config.key_premium_3 = DEFAULT_KEY_PREMIUM_3;
    config.key_premium_4 = DEFAULT_KEY_PREMIUM_4;
    config.key_premium_5 = DEFAULT_KEY_PREMIUM_5;
    config.key_use_bots = DEFAULT_KEY_USE_BOTS;
    config.key_next_ql = DEFAULT_KEY_NEXT_QL;
    config.key_previous_ql = DEFAULT_KEY_PREVIOUS_QL;
    config.key_previous_target = DEFAULT_KEY_PREVIOUS_TARGET;
    config.key_next_target = DEFAULT_KEY_NEXT_TARGET;
    config.key_combat_mode_oc = DEFAULT_KEY_COMBAT_MODE_OC;
    config.key_combat_mode_bal = DEFAULT_KEY_COMBAT_MODE_BAL;
    config.key_combat_mode_dc = DEFAULT_KEY_COMBAT_MODE_DC;
    config.key_current_ql = DEFAULT_KEY_CURRENT_QL;
    config.key_show_target = DEFAULT_KEY_SHOW_TARGET;
    config.key_auto_trade = DEFAULT_KEY_AUTO_TRADE;
    PAL.SetValue(CONFIG_STORAGE_STR, JSON.stringify(config));
}

function CommonNav()
{
    on_nav = true;

    if (config.lowAPWarning)
        CheckAPNav();

    if (config.useFastRepair)
        InjectRepairButtons();

    if (config.quickMouse)
        AddQuickMouseCallbacks();
}

/* Function by Rhindon. Checks all missiles on combat screen. */
function CheckAllMissiles()
{
    if (config.pql[ql_index].useMissiles === true)
    {
        var el = doc.getElementById('allmissiles');

        if (el)
            el.click();
    }
}

function CheckAllMissilesMO()
{
    var el = doc.getElementById('allmissiles');
    if (el)
    {
        el.click();
    }
}

function CheckRaid()
{
    if (config.pql[ql_index].attackMode.charAt(0) === 'r')
    {
        var el = doc.getElementById('letsurrender');

        if (el)
            el.checked = true;
    }
}

/* Returns either f,u,e or n. */
function GetFaction(table)
{
    var img = table.getElementsByTagName('img')[0];

    if (img)
    {
        var str = img.src.split('/').pop().substr(5,3);

        if (str === "e.p")
            return "n";

        if ((str !== "eps") && (str !== "tss"))
        {
            return str.substr(0,1);
        }
        else
        {
            img = table.getElementsByTagName('img')[3];

            if (img)
                return img.src.split('/').pop().substr(5,1);
        }
    }
    else
    {
        return 'n';
    }

    return "error";
}

function AddQuickMouseCallbacks()
{
    var ships = doc.getElementById('otherships_content');

    if (!ships)
        return;

    for (var i = 0; i < ships.childNodes.length; i++)
    {
        var id = parseInt(ships.childNodes[i].id.match(/\d+/)[0], 10);

        if (!id)
            continue;

        var shipImg = ships.childNodes[i].childNodes[0].childNodes[0].childNodes[0];

        if (!shipImg)
            continue;

        shipImg.setAttribute('onclick', 'return false;'); // Doesn't work in chrome unless you remove the old onclick first.
        shipImg.onclick = QuickMouseCallback(id);
        shipImg.title = "Attack!";

    }
}

function QuickMouseCallback(id)
{
    return function()
    {
        PAL.DebugLog("Attacking by image click: " + id, PAL.e_logLevel.VERBOSE);
        doc.location.href = "ship2ship_combat.php?playerid=" + id;
    };
}

function SetLoggingLevel()
{
    if (config.enableDebugLogging)
        PAL.g_logLevel = PAL.e_logLevel.VERBOSE;
}

/* Determines HP of building, and displays that on the building attack screen. */
function ShowBuildingHP()
{
    var conditionBar = doc.querySelector('td[style="height:1px;"]');
    var conditionTbl = doc.querySelector("table[cellspacing='0'][cellpadding='0'][border='0']");

    // Don't bother with a global regex, it should only appear once in the page.
    conditionTbl.parentNode.innerHTML = conditionTbl.parentNode.innerHTML.replace(/Condition/, "Condition: <b>" + conditionBar.width + "%</b>");
}

/* Set the combat rounds for this attack to the user-selected value. */
function SetCombatRounds()
{
    doc.getElementsByTagName('select')[1].selectedIndex = (config.pql[ql_index].combatRounds - 1);
}

function SetCombatRoundsNPC()
{
    doc.getElementsByTagName('select')[0].selectedIndex = (config.pql[ql_index].combatRounds - 1);
}

/* Locate tag based on it's tag name and name. */
function SearchForTag(tagName, name)
{
    var tags = doc.getElementsByTagName(tagName);

    if (!tagName)
        return null;

    for (var i = 0; i < tags.length; i++)
    {
        if (tags[i].name == name)
            return tags[i];
    }

    return null;
}

/* Locate tag based on it's tag name and name. */
function SearchForTagByValue(tagName, name, value)
{
    return doc.querySelector(tagName + '[name="' + name + '"][value="' + value + '"]');
}

function AddKeyboardListener()
{
    window.addEventListener("keypress", KeypressCallback, true);
}

function KeypressCallback(e)
{
    /* Don't run multiple copies, or interrupt copy paste */
    if ((window.name === '') || e.ctrlKey || e.altKey || e.metaKey || (e.target.nodeName === 'INPUT') || (e.target.nodeName === 'TEXTAREA'))
        return;

    var cha = String.fromCharCode(e.which).toLowerCase();

    PAL.DebugLog("Keypress: " + cha, PAL.e_logLevel.VERBOSE);

    switch (cha)
    {
        case config.key_retreat:
            if (on_building || in_npc_combat)
                SearchForTag('input', 'retreat').click();
            else if (on_nav)
                MoveToRPTile();
            else if (in_combat)
                doc.location.href = "main.php";
        break;

        case config.key_ambush:
            if (on_nav)
                doc.location.href = "ambush.php";
            else if (on_ambush)
                SetAmbush();
        break;

        case config.key_cloak:
            if (on_nav)
            {
                var cloak = doc.getElementById('inputShipCloak');

                if (cloak)
                    cloak.click();
                else
                    doc.getElementById('inputShipUncloak').click();
            }
        break;

        case config.key_dock:
            if (on_nav)
                DockShip();
            if (on_dock)
                UndockShip();
        break;

        case config.key_enter_building:
            if (on_nav)
            {
                var building = doc.getElementById('aCmdBuilding');
                if (building)
                    building.click();

                var base = doc.getElementById('aCmdStarbase');
                if (base)
                    base.click();
            }
        break;

        case config.key_fly_close:
            if ((on_nav && doc.getElementById('aCmdStarbase')) || (on_base))
                doc.location.href  = "main.php?entersb=1";
            else if (doc.getElementById('aCmdExitSb') && on_nav)
                doc.getElementById('aCmdExitSb').click();
        break;

        case config.key_ambush_retreat:
            if (on_nav)
                SetAmbushRP();
        break;

        case config.key_set_rp:
            if (on_nav)
            {
                PAL.SetValue("dfRetreat", PAL.GetPageVariable(PAL.e_pageVar.USER_LOC), PAL.e_storageType.SESSION);

                if (PAL.GetValue("dfRetreat", null, PAL.e_storageType.SESSION))
                    PAL.Toast("Sucessfully saved dogfighting Retreat Point!");
                else
                    PAL.Toast("Dogfighting Retreat point not successfully saved!", PAL.e_toastStyle.ERROR);
            }
        break;

        case config.key_jump_wh:
            if (on_nav)
            {
                var warp = doc.getElementById('aCmdWarp');
                if (warp)
                    warp.click();
            }
        break;

        case config.key_current_ql:
            ShowCurrentQL();
        break;

        case config.key_previous_ql:
            SelectPreviousQL();
        break;

        case config.key_next_ql:
            SelectNextQL();
        break;

        case config.key_next_target:
            if ((on_nav) || (on_building))
                SelectNextTarget();
        break;

        case config.key_previous_target:
            if ((on_nav) || (on_building))
                SelectPreviousTarget();
        break;

        case config.key_refresh:
            ReloadFrame();
        break;

        case config.key_attack_ql_1:
            AttackTarget(0);
        break;

        case config.key_attack_ql_2:
            AttackTarget(1);
        break;

        case config.key_attack_ql_3:
            AttackTarget(2);
        break;

        case config.key_attack_ql_4:
            AttackTarget(3);
        break;

        case config.key_raid_building:
            if (on_building)
                RaidBuilding();
            break;

        case config.key_damage_building:
            if (on_building)
                DamageBuilding();
            break;

        case config.key_premium_1:
            if (in_combat || in_npc_combat)
                PremiumAttack(1);
        break;

        case config.key_premium_2:
            if (in_combat || in_npc_combat)
                PremiumAttack(2);
        break;

        case config.key_premium_3:
            if (in_combat || in_npc_combat)
                PremiumAttack(3);
        break;

        case config.key_premium_4:
            if (in_combat || in_npc_combat)
                PremiumAttack(4);
        break;

        case config.key_premium_5:
            if (in_combat || in_npc_combat)
                PremiumAttack(5);
        break;

        case config.key_use_bots:
            if (in_combat || in_npc_combat)
                SearchForTagByValue('input', 'resid', '8').parentNode.childNodes[3].click();
            else if (on_nav)
                UseBotsNav();
        break;

        case config.key_return_nav:
            if (url.indexOf('entersb=1') >= 0)
                doc.location.href = "main.php?exitsb=1";
            else
                doc.location.href = "main.php";
        break;

        case config.key_combat_mode_oc:
            if (on_nav)
                primeCombatModeNav('OC');
            if ((in_combat) || (on_building) || (in_npc_combat))
                primeCombatModePvP('Offensive');
            if (on_as)
                primeCombatModeNav('Offensive');
        break;

        case config.key_combat_mode_bal:
            if (on_nav)
                primeCombatModeNav('BAL');
            if ((in_combat) || (on_building) || (in_npc_combat))
                primeCombatModePvP('Balanced');
            if (on_as)
                primeCombatModeNav('Balanced');
        break;

        case config.key_combat_mode_dc:
            if (on_nav)
                primeCombatModeNav('DC');
            if ((in_combat) || (on_building) || (in_npc_combat))
                primeCombatModePvP('Defensive');
            if (on_as)
                primeCombatModeNav('Defensive');
        break;

        case config.key_show_target:
            if ((on_nav) || (on_building))
                ShowTarget(true);
        break;

        case config.key_auto_trade:
            var el;

            if (on_building_trade)
            {
                el = doc.getElementById('quickButtonSellAndBuy');

                if (el)
                    el.click();
            }
            else if (on_nav)
            {
                el = doc.getElementById('stdCommand');

                if (el)
                    el.click();
            }
        break;
    }
}

/* Parses QL into segments of useful information for nav scanning. */
function ParseQL()
{
    var config = JSON.parse(PAL.GetValue(CONFIG_STORAGE_STR));
    var i;
    var ql_items = [ config.ql1, config.ql2, config.ql3, config.ql4];

    /* Remove spaces from QL which affect exclusion/targeting, and split each QL into sections. */
    for (i = 0; i < ql_items.length; i++)
    {
        ql_items[i] = ql_items[i].replace(/\s/g, "").split(';');
        PAL.DebugLog("QL" + i + ": " + ql_items[i], PAL.e_logLevel.VERBOSE);
    }

    for (i = 0; i < ql_items.length; i++)
    {
        config.pql[i] = {};

        if (ql_items[i].length >= QL_LENGTH_LEGACY)
        {
            config.pql[i].useMissiles = ql_items[i][QL_USE_MISSILES] ? true: false;
            config.pql[i].attackMode = ql_items[i][QL_ATTACK_MODE];
            config.pql[i].includeFactions = ql_items[i][QL_TRIGGER_FACTIONS];
            config.pql[i].includeSizes = ql_items[i][QL_TRIGGER_SIZES].split(":");
            config.pql[i].includeClasses = ql_items[i][QL_TRIGGER_CLASSES];
            config.pql[i].includeAlliances = ql_items[i][QL_TRIGGER_ALLIANCES].split(',');
            config.pql[i].includeIndividuals = ql_items[i][QL_TRIGGER_INDIVIDUALS].split(',');

            config.pql[i].excludeFactions = ql_items[i][QL_EXCLUDE_FACTIONS];
            config.pql[i].excludeSizes = ql_items[i][QL_EXCLUDE_SIZES].split(":");
            config.pql[i].excludeClasses = ql_items[i][QL_EXCLUDE_CLASSES];
            config.pql[i].excludeAlliances = ql_items[i][QL_EXCLUDE_ALLIANCES].split(',');
            config.pql[i].excludeIndividuals = ql_items[i][QL_EXCLUDE_INDIVIDUALS].split(',');

            config.pql[i].combatRounds = ql_items[i][QL_COMBAT_ROUNDS];

            /* Do bounds checking on the combat round values here, to save on processing when in combat. */
            if (config.pql[i].combatRounds > 20) config.pql[i].combatRounds = 20;
            if (config.pql[i].combatRounds < 1)  config.pql[i].combatRounds = 1;

            PAL.DebugLog("Calculated QL " + i + ":" +
                "\nuseMissiles: " + config.pql[i].useMissiles +
                "\nattackMode: " + config.pql[i].attackMode +
                "\nincludeFactions: " + config.pql[i].includeFactions +
                "\nincludeSizes: " + config.pql[i].includeSizes +
                "\nincludeClasses: " + config.pql[i].includeClasses +
                "\nincludeAlliances: " + config.pql[i].includeAlliances +
                "\nincludeIndividuals: " + config.pql[i].includeIndividuals +
                "\nexcludeFactions: " + config.pql[i].excludeFactions +
                "\nexcludeSizes: " + config.pql[i].excludeSizes +
                "\nexcludeClasses: " + config.pql[i].excludeClasses +
                "\nexcludeAlliances: " + config.pql[i].excludeAlliances +
                "\nexcludeIndividuals: " + config.pql[i].excludeIndividuals +
                "\ncombatRounds: " + config.pql[i].combatRounds,
            PAL.e_logLevel.VERBOSE);
        }
    }

    PAL.SetValue(CONFIG_STORAGE_STR, JSON.stringify(config));
}

/* This is a multi-function function. It takes an argument, which is an index into the array of QLs, and decides whether to reload/engage or attack. */
function AttackTarget(ql)
{
    if (ql !== ql_index)
    {
        ql_index = ql;
        PAL.SetValue("ql_index", ql_index, PAL.e_storageType.SESSION);
    }

    if ((on_nav) || (on_building))
    {
        if (on_nav)
            ScanNav();
        else if (on_building)
            ScanMO();

        /* If there is a target, attack it, otherwise reload. */
        if (pilots.length > pilot_index)
            EngageTarget();
        else
            ReloadFrame();
    }
    else if (in_combat)
    {
        // Setting all of these again is a minor perf hit, but allows people to use a different key
        // after entering combat to use different QL features.
        CheckRaid();
        CheckAllMissiles();
        SetCombatRounds();
        SearchForTagByValue('input', 'ok', 'Attack').click();
    }
    else if (in_npc_combat)
    {
        SetCombatRoundsNPC();
        SearchForTagByValue('input', 'ok', 'Attack').click();
    }

    PAL.DebugLog("Attacking with QL: " + ql_index, PAL.e_logLevel.VERBOSE);
}

function PremiumAttack(buttonIndex)
{
    if (in_combat)
    {
        // Setting all of these again is a minor perf hit, but allows people to use a different key
        // after entering combat to use different QL features.
        CheckRaid();
        CheckAllMissiles();
    }

    doc.querySelector("input" + '[name="button' + buttonIndex + '"]').click();
}

/* Scans the nav screen for targets based on information from the QL. */
function ScanNav()
{
    var ships = doc.getElementById("otherships_content");

    if (!ships) return;

    var tables = ships.getElementsByTagName('table');

    if (!tables) return;

    PAL.DebugLog("Scanning Nav!", PAL.e_logLevel.VERBOSE);

    ScanForTargets(tables, CreatePilotObj, false);
    SortPilotArray();
}

function IsExcludedIndividual(pilot)
{
    if (!config.useExclude)
        return false;

    if (contains(pilot.id, config.pql[ql_index].excludeIndividuals))
        return true;

    return false;
}

function IsExcludedAlliance(pilot)
{
    if (!config.useExclude)
        return false;

    if (contains(pilot.alliance, config.pql[ql_index].excludeAlliances))
        return true;

    return false;
}

/* Set up an object to contain information about a target on the nav. */
function CreatePilotObj(pilotObj, links, faction)
{
    if (links[0].href.indexOf("javascript") >= 0)
    {
        // The partial refresh links are javascript:scanId(<id>, "player")
        pilotObj.id = links[0].href.split('(')[1].split(',')[0];
    }
    else
    {
        // Standard links are main.php?scan_details=<id>&scan_type=player
        pilotObj.id = links[0].href.split('=')[1].split('&')[0];
    }
    pilotObj.name = links[0].textContent;
    pilotObj.faction = faction;
    pilotObj.priorityTarget = false;

    if (links.length > 1) pilotObj.alliance = links[1].href.split('=').pop();
    else pilotObj.alliance = "";
}

/* Sets up an object to contain information about a target from a building screen. */
function CreatePilotObjMO(pilotObj, links, faction)
{
    pilotObj.id = links[0].href.split('=').pop();
    pilotObj.name = links[0].textContent;
    pilotObj.faction = faction;
    pilotObj.priorityTarget = false;

    if (links.length > 1) pilotObj.alliance = links[1].href.split('=').pop();
    else pilotObj.alliance = "";
}

/* Detects targets on building screens. */
function ScanMO()
{
    var ths = doc.getElementsByTagName('th');
    var ships;

    for (var i = 0; i < ths.length; i++)
    {
        if (ths[i].textContent === "Other Ships")
        {
            ships = ths[i].parentNode.parentNode.childNodes[1].childNodes;
            break;
        }
    }

    if (!ships) return;

    PAL.DebugLog("Scanning MO!", PAL.e_logLevel.VERBOSE);

    ScanForTargets(ships, CreatePilotObjMO, false);
    SortPilotArray();
}

/* Generic target detection function shared between PvB and PvP. */
function ScanForTargets(scope, pilotObjFunc, ignorePriorityTargets)
{
    var pilotObj, links, shipName;
    var faction = "";

    /* Reset global variables to prevent stale data being used. */
    pilots = [];

    /* We can ignore this feature, as nothing has been set for it. */
    if (config.arrPriorityTargets.length === 0)
    {
        PAL.DebugLog("No priority targets have been specified in the options!", PAL.e_logLevel.VERBOSE);
        ignorePriorityTargets = true;
    }

    /* Don't do anything if no target is selected. */
    if (Object.keys(config.pql[ql_index]).length === 0)
    {
        PAL.DebugLog("QL is empty, cannot target anyone!", PAL.e_logLevel.VERBOSE);
        return;
    }

    for (var i = 0; i < scope.length; i++)
    {
        if (((pilots.length > 0) && (config.stopOnFirstHostile)) && ignorePriorityTargets === true)
        {
            PAL.DebugLog("Quitting Scan, pilots: " + pilots.length + ", stopOnFirstHostile: " + config.stopOnFirstHostile + ", ignorePriorityTargets " + ignorePriorityTargets, PAL.e_logLevel.VERBOSE);
            break;
        }

        pilotObj = {};
        links = scope[i].getElementsByTagName('a');

        if (links.length > 0)
        {
            /* Don't target NPCs like fuel tankers, detail_type is for buildings, scan_type is for the nav. */
            if (links[0].href.indexOf("player") < 0)
                continue;

            if (on_nav)
                faction = GetFaction(scope[i]);

            pilotObjFunc(pilotObj, links, faction);
            faction = ""; // Prevent faction for a previous pilot being used on a subsequent one!

            PAL.DebugLog(">> PILOT : " + pilotObj.name + ", id: " + pilotObj.id + ", alliance: " + pilotObj.alliance + ", priorityTarget: " + pilotObj.priorityTarget, PAL.e_logLevel.VERBOSE);

            if (IsNewbie(pilotObj.id))
                continue;

            /* Prioritise Target if one is set. */
            if (!ignorePriorityTargets)
            {
                for (var j = 0; j < config.arrPriorityTargets.length; j++)
                {
                    if (config.arrPriorityTargets[j])
                    {
                        if (isNumber(config.arrPriorityTargets[j]))
                        {
                            if (config.arrPriorityTargets[j] === pilotObj.id)
                            {
                                pilotObj.priorityTarget = true;
                                pilots.push(pilotObj);
                                break;
                            }
                        }
                        else if (config.arrPriorityTargets[j].toUpperCase() === pilotObj.name.toUpperCase())
                        {
                            pilotObj.priorityTarget = true;
                            pilots.push(pilotObj);
                            break;
                        }
                    }
                }

                /* This value is only set if the target was found to be a priority */
                if (pilotObj.priorityTarget === true)
                {
                    PAL.DebugLog("Priority Target Locked: " + pilotObj.name, PAL.e_logLevel.VERBOSE);
                    continue;
                }
            }

            /*
             * Range excludes are treated as a special case, we want to ignore whole sets of ships if possible for MO defence
             */
            shipName = null;
            if (on_nav && (config.useRangeExclude || config.useRangeInclude))
            {
                shipName = scope[i].rows[0].cells[0].style.backgroundImage.split('/');
                shipName = stripPaintJobs(shipName[shipName.length - 1].split('.')[0]);

                PAL.DebugLog("Shipname for " + pilotObj.name + ": " + shipName, PAL.e_logLevel.VERBOSE);

                // Exclude class/sizes
                if (config.useRangeExclude)
                {
                    if (config.pql[ql_index].excludeSizes)
                    {
                        if (config.pql[ql_index].excludeSizes.length === 2)
                        {
                            if (shipInSizeRange(shipName, config.pql[ql_index].excludeSizes))
                            {
                                PAL.DebugLog("Excluded by size using excludeSizes: " + config.pql[ql_index].excludeSizes);
                                continue;
                            }
                        }
                    }
                    if (config.pql[ql_index].excludeClasses)
                    {
                        if (shipInClassRange(shipName, config.pql[ql_index].excludeClasses))
                        {
                            PAL.DebugLog("Excluded by class using excludeClasses: " + config.pql[ql_index].excludeClasses);
                            continue;
                        }
                    }
                }
            }

            /*
             * Check if Individual is included/excluded
             */
            if (IsExcludedIndividual(pilotObj))
            {
                PAL.DebugLog("Pilot excluded by individuals portion of QL: " + config.pql[ql_index].excludeIndividuals, PAL.e_logLevel.VERBOSE);
                continue;
            }
            else if (contains(pilotObj.id, config.pql[ql_index].includeIndividuals))
            {
                PAL.DebugLog("Including pilot by id from " + config.pql[ql_index].includeIndividuals, PAL.e_logLevel.VERBOSE);
                pilots.push(pilotObj);
                continue;
            }

             /*
              * Check if alliance is included/excluded
              */
            if (IsExcludedAlliance(pilotObj))
            {
                PAL.DebugLog("Pilot excluded by alliance portion of QL: " + config.pql[ql_index].excludeAlliances, PAL.e_logLevel.VERBOSE);
                continue;
            }
            else if (links.length > 1)
            {
                if (contains(pilotObj.alliance, config.pql[ql_index].includeAlliances))
                {
                    PAL.DebugLog("Pilot included by alliance (" + pilotObj.alliance + "/" + config.pql[ql_index].includeAlliances + ")", PAL.e_logLevel.VERBOSE);
                    pilots.push(pilotObj);
                    continue;
                }
            }

            /*
             * Check if faction is included/excluded
             */
            if ((config.pql[ql_index].excludeFactions.indexOf(pilotObj.faction) >= 0) && (config.useExclude))
            {
                PAL.DebugLog("Pilot excluded by faction (" + pilotObj.faction + "/" + config.pql[ql_index].excludeFactions + ")", PAL.e_logLevel.VERBOSE);
                continue;
            }
            else if (config.pql[ql_index].includeFactions.indexOf(pilotObj.faction) >= 0)
            {
                PAL.DebugLog("Pilot included by faction (" + pilotObj.faction + "/" + config.pql[ql_index].includeFactions + ")", PAL.e_logLevel.VERBOSE);
                pilots.push(pilotObj);
                continue;
            }

            /*
             * If none of the above exclude or inclulde the ship, check if we want to shoot them anyway for their size/class.
             */
            if (shipName)
            {
                // Include by size/class
                if (config.pql[ql_index].includeSizes && config.useRangeInclude)
                {
                    if (config.pql[ql_index].includeSizes.length === 2)
                    {
                        if (shipInSizeRange(shipName, config.pql[ql_index].includeSizes))
                        {
                            PAL.DebugLog("Included by ship size: " + config.pql[ql_index].includeSizes, PAL.e_logLevel.VERBOSE);
                            pilots.push(pilotObj);
                            continue;
                        }
                    }
                }
                if (config.pql[ql_index].includeClasses && config.useRangeInclude)
                {
                    if (shipInClassRange(shipName, config.pql[ql_index].includeClasses))
                    {
                        PAL.DebugLog("Included by ship class: " + config.pql[ql_index].includeClasses, PAL.e_logLevel.VERBOSE);
                        pilots.push(pilotObj);
                        continue;
                    }
                }
            }

            PAL.DebugLog("Did nothing for pilot: " + pilotObj.name, PAL.e_logLevel.VERBOSE);
        }
        else
        {
            if (on_building)
                faction = GetFaction(scope[i]);
        }
    }

    /* If we had a priority target, but they're not available for targeting, then rescan without looking for them. */
    if ((!ignorePriorityTargets) && (((config.stopOnFirstHostile === true) && (pilots.length === 0))))
    {
        ScanForTargets(scope, pilotObjFunc, true);
    }
}

function SortPilotArray()
{
    /* If we have some priority targets from our scan, then sort them to the front of the array. */
    if ((pilots.length > 1) && (config.arrPriorityTargets.length > 0))
    {
        pilots.sort(function sortPilotsByPriority(a, b) {
            if (a.priorityTarget === b.priorityTarget)
            {
                /* If we have multiple priority targets, order them by their order on the config page. */
                if ((a.priorityTarget === true) && (b.priorityTarget === true))
                {
                    /* Determine whether the pilot is prioritised by ID or name. */
                    if (config.arrPriorityTargets.indexOf(a.name) === -1) a = a.id;
                    else a = a.name;

                    if (config.arrPriorityTargets.indexOf(b.name) === -1) b = b.id;
                    else b = b.name;

                    return (config.arrPriorityTargets.indexOf(a) - config.arrPriorityTargets.indexOf(b));
                }
                else
                {
                    return 0;
                }
            }
            else if ((a.priorityTarget === false) && (b.priorityTarget === true))
            {
                return 1;
            }
            else if ((a.priorityTarget === true) && (b.priorityTarget === false))
            {
                return -1;
            }
            return 0;
        });
    }
}

function IsNewbie(id)
{
    if (config.newbieThreshold)
    {
        if (parseInt(id, 10) > parseInt(config.newbieThreshold, 10))
        {
            PAL.DebugLog("id: " + id + ", is > " + config.newbieThreshold + ". Skipping it.", PAL.e_logLevel.VERBOSE);
            return true;
        }
        else
        {
            return false;
        }
    }

    PAL.DebugLog("newbieThreshold is not set!", PAL.e_logLevel.VERBOSE);
    // If for some reason newbieThreshold isn't set, ignore this.
    return false;
}

function RaidBuilding()
{
    var el = SearchForTag("input", "raid");

    if (el)
        el.click();
}

function DamageBuilding()
{
    var el = SearchForTag("input", "destroy");

    if (el)
        el.click();
}

function DockShip()
{
    var dock = doc.getElementById('aCmdDock');

    if (dock)
        dock.click();
}

function UndockShip()
{
    SearchForTagByValue('input', 'login', '1').parentNode.submit();
}

function EngageTarget()
{
    if (pilots.length > pilot_index)
    {
        var target = pilots[pilot_index].id;
        doc.location.href = "ship2ship_combat.php?playerid=" + target;
    }
}

function ReloadFrame()
{
    if (PAL.PREnabled() && PAL.PageIs(PAL.e_page.NAV))
    {
        /* Refresh the current location on nav screen. */
        PAL.ExecuteInPage("navAjax(userloc);");
    }
    else
    {
        // Don't repeat drug or bot use when reloading page.
        if (url.indexOf("?use") < 0)
        {
            url = url.substring(0, url.indexOf("?"));
        }
        doc.location.href = url;
    }
}

/* Determine whether a value exists within an array. */
function contains(value, array)
{
    if (array.indexOf(value) >= 0)
    {
        return true;
    }
    return false;
}

function stripPaintJobs(shipName)
{
    shipName = shipName.replace(/_xmas/gi, '');
    shipName = shipName.replace(/_paint01/gi, '');
    shipName = shipName.replace(/_paint02/gi, '');
    shipName = shipName.replace(/_paint03/gi, '');
    return shipName;
}

/* Determines how many bots to use when on combat screen. */
function UseBots()
{
    var currentArmor = GetCurrentArmorValue();
    var botInput = SearchForTagByValue('input', 'resid', '8');

    if (botInput)
    {
        var botBox = botInput.parentNode.childNodes[1];
        var botAmount = calculateBotRequirement(currentArmor);
        var currentBots = parseInt(botBox.parentNode.parentNode.childNodes[1], 10);

        if (currentBots < botAmount)
        {
            PAL.Toast('WARNING: BOTS LOW!', PAL.e_toastStyle.NOTIFY);
            botAmount = currentBots;
        }

        /* Notify User */
        if (botAmount > 0)
        {
            botBox.value = botAmount;

            PAL.Toast('PRESS "' + config.key_use_bots + '" TO USE ' + botAmount + ' BOTS.', PAL.e_toastStyle.NOTIFY);
        }
    }
}

// Return true if the ship falls within the size range, false if not.
// qlSection should be "excludeSizes" or "includeSizes"
// Dont call this or inClassRange unless qlSection is set!
function shipInSizeRange(shipName, qlSection)
{
    if (shipName)
    {
        var size = SHIP_DATA[shipName].size;
        var operator = qlSection[0];
        var ql_size = parseInt(qlSection[1], 10);

        if (operator === 'g')
        {
            if (size > ql_size) return true;
        }
        else if (operator === 'l')
        {
            if (size < ql_size) return true;
        }
        return false;
    }

    PAL.DebugLog("Ship name is null!", PAL.e_logLevel.VERBOSE);
    return false;
}

// Return true if the ship is within the desired class range (0-6 skulls).
function shipInClassRange(shipName, qlSection)
{
    var skulls = SHIP_DATA[shipName].skulls;

    for(var i = 0; i < qlSection.length; i++)
    {
        if (parseInt(qlSection[i], 10) === skulls) return true;
    }
    return false;
}

function UseBotsNav()
{
    var botsOnBoard = doc.getElementById('tdCargoRes8');

    if (botsOnBoard)
    {
        var botContent = botsOnBoard.textContent;
        var botsAvail = parseInt(botContent.replace(/[^0-9]+/ig,""), 10);
        var botsRequired = calculateBotRequirement(doc.getElementById('spanShipArmor').textContent);
        var body = doc.body;
        var div = doc.createElement('div');

        if (botsAvail < botsRequired) botsRequired = botsAvail;

        if (botsRequired > 0)
        {
            div.innerHTML = '<form id="useform" style="display:none;" action="main.php" method="get" name="useform"><input type="text" name="amount" value="' + botsRequired + '"><input type="hidden" value="8" name="resid"><input type="submit" value="Use" name="useres"></form>';
            body.insertBefore(div, body.childNodes[0]);
            SearchForTagByValue('input', 'useres', 'Use').click();
        }
        else
        {
            PAL.Toast("You don't need to use bots!", PAL.e_toastStyle.NOTIFY);
        }
    }
    else
    {
        PAL.Toast("You don't have any bots!", PAL.e_toastStyle.ERROR);
    }
}

function SetAmbushRP()
{
    var div = doc.createElement('div');
    var body = doc.body;
    div.innerHTML = '<form name="retreat_point" style="display:none;" method="post" action="main.php"><input type="submit" name="retreat_point_set" value="Yes"></form>';
    body.insertBefore(div, body.childNodes[0]);
    SearchForTagByValue('input', 'retreat_point_set', 'Yes').click();
}

function CheckAP()
{
    var boldTags = doc.getElementsByTagName('b');
    var found = false;
    var ap = 0;

    for (var i = 0; i < boldTags.length; i++)
    {
        if (boldTags[i].textContent.indexOf("Your APs:") >= 0)
        {
            ap = boldTags[i].textContent.split(' ').pop();
            found = true;
            break;
        }
    }

    if (!found)
        return;

    if (ap < config.lowAPThreshold)
    {
        PAL.Toast('WARNING: LOW AP', PAL.e_toastStyle.NOTIFY);
    }
}

/* Changes colour of AP counter when it falls below user-defined level. */
function CheckAPNav()
{
    var apSpan = doc.getElementById('apsleft');

    if (apSpan)
    {
        if (parseInt(apSpan.textContent, 10) < config.lowAPThreshold)
        {
            apSpan.style.backgroundColor = '#A00';
            apSpan.style.color = '#DDD';
        }
    }
}

function CreatePlainDiv(innerHTML, width)
{
   var notification = master_div.cloneNode(true);
   notification.style.cssText = 'padding:2px; text-align:center;width:' + width + ';margin: 0 auto;';
   notification.innerHTML = innerHTML;
   return notification;
}

/* Gets current armor from combat screen. */
function GetCurrentArmorValue()
{
    var fonts = doc.getElementsByTagName('font');

    for (var i = 0; i < fonts.length; i++)
    {
        if (fonts[i].textContent.indexOf('Armor points:') >= 0)
        {
            return fonts[i].textContent.split(" ").pop();
        }
    }
}

/* Calculate how many bots are needed to repair damaged armor. Non-wasteful. */
function calculateBotRequirement(currentArmor)
{
    var perBot = (180 / config.armorStrength);
    var armorLost = (config.maxArmor - currentArmor);

    /* If we can't repair armor exactly, don't waste a bot */
    if (armorLost >= perBot)
    {
        if (config.alwaysBotToMax)
            return Math.ceil(armorLost / perBot);
        else
            return Math.floor(armorLost / perBot);
    }

    return 0;
}

/* If you're on a planet or base, adds repair links to the nav. */
function InjectRepairButtons()
{
    var sb = doc.getElementById('aCmdStarbase');
    var planet = doc.getElementById('aCmdPlanet');

    if ((sb) || (planet))
    {
        var target = doc.getElementById('yourship_content');
        if (target && (!doc.getElementById('fastRepair')))
        {
            var repairEquipmentForm = '<form id="fastRepair" style="display:inline;" method="post" action="ship_equipment.php"><input type="hidden" value="regenerateall" name="action"><input type="hidden" value="repair" name="sort"><input type="submit" value="Ship" style="width:55px;margin:0 5px;"></form>';
            var repairShipForm = '<form style="display:inline;" method="post" action="ship_equipment.php"><input type="hidden" value="repairall" name="action"><input type="hidden" value="repair" name="sort"><input type="submit" value="Equipment" style="width:80px;margin:0 5px;"></form>';

            target.appendChild(CreatePlainDiv("<strong>Fast Repair:</strong><br>" + repairEquipmentForm + repairShipForm, "95%"));
        }
    }
}

/* Adds OC/BAL/DC Buttons to the nav screen. */
function InjectCombatModeButtons()
{
    var target = doc.getElementById('cargo');
    var oc_class = "", dc_class = "", bal_class = "";

    if (target)
    {
        switch(PAL.GetValue(COMBAT_MODE_STRING))
        {
            case 'OC':
                oc_class = 'class="disabled" disabled=""';
            break;
            case 'DC':
                dc_class = 'class="disabled" disabled=""';
            break;
            case 'BAL':
                bal_class = 'class="disabled" disabled=""';
            break;
        }

        var offensiveCombatForm = '<form style="display:inline;" method="post" action="overview_advanced_skills.php"><input type="hidden" value="switch_combat_mode" name="action"><input type="hidden" value="offensive" name="combat_mode"><input type="submit" ' + oc_class + ' value="OC" name="btn" style="width:50px;margin:0 5px;"></form>';
        var balancedCombatForm = '<form style="display:inline;" method="post" action="overview_advanced_skills.php"><input type="hidden" value="switch_combat_mode" name="action"><input type="hidden" value="balanced" name="combat_mode"><input type="submit" ' + bal_class + ' value="BAL" name="btn" style="width:50px;margin:0 5px;"></form>';
        var defensiveCombatForm = '<form style="display:inline;" method="post" action="overview_advanced_skills.php"><input type="hidden" value="switch_combat_mode" name="action"><input type="hidden" value="defensive" name="combat_mode"><input type="submit" ' + dc_class + ' value="DC" name="btn" style="width:50px;margin:0 5px;"></form>';

        target.appendChild(CreatePlainDiv(offensiveCombatForm +  balancedCombatForm + defensiveCombatForm, '210px'));
    }
}

function InjectAgiBoostAndTimebombButtons()
{
    var target = doc.getElementById('cargo');

    if (target)
    {
        var html = '';
        var abForm = '<form style="display:inline;" method="post" action="overview_advanced_skills.php"><input type="hidden" value="boost" name="action"><input type="hidden" value="agility" name="boost"><input type="submit" value="AB" style="width:50px;margin:0 5px;"></form>';
        var tb1Form = '<form style="display:inline;" method="post" action="overview_advanced_skills.php"><input type="hidden" value="deploy_timebomb" name="action"><input type="hidden" value="type_1" name="timebomb_type"><input type="submit" value="TB1" style="width:50px;margin:0 5px;"></form>';
        var tb2Form = '<form style="display:inline;" method="post" action="overview_advanced_skills.php"><input type="hidden" value="deploy_timebomb" name="action"><input type="hidden" value="type_2" name="timebomb_type"><input type="submit" value="TB2" style="width:50px;margin:0 5px;"></form>';

        if (config.useFastAB)
        {
            html += abForm;
        }
        if (config.useFastTBDeploy)
        {
            html += tb1Form;
            html += tb2Form;
        }

        target.appendChild(CreatePlainDiv(html, "210px"));
    }
}

/* Determines and stores which combat mode you're currently in so that this state information is available on other pages. */
function GetCurrentCombatMode()
{
    var oc = SearchForTagByValue('input', 'combat_mode', 'offensive');
    var bal = SearchForTagByValue('input', 'combat_mode', 'balanced');
    var dc = SearchForTagByValue('input', 'combat_mode', 'defensive');

    if (!oc) PAL.SetValue(COMBAT_MODE_STRING, "OC");
    else if (!dc) PAL.SetValue(COMBAT_MODE_STRING, "DC");
    else if (!bal) PAL.SetValue(COMBAT_MODE_STRING, "BAL");
}

function GetCurrentCombatModePvP()
{
    var oc = SearchForTagByValue('input', 'combat_mode', 'Offensive');
    var bal = SearchForTagByValue('input', 'combat_mode', 'Balanced');
    var dc = SearchForTagByValue('input', 'combat_mode', 'Defensive');

    if (!oc) PAL.SetValue(COMBAT_MODE_STRING, "OC");
    else if (!dc) PAL.SetValue(COMBAT_MODE_STRING, "DC");
    else if (!bal) PAL.SetValue(COMBAT_MODE_STRING, "BAL");
}

/* mode must be either "Offensive", "Balanced" or "Defensive" */
function primeCombatModePvP(modeStr)
{
    var mode = SearchForTagByValue('input', 'combat_mode', modeStr);
    if (mode)
    {
        mode.click();
    }
}

function primeCombatModeNav(modeStr)
{
    var mode = doc.querySelector('input[value="' + modeStr + '"]');
    if (mode)
    {
        mode.click();
    }
}

/* Mov to pre-set RP. */
function MoveToRPTile()
{
    var rp = PAL.GetValue("dfRetreat", 0, PAL.e_storageType.SESSION);
    if (rp !== 0)
    {
        if (PAL.PREnabled())
        {
            PAL.ExecuteInPage("navAjax(" + rp + ");");
        }
        else
        {
            PAL.ExecuteInPage("nav(" + rp + ");");
        }
    }
}

function SetAmbush()
{
    var b = doc.getElementsByTagName('b');
    var ql_set = false;

    for(var i = 0; i < b.length; i++)
    {
        if (b[i].textContent === 'Quicklist parsed and applied successfully!')
        {
            ql_set = true;
            break;
        }
    }

    if (ql_set)
    {
        SearchForTagByValue('input', 'confirm', 'Lay Ambush').click();
    }
    else
    {
        SearchForTagByValue('input', 'apply_ql', 'Apply Quicklist').click();
    }
}

function SelectPreviousQL()
{
    if (ql_index !== 0)
    {
        ql_index--;

        PAL.Toast("Using QL: #" + (ql_index + 1) + " for target preview/ambushing", PAL.e_toastStyle.NOTIFY);

        PAL.SetValue("ql_index", ql_index, PAL.e_storageType.SESSION);
    }
}

function ShowCurrentQL()
{
    PAL.Toast("Current QL is: #" + (ql_index + 1), PAL.e_toastStyle.NOTIFY);
}

function SelectNextQL()
{
    if ((ql_index + 1) < config.pql.length)
    {
        ql_index++;

        PAL.Toast("Using QL: #" + (ql_index + 1) + " for target preview/ambushing", PAL.e_toastStyle.NOTIFY);
        PAL.SetValue("ql_index", ql_index, PAL.e_storageType.SESSION);
    }
}

/* Selects another target on nav screen. */
function SelectNextTarget()
{
    if (!config.stopOnFirstHostile)
    {
        if ((pilot_index + 1) < pilots.length)
        {
            pilot_index++;
            ShowTarget();
        }
    }
}

/* Selects another target on nav screen. */
function SelectPreviousTarget()
{
    if (!config.stopOnFirstHostile)
    {
        if (pilot_index !== 0)
        {
            pilot_index--;
            ShowTarget();
        }
    }
}

function ShowTarget(verbose)
{
    /* If we don't have any pilot data, get some first. */
    if (on_nav)
        ScanNav();
    if (on_building)
        ScanMO();

    var pilot = pilots[pilot_index];
    var priority = "";

    if (pilot)
    {
        if (config.priorityTargets)
        {
            if (pilot.priorityTarget === true)
            {
                priority = "Priority ";
            }
        }

        if (pilots.length > 0)
        {
            PAL.Toast(priority + "Target Locked: " + pilots[pilot_index].name);
            return;
        }
    }
    else if (verbose === true)
    {
        PAL.Toast("No target!", PAL.e_toastStyle.NOTIFY);
    }
}

/* *******************************************
 * Add config for script on "options" tab in game.
 * ******************************************* */
function InjectOptionsForm()
{
    PAL.AddConfiguration(
        [
            ["Settings are specific to each universe, so make sure you repeat this configuration for each universe you play!<h3>Ship Settings</h3>"],
            ["Armor value you want to return to when using bots (e.g. 720):", "maxArmor"],
            [],
            ["Your ship's armor strength (e.g. x5):", "armorStrength", [1,2,3,4,5,6]],
            ["<h3>Targeting Settings</h3><b>Note:</b> QL exclusion/inclusion by bounty or friend/foe is not possible. Targeting priorities are calculated as follows:<ol><li>Priority Targets Included</li><li>QL Size/Class Excluded</li><li>QL Individuals Excluded</li><li>QL Individuals Included</li><li>QL Alliances Excluded</li><li>QL Alliances Included</li><li>QL Factions Excluded</li><li>QL Factions Included</li><li>QL Size/Class Included</li></ol>For example, if someone is individually included and individually excluded, then the exclude will take priority, and that person will not be targeted."],
            [],
            ["Quicklist #1:", "ql1"],
            [],
            ["Quicklist #2:", "ql2"],
            [],
            ["Quicklist #3:", "ql3"],
            [],
            ["Quicklist #4:", "ql4"],
            [],
            ["Priority target names or IDs, these will be prioritised based on the order they are listed here (separate targets with commas):", "priorityTargets"],
            [],
            ["Exclude pilots with IDs greater than this value (e.g. those invulnerable due to newbie protection):", "newbieThreshold"],
            [],
            ["Stop looking for targets after first QL match (faster)", "stopOnFirstHostile"],
            ["Exclude by individual/alliance/faction", "useExclude"],
            ["Include by ship class/size", "useRangeInclude"],
            ["Exclude by ship class/size", "useRangeExclude"],
            ["<h3>General Settings</h3>"],
            ["Enable script for this universe", "universeEnabled"],
            ["Auto-check missiles in PvB", "checkMissilesMO"],
            ["Auto-calculate bot use.", "calculateBotUsage"],
            ["Always repair to specified value (wasteful if at max armor)", "alwaysBotToMax"],
            ["Enable Debug Logging (slower)", "enableDebugLogging"],
            ["<h3>User Interface Modifications</h3>"],
            ["Turn AP counter red when below configured number of AP", "lowAPWarning"],
            ["Add ship/equipment repair buttons to the nav screen", "useFastRepair"],
            ["Add agi-boost button to the nav screen","useFastAB"],
            ["Add timebomb buttons to the nav screen", "useFastTBDeploy"],
            ["Add OC/BAL/DC buttons to the nav screen", "useFastCombatModes"],
            ["Show building HP number when attacking", "showBuildingHP"],
            ["Click Ship Images to Attack Pilots", "quickMouse"],
            [],
            ["Show low AP warning when below this many AP:", "lowAPThreshold"],
            []
        ],
        PAL.e_configAttach.LEFT,
        "General Configuration",
        StoreConfiguration,
        config
        );

    PAL.AddConfiguration(
    [
        ["<h3>Keybindings</h3><p>These must be unique, and lower case. You cannot bind multiple actions to one key, and you cannot leave a keybinding unset.</p>"],
        ["Retreat from PvP or PvB, or to dogfighting RP", "key_retreat"],
        ["Return to nav screen", "key_return_nav"],
        ["Enter ambush, apply QL and set ambush", "key_ambush"],
        ["Set ambush RP", "key_ambush_retreat"],
        ["Cloak/Uncloak ship", "key_cloak"],
        ["Dock/undock", "key_dock"],
        ["Enter building/starbase", "key_enter_building"],
        ["Enter/Leave fly close to starbase", "key_fly_close"],
        ["Set dogfighting RP", "key_set_rp"],
        ["Jump through wormhole", "key_jump_wh"],
        ["Refresh the current page", "key_refresh"],
        ["Refresh/Engage/Attack with QL #1", "key_attack_ql_1"],
        ["Refresh/Engage/Attack with QL #2", "key_attack_ql_2"],
        ["Refresh/Engage/Attack with QL #3", "key_attack_ql_3"],
        ["Refresh/Engage/Attack with QL #4", "key_attack_ql_4"],
        ["Raid Building", "key_raid_building"],
        ["Damage Building", "key_damage_building"],
        ["Premium Attack 1", "key_premium_1"],
        ["Premium Attack 2", "key_premium_2"],
        ["Premium Attack 3", "key_premium_3"],
        ["Premium Attack 4", "key_premium_4"],
        ["Premium Attack 5", "key_premium_5"],
        ["Show currently selected QL", "key_current_ql"],
        ["Show current target", "key_show_target"],
        ["Use bots", "key_use_bots"],
        ["Use previous QL for target preview/ambushing", "key_previous_ql"],
        ["Use next QL for target preview/ambushing", "key_next_ql"],
        ["Previous target*", "key_previous_target"],
        ["Next target*", "key_next_target"],
        ["Change to OC combat mode on nav or in combat", "key_combat_mode_oc"],
        ["Change to BAL combat mode on nav or in combat", "key_combat_mode_bal"],
        ["Change to DC combat mode on nav or in combat", "key_combat_mode_dc"],
        ["Auto trade with buildings/perform default action for tile", "key_auto_trade"],
        [],
        ['* Cycling through targets is not possible if you have "Stop looking for targets after first QL match" enabled.']
    ],
    PAL.e_configAttach.RIGHT,
    "Keybindings",
    StoreConfiguration,
    config);
}

function StoreConfiguration()
{
    if (!(VerifyKeybindings() && VerifyNumericFields()))
        return;

    ParsePriorityTargets();
    PAL.SetValue(CONFIG_STORAGE_STR, JSON.stringify(config));
    ParseQL();
    PAL.Toast("Successfully saved your settings!");
}

function ParsePriorityTargets()
{
    if (config.priorityTargets !== "")
    {
        config.arrPriorityTargets = config.priorityTargets.split(",");

        for (var i = 0; i < config.arrPriorityTargets.length; i++)
        {
            config.arrPriorityTargets[i] = config.arrPriorityTargets[i].replace(/(^\s*)|(\s*$)/gi,"");
        }
    }
    else
    {
        config.arrPriorityTargets = [];
    }
}

function VerifyNumericFields()
{
    if (!isNumber(config.maxArmor))
    {
        PAL.Toast("Maximum Armor value must be a number!", PAL.e_toastStyle.ERROR);
        return false;
    }
    if (!isNumber(config.newbieThreshold))
    {
        PAL.Toast("Newbie ID exclusion value must be a number!", PAL.e_toastStyle.ERROR);
        return false;
    }
    if (!isNumber(config.lowAPThreshold))
    {
        PAL.Toast("Low AP Threshold must be a number!", PAL.e_toastStyle.ERROR);
        return false;
    }
    return true;
}

function VerifyKeybindings()
{
    var keybinds = [];

    for (var property in config)
    {
        if (property.indexOf("key_") >= 0)
            keybinds.push(config[property]);
    }

    keybinds.sort();

    for (var i = 0; i < keybinds.length - 1; i++)
    {
        if (keybinds[i + 1] == keybinds[i])
        {
            PAL.Toast("Keybinds must be unique, you have two '" + keybinds[i] + "' characters", PAL.e_toastStyle.ERROR);
            return false;
        }

        /* Check if letters are all lower case, ignore numbers and punctuation. */
        if (keybinds[i].search(/[^a-zA-Z]+/) === -1)
        {
            if (keybinds[i] == keybinds[i].toUpperCase())
            {
                PAL.Toast("Keybinds must be all lowercase", PAL.e_toastStyle.ERROR);
                return false;
            }
        }
    }
    return true;
}

/* Validate numeric inputs. */
function isNumber(n)
{
    n = n.replace(/,/,".");
    return (!isNaN(parseFloat(n)) && isFinite(n));
}

function upgrade_4_1_to_4_2()
{
    config.quickMouse = false;
    config.key_premium_1 = DEFAULT_KEY_PREMIUM_1;
    config.key_premium_2 = DEFAULT_KEY_PREMIUM_2;
    config.key_premium_3 = DEFAULT_KEY_PREMIUM_3;
    config.key_premium_4 = DEFAULT_KEY_PREMIUM_4;
    config.key_premium_5 = DEFAULT_KEY_PREMIUM_5;
    config.version = 4.2;
    PAL.SetValue(CONFIG_STORAGE_STR, JSON.stringify(config));
}
