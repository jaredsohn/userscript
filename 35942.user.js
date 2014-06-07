// $Id: stacko.user.js 354 2008-09-12 22:37:09Z Chris $
// -----------------------------------------------------------------------------
// This is a Greasemonkey user script.
// To use it, first install Greasemonkey: http://www.greasespot.net/
// Then restart Firefox and revisit this script
// From the Firefox menu select: Tools -> Install User Script
// Accept the default configuration and install
// Now when you visit any of the supported sites you will see extra functionality
// Documentation here: http://refactoror.net/greasemonkey/stacko/doc.html
// -----------------------------------------------------------------------------

// ==UserScript==
// @name         Stacko
// @moniker      stacko
// @namespace    http://refactoror.net/
// @description  Adds navigation links between the various stackoverflow sister sites, shades the voting control of community wiki posts (ie, non-reputation), adds a "revisions" link to each question and answer, and blocks ads.
// @version      1.3.0.1
// @author       Chris Noe
// @include      http://stackoverflow.com/*
// @include      http://meta.stackoverflow.com/*
// @include      http://superuser.com/*
// @include      http://serverfault.com/*
// @include      http://*.stackexchange.com/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// @grant        GM_log
// ==/UserScript==

var dm = new DomMonkey({
   name : "Stacko"
  ,moniker : "stacko"
  ,version : "1.3.0.1"
});


// The values listed here are the first-time-use defaults
// They have no effect once they are stored as mozilla preferences.
prefs.config({
    "addSisterNav":        true
    ,"addRevisionsLinks":  true
    ,"blockAds":           false
    ,"backgroundThemes":   true
    ,"norepMarkerColor":   "MistyRose"
    ,"nextAccessKey":      "N"
    ,"prefsMenuAccessKey": "P"
    ,"prefsMenuPosition":  "BR"
    ,"prefsMenuVisible":   true
});


// --------------- Page handlers ---------------

tryCatch(dm.metadata["moniker"], function () {
    enhanceAllPages();
    if (dm.xdoc.location.href.match(/questions\/\d+/)) enhanceQuestionPage();
    else if (dm.xdoc.location.href.match(/questions/) || dm.xdoc.location.href.match(/unanswered/))
        enhanceQuestionListPage();
});


function enhanceAllPages()
{
log.info("common enhancements");
    addPrefsButton();

    dispatchFeature("addSisterNav", function() {
        var hlinks_div = dm.xdoc.selectNodeNullable("//div[@id='hlinks']");
        if (hlinks_div != null) {
            var nav = createSisterSiteNav([
                { ico: "so",  domain: "http://stackoverflow.com",      title: "Stack Overflow" }
               ,{ ico: "mso", domain: "http://meta.stackoverflow.com", title: "Meta Stack Overflow" }
               ,{ ico: "su",  domain: "http://superuser.com",          title: "Super User" }
               ,{ ico: "sf",  domain: "http://serverfault.com",        title: "Server Fault" }
            ]);
            nav.gm_comment("sister-site links");
            var sep_span = dm.xdoc.createXElement("span", { className: "link-separator"} );
            sep_span.appendChildText("|");
            hlinks_div.prependChild(sep_span);

            nav.style.cssFloat = "left";                   
            nav.style.margin = "4px 4px 0 0";
            hlinks_div.prependChild(nav);
        }
    });

    // Add "Next" accessKey
    // (only the first one on the page needs to be set)
    var next_span = dm.xdoc.selectNodeNullable("//span[@class='page-numbers next']");
    if (next_span != null) {
        var label = next_span.wrapIn("label");
        label.accessKey = prefs.get("nextAccessKey");
    }

    dispatchFeature("blockAds", function() {
        dm.xdoc.addStyle(
            "div.awesome { display: none; }\n"
        );
    });
}

function createSisterSiteNav(linkDefs)
{
    var [url, domain, path] = dm.xdoc.location.href.match(/(http:\/\/[^/]*)(.*)/);
    var nav_div = dm.xdoc.createXElement("div", { id: "stacko-sister-site-nav" } );

    // site path normalization
    for each (var pathMap in [
        [ /users\/\d/,     "/" ] // user paths differ across sites
       ,[ /questions\/\d/, "/questions" ] // chop off question ID
       ,[ /badges\/\d/,    "/badges" ]    // chop off badge ID
    ]) {
        if (path.match(pathMap[0])) {
            path = pathMap[1];
        }
    }

    for (var i in linkDefs) {
        if (linkDefs[i].domain == domain) {
            continue;  // skip link for the site that we're already on
        }
        var link = dm.xdoc.createXElement("a", {
//            target: "_blank",
            title: linkDefs[i].title,
            href: linkDefs[i].domain + path
        });
        link.appendChild(dm.xdoc.createXElement("img", {
            src: "http://sstatic.net/" + linkDefs[i].ico + "/favicon.ico" } )
        );
        nav_div.appendChild(link);
    }

    return nav_div;
}

function enhanceQuestionListPage()
{
log.debug("Enhancing question list page - noop");
}

function enhanceQuestionPage()
{
log.debug("Enhancing question page");
    dispatchFeature("addRevisionsLinks", function() {
        dm.xdoc.location.href.match(/questions\/(\d+)/);
        var questionId = RegExp.$1;

        // add "revisions" link to question
        var qMenu_div = dm.xdoc.selectNode("//div[@id='question']//div[@class='post-menu']");
        addMenuLink(qMenu_div, "/revisions/" + questionId + "/list",
            "revisions", "view the revision history of this question");

        // add a "revisions" link to each answer
        dm.xdoc.foreachNode("//div[@class='answer']",
            function(answer_div) {
                var aMenu_div = answer_div.selectNode("descendant::div[@class='post-menu']");
                var answerId = answer_div.id.match(/answer-(\d+)/)[1];
log.debug("answer ID = " + answerId + " " + aMenu_div);

                addMenuLink(aMenu_div, "/revisions/" + answerId + "/list",
                    "revisions", "view the revision history of this answer");
            }
        );
    });

    dispatchFeature("backgroundThemes", function() {
log.debug("backgroundThemes");
        dm.xdoc.foreachNode([
                "//span[text()='community wiki']/ancestor::div[@id='question'][1]",
                "//span[text()='community wiki']/ancestor::div[@class='question-summary'][1]",
                "//span[text()='community wiki']/ancestor::div[contains(@class, 'answer')][1]"
            ],
            function(post_div) {
                var votebar = post_div.selectNode("descendant::div[@class='vote']");
                votebar.style.backgroundColor = prefs.get("norepMarkerColor");
                votebar.title = "Votes on this posting do not generate reputation";
            }
        );
    });
}


// add a link to the specified posting menu

function addMenuLink(menu_div, url, linkText, tipText)
{
    var separator_span = dm.xdoc.createXElement("span", {className: "link-separator"});
    separator_span.appendChildText("|");
    menu_div.appendChild(separator_span);

    var a = dm.xdoc.createXElement("a", {href: url, title: tipText});
    a.appendChildText(linkText);
    menu_div.appendChild(a);

    return parent;
}


// ==================== Preferences Dialog ====================

function addPrefsButton()
{
    configurePrefsButton(function(prefsMgr, prefsDialog_div)
    {
        var table = dm.xdoc.createXElement("table");
        prefsDialog_div.appendChild(table);

        var tr = dm.xdoc.createXElement("tr");
        table.appendChild(tr);

        var td = dm.xdoc.createXElement("td");
        td.style.verticalAlign = "top";
        td.style.textAlign = "left";
        tr.appendChild(td);
        with (td)
        {
            style.verticalAlign = "top";
            var gridFeatures_div = dm.xdoc.createTopicDiv("Customizations", td);
            appendChild(gridFeatures_div);
            with (gridFeatures_div.contentElement)
            {
                style.verticalAlign = "top";
                var gridFeatures_div = dm.xdoc.createTopicDiv("Highlighting", td);
                appendChild(gridFeatures_div);
                with (gridFeatures_div.contentElement)
                {
                    appendChild(prefsMgr.createPreferenceInput(
                        "backgroundThemes",
                        "Community Wiki vote",
                        "Highlight the voting controls of community wiki posts, (i.e., no reputation)"
                    ));
                    appendChildElement("br");
                    appendChild(prefsMgr.createPreferenceInput(
                        "norepMarkerColor",
                        "", "",
                        { size:15 }
                    ));
                }

                appendChild(prefsMgr.createPreferenceInput(
                    "addSisterNav",
                    'Add sister-site navigation',
                    'Add links between Stack Overflow sites'
                ));
                appendChildElement("br");
                appendChild(prefsMgr.createPreferenceInput(
                    "addRevisionsLinks",
                    'Add "revisions" Links',
                    'Add a "revisions" link to each question and answer'
                ));
                appendChildElement("br");
                appendChild(prefsMgr.createPreferenceInput(
                    "blockAds",
                    "Block Ads",
                    "Block advertising"
                ));
                appendChildElement("br");
                appendChild(prefsMgr.createPreferenceInput(
                    "nextAccessKey",
                    "[Next] Access Key",
                    "Alt-Shift keyboard shortcut for [Next] button",
                    { size:1, maxLength: 1 }
                ));
            }
        }

        var td = dm.xdoc.createXElement("td");
        td.style.verticalAlign = "top";
        td.style.textAlign = "left";
        tr.appendChild(td);

        with (td) {
            appendChild(prefsMgr.constructDockPrefsMenuSection(td));
            appendChild(prefsMgr.constructAdvancedControlsSection(td));
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

/** Add a gm_comment attribute value to the element.
 */
function gm_comment(node, cmt) {
    node.setAttribute("gm_comment", dm.metadata["moniker"] + ": " + cmt);
}

/** Extend the given node with methods
* for querying and modifying the node object.
*/
function extendNode(node)
{
    if (node == null)
        return null;

    /** Add a gm_comment attribute value to the element.
     */
    node.gm_comment = function(cmt) {
        gm_comment(this, cmt);
    }

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
    // TBD: rename (add, merge)
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
//         img.title = label;
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
                // TBD: why is this a literal? Would foobar.com work as well??
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
            this.parms[unescape(parm[0])] = unescape(parm[1]);
            // convert to numeric if appropriate
            var num = parseInt(parm[1]);
            if (!isNaN(num) && parm[1].substring(0, 1) != "0") {
                this.parms[unescape(parm[0])] = num;
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
                queryItems.push(escape(p) + "=" + escape(this.parms[p]));
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
