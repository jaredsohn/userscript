// ==UserScript==
// @name             Umelka [GW]
// @namespace        http://s3kat0r.com/blog/
// @description      Добавляет фильтр по умелке в одиночных заяках
// @include          http://www.ganjawars.ru/warlist.php*
// @exclude          http://www.ganjawars.ru/wargroup.php*
// @version          0.1
// @author           s3kat0r
// ==/UserScript==

(function() {



// настройки 
var enable = 1;          //  1 - вкл. 0 - выкл.
// настройки //


if (enable == 0) {
	return false;
}

var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

if (root.location.href.indexOf('http://www.ganjawars.ru/wargroup.php') >= 0) {
	return false;
}


// поиск нужной кнопки по ее значению
function getInput(value) {
	var o = document.getElementsByTagName('input');
	for (i = 0, l = o.length; i < l; i++) {
		if (o[i].value == value) {
			return o[i];
		}
	}
	return false;
}


/* функции для работы с куками */
function setCookie (name, value, expires, path, domain, secure) {
	document.cookie = name + "=" + escape(value) +
		((expires) ? "; expires=" + expires : "") +
		((path) ? "; path=" + path : "") +
		((domain) ? "; domain=" + domain : "") +
		((secure) ? "; secure" : "");
}


function getCookie(name) {
	var cookie = " " + document.cookie;
	var search = " " + name + "=";
	var setStr = null;
	var offset = 0;
	var end = 0;
	if (cookie.length > 0) {
		offset = cookie.indexOf(search);
		if (offset != -1) {
			offset += search.length;
			end = cookie.indexOf(";", offset)
			if (end == -1) {
				end = cookie.length;
			}
			setStr = unescape(cookie.substring(offset, end));
		}
	}
	return(setStr);
}


if (root.location.href.indexOf('http://www.ganjawars.ru/warlist.php') >= 0) {
	var umelka = getCookie('umelka');

	 var input = getInput('»');
	 input.setAttribute('id', 'button');

	// текст
	var p = document.createElement('span');
	p.appendChild(document.createTextNode(', умелка '));
	input.parentNode.insertBefore(p, input);
	
	
	var select = document.createElement('select');
	select.setAttribute('id', 'umelka');
	select.options[0] = new Option('Отключить', '0');
	for (i = 5; i < 20; ++i) {
		select.options[i-4] = new Option('до '+i, i);
		if (umelka != null && umelka != '' && umelka == i) {
			select.options[i-4].selected = true;
		}
	}
	input.parentNode.insertBefore(select, input);

	/*firefox bug fix*/
	root.document.getElementById('button').onclick = function () {
		setCookie('umelka', select.value);
	}
	var uvalue = parseInt(select.value);
	if (uvalue != null && uvalue != '' && uvalue != 0) {
		// начинаем парсить структуру


		var re   = /^.*?\((\d+)\)$/;
		var re2  = /\[(\d+)\]$/;
		var td   = root.document.getElementsByTagName('td');

		var virt_umka = 0;
		var fact_umka = 0;
		for (i = 0; i < td.length; ++i) {
			if (td[i].getAttribute('class') == 'txt' && (td[i].getAttribute('bgcolor') == '#d0f5d0' || td[i].getAttribute('bgcolor') == '#e0eee0')) {
				if (re2.test(td[i].innerHTML)) {
					var match  = re2.exec(td[i].innerHTML);
					virt_umka  = match[1] - 18;
				}
				if (re.test(td[i].innerHTML)) {
					var match  = re.exec(td[i].innerHTML);
					fact_umka  = match[1];
					var tr     = td[i].parentNode;
					var umka   = (virt_umka > fact_umka) ? virt_umka : fact_umka;
					if (umka > uvalue) {
						tr.style.display = "none";
					}
				}
			}
		}
	}


}

})();