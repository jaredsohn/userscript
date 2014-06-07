// ==UserScript==
// @name        iGoogle Cleaner
// @description iGoogle Cleaner removes the top navigation bar (login/logout, images, maps, news, ...)
// @include     http://www.google.*/*
// @include     http://google.*/*
// ==UserScript==
document.getElementById('gbar').style.display='none';
document.getElementById('guser').style.display='none';
divs = document.getElementsByTagName('div');
for (var i=0; i<divs.length; i++) {
    var div = divs[i];
    if (div.getAttribute('class') == 'gbh') {
        div.style.display='none';
    }
}