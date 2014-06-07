// ==UserScript==
// @name           FPSBanana Top Menu
// @namespace      BigDog
// @description    Adds a hovering menu at the top of the browser for basic 
// @include        http://www.fpsbanana.com/*
// @include        http://www.rtsbanana.com/*
// @include        http://www.rpgbanana.com/*
// @creator        BigDog(Nick)
// @version        1.0Beta
// ==/UserScript==


var main, newElement;
main = document.getElementById('main_table');
if (main) {
	
	var logo = document.createElement("div");
	logo.innerHTML = '<div style="width:800px;margin: 0 auto 0 auto;zoom:100%;padding:5px;' +
    'border-bottom:1px solid #0C151B; margin-bottom: 5px; border:1px solid #0C151B;' +
    'font-weight:bold; background: #132B38 url(http://image.hazardstrip.com/site/standardrow.gif) repeat-x top left; font-size:13px;' +
    'color: #ffffff;">' +
    '<a href="/forum">Forums</a> <span class="bit left grey">|</span> ' +
    '<a href="/games">Games</a> <span class="bit left grey">|</span> ' +
    '<a href="/guis">GUIs</a> <span class="bit left grey">|</span> ' +
    '<a href="/maps">Maps</a> <span class="bit left grey">|</span> ' +
    '<a href="/skins">Skins</a> <span class="bit left grey">|</span> ' +
    '<a href="/scripting">Scripts</a> <span class="bit left grey">|</span> ' +
    '<a href="/sounds">Sounds</a> <span class="bit left grey">|</span> ' +
    '<a href="/tools">Tools</a> <span class="bit left grey">|</span> ' +
    '<a href="/tuts">Tutorials</a> <span class="bit left grey">|</span> ' +
    '<a href="/devhub">DevHub</a> ' +
    '</div>';
document.body.insertBefore(logo, document.body.firstChild);

}


