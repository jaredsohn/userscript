// ==UserScript==
// @name           eztv.it myshows magnetiser
// @version        0.0.1
// @namespace      http://torrents.lv
// @description    Adds magnet links to the myshows page of eztv.it. Got sick and tired of waiting for new updated website...
// @copyright  2011+, Dainis Jansons
// @include        http://eztv.it/myshows/
// @include        https://eztv.it/myshows/
// ==/UserScript==


var x = document.getElementsByName("hover");
e = x.length;

for (i=0;i<e;i++)
{
el = x[i].getElementsByTagName("td");
updaterow(el);
}

function updaterow(row)
{
// name
name = row[1].childNodes[0].innerHTML;

  GM_xmlhttpRequest({
  method: "GET",
  url: "http://sailr.eu/json/" + name + "/?page=1",
    onload: function(response) {
      var re = eval("(" + response.responseText + ")");

append = re[0].magnet_link + '&tr=http://tracker.openbittorrent.com/announce'+
'&tr=http://tracker.publicbt.com:80/announce';
    // links
row[2].innerHTML = row[2].innerHTML + '<a href="' + append + '" class="magnet" title="Magnet Link" />';
  }
});
}