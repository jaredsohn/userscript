// Access Bar Pro
//
// Uses the code of:
// Access Bar2
// version 0.9-Vasco2
// 2006-04-10
// Vasco
//
// Uses the code of:
// Access Bar
// version 0.9 BETA!
// 2005-05-02
// Copyright (c) 2005, Mark Pilgrim
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Access Bar", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name         Access Bar Pro
// @namespace	 http://refactoror.net/
// @description  Show the accesskeys that are defined on a page.
// @include      *
// ==/UserScript==

/* BEGIN LICENSE BLOCK
Copyright (C) 2005 Mark Pilgrim

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://diveintomark.org/projects/greasemonkey/COPYING
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK */

(function()
{
    var descriptions = new Array();
    var desc = "";

    foreachNode
    (
        "//*[@accesskey]",
        function(a)
        {
            var desctext;

            if (a.nodeName == "INPUT" || a.nodeName == "SELECT") {
                var label = selectNode("//label[@for='" + a.name + "']");
                if (label) {
                    desctext = label.title;
                    if (!desctext) {
                        desctext = label.textContent;
                    }
                }
            }
            if (!desctext) { desctext = a.title; }
            if (!desctext) { desctext = a.textContent; }
            if (!desctext) { desctext = a.name; }
            if (!desctext) { desctext = a.id; }
            if (!desctext) { desctext = a.href; }
            if (!desctext) { desctext = a.value; }

            desc = '<strong>[' +
        	   a.getAttribute('accesskey').toUpperCase() + ']</strong> ';
            if (a.href) {
        	   desc += '<a href="' + a.href + '">' + desctext + '</a>';
            } else {
        	   desc += desctext;
            }
            descriptions.push(desc);
        }
    );
    if (desc == "")
        return;

    switch (getSetting("sortOrder", "page")) {
        case "key":
            descriptions.sort();
            break;
        // "page"
        default:
    }

    desc =
        '<span style="margin:3px;width:30px;height:10px;' +
            'border:2px solid #ffc; line-height:10px;text-align:center;cursor:pointer" ' +
        'title="click to close the access bar" ' +
        'onclick="var accessbar=document.getElementById(\'accessbar-div-0\'); ' +
        'accessbar.parentNode.removeChild(accessbar);">' +
        'X</span>';

    if (getSetting("showButtonText", false)) {
        desc += "Close";
    }

    div = document.createElement("div");
    div.id = "accessbar-div-0";
    desc = '<div><ul><li class="first">' + desc + '</li>';
    for (var i in descriptions) {
        desc += '<li>' + descriptions[i] + '</li>';
    }
    desc = desc + '</ul></div>';
    div.innerHTML = desc;

    document.body.style.paddingBottom = "4em";

    addGlobalStyle(
        '#accessbar-div-0 {' +
        '  position: fixed;' +
        '  left: 0;' +
        '  right: 0;' +
        '  bottom: 0;' +
        '  top: auto;' +
        '  border: none;' +
        '  background: black;' +
        '  color: white;' +
        '  margin: 1em 0 0 0;' +
        '  padding: 5px 0 0.4em 0;' +
        '  width: 100%;' +
        '  font-family: Verdana, sans-serif;' +
        '  font-size: ' + getSetting("font-size", "7pt") + ';' +
        '  line-height: 160%;' +
        '  z-index: 99999;' +
        '  opacity: ' + getSetting("opacity", ".70") + ';' +
        '}' +
        '#accessbar-div-0 a,' +
        '#accessbar-div-0 li,' +
        '#accessbar-div-0 span,' +
        '#accessbar-div-0 strong {' +
        '  background-color: transparent;' +
        '  color: white;' +
        '}' +
        '#accessbar-div-0 div {' +
        '  margin: 0 1em 0 1em;' +
        '}' +
        '#accessbar-div-0 div ul {' +
        '  margin-left: 0;' +
        '  margin-bottom: 5px;' +
        '  padding-left: 0;' +
        '  display: inline;' +
        '}' +
        '#accessbar-div-0 div ul li {' +
        '  margin-left: 0;' +
        '  padding: 0px 8px;' +
        '  border-left: 1px solid silver;' +
        '  list-style: none;' +
        '  display: inline;' +
        '}' +
        '#accessbar-div-0 div ul li.first {' +
        '  border-left: none;' +
        '  padding-left: 0;' +
        '}'
    );

    document.body.appendChild(div);



    // ---------- General purpose utilities ----------

    function getSetting(name, defaultValue)
    {
        var value = GM_getValue(name, defaultValue);

        if (typeof(value) == "undefined") {
            return null;
        }

        GM_setValue(name, value);

        return value;
    }

    function selectNode(xpath, theDoc)
    {
        if (theDoc == null) {
            theDoc = document;
        }

        var resultNode = theDoc.evaluate(xpath, theDoc, null,
            XPathResult.FIRST_ORDERED_NODE_TYPE, null);

        var node = resultNode.singleNodeValue;
        if (node == null) {
            // is it possible that the structure of this web page has changed?
            GM_log("XPath returned no elements: " + xpath);
        }
        return node;
    }

    function foreachNode(xpath, func)
    {
        var nodeSet = document.evaluate(xpath, document, null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

        var i = 0;
        var n = nodeSet.snapshotItem(i);
        while (n != null) {
            func(n);
            n = nodeSet.snapshotItem(++i);
        }
    }

    function addGlobalStyle(css)
    {
        var head = selectNode("//head");
        if (!head)
            return;

        var style = document.createElement("style");
        style.type = "text/css";
        style.innerHTML = css;

        head.appendChild(style);
    }

})();
