// ==UserScript==
// @name        Godville digging script
// @namespace   godville
// @include     http://godville.net/superhero
// @version     0.1 beta
// @grant       none
// ==/UserScript==

var mainTimeout; // главный таймер
var log_msg;
$(function (){
    //setTimeout(main, 1000);
    var delay = setInterval(function(){
        btn_text = '<button id="btn-dig" style="font-size:11px; line-height:11px; float:left; margin-right:10px;">Копать</button>';
        msg_text = '<span class="dig-msg"></span>';
        $("#control .block_content").append('<div id="dig-content" style="height:15px;">' + btn_text + msg_text + '</div>');
        
        $( "#btn-dig" ).click(function() {

            if ($(this).html() == "Копать"){
                $(this).html("Не копать")
                mainTimeout = setTimeout(main, 1000);
            } else{
                $(this).html("Копать");
                log_msg.fadeTo( 500, 0 );
                clearTimeout(mainTimeout);
            }
               
        });
        
        log_msg = $('#dig-content .dig-msg');
        clearInterval(delay);
    }, 2000);
    
});


var intervalID; // интервал для ожидания 2-3 секунд перед появлением ответа на глас
var phrase = 'копай'; // пока что программирую только логику для копания


function main() {
    // прана
    str = $("#cntrl .gp_val").text(); // получаем значение праны с процентами [90%]
    str = str.substring(0, str.length - 1); // убираем проценты [90]

    // здоровье
    health = $("#hk_health .l_val").text().split('/'); // получаем значение [текущего здоровья] / [макс. здоровья] -> разбиваем на значения в массив
    health[0] = $.trim(health[0]); // убираю все пробелы
    health[1] = $.trim(health[1]); // убираю все пробелы
    
    // надпись направления или что герой в городе
    var town_text = $("#hk_distance .l_capt").text(); // получаем одно из значений [Столбов до столицы | Столбов от столицы | Город]
    
    // не сражается ли с монстром
    var not_in_fight = $('#news .l_capt').is(':hidden'); // скрыта надпись с именем монстра (значит игрок не сражается)

    // главная проверка
    if(str >= 5 && not_in_fight && town_text != 'Город'){
        // && (health[0] < 10 || health[0] == health[1])
        // (town_text == 'Столбов от столицы' || town_text == 'Столбов до столицы' )
        message("говорим делать что-то");
        
        // вписываем фразу в поле
        $('#god_phrase').val(phrase);
        // нажимаем кнопку (говорим фразу герои)
        $('#voice_submit').click();
        
        message("click");
        
        message('ждем 3 сек');
        // ждем 3 секунды пока появится ответ героя (сразу скрип не улавливает его)
        intervalID = setInterval(getit, 3000);
        
    }else{
        // не прошли главную проверку
        // ждем еще 5 секунд и заново проверяем
        mainTimeout = setTimeout(main, 5000);
        message("ждем 5 сек");
    }
}

function getit() {
    // достаем сообщение в ленте
        //message('getit();');
        
        // достаем последнее сообщение в ленте
        var last_message = $(".d_content .line.d_line:first-child .d_msg").text();
        
        message(last_message);
        var substr = last_message.indexOf(phrase) != -1 ? 'подстрока найдена' : 'подстрока НЕ найдена';
        message(substr);
        
        // очищаем интервал (а то будет бесконечно выполняться)
        clearInterval(intervalID)
        
        //если в строке действий есть наша фраза то герой ничего не сделал
        if(last_message.indexOf(phrase) != -1){
            // герой ничего не сделал - перезапускаем весь скрип еще раз
            mainTimeout = setTimeout(main, 5000);
            message("не сделал, запускаем еще раз действие");
        }else{
            // герой сделал то что просили
            // можно повторить только после 60 секунд
            message("сделал то что просили, ждем 60 сек");
            mainTimeout = setTimeout(main, 61000);
        }
        
}
function message(msg){
    log_msg.stop(true).fadeTo( 500, 0 ).text(msg).fadeTo( 500, 1 );
}