// ==UserScript==
// @name           smth::search-user
// @namespace      xl
// @include        http://www.newsmth.net/bbstcon.php?board=*
// @author         cyberscorpio@gmail.com
// ==/UserScript==

(function() {
	function processDiv (div, board, isMyPhoto) {
		var as = div.getElementsByTagName('a');
		for (var i = 0, l = as.length; i < l; ++ i) {
			var a = as[i];
			if (a.href.indexOf('bbsqry.php?userid=') != -1) {
				var id = a.innerHTML;

				var link = document.createElement('a');
				link.href = '/bbsbfind.php?q=1&board=' + board + '&userid=' + id + '&dt=9999';
				link.target = '_blank';
				if (isMyPhoto != undefined && board == 'MyPhoto') {
					link.href = '/bbsbfind.php?q=1&board=MyPhoto&userid=' + id + '&dt=9999&ag=on';
					link.innerHTML = '在MyPhoto搜索';
				} else {
					link.href = '/bbsbfind.php?q=1&board=' + board + '&userid=' + id + '&dt=9999';
					link.innerHTML = '版面搜索作者';
				}

				if (false) {
					var pre = document.createTextNode(' [');
					var pst = document.createTextNode('] ');
					a.parentNode.insertBefore(pre,
						a.parentNode.insertBefore(link,
							a.parentNode.insertBefore(pst, a.nextSibling.nextSibling)));
				} else {
					var blank = document.createTextNode('] [');
					a.parentNode.insertBefore(link,
						a.parentNode.insertBefore(blank, a.nextSibling.nextSibling));
				}
				break;
				// do it only once
			}
		}
	}

	function init() {
		document.removeEventListener("DOMContentLoaded", init, false);
		// window.removeEventListener('load', init, false);

		var board = '';
		var lookfor = 'board=';
		var index = window.location.href.indexOf(lookfor);
		if (index != -1) {
			index += lookfor.length;
			var index2 = window.location.href.indexOf('&', index);
			if (index2 != -1) {
				board = window.location.href.substring(index, index2);
			}
		}

		if (board == '') {
			return;
		}

		var divs = document.getElementsByTagName('div');
		for (var i = 0, l = divs.length; i < l; ++ i) {
			var div = divs[i];
			if (div.className.indexOf('tconPager') != -1) {
				// var b2 = board.toLowerCase();
				// if (b2 != 'myphoto') {
					processDiv(div, 'MyPhoto', true);
				// }
				processDiv(div, board);
			}
		}
	}

	document.addEventListener("DOMContentLoaded", init, false);
	// window.addEventListener('load', init, false);
})();
