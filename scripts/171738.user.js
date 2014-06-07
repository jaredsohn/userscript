// ==UserScript==
// @name           Neverwinter Gateway - Professions Robot
// @description    Automatically selects professions for empty slots
// @namespace      http://userscripts.org/scripts/show/171738
// @include        https://gateway.playneverwinter.com
// @include        https://gateway.playneverwinter.com/*
// @include        https://gatewaysitedown.playneverwinter.com
// @include        https://gatewaysitedown.playneverwinter.com/* 
// @include        http://gateway.playneverwinter.com
// @include        http://gateway.playneverwinter.com/*
// @include        http://gatewaysitedown.playneverwinter.com
// @include        http://gatewaysitedown.playneverwinter.com/* 
// @updateURL      https://userscripts.org/scripts/source/171738.meta.js
// @downloadURL    https://userscripts.org/scripts/source/171738.user.js
// @originalAuthor Mustex
// @modifiedBy     Bunta
// @version        1.0.0.3
// @license        http://creativecommons.org/licenses/by-nc-sa/3.0/us/
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_listValues
// @grant          GM_deleteValue
// ==/UserScript==

/* RELEASE NOTES
1.0.0.3
    - Fix some gem trading tasks not being filtered correctly
    - Add check for gateway disconnected
1.0.0.2
    - Fix leadership tasks not creating assets correctly
    - Add option to save task lists per character (experimental)
1.0.0.1
    - Rewrite script using client.dataModel methods to massively improve reliability and performance (thanks Msc)
    - AD refining will now only attempt to refine if you are able to collect diamonds
    - Change task lists to use exact task names so no ambiguity exists (no longer requires excluderare option)
    - Asset resources are now trained as needed (only for required slots)
0.3.0.5
    - Fix resources not buying correctly in all cases
    - Fix pause button state saving correctly in firefox
0.3.0.4
    - Add page timeout reloading functions outside of main function (thanks Kreese and Frabtik)
    - Add check to ensure tasks are being started for the correct character
    - Alter next run resolve function to use delay parameter to allow for unique delay timers to be used in certain cases
0.3.0.3
    - Fix ingredient task selection to correctly iterate through all ingredient tasks
    - Alter character selection to pick only exact character name matches
    - Update leadership tasks
0.3.0.2
    - Exclude alchemy from rare task exclusions due to Aqua Regia (thanks Eversor)
    - Reduce GM_setValue calls to avoid tampermonkey failing to save settings (thanks miah)
0.3.0.1
    - Altered mutichar selector to be faster (thanks miah)
    - Updated rare tasks selector (thanks Traktor)
    - Add option to refine AD during character switching (thanks Eversor)
    - Added some level 20 gather tasks
    - Increased supply buying to 100 units
0.3.0.0
    - Added Multi-Character support
    - Added function to clear all saved settings for script
    - Remove disable sound functionality (now configurable in gateway)
0.2.0.1.8
    - Added pause button to allow easy on/off switching
0.2.0.1.7
    - Added option to enable/disable filling optional asset slots
    - Added batch potions tasks to be skipped in ingredient selection
    - Added timer to reload page if stuck loading for too long
    - Added option to disable page sounds
    - Updated license to by-nc-sa
0.2.0.1.6
    - Add configurable option for excluding rare tasks
0.2.0.1.5
    - Add ability to specify specific level for tasks and configure same named artificing resource tasks to request correct level of task
    - Remove purchase notification that never times out
0.2.0.1.4
    - Added functionality to purchase required resources from gateway shop
0.2.0.1.3
    - Add Artificing and Weaponsmithing to Robot
      (Artificing will not work properly yet as all three tiers of gather and craft tasks have the same task name) 
0.2.0.1.2
    - Update reload process
    - Fix optional asset selector with gateway update
0.2.0.1.1
    - Simplify asset selection after they fixed bug in previous gateway update
    - Update level 20 leadership tasks
    - Update with changes in Mustex's script (version 15)
        * Added a secondary timer that will reload the gateway every few hours. This should help with disconnects from the server
        * Implemented tooltips for settings panel
0.1.9.1.15
    - Repeat task reordering for +2 armor
0.1.9.1.14
    - Fix selection of assets after gateway update
    - Skip intensive gather tasks added after gateway update
0.1.9.1.13
    - Change ordering of tasks and ingredient checks
      The purpose of this is to allow crafting of +4 armors if you have +2 ingredients in your inv but to not create them if you don't.
      Creating the ingredients for them is less efficient than crafting ingredients for pants but is more efficient if you already have the ingredients from earlier tasks.
0.1.9.1.12
    - Optimise crafting tasks for highest exp/min gains due to ingredient requirements
0.1.9.1.11
    - Add extra craft tasks for when residuum runs out
0.1.9.1.10
    - Only allow rare tasks to be selected for Leadership
      This avoids craft loops where higher quality rare crafts require ingredients with the same name
0.1.9.1.9
    - Alter craft tasks to favour armor to optimise inventory space
0.1.9.1.8
    - Fix script restart bug when no tasks found
0.1.9.1.7
    - Update search string for Potions (After the task names for elxiirs have been changed)
    - Remove logon error skips to avoid logons sometimes failing on first load (ensure logon details are correct!)
0.1.9.1.6
    - Update tasks for all professions
    - Update ingredient search lists for all professions
0.1.9.1.5
    - Fix regular expression used in potion ingredient search
0.1.9.1.4
    - Alter default timeouts (makes script a lot more stable and less prone to errors)
    - Remove unused variable
    - Add extra logging for task ingredient searches
0.1.9.1.3
    - Fix bug with required resource checks getting stuck on non craftable resources
0.1.9.1.2
    - Added method to check for required task ingredients and choose tasks to create them
      Method is currently hard coded to specify certain search strings for ingredient types
      Currently working for all Alchemy tasks
      There is a current problem that if you have the required potion ingredient but it is in your belt slots
      the task is uncraftable but the ingredients show as available and it will not craft a new one
0.1.9.1
    - Update with changes in Mustex's script (version 12)
        * Added tasks for Platesmithing, Leatherworking, Tailoring
        * Added detection for the gateway being down
0.1.8.3.8
    - Update asset selection to avoid using coloured assets in junk slots for leadership
0.1.8.3.7
    - Update leadership tasks table due to task reward/duration alterations
0.1.8.3.6
    - Add option to enable/disable automation process
    - Update alchemy tasks some more
0.1.8.3.5
    - Add ability to select from multiple tasks with same name (eg Alchemical Research)
    - Add craft options for alchemy potions (need to be manually switched since they use the same ingredients)
0.1.8.3.4
    - Add alchemy tasks up to level 20
0.1.8.3.3
    - Change task slot selection to be user configurable options in settings window
    - Add level 1 alchemical research
0.1.8.3.2
    - Added ability to specify how many tasks of each profession to train multiple professions at once
    - Updated mailsmithing level 0 tasks
0.1.8.3.1
    - Changed asset selection to only update Junk assets
    - Leadership asset selection for bronze tier picks lowest asset first
    - Modified Leadership tasks
0.1.8.3
    - Tweaked Leadership tasks grid
    - Added task grid for Alchemy (Partial) 
0.1.8.2
    - onsave handlers for settings are now called before the settings values are saved
    - Added onsave handler for console to enable/disable using the window console
0.1.8.1
    - Added checking for errors (using the window title) and will navigate back to the main login page if autologin is enabled
0.1.8
    - Added popup for altering settings
    - Settings are saved to script cache
    - Added mailsmithing tasks to task grid
0.1.7
    - Added lower level leadership tasks to grid
    - Added hiring tasks to leadership task
    - Uses saved values to determine which profession type to level (Defaults to Leadership, currently no way to change it)

0.1.5
    - Is now able to recover from missing assets
    - Uses a configurable grid to determine what the next task is to complete

0.1.0
    - Is now able to select some hard coded leadership tasks
    - Can now collect from any completed slot
*/

// Make sure it's running on the main page, no frames
if (window.self !== window.top) {
    throw "";
}

// Set global console variables
var fouxConsole = {log:function(){},info:function(){},error:function(){},warn:function(){}};
var console = unsafeWindow.console || fouxConsole;

// Page Reloading function
// Every second the page is idle or loading is tracked
var loading_reset = false; // Enables a periodic reload if this is toggled on by the Auto Reload check box on the settings panel
var s_paused = false;      // extend the paused setting to the Page Reloading function

(function() {
    var $                  = unsafeWindow.$;
    var state_loading      = 0;   // If "Page Loading" takes longer than 30 seconds, reload page (maybe a javascript error)
    var state_loading_time = 30;  // default of 30 seconds

    var state_idle         = 0;   // If the page is idle for longer than 60 seconds, reload page (maybe a javascript error)
    var state_idle_time    = 120; // default of 120 seconds
    var reload_hours       = [2,5,8,11,14,17,20,23]; // logout and reload every three hours - 2:29 - 5:29 - 8:29 - 11:29 - 14:29 - 17:29 - 20:29 - 23:29
    var last_location      = "";  // variable to track reference to page URL
    var reload_timer       = setInterval(function() {
        if (!s_paused) {
            if (loading_reset) {
                var loading_date       = new Date();
                var loading_sec        = Number(loading_date.getSeconds());
                var loading_min        = Number(loading_date.getMinutes());
                var loading_hour       = Number(loading_date.getHours());
                if (reload_hours.indexOf(loading_hour) >= 0 && loading_min == 29 && loading_sec < 2) {
                    console.log("Auto Reload");
                    unsafeWindow.location.href = "http://gateway.playneverwinter.com";
                    return;
                }
            }
            
            // check for errors
            if ($("title").text().match(/Error/) || $("div.modal-content h3").text().match(/Disconnected/)) {
                console.log("Error detected - relogging");
                unsafeWindow.location.href = "http://gateway.playneverwinter.com";
                return;
            }

            if ($("div.loading-image:visible").length) {
                last_location = location.href;
                state_idle = 0;
                if (state_loading >= state_loading_time) {
                    console.log("Page Loading too long");
                    state_loading = 0;
                    location.reload();
                }
                else {
                    state_loading++;
                    console.log("Page Loading ...", state_loading + "s");
                }
            }
            // TODO: Add check for Gateway disconnected
            //<div class="modal-content" id="modal_content"><h3>Disconnected from Gateway</h3><p>You have been disconnected.</p><button type="button" class="modal-button" onclick="window.location.reload(true);">Close</button>
            

            /* Can't use idle check with dataModel methods
            else if (location.href == last_location) {
                state_loading = 0;
                if (state_idle >= state_idle_time) {
                    console.log("Page Idle too long");
                    state_idle = 0;
                    unsafeWindow.location.href = "http://gateway.playneverwinter.com";
                }
                else {
                    state_idle++;
                    // comment out to avoid console spam
                    //console.log("Page Idle ...", state_idle + "s");
                }
            }
            */
            else {
                last_location = location.href;
                state_loading = 0;
                state_idle = 0;
            }
        }
    },1000);
})();

(function() {

    /**
     * Add a string of CSS to the main page
     *
     * @param {String} cssString The CSS to add to the main page
     */
    function AddCss(cssString) {
        var head = document.getElementsByTagName('head')[0];
        if (!head)
            return;
        var newCss = document.createElement('style');
        newCss.type = "text/css";
        newCss.innerHTML = cssString;
        head.appendChild(newCss);
    }
    function countLeadingSpaces(str) {
        return str.match(/^(\s*)/)[1].length;
    }

    var image_pause = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAY" +
        "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" +
        "BNp57TyT3+MAAAAASUVORK5CYII=";
    var image_play = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYA" +
        "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";
    var image_prefs = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQC" +
        "AMAAAAoLQ9TAAAAllBMVEUAGQASEhIfHx8fJy8pKSk2NjZBQUFJR0ZQUE9RUVFSUlJNX3No" +
        "aGhsaWdramlycG1meY98fHx+fn5wgpV0iqKKh4R4jaR9jJx8kad9kad/mbONmaWEnrmEnrq" +
        "koZy3t7fIx8bKyMHT0c3S0dDU09DV1NPP1t3W1dXY2Njb2tfe29bf3tzj4uHr6+js6+r39/" +
        "f5+PgAAABrL3yvAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTA" +
        "QCanBgAAAAHdElNRQfWBRoFKh31UQ8DAAAAgUlEQVQY022OxxLCMAwFRSc4BEIPJZQQ08v+" +
        "/8+RsTExDDpIe3ijfSJ/hx9g62Dt4GaAI+8YT0t27+BxxvvE/no5pYT10lGFrE34Ja40W3g" +
        "1oMGmW7YZ6hnCYexKTPVkXivuvWe1Cz1aKqPNI3N0slI2TNYZiARJX30qERc7wBPKC4WRDz" +
        "WdWHfmAAAAAElFTkSuQmCC";
    var image_close = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQC" +
        "AQAAAC1+jfqAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfW" +
        "BRkTNhxuPxLkAAAAHXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBUaGUgR0lNUO9kJW4AAAE" +
        "KSURBVCjPhdGxSgNBFAXQMzpgYWwsLEQUDBJBQgqFIChZEPR7/DA/QCGQTgQtJE1ENoWohY" +
        "UgbGKQyFjErNv52nObe19wqGWg7z0l5YVgVdOu+wUt507tqIVQ4Zodp861ooELe15M5KFI6" +
        "Zfr9u25MIj6Jl4cmSIPBWrq2o5cufO4aOJDYSozNTa2pK4t03PtwUdMKRRykAmW0dTRcyNX" +
        "pBQpI8GJDTR050zkNzK0bMMZLvUNZ8yCfy6Wvbc1NVyi4dloXjqWvds6uvp41pFmpVOKJWd" +
        "6bgwxkmTMIotWKpwrfBkZl7uMonUHf5wSlV2+fUZrjnXdzrmyy7djD8GWTW9e51z557o1Tz" +
        "85FH/WkOkaHQAAAABJRU5ErkJggg==";


    // Setup global closure variables
    var $ = unsafeWindow.jQuery;
    var timerHandle = 0;
    var dfdNextRun = $.Deferred();
    var charcurrent = 0; // current character counter
    var settingwipe = false; // Use to wipe stored settings
    var delay = {
        SHORT   : 1000,
        MEDIUM  : 5000,
        LONG    : 30000,
        MINS    : 300000,
        DEFAULT : 10000, // default delay
        TIMEOUT : 60000, // delay for cycle processing timeout
    };

    /*
     * Tasklist can be modified to configure the training you want to perform.
     * The configurable options window sets how many profession slots you want to use for each profession.
     * The level array below for each professions specifies the tasks you want to learn at each crafting level.
     * Each craft slot will pick the first task that meets requirements.
     * See http://pastebin.com/VaGntEha for Task Name Map.
     * Some names above do not match, use below code to check:
     * var tasks = client.dataModel.model.craftinglist['craft_' + profname].entries.filter(function(entry) { return entry.def && entry.def.displayname == taskname; }); tasks[0].def.name;
     */
    var tasklist;
    var defaultTasklist = [
        {
            taskName:"Leadership",
            level: {
                 0:["Leadership_Tier0_Intro_1"],
                 1:["Leadership_Tier0_Intro_5", "Leadership_Tier0_Intro_4","Leadership_Tier0_Intro_3", "Leadership_Tier0_Intro_2"],
                 2:["Leadership_Tier1_2_Guardduty"],
                 3:["Leadership_Tier1_2_Guardduty"],
                 4:["Leadership_Tier1_4_Protect"],
                 5:["Leadership_Tier1_4_Protect","Leadership_Tier1_5_Explore"],
                 6:["Leadership_Tier1_4_Protect","Leadership_Tier1_5_Explore"],
                 7:["Leadership_Tier1_4_Protect","Leadership_Tier1_5_Explore"],
                 8:["Leadership_Tier1_4_Protect","Leadership_Tier1_5_Explore"],
                 9:["Leadership_Tier1_4_Protect","Leadership_Tier2_9_Chart","Leadership_Tier1_5_Explore"],
                10:["Leadership_Tier1_4_Protect","Leadership_Tier2_9_Chart","Leadership_Tier1_5_Explore","Leadership_Tier2_10_Battle"],
                11:["Leadership_Tier1_4_Protect","Leadership_Tier2_9_Chart","Leadership_Tier1_5_Explore","Leadership_Tier2_10_Battle"],
                12:["Leadership_Tier1_4_Protect","Leadership_Tier2_9_Chart","Leadership_Tier1_5_Explore","Leadership_Tier2_10_Battle"],
    
                // Current model
                13:["Leadership_Tier3_13_Patrol","Leadership_Tier2_9_Chart","Leadership_Tier1_4_Protect","Leadership_Tier1_5_Explore","Leadership_Tier2_10_Battle"],
                14:["Leadership_Tier3_13_Patrol","Leadership_Tier2_9_Chart","Leadership_Tier1_4_Protect","Leadership_Tier1_5_Explore","Leadership_Tier2_10_Battle"],
                15:["Leadership_Tier3_13_Patrol","Leadership_Tier2_9_Chart","Leadership_Tier1_4_Protect","Leadership_Tier1_5_Explore","Leadership_Tier2_10_Battle"],
                16:["Leadership_Tier3_13_Patrol","Leadership_Tier2_9_Chart","Leadership_Tier3_16_Fight","Leadership_Tier1_5_Explore","Leadership_Tier2_10_Battle"],
                17:["Leadership_Tier3_13_Patrol","Leadership_Tier2_9_Chart","Leadership_Tier3_17_Deliver","Leadership_Tier3_16_Fight","Leadership_Tier1_5_Explore","Leadership_Tier2_12_Taxes","Leadership_Tier2_10_Battle"],
                18:["Leadership_Tier3_13_Patrol","Leadership_Tier2_9_Chart","Leadership_Tier3_17_Deliver","Leadership_Tier3_16_Fight","Leadership_Tier1_5_Explore","Leadership_Tier2_12_Taxes","Leadership_Tier2_10_Battle"],
                19:["Leadership_Tier3_13_Patrol","Leadership_Tier2_9_Chart","Leadership_Tier3_17_Deliver","Leadership_Tier3_16_Fight","Leadership_Tier1_5_Explore","Leadership_Tier2_12_Taxes","Leadership_Tier2_10_Battle"],
                20:["Leadership_Tier3_20r_Master2","Leadership_Tier3_20r_Master1","Leadership_Tier3_20r_Master3","Leadership_Tier3_20_Destroy","Leadership_Tier3_17_Deliver","Leadership_Tier3_13r_Protectdiamonds","Leadership_Tier2_12_Taxes","Leadership_Tier3_16_Fight","Leadership_Tier3_13_Patrol","Leadership_Tier2_9_Chart","Leadership_Tier1_5_Explore"],
                //19:["Patrol the Mines","Chart Region","Deliver Metals","Fight Off Spellplagued","Explore Local Area","Collect Taxes","Train a Guard","Battle Undead","Hire a Mercenary"],
                //20:["Assault Enemy Stronghold","Follow Map to an Unknown Location","Recover Large Mineral Claim","Destroy Enemy Camp","Deliver Metals","Protect Diamond Shipment","Collect Taxes","Fight Off Spellplagued","Patrol the Mines","Chart Region","Explore Local Area"],
    
                // Training Mode
                /*
                13:["Leadership_Tier3_13_Recruit","Leadership_Tier2_7_Recruit","Leadership_Tier1_2_Recruit"],
                14:["Leadership_Tier3_13_Recruit","Leadership_Tier2_7_Recruit","Leadership_Tier1_2_Recruit"],
                15:["Leadership_Tier3_13_Recruit","Leadership_Tier2_7_Recruit","Leadership_Tier1_2_Recruit"],
                16:["Leadership_Tier3_13_Recruit","Leadership_Tier2_7_Recruit","Leadership_Tier1_2_Recruit"],
                17:["Leadership_Tier3_13_Recruit","Leadership_Tier2_7_Recruit","Leadership_Tier1_2_Recruit"],
                */
            },
        },
        {
            // Mailsmithing
            taskName:"Armorsmithing_Med",
            level: {
                 0:["Med_Armorsmithing_Tier0_Intro"],
                 1:["Med_Armorsmithing_Tier1_Chain_Boots_1","Med_Armorsmithing_Tier1_Chain_Shirt_1"],
                 2:["Med_Armorsmithing_Tier1_Chain_Armor_1","Med_Armorsmithing_Tier1_Chain_Pants_1"],
                 3:["Med_Armorsmithing_Tier1_Chain_Armor_1","Med_Armorsmithing_Tier1_Chain_Boots_Set_1"],
                 4:["Med_Armorsmithing_Tier1_Chain_Armor_1","Med_Armorsmithing_Tier1_Chain_Boots_Set_1"],
                 5:["Med_Armorsmithing_Tier1_Chain_Armor_Set_1","Med_Armorsmithing_Tier1_Chain_Boots_Set_1"],
                 6:["Med_Armorsmithing_Tier1_Chain_Armor_Set_1","Med_Armorsmithing_Tier1_Chain_Boots_Set_1"],
                 7:["Med_Armorsmithing_Tier1_Chain_Armor_Set_1","Med_Armorsmithing_Tier2_Chain_Boots_Set_1","Med_Armorsmithing_Tier2_Chain_Shirt"],
                 8:["Med_Armorsmithing_Tier2_Chain_Armor_Set_1","Med_Armorsmithing_Tier2_Chain_Pants_1","Med_Armorsmithing_Tier2_Chain_Boots_Set_1","Med_Armorsmithing_Tier2_Chain_Shirt"],
                 9:["Med_Armorsmithing_Tier2_Chain_Armor_Set_1","Med_Armorsmithing_Tier2_Chain_Pants_1","Med_Armorsmithing_Tier2_Chain_Boots_Set_1","Med_Armorsmithing_Tier2_Chain_Shirt"],
                10:["Med_Armorsmithing_Tier2_Chain_Armor_Set_1","Med_Armorsmithing_Tier2_Chain_Pants_1","Med_Armorsmithing_Tier2_Chain_Boots_Set_1","Med_Armorsmithing_Tier2_Chain_Shirt_2"],
                11:["Med_Armorsmithing_Tier2_Chain_Armor_Set_1","Med_Armorsmithing_Tier2_Chain_Pants_2","Med_Armorsmithing_Tier2_Chain_Boots_Set_1","Med_Armorsmithing_Tier2_Chain_Shirt_2","Med_Armorsmithing_Tier2_Chain_Pants_1"],
                12:["Med_Armorsmithing_Tier2_Chain_Armor_Set_1","Med_Armorsmithing_Tier2_Chain_Pants_2","Med_Armorsmithing_Tier2_Chain_Boots_Set_1","Med_Armorsmithing_Tier2_Chain_Shirt_2","Med_Armorsmithing_Tier2_Chain_Pants_1"],
                13:["Med_Armorsmithing_Tier2_Chain_Armor_Set_1","Med_Armorsmithing_Tier2_Chain_Pants_2","Med_Armorsmithing_Tier2_Chain_Boots_Set_1","Med_Armorsmithing_Tier2_Chain_Shirt_2","Med_Armorsmithing_Tier2_Chain_Pants_1"],
                14:["Med_Armorsmithing_Tier2_Chain_Armor_Set_1","Med_Armorsmithing_Tier2_Chain_Pants_2","Med_Armorsmithing_Tier3_Chain_Shirt","Med_Armorsmithing_Tier3_Chain_Boots_Set_1"],
                15:["Med_Armorsmithing_Tier3_Chain_Armor_Set_1","Med_Armorsmithing_Tier3_Chain_Pants","Med_Armorsmithing_Tier3_Chain_Shirt2","Med_Armorsmithing_Tier3_Chain_Boots_Set_1"],
                16:["Med_Armorsmithing_Tier3_Chain_Armor_Set_1","Med_Armorsmithing_Tier3_Chain_Pants2","Med_Armorsmithing_Tier3_Chain_Shirt2","Med_Armorsmithing_Tier3_Chain_Helm_Set_1","Med_Armorsmithing_Tier3_Chain_Pants"],
                17:["Med_Armorsmithing_Tier3_Chain_Armor_Set_1","Med_Armorsmithing_Tier3_Chain_Pants2","Med_Armorsmithing_Tier3_Chain_Shirt2","Med_Armorsmithing_Tier3_Chain_Helm_Set_1","Med_Armorsmithing_Tier3_Chain_Pants"],
                18:["Med_Armorsmithing_Tier3_Chain_Armor_Set_1","Med_Armorsmithing_Tier3_Chain_Pants2","Med_Armorsmithing_Tier3_Chain_Shirt2","Med_Armorsmithing_Tier3_Chain_Helm_Set_1","Med_Armorsmithing_Tier3_Chain_Pants"],
                19:["Med_Armorsmithing_Tier3_Chain_Armor_Set_1","Med_Armorsmithing_Tier3_Chain_Pants2","Med_Armorsmithing_Tier3_Chain_Shirt2","Med_Armorsmithing_Tier3_Chain_Helm_Set_1","Med_Armorsmithing_Tier3_Chain_Pants"],
                20:["Med_Armorsmithing_Tier2_Refine_Basic"],
                //19:["Chain Armor +4","Fancy Chain Pants","Fancy Chain Shirt","Chain Helm +4","Ornate Chain Pants","Upgrade Blacksmith","Upgrade Prospector","Hire an additional Prospector"],
                //20:["Forge Steel Rings and Scales"],
            },
        },
        {
            // Platesmithing
            taskName:"Armorsmithing_Heavy",
            level: {
                 0:["Hvy_Armorsmithing_Tier0_Intro"],
                 1:["Hvy_Armorsmithing_Tier1_Plate_Boots_1","Hvy_Armorsmithing_Tier1_Plate_Shirt_1","Hvy_Armorsmithing_Tier1_Shield_1"],
                 2:["Hvy_Armorsmithing_Tier1_Plate_Armor_1","Hvy_Armorsmithing_Tier1_Plate_Pants_1"],
                 3:["Hvy_Armorsmithing_Tier1_Plate_Armor_1","Hvy_Armorsmithing_Tier1_Plate_Boots_Set_1"],
                 4:["Hvy_Armorsmithing_Tier1_Plate_Armor_1","Hvy_Armorsmithing_Tier1_Plate_Boots_Set_1"],
                 5:["Hvy_Armorsmithing_Tier1_Plate_Armor_Set_1","Hvy_Armorsmithing_Tier1_Plate_Boots_Set_1"],
                 6:["Hvy_Armorsmithing_Tier1_Plate_Armor_Set_1","Hvy_Armorsmithing_Tier1_Plate_Boots_Set_1"],
                 7:["Hvy_Armorsmithing_Tier1_Plate_Armor_Set_1","Hvy_Armorsmithing_Tier2_Plate_Boots_Set_1","Hvy_Armorsmithing_Tier2_Plate_Shirt","Hvy_Armorsmithing_Tier2_Shield_Set_1"],
                 8:["Hvy_Armorsmithing_Tier2_Plate_Armor_Set_1","Hvy_Armorsmithing_Tier2_Plate_Pants_1","Hvy_Armorsmithing_Tier2_Plate_Boots_Set_1","Hvy_Armorsmithing_Tier2_Plate_Shirt"],
                 9:["Hvy_Armorsmithing_Tier2_Plate_Armor_Set_1","Hvy_Armorsmithing_Tier2_Plate_Pants_1","Hvy_Armorsmithing_Tier2_Plate_Boots_Set_1","Hvy_Armorsmithing_Tier2_Plate_Shirt"],
                10:["Hvy_Armorsmithing_Tier2_Plate_Armor_Set_1","Hvy_Armorsmithing_Tier2_Plate_Pants_1","Hvy_Armorsmithing_Tier2_Plate_Boots_Set_1","Hvy_Armorsmithing_Tier2_Plate_Shirt_2"],
                11:["Hvy_Armorsmithing_Tier2_Plate_Armor_Set_1","Hvy_Armorsmithing_Tier2_Plate_Pants_2","Hvy_Armorsmithing_Tier2_Plate_Boots_Set_1","Hvy_Armorsmithing_Tier2_Plate_Shirt_2","Hvy_Armorsmithing_Tier2_Plate_Pants_1"],
                12:["Hvy_Armorsmithing_Tier2_Plate_Armor_Set_1","Hvy_Armorsmithing_Tier2_Plate_Pants_2","Hvy_Armorsmithing_Tier2_Plate_Boots_Set_1","Hvy_Armorsmithing_Tier2_Plate_Shirt_2","Hvy_Armorsmithing_Tier2_Plate_Pants_1"],
                13:["Hvy_Armorsmithing_Tier2_Plate_Armor_Set_1","Hvy_Armorsmithing_Tier2_Plate_Pants_2","Hvy_Armorsmithing_Tier2_Plate_Boots_Set_1","Hvy_Armorsmithing_Tier2_Plate_Shirt_2","Hvy_Armorsmithing_Tier2_Plate_Pants_1"],
                14:["Hvy_Armorsmithing_Tier2_Plate_Armor_Set_1","Hvy_Armorsmithing_Tier2_Plate_Pants_2","Hvy_Armorsmithing_Tier3_Plate_Shirt","Hvy_Armorsmithing_Tier3_Plate_Boots_Set_1"],
                15:["Hvy_Armorsmithing_Tier3_Plate_Armor_Set_1","Hvy_Armorsmithing_Tier3_Plate_Pants","Hvy_Armorsmithing_Tier3_Plate_Shirt2","Hvy_Armorsmithing_Tier3_Plate_Boots_Set_1"],
                16:["Hvy_Armorsmithing_Tier3_Plate_Armor_Set_1","Hvy_Armorsmithing_Tier3_Plate_Pants2","Hvy_Armorsmithing_Tier3_Plate_Shirt2","Hvy_Armorsmithing_Tier3_Plate_Helm_Set_1","Hvy_Armorsmithing_Tier3_Plate_Pants"],
                17:["Hvy_Armorsmithing_Tier3_Plate_Armor_Set_1","Hvy_Armorsmithing_Tier3_Plate_Pants2","Hvy_Armorsmithing_Tier3_Plate_Shirt2","Hvy_Armorsmithing_Tier3_Plate_Helm_Set_1","Hvy_Armorsmithing_Tier3_Plate_Pants"],
                18:["Hvy_Armorsmithing_Tier3_Plate_Armor_Set_1","Hvy_Armorsmithing_Tier3_Plate_Pants2","Hvy_Armorsmithing_Tier3_Plate_Shirt2","Hvy_Armorsmithing_Tier3_Plate_Helm_Set_1","Hvy_Armorsmithing_Tier3_Plate_Pants"],
                19:["Hvy_Armorsmithing_Tier3_Plate_Armor_Set_1","Hvy_Armorsmithing_Tier3_Plate_Pants2","Hvy_Armorsmithing_Tier3_Plate_Shirt2","Hvy_Armorsmithing_Tier3_Plate_Helm_Set_1","Hvy_Armorsmithing_Tier3_Plate_Pants"],
                20:["Hvy_Armorsmithing_Tier2_Refine_Basic"],
                //19:["Plate Armor +4","Fancy Plate Pants","Fancy Plate Shirt","Plate Helm +4","Ornate Plate Pants","Upgrade Armorer","Upgrade Miner","Hire an additional Miner"],
                //20:["Forge Steel Plates"],
            },
        },
        {
            taskName:"Leatherworking",
            level: {
                 0:["Leatherworking_Tier0_Intro_1"],
                 1:["Leatherworking_Tier1_Leather_Boots_1","Leatherworking_Tier1_Leather_Shirt_1"],
                 2:["Leatherworking_Tier1_Leather_Armor_1","Leatherworking_Tier1_Leather_Pants_1"],
                 3:["Leatherworking_Tier1_Leather_Armor_1","Leatherworking_Tier1_Leather_Boots_Set_1"],
                 4:["Leatherworking_Tier1_Leather_Armor_1","Leatherworking_Tier1_Leather_Boots_Set_1"],
                 5:["Leatherworking_Tier1_Leather_Armor_Set_1","Leatherworking_Tier1_Leather_Boots_Set_1"],
                 6:["Leatherworking_Tier1_Leather_Armor_Set_1","Leatherworking_Tier1_Leather_Boots_Set_1"],
                 7:["Leatherworking_Tier1_Leather_Armor_Set_1","Leatherworking_Tier2_Leather_Boots_Set_1","Leatherworking_Tier2_Leather_Shirt"],
                 8:["Leatherworking_Tier2_Leather_Armor_Set_1","Leatherworking_Tier2_Leather_Pants_1","Leatherworking_Tier2_Leather_Boots_Set_1","Leatherworking_Tier2_Leather_Shirt"],
                 9:["Leatherworking_Tier2_Leather_Armor_Set_1","Leatherworking_Tier2_Leather_Pants_1","Leatherworking_Tier2_Leather_Boots_Set_1","Leatherworking_Tier2_Leather_Shirt"],
                10:["Leatherworking_Tier2_Leather_Armor_Set_1","Leatherworking_Tier2_Leather_Pants_1","Leatherworking_Tier2_Leather_Boots_Set_1","Leatherworking_Tier2_Leather_Shirt_2"],
                11:["Leatherworking_Tier2_Leather_Armor_Set_1","Leatherworking_Tier2_Leather_Pants_2","Leatherworking_Tier2_Leather_Boots_Set_1","Leatherworking_Tier2_Leather_Shirt_2","Leatherworking_Tier2_Leather_Pants_1"],
                12:["Leatherworking_Tier2_Leather_Armor_Set_1","Leatherworking_Tier2_Leather_Pants_2","Leatherworking_Tier2_Leather_Boots_Set_1","Leatherworking_Tier2_Leather_Shirt_2","Leatherworking_Tier2_Leather_Pants_1"],
                13:["Leatherworking_Tier2_Leather_Armor_Set_1","Leatherworking_Tier2_Leather_Pants_2","Leatherworking_Tier2_Leather_Boots_Set_1","Leatherworking_Tier2_Leather_Shirt_2","Leatherworking_Tier2_Leather_Pants_1"],
                14:["Leatherworking_Tier2_Leather_Armor_Set_1","Leatherworking_Tier2_Leather_Pants_2","Ornate Leatherworking_Tier1_Leather_Shirt_1","Leatherworking_Tier3_Leather_Boots_Set_1"],
                15:["Leatherworking_Tier3_Leather_Armor_Set_1","Leatherworking_Tier3_Leather_Pants","Leatherworking_Tier3_Leather_Shirt2","Leatherworking_Tier3_Leather_Boots_Set_1"],
                16:["Leatherworking_Tier3_Leather_Armor_Set_1","Leatherworking_Tier3_Leather_Pants2","Leatherworking_Tier3_Leather_Shirt2","Leatherworking_Tier3_Leather_Helm_Set_1","Leatherworking_Tier3_Leather_Pants"],
                17:["Leatherworking_Tier3_Leather_Armor_Set_1","Leatherworking_Tier3_Leather_Pants2","Leatherworking_Tier3_Leather_Shirt2","Leatherworking_Tier3_Leather_Helm_Set_1","Leatherworking_Tier3_Leather_Pants"],
                18:["Leatherworking_Tier3_Leather_Armor_Set_1","Leatherworking_Tier3_Leather_Pants2","Leatherworking_Tier3_Leather_Shirt2","Leatherworking_Tier3_Leather_Helm_Set_1","Leatherworking_Tier3_Leather_Pants"],
                19:["Leatherworking_Tier3_Leather_Armor_Set_1","Leatherworking_Tier3_Leather_Pants2","Leatherworking_Tier3_Leather_Shirt2","Leatherworking_Tier3_Leather_Helm_Set_1","Leatherworking_Tier3_Leather_Pants"],
                20:["Leatherworking_Tier2_Refine_Basic"],
                //19:["Leather Armor +4","Fancy Leather Pants","Fancy Leather Shirt","Leather Helm +4","Ornate Leather Pants","Upgrade Tanner","Upgrade Skinner","Hire an additional Skinner"],
                //20:["Cure Tough Pelts"],
            },
        },
        {
            taskName:"Tailoring",
            level: {
                 0:["Tailoring_Tier0_Intro"],
                 1:["Tailoring_Tier1_Cloth_Boots_1","Tailoring_Tier1_Cloth_Shirt_1"],
                 2:["Tailoring_Tier1_Cloth_Armor_1","Tailoring_Tier1_Cloth_Pants_1"],
                 3:["Tailoring_Tier1_Cloth_Armor_1","Tailoring_Tier1_Cloth_Boots_Set_1"],
                 4:["Tailoring_Tier1_Cloth_Armor_1","Tailoring_Tier1_Cloth_Boots_Set_1"],
                 5:["Tailoring_Tier1_Cloth_Armor_Set_1","Tailoring_Tier1_Cloth_Boots_Set_1"],
                 6:["Tailoring_Tier1_Cloth_Armor_Set_1","Tailoring_Tier1_Cloth_Boots_Set_1"],
                 7:["Tailoring_Tier1_Cloth_Armor_Set_1","Tailoring_Tier2_Cloth_Boots_Set_1","Tailoring_Tier2_Cloth_Shirt"],
                 8:["Tailoring_Tier2_Cloth_Armor_Set_1","Tailoring_Tier2_Cloth_Pants_1","Tailoring_Tier2_Cloth_Boots_Set_1","Tailoring_Tier2_Cloth_Shirt"],
                 9:["Tailoring_Tier2_Cloth_Armor_Set_1","Tailoring_Tier2_Cloth_Pants_1","Tailoring_Tier2_Cloth_Boots_Set_1","Tailoring_Tier2_Cloth_Shirt"],
                10:["Tailoring_Tier2_Cloth_Armor_Set_1","Tailoring_Tier2_Cloth_Pants_1","Tailoring_Tier2_Cloth_Boots_Set_1","Tailoring_Tier2_Cloth_Shirt_2"],
                11:["Tailoring_Tier2_Cloth_Armor_Set_1","Tailoring_Tier2_Cloth_Pants_2","Tailoring_Tier2_Cloth_Boots_Set_1","Tailoring_Tier2_Cloth_Shirt_2","Tailoring_Tier2_Cloth_Pants_1"],
                12:["Tailoring_Tier2_Cloth_Armor_Set_1","Tailoring_Tier2_Cloth_Pants_2","Tailoring_Tier2_Cloth_Boots_Set_1","Tailoring_Tier2_Cloth_Shirt_2","Tailoring_Tier2_Cloth_Pants_1"],
                13:["Tailoring_Tier2_Cloth_Armor_Set_1","Tailoring_Tier2_Cloth_Pants_2","Tailoring_Tier2_Cloth_Boots_Set_1","Tailoring_Tier2_Cloth_Shirt_2","Tailoring_Tier2_Cloth_Pants_1"],
                14:["Tailoring_Tier2_Cloth_Armor_Set_1","Tailoring_Tier2_Cloth_Pants_2", "Tailoring_Tier3_Cloth_Shirt","Tailoring_Tier3_Cloth_Boots_Set_1"],
                15:["Tailoring_Tier3_Cloth_Armor_Set_1","Tailoring_Tier3_Cloth_Pants","Tailoring_Tier3_Cloth_Shirt2","Tailoring_Tier3_Cloth_Boots_Set_1"],
                16:["Tailoring_Tier3_Cloth_Armor_Set_1","Tailoring_Tier3_Cloth_Pants2","Tailoring_Tier3_Cloth_Shirt2","Tailoring_Tier3_Cloth_Helm_Set_1","Tailoring_Tier3_Cloth_Pants"],
                17:["Tailoring_Tier3_Cloth_Armor_Set_1","Tailoring_Tier3_Cloth_Pants2","Tailoring_Tier3_Cloth_Shirt2","Tailoring_Tier3_Cloth_Helm_Set_1","Tailoring_Tier3_Cloth_Pants"],
                18:["Tailoring_Tier3_Cloth_Armor_Set_1","Tailoring_Tier3_Cloth_Pants2","Tailoring_Tier3_Cloth_Shirt2","Tailoring_Tier3_Cloth_Helm_Set_1","Tailoring_Tier3_Cloth_Pants"],
                19:["Tailoring_Tier3_Cloth_Armor_Set_1","Tailoring_Tier3_Cloth_Pants2","Tailoring_Tier3_Cloth_Shirt2","Tailoring_Tier3_Cloth_Helm_Set_1","Tailoring_Tier3_Cloth_Pants"],
                20:["Tailoring_Tier2_Refine_Basic"],
                //19:["Cloth Robes +4","Fancy Cloth Pants","Fancy Cloth Shirt","Cloth Cap +4","Ornate Cloth Pants","Upgrade Outfitter","Upgrade Weaver","Hire an additional Weaver"],
                //20:["Weave Cotton Cloth"],
            },
        },
        {
            taskName:"Artificing",
            level: {
                 0:["Artificing_Tier0_Intro_1"],
                 1:["Artificing_Tier1_Symbol_Virtuous_1"],
                 2:["Artificing_Tier1_Icon_Virtuous_1"],
                 3:["Artificing_Tier1_Icon_Virtuous_1"],
                 4:["Artificing_Tier1_Icon_Virtuous_2"],
                 5:["Artificing_Tier1_Icon_Virtuous_2"],
                 6:["Artificing_Tier1_Icon_Virtuous_2"],
                 7:["Artificing_Tier1_Icon_Virtuous_2"],
                 8:["Artificing_Tier2_Icon_Virtuous_3"],
                 9:["Artificing_Tier2_Icon_Virtuous_3"],
                10:["Artificing_Tier2_Icon_Virtuous_3"],
                11:["Artificing_Tier2_Icon_Virtuous_3"],
                12:["Artificing_Tier2_Icon_Virtuous_3"],
                13:["Artificing_Tier2_Icon_Virtuous_3"],
                14:["Artificing_Tier3_Icon_Virtuous_4"],
                15:["Artificing_Tier3_Icon_Virtuous_4"],
                16:["Artificing_Tier3_Icon_Virtuous_4"],
                17:["Artificing_Tier3_Icon_Virtuous_5"],
                18:["Artificing_Tier3_Icon_Virtuous_5"],
                19:["Artificing_Tier3_Icon_Virtuous_5"],
                20:["Artificing_Tier2_Refine_Basic"],
                //19:["Virtuous Icon +5","Upgrade Engraver","Upgrade Carver","Hire an additional Carver"],
                //20:["7:Craft Ornamental metal and Carved Wood"],
            },
        },
        {
            taskName:"Weaponsmithing",
            level: {
                 0:["Weaponsmithing_Tier0_Intro"],
                 1:["Weaponsmithing_Tier1_Dagger_1"],
                 2:["Weaponsmithing_Tier1_Dagger_1"],
                 3:["Weaponsmithing_Tier1_Dagger_1"],
                 4:["Weaponsmithing_Tier1_Dagger_2"],
                 5:["Weaponsmithing_Tier1_Dagger_2"],
                 6:["Weaponsmithing_Tier1_Dagger_2"],
                 7:["Weaponsmithing_Tier2_Dagger_3"],
                 8:["Weaponsmithing_Tier2_Dagger_3"],
                 9:["Weaponsmithing_Tier2_Dagger_3"],
                10:["Weaponsmithing_Tier2_Dagger_3"],
                11:["Weaponsmithing_Tier2_Dagger_3"],
                12:["Weaponsmithing_Tier2_Dagger_3"],
                13:["Weaponsmithing_Tier2_Dagger_3"],
                14:["Weaponsmithing_Tier3_Dagger_4"],
                15:["Weaponsmithing_Tier3_Dagger_4"],
                16:["Weaponsmithing_Tier3_Dagger_4"],
                17:["Weaponsmithing_Tier3_Dagger_4"],
                18:["Weaponsmithing_Tier3_Dagger_4"],
                19:["Weaponsmithing_Tier3_Dagger_4"],
                20:["Weaponsmithing_Tier2_Refine_Basic"],
                //19:["Dagger+4","Upgrade Grinder","Upgrade Smelter","Hire an additional Smelter"],
                //20:["Craft Steel Blades and Barausk Hafts"],
            },
        },
        {
            taskName:"Alchemy",
            level: {
                 0:["Alchemy_Tier0_Intro_1"],
                 1:["Alchemy_Tier1_Experiment_Rank2","Alchemy_Tier1_Experimentation_Rank1",],
                 2:["Alchemy_Tier1_Experiment_Rank3","Alchemy_Tier1_Experimentation_Rank2"],
                 3:["Alchemy_Tier1_Experiment_Rank4","Alchemy_Tier1_Experimentation_Rank3"],
                 4:["Alchemy_Tier1_Experiment_Rank5","Alchemy_Tier1_Experimentation_Rank4"],
                 5:["Alchemy_Tier1_Experiment_Rank6","Alchemy_Tier1_Experimentation_Rank5"],
                 6:["Alchemy_Tier1_Experiment_Rank7","Alchemy_Tier1_Experimentation_Rank6"],
                 7:["Alchemy_Tier2_Experiment_Rank08","Alchemy_Tier2_Experimentation_Rank07"],
                 8:["Alchemy_Tier2_Experiment_Rank09","Alchemy_Tier2_Experimentation_Rank08"],
                 9:["Alchemy_Tier2_Experiment_Rank10","Alchemy_Tier2_Experimentation_Rank09"],
                10:["Alchemy_Tier2_Experiment_Rank11","Alchemy_Tier2_Experimentation_Rank10"],
                11:["Alchemy_Tier2_Experiment_Rank12","Alchemy_Tier2_Experimentation_Rank11"],
                12:["Alchemy_Tier2_Experiment_Rank13","Alchemy_Tier2_Experimentation_Rank12"],
                13:["Alchemy_Tier2_Experiment_Rank14","Alchemy_Tier2_Experimentation_Rank13"],
                14:["Alchemy_Tier3_Experiment_Rank15","Alchemy_Tier3_Experimentation_Rank14"],
                15:["Alchemy_Tier3_Experiment_Rank16","Alchemy_Tier3_Experimentation_Rank15"],
                16:["Alchemy_Tier3_Experiment_Rank17","Alchemy_Tier3_Experimentation_Rank16"],
                17:["Alchemy_Tier3_Experiment_Rank18","Alchemy_Tier3_Experimentation_Rank17"],
                18:["Alchemy_Tier3_Experiment_Rank19","Alchemy_Tier3_Experimentation_Rank18"],
                19:["Alchemy_Tier3_Experiment_Rank20","Alchemy_Tier3_Experimentation_Rank19"],
                20:["Alchemy_Tier3_Experimentation_Rank20"],
                //19:["Alchemical Research","Rank 20 Experimentation","Upgrade Mixologist","Upgrade Apothecary","Hire an additional Apothecary"],
                //20:["Rank 20 Experimentation"],
            },
        },
    ];
    
    // Load Settings
    var settingnames = [
        {name: 'paused',              title: 'Pause Script',                         def: false, type:'checkbox', tooltip:'Disable All Automation'},
        {name: 'debug',               title: 'Enable Debug',                         def: false, type:'checkbox', tooltip:'Enable all debug output to console', onsave: function(newValue, oldValue) {console=newValue?unsafeWindow.console||fouxConsole:fouxConsole;}},
        {name: 'optionals',           title: 'Fill Optional Assets',                 def: true,  type:'checkbox', tooltip:'Enable to include selecting the optional assets of tasks'},
        {name: 'autopurchase',        title: 'Auto Purchase Resources',              def: true,  type:'checkbox', tooltip:'Automatically purchase required resources from gateway shop (100 at a time)'},
        {name: 'trainassets',         title: 'Train Assets',                         def: true,  type:'checkbox', tooltip:'Enable training/upgrading of asset worker resources'},
        {name: 'refinead',            title: 'Refine AD',                            def: true,  type:'checkbox', tooltip:'Enable refining of AD on character switch'},
        {name: 'autoreload',          title: 'Auto Reload',                          def: false, type:'checkbox', tooltip:'Enabling this will reload the gateway periodically. (Ensure Auto Login is enabled)'},
        {name: 'autologin',           title: 'Attempt to login automatically',       def: false, type:'checkbox', tooltip:'Automatically attempt to login to the neverwinter gateway site'},
        {name: 'nw_username',         title: '  Neverwinter Username',               def: '',    type:'text',     tooltip:''},
        {name: 'nw_password',         title: '  Neverwinter Password',               def: '',    type:'password', tooltip:''},
        {name: 'charcount',           title: '  Number of Characters',               def: '2',   type:'text',     tooltip:'Enter number of characters to use (reload page to update settings form)'},
    ];
    
    // Load local settings cache (unsecured)
    var settings = {};
    for (var i = 0; i < settingnames.length; i++) {
        // Ignore label types
        if (settingnames[i].type === 'label') {
            continue;
        } 
        settings[settingnames[i].name] = GM_getValue(settingnames[i].name, settingnames[i].def);
        // call the onsave for the setting if it exists
        if (typeof(settingnames[i].onsave) === "function") {
            console.log("Calling 'onsave' for", settingnames[i].name);
            settingnames[i].onsave(settings[settingnames[i].name], settings[settingnames[i].name]);
        }
    }
    
    if (settings["charcount"]<1) { settings["charcount"] = 1; }
    if (settings["charcount"]>99) { settings["charcount"] = 99; }

    var charSettings = [];
    for (var i = 0; i < settings["charcount"]; i++) {
        charSettings.push({name: 'nw_charname'+i,         title: 'Character',      def: 'Character '+(i+1), type:'text',     tooltip:'Characters Name'});
        charSettings.push({name: 'Leadership'+i,          title: 'Leadership',     def: '9',                type:'text',     tooltip:'Number of slots to assign to Leadership'});
        charSettings.push({name: 'Armorsmithing_Med'+i,   title: 'Mailsmithing',   def: '0',                type:'text',     tooltip:'Number of slots to assign to Mailsmithing'});
        charSettings.push({name: 'Armorsmithing_Heavy'+i, title: 'Platesmithing',  def: '0',                type:'text',     tooltip:'Number of slots to assign to Platesmithing'});
        charSettings.push({name: 'Leatherworking'+i,      title: 'Leatherworking', def: '0',                type:'text',     tooltip:'Number of slots to assign to Leatherworking'});
        charSettings.push({name: 'Tailoring'+i,           title: 'Tailoring',      def: '0',                type:'text',     tooltip:'Number of slots to assign to Tailoring'});
        charSettings.push({name: 'Artificing'+i,          title: 'Artificing',     def: '0',                type:'text',     tooltip:'Number of slots to assign to Artificing'});
        charSettings.push({name: 'Weaponsmithing'+i,      title: 'Weaponsmithing', def: '0',                type:'text',     tooltip:'Number of slots to assign to Weaponsmithing'});
        charSettings.push({name: 'Alchemy'+i,             title: 'Alchemy',        def: '0',                type:'text',     tooltip:'Number of slots to assign to Alchemy'});

        // task settings are slightly different
        charSettings.push({name: 'tasklist'+i,            title: 'Task List',      def: '',                 type:'void',     tooltip:''});
    }
    
    for (var i = 0; i < charSettings.length; i++) {
        settings[charSettings[i].name] = GM_getValue(charSettings[i].name, charSettings[i].def);
    }
    
    // Page Settings
    var PAGES = Object.freeze({
        LOGIN : { name: "Login", path: "div#login"},
        GUARD : { name: "Account Guard", path: "div#page-accountguard"},
    });

    /**
     * Uses the page settings to determine which page is currently displayed
     */
    function GetCurrentPage() {
        for each(var page in PAGES) {
            if ($(page["path"]).filter(":visible").length) {
                return page;
            }
        }
    }
    
    /**
     * Logs in to gateway
     * No client.dataModel exists at this stage
     */
    function page_LOGIN() {
        //if (!$("form > p.error:visible").length && settings["autologin"]) {
            // No previous log in error - attempt to log in
            console.log("Setting username");
            $("input#user").val(settings["nw_username"]);
            console.log("Setting password");
            $("input#pass").val(settings["nw_password"]);
            console.log("Clicking Login Button");
            $("div#login > input").click();
        //}
        dfdNextRun.resolve(delay.LONG);
    }
    
    /**
     * Action to perform on account guard page
     */
    function page_GUARD() {
        // Do nothing on the guard screen
        dfdNextRun.resolve(delay.LONG);
    }

    /**
     * Collects rewards for tasks or starts new tasks
     * Function is called once per new task and returns true if an action is created
     * If no action is started function returns false to switch characters
     */
    function processCharacter() {
        // Switch to professions page to show task progression
        unsafeWindow.location.hash="#char("+encodeURI(unsafeWindow.client.getCurrentCharAtName())+")/professions";
        
        // Collect rewards for completed tasks and restart
        if (unsafeWindow.client.dataModel.model.ent.main.itemassignments.complete) {
            unsafeWindow.client.dataModel.model.ent.main.itemassignments.assignments.forEach(function(entry) {
                if (entry.hascompletedetails) { unsafeWindow.client.professionTaskCollectRewards(entry.uassignmentid); }
            });
            dfdNextRun.resolve();
            return true;
        }
        
        
        // Check for available slots and start new task
        if (unsafeWindow.client.dataModel.model.ent.main.itemassignments.assignments.filter(function(entry) { return (!entry.islockedslot && !entry.uassignmentid); }).length) {
            // Go through the professions to assign tasks until specified slots filled
            for (var i = 0; i < tasklist.length; i++) {
                var currentTasks = unsafeWindow.client.dataModel.model.ent.main.itemassignments.assignments.filter(function(entry) { return entry.category == tasklist[i].taskName; });
                if (currentTasks.length < settings[tasklist[i].taskName]) {
                    unsafeWindow.client.professionFetchTaskList('craft_' + tasklist[i].taskName);
                    unsafeWindow.client.dataModel.fetchVendor('Nw_Gateway_Professions_Merchant');
                    window.setTimeout(function() { createNextTask(tasklist[i], 0); }, delay.SHORT);
                    return true;
                }
            }
            console.log("All task counts assigned");
        }
        else {
            console.log("No available task slots");
        }
        
        // TODO: Add code to get next task finish time
        return false;
    }

    /**
     * Iterative approach to finding the next task to assign to an open slot.
     *
     * @param {Array} prof The tasklist for the profession being used
     * @param {int} i The current task number being attempted
     */
    function createNextTask(prof, i) {
        // TODO: Use callback function
        if (!unsafeWindow.client.dataModel.model.craftinglist || unsafeWindow.client.dataModel.model.craftinglist === null || !unsafeWindow.client.dataModel.model.craftinglist['craft_' + prof.taskName] || unsafeWindow.client.dataModel.model.craftinglist['craft_' + prof.taskName] === null) {
            console.log('Task list not loaded for:', prof.taskName);
            window.setTimeout(function() { createNextTask(prof, i); }, delay.SHORT);
            return false;
        }

        // Check level
        var level = unsafeWindow.client.dataModel.model.ent.main.itemassignmentcategories.categories.filter(function(entry) { return entry.name == prof.taskName; })[0].currentrank;
        var list = prof.level[level];
        if (list.length <=i) {
            console.log("Nothing Found");
            switchChar();
            return false;
        }
        console.log(prof.taskName, "is level", level);
        console.log("createNextTask", list.length, i);

        var taskName = list[i];
        console.log("Searching for task:", taskName);
        
        // Search for task to start
        var task = searchForTask(taskName, prof.taskName);

        /** TODO: Use this  code once below can be replaced properly
        if (task === null) {
            console.log("Skipping task selection to purchase resources");
            dfdNextRun.resolve();
        }
        else if (task) {
            startTask(task);
            dfdNextRun.resolve();
        }
        else {
            console.log('Finding next task');
            createNextTask(prof, i+1);
        }
        **/


        // Finish createNextTask function
        if (task === null) {
            console.log("Skipping task selection to purchase resources");
            dfdNextRun.resolve();
            return true;
        }
        if (task) {
            task = '/professions-tasks/' + prof.taskName + '/' + task.def.name;
            console.log('Task Found');
            unsafeWindow.location.hash = unsafeWindow.location.hash.replace(/\)\/.+/,')' + task);
            WaitForState("div.page-professions-taskdetails").done(function() {
                // Click all buttons and select an item to use in the slot
                var def = $.Deferred();
                var buttonList = $("h3:contains('Optional Assets:')").closest("div").find("button");
                if (buttonList.length && settings["optionals"]) {
                    SelectItemFor(buttonList, 0, def, prof);
                }
                else {
                    def.resolve();
                }
                def.done(function() {
                    // All items are populated
                    console.log("Items Populated");
                    // Click the Start Task Button
                    //Get the start task button if it is enabled
                    var enabledButton = $("div.footer-body > div.input-field.button:not('.disabled') > button:contains('Start Task')");
                    if (enabledButton.length) {
                        console.log("Clicking Start Task Button");
                        enabledButton.click();
                        WaitForState("").done(function() {
                            // Done
                            dfdNextRun.resolve(delay.SHORT);
                        });
                        return true;
                    }
                    else { // Button not enabled, something required was probably missing
                        // Go back
                        $("div.footer-body > div.input-field.button > button:contains('Back')").click();
                        WaitForState("").done(function() {
                            // continue with the next one
                            console.log('Finding next task');
                            createNextTask(prof, i+1);
                        });
                    }
                });
            });
        }
        else {
            console.log('Finding next task');
            createNextTask(prof, i+1);
        }
    }
    
    /**
     * Checks task being started for requirements and initiates beginning task if found
     *
     * @param {string} taskname The name of the task being started
     * @param {string} profname The name of the profession being used
     * @param {Deferred} dfd Deferred object to process on return
     */
    function searchForTask(taskname, profname) {
        // Return first object that matches exact craft name
        var thisTask = unsafeWindow.client.dataModel.model.craftinglist['craft_' + profname].entries.filter(function(entry) {
            return entry.def && entry.def.name == taskname;
        })[0];
        
        // If no task is returned we either have three of this task already, the task is a rare that doesn't exist currently, or we have the name wrong in tasklist
        if (!thisTask) {
            console.log('Could not find task for:', taskname);
            return false;
        }
        
        // start task if requirements are met
        if (!thisTask.failedrequirementsreasons.length) {
            return thisTask;
        }
        
        // Too high level
        if (thisTask.failslevelrequirements) {
            console.log("Task level is too high:", taskname);
            return false;
        }
        
        var searchItem = null;
        var searchAsset = false;
        
        // Missing assets or ingredients
        if (thisTask.failsresourcesrequirements) {
            var failedAssets = thisTask.required.filter(function(entry) { return !entry.fillsrequirements; });
            
            // Missing required assets
            if (failedAssets.length) {
                var failedCrafter = failedAssets.filter(function(entry) { return entry.categories.indexOf("Person") >= 0; });
                if (failedCrafter.length && settings["trainassets"]) {
                    console.log("Found required asset:", failedCrafter[0].icon);
                    searchItem = failedCrafter[0].icon;
                    searchAsset = true;
                }
                else {
                    // TODO: Automatically purchase item assets from shop
                    console.log("Not enough assets for task:", taskname);
                    return false;
                }
            }

            // Check for craftable or buyable ingredients
            else {
                var failedResources = thisTask.consumables.filter(function(entry) { return entry.required && !entry.fillsrequirements; });
                
                // Check first required ingredient only
                // If it fails to buy or craft task cannot be completed anyway
                // If it succeeds script will search for tasks anew
                var itemName = failedResources[0].hdef.match(/\[(\w+)\]/)[1];
                
                // purchase buyable resources
                if (itemName.match(/^Crafting_Resource_(Charcoal|Rocksalt|Spool_Thread|Porridge|Solvent|Brimstone|Coal|Moonseasalt|Quicksilver|Spool_Threadsilk)$/)) {
                    if (settings["autopurchase"]) {
                        buyResource(itemName);
                        return null;
                    }
                    else {
                        console.log("Buyable resource required for:", taskname);
                        return false;
                    }
                }
                // craft ingredient items
                else {
                    console.log("Found required ingredient:", itemName);
                    searchItem = itemName;
                }
            }
        }
        
        
        // either no craftable items/assets found or other task requirements are not met
        // Skip crafting ingredient tasks for Leadership
        if (searchItem === null || !searchItem.length || (profname == 'Leadership' && !searchAsset && !searchItem.match(/Crafting_Asset_Craftsman/))) {
            console.log("Failed to resolve item requirements for task:", taskname);
            return false;
        }

        // Generate list of available tasks to search ingredients/assets from
        console.log("Searching ingredient tasks for:", profname);
        var taskList = unsafeWindow.client.dataModel.model.craftinglist['craft_' + profname].entries.filter(function(entry) {
            // remove header lines first to avoid null def
            if (entry.isheader) { return false; }
            
            // Too high level
            if (entry.failslevelrequirements) { return false; }
            
            // Rewards do not contain item we want to make
            if (searchAsset) {
                if (entry.def.icon != searchItem || !entry.def.name.match(/Recruit/) || entry.def.requiredrank > 14) { return false; }
            }
            else {
                if (!(entry.rewards.some(function (itm) { try { return itm.hdef.match(/\[(\w+)\]/)[1] == searchItem; } catch(e) {} }))) { return false; }
            }
            
            // Skip mass production tasks
            if (entry.def.displayname.match(/^(Batch|Mass|Deep|Intensive) /)) { return false; }
            
            // Skip trading tasks
            if (entry.def.displayname.match(/rading$/)) { return false; }
            
            // Skip looping Transmute tasks
            if (entry.def.displayname.match(/^(Transmute|Create) /)) { return false; }
            
            return true;
        });
        
        if (!taskList.length) {
            console.log("No ingredient tasks found for:", taskname, searchItem);
            return false;
        }
        
        // Use more efficient Empowered task for Aqua Vitae if available.
        if (searchItem == "Crafting_Resource_Aquavitae" && taskList.length > 1) { taskList.shift(); }
        
        // Should really only be one result now but lets iterate through anyway.
        for (var i = 0; i < taskList.length; i++) {
            console.log("Attempting search for ingredient task:", taskList[i].def.name);
            var task = searchForTask(taskList[i].def.name, profname);
            if (task === null || task) {
                return task;
            }
        }
        return false;
    }
    
    /**
     * Fills resource slots and begins a profession task
     *
     * @param {string} taskDetail The craftindetail object for the task to be started
     */
    function startTask(taskDetail) {
        return;
        
        unsafeWindow.client.professionFetchTaskDetail(taskDetail.def.name);
        //client.dataModel.addDefaultResources();
        client.professionStartAssignment(taskDetail.def.name);
    }

    /**
     * Selects the highest level asset for the i'th button in the list. Uses an iterative approach
     * in order to apply a sufficient delay after the asset is assigned
     *
     * @param {Array} The list of buttons to use to click and assign assets for
     * @param {int} i The current iteration number. Will select assets for the i'th button
     * @param {Deferred} jQuery Deferred object to resolve when all of the assets have been assigned
     */
    function SelectItemFor(buttonListIn, i, def, prof) {
        buttonListIn[i].click();
        WaitForState("").done(function() {
            var specialItems = $("div.modal-item-list a.Special");
            var goldItems = $("div.modal-item-list a.Gold");
            var silverItems = $("div.modal-item-list a.Silver");
            var bronzeItems = $("div.modal-item-list a.Bronze");
            var clicked = false;

            // Try to avoid using up higher rank assets needlessly
            if (prof.taskName === "Leadership") {
                var mercenarys = $("div.modal-item-list a.Bronze:contains('Mercenary')");
                var guards = $("div.modal-item-list a.Bronze:contains('Guard')");
                var footmen = $("div.modal-item-list a.Bronze:contains('Footman')");

                if (mercenarys.length)   { clicked = true; mercenarys[0].click(); }
                else if (guards.length)  { clicked = true; guards[0].click(); }
                else if (footmen.length) { clicked = true; footmen[0].click(); }
            }
            // TODO: add remaining professions in the same way for bronze tier assets.

            if (!clicked) {
                // Click the highest slot
                if (specialItems.length)     { specialItems[0].click(); }
                else if (goldItems.length)   { goldItems[0].click(); }
                else if (silverItems.length) { silverItems[0].click(); }
                else if (bronzeItems.length) { bronzeItems[0].click(); }
                else { $("button.close-button").click(); }
            }

            console.log("Clicked item");
            WaitForState("").done(function() {
                // Get the new set of select buttons created since the other ones are removed when the asset loads
                var buttonList = $("h3:contains('Optional Assets:')").closest("div").find("button");
                if (i < buttonList.length - 1) {
                    SelectItemFor(buttonList, i+1, def, prof);
                }
                else {
                    // Let main loop continue
                    def.resolve();
                }
            });
        });
    }
    
    /**
     * Will buy a given purchasable resource
     *
     * @param {String} item The data-tt-item id of the Resource to purchase
     */
    function buyResource(item) {
        console.log("Purchasing resources:", item);
        
        var resourceID = {
            Crafting_Resource_Charcoal          : 0,
            Crafting_Resource_Rocksalt          : 1,
            Crafting_Resource_Spool_Thread      : 2,
            Crafting_Resource_Porridge          : 3,
            Crafting_Resource_Solvent           : 4,
            Crafting_Resource_Brimstone         : 5,
            Crafting_Resource_Coal              : 6,
            Crafting_Resource_Moonseasalt       : 7,
            Crafting_Resource_Quicksilver       : 8,
            Crafting_Resource_Spool_Threadsilk  : 9,
        };
        
        // Make purchase
        unsafeWindow.client.sendCommand("GatewayVendor_PurchaseVendorItem",{vendor:'Nw_Gateway_Professions_Merchant',store:'Store_Crafting_Resources',idx:resourceID[item],count:100});
        WaitForState("button.closeNotification").done(function() {
            $("button.closeNotification").click();
        });
    }
    
    function switchChar() {
        if (settings["refinead"]) {
            var _currencies = unsafeWindow.client.dataModel.model.ent.main.currencies;
            if (_currencies.diamondsconvertleft && _currencies.roughdiamonds) {
                console.log("Refining AD");
                unsafeWindow.client.sendCommand('Gateway_ConvertNumeric', 'Astral_Diamonds');
            }
        }

        console.log("Switching Characters");
        if (++charcurrent >= settings["charcount"]) { charcurrent = 0; }
        GM_setValue("charcurrent", charcurrent);
        dfdNextRun.resolve(delay.SHORT);
    }
    
    /**
     * Waits for the loading symbol to be hidden.
     *
     * @return {Deferred} A jQuery defferred object that will be resolved when loading is complete
     */
    function WaitForLoad() {
        return WaitForState("");
    }
    /**
     * Creates a deferred object that will be resolved when the state is reached
     *
     * @param {string} query The query for the state to wait for
     * @return {Deferred} A jQuery defferred object that will be resolved when the state is reached
     */
    function WaitForState(query) {
        var dfd = $.Deferred();
        window.setTimeout(function() {AttemptResolve(query, dfd);}, delay.SHORT); // Doesn't work without a short delay
        return dfd;
    }
    /**
     * Will continually test for the given query state and resolve the given deferred object when the state is reached
     * and the loading symbol is not visible
     *
     * @param {string} query The query for the state to wait for
     * @param {Deferred} dfd The jQuery defferred object that will be resolved when the state is reached
     */
    function AttemptResolve(query, dfd) {
        if ((query === "" || $(query).length) && $("div.loading-image:visible").length === 0) {
            dfd.resolve();
        }
        else {
            window.setTimeout(function() {AttemptResolve(query, dfd);}, delay.SHORT); // Try again in a little bit
        }
    }

    /**
     * The main process loop:
     * - Determine which page we are on and call the page specific logic
     * - When processing is complete, process again later
     *   - Use a short timer when something changed last time through
     *   - Use a longer timer when waiting for tasks to complete
     */
    function process() {
        // Make sure the settings button exists
        addSettings();

        // Enable/Disable the unconditional page reload depending on settings
        loading_reset = settings["autoreload"]; 

        // Check if timer is paused
        s_paused = settings["paused"]; // let the Page Reloading function know the pause state
        if (settings["paused"]) {
            // Just continue later - the deferred object is still set and nothing will resolve it until we get past this point
            var timerHandle = window.setTimeout(function() {process();}, delay.DEFAULT);
            return;
        } 

        // Check for Gateway down
        if (window.location.href.indexOf("gatewaysitedown") > -1) {
            // Do a long delay and then retry the site
            console.log("Gateway down detected - relogging in " + (delay.MINS/1000) + " seconds");
            window.setTimeout(function() {unsafeWindow.location.href = "http://gateway.playneverwinter.com";}, delay.MINS);
            return;
        }

        // Check for login or account guard and process accordingly
        var currentPage = GetCurrentPage();
        if      (currentPage == PAGES.LOGIN)       { page_LOGIN(); return; }
        else if (currentPage == PAGES.GUARD)       { page_GUARD(); return; }
        
        window.setTimeout(function() {loginProcess();}, delay.SHORT);
        
        // Continue again later
        dfdNextRun.done(function(delayTimer) {
            dfdNextRun = $.Deferred();
            timerHandle = window.setTimeout(function() {process();}, typeof delayTimer!== 'undefined' ? delayTimer:delay.DEFAULT);
        });
    }
    
    function loginProcess() {
        // Get logged on account details
        var accountName;
        try {
            accountName = unsafeWindow.client.dataModel.model.loginInfo.publicaccountname;
        }
        catch (e) {
            // TODO: Use callback function
            window.setTimeout(function() {loginProcess();}, delay.SHORT);
            return;
        }
        
        // Check if timer is paused again to avoid starting new task between timers
        s_paused = settings["paused"]; // let the Page Reloading function know the pause state
        if (settings["paused"]) {
            // Just continue later - the deferred object is still set and nothing will resolve it until we get past this point
            var timerHandle = window.setTimeout(function() {process();}, delay.DEFAULT);
            return;
        } 

        if (accountName) {
            // load current character position and values
            charcurrent =  GM_getValue("charcurrent", 0);
            for (var i = 0; i < (charSettings.length/settings["charcount"]); i++) {
                j = i + (charcurrent*charSettings.length/settings["charcount"]);
                settings[charSettings[j].name.replace(new RegExp(charcurrent+"$"),'')] = settings[charSettings[j].name];
            }
            
            // Load task list from settings if saved
            if (settings["tasklist"].length) {
                tasklist = JSON.parse(settings["tasklist"]);
            }
            else {
                tasklist = defaultTasklist;
            }

            var charName = settings["nw_charname"];
            var fullCharName = charName + '@' + accountName;

            if (unsafeWindow.client.getCurrentCharAtName() != fullCharName) {
                loadCharacter(fullCharName);
                return;
            }

            // Try to start tasks
            if (processCharacter()) { return; }

            // Switch characters as necessary
            switchChar();
        }
    }

    function loadCharacter(charname) {
        // Load character and restart next load loop
        console.log("Loading gateway script for", charname);
        unsafeWindow.client.dataModel.loadEntityByName(charname);
        dfdNextRun.resolve();
    }
    
    function addSettings() {
        if ($("#settingsButton").length)
            return;
        // Add the required CSS
        AddCss("\
            #settingsButton{border-bottom: 1px solid rgb(102, 102, 102); border-right: 1px solid rgb(102, 102, 102); background: none repeat scroll 0% 0% rgb(238, 238, 238); display: block; position: fixed; overflow: auto; right: 0px; top: 0px; padding: 3px; z-index: 1000;}\
            #pauseButton{border-bottom: 1px solid rgb(102, 102, 102); border-right: 1px solid rgb(102, 102, 102); background: none repeat scroll 0% 0% rgb(238, 238, 238); display: block; position: fixed; overflow: auto; right: 23px; top: 0px; padding: 3px; z-index: 1000;}\
            #settingsPanel{border-bottom: 1px solid rgb(102, 102, 102); border-right: 1px solid rgb(102, 102, 102); background: none repeat scroll 0% 0% rgb(238, 238, 238); color: rgb(0, 0, 0); position: fixed; overflow: auto; right: 0px; top: 0px; width: 350px;max-height:750px;font: 12px sans-serif; text-align: left; display: block; z-index: 1000;}\
            #settings_title{font-weight: bolder; background: none repeat scroll 0% 0% rgb(204, 204, 204); border-bottom: 1px solid rgb(102, 102, 102); padding: 3px;}\
            #settingsPanelButtonContainer {background: none repeat scroll 0% 0% rgb(204, 204, 204); border-top: 1px solid rgb(102, 102, 102);padding: 3px;text-align:center} \
            #settingsPanel label.purple {font-weight:bold;color:#7C37F6}\
            #settingsPanel label.blue {font-weight:bold;color:#007EFF}\
            #settingsPanel label.green {font-weight:bold;color:#8AFF00}\
            #settingsPanel label.white {font-weight:bold;color:#FFFFFF}\
            #charPanel {width:340px;max-height:400px;overflow:auto;display:block;padding:3px;}\
        ");

        // Add settings panel to page body
        $("body").append(
            '<div id="settingsPanel">\
                <div id="settings_title">\
                    <img src='+image_prefs+' style="float: left; vertical-align: text-bottom;"\>\
                    <img id="settings_close" src='+image_close+' title="Click to hide preferences" style="float: right; vertical-align: text-bottom; cursor: pointer; display: block;"\>\
                    <span style="margin:3px">Settings</span>\
                </div>\
                <form style="margin: 0px; padding: 0px">\
                    <ul style="list-style: none outside none; max-height: 500px; overflow: auto; margin: 3px; padding: 0px;">\
                    </ul>\
                </form>\
            </div>'
        );

        // Add each setting input
        var settingsList = $("#settingsPanel form ul");
        for (var i = 0; i < settingnames.length; i++) {
            var id = 'settings_' + settingnames[i].name;
            var indent = countLeadingSpaces(settingnames[i].title) * 2;
            switch(settingnames[i].type) {
                case "checkbox":
                    settingsList.append('<li title="'+settingnames[i].tooltip+'" style="margin-left:'+indent+'em"><input style="margin:4px" name="'+id+'" id="'+id+'" type="checkbox" /><label class="'+settingnames[i].class+'" for="'+id+'">'+settingnames[i].title+'</label></li>')
                    $('#'+id).prop('checked', settings[settingnames[i].name]);
                    break;
                case "text":
                    settingsList.append('<li title="'+settingnames[i].tooltip+'" style="margin-left:'+indent+'em"><label class="'+settingnames[i].class+'" for="'+id+'">'+settingnames[i].title+'</label><input style="margin:4px" name="'+id+'" id="'+id+'" type="text" /></li>')
                    $('#'+id).val(settings[settingnames[i].name]);
                    break;
                case "password":
                    settingsList.append('<li title="'+settingnames[i].tooltip+'" style="margin-left:'+indent+'em"><label class="'+settingnames[i].class+'" for="'+id+'">'+settingnames[i].title+'</label><input style="margin:4px" name="'+id+'" id="'+id+'" type="password" /></li>')
                    $('#'+id).val(settings[settingnames[i].name]);
                    break;
                case "select":
                    settingsList.append('<li title="'+settingnames[i].tooltip+'" style="margin-left:'+indent+'em"><label class="'+settingnames[i].class+'" style="padding-left:4px" for="'+id+'">'+settingnames[i].title+'</label><select style="margin:4px" name="'+id+'" id="'+id+'" /></li>')
                    var options = settingnames[i].opts;
                    var select = $('#'+id);
                    for (var j = 0; j < options.length; j++) {
                        if (settings[settingnames[i].name] == options[j].path)
                            select.append('<option value="'+options[j].path+'" selected="selected">'+options[j].name+'</option>');
                        else 
                            select.append('<option value="'+options[j].path+'">'+options[j].name+'</option>');
                    }
                    break;
                case "label":
                    settingsList.append('<li title="'+settingnames[i].tooltip+'" style="margin-left:'+indent+'em;><label class="'+settingnames[i].class+'">'+settingnames[i].title+'</label></li>')
                    break; 
            }
        }
        
        // Add character settings for each char
        var addText = '\
            <script type="text/javascript">\
            <!--\
            function click_position(obj)\
            {\
                change_position(obj.value)\
            }\
            \
            function change_position(val)\
            {\
                for (var i = 0; i < '+settings["charcount"]+'; i++)\
                {\
                    document.getElementById("charContainer"+i).style.display="none";\
                }\
                document.getElementById("charContainer"+val).style.display="block";\
            }\
            //-->\
            </script>\
            <div id="charPanel">\
                <div style="width:150px;float:left;max-height:400px;overflow:auto;">\
            ';
        for (var i = 0; i < settings["charcount"]; i++) {
            addText += '\
                    <div><input autocomplete="off" type="radio" name="radio_position" onclick="click_position(this)" id="value_'+i+'" value="'+i+'" /><label for="value_'+i+'">'+settings["nw_charname"+i]+'</label></div>\
                ';
        }
        addText += '\
                </div>\
                <div style="width:170px;float:right;">\
            ';
        for (var i = 0; i < settings["charcount"]; i++) {
            addText += '\
                    <div id="charContainer'+i+'" style="display:none">\
                        <ul style="list-style: none outside none; max-height: 500px; overflow: auto;">\
                ';
            var k = 0 + (i*charSettings.length/settings["charcount"]);
            var id = 'settings_' + charSettings[k].name;
            addText += '<li title="'+charSettings[k].tooltip+'"><input style="margin:4px" name="'+id+'" id="'+id+'" type="text" /></li>';
            for (var j = 1; j < (charSettings.length/settings["charcount"]); j++) {
                k = j + (i*charSettings.length/settings["charcount"]);
                if (charSettings[k].type == 'void') { continue; }
                id = 'settings_' + charSettings[k].name;
                addText += '<li title="'+charSettings[k].tooltip+'"><input maxlength="2" size="1" style="margin:4px" name="'+id+'" id="'+id+'" type="text" /><label class="'+charSettings[k].class+'" for="'+id+'">'+charSettings[k].title+'</label></li>';
            }
            addText += '</ul>'

            // Add task list save buttons
            addText += '\
                    <input id="save_tasklist'+i+'" type="button" value="Save Tasks" title="Saves current task list in script to this character">\
                    <input id="clear_tasklist'+i+'" type="button" value="Clear Tasks" title="Clears the saved task list for this character to use defaults">\
                    </div>';
        }
        addText += '\
                </div>\
            </div>\
            ';
        $("#settingsPanel form").append(addText);

        // Add values to character input fields
        for (var i = 0; i < charSettings.length; i++) {
            id = 'settings_' + charSettings[i].name;
            $('#'+id).val(settings[charSettings[i].name]);
        }
        
        // Add code to tasklist buttons
        for (var i = 0; i < settings["charcount"]; i++) {
            $("#save_tasklist"+i).click(function() {
                var num = this.id.replace("save_tasklist", "");
                charSettings["tasklist"+num] = tasklist;
                setTimeout(function() { GM_setValue("tasklist"+num, JSON.stringify(defaultTasklist)); }, 0);
            });
            
            $("#clear_tasklist"+i).click(function() {
                var num = this.id.replace("clear_tasklist", "");
                charSettings["tasklist"+num] = "";
                setTimeout(function() { GM_setValue("tasklist"+num, ""); }, 0);
            });
        }

        // Add save/cancel buttons to panel
        $("#settingsPanel form").append('\
            <div id="settingsPanelButtonContainer">\
                <input id="settings_save" type="button" value="Save and Apply">\
                <input id="settings_close" type="button" value="Close">\
            </div>');

        // Add open settings button to page
        $("body").append('<div id="settingsButton"><img src="'+image_prefs+'" title="Click to show preferences" style="cursor: pointer; display: block;"></div>');

        // Add pause button to page
        $("body").append('<div id="pauseButton"><img src="'+(settings["paused"]?image_play:image_pause)+'" title="Click to '+(settings["paused"]?"resume":"pause")+' task script" style="cursor: pointer; display: block;"></div>');

        // Add the javascript
        $("#settingsPanel").hide();
        $("#settingsButton").click(function() {
            $("#settingsButton").hide();
            $("#pauseButton").hide();
            $("#settingsPanel").show();
        });
        $("#settings_close,settings_cancel").click(function() {
            $("#settingsButton").show();
            $("#pauseButton").show();
            $("#settingsPanel").hide();
        });
        $("#pauseButton").click(function() {
            settings["paused"] = !settings["paused"]
            setTimeout(function() { GM_setValue("paused", settings["paused"]); }, 0);
            $("#settings_paused").prop("checked", settings["paused"]);
            $("#pauseButton img").attr("src",(settings["paused"]?image_play:image_pause));
            $("#pauseButton img").attr("title","Click to "+(settings["paused"]?"resume":"pause")+" task script");
        });

        // Use setTimeout to workaround permission issues when calling GM functions from main window
        $("#settings_save").click(function() { setTimeout(function() { SaveSettings();}, 0)});
    }

    function SaveSettings() {
        var charcount = settings["charcount"];

        // Get each value from the UI
        for (var i = 0; i < settingnames.length; i++) {
            var name = settingnames[i].name;
            var el = $('#settings_' + name);
            var value = false;
            switch(settingnames[i].type) {
                case "checkbox":
                    value = el.prop("checked");
                    break;
                case "text":
                    value = el.val();
                    break;
                case "password":
                    value = el.val();
                    break;
                case "select":
                    value = el.val();
                    break;
                case "label": // Labels don't have values
                    continue;
            }
            if (typeof(settingnames[i].onsave) === "function") {
                console.log("Calling 'onsave' for", name);
                settingnames[i].onsave(value, settings[name]);
            }
            if (settings[name] !== value) { settings[name] = value; } // Save to local cache
            if (GM_getValue(name) !== value) { GM_setValue(name, value); } // Save to GM cache
        }

        // Get character settings from UI
        for (var i = 0; i < charSettings.length; i++) {
            if (charSettings[i].type == 'void') { continue; }
            var name = charSettings[i].name;
            var el = $('#settings_' + name);
            var value = el.val();
            if (settings[name] !== value) { settings[name] = value; } // Save to local cache
            if (GM_getValue(name) !== value) { GM_setValue(name, value); } // Save to GM cache
        }
        
        // If character numbers have changed reload page
        if (charcount != settings["charcount"]) {
            console.log("Reloading Gateway to update character count");
            unsafeWindow.location.href = "http://gateway.playneverwinter.com";
            return;
        }

        // Delete all saved settings
        if (settingwipe) {
            var keys = GM_listValues();
            for (var i = 0, key = null; key = keys[i]; i++) {
                GM_deleteValue(key);
            }
        }
        
        // Close the panel
        $("#settingsButton").show();
        $("#pauseButton img").attr("src",(settings["paused"]?image_play:image_pause));
        $("#pauseButton img").attr("title","Click to "+(settings["paused"]?"resume":"pause")+" task script");
        $("#pauseButton").show();
        $("#settingsPanel").hide();
    }

    // Add the settings button and start a process timer
    addSettings();
    timerHandle = window.setTimeout(function() {process();}, delay.SHORT);
})();