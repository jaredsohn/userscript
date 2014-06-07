// ==UserScript==
// @name           DZone - AllInOne
// @description    Minimal display, Save last displayed entry, Open links in new tab, Redirect links automatically.
// @namespace      http://david.didier.name/gmscripts/
// @include        http://www.dzone.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// Versions:
// 1. initial script with "minimal display", "last displayed" and menu with options.
// 2. added "Open links in new tab", and "Redirect links automatically".
// 3. fixed "Open links in new tab".
// 4. 

if (!window.NDD)                { window.NDD                = {}; }
if (!window.NDD.gm)             { window.NDD.gm             = {}; }
if (!window.NDD.gm.dzone)       { window.NDD.gm.dzone       = {}; }
if (!window.NDD.gm.dzone.apply) { window.NDD.gm.dzone.apply = {}; }
if (!window.NDD.gm.dzone.conf)  { window.NDD.gm.dzone.conf  = {}; }
if (!window.NDD.gm.dzone.menu)  { window.NDD.gm.dzone.menu  = {}; }
if (!window.NDD.gm.dzone.util)  { window.NDD.gm.dzone.util  = {}; }





/***********************************************************************************************************************
 Configuration
***********************************************************************************************************************/

if (!window.NDD.gm.dzone.conf.minimalDisplay)  { window.NDD.gm.dzone.conf.minimalDisplay  = {}; }
if (!window.NDD.gm.dzone.conf.lastDisplayed)   { window.NDD.gm.dzone.conf.lastDisplayed   = {}; }
if (!window.NDD.gm.dzone.conf.newTab)          { window.NDD.gm.dzone.conf.newTab          = {}; }
if (!window.NDD.gm.dzone.conf.redirect)        { window.NDD.gm.dzone.conf.redirect        = {}; }

NDD.gm.dzone.conf.minimalDisplay.enabled        = GM_getValue("minimalDisplay.enabled", true);
NDD.gm.dzone.conf.minimalDisplay.hidePageTitle  = GM_getValue("minimalDisplay.hidePageTitle", true);
NDD.gm.dzone.conf.minimalDisplay.hideThumbnails = GM_getValue("minimalDisplay.hideThumbnails", true);

NDD.gm.dzone.conf.lastDisplayed.enabled         = GM_getValue("lastDisplayed.enabled", true);

NDD.gm.dzone.conf.newTab.enabled                = GM_getValue("newTab.enabled", true);

NDD.gm.dzone.conf.redirect.enabled              = GM_getValue("redirect.enabled", true);





/***********************************************************************************************************************
 Menu
***********************************************************************************************************************/

if (!window.NDD.gm.dzone.menu.minimalDisplay)  { window.NDD.gm.dzone.menu.minimalDisplay  = {}; }
if (!window.NDD.gm.dzone.menu.lastDisplayed)   { window.NDD.gm.dzone.menu.lastDisplayed   = {}; }
if (!window.NDD.gm.dzone.menu.newTab)          { window.NDD.gm.dzone.menu.newTab          = {}; }
if (!window.NDD.gm.dzone.menu.redirect)        { window.NDD.gm.dzone.menu.redirect        = {}; }

NDD.gm.dzone.menu.minimalDisplay.toggle = function()
{
    NDD.gm.dzone.conf.minimalDisplay.enabled = !NDD.gm.dzone.conf.minimalDisplay.enabled;
    GM_setValue("minimalDisplay.enabled", NDD.gm.dzone.conf.minimalDisplay.enabled);
    document.location.reload();
}

NDD.gm.dzone.menu.minimalDisplay.togglePageTitle = function()
{
    NDD.gm.dzone.conf.minimalDisplay.hidePageTitle = !NDD.gm.dzone.conf.minimalDisplay.hidePageTitle;
    GM_setValue("minimalDisplay.hidePageTitle", NDD.gm.dzone.conf.minimalDisplay.hidePageTitle);
    document.location.reload();
}

NDD.gm.dzone.menu.minimalDisplay.toggleThumbnails = function()
{
    NDD.gm.dzone.conf.minimalDisplay.hideThumbnails = !NDD.gm.dzone.conf.minimalDisplay.hideThumbnails;
    GM_setValue("minimalDisplay.hideThumbnails", NDD.gm.dzone.conf.minimalDisplay.hideThumbnails);
    document.location.reload();
}

NDD.gm.dzone.menu.lastDisplayed.toggle = function()
{
    NDD.gm.dzone.conf.lastDisplayed.enabled = !NDD.gm.dzone.conf.lastDisplayed.enabled;
    GM_setValue("lastDisplayed.enabled", NDD.gm.dzone.conf.lastDisplayed.enabled);
    document.location.reload();
}

NDD.gm.dzone.menu.newTab.toggle = function()
{
    NDD.gm.dzone.conf.newTab.enabled = !NDD.gm.dzone.conf.newTab.enabled;
    GM_setValue("newTab.enabled", NDD.gm.dzone.conf.newTab.enabled);
    document.location.reload();
}

NDD.gm.dzone.menu.redirect.toggle = function()
{
    NDD.gm.dzone.conf.redirect.enabled = !NDD.gm.dzone.conf.redirect.enabled;
    GM_setValue("redirect.enabled", NDD.gm.dzone.conf.redirect.enabled);
    document.location.reload();
}



GM_registerMenuCommand((NDD.gm.dzone.conf.minimalDisplay.enabled ? "Disable" : "Enable") + " minimal display", NDD.gm.dzone.menu.minimalDisplay.toggle);

if (NDD.gm.dzone.conf.minimalDisplay.enabled)
{
    GM_registerMenuCommand("      " + (NDD.gm.dzone.conf.minimalDisplay.hidePageTitle ? "Show" : "Hide") + " page title", NDD.gm.dzone.menu.minimalDisplay.togglePageTitle);
    GM_registerMenuCommand("      " + (NDD.gm.dzone.conf.minimalDisplay.hideThumbnails ? "Show" : "Hide") + " thumbnails", NDD.gm.dzone.menu.minimalDisplay.toggleThumbnails);
}

GM_registerMenuCommand((NDD.gm.dzone.conf.lastDisplayed.enabled ? "Disable" : "Enable") + " last displayed", NDD.gm.dzone.menu.lastDisplayed.toggle);
GM_registerMenuCommand((NDD.gm.dzone.conf.newTab.enabled ? "Disable" : "Enable") + " open in new tab", NDD.gm.dzone.menu.newTab.toggle);
GM_registerMenuCommand((NDD.gm.dzone.conf.redirect.enabled ? "Disable" : "Enable") + " automatic redirect", NDD.gm.dzone.menu.redirect.toggle);





/***********************************************************************************************************************
 Utilities
***********************************************************************************************************************/

NDD.gm.dzone.util.isIndexOrQueue = function()
{
    return (document.location == "http://www.dzone.com/links/index.html")
        || (document.location == "http://www.dzone.com/links/queue.html")
}





/***********************************************************************************************************************
 Minimal Display
***********************************************************************************************************************/

NDD.gm.dzone.apply.minimalDisplay = function()
{
    jQuery("#announcements").hide();
    jQuery("#globalmenu").hide();
    jQuery("#head").hide();
    jQuery("#left").hide();

    if (NDD.gm.dzone.conf.minimalDisplay.hidePageTitle) {
        // Hide the pageTitle links
        jQuery("#pageTitle").hide();

        // Re-size the main content div so that it fills the page
        jQuery("#content").css("left", 0).css("top", 0);
    }
    else {
        // Move the pageTitle links to the top left. e.g. Recently Promoted, Top in 24 Hours etc
        jQuery("#pageTitle").css("left", 0).css("top", 0).css("margin", 0);

        // Re-size the main content div so that it fills the page
        jQuery("#content").css("left", 0).css("top", 55);
    }

    GM_addStyle("\
        div.linkblock                                       { margin:0; padding:0; }               \
        div.linkblock.queue                                 { margin:0; padding:0; }               \
            div.linkblock div.details                       { padding-left: 10px; }                \
                div.vwidget                                 { height: 20px; width: 80px; }         \
                    a.upcount, a.downcount                  { display: inline; }                   \
                p.voteblock                                 { display: none; }                     \
                p.fineprint.byline                          { display: none; }                     \
                p.fineprint.byline + p.fineprint.byline     { display: inline; }                   \
                p.fineprint.byline + p.fineprint.byline b   { display: none; }                     \
                p.fineprint.stats                           { display: none; }                     \
                p.description                               { display: inline; margin-top: 0; }    \
                a:visited                                   { background-color: #FDD; color: red; }\
    ");

    if (NDD.gm.dzone.conf.minimalDisplay.hideThumbnails) {
        GM_addStyle("div.thumb { display: none; }");
    }
}





/***********************************************************************************************************************
 Last displayed
***********************************************************************************************************************/

NDD.gm.dzone.apply.lastDisplayed = function()
{
    var lastDisplayed = GM_getValue("lastDisplayed.value");
    var lastDisplayedString = "Not initialized";

    if (lastDisplayed)
    {
        lastDisplayedString = lastDisplayed;
    }

    var dateElement = jQuery(".linkblock:first .details .fineprint.byline")[1];
    var dateElementContent = jQuery(dateElement).html().trim();
    var regExp = new RegExp("\\w*\\. \\d* / \\d{2}:\\d{2}\\.","g");
    var found = regExp.exec(dateElementContent);
    var lastDisplayed;

    if (found && found.length == 1)
    {
        lastDisplayed = found[0];
    }

    GM_setValue("lastDisplayed.value", lastDisplayed);
    jQuery("#content-inner").before("<h3 class='lastDisplayed'>Last displayed: <em>" + lastDisplayedString + "</em></h3>");

    GM_addStyle("\
        .lastDisplayed    { background-color:#CCF; padding:5px; }   \
        .lastDisplayed em { font-size: 130%; font-weight: bold; } \
    ");
}





/***********************************************************************************************************************
 New tab
***********************************************************************************************************************/

NDD.gm.dzone.apply.newTab = function()
{
    jQuery("div.thumb a").add("div.details a[rel='bookmark']").attr("target", "_new");
}





/***********************************************************************************************************************
 Redirect
***********************************************************************************************************************/

NDD.gm.dzone.apply.redirect = function()
{
    jQuery(document).ready(function()
    {
        var link = jQuery("div.ldTitle a")[0];
        location.href = link.href;
    });
}





/***********************************************************************************************************************
 Apply
***********************************************************************************************************************/

if (NDD.gm.dzone.util.isIndexOrQueue() && NDD.gm.dzone.conf.minimalDisplay.enabled)
{
    NDD.gm.dzone.apply.minimalDisplay();
}

if (NDD.gm.dzone.util.isIndexOrQueue() && NDD.gm.dzone.conf.lastDisplayed.enabled)
{
    NDD.gm.dzone.apply.lastDisplayed();
}

if (NDD.gm.dzone.util.isIndexOrQueue() && NDD.gm.dzone.conf.newTab.enabled)
{
    NDD.gm.dzone.apply.newTab();
}

if (!NDD.gm.dzone.util.isIndexOrQueue() && NDD.gm.dzone.conf.redirect.enabled)
{
    NDD.gm.dzone.apply.redirect();
}
