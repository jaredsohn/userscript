// ==UserScript==
// @name            4chan Bottom Reload
// @namespace       Snorlax
// @description     Reload 4chan when you've hit the bottom
// @include         *boards.4chan.org*
// @version         1.0
// ==/UserScript==

window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        setInterval(function(){
            if((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
                window.location.href = window.location.href; 
            }},2500)
    }
};