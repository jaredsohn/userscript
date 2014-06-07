
// Backpack TOC user script
// version 0.1 BETA!
// 2009-05-25
// Copyright (c) 2009, Nick Grossman
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
// select "Backpack TOC", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Backpack TOC
// @namespace     http://blog.wrkng.net/2009/05/backpack-toc-greasemonkey-script/
// @description   Create an automated table of contents for Backpack pages
// @include       https://*.backpackit.com/*
// @exclude       
// ==/UserScript==


function getElementsByClassName(classname, node) {
  if(!node) node = document.getElementsByTagName("body")[0];
  var a = [];
  var re = new RegExp('\\b' + classname + '\\b');
  var els = node.getElementsByTagName("*");
  for(var i=0,j=els.length; i<j; i++)
  if(re.test(els[i].className))a.push(els[i]);
  return a;
}

/*
 ** Matt Kruse's hasClass, with slight modification
 ** Determine if an object or class string contains a given class.
 ** http://snipplr.com/view/3337/kruses-hasclass/
*/
function hasClass (obj, className) {
  if (typeof obj == 'undefined' || obj==null || !RegExp) { return false; }
  var re = new RegExp("(^|\\s)" + className + "(\\s|$)");
  if (typeof(obj)=="string") {
    return re.test(obj);
  } else if (typeof(obj)=="object" && obj.className) {
    return re.test(obj.className);
  }
  return false;
}

function getWidgets() {
  /* where we'll store all our widgets */
  var widgets = new Array();
  
  var nodes = document.getElementById('widgets').getElementsByClassName('widget');
        
  for (var i = 0; i < nodes.length; i++) {
    if (hasClass(nodes[i],'list_wrapper') || hasClass(nodes[i],'note_wrapper') || hasClass(nodes[i],'writeboard_link_wrapper') || hasClass(nodes[i],'separator_wrapper') || hasClass(nodes[i],'attachment_wrapper') || hasClass(nodes[i],'gallery_wrapper')) {
      var widget = {}
      widget['id'] = nodes[i].getAttribute('id');
      widget['name'] = nodes[i].getElementsByTagName('highlightable')[0].innerHTML;
      widgets.push(widget);
    } 
  }
  
  return widgets;
}

function makeTOC() {
  var widgets = getWidgets();
  var ul = document.createElement('UL');
  
  for (var i = 0; i < widgets.length; i++) {
    var li = document.createElement('LI');
    var a = document.createElement('A');
    a.innerHTML = widgets[i].name;
    a.href = "#" + widgets[i].id;
    li.appendChild(a);
    ul.appendChild(li);
  }
  
  if (widgets.length > 3) document.getElementById('page_title_wrapper').appendChild(ul);
}

/* let 'er rip */
makeTOC();

