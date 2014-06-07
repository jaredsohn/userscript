// ==UserScript==
// @name           Haunted House Manager
// @namespace      http://userscripts.org/users/192956
// @description    Hack of Dr3v1's Raid Log Manager for the Haunted Sorority House
// @include        *kingdomofloathing.com/main.php*
// @include        *kingdomofloathing.com/topmenu.php*
// @include        *kingdomofloathing.com/clan_raidlogs.php*
// @include        *kingdomofloathing.com/clan_basement.php*
// @include        *kingdomofloathing.com/clan_hobopolis.php*
// @include        *kingdomofloathing.com/choice.php*
// @include        *kingdomofloathing.com/compactmenu.php*
// @include        *127.0.0.1*/main.php*
// @include        *127.0.0.1*/topmenu.php*
// @include        *127.0.0.1*/clan_raidlogs.php*
// @include        *127.0.0.1*/clan_basement.php*
// @include        *127.0.0.1*/clan_hobopolis.php*
// @include        *127.0.0.1*/choice.php*
// @include        *127.0.0.1*/compactmenu.php*
// @exclude        http://images.kingdomofloathing.com/*
// @exclude        http://forums.kingdomofloathing.com/*
// ==/UserScript==
// --------------------------------------------------------------------------------------
// Modified Dr3v1's Raid Log Manager
// --------------------------------------------------------------------------------------


// minimum advs spent in non-sewer areas to be eligible for loot
var loot_min_advs = 0 ;

//Haunted House:
var hh_kill = 1 ;
var hh_death = 0 ;
var hh_ghost = 2 ;
var hh_skeleton = 2 ;
var hh_vampire = 2 ;
var hh_werewolf = 2 ;
var hh_zombie = 2 ;

// - END  -
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Picklish's VERSION CHECKER

// - BEGIN MANUAL SECTION -

var scriptURL = "http://userscripts.org/scripts/source/81554.user.js";
var scriptName = "Toy Box Point Totaller";

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
                    message = "Right click <a href='" + scriptURL + "' TARGET='_blank'>here</a> and select 'Install User 

Script' for Version " + webVer + ".";
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
    span.innerHTML = "<table style='border: 1px solid " + color + "; margin-bottom: 4px;' width=95% cellpadding=1 

cellspacing=0><tr><td bgcolor=" + color + "><font color=white size=-2><b>" + scriptName + "</b> " + currentVersion + 

":</font></td></tr>" + resourceMessage + "</table>";

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
        .button_normal    { font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 12px; font-style: normal; 

color: black; border: 1px solid #17037D; background-color: #E3E2EA; font-weight: bold; height: 25px}
        .button_small    { font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 10px; font-style: normal; 

color: black; border: 1px solid #17037D; background-color: #E3E2EA; font-weight: bold; height: 14px}
        ]]></r>).toString();






var globalCount = {dungeon:0};   

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
        var dungeonIndex = document.body.innerHTML.indexOf("<b>Results: run");
        if (dungeonIndex > 0 )
          dungeon_type = "Haunted Sorority House";
    }
        
        

        addScript('function toggleRow(theElement) { \n'+
        '    var div = document.getElementById(theElement);\n'+
        '    if (div.style.display=="none")\n'+
        '        div.style.display = "block";\n'+
        '    else\n'+
        '        div.style.display = "none";\n'+
        '}');
	
	GM_addStyle(css);

    var page = "";

    if (dungeon_type != "The Slime Tube")
    {

        // Sewer data and initialization
		var swr = new Array("made it through the sewer","defeated a sewer gator","defeated a C. H. U. 

M.","defeated a giant zombie goldfish","was defeated by","explored","sewer grate","gnawed through","empty cage","lowered 

the water level","rescued","");
		var swr_clan = new Array();
		var swr_chars = setupCharacters("Sewers:", "Hobopolis");
		var swr_data = new Array();
		var swr_total = zeroArray(swr.length+2);
		var swr_char_total_name = new Array();  // What a freaking hack
		var swr_char_total_num = new Array();
		var swr_char_total_pts = new Array();
		
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
        
        // Haunted House data and initialization
		var twn_headers = new Array("Kills","Deaths","Ghost Trap","Skeleton clear","Vampire clear","Werewolf 

clear","Zombie clear","Total Advs","Total Points");
		var twn_points = new Array("("+hh_kill+" pt)","("+hh_death+" pt)","("+hh_ghost+" pt)","("+hh_skeleton+" 

pt)","("+hh_vampire+" pt)","("+hh_werewolf+" pt)","("+hh_zombie+" pt)","","");
		var twn = new Array("defeated  sexy sorority","was defeated by","trapped some ghosts","took out some 

skeletons","slew some vampires","took care of some werewolves","took out some zombies","");
		var twn_clan = new Array(hh_kill,hh_death,hh_ghost,hh_skeleton,hh_vampire,hh_werewolf,hh_zombie,0);
		var twn_chars = setupCharacters("Miscellaneous", "The Haunted Sorority House");
		var twn_data = new Array();
		var twn_total = zeroArray(twn.length+2);
		if (parseSection("Miscellaneous", twn, twn_clan, twn_data, twn_chars, "The Haunted Sorority House"))
		{ // correction if the numbers of advs at Richard's is > nb_richard
		  
		  twn_data = sortArray(twn.length+1,twn_data);
		  
		  page += getSection("Haunted Sorority House", twn_headers, twn_points, "normal", twn_data, twn_total, 

twn,0);
		}
			 

             
        }    



    // Return output
    var oldPageData = document.body.innerHTML;
    document.body.innerHTML = page + oldPageData;
    
    /* ------------------------------------------ */


    if ((dungeon_type != "The Slime Tube"))
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
              var pageText = response.substring(response.indexOf(dungeon),response.length);  // This is the only 

difference from the text below for past runs
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
                          var character = line.substring(line.indexOf("</b> to ")+8,line.indexOf(")",line.indexOf("</b> 

to ")+8)+1);
                          if (loot == "Wand of Oscus")
                            loot = "Oscus's Wand";
                          if ((character != "") && (loot != ""))
                            allLoot[allLoot.length] = character +"|"+loot;
                      }
                  }
              }
              if (globalCount.dungeon == (logArray.length+1))  // If all calls to previous logs are complete (man I hope 

this works)
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
                      var character = line.substring(line.indexOf("</b> to ")+8,line.indexOf(")",line.indexOf("</b> to 

")+8)+1);
                      if (loot == "Wand of Oscus")
                        loot = "Oscus's Wand";
                      if ((character != "") && (loot != ""))
                          allLoot[allLoot.length] = character +"|"+loot;
                      //alert(line + "\n" + character + " - " + loot);
                  }
              }
               if (globalCount.dungeon == (logArray.length+1))  // If all calls to previous logs are complete (man I hope 

this works)
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
        
        dataTable += '<td class="' + css + '_loot_shaded"><img width="14" height="14" src="'+ image +'" 

onMouseOver="style.cursor=\'pointer\'" onClick="descitem(\'' + desc + '\')" title="'+ loot +'"></td>';
    }
    dataTable += '</tr>';                 
    return dataTable;
}


function createLootTable(lootArray, dungeon)
{
    // charArray = Array of unique and alphabetized characters
    // dropArray = Array of arrays.  Stored arrays contain an element for each possible boss drop, and a counter for 

each.
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
          if ((option_loot == "OFF") || (swr_chars.indexOf(character) >= 0))  // If we want to show all characters OR the 

current char is in the sewer table
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
                             '<tr class="normal_header" onmouseover="style.cursor=\'pointer\';" onClick="toggleRow

(\'loot\');" >' +
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
                                               '<td rowspan="2" class="normal_total" style="font-size: 9px;line-

height:9px;">T<br>o<br>t</td>'+
                                            '</tr>';
    }
    else
    {
        dataTable += '<table width="100%" class="normal_table">'+
                             '<tr class="normal_header" onmouseover="style.cursor=\'pointer\';" onClick="toggleRow

(\'loot2\');" >' +
                                 '<td align="center">Slime Tube Loot Table</td>' +
                             '</tr>'+
                             '<tr>'+
                                '<td>'+
                                    '<div id="loot2">'+
                                        '<table class="normal_table">'+
                                           '<tr align="center">' +
                                               '<td class="normal_header">&nbsp;</td>'+
                                               '<td colspan="8" class="slime_header">Mother Slime</td>'+
                                               '<td rowspan="2" class="normal_total" style="font-size: 9px;line-

height:9px;">Total</td>'+
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
                if (((j>=0) && (j<=2)) || ((j>=6) && (j<=8)) || ((j>=12) && (j<=14)) || ((j>=18) && (j<=20)) || ((j>=24) 

&& (j<=26)) || ((j>=30) && (j<=32))   )
                    shaded = "_outfit";
                else
                    shaded = row_shaded;
            }
            if (dropArray[i][j] == 0)
                dataTable += '<td id="' + character + j + '" class="' + getcss(j, dungeon) + "_loot" + shaded + 

'">&nbsp;</td>';
            else
            {
                charTotal+=dropArray[i][j];
                dataTable += '<td onmouseover="style.cursor=\'pointer\';" title="' + character + ' - ' + 

lootOnlySourceArray[j] + '" id="' + character + j + '" class="' + getcss(j, dungeon) + "_loot" + shaded + '">' + 

dropArray[i][j] + '</td>';
            }
        }
        dataTable += '<td onmouseover="style.cursor=\'pointer\';" title="' + character + ' total" 

class="normal_loot_shaded">' + charTotal + '</td>';
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
              document.getElementById("lootTable").innerHTML = "No Previous Runs<br>or you do not have access<br>to the 

clan basement currently";
            else
            {
              //displayArray(logArray);
              getLoot(logArray, dungeon);
            }
        });
}


Array.prototype.min = function(){
    return Math.min.apply( Math, this );
};


function playerLink(character)
{
    var index = character.indexOf("#");
    var charName = character.substring(0,index-2).replace(/[" "]+/g, "&nbsp;");
    var charLink = character.substring(index+1,character.length-1);
    return ('&nbsp;<a href="/showplayer.php?who=' + charLink + '">' + charName + '</a>');
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
                         '<tr onmouseover="style.cursor=\'pointer\';" onClick="toggleRow(\'' + css + '1\');" class="' + 

css + '_header">' +
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
/*
        // Add player total points to global points total array
        if (swr_chars.indexOf(dataArray[z][0]) >= 0)
        {
            ptsArray[swr_chars.indexOf(dataArray[z][0])][bossNum+1] = dataArray[z][messageArray.length+1];
        }
        // Add player total advs to global adventure total array
        if (swr_chars.indexOf(dataArray[z][0]) >= 0)
        {
            advArray[swr_chars.indexOf(dataArray[z][0])][bossNum+1] = dataArray[z][messageArray.length];
        }*/

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
            if (data.indexOf(adv[x]) >= 0) // If current message matches line currently being parsed
            {
				adv_data[index][x+1] += turns;  // Add current message turns to total in source array
                adv_data[index][adv.length+1] += turns*adv_clan[x] ;// Add current message clan points to total in source 

array
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
