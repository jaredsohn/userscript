// ==UserScript==
// @name Sangokushi
// @namespace Sangokushi Auto Up
// @description v 0.1
// @include http://*.sangokushi.in.th/*
// ==/UserScript==

var tar = 'http://' + window.location.host+'/village.php';
var w = window.location.host.split('.')[0];
var xy = document.getElementsByTagName('span')[26].innerHTML;


//must initial it
function getMax(){
return GM_getValue(w+xy+'max');
}

function setMax(max){
GM_setValue(w+xy+'max',max);
}
function getStep(){
return GM_getValue(w+xy+'step');
}
function setStep(step){
GM_setValue(w+xy+'step',step);
}
function getData(){
return GM_getValue(w+xy+getStep());
}/*
function setData(data){
var datax = data.split('x=')[1].split('&')[0];
var datay = data.split('y=')[1].split('&')[0];
GM_setValue(w+datax+','+datay+getMax(),data);
}*/

//alert(xy);

if(!GM_getValue("max")) GM_setValue('max',0);

function village() {

var logo = document.createElement("mydiv");
logo.innerHTML = '<button type="button" id="reset_bot">l>;('+(GM_getValue('step')-1)+'/'+GM_getValue('max')+')</button>'+'<button type="button" id="stop_bot">X</button>';
document.body.insertBefore(logo, document.body.firstChild);

document.getElementById('reset_bot').addEventListener('click', function(event) {
//step=0;
if(GM_getValue('max')==0){
alert('no task');
window.location.href = tar;
return;
}

GM_setValue("step",1);
// var a = GM_getValue("step");
alert('started');
window.location.href = window.location.href;//+'/village.php/';
return;
//event.stopPropagation();
//event.preventDefault();
}, true);
document.getElementById('stop_bot').addEventListener('click', function(event) {
GM_setValue("step",0);
GM_setValue('max',0);
var a = GM_getValue("step");
alert('stoped');
window.location.href = tar;
return;
//event.stopPropagation();
//event.preventDefault();
}, true);

var step = GM_getValue("step");
var waitTime;
if(document.body.innerHTML.match("--:--:--"))waitTime= document.getElementById('area_timer0');
else waitTime= document.getElementById('area_timer1');
var w = window.location.host;

//check out
if(!GM_getValue("step"))return;
if(GM_getValue("step")<0||GM_getValue("step")>GM_getValue('max'))return;
if(waitTime)return;
if(GM_getValue('max')==0)return;


//save & increase step
GM_setValue("step",GM_getValue('step')+1);

if(!waitTime){
// alert(step + ":" + myPath[step]);
//window.location.href = 'http://www.google.com';
//return;

//window.location.href = myPath[step];
window.location.href = GM_getValue('t'+step);

return;
}
//else alert(waitTime.innerHTML);

}

function factory() {
document.addEventListener('click', function(event) {
//if(((String)(event.target)).match('facility/build.php')){
if(event.target==tar)return;
if(((String)(event.target)).match('build.php')){
GM_setValue('max', GM_getValue('max') +1);




var test = event.target.href;
var arr = test.split("&mode=cp");
var ans = arr[0]+arr[1];
if(!arr[1]) ans = arr[0];
GM_setValue('t'+(String)(GM_getValue('max')),ans);


//var datax = data.split('x=')[1].split('&')[0];
//var datay = data.split('y=')[1].split('&')[0];
//alert();

//alert(GM_getValue('t'+GM_getValue('max')));
window.location.href = tar;
}
event.stopPropagation();
event.preventDefault();
}, true);

}

if(window.location.href.match('.sangokushi.in.th/village.php'))village();
if(window.location.href.match('.sangokushi.in.th/facility/'))factory();




//var wood_p = document.getElementsByTagName('span')[1].innerHTML;
//var stone_p = document.getElementsByTagName('span')[2].innerHTML;
//var iron_p = document.getElementsByTagName('span')[3].innerHTML;
//var rice_p = document.getElementsByTagName('span')[4].innerHTML;


/*
var test = '?x=3&y=2&mode=cp&village_id=192889';
var arr = test.split("&mode=cp");
alert(arr[0]+' ' + arr[1]);
*/