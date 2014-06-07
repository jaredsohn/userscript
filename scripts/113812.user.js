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
var areas = document.getElementsByTagName('area');
var maxArea = areas.length;
var areaMinStar = 1;
var areaGetMoreStar = false;
var areaTaken = 0; // 0=all 1=free 2=taken
var arealv;
var areatmp ='';
for(var i =0; i<maxArea; i++){
if(areas[i].title.split(' ').length==2) //free area
{
arealv = areas[i].getAttribute('onmouseover').split("/img/common/star_warpower_b.gif").length -1;
if(i<9)areatmp += '<img src="'+picNum[arealv-1]+'" class="mapAll0'+(i+1)+'" alt="">';else areatmp += '<img src="'+picNum[arealv-1]+'" class="mapAll'+(i+1)+'" alt="">';
}
}
document.getElementById("mapsAll").innerHTML = areatmp +document.getElementById("mapsAll").innerHTML;
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
alert(arr[0]+' ' + arr[1]);
*/