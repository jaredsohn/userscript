// ==UserScript==
// @name       utube-mp3
// @namespace  http://www.youtube-mp3.org/
// @description  Adds a button to youtube videos to download them using youtube-mp3.org
// @match      https://www.youtube.com*/*
// @match	   http://www.youtube-mp3.org/?*
// @copyright  2014+, Hans Strausl & T.J. Webb
// @update     http://userscripts.org/scripts/source/486023.user.js
// @version 5.3.14
// ==/UserScript==\

function init(){
    host = String(window.location.hostname);
    if (host == "www.youtube.com"){
        div = document.getElementById("yt-masthead-user");
        div.innerHTML = '<button class="yt-uix-button yt-uix-sessionlink yt-uix-button-default yt-uix-button-size-default" id="dlbut" type="button" style="margin-right:5px;"> Download </button>' + div.innerHTML;
        document.getElementById("dlbut").onclick = function(){
            url = String(window.location);
            urlsplit = url.split("&");
            url = urlsplit[0];
            window.open("http://www.youtube-mp3.org?vid=" + url,"","height=250,width=250,left=250");
        };
    }
    if (host == "www.youtube-mp3.org"){
        urlsplit = String(window.location).split("vid=");
        document.getElementById("youtube-url").value = urlsplit[1];
        setTimeout(function() {
            document.getElementById("submit").click();
        }, 500);
        check = setInterval(function(){ // check for dl link every second
            if (document.getElementById("dl_link").innerHTML != "") {
                tags = document.getElementsByTagName("a");
                for (x=1;x<6;x++){
                    if ((tags[x].style.display != "none") && (String(tags[x].href).indexOf("ab=") > 0)){
                        window.location = tags[x].href;
                        setTimeout(close, 1500);
                        clearInterval(check); // break the loop
                    }
                }
            }
        }, 1000);
    }
}
window.onload = init();