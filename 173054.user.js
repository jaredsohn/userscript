// ==UserScript==
// @name        新版贴吧点击数
// @namespace   
// @description 为新版贴吧添加点击数
// @include     http://tieba.baidu.com/f?*kw=*
// @version     1
// @run-at     document-start
// ==/UserScript==

function main() {
	var threads = document.getElementsByClassName('j_thread_list'),
		tidlist = [],
		pv = new XMLHttpRequest();
	Array.prototype.forEach.call(threads, function (a) {
		tidlist.push(a.getAttribute('data-field').match(/"id":(\d+),/)[1])
	})
	pv.open('POST', '/i/data/get_pv_by_tids', true);
	pv.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
	pv.onreadystatechange = function () {
		if (pv.readyState == 4 && pv.status == 200) {
			var data = JSON.parse(pv.responseText);
			if (data.no == 0) {
				data = JSON.parse(pv.responseText).data;
				for (var i in data) {
					threads[tidlist.indexOf(i)].getElementsByClassName('threadlist_rep_num')[0].title += '，' + data[i] + '点击';
				}
			}
		}
	}
	pv.send('tids=' + JSON.stringify(tidlist))
}
document.addEventListener('DOMContentLoaded', function () {
	if (document.getElementsByClassName('j_thread_list')[0]) {
		main();
		document.getElementById('refresh').addEventListener('click', function () {
			setTimeout(main, 1000);
		}, false);
		document.getElementById('frs_list_pager').addEventListener('click', function (e) {
			if (e.target.tagName.toLowerCase() === 'a') {
				setTimeout(main, 1000);
			}
		}, false);
	}
}, false)