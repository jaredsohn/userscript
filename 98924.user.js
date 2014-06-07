// ==UserScript==
// @name           Google Reader - Colorful List View
// @namespace      http://google.reader.colorful.list.view/kepp
// @include        http://www.google.com/reader/*
// @include        https://www.google.com/reader/*
// @include        http://userscripts.org/scripts/source/8782.meta.js
// @description    Colorizes the item headers in Google Reader list view and the entries in expanded view.
// @version        20100227
// ==/UserScript==
/*jslint browser: true, forin: true */
/*globals XPathResult, GM_getValue, GM_setValue, localStorage, unescape,
frameElement */

"use strict";

/**
 * TODO:
 * Grab css for entry background colors from the page.
 * Smoother insertion of update notification.
 **
 * 20100227
 * Fix for updates not showing.
 * Substituted custom image for those used to link to the original article.
 * Consolidated where styles are inserted.
 * Added some theme support (attempts to match header colors).
 * Misc changes to code to validate on JSLint.
 * Removed jsversion metadata from header as not useful.
 * Added option to color "Comment view".
 * Fix for incorrect pref display in Google Chrome.
 **
 * 20091122
 * Fix for breakage on expanded view.
 * CSS modified to increase selector priority to ensure colors get applied.
 **
 * 20091120
 * Fix pref settings when DOM Storage is used.
 * Fix for GM_getValue detection on Google Chrome dev channel.
 * Fix for not working after encountering a shared item. Script also works on
 *  the "Your stuff", Shared Items and Notes pages with this.
 * Switch code bracing style.
 **
 * 20091117
 * Added prefs to select what is colored in expanded view, entry body or
 *  outline.
 * Fix for update version check being in the wrong direction.
 * Fix for coloring unread items only in list view.
 * Added Google Chrome support.
 **
 * 20090822
 * Fix to ensure that all items get colored.
 * Fixes for Google Reader update.
 * Added script update notification to the settings page.
 * Added Opera compatibility.
 * - Remove use of "for each".
 * - Add alternatives to GM_ functions (GM_addStyle, GM_setValue, GM_getValue).
 * - Modify coloring CSS.
 * Cleaned up some code.
 * Also added DOM Storage fallback option.
 * *
 * 20081214
 * Prefs split out into independent items and updated to apply instantly.
 *  Pref notification messages are also fixed to work properly.
 * Fix for script not working if Google Gears was installed (my bad design).
 * Works on expanded view too now. Possible/easier with Google Reader now using
 *  CSS for rounded borders.
 **
 * 20081104 
 * Added settings for coloring read/unread items.
 * Adjusted things in the settings.
 **
 * 20080730
 * Fixed css mistake of read items not being colored.
 * Added https:// url to the include list.
 * Added coloring option on settings page, added settings page to the exclude
 *   list.
 **/

// var script = document.createElement("script");
// script.innerHTML = "(" + 
( function() {

  // info used to check for script updates
  var SCRIPT_INFO = {
    version:    "20100227",
    date:       "Sat, 27 Feb 2010 06:33:27 GMT",
    updateUrl:  "http://userscripts.org/scripts/source/8782.meta.js",
    installUrl: "http://userscripts.org/scripts/source/8782.user.js"
  };

  // CSS to allow items to be colored
  var BASE_CSS = "" +
    "#entries .entry-likers, /* like count */" +
    "#entries.list .collapsed .entry-source-title," +
    "#entries.list .collapsed .entry-secondary," +
    "#entries.list .collapsed .entry-title," +
    "#entries.comment-cards .entry-comments {" +
    "  background-color: transparent !important;" +
    "}" +
    ".gm-color-lv .collapsed, /* list view headers */" +
    "#entries.comment-cards .entry .comment-entry /* comment view */ {" +
    "  border-color: transparent !important;" +
    "}" +
    "#entries.list.gm-color-lv #current-entry .collapsed {" +
    "  border: 2px solid #8181DC !important;" +
    "}" +
    "#entries.list.gm-color-lv #current-entry.expanded .collapsed {" +
    "  border-bottom-color: transparent !important;" +
    "  border-width: 2px 0 !important;" +
    "}" +
    "#entries .entry {" +
    "  padding: 5px 0;" +
    "}" +
    "#entries.list .collapsed {" +
    "  line-height: 2.4ex !important; /* hide entry snippet 2nd line */" +
    "}" +
    "#entries .collapsed .entry-original," +
    ".entry .entry-title .entry-title-go-to { /* article link image */" +
    "  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAA" +
    "AOBAMAAADtZjDiAAAALVBMVEX////R3fPm6/nJ1PPV3vXc5fbCz/He5fjCz/H////U3/Tj6" +
    "fjr7/r3+f3O2fTPDCQ+AAAAB3RSTlMA71DmxK0A9H5uGAAAAFtJREFUeF41jbEJgEAUQx+C" +
    "G1hYCm4gOICdpeACh5sIwk+jAxw3yI3iOY0I/jSBkLxANanpgFXSCLU+LfSWLWtgtmRJB+1" +
    "VnnLvSGc8o9w9957vnPNzA2zfT3gBaL8sJRF+PgoAAAAASUVORK5CYII=')" +
    "  no-repeat !important;" +
    "}" +
    ".entry .entry-title .entry-title-go-to {" +
    "  background-position: left 3px !important;" +
    "}";

  var STRINGS = {
    // pref labels
    color:       "Color these items:",
    list:        "List view headers.",
    expanded:    "Expanded view entry bodies.",
    frame:       "Expanded view entry frames.",
    comment:     "Comment view entries.",
    read:        "Read items.",
    unread:      "Unread items.",

    // pref messages
    msgWill:     "will",
    msgWillNot:  "will not",
    msgColored:  " be colored.",
    msgList:     "List view items ",
    msgExpanded: "Expanded view entry bodies ",
    msgFrame:    "Expanded view entry frames ",
    msgComment:  "Comment view items ",
    msgUnread:   "Unread items ",
    msgRead:     "Read items ",
    msgUndef:    "Undefined",
    
    update:      "Userscript Update Available",
    install:     "Install"
  };


//=============================================================================


  function $id( id ) {
    return document.getElementById( id );
  }

  function $x( query, context ) {
    var doc = ( context ) ? context.ownerDocument : document;
    return doc.evaluate( query, ( context || doc ), null, 
           XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
  }

  function $xa( query ) {
    var res = document.evaluate( query, document, null,
              XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null );
    var element, array = [];
    while ( ( element = res.iterateNext() ) ) {
      array.push( element );
    }

    return array;
  }

  function addStyle( css ) {
    var style = document.createElement( "style" );
    style.type = "text/css";
    style.textContent = css; // innerHTML throws NO_MODIFICATION_ALLOWED_ERR
    document.getElementsByTagName( "head" )[0].appendChild( style );
    return style;
  }
  
  function bind( func, thisArg ) {
    var args = Array.prototype.slice.call( arguments, 2 );

    return function() {
      var bargs = args.concat( Array.prototype.slice.call( arguments ) );
      func.apply( thisArg, bargs );
    };
  }


//=============================================================================


  // provide local data storage
  var storage = {
    cookie: {},

    init: function() { // initialize methods for data storage access
      // Google Chrome dev channel stubs GM_ functions with error messages
      // test it's the real deal by looking for "arguments"
      if ( typeof GM_getValue != "undefined" &&
           (/arguments/).test( GM_getValue.toString() ) ) {
        this.getItem = GM_getValue;
        this.setItem = GM_setValue;
        return;
      }

      // Google Chrome gives null for localStorage if not enabled,
      // Opera gives undefined
      // http://www.w3.org/TR/webstorage/#the-storage-interface
      if ( typeof localStorage != "undefined" && localStorage !== null ) {

        this.getItem = function( key, def ) {
          var value = localStorage.getItem( key );
          return ( value === null ) ? def : value;
        };

        this.setItem = function( key, value ) {
          localStorage.setItem( key, value );
        };
        return;
      }

      var pairs = {};
      if ( /gm-color=([^;]*)/.test( unescape( document.cookie ) ) ) {
        var cookie = RegExp.$1;

        cookie.split( "/" ).forEach( function( pair ) {
          var set = pair.split( ":" );
          pairs[ set[ 0 ] ] = set[ 1 ];
        } );
      }

      this.cookie = pairs;
    },

    getItem: function( name, def ) {
      var cookieVal = this.cookie[ name ];
      return ( typeof cookieVal == "undefined" ) ? def : cookieVal;
    },

    setItem: function( name, value ) {
      this.cookie[ name ] = value;
      var strCookie = "gm-color=";

      for ( var prop in this.cookie ) {
        strCookie += prop + ":" + this.cookie[ prop ] + "/";
      }

      var future = new Date( ( new Date().getTime() + 10*365*24*60*60*1000 ) );
      strCookie += ";path=/reader;expires=" + future.toGMTString();

      document.cookie = strCookie;
    }
  };

  // script updater
  var updater = {
    loader: null,
    version: 0,
    homeUrl: "",
    updateUrl: "",
    installUrl: "",

    init: function() {
      for ( var prop in SCRIPT_INFO ) {
        this[ prop ] = SCRIPT_INFO[ prop ];
      }

      // test if this is the script meta info page that loaded
      if ( location.href == SCRIPT_INFO.updateUrl ) {
        // running on userscripts.org domain

        document.body.setAttribute( "style",
                                    "visibility: hidden; overflow: hidden;" );
        this.parseMetaInfo( this.installUrl ); // check if there is an update
        return true; // notify that this was the script meta page
      }

      var loader = document.createElement( "iframe" );
      loader.setAttribute( "style", "position: absolute;" +
                                    "height: 0; width: 0;" );
      loader.addEventListener( "load", this.showUpdate, false );

      this.loader = document.body.appendChild( loader );
      return false;
    },

    parseMetaInfo: function( url ) {
      var scriptInfo = document.body.innerHTML;
      var updateAvailable;

      // compare script versions
      if ( /@version\s*([\S]+)/.test( scriptInfo ) ) {
        updateAvailable = this.version < RegExp.$1;

      // compare script dates
      } else if ( /@uso:timestamp\s*(\S.+)/.test( scriptInfo ) ) {
        updateAvailable = new Date( this.date ) < new Date( RegExp.$1 );
      }

      if ( updateAvailable ) {
        location.href = "data:text/html," +
          "<style>body{ visibility: visible; overflow: hidden;" +
          "font-family: Arial, sans-serif; color: #2244BB; }</style>" +
          STRINGS.update + ": <a href=\"" + url + "\" target=\"_blank\">" +
          STRINGS.install + "</a>";
      }
    },

    check: function() { // runs on google.com domain
      // var lastCheck = storage.getItem( "last-check", 0 );
      // if ( new Date().getTime() - lastCheck < 3*24*60*60*1000 ) { // 3 days
        // return false;
      // }

      this.loader.src = this.updateUrl;

      // just check it every time the settings page is opened
      // storage.setItem( "last-check", new Date().getTime() + "" );
      return this.loader;
    },

    showUpdate: function( event ) {
      event.target.setAttribute( "style", "visibility: visible;" +
                                          "overflow: hidden;" +
                                          "position: absolute; right: 2em;" +
                                          "height: 2em; width: 20em;" );
    }
  };

  // user interface for script settings added on settings page
  var settings = {
    timeoutID: 0,
    entries: null,

    init: function() { // insert page color options into the settings page
      // ascend out of iframe
      this.entries = frameElement.ownerDocument.getElementById( "entries" );

      var sect = this.addPrefs();

      // check for userscript updates
      // comment this section out if you want to disable update checks
      var check = updater.check();
      if ( check ) {
        sect.insertBefore( check, sect.firstChild );
      }
    },

    addPrefs: function() {
      var sect = document.createElement( "div" );
      sect.className = "extra";

      // two column list
      sect.innerHTML = "<div class=\"extra-header\">Colors</div>" +
                       STRINGS.color + "<div style=\"width: 30em;" +
                                             "margin: 0pt 0pt 1em 1em;\">" +
                       "<ul style=\"list-style-type: none; padding-left: 0;" +
                            "float: right;\">" +
                       "</ul>" +
                       "<ul style=\"list-style-type: none;" +
                            "padding-left: 0;\">" +
                       "</ul></div>";

      $id( "setting-extras-body" ).appendChild( sect );

      var lists = sect.getElementsByTagName( "ul" );
      var list1 = lists[ 1 ], list2 = lists[ 0 ];

      var tc = bind( this.toggleColors, this );

      this.addColorPref( list2, "gm-color-ri", STRINGS.read, tc );
      this.addColorPref( list2, "gm-color-ui", STRINGS.unread, tc );
      this.addColorPref( list1, "gm-color-lv", STRINGS.list, tc );
      this.addColorPref( list1, "gm-color-ev", STRINGS.expanded, tc );
      this.addColorPref( list1, "gm-color-ef", STRINGS.frame, tc, 0 );
      this.addColorPref( list1, "gm-color-cv", STRINGS.comment, tc, 0 );

      return sect;
    },

    addColorPref: function ( list, id, text, handler, def ) {
      var pref = document.createElement( "li" );
      var selected = storage.getItem( id, ( typeof def == "undefined" ) ?
                                          1 : def );
      pref.innerHTML = "<label><input id=\"" + id + "\" type=\"checkbox\"/>" +
                       text + "</label>";

      // just setting the "checked" attribute doesn't seem to work in Chrome
      // I should figure out why later
      var chk = pref.firstChild.firstChild;
      chk.checked = ( selected ) ? true : false;
      list.appendChild( pref );
      chk.addEventListener( "change", handler, false );
    },

    toggleColors: function( event ) {
      var id = event.target.id, curr = event.target.checked;
      var msg, newPref = "", cName = "";

      if ( curr ) {
        newPref = id;
        cName = id + " ";
        msg = "<em>" + STRINGS.msgWill + "</em>";
      }
      else {
        msg = "<em>" + STRINGS.msgWillNot + "</em>";
      }

      var re = new RegExp( id + " |^", "g" );
      this.entries.className = this.entries.className.replace( re, cName );
      storage.setItem( id, newPref );
      this.setMessage( id, msg );
    },

    setMessage: function( id, msg ) {
      clearTimeout( this.timeoutID );
      var inner = $x( "id( 'message-area-inner' )" );
      var outer = $x( "id( 'message-area-outer' )" );

      // get the message string to insert into the page
      var type = ( id == "gm-color-lv" ) ? STRINGS.msgList :
                 ( id == "gm-color-ev" ) ? STRINGS.msgExpanded :
                 ( id == "gm-color-ef" ) ? STRINGS.msgFrame :
                 ( id == "gm-color-ui" ) ? STRINGS.msgUnread :
                 ( id == "gm-color-ri" ) ? STRINGS.msgRead : 
                 ( id == "gm-color-cv" ) ? STRINGS.msgComment :
                 STRINGS.msgUndef;

      var newMsg = type + msg + STRINGS.msgColored; 
      inner.innerHTML = newMsg; // set the message
      
      // force display and set position and width
      outer.setAttribute( "style", "display: block !important;" +
                          "margin-left:" +
                          Math.round( inner.offsetWidth/-2 ) + "px;" +
                          "width:" + (inner.offsetWidth + 10) + "px;" );
      outer.className = "message-area info-message";

      this.timeoutID = setTimeout( function() {
        outer.style.display = "";

        // test if the same message is still showing.
        // force lowercase to handle any (tag name) capitalization change
        if ( inner.innerHTML.toLowerCase() == newMsg.toLowerCase() ) {
          outer.className = outer.className.replace( / hidden|$/, " hidden" );
        }

      }, 7*1000 );
    },

    getColorPrefs: function() {
      var prefs = "";

      prefs += storage.getItem( "gm-color-lv", "gm-color-lv" ) + " ";
      prefs += storage.getItem( "gm-color-ev", "gm-color-ev" ) + " ";
      prefs += storage.getItem( "gm-color-ef", "" ) + " ";
      prefs += storage.getItem( "gm-color-cv", "" ) + " ";

      prefs += storage.getItem( "gm-color-ui", "gm-color-ui" ) + " ";
      prefs += storage.getItem( "gm-color-ri", "gm-color-ri" ) + " ";

      return prefs;
    }
  };

  // controls and applies colors
  var theme = {
    colors: {}, // used to store the calculated colors
    prefs: "",  // pref settings
    bgColor: null, // theme settings
    textColor: null,
    styles: null, // dom node colorizing css will be injected into

    init: function( chrome ) {
      this.styles = addStyle("/* css to color entries */");
      this.prefs = settings.getColorPrefs();

      var setup = this.setup, thm = this;
      var set = function() {
        setup.call( thm );
        chrome.removeEventListener( "DOMNodeInserted", set, false );
      };
      chrome.addEventListener( "DOMNodeInserted", set, false );
    },

    setup: function() { // initial setup and toggling of settings
      this.initConfig(); // put this in here so theme scripts run first
      var prefs = this.prefs;
      var entries = $id( "entries" );

      if ( entries ) {
        entries.className = prefs + entries.className; 
        entries.addEventListener( "DOMNodeInserted",
                                  bind( this.process, this ), false );
      }
    },

    // determine what color theme to use by looking at the header colors
    initConfig: function() {
      var header = $id("chrome-header");
      var bg = getComputedStyle( header, null)
               .getPropertyValue( "background-color" );

      bg = this.rgbToHsl( bg );

      // a min saturation & lightness is needed to distinguish colors
      // note: value is further subtracted from this for read items
      this.bgColor = { hue: bg[ 0 ],
                       sat: Math.max( bg[ 1 ], 35 ),
                       lt: Math.max( bg[ 2 ], 32 ) };

      var color = getComputedStyle( header, null ).getPropertyValue( "color" );
      color = this.rgbToHsl( color );
      this.textColor = { hue: color[ 0 ], sat: color[ 1 ], lt: color[ 2 ] };
      this.setTextColor();
    },

    rgbToHsl: function( color ) { // calculate hsl from rgb css color string
      var hue = 0, sat = 0, lt;

      var rgb = this.getRgb( color );
      var max = Math.max.apply( Math, rgb );
      var min = Math.min.apply( Math, rgb );
      var chroma = max - min;

      var index = rgb.indexOf( max );
      rgb.splice( index, 1 );

      lt = ( max + min )/2;
      if ( chroma ) {
        sat = ( lt > 0.5 ) ? ( max - min )/( 2 - ( max + min ) ) :
                             ( max - min )/( max + min );
        hue = 60*( ( rgb[ 0 ] - rgb[ 1 ] )/( max - min ) + index*2 );
      }

      return [ hue, sat*100, lt*100 ];
    },

    getRgb: function( color ) {
      var rgb;

      if ( ( rgb = /(\d+), (\d+), (\d+)/.exec( color ) ) ) {
        rgb = rgb.slice( 1 );
        return [ rgb[ 0 ]/255, rgb[ 1 ]/255, rgb[ 2 ]/255 ];
      }

      // Opera return a hex value, so convert hex to decimal
      if ( ( rgb = /#(......)/.exec( color ) ) ) {
        rgb = parseInt( rgb[ 1 ], 16 );
        var red = rgb >> 16;
        var grn = ( rgb - ( red << 16 ) ) >> 8;
        var blu = rgb - ( red << 16 ) - ( grn << 8 );
        return [ red/255, grn/255, blu/255 ];
      }

      return [ 1, 0, 0 ];
    },

    setTextColor: function() {
      var hue = this.textColor.hue;
      var sat = this.textColor.sat;
      var lt = this.textColor.lt;

      // default color lightnesses:
      // bg lt: 85.3
      // color lt: 0

      // text lightnesses are set to values in the range between title text and
      // background color lightnesses
      var range = this.bgColor.lt - lt;

      var css = "  color: hsl(" + hue + "," + sat + "%, ";
      this.styles.textContent += ( "" +
        "#entries .collapsed .entry-title {" +
        css + lt + "% ) !important;" + // 000000 <- default color
        "}" + 
        "#entries.list .collapsed .entry-main .entry-source-title {" +
        css + ( lt + range*0.42 ) + "% ) !important;" + // 555555
        "}" + 
        ".entry .entry-author," +
        ".entry-comments .comment-time, .entry .entry-date {" +
        css + ( lt + range*0.50 ) + "% ) !important;" + // 666666
        "}" + 
        "#entries.list .collapsed .entry-secondary {" +
        css + ( lt + range*0.59 ) + "% ) !important;" + // 777777
        "}" +
        // "a, a:visited, .link {" + // shouldn't need to mess with link color
        // css + lt + "% ) !important;" + // 2244BB
        // "}" + 
        "#entries .item-body {" + 
        css + lt + "% ) !important;" + // 000000
        "}" );
    },

    // inject color css into the page
    process: function() {
      var bgColor = this.bgColor;
      var styles = this.styles;
      var thm = this;

      // pick up all uncolored entries, including ones missed previously
      var nocolor = $xa( "id( 'entries' )/div[ contains( @class, 'entry' ) ]" +
                         "[ not( @colored ) ]" );

      if ( !nocolor.length ) {
        return;
      }

      nocolor.forEach( function( nc ) {
        thm.setColor( styles, bgColor, nc );
      } );
    },

    setColor: function( styles, bgColor, nc ) {

      // source in header is: "<a>" for expanded/comment view
      //                      "<span>" for list view
      // if "Shared by [xxx]" is there this will grab that
      // search for a node that has 'entry-source-title' class name
      var src = $x( ".//*[ contains(" +
                    "concat( ' ', normalize-space( @class ), ' ')," +
                    "' entry-source-title ' ) ]", nc );
      src = src.textContent.replace( /\W/g, "-" );

      nc.setAttribute( "colored", src );
      if ( typeof this.colors[ src ] == "undefined" ) {
        styles.textContent += this.getColorCss( src, bgColor );
      }
    },

    getColorCss: function( title, bgColor ) { // generate css to color items
      var hue = this.getHue( title );
      var sat = bgColor.sat;
      var lt = bgColor.lt;

      // set direction entry lightness is modified on read/hover
      var dir = ( lt > 50 ) ? 1 : -1;

      var hsl = { 
        norm: "background-color: hsl(" +
          hue + "," + ( sat + 7 ) + "%," + ( lt - dir*5 )+ "% ) !important;",
        hover: "background-color: hsl(" +
          hue + "," + ( sat + 27 ) + "%, " + lt + "% ) !important;",
        read: "background-color: hsl(" +
          hue + "," + ( sat - 13 ) + "%," + ( lt + dir*5 ) + "% ) !important;",
        readhvr: "background-color: hsl(" +
          hue + "," + ( sat + 7 ) + "%," + ( lt + dir*10 ) + "% ) !important;"
      };

      return this.getLvCss( title, hsl ) + this.getEvCss( title, hsl ) +
             this.getEfCss( title, hsl ) + this.getCvCss( title, hsl );
    },

    getLvCss: function( ttl, hsl ) { // css for coloring items in list view
      // this selector should be take priority over any other selector
      var us = "#entries.gm-color-lv.gm-color-ui div[ colored='" + ttl + "' ]";
      var rs = "#entries.gm-color-lv.gm-color-ri div[ colored='" + ttl + "' ]";

      return "" +
        us + " .collapsed {" + hsl.norm + "}" +
        us + ":hover .collapsed {" + hsl.hover + "}" +
        us + ".read .collapsed," +
        us + ".read:hover .collapsed { /* force no color for read items */ " +
             "background-color: white !important; }" +
        rs + ".read .collapsed { /* override unread item colors */" +
             hsl.read + "}" +
        rs + ".read:hover .collapsed { /* override unread item colors */ " +
             hsl.readhvr + "}";
    },

    // css for coloring expanded view item bodies
    getEvCss: function( ttl, hsl ) {
      var us = "#entries.gm-color-ev.gm-color-ui div[ colored='" + ttl + "' ]";
      var rs = "#entries.gm-color-ev.gm-color-ri div[ colored='" + ttl + "' ]";

      return "" +
        us + " .card," +
        /* .ccard, .t2, .t3 used for Opera expanded view */
        us + " .ccard," +
        us + " .t2," +
        us + " .t3 {" + hsl.norm + "}" +

        us + ":hover .card," +
        us + ":hover .ccard," +
        us + ":hover .t2," +
        us + ":hover .t3 {" + hsl.hover + "}" +

        us + ".read .card," +
        us + ".read .ccard," +
        us + ".read .t2," +
        us + ".read .t3," +
        us + ".read:hover .card," +
        us + ".read:hover .ccard," +
        us + ".read:hover .t2," +
        us + ".read:hover .t3 { /* force no color for read items */ " +
             "background-color: white !important; }" +

        rs + ".read .card," +
        rs + ".read .ccard," +
        rs + ".read .t2," +
        rs + ".read .t3 { /* override unread item colors */ " +
             hsl.read + "}" +

        rs + ".read:hover .card," +
        rs + ".read:hover .ccard," +
        rs + ".read:hover .t2," +
        rs + ".read:hover .t3 { /* override unread item colors */ " +
             hsl.readhvr + "}";
    },

    // css for coloring expanded view item frames
    getEfCss: function( ttl, hsl ) {
      var us = "#entries.gm-color-ef.gm-color-ui div[ colored='" + ttl + "' ]";
      var rs = "#entries.gm-color-ef.gm-color-ri div[ colored='" + ttl + "' ]";

      return "" +
        us + " {" + hsl.norm + "}" +
        us + ":hover {" + hsl.hover + "}" +
        us + ".read," +
        us + ".read:hover { /* force no color for read items */ " +
             "background-color: #F3F5FC !important; }" +
        rs + ".read { /* override unread item colors */ " +
             hsl.read + "}" +
        rs + ".read:hover { /* override unread item colors */ " +
             hsl.readhvr + "}";
    },

    getCvCss: function( ttl, hsl ) {
      var us = "#entries.gm-color-cv.gm-color-ui div[ colored='" + ttl + "' ]";
      var rs = "#entries.gm-color-cv.gm-color-ri div[ colored='" + ttl + "' ]";

      // comment view doesn't have read/unread
      return  "" +
        us + " .comment-entry {" + hsl.norm + "}" +
        us + ":hover .comment-entry {" + hsl.hover + "}" +
        us + ".read .comment-entry," +
        us + ".read:hover .comment-entry { /* force no color for read items */ " +
             "background-color: white !important; }" +
        rs + ".read .comment-entry { /* override unread item colors */ " +
             hsl.read + "}" +
        rs + ".read:hover .comment-entry { /* override unread item colors */ " +
             hsl.readhvr + "}";
    },

    getHue: function( title ) { // calculate item hue
      var hue = 0;

      for ( var i = 0, ch; ( ch = title[ i ] ); i++ ) {
        hue += ch.charCodeAt( 0 );
      }
      hue %= 360;

      this.colors[ title ] = hue;
      return hue;
    }
  };


//=============================================================================


  ( function() {
    var chrome = $id( "chrome" );
    storage.init();

    if ( chrome ) {
      theme.init( chrome ); // watch for the loading of feed entries
    }

    else { // settings and script meta info page have no "chrome" element
      if ( updater.init() ) { // script meta info page
        return;
      }

      settings.init();
    }

    addStyle( BASE_CSS );
  }() );

}() );

// .toString() + ")();";

// document.body.appendChild(script);