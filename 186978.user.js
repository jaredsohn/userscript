// ==UserScript==
// @name        MargoBot
// @namespace   Rzeźnik
// @include     http://game1.margonem.pl/
// @include     http://badgers.margonem.pl/
// @description By - Xaller
// @version     1
// ==/UserScript==

//Moduł Auto-Leczenia
$.getScript("http://addons2.margonem.pl/get/3/3637public.js");

//Moduł okienka Bota
$('<div id="Bot" ><center><h6 style="background-color: green;">Automatyczny-Wojownik v.1.0</h6></center></br></div>').css({
	position: "absolute",
	width: "400px",
	height: "488px",
	left: 622, // Tu się zmienia współrzędne okna
	top: 0,  //Tu się zmienia współrzędne okna
	border: "1px gold solid",
	color: "white",
    background: "url(http://www.margonem.pl/img/menuback.png)",
	"font-size": "11px",
	zIndex: 500
}).appendTo("body").draggable().bind("mousedown", function (d) {
	d.stopPropagation()
}); 
{
for (i = 1; i <= 1; i++) {
$('<div id="nameMap" <b></b>').appendTo("#Bot"); //Mapa:
$('<div id="Exp3" <b></b>').appendTo("#Bot"); //Procent ilości wbitego doświadczenia:
$('<div id="User" <b></b>').appendTo("#Bot"); //Użytkownik:
$('<img id="auto" tip="Exp" style="position:absolute;bottom:0px;right:315px;" src="http://oi44.tinypic.com/28jupls.jpg">').appendTo("#Bot"); //Automat
$('<img id="OpenC" tip="Otwórz Konfiguracje" style="position:absolute;bottom:0px;right:225px;" src="http://oi44.tinypic.com/339si9w.jpg">').appendTo("#Bot"); //Konfiguracja
$('<img id="Stop" tip="Zatrzymaj" style="position:absolute;bottom:0px;right:135px;" src="http://oi42.tinypic.com/2h51b20.jpg">').appendTo("#Bot"); //Zatrzymaj
$('<img id="ChatT" tip="On/Off Chat" style="position:absolute;bottom:0px;right:45px;" src="http://oi42.tinypic.com/2ag3o87.jpg">').appendTo("#Bot"); //Chat
$('<input value="'+pokazCookie('Q')+'" type="text" id="Q" tip="Wpisz tutaj cyfrę!" style="position:absolute;bottom:455px;right:0px;width:40px;">').appendTo("#Bot"); //Text na Q
$('<img id="Mapa"></img>').appendTo("#Bot"); //Mapa
}};

//Moduł Otwarcia/Zamknięcia Chatu
function NaszChat(){
$('#mChat').toggle();
}document.getElementById("ChatT").onclick = function(){
NaszChat();
}

//Moduł Automatycznego zatrzymania expienia po kliknięciu na Przycisk    
function Stop(){
location.reload();
}document.getElementById("Stop").onclick = function(){
Stop()
};  

//Moduł procentowania wbitego doświadczenia
function Staty(){
$("<div id='expProcent'></div>").appendTo("#Exp3").show();
}setInterval(Staty, 3000);

//Moduł Nazwy Mapki
function Nazwa(){
if(map.name == ""+map.name+""){
$("#nameMap").html(" <font color='green'><b>Mapa:</font> "+map.name+"</b>").show(); //Zmienić kolor "Mapa" na zielony (color="green")
}}setInterval(Nazwa, 3000);

//Moduł Pkt.expa
function pExp(){
$("#exp").html("<font color='green'><b>Ilość punktów doświadczenia:</font> "+hero.exp+"</b>").show();  //Zmienić kolor "Ilość..." na zielony
}setInterval(pExp, 3000);

//Moduł Użytkownika
function User(){
if(hero.nick == ""+hero.nick+""){
$("#User").html(" <font color='green'><b>Użytkownik: </font> "+hero.nick+"-"+hero.lvl+""+hero.prof+"</b>").show(); //Zmienić kolor "Użytkownik" ma zielony
}}setInterval(User, 1000);

//Moduł Mapy
function Mapa(){
$('<img tip='+map.name+' id="Mapa" width="400px" height="400px" src="' + document.baseURI + '/obrazki/miasta/' + map.file + '">').appendTo("#Bot");
}setInterval(Mapa, 3000);

//Moduł redukcji częstotliwości Mapy
function MapaRemove(){
$('#Mapa').remove();
}setInterval(MapaRemove, 3001);

//Moduł Consola ------> F5
function JConsole(){
if ($("#console").is(":visible")) {
location.reload();
}}

//Moduł Automatycznego-Expienia
function Exp() {
var kto10 = "Świerszcz"
        for (var a2 in g.npc) {
            if ((g.npc[a2].nick).toLowerCase() == kto10.toLowerCase()) {
                var x2 = g.npc[a2].x;
                var y2 = g.npc[a2].y;
                var isHere = true;
                break;
            }
        }
        g.stop = false;
         if (typeof hero.searchPath == "function")
        hero.mojsearch = hero.searchPath
        if (isHere) hero.mojsearch(x2, y2);
        if(!isHere) Exp2();
    }
    
            function Exp2() {
var kto12 = "Młody żuk"
        for (var a2 in g.npc) {
            if ((g.npc[a2].nick).toLowerCase() == kto12.toLowerCase()) {
                var x2 = g.npc[a2].x;
                var y2 = g.npc[a2].y;
                var isHere = true;
                break;
            }
        }
        g.stop = false;
         if (typeof hero.searchPath == "function")
        hero.mojsearch = hero.searchPath
        if (isHere) hero.mojsearch(x2, y2);
        if(!isHere) Exp3();
    }
    
    function Exp3() {
var kto11 = "Zając"
        for (var a2 in g.npc) {
            if ((g.npc[a2].nick).toLowerCase() == kto11.toLowerCase()) {
                var x2 = g.npc[a2].x;
                var y2 = g.npc[a2].y;
                var isHere = true;
                break;
            }
        }
        g.stop = false;
         if (typeof hero.searchPath == "function")
        hero.mojsearch = hero.searchPath
        if (isHere) hero.mojsearch(x2, y2);
    }
    
//Moduł Automatycznego expienia po kliknięciu na Przycisk    
function Auto(){
setInterval(Exp, 100);
setInterval(strzalki, 5000);
setInterval(HideA, 5000);
setInterval(AutoFight, 3000);
setInterval(Loot, 3000);
setInterval(CloseFight, 3000);
setInterval(JConsole, 5000);
}document.getElementById("auto").onclick = function(){
Auto()
};    

//Moduł Okienka Konfiguracji
$('<div id="Konfi1" ><b><font size="2" face="verdana" color="red"><center><h3> Ustawienia:</h3></center></font></br></b></div>').hide().css({
	position: "absolute",
	height: "470px",
	width: "260px",
	left: 750, // Tu się zmienia współrzędne okna
	top: 0,  //Tu się zmienia współrzędne okna
	border: "1px gold solid",
	color: "white",
    background: "url(http://www.margonem.pl/img/menuback.png)",
	"font-size": "11px",
	zIndex: 500
}).appendTo("body").draggable().bind("mousedown", function (d) {
	d.stopPropagation()
}); 
{
for (i = 1; i <= 1; i++) {
$('<h3><center><div <b><i>Moduły Automatów:</i></b> </div></center></h3>').appendTo("#Konfi1");
$('<p style="padding:0px;border:3px solid red;"><input tip="Auto-Tp (1sec)"  type="checkbox" id="C1" /><b>Auto-Ucieczka</b></p>').appendTo("#Konfi1").change(function(){if(!($(this).attr("checked"))){
AutoU()
setInterval(AutoU, 1000);
}});
$('<p style="padding:0px;border:3px solid red;"><input tip="Upłynnia Złoto (10sec)" type="checkbox" id="C2" /><b>Auto-Upłynnianie Złota</b></p>').appendTo("#Konfi1").change(function(){if(!($(this).attr("checked"))){
GoldU()
setInterval(GoldU, 10000);
}});
$('<p style="padding:0px;border:3px solid red;"><input tip="Refresh (5min)" type="checkbox" id="C3" /><b>Auto-F5</b></p>').appendTo("#Konfi1").change(function(){if(!($(this).attr("checked"))){
setInterval(F5, 300000);
}});
$('<p style="padding:0px;border:3px solid red;"><input tip="F (3sec)" type="checkbox" id="C4" /><b>Auto-F</b></p>').appendTo("#Konfi1").change(function(){if(!($(this).attr("checked"))){
setInterval(F, 3000);
}});
$('<p style="padding:0px;border:3px solid red;"><input tip="Zbieranie Lootu(3sec)" type="checkbox" id="C8" /><b>Auto-Zbieranie Loota</b></p>').appendTo("#Konfi1").change(function(){if(!($(this).attr("checked"))){
setInterval(Loot, 3000);
}});
$('<p style="padding:0px;border:3px solid red;"><input tip="F5 po Consoli(5sec)" type="checkbox" id="C10" /><b>Auto-Refresh w czasie Przerwy</b></p>').appendTo("#Konfi1").change(function(){if(!($(this).attr("checked"))){
setInterval(JConsole, 5000);
}});
$('<p style="padding:0px;border:3px solid red;"><input tip="Auto-Hide Alerts (5sec)" type="checkbox" id="C9" /><b>Auto-Chowanie Okienek</b></p>').appendTo("#Konfi1").change(function(){if(!($(this).attr("checked"))){
setInterval(HideA, 5000);
}});
$('<p style="padding:0px;border:3px solid red;"><input tip="Auto-Fight (5sec)" type="checkbox" id="C5" /><b>Auto-Fight</b></p>').appendTo("#Konfi1").change(function(){if(!($(this).attr("checked"))){
AutoFight()
setInterval(AutoFight, 5000);
}});
$('<p style="padding:0px;border:3px solid red;"><input tip="Auto-Arrows (10sec)" type="checkbox" id="C6" /><b>Auto-Nakładanie Strzał</b></p>').appendTo("#Konfi1").change(function(){if(!($(this).attr("checked"))){
strzalki()
setInterval(strzalki, 10000);
}});
$('<p style="padding:0px;border:3px solid red;"><input tip="Auto-Przyjmowanie Zaproszeń (10sec)" type="checkbox" id="C7" /><b>Auto-Grupa</b></p>').appendTo("#Konfi1").change(function(){if(!($(this).attr("checked"))){
setInterval(Grupa, 10000);
}});
$('<h3><center><div <b><i>Moduł Automatycznego stania na Elicie I:</i></b> </div></center></h3>').appendTo("#Konfi1");
$('<center><p style="padding:0px;border:6px solid gold;"><img src="http://oi39.tinypic.com/2re70c0.jpg" tip="Zacznij Kampić na E1!" id="Kamp" /></p></center>').appendTo("#Konfi1");
$('<h3><center><div <b><i>Moduł Automatycznego stania na Elicie II:</i></b> </div></center></h3>').appendTo("#Konfi1");
$('<center><p style="padding:0px;border:6px solid gold;"><b>Tutaj wpisz nazwę Elity 2: </b><input type="text" value="'+pokazCookie('NameElita2')+'" id="NameElita2"><br><img src="http://oi39.tinypic.com/2re70c0.jpg" tip="Zacznij Kampić na E2!" id="Kamp2" /></p></center>').appendTo("#Konfi1");
$('<img id="Off" style="position:absolute;bottom:0px;right:0px;" tip="Wyjdź z Konfiguracji" src="http://oi41.tinypic.com/2me32fl.jpg">').appendTo("#Konfi1");
$('<img id="Zapisz" style="position:absolute;bottom:0px;left:0px;" tip="Zapisz!" src="http://oi42.tinypic.com/vwwgts.jpg">').appendTo("#Konfi1");
$('<img id="Wyloguj" style="position:absolute;bottom:0px;left:88px;" tip="Wyloguj" src="http://oi42.tinypic.com/24nfcew.jpg">').appendTo("#Konfi1");
}};

//Moduł Automatycznego-bicia Elity 2
function Elita2() {
var e2 = document.getElementById("NameElita2").value;
var kto4 = ''+e2+''
        for (var a2 in g.npc) {
            if ((g.npc[a2].nick).toLowerCase() == kto4.toLowerCase()) {
                var x2 = g.npc[a2].x;
                var y2 = g.npc[a2].y;
                var isHere = true;
                break;
            }
        }
        g.stop = false;
        if (typeof hero.searchPath == "function")
        hero.mojsearch = hero.searchPath
        if (isHere) hero.mojsearch(x2, y2);
    }
    
//Moduł Automatycznego Kampienia na Elicie Drugiej po kliknięciu na Przycisk   
function KampE2(){
setInterval(Elita2, 1000);
setInterval(strzalki, 5000);
setInterval(HideA, 5000);
setInterval(AutoFight, 3000);
setInterval(Loot, 3000);
setInterval(CloseFight, 4000);
setInterval(AntyLogOut, 30000);
setInterval(JConsole, 5000);
}document.getElementById("Kamp2").onclick = function(){
KampE2()
};  

//Moduł Automatycznego Kampienia na Elicie Pierwszej po kliknięciu na Przycisk    
function KampE1(){
setInterval(strzalki, 5000);
setInterval(HideA, 5000);
setInterval(AutoFight, 5000);
setInterval(Loot, 3000);
setInterval(CloseFight, 3000);
setInterval(AntyLogOut, 30000);
setInterval(JConsole, 5000);
}document.getElementById("Kamp").onclick = function(){
KampE1()
};   

//Moduł E1, w razie Laga/Przerwy/Refresha
function E1Mimo(){
var txt = document.getElementById("Q").value;
if(txt == "200"){
setInterval(strzalki, 10000);
setInterval(HideA, 10000);
setInterval(AutoFight, 10000);
setInterval(Loot, 10000);
setInterval(CloseFight, 10000);
setInterval(AntyLogOut, 30000);
setInterval(JConsole, 10000);
}}setInterval(E1Mimo, 10000);

//Moduł E2, w razie Laga/Przerwy/Refresha
function E2Mimo(){
var txt = document.getElementById("Q").value;
if(txt == "150"){
setInterval(Elita2, 4000);
setInterval(strzalki, 5000);
setInterval(HideA, 5000);
setInterval(AutoFight, 5000);
setInterval(Loot, 3000);
setInterval(CloseFight, 4000);
setInterval(AntyLogOut, 30000);
setInterval(JConsole, 5000);
}}setInterval(E2Mimo, 10000);

//Moduł Expa, w razie Laga/Przerwy/Refresha.
function ExpMimo(){
var txt = document.getElementById("Q").value;
if(txt == "100"){
setInterval(Exp, 1);
setInterval(strzalki, 5000);
setInterval(HideA, 5000);
setInterval(AutoFight, 7500);
setInterval(Loot, 3000);
setInterval(CloseFight, 3000);
setInterval(AntyLogOut, 30000);
setInterval(JConsole, 5000);
}}setInterval(ExpMimo, 10000);


//Moduł Włączenia Konfiguracji
function Konfis(){
$("#Konfi1").show();
}document.getElementById("OpenC").onclick = function(){
Konfis()
};

//Moduł Wyłączenia Konfiguracji
function KonfisOff(){
$("#Konfi1").hide();
}document.getElementById("Off").onclick = function(){
KonfisOff()
};

//Moduł Procentowania:
Math.decimal = function (a, b) {
    var c = Math.pow(10, b);
    var d = Math.round(a * c) / c;
    return d;
}
function setProcentValue() {
    var exp1 = Math.pow(hero.lvl - 1, 4);
    var exp2 = Math.pow(hero.lvl, 4);
    var exp = Math.decimal((hero.exp - exp1) / (exp2 - exp1) * 100, 1);
    $("#expProcent").html("<font color='green'><b>Ilość wbitego doświadczenia: </font>" +exp+ "% </b>");
}setInterval(setProcentValue, 200);

//Moduł Specjalny
function F2(){
var txt = document.getElementById("Q").value;
if(txt == "0"){
_g('fight&a=f')
$("#loots_button").click();
HideA();
}}setInterval(F2, 2000);

//Moduł Wylogowania
function Wyloguj(){
logout();
}document.getElementById("Wyloguj").onclick = function(){
Wyloguj()
};

//Moduł Zaczynania Walki
function Fight(){
    for(var i in g.npc){
      if ((Math.abs(hero.rx - g.npc[i].x) <= 1 && Math.abs(hero.ry - g.npc[i].y) <= 1) && (g.npc[i].type == 2 || g.npc[i].type == 3)){
        _g("fight&a=attack&ff=1&id=-"+i);
        break;
      }
    }
  }
  
//Moduł Zamykania walki
function CloseFight(){
_g("fight&a=quit"); 
}

//Moduł F-Szybka Walka
function F(){
_g('fight&a=f')
}
    
//Moduł Zbierz Loot
function Loot(){
$("#loots_button").click();
}

//Moduł Auto-Fight
function AutoFight(){ 
Fight()
F()
}

//Moduł Mix
function Mix(){
Fight();
F();
CloseFight();
Loot();
HideA();
}

//Moduł Auto-F
function AutoF(){
_g('fight&a=f')
};

//Moduł F5
function F5(){
location.reload()
};

//Moduł Hide-Alerts.
function HideA(){
if ($("#alert").is(":visible")) {
$("#alert").hide();
}}

//Moduł upłynniania złota
function GoldU(){
    for (k in g.item)
        if ((g.item[k].loc == "g") && (g.item[k].stat.search("gold") > -1)) _g("moveitem&st=1&id=" + k);
}; 

//Moduł zmianny Outfitu
function Out(){
if(hero.nick == 'Sir Legenda'){
$("#hero").css({background: 'url(http://oi44.tinypic.com/2qwfxqh.jpg)'});
}}setInterval(Out, 2000);

//Moduł Auto-Nakładania Strzał
 function strzalki(){
  var sukces = false;
  for(var i in g.item){
   itemek = $("#item"+i);
   if(g.item[i].cl == 21 && itemek.css("top") == "183px" && itemek.css("left") == "92px"){
    var stat = g.item[i].stat;
    var name = g.item[i].name;
    var id = g.item[i].id;
    sukces = true;
    break;
   }
  }
  if(sukces){
   var nrilosc = stat.indexOf("ammo");
   var ilosc = 51;
   if(nrilosc != -1){
    ilosc = stat.slice(nrilosc+5,nrilosc+9);
    ilosc = parseInt(ilosc);
    }
   if(ilosc < 50){
    for(var i in g.item){
     if(name == g.item[i].name && id != g.item[i].id){
      _g("moveitem&st=1&id="+g.item[i].id);
      break;
     }
    }
   }
  }
 }
 
//Moduł Teleportu na Kwieciste Przejście
function TP(){
for(var i in g.item){
var item = g.item[i];
if (item.name.indexOf("Zwój teleportacji na Kwieciste Przejście")>=0)
_g("moveitem&st=1&id="+item.id);
}}

//Moduł Auto-Ucieczki
function AutoU(){
var nicki = ('Thorgool','Magbet','FurianS','cypisek','Swayze','Quarrian','Sir Pronud','Fredd','Quinto','Arhmakur','Podkęcony Pingwin','Cortezon','Barytek','Laczki Babci Kaczki','Xerire','Jason Voorhees','Fiquś','Amyrlin','Lukrecja','Tojek','Draconem','Prymonek','Viviana','Paladyn Onwibii','Dj Adaś','Szeroki','Hot Ice','czesio gra','Feceard','Wia','czesiaczek','-Polcio-','Psycho Rabbit','Tado Sandyman','Xarriand','Gibellini','Senerux','Kissa','Łukasz Pogromca Smoków','Innspirya','czesiczek','Berry Ryder');
if (nicki.indexOf(nick) >=0){
TP()
message("Teleport na Kwieciste Przejście!");
}}

//Moduł Dojścia do Grupy
function Grupa(){
$('#a_ok').click();
}

//Moduł wywołania rozmowy z NPC
function Talk(){
			for(var i in g.npc){
				if ((Math.abs(hero.rx - g.npc[i].x) <= 1 && Math.abs(hero.ry - g.npc[i].y) <= 1) && (g.npc[i].type == 0 || g.npc[i].type == 5)){
					_g('talk&id='+g.npc[i].id);
					break;
				}
			}
		}

//Moduły wywoływania odpowiedniego Dialogu w rozmowie z NPC
function One(){ 
$('#dlgin li:eq(0)').click();
}
function Two(){
$('#dlgin li:eq(1)').click();
}
function Three(){
$('#dlgin li:eq(2)').click();
}
function Four(){
$('#dlgin li:eq(3)').click();
}
function Five(){
$('#dlgin li:eq(4)').click();
}
function Six(){
$('#dlgin li:eq(5)').click();
}

//Moduł Anty-LogOut
function AntyLogOut(){
mAlert("<center><b>--AntyLogOut--</b></center>");
setInterval(HideA, 5000);
}

//Moduł Tp>>Mokradła
function TPM(){
for(var i in g.item){
var item = g.item[i];
if (item.name.indexOf("Cmentarne trufle")>=0)
_g("moveitem&st=1&id="+item.id);
}}

//Moduł Chatu
$('<div id="mChat" ><b><font size="2" face="verdana" color="red"><center> MargoChat v1.0</center></font></br></b></div>').hide().css({
	position: "absolute",
	left: 120,
	top: 0,
	border: "1px gold solid",
	color: "white",
	width: 500,
    background: "url(http://www.margonem.pl/img/menuback.png)",
	"font-size": "11px",
	zIndex: 500
}).appendTo("body").draggable().bind("mousedown", function (d) {
	d.stopPropagation()
}); 
{
for (i = 1; i <= 1; i++) {
$('<input id="chat1" type="text"  style="width:72%" value="'+pokazCookie('chat1')+'">').appendTo("#mChat");
$('<input type="button" id="Send" value="Wyślij wiadomość" onClick="Send()"></br>').appendTo("#mChat");
}};

//Moduł wyślij wiadomość
function Send(){  
var chat1 = document.getElementById("chat1").value;
        _g('chat&c=' + esc(""+chat1+""))
}
document.getElementById("Send").onclick = function(){
Send()
};

//Moduł Zapisania Cookies(Teksty)
function ustawCookie(nazwa, wartosc, dni) {
    if (dni) {
        var data = new Date();
        data.setTime(data.getTime()+(dni*24*60*60*1000));          
        var expires = "; expires="+data.toGMTString();
    } else {
        var expires = "";
    }
    document.cookie = nazwa+"=" + wartosc + expires + "; path=/";
}
 
function usunCookie(nazwa) {               
    document.cookie = nazwa + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
 
function pokazCookie(nazwa) {
    if (document.cookie!="") {
    var cookies=document.cookie.split("; ");
        for (i=0; i<cookies.length; i++) {
            var nazwaCookie=cookies[i].split("=")[0];
            var wartoscCookie=cookies[i].split("=")[1];
            if (nazwaCookie===nazwa) {
                return unescape(wartoscCookie);
            }
        }
    }
}
document.getElementById('Zapisz').onclick = function(e) {
 
 var chat1z = document.getElementById('chat1').value;
    var Elita2 = document.getElementById('NameElita2').value;
    var txt = document.getElementById("Q").value;
        var q1 = document.getElementById('C1');
            var q2 = document.getElementById('C2').value;
                var q3 = document.getElementById('C3').value;
                    var q4 = document.getElementById('C4').value;
                        var q5 = document.getElementById('C5').value;
                            var q6 = document.getElementById('C6').value;
                               var q7 = document.getElementById('C7').value;
                               
 ustawCookie('chat1', chat1z);
    ustawCookie('NameElita2', Elita2);
        ustawCookie('C1', q1);
            ustawCookie('C2', q2);
                ustawCookie('C3', q3);
                    ustawCookie('C4', q4);
                        ustawCookie('C5', q5);
                            ustawCookie('C6', q6);
                               ustawCookie('C7', q7);  
                                 ustawCookie('Q', txt);
                                message("Zapisano!");
};
//////////////////////////////////////////////////Travel Scripts/////////////////////////////////////////////////////////

//Moduł Idź do : Ithan --> Torneg
function Ithan(){
var txt = document.getElementById("Q").value;
if(txt == "1"){
if(map.name == "Ithan"){ //Idź do Dolina Yss
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(63, 87)
}}}setInterval(Ithan, 3000);
function DolinaY(){
var txt = document.getElementById("Q").value;
if(txt == "1"){
if(map.name == "Dolina Yss"){ //Idź do Orla
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(63, 74)}
}}setInterval(DolinaY, 3000);
function Orla(){
var txt = document.getElementById("Q").value;
if(txt == "1"){
if(map.name == "Orla Grań"){ //Idź do Stare Ruiny
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(44, 0)}
}}setInterval(Orla, 4000);
function Ruiny(){
var txt = document.getElementById("Q").value;
if(txt == "1"){
if(map.name == "Stare Ruiny"){ //Idź do Torneg
if (typeof hero.searchPath == "function")
        hero.mojsearch = hero.searchPath
hero.mojsearch(49, 0)}
}}setInterval(Ruiny, 4000);
function Torneg(){
var txt = document.getElementById("Q").value;
if(txt == "1"){
if(map.name == "Torneg"){
if (typeof hero.searchPath == "function")
        hero.mojsearch = hero.searchPath
hero.mojsearch(54, 29)}
if(hero.x == 54){
if(hero.y == 29){
message("Jestem w Torneg!");
}}}}setInterval(Torneg, 4000);

//Moduł Idź do : Eder --> Fodug
function Eder(){
var txt = document.getElementById("Q").value;
if(txt == "2"){
if(map.name == "Eder"){ //Idź do Fort Eder
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(27, 0)}
}}setInterval(Eder, 4000);
function FE(){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
var txt = document.getElementById("Q").value;
if(txt == "2"){
if(map.name == "Fort Eder"){ //Idź do Mokradła
hero.mojsearch(54, 54);
if(hero.x == 54){
if(hero.y == 54){
setInterval(FE2, 1000)
}}}}}setInterval(FE, 10000);
function FE2(){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(29, 0);
}
function Mokradła(){
var txt = document.getElementById("Q").value;
if(txt == "2"){
if(map.name == "Mokradła"){ //Idź do Doliny Rozbójników
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(27, 0)
}}}setInterval(Mokradła, 4000);
function Dolina(){
var txt = document.getElementById("Q").value;
if(txt == "2"){
if(map.name == "Dolina Rozbójników"){ //Idź do Wioski Ghuli
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(13, 18)
if(hero.x == 13){
if(hero.y == 18){
setInterval(Dolina2, 1000);
}}}}}setInterval(Dolina, 10000);
function Dolina2(){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(63, 19);
}
function Wioska(){
var txt = document.getElementById("Q").value;
if(txt == "2"){
if(map.name == "Wioska Ghuli"){ //Idź do Zagioniona Dolina
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(63, 4)
}}}setInterval(Wioska, 1000);
function Zaginiona(){
var txt = document.getElementById("Q").value;
if(txt == "2"){
if(map.name == "Zaginiona Dolina"){ //Idź do Opuszczona Twierdza
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(30, 63)
}}}setInterval(Zaginiona, 1000);
function Opuszczona(){
var txt = document.getElementById("Q").value;
if(txt == "2"){
if(map.name == "Opuszczona Twierdza"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(9, 55)
if(hero.x == 9){
if(hero.y == 55){
setInterval(Opuszczona2, 1000);
}}}}}setInterval(Opuszczona, 10000);
function Opuszczona2(){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(33, 26)
}

//Moduł Idź do : Kwiatki --> Thuzal
function Kwiatki(){
var txt = document.getElementById("Q").value;
if(txt == "3"){
if(map.name == "Kwieciste Przejście"){ //Idź do Lazurowe Wzgórze
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(50, 0)
}}}setInterval(Kwiatki, 1000);
function Lazurowe(){
var txt = document.getElementById("Q").value;
if(txt == "3"){
if(map.name == "Lazurowe Wzgórze"){ //Idź do Thuzal
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(21, 27) // Pod węża
if(hero.x == 21){
if(hero.y == 27){
setInterval(Lazurowe2, 1000);
}}}}}setInterval(Lazurowe, 10000);
function Lazurowe2(){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(35, 0) //Do Grań
}
function Grań(){
var txt = document.getElementById("Q").value;
if(txt == "3"){
if(map.name == "Grań Gawronich Piór"){ 
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(48, 0) //Idź do Thuzal
}}}setInterval(Grań, 1000);

//Moduł Idź do : Kwiatki --> Thuzal
function Kwiatki2(){
var txt = document.getElementById("Q").value;
if(txt == "4"){
if(map.name == "Kwieciste Przejście"){ //Idź do Złudny Trakt
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(40, 63)
}}}setInterval(Kwiatki2, 1000);
function Złudny(){
var txt = document.getElementById("Q").value;
if(txt == "4"){
if(map.name == "Złudny Trakt"){ //Idź do Orcza Wyżyna
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(95, 38)
}}}setInterval(Złudny, 1000);
function Orcza(){
var txt = document.getElementById("Q").value;
if(txt == "4"){
if(map.name == "Orcza Wyżyna"){ //Idź do Lokum
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(92, 45)
}}}setInterval(Orcza, 1000);
function Goons(){
var txt = document.getElementById("Q").value;
if(txt == "4"){
if(map.name == "Lokum Złych Goblinów"){ //Idź pod Goonsa e2
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(34, 3)
}}}setInterval(Goons, 1000);

//Moduł Idź do : Nithal --> Sekta
function Nithal(){
var txt = document.getElementById("Q").value;
if(txt == "5"){
if(map.name == "Nithal"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(7, 48)
}}}setInterval(Nithal, 1000);
function Izba1(){
var txt = document.getElementById("Q").value;
if(txt == "5"){
if(map.name == "Izba chorych płn."){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(3, 14)
}}}setInterval(Izba1, 1000);
function Izba2(){
var txt = document.getElementById("Q").value;
if(txt == "5"){
if(map.name == "Izba chorych płn. - piwnica p.1"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(6, 9)
}}}setInterval(Izba2, 1000);
function Izba3(){
var txt = document.getElementById("Q").value;
if(txt == "5"){
if(map.name == "Izba chorych płn. - piwnica p.2"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(6, 9)
}}}setInterval(Izba3, 1000);
function Izba4(){
var txt = document.getElementById("Q").value;
if(txt == "5"){
if(map.name == "Izba chorych płn. - piwnica p.3"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(10, 7)
}}}setInterval(Izba4, 1000);
function Izba5(){
var txt = document.getElementById("Q").value;
if(txt == "5"){
if(map.name == "Izba chorych - piwniczne przejście"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(7, 9)
}}}setInterval(Izba5, 1000);
function Kanały(){
var txt = document.getElementById("Q").value;
if(txt == "5"){
if(map.name == "Kanały Nithal"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(79, 54)
}}}setInterval(Kanały, 1000);
function Szlamowe(){
var txt = document.getElementById("Q").value;
if(txt == "5"){
if(map.name == "Szlamowe Kanały"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(43, 55)
}}}setInterval(Szlamowe, 1000);
function Przedsionek(){
var txt = document.getElementById("Q").value;
if(txt == "5"){
if(map.name == "Przedsionek Kultu"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(13, 29)
}}}setInterval(Przedsionek, 1000);

//Moduł Idź do : Ithan --> Orki
function Orki1(){
var txt = document.getElementById("Q").value;
if(txt == "6"){
if(map.name == "Ithan"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(22, 95)
}}}setInterval(Orki1, 1000);
function Orki2(){
var txt = document.getElementById("Q").value;
if(txt == "6"){
if(map.name == "Zniszczone Opactwo"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(11, 63)
}}}setInterval(Orki2, 1000);
function Orki3(){
var txt = document.getElementById("Q").value;
if(txt == "6"){
if(map.name == "Zburzona Twierdza"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(13, 6)
}}}setInterval(Orki3, 1000);

//Moduł Idź do : Ithan --> K-H
function KH1(){
var txt = document.getElementById("Q").value;
if(txt == "7"){
if(map.name == "Ithan"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(21, 95)
}}}setInterval(KH1, 100);
function KH2(){
var txt = document.getElementById("Q").value;
if(txt == "7"){
if(map.name == "Zniszczone Opactwo"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(0, 38)
}}}setInterval(KH2, 100);
function KH3(){
var txt = document.getElementById("Q").value;
if(txt == "7"){
if(map.name == "Uroczysko"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(0, 37)
}}}setInterval(KH3, 100);
function KH4(){
var txt = document.getElementById("Q").value;
if(txt == "7"){
if(map.name == "Wichrowe Szczyty"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(0, 38)
}}}setInterval(KH4, 100);
function KH5(){
var txt = document.getElementById("Q").value;
if(txt == "7"){
if(map.name == "Przełęcz Dwóch Koron"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(40, 0)
}}}setInterval(KH5, 100);
function KH6(){
var txt = document.getElementById("Q").value;
if(txt == "7"){
if(map.name == "Przedmieścia Karka-han"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(58, 0)
}}}setInterval(KH6, 100);
function KH7(){
var txt = document.getElementById("Q").value;
if(txt == "7"){
if(map.name == "Karka-han"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(48, 27)
}}}setInterval(KH7, 100);
//Moduł Idź do : Ithan --> Razu
function Razu1(){
var txt = document.getElementById("Q").value;
if(txt == "8"){
if(map.name == "Ithan"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(20, 95)
}}}setInterval(Razu1, 100);
function Razu2(){
var txt = document.getElementById("Q").value;
if(txt == "8"){
if(map.name == "Zniszczone Opactwo"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(12, 63)
}}}setInterval(Razu2, 100);
var r3 = setInterval(Razu3, 4000);
function Razu3(){
var txt = document.getElementById("Q").value;
if(txt == "8"){
if(map.name == "Zburzona Twierdza"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(37, 45)
if(hero.x == 37){
if(hero.y == 45){
setInterval(Razu9, 5000);
clearInterval(r3);
}}}}}
function Razu8(){
var txt = document.getElementById("Q").value;
if(txt == "8"){
if(map.name == "Zburzona Twierdza"){
if(hero.x == 14){
if(hero.y == 48){
setInterval(Razu10, 1);
}}}}}setInterval(Razu8, 1000);
function Razu9(){
var txt = document.getElementById("Q").value;
if(txt == "8"){
if(map.name == "Zburzona Twierdza"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(14, 48)
}}}
function Razu10(){
var txt = document.getElementById("Q").value;
if(txt == "8"){
if(map.name == "Zburzona Twierdza"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(24, 63)
}}}
function Razu4(){
var txt = document.getElementById("Q").value;
if(txt == "8"){
if(map.name == "Nawiedzony Jar"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(52, 44)
}}}setInterval(Razu4, 100);
function Razu5(){
var txt = document.getElementById("Q").value;
if(txt == "8"){
if(map.name == "Stare Wyrobisko p.5"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(16, 5)
}}}setInterval(Razu5, 100);
function Razu6(){
var txt = document.getElementById("Q").value;
if(txt == "8"){
if(map.name == "Stare Wyrobisko p.4"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(19, 26)
}}}setInterval(Razu6, 100);
function Razu7(){
var txt = document.getElementById("Q").value;
if(txt == "8"){
if(map.name == "Stare Wyrobisko p.3"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(7, 12)
}}}setInterval(Razu7, 100);
//Moduł Idź do : Werbin --> Tarmus
function Tarm1(){
var txt = document.getElementById("Q").value;
if(txt == "9"){
if(map.name == "Werbin"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(63, 86)
}}}setInterval(Tarm1, 100);
function Tarm2(){
var txt = document.getElementById("Q").value;
if(txt == "9"){
if(map.name == "Brama Północy"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(14, 63)
}}}setInterval(Tarm2, 100);
function Tarm3(){
var txt = document.getElementById("Q").value;
if(txt == "9"){
if(map.name == "Góry Zrębowe"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(34, 95)
}}}setInterval(Tarm3, 100);
function Tarm4(){
var txt = document.getElementById("Q").value;
if(txt == "9"){
if(map.name == "Zachodnie Rozdroża"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(63, 25)
}}}setInterval(Tarm4, 100);
var zxc5 = setInterval(Tarm5, 3000);
function Tarm5(){
var txt = document.getElementById("Q").value;
if(txt == "9"){
if(map.name == "Kanion Straceńców"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(46, 26)
}}}
var zxc = setInterval(Tarm6, 100);
function Tarm6(){
var txt = document.getElementById("Q").value;
if(txt == "9"){
if(map.name == "Krasowa Pieczara p.2"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(16, 12)
}}};
function Tarm7(){
var txt = document.getElementById("Q").value;
if(txt == "9"){
if(map.name == "Krasowa Pieczara p.2"){
if(hero.x == 16){
if(hero.y == 12){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
setInterval(Tarm8, 1)
clearInterval(zxc);
}}}}}setInterval(Tarm7, 100);
function Tarm8(){
var txt = document.getElementById("Q").value;
if(txt == "9"){
if(map.name == "Krasowa Pieczara p.2"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(9, 40)
}}}
var zxc2 = setInterval(Tarm9, 100);
function Tarm9(){
var txt = document.getElementById("Q").value;
if(txt == "9"){
if(map.name == "Krasowa Pieczara p.3"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(39, 18)
}}}
var zxc3 = setInterval(Tarm10, 2000);
function Tarm10(){
var txt = document.getElementById("Q").value;
if(txt == "9"){
if(map.name == "Krasowa Pieczara p.3"){
if(hero.x == 39){
if(hero.y == 18){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
setInterval(Tarm11, 1)
clearInterval(zxc2);
clearInterval(zxc3);
}}}}}
function Tarm11(){
var txt = document.getElementById("Q").value;
if(txt == "9"){
if(map.name == "Krasowa Pieczara p.3"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(10, 46)
}}}
function Tarm12(){
var txt = document.getElementById("Q").value;
if(txt == "9"){
if(hero.x == 19){
if(hero.y == 40){
if(map.name == "Krasowa Pieczara p.3"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
setInterval(Tarm13, 100);
}}}}}
function Tarm13(){
var txt = document.getElementById("Q").value;
if(txt == "9"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(45, 61)
}}
var zxc6 = setInterval(Tarm14, 1000);
function Tarm14(){
var txt = document.getElementById("Q").value;
if(txt == "9"){
if(hero.x == 19){
if(hero.y == 40){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
setInterval(Tarm15, 1000);
clearInterval(zxc5);
}}}}
function Tarm15(){
var txt = document.getElementById("Q").value;
if(txt == "9"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(31, 62)
}}
var zxc6 = setInterval(Tarm16, 1);
function Tarm16(){
var txt = document.getElementById("Q").value;
if(txt == "9"){
if(hero.x == 31){
if(hero.y == 62){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
setInterval(Tarm17, 1);
clearInterval(zxc6);
}}}}
function Tarm17(){
var txt = document.getElementById("Q").value;
if(txt == "9"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(58, 34)
}}
var zxc7 = setInterval(Tarm18, 1000);
function Tarm18(){
var txt = document.getElementById("Q").value;
if(txt == "9"){
if(map.name == "Pieczara Szaleńców - sala 1"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(33, 12)
}}}
var zxc8 = setInterval(Tarm19, 1000);
function Tarm19(){
var txt = document.getElementById("Q").value;
if(txt == "9"){
if(map.name == "Pieczara Szaleńców - sala 1"){
if(hero.x == 33){
if(hero.y == 12){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
setInterval(Tarm20, 1);
clearInterval(zxc8);
clearInterval(zxc7);
}}}}}
function Tarm20(){
var txt = document.getElementById("Q").value;
if(txt == "9"){
if(map.name == "Pieczara Szaleńców - sala 1"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(7, 9)
}}}
var zxc9 = setInterval(Tarm21, 100);
function Tarm21(){
var txt = document.getElementById("Q").value;
if(txt == "9"){
if(map.name == "Pieczara Szaleńców - sala 2"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(47, 38)
}}}
function Tarm22(){
var txt = document.getElementById("Q").value;
if(txt == "9"){
if(map.name == "Pieczara Szaleńców - sala 2"){
if(hero.x == 47){
if(hero.y == 38){
clearInterval(zxc9);
}}}}}setInterval(Tarm22, 1000);
//Moduł Idź do : Ithan --> Niedźwiedzia Gawra (Expo koło Zniszczone Opactwo)
function IL1(){
var txt = document.getElementById("Q").value;
if(txt == "10"){
if(map.name == "Ithan"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(22, 95)
CloseFight();
}}}setInterval(IL1, 2000);
function IL2(){
var txt = document.getElementById("Q").value;
if(txt == "10"){
if(map.name == "Zniszczone Opactwo"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(63, 18)
}}}setInterval(IL2, 100);
var IL = setInterval(IL3, 2000);
function IL3(){
var txt = document.getElementById("Q").value;
if(txt == "10"){
if(map.name == "Leśny Bród"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(11, 23);
if(hero.x == 11){
if(hero.y == 23){
Mix();
clearInterval(IL);
}}}}}
function IL4(){
var txt = document.getElementById("Q").value;
if(txt == "10"){
if(map.name == "Leśny Bród"){
if(hero.x == 11){
if(hero.y == 23){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(26, 6)
CloseFight();
HideA();
Loot();
}}}}}setInterval(IL4, 5000);
function IL5(){
var txt = document.getElementById("Q").value;
if(txt == "10"){
if(map.name == "Niedźwiedzia Gawra"){
if(hero.x == 14){
if(hero.y == 30){
$('#auto').click();
}}}}}setInterval(IL5, 1000);
//Moduł Idź do : Goons --> Zoons
var gz = setInterval(GZ, 100);
function GZ(){
var txt = document.getElementById("Q").value;
if(txt == "11"){
if(map.name == "Lokum Złych Goblinów"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(44, 3)
}}}
function abc(){
var txt = document.getElementById("Q").value;
if(txt == "11"){
if(map.name == "Lokum Złych Goblinów"){
if(hero.x == 44){
if(hero.y == 3){
setInterval(abc2, 100);
clearInterval(gz);
}}}}}setInterval(abc, 1000);
function abc2(){
var txt = document.getElementById("Q").value;
if(txt == "11"){
if(map.name == "Lokum Złych Goblinów"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(17, 38)
}}}
var gz1 = setInterval(GZ2, 100);
function GZ2(){
var txt = document.getElementById("Q").value;
if(txt == "11"){
if(map.name == "Goblinskie Lokum"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(37, 6)
}}}
function GZ3(){
var txt = document.getElementById("Q").value;
if(txt == "11"){
if(hero.x == 37){
if(hero.y == 6){
if(map.name == "Goblinskie Lokum"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
Talk();
if(_g('talk&id=52541&c=20.449131')){
One();
}}}}}}setInterval(GZ3, 1000);
var gzz = setInterval(GZ6, 100);
function GZ6(){
var txt = document.getElementById("Q").value;
if(txt == "11"){
if(map.name == "Goblinskie lokum - siedziba"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(16, 11)
}}}
function GZ7(){
var txt = document.getElementById("Q").value;
if(txt == "11"){
if(map.name == "Goblinskie lokum - siedziba"){
if(hero.x == 16){
if(hero.y == 11){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
clearInterval(gzz);
}}}}}setInterval(GZ7, 1000);
//Moduł Szukaj: Czarująca Atalia
var ata = setInterval(atka1, 2000);
function atka1(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 11){
if(hero.y == 37){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(15, 53)  // Do Magazyn Mioteł
}}}}}
var ata2 = setInterval(atka2, 100);
function atka2(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Magazyn mioteł"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(12, 15)
}}}
function atka3(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Magazyn mioteł"){
if(hero.x == 12){
if(hero.y == 15){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(5, 17)
clearInterval(ata2);
}}}}}setInterval(atka3, 1000);
function atka4(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 15){
if(hero.y == 53){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(10, 63)
clearInterval(ata);
}}}}}setInterval(atka4, 5000);
function atka5(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 10){
if(hero.y == 63){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(28, 67)
}}}}}setInterval(atka5, 5000);
function atka6(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 28){
if(hero.y == 67){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(27, 56)
}}}}}setInterval(atka6, 2000); // Idz do Splądrowana Kaplica
var ata3 = setInterval(atka7, 1000);
function atka7(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Splądrowana kaplica"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(14, 8)
}}}
function atka8(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Splądrowana kaplica"){
if(hero.x == 14){
if(hero.y == 8){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
clearInterval(ata3);
hero.mojsearch(11, 21) // Do Tristam z Kaplicy
}}}}}setInterval(atka8, 100);
function atka9(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 26){
if(hero.y == 56){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(23, 65)
}}}}}setInterval(atka9, 3000);
function atka10(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 23){
if(hero.y == 65){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(14, 60)
}}}}}setInterval(atka10, 3000);
function atka11(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 14){
if(hero.y == 60){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(11, 50)
}}}}}setInterval(atka11, 3000);
function atka12(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 11){
if(hero.y == 50){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(9, 37)
}}}}}setInterval(atka12, 3000);
function atka13(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 9){
if(hero.y == 37){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(25, 38)
}}}}}setInterval(atka13, 3000);
function atka14(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 25){
if(hero.y == 38){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(29, 34) //Idź do Dom Atalii
}}}}}setInterval(atka14, 3000);
var ata6 = setInterval(atka15, 100);
function atka15(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Dom Atalii"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(14, 9)
}}}
function atka16(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Dom Atalii"){
if(hero.x == 14){
if(hero.y == 9){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
clearInterval(ata6);
hero.mojsearch(15, 11) // Do Tristam
}}}}}setInterval(atka16, 1000);
function atka17(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 29){
if(hero.y == 34){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(25, 45)
}}}}}setInterval(atka17, 4000);
function atka18(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 25){
if(hero.y == 45){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(21, 46)
}}}}}setInterval(atka18, 5000);
var ata7 = setInterval(atka19, 100);
function atka19(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Dom Amry"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(17, 10)
}}}
function atka20(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Dom Amry"){
if(hero.x == 17){
if(hero.y == 10){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
clearInterval(ata7);
hero.mojsearch(19, 13) // Do Tristam
}}}}}setInterval(atka20, 1000);
function atka21(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 21){
if(hero.y == 46){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(23, 43)
}}}}}setInterval(atka21, 6000);
function atka22(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 23){
if(hero.y == 43){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(33, 42)
}}}}}setInterval(atka22, 3000);
function atka23(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 33){
if(hero.y == 42){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(40, 39)
}}}}}setInterval(atka23, 3000);
function atka24(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 40){
if(hero.y == 39){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(40, 29)
}}}}}setInterval(atka24, 3000);
function atka25(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 40){
if(hero.y == 29){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(45, 23)
}}}}}setInterval(atka25, 3000);
function atka26(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 45){
if(hero.y == 23){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(47, 15)
}}}}}setInterval(atka26, 3000);
function atka27(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 47){
if(hero.y == 15){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(41, 12)
}}}}}setInterval(atka27, 3000);
function atka28(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 41){
if(hero.y == 12){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(34, 17)
}}}}}setInterval(atka28, 3000);
function atka29(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 34){
if(hero.y == 17){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(33, 9)
}}}}}setInterval(atka29, 3000);
function atka30(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 33){
if(hero.y == 9){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(23, 14)
}}}}}setInterval(atka30, 3000);
function atka31(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 23){
if(hero.y == 14){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(15, 15)
}}}}}setInterval(atka31, 3000);
function atka32(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 15){
if(hero.y == 15){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(18, 6)
}}}}}setInterval(atka32, 3000);
function atka33(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 18){
if(hero.y == 6){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(7, 5)
}}}}}setInterval(atka33, 3000);
function atka34(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 7){
if(hero.y == 5){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(4, 6) // Do Ograniona świątynia
}}}}}setInterval(atka34, 3000);
var ata20 = setInterval(atka35, 100);
function atka35(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Ograbiona świątynia"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(17, 11)
}}}
function atka36(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Ograbiona świątynia"){
if(hero.x == 17){
if(hero.y == 11){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(12, 21)
clearInterval(ata20); // Idź do Tristam ze Ograbionej świątyni
}}}}}setInterval(atka36, 3000);
function atka37(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 3){
if(hero.y == 6){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(9, 7)
}}}}}setInterval(atka37, 3000);
function atka38(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 9){
if(hero.y == 7){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(14, 6)
}}}}}setInterval(atka38, 3000);
function atka39(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 14){
if(hero.y == 6){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(18, 12)
}}}}}setInterval(atka39, 3000);
function atka40(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 18){
if(hero.y == 12){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(27, 12)
}}}}}setInterval(atka40, 3000);
function atka41(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 27){
if(hero.y == 12){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(35, 12)
}}}}}setInterval(atka41, 3000);
function atka42(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 35){
if(hero.y == 12){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(42, 14)
}}}}}setInterval(atka42, 5000);
function atka43(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 42){
if(hero.y == 14){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(46, 27) //Wiedźma
}}}}}setInterval(atka43, 5000);
function atka44(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 46){
if(hero.y == 27){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
Fight();
CloseFight();
hero.mojsearch(45, 30) 
}}}}}setInterval(atka44, 5000);
function atka45(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 46){
if(hero.y == 27){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
Fight();
CloseFight();
HideA();
hero.mojsearch(45, 30) 
}}}}}setInterval(atka45, 5000);
function atka46(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 45){
if(hero.y == 30){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(49, 36) 
}}}}}setInterval(atka46, 5000);
function atka47(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 49){
if(hero.y == 36){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(54, 32) 
}}}}}setInterval(atka47, 5000);
function atka48(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 54){
if(hero.y == 32){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(59, 28) 
}}}}}setInterval(atka48, 5000);
function atka49(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 59){
if(hero.y == 28){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(58, 20) 
}}}}}setInterval(atka49, 5000);
function atka50(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 58){
if(hero.y == 20){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
Fight();
CloseFight();
HideA();
hero.mojsearch(56, 15) 
}}}}}setInterval(atka50, 5000);
var ata15 = setInterval(atka51, 100);
function atka51(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Splugawiona kaplica"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(7, 13) 
}}}
function atka52(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Splugawiona kaplica"){
if(hero.x == 7){
if(hero.y == 13){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
clearInterval(ata15);
hero.mojsearch(11, 21) 
}}}}}setInterval(atka52, 3000);
function atka53(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 55){
if(hero.y == 15){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(59, 19) 
}}}}}setInterval(atka53, 6000);
function atka54(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 59){
if(hero.y == 19){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(58, 28) 
}}}}}setInterval(atka54, 5000);
function atka55(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 58){
if(hero.y == 28){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(57, 32) 
}}}}}setInterval(atka55, 5000);
function atka56(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 57){
if(hero.y == 32){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(59, 40) 
}}}}}setInterval(atka56, 5000);
function atka57(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 59){
if(hero.y == 40){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(58, 47) 
}}}}}setInterval(atka57, 5000);
function atka58(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 58){
if(hero.y == 47){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(61, 52) 
}}}}}setInterval(atka58, 5000);
function atka59(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 61){
if(hero.y == 52){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(63, 61) 
}}}}}setInterval(atka59, 5000);
function atka60(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 63){
if(hero.y == 61){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(60, 65) 
}}}}}setInterval(atka60, 5000);
function atka61(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 60){
if(hero.y == 65){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(55, 71) 
}}}}}setInterval(atka61, 5000);
function atka62(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 55){
if(hero.y == 71){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(50, 74) 
}}}}}setInterval(atka62, 5000);
function atka63(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 50){
if(hero.y == 74){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(48, 66) 
}}}}}setInterval(atka63, 5000);
function atka64(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 48){
if(hero.y == 66){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(43, 66) 
}}}}}setInterval(atka64, 5000);
function atka65(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 43){
if(hero.y == 66){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(38, 72) 
}}}}}setInterval(atka65, 5000);
function atka66(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 38){
if(hero.y == 72){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(33, 79) 
}}}}}setInterval(atka66, 5000);
function atka67(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 33){
if(hero.y == 79){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(37, 86) 
}}}}}setInterval(atka67, 5000);
function atka68(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 37){
if(hero.y == 86){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(35, 93) 
}}}}}setInterval(atka68, 5000);
function atka69(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 35){
if(hero.y == 93){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(27, 95) 
}}}}}setInterval(atka69, 5000);
function atka70(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 27){
if(hero.y == 95){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(17, 89) 
}}}}}setInterval(atka70, 5000);
function atka71(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 17){
if(hero.y == 89){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(8, 90) 
}}}}}setInterval(atka71, 5000);
function atka72(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 8){
if(hero.y == 90){
Spec2(); // Do Sabatowych
}}}}}setInterval(atka72, 5000);
function Spec1(){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(63, 71)  // Do Sabatowych
}
function Spec2(){
setInterval(Spec1, 1000);
} // Do Sabatowych
var ata21 = setInterval(atka73, 1000);
function atka73(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Sabatowe Góry"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(15, 48) 
}}}
function atka74(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Sabatowe Góry"){
if(hero.x == 15){
if(hero.y == 48){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
clearInterval(ata21);
hero.mojsearch(18, 53) 
}}}}}setInterval(atka74, 1000);
function atka75(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Sabatowe Góry"){
if(hero.x == 18){
if(hero.y == 53){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(24, 53) 
}}}}}setInterval(atka75, 1000);
function atka76(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Sabatowe Góry"){
if(hero.x == 24){
if(hero.y == 53){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(26, 47) 
}}}}}setInterval(atka76, 1000);
function atka77(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Sabatowe Góry"){
if(hero.x == 26){
if(hero.y == 47){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(25, 41) 
}}}}}setInterval(atka77, 4000);
function atka78(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Sabatowe Góry"){
if(hero.x == 25){
if(hero.y == 41){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(20, 35) 
}}}}}setInterval(atka78, 4000);
function atka79(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Sabatowe Góry"){
if(hero.x == 20){
if(hero.y == 35){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(16, 30) 
}}}}}setInterval(atka79, 4000);
function atka80(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Sabatowe Góry"){
if(hero.x == 16){
if(hero.y == 30){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(14, 25) 
}}}}}setInterval(atka80, 4000);
function atka81(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Sabatowe Góry"){
if(hero.x == 14){
if(hero.y == 25){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(12, 23) 
}}}}}setInterval(atka81, 4000);
function atka82(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Sabatowe Góry"){
if(hero.x == 12){
if(hero.y == 23){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(16, 26) 
}}}}}setInterval(atka82, 4000);
function atka83(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Sabatowe Góry"){
if(hero.x == 16){
if(hero.y == 26){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(19, 30) 
}}}}}setInterval(atka83, 4000);
function atka84(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Sabatowe Góry"){
if(hero.x == 19){
if(hero.y == 30){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(22, 34) 
}}}}}setInterval(atka84, 4000);
function atka85(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Sabatowe Góry"){
if(hero.x == 22){
if(hero.y == 34){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(28, 38) 
}}}}}setInterval(atka85, 4000);
function atka86(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Sabatowe Góry"){
if(hero.x == 28){
if(hero.y == 38){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(29, 43) 
}}}}}setInterval(atka86, 4000);
function atka87(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Sabatowe Góry"){
if(hero.x == 29){
if(hero.y == 43){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(31, 48) 
}}}}}setInterval(atka87, 4000);
function atka88(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Sabatowe Góry"){
if(hero.x == 31){
if(hero.y == 48){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(36, 48) 
}}}}}setInterval(atka88, 4000);
function atka89(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Sabatowe Góry"){
if(hero.x == 36){
if(hero.y == 48){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(36, 55) 
}}}}}setInterval(atka89, 4000);
function atka90(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Sabatowe Góry"){
if(hero.x == 36){
if(hero.y == 55){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(38, 55) 
}}}}}setInterval(atka90, 4000);
function atka91(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Sabatowe Góry"){
if(hero.x == 38){
if(hero.y == 55){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(38, 51) 
}}}}}setInterval(atka91, 4000);
function atka92(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Sabatowe Góry"){
if(hero.x == 38){
if(hero.y == 51){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(45, 50) 
}}}}}setInterval(atka92, 4000);
function atka93(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Sabatowe Góry"){
if(hero.x == 45){
if(hero.y == 50){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(49, 45) 
}}}}}setInterval(atka93, 4000);
function atka94(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Sabatowe Góry"){
if(hero.x == 49){
if(hero.y == 45){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(57, 47) 
}}}}}setInterval(atka94, 4000);
function atka95(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Sabatowe Góry"){
if(hero.x == 57){
if(hero.y == 47){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(58, 38) 
}}}}}setInterval(atka95, 4000);
function atka96(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Sabatowe Góry"){
if(hero.x == 58){
if(hero.y == 38){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(54, 33) 
}}}}}setInterval(atka96, 4000);
function atka97(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Sabatowe Góry"){
if(hero.x == 54){
if(hero.y == 33){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(49, 33) 
}}}}}setInterval(atka97, 4000);
function atka98(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Sabatowe Góry"){
if(hero.x == 49){
if(hero.y == 33){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(49, 37) 
}}}}}setInterval(atka98, 4000);
function atka99(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Sabatowe Góry"){
if(hero.x == 49){
if(hero.y == 37){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(47, 31) 
}}}}}setInterval(atka99, 4000);
function atka100(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Sabatowe Góry"){
if(hero.x == 47){
if(hero.y == 31){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(51, 25) 
}}}}}setInterval(atka100, 4000);
function atka101(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Sabatowe Góry"){
if(hero.x == 51){
if(hero.y == 25){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
CloseFight();
Fight();
HideA();
hero.mojsearch(48, 21) 
}}}}}setInterval(atka101, 4000);
function atka102(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Sabatowe Góry"){
if(hero.x == 48){
if(hero.y == 21){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
CloseFight();
Fight();
HideA();
hero.mojsearch(42, 21) 
}}}}}setInterval(atka102, 4000);
function atka103(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Sabatowe Góry"){
if(hero.x == 42){
if(hero.y == 21){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(37, 14) 
}}}}}setInterval(atka103, 4000);
function atka104(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Sabatowe Góry"){
if(hero.x == 37){
if(hero.y == 14){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(35, 7) 
}}}}}setInterval(atka104, 4000);
function atka105(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Sabatowe Góry"){
if(hero.x == 35){
if(hero.y == 7){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(33, 9) 
}}}}}setInterval(atka105, 4000);
function atka106(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Sabatowe Góry"){
if(hero.x == 33){
if(hero.y == 9){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(29, 12) 
}}}}}setInterval(atka106, 4000);
function atka107(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Sabatowe Góry"){
if(hero.x == 29){
if(hero.y == 12){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
CloseFight();
Fight();
HideA();
hero.mojsearch(26, 19) 
}}}}}setInterval(atka107, 4000);
function atka108(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Sabatowe Góry"){
if(hero.x == 26){
if(hero.y == 19){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
CloseFight();
Fight();
HideA();
hero.mojsearch(20, 20) 
}}}}}setInterval(atka108, 4000);
function atka109(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Sabatowe Góry"){
if(hero.x == 20){
if(hero.y == 20){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(20, 13) 
}}}}}setInterval(atka109, 4000);
function atka110(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Sabatowe Góry"){
if(hero.x == 20){
if(hero.y == 13){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(19, 7) 
}}}}}setInterval(atka110, 4000);
function atka111(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Sabatowe Góry"){
if(hero.x == 19){
if(hero.y == 7){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(17, 0)  // Idź do Upiorna
}}}}}setInterval(atka111, 4000);
var ata25 = setInterval(atka112, 1000);
function atka112(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Upiorna Droga"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(23, 11)
}}}
function atka113(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Upiorna Droga"){
if(hero.x == 23){
if(hero.y == 11){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
clearInterval(ata25);
hero.mojsearch(25, 19) 
}}}}}setInterval(atka113, 4000);
function atka114(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Upiorna Droga"){
if(hero.x == 25){
if(hero.y == 19){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(25, 26) 
}}}}}setInterval(atka114, 4000);
function atka115(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Upiorna Droga"){
if(hero.x == 25){
if(hero.y == 26){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(21, 38) 
}}}}}setInterval(atka115, 4000);
function atka116(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Upiorna Droga"){
if(hero.x == 21){
if(hero.y == 38){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(29, 39) 
}}}}}setInterval(atka116, 4000);
function atka117(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Upiorna Droga"){
if(hero.x == 29){
if(hero.y == 39){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(36, 42) 
}}}}}setInterval(atka117, 4000);
function atka118(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Upiorna Droga"){
if(hero.x == 36){
if(hero.y == 42){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(43, 48) 
}}}}}setInterval(atka118, 4000);
function atka119(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Upiorna Droga"){
if(hero.x == 43){
if(hero.y == 48){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(47, 44) 
}}}}}setInterval(atka119, 4000);
function atka120(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Upiorna Droga"){
if(hero.x == 47){
if(hero.y == 44){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
Fight();
CloseFight();
HideA();
hero.mojsearch(56, 44) 
}}}}}setInterval(atka120, 4000);
function atka121(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Upiorna Droga"){
if(hero.x == 56){
if(hero.y == 44){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(63, 46) 
}}}}}setInterval(atka121, 4000);
function atka122(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Upiorna Droga"){
if(hero.x == 63){
if(hero.y == 46){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
atka123();
}}}}}setInterval(atka122, 4000);
function atka1222(){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(73, 14);
}
function atka123(){
setInterval(atka1222, 10000);
}
function atka124(){
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Upiorna Droga"){
if(hero.x == 73){
if(hero.y == 14){
TpTristam(); //Szukaj rew
}}}}}setInterval(atka124, 10000);
function TpTristam(){
for(var i in g.item){
var item = g.item[i];
if (item.name.indexOf("Latająca miotła")>=0)
_g("moveitem&st=1&id="+item.id);
}}
function atka125(){ //Szukaj rew
var txt = document.getElementById("Q").value;
if(txt == "12"){
if(map.name == "Tristam"){
if(hero.x == 29){
if(hero.y == 41){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(11, 37);
}}}}}setInterval(atka125, 10000);
//////////////////////////////////////////////HEROS EVENTOWY/////////////////////////////////////////////////
function HE(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Nithal"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(44, 7);
}}}setInterval(HE, 1000);
var HerosE = setInterval(HE1, 1000);
function HE1(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Podgrodzie Nithal"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(38, 38);
}}}
function HE2(){
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Podgrodzie Nithal"){
if(hero.x == 38){
if(hero.y == 38){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
clearInterval(HerosE);
hero.mojsearch(0, 7); // Do Niziny
}}}}}setInterval(HE2, 1000);
function HE3(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Nizina Wieśniaków"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(26, 0);
}}}setInterval(HE3, 1000);
function HE4(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Gościniec Bardów"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(44, 0);
}}}setInterval(HE4, 1000);
function HE5(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Eder"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(28, 0);
}}}setInterval(HE5, 1000);
var HerosE1 = setInterval(HE6, 1000);
function HE6(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Fort Eder"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(63, 54);
}}}
var HerosE2 = setInterval(HE7, 1000);
function HE7(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Stary Kupiecki Trakt"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(7, 23);
}}}
function HE8(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Stary Kupiecki Trakt"){
if(hero.x == 7){
if(hero.y == 23){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
clearInterval(HerosE2);
hero.mojsearch(0, 22);
}}}}}setInterval(HE8, 1000);
function HE9(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Fort Eder"){
if(hero.x == 63){
if(hero.y == 54){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
clearInterval(HerosE1);
SpecE2();
}}}}}setInterval(HE9, 5000);
function SpecE(){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(27, 0);
}
function SpecE2(){
setInterval(SpecE, 1000);
}
function HE10(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Mokradła"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(27, 0);
}}}setInterval(HE10, 1000);
var HerosE4 = setInterval(HE11, 1000);
function HE11(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Dolina Rozbójników"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(7, 17);
}}}
function SpecE3(){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(63, 19);
}
function SpecE4(){
setInterval(SpecE3, 1000);
}
function HE12(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Dolina Rozbójników"){
if(hero.x == 7){
if(hero.y == 17){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
clearInterval(HerosE4);
SpecE4();
}}}}}setInterval(HE12, 5000);
var HerosE5 = setInterval(HE13, 1000);
function HE13(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Wioska Ghuli"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(8, 19);
}}}
function HE14(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Wioska Ghuli"){
if(hero.x == 8){
if(hero.y == 19){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
clearInterval(HerosE5);
hero.mojsearch(0, 19);
}}}}}setInterval(HE14, 5000);
function HE15(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Dolina Rozbójników"){
if(hero.x == 63){
if(hero.y == 19){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
clearInterval(HerosE4);
SpecE6();
}}}}}setInterval(HE15, 100);
function SpecE5(){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(10, 0);
}
function SpecE6(){
setInterval(SpecE5, 1000);
}
var HerosE6 = setInterval(HE16, 1000);
function HE16(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Przełęcz Łotrzyków"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(34, 79);
}}}
function HE17(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Przełęcz Łotrzyków"){
if(hero.x == 34){
if(hero.y == 79){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
clearInterval(HerosE6);
Fight();
CloseFight();
HideA();
Loot();
hero.mojsearch(53, 61);
}}}}}setInterval(HE17, 3000);
function HE17z(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Przełęcz Łotrzyków"){
if(hero.x == 53){
if(hero.y == 61){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
clearInterval(HerosE6);
Fight();
CloseFight();
HideA();
Loot();
hero.mojsearch(60, 54);
}}}}}setInterval(HE17z, 500);
function HE17zz(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Przełęcz Łotrzyków"){
if(hero.x == 60){
if(hero.y == 54){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
clearInterval(HerosE6);
Fight();
CloseFight();
HideA();
Loot();
hero.mojsearch(63, 48);
}}}}}setInterval(HE17zz, 3000);
var HerosE7 = setInterval(HE18, 1000);
function HE18(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Pagórki Łupieżców"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(4, 48);
}}}
function HE19(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Pagórki Łupieżców"){
if(hero.x == 4){
if(hero.y == 48){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
clearInterval(HerosE7);
hero.mojsearch(0, 48);
}}}}}setInterval(HE19, 3000);
function HE20(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Przełęcz Łotrzyków"){
if(hero.x == 63){
if(hero.y == 47){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
clearInterval(HerosE6);
hero.mojsearch(59, 50);
}}}}}setInterval(HE20, 3000);
function HE21(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Przełęcz Łotrzyków"){
if(hero.x == 59){
if(hero.y == 50){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(59, 56);
}}}}}setInterval(HE21, 3000);
function HE22(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Przełęcz Łotrzyków"){
if(hero.x == 59){
if(hero.y == 56){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(53, 58);
}}}}}setInterval(HE22, 3000);
function HE23(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Przełęcz Łotrzyków"){
if(hero.x == 53){
if(hero.y == 58){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(48, 61);
}}}}}setInterval(HE23, 3000);
function HE24(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Przełęcz Łotrzyków"){
if(hero.x == 48){
if(hero.y == 61){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(40, 60);
}}}}}setInterval(HE24, 3000);
function HE25(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Przełęcz Łotrzyków"){
if(hero.x == 40){
if(hero.y == 60){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(35, 63);
}}}}}setInterval(HE25, 3000);
function HE26(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Przełęcz Łotrzyków"){
if(hero.x == 35){
if(hero.y == 63){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(30, 59);
}}}}}setInterval(HE26, 3000);
function HE27(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Przełęcz Łotrzyków"){
if(hero.x == 30){
if(hero.y == 59){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(27, 53);
}}}}}setInterval(HE27, 3000);
function HE28(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Przełęcz Łotrzyków"){
if(hero.x == 27){
if(hero.y == 53){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(21, 53);
}}}}}setInterval(HE28, 3000);
function HE29(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Przełęcz Łotrzyków"){
if(hero.x == 21){
if(hero.y == 53){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(13, 51);
}}}}}setInterval(HE29, 3000);
function HE30(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Przełęcz Łotrzyków"){
if(hero.x == 13){
if(hero.y == 51){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
SpecE8();
}}}}}setInterval(HE30, 1000);
function SpecE7(){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(17, 0);
}
function SpecE8(){
setInterval(SpecE7, 1000);
}
function HE31(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Orla Grań"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(44, 0);
}}}setInterval(HE31, 1000);
function HE32(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Stare Ruiny"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(49, 0);
}}}setInterval(HE32, 1000);
function HE33(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Torneg"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(54, 30);
}}}setInterval(HE33, 1000);
function HE34(){  // Tp do K-H
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Torneg"){
if(hero.x == 54){
if(hero.y == 30){
Talk();
if(_g('talk&id=44111&c=20.608200')){
One();
}else{
if(_g('talk&id=44111&c=71.608203')){
Four();
}}}}}}}setInterval(HE34, 5000);
function HE35(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Karka-han"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(59, 63);
}}}setInterval(HE35, 1000);
function HE36(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Przedmieścia Karka-han"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(39, 63);
}}}setInterval(HE36, 1000);
function HE37(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Przełęcz Dwóch Koron"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(95, 37);
}}}setInterval(HE37, 1000);
function HE38(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Wichrowe Szczyty"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(95, 38);
}}}setInterval(HE38, 1000);
var HerosE10 = setInterval(HE39, 2000);
function HE39(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Uroczysko"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(52, 28);
}}}
function HE40(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Uroczysko"){
if(hero.x == 52){
if(hero.y == 28){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
clearInterval(HerosE10);
hero.mojsearch(48, 25);
}}}}}setInterval(HE40, 2000);
function HE41(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Uroczysko"){
if(hero.x == 48){
if(hero.y == 25){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(45, 21);
}}}}}setInterval(HE41, 2000);
function HE42(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Uroczysko"){
if(hero.x == 45){
if(hero.y == 21){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(42, 19);
}}}}}setInterval(HE42, 2000);
function HE43(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Uroczysko"){
if(hero.x == 42){
if(hero.y == 19){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(35, 18);
}}}}}setInterval(HE43, 2000);
function HE44(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Uroczysko"){
if(hero.x == 35){
if(hero.y == 18){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(28, 17);
}}}}}setInterval(HE44, 2000);
function HE45(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Uroczysko"){
if(hero.x == 28){
if(hero.y == 17){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(23, 15);
}}}}}setInterval(HE45, 2000);
function HE46(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Uroczysko"){
if(hero.x == 23){
if(hero.y == 15){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(24, 0); //Niedźwiedzi
}}}}}setInterval(HE46, 4000);
var HerosE11 = setInterval(HE47, 1000);
function HE47(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Niedźwiedzi Uskok"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(23, 60);
}}}
function HE48(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Niedźwiedzi Uskok"){
if(hero.x == 23){
if(hero.y == 60){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(23, 63); 
}}}}}setInterval(HE48, 1000);
function HE49(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Uroczysko"){
if(hero.x == 23){
if(hero.y == 0){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
clearInterval(HerosE10);
SpecE10();
}}}}}setInterval(HE49, 1000);
function SpecE9(){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(95, 37);
}
function SpecE10(){
setInterval(SpecE9, 1000);
}
function HE50(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Zniszczone Opactwo"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(36, 0);
}}}setInterval(HE50, 1000);
var HerosE15 = setInterval(HE51, 1000);
function HE51(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Ithan"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(35, 76);
}}}
function HE52(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Ithan"){
if(hero.x == 35){
if(hero.y == 76){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
clearInterval(HerosE15);
hero.mojsearch(42, 83);
}}}}}setInterval(HE52, 1000);
function HE53(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Ithan"){
if(hero.x == 42){
if(hero.y == 83){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(52, 85); 
}}}}}setInterval(HE53, 1000);
function HE54(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Ithan"){
if(hero.x == 52){
if(hero.y == 85){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(63, 89); 
}}}}}setInterval(HE54, 1000);
var HerosE16 = setInterval(HE55, 1000);
function HE55(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Dolina Yss"){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(5, 86); 
}}}
function HE56(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Dolina Yss"){
if(hero.x == 5){
if(hero.y == 86){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
clearInterval(HerosE16);
hero.mojsearch(0, 86); 
}}}}}setInterval(HE56, 1000);
function HE57(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Ithan"){
if(hero.x == 63){
if(hero.y == 88){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
clearInterval(HerosE15);
SpecE15();
}}}}}setInterval(HE57, 1000);
function SpecE14(){
if (typeof hero.searchPath == "function")
hero.mojsearch = hero.searchPath
hero.mojsearch(12, 16);
}
function SpecE15(){
setInterval(SpecE14, 1000);
}
function HE58(){ 
var txt = document.getElementById("Q").value;
if(txt == "13"){
if(map.name == "Ithan"){
if(hero.x == 12){
if(hero.y == 16){
Talk();
if(_g('talk&id=44099&c=3.608200')){
One();
}else{
if(_g('talk&id=44099&c=52.608205')){
Six();
}}}}}}}setInterval(HE58, 4000);
//Szukanie:Obła,Demka
//Trzeba zrobić: Wszystkie potwory do jednej zmiennej!