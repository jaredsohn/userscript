// 
// Check 10 Checkboxes
// 
// version 0.2
//  
// Copyright (c) 2007, Gleb Kozyrev
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
// select "Check 10 Checkboxes", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Check 10 Checkboxes
// @namespace     http://f10.kiev.ua/greasemonkey/
// @description   You Ctrl-check one checkbox and the next 9 are checked too
// ==/UserScript==

function F10_NS_xquery(query)
{
    var result = [];
    snapshot = document.evaluate(query, document, null,
               XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < snapshot.snapshotLength; i++)
        { result.push(snapshot.snapshotItem(i)); }
    return result;
}

function F10_NS_c10c_cb_click(sender)
{
    if (sender.ctrlKey)
    {
        var items = sender.wrappedJSObject.target.check_next;
        for (var i = 0; i < items.length; i++)
            { items[i].checked = sender.target.checked; }
    }
}

function F10_NS_c10c_init()
{
    items = F10_NS_xquery("//input[@type='checkbox']");
    for (var i = 0; i < items.length; i++) 
    {
        items[i].wrappedJSObject.check_next = items.slice(i + 1,i + 10);
        items[i].addEventListener("click",F10_NS_c10c_cb_click,false);
    }
}    

window.addEventListener("load", F10_NS_c10c_init, false);
