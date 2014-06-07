// ==UserScript==
// @name           Google Reader - Colorful List View
// @namespace      http://google.reader.colorful.list.view/kepp
// @include        http://www.google.com/reader/*
// @include        https://www.google.com/reader/*
// @description    Colorizes the item headers in Google Reader list view 
// ==/UserScript==

/**
 * 20090528
 * Replaced background-color with right and left border
 *
 * 20081214
 * Prefs split out into independent items and updated to apply instantly.
 *  Pref notification messages are also fixed to work properly.
 * Fix for script not working if Google Gears was installed (my bad design).
 * Works on expanded view too now. Possible/easier with Google Reader now using
 *  CSS for rounded borders.
 *
 * 20081104 
 * Added settings for coloring read/unread items
 * Adjusted things in the settings
 *
 * 20080730
 * Fixed css mistake of read items not being colored.
 * Added https:// url to the include list
 * Added coloring option on settings page, added settings page to the exclude list
 **/


const BASE_CSS =
".gm-color-ev .card\
{\
  background-color: transparent !important;\
}\
.gm-color-lv .collapsed\
{\
  border-color: transparent !important;\
}\
#entries.list.gm-color-lv #current-entry .collapsed\
{\
  border: 2px solid #8181DC !important;\
}\
#entries.list.gm-color-ui #current-entry.expanded .collapsed\
{\
  border-bottom-color: transparent !important;\
  border-width: 2px 0 !important;\
}\
#entries .entry\
{\
  padding: 5px 0;\
}";

// used to keep track of all the calculated colors
var colors = {};

function $x( q, c )
{
  // doc = iframe contentDoc || context node's owner doc || the context node / document
  var doc = c ? ( c.contentDocument || c.ownerDocument || c ) : document;
  c = ( c && c.contentDocument ) ? c.contentDocument : c; // if c is an iframe, set c to its contentDoc element
  return doc.evaluate( q, ( c || doc ), null, 
         XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
}

function $xa( q, c )
{
  var doc = c ? ( c.contentDocument || c.ownerDocument || c ) : document;
  c = ( c && c.contentDocument ) ? c.contentDocument : c;
  var r = doc.evaluate( q, ( c || doc ), null,
          XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null );
  var e, a = [];
  while ( e = r.iterateNext() )
    a.push( e );

  return a;
}



// calculate item hue
function getHue( title )
{
    var h = 0;

    for each ( var c in title )
      h += c.charCodeAt( 0 );
    h = h % 360;

    colors[title] = h;
    return h;
}

function getColorCss( title )
{
  var hue = getHue( title );

  return "\
  .gm-color-ev.gm-color-ui div[ colored='" + title + "' ] .card,\
  .gm-color-lv.gm-color-ui div[ colored='" + title + "' ] .collapsed\
  {\
    border-left: solid 15px hsl( " + hue + ", 70%, 60% ) !important;\
	border-right: solid 15px hsl( " + hue + ", 70%, 60% ) !important;\
  }\
  .gm-color-ev.gm-color-ui div[ colored='" + title + "' ]:hover .card,\
  .gm-color-lv.gm-color-ui div[ colored='" + title + "' ]:hover .collapsed\
  {\
	border-left: solid 15px hsl( " + hue + ", 90%, 65% ) !important;\
	border-right: solid 15px hsl( " + hue + ", 90%, 65% ) !important;\
  }\
  .gm-color-ev.gm-color-ui .read[ colored='" + title + "' ] .card,\
  .gm-color-lv.gm-color-ui .read[ colored='" + title + "' ] .collapsed\
  {\
	border-left: auto ;\
	border-right: auto;/* force read items to not be colored. */\
  }\
  .gm-color-ev.gm-color-ui .read[ colored='" + title + "' ]:hover .card,\
  .gm-color-lv.gm-color-ui .read[ colored='" + title + "' ]:hover .collapsed\
  {\
	border-left: auto ;\
	border-right: auto;\ /* force read items to not be colored. */\
  }\
  .gm-color-ev.gm-color-ri div.read[ colored='" + title + "' ] .card,\
  .gm-color-lv.gm-color-ri div.read[ colored='" + title + "' ] .collapsed\
  {\
    /* color read items. overrides the unread item setting. */\
	  border-left: solid 15px hsl( " + hue + ", 50%, 70% ) !important;\
	  border-right: solid 15px hsl( " + hue + ", 50%, 70% ) !important;\
  }\
  .gm-color-ev.gm-color-ri div[ colored='" + title + "' ].read:hover .card,\
  .gm-color-lv.gm-color-ri div.read[ colored='" + title + "' ]:hover\
    .collapsed\
  {\
    /* color read items. overrides the unread item setting. */\
	  border-left: solid 15px hsl( " + hue + ", 70%, 75% ) !important;\
	  border-right: solid 15px hsl( " + hue + ", 70%, 75% ) !important;\
  }"
}

// inject color css into the page
function setColor( entries )
{
  var uncolored = $x( "id( 'entries' )/" +
                  "div[contains( @class,'entry' )][not( @colored )]" );
  if ( !uncolored )
    return;

  var title = $x( ".//*[contains( @class,'entry-source-title' )][not( * )]",
              uncolored ).textContent.replace( /\W/g, "-" );

  uncolored.setAttribute( "colored", title );

  if ( colors[title] == undefined )
    GM_addStyle( getColorCss( title ) );
}


var settings = 
{
  toID: 0,
  entries: null,

  init: function() // insert page color options into the settings page
  {
    this.entries = $x( "id('entries')", frameElement.ownerDocument );
    var extras = $x( "id( 'setting-extras-body' )" );
    var e = document.createElement( "div" );
    e.className = "extra";

    e.innerHTML = "<div class=\"extra-header\">Colors</div>";
    extras.appendChild( e );

    this.addPref( e, "gm-color-lv",
                    "Color items when browsing in list view." );
    this.addPref( e, "gm-color-ev", 
                    "Color items when browsing in expanded view." );
    this.addPref( e, "gm-color-ri", 
                    "Color items that have been marked as read." );
    this.addPref( e, "gm-color-ui",
                    "Color items that are unread." );
  },

  addPref: function ( e, id, text ) // create and insert setting
  {
    var label = document.createElement( "label" );
    label.innerHTML = "<input id=\"" + id + "\" type=\"checkbox\" " +
                      ( GM_getValue( id, id + " " ) ? "checked=\"on\"" : "" ) +
                      "\"/>" + text;
    e.appendChild( label );
    e.appendChild( document.createElement( "br" ) );

    var self = this;
    label.firstChild.addEventListener( "change", function( e )
    {
      self.toggleColors( e )
    }, false );
  },

  toggleColors: function( e )
  {
    var id = e.target.id;
    var pref = GM_getValue( id, id + " " );

    var msg, newPref = "", cn = "";
    if ( !pref )
    {
      newPref = id + " ";
      cn = newPref;
      msg = "<em>will</em>";
    }
    else
    {
      msg = "<em>will not</em>";
    }

    var re = new RegExp( id + " |^", "g" );
    this.entries.className = this.entries.className.replace( re, cn );
    GM_setValue( id, newPref );
    this.setMessage( id, msg );
  },

  setMessage: function( id, msg )
  {
    clearTimeout( this.toID );
    var ma = $x( "id( 'message-area-inner' )" );
    var mo = $x( "id( 'message-area-outer' )" );

    // get the message string to insert into the page
    var type = ( id == "gm-color-lv" ) ? "List view items " :
               ( id == "gm-color-ev" ) ? "Expanded view items " :
               ( id == "gm-color-ui" ) ? "Unread items " :
               ( id == "gm-color-ri" ) ? "Read items " : "unknown";

    ma.innerHTML = type + msg + " be colored.";

    // make the message area visible, overriding the built in method
    mo.setAttribute( "style", "display: block !important" ); // override
    mo.className = "info-message"; // this is the built in method

    this.toID = setTimeout( function()
    {
      mo.removeAttribute( "style" );
      if ( ma.innerHTML == type + msg + " be colored." )
      {
        mo.className = mo.className.replace( / hidden|$/, " hidden" );
      }
    }, 7*1000 );
  },

  getColorPrefs: function()
  {
    var prefs = "";

    prefs += GM_getValue( "gm-color-lv", "gm-color-lv " );
    prefs += GM_getValue( "gm-color-ev", "gm-color-ev " );
    prefs += GM_getValue( "gm-color-ui", "gm-color-ui " );
    prefs += GM_getValue( "gm-color-ri", "gm-color-ri " );

    return prefs;
  }
};



function watchLoading( chrome )
{
  // pull this out here so context GM functions are called from is ok
  var prefs = settings.getColorPrefs();

  function setup( e )
  {
    var entries = $x( "id( 'entries' )" );
    if ( entries )
    {
      chrome.removeEventListener( "DOMNodeInserted", setup, false );

      // initial setup and toggling of settings
      entries.className = prefs + entries.className; 
      GM_addStyle( BASE_CSS );
      entries.addEventListener( "DOMNodeInserted", setColor, false );
    }
  }

  chrome.addEventListener( "DOMNodeInserted", setup, false );
}

(function()
{
  var chrome = $x( "id( 'chrome' )" );

  if ( chrome )
    watchLoading( chrome ); // watch for the loading of rss entries
  else
    settings.init(); // add settings to the settings page

})();