// ==UserScript==
// @name        Rllmuk User Ignore List
// @namespace   http://www.jonathanbuchanan.plus.com/repos/greasemonkey/
// @description Implements a user ignore list which removes all traces of the users on the list and optionally removes topics created by ignored users and posts which quote ignored users. The ignore list can be synchronised with your Manage Ignored Users settings when viewing that page.
// @include     http://www.rllmukforum.com/*
// @include     http://rllmukforum.com/*
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

/* Changelog
 * ---------
 * 2012-11-03 Updated XPATH to account for username markup changes.
 *            Added @grant metadata.
 * 2012-01-31 Updated XPATHs and parentNode counts for the IPB 3.2 upgrade.
 *            Fixed synchronising list from the "Users You're Ignoring" page.
 * 2010-12-14 Minor tweaks to make the script work in Chrome with IPB3.
 * 2010-08-05 Restyled to fit in with default forum theme.
 * 2010-07-27 Tweaks after testing on updated forum.
 * 2010-07-07 Updated script for impending move to IPB3.
 * 2010-06-16 Now usable as a library in a Chrome extension.
 * 2010-05-11 Notification of post/topic removal now defaults to off.
 * 2008-10-18 Fixed preferences display issue in Firefox 3.
 * 2008-04-27 Implemented removal of posts by users with truncated usernames.
 *            Fixed removal of posts by ignored users on reply pages.
 * 2008-03-20 Fixed error when viewing locked topics.
 * 2007-10-30 A markup change broke removal of quoted posts.
 * 2007-03-05 Forum software was updated, which broke the script in certain
 *            places.
 *            Fixed a bug in removal of posts which quote ignored users in
 *            post/edit/preview pages.
 * 2007-02-20 Minor style update to remove multiple scrollbars when the window
 *            is smaller than the preferences dialogue.
 * 2007-02-19 No longer using User Script Commands menu - Script controls are
 *            now integrated into pages.
 * 2007-01-25 Added extranoise.co.uk domain.
 * 2007-01-24 "Complex" configuration data is now stored as JSON - added the
 *            JSON library to the script for this purpose.
 *            Added ignoring of specific users only in specific topics.
 *            Refactored the script, placing everything under a "UIL" object.
 * 2006-11-02 Added GUI for configuration instead of using clunky menu items.
 *            Added removal of topics created by ignored users.
 * 2006-09-09 Fixed bug where the number of posts reported as being removed was
 *            incorrect when an ignored user was quoted repeatedly.
 *            Removed isInArray function: now using JS 1.6's Array.indexOf
 *            URL substring checks are now performed on a lowercase version of
 *            the URL - this fixes removal of posts on the Reply page.
 * 2006-03-10 Updated to work with latest version of Greasemonkey and to remove
 *            posts containing quotes from ignored users.
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

String.prototype.endsWith = function(s)
{
    lastIndex = this.lastIndexOf(s);
    return (lastIndex != -1 && lastIndex == (this.length - s.length));
};

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
var UIL =
{
    init: function()
    {
        var pageType = this.determineCurrentPageType();
        this.processPage(pageType);
        this.registerControls(pageType);
    },

    determineCurrentPageType: function()
    {
        var pageType = null;
        if (window.location.href.indexOf("index.php?/topic") != -1)
        {
            pageType = "topic";
        }
        else if ((window.location.href.indexOf("module=post") != -1 ||
                  window.location.href.endsWith("/index.php?")) &&
                 document.getElementById("postingform") &&
                 document.getElementById("postingform").elements.namedItem("t") !== null)
        {
            pageType = "postEditPreview";
        }
        else if (window.location.href.indexOf("index.php?/forum") != -1 ||
                 window.location.href.indexOf("module=search") != -1)
        {
            pageType = "topicListing";
        }
        else if (window.location.href.indexOf("area=ignoredusers") != -1)
        {
            pageType = "ignoredUsers";
        }
        return pageType;
    },

    processPage: function(pageType)
    {
        if (pageType !== null)
        {
            var pageProcessor = pageType + "PageProcessor";
            if (typeof(this[pageProcessor]) == "function")
            {
                var removedItemCount = this[pageType + "PageProcessor"]();
                if (UIL.Config.getNotification() === true && removedItemCount > 0)
                {
                    this.notifyOfItemRemoval(removedItemCount);
                }
            }
        }
    },

    topicPageProcessor: function()
    {
        var itemsRemoved = 0;
        var topicId = this.getTopicIdFromCurrentPage();
        var ignoredUsers =
            UIL.Config.getGloballyIgnoredUsers()
                .concat(UIL.Config.getIgnoredUsersForTopic(topicId));

        // Get a list of username links
        var nodes =
            document.evaluate(
                "//span[@class='author vcard']/a/span[@itemprop='name']",
                document,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null);

        // Remove posts made by ignored usernames
        for (var i = 0; i < nodes.snapshotLength; i++)
        {
            var node = nodes.snapshotItem(i);
            if (ignoredUsers.indexOf(node.innerHTML) != -1)
            {
                node.parentNode.parentNode.parentNode.parentNode.style.display = "none";
                itemsRemoved++;
            }
        }

/*
        // Now try truncated usernames
        var nodes =
            document.evaluate(
                "//div[@class='popupmenu-item']/strong",
                document,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null);

        // Remove posts made by ignored usernames
        for (var i = 0; i < nodes.snapshotLength; i++)
        {
            var node = nodes.snapshotItem(i);
            if (ignoredUsers.indexOf(node.innerHTML) != -1)
            {
                node.parentNode.parentNode.parentNode.parentNode.style.display = "none";
                itemsRemoved++;
            }
        }
*/

        if (UIL.Config.getKillQuotes())
        {
            // Get a list of quote headers
            var nodes =
                document.evaluate(
                    "//p[@class='citation']",
                    document,
                    null,
                    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                    null);

            // Remove posts containing quotes from ignored usernames
            for (var i = 0; i < nodes.snapshotLength; i++)
            {
                var node = nodes.snapshotItem(i)
                  , text = node.textContent;

                for (var j = 0; j < ignoredUsers.length; j++)
                {
                    if (text.indexOf(ignoredUsers[j] + ", on") === 0)
                    {
                        var postNode = node.parentNode.parentNode.parentNode.parentNode;
                        // May have already been hidden due to ignored quoter or
                        // another ignored quotee in the same post.
                        if (postNode.style.display != "none")
                        {
                            postNode.style.display = "none";
                            itemsRemoved++;
                        }
                        break;
                    }
                }
            }
        }

        return itemsRemoved;
    },

    getTopicIdFromCurrentPage: function()
    {
        var input = document.evaluate(
            "//input[@name='t']",
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null).singleNodeValue;
        return (input != null ? input.value : null);
    },

    postEditPreviewPageProcessor: function()
    {
        var itemsRemoved = 0;
        var topicId = this.getTopicIdFromCurrentPage();
        var ignoredUsers =
            UIL.Config.getGloballyIgnoredUsers()
                .concat(UIL.Config.getIgnoredUsersForTopic(topicId));

        // Get a list of username links
        var nodes =
            document.evaluate(
                "//div[@id='topic_summary']/div/div/h3/a[1]/span[@itemprop='name']",
                document,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null);

        // Remove posts made by ignored usernames
        for (var i = 0; i < nodes.snapshotLength; i++)
        {
            var node = nodes.snapshotItem(i);

            if (ignoredUsers.indexOf(node.innerHTML) != -1)
            {
                node.parentNode.parentNode.parentNode.style.display = "none";
                itemsRemoved++;
            }
        }

        if (UIL.Config.getKillQuotes())
        {
            // Get a list of quote headers
            var nodes =
                document.evaluate(
                    "//p[@class='citation']",
                    document,
                    null,
                    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                    null);

            // Remove posts containing quotes from ignored usernames
            for (var i = 0; i < nodes.snapshotLength; i++)
            {
                var node = nodes.snapshotItem(i);
                for (var j = 0; j < ignoredUsers.length; j++)
                {
                    if (node.textContent.indexOf(ignoredUsers[j] + ", on") === 0)
                    {
                        var postNode = node.parentNode.parentNode.parentNode.parentNode;
                        // May have already been hidden due to ignored quoter or
                        // another ignored quotee in the same post.
                        if (postNode.style.display != "none")
                        {
                            postNode.style.display = "none";
                            itemsRemoved++;
                        }
                        break;
                    }
                }
            }
        }

        return itemsRemoved;
    },

    topicListingPageProcessor: function()
    {
        if (!UIL.Config.getKillTopics())
        {
            return;
        }

        var itemsRemoved = 0;
        var ignoredUsers = UIL.Config.getGloballyIgnoredUsers();

        if (window.location.href.indexOf("module=search") != -1)
        {
            var topicStarterXPathQuery =
                "//span[@class='desc lighter blend_links toggle_notify_off']/a[1]/span[@itemprop='name']";
        }
        else
        {
            var topicStarterXPathQuery =
                "//span[@class='desc lighter blend_links']/a[1]/span[@itemprop='name']";
        }

        var topicStarterLinkNodes =
            document.evaluate(
                topicStarterXPathQuery,
                document,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null);

        for (var i = 0; i < topicStarterLinkNodes.snapshotLength; i++)
        {
            var topicStarterLinkNode = topicStarterLinkNodes.snapshotItem(i);
            if (ignoredUsers.indexOf(topicStarterLinkNode.innerHTML) != -1)
            {
                var row = topicStarterLinkNode.parentNode.parentNode.parentNode.parentNode;
                row.parentNode.removeChild(row);
                itemsRemoved++;
            }
        }

        return itemsRemoved;
    },

    notifyOfItemRemoval: function(removedItemCount)
    {
        var message = removedItemCount + " item";
        if (removedItemCount > 1)
        {
            message += "s";
        }
        message += " removed";
        this.showNotification(message);
    },

    showNotification: function(message)
    {
        // Show the notification
        var s = document.createElement("DIV");
        s.id = "UIL-notification";
        s.style.position = "fixed";
        s.style.top = "0px";
        s.style.right = "0px";
        s.style.backgroundColor = "red";
        s.style.color = "white";
        s.style.padding = "3px 6px 5px 8px";
        s.style.fontWeight = "bold";
        s.style.zIndex = "10002";
        s.appendChild(document.createTextNode(message));
        document.body.appendChild(s);

        // Remove the notification later
        window.setTimeout(function()
        {
            var el = document.getElementById("UIL-notification");
            el.parentNode.removeChild(el);
        }, 3000);
    },

    addIgnoredUserForCurrentTopic: function()
    {
        var userName = prompt("User to be ignored in this topic:");
        if (userName)
        {
            if (UIL.Config.getGloballyIgnoredUsers().indexOf(userName) != -1)
            {
                alert("You're already ignoring " + userName + " globally");
                return;
            }

            var topicId = this.getTopicIdFromCurrentPage();
            var added = UIL.Config.addIgnoredUserForTopic(topicId, userName);
            if (!added)
            {
                alert("You're already ignoring " + username + " in this topic");
            }
        }
        /*
        unsafeWindow.menu_action_close();
        */
    },

    registerControls: function(pageType)
    {
        var homeItem =
            document.getElementById("nav_home");
        // Only insert this link for GM - Chrome will use a page action
        if (isGM && homeItem)
        {
            homeItem.parentNode.insertBefore(this.createLinkControl("User Ignore List",
                                                                    UIL.UI.show.bind(UIL.UI)),
                                             homeItem);
        }

        /*
        if (pageType == "topic")
        {
            var menu = document.getElementById("topicmenu-options_menu");
            var insertPoint = menu.getElementsByTagName("div")[5];

            var item = document.createElement("div");
            item.className = "popupmenu-item";

            var img = document.createElement("img");
            img.border = 0;
            img.style.verticalAlign = "middle";
            img.alt = "V";
            img.src = "style_images/1/menu_item.gif";

            item.appendChild(img);
            item.appendChild(document.createTextNode(" "));
            item.appendChild(this.createLinkControl(
                "Ignore a user in this topic",
                this.addIgnoredUserForCurrentTopic.bind(this)));

            menu.insertBefore(item, insertPoint);
        }
        */

        if (pageType == "ignoredUsers")
        {
            var saveButton =
                document.evaluate(
                    "//input[@value='Save Changes']",
                    document.getElementById("usercp_content"),
                    null,
                    XPathResult.FIRST_ORDERED_NODE_TYPE,
                    null).singleNodeValue;

            var input = document.createElement("input");
            input.type = "button";
            input.className = "input_submit alt";
            input.value = "Synchronise User Ignore List";
            input.addEventListener(
                "click",
                UIL.Config.importGloballyIgnoredUserList.bind(UIL.Config),
                false);

            saveButton.parentNode.insertBefore(input, saveButton.nextSibling);
            saveButton.parentNode.insertBefore(document.createTextNode(" "), saveButton.nextSibling);
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
UIL.Config =
{
    getGloballyIgnoredUsers: function()
    {
        var ignoredUsers = [];
        var config = GM_getValue("globallyIgnoredUsers");
        if (config !== undefined && /^\[.*\]$/.test(config))
        {
            ignoredUsers = JSON.parse(config);
        }
        else
        {
            // Set up initial array, or reset if the config is invalid
            GM_setValue("globallyIgnoredUsers", "[]");
        }
        return ignoredUsers;
    },

    setGloballyIgnoredUsers: function(userNames)
    {
        GM_setValue("globallyIgnoredUsers", JSON.stringify(userNames));
    },

    addGloballyIgnoredUser: function(userName)
    {
        var added = false;
        var ignoredUsers = this.getGloballyIgnoredUsers();
        if (ignoredUsers.indexOf(userName) == -1)
        {
            ignoredUsers.push(userName);
            ignoredUsers.sort();
            this.setGloballyIgnoredUsers(ignoredUsers);
            added = true;
        }
        return added;
    },

    removeGloballyIgnoredUser: function(userName)
    {
        var ignoredUsers = this.getGloballyIgnoredUsers();
        ignoredUsers.splice(ignoredUsers.indexOf(userName), 1);
        this.setGloballyIgnoredUsers(ignoredUsers);
    },

    importGloballyIgnoredUserList: function()
    {
        // Get a list of username links
        var nodes =
            document.evaluate(
                "//a[@hovercard-id]",
                document,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null);

        var ignoredUsers = [];
        for (var i = 0; i < nodes.snapshotLength; i++)
        {
            ignoredUsers.push(nodes.snapshotItem(i).innerHTML);
        }

        this.setGloballyIgnoredUsers(ignoredUsers);
        UIL.showNotification("Synchronised to Globally Ignored Users");
    },

    getPerTopicIgnoredUsers: function()
    {
        var topics = {};
        var config = GM_getValue("perTopicIgnoredUsers");
        if (config !== undefined && /^\{.*\}$/.test(config))
        {
            var topics = JSON.parse(config);
        }
        else
        {
            // Set up initial object, or reset if the config is invalid
            GM_setValue("perTopicIgnoredUsers", "{}");
        }
        return topics;
    },

    setPerTopicIgnoredUsers: function(topics)
    {
        GM_setValue("perTopicIgnoredUsers", JSON.stringify(topics));
    },

    addIgnoredUserForTopic: function(topicId, userName)
    {
        var added = false;
        var topics = this.getPerTopicIgnoredUsers();

        if (typeof(topics[topicId]) == "undefined")
        {
            topics[topicId] = [];
        }

        if (topics[topicId].indexOf(userName) == -1)
        {
            topics[topicId].push(userName);
            topics[topicId].sort();
            this.setPerTopicIgnoredUsers(topics);
            added = true;
        }
        return added;
    },

    getIgnoredUsersForTopic: function(topicId)
    {
        var ignoredUsers = [];
        var topics = this.getPerTopicIgnoredUsers();
        if (typeof(topics[topicId]) != "undefined")
        {
            ignoredUsers = topics[topicId];
        }
        return ignoredUsers;
    },

    removeIgnoredUserForTopic: function(topicId, userName)
    {
        var topics = this.getPerTopicIgnoredUsers();
        topics[topicId].splice(topics[topicId].indexOf(userName), 1);
        if (topics[topicId].length == 0)
        {
            delete(topics[topicId]);
        }
        this.setPerTopicIgnoredUsers(topics);
    },

    getNotification: function()
    {
        return this._getBooleanConfig("notification", false);
    },

    setNotification: function(notification)
    {
        GM_setValue("notification", notification);
    },

    getKillQuotes: function()
    {
        return this._getBooleanConfig("killQuotes", true);
    },

    setKillQuotes: function(killQuotes)
    {
        GM_setValue("killQuotes", killQuotes);
    },

    getKillTopics: function()
    {
        return this._getBooleanConfig("killTopics", false);
    },

    setKillTopics: function(killTopics)
    {
        GM_setValue("killTopics", killTopics);
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
UIL.UI =
{
    PREFS_HTML: "data:text/html;charset=utf-8;base64,PCFET0NUWVBFIGh0bWwgUFVCTElDICItLy9XM0MvL0RURCBIVE1MIDQuMDEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDQvc3RyaWN0LmR0ZCI%2BDQo8aHRtbCBsYW5nPSJlbiI%2BDQo8aGVhZD4NCiAgPHRpdGxlPlVzZXJzY3JpcHQgUHJlZmVyZW5jZXM8L3RpdGxlPg0KICA8bWV0YSBodHRwLWVxdWl2PSJDb250ZW50LVR5cGUiIGNvbnRlbnQ9InRleHQvaHRtbDsgY2hhcnNldD1VVEYtOCI%2BDQogIDxtZXRhIG5hbWU9IkF1dGhvciIgY29udGVudD0iSm9uYXRoYW4gQnVjaGFuYW4iPg0KICA8bWV0YSBuYW1lPSJDb3B5cmlnaHQiIGNvbnRlbnQ9IiZjb3B5OyAyMDA2LCBKb25hdGhhbiBCdWNoYW5hbiI%2BDQogIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BDQogIGh0bWwgeyBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudCB9DQogIGJvZHkgeyBtYXJnaW46MDsgcGFkZGluZzowOyBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDsgY29sb3I6ICMxQzI4Mzc7IGZvbnQ6IDEzcHggYXJpYWwsdmVyZGFuYSx0YWhvbWEsc2Fucy1zZXJpZjsgd2lkdGg6IDcyMHB4OyBtYXJnaW46IDAgYXV0bzsgfQ0KICAubW9kdWxlIHsgbWFyZ2luLWJvdHRvbTogNXB4OyB9DQogIC5tb2R1bGUgaDIsIC5tb2R1bGUgY2FwdGlvbiB7DQogICAgLW1vei1ib3JkZXItcmFkaXVzOjVweCA1cHggMCAwOw0KICAgIGZvbnQtc2l6ZToxNHB4Ow0KICAgIGZvbnQtd2VpZ2h0Om5vcm1hbDsNCiAgICBtYXJnaW46MCAhaW1wb3J0YW50Ow0KICAgIG92ZXJmbG93OmhpZGRlbjsNCiAgICBwYWRkaW5nOjhweCAhaW1wb3J0YW50Ow0KICAgIGJhY2tncm91bmQ6dXJsKCJodHRwOi8vd3d3LnJsbG11a2ZvcnVtLmNvbS9wdWJsaWMvc3R5bGVfaW1hZ2VzL21hc3Rlci9ncmFkaWVudF9iZy5wbmciKSByZXBlYXQteCBzY3JvbGwgbGVmdCA1MCUgIzFEMzY1MjsNCiAgICBjb2xvcjojRkZGRkZGOw0KICB9DQoNCiAgLmZvcm0tcm93IHsgb3ZlcmZsb3c6IGhpZGRlbjsgcGFkZGluZzogOHB4IDEycHg7IGZvbnQtc2l6ZTogMTFweDsgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlZWU7IGJvcmRlci1yaWdodDogMXB4IHNvbGlkICNlZWU7IGJhY2tncm91bmQtY29sb3I6ICNmZmY7IH0NCiAgLmZvcm0tcm93IGltZywgLmZvcm0tcm93IGlucHV0IHsgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgfQ0KICAuZm9ybS1maWVsZCB7IGZsb2F0OiBsZWZ0OyB9DQogIC5hbGlnbmVkIGxhYmVsIHsgcGFkZGluZzogMCAxZW0gM3B4IDA7IGZsb2F0OiBsZWZ0OyB3aWR0aDogMTBlbTsgfQ0KICAuY2hlY2tib3gtcm93IGxhYmVsIHsgcGFkZGluZzogMDsgZmxvYXQ6IG5vbmU7IHdpZHRoOiBhdXRvOyB9DQogIHAuaGVscCB7IGNvbG9yOiAjOTk5OyBmb250LXNpemU6IDExcHg7IH0NCiAgLnN1Ym1pdC1yb3cgeyBwYWRkaW5nOiA4cHggMTJweDsgdGV4dC1hbGlnbjogcmlnaHQ7IGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZWVlOyBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjZWVlOyBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmOyB9DQoNCiAgdWwgeyBtYXJnaW46IC41ZW0gMCAwIDA7IHBhZGRpbmc6IDAgMCAwIDJlbTsgbGluZS1oZWlnaHQ6IDEuNWVtOyB9DQogIGxpIHsgbWFyZ2luOiAwOyBwYWRkaW5nOiAwOyB9DQoNCiAgc3Bhbi5jb250cm9sIHsgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IGN1cnNvcjogcG9pbnRlcjsgY29sb3I6ICMwMGY7IH0NCiAgPC9zdHlsZT4NCjwvaGVhZD4NCjxib2R5Pg0KDQo8Zm9ybSBuYW1lPSJwcmVmZXJlbmNlcyIgaWQ9InByZWZlcmVuY2VzIiBjbGFzcz0iYWxpZ25lZCI%2BDQogIDxkaXYgY2xhc3M9Im1vZHVsZSI%2BDQogICAgPGgyPlVzZXIgSWdub3JlIExpc3QgUHJlZmVyZW5jZXM8L2gyPg0KICAgIDxkaXYgY2xhc3M9ImZvcm0tcm93Ij4NCiAgICAgIDxsYWJlbD5HbG9iYWxseSBJZ25vcmVkIFVzZXJzOjwvbGFiZWw%2BDQogICAgICA8ZGl2IGNsYXNzPSJmb3JtLWZpZWxkIj4NCiAgICAgICAgPGlucHV0IHR5cGU9InRleHQiIG5hbWU9Imlnbm9yZV91c2VyIj4gPGlucHV0IHR5cGU9ImJ1dHRvbiIgdmFsdWU9IkFkZCIgaWQ9Imlnbm9yZV91c2VyX2J1dHRvbiIgbmFtZT0iaWdub3JlX3VzZXJfYnV0dG9uIj4NCiAgICAgICAgPHVsIGlkPSJpZ25vcmVkX3VzZXJzIj4NCiAgICAgICAgPC91bD4NCiAgICAgIDwvZGl2Pg0KICAgIDwvZGl2Pg0KICAgIDxkaXYgY2xhc3M9ImZvcm0tcm93Ij4NCiAgICAgIDxsYWJlbD5QZXItVG9waWMgSWdub3JlZCBVc2Vyczo8L2xhYmVsPg0KICAgICAgPGRpdiBjbGFzcz0iZm9ybS1maWVsZCI%2BDQogICAgICAgIDxpbnB1dCB0eXBlPSJ0ZXh0IiBuYW1lPSJ0b3BpY19pZ25vcmVfdXNlciI%2BIGluIDxpbnB1dCB0eXBlPSJ0ZXh0IiBuYW1lPSJ0b3BpY19pZ25vcmUiPiA8aW5wdXQgdHlwZT0iYnV0dG9uIiB2YWx1ZT0iQWRkIiBpZD0idG9waWNfaWdub3JlX3VzZXJfYnV0dG9uIiBuYW1lPSJ0b3BpY19pZ25vcmVfdXNlcl9idXR0b24iPg0KICAgICAgICA8cCBjbGFzcz0iaGVscCI%2BVXNlIHRvcGljIGlkcyBmb3IgdGhlICJpbiIgZmllbGQsIGUuZy4gU3RldmUgaW4gMTIzNDU2PC9wPg0KICAgICAgICA8ZGwgaWQ9InRvcGljX2lnbm9yZWRfdXNlcnMiPg0KICAgICAgICA8L2RsPg0KICAgICAgPC9kaXY%2BDQogICAgPC9kaXY%2BDQogICAgPGRpdiBjbGFzcz0iZm9ybS1yb3cgY2hlY2tib3gtcm93Ij4NCiAgICAgIDxsYWJlbCBmb3I9ImtpbGxfcXVvdGVzIj48aW5wdXQgdHlwZT0iY2hlY2tib3giIG5hbWU9ImtpbGxfcXVvdGVzIiBpZD0ia2lsbF9xdW90ZXMiPiBSZW1vdmUgcG9zdHMgd2hpY2ggcXVvdGUgaWdub3JlZCB1c2VyczwvbGFiZWw%2BDQogICAgPC9kaXY%2BDQogICAgPGRpdiBjbGFzcz0iZm9ybS1yb3cgY2hlY2tib3gtcm93Ij4NCiAgICAgIDxsYWJlbCBmb3I9Im5vdGlmeSI%2BPGlucHV0IHR5cGU9ImNoZWNrYm94IiBuYW1lPSJub3RpZnkiIGlkPSJub3RpZnkiPiBEaXNwbGF5IG5vdGlmaWNhdGlvbiB3aGVuIHBvc3RzIG9yIHRvcGljcyBhcmUgcmVtb3ZlZDwvbGFiZWw%2BDQogICAgPC9kaXY%2BDQogICAgPGRpdiBjbGFzcz0iZm9ybS1yb3cgY2hlY2tib3gtcm93Ij4NCiAgICAgIDxsYWJlbCBmb3I9ImtpbGxfdG9waWNzIj48aW5wdXQgdHlwZT0iY2hlY2tib3giIG5hbWU9ImtpbGxfdG9waWNzIiBpZD0ia2lsbF90b3BpY3MiPiBSZW1vdmUgdG9waWNzIGNyZWF0ZWQgYnkgZ2xvYmFsbHkgaWdub3JlZCB1c2VyczwvbGFiZWw%2BDQogICAgPC9kaXY%2BDQogIDwvZGl2Pg0KDQogIDxkaXYgY2xhc3M9Im1vZHVsZSI%2BDQogICAgPGRpdiBjbGFzcz0ic3VibWl0LXJvdyI%2BDQogICAgICA8aW5wdXQgdHlwZT0iYnV0dG9uIiB2YWx1ZT0iQ2xvc2UiIG5hbWU9ImNsb3NlX2J1dHRvbiIgaWQ9ImNsb3NlX2J1dHRvbiI%2BDQogICAgICA8aW5wdXQgdHlwZT0iYnV0dG9uIiB2YWx1ZT0iU2F2ZSBQcmVmZXJlbmNlcyIgbmFtZT0ic2F2ZV9idXR0b24iIGlkPSJzYXZlX2J1dHRvbiI%2BDQogICAgPC9kaXY%2BDQogIDwvZGl2Pg0KPC9mb3JtPg0KDQo8L2JvZHk%2BDQo8L2h0bWw%2B",

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
        blocker.id = "uil_blocker";
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

        prefs.id = "uil_preferences";
        prefs.name = "uil_preferences";
        prefs.style.position = "fixed";
        prefs.style.top = "1em";
        prefs.style.left = "0px";
        prefs.style.right = "0px";
        prefs.style.border = "none";
        prefs.style.height = "100%";
        prefs.style.width = "100%";
        prefs.style.overflow = "hidden";
        prefs.style.zIndex = "10000";
        prefs.src = this.PREFS_HTML;
    },

    hide: function()
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
        this.populateGloballyIgnoredUserList();
        this.populatePerTopicIgnoredUserList();
        // TODO Implement this for Chrome
        if (isGM)
        {
            var currentTopicId = UIL.getTopicIdFromCurrentPage();
            if (currentTopicId != null)
            {
                form.elements.namedItem("topic_ignore").value = currentTopicId;
            }
        }
        form.elements.namedItem("kill_quotes").checked = UIL.Config.getKillQuotes();
        form.elements.namedItem("notify").checked = UIL.Config.getNotification();
        form.elements.namedItem("kill_topics").checked = UIL.Config.getKillTopics();

        // Set up event handlers
        form.elements.namedItem("close_button").addEventListener("click", this.hide.bind(this), false);
        form.elements.namedItem("save_button").addEventListener("click", this.saveConfigurationHandler.bind(this), false);
        form.elements.namedItem("ignore_user_button").addEventListener("click", this.addGloballyIgnoredUserHandler.bind(this), false);
        form.elements.namedItem("topic_ignore_user_button").addEventListener("click", this.addPerTopicIgnoredUserHandler.bind(this), false);
    },

    saveConfigurationHandler: function()
    {
        var form = this.getDocument().forms.namedItem("preferences");
        UIL.Config.setKillQuotes(form.elements.namedItem("kill_quotes").checked);
        UIL.Config.setNotification(form.elements.namedItem("notify").checked);
        UIL.Config.setKillTopics(form.elements.namedItem("kill_topics").checked);
        this.hide();
    },

    addGloballyIgnoredUserHandler: function()
    {
        var form = this.getDocument().forms.namedItem("preferences");
        var ignoredUser = form.elements.namedItem("ignore_user");
        var userName = ignoredUser.value;
        if (userName.length > 0)
        {
            var added = UIL.Config.addGloballyIgnoredUser(userName);
            if (added)
            {
                ignoredUser.value = "";
                this.populateGloballyIgnoredUserList();
            }
            else
            {
                alert("You're already ignoring " + userName);
            }
        }
    },

    addPerTopicIgnoredUserHandler: function()
    {
        var form = this.getDocument().forms.namedItem("preferences");
        var ignoredUser = form.elements.namedItem("topic_ignore_user");
        var ignoredTopic = form.elements.namedItem("topic_ignore");
        var userName = ignoredUser.value;
        var topicId = ignoredTopic.value;
        if (userName.length > 0 && topicId.length > 0)
        {
            if (UIL.Config.getGloballyIgnoredUsers().indexOf(userName) != -1)
            {
                alert("You're already ignoring " + userName + " globally");
                return;
            }

            var added = UIL.Config.addIgnoredUserForTopic(topicId, userName);
            if (added)
            {
                this.populatePerTopicIgnoredUserList();
                ignoredUser.value = "";
                ignoredTopic.value = "";
            }
            else
            {
                alert("You're already ignoring " + userName + " in topic " + topicId);
            }
        }
    },

    createGloballyUnignoreUserHandler: function(userName)
    {
        return function()
        {
            if (!isGM || confirm("Are you sure you want to unignore " + userName + "?"))
            {
                UIL.Config.removeGloballyIgnoredUser(userName);
                this.populateGloballyIgnoredUserList();
            }
        }.bind(this);
    },

    createPerTopicUnignoreUserHandler: function(userName, topicId)
    {
        return function()
        {
            if (!isGM || confirm("Are you sure you want to unignore " + userName + " in topic " + topicId + "?"))
            {
                UIL.Config.removeIgnoredUserForTopic(topicId, userName);
                this.populatePerTopicIgnoredUserList();
            }
        }.bind(this);
    },

    populateGloballyIgnoredUserList: function()
    {
        var document = this.getDocument();
        var list = document.getElementById("ignored_users");
        while (list.firstChild)
        {
            list.removeChild(list.firstChild);
        }
        UIL.Config.getGloballyIgnoredUsers().forEach(function(userName)
        {
            var li = document.createElement("li");

            var span = document.createElement("span");
            span.appendChild(document.createTextNode("Unignore"));
            span.className = "control";
            span.addEventListener("click", this.createGloballyUnignoreUserHandler(userName), false);

            li.appendChild(document.createTextNode(userName + " ("));
            li.appendChild(span);
            li.appendChild(document.createTextNode(")"));
            list.appendChild(li);
        }.bind(this));
    },

    populatePerTopicIgnoredUserList: function()
    {
        var document = this.getDocument();
        var list = document.getElementById("topic_ignored_users");
        while (list.firstChild)
        {
            list.removeChild(list.firstChild);
        }
        var topics = UIL.Config.getPerTopicIgnoredUsers()
        for (topicId in topics)
        {
            if (topics.hasOwnProperty(topicId))
            {
                var dt = document.createElement("dt");
                var a = document.createElement("a");
                a.href = "http://www.rllmukforum.com/index.php?showtopic=" + topicId;
                a.target = "_blank";
                a.appendChild(document.createTextNode(topicId));
                dt.appendChild(a);
                list.appendChild(dt);

                topics[topicId].forEach(function(userName)
                {
                    var dd = document.createElement("dd");

                    var span = document.createElement("span");
                    span.appendChild(document.createTextNode("Unignore"));
                    span.className = "control";
                    span.addEventListener("click", this.createPerTopicUnignoreUserHandler(userName, topicId), false);

                    dd.appendChild(document.createTextNode(userName + " ("));
                    dd.appendChild(span);
                    dd.appendChild(document.createTextNode(")"));
                    list.appendChild(dd);
                }.bind(this));
            }
        }
    }
};

// Chrome will use another content script to initialise the script.
if (isGM)
{
    UIL.init();
}
