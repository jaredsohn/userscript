// ==UserScript==
// @name       Количество Яндекс.Электричек
// @namespace  http://rasp.yandex.ru/
// @version    0.1
// @description  показывает количество поездов
// @include    /^(http:\/\/)?rasp\.yandex\.ru\/search.+$/
// ==/UserScript==

function getTrainCount() {
    var trains = document.getElementsByTagName('tr');
    var i, result = 0;
    for(i in trains) {
        if((' '+trains[i].className+' ').indexOf('b-timetable__row') > -1)
            result++;
    }
    return result;
}

var headers = document.getElementsByTagName('h1');
var i, result = 0;
for(i in headers) {
    if((' '+headers[i].className+' ').indexOf('b-page-title__title') > -1) {
        headers[i].innerHTML = headers[i].innerHTML + ' (<font color="blue">' + getTrainCount() + ' шт</font>)';
        break;
    }
}
