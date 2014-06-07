// ==UserScript==
// @name           TwitterSnapshot
// @namespace      http://twitter.com
// @include        http://twitter.com/*
// @version		   0.1
// @author      Ziru
// @credit      DASKAjA, http://userscripts.org/scripts/show/24312
// ==/UserScript==

// DON'T FORGET TO PUT YOUR SERVICE API KEY HERE!
var SNAPSHOT_SERVICE_API_KEY = '<YOUR_WEBSNAPR_KEY>';
var SNAPSHOT_SERVICE_API_URL = 'http://images.websnapr.com/?size=T&key=' + SNAPSHOT_SERVICE_API_KEY + '&url=';

var regex = /href="(http:\/\/(.*?))"/;

var i = 0;
var entrys = new Array();
//entrys.push(document.getElementById('p'));
for each (var entry in document.getElementsByTagName('p')) {
	if (entry.className == 'entry-title entry-content')
		entrys.push(entry);
}

for each (var entry in document.getElementsByTagName('span')) {
	if (entry.className == 'entry-title entry-content')
		entrys.push(entry);
}

for each (var entry in entrys) {
	var match = regex.exec(entry.innerHTML);
	if (match && match[1]) {
    var url = match[1];
    var snapshotElem = document.createElement('td');
    snapshotElem.setAttribute('class', 'thumb vcard');
    snapshotElem.innerHTML = '<a href="' + url + '"><img src="' + SNAPSHOT_SERVICE_API_URL + encodeURI(url) + '" width="48" height="48"/></a>';
    entry.parentNode.parentNode.appendChild(snapshotElem);
  }
}
