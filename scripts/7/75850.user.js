// ==UserScript==
// @name           HabraReader
// @namespace      http://userscripts.org/users/vanishsevsk
// @description    HabraHabr like GoogleReader
// @include        http://*habrahabr.ru/*
// ==/UserScript==

(function(){
    //Global var
	var hentry = document.querySelectorAll('div.hentry');
	
	//If not list then exit
	if (!hentry || hentry.length < 2) return;
    
	//AJAX object
	xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', getPage, false);
    
	//Add style
	var style = document.createElement('style');
	style.innerHTML = " .hentry{border:2px transparent solid;-webkit-border-radius:8px;-moz-border-radius:8px}";
    style.innerHTML += " .hentry:hover{border-color:#D3E2F0}";
	document.body.appendChild(style);
    
	//Events
	document.addEventListener('scroll', scrollMain, false);
    window.addEventListener('keydown', keyPress, false);
    for (var i = 0; i < hentry.length; i++) 
		hentry[i].addEventListener('click', clickHentry, false);
})();

function scrollMain(){
	var posNav = document.querySelector("#main-content div.page-nav").offsetTop;
	var posWin = window.pageYOffset + document.body.clientHeight;
	//100px - don't see navigation page
    if (posWin > posNav - 100) {
        var next = document.querySelector('#main-content a.next');
        if (next && (xhr.readyState == 4 || xhr.readyState == 0)) {
            xhr.open("GET", next.href);
            xhr.send();
        }
    }
}

function getPage(){
    if (xhr.readyState == 4) {
        var main = document.querySelector('#main-content');
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = xhr.responseText;
        var hentry = tempDiv.querySelectorAll("#main-content div.hentry");
        var pageNav = main.querySelector("div.page-nav");
        var entryInfo;
        for (var i = 0; i < hentry.length; i++) {
            //Remove double hentry
            entryInfo = hentry[i].querySelector('div.entry-info');
            if (entryInfo && document.querySelector('#' + entryInfo.id))
				continue;
            hentry[i].addEventListener('click', clickHentry, false);
            main.insertBefore(hentry[i], pageNav);
        }
        pageNav.innerHTML = tempDiv.querySelector("div.page-nav").innerHTML;
    }
}

function clickHentry(e){
	if (e.target.tagName.toUpperCase() != 'A') this.scrollIntoView(true);;
}

function keyPress(event){
    if (event.target.tagName.toUpperCase() == 'INPUT') 
        return;
    switch (event.keyCode) {
        case 190:
            moveHentry('next');
            break;
        case 188:
            moveHentry('prev');
    }
}

function moveHentry(direction){
    var hentry = document.querySelectorAll("#main-content div.hentry");
    var pos = window.pageYOffset;
    switch (direction) {
        case 'next':
            for (var i = 0; i < hentry.length; i++) {
                if (hentry[i].offsetTop > pos) {
                    hentry[i].scrollIntoView(true);;
                    return;
                }
            }
			window.scrollTo(window.pageXOffset,document.documentElement.scrollHeight);
            break;
        case 'prev':
            for (var i = hentry.length - 1; i >= 0; i--) {
                if (hentry[i].offsetTop < pos) {
                    hentry[i].scrollIntoView(true);
                    return;
                }
            }
			window.scrollTo(window.pageXOffset,0);
    }
}