// ==UserScript==
// @name        BajkiTV.pl Kopia robocza postów. Autor skryptu: Przmus
// @namespace   http://bajkitv.pl
// @include     http://bajkitv.pl*
// @version     1.1
// @grant       none
// ==/UserScript==

/*
Oficjalny poradnik dotyczący skryptu, znajduje się tutaj: 
Czytaj uważnie notatki poza zmiennymi (var), jest tam objaśnione co dana opcja zmienia.
Miłego dnia życzy: Przmus.
 */

/////////////////////// KONFIGURACJA ////////////////////////
var kopia_robocza_postów = true; // "true" - włączona kopia robocza postów, "false" - wyłączona.
var kopia_robocza_czat = true; // "true" - właczona kopia robocza na czacie, "false" - wyłączona.
var co_ile_sekund_zapisywac = 10; // Co ile sekund zapisywać post do kopii roboczej?
var co_ile_sekund_czat = 5; // Co ile sekund zapisywać wiadomość na czacie do kopii roboczej?
//////////////////// KONIEC KONFIGURACJI ////////////////////

var edycjaposta = false;
var co_ile_sekund_zapisywac2 = co_ile_sekund_zapisywac * 1000;
var co_ile_sekund_czat2 = co_ile_sekund_czat * 1000;
function KopiaRobocza (){
var textarea = document.getElementById('message');
            //alert(textarea.value);
    textarea.value = textarea.value + "\n\n***BajkiTV.pl Kopia robocza postów. Autor skryptu: Przmus***" + "\n***Poniżej znajduje się przywrócona kopia robocza ostatnio pisanego posta:\n" + localStorage['kr2'];
}
function KopiaRoboczaZapis (){
var textarea = document.getElementById('message');
            //alert(textarea.value.length);
    if (textarea.value.length > 20) {
            //alert('zapisujemy');
            localStorage['kr'] = textarea.value;
    }
}
function KopiaRoboczaCzat (){
var czatarea = document.getElementById('chatMessage');
            //alert(textarea.value);
            czatarea.value = localStorage['krc'];
            
}
function KopiaRoboczaCzatZapis (){
var czatarea = document.getElementById('chatMessage');
            //alert(textarea.value);
            //if (czatarea.value.length > 5) {
            localStorage['krc'] = czatarea.value;
            //}
}

function ZaczynamyKopie() {
//alert('dziala');
    if (document.getElementById('message')) {
    //alert("edycja");
    }
    if (localStorage['kr2'] === undefined) {
    localStorage['kr2'] = "";
    }
    //if (!edycjaposta){
    KopiaRobocza();
    //}
}

function ZaczynamyKopieCzat() {
if (kopia_robocza_czat == true) {
    if (document.getElementById('chatMessage')) {
    if (localStorage['krc'] === undefined) {
    localStorage['krc'] = "";
    }
    KopiaRoboczaCzat();
    //alert('dziala');
    window.setInterval(function(){
        KopiaRoboczaCzatZapis();
        //alert('5');
    }, co_ile_sekund_czat2);
}
}
}


//ZaczynamyKopie();
window.onload = ZaczynamyKopieCzat();

if (kopia_robocza_postów == true) {
localStorage['kr2'] = localStorage['kr'];
var jakastronka2 = window.location.href;
    if (jakastronka2.indexOf("posting?") > -1 || jakastronka2.indexOf("poczta-") > -1) {
    var edycjaposta = true; //test
    }
window.setInterval(function(){
        KopiaRoboczaZapis();
    }, co_ile_sekund_zapisywac2);
    if (edycjaposta) {
        if (document.getElementById("qr_submit")) {
            //alert('znalazlo');
            var container = document.getElementById("qr_submit");
        }
        else {
    var container = document.getElementById("submit");
    //alert('edycja');
        }
    }
    else {
    var container = document.getElementById("qr_submit");
    }
var input = document.createElement("input");
//input.onClick = 'ZaczynamyKopie()';
//input.setAttribute('onclick', 'ZaczynamyKopie()');
input.setAttribute('id', 'kopiarobocza');
//input.onclick = "alert('hi')";
input.type = "button";
input.value = "Przywróć kopię roboczą";
input.className = "btnlite"; // set the CSS class
input.style.marginRight = "7px";
if (edycjaposta) {
container.parentNode.insertBefore(input,container);
}
    else {
    container.parentNode.parentNode.firstChild.insertBefore(input,container);
    }
var gdziejest = document.getElementById("kopiarobocza");
var myDiv   = document.querySelector ("#kopiarobocza");
if (myDiv) {
    myDiv.addEventListener ("click", ZaczynamyKopie , false);
}
}