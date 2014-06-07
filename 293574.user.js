// ==UserScript==
// @name           Neverwinter Gateway Automation
// @description    Automates Neverwinter Gateway Tasks
// @namespace      http://userscripts.org/scripts/show/293574
// @include        https://gateway.playneverwinter.com
// @include        https://gateway.playneverwinter.com/*
// @include        https://gatewaysitedown.playneverwinter.com
// @include        https://gatewaysitedown.playneverwinter.com/*
// @include        http://gateway.playneverwinter.com
// @include        http://gateway.playneverwinter.com/*
// @include        http://gatewaysitedown.playneverwinter.com
// @include        http://gatewaysitedown.playneverwinter.com/*
// @updateURL      https://userscripts.org/scripts/source/293574.meta.js
// @downloadURL    https://userscripts.org/scripts/source/293574.user.js
// @require        http://code.jquery.com/jquery-1.11.0.js
// @originalAuthor Mustex
// @modifiedBy     Bunta
// @modifiedBy     Jaytime
// @version        0.2.3.4
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_listValues
// @grant          GM_deleteValue
// @grant          GM_addStyle
// @grant          GM_getResourceText
// @grant          unsafeWindow
// ==/UserScript==
/* ------------------------------------------------------------------------------------------------------------------
 Changelog:
 
 0.2.3.4
     Added.  
             - Script will now purchase common assets in the store (untested)
             - Page idle checking (derived from Bunta's script) which should help with "stuck" pages.
             
     Fixed.
             - The script will no longer reload the gateway if settings prevent it. "Paused" will prevent any
               reloading, and having "auto login" disabled will prevent scheduled reloads or reloading after an
               error has occured. Disabling scheduled reloads will only prevent scheduled reloads. This now makes
               the script logic match the assumed behavior. Note: If auto-login is disabled, it'll now show you
               where it broke/errored at instead of reloading and sitting at the login page!
             

 0.2.3.3
     Fixed.
             - Moved Reload timer out of main loop (oops!)
             - SCA reward should now collect properly
     
     Added. 
             - New Leadership model added (Merged from Bunta's)
             - @require'ing jQuery 1.11.0 to override Gateway's 0.10.2 minimized (and broken?) version.
 
               
               
      Todo.  (0.2.4 milestone)   
              
     (major) + Finish Options Dialog
             + Add settings storing & retrieving
             
     (minor) + Smart Resource Purchasing (Purchase only missing quantity)
             + Detect Rough Astral Diamonds collected from Tasks and only refine when needed
             + Once a SCA reward is collected, at least 24 hours has to pass before another attempt is made. If no known 
             reward collection has occured, then attempt once every 60 minutes. 
               
               
    Credits: Mustex, Bunta, Eversor, Wilz P, miah, and anyone else that has made contributions. Thank you!
------------------------------------------------------------------------------------------------------------------ */ 
if(window.self !== window.top) { throw ""; } // No frames
(function() {

  // Setup global console variables
  var fouxConsole = {log:function(){},info:function(){},error:function(){},warn:function(){}};
  var console = unsafeWindow.console || fouxConsole; 
  var $ = unsafeWindow.jQuery;
  
  var Option = {}, timer = [], needTo = [], delay = [], pageCheck = [];
  
  // Remote Source/CSS locations for jQuery-UI (@require/@resource workaround)
  var jqueryui_src = "//code.jquery.com/ui/1.10.4/jquery-ui.js"
  var jqueryui_css = "//code.jquery.com/ui/1.10.4/themes/dark-hive/jquery-ui.css"
  
  // Timer & State variables
  timer.Main     = false;
  timer.Reload   = false;
  timer.Switch   = false;
  timer.Loading  = false;
  
  needTo.Reload  = false;
  needTo.Switch  = false;
  needTo.Refine  = false;
  needTo.Roll    = false;
  
  pageCheck.last_href  = "";
  pageCheck.idle_time  = 0;
  pageCheck.load_time  = 0;
  
  // Delay variables (Value is milliseconds)
  delay.Reload  = 1800000;  // 30min
  delay.Down    = 60000;    // 1min
  delay.Default = 5000;     // 5sec
  delay.Short   = 1500;     // 1.5sec
  delay.Switch  = 10000;    // 10sec

  delay.Idle    = 60000;  // 1min
  delay.Loading = 30000;  // 30sec
  
 /* ---------------------------------------------- TASKLISTS --------------------------------------------------------------------            
          Tasks are checked First to Last order  A task can have a level defined so the
          script will strictly use that level task (E.g. 2:Fish for Light Pods)
 */ 
  var tasklist = [
    {
      Profession:"Leadership",
      level: {
        0:["Hire Your First Mercenary"],
        1:["Complete Advanced Training", "Protect Grateful Merchant","Pick Up Package", "Basic Training"],
        2:["Guard Duty"],
        3:["Guard Duty","Hire a Mercenary"],
        4:["Protect Caravan","Guard Duty","Hire a Mercenary"],
        5:["Protect Caravan","Explore Local Area","Guard Duty","Hire a Mercenary"],
        6:["Protect Caravan","Explore Local Area","Guard Duty","Hire a Mercenary"],
        7:["Explore Local Area","Guard Duty","Train a Guard","Hire a Mercenary"],
        8:["Explore Local Area","Guard Duty","Train a Guard","Hire a Mercenary"],
        9:["Chart Region","Explore Local Area","Guard Duty","Train a Guard","Hire a Mercenary"],
        10:["Chart Region","Explore Local Area","Guard Duty","Train a Guard","Hire a Mercenary"],
        11:["Chart Region","Explore Local Area","Guard Duty","Train a Guard","Hire a Mercenary"],
        12:["Chart Region","Explore Local Area","Guard Duty","Train a Guard","Hire a Mercenary"],
        13:["Patrol the Mines","Chart Region","Protect Caravan","Explore Local Area","Train a Guard","Battle Undead","Hire a Mercenary"],
        14:["Patrol the Mines","Chart Region","Protect Caravan","Explore Local Area","Train a Guard","Battle Undead","Hire a Mercenary"],
        15:["Patrol the Mines","Chart Region","Protect Caravan","Explore Local Area","Train a Guard","Battle Undead","Hire a Mercenary"],
        16:["Patrol the Mines","Chart Region","Fight Off Spellplagued","Explore Local Area","Train a Guard","Battle Undead","Hire a Mercenary"],
        17:["Patrol the Mines","Chart Region","Deliver Metals","Fight Off Spellplagued","Explore Local Area","Collect Taxes","Train a Guard","Battle Undead","Hire a Mercenary"],
        18:["Patrol the Mines","Chart Region","Deliver Metals","Fight Off Spellplagued","Explore Local Area","Collect Taxes","Train a Guard","Battle Undead","Hire a Mercenary"],
        19:["Patrol the Mines","Chart Region","Deliver Metals","Fight Off Spellplagued","Explore Local Area","Collect Taxes","Train a Guard","Battle Undead","Hire a Mercenary"],
        20:["Assault Enemy Stronghold","Follow Map to an Unknown Location","Recover Large Mineral Claim","Destroy Enemy Camp","Deliver Metals","Protect Diamond Shipment","Collect Taxes","Fight Off Spellplagued","Patrol the Mines","Chart Region","Explore Local Area"],   
      },
    },
    {
      Profession:"Armorsmithing_Med", // Mailsmithing
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
      Profession:"Armorsmithing_Heavy", // Platesmithing
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
      Profession:"Leatherworking",
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
      Profession:"Tailoring",
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
      Profession:"Artificing",
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
      Profession:"Weaponsmithing",
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
      Profession:"Alchemy",
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
      Profession:"WinterEvent",
      level: {
        0:["Hire a Master of Lights"],
        1:["Glowing Fishing Pole","1:Entertain Master of Lights (Rank Up)","Refine Light Pods","1:Fish for Light Pods"],
        2:["Bright Angler's Fishing Pole","2:Entertain Master of Lights (Rank Up)","Refine Light Pods","2:Fish for Light Pods","2:Large Batch of Shiny Lures","1:Fish for Light Pods"],
        3:["Brilliant Angler's Fishing Pole","Lightwine","Refine Light Pods","3:Fish for Light Pods","2:Large Batch of Shiny Lures","1:Fish for Light Pods"],
      },
    },
    {
      Profession:"MidSummerEvent", // expand this when it comes around
      level: {
        0:["Hire a Sunite Acolyte"],
      },
    },
 ];
/* ------------------------------------------------------------------------------------------------------------------ */ 
  var image_pause = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAY" +
      "AAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2" +
      "ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG" +
      "8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNR" +
      "NYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMBy" +
      "H/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAI" +
      "Cd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOE" +
      "AuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dX" +
      "Lh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJ" +
      "iYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PE" +
      "WhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJh" +
      "GLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+" +
      "AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlT" +
      "Ksz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKm" +
      "Av1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIB" +
      "BKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3" +
      "GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7E" +
      "irAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJy" +
      "KTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksq" +
      "Zs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZl" +
      "mDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5" +
      "Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVV" +
      "gqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU" +
      "2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2" +
      "KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVx" +
      "rqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri" +
      "6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxb" +
      "zwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppS" +
      "TbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo" +
      "5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8" +
      "Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLK" +
      "cRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p" +
      "7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc" +
      "+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+H" +
      "p8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw" +
      "34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8Yu" +
      "ZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIh" +
      "OOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hC" +
      "epkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa" +
      "7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZL" +
      "Vy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wt" +
      "VCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZt" +
      "Jm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkV" +
      "PRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvtt" +
      "Xa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fc" +
      "J3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5Sv" +
      "NUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2" +
      "+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3d" +
      "vfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/c" +
      "GhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0Z" +
      "jRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0" +
      "Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgA" +
      "ABdvkl/FRgAAAZ9JREFUeNqU0z+LE2EQBvDfvsuZ3IkoFzSJiuCfeAkWFmJnkz5wjVjlK4i" +
      "tnR9BrP0E4uewE/bQwKko2CjR88+BuSMhycbm3RjjNk41z7szz8w8O5Motzqu4iwW+Ir3+L" +
      "YemKzh07iLGziJPL4HjPAKz3FcRnAJD3AKXzBb+b7ABhr4jscYQhoDzuBhrDQsIU9iNz9j7" +
      "G28wLQg6OMyhrVaLd3Z2dFoNBwdHdna2tJut9XrdZPJJIzH4xHOo4rXAU3cjJXTfr8vyzJZ" +
      "lul2u3q9nizL7O3t2d3dLbr+jFvYDuiggjlMp9Nl3/P53Gw2W+IVfxZFbgecw7SYOc/zZUK" +
      "e5//gNU22QxRu4f9tgSTE5ThRkIQQ/kifJJIk+QuvJKc4DHizOsLm5uYyoVKpqFarS7zipx" +
      "jjXUF5P4o5bDabodVqgcFgIE1TnU4H7O/vOzg4yHEBL/G0IGjgUVzXX1GXMsvjIm3E+B/FI" +
      "o3wEXfi7zkuRFoVLBYKeIJPZcd0EfdwLc5ZaLMR/bd4Fm+l9BoLu44rsd0FDuM5f1gP/D0A" +
      "BNp57TyT3+MAAAAASUVORK5CYII=",
      
      image_play = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYA" +
      "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",
      
      image_prefs = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQC" +
      "AMAAAAoLQ9TAAAAllBMVEUAGQASEhIfHx8fJy8pKSk2NjZBQUFJR0ZQUE9RUVFSUlJNX3No" +
      "aGhsaWdramlycG1meY98fHx+fn5wgpV0iqKKh4R4jaR9jJx8kad9kad/mbONmaWEnrmEnrq" +
      "koZy3t7fIx8bKyMHT0c3S0dDU09DV1NPP1t3W1dXY2Njb2tfe29bf3tzj4uHr6+js6+r39/" +
      "f5+PgAAABrL3yvAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTA" +
      "QCanBgAAAAHdElNRQfWBRoFKh31UQ8DAAAAgUlEQVQY022OxxLCMAwFRSc4BEIPJZQQ08v+" +
      "/8+RsTExDDpIe3ijfSJ/hx9g62Dt4GaAI+8YT0t27+BxxvvE/no5pYT10lGFrE34Ja40W3g" +
      "1oMGmW7YZ6hnCYexKTPVkXivuvWe1Cz1aKqPNI3N0slI2TNYZiARJX30qERc7wBPKC4WRDz" +
      "WdWHfmAAAAAElFTkSuQmCC",
      
      image_close = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQC" +
      "AQAAAC1+jfqAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfW" +
      "BRkTNhxuPxLkAAAAHXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBUaGUgR0lNUO9kJW4AAAE" +
      "KSURBVCjPhdGxSgNBFAXQMzpgYWwsLEQUDBJBQgqFIChZEPR7/DA/QCGQTgQtJE1ENoWohY" +
      "UgbGKQyFjErNv52nObe19wqGWg7z0l5YVgVdOu+wUt507tqIVQ4Zodp861ooELe15M5KFI6" +
      "Zfr9u25MIj6Jl4cmSIPBWrq2o5cufO4aOJDYSozNTa2pK4t03PtwUdMKRRykAmW0dTRcyNX" +
      "pBQpI8GJDTR050zkNzK0bMMZLvUNZ8yCfy6Wvbc1NVyi4dloXjqWvds6uvp41pFmpVOKJWd" +
      "6bgwxkmTMIotWKpwrfBkZl7uMonUHf5wSlV2+fUZrjnXdzrmyy7djD8GWTW9e51z557o1Tz" +
      "85FH/WkOkaHQAAAABJRU5ErkJggg==";
       
    
    /* Login options */
    Option.username    = { type:'glob',data:'string',def:'email@address.com',group:'login',desc:"Account Username" };
    Option.password    = { type:'glob',data:'string',def:'password',group:'login',desc:"Account Password" };
    Option.autoLogin   = { type:'glob',data:'bool',def:'true',group:'login',desc:"Automatically Login to Gateway" };  

    /* General Options */
    Option.debug       = { type:'glob',data:'bool',def:'true',group:'general',desc:"Log debug information to console" };
    
    /* Reload options */
    Option.autoReload    = { type:'glob',data:'bool',def:'false',group:'reload',desc:"Reload Gateway (and Script)" };
    Option.delayReload   = { type:'glob',data:'int',def:'3600',group:'reload',desc:"Seconds before forcing a Gateway reload" };
    Option.delayLoading  = { type:'glob',data:'int',def:'30',group:'reload',desc:"Seconds before Page Loading timeout" };
    Option.delayIdle     = { type:'glob',data:'int',def:'120',group:'reload',desc:"Seconds before Page Idle timeout" };
    
    /* Delay options */
    Option.delayDefault = { type:'glob',data:'int',def:'5',group:'delays',desc:"Seconds standard delay" };
    Option.delayShort   = { type:'glob',data:'int',def:'1',group:'delays',desc:"Seconds short delay" };
    Option.delayDown    = { type:'glob',data:'int',def:'20',group:'delays',desc:"Seconds to wait if Gateway is down" };
    Option.delaySwitch  = { type:'glob',data:'int',def:'20',group:'delays',desc:"Seconds delay before changing characters" };
    
    /* Character specific general options */
    Option.name        = { type:'char',data:'string',def:'<character name>',desc:"Character name" };
    Option.buyDefault  = { type:'char',data:'bool',def:'true',group:'general',desc:"Purchase Missing Ingredients (qty: 20)" };
    Option.buySmart    = { type:'char',data:'bool',def:'true',group:'general',desc:"Smart-Purchase Missing Ingredients (amt. reqd)" };  
    Option.fillAssets  = { type:'char',data:'bool',def:'true',group:'general',desc:"Fill Optional Assets when Selecting Tasks" };
    Option.fillSpeed   = { type:'char',data:'bool',def:'false',group:'general',desc:"Fill Optional Assets with Speed Priority" };
    Option.refine      = { type:'char',data:'bool',def:'false',group:'general',desc:"Refine Rough Astral Diamonds" };
    Option.rolldice    = { type:'char',data:'bool',def:'false',group:'general',desc:"Roll&Collect Adventures Reward" };
  
    /* Character specific task options */
    Option.skipRare    = { type:'char',data:'bool',def:'true',group:'task',desc:"Skip Rare tasks" };
    Option.skipDeep    = { type:'char',data:'bool',def:'true',group:'task',desc:"Skip Deep Gathering tasks" };
    Option.skipIntense = { type:'char',data:'bool',def:'true',group:'task',desc:"Skip Intensive Gathering tasks" };
    Option.skipMass    = { type:'char',data:'bool',def:'true',group:'task',desc:"Skip Mass Production tasks" };
    Option.skipBatch   = { type:'char',data:'bool',def:'true',group:'task',desc:"Skip Batch Production tasks" };
    
    /* Character slot settings */
    Option.leadership     = { type:'char',data:'int',def:'9',group:'task_slots',desc:"Number of slots to use for Leadership" };    
    Option.mailsmithing   = { type:'char',data:'int',def:'0',group:'task_slots',desc:"Number of slots to use for Mailsmithing" };
    Option.platesmithing  = { type:'char',data:'int',def:'0',group:'task_slots',desc:"Number of slots to use for Platesmithing" };
    Option.leatherworking = { type:'char',data:'int',def:'0',group:'task_slots',desc:"Number of slots to use for Leatherworking" };
    Option.tailoring      = { type:'char',data:'int',def:'0',group:'task_slots',desc:"Number of slots to use for Tailoring" };
    Option.artificing     = { type:'char',data:'int',def:'0',group:'task_slots',desc:"Number of slots to use for Artificing" };
    Option.weaponsmithing = { type:'char',data:'int',def:'0',group:'task_slots',desc:"Number of slots to use for Weaponsmithing" };
    Option.alchemy        = { type:'char',data:'int',def:'0',group:'task_slots',desc:"Number of slots to use for Alchemy" };
    Option.winterevent    = { type:'char',data:'int',def:'0',group:'task_slots',desc:"Number of slots to use for Simril Light Crafting" };
    Option.midsummerevent = { type:'char',data:'int',def:'0',group:'task_slots',desc:"Number of slots to use for Midsummer Provisioning" };
    
/* ------------------------------------------------------------------------------------------------------------------ */ 
/*  OLD SETTINGS GENERATION AND HANDLING CODE --  TO BE REPLACED */
    var settingnames = [
    {name: 'nw_username',         title: 'Account Username',                        def: 'email@address.com',     type:'username',      tooltip:'This is the username (email) of your Account'},
    {name: 'nw_password',         title: 'Account Password',                        def: '',    type:'password',  tooltip:''},
    {name: 'autologin',           title: 'Automatically Login to Gateway',           def: false, type:'checkbox',  tooltip:'Automatically attempt to log gateway site'},
    {name: 'break', title:'', def: '', type:'br', tooltip:''},
    {name: 'debug',               title: 'Enable Debug',                             def: false, type:'checkbox',  tooltip:'Enable all debug output to console', onsave: function(newValue, oldValue) {console=newValue?unsafeWindow.console||fouxConsole:fouxConsole;}},
    {name: 'autoreload',          title: 'Periodically Reload Gateway Page' ,        def: false, type:'checkbox',  tooltop:'Enabling this will force a loading of the Gateway Main Page'},
    {name: 'autopurchase',        title: 'Purchase Missing Resources',               def: true,  type:'checkbox',  tooltip:'Automatically purchase required resources from gateway shop (20 at a time)'},
    {name: 'autorefine',          title: 'Refine Rough Astral Diamonds',             def: true,  type:'checkbox',  tooltip:'Automatically refine rough astral diamonds each time loading a character'},
    {name: 'excluderare',         title: 'Exclude Rare Tasks',                       def: true,  type:'checkbox',  tooltip:'Exclude rare tasks to avoid selecting wrong tasks during profession leveling'},
    {name: 'break2', title:'', def: '', type:'br', tooltip:''},
    {name: 'nw_charcount',        title: 'Number of Characters',                    def: '2',   type:'editbox', tooltip:'Number of Characters to Define (page reload required)'},
    {name: 'nw_delay',            title: 'Seconds delay to switch',                 def: '20',  type:'editbox',     tooltip:'How many seconds before changing characters'},
    {name: 'line', title:'', def: '', type:'hr', tooltip:''},
    {name: 'Label',               title: '',                                         def: '',    type:'label',     tooltip:'', repeat:'1'},
  ];
  var setTemp = [];
  for(var i = 0; i < settingnames.length; ++i)
  {
    var t = settingnames[i];
    setTemp.push(t);
    if(t.repeat == 1)
    {
      // settingnames[X]     X = # to nw_charcount (-1)
      for(var j = 1; j <= GM_getValue(settingnames[10].name); ++j)
      {
        setTemp.push({name: 'nw_charname'+j,         title: 'Neverwinter Character '+j,            def: '<insert character name>',      type:'character_name',     tooltip:'Character name'});
        setTemp.push({name: 'Space1'+j, title: '', def: '', type:'br', tooltip:''});
        setTemp.push({name: 'HighToLow'+j,           title: 'Prefer Highest Tier Optional Assets',   def: 'false', type:'checkbox',   tooltip:'Use Highest avaible tier assets when filling Optional assets. Default is Lowest.'});
        setTemp.push({name: 'SkipMass'+j,            title: 'Skip Mass Production Tasks',      def: 'true',  type:'checkbox', tooltip:'Skip Mass Production tasks when searching for tasks'});
        setTemp.push({name: 'SkipDeep'+j,            title: 'Skip Deep Gathering Tasks',       def: 'true',  type:'checkbox', tooltip:'Skip Deep Gathering tasks when searching for tasks'});
        setTemp.push({name: 'SkipIntense'+j,         title: 'Skip Intensive Gathering Tasks',  def: 'true',  type:'checkbox', tooltip:'Skip Intensive Gathering tasks when searching for tasks'});
        setTemp.push({name: 'SkipBatch'+j,           title: 'Skip Batch Gathering Tasks',      def: 'true',  type:'checkbox', tooltip:'Skip Batch Gathering Tasks when searching for tasks'});
        setTemp.push({name: 'Space2'+j, title: '', def: '', type:'br', tooltip:''});
        setTemp.push({name: 'Leadership'+j,          title: 'Leadership',                          def: '9',     type:'editbox',     tooltip:'Number of slots to assign to Leadership'});
        setTemp.push({name: 'Armorsmithing_Med'+j,   title: 'Mailsmithing',                        def: '0',     type:'editbox',     tooltip:'Number of slots to assign to Mailsmithing'});
        setTemp.push({name: 'Armorsmithing_Heavy'+j, title: 'Platesmithing',                       def: '0',     type:'editbox',     tooltip:'Number of slots to assign to Platesmithing'});
        setTemp.push({name: 'Leatherworking'+j,      title: 'Leatherworking',                      def: '0',     type:'editbox',     tooltip:'Number of slots to assign to Leatherworking'});
        setTemp.push({name: 'Tailoring'+j,           title: 'Tailoring',                           def: '0',     type:'editbox',     tooltip:'Number of slots to assign to Tailoring'});
        setTemp.push({name: 'Artificing'+j,          title: 'Artificing',                          def: '0',     type:'editbox',     tooltip:'Number of slots to assign to Artificin'});
        setTemp.push({name: 'Weaponsmithing'+j,      title: 'Weaponsmithing',                      def: '0',     type:'editbox',     tooltip:'Number of slots to assign to Weaponsmithin'});
        setTemp.push({name: 'Alchemy'+j,             title: 'Alchemy',                             def: '0',     type:'editbox',     tooltip:'Number of slots to assign to Alchemy'});
        setTemp.push({name: 'WinterEvent'+j,         title: 'WinterEvent',                         def: '0',     type:'editbox',     tooltip:'Number of slots to assign to Simril Lightcrafting'});
        setTemp.push({name: 'Break'+j, title: '', def: '', type:'hr', tooltip:''});
      }
    }
  }
  settingnames = setTemp;
  var settings = {};
  settings["paused"] = GM_getValue("paused", false);
  settings["ActiveChar"] = GM_getValue("ActiveChar", 0);  
  // Sanity check for variable ActiveChar
  if (isNaN(settings["ActiveChar"])) { settings["ActiveChar"] = "1"; }  
  for (var i = 0; i < settingnames.length; i++) {
    // Ignore label, hr, br        
    var setType = settingnames[i].type;
    if(setType === 'label' || setType === 'br' || setType === 'hr') { continue; }  
    settings[settingnames[i].name] = GM_getValue(settingnames[i].name, settingnames[i].def);
    // Call the :onsave for the setting if it exists
    if(typeof(settingnames[i].onsave) === "function") {
      debug(":onsave Saving Settings");
      settingnames[i].onsave(settings[settingnames[i].name], settings[settingnames[i].name]);
    }
  }
/* ---------------------------------------------- SETTINGS -------------------------------------------------------------------- */   
  
  /* wipeGMValues() -- Delete all cache stored values */
  function wipeGMValues() { var keys = GM_listValues(); for (var i=0, key=null; key=keys[i]; i++) { GM_deleteValue(key); } }
  
  /* optSetValue()  --   If the value of the Option changed, change the value
                         of a setting (variable) and store it via GM_setValue
   after testing sanity against defined value type to prevent taint. (no letters in Bool types!)   */ 
  
  function optSetValue(type, name, value) {
 
    //  Don't change the value if it hasn't changed! (Chrome/TM issue)
    //
    //       if(settings[name] !== value) { settings[name] = value; } // Save to local cache
    //       if(GM_getValue(name) !== value) { GM_setValue(name, value); } // Save to GM cache
  
  }
  
  /* optGetValue()  -- Return the local stored value (variable) if present,
                       or attempt to return cache stored value (GM_GetValue).
   If neither are available then return the Default defined value.                  */
  
  function optGetValue(type, name) {
 
  }
/* ---------------------------------------------- SETTINGS PANEL  -------------------------------------------------------------------- */ 
/* TO BE REPLACED */
  
 
  function AddCss(cssString) {
    var head = document.getElementsByTagName('head')[0];
    if(!head) { return; }
    var newCss = document.createElement('style');
    newCss.type = "text/css";
    newCss.innerHTML = cssString;
    head.appendChild(newCss);
  }
  
  
  function addGlobOptions() {
    for (var i in Option) {
      if (Option[i].type == "glob") {
        var def = Option[i].def, desc = Option[i].desc, group = Option[i].group;
        var value = def; // TODO: lookup the stored value
          switch(Option[i].data) {
          case "bool":
            genCheckbox("glob",i,value,desc,group);
            break;
          case "int":
            genSpinner("glob",i,value,desc,group);
            break;
          case "string":
            genEditbox("glob",i,value,desc,group);
            break;
          default:
            // Undefined data type.. probably a typo..
            break;
        }
      }
    }
  }
  
  function genGroup(type,group) {
    var name = "#nga-" + type + "-group-" + group;
    if ( $( name ).length <= 0) {
      var target = "#nga-" + type + "-options";
      $( target ).append('<hr><div id="' + name.substring(1) + '"></div>');
    }
    return name;
  }
  
  function genCheckbox(type, name, value, desc, group) {
    var target = "#nga-" + type + "-options", checked = value=="true"?"checked":" ";   
    if (group.length) { var target = genGroup(type,group); } 
    $(target).append('<li><input type="checkbox"  id="nga-checkbox-' + name + '" name="nga-checkbox" value="' + value + '" '+ checked +'><label style="margin-top: 2em;" for="nga-checkbox-' + name + '">' + desc + '</label></li>');
  }

  function genEditbox(type, name, value, desc, group) {
    var target = "#nga-" + type + "-options", itype = name=="password"?"password":"text";
    if (group.length) { var target = genGroup(type,group); }
    $(target).append('<li><input type="' + itype + '" id="nga-checkbox-' + name + '" name="nga-checkbox"  class="ui-widget ui-widget-content ui-widget-corner"><label style="margin-left: 2em; margin-top: 1em;" for="nga-checkbox-' + name + '">' + desc + '</label></li>');
  }
    
  function genSpinner(type, name, value, desc, group) {
    var target = "#nga-" + type + "-options"; 
    if (group.length) { var target = genGroup(type,group); }
    $(target).append('<li style="margin-left: .5em; margin-top: .5em;"><input id="nga-spinner-' + name + '" name="nga-spinner" style="width: 2.5em;" min="0" value="' + value + '"><label style="margin-left: 2em;" for="nga-spinner-' + name + '">' + desc + '</label></li>');
  }
  
  function genCharButton(name) {
    $("#nga-charlist").append('<li><button id="nga-char_' + name + '" name="nga-editcharbtn">'+ name  +'</button></li>');
  }

  
  function addOptionsDialog() {
    if($("#nga-optionsButton").length) { return; }
    /* ----------------------------------------------------------------------------------------------- */
    AddCss("\
     #nga-pauseButton{border-bottom: 1px solid rgb(102, 102, 102); border-right: 1px solid rgb(102, 102, 102); background: none repeat scroll 0% 0% rgb(238, 238, 238); display: block; position: fixed; overflow: auto; right: 23px; top: 0px; padding: 3px; z-index: 1000;}\
     #nga-optionsButton{border-bottom: 1px solid rgb(102, 102, 102); border-right: 1px solid rgb(102, 102, 102); background: none repeat scroll 0% 0% rgb(238, 238, 238); display: block; position: fixed; overflow: auto; right: 46px; top: 0px; padding: 3px; z-index: 1000;}\
     #nga-optionsDialog{overflow: auto; font: 10px Verdana;}\
    ");
    /* ----------------------------------------------------------------------------------------------- */
    
    // Add dialog container
    $("body").append('<div id="nga-optionsDialog" title="Options"></div>');
    // Add the Buttons
    $("body").append('<div id="nga-optionsButton"><img src="'+image_prefs+'" title="Edit Options" style="cursor: pointer; display: block;"></div>');
    $("body").append('<div id="nga-pauseButton"><img src="'+(settings["paused"]?image_play:image_pause)+'" title="Click to '+(settings["paused"]?"resume":"pause")+' script" style="cursor: pointer; display: block;"></div>');    

    // Add the Tabs
    $("#nga-optionsDialog").append('\
    <div id="nga-tabs">\
    <ul><li>\
    <a href="#nga-tab-glob">Global</a></li><li>\
    <a href="#nga-tab-char">Characters</a></li><li>\
    <a href="#nga-tab-misc">Misc</a></li></ul>\
    <div id="nga-tab-glob"></div>\
    <div id="nga-tab-char"></div>\
    <div id="nga-tab-misc"></div>\
    </div>'
    );
    
    // Add global options container 
    $("#nga-tab-glob").append('<ul><div id="nga-glob-options"><p><h2><b>Note: Options take effect immediately!</b></h2></p><br></div></ul>');
    
    // Add "Add Character" button 
    $("#nga-tab-char").append('<h2>Click <i>Character</i> to <b>[Edit|Delete]</b></h2><br><div id="nga-addchar"><button id="nga-addcharbtn">Add Character</button></div><hr>');
    
    // Add Character list container
    $("#nga-tab-char").append('<ul><div id="nga-charlist"></div></ul>');

    // Options Button 
    $("#nga-optionsButton").click(function() {
       // Hide buttons
       $("#nga-optionsButton").hide();
       $("#pauseButton").hide();
       $("#settingsButton").hide();
       $("#nga-optionsDialog").dialog("open");
    });
    
    // Pause Button
    $("#nga-pauseButton").click(function() {
      settings["paused"] = !settings["paused"];
      GM_setValue("paused", settings["paused"]);
      $("#nga-pauseButton img").attr("src",(settings["paused"]?image_play:image_pause));
      $("#nga-pauseButton img").attr("title","Click to "+(settings["paused"]?"resume":"pause")+" script");
      var state = settings["paused"]?"Paused":"Resumed";
      debug("Processing has been " + state);
    });
             
    // Hide the dialog, add the global options
     $("#nga-optionsDialog").hide();
    addGlobOptions();
    
    // Register jQuery-UI elements (requires a short delay) 
    setTimeout(function() { hookjqUI(); }, 1000);
/* ----------------------------------------------------------------------------------------------- */
    for (var i=0;i<30;i++) { // for testing purposes...
      var rname = rand(10);
      genCharButton(rname);
    }    
/* ----------------------------------------------------------------------------------------------- */
  }
  
  function hookjqUI() {    
    $("#nga-optionsDialog").dialog({    
      dialogClass: "nga-optionsDialog",      
      //modal: true,
      width: 450,
      closeOnEscape: true,
      autoOpen: false,
        buttons: {     
          Ok: function() {        
            $( this ).dialog( "close" );          
              $("#settingsButton").show();
              $("#nga-optionsButton").show();
              $("#nga-pauseButton").show();
          },
        },
        close: function() {
          $("#settingsButton").show();
          $("#nga-optionsButton").show();
          $("#nga-pauseButton").show();
      }});    
    
       $("#nga-tabs").tabs();
      
       $("button[name=nga-editcharbtn]").button().click(function( event ) {
         event.preventDefault();
         var bname = $( this ).attr("name");
         var bid = $( this ).attr("id");
         debug("name: " + bname + " id:" + bid);
      });
       
       $("#nga-addcharbtn").button().click(function( event ) {
         event.preventDefault();
      });
      
      // Hook Global elements we're replacing (others directly call CSS classes)
      $("input[name=nga-checkbox]").button();
      $("input[name=nga-spinner]").spinner();
    
  }
  
  /* addSettings()  - Adds the Settings Panel & Buttons to the page  */
  function addSettings() {
    // Check to see if the Css already exists
    if($("#settingsButton").length) { return; }
    
    AddCss("\
     #settingsButton{border-bottom: 1px solid rgb(102, 102, 102); border-right: 1px solid rgb(102, 102, 102); background: none repeat scroll 0% 0% rgb(238, 238, 238); display: block; position: fixed; overflow: auto; right: 0px; top: 0px; padding: 3px; z-index: 1000;}\
     #settingsPanel{border-bottom: 1px solid rgb(102, 102, 102); border-right: 1px solid rgb(102, 102, 102); background: none repeat scroll 0% 0% rgb(238, 238, 238); color: rgb(0, 0, 0); position: fixed; overflow: auto; right: 0px; top: 0px; width: 350px; font: 12px sans-serif; text-align: left; display: block; z-index: 1000;}\
     #settingsPanelButtonContainer {background: none repeat scroll 0% 0% rgb(204, 204, 204); border-top: 1px solid rgb(102, 102, 102);padding: 3px;text-align:center} \
     #settings_title{font-weight: bolder; background: none repeat scroll 0% 0% rgb(204, 204, 204); border-bottom: 1px solid rgb(102, 102, 102); padding: 3px;}\
     ");
    
    // Add settings panel to page body
    $("body").append('\
     <div id="settingsPanel"><div id="settings_title"><img src='+image_prefs+' style="float: left; vertical-align: text-bottom;">\
     <img id="settings_close" src='+image_close+' title="Click to hide preferences" style="float: right; vertical-align: text-bottom; cursor: pointer; display: block;"\>\<span style="margin:3px">Settings</span>\
     </div><form style="margin: 0px; padding: 0px"><ul style="list-style: none outside none; max-height: 400px; overflow: auto; margin: 3px; padding: 0px;"></ul></form></div>'
    );
 
    var settingsList = $("#settingsPanel form ul");
    for (var i=0;i<settingnames.length;i++) {
      var id = 'settings_' + settingnames[i].name;
      switch(settingnames[i].type) {  
        case "character_name":
          settingsList.append('<li style="margin-left:4px"><label class="'+settingnames[i].class+'">Character Name</label></li><li style="margin-left:6px"><input title="'+settingnames[i].tooltip+'" style="margin:4px; width:120px" name="'+id+'" id="'+id+'" type="text" /></li>');
          $('#'+id).val(settings[settingnames[i].name]);
          break;
        case "checkbox":
          settingsList.append('<li style="margin-left:4px"><input style="margin:4px" name="'+id+'" id="'+id+'" type="checkbox" /><label class="'+settingnames[i].class+'" for="'+id+'">'+settingnames[i].title+'</label></li>')
          $('#'+id).prop('checked', settings[settingnames[i].name]);
          break;
        case "editbox":
          settingsList.append('<li style="margin-left:4px"><input title="'+settingnames[i].tooltip+'" style="margin:4px; width:20px" name="'+id+'" id="'+id+'" type="text" /><label title="'+settingnames[i].tooltip+'" class="'+settingnames[i].class+'" for="'+id+'">'+settingnames[i].title+'</label></li>');
          $('#'+id).val(settings[settingnames[i].name]);
          break;
        case "username":
          settingsList.append('<li style="margin-left:4px"><label title="'+settingnames[i].tooltip+'" class="'+settingnames[i].class+'" for="'+id+'">'+settingnames[i].title+'</label></li><li style="margin-left:6px"><input title="'+settingnames[i].tooltip+'" style="margin:4px" name="'+id+'" id="'+id+'" type="text" /></li>');
          $('#'+id).val(settings[settingnames[i].name]);
          break;
        case "password":
          settingsList.append('<li style="margin-left:4px"><label title="'+settingnames[i].tooltip+'" class="'+settingnames[i].class+'" for="'+id+'">'+settingnames[i].title+'</label></li><li style="margin-left:6px"><input title="'+settingnames[i].tooltip+'" style="margin:4px" name="'+id+'" id="'+id+'" type="password" /></li>');
          $('#'+id).val(settings[settingnames[i].name]);
          break;
        case "select":
          settingsList.append('<li title="'+settingnames[i].tooltip+'" style="margin-left:4px"><label class="'+settingnames[i].class+'" style="padding-left:4px" for="'+id+'">'+settingnames[i].title+'</label><select style="margin:4px" name="'+id+'" id="'+id+'" /></li>');
          var options = settingnames[i].opts;
          var select = $('#'+id);
          for(var j=0;j<options.length;j++) {
             if(settings[settingnames[i].name] == options[j].path) {
               select.append('<option value="'+options[j].path+'" selected="selected">'+options[j].name+'</option>');
             }
             else {
               select.append('<option value="'+options[j].path+'">'+options[j].name+'</option>');
             }
          }
          break;
        case "label":
          settingsList.append('<li title="'+settingnames[i].tooltip+'" style="margin-left:4px"><label class="'+settingnames[i].class+'">'+settingnames[i].title+'</label></li>');
          break;
        case "br":
          settingsList.append('<br>');
          break;
        case "hr":
          settingsList.append('<hr>');
          break;
      }
    }
    // Add save/cancel buttons to panel, Add Settings, Add Pause Button
    $("#settingsPanel form").append('<div id="settingsPanelButtonContainer"><input id="settings_save" type="button" value="Save and Apply"><input id="settings_close" type="button" value="Close"></div>');
    $("body").append('<div id="settingsButton"><img src="'+image_prefs+'" title="Click to show preferences" style="cursor: pointer; display: block;"></div>');
    
    
    // Add the javascript for the panel and buttons
    $("#settingsPanel").hide();
    $("#settingsButton").click(function() {
      $("#settingsButton").hide();
      $("#nga-pauseButton").hide();
      $("#settingsPanel").show();
    });
    $("#settings_close,settings_cancel").click(function() {
      $("#settingsButton").show();
      $("#nga-pauseButton").show();
      $("#settingsPanel").hide();
    });
    
    // Use setTimeout to workaround permission issues when calling GM functions from main window
    $("#settings_save").click(function() { setTimeout(function() { SaveSettings();}, 0)});
  }
    
/* SaveSettings()   - Save the settings from the UI to the browser cache  */
  function SaveSettings() {
    for (var i=0;i<settingnames.length;i++) {
      var name = settingnames[i].name;
      var el = $('#settings_' + name);
      var value = false;
      switch(settingnames[i].type) {
        case "checkbox":
          value = el.prop("checked");
          break;
        case "editbox":
          value = el.val();
          break;
        case "username":
          value = el.val();
          break;
        case "character_name":
          value = el.val();
          break;
        case "password":
          value = el.val();
          break;
        case "select":
          value = el.val();
          break;
        default:
          continue;
      }
      if(typeof(settingnames[i].onsave) === "function") {
        debug("Saving Settings");
        settingnames[i].onsave(value, settings[name]);
      }
      if(settings[name] !== value) { settings[name] = value; } // Save to local cache
      if(GM_getValue(name) !== value) { GM_setValue(name, value); } // Save to GM cache
    }
    GM_setValue("paused", settings["paused"]);
    GM_setValue("ActiveChar", settings["ActiveChar"]);
    // Close the panel
    $("#settingsButton").show();
    $("#pauseButton img").attr("src",(settings["paused"]?image_play:image_pause));
    $("#pauseButton img").attr("title","Click to "+(settings["paused"]?"resume":"pause")+" task script");
    $("#pauseButton").show();
    $("#settingsPanel").hide(); 
  }
/* ---------------------------------------------- UTILITY -------------------------------------------------------------------- */ 
  
  function isNum(n) { return (Object.prototype.toString.call(n) === '[object Number]' || Object.prototype.toString.call(n) === '[object String]') &&!isNaN(parseFloat(n)) && isFinite(n.toString().replace(/^-/, '')); }

  function timeStamp() {
    var now = new Date();
    var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];
    var suffix = ( time[0] < 12 ) ? "AM" : "PM";
    time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;
    time[0] = time[0] || 12;
    for ( var i = 1; i < 3; i++ ) {
      if ( time[i] < 10 ) {
        time[i] = "0" + time[i];
      }
    }
    return time.join(":") + suffix;
  }
  
  // timestamp
  // startms = ( new Date() ).getTime() ;
  //  ( new Date() ).getTime() - startms ) * 1000
  
  function rand(length,current){
    current = current ? current : '';
    return length ? rand( --length , "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".charAt( Math.floor( Math.random() * 60 ) ) + current ) : current;
}
  
  function debug(str) {
    var caller = arguments.callee.caller.name, stamp = timeStamp();
    if (!(caller.length)) { caller = "GLOBAL"; }
    console.log(stamp,"Function: " + caller,"->",str);
  }
  
/* WaitForLoad() - Waits for the loading symbol to be hidden */
  function WaitForLoad() { return WaitForState(""); }
  
/* WaitForState() - Creates a deferred object that will be resolved when the state is reached */
  function WaitForState(query) {
    var dfd = $.Deferred();
    window.setTimeout(function() {AttemptResolve(query, dfd);}, delay.Short); // Doesn't work without a short delay
    return dfd;
  }
    
/* AttemptResolve() - Will continually test for the given query state and resolve the given deferred 
                      object when the state is reached and the loading symbol is not visible  */ 
  function AttemptResolve(query, dfd) {
    if((query === "" || $(query).length) && $("div.loading-image:visible").length == 0) {
      dfd.resolve();
    }
    else {
         window.setTimeout(function() {AttemptResolve(query, dfd);}, delay.Short); // Try again in a little bit
    }
  }
  
/* ---------------------------------------------- PAGES -------------------------------------------------------------------- */
  var PAGES = Object.freeze({
    LOGIN       : { name: "LOGIN",         path: "div#login"},
    GUARD       : { name: "GUARD",         path: "div#page-accountguard"},
    CHARSELECT  : { name: "CHARSELECT",    path: "div.page-characterselect"},
    FRONTPAGE   : { name: "FRONTPAGE",     path: "div.page-front"},
    PROFESSIONS : { name: "PROFESSIONS",   path: "div.page-professions"},
    INVENTORY   : { name: "INVENTORY",     path: "div.page-inventory"},
    SCA         : { name: "SCA",           path: "div.page-dungeons"},
 });

  function GetCurrentPage() { for each(var page in PAGES) { if($(page["path"]).filter(":visible").length) { return page.name; } } }
  
  function page_DEFAULT(def) { def.resolve(); }

  function page_LOGIN(def) {
    if(settings["autologin"]) {
      debug("Logging in");
      $("input#user").val(settings["nw_username"]);
      $("input#pass").val(settings["nw_password"]);
      $("div#login > input").click();
     }
    def.resolve();
  }
 
  function page_GUARD(def) { def.resolve(); }
  
  function page_SCA(def) {
    if (!needTo.Roll) {
      $("a.professions").click();
      WaitForState("div.page-professions").done(function() {
        def.resolve();
      });
    }
  }
  
  function page_INVENTORY(def) {  
    if (!needTo.Refine) {
      $("a.professions").click();
      WaitForState("div.page-professions").done(function() {
        def.resolve();
      });
    }
  }
     
  function page_CHARSELECT(def) {
    var actualchar = settings["ActiveChar"];
    ++actualchar;
    if(actualchar > settings["nw_charcount"]){
      actualchar = 1;
    }
    var charname = settings["nw_charname" + actualchar];
    debug("Selecting Character: #" + actualchar + " name: " + charname);
    if(charname.length) {
      $(".char-list-name:contains('"+charname+"')").click()
    }
    else {
      debug("Empty character name!");
    } 
    settings["ActiveChar"] = actualchar; // Save to local cache
    GM_setValue("ActiveChar", actualchar); // Save to GM cache
    def.resolve();
  }
  
/* Frontpage -  Go to Professions tab */  
  function page_FRONTPAGE(def) {
    $("a.professions").click(); 
      WaitForState("div.page-professions").done(function() {
        def.resolve();
     });
  }
  
/* Professions Tab -  Collect Results and Start Tasks */
  function page_PROFESSIONS(def) {
    // Switch to overview
    $("a.professions-overview").click();
    WaitForState("div.page-professions").done(function() {
      // List the buttons on the overview
      var completedSlotButtons = $("div.panel-content button").filter(":contains('Collect Result')").filter(":visible");
      var openSlotButtons = $("div.panel-content button").filter(":contains('Choose Task')").filter(":visible");
      var actualchar = settings["ActiveChar"];
      // See if there are any completed tasks on the overview and Collect Results
      if(completedSlotButtons.length) {
        completedSlotButtons[0].click();
        WaitForState("div.professions-rewards-modal button:contains('Collect Result')").done(function() {
          $("div.professions-rewards-modal button:contains('Collect Result')").click();
          WaitForState("").done(function() {
            def.resolve(true);
          });
        });
      }
      // See if there are any open tasks on the overview
      else if(openSlotButtons.length) {
        var foundTask = false;
        // Go through the professions to assign tasks until defined # slots filled
        for (var i = 0; i < tasklist.length; i++) {
          var currentTasks = $("div.professions-slot-icon." + tasklist[i].Profession);
          if(currentTasks.length < settings[tasklist[i].Profession+actualchar]) {
            foundTask = true;
            openSlotButtons[0].click();
            WaitForState("div#content_professions:visible").done(function() {
              // Switch to correct type
              $("a.professions-" + tasklist[i].Profession).click();
              WaitForState("").done(function() {
                createNextTask(tasklist[i], 0, def);
              });
            });
            break;
          }
        }
        if(!foundTask) {
          debug("All Tasks Assigned");
          def.resolve(true);
        }
      }
        // No tasks to process
        else {
          // Start character switch
          if(!timer.Switch) {
           pTimer(null,"switch");
           def.resolve(true);
          }
           else {
            // Waiting to switch characters..
            def.resolve(true);
           }
       }
    });
  }
/* ---------------------------------------------- NON-PROFESSION TASKS -------------------------------------------------------------------- */ 
  function RefineAD(def) {
      $("a.inventory").click();
      WaitForState("div.inventory-container").done(function() {      
        var refineButton = $("span.bag-currency-button button");
        if(refineButton.length) {
          if(refineButton[0].disabled == false){
            debug("Clicking Refine Button");
            wait(delay.Short).then(function () {
              refineButton[0].click();
              def.resolve();
            });
          }
          else { 
            debug("Refine Button disabled"); 
            def.resolve();
          }
        }     
      });
      return def.promise();
  }
  
  function RollDice(def) {
      $("a.dungeons").click();
      WaitForState("div.page-dungeons").done(function() {
        if ( $("div.daily-dice-intro").length ) {
          debug("Reward available");
          var diceButton = $("div.daily-dice-intro button");
          var diceDef = $.Deferred();
          window.setTimeout(function() {             
            diceButton[0].click(); 
            diceDef.resolve(); 
          },delay.Short);
          // wait for dice click
          diceDef.done(function() {
            var collectButton = $("div.daily-awards-button button");
            debug("Collecting reward");            
            window.setTimeout(function () {      
              collectButton[0].click();              
              window.setTimeout(function () {   
                def.resolve();
              },delay.Short);
            },delay.Short);          
          });        
        }
        else {
          debug("Reward not available");
          def.resolve();
        }
      });
    return def.promise();
  }
  
  function initChange() {
     if(settings["autorefine"]) { needTo.Refine = true; }
     needTo.Roll = true;
     needTo.Switch = true;
  }  
    
  function ChangeCharacter(def) {
    $("a.professions").click();
    WaitForState("div.page-professions:visible").done(function() {
         debug("Clicking Change Character");
         $('a[data-url-silent$="characterselect/modal"]').click();
         WaitForState("div.page-characterselect:visible").done(function() {
            page_CHARSELECT(def);
         });
    });
    return def.promise();
  }
   
/* ---------------------------------------------- PROCESS -------------------------------------------------------------------- */
  function pTimer(ms, name) {
    var ms = isNum(ms)===true?ms:delay.Default
    switch(name) {
      case "reload":
        if (!timer.Reload) {
          timer.Reload = window.setTimeout(function() {
            timer.Reload = false;
            pReload();
          },delay.Reload);
        }
        break;
        
      case "switch":
        if (!timer.Switch) {
          debug("Starting Switch Timer: " + delay.Switch);
          timer.Switch = window.setTimeout(function() { initChange(); },delay.Switch);       
        }
        break;

      default:
      window.clearTimeout(timer.Main); // We only need one..
      timer.Main = window.setTimeout(function() {process();}, ms );
        
    }
    // Make sure the timers are running
    if (!timer.Main)   { pTimer(); }
    if (!timer.Reload) { pTimer(null,"reload"); }
  }
  
  function wait(ms) { 
    var wait = $.Deferred(); 
    window.setTimeout(wait.resolve(), ms); 
    return wait.promise(); 
  }
  
  function pReload() {
   if(settings["paused"]) { 
     debug("Gateway Reload Needed - But script is paused");
     return;
   }
   else if (settings["autologin"] && settings["autoreload"]) {
    debug("Reloading Gateway");
    unsafeWindow.location.href = "http://gateway.playneverwinter.com";
   }
   else { debug("Gateway Reload Needed - But options prevent it"); } 
  }
  
  function process() {
    // Make sure the settings panel & settings exist
    addSettings();
    addOptionsDialog();
    
    // Check if processing is paused
    if(settings["paused"]) { pTimer(delay.Default); return; }
    
    // Check for gateway errors
    if($("title").text() == "Error" && settings["autologin"]) {
      debug("Error detected on Gateway");
      pReload();
      return;
    }
  
    // Check for Gateway down
    if(window.location.href.indexOf("gatewaysitedown") > -1) {
      debug("Detected Gateway down - waiting");
      wait(delay.Down).then(function() { pReload(); });
      return;
    }
    
    // Check if switching characters
    if(needTo.Switch) {
      var sdef = $.Deferred();
      if(needTo.Refine) {
        RefineAD(sdef).then(function () {
          needTo.Refine = false;
          sdef.resolve();
        });
      }
      else if(!needTo.Refine && needTo.Roll) {
        RollDice(sdef).then(function () {
          needTo.Roll = false;
          sdef.resolve();
        });
      }
      else {
        ChangeCharacter(sdef).then(function () {
          needTo.Switch = false;
          timer.Switch = false;
          sdef.resolve();
        });
      }
      
      sdef.done(function() { 
       pTimer(delay.Short); 
      });
    }
    
    else {
      var page = GetCurrentPage(), def = $.Deferred();
      switch(page) {      
        case "LOGIN":              
          page_LOGIN(def);    
          break;         
        case "GUARD":              
          page_GUARD(def);                
          break;              
        case "CHARSELECT":              
          page_CHARSELECT(def);                      
          break;              
        case "FRONTPAGE":              
          page_FRONTPAGE(def);           
          break;          
        case "PROFESSIONS":      
          page_PROFESSIONS(def);               
          break;  
        case "INVENTORY":
          page_INVENTORY(def);
          break;
        case "SCA":
          page_SCA(def);
          break;
        default:              
          page_DEFAULT(def);            
          break;
      }
      
      def.done(function(useShortDelay) {
        pTimer( useShortDelay===true?delay.Short:delay.Default );
      });
    }
  }
  
  
/* ---------------------------------------------- TASKS -------------------------------------------------------------------- */  
 
  function createNextTask(prof, i, def) {          
    var level = parseInt($("a.professions-"+prof.Profession).closest("span").prevAll("div:first").find("span").text()), list = prof.level[level];   
    if (list.length <= i) {   
     debug("End of TaskList");     
     def.resolve();
     return;     
    }
    var taskName = list[i];      
    debug("Searching for: " + taskName);   
    var task = SearchForTaskByName(taskName, prof.Profession, level);   
    if (task == "buy") {
     debug("Skipping task selection to purchase resources");
     def.resolve();
     return;    
   }


    if ( jQuery.type(task) == "object" ) {    
      task.click();

      WaitForState("div.page-professions-taskdetails").done(function() {               
        // Populate all Optional Assets                   
        var assetDef = $.Deferred();                       
        var assetList = $("h3:contains('Optional Assets:')").closest("div").find("button");                       
        if(assetList.length) { SelectAssets(assetList, 0, assetDef, prof); }       
        else { assetDef.resolve(); }   
       
       
        assetDef.done(function() {                 
        
          debug("Populate Assets Complete");                   
          var startButton = $("div.input-field button").filter(":contains('Start Task')");                        

          if (!startButton.disabled) {
            debug("Clicking Start: " + taskName);
            startButton.click();
            WaitForState("").done(function() { // Button Clicked, continue processing            
              wait(delay.Default).then(function() { def.resolve(true); });
            });   
          }
              
          else if (startButton.disabled) { // Button not enabled, something required was probably missing                        
            $("div.footer-body > div.input-field.button > button:contains('Back')").click();                            
            WaitForState("").done(function() {
              debug('Missing Requirements -- Finding next task');                  
              wait(delay.Short).then(function() { createNextTask(prof, i+1, def); });
            });          
          }
        }); //assetDef                
      });
    }
    
    else if ( jQuery.type(task) == "boolean" ) { // Task isn't possible, continue to next in list  
      debug("Task not valid: " + taskName);     
      wait(delay.Short).then(function() { createNextTask(prof, i+1, def); });        
   }
}


function SelectAssets(assets, i, def, prof) {
    assets[i].click();
    WaitForState("").done(function() {
      var specialItems = $("div.modal-item-list a.Special");
      var goldItems    = $("div.modal-item-list a.Gold");
      var silverItems  = $("div.modal-item-list a.Silver");
      var bronzeItems  = $("div.modal-item-list a.Bronze");
      var char = settings["ActiveChar"], h2l = settings["HighToLow" + char];
        
      // Try to use lowest rank bronze unit that is available to prevent needlessly using higher units up
      // r1 = rank 1, r2 = rank 2, r3 = rank 3 
      switch(prof.Profession) {
       case "Leadership":
          var r1 = $("div.modal-item-list a.Bronze:contains('Mercenary')");
          var r2 = $("div.modal-item-list a.Bronze:contains('Guard')");
          var r3 = $("div.modal-item-list a.Bronze:contains('Footman')");
          break;
       case "Tailoring":
        var r1 = $("div.modal-item-list a.Bronze:contains('Weaver')");
        var r2 = $("div.modal-item-list a.Bronze:contains('Outfitter')");
        var r3 = $("div.modal-item-list a.Bronze:contains('Assistant Tailor')");
          break;
       case "Weaponsmithing":
          var r1 = $("div.modal-item-list a.Bronze:contains('Smelter')");
          var r2 = $("div.modal-item-list a.Bronze:contains('Grinder')");
          var r3 = $("div.modal-item-list a.Bronze:contains('Assistant Weaponsmith')");
          break;
       case "Platesmithing": 
          var r1 = $("div.modal-item-list a.Bronze:contains('Miner')");
          var r2 = $("div.modal-item-list a.Bronze:contains('Armorer')");
          var r3 = $("div.modal-item-list a.Bronze:contains('Assistant Platesmith')");
          break;
       case "Mailsmithing":
          var r1 = $("div.modal-item-list a.Bronze:contains('Prospector')");
          var r2 = $("div.modal-item-list a.Bronze:contains('Blacksmith')");
          var r3 = $("div.modal-item-list a.Bronze:contains('Assistant Mailsmith')");
          break;
       case "Leatherworking":            
          var r1 = $("div.modal-item-list a.Bronze:contains('Skinner')");          
          var r2 = $("div.modal-item-list a.Bronze:contains('Tanner')");          
          var r3 = $("div.modal-item-list a.Bronze:contains('Assistant Leatherworker')");         
          break;
       case "Artificing":      
          var r1 = $("div.modal-item-list a.Bronze:contains('Carver')");          
          var r2 = $("div.modal-item-list a.Bronze:contains('Engraver')");          
          var r3 = $("div.modal-item-list a.Bronze:contains('Assistant Artificer')");          
          break;
       case "Alchemy": 
          var r1 = $("div.modal-item-list a.Bronze:contains('Apothecary')");            
          var r2 = $("div.modal-item-list a.Bronze:contains('Mixologist')");          
          var r3 = $("div.modal-item-list a.Bronze:contains('Assistant Alchemist')");
          break;
       default:
          var r1 = 0, r2 = 0, r3 = 0;
          break;
     }
      // Default behavior: 
      // Select lowest tier available to optimally have the speed bonus on all tasks
      if(!(h2l)) {
       if(bronzeItems.length) { 
        if(r1.length)       { r1[0].click(); }
        else if(r2.length)  { r2[0].click(); }
        else if(r3.length)  { r3[0].click(); }
        else { bronzeItems[0].click();  }
       }
       else if(specialItems.length) { specialItems[0].click(); }
       else if(goldItems.length)    { goldItems[0].click();  }
       else if(silverItems.length)  { silverItems[0].click(); }
       else { $("button.close-button").click(); }
      }
      // Speed behavior:
      // Select highest tier available (Option)
      else if(h2l) {
        if(specialItems.length)     { specialItems[0].click(); }
        else if(goldItems.length)   { goldItems[0].click(); }
        else if(silverItems.length) { silverItems[0].click(); }
        else if(bronzeItems.length) { 
        if(r1.length)       { r1[0].click(); }
        else if(r2.length)  { r2[0].click(); }
        else if(r3.length)  { r3[0].click(); }
        else { bronzeItems[0].click();  }
       }
        else { $("button.close-button").click(); }
      }
      WaitForState("").done(function() {
        // Continue populating assets if more available
        var newAssets = $("h3:contains('Optional Assets:')").closest("div").find("button");
        if(i < newAssets.length - 1) {
          SelectAssets(newAssets, i+1, def, prof);
        }
        else { def.resolve(); }
      });
    });
  }
    
  function SearchForTaskByName(taskname, profName, profLevel) {    
    var tasklevel = 0;
    var char = settings["ActiveChar"];
    var skipMass = settings["SkipMass" + char];
    var skipDeep = settings["SkipDeep" + char];
    var skipIntense = settings["SkipIntense" + char];
    var skipBatch = settings["SkipBatch" + char];
    
        if (taskname.indexOf(":") > -1) {
            // split task with level requirement
            tasklevel=taskname.split(":",2)[0];
            taskname=taskname.split(":",2)[1];
        }
        // Filter the results
        var filterDiv = $("div#tasklist_filter input");
        filterDiv.val(taskname);
        filterDiv.keyup();
        
        // Find the result
        var taskTitle = $("table#tasklist tr h4 span").filter(function() {
            return $(this).text() === taskname;
        });
        if (taskTitle.length) {
            for (var i = 0; i < taskTitle.length; i++) {
                if(($(taskTitle[i]).closest("div.task-list-entry").find("div.task-rewards div.Gold").length || $(taskTitle[i]).closest("div.task-list-entry").find("div.task-rewards div.Special").length)
                   && profName != "Leadership" && profName != "Alchemy" && settings["excluderare"]) {
                    // Avoid rare tasks unless profession is Leadership
                    debug("Avoiding rare craft: " + taskname);
                }
                else if($(taskTitle[i]).closest("div.higherlevel").length) {
                    // Too high level
                    debug("Task level too high: " + taskname);
                }
                else if(tasklevel > 0 && $(taskTitle[i]).closest("div").find("span.level-pip").text() != tasklevel) {
                    // Task level doesn't match
                  debug("Task level does not match requirement: " + tasklevel + ":" + taskname);
                }
                else if($(taskTitle[i]).closest("div.unmet").length) {
                    // Check for required ingredients
                  debug("Checking for craftable ingredients for: " + taskname);
                    var requires = $(taskTitle[i]).closest("div.unmet").find("div.task-requirements div.icon-slot.red").filter("[data-tt-item]");
                    for (var j = 0; j < requires.length; j++) {
                        var ingName = $(requires[j]).attr("data-tt-item");
                        debug("Found: " + ingName);
                        var searchStr = ingName;
        
                             // Purchasable Ingredients
                             if(ingName.indexOf("Resource_Charcoal")             > -1
                             || ingName.indexOf("Resource_Rocksalt")             > -1
                             || ingName.indexOf("Resource_Spool_Thread")         > -1
                             || ingName.indexOf("Resource_Porridge")             > -1
                             || ingName.indexOf("Resource_Solvent")              > -1
                             || ingName.indexOf("Resource_Brimstone")            > -1
                             || ingName.indexOf("Resource_Coal")                 > -1
                             || ingName.indexOf("Resource_Moonseasalt")          > -1
                             || ingName.indexOf("Resource_Quicksilver")          > -1
                             || ingName.indexOf("Resource_Spool_Threadsilk")     > -1

                             // Purchasable Assets
                             || ingName.indexOf("Tool_Crucible_Common")          > -1
                             || ingName.indexOf("Tool_Hammer_Common")            > -1
                             || ingName.indexOf("Tool_Shears_Common")            > -1
                             || ingName.indexOf("Tool_Anvil_Common")             > -1
                             || ingName.indexOf("Tool_Awl_Common")               > -1
                             || ingName.indexOf("Tool_Mortor_Common")            > -1
                             || ingName.indexOf("Tool_Mallet_Common")            > -1
                             || ingName.indexOf("Tool_Chisel_Common")            > -1
                             || ingName.indexOf("Tool_Bellows_Common")           > -1
                             || ingName.indexOf("Tool_File_Common")              > -1
                             || ingName.indexOf("Tool_Grindstone_Common")        > -1
                             || ingName.indexOf("Tool_Needle_Common")            > -1
                             || ingName.indexOf("Tool_Philosopherstone_Common")  > -1
                             || ingName.indexOf("Tool_Leatherworking_T1_Common") > -1
                             || ingName.indexOf("Tool_Tongs_Common")             > -1
                             || ingName.indexOf("Tool_Leadership_T3_Common")     > -1
                             || ingName.indexOf("Tool_Leadership_T2_Common")     > -1 
                             ){
                            if (settings["autopurchase"]) {
                                BuyResource(ingName);
                                return "buy";
                            }
                            else {
                                debug("Auto purchase disabled -- Resource not purchased");
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
                          debug("Found unhandled ingredient: " + ingName);
                            continue;
                        }
        
                        debug("Searching for tasks with: " + searchStr);
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
                                
                              debug("Found ingredient task: " + ingTitle);
                              
                              // Skip batch potion, mass production, deep gathering, and intensive gathering tasks by default
                              if(ingTitle.indexOf("Batch ") == 0 && (skipBatch)) { continue; }
                              if(ingTitle.indexOf("Mass ") == 0 && (skipMass)) { continue; }
                              if(ingTitle.indexOf("Deep ") == 0 && (skipDeep)) { continue; }
                              if(ingTitle.indexOf("Intensive ") == 0 && (skipIntense)) { continue; }
                              // Skip Empowered gathering tasks if Profession is below level 8                  
                              if(ingTitle.indexOf("Empowered ") == 0) { 
                                if(profLevel<8) { continue; }
                              }
                                
                                // Search for correct level task for same named Artificing gather tasks
                                if(ingTitle.indexOf("Gather Ore and Wood") > -1 || ingTitle.indexOf("Craft Ornamental metal and Carved Wood") > -1) {
                                    if     (ingName.indexOf("_T1") > -1) { ingTitle = "1:" + ingTitle }
                                    else if(ingName.indexOf("_T2") > -1) { ingTitle = "7:" + ingTitle }
                                    else if(ingName.indexOf("_T3") > -1) { ingTitle = "14:" + ingTitle }
                                }
                                
                               var ingTask = SearchForTaskByName(ingTitle, profName, profLevel);
                              debug("Requesting required ingredient task: " + ingTitle);
                                if (ingTask) { return ingTask; }
                            }
                            debug("Couldn't start any incredient tasks for: " + taskname);
                            return false;
                        }
                        else { debug("No ingredient tasks available: " + taskname); }
                    }
                    
                    // Not enough resources
                    debug("Not enough resources: " + taskname);
                }
                else { // Task found, return "Continue" button
                    return $(taskTitle[i]).closest("tr").find("button");
                }
            }
            debug("Task not valid: " + taskname);
        }
        return false;
    }
  
  /* BuyResource()  - Use Gateway "Buy Supplies" Page to Purchase Required Ingredients */
  function BuyResource(item) {
    debug("Purchasing resources: " + item);
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
          wait(delay.Short).then(function() {
            $("input[name='inventoryBuyQty']").val(20);            
            $("button:contains('OK')").click();
            // Close the notification that never times out
            WaitForState("button.closeNotification").done(function() {
              debug("Resources purchased"); 
              $("button.closeNotification").click();              
            });            
          });       
        });
      });
    });
  }
  
  
/* ------------------------------------------------------------------------------------------------------------------ */
  // Add jQuery-UI src/css tags 
  $("head").append('<script src="' + jqueryui_src + '"></script>');
  $("head").append('<link rel="stylesheet" href="' + jqueryui_css + '" />');

  // Add options & start timer
  addSettings();
  addOptionsDialog();

  // Start processing timer
  pTimer();

  // Start Page Loading/Idle timeout function
  timer.Loading = window.setInterval(function() {
    if (!timer.Main) {
      debug("Starting handler timer");
      pTimer(delay.Short);
    }
   
    if (!settings["paused"]) {
      if ($("div.loading-image:visible").length) {
        pageCheck.last_href = location.href;
        pageCheck.idlestate = 0;
        if ((pageCheck.load_time * 1000) >= delay.Loading) {
          debug("Loading timeout reached. Reloading page");
          pageCheck.load_time = 0;
          location.reload();
        }  
        else { 
          pageCheck.load_time++;
          if (pageCheck.load_time > 1) { debug("Loading: " + pageCheck.load_time + "s"); }
        }
      }
            
      else if (location.href == pageCheck.last_href) {
        pageCheck.load_time = 0;
        if ((pageCheck.idle_time * 1000) >= delay.Idle) {
          debug("Idle timeout reached. Reloading gateway");          
          pageCheck.idle_time = 0;
          pReload();          
        }
        else {
          pageCheck.idle_time++;
        }      
      }
     
        else {         
          pageCheck.last_href = location.href;          
          pageCheck.load_time = 0; 
          pageCheck.idle_time = 0;          
        }
    }
  },1000);
  
})();