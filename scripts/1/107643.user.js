// ==UserScript==
// @namespace       heroeswm
// @name            HWM Wars Cards Time
// @description     Добавление часов/таймера на страницы битв и карточных игр.
// @version         2.2.2
// @include         http://www.heroeswm.ru/war.php*
// @include         http://www.heroeswm.ru/warlog.php*
// @include         http://www.heroeswm.ru/cgame.php*
// ==/UserScript==


/** Функции работы со временем
*
* @file libTime.js
* @version 1.0.3
* @author hotamateurxxx
* @license GPL
*/


/** Строка текущего времени
* @param Number time
* @return String
*/
function getTimeStr(time) { 
    return (new Date(time)).toLocaleTimeString(); 
}


/**
*/
function Time() {}


/** Строка времени
* @param Date time
* @return String
*/
Time.toString = function(time) {
    time = (time === undefined) ? (new Date()) : time;
    return (time).toLocaleTimeString(); 
}


/**
* @param Date time
* @return Number
*/
Time.toNumber = function(time) {
    time = (time === undefined) ? (new Date()) : time;
    return Math.floor(time.getTime() / 1000);
}


/**
* @param Number num
* @return Date
*/
Time.fromNumber = function(num) {
    return new Date(num * 1000);
}


/** Интервал времени строкой
* @param Number value Интервал в милисекундах
* @return String
*/
Time.delayString = function(value) {
    var sign = (value < 0) ? '-' : '';
    value = Math.abs(value);
    var unit = 'милисекунд';
    var divs = [
        {value: 1000, unit: 'секунд'},
        {value: 60, unit: 'минут'},
        {value: 60, unit: 'часов'},
        {value: 24, unit: 'суток'}
    ]
    var text = value.toFixed(1) + ' ' + unit;
    for (var i in divs) {
        if (value < divs[i].value)
            break;
        value = value / divs[i].value;
        unit = divs[i].unit;
        text = value.toFixed(1) + ' ' + unit;
    }
    return sign + text;
}



if (document.body !== null) {
    
    // Добавляем таймер
    var div = document.createElement('div');
    div.id = 'hwmWarsCardsTime';
    div.style.display = 'block';
    div.style.position = 'fixed';
    div.style.margin = '0px';
    div.style.padding = '5px';
    div.style.paddingLeft = '10px';
    div.style.paddingRight = '10px';
    div.style.top = '0px';
    div.style.left = '0px';
    div.style.width = '90px';
    div.style.height = '30px';
    div.style.border = 'solid 1px #cccccc';
    div.style.background = '#ffffff';
    div.style.cursor = 'pointer';
    document.body.appendChild(div);
    
    var p = document.createElement('p');
    p.style.margin = '0px';
    p.style.padding = '0px';
    p.style.width = '100%';
    p.style.fontSize = '24px';
    p.style.textAlign = 'right';
    p.style.cursor = 'pointer';
    div.appendChild(p);
    
    var time = new Date();
    
    
    function updateTime() {
        if (GM_getValue('showCurrent', true)) {
            var s = Time.toString();
        } else {
            var timeDif = (new Date()).getTime() - time.getTime();
            var hrs = Math.floor(timeDif / 1000 / 60 / 60) % 24;
            var mns = Math.floor(timeDif / 1000 / 60) % 60;
            var scs = Math.floor(timeDif / 1000) % 60;
            var s = String(scs);
            if (mns + hrs > 0) {
                if (scs < 10) s = 0 + s;
                s = mns + ':' + s;
            }
            if (hrs > 0) {
                if (mns < 10) s = 0 + s;
                s = hrs + ':' + s;
            }
        }
        p.textContent = s;
    }
    
    
    function toggleTime() {
        GM_setValue('showCurrent', !GM_getValue('showCurrent', false));
        updateTime();
    }
    
    
    div.onclick = function() {
        GM_log(Time.toString() + ' ' + 'Смена режима (часы/таймер).');
        toggleTime();
    };
    
    
    setInterval(updateTime, 1.0 * 1000);
    updateTime();
    
}