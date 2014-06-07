// Internet slang cleaner
// version 1.2.4
// 2007-06-28
// Copyright (c) 2007, Jarno Elovirta
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name           Internet slang cleaner
// @namespace      http://elovirta.com/greasemonkey/
// @description    Cleans internet slang from web pages. Version 1.2.4.
// @include        http://vampirefreaks.com/*
// @include        http://*.myspace.com/*
// ==/UserScript==


var NS_XHTML = "http://www.w3.org/1999/xhtml";
var DEFAULT_LANGUAGE = "default.language";
var SHOW_CHANGES = "show.changes";

var maps = {
    en: [
        ["(yo)?u'(d|ll|ve)", "you'$4", , 5],
        ["(yo)?u'(r|v)", "you'$4e", , 5],
        ["u +r", "you're"],
        ["(o) *rly", "$3h really", , 4], 
        ["(u|ya)", "you", , 4],
        ["ur", "your"],
        ["r", "are"],
        ["(s)ux", "$3ucks", , 4],
        ["(k)no", "$3now", , 4],
        ["(t)hx", "$3hanks", , 4],
        ["(m)i", "$3y", , 4],
        ["im", "I'm", "gm", 3],
        ["y", "why"],
        ["n", "and"],
        ["(i|I)d", "I'd", "gm", 4],
        ["alot", "a lot"],
        ["(can|doesn|wasn|don|won|hasn)t", "$3't", , 4],
        ["(be)?cuz", "because"],
        ["(what|here)s", "$3's", , 4],
        ["i", "I", "gm"],
        ["kewl", "cool"],
        ["plz", "please"],
    ],
};
var start = "^|[^\\w']";
var end   = "$|[^\\w']";

var sTag = "";
var eTag = "";
var regexpMap;
var show;

function setup() {
    if (GM_getValue(DEFAULT_LANGUAGE, undefined) === undefined) {
        GM_setValue(DEFAULT_LANGUAGE, "en");
    }
    if (GM_getValue(SHOW_CHANGES, undefined) === undefined) {
        GM_setValue(SHOW_CHANGES, true);
    }
}

function init() {
    setup();
    show = GM_getValue(SHOW_CHANGES);
    if (show) {
        sTag = "<abbr title='$2'>";
        eTag = "</abbr>";
    }
    regexpMap = getRegExp();
    regexpMap[regexpMap.length] = [
        new RegExp("((![!1]+))", "gm"),
        sTag + "!" + eTag,
    ];
    regexpMap[regexpMap.length] = [
        new RegExp("((\\?\\?+))", "gm"),
        sTag + "?" + eTag,
    ];    
    regexpMap[regexpMap.length] = [
        new RegExp("(" + start + ")(i)'", "gm"),
        "$1" + sTag + "I" + eTag + "'",
    ];    
        
    var body = document.getElementsByTagName("body");
    if (body.length > 0) {
        textNodeWalker(body[0]);
    }
}


function getLanguage() {
    var root = document.documentElement;
    var lang = root.getAttribute("lang");
    if (lang === null) {
        lang = root.getAttributeNS(NS_XHTML, "lang");
    } 
    if (lang === null) {
        lang = GM_getValue(DEFAULT_LANGUAGE);
    }
    if (maps[lang] === undefined) {
        lang = lang.substring(0, lang.indexOf("-"));
        if (maps[lang] === undefined) {
            lang = GM_getValue(DEFAULT_LANGUAGE);
        }
    }
    return lang;
}

function getRegExp() {
    var map = maps[getLanguage()];
    var buf = [];
    for (var i = 0; i < map.length; i++) {
        var last = (map[i].length >= 4 && map[i][3] !== undefined) ? map[i][3] : 3; 
        var modifiers = (map[i].length >= 3 && map[i][2] !== undefined) ? map[i][2] : "gim"; 
        buf[buf.length] = [
            new RegExp("(" + start + ")(" + map[i][0] + ")(" + end + ")", modifiers),
            "$1" + sTag + map[i][1] + eTag + "$" + last,
        ];
    }
    return buf;
}

function textNodeWalker(node) {
    if (node.nodeType === 3) { // Node.TEXT_NODE
        var buf = node.data;
        var len = buf.length;
        for (var i = 0; i < regexpMap.length; i++) {
			buf = buf.replace(regexpMap[i][0], regexpMap[i][1]);
		}
		if (node.data !== buf) {
		  if (show) {
			  var span = document.createElement("span");
			  span.innerHTML = buf;
			  node.parentNode.insertBefore(span, node);
			  node.parentNode.removeChild(node);
			} else {
			  node.data = buf;
			}
		}
	} else if (node.nodeType === 1) { // Node.ELEMENT_NODE
		if (node.nodeName.toLowerCase() === "textarea") {
			return;	
		}
		var children = node.childNodes;
		for (var i = 0; i < children.length; i++) {
			textNodeWalker(children[i]);
		}
	}
}

init();