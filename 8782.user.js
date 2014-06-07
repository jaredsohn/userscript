// ==UserScript==
// @name           Google Reader - Colorful List View
// @namespace      http://google.reader.colorful.list.view/kepp
// @include        http://www.google.com/reader/*
// @include        https://www.google.com/reader/*
// @include        http://www.google.tld/reader/*
// @include        https://www.google.tld/reader/*
// @include        http://userscripts.org/scripts/source/8782.meta.js
// @description    Colors items in Google Reader.
// @author         kepp
// @updateURL      http://userscripts.org/scripts/source/8782.meta.js
// @version        20111209
// ==/UserScript==


/**
 * 2011-12-22
 * Quick fix to for Google+ share window been hidden. Thanks norti.
 **
 * 2011-12-09
 * Correct dates in change log.
 * Removed jsversion metadata as not useful/inaccurate.
 * Limit saturation and lightness ranges to better match previous color scheme.
 *  Quick fix. Future release will make the colors user adjustable.
 * Additional fixes for Google Reader style update.
 *  Seems additional changes were rolled out after my last update.
 * - Removed option to color entry frames. Needs rework with new styling.
 * - Use box-shadow to emphasize currently selected entry. Want to change
 *   background color to do this, but not feasible at this point.
 **
 * 2011-11-05
 * Remove JSLint config sections and other testing leftovers.
 * Remove $id shortcut function. Inline function.
 * Remove $x shortcut function. Replace with getElementById/ClassName.
 * Remove $xa shortcut function. Replace with getElementsByClassName NodeList.
 * Change test for undefined to use "void 0".
 * Change base css from global variable to theme controller object property.
 * Reorgaize storage code and change tests for GM and DOM Storage.
 * Update string property names to be more consistent, maybe.
 * Use strict equality operators for everything.
 * Use stricter version parsing regular expression in updater.
 * Don't run in sharing bookmarklet popup iframe.
 * Simplify hue calculation process.
 * Clean up rgb color parsing.
 * Simplify hsl color calculation.
 * Move script info from global variable to property of updater.
 * Use decode/encodeURIComponent instead of un/escape for cookies.
 * Declare variables at top of scope and use single var statement.
 * Better date formatting in change log.
 * Disabled updater code until better solution is found.
 * Remove Comment View/Google Buzz support.
 * Fix for Google Reader style update.
 * - New id for element we're sampling to try and match page theme.
 * - Adjusted script for greater entry heights.
 * - Removed image replacement for link to external article.
 * - Added semi-transparent card actions background.
 * - Removed unused CSS.
 **
 * 2011-02-16
 * Update for Greasemonkey 9.0 compatibility
 **
 * 2010-02-26
 * Fix for updates not showing.
 * Substituted custom image for those used to link to the original article.
 * Consolidated where styles are inserted.
 * Added some theme support (attempts to match header colors).
 * Misc changes to code to validate on JSLint.
 * Removed jsversion metadata from header as not useful.
 * Added option to color "Comment view".
 * Fix for incorrect pref display in Google Chrome.
 **
 * 2009-11-22
 * Fix for breakage on expanded view.
 * CSS modified to increase selector priority to ensure colors get applied.
 **
 * 2009-11-20
 * Fix pref settings when DOM Storage is used.
 * Fix for GM_getValue detection on Google Chrome dev channel.
 * Fix for not working after encountering a shared item. Script also works on
 *  the "Your stuff", Shared Items and Notes pages with this.
 * Switch code bracing style.
 **
 * 2009-11-17
 * Added prefs to select what is colored in expanded view, entry body or
 *  outline.
 * Fix for update version check being in the wrong direction.
 * Fix for coloring unread items only in list view.
 * Added Google Chrome support.
 **
 * 2009-08-21
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
 * 2008-12-14
 * Prefs split out into independent items and updated to apply instantly.
 *  Pref notification messages are also fixed to work properly.
 * Fix for script not working if Google Gears was installed (my bad design).
 * Works on expanded view too now. Possible/easier with Google Reader now using
 *  CSS for rounded borders.
 **
 * 2008-12-04
 * Added settings for coloring read/unread items.
 * Adjusted things in the settings.
 **
 * 2008-07-30
 * Fixed css mistake of read items not being colored.
 * Added https:// url to the include list.
 * Added coloring option on settings page, added settings page to the exclude
 *   list.
 **/

( function() {

  var STRINGS = {
    // pref labels
    colorLbl:   "Color these items:",
    lvLbl:      "List view headers.",
    evLbl:      "Expanded view entry bodies.",
    // efLbl:      "Expanded view entry frames.",
    // cvLbl:      "Comment view entries.",
    riLbl:      "Read items.",
    uiLbl:      "Unread items.",
    updateLbl:  "Userscript Update Available",
    installLbl: "Install",

    // pref messages
    setMsg:     "will",
    unsetMsg:   "will not",
    colorMsg:   " be colored.",
    lvMsg:      "List view items ",
    evMsg:      "Expanded view entry bodies ",
    // efMsg:      "Expanded view entry frames ",
    // cvMsg:      "Comment view items ",
    uiMsg:      "Unread items ",
    riMsg:      "Read items ",
    udMsg:      "Undefined",
  },

  storage = null,
  updater = null,
  settings = null,
  theme = null;


//=============================================================================


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
  // use cookies by default and override with GM_* or localStorage if available
  storage = {
    cookie: {},

    init: function() { // initialize methods for data storage access
      var pairs, cookie;

      if ( this.testGMStorage() || this.testDOMStorage() ) {
        return;
      }

      pairs = {};
      cookie = decodeURIComponent( document.cookie );
      if ( /gm-color=([\w-:]+);/.test( cookie ) ) {
        cookie = RegExp.$1;

        cookie.split( "/" ).forEach( function( pair ) {
          var set = pair.split( ":" );
          pairs[ set[ 0 ] ] = set[ 1 ];
        } );
      }

      this.cookie = pairs;
    },

    testGMStorage: function() {

      // test for existance of GM_setValue and GM_getValue
      // Google Chrome stubs these functions with 'not supported' messages
      if ( typeof GM_getValue === "function" &&
           typeof GM_setValue === "function" ) {
        GM_setValue( "test", "test value" );

        if ( GM_getValue( "test" ) === "test value" ) {
          if ( typeof GM_deleteValue === "function" ) {
            GM_deleteValue( "test" );
          }
          this.getItem = GM_getValue;
          this.setItem = GM_setValue;
          return true;
        }
      }

    },

    testDOMStorage: function() {

      // Google Chrome gives null for localStorage if not enabled,
      // Opera gives undefined
      // http://www.w3.org/TR/webstorage/#the-storage-interface
      if ( localStorage !== void 0 && localStorage !== null ) {

        this.getItem = function( key, def ) {
          var value = localStorage.getItem( key );
          return ( value === null ) ? def : value;
        };

        this.setItem = function( key, value ) {
          localStorage.setItem( key, value );
        };
        return;
      }
    },

    getItem: function( name, def ) {
      var cookieVal = this.cookie[ name ];
      return cookieVal === void 0 ? def : cookieVal;
    },

    setItem: function( name, value ) {
      var strCookie = "gm-color=",
          future = new Date( ( new Date().getTime() + 10*365*24*60*60*1000 ) ),
          prop = "";

      this.cookie[ name ] = value;

      for ( prop in this.cookie ) {
        strCookie += prop + ":" + this.cookie[ prop ] + "/";
      }

      strCookie += ";path=/reader;expires=" + future.toGMTString();

      document.cookie = encodeURIComponent( strCookie );
    }
  };

  // script updater
  updater = {
    loader: null,

    // info used to check for script updates
    scriptInfo: {
      version:    "20110216",
      date:       "Wed, 16 Feb 2011 19:07:18 GMT",
      updateUrl:  "http://userscripts.org/scripts/source/8782.meta.js",
      installUrl: "http://userscripts.org/scripts/source/8782.user.js"
    },

    init: function() {
      var loader;

      // test if this is the script meta info page that loaded
      if ( location.href === this.scriptInfo.updateUrl ) {
        // running on userscripts.org domain

        document.body.setAttribute( "style",
                                    "visibility: hidden; overflow: hidden;" );

        // check if there is an update
        this.parseMetaInfo( this.scriptInfo.installUrl );
        return true; // notify that this was the script meta page
      }

      loader = document.createElement( "iframe" );
      loader.setAttribute( "style", "position: absolute;" +
                                    "height: 0; width: 0;" );
      loader.addEventListener( "load", this.showUpdate, false );

      this.loader = document.body.appendChild( loader );
      return false;
    },

    parseMetaInfo: function( url ) {
      var metaInfo = document.body.innerHTML,
          hasUpdate = false;

      // compare script versions
      if ( /@version\s*([\S]+)/.test( metaInfo ) ) {
        hasUpdate = this.scriptInfo.version < RegExp.$1;

      // compare script dates
      } else if ( /@uso:timestamp\s*(\S[\da-zA-Z,:;+ ]+)/.test( metaInfo ) ) {
        hasUpdate = new Date( this.scriptInfo.date ) < new Date( RegExp.$1 );
      }

      if ( hasUpdate ) {
        location.href = "data:text/html," +
          "<style>body{ visibility: visible; overflow: hidden;" +
          "font-family: Arial, sans-serif; color: #2244BB; }</style>" +
          STRINGS.updateLbl + ": <a href=\"" + url + "\" target=\"_blank\">" +
          STRINGS.installLbl + "</a>";
      }
    },

    check: function() { // runs on google.com domain
      // var lastCheck = storage.getItem( "last-check", 0 );
      // if ( new Date().getTime() - lastCheck < 3*24*60*60*1000 ) { // 3 days
        // return false;
      // }

      this.loader.src = this.scriptInfo.updateUrl;

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
  settings = {
    timeoutID: 0,
    entries: null,

    init: function() { // insert page color options into the settings page
      var section = this.addPrefs(),
          check = false;

      // ascend out of iframe
      this.entries = frameElement.ownerDocument.getElementById( "entries" );

      // check for userscript updates
      // comment this section out if you want to disable update checks
      // check = updater.check();
      // if ( check ) {
      //  section.insertBefore( check, section.firstChild );
      // }
    },

    addPrefs: function() {
      var sect = document.createElement( "div" ),
          lists, list1, list2,
          tc = bind( this.toggleColors, this );

      sect.className = "extra";

      // two column list
      sect.innerHTML = "<div class=\"extra-header\">Colors</div>" +
                       STRINGS.colorLbl + "<div style=\"width: 30em;" +
                                             "margin: 0pt 0pt 1em 1em;\">" +
                       "<ul style=\"list-style-type: none; padding-left: 0;" +
                            "float: right;\">" +
                       "</ul>" +
                       "<ul style=\"list-style-type: none;" +
                            "padding-left: 0;\">" +
                       "</ul></div>";
      lists = sect.getElementsByTagName( "ul" );
      list1 = lists[ 1 ];
      list2 = lists[ 0 ];

      document.getElementById( "setting-extras-body" ).appendChild( sect );

      this.addColorPref( list2, "gm-color-ri", STRINGS.riLbl, tc );
      this.addColorPref( list2, "gm-color-ui", STRINGS.uiLbl, tc );
      this.addColorPref( list1, "gm-color-lv", STRINGS.lvLbl, tc );
      this.addColorPref( list1, "gm-color-ev", STRINGS.evLbl, tc );
      // this.addColorPref( list1, "gm-color-ef", STRINGS.efLbl, tc, 0 );
      // this.addColorPref( list1, "gm-color-cv", STRINGS.cvLbl, tc, 0 );

      return sect;
    },

    addColorPref: function ( list, id, text, handler, def ) {
      var pref = document.createElement( "li" ),
          chk,
          selected = storage.getItem( id, def === void 0 ? 1 : def );

      pref.innerHTML = "<label><input id=\"" + id + "\" type=\"checkbox\"/>" +
                       text + "</label>";
      chk = pref.firstChild.firstChild;

      // just setting the "checked" attribute doesn't seem to work in Chrome
      // I should figure out why

      chk.checked = ( selected ) ? true : false;
      list.appendChild( pref );
      chk.addEventListener( "change", handler, false );
    },

    toggleColors: function( event ) {
      var id = event.target.id, curr = event.target.checked,
          msg = "", newPref = "", cName = "",
          re = new RegExp( id + " |^", "g" );

      if ( curr ) {
        newPref = id;
        cName = id + " ";
        msg = "<em>" + STRINGS.setMsg + "</em>";
      }
      else {
        msg = "<em>" + STRINGS.unsetMsg + "</em>";
      }

      this.entries.className = this.entries.className.replace( re, cName );
      storage.setItem( id, newPref );
      this.setMessage( id, msg );
    },

    setMessage: function( id, msg ) {
      clearTimeout( this.timeoutID );
      var inner = document.getElementById( "message-area-inner" ),
          outer = document.getElementById( "message-area-outer" ),
          type = "", newMsg = "";

      // get the message string to insert into the page
      type = ( id === "gm-color-lv" ) ? STRINGS.lvMsg :
             ( id === "gm-color-ev" ) ? STRINGS.evMsg :
             // ( id === "gm-color-ef" ) ? STRINGS.efMsg :
             ( id === "gm-color-ui" ) ? STRINGS.uiMsg :
             ( id === "gm-color-ri" ) ? STRINGS.riMsg :
             // ( id === "gm-color-cv" ) ? STRINGS.cvMsg :
             STRINGS.udMsg;

      newMsg = type + msg + STRINGS.colorMsg;
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
        if ( inner.innerHTML.toLowerCase() === newMsg.toLowerCase() ) {
          outer.className = outer.className.replace( / hidden|$/, " hidden" );
        }

      }, 7*1000 );
    },

    getColorPrefs: function() {
      var prefs = "";

      prefs += storage.getItem( "gm-color-lv", "gm-color-lv" ) + " ";
      prefs += storage.getItem( "gm-color-ev", "gm-color-ev" ) + " ";
      // prefs += storage.getItem( "gm-color-ef", "" ) + " ";
      // prefs += storage.getItem( "gm-color-cv", "" ) + " ";

      prefs += storage.getItem( "gm-color-ui", "gm-color-ui" ) + " ";
      prefs += storage.getItem( "gm-color-ri", "gm-color-ri" ) + " ";

      return prefs;
    }
  };

  // controls and applies colors
  theme = {
    colors: {}, // used to store the calculated colors
    prefs: "",  // pref settings
    bgColor: null, // theme settings
    textColor: null,
    styles: null, // dom node colorizing css will be injected into
    entries: null, // NodeList of entries in reading list

    // CSS to allow items to be colored
    baseCss: "/* css to allow colors to apply */" +
      "#entries .entry-likers, /* let colors show through */" +
      "#entries.list .collapsed .entry-source-title," +
      "#entries.list .collapsed .entry-secondary," +
      "#entries.list .collapsed .entry-title {" +
      // "#entries.comment-cards .entry-comments {" +
      "  background-color: transparent !important;" +
      "}" +
      // ".gm-color-lv .collapsed /* list view headers */ {" +
      // "#entries.gm-color-ev.gm-color-ef .card {" +
      // "#entries.comment-cards .entry .comment-entry /* comment view */ {" +
      // "  border-color: transparent !important;" +
      // "}" +
      "#entries.cards.gm-color-ev .card-actions {" +
      "  background-color: rgba( 0, 0, 0, 0.05 ) !important;" +
      "}" +
      "#entries.cards.gm-color-ev .card-bottom {" +
      "  border-color: rgba( 0, 0, 0, 0.1 ) !important;" +
      "}" +
      // "#entries.list.gm-color-lv #current-entry .collapsed {" +
      // "  border-width: 2px 0 !important;" +
      // "  border-color: #777777 !important;" + // this needs more contrast
      // "}" +
      // "#entries.list.gm-color-lv #current-entry.expanded .collapsed {" +
      // "  border-bottom-color: transparent !important;" +
      // "  border-width: 2px 0 !important;" +
      // "}" +
      "#entries.cards.gm-color-ev .card {" +
      // "#entries.cards.gm-color-ef .card {" +
      "  padding-right: 1em;" +
      "}" +
      "#entries.cards.gm-color-ev .card-bottom {" +
      "  margin-bottom: 1ex !important;" +
      "}" +
      "#current-entry {" +
      "  box-shadow: 0 0 1px 2px rgb(22, 88, 120);" +
      "  z-index: 10;" +
      "}",
      // "#entries .entry {" +
      // "  padding: 5px 0;" +
      // "}",
      // "#entries.list .collapsed {" +
      // "  line-height: 2.4ex !important; /* hide entry snippet 2nd line */" +
      // "}" +
      // "#entries .collapsed .entry-original," +
      // ".entry .entry-title .entry-title-go-to { /* article link image */" +
      // "  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4A" +
      // "AAAOBAMAAADtZjDiAAAALVBMVEX////R3fPm6/nJ1PPV3vXc5fbCz/He5fjCz/H////U3" +
      // "/Tj6fjr7/r3+f3O2fTPDCQ+AAAAB3RSTlMA71DmxK0A9H5uGAAAAFtJREFUeF41jbEJgE" +
      // "AUQx+CG1hYCm4gOICdpeACh5sIwk+jAxw3yI3iOY0I/jSBkLxANanpgFXSCLU+LfSWLWt" +
      // "gtmRJB+1VnnLvSGc8o9w9957vnPNzA2zfT3gBaL8sJRF+PgoAAAAASUVORK5CYII=')" +
      // "  no-repeat !important;" +
      // "}" +
      // ".entry .entry-title .entry-title-go-to {" +
      // "  background-position: left 3px !important;" + */
      // "}",

    init: function( chrome ) {
      var setup = this.setup, thm = this,
          set = function() {
            setup.call( thm );
            chrome.removeEventListener( "DOMNodeInserted", set, false );
          };

      addStyle( this.baseCss );
      this.styles = addStyle("/* css to color entries */");
      this.prefs = settings.getColorPrefs();

      chrome.addEventListener( "DOMNodeInserted", set, false );
    },

    setup: function() { // initial setup and toggling of settings
      var prefs = this.prefs,
          entries = document.getElementById( "entries" );
      this.initConfig(); // put this in here so theme scripts run first

      if ( entries ) {
        entries.className = prefs + entries.className;
        entries.addEventListener( "DOMNodeInserted",
                                  bind( this.process, this ), false );
        this.entries = entries.getElementsByClassName( "entry" );
      }
    },

    // determine what color theme to use by looking at the header colors
    initConfig: function() {
      var style = getComputedStyle( 
                  document.getElementById( "viewer-container" ), null ),
          bg = this.rgbToHsl( style.getPropertyValue( "background-color" ) ),
          color = this.rgbToHsl( style.getPropertyValue( "color" ) );

      // a min saturation & lightness is needed to distinguish colors.
      // for read items, a value is further subtracted from these
      this.bgColor = { hue: bg[ 0 ],
                       sat: Math.max( Math.min( bg[ 1 ], 73 ), 50 ),
                       lt: Math.max( Math.min( bg[ 2 ], 85 ), 10 ) };

      this.textColor = { hue: color[ 0 ], sat: color[ 1 ], lt: color[ 2 ] };
      this.setTextColor();
    },

    rgbToHsl: function( color ) { // calculate hsl from rgb css color string
      var hue = 0, sat = 0, lt,

          rgb = this.getRgb( color ),
          max = Math.max.apply( Math, rgb ),
          min = Math.min.apply( Math, rgb ),
          chroma = max - min,

          index = rgb.indexOf( max );

      rgb.splice( index, 1 );

      lt = ( max + min )/2;
      if ( chroma ) { // max not equal to min
        sat = ( lt > 0.5 ) ? ( chroma )/( 2 - ( max + min ) ) :
                             ( chroma )/( max + min );
        hue = 60*( ( rgb[ 0 ] - rgb[ 1 ] )/( chroma ) + index*2 );
      }

      return [ hue, sat*100, lt*100 ];
    },

    getRgb: function( color ) {
      var red, green, blue,
          hexRegExp;

      if ( /(\d+), (\d+), (\d+)/.test( color ) ) {
        return [ RegExp.$1/255, RegExp.$2/255, RegExp.$3/255 ];
      }

      // Opera returns a hex value, so convert hex to decimal
      hexRegExp = /#([A-Fa-f0-9]{2})([A-Fa-f0-9]{2})([A-Fa-f0-9]{2})/; // <-------------------------------------------------------------------- CHECKME

      if ( hexRegExp.test( color ) ) {
        red = parseInt( RegExp.$1, 16 );
        green = parseInt( RegExp.$2, 16 );
        blue = parseInt( RegExp.$3, 16 );

        return [ red/255, green/255, blue/255 ];
      }

      return [ 1, 0, 0 ];
    },

    setTextColor: function() {
      var hue = this.textColor.hue,
          sat = this.textColor.sat,
          lt = this.textColor.lt,

      // default color lightnesses:
      // bg lt: 85.3
      // color lt: 0

          // text lightnesses are set to values in the range between title text
          // and background color lightnesses
          range = this.bgColor.lt - lt,

          css = "  color: hsl(" + hue + "," + sat + "%, ";

      this.styles.textContent += ( "" +
        "#entries .collapsed .entry-title {" +
        css + lt + "% ) !important;" + // 000000 <- default color
        "}" +
        "#entries.list .collapsed .entry-main .entry-source-title {" +
        css + ( lt + range*0.42 ) + "% ) !important;" + // 555555
        "}" +
        ".entry .entry-author, .entry .entry-date {" +
        // ".entry-comments .comment-time {" +
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
      var bgColor = this.bgColor,
          styles = this.styles,
          thm = this,

         // pick up all uncolored entries, including ones missed previously
         noColor = Array.prototype.slice.apply( this.entries );
         noColor = noColor.filter(function( entry ) {
                     return !entry.hasAttribute( "colored" );
                   } );

      if ( !noColor.length ) {
        return;
      }

      noColor.forEach( function( nc ) {
        thm.setColors( styles, bgColor, nc );
      } );
    },

    setColors: function( styles, bgColor, nc ) {

      // search for a node that has 'entry-source-title' class name
      var title = nc.getElementsByClassName( "entry-source-title" )[ 0 ].
                  textContent.replace( /\W/g, "-" );

      nc.setAttribute( "colored", title );
      if ( this.colors[ title ] === void 0 ) {
        styles.textContent += this.getColorCss( title, bgColor );
      }
    },

    getColorCss: function( title, bgColor ) { // generate css to color items
      var hue = "background-color: hsl(" + this.getHue( title ),
          imp = "% ) !important;",
          sat = bgColor.sat,
          lt = bgColor.lt,

          // set direction entry lightness is modified on read/hover
          dir = ( lt > 50 ) ? 1 : -1,

          // need to clean this up
          hsl = {
            norm: hue + "," + ( sat + 7 ) + "%," + ( lt - dir*5 )+ imp,
            hover: hue + "," + ( sat + 27 ) + "%, " + lt + imp,
            read: hue + "," + ( sat - 13 ) + "%," + ( lt + dir*5 ) + imp,
            readhvr: hue + "," + ( sat + 7 ) + "%," + ( lt + dir*10 ) + imp
          };

      return this.getLvCss( title, hsl ) + this.getEvCss( title, hsl ); // +
             // this.getEfCss( title, hsl ) + this.getCvCss( title, hsl );
    },

    getLvCss: function( ttl, hsl ) { // css for coloring items in list view
      // this selector should be take priority over any other selector
      var us = "#entries.gm-color-lv.gm-color-ui div[ colored='" + ttl + "' ]",
          rs = "#entries.gm-color-lv.gm-color-ri div[ colored='" + ttl + "' ]";

      return "" +
        us + ":not( .read ) .collapsed {" + hsl.norm + "}" +
        us + ":not( .read ):hover .collapsed {" + hsl.hover + "}" +

        rs + ".read .collapsed { /* override unread item colors */" +
             hsl.read + "}" +
        rs + ".read:hover .collapsed { /* override unread item colors */ " +
             hsl.readhvr + "}" +

        "#entries.gm-color-lv.gm-color-ui:not( .gm-color-ri ) .read .collapsed," +
        "#entries.gm-color-lv.gm-color-ri:not( .gm-color-ui ) :not( .read ) .collapsed {" +
        "  /* override current entry colors */" +
        "  background-color: white !important;" +
        "}";
    },

    // css for coloring expanded view item bodies
    getEvCss: function( ttl, hsl ) {
      var us = "#entries.gm-color-ev.gm-color-ui div[ colored='" + ttl + "' ]",
          rs = "#entries.gm-color-ev.gm-color-ri div[ colored='" + ttl + "' ]";

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
    // getEfCss: function( ttl, hsl ) {
      // var us = "#entries.gm-color-ef.gm-color-ui div[ colored='" + ttl + "' ]",
          // rs = "#entries.gm-color-ef.gm-color-ri div[ colored='" + ttl + "' ]";

      // return "" +
        // us + " {" + hsl.norm + "}" +
        // us + ":hover {" + hsl.hover + "}" +
        // us + ".read," +
        // us + ".read:hover { /* force no color for read items */ " +
             // "background-color: #F3F5FC !important; }" +
        // rs + ".read { /* override unread item colors */ " +
             // hsl.read + "}" +
        // rs + ".read:hover { /* override unread item colors */ " +
             // hsl.readhvr + "}";
    // },

    // getCvCss: function( ttl, hsl ) {
      // var us = "#entries.gm-color-cv.gm-color-ui div[ colored='" + ttl + "' ]",
          // rs = "#entries.gm-color-cv.gm-color-ri div[ colored='" + ttl + "' ]";

      // comment view doesn't have read/unread
      // return  "" +
        // us + " .comment-entry {" + hsl.norm + "}" +
        // us + ":hover .comment-entry {" + hsl.hover + "}" +
        // us + ".read .comment-entry," +
        // us + ".read:hover .comment-entry { /* force no color for read items */ " +
             // "background-color: white !important; }" +
        // rs + ".read .comment-entry { /* override unread item colors */ " +
             // hsl.read + "}" +
        // rs + ".read:hover .comment-entry { /* override unread item colors */ " +
             // hsl.readhvr + "}";
    // },

    getHue: function( title ) { // calculate item hue
      var hue = 0,
          i = 0, cc = 0;

      for ( i = 0; cc = title.charCodeAt( i ); i++ ) {
        hue += cc;
      }
      hue %= 360;

      this.colors[ title ] = hue;
      return hue;
    }
  };


//=============================================================================


  ( function() {
    var chrome = document.getElementById( "chrome" );

    // test if this is a google reader sharing bookmarklet popup
    if ( location.href.search( "link-frame" ) >= 0 ) {
      return;
    }

    storage.init();

    if ( chrome ) {
      theme.init( chrome ); // watch for the loading of feed entries
    }

    else { // settings and script meta info page have no "chrome" element
      // if ( updater.init() ) { // script meta info page
      //   return;
      // }

      settings.init();
    }

  }() );

}() );
