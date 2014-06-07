// ==UserScript==
// @name           nCore 3szoros
// @namespace      nCore 3szoros
// @include        http://ncore.cc/letoltes.php*aktiv_inaktiv_ingyenes=free*
// @Author:        Kőrös Zseráld
// ==/UserScript==
var alma2=0;
for( var i = 0; i < document.getElementsByTagName('div').length; i++ ){
var alma=document.getElementsByTagName('div')[i].className;
var test=document.getElementsByTagName('div')[i].innerHTML;
if (alma=="box_alap_img"){
document.getElementsByTagName('div')[i].innerHTML=" ";
document.getElementsByTagName('div')[i].className=" ";
document.getElementsByTagName('div')[i].id=" ";}

var azon=document.getElementsByTagName('div')[i].id;
if (azon=="box_s2"){
var azontart=document.getElementsByTagName('div')[i].innerHTML;
var eleje=azontart.indexOf("class=\"torrent\"");
var vege=azontart.indexOf("</a></div>");
var seeder=azontart.substring(eleje+16,vege);
seeder=parseFloat(seeder);
}
if (azon=="box_l2"){
var azontart=document.getElementsByTagName('div')[i].innerHTML;
var eleje=azontart.indexOf("class=\"torrent\"");
var vege=azontart.indexOf("</a></div>");
var leecher=azontart.substring(eleje+16,vege);
leecher=parseFloat(leecher);
if (seeder<=leecher){
  document.getElementsByTagName('div')[i-3].className="joh";
  document.getElementsByTagName('div')[i-3].style.backgroundColor="#0000FF";
  //alert(""+seeder+"<="+leecher+"");
  }
}



if (alma=="box_nagy_alap" && test.indexOf("u:3x")==-1){
document.getElementsByTagName('div')[i].innerHTML=" ";
alma2=test.indexOf("u:3x");}
}
//alert(alma2);