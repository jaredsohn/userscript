// ==UserScript==
// @name          Justmusicstore Download Helper
// @description	  Makes downloading from JustMusicstore a little easier by providing cut-n-paste curl commands
// @include       http://*justmusicstore.com/iCart/*
// ==/UserScript==
// author: schlingel
// version 1.0
        var links = document.getElementsByTagName('a');
    var urls = '<div class="wget_links"><strong>Download Links:</strong><br/><textarea cols="40" rows="40">\n';

    for (var i=0; i<links.length; i++) {
        if (links[i].getAttribute('href').contains('.mp3')) {
            urls += ('curl -O '+links[i].getAttribute('href')+'\n');
        }
    }
    urls += '</textarea></div>\n';
    
    var target = document.getElementsByClassName("left_panel");
    for (var i=0; i<target.length; i++) {
        var innerHTML = target[i].innerHTML;
        target[i].innerHTML = innerHTML + urls;
    }