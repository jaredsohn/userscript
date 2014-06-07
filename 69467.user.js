// ==UserScript==
// @name           Flickr home page EXIF viewer
// @namespace      shoecream@luelinks.net
// @description    An example script for the binary library. http://userscripts.org/scripts/show/69456
// @include        http://www.flickr.com/
// @license        cc-by-sa
// @require        http://userscripts.org/scripts/source/69456.user.js 
// ==/UserScript==

var container = document.getElementsByClassName('image_link')[0];
var img = container.getElementsByTagName('img')[0];

BinaryRes.get({
    url: img.src,
    callback: on_get
  });

function on_get (response) {
  var bindata = response.responseText;
  BinaryRes.post({
      url: 'http://regex.info/exif.cgi',
      callback: on_post,
      data: {
        f: {
          value: bindata,
          filename: 'flickr.jpg',
          type: BinaryRes.guessType(bindata)
        }
      }
    });
}

function on_post (response) {
  var html = document.createElement('html');
  html.innerHTML = response.responseText;
  var tables = html.getElementsByTagName('table');
  var table = tables[tables.length - 1]; // the last table has some data
  var build = ["Here's some cool info about today's front page picture!\n"];
  [].forEach.call(table.getElementsByTagName('tr'), function (row) {
      var cols = row.getElementsByTagName('td');
      build.push(cols[0].textContent + ' => ' + cols[1].textContent);
    });
  alert(build.join('\n'));
}
