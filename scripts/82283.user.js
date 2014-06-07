// ==UserScript==
// @name                Image board image links
// @description         Lists all image/gif links in the thread. The list then can be passed to the download manager, e.g. wget.
// @include     http://*.4chan.org/*
// @include     http://2-ch.ru/*
// @include     http://iichan.ru/* 
// @include     http://www.iichan.ru/* 
// @include     http://dobrochan.ru/* 
// ==/UserScript==

function insertAfter(newChild, refChild) { 
    refChild.parentNode.insertBefore(newChild,refChild.nextSibling); 
}

function list_links(pt){
    var text_area = document.getElementsByTagName('textarea');
    if(text_area){
        text_area = text_area[0];
    }
    else{
        return;
    }
    text_area.value += "\n";
    var imgs = document.getElementsByTagName('img');
    var len = imgs.length;
    var href;
    for(var i = 0; i < len; i++){
        if(imgs[i].parentNode.tagName.match(/^a$/i)){
            href = imgs[i].parentNode.href;
            if(href.match(pt)){
                text_area.value += href + "\n";
            }
        }
    }
}

function list_gifs(){
    list_links(/.gif$/i);
}

function list_images(){
    list_links(/.(gif|jpg|jpeg|png)$/i);
}

function list_music_links(){
    list_links(/.(mp3|ogg|wma)$/i);
}

function init(){
    var text_area = document.getElementsByTagName('textarea');
    if(text_area){
        text_area = text_area[0];
    }
    else{
        return;
    }
    var d = document.createElement('div');

    var buttons = [
        ["Gif links", list_gifs], 
        ["Image links", list_images], 
        ["Music links", list_music_links]
    ];
    var btn;
    for(var i = 0; i <= 2; i++){
        btn = document.createElement('button');
        btn.innerHTML = buttons[i][0];
        btn.type = 'button';
        btn.addEventListener("click", buttons[i][1], true);
        d.appendChild(btn);
    }


    insertAfter(d, text_area);
}

init();
