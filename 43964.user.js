// SPNG Raid Manager
// Questions, comments, bug reports or donations to: slyz (yep that last character is a one)
//
// ==UserScript==
// @name          SPNG - hobopolis manager
// @namespace     http://userscripts.org/scripts/source/43964.user.js
// @description   Version 2.1 - Organizes raid logs to a readable format - modified for SPNG by slyz
// @include       *kingdomofloathing.com/topmenu.php*
// @include       *kingdomofloathing.com/main.php*
// @include       *kingdomofloathing.com/clan_raidlogs.php*
// @include       *kingdomofloathing.com/clan_basement.php*
// @include       *kingdomofloathing.com/clan_hobopolis.php*
// @include       *kingdomofloathing.com/choice.php*
// @include       *kingdomofloathing.com/compactmenu.php*
// @include       *127.0.0.1:*/compactmenu.php*
// @include       *127.0.0.1:*/topmenu.php*
// @include       *127.0.0.1:*/main.php*
// @include       *127.0.0.1:*/clan_raidlogs.php*
// @include       *127.0.0.1:*/clan_basement.php*
// @include       *127.0.0.1:*/clan_hobopolis.php*
// @include       *127.0.0.1:*/choice.php*
// @exclude       http://images.kingdomofloathing.com/*
// @exclude       http://forums.kingdomofloathing.com/*
// ==/UserScript==
// --------------------------------------------------------------------------------------
// Modified Dr3v1's Raid Log Manager
// --------------------------------------------------------------------------------------
// 02/03/2010 Version 2.1 - Change value of advs in the Slimetube
// 12/08/2009 Version 2   - Change value of advs spend at Richard's to 1 pt
// 06/19/2009 Version 1.9 - Only players who have cleared the sewers appear in the Points Totals table
// 06/16/2009 Version 1.8 - Slime Tube goodies from DrEv1's latest version
// 06/01/2009 Version 1.7 - Do not parse the Slime Tube logs when parsing the Misc section
// 03/10/2009 Version 1.6 - Corrected the points for ruining the show, you don't get the 10 points from going on stage anymore when you ruin the show more than once
// 03/10/2009 Version 1.5 - Now automatically fetches the latest version
// 02/16/2009 Version 1.4 - The total sewer advs and total sewer points in the sewer table
// 							now show up correctly
// 02/15/2009 Version 1.3 - Corrected the way the adventures spend at Richards are scored
// 02/11/2009 Version 1.2 - 'passed the hat' is now counted correctly if done more than once
// 02/08/2009 Version 1.1 - modified the way points were counted for Ruining the show
// 12/20/2008 Version 1 - modified the script to implement SPNG's point system for loot distribution
// - added SPNG's weight system for combats and non-combats
// - Richard's is always taken into account
// - created a new table that shows total points in each zone for all the players
// In the queue:
// - Show points per advs in each zone and total
// - include some way of changing the weights other than manually editing the script
// --------------------------------------------------------------------------------------
// 06/15/2009 Version 3.54 - Changed percentage numbers on slime tube section to better reflect reality.
// 06/10/2009 Version 3.53 - Topmenu should now display the hobofort or mother slime image for quick refreshing of the raidlog page in both contact mode AND normal. **IMPORTANT** You MUST 
// have this script above Mr. Script in the GM manage scripts page for either of these to work.
// 06/10/2009 Version 3.52 - Fixed the past log issue, again.  Thanks Jick for updating the block box to be more useful!
// 06/10/2009 Version 3.51 - Resolved the bug while looking at past logs that displayed unecessary information
// 06/09/2009 Version 3.5 - Added loot log reading for the slime tube and added associated options
// 06/05/2009 Version 3.4 - Added zone and boss information display for The Slime Tube
// 06/05/2009 Version 3.31 - Fixed a bug that was preventing past logs from being displayed properly.
// 06/04/2009 Version 3.3 - Added table for The Slime Tube Adventures.  Added options to turn on and off showing slime tube and hobopolis data.
// 05/30/2009 Version 3.27 - Fixed a minor bug with hobo parts over 1000.  Thanks sfwarlock
// 02/11/2009 Version 3.26 - Fixed minor pass the hat multiple times bug.  Thanks Slyz
// 10/25/2008 Version 3.25 - Added an option to exclude richard turn cheese.
// 08/22/2008 Version 3.24 - Fix bug for open/closed tent image change.
// 08/22/2008 Version 3.23 - Fixed bug with sewer items table still showing up on choice adventures
// 08/22/2008 Version 3.22 - Fixed bug with clan basement loot logs
// 08/22/2008 Version 3.21 - Broke yodel adventures up into type, added options table for sewer item table loading, added option for loot table
// 08/22/2008 Version 3.20 - Added minor text to say how many scarehobos you can make if you try to make too many, fixed gatorskin umbrella bug.
// 08/22/2008 Version 3.19 - Minor prioritization issue with Richard part loading resolved
// 08/22/2008 Version 3.18 - Added the ability to make scarehobos from the main log manager page
// 08/21/2008 Version 3.17 - Added sewer totals in parenthesis to the total adventure table
// 08/19/2008 Version 3.16 - Fixed a bug with oils of oiliness  
// 08/19/2008 Version 3.15 - Fixed a bug with inventory images turned off and the sewer item table.  
// 08/19/2008 Version 3.1 - Put the load loot logs button on the main log page as well
// 08/19/2008 Version 3.0 - Added sewer item information and test tables to the sewer area and sewer choice results page.
// 08/15/2008 Version 2.95 - Fixed a bug that prevented loot distrobution.  Oops!
// 08/14/2008 Version 2.9 - Made Richard section display work in lower width screens for real this time, added a title to the log
//                          page as a way of selfishly advertising myself, added the hamster to the loot table, moved loot table 
//                          to the more logical place for it to be - on the basement page, changed the toppane image to a better one,
//                          added a link at the top of the logs to go to the clan basement (scrolling was getting annoying)
// 07/29/2008 Version 2.8 - Made Richard section display work in lower width screens, added Misc section to total adventures
//                        - table to count Hodgman turns spent
// 07/27/2008 Version 2.7 - Bugfix for image 125 and current loot
// 07/27/2008 Version 2.6 - Added Richard section to top table to help facilitate scarehobo organization, made all character
//                          names in the loot table lower case to avoid naming issues, added color shading for outfit pieces
// 07/04/2008 Version 2.5 - Ensured current run's loot distribution was included on loot tables.
// 07/02/2008 Version 2.4 - Minor bugfix.  Organized and sorted tables better.  Added links to player names in loot table.
// 06/30/2008 Version 2.3 - Loot table now sorts regardless of letter case.  Fixed a bug where repeat of the header was overwriting a row
// 06/30/2008 Version 2.2 - Minor total bug fix.
// 06/30/2008 Version 2.1 - Fixed clan basement link in top nav to work with Mr. Script. 
//                        - Added current run loot distrobution into loot logs
//                        - Fixed evil loot table screwup bug
// 06/30/2008 Version 2.0 - Redo loot table to use loot images.  Add topmenu link to logs.  Made images of bosses links to their
//                          zones.  Minor bugfixes.  Changed some text to be more accurate.  Added small image to top menu
//                          that links directly to the logs page.  Made loot table collapsible.
// 06/29/2008 Version 1.9 - Added a button to display lifetime loot logs.  This will display a table that shows every player
//                          who has ever gotten loot, and what they received, and how many.  
// 06/27/2008 Version 1.8 - Added progress percentages (based soley off of the section images) under each boss.  If an area is
//                          not accessible, a message is displayed instead
// 06/27/2008 Version 1.7 - Minor bugfixes.
// 06/27/2008 Version 1.6 - Changed colors.  Added totals row to adventure table.  Adventure table now sorted in descending order.
// 06/26/2008 Version 1.5 - Added new table to show all non-swer adventure totals per player.
// 06/26/2008 Version 1.4 - Fixed sewer grate bug.  Changed boss column in tables to defeats.  Fixed total column accuracy.  Added
//                          collapsable tables.
// 06/25/2008 Version 1.3 - Minor bugfixes.
// 06/24/2008 Version 1.2 - Minor bugfixes.
// 06/24/2008 Version 1.1 - Added boss table at the top of the log, because it's awesome.  Thanks Spleenmaster for the idea.
// 06/24/2008 Version 1.0 - Initial version
//---------------------------------------------------------------------------
// slyz's SPNG hack - Dec 18, 2008 

// minimum advs spent in non-sewer areas to be eligible fo rloot
var loot_min_advs = 100 ;

// SLIME TUBE:

var slime_kill = 1 ;
var slime_defeat = -1 ;
var slime_tickled = 1 ;
var slime_squeezed = 1 ;
var slime_Mother = 100 ;

// SEWERS:

var swr_made_it = 0 ;
var swr_Gator = 0 ;
var swr_CHUM = 0 ;
var swr_Goldfish = 0 ;
var swr_Defeats = -2 ;
var swr_explored = 2 ;
var swr_Grate = 4 ;
var swr_Gnawed = -1 ;
var swr_Stared = 0 ;
var swr_Water = 4 ;
var swr_Rescue = 4 ;

// TOWN SQUARE:

var twn_Hobo = 1 ;
var twn_Defeats = -2 ;
var twn_Marketplace = 0 ;
var twn_Stage = 10 ;
var twn_Hat = -5 ;
var twn_Mosh  = 3 ;
// First 1 advs of 'Ruined the show' : 0 pt, then -5
var nb_Ruined = 1 ;
var twn_Ruined = 0 ;
var twn_Ruined_2 = -15 ;
// All advs spend at Richard's are now 1 pt
var nb_Richard = 0 ;
var twn_Richard = 0 ;
var nb_Richard_2 = 0 ;
var twn_Richard_2 = 0 ;
var twn_Richard_3 = 1 ;

// BURNBARREL:

var brn_Hobo = 1 ;
var brn_Scratch = -2 ;
var brn_Defeats = -2 ;
var brn_Fire = 2 ;
var brn_Tirevalance = 1 ;
var brn_Steam = 1  ;
var brn_Opened_Door = -3 ;
var brn_Burned_Door = 0 ;

// EXPOSURE ESPLANADE:

var exp_Hobo = 1 ;
var exp_Frosty = -2 ;
var exp_Defeats = -2 ;
var exp_Freezer = 1 ;
var exp_Fridge = -3 ;
var exp_Broke = 2  ;
var exp_Water_Out = 1 ;
var exp_Water_Burnbarrel = 1 ;
var exp_Yodeled_Little = 1 ;
var exp_Yodeled_Bit = 3 ;
var exp_Yodeled_Crazy = 1 ;

// THE HEAP:

var heap_Hobo = 1 ;
var heap_Oscus = -2 ;
var heap_Defeats = -2 ;
var heap_Trashcano = 3 ;
var heap_Treasure = 0 ;
var heap_compost = 1 ;

// BURIAL GROUNDS:

var burial_Hobo = 1 ;
var burial_Zombo = -2 ;
var burial_Defeats = -2 ;
var burial_Flowers = 1 ;
var burial_Raided = -3 ;
var burial_Dance = 1  ;
var burial_Impress = 0 ;
var burial_Busted = 4 ;

// THE PURPLE LIGHT DISTRICT:

var purple_Hobo = 1 ;
var purple_Chester = -2 ;
var purple_Defeats = -2 ;
var purple_Dumpster = -3 ;
var purple_Trash = 0 ;
var purple_Bamboozeled = 0  ;
var purple_Flimflammed = 2 ;
var purple_Danced = 0 ;
var purple_Barfight = 4 ;


// - END  -
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Picklish's VERSION CHECKER

// - BEGIN MANUAL SECTION -
var currentVersion = "2.1";
var scriptURL = "http://userscripts.org/scripts/source/43964.user.js";
var scriptName = "SPNG - hobopolis manager";

// The version checker will show non-errors if and only if this boolean
// is false and GM_getValue("showOnlyErrors") is false or unset.
var showOnlyErrors = true;

// - END MANUAL SECTION -

// - BEGIN CUT AND PASTE SECTION -
var datePrefix = "CheckTime-";

function MakeBullet(message)
{
    return "<tr><td><font size=-2>&nbsp;&#42;" + message + "</font></td></tr>";
}

// Check for an updated script version and print the result box...
function CheckScriptVersion()
{
    // Preemptively set error, in case request fails...
    GM_setValue("webVersion", "Error")

    GM_xmlhttpRequest({
        method: "GET",
        url: scriptURL,
        headers:
        {
            "User-agent": "Mozilla/4.0 (compatible) Greasemonkey",
            "Accept": "text/html",
        },
        onload: function(responseDetails)
        {
            if (responseDetails.status == "200")
            {
                var m = responseDetails.responseText.match(
                    /description\s*Version (\w+(?:\.\w+)?)/);
                if (m && !isNaN(m[1]))
                {
                    GM_setValue("webVersion", m[1]);
                }
            }

            var message;
            var warningLevel = 0;
            var forceGet = false;

            var webVer = parseFloat(GM_getValue("webVersion"));
            if (GM_getValue("webVersion", "Error") == "Error")
            {
                message = "Failed to check website for updated version of script.";
                warningLevel = 1;
            }
            else if (isNaN(webVer))
            {
                message = "Couldn't find suitable version number.";
                warningLevel = 1;
            }
            else
            {
                if (webVer > parseFloat(currentVersion))
                {
                    message = "Right click <a href='" + scriptURL + "' TARGET='_blank'>here</a> and select 'Install User Script' for Version " + webVer + ".";
                    warningLevel = 2;
                }
                else
                {
                    if (webVer < parseFloat(currentVersion))
                    {
                        message = "Script is newer than web version.";
                        warningLevel = 0;
                        forceGet = true;
                    }
                    else
                    {
                        message = "Script is latest version.";
                        warningLevel = 0;
                    }
                }
            }

            // In either case, check remaining resources...
            PrintCheckVersionBox(warningLevel, MakeBullet(message), forceGet);
        }
    });
}

function PrintCheckVersionBox(resourceWarningLevel, resourceMessage, forceBox)
{
    // set color from warning level
    var color;
    if (resourceWarningLevel > 1)
    {
        color = "red";
    }
    else if (resourceWarningLevel > 0)
    {
        color = "orange";
    }
    else
    {
        color = "blue";

        // if no errors, return...
        if (!forceBox && (showOnlyErrors ||
            GM_getValue("showOnlyErrors", false)))
        {
            return;
        }
    }

    var span = document.createElement("center");
    span.innerHTML = "<table style='border: 1px solid " + color + "; margin-bottom: 4px;' width=95% cellpadding=1 cellspacing=0><tr><td bgcolor=" + color + "><font color=white size=-2><b>" + scriptName + "</b> " + currentVersion + ":</font></td></tr>" + resourceMessage + "</table>";

    document.body.insertBefore(span, document.body.firstChild);
}

if (window.location.pathname == "/main.php")
{
    CheckScriptVersion();
}
// - END CUT AND PASTE SECTION -
// ---------------------------------------------------------------------------
// Function for returning response text to a callback function.
function GM_get(page, callback)
{
    var url = "";
    if (this.document.location.hostname.indexOf("127") >= 0)
        url = 'http://'+ this.document.location.hostname + ":" + this.document.location.port + "/" + page;
    else
        url = 'http://'+ this.document.location.hostname + "/" + page;

    GM_xmlhttpRequest(
    {
      method: 'GET',
      url: url,
      onload:function(details) {
              if( typeof callback=='function' ){
                      callback(details.responseText);
              }
      }
    });
}

function GM_post(page)
{
    var url = "";
    if (this.document.location.hostname.indexOf("127") >= 0)
        url = 'http://'+ this.document.location.hostname + ":" + this.document.location.port + "/" + page;
    else
        url = 'http://'+ this.document.location.hostname + "/" + page;

    GM_xmlhttpRequest(
    {
      method: 'POST',
      url: url
    });
}

    var prefsPrefix = "DrEvi1RM";

    var css = (<r><![CDATA[
        div {
          border: 0px;
          margin: 0px;
        }
        .options_header {
            font-size: 10px;
            font-weight: bold;
            color: white;
            background-color: #17037D;
            text-align: center;
        }
        .inputs {	
            font-family: Arial, Verdana, Helvetica, sans-serif; 
            font-size: 10px; 
            color: #000000; 
            border: 1px solid #17037D; 
            background-color: #FFFFFF; 
            font-weight: normal; 
            padding: 1px; 
            height: auto
        }
        .buttons    
        { 
            font-family: Verdana, Arial, Helvetica, sans-serif; 
            font-size: 10px; 
            font-style: normal; 
            color: black; 
            border: 1px solid #17037D; 
            background-color: #E3E2EA; 
            font-weight: normal; 
            height: 16px}
        .highlighted {
            font-size: 11px;
            border-width: 1px 0px 1px 0px;
            border-spacing: 1px;
            border-style: solid solid solid solid;
            border-color: black black black black;
            border-collapse: separate;
            text-align: center;
            background-color: #E3E2EA;
        }
        .normal_text {
            font-size: 11px;
            font-weight: normal;
            color: white;
            text-align: center;
        }
        .normal_table {
            font-size: 11px;
            border-width: 1px 1px 1px 1px;
            border-spacing: 0px;
            border-style: solid solid solid solid;
            border-color: black black black black;
            border-collapse: separate;
            background-color: #FFFFFF;
        }
        .normal_loot_shaded {
            font-size: 11px;
            border-width: 0px 0px 1px 1px;
            border-spacing: 0px;
            border-style: solid solid solid solid;
            border-color: black black black black;
            background-color: #E3E2EA;
            text-align: center;
        }
        .normal_loot_outfit {
            font-size: 11px;
            border-width: 0px 0px 1px 1px;
            border-spacing: 0px;
            border-style: solid solid solid solid;
            border-color: black black black black;
            background-color: #898A8F;
            text-align: center;
        }
        .normal_loot {
            font-size: 11px;
            border-width: 0px 0px 1px 1px;
            border-spacing: 0px;
            border-style: solid solid solid solid;
            border-color: black black black black;
            background-color: #FFFFFF;
            text-align: center;
        }
        .normal_shaded {
            font-size: 11px;
            background-color: #E3E2EA;
            text-align: center;
        }
        .normal {
            font-size: 11px;
            background-color: #FFFFFF;
            text-align: center;
        }
        .normal_header {
            font-size: 13px;
            font-weight: bold;
            color: white;
            background-color: #17037D;
            text-align: center;
        }
        .normal_total {
            font-size: 11px;
            font-weight: bold;
            color: white;
            background-color: #17037D;
            text-align: center;
        }
        .sewer_table {
            font-size: 11px;
            border-width: 1px 1px 1px 1px;
            border-spacing: 0px;
            border-style: solid solid solid solid;
            border-color: brown brown brown brown;
            border-collapse: separate;
            background-color: #FFFFFF;
        }
        .sewer_shaded {
            font-size: 11px;
            background-color: #DED3AB;
            text-align: center;
        }
        .sewer {
            font-size: 11px;
            background-color: #FFFFFF;
            text-align: center;
        }
        .sewer_header {
            font-size: 13px;
            font-weight: bold;
            color: white;
            background-color: #98790C;
            text-align: center;
        }
        .sewer_total {
            font-size: 11px;
            font-weight: bold;
            color: white;
            background-color: #98790C;
            text-align: center;
        }
        .burn_table {
            font-size: 11px;
            border-width: 1px 1px 1px 1px;
            border-spacing: 0px;
            border-style: solid solid solid solid;
            border-color: red red red red;
            border-collapse: separate;
            background-color: #FFFFFF;
        }
        .burn_loot_shaded {
            font-size: 11px;
            border-width: 0px 0px 1px 1px;
            border-spacing: 0px;
            border-style: solid solid solid solid;
            border-color: red red red red;
            background-color: #FDC5C5;
            text-align: center;
        }
        .burn_loot_outfit {
            font-size: 11px;
            border-width: 0px 0px 1px 1px;
            border-spacing: 0px;
            border-style: solid solid solid solid;
            border-color: red red red red;
            background-color: #F28787;
            text-align: center;
        }
        .burn_loot {
            font-size: 11px;
            border-width: 0px 0px 1px 1px;
            border-spacing: 0px;
            border-style: solid solid solid solid;
            border-color: red red red red;
            background-color: #FFFFFF;
            text-align: center;
        }
        .burn_shaded {
            font-size: 11px;
            background-color: #FDC5C5;
            text-align: center;
        }
        .burn {
            font-size: 11px;
            background-color: #FFFFFF;
            text-align: center;
        }
        .burn_header {
            font-size: 13px;
            font-weight: bold;
            color: white;
            background-color: #D93636;
            text-align: center;
        }
        .burn_total {
            font-size: 11px;
            font-weight: bold;
            color: white;
            background-color: #D93636;
            text-align: center;
        }
        .exp_table {
            font-size: 11px;
            border-width: 1px 1px 1px 1px;
            border-spacing: 0px;
            border-style: solid solid solid solid;
            border-color: blue blue blue blue;
            border-collapse: separate;
            background-color: #FFFFFF;
        }
        .exp_loot_shaded {
            font-size: 11px;
            border-width: 0px 0px 1px 1px;
            border-spacing: 0px;
            border-style: solid solid solid solid;
            border-color: blue blue blue blue;
            background-color: #B8D3FE;
            text-align: center;
        }
        .exp_loot_outfit {
            font-size: 11px;
            border-width: 0px 0px 1px 1px;
            border-spacing: 0px;
            border-style: solid solid solid solid;
            border-color: blue blue blue blue;
            background-color: #78A0E0;
            text-align: center;
        }
        .exp_loot {
            font-size: 11px;
            border-width: 0px 0px 1px 1px;
            border-spacing: 0px;
            border-style: solid solid solid solid;
            border-color: blue blue blue blue;
            background-color: #FFFFFF;
            text-align: center;
        }
        .exp {
            font-size: 11px;
            background-color: #FFFFFF;
            text-align: center;
        }
        .exp_shaded {
            font-size: 11px;
            background-color: #B8D3FE;
            text-align: center;
        }
        .exp_table {
            font-size: 11px;
            background-color: #FFFFFF;
            text-align: center;
        }
        .exp_header {
            font-size: 13px;
            font-weight: bold;
            color: white;
            background-color: #3B7FEF;
            text-align: center;
        }
        .exp_total {
            font-size: 11px;
            font-weight: bold;
            color: white;
            background-color: #3B7FEF;
            text-align: center;
        }
        .heap_table {
            font-size: 11px;
            border-width: 1px 1px 1px 1px;
            border-spacing: 0px;
            border-style: solid solid solid solid;
            border-color: green green green green;
            border-collapse: separate;
            background-color: #FFFFFF;
        }
        .heap_loot_shaded {
            font-size: 11px;
            border-width: 0px 0px 1px 1px;
            border-spacing: 0px;
            border-style: solid solid solid solid;
            border-color: green green green green;
            background-color: #A8D8B8;
            text-align: center;
        }
        .heap_loot_outfit {
            font-size: 11px;
            border-width: 0px 0px 1px 1px;
            border-spacing: 0px;
            border-style: solid solid solid solid;
            border-color: green green green green;
            background-color: #53A56F;
            text-align: center;
        }
        .heap_loot {
            font-size: 11px;
            border-width: 0px 0px 1px 1px;
            border-spacing: 0px;
            border-style: solid solid solid solid;
            border-color: green green green green;
            background-color: #FFFFFF;
            text-align: center;
        }
        .heap_shaded {
            font-size: 11px;
            background-color: #A8D8B8;
            text-align: center;
        }
        .heap {
            font-size: 11px;
            background-color: #FFFFFF;
            text-align: center;
        }
        .heap_header {
            font-size: 13px;
            font-weight: bold;
            color: white;
            background-color: #438C5B;
            text-align: center;
        }
        .heap_total {
            font-size: 11px;
            font-weight: bold;
            color: white;
            background-color: #438C5B;
            text-align: center;
        }
        .purple_table {
            font-size: 11px;
            border-width: 1px 1px 1px 1px;
            border-spacing: 0px;
            border-style: solid solid solid solid;
            border-color: purple purple purple purple;
            border-collapse: separate;
            background-color: #FFFFFF;
        }
        .purple_loot_shaded {
            font-size: 11px;
            border-width: 0px 0px 1px 1px;
            border-spacing: 0px;
            border-style: solid solid solid solid;
            border-color: purple purple purple purple;
            background-color: #FAC1F5;
            text-align: center;
        }
        .purple_loot_outfit {
            font-size: 11px;
            border-width: 0px 0px 1px 1px;
            border-spacing: 0px;
            border-style: solid solid solid solid;
            border-color: purple purple purple purple;
            background-color: #A874A3;
            text-align: center;
        }
        .purple_loot {
            font-size: 11px;
            border-width: 0px 0px 1px 1px;
            border-spacing: 0px;
            border-style: solid solid solid solid;
            border-color: purple purple purple purple;
            background-color: #FFFFFF;
            text-align: center;
        }
        .purple_shaded {
            font-size: 11px;
            background-color: #FAC1F5;
            text-align: center;
        }
        .purple {
            font-size: 11px;
            background-color: #FFFFFF;
            text-align: center;
        }
        .purple_header {
            font-size: 13px;
            font-weight: bold;
            color: white;
            background-color: #B12DA6;
            text-align: center;
        }
        .purple_total {
            font-size: 11px;
            font-weight: bold;
            color: white;
            background-color: #B12DA6;
            text-align: center;
        }
        .burial_table {
            font-size: 11px;
            border-width: 1px 1px 1px 1px;
            border-spacing: 0px;
            border-style: solid solid solid solid;
            border-color: gray gray gray gray;
            border-collapse: separate;
            background-color: #FFFFFF;
        }
        .burial_loot_shaded {
            font-size: 11px;
            border-width: 0px 0px 1px 1px;
            border-spacing: 0px;
            border-style: solid solid solid solid;
            border-color: gray gray gray gray;
            background-color: #DEDBDB;
            text-align: center;
        }
        .burial_loot_outfit {
            font-size: 11px;
            border-width: 0px 0px 1px 1px;
            border-spacing: 0px;
            border-style: solid solid solid solid;
            border-color: gray gray gray gray;
            background-color: #A7A7A7;
            text-align: center;
        }
        .burial_loot {
            font-size: 11px;
            border-width: 0px 0px 1px 1px;
            border-spacing: 0px;
            border-style: solid solid solid solid;
            border-color: gray gray gray gray;
            background-color: #FFFFFF;
            text-align: center;
        }
        .burial_shaded {
            font-size: 11px;
            background-color: #DEDBDB;
            text-align: center;
        }
        .burial {
            font-size: 11px;
            background-color: #FFFFFF;
            text-align: center;
        }
        .burial_header {
            font-size: 13px;
            font-weight: bold;
            color: white;
            background-color: #919191;
            text-align: center;
        }
        .burial_total {
            font-size: 11px;
            font-weight: bold;
            color: white;
            background-color: #919191;
            text-align: center;
        }
        .slime_table {
            font-size: 11px;
            border-width: 1px 1px 1px 1px;
            border-spacing: 0px;
            border-style: solid solid solid solid;
            border-color: green green green green;
            border-collapse: separate;
            background-color: #FFFFFF;
        }
        .slime_shaded {
            font-size: 11px;
            background-color: #c0d4bf;
            text-align: center;
        }
        .slime_loot_shaded {
            font-size: 11px;
            border-width: 0px 0px 1px 1px;
            border-spacing: 0px;
            border-style: solid solid solid solid;
            border-color: green green green green;
            background-color: #c0d4bf;
            text-align: center;
        }
        .slime_loot {
            font-size: 11px;
            border-width: 0px 0px 1px 1px;
            border-spacing: 0px;
            border-style: solid solid solid solid;
            border-color: green green green green;
            background-color: #FFFFFF;
            text-align: center;
        }
        .slime {
            font-size: 11px;
            background-color: #FFFFFF;
            text-align: center;
        }
        .slime_header {
            font-size: 13px;
            font-weight: bold;
            color: white;
            background-color: #146803;
            text-align: center;
        }
        .slime_total {
            font-size: 11px;
            font-weight: bold;
            color: white;
            background-color: #146803;
            text-align: center;
        }
        .button_normal    { font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; color: black; border: 1px solid #17037D; background-color: #E3E2EA; font-weight: bold; height: 25px}
        .button_small    { font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 10px; font-style: normal; color: black; border: 1px solid #17037D; background-color: #E3E2EA; font-weight: bold; height: 14px}
        ]]></r>).toString();

// Array of boss drop loot, put into sections then alphabetized
var lootSourceArray;
var lootOnlySourceArray;

var lootHobopolisSourceArray = new Array(
    "Ol' Scratch's ash can|878278248|http://images.kingdomofloathing.com/itemimages/handcan.gif",
    "Ol' Scratch's ol' britches|175959334|http://images.kingdomofloathing.com/itemimages/ninjapants.gif",
    "Ol' Scratch's stovepipe hat|288475507|http://images.kingdomofloathing.com/itemimages/stovehat.gif",
    "Ol' Scratch's infernal pitchfork|576715255|http://images.kingdomofloathing.com/itemimages/pitchfork2.gif",
    "Ol' Scratch's manacles|877578886|http://images.kingdomofloathing.com/itemimages/cuffs.gif",
    "Ol' Scratch's stove door|355068482|http://images.kingdomofloathing.com/itemimages/stovedoor.gif",
    "Frosty's carrot|418045597|http://images.kingdomofloathing.com/itemimages/frostycarrot.gif",
    "Frosty's nailbat|208890943|http://images.kingdomofloathing.com/itemimages/frostynailbat.gif",
    "Frosty's old silk hat|535393288|http://images.kingdomofloathing.com/itemimages/frostyhat.gif",
    "Frosty's arm|968257348|http://images.kingdomofloathing.com/itemimages/frostyarm.gif",
    "Frosty's iceball|380631575|http://images.kingdomofloathing.com/itemimages/styore.gif",
    "Frosty's snowball sack|858648754|http://images.kingdomofloathing.com/itemimages/knobsack.gif",
    "Oscus's dumpster waders|878350523|http://images.kingdomofloathing.com/itemimages/yakpants.gif",
    "Oscus's pelt|586085772|http://images.kingdomofloathing.com/itemimages/ratskin.gif",
    "Oscus's Wand|872696571|http://images.kingdomofloathing.com/itemimages/oscuswand.gif",
    "Oscus's flypaper pants|138953077|http://images.kingdomofloathing.com/itemimages/flypants.gif",
    "Oscus's garbage can lid|203629025|http://images.kingdomofloathing.com/itemimages/trashield.gif",
    "Oscus's neverending soda|445347637|http://images.kingdomofloathing.com/itemimages/soda.gif",
    "Zombo's grievous greaves|587267531|http://images.kingdomofloathing.com/itemimages/bonepants.gif",
    "Zombo's shield|935290105|http://images.kingdomofloathing.com/itemimages/zomboshield.gif",
    "Zombo's skullcap|970898531|http://images.kingdomofloathing.com/itemimages/skullcap.gif",
    "Zombo's empty eye|166850527|http://images.kingdomofloathing.com/itemimages/zomboeye.gif",
    "Zombo's shoulder blade|909940484|http://images.kingdomofloathing.com/itemimages/skullsword.gif",
    "Zombo's skull ring|202391134|http://images.kingdomofloathing.com/itemimages/skullring.gif",
    "Chester's bag of candy|628538543|http://images.kingdomofloathing.com/itemimages/candybag.gif",
    "Chester's cutoffs|505652258|http://images.kingdomofloathing.com/itemimages/cutoffs.gif",
    "Chester's moustache|519707440|http://images.kingdomofloathing.com/itemimages/chestache.gif",
    "Chester's Aquarius medallion|795271370|http://images.kingdomofloathing.com/itemimages/aquamedal.gif",
    "Chester's muscle shirt|803397279|http://images.kingdomofloathing.com/itemimages/wifebeater.gif",
    "Chester's sunglasses|898058153|http://images.kingdomofloathing.com/itemimages/chestershades.gif",
    "Hodgman's bow tie|377044137|http://images.kingdomofloathing.com/itemimages/hobowtie.gif",
    "Hodgman's porkpie hat|667103288|http://images.kingdomofloathing.com/itemimages/porkpiehat.gif",
    "Hodgman's lobsterskin pants|159000068|http://images.kingdomofloathing.com/itemimages/bpcords.gif",
    "Hodgman's almanac|326308790|http://images.kingdomofloathing.com/itemimages/book3.gif",
    "Hodgman's cane|753829066|http://images.kingdomofloathing.com/itemimages/cane.gif",
    "Hodgman's disgusting technicolor overcoat|727586163|http://images.kingdomofloathing.com/itemimages/hobovercoat.gif",
    "Hodgman's garbage sticker|874739671|http://images.kingdomofloathing.com/itemimages/picker.gif",
    "Hodgman's harmonica|607932819|http://images.kingdomofloathing.com/itemimages/harmonica.gif",
    "Hodgman's lucky sock|494251681|http://images.kingdomofloathing.com/itemimages/tubesock.gif",
    "Hodgman's metal detector|986607676|http://images.kingdomofloathing.com/itemimages/mdetector.gif",
    "Hodgman's varcolac paw|307397478|http://images.kingdomofloathing.com/itemimages/varcolacpaw.gif",
    "Hodgman's whackin' stick|118492859|http://images.kingdomofloathing.com/itemimages/whackstick.gif",
    "Hodgman's imaginary hamster|648809275|http://images.kingdomofloathing.com/itemimages/blank.gif");
var lootHobopolisOnlySourceArray = new Array(lootHobopolisSourceArray.length);

var lootSlimeTubeSourceArray = new Array(
    "hardened slime belt|663508936|http://images.kingdomofloathing.com/itemimages/hardslimebelt.gif",
    "hardened slime hat|721459450|http://images.kingdomofloathing.com/itemimages/hardslimehat.gif",
    "hardened slime pants|255854067|http://images.kingdomofloathing.com/itemimages/hardslimepants.gif",
    "slime-soaked brain|523709792|http://images.kingdomofloathing.com/itemimages/slimebrain.gif",
    "slime-soaked hypophysis|515479025|http://images.kingdomofloathing.com/itemimages/slimehypo.gif",
    "slime-soaked sweat gland|337083735|http://images.kingdomofloathing.com/itemimages/slimesweat.gif",
    "caustic slime nodule|416994074|http://images.kingdomofloathing.com/itemimages/causticnodule.gif",
    "squirming Slime larva|326825207|http://images.kingdomofloathing.com/itemimages/slimelarva.gif");
var lootSlimeTubeOnlySourceArray = new Array(lootSlimeTubeSourceArray.length);

var globalCount = {dungeon:0};

if ((window.location.pathname == "/topmenu.php") || (window.location.pathname == "/compactmenu.php"))
{
    var tdOffset = 1;
    var imgWidth = 50;
    var imgHeight = 50;
    
    if (window.location.pathname == "/compactmenu.php")
    {
        tdOffset = 3;
        imgWidth = 30;
        imgHeight = 30;
    }

    var tableAnchor = document.getElementsByTagName("table")[0];
    var tdTags = tableAnchor.getElementsByTagName("td");
    
    //Loop to last <td>, then insert new <td> tag with clan basement link
    var anchor = tdTags[tdTags.length-tdOffset];

    var clanTd = document.createElement('td');
    var clanLink = document.createElement('a');
    var clanImage = document.createElement('img');
    var randomnumber = Math.floor(Math.random()*2);
    if (randomnumber == 1)
      clanImage.setAttribute("src","http://images.kingdomofloathing.com/adventureimages/hobofort.gif");
    else
      clanImage.setAttribute("src","http://images.kingdomofloathing.com/adventureimages/motherslime.gif");
    clanImage.setAttribute("width",imgWidth);
    clanImage.setAttribute("height",imgHeight);
    clanImage.setAttribute("align","right");
    clanImage.setAttribute("border","0");
    clanLink.setAttribute("href","clan_raidlogs.php");
    clanLink.setAttribute('target','mainpane');
  
    clanLink.appendChild(clanImage);
    clanTd.appendChild(clanLink);
    
    anchor.parentNode.insertBefore(clanTd, anchor.nextSibling);

}

if ((window.location.pathname == "/clan_basement.php"))
{
    GM_addStyle(css);

    var swr_chars = new Array();
    var slime_chars = new Array();
    

    // Loot table div
    var lootTable = document.createElement("div");
    with(lootTable)
    {
          id = "lootTable";
          align = "center";
    }

    // Loot log button
    var lootButton = document.createElement("input");
    with(lootButton)
    {
          type = "button";
          value = "Hobopolis Loot Logs";
          style.cursor = "pointer";
          className = "button_normal";
          lootButton.addEventListener('click',function(evt) 
          {
              disabled = true;
              value = "Loading...";
              getCurrentCharsLootTable("Hobopolis");
          },false);
    }
    lootTable.appendChild(lootButton);
    document.body.appendChild(lootTable);

    // Loot table div
    var lootSlimeTable = document.createElement("div");
    with(lootSlimeTable)
    {
          id = "lootSlimeTable";
          align = "center";
    }

    // Loot log button
    var lootSlimeButton = document.createElement("input");
    with(lootSlimeButton)
    {
          type = "button";
          value = "Slime Tube Loot Logs";
          style.cursor = "pointer";
          className = "button_normal";
          lootSlimeButton.addEventListener('click',function(evt) 
          {
              disabled = true;
              value = "Loading...";
              getCurrentCharsLootTable("The Slime Tube");
          },false);
    }
    lootSlimeTable.appendChild(lootSlimeButton);
    document.body.appendChild(lootSlimeTable);
}    

function getCurrentCharsLootTable(dungeon)
{
    GM_get("clan_raidlogs.php",
        function findScarehobos(response) 
        {
            var charArray = new Array();
            var pageData = response;
            var startIndex = pageData.indexOf(dungeon);
            if (dungeon == "Hobopolis")
               startIndex = pageData.indexOf("<b>Sewers:</b>", startIndex);
            else
               startIndex = pageData.indexOf("<b>Miscellaneous</b>", startIndex);
            startIndex = pageData.indexOf("<blockquote>",startIndex);
            
            if (startIndex >=0 )
            {
                var endIndex = pageData.indexOf("</blockquote>",startIndex);
                var sectionData = pageData.substring(startIndex+12,endIndex);
                var dataArray = sectionData.split("<br>");
            
                for (var j=0; j < dataArray.length; j++ )  // Cycle through each line entry
                {
                  var character = getPlayer(dataArray[j]);
            
                  if (character != "" && charArray.indexOf(character) < 0) 
                    charArray[charArray.length] = character;
                }
            }
            swr_chars = slime_chars = charArray;
            globalCount.dungeon = 0;
            getLogIDs(dungeon);
        }
    );
}


if ((window.location.pathname == "/choice.php"))
{
    if (document.body.innerHTML.indexOf("sewertunnel.gif") >= 0 )
    {
        GM_addStyle(css);
        var sewerTable = "";
        if (GM_getValue("option_sewer","ON") == "ON")
            sewerTable = getSewerTableDef();
            
        document.body.innerHTML = sewerTable + getSewerTests() + document.body.innerHTML;
        if (GM_getValue("option_sewer","ON") == "ON")
            getSewerItems();
    }

}    

if ((window.location.pathname == "/clan_hobopolis.php"))
{
    if (document.body.innerHTML.indexOf("The Old Sewers") >= 0)
    {
        if (GM_getValue("option_sewer","ON") == "ON")
        {
            GM_addStyle(css);
            var sewerTable = getSewerTableDef();
          
            getSewerItems();
            document.body.innerHTML = sewerTable + document.body.innerHTML;
        }
    }

}    


if ((window.location.pathname == "/clan_raidlogs.php"))
{
    var loc = window.location + "";
    var dungeon_type = "";
    var dungeon_header = "";
    var log_id = loc.match(/viewlog=(\w+(?:\.\w+)?)/);  // I really wish I understood how the hell this works
    if (log_id != null)
        log_id = log_id[1];  // Now contains the log ID number.  
    else
        log_id = 0;
       
    // Find what type of previous run we are in     
    if (log_id > 0)
    {
        var dungeonIndex = document.body.innerHTML.indexOf("<b>Slime Tube run,");
        if (dungeonIndex < 0 )
          dungeonIndex = document.body.innerHTML.indexOf("<b>Hobopolis run,");
        dungeon_header = document.body.innerHTML.substring(dungeonIndex+3,document.body.innerHTML.indexOf("</b>",dungeonIndex));
        if (dungeon_header.indexOf("Hobopolis") >= 0)
          dungeon_type = "Hobopolis";
        else if (dungeon_header.indexOf("Slime Tube") >= 0)
          dungeon_type = "The Slime Tube";
    
    }
        
        

        addScript('function toggleRow(theElement) { \n'+
        '    var div = document.getElementById(theElement);\n'+
        '    if (div.style.display=="none")\n'+
        '        div.style.display = "block";\n'+
        '    else\n'+
        '        div.style.display = "none";\n'+
        '}');
	
	GM_addStyle(css);

    var option_hobo = "ON";
    if (GM_getValue("option_hobo","ON") == "OFF")
      option_hobo = "OFF";

    var option_slime = "ON";
    if (GM_getValue("option_slime","ON") == "OFF")
      option_slime = "OFF";

    var option_sewer = "ON";
    if (GM_getValue("option_sewer","ON") == "OFF")
      option_sewer = "OFF";

    var option_loot = "ON";
    if (GM_getValue("option_loot","ON") == "OFF")
      option_loot = "OFF";

    var option_slimeloot = "ON";
    if (GM_getValue("option_slimeloot","ON") == "OFF")
      option_slimeloot = "OFF";

    var page = "";
    var bosses = new Array("","","","","","","");
    var boss_table = "";
    var slime_boss_table = "";
    var slimeTable = "";
    var totalAdventureTable = "";
    
    if ((GM_getValue("option_slime","ON") == "ON") && (dungeon_type != "Hobopolis"))
    {
        
        // SLIME data and initialization
        var slime = new Array("defeated a","was defeated by","tickled","squeezed","defeated  Mother Slime","");
        var slime_clan = new Array(slime_kill,slime_defeat,slime_tickled,slime_squeezed,slime_Mother,"");
        var slime_chars = setupCharacters("Miscellaneous", "The Slime Tube");
        var slime_data = new Array();
        var slime_total = zeroArray(slime.length+1);
        if (parseSection("Miscellaneous", slime, slime_clan, slime_data, slime_chars, "The Slime Tube"))
          slimeTable = getSlime();

        slime_boss_table = '<table class="normal">'+
                             '<tr align="center">' +
                                 '<td width="80" class="slime_total">Mother Slime</td>' +
                             '</tr>' +
                             '<tr align="center">' +
                                 '<td class="slime_shaded" onmouseover="style.cursor=\'pointer\';" onclick=window.location=\'clan_slimetube.php\'><img width="80" height="80" src="http://images.kingdomofloathing.com/adventureimages/motherslime.gif"></td>' +
                             '</tr>' +
                             '<tr align="center">';
             if (bosses[6] != "")
                 slime_boss_table += '<td width="80" class="slime_table">Killed by:<br>' + playerLink(bosses[6]) + '</td>';
             else
             {
                 getSlimeStatus();
                 slime_boss_table += '<td width="80" class="slime_total"><div id="slimeZone">Loading status...</div></td>';
             }
            slime_boss_table += "</tr></table>";
            slimeTable = "<table width='100%' cellpadding='0' cellspacing='0'><tr><td valign='top' width='80'>" + slime_boss_table + "</td><td>" + slimeTable + "</td></tr></table>";
    }

    if ((GM_getValue("option_hobo","ON") == "ON") && (dungeon_type != "The Slime Tube"))
    {

        // Sewer data and initialization
		var swr = new Array("made it through the sewer","defeated a sewer gator","defeated a C. H. U. M.","defeated a giant zombie goldfish","was defeated by","explored","sewer grate","gnawed through","empty cage","lowered the water level","rescued","");
		var swr_clan = new Array(swr_made_it,swr_Gator,swr_CHUM,swr_Goldfish,swr_Defeats,swr_explored,swr_Grate,swr_Gnawed,swr_Stared,swr_Water,swr_Rescue,"");
		var swr_chars = setupCharacters("Sewers:", "Hobopolis");
		var swr_data = new Array();
		var swr_total = zeroArray(swr.length+2);
		var swr_char_total_name = new Array();  // What a freaking hack
		var swr_char_total_num = new Array();
		var swr_char_total_pts = new Array();
		if (parseSection("Sewers:", swr, swr_clan, swr_data, swr_chars, "Hobopolis"))
		  page += getSewer(); 
		
		// Points totals per player.  Sewer points not included.
		var ptsArray = new Array();
		for (var r=0; r < swr_chars.length; r++ )
		{
		  ptsArray[r] = new Array(swr_chars[r],0,0,0,0,0,0,0,0,0);
		}
		
        // Adventure totals per player.  Sewer adventures not included.
        var advArray = new Array();
        for (var r=0; r < swr_chars.length; r++ )
        {
          advArray[r] = new Array(swr_chars[r],0,0,0,0,0,0,0,0);
        }
        
        // Town Square data and initialization
		var twn_headers = new Array("Normal<br>Hobos","Defeats","Marketplace","Made<br>Bandages","Made<br>Grenades","Made<br>Shakes","Took the<br>Stage","Passed the<br>Hat","Mosh Pits","Ruined<br>Show","Total Advs","Total Points");
		var twn_points = new Array("("+twn_Hobo+" pt)","("+twn_Defeats+" pt)","("+twn_Marketplace+" pt)","","","","("+twn_Stage+" pt)","("+twn_Hat+" pt)","("+twn_Mosh+" pt)","","","");
		var twn = new Array("defeated  Normal hobo","was defeated by  Normal","went shopping in the Marketplace","bandage","grenade","protein shake","took the stage","passed","mosh","ruined","");
		var twn_clan = new Array(twn_Hobo,twn_Defeats,twn_Marketplace,twn_Richard,twn_Richard,twn_Richard,twn_Stage,twn_Hat,twn_Mosh,twn_Ruined,0);
		var twn_chars = setupCharacters("Town Square:", "Hobopolis");
		var twn_data = new Array();
		var twn_total = zeroArray(twn.length+2);
		if (parseSection("Town Square:", twn, twn_clan, twn_data, twn_chars, "Hobopolis"))
		{ // correction if the numbers of advs at Richard's is > nb_richard
		  for (var h=0; h < twn_chars.length; h++ )
		  { 
			var total_Richard = twn_data[h][4] + twn_data[h][5] + twn_data[h][6] ;
			if (total_Richard >= nb_Richard)
			{
			  twn_data[h][twn.length+1] += (total_Richard - nb_Richard)*(twn_Richard_2 - twn_Richard) ;
			}
			if (total_Richard >= nb_Richard+nb_Richard_2)
			{
			  twn_data[h][twn.length+1] += (total_Richard - (nb_Richard+nb_Richard_2))*(twn_Richard_3 - twn_Richard_2) ;
			}
		  }
		  
		  // correction if the show was ruined nb_Ruined times or more
		  for (var h=0; h < twn_chars.length; h++ )
		  { 
			var total_Ruined = twn_data[h][10] ;
			if (total_Ruined >= nb_Ruined)
			{
			  twn_data[h][twn.length+1] += (total_Ruined - nb_Ruined)*(twn_Ruined_2 - twn_Ruined) ;
			}
		  }
		  
		  twn_data = sortArray(twn.length+1,twn_data);
		  
		  page += getSection("Town Square", twn_headers, twn_points, "normal", twn_data, twn_total, twn,0);
		}
        
        // Burnbarrel Blvd. data and initialization
		var brn_headers = new Array("Hot Hobos","Killed by<br>Ol' Scratch","Defeats","Threw tire<br>on fire","Tirevalanche","Diverted Steam","Opened Door","Burned by Door","Total Advs","Total Points");
		var brn_points = new Array("("+brn_Hobo+" pt)","("+brn_Scratch+" pt)","("+brn_Defeats+" pt)","("+brn_Fire+" pt)","("+brn_Tirevalance+" pt)","("+brn_Steam+" pt)","("+brn_Opened_Door+" pt)","("+brn_Burned_Door+" pt)","","");
		var brn = new Array("defeated  Hot hobo","defeated by  Ol' Scratch","was defeated by  Hot","on the fire","tirevalanche","diverted some steam away","clan coffer","hot door","");
		var brn_clan = new Array(brn_Hobo,brn_Scratch,brn_Defeats,brn_Fire,brn_Tirevalance,brn_Steam,brn_Opened_Door,brn_Burned_Door,0);
		var brn_chars = setupCharacters("Burnbarrel Blvd.:", "Hobopolis");
		var brn_data = new Array();
		var brn_total = zeroArray(brn.length+2);
		if (parseSection("Burnbarrel Blvd.:", brn, brn_clan, brn_data, brn_chars, "Hobopolis"))
		  page += getSection("Burnbarrel Blvd.", brn_headers, brn_points, "burn", brn_data, brn_total, brn, 1);
		
		// Exposure Esplanade data and initialization
		var exp_headers = new Array("Cold Hobos","Killed by<br>Frosty","Defeats","Freezers<br>Raided","Fridges<br>Raided","Broken Pipes","Diverted Water<br>out of Esplanade","Diverted Water<br>to Burnbarrel Blvd","Yodeled<br>a little","Yodeled<br>quite a bit","Yodeled<br>like crazy","Total Advs","Total Points");
		var exp_points = new Array("("+exp_Hobo+" pt)","("+exp_Frosty+" pt)","("+exp_Defeats+" pt)","("+exp_Freezer+" pt)","("+exp_Fridge+" pt)","("+exp_Broke+" pt)","("+exp_Water_Out+" pt)","("+exp_Water_Burnbarrel+" pt)","("+exp_Yodeled_Little+" pt)","("+exp_Yodeled_Bit+" pt)","("+exp_Yodeled_Crazy+" pt)","","");
		var exp = new Array("defeated  Cold hobo","defeated by  Frosty","was defeated by  Cold","freezer","fridge","broke","diverted some cold water out of Exposure Esplanade","diverted some cold water to Burnbarrel Blvd","yodeled a little","yodeled quite a bit","yodeled like crazy","");
		var exp_clan = new Array(exp_Hobo,exp_Frosty,exp_Defeats,exp_Freezer,exp_Fridge,exp_Broke,exp_Water_Out,exp_Water_Burnbarrel,exp_Yodeled_Little,exp_Yodeled_Bit,exp_Yodeled_Crazy,0);
		var exp_chars = setupCharacters("Exposure Esplanade:", "Hobopolis");
		var exp_data = new Array();
		var exp_total = zeroArray(exp.length+2);
		if (parseSection("Exposure Esplanade:", exp, exp_clan, exp_data, exp_chars, "Hobopolis"))
		  page += getSection("Exposure Esplanade", exp_headers, exp_points, "exp", exp_data, exp_total, exp,2);
		
		// Heap data and initialization
		var heap_headers = new Array("Stench Hobos","Killed by<br>Oscus","Defeats","Trashcanos","Buried Treasure","Sent compost to<br>the Burial Ground","Total Advs","Total Points");
		var heap_points = new Array("("+heap_Hobo+" pt)","("+heap_Oscus+" pt)","("+heap_Defeats+" pt)","("+heap_Trashcano+" pt)","("+heap_Treasure+" pt)","("+heap_compost+" pt)","","");
		var heap = new Array("defeated  Stench hobo","defeated by  Oscus","was defeated by  Stench","trashcano eruption","buried treasure","Burial Ground","");
		var heap_clan = new Array(heap_Hobo,heap_Oscus,heap_Defeats,heap_Trashcano,heap_Treasure,heap_compost,0);
		var heap_chars = setupCharacters("The Heap:", "Hobopolis");
		var heap_data = new Array();
		var heap_total = zeroArray(heap.length+2);
		if (parseSection("The Heap:", heap, heap_clan, heap_data, heap_chars, "Hobopolis"))
		  page += getSection("The Heap", heap_headers, heap_points, "heap", heap_data, heap_total, heap,3);
		
		// The Ancient Hobo Burial Ground data and initialization
		var burial_headers = new Array("Spooky Hobos","Killed by<br>Zombo","Defeats","Sent Flowers to<br>The Heap","Raided Tombs","Watched zombies<br>dance","Failed to impress<br>with dance","Busted moves","Total Advs","Total Points");
		var burial_points = new Array("("+burial_Hobo+" pt)","("+burial_Zombo+" pt)","("+burial_Defeats+" pt)","("+burial_Flowers+" pt)","("+burial_Raided+" pt)","("+burial_Dance+" pt)","("+burial_Impress+" pt)","("+burial_Busted+" pt)","","");
		var burial = new Array("defeated  Spooky hobo","defeated by  Zombo","was defeated by  Spooky","flower","raided","zombie hobos dance","failed to impress","busted","");
		var burial_clan = new Array(burial_Hobo,burial_Zombo,burial_Defeats,burial_Flowers,burial_Raided,burial_Dance,burial_Impress,burial_Busted,0);
		var burial_chars = setupCharacters("The Ancient Hobo Burial Ground:", "Hobopolis");
		var burial_data = new Array();
		var burial_total = zeroArray(burial.length+2);
		if (parseSection("The Ancient Hobo Burial Ground:", burial, burial_clan, burial_data, burial_chars, "Hobopolis"))
		  page += getSection("The Ancient Hobo Burial Ground", burial_headers, burial_points, "burial", burial_data, burial_total, burial,4);
		
		// The Purple Light District data and initialization
		var purple_headers = new Array("Sleaze Hobos","Killed by<br>Chester","Defeats","Raided Dumpsters","Sent Trash to<br>The Heap","Bamboozeled","Flimflammed","Danced","Barfights","Total Advs","Total Points");
		var purple_points = new Array("("+purple_Hobo+" pt)","("+purple_Chester+" pt)","("+purple_Defeats+" pt)","("+purple_Dumpster+" pt)","("+purple_Trash+" pt)","("+purple_Bamboozeled+" pt)","("+purple_Flimflammed+" pt)","("+purple_Danced+" pt)","("+purple_Barfight+" pt)","","");
		var purple = new Array("defeated  Sleaze hobo","defeated by  Chester","was defeated by  Sleaze","dumpster","sent some trash","bamboozled","flimflammed","danced like a superstar","barfight","");
		var purple_clan = new Array(purple_Hobo,purple_Chester,purple_Defeats,purple_Dumpster,purple_Trash,purple_Bamboozeled,purple_Flimflammed,purple_Danced,purple_Barfight,0);
		var purple_chars = setupCharacters("The Purple Light District:", "Hobopolis");
		var purple_data = new Array();
		var purple_total = zeroArray(purple.length+2);
		if (parseSection("The Purple Light District:", purple, purple_clan, purple_data, purple_chars, "Hobopolis"))
		  page += getSection("The Purple Light District", purple_headers, purple_points, "purple", purple_data, purple_total, purple,5);
    
        // Hodgman
        var misc = new Array("defeated  Hodgman","was defeated by Hodgman","");
		var misc_points = new Array("","","");
		var misc_clan = new Array(0,0,0);
		var misc_chars = setupCharacters("Miscellaneous", "Hobopolis");
		var misc_data = new Array();
		var misc_total = zeroArray(misc.length+1);
		if (parseSection("Miscellaneous", misc, misc_clan, misc_data, misc_chars, "Hobopolis"))
		{
		  getSection("Miscellaneous", misc, misc_points, "normal", misc_data, misc_total, misc,6);
		}
    
    
        // Bosses
        boss_table = '<center>' +
                         '<table class="normal">'+
                             '<tr align="center">' +
                                 '<td width="80" class="sewer_total">Richard</td>' + 
                                 "<td width='80' class='burn_total'>Ol' Scratch</td>" +
                                 '<td width="80" class="exp_total">Frosty</td>' + 
                                 '<td width="80" class="heap_total">Oscus</td>' +
                                 '<td width="80" class="burial_total">Zombo</td>' + 
                                 '<td width="80" class="purple_total">Chester</td>' + 
                                 '<td width="80" class="normal_total">Hodgman</td>' + 
                             '</tr>' +
                             '<tr align="center">' +
                                 '<td class="sewer_shaded" onmouseover="style.cursor=\'pointer\';" onclick=window.location=\'clan_hobopolis.php?place=3&action=talkrichard&whichtalk=3\'><img width="80" height="80" src="http://images.kingdomofloathing.com/adventureimages/richardmoll.gif"></td>' +
                                 '<td class="burn_shaded" onmouseover="style.cursor=\'pointer\';" onclick=window.location=\'clan_hobopolis.php?place=4\'><img width="80" height="80" src="http://images.kingdomofloathing.com/adventureimages/olscratch.gif"></td>' +
                                 '<td class="exp_shaded" onmouseover="style.cursor=\'pointer\';" onclick=window.location=\'clan_hobopolis.php?place=5\'><img width="80" height="80" src="http://images.kingdomofloathing.com/adventureimages/frosty.gif"></td>' +
                                 '<td class="heap_shaded" onmouseover="style.cursor=\'pointer\';" onclick=window.location=\'clan_hobopolis.php?place=6\'><img width="80" height="80" src="http://images.kingdomofloathing.com/adventureimages/oscus.gif"></td>' +
                                 '<td class="burial_shaded" onmouseover="style.cursor=\'pointer\';" onclick=window.location=\'clan_hobopolis.php?place=7\'><img width="80" height="80" src="http://images.kingdomofloathing.com/adventureimages/zombo.gif"></td>' +
                                 '<td class="purple_shaded" onmouseover="style.cursor=\'pointer\';" onclick=window.location=\'clan_hobopolis.php?place=8\'><img width="80" height="80" src="http://images.kingdomofloathing.com/adventureimages/chester.gif"></td>' +
                                 '<td class="normal_shaded" onmouseover="style.cursor=\'pointer\';" onclick=window.location=\'clan_hobopolis.php?place=2\'><img width="80" height="80" src="http://images.kingdomofloathing.com/adventureimages/hodgman.gif"></td>' +
                             '</tr>' +
                             '<tr align="center">';
    
             // Richard stuff here
             getScarehobos();
             boss_table += '<td width="80" class="sewer_table"><div id="scarehobos">Loading hobo parts...</div></td>';
    
             if (bosses[1] != "")
                 boss_table += '<td width="80" class="burn_table">Killed by:<br>' + playerLink(bosses[1]) + '</td>';
             else
             {
                 getZoneStatus(4);
                 boss_table += '<td width="80" class="burn_total"><div id="burnbarrel4">Loading status...</div></td>';
             }
             if (bosses[2] != "")
                 boss_table += '<td width="80" class="exp_table">Killed by:<br>' + playerLink(bosses[2]) + '</td>';
             else
             {
                 getZoneStatus(5);
                 boss_table += '<td width="80" class="exp_total"><div id="exposureesplanade5">Loading status...</div></td>';
             }
             if (bosses[3] != "")
                 boss_table += '<td width="80" class="heap_table">Killed by:<br>' + playerLink(bosses[3]) + '</td>';
             else
             {
                 getZoneStatus(6);
                 boss_table += '<td width="80" class="heap_total"><div id="theheap6">Loading status...</div></td>';
             }
             if (bosses[4] != "")
                 boss_table += '<td width="80" class="burial_table">Killed by:<br>' + playerLink(bosses[4]) + '</td>';
             else
             {
                 // Load zone status based off of image
                 getZoneStatus(7);
                 boss_table += '<td width="80" class="burial_total"><div id="burialground7">Loading status...</div></td>';
             }
             if (bosses[5] != "")
                 boss_table += '<td width="80" class="purple_table">Killed by:<br>' + playerLink(bosses[5]) + '</td>';
             else
             {
                 getZoneStatus(8);
                 boss_table += '<td width="80" class="purple_total"><div id="purplelightdistrict8">Loading status...</div></td>';
             }
             if (bosses[0] != "")
                 boss_table += '<td width="80" class="normal_table">Killed by:<br>' + playerLink(bosses[0]) + '</td>';
             else
             {
                 getZoneStatus(2);
                 boss_table += '<td width="80" class="normal_total"><div id="townsquare2">Loading status...</div></td>';
             }
             
             boss_table += "</tr><tr><td align='left' colspan='7' id='scarehoboz'></td></tr></table></center><br>";
			 
			 totalPointsTable = getTotalPoints();
             totalAdventureTable = getTotalAdventures();
             
        }    



    // Return output
    var oldPageData = document.body.innerHTML;
    document.body.innerHTML = "<div style='font-size: 10px;' align='center'>"+
                              "    <a href='/showplayer.php?who=841325'>DrEvi1's</a> Hobopolis Raid Manager v" + currentVersion + "<br><br>"+
                              "</div>" + 
                              "<div align='center'>"+
                              "<table class='options_table' width='350'>"+
                              "   <tr onmouseover=\"style.cursor='pointer';\" onClick=\"toggleRow('options');\" class='options_header'>" +
                              "       <td colspan='14' align='center'>Options</td>" +
                              "   </tr>"+
                              "   <tr>"+
                              "       <td colspan='14' width='100%'>"+
                              "           <div style='display: none' id='options' style='font-size: 11px;' align='right'>"+
                              "             <div id='options_hobo' style='font-size: 11px;'>Show Hobopolis Data&nbsp;&nbsp;&nbsp;</div>"+
                              "             <div id='options_slime' style='font-size: 11px;'>Show Slime Tube Data&nbsp;&nbsp;&nbsp;</div>"+
                              "             <div id='options_sewer' style='font-size: 11px;'>Load sewer items table&nbsp;&nbsp;&nbsp;</div>"+
                              "             <div id='options_loot' style='font-size: 11px;'>Load only current players in hobo loot table&nbsp;&nbsp;&nbsp;</div>"+
                              "             <div id='options_slimeloot' style='font-size: 11px;'>Load only current players in slime loot table&nbsp;&nbsp;&nbsp;</div>"+
                              "           </div>" +
                              "       </td>"+
                              "   </tr>"+
                              "</table><br></div>"+
                              "<div style='font-size: 11px;' align='center'>"+
                              "    <a href='/clan_basement.php'>Clan Basement</a>&nbsp;&nbsp;"+
                              "    <a href='/clan_hobopolis.php'>Sewer</a>&nbsp;&nbsp;"+
                              "    <a href='/clan_slimetube.php'>Slime Tube</a>"+
                              "</div>";
    document.body.innerHTML += boss_table;
    document.body.innerHTML += slimeTable;
//    document.body.innerHTML += slime_boss_table;
    document.body.innerHTML += "<div id='lootButtonTable'></div><br><div id='lootSlimeButtonTable'></div><br>" + totalPointsTable + totalAdventureTable + page + oldPageData;
    
    /* ------------------------------------------ */
    /* START OPTIONS */
    /* ------------------------------------------ */

    // hobo option button
    var hoboButton = document.createElement("input");
    with(hoboButton)
    {
          type = "button";
          value = option_hobo;
          style.cursor = "pointer";
          className = "button_small";
          hoboButton.addEventListener('click',function(evt) 
          {
              option_hobo = "OFF";
              if (GM_getValue("option_hobo","ON") == "OFF")
                option_hobo = "ON";
              GM_setValue("option_hobo",option_hobo);
              value = option_hobo;
          },false);
    }
    document.getElementById("options_hobo").appendChild(hoboButton);
    
    // slime option button
    var slimeButton = document.createElement("input");
    with(slimeButton)
    {
          type = "button";
          value = option_slime;
          style.cursor = "pointer";
          className = "button_small";
          slimeButton.addEventListener('click',function(evt) 
          {
              option_slime = "OFF";
              if (GM_getValue("option_slime","ON") == "OFF")
                option_slime = "ON";
              GM_setValue("option_slime",option_slime);
              value = option_slime;
          },false);
    }
    document.getElementById("options_slime").appendChild(slimeButton);
    
    // loot option log button
    var lootPlayerButton = document.createElement("input");
    with(lootPlayerButton)
    {
          type = "button";
          value = option_loot;
          style.cursor = "pointer";
          className = "button_small";
          lootPlayerButton.addEventListener('click',function(evt) 
          {
              option_loot = "OFF";
              if (GM_getValue("option_loot","ON") == "OFF")
                option_loot = "ON";
              GM_setValue("option_loot",option_loot);
              value = option_loot;
          },false);
    }
    document.getElementById("options_loot").appendChild(lootPlayerButton);
    
    // loot option log button
    var lootSlimePlayerButton = document.createElement("input");
    with(lootSlimePlayerButton)
    {
          type = "button";
          value = option_slimeloot;
          style.cursor = "pointer";
          className = "button_small";
          lootSlimePlayerButton.addEventListener('click',function(evt) 
          {
              option_slimeloot = "OFF";
              if (GM_getValue("option_slimeloot","ON") == "OFF")
                option_slimeloot = "ON";
              GM_setValue("option_slimeloot",option_slimeloot);
              value = option_slimeloot;
          },false);
    }
    document.getElementById("options_slimeloot").appendChild(lootSlimePlayerButton);
    
    // Sewer option log button
    var optionButton = document.createElement("input");
    with(optionButton)
    {
          type = "button";
          value = option_sewer;
          style.cursor = "pointer";
          className = "button_small";
          optionButton.addEventListener('click',function(evt) 
          {
              option_sewer = "OFF";
              if (GM_getValue("option_sewer","ON") == "OFF")
                option_sewer = "ON";
              GM_setValue("option_sewer",option_sewer);
              value = option_sewer;
          },false);
    }
    document.getElementById("options_sewer").appendChild(optionButton);
    
    
    /* ------------------------------------------ */
    /* END OPTIONS */
    /* ------------------------------------------ */

    if ((GM_getValue("option_hobo","ON") == "ON") && (dungeon_type != "The Slime Tube"))
    {

        // Loot table div
        var lootTable = document.createElement("div");
        with(lootTable)
        {
              id = "lootTable";
              align = "center";
        }
    
        // Loot log button
        var lootButton = document.createElement("input");
        with(lootButton)
        {
              type = "button";
              value = "Hobopolis Loot Logs";
              style.cursor = "pointers";
              className = "button_normal";
              lootButton.addEventListener('click',function(evt) 
              {
                  disabled = true;
                  value = "Loading...";
                  globalCount.dungeon = 0;
                  getLogIDs("Hobopolis");
              },false);
        }
        lootTable.appendChild(lootButton);
        document.getElementById("lootButtonTable").appendChild(lootTable);
    }

    if ((GM_getValue("option_slime","ON") == "ON") && (dungeon_type != "Hobopolis"))
    {

        // Loot table div
        var lootSlimeTable = document.createElement("div");
        with(lootSlimeTable)
        {
              id = "lootSlimeTable";
              align = "center";
        }
    
        // Loot log button
        var lootSlimeButton = document.createElement("input");
        with(lootSlimeButton)
        {
              type = "button";
              value = "Slime Tube Loot Logs";
              style.cursor = "pointers";
              className = "button_normal";
              lootSlimeButton.addEventListener('click',function(evt) 
              {
                  disabled = true;
                  value = "Loading...";
                  globalCount.dungeon = 0;
                  getLogIDs("The Slime Tube");
              },false);
        }
        lootSlimeTable.appendChild(lootSlimeButton);
        document.getElementById("lootSlimeButtonTable").appendChild(lootSlimeTable);
    }
    
}

function makeScarehobos()
{
    var quantity = document.getElementById("qty").value;
    GM_get("clan_hobopolis.php?preaction=simulacrum&place=3&qty=" + quantity,
    function findStatus(response) 
    {
          if (response.indexOf("<b>BLAM!</b>") >= 0)
              window.location = "clan_raidlogs.php";
          else if (response.indexOf("there aren't enough hobos left to scare") >= 0)
              document.getElementById("scarehoboz").innerHTML = "No more hobos in town square.";
          else
              document.getElementById("scarehoboz").innerHTML = "Unable to create.";
    });
}


function getSewerTableDef()
{
        var sewerTable = '<center>' +
                         '<table class="normal" width="310">'+
                             '<tr align="center">' +
                                 '<td width="50" class="normal_shaded">unfortunate dumplings</td>' + 
                                 "<td width='50' class='normal_shaded'>bottle of Ooze-O</td>" +
                                 '<td width="50" class="normal_shaded">sewer wad</td>' + 
                                 '<td width="50" class="normal_shaded">oil of oiliness</td>' +
                                 '<td width="50" class="normal_shaded">gatorskin umbrella</td>' + 
                             '</tr>' +
                             '<tr align="center">' +
                                 '<td class="normal_shaded"><img width="30" height="30" src="http://images.kingdomofloathing.com/itemimages/soupbowl.gif"></td>' +
                                 '<td class="normal_shaded"><img width="30" height="30" src="http://images.kingdomofloathing.com/itemimages/bottle.gif"></td>' +
                                 '<td class="normal_shaded"><img width="30" height="30" src="http://images.kingdomofloathing.com/itemimages/scwad.gif"></td>' +
                                 '<td class="normal_shaded"><img width="30" height="30" src="http://images.kingdomofloathing.com/itemimages/potion5.gif"></td>' +
                                 '<td class="normal_shaded"><img width="30" height="30" src="http://images.kingdomofloathing.com/itemimages/goatumb.gif"></td>' +
                             '</tr>' +
                             '<tr align="center">' +
                                 '<td id="dumplings" class="normal_total"></td>' +
                                 '<td id="bottles" class="normal_total"></td>' +
                                 '<td id="wads" class="normal_total"></td>' +
                                 '<td id="oils" class="normal_total"></td>' +
                                 '<td id="ellas" class="normal_total"></td>' +
                             '</tr>' +
                             '</table></center>';

  return sewerTable;

}

function getSewerItems()
{

    // Will get bottles of ooze-o and unfortunate dumplings
    GM_get("inventory.php?which=1",
    function findStatus(response) 
    {
          var bottles = 0;
          var dumplings = 0;
          var pageText = response;
          var startIndex = pageText.indexOf("bottle of Ooze-O");  // ooze-o
          if (startIndex >= 0)  // bottle found 
          {
              var m = pageText.substring(startIndex,startIndex+35).match(/\(\d*\)/);
              if (m != null)
              {
                var n = m[0].match(/\d{1,5}/);
                bottles = parseInt(n[0]);
              }
              else
                bottles = 1;
          }
          startIndex = pageText.indexOf("unfortunate dumplings");  // dumplings
          if (startIndex >= 0)  // bottle found 
          {
              var m = pageText.substring(startIndex,startIndex+35).match(/\(\d*\)/);
              if (m != null)
              {
                var n = m[0].match(/\d{1,5}/);
                dumplings = parseInt(n[0]);
              }
              else
                dumplings = 1;
          }

         // Apply returnVal to div layer to show results
          document.getElementById("bottles").innerHTML = bottles;
          document.getElementById("dumplings").innerHTML = dumplings;
    });

    // Will get sewer wads and oils of oiliness
    GM_get("inventory.php?which=3",
    function findStatus(response) 
    {
          var oils = 0;
          var wads = 0;
          var pageText = response;
          var startIndex = pageText.indexOf("oil of oiliness");
          if (startIndex >= 0)  // found 
          {
              var m = pageText.substring(startIndex,startIndex+35).match(/\(\d*\)/);
              if (m != null)
              {
                var n = m[0].match(/\d{1,5}/);
                oils = parseInt(n[0]);
              }
              else
                oils = 1;
          }
          startIndex = pageText.indexOf("sewer wad");
          if (startIndex >= 0)  // found 
          {
              var m = pageText.substring(startIndex,startIndex+35).match(/\(\d*\)/);
              if (m != null)
              {
                var n = m[0].match(/\d{1,5}/);
                wads = parseInt(n[0]);
              }
              else
                wads = 1;
          }

         // Apply returnVal to div layer to show results
          document.getElementById("oils").innerHTML = oils;
          document.getElementById("wads").innerHTML = wads;
    });

    // Will get gatorskin umbrellas, ellas, ay, ay...
    GM_get("inventory.php?which=2",
    function findStatus(response) 
    {
          var ellas = 0;
          var pageText = response;
          var weaponText = pageText.substring(pageText.indexOf("Melee Weapons:"),pageText.length);
          var startIndex = weaponText.indexOf("gatorskin umbrella");
          if (startIndex >= 0)  // found 
          {
              var m = weaponText.substring(startIndex,startIndex+38).match(/\(\d*\)/);
              if (m != null)
              {
                var n = m[0].match(/\d{1,5}/);
                ellas = parseInt(n[0]);
              }
              else
                ellas = 1;

          }
          else // Have to determine is there is only one and it is equipped
          {
              startIndex = pageText.indexOf("gatorskin umbrella");
              if (startIndex >= 0)  // found 
              {
                  ellas = 1;
              }
          }
          // Determine if any are equipped
          startIndex = pageText.indexOf("Weapon</a>:");
          var endIndex = pageText.indexOf("Pants</a>:")
          if (endIndex >= 0)
            pageText = pageText.substring(startIndex,endIndex);
          else
            pageText = pageText.substring(startIndex,startIndex + 100);
          if (pageText.indexOf("gatorskin umbrella") >= 0)
                ellas += " (Equipped)";
          else
          {
                if (ellas > 0)
                {
                  // Add equip link for conveinence ""     
                  var hashIndex = pageText.indexOf("inv_equip.php?pwd=");
                  var pwdhash = pageText.substring(hashIndex+18,hashIndex+50);
                  
                  ellas += " (Not&nbsp;<a style='color:white;' href='inv_equip.php?pwd=" + pwdhash + "&amp;which=2&amp;action=equip&amp;whichitem=3222'>Equipped</a>)";
                }
                else
                  ellas += " (Not&nbsp;Equipped)";
          }
         // Apply returnVal to div layer to show results
          document.getElementById("ellas").innerHTML = ellas;
    });

}

function getSewerTests()
{
    // Yes I realize I should have done this more programatically, but this is faster.  In future updates I will work towards
    // a more programatic solution
    var test1 = "<font color='red'>Failed</font>";
    var test2 = "<font color='red'>Failed</font>";
    var test3 = "<font color='red'>Failed</font>";
    var test4 = "<font color='red'>Failed</font>";
    var dumplings = "<font color='red'>Failed</font>";
    var bottles = "<font color='red'>Failed</font>";
    var wads = "<font color='red'>Failed</font>";
    var oils = "<font color='red'>Failed</font>";
    var ellas = "<font color='red'>Failed</font>";
    var pageText = document.body.innerHTML;
    
    if (pageText.indexOf("You head down the 'shortcut' tunnel.") >= 0)
      test1 = "<font color='green'>Passed</font>";
    if (pageText.indexOf("You continue down the tunnel, instead.") >= 0)
      test2 = "<font color='green'>Passed</font>";
    if (pageText.indexOf("You head toward the Egress.") >= 0)
      test3 = "<font color='green'>Passed</font>";
    if (pageText.indexOf("looks like somebody else opened this grate from the other side") >= 0)
      test4 = "<font color='green'>Passed</font>";
    if (pageText.indexOf("You leave the fish to his delicious meal and proceed further down the tunnel.") >= 0)
      dumplings = "<font color='green'>Passed</font>";
    if (pageText.indexOf("You step over his prone, odiferous form and proceed down the tunnel.") >= 0)
      bottles = "<font color='green'>Passed</font>";
    if (pageText.indexOf("He grabs the wad and runs away") >= 0)
      wads = "<font color='green'>Passed</font>";
    if (pageText.indexOf("you douse yourself with oil of oiliness") >= 0)
      oils = "<font color='green'>Passed</font>";
    if (pageText.indexOf("There's not much left of the umbrella") >= 0)
      ellas = "<font color='green'>Passed</font>";
    
    var test = "<font color='red'>Failed</font>";
    var testName = "";
    var testTable = '<center><table class="normal" width="310">'+
                       '<tr align="center">' +
                           '<td class="normal_total">Test</td>'+
                           '<td class="normal_total">Status</td>'+
                       '</tr>'+
                       '<tr>'+
                           '<td style="text-align: left;" class="normal">Easy Hobo Code Test</td>'+
                           '<td class="normal">' + test1 + '</td>'+
                       '</tr>';
                       var sectionText = pageText.substring(pageText.indexOf("sewertunnel.gif"),pageText.indexOf("sewerladder.gif"));
                       if (sectionText.indexOf("zomfish.gif")>=0)
                       {
                          test = dumplings;
                          testName = "Zombie Goldfish (unfortunate dumplings)";
                       }
                       else if (sectionText.indexOf("chum1.gif")>=0)
                       {
                          test = wads;
                          testName = "C.H.U.M. (sewer wad)";
                       }
                       else if (sectionText.indexOf("chum2.gif")>=0)
                       {
                          test = bottles;
                          testName = "Drunken C.H.U.M. (bottle of Ooze-O)";
                       }
                       else if (sectionText.indexOf("gate.gif")>=0)
                       {
                          test = oils;
                          testName = "Narrow Gate (3 oils of oiliness)";
                       }
                       else if (sectionText.indexOf("sewertunnel.gif")>=0)
                       {
                          test = ellas;
                          testName = "Flood of Sewage (gatorskin umbrella)";
                       }
          testTable += '<tr>'+
                           '<td style="text-align: left;" class="normal_shaded">' + testName + '</td>'+
                           '<td class="normal_shaded">' + test + '</td>'+
                       '</tr>'+
                       '<tr>'+
                           '<td style="text-align: left;" class="normal">Medium Hobo Code Test</td>'+
                           '<td class="normal">' + test2 + '</td>'+
                       '</tr>';
                       var sectionText = pageText.substring(pageText.indexOf("sewerladder.gif"),pageText.indexOf("3ladders.gif"));
                       if (sectionText.indexOf("zomfish.gif")>=0)
                       {
                          test = dumplings;
                          testName = "Zombie Goldfish (unfortunate dumplings)";
                       }
                       else if (sectionText.indexOf("chum1.gif")>=0)
                       {
                          test = wads;
                          testName = "C.H.U.M. (sewer wad)";
                       }
                       else if (sectionText.indexOf("chum2.gif")>=0)
                       {
                          test = bottles;
                          testName = "Drunken C.H.U.M. (bottle of Ooze-O)";
                       }
                       else if (sectionText.indexOf("gate.gif")>=0)
                       {
                          test = oils;
                          testName = "Narrow Gate (3 oils of oiliness)";
                       }
                       else if (sectionText.indexOf("sewertunnel.gif")>=0)
                       {
                          test = ellas;
                          testName = "Flood of Sewage (gatorskin umbrella)";
                       }
          testTable += '<tr>'+
                           '<td style="text-align: left;" class="normal_shaded">' + testName + '</td>'+
                           '<td class="normal_shaded">' + test + '</td>'+
                       '</tr>'+
                       '<tr>'+
                           '<td style="text-align: left;" class="normal">Hard Hobo Code Test</td>'+
                           '<td class="normal">' + test3 + '</td>'+
                       '</tr>'+
                       '<tr>'+
                           '<td style="text-align: left;" class="normal_shaded">Opened Grate Test</td>'+
                           '<td class="normal_shaded">' + test4 + '</td>'+
                       '</tr>'+
                       '</table></center>';
    
    return testTable;



}


// Function that resolves the listing of all distributed loot.
function getLoot(logArray, dungeon)
{
    //displayArray(logArray);
    var allLoot = new Array();
    
    // FOR CURRENT RUN - Changed in 2.9 to hit clan_raidlogs.php
        GM_get("clan_raidlogs.php",
        function findStatus(response) 
        {
              globalCount.dungeon += 1;
              if (dungeon == "Hobopolis")
                  lootButton.value = "Loading... " + globalCount.dungeon + " of " + (logArray.length+1);
              else
                  lootSlimeButton.value = "Loading... " + globalCount.dungeon + " of " + (logArray.length+1);
              var pageText = response.substring(response.indexOf(dungeon),response.length);  // This is the only difference from the text below for past runs
              var startIndex = pageText.indexOf("Loot Distribution:");
              startIndex = pageText.indexOf("<blockquote>",startIndex);
              var endIndex = pageText.indexOf("</blockquote>", startIndex+12);
              if ((startIndex >= 0) && (endIndex >= 0))
              {
                  var data = pageText.substring(startIndex+12,endIndex);
                  if (data.indexOf("(none yet)")<0)
                  {
                      var dataArray = data.split("<br>");
                      for (var j=0; j < dataArray.length; j++ )
                      {
                          var line = dataArray[j];
                          var loot = line.substring(line.indexOf("<b>")+3,line.indexOf("</b>"));
                          var character = line.substring(line.indexOf("</b> to ")+8,line.indexOf(")",line.indexOf("</b> to ")+8)+1);
                          if (loot == "Wand of Oscus")
                            loot = "Oscus's Wand";
                          if ((character != "") && (loot != ""))
                            allLoot[allLoot.length] = character +"|"+loot;
                      }
                  }
              }
              if (globalCount.dungeon == (logArray.length+1))  // If all calls to previous logs are complete (man I hope this works)
                  createLootTable(allLoot.sort(sortfunction), dungeon);
        });
    // END FOR CURRENT RUN

    for (var i=0; i < logArray.length; i++ )
    {
        GM_get("clan_raidlogs.php?viewlog="+logArray[i],
        function findStatus(response) 
        {
              globalCount.dungeon += 1;
              if (dungeon == "Hobopolis")
                  lootButton.value = "Loading... " + globalCount.dungeon + " of " + (logArray.length+1);
              else
                  lootSlimeButton.value = "Loading... " + globalCount.dungeon + " of " + (logArray.length+1);
              var pageText = stripCurrent(response);
              var startIndex = pageText.indexOf("Loot Distribution:");
              if (startIndex >= 0)
                startIndex = pageText.indexOf("<blockquote>",startIndex);
              var endIndex = pageText.indexOf("</blockquote>", startIndex+12);
              if ((startIndex >= 0) && (endIndex >= 0))
              {
                  var data = pageText.substring(startIndex+12,endIndex);
                  var dataArray = data.split("<br>");
                  for (var j=0; j < dataArray.length; j++ )
                  {
                      var line = dataArray[j];
                      var loot = line.substring(line.indexOf("<b>")+3,line.indexOf("</b>"));
                      var character = line.substring(line.indexOf("</b> to ")+8,line.indexOf(")",line.indexOf("</b> to ")+8)+1);
                      if (loot == "Wand of Oscus")
                        loot = "Oscus's Wand";
                      if ((character != "") && (loot != ""))
                          allLoot[allLoot.length] = character +"|"+loot;
                      //alert(line + "\n" + character + " - " + loot);
                  }
              }
               if (globalCount.dungeon == (logArray.length+1))  // If all calls to previous logs are complete (man I hope this works)
                  createLootTable(allLoot.sort(sortfunction), dungeon);
        });
    }
}
function stripCurrent(thePageText)
{
    var index = thePageText.indexOf("<b>Clan Dungeon Logs</b>");
    var data = thePageText.substring(0,index);
    return data;

}

function getHeaders(dungeon)
{
    var dataTable = '<tr>' +
                        '<td class="normal_total">Player</td>';
    for (var i=0; i < lootSourceArray.length; i++ )
    {
        var splitLoot = lootSourceArray[i].split("|");
        var loot = splitLoot[0];
        var desc = splitLoot[1];
        var image = splitLoot[2];
        var css = getcss(i, dungeon);
        lootOnlySourceArray[i] = loot;  //This allows later functions to reference the item name exactly.
        loot = loot.replace("Ol' Scratch's ","");
        loot = loot.replace("Frosty's ","");
        loot = loot.replace("Oscus's ","");
        loot = loot.replace("Zombo's ","");
        loot = loot.replace("Chester's ","");
        loot = loot.replace("Hodgman's ","");
        
        dataTable += '<td class="' + css + '_loot_shaded"><img width="14" height="14" src="'+ image +'" onMouseOver="style.cursor=\'pointer\'" onClick="descitem(\'' + desc + '\')" title="'+ loot +'"></td>';
    }
    dataTable += '</tr>';                 
    return dataTable;
}


function createLootTable(lootArray, dungeon)
{
    // charArray = Array of unique and alphabetized characters
    // dropArray = Array of arrays.  Stored arrays contain an element for each possible boss drop, and a counter for each.
    //             dropArray[X] coorisponds to charArray[X]'s drops.
    // lootArray = Array of character|loot retrieved from the logs

    var option_hobo = "ON";
    if (GM_getValue("option_hobo","ON") == "OFF")
    {
        option_hobo = "OFF";
    }
    if (option_hobo == "ON")
    {
        var option_loot = "ON";
        if (GM_getValue("option_loot","ON") == "OFF")
        {
            option_loot = "OFF";
        }
        else
        {
            for (var i=0; i < swr_chars.length; i++ )
            {
                swr_chars[i] = swr_chars[i].toLowerCase();
            }
        }
    }
    
    var option_slime = "ON";
    if (GM_getValue("option_slime","ON") == "OFF")
    {
        option_slime = "OFF";
    }
    if (option_slime == "ON")
    {
        var option_slimeloot = "ON";
        if (GM_getValue("option_slimeloot","ON") == "OFF")
        {
            option_slimeloot = "OFF";
        }
        else
        {
            for (var i=0; i < slime_chars.length; i++ )
            {
                slime_chars[i] = slime_chars[i].toLowerCase();
            }
        }
    }

    // Create array of unique player names
    var charArray = new Array();

    for (var i=0; i < lootArray.length; i++ )
    {
        var splitLoot = lootArray[i].split("|");
        var character = splitLoot[0].toLowerCase();

        if (dungeon == "Hobopolis")
        {
        // NEW CURRENT PLAYERS ONLY LOOT OPTION
          if ((option_loot == "OFF") || (swr_chars.indexOf(character) >= 0))  // If we want to show all characters OR the current char is in the sewer table
          {
              if (charArray.indexOf(character) < 0)
              {
                  charArray[charArray.length] = character;
              }
          }
        }

        if (dungeon == "The Slime Tube")
        {
        // NEW CURRENT PLAYERS ONLY LOOT OPTION (SLIME TUBE)
          if ((option_slimeloot == "OFF") || (slime_chars.indexOf(character) >= 0))
          {
              if (charArray.indexOf(character) < 0)
              {
                  charArray[charArray.length] = character;
              }
          }
        }
    }

    // Create new matrix of doom and hugeness.  This will probably crash everyone's computer in KOL Addicts.
    var dropArray = new Array(charArray.length);
    for (var i=0; i < dropArray.length; i++ )
    {
        dropArray[i] = zeroArray(lootOnlySourceArray.length);
    }


    var dataTable = "";
    
    if (dungeon == "Hobopolis")
    {
        dataTable += '<table width="100%" class="normal_table">'+
                             '<tr class="normal_header" onmouseover="style.cursor=\'pointer\';" onClick="toggleRow(\'loot\');" >' +
                                 '<td align="center">Hobopolis Loot Table</td>' +
                             '</tr>'+
                             '<tr>'+
                                '<td>'+
                                    '<div id="loot">'+
                                        '<table class="normal_table">'+
                                           '<tr align="center">' +
                                               '<td class="normal_header">&nbsp;</td>'+
                                               '<td colspan="6" class="burn_header">Ol Scratch</td>'+
                                               '<td colspan="6" class="exp_header">Frosty</td>'+
                                               '<td colspan="6" class="heap_header">Oscus</td>'+
                                               '<td colspan="6" class="burial_header">Zombo</td>'+
                                               '<td colspan="6" class="purple_header">Chester</td>'+
                                               '<td colspan="13" class="normal_header">Hodgman</td>'+
                                               '<td rowspan="2" class="normal_total" style="font-size: 9px;line-height:9px;">T<br>o<br>t</td>'+
                                            '</tr>';
    }
    else
    {
        dataTable += '<table width="100%" class="normal_table">'+
                             '<tr class="normal_header" onmouseover="style.cursor=\'pointer\';" onClick="toggleRow(\'loot2\');" >' +
                                 '<td align="center">Slime Tube Loot Table</td>' +
                             '</tr>'+
                             '<tr>'+
                                '<td>'+
                                    '<div id="loot2">'+
                                        '<table class="normal_table">'+
                                           '<tr align="center">' +
                                               '<td class="normal_header">&nbsp;</td>'+
                                               '<td colspan="8" class="slime_header">Mother Slime</td>'+
                                               '<td rowspan="2" class="normal_total" style="font-size: 9px;line-height:9px;">Total</td>'+
                                            '</tr>';
    }
    dataTable += getHeaders(dungeon);

    var dropTotalsArray = zeroArray(lootSourceArray.length);
    // Add loot to matrix
    for (var i=0; i < lootArray.length; i++ )
    {
        var splitLoot = lootArray[i].split("|");
        var character = splitLoot[0].toLowerCase();
        var loot = splitLoot[1];
        var charIndex = charArray.indexOf(character);
        var lootIndex = lootOnlySourceArray.indexOf(loot);

        if (charIndex >= 0)
        {
            dropArray[charIndex][lootIndex] += 1;
            dropTotalsArray[lootIndex] += 1;
        }
    }    

    var counter = 0;
    for (var i=0; i < charArray.length; i++ )  // Loops through characters
    {
        counter++;
        if (counter == 16)
        {
            dataTable += getHeaders(dungeon);
            counter = 0;
        }
        var row_shaded = "";
        var shaded = "";
        var character = charArray[i].substring(0,charArray[i].indexOf(" (#"));
        var characterLink = playerLink(charArray[i]);
        if (isEven(i))
          row_shaded = "";
        else
          row_shaded = "_shaded";
            
        dataTable += '<tr >';
        dataTable += '<td style="text-align: left;" class="normal_loot' + shaded + '">' + characterLink + '</td>';

        var charTotal = 0;
        for (var j=0; j < dropArray[i].length; j++ )
        {
            if (dungeon == "Hobopolis")
            {
                if (((j>=0) && (j<=2)) || ((j>=6) && (j<=8)) || ((j>=12) && (j<=14)) || ((j>=18) && (j<=20)) || ((j>=24) && (j<=26)) || ((j>=30) && (j<=32))   )
                    shaded = "_outfit";
                else
                    shaded = row_shaded;
            }
            if (dropArray[i][j] == 0)
                dataTable += '<td id="' + character + j + '" class="' + getcss(j, dungeon) + "_loot" + shaded + '">&nbsp;</td>';
            else
            {
                charTotal+=dropArray[i][j];
                dataTable += '<td onmouseover="style.cursor=\'pointer\';" title="' + character + ' - ' + lootOnlySourceArray[j] + '" id="' + character + j + '" class="' + getcss(j, dungeon) + "_loot" + shaded + '">' + dropArray[i][j] + '</td>';
            }
        }
        dataTable += '<td onmouseover="style.cursor=\'pointer\';" title="' + character + ' total" class="normal_loot_shaded">' + charTotal + '</td>';
        dataTable += '</tr>';
        
    
    }
    //Totals
    dataTable += '<tr>';
    dataTable += '<td class="normal_total">Total</td>';
    var grandTotal = 0;
    for (var i=0; i < dropTotalsArray.length; i++ )
    {
        var total = dropTotalsArray[i];
        grandTotal+=total;
        if (dropTotalsArray[i] == 0)
            total = "&nbsp;";
        dataTable += '<td class="' + getcss(i, dungeon) + '_loot_shaded">' + total + '</td>';
    }
    dataTable += '<td class="normal_loot_shaded">' + grandTotal + '</td>';
    dataTable += '</tr>';
    dataTable += '</table></div></td></tr></table>';
    if (dungeon == "Hobopolis")
      document.getElementById("lootTable").innerHTML = dataTable;
    else
      document.getElementById("lootSlimeTable").innerHTML = dataTable;
    
 
}

function displayArray(theArray)
{
      var theText = "";
      for (var j=0; j < theArray.length; j++ )
      {
          theText += theArray[j]+"\n";
      }
      alert(theText);
}

// Function that returns an array of previous run log IDs
function getLogIDs(dungeon)
{
    if (dungeon == "Hobopolis")
    {
        lootSourceArray = lootHobopolisSourceArray;
        lootOnlySourceArray = lootHobopolisOnlySourceArray;
    }
    if (dungeon == "The Slime Tube")
    {
        lootSourceArray = lootSlimeTubeSourceArray;
        lootOnlySourceArray = lootSlimeTubeOnlySourceArray;
    }

        GM_get("clan_raidlogs.php",
        function findStatus(response) 
        {
            var logArray = new Array();
            var parsedText = response;
            parsedText = parsedText.substring(parsedText.indexOf("Previous Clan Dungeon Runs:"),parsedText.length);
            var parseIndex = parsedText.indexOf(dungeon);
            var counter = 0;
            var lastIndex = 0;
            
            while (parseIndex >= 0)
            {
                    var m = parsedText.substring(parseIndex+65,parsedText.length).match(/viewlog=(\w+(?:\.\w+)?)/);
                    logArray[counter] = m[1];
                    counter++;
                    parsedText = parsedText.substring(parseIndex+65,parsedText.length);
                    lastIndex = parseIndex;
                    parseIndex = parsedText.indexOf(dungeon);
            }
            if (counter == 0 )
              document.getElementById("lootTable").innerHTML = "No Previous Runs<br>or you do not have access<br>to the clan basement currently";
            else
            {
              //displayArray(logArray);
              getLoot(logArray, dungeon);
            }
        });
}

function getSlimeStatus()
{
    GM_get("clan_slimetube.php",
        function findStatus(response) 
        {
            var returnVal = 0;
            if (response.indexOf("/otherimages/slimetube/tube_boss.gif") >= 0)
                document.getElementById("slimeZone").innerHTML = "<font class='normal_text'>Boss is ready<br>for a fight!</font>";
            else
            {
                var startIndex = response.indexOf("/otherimages/slimetube/tube_");
                if (startIndex >= 0)
                {
                    var theString = response.substring(startIndex,response.length);
                    var m = theString.match(/\d{1,2}\.gif/); 
                    if (m != null)
                    {
                      var n = m[0].match(/\d{1,3}/);
                      var imageNumber = parseInt(n[0]);
                      returnVal = imageNumber;
                     }
                    var percentage = Math.round(((returnVal-1)/9)*100,2);
                    var percentage2 = Math.round((returnVal/9)*100,2);
                    document.getElementById("slimeZone").innerHTML = percentage + "-" + percentage2 +"% Complete<br>To Boss Fight<br><font style='font-size:10px;'>(Image = " + imageNumber + ")</font>";
                }
                else
                {
                  document.getElementById("slimeZone").innerHTML = "<font class='normal_text'>Area not open</font>";
                }
            }
        }
    );



}

// Function that goes ut and retreives the image status for each section of hobopolis
// clan_hobopolis.php?place=
// 2 - Town Square
// 4 - Burnbarrel
// 5 - Esplanade
// 6 - The Heap
// 7 - Burial Grounds
// 8 - Puple Light District
function getZoneStatus(section)
{
    // Have to put palceholders in arrays for place amounts that are not used
    var imageArray = new Array("","","townsquare","","burnbarrel","exposureesplanade","theheap","burialground","purplelightdistrict");
    var totalArray = new Array(0,0,25,0,10,10,10,10,10);
    GM_get("clan_hobopolis.php?place="+section,
        function findStatus(response) 
        {
            var returnVal = 0;
            var startIndex = response.indexOf(imageArray[section]);
            if (startIndex >= 0)
            {
                var theString = response.substring(startIndex,response.length);
                var m = response.match(/\d*\D?\.gif/); // This line thanks to punicron.
                if (m != null)
                {
                  var n = m[0].match(/\d{1,3}/);
                  var tent = m[0].match(/o\.gif/);
                  if (tent != null)
                    tent = "<font color='white'>open</font>";
                  else
                    tent = "<font color='red'>closed</font>";
                  var imageNumber = parseInt(n[0]);
                  returnVal = imageNumber;
                  if (imageNumber == 125)    // Damn you Jick.
                    returnVal = 13;
                }
                var percentage = Math.round((returnVal/totalArray[section])*100,2);
                if (percentage == 100)
                  document.getElementById(imageArray[section]+section).innerHTML = "<font class='normal_text'>Boss is ready<br>for a fight!</font>";
                else
                {
                  if (section == 2)
                    document.getElementById(imageArray[section]+section).innerHTML = percentage+"% Complete<br>To Boss Fight<br><font style='font-size:10px;'>(Image = " + imageNumber + ")</font><br>Tent is " + tent;
                  else
                    document.getElementById(imageArray[section]+section).innerHTML = percentage+"% Complete<br>To Boss Fight<br><font style='font-size:10px;'>(Image = " + imageNumber + ")</font>";
                }
            }
            else
            {
              document.getElementById(imageArray[section]+section).innerHTML = "<font class='normal_text'>Boss is alive<br>Area not open to you yet</font>";
            }

        }
    );



}

Array.prototype.min = function(){
    return Math.min.apply( Math, this );
};

function getScarehobos()
{
    GM_get("clan_hobopolis.php?place=3&action=talkrichard&whichtalk=3",
        function findScarehobos(response) 
        {
            var v_boots = 0;
            var v_eyes = 0;
            var v_guts = 0;
            var v_skulls = 0;
            var v_crotches = 0;
            var v_skins = 0;
            var m;
            var n;
            response = response.replace(/,/g,""); // strip commas so that values > 999 parse correctly
            if ((response.indexOf("Richard") >= 0))
            {
                // Boots
                m = response.match(/Richard has \<b\>\d*\<\/b\> pairs of charred hobo boots/);
                if (m == null)
                  m = response.match(/Richard has \<b\>\d*\<\/b\> pair of charred hobo boots/);
                if (m != null)
                {
                    n = m[0].match(/\d+/);
                    v_boots = parseInt(n[0]);
                }
                
                // Eyes
                m = response.match(/Richard has \<b\>\d*\<\/b\> pairs of frozen hobo eyes/);
                if (m == null)
                  m = response.match(/Richard has \<b\>\d*\<\/b\> pair of frozen hobo eyes/);
                if (m != null)
                {
                    n = m[0].match(/\d+/);
                    v_eyes = parseInt(n[0]);
                }
                
                // Guts
                m = response.match(/Richard has \<b\>\d*\<\/b\> pile/);
                if (m != null)
                {
                    n = m[0].match(/\d+/);
                    v_guts = parseInt(n[0]);
                }
                
                // Skulls
                m = response.match(/Richard has \<b\>\d*\<\/b\> creepy hobo skull/);
                if (m != null)
                {
                    n = m[0].match(/\d+/);
                    v_skulls = parseInt(n[0]);
                }
                
                // Crotches
                m = response.match(/Richard has \<b\>\d*\<\/b\> hobo crotch/);
                if (m != null)
                {
                    n = m[0].match(/\d+/);
                    v_crotches = parseInt(n[0]);
                }
                
                // Skins
                m = response.match(/Richard has \<b\>\d*\<\/b\> hobo skin/);
                if (m != null)
                {
                    n = m[0].match(/\d+/);
                    v_skins = parseInt(n[0]);
                }
            
                document.getElementById("scarehobos").innerHTML = '<div id="boots" style="width: 80px;text-align:center;color:red"><b>' + v_boots + '</b> boots</div>'+
                  '<div id="eyes" style="width: 80px;text-align:center;color:blue"><b>' + v_eyes + '</b> eyes</div>'+
                  '<div id="guts" style="width: 80px;text-align:center;color:green"><b>' + v_guts + '</b> guts</div>'+
                  '<div id="skulls" style="width: 80px;text-align:center;color:gray"><b>' + v_skulls + '</b> skulls</div>'+
                  '<div id="crotches" style="width: 80px;text-align:center;color:purple"><b>' + v_crotches + '</b> crotches</div>'+
                  '<div id="skins" style="width: 80px;text-align:center;color:black"><b>' + v_skins + '</b> skins</div>'+
                  '<input type="hidden" id="num_boots" value="' + v_boots + '">'+
                  '<input type="hidden" id="num_eyes" value="' + v_eyes + '">'+
                  '<input type="hidden" id="num_guts" value="' + v_guts + '">'+
                  '<input type="hidden" id="num_skulls" value="' + v_skulls + '">'+
                  '<input type="hidden" id="num_crotches" value="' + v_crotches + '">'+
                  '<input type="hidden" id="num_skins" value="' + v_skins + '">';


                // Scarehobo button
                var scarehoboButton = document.createElement("input");
                with(scarehoboButton)
                {
                      id = "scarehobobutton";
                      type = "button";
                      value = "Make Scarehobos";
                      style.cursor = "pointer";
                      className = "buttons";
                      scarehoboButton.addEventListener('click',function(evt) 
                      {
                          var quantity = parseInt(document.getElementById("qty").value);
                          
                          var parts = new Array(parseInt(document.getElementById("num_boots").value),
                                                parseInt(document.getElementById("num_eyes").value),
                                                parseInt(document.getElementById("num_guts").value),
                                                parseInt(document.getElementById("num_skulls").value),
                                                parseInt(document.getElementById("num_crotches").value),
                                                parseInt(document.getElementById("num_skins").value));
                          var maxscarehobos = parts.min();
                                                
                          
                          
                          if ( maxscarehobos >= quantity)
                          {
                              disabled = true;
                              value = "Creating...";
                              makeScarehobos();
                          }
                          else
                          {
                            alert("Not enough parts, can only make " + maxscarehobos +"!");
                          }
                      },false);
                }
                // Scarehobo qty input
                var scarehoboqty = document.createElement("input");
                with(scarehoboqty)
                {
                      id = "qty"
                      type = "text";
                      value = "1";
                      style.width = "25px";
                      className = "inputs";
                }
                document.getElementById("scarehoboz").appendChild(scarehoboqty);
                document.getElementById("scarehoboz").appendChild(scarehoboButton);


            }
            else
            {
              document.getElementById("scarehobos").innerHTML = "<font style='text-align:center;color:black'>Richard is unavailable</font>";
            }
            

        }
        
        
    );

}


function playerLink(character)
{
    var index = character.indexOf("#");
    var charName = character.substring(0,index-2).replace(/[" "]+/g, "&nbsp;");
    var charLink = character.substring(index+1,character.length-1);
    return ('&nbsp;<a href="/showplayer.php?who=' + charLink + '">' + charName + '</a>');
}


function getTotalPoints()
{
    for (var i=0; i < swr_chars.length; i++ )
    {
		var swrIndex = swr_char_total_name.indexOf(ptsArray[i][0]);
		var totalpts = ptsArray[i][1]+ptsArray[i][2]+ptsArray[i][3]+ptsArray[i][4]+ptsArray[i][5]+ptsArray[i][6]+ptsArray[i][7]+swr_char_total_pts[swrIndex];
        ptsArray[i][8] = totalpts;
        var totaladvs = advArray[i][1]+advArray[i][2]+advArray[i][3]+advArray[i][4]+advArray[i][5]+advArray[i][6]+advArray[i][7];
		ptsArray[i][9] = totaladvs;
    }

    ptsArray = sortArray(8,ptsArray);

    var totalArray = new Array(0,0,0,0,0,0,0,0,0);
    var dataTable = '<center>' +
                     '<table class="normal_table" width="100%">'+
                         '<tr onmouseover="style.cursor=\'pointer\';" onClick="toggleRow(\'totals1\');" class="normal_header">' +
                             '<td colspan="14" align="center">Points Totals </td>' +
                         '</tr>'+
                         '<tr>'+
                            '<td colspan="14" width="100%">'+
                            '<div id="totals1">'+
                                '<table class="normal_table" width="100%">'+
                                   '<tr align="center">' +
                                       '<td class="normal_total">Player</td>'+
                                       '<td class="sewer_total">Sewers</td>'+
                                       '<td class="normal_total">Town Square</td>'+
                                       '<td class="burn_total">Burnbarrel</td>'+
                                       '<td class="exp_total">Esplanade</td>'+
                                       '<td class="heap_total">The Heap</td>'+
                                       '<td class="burial_total">Burial Ground</td>'+
                                       '<td class="purple_total">Purple Light</td>'+
                                       '<td class="normal_total">Misc</td>' + 
                                       '<td class="normal_total">Total</td>' + 
                                   '</tr>';
    var counter = 0;

    for (var z=0; z < swr_chars.length; z++ )   // For each character
    {	
          
          if (ptsArray[z][9] != 0)
          {
			  
			  var shaded = "";
			  if (isEven(counter))
				shaded = "";
			  else
				shaded = "_shaded";
			  counter++;
			  
			  
			 
			  var swrIndex = swr_char_total_name.indexOf(ptsArray[z][0]);
			  dataTable += '<tr>' ;
			  
					  //     '<td style="text-align: left;" class="normal' + shaded + '">' + playerLink(ptsArray[z][0]) + '</td>'+
			  
			  if (ptsArray[z][9] < loot_min_advs )
			  {
				dataTable += '<td style="text-align: left;" class="normal' + shaded + '">' + playerLink(ptsArray[z][0]) + ' <font color="red"><b>(X)</b></font></td>\n';
			  }
			  else
			  {
				dataTable += '<td style="text-align: left;" class="normal' + shaded + '">' + playerLink(ptsArray[z][0]) + '</td>\n';
			  }
			  
			  dataTable += '<td class="sewer' + shaded + '">' + swr_char_total_pts[swrIndex] + '</td>'+
						   '<td class="normal' + shaded + '">' + ptsArray[z][1] + '</td>'+
						   '<td class="burn' + shaded + '">' + ptsArray[z][2] + '</td>'+
						   '<td class="exp' + shaded + '">' + ptsArray[z][3] + '</td>'+
						   '<td class="heap' + shaded + '">' + ptsArray[z][4] + '</td>'+
						   '<td class="burial' + shaded + '">' + ptsArray[z][5] + '</td>'+
						   '<td class="purple' + shaded + '">' + ptsArray[z][6] + '</td>'+
						   '<td class="normal' + shaded + '">' + ptsArray[z][7] + '</td>'+
						   '<td class="normal' + shaded + '">' + ptsArray[z][8] + '</td>'+
						   '</tr>';
	 
			  totalArray[0] += swr_char_total_pts[swrIndex]
			  totalArray[1] += ptsArray[z][1];
			  totalArray[2] += ptsArray[z][2];
			  totalArray[3] += ptsArray[z][3];
			  totalArray[4] += ptsArray[z][4];
			  totalArray[5] += ptsArray[z][5];
			  totalArray[6] += ptsArray[z][6];
			  totalArray[7] += ptsArray[z][7];
			  totalArray[8] += ptsArray[z][8];
        }
    }
      dataTable += '<tr>'+
                   '<td class="normal_total">Total</td>'+
                   '<td class="sewer_total">' + totalArray[0] + '</td>'+
                   '<td class="normal_total">' + totalArray[1] + '</td>'+
                   '<td class="burn_total">' + totalArray[2] + '</td>'+
                   '<td class="exp_total">' + totalArray[3] + '</td>'+
                   '<td class="heap_total">' + totalArray[4] + '</td>'+
                   '<td class="burial_total">' + totalArray[5] + '</td>'+
                   '<td class="purple_total">' + totalArray[6] + '</td>'+
                   '<td class="normal_total">' + totalArray[7] + '</td>'+
                   '<td class="normal_total">' + totalArray[8] + '</td>'+
                   '</tr>';
    
    dataTable += '</div></td></tr></table></tr></table></center><br>';  
    return dataTable;
}


function getTotalAdventures()
{
    for (var i=0; i < swr_chars.length; i++ )
    {
        var total = advArray[i][1]+advArray[i][2]+advArray[i][3]+advArray[i][4]+advArray[i][5]+advArray[i][6]+advArray[i][7];
        advArray[i][8] = total;
    }

    advArray = sortArray(8,advArray);

    var totalArray = new Array(0,0,0,0,0,0,0,0,0);
    
    var table_header = "Hobopolis Non-sewer";
    if (dungeon_header != "")
      table_header = dungeon_header;
    
    var dataTable = '<center>' +
                     '<table class="normal_table" width="100%">'+
                         '<tr onmouseover="style.cursor=\'pointer\';" onClick="toggleRow(\'totals1\');" class="normal_header">' +
                             '<td colspan="14" align="center">' + table_header + ' Totals <font size="1">(Total with sewer in parenthesis)</font></td>' +
                         '</tr>'+
                         '<tr>'+
                            '<td colspan="14" width="100%">'+
                            '<div id="totals1">'+
                                '<table class="normal_table" width="100%">'+
                                   '<tr align="center">' +
                                       '<td class="normal_total">Player</td>'+
                                       '<td class="normal_total">Town Square</td>'+
                                       '<td class="burn_total">Burnbarrel</td>'+
                                       '<td class="exp_total">Esplanade</td>'+
                                       '<td class="heap_total">The Heap</td>'+
                                       '<td class="burial_total">Burial Ground</td>'+
                                       '<td class="purple_total">Purple Light</td>'+
                                       '<td class="normal_total">Misc</td>' + 
                                       '<td class="normal_total">Total</td>' + 
                                   '</tr>';
    var counter = 0;

    for (var z=0; z < swr_chars.length; z++ )   // For each character
    {
        //if(advArray[z][8] > 0)
        //{
          var shaded = "";
          if (isEven(counter))
            shaded = "";
          else
            shaded = "_shaded";
          counter++;
         
         
          var swrIndex = swr_char_total_name.indexOf(advArray[z][0]);
          dataTable += '<tr>'+
                       '<td style="text-align: left;" class="normal' + shaded + '">' + playerLink(advArray[z][0]) + '</td>'+
                       '<td class="normal' + shaded + '">' + advArray[z][1] + '</td>'+
                       '<td class="burn' + shaded + '">' + advArray[z][2] + '</td>'+
                       '<td class="exp' + shaded + '">' + advArray[z][3] + '</td>'+
                       '<td class="heap' + shaded + '">' + advArray[z][4] + '</td>'+
                       '<td class="burial' + shaded + '">' + advArray[z][5] + '</td>'+
                       '<td class="purple' + shaded + '">' + advArray[z][6] + '</td>'+
                       '<td class="normal' + shaded + '">' + advArray[z][7] + '</td>'+
                       '<td class="normal' + shaded + '">' + advArray[z][8] + '&nbsp;&nbsp;(' + (parseInt(advArray[z][8]) + parseInt(swr_char_total_num[swrIndex])) + ')</td>'+
                       '</tr>';
 
          totalArray[0] += advArray[z][1];
          totalArray[1] += advArray[z][2];
          totalArray[2] += advArray[z][3];
          totalArray[3] += advArray[z][4];
          totalArray[4] += advArray[z][5];
          totalArray[5] += advArray[z][6];
          totalArray[6] += advArray[z][7];
          totalArray[7] += advArray[z][8];
          totalArray[8] += (parseInt(advArray[z][8]) + parseInt(swr_char_total_num[swrIndex]));
        //}
    }
      dataTable += '<tr>'+
                   '<td class="normal_total">Total</td>'+
                   '<td class="normal_total">' + totalArray[0] + '</td>'+
                   '<td class="burn_total">' + totalArray[1] + '</td>'+
                   '<td class="exp_total">' + totalArray[2] + '</td>'+
                   '<td class="heap_total">' + totalArray[3] + '</td>'+
                   '<td class="burial_total">' + totalArray[4] + '</td>'+
                   '<td class="purple_total">' + totalArray[5] + '</td>'+
                   '<td class="normal_total">' + totalArray[6] + '</td>'+
                   '<td class="normal_total">' + totalArray[7] + '&nbsp;&nbsp;(' + totalArray[8] + ')</td>'+
                   '</tr>';
    
    dataTable += '</div></td></tr></table></tr></table></center><br>';  
    return dataTable;
}

function zeroArray(size)
{
    var returnArray = new Array();
    for (var i=0; i < size; i++ )
    {
        returnArray[i] = 0;
    }
    return returnArray;
}

// Return CSS for given index in lootSourceArray
function getcss(lootIndex, dungeon)
{
    if (dungeon == "Hobopolis")
    {
        var splitLoot = lootSourceArray[lootIndex].split("|");
        var loot = splitLoot[0];
        var css = "";
        if (loot.indexOf("Ol' Scratch's ") >= 0)
          css = "burn";
        else if (loot.indexOf("Frosty's ") >= 0)
          css = "exp";
        else if (loot.indexOf("Oscus's ") >= 0)
          css = "heap";
        else if (loot.indexOf("Zombo's ") >= 0)
          css = "burial";
        else if (loot.indexOf("Chester's ") >= 0)
          css = "purple";
        else if (loot.indexOf("Hodgman's ") >= 0)
          css = "normal";
      }
      else
        css = "slime";

        return css;
}

// Bubble sort, because creating a tree or some other more awesome structure in javascript feels like wasting time
function sortArray(columnIndex, theArray)
{
    var tempArray;
    for (var i=0; i < theArray.length; i++ )
    {
        for (var j=0; j < theArray.length-1; j++ )
        {
            if (theArray[j][columnIndex] < theArray[j+1][columnIndex])
            {
                // Swap
                tempArray = theArray[j+1];
                theArray[j+1] = theArray[j];
                theArray[j] = tempArray;
            }
        }
    }
    return theArray;
}

function getSection(section, headerArray, pointArray, css, dataArray, totalArray, messageArray, bossNum)
{
    // charArray - Array of char names in no order
    // dataArray - passed in as a matrix of data
    
    var dataTable = '<center>' +
                     '<table class="' + css + '_table" width="100%">'+
                         '<tr onmouseover="style.cursor=\'pointer\';" onClick="toggleRow(\'' + css + '1\');" class="' + css + '_header">' +
                             '<td colspan="14" align="center">' + section + '</td>' +
                         '</tr>'+
                         '<tr>'+
                            '<td colspan="14" width="100%">'+
                            '<div id="' + css + '1">'+
                                '<table class="' + css + '_table" width="100%">'+
                                   '<tr align="center" class="' + css + '_shaded">' +
                                       '<td>Player</td>';
    for (var i=0; i < headerArray.length; i++ )
        dataTable +=         '<td>' + headerArray[i] + '</td>';
                         '</tr>';
                         
	dataTable +='<tr align="center" class="' + css + '_shaded">' +
					'<td></td>';
    for (var i=0; i < pointArray.length; i++ )
        dataTable +=         '<td>' + pointArray[i] + '</td>';
                         '</tr>';
    
    for (var z=0; z < dataArray.length; z++ )
    {
        var total = 0;
        
        if (isEven(z))
          dataTable += '<tr class="' + css + '">\n';
        else
          dataTable += '<tr class="' + css + '_shaded">\n';
        
        dataTable += '<td style="text-align: left;">' + playerLink(dataArray[z][0]) + '</td>\n';
        
        for (var y=1; y < messageArray.length+2; y++ )
        {
            total += dataArray[z][y];
            dataTable += '<td>' + dataArray[z][y] + '</td>\n';
            totalArray[y] += dataArray[z][y];
        }
        
        //totalArray[totalArray.length-1] += total;
        dataTable += '</tr>\n';

        // Add player total points to global points total array
        if (swr_chars.indexOf(dataArray[z][0]) >= 0)
        {
            ptsArray[swr_chars.indexOf(dataArray[z][0])][bossNum+1] = dataArray[z][messageArray.length+1];
        }
        // Add player total advs to global adventure total array
        if (swr_chars.indexOf(dataArray[z][0]) >= 0)
        {
            advArray[swr_chars.indexOf(dataArray[z][0])][bossNum+1] = dataArray[z][messageArray.length];
        }

    }
    // Display totals
    dataTable += '<tr class="' + css + '_total">\n';
    dataTable += '<td>Total</td>\n';
    
    for (var v=1; v < totalArray.length; v++ )
    {
        dataTable += '<td>' + totalArray[v] + '</td>\n';
    }
    dataTable += '</tr></table></div></td></tr></table></center><br>';  
    return dataTable;
}


function getSewer()
{
    var sewerTable = '<center>' +
                     '<table class="sewer_table" width="100%">'+
                         '<tr onmouseover="style.cursor=\'pointer\';" onClick="toggleRow(\'sewer2\');" class="sewer_header">' +
                             '<td colspan="14" align="center">Sewer</td>' +
                         '</tr>'+
                         '<tr>'+
                            '<td colspan="14" width="100%">'+
                            '<div id="sewer2">'+
                                '<table class="sewer_table" width="100%">'+
                                   '<tr align="center" class="sewer_shaded">' +
                                       '<td>Player</td>'+
                                       '<td>Sewer<br>Gators</td>' + 
                                       '<td>C.H.U.M.s</td>' + 
                                       '<td>Zombie<br>Goldfish</td>' + 
                                       '<td>Defeats</td>' + 
                                       '<td>Explored</td>' + 
                                       '<td>Sewer<br>Grates</td>' + 
                                       '<td>Gnawed<br>Cage</td>' + 
                                       '<td>Stared<br>at a Cage</td>' + 
                                       '<td>Lowered<br>Water</td>' + 
                                       '<td>Rescues</td>' + 
                                       '<td>Total Advs</td>' + 
                                       '<td>Total Points</td>' + 
                                   '</tr>' +
                                   '<tr align="center" class="sewer_shaded">' +
                                       '<td></td>'+
                                       '<td>('+swr_Gator+' pt)</td>' + 
                                       '<td>('+swr_CHUM+' pt)</td>' + 
                                       '<td>('+swr_Goldfish+' pt)</td>' + 
                                       '<td>('+swr_Defeats+' pt)</td>' + 
                                       '<td>('+swr_explored+' pt)</td>' + 
                                       '<td>('+swr_Grate+' pt)</td>' + 
                                       '<td>('+swr_Gnawed+' pt)</td>' + 
                                       '<td>('+swr_Stared+' pt)</td>' + 
                                       '<td>('+swr_Water+' pt)</td>' + 
                                       '<td>('+swr_Rescue+' pt)</td>' + 
                                       '<td></td>' + 
                                       '<td></td>' + 
                                   '</tr>';
    var counter_pts = 0;
    for (var z=0; z < swr_chars.length; z++ )  // For each character
    {
        var counter = 0;
        if (isEven(z))
          sewerTable += '<tr class="sewer">\n';
        else
          sewerTable += '<tr class="sewer_shaded">\n';
        
        if (swr_data[z][1] > 0 )
        {
          sewerTable += '<td style="text-align: left;">' + playerLink(swr_data[z][0]) + ' <font color="green"><b>(Clear)</b></font></td>\n';
          counter++;  // Add one to total for the clear adventure
        }
        else
          sewerTable += '<td style="text-align: left;">' + playerLink(swr_data[z][0]) + '</td>\n';
        
        for (var y=0; y < swr.length-2; y++ )
        {
            counter += swr_data[z][y+2];
            sewerTable += '<td>' + swr_data[z][y+2] + '</td>\n';
            swr_total[y+2] += swr_data[z][y+2];
        }
        swr_total[swr_total.length-1] += counter;
        
        
        
        // Make global sewer total table to be used later for total table
        swr_char_total_name[z] = swr_data[z][0];
        swr_char_total_num[z] = counter;
        swr_char_total_pts[z] = swr_data[z][swr.length+1];
        
        sewerTable += '<td>' + counter + '</td>\n';
        
        // Points
        sewerTable += '<td>' + swr_data[z][swr.length+1] + '</td>\n';
        counter_pts += swr_data[z][swr_data[z].length-1];
        
        sewerTable += '</tr>\n';

    }
    // Display totals
    sewerTable += '<tr class="sewer_total">\n';
    sewerTable += '<td>Total</td>\n';
    for (var v=2; v < swr_total.length-2; v++ )
    {
        sewerTable += '<td>' + swr_total[v] + '</td>\n';
    }
    sewerTable += '<td>' + swr_total[swr_total.length-1] + '</td>\n';
    sewerTable += '<td>' + counter_pts + '</td>\n';
    sewerTable += '</div></td></tr></table></tr></table></center><br>'; 

    return sewerTable;
}

function getSlime()
{
    var table_header = "The Slime Tube";
    if (dungeon_header != "")
      table_header = dungeon_header;

    var slimeTable = '<center>' +
                     '<table class="slime_table" width="100%">'+
                         '<tr onmouseover="style.cursor=\'pointer\';" onClick="toggleRow(\'slime2\');" class="slime_header">'+
                             '<td colspan="14" align="center">' + table_header + '</td>' +
                         '</tr>'+
                         '<tr>'+
                            '<td colspan="14" width="100%">'+
                            '<div id="slime2">'+
                                '<table class="slime_table" width="100%">'+
                                   '<tr align="center" class="slime_shaded">' +
                                       '<td>Player</td>'+
                                       '<td>Slimes Killed</td>'+
                                       '<td>Player Defeated</td>'+
                                       '<td>Tickled</td>'+
                                       '<td>Squeezed</td>'+
                                       '<td>Mother Slime Killed</td>'+
                                       '<td>Total Advs</td>' + 
                                       '<td>Total Points</td>' + 
                                   '</tr>' +
                                   '<tr align="center" class="slime_shaded">' +
                                       '<td></td>'+ 
                                       '<td>('+slime_kill+' pt)</td>' + 
                                       '<td>('+slime_defeat+' pt)</td>' + 
                                       '<td>('+slime_tickled+' pt)</td>' + 
                                       '<td>('+slime_squeezed+' pt)</td>' + 
                                       '<td>('+slime_Mother+' pt)</td>' + 
                                       '<td></td>' + 
                                       '<td></td>' + 
                                   '</tr>';
    var counter_pts = 0;
    for (var z=0; z < slime_chars.length; z++ )  // For each character
    {
        var counter = 0;
        if (isEven(z))
          slimeTable += '<tr class="slime">\n';
        else
          slimeTable += '<tr class="slime_shaded">\n';
        
          slimeTable += '<td style="text-align: left;">' + playerLink(slime_data[z][0]) + '</td>\n';
        
        for (var y=1; y < slime.length; y++ )
        {
            counter += slime_data[z][y];
            slimeTable += '<td>' + slime_data[z][y] + '</td>\n';
            slime_total[y] += slime_data[z][y];
        }
        slime_total[slime_total.length-1] += counter;
        
        slimeTable += '<td>' + counter + '</td>\n';
        
        // Points
        slimeTable += '<td>' + slime_data[z][slime.length+1] + '</td>\n';
        counter_pts += slime_data[z][slime_data[z].length-1];
        
        slimeTable += '</tr>\n';


    }
    // Display totals
    slimeTable += '<tr class="slime_total">\n';
    slimeTable += '<td>Total</td>\n';
    for (var v=1; v < slime_total.length; v++ )
    {
        slimeTable += '<td>' + slime_total[v] + '</td>\n';
    }
    
    slimeTable += '<td>' + counter_pts + '</td>\n';
    slimeTable += '</div></td></tr></table></tr></table></center><br>'; 

    return slimeTable;
}

// Function for non sewer sections of hobopolis
function parseSection(section, adv, adv_clan, adv_data, charArray, dungeon)
{
    // Initialize adv_data to a 2d array of zeros
    for (var h=0; h < charArray.length; h++ )               // For each character in a section
    {
      adv_data[h] = new Array();                            // Add a new blank array
      adv_data[h][0] = charArray[h];                        // Make the first element in the blank array the character
      for (var g=1; g < adv.length+2; g++ )                 // For each element in the array per character
      {
          adv_data[h][g] = 0;                               // Initialize the spot to zero
      }
    }

    // Need to not parse current log only while in past runs
    var pageData = document.body.innerHTML;
    if (dungeon_type != "")  // Previous Run
    {
        pageData = stripCurrent(pageData);
    }
    else // Current Run
    {
        pageData = getDungeonData(pageData,dungeon);
    }
    
    var startIndex = pageData.indexOf("<b>" + section + "</b>");
    if (startIndex < 0 )
      return false;
    var endIndex = pageData.indexOf("</blockquote>",startIndex);
    var sectionData = pageData.substring(startIndex+19+section.length,endIndex);

    var dataArray = sectionData.split("<br>");

    for (var j=0; j < dataArray.length; j++ )  // Loop through each line entry
    {
        var data = dataArray[j];
        var character = getPlayer(data);
        var index = charArray.indexOf(character); 
        if (index < 0)
          break;
        data = data.replace(character,"");  // Prevents people with ambiguous names from messing up string parsing
        var turns = getTurns(data);
        for (var x=0; x < adv.length+1; x++ )  // Loop through all possible messages
        {
            // Boss save
            if (data.indexOf("defeated  Ol' Scratch") >= 0)
              bosses[1] = character;
            else if (data.indexOf("defeated  Frosty") >= 0)
              bosses[2] = character;
            else if (data.indexOf("defeated  Oscus") >= 0)
              bosses[3] = character;
            else if (data.indexOf("defeated  Zombo") >= 0)
              bosses[4] = character;
            else if (data.indexOf("defeated  Chester") >= 0)
              bosses[5] = character;
            else if (data.indexOf("defeated  Hodgman") >= 0)
              bosses[0] = character;
            else if (data.indexOf("defeated  Mother Slime") >= 0)
              bosses[6] = character;
            if (data.indexOf(adv[x]) >= 0) // If current message matches line currently being parsed
            {
				adv_data[index][x+1] += turns;  // Add current message turns to total in source array
                adv_data[index][adv.length+1] += turns*adv_clan[x] ;// Add current message clan points to total in source array
            }
        }
    }
    adv_data = sortArray(adv.length+1,adv_data);
    return true;
}



// This function returns the array of unique character names and IDs of those who have adventured in the dungeon section.
function setupCharacters(section, dungeon)
{
    var charArray = new Array();
    var pageData = "";
    if (dungeon_type != "")
        pageData = stripCurrent(document.body.innerHTML);
    else
        pageData = getDungeonData(document.body.innerHTML,dungeon);
    var startIndex = pageData.indexOf("<b>" + section + "</b>");
    if (startIndex >=0 )
    {
        var endIndex = pageData.indexOf("</blockquote>",startIndex);
        var sectionData = pageData.substring(startIndex+19+section.length,endIndex);
        var dataArray = sectionData.split("<br>");
    
        for (var j=0; j < dataArray.length; j++ )  // Cycle through each line entry
        {
          var character = getPlayer(dataArray[j]);
    
          if (character != "" && charArray.indexOf(character) < 0) 
            charArray[charArray.length] = character;
        }
    }
    return charArray;
}

// Function that returns only the string of page data for the dungeon parameter
function getDungeonData(pageData, dungeon)
{
    var startIndex = pageData.indexOf("<b>" + dungeon + ":</b>");
    if (startIndex >=0 )
    {
        var endIndex = pageData.indexOf("</table>",startIndex);
        pageData = pageData.substring(startIndex,endIndex+8);
    }
    return pageData;
}



// ----------------------------------------------------------------
// FUNCTION getPlayer - Parses theString and looks for text in the format of "Player (#Number)" and returns the text
// ----------------------------------------------------------------
function getPlayer(theString)
{
      var player = theString.substring(0,theString.indexOf(") ")+1).replace("<b>","").replace("</b>","");
      return player;
}


// ----------------------------------------------------------------
// FUNCTION getTurns - Parses theString and looks for text in the format of "(X turn" and returns X
// ----------------------------------------------------------------
function getTurns(theString)
{
    var returnVal = 0;
    if (theString != null)
    {
      var m = theString.match(/\(\d* turn/);
      if (m != null)
      {
        var n = m[0].match(/\d{1,4}/);
        returnVal = parseInt(n[0]);
      }
    }
    return returnVal;
}


// ----------------------------------------------------------------
// FUNCTION isEven - Determines if num is even, returns true if it is
// ----------------------------------------------------------------
function isEven(num) 
{
  var dnum = (num / 2);
  var inum = (Math.round(dnum));
  if (inum == dnum) 
    return true;
  return false;
}



// ----------------------------------------------------------------
// FUNCTION adScript - Adds scriptText to the current page's header
// ----------------------------------------------------------------
function addScript(scriptText){
		var head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		var addScript = document.createElement("script");
		addScript.innerHTML = scriptText;
		head.appendChild(addScript);
}

function sortfunction(a, b)
{
    a = a.toLowerCase(); 
    b = b.toLowerCase();
    if (a>b) return 1;
    if (a <b) return -1;
    return 0; 
}
