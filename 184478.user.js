// ==UserScript==
// @id             toster.ru-84bc9c7f-54f5-47c4-bf32-5a3471bc219c@scriptish
// @name           Toster disliker
// @version        1.0
// @namespace      http://userscripts.org/users/Kilowatt
// @author         Kilowatt@userscripts
// @description    https://github.com/Pmmlabs/toster
// @include        http://toster.ru/*
// @run-at         document-end
// ==/UserScript==
$ = unsafeWindow.$;
minuscount = (localStorage['minuscount'] || 100)
if (location.pathname == "/my/profile") { /* в профиле добавить настройку */
	$($('.field')[0]).before('<div class="field"><div class="field-label">Скрывать сообщения, если минусов больше чем</div><div class="field-content"><input type="text" maxlength="30" value="'+minuscount+'" class="field-text" id="minuscount"></div></div>');
	$('#minuscount').change(function(){ localStorage['minuscount']=$(this).val();});
}
else {
	hostname = "http://pmmlabs.ru"; // адрес, где расположен php скрипт и css файл
	$('head').append("<link rel='stylesheet' href='"+hostname+"/toster.css'>");
	$('.info').each(function (i) {
		if (location.pathname.indexOf('/q/') == 0) {	// если это страница с вопросом
			if (i == 0)
				id = location.pathname.split('/')[2]; // id вопроса получаем из адреса страницы
			else
				id= $(this).parent().attr('id').split('_')[1]; // id комментария - это вторая часть id родительского div-а
		} else						// если это страница со списком вопросов
			id = $(this).find('a')[0].pathname.split('/')[2];
		// Создание кнопочки минус
		$(this).prepend($("<div class='answer_like_link dislike' justid='"+id+"'></div>")
				.click(function() {
					$.getJSON(""+hostname+"/toster.php?q="+$(this).attr('justid')+"&callback=?");
					$(this).text((parseInt($(this).text()) || 0) + 1); // увеличиваем число дислайков
					$(this).addClass("liked");	// иконка закрашивается
					$(this).off('click');		// больше щелкать не надо
					return false;
				})
		);
		// запрос количества минусов
		$.getJSON(hostname+"/toster.php?q="+id+"&count&callback=?", (function() {
			var _id = id;
			return function (data) {
				hand = $('div[justid='+_id+']');
				if (data.count > 0) {
					hand.addClass('has_like');
					hand.text(data.count);
				}
				if (data.count > minuscount) hand.parent().parent().hide(); // скрытие плохих вопросов
			}
			})()
		);
	});
}