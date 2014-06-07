// ==UserScript==
// @name           QQ FM Download
// @namespace      QQ FM Download
// @description    QQ FM Download
// @include        http://fm.qq.com/*

// ==/UserScript==
var a = document.createElement('a');
var linkText = document.createTextNode("下载当前歌曲");
a.appendChild(linkText);
a.id = 'btn-dl';
a.onclick = ytFunc;
a.href = 'javascript:return false;';
document.body.appendChild(a);

var a2 = document.getElementById('btn-dl');
a2.setAttribute('style', 'position: absolute;font-size: 32px;right: 1em;top: 0;background-color: yellow;line-height: normal;text-decoration: none;padding: 0 .5em;border-radius: 7px;');

var b = document.createElement('a');
var linkText = document.createTextNode("");
b.appendChild(linkText);
b.id = 'dl';
document.body.appendChild(b);

function ytFunc() {
    var dl = document.getElementById('dl');
    var mp3 = document.getElementsByTagName('audio')[0].src;
    dl.setAttribute('download', document.getElementById('divsongname').title + '.mp3');
    dl.setAttribute('href', mp3);
    
   	dl.click();
}