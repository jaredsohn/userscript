// ==UserScript==
// @id             bnw.im-7b149c78-97de-43ea-912d-8269dedad15e@scriptish
// @name           BnW identicons
// @version        0.1
// @namespace      bnw.im
// @author         Pook Wow
// @description    Юзерскрипт сливает IP-адрес пользователя ближайшему путину
// @include        https://bnw.im/*
// @include        http://bnw.im/*
// @run-at         document-end
// ==/UserScript==

const identiconsServiceURL = 'https://sigil.cupcake.io/';
const identiconsParams = 'w=96';

function setAvatars(){
    var avatars = document.querySelectorAll('img.avatar');
    
    for (var i = 0; i < avatars.length; i++) {
        var username = avatars[i].src.match(/u\/([\w-]+)\/avatar/)[1];
        var src = identiconsServiceURL + username + '?' + identiconsParams;
        avatars[i].src = src;
    }
};

setAvatars();
