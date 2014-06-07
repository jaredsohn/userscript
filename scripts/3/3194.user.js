// $Id: tighttvgrid.user.js 543 2013-02-01 01:04:26Z Chris $
// -----------------------------------------------------------------------------
// This is a Greasemonkey user script.
// To use it, first install Greasemonkey: http://www.greasespot.net/
// Then restart Firefox and revisit this script
// From the Firefox menu select: Tools -> Install User Script
// Accept the default configuration and install
// Now when you visit any of the supported sites you will see extra functionality
// Documentation here: http://refactoror.net/greasemonkey/TightTVGrid/doc.html
// -----------------------------------------------------------------------------

// ==UserScript==
// @name         Tight TV Grid
// @moniker      ttg
// @namespace    http://refactoror.net/
// @description  Operates on multiple TV listings services. Removes content surrounding the listing grid and adds an IMDb link in front of each program title.
// @version      3.0.2.1
// @author       Chris Noe
// @include      http://www.excite.com/tv/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @grant        GM_log
// @grant        GM_xmlhttpRequest
// ==/UserScript==

var dm = new DomMonkey({
   name : "Tight TV Grid"
  ,moniker : "ttg"
  ,version : "3.0.2.1"
});


// The values listed here are the first-time-use defaults
// They have no effect once they are stored as mozilla preferences.
prefs.config({
    "controlBar-isExpanded":    false
    ,"favoredTitles":           ""
    ,"favoredTitlesColor":      "#FF9900"
    ,"favoriteTitles":          ""
    ,"favoriteTitlesColor":     "#FFFF00"
    ,"fixedHeader":             true
    ,"highlightFirstRun":       true
    ,"ignoreTitles":            ""
    ,"ignoreTitlesColor":       "#996666"
    ,"insertImdbLinks":         true
    ,"insertTvcomLinks":        true
    ,"linksAlwaysOpenInNewTab": true
    ,"omitChannels":            ""
    ,"prefsMenuAccessKey":      "P"
    ,"prefsMenuPosition":       "BR"
    ,"prefsMenuVisible":        true
    ,"refreshMinute":           3
    ,"removeGridAds":           true
    ,"removeNonGridElements":   true
    ,"searchTitleActor-isExpanded": false
    ,"showTimeMarker":          true
    ,"tweakLayout":             true
});


// --------------- Page handlers ---------------

tryCatch(dm.metadata["moniker"], function () {
    enhanceExciteListingPage();
});


function enhanceExciteListingPage()
{
    if (dm.xdoc.location.href.match("grid.jsp") == null) {
        log.info("This is not the grid page, no processing...");
        return;
    }

    var exciteDoc = extendListingDocument(dm.xdoc);

    if (exciteDoc == null)
        return null;

    if (exciteDoc.isEmpty()) {
        // failed page load re-try
        exciteDoc.schedulePageRefresh(1);
        return null;
    }
    else {
        // refresh on the upcoming hour
        exciteDoc.scheduleUpcomingHourRefresh(prefs.get("refreshMinute"), function() {
            window.location.reload();
        });
    }

    var programTypeMap = new Array();
    exciteDoc.foreachNode(
        "//*[text()='Color Key']/following::table[1]//tr[position()!=1]/td",
        function(td) {
            programTypeMap[td.bgColor] = td.textContent;
        }
    );

    dispatchFeature("removeNonGridElements", function() {
//         exciteDoc.isolateNode("//form[@name='gridform']/ancestor::center[1]");

        // -- top of page
        // search bar
        exciteDoc.hideNodes("//select[@name='featuredguides']/ancestor::table[4]");
        // nav bar
        exciteDoc.hideNodes("//a[contains(@href, 'entertainment.excite.com')]/ancestor::table[2]");
        // title row
        exciteDoc.hideNodes("//a[contains(@href, 'tv/data.jsp')]/ancestor::table[1]");

        // -- bottom of page
        // search title/actor
        exciteDoc.selectNode("//*[text()='Search by Title or Actor']/ancestor::p[1]")
            .makeCollapsible("searchTitleActor-isExpanded", true);
        // color key
        exciteDoc.hideNodes("//*[text()='Color Key']/ancestor::p[1]");
        // ad
        exciteDoc.hideNodes("//div[@id='adFooter']/ancestor::table[1]");
        // web search bar
        exciteDoc.hideNodes("//form[@name='footerSearch']/ancestor::table[3]");
        // sitemap
        exciteDoc.hideNodes("//a[contains(@href, 'site_map/index.html')]/ancestor::table[1]");
        // extra spacing
        exciteDoc.hideNodes("//br");

        // channel-type section dividers
        exciteDoc.hideNodes("//*[@bgcolor='White']/ancestor::tr[1]");
        exciteDoc.hideNodes("//*[text()='Basic Channels']/ancestor::tr[1]");
    });

    exciteDoc.selectNode("//form[@name='gridform']/ancestor::table[1]")
        .makeCollapsible("controlBar-isExpanded", true);

    dispatchFeature("fixedHeader", function()
    {
        // -EXPERIMENTAL-
        var grid_table = exciteDoc.selectNode(
            "//a[starts-with(@href, 'http://www.excite.com/tv/grid.jsp')][1]/ancestor::table[1]");
        // make grid body scrollable
        exciteDoc.addStyle(
            "#grid_body tr td:last-child { padding-right: 18px; }\n"
        );
        var tbody = grid_table.selectNode("descendant::tbody[1]");
        tbody.id = "grid_body";
        with (tbody.style) {
             height = "500px";
             overflowX = "hidden";
             overflowY = "auto";
        }
        // move header row into thead element
        var header_tr = tbody.selectNode("descendant::tr[1]");
        var thead = exciteDoc.createXElement("thead");
        header_tr.remove();
        thead.appendChild(header_tr);
        grid_table.prependChild(thead);
    });


    var channelMatchers = prefs.getAsList("omitChannels", ";", ChannelMatcher);
    if (channelMatchers != null && channelMatchers != "")
    {
        // remove specified channels
        exciteDoc.foreachNode
        (
            "//a[starts-with(@href, 'http://my.excite.com/tv/chan.jsp')]/text()",
            function(channelName_text)
            {
                var chanParts = channelName_text.textContent.split(" ");
                var isOmit = false;
                for (var c in channelMatchers)
                {
                    for (var p in chanParts) {
                        if (channelMatchers[c].match(chanParts[p])) {
                            try {
                                var chan_tr = channelName_text.selectNode("ancestor::tr[1]");
                                chan_tr.remove();
                            }
                            catch(err) {
                                log.info("Trying to delete '" + channelName_text.textContent
                                + "', row previously deleted");
                            }
                            break;
                        }
                    }
                }
                if (isOmit == true) {
                }
            }
        );
    }

    // encapsulates a channel spec value (name/number/range) and requisite match() method
    function ChannelMatcher(chanSpec)
    {
        var i = chanSpec.toString().indexOf("-");
        if (i > 0) {
            // range matcher
            this.lo = parseInt(chanSpec.substring(0, i));
            this.hi = parseInt(chanSpec.substring(i + 1));
            this.match = function(chan) {
                var f = (chan >= this.lo && chan <= this.hi);
                return f;
            }
        }
        else {
            // simple equality matcher
            this.chanSpec = chanSpec;
            this.match = function(chan) {
                var f = (chan == this.chanSpec);
                return f;
            }
        }
    }

    var favoriteTitles = prefs.getAsList("favoriteTitles", ";");
    var favoredTitles = prefs.getAsList("favoredTitles", ";");
    var ignoreTitles = prefs.getAsList("ignoreTitles", ";");

    // process each title link in the grid
    var first_td = exciteDoc.selectNode("//a[starts-with(@href, 'http://www.excite.com/tv/grid.jsp')][1]/ancestor::td[1]");
    var last_td;
    exciteDoc.foreachNode
    (
        "//a[starts-with(@href, 'http://www.excite.com/tv/prog.jsp')]",
        function(programTitle_a)
        {
            var programAttrs = new Object();
            programAttrs.title = doUnescape(programTitle_a.textContent.normalizeWhitespace());

            var td = programTitle_a.selectNode("ancestor::td[1]");
            programAttrs.programType = programTypeMap[td.bgColor];

            var subTitle_i = programTitle_a.selectNodeNullable("following-sibling::i[1]");
            if (subTitle_i != null) {
                programAttrs.subTitle = subTitle_i.textContent;
            }

            var attributes = programTitle_a.selectNodeNullable("following-sibling::text()");
            if (attributes != null)
            {
                attributes = attributes.textContent.normalizeWhitespace();

                // get New/Repeat indicator, if present
                if (attributes.substring(0, 1) == "(") {
                    var i = attributes.indexOf(")");
                    if (i != -1) {
                        programAttrs.new_repeat = attributes.substring(1, i);
                        attributes = attributes.substring(i+1).trimWhitespace();
                    }
                }

                // get remaining attributes
                tokens = attributes.split(",");
                var t = 0;
                if (programAttrs.programType == "Movies") {
                    programAttrs.isMovie = true;
                    programAttrs.year = attributes.match(/\d\d\d\d/);
                    programAttrs.runtime = attributes.match(/\d\d:\d\d/);
                }
                else {
                    if (tokens[t])
                        programAttrs.subcat = tokens[t].trimWhitespace();
                    if (tokens[++t])
                        programAttrs.subsubcat = tokens[t].trimWhitespace();
                }
// if (programAttrs.programType == "Movies") {
// var buf = "";
// for (var term in programAttrs) {
//     buf += term + "=" + programAttrs[term] + " ";
// }
// log.info(buf);
// }
            }

            exciteDoc.insertLinks(programTitle_a, programAttrs);

            if (favoriteTitles != null && favoriteTitles.contains(programAttrs.title)) {
                programTitle_a.style.backgroundColor = prefs.get("favoriteTitlesColor");
            }
            if (favoredTitles != null && favoredTitles.contains(programAttrs.title)) {
                programTitle_a.style.backgroundColor = prefs.get("favoredTitlesColor");
            }
            if (ignoreTitles != null && ignoreTitles.contains(programAttrs.title)) {
                programTitle_a.style.color = prefs.get("ignoreTitlesColor");
            }
            dispatchFeature("highlightFirstRun", function() {
                if (programAttrs.new_repeat == "New") {
                    programTitle_a.style.fontWeight = "bold";
                    programTitle_a.style.fontSize = "120%";
                }
            });
            last_td = programTitle_a.selectNode("ancestor::td[1]");
        }
    );

    // (this has to be the last modification to the grid structure)
    dispatchFeature("showTimeMarker", function()
    {
        var gridLeftNav_a = exciteDoc.selectNode(
            "//a[starts-with(@href, 'http://www.excite.com/tv/grid.jsp')][1]");
        var hour1_00_text = gridLeftNav_a.selectNode("following::text()[1]");
        var gridStartDate = parseGridTime(hour1_00_text.textContent);

        var hour1_00_td = gridLeftNav_a.selectNode("ancestor::td[1]");
        var hour1_30_td = hour1_00_td.selectNode("following::td[1]");

        var ref_td = hour1_00_td;
        var rel_date = gridStartDate;
        if ( (new Date()).getMinutes() >= 30 ) {
            ref_td = hour1_30_td;
            rel_date.setMinutes(30);
        }

        var tm = new TimeMarker(
            ref_td, ref_td, ref_td, last_td,
            rel_date, 0.5 * HOUR
        );
        exciteDoc.body.appendChild(tm);
    });

    function parseGridTime(str)
    {
        var tim = str.trimWhitespace().split(" ");
        var hr_min = tim[0].split(":");
        var meridiem = 0;
        if (tim[1] == "PM" && Number(hr_min[0]) < 12)
            meridiem = 12;
        var gridDate = new Date();
        gridDate.setHours( (Number(hr_min[0]) + meridiem), hr_min[1], 00, 000);

        return gridDate;
    }
}


function extendListingDocument(doc)
{
    if (doc == null)
        return null;

    addPrefsButton();

    // Refresh this page on the upcoming hour, plus the specified number of minutes.
    // (Disabled if negative)
    doc.scheduleUpcomingHourRefresh = function(refreshMinute, func)
    {
        if (refreshMinute < 0) {
            log.info("Not configured for auto-refresh");
            return;
        }
        var now = new Date();
        var refreshTime = now.floor(HOUR).add(HOUR).add(refreshMinute * MINUTE);

        window.setTimeout(func, (refreshTime.getTime() - now.getTime()) );
        log.info("Scheduled page refresh: " + refreshTime);
    }

    // Refresh this page in the the specified number of minutes.
    doc.schedulePageRefresh = function(refreshMinute, func)
    {
        var now = new Date();
        var refreshTime = now.add(refreshMinute * MINUTE);

        window.setTimeout(
            function() { window.location.reload(); },
            (refreshTime.getTime() - now.getTime())
        );
        log.info("Scheduled page refresh: " + refreshTime);
    }

    // insert external search link(s) in front of the specified node
    doc.insertLinks = function(base_node, programAttrs)
    {
        var theDoc = this;
        dispatchFeature("insertImdbLinks", function()
        {
            var imdbLink = createExternalLink("http://www.imdb.com/favicon.ico");
            var IMDB_SEARCH_TT = "http://imdb.com/find?s=tt&q=";
            var IMDB_SEARCH_EP = "http://imdb.com/find?s=ep&q=";
//            var IMDB_SEARCH = "http://www.google.com/search?ie=UTF-8&oe=UTF-8&sourceid=navclient&gfns=1&q=";

            var year = "";
            if (programAttrs.year != null) {
                year = " (" + programAttrs.year + ")";
            }

            if (programAttrs.subTitle != null) {
                // episode search
                imdbSearchTerm = programAttrs.subTitle;
                imdbLink.title = "Search for episode " + imdbSearchTerm + " on imdb.com";
                base_node.prependSibling(theDoc.createLink(
                    imdbLink, IMDB_SEARCH_EP + doEscape(imdbSearchTerm) ));
            }
            else {
                // title search
                imdbSearchTerm = programAttrs.title;
            	imdbLink.title = "Search for " + imdbSearchTerm + " on imdb.com";
                base_node.prependSibling(theDoc.createLink(
                    imdbLink, IMDB_SEARCH_TT + doEscape(imdbSearchTerm) ));
            }
        });

        dispatchFeature("insertTvcomLinks", function()
        {
        	var tvcomLink = createExternalLink("http://www.tv.com/favicon.ico");
            var TVCOM_SEARCH = "http://www.tv.com/search.php?type=11&stype=all&tag=search;button&qs=";

            tvcomTerm = '"' + programAttrs.title + '"';
        	tvcomLink.title = "Search for " + tvcomTerm + " on tv.com";
            if (programAttrs.isMovie != true) {
                base_node.prependSibling(
                    theDoc.createLink(tvcomLink, TVCOM_SEARCH + tvcomTerm));
            }
        });

        function createExternalLink(url)
        {
        	var img = document.createXElement('img', { src: url });
        	with (img.style) {
            	border = 0;
            	width = "16px";
            	height = "14px";
            	verticalAlign = "-25%";
            }
            return img;
        }
    }

    doc.createLink = function(symbol, url)
    {
        var lookup_a = this.createXElement("a");
        lookup_a.className = "lookup_a";
        lookup_a.href = url;
        lookup_a.appendChild(symbol);

        if (prefs.get("linksAlwaysOpenInNewTab") == true) {
            lookup_a.target = "_blank";
        }

        return lookup_a;
    }

    return doc;
}


// ==================== TimeMarker object ====================

// Install a real-time time indicator over the grid
function TimeMarker(topRefNode, leftRefNode, rightRefNode, bottomRefNode, startTime, duration)
{
    var topY = topRefNode.findPosY();
    var bottomY = bottomRefNode.findPosY() + bottomRefNode.clientHeight;
    var heightY = bottomY - topY;

    var leftX = leftRefNode.findPosX();
    var rightX = rightRefNode.findPosX() + rightRefNode.clientWidth;
    var widthX = rightX - leftX;

    var timemarker_div = document.createElement("div");
    timemarker_div.id = "ttg_timemarker";
    with (timemarker_div.style) {
        border = ".75px dashed red";
        position = "absolute";
        top = topY;
        height = heightY;
        zIndex = 99;
    }

    this.refresh = function()
    {
        var xleft  = leftRefNode.findPosX();
        var xright = rightRefNode.findPosX() + rightRefNode.clientWidth;

        var now = new Date();
        var hourFrac = (now.getTime() - startTime.getTime()) / duration;
        var x = xleft + Math.floor(hourFrac * (xright - xleft));

        timemarker_div.style.left = x;
        timemarker_div.title = formatGridTime(now);
    }
    this.refresh();

    window.setInterval(this.refresh, 5000);
    window.addEventListener("resize", this.refresh, false);

    return timemarker_div;
}

function formatGridDate(gridtime)
{
    var s = gridtime.toDateString().split(" ");
    return s[0] + ", " + s[1] + " " + s[2];
}

function formatGridTime(gridtime)
{
    var d = new Date(gridtime);
    var h = d.getHours();
    var xm = "am";
    if (h > 12) {
        h -= 12;
        xm = "pm";
    }
    var m = "0" + d.getMinutes();
    return h + ":" + m.substring(m.length - 2) + xm;
}


// ==================== Preferences Dialog ====================

function addPrefsButton()
{
    configurePrefsButton(function(prefsMgr, prefsDialog_div)
    {
        var mainTabset = new TabSet(dm.xdoc, "ttg_mainTabset", ["General", "Highlighting"]);
        prefsDialog_div.appendChild(mainTabset.container_div);

        with (mainTabset.getTabContent_div("General"))
        {
            var table = dm.xdoc.createXElement("table");
            appendChild(table);

            var tr = dm.xdoc.createXElement("tr");
            table.appendChild(tr);

            var td = dm.xdoc.createXElement("td");
            td.style.verticalAlign = "top";
            tr.appendChild(td);
            with (td)
            {
                style.verticalAlign = "top";
                var gridFeatures_div = dm.xdoc.createTopicDiv("Grid Layout", td);
                appendChild(gridFeatures_div);
                with (gridFeatures_div.contentElement)
                {
                    appendChild(prefsMgr.createPreferenceInput(
                        "removeNonGridElements",
                        "Isolate listing grid",
                        "Remove content surrounding the listing grid"
                    ));
                    appendChildElement("br");
                    appendChild(prefsMgr.createPreferenceInput(
                        "fixedHeader",
                        "Fixed header",
                        "Grid content scroll independently of header"
                    ));
                    appendChildElement("br");
                    appendChild(prefsMgr.createPreferenceInput(
                        "tweakLayout",
                        "Tweak layout",
                        "Adjust font styles, etc"
                    ));
                    appendChildElement("br");
                    appendChild(prefsMgr.createPreferenceInput(
                        "showTimeMarker",
                        "Show current time",
                        "Indicate the current time as a vertical dashed line over the grid"
                    ));
                    var div = appendChildText("Remove Channels:", ["div"]);
                    div.style.marginTop = "5px";
                    appendChild(prefsMgr.createPreferenceInput(
                        "omitChannels", null,
                        "Remove these channels from the grid",
                        { size: 24 }
                    ));
                }

                var linkFeatures_div = dm.xdoc.createTopicDiv("External Links", td);
                appendChild(linkFeatures_div);
                with (linkFeatures_div.contentElement)
                {
                    appendChild(prefsMgr.createPreferenceInput(
                        "insertImdbLinks",
                        "Add imdb.com links",
                        "Add an imdb.com search link in front of each program title"
                    ));
                    appendChildElement("br");
                    appendChild(prefsMgr.createPreferenceInput(
                        "insertTvcomLinks",
                        "Add tv.com links",
                        "Add a tv.com search link in front of each program title"
                    ));
                    appendChildElement("br");
                    appendChild(prefsMgr.createPreferenceInput(
                        "linksAlwaysOpenInNewTab",
                        "Links open in a new tab",
                        ""
                    )).style.marginLeft = "16px";
                }
            }

            var td = dm.xdoc.createXElement("td");
            td.style.verticalAlign = "top";
            tr.appendChild(td);
            with (td) {
                var miscFeatures_div = dm.xdoc.createTopicDiv("Miscellaneous", td);
                appendChild(miscFeatures_div);
                with (miscFeatures_div.contentElement)
                {
                    appendChild(prefsMgr.createPreferenceInput(
                        "removeGridAds",
                        "Remove advertising",
                        "Remove advertising"
                    ));
                    with (appendChildElement("div")) {
                        style.margin = "2px";
                    }
                    appendChild(prefsMgr.createPreferenceInput(
                        "refreshMinute",
                        "Auto-refresh minute",
                        "Refresh the listing these many minutes after each hour",
                        { size:1, maxLength: 2 }
                    ));
                }

                appendChild(prefsMgr.constructDockPrefsMenuSection(td));
                appendChild(prefsMgr.constructAdvancedControlsSection(td));
            }
        }

        with (mainTabset.getTabContent_div("Highlighting"))
        {
            appendChild(prefsMgr.createPreferenceInput(
                "highlightFirstRun",
                "Emphasize first run programs",
                "Emphasize first run program titles (bold)"
            ));

            var highFeatures_div = dm.xdoc.createTopicDiv("Customize Program Titles", prefsDialog_div);
            appendChild(highFeatures_div);
            with (highFeatures_div.contentElement)
            {
                var tabset = new TabSet(dm.xdoc, "iwvr_highlightingTabset",
                        ["Favorites", "Favored", "Ignored"]);
                appendChild(tabset.container_div);

                var tips = " (enter exact title spelling, separate multiple titles with ;)";
                with (tabset.getTabContent_div("Favorites"))
                {
                    appendChild(prefsMgr.createPreferenceInput(
                        "favoriteTitles", null,
                        "Highlight these titles" + tips,
                        { rows: 6, cols: 25 }
                    ));
                    appendChild(prefsMgr.createPreferenceInput(
                        "favoriteTitlesColor",
                        "Color", "",
                        { size:7 }
                    ));
                }
                with (tabset.getTabContent_div("Favored"))
                {
                    appendChild(prefsMgr.createPreferenceInput(
                        "favoredTitles", null,
                        "Highlight these titles, more subtly" + tips,
                        { rows: 6, cols: 25 }
                    ));
                    appendChild(prefsMgr.createPreferenceInput(
                        "favoredTitlesColor",
                        "Color", "",
                        { size:7 }
                    ));
                }
                with (tabset.getTabContent_div("Ignored"))
                {
                    appendChild(prefsMgr.createPreferenceInput(
                        "ignoreTitles", null,
                        "De-emphasize these titles" + tips,
                        { rows: 6, cols: 25 }
                    ));
                    appendChild(prefsMgr.createPreferenceInput(
                        "ignoreTitlesColor",
                        "Color", "",
                        { size:7 }
                    ));
                }
                tabset.initialize();
            }
        }
        mainTabset.initialize();

        // Help link
        var docs_div = dm.xdoc.createXElement("div");
        prefsDialog_div.appendChild(docs_div);
        with (docs_div) {
            appendChild(dm.xdoc.createHtmlLink(
                "http://refactoror.com/greasemonkey/TightTVGrid/doc.html#prefs",
                "Help"
            ));
            align = "center";
            style.padding = "3px";
        }
    });
}


// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-= refactoror lib -=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

// common logic for the way I like to setup Preferences in my apps
// Requires preferences: prefsMenuAccessKey, prefsMenuPosition, prefsMenuVisible, loggerLevel
function configurePrefsButton(dialogConstructor)
{
    // Preferences dialog
    GM_registerMenuCommand(dm.metadata["name"] + " Preferences...", openPrefsDialog); 
    createPrefsButton();

    // Prefs dialog
    function createPrefsButton()
    {
        var menuButton = dm.xdoc.createXElement("button", { textContent: "Prefs" });
        setScreenPosition(menuButton, prefs.get("prefsMenuPosition"));
        if (prefs.get("prefsMenuVisible") == false) {
            menuButton.style.opacity = 0; // active but not visibile
            menuButton.style.zIndex = -1; // don't block other content
        }

        with (menuButton) {
            id = dm.metadata["moniker"] + "_prefs_menu_button";
            title = dm.metadata["name"] + " Preferences";
            style.fontSize = "9pt";
            addEventListener('click', openPrefsDialog, false);
//            accessKey = getDeconflicted("prefsMenuAccessKey", "accessKey");
            accessKey = prefs.get("prefsMenuAccessKey");
        }
        if (dm.xdoc.body != null) {
            dm.xdoc.body.appendChild(menuButton);
        }
    }

    function getDeconflicted(prefsName, attrName)
    {
        var prefValue = prefs.get(prefsName);
        var node = xdoc.selectNodeNullable("//*[@" + attrName + "='" + prefValue + "']");
        if (node != null) {
            log.warn("Conflict: <" + node.nodeName + "> element on this page is already using "
              + attrName + "=" + prefValue);
            prefValue = null;
        }
        return prefValue;
    }

    // Prefs dialog
    function openPrefsDialog(event)
    {
        var prefsMgr = new PreferencesManager(
            dm.xdoc,
            dm.metadata["moniker"] + "_prefs",
            dm.metadata["name"] + " Preferences",
            { OK: function okPrefs(doc) { prefsMgr.storePrefs(); },
              Cancel: noop
            }
        );
        var prefsDialog_div = prefsMgr.open();
        if (prefsDialog_div == null)
            return;  // the dialog is already open

        prefsMgr.constructDockPrefsMenuSection = function(contextNode)
        {
            var prefsDock_div = dm.xdoc.createTopicDiv("Dock [Prefs] Menu", contextNode);
            contextNode.style.verticalAlign = "top";
            with (prefsDock_div.contentElement)
            {
                appendChild(prefsMgr.createPreferenceInput(
                    "prefsMenuVisible",
                    "Visible",
                    "Prefs menu button visible on the screen"
                ));
                with (appendChild(prefsMgr.createScreenCornerPreference("prefsMenuPosition"))) {
                    title = "Screen corner for [Prefs] menu button";
                    style.margin = "1px 0px 3px 20px";
                }
                appendChild(prefsMgr.createPreferenceInput(
                    "prefsMenuAccessKey",
                    "Access Key",
                    "Alt-Shift keyboard shortcut",
                    { size:1, maxLength: 1 }
                ));
            }
            return prefsDock_div;
        }

        prefsMgr.constructAdvancedControlsSection = function(contextNode)
        {
            var controls_div = dm.xdoc.createTopicDiv("Advanced Controls", contextNode);
            with (controls_div.contentElement)
            {
                appendChild(prefsMgr.createPreferenceInput(
                    "loggerLevel",
                    "Logging Level",
                    "Control level of information that appears in the Error Console",
                    null,
                    log.getLogLevelMap()
                ));
            }
            return controls_div;
        }

        dialogConstructor(prefsMgr, prefsDialog_div);
    }

    dispatchFeature("sendAnonymousStatistics", function() {
    	var counter_img = document.createElement("img");
    	counter_img.id = "refactoror.net_counter";
    	counter_img.src = "http://refactoror.net/spacer.gif?"
    		+ dm.metadata["moniker"] + "ver=" + dm.metadata["version"]
    		+ "&od=" + GM_getValue("odometer")
    	;
log.debug(counter_img.src + " :: location=" + document.location.href);
    	xdoc.body.appendChild(counter_img);
    });

    function getElapsed(name) {
        var prev_ms = parseInt(GM_getValue(name + "_ms", "0"));
        var now_ms = Number(new Date());
        GM_setValue(name + "_ms", now_ms.toString());

        return (now_ms - prev_ms);
    }
}


// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-= DOM Monkey -=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

/* Parses the script headers into the metadata object.
 * Adds constants & utility methods to various javascript objects.
 * Initializes the Preferences object.
 * Initializes the logger object.
 */
function DomMonkey(metadata)
{
    extendJavascriptObjects();

    // DM objects provided on the context

    this.xdoc = extendDocument(document);
    this.metadata = metadata;

    // The values listed here are the first-time-use defaults
    // They have no effect once they are stored as mozilla preferences.
    prefs = new Preferences({
        "loggerLevel":               "WARN"
        ,"sendAnonymousStatistics":  true
    });

    log = new Logger(this.metadata["version"]);

    GM_setValue("odometer", GM_getValue("odometer", 0) + 1);
}


// ==================== DOM object extensions ====================

/** Extend the given document with methods
* for querying and modifying the document object.
*/
function extendDocument(doc)
{
    if (doc == null)
        return null;

    /** Determine if the current document is empty.
    */
    doc.isEmpty = function() {
        return (this.body == null || this.body.childNodes.length == 0);
    };

    /** Report number of nodes that matach the given xpath expression.
    */
    doc.countNodes = function(xpath) {
        var n = 0;
        this.foreachNode(xpath, function(node) {
            n++;
        });
        return n;
    };

    /** Remove nodes that match the given xpath expression.
    */
    doc.removeNodes = function(xpath) {
        this.foreachNode(xpath, function(node) {
            node.remove();
        });
    };

    /** Hide nodes that match the given xpath expression.
    */
    doc.hideNodes = function(xpath)
    {
        if (xpath instanceof Array) {
            for (var xp in xpath) {
                this.foreachNode(xp, function(node) {
                    node.hide();
                });
            }
        }
        else {
            this.foreachNode(xpath, function(node) {
                node.hide();
            });
        }
    };

    /** Make visible the nodes that match the given xpath expression.
    */
    doc.showNodes = function(xpath) {
        this.foreachNode(xpath, function(node) {
            node.show();
        });
    };

    /** Retrieve the value of the node that matches the given xpath expression.
    */
    doc.selectValue = function(xpath, contextNode)
    {
        if (contextNode == null)
            contextNode = this;

        var result = this.evaluate(xpath, contextNode, null, XPathResult.ANY_TYPE, null);
        var resultVal;
        switch (result.resultType) {
            case result.STRING_TYPE:  resultVal = result.stringValue;  break;
            case result.NUMBER_TYPE:  resultVal = result.numberValue;  break;
            case result.BOOLEAN_TYPE: resultVal = result.booleanValue; break;
            default:
                log.error("Unhandled value type: " + result.resultType);
        }
        return resultVal;
    }

    /** Select the first node that matches the given xpath expression.
    * If none found, log warning and return null.
    */
    doc.selectNode = function(xpath, contextNode)
    {
        var node = this.selectNodeNullable(xpath, contextNode);
        if (node == null) {
            // is it possible that the structure of this web page has changed?
            log.warn("XPath returned no elements: " + xpath
                + "\n" + genStackTrace(arguments.callee)
            );
        }
        return node;
    }

    /** Select the first node that matches the given xpath expression.
    * If none found, return null.
    */
    doc.selectNodeNullable = function(xpath, contextNode)
    {
        if (contextNode == null)
            contextNode = this;

        var resultNode = this.evaluate(
            xpath, contextNode, null,
            XPathResult.FIRST_ORDERED_NODE_TYPE, null);

        return extendNode(resultNode.singleNodeValue);
    }

    /** Select all first nodes that match the given xpath expression.
    * If none found, return an empty Array.
    */
    doc.selectNodes = function(xpath, contextNode)
    {
        var nodeList = new Array();
        this.foreachNode(xpath, function(n) { nodeList.push(n); }, contextNode);
        return nodeList;
    }

    /** Select all nodes that match the given xpath expression.
    * If none found, return null.
    */
    doc.selectNodeSet = function(xpath, contextNode)
    {
        if (contextNode == null)
            contextNode = this;

        var nodeSet = this.evaluate(
            xpath, contextNode, null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

        return nodeSet;
    }

    /** Iteratively execute the given func for each node that matches the given xpath expression.
    */
    doc.foreachNode = function(xpath, func, contextNode)
    {
        if (contextNode == null)
            contextNode = this;

        // if array of xpath strings, call recursively
        if (xpath instanceof Array) {
            for (var i=0; i < xpath.length; i++)
                this.foreachNode(xpath[i], func, contextNode);
            return;
        }

        var nodeSet = contextNode.selectNodeSet(xpath, contextNode);

        var i = 0;
        var n = nodeSet.snapshotItem(i);
        while (n != null) {
            var result = func(extendNode(n));
            if (result == false) {
                // dispatching func can abort the loop by returning false
                return;
            }
            n = nodeSet.snapshotItem(++i);
        }
    }

    /** Retrieve the text content of the node that matches the given xpath expression.
    */
    doc.selectTextContent = function(xpath) {
        var node = this.selectNodeNullable(xpath, this);
        if (node == null)
            return null;
        return node.textContent.normalizeWhitespace();
    };

    /** Retrieve the text content of the node that matches the given xpath expression,
    * and apply the given regular expression to it, returning the portion that matches.
    */
    doc.selectMatchTextContent = function(xpath, regex) {
        var text = this.selectTextContent(xpath);
        if (text == null)
            return null;
        return text.match(regex);
    };

    /** Replace contents of contextNode (default: body), with specified node.
    * (The specified node is removed, then re-added to the emptied contextNode.)
    * The specified node is expected to be a descendent of the context node.
    * Otherwise the result is probably an error.
    * DOC-DEFAULT
    */
    doc.isolateNode = function(xpath, contextNode)
    {
        if (contextNode == null)
            contextNode = this.body;

        extendNode(contextNode);

        var subjectNode = this.selectNode(xpath);
        if (subjectNode == null || subjectNode.parentNode == null)
            return;

        // gut the parent node (leave script elements alone)
        contextNode.foreachNode("child::*", function(node) {
            if (node.tagName != "SCRIPT" && node.tagName != "NOSCRIPT") {
                node.remove();
            }
        });

        // re-add the subject node
        var replacement_div = this.createElement("div");
        replacement_div.id = "isolateNode:" + xpath;
        replacement_div.appendChild(subjectNode);

        contextNode.appendChild(replacement_div);
        return replacement_div;
    };

    /** Add a <script> reference to this document.
    * DOC-CENTRIC
    */
    doc.addScriptReference = function(url)
    {
        var script = this.createElement("script");
        script.src = url;
        this.selectNode("//head").appendChild(script);

        return script;
    }

    /** Add a CSS style definition to this document.
    * DOC-CENTRIC
    */
    doc.addStyle = function(cssBody, id)
    {
        var style = this.createXElement("style");
        style.innerHTML = cssBody;
        this.selectNode("//head").appendChild(style);

        return style;
    }

    /** Create an "extended" HTML element of the specified type,
    * with the given attributes applied to it.
    * The returned object is extended by extendNode().
    * DOC-NONSPECIFIC
    */
    doc.createXElement = function(tagName, attrMap)
    {
        var node = extendNode(this.createElement(tagName));
        node.applyAttributes(attrMap);
        return node;
    }

    /** Create
    */
    doc.createHtmlLink = function(url, text, attrMap)
    {
        var a = this.createXElement("a");
        a.href = url;
        if (text == null) {
            text = url;
        }
        a.textContent = text;
        a.applyAttributes(attrMap);
        return a;
    }

    /** Create an HTML input field, wrapped in an HTML label,
    * with the given attributes applied to it,
    * The returned HTML objects are extended by extendNode().
    * DOC-NONSPECIFIC
    */
    doc.createInputText = function(labelText, attrMap, defaultVal)
    {
        var span = this.createXElement("label");
        with (span) {
            if (labelText != null)
                appendChildText(labelText + ": ");
            var input = this.createXElement("input", attrMap);
            with (input) {
                type = "text";
                value = defaultVal;
            }
            appendChild(input);
        }
        return span;
    }

    doc.createTextArea = function(labelText, attrMap, defaultVal)
    {
        var span = this.createXElement("label");
        with (span) {
            if (labelText != null)
                appendChildText(labelText + ": ");
            var input = this.createXElement("textarea", attrMap);
            with (input) {
                value = defaultVal;
            }
            appendChild(input);
        }
        return span;
    }

    /** Create an HTML checkbox, wrapped in an HTML label,
    * with the given attributes applied to it,
    * The returned HTML objects are extended by extendNode().
    * DOC-NONSPECIFIC
    */
    doc.createCheckbox = function(labelText, attrMap, isChecked)
    {
        var span = this.createXElement("label");
        with (span) {
            var input = this.createXElement("input", attrMap);
            with (input) {
                type = "checkbox";
                checked = isChecked;
            }
            appendChild(input);
            appendChildText(labelText);
        }
        return span;
    }

    /** Create a set of HTML radio buttons, wrapped in an HTML label element.
    * The returned HTML objects are extended by extendNode().
    * DOC-NONSPECIFIC
    */
    doc.createRadioset = function(attrMap, optionMap, defaultKey)
    {
        var spanList = new Array();

        for (var key in optionMap)
        {
            var label = this.createXElement("label");
            with (label) {
                var input = this.createXElement("input", attrMap);
                with (input) {
                    type = "radio";
                    value = key;
                    if (key == defaultKey)
                        checked = true;
                }
                appendChild(input);
                appendChildText(optionMap[key]);
            }
            spanList.push(label);
        }
        return spanList;
    }

    /** Create an HTML select element, wrapped in an HTML label element.
    * The returned HTML objects are extended by extendNode().
    * DOC-NONSPECIFIC
    */
    doc.createSelect = function(labelText, attrMap, optionMap, defaultKey)
    {
        var span = this.createXElement("label");
        with (span) {
            if (labelText != null)
                appendChildText(labelText + ": ");
            var select = this.createXElement("select", attrMap);
            with (select)
            {
                for (var key in optionMap)
                {
                    var option = this.createXElement("option");
                    with (option) {
                        value = key;
                        if (key == defaultKey) {
                            selected = true;
                        }
                        appendChildText(optionMap[key]);
                    }
                    appendChild(option);
                }
            }
            appendChild(select);
        }
        return span;
    }

    /** Create a labeled/boxed area (eg, typical dialog box component).
    */
    doc.createTopicDiv = function(topicTitle, contextNode)
    {
        var shiftEms = ".7";
        var basecolor = getBaseColor(contextNode);

        var frame_div = this.createXElement("div");
        with (frame_div) {
            with (style) {
                border = "1px solid Gray";
                marginTop = (shiftEms * 1.5) + "em";
                marginLeft = "6px";
                marginRight = "6px";
                MozBorderRadius = "3px";
            }

            // superimposed title
            var title_span = this.createXElement("span");
            with (title_span.style) {
                position = "relative";
                top = -shiftEms + "em";
                fontSize = "10pt";
                color = "Black";
                backgroundColor = basecolor;
                marginLeft = "6px";  // shift title right
                padding = "0px 4px 0px 4px"; // blot out frame on left & right
            }
            title_span.appendChildText(topicTitle);
            appendChild(title_span);
            // maintatin default mouse cursor over the topic label text
            title_span.wrapIn("label");

            // content area
            var content_div = this.createXElement("div");
            content_div.style.marginTop = -shiftEms + "em";
            content_div.style.padding = "6px";
            appendChild(content_div);
        }
        frame_div.contentElement = content_div;

        return frame_div;

        function getBaseColor(contextNode)
        {
            while (contextNode != null && contextNode.tagName != "BODY") {
                var c = contextNode.style.backgroundColor;
                if (c != "") {
                    return c;
                }
                contextNode = contextNode.parentNode;
            }
            return "White";
        }
    }

    return doc;
}

/** Extend the given node with methods
* for querying and modifying the node object.
*/
function extendNode(node)
{
    if (node == null)
        return null;

    /** Create an HTML element of the specified type,
    * with the given attributes applied to it.
    * The returned object is extended by extendNode().
    */
    node.createXElement = function(tagName, attrMap)
    {
        var node = extendNode(this.ownerDocument.createElement(tagName));
        this.applyAttributes(attrMap);
        return node;
    }

    // Selection methods that operate within the scope of this node

    node.selectValue        = function(xpath) { return document.selectValue(xpath, this); }
    node.selectNode         = function(xpath) { return document.selectNode(xpath, this); }
    node.selectNodeNullable = function(xpath) { return document.selectNodeNullable(xpath, this); }
    node.selectNodeSet      = function(xpath) { return document.selectNodeSet(xpath, this); }

    node.foreachNode = function(xpath, func) { document.foreachNode(xpath, func, this); }
    node.isolateNode = function(xpath) { document.isolateNode(xpath, this); }

    node.applyAttributes = function(attrMap) {
        for (var key in attrMap) {
            this[key] = attrMap[key];
        }
    }

    /** &nbsp;
    */
    node.NBSP = "\u00A0";

    /** Create a DOM object of the given type,
    * and append it to this node.
    */
    node.appendChildElement = function(tagName) {
        var newNode = this.createXElement(tagName);
        this.appendChild(newNode);
        return newNode;
    };

    /** Create a text node,
    * optionally wrapped in the given HTML element types,
    * and append it to this node.
    */
    node.appendChildText = function(text, spanList, attrMap)
    {
        var newNode = this.ownerDocument.createTextNode(text);
        // wrap with other elements, if any, (eg: ["b", "i"])
        if (spanList != null) {
            for (var i = spanList.length - 1; i >= 0; i--) {
                var n = this.createXElement(spanList[i]);
                n.appendChild(newNode);
                newNode = n;
            }
        }
        if (attrMap != null) {
            newNode.applyAttributes(attrMap);
        }
        this.appendChild(newNode);
        return newNode;
    };

    /** Create a text node consisting of a series of &nbsp; entities,
    * and append it to this node.
    */
    node.appendChildTextNbsp = function(count) {
        if (count == null)
            count = 1;
        var buf = "";
        for (var i = 0; i < count; i++) {
            buf += this.NBSP;
        }
        return this.appendChildText(buf);
    };

    /** Insert the given node as the first child of this node.
    */
    node.prependChild = function(newNode) {
        this.insertBefore(newNode, this.firstChild);
        return newNode;
    };

    /** Insert the given node in front of this node.
    */
    node.prependSibling = function(newNode) {
        var p = this.parentNode;
        p.insertBefore(newNode, this);
        return newNode;
    };

    /** Insert the given node after this node.
    */
    node.appendSibling = function(newNode) {
        var p = this.parentNode;
        var followingSibling = this.nextSibling;
        p.insertBefore(newNode, followingSibling);
        return newNode;
    };

    /** Create an HTML element of the specified type,
    * with the given attributes applied to it,
    * then move this node inside the newly created node,
    * and attach the newly created node in place of this node
    * returning the newly created object.
    */
    node.wrapIn = function(type, attrs) {
        var wrapperNode = this.createXElement(type, attrs);
        this.prependSibling(wrapperNode);
        this.remove();
        wrapperNode.appendChild(this);
        return wrapperNode;
    };

    /** 
    */
    node.makeCollapsible = function(id, isPersistent, isInitExpanded) {
        return new Collapsible(this, id, isPersistent, isInitExpanded);
    };

    /** Remove this node, and insert the given node in its place.
    * .. more details
    */
    node.replaceWith = function(node) {
        this.appendSibling(node);
        this.remove();
        return node;
    };

    /** Create an HTML table row.
    * .. more details
    */
    node.appendTableRow = function(valueList, tdAttrMapList)
    {
        var tr = this.createXElement("tr");
        for (var i in valueList)
        {
            var td = this.createXElement("td");
            if (tdAttrMapList != null)
                td.applyAttributes(tdAttrMapList[i]);
            if (valueList[i] == null)
                ;
            else if (typeof(valueList[i]) == "string")
                td.appendChild( this.ownerDocument.createTextNode(valueList[i]) );
            else
                td.appendChild( valueList[i] );
            tr.appendChild(td);
        }
        this.appendChild(tr);
    }

    /** Remove this node from the DOM.
    */
    node.remove = function() {
        this.parentNode.removeChild(this);
        return this;
    }

    /** Hide this node.
    */
    node.hide = function() {
        this.style.display = "none";
    }

    /** Hide nodes that are siblings to this node.
    */
    node.hideSiblings = function() {
        this.foreachNode("../child::*", function(node) {
            if (! this.isSameNode(node)) {
                if (node.tagName != "SCRIPT" && node.tagName != "NOSCRIPT")
                    node.hide();
            }
        });
    };

    /** Show this node.
    */
    node.show = function() {
        this.style.display = null;
    }

    /** Calculate the absolute X position of this HTML element.
    */
    node.findPosX = function()
    {
        var x = 0;
        var node = this;
        while (node.offsetParent != null) {
            x += node.offsetLeft;
            node = node.offsetParent;
        }
        if (node.x != null)
            x += node.x;
        return x;
    }

    /** Calculate the absolute Y position of this HTML element.
    */
    node.findPosY = function()
    {
        var y = 0;
        var node = this;
        while (node.offsetParent != null) {
            y += node.offsetTop;
            node = node.offsetParent;
        }
        if (node.y != null)
            y += node.y;
        return y;
    }

    return node;
}


// ==================== TabSet object ====================

var activeTabsets = new Array();

// assumes that doc has already been extended
function TabSet(doc, tabsetId, tabLabels)
{
    this.doc = doc;
    this.tabsetId = tabsetId;
    this.tabLinkMap = new Array();
    this.tabDivMap = new Array();

    // save TabSet object reference for callbacks
    activeTabsets[tabsetId] = this;

    this.getTabContent_div = function(labelText) {
        return this.tabDivMap[labelText];
    }

    this.createTab = function(idx, labelText)
    {
        var a = this.doc.createXElement("a", {
            name: this.tabsetId,
            textContent: labelText,
            className: "DialogBox_clickable"
        });
        with (a.style) {
            padding = "3px 4px";
            border = "1px solid Black";
            MozBorderRadius = "4px";
            borderBottom = "none";
            fontSize = "9pt";
            color = "Black";
            textDecoration = "none";
        }
        return a;
    }

    this.activateTab = function(a) {
        with (a.style) {
            paddingTop = "4px";
            backgroundColor = "LightGray";
        }
        var content_div = this.getTabContent_div(a.textContent);
        content_div.show();
    }

    this.deactivateTab = function(a) {
        with (a.style) {
            paddingTop = "3px";
            backgroundColor = "DarkGray";
        }
        var content_div = this.getTabContent_div(a.textContent);
        content_div.hide();
    }

    this.selectTab = function(selected_a)
    {
        // (can be called from outside this object's context, (ie, click listener))
        var tabset = activeTabsets[selected_a.name];
        // deselect all tabs
        tabset.doc.foreachNode("//a[@name='" + selected_a.name + "']", function(a) {
            tabset.deactivateTab(a);
        });
        // then select the clicked tab
        tabset.activateTab(selected_a);
    }

    this.initialize = function(labelText)
    {
        var maxX = 0;
        var maxY = 0;
        // determine largest width/height across content divs
        for (var d in this.tabDivMap) {
            var div = this.tabDivMap[d];
            if (div.clientWidth  > maxX) maxX = div.clientWidth;
            if (div.clientHeight > maxY) maxY = div.clientHeight;
        }
        // equalize size of content divs to largest
        for (var d in this.tabDivMap) {
            var div = this.tabDivMap[d];
            div.style.width = maxX;
            div.style.height = maxY;
        }
        // select the default tab
        if (labelText == null) {
            labelText = tabLabels[0];
        }
        this.selectTab(this.tabLinkMap[labelText])
    }


    this.container_div = this.doc.createXElement("div", { id: this.tabsetId });

    var ul = this.doc.createXElement("ul");
    this.container_div.appendChild(ul);
    with (ul.style) {
        margin = "13px 7px 1px 12px";
        padding = "0px 0px 0px 0px";
        fontSize = "10pt";
    }

    for (var t in tabLabels)
    {
        var tab_a = this.createTab(t, tabLabels[t]);
        tab_a.addEventListener('click', function(event) {
                // now we're in the isolated context of the click
                // ie, context inferred from event & globals
                var selected_a = event.target;
                var tabset = activeTabsets[selected_a.name];
                tabset.selectTab(selected_a);
            },
            false
        );
        ul.appendChild(tab_a);
        // maintatin default mouse cursor over the topic label text
        tab_a.wrapIn("label");
        this.tabLinkMap[tabLabels[t]] = tab_a;
        // corresponding content div
        var tabContent_div = this.doc.createXElement("div", {
            id: this.tabsetId + ":" + tabLabels[t]
        });
        with (tabContent_div.style) {
            margin = "0px 7px 0px 7px";
            padding = "4px 4px 4px 4px";
            border = "2px outset Black";
        }
        this.container_div.appendChild(tabContent_div);
        this.tabDivMap[tabLabels[t]] = tabContent_div;
    }
}


// ==================== DialogBox object ====================

var activeDialogs = new Array();

// assumes that doc has already been extended
function DialogBox(doc, dialogTitle)
{
    this.doc = doc;
    this.callbacks = null;

    this.createDialog = function(popupName, dialogStyle, buttonDefs)
    {
        this.popupId = popupName + "_dialog";

        var main_div = this.doc.createXElement("div");
        with (main_div) {
            id = this.popupId;
            setAttribute("style", dialogStyle);
            style.maxWidth  = window.innerWidth - 50;
            style.maxHeight = window.innerHeight - 70;
            style.overflow = "auto";
            if (style.backgroundColor == "")
                style.backgroundColor = "White";

            // dialog box structure
            innerHTML =
                // border layers
                  '<div style="border: 1px solid; border-color: Gainsboro DarkSlateGray DarkSlateGray Gainsboro;">'
                + '<div style="border: 1px solid; border-color: White DarkGray DarkGray White;">'
                + '<div style="border: 2px solid Gainsboro;">'
                // grid (has to be a table to acheive float behaviors)
                + '<table cellspacing="0" cellpadding="0">'
                + '<tbody>'
                // titlebar (optional)
                + ((dialogTitle != null) ?
                      '<tr id="' + this.popupId + '_titlebar"><td'
                    + ' style="padding: 2px; background-color: Navy; color: White; font: bold 9pt Arial;"'
                    + '>' + dialogTitle
                    + '</td></tr>'
                    : "")
                // main content area
                + '<tr id="' + this.popupId + '_main" style="overflow: auto;"><td>'
                + '<div id="' + this.popupId + '_content"/>'
                + '</td></tr>'
                // button bar
                + '<tr id="' + this.popupId + '_buttons"><td style="padding: 6px;">'
                + '</td></tr>'
                + '</tbody>'
                + '</table>'
                + '</div>'
                + '</div>'
                + '</div>'
            ;
        }
        this.doc.body.appendChild(main_div);

        this.main_td = main_div.selectNodeNullable("//tr[@id='" + this.popupId + "_main']/td")
        var content_div = main_div.selectNode("//div[@id='" + this.popupId + "_content']");
        var buttonbar_td = main_div.selectNodeNullable("//tr[@id='" + this.popupId + "_buttons']/td")

        var controlButtons_span = this.doc.createXElement("center");

        if (buttonDefs != null)
        {
            this.callbacks = buttonDefs;
            for (var b in buttonDefs)
            {
                var button = null;
                if (b == "X")
                {
                    var titlebar_td = main_div.selectNodeNullable("//tr[@id='" + this.popupId + "_titlebar']/td")
                    if (titlebar_td != null) {
                        // X close button in the right side of the titlebar
                        button = this.doc.createXElement("a");
                        with (button) {
                            id = this.popupId + "_closer";
                            href = "javascript:void(0)";
                            with (style) {
                                cssFloat = "right";
                                border = "1px solid";
                                borderColor = "White DarkSlateGray DarkSlateGray White";
                                backgroundColor = "LightGray";
                                padding = "0px 1px 0px 2px";
                                font = "bold 9pt Arial";
                                color = "Black";
                                textAlign = "center";
                                lineHeight = "110%";
                            }
                            appendChildText("X");
                        }
                        titlebar_td.prependChild(button);
                    }
                    else {
                        // X close button in the upper-right of window
                        button = this.doc.createXElement("a");
                        with (button) {
                            id = this.popupId + "_closer";
                            href = "javascript:void(0)";
                            with (style) {
                                cssFloat = "right";
                                backgroundColor = "#AA0000";
                                padding = "2px";
                                font = "bold 8pt Arial";
                                textDecoration = "none";
                                color = "White";
                            }
                            appendChildText("X");
                        }
                        content_div.prependSibling(button);
                    }
                }
                else {
                    // a regular button at bottom of window
                    button = this.doc.createXElement("button");
                    with (button.style) {
                        margin = "0px 5px";
                        fontSize = "8pt";
                        fontFamily = "Helvetica, sans-serif";
                    }
                    controlButtons_span.appendChild(button);
                }

                with (button) {
                    name = this.popupId; // name attr associates callbacks with the dialog id
                    className = "DialogBox_clickable";
                    textContent = b;
                    addEventListener('click', function(event) {
                            // now we're in the isolated context of the click
                            // ie, context inferred from event & globals
                            var doc = extendDocument(event.target.ownerDocument);
                            var dialog = activeDialogs[event.target.name];
                            var popupId = event.target.textContent;
                            var callbackFunc = dialog.callbacks[popupId];
                            dialog.hidePopup();
                            callbackFunc(doc);
                            dialog.removePopup();
                        },
                        false
                    );
                }
            }
            buttonbar_td.appendChild(controlButtons_span);

            this.doc.addStyle(
                ".DialogBox_clickable:hover { cursor: pointer; }\n"
            );
        }

        // save DialogBox object reference for callbacks
        activeDialogs[this.popupId] = this;

        return content_div;
    }

    this.hidePopup = function() {
        var div = this.doc.getElementById(this.popupId);
        div.style.display = "none";
    }

    this.removePopup = function() {
        var div = this.doc.getElementById(this.popupId);
        div.parentNode.removeChild(div);

        activeDialogs[this.popupId] = null;
    }
}

function noop() {
}


// ==================== Preferences object ====================

/** (This object is created before the Logger object,
 * therefore the log methods cannot be used. Use GM_log instead.)
*/
function Preferences(defaultValuesMap)
{
    this.defaultValuesMap = defaultValuesMap;
    this.cacheMap = new Object();

    /** Adds additional attributes to the map.
    */
    this.config = function(valuesMap) {
        for (var k in valuesMap) {
            this.defaultValuesMap[k] = valuesMap[k];
        }
    }

    this.get = function(prefName)
    {
        var value = this.cacheMap[prefName];
        if (typeof(value) == "undefined")
        {
            value = GM_getValue(prefName);
            if (typeof(value) == "undefined")
            {
                value = this.defaultValuesMap[prefName];
                if (typeof(value) == "undefined") {
                    GM_log("Unmanaged preference: " + prefName);
                    return value;
                }
            }
            this.set(prefName, value);
        }
        return value;
    }

    this.set = function(prefName, prefValue)
    {
        GM_setValue(prefName, prefValue);
        this.cacheMap[prefName] = prefValue;
    }

    this.getAsList = function(prefName, delim, wrapperType)
    {
        var value = this.get(prefName);
        var valueList;
        if (value != null) {
            valueList = value.split(delim);
        }
        else {
            valueList = new Array();
        }

        if (wrapperType != null) {
            // wrap elements in custom object type
            var wrappedValueList = new Array();
            for (var i=0; i < valueList.length; i++) {
                wrappedValueList[i] = new wrapperType(valueList[i]);
            }
            return wrappedValueList;
        }

        // add utility methods to the resulting Array object

        valueList.contains = function(matchText)
        {
            if (matchText == null) {
                log.error("a null arg: " + this + " " + matchText);
                return false;
            }

            for (var i in this) {
                if (matchText == this[i])
                    return true;
            }
            return false;
        }

        return valueList;
    }
}


// ==================== PreferencesManager object ====================

function setScreenPosition(node, posIndicator)
{
    with (node.style)
    {
        position = "fixed";
        zIndex = 999;
        switch (posIndicator) {
            case "TL": top = 0;    left = 0;  break;
            case "TR": top = 0;    right = 0; break;
            case "BL": bottom = 0; left = 0;  break;
            case "BR": bottom = 0; right = 0; break;
            default:
                log.error("Unrecognized menu position indicator: " + menuPos);
        }
    }
}

function PreferencesManager(doc, uniqId, title, buttonDefs)
{
    this.doc = extendDocument(doc);
    this.uniqId = uniqId;
    this.dialogBox = new DialogBox(this.doc, title);
    this.buttonDefs = buttonDefs;

    /** Display the Preferences dialog.
    */
    this.open = function()
    {
        if (this.doc.selectNodeNullable("//div[@id='" + this.uniqId + "_dialog']")) {
            log.info("Preferences dialog already open");
            return null;  // the dialog is already open
        }

        var dialogBox_div = this.dialogBox.createDialog(
            this.uniqId,
            "z-index: 999; left: 15%; top: 25px; position: fixed;"
            + " background-color: LightGray;",
            this.buttonDefs
        );
        with (dialogBox_div.style) {
            fontSize = "10pt";
            fontFamily = "Arial, Helvetica, sans-serif";
            overflow = "auto";
            backgroundColor = "LightGray";
        }

        return dialogBox_div;
    }

    /** Create an HTML input element associated with the named greasemonkey preference.
    */
    this.createPreferenceInput = function(prefName, titleText, tipText, attrMap, optionMap)
    {
        var prefValue = prefs.get(prefName);
        var item_label;
        var inputTagname = "input";
        switch (typeof(prefValue)) {
            case "boolean":
                item_label = this.doc.createCheckbox(titleText, attrMap, prefValue);
                break;
            case "string":
            case "number":
                if (optionMap != null) {
                    item_label = this.doc.createSelect(titleText, attrMap, optionMap, prefValue);
                    inputTagname = "select";
                }
                else if (attrMap["rows"] != null) {
                    item_label = this.doc.createTextArea(titleText, attrMap, prefValue);
                    inputTagname = "textarea";
                }
                else {
                    item_label = this.doc.createInputText(titleText, attrMap, prefValue);
                }
                break;
            default:
                log.warn("For " + prefName + ", unrecognized type: " + typeof(prefValue));
        }
        item_label.style.fontSize = "9pt";
        if (tipText != null)
            item_label.title = tipText;
        with (item_label.selectNode(inputTagname)) {
            name = prefName;
            className = "preferenceSetting";
            applyAttributes(attrMap);
        }
        return item_label;
    }

    this.createScreenCornerPreference = function(prefName)
    {
        var prefValue = prefs.get(prefName);

        var table = this.doc.createXElement("table", {
            id: prefName + "_2x2"
        });
        with (table) {
            style.borderCollapse = "collapse";
            cellPadding = 0; cellSpacing = 0;

            appendTableRow([ createRadioButton("TL"), null, createRadioButton("TR") ]);
            appendTableRow([          null,           null,          null           ]);
            appendTableRow([ createRadioButton("BL"), null, createRadioButton("BR") ]);

            style.border = "3px inset Black";
            foreachNode(".//input", function(inp) {
                inp.style.margin = "0px";
            });
            with (selectNode(".//tr[2]/td[2]")) {
                // acheive roughly 4/3 aspect ratio
                style.width = "14px";
                style.height = "4px";
            };
        }
        return table;

        function createRadioButton(choiceValue)
        {
            var radio_input = doc.createXElement("input", {
                type: "radio", name: prefName, value: choiceValue,
                className: "preferenceSetting"
            });
            if (choiceValue == prefValue) {
                radio_input.checked = true;
            }
            return radio_input;
        }
    }

    /** Store current screen values into the associated Preferences,
    * but only for values that have changed.
    * (This is the primary logic for the OK button)
    */
    this.storePrefs = function()
    {
        this.doc.foreachNode("//*[@class='preferenceSetting']", function(inputObj) {
            var prefName = inputObj.name;
            var prefValue;
            if (inputObj.type == "checkbox") {
                prefValue = inputObj.checked;
            }
            else if (inputObj.type == "radio") {
                if (inputObj.checked)
                    prefValue = inputObj.value;
                else
                    return; // skip all in group except the checked one
            }
            else {
                prefValue = inputObj.value;
            }

            var oldValue = GM_getValue(prefName, prefValue);
            if (prefValue != oldValue)
            {
                var defaultValue = prefs.get(prefName);
                if (typeof(defaultValue) == "number") {
                    if (isNaN(prefValue)) {
                        alert("Non-numeric value '" + prefValue + "' is invalid for preference " + prefName);
                        return false; // continue on to next preference item
                    }
                    prefValue = parseFloat(prefValue);
                }
                if (typeof(prefValue) == "string")
                    log.info("Setting preference: " + prefName + " => '" + prefValue + "'");
                else
                    log.info("Setting preference: " + prefName + " => " + prefValue);
                prefs.set(prefName, prefValue);
            }
        });
    }
}


// ==================== Collapsible object ====================

function Collapsible(theNode, collapserId, isPersistent, isInitExpanded)
{
    this.node = theNode;
    this.doc = extendDocument(theNode.ownerDocument);

    if (collapserId == null) {
        if (theNode.id == null)
            collapserId = "collapser_" + generateUuid();
        else
            collapserId = theNode.id + "_collapser";
    }

    // maintain object reference(s) for callbacks
    if (document.activeCollapsers == null) {
        document.activeCollapsers = new Object();
    }
    document.activeCollapsers[collapserId] = this;

    this.expand = function(event) {
        collapsible = this;
        if (event != null) {
            var collapserId = event.target.parentNode.id;
            collapsible = document.activeCollapsers[collapserId];
            if (isPersistent) {
                prefs.set(collapserId, true);
            }
        }
        collapsible.node.show();
        collapsible.expander.hide();
        collapsible.collapser.show();
    }

    this.collapse = function(event) {
        var collapsible = this;
        if (event != null) {
            var collapserId = event.target.parentNode.id;
            collapsible = document.activeCollapsers[collapserId];
            if (isPersistent) {
                prefs.set(collapserId, false);
            }
        }
        collapsible.node.hide();
        collapsible.collapser.hide();
        collapsible.expander.show();
    }

    this.createController = function(func, base64) {
        var img = this.doc.createXElement("img");
        img.src = 'data:image/gif;base64,' + base64;
        img.addEventListener('click', func, false);

        with (img.style) {
            cssFloat = "left";
            left = "0px";
            position = "absolute";
            zIndex = 999;
        }
        return img;
    }

    var span = this.doc.createXElement("span", { id: collapserId });
    this.node.prependSibling(span);

    this.expander = this.createController(this.expand,
        'R0lGODlhEAAQAKEDAAAA/wAAAMzMzP///yH5BAEAAAMALAAAAAAQABAAAAIhnI+pywOtwINHTmpvy3rx' +
        'nnABlAUCKZkYoGItJZzUTCMFACH+H09wdGltaXplZCBieSBVbGVhZCBTbWFydFNhdmVyIQAAOw=='
    );
    span.appendChild(this.expander);

    this.collapser = this.createController(this.collapse,
        'R0lGODlhEAAQAKEDAAAA/wAAAMzMzP///yH5BAEAAAMALAAAAAAQABAAAAIdnI+py+0Popwx0RmEuiAz' +
        '6jVS6HTaY5zoyrZuWwAAIf4fT3B0aW1pemVkIGJ5IFVsZWFkIFNtYXJ0U2F2ZXIhAAA7'
    );
    span.appendChild(this.collapser);

    var isExpanded = isInitExpanded;
    if (isPersistent == true) {
        isExpanded = prefs.get(collapserId);
    }

    if (isExpanded)
        this.expand()
    else
        this.collapse()
}


// ==================== DocumentContainer object ====================

/** Create and manage invisible iframe content loaded from an arbitrary URL.
* If the same URL is requested more than once, it is returned from cache.
* Example:
*    var dc = new DocumentContainer();
*    dc.loadFromSameOrigin("search.do?category=eligible",
*        function(doc) {
*            if (dm.xdoc.selectNode("//text()[.='Dilbert']"))
*                alert("Hide your daughters!");
*        }
*    );
*/
function DocumentContainer(debugFlag)
{
    var iframeCache = new Array();
    this.debug = debugFlag;

    this.loadFromSameOrigin = function(theUrl, theFunc)
    {
        var iframe = iframeCache[theUrl];
        if (iframe != null) {
            if (theFunc != null)
                theFunc(iframe.contentDocument);
            return;
        }

        var iframe = this.attachIframe(theUrl);

        // wait for the DOM to be available, then dispatch
        iframe.addEventListener(
            "load",
            function(evt) {
                var theIframe = evt.currentTarget;
                var therUrl = theIframe.contentWindow.location.href;
                iframeCache[theUrl] = theIframe;
                if (theFunc != null)
                    theFunc(theIframe.contentDocument);
            },
            false
        );

        // load the content
        iframe.contentWindow.location.href = ajaxstaticUrl(theUrl);
    }

    this.loadFromForeignOrigin = function(theUrl, theFunc)
    {
        if (window != top) {
            return;  // prevent infinite recursion
        }
        var iframe = this.attachIframe(theUrl);

        GM_xmlhttpRequest(
        {
            method: "GET",
            url: ajaxstaticUrl(theUrl),
            onload: function(details) {

                // give it a URL so that it will create a .contentDocument property.
                // Make it the same as the current page,
                // Otherwise, same-origin policy would prevent us.
                iframe.contentWindow.location.href = "http://tv.yahoo.com/";

                // wait for the DOM to be available, then dispatch
                iframe.addEventListener(
                    "DOMContentLoaded",
                    function() {
                        if (theFunc != null)
                            theFunc(iframe.contentDocument);
                    },
                    false
                );

                // write the received content into the document
                iframe.contentDocument.open("text/html");
                iframe.contentDocument.write(details.responseText);
                iframe.contentDocument.close();
            }
        });

        return iframe.contentDocument;
    }

    this.attachIframe = function(theUrl)
    {
        // create an IFRAME element to write the document into.
        // It must be added to the document and rendered (eg, display != none)
        // to be properly initialized.
        var iframe = document.createElement("iframe");
        iframe.id = "DocumentContainer_" + theUrl;
        if (this.debug == null) {
            iframe.width = 0;
            iframe.height = 0;
            iframe.style.display = "none";
        }
        else {
            iframe.width = 800;
            iframe.height = 700;
        }
        document.body.appendChild(iframe);

        iframe.contentWindow.location.href = "about:blank";

        return iframe;
    }

    // private helper methods
}

    /** Add param to URL, marking it as not to be re-processed.
    */
    function ajaxstaticUrl(theUrl)
    {
        var newUrl = theUrl;
        if (newUrl.indexOf("?") == -1)
            newUrl += "?";
        if (newUrl.indexOf("?") != newUrl.length-1)
            newUrl += "&";
        return newUrl + "ajaxstatic";
    }

/** Retrieve each document specified in the urlList
* invoking onloadFunc with each doc,
* and then finally invoking onrendezvousFunc with the assembled list of docs
*/
function withDocuments(urlList, onloadFunc, onrendezvousFunc)
{
    var context = new Object();
    context.resultDocList = new Array();
    context.pendingCount = urlList.length;

    for (var u in urlList)
    {
        var dc = new DocumentContainer();
        dc.loadFromSameOrigin(urlList[u],
            function(curDoc) {
                if (onloadFunc != null) {
                    onloadFunc(curDoc);
                }
                if (--context.pendingCount == 0) {
                    if (onrendezvousFunc != null) {
                        context.resultDocList.push(curDoc);
                        onrendezvousFunc(context.resultDocList);
                    }
                }
            }
        );
    }
}

/** Recursively retrieve each document specified in the urlList,
* then invoke the dispatch function with the list of loaded docs.
*/
function withDocumentsSerialized(urlList, func, docList)
{
    var curUrl = urlList.shift();
    if (docList == null)
        docList = new Array();

    var dc = new DocumentContainer();
    dc.loadFromSameOrigin(curUrl,
        function(curDoc) {
            if (urlList.length > 0)
                withDocuments(urlList, func, docList);
            else
                func(docList);
        }
    );
}



// ==================== Logger object ====================

function Logger(verNum)
{
    this.logLevels = ["ERROR", "WARN", "INFO", "DEBUG", "TRACE"];

    this.level = null;

    this.setLevel = function(level) {
        this.level = level;
        if (level >= 2)
            GM_log("[" + verNum + "] === LOGGER LEVEL: " + this.logLevels[this.level] + " ===");
    }

    this.setLevel(arrayIndexOf(this.logLevels, prefs.get("loggerLevel")));

    this.error = function(msg) { if (this.level >= 0) GM_log("ERROR: " + msg); }
    this.warn  = function(msg) { if (this.level >= 1) GM_log("WARN: " + msg); }
    this.info  = function(msg) { if (this.level >= 2) GM_log("INFO: " + msg); }
    this.debug = function(msg) { if (this.level >= 3) GM_log("DEBUG: " + msg); }
    this.trace = function(msg) { if (this.level >= 4) GM_log("TRACE: " + msg); }

    this.getLogLevelMap = function() { return IdentityMapForArray(this.logLevels); };
}


// ==================== JavaScript object extenstions ====================

function extendJavascriptObjects()
{
    // ---------- String extensions ----------

    /** Format text content as it will appear on a page (before wrapping, etc).
    */
    String.prototype.normalizeWhitespace = function()
    {
        var text = this.replace(/\s+/g, " ");      // reduce internal whitespace
        text = text.replace(/ ([,;:\.!])/g, "$1"); // snug-up punctuation
        return text.trimWhitespace();
    }

    /** Format text content as it will appear on a page (before wrapping, etc).
    */
    String.prototype.trimWhitespace = function()
    {
        return this.replace(/^\s*/, "").replace(/\s*$/, "");
    }

    String.prototype.stripQuoteMarks = function()
    {
        var text = this.replace(/"/g, "");
        return text;
    }

    // ---------- Date extensions ----------

    SECOND = 1000;
    MINUTE = SECOND * 60;
    HOUR = MINUTE * 60;
    DAY = HOUR * 24;
    WEEK = DAY * 7;

    // Example, on the hour: floor(Date.HOUR)
    Date.prototype.floor = function(unit) {
        var floorMilli = Math.floor(this.getTime() / unit) * unit;
        return new Date(floorMilli);
    }

    Date.prototype.add = function(millis) {
        return new Date(this.getTime() + millis);
    }
}


// ---------- Array helpers ----------

function arrayIndexOf(theList, value, attrName)
{
    if (attrName == null) {
        // by element value
        for (var i in theList) {
            if (theList[i] == value)
                return i;
        }
    }
    else {
        if (typeof(value) == "object") {
            // by corresponding attribute in value array
            for (var i in theList) {
                if (theList[i][attrName] == value[attrName])
                    return i;
            }
        }
        else {
            // by attribute value
            for (var i in theList) {
                if (theList[i][attrName] == value) {
                    return i;
                }
            }
        }
    }
    return null;
}

function sortBy(theList, fieldList)
{
    theList.sort( function(a, b)
    {
        for (var i in fieldList) {
            if (a[fieldList[i]] < b[fieldList[i]]) return -1;
            if (a[fieldList[i]] > b[fieldList[i]]) return 1;
        }
        return 0;
    });
    return theList;
}

function sortDescBy(theList, fieldList)
{
    theList.sort( function(a, b)
    {
        for (var i in fieldList) {
            if (a[fieldList[i]] > b[fieldList[i]]) return -1;
            if (a[fieldList[i]] < b[fieldList[i]]) return 1;
        }
        return 0;
    });
    return theList;
}

function numericComparatorAsc(a, b) {
    return (a-b);
}

function numericComparatorDesc(a, b) {
    return (b-a);
}

/** .
*/
function IdentityMapForArray(ary)
{
    var map = new Array();
    for (var i=0; i < ary.length; i++) {
        map[ary[i]] = ary[i];
    }
    return map;
}

/** Create a new Array with pre-defined numeric indices,
* (ie, ready for inserts to random indices).
*/
function initArrayIndices(count) {
    var a = new Array(count);
    for (var i = 0; i < count; i++) {
        a[i] = null;
    }
    return a;
}


/** Dispatch processing for each grouping of elements based upon the named field.
 * Example:
 *   var nodes = dm.xdoc.selectNodes("//*[@class]");
 *   GM_log(nodes.length + " nodes");
 *   foreachGrouping(sortBy(nodes, ["className"] ), "className", function(groups) {
 *     GM_log(groups.length + " nodes with class='" + groups[0].className+ "'");
 *   });
*/
function foreachGrouping(theList, attrName, func)
{
    var curList = new Array();
    var prevValue = null;
    for (var i in theList)
    {
        if (theList[i][attrName] != prevValue)
        {
            if (curList.length > 0) {
                func(curList);
            }
            curList = new Array();
        }
        curList.push(theList[i]);
        prevValue = theList[i][attrName];
    }
}


// ==================== UrlParser object ====================

/** Parsing and formatting of URLs.
* url, params; scheme, host, port, path
*/
function UrlParser(urlString)
{
    var urlParts = urlString.split("?");
    this.url = urlParts[0];
    this.parms = new Array();

    // parse query params into name/value associative list
    if (urlParts[1]) {
        var queryItems = urlParts[1].split("&");

        for (var i in queryItems) {
            var parm = queryItems[i].split("=");
            this.parms[doUnescape(parm[0])] = doUnescape(parm[1]);
            // convert to numeric if appropriate
            var num = parseInt(parm[1]);
            if (!isNaN(num) && parm[1].substring(0, 1) != "0") {
                this.parms[doUnescape(parm[0])] = num;
            }
        }
    }

    // parse http://domain/path into scheme, domain, path
    this.url.match(/(\w+):\/\/([\w\.]+)(\/.*)/);
    this.scheme = RegExp.$1;
    this.host = RegExp.$2;
    this.path = RegExp.$3;

    // METHODS

    // assemble the query part of the URL
    this.getQuery = function()
    {
        queryItems = new Array();
        for (var p in this.parms) {
            if (this.parms[p])
                queryItems.push(doEscape(p) + "=" + doEscape(this.parms[p]));
        }
        if (queryItems.length == 0) {
            return "";
        }
        else {
            return "?" + queryItems.join("&");
        }
    }

    // assemble the whole URL
    this.toString = function()
    {
        return this.url + this.getQuery();
    }
}


// --------------- helper functions ---------------

/** Lookup preference setting and conditionally execute with error handling.
*/
function dispatchFeature(feaureName, func)
{
    if (prefs.get(feaureName))
    {
        tryCatch("feature: " + feaureName, func);
    }
}

/** Provide debug info if function throws an exception.
*/
function tryCatch(desc, func)
{
    try { func(); }
    catch(err) {
        log.error(
            "exception @ " + err.lineNumber + " [" + desc + "]" + " : " + err + "\n"
            + genStackTrace(arguments.callee)
        );
    }
}

/** Generate a UUID.
*/
function generateUuid() {
    return (S4()+S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4()+S4()+S4());

    function S4() {
        // 5 digit random #
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
}

// --------------- Stack Trace ---------------

function genStackTrace(func)
{
    var depthLimit = 20;
    var stackTrace = "Stack trace:\n";
    while (func != null) {
        if (--depthLimit < 0) {
            stackTrace += "more ...\n";
            break;
        }
        stackTrace += "called by: " + getFunctionSignature(func) + "\n";
        // TBD: line# within func
        func = func.caller;
    }

    return stackTrace + "\n\n";
}

function getFunctionSignature(func)
{
    var signature = getFunctionName(func);
    signature += "(";
    for (var i = 0; i < func.arguments.length; i++)
    {
        // trim long arguments
        var nextArgument = func.arguments[i];
        if (nextArgument.length > 30)
            nextArgument = nextArgument.substring(0, 30) + "...";

        // apend the next argument to the signature
        signature += "'" + nextArgument + "'";

        // comma separator
        if (i < func.arguments.length - 1)
            signature += ", ";
    }
    signature += ")";

    return signature;
}

function getFunctionName(func)
{
    // mozilla makes it easy
    if (func.name != null) {
        return func.name;
    }

    // try to parse the function name from the defintion
    var definition = func.toString();
    var name = definition.substring(
        definition.indexOf('function') + 8,
        definition.indexOf('(')
    );
    if (name != null)
        return name;

    // sometimes there won't be a function name (eg, dynamic functions)
    return "anonymous";
}

function doEscape(str) {
//   var encStr = encodeURIComponent(str);
//   var encStr = encodeURI(str);
//   var encStr = escape(str);
  var encStr = escape(str.replace(/ /g, "+"));
console.log("escape: " + str);
  return encStr;
}
function doUnescape(str) {
console.log("unescape: " + str);
//   return unescape(str);
  return str;
}
