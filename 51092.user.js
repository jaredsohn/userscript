// ==UserScript==
// @name           ders avla
// @namespace      zxc
// @include        http://*.sis.itu.edu.tr:8092/pls/pprd/kyol.P_Kisa
// @include        http://*.sis.itu.edu.tr:8092/pls/pprd/kayit.P_AddDrop
// @include        http://*.sis.itu.edu.tr:8092/pls/pprd/kayit.P_Kayit
// ==/UserScript==



//Almak istediğiniz crn leri yazın
var crn1='23742';
var crn2='23740';
var crn3='';
var crn4='';
var crn5='';
var crn6='';
var crn7='';
var crn8='';
var crn9='';
var crn10='';


//Kaç saniyede bir yenilenecek
var sure=2;



/////////////////////////


var dabada=document.getElementsByName("CRN2");

dabada[0].value=crn1;
dabada[1].value=crn2;
dabada[2].value=crn3;
dabada[3].value=crn4;
dabada[4].value=crn5;
dabada[5].value=crn6;
dabada[6].value=crn7;
dabada[7].value=crn8;
dabada[8].value=crn9;
dabada[9].value=crn10;





setTimeout("document.forms[0].komut.click()",(sure*1000)); 

