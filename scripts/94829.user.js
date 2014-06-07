// ==UserScript==
// @name        MouseHunt Plugins
// @author      Yukuang Goh
// @version    	1.28
// @namespace   http://ykgoh.mezoka.com
// @description Plugins for Mousehunt 3. Read below for more details
// @include     http://apps.facebook.com/mousehunt/*
// @include	    http://mousehuntgame.com/*
// @include	    http://www.mousehuntgame.com/*
// ==/UserScript==

/*
Versions
----------------------
* - v1.28
*   -   Modded the script to work with the iframed version of mousehunt

* - v1.27
*   -   Modded the script to work in Mousehuntgame.com
*   -   Autoupdate buttons are removed...


* - v1.26
*   -   Includes previously missing Zugzwangs Tower Plugin. This greasemonkey script is a ported version of my previous HTML + Javascript, 
*       so there were quite some modifications. During these modifications, some scripts/functionalities were removed (intentionally and unintentionally). My Apologies


Description of Plugin
----------------------

* - Shows Seasonal Garden's Season Start and End Date/Time
*     -   This plugin will load a small hud beside the cheese icon. The small display will ONLY appear when hunter is in Seasonal Garden. 
*         
*         If the "show_SG" is set to "true" (without ""), the whole season (Spring to Winter) will be displayed in the top section above 
*         HitGrab's bar (Invite, Gift, Community etc...) The display in the top section will appear regardless of the hunter's location.
*       
*       Even when the show_sg is set to false, the display can still be toggled by clicking on the small SG display.
* 
* - Sorting
*     -   Sort Inventory Items (Ascending order)
*         Not sure why, the inventory is not sorted in Ascending order...Created this to do that. 
* 
*     -   Sort Traps (by Power Type) 
*         For Traps sorting, it will be sorted by Power Type and in Ascending order.
* 
*     To disable sorting, change the value of "allowSorting" to false
* 
* 
* - Analyze Journal Entries (Manalytics) 
*     -   This plugin will add a button in the Journal Page to allow analyzing of journal logs. 
*         It will only analyze hunting logs in that page and Page 1 to 3.
*         
*     A custom pager will be created in the Summarized Log. When user click on the pager created there, you will be brought to the 
*     selected page and the Manalytics will auto analyze the selected page.
* 
*     Note: If user clicks on the standard pager, it will navigate to the selected page but Manalytics will not execute.
* 
* 
*
* Use Find (Ctrl + F) to navigate to #page_load to control what the script loads directly.
*/


if (window.plugins == null) {
    window.plugins = {};
}

plugins.version = 1.28;

/**********************************************************************************************************************************************************
Configurable settings   
***********************************************************************************************************************************************************/

//This will hide the seasonal garden from the top display
var show_SG = false;

//Shows the HUD beside the gold information. This will only work in seasonal garden
var show_HUD = true;

//Hiding the header will cause the Show/Hide to appear beside the current season text
var show_Header = false;                 //true/false

//Shows/Hide the Toggle Show Hide all season button
var show_ToggleShowAllButton = true;    //true/false

//Hides inactive seasons
var hide_InactiveSeason = true;         //true/false

//Shows the Update Script icon in the top menu
var show_UpdateScript = true;

//Auto check for update
var autoCheckForUpdate = true;

//Remove advertisements
var removeAdsElements = false;

//Allows Sorting of Items
var allowSorting = true;

//Auto Analyze Log
var autoAnalyzeLog = false;

//Autoupdate URL
//var autoUpdateUrl = "http://ykgoh.mezoka.com/WebApps/Mousehunt/greaseUpdate.php?type=mh_plugins";
var autoUpdateUrl = "about:blank";
//autoUpdateUrl += "&uid=" + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
autoUpdateUrl += "";

var forcedUpdateUrl = autoUpdateUrl + "&ver=1.0";
autoUpdateUrl += "&ver=" + plugins.version;

var website = "http://userscripts.org/scripts/show/94829";

var platform = {
    Facebook: false,
    MHGame: false
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------------
//"CSS" styles defined in Javascript. You can change the display style here to suit your needs. The styles can be called via  styles.header
//Please note that these are not class names, when the javascript is executed, these styles are appended directly into the style='whatever selected'

var styles = {
    header: "font-weight:bold; padding-bottom:0px; cursor:default;",
    largeHeader: "font-weight:bold; padding-bottom:0px; cursor:default; font-size:18px; margin-top:10px;",
    seasonList: "width:100%;",
    seasons: "display:none;",
    seasons_show: "display:block; height:20px; cursor:default;",
    currentSeason: "font-weight:bold; display:block; height:20px; cursor:default;",
    ul: "cursor:default;",
    li: "cursor:default;",
    dateTimeText: "",
    hidden: "display:none;",
    show: "display:block;",
    btnUpdate: "text-align:center;",
    hyperlinkButton: "font-size:12px; margin-right:5px; padding-right:5px; font-weight:bold",
    summaryHeader: "font-weight:bold; padding-bottom:0px; cursor:default; background-color:gray;color:white;",
    cellText: "margin:3px 3px 3px 3px;",
    row: "border-bottom:solid 1px black;",
    pageSelected: "padding: 3px 5px 0px 5px; margin:5px 5px 5px 5px; background-color:gray; color:white; font-size:12pt; font-weight:bold; border:solid 1px black;",
    page: "padding: 3px 5px 0px 5px; margin:5px 5px 5px 5px; font-size:12pt; font-weight:bold; border:solid 1px black;"
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------------

/**********************************************************************************************************************************************************
Utilities Function
***********************************************************************************************************************************************************/

//[#detectPlatform] Set Platform for script
var detectPlatform = function () {
    if (window.location.href.indexOf(".facebook.com") != -1) {
        platform.Facebook = true;
    }
    else if (window.location.href.indexOf("mousehuntgame.com") != -1) {
        // from mousehunt game
        platform.MHGame = true;
    }

}
detectPlatform();


//[#isPageLoaded] checks if the page is loaded
var isPageLoaded = function () {
    if (platform.Facebook) {
        return ($get("app10337532241_headerTop") ? true : false);
    }
    else {
        return ($get("header") ? true : false);
    }
}

//[#trim]
var trim = function (stringToTrim) {
    return stringToTrim.replace(/^\s+|\s+$/g, "");
}

//[#getElementsByClassName]
var getElementsByClassName = function (classname, node) {
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for (var i = 0, j = els.length; i < j; i++)
        if (re.test(els[i].className)) a.push(els[i]);

    return a;
}

//[#pad] Pad results with 0s, e.g. 001 instead of 1
var pad = function (n, len) {
    s = n.toString();
    if (s.length < len) {
        s = ('0000000000' + s).slice(-len);
    }

    return s;
}


//For conversions of months and weekdays names
var m_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var w_days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];


//[#formatDate] Format Date String > "dd MMM yyyy, ddd"  (with the comma)
var formatDate = function (d) {
    d = new Date(d);
    return pad(d.getDate(), 2) + " " + m_names[d.getMonth()] + " " + d.getFullYear() + ", " + w_days[d.getDay()];
}

//[#formatTime] Format Time String > "hh:mm tt"
var formatTime = function (d) {
    d = new Date(d);
    var AMPM = "AM";

    var hour = d.getHours();
    if (d.getHours() > 12) {
        AMPM = "PM";
        hour -= 12;
    }

    if (AMPM == "AM" && hour == 0) {
        hour = 12;
    }

    return pad(hour, 2) + ":" + pad(d.getMinutes(), 2) + " " + AMPM;
}

//[#formatFullDate] dd MMM yyyy, ddd, hh:mm tt
var formatFullDate = function (d) {
    return formatDate(d) + ", " + formatTime(d);
}


//[#formatShortDate] ddd, hh:mm tt
var formatShortDate = function (d) {
    d = new Date(d);
    return w_days[d.getDay()] + ", " + formatTime(d)
}

//[#formatTime24] Format Time String > "ddd HHmm" 
//e.g. Wed 0000 > 12:00 AM or Fri 1800 > 6:00 PM
var formatTime24 = function (d) {
    d = new Date(d);
    return w_days[d.getDay()] + " " + pad(d.getHours(), 2) + pad(d.getMinutes(), 2);
}

//[#$get] Gets and returns the requested element by ID
var $get = function (eleName) {
    return document.getElementById(eleName);
}

var showhide = function (eleId) {
    var ele = document.getElementById(eleId);
    if (ele != null) {
        if (ele.style.display == "block") {
            ele.style.display = "none";
        }
        else {
            ele.style.display = "block";
        }
    }
}

//[#addCommas] Add Commas to figures (e.g. 1000 to 1,000)
var addCommas = function (nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

//Gets parameter from URL
var getParam = function (name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null)
        return "";
    else
        return results[1];
}

//[#removeAds] Remove ads
var removeAds = function () {

    //These elements are considered as ads and will be removed if the option remove ads is selected
    var adsElements = [$get("sidebar_ads").parentNode, $get("pageFooter"), $get("blueBar"), $get("pageHead")];

    if (removeAdsElements) {
        for (var i = 0; i < adsElements.length; i++) {
            if (adsElements[i]) {
                adsElements[i].style.display = "none";
            }
        }
    }
}

//[#createPluginFooter] Create Plugin Footer at the footer section of MH
var createPluginFooter = function () {
    var footerNode;

    if (platform.Facebook) {
        footerNode = getElementsByClassName("version", document.getElementById("app10337532241_overlayContainer"));
    } else {
        footerNode = getElementsByClassName("version", document.getElementById("overlayContainer"));
    }

    if (footerNode) {
        footerNode[0].innerHTML += "<br/><a href='" + website + "' target='_blank'>Mousehunt Plugins v" + plugins.version + "</a>";
    }
}

//[#createScriptUpdateButton] Shows the update button at the top right hand corner
var createScriptUpdateButton = function () {
    return;
    if (!show_UpdateScript) return;

    var parent = getElementsByClassName("games", document.getElementById("app10337532241_overlayContainer"))[0];
    if (parent) {

        if (autoCheckForUpdate) {
            //Create the auto-update frame. It will only prompt when there is a new update available
            var iframeUpdate = document.createElement("iframe");
            iframeUpdate.src = autoUpdateUrl + "&silent=true";
            iframeUpdate.style.display = "none";

            parent.appendChild(iframeUpdate);
            iframeUpdate = null;
        }


        //Removes the 2 game icon Mousehunt and LevynLight.
        if (parent.hasChildNodes()) {
            while (parent.childNodes.length >= 1) {
                parent.removeChild(parent.firstChild);
            }
        }

        //Create <a> tag for the hyperlink to the update page
        var aTag = document.createElement("a");
        aTag.setAttribute("href", autoUpdateUrl);
        aTag.setAttribute("title", "Update Mousehunt Plugins");
        aTag.setAttribute("alt", "Update Seasonal Garden Script");
        aTag.setAttribute("target", "_blank");
        aTag.setAttribute("style", styles.btnUpdate);

        var ele = document.createElement("img");
        ele.setAttribute("src", "http://ykgoh.files.wordpress.com/2011/01/update.gif");
        ele.setAttribute("align", "middle");

        aTag.appendChild(ele);
        parent.appendChild(aTag);


        //Create <a> tag for the hyperlink to the update page
        var aTag = document.createElement("a");
        aTag.setAttribute("href", forcedUpdateUrl);
        aTag.setAttribute("title", "Force Download Mousehunt Plugins");
        aTag.setAttribute("alt", "Force Download Mousehunt Plugins");
        aTag.setAttribute("target", "_blank");
        aTag.setAttribute("style", styles.btnUpdate);

        var ele = document.createElement("img");
        ele.setAttribute("src", "http://ykgoh.files.wordpress.com/2011/01/download1.gif");
        ele.setAttribute("align", "middle");

        aTag.appendChild(ele);
        parent.appendChild(aTag);

        href = null;
        aTag = null;
        ele = null;


    }
    parent = null;
}

//[#tweakInterface] Tweaks the interface for this plugin to be show as wanted
var tweakInterface = function () {
    var ele;

    //Because this image is taking too much space. gotta shrink it....
    ele = $get("app10337532241_cheeseped");
    if (ele) {
        ele.style.width = "auto";
    }

    //Prize Power - This banner block the HUD
    ele = $get("app10337532241_hud_prize_power");
    if (ele) {
        ele.style.top = "-80px";
        ele.style.left = "610px";
    }

    ele = null;
}

/**********************************************************************************************************************************************************
Sorting Scripts
#plugins.itemSorter
**********************************************************************************************************************************************************/
plugins.itemSorter = function () {

    //[#sortAll] Creates the link to allow sorting
    this.sortAll = function () {

        try {
            if (allowSorting) {
                var ele, atag;

                if (platform.Facebook) {
                    ele = $get("app10337532241_header");
                }
                else {
                    ele = $get("header");
                }

                atag = document.createElement("a");
                atag.innerHTML = "<span id='spanSortHeader' style='font-size:14pt; margin-left:5px;'><b>Sort Items</b></span>";
                atag.addEventListener("click", sortAllTabs, true);
                ele.appendChild(atag);

                setTimeout(sortAllTabs, 1000);
            }
        }
        catch (e) {
            alert(e.Description);
        }
    }



    //[#sortAllTabs] Sort all tabs
    var sortAllTabs = function () {

        var ele; //advance sorting for traps
        if (platform.Facebook) {
            ele = $get("app10337532241_inventoryContainer1");
        }
        else {
            ele = $get("inventoryContainer1");
        }


        if (!ele) return;
        if (getElementsByClassName("columns2", ele).length < 1) {
            setTimeout(sortAllTabs, 1000);
            return;
        }

        //hides the button after sorting
        $get("spanSortHeader").style.display = "none";

        if (getElementsByClassName("weapons", ele.parentNode).length < 1) {

            if (platform.Facebook) {
                sortItems("app10337532241_inventoryContainer1");
            }
            else {
                sortItems("inventoryContainer1");
            }

        }
        else {

            if (platform.Facebook) {
                sortWeapons("app10337532241_inventoryContainer1");
            }
            else {
                sortWeapons("inventoryContainer1");
            }
        }

        if (platform.Facebook) {
            sortItems("app10337532241_inventoryContainer2");
            sortItems("app10337532241_inventoryContainer3");
        }
        else {
            sortItems("inventoryContainer2");
            sortItems("inventoryContainer3");
        }
    }

    //[#sortItems] sort Items
    var sortItems = function (containerId) {
        var ele = $get(containerId);
        if (!ele) return;

        var allItems = getElementsByClassName("itembox", ele);

        var itemNames = [];
        var items = [];

        //Gets all trap names
        for (var i = 0; i < allItems.length; i++) {
            var itemName = trim(getElementsByClassName("itemname", allItems[i])[0].innerHTML);
            itemNames.push(itemName);
            items[itemName] = allItems[i];
        }

        //Sort
        itemNames.sort();

        //Gets the container
        var currItemContainer = document.createElement("table"); //getElementsByClassName("columns2", ele)[0];
        currItemContainer.setAttribute("class", "columns2");

        //Reorganize the items
        var col = 1;
        var tr = null;
        for (var i = 0; i < itemNames.length; i++) {

            //Create new row
            if (col == 1)
                tr = document.createElement("tr");

            var td = document.createElement("td");
            td.appendChild(items[itemNames[i]]);
            tr.appendChild(td);

            //Add row after 2 column is filled
            if (col == 2)
                currItemContainer.appendChild(tr);

            col = (col == 1 ? 2 : 1);
        }

        //Add the row as it's not added yet
        if (col == 2)
            currItemContainer.appendChild(tr);

        var realParent = getElementsByClassName("columns2", ele)[0].parentNode;
        realParent.insertBefore(currItemContainer, realParent.firstChild);

        //release resource
        tr = null;
        currItemContainer = null;

    }

    //[#advanceSort] Advance Sorting for Weapons
    var sortWeapons = function (containerId) {
        var ele = $get(containerId);
        if (!ele) return;

        var allItems = getElementsByClassName("itembox", ele);

        var itemNames = [];
        var items = [];
        var trapType = [];

        //Please update accordingly if there are new power types
        var powerTypes = ["Physical", "Forgotten", "Arcane", "Draconic", "Tactical", "Hydro", "Shadow", "Parental"];

        //As long as the images dun change....it should still work..
        var powerTypesimages = {
            Physical: "http://www.mousehuntgame.com/images/powertypes/cecf41f01d66a44cd205dd270e4e0b28.png",
            Forgotten: "http://www.mousehuntgame.com/images/powertypes/7b11ce6dc8da54a67bfc04973bef84ee.png",
            Arcane: "http://www.mousehuntgame.com/images/powertypes/3c5ac0cb28ed8c5f07d2e9dc3d53166e.png",
            Draconic: "http://www.mousehuntgame.com/images/powertypes/80d3113652dab5143c9401cd7fed7b15.png",
            Tactical: "http://www.mousehuntgame.com/images/powertypes/b1f8ce9fdf1c4a63bd06ac042cc93486.png",
            Hydro: "http://www.mousehuntgame.com/images/powertypes/82b6cb31469fda6f138f4f2c585ab688.png",
            Shadow: "http://www.mousehuntgame.com/images/powertypes/b639db7bd652973d75e49ff81d898d97.png",
            Parental: "http://www.mousehuntgame.com/images/powertypes/a77ff4cef611b11ba194f1c42af99bfe.png"
        };

        //Gets the power types/trap names of the traps
        for (var i = 0; i < allItems.length; i++) {
            var _tmp = getElementsByClassName("itemname", allItems[i])[0];
            var itemName = trim(_tmp.innerHTML);

            for (var x = 0; x < powerTypes.length; x++) {
                if (_tmp.style.backgroundImage.indexOf(powerTypesimages[powerTypes[x]]) > -1) {
                    trapType[itemName] = powerTypes[x];
                    break;
                }
            }

            itemNames.push(itemName);
            items[itemName] = allItems[i];
        }

        //Sort
        itemNames.sort();

        //Sort power type
        var currItemContainer = document.createElement("div");
        powerTypes.sort();

        var trapTypeSelector = document.createElement("div");
        trapTypeSelector.setAttribute("id", "divTrapTypeSelector");
        trapTypeSelector.innerHTML = "<strong style='" + styles.hyperlinkButton + "'>Trap Power: </strong>";

        for (var x = 0; x < powerTypes.length; x++) {

            var total = 0;
            for (zz in trapType) {
                if (trapType[zz] == powerTypes[x]) {
                    total += 1;
                }
            }

            //Create the hyperlink header to the selected trap power type sectio
            var h = document.createElement("a");
            h.setAttribute("style", styles.hyperlinkButton);
            h.innerHTML = powerTypes[x] + " (" + total + ")";
            h.setAttribute("href", "#power_" + powerTypes[x]);
            trapTypeSelector.appendChild(h);

            //Creates individual header for each power type
            var header = document.createElement("div");
            header.innerHTML = powerTypes[x] + " (" + total + ")";
            header.setAttribute("style", styles.largeHeader);
            header.setAttribute("id", "power_" + powerTypes[x]);
            currItemContainer.appendChild(header);

            //Creates a line after the header
            var hr = document.createElement("hr");
            currItemContainer.appendChild(hr);

            //Create a new table for the power type
            var table = document.createElement("table");
            table.setAttribute("class", "columns2");

            var col = 1;
            var tr = null;
            for (var i = 0; i < itemNames.length; i++) {

                if (trapType[itemNames[i]] == powerTypes[x]) {

                    //Create new row
                    if (col == 1)
                        tr = document.createElement("tr");

                    var td = document.createElement("td");
                    td.appendChild(items[itemNames[i]]);
                    tr.appendChild(td);

                    //Add row after 2 column is filled
                    if (col == 2)
                        table.appendChild(tr);

                    col = (col == 1 ? 2 : 1);
                }
            }

            //Add the row as it's not added yet
            if (col == 2)
                table.appendChild(tr);


            //Creates a Return To Top Link and Add it to the bottom of the table
            var divReturnToTop = document.createElement("div");
            divReturnToTop.setAttribute("style", "text-align:right;");

            var atagReturnToTop = document.createElement("a");
            atagReturnToTop.setAttribute("href", "#divTrapTypeSelector");
            atagReturnToTop.innerHTML = "Return to Top";
            divReturnToTop.appendChild(atagReturnToTop);

            currItemContainer.appendChild(table);
            currItemContainer.appendChild(divReturnToTop);

            divReturnToTop = null;
            header = null;
            h = null;
            hr = null;
        }
        currItemContainer.insertBefore(trapTypeSelector, currItemContainer.firstChild);

        //release resource
        var realParent = getElementsByClassName("columns2", ele)[0].parentNode;
        realParent.insertBefore(currItemContainer, realParent.firstChild);

        tr = null;
        realParent = null;
        currItemContainer = null;
        allItems = null;
        itemNames = null;
        items = null;
        trapType = null;
        trapTypeSelector = null;
    }
}



/**********************************************************************************************************************************************************
[#SG] Seasonal Garden Plugin
[#plugins.SeasonalGarden]

This mainly tells you the current season in MouseHunt Seasonal Garden as well as the date/time for the other seasons. The info of the mouse and it's 
weakness are static information. This also serves as a dashboard to take a look at what mouse give how many percent ampifier in the Garden.
***********************************************************************************************************************************************************/
plugins.SeasonalGarden = function () {

    var mouseMultipliers = [
        {
            //Spring
            "Derpicorn": 1,
            "Hydrophobe": 1,
            "Puddlemancer": 3,
            "Spring Familiar": 6,
            "Tanglefoot": 2,
            "Vinetail": 5
        },
        {
            //Summer
            "Firebreather": 4,
            "Firefly": 2,
            "Hot Head": 1,
            "Monarch": 1,
            "Stinger": 4,
            "Summer Mage": 5
        },
        {
            //Fall
            "Fall Familiar": 6,
            "Harvest Harrier": 3,
            "Harvester": 5,
            "Pumpkin Head": 1,
            "Scarecrow": 1,
            "Whirleygig": 1
        },
        {
            //Winter
            "Bruticle": 4,
            "Frostbite": 4,
            "Icicle": 3,
            "Over-Prepared": 1,
            "Penguin": 1,
            "Winter Mage": 5
        }
    ];

    var FTAAmplifier = -3;

    //Make this variable public
    this.mouseMultipliers = mouseMultipliers;

    var headerElement;
    if (platform.Facebook) {
        headerElement = document.getElementById('app10337532241_noscript');
    }
    else {
        headerElement = document.getElementById('noscript');
    }

    var divContainerId = "divSeasonalGardenTracker";

    if (headerElement) {
        var container = document.createElement('div');
        container.setAttribute("id", divContainerId);
        headerElement.parentNode.insertBefore(container, headerElement);
    }

    this.name = "Seasonal Garden Timer";
    this.version = "1.21";
    this.website = "http://ykgoh.mezoka.com";


    /**********************************************************************************************************************************************************
    Main Program 
    Note: Do not modifiy anything from below unless you know what you are doing 
    ***********************************************************************************************************************************************************/


    //-----------------------------------------------------------------------------------------------------------------------------------------------------------
    /*
    Start of Spring Season since donkey ages ago. This is the most important date in this application. 
    As the rest of the computation of start and end dates are computed from this date.

    Year, Month, Day, Hour, Min, Sec
    Note: the Month starts from 0

    //GMT +8
    //var startDate = new Date(2010, 8, 28, 8, 0, 0);                   
    */

    //GMT/UTC Date
    var startDate = new Date(Date.UTC(2010, 8, 28, 0, 0, 0, 0));
    /*
    This is the GMT (GMT 0) date. When the script is installed and executed from the client computer, the date will be based on their locale settings. 
    Therefore causing the previous date to be inaccurate.

    The next time this variable is used, it will be converted to the user's local time instead.

    This date can be changed to a nearer past spring START date
    */
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------

    /********************************************************************************************************************************************
    Seasonal Garden Script
    /********************************************************************************************************************************************/
    //The 4 seasons
    var season = ["Spring", "Summer", "Fall", "Winter"];

    //Each Season is 80 hours
    var perSeason = 80;
    var seasonDay = parseInt(perSeason / 24);
    var seasonHour = parseInt(80 - (seasonDay * 24));

    //Default to Spring
    var currentSeason = season[0];
    var currentSeasonIdx = 0;
    var currentSeason_sdate, currentSeason_edate;


    //[#load] The single entry point to load the whole application from start
    this.load = function () {

        if (!isPageLoaded()) return;

        //Nothing requires loading
        if (!show_SG && !show_HUD) return;

        //initialize the configurations as per above settings
        initConfig();

        //The 2 functions are separated because the function "populate" can be called 
        //separately without having to re-draw the table
        drawSeasonsTable();
        this.populate();

        createShowHideSeasonsButton();
        createHUD();
    }

    var toggleShowHideSGMainDisplay = function () {
        showhide(divContainerId);
    }

    //[#initConfig] initialize the configurations
    var initConfig = function () {

        var container = $get(divContainerId);

        //No need to show toggle button if don't hide the inactive seasons
        if (!hide_InactiveSeason) {
            show_ToggleShowAllButton = false;
            styles.seasons = styles.seasons_show;
        }

        if (!show_SG) {
            container.setAttribute("style", styles.hidden);
        }
    }

    //[#drawSeasonsTable] Creates the empty table for the plugin to insert the data into
    var drawSeasonsTable = function () {

        var container;
        var ele;
        var divSGSeasons;
        var tableString;

        container = $get(divContainerId);

        ele = document.createElement("div");
        ele.setAttribute("id", "divMiniCountdown");
        container.appendChild(ele);

        divSGSeasons = document.createElement("div");
        divSGSeasons.setAttribute("id", "divSGSeasons");
        container.appendChild(divSGSeasons);

        tableString = "";

        if (show_Header) {
            tableString += "<div style='" + styles.header + "' id='divSGMainHeader'>" + window.SeasonalGarden.name + " v" + window.SeasonalGarden.version + "</div>";
        }

        tableString += "<ul style='" + styles.seasonList + styles.ul + "'>";
        for (var i = 0; i < season.length; i++) {
            tableString += "<li style='" + styles.li + styles.seasons + "' id='div" + season[i] + "'>\
                                <div >\
                                    <div style='float:left; width:50px'>" + season[i] + "</div>\
                                    <div style='float:left; width:200px;'>\
                                    From:   <span id='lbl" + season[i] + "FromDate' style='" + styles.dateTimeText + "'></span>, <span id='lbl" + season[i] + "FromTime' style='" + styles.dateTimeText + "'></span></div>\
                                    To:     <span id='lbl" + season[i] + "ToDate' style='" + styles.dateTimeText + "'></span>, <span id='lbl" + season[i] + "ToTime' style='" + styles.dateTimeText + "'></span></div>\
                                </div>\
                            </li>";
        }
        tableString += "</ul><hr/>";
        $get("divSGSeasons").innerHTML = tableString;

        container = null;
        ele = null;
        divSGSeasons = null;
        tableString = null;
    }

    //[#populate] Calculate and Write the computed results into the table created above
    this.populate = function () {


        //Create today's date without the min and seconds
        var dateNow = new Date();
        dateNow.setMinutes(0);
        dateNow.setSeconds(0);

        //Compute the differences since first spring
        var diff = (dateNow - startDate) / (60 * 60 * 1000);
        var hoursDiff = parseInt(diff);

        var currentSeasonSinceStartDate = new Date(dateNow.setHours(dateNow.getHours() - hoursDiff));
        var nextSeasonStartDate = new Date(currentSeasonSinceStartDate); //Clone Date

        //Gets the current season based on the startDate and the Per Season
        if (diff > perSeason) {

            //seasons passed since 1st Spring
            var _tSeason = parseInt(hoursDiff / perSeason) + 1;
            startDate = new Date(startDate.setHours(startDate.getHours() + ((_tSeason - 1) * perSeason)));

            //Recalculate the diff again.
            dateNow = new Date();
            dateNow.setMinutes(0);
            dateNow.setSeconds(0);

            diff = (dateNow - startDate) / (60 * 60 * 1000);
            hoursDiff = parseInt(diff);

            currentSeasonSinceStartDate = new Date(dateNow.setHours(dateNow.getHours() - hoursDiff));
            nextSeasonStartDate = new Date(currentSeasonSinceStartDate); //Clone Date

            _tSeason = _tSeason % 4;
            if (_tSeason == 0) _tSeason = 4;

            currentSeasonIdx = _tSeason - 1;
            currentSeason = season[currentSeasonIdx];

        }

        //Add 1 season
        nextSeasonStartDate = new Date(nextSeasonStartDate.setHours(currentSeasonSinceStartDate.getHours() + perSeason));

        setSelected(currentSeason, currentSeasonSinceStartDate, nextSeasonStartDate);

        var _tmpSeasonStart = new Date(nextSeasonStartDate);
        var _tmpSeasonEnd = new Date(_tmpSeasonStart);

        for (var i = 0; i < season.length; i++) {

            var newSeasonIdx = currentSeasonIdx + i;
            if (newSeasonIdx > season.length - 1) newSeasonIdx -= season.length;

            if (newSeasonIdx != currentSeasonIdx) {

                _tmpSeasonEnd = new Date(_tmpSeasonEnd.setDate(_tmpSeasonStart.getDate() + seasonDay));
                _tmpSeasonEnd = new Date(_tmpSeasonEnd.setHours(_tmpSeasonStart.getHours() + seasonHour));

                setDateTime(season[newSeasonIdx], _tmpSeasonStart, _tmpSeasonEnd);
                _tmpSeasonStart = new Date(_tmpSeasonEnd);
            }
        }
    }

    //[#createHUD] Create the HUD for seasonal gardenl. The HUD is displayed beside the gold, points, bait information. 
    //Only displays itself when the location is Seasonal Garden
    var createHUD = function () {
        if (!show_HUD) return;

        var location;
        var stringTxt = "";
        var container;
        var headerElement;

        location = $get("app10337532241_hud_location").innerHTML;
        if (location != "Seasonal Garden") return;

        stringTxt += "\
        <ul>\
            <li>\
                <span class='hudstatlabel'>Season: </span>\
                " + currentSeason + "\
            </li>\
            <li>\
                <span class='hudstatlabel'>From: </span><span title='" + formatFullDate(currentSeason_sdate) + "'>\
                " + formatShortDate(currentSeason_sdate) + "</span>\
            </li>\
            <li>\
                <span class='hudstatlabel'>To: </span>\
                <span title='" + formatFullDate(currentSeason_edate) + "'>" + formatShortDate(currentSeason_edate) + "</span>\
            </li>\
        </ul>";

        headerElement = $get('app10337532241_hud_gold').parentNode.parentNode.parentNode;
        if (headerElement) {
            container = document.createElement('div');
            container.setAttribute("class", "hudstatlist");
            container.innerHTML = stringTxt;
            container.setAttribute("title", "Click to show/hide Main Display");
            container.addEventListener("click", toggleShowHideSGMainDisplay, true);
            headerElement.parentNode.insertBefore(container, headerElement.nextSibling);
        }

        //Various interface tweaks to show the HUD without anything blocking or distorting the interface
        tweakInterface();

        location = null;
        stringTxt = null;
        headerElement = null;
        container = null;
    }


    //[#createShowHideSeasonsButton] Create the show/hide all seasons button
    var createShowHideSeasonsButton = function () {

        if (!show_ToggleShowAllButton) return;

        var script_show = "";
        var script_hide = "";
        var nonCurrentSeason = -1;

        //Build the show/hide script
        for (var i = 0; i < season.length; i++) {

            var newSeasonIdx = currentSeasonIdx + i;
            if (newSeasonIdx > season.length - 1) newSeasonIdx -= season.length;

            if (newSeasonIdx != currentSeasonIdx) {
                script_show += "document.getElementById('div" + season[newSeasonIdx] + "').setAttribute('style', '" + styles.seasons_show + "');";
                script_hide += "document.getElementById('div" + season[newSeasonIdx] + "').setAttribute('style', '" + styles.seasons + "');";
            }
        }

        //Gets the non current season
        for (var i = 0; i < season.length; i++) {
            if (i != currentSeasonIdx) {
                nonCurrentSeason = i;
                break;
            }
        }

        //The full script for Show/Hide
        var newScript = " <a href='#' onclick=\"if (document.getElementById('div" + season[nonCurrentSeason] + "').style.display=='block') {" + script_hide + "} else { " + script_show + "}; return false;\">[show/hide all]</a>";


        if (show_Header) {
            //This following liner shows the ShowHide All beside the main header
            $get("divSGMainHeader").innerHTML += newScript;
        }
        else {
            //This following liner shows the ShowHide All beside the current season
            $get("lbl" + currentSeason + "ToTime").innerHTML += newScript;
        }

        nonCurrentSeason = null;
        script_show = null;
        script_hide = null;
    }


    //[#setDateTime] Sets the date/time in the respective columns
    var setDateTime = function (season, startDate, endDate) {

        var lblFromDate = $get("lbl" + season + "FromDate");
        var lblToDate = $get("lbl" + season + "ToDate");
        var lblFromTime = $get("lbl" + season + "FromTime");
        var lblToTime = $get("lbl" + season + "ToTime");

        lblFromDate.innerHTML = formatDate(startDate);
        lblFromTime.innerHTML = formatTime(startDate);

        lblToDate.innerHTML = formatDate(endDate);
        lblToTime.innerHTML = formatTime(endDate);

        lblFromDate = null;
        lblToDate = null;
        lblFromTime = null;
        lblToTime = null;
    }

    //[#setSelected] Sets the selected season and set the data in it
    var setSelected = function (season, startDate, endDate) {

        var ele = $get("div" + season);
        ele.setAttribute("style", styles.currentSeason);

        currentSeason_sdate = startDate;
        currentSeason_edate = endDate;

        setDateTime(season, startDate, endDate);

        ele = null;
    }


    //[#getNextSeason] Gets the next season's index
    var getNextSeason = function () {
        var newSeasonIdx = currentSeasonIdx + i;
        if (newSeasonIdx > season.length - 1) newSeasonIdx -= season.length;
        return newSeasonIdx;
    }


    //[#AnalyzeMouseCatches] Analyze the catch rate and return a table string to display
    this.AnalyzeMouseCatches = function (aryMouseCaught, intFTACount) {

        var netAmp = 0;

        var longStr = "";
        longStr += "<br/><div><div style='font-size:12pt; font-weight:bold'>Seasonal Garden Catch Rate Summary</div><table border='1' style='border-collapse:collapse; border:solid 1px black; width:400px;' cellpadding='4'>";
        longStr += "<tr style=\"font-weight:bold;" + styles.row + "\"><td><b>Mouse</b></td><td><b>Qty</b></td><td><b></b>Amplifier</td><td><b>Total</b></td></tr>";
        for (x in aryMouseCaught) {
            var amp = getMouseAmplifier(x);
            var total = amp * aryMouseCaught[x];
            netAmp += total;

            longStr += "<tr style='" + styles.row + "'>";
            longStr += "<td>" + x + "</td>";
            longStr += "<td>" + aryMouseCaught[x] + "</td>";
            longStr += "<td>+" + amp + " each</td>";
            longStr += "<td>" + total + "</td>";
            longStr += "</tr>";
        }

        longStr += "<tr style='color:red;" + styles.row + "'>";
        longStr += "<td>Fail to Attract</td>";
        longStr += "<td>" + intFTACount + "</td>";
        longStr += "<td>" + FTAAmplifier + "</td>";
        longStr += "<td>" + FTAAmplifier * intFTACount + "%</td>";
        longStr += "</tr>";

        netAmp += (FTAAmplifier * intFTACount);


        longStr += "<tr style='" + styles.row + "'>";
        longStr += "<td style='font-weight:bold; font-size:10pt;'>Net</td>";
        longStr += "<td></td><td></td>";
        longStr += "<td style='font-weight:bold; font-size:10pt;'>" + netAmp + "%</td>";
        longStr += "</tr>";

        longStr += "</table></div>";
        return longStr;
    }

    //[#getMouseAmplifier] Gets the mouse's amp from the pre-defined array
    var getMouseAmplifier = function (strMseName) {
        for (var i = 0; i < mouseMultipliers.length; i++) {
            var season = mouseMultipliers[i];
            for (var x in season) {
                var curMouseName = x;
                var pts = season[x];
                if ((trim(curMouseName) + " Mouse") == trim(strMseName)) {
                    return pts;
                }
            }
        }
        return 0;
    }

    /**********************************************************************************************************************************************************
    End of Seasonal Garden Script
    **********************************************************************************************************************************************************/
}

/**********************************************************************************************************************************************************
[#ZT] Zugzwangs Tower Plugin

Contains static information about the chess pieces
***********************************************************************************************************************************************************/
plugins.ZugzwangsTower = function (divContainerId) {

    this.name = "Zugzwang's Tower";
    this.version = "1.3";

    var chessType = ["Technic", "Mystic"];
    var FTAAmplifier = -3;

    var chessPieces = {
        "Pawn": 1,
        "Knight": 3,
        "Bishop": 3,
        "Rook": 5,
        "Queen": 9,
        "King": 11
    }

    //[#about]
    this.about = function () { return; }

    //[#load]
    this.load = function () {

        var container = document.getElementById(divContainerId);


        var _tmpString = "";
        for (var i in chessPieces) {
            _tmpString += "                                                                         \
                        <tr>                                                                        \
                            <td align='right'>" + chessType[0] + " " + i + "</td>                   \
                            <td align='center'>" + chessPieces[i] + "%</td>                         \
                            <td align='left'>" + chessType[1] + " " + i + "</td>                    \
                        </tr>                                                                       \
                    "
        }

        var longString = "\
                    <table width='300px' border='1' cellpadding='2' cellspacing='1'>                \
                        <tr>                                                                        \
                            <th align='right' width='40%'>" + chessType[0] + "</th>                 \
                            <th align='center'>Ampifier</th>                                        \
                            <th align='left' width='40%'>" + chessType[1] + "</th>                  \
                        </tr>                                                                       \
                        " + _tmpString + "                                                          \
                    </table>                                                                        \
                ";
        container.innerHTML = longString;

    }



    //[#AnalyzeMouseCatches] Analyze the catch rate and return a table string to display
    this.AnalyzeMouseCatches = function (aryMouseCaught, intFTACount) {

        var netAmp = 0;

        var longStr = "";
        longStr += "<br/><div><div style='font-size:12pt; font-weight:bold'>Zugzwangs Tower Catch Rate Summary</div><table border='1' style='border-collapse:collapse; border:solid 1px black; width:400px;' cellpadding='4'>";
        longStr += "<tr style=\"font-weight:bold;" + styles.row + "\"><td><b>Mouse</b></td><td><b>Qty</b></td><td><b></b>Amplifier</td><td><b>Total</b></td></tr>";
        for (x in aryMouseCaught) {
            var amp = getMouseAmplifier(x);
            var total = amp * -aryMouseCaught[x];
            netAmp += total;

            longStr += "<tr styles='" + styles.row + "'>";
            longStr += "<td>" + x + "</td>";
            longStr += "<td>" + aryMouseCaught[x] + "</td>";
            longStr += "<td>+" + amp + " each</td>";
            longStr += "<td>" + total + "</td>";
            longStr += "</tr>";
        }

        longStr += "<tr style='color:red;" + styles.row + "'>";
        longStr += "<td>Fail to Attract</td>";
        longStr += "<td>" + intFTACount + "</td>";
        longStr += "<td>" + FTAAmplifier + "</td>";
        longStr += "<td>" + FTAAmplifier * intFTACount + "%</td>";
        longStr += "</tr>";

        netAmp += (FTAAmplifier * intFTACount);


        longStr += "<tr style='font-weight:bold; font-size:10pt;" + styles.row + ";'>";
        longStr += "<td>Net</td>";
        longStr += "<td></td><td></td>";
        longStr += "<td>" + netAmp + "%</td>";
        longStr += "</tr>";

        longStr += "</table></div>";
        return longStr;
    }

    //[#getMouseAmplifier]
    var getMouseAmplifier = function (strMseName) {

        strMseName = strMseName.replace(/ mouse/gi, "");
        strMseName = trim(strMseName);

        var ary = strMseName.split(" ");
        var mouseType = trim(ary[0]);
        var mouseName = trim(ary[1]);

        for (var i in chessPieces) {
            if (trim(mouseName) == i) {
                return chessPieces[i];
            }
        }
        return 0;
    }
}


/**********************************************************************************************************************************************************
[#MANA] Manalytics
[#plugins.Manalytics] 

A JS Version of Mousehunt Analytics. It's a pain to convert this to a application (exe) base because Javascript is a loosely type language unlike C# and my 
PHP skills is beginner at best. Still, if anyone is willing to convert this to an online server script application, please go ahead. Thou I find that the JS 
version is good enough for me to process my MH logs.

Use [#FN_NAME] to navigate to the function...
***********************************************************************************************************************************************************/
plugins.Manalytics = function () {

    this.version = "1.10";
    this.name = "Manalytics (Analytics) v" + this.version;
    var divContainerId = "divManalyticsAnalysis";

    var fbContainer;
    if (platform.Facebook) {
        fbContainer = $get("app10337532241_journalContainer");
    }
    else {
        fbContainer = $get("journalContainer");
    }

    if (fbContainer) {
        var divContainer = document.createElement("div");
        divContainer.setAttribute("id", divContainerId);
        fbContainer.insertBefore(divContainer, fbContainer.firstChild);
    }

    var container = document.getElementById(divContainerId);
    var browser = "IE";
    var lineBreak = "\n";

    //[#load] Loads Screen
    this.load = function () {
        createForm();
    }

    //[#getAllEntries] Gets all journal entries in the page
    var getAllEntries = function () {
        var eles;
        if (platform.Facebook) {
            eles = getElementsByClassName("journalbody", $get("app10337532241_journalContainer"));
        }
        else {
            eles = getElementsByClassName("journalbody", $get("journalContainer"));
        }

        var l = "";
        for (var i = 0; i < eles.length; i++) {
            l += trim(getElementsByClassName("journaldate", eles[i])[0].textContent) + "\n";
            l += trim(getElementsByClassName("journaltext", eles[i])[0].textContent) + "\n\n";
        }
        return l;
    }

    //[#createAnaylzeButton] Create the button to analyze the page's log. If the parameter analyze is present in the URL, it will auto analyze.
    //This will happen if user click on the Custom Paging (beside the header)
    this.createAnaylzeButton = function () {
        var ele;
        if (platform.Facebook) {
            ele = $get("app10337532241_journalContainer");
        }
        else {
            ele = $get("journalContainer");
        }

        if (ele) {

            if (getParam("analyze") != "") {
                this.analyze();
            }
            else {
                if (autoAnalyzeLog) {
                    this.analyze();
                }
                else {
                    var btn = document.createElement("input");
                    btn.setAttribute("value", "Analyze");
                    btn.setAttribute("type", "button");
                    btn.setAttribute("id", "btnAnalyzeLog");
                    btn.addEventListener("click", this.analyze, true);
                    ele.parentNode.insertBefore(btn, ele);
                }
            }
        }
    }

    //[#analyze] Main function of program
    this.analyze = function () {

        try {

            var btn = $get("btnAnalyzeLog");
            if (btn != null) {
                btn.style.display = "none";
            }

            createForm();

            var entries = getAllEntries();

            //Cleans up the text by removing empty lines
            entries = cleanup(entries);

            //Gets the text from the text source
            var txt = entries;

            //If empty text is passed in, clear the summary then exit
            if (trim(txt) == "") {
                this.reset();
                return;
            }

            //Stores all the lines passed in via the textarea
            var lines = txt.split(lineBreak);

            //Main object to store the information
            var objSummary = new Object();

            //Stores all the hunting locations
            var huntlocations = "";

            //The current hunt location
            var huntLocation = "";

            //The current hunt time
            var time = "";

            //Identify the type of the line (FTA, FTC, etc...) and stores it into the respective array object in objSummary
            for (var i = 0; i < lines.length; i++) {

                //The current line
                var line = lines[i];

                //Identify Summary Type, FTA, FTC etc...
                var summaryType = detectType(line);

                //The line to add to the array
                var lineToAdd = line;

                //Additional info to add to the line
                var info = null;

                //Gets the hunting location and line
                if (summaryType == "time") {
                    huntLocation = getHuntLocation(line);
                    time = getTime(line);
                    huntlocations = appendLine(huntlocations, getHuntLocation(line));
                }

                //Fail to attract
                else if (summaryType == "FTA") { }

                //Fail to catch
                else if (summaryType == "FTC") { }

                //Got looted while failing to catch
                else if (summaryType == "looted") lineToAdd = trim(getMouseMissed(lines[i - 1])) + "\t> " + line;

                //King's reward
                else if (summaryType == "KR") { }

                //Caught a mouse!
                else if (summaryType == "caught") {
                    objSummary[huntLocation + "." + "mouse"] = appendLine(objSummary[huntLocation + "." + "mouse"], line);

                    if (objSummary[huntLocation + "." + "TrapCheck"] == null) objSummary[huntLocation + "." + "TrapCheck"] = 0;
                    if (isTrapCheck(line)) {
                        objSummary[huntLocation + "." + "TrapCheck"] += 1;
                    }
                }

                //Loot dropped from mouse
                else if (summaryType == "loot") {
                    lineToAdd = lines[i + 1];
                    info = getMouseCaught(lines[i - 1]);
                }

                //Cheese Staled
                else if (summaryType == "stale") { }

                /*
                Stores the information into the object
                objSummary[location.summaryType]        - Stores line to add separated by \n
                objSummary[location.summaryType.info]   - Stores line information separated by \n
                */

                //Adds timestamp to the line for all except loot
                objSummary[huntLocation + "." + summaryType] = appendLine(objSummary[huntLocation + "." + summaryType], ((summaryType == "loot") ? "" : time + " > ") + lineToAdd);
                if (info != null) {
                    objSummary[huntLocation + "." + summaryType + ".info"] = appendLine(objSummary[huntLocation + "." + summaryType + ".info"], trim(info));
                }
            }

            //Gets the unique hunting location
            huntlocations = toUniqueArray(huntlocations);

            //Display basic information (Sorted information)
            //document.getElementById("tbManalyticsSummary").value = formatSections(objSummary, huntlocations);

            document.getElementById("divManalytics_SummarySection").style.display = "block";

            /*******************************************************************************************************************
            *******************************************Advance Analysis*********************************************************
            *******************************************************************************************************************/
            var sections = [];


            /*******************************************************************************************************************
            Adds Total Gold, Points Gained and Lost, Total FTA, FTC and Horn counts section
            *******************************************************************************************************************/
            sections = [
                {
                    section: "PlusGold",
                    types: ["caught", "KR"],
                    evaluate: function (objSummary, slocation) {
                        return sysCompute(objSummary, slocation, this.types, getGoldGained);
                    }
                },
                {
                    section: "PlusPoints",
                    types: ["caught", "KR"],
                    evaluate: function (objSummary, slocation) {
                        return sysCompute(objSummary, slocation, this.types, getPointsGained);
                    }
                },
                {
                    section: "MinusGold",
                    types: ["looted"],
                    evaluate: function (objSummary, slocation) {
                        return sysCompute(objSummary, slocation, this.types, getGoldLost);
                    }
                },
                {
                    section: "MinusPoints",
                    types: ["looted"],
                    evaluate: function (objSummary, slocation) {
                        return sysCompute(objSummary, slocation, this.types, getPointsLost);
                    }
                },
                {
                    section: "BaitLooted",
                    types: ["looted"],
                    evaluate: function (objSummary, slocation) {
                        return sysCompute(objSummary, slocation, this.types, getBaitLooted);
                    }
                }
            ];

            objSummary = evalSection(sections, objSummary, huntlocations);

            /*******************************************************************************************************************
            Adds Catch Rate, FTA and FTC rate section

            If you want to add more analysis to the program, do it here. As most of the base information you want to calculated 
            are already computed. Please refer to the "section" above for the variables to call.

            By reading the following "sections", you should roughly be able to know how to play around with it. 
            After adding a section, remember to add the headers to usr_types (Find #usr_types to navigate there). The order in 
            usr_types will affect the order of display.
            *******************************************************************************************************************/
            sections = [
                {
                    section: "RealFTA",
                    types: ["FTA", "stale"],
                    evaluate: function (objSummary, slocation) {
                        return sysCompute(objSummary, slocation, this.types, countStringArray);
                    }
                },
                {
                    section: "RealFTC",
                    types: ["FTC"],
                    evaluate: function (objSummary, slocation) {
                        return sysCompute(objSummary, slocation, this.types, countStringArray);
                    }
                },
                {
                    section: "TotalHorns",
                    types: ["caught", "FTA", "stale", "FTC"],
                    evaluate: function (objSummary, slocation) {
                        return sysCompute(objSummary, slocation, this.types, countStringArray);
                    }
                },
                {
                    section: "TotalCaught",
                    types: ["caught"],
                    evaluate: function (objSummary, slocation) {
                        return sysCompute(objSummary, slocation, this.types, countStringArray);
                    }
                },
                {
                    section: "CatchRate",
                    formula: "Math.round(([$0] / [$1]) * 100)",
                    param: ["TotalCaught", "TotalHorns"],
                    evaluate: function (objSummary, slocation) {
                        return evalFormula(objSummary, slocation, this.formula, this.param);
                    }
                },
                {
                    section: "TrapCheckCatchRate",
                    formula: "Math.round(([$0] / [$1]) * 100)",
                    param: ["TrapCheck", "TotalCaught"],
                    evaluate: function (objSummary, slocation) {
                        return evalFormula(objSummary, slocation, this.formula, this.param);
                    }
                },
                {
                    section: "FTARate",
                    formula: "Math.round(([$0] / [$1]) * 100)",
                    param: ["RealFTA", "TotalHorns"],
                    evaluate: function (objSummary, slocation) {
                        return evalFormula(objSummary, slocation, this.formula, this.param);
                    }
                },
                {
                    section: "FTCRate",
                    formula: "Math.round(([$0] / [$1]) * 100)",
                    param: ["RealFTC", "TotalHorns"],
                    evaluate: function (objSummary, slocation) {
                        return evalFormula(objSummary, slocation, this.formula, this.param);
                    }
                },
                {
                    section: "AgvGoldPerCatch",
                    formula: "Math.round(([$0] / [$1]))",
                    param: ["PlusGold", "TotalHorns"],
                    evaluate: function (objSummary, slocation) {
                        return evalFormula(objSummary, slocation, this.formula, this.param);
                    }
                },
                {
                    section: "AgvPtsPerCatch",
                    formula: "Math.round(([$0] / [$1]))",
                    param: ["PlusPoints", "TotalHorns"],
                    evaluate: function (objSummary, slocation) {
                        return evalFormula(objSummary, slocation, this.formula, this.param);
                    }
                }
            ];
            objSummary = evalSection(sections, objSummary, huntlocations);
            this.summary = objSummary;

            //Display the formatted data in the element
            document.getElementById("divManalyticsOverallSummary").innerHTML = formatAllTables(objSummary, huntlocations);

            callAdditionalAddon(objSummary, huntlocations);

            //location.href = "#divManalytics_SummarySection";
        }
        catch (e) {
            throw e;
            alert(e);
        }
    }

    //[#addCustomSection] Adds Custom section to the analysis log
    var addCustomSection = function (type, header, unit, unitInFront) {
        usr_types.push(
            {
                type: type,
                header: header,
                unit: unit,
                unitInFront: unitInFront
            }
        );
    }


    //[#callAdditionalAddon] Calls additional addons to display more detailed analysis
    var callAdditionalAddon = function (objSummary, huntlocations) {
        var addonContainerId = "divManalytics_addons";
        document.getElementById(addonContainerId).innerHTML = "";

        try {
            //"Seasonal Garden" in huntlocations
            if (objSummary["Seasonal Garden.mouse"] != null) {

                if (!window.SeasonalGarden) window.SeasonalGarden = new plugins.SeasonalGarden();
                if (window.SeasonalGarden != null) {
                    obj_1 = formatObjMouseCaughtInLocation(objSummary, "Seasonal Garden");
                    obj_2 = objSummary["Seasonal Garden.RealFTA"];
                    var result = window.SeasonalGarden.AnalyzeMouseCatches(obj_1, obj_2);
                    document.getElementById(addonContainerId).innerHTML += "<div class='addon'>" + result + '</div>';
                }
            }
        }
        catch (e) { alert(e); }

        //I Did not include ZT in the current release
        try {
            //"Zugzwang's Tower" in huntlocations
            if (objSummary["Zugzwang's Tower.mouse"] != null) {

                if (!window.ZugzwangsTower) window.ZugzwangsTower = new plugins.ZugzwangsTower();
                if (ZugzwangsTower != null) {

                    obj_1 = formatObjMouseCaughtInLocation(objSummary, "Zugzwang's Tower");
                    obj_2 = objSummary["Zugzwang's Tower.RealFTA"];
                    var result = ZugzwangsTower.AnalyzeMouseCatches(obj_1, obj_2);
                    document.getElementById(addonContainerId).innerHTML += "<div class='addon'>" + result + '</div>';
                }
            }
        }
        catch (e) { alert(e); }
    }



    //[#reset] Resets the form
    this.reset = function () {
        document.getElementById("divManalyticsOverallSummary").innerHTML = "";
        document.getElementById("divManalytics_SummarySection").style.display = "none";
    }

    //[#clearHuntingLog] Clears the hunting log
    this.clearHuntingLog = function () {
        document.getElementById("tbManalytics").value = "";
    }

    //[#createPager] Create custom pager with additional parameters to the selected journal page
    /*
    e.g. 
    Normal: journal.php?page=1
    Custom: journal.php?page=1&analyze=true
    */
    var createPager = function () {
        var pageNo = getParam("page");
        pageNo = (pageNo == "") ? 1 : parseInt(pageNo);

        var str = "<div style='display:inline; margin-bottom:5px;'>";
        for (var i = 1; i <= 3; i++) {
            if (pageNo == i) {
                str += "<a style='" + styles.pageSelected + "' href=\"journal.php?page=" + i + "&analyze=true\">" + i + "</a>";
            }
            else {
                str += "<a style='" + styles.page + "' href=\"journal.php?page=" + i + "&analyze=true\">" + i + "</a>";
            }
        }
        str += "</div>";
        return str;
    }

    //[#createForm] The function to create the form for usage
    var createForm = function () {

        var longString = "";
        longString = "                                                                                                                                                              \
                    <form name='frmManatics'>                                                                                                                                       \
                        <div style='width:100%; overflow:auto'>                                                                                                                     \
                            <div id='divManalytics_SummarySection' style='display:none'><br /><br />                                                                                \
                                <div style='margin-bottom:5px;'>                                                                                                                                               \
                                    <strong style='" + styles.largeHeader + "'>Summarized Log</strong><span style='margin-left:15px; font-weight:bold'>Page</span>" + createPager() + "</div>\
                                <div id='divManalyticsOverallSummary'></div>                                                                                                        \
                                <div id='divManalytics_addons'></div>                                                                                                               \
                            </div>                                                                                                                                                  \
                        </div>                                                                                                                                                      \
                    </form><br/>                                                                                                                                                    \
                ";

        container.innerHTML = longString;

        //Set the environment variables
        if (navigator.userAgent.indexOf("MSIE") > -1) browser = "IE";
        else browser = "Others";

        if (browser == "IE") lineBreak = "\r\n";
        else lineBreak = "\n";

    }

    //[#cleanup] Cleans up the text for analyzing purposes
    var cleanup = function (entries) {

        var exp = /\n\n/g;
        if (browser == "IE") exp = /\r\n\r\n/g;

        entries = entries.replace(exp, "\n");
        entries = entries.replace(/\t/g, "");
        entries = entries.replace(/dropped the following loot:/g, "dropped the following loot:\n");
        return entries;
    }


    /****************************************************************************************************************************************
    Display functions for Manalytics
    *****************************************************************************************************************************************/

    //[#formatSections] Format sections with the headers to be displayed in the TextArea
    var formatSections = function (objSummary, locations) {

        //String object to contain the formatted text
        var longString = "";

        for (var idxLoc = 0; idxLoc < locations.length; idxLoc++) {

            //Display hunting location
            longString += locations[idxLoc] + "\n=========================================\n\n";
            for (var idxType = 0; idxType < types.length; idxType++) {

                if (objSummary[locations[idxLoc] + "." + types[idxType].type] != null) {

                    //Display Summary Type
                    longString += types[idxType].header + "\n-----------------------------------------\n";

                    //Gets Summary Type info
                    var info = objSummary[locations[idxLoc] + "." + types[idxType].type + ".info"];

                    //If there are info associated with the summary, split the lines and add the info accordingly
                    if (info != null) {

                        //Convert the lines into array to loop
                        var tmpAry = toArray(objSummary[locations[idxLoc] + "." + types[idxType].type]);

                        //Conver the info into array to loop
                        info = toArray(info);

                        //Loop and write to string
                        for (var i = 0; i < tmpAry.length; i++) {
                            if (trim(tmpAry[i]) != "") {
                                longString += tmpAry[i] + "\n\t[Info]: " + info[i] + "\n\n";
                            }
                        }
                    }

                    //else show as per normal
                    else {
                        longString += objSummary[locations[idxLoc] + "." + types[idxType].type];
                    }

                    //Adds a break inbetween different sections
                    longString += "\n\n";
                }
            }
            longString += "\n\n";
        }
        return longString;
    }

    var colWidth = 200;
    var headerCol = 100;

    //[#formatAllTables] Create the full table for the whole analysis
    var formatAllTables = function (objSummary, locations) {

        //Adds a new header - Total
        locations.push("Total");

        var longString = "";
        var tblWidth = headerCol + (locations.length * colWidth);

        longString += "<table width='" + tblWidth + "px' border='3' style='border:solid 3px black; border-collapse:collapse; line-height:150%' class='summaryTable' cellpadding='3' cellspacing='4'>";

        longString += "<tr style='" + styles.row + "'><td style='" + styles.header + "' width='" + headerCol + "px'>Location</td>";
        for (var idxLoc = 0; idxLoc < locations.length; idxLoc++) {
            longString += "<td class='headers' width='" + colWidth + "' style='" + styles.header + "'>" + locations[idxLoc] + "</td>";
        }
        longString += "</tr>";

        longString += createRowHeader("Overall Summary", locations.length);
        longString += formatTableSum(objSummary, locations, usr_types);

        longString += createRowHeader("Basic Information", locations.length);
        longString += formatTableCount(objSummary, locations, types);


        objSummary["Total.loot"] = null;

        longString += createRowHeader("Spoils of War", locations.length);
        longString += formatTableLoot(objSummary, locations);

        longString += createRowHeader("Hit & Misses", locations.length);
        longString += formatTableMouse(objSummary, locations);
        longString += formatTableMouseMissed(objSummary, locations);
        longString += "</table>";

        return longString;
    }

    //[#createRowHeader] Creates a header row for the summary table
    var createRowHeader = function (headerText, span) {
        return "<tr style='" + styles.row + "'><td colspan='" + span + 1 + "' class='summaryHeader' style='" + styles.summaryHeader + "'>" + headerText + "</td></tr>";
    }

    //[#formatTableCount] Creates the partial table for overall summary containing catch rates information
    var formatTableCount = function (objSummary, locations, types) {
        var longString = "";
        var rows = null;

        var rowTypes = "";
        for (var idxLoc = 0; idxLoc < locations.length; idxLoc++) {
            for (var idxType = 0; idxType < types.length; idxType++) {
                //Commenting the if statement will cause all sections to appear even if 0
                //if (objSummary[locations[idxLoc] + "." + types[idxType].type] != null)
                rowTypes = appendLine(rowTypes, types[idxType].type);
            }
        }

        rows = toUniqueArray(rowTypes);
        for (var idxType = 0; idxType < rows.length; idxType++) {

            var tmpTotal = objSummary["Total." + rows[idxType]];
            if (tmpTotal == null) {
                objSummary["Total." + rows[idxType]] = 0;
            }

            longString += "<tr style='" + styles.row + "'>";
            longString += "<td style='" + styles.header + "'>" + getTypeHeader(rows[idxType], types) + "</td>";
            for (var idxLoc = 0; idxLoc < locations.length; idxLoc++) {
                longString += "<td>";

                if (locations[idxLoc] != "Total") {
                    var tmpObj = objSummary[locations[idxLoc] + "." + rows[idxType]];
                    if (tmpObj != null) {
                        var cnt = countStringArray(tmpObj);
                        longString += cnt;
                        objSummary["Total." + rows[idxType]] += cnt;
                    }
                    else {
                        longString += "0";
                    }
                }
                else {
                    longString += objSummary["Total." + rows[idxType]];
                }
                longString += "</td>";
            }
            longString += "</tr>";
        }
        return longString;
    }

    //[#formatTableSum] Creates the partial table for overall summary containing gold and points information
    var formatTableSum = function (objSummary, locations, types) {
        var longString = "";
        var rows = null;

        var rowTypes = "";
        for (var idxLoc = 0; idxLoc < locations.length; idxLoc++) {
            for (var idxType = 0; idxType < types.length; idxType++) {
                if (objSummary[locations[idxLoc] + "." + types[idxType].type] != null) {
                    rowTypes = appendLine(rowTypes, types[idxType].type);
                }
            }
        }

        rows = toUniqueArray(rowTypes);
        for (var idxType = 0; idxType < rows.length; idxType++) {

            var tmpTotal = objSummary["Total." + rows[idxType]];
            if (tmpTotal == null) {
                objSummary["Total." + rows[idxType]] = 0;
            }

            longString += "<tr style='" + styles.row + "'>";
            longString += "<td class='headers' style='" + styles.header + "'>" + getTypeHeader(rows[idxType], types) + "</td>";

            for (var idxLoc = 0; idxLoc < locations.length; idxLoc++) {
                longString += "<td>";

                var tmpObj = objSummary[locations[idxLoc] + "." + rows[idxType]];
                if (locations[idxLoc] == "Total" && types[idxType].unit == "%") { }
                else {
                    if (tmpObj != null) {
                        if (types[idxType].unitInFront) {
                            longString += types[idxType].unit + addCommas(tmpObj);
                        }
                        else {
                            longString += addCommas(tmpObj) + types[idxType].unit;
                        }
                        objSummary["Total." + rows[idxType]] += tmpObj;
                    }
                    else {
                        longString += "0";
                    }
                }
                longString += "</td>";
            }
            longString += "</tr>";
        }
        return longString;
    }

    //[#formatTableLoot] Creates the partial table for the loot drops table for each locations
    var formatTableLoot = function (objSummary, locations) {

        var longString = "";

        longString += "<tr style='" + styles.row + "'>";
        longString += "<td class='headers' style='" + styles.header + "'>Loot</td>";
        for (var idxLoc = 0; idxLoc < locations.length; idxLoc++) {
            longString += "<td>";

            var tmpObj = objSummary[locations[idxLoc] + ".loot"];
            if (tmpObj != null) {
                longString += formatLoot(tmpObj);
            }
            else {
                longString += "-";
            }
            longString += "</td>";
        }
        longString += "</tr>";
        return longString;
    }

    //[#formatTableMouse] Creates the partial table for the mouse caught in various locations
    var formatTableMouse = function (objSummary, locations) {
        var longString = "";
        longString += "<tr style='" + styles.row + "'>";
        longString += "<td class='headers' style='" + styles.header + "'>Mouse</td>";

        for (var idxLoc = 0; idxLoc < locations.length; idxLoc++) {
            longString += "<td>";

            var tmpObj = objSummary[locations[idxLoc] + ".mouse"];
            var tmpMouse = new Object();

            if (tmpObj != null) {
                var mse = toArray(getMouseCaught(tmpObj));
                var uniqMse = toUniqueArray(getMouseCaught(tmpObj));

                for (var i = 0; i < mse.length; i++) {
                    if (tmpMouse[mse[i]] == null) {
                        tmpMouse[mse[i]] = 1;
                    }
                    else {
                        tmpMouse[mse[i]] += 1;
                    }
                }

                longString += formatQtyArray(tmpMouse, uniqMse);
            }
            else {
                longString += "-";
            }
            longString += "</td>";
        }
        longString += "</tr>";

        return longString;
    }


    //[#formatObjMouseCaughtInLocation] Custom function created for seasonal garden integration
    var formatObjMouseCaughtInLocation = function (objSummary, location) {
        //SeasonalGarden
        var tmpObj = objSummary[location + ".mouse"];
        var tmpMouse = null;

        if (tmpObj != null) {
            tmpMouse = new Object();

            var mse = toArray(getMouseCaught(tmpObj));
            var uniqMse = toUniqueArray(getMouseCaught(tmpObj));

            for (var i = 0; i < mse.length; i++) {
                if (tmpMouse[mse[i]] == null) {
                    tmpMouse[mse[i]] = 1;
                }
                else {
                    tmpMouse[mse[i]] += 1;
                }
            }
        }
        return tmpMouse;
    }


    //[#formatTableMouseMissed] Creates the partial table for the mouse missed in various locations
    var formatTableMouseMissed = function (objSummary, locations) {
        var longString = "";
        longString += "<tr style='" + styles.row + "'>";
        longString += "<td class='headers' style='" + styles.header + "'>Mouse Missed</td>";

        for (var idxLoc = 0; idxLoc < locations.length; idxLoc++) {
            longString += "<td>";

            var all_FTC = ["FTC"];
            var tmpObj = "";

            for (var i = 0; i < all_FTC.length; i++) {
                var t = objSummary[locations[idxLoc] + "." + all_FTC[i]];
                if (t != null) {
                    tmpObj = appendLine(tmpObj, t);
                }
            }

            var tmpMouse = new Object();

            if (tmpObj != null) {
                var mse = toArray(getMouseMissed(tmpObj));
                var uniqMse = toUniqueArray(getMouseMissed(tmpObj));

                for (var i = 0; i < mse.length; i++) {
                    if (tmpMouse[mse[i]] == null) {
                        tmpMouse[mse[i]] = 1;
                    }
                    else {
                        tmpMouse[mse[i]] += 1;
                    }
                }

                longString += formatQtyArray(tmpMouse, uniqMse);

            }
            else {
                longString += "-";
            }
            longString += "</td>";
        }
        longString += "</tr>";

        return longString;
    }

    //[#formatQtyArray] Format the array in desending qty order and returns 
    //[qty] x [item name 1]
    //[qty] x [item name 2]
    var formatQtyArray = function (obj_Qty, obj_Types) {
        try {
            var longString = "";

            var tmpObj = "";
            for (var i = 0; i < obj_Types.length; i++) {
                tmpObj = appendLine(tmpObj, obj_Qty[obj_Types[i]]);
            }

            tmpObj = toUniqueArray(tmpObj);
            for (var i = 0; i < tmpObj.length; i++) {
                tmpObj[i] = parseInt(tmpObj[i])
            }

            tmpObj = tmpObj.sort(function (a, b) { return b - a });

            var lastQty = -1;
            for (var i = 0; i < tmpObj.length; i++) {
                if (tmpObj[i] != "") {
                    if (parseInt(lastQty) != parseInt(tmpObj[i])) {
                        lastQty = tmpObj[i];

                        for (var item in obj_Qty) {
                            if (item != "") {
                                if (obj_Qty[item] == tmpObj[i]) {
                                    longString += tmpObj[i] + " x " + item + "<br/>";
                                }
                            }
                        }
                    }
                }
            }
            return longString;
        }
        catch (e) {
            alert(e);
        }
        return "";

    }

    //[#formatLoot] Formats the loot drops to return 
    var formatLoot = function (strArrayInput) {
        strArrayInput = toArray(strArrayInput);
        var longString = "";

        var qty = new Array();
        var type = new Array();

        for (var i = 0; i < strArrayInput.length; i++) {
            if (trim(strArrayInput[i]) != "") {

                strArrayInput[i] = strArrayInput[i].replace(/,/g, " and ");
                var subItemArray = strArrayInput[i].split(" and ");
                for (var itm = 0; itm < subItemArray.length; itm++) {

                    var parts = subItemArray[itm].split(" ");
                    var p_qty = parts[0];
                    var p_name = "";

                    for (var x = 1; x < parts.length; x++) {
                        p_name += parts[x] + " ";
                    }

                    p_name = trim(p_name);
                    if (parseInt(trim(p_qty)) > 1) {
                        //there is a 's' behind the item
                        p_name = trim(p_name.substring(0, p_name.length - 1));
                    }

                    if (qty[p_name] == null) {
                        qty[p_name] = parseInt(trim(p_qty));
                        type.push(p_name);
                    }
                    else {
                        qty[p_name] += parseInt(trim(p_qty));
                    }
                }
            }
        }

        longString += formatQtyArray(qty, type);

        return longString;
    }

    //[#sortfunction] Sort funtion to be used by array sorting
    var sortfunction = function (a, b) {
        return (a - b) //causes an array to be sorted numerically and ascending
    }

    /****************************************************************************************************************************************
    Computation Methods & String Summarizer methods
    *****************************************************************************************************************************************/

    //[#getPointsGained] Calculate the points gained, returns a number
    var getPointsGained = function (strArrayInput) {
        var o = massParseNumber(strArrayInput, "worth", "points");
        if (isNaN(o)) o = getPointsGainedFromKR(strArrayInput);
        return parseNumber(o);
    }

    //[#getGoldGained] Calculate the gold gained, returns a number
    var getGoldGained = function (strArrayInput) {
        var o = massParseNumber(strArrayInput, "points and", "gold");
        if (isNaN(o)) o = getGoldGainedFromKR(strArrayInput);
        return parseNumber(o);
    }

    //[#getPointsGainedFromKR] Calculate the points gained from Kings Reward, returns a number
    var getPointsGainedFromKR = function (strArrayInput) {
        var o = massParseNumber(strArrayInput, "worth", "points");
        return parseNumber(o);
    }


    //[#getGoldGainedFromKR] Calculate the points gained from Kings Reward, returns a number
    var getGoldGainedFromKR = function (strArrayInput) {
        var o = massParseNumber(strArrayInput, "worth", "gold");
        return parseNumber(o);
    }


    //[#getPointsLost] Calculate the points lost, returns a number
    var getPointsLost = function (strArrayInput) {
        var o = massParseNumber(strArrayInput, "setting me back", "points");
        return parseNumber(o);
    }

    //[#getGoldLost] Calculate the gold lost, returns a number
    var getGoldLost = function (strArrayInput) {
        var o = massParseNumber(strArrayInput, "the fiend pillaged", "gold from me");
        return parseNumber(o);
    }

    //[#getBaitLooted] Calculate the bait lost, returns a number
    var getBaitLooted = function (strArrayInput) {
        var o = massParseNumber(strArrayInput, "steal an additional", "piec");
        return parseNumber(o);
    }

    //[#getMouseCaught] Gets the mice caught, returns a string of mouse caught separated by \n
    var getMouseCaught = function (strArrayInput) {
        strArrayInput = toArray(strArrayInput);
        var result = "";

        for (var i = 0; i < strArrayInput.length; i++) {
            var line = strArrayInput[i].toString();
            if (trim(line) != "") {
                result = appendLine(result, findString(line, "oz. ", "worth "));
            }
        }
        return trim(result);
    }

    //[#getMouseMissed] Gets the mice missed, returns a string of mouse missed separated by \n
    var getMouseMissed = function (strArrayInput) {
        strArrayInput = toArray(strArrayInput);
        var result = "";

        for (var i = 0; i < strArrayInput.length; i++) {
            var line = strArrayInput[i].toString();
            if (trim(line) != "") {

                var str = findString(line, " fruitless. A", "ate a piece ");
                if (isTrapCheck(line)) {
                    str = findString(line, " it appeared A", "ate a piece ");
                }

                if (str.split(" ")[0] == "n") {
                    str = str.substring(str.indexOf("n ") + 2, str.length);
                }
                result = appendLine(result, str);
            }
        }
        return result;
    }


    //[#getHuntLocation] Gets the hunt location, returns Location part of string
    var getHuntLocation = function (line) {
        return line.split(" - ")[1];
    }

    //[#getTime] Get the time of hunt, returns time part of the string
    var getTime = function (line) {
        var t = line.split(" - ")[0];
        if (t.length < 8) {
            t = "0" + t;
        }
        return t;
    }

    //[#sysCompute] Computes the value using the function passed in
    var sysCompute = function (objSummary, slocation, types, baseComputationFunction) {
        var val = 0;
        for (var i = 0; i < types.length; i++) {
            if (objSummary[slocation + "." + types[i]] != null) {
                val += baseComputationFunction(objSummary[slocation + "." + types[i]]);
            }
        }
        return val;
    }

    /****************************************************************************************************************************************
    Common Functions & Methods
    *****************************************************************************************************************************************/

    //[#isTrapCheck] Is Trap Check
    var isTrapCheck = function (line) {
        if (
            line.indexOf(" checked my trap") > 0 ||
            line.indexOf(" check my trap") > 0) {

            return true;
        }
        return false;
    }

    //[#massParseNumber] Parse the numbers and return as a sum
    var massParseNumber = function (strArrayInput, substr_1, substr_2) {

        strArrayInput = toArray(strArrayInput);
        var result = 0;

        for (var i = 0; i < strArrayInput.length; i++) {
            var line = strArrayInput[i].toString();
            if (trim(line) != "") {
                result += findNumber(line, substr_1, substr_2);
            }
        }
        return result;
    }

    //[#toArray] Convert string input into array
    var toArray = function (strInput) {

        if (strInput == null) return [];
        if (trim(strInput) == "") return [];

        var result = strInput.split("\n");
        for (var i = 0; i < result.length; i++) {
            if (result[i] != null) result[i] = trim(result[i]);
        }

        return result;
    }

    //[#toUniqueArray] Converts the input into an array with only unique values
    var toUniqueArray = function (strInput) {

        if (strInput == null) return [];
        if (trim(strInput) == "") return [];

        var ary = toArray(strInput);
        var unique = new Array();


        for (var i = 0; i < ary.length; i++) {
            if (trim(ary[i]) != "" && trim(ary[i]) != "\n") {

                var exists = false;
                for (var x = 0; x < unique.length; x++) {
                    if (unique[x] == ary[i]) {
                        exists = true;
                        break;
                    }
                }
                if (!exists) {
                    unique.push(ary[i]);
                }
            }
        }
        return unique;
    }

    //[#countStringArray] Count the items in the array excluding empty strings
    var countStringArray = function (strInput) {
        if (strInput == null) return 0;
        strInput = strInput.toString();
        if (trim(strInput) == "") return 0;

        var result = 0;
        var ary = toArray(strInput);

        for (var i = 0; i < ary.length; i++) {
            if (trim(ary[i]) != "") {
                result += 1;
            }
        }
        return result;
    }

    //[#findNumber] find the number in the string within the 2 substring input
    var findNumber = function (stringInput, substr_1, substr_2) {
        var result = findString(stringInput, substr_1, substr_2);
        if (result == "") {
            return 0;
        } else {
            return convertNumber(result);
        }
    }

    //[#findString] Find the string within the 2 point
    var findString = function (stringInput, substr_1, substr_2) {
        var idx_1 = stringInput.lastIndexOf(substr_1) + substr_1.length;
        var idx_2 = stringInput.lastIndexOf(substr_2);

        if (idx_1 == -1 || idx_2 == -1) {
            return "";
        }
        return stringInput.substring(idx_1, idx_2);
    }

    //[#parseNumber] Converts a string to number
    var parseNumber = function (strVal) {
        var o = strVal;
        if (isNaN(o)) {
            return 0;
        }
        else {
            return o;
        }
    }

    //[#convertNumber] convert the string input into number
    var convertNumber = function (strVal) {
        return parseInt(strVal.replace(/,/g, ""));
    }

    //[#trim] trim string
    var trim = function (stringToTrim) {
        return stringToTrim.replace(/^\s+|\s+$/g, "");
    }

    //[#appendLine] Append a line to the variable
    var appendLine = function (variable, stringToAppend) {
        if (variable == null) {
            variable = stringToAppend + "\n";
            return variable;
        } else {
            return variable + stringToAppend + "\n";
        }
    }

    //[#evalFormula] Evaluates a formular
    var evalFormula = function (objSummary, slocation, formula, param) {
        try {
            var x = formula;
            for (var i = 0; i < param.length; i++) {
                var paramVal = objSummary[slocation + "." + param[i]];
                if (paramVal == null) paramVal = 0;

                x = x.replace("[$" + i + "]", paramVal);
            }
            return eval(x);
        }
        catch (e) {
            alert(e);
            return 0;
        }
    }

    //[#evalSection] Evaluates a section by calling the function evaluate in the sections object passed in. 
    //The values will be substituted with values in the objSummary object
    var evalSection = function (sections, objSummary, huntlocations) {
        //Computes and store values
        for (var idxLoc = 0; idxLoc < huntlocations.length; idxLoc++) {
            for (var i = 0; i < sections.length; i++) {
                var s = sections[i];
                objSummary[huntlocations[idxLoc] + "." + s.section] = s.evaluate(objSummary, huntlocations[idxLoc]);
            }
        }
        return objSummary;
    }

    //[#getTypeHeader] Gets the header text of the selected type
    var getTypeHeader = function (type, types) {

        for (var i = 0; i < types.length; i++) {
            if (types[i].type == type) {
                return types[i].header;
            }
        }

        return "Unknown";
    }

    //[#detectType] Detect the type of catch
    var detectType = function (str) {

        if (str.indexOf(" - ") > -1) {
            var parts = str.toString().split(" - ");
            if (parts.length > 1) {
                if (/^\d{1,2}:\d{2} ([ap]m)?$/.test(trim(parts[0]))) {
                    return "time";
                }
            }
        }
        else {
            for (var i = 0; i < types.length; i++) {
                if (str.toString().indexOf(types[i].criteria) > -1) {
                    return types[i].type;
                }
            }
            return "Others";
        }
    }

    //[#AddHoverText]
    var AddHoverText = function (text, HoverText) {
        return "<a href='#' onclick='return false;' title='" + HoverText + "'>" + text + "</a>";
    }

    /****************************************************************************************************************************************
    Summary Types and Headers. If the types are not defined here, they will never appear on the summary table. But, still, try to modify 
    only the usr_types only
    *****************************************************************************************************************************************/
    //[#types] define the types of catches
    var types = [
        {
            criteria: "caught a ",
            type: "caught",
            header: "Caught"
        },
        {
            criteria: "caught an ",
            type: "caught",
            header: "Caught"
        },
        {
            criteria: "replaced my bait",
            type: "stale",
            header: "FTA & Staled"
        },
        {
            criteria: "failed to attract",
            type: "FTA",
            header: "FTA"
        },
        {
            criteria: "without setting off",
            type: "FTC",
            header: "FTC"
        },
        {
            criteria: "Additionally",
            type: "looted",
            header: "Looted"
        },
        {
            criteria: "claimed a King's Reward",
            type: "KR",
            header: "King's Reward"
        },
        {
            criteria: "dropped the following loot",
            type: "loot",
            header: "Loot"
        }
    ];


    //[#usr_types] Types for custom columns for analysis. The order of display in the analysis section is dependant on this array
    var usr_types = [
        {
            type: "TotalHorns",
            header: AddHoverText("Total Horns", "Total Horns made"),
            unit: "",
            unitInFront: false
        },
        {
            type: "TotalCaught",
            header: AddHoverText("Total Caught", "Total mouse caught"),
            unit: "",
            unitInFront: false
        },
        {
            type: "RealFTA",
            header: AddHoverText("Total FTA", "Total Horn count that Fail To Attract"),
            unit: "",
            unitInFront: false
        },
        {
            type: "RealFTC",
            header: AddHoverText("Total FTC", "Total Horn count that Fail To Catch"),
            unit: "",
            unitInFront: false
        },
        {
            type: "CatchRate",
            header: AddHoverText("Total Catch %", "Mouse Catch Rate"),
            unit: "%",
            unitInFront: false
        },
        {
            type: "TrapCheckCatchRate",
            header: AddHoverText("Trap Check Catch Rate %", "% of which the Trap Check caught a mouse of the Total Catch %"),
            unit: "%",
            unitInFront: false
        },
        {
            type: "FTARate",
            header: AddHoverText("FTA %", "Fail to Attract Rate"),
            unit: "%",
            unitInFront: false
        },
        {
            type: "FTCRate",
            header: AddHoverText("FTC %", "Fail to Catch Rate"),
            unit: "%",
            unitInFront: false
        },
        {
            type: "PlusGold",
            header: AddHoverText("Gold Gained", "Total Gold Gained"),
            unit: "",
            unitInFront: false
        },
        {
            type: "MinusGold",
            header: AddHoverText("Gold Lost", "Total Gold lost"),
            unit: "",
            unitInFront: false
        },
        {
            type: "PlusPoints",
            header: AddHoverText("Points Gained", "Total Points Gained"),
            unit: "",
            unitInFront: false
        },
        {
            type: "MinusPoints",
            header: AddHoverText("Points Lost", "Total Points Lost"),
            unit: "",
            unitInFront: false
        },
        {
            type: "BaitLooted",
            header: AddHoverText("Bait Stolen", "Total no. of cheese stolen"),
            unit: " Cheese",
            unitInFront: false
        },
        {
            type: "AgvGoldPerCatch",
            header: AddHoverText("Avg Gold Per Catch", "Average gold earned per mouse"),
            unit: "",
            unitInFront: false
        },
        {
            type: "AgvPtsPerCatch",
            header: AddHoverText("Avg Points Per Catch", "Average points earned per mouse"),
            unit: "",
            unitInFront: false
        }
    ];
}



/**********************************************************************************************************************************************************
[#page_load]
Perform Loading of the scripts required
**********************************************************************************************************************************************************/
//Sorting Scripts
if (allowSorting) {
    if (
        window.location.href.indexOf(".facebook.com/mousehunt/inventory.php?tab=0") != -1 ||
        window.location.href.indexOf(".facebook.com/mousehunt/inventory.php?tab=1") != -1 ||
        window.location.href.indexOf(".facebook.com/mousehunt/inventory.php?tab=4") != -1 ||
        window.location.href.indexOf(".facebook.com/mousehunt/inventory.php?tab=5") != -1 ||

        window.location.href.indexOf(".mousehuntgame.com/canvas/inventory.php?tab=0") != -1 ||
        window.location.href.indexOf(".mousehuntgame.com/canvas/inventory.php?tab=1") != -1 ||
        window.location.href.indexOf(".mousehuntgame.com/canvas/inventory.php?tab=4") != -1 ||
        window.location.href.indexOf(".mousehuntgame.com/canvas/inventory.php?tab=5") != -1
    ) {
        try {
            var plugin = new plugins.itemSorter();
            plugin.sortAll();
        } catch (e) {
            alert(e.Description);
        }
    }
}


//Seasonal Garden Script
if (window.location.href == "http://apps.facebook.com/mousehunt/" ||
		window.location.href == "http://apps.facebook.com/mousehunt/#" ||
		window.location.href.indexOf(".facebook.com/mousehunt/?") != -1 ||
		window.location.href.indexOf(".facebook.com/mousehunt/index.php") != -1 ||
		window.location.href.indexOf(".facebook.com/mousehunt/mousehunt/index.php") != -1 ||
		window.location.href.indexOf(".facebook.com/mousehunt/turn.php") != -1) {

    var headerElement = document.getElementById('app10337532241_noscript');
    if (headerElement) {

        var id = "divSeasonalGardenTracker";
        var container = document.createElement('div');

        container.setAttribute("id", id);
        headerElement.parentNode.insertBefore(container, headerElement);

        try {
            var plugin = new plugins.SeasonalGarden();
            window.SeasonalGarden = plugin;
            plugin.load();
        }
        catch (e) {
            alert(e.Description);
        }
    }
}

//Manalytics Script
if (
    window.location.href.indexOf(".facebook.com/mousehunt/journal.php") != -1 ||
    window.location.href.indexOf("mousehuntgame.com/canvas/journal.php") != -1
) {
    try {
        var plugin = new plugins.Manalytics();
        plugin.createAnaylzeButton();
    } catch (e) {
        alert(e.Description);
    }
}

//Create update button and the version footer
createScriptUpdateButton();
createPluginFooter();