// ==UserScript==
// @name :v
// @namespace -.-
// @author Public Domain!
// @description Auto Move and battle on pokemon-vortex.com
// @homepage http://userscripts.org/scripts/show/156315
// @include http://*.pokemon-vortex.com/map.php?map=*
// @include http://*.pokemon-vortex.com/wildbattle.php*
// @include http://*.pokemon-vortex.com/battle_select.php?type=member*
// @include http://*.pokemon-vortex.com/battle.php*
// @exclude http://*.pokemon-vortex.com/adv.php*
// @require http://code.jquery.com/jquery-1.8.3.js
// @run-at document-end
// @grant GM_getValue
// @grant GM_setValue
// @version 2.0.0
// @licence Public Domain!
// ==/UserScript==
 (function() {
//buttons some times show up in the ads located in an iframe
//dont run in a frame
if(unsafeWindow.self!=unsafeWindow.top) return(false);
var dlh=document.location.href.toString();
if(dlh.indexOf('battle.php?sidequest=')!=-1) return(false); 

var NewMapAfterBattles=50;
var tbattles=GM_getValue('tbattles',0)
var StartTime=pageLoad=Date.now();
var battleId=2998213;

var PokemonList=[];
var win;

//how long to wait for the loading image before checking again for it
//you can make it 100 but you will beat up the server and once they notice the server take a beating i guarantee this will stop working!
//they already have a warning for battling to much to fast, the 'dont be greedy' warning. TAKE NOTICE!
var playerBattleTimeout=100;


var pm=GM_getValue('pm_list',0);
var timeOuts={
battleButton:0,
moveAround:0,
session:0,
battleLoop:0 
}
if(dlh.indexOf('battle_select.php?type=member')!=-1){
setTimeout(bMember,2000);
return(false);
}

if(dlh.indexOf('/battle.php?bid=')!=-1){
GM_setValue('new_session',true)
if(pm>5) pm=0;
GM_setValue('pm_list',pm+1);
setTimeout(function(){
battlePlayer();
},1000);
return(false);
}
function bMember(){
setTimeout(function(){
document.location.href='http://'+getServerName()+'.pokemon-vortex.com/battle.php?bid='+battleId;
},1000)
}


function battlePlayer(){
clearTimeout(timeOuts.battleLoop);
var iloading=isLoading();

if(iloading==true){
timeOuts.battleLoop=setTimeout(battlePlayer,playerBattleTimeout);//rndFrom(2000,3000));
return(false);
}
if($('div#ajax > form > h3:eq(0)').html()=='Select your next Pok'+String.fromCharCode(233)+'mon to battle:'){
//the first screen
bPlayer();//since it's an ajax call, set the loop to start again 
var pm=GM_getValue('pm_list',0);
if(pm>5) pm=0;
pm=0;// set to which of your 6 pokemon to use (0-5)
//GM_setValue('pm_list',pm+1); //if you uncomment, it will use one new pokemon for each battle.
$('td#y_p > table > tbody > tr > td > input')[pm].checked=true;
$('div#ajax > form').submit();
return(false);
}

try{
if($('div#ajax > form:eq(1) > h2').html().toString().toLowerCase().indexOf('select an attack')!=-1){
//second screen and if your pokemon did not win with the first attack
bPlayer();
$('#attack1').attr('checked', true);
//$('#attack'+rndFrom(1,4)).attr('checked', true);
$('div#ajax > form:eq(1)').submit();
return(false);
} 
}catch(e){}

if($('div#ajax > form > h2').html().toString().toLowerCase().indexOf('you won the battle')!=-1){
//you won, battle is over
setTimeout(function(){
GM_log('PageLoadElapsedTime = '+(Date.now()-pageLoad) +' @ '+ctime(Date.now()))
GM_setValue('new_session',true)
document.location.reload();
//document.location.href='http://sigma.pokemon-vortex.com/battle_select.php?type=member'
},10)

return(false);
}
if($('div#ajax > form > h2').html().toString().toLowerCase().indexOf('you lost the battle')!=-1){
//you lost, battle is over
return(false);
} 



bPlayer();
}

function bPlayer(){
//new_session is watched by the parent window. if this page hangs, 
//the parent window will never see it and attempt to reload the child window.
GM_setValue('new_session',true)
timeOuts.battleLoop=setTimeout(battlePlayer,playerBattleTimeout);
}
if(window.name!='pbattle') {
//because it has a name, they can check if a name exist, and if so, they could just log you out.
//switch to just battle on the map.
//win=window.open('http://'+getServerName()+'.pokemon-vortex.com/map.php?map='+rndFrom(1,25),'pbattle');
win=window.open('http://'+getServerName()+'.pokemon-vortex.com/battle.php?bid='+battleId,'pbattle');


$('div#scrollContent').html('<b>Leave this window open, <br>it administrates the session timeout and window loading errors of the new window</b>'.toUpperCase());
windowsessionTimeout();
return(false);
}

function windowsessionTimeout(){
clearTimeout(timeOuts.session);
if(GM_getValue('new_session',false)==true){
GM_setValue('new_session',false)
StartTime=Date.now();
}
GM_log('Session ElapsedTime='+(Date.now()-StartTime))
var windlh=win.document.location.href.toString();

if(parseFloat(StartTime+50000)<Date.now()) {
GM_setValue('new_session',false);
StartTime=Date.now();
if(windlh.indexOf('/battle.php?bid=')!=-1){
win.location.href='http://'+getServerName()+'.pokemon-vortex.com/battle.php?bid='+battleID;
}else{
win.location.href='http://'+getServerName()+'.pokemon-vortex.com/map.php?map='+rndFrom(1,25);
}
}
timeOuts.session=setTimeout(windowsessionTimeout,2000);
}
GM_setValue('new_session',true)
if(tbattles>NewMapAfterBattles){
GM_setValue('tbattles',0)
newMap();
return(false);
}
$(window).unload(function() {
clearTimeout(timeOuts.session);
clearTimeout(timeOuts.battleButton)
clearTimeout(timeOuts.moveAround);
clearTimeout(timeOuts.battleLoop);
}); 
var direction={
moves:0,
randDir:0, //0=up 1=upright 2=right 3=downright 4=down 5=downleft 6=left 7=leftup
up:function(){
if(!$("img[src*='arrowupno.gif']").length > 0){
$("img[src*='arrowup.gif']").click();
return(true);
}
direction.setDir();
return(false);
},
upright:function(){
if(!$("img[src*='arrowrightupno.gif']").length > 0){
$("img[src*='arrowrightup.gif']").click();
return(true);
}
direction.setDir();
return(false);
},
right:function(){
if(!$("img[src*='arrowrightno.gif']").length > 0){
$("img[src*='arrowright.gif']").click();
return(true);
}
direction.setDir();
return(false);
},
downright:function(){
if(!$("img[src*='arrowrightdownno.gif']").length > 0){
$("img[src*='arrowrightdown.gif']").click();
return(true);
}
direction.setDir();
return(false);
},
down:function(){
if(!$("img[src*='arrowdownno.gif']").length > 0){
$("img[src*='arrowdown.gif']").click();
return(true);
}
direction.setDir();
return(false);
},
downleft:function(){
if(!$("img[src*='arrowleftdownno.gif']").length > 0){
$("img[src*='arrowleftdown.gif']").click();
return(true);
}
direction.setDir();
return(false);
},
left:function(){
if(!$("img[src*='arrowleftno.gif']").length > 0){
$("img[src*='arrowleft.gif']").click();
return(true);
}
direction.setDir();
return(false);
},
leftup:function(){
if(!$("img[src*='arrowleftupno.gif']").length > 0){
$("img[src*='arrowleftup.gif']").click();
return(true);
}
direction.setDir();
return(false);
},
setDir:function(){
chooseDirection();
moveMe();
}
}

direction.setDir(); 
createButtons();
isWildBattle(true);
function chooseDirection(){
var t=0;
var up=!$("img[src*='arrowupno.gif']").length;
var upright=!$("img[src*='arrowrightupno.gif']").length;
var right=!$("img[src*='arrowrightno.gif']").length;
var downright=!$("img[src*='arrowrightdownno.gif']").length;
var down=!$("img[src*='arrowdownno.gif']").length;
var downleft=!$("img[src*='arrowleftdownno.gif']").length;
var left=!$("img[src*='arrowleftno.gif']").length;
var leftup=!$("img[src*='arrowleftupno.gif']").length;
var ad= new Array();
if(up) {ad[t]=0;t++;}
if(upright) {ad[t]=1;t++;}
if(right) {ad[t]=2;t++;}
if(downright) {ad[t]=3;t++;}
if(down) {ad[t]=4;t++;}
if(downleft) {ad[t]=5;t++;}
if(left) {ad[t]=6;t++;}
if(leftup) {ad[t]=7;t++;}
direction.randDir=ad[rndFrom(0,ad.length-1)];//choose from available directions only
GM_log('Directions:'+JSON.stringify(ad)+'- Dir set:'+direction.randDir);

}

function doBattleLoop(){
clearTimeout(timeOuts.battleLoop);

var iloading=isLoading();
if(iloading==true){
timeOuts.battleLoop=setTimeout(doBattleLoop,750);//rndFrom(2000,3000));
return(false);
}

if($('div#ajax > form#battleForm > div.errorMsg').length){
if($('div#ajax > form > div.errorMsg').html()!=undefined){
if($('div#ajax > form > div.errorMsg').html().toString().indexOf('It seems as though you have already completed this battle')!=-1){
newMap();
return(false);
}
}
}
if($('div#ajax > div.errorMsg').length){
if($('div#ajax > div.errorMsg').html()!=undefined){
if($('div#ajax > div.errorMsg').html().toString().indexOf('It seems as though you have already completed this battle')!=-1){
newMap();
return(false);
}
}
}

if($('div#ajax > form#battleForm > h2').html()=='Your Pok'+String.fromCharCode(233)+'mon Team:'.toString()){
setTimeout(function(){
$("form#battleForm").submit();
isWildBattle();
},150)
return(false);
}

if($('div#ajax > form#battleForm > h2').html()=='Choose an attack'){
$('#attack'+rndFrom(1,4)).attr('checked', true);
//$('#attack1').attr('checked', true);
isWildBattle();
$("form#battleForm").submit();
return(false);
}

if($('div#ajax > form#battleForm > h2').html()=='Attack results'){
isWildBattle();
$("form#battleForm").submit();
return(false);
}
if($('div#ajax > p:eq(1) > a:eq(0)').html()=='Return to the Map'){
clearTimeout(timeOuts.session);
setTimeout(function(){
GM_setValue('new_session',true)
$('div#ajax > p:eq(1) > a:eq(0)').get(0).click();
},6000)
return(false);
}
//when the 'You have already completed a battle within the last 10 seconds. This is in effect to prevent cheating of any kind.' error shows up
if($('div#ajax > p:eq(0) > a:eq(0)').html()=='Return to the Map'){
clearTimeout(timeOuts.session);
setTimeout(function(){
GM_setValue('new_session',true)
$('div#ajax > p:eq(0) > a:eq(0)').get(0).click();
},6000)
return(false);
}
}
function isLoading(){
var ml=$('div#mapLoading').length; //map
var bl=$('div#loading').length; //battle
if(bl!=0) {
bl=$('div#loading').css('visibility');
if(bl=='hidden'){
return(false);
}else{
return(true);
}
}
if(ml!=0) {
ml=$('div#mapLoading').css('visibility');
if(ml=='hidden'){
return(false);
}else{
return(true);
}
}

return(true);
} 
function isWildBattle(){
//checks for wildbattle.php
var enabled=GM_getValue('battle_enabled',false);
if(enabled){
if(dlh.indexOf('wildbattle')!=-1){
GM_setValue('new_session',true)
timeOuts.battleLoop=setTimeout(doBattleLoop,50);
}
}
}

function moveMe(){
clearTimeout(timeOuts.moveAround);
var en=GM_getValue('move_enabled',true)
if(en==false) {
clearTimeout(timeOuts.session);
return(false);
}
var t=250;
var iloading=isLoading;
if(iloading==true){
timeOuts.moveAround=setTimeout(moveMe,t);
return(false);
}

direction.moves++;
var lm=direction.randDir;
doMove();
if(lm!=direction.randDir) doMove();
if(direction.moves>100) {
//it has not found any pokemon to battle
clearTimeout(timeOuts.session);
clearTimeout(timeOuts.battleButton);
newMap();
return(false);
}
timeOuts.battleButton=setTimeout(findBattleBTN,t);
} 
function findBattleBTN(){
if(dlh.indexOf('wildbattle')!=-1) return(false);
var t=250;
clearTimeout(timeOuts.battleButton);
clearTimeout(timeOuts.moveAround);
var iloading=isLoading();

if(iloading==true){
timeOuts.battleButton=setTimeout(findBattleBTN,t);
return(false);
}

if($('div#pkmnappearomega > form > p > input:eq(1)').length){
//clearTimeout(timeOuts.session);
var h=$('div#pkmnappearomega > form').html().toLowerCase();
if((h.indexOf('unown')==-1)){
savePokemon();
var h=$('div#alert').html();
if(h.length>2) {
newMap();
return(false);
}
setTimeout(function(){
GM_setValue('new_session',true)
$('div#pkmnappearomega > form')[0].submit();
},500);
//timeOuts.moveAround=setTimeout(moveMe,175);
return(false);
}else{
timeOuts.moveAround=setTimeout(moveMe,t);
}

}else{
timeOuts.moveAround=setTimeout(moveMe,t);
}
}


function savePokemon(){
//dont save just return;
return;

var tbattles=GM_getValue('tbattles',0);
tbattles++;
GM_setValue('tbattles',tbattles);
var image=$('div#pkmnappearomega > form > center > img').attr('src');
var pokemon;
var st='';
if($('div#pkmnappearomega > form > center > p > img').length){
//when you own it, grab whats in the strong tag
st=' > strong'
}
pokemon=$('div#pkmnappearomega > form > center > p ' +st).html().replace(' appeared','').toString().trim();

var map=dlh.split('=');
map=map[1];
var p=new Object();
p.i=image.replace('http://static.pokemon-vortex.com/images/pokemon/','')
p.n=pokemon.trim();
p.m=map;
p.c=0;
var ls=GM_getValue('plist','[]')
try{
PokemonList=JSON.parse(ls);
}catch(e){}
if(!pexist(pokemon.trim())) {
PokemonList.push(p);
GM_setValue('plist',JSON.stringify(PokemonList));
}
GM_log(ctime(Date.now()) + ' = ' +PokemonList.length);
}

function doMove(){
if(direction.randDir==0) direction.up();
if(direction.randDir==1) direction.upright();
if(direction.randDir==2) direction.right();
if(direction.randDir==3) direction.downright();
if(direction.randDir==4) direction.down();
if(direction.randDir==5) direction.downleft();
if(direction.randDir==6) direction.left();
if(direction.randDir==7) direction.leftup(); 
} 
function createButtons(){

var enabled=GM_getValue('move_enabled',false);

var btn=document.createElement('input');
btn.value='Auto-move Enabled';
btn.id='DAFDS';
btn.type='button';
btn.style.cssText='position:fixed;top:5px;left:5px;';
if(!enabled) btn.value='Auto-move Disabled';

btn.addEventListener('click', function (e) {
var isenabled=GM_getValue('move_enabled',false);
if(!isenabled){
doEnableMove();
}else{
doDisableMove();
}

},false);

document.body.appendChild(btn);
if(enabled)doEnableMove();

enabled=GM_getValue('battle_enabled',false)
btn=document.createElement('input');
btn.value='Auto-battle Enabled'
btn.id='DDDDERE'
btn.type='button';
btn.style.cssText='position:fixed;top:35px;left:5px;';
if(!enabled) btn.value='Auto-battle Disabled';

btn.addEventListener('click', function (e) {
var isenabled=GM_getValue('battle_enabled',false);
if(!isenabled){
doEnableBattle(); 
}else{
doDisableBattle();
}

},false); 
document.body.appendChild(btn);
}

function sessionTimeout(){
clearTimeout(timeOuts.battleButton);
clearTimeout(timeOuts.moveAround);
clearTimeout(timeOuts.session);
if(dlh.indexOf('wildbattle.php')!=-1) return(false);
timeOuts.session=setTimeout(sessionTimeout,10000);
if(dlh.indexOf('wildbattle.php')==-1) timeOuts.battleButton=setTimeout(findBattleBTN,75);
}
function doDisableBattle(){
GM_setValue('battle_enabled',false);
$('#DDDDERE').attr('value','Auto-battle Disabled')
clearTimeout(timeOuts.battleLoop);
}
function doEnableBattle(){
GM_setValue('battle_enabled',true);
$('#DDDDERE').attr('value','Auto-battle Enabled')
if(dlh.indexOf('wildbattle')!=-1){
timeOuts.battleLoop=setTimeout(doBattleLoop,rndFrom(1000,1250))
}
}


function doDisableMove(){
GM_setValue('move_enabled',false);
clearTimeout(timeOuts.battleButton);
clearTimeout(timeOuts.moveAround);
clearTimeout(timeOuts.session);
$('#DAFDS').attr('value','Auto-move Disabled')
} 

function doEnableMove(){
StartTime=Date.now()
//sessionTimeout();

GM_setValue('move_enabled',true);
$('#DAFDS').attr('value','Auto-move Enabled')
if(dlh.indexOf('wildbattle.php')==-1) timeOuts.battleButton=setTimeout(findBattleBTN,75);
} 

function rndFrom(from,to){
return Math.floor(Math.random()*(to-from+1)+from);
}

function newMap(){
var map=dlh.split('=');
map=map[1];

var nmap=rndFrom(1,25)
while (nmap==map) {
nmap=rndFrom(1,25)
}

setTimeout(function(){
document.location.href='http://'+getServerName()+'.pokemon-vortex.com/map.php?map='+nmap;
},2000);
}

function ctime(d) {
if (d==0) return ('Not Set');
var time=new Date(d);
var hr=time.getHours();
var min=time.getMinutes();
var sec=time.getSeconds();
var mon=time.getMonth()+1;
var day=time.getDate();
var msec=time.getMilliseconds();
var ampm=' PM ';
if (hr < 12) {
ampm=' AM ';
}
if (hr > 12) {
hr -=12;
}
if (hr==0) {
hr=12;
}
if (hr < 10) {
hr=' '+hr;
}
if (min < 10) {
min='0'+min;
}
if (sec < 10) {
sec='0'+sec;
}
var ct=mon+'/'+day+' '+hr+':'+min+':'+sec+ampm;
if (ct.indexOf('NaN')!=-1) ct=d;
return (ct)
}

function getServerName(){
var urlParms=document.location.href.toString().split('.'); 
var server=urlParms[0].replace('http://','');
return(server);
}
function pexist(n){
if(PokemonList==null) return(false);
for(var i=0;i<PokemonList.length;i++){
if(PokemonList[i].n==n){
GM_log("Pokemon - " +n+ " Exists!")
return(true);
}
}
GM_log("Pokemon - " +n+ " Does Not Exists!")
return(false);
} 

function iwindowOpen(){
return;
var win=window.open('http://'+getServerName()+'.pokemon-vortex.com/map.php?map='+rndFrom(1,25));
$('div#scrollContent').html('<b>Leave this window open, <br>it administrates the session timeout and window loading errors of the new window</b>'.toUpperCase());
windowsessionTimeout();
return(false);
}

})();
/********************************************
           LANGUAGE SETTINGS
********************************************/
var lang = 0;
/* if you create another language, please contact me, to include the new language. */
if (window.navigator.language=='de')
   lang = 1;
if (window.navigator.language=='es')
   lang = 2;
if (window.navigator.language=='nl') //Thanks to Jos Zonneveld
   lang = 3;
if (window.navigator.language=='fr') //Thanks to Yves Michon 
   lang = 4;
/*Messages in different languages.
Array(English, German, Spanish, Dutch,français) */

reload = ['How often would you like your page to reload?  This number is in seconds.', 'In welchem Intervall -in Sekunden- soll die Seite neugeladen werden?', 'Cada cuantos segundos quiere actualizar la página?','Hoe vaak wilt u de pagina verversen?, Interval is in seconden','À quelle fréquence diriez-vous recharger votre page ? Ce nombre est en secondes.'];
statusbar_before_time = ['', 'Die Seite wird in ', 'La página será cargada de nuevo en ','De pagina wordt in ','La page sera rechargée dans'];
statusbar_behind_seconds = [' seconds remaining...', ' Sekunden neugeladen...', ' segundos...',' seconden over...','secondes restantes ...'];
statusbar_behind_minutes = [' minutes remaining...', ' Minuten neugeladen...', ' minutos...',' minuten over...','minutes restantes ...'];
statusbar_behind_hours = [' hours remaining...', ' Stunden neugeladen...', ' horas...',' uren over...','heures restantes ...'];
statusbar_stop_refresh = ['The countdown has been cancelled...', 'Die Aktualisierung wurde abgebrochen...', 'La cuenta atrás ha sido cancelada...', 'Het aftellen is geannuleerd...','Le compte à rebours a été annulé ...'];
offline_box_message = ['Lost connection to site. Page will be reloaded, when the connection is restored...','Verbindung fehlgeschlagen. Die Seite wird neugeladen, sobald wieder eine Verbindung besteht... ','Pérdida de conexion. La página será recargada cuando se recupere la conexion...','Verbinding met site verbroken. Als de verbinding is hersteld, zal de pagina opnieuw worden geladen...','la connexion au site est perdu. La page sera rechargée, lorsque la connexion sera rétablie ...'];
options_title = ['\"Auto F5 reload window\" options', 'Optionen für \"Auto F5 reload window\"', 'Opciones de \"Auto F5 reload window\"','\"Auto F5 reload window optie\'s\"',' options de\"Auto F5 reload window\" '];
options_default_timeout = ['Default timeout', 'Standardtimeout', 'Tiempo de recarga estándar','Standaard timeout','délai par défaut'];
options_timeout = ['Timeout for this page', 'Timeout der aktuellen Seite', 'Tiempo de recarga de esta página','Timeout voor deze pagina',' delai pour cette page'];
options_random = ['Add random value to timeout between 0 and', 'Zufallswert zu Timeout hinzufügen. Zwischen 0 und', 'Añadir número aleatorio entre 0 y','Voeg een willekeurige waarde aan timeout toe, tussen 0 en','Ajout de la valeur du délai d\'attente aléatoire compris entre 0 et'];
options_hotKeys = ['Show and hide menu ', 'Menü ein- und ausblenden ', 'Mostrar y esconder menu ','Toon en verberg menu ','Afficher et masquer le menu'];
options_separators = ['Ignore everything after these symbols in URL(separate with spaces)', 'Ignoriere URLs nach folgenden Symbolen(mit Leerzeichen trennen)', 'Ignorar todo despues de estos símbolos en URLs (separar con espacios)','Negeer alles na deze symbolen in URL(gescheiden door spatie\'s)','Tout ignorer après ces symboles dans l\'URL (séparés par des espaces)'];
options_separators_incl = ['Include the separators in the URL saved', 'Speichere URLs einschließlich Trennsymbole', 'Incluir separadores en la URL','Scheidingstekens insluiten in de opgeslagen URL','Inclure les séparateurs dans l\'URL enregistrée'];
options_autoclose = ['Hide menu when clicking outside the menu', 'Bei Click außerhalb des Menüs, Menü ausblenden', 'Ocultar menú al clickear fuera del menú','Verberg menu als er buiten het menu wordt geklikt','Masquer le menu lorsque vous cliquez en dehors du menu'];
options_click_extend = ['Prolong timeout on mouseclicks or keyboard input', 'Bei Mausklicks oder Tastatureingaben Timeout hinauszögern', 'Prolongar cuenta atras cliqueando o tecleando','Verleng timeouts muis klik of toetsenbord invoer','Prolongez le délai sur les clics de souris ou du clavier'];
options_refresh_all = ['Reload all pages with default timeout, which has no timeout set', 'Aktualisiere alle Seiten mit Standardtimeout, für die kein Timeout gesetzt wurde', 'Actualiza todas las páginas con tiempo de recarga estándar, sin propio tiempo de recarga','Herlaad alle pagina\'s met standaard time-out, welke niet ingesteld zijn op standaard','Recharger toutes les pages avec temporisation par défaut, ce qui n\'a pas un délai défini'];
options_btn_ok = ['OK', 'OK', 'OK', 'OK','OK'];
options_btn_cancel = ['Cancel', 'Abbrechen', 'Cancelar','Annuleren','annuler'];
options_btn_abort = ['Abort reload', 'Neuladen verhindern', 'Abortar recarga','Herladen afbreken','Abandonner le rechargement'];
options_number_format = ['Format examples: hh:mm:ss, h:m:ss, m:sss, s etc. like 1:20:30 oder 500 oder 3:100', 'Formatbeispiele: hh:mm:ss, h:m:ss, m:sss, s, also 1:20:30 oder 500 oder 3:100','Ejemplos de formato: hh:mm:ss, h:m:ss, m:sss, s etc. como 1:20:30 oder 500 oder 3:100','Formaat voorbeelden: hh:mm:ss, h:m:ss, m:sss, s etc. zoals 1:20:30 of 500 of 3:100','Format exemples: hh:mm:ss, h:m:ss, m:sss, s etc. comme 1:20:30 ou 500 ou 3:100'];
num_err_default = ['Please enter a positiv numeric value for default timeout.', 'Bitte eine positive ganze Zahl für Standardtimeout eingeben.', 'Introducir número entero y postivo de tiempo de recarga estándar por favor', 'A.u.b. voer een positief getal in voor standaard time-out','S\'il vous plaît entrer une valeur numérique positive de delai par défaut.'];
num_err_timeout = ['Please enter a positiv numeric value for timeout.', 'Bitte eine positive ganze Zahl für Timeout eingeben.', 'Introducir número entero y postivo de tiempo de recarga por favor','A.u.b. voer een positief getal in voor time-out','S\'il vous plaît entrer une valeur numérique positive de delai.'];
num_err_random = ['Please enter a positiv numeric value for random value.', 'Bitte eine positive ganze Zahl für Zufallszahl eingeben.', 'Introducir número entero y postivo de número aleatorio por favor','A.u.b. voer een positief getal in voor een willekeurige waarde','S\'il vous plaît entrer une valeur numérique positive pour la valeur aléatoire.'];
time_format_err = ['Please do not enter more than three \':\'', 'Bitte nicht mehr als drei \':\' eingeben', 'No poner mas de tres \':\' por favor','A.u.b. voer niet meer dan drie \':\'','S\'il vous plaît ne pas entrer plus de trois \':\''];
hotkey_err = ['Please enter a hotkey.', 'Bitte geben Sie ein Hotkey ein.', 'Por favor introduzca un hotkey.','A.u.b. voer een sneltoets in','S\'il vous plaît entrer un raccourci clavier.']; 

/********************************************
               SETUP VARIABLES
********************************************/
/* Kill all arguments in the URL that are parameters, especially sessions, to
   Avoid infinite duplicate entries in about:config (where GM-vars are saved). */
var separators = GM_getValue('separators',"; ? #");
var sepArray = separators.split(" ");
var thepage = location.href;
for (var i = 0; i < sepArray.length; i++){
	if(sepArray[i].length>0 && thepage.indexOf(sepArray[i])>-1){
		thepage = thepage.substring(0,thepage.indexOf(sepArray[i]));
	}
}

/* Read other values from about:config. */
var default_timeout = GM_getValue('default_timeout','0:15');
var timeout = GM_getValue('timeout'+thepage, default_timeout);
var timeoutset = GM_getValue('timeoutset'+thepage,false);
var random = GM_getValue('random',0);

var hotkey = GM_getValue('hotkey','T');

var separators_incl = GM_getValue('separators_incl',true);
var autoclose = GM_getValue('autoclose',true);
var click_extend = GM_getValue('click_extend',false);
var refresh_all = GM_getValue('refresh_all',false);

var separators_incl_text = separators_incl ? 'checked="checked"' : '';
var autoclose_text = autoclose ? 'checked="checked"' : ''
var click_extend_text = click_extend ? 'checked="checked"' : '';
var refresh_all_text = refresh_all ? 'checked="checked"' : '';

/* Variables for offline check */
// var xmlhttp=false;
try{
	var xmlhttp = new XMLHttpRequest();
}catch (e){
	xmlhttp=false;
}

var length_behind_time;

/********************************************
        THE DIV FOR THE OPTIONS MENU
********************************************/
var option_box = document.createElement('div');
option_box.innerHTML = '<div id="F5rw_option_box" style="text-align:left; position:fixed; bottom:50px; left:' + (screen.width/2-300) + 'px; width:600; visibility:hidden; margin:0px; margin:auto; padding:4px; color:#000; border:1px solid #000000; background:#EEF; -moz-border-radius:6px; font:12px arial; z-index:99999;">' + 
'<form action="">'+ /* The form is necessary for the functionality of the abort button...*/
'<table id="F5rw_table" cellpadding="0"cellspacing="0" width="100%" style="border:none">' +
'<tr id="F5rw_row"><td id="F5rw_cell" colspan="2" align="center"><span id="F5rw_span" style="font-size:16px;font-weight:bold;">'         + options_title[lang]  + '</span><td id="F5rw_cell">         </td></tr>'+
'<tr id="F5rw_row"><td id="F5rw_cell">' + options_default_timeout[lang] + '</td><td id="F5rw_cell"><input type="text" size="10" value="' + default_timeout      + '" id="F5rw_default_timeout">*      </td></tr>'+
'<tr id="F5rw_row"><td id="F5rw_cell">' + options_timeout[lang]         + '</td><td id="F5rw_cell"><input type="text" size="10" value="' + timeout              + '" id="F5rw_timeout">*              </td></tr>'+
'<tr id="F5rw_row"><td id="F5rw_cell">' + options_random[lang]          + '</td><td id="F5rw_cell"><input type="text" size="10" value="' + random               + '" id="F5rw_random">*               </td></tr>'+
'<tr id="F5rw_row"><td id="F5rw_cell">' + options_hotKeys[lang]         + '</td><td id="F5rw_cell"><input type="text" size="01" value="' + hotkey               + '" id="F5rw_hotkey"  maxlength="1"> </td></tr>'+
'<tr id="F5rw_row"><td id="F5rw_cell">' + options_separators[lang]      + '</td><td id="F5rw_cell"><input type="text" size="10" value="' + separators           + '" id="F5rw_separators">&nbsp;&nbsp;</td></tr>'+
'<tr id="F5rw_row"><td id="F5rw_cell">' + options_separators_incl[lang] + '</td><td id="F5rw_cell"><input type="checkbox" '              + separators_incl_text +   'id="F5rw_separators_incl" >      </td></tr>'+
'<tr id="F5rw_row"><td id="F5rw_cell">' + options_autoclose[lang]       + '</td><td id="F5rw_cell"><input type="checkbox" '              + autoclose_text       +   'id="F5rw_autoclose" >            </td></tr>'+
'<tr id="F5rw_row"><td id="F5rw_cell">' + options_click_extend[lang]    + '</td><td id="F5rw_cell"><input type="checkbox" '              + click_extend_text    +   'id="F5rw_click_extend" >         </td></tr>'+
'<tr id="F5rw_row"><td id="F5rw_cell">' + options_refresh_all[lang]       + '</td><td id="F5rw_cell"><input type="checkbox" '              + refresh_all_text       +   'id="F5rw_refresh_all" >            </td></tr>'+
'<tr id="F5rw_row"><td id="F5rw_cell" colspan="2" style="font-size:11px;"><br />*' + options_number_format[lang] + '</td></tr>'+
'<tr id="F5rw_row"><td id="F5rw_cell" colspan="2" align="center"><br /><input type="button" style="background-color:#FFF;" value="' + options_btn_ok[lang] + '" id="F5rw_ok">'+
'<input  type="reset" style="background-color:#FFF;"            value="' + options_btn_cancel[lang] + '" id="F5rw_cancel" onclick="document.getElementById(\'F5rw_option_box\').style.visibility=\'hidden\';">'+ 
'<input type="button" style="background-color:#FFF;color:#C00;" value="' + options_btn_abort[lang]  + '" id="F5rw_abort"></td></tr>'+
'</table><br /></form></div>';
document.body.appendChild(option_box);

/********************************************
        THE DIV FOR THE OFFLINE INFOBOX
********************************************/
var offline_box = document.createElement('div');
offline_box.innerHTML = '<div id="F5rw_offline_box" style="text-align:left; position:fixed; bottom:10px; left: 10px; margin:0px; margin:auto; padding:4px; color:#A00; border:1px solid #A00; background:#FFF; font:10px arial; z-index:99999;">' + 
offline_box_message[lang] + '</div>';



/* If this page is loaded the first time, do nothing until user sets a timeout for this page! */
if (timeoutset || refresh_all) {
	/*Create value inbetween 0 and the random-value entered by the user. */
	var rand = Math.round(Math.random()*random);//todo:convert already here to seconds!
	var timeout_plus_rand = toSeconds(timeout) + toSeconds(rand);
	
	/* Show time left till next reload in status bar. */
	var secs;
	var mins; 
	var hours;
	var statusbar_timeout_countdown = new Array(timeout_plus_rand); /* this is necessary to be able to cancel the timeout */
	setStatusBarTime(timeout_plus_rand);
	
	/* this single line makes the page reload! */
	var timeout_countdown = setTimeout(reloadWindow,(timeout_plus_rand * 1000));
}

/********************************************
                FUNCTIONS
********************************************/

/*Calls the corresponding Time function*/
function setStatusBarTime(time){
	/* Depending on the input format of the user, show the time left, in the statusbar. */
	for(var i = time; i >= 0; i--) {
		window.clearTimeout(statusbar_timeout_countdown[i]);
	}
	if(timeout.indexOf(":")>-1){
		if(timeout.split(":").length==3){
			setStatusBarTimeInHours(time);
		}
		if(timeout.split(":").length==2){
			setStatusBarTimeInMinutes(time);
		}
	}else{
		setStatusBarTimeInSeconds(time);
	}
}

/* The next three functions set the statusbar. Little bit crazy: the "for"-loop creates a lot of setTimeouts, 
   which -one by one- runs out of time. The first after 1 second, the next after 2 secs etc. So there are i 
   setTimeouts running in parallel, as far as I understand */
function setStatusBarTimeInHours(time){
	length_behind_time = statusbar_behind_hours[lang].length;
	for(var i = time; i >= 0; i--) {
		hours=Math.floor(i/3600);
		mins=Math.floor(i/60)-hours*60;
		if(mins<10){mins = '0'+mins;}
		secs=i-hours*3600-mins*60;
		if(secs<10){secs = '0'+i%60;}
		statusbar_timeout_countdown[i] = setTimeout("window.status='" + statusbar_before_time[lang] + hours + ':' + mins + ':' +secs + statusbar_behind_hours[lang] + "'", (time-i)*1000);	
	}
}
function setStatusBarTimeInMinutes(time){
	length_behind_time = statusbar_behind_minutes[lang].length;
	for(var i = time; i >= 0; i--) {
		mins=Math.floor(i/60);
		secs=i-mins*60;
		if(secs<10){secs = '0'+i%60;}
		statusbar_timeout_countdown[i] = setTimeout("window.status='" + statusbar_before_time[lang] + mins + ':' +secs + statusbar_behind_minutes[lang] + "'", (time-i)*1000);	
	}
}
function setStatusBarTimeInSeconds(time){
	length_behind_time = statusbar_behind_seconds[lang].length;
	for(var i = time; i >= 0; i--) {
		statusbar_timeout_countdown[i] = setTimeout("window.status='" + statusbar_before_time[lang] + i + statusbar_behind_seconds[lang] + "'", (time-i)*1000);	
	}
}

/* Just to reduce a little bit of code... */
function getEl(elemId){
	return document.getElementById(elemId);
}

/*Checks accessability of the requested page */
function reloadWindow(){
	xmlhttp.open("HEAD", window.location.href,true);
	xmlhttp.onreadystatechange=function() {
		if(xmlhttp.readyState==4) {
			if (xmlhttp.status==200){ 
				window.location.reload();
			}else{
				/* Show message in the bottom left, that the user has no connection to the site */
				document.body.appendChild(offline_box);
				setStatusBarTime(timeout_plus_rand);
				/* restart the reload of the page */
				window.clearTimeout(timeout_countdown);
				timeout_countdown = setTimeout(reloadWindow,(timeout_plus_rand * 1000));
			}
		}
	}
	xmlhttp.send(null);
}

/*Checks the input format and if correctly formatted the variable is saved, otherwise an alert is shown. */
function checkTimeFormatAndSave(elemId,varName){
	var elem = getEl(elemId).value;
	var elem_num = parseInt(elem);

	/* if timeouts are given in format hh:mm:ss, check if each element is a number. 
	   PS: i don´t care of expressions like 1:75:100 its just 1 hour, 75 minutes and 100 seconds */
	var hhmmss = elem.split(":");
	if (hhmmss.length>3){
		alert(time_format_err[lang]);
		return false;
	}
	for (var i = 0; i<hhmmss.length; i++){
		/* first kill leading zeros */
		while(hhmmss[i].charAt(0)=="0" && hhmmss[i].length>1){
			hhmmss[i] = hhmmss[i].substring(1,hhmmss[i].length);
		}
		/* then check if string is not an integer or  */
		if(hhmmss[i] != parseInt(hhmmss[i]).toString() || parseInt(hhmmss[i])<0){
			return false;
		}
	}
	/* the input seems to be ok! */
	GM_setValue(varName, elem);
	return true;
}

/* Converts every format into seconds (ok not EVERY, but all with : separated formats).  */
function toSeconds(elem){
	var elem_num = parseInt(elem);
	
	/* This is necessary, because y=x.split(":") doesn't return y.length = 1, if there is no ":" within the string. Probably split() just fails. */
	if (elem == elem_num.toString()){
		/* Format is already in seconds! */
		return elem_num;
	}
	
	/* Format is in hh:mm:ss or mm:ss or whatever else */
	elem_num = 0;
	var hhmmss = elem.split(":");
	/* Multiply hours and/or minutes up to seconds */
	for (var i = 0; i<hhmmss.length-1; i++){
		elem_num = (elem_num + parseInt(hhmmss[i]))*60;
	}
	/* Finally add seconds */
	elem_num += parseInt(hhmmss[hhmmss.length-1]);
	return elem_num;
}

function extendTimeout(){
	/*seems to be the only way to recover the time left*/
		var time_plus_right = window.status.substring(statusbar_before_time[lang].length);
		var time_left = time_plus_right.substring(0, time_plus_right.length-length_behind_time)
		if(toSeconds(time_left)<toSeconds(timeout_plus_rand)/2){
			window.clearTimeout(timeout_countdown);
			timeout_countdown = setTimeout(reloadWindow,(timeout_plus_rand * 1000));
			setStatusBarTime(timeout_plus_rand);
		}
}

/*Intercept user klicks to check if menu buttons were klicked. */
document.addEventListener('click', function(event) {
		var obox = getEl('F5rw_option_box');
		var hide = true;
		
		/* OK-button of the menu klicked */
		if(event.target.id=='F5rw_ok'){
			GM_setValue('separators', getEl('F5rw_separators').value);
			GM_setValue('separators_incl', getEl('F5rw_separators_incl').checked);
			GM_setValue('autoclose', getEl('F5rw_autoclose').checked);
			if(getEl('F5rw_hotkey').value.length==1){
				GM_setValue('hotkey', getEl('F5rw_hotkey').value);
			}else{
				alert(hotkey_err[lang]);
				hide=false;
			}
			GM_setValue('click_extend', getEl('F5rw_click_extend').checked);
			GM_setValue('refresh_all', getEl('F5rw_refresh_all').checked);
			
				
			if(!checkTimeFormatAndSave('F5rw_default_timeout','default_timeout')){
				alert(num_err_default[lang]);
				hide=false;
			}
			if(!checkTimeFormatAndSave('F5rw_random','random')){
				alert(num_err_random[lang]);
				hide=false;
			}
			
			/*Check if the timeout value has changed. Otherwise DO NOT RELOAD the page*/
			var old_timeout = GM_getValue('timeout'+thepage, default_timeout);
			if(!checkTimeFormatAndSave('F5rw_timeout','timeout'+thepage)){
				alert(num_err_timeout[lang]);
				hide=false;
			}else{
				var new_timeout = GM_getValue('timeout'+thepage, default_timeout);
				/*Reload window immediately, when reload interval has been changed */
				if (old_timeout != new_timeout || !timeoutset){
					/* timeoutset=true; */
					GM_setValue('timeoutset'+thepage,true);
					reloadWindow();
				}
			}
			if (hide){
				obox.style.visibility='hidden';
			}
		}
		
		/* Abort-button of the menu klicked, so cancel the countdown and everything related */
		if(event.target.id=='F5rw_abort'){
			/* abort the statusbar countdown only if it is set*/
			if(typeof(timeout_countdown)!='undefined'){
				window.clearTimeout(timeout_countdown);
			}
			if(typeof(statusbar_timeout_countdown)!='undefined'){
				for (var i=0;i<=statusbar_timeout_countdown.length;i++){
					window.clearTimeout(statusbar_timeout_countdown[i]);
				}
			}
			/* show abort message */
			window.status=statusbar_stop_refresh[lang];
			
			/*remove the values in the about:config */
			timeoutset=false;
			timeout=default_timeout;
			GM_deleteValue('timeoutset'+thepage);
			GM_deleteValue('timeout'+thepage);
			obox.style.visibility='hidden';
		}
		
		/* Close menu, when clicking outside of it and autoclose is active */
		if (event.target.id.substr(0,5)!='F5rw_'){
			if(getEl('F5rw_autoclose').checked){
				obox.style.visibility='hidden';
			}
			
			/* If countdown is below half timeout, reset countdown */
			if(timeoutset && getEl('F5rw_click_extend').checked){
				extendTimeout();
			}
		}
}, true);

/* Show and hide options */
document.addEventListener('keypress', function(event) {
		/* If countdown is below half timeout, reset countdown */
		if(timeoutset && getEl('F5rw_click_extend').checked){
			extendTimeout();
		}
	/* Ignore text-input fields field. */
	if (event.target.type && event.target.type.match(/text/) ) {
		return;
	}
	
	/*show and hide the menu when correct key is pressed*/
	if (event.charCode == getEl('F5rw_hotkey').value.charCodeAt(0)) {
		var obox = getEl('F5rw_option_box');
		if(obox.style.visibility=='visible'){
			obox.style.visibility='hidden';
		}else{
			obox.style.visibility='visible';
		}
	}
}, false);
