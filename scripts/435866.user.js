// ==UserScript==
// @name        click
// @namespace   go-here.nl#click
// @description It makes clicking sounds when clicking links!
// @include     *
// @version     9001
// @grant       none
// ==/UserScript==

window['audio'] = new Audio('http://blabbermouth.go-here.nl/192278__lebcraftlp__click.mp3');
	
x = document.getElementsByTagName("a");

for(i=0; i < x.length; i++){

    x[i].addEventListener("mousedown", function() { 
        audio.play();
    }, false);
}