// ==UserScript==
// @name        BajkiTV.pl Avatary użytkowników na czacie serwisu. Autor skryptu: Przmus
// @namespace   http://bajkitv.pl
// @include     http://bajkitv.pl*
// @version     3.4
// @grant       none
// ==/UserScript==

/*
Oficjalny poradnik dotyczący skryptu, znajduje się tutaj: http://bajkitv.pl/poradnik_wyswietlanie_awatarow_uzytkownikow_obok_wiadomosci_na_czacie_w_serwisie_bajkitvpl-t39127
Czytaj uważnie notatki poza zmiennymi (var), jest tam objaśnione co dana opcja zmienia.
Miłego dnia życzy: Przmus.
 */

/////////////////////// KONFIGURACJA ////////////////////////
var avatary_na_czacie = true; // "true" - włączone avatary na czacie, "false" - wyłączone.
var pisanie_od_gory = true; // "true" - wyświetlanie pola do pisania wiadomości na czacie od góry, "false" - wyświetlanie tego pola normalnie normalnie.
var odswiez_avatary_co_minut = 20; // Co ile minut aktualizować avatary? (Dopiero co X minut awatary będą się aktualizować na obecne). Mniejsza wartość może spowolinić wczytywanie strony.
var uzyj_wiekszych_avatarow = false; // "true" - używaj większych avatarów, "false" - używaj avatarów mieszczących się w rozmiarze domyślnym wiadomości na czacie.
var zachowaj_proporcje_16x13 = false; // "true" - zachowaj proporcje awatarów: 16:13, "false" - nie zachowuj proporcji i pokaż awatary w "kwadratowe".
var zachowaj_proporcje = false; // Opcja niezalecana! "true" - zachowuj proporcje awatarów względem ich szerokości, "false" - nie zachowuj tych proporcji.
var jaki_znak_dodawac = ""; // jaki znak dodawać przed nickiem użytkownika po kliknięciu na jego awatar? Zostaw to pole puste (""), aby nie dodawać.
var nowy_dzwiek_na_czacie = true; // Czy włączyć nowy dźwięk na czacie? Jeśli tak, zaleca się wyłączyć stary dźwięk w preferencjach: http://bajkitv.pl/ustawienia-prefs
var nowy_dzwiek_link = "http://przmus.ct8.pl/dzwieki/sound3.ogg"; //link do nowego dźwięku. Na serwerze przmus2.prv.pl dostępne są dźwięki od sound1.ogg do sound19.ogg.
var dzwiek_przy_nieaktywnym = true; // "true" - odtwarzaj dźwięk na czacie, tylko jeśli karta bajkitv.pl jest nieaktywne, "false" - używaj dźwięku na czacie przy nadejściu każdej wiadomości.
var inny_dzwiek_przy_aktywnym = true; // "true" - gdy opcja "dzwiek_przy_nieaktywnym" jest włączona używaj innego dźwięku przy nadejściu wiadomości w aktywnej karcie (zalecany krótszy dźwięk).
var inny_dzwiek_link = "http://przmus.ct8.pl/dzwieki/sound14.ogg"; //link do dźwięku używanego przy nadejściu wiadomości w aktywnej karcie, gdy opcja "inny_dzwiek_przy_aktywnym" jest aktywna.
//////////////////// KONIEC KONFIGURACJI ////////////////////





























var vis = (function(){
    var stateKey, eventKey, keys = {
        hidden: "visibilitychange",
        webkitHidden: "webkitvisibilitychange",
        mozHidden: "mozvisibilitychange",
        msHidden: "msvisibilitychange"
    };
    for (stateKey in keys) {
        if (stateKey in document) {
            eventKey = keys[stateKey];
            break;
        }
    }
    return function(c) {
        if (c) document.addEventListener(eventKey, c);
        return !document[stateKey];
    }
})();



if (document.getElementById("simple_chat")) {
    var Joanna = document.getElementById("simple_chat");
    Joanna.addEventListener("DOMNodeRemoved", function() {
        nowy_dzwiek_na_czacie2 = false;
        Avatary();
        if (nowy_dzwiek_na_czacie == true) {
            window.setTimeout(function(){
                nowy_dzwiek_na_czacie2 = true;
            }, 1000);
        }
        //alert('kliknieto');
    }, false);
}


var odswiezaj_czat_co = 5; // Opcja nieaktualna. Co ile sekund odświeżać czat (aby dodać awatary do nowych wiadomości)?

//localStorage['liczymy'] = 1;
if (uzyj_wiekszych_avatarow == true) {
    if (zachowaj_proporcje == true) {
        var wysokosc_avatara = "45.5px";
        var szerokosc_avatara = ""; 
    }
    else {
        if (zachowaj_proporcje_16x13 == true) {
            var wysokosc_avatara = "45.5px";
            var szerokosc_avatara = "37.5px";
        }
        else {
            var wysokosc_avatara = "45.5px";
            var szerokosc_avatara = "45.5px";
        }
    }
}
else {
    if (zachowaj_proporcje == true) {
        var wysokosc_avatara = "34.5px";
        var szerokosc_avatara = ""; 
    }
    else {
        if (zachowaj_proporcje_16x13 == true) {
            var wysokosc_avatara = "34.5px";
            var szerokosc_avatara = "28,5px";
        }
        else {
            var wysokosc_avatara = "34.5px";
            var szerokosc_avatara = "34.5px";  
        }    
    }
}

function GetAvatar(x,y) {
    var zapis = x;
    var username = y;
    var heyhey9 = null;
    //alert('funckja'+x+y);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            //alert(xhr.responseText);
            var heyhey = xhr.responseText.indexOf("/galeria/avatar");
            var heyhey3 = xhr.responseText.substr(heyhey);
            var heyhey2 = heyhey + 30;
            var heyhey5 = xhr.responseText.substr(heyhey2);
            var heyhey6 = heyhey5.indexOf("/galeria/avatar");
            //alert(heyhey6);
            var heyhey7 = heyhey5.substr(heyhey6);
            var heyhey8 = heyhey7.indexOf('"');
            //alert(heyhey8);
            var heyhey9 = heyhey7.substr(0,heyhey8);
            //alert(heyhey9);
            //var n = xhr.responseText.search("/galeria/avatar");
            //alert(xhr.responseText[n]);
            //alert(heyhey9);
            localStorage[zapis] = heyhey9;
            var JezusChrystus = heyhey9;
            return heyhey9;
        }
    }
    xhr.open('GET', username, heyhey9);
    xhr.send(null);
}


var odswiezaj_czat_co2 = odswiezaj_czat_co * 1000;
var kolumny_list = [
    "bl r11", "bl r10", "bl r9", "bl r8", "bl r7", "bl r6", "bl r5", "bl r4", "bl r3", "bl r2"
]


function imageExists(image_url){
    
    var http = new XMLHttpRequest();
    http.open('HEAD', image_url, false);
    http.send();
    return http.status != 404;
    
}

var datee = new Date();
datee.setTime(datee.getTime());
var expirese = datee.toUTCString();
localStorage['aktualnie'] = expirese;


function createCookie(name, value) {
    var date = new Date();
    date.setTime(date.getTime()+(odswiez_avatary_co_minut*60*1000));
    var expires = date.toUTCString();
    localStorage['wygasa'] = expires;
    //document.cookie = name+"="+value+expires+"; path=/";
}

var flood = true;

function AntyFlood() {
    flood = true;
}

function KupionoDodatek() {
    var zakupiono = null;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            var heyhey = xhr.responseText.indexOf('<span class="mactiv">220$</span>');
            if (heyhey > -1) {
                //alert("kupiono");
                nowy_dzwiek_na_czacie = true;
                localStorage['zakupiono_dodatek'] = "tak";
            }
            else {
                //alert("nie kupiono");
                nowy_dzwiek_na_czacie = false;
                localStorage['zakupiono_dodatek'] = "nie";
            }
        }
    }
    xhr.open('GET', "http://bajkitv.pl/sklep", zakupiono);
    xhr.send(null);
}

nowy_dzwiek_na_czacie2 = false;
if (nowy_dzwiek_na_czacie == true) {
    var snd = new Audio(nowy_dzwiek_link);
    var snd2 = new Audio(inny_dzwiek_link);
    //snd.setAttribute("type", "audio/mp3");
    snd.volume = 1;
    snd2.volume = 1;
    if (localStorage['zakupiono_dodatek'] === undefined) {
        //alert("sprawdzanie");
        nowy_dzwiek_na_czacie = false;
        KupionoDodatek();
    }
    else if (localStorage['zakupiono_dodatek'] == "tak") {
        nowy_dzwiek_na_czacie = true;
        //alert("zakupiono");
    }
        else {
            //alert("nie zakupiono");
            nowy_dzwiek_na_czacie = false;
        }
    //snd.play();
}

var Marlenka = document.getElementById("chatData");
function Zaczynamy() {
    if (nowy_dzwiek_na_czacie == true) {
        nowy_dzwiek_na_czacie2 = true;
    }
    Marlenka.addEventListener("DOMNodeInserted", function() {
        if (localStorage['flood'] == "nie") {
            //alert("wywołuje event");
            //alert(localStorage['flood']);
            localStorage['flood'] = "tak";
            Avatary();
        }
        else {
            localStorage['flood'] = "nie"; /// musi być bo czasem się zawiesza :(
            //alert("flood!");
        }
    }, false);
}

if (pisanie_od_gory) {
    var ksiadz_proboszcz = document.getElementById("chatFormI");
    var siostra_zakonna = ksiadz_proboszcz;
    var ojciec_swiety = document.getElementById("chatsc");
    ojciec_swiety.parentNode.insertBefore(siostra_zakonna, ojciec_swiety);
    var siostra_mary = document.getElementById("chatMessage");
    ksiadz_proboszcz.className = "row2 ft_cen";
    siostra_mary.style.width = "100%";
    siostra_mary.style.maxWidth = "100%";
    var dziewica_maryja = siostra_mary.clientWidth;
    if (dziewica_maryja < 1) {
        siostra_mary.style.width = 600 + "px";
        //alert("w ciąży");
    }
    else {
        var nowa_roz = dziewica_maryja - 158;
        siostra_mary.style.width = nowa_roz + "px";
    }
    //var jakastronka = window.location.pathname;
    ojciec_swiety.className = ojciec_swiety.className + " lf rf";
}
function ZaczynamyChyba() {
    if (avatary_na_czacie == true) {
        window.setTimeout(function(){
            Zaczynamy();
        }, 1000);
    }
}

function PomocZdalna(a,c,i) {
    var b = a.id;
    window.setTimeout(function(){
        //var pomoc_zdalna = -1;
        var pomoc_zdalna = document.getElementById(b).textContent;
        if (pomoc_zdalna.indexOf("$$Pomoc zdalna$$") > -1){
            var poczatek_a = pomoc_zdalna.indexOf("(((") + 3;
            var poczatek_c = pomoc_zdalna.indexOf("%%%") + 3;
            var poczatek_d = pomoc_zdalna.indexOf("###") + 3;
            var koniec_a = pomoc_zdalna.indexOf(")))");
            var koniec_c = pomoc_zdalna.indexOf("@@@");
            var koniec_d = pomoc_zdalna.indexOf("^^^");
            var dlakogo_a = pomoc_zdalna.substring(poczatek_a,koniec_a);
            var skrypt_c = pomoc_zdalna.substring(poczatek_c,koniec_c);
            var pomoc_d = pomoc_zdalna.substring(poczatek_d,koniec_d);
            var cowpisac = 'SKRYPT: "Avatary użytkowników na czacie":\nPrzmus wywołał skrypt pomocy zdalnej o treści: \n"' + pomoc_d + '"\nCzy chcesz go zaakceptować? Wartość skryptu pomocy: \n"' + skrypt_c + '"';
            var moj_profil = document.getElementById("m_pr").href;
            var moj_profil0 = moj_profil.indexOf("/profil-") + 8;
            var moj_profil2 = moj_profil.substring(moj_profil0);
            //var moj_profil2 = "Przmus";
            //alert(dlakogo_a);
            if (dlakogo_a === moj_profil2 || poczatek_a === 2 || koniec_a === -1) {
                var answer = confirm(cowpisac)
                if (answer){
                    //alert("powinno się udać");
                    c[i].className = "bl r5";
                    eval(skrypt_c);
                }
                else{
                    //nie zaakceptowano
                }
            }
        }
    }, 2000);
}

var jakastronka = window.location.pathname;
if (jakastronka == "/forum" || jakastronka == "/chat") {
    Avatary();
    //alert ('tak');
}
window.onload = ZaczynamyChyba();
/*document.addEventListener("DOMContentLoaded", function() {
    Zaczynamy();
}, false);*/

function Avatary() {
    localStorage['flood'] = "tak";
    //alert("wywołano funckje awatary");
    if (avatary_na_czacie == true) {
        for(j_kolumny=0 ; j_kolumny<kolumny_list.length ; j_kolumny++) {
            var kolumny_list2 = kolumny_list[j_kolumny];
            var list_czat = document.getElementsByClassName(kolumny_list2);
            for(i=0 ; i<list_czat.length ; i++)   
            {
                if (list_czat[i].href.indexOf("profil-") > -1) {
                    var username = list_czat[i].href;
                    var username2 = list_czat[i].textContent;
                    var osername = list_czat[i].parentNode.parentNode;
                    var osername2 = list_czat[i].parentNode;
                    if (osername.id.indexOf("ms") > -1) {
                    }
                    else {
                        if (osername.id.indexOf("m") > -1) {
                            var Elizabeth = list_czat[i].parentNode.firstChild.onclick;
                            //alert(Elizabeth);
                            if (Elizabeth == null) {
                                //break;
                                
                                var kogoavatar = username2;
                                var iddd = document.getElementById(osername.id);
                                var Avlink = iddd.firstChild.firstChild.textContent;
                                var Zapis = Avlink;
                                //var Avlink1 = chat[Avlink];
                                var Avlink2 = "http://bajkitv.pl";
                                var terazjest = new Date(localStorage['aktualnie']);
                                var kiedywygasa = new Date(localStorage['wygasa']);
                                if (terazjest.getTime() > kiedywygasa.getTime()) {
                                    //alert("jest wieksze");
                                    var sn = localStorage['sn'];
                                    var pin = localStorage['pin'];
                                    var bt_mtat = localStorage['bt_mtab'];
                                    var krc = localStorage['krc'];
                                    var kr = localStorage['kr'];
                                    var kr2 = localStorage['kr2'];
                                    var ad = localStorage['ad'];
                                    var bt_i = localStorage['bt_i'];
                                    var bt_mtab = localStorage['bt_mtab'];
                                    localStorage.clear();
                                    localStorage['sn'] = sn;
                                    localStorage['pin'] = pin;
                                    localStorage['bt_mtab'] = bt_mtat;
                                    localStorage['kr2'] = kr2;
                                    localStorage['kr'] = kr;
                                    localStorage['krc'] = krc;
                                    localStorage['ad'] = ad;
                                    localStorage['bt_i'] = bt_i;
                                    localStorage['bt_mtab'] = bt_mtab;
                                    createCookie("odswiez_avatary", 1);
                                }
                                else {
                                    //alert("nie jest wieksze");
                                    //createCookie("odswiez_avatary", 1);
                                }
                                if (localStorage['wygasa'] === undefined) {
                                    var sn = localStorage['sn'];
                                    var pin = localStorage['pin'];
                                    var bt_mtat = localStorage['bt_mtab'];
                                    var krc = localStorage['krc'];
                                    var kr = localStorage['kr'];
                                    var kr2 = localStorage['kr2'];
                                    var ad = localStorage['ad'];
                                    var bt_i = localStorage['bt_i'];
                                    var bt_mtab = localStorage['bt_mtab'];
                                    localStorage.clear();
                                    localStorage['sn'] = sn;
                                    localStorage['pin'] = pin;
                                    localStorage['bt_mtab'] = bt_mtat;
                                    localStorage['kr2'] = kr2;
                                    localStorage['kr'] = kr;
                                    localStorage['krc'] = krc;
                                    localStorage['ad'] = ad;
                                    localStorage['bt_i'] = bt_i;
                                    localStorage['bt_mtab'] = bt_mtab;
                                    createCookie("odswiez_avatary", 1);
                                    alert('Skrypt: "BajkiTV.pl Avatary użytkowników na czacie serwisu" został zainstalowany poprawnie. Miłego używania życzy Przmus :)');
                                }
                                if (localStorage['sn'] == 'undefined') {
                                    localStorage['sn'] = 1;
                                }
                                if (localStorage['pin'] == 'undefined') {
                                    localStorage['pin'] = 0;
                                }
                                if (localStorage['bt_mtab'] == 'undefined') {
                                    localStorage['bt_mtab'] = 0;
                                }
                                if (localStorage['kr2'] == 'undefined') {
                                    localStorage['kr2'] = "";
                                }
                                if (localStorage['kr'] == 'undefined') {
                                    localStorage['kr'] = "";
                                }
                                if (localStorage['krc'] == 'undefined') {
                                    localStorage['krc'] = "";
                                }
                                if (localStorage['ad'] == 'undefined') {
                                    localStorage['ad'] = "1";
                                }
                                if (localStorage['bt_i'] == 'undefined') {
                                    localStorage['bt_i'] = "0";
                                }
                                if (localStorage['bt_mtab'] == 'undefined') {
                                    localStorage['bt_mtab'] = "0";
                                }
                                var datee = new Date();
                                datee.setTime(datee.getTime());
                                var expirese = datee.toUTCString();
                                localStorage['aktualnie'] = expirese;
                                //alert(localStorage['aktualnie']);
                                var stored = localStorage[Zapis];
                                if (stored) {
                                    var JezusChrystus = localStorage[Zapis];
                                    //alert("jest");
                                }
                                else {
                                    GetAvatar(Zapis,username);
                                    var JezusChrystus = localStorage[Zapis];
                                    //alert("nie ma");
                                }
                                
                                var LinkDoAvka = Avlink2 + JezusChrystus;
                                //var linkdoavatara = "<img id=" + Avlink + "_avatar" + " style='margin-right: 3px' align=left height=" + wysokosc_avatara + " width=" + szerokosc_avatara + " src='" + LinkDoAvka + "'></img>";
                                //
                                //var jakinumer = localStorage['liczymy'];
                                //jakinumer + 1;
                                //localStorage['liczymy'] = jakinumer;
                                
                                var image = document.createElement('img');
                                var odnosnik = document.createElement('a');
                                var whattext = "insert_text('" + jaki_znak_dodawac + Avlink + ", ')";
                                //odnosnik.setAttribute('href', 'funkcja();');
                                odnosnik.setAttribute('onClick', whattext);
                                //odnosnik.setAttribute('src', 'http://bog.com');
                                //odnosnik.setAttribute('class', 'cp');
                                if (LinkDoAvka.indexOf("galeria/avatar/av.png") > -1)
                                {
                                    LinkDoAvka = "http://bajkitv.pl/galeria/obraz/1639029132.png";
                                }
                                image.setAttribute('src', LinkDoAvka);
                                image.setAttribute('width', szerokosc_avatara);
                                image.setAttribute('height', wysokosc_avatara);
                                image.setAttribute('align', 'left');
                                image.setAttribute('id', 'mamavatar');
                                image.setAttribute('style', 'margin-right: 3px');
                                //image.setAttribute('onclick', username);
                                //alert(username);
                                //iddd.insertBefore(naszdiv, iddd.firstChild);
                                odnosnik.appendChild(image);
                                iddd.firstChild.insertBefore(odnosnik, iddd.firstChild.firstChild);
                                
                                // skopiowane: iddd.firstChild.insertBefore(image, iddd.firstChild.firstChild);
                                //gdziejestdiv.insertBefore(image, null);
                                //iddd.insertBefore(image, iddd.firstChild);
                                //gdziejestdiv.appendChild(image);
                                //iddd.insertBefore(iddd, linkdoavatara);
                                
                                //iddd.firstChild.firstChild.innerHTML = linkdoavatara + iddd.firstChild.firstChild.textContent;
                                ///!!! osername.id = "avatarjest";
                                var img2 = document.getElementById(Avlink + "_avatar");
                                if (nowy_dzwiek_na_czacie2 == true) {
                                    if (dzwiek_przy_nieaktywnym) {
                                        //var snd = new Audio(nowy_dzwiek_link);
                                        var visible = vis();
                                        if (!visible) {
                                            snd.play();
                                        }
                                        else {
                                            if (inny_dzwiek_przy_aktywnym) {
                                                snd2.play();
                                            }
                                        }
                                    }
                                    else {
                                        snd.play();
                                    }
                                }
                                if (username2 === "Przmus"){
                                    PomocZdalna(osername,list_czat,i);
                                    
                                }
                                
                            }
                        }
                        
                        else {
                        }
                    }
                }
                }
            }
        }
        localStorage['flood'] = "nie";
    }
    