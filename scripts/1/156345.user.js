// ==UserScript==
// @name       Youtube auto like
// @version    1.1
// @description  Auto likes videos on youtube
// @match      http://*.youtube.com/watch*
// ==/UserScript==
uNames = new Array('LinusTechTips',
                   'Techquickie',
                   'ThereIsaCanal',
                   'razethew0rld');
setTimeout(function(){
    var e = document.getElementById('watch-like'),
    uName = document.getElementsByClassName('yt-user-name')[0].innerHTML;
    if(uNames.indexOf(uName) >= 0){
        if(e.title != 'Unlike'){
            e.click();
            setTimeout(function(){
                document.getElementsByClassName('action-panel-trigger yt-uix-button yt-uix-button-text yt-uix-tooltip')[0].click();
            }, 1000);
        }
    }
}, 5000);