// ==UserScript==
// @name           HWM_AH_Announce_Unused_Lots
// @author         Рианти
// @description    Скрипт запускается на странице рынка. Периодически её обновляет, сообщает о неиспользуемых лотах.
// @version        1
// @include        http://www.heroeswm.ru/auction.php
// @include        http://www.heroeswm.ru/auction.php#A
// ==/UserScript==

//====Настройки====//
var _maxLots = 6; // Максимальное количество лотов. Скрипт будет уведомлять если лотов меньше.
var _refreshRate = 120; // Периодичность обновления страницы рынка. В секундах. Не меньше 60 секунд.
var _enableAlert = 1; // Уведомлять при помощи всплывающего сообщения? 1 - да, 0 - нет
var _enableSoundAlert = 1; // Уведомлять звуком? 1 - да, 0 - нет
var _soundSrc = 'http://www.soundjay.com/button/beep-1.wav'; // Используемый в уведомлении звук. Можно спокойно заменять.
//=================//

if (window.location.hash == '#A' && document.querySelectorAll('tr.wb').length < _maxLots){
    if (_enableSoundAlert) new Audio(_soundSrc).play();
    if (_enableAlert) alert('Доступны свободные лоты');
} else {
    setTimeout(function () {
        window.location.hash = "#A";
        location.reload();
    }, _refreshRate * 1000);
}
