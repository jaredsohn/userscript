// ==UserScript==
// @name       CraftPanel
// @version    1.2
// @description  
// @match      http://craftsite.pl/forum/*
// ==/UserScript==
/* Cadence */
function msg(x){
console.log(x)   
}

msg("######### CraftPanel ##########")
msg("# Wersja 1.2")
msg("# By Cadence")
msg("###############################")
msg("[CraftPanel] Zainicjonowano")
/*########################## CSS #########################*/
var css = '\
#custtlo{width:220px;}\
#custtloact{width:265px;}\
#cp_footer{font-size:11px;position:absolute;width:298px;border-top:1px solid #ececec;bottom:0px;padding-bottom:5px;}\
.cp_btn_active{padding: 0 10px;height:30px;-moz-box-shadow: 0px 2px 3px rgba(0,0,0,0.2);-webkit-box-shadow: 0px 2px 3px rgba(0,0,0,0.2);box-shadow: 0px 2px 3px rgba(0,0,0,0.2);color: #fff;border-radius:3px;background:white;border: 0;min-width: 50px;color: #777;font-weight: normal;}\
.cp_btn{background: #212121 url(http://craftsite.pl/forum/public/style_images/master/topic_button.png) repeat-x top; border: 1px solid #212121;border-width: 1px 1px 0 1px;-moz-border-radius: 3px;-webkit-border-radius: 3px;border-radius: 3px;-moz-box-shadow: inset 0 1px 0 0 #5c5c5c, 0px 2px 3px rgba(0,0,0,0.2);-webkit-box-shadow: inset 0 1px 0 0 #5c5c5c, 0px 2px 3px rgba(0,0,0,0.2);box-shadow: inset 0 1px 0 0 #5c5c5c, 0px 2px 3px rgba(0,0,0,0.2);color: #fff;text-shadow: 0 -1px 0 #191919;font: 300 12px/1.3 Helvetica, Arial, sans-serif;line-height: 30px;height: 30px;padding: 0 10px;text-align: center;min-width: 50px;margin:0px 5px;display: inline-block;cursor: pointer;}\
#cp_title2{text-align:left;font-size: 17px;font-weight: normal;color: #595959;padding: 2px 0 5px 0;} \
#cp_title{text-align:center;font-size: 14px;font-weight: normal;color: #595959;padding: 3px 0;border-bottom: 1px solid #ececec;} \
#cpanel{font-size:12px;text-align:center;border-radius:0px 0px 6px 6px;padding:10px 10px 40px 10px;background:#fbfbfb; position:absolute; z-index:9999999999999999999; box-shadow: rgba(0, 0, 0, 0.58) 0px 12px 25px; width:300px;top:33px;} \
#craftpanel {background: url("http://i.imgur.com/9PtbrP1.png") no-repeat; padding: 13px 29px 8px 12px; background-size: 25px 25px; background-position: center 6px; cursor:pointer; opacity:0.75; } \
#craftpanel:hover{background-color: #323232;}\
.funcicon{cursor:pointer;width:30px;height:30px;}\
.cp_popout{left:100px;position:fixed;top:100px;width:400px;height:300px;background:white;z-index:999999999999;border:5px solid brown;}\
.cp_popout_close{position:absolute;cursor:pointer;right:-20px;top:-20px;}\
.cp_popout_save{position:absolute;cursor:pointer;right:-15px;bottom:-15px;background:white;border-radius:5px;border:3px solid brown;}\
#notatka_data{color:black;padding:1px 10px 1px 5px;position:absolute;right:15px;bottom:-15px;background:white;border-radius:5px;border:3px solid brown;border-right:none;height:15px;min-width:20px;}\
#notatka{background:url(https://static2.udemy.com/static/images/v3/noise.png) repeat, url(http://i.imgur.com/OY9NfdB.png) repeat;width:399px;height:299px;max-width:399px;max-height:299px;}\
#ulubione{background:#fbfbfb;}\
.txturl{margin:6px 0px 0px 0px;}\
.spoiller{background: #212121 url(http://craftsite.pl/forum/public/style_images/master/topic_button.png) repeat-x top; border: 1px solid #212121;border-width: 1px 1px 0 1px;-moz-border-radius: 3px;-webkit-border-radius: 3px;border-radius: 3px;-moz-box-shadow: inset 0 1px 0 0 #5c5c5c, 0px 2px 3px rgba(0,0,0,0.2);-webkit-box-shadow: inset 0 1px 0 0 #5c5c5c, 0px 2px 3px rgba(0,0,0,0.2);box-shadow: inset 0 1px 0 0 #5c5c5c, 0px 2px 3px rgba(0,0,0,0.2);color: #fff;text-shadow: 0 -1px 0 #191919;font: 300 12px/1.3 Helvetica, Arial, sans-serif;height: 20px;padding: 2px 2px;text-align: center;min-width: 50px;margin:5px 5px 0px 5px;display: inline-block;cursor: pointer;}\
#board_statistics, #topic_stats, #forum_footer, div.topic_controls.clearfix, div.topic_controls.clear.ipsPad_top_bottom_half, div.topic_controls{background: white;padding: 5px;}\
#image_content{background:white;}\
',
    head = document.getElementsByTagName('head')[0],
    style = document.createElement('style');
style.type = 'text/css';
if (style.styleSheet){
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}
head.appendChild(style);
msg("[CraftPanel] Wgrano style")
/*########################################################*/
/*######################## STWÓRZ ########################*/

var aaaaa=document.createElement('li');
var bbbbb=document.createElement('a');
var ccccc=document.createElement('div');
aaaaa.appendChild(bbbbb);aaaaa.appendChild(ccccc);
firstli = document.getElementById("user_navigation").getElementsByClassName("ipsList_inline right")[0];
document.getElementById("user_navigation").getElementsByClassName("ipsList_inline right")[0].insertBefore(aaaaa, firstli.firstChild);
zurl = document.getElementById("user_navigation").getElementsByTagName("li")[0].getElementsByTagName("a")[0];
burl = document.getElementById("user_navigation").getElementsByTagName("li")[0].getElementsByTagName("div")[0];
xurl = document.getElementById("user_navigation").getElementsByTagName("li")[0];
zurl.setAttribute("id", "craftpanel");
burl.setAttribute("id", "cpanel");

cp_button = document.getElementById("craftpanel");
cp_panel = document.getElementById("cpanel");

function closenotatnik(){
    cp_notatnik.style.display='none';
}

cp_panel.style.display="none";
cp_panel.innerHTML='\
	<audio controls id="audio" style="display:none;">\
	   <source src="http://thepatrollpl.site50.net/tictactoe/click.mp3" preload="auto">\
	   <source src="http://thepatrollpl.site50.net/tictactoe/click.ogg" preload="auto">\
	</audio>\
<div class="cp_popout" id="notatnik">\
	<img id="notatnik_close" title="Zamknij okno" src="http://i.imgur.com/u78LKUr.png" class="cp_popout_close">\
		<textarea id="notatka"></textarea>\
	<div id="notatka_data"></div>\
	<img id="notatka_save" title="Kliknij by zapisać!" src="http://i.imgur.com/AwrwRc0.png" class="cp_popout_save">\
</div>\
<div class="cp_popout" id="ulubione">\
	<img id="ulubione_close" title="Zamknij okno" src="http://i.imgur.com/u78LKUr.png" class="cp_popout_close">\
	<h1 id="cp_title">Ulubione tematy</h1></br>\
	W podane pola wstaw ID tematów, które mają być wyróżnione kolorem</br></br>\
	<input id="fav1" placeholder="ID tematu 1" type="text"></input></br></br>\
    <input id="fav2" placeholder="ID tematu 2" type="text"></input></br></br>\
    <input id="fav3" placeholder="ID tematu 3" type="text"></input></br></br>\
    <input id="fav4" placeholder="ID tematu 4" type="text"></input></br></br>\
    <input id="fav5" placeholder="ID tematu 5" type="text"></input></br>\
	<input id="zapiszulubione" type="button" value="Zapisz"></input></br>\
    ID tematu znajdziesz w adresie tematu, np. w tym temacie ID to 34827\
    http://craftsite.pl/forum/index.php?/topic/34827-wasze-propozycje-na-ulepszenie-forum/\
</div>\
<h1 id="cp_title2">CraftPanel <i style="font-size:11px;">vr.1.2</i></h1>\
<h1 id="cp_title" style="margin-bottom:5px;">Akcje</h1>\
	<img id="akcjanotatnik" class="funcicon" title="Zapisz notatkę (NA TYM KOMPUTERZE)" src="http://i.imgur.com/MihNtUa.png">\
	<img id="akcjaulubione" class="funcicon" title="Zarządzaj ulubionymi tematami" src="http://i.imgur.com/1LdEuzP.png" style="opacity:0.8;">\
<h1 id="cp_title" style="margin-top:10px;">Dodatkowe funkcje</h1>\
<input id="przelacz2" type="button" value="Pokaż" class="spoiller"></input>\
<div id="funkcje_handler" style="border:1px solid grey;padding:5px;">\
Tekstowe emotikony <img style="width:12px;height:12px;"src="http://i.imgur.com/gfERloT.png" title="Zamieniaj graficzne emotikony na całym forum na tekstowe odpowiedniki."></br>\
<input onclick="localStorage.emotki=0;location.reload();" id="emot1" class="cp_btn" type="button" value="TAK"></input>\
<input onclick="localStorage.emotki=1;location.reload();" id="emot2" class="cp_btn" type="button" value="NIE"></input>\
\
</br></br>Powiadamiaj o wywołaniu mojego nicku na czacie <img style="width:12px;height:12px;"src="http://i.imgur.com/gfERloT.png" title="Przeliczaj ilość użyć mojego nicku na czacie i powiadom mnie dźwiękiem gdy ta liczba wzrośnie."></br>\
<input onclick="localStorage.countnick=1;location.reload();" id="count1" class="cp_btn" type="button" value="TAK"></input><input onclick="localStorage.countnick=0;location.reload();" id="count2" class="cp_btn" type="button" value="NIE"></input>\
</div>\
</br></br>\
\
<h1 id="cp_title">Dostosowanie motywu</h1>\
<input id="przelacz1" type="button" value="Pokaż" class="spoiller"></input>\
<div id="motywy_handler" style="border:1px solid grey;padding:5px;">\
<input id="custtloact" type="text" disabled></input>\
<input id="custtlo" placeholder="Własne tło forum" type="text" style="width:210px;"></input>\
<input onclick="localStorage.tlourl = tlourl.value;location.reload();" style="padding:1px 3px;" type="button" value="Ustaw"></input><img style="width:12px;height:12px;"src="http://i.imgur.com/gfERloT.png" title="Zmień tło forum, wstawiając bezpośredni link do obrazka w polu poniżej i klikając Ustaw. Ustaw z pustym polem by powrócić oryginalne."></br>\
<input onclick="localStorage.tlofix=0;location.reload();" style="padding:1px 3px;" type="button" value="Powielaj tło"></input>\
<input onclick="localStorage.tlofix=1;location.reload();" style="padding:1px 3px;" type="button" value="Rozciągaj tło"></input>\
 <img style="width:12px;height:12px;"src="http://i.imgur.com/gfERloT.png" title="Powielanie/rozciąganie działa tylko gdy wybrane jest własne tło. Te opcje wpływają na tła profilowe."></br>\
\
<input id="custlogo" class="txturl" placeholder="Własne logo forum" type="text" style="width:210px;"></input>\
<input onclick="localStorage.logo = logourl.value;location.reload();" style="padding:1px 3px;" type="button" value="Ustaw"></input><img style="width:12px;height:12px;"src="http://i.imgur.com/gfERloT.png" title="Zmień logo forum, wstawiając bezpośredni link do obrazka w polu poniżej i klikając Ustaw. Ustaw z pustym polem by powrócić oryginalne."></br>\
\
<input id="custmaintitle" class="txturl" placeholder="Własna grafika tła nazwy działów" type="text" style="width:210px;"></input>\
<input onclick="localStorage.maintitle = maintitleurl.value;location.reload();" style="padding:1px 3px;" type="button" value="Ustaw"></input><img style="width:12px;height:12px;"src="http://i.imgur.com/gfERloT.png" title="Zmień logo forum, wstawiając bezpośredni link do obrazka w polu poniżej i klikając Ustaw. Ustaw z pustym polem by powrócić oryginalne."></br>\
\
<input id="custcadence" class="txturl" placeholder="Własna grafika tła paska zakładek" type="text" style="width:210px;"></input>\
<input onclick="localStorage.cadence = cadenceurl.value;location.reload();" style="padding:1px 3px;" type="button" value="Ustaw"></input><img style="width:12px;height:12px;"src="http://i.imgur.com/gfERloT.png" title="Zmień tło paska zakładek forum, wstawiając bezpośredni link do obrazka w polu poniżej i klikając Ustaw. Ustaw z pustym polem by powrócić oryginalne."></br>\
\
<input id="custikona" class="txturl" placeholder="Własna grafika ikon działów" type="text" style="width:210px;"></input>\
<input onclick="localStorage.ikona = ikonaurl.value;location.reload();" style="padding:1px 3px;" type="button" value="Ustaw"></input><img style="width:12px;height:12px;"src="http://i.imgur.com/gfERloT.png" title="Zmień obrazek ikon działów forum, wstawiając bezpośredni link do obrazka w polu poniżej i klikając Ustaw. Ustaw z pustym polem by powrócić oryginalne."></br>\
\
<input id="custavatar" class="txturl" placeholder="Własna grafika defaultowych awatarów" type="text" style="width:210px;"></input>\
<input onclick="localStorage.avatar = avatarurl.value;location.reload();" style="padding:1px 3px;" type="button" value="Ustaw"></input><img style="width:12px;height:12px;"src="http://i.imgur.com/gfERloT.png" title="Zmień podstawowy avatar użytkowników bez avatara, wstawiając bezpośredni link do obrazka w polu poniżej i klikając Ustaw. Ustaw z pustym polem by powrócić oryginalne."></br>\
\
</br>Przeźroczysty pasek <img style="width:12px;height:12px;"src="http://i.imgur.com/gfERloT.png" title="Ustal czy górny pasek ma być przeźroczysty i ciągle podążać za górą okna."></br>\
<input onclick="localStorage.pasek=1;location.reload();" id="pasek1" class="cp_btn" type="button" value="TAK"></input>\
<input onclick="localStorage.pasek=0;location.reload();" id="pasek2" class="cp_btn" type="button" value="NIE"></input>\
</br></br>Przeźroczyste tło contentu <img style="width:12px;height:12px;"src="http://i.imgur.com/gfERloT.png" title="Ustal czy ciało forum(content o biąłym tle) ma być przeźroczysty."></br>\
<input onclick="localStorage.content=1;location.reload();" id="content1" class="cp_btn" type="button" value="TAK"></input>\
<input onclick="localStorage.content=0;location.reload();" id="content2" class="cp_btn" type="button" value="NIE"></input>\
</div>\
</div>\
\
<div id="cp_footer">Skrypt by Cadence</div>';
msg("[CraftPanel] Stworzono panel")
cp_emot_tak = document.getElementById("emot1");
cp_emot_nie = document.getElementById("emot2");
cp_count_tak = document.getElementById("count1");
cp_count_nie = document.getElementById("count2");
cp_pasek_tak = document.getElementById("pasek1");
cp_pasek_nie = document.getElementById("pasek2");

tlourl = document.getElementById("custtlo");
logourl = document.getElementById("custlogo");
maintitleurl = document.getElementById("custmaintitle");
cadenceurl = document.getElementById("custcadence");
ikonaurl = document.getElementById("custikona");
avatarurl = document.getElementById("custavatar");

cp_ipbody = document.getElementById("ipboard_body");
cp_iphtml = document.getElementsByTagName("html")[0];

cp_notatnik = document.getElementById("notatnik");
cp_ulubione = document.getElementById("ulubione");

cp_notatnik.style.display="none";
cp_ulubione.style.display="none";
/*
cp_button
cp_panel

cp_emot_tak
cp_emot_nie

cp_count_tak
cp_count_nie

cp_pasek_tak
cp_pasek_nie

tlourl

cp_ipbody
cp_iphtml

cp_notatnik
*/
/*########################################################*/
/*###################### PRZYGOTUJ #######################*/

var cp_button_open=0;
if(localStorage.getItem("emotki") === null) {localStorage.emotki = 1;msg("[CraftPanel] ZMIENNA emotki PUSTA - przygotowano")}
if(localStorage.getItem("tlourl") === null) {localStorage.tlourl = 0;msg("[CraftPanel] ZMIENNA tlourl PUSTA - przygotowano")}
if(localStorage.getItem("tlofix") === null) {localStorage.tlofix = 0;msg("[CraftPanel] ZMIENNA tlofix PUSTA - przygotowano")}
if(localStorage.getItem("countnick") === null) {localStorage.countnick = 0;msg("[CraftPanel] ZMIENNA countnick PUSTA - przygotowano")}
if(localStorage.getItem("pasek") === null) {localStorage.pasek = 0;msg("[CraftPanel] ZMIENNA pasek PUSTA - przygotowano")}
if(localStorage.getItem("notatka") === null) {localStorage.notatka = "Brak notatek";msg("[CraftPanel] ZMIENNA notatka PUSTA - przygotowano")}
if(localStorage.getItem("saved") === null) {localStorage.saved = "Nigdy nie zapisywano";msg("[CraftPanel] ZMIENNA saved PUSTA - przygotowano")}
if(localStorage.getItem("logo") === null) {localStorage.logo = 0;msg("[CraftPanel] ZMIENNA logo PUSTA - przygotowano")}
if(localStorage.getItem("maintitle") === null) {localStorage.maintitle = 0;msg("[CraftPanel] ZMIENNA maintitle PUSTA - przygotowano")}
if(localStorage.getItem("cadence") === null) {localStorage.cadence = 0;msg("[CraftPanel] ZMIENNA cadence PUSTA - przygotowano")}
if(localStorage.getItem("ikona") === null) {localStorage.ikona = 0;msg("[CraftPanel] ZMIENNA ikona PUSTA - przygotowano")}
if(localStorage.getItem("content") === null) {localStorage.content = 0;msg("[CraftPanel] ZMIENNA content PUSTA - przygotowano")}
if(localStorage.getItem("avatar") === null) {localStorage.avatar = 0;msg("[CraftPanel] ZMIENNA avatar PUSTA - przygotowano")}

document.getElementById("notatka_data").innerHTML=localStorage.saved;
document.getElementById("notatka").innerHTML=localStorage.notatka;

if(localStorage.getItem("fav1") === null) {localStorage.fav1 = 0;msg("[CraftPanel] ZMIENNA fav1 PUSTA - przygotowano")}
if(localStorage.getItem("fav2") === null) {localStorage.fav2 = 0;msg("[CraftPanel] ZMIENNA fav2 PUSTA - przygotowano")}
if(localStorage.getItem("fav3") === null) {localStorage.fav3 = 0;msg("[CraftPanel] ZMIENNA fav3 PUSTA - przygotowano")}
if(localStorage.getItem("fav4") === null) {localStorage.fav4 = 0;msg("[CraftPanel] ZMIENNA fav4 PUSTA - przygotowano")}
if(localStorage.getItem("fav5") === null) {localStorage.fav5 = 0;msg("[CraftPanel] ZMIENNA fav5 PUSTA - przygotowano")}
document.getElementById("fav1").value = localStorage.fav1;
document.getElementById("fav2").value = localStorage.fav2;
document.getElementById("fav3").value = localStorage.fav3;
document.getElementById("fav4").value = localStorage.fav4;
document.getElementById("fav5").value = localStorage.fav5;

msg("[CraftPanel] Przygotowano zmienne")

if(localStorage.emotki == 1){cp_emot_nie.setAttribute("class", "cp_btn_active");}
else if(localStorage.emotki == 0){func_emotki();cp_emot_tak.setAttribute("class", "cp_btn_active");}
    
if(localStorage.content == 1){document.getElementById("content").style.background="rgba(256,256,256,0.5)";document.getElementById("content1").setAttribute("class", "cp_btn_active");}
else if(localStorage.emotki == 0){document.getElementById("content2").setAttribute("class", "cp_btn_active");}
    
if(localStorage.logo == 0){}
else if(localStorage.logo != 0){document.getElementById("logo").getElementsByTagName("img")[0].src=localStorage.logo;}
    
if(localStorage.maintitle == 0){}
else if(localStorage.maintitle != 0){
    if(document.contains(document.getElementById("categories"))== true){
    document.getElementsByClassName("maintitle")[0].style.background="url("+localStorage.maintitle+")";
	document.getElementsByClassName("maintitle")[1].style.background="url("+localStorage.maintitle+")";
    document.getElementsByClassName("maintitle")[2].style.background="url("+localStorage.maintitle+")";
    document.getElementsByClassName("maintitle")[3].style.background="url("+localStorage.maintitle+")";
    document.getElementsByClassName("maintitle")[4].style.background="url("+localStorage.maintitle+")";
    document.getElementsByClassName("maintitle")[5].style.background="url("+localStorage.maintitle+")";
    document.getElementsByClassName("maintitle")[6].style.background="url("+localStorage.maintitle+")";
    document.getElementsByClassName("maintitle")[7].style.background="url("+localStorage.maintitle+")";
    }
    else if(document.contains(document.getElementsByClassName("maintitle")[1])){document.getElementsByClassName("maintitle")[0].style.background="url("+localStorage.maintitle+")";document.getElementsByClassName("maintitle")[1].style.background="url("+localStorage.maintitle+")";}
    else if(document.contains(document.getElementsByClassName("maintitle")[0])){document.getElementsByClassName("maintitle")[0].style.background="url("+localStorage.maintitle+")";}
    }
    
if(localStorage.ikona == 0){}
else if(localStorage.ikona != 0){
	var imgs = document.getElementsByTagName('img');        
	for (var i = imgs.length - 1; i >= 0; i--) {
    if (imgs[i].src.indexOf('http://craftsite.pl/forum/public/style_images/master/f_icon.png') > -1) {  
    imgs[i].src=localStorage.ikona;imgs[i].style.maxWidth="50px";imgs[i].style.maxHeight="50px";
    }}
	for (var i = imgs.length - 1; i >= 0; i--) {
    if (imgs[i].src.indexOf('http://craftsite.pl/forum/public/style_images/master/f_icon_read.png') > -1) {  
    imgs[i].src=localStorage.ikona;imgs[i].style.maxWidth="50px";imgs[i].style.maxHeight="50px";imgs[i].style.opacity="0.4";
    }}
}
    
if(localStorage.avatar == 0){}
else if(localStorage.avatar != 0){
	var imgs = document.getElementsByTagName('img');        
	for (var i = imgs.length - 1; i >= 0; i--) {
    if (imgs[i].src.indexOf('http://craftsite.pl/forum/public/style_images/master/profile/default_large.png') > -1) {  
    imgs[i].src=localStorage.avatar;
    }}
}


    
if(localStorage.cadence == 0){}
else if(localStorage.cadence != 0){document.getElementById("cadence").setAttribute('style', "background:url("+localStorage.cadence+")!important;");}
    
if(localStorage.tlourl == 0){document.getElementById("custtloact").style.display="none";}
else if(localStorage.tlourl != 0){cp_ipbody.style.background='url('+localStorage.tlourl+')';cp_iphtml.style.background='url('+localStorage.tlourl+')';document.getElementById("custtloact").value=localStorage.tlourl;}
    
if(localStorage.tlofix == 0){}
else if(localStorage.tlofix == 1){cp_ipbody.style.backgroundRepeat='no-repeat';cp_iphtml.style.backgroundRepeat='no-repeat';cp_ipbody.style.backgroundSize='cover';cp_iphtml.style.backgroundSize='cover';cp_ipbody.style.backgroundAttachment='fixed';cp_iphtml.style.backgroundAttachment='fixed';}    

if(localStorage.countnick == 0){cp_count_nie.setAttribute("class", "cp_btn_active");}
else if(localStorage.countnick == 1){nickcount();cp_count_tak.setAttribute("class", "cp_btn_active");}
    
    
var elem = document.querySelector('[data-tid="'+localStorage.fav1+'"]');
if(document.contains(elem)==true){elem.style.background="#fcfac7"};
var elem = document.querySelector('[data-tid="'+localStorage.fav2+'"]');
if(document.contains(elem)==true){elem.style.background="#fcfac7"};
var elem = document.querySelector('[data-tid="'+localStorage.fav3+'"]');
if(document.contains(elem)==true){elem.style.background="#fcfac7"};
var elem = document.querySelector('[data-tid="'+localStorage.fav4+'"]');
if(document.contains(elem)==true){elem.style.background="#fcfac7"};
var elem = document.querySelector('[data-tid="'+localStorage.fav5+'"]');
if(document.contains(elem)==true){elem.style.background="#fcfac7"};

if(localStorage.pasek == 0){cp_pasek_nie.setAttribute("class", "cp_btn_active");}
else if(localStorage.pasek == 1){
cp_pasek_tak.setAttribute("class", "cp_btn_active");
var css = '\
a[title="Zobacz aktywne raporty"]{color:orange!important;}\
#header_bar.clearfix{\
    background: none!important;\
    padding: 0px 10px 10px 10px;\
    text-align: right;\
    position: fixed!important;\
    width: 200px!important;\
    z-index: 99999!important;\
    float:right!important;\
    width:100%!important;\
}\
#user_navigation ul.ipsList_inline.right {\
    background-color: rgba(50, 50, 50, 0.2)!important;\
    border-radius: 4px!important;\
    padding-right: 12px!important;\
    float:right!important;\
    margin-right:0%!important;\
    transition: background 0.2s, box-shadow 0.2s;\
    -webkit-transition: background 0.2s, box-shadow 0.2s;\
}\
#user_navigation ul.ipsList_inline.right:hover {\
    background-color: rgba(50, 50, 50, 0.8)!important;\
    border-radius: 4px!important;\
    padding-right: 12px!important;\
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 1)!important;\
}\
#branding {\
    padding-top: 40px!important;\
}\
#admin_bar{\
    background-color: rgba(50, 50, 50, 0.2)!important;\
    border-radius: 4px!important;\
    padding-left:7px!important;\
    padding-right:7px!important;\
    transition: background 0.2s, box-shadow 0.2s;\
    -webkit-transition: background 0.2s, box-shadow 0.2s;\
}\
#admin_bar li a{\
 color:#ffffff!important;\
 opacity:0.9;\
}\
#admin_bar:hover{\
    background-color: rgba(50, 50, 50, 0.8)!important;\
    border-radius: 4px!important;\
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 1)!important;\
}\
#user_inbox_link_menucontent, #cpanel, #user_notifications_link_menucontent, #user_link_menucontent{opacity:0.97!important;}\
#inbox_link, #notify_link, #craftpanel{\
border-radius:4px!important;}',
head = document.getElementsByTagName('head')[0],
style = document.createElement('style');
style.type = 'text/css';
if (style.styleSheet){
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}
head.appendChild(style);
}

msg("[CraftPanel] Uruchomiono dane funkcje")
    
    
/*########################################################*/
/*####################### FUNCKJE ########################*/

cp_button.onclick = function(){
    if(cp_button_open==0){cp_button_open=1;cp_panel.style.display="block";}
    else if(cp_button_open==1){cp_button_open=0;cp_panel.style.display="none";}
};


document.getElementById("zapiszulubione").onclick = function(){
	localStorage.fav1 = document.getElementById("fav1").value;
    localStorage.fav2 = document.getElementById("fav2").value;
    localStorage.fav3 = document.getElementById("fav3").value;
    localStorage.fav4 = document.getElementById("fav4").value;
    localStorage.fav5 = document.getElementById("fav5").value;
    location.reload();
};

var handler1 = 1;
document.getElementById("motywy_handler").style.display='none';
document.getElementById("przelacz1").onclick = function(){
    if(handler1 == 0){document.getElementById("motywy_handler").style.display='none';handler1 = 1;document.getElementById("przelacz1").value="Pokaż";}
    else if(handler1 == 1){document.getElementById("motywy_handler").style.display='block';handler1 = 0;document.getElementById("przelacz1").value="Ukryj";}
};
var handler2 = 1;
document.getElementById("funkcje_handler").style.display='none';
document.getElementById("przelacz2").onclick = function(){
    if(handler2 == 0){document.getElementById("funkcje_handler").style.display='none';handler2 = 1;document.getElementById("przelacz2").value="Pokaż";}
    else if(handler2 == 1){document.getElementById("funkcje_handler").style.display='block';handler2 = 0;document.getElementById("przelacz2").value="Ukryj";}
};

document.getElementById("akcjaulubione").onclick = function(){
cp_ulubione.style.display='block';
cp_notatnik.style.display='none';
};
document.getElementById("ulubione_close").onclick = function(){
cp_ulubione.style.display='none';
};
document.getElementById("akcjanotatnik").onclick = function(){
cp_notatnik.style.display='block';
cp_ulubione.style.display='none';
};
document.getElementById("notatnik_close").onclick = function(){
cp_notatnik.style.display='none';
};
document.getElementById("notatka_save").onclick = function(){
localStorage.notatka = document.getElementById("notatka").value;
dateObj = new Date();
var month = dateObj.getUTCMonth();
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
var seconds = dateObj.getSeconds();
var minutes = dateObj.getMinutes();
var hour = dateObj.getHours();
month++;
newdate = "Zapisano: " +year + "/" + month + "/" + day + " " + hour + ":" + minutes + "." + seconds;
localStorage.saved = newdate;
document.getElementById("notatka_data").innerHTML=localStorage.saved;
};


function nickcount(){
if(document.contains(document.getElementsByClassName("ipb_table shoutbox_table")[0])== true){
if(localStorage.getItem("cnt2") === null) {localStorage.cnt2 = 0;msg("[CraftPanel] ZMIENNA cnt2 PUSTA - przygotowano")}
nickcount2=localStorage.cnt2;
setTimeout(function(){msg("[CraftPanel] Czat wykryty! Sprawdzanie wywołań czatu:")},100)

window.setInterval(function () {var elems = document.getElementsByClassName('shoutbox_text'),
    n = 0;
for(var i=0; i<elems.length; i++){
  var text = elems[i].innerHTML;
  n += (text.match(ipb.shoutbox.member_name) || []).length;  
}
nickcount1=n;
bleb="[CraftPanel] Sprawdzanie:";
console.log(bleb, nickcount1, nickcount2)
if(nickcount1>nickcount2){audio()}
                               
nickcount2=nickcount1;
localStorage.cnt2=nickcount1;},750)

}}

function audio() {
var audio=document.getElementById("audio"); 
audio.play();
}

/*########################################################*/
/*########################################################*/
/*########################################################*/

function func_emotki(){
window.setInterval(function () {
var imgs = document.getElementsByTagName('img');        
for (var i = imgs.length - 1; i >= 0; i--) {
    if (imgs[i].src.indexOf('http://craftsite.pl/forum/public/style_emoticons/default/creeper.png') > -1) {
      var textNode = document.createElement('span');
      textNode.innerHTML = ':F';    
      imgs[i].parentNode.replaceChild(textNode, imgs[i]);     
    }

    if (imgs[i].src.indexOf('http://craftsite.pl/forum/public/style_emoticons/default/sheep.png') > -1) {
      var textNode = document.createElement('span');
      textNode.innerHTML = '._.';    
      imgs[i].parentNode.replaceChild(textNode, imgs[i]);     
    }

    if (imgs[i].src.indexOf('http://craftsite.pl/forum/public/style_emoticons/default/ghast.png') > -1) {
      var textNode = document.createElement('span');
      textNode.innerHTML = ';_;';    
      imgs[i].parentNode.replaceChild(textNode, imgs[i]);     
    }

    if (imgs[i].src.indexOf('http://craftsite.pl/forum/public/style_emoticons/default/cow.png') > -1) {
      var textNode = document.createElement('span');
      textNode.innerHTML = '-.-';    
      imgs[i].parentNode.replaceChild(textNode, imgs[i]);     
    }

    if (imgs[i].src.indexOf('http://craftsite.pl/forum/public/style_emoticons/default/wither.png') > -1) {
      var textNode = document.createElement('span');
      textNode.innerHTML = '-_-';    
      imgs[i].parentNode.replaceChild(textNode, imgs[i]);     
    }

    if (imgs[i].src.indexOf('http://craftsite.pl/forum/public/style_emoticons/default/chlitto.png') > -1) {
      var textNode = document.createElement('span');
      textNode.innerHTML = ':|';    
      imgs[i].parentNode.replaceChild(textNode, imgs[i]);     
    }
	
    if (imgs[i].src.indexOf('http://craftsite.pl/forum/public/style_emoticons/default/creeper.png') > -1) {
      var textNode = document.createElement('span');
      textNode.innerHTML = ':F';    
      imgs[i].parentNode.replaceChild(textNode, imgs[i]);     
    }

    if (imgs[i].src.indexOf('http://craftsite.pl/forum/public/style_emoticons/default/chicken.png') > -1) {
      var textNode = document.createElement('span');
      textNode.innerHTML = ':v';    
      imgs[i].parentNode.replaceChild(textNode, imgs[i]);     
    }

    if (imgs[i].src.indexOf('http://craftsite.pl/forum/public/style_emoticons/default/p4-wub.png') > -1) {
      var textNode = document.createElement('span');
      textNode.innerHTML = ':3';    
      imgs[i].parentNode.replaceChild(textNode, imgs[i]);     
    }

    if (imgs[i].src.indexOf('http://craftsite.pl/forum/public/style_emoticons/default/cat.png') > -1) {
      var textNode = document.createElement('span');
      textNode.innerHTML = '.-.';    
      imgs[i].parentNode.replaceChild(textNode, imgs[i]);     
    }

    if (imgs[i].src.indexOf('http://craftsite.pl/forum/public/style_emoticons/default/p4-biggrin.png') > -1) {
      var textNode = document.createElement('span');
      textNode.innerHTML = ':D';    
      imgs[i].parentNode.replaceChild(textNode, imgs[i]);     
    }

    if (imgs[i].src.indexOf('http://craftsite.pl/forum/public/style_emoticons/default/p4-smile.png') > -1) {
      var textNode = document.createElement('span');
      textNode.innerHTML = ':)';    
      imgs[i].parentNode.replaceChild(textNode, imgs[i]);     
    }

    if (imgs[i].src.indexOf('http://craftsite.pl/forum/public/style_emoticons/default/p4-ohmy.png') > -1) {
      var textNode = document.createElement('span');
      textNode.innerHTML = ':o';    
      imgs[i].parentNode.replaceChild(textNode, imgs[i]);     
    }

    if (imgs[i].src.indexOf('http://craftsite.pl/forum/public/style_emoticons/default/p4-tongue.png') > -1) {
      var textNode = document.createElement('span');
      textNode.innerHTML = ':P';    
      imgs[i].parentNode.replaceChild(textNode, imgs[i]);     
    }

    if (imgs[i].src.indexOf('http://craftsite.pl/forum/public/style_emoticons/default/p4-wink.png') > -1) {
      var textNode = document.createElement('span');
      textNode.innerHTML = ';)';    
      imgs[i].parentNode.replaceChild(textNode, imgs[i]);     
    }

    if (imgs[i].src.indexOf('http://craftsite.pl/forum/public/style_emoticons/default/p4-dry.png') > -1) {
      var textNode = document.createElement('span');
      textNode.innerHTML = '<_<';    
      imgs[i].parentNode.replaceChild(textNode, imgs[i]);     
    }

    if (imgs[i].src.indexOf('http://craftsite.pl/forum/public/style_emoticons/default/p4-happy.png') > -1) {
      var textNode = document.createElement('span');
      textNode.innerHTML = '^_^';    
      imgs[i].parentNode.replaceChild(textNode, imgs[i]);     
    }

    if (imgs[i].src.indexOf('http://craftsite.pl/forum/public/style_emoticons/default/p4-happy.png') > -1) {
      var textNode = document.createElement('span');
      textNode.innerHTML = '^_^';    
      imgs[i].parentNode.replaceChild(textNode, imgs[i]);     
    }

    if (imgs[i].src.indexOf('http://craftsite.pl/forum/public/style_emoticons/default/p4-ph34r.png') > -1) {
      var textNode = document.createElement('span');
      textNode.innerHTML = ':>';    
      imgs[i].parentNode.replaceChild(textNode, imgs[i]);     
    }

    if (imgs[i].src.indexOf('http://craftsite.pl/forum/public/style_emoticons/default/p4-unsure.png') > -1) {
      var textNode = document.createElement('span');
      textNode.innerHTML = ':?';    
      imgs[i].parentNode.replaceChild(textNode, imgs[i]);     
    }

    if (imgs[i].src.indexOf('http://craftsite.pl/forum/public/style_emoticons/default/p4-wacko.png') > -1) {
      var textNode = document.createElement('span');
      textNode.innerHTML = ';s';    
      imgs[i].parentNode.replaceChild(textNode, imgs[i]);     
    }

    if (imgs[i].src.indexOf('http://craftsite.pl/forum/public/style_emoticons/default/p4-sad.png') > -1) {
      var textNode = document.createElement('span');
      textNode.innerHTML = ':(';    
      imgs[i].parentNode.replaceChild(textNode, imgs[i]);     
    }

    if (imgs[i].src.indexOf('http://craftsite.pl/forum/public/style_emoticons/default/enderman.png') > -1) {
      var textNode = document.createElement('span');
      textNode.innerHTML = '_._';
      imgs[i].parentNode.replaceChild(textNode, imgs[i]);     
    }

    if (imgs[i].src.indexOf('http://craftsite.pl/forum/public/style_emoticons/default/snowgolem.png') > -1) {
      var textNode = document.createElement('span');
      textNode.innerHTML = ':E';
      imgs[i].parentNode.replaceChild(textNode, imgs[i]);     
    }

    if (imgs[i].src.indexOf('http://craftsite.pl/forum/public/style_emoticons/default/mooshroomcow.png') > -1) {
      var textNode = document.createElement('span');
      textNode.innerHTML = '--.--';
      imgs[i].parentNode.replaceChild(textNode, imgs[i]);     
    }

    if (imgs[i].src.indexOf('http://craftsite.pl/forum/public/style_emoticons/default/pig.png') > -1) {
      var textNode = document.createElement('span');
      textNode.innerHTML = '-..-';
      imgs[i].parentNode.replaceChild(textNode, imgs[i]);     
    }

    if (imgs[i].src.indexOf('http://craftsite.pl/forum/public/style_emoticons/default/p4-buzi.png') > -1) {
      var textNode = document.createElement('span');
      textNode.innerHTML = ':*';
      imgs[i].parentNode.replaceChild(textNode, imgs[i]);     
    }

    if (imgs[i].src.indexOf('http://craftsite.pl/forum/public/style_emoticons/default/p4-niefajnie.png') > -1) {
      var textNode = document.createElement('span');
      textNode.innerHTML = ';(';
      imgs[i].parentNode.replaceChild(textNode, imgs[i]);     
    }

    if (imgs[i].src.indexOf('http://craftsite.pl/forum/public/style_emoticons/default/p4-=F.png') > -1) {
      var textNode = document.createElement('span');
      textNode.innerHTML = '=F';
      imgs[i].parentNode.replaceChild(textNode, imgs[i]);     
    }

    if (imgs[i].src.indexOf('http://craftsite.pl/forum/public/style_emoticons/default/p4-g.png') > -1) {
      var textNode = document.createElement('span');
      textNode.innerHTML = ':G';
      imgs[i].parentNode.replaceChild(textNode, imgs[i]);     
    }

    if (imgs[i].src.indexOf('http://craftsite.pl/forum/public/style_emoticons/default/p4-o,o.png') > -1) {
      var textNode = document.createElement('span');
      textNode.innerHTML = 'o.o';
      imgs[i].parentNode.replaceChild(textNode, imgs[i]);     
    }
}
}, 500);}