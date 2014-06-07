// ==UserScript==
// @name        Clean MW
// @namespace   SKashyap
// @include     http://www.merriam-webster.com/*
// @version     1
// @grant       none
// ==/UserScript==
function hideElement(e){
    if (e!=null){
        e.style.display="none";
    }
}

hideElement(document.getElementById("footer"));
hideElement(document.getElementById("right-column"));
// document.getElementsByClassName("section-links")[0].style.display="none";
hideElement(document.getElementById("header"));
hideElement(document.getElementsByClassName("word-of-the-day-div")[0]);
hideElement(document.getElementsByClassName("home-carosel")[0]);
hideElement(document.getElementById("special-feature"));
hideElement(document.getElementById("left-column"));
hideElement(document.getElementById("fb-comments"));
hideElement(document.getElementById("logo"));
hideElement(document.getElementById("results_ad"));


var buttons = document.getElementsByClassName('au');
for (var i=0; i < buttons.length; i++) {
    var scan = buttons[i].getAttribute('onclick').match(/^return au\('(.+)', '(.+)'\);$/);
    if (scan && scan.length == 3){
        var file = scan[1];
        var url = "http://media.merriam-webster.com/soundc11/"+file[0]+"/"+file+".wav"
        var newAudio = document.createElement('audio');
        newAudio.id = "audio_"+file;
        newAudio.autoplay = false;
        newAudio.controls = false;
        newAudio.preload = "auto";
        newAudio.src = url;
        buttons[i].parentNode.insertBefore(newAudio, buttons[i]);
        buttons[i].setAttribute('onclick','document.getElementById("audio_'+file+'").play()');
    }
}
