// ==UserScript==
// @name           vkontakte music download
// @namespace      http://vkontakte.net.ru
// @description    Music download for vkontakte.ru
// @include        http://vkontakte.ru/*
// ==/UserScript==

/* By FedorFL ffl.public@gmail.com http://vkontakte.ru/lefedor */

function addDownload(input) {
    var addon=document.createElement("a");
    var td=input.parentNode;
    addon.setAttribute("href", input.value.replace(/\,\d+$/, ''));
    addon.innerHTML="download";
    td.appendChild(addon);
}

function addDownloads() {
    /*
    var imgs=document.getElementsByTagName("img");
    

    for (var i=0;i<imgs.length;i++) {
    if (imgs[i].className=="playimg") {
        addDownload(imgs[i]);
    }
    }
    
    */

    var inputs=document.getElementsByTagName("input");
    

    for (var i=0;i<inputs.length;i++) {
    if (inputs[i].type=="hidden" && inputs[i].value.match(/mp3\,\d+$/)) {
        addDownload(inputs[i]);
    }
    }
}

function addLyric(span) {
    var title=span.innerHTML;
    if (span.getElementsByTagName("a").length>0) {
    title=span.getElementsByTagName("a")[0].innerHTML;
    }
    var parent=span.parentNode;
    var artb=parent.getElementsByTagName("b")[0];
    var artist=artb.innerHTML;    
    if (artb.getElementsByTagName("a").length>0) {
    artist=artb.getElementsByTagName("a")[0].innerHTML;
    }
    var newdiv=document.createElement("div");
    var addon=document.createElement("a");
    //    addon.setAttribute("href","http://lyrc.com.ar/en/tema1en.php?artist="+artist+"&songname="+title);
    addon.setAttribute("href","http://www.lyricsplugin.com/wmplayer03/plugin/?artist="+encodeURIComponent(artist)+"&title="+encodeURIComponent(title));
    addon.setAttribute("target","_blank");
    addon.innerHTML="lyrics";
    newdiv.appendChild(addon);
    newdiv.className="duration";
    parent.parentNode.appendChild(newdiv);
}

function addLyrics() {
    var spans= document.getElementsByTagName("span");
    re=/title\d+/;
    for (var i=0;i<spans.length;i++) {
    if (re.test(spans[i].id)) {
        addLyric(spans[i]);
    }
    }
}

addLyrics();
addDownloads();
