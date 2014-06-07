// ==UserScript==
// @name           IRC-galleria image downloader
// @namespace      http://robbiethe1st.afraid.org/
// @description    Download script for IRC-Galleria images - by RobbieThe1st
// @include        http://irc-galleria.net/user/*
// ==/UserScript==
for(var i=0; i<document.getElementsByTagName('img').length; i++) {
        if(document.getElementsByTagName('img')[i].id.match(/image-[0-9]+-image/) != null) {
                for(var a=0; a<document.getElementsByTagName('div').length; a++) {
                        if(document.getElementsByTagName('div')[a].className.match(/imagedesc/)) {
                                var galtsuviewcaption = document.getElementsByTagName('div')[a];
                                break;
                        };
                };
                var newElement = document.createElement('a');
                newElement.innerHTML = 'Lataa';
                newElement.href = document.getElementsByTagName('img')[i].src;
                galtsuviewcaption.parentNode.insertBefore(newElement, galtsuviewcaption.nextSibling);
                break;
        };
};