// ==UserScript==
// @name          WaniKani Linker
// @namespace     http://www.wanikani.com
// @description   WaniKani Linker by Alucardeck
// @version 0.31
// @include       http://www.wanikani.com/*
// @grant       none
// ==/UserScript==
function get(id) {
    if (id && typeof id === 'string') {
        id = document.getElementsByClassName(id);
    }
    return id || null;
}

function add(){
var node = get("nav pull-right");
        
    var li = document.createElement('li');
    li.className = 'title';
    var etoeto_a = document.createElement('a');
    etoeto_a.href = 'http://etoeto.com/browse/';
    etoeto_a.target = '_blank';
    etoeto_a.style.paddingBottom = '2px';
    etoeto_a.style.paddingTop = '3px';
    var etoeto_img = document.createElement('img');
	etoeto_img.src = 'http://cdn.etoeto.com/images/top-bear.png';
    
    li.appendChild(etoeto_a);
    etoeto_a.appendChild(etoeto_img);

    var tofugu_a = document.createElement('a');
    tofugu_a.href = 'http://www.tofugu.com/';
    tofugu_a.target = '_blank';
    tofugu_a.style.padding = '0px';
    etoeto_a.style.paddingBottom = '2px';
    var tofugu_img = document.createElement('img');
	tofugu_img.src = 'http://www.tofugu.com/wp-content/uploads/2007/06/tofugu1.png';
    
    li.appendChild(tofugu_a);
    tofugu_a.appendChild(tofugu_img);
    
    var textfugu_a = document.createElement('a');
    textfugu_a.href = 'http://www.textfugu.com/dashboard/';
    textfugu_a.target = '_blank';
    textfugu_a.style.padding = '0px';
    var textfugu_img = document.createElement('img');
	textfugu_img.src = 'http://img404.imageshack.us/img404/1171/n0k9.jpg';
    
    li.appendChild(textfugu_a);
    textfugu_a.appendChild(textfugu_img);
    
    
	node[1].appendChild(li);
}

add();