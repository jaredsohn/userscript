// ==UserScript==
// @name Google Homepage Compose
// @description Adds a compose button to gmail section of customized google homepage
// @include http://www.google.com/ig
// ==/UserScript==

(function() {
    window.compose = function compose() {
		window.open("http://gmail.google.com/gmail?view=cm&fs=1&tearoff=1","gmail","toolbar=no,width=700,height=700");
    }
    
    button = document.createElement('button');
    button.addEventListener("click", window.compose, false);
    button.id = 'compose';
    button.accessKey = 'c';
    button.appendChild(document.createTextNode('compose'));
    document.getElementById("GM60display").appendChild(button);
})();

