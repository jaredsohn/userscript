// ==UserScript==
// @name Super_Autobattle
// @namespace www.vortexrising.tk
// @author yashrastogi
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
var battleId=3001734;

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

