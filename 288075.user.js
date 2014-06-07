// ==UserScript==
// @name        exhentai buttons
// @namespace   exhentai
// @description a script that generates buttons on the gallerylist to easily download a torrent gallery or hathfile (zip coming soon)
// @include     http://g.e-hentai.org/*
// @include     http://exhentai.org/*
// @version     1
// @grant       none
// ==/UserScript==

function addHatH(gallery, token) {
    return '<a style="color:#FFF" href="http://exhentai.org/hathdler.php?gid='+gallery+'&t='+token+'">H</a>';
}

/*function addTorrent(gallery, token) {
    return '<a style="color:#FFF" href="http://exhentai.org/gallerytorrents.php?gid='+gallery+'&t='+token+'" target="_blank">T</a>';
}*/

function addElement(element) {

    //var links = elements[i].getElementsByClassName
    var re = /https?:\/\/(g.e-hentai|exhentai).org\/g\/(\d+)\/([0-9a-fA-F]+)/gi;
    //Get raw link
    var rawlink = element.getElementsByClassName("id2")[0].getElementsByTagName("a")[0].href;
    var explodedlinks = rawlink.split(re);
    var gallery = explodedlinks[2];
    var token = explodedlinks[3];

    var parent = element.getElementsByClassName("id3")[0];
    var newelement = document.createElement('div');
    newelement.style.height = "20px";
    newelement.style.width = "40px";
    newelement.style.position = "relative";
    newelement.style.top = "-23px";
    newelement.style.right = "-161px";
    newelement.style.backgroundColor = "rgba(0,0,0,0.8)";
    newelement.style.borderRadius = "0 0 7px";
    newelement.style.fontWeight = "bold";
    newelement.style.fontSize = "13px";
    newelement.style.color = "#FFF";

    var InnerHTML = addHatH(gallery, token);
    //InnerHTML += " " + addTorrent(gallery, token);

    newelement.innerHTML = InnerHTML;

    parent.appendChild(newelement);
}

window.onload = function() {
    var elements = document.getElementsByClassName("id1");

    for (var i = elements.length - 1; i >= 0; i--) {
        addElement(elements[i]);
    }
};