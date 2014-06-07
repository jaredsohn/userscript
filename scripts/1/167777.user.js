// ==UserScript==
// @name HTML5 video using VLC plugin
// @grant none
// @include     *
// ==/UserScript==
function html5vlc(){
    var videos = document.getElementsByTagName("video"); 
    for (var i = 0; i < videos.length; i++) { 
        var vlc = document.createElement("embed"); 
        vlc.type = "application/x-vlc-plugin"; 
        if (videos[i].width) 
            vlc.width = videos[i].width; 
        if (videos[i].height)
            vlc.height = videos[i].height; 
        vlc.setAttribute("target", videos[i].src); 
        var sources = videos[i].getElementsByTagName("source"); 
        for (var j = 0; j < sources.length; j++) { 
            vlc.setAttribute("target", sources[j].src); 
        } 
        vlc.setAttribute("id", videos[i].getAttribute("id")); 
        vlc.setAttribute("class", videos[i].getAttribute("class")); 
        videos[i].parentNode.replaceChild(vlc, videos[i]);
        if(videos[i])
            videos[i].parentNode.removeChild(videos[i]);
    }
}

var retry = 0;

function wait(){
    if(retry++ > 100)   //adjust timeout and retry value for instable connection
        return;
    if(document.getElementsByTagName("video").length == 0 || document.getElementsByTagName("video")[0].src == "")
        setTimeout(wait,100);
    else    html5vlc();
}

if(window.location.href.indexOf("youtube.com") > -1)
    wait();
else html5vlc();