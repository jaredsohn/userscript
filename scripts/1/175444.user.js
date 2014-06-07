// ==UserScript==
// @name       pixiv without login
// @version    1.2
// @description  
// @include      http://www.pixiv.net/*
// ==/UserScript==
function removeCSS(){
    var s = document.createElement('style');
    s.id = 'pixivWhoutLogin';
    s.innerHTML = '#login-introduction-modal { display: none !important; }';
    document.querySelector('head').appendChild(s);
}
function setHref(){
    a = $('.medium-image')[0];
    $(a).removeClass('require-login');
    $(a).removeClass('require-register');
    if($('.medium-image').attr('data-title')) {
        img = a.childNodes[0].src;
        img = img.replace('_m.', '.');
        a.href = img;
    }
}
setHref();
