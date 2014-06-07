// ==UserScript==
// @name          photosight_infscroll
// @description   Бесконечный скроллинг на сайте photosight.ru
// @author        Sergei Kuznetsov
// @version       1.0
// @namespace     net.setor.photosignt
// @include       http://www.photosight.ru/*
// ==/UserScript==

var scrollerTask = function () {

	var GRID_SELECTOR     = '.photolist';
	var PAGER_SELECTOR    = '.pages.width720.mb20';
	var NEXTPAGE_SELECTOR = PAGER_SELECTOR + ' .fr.ar a';

	var DEBUG_MODE = false;

	var stop    = false;
	var pause   = false;
	var _window = null;
	var jQuery  = null;

	var log = function (msg) {
		if (DEBUG_MODE) {
			console.log('Photosight: ' + msg);
		}
	};

	var hasPhotoGrid = function () {
		console.log(jQuery);
		return ( jQuery(PAGER_SELECTOR).size() > 0 );
	};

	var scrollPhotoGrid = function () {

		if (stop) {
			log('stop');
			return;
		}
		else if (pause) {
			log('pause');
			return;
		}

		// Предотвращаем запуск данной ф-ции несколько раз единовременно
		pause = true;

		// Если осталась только ссылка "предыдущая"
		if ('Предыдущая' == jQuery(NEXTPAGE_SELECTOR).text()) {
			stop = true;
			return false;
		}

		var nextPage = jQuery(NEXTPAGE_SELECTOR).attr('href');

		if (!nextPage) {
			log('pager not found');
			stop = true;
			return;
		}

		log('pager found: ' + nextPage);

		jQuery.get(nextPage, function (data) {

			_window.history.replaceState(nextPage, document.title, nextPage);

			var jData = jQuery(data);

			// Дополняем текущий список новыми фотками
			jQuery(GRID_SELECTOR).append(jData.find(GRID_SELECTOR).html());

			// Заменяем старый пагинатор новым
			jQuery(PAGER_SELECTOR).html(jData.find(PAGER_SELECTOR).html());

			log('ok');

			pause = false;
		});
	};

	if (typeof unsafeWindow != 'undefined') {
		_window = unsafeWindow;
		jQuery  = unsafeWindow.jQuery;
	}
	else {
		_window = window;
		jQuery  = _window.jQuery;
		$.noConflict();
	}

	log('start');

	// не запускаем скрипт во фреймах
	if (_window.self != _window.top){
		log('frame');
		return;
	}
	else if (!hasPhotoGrid()) {
		log('pager not found');
		return;
	}

	jQuery(document).scroll(function () {
		var scrollMaxY = document.documentElement.scrollHeight - document.documentElement.clientHeight;

		// Start loading approx 200px from the end of the page.
		if (window.scrollY > scrollMaxY - 200) {
			scrollPhotoGrid();
		}
	});
};

if (navigator.userAgent.match(/Firefox/)) {
	unsafeWindow.onload = scrollerTask;
}
else if (navigator.userAgent.match(/Chrome/)) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js");
	script.addEventListener('load', function () {
		var script = document.createElement("script");
		script.textContent = "(" + scrollerTask.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}
else {
	alert("I do not know what to do :(");
}