// XFN Viewer
// version 0.1 beta
// 2005-04-23
// Copyright (c) 2005, XIU
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "XFN Viewer", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          XFN Viewer
// @namespace     http://users.telenet.be/-_X_-/gm/
// @description   Shows XFN links defined on the page (http://gmpg.org/xfn/).
// @include       *
// ==/UserScript==

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

	LiP = document.getElementsByTagName('a');
	akeys = new Array();
	XFNregex = /(acquaintance|friend|met|co-worker|colleague|co-resident|neighbor|child|parent|sibling|spouse|muse|crush|date|sweetheart)/;
	for (i = 0; i < LiP.length; i++) {
		if (XFNregex.test(LiP[i].rel)) {
			akeys.push(LiP[i]);
			//LiP[i].style.background='#FF0';
		}
	}
    if (akeys.length == 0) { return; }
    descriptions = new Array();
    desc = '';
    for (i in akeys) {
		a = akeys[i];
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
            a.rel + ']</strong> ';
        if (a.href) {
            desc += '<a href="' + a.href + '">' + desctext + '</a>';
        } else {
            desc += desctext;
        }
        descriptions.push(desc);
    }
    quicksort(descriptions, 0, descriptions.length - 1);
    div = document.createElement('div');
    div.id = 'xfnviewer-div-0';
    desc = '<div><ul><li class="first">' + descriptions[0] + '</li>';
    for (i = 1; i < descriptions.length; i++) {
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
'#xfnviewer-div-0 {'+
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
'#xfnviewer-div-0 a,' +
'#xfnviewer-div-0 li,' +
'#xfnviewer-div-0 span,' +
'#xfnviewer-div-0 strong {' +
'  background-color: transparent;' +
'  color: white;' +
'}' +
'#xfnviewer-div-0 div {' +
'  margin: 0 1em 0 1em;' +
'}' +
'#xfnviewer-div-0 div ul {' +
'  margin-left: 0;' +
'  margin-bottom: 5px;' +
'  padding-left: 0;' +
'  display: inline;' +
'}' +
'#xfnviewer-div-0 div ul li {' +
'  margin-left: 0;' +
'  padding: 3px 15px;' +
'  border-left: 1px solid silver;' +
'  list-style: none;' +
'  display: inline;' +
'}' +
'#xfnviewer-div-0 div ul li.first {' +
'  border-left: none;' +
'  padding-left: 0;' +
'}');
})();

