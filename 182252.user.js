// ==UserScript==
// @name           MultiKoszyk Bozara fotka.pl
// @description    umożliwia dodawanie profili na podręczną listę, na kształt ulubionych WERSJA MAX 5 KOSZYKÓW
// @namespace      http://www.fotka.pl/profil/suchar/
// @include        http://www.fotka.pl/*
// @version        1.5
// @copyright      2013+, suchar
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
var popup;
var u = unsafeWindow;
var $ = u.$;
var koszyk_popup_div;

if(!$) return;
if (document.getElementById("content")){ // czy to nie popup?
    dodajNoweMenu();
    if (document.getElementById("profile-grid") != null){ // czy jesteśmy na profilu?
        dodajPrzycisk();
        dodajMenuKontekstowe();
    }
}
function odswiezPopup(x){
    popup.document.open();
    var panel = newElem("div");
    var tabelka = newElem("table");
    tabelka.width = "90%";
    tabelka.align = "center";
    tabelka.cellSpacing = 0;
    tabelka.appendChild(nowyWiersz("Profil", "powod", null, null, true, null));
    for (w=0; w<wpisy(x).length; w++){
        tabelka.appendChild(nowyWiersz(wpisy(x)[w]["profil"], wpisy(x)[w]["info"], wpisy(x)[w]["av"], w));
    }
    panel.appendChild(tabelka);
    popup.document.write("<head> <style type='text/css'>" + 'a:visited {background-color:transparent;color:#98AEB8;}.k10, h1, h2, a, a:hover, a.k01:hover,a.k21:hover, a.k10:visited {color:#4996BA;} table {font-size:12px;} body {color:#666666;font-family:"Trebuchet MS",Verdana,Arial,sans-serif;font-size:12px;} .b22, h2 {border-color:#DDDDDD;}' + "</style> <title>Koszyk "+x+"</title></head>");
    popup.document.body = newElem("body");
    popup.document.body.appendChild(newElem("br"));
    popup.document.body.appendChild(panel);
    //popup.document.close();
    
}
function pokazPopup(e){
    var nr_koszyka = e.target.id.split("_")[2];
    u.document.body.removeChild(koszyk_popup_div);
    popup = window.open("", "Koszyk", "height=350,width=600,scrollbars=1,resizable=no");
    odswiezPopup(nr_koszyka);
    popup.window.focus();
}
function pokazHTML(e){
    var nr_koszyka = e.target.id.split("_")[2];
    u.document.body.removeChild(koszyk_popup_div);
    var popup = window.open("", "Wykres", "height=200,width=800,scrollbars=1,resizable=no")
    popup.document.open();
    popup.document.write("<head><title>Koszyk "+nr_koszyka+"</title></head>");
    popup.document.write('<div style="font-size: 8pt; font-family: Courier New">');
    for (w=0; w<wpisy(nr_koszyka).length; w++){
        if (wpisy(nr_koszyka)[w]["info"] == ""){
            popup.document.write([w+1] + ' &lt;a href="' + wpisy(nr_koszyka)[w]["profil"] + '"&gt; &lt;img style="width: 32px; height: 32px;" src="' + wpisy(nr_koszyka)[w]["av"] + '"&gt; ' + wpisy(nr_koszyka)[w]["profil"] + '&lt;/a&gt; &lt;br/&gt; <br />');
        }else{
            popup.document.write([w+1] + ' &lt;a href="' + wpisy(nr_koszyka)[w]["profil"] + '"&gt; &lt;img style="width: 32px; height: 32px;" src="' + wpisy(nr_koszyka)[w]["av"] + '"&gt; ' + wpisy(nr_koszyka)[w]["profil"] + '&lt;/a&gt; - ' + wpisy(nr_koszyka)[w]["info"] + '&lt;br/&gt; <br />');
        }
    }
    popup.document.write('</div>');
    popup.document.close();
    popup.window.focus();
}
function pokazBB(e){
    var nr_koszyka = e.target.id.split("_")[2];
    u.document.body.removeChild(koszyk_popup_div);
    var popup = window.open("", "Wykres", "height=200,width=800,scrollbars=1,resizable=no")
    popup.document.open();
    popup.document.write("<head><title>Koszyk "+nr_koszyka+"</title></head>");
    popup.document.write('<div style="font-size: 8pt; font-family: Courier New">');
    for (w=0; w<wpisy(nr_koszyka).length; w++){
        var profil_ok = ukryjBluzgi(wpisy(nr_koszyka)[w]["profil"]);
        if (wpisy(nr_koszyka)[w]["info"] == ""){
            popup.document.write( [w+1] + " [URL=" + wpisy(nr_koszyka)[w]["profil"] + "] [IMG]" + wpisy(nr_koszyka)[w]["av"] + "[/IMG] " + wpisy(nr_koszyka)[w]["profil"] + "[/URL]<br>");
        }else{
            popup.document.write( [w+1] + " [URL=" + profil_ok + "] [IMG]" + wpisy(nr_koszyka)[w]["av"] + "[/IMG] " + profil_ok + "[/URL] - " + wpisy(nr_koszyka)[w]["info"] + "<br>");
        }
    }
    popup.document.write('</div>');
    popup.document.close();
    popup.window.focus();
}
function usunWpis(e){
    var nr_koszyka = e.target.ownerDocument.title.split(" ")[1];
    e.target.parentNode.parentNode.style.textDecoration = "line-through";
    e.target.removeEventListener("click", usunWpis, false);
    var tmp = wpisy(nr_koszyka);
    tmp.splice(e.target.id.split("_")[1], 1);
    GM_setValue("KoszykPRO"+nr_koszyka, JSON.stringify(tmp));
    poz_ileProfili[nr_koszyka].innerHTML = wpisy(nr_koszyka).length;
    odswiezPopup(nr_koszyka);
}
function dodajNoweMenu(){
    var noweMenu = newElem("div");
    noweMenu.id = "menu-koszyk";
    noweMenu.className = "header-menu-item";
    var span1 = newElem("span");
    noweMenu.appendChild(span1);
    
    //pętla dla koszyków
    for(var x=1; x<=ile_koszykow; x++){
        var span2 = newElem("span");
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
    a.addEventListener("click", pokazMenuGorne, false);
    a.innerHTML = "Koszyk";
    a.className = "k20" ;
    a.style.cssText = "margin-left:0;";
    noweMenu.appendChild(a);
    $("#pw-counter").before(noweMenu);
    
    //kreska rozdzielająca
    var div1 = newElem("div");
    div1.className = "sprites-menu header-menu-separator-big";
    $("#pw-counter").before(div1);
}

function pokazMenuGorne(){
    koszyk_popup_div = newElem('div');
    koszyk_popup_div.id = 'pwObscure';
    koszyk_popup_div.setAttribute('class', 'fotkaLightBoxObscure');
    
    var temp;
    temp = '<div id="pwContainer" class="fotkaLightBoxContainer pwclass" style="top: 10px;">\
                                    <div class="fotkaLightBox" style="width: 411px;">\
                                        <div id="fotkaLightBoxClose" class="icos24"></div>\
                                        <div class="fotkaLightBorder">\
                                            <div id="pwBox" class="fotkaLightContent" style="padding: 0px 20px 20px 20px;">';
    for(var x=1; x<=ile_koszykow; x++){
    temp += '            <br><div style="font-size: 15px;">'+nazwa_koszyka()[x]+' ('+wpisy(x).length+')<img id="Koszyk_nazwa_'+x+'" src="data:image/gif;base64,R0lGODlhDgAOANU8ANDQ0K2trbe3t8jIyHt7e5KSks3NzczMzMLCwq6urmhoaLu7u5eXl5WVld7e3ouLi7+/v29vb2tra6+vr5qamsHBwd3d3Y6OjomJicrKys/Pz7y8vOPj44GBgWNjY3R0dNzc3NTU1KmpqaWlpW5ubtXV1aioqH19fZ2dnXh4eHl5eaGhoYeHh7q6uuLi4pGRkcDAwIqKinV1ddLS0oiIiH9/f7S0tGdnZ8PDw7Ozs8fHx2JiYgAAAAAAAAAAAAAAACH5BAEAADwALAAAAAAOAA4AAAZoQJ5wKFyNUMQkL8BxFJTDhmv2gA4LDphKmGAoWaABJRaweIk1HMAA0JQGHSIBAdDZD4gTMQUxVCANHgoKRDIbBy0LLztKEQsZNgIXjEkfAjoJOQ+USQQhJhMYnEkRIgE0o0oSJDdWQkEAOw%3D%3D" style="cursor: pointer;  margin: 0px 2px;" title="Zmiana nazwy koszyka"></div>\
                                                <table style="width: 100%;"><tr><td><a href="javascript:void(0)" id="Koszyk_pokaz_'+x+'">Pokaż zawartość</a></td>\
                                                <td><a href="javascript:void(0)" id="Koszyk_HTML_'+x+'">Pokaż HTML</a></td>\
                                                <td><a href="javascript:void(0)" id="Koszyk_BB_'+x+'">Pokaż BB</a></td>\
                                                <td><a href="javascript:void(0)" id="Koszyk_oproznij_'+x+'">Opróżnij koszyk</a></td></tr></table>';
    }
    
    var xxx = newElem("div");
    var label = newElem("label");
    label.innerHTML = "<hr>Ilość koszyków<br>";
    xxx.appendChild(label);

    //pętla dla koszyków
    for(var x=1; x<=5; x++){
        var l = newElem("label");
        if(x==1) {l.innerHTML = x+" - ";} else {l.innerHTML = " &nbsp;&nbsp;&nbsp;&nbsp;" + x+" - ";};
        xxx.appendChild(l);
        var i = newElem("input");
        i.type = "radio";
        i.name = "koszyk_nr";
        i.id = "koszyk_nr" + x;
        i.value = x;
        i.title = nazwa_koszyka()[x];
        xxx.appendChild(i);
    } //koniec pętli
    temp += xxx.innerHTML;
    
    var xxx1 = newElem("div");
    var label = newElem("label");
    label.innerHTML = "<br><hr>Zamykać kartę po dodaniu do koszyka ? &nbsp;";
    xxx1.appendChild(label);
    var i = newElem("input");
    i.type = "checkbox";
    i.name = "zamKarta";
    i.id = "zamKarta";
    label.appendChild(i);
    temp += xxx1.innerHTML;
    temp += "<hr>Export / Import dotyczy koszyka :<br>";
    
    
    var xxx4 = newElem("div");

    //wszystkie
    var l = newElem("label");
    l.innerHTML = "Wszystkie -";
    xxx4.appendChild(l);
    var i = newElem("input");
    i.type = "radio";
    i.name = "koszyk_exp_imp_nr";
    i.id = "koszyk_exp_imp_nr" + 0;
    i.value = 0;
    xxx4.appendChild(i);
    
    //pętla dla koszyków przy exporcie
    for(var x=1; x<=ile_koszykow; x++){
        var l = newElem("label");
        l.innerHTML = " &nbsp;&nbsp;&nbsp;"+x+" -";
        xxx4.appendChild(l);
        var i = newElem("input");
        i.type = "radio";
        i.name = "koszyk_exp_imp_nr";
        i.id = "koszyk_exp_imp_nr" + x;
        i.value = x;
        i.title = nazwa_koszyka()[x];
        xxx4.appendChild(i);
    } //koniec pętli
    temp += xxx4.innerHTML;
    
    temp += "<br>";
    
    //import
    var xxx2 = newElem("div");
    var button_export = newElem("input");
    button_export.type = "button";
    button_export.className = "button";
    button_export.id = "button_export";
    button_export.value = "Export";
    button_export.style.marginTop = "5px";
    button_export.style.marginLeft = "4px";
    xxx2.appendChild(button_export);
    temp += xxx2.innerHTML;
    
    
    //export
    var xxx3 = newElem("div");
    var button_import = newElem("input");
    button_import.type = "button";
    button_import.className = "button";
    button_import.id = "button_import";
    button_import.value = "Import";
    button_import.style.marginTop = "5px";
    button_import.style.marginLeft = "4px";
    xxx3.appendChild(button_import);
    temp += xxx3.innerHTML;

    
    temp += '                                            </div>\
                                        </div>\
                                    </div>\
                                </div>';
    koszyk_popup_div.innerHTML = temp;
    u.document.body.appendChild(koszyk_popup_div);
    
    u.document.getElementById('button_export').addEventListener("click", function(){exportuj();}, false);
    u.document.getElementById('button_import').addEventListener("click", function(){importuj_pytanie();}, false);
    u.document.getElementById('fotkaLightBoxClose').addEventListener('click', function(){u.document.body.removeChild(koszyk_popup_div);}, false);
    
    for(var y=1; y<=ile_koszykow; y++){
        var koszyk_nazwa = document.getElementById('Koszyk_nazwa_'+y);
        koszyk_nazwa.addEventListener("click", zmien_nazwe, false);
        var koszyk_pokaz = document.getElementById('Koszyk_pokaz_'+y);
        koszyk_pokaz.addEventListener("click", pokazPopup, false);
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
};
function dodajWpis(url, powod, avatar, nr_koszyka){
    var tmp = wpisy(nr_koszyka);
    tmp.push({profil: url, av: avatar, info: powod});
    GM_setValue("KoszykPRO"+nr_koszyka, JSON.stringify(tmp));
    if (zamykac_karte) { self.close(); };
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
function dodajPrzycisk(){
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
    var l = $("#obok-av h1");
    if (l != null){        
        var p = newElem("IMG");
        p.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB10lEQVQ4jY2SvWsUURTFf3fmfSVhN5FdMSQLFmKhf4OIrYXWStJZaLYUtBCEYCVWVlkby2AvSEolCPYWNhpJoTFqoq5LdrPzZuZamEjIToIHXnM4nHfuvUdijByEMQa5bpeAhQN0R5/FNlVQ1ZEn86l+6X3Q7f6Gbv5eU5lPtUqnqpg8z0cSGAt5OSAvd/9ytvLvfb0ZIZ1TuvEbsdjFph7n9GiDqgTWKcO8z07cYsI2sccZtO6NLAwfIJGEqJFEEnxQpu/KYZfO5iNty+n76PKtZSbdKUziKTTSj11yHfJ55x2zE+cx4hi3U6Riycsh3ewrc0/mWH+gYlyArcE6b7dfIGJIJcWkhu+D94gkfOytcnLsLLHIKcocpWBm/Bwu7I0QPPwYfiKkkyRpQkg8LnWkScZa7xVnapeomQZZkbFbDimLkp/DDYLfM/CBztLLzsKh+Vi8eptIi8ZYg8XnD0eW5wMdAPPmZmwD/1pmjOHCU9HGWIPEtDhhG/gAr2+oVF6hqgc+QN3VCW4GRx0fjrxidQ+cg7qdJUk9ZdHEuWMMqhJYB1mR4WiSFRn2OAMRMcAUMA00gdrFx6zcWb12eV/UXWdFRK4APWAL2AR+qWouqkfX9H/wB9WxyXV1kNA7AAAAAElFTkSuQmCC";
        p.id = "przycisk_dodaj";
        p.title = "dodaj na listę";
        p.style.position = "relative";
        p.style.top = "3px";
        p.style.marginLeft = "4px";
        if(!bylo) {
            p.addEventListener("click", pokazMenu, false);
            p.style.cursor = "pointer";
        }
        if(bylo){
            p.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjExR/NCNwAAAiNJREFUOE+Nkk9IVFEUxo8zoxNKf6CFbcIWtQkDIRcSNIQLmY0QMouKigQx+icUBBK0CjchmJTPcNG4EQYjHZCxFhNCRS4iBpwRI2eoZjCttBoH1Hjq1zln5g5vchYtfpx7z/2+77z73qNtIj8zDaJdtm0TwKszHouBA0v6JRBdUi2b57iA63MJkWbFeTcWc0msrH3F0moKsi8aGdYGC55BSTrEi0/OkMp2NzLZOJNQZF/GvM74zeOUhOzvcCGx/BKxbxGuUdRcdmnAv2bpkdxb7+4IidYRYl+e4VUmiPdLE9h3o0JMO8waUHubLAZCYychvZf7LMw2H8fU/IA+Rag+39vwEM4G8lrxaUDdXcKbhRHEf0Qxt/Ia89PD2NxTo4ZF32F8D5zU9ba3CunRXtWJXnwacKSHEE72wJo5h8H4RQwl2hEeb8PGbo8ahU2vG5OPW1hzAQOsG0/eg/g04Fgv4cnsFWX4wzWEPt7CWKob6eaDxYCf9QfwNN6l50YrPg1ofEQWAycTTYXJVS7Y1ZW6fnuUcKKvRJd/B+YrGMzb3vJ68G7Eh5mp68hV5wP5rPizGYoLwZjF8DnShVj2JmazD9HJ9+WzX4WQoNOzY7IIr94nZNbGsPBnSKt/lLVEDeVCSiYXBA2tYUIqF1KzVNmroUwIbRG9kIZNtHqHqIOIWn0PaLItQjDIXvrMqX6iAHt+i4c5rdPNZJ3yH7C+ifXdAOgvkUBDbBT6vAkAAAAASUVORK5CYII=";
            p.title = "Profil jest w: "+koszyk+". Powód: "+powod;
        }
        l.append(p);
    }    
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
function dodajMenuKontekstowe(){
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
function pokazMenu(){
    $("#przycisk_dodaj").css("display", "none");
    $("#koszyk_menu").css("display", "");
    $("#f_powod").focus();
}
function nowyWiersz(profil, powod, avatar, n, naglowek){
    var tr = newElem("tr");
    var td = new Array(5);
    for(i=0; i<5; i++){
        td[i] = newElem("td");
        td[i].className = "b22";
        td[i].style.cssText = "padding: 3px; border-bottom-width: 1px; border-bottom-style: solid; ";
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
        a.href = "javascript:void(0);"
        a.addEventListener("click", openInNewWindow, true);
        a.innerHTML = profil;
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
            td[i].style.cssText = "font-weight: bold; border-bottom: 1px solid rgb(221, 221, 221); background-color: rgb(238, 238, 238);";
        }
    }
    return tr;
}
function oproznijKoszyk(e){
    var nr_koszyka = e.target.id.split("_")[2];
    unsafeWindow.document.body.removeChild(koszyk_popup_div);
    var n = wpisy(nr_koszyka).length;
    if (n>0){
        if (confirm("Czy na pewno chcesz usuńąć " + n + " profili z koszyka?")){
            GM_setValue("KoszykPRO"+nr_koszyka, "[]");
            poz_ileProfili[nr_koszyka].innerHTML = "0";
        }
    }
}
function czyEnter(e){
    if (e.keyCode == 13){
        dodajProfil();
    }
}
function newElem(type){
    return document.createElement(type);
}
function openInNewWindow() {
    var newWindow = window.open(this.innerHTML, '_blank');
    return false;
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

function nazwa_koszyka(){
     try{
        return JSON.parse(GM_getValue("nazwy_koszykow", nazwyTMP));
    }catch(e){
        return [];
    }
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
function zmien_nazwe(e){
    var nr_koszyka = e.target.id.split("_")[2];
     var nazwy = nazwa_koszyka();
    	var res = prompt("Podaj nazwę koszyka");
    	if(res == null) return;
    nazwy.splice(nr_koszyka,1,res);
    GM_setValue("nazwy_koszykow", JSON.stringify(nazwy));
}
