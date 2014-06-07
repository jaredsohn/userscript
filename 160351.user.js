// ==UserScript==
// @name             Auto Filter [GW]
// @namespace        s3kat0r.com
// @description      Сохраняет фильтр заявок в одиночных заявках.
// @include          http://www.ganjawars.ru/warlist.php*
// @version          0.1
// @author           s3kat0r
// @source           http://www.ganjawars.ru/syndicate.php?id=8516
// ==/UserScript==



(function() {

var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

if (root.location.href.indexOf('http://www.ganjawars.ru/warlist.php') == -1) {
	return false;
}


if (typeof(root.localStorage) == 'undefined') { /*проверяем, поддерживает ли браузер объект localStorage*/
	alert('Ваш браузер не поддерживает localStorage. Скачайте Opera 10.60 или Mozilla Firefox 3.6.6 или выше версии');
	return;
}

var data = localStorage.getItem('s3k_auf');
if (data != null && data != '') {
	var arr    = data.split(';');
	var min = max = gun = '';
	var select = root.document.body.getElementsByTagName('select');
	for (var i = 0; i < select.length; ++i) {
		if (select[i].name == 's_lmin') {
			min = select[i].options[select[i].selectedIndex].value;
		}
		if (select[i].name == 's_lmax') {
			max = select[i].options[select[i].selectedIndex].value;
		}
		if (select[i].name == 's_ltype') {
			gun = select[i].options[select[i].selectedIndex].value;
		}
	}
	if (arr[0] != min || arr[1] != max || arr[2] != gun) {
		root.location.href = '/warlist.php?war=armed&r='+Math.floor(Math.random(111, 999) * 100000)+'&s_lmin='+arr[0]+'&s_lmax='+arr[1]+'&levelset=1&s_ltype='+arr[2];
	}
}


var form = root.document.body.getElementsByTagName('form');
for (var i = 0; i < form.length; ++i) {
	if (form[i].action.indexOf('warlist.php') != -1) {
		form[i].onsubmit = function() {
			var min = this.s_lmin.value;
			var max = this.s_lmax.value;
			var gun = this.s_ltype.value;
			localStorage.setItem('s3k_auf', min+';'+max+';'+gun);
		}
	}
}

})();