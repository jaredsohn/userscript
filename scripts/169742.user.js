// ==UserScript==
// @name           vavideo/wget download helper
// @description    duh
// @include        http*://*.vavideo.de/video/*
// ==/UserScript==

function vavideostart() {

document.getElementsByTagName('h4')[0].innerHTML = 'Videoinformationen <a onclick="vavideogo()">(+ wget Download)</a>';

}

function vavideogo() {

var imgs,i; var mlnk = ""; var dltitle = document.getElementsByTagName('h3')[0].innerText;
dltitle = dltitle.replace(": ","-");
imgs=document.getElementById("downloadModal").getElementsByTagName('a');
for(i in imgs){
if(imgs[i].href!=undefined)
mlnk += "REM " + imgs[i].innerText + "\n";
mlnk += "wget.exe --continue --no-check-certificate \"" + imgs[i].href + "\" --output-document=\"" + dltitle + ".mp4\"\n\n";
}
alert(mlnk);

}

window.addEventListener('load', vavideostart, false);

// /^([a-zA-Z0-9 _-]+)$/