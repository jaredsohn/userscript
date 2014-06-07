// ==UserScript==
// @id             viewAddonVersions@amoe-tools
// @name           AMOE: View Add-on Versions
// @namespace      amoe-tools
// @author         Erik Vold <erikvvold@gmail.com> http://erikvold.com/
// @version        0.1.2
// @description    Adds a "View Add-on Versions" link to add-on review pages.
// @homepageURL    http://userscripts.org/scripts/show/104727
// @include        https://addons.mozilla.org/en-US/editors/review/*
// @run-at         window-load
// ==/UserScript==

function $(id) document.getElementById(id);
var actions = $("actions-addon");
var a = document.evaluate("//li/a[contains(text(), 'View Listing')]",
    actions, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var li = document.createElement("li");

a = a.cloneNode(false);
a.href += "versions/";
a.innerHTML = "View Versions";
li.appendChild(a);
actions.appendChild(li);
