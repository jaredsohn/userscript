// ==UserScript==
// @name          Tibia House Linker
// @namespace     http://www.erig.net/
// @description   Links to houses on character pages
// @include       http://www.tibia.com/community/?subtopic=character*
// @include       http://www.tibia.com/community/?subtopic=guild*
// @version       0.3
// @author        Erig (http://www.erig.net/)
// ==/UserScript==

// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need FireFox http://www.mozilla.org/products/firefox and 
// the Firefox extension called Greasemonkey: http://greasemonkey.mozdev.org/
// Install the Greasemonkey extension then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Tibia House Linker", and click Uninstall.
//
// --------------------------------------------------------------------

(function() {
  var trs = document.getElementsByTagName('tr');
  var re = new RegExp('^(.+?) \\((.+?)$');

  var world = '';

  for (var i = 0; i < trs.length; i++) {
    if (trs[i].firstChild) {
      var fc = trs[i].firstChild;

      if (fc.innerHTML == 'World:') {
        world = fc.nextSibling.textContent;

        fc.nextSibling.innerHTML = '<a href="/community/?subtopic=whoisonline&amp;world=' + world + '">' + world + '</a>';
      }
      if (fc.innerHTML == 'House:' && world) {
        var txt = fc.nextSibling.textContent;

        var matches = re.exec(txt);

        if (matches.length) {
          var house = matches[1];
          house = house.replace(/[ ,\']/g, '');
          fc.nextSibling.innerHTML = '<a target="_blank" href="http://www.erig.net/house/' + world + '/' + house + '">' + matches[1] + '</a> (' + matches[2];
          break;
        }
      }
    }
  }

  var re2 = new RegExp('Their home on (.+?) is (.+?)\. The rent is paid');

  var tds = document.getElementsByTagName('td');

  for (var i = 0; i < tds.length; i++) {
      var fc = tds[i];

      if (fc.innerHTML && fc.innerHTML.match(re2)) {
          var matches = re2.exec(fc.innerHTML);

          if (matches.length) {
            var world = matches[1];
            var house = matches[2];
            house = house.replace(/[ ,\']/g, '');
            fc.innerHTML = fc.innerHTML.replace(re2, 'Their home on ' + world + ' is <a target="_blank" href="http://www.erig.net/guildhall/' + world + '/' + house + '">' + matches[2] + '</a>. The rent is paid');
            break;
          }
      }
  }
})();
