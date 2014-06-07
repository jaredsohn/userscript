/* -*-mode:JavaScript;coding:latin-1;-*- Time-stamp: "2006-07-17 14:53:48 AKDT"
~
~	This is a Greasemonkey user script.
~	To use it, you need Greasemonkey first: http://greasemonkey.mozdev.org/
*/
// ==UserScript==
// @name          Long_Word_Breaker
// @namespace     http://interglacial.com
// @description	  Breaks up long words, to keep them from making the page side-scroll
// @version       1.0.1
// @include       *
// @author        sburke@cpan.org
// ==/UserScript==
/*			~~~~~ Long Word Breaker ~~~~~

A significant accessibility problem for people who use large fonts (or
small screens) is that long words will make the screen side-scroll.
That is, if your screen is only about forty characters across, and you
have a fifty-character URL (or a blob of source code, or a long German
word, etc), then that long text-string will stretch the virtual screen
so that you'll need to scroll sideways back and forth to read it.

This GreaseMonkey extension helps this by finding long words in text,
and inserting breakpoints in them (with the little-known HTML '<wbr>'
element) so that they can be broken across lines if necessary (instead
of stretching the screen).

This program has various preferences that show up on the "about:config"
screen -- limit by "Interglacial" and you'll see them and be able to
change them.

  Many thanks to Kyosuke Takayama for telling me about the wbr element!
  Before that, this GM script inserted microspaces instead, which was
  slow and problematic.
*/

var re_longs, re_longsG, DEBUG, Target_Length,
    Fast_And_Dumb_Mode, Elements_To_Ignore;

function main () {
  if(!( document.documentElement.tagName == "HTML"
     && document.contentType == "text/html"
     && document.body    // Basic sanity
  )) return;

  if( getpref( 'Just_Be_On_Menu', false ) ) {
    GM_registerMenuCommand( "Break long words", run );
  } else {
    run();
  }
  return;
}

function run () {
  //alert("DEBUG = " + DEBUG.toString() + " (" + typeof(DEBUG) + ")" );
  DEBUG           =  getpref( 'DEBUG', 0 );

  Target_Length   =  getpref( 'Target_Length', 29 );
     // Words longer than that number of characters will be split into words
     // slightly shorter than that.

  Fast_And_Dumb_Mode = getpref( 'Fast_And_Dumb_Mode', false );
     // Set this to true if you find this script slowing things down too much

  Elements_To_Ignore = wordstring2hash( getpref(
	'Elements_To_Ignore', "SCRIPT STYLE TEXTAREA" ) );

  trace(2, "Starting up, with DEBUG level " + DEBUG.toString());
  var NodeFilter = Components.interfaces.nsIDOMNodeFilter;
  if(!NodeFilter) throw trace(-1, "No NodeFilter?!");
  if(NodeFilter.SHOW_ELEMENT == undefined) throw trace(-1,
   "No NodeFilter.SHOW_ELEMENT?!");
  
  var traversal = document.createTreeWalker(
   document.body, NodeFilter.SHOW_TEXT, null, true
  );
  re_longs  = new RegExp( '\\S{' + Target_Length.toString() + ",}" );
  re_longsG = new RegExp( '\\S{' + Target_Length.toString() + ",}", 'g' );
  
  if(Fast_And_Dumb_Mode) { quick_scan(  traversal); }
  else                   { pretty_scan( traversal); }
  trace(2, "Done");
  return;
}

//	-	-	-	-	-	-	-	-	-

function pretty_scan (traversal) {    // Careful and pretty mode
  // For each texticle...
  while(1) {
    var texticle = traversal.nextNode();
    if(!texticle) break;
    if( texticle.length < Target_Length // (to trap this very common case)
	|| Elements_To_Ignore[ texticle.parentNode.nodeName ]
	|| ! re_longs.test( texticle.data ))  continue;

    re_longsG.lastIndex = 0;

    // For each long word in each texticle...
    while(1) {
      trace(2, "Scrutinizing \xAB" + texticle.data + "\xBB starting at i=" + (re_longsG.lastIndex || 0).toString() );

      // G-re's need this, and we need G-re's and not just normal re's so
      //   we can read their lastIndex in a bit...
      m = re_longsG.exec(texticle.data);
      if(!m) break;
      var word_starts_i = re_longsG.lastIndex - m[0].length;
      var w = m[0].substr(0,Target_Length);
      var splitpoint = good_split_point(w);
      trace(2,"Splitting \xAB" + w + "\xAB at " + splitpoint.toString() + "!");
      texticle = shim_at( texticle, splitpoint + word_starts_i );
      re_longsG.lastIndex = splitpoint;
       // Or reset this to 0 to make more chops
    }
  }
  return;
}

//--------------------------------------------------------------------------

function shim_at (texticle, atindex) {
  newnode = texticle.splitText( atindex );
  newnode.parentNode.insertBefore(document.createElement("wbr"), newnode);
  return newnode;
}

//--------------------------------------------------------------------------

function good_split_point (w) {
  //trace(3, GM_log("Considering \xAB" + w + "\xBB\n"));

  var splitpoint;
  splitpoint = w.search( /..\/../ ); // split on slash
  if(splitpoint >= 0) return splitpoint + 2;

  splitpoint = w.search( /..\-../ ); // or on hyphen
  if(splitpoint >= 0) return splitpoint + 2;

  splitpoint = w.search( /..\W../ ); // or on any nonletter
  if(splitpoint >= 0) return splitpoint + 2;

  // Give a passing try at hyphinating after a vowel.
  var m = w.match(
   /(..[aeiouAEIOUyY\xc0-\xc6\xc8-\xcf\xd2-\xd6\xd8-\xdd\xe0-\xe6\xe8-\xef\xf2-\xf6\xf8-\xfd\xff]+)../
  );
  if(m) { return m.index + m[1].length; } // that's the point after the parens

  splitpoint = Math.floor( Target_Length / 2 ); // feh, just halve it
  return splitpoint;
}

//--------------------------------------------------------------------------

function quick_scan (traversal) {
  while( 1 ) {
    var texticle = traversal.nextNode();
    if(!texticle) break;
    
    if( texticle.length < Target_Length // (to trap this very common case)
	|| Elements_To_Ignore[ texticle.parentNode.nodeName ]
	|| ! re_longs.test( texticle.data ))  continue;
    
    trace(2, "I should break \xAB" + texticle.data + "\xBB!");

    while(1) {
      var i = texticle.data.search(re_longs);
      if(i == -1) break;
      texticle.insertData( i + Target_Length - 3, "\xAC ");
      // \xAC looks very hyphen-like, and it's hard to mistake for
      // anything else!
    }
  }
  return;
}
//--------------------------------------------------------------------------
// General utility functions:

function getpref (prefname, defaulty) {
  var gotten = GM_getValue(prefname, null);
  if(gotten == null) {
    GM_setValue(prefname, defaulty);
    gotten = defaulty;
  }
  if(DEBUG >= 1) GM_log("Pref \xAB" + prefname + "\xBB = \xAB" +
   gotten.toString() + "\xBB");
  return gotten;
}

function trace (level,msg) {
  if(DEBUG >= level)  GM_log(msg);
  // And just in case we're doing "throw trace(...)":
  var e = new Error(msg);
  e.smb_debuglevel = level;
  return;
}

function array2hash (ary) {
  var h = {};  for(var i = 0; i < ary.length; i++) h[ary[i]] = 1;  return h;
}

function wordstring2hash (str) {
  return array2hash( (str.match( /(\w+)/g ) || []).concat() );
}
//--------------------------------------------------------------------------
main(); // And that's it!
