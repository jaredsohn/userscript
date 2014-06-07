// ==UserScript==
// @name           file.qip.ru link shown direct lnk and autodownloader
// @namespace      http://userscripts.org/scripts/show/90960
// @updateURL      https://userscripts.org/scripts/source/90960.meta.js
// @include        http://file.qip.ru/*/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js?ver=1.5.1
// @version        2.2
// @history        2.2 Добавлен универсальный include
// @history        2.1 Скрипт beautifuli'зирован
// @history        2.0.1 Красивость кода и добавлены пути срабатывания.
// @history        2.0 Теперь версия с jquery
// @history        1.0 Релизная версия с опцией автоматического скачивания.
// ==/UserScript==

var autodownload=true; //true - auto download ON, false - autodownload OFF

$('.premalert').after().load($('.dbtn').attr('href') + " #divDLStart >a").ajaxComplete(function () {
	var $lnk = $('.premalert').find('a');
	var $getter = {
		go: function () {
			$lnk.text('Скачать данный файл').css({
				fontSize: '18px'
			}).after("<input type='text' value=" + $lnk.attr('href') + " size=" + ($lnk.attr('href').length + 15) + ">");
		}
	};
	if (autodownload) {
		location.href = $lnk.attr('href');
	};
	$getter.go();
});