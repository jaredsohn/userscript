// ==UserScript==
// @name          Enable AutoComplete
// @namespace     http://wwwu.edu.uni-klu.ac.at/sbreuss/
// @include       *
// @description	  Enable AutoComplete for all Forms and Fields
// ==/UserScript==

function check(tag) {
  try {
    var tags,i,t;
    tags = document.getElementsByTagName(tag);
    for (i=tags.length; i--;) {
      t = tags[i];
      if (t.getAttribute('autocomplete') == 'off') {
	t.setAttribute('autocomplete', 'on');
      }
    }
  } catch(e) { }
}

check('form');
check('input');
