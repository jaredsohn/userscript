// ==UserScript==
// @name		kott's vkontakte music download
// @namespace		http://vkontakte.ru
// @description		Music download for vkontakte.ru
// @include		http://vkontakte.ru/*
// @include		http://vk.com/*
// ==/UserScript==

var trim = function (str) {
    return str.replace(/\"/g, "");
};

var getTrackInfo = function (td) {
    var performer = td.getElementsByTagName("b")[0];
    var performer_link = performer.getElementsByTagName("a")[0];
    var artist = (performer_link) ? performer_link.innerHTML : performer.innerHTML;

    var title_span = td.getElementsByTagName("span")[0];
    var title = (title_span.getElementsByTagName("a")[0])
			 ? title_span.getElementsByTagName("a")[0].innerHTML
			 : title_span.innerHTML;

    if (!title_span.getElementsByTagName('a')[0]) {
        var lyrics_link = document.createElement("a");
        lyrics_link.setAttribute("href", "http://www.lyricsplugin.com/wmplayer03/plugin/?artist=" + encodeURIComponent(artist)
			+ "&title=" + encodeURIComponent(title));
        lyrics_link.setAttribute("target", "_blank");
        lyrics_link.innerHTML = title;
        title_span.innerHTML = "";
        title_span.appendChild(lyrics_link);
    }

    return trim(artist + " - " + title);
};

function extend(td) {
    try {
        var tr = td.parentNode;
        var input = td.getElementsByTagName('input')[0];
        var info = tr.getElementsByTagName('td')[1];

        var trackInfo = getTrackInfo(info);


        var link = input.value.split(",")[0];

        var linkTag = document.createElement("a");
        linkTag.setAttribute("title", trackInfo);
        linkTag.setAttribute("alt", trackInfo);
        linkTag.setAttribute("href", link);
        linkTag.innerHTML = "\u0441\u043A\u0430\u0447\u0430\u0442\u044C";
        //linkTag.innerHTML='<img alt="' + trim(artist+' - '+title) + '" src="http://img133.imageshack.us/img133/1976/dlpo8.gif">';

        var el = info.getElementsByTagName("small")[0];
        if (el) performer.parentNode.removeChild(el);

        var duration = info.getElementsByTagName("div")[0];
        duration.innerHTML += "&nbsp;";
        duration.appendChild(linkTag);

        var audioText = info.getElementsByTagName("div")[1];
        if (audioText.getAttribute("class") == "title_wrap")
            audioText.setAttribute("style", "width:280px;");
    } catch(ex) {
    
    }
}

function addMp3Link() {
    var allTds = document.getElementsByTagName("td");

    for (var i = 0; i < allTds.length; i++) {
        if (allTds[i].className == "play_btn") {
            extend(allTds[i]);
        }
    }
}

addMp3Link();