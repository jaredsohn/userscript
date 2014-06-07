// ==UserScript==
// @name        vk.com shake_twist
// @namespace   http://vk.com/shake_twist
// @version     0.3
// @description Подписывает аудио-треки ВКонтакте (vkontakte.ru) своей подписью
// @match       http://vk.com/audios-1246843*
// @match       http://vk.com/audio?id=-1246843*
// @copyright   2013+, Pavel Vlasov
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

// настройки

// текст подписи
//var signa = "СОВЕТСКИЙ ШЕЙК - http://vk.com/shake_twist";
//var signa = "-= ROCK w/ BREAKS =-\nhttp://vk.com/rockbreaks";
var signa = "СОВЕТСКИЙ ШЕЙК - http://vk.com/shake_twist";

var pattern = /vk\.com|vkontakte\.ru/i;
//var pattern = /nevermatchednevermatchednevermatched/;

var preserve_content = true;

// процесс подписывания будет остановлена на первом треке где сигна уже проставлена (если true)
var stop_on_first_tagged = true;
//var stop_on_first_tagged = false;

// ограничение на кол-во треков которые будут обработаны
// если значение ноль илм меньше - ограничения нет
var max_audios = 0;

// таймаут (мс), выжидаемый для того чтобы браузер успел убрать диалоговое окошко, например
// заодно чтобы ВК не стал нас излишне подозревать
var timeout = 900;

String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};

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
            var do_save = false; // press "save" or "cancel"
            if (edit.val().match(pattern)) {
            	if(stop_on_first_tagged) {
                    do_next = false;
            	}
            } else {
                var s = preserve_content ? edit.val().trim() : "";
                if (s.length > 0) s += "\n\n";
                s += signa;
                edit.val(s);
                do_save = true;
            }
            setTimeout(function() {
                // закрываем диалог
                var btn_close = do_save ? $(".box_controls .button_blue button") : $(".box_controls .button_gray button");
                btn_close.click();
                // уводим мышь
                $(audio_edit_wrap).mouseout();
                if (do_next) {
                    setTimeout(function() {
                        next();
                    }, timeout);
                }
            }, timeout);
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
	jq = reversed(jq);
    jq.each(function() {
		f = make_tag_function(this, f);
	});
	f();
}

// UI setup

var tag_button = $("<button>Подписать</button>");
tag_button.click(function() {
	var aews = $('div.audio .audio_edit_wrap');
    if (max_audios > 0) aews = aews.slice(0, max_audios);
    //aews = aews.slice(50, 9999);
    
    //if (aews.size() == 50) {
    //    alert("Ровно 50 треков - это неправильно!");
    //} else {
		tag_audio_consequntly(aews);
    //}
});
tag_button.attr('title', signa);
var pp = $("#side_bar ol");
//var p = $("#audio_albums");
var p = $("<li></li>");
pp.append(p);
//p.css({"margin-left":"-50px"});
//p.append("<hr/>");
//p.append("<p>Текст подписи:</p>");
//p.append("<textarea disabled>" + signa + "</textarea>");
p.append(tag_button);