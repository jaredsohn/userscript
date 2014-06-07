// ==UserScript==
// @name        Volafile chat filter
// @namespace   keystrokes.se
// @description Is there a retard in chat? Fucking block that motherfucking mouth-breather with this shit.
// @match       *://volafile.io/*
// @include     *://volafile.io/*
// @version     3
// ==/UserScript==

//EDIT THIS FUCKING SHIT RIGHT HERE.
var filtered = ['anon087', 'vaporeon'];
//EDIT THIS FUCKING SHIT RIGHT HERE. WANT MORE NAMES? var filtered = ['retard1', 'retard2', 'retard3]; Fucking simple, right?

var gi = 0;
var target = document.querySelector('#chat_messages');

var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    blockretard();
  });    
});

var config = { attributes: true, childList: true, characterData: true };

function blockretard() {
    for(var gi = 0; gi < filtered.length; gi++) {
        for(var j = 0; j < document.getElementsByClassName('username').length; j++) {
           if((document.getElementsByClassName('username')[j].innerHTML).toLowerCase() === (filtered[gi]+':').toLowerCase()) {
               document.getElementsByClassName('chat_message')[j].parentNode.removeChild(document.getElementsByClassName('chat_message')[j]);
           }
           
        }
    }
}

observer.observe(target, config);