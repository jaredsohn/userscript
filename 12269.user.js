// ==UserScript==
// @name          Frenzies Underground Post Unbreaker
// @namespace     http://www.kristinahansen.com.com/
// @description	  Originally Hans' script, edited for new board. Fixes "broken posts" caused by extra-long words and huge images.
// @version       0.9
// @include       http://*frenzyboard.net*action=read*
// @include       http://*frenzyboard.net*action=display*
// ==/UserScript==

//
// New in 0.9 ----------------------------
// 
// Ever get tired of broken posts? This script breaks needlessly long "LOLOLOL"s and
// seemingly endless "HAHAHAHA"s into smaller chunks so the page won't break. It also
// includes an image resizer based on width so that oversized images won't break the
// post, either (thanks goes out to Brody for showing the desire existed for this).
//
// 
// Word breaker script based on Sean Burke's "Long_Word_Breaker" script:
// http://userscripts.org/scripts/show/2641
// http://interglacial.com/
//
// TODO:
// Fix a bug where all images are shrinkable but only allows the logo returns to 
// normal when clicked.


var maxWidth= 1020;				// The widest to allow images to display (in pixels)
								// 1020 is good for people with 1280x1024 resolution
								// 790 is good for people with 1024x768 resolution
								// 587 is good for people with 800x600 resolution


var maxWordLength = 120;		// This tells the script how many characters long a word can be before adding a space.
								// 120 will catch most breaks for people with 1280X1024 resolution
								// 100 is good for people with 1024x768 resolution
								// 70 is good for people with 800x600 resolution
								
								
var breakCharacter = " ";		// This is the character to park in the middle of the long word. A space should
								// do the trick, but you can change it to something like "\xAC " if you'd like to be 
								// able to see if the script did anything.
								
								
								
								
// Start the nitty=gritty.
var re_longs, re_longsG, DEBUG, Target_Length,
    Fast_And_Dumb_Mode, Elements_To_Ignore;

function main () {
  if(!( document.documentElement.tagName == "HTML"
     && document.contentType == "text/html"
     && document.body    // Basic sanity
  )) return;

//  if( getpref( 'Just_Be_On_Menu', false ) ) {
//    GM_registerMenuCommand( "Break long words", run );
//  } 
	else {
    run();
  }
  return;
}

// This guy does the deed.
function run () {
  //alert("DEBUG = " + DEBUG.toString() + " (" + typeof(DEBUG) + ")" );
//  DEBUG           =  getpref( 'DEBUG', 0 );
DEBUG = 0;

//  Target_Length   =  getpref( 'Target_Length', maxWordLength );
	Target_Length   =  maxWordLength;
     // Words longer than that number of characters will be split into words
     // slightly shorter than that.

//  Fast_And_Dumb_Mode = true;
// Already set to "quick_scan( traversal); below
     // Set this to true if you find this script slowing things down too much

//  Elements_To_Ignore = wordstring2hash( getpref(
//	'Elements_To_Ignore', "SCRIPT STYLE TEXTAREA" ) );
	Elements_To_Ignore = "SCRIPT STYLE TEXTAREA";

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
  
  //if(Fast_And_Dumb_Mode) { quick_scan(  traversal); }
  //else                   { pretty_scan( traversal); }
  quick_scan(  traversal); 
  trace(2, "Done");
  return;
}

//	-	-	-	-	-	-	-	-	-
// We're only using quick_scan (for now).
/*

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
      // Edit (Hans): I have no idea what he just said.
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

*/

//--------------------------------------------------------------------------
// Not used by quick_scan that I can see
/*
function shim_at (texticle, atindex) {
  newnode = texticle.splitText( atindex );

  var spanny = document.createElement("span");
//  spanny.appendChild(document.createTextNode(" "));
  spanny.appendChild(document.createTextNode(breakCharacter));
  spanny.style.fontSize = "1px";
  spanny.style.border = "1px #f0f solid;";
  newnode.parentNode.insertBefore(spanny, newnode);
  return newnode;
}
*/
//--------------------------------------------------------------------------

/*

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
//  var m = w.match(
//   /(..[aeiouAEIOUyY\xc0-\xc6\xc8-\xcf\xd2-\xd6\xd8-\xdd\xe0-\xe6\xe8-\xef\xf2-\xf6\xf8-\xfd\xff]+)../
//  );
//  if(m) { return m.index + m[1].length; } // that's the point after the parens


//  splitpoint = Math.floor( Target_Length / 2 ); // feh, just halve it
	splitpoint = Target_Length
  return splitpoint;
}

*/

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
      texticle.insertData( i + Target_Length - 3, breakCharacter);
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
main(); 

// That's it for the line breaker, now let's add the image shrinker


// Based on Laurens Holst's phpBB image resizer script:
// http://www.grauw.nl/projects/pc/greasemonkey/ 


	var aSpan = document.getElementsByTagName('td');
	for (i=0; i<aSpan.length; i++) {
		if (aSpan[i].className == 'window') {
			var aCenter = document.getElementsByTagName('center');
			var aImg = aSpan[i].getElementsByTagName('img');
			for (j=0; j<aImg.length; j++) {
				aImg[j].style.maxWidth = maxWidth + 'px';
				aImg[j].title = 'Click for the original size';
				aImg[j].addEventListener('click', function(event) {
						if (event.currentTarget.style.maxWidth == 'none')
							event.currentTarget.style.maxWidth = maxWidth + 'px';
						else
							event.currentTarget.style.maxWidth = 'none';
					}, false);
				
			}
		}
	}
