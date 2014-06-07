// ==UserScript==
// @name           Play from EX.UA in your VLC player using Web Interface
// @namespace      http://ex.ua
// @description    Add buttons to EX.UA to play videos in VLC player running with Web Interface control
// @include        about:addons
// @include        http://ex.ua*
// @include        http://www.ex.ua*
// ==/UserScript==

var ip = "192.168.1.11", // VLC IP address
    port = "8666", // VLC Port
    vlcplay="http://"+ip+":"+port+"/requests/status.xml?command=in_play&input=",
    list=document.getElementsByClassName('list')[0],
    rows = list.getElementsByTagName("tr"),
    IFrame = document.createElement('iframe'),
    filelist;

IFrame.id="vlc-hidden"
IFrame.width = 0;
IFrame.height = 0;
list.parentNode.insertBefore(IFrame, list);

for(var i in rows) {
    if (isNaN(parseInt(i))) continue;
    var row         = rows[i],
        downloadLnk = row.getElementsByTagName("a")[0],
        url         = downloadLnk.href,
        regV        = /get/gi,
        result      = url.match(regV),
        fileExt     = downloadLnk.innerText.substr(-3).toLowerCase();

    if (url.match(/\.urls/gi)) { filelist = url; continue; }

    if (result && (fileExt == 'mkv' || fileExt == 'avi') ) {
        row.getElementsByTagName('td')[2].appendChild(document.createElement('br'));
        row.getElementsByTagName('td')[2].appendChild(document.createElement('br'));
        row.getElementsByTagName('td')[2].appendChild(createButton(url, 'Play with VLC'));
    } 
}

if (undefined != filelist) {
    var play_online = document.getElementById("body_element").getElementsByClassName('r_button')[0];
    if (undefined != play_online) {
        play_online.parentNode.appendChild(createButton(filelist.split("filelist").join("playlist").split("urls").join("m3u"), 'Play ALL with VLC'));
    }
}

function createButton(url, title) {
    var Btn   = document.createElement('span'),
        Btn_A = Btn.appendChild(document.createElement('a'));

    Btn.className   = "r_browse";
    Btn_A.innerHTML = title;        
    Btn_A.href      = vlcplay + url;
    Btn_A.target    = "vlc-hidden";

    return Btn;
}
