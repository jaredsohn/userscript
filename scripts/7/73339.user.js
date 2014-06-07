// ==UserScript==
// @name           puretna_empornium_search_switch
// @namespace      torrent_pornium
// @description    Adds a button to puretna.com and empornium.us search pages to do the search on the other site!
// @include        http://puretna.com/browse.php?*search=*
// @include        http://www.puretna.com/browse.php?*search=*
// @include        http://empornium.us/browse.php?*search=*
// @include        http://www.empornium.us/browse.php?*search=*
// @include        http://69bits.com/browse.php?*search=*
// @include        http://www.69bits.com/browse.php?*search=*
// ==/UserScript==

(function() {
  if (/^http:\/\/(www\.)?puretna\.com/.test(location.href)) {
    var exclude_site = 'puretna.com';
  } else if (/^http:\/\/(www\.)?empornium\.us/.test(location.href)) {
    var exclude_site = 'empornium.us';
  } else if (/^http:\/\/(www\.)?69bits\.com/.test(location.href)) {
    var exclude_site = '69bits.com';
  } else {
    var exclude_site = '';
  }
  var search = (/search=([^&]*)/.exec(location.href)+'').replace(/^[^,]*,/, '');
  for (var i = 0; i < document.forms.length; ++i) {
    if (i > 0 && document.forms[i].action.match(/\/browse\.php/)) {
      document.forms[i].parentNode.insertBefore(buildSearchLinks(search, exclude_site), document.forms[i]);
    }
  }
})();

function buildSearchLinks(search, exclude_site) {
  var sites = ['puretna.com', 'empornium.us', '69bits.com'];
  var div = document.createElement('div');
  if (exclude_site == 'puretna.com') {
    div.setAttribute('style', 'font-size:24px;padding:0.5em;margin:0.5em;border:1px solid #000000;');
  } else {
    div.setAttribute('style', 'font-size:120%;padding:0.5em;margin:0.5em;border:1px solid #000000;');
  }
  div.appendChild(document.createTextNode('Duplicate this search at:'));
  for (var i = 0; i < sites.length; ++i) {
    if (sites[i] != exclude_site) {
      var link = document.createElement('a');
      if (sites[i] == 'puretna.com') {
        var extra = '&indesc=1';
      } else {
        var extra = '';
      }
      link.setAttribute('href', 'http://' + sites[i] + '/browse.php?search=' + search + extra);
      link.appendChild(document.createTextNode(sites[i]));
      div.appendChild(document.createTextNode(' '));
      div.appendChild(link);
    }
  }
  return div;
}