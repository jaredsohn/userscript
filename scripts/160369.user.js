// ==UserScript==
// @name             isk Link [GW]
// @namespace        s3kat0r.com
// @description      Добавляет ссылку на иски на страницу персонажа.
// @include          http://www.ganjawars.ru/info.php?id=*
// @version          0.1
// @author           s3kat0r
// @source           http://www.ganjawars.ru/syndicate.php?id=8516
// ==/UserScript==



(function() {
var isk_image = 'http://f.ganjafile.ru/1/85081_judge.ico';
var root      = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

if (root.location.href.indexOf('http://www.ganjawars.ru/info.php?id=') == -1) {
	return false;
}

var user_id = /info\.php\?id=(\d+)/i.exec(root.location.href)[1];

var link = root.document.body.getElementsByTagName('a');
for (var i = 0; i < link.length; ++i) {
	if (link[i].href.indexOf('albums.php?id=') != -1) {
		var isk_link       = document.createElement('a');
		isk_link.href      = 'http://www.ganjawars.ru/isks.php?sid='+user_id+'&st=1&period=4';
		isk_link.title     = 'Показать все иски персонажа';
		isk_link.innerHTML = '<img src="'+isk_image+'" border="0" width="20" height="19" align="right" alt="Показать все иски персонажа" />';
		link[i].parentNode.insertBefore(isk_link, link[i]);
		break;
	}
}


})();