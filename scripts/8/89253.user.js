// ==UserScript==
// @name           SSW Load Warps
// @namespace      http://homeworlds.secretsocietywars.com/crashnburn11
// @description    Loads warps into nardo's script
// @include        http://www.secretsocietywars.com/index.php?p=space&a=sector_map
// @include	   http://www.secretsocietywars.com/index.php?p=planets&a=teleport&planet_id=*
// @include	   http://www.secretsocietywars.com/index.php?p=space&a=blastoff
// @include	   http://www.secretsocietywars.com/index.php?p=planets&a=land
// ==/UserScript==

/*Load States
0=initialize to ahlnudia
1=sector map
2=barnimus
3=sector map
4=boria
5=sector map
6=Deep Six Fauna
7=sector map
8=Earth
9=sector map
10=eroticon 69
11=sector map
12=flambe
13=sector map
14=Laxloo
15=sector map
16=Lucky Spaceman
17=sector map
18=New Ceylon
19=sector map
20=nortonia
21=sector map
22=phallorous
23=sector map
24=pharma
25=sector map
26=solaris
27=sector map
28=Tranquility
29=sector map
30=Trinoc
31=sector map
32=XMM
33=SM
34=Yeranus
35=SM
72=DONE
*/

var load_state = GM_getValue("load_state",72);

if(load_state==0){
setTimeout(F0, 3000);
}else if(load_state-1==0){
setTimeout(BO, 3000);
}else if(load_state-2==0){
setTimeout(SM, 3000);
}else if(load_state-3==0){
setTimeout(LD, 3000);
}else if(load_state-4==0){
setTimeout(F2, 3000);
}else if(load_state-5==0){
setTimeout(BO, 3000);
}else if(load_state-6==0){
setTimeout(SM, 3000);
}else if(load_state-7==0){
setTimeout(LD, 3000);
}else if(load_state-8==0){
setTimeout(F4, 3000);
}else if(load_state-9==0){
setTimeout(BO, 3000);
}else if(load_state-10==0){
setTimeout(SM, 3000);
}else if(load_state-11==0){
setTimeout(LD, 3000);
}else if(load_state-12==0){
setTimeout(F6, 3000);
}else if(load_state-13==0){
setTimeout(BO, 3000);
}else if(load_state-14==0){
setTimeout(SM, 3000);
}else if(load_state-15==0){
setTimeout(LD, 3000);
}else if(load_state-16==0){
setTimeout(F8, 3000);
}else if(load_state-17==0){
setTimeout(BO, 3000);
}else if(load_state-18==0){
setTimeout(SM, 3000);
}else if(load_state-19==0){
setTimeout(LD, 3000);
}else if(load_state-20==0){
setTimeout(F10, 3000);
}else if(load_state-21==0){
setTimeout(BO, 3000);
}else if(load_state-22==0){
setTimeout(SM, 3000);
}else if(load_state-23==0){
setTimeout(LD, 3000);
}else if(load_state-24==0){
setTimeout(F12, 3000);
}else if(load_state-25==0){
setTimeout(BO, 3000);
}else if(load_state-26==0){
setTimeout(SM, 3000);
}else if(load_state-27==0){
setTimeout(LD, 3000);
}else if(load_state-28==0){
setTimeout(F14, 3000);
}else if(load_state-29==0){
setTimeout(BO, 3000);
}else if(load_state-30==0){
setTimeout(SM, 3000);
}else if(load_state-31==0){
setTimeout(LD, 3000);
}else if(load_state-32==0){
setTimeout(F16, 3000);
}else if(load_state-33==0){
setTimeout(BO, 3000);
}else if(load_state-34==0){
setTimeout(SM, 3000);
}else if(load_state-35==0){
setTimeout(LD, 3000);
}else if(load_state-36==0){
setTimeout(F18, 3000);
}else if(load_state-37==0){
setTimeout(BO, 3000);
}else if(load_state-38==0){
setTimeout(SM, 3000);
}else if(load_state-39==0){
setTimeout(LD, 3000);
}else if(load_state-40==0){
setTimeout(F20, 3000);
}else if(load_state-41==0){
setTimeout(BO, 3000);
}else if(load_state-42==0){
setTimeout(SM, 3000);
}else if(load_state-43==0){
setTimeout(LD, 3000);
}else if(load_state-44==0){
setTimeout(F22, 3000);
}else if(load_state-45==0){
setTimeout(BO, 3000);
}else if(load_state-46==0){
setTimeout(SM, 3000);
}else if(load_state-47==0){
setTimeout(LD, 3000);
}else if(load_state-48==0){
setTimeout(F24, 3000);
}else if(load_state-49==0){
setTimeout(BO, 3000);
}else if(load_state-50==0){
setTimeout(SM, 3000);
}else if(load_state-51==0){
setTimeout(LD, 3000);
}else if(load_state-52==0){
setTimeout(F26, 3000);
}else if(load_state-53==0){
setTimeout(BO, 3000);
}else if(load_state-54==0){
setTimeout(SM, 3000);
}else if(load_state-55==0){
setTimeout(LD, 3000);
}else if(load_state-56==0){
setTimeout(F28, 3000);
}else if(load_state-57==0){
setTimeout(BO, 3000);
}else if(load_state-58==0){
setTimeout(SM, 3000);
}else if(load_state-59==0){
setTimeout(LD, 3000);
}else if(load_state-60==0){
setTimeout(F30, 3000);
}else if(load_state-61==0){
setTimeout(BO, 3000);
}else if(load_state-62==0){
setTimeout(SM, 3000);
}else if(load_state-63==0){
setTimeout(LD, 3000);
}else if(load_state-64==0){
setTimeout(F32, 3000);
}else if(load_state-65==0){
setTimeout(BO, 3000);
}else if(load_state-66==0){
setTimeout(SM, 3000);
}else if(load_state-67==0){
setTimeout(LD, 3000);
}else if(load_state-68==0){
setTimeout(F34, 3000);
}else if(load_state-69==0){
setTimeout(BO, 3000);
}else if(load_state-70==0){
setTimeout(SM, 3000);
}else if(load_state-71==0){
setTimeout(LD, 3000);
}






function F0(){
GM_setValue("load_state",load_state+1)
window.location.href="http://www.secretsocietywars.com/index.php?p=planets&a=teleport&planet_id=18";
}
function F2(){
GM_setValue("load_state",load_state+1)
window.location.href="http://www.secretsocietywars.com/index.php?p=planets&a=teleport&planet_id=14";
}
function F4(){
GM_setValue("load_state",load_state+1)
window.location.href="http://www.secretsocietywars.com/index.php?p=planets&a=teleport&planet_id=2";
}
function F6(){
GM_setValue("load_state",load_state+1)
window.location.href="http://www.secretsocietywars.com/index.php?p=planets&a=teleport&planet_id=12";
}
function F8(){
GM_setValue("load_state",load_state+1)
window.location.href="http://www.secretsocietywars.com/index.php?p=planets&a=teleport&planet_id=1";
}
function F10(){
GM_setValue("load_state",load_state+1)
window.location.href="http://www.secretsocietywars.com/index.php?p=planets&a=teleport&planet_id=11";
}
function F12(){
GM_setValue("load_state",load_state+1)
window.location.href="http://www.secretsocietywars.com/index.php?p=planets&a=teleport&planet_id=22";
}
function F14(){
GM_setValue("load_state",load_state+1)
window.location.href="http://www.secretsocietywars.com/index.php?p=planets&a=teleport&planet_id=5";
}
function F16(){
GM_setValue("load_state",load_state+1)
window.location.href="http://www.secretsocietywars.com/index.php?p=planets&a=teleport&planet_id=9";
}
function F18(){
GM_setValue("load_state",load_state+1)
window.location.href="http://www.secretsocietywars.com/index.php?p=planets&a=teleport&planet_id=4";
}
function F20(){
GM_setValue("load_state",load_state+1)
window.location.href="http://www.secretsocietywars.com/index.php?p=planets&a=teleport&planet_id=8";
}
function F22(){
GM_setValue("load_state",load_state+1)
window.location.href="http://www.secretsocietywars.com/index.php?p=planets&a=teleport&planet_id=6";
}
function F24(){
GM_setValue("load_state",load_state+1)
window.location.href="http://www.secretsocietywars.com/index.php?p=planets&a=teleport&planet_id=3";
}
function F26(){
GM_setValue("load_state",load_state+1)
window.location.href="http://www.secretsocietywars.com/index.php?p=planets&a=teleport&planet_id=7";
}
function F28(){
GM_setValue("load_state",load_state+1)
window.location.href="http://www.secretsocietywars.com/index.php?p=planets&a=teleport&planet_id=16";
}
function F30(){
GM_setValue("load_state",load_state+1)
window.location.href="http://www.secretsocietywars.com/index.php?p=planets&a=teleport&planet_id=10";
}
function F32(){
GM_setValue("load_state",load_state+1)
window.location.href="http://www.secretsocietywars.com/index.php?p=planets&a=teleport&planet_id=17";
}
function F34(){
GM_setValue("load_state",load_state+1)
window.location.href="http://www.secretsocietywars.com/index.php?p=planets&a=teleport&planet_id=13";
}
function SM(){
GM_setValue("load_state",load_state+1)
window.location.href="http://www.secretsocietywars.com/index.php?p=space&a=sector_map";
}
function BO(){
GM_setValue("load_state",load_state+1)
window.location.href="http://www.secretsocietywars.com/index.php?p=space&a=blastoff";
}
function LD(){
GM_setValue("load_state",load_state+1)
window.location.href="http://www.secretsocietywars.com/index.php?p=planets&a=land";
}

if(window.location.href=="http://www.secretsocietywars.com/index.php?p=space&a=sector_map"){
insert_reload_link();
}

function insert_reload_link() {
	var tr = document.evaluate('//select[@name="pnselect"]/ancestor::tr[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var td = document.createElement('td');
	var reload_link = document.createElement('a');
	td.style.verticalAlign = "middle";
	reload_link.href = "http://www.secretsocietywars.com/index.php?p=planets&a=teleport&planet_id=18";
	reload_link.addEventListener('click', reload_warps, false);
	reload_link.style.color = "white";
	reload_link.innerHTML = "Reload Warps";
	td.appendChild(reload_link);
	tr.appendChild(td);
}
function reload_warps(ev) {
	if(confirm("Do you want to reload all planet's warp information?")) {
		GM_setValue("load_state", 1);
	}

}

