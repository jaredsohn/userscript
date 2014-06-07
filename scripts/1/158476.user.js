// ==UserScript==
// @name        LeperPressSoundHelper
// @namespace   http://kt.era.ee/lepra/
// @description Этот скрипт не надо устанавливать, см LeperPressSound
// ==/UserScript==

$("#socials").append("<div id='dummy'></div>");
function ding() {
    var sound = "http://www.soundjay.com/misc/small-bell-ringing-02.mp3";
    document.getElementById("dummy").innerHTML=
    "<embed src=\""+sound+"\" hidden=\"true\" autostart=\"true\" loop=\"false\" />";
}
function checkChange() {     
    var newValue = $('#Pic' + $('#game').data('guestid')).css('display');
    if (typeof(window.lastValue) != 'undefined' && window.lastValue != newValue) {
        ding();
    }
    window.lastValue = newValue;
}
setInterval(checkChange, 2000);
