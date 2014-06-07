// ==UserScript==
// @name        vk.com audio tagger
// @namespace   http://sovietgroove.com/
// @version     0.1
// @description Подписывает аудио-треки ВКонтакте (vkontakte.ru) своей подписью
// @match       http://vk.com/audio
// @match       http://vk.com/audios-*
// @match       http://vk.com/audio?album_id=*
// @copyright   2013+, Pavel Vlasov
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

// настройки

// текст подписи
var signa = "vk.com/rockbreaks";

// процесс подписывания будет остановлена на первом треке где сигна уже проставлена (если true)
var stop_on_first_tagged = true;

// ограничение на кол-во треков которые будут обработаны
// если значение ноль илм меньше - ограничения нет
var max_audios = 0;

// таймаут (мс), выжидаемый для того чтобы браузер успел убрать диалоговое окошко, например
// заодно чтобы ВК не стал нас излишне подозревать
var timeout = 500;

// функция подписывает один трек
// ей передаётся функция подписывающая следующий трек (next)
function tag_audio(audio_edit_wrap, next) {
    // перемещаем мышь над нужным аудио-треком
    $(audio_edit_wrap).mouseover();
    // нажмем на появившуюся конку "карандашика"
    $(audio_edit_wrap).find(".audio_edit").click();
    setTimeout(function() {
        // здесь должен уже появиться диалог редактирования трека: артист, название и дополнительно
        // ссылка "Дополнительно" открывает textarea лирики/комментария
        $("#audio_extra_link .fl_r").click();
        setTimeout(function() {
            var edit = $("#audio_text_edit");
            var do_next = true;
            if (edit.val().indexOf(signa) >= 0) {
            	if(stop_on_first_tagged) {
                    do_next = false;
            	}
            } else {
                edit.val(signa);
            }
            // закрываем диалог
            $(".box_controls .button_blue button").click();
            // уводим мышь
            $(audio_edit_wrap).mouseout();
            if (do_next) {
            	setTimeout(function() {
            		next();
            	}, timeout);
            }
        }, timeout);
    }, timeout);
}

function reversed(jq) {
	return $(jq.get().reverse());
}

function tag_audio_consequntly(jq) {
	function make_tag_function(item, f) {
		return function() { tag_audio(item, f); }
	}
	var f = function() {}
	reversed(jq).each(function() {
		f = make_tag_function(this, f);
	});
	f();
}

// UI setup

var tag_button = $("<button>Подписать</button>");
tag_button.click(function() {
	var aews = $('div.audio .audio_edit_wrap');
    if (max_audios > 0) aews = aews.slice(0, max_audios);
	tag_audio_consequntly(aews);
});
$("#audio_albums").append("<hr/>");
$("#audio_albums").append("<p>Текст подписи:</p>");
$("#audio_albums").append("<textarea disabled>" + signa + "</textarea>");
$("#audio_albums").append(tag_button);
