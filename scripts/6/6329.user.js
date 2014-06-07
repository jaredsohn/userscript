// ==UserScript==
// @name          Google Reader - Toggle Sidebar
// @namespace     http://loucypher.wordpress.com/
// @include       http://www.google.com/reader/view/
// @description	  Toggle left sidebar show/hide
// ==/UserScript==

/*--------------------------------------------------------------------
  Changelog:
  * 2006-11-16: style, etc
  * 2006-11-17:
    - cleaned up (object, functions, variables)
    - added shortcut key
      (ripped from userscripts.org/scripts/show/4662)
    - added GM_setValue/GM_getValue to remember view state
  --------------------------------------------------------------------*/

var div = document.getElementById("viewer-controls-container");
if (!div) return;

var css = "#entries .entry-body {\
  max-width: none !important;\
  padding-right: 2em !important;\
}";

if (typeof GM_addStyle != "undefined") {
  GM_addStyle(css);
}
else {
  var heads = document.getElementsByTagName("head");
  if (heads.length > 0) {
    var node = document.createElement("style");
    node.type = "text/css";
    node.innerHTML = css;
    heads[0].appendChild(node);
  }
}

var tbody = "<tbody>\
<tr>\
<td class='s tl'></td>\
<td class='s'></td>\
<td class='s tr'></td>\
</tr>\
<tr>\
<td class='s'></td>\
<td class='c' id='wide-view'>Wide view</td>\
<td class='s'></td>\
</tr>\
<tr>\
<td class='s bl sq'></td>\
<td class='s'></td>\
<td class='s br sq'></td>\
</tr>\
</tbody>";

var table = document.createElement("table");
table.setAttribute("cellspacing", "0");
table.setAttribute("cellpadding", "0");
table.setAttribute("border", "0");
table.className = "round-box viewer-tab"
table.style.cursor = "pointer";
table.style.textAlign = "center";
table.id = "view-wide";
table.innerHTML = tbody;

div.appendChild(table);

var GR_WideView = {
  toggleSidebar: function() {
    var vw = document.getElementById("view-wide");
    var chrome = document.getElementById("chrome");
    var nav = document.getElementById("nav");
    if (nav.style.display == "none") {
      vw.className = vw.className.replace(/\sviewer\-tab\-selected/, "");
      nav.style.display = "";
      chrome.style.marginLeft = "260px";
      GM_setValue("wideview", false);
    }
    else {
      vw.className += " viewer-tab-selected";
      nav.style.display = "none";
      chrome.style.marginLeft = "1em";
      GM_setValue("wideview", true);
    }
  },

  shortkey: function(aEvent) {
    //ripped from Masayuki's GR wide view
    //http://userscripts.org/scripts/show/4662
    element = aEvent.target;
    elementName = element.nodeName.toLowerCase();
    if (elementName == "input") {
      typing = (element.type == "text" || element.type == "password");
    } else {
      typing = (elementName == "textarea");
    }
    if (typing) return true; 
    if (String.fromCharCode(aEvent.which)=="w" && !aEvent.ctrlKey) {
      GR_WideView.toggleSidebar();
      try {
        aEvent.preventDefault();
      } catch (e) {
      }
      return false;
    }
    return true;
  }
}

var wideview = false;
try {
  wideview = GM_getValue("wideview");
} catch(ex) {
}

if (wideview) GR_WideView.toggleSidebar();

var vw = document.getElementById("view-wide");
vw.addEventListener("click", GR_WideView.toggleSidebar, false);
document.addEventListener("keypress", GR_WideView.shortkey, false);

