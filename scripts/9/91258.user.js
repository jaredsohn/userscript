// ==UserScript==
// @name           Country abbreviations
// @namespace      http://userscripts.org
// @description    Country abbreviations
// @include        http*://*what.cd/user.php?id=*
// ==/UserScript==

function load_page_then(uri, then) {

	GM_xmlhttpRequest({

		method: 'GET',

		url: uri,

		onload: then

	});

}

var x = document.getElementsByClassName('stats nobullet')[3].getElementsByTagName('li')[3];
var acronym = x.innerHTML.split('(')[1].split(')')[0].trim();
if (acronym == '') return;

load_page_then('http://maer.mine.nu/countries.php?input=' + acronym, function (d) {
	var country = d.responseText;
	x.appendChild(document.createElement('br'));
	x.appendChild(document.createTextNode(' (' + country +  ')'));

});