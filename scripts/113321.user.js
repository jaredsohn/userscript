// ==UserScript==
// @name           Testinu_nereikalingas
// @description    Bandymas nebepirmas, bet is pirmuju
// @include        http://nkatalogas.info/suggest-link.php?id=0
// @include        http://www.nerandu.lt/nauja-nuoroda.html
// @include        http://links4u.lt/submit.php
// @include        http://www.nuoroducentras.lt/submit.php
// @include        http://www.e-nuorodos.lt/prideti-nuoroda
// @include        http://www.e-nuorodos.lt/vartotojo-aplinka/nuoroda
// @include        http://webdir24.lt/submit.php
// @include        http://naudinga.lt/patalpinti/nuoroda
// @include        http://lt.katalogas.org/pasiulyti-svetaine.html
// @include        http://www.nuorodos.net/submit.php
// @include        http://nkv.lt/add/
// @include        http://www.seolinks.lt/submit.php
// @include        http://www.dmoz.org/public/suggest
// @include        http://www.dmoz.org/public/suggest?cat=World/Lietuvi%C5%B3/Verslas/Paslaugos_verslui/Valymas
// @include        http://surask.lt/submit.php?category_id=305
// @include        http://www.weboaze.lt/lt/apie/
// @include        http://www.on.lt/lol/papildykim.htm
// @include        http://500.lt/submit.php
// @include        http://www.zinomas.lt/add.php
// @include        http://systemos.lt/catalog/?act=s_add
// @include        http://www.pridek.lt/
// @include        http://www.pridek.lt/nuorodu-katalogas/kita-pridedam-nuorodu/#comments
// @include        http://www.addlink.lt/
// @include        http://direktorija.lt/index.php?adds=25
// @include        http://www.ooo.lt/
// @include        http://www.toplaisvalaikis.lt/lt/apie/
// @include        http://dainutekstai.lt/reklama/irasymas.php
// @include        http://ieskok.penki.lt/Default.aspx?Lang=LT&Element=SearchCatalog&SCAction=AddNew&TopicID=150
// @include        http://katalogas.eu/naujas-tinklapis/
// @version        1.0
// @copyright      Tadas Ceponis
// @license        Tadas Ceponis licenzijuoja
// ==/UserScript== 

//================================= Naudojamos svetaines ===============================
/*
NKatalogas.info
*/
//================================= Pradiniai nustatymai ===============================

vard =   "Gediminas"
pav =    "Greito maisto užkandinė. \'Kebabai į namus\' ";
nuo =    "http://www.kebabaiinamus.lt"; 
el =     "info@kebabaiinamus.lt";
fot =    "C:\Documents and Settings\Tadas\Desktop\n\Autoplovykla-Kaunas.JPG"; /* Dar neveikia */ 
api =    "Greito maisto užkandinė - kebabinė" // 2-5 zodziai
apr =    " Greito maisto užkandinė jau ilgus metus džiugina klientus skaniais kebabais. Šiuo metu esame praplėte patiekalų 

menių. Taip pat Kaune tiekiame maistą, kebabus i namus. Mūsų užkandinėse rasite draugišką, paslaugų kolektyvą, kuris aptarnaus 

kokybiškai ir greitai "; // Aprasymas 40 < simboliu.
			
met =    "Kauno \'Kebabai į namus\' siūlo skanius kebabus, koldūnus, mini čeburekus, salotas. Taip pat siūlome užsisakyti kebabą 

į namus.";

rak =    "Kebabinė, Kaunas, Kebabai į namus, Greito maisto užkandinė, Didelės porcijos kebabų, Koldunai, maistas į namus, 

kebabas, Kebabinė Kaune, Turkiškas kebabas, Dainava, Šančiai, Domeikava"

mie = "Kaunas";
kat =    "53";

// Pasirinkyte kategorija kat = "10";
/*
&ndash;Asmeninės svetainės       9
&ndash;Automobiliai              2
&ndash;Įvairenybės               8 
&ndash;Bendravimas, forumai     71
&ndash;Humoras                  75
&ndash;Informacija, naujienos   10
&ndash;Kelionės, turizmas       30
&ndash;Kompiuteriai, internetas 39
&ndash;Kultūra, menas           46
&ndash;Laisvalaikis, pramogos    6
&ndash;Mokslas                  73
&ndash;Muzika                   74
&ndash;Pomėgiai                 76
&ndash;Prekyba, paslaugos       53
&ndash;Regionai                 67
&ndash;Sportas                   5
&ndash;Sveikata                 65
&ndash;Uždarbis internete        7
&ndash;Verslas                  57
&ndash;WAP puslapiai            77
&ndash;Žaidimai                 78
*/
//##################################################################################
function init (){
if (location.href == "http://nkatalogas.info/suggest-link.php?id=0"){NKatalogas();}
if (location.href == "http://www.nerandu.lt/nauja-nuoroda.html"){Nerandu();}
if (location.href == "http://links4u.lt/submit.php"){Links4u();}
if (location.href == "http://www.nuoroducentras.lt/submit.php"){Nuoroducentras();}
if (location.href == "http://www.e-nuorodos.lt/prideti-nuoroda"){ENuorodos();}
if (location.href == "http://www.e-nuorodos.lt/vartotojo-aplinka/nuoroda"){ENuorodos();}
if (location.href == "http://webdir24.lt/submit.php"){Webdir24();}
if (location.href == "http://naudinga.lt/patalpinti/nuoroda"){Naudinga();}
if (location.href == "http://lt.katalogas.org/pasiulyti-svetaine.html"){LtKatalogas();}
if (location.href == "http://www.nuorodos.net/submit.php"){NuorodosLt();}
if (location.href == "http://nkv.lt/add/"){Nkv();}
if (location.href == "http://www.seolinks.lt/submit.php"){Seolinks();}
if (location.href == "http://www.dmoz.org/public/suggest"){Dmoz();}
if (location.href == "http://www.dmoz.org/public/suggest?cat=World/Lietuvi%C5%B3/Verslas/Paslaugos_verslui/Valymas"){Dmoz();}
if (location.href == "http://surask.lt/submit.php?category_id=305"){Surask();}
if (location.href == "http://www.weboaze.lt/lt/apie/"){Weboaze();}
if (location.href == "http://www.on.lt/lol/papildykim.htm"){On();}
if (location.href == "http://500.lt/submit.php"){Penkisimtai();}
if (location.href == "http://www.zinomas.lt/add.php"){Zinomas();}
if (location.href == "http://systemos.lt/catalog/?act=s_add"){Systemos();}
if (location.href == "http://www.pridek.lt/nuorodu-katalogas/kita-pridedam-nuorodu/#comments"){Pridek();}
if (location.href == "http://www.addlink.lt/"){Addlink();}
if (location.href == "http://direktorija.lt/index.php?adds=25"){Direktorija();}
if (location.href == "http://www.ooo.lt/"){Ooo();}
if (location.href == "http://www.toplaisvalaikis.lt/lt/apie/"){Toplaisvalaikis();}
if (location.href == "http://dainutekstai.lt/reklama/irasymas.php"){Dainutekstai();}
if (location.href == "http://ieskok.penki.lt/Default.aspx?Lang=LT&Element=SearchCatalog&SCAction=AddNew&TopicID=150"){Penki();}
if (location.href == "http://katalogas.eu/naujas-tinklapis/"){FatalogasEU();}


//e = location.href;
//alert(e);
}



//################################# funkcijos ###################################
//================================= FatalogasEU.lt ==================================
function FatalogasEU(){
document.getElementById('website').value=nuo;
document.getElementById('title').value=pav;
document.getElementById('short').value=met;
}

//================================= Penki.lt ==================================
function Penki(){
var x = document.getElementsByTagName('form')[5];
x.elements.namedItem("url").value=nuo;
x.elements.namedItem("name").value=pav;
x.elements.namedItem("desc").value=apr;
x.elements.namedItem("key").value=rak;
x.elements.namedItem("uname").value=vard;
x.elements.namedItem("email").value=el;
}


//================================= Dainutekstai.lt ==================================
function Dainutekstai(){
var x = document.getElementsByTagName('form')[0];
x.elements.namedItem("adresas").value=nuo;
x.elements.namedItem("aprasymas").value=apr;
}


//=============================== Toplaisvalaikis.lt ============================
function Toplaisvalaikis(){
var x = document.getElementsByTagName('form')[0];
x.elements.namedItem("link_title").value=pav;
x.elements.namedItem("link_link").value=nuo;
x.elements.namedItem("link_author").value=vard;
x.elements.namedItem("link_keys").value=mie;
x.elements.namedItem("link_name").value=vard;
x.elements.namedItem("link_mail").value=el;
}

//================================== Ooo.lt ========================================
function Ooo(){
document.getElementById('search-q').value=nuo;
}

//================================== Direktorija.lt ================================
function Direktorija(){

var x = document.getElementsByTagName('form')[1];
x.elements.namedItem("url").value=nuo;
x.elements.namedItem("email").value=el;
x.elements.namedItem("title").value=pav;
x.elements.namedItem("description").value=apr;
x.elements.namedItem("keywords").value=rak;
}

//================================== Addlink.lt ================================
function Addlink(){
// irasyti viska ranka. AJAX padarytas saitas
}


//================================== Pridek.lt ================================
function Pridek(){
document.getElementById('author').value=pav;
document.getElementById('email').value=el;
document.getElementById('url').value=nuo;
document.getElementById('comment').value=apr;
}

//================================== Systemos.lt ================================
function Systemos(){
var x = document.getElementsByTagName('form')[0];
x.elements.namedItem("url").value=nuo;
x.elements.namedItem("title").value=pav;
x.elements.namedItem("description").value=apr;
x.elements.namedItem("fio").value=vard; 
x.elements.namedItem("email").value=el; 
}

//================================== Zinomas.lt ================================
function Zinomas(){
var x = document.getElementsByTagName('form')[1];
x.elements.namedItem("TITLE").value=pav;
x.elements.namedItem("URL").value=nuo;
x.elements.namedItem("DESCRIPTION").value=apr;
x.elements.namedItem("OWNER_NAME").value=vard; 
x.elements.namedItem("OWNER_EMAIL").value=el; 
}


//================================== 500.lt ================================
function Penkisimtai(){
var x = document.getElementsByTagName('form')[0];
x.elements.namedItem("TITLE").value=pav;
x.elements.namedItem("URL").value=nuo;
x.elements.namedItem("DESCRIPTION").value=apr;
x.elements.namedItem("META_DESCRIPTION").value=met; 
x.elements.namedItem("META_KEYWORDS").value=rak; 
}


//================================== On.lt ================================
function On(){
document.getElementById('author').value=pav;
document.getElementById('klausimas2').value=api;
document.getElementById('klausimas3').value=nuo;
document.getElementById('klausimas9').value=apr;
document.getElementById('vardas').value=vard;

var x = document.getElementsByTagName('form')[0];
x.elements.namedItem("klausimas7").value=el;
x.elements.namedItem("email").value=el;
}


//================================== Weboaze.lt ================================
function Weboaze(){
var n = document.forms.namedItem("nl_form");
n.elements.namedItem("link_title").value=pav;
n.elements.namedItem("link_web").value=nuo;
n.elements.namedItem("link_keys").value=rak;
n.elements.namedItem("link_link").value=nuo;
n.elements.namedItem("link_author").value=vard;
n.elements.namedItem("link_mail").value=el;
n.elements.namedItem("link_name").value=vard;

alert("Nepratestuotas. Kazkodel sokinejo irasas. Isjungti greasemonkey po alerto. Gal pades. Weboaze.lt");
}


//================================== Surask.lt ================================
function Surask(){
var x = document.getElementsByTagName('form')[0];
x.elements.namedItem("title").value=pav;
x.elements.namedItem("url").value=nuo;
x.elements.namedItem("description").value=apr;
x.elements.namedItem("name").value=vard;
x.elements.namedItem("email").value=el;
x.elements.namedItem("keywords").value=rak; 
}


//================================== Dmoz.Lt ================================
function Dmoz(){
document.getElementById('title').value=pav;
document.getElementById('url').value=nuo;
document.getElementById('description').value=met;
document.getElementById('email').value=el;
}


//================================= Seolinks.Lt ==============================
function Seolinks(){
var x = document.getElementsByTagName('form')[2];
x.elements.namedItem("TITLE").value=pav;
x.elements.namedItem("URL").value=nuo;
x.elements.namedItem("DESCRIPTION").value=apr;
x.elements.namedItem("OWNER_NAME").value=vard;
x.elements.namedItem("OWNER_EMAIL").value=el;
x.elements.namedItem("META_DESCRIPTION").value=met; 
x.elements.namedItem("META_KEYWORDS").value=rak; 
}

//================================= Nkv.Lt ==============================
function Nkv(){
document.getElementById('addtitle').value=pav;
document.getElementById('addlink').value=nuo;
document.getElementById('addtext').value=apr;
}

//================================= Nuorodos.Lt ==============================
function NuorodosLt(){
var x = document.getElementsByTagName('form')[1];
x.elements.namedItem("TITLE").value=pav;
x.elements.namedItem("URL").value=nuo;
x.elements.namedItem("DESCRIPTION").value=apr;
x.elements.namedItem("OWNER_NAME").value=vard;
x.elements.namedItem("OWNER_EMAIL").value=el;
}

//================================= Lt.Katalogas.lt ==============================
function LtKatalogas(){
var x = document.getElementsByTagName('form')[0];
x.elements.namedItem("title").value=pav;
x.elements.namedItem("address").value=nuo;
x.elements.namedItem("text").value=apr;
}

//================================= Naudinga.lt ==================================
function Naudinga(){
document.getElementById('edit-title').value=pav;
document.getElementById('edit-url').value=nuo;
document.getElementById('edit-body').value=apr;
}


//================================= Webdir24.lt ==================================
function Webdir24(){
var x = document.getElementsByTagName('form')[1];
x.elements.namedItem("TITLE").value=pav;
x.elements.namedItem("URL").value=nuo;
x.elements.namedItem("DESCRIPTION").value=apr;
x.elements.namedItem("OWNER_NAME").value=vard;
x.elements.namedItem("OWNER_EMAIL").value=el;
}


//================================= E-nuorodos.lt ==================================
function ENuorodos(){
document.getElementById('ModLinkName').value=pav;
document.getElementById('ModLinkUrl').value=nuo;
document.getElementById('ModLinkDescription').value=apr;
document.getElementById('ModLinkAuthor').value=vard;
document.getElementById('ModLinkKeywords').value=rak;
}


//================================= Nuoroducentras.lt ==============================
function Nuoroducentras(){
var N = document.getElementsByTagName('form')[1];
N.elements.namedItem("TITLE").value=pav;
N.elements.namedItem("URL").value=nuo;
N.elements.namedItem("DESCRIPTION").value=apr;
}

//================================= NKatalogas.info ==============================
function NKatalogas(){

document.getElementById('title').value=pav;
document.getElementById('url').value=nuo;
document.getElementById('email').value=el;

var f = document.forms.namedItem("suggest_link");
f.elements.namedItem("id_category").value=kat;
f.elements.namedItem("description").value=apr;
}

//================================ Nerandu.lt ====================================
function Nerandu(){
var n = document.forms.namedItem("forma");
n.elements.namedItem("title").value=      pav;
n.elements.namedItem("description").value=apr;
n.elements.namedItem("keywords").value=   rak;
n.elements.namedItem("url").value=        nuo;
n.elements.namedItem("name").value=       vard;
n.elements.namedItem("email").value=      el;
}

//================================ Links4u.lt ====================================
function Links4u(){
var x = document.getElementsByTagName('form')[1];

x.elements.namedItem("TITLE").value=pav;
x.elements.namedItem("URL").value=nuo;
x.elements.namedItem("DESCRIPTION").value=apr;
x.elements.namedItem("OWNER_NAME").value=vard;
x.elements.namedItem("OWNER_EMAIL").value=el;
}

//################################################################################



if (window.addEventListener) {
    window.addEventListener('load', init, false);
} else {
    document.attachEvent('onload', init);
}
