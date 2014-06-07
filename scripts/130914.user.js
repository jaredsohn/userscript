// ==UserScript==
// @name           FSK
// @namespace      fsk.erepublik.no
// @version        0.0.0.3
// @include        http://www.erepublik.com/*
// @include        http://economy.erepublik.com/*
// @include        http://static.erepublik.com/*
// @require        http://sizzlemctwizzle.com/updater.php?id=130914&days=1&show
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require        http://jquery-json.googlecode.com/files/jquery.json-2.2.min.js
// @require        https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.11/jquery-ui.min.js
// ==/UserScript==
// -----------------------------------------------------------------------------
// Custom stylesheet
// -----------------------------------------------------------------------------
var cssSidebar = ".fskContainer { background-color:white; border: 2px solid #EBEBEB; border-radius: 5px 5px 5px 5px;clear: left;float: left;margin-right: 18px;margin-top: 10px;padding: 11px 11px 8px;width: 149px } .fskHeader { text-align:center;font-weight:bold; } .fskMenuItem { border: solid 1px #EFEFEF; padding: 2px; margin:2px; } .fskMenuItem:hover { background-color: #EFEFEF; border-color: gray; }";

String.prototype.startsWith = function(str) { return (this.match("^"+str)==str) }

function IsBattlefieldPage() 
{
    return document.location.toString().indexOf("/en/military/battlefield/") > 0;
}
// -----------------------------------------------------------------------------
// Battlefield enhancements
// -----------------------------------------------------------------------------
function MainBattlefield()
{
    ERPK = unsafeWindow.ERPK;
   
    $("#fight_btn").click(function () {
        if (ERPK.canFire()) { fsk.addbattlehit(); }
    });
}

/**
 * Object to maintain battle data
 */
function battle() 
{
   this.battleId = 0;
}

// -----------------------------------------------------------------------------
// Execute user scripts
// -----------------------------------------------------------------------------

function getCitizenName()
{
    return $("#large_sidebar .user_section .user_avatar").attr('title');
}

function getCitizenId()
{
    str = $("#large_sidebar .user_section .user_avatar").attr('href');
    str = str.split("/");
    return str[str.length-1];
}

function getErepublikDay()
{
    return $("#header .header_info .eday strong").text().replace(",","");
}

function AddSidebar()
{
    GM_addStyle(cssSidebar);
    $("#content").css("float", "right");
    hits = fsk.battlefield.hits["day"+fsk.erepDay];
    htmlSidebar = '<div class="fskContainer"><div class="fskHeader">FSK</div>';
    htmlSidebar += '<a href="https://docs.google.com/spreadsheet/viewform?formkey=dFl3dWZjNGJEN20xZHlDZ19yMXdyTlE6MQ&entry_0=http://www.erepublik.com/en/citizen/profile/'+ getCitizenId() + '&entry_3='+ getCitizenName()+'&entry_1='+getErepublikDay()+'&entry_2='+hits+'" target="_new">';
    htmlSidebar += '<div class="fskMenuItem"><img src="/images/icons/industry/2/q6_30x30.png" style="float:left; margin: 2px; margin-top: -3px; height: 20px; width:20px;"/>Request Weapons</div></a>';
    htmlSidebar += '<a id="fsk_testcounter" href="javascript:;"><div class="fskMenuItem"><img src="" style="float:left; margin: 2px; margin-top: -3px; height: 20px; width:20px;"/>Clear hit counter</div></a>';
    htmlSidebar += '<div id="fsk_hitcounter" style="font-size: 10px;"></div>';
    htmlSidebar += '</div>';
    $("#content").after(htmlSidebar);
    $("#fsk_testcounter").click(function() { fsk.resetbattlehits(); });
}
// -----------------------------------------------------------------------------
// Greasemonkey storage
// -----------------------------------------------------------------------------
var fsk = {
    citizenId: null,
    erepDay: null,
    storage: {}
};
fsk.init = function() {
    fsk.citizenId = getCitizenId();
    fsk.erepDay = getErepublikDay();
    fsk.storage.load();
}
fsk.storage.cache = {};
fsk.storage.get = function (a, b) {
    var c = GM_getValue(fsk.citizenId + "." + a, b);
    return fsk.storage.cache[a] = "undefined" != typeof c ? JSON.parse(c) : c
};
fsk.storage.set = function (a, b) {
    return GM_setValue(fsk.citizenId + "." + a, JSON.stringify(b))
};

fsk.battlefield = {
    hits : { },
    kills : {} 
};

fsk.addbattlehit = function() {
    fsk.battlefield.hits["day"+fsk.erepDay]++;
    fsk.storage.set("battlefield", fsk.battlefield);
    $("#fsk_hitcounter").text("Hits today: " + fsk.battlefield.hits["day"+fsk.erepDay]);
}

fsk.resetbattlehits = function() {
    fsk.battlefield.hits = { };
    fsk.battlefield.hits["day"+fsk.erepDay] = 0;
    fsk.storage.set("battlefield", fsk.battlefield);
    fsk.printdata();
}

fsk.storage.load = function() {
    //alert('load');
    fsk.battlefield = fsk.storage.get("battlefield");
    
    // battlefield 
    if(!(fsk.battlefield.hits["day"+fsk.erepDay] > 0)) { fsk.battlefield.hits["day"+fsk.erepDay] = 0; }
    if(!(fsk.battlefield.hits["day"+fsk.erepDay-1] > 0)) { fsk.battlefield.hits["day"+fsk.erepDay-1] = 0; }
    
    // save new default values values
    fsk.storage.set("battlefield", fsk.battlefield);
    
    fsk.storage.clean();
}

fsk.storage.clean = function() {
    // Clear old data
    tmpBattlefieldHits = fsk.battlefield.hits;
    fsk.battlefield.hits = {};
    fsk.battlefield.hits["day"+fsk.erepDay] = tmpBattlefieldHits["day"+fsk.erepDay];
    fsk.battlefield.hits["day"+fsk.erepDay-1] = tmpBattlefieldHits["day"+fsk.erepDay-1];
    // save
    fsk.storage.set("battlefield", fsk.battlefield);
}

fsk.printdata = function() {
    // battlefield stats
    battleHtml = "<div>Hits today: "+ fsk.battlefield.hits["day"+fsk.erepDay]+"</div>"
    //battleHtml+= "<div>Hits yesterday: "+ fsk.battlefield.hits["day"+fsk.erepDay-1]+"</div>"
    $("#fsk_hitcounter").html(battleHtml);
}
// -----------------------------------------------------------------------------
function MainErep()
{
    // Exit if no sidebar found
    if (!document.getElementById("large_sidebar")) return;
   
    fsk.init();
    //alert(fsk.erepDay);
    AddSidebar(); 
    
    // display any stored data needed presentation
    fsk.printdata();
    
    if(IsBattlefieldPage()) { MainBattlefield();}
}
// -----------------------------------------------------------------------------
$(document).ready(function() {MainErep();} );