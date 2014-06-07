// ==UserScript==
// @name         Recap
// @namespace    Recap Tool
// @include      *
// ==/UserScript==




var attiva = document.getElementByld('recaptcha_challenge_field').value



function KeyCheck(Submit){
    if(Submit.keyCode == 38){
   prompt('Ecco il codice',attiva)
  };
};




window.addEventListener('keydown',KeyCheck,True);


function license() {
  window.location.hred = 'http://kekkojoker90.altervista.org/Recaptcha/index.html'
}


GM_registerMenuCommand("Aggiungi captcha",license);

