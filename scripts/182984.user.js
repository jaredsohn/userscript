// ==UserScript==
// @name         ShortURL for unapproved edits
// @namespace    samosfator
// @version      1.0
// @include      http://www.google.com.ua/mapmaker*
// @include      https://www.google.com.ua/mapmaker*
// @include      http://www.google.com/mapmaker*
// @include      https://www.google.com/mapmaker*
// @require		 https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @description  Автоматично витягує і скорочує посилання на незатверджені правки з меню Мої Дії=>Переглядаються
// @copyright  2013, samosfator
// ==/UserScript==
$(document).ready(function () {
	//Додає кнопку "Короткі посилання"
	function append() {
		$('#kd-toolbar>#kd-browse-toolbar-button').after('<div id="kd-browse-toolbar-button" class="short pointer_cursor goog-inline-block hasMaxWidth jfk-button jfk-button-standard kd-toolbar-last-button jfk-button-clear-outline" ct="bt" cad="src:tb-browse;type:browse" role="button" style="-webkit-user-select: none; max-width: 250px; !important" tabindex="0" jstcache="0"><div jstcache="0">Короткі посилання</div>')
	}
	append();
	var notApprovedLength;
	var shortURL = [];
	var output = '';
	var main = function() {
		//Скільки є незатверрджених змін
		notApprovedLength = $("img[src='/mapmaker/mapfiles/tiny_marker_orange-k.png']").length; //Шукає скільки взагалі є незатверджених правок
		var longURL = [];
		console.log("Кількість знайдених незатверджених правок = " + notApprovedLength);
		for (var i = 0; i < notApprovedLength; i++) { //Скільки є незатверджених правок - стільки й посилань брати з div.header
			longURL[i] = $("div.header>a.pointer_cursor").eq(i)[0].href;
			console.log(i);
		}
		//Для кожного посилання з масиву longURL створювати коротке
		$.each(longURL, function(k, url) {
			$.ajax({
				url: 'https://www.googleapis.com/urlshortener/v1/url?shortUrl=http://goo.gl/fbsS&key=AIzaSyANFw1rVq_vnIzT4vVOwIw3fF1qHXV7Mjw',
				type: 'POST',
				contentType: 'application/json; charset=utf-8',
				data: '{ longUrl: "' + url +'"}',
				dataType: 'json',
				success: function(response) {
					//Якщо успіх - записувати коротке в масив shortURL
					shortURL[k] = response.id;
				}
			});
		});
	}
	main();

	//Якщо клацнули по кнопці "Короткі посилання"
	$('#kd-browse-toolbar-button[style*="max-width: 250px;"]').click(function() {
		//То вставити блок з короткими посиланнями
		$('div.item').eq(0).before('<div class="item" id="panel_7_1"> <div class="gw-feature-summary"> <div class="icon"> <img src="/mapmaker/mapfiles/note-icon-k.png"> </div> <div class="header"> <a class="title">Короткі посилання на незатверджені зміни:</a></div> <div class="stream"> <div style="display:"> <div class="action edit"> <div><span class="hc" uid="211700403834496622904"><textarea id="shortList" cols="65" rows="15" readonly="" autofocus="" onclick="this.focus();this.select()">asda</textarea></span> <div class="content-end"></div> </div> </div> <div class="action"> </div> </div> </div> </div> </div>')
		//Бере короткі посилання і зліплює в одну змінну з переносом рядка
		for (var i = 0; i < notApprovedLength; i++) {
			output += shortURL[i] + '\n';
		}
		$('textarea#shortList').text(output);
	});
	/*
	$('.header>span').click(function() {
		console.log('wow! clicked');
		$('.gw-feature-summary').eq(0).hide();
		console.log('never see if not hide');
	});
	*/
});