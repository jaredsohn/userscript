// $Id: ljfilter.user.js,v 1.6 2007-08-01 05:45:00+04 slobin Exp $
//
// svn log for this file:
// ------------------------------------------------------------------------
// r2 | dimrub | 2008-01-05 17:49:17 +0200 (Sat, 05 Jan 2008) | 1 line
// 
// small enhancements to livejournal filter
// ------------------------------------------------------------------------
// r1 | dimrub | 2008-01-05 13:31:05 +0200 (Sat, 05 Jan 2008) | 1 line
// 
// initial import
// ------------------------------------------------------------------------
// ==UserScript==
// @name        LiveJournal Filter
// @description filters out user entries based on tags/keywords
// present or absent
// @namespace   http://dimrub.vox.com/
// @include     http://*.livejournal.com/friends
// @include     http://*.livejournal.com/friends/*
// @include     http://*.livejournal.com/friends?*
// ==/UserScript==
// Original version was developed by <lj user=slobin>, 
// updates by <lj user=dimrub>. 
// The updates include:
// - A generalized way of treating styles
// - Support for more styles
// - Ability to filter by keywords in addition to tags.
//
// Homepage:    http://wagner.pp.ru/~slobin/firefox/
//
// Cyril Slobin <slobin@ice.ru> `When I use a word,' Humpty Dumpty said,
// http://wagner.pp.ru/~slobin/ `it means just what I choose it to mean'
//
// Public Domain
// Made on Earth

var DEBUG = false;

var DOCS = "# To view only certain tags:\n"
         + "#   username: +tag1 +tag2\n"
         + "#\n"
         + "# To filter out certain tags:\n"
         + "#   username: -tag1 -tag2\n"
         + "#\n"
         + "# To include spaces in tags:\n"
         + "#   username: -tag~with~spaces\n"
         + "#\n"
         + "# To filter by keywords rather than tags,\n" 
         + "# use -- and ++ instead of - and + respectively.\n";

var ITER = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
var SNAP = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
var NODE = XPathResult.FIRST_ORDERED_NODE_TYPE;

var filter, errors, editWindow;

function debug(message)
{
    if (DEBUG) GM_log(message);
}

// Query is a valid Xpath expression
// Root is the node relative to which the query is performed
// (usually document).
// Type is one of the following:
//
// ITER = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
// SNAP = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
// NODE = XPathResult.FIRST_ORDERED_NODE_TYPE;
//
// returns undefined if the query has failed
function xpath(query, root, type)
{
    var res;
    try {
        res = document.evaluate(query, root, null, type, null);
    } catch (e) {
        debug("Failed to run an XPath query \"" + query + "\", got exception <" + e.name + ">, error was: <" + e.message + ">");
    } finally {
        return res;
    }
}

function setRules(rules)
{
    GM_setValue("rules", escape(rules));
}

function getRules(defvalue)
{
    return unescape(GM_getValue("rules", defvalue));
}

function parseRules(rules)
{
    debug("parseRules");
    filter = new Object();
    errors = new Array();
    rules = rules.split("\n");
    for (var i = 0; i < rules.length; i++) {
        var line = rules[i];
        if (!line.length || line[0] == '#') continue;

        var pair = line.split(/:/, 2);
        var user = pair[0];
        var tags = pair[1];
        if (tags == undefined) {
            errors.push({line: i+1, message: "Line must be of the form <username>: <list of tags/keywords>"});
            return;
        }
        filter[user] = new Object();
        var userFilter = filter[user];
        userFilter.has_positive = false;
        userFilter.positive = new Object();
        userFilter.negative = new Object();
        userFilter.positive_kw = new Object();
        userFilter.negative_kw = new Object();
        tags = tags.split(/ +/);
        for (var j = 0; j < tags.length; j++) {
            var tag = tags[j];
            tag = tag.replace(/~/g, " ");
            if (tag.length) {
                switch (tag[0]) {
                case "+":
                    if (tag[1] == '+') {
                        userFilter.has_positive = true;
                        userFilter.positive_kw[tag.slice(2)] = true;
                    } else {
                        userFilter.has_positive = true;
                        userFilter.positive[tag.slice(1)] = true;
                    }
                    break;
                case "-":
                    if (tag[1] == '-') {
                        userFilter.negative_kw[tag.slice(2)] = true;
                    } else {
                        userFilter.negative[tag.slice(1)] = true;
                    }
                    break;
                default:
                    errors.push({line: i+1, message: "unrecognized symbol at the beginning of a tag/keyword"});
                    break;
                }
            }
        }
    }
}

function applyFilter()
{
    debug("applyFilter");

    var parents = Array();
    var elements = Array();
    var recognized = false;

    function remember(parent, element)
    {
        parents.push(parent);
        elements.push(element);
    }

    // The description of a style consists of the following fields:
    // name - name of the style
    // entryXpath - the XPath to the entry's node (the uppermost 
    // node that the whole single entry is contained within)
    // userXpath - the XPath to the node containing the username
    //  relative to the entry's XPath above
    // tagXpath - the XPath to the node containing the tags for the entry
    //  relative to the entry's XPath above
    // textXpath - the XPath to the entry's text
    //  relative to the entry's XPath above
    // matchXpath - the XPath that, if returns true, uniquely identifies
    // this style.
    // removeFunction - a function that given an entry node, removes it and 
    // any other node pertaining to the entry.
    var styles = [

        // Nautical Generator - checked (dimrub)
        {
            name: 'Nautical Generator',
            entryXpath: '//table[@class=\'entrybox\']',
            userXpath: './/a[@class = \"index\"]//font/text()',
            tagXpath: './/a[@rel=\'tag\']/text()',
            textXpath: './/td[@bgcolor="#ffffff"]',
            removeFunction: function(entry) {
                par = entry.parentNode;
                remember(par, entry.nextSibling);
                remember(par, entry);
            }
        },

        // Punquin Elegant
        {
            name: 'Punquin Elegant',
            entryXpath: '//table[@class=\'entry\']',
            userXpath: './/a[1]/text()',
            tagXpath: './/a[@rel=\'tag\']/text()',
            removeFunction: function(entry) {
                par = entry.parentNode;
                remember(par, entry.nextSibling);
                remember(par, entry);
            }
        },
        
		// Martial Blue - checked (lev_m)
        {
            name: 'Martial Blue',
            entryXpath: "//div[@class='box']",
            userXpath: ".//span[@class = 'ljuser']/a[2]/text()",
            tagXpath: ".//div[@class='ljtags']//a[@rel=\'tag\']/text()",
			textXpath: "./div[@class='entry']",
            removeFunction: function(entry) {
                par = entry.parentNode;
                remember(par, entry);
            }
        },

        // A Sturdy Gesture
        {
            name: 'A Sturdy Gesture',
            entryXpath: "//div[@class='box']",
            userXpath: ".//div[@class='entry']//a[2]/text()",
            tagXpath: ".//div[@class='entry']//a[@rel=\'tag\']/text()",
            removeFunction: function(entry) {
                par = entry.parentNode;
                remember(par, entry);
            }
        },

        // Smooth Sailing - checked (annyway)
        {
            name: 'Smooth Sailing',
            entryXpath: "//div[@class='entryHolder']",
            userXpath: ".//span[@class='ljuser']//b/text()",
            tagXpath: ".//span[@class='entryMetadata-content']/a[contains(@href, 'tag')]/text()",
            textXpath: ".//div[@class='entryText']",
            removeFunction: function(entry) {
                par = entry.parentNode;
                remember(par, entry);
            }
        },

        // Unearthed - checked (zhuzh)
        {
            name: 'Unearthed',
            entryXpath: "//table[@class='DropShadow']",
            userXpath: ".//span[@class='ljuser']//b/text()",
            tagXpath: ".//div[@class='ljtags']/a[contains(@href, 'tag')]/text()",
            textXpath: ".//td[@class='BoxContents']",
            removeFunction: function(entry) {
                par = entry.parentNode;
                remember(par, entry);
            }
        },

        // Flexible Squares - checked (sciuro)
        {
            name: 'Flexible Squares',
            entryXpath: "//div[@class='subcontent']",
            userXpath: ".//div[@class='userpicfriends']//a/font/text()",
            tagXpath: ".//a[@rel='tag']/text()",
            textXpath: ".//div[@class='entry_text']",
            removeFunction: function(entry) {
                par = entry.parentNode;
                remember(par, entry);
                remember(par, entry.nextSibling);
                remember(par, entry.nextSibling.nextSibling);
            }
        },

        // Component - checked (benjamin-vn)
        {
            name: 'Component',
            entryXpath: "//table[tbody/tr/td/@class='entryHolderBg']",
            userXpath: ".//span[@class='ljuser']//a/b/text()",
            tagXpath: ".//a[@rel='tag']/text()",
            textXpath: ".//td[@class='entryHolderBg'][3]//td[@class='entry']/div[not(contains(@class, 'entry'))]", //div",
            removeFunction: function(entry) {
                par = entry.parentNode;
                var curEntry = entry;
                remember(par, entry);
                do {
                    curEntry = curEntry.nextSibling;
                    remember(par, curEntry);
                } while (!curEntry.tagName || curEntry.tagName != 'TABLE');
            }
        },
//        {
//            name: 'Refried Paper',
//            entryXpath: "//div[@class='entry']",
//            userXpath: ".//a[2]/b/text()",
//            tagXpath: ".//table[1]//table[1]//td[last()]/a/text()",
//            // TODO: understand the removal procedure for this style
//            removeFunction: function(entry) {
//                par = entry.parentNode;
//                remember(par, entry);
//            }
//        },
    ];

    for (var i = 0; i < styles.length; i++) {
        var style = styles[i];
        debug("Style name: " + style.name);
        var allEntries = xpath(style.entryXpath, document, ITER);
        if (!allEntries) continue;
        var entryNode;
        while (entryNode = allEntries.iterateNext()) {
            // If we're here - we've found the correct style. 
            // make sure we don't iterate over other styles as well.
            if (!recognized) debug("Found style " + style.name);        
            recognized = true;

            var userNode = xpath(style.userXpath, entryNode, NODE);
            if (userNode) {
                var user = userNode.singleNodeValue.nodeValue;
				debug("user = " + user);
			} else {
				debug("Didn't find a username");
                continue;
			}

            var userFilter = filter[user];
            if (userFilter) {
                var positive = !userFilter.has_positive;
                var negative = false;
                var allTags = xpath(style.tagXpath, entryNode, ITER);
                var tagNode;
                while (allTags && (tagNode = allTags.iterateNext())) {
                    var tag = tagNode.nodeValue;
                    debug("Found tag: " + tag);
                    if (userFilter.positive[tag]) positive = true;
                    if (userFilter.negative[tag]) negative = true;
                }
                if (style.textXpath) {
                    var textNode = xpath(style.textXpath, entryNode, NODE);
                    if (textNode) {
                        var text = textNode.singleNodeValue.innerHTML;
                        debug("text = " + text);
                        for (var kw in userFilter.positive_kw) {
                            debug("Looking up the keyword <" + kw + ">");
                            if (text.indexOf(kw) >= 0) {
                                positive = true;
                                debug("Found!");
                            }
                        }
                        for (var kw in userFilter.negative_kw) {
                            debug("Looking up the keyword <" + kw + ">");
                            if (text.indexOf(kw) >= 0) {
                                negative = true;
                                debug("Found!");
                            }
                        }
                    }
                }
                if (!positive || negative) {
                    debug("calling the remove function");
                    style.removeFunction(entryNode);
                }
            }
        }
        if (recognized) break;
    }

    // Punquin Elegant

//    if (!recognized) {
//        debug("Punquin Elegant");
//        var allEntries = xpath("//table[@class='entry']", document, ITER);
//        var entryNode;
//        while (entryNode = allEntries.iterateNext()) {
//            recognized = true;
//            var userNode = xpath(".//a[1]", entryNode, NODE).singleNodeValue;
//            var user = userNode.innerHTML;
//            var userFilter = filter[user];
//            if (userFilter) {
//                var positive = !userFilter.has_positive;
//                var negative = false;
//                var allTags = xpath(".//a[@rel='tag']", entryNode, ITER);
//                var tagNode;
//                while (tagNode = allTags.iterateNext()) {
//                    var tag = tagNode.innerHTML;
//                    if (userFilter.positive[tag]) positive = true;
//                    if (userFilter.negative[tag]) negative = true;
//                }
//                if (!positive || negative) {
//                    var parentNode = entryNode.parentNode;
//                    remember(parentNode, entryNode);
//                    remember(parentNode, entryNode.nextSibling);
//                }
//            }
//        }
//    }

    // A Sturdy Gesture

//    if (!recognized) {
//        debug("A Sturdy Gesture");
//        var allEntries = xpath("//div[@class='box']//div[@class='entry']",
//                               document, ITER);
//        var entryNode;
//        while (entryNode = allEntries.iterateNext()) {
//            recognized = true;
//            var boxNode = entryNode.parentNode;
//            var userNode = xpath(".//a[2]", boxNode, NODE).singleNodeValue;
//            var user = userNode.innerHTML;
//            var userFilter = filter[user];
//            if (userFilter) {
//                var positive = !userFilter.has_positive;
//                var negative = false;
//                var allTags = xpath(".//a[@rel='tag']", entryNode, ITER);
//                var tagNode;
//                while (tagNode = allTags.iterateNext()) {
//                    var tag = tagNode.innerHTML;
//                    if (userFilter.positive[tag]) positive = true;
//                    if (userFilter.negative[tag]) negative = true;
//                }
//                if (!positive || negative) {
//                    var parentNode = boxNode.parentNode;
//                    remember(parentNode, boxNode);
//                }
//            }
//        }
//    }

    // Refried Paper

    if (!recognized) {
        debug("Refried Paper");
        var allEntries = xpath("//div[@class='entry']", document, ITER);
        var entryNode;
        while (entryNode = allEntries.iterateNext()) {
            recognized = true;
            var userNode = xpath(".//a[2]/b", entryNode, NODE).singleNodeValue;
            var user = userNode.innerHTML;
            var userFilter = filter[user];
            if (userFilter) {
                var positive = !userFilter.has_positive;
                var negative = false;
                var allTags = xpath(".//table[1]//table[1]//td[last()]/a",
                                    entryNode, ITER);
                var tagNode;
                while (tagNode = allTags.iterateNext()) {
                    var tag = tagNode.innerHTML;
                    if (userFilter.positive[tag]) positive = true;
                    if (userFilter.negative[tag]) negative = true;
                }
                if (!positive || negative) {
                    var parentNode = entryNode.parentNode;
                    remember(parentNode, entryNode);
                    var prevNode = entryNode;
                    do {
                        prevNode = prevNode.previousSibling;
                        remember(parentNode, prevNode);
                    } while (prevNode.nodeName != "A")
                    var nextNode = entryNode.nextSibling;
                    while (nextNode.nodeName != "A") {
                        remember(parentNode, nextNode);
                        nextNode = nextNode.nextSibling;
                    }
                }
            }
        }
    }

    for (var i = 0; i < parents.length; i++) {
       parents[i].removeChild(elements[i]);
    }
}

function editRules()
{
    debug("editRules");
    editWindow = window.open("about:blank", "_blank",
                             "width=500, height=300, resizable=1");
    editWindow.document.writeln("<form name='edit' action='about:blank'>");
    editWindow.document.writeln("<textarea name='rules' cols='50' rows='12'>");
    editWindow.document.writeln(getRules());
    editWindow.document.writeln("</textarea>");
    if (errors.length) {
        for (var i = 0; i < errors.length; i++) {
            editWindow.document.writeln("<P>Error in line: " + errors[i].line + ": " + errors[i].message + "</P>");
        }
    }                               
    editWindow.document.writeln("<p><input type='submit' value='Submit'>");
    editWindow.document.writeln("</form>");
    editWindow.document.close();
    var form = editWindow.document.forms.namedItem("edit");
    form.addEventListener("submit", processForm, true); 
    editWindow.focus();
}

function processForm()
{
    debug("processForm");
    var form = editWindow.document.forms.namedItem("edit");
    var elem = form.elements.namedItem("rules");
    var rules = elem.value;
    rules = rules.replace(/\n*$/, "\n");
    setRules(rules);
    parseRules(rules);
    editWindow.close();
    if (errors.length) {
        editRules();
    } else {
        location.reload();
    }
}

GM_registerMenuCommand("Edit LiveJournal Filter Rules", editRules);
setRules(getRules(DOCS));
parseRules(getRules());
applyFilter();
