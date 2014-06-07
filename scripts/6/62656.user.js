// ==UserScript==
// @name           BvS Ally Types
// @namespace      BvS
// @description    Display ally type tags on team and ninja order pages.
// @licence        MIT; http://www.opensource.org/licenses/mit-license.php
// @copyright      2009, Daniel Karlsson (http://userscripts.org/users/dtkarlsson)
// @include        http://*animecubed.com/billy/bvs/team*
// @include        http://*animecubed.com/billy/bvs/ninjaorder*
// @match          http://*animecubed.com/billy/bvs/team*
// @match          http://*animecubed.com/billy/bvs/ninjaorder*
// @version        1.2.0
// @history        1.2.0 More allies, fix typo
// @history        1.1.1 Fix for team page update
// @history        1.1.0 Added PizzaWitch allies
// ==/UserScript==
/*
Copyright (c) 2009 Daniel Karlsson

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/

// Tags
var REAPER = "R";
var WASTELAND = "W";
var BURGER = "B";
var R00T = "./";

// Styles
var STYLE = {};
STYLE[REAPER] = "reaperstyle";
STYLE[WASTELAND] = "wastelandstyle";
STYLE[BURGER] = "burgerstyle";
STYLE[R00T] = "r00tstyle";

GM_addStyle(".reaperstyle {color: rgb(0%, 0%, 50%);}");
GM_addStyle(".wastelandstyle {color: rgb(50%, 0%, 0%);}");
GM_addStyle(".burgerstyle {color: rgb(33%, 33%, 0%);}");
GM_addStyle(".r00tstyle {color: rgb(0%, 50%, 0%);}");

// Ally lists
// [<tag>] = [{name: <string>, levels: [<min level>, <max level>]}, ...]
var TYPE = {};
 
TYPE[REAPER] = [
	{name: "Anonymous", levels: [1, 3]},
	{name: "Blind Fury", levels: [1, 3]},
	{name: "Bucketface", levels: [1, 3]},
	{name: "Fletch", levels: [1, 3]},
	{name: "Hermano", levels: [1, 3]},
	{name: "Hotsumoto", levels: [1, 3]},
	{name: "Hyuk", levels: [1, 3]},
	{name: "LisaLisa", levels: [1, 3]},
	{name: "MC Stripeypants", levels: [1, 3]},
	{name: "Miss Kitty", levels: [1, 3]},
	{name: "Mister Six", levels: [1, 3]},
	{name: "Mister Tea", levels: [1, 3]},
	{name: "Nadeshiko", levels: [1, 3]},
	{name: "Proof Reader", levels: [1, 3]},
	{name: "Right", levels: [1, 3]},
	{name: "Robogirl", levels: [1, 3]},
	{name: "Scary", levels: [1, 3]},
	{name: "Smiley", levels: [1, 3]},
	{name: "Smokey the Bear", levels: [2, 3]},
	{name: "Shorty", levels: [1, 3]},
	{name: "Sporty", levels: [1, 3]},
	{name: "Strawberry", levels: [1, 3]},
	{name: "Tats", levels: [1, 3]},
	{name: "TicTac", levels: [1, 3]},
	{name: "Timmy", levels: [1, 3]},
	{name: "Vanilla", levels: [1, 3]}
];

TYPE[WASTELAND] = [
	{name: "Bones", levels: [1, 3]},
	{name: "Flutie", levels: [1, 3]},
	{name: "Chunks", levels: [1, 3]},
	{name: "Good Boy", levels: [1, 3]},
	{name: "Grandmaster P", levels: [1, 3]},
	{name: "Haro", levels: [1, 3]},
	{name: "Haus", levels: [1, 3]},
	{name: "Jaws", levels: [1, 3]},
	{name: "Larry", levels: [1, 3]},
	{name: "Mr. Sandman", levels: [1, 3]},
	{name: "Palmface", levels: [1, 3]},
	{name: "Proof Reader", levels: [1, 3]},
	{name: "Rayne", levels: [1, 3]},
	{name: "SNAKEMAN", levels: [1, 3]},
	{name: "Stalkergirl", levels: [3, 3]},
	{name: "Sticky", levels: [1, 3]},
	{name: "Sue", levels: [2, 3]},
	{name: "Terri", levels: [1, 3]},
	{name: "The Paper", levels: [1, 3]},
	{name: "The Twins", levels: [1, 3]},
	{name: "Threads", levels: [1, 3]},
	{name: "Touchy", levels: [1, 3]},
	{name: "Tubby", levels: [1, 3]},
	{name: "Venus", levels: [1, 3]}
];

TYPE[BURGER] = [
	{name: "Blondie", levels: [1, 3]},
	{name: "Cici", levels: [1, 3]},
	{name: "Cipher", levels: [1, 3]},
	{name: "Euthanasia", levels: [1, 3]},
	{name: "Karen", levels: [1, 3]},
	{name: "Lulu", levels: [1, 3]},
	{name: "Nana", levels: [1, 3]},
	{name: "Proof Reader", levels: [1, 3]},
	{name: "Robogirl", levels: [3, 3]},
	{name: "Smokey the Bear", levels: [2, 3]},
	{name: "Stalkergirl", levels: [3, 3]},
	{name: "Su-chan", levels: [1, 3]},
	{name: "TACOS", level: [1, 3]}
];

TYPE[R00T] = [
	{name: "Doughman", levels: [2, 3]},
	{name: "K.Y.", levels: [2, 3]},
	{name: "Smokey the Bear", levels: [2, 3]},
	{name: "Sporty", levels: [2, 3]},
	{name: "Stalkergirl", levels: [3, 3]},
	{name: "Tempest Kitsune", levels: [1, 3]},
	{name: "Trapchan", levels: [2, 3]},
	{name: "Tsukasa", levels: [2, 3]}
];

function allyType(ally)
{
    var name, level;
    var match = ally.match(/\s*(.*)( Lvl. (\d+))/);
    if (match) {
    	name = match[1];
		level = parseInt(match[3]);
	} else {
        match = ally.match(/\s*(.*)\s*/);
        if (match) {
            name = match[1];
            level = 1;
        } else
            return;
    }

	var cls = "";
    for (var c in TYPE)
        for (var i = 0; i < TYPE[c].length; i++)
            if (name.indexOf(TYPE[c][i].name) >= 0 && level >= TYPE[c][i].levels[0] && level <= TYPE[c][i].levels[1])
                cls += "<span class='" + STYLE[c] + "'>" + c + "</span>";
    return cls;
}

if (/billy.bvs.team/.test(location.href)) {
    // //*[@id="wrapper"]/div/center/table/tbody/tr/td/table[2]/tbody/tr[2]/td[1]/center/table/tbody/tr[3]/td[3]/center/table/tbody/tr/td/font/center[1]/center[1]/table/tbody/tr[1]/td[2]/b
	// Team page
	var allies = document.evaluate("//div[@id='teamrep']/table/tbody/tr/td/label/b", document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < allies.snapshotLength; i++) {
		var node = allies.snapshotItem(i);
        var ally = node.textContent;
		var cls = allyType(ally);
		if (cls != "") {
			var sup = document.createElement("sup");
			sup.innerHTML = "[" + cls + "]";
			node.appendChild(sup);
			sup.setAttribute("style", "font-size: 75%;");
		}
	}
	// Team
	var allies = document.evaluate("//*[@id='wrapper']/div/center/table/tbody/tr/td/table[2]/tbody/tr[2]/td[1]/center/table/tbody/tr[3]/td[3]/center/table/tbody/tr/td/font/center[1]/center[1]/table/tbody/tr/td[2]/b", document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < allies.snapshotLength; i++) {
		var node = allies.snapshotItem(i);
        var ally = node.textContent;
		var cls = allyType(ally);
		if (cls != "") {
			var sup = document.createElement("sup");
			sup.innerHTML = "[" + cls + "]";
			node.appendChild(sup);
			sup.setAttribute("style", "font-size: 75%;");
		}
	}
} else if (/billy.bvs.ninjaorder/.test(location.href)) {
	// Ally Reorganization page
	var allies = document.evaluate("//ul[@id='DragContainer7']/li", document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < allies.snapshotLength; i++) {
		var node = allies.snapshotItem(i);
		var img = node.getElementsByTagName("img")[0];
		var desc = node.getElementsByTagName("font")[0].textContent;
		var ally = img.nextSibling.nodeValue;
		ally = ally.replace(/^\s*/, "");
		ally = ally.replace(/\s*$/, "");
		node.innerHTML = "";
		node.appendChild(img);
		img.setAttribute("style", "margin: 3px; vertical-align: middle;");
		node.appendChild(document.createTextNode(ally));
		var cls = allyType(ally);
		if (cls != "") {
			var sup = document.createElement("sup");
			sup.innerHTML = "[" + cls + "]";
			node.appendChild(sup);
			sup.setAttribute("style", "font-size: 75%;");
		}
		node.appendChild(document.createTextNode(" "));
		var span = document.createElement("span");
		span.setAttribute("style", "font-weight: normal;");
		span.appendChild(document.createTextNode(desc));
		node.appendChild(span);
	}
}
