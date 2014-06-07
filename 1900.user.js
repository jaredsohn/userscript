// ==UserScript==
// @name          BitTorrent Icon
// @namespace     http://iwouldntknowwhattodowithoneifihadone.example.com/
// @include       *
// @description   Adds a small bittorrent icon on every bittorrent link (.torrent).  Based on userscripticon.js, and image taken from http://www.p2pmag.com/files/n_small_logo_1099919152_bittorent_sm.gif without any consent or knowledge, found through google images.  And converted to the string below with this: http://software.hixie.ch/utilities/cgi/data/data .  This comment took more time to write than the rest of the script :P.
// ==/UserScript==

(function() {
  var links = document.links;
  for(i = 0; i < links.length; i++) {
    link = links[i];
    if(link.href.match(/\.torrent$/)) {
      link.style.backgroundImage = 'url(data:image/gif;base64,R0lGODlhEAAQANUAAHSTyTeG0URRnFN32sLa8TI9jqjA4Iep1azH8lxnqGqY60iM1zRCk5S%2B5ou16%2F%2F%2F%2Fy85i2ei21WK6nKn3E1YnVaZ1zdcyTZTuTlGlWN%2Bu3WBuOXu%2Byt12zt55Sozho%2BdymJtqyw1iNzl91txtCd9zbfR7DV83IGJuzM%2FkESC40yU1T5Llj5l0T9NmzlQrLDP7bDM8WCS7H6w4DVAjzRFncDZ8UeGz5qw4XF8taPB82ZwrixBoTdOq%2Bzy%2FDRPs6LH6yH5BAAAAAAALAAAAAAQABAAAAbcwIdwI1E4YAiHIrYROnOSF2FKqNUQEsQz9XuVvqXX79dIaUUdx%2B1z0pw%2BH0NDFun0JAuNTgcC4UAJCR90JjEdNgAAgRQtCRQCAgARAR0cJAEqMhQznBAYMyETARyWJCQVIzMMBQwCKBAjFaSmJCoZIQUtLQUeGBgRJiYBwxUZEAIYEDMeLRgZKR0BCyoTIyi%2BGAUFELASMQsVEwcrEL3c5RA8CiISEw0gISgMECGuEDQWIg85CgAz2wUwNIPAwMINJwhY8OC2whWKHSwOOnkgYoCFCxd8XLAwQJ%2BQIAA7)';
      link.style.backgroundPosition = 'center left';
      link.style.backgroundRepeat = 'no-repeat';
      link.style.paddingLeft = '16px';
    }
  }
})();