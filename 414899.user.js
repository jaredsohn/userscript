// ==UserScript==
// @name        Vote_Dolce
// @namespace   Vote Dolce
// @description Vote auto dolce
// @include     https://ensimag.sexy/
// @version     1
// @grant       none
// ==/UserScript==

var user = "";
var mdp = "";
var site = "https://ensimag.sexy/";
var demarrer = false;
var dureeAttente;

function vote() {
    window.location.href = "https://ensimag.sexy/Votes/voter/3";
}

$(window).load(function() {
    //ajoutBouton();
    if(document.URL == "https://ensimag.sexy/Votes/voter/3"){
        var username = document.getElementById("loginUsername");
        username.value = user;
        var password = document.getElementById("loginPassword");
        password.value = mdp;
        document.getElementsByClassName("btn btn-default")[0].click();
    }else{
        dureeAttente = 3600000 + Math.floor(Math.random() * 600000);
        setInterval(vote, dureeAttente);   
    }
});

