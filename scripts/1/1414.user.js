
// Access Bar
// version 0.8 BETA!
// 2005-07-08
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script that shows accesskeys defined
// on a web page.  Example page: http://diveintomark.org/
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
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
// @name          Access Bar
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   show accesskeys defined on page
// @include       *
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

(function() {
    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    function quicksort(ar, start, end) {
        var tmp, low, high, pivot;
        if (end == start+1) {
            if (ar[start] > ar[end]) {
                tmp = ar[start]; ar[start] = ar[end]; ar[end] = tmp;
            }
            return;
        }
        pivot = ar[parseInt((start + end) / 2)];
        ar[parseInt((start + end) / 2)] = ar[start];
        ar[start] = pivot;
        low = start + 1;
        high = end;
        do {
            while ((low <= high) && (ar[low] <= pivot)) { low += 1; }
            while (ar[high] > pivot) { high -= 1; }
            if (low < high) {
                tmp = ar[low]; ar[low] = ar[high]; ar[high] = tmp;
            }
        } while (low < high);
        ar[start] = ar[high];
        ar[high] = pivot;
        if (start < high - 1) { quicksort(ar, start, high - 1); }
        if (high + 1 < end) { quicksort(ar, high + 1, end); }
    }

    var akeys, descriptions, a, i, desc, label, div;
    akeys = document.evaluate(
        "//*[@accesskey]",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    if (!akeys.snapshotLength) { return; }
    descriptions = new Array();
    desc = '';
    for (i = 0; i < akeys.snapshotLength; i += 1) {
        a = akeys.snapshotItem(i);
        desctext = '';
        if (a.nodeName == 'INPUT') {
            label = document.evaluate("//label[@for='" + a.name + "']",
                document,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null).singleNodeValue;
            if (label) {
                desctext = label.title;
                if (!desctext) { desctext = label.textContent; }
            }
        }
        if (!desctext) { desctext = a.textContent; }
        if (!desctext) { desctext = a.title; }
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
    quicksort(descriptions, 0, descriptions.length - 1);
    div = document.createElement('div');
    div.id = 'accessbar-div-0';
    desc = '<div><ul><li class="first">' + descriptions[0] + '</li>';
    for (i = 1; i < descriptions.length; i += 1) {
        desc = desc + '<li>' + descriptions[i] + '</li>';
    }
    desc = desc + '</ul></div>';
    div.innerHTML = desc;
    document.body.style.paddingBottom = "4em";
    window.addEventListener(
        "load",
        function() {
            document.body.appendChild(div);
        },
        true);
    addGlobalStyle(
'#accessbar-div-0 {'+
'  position: fixed;' +
'  left: 0;' +
'  right: 0;' +
'  bottom: 0;' +
'  top: auto;' +
'  border-top: 1px solid silver;' +
'  background: black;' +
'  color: white;' +
'  margin: 1em 0 0 0;' +
'  padding: 5px 0 0.4em 0;' +
'  width: 100%;' +
'  font-family: Verdana, sans-serif;' +
'  font-size: small;' +
'  line-height: 160%;' +
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
'  padding: 3px 15px;' +
'  border-left: 1px solid silver;' +
'  list-style: none;' +
'  display: inline;' +
'}' +
'#accessbar-div-0 div ul li.first {' +
'  border-left: none;' +
'  padding-left: 0;' +
'}');
})();

//
// ChangeLog
// 2005-07-08 - 0.8 - MAP - added license block
// 2005-04-21 - 0.7 - MAP - linted
// 2005-04-21 - 0.6 - MAP - change addGlobalStyle and quicksort to normal functions
// 2005-04-18 - 0.5 - MAP - change order of steps, tidy code
// 2005-04-16 - 0.4 - MAP - remove count(//*[@accesskey]) call, just check length of //*[@accesskey] XPath query result
// 2005-04-15 - 0.3 - MAP - changed addGlobalStyle function to check for <head> element
// 2005-04-14 - 0.2 - MAP - changed addGlobalStyle function to use local variables
//
