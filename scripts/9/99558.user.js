// ==UserScript==
// @name           VindIkLeuth
// @namespace      VindIkLeuth
// @include        http://www.facebook.com/*
// ==/UserScript==

timeout = setTimeout(checkLeuth,500)
var previous = 0;
function checkLeuth() {
    timeout = setTimeout(checkLeuth,500)
    if (document.getElementsByClassName('default_message').length > previous) {    
        previous = document.getElementsByClassName('default_message').length;
        for (var i = 0; i < document.getElementsByClassName('default_message').length; i++) {
            var el = document.getElementsByClassName('default_message')[i];
            if (el.innerHTML == 'Like' || el.innerHTML == 'Vind ik leuk' || el.innerHTML == 'Vind ik leuth') {
                el.innerHTML = 'Vind ik leuth'
            }
            else {
                el.innerHTML = 'Vind ik niet meer leuth'
            }
        }
        for (var i = 0; i < document.getElementsByClassName('saving_message').length; i++) {
            var el = document.getElementsByClassName('default_message')[i];
            if (el.innerHTML == 'Like' || el.innerHTML == 'Vind ik leuk' || el.innerHTML == 'Vind ik leuth') {
                el.innerHTML = 'Vind ik leuth'
            }
            else {
                el.innerHTML = 'Vind ik niet meer leuth'
            }
        }
    }
}