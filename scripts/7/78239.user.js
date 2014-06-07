// ==UserScript==
// @name                Vkontakte Indentation
// @description         enables indentation in posts
// @include     http://vkontakte.ru/*
// @include     http://*.vkontakte.ru/*
// @include     http://vk.com/*
// @include     http://*.vk.com/*
// ==/UserScript==


function insertAfter(newChild, refChild) { 
    refChild.parentNode.insertBefore(newChild,refChild.nextSibling); 
}

function replaceSpaces(){
    var t = document.getElementById(this.id.replace("_replace_button", ''));
    t.value = t.value.replace(/ /g, '\u00a0');
    return false;
}

function initVkindent(){
    var text_areas = document.getElementsByTagName('textarea');
    var b;
    for(var i = 0; i < text_areas.length; i++){
        b = document.createElement('button');
        b.innerHTML = 'replace spaces';
        b.type = 'button';
        b.style.display = 'block';
        b.id = text_areas[i].id + "_replace_button";
        b.addEventListener("click", replaceSpaces, true);
        insertAfter(b, text_areas[i]);
    }
}

initVkindent();
