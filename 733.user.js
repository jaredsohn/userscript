// ==UserScript==
// @name        Rllmuk Topic Ignore List
// @namespace   http://www.jonathanbuchanan.plus.com/repos/greasemonkey/
// @description Implements a topic ignore list, sending selected topics to an unobtrusive Ignored Topics section at the foot of topic listing pages.
// @include     http://www.rllmukforum.com/*
// @include     http://rllmukforum.com/*
// ==/UserScript==

/* Changelog
 * ---------
 * 2012-02-07 Updated for IPB 3.2.
 * 2011-02-09 Updated Ignored Topics toggling, as Chrome can't make use of
 *            JavaScript in the content page.
 * 2010-08-12 Added an id to the Ignored Topics wrapper for styling.
 * 2010-08-06 Maintained topic striping when topics are moved around.
 * 2010-08-05 Restyled to fit in with default forum theme.
 * 2010-07-29 Sorted ignored foldernames; reduced whitespace around icons.
 * 2010-07-28 Added "Collapse Ignored Topics section by default" setting
 * 2010-07-27 Tweaks after testing on updated forum.
 * 2010-07-07 Updated script for impending move to IPB3.
 * 2010-06-17 Now usable as a library in a Chrome extension.
 * 2010-06-16 Refactored into main logic, config and UI modules.
 * 2009-07-14 Fixed error saving ignored folders in latest version.
 * 2008-09-13 Fixed preferences display issue in Firefox 3.
 * 2007-03-05 Forum software was updated, which broke the script.
 * 2007-02-20 Minor style update to remove multiple scrollbars when the window
 *            is smaller than the preferences dialogue.
 * 2007-02-19 No longer using User Script Commands menu - Script controls are
 *            now integrated into pages.
 * 2007-01-25 Added extranoise.co.uk domain.
 * 2006-11-02 Added GUI for configuration.
 *            Removed positionInArray function, now using JS 1.6's Array.indexOf
 * 2006-04-07 Added ignoring of specified folders on search pages and a menu
 *            item to edit the ignored folder list.
 * 2006-03-13 Removed setting which toggled usage of the Ignored Topics section
 *            and did a general code tidy.
 * 2006-03-12 Changed method for getting topic's row to avoid dumping the entire
 *            post table in the Ignored Topics section.
 * 2006-03-10 Updated to work with latest version of Greasemonkey and removed
 *            all use of cookies in favour of GM's own storage mechanism.
 * 2005-06-12 Reduced MAX_COOKIE_SIZE to 4000, as setting cookies when close to
 *            the old 4096 limit seems to silently fail.
 * 2005-05-26 Functionally complete version finished, tidied up and commented.
 * -------------------------------------------------------------------------- */

var isGM = !(typeof GM_getValue == "undefined" || GM_getValue("a", "b") == undefined);

/**
 * If we're running on a content page, this variable will point at an object
 * containing settings retrieved from the extension's localStorage, otherwise
 * we're running in the extension's context and want to access localStorage
 * directly.
 *
 * This allows us to include this script for use as a library in extension
 * contexts, such as in the preferences dialogue.
 */
var cachedSettings = null;

/**
 * Cached folder names for use in the preferences dialogue. For the chrome
 * extension, the initialising script will send these names to the background
 * page, where the preferences dialogue can retrieve them to populate this
 * variable.
 */
var folderNames = null;

if (!isGM)
{
    GM_getValue = function(name, defaultValue)
    {
        var value = (cachedSettings == null ? localStorage.getItem(name) : cachedSettings[name]);
        if (!value)
        {
            return defaultValue;
        }
        var type = value[0];
        value = value.substring(1);
        switch (type)
        {
            case "b":
                return (value == "true");
            case "n":
                return Number(value);
            default:
                return value;
        }
    }

    GM_setValue = function(name, value)
    {
        value = (typeof value)[0] + value;
        if (cachedSettings == null)
        {
            localStorage.setItem(name, value);
        }
        else
        {
            cachedSettings[name] = value;
            chrome.extension.sendRequest({type: "setpref", name: name, value: value});
        }
    }

    if (typeof(unsafeWindow) == "undefined")
    {
        unsafeWindow = window;
    }
}

Function.prototype.bind = function(object)
{
    var __method = this;
    return function()
    {
        __method.apply(object, arguments);
    }
};

/**
 * Processing of the current page.
 */
var TIL =
{
    pageType: null,
    topicIdRegExp: /\/topic\/([0-9]+)-/,
    trashIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAMAAABIK2QJAAAAAXNSR0IArs4c6QAAAIFQTFRFMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzVFqv0AAAAAF0Uk5TAEDm2GYAAAApSURBVAjXY2BgYGDS0tJiYoAALShm0EIABhSALKzFD4VUZDNBjWdiAACJ5QyrLpYjAwAAAABJRU5ErkJggg%3D%3D",
    tickIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAALCAMAAACTbPdTAAAAAXNSR0IArs4c6QAAAIFQTFRFMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzVFqv0AAAAAF0Uk5TAEDm2GYAAAAySURBVAjXY2CAA2YGJMCoxYjM0dJiRuaA5TiROUxACiGjBQGMCB1aCPMYkTloNiG5AgB4FAUbj0thrwAAAABJRU5ErkJggg%3D%3D",

    init: function()
    {
        this.pageType = this.determineCurrentPageType();
        if (this.pageType != null)
        {
            this.processPage();
        }
        this.registerControls();
    },

    determineCurrentPageType: function()
    {
        var pageType = null;
        if (window.location.href.indexOf("module=search") != -1)
        {
            pageType = "search";
        }
        else if (window.location.href.indexOf("index.php?/forum") != -1)
        {
            pageType = "topicListing";
        }
        return pageType;
    },

    getTopicLinkXPath: function()
    {
        return (this.pageType == "search"
            ? "//table[@id='forum_table']/tbody/tr/td[2]/h4/a[@title='View result']"
            : "//table[@id='forum_table']/tbody/tr/td[2]/h4/a[@class='topic_title']");
    },

    processPage: function()
    {
        var removedTopics = [];
        var ignoredTopicIds = TIL.Config.getIgnoredTopicIds();
        var topicLinkNodes =
            document.evaluate(
                this.getTopicLinkXPath(),
                document,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null);

        for (var i = 0; i < topicLinkNodes.snapshotLength; i++)
        {
            var topicLinkNode = topicLinkNodes.snapshotItem(i);
            var topicId = this.topicIdRegExp.exec(topicLinkNode.href)[1];
            var ignoredTopicIndex = ignoredTopicIds.indexOf(topicId);
            var beingIgnored = (ignoredTopicIndex > -1);

            if (beingIgnored)
            {
                // Remove this topic's id from the current ignore list and place it
                // at the front of the removed topics list.
                removedTopics.splice(0, 0, ignoredTopicIds.splice(ignoredTopicIndex, 1));
            }

            // Create control cell for topic management
            var control = document.createElement("td");
            control.className = "col_f_preview";
            var icon = document.createElement("img")
            icon.src = beingIgnored ? this.tickIcon : this.trashIcon;
            icon.className = "expander";
            icon.style.verticalAlign = "text-top";
            if (beingIgnored)
            {
                icon.alt = "Unignore";
                icon.title = "Stop ignoring this topic";
            }
            else
            {
                icon.alt = "Ignore";
                icon.title = "Ignore this topic";
            }
            control.appendChild(icon);
            control.addEventListener("click", this.createIgnoreHandler(topicId), false);

            // Find the table cell which will contain the ignore control
            var cell = topicLinkNode.parentNode.parentNode.nextElementSibling.nextElementSibling

            // Insert the control
            cell.parentNode.insertBefore(control, cell);

            // Insert the Ignored Topics section on the first loop iteration
            if (i === 0)
            {
                this.insertIgnoredTopicsSection();
            }

            // If this topic is being ignored, move its row to the Ignored Topics
            // section.
            if (beingIgnored)
            {
                document.getElementById("TILInsertTarget").appendChild(cell.parentNode);
            }
        }

        // Place any active ignored topics on the front of the ignored topic list
        // and store it.
        if (removedTopics.length > 0)
        {
            TIL.Config.setIgnoredTopicIds(
                removedTopics.concat(ignoredTopicIds));
        }

        if (this.pageType == 'search')
        {
            this.fixTopicStriping();
        }
    },

    /**
     * Inserts an Ignored Topics section into the current page to store table
     * rows which contain ignored topic details.
     *
     * @param postTable the DOM Node for the table which holds topic listings,
     *                  to be used as a reference point for insertion of the new
     *                  section.
     */
    insertIgnoredTopicsSection: function(postTable)
    {
        var collapse = TIL.Config.getCollapseIgnoredTopics();
        var toggleableSectionHTML =
'<div id="ignored_topics" class="category_block block_wrap' + (collapse ? ' collapsed' : '') + '">' +
'<h3 class="maintitle"><a id="toggle_ignored_topics" class="toggle right" title="Toggle this category" href="#">Toggle Ignored Topics</a>Ignored Topics</h3>' +
'<table id="ignored_topics_table" style="' + (collapse ? 'display: none' : '') + '" class="ipb_table topic_list hover_rows" summary="Ignored Topics">' +
'<tbody id="TILInsertTarget">' +
'</tbody>' +
'</table>' +
'</div>';

        var ignoredSection = document.createElement("div");
        ignoredSection.innerHTML = toggleableSectionHTML;
        ignoredSection.style.marginTop = '10px';

        if (this.pageType == 'search')
        {
            ignoredSection.style.clear = "both";
            document.querySelector("div.ipsLayout_content").appendChild(ignoredSection);
        }
        else
        {
            var footer = document.getElementById("forum_footer")
            footer.parentNode.insertBefore(ignoredSection, footer);
        }

        var control = document.getElementById("toggle_ignored_topics");
        control.addEventListener("click", function(e)
        {
            var ignoredTopics = document.getElementById("ignored_topics_table");
            ignoredTopics.style.display = (ignoredTopics.style.display == "none" ? "" : "none");
            document.getElementById("ignored_topics").classList.toggle("collapsed")
            e.preventDefault();
        }, false);
    },

    // className functions
    // Dean Edwards 2004.10.24
    addClass: function(element, className)
    {
        if (element.className)
        {
            element.className += " " + className;
        }
        else
        {
            element.className = className;
        }
    },

    removeClass: function(element, className)
    {
        var regexp = new RegExp("(^|\\s)" + className + "(\\s|$)");
        element.className = element.className.replace(regexp, "$2");
    },

    hasClass: function(element, className)
    {
        var regexp = new RegExp("(^|\\s)" + className + "(\\s|$)");
        return regexp.test(element.className);
    },

    fixRowStriping: function(xPath)
    {
        var rowNodes =
            document.evaluate(
                xPath,
                document,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null);

        for (var i = 0; i < rowNodes.snapshotLength; i++)
        {
            var rowNode = rowNodes.snapshotItem(i);
            var expectedClass = (i % 2 == 0 ? "row1" : "row2");
            var otherClass = (expectedClass == "row1" ? "row2" : "row1");
            if (!this.hasClass(rowNode, expectedClass))
            {
                this.removeClass(rowNode, otherClass);
                this.addClass(rowNode, expectedClass);
            }
        }
    },

    /**
     * Ensures topics are alternately striped.
     */
    fixTopicStriping: function()
    {
        // Topics
        this.fixRowStriping("//table[@id='forum_table']/tbody/tr[@class!='header']");
        // Ignored topics
        this.fixRowStriping("//div[@id='ignored_topics']/table/tbody/tr[@class!='header']");
    },

    /**
     * Creates an event handling Function for ignoring a topic.
     *
     * @param topicId the id of the topic to be ignored.
     *
     * @return a Function which, when executed, will toggle the ignored state of
     *         the topic with the given id.
     */
    createIgnoreHandler: function(topicId)
    {
        return function(e)
        {
            // Toggle this topic out of the list if it's already there
            var newlyIgnoredTopic = true;
            var ignoredTopicIds = TIL.Config.getIgnoredTopicIds();
            var topicIdIndex = ignoredTopicIds.indexOf(topicId);
            if (topicIdIndex > -1)
            {
                ignoredTopicIds.splice(topicIdIndex, 1);
                newlyIgnoredTopic = false;
            }

            var cell = e.target;
            if (cell.nodeName.toLowerCase() == 'img')
            {
                cell = cell.parentNode
            }
            var icon = cell.firstElementChild;

            if (newlyIgnoredTopic)
            {
                // Add this topic's id to the front of the ignore list
                ignoredTopicIds.splice(0, 0, topicId);

                // Move the table row Node which contains this topic's details
                // to the Ignored Topics section.
                document.getElementById("TILInsertTarget").appendChild(cell.parentNode);

                // Update the topic ignoring icon appropriately
                icon.src = TIL.tickIcon;
                icon.title = "Stop ignoring this topic";

                if (TIL.pageType == 'search')
                {
                    TIL.fixTopicStriping();
                }
            }
            else
            {
                // Show that this topic won't be ignored on next page load
                icon.src = TIL.trashIcon;
                icon.title = "Re-ignore this topic";
            }

            // Store the updated ignored topic list
            TIL.Config.setIgnoredTopicIds(ignoredTopicIds);
        };
    },

    registerControls: function()
    {
        var homeItem = document.getElementById("nav_home");

        // Only insert this link for GM - Chrome will use a page action
        if (isGM && homeItem)
        {
            homeItem.parentNode.insertBefore(this.createLinkControl("Topic Ignore List",
                                                         TIL.UI.show.bind(TIL.UI)),
                                             homeItem);
        }
    },

    createLinkControl: function(name, handler)
    {
        var li = document.createElement("li");
        li.className = "right"
        var a = document.createElement("a");
        a.href = "#";
        a.appendChild(document.createTextNode(name));
        a.addEventListener("click", handler, false);
        li.appendChild(a);
        return li;
    }
};

/**
 * Configuration.
 */
TIL.Config =
{
    getIgnoredTopicIds: function()
    {
        var topicIds = GM_getValue("ignoredTopics");
        return (topicIds ? topicIds.split(",") : []);
    },

    setIgnoredTopicIds: function(ignoredTopics)
    {
        GM_setValue("ignoredTopics", ignoredTopics.join(","));
    },

    getCollapseIgnoredTopics: function()
    {
        return this._getBooleanConfig("collapseIgnoredTopics", true);
    },

    setCollapseIgnoredTopics: function(collapseIgnoredTopics)
    {
        GM_setValue("collapseIgnoredTopics", collapseIgnoredTopics);
    },

    _getBooleanConfig: function(configName, defaultValue)
    {
        var config = GM_getValue(configName);
        if (config === undefined)
        {
            GM_setValue(configName, defaultValue);
            config = defaultValue;
        }
        return config;
    }
};

/**
 * Preferences User Interface (UI).
 */
TIL.UI =
{
    PREFS_HTML: "data:text/html;charset=utf-8;base64,PCFET0NUWVBFIGh0bWw%2BDQo8aHRtbCBsYW5nPSJlbiI%2BDQo8aGVhZD4NCiAgPHRpdGxlPlRvcGljIElnbm9yZSBMaXN0IFByZWZlcmVuY2VzPC90aXRsZT4NCiAgPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCiAgaHRtbCB7IGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50IH0NCiAgYm9keSB7IG1hcmdpbjowOyBwYWRkaW5nOjA7IGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50OyBjb2xvcjogIzFDMjgzNzsgZm9udDogMTNweCBhcmlhbCx2ZXJkYW5hLHRhaG9tYSxzYW5zLXNlcmlmOyB3aWR0aDogNzIwcHg7IG1hcmdpbjogMCBhdXRvOyB9DQogIC5tb2R1bGUgeyBtYXJnaW4tYm90dG9tOiA1cHg7IH0NCiAgLm1vZHVsZSBoMiwgLm1vZHVsZSBjYXB0aW9uIHsNCiAgICAtbW96LWJvcmRlci1yYWRpdXM6NXB4IDVweCAwIDA7DQogICAgZm9udC1zaXplOjE0cHg7DQogICAgZm9udC13ZWlnaHQ6bm9ybWFsOw0KICAgIG1hcmdpbjowICFpbXBvcnRhbnQ7DQogICAgb3ZlcmZsb3c6aGlkZGVuOw0KICAgIHBhZGRpbmc6OHB4ICFpbXBvcnRhbnQ7DQogICAgYmFja2dyb3VuZDp1cmwoImh0dHA6Ly93d3cucmxsbXVrZm9ydW0uY29tL3B1YmxpYy9zdHlsZV9pbWFnZXMvbWFzdGVyL2dyYWRpZW50X2JnLnBuZyIpIHJlcGVhdC14IHNjcm9sbCBsZWZ0IDUwJSAjMUQzNjUyOw0KICAgIGNvbG9yOiNGRkZGRkY7DQogIH0NCg0KICAuZm9ybS1yb3cgeyBvdmVyZmxvdzogaGlkZGVuOyBwYWRkaW5nOiA4cHggMTJweDsgZm9udC1zaXplOiAxMXB4OyBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2VlZTsgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2VlZTsgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjt9DQogIC5mb3JtLXJvdyBpbWcsIC5mb3JtLXJvdyBpbnB1dCB7IHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7IH0NCiAgLmZvcm0tZmllbGQgeyBmbG9hdDogbGVmdDsgfQ0KICAuYWxpZ25lZCBsYWJlbCB7IHBhZGRpbmc6IDAgMWVtIDNweCAwOyBmbG9hdDogbGVmdDsgd2lkdGg6IDhlbTsgfQ0KICAuY2hlY2tib3gtcm93IGxhYmVsIHsgcGFkZGluZzogMDsgZmxvYXQ6IG5vbmU7IHdpZHRoOiBhdXRvOyBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmOyB9DQogIC5zdWJtaXQtcm93IHsgcGFkZGluZzogOHB4IDEycHg7IHRleHQtYWxpZ246IHJpZ2h0OyBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2VlZTsgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2VlZTsgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjsgfQ0KDQogIHVsIHsgbWFyZ2luOiAwOyBwYWRkaW5nOiAwIDAgMCAxLjVlbTsgbGluZS1oZWlnaHQ6IDEuNWVtOyB9DQogIGxpIHsgbWFyZ2luOiAwOyBwYWRkaW5nOiAwOyB9DQoNCiAgc3Bhbi5jb250cm9sIHsgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IGN1cnNvcjogcG9pbnRlcjsgY29sb3I6ICMwMGY7IH0NCg0KICA8L3N0eWxlPg0KPC9oZWFkPg0KPGJvZHk%2BDQoNCjxmb3JtIG5hbWU9InByZWZlcmVuY2VzIiBpZD0icHJlZmVyZW5jZXMiIGNsYXNzPSJhbGlnbmVkIj4NCiAgPGRpdiBjbGFzcz0ibW9kdWxlIj4NCiAgICA8aDI%2BVG9waWMgSWdub3JlIExpc3QgUHJlZmVyZW5jZXM8L2gyPg0KICAgIDxkaXYgY2xhc3M9ImZvcm0tcm93IGNoZWNrYm94LXJvdyI%2BDQogICAgICA8bGFiZWwgZm9yPSJjb2xsYXBzZV9pZ25vcmVkX3RvcGljcyI%2BPGlucHV0IHR5cGU9ImNoZWNrYm94IiBuYW1lPSJjb2xsYXBzZV9pZ25vcmVkX3RvcGljcyIgaWQ9ImNvbGxhcHNlX2lnbm9yZWRfdG9waWNzIj4gQ29sbGFwc2UgSWdub3JlZCBUb3BpY3Mgc2VjdGlvbiBieSBkZWZhdWx0PC9sYWJlbD4NCiAgICA8L2Rpdj4NCiAgPC9kaXY%2BDQoNCiAgPGRpdiBjbGFzcz0ibW9kdWxlIj4NCiAgICA8ZGl2IGNsYXNzPSJzdWJtaXQtcm93Ij4NCiAgICAgIDxpbnB1dCB0eXBlPSJidXR0b24iIHZhbHVlPSJDbG9zZSIgbmFtZT0iY2xvc2VfYnV0dG9uIiBpZD0iY2xvc2VfYnV0dG9uIj4NCiAgICAgIDxpbnB1dCB0eXBlPSJidXR0b24iIHZhbHVlPSJTYXZlIFByZWZlcmVuY2VzIiBuYW1lPSJzYXZlX2J1dHRvbiIgaWQ9InNhdmVfYnV0dG9uIj4NCiAgICA8L2Rpdj4NCiAgPC9kaXY%2BDQo8L2Zvcm0%2BDQoNCjwvYm9keT4NCjwvaHRtbD4%3D",

    // This will only be called when running on GreaseMonkey, as the Chrome
    // extension will use a page action to display the preferences dialogue.
    show: function(e)
    {
        if (e)
        {
            e.preventDefault();
            e.stopPropagation();
        }

        var blocker = document.createElement("div");
        this.blocker = blocker;
        blocker.id = "til_blocker";
        blocker.style.position = "fixed";
        blocker.style.top = "0px";
        blocker.style.right = "0px";
        blocker.style.bottom = "0px";
        blocker.style.left = "0px";
        blocker.style.backgroundColor = "#000";
        blocker.style.opacity = "0.5";
        blocker.style.zIndex = "10000";
        document.body.appendChild(blocker);

        var prefs = document.createElement("iframe");
        prefs.addEventListener("load", this.preferenceDocumentLoadHandler.bind(this), false);
        this.prefs = prefs;

        document.body.appendChild(prefs);

        prefs.id = "til_preferences";
        prefs.name = "til_preferences";
        prefs.style.position = "fixed";
        prefs.style.top = "1em";
        prefs.style.left = "0px";
        prefs.style.right = "0px";
        prefs.style.border = "none";
        prefs.style.height = "100%";
        prefs.style.width = "100%";
        prefs.style.overflow = "hidden";
        prefs.style.zIndex = "10001";
        prefs.src = this.PREFS_HTML;
    },

    hide: function(e)
    {
        if (isGM)
        {
            document.body.removeChild(this.prefs);
            document.body.removeChild(this.blocker);
            this.prefs = null;
            this.blocker = null;
        }
        else
        {
            window.close();
        }
    },

    getDocument: function()
    {
        return (isGM ? this.prefs.contentDocument : document);
    },

    preferenceDocumentLoadHandler: function()
    {
        var form = this.getDocument().forms.namedItem("preferences");

        // Set up form state
        form.elements.namedItem("collapse_ignored_topics").checked = TIL.Config.getCollapseIgnoredTopics();

        // Set up event handlers
        form.elements.namedItem("close_button").addEventListener("click", this.hide.bind(this), false);
        form.elements.namedItem("save_button").addEventListener("click", this.saveConfigurationHandler.bind(this), false);
    },


    saveConfigurationHandler: function()
    {
        var form = this.getDocument().forms.namedItem("preferences");
        TIL.Config.setCollapseIgnoredTopics(form.elements.namedItem("collapse_ignored_topics").checked);
        this.hide();
    }
};

// Chrome will use another content script to initialise the script.
if (isGM)
{
    TIL.init();
}
