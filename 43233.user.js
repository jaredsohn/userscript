// Checkvist inline formatting
// version 0.11 (beta) 27/02/2009
// Copyright (c) 2009, Martin Brook
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
// select "Zoom Textarea", and click Uninstall.
//
// --------------------------------------------------------------------
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Checkvist inline formatting
// @namespace      martinbrook.com
// @description    *bold*, /italic/ and _underline_ replaced with formatting
// @include        http://checkvist.com/*
// ==/UserScript==

function wiki_formatting(txt) {
  var out='';
  var stack=new Array();
  var pos=0;
  for (var n=0;n<txt.length;n++) {
    if (txt.charAt(n)=='*') {
      //Process bold
      if (stack.slice(-1)==1) {
        stack.pop();
        out+="</b>";
      } else {
        if (stack.slice(-1)!=4 && stack.slice(-1)!=5) {
          stack.push(1);
          out+="<b>";
        } else {
          out+='*';
        }
      }
    } else if (txt.charAt(n)=='/') {
      //Process italic
      if (stack.slice(-1)==2) {
        stack.pop();
        out+="</i>";
      } else {
        if (stack.slice(-1)!=4 && stack.slice(-1)!=5) {
          stack.push(2);
          out+="<i>";
        } else {
          out+='/';
        }
      }
    } else if (txt.charAt(n)=='_') {
      //Process underscore
      if (stack.slice(-1)==3) {
        stack.pop();
        out+="</u>";
      } else {
        if (stack.slice(-1)!=4 && stack.slice(-1)!=5) {
          stack.push(3);
          out+="<u>";
        } else {
          out+='_';
        }
      }
    } else if (txt.substring(n,n+2).toLowerCase()=='<a') {
      //Process beginning of link
      if (stack.slice(-1)!=4 && stack.slice(-1)!=5) {
        stack.push(4); // inside a link
        stack.push(5); // inside a tag
      }
      out+='<';
    } else if (txt.substring(n,n+4).toLowerCase()=='</a>') {
      //Process end of link
      if (stack.slice(-1)==4) {
        stack.pop(); //no longer inside a link
      }
      if (stack.slice(-1)!=5) {
        stack.push(5); //inside a tag
      }
      out+='<';
    } else if (txt.charAt(n)=='<') {
      //Process beginning of open tag
      stack.push(5); // inside a tag

      out+='<';
    } else if (txt.charAt(n)=='>') {
      //Process end of tag
      if (stack.slice(-1)==5) {
        stack.pop(); // no longer in tag.
      }
      out+='>';
    } else {
      //Just add the char
      out+=txt.charAt(n);
    }
  }

  if (stack.length>0) {
    return txt;
  } else {
    return out;
  }
};


var tasks, task;
tasks = document.evaluate(
    "//span[@class='task_name']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < tasks.snapshotLength; i++) {
    task = tasks.snapshotItem(i);
    task.innerHTML=wiki_formatting(task.innerHTML);
}


var originalFn = unsafeWindow.maxkir.format_for_rendering;
unsafeWindow.maxkir.format_for_rendering = function(txt) {
  txt = originalFn(txt);
  return wiki_formatting(txt);
}
