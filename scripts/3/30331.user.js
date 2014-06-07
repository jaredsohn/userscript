// ==UserScript==
// @name           Splitview
// @namespace      splitview
// @description    Adds links to most news websites to allow easy viewing of story and comments side by side. Works for Hacker News, Reddit and Digg.
// @include        http://news.ycombinator.com/*
// @include        http://www.reddit.com/*
// @include        http://digg.com/*
// ==/UserScript==


var SPLITTER_URL = "http://nirmalpatel.com/splitview/splitview.html?";
var LINK_INNARDS = document.createTextNode("SPLIT VIEW");

var _timer = null;

String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g,"");
}

function HN_findLinks() {
    var tds = document.getElementsByTagName("td");
    var article = null;
    var discuss = null;

    var splittable = new Array();
    
    for (var i=0; i < tds.length; i++) {
        var td = tds[i];
        if (td.className == "title") {
            if (td.firstChild.href) {
                article = td.firstChild.href;
            }
        } else if (td.className == "subtext") {
            
            for (var c=0; c < td.childNodes.length; c++) {
                var child = td.childNodes[c];
                if (child.href && (child.href.indexOf("http://news.ycombinator.com/item?") == 0)) {
                    discuss = child.href;
                }
            }
            
            if (article && discuss  && (article != discuss)) {
                var split = new Array(0);
                split.push(article);
                split.push(discuss);
                split.push(td);
                splittable.push(split);
            }
            
            article = discuss = holder = null;
        }
    }
    
    return splittable;
}

function Reddit_findLinks() {
    var as = document.getElementsByTagName("a");
    var article = null;
    var discuss = null;
    var splittable = new Array();
        
    for (var i=0; i < as.length; i++) {
        var a = as[i];
        if (a.className.trim() == "title") {
            article = a.href;
        } else if (a.className.trim() == "comments") {
            discuss = a.href;
            if (article && discuss && (article != discuss)) {
                var split = new Array(0);
                split.push(article);
                split.push(discuss);
                split.push(a.parentNode);
                splittable.push(split);
                article = discuss = null;
            }
        }
    }
    
    return splittable;
}

function Digg_findLinks() {
    var as = document.getElementsByTagName("a");
    var article = null;
    var discuss = null;
    var splittable = new Array();
        
    for (var i=0; i < as.length; i++) {
        var a = as[i];
        if (a.className.trim().indexOf("offsite") == 0) {
            article = a.href;
        } else if (a.className.trim() == "tool comments") {
            discuss = a.href;
            if (article && discuss && (article != discuss)) {
                var split = new Array(0);
                split.push(article);
                split.push(discuss);
                split.push(a.parentNode);
                split.push(createLink(article, discuss, "tool"));
                splittable.push(split);
                article = discuss = null;
            }
        }
    }
    
    return splittable;
}

var findLinks = {
    "HN"     : HN_findLinks,
    "Reddit" : Reddit_findLinks,
    "Digg"   : Digg_findLinks
}


function siteKey() {
    var host = location.host;
    if (host == "news.ycombinator.com") {
        return "HN";
    } else if (host == "www.reddit.com") {
        return "Reddit";
    } else if (host == "digg.com") {
        return "Digg";
    }
    return null;
}

function createLink(article, discuss, cssClass) {
    var s = document.createElement("span");
    s.appendChild(document.createTextNode(" | "));
    var a = document.createElement("a");
    a.href = SPLITTER_URL + "a=" + encodeURIComponent(article) + "&d=" + encodeURIComponent(discuss);
    a.appendChild(LINK_INNARDS.cloneNode(true));
    if (cssClass) {
        s.className = cssClass;
    }
    s.appendChild(a);
    return s;
}

var called = false;
function addSplitview() {
    if (called) return;
    called = true;
    var key = siteKey();
    if (findLinks[key]) {
        var splittables = (findLinks[key])();
        for (var s=0; s < splittables.length; s++) {
            var link = splittables[s][3];
            if (!link) {
                link = createLink(splittables[s][0], splittables[s][1])
            }
            splittables[s][2].appendChild(link);
        }
    }
}

/* for Safari */
if (/WebKit/i.test(navigator.userAgent)) { // sniff
    _timer = setInterval(function() {
        if (/loaded|complete/.test(document.readyState)) {
            addSplitview(); // call the onload handler
            if (_timer) clearInterval(_timer);
        }}, 10);
    }

window.addEventListener('load', addSplitview, true);