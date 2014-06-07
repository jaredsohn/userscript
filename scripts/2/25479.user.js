// Copyright (c) 2007, Jeffrey Hoyt
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
// @name          Healing Opportunity List
// @namespace     http://cdf-infuse.freehostia.com
// @description   Script to show healing opportunities
// @include       http://*nexuswar.com/map*
// @exclude
// ==/UserScript==

try
{
    // get the content of the location description
    var LocDesc = document.getElementById('locdesc');
    if(!LocDesc) return;
    var html = LocDesc.innerHTML;
    //look for characters present
    //var charsPresent = html.match(/<span class=\"nowrap\">.+?<\/span>, /g);
    var charsPresent = html.match(/<span class=\"nowrap\">.+?<\/span>/g);
    if (!charsPresent) return;
    //build the output
    var healingOpportunities = "<p>Characters in need of healing: <br/>";
    count = 0;
    for (var x = 0; x < charsPresent.length; x++)
    {
        //alert(charsPresent[x]);
        if(!charsPresent[x].match(/hp-0\.gif/))
        {
            healingOpportunities += charsPresent[x];
            count++;
        }
    }
    healingOpportunities += "</p>";
    // alert(healingOpportunities);
    var basicActions = document.getElementById('basicactions');
    if(count > 0)
    {
        basicActions.innerHTML += healingOpportunities;
        LocDesc.innerHTML += healingOpportunities;
    }
    else
    {
        basicActions.innerHTML += "<p>Nobody in this location needs to be healed.</p>";
        LocDesc.innerHTML += "<p>Nobody in this location needs to be healed.</p>";
    }

}
catch (E)
{
    alert("error: " + E);
}


