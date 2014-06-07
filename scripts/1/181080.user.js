// ==UserScript==
// @name           Zdjęcie profilowe w chmurce
// @namespace      http://www.fotka.pl/profil/suchar/
// @description    Po kliknięciu pokazuje zdjęcie profilowe w wyszukiwarce, urodzinach i użytkownikach grup.
// @include        http://www.fotka.pl/szukaj*
// @include        http://www.fotka.pl/urodziny*
// @include        http://www.fotka.pl/grupa*
// @version        1.2
// @copyright      2013+, suchar
// @author         suchar
// @run-at         document-end
// @grant          unsafeWindow
// @grant          GM_addStyle
// @grant          GM_xmlhttpRequest
// ==/UserScript==
var u = unsafeWindow;
var $ = u.$;
var lupka = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oBCRUiLLCeuIsAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAC+0lEQVQ4y52SyU8TcQCF32+WdqZ0s1AopSjatIMcFOuGHjyQaKKG1ISYADEaoydj4kETj2riyYtXN+Ri7B8AxLAEExN3A4qV0JaytTAU2ko703XaqQcDEYMXvz/gy3t5j+APbt+8eYLRGa5W19k9JtOOmkwuX1pZjkxHZ/zDPM/3Pn7am8BfEAC4fu0azVDk6q6Ww7dc+w9pHQ0N+SodT6nlMsJiXJ76PmUoLH0LL8wGrzx59jzyp4AGgGNtR8807vXcO37mfLbF7ZBNOo6iaUbhOVY1mkzpcKlpNKeo+3SleGvnOe/nV0PDqU3B/bt3doHV3LAd6iwSY+10Yh35dA4yBYAmoFkCLpik5hKo+2pWYyfl1cWY4HZPfBmfAAAw8bWYp1Y4YnXYbVmjBuZ0FvLiOiIL6yjqWOjdNWhiVFA5lY+Saldk4eOQPRFPsgCKAMBotZqais5WRbHcWrUOFisPllAwyXlIogRxfAlv1iRIShmSbkdjPJWSSSg0QzYqMNFINC64S/l8CfFCCWVUUNDQUI0caGsV6kUJlekVBDgGJQqVglbL0apa2RRQ85FINLsaUNNyUcooiFLATwBrlQqWaYLlbBELUgExix4KkeeMDEsnnU6nspmAZrWR+R+flpvalmqXqnaP7jHAxmlA8QzKKzJiYwFMMgzyTnO5ZWJkxPB6ZHRkcWW1vLlCjdWa+fDubaHRojlb5/JIWYZ/r6WxqFYwOZvEeA7IHneiVQq8vvTy0cPB6dn5wS0/EEURRaU0F5z6ltMXY16bpXonGH2mzsQpB6yZPVQydC78ZfR0NDAupTK5FpfLFQqFQuKWJ27UYSi0ORwNpxodTY5au53LyGkSngnNGA3Gz/UNjotdXV2dPp9vjBDSNzAw8OJvwQZ6ABYAHIAyABFAtqOj4yCAB93d3e0+n28MQF9/f/8LehtBEUAKQAK/F1EAIBgMis3Nzarf7zf39PS0+/1+syAI6naCfxIIBCYFQdgiIfgPvF7vBQCXPR5P+y+16E6X1O6kBAAAAABJRU5ErkJggg==";
var Szukaj = document.location.href.match(/szukaj*/);
if (Szukaj) {dodajSzukaj();}
var Urodziny = document.location.href.match(/urodziny*/);
if (Urodziny) {dodajUrodziny();}
var Grupa = document.location.href.match(/grupa*/);
if (Grupa) {dodajGrupa();}
GM_addStyle(".lupka1 { cursor: pointer; position: absolute; height: 16px; width: 16px; margin-top: -96px; margin-left: 78px; z-index: 200; background-image: url("+lupka+"); } ");

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
var sid = readCookie("FOTKAA");

function dodajSzukaj(){
    $("#search-result-placeholder .shadowed-avatar").each(function(){
        var loginx = $(this)[0].firstChild.alt;
        var divLupka = document.createElement("div");
        divLupka.className = "lupka1";
        divLupka.addEventListener("click", function(){pokazMini(loginx)}, true);
        $(this).after(divLupka);
    });
}

function dodajUrodziny(){
    var a =  $("#content .av96");
    $("#content .av96").each(function(){
        var loginx = $(this)[0].childNodes[1].alt;
        var divLupka = document.createElement("div");
        divLupka.className = "lupka1";
        divLupka.style.marginTop = "-118px";
        divLupka.style.marginLeft = "82px";
        divLupka.addEventListener("click", function(){pokazMini(loginx)}, true);
        $(this).after(divLupka);
    });
}

function dodajGrupa(){
    $(".member_name_avatar a").each(function(){
        var loginx = $(this)[0].firstChild.alt;
        var divLupka = document.createElement("div");
        divLupka.className = "lupka1";
        divLupka.style.marginTop = "-54px";
        divLupka.style.marginLeft = "33px";
        divLupka.addEventListener("click", function(){pokazMini(loginx)}, true);
        $(this).after(divLupka);
    });
}

function pokazMini(nazwaProfilu){
    time1 = new Date();
    //nazwaProfilu = "krolowabdsm"; //ten jest zablokowany do testów
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://api.fotka.pl/users/details_get.json?login="+nazwaProfilu+"&api.auth_method=sid&sid="+sid,
        onload: function (resp) {
            odpowiedz1(resp.responseText);
        }
    });
}

function odpowiedz1(odpowiedz1){
    var details_get = JSON.parse(odpowiedz1); 
    var zablokowany = details_get['data']['ban'];
    var profile_id = details_get['data']['id'];
        GM_xmlhttpRequest({
        method: "GET",
        url: "http://api.fotka.pl/albums/photos_get.json?owner_id="+profile_id+"&owner_type=1&album_nr=1&api.auth_method=sid&sid="+sid,
        onload: function (resp) {
            odpowiedz2(resp.responseText, zablokowany);
        }
    });
}

function odpowiedz2(odpowiedz2, blokada){
    var msg = "";
    var details_get = JSON.parse(odpowiedz2);
    var liczba_fotek = details_get['data']['liczba_fotek'];
    if (liczba_fotek < 1) { msg = ('<div style="font-size: 17px; color: #cc0000;">Brak zdjęcia</div>') }
    if (liczba_fotek > 0) {
        var url_zdj = details_get['data']['fotki'][0]['src']['url_280_s'];
        msg = '<img style="width:280px;" src="'+url_zdj+'">';
    }
    if (blokada > 0) { msg = ('<div style="font-size: 17px; color: #cc0000;">Profil zablokowany</div>') }
    var zdjecie_div = document.createElement('div');
    zdjecie_div.id = 'pwObscure';
    zdjecie_div.setAttribute('class', 'fotkaLightBoxObscure');
    var temp;
    temp = '<div id="pwContainer" class="fotkaLightBoxContainer pwclass" style="top: 10%;">\
              <div class="fotkaLightBox" style="width: 340px;">\
                <div class="fotkaLightBorder">\
                 <div id="pwBox" class="fotkaLightContent" style="padding: 20px;">\
                  '+msg+'\
                 </div>\
                </div>\
              </div>\
           </div>';
    zdjecie_div.innerHTML = temp;
    unsafeWindow.document.body.appendChild(zdjecie_div);
    zdjecie_div.addEventListener('click', function(){unsafeWindow.document.body.removeChild(zdjecie_div);}, false);
	$(document).keydown(function(e) {
        if ($('#pwObscure').length > 0) {
            if (e.keyCode == 27) {
                return (elem=document.getElementById('pwObscure')).parentNode.removeChild(elem);
            }
        }
    });
}
