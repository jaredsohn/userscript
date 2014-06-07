// ==UserScript==
// @name           Moltar's second script!
// @namespace      shoecream@luelinks.net
// @description    Checks the new links pages for deleted new links. Requires Firefox 3
// @include        http://links.endoftheinter.net/links.php?mode=new*
// @include        https://links.endoftheinter.net/links.php?mode=new*
// ==/UserScript==

function query (name) {
   var string = document.location.search.substring(1);
   var pairs = string.split('&');
   for (var i in pairs) {
      var keys = pairs[i].split('=');
      for (var j in keys) {
         keys[j] = decodeURIComponent(keys[j]);
      }
      if (keys[0] === name) {
         return keys[1];
      }
   }
}

var table = document.getElementsByClassName('grid')[0];
var tr = table.getElementsByTagName('tr');

var last_num = 0;

if (!query('category')) {
   for (x = 0; x < tr.length; x++) {
      // wrong classname = skip
      if (tr[x].className.search(/r[01]/) < 0)
         continue;

      // grab the link number
      var link_num = tr[x].getElementsByTagName('td')[0].firstChild.search.match(/l=(\d+)/i)[1];

      // uh oh, we are missing a link!
      var link_difference = last_num - link_num;

      if (last_num && link_difference > 1) {
         for (i = 0; i < link_difference - 1; i++) {
            var row = table.insertRow(x);
            var cell = row.insertCell(0);
            cell.setAttribute('colspan',table.getElementsByTagName('tr')[1].getElementsByTagName('td').length);
            cell.innerHTML = '<b>MISSING LINK <a href="linkme.php?l=' + (+link_num + 1 + i) + '">'+(+link_num + 1 + i)+'</a></b> at row '+x
         }
      }

      last_num = link_num;
   }
}
