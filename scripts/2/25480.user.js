// Copyright (c) 2008, Jeffrey Hoyt
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
// :mode=javascript:folding=indent:
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.7 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          NW Map
// @namespace     http://nwmap.freehostia.com
// @description   Script to map zones in NexusWar
// @include       http://*nexuswar.com/map*
// @exclude
// ==/UserScript==

// --------------------------------------------------------------------
// Define functions first
// --------------------------------------------------------------------

// @include       file:///home/jchoyt/nw*


/*
 * get the alt name making the report - returns id|name
 */
function getCharacter()
{
    // get the content of the location description
    var LocDesc = document.getElementById('character');
    if(LocDesc==null) return;
    var html = LocDesc.innerHTML;
    //get character ID
    var charId = html.match(/characterID=[\d]*/);
    if (charId===null)
    {
        return null;
    }
    var charName = html.match(/You are .*?<\/a>/); //The nasty list in [] is for a URL =>  You are <a href="/characters/view.do?characterID=100093">Pufta</a>
    // alert(charName);
    if (charName===null)
    {
        return null;
    }
    charName = charName[0].match(/>.*?<\/a>/);
    charName = charName[0].substring(1, charName[0].length - 4);

    var factionName =  html.match(/Faction:[\w\"=\/\? ><\.:]*/);   //The nasty list in [] is for a URL =>  Faction:</span> <a href="/factions/view.do?factionID=10">The Faithful</a>
    // alert("Faction name: " + factionName);
    if (factionName===null)
    {
        factionName = "none";
    }
    else
    {
        factionName = factionName[0].match(/\">[\w ]*<\/a/);
        factionName = factionName[0].substring(2, factionName[0].length - 3);
    }
    // alert(charId[0].substring(12) + "|" +  charName + "|" + factionName);
    return charId[0].substring(12) + "|" +  charName + "|" + factionName;
}

/*
 *  returns an array of 4 strings - 0->the location type, 1->the xcoord, 2->the ycoord, and 3 -> plane
 */
function getLocationAll()
{
    var locationInfo = new Array();
    // get the content of the location description
    var LocDesc = document.getElementById("locdesc");
    if(LocDesc == null)
    {
        // alert("LocDesc(top) is null");
        return;
    }
    var html = LocDesc.innerHTML;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // alert(html);
    //Grab the string with the building type
    var locationTypeArray = html.match(/\(A[n]? <a target=\"_new\" href=\"http:\/\/wiki.nexuswar.com\/index.php\/.*?\">.*?</);
    // alert(locationTypeArray);
    //var locationTypeArray = html.match(/>[\w]*<\)/);
    locationTypeSubstring = locationTypeArray[0].match(/>.*?</);
    locationType = locationTypeSubstring[0].substring(1,locationTypeSubstring[0].length-1);

    LocDesc = document.getElementById("actions");
    if(LocDesc == null)
    {
        alert("LocDesc is null");
        return;
    }
    html = LocDesc.innerHTML;
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Grab the string with the rest of the location info in it.
    //extract the neighborhood
    var neighborhoodArray = html.match(/\<a target=\"_new\" href=\"http:\/\/wiki.nexuswar.com\/index.php\/.*?\">.*?</);
    // alert(locationTypeArray);
    //var locationTypeArray = html.match(/>[\w]*<\)/);
    neighborhoodSubstring = neighborhoodArray[0].match(/>.*?</);
    neighborhood = neighborhoodSubstring[0].substring(1,neighborhoodSubstring[0].length-1);
    //alert(neighborhood);

    //extract the coordinates
    var locString = html.match(/>.*?\([\d]*,[\d]*\) /);  //ex: ">Vault of Enlightenment (22,28)  (Paradise)<"
    if(locString == null)
    {
        alert("locString is null");
        return;
    }
    //get the x,y coordinates
    var xCoord = locString[0].match(/\([\d]*,/);
    xCoord = xCoord[0].substring(1,xCoord[0].length-1);
    var yCoord = locString[0].match(/,[\d]*\)/);
    yCoord = yCoord[0].substring(1,yCoord[0].length-1);

    if(html.match(/\(Paradise\)/))
    {
        plane = "Paradise";
    }
    else if(html.match(/\(Stygia\)/))
    {
        plane = "Stygia";
    }
    else if(html.match(/\(Valhalla\)/))
    {
        plane = "Valhalla";
    }
    else if(html.match(/\(Purgatorio\)/))
    {
        plane = "Purgatorio";
    }
    else if(html.match(/\(The Sewers\)/))
    {
        plane = "The Sewers";
    }
    else if(html.match(/\(Nifleheim\)/))
    {
        plane = "Nifleheim";
    }
    else if(html.match(/\(The Nimbus\)/))
    {
        plane = "The Nimbus";
    }
    else if(html.match(/\(The Stygian Warrens\)/))
    {
        plane = "The Stygian Warrens";
    }

    // var plane = locString[0].match(/\([\w]*\)</);
    // plane = plane[0].substring(1, plane[0].length-2);

    locationInfo[0] = locationType;
    locationInfo[1] = xCoord;
    locationInfo[2] = yCoord;
    locationInfo[3] = plane;
    locationInfo[4] = neighborhood;
    return locationInfo;
}

// --------------------------------------------------------------------
// This is what runs right away
// --------------------------------------------------------------------
var reportURL = 'http://nwmap.freehostia.com/submitReport.php';
//check to see if character is dead.  If so, quit processing
var charBox = document.getElementById("character");
if(charBox==null) return;
if (charBox.innerHTML.match(/You are dead./)) { return; }

var character = getCharacter();
var charName = character.split("|")[1];
var charFaction = character.split("|")[2];
//get the data from the loaded page
var location = getLocationAll();
// alert(location);

/*
 *  check to make sure we have something to report
 */
if( location==null ) { return; }
/*
 *  add charname in line below and uncomment to turn this off for all but one alt
 */
//if( charName!="") { return; }

/*
 * Report the data like one of the following
 *
 */
var submitGet = reportURL + "?reportby=" + charName +
        "&charFaction=" + charFaction +
        "&plane=" + location[3] +
        "&x=" + location[1] +
        "&y=" + location[2] +
        "&terrain=" + location[0] +
        "&neighborhood=" + location[4];
if (!GM_xmlhttpRequest) {
    alert('Please upgrade to Greasemonkey 0.2.6 or later.');
    return;
}
// alert('Sending: ' + submitGet);
//return;
try
{
    GM_xmlhttpRequest({
        method: 'GET',
        url: submitGet,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/atom+xml,application/xml,text/xml',
        },
        onload: function(responseDetails) {

            // alert('Request for Atom feed returned ' + responseDetails.status +
            //       ' ' + responseDetails.statusText + '\n\n' +
            //       'Feed data:\n' + responseDetails.responseText);
        }
    });
}
catch (E)
{
    alert("error: " + E);
}
