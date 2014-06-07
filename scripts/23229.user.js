// ==UserScript==

// @name           Twitter Unread Marker

// @namespace      tag:domnit.org,2006-04:gmscripts

// @description    Marks Twitter tab with the number of unread messages

// @include        http://twitter.com/home

// @include        https://twitter.com/home

// @include        http://twitter.com/replies

// @include        https://twitter.com/replies

// ==/UserScript==



/*



(C) 2008 Lenny Domnitser

Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html



History

-------



2008-02-24 - Made



*/



var key = location.href.indexOf('replies') < 0 ? 'last_recent' : 'last_reply';



var rows = document.getElementById('timeline').getElementsByTagName('tr');

var last = GM_getValue(key);

if(last) {

  var row, i, lots = true;

  for(i = 0; row = rows[i]; i++) {

    if(row.id == last) {

      lots = false;

      if(i != 0)

        document.title += ' (' + i + ')';

      break;

    }

  }

  if(lots)

    document.title += '(lots)';

}



function clear() {

  document.title = document.title.replace(/\(.+?\)$/, '');
  GM_setValue(key, rows[0].id);

}

addEventListener('click', clear, false);

addEventListener('keypress', clear, false);

setTimeout('location.reload()', 300000);