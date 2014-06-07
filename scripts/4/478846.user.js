// ==UserScript==
// @name        YT Windowfiller Autoloader
// @namespace   http://userscripts.org/users/591389
// @description Loads the original Windowfiller functionality automatically
// @include     *.youtube.*
// @include     *.youtu.*
// @version     1.1
// @grant       none
// ==/UserScript==

if(document.URL.contains('youtube.com/watch?') && !fromFullWindow()){
    document.body.innerHTML ='';
    document.location.replace(getVidCode());
}

if(isFullWindow(document.URL)){
    document.title = 'YouTube Player';
}

function getVidCode(){

    var vidCode = '';

    for (var i = 0; i < document.URL.length; i++){
        if(document.URL.charAt(i) === 'e'){

            vidCode = document.URL.substring(i+14);

            for (var k = 0; k < vidCode.length; k++){
                if (vidCode.charAt(k) === '&'){
                    vidCode = vidCode.substring(0,k);
                }
            }

            return 'https://www.youtube.com/v/' + vidCode + '&autoplay=1&showinfo=1&rel=0&fs=0&autohide=0&iv_load_policy=0&vq=hd720';
        }
    }
}

function fromFullWindow(){
    return isFullWindow(document.referrer);
}

function isFullWindow(url){
    return url.charAt(24) === 'v';
}