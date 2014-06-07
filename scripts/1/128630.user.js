// Topic Author Highlighter
// by Yuriy Babak aka Inversion (http://inversion.habrahabr.ru/), mailto: yura.des@gmail.com
// based on http://userscripts.org/scripts/show/29991 by TiGR

// ==UserScript==
// @name         Topic Author Highlighter
// @version      2.0.1.2
// @namespace    Habrahabr
// @description  Подсвечивает комментарии автора топика
// @include      http://habrahabr.ru/*
// ==/UserScript==

/* --------------------------------------------------------------------------------

v2.0.1 (09.12.12)
- fixed: подсветка не срабатывала на некоторых страницах

v2.0.0 (14.09.12)
- (Opera) fixed: иногда скрипт крашится из-за того, что $ еще не определен на момент исполнения скрипта (сообщение от хабраюзера CaptainFlint)
- fixed: скрипт не срабатывал, если около имени автора топика есть ссылка G+
- changed: цвет подсветки изменен на менее насыщен (замечание от CaptainFlint)
- код сильно изменен, из-за чего увеличена мажорная версия

v1.0.1 (14.04.12)
- добавлена поддержка Opera
	
v1.0 (18.03.12)
- public release

---------------------------------------------------------------------------------- */

"use strict";

!function(win) {
	if (window != window.top) return
	var doc = win.document
	
	// on ready
	var f_on_ready_done = false
	function on_ready($) {
		if (f_on_ready_done) return false
		f_on_ready_done = true
		
		// comments present on page
		if ($('#comments')[0]) {
			$('<style>\
				.info.topic_author {background-color:#FFEFEF} \
				.info.topic_author.is_new {background-color:#efd9ef !important} \
			</style>').appendTo('head')
			
			var authorName = $('.infopanel .author a:first, div.vcard .nickname span').text()
			
			$('#comments div.info .username, #comments ul.info .username a').each(function(){
				var uName = $(this)
				if (uName.text() == authorName) {
					uName.parent('.info').addClass('topic_author')
					uName.parents('ul.info:first').addClass('topic_author')
				}
			})
		}	// comments present on page
	}   // on_ready
	
	// waiting for jQuery
	var t_waiting_for_jQuery = setInterval(function() {
		if (win.jQuery) {
			clearInterval(t_waiting_for_jQuery)
			var $ = win.jQuery
			
			if ($('#comments_form').length>0) {
				on_ready($)
			}
			else {
				$(doc).ready(function() {
					on_ready($)
				})
			}
			
		} // if (win.jQuery)
	}, 50) // setInterval
	    
}(typeof unsafeWindow == 'undefined' ? window : unsafeWindow)
