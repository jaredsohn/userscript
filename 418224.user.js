// ==UserScript==
// @name           MultiKoszyk fotka.pl
// @description    umożliwia dodawanie profili na podręczną listę, na kształt ulubionych WERSJA MAX 5 KOSZYKÓW
// @namespace      http://www.fotka.pl/profil/suchar/
// @include        http://www.fotka.pl/*
// @version        2.1
// @copyright      2014+, suchar
// @author         suchar
// @run-at         document-end
// @grant          unsafeWindow
// @grant          GM_getValue
// @grant          GM_setValue
// ==/UserScript==
var helpText = '[{"info":"Hej! tu krótki samouczek koszyka pro. Wyczyść tę listę za pomocą polecenia \'Opróżnij koszyk\', ale najpierw doczytaj do końca :)"},{"info":"Nowe profile możesz dodawać za pomocą zielonego plusika przy loginie."},{"info":"Po jego kliknięciu wyświetli się okienko z powodem do wpisania. Zatwierdzamy OK lub enter."},{"info":"Pojedyncze profile można usuwać klikając czerwony krzyżyk w okienku koszyka."},{"info":"Opcja \'Pokaż HTML\' generuje kod gotowy do wklejenia do opisu lub bloga w grupie"},{"info":"jeśli chcemy otrzymać wersję gotową do wklejenia na forum, z menu wybieramy \'Pokaż BB\'"}]';
var nazwyTMP = '["","Koszyk nr 1","Koszyk nr 2","Koszyk nr 3","Koszyk nr 4","Koszyk nr 5"]';
var ile_koszykow = GM_getValue("ile_koszykow", "1");
var input_nr = GM_getValue("input_nr", "1");
var zamykac_karte = GM_getValue("zamykac_karte", false);
var poz_ileProfili = [];
var u = unsafeWindow;
var $ = u.$;

if(!$) return;
if (document.getElementById("content")){ // czy to nie popup?
    dodajMenuGorne();
    if (document.getElementById("profile-grid") != null){ // czy jesteśmy na profilu?
        dodajPrzyciskProfil();
        dodajMenuPowod();
    }
}

// ----------------------- Obsługa menu górnego i konfiguracji ----------------------- //
function dodajMenuGorne(){
    var noweMenu = newElem("div");
    noweMenu.id = "menu-koszyk";
    noweMenu.className = "header-menu-item";
    noweMenu.style.cssText = "margin-left: 20px;";
    var span1 = newElem("span");
    noweMenu.appendChild(span1);
    
    for(var x=1; x<=ile_koszykow; x++){
        var span2 = newElem("span");
        span2.style.cssText = "margin-top: 6px";
        span2.style.float = "left";
        if (wpisy(x).length >99) {
            span2.className = "pill-widget pill-widget-red";
        } else {
            span2.className = "pill-widget pill-widget-blue";
        }
        span1.appendChild(span2);
        
        var span3 = newElem("span");
        span3.className = "sprites pill-widget-begin";
        span2.appendChild(span3);
        
        poz_ileProfili[x] = newElem("span");
        poz_ileProfili[x].className = "pill-widget-value";
        poz_ileProfili[x].innerHTML = wpisy(x).length;
        poz_ileProfili[x].id = "poz_ileProfili"+x;
        span3.appendChild(poz_ileProfili[x]);
        
        var span5 = newElem("span");
        span5.className = "sprites pill-widget-end";
        span2.appendChild(span5);
    }    //koniec pętli
    
    //napis koszyk
    var a = newElem("a");
    a.href = "javascript:void(0)";
    a.addEventListener("click", pokazKonfig, false);
    a.innerHTML = "Koszyk";
    a.className = "grey-link" ;
    noweMenu.appendChild(a);
    $("#pw-counter").before(noweMenu);
    
    //obniżenie logo
    var tmp = document.getElementById('header-logo');
    tmp.style.top = '12px';
    tmp.style.position = 'relative';
}

function pokazKonfig(){
    var zawartosc = "";
    for(var x=1; x<=ile_koszykow; x++){
    zawartosc += '<br>\n<div style="font-size: 15px;">'+nazwa_koszyka()[x]+' ('+wpisy(x).length+')<img id="Koszyk_nazwa_'+x+'" src="data:image/gif;base64,R0lGODlhDgAOANU8ANDQ0K2trbe3t8jIyHt7e5KSks3NzczMzMLCwq6urmhoaLu7u5eXl5WVld7e3ouLi7+/v29vb2tra6+vr5qamsHBwd3d3Y6OjomJicrKys/Pz7y8vOPj44GBgWNjY3R0dNzc3NTU1KmpqaWlpW5ubtXV1aioqH19fZ2dnXh4eHl5eaGhoYeHh7q6uuLi4pGRkcDAwIqKinV1ddLS0oiIiH9/f7S0tGdnZ8PDw7Ozs8fHx2JiYgAAAAAAAAAAAAAAACH5BAEAADwALAAAAAAOAA4AAAZoQJ5wKFyNUMQkL8BxFJTDhmv2gA4LDphKmGAoWaABJRaweIk1HMAA0JQGHSIBAdDZD4gTMQUxVCANHgoKRDIbBy0LLztKEQsZNgIXjEkfAjoJOQ+USQQhJhMYnEkRIgE0o0oSJDdWQkEAOw%3D%3D" style="cursor: pointer;  margin: 0px 2px;" title="Zmiana nazwy koszyka"></div>\n\
<table style="width: 100%;">\n    <tr>\n\
        <td><a href="javascript:void(0)" id="Koszyk_pokaz_'+x+'">Pokaż zawartość</a></td>\n\
        <td><a href="javascript:void(0)" id="Koszyk_HTML_'+x+'">Pokaż HTML</a></td>\n\
        <td><a href="javascript:void(0)" id="Koszyk_BB_'+x+'">Pokaż BB</a></td>\n\
        <td><a href="javascript:void(0)" id="Koszyk_oproznij_'+x+'">Opróżnij koszyk</a></td>\n    </tr>\n</table>\n';
    }
    zawartosc += "<label><hr>Ilość koszyków <br></label>\n"
    //pętla dla koszyków
    for(var x=1; x<=5; x++){
        if(x==1) {zawartosc += '<label>1 - </label>\n'} else {zawartosc += '<label> &nbsp;&nbsp;&nbsp;&nbsp;'+x+' - </label>\n'};
        zawartosc += '<input type="radio" name="koszyk_nr" id="koszyk_nr'+x+'" value="'+x+'" title="Koszyk nr '+x+'">\n';
    } //koniec pętli
    
    zawartosc += '<label><br><hr>Zamykać kartę po dodaniu do koszyka ? &nbsp;<input type="checkbox" name="zamKarta" id="zamKarta"></label>\n';
    zawartosc += '<hr>Export / Import dotyczy koszyka :<br>\n';
    zawartosc += '<label>Wszystkie -</label><input type="radio" name="koszyk_exp_imp_nr" id="koszyk_exp_imp_nr0" value="0">\n';

    //pętla dla koszyków przy exporcie
    for(var x=1; x<=ile_koszykow; x++){
        zawartosc += '<label> &nbsp;&nbsp;&nbsp;'+x+' -</label><input type="radio" name="koszyk_exp_imp_nr" id="koszyk_exp_imp_nr'+x+'" value="'+x+'" title="Koszyk nr '+x+'">'
    } //koniec pętli
   
    //import button
    zawartosc += '<br><input type="button" class="button" id="button_export" value="Export" style="margin-top: 5px; margin-left: 4px;">';
    //export button
    zawartosc += '<input type="button" class="button" id="button_import" value="Import" style="margin-top: 5px; margin-left: 4px;">';
    
    //Generujemy okno
    var tmp = newElem('div');
    tmp.innerHTML = zawartosc;
    zbudujOknoMenu(tmp, 411);
    
    //obsługa zdarzeń
    u.document.getElementById('button_export').addEventListener("click", function(){exportuj();}, false);
    u.document.getElementById('button_import').addEventListener("click", function(){importuj_pytanie();}, false);

    for(var y=1; y<=ile_koszykow; y++){
        var koszyk_nazwa = document.getElementById('Koszyk_nazwa_'+y);
        koszyk_nazwa.addEventListener("click", zmien_nazwe, false);
        var koszyk_pokaz = document.getElementById('Koszyk_pokaz_'+y);
        koszyk_pokaz.addEventListener("click", pokazZawartosc, false);
        var koszyk_oproznij = document.getElementById('Koszyk_oproznij_'+y);
        koszyk_oproznij.addEventListener("click", oproznijKoszyk, false);
        var koszyk_HTML = document.getElementById('Koszyk_HTML_'+y);
        koszyk_HTML.addEventListener("click", pokazHTML, false);
        var koszyk_BB = document.getElementById('Koszyk_BB_'+y);
        koszyk_BB.addEventListener("click", pokazBB, false);
    }
    
    for(var x=1; x<=5; x++){
        if(x==ile_koszykow) {
            document.getElementById('koszyk_nr' + x).checked=true;
        };
        var input = document.getElementById('koszyk_nr' + x);
        input.addEventListener("click", config, false);
    }
    document.getElementById('koszyk_exp_imp_nr0').checked=true;
    var checkbox = document.getElementById('zamKarta');
    checkbox.checked = zamykac_karte;
    checkbox.addEventListener("click", config1, false);
}


function pokazZawartosc(e){
    var nr_koszyka = e.target.id.split("_")[2];
    var koszyk_popup_div = document.getElementById('pwObscure');
    u.document.body.removeChild(koszyk_popup_div);
    odswiezZawartosc(nr_koszyka);
}

function odswiezZawartosc(x){
    if (document.getElementById('pwObscure')) {
        var koszyk_popup_div = document.getElementById('pwObscure');
        u.document.body.removeChild(koszyk_popup_div);
    }
    var tmp = newElem("div");
    //<input type="hidden" id="Koszyk_nr" value="1">
    var label = newElem("input");
    label.type = "hidden";
    label.id = "Koszyk_nr";
    label.value = x;
    tmp.appendChild(label);

    tmp.appendChild(newElem("br"));
    var tabelka = newElem("table");
    tabelka.style.cssText = "width: 90%";
    tabelka.align = "center";
    tabelka.cellSpacing = 0;
    tabelka.appendChild(nowyWiersz("Profil", "Powód", null, null, true, null));
    for (w=0; w<wpisy(x).length; w++){
        tabelka.appendChild(nowyWiersz(wpisy(x)[w]["profil"], wpisy(x)[w]["info"], wpisy(x)[w]["av"], w));
    }
    tmp.appendChild(tabelka);
    zbudujOknoMenu(tmp, 800, 500);
}

function pokazHTML(e){
    var nr_koszyka = e.target.id.split("_")[2];
    var koszyk_popup_div = document.getElementById('pwObscure');
    u.document.body.removeChild(koszyk_popup_div);
    var zawartosc = "";
    zawartosc += '<div style="font-size: 8pt; font-family: Courier New">\n';
    for (w=0; w<wpisy(nr_koszyka).length; w++){
        if (wpisy(nr_koszyka)[w]["info"] == ""){
            zawartosc += [w+1] + ' &lt;a href="' + wpisy(nr_koszyka)[w]["profil"] + '"&gt; &lt;img style="width: 32px; height: 32px;" src="' + wpisy(nr_koszyka)[w]["av"] + '"&gt; ' + wpisy(nr_koszyka)[w]["profil"] + '&lt;/a&gt; &lt;br/&gt; <br />\n';
        }else{
            zawartosc += [w+1] + ' &lt;a href="' + wpisy(nr_koszyka)[w]["profil"] + '"&gt; &lt;img style="width: 32px; height: 32px;" src="' + wpisy(nr_koszyka)[w]["av"] + '"&gt; ' + wpisy(nr_koszyka)[w]["profil"] + '&lt;/a&gt; - ' + wpisy(nr_koszyka)[w]["info"] + '&lt;br/&gt; <br />\n';
        }
    }
    zawartosc += '<br>\n<br>\n</div>\n';
    var tmp = newElem('div');
    tmp.innerHTML = zawartosc;
    zbudujOknoMenu(tmp, 800, 500);
}

function pokazBB(e){
    var nr_koszyka = e.target.id.split("_")[2];
    var koszyk_popup_div = document.getElementById('pwObscure');
    u.document.body.removeChild(koszyk_popup_div);
   
    var zawartosc = "";
    zawartosc += '<div style="font-size: 8pt; font-family: Courier New">\n';
    for (w=0; w<wpisy(nr_koszyka).length; w++){
        var profil_ok = ukryjBluzgi(wpisy(nr_koszyka)[w]["profil"]);
        if (wpisy(nr_koszyka)[w]["info"] == ""){
            zawartosc += [w+1] + " [URL=" + wpisy(nr_koszyka)[w]["profil"] + "] [IMG]" + wpisy(nr_koszyka)[w]["av"] + "[/IMG] " + wpisy(nr_koszyka)[w]["profil"] + "[/URL]<br>\n";
        }else{
            zawartosc += ( [w+1] + " [URL=" + profil_ok + "] [IMG]" + wpisy(nr_koszyka)[w]["av"] + "[/IMG] " + profil_ok + "[/URL] - " + wpisy(nr_koszyka)[w]["info"] + "<br>\n");
        }
    }
    zawartosc += '<br>\n<br>\n</div>\n';
    var tmp = newElem('div');
    tmp.innerHTML = zawartosc;
    zbudujOknoMenu(tmp, 800, 500);
}

function importuj_pytanie(){
    var kosz = $('input[name="koszyk_exp_imp_nr"]:checked').val();
    var koszOd;
    var koszDo;
    if (kosz==0) {koszOd = 1;koszDo = ile_koszykow;} else {koszOd = koszDo = kosz;}
    var pelny = false;
    for(var x=koszOd; x<=koszDo; x++){
        pelny = pelny | (wpisy(x).length > 0);
        if(pelny) {
            break;
        }
    }
    if(pelny) {
        var msg = new u.MessageBox('W koszyku są profile. Czy napewno zrobić import?');
        msg.addButton({
            'type': u.MessageBoxButtons.BUTTON,
            'title': 'Tak',
            'event': function() {
                importuj(kosz);
            }
        });
        msg.addButton({
            'type': u.MessageBoxButtons.BUTTON,
            'title': 'Nie',
            'event': function() {
                msg.hide();
            }
        });
        msg.show();
    } else {
        importuj();
    }
}
function importuj(){
    var kosz = $('input[name="koszyk_exp_imp_nr"]:checked').val();
    var button_import_plik = newElem("input");
    button_import_plik.type = "file";
    button_import_plik.click();
    button_import_plik.onchange = function(event) {
        var fileList = button_import_plik.files;
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            if (evt.target.readyState == FileReader.DONE) {
                var odpowiedz = evt.target.result.split("[koszykBozara]");
                if ((kosz==0 && odpowiedz.length == 6) || (kosz!=0 && odpowiedz.length == 2)){
                    var koszOd;
                    var koszDo;
                    if (kosz==0) {koszOd = 1;koszDo = 5;} else {koszOd = kosz; koszDo = kosz;}
                    for(var x=koszOd; x<=koszDo; x++){
                        var y;
                        if (kosz==0) {y = x;} else {y = 1;}
                        GM_setValue("KoszykPRO"+x, odpowiedz[y]);
                    }
                    alert("Profile wczytane. Będą widoczne po odświeżeniu strony");
                } else {
                    alert("Plik profili jest uszkodzony. Proszę wgrać prawidłowy.");
                }
            }
        }
        reader.readAsText(fileList[0]);
    }
}
function exportuj(){
    var kosz = $('input[name="koszyk_exp_imp_nr"]:checked').val();
    var koszOd;
    var koszDo;
    var dane = "";
    if (kosz==0) {koszOd = 1;koszDo = 5;} else {koszOd = kosz; koszDo = kosz;}
    for(var x=koszOd; x<=koszDo; x++){
        dane += '[koszykBozara]';
        if (!GM_getValue("KoszykPRO"+x)) {
            dane += '[]\n';
        } else {
            dane += GM_getValue("KoszykPRO"+x)+"\n";
        }
    }
    var a = newElem("a");
    a.href = 'data:attachment/txt,' + encodeURI(dane);
    a.download = 'profile_w_koszykach.txt';
    $('#button_export').after(a);
    a.click();
    a.remove();
}


// ----------------------- Obsługa profilu ----------------------- //
function dodajPrzyciskProfil(){
    var bylo = false;
    var koszyk;
    var powod;
    var url = "http://www.fotka.pl/profil/" + u.profile_login + "/";
    for(var x=1; x<=ile_koszykow; x++){
        for(i=0; i<wpisy(x).length; i++){
            bylo = bylo | (wpisy(x)[i]["profil"] == url);
            if(bylo) {
                koszyk=nazwa_koszyka()[x];
                powod=wpisy(x)[i]["info"];
                break;
            }
        }
    }
    var l = $("#profile-actions h1");
    if (l != null){        
        var p = newElem("IMG");
        p.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB10lEQVQ4jY2SvWsUURTFf3fmfSVhN5FdMSQLFmKhf4OIrYXWStJZaLYUtBCEYCVWVlkby2AvSEolCPYWNhpJoTFqoq5LdrPzZuZamEjIToIHXnM4nHfuvUdijByEMQa5bpeAhQN0R5/FNlVQ1ZEn86l+6X3Q7f6Gbv5eU5lPtUqnqpg8z0cSGAt5OSAvd/9ytvLvfb0ZIZ1TuvEbsdjFph7n9GiDqgTWKcO8z07cYsI2sccZtO6NLAwfIJGEqJFEEnxQpu/KYZfO5iNty+n76PKtZSbdKUziKTTSj11yHfJ55x2zE+cx4hi3U6Riycsh3ewrc0/mWH+gYlyArcE6b7dfIGJIJcWkhu+D94gkfOytcnLsLLHIKcocpWBm/Bwu7I0QPPwYfiKkkyRpQkg8LnWkScZa7xVnapeomQZZkbFbDimLkp/DDYLfM/CBztLLzsKh+Vi8eptIi8ZYg8XnD0eW5wMdAPPmZmwD/1pmjOHCU9HGWIPEtDhhG/gAr2+oVF6hqgc+QN3VCW4GRx0fjrxidQ+cg7qdJUk9ZdHEuWMMqhJYB1mR4WiSFRn2OAMRMcAUMA00gdrFx6zcWb12eV/UXWdFRK4APWAL2AR+qWouqkfX9H/wB9WxyXV1kNA7AAAAAElFTkSuQmCC";
        p.id = "przycisk_dodaj";
        p.title = "dodaj na listę";
        p.style.position = "relative";
        p.style.top = "3px";
        p.style.marginLeft = "4px";
        if(!bylo) {
            p.addEventListener("click", pokazMenuPowod, false);
            p.style.cursor = "pointer";
        }
        if(bylo){
            p.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjExR/NCNwAAAiNJREFUOE+Nkk9IVFEUxo8zoxNKf6CFbcIWtQkDIRcSNIQLmY0QMouKigQx+icUBBK0CjchmJTPcNG4EQYjHZCxFhNCRS4iBpwRI2eoZjCttBoH1Hjq1zln5g5vchYtfpx7z/2+77z73qNtIj8zDaJdtm0TwKszHouBA0v6JRBdUi2b57iA63MJkWbFeTcWc0msrH3F0moKsi8aGdYGC55BSTrEi0/OkMp2NzLZOJNQZF/GvM74zeOUhOzvcCGx/BKxbxGuUdRcdmnAv2bpkdxb7+4IidYRYl+e4VUmiPdLE9h3o0JMO8waUHubLAZCYychvZf7LMw2H8fU/IA+Rag+39vwEM4G8lrxaUDdXcKbhRHEf0Qxt/Ia89PD2NxTo4ZF32F8D5zU9ba3CunRXtWJXnwacKSHEE72wJo5h8H4RQwl2hEeb8PGbo8ahU2vG5OPW1hzAQOsG0/eg/g04Fgv4cnsFWX4wzWEPt7CWKob6eaDxYCf9QfwNN6l50YrPg1ofEQWAycTTYXJVS7Y1ZW6fnuUcKKvRJd/B+YrGMzb3vJ68G7Eh5mp68hV5wP5rPizGYoLwZjF8DnShVj2JmazD9HJ9+WzX4WQoNOzY7IIr94nZNbGsPBnSKt/lLVEDeVCSiYXBA2tYUIqF1KzVNmroUwIbRG9kIZNtHqHqIOIWn0PaLItQjDIXvrMqX6iAHt+i4c5rdPNZJ3yH7C+ifXdAOgvkUBDbBT6vAkAAAAASUVORK5CYII=";
            p.title = "Profil jest w: "+koszyk+". Powód: "+powod;
        }
        l.append(p);
    }    
}
function dodajMenuPowod(){
    var menu = newElem("div");
    menu.id = "koszyk_menu";
    menu.style.cssText = "border: 1px solid rgb(197, 197, 197); padding: 0px 3px 3px; z-index: 101; position: fixed; display: block; background-color: rgb(255, 255, 255); text-align: left; background-image: url(http://www.fotka.pl/img/operacje/menu.gif); background-repeat: no-repeat; display: none;";
    menu.style.top = $("#przycisk_dodaj").offset().top + "px";
    menu.style.left = $("#przycisk_dodaj").offset().left + "px";
    var f_powod = newElem("input");
    f_powod.id = "f_powod";
    f_powod.type = "textbox";
    f_powod.size = 25;
    f_powod.addEventListener("keypress", czyEnter, false);
    var ok = newElem("input");
    ok.type = "button";
    ok.value = "OK";
    ok.style.cssFloat = "none";
    ok.className = "voteAdd eleven";
    ok.addEventListener("click", dodajProfil, false);
    var info = newElem("div");
    info.innerHTML = "<br/><b>powod:</b>";
    menu.appendChild(info);
    menu.appendChild(f_powod);
    menu.appendChild(ok);
    //koszyki
    if(ile_koszykow==1) {
        var i = newElem("input");
        i.type = "radio";
        i.name = "koszyk_nr";
        i.value = 1;
        i.checked=true;
        i.className = "hidden";
        menu.appendChild(i);
    } else {
        var label = newElem("label");
        label.innerHTML = "<br>Koszyk nr:<br>";
        label.style.fontSize = "10px";
        menu.appendChild(label);
    //pętla dla koszyków
        for(var x=1; x<=ile_koszykow; x++){
            var l = newElem("label");
            l.innerHTML = " &nbsp;&nbsp;" + x;
            menu.appendChild(l);
            var i = newElem("input");
            i.type = "radio";
            i.name = "koszyk_nr";
            i.value = x;
            i.title = nazwa_koszyka()[x];
            if(x==input_nr) {i.checked=true};
            menu.appendChild(i);
        }
    //koniec pętli
    }
    $("#content").append(menu);
}
function pokazMenuPowod(){
    $("#przycisk_dodaj").css("display", "none");
    $("#koszyk_menu").css("display", "");
    $("#f_powod").focus();
}
function dodajProfil(){
    var login = u.profile_login;
    var powod = $("#f_powod").val();
    var av = u.profile_av_32_url;
    var koszyk_nr;
    var inputy = document.getElementsByName("koszyk_nr");
    for(var i = 0; i < inputy.length; i++) {
        if(inputy[i].checked) koszyk_nr = inputy[i].value;
    }
    GM_setValue("input_nr", koszyk_nr);
    dodajWpis("http://www.fotka.pl/profil/" + login + "/", powod, av, koszyk_nr);
    $("#koszyk_menu").hide("fast");
    poz_ileProfili[koszyk_nr].innerHTML = wpisy(koszyk_nr).length;
}
function dodajWpis(url, powod, avatar, nr_koszyka){
    var tmp = wpisy(nr_koszyka);
    tmp.push({profil: url, av: avatar, info: powod});
    GM_setValue("KoszykPRO"+nr_koszyka, JSON.stringify(tmp));
    if (zamykac_karte) { self.close(); };
}
function usunWpis(e){
    var nr_koszyka =  u.document.getElementById('Koszyk_nr').value;
    e.target.parentNode.parentNode.style.textDecoration = "line-through";
    e.target.removeEventListener("click", usunWpis, false);
    var tmp = wpisy(nr_koszyka);
    tmp.splice(e.target.id.split("_")[1], 1);
    GM_setValue("KoszykPRO"+nr_koszyka, JSON.stringify(tmp));
    poz_ileProfili[nr_koszyka].innerHTML = wpisy(nr_koszyka).length;
    odswiezZawartosc(nr_koszyka);
}

// ----------------------- Inne funkcje ----------------------- //
function newElem(type){
    return document.createElement(type);
}
function czyEnter(e){
    if (e.keyCode == 13){
        dodajProfil();
    }
}
function zbudujOknoMenu(text, w, h){
    //<div id="pwObscure" class="fotkaLightBoxObscure" tabindex="0">
    var div1 = newElem("div");
    div1.id = 'pwObscure';
    div1.setAttribute('class', 'fotkaLightBoxObscure');
    //<div id="pwContainer" class="fotkaLightBoxContainer pwclass"> 
    var div2 = newElem("div");
    div2.className = "fotkaLightBoxContainer pwclass";
    div2.style.cssText = "top: 10px;";
    div1.appendChild(div2);
    //<div class="fotkaLightBox" style="width: 411px;">
    var div3 = newElem("div");
    div3.className = "fotkaLightBox";
    div3.style.cssText = "width: "+w+"px;";
    div2.appendChild(div3);
    //<div id="fotkaLightBoxClose" class="sprites ico-lightbox-close"></div>
    var div4 = newElem("div");
    div4.id = "fotkaLightBoxClose";
    div4.className = "sprites ico-lightbox-close";
    div4.addEventListener('click', function(){unsafeWindow.document.body.removeChild(div1);}, false);
    div3.appendChild(div4);
    //<div class="fotkaLightBorder">
    var div5 = newElem("div");
    div5.className = "fotkaLightBorder";
    div3.appendChild(div5);
    //<div id="pwBox" class="fotkaLightContent" style="padding: 20px;">
    var div6 = newElem("div");
    div6.className = "fotkaLightContent";
    div6.style.cssText = "padding: 0px 20px 20px 20px;";
    if (h>0) {div6.style.cssText = "padding: 0px 20px 20px 20px; white-space: nowrap; overflow-x: auto; overflow-y: auto; height: "+h+"px;"; }
    div5.appendChild(div6);
    
    //tutaj wstawiamy zawartość 
    div6.appendChild(text);

    unsafeWindow.document.body.appendChild(div1);                     
};

function nowyWiersz(profil, powod, avatar, n, naglowek){
    var tr = newElem("tr");
    var td = new Array(5);
    for(i=0; i<5; i++){
        td[i] = newElem("td");
        td[i].className = "b22";
        td[i].style.cssText = 'padding: 3px; border-bottom-width: 1px; border-bottom-style: solid; border-color:#DDDDDD; font-size: 12px; font-family: "Trebuchet MS",Verdana,Arial,sans-serif;';
        tr.appendChild(td[i]);
    }
    if (!powod) { powod = "&nbsp;";}
    td[3].innerHTML = powod;
    if(!naglowek){
        var przycisk = newElem("IMG");
        przycisk.src = "http://s.fotka.pl/img/operacje/delete.png";
        przycisk.style.cursor = "pointer";
        przycisk.addEventListener("click", usunWpis, false);
        przycisk.id = "delete_"+n;
        td[4].align = "center";
        td[4].appendChild(przycisk);
        var a = newElem("a");
        a.href = profil;
        a.innerHTML = profil;
        a.target = "_blank" ;
        td[2].appendChild(a);
        var av = newElem("img");
        av.src = avatar;
        av.style.width = "32px";
        av.style.height = "32px";
        td[1].appendChild(av);
        td[0].innerHTML = n+1;
    }else{
        td[2].innerHTML = profil;
        td[4].innerHTML = "Usuń";
        td[0].innerHTML = "Lp";
        for(i=0; i<5; i++){
            td[i].style.cssText = 'font-weight: bold; border-bottom: 1px solid rgb(221, 221, 221); background-color: rgb(238, 238, 238); font-size: 12px; font-family: "Trebuchet MS",Verdana,Arial,sans-serif;';
        }
    }
    return tr;
}

function openInNewWindow(){
}

// używamy tego zamiast zwykłej zmiennej po to, żeby mieć zawsze aktualną wersję bazy, która mogła być zmieniona w innej zakładce
function wpisy(x){
    var temp;
    if(x==1){temp=helpText;}else{temp=[];}
    try{
        return JSON.parse(GM_getValue("KoszykPRO"+x, temp));
    }catch(e){
        return [];
    }
}
function nazwa_koszyka(){
     try{
        return JSON.parse(GM_getValue("nazwy_koszykow", nazwyTMP));
    }catch(e){
        return [];
    }
}
function zmien_nazwe(e){
    var nr_koszyka = e.target.id.split("_")[2];
     var nazwy = nazwa_koszyka();
    	var res = prompt("Podaj nazwę koszyka");
    	if(res == null) return;
    nazwy.splice(nr_koszyka,1,res);
    GM_setValue("nazwy_koszykow", JSON.stringify(nazwy));
}
function oproznijKoszyk(e){
    var nr_koszyka = e.target.id.split("_")[2];
    var koszyk_popup_div = document.getElementById('pwObscure');
    u.document.body.removeChild(koszyk_popup_div);
    var n = wpisy(nr_koszyka).length;
    if (n>0){
        if (confirm("Czy na pewno chcesz usuńąć " + n + " profili z koszyka?")){
            GM_setValue("KoszykPRO"+nr_koszyka, "[]");
            poz_ileProfili[nr_koszyka].innerHTML = "0";
        }
    }
}
function config(){
    for(var x=1; x<=5; x++){
        var zaznaczony = document.getElementById('koszyk_nr' + x).checked;
        if (zaznaczony) {
            GM_setValue("ile_koszykow", x);
            alert("Ustawienia zapisane. Będą widoczne po odświeżeniu strony");
        }
    }
}
function config1(){
    var zaznaczony = document.getElementById('zamKarta').checked;
    GM_setValue("zamykac_karte", zaznaczony);
    alert("Ustawienia zapisane. Będą widoczne po odświeżeniu strony");
}
function ukryjBluzgi(str){
    var bluzglista = [["kurw","ku_w"], ["kurv","ku_v"], ["chuj","ch_j"], ["pierdal","pie_dal"], ["pierdol","pie_dol"], ["jeb","j_b"], ["pizd","pi_d"], ["huj","h_j"]];
    var oryginalny = str;
    for(i=0; i<bluzglista.length; i++){
        str = str.replace(new RegExp(bluzglista[i][0], "ig"), bluzglista[i][1]);
    }
    str = copyCase(str, oryginalny);
    return str;
}
function copyCase(source, pattern){        // (C)BOZAR 2010
    var out = "";
    for(i=0; i<pattern.length; i++){
        if(pattern.charAt(i) == pattern.charAt(i).toUpperCase()){
            out = out + source.substring(i,i+1).toUpperCase();
        }else{
            out = out + source.substring(i,i+1).toLowerCase();
        }
    }
    return out;
}