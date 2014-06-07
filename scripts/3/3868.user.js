// ==UserScript==
// @name          Usenet on WWW
// @namespace     tag:domnit.org,2006-04:gmscripts
// @description   Point `news:` links to Google Groups
// ==/UserScript==

/*

(C) 2005 Lenny Domnitser
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html

This works nicely out of the box; you may wish to inspect the source to find
how to adjust the hidden preferences. Future versions of this script will
probably provide a user interface to these options.

History
-------

2005-11-08 - Worked around location bug with open(uri, '_self')
2005-11-07 - Started. Mostly finished, except for a FFx bug that show be fixed
             when 1.5 ships (cannot set `location`, i.e. cannot open newgroup
             in same window)

*/

const REUSE_WINDOW = 0,
      NEW_WINDOW = 1,
      NEW_TAB = 2;

var prefix = GM_getValue('prefix', 'http://groups.google.com/group/'),
    suffix = GM_getValue('suffix', ''),
    openWhere = GM_getValue('openWhere', REUSE_WINDOW);

function openGroup(event) {
  var group = event.currentTarget.href.substring(5);
  var uri = prefix + encodeURIComponent(group) + suffix;
  switch(openWhere) {
    case REUSE_WINDOW:
      open(uri, '_self');
      break;
    case NEW_WINDOW:
      open(uri);
      break;
    case NEW_TAB:
      GM_openInTab(uri);
  }
  event.preventDefault();
}

for(var c = 0, link; link = document.links[c]; c++) {
  if(/^news:(?!\/\/)/.test(link.href)) {
    link.addEventListener('click', openGroup, false);
  }
}