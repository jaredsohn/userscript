// ==UserScript==
// @name           Flickr — Pro Stats Links
// @namespace      http://userscripts.org/users/115242
// @description    Adds links to Flickr for commonly viewed stats pages
// @include        http://www.flickr.com/
// @include        http://www.flickr.com/photos/*/stats*
// @include        http://www.flickr.com/photos/*/popular*
// @version        1.0.1
// @copyright      2009, Scott Johnson (http://scottj.info/)
// ==/UserScript==

var styleSheet = '#fpsl {margin:5px 0;font-size:12px;}'
               + '#fpsl a{color:000;font-size:12px;text-decoration:none;}'
               + '#fpsl a:hover{background-color:transparent;'
                 + 'color:#0063dc;text-decoration:underline;}';

function main(){
  GM_addStyle(styleSheet);

  var url = unsafeWindow.photos_url;
  var statsPath = url + 'stats/';
  var allPath = url + 'stats/allphotos/';
  var popPath = url + 'popular-interesting/';

  var linkDiv = document.createElement('div');
  linkDiv.id = 'fpsl';
  linkDiv.innerHTML = '<a href="' + statsPath + '">Account Stats</a> '
                    + '/ <a href="' + allPath + '">All Time</a> '
                    + '/ <a href="' + popPath + '">Popular</a>';
  var divMain = document.getElementById('Main');
  divMain.insertBefore(linkDiv,divMain.firstChild);
}
main();

