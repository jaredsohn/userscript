// ==UserScript==
// @name           Google Reader - Colorful List View
// @namespace      http://google.reader.colorful.list.view/kepp
// @include        http://www.google.com/reader/*
// @include        https://www.google.com/reader/*
// @exclude        https://www.google.com//reader/settings*
// @description    Colorizes the item headers in Google Reader list view 
// ==/UserScript==

/**
 * 20080730
 * Fixed css mistake of read items not being colored.
 * Added https:// url to the include list
 * Added coloring option on settings page, added settings page to the exclude list
 **/

// used to keep track of all the calculated colors
var colors = {};

function $x(q, c) {
  // doc = iframe contentDoc || context node's owner doc || the context node / document
  var doc = c ? (c.contentDocument || c.ownerDocument || c) : document;
  c = (c && c.contentDocument) ? c.contentDocument : c; // if c is an iframe, set c to its contentDoc element
  return doc.evaluate(q, (c || doc), null, 
         XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function $xa(q, c) {
  var doc = c ? (c.contentDocument || c.ownerDocument || c) : document;
  c = (c && c.contentDocument) ? c.contentDocument : c;
  var r = doc.evaluate(q, (c || doc), null,
          XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
  var e, a = [];
  while (e = r.iterateNext()) {
    a.push(e);
  }
  return a;
}


// calculate item hue
function getHue(title) {
    var h = 0;

    for each (var c in title) {
        h += c.charCodeAt(0);
    }
    h = h % 360;

    colors[title] = h;
    return h;
}

// inject color css into the page
function setColor(entries) {
  var uncolored = $x("id('entries')/" +
                  "div[contains(@class,'entry')][not(@colored)]");
  if (!uncolored) {
    return;
  }

  var title = $x(".//*[contains(@class,'entry-source-title')][not(*)]",
              uncolored).textContent.replace(/\W/g, "-");

  uncolored.setAttribute("colored", title);

  if (colors[title] == undefined) {
    var hue = getHue(title);
    GM_addStyle(
      ".gm-colored div[colored='" + title + "']," +
      ".gm-colored div[colored='" + title + "'] .collapsed {" +
      "  background: hsl(" + hue + ",70%,80%) !important; }" +
      ".gm-colored div[colored='" + title + "']:hover," + 
      ".gm-colored div[colored='" + title + "']:hover .collapsed {" +
      "  background: hsl(" + hue + ",90%,85%) !important; }" +
      ".gm-colored div.read[colored='" + title + "']," +
      ".gm-colored .read[colored='" + title + "'] .collapsed {" +
      "  background: hsl(" + hue + ",50%,90%) !important; }" +
      ".gm-colored div[colored='" + title + "'].read:hover," +
      ".gm-colored .read[colored='" + title + "']:hover .collapsed {" +
      "  background: hsl(" + hue + ",70%,95%) !important; }");
  }
}


// watch for changes in settings and display notifications
function settingListener(e) {
  toggleColors();

  var t = e.target;
  var msg, view;
  if (t.checked) {
    msg = "Items <i>will</i> be colored in ";
    GM_setValue(t.id, "checked");
  } else {
    msg = "Items <i>will not</i> be colored in ";
    GM_setValue(t.id, "");
  }

  msg += (t.id == "gm-color-lv") ? "list view." : "expanded view.";

  var msgIn = $x("id('message-area-inner')", t);
  msgIn.innerHTML = msg;

  var msgOut = $x("id('message-area-outer')", t);
  msgOut.className = "info-message";

  function hideMsg() {
    if (msgIn.innerHTML == msg) {
      msgOut.className = msgOut.className.replace(/ hidden 15|$/, " hidden 15");
    }
  }
  var tid = setTimeout(hideMsg, 7*1000);
}

// insert page color options into the settings page
function getSettings(sf) {
  var seb = $x("id('setting-extras-body')", sf.contentDocument);

  var e = document.createElement("div");
  e.className = "extra";
  e.innerHTML = 
    "<div class=\"extra-header\">Colors</div>\
     <label><input id=\"gm-color-lv\" type=\"checkbox\"" +
       (GM_getValue("gm-color-lv", true) ? "checked=\"on\"" : "") + "\"/>\
       Color list view items.\
     </label>";
     // <label><input id=\"gm-color-ev\" type=\"checkbox\"" +
       // (GM_getValue("gm-color-ev", false) ? "checked=\"on\"" : "") + "\"/>\
       // Color expanded view items.\
     // </label>";
  seb.appendChild(e);

  $x("id('gm-color-lv')", sf.contentDocument).addEventListener("change",
    settingListener, false);
  // $x("id('gm-color-ev')", sf.contentDocument).addEventListener("change",
    // settingListener, false);

  sf.removeEventListener("DOMNodeInserted", getSettings, false);
}

// watch for loading of settings page
function setMenu() {
  var getMenu = function() {
    var sf = $x("id('settings-frame')");
    if (sf) {
      sf.addEventListener("load", function() { getSettings(sf); }, false);
      document.removeEventListener("DOMNodeInserted", getMenu, false);
    }
  };

  try {
    $x("id('settings-link')").addEventListener("click", function() {
      document.addEventListener("DOMNodeInserted", getMenu, false);
    }, false);
  } catch (e) {
    // no settings link
  }
}


function toggleColors() {
  var es = $x("id('entries')");
  if (/gm-colored/.test(es.className)) {
    es.className = es.className.replace(/gm-colored /, "");
  } else {
    es.className = "gm-colored " + es.className;    
  }
}


(function() {

  if (GM_getValue("gm-color-lv", true) || GM_getValue("gm-color-ev", true)) {
    toggleColors(); // initial toggle on
  }

  GM_addStyle(
    ".gm-colored .collapsed { border-color: transparent !important; }" +
    "#entries.list.gm-colored #current-entry .collapsed {" + 
    "  border: 2px solid #8181DC !important; }" +
    "#entries.list.gm-colored #current-entry.expanded .collapsed {" + 
    "  border-bottom-color: transparent !important;" + 
    "  border-width: 2px 0 !important; }");

  setMenu();

  $x("id('entries')").addEventListener("DOMNodeInserted", setColor, false);

})();