// ==UserScript==
// @name        Klikacz linków MonsterWorldPl
// @description Skrypt dodaje Klawisz klikania do postów na MonsterWorldPl. Naciśnięcie powoduje 'zaklikanie' wszystkich linków w tle
// @namespace   http://www.fotka.pl/profil/suchar
// @version     1.0
// @include     http*://*.facebook.com/MonsterWorldPl/posts/*
// @grant       GM_xmlhttpRequest
// @author      suchar
// @copyright   2013+, suchar
// ==/UserScript==

var linkWyslij = null;
var licznik = 0;
var licznikOdp = 0;
var przekroczona = false;
var b = document.createElement('INPUT');
b.type = 'BUTTON';
b.value = ' Zaklikaj ';
b.style.cssText = "width: 170px; margin-left: 20px;";
b.addEventListener("click", poklikaj, false);
var contener = document.getElementById("contentArea");
contener.firstChild.firstChild.firstChild.firstChild.nextSibling.firstChild.nextSibling.appendChild(b);

function poklikaj() {
    b.value = "Czekaj.....";
    var a_arr = document.getElementsByTagName('A');
    for(var i = 0; i < a_arr.length; i++) {
    //for(var i = 82; i < 85; i++) {
        if((a_arr[i].parentNode.className == 'userContent') || (a_arr[i].parentNode.className == 'userContent translationEligibleUserMessage')) {
            var link = a_arr[i].href;
            link = link.replace(/http:/, 'https:');
            licznik += 1;
            console.log("LicznikPytania " + licznik);
            GM_xmlhttpRequest({
                method: "GET",
                url: a_arr[i].href,
                onload: function(response){
                    odczytaj(response.responseText);
                }
            });
        }
    }
}

function odczytaj(html) {
    licznikOdp += 1;
    console.log("LicznikOdpowie " + licznikOdp);
    var infoFrame = document.createElement("div");
    var pos1 = html.indexOf('<div><noscript><div class="mas"><div class="pam uiBoxRed">');
    if (pos1>0){
        var pos2 = html.indexOf("</code>", pos1);
        infoFrame.innerHTML = html.substring(pos1, pos2 - 3);
        var link = infoFrame.getElementsByTagName('form');
        var sigReq = infoFrame.getElementsByTagName('input');
        linkWyslij = link[0].action + "&" + sigReq[0].name + "=" + sigReq[0].value;
        GM_xmlhttpRequest({
            method: "GET",
            url: linkWyslij,
            onload: function(response){
                odczytajOdpowiedz(response.responseText);
            }
        });
        if (licznikOdp == licznik) {
            b.value = "Gotowe !!! - " + licznikOdp + " szt.";
        }
        if (przekroczona) {
            b.value = "Przekroczony limit dzienny !!!";
        }
    }
}

function odczytajOdpowiedz(html) {
    var infoFrame = document.createElement("div");
    var pos1 = html.indexOf('<span class="limit_msg">');
    if (pos1>0){
        przekroczona = true;
        b.value = "Przekroczony limit dzienny !!!";
    }
}

function pause(milliseconds) {
    var dt = new Date();
    while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
}
