// $Id: ljfilter.user.js,v 1.6 2007-08-01 05:45:00+04 slobin Exp $
//
// ==UserScript==
// @name        LiveJournal Filter
// @description filters out user entries based of tags present or absent
// @namespace   http://wagner.pp.ru/~slobin/firefox/
// @include     http://*.livejournal.com/friends
// @include     http://*.livejournal.com/friends/*
// @include     http://*.livejournal.com/friends?*
// ==/UserScript==
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
         + "#   username: -tag~with~spaces\n";

var ITER = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
var SNAP = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
var NODE = XPathResult.FIRST_ORDERED_NODE_TYPE;

var filter, errors, editWindow;

function debug(message)
{
    if (DEBUG) alert(message);
}

function xpath(query, root, type)
{
    return document.evaluate(query, root, null, type, null);
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
        if (line.length && (line[0] != "#")) {
            var pair = line.split(/:/);
            if (pair.length == 2) {
                var user = pair[0];
                var tags = pair[1];
                filter[user] = new Object();
                var userFilter = filter[user];
                userFilter.has_positive = false;
                userFilter.positive = new Object();
                userFilter.negative = new Object();
                tags = tags.split(/ +/);
                for (var j = 0; j < tags.length; j++) {
                    var tag = tags[j];
                    tag = tag.replace(/~/g, " ");
                    if (tag.length) {
                        switch (tag[0]) {
                        case "+":
                            userFilter.has_positive = true;
                            userFilter.positive[tag.slice(1)] = true;
                            break;
                        case "-":
                            userFilter.negative[tag.slice(1)] = true;
                            break;
                        default:
                            errors.push(i+1);
                            break;
                        }
                    }
                }
            } else {
                errors.push(i+1);
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

    // Punquin Elegant

    if (!recognized) {
        debug("Punquin Elegant");
        var allEntries = xpath("//table[@class='entry']", document, ITER);
        var entryNode;
        while (entryNode = allEntries.iterateNext()) {
            recognized = true;
            var userNode = xpath(".//a[1]", entryNode, NODE).singleNodeValue;
            var user = userNode.innerHTML;
            var userFilter = filter[user];
            if (userFilter) {
                var positive = !userFilter.has_positive;
                var negative = false;
                var allTags = xpath(".//a[@rel='tag']", entryNode, ITER);
                var tagNode;
                while (tagNode = allTags.iterateNext()) {
                    var tag = tagNode.innerHTML;
                    if (userFilter.positive[tag]) positive = true;
                    if (userFilter.negative[tag]) negative = true;
                }
                if (!positive || negative) {
                    var parentNode = entryNode.parentNode;
                    remember(parentNode, entryNode);
                    remember(parentNode, entryNode.nextSibling);
                }
            }
        }
    }

    // A Sturdy Gesture

    if (!recognized) {
        debug("A Sturdy Gesture");
        var allEntries = xpath("//div[@class='box']//div[@class='entry']",
                               document, ITER);
        var entryNode;
        while (entryNode = allEntries.iterateNext()) {
            recognized = true;
            var boxNode = entryNode.parentNode;
            var userNode = xpath(".//a[2]", boxNode, NODE).singleNodeValue;
            var user = userNode.innerHTML;
            var userFilter = filter[user];
            if (userFilter) {
                var positive = !userFilter.has_positive;
                var negative = false;
                var allTags = xpath(".//a[@rel='tag']", entryNode, ITER);
                var tagNode;
                while (tagNode = allTags.iterateNext()) {
                    var tag = tagNode.innerHTML;
                    if (userFilter.positive[tag]) positive = true;
                    if (userFilter.negative[tag]) negative = true;
                }
                if (!positive || negative) {
                    var parentNode = boxNode.parentNode;
                    remember(parentNode, boxNode);
                }
            }
        }
    }

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
        editWindow.document.writeln("<P>Errors in lines: " + errors.join(" "));
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
