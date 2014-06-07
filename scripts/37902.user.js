// ==UserScript==
// @name          STF Auto Sign-off
// @description	  Does what it says on the tin
// @namespace     http://azrael.exofire.net/autosignoff/
// @include       http://www.star-fleet.com/webb/node/add/note*
// ==/UserScript==

text = document.getElementById('edit-body')
text.innerHTML = text.innerHTML + "\n\n -- Cadet Bunyan"