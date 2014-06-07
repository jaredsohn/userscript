// ==UserScript==
// @name           FP Info wersja B
// @namespace      http://www.fotka.pl/profil/suchar/
// @description    Przy wejściu na profil pobiera informacje o historii jego wykroczeń i wyświetla pod avatarem. Na podstawie liczby wykroczeń proponuje bana na zdjęcia o odpowiedniej długości.
// @include        http://www.fotka.pl/profil/*
// @version        1.6
// @copyright      2014, suchar
// @author         suchar
// @run-at         document-end
// @grant          unsafeWindow
// @grant          GM_xmlhttpRequest
// @grant          GM_getValue
// @grant          GM_setValue

// ==/UserScript==
var u = unsafeWindow;
var $ = u.$;

var pokaz_zdjecia = GM_getValue("pokaz_zdjecia", "true");
var pokaz_komentarze = GM_getValue("pokaz_komentarze", "true");
var pokaz_PW = GM_getValue("pokaz_PW", "true");
var pokaz_Czat = GM_getValue("pokaz_Czat", "true");
var pokaz_Kamerki = GM_getValue("pokaz_Kamerki", "true");
var pokaz_Status = GM_getValue("pokaz_Status", "true");
var pokaz_Opis = GM_getValue("pokaz_Opis", "true");
var container = newElem("div");
unsafeWindow.document.body.appendChild(container);

var input_pokaz_zdjecia;
var input_pokaz_komentarze;
var input_pokaz_PW;
var input_pokaz_Czat;
var input_pokaz_Kamerki;
var input_pokaz_Status;
var input_pokaz_Opis;

function savePopup(){
    GM_setValue("pokaz_zdjecia", input_pokaz_zdjecia.checked);
    GM_setValue("pokaz_komentarze", input_pokaz_komentarze.checked);
    GM_setValue("pokaz_PW", input_pokaz_PW.checked);
    GM_setValue("pokaz_Czat", input_pokaz_Czat.checked);
    GM_setValue("pokaz_Kamerki", input_pokaz_Kamerki.checked);
    GM_setValue("pokaz_Status", input_pokaz_Status.checked);
    GM_setValue("pokaz_Opis", input_pokaz_Opis.checked);
    hidePopup();
    window.location.reload();
}

function showPopup(){
    container.id = 'pwObscure';
    container.setAttribute('class', 'fotkaLightBoxObscure');
    var pwContainer = newElem("div");
    pwContainer.id = 'pwContainer';
    pwContainer.className = 'fotkaLightBoxContainer pwclass';
    container.appendChild(pwContainer);
    var fotkaLightBox = newElem("div");
    fotkaLightBox.className = 'fotkaLightBox';
    fotkaLightBox.style.width = '310px';
    pwContainer.appendChild(fotkaLightBox);
    var fotkaLightBorder = newElem("div");
    fotkaLightBorder.className = 'fotkaLightBorder';
    fotkaLightBox.appendChild(fotkaLightBorder);
    var fotkaLightContent = newElem("div");
    fotkaLightContent.id = 'pwBox';
    fotkaLightContent.className = 'fotkaLightContent';
    fotkaLightContent.style.padding = '20px 20px 20px 20px';
    fotkaLightBorder.appendChild(fotkaLightContent);
    var text = newElem("div");
    text.innerHTML = "Wybierz elementy widoczne w FP Info:";
    text.style.fontWeight = "bold";
    text.style.marginBottom = "4px";
    fotkaLightContent.appendChild(text);
    input_pokaz_zdjecia = newElem("input");
    input_pokaz_zdjecia.type = "checkbox";
    input_pokaz_zdjecia.id = "input_pokaz_zdjecia";
    input_pokaz_zdjecia.checked = pokaz_zdjecia;
    fotkaLightContent.appendChild(input_pokaz_zdjecia);
    var span1 = newElem("span");
    span1.innerHTML = " - Zdjęcia";
    fotkaLightContent.appendChild(span1);
    fotkaLightContent.appendChild(newElem("br"));
    input_pokaz_komentarze = newElem("input");
    input_pokaz_komentarze.type = "checkbox";
    input_pokaz_komentarze.id = "input_pokaz_komentarze";
    input_pokaz_komentarze.checked = pokaz_komentarze;
    fotkaLightContent.appendChild(input_pokaz_komentarze);
    var span2 = newElem("span");
    span2.innerHTML = " - Komentarze";
    fotkaLightContent.appendChild(span2);
    fotkaLightContent.appendChild(newElem("br"));
    input_pokaz_PW = newElem("input");
    input_pokaz_PW.type = "checkbox";
    input_pokaz_PW.id = "input_pokaz_PW";
    input_pokaz_PW.checked = pokaz_PW;
    fotkaLightContent.appendChild(input_pokaz_PW);
    var span3 = newElem("span");
    span3.innerHTML = " - PW";
    fotkaLightContent.appendChild(span3);
    
    fotkaLightContent.appendChild(newElem("br"));
    input_pokaz_Czat = newElem("input");
    input_pokaz_Czat.type = "checkbox";
    input_pokaz_Czat.id = "input_pokaz_Czat";
    input_pokaz_Czat.checked = pokaz_Czat;
    fotkaLightContent.appendChild(input_pokaz_Czat);
    var span4 = newElem("span");
    span4.innerHTML = " - Czat";
    fotkaLightContent.appendChild(span4);
    
    fotkaLightContent.appendChild(newElem("br"));
    input_pokaz_Kamerki = newElem("input");
    input_pokaz_Kamerki.type = "checkbox";
    input_pokaz_Kamerki.id = "input_pokaz_Kamerki";
    input_pokaz_Kamerki.checked = pokaz_Kamerki;
    fotkaLightContent.appendChild(input_pokaz_Kamerki);
    var span5 = newElem("span");
    span5.innerHTML = " - Kamerki";
    fotkaLightContent.appendChild(span5);

    fotkaLightContent.appendChild(newElem("br"));
    input_pokaz_Status = newElem("input");
    input_pokaz_Status.type = "checkbox";
    input_pokaz_Status.id = "input_pokaz_Status";
    input_pokaz_Status.checked = pokaz_Status;
    fotkaLightContent.appendChild(input_pokaz_Status);
    var span6 = newElem("span");
    span6.innerHTML = " - Status";
    fotkaLightContent.appendChild(span6);
    
    fotkaLightContent.appendChild(newElem("br"));
    input_pokaz_Opis = newElem("input");
    input_pokaz_Opis.type = "checkbox";
    input_pokaz_Opis.id = "input_pokaz_Opis";
    input_pokaz_Opis.checked = pokaz_Opis;
    fotkaLightContent.appendChild(input_pokaz_Opis);
    var span7 = newElem("span");
    span7.innerHTML = " - Opis";
    fotkaLightContent.appendChild(span7);
    
    fotkaLightContent.appendChild(newElem("br"));
    var bSave = newBigButton("Zapisz", savePopup);
    fotkaLightContent.appendChild(bSave);
    var bClose = newBigButton("Anuluj", hidePopup);
    fotkaLightContent.appendChild(bClose);
    
    
    container.style.display = "block";
}

function hidePopup(){
    container.innerHTML = "";
    container.style.display = "none";
}

function newElem(type){
    return document.createElement(type);
}

function newBigButton(title, event){
    var ret = newElem("input");
    ret.value = title;
    ret.className = ret.type = "button";    
    ret.addEventListener("click", event, true);
    ret.style.fontSize = "10pt";
    ret.style.padding = "0px 3px";
    ret.style.marginRight = "4px";
    ret.style.marginTop = "4px";
    ret.style.marginLeft = "0";
    return ret;
}
//klasa tablicy asocjacyjnej. (c) Bozar 2010.
function AssocArray() {
    var keyNames = new Array();
    var values = new Array();
    
    this.setItem = function (newKey, newValue) {
        var keyFoundAt;
        for (keyFoundAt = 0; keyFoundAt < keyNames.length; keyFoundAt++) { //sprawdzamy czy dany klucz już istnieje w tablicy kluczy
            if (keyNames[keyFoundAt] == newKey) break;
        }
        keyNames[keyFoundAt] = newKey;
        values[keyFoundAt] = newValue;
    }
    this.getItem = function (keyName) {
        var keyFoundAt;
        for (keyFoundAt = 0; keyFoundAt < keyNames.length; keyFoundAt++) {
            if (keyNames[keyFoundAt] == keyName) break;
        }
        return values[keyFoundAt];
    }
    this.getLength = function () {
        return keyNames.length;
    }
    this.getKey = function (n) {
        return keyNames[n];
    }
}

function calculateDeleteBanHours(n) {
    if (n == 1) return  1 * 24;
    if (n == 2) return  3 * 24;
    if (n == 3) return  7 * 24;
    if (n == 4) return 14 * 24;
    if (n >= 5) return 30 * 24;
    return n;
}

function calculateMoveBanHours(n) {
    if (n >= 3 && n <= 5) return  1 * 24;
    if (n >= 6 && n <= 8) return  3 * 24;
    if (n >= 9 && n <= 10) return  7 * 24;
    if (n >= 11 && n <= 12) return 14 * 24;
    if (n >= 13) return 30 * 24;
    return n;
}

const action_orig = u.action;
var klasa = $("#user-dane-podstawowe");
var p2;
p2 = newElem("div");
p2.className = klasa[0].className;
p2.innerHTML = "Pobieranie informacji o banach...";
//if ($("#profile-gifts").length > 0) {$("#profile-gifts").before(p2);} else {$("#user-dane-podstawowe").before(p2);}
$("#user-dane-podstawowe").before(p2);

function setInfoText(n) {
    p2.innerHTML = "";
    var uwaga;
    uwaga = newElem("div");
    uwaga.id = "uwaga";
    uwaga.innerHTML = ((n["photo_skasowane"] + n["photo_przeniesione"] + n["comment"] + n["pw"] + n["czat"] + n["kamerki"] + n["status"] + n["opis"]) > 0) ? "<b>U W A G A !</b>" : "";
    uwaga.style.color = "red";
    uwaga.style.cursor = "pointer";
    uwaga.setAttribute('onclick',"showinfo('',event);");
    uwaga.style.fontSize = "16px";
    p2.appendChild(uwaga);
    if ((n["photo_skasowane"] + n["photo_przeniesione"] + n["comment"] + n["pw"] + n["czat"] + n["kamerki"]) > 0) {
        p2.innerHTML += '<u>Liczba interwencji na profilu:</u> <img id="konfig_fpinfo" src="data:image/gif;base64,R0lGODlhDgAOANU8ANDQ0K2trbe3t8jIyHt7e5KSks3NzczMzMLCwq6urmhoaLu7u5eXl5WVld7e3ouLi7+/v29vb2tra6+vr5qamsHBwd3d3Y6OjomJicrKys/Pz7y8vOPj44GBgWNjY3R0dNzc3NTU1KmpqaWlpW5ubtXV1aioqH19fZ2dnXh4eHl5eaGhoYeHh7q6uuLi4pGRkcDAwIqKinV1ddLS0oiIiH9/f7S0tGdnZ8PDw7Ozs8fHx2JiYgAAAAAAAAAAAAAAACH5BAEAADwALAAAAAAOAA4AAAZoQJ5wKFyNUMQkL8BxFJTDhmv2gA4LDphKmGAoWaABJRaweIk1HMAA0JQGHSIBAdDZD4gTMQUxVCANHgoKRDIbBy0LLztKEQsZNgIXjEkfAjoJOQ+USQQhJhMYnEkRIgE0o0oSJDdWQkEAOw%3D%3D" style="cursor: pointer;  margin: 0px 2px;" title="Konfiguracja">';
        p2.innerHTML += (pokaz_zdjecia) ? "<br/>Zdjęcia skasowane: " + n["photo_skasowane"] + " int. (" + n["photo_skasowane_szt"] + " szt.)": "" ;
        p2.innerHTML += (pokaz_zdjecia) ? "<br/>Zdjęcia przeniesione: " + n["photo_przeniesione"] + " int. (" + n["photo_przeniesione_szt"] + " szt.)": "" ;
        p2.innerHTML += (pokaz_zdjecia) ? "<br/>Zdjęcia przywrócone: " + n["photo_przywocone"] + " int. (" + n["photo_przywocone_szt"] + " szt.)": "" ;
        p2.innerHTML += (pokaz_komentarze) ? "<br/>Komentarze (liczba): " + n["comment"]: "" ;
        p2.innerHTML += (pokaz_PW) ? "<br/>PW (bany): " + n["pw"]: "" ;
        p2.innerHTML += (pokaz_Czat) ? "<br/>Czat (bany): " + n["czat"]: "" ;
        p2.innerHTML += (pokaz_Kamerki) ? "<br/>Kamerki (bany): " + n["kamerki"]: "" ;
        p2.innerHTML += (pokaz_Status) ? "<br/>Status (bany): " + n["status"]: "" ;
        p2.innerHTML += (pokaz_Opis) ? "<br/>Opis (bany): " + n["opis"]: "" ;
    }
    else {
        p2.innerHTML = "<img src='http://s.asteroid.pl/img/blank.gif' class='emoji_img emoji_d83dde03' onclick='showinfo();'> <u><b>Brak interwencji na profilu</b></u> <img src='http://s.asteroid.pl/img/blank.gif' class='emoji_img emoji_d83dde03' onclick='showinfo();'>"; 
    }
    var konfig_fpinfo = document.getElementById('konfig_fpinfo');
    konfig_fpinfo.addEventListener("click", showPopup, false);
}

function processResponse(html) {
    var banCounts = new Object();
    banCounts["photo_skasowane"] = banCounts["photo_skasowane_szt"] = banCounts["photo_przeniesione"] = banCounts["photo_przeniesione_szt"] = banCounts["photo_przywocone"] = banCounts["photo_przywocone_szt"] = banCounts["comment"] = banCounts["pw"] = banCounts["czat"] = banCounts["kamerki"] = banCounts["status"] = banCounts["opis"] = 0;
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------
    var infoFrame1 = newElem("div");
    var pos1 = html.indexOf("Operacje moderacji tego profilu:");
    if (pos1 > 0) {
        var pos2 = html.indexOf("<table", pos1);
        var pos3 = html.indexOf(">", pos2) + 1; // A
        var pos4 = html.indexOf("</table>", pos3) + "</table>".length; // B
        infoFrame1.innerHTML = html.substring(pos2, pos4);
        
        var photo_skasowaneDates = new AssocArray();
        var photo_skasowane_sztDates = new AssocArray();
        var photo_przeniesioneDates = new AssocArray();
        var photo_przeniesione_sztDates = new AssocArray();
        var commentDates = new AssocArray();
        // var otherDates = new AssocArray();
        var rows = infoFrame1.firstChild.firstChild.childNodes;
        for (var i = 1; i < rows.length; i++) {
            var date = rows[i].childNodes[1].innerHTML;
            var reason = rows[i].lastChild.firstChild.textContent.split(" ", 2).join(" ");
            var reason1 = rows[i].lastChild.firstChild.textContent.split(" ", 4).join(" "); //tylko do SG
            if (reason == "usunięcie zdjęcia" && reason1 != "usunięcie zdjęcia ze strony") {
                if (photo_skasowaneDates.getItem(date) == undefined) photo_skasowaneDates.setItem(date, 0);
                photo_skasowaneDates.setItem(date, photo_skasowaneDates.getItem(date) + 1);
                if (photo_skasowane_sztDates.getItem(i) == undefined) photo_skasowane_sztDates.setItem(i, 0);
                photo_skasowane_sztDates.setItem(i, photo_skasowane_sztDates.getItem(i) + 1);
            } else if (reason == "Przeniesienie zdjęcia") {
                if (photo_przeniesioneDates.getItem(date) == undefined) photo_przeniesioneDates.setItem(date, 0);
                photo_przeniesioneDates.setItem(date, photo_przeniesioneDates.getItem(date) + 1);
                if (photo_przeniesione_sztDates.getItem(i) == undefined) photo_przeniesione_sztDates.setItem(i, 0);
                photo_przeniesione_sztDates.setItem(i, photo_przeniesione_sztDates.getItem(i) + 1);
            } else if (reason == "usunięcie komentarza") {
                if (commentDates.getItem(i) == undefined) commentDates.setItem(i, 0);
                commentDates.setItem(i, commentDates.getItem(i) + 1);
            } else {
                // if(otherDates.getItem(date) == undefined) otherDates.setItem(date, 0);
                // otherDates.setItem(date, otherDates.getItem(date) + 1);
            }
        }
        banCounts["photo_skasowane"] = photo_skasowaneDates.getLength();
        banCounts["photo_skasowane_szt"] = photo_skasowane_sztDates.getLength();
        banCounts["photo_przeniesione"] = photo_przeniesioneDates.getLength();
        banCounts["photo_przeniesione_szt"] = photo_przeniesione_sztDates.getLength();
        banCounts["comment"] = commentDates.getLength();
        // for(var i=0; i<otherDates.getLength(); i++) banCounts["other"] = otherDates.getLength();
    }
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------
    var infoFrame2 = newElem("div");
    var pos1 = html.indexOf("Bany");
    if (pos1 > 0) {
        var pos2 = html.indexOf("<table", pos1);
        var pos3 = html.indexOf(">", pos2) + 1; // A
        var pos4 = html.indexOf("</table>", pos3) + "</table>".length; // B
        infoFrame2.innerHTML = html.substring(pos2, pos4);
        var czatDates = new AssocArray();
        var pwDates = new AssocArray();
        var kamerkiDates = new AssocArray();
        var statusDates = new AssocArray();
        var opisDates = new AssocArray();
        var rows = infoFrame2.firstChild.firstChild.childNodes;
        for (var i = 1; i < rows.length; i++) {
            var date = rows[i].childNodes[0].innerHTML;
            var reason = rows[i].lastChild.firstChild.textContent.split(" ", 1).join();
            if (reason == "PW") {
                if (pwDates.getItem(date) == undefined) pwDates.setItem(date, 0);
                pwDates.setItem(date, pwDates.getItem(date) + 1);
            } else if (reason == "Czat") {
                if (czatDates.getItem(date) == undefined) czatDates.setItem(date, 0);
                czatDates.setItem(date, czatDates.getItem(date) + 1);
            } else if (reason == "Kamerki") {
                if (kamerkiDates.getItem(date) == undefined) kamerkiDates.setItem(date, 0);
                kamerkiDates.setItem(date, kamerkiDates.getItem(date) + 1);
            } else if (reason == "Status") {
                if (statusDates.getItem(date) == undefined) statusDates.setItem(date, 0);
                statusDates.setItem(date, statusDates.getItem(date) + 1);
            } else if (reason == "Opis") {
                if (opisDates.getItem(date) == undefined) opisDates.setItem(date, 0);
                opisDates.setItem(date, opisDates.getItem(date) + 1);
            }
        }
        banCounts["pw"] = pwDates.getLength();
        banCounts["czat"] = czatDates.getLength();
        banCounts["kamerki"] = kamerkiDates.getLength();
        banCounts["status"] = statusDates.getLength();
        banCounts["opis"] = opisDates.getLength();
    }
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------
    var infoFrame3 = newElem("div");
    var pos1 = html.indexOf("Historia operacji na koncie");
    if (pos1 > 0) {
        var pos2 = html.indexOf("<table", pos1);
        var pos3 = html.indexOf(">", pos2) + 1; // A
        var pos4 = html.indexOf("</table>", pos3) + "</table>".length; // B
        infoFrame3.innerHTML = html.substring(pos2, pos4);
        var photo_przywoconeDates = new AssocArray();
        var photo_przywocone_sztDates = new AssocArray();
        var rows = infoFrame3.firstChild.firstChild.childNodes;
        for (var i = 0; i < rows.length - 1; i++) {
            var date = rows[i].childNodes[1].innerHTML;
            var reason = rows[i].lastChild.firstChild.textContent.split(" ", 2).join(" ");
            
            if (reason == "Przywrócenie zdjęcia") {
                if (photo_przywoconeDates.getItem(date) == undefined) photo_przywoconeDates.setItem(date, 0);
                photo_przywoconeDates.setItem(date, photo_przywoconeDates.getItem(date) + 1);
                if (photo_przywocone_sztDates.getItem(i) == undefined) photo_przywocone_sztDates.setItem(i, 0);
                photo_przywocone_sztDates.setItem(i, photo_przywocone_sztDates.getItem(i) + 1);
            }
        }
        banCounts["photo_przywocone"] = photo_przywoconeDates.getLength();
        banCounts["photo_przywocone_szt"] = photo_przywocone_sztDates.getLength();
    }
    //-----------------------------------------------------------------------------------------------------------------------------------------------------------
    setInfoText(banCounts);
    var banDeleteInHours = calculateDeleteBanHours(banCounts["photo_skasowane"]);
    var banMoveInHours = calculateMoveBanHours(banCounts["photo_przeniesione"]);
    var banInHours = (banDeleteInHours > banMoveInHours) ? banDeleteInHours : banMoveInHours ;
    var firstTime = true;
    var completed = false;
    u.action = function (type, data, js) {
        if (firstTime && banInHours >= 24 && data.powod != 14 && type == 'moderate_photos') {
            firstTime = false;
            if (confirm("Nadać bana na zdjęcia o sugerowanej długości " + banInHours / 24 + " dni?\nAnuluj, aby skorzsytać z domyślnego zachowanie systemu")) {
                setTimeout(function () {
                    GM_xmlhttpRequest({
                        method: "POST",
                        url: "http://www.fotka.pl/ajax/info_operacje.php",
                        data: 'val=[' + u.id + ',5,"ban",' + banInHours + ']',
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                        },
                        onload: function (resp) {
                            completed = true;
                            action_orig(type, data); // poczekajmy jeszcze moment przed wysłanie zapytania dającego bana
                        }
                    });
                }, 0);
            } else {
                action_orig(type, data, js);
            }
        } else {
            action_orig(type, data, js);
        }
    }
}

GM_xmlhttpRequest({
    method: "GET",
    url: "http://www.fotka.pl/out/users_info.php?user_id=" + u.id,
    onload: function (resp) {
        processResponse(resp.responseText)
    }
});