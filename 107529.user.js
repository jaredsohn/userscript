// ==UserScript==
// @name        ex.ua direct url to online version of movie
// @version     1.0
// @date        22.07.2011
// @author      ki0 <ki0@ua.fm>
// @download	http://userscripts.org/scripts/source/107529.user.js
// @include     http://www.ex.ua/view/*
// ==/UserScript==

function load() {
    var playerList = player_list.split("},");
    for (var i = 0; i < 100; i++) {
        var name = "play_" + i;
        var item = document.getElementById(name);
        if (item == undefined)
            return;
        var text = item.parentNode.parentNode.previousSibling.previousSibling.getElementsByTagName("a")[0].title
        var playerItem = JSON.parse(playerList[i] + "}");
        item.href = playerItem.url + "?" + text;
    }
}

if (document.readyState == "complete")
    load();
else
    window.addEventListener('load', load, false);

