// ==UserScript==
// @name           Google Reader - Collapse Expanded View
// @namespace      http://google.reader.collapse.expanded.view/kepp
// @description    Allows you to toggle the expanded view into a collapsed state
// @include        http://www.google.com/reader/view/*
// @include        https://www.google.com/reader/view/*
// ==/UserScript==

/**
 * TODO:
 *  10/9/2010 - Got rid of E4X multi-line CSS string
 *
 **/

function $x( query, context )
{
  return document.evaluate( query, ( context || document ), null, 
         XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
}

function $xs( query )
{
  return document.evaluate( query, document, null,
         XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
}

function simulateClick( el )
{
  var evt = document.createEvent( "MouseEvents" );
  evt.initMouseEvent( "click", true, true, window,
    0, 0, 0, 0, 0, false, false, false, false, 0, null );
  return el.dispatchEvent( evt );
}

 
function addCss()
{
  GM_addStyle("\
    /* hide entry actions (bottom row) if entry is collapsed  */\
    .gm-collapsed .card-actions,\
    .gm-collapsed .card-comments\
    {\
      display: none;\
    }\
    .gm-collapsed *[gm-expanded] .card-actions,\
    .gm-collapsed *[gm-expanded] .card-comments\
    {\
      display: block;\
    }\
    /* remove spacing between entries, and shrink entry size */\
    .gm-collapsed .cards .entry,\
    .gm-collapsed .card-content\
    {\
      padding: 0 !important;\
    }\
    /* add divider between entries */\
    .gm-collapsed .cards .entry\
    {\
      border-bottom: 1px solid #888888;\
    }\
    /* kill left/right margins, allow entry to expand to fit entire width */\
    .gm-collapsed .card-common\
    {\
      margin: 0;\
    }\
    .gm-collapsed .entry .card\
    {\
      -moz-border-radius: 0;\
      border: 0;\
      /* can't set border here since it offsets the card-actions\
      border: 2px solid transparent;\
      */\
    }\
    /* align elements in the collapsed entry header */\
    /* put source title after star */\
    .gm-collapsed .cards .entry-source-title\
    {\
      color: #555555;\
      position: absolute;\
      top: 0.35em;\
      left: 1.9em;\
      padding-left: 0.1em;\
      max-width: 12em;\
      font-size: 1em !important;\
      overflow: hidden;\
      white-space: nowrap;\
    }\
    /* move entry title to the right */\
    .gm-collapsed .cards .entry-title\
    {\
      overflow: hidden;\
      font-size: 1em !important;\
      margin: 0.35em 0 0 13.4em;\
      white-space: nowrap;\
    }\
    /* move link to original page to the right side */\
    .gm-collapsed .cards .entry-title-go-to\
    {\
      position: absolute;\
      top: 0.25em;\
      right: 0.6em;\
    }\
    /* shift date to the left to make space for original article link */\
    .gm-collapsed .cards .entry-date\
    {\
      margin: 0.35em 1.7em 0 0 !important;\
    }\
    /* position star */\
    .gm-collapsed .cards .entry-icons\
    {\
      position: absolute;\
      top: 0.4em;\
      left: 0.4em;\
    }\
    /* hide any embedded objects that could leak through/be visible */\
    .gm-collapsed .cards embed\
    {\
      display: none !important;\
    }\
    /* collapse entries */\
    .gm-collapsed .cards .entry-container\
    {\
      margin-bottom: 0.2em;\
      padding-bottom: 0 !important;\
      height: 1.76em !important;\
      overflow: hidden;\
    }\
    .gm-collapsed .cards .entry-actions\
    {\
      background-color: #EEEEEE;\
      left: 0 !important;\
      padding: 0.35em 0 0.15em 3px\
    }\
    .gm-collapsed .card-actions\
    {\
      -moz-border-radius: 0;\
      border-width: 0 2px 2px;\
      border-style: solid;\
      border-color: #EEEEEE;\
    }\
    .gm-collapsed .card .card-bottom\
    {\
      padding: 0;\
    }\
    .gm-collapsed .cards .entry-main\
    {\
      margin-left: 1.9em !important;\
    }\
\
    .gm-collapsed .cards #current-entry[gm-expanded] .entry-main\
    {\
      margin-left: 1.8em !important;\
    }\
\
    .gm-collapsed .cc\
    {\
      width: 100%;\
      background: none !important;\
    }\
\
    .gm-collapsed .card-actionrow\
    {\
      background-color: #EEEEEE;\
    }\
\
    .gm-collapsed .cards .entry\
    {\
      cursor: pointer;\
    }\
\
    /* set read entry background color */\
    .gm-collapsed .cards .read, .read td\
    {\
      background: #E8EEF7;\
    }\
\
    .gm-collapsed .cards .entry-source-title-parent\
    {\
      color: transparent; /* hide 'from' */\
      display: block;\
      height: 0;\
    }\
\
    .gm-collapsed .cards .entry-author\
    {\
      margin-top: 0.2em;\
    }\
\
    .gm-collapsed .cards .entry-via\
    {\
      margin-left: 2.3em !important; /* counter */\
    }\
\
    .gm-collapsed #entries.single-source.cards .entry-author\
    {\
      margin-left: 0 !important;\
    }\
\
    .gm-collapsed .cards *[gm-expanded] .entry-container,\
    .gm-collapsed .cards #current-entry[gm-expanded] .entry-container\
    {\
      height: auto !important;\
    }\
\
    .gm-collapsed .cards *[gm-expanded] embed\
    {\
      display: block !important;\
    }\
\
    /* handle styles with #current-entry selector */\
    /* hide bottom selected border on card, handled on card-actions */\
    .gm-collapsed #current-entry[gm-expanded] .card\
    {\
      border-width: 2px 2px 0;\
    }\
\
    .gm-collapsed #current-entry .card\
    {\
      border: 2px solid #6688EE;\
    }\
\
    /* add selected entry bottom border */\
    .gm-collapsed #current-entry[gm-expanded] .card-actions\
    {\
      border-width: 0 0 2px;\
      border-color: #6688EE;\
    }\
\
    /* make space for the current-entry border */\
    .gm-collapsed .cards #current-entry .entry-source-title\
    {\
      top: 0.22em;\
      left: 1.75em;\
    }\
\
    .gm-collapsed .cards #current-entry .entry-title\
    {\
      margin: 0.2em 0 0 13.2em; */\
    }\
\
    .gm-collapsed .cards #current-entry[gm-expanded] .entry-title\
    {\
      margin-left: 13.3em; */\
    }\
\
    .gm-collapsed .cards #current-entry .entry-title-go-to\
    {\
      top: 0.1em;\
      right: 0.5em;\
    }\
\
    .gm-collapsed .cards #current-entry .entry-date\
    {\
      margin: 0.22em 1.55em 0 0 !important;\
    }\
\
    .gm-collapsed .cards #current-entry .entry-icons\
    {\
      top: 0.2em;\
      left: 0.2em;\
    }\
\
    .gm-collapsed .cards #current-entry .entry-container\
    {\
      height: 1.49em !important;\
    }");
}

var urlWatch =
{
  feedRegExp: /\/feed%2F/i,
  href: "",
  style: null,

  init: function() {
    this.style = document.createElement( "style" );
    this.style.type = "text/css";
    document.getElementsByTagName( "head" )[0].appendChild( this.style );

    var self = this; // if the header changed, check for a url change
    $x( "id( 'viewer-header' )" ).addEventListener( "DOMNodeInserted",
      function() {
        if ( self.href != location.href ) {
          self.setTitleCss();
          self.href = location.href;
        }
      }, false );
  },

  setTitleCss: function() // update css
  {
    var css = "";
    if ( this.feedRegExp.test( location.href ) )
      css = ".gm-collapsed.cards .entry-title { margin-left: 0 !important; }";
    this.style.innerHTML = css;
  }
};

function expand( e )
{
  e.setAttribute( 'gm-expanded', 'gm-expanded' );
}

function collapse( e )
{
  try {
    e.removeAttribute( 'gm-expanded' );
  } catch ( e ) {}
}

function toggle( e )
{
  if ( e.hasAttribute( "gm-expanded" ) )
    collapse( e );
  else
    expand( e );
}

function catchClick( event )
{
  if ( event.target.className != "entry-title" &&
      event.target.className != "entry-main" &&
      event.target.className != "entry-date" )
    return;

  var elm = $x( "ancestor-or-self::*[starts-with( @class,'entry' )]",
            event.target );
  toggle( elm );
}

function catchKey( event )
{
  var curr = $x( "id( 'current-entry' )" );
  var next = $x( "id( 'current-entry' )/following-sibling::div" );
  var prev = $x( "id( 'current-entry' )/preceding-sibling::div[1]" );

  switch ( event.which )
  {
    case 32: // space
    case 74: // j
      expand( curr );
      collapse( prev );
    break;
    case 79: // o
      toggle( curr );
    break;
    case 75: // k
      expand( curr );
      collapse( next );
  }
}

function updateState( chk )
{
  var es = document.body;
  if ( chk.checked )
  {
    es.className = "gm-collapsed " + es.className;
  }
  else
  {
    es.className = es.className.replace( "gm-collapsed ", "" );
  }
}

function insertCollapse()
{
  var clps = document.createElement( "div" );
  clps.innerHTML = "Collapse: ";
  clps.style.cssFloat = "left";
  clps.style.marginLeft = "1em";

  var chk = document.createElement( "input" );
  chk.type = "checkbox";
  chk.checked = GM_getValue( "collapsed", false );
  updateState( chk );

  chk.addEventListener( "click", chkToggle, false );

  clps.appendChild( chk );
  $x( "id( 'viewer-top-controls' )" ).appendChild( clps );

  return clps;
}

function chkToggle( event ) {
  var chk = event.target;
  updateState( chk );

  GM_setValue( "collapsed", chk.checked );
  simulateClick( $x( "id( 'view-cards' )" ) ); // refresh the view
}

// add checkbox toggle for collapsing expanded view entries
function addView()
{
  var vc = $x( "id( 'view-cards' )" );
  var vl = $x( "id( 'view-list' )" );
  var clps = insertCollapse(), chk = clps.lastChild;

  // show toggle if using expanded view, hide if using list view
  $x( "id( 'chrome-view-links' )" ).addEventListener( "DOMAttrModified", function()
  {
    var display;
    var entries = $x( "id( 'entries' )" );

    if ( $x( "id( 'view-cards' )[contains( @class,'link-selected' )]" ) )
    {
      display = "block";
    }
    else
    {
      entries.className = entries.className.replace( "gm-collapsed ", "" );
      display = "none";
    }

    clps.style.display = display;
  }, false );
}

// watch for loading of entries list to add event listener
function watchLoading()
{
  var chrome = $x( "id( 'chrome' )" );

  function setup( e ) {
    var entries = $x( "id( 'entries' )" );
    if ( entries ) {
      chrome.removeEventListener( "DOMNodeInserted", setup, false );
      entries.addEventListener( "DOMNodeInserted", watchEntries, false );
    }
  }

  chrome.addEventListener( "DOMNodeInserted", setup, false );
}

// set click listeners on individual entries
function watchEntries( event )
{
  var entries = $xs( "id( 'entries' )/div[ contains( @class,'entry' ) ]" );
  for ( var i = 0, entry; entry = entries.snapshotItem( i ); i++ ) {
    entry.addEventListener( "click", catchClick, false );
  }
}

( function() {

  addCss();
  urlWatch.init();
  addView();
  watchLoading();

  document.addEventListener( "keyup", catchKey, false );

} )();


