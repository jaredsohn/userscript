// ==UserScript==
// @name        wofhcms
// @namespace   http://wofhcms.ru/
// @include     http://w15.wofh.ru/*
// @version     0.2
// @grant       none
// @require  http://code.jquery.com/jquery-1.8.3.min.js
// ==/UserScript==

//Подгрузка стилей 111
var link = window.document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'http://wofhcms.ru/css/style.css';
document.getElementsByTagName("HEAD")[0].appendChild(link);

var r2 = ""; //пища

$(document).ready(function() {

	//Обновление городов
	var obj_r2 = $("#myres .r2").parent();
	$(obj_r2).find("i").each(function(index) {
		if(index == 1) {
			r2 = $(this).html();
		}
	});
	
	
	/* $('.exnamesel').find("option").each(function(index) {
		alert($(this).val());
	}); */
	
	//Форма с экспортном данных
	$("#myres").append('<form id="main_export" action="http://wofhcms.ru/import/load_res.php" method="POST"></form>');
	$("#main_export").append('<input type="hidden" name="r2" value="' + r2 + '"/>');
	for (var key in list_towns) {
		$("#main_export").append('<input type="hidden" name="town[]" value="' + list_towns[key] + '"/>');
	}
	$("#myres").append('<div class="city_export_box"><a href="javascript:void(0);" class="start_export">Выгрузить</a><img class="loading_export" style="display:none;" src="http://wofhcms.ru/images/load.gif" /></div>');
	
	$('.start_export').live('click', function() {
		$('.start_export').hide();
		$('.loading_export').show();
		$('#main_export').submit();
	});

	//Функции для обратного взаимодействия
	//Вывод понели под ресурсами
	/* $("#myres").append('<div class="main_text"><a href="javascript:void(0);" class="cms_connect">Контакт</a><img class="loading" style="display:none;" src="http://wofhcms.ru/images/load.gif" /></div>');
	
	//отправляем информацию о городе на сайт
	$('.cms_connect').click(function() {
		$('.cms_connect').hide();
		$('.loading').show();
		$.getJSON("http://wofhcms.ru/import/check.php?callback=?", function(data){
			$('.main_text').html(data.text);
			$('.loading').hide();
		});
	}); */
});