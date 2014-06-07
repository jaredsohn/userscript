// LJ Parent Quick-View
// Copyright (c) 2005, Gavri Fernandez (gavri dot fernandez at gmail dot com)
// Homepage: http://www.livejournal.com/users/ga_woo
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
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          	LJ Parent Quick-View
// @description		Adds a link for viewing the content of the parent post
// @include      	http://*.livejournal.com/*
// @namespace           http://www.livejournal.com/users/ga_woo
// ==/UserScript==

var parent_quick_view;

if (typeof(unsafeWindow.LJ_cmtinfo) == "undefined") {
  return;
}

var comments = {};
var comment_subjects = {}
var users = {};
for(var i in unsafeWindow.LJ_cmtinfo) { 
 var comment =  document.getElementById("ljcmt" + i);
 var comment_header = document.getElementById("cmtbar" + i);
 if (comment_header) {
   comment_subjects[i] = document.evaluate(
                              "font/b",
                              comment_header,
                              null,
                              XPathResult.FIRST_ORDERED_NODE_TYPE,
                              null).singleNodeValue.innerHTML;
 }
 if (comment) {
   comments[i] = (comment.firstChild.lastChild.firstChild.innerHTML)
   users[i] = unsafeWindow.LJ_cmtinfo[i]['u'];
 }
}


var all_parent_links = document.evaluate(
    "//table/tbody/tr/td/p/font/a[contains(@href, '?thread=') and .='Parent']",
    document, 
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);


for(var j = 0; j < all_parent_links.snapshotLength; j++) {
   var parent_link = all_parent_links.snapshotItem(j);
   var parent_id = eval(parent_link.href.replace(/(.*)([?&])(thread=)([0-9]*)(.*)/, "$4"));
   if (!comments[parent_id]) continue;
   var parent_quick_view_button = document.createElement('span');
   var parent_link_style = getComputedStyle(parent_link, '');
   parent_quick_view_button.style.color = parent_link_style.color;
   parent_quick_view_button.style.backgroundColor = parent_link_style.backgroundColor;
   var parantheses = document.createTextNode(' ');
   parent_quick_view_button.addEventListener("mousedown", createParentQuickViewFunction(parent_quick_view_button, parent_id), true);
   parent_quick_view_button.innerHTML="QV";
   parent_link.parentNode.insertBefore(parent_quick_view_button, parent_link.nextSibling);
   parent_link.parentNode.insertBefore(parantheses, parent_link.nextSibling);
}

document.addEventListener('mouseup', function(event) {
    // event.target is the element that was clicked
    if (parent_quick_view != null && parent_quick_view.parentNode != null)
    {
      parent_quick_view.parentNode.removeChild(parent_quick_view);
    }
}, true);



function createParentQuickViewFunction (ae, id) {
    return function (e) {
         if (!e) e = unsafeWindow.event;
         var clickTarget = unsafeWindow.getTarget(e);
         var used_keyboard = clickTarget.nodeName == "A";
         var pos = used_keyboard ? getElementPos(ae) : unsafeWindow.getEventPos(e);
         var lx = pos.x + 5 - 250;
         if (lx < 5) lx = 5;
         parent_quick_view = document.createElement("div");
         parent_quick_view.style.filter = "";
         parent_quick_view.style.opacity = 1.0;
         parent_quick_view.innerHTML="<b>[" + users[id] + "]  " + comment_subjects[id] + " </b><br>" + comments[id];
         parent_quick_view.style.textAlign = "left";
         parent_quick_view.className = 'ljcmtmanage';
         parent_quick_view.style.position = "absolute";
         parent_quick_view.style.left = lx + "px";
         parent_quick_view.style.top = (pos.y + 5) + "px";
         unsafeWindow.addAfter(ae, parent_quick_view);
         unsafeWindow.stopEvent(e);
         return false; 
    }
}
