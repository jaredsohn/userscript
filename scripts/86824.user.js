// ==UserScript==
// @name                oper.ru adblock
// @description         Скрипт удаляет рекламу
// @include     http://oper.ru/*
// @include     http://*.oper.ru/*
// ==/UserScript==


function remove_ads(){
    var banners;
    var banner_classes = ['banner', 'bottombanners'];
    for (var i = 0; i < banner_classes.length; i++) {
        banners = document.getElementsByClassName(banner_classes[i]);
        for (var j = 0; j < banners.length; j++) {
            banners[j].innerHTML = "";
        };
    };
    
    var banner;
    var banner_ids = ["left", "right",  "topbanner"];
    for (var i = 0; i < banner_ids.length; i++) {
        banner = document.getElementById(banner_ids[i]);
        banner.innerHTML = "";
        banner.parentNode.removeChild(banner);
    };
}

remove_ads();

