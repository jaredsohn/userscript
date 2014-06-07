// ==UserScript==
// @name        Theassassins
// @namespace   http://userscripts.org/scripts/150472
// @description Autosurf do theassassins.pl
// @include     *
// @version     1
// ==/UserScript==
var verssion = "20";
var coa = "01";
var rx = new RegExp('^http://adf.ly[a-zA-Z0-9\-\?\/\=\.]{0,40}$');
var rp = new RegExp('^http://[a-zA-Z0-9]{0,20}.linkbucks.com[a-zA-Z0-9\-\?\/\=\.\&\_\:\%\[\]\(\)]{0,955}$');
var ro = new RegExp('^http://adf.ly/locked/[a-zA-Z0-9\-\?\/\=\.\%]{0,40}$');
var re = new RegExp('^http://www.mininova.org.*$');

var rf = new RegExp('^http://thepiratebay.se.*$');
var ry = new RegExp('^http://torrenty.org.*$');
    if(rp.test(location.href)){
	var wylosowane = Math.floor((Math.random()*3000))+10000;
 window.onload = setTimeout(function(){
 document.getElementById('skiplink').click();
GM_setValue("ad",'5');

},wylosowane);

}
if(ro.test(location.href)){
var wylosowane = Math.floor((Math.random()*8000))+5000;
window.onload = setTimeout(function(){
location.reload();
 },wylosowane);

}
if(re.test(location.href) || ry.test(location.href) || rf.test(location.href)){

GM_setValue("pytanie",location.href);
var wylosowane = Math.floor((Math.random()*3000))+8000;
window.onload = setTimeout(function(){
GM_setValue("pytanie",location.href);
 window.location.href = "http://theassassins.pl/game.php";
 },wylosowane);
}


if(rx.test(location.href)){
var wylosowane = Math.floor((Math.random()*5000))+9000;
 window.onload = setTimeout(function(){
 document.getElementById('skip_button').click();
GM_setValue("ad",'5');
},wylosowane);

}

if(location.href == 'http://theassassins.pl/game.php'){
// setTimeout(function(){
 // null.dummy;
// },10);
var ad = GM_getValue("ad");


var value= GM_getValue("pytanie");
 if(value == '' || value=='asdf'){
window.onload = document.getElementById('f1').click();
 }else{
 var ad = GM_getValue("ad");
 if(ad!='5'){
 GM_setValue("pytanie",'asdf');
null.dummy;
// aler('Błąd');
}
//TUTAJ
var wylosowane = Math.floor((Math.random()*2000))+1000;
window.onload = setTimeout(function(){
var form = document.getElementsByTagName('input')[1].value= value;
var formm = document.getElementsByTagName('input')[2].value= verssion;
var submit = document.forms[0].submit();
 GM_setValue("pytanie",'asdf');
 GM_setValue("ad",'1000');
},wylosowane);


}
}

if(location.href == 'http://theassassins.pl/game.php#wyslij' && value!= 'asdf'){

setTimeout(function(){GM_setValue("pytanie",'asdf');
GM_setValue("ad",'1000');
document.getElementById('f1').click();

},4500);
}