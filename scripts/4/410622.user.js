// ==UserScript==
// @name        mikumiku
// @namespace   miku
// @description mikumikumiku
// @include     http://boards.4chan.org/*
// @version     1
// @grant       none
// ==/UserScript==\\
//aight here we go
window.onload = function () {
    function createCookie(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = '; expires=' + date.toGMTString();
        } 
        else var expires = '';
        document.cookie = name + '=' + value + expires + '; path=/';
    }
    function readCookie(name) {
        var nameEQ = name + '=';
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    function eraseCookie(name) {
        createCookie(name, '', - 1);
    }

    var div = document.createElement('div');
    document.body.appendChild(div);
    var image = document.createElement('img');
    if (image !== null && image !== 'undefined') {
        div.appendChild(image);
    } else {
        console.log('Error in creating image!');
        return false;
    }
    div.style.position = 'relative';

if(readCookie("img") == "" || readCookie("img") == null) { 
    if (image.src == '') {
        var h = prompt('Hello! It looks like this is the first time you/ve run this script! Please post a link to the image buddy you wish to have!');
        createCookie("img", h, 1000);
    }
} 
        image.src = readCookie("img");
        image.style.height = '300px';
        image.style.width = '300px';
        image.style.position = 'fixed';
        image.style.bottom = '0';
        image.style.right = '0';
        image.style.zIndex = '40';
    
}
