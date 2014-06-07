// ==UserScript==
// @id             tc.mail.ru
// @name           Task tracker tweak
// @version        0.5
// @namespace      task.corp.mail.ru
// @author         i.polyakov
// @description    Добавление некоторого функционала трекеру.
// @include        http://task.corp.mail.ru/*
// @run-at         document-end
// @icon           http://task.corp.mail.ru/favicon.ico

// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js

// @history        2012-10-22 - v0.5 - i.polyakov
//					* В режиме просмотра задач производится пересортировка столбцов, чтобы после номера задачи сразу шло его название, для удобного копирования этих столбцов
// @history        2012-09-16 - v0.4 - i.polyakov
//					* Обновлен jQuery
//					* Новый шаблон в комментариях.
//					* Наконец-то убран баг, что на поля не биндятся события после отправки сообщения. И удаление сохраненного значения после отправки.
// @history        2012-02-17 - v0.3 - i.polyakov
//					* Новый шаблон в комментариях.
//					* Хранение содержимого комментария в отдельной переменной для каждой задачи (чтобы не пересекались).
//					* Фокусировка в форму комментария при загрузке задачи.
//					* После отправки комментария заново генерировать шаблоны комментариев.
// @history        2012-01-26 - v0.2 - i.polyakov
//					* Предоставление большей ширины блоку с комментарием (перемещение над прикрепленными файлами). 
//					* Больше высота блока с описанием задачи. 
//					* Сохранение содержимого поля комментария между перезагрузками. 
//					* Добавлены быстрые комментарии над формой ввода комментария. 
// @history        2011-12-11 - v0.1 - i.polyakov - Первая версия. Создание нативных ссылок в левом меню вместо события onClick.
// ==/UserScript==

(function () {

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////	Меню
$('tr.leftMenu, tr.leftMenuActive').each(function(){
	var el = $(this);
	el.removeAttr('onMouseOut').removeAttr('onMouseOver');
	el.add(el.find(' > td')).css('cursor', 'default !important');
	var td = el.find(' > td').eq(1);
	var href = td.attr('onClick').match(/location\.href='(.+)';/)[1];
	el.find(' > td').removeAttr('onClick');
	td.wrapInner('<a href='+href+'>');
	td.find('a').css('display', 'block').css('text-decoration', 'underline').hover(function(){
		$(this).css('text-decoration', 'none');
	}, function(){
		$(this).css('text-decoration', 'underline');
	});
});

$('tr.leftMenu2, tr.leftMenu2Active').each(function(){
	var el = $(this);
	el.removeAttr('onMouseOut').removeAttr('onMouseOver');
	el.add(el.find('>td')).css('cursor', 'default !important');
	var href = el.attr('onClick').match(/location\.href='(.+)';/)[1];
	el.removeAttr('onClick');
	var td = el.find('>td').eq(2);
	td.wrapInner('<a href='+href+'>');
	td.find('a').css('display', 'block').css('text-decoration', 'underline').hover(function(){
		$(this).css('text-decoration', 'none');
	}, function(){
		$(this).css('text-decoration', 'underline');
	});
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////	Быстрые комментарии и сохранение комментария после обновления страницы
unsafeWindow.comment_textarea_css = {
	'background-color': '#EEEEEE',
	'border': '1px solid #2E78AD',
	'border-radius': '5px',
	'display': 'inline-block',
	'margin': '2px',
	'padding': '2px',
	'text-shadow': '1px 1px 1px #FFFFFF'
};
unsafeWindow.fast_comments = [
	'Залил на тест. ',
	'Перезалил на тест. ',
	'Смержил в транк. ',
	'Смержил в релиз. ',
	'Создал отдельную ветку. ',
	'Смержить в транк. '
];
unsafeWindow.comment_textarea_change = function(event) {
	var el = $(this)
	var value = el.val();
	var name = 'comment_content_'+el.attr('id');
	if (!value || value == "Введите комментарий") {
		GM_deleteValue(name);
		return;
	}
	GM_setValue(name, value);
};
unsafeWindow.comment_textarea_init = function(comment_textarea) {
	if (!comment_textarea.length)
		return false;
	var name = 'comment_content_'+comment_textarea.attr('id');
	// Дальше шаблоны комментариев
	var fast_comments_div = $('<div id="fast_comments"></div>');
	var fast_comment_a = $('<a href="#" onclick="var textarea = this.parentNode.nextSibling; textarea.value = this.innerHTML; textarea.focus(); return false;"></a>');
	fast_comment_a.css(unsafeWindow.comment_textarea_css);
	for (i in unsafeWindow.fast_comments) {
		fast_comment_a.clone().html(unsafeWindow.fast_comments[i]).appendTo(fast_comments_div);
	}
	fast_comments_div.insertBefore(comment_textarea);
	var comment_submit = $('#commentSubmit');
	comment_submit.on('click', function(event) {
		var interval_check = setInterval(function() {
			var comment_textarea = $('.formCommentField textarea[id^="comment_post_"]');
			if (comment_textarea.parent().find('#fast_comments').length)
				return;
			clearInterval(interval_check);
			GM_deleteValue(name);
			unsafeWindow.comment_textarea_init(comment_textarea);
		}, 100);
	});
	comment_textarea.on('keypress', function(event) {
		if (event.ctrlKey && event.keyCode == 13) {// Ctrl+Enter
			comment_submit.click();
		}
	}).on('keyup', unsafeWindow.comment_textarea_change);
	var comment_content = GM_getValue(name);
	if (comment_content)
		comment_textarea.val(comment_content);
	comment_textarea.focus();
	return true;
}
unsafeWindow.comment_textarea = $('.formCommentField textarea[id^="comment_post_"]');
unsafeWindow.comment_textarea_init(unsafeWindow.comment_textarea);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////	Просмотр таски
$('.formFileField').css('width', '');
$('#taskForm .tblRowFrame table div').css('height', '').css('overflow', '');
var footer_table = $('.pageMain > table > tbody > tr:eq(3) .blockCenter > table');
footer_table.find(' > colgroup').remove();
var tbody = footer_table.find(' > tbody');
footer_table.find('td.blockRight').prependTo(tbody);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////	Просмотр списка задач
var loc = document.location.href;
if (loc.indexOf('http://task.corp.mail.ru/task/list/folder') != -1) {
	var insert_cells = [];
	var after_cell = 0;
	var header = false;
	var header_cells = $('.tblHeader');
	for (var c = 0; c < header_cells.length; ++c) {
		if ($.trim(header_cells.eq(c).text()) == 'Название') {
			after_cell = c + 1;
			for (var k = after_cell - 3; k < after_cell; ++k) {
				insert_cells.push(k);
			}
			break;
		}
	}
	(function() {
		if (!after_cell || !insert_cells.length)
			return;
		$('.tblRow1, .tblRow2').each(function(i) {
			var tr = $(this);
			var cells = tr.find('.tblCell');
			var num_a = cells.eq(insert_cells[0] - 2).find('a');
			num_a.text('#' + num_a.text());
			for (var c in insert_cells) {
				cells.eq(after_cell - 1).after(cells.eq(insert_cells[c] - 1));
				if (!header)
					header_cells.eq(after_cell - 1).after(header_cells.eq(insert_cells[c] - 1));
			}
			if (!header)
				header = true;
		});
	})();
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

})();
