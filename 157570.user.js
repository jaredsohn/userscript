// ==UserScript==
// @name       VK.com trash clubs remover
// @namespace  http://humanless.ru/
// @version    0.2
// @description  Remove trash clubs from feed
// @match      http://vk.com/feed
// @copyright  2013, Konstantin Tumalevich
// ==/UserScript==

var BANNED_URLS = ['http://vk.com/iscus', 'http://vk.com/trahninormalnost1', 'http://vk.com/firstrustoryschool', 'http://vk.com/club31055731', 'http://vk.com/izloy', 'http://vk.com/goodarts', 'http://vk.com/i_shok', 'http://vk.com/smart4you', 'http://vk.com/fuck_humor', 'http://vk.com/fucking_humor', 'http://vk.com/vstrane'];

function main(rows) {
  if (0 === rows.length) {
    console.log('no news!');
    return;
  }
  for(var i=0;i<rows.length;i++) {
    var row = rows[i];
    var published_by = row.getElementsByClassName('published_by');
    if (published_by.length > 0) {
      var published_by_url = published_by[0].href;
      for(var j=0;j<BANNED_URLS.length;j++) {
        if (published_by_url == BANNED_URLS[j]) {
          row.parentElement.removeChild(row);
        }
      }
    }
  }
}

function search() {
  rows = document.getElementsByClassName('feed_row');
    main(rows);
}

window.addEventListener('scroll', search, false);
window.addEventListener('DOMContentLoaded', search, false);