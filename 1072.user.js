// ==UserScript==
// @name        San Francisco Bay Area Libraries - Books lookup on all sites
// @description Display the availability of books in San Francisco Bay Area libraries on all sites
// @namespace   http://loonyone.livejournal.com
// @include     http://*
// @include     https://*
// @author      Manpreet Singh <junkblocker@yahoo.com>
// @creator     Manpreet Singh <junkblocker@yahoo.com>
// @source      http://userscripts.org/scripts/show/1072
// @identifier  http://userscripts.org/scripts/source/1072.user.js
// @version     4.3
// @date        2013-10-23
// @run-at     document-end
// ==/UserScript==

/* Copyright (c) 2006-2012, Manpreet Singh <junkblocker@yahoo.com>
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

// TODO: LibraryThing has FRAMES on wishlist pages!!!!! ARGGGGHHHH!!!!!

// Credits:
//  * Initially based on Palo Alto Library lookup script and Tony Hirst's Generic OU Library Linky script
//  * Individual Library Linking code for book pages from Peninsula Library System Google Print Lookup
//  * xISBN lookup code via Jon Udell
//  * Configuration form logic from YousableTube userscript by Mindeye.

// Changelog
// 4.3 - Fixed configuration dialog breakage.
// 4.2 - Fixed display on various sites. Code style fixes.
// 4.1 - Enable remembering main frame's expansion state
//       Various small tweaks
// 4.0 - Made it (mostly) work with Chrome 13 beta which has cross-site xhr support
//       Added the preferences button on the titlebar
//       Fixed alternate ISBNs caching
// 3.9 - Added support for peninusla library system's paginated status pages
//       Fixed peninsula library system title extraction and linking in corner cases
//       Updated links to point to new library URLs
//       More caching option to save bandwidth
//       Added Damaged status
//       Added an experimental skin
//       Grey title in case no books are available
//       Ability to collapse all status types individually
//       Slightly better links to amazon.com
//       Added "Lost and Paid" status type
//       Minor bug fixes
// 3.8 - Support additional libraries
//       Major functionality revamp
//       Renamed
// 3.7 - Added real algorithmic validation for ISBN-10 and ISBN-13
//       Bumped up zIndex
// 3.6 - Fixed oversight when partial results weren't return in case of error
//       Google books works better now
// 3.5 - Added additional pattern to match on plsinfo.org page
// 3.4 - Fixed Alternate ISBN lookup for ISBN-13
// 3.3 - Lookup alternate ISBNs via xISBN web service
//       Link individual librarys on plsinfo.org book page
//       Added toggle menu
//       Added Mending status

// TODO:
// Google Books
// frameset/frames

(function() {
  // return: Whether elem is in array a
  var inArray = typeof inArray !== 'undefined' ? inArray : function(a, elem) {
    if (typeof a.contains !== 'undefined') return a.contains(elem);
    for (var i = 0, l = a.length; i < l; i++) {
      if (a[i] === elem) return true;
    }
    return false;
  };

  // requires: inArray
  var addUnique = typeof addUnique !== 'undefined' ? addUnique : function(a, elem) {
    if (!inArray(a, elem)) a.push(elem);
    return a;
  };

  var sansSerifFont = 'font-family: "Helvetica Neue", Helvetica, Verdana, Arial, FreeSans, "Luxi-sans", "Nimbus Sans L", sans-serif !important; ';
  var gStyles = [
    { // 0
      name: 'Smooth Green',
      frame_title_bg: '#d9ef92',
      lib_title_bg_color: '#f3ffce',
      lib_title_text_color: 'black',
      type_group_bg_css:
        "background: #d9ef92; /* Old browsers */ \n" +
        "background: -moz-linear-gradient(top, #d9ef92 0%, #f3ffce 100%); /* FF3.6+ */ \n" +
        "background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#d9ef92), color-stop(100%,#f3ffce)); /* Chrome,Safari4+ */ \n" +
        "background: -webkit-linear-gradient(top, #d9ef92 0%,#f3ffce 100%); /* Chrome10+,Safari5.1+ */ \n" +
        "background: -o-linear-gradient(top, #d9ef92 0%,#f3ffce 100%); /* Opera11.10+ */ \n" +
        "background: -ms-linear-gradient(top, #d9ef92 0%,#f3ffce 100%); /* IE10+ */ \n" +
        "filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#d9ef92', endColorstr='#f3ffce',GradientType=0 ); /* IE6-9 */ \n" +
        "background: linear-gradient(top, #d9ef92 0%,#f3ffce 100%); /* W3C */ \n",
      type_group_title_css: "font-weight: bold; \n" +
        "background: #f3ffce; /* Old browsers */ \n" +
        "background: -moz-linear-gradient(top, #f3ffce 0%, #d9ef92 100%); /* FF3.6+ */ \n" +
        "background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#f3ffce), color-stop(100%,#d9ef92)); /* Chrome,Safari4+ */ \n" +
        "background: -webkit-linear-gradient(top, #f3ffce 0%,#d9ef92 100%); /* Chrome10+,Safari5.1+ */ \n" +
        "background: -o-linear-gradient(top, #f3ffce 0%,#d9ef92 100%); /* Opera11.10+ */ \n" +
        "background: -ms-linear-gradient(top, #f3ffce 0%,#d9ef92 100%); /* IE10+ */ \n" +
        "filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f3ffce', endColorstr='#d9ef92',GradientType=0 ); /* IE6-9 */ \n" +
        "background: linear-gradient(top, #f3ffce 0%,#d9ef92 100%); /* W3C */ \n",
      book_bg_css:
        "background: transparent none no-repeat scroll 0 0; \n"
    },
    { // 1
      name: 'Plain Orange',
      frame_title_bg: '#F63',
      lib_title_bg_color: '#333',
      lib_title_text_color: 'white',
      type_group_bg_css: '',
      type_group_title_css: "font-weight: normal; \n" +
        "background: #F96; \n",
      book_bg_css: "background: #ffffcc; \n"
    }
  ];

  var isSafari = typeof isSafari !== 'undefined' ? isSafari : function() {
    return navigator.appVersion.search("Safari") != -1;
  };

  var isChrome = typeof isChrome !== 'undefined' ? isChrome : function() {
    // or Chromium etc.
    return navigator.appVersion.search("Chrome") != -1;
  };

  // *************************
  // log(object, ...) - logs to console(s) or pops up a dialog
  // *************************
  var log = typeof log !== 'undefined' ? log : function() {
    var o = Array.prototype.concat.apply([], arguments);

    if (typeof console != 'undefined' && console.log) {
      console.log(o.join(", "));
      if (typeof GM_log != 'undefined') GM_log(o.join(", "));
      return true;
    } else if (typeof GM_log != 'undefined') {
      GM_log(o.join(", "));
      return true;
    } else if (window.opera) {
      opera.postError(o.join(", "));
    }
    return false;
  };

  if (typeof GM_registerMenuCommand != 'undefined') {
    registerMenuCommand = GM_registerMenuCommand;
  } else {
    registerMenuCommand = function(){};
  }

  var addStyle = typeof addStyle != 'undefined' ? addStyle : function(css) {
    if (typeof GM_addStyle != 'undefined') {
      GM_addStyle(css);
      return;
    }

    var heads = document.getElementsByTagName('head');
    var root = heads ? heads[0] : document.body;
    var style = document.createElement('style');
    try {
      style.innerHTML = css;
    } catch(x) {
      style.innerText = css;
    }
    style.type = 'text/css';
    root.appendChild(style);
  };

  var openInTab = typeof GM_openInTab !== 'undefined' ? GM_openInTab : window.open;

  var getStyle = typeof getStyle !== 'undefined' ? getStyle : function(elm, prop) {
    return window.getComputedStyle(elm, null).getPropertyValue(prop);
  };

  // *************************************************************************
  // Typed storage variables
  // *************************************************************************
  var _REG_IGNORE = false;
  var _REG = {};

  var isGM = (typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined');
  // XXX: This may not be compatible with cooked getValue because of
  // 'undefined'/'null'
  var getRawValue = isGM ? GM_getValue : function(name, def) {var s = localStorage.getItem(name); return (s == "undefined" || s == "null") ? def : s;};
  var setRawValue = function(name, value) {
    try {
      if (isGM) {
        GM_setValue(name, value);
      } else {
        localStorage.setItem(name, value);
      }
    } catch (e) {
      log(e);
    }
  };

  var getValue = typeof getValue !== 'undefined' ? getValue : function(name, defaultValue) {
    if (!_REG_IGNORE && typeof _REG[name] == 'undefined') {
      throw 'ERROR: ' + name + ' accessed before registering.';
    }
    var value = getRawValue(name);
    if (!value || typeof value != 'string' || value.length < 1) {
      if (_REG_IGNORE || _REG[name](defaultValue)) {
        return defaultValue;
      } else {
        throw "ERROR: Invalid default value " + defaultValue + " passed for " + name;
      }
    }

    var type = value[0];
    tvalue = value.substring(1);
    switch (type) {
      case 'b':
        value = (tvalue == 'true');
        break;
      case 'n':
        value = Number(tvalue);
        break;
      case 'o':                         // object
        try {
          value = JSON.parse(tvalue);
        } catch (e) {
          log('ERROR: getValue(', name, ', ', defaultValue, ') could not parse stored value', tvalue, e);
          log('Returning default value');
          value = defaultValue;
        }
        break;
      case 's':
        value = tvalue;
        break;
      case 'f':                         // function
        try {
          value = eval('(' + tvalue + ')');
        } catch (e) {
          log('ERROR: getValue(', name, ', ', defaultValue, ') could not parse stored value', tvalue, e);
          log('Returning default function');
          value = defaultValue;
        }
        break;
      default:
        value = defaultValue;
        break;
    }
    if (!_REG_IGNORE && !_REG[name](value)) {
      if (!_REG[name](defaultValue)) {
        throw typeof value + "ERROR: Could not fix invalid saved value '" + value + "' for '" + name + "' with invalid default '" + defaultValue + "'";
      } else {
        log("WARNING: Fixing", name, "to default because of wrong previous type");
        setValue(name, defaultValue);
        value = defaultValue;
      }
    }
    return value;
  };

  var setValue = typeof setValue !== 'undefined' ? setValue : function(name, value) {
    if (!_REG_IGNORE) {
      if (!_REG[name]) {
        throw 'ERROR: ' + name + ' assigned before registering';
      }
      if (!_REG[name](value)) {
        throw 'ERROR: setValue(' + name + ', ' + value + ') is wrong type';
      }
    }
    var type  = (typeof value)[0];
    if (type == 'o') {
      try {
        value = type + JSON.stringify(value);
      } catch (e) {
        log(e);
        return;
      }
    } else if (type == 'f') {
      try {
        value = type + value.toString();
      } catch (e) {
        log(e);
        return;
      }
    } else if (/^[bsn]$/.test(type)) {
      value = type + value;
    } else {
      throw "Invalid type passed to setValue(" + name + ", ...)";
    }
    setRawValue(name, value);
  };

  var deleteValue = isGM ? GM_deleteValue : function(name) {localStorage.removeItem(name);};

  var listValues = isGM ? GM_listValues : function() {
    var ret = new Array();
    for (var i = 0; i < localStorage.length; i++) {
      ret.push(localStorage.key(i));
    }
    return ret;
  };

  var reg = typeof reg !== 'undefined' ? reg : function(name, type_defaults, ok_p) {
    //log('DEBUG: reg(', name, ',', type_defaults, ',', ok_p, ')');
    if (typeof name == 'undefined' || typeof type_defaults == 'undefined') {
      throw 'ERROR: reg(...) - Needs at least name and type_defaults arguments';
    }
    if (typeof _REG[name] != 'undefined') {
      throw 'ERROR: reg(' + name + ') - Already registered';
    }
    if (typeof ok_p != 'undefined' && !((typeof ok_p == 'object' && typeof ok_p.unshift != 'undefined') || typeof ok_p != 'function')) {
      throw 'ERROR: reg(' + name + ') - Invalid ok_p type. Must be an array or function.';
    }
    _REG_IGNORE = true;
    var oldval = getValue(name);
    _REG_IGNORE = false;
    var ret;
    if (typeof oldval == 'undefined') {
      _REG_IGNORE = true;
      setValue(name, type_defaults);
      oldval = type_defaults;
      _REG_IGNORE = false;
    }
    if (typeof ok_p == 'function') {
      _REG[name]= ok_p;
    } else if (typeof ok_p == 'undefined') {
      _REG[name] = function(v) {
        //log("DEBUG: Checking that value", v, "of", name, "is of type", typeof type_defaults);
        return typeof v == typeof type_defaults;
      };
    } else if (typeof ok_p == 'object' && typeof ok_p.unshift != 'undefined') {
      _REG[name] = function(v) {
        return inArray(ok_p, v);
      };
    } else {
      throw "ERROR: Could not define the ok_p for " + name;
    }
    return oldval;
  };
  // *************************************************************************
  reg('CHECKING_AT', 0);
  reg('CacheAltISBNs?', true);
  reg('CacheBookStatus?', true);
  reg('DEVELOPER', false);
  reg('LAST_CHECKED', 0);
  reg('Palo Alto Library', true);
  reg('Peninsula Library System', true);
  reg('Scrape?', true);
  reg('Shop', 'amazon', ['amazon', 'borders', 'powells', 'barnesandnoble']);
  reg('ShowDELAYED', 'expanded', ['expanded', 'collapsed', 'no']);
  reg('ShowELECTRONIC', 'expanded', ['expanded', 'collapsed', 'no']);
  reg('ShowERROR', 'expanded', ['expanded', 'collapsed', 'no']);
  reg('ShowINSTANT', 'expanded', ['expanded', 'collapsed', 'no']);
  reg('ShowNOPE', 'expanded', ['expanded', 'collapsed', 'no']);
  reg('Style', 0, [0, 1]);
  reg('alt_isbns_cache', {});
  reg('book_status_cache', {});
  reg('xISBN?', true);
  reg('FrameState', 'expanded', ['expanded', 'collapsed']);

  function type(o) {
    return !!o && Object.prototype.toString.call(o).match(/(\w+)\]/)[1];
  }

  function $xp(exp, node) { // xpath helper
    if (!node || node === '') node = document;
    var i, arr = [], r = document.evaluate(exp, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0, l = r.snapshotLength; i < l; i++) arr.push(r.snapshotItem(i));
    return arr;
  }

  // Returns only the first element of the array returned by $x (or null if the array was empty)
  function $xp1(exp, node) {
    if (!node || node === '') node = document;
    return document.evaluate(exp, node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  }

  function removeEventHandler(target, eventName, eventHandler) {
    if (target.addEventListener) {
      target.removeEventListener(eventName, eventHandler, true);
    } else if (target.attachEvent) {
      target.detachEvent('on' + eventName, eventHandler);
    }
  }

  function addEventHandler(target, eventName, eventHandler, scope) {
    var f = scope ? function(){ eventHandler.apply( scope, arguments ); } : eventHandler;
    if (target.addEventListener)  {
      target.addEventListener(eventName, f, true);
    } else if (target.attachEvent) {
      target.attachEvent('on' + eventName, f);
    }
    return f;
  }

  // Creates a new node with the given attributes and properties (be careful with XPCNativeWrapper limitations)
  function createNode(type, attributes, props) {
    var node = document.createElement(type);
    if (attributes) {
      for (var attr in attributes) {
        if (! attributes.hasOwnProperty(attr)) continue;
        node.setAttribute(attr, attributes[attr]);
      }
    }
    if (props) {
      for (var prop in props) {
        if (! props.hasOwnProperty(prop)) continue;
        if (prop in node) node[prop] = props[prop];
      }
    }
    return node;
  }

  function configureScript() {
    if (top !== self || document.body.tagName.toLowerCase() === 'frameset') return;

    // Gets the layers
    var maskLayer = document.getElementById("gsmaskLayer");
    var dialogLayer = document.getElementById("gsdialogLayer");
    // Checks the layers state
    // Creates the layers if they don't exist or displays them if they are hidden
    if ((maskLayer) && (dialogLayer)) {
      if ((maskLayer.style.display === "none") && (dialogLayer.style.display === "none")) {
        maskLayer.style.display = "";
        dialogLayer.style.display = "";
      }
      dialogLayer.focus();
    } else {
      createLayers();
    }

    // Creates the configuration layers
    function createLayers() {
      // Creates a layer to mask the page during configuration
      maskLayer = createNode("div", {id: "gsmaskLayer", title: "Click here to return to the page"});

      // Creates a layer for the configuration dialog
      dialogLayer = createNode("div", {id: "gsdialogLayer"});

      var currentShowINSTANT = getValue('ShowINSTANT', 'expanded');
      var currentShowNOPE = getValue('ShowNOPE', 'expanded');
      var currentShowDG = getValue('ShowDELAYED', 'expanded');
      var currentShowEA = getValue('ShowELECTRONIC', 'expanded');
      var currentShowER = getValue('ShowERROR', 'expanded');
      var currentShop = getValue('Shop', 'amazon');
      var currentStyle = getValue('Style', 0);

      // Creates the configuration dialog HTML
      dialogLayer.innerHTML = "<div id='gsconfTitle'>San Francisco Bay Area Libraries Configuration</div>" +
        "<ul>" +
        "<li>Which libraries should be enabled?</li>" +
        "<input type='checkbox' id='gsconfPeninsulaLibrarySystem'" + (getValue("Peninsula Library System", true)?" checked='checked'":"") + ">Peninsula Library System<br>" +
        "<input type='checkbox' id='gsconfPaloAltoLibrary'" + (getValue("Palo Alto Library", true)?" checked='checked'":"") + ">Palo Alto Library</li>" +
        "<li>How should the books immediately available in the library be shown?</li>" +
        "<select id='gsconfShowINSTANT' size='1'>" +
        "<optgroup label='Show Not Available'>" +
        "<option id='gsconfShowINSTANTNo' value='no'" + ((currentShowINSTANT === "no") ? " selected='selected'" : "") + ">No</option>" +
        "<option id='gsconfShowINSTANTExpanded' value='expanded'" + ((currentShowINSTANT === "expanded") ? " selected='selected'" : "") + ">Expanded</option>" +
        "<option id='gsconfShowINSTANTCollapsed' value='collapsed'" + ((currentShowINSTANT === "collapsed") ? " selected='selected'" : "") + ">Collapsed</option>" +
        "</optgroup>" +
        "</select>" +
        "<li>How should the books not immediately available in the library be shown?</li>" +
        "<select id='gsconfShowDG' size='1'>" +
        "<optgroup label='Show Not Available'>" +
        "<option id='gsconfShowDGNo' value='no'" + ((currentShowDG === "no") ? " selected='selected'" : "") + ">No</option>" +
        "<option id='gsconfShowDGExpanded' value='expanded'" + ((currentShowDG === "expanded") ? " selected='selected'" : "") + ">Expanded</option>" +
        "<option id='gsconfShowDGCollapsed' value='collapsed'" + ((currentShowDG === "collapsed") ? " selected='selected'" : "") + ">Collapsed</option>" +
        "</optgroup>" +
        "</select>" +
        "<li>How should the books not available in the library be shown?</li>" +
        "<select id='gsconfShowNOPE' size='1'>" +
        "<optgroup label='Show Not Available'>" +
        "<option id='gsconfShowNOPENo' value='no'" + ((currentShowNOPE === "no") ? " selected='selected'" : "") + ">No</option>" +
        "<option id='gsconfShowNOPEExpanded' value='expanded'" + ((currentShowNOPE === "expanded") ? " selected='selected'" : "") + ">Expanded</option>" +
        "<option id='gsconfShowNOPECollapsed' value='collapsed'" + ((currentShowNOPE === "collapsed") ? " selected='selected'" : "") + ">Collapsed</option>" +
        "</optgroup>" +
        "</select>" +
        "<li>How should the electronic edition be shown?</li>" +
        "<select id='gsconfShowEA' size='1'>" +
        "<optgroup label='Show Not Available'>" +
        "<option id='gsconfShowEANo' value='no'" + ((currentShowEA === "no") ? " selected='selected'" : "") + ">No</option>" +
        "<option id='gsconfShowEAExpanded' value='expanded'" + ((currentShowEA === "expanded") ? " selected='selected'" : "") + ">Expanded</option>" +
        "<option id='gsconfShowEACollapsed' value='collapsed'" + ((currentShowEA === "collapsed") ? " selected='selected'" : "") + ">Collapsed</option>" +
        "</optgroup>" +
        "</select>" +
        "<li>Should we show any errors encountered?</li>" +
        "<select id='gsconfShowER' size='1'>" +
        "<optgroup label='Show Not Available'>" +
        "<option id='gsconfShowERNo' value='no'" + ((currentShowER === "no") ? " selected='selected'" : "") + ">No</option>" +
        "<option id='gsconfShowERExpanded' value='expanded'" + ((currentShowER === "expanded") ? " selected='selected'" : "") + ">Expanded</option>" +
        "<option id='gsconfShowERCollapsed' value='collapsed'" + ((currentShowER === "collapsed") ? " selected='selected'" : "") + ">Collapsed</option>" +
        "</optgroup>" +
        "</select>" +
        "<li>Should we try to find alternate ISBNs for the same book?</li>" +
        "<input type='checkbox' id='gsconfXISBN'" + (getValue("xISBN?", true)?" checked='checked'":"") + ">Try alternate ISBNs</li>" +
        "<li>Should we try really hard to find ISBNs in the page?<br><em>*</em> Note: This might be slow.</li>" +
        "<input type='checkbox' id='gsconfScrape'" + (getValue('Scrape?', true)?" checked='checked'":"") + ">Scrape hard for ISBNs</li>" +
        "<li>Should we remember book availability status for upto one hour to improve performance during heavy browsing?<br><em>*</em> Note: Recommended!</li>" +
        "<input type='checkbox' id='gsconfCacheBookStatus'" + (getValue("CacheBookStatus?", true)?" checked='checked'":"") + ">Cache book status</li>" +
        "<li>Should we remember alternate book ISBNs for upto one hour to improve performance during heavy browsing?<br><em>*</em> Note: Recommended!</li>" +
        "<input type='checkbox' id='gsconfCacheAltISBNs'" + (getValue("CacheAltISBNs?", true)?" checked='checked'":"") + ">Cache alternate ISBNs</li>" +
        "<li>Select the search results link site:</li>" +
        "<select id='gsconfShop' size='1'>" +
        "<optgroup label='Book Stores'>" +
        "<option id='gsconfShopAmazon' value='amazon'" + ((currentShop === "amazon") ? " selected='selected'" : "") + ">Amazon.com</option>" +
        "<option id='gsconfShopBarnesandnoble' value='barnesandnoble'" + ((currentShop === "barnesandnoble") ? " selected='selected'" : "") + ">Barnes & Noble</option>" +
        "<option id='gsconfShopBorders' value='borders'" + ((currentShop === "borders") ? " selected='selected'" : "") + ">Borders Books</option>" +
        "<option id='gsconfShopPowells' value='powells'" + ((currentShop === "powells") ? " selected='selected'" : "") + ">Powell's Books</option>" +
        "</optgroup>" +
        "<optgroup label='Price Comparison Sites'>" +
        "<option id='gsconfShopBookfinder' value='bookfinder'" + ((currentShop === "bookfinder") ? " selected='selected'" : "") + ">BookFinder.com</option>" +
        "<option id='gsconfShopISBNdb' value='isbndb'" + ((currentShop === "bookfinder") ? " selected='selected'" : "") + ">ISBNdb.com</option>" +
        "<option id='gsconfShopMuseophile' value='museophile'" + ((currentShop === "museophile") ? " selected='selected'" : "") + ">Museophile</option>" +
        "<option id='gsconfShopShopWiki' value='shopwiki'" + ((currentShop === "shopwiki") ? " selected='selected'" : "") + ">ShopWiki</option>" +
        "</optgroup>" +
        "</select>" +
        "<li>Select the display style:</li>" +
        "<select id='gsconfStyle' size='1'>" +
        "<optgroup label='Display Style'>" +
        "<option id='gsconfStyle0' value='0'" + ((currentStyle === "0") ? " selected='selected'" : "") + ">" + gStyles[0].name + "</option>" +
        "<option id='gsconfStyle1' value='1'" + ((currentStyle === "1") ? " selected='selected'" : "") + ">" + gStyles[1].name + "</option>" +
        "</optgroup>" +
        "</select>" +
        "</ul>" +
        "</div>" +
        "<div id='gsconfButDiv'>" +
        "<input type='button' id='gsconfResetBut' value='Reset' title='Reset all script configuration'>" +
        "<input type='button' id='gsconfCancelBut' value='Cancel' title='Return to the page without saving'>" +
        "<input type='button' id='gsconfOKBut' value='OK' title='Save the current configuration'>" +
        "</div>";

      // Appends the layers to the document
      document.body.appendChild(maskLayer);
      document.body.appendChild(dialogLayer);

      // Adds the necessary event listeners
      addEventHandler(maskLayer, "click", hideLayers);
      addEventHandler(document.getElementById("gsconfResetBut"), "click", makeResetConfigHandler());
      addEventHandler(document.getElementById("gsconfCancelBut"), "click", hideLayers);
      addEventHandler(document.getElementById("gsconfOKBut"), "click", makeSaveConfigurationHandler());

      addStyle(
        // Adds styles and classes for the configuration layers and its contents
        "#gsmaskLayer {\n" +
          " background-color: black !important;\n" +
          " opacity: 0.7 !important;\n" +
          " z-index: 2147483645 !important;\n" +
          " position: fixed !important;\n" +
          " left: 0px !important;\n" +
          " top: 0px !important;\n" +
          " width: 100% !important;\n" +
          " height: 100% !important;\n" +
          "\n}" +
        "#gsdialogLayer {\n" +
          " background-color: white !important;\n" +
          " overflow: auto !important;\n" +
          " padding: 20px !important;\n" +
          " z-index: 2147483646 !important;\n" +
          " outline: black solid thin !important;\n" +
          " position: fixed !important;\n" +
          " left: 30% !important;\n" +
          " top: 7.5% !important;\n" +
          " width: 40% !important;\n" +
          " height: 85% !important;\n" +
          " text-align: left !important;\n" +
          " font-family: 'Times New Roman',Times,serif !important;\n" +
          " text-shadow: 0 0 1px #ccc !important;\n" +
          "\n}" +
        "#gsdialogLayer > * {\n" +
          " margin: 20px 0px !important;\n" +
          "}\n" +
        "#gsdialogLayer li {\n" +
          " margin: 15pt 0px 7px !important;\n" +
          " line-height: 1.5 !important;\n" +
          " font-style: italic !important;\n" +
          " color: #333 !important;\n" +
          " display: list-item !important;\n" +
          " list-style-type: none !important;\n" +
          " font-size: 11pt !important;\n" +
          sansSerifFont +
          " background: url(data:image/gif;base64,R0lGODlhAQACAIAAAMncpv///yH5BAAAAAAALAAAAAABAAIAAAICRAoAOw==) left bottom repeat-x !important;\n" +
            " border: none !important;\n" +
          "}\n" +
        "#gsdialogLayer input, #gsdialogLayer select {\n" +
          " vertical-align: bottom !important;\n" +
          " margin-right: 0.5em !important;\n" +
          " color: #333 !important;\n" +
          " font-size: 10pt !important;\n" +
          " line-height: 1.2 !important;\n" +
          " border: 1px solid #333 !important;\n" +
          "}\n" +
        "#gsconfTitle {\n" +
          " cursor: default !important;\n" +
          " font-size: 14pt !important;\n" +
          " line-height: 1.5 !important;\n" +
          " font-weight: bold !important;\n" +
          " text-align: center !important;\n" +
          " color: #333 !important;\n" +
          " margin: 20px !important;\n" +
          sansSerifFont +
          "}\n" +
        "#gsconfButDiv {\n" +
          " text-align: center !important;\n" +
          "}\n" +
        "#gsconfButDiv input {\n" +
          " margin: 5px !important;\n" +
          "}\n" +
        "#gsdialogLayer ul {\n" +
          " list-style-type: none !important;\n" +
          " line-height: 1.5 !important;\n" +
          " padding-left: 40px !important;\n" +
          " padding-right: 40px !important;\n" +
          " color: #333 !important;\n" +
          " list-style-image: none !important;\n" +
          " display: list-item !important;\n" +
          " font-size: 11pt !important;\n" +
          sansSerifFont +
          " " +
          "background: none !important;\n" +
          " border: none !important;\n" +
          "}\n" +
        "#gsdialogLayer em {\n" +
          " font-weight: bold !important;\n" +
          " font-style: normal !important;\n" +
          " color: red !important;\n" +
          "}\n");
    }

    // Changes the enabled state of all input/select fields of the dialog layer. If newState is undefined or not boolean, it does nothing
    // It is a nested function
    function setDialogInputState(newState) {
      if (typeof(newState) !== "boolean") return;
      var allInputs = $xp(".//input|.//select", dialogLayer);
      allInputs.forEach(function(i) {i.disabled = !newState;});
    }

    // Exits the configuration by hiding the layers
    // It is called by the Cancel button and the maskLayer event listeners
    // It is a nested function
    function hideLayers(evt) {
      dialogLayer.style.display = "none";
      maskLayer.style.display = "none";
    }

    // Checks and saves the configuration to the configuration variables
    // It is called by the Ok button event listener
    // It is a nested function
    function makeSaveConfigurationHandler() {
      return function() {
        setTimeout(function() {
          // Disables the input/select fields
          setDialogInputState(false);

          // Sets other configuration variables
          setValue("Peninsula Library System", document.getElementById("gsconfPeninsulaLibrarySystem").checked);
          setValue("Palo Alto Library", document.getElementById("gsconfPaloAltoLibrary").checked);
          setValue("ShowNOPE", document.getElementById("gsconfShowNOPE").value);
          setValue("ShowDELAYED", document.getElementById("gsconfShowDG").value);
          setValue("ShowELECTRONIC", document.getElementById("gsconfShowEA").value);
          setValue("ShowERROR", document.getElementById("gsconfShowER").value);
          setValue("xISBN?", document.getElementById("gsconfXISBN").checked);
          setValue('Scrape?', document.getElementById("gsconfScrape").checked);
          setValue('CacheBookStatus?', document.getElementById("gsconfCacheBookStatus").checked);
          setValue('CacheAltISBNs?', document.getElementById("gsconfCacheAltISBNs").checked);
          setValue('Shop', document.getElementById("gsconfShop").value);
          setValue("Style", parseInt(document.getElementById("gsconfStyle").value, 10));

          // Reloads page and script
          window.location.reload();
        }, 0);
      };
    }
    function makeResetConfigHandler(evt) {
      return function() {
        setTimeout(function() {
          // Disables the input/select fields
          setDialogInputState(false);

          // Sets other configuration variables
          setValue("Peninsula Library System", true);
          setValue("Palo Alto Library", true);
          setValue("ShowINSTANT", 'expanded');
          setValue("ShowNOPE", 'expanded');
          setValue("ShowDELAYED", 'expanded');
          setValue("ShowELECTRONIC", 'expanded');
          setValue("ShowERROR", 'expanded');
          setValue("xISBN?", true);
          setValue('Scrape?', true);
          setValue('CacheBookStatus?', true);
          setValue('CacheAltISBNs?', true);
          setValue('Shop', 'amazon');
          setValue('Style', 0);
          setValue('book_status_cache', {});
          setValue('alt_isbns_cache', {});

          // Reloads page and script
          window.location.reload();
        }, 0);
      };
    }
  }
  // Registers the configuration menu command
  registerMenuCommand("San Francisco Bay Area Libraries Configuration", configureScript, null, null, "S");

  var gIcons = {
    close: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABiklEQVQ4EaWTz0rDQBDGZxupRdRLjx4kUAXR9igIfQBBq4IXD+LNR1Dw4rUH9QkUCt4Va9WjIPQBKiiiB4N4lAimqUmRZN1vZCIW/xT8YJid2d98u00Ton9KYX617C6Soi3SZP/pp8gx3NruRvYgYZc3H+8v70LdjcCBl+EeLHzft/O5IYrjWPo/5nwuzbwAKSw874WHoyii0elDQu4M6eMQ8CI2aDa9ZODqeJbGZqpcA4IRavTFFLyIDVqt12TAsiy6OZ2nibkTZpBRow/BBLyIDdrtN95QSvFPwTWvayU+GRk1AvswAC9iA61TDIRhyACg8VKNT0aWq2MfRuBFvLKsDENBEJgH5FFh4Yzq+0VyXZczavSxDzPwIjZIp/uTU4ordbqoTHENCAOo0ZebgBfxe5DJDJpraQbO9ya/DAsofXDgRWLgNG61XRjpZSPZ7Mx4iIaDgSN7MMg+O9XtcmVpnZQ1TOaj+FU6enhyjnYwZ8IF3WdiwMTHH20WXSgyTNPE5wvRxdC3yDtmSTFP/cHSgQAAAABJRU5ErkJggg==',
    minus: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABW0lEQVQ4EaWTv0rDUBTGz03MH0RdOjpIoA4O9UEUJxcHVx9BwcW1g/oEDj6B0OKLqOCgg0EcpYJJahLyz/sdOG1Mayz4weE09/udr/fepkT/lML8UX+0T4rOqSLvzzxFvuaOr047NxP28Ozt5f45qRYROPAyvIQPURR5ve46lWUp67/2XtdmXgAOCIJPHl4kwDAMAi/igDAMqCiKmR2YpsnrAqPrYxJ4EQeMx18MKqUIQ3XVn/ElKPAiDkjTjA3LsmhrdyjeTH+83aM8zwm8iAOqyuDtJ0lCD4Md8QiBWTaF4WOX4EUcYJou7yBNU4rjWLy53XEcfUx34nGAba9wAM5X17xLBANexAGuu8a32wxoPmMIvwJ4kQT4d0+Vt73pMCBms+P8mkOALx4COh/+8KJ/fXBCytwg/adoVVW8vvuDS8zpGoFe1rWq6+cLoBdahMsKdU1fiBa41foGXSbJroM1THIAAAAASUVORK5CYII=',
    plus: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABbElEQVQ4EaWTz0rDQBDGZxvzB1EvPXqQQhU8tEefQRRB8OLBq4+g4MVrD+oTKPgESovg0WdQwYMeDOJRWjBpbYJN1/0Gpk1SjYIfLJOd+c2X2bAh+qcU+ncb7S1SdESaKr/6KfINt3d6UL4YsTuHr893T5H+i8CBl+YpPHS73UqtOk/D4VDyP8Za1WFegBIeguCdm5MkofRaWr3M7FHDS8CLeIIwDBj8bgI0pWWOSeBFbNDrfbCBUoosy5Iax/RepgMvYoM4/mQD27Zpeb0lNY7p/cPVBg0GAwIvYgOtS3y2KIrovrkmNapvXmf2qGNK8CI2sCyPJ4jjmPr9vtQ4BsH4vEi4rmuO6Y0YNnCcGTbIfzBQ+Rz24EVs4HlzZiw9Ad+crUzkwIEXiYF/+6gr9UWXjaSYjzi/4WDgSw0G5Y7fOm6cb++TshbI/BSF0snLm988QZ9ZbdDTZs2alb0AJlEg3K7QrPGFKIALS19dlefzXsRgTQAAAABJRU5ErkJggg==',
    spin: 'data:image/gif;base64,R0lGODlhEAAQAPIAAP9mMwAAAMJNJkIaDQAAAGInE4I0GpI6HSH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQACgABACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkEAAoAAgAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkEAAoAAwAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkEAAoABAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQACgAFACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQACgAGACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAAKAAcALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==',
    prefs: 'data:image/png;base64,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'
  };

  var gNow = new Date().getTime();
  var ONE_DAY = 24 * 60 * 60 * 1000;
  var SIX_HOURS = 6 * 60 * 60 * 1000;
  //var KILL_AT = gNow + 2 * 60 * 1000;
  var gXHRCount = 0;

  function downXHRCount(f) {
    return function(results) {
      gXHRCount--;
      if (f) return f(results);
      return undefined;
    };
  }

  var xhr_org;
  if (typeof GM_xmlhttpRequest !== "undefined") {
    xhr_org = GM_xmlhttpRequest;
  } else {
    xhr_org = function(details) {
      details.method = details.method.toUpperCase() || "GET";
      if (!details.url) {
        if (getValue('DEVELOPER', 0)) {
          log("GM_xmlhttpRequest requires an URL.");
        }
        return;
      }
      // build XMLHttpRequest object
      var oXhr, aAjaxes = [];
      if (typeof ActiveXObject !== "undefined") {
        var oCls = ActiveXObject;
        aAjaxes[aAjaxes.length] = {cls:oCls, arg:"Microsoft.XMLHTTP"};
        aAjaxes[aAjaxes.length] = {cls:oCls, arg:"Msxml2.XMLHTTP"};
        aAjaxes[aAjaxes.length] = {cls:oCls, arg:"Msxml2.XMLHTTP.3.0"};
      }
      if (typeof XMLHttpRequest !== "undefined") {
        aAjaxes[aAjaxes.length] = {cls:XMLHttpRequest, arg:undefined};
      }
      for (var i = aAjaxes.length; i >= 0; i-- ) {
        try {
          oXhr = new aAjaxes[i].cls(aAjaxes[i].arg);
          if (oXhr) break;
        } catch(e) {}
      }
      // run it
      if (oXhr) {
        if (details.onreadystatechange) {
          oXhr.onreadystatechange = function() {
            details.onreadystatechange(oXhr);
          };
        }
        if (details.onload) {
          oXhr.onload = function() { details.onload(oXhr); };
        }
        if (details.onerror) {
          oXhr.onerror = function() { details.onerror(oXhr); };
        }
        oXhr.open(details.method || "GET", details.url, true);
        if (details.overrideMimeType) {
          oXhr.overrideMimeType(details.overrideMimeType);
        }
        if (details.headers) {
          for(var header in details.headers) {
            oXhr.setRequestHeader(header, details.headers[header]);
          }
        }
        oXhr.send(details.data || null);
      } else {
        log ("This Browser is not supported, please upgrade.");
        return;
      }
   };
  }
  function xhr(u, f, load) {
    //if (new Date().getTime() > KILL_AT) {
      //// We overstayed our welcome
      //return;
    //}

    // User closed us
    try { if (gFrame.style.display == "none") return; } catch (eframe) {}

    var xload = load ? load + 1 : 1;
    if (gXHRCount > 1) {
      setTimeout(xhr, xload * 100, u, f, xload);
      return;
    }
    gXHRCount++;
    setTimeout(xhr_org, 100, {method: 'GET', url: u, onload: downXHRCount(f), onerror: downXHRCount(undefined)});
  }

  // ********** Auto update the script
  function autoUpdateFromUserscriptsDotOrg(SCRIPT) {
    // Note: Version numbers must be in x.y float format
    try {
      if (typeof getValue == 'undefined') return;
      // avoid a flood of dialogs e.g. when opening a browser with multiple tabs set to homepage and a script with * includes
      var DoS_PREVENTION_TIME = 2 * 60 * 1000;
      var isSomeoneChecking = getValue('CHECKING_AT', null);
      setValue('CHECKING_AT', gNow);
      if (isSomeoneChecking && (gNow - isSomeoneChecking) < DoS_PREVENTION_TIME) return;
      var lastChecked = getValue('LAST_CHECKED', null);

      if (lastChecked && (gNow - lastChecked) < SIX_HOURS) return;

      xhr_org(
        SCRIPT.url + '?source', // don't increase the 'installed' count just for checking
        function(result) {
          if (result.status !== 200) return;
          if (!result.responseText.match(/@version\s+([\d.]+)/)) return;
          var theOtherVersion = parseFloat(RegExp.$1);
          if (theOtherVersion <= parseFloat(SCRIPT.version)) return;
          if (window.confirm('A new version ' + theOtherVersion + ' of greasemonkey script "' + SCRIPT.name + '" is available.\nYour installed version is ' + SCRIPT.version + ' .\n\nUpdate now?\n')) {
            openInTab(SCRIPT.url);
          }
        });
      setValue('LAST_CHECKED', gNow);
    } catch(e2) {}
  }
  autoUpdateFromUserscriptsDotOrg({
    name: 'San Francisco Bay Area Libraries - Books lookup on all sites',
    url: 'http://userscripts.org/scripts/source/1072.user.js',
    version: '4.3'
  });

  // ********** Link individual libraries on plsinfo.org book page
  // This code directly from 'Peninsula Library System Google Print Lookup'
  if (location.href.match(/^https?:\/\/catalog\.plsinfo\.org\/(search|record)/i)) {
    try {

      // library name and id hash Array - for building the url later
      // Note: The order is important
      var theLibraryIDs = [];

      theLibraryIDs["Atherton"] = 55;
      theLibraryIDs["Belmont"] = 56;
      theLibraryIDs["Bookmobile"] = 72;
      theLibraryIDs["Brisbane"] = 73;
      theLibraryIDs["Burlingame[, -]+Easton"] = 52;
      theLibraryIDs["Burlingame"] = 53;
      theLibraryIDs["Cañada College"] = 61;
      theLibraryIDs["College of San Mateo"] = 58;
      theLibraryIDs["Daly City[, -]+Bayshore"] = 86;
      theLibraryIDs["Daly City[, -]+John [D. ]*Daly"] = 63;
      theLibraryIDs["Daly City[, -]+Serramonte"] = 85;
      theLibraryIDs["Daly City[, -]+Westlake"] = 62;
      theLibraryIDs["East Palo Alto"] = 60;
      theLibraryIDs["Foster City"] = 59;
      theLibraryIDs["Half Moon Bay"] = 74;
      theLibraryIDs["Menlo Park[, -]+Belle Haven"] = 66;
      theLibraryIDs["Menlo Park"] = 65;
      theLibraryIDs["Millbrae"] = 64;
      theLibraryIDs["Pacifica[, -]+Sanchez"] = 75;
      theLibraryIDs["Pacifica[, -]+Sharp Park"] = 76;
      theLibraryIDs["Portola Valley"] = 77;
      theLibraryIDs["Redwood City[, -]+Fair Oaks"] = 68;
      theLibraryIDs["Redwood City[, -]+Redwood Shores"] = 69;
      theLibraryIDs["Redwood City[, -]+Schaberg"] = 70;
      theLibraryIDs["Redwood City[, -]+Downtown"] = 67;
      theLibraryIDs["Redwood City"] = 27;
      theLibraryIDs["San Bruno"] = 54;
      theLibraryIDs["San Carlos"] = 78;
      theLibraryIDs["San Mateo[, -]+Hillsdale"] = 81;
      theLibraryIDs["San Mateo[, -]+Marina"] = 82;
      theLibraryIDs["San Mateo[, -]+Main"] = 80;
      theLibraryIDs["San Mateo"] = 31;
      theLibraryIDs["Skyline College"] = 57;
      theLibraryIDs["South San Francisco[, -]+Grand Avenue"] = 83;
      theLibraryIDs["South San Francisco[, -]+Community Learning Center"] = 28;
      theLibraryIDs["South San Francisco"] = 84;
      theLibraryIDs["Woodside"] = 79;

      var xpathLibraryNameCells = '//*[contains(concat( " ", @class, " " ), concat( " ", "bibItemsEntry", " " ))]//td';
      var libraryNameElems = document.evaluate(xpathLibraryNameCells, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

      for (var k = 0; k < libraryNameElems.snapshotLength; k++) { // iterate thru each library name table cell
        var theLibraryNameElem = libraryNameElems.snapshotItem(k);
        var theLibraryName = theLibraryNameElem.innerHTML;
        var theNamePattern;
        for (var theNameKey in theLibraryIDs) {
          if (! theLibraryIDs.hasOwnProperty(theNameKey)) continue;
          theNamePattern = new RegExp(theNameKey);
          var result;
          if ((result = theNamePattern.exec(theLibraryName)) !== null) {
            var theLibName = result[0];
            var theNewName = theLibraryName.replace(theNamePattern, '<a href="http://www.plsinfo.org/library-hours?tid=' + theLibraryIDs[theNameKey] + '" style="background-color:#FFC" target="_blank">' + theLibName + "</a>");
            theLibraryNameElem.removeChild(theLibraryNameElem.firstChild);
            theLibraryNameElem.innerHTML = theNewName;

            break;
          }
        }
      }
    } catch (e3) {}
  }

  var ISBN = {
    checkISBN : function (aISBN) { // somewhat lax validation of ISBN
      var theISBN = aISBN;
      try {
        theISBN = theISBN.replace(/-+/g, '').replace(/x/g, "X");
        if (! theISBN.match(/^\d{9,12}[\dX]$/) || (theISBN.length !== 10 && theISBN.length !== 13)) { // a multiline string with isbn appended can still trigger get ignored without this check
          //if (getValue('DEVELOPER', false)) {
          //unsafeWindow.confirm("Not a valid ISBN (length): " + aISBN + "\n" + theISBN);
          //}
          return null;
        }
        var i, checksum = 0;
        if (theISBN.length === 10) {
          for (i = 0; i < 9; i++) {
            checksum += parseInt(theISBN.charAt(i), 10) * (10 - i);
          }
          if (theISBN.charAt(9) === "X") {
            checksum += 10;
          } else {
            checksum += parseInt(theISBN.charAt(9), 10);
          }
          if ((checksum % 11) === 0) {
            return theISBN;
          } else {
            //if (getValue('DEVELOPER', false)) {
            //unsafeWindow.confirm("Not a valid ISBN (10): " + aISBN + "\n" + theISBN);
            //}
            return null;
          }
        } else {
          for (i = 0; i < 12; i++) {
            checksum += parseInt(theISBN.charAt(i), 10) * (i % 2 === 0?1:3);
          }
          checksum = 10 - (checksum % 10);
          if (checksum === 10) {
            checksum = 0;
          }
          if (parseInt(theISBN.charAt(12), 10) !== checksum) {
            //if (getValue('DEVELOPER', false)) {
            //unsafeWindow.confirm("Not a valid ISBN (13 X but not 0): " + aISBN + "\n" + theISBN);
            //}
            return null;
          } else {
            return theISBN;
          }
        }
      } catch(e4) {
        if (getValue('DEVELOPER', false)) {
          log("Error validating ISBN: " + aISBN + "\n\n" + e4);
        }
        return null;
      }
    },

    findGenericISBN : function(theArray, badass) {
      var isbn_re_1 = /isbn(?:-?1[03])?[=\/+:]((\d{3}-?)?\d{9}[\dX]|\d\d-\d{6}-\d-\d|\d{3}-\d{4}-\d{5}-\d|\d{4}-\d{5}-\d|\d-\d{5}-\d{3}-\d|\d-\d{3}-\d{5}-\d)/i;
      var isbn_re_2 = /isbn(?:-?1[03])?[=\/+:]+((\d{3}-?)?\d{9}[\dX]|\d{3}-\d{4}-\d{5}-\d|\d{4}-\d{5}-\d|\d-\d{5}-\d{3}-\d|\d-\d{3}-\d{5}-\d)/i;
      try {
        var bodyhtml = document.body.innerHTML;
        var found;
        try {
          addUnique(theArray, location.href.match(isbn_re_1)[1]);
        } catch (e5){}
        try {
          addUnique(theArray, document.title.match(isbn_re_2)[1]);
        } catch (e6){}
        if ( !document.links ) {
          document.links = document.getElementsByTagName("a");
        }
        var links = document.links;
        for (var a = 0, len = links.length; a < len; a++) {
          if (links[a].href.match(/\b(\d{9,12}[x0-9])\b/i)) {
            addUnique(theArray, RegExp.$1);
          }
        }
        if (badass) {
          var badass_isbn_re_1 = /ISBN[\s:-]?(?:1[03])?(?:\s|<[^<]*>)*[\n\r]*(?:(?:\s|<^>]*>)*[\n\r]*)*(?:\s|<[^<]*>)?([\dX-]{10,})(.*[\n\r]*)*/i;
          var badass_isbn_re_2 = /\b((?:\d{3}-?)?(?:\d{9}[\dX]|\d\d-\d{6}-\d-\d|\d{3}-\d{4}-\d{5}-\d|[\d-]{8,}[\dx]|\d{4}-\d{5}-\d|\d-\d{5}-\d{3}-\d|\d-\d{3}-\d{5}-\d))([\s\n\r,\dX-]*)/i;
          while (bodyhtml.match(badass_isbn_re_1)) {
            var maybeMultiple = RegExp.$1;
            bodyhtml = RegExp.$2;
            while (maybeMultiple.match(badass_isbn_re_2)) {
              found = RegExp.$1;
              maybeMultiple = RegExp.$2;
              addUnique(theArray, found);
            }
          }
        }
      } catch (e7) {}
    },

    getISBNs : function() {
      var results = [];
      var url = location.href;
      var a, i, links, idx;
      try {
        if (url.match(/^https?:\/\/(www\.)?librarything\.com/)) {
          var lta = $xp("//div[@class='isbn']/a");
          for (var lti = 0, len = lta.length; lti < len; lti++) {
            a = lta[lti];
            if (a.innerHTML.match(/ISBN\s+((\d{3}-?)?\d{9}[\dX]|\d{3}-\d{4}-\d{5}-\d|\d{4}-\d{5}-\d|\d-\d{3}-\d{5}-\d)/i)) {
              addUnique(results, RegExp.$1);
            }
          }
        } else if (url.match(/^https?:\/\/(www\.)?amazon\./)) {
          try {
            addUnique(results, url.match(/[\/=]((\d{3}-?)?\d{9}[\dX]|\d{3}-\d{4}-\d{5}-\d|\d{4}-\d{5}-\d|\d-\d{3}-\d{5}-\d)(\/|%|\&|;|\?|$)/i)[1]);
          } catch (e8) {}
          var c = document.body.innerHTML;
          idx = c.indexOf('ISBN-10:</b>');
          if (idx !== -1 && c.substring(idx+12).match(/^[\n\r\s]*((\d{3}-?)?\d{9}[\dX]|\d{3}-\d{4}-\d{5}-\d|\d{4}-\d{5}-\d|\d-\d{3}-\d{5}-\d)/i)) {
            addUnique(results, RegExp.$1);
          }
          idx = c.indexOf('ISBN-13:</b>');
          if (idx !== -1 && c.substring(idx+12).match(/^[\n\r\s]*((\d{3}-?)?\d{9}[\dX]|\d{3}-\d{4}-\d{5}-\d|\d{4}-\d{5}-\d|\d-\d{3}-\d{5}-\d)/i)) {
            addUnique(results, RegExp.$1);
          }
        } else if (url.match(/abebooks\.com/)) {
          try {
            addUnique(results, document.title.match(/ISBN ((\d{3}-?)?\d{9}[\dX]|\d{3}-\d{4}-\d{5}-\d|\d{4}-\d{5}-\d|\d-\d{3}-\d{5}-\d)/i)[1]);
          } catch (e9) {}
          try {
            addUnique(results, document.body.innerHTML.match(/class="isbn">((\d{3}-?)?\d{9}[\dX]|\d{3}-\d{4}-\d{5}-\d|\d{4}-\d{5}-\d|\d-\d{3}-\d{5}-\d)/i)[1]);
          } catch (e10) {}
          links = document.links;
          for (a = 0, len = links.length; a < len; a++) {
            if (links[a].href.match(/bi=(\d{9,12}[x0-9])\b/i)) {
              addUnique(results, RegExp.$1);
            }
          }
        } else if (url.match(/\baddall\.com/)) {
          try {
            addUnique(results, url.match(/query=((\d{3}-?)?\d{9}[\dX]|\d{3}-\d{4}-\d{5}-\d|\d{4}-\d{5}-\d|\d-\d{3}-\d{5}-\d)/i)[1]);
          } catch (e11) {}
          links = document.links;
          for (a = 0, len = links.length; a < len; a++) {
            if (links[a].href.match(/detail\/(\d{9,12}[x0-9])\.html/i)) {
              addUnique(results, RegExp.$1);
            }
          }
        } else if (url.match(/\bpowells\.com/)) {
          var dts = document.getElementsByTagName('dt');
          for (i=0; i < dts.length; i++) {
            if (dts[i].innerHTML.match('ISBN([\s-]?1[03])?:')) {
              addUnique(results, dts[i].nextSibling.firstChild.text);
            }
          }
          links = document.links;
          for (a = 0, len = links.length; a < len; a++) {
            if (links[a].href.match(/\b(\d{9,12}[x0-9])\b/i)) {
              addUnique(results, RegExp.$1);
            }
            if (links[a].href.match(/\/biblio\/\d+-(\d{9,12}[x0-9])-\d+\b/i)) {
              addUnique(results, RegExp.$1);
            }
          }
        } else if (url.match('(alibris|half.ebay).com')) {
          var bs = document.getElementsByTagName('b');
          for (i=0; i<bs.length; i++) {
            if (bs[i].innerHTML.match('ISBN([\s-]?1[03])?:')) {
              addUnique(results, bs[i].nextSibling.nextSibling.text);
            }
          }
          links = document.links;
          for (a = 0, len = links.length; a < len; a++) {
            if (links[a].href.match(/isbn\/(\d{9,12}[x0-9])\b/i)) {
              addUnique(results, RegExp.$1);
            }
          }
        } else if (url.match('books.google.com')) {
          try {
            addUnique(results, url.match(/v?id=ISBN((\d{3}-?)?\d{9}[\dX]|\d{3}-\d{4}-\d{5}-\d|\d{4}-\d{5}-\d|\d-\d{3}-\d{5}-\d)/i)[1]);
          } catch (e11a) {}
          links = document.links;
          for (a = 0, len = links.length; a < len; a++) {
            if (links[a].href.match(/isbn(?:\%3D)?(\d{9,12}[x0-9])/i)) {
              addUnique(results, RegExp.$1);
            }
            if (links[a].href.match(/(?:ean=|keyword=|\/)(\d{9,12}[x0-9])/i)) {
              addUnique(results, RegExp.$1);
            }
          }
        } else if (url.match(/bookmooch\.com|searchbox.org/)) {
          try {
            addUnique(results, url.match(/detail\/((\d{3}-?)?\d{9}[\dX]|\d{3}-\d{4}-\d{5}-\d|\d{4}-\d{5}-\d|\d-\d{3}-\d{5}-\d)/i)[1]);
          } catch (e11b) {}
        } else if (url.match(/worldcat(libraries)?\.org/)) {
          var c1 = document.body.innerHTML;
          idx = c1.indexOf('<strong>ISBN: </strong>');
          if (idx !== -1) {
            if (c1.substring(idx+23).match(/[\n\r\s]*((\d{3}-?)?\d{9}[\dX]|\d{3}-\d{4}-\d{5}-\d|\d{4}-\d{5}-\d|\d-\d{3}-\d{5}-\d)/i)) {
              addUnique(results, RegExp.$1);
            }
            if (c1.substring(idx+23).match(/[\n\r\s]*\d+\s+((\d{3}-?)?\d{9}[\dX]|\d{3}-\d{4}-\d{5}-\d|\d{4}-\d{5}-\d|\d-\d{3}-\d{5}-\d)/i)) {
              addUnique(results, RegExp.$1);
            }
          }
        }
      } catch (e12) {
        if (getValue('DEVELOPER', false)) {
          log("Exception: " + e12);
        }
      }
      this.findGenericISBN(results, getValue('Scrape?', true));
      return results; // sorting doesn't matter as search requests finish out of order
    }
  };

  // Don't need to define the rest of  the stuff if no ISBNs found
  var gFoundISBNs = ISBN.getISBNs();
  if (!gFoundISBNs || gFoundISBNs.length <= 0) return;

  // ********** Drag and Drop
  var Drag = function() {
    this.init.apply( this, arguments );
  };

  Drag.fixE = function( e ) {
    if ( typeof e === 'undefined' ) e = window.event;
    if ( typeof e.layerX === 'undefined' ) e.layerX = e.offsetX;
    if ( typeof e.layerY === 'undefined' ) e.layerY = e.offsetY;
    return e;
  };

  Drag.prototype.MAX_INDEX = 2147483644; // max int minus 1 for maskLayer minus 1 for dialogLayer

  Drag.prototype.zIndices = [];

  Drag.prototype.init = function( handle, dragdiv ) {
    this.div = dragdiv || handle;
    this.handle = handle;
    //if ( isNaN(parseInt(this.div.style.left)) ) this.div.style.left  = '0px';
    //if ( isNaN(parseInt(this.div.style.top)) ) this.div.style.top = '0px';
    this.onDragStart = function(){};
    this.onDragEnd = function(){};
    this.onDrag = function(){};
    this.onClick = function(){};
    this.mouseDown = addEventHandler(this.handle, 'mousedown', this.start, this);
    this.div.style.zIndex = this.MAX_INDEX - this.zIndices.length;
    this.zIndices.push(this.div);
    this.div.style.left = (((this.zIndices.length - 1)* 30 ) + 100) + 'px';
    this.div.style.top = ((this.zIndices.length - 1)* 30 ) + 'px';

    this.raise();
  };

  Drag.prototype.raise = function() {
    // raise to the top cheaply
    // Assumes that the div aren't destroyed once created
    if (this.div.style.zIndex !== this.MAX_INDEX) {
      var otherdiv = this.zIndices[0];
      otherdiv.style.zIndex = this.div.style.zIndex;
      this.div.style.zIndex = this.MAX_INDEX;
      this.zIndices[0] = this.div;
      this.zIndices[this.MAX_INDEX - otherdiv.style.zIndex] = otherdiv;
    }
  };

  Drag.prototype.start = function(e) {
    e = Drag.fixE(e);

    this.started = new Date();
    var y = this.startY = parseInt(this.div.style.top, 10);
    var x = this.startX = parseInt(this.div.style.left, 10);

    this.raise();
    this.div.style.opacity = 0.85;

    this.onDragStart(x, y);
    this.lastMouseX = e.clientX;
    this.lastMouseY = e.clientY;
    this.documentMove = addEventHandler(document, 'mousemove', this.drag, this);
    this.documentStop = addEventHandler(document, 'mouseup', this.end, this);
    if (e.preventDefault) e.preventDefault();
    return false;
  };

  Drag.prototype.drag = function(e) {
    e = Drag.fixE(e);
    var ey = e.clientY;
    var ex = e.clientX;

    // prevent the title from becoming unreachable
    if (ex < 0) ex = 0;
    if (ey < 0) ey = 0;

    var y = parseInt(this.div.style.top, 10);
    var x = parseInt(this.div.style.left, 10);
    var nx = ex + x - this.lastMouseX;
    var ny = ey + y - this.lastMouseY;
    this.div.style.left = nx + 'px';
    this.div.style.top  = ny + 'px';

    this.lastMouseX = ex;
    this.lastMouseY = ey;
    this.onDrag(nx, ny);
    if (e.preventDefault) {
      e.preventDefault();
    }
    return false;
  };

  Drag.prototype.end = function() {
    removeEventHandler(document, 'mousemove', this.documentMove);
    removeEventHandler(document, 'mouseup', this.documentStop);
    var time = (new Date()) - this.started;
    var x = parseInt(this.div.style.left, 10),  dx = x - this.startX;
    var y = parseInt(this.div.style.top, 10), dy = y - this.startY;
    this.onDragEnd( x, y, dx, dy, time );
    if ( (dx*dx + dy*dy) < (4*4) && time < 1e3 ) {
      this.onClick( x, y, dx, dy, time );
    }
    this.div.style.opacity = 1.0;
  };

  var fitString = function(s, w) {
    var filler = '...';
    var f = filler.length;
    if (w < 0) return s;
    if (w === 0) return '';
    if (s.length <= w) return s;
    if (w <= f) return s.substring(0, w);
    return s.substring(0, Math.floor(w / 2) - Math.floor(f/2)) + filler + s.substring(s.length - Math.floor((w+1)/2) + Math.floor((f+1)/2), s.length);
  };

  var gAltISBNs = {};

  var gFrame;

  var gLibDivs = {};

  var LIBS = ['Peninsula Library System', 'Palo Alto Library'];

  var LCFG = {
    'Peninsula Library System': {
      searchURL : 'http://catalog.plsinfo.org/search/i?SEARCH=%s',
      selfURLRegex : '^http:\/\/catalog\.plsinfo\.org\/.*$',
      titleFunc : function(page) {
        var doc = document.createElement('div');
        doc.innerHTML = page;
        if (isSafari() || isChrome()) {
          document.getElementsByTagName('body')[0].appendChild(doc);
        }
        return $xp1('//*[contains(concat( " ", @class, " " ), concat( " ", "bibInfoData", " " ))]//strong', doc);
      }
    },
    'Palo Alto Library': {
      searchURL : 'http://webcat.cityofpaloalto.org/ipac20/ipac.jsp?index=ISBNEX&term=%s',
      selfURLRegex : '^https?:\/\/webcat\.cityofpaloalto\.org\/.*$',
      titleFunc : function(page) {
        var doc = document.createElement('div');
        doc.innerHTML = page;
        if (isSafari() || isChrome()) {
          document.getElementsByTagName('body')[0].appendChild(doc);
        }
        return $xp1("//td[@colspan='3' and @width='100%']/a[@class='boldBlackFont2'][1]", doc);
      }
    }
  };

  var ll = {
    func_or_regex : function(f_or_r, content) {
      if (type(f_or_r) == 'Function') {
        return f_or_r(content);
      } else {
        return f_or_r.test(content);
      }
    },
    libraryAvailability : /\bIn Library|Check Shelf|>Checked in<|>Display Main</i,
    libraryRecentlyReturned : /Recently Returned|Recent Return/i,
    libraryRecentAvailability : /Recent Checkin/i,
    libraryCheckedOut : /\bChecked out\b/i,
    libraryStorage : /Storage/i,
    libraryOnHold : /(On Hold Shelf|[Bb]eing [Hh]eld|holds? on \w+ copy returned of \d+ cop|In transit \+\d+ hold)/i,
    libraryProcessing : /IN PROCESS(ING)?/i,  // yeah yeah I know
    libraryTransit : /(In )?Transit\b|>\s*Transit request\s*</i,
    libraryDueBack : /(\d{2} [A-Z][A-Z][A-Z] \d{2}|DUE \d{2}-\d{2}-\d{2})/i,
    libraryInternet : /INTERNET|electronic resource/,
    libraryAudio : /sound recording/,
    libraryVideo: /videorecording/,
    libraryWhereIsIt : /Where is it\?/,
    libraryOrdered : /COPY ORDERED|ITEM HAS BEEN ORDERED|On Order/i,
    libraryReordered : /REORDERED/i,
    libraryMissing : /MISSING/i,
    libraryLostAndPaid : /LOST AND PAID/i,
    libraryDefective : />Defective<|Damaged/i,
    libraryUseOnly : /LIB\. USE ONLY/i,
    libraryReference : />Reference Shelves</i,
    libraryNotFound : function(content) { // TODO : The title can be extractable in the second case
      return (/No matches found; nearby STANDARD NOS are|Sorry, could not find anything matching/).test(content) ||
        (! (/Call No./).test(content) && ! (/Copy.Holding information/).test(content));
    },
    libraryNoItemInformation : /No Item Information/,
    libraryMending : /MENDING/i,
    libraryMendingReview : /Mends Review/i,
    libraryWithdrawn : /Withdrawn/i,
    libraryMultiple : /STANDARD NOS \(|titles matched/,
    xisbnAlternatesQueryOld : 'http://old-xisbn.oclc.org/webservices/xisbn/%s',
    xisbnAlternatesQueryNew : 'http://xisbn.worldcat.org/webservices/xid/isbn/%s?method=getEditions&format=xml',
    //xisbnMetadataQuery1 : 'http://xisbn.worldcat.org/webservices/xid/isbn/',
    //xisbnMetadataQuery2 : '?method=getMetadata&format=xml&fl=*',
    isbnREplain : /(\d{7,12}[\d|X])/ig,
    titleREplain : /title=["']([^"']+)["']/ig,

    makeAltQueryUrl : function(isbn, method) {
      var qurl;
      method = method || 1;
      if (method === 1) {
        return ll.xisbnAlternatesQueryNew.replace(/%s/g, isbn);
      } else {
        return ll.xisbnAlternatesQueryOld.replace(/%s/g, isbn);
      }
    },

    shouldStop : function(library) {
      try {
        // User closed us
        if (gFrame.style.display == 'none') return true;
      } catch (ef) {}
      return !!(!getValue(library, true) || location.href.match(LCFG[library].selfURLRegex));
    },

    stat_types : ['INSTANT', 'ELECTRONIC', 'DELAYED', 'NOPE', 'ERROR'],

    stat_labels : {
      INSTANT : 'Instant Gratification',
      ELECTRONIC : 'Electronic Editions',
      DELAYED : 'Delayed Gratification',
      NOPE : 'Not available',
      ERROR : 'Error Encountered'
    },

    stat_colors : {
      INSTANT : 'green',
      ELECTRONIC : '#3399CC',
      DELAYED : '#FF7633',
      NOPE : '#666666',
      ERROR : 'red'
    },

    makeLibraryWindow : function(library) {
      var libraryid = library.replace(/[^a-zA-Z0-9]/g, '');

      var body = document.getElementsByTagName('body')[0];
      if (!body) return;

      if (!gFrame) {
        gFrame = document.createElement('div');
        gFrame.id = 'sfbal_frame';
        gFrame.className += 'sfbal_frame';
        gFrame.state = getValue('FrameState', 'collapsed');

        var theFrameTitle = document.createElement('div');
        theFrameTitle.id = 'sfbal_frame_title';
        theFrameTitle.className += 'sfbal_frame_title';
        if (ll.hopeCount) {
          theFrameTitle.style.background = gStyles[getValue('Style', 0)].frame_title_bg;
        } else {
          theFrameTitle.style.background = '#ccc';
        }
        theFrameTitle.appendChild(document.createTextNode(' San Francisco Bay Area Libraries '));

        ///////////////////////////////////////////////////////////////////////
        // PREFERENCES BUTTON
        var thePrefsImg = document.createElement( 'img' );
        thePrefsImg.src = gIcons.prefs;

        thePrefsImg.style.right = '22px';
        thePrefsImg.className += 'mini_button';

        thePrefsImg.setAttribute('alt', 'P');
        thePrefsImg.setAttribute('title', 'Click to change preferences');
        addEventHandler(thePrefsImg, 'click', configureScript);
        theFrameTitle.appendChild(thePrefsImg);
        // COLLAPSE BUTTON
        ///////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////
        // COLLAPSE BUTTON
        var theCollapseImg = document.createElement( 'img' );

        theCollapseImg.style.right = '3px';
        theCollapseImg.className += 'mini_button';

        theCollapseImg.setAttribute('alt', '+/-');
        if (gFrame.state == 'collapsed') {
          theCollapseImg.src = gIcons.plus;
          theCollapseImg.setAttribute('title', 'Click to expand');
        } else {
          theCollapseImg.setAttribute('title', 'Click to collapse');
          theCollapseImg.src = gIcons.minus;
        }
        addEventHandler(theCollapseImg, 'click', function() {
          try {
            var newdisplay;
            if (gFrame.state === 'collapsed') {
              newdisplay = 'block';
              gFrame.state = 'expanded';
              theCollapseImg.src = gIcons.minus;
              theCollapseImg.setAttribute('title', 'Click to collapse');
            } else {
              newdisplay = 'none';
              gFrame.state = 'collapsed';
              theCollapseImg.src = gIcons.plus;
              theCollapseImg.setAttribute('title', 'Click to expand');
            }
            setValue('FrameState', gFrame.state);
            var c = gFrame.firstChild;
            while (c) {
              if (c.getAttribute('class') === 'sfbal_lib') {
                c.style.display = newdisplay;
              }
              c = c.nextSibling;
            }
          } catch(e14) {
            log(e14);
          }
        });

        theFrameTitle.appendChild(theCollapseImg);
        // COLLAPSE BUTTON
        ///////////////////////////////////////////////////////////////////////

        ///////////////////////////////////////////////////////////////////////
        // CLOSE BUTTON
        var theCloseImg = document.createElement( 'img' );
        theCloseImg.src = gIcons.close;
        theCloseImg.style.left = '3px';
        theCloseImg.className += 'mini_button';

        theCloseImg.setAttribute('alt', 'X');
        theCloseImg.setAttribute('title', 'Click to remove');
        addEventHandler(theCloseImg, 'click', function(){ try{gFrame.style.display="none";}catch(e14a){} } );

        theFrameTitle.appendChild(theCloseImg);
        // CLOSE BUTTON
        ///////////////////////////////////////////////////////////////////////

        theFrameTitle.drag = new Drag(theFrameTitle, gFrame);
        gFrame.appendChild(theFrameTitle);
        body.appendChild(gFrame);
      }

      if (gLibDivs[libraryid]) return;

      gLibDivs[libraryid] = document.createElement('div');
      gLibDivs[libraryid].id = libraryid;

      var tmp = gLibDivs[libraryid].style;
      gLibDivs[libraryid].className += 'sfbal_lib';
      if (gFrame.state === 'expanded') {
        // not !important to enable hiding later
        gLibDivs[libraryid].style.display = 'block';
      } else {
        // not !important to enable hiding later
        gLibDivs[libraryid].style.display = 'none';
      }
      var libtitle = document.createElement('div');
      libtitle.className += 'sfbal_lib_title';
      libtitle.appendChild(document.createTextNode(' ' + library + ' '));
      gLibDivs[libraryid].appendChild(libtitle);

      gFrame.appendChild(gLibDivs[libraryid]);

      for (var sti = 0, len = ll.stat_types.length; sti < len; sti++) {
        var the_stat_type = ll.stat_types[sti];
        var etype = getValue('Show' + the_stat_type, 'expanded');
        if (etype == 'no') continue;

        var the_group_title = document.createElement('div');
        the_group_title.id = libraryid + "_" + the_stat_type + "_title";
        the_group_title.className += 'sfbal_type_group_title';
        the_group_title.style.display = 'none';
        the_group_title.alt = the_group_title.title = 'Click to collapse or expand';

        var the_type_group = document.createElement('div');
        the_type_group.id = libraryid + "_" + the_stat_type;
        the_type_group.className += 'sfbal_type_group';

        var plus_minus_button = document.createElement('img');
        plus_minus_button.style.verticalAlign = 'middle';
        if (etype == 'expanded') {
          the_group_title.innerHTML = ' ' + ll.stat_labels[the_stat_type];
          the_type_group.style.display = 'block';
          plus_minus_button.src = gIcons.minus;
        } else {
          the_group_title.innerHTML = ' ' + ll.stat_labels[the_stat_type];
          the_type_group.style.display = 'none';
          plus_minus_button.src = gIcons.plus;
        }
        plus_minus_button.style.display = 'inline';
        the_group_title.insertBefore(plus_minus_button, the_group_title.firstChild);
        addEventHandler(the_group_title, 'click', function(){
          try {
            var the_group_ID = this.id.replace(/_title$/, "");
            var the_group = document.getElementById(the_group_ID);
            if (the_group.style.display === 'none') {
              the_group.style.display = "block";
              this.firstChild.src = gIcons.minus;
            } else {
              the_group.style.display = "none";
              this.firstChild.src = gIcons.plus;
            }
          } catch(e15){}
        });
        gLibDivs[libraryid].appendChild(the_group_title);
        gLibDivs[libraryid].appendChild(the_type_group);
      }
    },

    shop_urls : {
      // 'amazon' : 'http://www.amazon.com/exec/obidos/ISBN=%s',
      'amazon' : 'http://www.amazon.com/exec/obidos/ASIN/%s/',
      'bookfinder' : 'http://www.bookfinder.com/search/?isbn=%s&st=xl&ac=qr',
      'isbndb': 'http://isbndb.com/search-all.html?kw=%s',
      'museophile': 'http://www.museophile.com/cgi/archive/isbn?%s',
      'shopwiki': 'http://www.shopwiki.com/search/%s',
      'barnesandnoble': 'http://search.barnesandnoble.com/booksearch/isbninquiry.asp?isbn=%s',
      'borders': 'http://www.borders.com/online/store/SearchResults?keyword=%s&type=0&simple=1',
      'ebay': 'http://books.search.ebay.com/%s',
      'powells': 'http://www.powells.com/cgi-bin/biblio?isbn=%s'
    },

    insertLinks: function(details, library) {
      var libraryid = library.replace(/[^a-zA-Z0-9]/g, '');
      for (var i = 0, len = details.haz.length; i < len; i++) {
        var the_stat_type = details.haz[i][1];
        if (getValue('Show' + the_stat_type, 'expanded') == 'no') continue;

        ll.makeLibraryWindow(library);

        var bkid = details.isbn + "_" + libraryid + "_" + the_stat_type;
        if (document.getElementById(bkid)) continue;
        if (the_stat_type !== 'NOPE') ll.hopeCount++;
        var book = document.createElement('div');
        book.id = bkid;
        book.className += 'sfbal_book';

        var ltlink = document.createElement('a');
        ltlink.href = 'http://www.librarything.com/isbn/' + details.isbn;
        ltlink.target = '_blank';
        ltlink.alt = 'This book on LibraryThing';
        ltlink.title = 'This book on LibraryThing';
        ltlink.textContent = 'LT';
        ltlink.className += ' sfbal_book_link sfbal_avail_' + the_stat_type;

        book.appendChild(ltlink);

        if (details.orig_isbn) {
          var aalink = document.createElement('a');
          aalink.href = ll.shop_urls[getValue('Shop', 'amazon')].replace(/%s/, details.orig_isbn);
          aalink.target = '_blank';
          aalink.alt = aalink.title = 'This book on ' + getValue('Shop', 'amazon');
          aalink.textContent = 'OISBN';
          aalink.className += ' sfbal_book_link sfbal_avail_' + the_stat_type;

          book.appendChild(document.createTextNode(' | '));
          book.appendChild(aalink);
        }

        var alink = document.createElement('a');
        alink.href = ll.shop_urls[getValue('Shop', 'amazon')].replace(/%s/, details.isbn);
        alink.target = '_blank';
        alink.alt = alink.title = 'This book on ' + getValue('Shop', 'amazon');
        alink.className += ' sfbal_book_link sfbal_avail_' + the_stat_type;

        if (details.title) {
          alink.textContent = fitString(details.title, 100);
          alink.alt = alink.title = details.title + ' on ' + getValue('Shop', 'amazon');
        } else {
          alink.textContent = details.isbn;
          alink.alt = 'This book on ' + getValue('Shop', 'amazon');
          alink.title = alink.alt;
        }
        book.appendChild(document.createTextNode(' | '));
        book.appendChild(alink);

        var hrefTitle = details.haz[i][0];
        var thislink = document.createElement('a');
        thislink.href = LCFG[library].searchURL.replace(/%s/g, details.isbn);
        thislink.alt = hrefTitle;
        thislink.title = hrefTitle;
        thislink.target = '_blank';
        thislink.textContent = 'LIB';
        thislink.className += " sfbal_book_link sfbal_avail_" + the_stat_type;

        book.insertBefore(document.createTextNode(' | '), book.firstChild);
        book.insertBefore(thislink, book.firstChild);

        var status_type_block = document.getElementById(libraryid + "_" + the_stat_type);
        if (!status_type_block) {
          log(libraryid + "_" + the_stat_type, "not defined");
        } else {
          status_type_block.appendChild(book);
          var status_type_block_title = document.getElementById(libraryid + "_" + the_stat_type + "_title");
          status_type_block_title.style.display = 'block';
          if (status_type_block_title.innerHTML.match(/ \[(\d+)\]$/)) {
            var count = parseInt(RegExp.$1, 10) + 1;
            status_type_block_title.innerHTML = status_type_block_title.innerHTML.replace(/ \[\d+\]$/, " [" + count + "]");
          } else {
            status_type_block_title.innerHTML += ' [1]';
            status_type_block_title.style.display = 'block';
            //status_type_block.style.display = 'block';
          }
        }
      }
      ll.updateRemaining();
    },

    lookupDoneFor : {},

    titleFoundFor : {},

    makeBookStatusCallback : function(details, library) {
      return function(results) {
        ll.xhrCount--;
        page = results.responseText;

        // plsinfo loves pagination now >:/
        if (library == 'Peninsula Library System' && page.indexOf("View additional copies or search for a specific volume/copy") != -1) {
          var doc = document.createElement('div');
          doc.innerHTML = page;
          if (isSafari() || isChrome()) {
            document.getElementsByTagName('body')[0].appendChild(doc);
          }
          var more = $xp1('//input[@value="View additional copies or search for a specific volume/copy"]/..', doc);
          if (more && more.action) {
            ll.xhrCount++;
            xhr(more.action, ll.makeBookStatusCallback(details, library));
          }
        }

        var availTypes;
        try {
          availTypes = ll.BookStatusCache[details.isbn][library].haz;
        } catch(e_no_status_cache) {
          availTypes = [];
        }

        var error = false;

        // NOTE : Always set it to false only later on
        var title_extractable = true;

        if (ll.func_or_regex(ll.libraryNotFound, page)) {
          addUnique(availTypes, ["Not available." , "NOPE"]);
          title_extractable = false;
        } else {
          if (ll.func_or_regex(ll.libraryMultiple, page)) {
            addUnique(availTypes, ["Multiple matches" , "INSTANT"]);
            title_extractable = false;
          }
          if (ll.func_or_regex(ll.libraryAvailability, page)) {
            addUnique(availTypes, ["On the shelf now!" , "INSTANT"]);
          }
          if (ll.func_or_regex(ll.libraryRecentAvailability, page)) {
            addUnique(availTypes, ["Recent Checkin" , "INSTANT"]);
          }
          if ( ll.func_or_regex(ll.libraryRecentlyReturned, page) ) {
            addUnique(availTypes, ["Recently Returned" , "INSTANT"]);
          }
          if ( ll.func_or_regex(ll.libraryReference, page) ) {
            addUnique(availTypes, ["Reference Shelves" , "INSTANT"]);
          }
          if ( ll.func_or_regex(ll.libraryInternet, page) && ll.func_or_regex(ll.libraryAudio, page) ) {
            addUnique(availTypes, ["Electronic Audiobook Available" , "ELECTRONIC"]);
          } else if ( ll.func_or_regex(ll.libraryInternet, page) ) {
            addUnique(availTypes, ["eBook available" , "ELECTRONIC"]);
          }
          if ( ll.func_or_regex(ll.libraryCheckedOut, page) ) {
            addUnique(availTypes, ["Checked out" , "DELAYED"]);
          }
          if ( ll.func_or_regex(ll.libraryStorage, page) ) {
            addUnique(availTypes, ["In Storage" , "DELAYED"]);
          }
          if ( ll.func_or_regex(ll.libraryProcessing, page) ) {
            addUnique(availTypes, ["In Processing" , "DELAYED"]);
          }
          if ( ll.func_or_regex(ll.libraryTransit, page) ) {
            addUnique(availTypes, ["In Transit" , "DELAYED"]);
          }
          if ( ll.func_or_regex(ll.libraryOnHold, page) ) {
            addUnique(availTypes, ["Being Held" , "DELAYED"]);
          }
          if ( ll.func_or_regex(ll.libraryDueBack, page) ) {
            var due = page.match(ll.libraryDueBack)[1];
            addUnique(availTypes, ["Due back" , "DELAYED"]);
          }
          if ( ll.func_or_regex(ll.libraryMending, page) ) {
            addUnique(availTypes, ["Mending" , "DELAYED"]);
          }
          if ( ll.func_or_regex(ll.libraryMendingReview, page) ) {
            addUnique(availTypes, ["Mending Review" , "DELAYED"]);
          }
          if ( ll.func_or_regex(ll.libraryWithdrawn, page) ) {
            addUnique(availTypes, ["Withdrawn" , "NOPE"]);
          }
          if ( ll.func_or_regex(ll.libraryInternet, page) && ll.func_or_regex(ll.libraryVideo, page) ) {
            addUnique(availTypes, ["Electronic Video Available" , "ELECTRONIC"]);
          } else if ( ll.func_or_regex(ll.libraryVideo, page) ) {
            addUnique(availTypes, ["Video Recording" , "INSTANT"]);
          }
          if ( ll.func_or_regex(ll.libraryOrdered, page) ) {
            addUnique(availTypes, ["Ordered" , "DELAYED"]);
          }
          if ( ll.func_or_regex(ll.libraryReordered, page) ) {
            addUnique(availTypes, ["Reordered" , "DELAYED"]);
          }
          if ( ll.func_or_regex(ll.libraryMissing, page) ) {
            addUnique(availTypes, ["Missing" , "NOPE"]);
          }
          if ( ll.func_or_regex(ll.libraryLostAndPaid, page) ) {
            addUnique(availTypes, ["Lost and Paid" , "NOPE"]);
          }
          if ( ll.func_or_regex(ll.libraryDefective, page) ) {
            addUnique(availTypes, ["Defective" , "NOPE"]);
          }
          if ( ll.func_or_regex(ll.libraryUseOnly, page) ) {
            addUnique(availTypes, ["Library Use Only" , "DELAYED"]);
          }
          if ( ll.func_or_regex(ll.libraryNoItemInformation, page) ) {
            if (! ll.func_or_regex(ll.libraryInternet, page)) {
              addUnique(availTypes, ["No Item Information" , "DELAYED"]);
            }
          }
          if (!availTypes.length && ll.func_or_regex(ll.libraryWhereIsIt, page) ) { // maybe multiple editions
            addUnique(availTypes, ["Click for details" , "DELAYED"]);
          }
          if (!availTypes.length) {
            error = true;
            title_extractable = false;
            var extraType;
            var tpage;
            if (library === 'Peninsula Library system') {
              tpage = page;
              while (tpage.match(/td\s+width.*22.*>(.+)<\/td>((.*[\n\r]*)*)/i)) {
                extraType = RegExp.$1;
                tpage = RegExp.$2;
                extraType = extraType.replace(/<!--.*-->/g,'').
                  replace(/.nbsp;/g, ' ').
                  replace(/^\s+/, '').
                  replace(/\s+$/, '');
                addUnique(availTypes, [extraType, "ERROR"]);
              }
            } else if (library === 'Palo Alto Library') {
              tpage = page;
              while (tpage.match(/(?:white|FCFDC|ormation)">(.+)<\/a>((.*[\n\r]*)*)/i)) {
                extraType = RegExp.$1;
                tpage = RegExp.$2;
                extraType = extraType.replace(/<!--.*-->/g,'').
                  replace(/.nbsp;/g, ' ').
                  replace(/^\s+/, '').
                  replace(/\s+$/, '');
                addUnique(availTypes, [extraType, "ERROR"]);
              }
            }
            if (!availTypes.length) {
              title_extractable = false;
              addUnique(availTypes, ["Error: Click for library page. You can check by searching manually." , "ERROR"]);
            }
          }
        }
        if (availTypes.length && title_extractable && !ll.titleFoundFor[details.isbn]) {
          var title = LCFG[library].titleFunc(page);
          if (title) ll.titleFoundFor[details.isbn] = title.innerHTML.replace(/&amp;/, '&').replace(/&lt;/, '<').replace(/&gt;/, '>').replace(/&quot;/, '"').replace(/&#39;/, "'");
        }
        if (ll.titleFoundFor[details.isbn]) {
          details.title = ll.titleFoundFor[details.isbn];
        }
        if (availTypes.length) {
          details.haz = availTypes;
          if (!error && getValue('CacheBookStatus?', true)) {
            details.saved = gNow;
            ll.BookStatusCache[details.isbn] = {};
            ll.BookStatusCache[details.isbn][library] = details;
            setValue('book_status_cache', ll.BookStatusCache);
          }
          ll.insertLinks (details, library);
        }
        return;
      };
    },

    BookStatusCache : getValue('CacheBookStatus?', true)?getValue('book_status_cache', {}):{},

    AltISBNsCache : getValue('CacheAltISBNs?', true)?getValue('alt_isbns_cache', {}):{},

    xhrCount : 0,

    hopeCount : 0,

    updateRemaining : function() {
      // if (ll.xhrCount) log(ll.xhrCount + " pending");
      var f = document.getElementById('sfbal_frame_title');
      if (!f) return; // one library or nothing
      f = f.firstChild;
      if (ll.hopeCount) {
        f.textContent = f.textContent.replace(/^(\d+: )?/, "" + ll.hopeCount + ": ");
        f.parentNode.style.backgroundColor = gStyles[getValue('Style', 0)].frame_title_bg;
      }
      if (ll.xhrCount > 0) {
        if (f.textContent.match(/ \[checking \d+\.\.\.\]$/)) {
          f.textContent = f.textContent.replace(/ \[checking \d+\.\.\.\]$/, ' [checking ' + ll.xhrCount + '...]');
        } else {
          f.textContent += ' [checking ' + ll.xhrCount + '...]';
        }
        setTimeout(arguments.callee, 5000);
        return;
      } else {
        if (f.textContent.match(/ \[checking \d+\.\.\.\]$/)) {
          f.textContent = f.textContent.replace(/ \[checking \d+\.\.\.\]$/, "");
        }
      }
    },


    crossFillBookTitles : function() {
      // When running with multiple libraries enabled, one library might provide a title
      // for an ISBN which another library may not have. At the end of all fetches, we
      // spread those found titles to the other libraries

      var len;
      ll.updateRemaining();
      if (ll.xhrCount <= 0) {

        var libs = [];

        var li;
        for (li = 0, len = LIBS.length; li < len; li++) {
          if (ll.shouldStop(LIBS[li])) continue;

          libs.push(LIBS[li]);
        }

        if (libs.length < 2) return;

        var i;
        for (i = 0, len = libs.length; i < len; i++) {
          var lib = libs[i];
          var libraryid = lib.replace(/[^a-zA-Z0-9]/g, '');

          for (var sti = 0, lenx = ll.stat_types.length; sti < lenx; sti++) {
            var the_stat_type = ll.stat_types[sti];
            if (getValue('Show' + the_stat_type, 'expanded') == 'no') continue;

            for (var isbn in ll.titleFoundFor) {
              if (! ll.titleFoundFor.hasOwnProperty(isbn)) continue;

              var bkid = isbn + "_" + libraryid + "_" + the_stat_type;

              var elem = document.getElementById(bkid);
              if (!elem) continue;

              if (elem.lastChild.textContent === isbn) {
                log("Fixing " + isbn + " for " + bkid + " to " + ll.titleFoundFor[isbn]);
                elem.lastChild.textContent = ll.titleFoundFor[isbn];
              }
            }
          }
        }
      }
    },

    makeAltCallback: function(org_isbn) {
      return function(results) {
        ll.xhrCount--;

        var xisbns = results.responseText.match(ll.isbnREplain);
        ll.AltISBNsCache[org_isbn] = {
          'saved': gNow,
          'isbns': xisbns||[]
        };
        setValue('alt_isbns_cache', ll.AltISBNsCache);
        if (xisbns && xisbns.length > 0) {
          ll.doLookup(xisbns, org_isbn);
        }
      };
    },

    doLookup : function (isbns, orig_isbn) {
      var cached;

      for (var ix = 0; ix < isbns.length ; ix++) {
        var the_isbn = ISBN.checkISBN(isbns[ix]);

        if (!the_isbn || ll.lookupDoneFor[the_isbn]) continue;

        ll.lookupDoneFor[the_isbn] = true;
        for (var i = 0, len = LIBS.length; i < len; i++) {
          var lib = LIBS[i];

          if (ll.shouldStop(lib)) continue;

          try {
            var saved = ll.BookStatusCache[the_isbn][lib]["saved"];
            if (saved && (gNow - saved) < SIX_HOURS) {
              ll.insertLinks(ll.BookStatusCache[the_isbn][lib], lib);
            } else {
              // rough purge of cache
              for (cached in ll.BookStatusCache) {
                if (! ll.lookCache.hasOwnProperty(cached)) continue;
                if ((gNow - ll.BookStatusCache[cached][lib]['saved']) >= SIX_HOURS) {
                  delete ll.BookStatusCache[cached][lib];
                }
              }
              setValue('book_status_cache', ll.BookStatusCache);
            }
          } catch (e16) {}

          ll.xhrCount++;
          if (! orig_isbn) {
            xhr(LCFG[lib].searchURL.replace(/%s/g, the_isbn), ll.makeBookStatusCallback({'isbn': the_isbn}, lib));
          } else {
            xhr(LCFG[lib].searchURL.replace(/%s/g, the_isbn), ll.makeBookStatusCallback({'isbn': the_isbn, 'orig_isbn': orig_isbn}, lib));
          }
        }

        if (!getValue('xISBN?', true) || orig_isbn) continue;

        if (ll.AltISBNsCache[the_isbn] && ll.AltISBNsCache[the_isbn]['saved']) {
          if ((gNow - ll.AltISBNsCache[the_isbn]['saved']) < SIX_HOURS) {
            ll.doLookup(ll.AltISBNsCache[the_isbn]['isbns']);
            continue;
          } else {
            // time to purge old cached entries
            for (cached in ll.AltISBNsCache) {
              if (! ll.AltISBNsCache.hasOwnProperty(cached)) continue;
              if ((gNow - ll.AltISBNsCache[cached]['saved']) >= SIX_HOURS) {
                delete ll.AltISBNsCache[cached];
              }
            }
            setValue('alt_isbns_cache', ll.AltISBNsCache);
          }
        }
        ll.xhrCount++;
        xhr(ll.makeAltQueryUrl(the_isbn), ll.makeAltCallback(the_isbn));
      } // for
      // calling it indirectly because if setTimeout fails due to restrictions, the
      // rescheduling will fail from ll.crossFillBookTitles() also, which will leave a
      // [x remaining]
      // showing forever in the title
      ll.crossFillBookTitles();
    }
  }; // var ll =


  try {
    // prevent the library from automatically going back to the main page
    // from our search result after a timeout
    try {
      var isbn;
      if (document.location.href.match(/^http:\/\/webcat\.cityofpaloalto\.org/i)) {
        unsafeWindow.Timer = function(){};
        if (document.location.href.match(/^http:\/\/webcat\.cityofpaloalto\.org\/ipac20\/ipac\.jsp\?index=ISBNEX.term=(\d{9,12}[0-9xX])/)) {
          isbn = RegExp.$1;
          $xp("//td[@colspan='3' and @width='100%']/a[@class='boldBlackFont2'][1]").forEach(function(s) {
            s.innerHTML = '<a href="' + ll.shop_urls[getValue('Shop', 'amazon')].replace(/%s/, isbn) + '" style="background-color:#EEC">' + s.innerHTML + '</a>';
          });
        }
      } else if (document.location.href.match(/^http:\/\/catalog\.plsinfo\.org\/(search|record)/i)) {
        unsafeWindow.timeout_url = document.location.href;
        if (document.location.href.match(/\/search\/i\?(?:SEARCH=)?(\d{9,12}[\dx])$/i)) {
          isbn = RegExp.$1;
          $xp('//*[contains(concat( " ", @class, " " ), concat( " ", "bibInfoData", " " ))]//strong').forEach(function(s) {
            s.innerHTML = '<a href="' + ll.shop_urls[getValue('Shop', 'amazon')].replace(/%s/, isbn) + '" style="background-color:#EEC">' + s.innerHTML + '</a>';
          });
        } else {
          var isbn_inserted = 0;
          $xp('//*[contains(concat( " ", @class, " " ), concat( " ", "bibInfoData", " " ))]').forEach(function(s) {
            if (isbn_inserted) return;
            var isbn = s.innerHTML.replace(/[^0-9X]/, '');
            if (ISBN.checkISBN(isbn)) {
              s.innerHTML = '<a href="' + ll.shop_urls[getValue('Shop', 'amazon')].replace(/%s/, isbn) + '" style="background-color:#EEC">' + s.innerHTML + '</a>';
              isbn_inserted = 1;
              $xp('//*[contains(concat( " ", @class, " " ), concat( " ", "bibInfoData", " " ))]//strong').forEach(function(title) {
                title.innerHTML = '<a href="' + ll.shop_urls[getValue('Shop', 'amazon')].replace(/%s/, isbn) + '" style="background-color:#EEC">' + title.innerHTML + '</a>';
              });
            }
          });
        }
      }
    } catch (e0) {}

    ll.doLookup(gFoundISBNs);
    var style = '';
    for (var stype in ll.stat_colors) {
      if (! ll.stat_colors.hasOwnProperty(stype)) continue;
      style += "a:link.sfbal_avail_" + stype + ", a:visited.sfbal_avail_" + stype + " {color: " + ll.stat_colors[stype] + " !important;}\n";
    }
    addStyle(
      style +
      "a.sfbal_book_link { " +
        "font-size: 10pt !important; " +
        "font-weight: bold !important; " +
        "line-height: 105% !important; " +
        "text-decoration: none !important; " +
        sansSerifFont +
        "background: transparent none no-repeat scroll 0 0 !important; " +
        "padding: 0px !important; " +
        "margin: 0px !important; " +
        "width: auto !important; " +
      "}\n" +
      "a:hover.sfbal_book_link {\n" +
        "color: black !important;\n" +
      "}\n" +
      ".sfbal_frame { " +
        "border: 1px solid black !important; " +
        "position: absolute !important; " +
        "text-align: left !important; " +
        "font-size: 10pt !important; " +
        "font-weight: bold !important; " +
        "line-height: 105% !important; " +
        "margin: 0px !important; " +
        "padding: 0px !important; " +
        "width: auto !important; " +
      "}\n" +
      ".sfbal_frame_title { " +
        "border: solid !important; " +
        "border-width: 0px !important; " +
        "cursor: move !important; " +
        sansSerifFont +
        "font-weight: bold !important; " +
        "font-size: 10pt !important; " +
        "line-height: 105% !important; " +
        "padding: 6px 47px 6px 27px !important; " +
        "text-align: left !important; " +
        "color: black !important; " +
        "margin: 0px !important; " +
        "width: auto !important; " +
      "}\n" +
      ".sfbal_lib { " +
        "border: 0px !important; " +
        "text-align: left !important; " +
        "font-weight: bold !important; " +
        "font-size: 10pt !important; " +
        "line-height: 105% !important; " +
        "margin: 0px !important; " +
        "padding: 0px !important; " +
      "}\n" +
      ".sfbal_lib_title { " +
        "background: " + gStyles[getValue('Style', 0)].lib_title_bg_color + " !important; /* Old browsers */ " +
        "border-width: 0px 0px 1px 0px !important; " +
        "border: none !important; " +
        "color: " + gStyles[getValue('Style', 0)].lib_title_text_color + " !important; " +
        sansSerifFont +
        "font-weight: bold !important; " +
        "font-size: 10pt !important; " +
        "line-height: 105% !important; " +
        "margin: 0px !important; " +
        "padding: 5px !important; " +
        "text-align: right !important; " +
        "width: auto !important; " +
      "}\n" +
      ".sfbal_type_group { " +
        "color: #120 !important; " +
        sansSerifFont +
        "margin: 0px !important; " +
        "padding: 0px !important; " +
        "text-align: left !important; " +
        "width: auto !important; " +
        gStyles[getValue('Style', 0)].type_group_bg_css +
        "font-weight: bold !important; " +
        "font-size: 10pt !important; " +
        "line-height: 105% !important; " +
      "}\n" +
      ".sfbal_type_group_title { " +
        gStyles[getValue('Style', 0)].type_group_title_css +
        "border-bottom: 0px 0px 0px 1px solid orange !important; " +
        "color: black !important; " +
        sansSerifFont +
        "margin: 0px !important; " +
        "padding: 3px 3px !important; " +
        "text-align: left !important; " +
        "cursor: pointer !important; " +
        "width: auto !important; " +
        "font-weight: bold !important; " +
        "font-size: 10pt !important; " +
        "line-height: 105% !important; " +
      "}\n" +
      ".sfbal_book { " +
        "display: block !important; " +
        "text-align: left !important; " +
        sansSerifFont +
        gStyles[getValue('Style', 0)].book_bg_css +
        "padding: 3px 3px !important; " +
        "margin: 0px !important; " +
        "border: none !important; " +
        "width: auto !important; " +
        "color: #120 !important; " +
        "font-weight: bold !important; " +
        "font-size: 10pt !important; " +
        "line-height: 105% !important; " +
      "}\n" +
      ".mini_button { " +
          "margin: 0 0 0 0 !important; " +
          "position: absolute !important; " +
          "top: 5px !important; " +
          "border: none !important; " +
          "cursor: pointer !important; " +
          "vertical-align: middle !important; " +
      "}");
  } catch (e18) {
    log(e18);
    if (getValue('DEVELOPER', false)) {
      unsafeWindow.confirm(e18);
    }
    return;
  }
})();
// vim: set et fdm=indent fenc=utf-8 ff=unix ft=javascript sts=0 sw=2 ts=2 nowrap :