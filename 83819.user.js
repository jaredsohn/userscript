// ==UserScript==
// @name		UD Better Name Colorer
// @namespace		http://www.aichon.com
// @description		Modifies the colors of character names from the defaults
// @include		http://urbandead.com/*
// @include		http://www.urbandead.com/*
// @exclude		http://urbandead.com/map.cgi?logout
// @exclude		http://www.urbandead.com/map.cgi?logout
// ==/UserScript==

/* Urban Dead Better Name Colorer
 * v1.1
 *
 * Copyright (C) 2009 Bradley Sattem
 * Author: Bradley Sattem (a.k.a. Aichon)
 * Last Modified: 2009-10-27
 * 
 * Tested under: Safari 4.0 on Mac
 *   
 * Contact: [my first name [DOT] my last name]@gmail.com (check the Copyright info for my name)
 *
 * Changes:
 *   v1.1 - Tweaks and changes so it plays nice with Barrista
 *   v1.0 - Initial public release
 *
 * Thanks:
 *   gurujery - I blatantly "borrowed" his code from the UrbanDead Plain Looking userscript
 */

var css = new Array();

function writeStyle(css) {
    var style = document.createElement('style');
    style.type = 'text/css';
    if (document.getElementsByTagName) {
        document.getElementsByTagName('head')[0].appendChild(style);
        if (style.sheet && style.sheet.insertRule) {
            for (var i = 0; i < css.length; i++) {
                style.sheet.insertRule(css[i], 0);
            }
        }
    }
}

function addStyle(style) {
    css[css.length] = style;
}

// Define your CSS here
addStyle("a.barricade {color: #232 ! important;}");
addStyle("a.barricade:hover, a.barristaButton:hover {text-decoration: none ! important;}");
addStyle("a.caddy:hover {text-decoration: none ! important;}");
addStyle("a.barristaCharName:hover {text-decoration: underline ! important;}");
addStyle("a {color: #ded ! important;}");
addStyle("a:hover {text-decoration: underline ! important;}");
addStyle("table.c a {color: #000 ! important;}");
addStyle("table.c td.sb a {color: #ded ! important;}");
addStyle(".con1 {color: #c6c6c6 ! important; font-weight: normal ! important;}");	// gray
addStyle(".con2 {color: #eca1a3 ! important; font-weight: normal ! important;}");	// red
addStyle(".con3 {color: #f4ca79 ! important; font-weight: normal ! important;}");	// orange
addStyle(".con4 {color: #fef38b ! important; font-weight: normal ! important;}");	// yellow
addStyle(".con5 {color: #b4de88 ! important; font-weight: normal ! important;}");	// green
addStyle(".con6 {color: #a6bafa ! important; font-weight: normal ! important;}");	// blue
addStyle(".con7 {color: #caa6ea ! important; font-weight: normal ! important;}");	// purple
addStyle(".con8 {color: #303030 ! important; font-weight: normal ! important;}");	// black
addStyle(".con9 {color: #ffffff ! important; font-weight: normal ! important;}");	// white

// Writes CSS to the document
writeStyle(css);

/*var targets = new Array();
var styles = new Array();

targets[0] = document.evaluate("//a[contains(@href, 'profile.cgi?id')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
targets[1] = document.evaluate("//a[@class='con1']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
targets[2] = document.evaluate("//a[@class='con2']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
targets[3] = document.evaluate("//a[@class='con3']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
targets[4] = document.evaluate("//a[@class='con4']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
targets[5] = document.evaluate("//a[@class='con5']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
targets[6] = document.evaluate("//a[@class='con6']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
targets[7] = document.evaluate("//a[@class='con7']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
targets[8] = document.evaluate("//a[@class='con8']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
targets[9] = document.evaluate("//a[@class='con9']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

styles[0] = 'color: #ded;'
styles[1] = 'color: #c6c6c6; font-weight: normal;'
styles[2] = 'color: #eca1a3; font-weight: normal;'
styles[3] = 'color: #f4ca79; font-weight: normal;'
styles[4] = 'color: #fef38b; font-weight: normal;'
styles[5] = 'color: #b4de88; font-weight: normal;'
styles[6] = 'color: #a6bafa; font-weight: normal;'
styles[7] = 'color: #caa6ea; font-weight: normal;'
styles[8] = 'color: #303030; font-weight: normal;'
styles[9] = 'color: #ffffff; font-weight: normal;'

applyStyles(targets, styles);

function applyStyles(targets, styles) {
	for(var i = 0; i < targets.length; i++) {
		for(var j = 0; j < targets[i].snapshotLength; j++) {
			targets[i].snapshotItem(j).setAttribute('style', styles[i]);
		}
	}
}*/