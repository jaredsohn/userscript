// ==UserScript==
// @name           Bookmark scrolled positions of pages
// @namespace      http://khopis.com/scripts
// @description    Retrieve page positions by text, %, line, ...
// @include        *
// @author         Adam Katz <scriptsATkhopiscom>
// @version        0.3
// @copyright      2010-2011 by Adam Katz
// @license        AGPL v3+
// @licstart       The following is the entire license notice for this script.
/* 
 * Copyright (C) 2010-2011  Adam Katz
 *
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or (at your
 * option) any later version.  This program is distributed in the hope that
 * it will be useful, but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License at <http://www.gnu.org/licenses>.
 */ 
// @licend         The above is the entire license notice for this script.
// ==/UserScript==


/******************

Use this by altering the URL hash in one of these ways:

Usage:
  NUMBER%    	Percent of the page		http://bit.ly/apX1CO#25%
  line=NUMBER	Line NUMBER			http://bit.ly/apX1CO#line=20
  page=NUMBER	Page NUMBER (like using PgDn)	http://bit.ly/apX1CO#page=2
  px=NUMBER	Pixel height NUMBER		http://bit.ly/apX1CO#px=1000
  TAG=NUMBER	NUMBER'th html TAG in document	http://bit.ly/apX1CO#h1=2
  TAG=QUERY	1st html TAG matching QUERY	http://bit.ly/apX1CO#h1=Contrib
  TAG=QUERY[#]	... #th match instead of 1st 	http://bit.ly/apX1CO#a=khop[4]
  text=QUERY	Above within bold-ish HTML tags	http://bit.ly/apX1CO#text=author
  find=QUERY	Alternate form of above

Regular expressions can also be used on queries by using ~ or =~ ins place of =
  TAG~REGEX	1st html TAG matching REGEX	http://bit.ly/apX1CO#h2~au..or
  regex=REGEX	Alternate form of text~REGEX

Queries and Regexps are case sensitive unless entirely lowercase.
You can force case sensitivity by specifying your type in uppercase
(e.g. "H3" instead of "h3").

Underscores are interpreted as either underscores or spaces (they become
the regex "[_\s]").  The query string is URI-decoded to un-escape percent
notation (e.g. "find=~foo%20bar" becomes "find=~foo bar").

If there is more than one hit, you can use array-style references to pick which
matching item, e.g. "h2=thing[3]" will scroll to the third matching <h2> tag.
Note that if you use "find=thing[3]" it will number matches by tag order, which
is to say ALL h1 matches, then ALL h2 matches, ... look at the code or guess.

TODO:
   * If possible, fix BUG preventing locationbar edits from triggering this
     (Workaround: edit locationbar, press ENTER, then scroll to top and reload)
   * Investigate XPath for quicker find operations
   * Investigate body.find() for first-pass (assuming failure, it fails faster)
   * Figure out how to _set_ URL via some kind of interaction (GUI?)

*******************/


function scrollToQuery(tags, query, collision, isRegex, useCase) {

  //GM_log("searching in "+tags+" for "+collision+"th "+query+" with regex="+isRegex+" and case-sensitive="+useCase);

  var flag = '', found = null, match = 0;
  collision = Number(collision);

  if (!isRegex) {
    query = query.replace(/[^\w\s]/g, ".").replace("_", "[_\\s]", "g");
  }
  if ( !useCase && !query.match(/[A-Z]/) ) { flag="i"; }
  query = RegExp(query, flag);

  for (var t=0, tl=tags.length; t<tl && !found; t++) {
    if (! tags[t].match(/[a-z:]+/) ) {
      GM_log("Skipping invalid HTML tag '"+tags[t]+"'");
      continue;
    }
    var elems = document.body.getElementsByTagName(tags[t]);
    for (var e=0, el=elems.length; e<el; e++) {
      if ( elems[e].innerHTML.replace(/<[^>]*>/g, '').match(query) ) {
        found = elems[e];
        match++;
        if (match >= collision) { break; }
      }
    }
  }

  if (found == null) {
    GM_log("Failed to find instance #" + collision + " of query '" + query
           + "' in HTML tag(s) '"+tags + "'");
  } else {
    found.scrollIntoView(true);
  }

  return found;
}


function gotoAnchor() {

  var pos = unescape( location.hash.substring(1) );

  if ( document.getElementById(pos) || document.getElementsByName(pos).length )
    { return; } // Position is an anchor, we've already navigated there.  DONE.

  // PERCENT (supports (double) uri escapes and wikipedia-style dot uri escape)
  var percent = pos.match(/^(.*)(?:%|[&.]25)$/);
  if (percent && percent[1]) {
    percent = percent[1];
    if (percent < 0) { percent = 0; }
    else if (percent > 100) { percent = 100; }

    window.scrollTo(0, document.height * percent / 100);
    return;
  }

  var equals = pos.indexOf("=");
  var tilde  = pos.indexOf("~");
  if (equals == -1) { equals = tilde; }

  // NO TYPE GIVEN, assume either pixel count or text query
  if (equals == -1) {
    if (Number(pos) >= 0) {
      pos = "px=" + pos;
      equals = 2;
    } else {
      // GM_log("Undefined anchor location '" + pos + "'"); return;
      pos = "text=" + pos;
      equals = 4;
    }
  }

  var type = pos.substring(0, equals);
  var useCase = type.match(/[A-Z]/);
  type = type.toLowerCase();
  var endPos = pos.length;
  var collision = pos.match(/[=~].*(\[(\d{1,3})\])$/);
  if (collision && collision[2]) {
    pos = pos.substring( 0, pos.lastIndexOf(collision[1]) );
    collision = collision[2];
  } else { collision = 1; }
  pos = pos.substring(equals+1).replace(/^~/,'');
  var posNum = Number(pos);
  if (posNum > 0) { posNum = posNum - 1; } // count starts internally at zero

  switch (type) {

    // PIXELS
    case "px": case "pixel": case "pixels":
      window.scrollTo(0, posNum);
      return;

    // LINE NUMBERS
    case "l": case "line":
      window.scrollTo(0,0);
      window.scrollByLines(posNum);
      return;

    // PAGE NUMBERS
    case "page": case "pg":
      window.scrollTo(0,0);
      window.scrollByPages(posNum);
      return;

    // ARBITRARY TEXT (within select tags only)
    case "find": case "goto": case "query": case "text":
    case "regex": case "regexp":
      scrollToQuery(["h1","h2","h3","h4","h5","th","b","strong","i","em"],
                    pos, collision,
                    tilde != -1 || type.indexOf("regex") != -1, useCase);
      return;

    // HTML TAGS (esp. h1, h2, table, p)
    default:
      headings = document.getElementsByTagName(type);
      if (!headings || headings.length == 0) { return; }

      // ARBITRARY TEXT IN GIVEN TAG
      if ( String(posNum) == "NaN" ) {  // is there a better way to do this?
        scrollToQuery(Array(type), pos, collision, tilde != -1, useCase);
        return;
      }

      // NUMBERED OCCURENCE OF GIVEN TAG
      if ( headings.length * 2 < posNum ) // asking for over 2x the tag count
        { window.scrollTo(0, document.height); return; } // go to end
      // asking for more than the tag count (but not 2+ times)  -> go to last
      if ( headings.length <= posNum ) { posNum = headings.length - 1; }
      headings[posNum].scrollIntoView(true);
      return;

  }

}

// Only run if there is a hash and we're at the top of the page
if (location.hash && window.scrollY < 9) { gotoAnchor(); }

