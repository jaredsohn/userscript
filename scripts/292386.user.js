// ==UserScript==
// @name           Neverwinter Gateway - Professions Robot
// @description    Automatically selects tasks from professions for empty slots
// @namespace      blabla
// @include        https://gateway.playneverwinter.com
// @include        https://gateway.playneverwinter.com/*
// @include        https://gatewaysitedown.playneverwinter.com
// @include        https://gatewaysitedown.playneverwinter.com/*
// @include        http://gateway.playneverwinter.com
// @include        http://gateway.playneverwinter.com/*
// @include        http://gatewaysitedown.playneverwinter.com
// @include        http://gatewaysitedown.playneverwinter.com/*
// @originalAuthor Mustex&Bunta
// @modifiedBy     Insignis
// @version        0.2.1.22
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @grant          GM_getValue
// @grant          GM_setValue
// ==/UserScript==
 
/* RELEASE NOTES
0.2.1.2.0
    - Changed whole code responsible for handling multiple characters to be fully dynamic (method of reloging on each char change didn't change)
        * You just open settings, change number of character, reload the page - and you can now set up the char name, and number of tasks per profession per that character
0.2.1.1.1
    - Changed all task lists:
        * Armour/Weapon ones so that it levels them via only gather tasks (no gold spent, doesnt require residuum etc., uses best exp/h so uses deep one on higher levels) - personal preference, so if you prefer old style copy list from Bunta's version
        * Slight changes in Leadership (also my personal preference) mainly in training mode: to just make enough rank1 crafters and then manualy change them to enough rank3 ones (ending up with same amount of rank3 and rank1)
        * Alchemy tries first to gather resources if for some reason can't do experiment/research tasks instead of going stright to hiring another crafter, which sometimes resulted in lots of time lost and tones of useless crafters made (thou it was mainly before adding some of skip mass tasks conditions were added)
    - Added few missing mass/deep ingredient task skipping conditions useful maily for alchemy (or other proffesions if someone will revert back to buntas task lists)
    - Added engine that cycles trough multiple characters by disconnecting after each one (uses longDelay, and works good)
        * it uses static setup of options (in other words you need to edit this script to add more characters - adding slightly changed copies of already existing options: nw_charname and <taskname>)
        * code that creates settings menu is a bit messy - you need to manualy add few copy&slightly_change lines/parts of already existing code
        * both of above are planned to be changed into fully dinamic and dependant on just one option (which if possible will be in the settings menu, instead of a static editable only in this script)
    - Added missing professions in function selecting least rank optional bronze (white) assets (buntas TO-DO done ^_^)
    - Modified SearchForTaskByName function so that it takes profession level into account
        * atm it helps only with empowered aqua task: if alchemy is set to show higher level first then old code stops working trying to run empowered aqua task, but now instead of skipping it entirely it does it only if alchemy is below 8-th level (empowered task is more efficent so its not good to skip it)
    - Few other minor changes/polishes (connected with multiple characters upgrades, or just debug/info - mainly debug output to console allerts)
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
 
/* REQUESTED FEATURES
 * - Add settings to restrict types of optional assets selected
 * - Add logic to determine when to 'hire' more assets (Depends on number of open slots, profession level, and current assets of the correct level)
 * - Add logic to determine when a task is running (like alchemy research) so to be able to do different tasks based on it (like run task in preparation for next level experimentation, instead of doing useless experimentation on actuall level)
 * - Add settings for defining a minimum amount of resources to attempt to keep in stock (When the rare tasks come up we will need to have some resources available)
 */
/* PLANNED FEATURES
 * - Possible upgrade to code so to allow of multiple account handling (as the multiple character handling uses relogging - it I think is fully possible without to much of a hassle)
 * - Add logic with a checkbox in menu, to open inventory tab and try reforging ADs if checkbox is marked (possibly make it do it with a counter - once per few full character changing loops)
 */
 
// Make sure it's running on the main page, no frames
if(window.self !== window.top) {
    throw "";
}
 
// If "loading" take longer than 1 minute, reload page (maybe a javascript error)
(function(){
  var $                  = unsafeWindow.$;
  var loading_crash      = 0;
  var loading_crash_time = 20;
  var timer              = setInterval(function(){
    if( $("div.loading-image:visible").length ){
      if( loading_crash > loading_crash_time ){
        location.reload();
      }
      else{
        loading_crash++;
        console.log("Loading ... " + loading_crash + "s" );
      }
    }
    else{
      loading_crash = 0;
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
        if(!head)
            return;
        var newCss = document.createElement('style');
        newCss.type = "text/css";
        newCss.innerHTML = cssString;
        head.appendChild(newCss);
    }
    function countLeadingSpaces(str) {
        return str.match(/^(\s*)/)[1].length;
    }
 
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
    var fouxConsole = {log:function(){},info:function(){},error:function(){},warn:function(){}};
    var console = unsafeWindow.console || fouxConsole;
    var $ = unsafeWindow.jQuery;
    var timerHandle = 0;
    var reloadTimerHandle = 0; // Used for timer that reloads the gateway every few hours
    var reloadNeeded = false;
    var reloadDelay = 600000; // 10 minutes
    var longDelay = 60000; // 1 minute
    var delay = 5000; // 5 seconds
    var delayShort = 1000;; // 1 second
    var dfdNextRun = $.Deferred();
 
    /*
     * Tasklist can be modified to configure the training you want to perform.
     * The configurable options window sets how many profession slots you want to use for each profession.
     * The level array below for each professions specifies the tasks you want to learn at each crafting level.
     * Each craft slot will pick the first task that meets requirements.
     */
    var tasklist = [
        {
            taskName:"Leadership",
            level: {
                 0:["Hire Your First Mercenary"],
                 1:["Complete Advanced Training", "Protect Grateful Merchant","Pick Up Package", "Basic Training"],
                 2:["Guard Duty"],
                 3:["Guard Duty","Hire a Mercenary"],
                 4:["Protect Caravan","Guard Duty","Hire a Mercenary"],
                 5:["Protect Caravan","Explore Local Area","Guard Duty","Hire a Mercenary"],
                 6:["Protect Caravan","Explore Local Area","Guard Duty","Hire a Mercenary"],
    
                // Current model
 
                 7:["Explore Local Area","Guard Duty","Train a Guard","Hire a Mercenary"],
                 8:["Explore Local Area","Guard Duty","Train a Guard","Hire a Mercenary"],
                 9:["Chart Region","Explore Local Area","Guard Duty","Train a Guard","Hire a Mercenary"],
                10:["Chart Region","Explore Local Area","Guard Duty","Train a Guard","Hire a Mercenary"],
                11:["Chart Region","Explore Local Area","Guard Duty","Train a Guard","Hire a Mercenary"],
                12:["Chart Region","Explore Local Area","Guard Duty","Train a Guard","Hire a Mercenary"],
 
 
                13:["Protect Diamond Shipment","Patrol the Mines","War Games Training","Protect Caravan","Chart Region","Explore Local Area","Train a Guard","Battle Undead","Hire a Mercenary"],
                14:["Patrol the Mines","War Games Training","Protect Caravan","Chart Region","Explore Local Area","Train a Guard","Battle Undead","Hire a Mercenary"],
                15:["Patrol the Mines","War Games Training","Protect Caravan","Chart Region","Explore Local Area","Train a Guard","Battle Undead","Hire a Mercenary"],
                16:["Patrol the Mines","War Games Training","Fight Off Spellplagued","Protect Caravan","Chart Region","Explore Local Area","Train a Guard","Battle Undead","Hire a Mercenary"],
                17:["Patrol the Mines","War Games Training","Fight Off Spellplagued","Protect Caravan","Chart Region","Explore Local Area","Train a Guard","Battle Undead","Hire a Mercenary"],
                18:["Patrol the Mines","War Games Training","Fight Off Spellplagued","Protect Caravan","Chart Region","Explore Local Area","Train a Guard","Battle Undead","Hire a Mercenary"],
                19:["Patrol the Mines","War Games Training","Fight Off Spellplagued","Protect Caravan","Chart Region","Explore Local Area","Train a Guard","Battle Undead","Hire a Mercenary"],
                20:["Deliver Metals","Assault Enemy Stronghold","Follow Map to an Unknown Location","Recover Large Mineral Claim","Protect Diamond Shipment","Destroy Enemy Camp","Collect Taxes","Fight Off Spellplagued","Battle Undead","Give Refugees a Home","Protect Caravan","Patrol the Mines","Chart Region","Explore Local Area"],
     
            
            },
        },
        {
            // Mailsmithing
            taskName:"Armorsmithing_Med",
            level: {
                 0:["Hire your first Prospector"],
                 1:["Chain Boots","Chain Shirt"],
                 2:["Gather Iron Ore","Hire an additional Prospector"],
                 3:["Gather Iron Ore","Hire an additional Prospector"],
                 4:["Gather Iron Ore","Hire an additional Prospector"],
                 5:["Gather Iron Ore","Hire an additional Prospector"],
                 6:["Gather Iron Ore","Hire an additional Prospector"],
                 7:["Gather High quality Iron Ore","Upgrade Prospector","Hire an additional Prospector"],
                 8:["Gather High quality Iron Ore","Upgrade Prospector","Hire an additional Prospector"],
                 9:["Gather High quality Iron Ore","Upgrade Prospector","Hire an additional Prospector"],
                10:["Gather High quality Iron Ore","Upgrade Prospector","Hire an additional Prospector"],
                11:["Gather High quality Iron Ore","Upgrade Prospector","Hire an additional Prospector"],
                12:["Gather High quality Iron Ore","Upgrade Prospector","Hire an additional Prospector"],
                13:["Gather High quality Iron Ore","Upgrade Prospector","Hire an additional Prospector"],
                14:["14:Deep Wilderness Gathering","Upgrade Blacksmith","Upgrade Prospector","Hire an additional Prospector"],
                15:["14:Deep Wilderness Gathering","Upgrade Blacksmith","Upgrade Prospector","Hire an additional Prospector"],
                16:["14:Deep Wilderness Gathering","Upgrade Blacksmith","Upgrade Prospector","Hire an additional Prospector"],
                17:["14:Deep Wilderness Gathering","Upgrade Blacksmith","Upgrade Prospector","Hire an additional Prospector"],
                18:["14:Deep Wilderness Gathering","Upgrade Blacksmith","Upgrade Prospector","Hire an additional Prospector"],
                19:["14:Deep Wilderness Gathering","Upgrade Blacksmith","Upgrade Prospector","Hire an additional Prospector"],
                20:[],
            },
        },
        {
            // Platesmithing
            taskName:"Armorsmithing_Heavy",
            level: {
                 0:["Hire your first Miner"],
                 1:["Plate Boots","Plate Shirt","Iron Shield"],
                 2:["Gather Iron Ore","Hire an additional Miner"],
                 3:["Gather Iron Ore","Hire an additional Miner"],
                 4:["Gather Iron Ore","Hire an additional Miner"],
                 5:["Gather Iron Ore","Hire an additional Miner"],
                 6:["Gather Iron Ore","Hire an additional Miner"],
                 7:["Gather High quality Iron Ore","Upgrade Miner","Hire an additional Miner"],
                 8:["Gather High quality Iron Ore","Upgrade Miner","Hire an additional Miner"],
                 9:["Gather High quality Iron Ore","Upgrade Miner","Hire an additional Miner"],
                10:["Gather High quality Iron Ore","Upgrade Miner","Hire an additional Miner"],
                11:["Gather High quality Iron Ore","Upgrade Miner","Hire an additional Miner"],
                12:["Gather High quality Iron Ore","Upgrade Miner","Hire an additional Miner"],
                13:["Gather High quality Iron Ore","Upgrade Miner","Hire an additional Miner"],
                14:["14:Deep Wilderness Gathering","Upgrade Armorer","Upgrade Miner","Hire an additional Miner"],
                15:["14:Deep Wilderness Gathering","Upgrade Armorer","Upgrade Miner","Hire an additional Miner"],
                16:["14:Deep Wilderness Gathering","Upgrade Armorer","Upgrade Miner","Hire an additional Miner"],
                17:["14:Deep Wilderness Gathering","Upgrade Armorer","Upgrade Miner","Hire an additional Miner"],
                18:["14:Deep Wilderness Gathering","Upgrade Armorer","Upgrade Miner","Hire an additional Miner"],
                19:["14:Deep Wilderness Gathering","Upgrade Armorer","Upgrade Miner","Hire an additional Miner"],
                20:[],
            },
        },
        {
            taskName:"Leatherworking",
            level: {
                 0:["Hire your first Skinner"],
                 1:["Leather Boots","Leather Shirt"],
                 2:["Gather Simple Pelts","Hire an additional Skinner"],
                 3:["Gather Simple Pelts","Hire an additional Skinner"],
                 4:["Gather Simple Pelts","Hire an additional Skinner"],
                 5:["Gather Simple Pelts","Hire an additional Skinner"],
                 6:["Gather Simple Pelts","Hire an additional Skinner"],
                 7:["Gather Tough Pelts","Upgrade Skinner","Hire an additional Skinner"],
                 8:["Gather Tough Pelts","Upgrade Skinner","Hire an additional Skinner"],
                 9:["Gather Tough Pelts","Upgrade Skinner","Hire an additional Skinner"],
                10:["Gather Tough Pelts","Upgrade Skinner","Hire an additional Skinner"],
                11:["Gather Tough Pelts","Upgrade Skinner","Hire an additional Skinner"],
                12:["Gather Tough Pelts","Upgrade Skinner","Hire an additional Skinner"],
                13:["Gather Tough Pelts","Upgrade Skinner","Hire an additional Skinner"],
                14:["14:Deep Wilderness Gathering","Upgrade Tanner","Upgrade Skinner","Hire an additional Skinner"],
                15:["14:Deep Wilderness Gathering","Upgrade Tanner","Upgrade Skinner","Hire an additional Skinner"],
                16:["14:Deep Wilderness Gathering","Upgrade Tanner","Upgrade Skinner","Hire an additional Skinner"],
                17:["14:Deep Wilderness Gathering","Upgrade Tanner","Upgrade Skinner","Hire an additional Skinner"],
                18:["14:Deep Wilderness Gathering","Upgrade Tanner","Upgrade Skinner","Hire an additional Skinner"],
                19:["14:Deep Wilderness Gathering","Upgrade Tanner","Upgrade Skinner","Hire an additional Skinner"],
                20:[],
            },
        },
        {
            taskName:"Tailoring",
            level: {
                 0:["Hire your first Weaver"],
                 1:["Cloth Boots","Cloth Shirt"],
                 2:["Gather Wool Scraps","Hire an additional Weaver"],
                 3:["Gather Wool Scraps","Hire an additional Weaver"],
                 4:["Gather Wool Scraps","Hire an additional Weaver"],
                 5:["Gather Wool Scraps","Hire an additional Weaver"],
                 6:["Gather Wool Scraps","Hire an additional Weaver"],
                 7:["Gather Cotton Scraps","Upgrade Weaver","Hire an additional Weaver"],
                 8:["Gather Cotton Scraps","Upgrade Weaver","Hire an additional Weaver"],
                 9:["Gather Cotton Scraps","Upgrade Weaver","Hire an additional Weaver"],
                10:["Gather Cotton Scraps","Upgrade Weaver","Hire an additional Weaver"],
                11:["Gather Cotton Scraps","Upgrade Weaver","Hire an additional Weaver"],
                12:["Gather Cotton Scraps","Upgrade Weaver","Hire an additional Weaver"],
                13:["Gather Cotton Scraps","Upgrade Weaver","Hire an additional Weaver"],
                14:["Intensive Scrap Gathering","Upgrade Outfitter","Upgrade Weaver","Hire an additional Weaver"],
                15:["Intensive Scrap Gathering","Upgrade Outfitter","Upgrade Weaver","Hire an additional Weaver"],
                16:["Intensive Scrap Gathering","Upgrade Outfitter","Upgrade Weaver","Hire an additional Weaver"],
                17:["Intensive Scrap Gathering","Upgrade Outfitter","Upgrade Weaver","Hire an additional Weaver"],
                18:["Intensive Scrap Gathering","Upgrade Outfitter","Upgrade Weaver","Hire an additional Weaver"],
                19:["Intensive Scrap Gathering","Upgrade Outfitter","Upgrade Weaver","Hire an additional Weaver"],
                20:[],
            },
        },
        {
            taskName:"Artificing",
            level: {
                 0:["Hire your first Carver"],
                 1:["Virtuous Symbol +1"],
                 2:["1:Gather Ore and Wood","Hire an additional Carver"],
                 3:["1:Gather Ore and Wood","Hire an additional Carver"],
                 4:["1:Gather Ore and Wood","Hire an additional Carver"],
                 5:["1:Gather Ore and Wood","Hire an additional Carver"],
                 6:["1:Gather Ore and Wood","Hire an additional Carver"],
                 7:["7:Gather Ore and Wood","Upgrade Carver","Hire an additional Carver"],
                 8:["7:Gather Ore and Wood","Upgrade Carver","Hire an additional Carver"],
                 9:["7:Gather Ore and Wood","Upgrade Carver","Hire an additional Carver"],
                10:["7:Gather Ore and Wood","Upgrade Carver","Hire an additional Carver"],
                11:["7:Gather Ore and Wood","Upgrade Carver","Hire an additional Carver"],
                12:["7:Gather Ore and Wood","Upgrade Carver","Hire an additional Carver"],
                13:["7:Gather Ore and Wood","Upgrade Carver","Hire an additional Carver"],
                14:["14:Deep Wilderness Gathering","Upgrade Engraver","Upgrade Carver","Hire an additional Carver"],
                15:["14:Deep Wilderness Gathering","Upgrade Engraver","Upgrade Carver","Hire an additional Carver"],
                16:["14:Deep Wilderness Gathering","Upgrade Engraver","Upgrade Carver","Hire an additional Carver"],
                17:["14:Deep Wilderness Gathering","Upgrade Engraver","Upgrade Carver","Hire an additional Carver"],
                18:["14:Deep Wilderness Gathering","Upgrade Engraver","Upgrade Carver","Hire an additional Carver"],
                19:["14:Deep Wilderness Gathering","Upgrade Engraver","Upgrade Carver","Hire an additional Carver"],
                20:[],
            },
        },
        {
            taskName:"Weaponsmithing",
            level: {
                 0:["Hire your first Smelter"],
                 1:["Dagger +1"],
                 2:["Gather Iron Ore and Pine Wood","Hire an additional Smelter"],
                 3:["Gather Iron Ore and Pine Wood","Hire an additional Smelter"],
                 4:["Gather Iron Ore and Pine Wood","Hire an additional Smelter"],
                 5:["Gather Iron Ore and Pine Wood","Hire an additional Smelter"],
                 6:["Gather Iron Ore and Pine Wood","Hire an additional Smelter"],
                 7:["Gather High Quality Ore and Wood","Upgrade Smelter","Hire an additional Smelter"],
                 8:["Gather High Quality Ore and Wood","Upgrade Smelter","Hire an additional Smelter"],
                 9:["Gather High Quality Ore and Wood","Upgrade Smelter","Hire an additional Smelter"],
                10:["Gather High Quality Ore and Wood","Upgrade Smelter","Hire an additional Smelter"],
                11:["Gather High Quality Ore and Wood","Upgrade Smelter","Hire an additional Smelter"],
                12:["Gather High Quality Ore and Wood","Upgrade Smelter","Hire an additional Smelter"],
                13:["Gather High Quality Ore and Wood","Upgrade Smelter","Hire an additional Smelter"],
                14:["14:Deep Wilderness Gathering","Upgrade Grinder","Upgrade Smelter","Hire an additional Smelter"],
                15:["14:Deep Wilderness Gathering","Upgrade Grinder","Upgrade Smelter","Hire an additional Smelter"],
                16:["14:Deep Wilderness Gathering","Upgrade Grinder","Upgrade Smelter","Hire an additional Smelter"],
                17:["14:Deep Wilderness Gathering","Upgrade Grinder","Upgrade Smelter","Hire an additional Smelter"],
                18:["14:Deep Wilderness Gathering","Upgrade Grinder","Upgrade Smelter","Hire an additional Smelter"],
                19:["14:Deep Wilderness Gathering","Upgrade Grinder","Upgrade Smelter","Hire an additional Smelter"],
                20:[],
            },
        },
        {
            taskName:"Alchemy",
            level: {
                 0:["Hire your first Apothecary"],
                 1:["Alchemical Research","Rank 1 Experimentation",],
                 2:["Alchemical Research","Rank 2 Experimentation","Gather Simple Components","Hire an additional Apothecary"],
                 3:["Alchemical Research","Rank 3 Experimentation","Gather Simple Components","Hire an additional Apothecary"],
                 4:["Alchemical Research","Rank 4 Experimentation","Gather Simple Components","Hire an additional Apothecary"],
                 5:["Alchemical Research","Rank 5 Experimentation","Gather Simple Components","Hire an additional Apothecary"],
                 6:["Alchemical Research","Rank 6 Experimentation","Gather Simple Components","Hire an additional Apothecary"],
                 7:["Alchemical Research","Rank 7 Experimentation","Simple Vitriol Extraction","Gather Simple Components","Gather Advanced Components","Upgrade Apothecary","Hire an additional Apothecary"],
                 8:["Transmutation Research","Rank 8 Experimentation","Gather Advanced Components","Upgrade Apothecary","Hire an additional Apothecary"],
                 9:["Alchemical Research","Rank 9 Experimentation","Gather Advanced Components","Upgrade Apothecary","Hire an additional Apothecary"],
                10:["Gather Advanced Components","Gather Simple Components","Transmutation Research","Rank 10 Experimentation","Gather Advanced Components","Upgrade Apothecary","Hire an additional Apothecary"],
                11:["Alchemical Research","Rank 11 Experimentation","Gather Advanced Components","Upgrade Apothecary","Hire an additional Apothecary"],
                12:["Alchemical Research","Rank 12 Experimentation","Gather Advanced Components","Upgrade Apothecary","Hire an additional Apothecary"],
                13:["Alchemical Research","Rank 13 Experimentation","Gather Advanced Components","Upgrade Apothecary","Hire an additional Apothecary"],
                14:["Alchemical Research","Rank 14 Experimentation","Gather Complex Components","Upgrade Mixologist","Upgrade Apothecary","Hire an additional Apothecary"],
                15:["Alchemical Research","Rank 15 Experimentation","Gather Complex Components","Upgrade Mixologist","Upgrade Apothecary","Hire an additional Apothecary"],
                16:["Alchemical Research","Rank 16 Experimentation","Gather Complex Components","Upgrade Mixologist","Upgrade Apothecary","Hire an additional Apothecary"],
                17:["Alchemical Research","Rank 17 Experimentation","Gather Complex Components","Upgrade Mixologist","Upgrade Apothecary","Hire an additional Apothecary"],
                18:["Alchemical Research","Rank 18 Experimentation","Gather Complex Components","Upgrade Mixologist","Upgrade Apothecary","Hire an additional Apothecary"],
                19:["Alchemical Research","Rank 19 Experimentation","Gather Complex Components","Upgrade Mixologist","Upgrade Apothecary","Hire an additional Apothecary"],
                20:["Rank 20 Experimentation"],
            },
        },
        {
            taskName:"WinterEvent",
            level: {
                1:["Glowing Fishing Pole","1:Entertain Master of Lights (Rank Up)","Refine Light Pods","1:Fish for Light Pods"],
                2:["Bright Angler's Fishing Pole","2:Entertain Master of Lights (Rank Up)","Refine Light Pods","2:Fish for Light Pods","2:Large Batch of Shiny Lures","1:Fish for Light Pods"],
                3:["Brilliant Angler's Fishing Pole","Lightwine","Refine Light Pods","3:Fish for Light Pods","2:Large Batch of Shiny Lures","1:Fish for Light Pods"],
            },
        },
    ];
    // Load Settings
    /*
        This list is a base setting lits
        The higher in the list the profession related option the more important it is
            Basically if number of slots in few professions sums up to be higher that total number of avaliable slots
            Professions that are higher on the below list will get all their setuped slots used,
            and professions that are lower will be skipped entairly or just get few but not all slots
        Thus if you want for example to prioretize different profession you need to put it as first profession
            But it is global - so you need to setup the list in such way to make each profession primary on each character
            if its even possible that is
    */
    var settingnames = [
        {name: 'paused',              title: 'Pause Script',                         def: false, type:'checkbox', tooltip:'Disable All Automation'},
        {name: 'debug',               title: 'Enable Debug',                         def: false, type:'checkbox', tooltip:'Enable all debug output to console', onsave: function(newValue, oldValue) {console=newValue?unsafeWindow.console||fouxConsole:fouxConsole;}},
        {name: 'autoreload',          title: 'Auto Reload',                          def: false, type:'checkbox', tooltop:'Enabling this will reload the gateway periodically',},
        {name: 'autologin',           title: 'Attempt to login automatically',       def: false, type:'checkbox', tooltip:'Automatically attempt to login to the neverwinter gateway site'},
        {name: 'nw_charcount',         title: '  How many characters',               def: '2',    type:'charcount',     tooltip:'Specify between how many characters script should cycle through (reload page after changing)'},
        {name: 'nw_delay',         title: '  Delay between them',               def: '60',    type:'text2',     tooltip:'Specify delay between characters *in seconds* (reload page after changing)'},
        {name: 'nw_username',         title: '  Account Username',               def: '',    type:'text',     tooltip:''},
        {name: 'nw_password',         title: '  Account Password',               def: '',    type:'password', tooltip:''},
        {name: 'Label',          title: ' Character Name.......LS...MS...PS...LW...Ta....Ar....WS...Al....SL',        def: '',   type:'label',     tooltip:'', repeat:'1'},
        {name: 'autopurchase',        title: 'Auto Purchase Resources',              def: true,  type:'checkbox', tooltip:'Automatically purchase required resources from gateway shop (20 at a time)'},
        {name: 'excluderare',         title: 'Exclude Rare Tasks',                   def: true,  type:'checkbox', tooltip:'Exclude rare tasks to avoid selecting wrong tasks during profession leveling. Selection of specific tasks can be performed by specifying level in task name (eg. "4:Leather Armor +1" will craft the rare task only)'},
        {name: 'ActiveChar',     title: 'Which character was before?',  def: '1',  type:'text4', tooltip:'Do not touch this. It just shows which character was done previously - as a way of checking if script works fine'},
 
    ];
    var setTemp = [];
    for(var i = 0; i < settingnames.length; ++i)
    {
        var t = settingnames[i];
        setTemp.push(t);
        if(t.repeat == 1)
        {
            for(var j = 1; j <= GM_getValue(settingnames[4].name); ++j)
            {
                setTemp.push({name: 'nw_charname'+j,         title: 'Neverwinter Character '+j,            def: '',    type:'text1',     tooltip:'Name of your '+j+' Neverwinter Character'});
                setTemp.push({name: 'Leadership'+j,          title: 'Leadership Tasks.............',        def: '9',   type:'text2',     tooltip:'Number of slots to assign to Leadership for '+j+' character'});
                setTemp.push({name: 'Armorsmithing_Med'+j,   title: 'Mailsmithing Tasks...........',        def: '0',   type:'text2',     tooltip:'Number of slots to assign to Mailsmithing for '+j+' character'});
                setTemp.push({name: 'Armorsmithing_Heavy'+j, title: 'Platesmithing Tasks.........',         def: '0',   type:'text2',     tooltip:'Number of slots to assign to Platesmithing for '+j+' character'});
                setTemp.push({name: 'Leatherworking'+j,      title: 'Leatherworking Tasks......',           def: '0',   type:'text2',     tooltip:'Number of slots to assign to Leatherworking for '+j+' character'});
                setTemp.push({name: 'Tailoring'+j,           title: 'Tailoring Tasks...................',   def: '0',   type:'text2',     tooltip:'Number of slots to assign to Tailoring for '+j+' character'});
                setTemp.push({name: 'Artificing'+j,          title: 'Artificing Tasks....................', def: '0',   type:'text2',     tooltip:'Number of slots to assign to Artificing for '+j+' character'});
                setTemp.push({name: 'Weaponsmithing'+j,      title: 'Weaponsmithing Tasks....',             def: '0',   type:'text2',     tooltip:'Number of slots to assign to Weaponsmithing for '+j+' character'});
                setTemp.push({name: 'Alchemy'+j,             title: 'Alchemy Tasks....................',    def: '0',   type:'text2',     tooltip:'Number of slots to assign to Alchemy for '+j+' character'});
                setTemp.push({name: 'WinterEvent'+j, title: 'Simril Lightcrafitng Tasks.....',    def: '0',   type:'text2',     tooltip:'Number of slots to assign to Simril Lightcrafting for '+j+' character'});
            }
        }
    }
    settingnames = setTemp;
    // Load local settings cache (unsecured)
 
    var settings = {};
    for (var i = 0; i < settingnames.length; i++) {
        // Ignore label types
        if(settingnames[i].type === 'label') {
            continue;
        }
        settings[settingnames[i].name] = GM_getValue(settingnames[i].name, settingnames[i].def);
        // call the onsave for the setting if it exists
        if(typeof(settingnames[i].onsave) === "function") {
            console.log("Calling 'onsave' for", settingnames[i].name);
            settingnames[i].onsave(settings[settingnames[i].name], settings[settingnames[i].name]);
        }
    }
 
    var longDelay = (settings["nw_delay"]*1000);
    // Page Settings
    var PAGES = Object.freeze({
        LOGIN : { name: "Login", path: "div#login"},
        GUARD : { name: "Account Guard", path: "div#page-accountguard"},
        CHARSELECT : { name: "Character Select", path: "div.page-characterselect"},
        FRONTPAGE : { name: "Front Page", path: "div.page-front"},
        PROFESSIONS : { name: "Professions", path: "div.page-professions"},
    });
 
    /**
     * Uses the page settings to determine which page is currently displayed
     */
    function GetCurrentPage() {
        for each(var page in PAGES) {
            if($(page["path"]).filter(":visible").length) {
                return page;
            }
        }
    }
 
    function page_DEFAULT() {
        dfdNextRun.resolve(false,false);
    }
    function page_LOGIN() {
        //if(!$("form > p.error:visible").length && settings["autologin"]) {
            // No previous log in error - attempt to log in
            console.log("Setting username");
            $("input#user").val(settings["nw_username"]);
            console.log("Setting password");
            $("input#pass").val(settings["nw_password"]);
            console.log("Clicking Login Button");
            $("div#login > input").click();
        //}
        dfdNextRun.resolve(false);
    }
    function page_GUARD() {
        // Do nothing on the guard screen
        dfdNextRun.resolve(false,false);
    }
    function page_CHARSELECT() {
        // Select the character if it is set  nw_charcount   ActiveChar
        unsafeWindow.client.sounds.toggle(false);
        var actualchar = settings["ActiveChar"];
        ++actualchar;
        if(actualchar > settings["nw_charcount"]){
            actualchar = 1;
        }
        console.log("Character number to log: " + actualchar);
        settings["ActiveChar"] = actualchar; // Save to local cache
        GM_setValue("ActiveChar", actualchar); // Save to GM cache
        var charname = settings["nw_charname" + actualchar];
        console.log("Character name to log: " + charname);
        if(charname.length) {
            console.log("Trying to click...");
            $(".char-list-name:contains('"+charname+"')").click()
        }
        else {
            console.log("Error: Empty character name");
        }
        dfdNextRun.resolve(false,false);
    }
    function page_FRONTPAGE() {
        // Click the professions tab
        console.log("Click was successfull");
        $("a.professions").click();
        dfdNextRun.resolve(false,false);
    }
    function page_PROFESSIONS() {
        // Switch to overview
        $("a.professions-overview").click();
        WaitForState("").done(function() {
            // List the buttons on the overview
            var completedSlotButtons = $("div.panel-content button").filter(":contains('Collect Result')").filter(":visible");
            var openSlotButtons = $("div.panel-content button").filter(":contains('Choose Task')").filter(":visible");
            var actualchar = settings["ActiveChar"];
            // See if there are any completed tasks on the overview
            if(completedSlotButtons.length) {
                completedSlotButtons[0].click();
                WaitForState("div.professions-rewards-modal button:contains('Collect Result')").done(function() {
                    $("div.professions-rewards-modal button:contains('Collect Result')").click();
                    WaitForState("").done(function() {
                        dfdNextRun.resolve(true,false);
                    });
                });
            }
            // See if there are any open tasks on the overview
            else if(openSlotButtons.length) {
                var foundTask = false;
                // Go through the professions to assign tasks until specified slots filled
                for (var i = 0; i < tasklist.length; i++) {
                    var currentTasks = $("div.professions-slot-icon." + tasklist[i].taskName);
                        if(currentTasks.length < settings[tasklist[i].taskName+actualchar]) {
                            foundTask = true;
                            openSlotButtons[0].click();
                            WaitForState("div#content_professions:visible").done(function() {
                                // Switch to correct type
                                $("a.professions-" + tasklist[i].taskName).click();
                                WaitForState("").done(function() {
                                    createNextTask(tasklist[i], 0, dfdNextRun);
                                });
                            });
                            break;
                        }
                }
                if(!foundTask) {
                    console.log("All task counts assigned");
                    dfdNextRun.resolve(false,false);
                }
            }
            else {
                dfdNextRun.resolve(false,true);
            }
        });
    }
 
    /**
     * Iterative approach to finding the next task to assign to an open slot.
     *
     * @param {Array} list The list of task names to try in order of precedence
     * @param {int} i The current attempt number. Will try to find the i'th task.
     * @param {Deferred} dff The deffered object to resolve when a task is found or if all tasks were not found
     */
    function createNextTask(prof, i, dff) {
        // Check level
        var level = parseInt($("a.professions-"+prof.taskName).closest("span").prevAll("div:first").find("span").text());
        console.log(prof.taskName, "is level", level);
        var list = prof.level[level];
        console.log("createNextTask", list.length, i);
        if(list.length <=i) {
            console.log("Nothing Found");
            dff.resolve(false);
            return;
        }
 
        var taskName = list[i];
        console.log("Searching for task:", taskName);
        var task = SearchForTaskByName(taskName, prof.taskName, level);
        if(task == null) {
            console.log("Skipping task selection to purchase resources");
            dff.resolve(false);
            return;
        }
        if(task) {
            console.log('Task Found');
            task.click();
            WaitForState("div.page-professions-taskdetails").done(function() {
                // Click all buttons and select an item to use in the slot
                var def = $.Deferred();
                var buttonList = $("h3:contains('Optional Assets:')").closest("div").find("button");
                if(buttonList.length) {
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
                    if(enabledButton.length) {
                        console.log("Clicking Start Task Button");
                        enabledButton.click();
                        WaitForState("").done(function() {
                            // Done
                            dff.resolve(true);
                        });
                    }
                    else { // Button not enabled, something required was probably missing
                        // Go back
                        $("div.footer-body > div.input-field.button > button:contains('Back')").click();
                        WaitForState("").done(function() {
                            // continue with the next one
                            console.log('Finding next task');
                            createNextTask(prof, i+1, dff);
                        });
                    }
                });
            });
        }
        else {
            console.log('Finding next task');
            createNextTask(prof, i+1, dff);
        }
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
            if(prof.taskName === "Leadership") {
                var mercenarys = $("div.modal-item-list a.Bronze:contains('Mercenary')");
                var guards = $("div.modal-item-list a.Bronze:contains('Guard')");
                var footmen = $("div.modal-item-list a.Bronze:contains('Footman')");
 
                if(mercenarys.length)   { clicked = true; mercenarys[0].click(); }
                else if(guards.length)  { clicked = true; guards[0].click(); }
                else if(footmen.length) { clicked = true; footmen[0].click(); }
            }
            else if(prof.taskName === "Tailoring") {
                var mercenarys = $("div.modal-item-list a.Bronze:contains('Weaver')");
                var guards = $("div.modal-item-list a.Bronze:contains('Outfitter')");
                var footmen = $("div.modal-item-list a.Bronze:contains('Assistant Tailor')");
 
                if(mercenarys.length)   { clicked = true; mercenarys[0].click(); }
                else if(guards.length)  { clicked = true; guards[0].click(); }
                else if(footmen.length) { clicked = true; footmen[0].click(); }
            }
            else if(prof.taskName === "Weaponsmithing") {
                var mercenarys = $("div.modal-item-list a.Bronze:contains('Smelter')");
                var guards = $("div.modal-item-list a.Bronze:contains('Grinder')");
                var footmen = $("div.modal-item-list a.Bronze:contains('Assistant Weaponsmith')");
 
                if(mercenarys.length)   { clicked = true; mercenarys[0].click(); }
                else if(guards.length)  { clicked = true; guards[0].click(); }
                else if(footmen.length) { clicked = true; footmen[0].click(); }
            }
            else if(prof.taskName === "Platesmithing") {
                var mercenarys = $("div.modal-item-list a.Bronze:contains('Miner')");
                var guards = $("div.modal-item-list a.Bronze:contains('Armorer')");
                var footmen = $("div.modal-item-list a.Bronze:contains('Assistant Platesmith')");
 
                if(mercenarys.length)   { clicked = true; mercenarys[0].click(); }
                else if(guards.length)  { clicked = true; guards[0].click(); }
                else if(footmen.length) { clicked = true; footmen[0].click(); }
            }
            else if(prof.taskName === "Mailsmithing") {
                var mercenarys = $("div.modal-item-list a.Bronze:contains('Prospector')");
                var guards = $("div.modal-item-list a.Bronze:contains('Blacksmith')");
                var footmen = $("div.modal-item-list a.Bronze:contains('Assistant Mailsmith')");
 
                if(mercenarys.length)   { clicked = true; mercenarys[0].click(); }
                else if(guards.length)  { clicked = true; guards[0].click(); }
                else if(footmen.length) { clicked = true; footmen[0].click(); }
            }
            else if(prof.taskName === "Leatherworking") {
                var mercenarys = $("div.modal-item-list a.Bronze:contains('Skinner')");
                var guards = $("div.modal-item-list a.Bronze:contains('Tanner')");
                var footmen = $("div.modal-item-list a.Bronze:contains('Assistant Leatherworker')");
 
                if(mercenarys.length)   { clicked = true; mercenarys[0].click(); }
                else if(guards.length)  { clicked = true; guards[0].click(); }
                else if(footmen.length) { clicked = true; footmen[0].click(); }
            }
            else if(prof.taskName === "Artificing") {
                var mercenarys = $("div.modal-item-list a.Bronze:contains('Carver')");
                var guards = $("div.modal-item-list a.Bronze:contains('Engraver')");
                var footmen = $("div.modal-item-list a.Bronze:contains('Assistant Artificer')");
 
                if(mercenarys.length)   { clicked = true; mercenarys[0].click(); }
                else if(guards.length)  { clicked = true; guards[0].click(); }
                else if(footmen.length) { clicked = true; footmen[0].click(); }
            }
            else if(prof.taskName === "Alchemy") {
                var mercenarys = $("div.modal-item-list a.Bronze:contains('Apothecary')");
                var guards = $("div.modal-item-list a.Bronze:contains('Mixologist')");
                var footmen = $("div.modal-item-list a.Bronze:contains('Assistant Alchemist')");
 
                if(mercenarys.length)   { clicked = true; mercenarys[0].click(); }
                else if(guards.length)  { clicked = true; guards[0].click(); }
                else if(footmen.length) { clicked = true; footmen[0].click(); }
            }
 
            if (!clicked) {
                // Click the highest slot
                if(specialItems.length)     { specialItems[0].click(); }
                else if(goldItems.length)   { goldItems[0].click(); }
                else if(silverItems.length) { silverItems[0].click(); }
                else if(bronzeItems.length) { bronzeItems[0].click(); }
                else { $("button.close-button").click(); }
            }
 
            console.log("Clicked item");
            WaitForState("").done(function() {
                // Get the new set of select buttons created since the other ones are removed when the asset loads
                var buttonList = $("h3:contains('Optional Assets:')").closest("div").find("button");
                if(i < buttonList.length - 1) {
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
     * Given a task name and that the search pane is active, will attempt to search for the given task
     * and return the button element if the level and resource criteria are met.
     *
     * @param {String} taskname The name of the task to search within the search pane for
     */
    function SearchForTaskByName(taskname, profName, profLevel) {
        var tasklevel = 0;
        if(taskname.indexOf(":") > -1) {
            // split task with level requirement
            tasklevel=taskname.split(":",2)[0];
            taskname=taskname.split(":",2)[1];
        }
        // Filter the results
        var filterDiv = $("div#tasklist_filter input");
        console.log("Searching for:", taskname);
        filterDiv.val(taskname);
        filterDiv.keyup();
 
        // Find the result
        var taskTitle = $("table#tasklist tr h4 span").filter(function() {
            return $(this).text() === taskname;
        });
        if(taskTitle.length) {
            for (var i = 0; i < taskTitle.length; i++) {
                if($(taskTitle[i]).closest("div.rare").length && profName != "Leadership" && settings["excluderare"]) {
                    // Avoid rare tasks unless profession is Leadership
                    console.log("Avoiding rare craft: ", taskname);
                }
                else if($(taskTitle[i]).closest("div.higherlevel").length) {
                    // Too high level
                    console.log("Task level is too high: ", taskname);
                }
                else if(tasklevel > 0 && $(taskTitle[i]).closest("div").find("span.level-pip").text() != tasklevel) {
                    // Task level doesn't match
                    console.log("Task level does not match requirement: ", taskname, tasklevel);
                }
                else if($(taskTitle[i]).closest("div.unmet").length) {
                    // Check for required ingredients
                    console.log("Checking for craftable ingredients for", taskname);
                    var requires = $(taskTitle[i]).closest("div.unmet").find("div.task-requirements div.icon-slot.red").filter("[data-tt-item]");
                    for (var j = 0; j < requires.length; j++) {
                        var ingName = $(requires[j]).attr("data-tt-item");
                        console.log("Found", ingName);
                        var searchStr = ingName;
 
                        // Specify task search string depending on type of ingredient required
                        // Add here any ingredient types you want to check tasks for
 
                        // Resources
                        if     (ingName.indexOf("Resource_Charcoal")         > -1
                             || ingName.indexOf("Resource_Rocksalt")         > -1
                             || ingName.indexOf("Resource_Spool_Thread")     > -1
                             || ingName.indexOf("Resource_Porridge")         > -1
                             || ingName.indexOf("Resource_Solvent")          > -1
                             || ingName.indexOf("Resource_Brimstone")        > -1
                             || ingName.indexOf("Resource_Coal")             > -1
                             || ingName.indexOf("Resource_Moonseasalt")      > -1
                             || ingName.indexOf("Resource_Quicksilver")      > -1
                             || ingName.indexOf("Resource_Spool_Threadsilk") > -1) {
                            if (settings["autopurchase"]) {
                                BuyResource(ingName);
                                return null;
                            }
                            else {
                                console.log("Auto resource purchasing disabled");
                                continue;
                            }
                        }
 
                        else if(ingName.indexOf("Resource_Wood_Carved")      > -1
                             || ingName.indexOf("Resource_Ornaments")        > -1
                             || ingName.indexOf("Resource_Weapon")           > -1) { searchStr = "Craft"; }
                        else if(ingName.indexOf("Resource_Pelt")             > -1
                             || ingName.indexOf("Resource_Wood")             > -1
                             || ingName.indexOf("Resource_Ore")              > -1
                             || ingName.indexOf("Resource_Clothscraps")      > -1) { searchStr = "Gather"; }
                        else if(ingName.indexOf("Resource_Leather")          > -1) { searchStr = "Cure Pelt"; }
                        else if(ingName.indexOf("Resource_Rings")            > -1) { searchStr = "Forge Ring"; }
                        else if(ingName.indexOf("Resource_Clothbolt")        > -1) { searchStr = "Weave Cloth"; }
                        else if(ingName.indexOf("Resource_Ingot")            > -1) { searchStr = "Forge Plate"; }
 
                        // Alchemy
                        else if(ingName.indexOf("Aquavitae")                 > -1) { searchStr = "Aqua Vitae"; }
                        else if(ingName.indexOf("Aquaregia")                 > -1) { searchStr = "Aqua Regia"; }
                        else if(ingName.indexOf("Vitriol")                   > -1) { searchStr = "Vitriol Extraction"; }
                        else if(ingName.indexOf("Potion")                    > -1) { searchStr = ingName.replace(/Potion_/,"").replace(/_[0-9]+$/,""); }
 
                        // Shirts
                        else if(ingName.indexOf("Chain_Shirt")               > -1) { searchStr = "Chain Shirt"; }
                        else if(ingName.indexOf("Scale_Shirt")               > -1
                             || ingName.indexOf("Med_Armorsmithing_Shirt")   > -1) { searchStr = "Scale Shirt"; }
                        else if(ingName.indexOf("Shirt")                     > -1) { searchStr = "Shirt"; }
 
                        // Pants
                        else if(ingName.indexOf("Chain_Pants")               > -1) { searchStr = "Chain Pants"; }
                        else if(ingName.indexOf("Scale_Pants")               > -1
                             || ingName.indexOf("Med_Armorsmithing_Pants")   > -1) { searchStr = "Scale Pants"; }
                        else if(ingName.indexOf("Pants")                     > -1) { searchStr = "Pants"; }
 
                        // Armor
                        else if(ingName.indexOf("T1_Chain_Armor")            > -1) { searchStr = "Skip Me"; }
                        else if(ingName.indexOf("T2_Chain_Armor")            > -1) { searchStr = "Skip Me"; }
                        else if(ingName.indexOf("Chain_Armor")               > -1) { searchStr = "Chain Armor"; }
                        else if(ingName.indexOf("T1_Scale_Armor")            > -1) { searchStr = "Skip Me"; }
                        else if(ingName.indexOf("T2_Scale_Armor")            > -1) { searchStr = "Skip Me"; }
                        else if(ingName.indexOf("Scale_Armor")               > -1) { searchStr = "Scale Armor"; }
                        else if(ingName.indexOf("T1_Cloth_Armor")            > -1) { searchStr = "Skip Me"; }
                        else if(ingName.indexOf("T2_Cloth_Armor")            > -1) { searchStr = "Skip Me"; }
                        else if(ingName.indexOf("Cloth_Armor")               > -1) { searchStr = "Cloth Robes"; }
                        else if(ingName.indexOf("T1_Leather_Armor")          > -1) { searchStr = "Skip Me"; }
                        else if(ingName.indexOf("T2_Leather_Armor")          > -1) { searchStr = "Skip Me"; }
                        else if(ingName.indexOf("Leather_Armor")             > -1) { searchStr = "Leather Armor"; }
                        else if(ingName.indexOf("T1_Plate_Armor")            > -1) { searchStr = "Skip Me"; }
                        else if(ingName.indexOf("T2_Plate_Armor")            > -1) { searchStr = "Skip Me"; }
                        else if(ingName.indexOf("Plate_Armor")               > -1) { searchStr = "Plate Armor"; }
 
                        // Helms
                        else if(ingName.indexOf("Chain_Helm")                > -1) { searchStr = "Chain Helm"; }
                        else if(ingName.indexOf("Med_Armorsmithing_T2_Helm") > -1) { searchStr = "Scale Helm"; }
                        else if(ingName.indexOf("Tailoring_T2_Helm")         > -1) { searchStr = "Cloth Cap"; }
                        else if(ingName.indexOf("Helm")                      > -1) { searchStr = "Helm"; }
 
                        // Arms
                        else if(ingName.indexOf("T1_Chain_Gloves")           > -1) { searchStr = "Chain Gloves +1"; }
                        else if(ingName.indexOf("T2_Chain_Gloves")           > -1) { searchStr = "Chain Gloves +2"; }
                        else if(ingName.indexOf("Chain_Gloves")              > -1) { searchStr = "Chain Gloves"; }
                        else if(ingName.indexOf("T1_Scale_Gloves")           > -1) { searchStr = "Scale Gauntlets +1"; }
                        else if(ingName.indexOf("T2_Scale_Gloves")           > -1) { searchStr = "Scale Gauntlets +2"; }
                        else if(ingName.indexOf("Scale_Gloves")              > -1) { searchStr = "Scale Gauntlets"; }
                        else if(ingName.indexOf("T1_Cloth_Gloves")           > -1) { searchStr = "Cloth Sleeves +1"; }
                        else if(ingName.indexOf("T2_Cloth_Gloves")           > -1) { searchStr = "Cloth Sleeves +2"; }
                        else if(ingName.indexOf("Cloth_Gloves")              > -1) { searchStr = "Cloth Sleeves"; }
                        else if(ingName.indexOf("T1_Leather_Gloves")         > -1) { searchStr = "Leather Gloves +1"; }
                        else if(ingName.indexOf("T2_Leather_Gloves")         > -1) { searchStr = "Leather Bracers +2"; }
                        else if(ingName.indexOf("Leather_Gloves")            > -1) { searchStr = "Leather Bracers"; }
                        else if(ingName.indexOf("T1_Plate_Gloves")           > -1) { searchStr = "Plate Gauntlets +1"; }
                        else if(ingName.indexOf("T2_Plate_Gloves")           > -1) { searchStr = "Plate Gauntlets +2"; }
                        else if(ingName.indexOf("Plate_Gloves")              > -1) { searchStr = "Plate Gauntlets"; }
 
                        // Boots
                        else if(ingName.indexOf("T1_Chain_Boots")            > -1) { searchStr = "Chain Boots +1"; }
                        else if(ingName.indexOf("T2_Chain_Boots")            > -1) { searchStr = "Chain Boots +2"; }
                        else if(ingName.indexOf("Chain_Boots")               > -1) { searchStr = "Chain Boots"; }
                        else if(ingName.indexOf("T1_Scale_Boots")            > -1) { searchStr = "Scale Boots +1"; }
                        else if(ingName.indexOf("T2_Scale_Boots")            > -1) { searchStr = "Scale Boots +2"; }
                        else if(ingName.indexOf("Scale_Boots")               > -1) { searchStr = "Scale Boots"; }
                        else if(ingName.indexOf("T1_Cloth_Boots")            > -1) { searchStr = "Cloth Boots +1"; }
                        else if(ingName.indexOf("T2_Cloth_Boots")            > -1) { searchStr = "Cloth Boots +2"; }
                        else if(ingName.indexOf("Cloth_Boots")               > -1) { searchStr = "Cloth Boots"; }
                        else if(ingName.indexOf("T1_Leather_Boots")          > -1) { searchStr = "Leather Boots +1"; }
                        else if(ingName.indexOf("T2_Leather_Boots")          > -1) { searchStr = "Leather Boots +2"; }
                        else if(ingName.indexOf("Leather_Boots")             > -1) { searchStr = "Leather Boots"; }
                        else if(ingName.indexOf("T1_Plate_Boots")            > -1) { searchStr = "Plate Boots +1"; }
                        else if(ingName.indexOf("T2_Plate_Boots")            > -1) { searchStr = "Plate Boots +2"; }
                        else if(ingName.indexOf("Plate_Boots")               > -1) { searchStr = "Plate Boots"; }
 
                        // Daggers
                        else if(ingName.indexOf("T2_Dagger_3")               > -1) { searchStr = "Dagger +3"; }
                        else if(ingName.indexOf("T2_Dagger_2")               > -1) { searchStr = "Dagger +2"; }
                        else if(ingName.indexOf("T1_Dagger_1")               > -1) { searchStr = "Dagger +1"; }
 
                        // Icons
                        else if(ingName.indexOf("T3_Icon_Virtuous_4")        > -1) { searchStr = "Virtuous Icon +4"; }
                        else if(ingName.indexOf("T2_Icon_Virtuous_3")        > -1) { searchStr = "Virtuous Icon +3"; }
                        else if(ingName.indexOf("T1_Icon_Virtuous_2")        > -1) { searchStr = "Virtuous Icon +2"; }
                        else if(ingName.indexOf("T1_Icon_Virtuous_1")        > -1) { searchStr = "Virtuous Icon +1"; }
 
                        // Shields
                        else if(ingName.indexOf("T2_Shield")                 > -1) { searchStr = "Steel Shield"; }
                        else if(ingName.indexOf("T1_Shield")                 > -1) { searchStr = "Iron Shield"; }
 
                        else {
                            console.log("Found unhandled ingredient", ingName);
                            continue;
                        }
 
                        console.log("Searching for tasks for:", searchStr);
                        filterDiv.val(searchStr);
                        filterDiv.keyup();
                        // Find the ingredient task
                        var ingTaskIcon = $("table#tasklist div.task-rewards div.icon-slot").filter(function() {
                            return $(this).attr("data-tt-item") === ingName;
                        });
 
                        // Check ingredient task for requirements and return task if valid
                        if (ingTaskIcon.length) {
                            for (var k = 0; k < ingTaskIcon.length; k++) {
                                var ingTitle = $($(ingTaskIcon[k]).closest("div.task-list-entry").find("h4 span")).text();
 
                                console.log("Found ingredient task",ingTitle);
                                // Skip mass production tasks
                                if(ingTitle.indexOf("Mass ") == 0) { continue; }
                                // Skip deep gathering tasks
                                if(ingTitle.indexOf("Deep ") == 0) { continue; }
                                // Skip intensive gathering tasks
                                if(ingTitle.indexOf("Intensive ") == 0) { continue; }
                                // Skip Batch gathering tasks
                                if(ingTitle.indexOf("Batch ") == 0) { continue; }
                                // Skip Empowered gathering tasks
                                if(profLevel<8){
                                    if(ingTitle.indexOf("Empowered ") == 0) { continue; }
                                }
 
                                // Search for correct level task for same named Artificing gather tasks
                                if(ingTitle.indexOf("Gather Ore and Wood") > -1 || ingTitle.indexOf("Craft Ornamental metal and Carved Wood") > -1) {
                                    if     (ingName.indexOf("_T1") > -1) { ingTitle = "1:" + ingTitle }
                                    else if(ingName.indexOf("_T2") > -1) { ingTitle = "7:" + ingTitle }
                                    else if(ingName.indexOf("_T3") > -1) { ingTitle = "14:" + ingTitle }
                                }
 
                                var ingTask = SearchForTaskByName(ingTitle, profName, profLevel);
                                console.log("Requesting required ingredient task", ingTitle);
                                return ingTask;
                            }
                        }
                        else { console.log("No ingredient tasks available:", taskname); }
                    }
 
                    // Not enough resources
                    console.log("Not enough resources:", taskname);
                }
                else {
                    return $(taskTitle[i]).closest("tr").find("button");
                }
            }
            console.log("No valid tasks found:", taskname);
        }
        return false;
    }
 
    /**
     * Will buy a given purchasable resource
     *
     * @param {String} item The data-tt-item id of the Resource to purchase
     */
    function BuyResource(item) {
        console.log("Purchasing resources:", item);
        // Switch to overview
        $("a.professions-overview").click();
        WaitForState("").done(function() {
            // Enter resource shop
            $("button").filter(function() { return $(this).attr("data-url") === "/professions/vendor"; }).click();
            WaitForState("ul.vendor-group.resources li.vendor-entry div").done(function() {
                // Get shop section for required item
                var shopItem = $("ul.vendor-group.resources li.vendor-entry div").filter(function() {
                    return $(this).attr("data-tt-item") === item;
                }).closest("li");
                shopItem.find("button").click();
                WaitForState("input[name='inventoryBuyQty']").done(function() {
                    // Set purchase amount to 20 and buy
                    $("input[name='inventoryBuyQty']").val(20);
                    $("button:contains('OK')").click();
                    console.log("Resources purchased");
                    // Close the notification that never times out
                    WaitForState("button.closeNotification").done(function() {
                        $("button.closeNotification").click();
                    });
                });
            });
        });
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
        window.setTimeout(function() {AttemptResolve(query, dfd);}, delayShort); // Doesn't work without a short delay
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
        if((query === "" || $(query).length) && $("div.loading-image:visible").length == 0) {
            dfd.resolve();
        }
        else {
            window.setTimeout(function() {AttemptResolve(query, dfd);}, delayShort); // Try again in a little bit
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
 
        // Check if timer is paused
        if(settings["paused"]) {
            // Just continue later - the deferred object is still set and nothing will resolve it until we get past this point
            var timerHandle = window.setTimeout(function() {process();}, delay);
            return;
        }
 
        // check for errors
        if($("title").text() == "Error" && settings["autologin"]) {
            console.log("Error detected - relogging");
            unsafeWindow.location.href = "http://gateway.playneverwinter.com";
            return;
        }
 
        // Check if a reload is needed
        if(reloadNeeded && settings["autologin"] && settings["autoreload"]) {
            console.log("Reloading Gateway");
            unsafeWindow.location.href = "http://gateway.playneverwinter.com";
            reloadNeeded = false;
            return;
        }
 
        // Check for Gateway down
        if(window.location.href.indexOf("gatewaysitedown") > -1) {
            // Do a long delay and then retry the site
            var minuty = (longDelay-longDelay%60000)/60000;
            var sekundy = (longDelay%60000)/1000;
            console.log("Gateway down detected - relogging in " + (minuty>0?(sekundy>0?minuty + " minute(s) and " + sekundy + " second(s)":minuty + " minute(s)"):sekundy + " second(s)"));
            window.setTimeout(function() {unsafeWindow.location.href = "http://gateway.playneverwinter.com";}, longDelay);
            return;
        }
 
        // Determine which page is displaying
        var currentPage = GetCurrentPage();
             if(currentPage == PAGES.LOGIN)       { page_LOGIN();       }
        else if(currentPage == PAGES.GUARD)       { page_GUARD();       }
        else if(currentPage == PAGES.CHARSELECT)  { page_CHARSELECT();  }
        else if(currentPage == PAGES.FRONTPAGE)   { page_FRONTPAGE();   }
        else if(currentPage == PAGES.PROFESSIONS) { page_PROFESSIONS(); }
        else                                      { page_DEFAULT();     }
 
        // Continue again later
        dfdNextRun.done(function(useShortDelay, charChangeDelay) {
            dfdNextRun = $.Deferred();
            if(charChangeDelay) {
                var minuty = (longDelay-longDelay%60000)/60000;
                var sekundy = (longDelay%60000)/1000;
                console.log("To change characters script will relog in " + (minuty>0?(sekundy>0?minuty + " minute(s) and " + sekundy + " second(s)":minuty + " minute(s)"):sekundy + " second(s)"));
                timerHandle = window.setTimeout(function() {unsafeWindow.location.href = "http://gateway.playneverwinter.com";}, longDelay);
            }
            else {
                timerHandle = window.setTimeout(function() {process();}, useShortDelay===true?delayShort:delay);
            }
            if(!reloadTimerHandle) {
                reloadTimerHandle = window.setTimeout(function() { reloadNeeded = true; }, reloadDelay);
            }
        });
    }
 
    function addSettings() {
        if($("#settingsButton").length)
            return;
        // Add the required CSS
        AddCss("\
            #settingsButton{border-bottom: 1px solid rgb(102, 102, 102); border-right: 1px solid rgb(102, 102, 102); background: none repeat scroll 0% 0% rgb(238, 238, 238); display: block; position: fixed; overflow: auto; right: 0px; top: 0px; padding: 3px; z-index: 1000;}\
            #settingsPanel{border-bottom: 1px solid rgb(102, 102, 102); border-right: 1px solid rgb(102, 102, 102); background: none repeat scroll 0% 0% rgb(238, 238, 238); color: rgb(0, 0, 0); position: fixed; overflow: auto; right: 0px; top: 0px; width: 360px; font: 12px sans-serif; text-align: left; display: block; z-index: 1000;}\
            #settings_title{font-weight: bolder; background: none repeat scroll 0% 0% rgb(204, 204, 204); border-bottom: 1px solid rgb(102, 102, 102); padding: 3px;}\
            #settingsPanelButtonContainer {background: none repeat scroll 0% 0% rgb(204, 204, 204); border-top: 1px solid rgb(102, 102, 102);padding: 3px;text-align:center} \
            #settingsPanel label.purple {font-weight:bold;color:#7C37F6}\
            #settingsPanel label.blue {font-weight:bold;color:#007EFF}\
            #settingsPanel label.green {font-weight:bold;color:#8AFF00}\
            #settingsPanel label.white {font-weight:bold;color:#FFFFFF}\
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
                    <ul style="list-style: none outside none; max-height: 800px; overflow: auto; margin: 3px; padding: 0px;">\
                    </ul>\
                </form>\
            </div>'
        );
 
        // Add each setting input
        var settingsList = $("#settingsPanel form ul");
        for (var i=0;i<settingnames.length;i++) {
            var id = 'settings_' + settingnames[i].name;
            var indent = countLeadingSpaces(settingnames[i].title) * 2;
            switch(settingnames[i].type) {
                case "checkbox":
                    settingsList.append('<li title="'+settingnames[i].tooltip+'" style="margin-left:'+indent+'em"><input style="margin:4px" name="'+id+'" id="'+id+'" type="checkbox" /><label class="'+settingnames[i].class+'" for="'+id+'">'+settingnames[i].title+'</label></li>')
                    $('#'+id).prop('checked', settings[settingnames[i].name]);
                    break;
                case "text1":
                    appendingus = '<li style="margin-left:'+indent+'em">';
                    appendingus = appendingus + '<input title="'+settingnames[i].tooltip+'" style="margin:4px; width:120px" name="'+id+'" id="'+id+'" type="text" />';
                    for(var j = 1; j <= 9; ++j)
                        {
                            var id2 = 'settings_' + settingnames[i+j].name;
                            appendingus = appendingus + '<input title="'+settingnames[i+j].tooltip+'" style="margin:4px; width:15px" name="'+id2+'" id="'+id2+'" type="text" />';
                        }
                    appendingus = appendingus + '</li>';
                    settingsList.append(appendingus)
                    for(var j = 0; j <= 10; ++j)
                        {
                            var id2 = 'settings_' + settingnames[i+j].name;
                            $('#'+id2).val(settings[settingnames[i+j].name]);
                        }
                    break;
                case "text":
                    settingsList.append('<li title="'+settingnames[i].tooltip+'" style="margin-left:'+indent+'em"><label class="'+settingnames[i].class+'" for="'+id+'">'+settingnames[i].title+'</label><input style="margin:4px" name="'+id+'" id="'+id+'" type="text" /></li>')
                    $('#'+id).val(settings[settingnames[i].name]);
                    break;
                case "text4":
                    settingsList.append('<li title="'+settingnames[i].tooltip+'" style="margin-left:'+indent+'em"><label class="'+settingnames[i].class+'" for="'+id+'">'+settingnames[i].title+'</label><input style="margin:4px; width:20px" name="'+id+'" id="'+id+'" type="text" disabled /></li>')
                    $('#'+id).val(settings[settingnames[i].name]);
                    break;
                case "charcount":
                    settingsList.append('<li style="margin-left:'+indent+'em"><label title="'+settingnames[i].tooltip+'" class="'+settingnames[i].class+'" for="'+id+'">'+settingnames[i].title+'</label><input title="'+settingnames[i].tooltip+'" style="margin:4px; width:22px" name="'+id+'" id="'+id+'" type="text" /></li>')
                    $('#'+id).val(settings[settingnames[i].name]);
                    var id2 = 'settings_' + settingnames[i+1].name;
                    settingsList.append('<li style="margin-left:'+indent+'em"><label title="'+settingnames[i+1].tooltip+'" class="'+settingnames[i+1].class+'" for="'+id2+'">'+settingnames[i+1].title+'</label><input title="'+settingnames[i+1].tooltip+'" style="margin:4px; width:40px" name="'+id2+'" id="'+id2+'" type="text" /></li>')
                    $('#'+id2).val(settings[settingnames[i+1].name]);
                    break;
                case "password":
                    settingsList.append('<li title="'+settingnames[i].tooltip+'" style="margin-left:'+indent+'em"><label class="'+settingnames[i].class+'" for="'+id+'">'+settingnames[i].title+'</label><input style="margin:4px" name="'+id+'" id="'+id+'" type="password" /></li>')
                    $('#'+id).val(settings[settingnames[i].name]);
                    break;
                case "select":
                    settingsList.append('<li title="'+settingnames[i].tooltip+'" style="margin-left:'+indent+'em"><label class="'+settingnames[i].class+'" style="padding-left:4px" for="'+id+'">'+settingnames[i].title+'</label><select style="margin:4px" name="'+id+'" id="'+id+'" /></li>')
                    var options = settingnames[i].opts;
                    var select = $('#'+id);
                    for(var j=0;j<options.length;j++) {
                        if(settings[settingnames[i].name] == options[j].path)
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
        // Add save/cancel buttons to panel
        $("#settingsPanel form").append('\
            <div id="settingsPanelButtonContainer">\
                <input id="settings_save" type="button" value="Save and Apply">\
                <input id="settings_close" type="button" value="Close">\
            </div>');
 
        // Add open settings button to page
        $("body").append('<div id="settingsButton"><img src="'+image_prefs+'" title="Click to show preferences" style="cursor: pointer; display: block;"></div>');
 
        // Add the javascript
        $("#settingsPanel").hide();
        $("#settingsButton").click(function() {
            $("#settingsButton").hide();
            $("#settingsPanel").show();
        });
        $("#settings_close,settings_cancel").click(function() {
            $("#settingsButton").show();
            $("#settingsPanel").hide();
        });
 
        // Use setTimeout to workaround permission issues when calling GM functions from main window
        $("#settings_save").click(function() { setTimeout(function() { SaveSettings();}, 0)});
    }
 
    function SaveSettings() {
        // Get each value from the UI
        for (var i=0;i<settingnames.length;i++) {
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
                case "text1":
                    value = el.val();
                    break;
                case "text2":
                    value = el.val();
                    break;
                case "text3":
                    value = el.val();
                    break;
                case "text4":
                     continue;
                case "charcount":
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
            if(typeof(settingnames[i].onsave) === "function") {
                console.log("Calling 'onsave' for", name);
                settingnames[i].onsave(value, settings[name]);
            }
            settings[name] = value; // Save to local cache
            GM_setValue(name, value); // Save to GM cache
        }
        // Close the panel
        $("#settingsButton").show();
        $("#settingsPanel").hide();
    }
 
    // Add the settings button and start a process timer
    addSettings();
    timerHandle = window.setTimeout(function() {process();}, delayShort);
})();