// ==UserScript==
// @name           Twitter Ctrl-Enter
// @namespace      tag:domnit.org,2006-04:gmscripts
// @description    Update by hitting Ctrl-Enter from the text box
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

/*

(C) 2008 Lenny Domnitser
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html

History
-------

2008-02-12 - Moved into bookmarklet context
2008-02-06 - Made

*/

location.href=encodeURI('javascript:('+uneval(function(){
  var s = document.getElementById('status');
  s.addEventListener('keypress', function(event) {
    if(event.keyCode == KeyEvent.DOM_VK_RETURN && event.ctrlKey)
      s.form.submit();
  }, false);
})+')();');