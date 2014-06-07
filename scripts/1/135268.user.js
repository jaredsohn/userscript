// ==UserScript==
// @name           FanFiction.Net Key Navigation
// @namespace      http://stendec.kicks-ass.net/
// @description    Use the Left and Right arrow keys to navigate forwards and back through chapters in a FF.Net story.
// @include        http://www.fanfiction.net/s/*
// ==/UserScript==

var myScript = function() {
  
  var i;
  
  // The bit for altering button labels.
  var ctrls = document.getElementsByTagName('INPUT');
  for ( i = 0; i < ctrls.length; i++ ) {
    if ( ctrls[i].value.indexOf('Prev') >= 0 ) {
      ctrls[i].value = '<<';
    } else if ( ctrls[i].value.indexOf('Next') >= 0 ) {
      ctrls[i].value = '>>';
    }
  }
  
  // Get the chapter selector. If there isn't one, it's a oneshot so we can just
  // stop now.
  var chp_select = document.getElementsByName('chapter');
  if ( chp_select.length === 0 ) { return; }
  chp_select = chp_select[0];
  
  // Get the number of chapters and our current chapter number.
  var chapters    = chp_select.childElementCount;
  var cur_chap    = 1;
  for ( i = 0; i < chapters; i++ ) {
    if ( chp_select.children[i].selected === true ) {
      cur_chap = i + 1;
      break;
    }
  }
  
  // The event handler that listens for Left and Right arrow keys.
  handle_key = function(e) {
    var k = e.which ? e.which : e.keyCode;
    if ( k !== 37 && k !== 39 ) { return; }
    
    var new_chap = cur_chap;
    
    // Navigate Back
    if ( k === 37 ) { new_chap--; }
    
    // Navigate Forward
    if ( k === 39 ) { new_chap++; }
    
    // Check to ensure it's a proper chapter.
    if ( new_chap < 1 || new_chap > chapters ) {
      return;
    }
    
    // Attempt to build a URL and navigate to it.
    var loc = window.location;
    var match = loc.pathname.match(/\/s\/(\d+)\/\d+\/(.*)/);
    if ( match !== null ) {
      window.location = loc.protocol + '//' + loc.host + '/s/' + match[1] + '/' + new_chap + '/' + match[2];
    }
  };
  
  // Attach the event handler.
  document.addEventListener('keydown', handle_key, false);
}

myScript();