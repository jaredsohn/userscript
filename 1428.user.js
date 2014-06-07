// ==UserScript==
// @name          Javadoc Incremental Search
// @namespace     http://kengo.z1.bbzone.net/
// @description   Incremental search for Javadoc Class names.
// @include       */allclasses-frame.html 
// ==/UserScript==
//
// version 0.4
// Copyright (c) 2006 KOSEKI Kengo
// http://www.teria.com/~koseki/tools/gm/javadoc_isearch/index.html
// 
// This script is distributed under the MIT licence.
// http://www.opensource.org/licenses/mit-license.php
//

(function() {

const SEARCH_ACCESS_KEY = "s";
const ERASE_ACCESS_KEY = "a";

const XPATH_HEADING = "//font[@class='FrameHeadingFont']/b";
const XPATH_CONTAINER = "//font[@class='FrameItemFont']";
const XPATH_MENU_LINK = "//li/a";

const ICON_ERASE = "data:image/gif;base64,R0lGODlhDQANAJEDAM%2FPz%2F%2F%2F%2F93d3UpihSH5BAEAAAMALAAAAAANAA0AAAIwnCegcpcg4nIw2sRGDZYnBAWiIHJQRZbec5XXEqnrmXIupMWdZGCXlAGhJg0h7lAAADs%3D";

const AUTO_OPEN = false;

const MENU = 
    "<li><a href='http://www.docjar.com/s.jsp?q=##CLASS_NAME##' target='classFrame'>@1:search(Docjar)</a></li>"
    + "<li><a href='http://www.docjar.com/html/api/##PACKAGE_PATH##/##CLASS_NAME##.java.html' target='classFrame'>@2:source(Docjar)</a></li>"
    + "<li><a href='http://www.koders.com/?s=##PACKAGE_NAME##+##CLASS_NAME##+##ANCHOR_NAME##' target='classFrame'>@3:search(koders)</a></li>";

const MENU_REPLACEMENT = {
    CLASS_NAME: function(classLink) { 
        return classLink.name; 
    },

    FQCN: function(classLink) {
        return classLink.getFqcn();
    },

    PACKAGE_NAME: function(classLink) { 
        return classLink.getPackageName(); 
    },

    PACKAGE_PATH: function(classLink) { 
        return classLink.getPackageName().replace(/\./g, "/");
    },

    ANCHOR_NAME: function(classLink, anchorLink) {
        if (anchorLink == null) {
            return "";
        }
        return anchorLink.getNameWithoutParameter();
    }
};

var allClassLinks = new Array();
var topClassLink = null;
var topAnchorLink = null;
var initialized = false;
var isAll = false;
var lastAutoOpenUrl = null;

var view = new View();
var query = new Query(view);
var anchorsLoader = new AnchorsLoader();
var anchorsCache = new AnchorsCache();

/*
 * main
 */
function init() {
    view.initContainer();
    allClassLinks = getAllClassLinks();
    if (allClassLinks.length <= 0) {
        return false;
    }
    topClassLink = allClassLinks[0];
    return true;
}

function search() {
    // logTimeStart();
    if (! initialized) {
        return;
    }

    if (query.isMenuMode()) {
        if (query.isModeChanged()) {
            showMenu();
        } else {
            selectMenu();
        }
    } else if (query.isAnchorMode()) {
        if (query.isModeChanged()) {
            loadAnchors();
        } else {
            selectAnchors();
        }
    } else {
        selectClasses();
    }
    // logTimeStop();
}

function getAllClassLinks() {
    var source = document.body.innerHTML;
    var rx = /<a [^>]+>(<i\s*>)?([^<]+)(<\/i\s*>)?<\/a\s*>/gi;

    var matches;
    var classLinks = new Array();
    var i = 0;
    while ((matches = rx.exec(source)) != null) {
        classLinks.push(new ClassLink(matches[2], matches[0], i));
        i++;
    }
    return classLinks;
}

function selectClasses() {
    if (query.isSelectAll()) {
        if (isAll && ! query.isModeChanged()) {
            return;
        }
        isAll = true;
    } else {
        isAll = false;
    }

    var container = view.getContainer();
    if (isAll) {
        container.setOriginal();
        topClassLink = allClassLinks[0];
        return;
    }

    var condition = query.createCondition();
    var node = container.createContentNode();
    appendClasses(condition, node);
    container.setContentNode(node);
}

function appendClasses(condition, parent) {
    topClassLink = null;
    var html = "";
    var count = 0;
    for (var i = 0; i < allClassLinks.length; i++) {
        var cl = allClassLinks[i];
        if (condition(cl)) {
            count++;
            html += cl.html;
            if (topClassLink == null) {
                topClassLink = allClassLinks[i];
            }
        }
    }
    if (count == 1 && AUTO_OPEN) {
        var url = topClassLink.getUrl();
        if (url != lastAutoOpenUrl) {
            lastAutoOpenUrl = url;
            openInClassFrame(url);
        }
    }

    parent.innerHTML = html;
}

function loadAnchors() {
    view.selectClass(topClassLink);
    view.getSubContainer().print("loading...");
    anchorsLoader.load(topClassLink);
}

function selectAnchors() {
    if (topClassLink == null || ! anchorsCache.contains(topClassLink)) {
        return;
    }
    var condition = query.createCondition();
    var container = view.getSubContainer();
    var node = container.createContentNode();
    anchorsCache.appendAnchors(node, topClassLink, condition);
    container.setContentNode(node);
}

function updateAnchors() {
    if (query.isAnchorMode()) {
        selectAnchors(query.getSearchString());
    }
}

function openInClassFrame(url) {
       try {
        if (unsafeWindow.parent.frames[2] != null) {
            unsafeWindow.parent.frames[2].location.href = url;
            return true;
        }
    } catch (ex) {
        log(ex);
    }
    return false;
}

function showMenu() {
    view.selectClass(topClassLink);
    var container = view.getSubContainer();
    var node = container.createContentNode();
    var content = MENU;
    var rx = /##(\w+)##/;
    var matches;
    while ((matches = rx.exec(content)) != null) {
        var f = MENU_REPLACEMENT[matches[1]];
        var rx2 = new RegExp("##" + matches[1] + "##", "g");
        if (f == null) {
            content = content.replace(rx2, "");
        } else {
            var anchorLink = null;
            if (query.isAnchorSearchStarted()) {
                anchorLink = topAnchorLink;
            }
            content = content.replace(rx2, f(topClassLink, anchorLink));
        }
    }
    node.innerHTML = content;
    container.setContentNode(node);
}

function selectMenu() {
    if (query.getSearchString() == "") {
        return;
    }

    var node = view.getSubContainer().getNode();
    var xpathResult = document.evaluate(XPATH_MENU_LINK, node, null, 
                                        XPathResult.ANY_TYPE, null);
    var node;
    while ((node = xpathResult.iterateNext()) != null) {
        var textNode = node.firstChild;
        if (textNode != null 
            && textNode.nodeType == 3 /* Node.TEXT_NODE */
            && textNode.nodeValue.indexOf("@" + query.getSearchString()) == 0) {
            openMenu(node);
            query.input("");
            search();
            return;
        }
    }
    query.update("@");
}

function openMenu(node) {
    var href = node.getAttribute("href");
    openInClassFrame(href);
}

/*
 * event handlers
 */
function searchFieldKeyup(e) {
    try {
        var code = e.keyCode;
        if (code == 13) {
            returnKeyPressed();
        }
    } catch (ex) {
        log(ex);
    }
}

function searchFieldChanged(input) {
    query.input(input);
    search();
}

function returnKeyPressed() {
    if (query.isClassMode()) {
        openInClassFrame(topClassLink.getUrl());
    } else if (query.isAnchorMode()) {
        openInClassFrame(topAnchorLink.getUrl());
    }
}

function searchFieldFocus(e) {
    document.body.scrollLeft = 0;
}

function eraseButtonClick() {
    query.erase();
    view.focusField();
    search();
}

/**
 * ClassLink
 */
function ClassLink(name, html, idx) {
    this.name = name;
    this.html = html + "<br/>";
    
    this.lowerName = this.name.toLowerCase();
    this.url = null;
    this.packageName = null;
}

ClassLink.prototype.getUrl = function() {
    if (this.url != null) {
        return this.url;
    }
    
    var rx = /href\s*=\s*(?:"|')([^"']+)(?:"|')/;
    var matches;
    if ((matches = rx.exec(this.html)) != null) {
        this.url = matches[1];
        return this.url;
    }
    return null;
}

ClassLink.prototype.getPackageName = function() {
    if (this.packageName == null) {
        this.packageName = this._createPackageName();
    }
    return this.packageName;
}

ClassLink.prototype.getFqcn = function() {
    var packageName = this.getPackageName();
    if (packageName == "") {
        return this.name;
    } else {
        return packageName + "." + this.name;
    }
}

ClassLink.prototype._createPackageName = function() {
    var base = this._getDocumentBase();
    var url = this.getUrl();
    if (url.indexOf(base) == 0) {
        url = url.substring(base.length + 1);
    }
    
    url = url.substring(0, url.lastIndexOf("/"));
    return url.replace(/\//g,".");
}

ClassLink.prototype._getDocumentBase = function() {
    if (this.documentBase != null) {
        return this.documentBase;
    }
    var url = document.location.href;
    url = url.substring(0, url.length - "/allclasses-frame.html".length);
    ClassLink.prototype.documentBase = url;
    return url;
}

/**
 * Query
 */
function Query(view) {
    this.mode = 1;
    this.modeChanged = false;

    this.search = "";
    this.lastClassSearch = "";
    this.lastAnchorSearch = "";
    this.view = view;
}

Query.CLASS_MODE = 1;
Query.ANCHOR_MODE = 2;
Query.MENU_MODE = 3;

Query.prototype.getSearchString = function() {
    return this.search;
}

Query.prototype.isModeChanged = function() {
    return this.modeChanged;
}

Query.prototype.isSelectAll = function() {
    return (this.search.length == 0 || this.search == "*");
}

Query.prototype.isAnchorSearchStarted = function() {
    if (this.isAnchorMode()) {
        return (0 < this.searchString.length);
    } else if (this.isMenuMode()) {
        return (1 < this.lastAnchorSearch.length); // lastAnchorSearch starts with '#'
    }
    return false;
}

Query.prototype.createCondition = function() {
    var q = this.search;
    if (this.isSelectAll()) {
        return function(o){ return true; };
    } else if (0 < q.lastIndexOf("*")) {
        var pattern = "^" + q.replace(/(\W)/g, "\\$1").replace(/\\\*/g, ".*");
        return function(o) { return o.lowerName.match(pattern); };
    } else if (q.indexOf("*") == 0) {
        q = q.substring(1);
        return function(o) { return o.lowerName.indexOf(q) != -1; };
    } else {
        return function(o) { return o.lowerName.indexOf(q) == 0; };
    }
}

Query.prototype.input = function(input) {
    var lastMode = this.mode;
    input = this._shiftMode(input);
    this.modeChanged  = (lastMode != this.mode);
    this.search = this._getSearchStringFromInput(input);
}

Query.prototype.update = function(input) {
    this.view.setFieldValue(input);
    this.input(input);
}

Query.prototype.erase = function() {
    if (this.isAnchorMode() && 0 < this.search.length) {
        this.update("#");
    } else {
        this.update("");
    }
}

Query.prototype._getSearchStringFromInput = function(input) {
    if (this.isMenuMode()) {
        if (input.length <= 1) {
            return "";
        } else {
            return input.substring(1, 2);
        }
    } else if (this.isAnchorMode()) {
        if (0 < input.lastIndexOf("#")) {
            view.setFieldValue("#");
            return "";
        } else {
            input = input.substring(1);
            return this._normalize(input);
        }
    } else if (this.isClassMode()) {
        return this._normalize(input);
    } else {
        return "";
    }
}

Query.prototype._normalize = function(input) {
    input = this._concatStars(input);
    input = this._removeLastStar(input);
    input = input.toLowerCase();
    return input;
}

Query.prototype._shiftMode = function(input) {
    if (input.indexOf("@") != -1) {
        if (this.isMenuMode()) {
            return input;
        }
        // * -> menuMode
        var lastSearch = input.replace(/@/g, "");
        this._memoryLastSearch(lastSearch);
        this.view.setFieldValue("@");
        this.mode = Query.MENU_MODE;
        return "@";
    } else if (input.indexOf("#") != -1) {
        if (this.isAnchorMode()) {
            return input;
        }
        // * -> anchorMode
        var lastSearch = input.replace(/#/g, "");
        this._memoryLastSearch(lastSearch);
        this.view.setFieldValue("#");
        this.mode = Query.ANCHOR_MODE;
        return "#";
    } else if (this.isMenuMode() && this.lastAnchorSearch != "") {
        // menuMode -> anchorMode
        this.view.setFieldValue(this.lastAnchorSearch);
        input = this.lastAnchorSearch;
        this.lastAnchorSearch = "";
        this.mode = Query.ANCHOR_MODE;
        return input;
    } else if (! this.isClassMode()) {
        // * -> classMode
        this.view.setFieldValue(this.lastClassSearch);
        input = this.lastClassSearch;
        this.lastAnchorSearch = "";
        this.lastClassSearch = "";
        this.mode = Query.CLASS_MODE;
        return input;
    }
    return input;
}

Query.prototype._memoryLastSearch = function(lastSearch) {
    if (this.isClassMode()) {
        this.lastClassSearch = lastSearch;
        this.lastAnchorSearch = "";
        this.search = "";
    } else if (this.isAnchorMode()) {
        this.lastAnchorSearch = lastSearch;
        this.search = "";
    }
}

Query.prototype._removeLastStar = function(s) {
    if (s.lastIndexOf("*") == s.length - 1) {
        s = s.substring(0, s.length - 1);
    }
    return s;
}

Query.prototype._concatStars = function(s) {
    return s.replace(/\*+/, "*");
}

Query.prototype.isClassMode = function() {
    return this.mode == Query.CLASS_MODE;
}

Query.prototype.isAnchorMode = function() {
    return this.mode == Query.ANCHOR_MODE;
}

Query.prototype.isMenuMode = function() {
    return this.mode == Query.MENU_MODE;
}

/**
 * View
 */
function View() {
    this.field = null;
    this.container = null;
    this.subContainer = null;
}

View.prototype.getContainer = function() {
    return this.container;
}

View.prototype.getSubContainer = function() {
    return this.subContainer;
}

View.prototype.setFieldValue = function(v) {
    this.field.value = v;
}

View.prototype.getFieldValue = function() {
    return this.field.value;
}

View.prototype.getFieldElement = function() {
    return this.field;
}

View.prototype.focusField = function() {
    this.field.focus();
}

View.prototype.selectClass = function(classLink) {
    var node = this.container.createContentNode();
    
    node.innerHTML = classLink.html;
    node.appendChild(this.subContainer.getParent());
    this.container.setContentNode(node);
}

View.prototype.initSearchField = function() {
    var node = this._getHeadingNode();
    if (node == null) {
        return;
    }

    node.removeChild(node.firstChild);

    this.field = this._createSearchField();
    node.appendChild(this.field);

    var eraseButton = this._createEraseButton();
    node.appendChild(eraseButton);
}

View.prototype.initContainer = function() {
    var xpathResult = selectAnyType(XPATH_CONTAINER);
    var node = xpathResult.iterateNext();
    if (node == null) {
        return false;
    }
    this.container = new Container(node);

    node = this._createSubContainerNode();
    this.subContainer = new Container(node);
}

View.prototype._getHeadingNode = function() {
    var xpathResult = selectAnyType(XPATH_HEADING);
    return xpathResult.iterateNext();
}

View.prototype._createSearchField = function() {
    var s = document.createElement("input");
    s.setAttribute("type", "text");
    s.addEventListener("keyup", searchFieldKeyup, false);
    s.addEventListener("onchange", searchFieldChanged, false);
    s.addEventListener("focus", searchFieldFocus, false);

    if (SEARCH_ACCESS_KEY != null && SEARCH_ACCESS_KEY != "") {
        s.setAttribute("accesskey", SEARCH_ACCESS_KEY);
    }

    return s;
}

View.prototype._createEraseButton = function() {
    var e = document.createElement("input");
    e.setAttribute("type", "image");
    e.setAttribute("src", ICON_ERASE);
    e.setAttribute("style", "margin-left: 3px");
    e.addEventListener("click", eraseButtonClick, false);

    if (ERASE_ACCESS_KEY != null && ERASE_ACCESS_KEY != "") {
        e.setAttribute("accesskey", ERASE_ACCESS_KEY);
    }

    return e;
}

View.prototype._createSubContainerNode = function() {
    var parent = document.createElement("span");
    var node = document.createElement("ul");
    node.setAttribute("style", "list-style-type:none; padding:0");
    parent.appendChild(node);
    return node;
}


/**
 * Container
 */
function Container(masterNode) {
    this.parent = masterNode.parentNode;
    this.master = masterNode;
    this.current = null;
}

Container.prototype.clear = function() {
    if (this.parent.hasChildNodes()) {
        this.parent.removeChild(this.parent.firstChild);
    }
    this.current = null;
}

Container.prototype.createContentNode = function() {
    return this.master.cloneNode(false);
}

Container.prototype.setContentNode = function(node) {
    if (this.parent.hasChildNodes()) {
        this.parent.replaceChild(node, this.parent.firstChild);
    } else {
        this.parent.appendChild(node);
    }
    this.current = node;
}

Container.prototype.getNode = function() {
    return this.current;
}

Container.prototype.getParent = function() {
    return this.parent;
}

Container.prototype.print = function(msg) {
    var node = document.createTextNode(msg);
    this.setContentNode(node);
}

Container.prototype.setOriginal = function() {
    this.setContentNode(this.master);
}


/**
 * AnchorsLoader
 */
function AnchorsLoader() {
}

AnchorsLoader.prototype.load = function(classLink) {
    if (anchorsCache.contains(classLink)) {
        updateAnchors();
        return;
    }
    var handler = new AnchorsRequestHandler();
    try {
        var req = new XMLHttpRequest();
        req.open("GET", classLink.getUrl(), true);
        req.onreadystatechange = function() { 
            if (req.readyState == 2) {
                handler.loaded(req, classLink);
            } else if (req.readyState == 4 && req.responseText) { 
                handler.completed(req, classLink);
            }
        };
        req.send("");
    } catch(e) {
        var p = new Object();
        p.method = "GET";
        p.url = classLink.getUrl();
        p.onreadystatechange = function(res) {
            if (res.readyState == 2) {
                handler.loaded(res, classLink);
            } else if (res.readyState == 4 && res.responseText) { 
                handler.completed(res, classLink);
            }
        }
        GM_xmlhttpRequest(p);
    }
}

/**
 * AnchorsRequestHandler
 */
function AnchorsRequestHandler() {
}

AnchorsRequestHandler.prototype.loaded = function(req, classLink) {
    view.getSubContainer().print("parsing...");
}

AnchorsRequestHandler.prototype.completed = function(req, classLink) {
    if (! query.isAnchorMode() || classLink != topClassLink) {
        return;
    }
    var names = this._getAnchorNames(req.responseText);
    var nodes = this._createAnchorLinkArray(classLink.getUrl(), names);
    anchorsCache.add(classLink, nodes);
    updateAnchors();
}

AnchorsRequestHandler.prototype._createAnchorLinkArray = function(baseurl, 
                                                                  names) {
    var nodes = new Array();
    var keywordNodes = new Array();
    for (var i = 0; i < names.length; i++) {
        var node = new AnchorLink(baseurl, names[i]);
        if (node.isKeyword()) {
            keywordNodes.push(node);
        } else {
            nodes.push(node);
        }
    }
    for (var i = 0; i < keywordNodes.length; i++) {
        nodes.push(keywordNodes[i]);
    }
    return nodes;
}

AnchorsRequestHandler.prototype._getAnchorNames = function(doc) {
    var pat = /<A NAME=\"([^\"]+)\"/gi;
    var i = 0;
    var matches;
    var names = new Array();
    while ((matches = pat.exec(doc)) != null) {
        names.push(matches[1]);
    }
    return names;
}

/**
 * AnchorLink
 */
function AnchorLink(baseurl, name) {
    this.name = name;
    this.lowerName = name.toLowerCase();
    this.url = baseurl + "#" + name;
    this.keywordOrNot = this._getKeywordOrNot(name);
    this.html = this._getHtml(name, this.url, this.keywordOrNot);
}

AnchorLink.prototype.getLowerName = function() {
    return this.lowerName;
}

AnchorLink.prototype.getUrl = function() {
    return this.url;
}

AnchorLink.prototype.isKeyword = function() {
    return this.keywordOrNot;
}

AnchorLink.prototype.getNameWithoutParameter = function() {
    if (this.name.indexOf("(") != -1) {
        return this.name.substring(0, this.name.indexOf("("));
    } else {
        return this.name;
    }
}

AnchorLink.keywords = {
    "navbar_top":1,
    "navbar_top_firstrow":1,
    "skip-navbar_top":1,
    "field_summary":1,
    "nested_class_summary":1,
    "constructor_summary":1,
    "constructor_detail":1,
    "method_summary":1,
    "method_detail":1,
    "field_detail":1,
    "navbar_bottom":1,
    "navbar_bottom_firstrow":1,
    "skip-navbar_bottom":1
};

AnchorLink.keywordPrefixes = [
    "methods_inherited_from_",
    "fields_inherited_from_",
    "nested_classes_inherited_from_"
];

AnchorLink.prototype._getKeywordOrNot = function(name) {
    if (AnchorLink.keywords[name] == 1) {
        return true;
    }
    for (var i = 0; i < AnchorLink.keywordPrefixes.length; i++) {
        if (name.indexOf(AnchorLink.keywordPrefixes[i]) == 0) {
            return true;
        }
    }
    return false;
}

AnchorLink.prototype._getHtml = function(name, url, keywordOrNot) {
    var html = "<li><a href=\"" + url + "\" target=\"classFrame\" class=\"anchorLink\"";
    if (keywordOrNot) {
        html += " style=\"color:#666\"";
    }
    html += ">" + name + "</a></li>";
    return html;
}

/**
 * AnchorsCache
 */
function AnchorsCache() {
    this.cache = new Array();
}

AnchorsCache.prototype.add = function(classLink, anchors) {
    this.cache[classLink.getUrl()] = anchors;
}

AnchorsCache.prototype.contains = function(classLink) {
    return (this.cache[classLink.getUrl()] != null);
}

AnchorsCache.prototype.appendAnchors = function(parent, classLink, condition) {
    var anchorLinks = this.cache[classLink.getUrl()];
    if (anchorLinks == null) {
        return;
    }
    
    topAnchorLink = null;
    var html = "";
    var count = 0;
    for (var i = 0; i < anchorLinks.length; i++) {
        var al = anchorLinks[i];
        if (condition(al)) {
            count++;
            html += al.html;
            if (topAnchorLink == null) {
                topAnchorLink = al;
            }
        }
    }
    
    if (count == 1 && AUTO_OPEN && ! query.isModeChanged()) {
        var url = topAnchorLink.getUrl();
        if (url != lastAutoOpenUrl) {
            lastAutoOpenUrl = url;
            openInClassFrame(url);
        }
    }
    
    parent.innerHTML = html;
}

view.initSearchField();
view.focusField();
initialized = init();
watch(view.getFieldElement(), searchFieldChanged);

/*
 * utils
 */
function selectAnyType(xpath) {
    return document.evaluate(xpath, document, null, 
                             XPathResult.ANY_TYPE, null);
}

function watch(element, callback, msec) {
    var old;
    setInterval(function(){
        var q = element.value;
        if(old != q){
            callback(q);
            old = q;
        }
    }, msec || 200)
}

/*
var logConsole = null;
var logTimeMsec = 0;
addLogConsole();
function addLogConsole() {
    var xpathResult = selectAnyType("//font[@class='FrameHeadingFont']/b");
    var node = xpathResult.iterateNext();
    logConsole = document.createElement("textarea");
    logConsole.setAttribute("rows", "4");
    logConsole.setAttribute("cols", "50");
    node.appendChild(logConsole);
    log("start");
}
function log(msg) {
    if (logConsole == null) return;
    logConsole.value = msg + "\n" + logConsole.value;
}
function trace(msg) { log(msg); }
function logTime() { log(new Date().getTime()); }
function logTimeStart() { logTimeMsec = new Date().getTime(); }
function logTimeStop() { log(new Date().getTime() - logTimeMsec); }
*/

})();
