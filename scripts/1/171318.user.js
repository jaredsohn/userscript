// ==UserScript==
// @name          Userscripts.org Forum Emoticons
// @namespace     erosman
// @description   Adds Yahoo Messenger Emoticons to USO Forum
// @updateURL     https://userscripts.org/scripts/source/171318.meta.js
// @downloadURL   https://userscripts.org/scripts/source/171318.user.js
// @include       http://userscripts.org/topics/*
// @include       http://userscripts.org/messages/*
// @include       http://userscripts.org/home/comments*
// @include       http://userscripts.org/scripts/reviews/*
// @include       https://userscripts.org/topics/*
// @include       https://userscripts.org/messages/*
// @include       https://userscripts.org/home/comments*
// @include       https://userscripts.org/scripts/reviews/*
// @grant         none
// @author        erosman
// @version       1.7
// ==/UserScript==



/* --------- Note ---------
  This script converts Smiley Text to Smiley Image.
  The Smiley Code and Image set are based on Yahoo! Messenger Emoticons, including the hidden Emoticons.


  --------- History ---------


  1.7 Code re-write with reduced instructions + Added 2 missing emoticons
  1.6.1 Minor change to include
  1.6 Code Improvements + Added Reviews pages
  1.5 New Xpath pattern + Added Comments pages + switch pattern
  1.4 Fixed USO issue with converting :^o to :<sup>o</sup>
  1.3 Fixed almost all issues with RegEx, :^o is not working because USO converts it to :<sup>o</sup>
  1.2 More RegEx pattern improvement and fixing issues where one string is a sub-string of another
  1.1 Added PM pages to include + RegEx patterns improvement
  1.0 Initial release

*/


(function() { // anonymous function wrapper, used for error checking & limiting scope
'use strict';

if (frameElement) { return; } // end execution if in a frame, object or other embedding points

var pat;
var path = location.pathname;

switch (true) {
  case  path.indexOf('/topics/') !== -1:
  pat = './/td [contains(@id,"post-body-")]';
  break;

  case path.indexOf('/messages/') !== -1:
  case path.indexOf('/reviews/') !== -1:
  pat = './/div [contains(concat(" ", normalize-space(@class), " "), " body ")]';
  break;

  case path.indexOf('/comments') !== -1:
  pat = './/td [contains(concat(" ", normalize-space(@class), " "), " body ")]';
  break;

}
if (!pat) { return; }  // end execution if not found

// template
var span = document.createElement('span');


// looking for Smiley Code but not inside <code> or <pre> tags
var snapElements = document.evaluate(
    pat + ' //text() [normalize-space() ' +
    'and not(ancestor::code) ' +
    'and not(ancestor::pre)]',
    document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0, len = snapElements.snapshotLength; i < len; i++) {
  
  convert(snapElements.snapshotItem(i));
}


function convert(node) {
  
  // USO specific convertion &ndash; \u2013 => - \u002D + &ldquo; u201C => " \u0022
  var str = node.nodeValue.replace(/\u2013/g,'\u002D').replace(/\u201C/g,'\u0022');
  var len = str.length;
  
  // escaping \ ^ $ * + ? . ( ) | { } [ ]
  // Changing the order so that it doesn't match sub-strings
  var emoticon = {

    '19.gif' : />:\)/g,
    '21.gif' : /:\)\)/g,
    '23.gif' : /\/:\)/g,
    '48.gif' : /<\):\)/g,
    '58.gif' : /\*-:\)/g,
    '60.gif' : /=:\)/g,
    '67.gif' : /:\)>-/g,
    '77.gif' : /\^:\)\^/g,
    '100.gif' : /:\)\]/g,
    '1.gif' : /:\)/g,         // sub-string of above

    '20.gif' : /:\(\(/g,
    '51.gif' : /:\(\|\)/g,
    '2.gif' : /:\(/g,         // sub-string of above

    '5.gif' : /;;\)/g,
    '71.gif' : /;\)\)/g,
    '3.gif' : /;\)/g,         // sub-string of above

    '6.gif' : />:D</g,
    '69.gif' : /\\:D\//g,
    '4.gif' : /:D/g,          // sub-string of above

    '47.gif' : />:P/g,
    '10.gif' : /:P/g,         // sub-string of above

    '50.gif' : /3:-O/g,
    '13.gif' : /:-O/g,        // sub-string of above

    '102.gif' : /~X\(/g,
    '14.gif' : /X\(/g,        // sub-string of above

    '52.gif' : /~:>/g,
    '15.gif' : /:>/g,         // sub-string of above

    '18.gif' : /#:-S/g,
    '42.gif' : /:-SS/g,
    '17.gif' : /:-S/g,        // sub-string of above

    '37.gif' : /\(:\|/g,
    '22.gif' : /:\|/g,        // sub-string of above

    '106.gif' : /:-\?\?/g,
    '39.gif' : /:-\?/g,       // sub-string of above

    '7.gif' : /:-\//g,
    '8.gif' : /:x/g,
    '9.gif' : /:">/g,
    '11.gif' : /:-\*/g,
    '12.gif' : /=\(\(/g,
    '16.gif' : /B-\)/g,
    '24.gif' : /=\)\)/g,
    '25.gif' : /O:-\)/g,
    '26.gif' : /:-B/g,
    '27.gif' : /=;/g,
    '28.gif' : /I-\)/g,
    '29.gif' : /8-\|/g,
    '30.gif' : /L-\)/g,
    '31.gif' : /:-&/g,
    '32.gif' : /:-\$/g,
    '33.gif' : /\[-\(/g,
    '34.gif' : /:O\)/g,
    '35.gif' : /8-\}/g,
//    '36.gif' : /<:-P/g,
    '36.gif' : /<:-p>/g,      // USO coverts <:-P to <:-P>; 
    '38.gif' : /=P~/g,
    '40.gif' : /#-o/g,
    '41.gif' : /=D>/g,
    '43.gif' : /@-\)/g,
    '44.gif' : /:\^o/g,
    '45.gif' : /:-w/g,
    '46.gif' : /:-</g,
    '49.gif' : /:@\)/g,
    '53.gif' : /@\};-/g,
    '54.gif' : /%%-/g,
    '55.gif' : /\*\*==/g,
    '56.gif' : /\(~~\)/g,
    '57.gif' : /~O\)/g,
    '59.gif' : /8-X/g,
    '61.gif' : />-\)/g,
    '62.gif' : /:-L/g,
    '63.gif' : /\[-O</g,
    '64.gif' : /\$-\)/g,
    '65.gif' : /:-\"/g,
    '66.gif' : /b-\(/g,
    '68.gif' : /\[-X/g,
    '70.gif' : />:\//g,
    '72.gif' : /o->/g,
    '73.gif' : /o=>/g,
    '74.gif' : /o-\+/g,
    '75.gif' : /\(%\)/g,
    '76.gif' : /:-@/g,
    '78.gif' : /:-j/g,
    '79.gif' : /\(\*\)/g,
    '101.gif' : /:-c/g,
    '103.gif' : /:-h/g,
    '104.gif' : /:-t/g,
    '105.gif' : /8->/g,
    '107.gif' : /%-\(/g,
    '108.gif' : /:o3/g,
    '109.gif' : /X_X/g,
    '110.gif' : /:!!/g,
    '111.gif' : /\\m\//g,
    '112.gif' : /:-q/g,
    '113.gif' : /:-bd/g,
    '114.gif' : /\^#\(\^/g,
    '115.gif' : /:bz/g,
    'pirate_2.gif' : /:ar!/g,
    'transformer.gif' : /\[\.\.\]/g,

  };

  for (var i in emoticon) {

    str = str.replace
    (emoticon[i], '<img src="http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/' + i +'" alt="" />');
  }

  if (str.length <= len) { return; } // do nothing if not found

  // create an element, replace the text node with an element
  var sp = span.cloneNode(true);
  sp.innerHTML = str;
  node.parentNode.replaceChild(sp, node); 
}

})(); // end of anonymous function
