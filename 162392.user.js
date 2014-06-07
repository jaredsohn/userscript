// ==UserScript==
// @name            TransportTycoon Plus
// @source          http://userscripts.org/scripts/show/162392
// @author          -=kali=-
// @version         0.112
// @include         *s2.cargotycoon.pl/*
// @include         *s3.cargotycoon.pl/*
// @grant           none
// ==/UserScript==
// narazie opcje umieszcze tutaj
// wartosc "1" wlaczona i "0" wylaczona
var garaz=1;
var bank=0;
var szkola=1;
// dla kierowcow cyfry beda rozne 0-wylaczone; 2-przydzial kierowcy; 3-przydzial zmiennika; 5-zdejmuje kierowcow i zmiennikow
var kierowca=0;
var dyspozytornia=1;
var garazpaliwo=0;
var trasapaliwo=0;
var naczepy=0;
var tankowaniez;
var humanz;
// konstrukcja update
var AC = new Object();
AC.version = '0.112'; // numer wersji
AC.usoL = 'http://userscripts.org/scripts/';
AC.usoNo = '162392';
AC.usourl = AC.usoL + 'source/' + AC.usoNo + '.user.js';

document.onload = sprawdzanie();
document.onload = menu();
//document.onload = checkCookie();
function sprawdzanie(){

//-----------------------------------------------glowna
//sprawdzanie wersji i update
if (window.location.search.match(/[?&]action=news/)){setTimeout(function(){UpdateScript()},500);}
// tankowanie w trasie
if (window.location.href.match(/index.php/)){if (trasapaliwo==1){tankowaniez = setInterval(function(){trasa()}, 1000);}}
//potwierdzenie tankowania w trasie - zmiana paliwa bio-forms[1], ON-forms[2], extra-forms[3]
if (window.location.search.match(/[?&]action=refueling_route/)){if (trasapaliwo>-1){setTimeout(function(){document.forms[3].submit();},100);}}
//-----------------------------------------------samochody
// uruchomienie zegara do wielokrotnego tankowania
if (window.location.search.match(/[?&]action=cars/)){if (garaz==1){tankowaniez = setInterval(function(){tankowanie()}, 1000);}}
if (window.location.search.match(/[?&]action=cars/)){if (naczepy==1){tankowaniez = setInterval(function(){zapinacz()}, 1000);}}
// tankowanie do pelna w garazu
if (window.location.search.match(/[?&]action=fuel_up/)){setTimeout(function(){document.forms[1].submit();},1000);}
// potwierdzenie wybrania naczepy
if (window.location.search.match(/[?&]action=sign_trailer/)){tankowaniez = setInterval(function(){naczepa()}, 1000);}
//-----------------------------------------------kadry
// kierowanie nowicjuszy na szkolenie oraz przydzial kierowcow
if (window.location.search.match(/[?&]action=human/)){if (szkola==1){humanz = setInterval(function(){szkol()}, 1000);}}
if (window.location.search.match(/[?&]action=human/)){if (kierowca>0){humanz = setInterval(function(){kierowcy()}, 1000);}}
// potwierdze wyslania na szkolenie lub urlop lub przydzial do auta
if (window.location.search.match(/[?&]action=assign/)){setTimeout(function(){przydzial()},100);}
if (window.location.search.match(/[?&]action=allocate_as/)){setTimeout(function(){przydzial()},100);}
if (window.location.search.match(/[?&]action=sent_to_training/)){setTimeout(function(){document.forms[0].submit();},100);}
if (window.location.search.match(/[?&]action=holiday/)){setTimeout(function(){document.forms[0].submit();},100);}
//-----------------------------------------------dyspozytornia
// wysylanie aut w trase
if (window.location.search.match(/[?&]action=dispatching/)){if (dyspozytornia==1){setTimeout(function(){dispatching()},1000);}}
// wybiera pierwsze wolne auto i wysyla w trase
if (window.location.search.match(/[?&]action=send_car_order&/)){setTimeout(function(){carorder()},1000);}
//-----------------------------------------------stacja
// tu bedzie funkcja zakupu paliwa do garazu
//-----------------------------------------------mechanik
// kupowanie opon i naprawa samochodow potem naczep (podpinanie w garazu)
//-----------------------------------------------bank
// uruchomienie placenia faktur
if (window.location.search.match(/[?&]action=bank/)){if (bank==1){setTimeout(function(){banko()},1000);}}






// zakup paliwa do garazu
if (window.location.search.match(/[?&]action=station/)){setTimeout(function(){findInPage("na\s(\d+)\sl")},1000);}
}
//-----------------------------------------------podzial funkcji na roznych stronach
//-----------------------------------------------glowna
function trasa(){
var fuel =/Tankuj/;
var x =document.getElementsByTagName("a");

for (var i = 0, l = x.length; i < l; i++) {
    var fu = x[i];
    
    if (fuel.test(fu.innerHTML)) {
        location.href=fu.href;
        clearInterval(tankowaniez);
        break;}}}
//-----------------------------------------------samochody
function tankowanie(){
var fuel =/fuel_up/;
var x =document.getElementsByTagName("a");

for (var i = 0, l = x.length; i < l; i++) {
    var fu = x[i];
    if (fuel.test(fu.href)) {
        location.href=fu.href;
        clearInterval(tankowaniez);
        break;}}}
        
function zapinacz(){
var fuel =/Podepnij/;
var x =document.getElementsByTagName("a");

for (var i = 0, l = x.length; i < l; i++) {
    var fu = x[i];
    
    if (fuel.test(fu.innerHTML)) {
        location.href=fu.href;
        clearInterval(tankowaniez);
        break;}}}
function naczepa(){
//alert(document.forms[0].element.length);
if (document.forms[0].length<1){
lert('brak aut do wyslania');
}
//location.href="index.php";}
//alert("There are " + document.forms[0].length + " elements in this Form");
document.forms[0].elements[1].checked=true;
document.forms[0].submit();
clearInterval(tankowaniez);
}
//-----------------------------------------------kadry
function szkol(){
var kadet =/training/;
//var kadet =/holiday_let/;
var x =document.getElementsByTagName("a");

for (var i = 0, l = x.length; i < l; i++) {
    var fu = x[i];
    if (kadet.test(fu.href)) {
        location.href=fu.href;
        clearInterval(humanz);
        break;}}}
function kierowcy(){
//szukanie ramki z bledami
var bledy =/Brak/;
var x =document.getElementsByTagName("div");

for (var i = 0, l = x.length; i < l; i++) {
    var fu = x[i];
    
    if (bledy.test(fu.innerHTML)) {
        //location.href=fu.href;
        kierowca=4;
        clearInterval(humanz);
        //alert('bledy '+kierowca)
        break;}}
// koniec szukania i zmiana warosci kierowca
if (kierowca==2){var kadet =/assign_driver[?&]/;}
if (kierowca==3){var kadet =/substitute_driver[?&]/;}
if (kierowca==4){var kadet =/Brak/;clearInterval(humanz);}
if (kierowca==5){var kadet =/driver_off[?&]/;}
var x =document.getElementsByTagName("a");
//alert(kadet);
for (var i = x.length-1; i > 0; i--) {
    var fu = x[i];
    if (kadet.test(fu.href)) {
    //alert(fu.href);
        location.href=fu.href;
        clearInterval(humanz);
        break;}}}
        
function przydzial(){
var kierman =/action2/;
var x =document.getElementsByTagName("a");

for (var i = 0, l = x.length; i < l; i++) {
    var fu = x[i];
    if (kierman.test(fu.href)) {
        location.href=fu.href;
        clearInterval(humanz);
        break;}}}        
//-----------------------------------------------dyspozytornia
function dispatching(){
var dispa =/send_car_order&/;
var y =document.getElementsByTagName("a");

for (var i = 0, l = y.length; i < l; i++) {
    var fu = y[i];
    if (dispa.test(fu.href)) {
        location.href=fu.href;
        break;}}}
function carorder(){
//alert(document.forms[0].elements.length);
//if (document.forms[0].length<3){alert('brak aut do wyslania');}
//location.href="index.php";}
//alert("There are " + document.forms[0].length + " elements in this Form");
if (document.forms[0].elements[2].type=='radio'){document.forms[0].elements[2].checked=true;} else {document.forms[0].elements[3].checked=true;}
//alert(document.forms[0].elements[2].type);
//document.forms[0].elements[2].checked=true;
document.forms[0].submit();}
//-----------------------------------------------stacja

//-----------------------------------------------mechanik

//-----------------------------------------------bank
function banko(){
var bankomat =/pay&id/;
var y =document.getElementsByTagName("a");
for (var i = 0, l = y.length; i < l; i++) {
    var fu = y[i];
    if (bankomat.test(fu.href)) {
        location.href=fu.href;
        clearInterval(tankowaniez);
        break;}}}
//-----------------------------------------------wolne
//-----------------------------------------------wolne
//-----------------------------------------------wolne





function zalewanie(){
//var extra=/extra/;
//var fr=document.getElementsByTagName("form");
//var form=document.getElementsByTagName("form");
//for (var i = 0, l = fr.length; i < l; i++) {
//     var frm=fr[i];
//     if(extra.test(frm.)){
//    }}
//alert("Textbox nazwa: " + document.forms[1].elements[3].name);
//alert("Submit i opis: " + document.forms[1].elements[3].value);
// szukanie paliwa \s(\d+)\sl
// alert(new RegExp(document.getElementById('rx').value) 	.exec(document.getElementById('str').value))

}

//-----------------------------------------------kierowcy




        


function getEleme(){
	var x=document.getElementsByTagName("td");
	alert(x.length);
}
var n = 0;

function findInPage(str) {
//alert(str);
var w=document.getElementsByTagName("td");
//alert(w.length);
    for (var i = 0, l = w.length; i < 8; i++) {
    var txt1=w[i].innerHTML;
//alert(txt1);

}}


//-----------------------------------------------update

function UpdateScript() {
  GM_xmlhttpRequest({
					method: 'GET',
					url: AC.usourl + '?source', 
					onload: function(result) {
					  if (result.status != 200) return;
					  if (!result.responseText.match(/@version\s+([\d.]+)/)) return;
					  nv = RegExp.$1;
					  if (nv == AC.version) {
						alert('Używasz najnowszej wersji (v' + AC.version + ') !');
						return;
					  } else if (nv < AC.version) {
						alert('Prawdopodobnie używasz wersji beta (v' + AC.version + ') !');
						return;
					  } else if (window.confirm('Dostępna jest nowa wersja (v ' + nv + ') !\n\n' + 'Uaktualnić teraz?\n'))  window.open (AC.usoL+'show/'+AC.usoNo,"mywindowx");
					}});
}
//-----------------------------------------------menu
function menu(){
var pozycja=document.getElementById('box_800_in');
var linki=document.createElement('div');
linki.style.float= 'left';
linki.style.fontweight= 'bold';
linki.style.minheight= '14px';
linki.style.textalign= 'center';
linki.innerHTML='<label><input id="op_garaz" type="checkbox" onchange="checkCookie();">Tankowanie</label>';
linki.innerHTML+='<label><input id="op_oc" type="checkbox" onchange="">Zakup OC</label>';
linki.innerHTML+='<label><input id="op_naczepy" type="checkbox" onchange="">Podepnij naczepy</label>';
linki.innerHTML+='<label><input id="op_trasa" type="checkbox" onchange="">Tankowanie w trasie</label><br>';
linki.innerHTML+='<label><input id="op_szkola" type="checkbox" onchange="">Na szkolenie</label>';
linki.innerHTML+='<label><input id="op_kierman" type="checkbox" onchange="">Przydziel kierowcow</label>';
linki.innerHTML+='<label><input id="op_zmiennik" type="checkbox" onchange="">Przydziel zmiennika</label>';
linki.innerHTML+='<label><input id="op_urlopy" type="checkbox" onchange="">Daj odpoczac</label><br>';
linki.innerHTML+='<label><input id="op_vip" type="checkbox" onchange="">VIP GRATIS</label>';
pozycja.insertBefore(linki,pozycja.childNodes[0]);}
//-----------------------------------------------zapisywanie opcji
function getCookie(c_name)
{
var c_value = document.cookie;
var c_start = c_value.indexOf(" " + c_name + "=");
if (c_start == -1)
  {
  c_start = c_value.indexOf(c_name + "=");
  }
if (c_start == -1)
  {
  c_value = null;
  }
else
  {
  c_start = c_value.indexOf("=", c_start) + 1;
  var c_end = c_value.indexOf(";", c_start);
  if (c_end == -1)
    {
    c_end = c_value.length;
    }
  c_value = unescape(c_value.substring(c_start,c_end));
  }
return c_value;
}

function setCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}

function checkCookie()
{
var username=getCookie("username");
if (username!=null && username!="")
  {
  alert("Welcome again " + username);
  }
else 
  {
  username=prompt("Please enter your name:","");
  if (username!=null && username!="")
    {
    setCookie("username",username,365);
    }
  }
}

