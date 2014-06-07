// ==UserScript==
// @name            IMDb URL cleaner
// @version         1.0
// @description     Removes crap from IMDb URLs
// @author          Rennex
// @include         http*://*.imdb.*
// @grant           none
// @run-at          document-start
// ==/UserScript==

var origloc = location.href


// clean up the hostname
var loc = origloc.replace(/(akas|former)\.imdb\.(com|de|it|fr)/, "www.imdb.com")
var loc = origloc.replace("http://www.imdb.com/url?q=", "")
// we need to redirect if the hostname changed
var redirect = (loc != origloc)

// clean up query string crap
loc = loc.replace(/\?ref_=[^&#]*&?/, "?").replace(/\?($|#)/, "$1")
loc = loc.replace(/\&sa=[^&#]*&/, "")
loc = loc.replace(/\ei=[^&#]*&/, "")
loc = loc.replace(/ved=[^&#]*&/, "")
loc = loc.replace(/sig2=[^&#]*&/, "")
loc = loc.replace(/usg=[^&#]*/, "")
loc = decodeURIComponent(loc)


/*
&sa=U
&ei=dD4mUfS4OoWN4ASRyoDwBA
&ved=0CCsQFjAG
&sig2=8CjGQo9o5kissctsQY3l4Q
&usg=AFQjCNEghnnvzFiWp9YtQC6d7qTIPUDb9Q/
*/
if (redirect) location.href = loc
else if (loc != origloc) history.replaceState(null, "", loc.replace(/^https?:\/\/[^\/]+/, ""))

