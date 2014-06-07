// ==UserScript==
// @name          What.CD - New Top
// @author        FerretGuy
// @version       1.1
// @namespace     http://what.cd
// @description   Highlights new torrents from the last time you looked
// @include       http://what.cd/top10.php?type=torrents&limit=*
// @include       https://what.cd/top10.php?type=torrents&limit=*
// @include       https://ssl.what.cd/top10.php?type=torrents&limit=*
// ==/UserScript==

(function(window){

	//Load Previous Values
	var list, ids = [];

	if (window.chrome) {
		list = localStorage.getItem('whatcd_newtop') || '';
	} else {
		list = window.GM_getValue('whatcd_newtop') || '';
	}

	var closest = function (elem, tag) {
		tag = tag.toUpperCase();
		while (tag) {
			if (elem.nodeName === tag) {
				return elem;
			}
			elem = elem.parentNode;
		}
		return null;
	};

	[].forEach.call(
		document.querySelectorAll('.torrent_table [href^="torrents.php?id"]'),
		function(el){
			ids.push(el.href);
			if (list.indexOf(el.href) < 0) {
				closest(el, 'tr').cells[0].style.borderLeft = '3px solid #5af';
			}
		}
	);

	if (window.chrome) {
		localStorage.setItem('whatcd_newtop', (ids.join(',')));
	} else {
		window.GM_setValue('whatcd_newtop', (ids.join(',')));
	}

})(window);