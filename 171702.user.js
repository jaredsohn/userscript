// ==UserScript==
// @name       MafBotOfTiWar
// @namespace  http://vk.com/Sergeich0
// @version    0.0.0.1
// @description  -work
// @match      http://tiwar.ru/mail/section/0
// @match      http://tiwar.ru/forum/topic/315285*
// @copyright  Sergeich0
// ==/UserScript==

if (location.host == 'tiwar.ru') {
    if (location.pathname == '/mail/section/0') {
        if(localStorage['time'] == 'night') {
            setTimeout (function() {
                trups=1;
                for (var i=4;i<24;i++) {
                    if (document.links[i].innerText==localStorage['maf1']||document.links[i].innerText==localStorage['maf2']) {
                        localStorage['trup'+trups] = document.links[i+1].innerText;
                        trups+=1;
                    } else if (document.links[i].innerText==localStorage['doc']) {
                        localStorage['hil'] = document.links[i+1].innerText;
                    }
                }
                for (i=0;i<10;i++){
                    if (localStorage[i]==localStorage['trup1']&&localStorage[i]==localStorage['trup2']) {
                        localStorage['trup']=localStorage[i];
                        localStorage.removeItem(i);
                    }
                }
                localStorage['time'] = 'day';
                location.reload();
            },3*60000)
        } else if (localStorage['time'] == 'day') {
            setTimeout (function() {
                localStorage['time'] = 'night';
                location.reload();
            },5*60000)
        } 
    }
}