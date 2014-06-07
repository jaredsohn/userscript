// ==UserScript==
// @name           Fix Search form
// @namespace      highsociety75
// @description    Fixes the advanced search form     
// @include        http://what.cd/torrents.php*
// @include        https://ssl.what.cd/torrents.php*
// ==/UserScript==
(function() {
	var row = document.getElementById('content').getElementsByTagName('table')[0].getElementsByTagName('tr')[4].getElementsByTagName('td');
	row[2].style.width = '25px';
	row[3].style.width = '100px';
})();