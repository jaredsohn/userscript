// ==UserScript==
// @name           Minecraft in full window size
// @namespace      http://www.minecraft.net/game/*
// @description    Resizes minecraft applet to full window size
// @include        http://www.minecraft.net/game/*
// @include        http://minecraft.net/game/*
// www.pyronhell.net/minecraft.user.js
// ==/UserScript==


function resizeApplet() {
    var i = document.applet_i;
    document.getElementById('content').childNodes[i].style.width = window.innerWidth + 'px';
    document.getElementById('content').childNodes[i].style.height = window.innerHeight + 'px';
}    

for (var i = 0; i < document.getElementById('content').childNodes.length; i++) {
    if (document.getElementById('content').childNodes[i].localName == 'applet') {
        document.applet_i = i;  
    }
}

if (document.applet_i > 0) {
    document.getElementById('content').childNodes[document.applet_i].style.position = 'absolute';
    document.getElementById('content').childNodes[document.applet_i].style.left = 0;
    document.getElementById('content').childNodes[document.applet_i].style.top = 0;
    window.onresize = resizeApplet;
    resizeApplet();    
} else {
    alert('Please, log in.');
}

