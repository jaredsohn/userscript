// ==UserScript==
// @name   	4chon Image Sauce
// @namespace  	4chon.net
// @description	reverse image search script
// @include	http://4chon.net/*
// @exclude	http://4chon.net/mod.php?/*
// @icon	http://static.4chon.net/favicon.gif
// ==/UserScript==


var prefix = [
  'http://RegEx.info/exif.cgi?url=',
  'http://IQDB.org/?url=',
  'http://SauceNAO.com/search.php?db=999&url=',
  'http://TinEye.com/search?url=',
  'http://Google.com/searchbyimage?hl=en&site=search&image_url=',
  'http://KarmaDecay.com/',
];
var names = [];
for (var i in prefix) {
  names.push(prefix[i].match(/(\w+)\./)[1]);
}
function addLinksTo(root) {
  var filespans = root.getElementsByClassName('fileinfo');
  for (var i = 0, l = filespans.length; i < l; i++) {
    var item = filespans[i];
    var suffix = item.getElementsByTagName('a')[0].href
	
    for (var j in prefix) {
      var link = document.createElement('a')
      link.href = prefix[j] + suffix;
      link.textContent = names[j];
      link.style.color = 'green';
      item.appendChild(document.createTextNode(' '));
      item.appendChild(link);
    }
  }
}
addLinksTo(document.body);


document.body.addEventListener('DOMNodeInserted', nodeInserted, true);