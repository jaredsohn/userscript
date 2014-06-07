// ==UserScript==
// @name           sg_gielda
// @namespace      sg
// @description    sg
// @include        http://*sguni.pl/pages/exchange.seam*
// ==/UserScript==

//USTAWIENIA
var s_metal = 1;
var s_krysztal = 2;
var s_deuter = 3;
var s_zloto = 4;
var s_naq = 5;
var s_zlo = 6;
var k_metal = 7;
var k_krysztal = 8;
var k_deuter = 9;
var k_zloto = 10;
var k_naq = 11;
var k_zlo = 12;
//

var temp = document.getElementsByName("exchangeForm:j_id120");
temp[0].value = s_metal;
var temp = document.getElementsByName("exchangeForm:j_id121");
temp[0].value = k_metal;
var temp = document.getElementsByName("exchangeForm:j_id123");
temp[0].value = s_krysztal;
var temp = document.getElementsByName("exchangeForm:j_id124");
temp[0].value = k_krysztal;
var temp = document.getElementsByName("exchangeForm:j_id126");
temp[0].value = s_deuter;
var temp = document.getElementsByName("exchangeForm:j_id127");
temp[0].value = k_deuter;
var temp = document.getElementsByName("exchangeForm:j_id129");
temp[0].value = s_zloto;
var temp = document.getElementsByName("exchangeForm:j_id130");
temp[0].value = k_zloto;
var temp = document.getElementsByName("exchangeForm:j_id132");
temp[0].value = s_naq;
var temp = document.getElementsByName("exchangeForm:j_id133");
temp[0].value = k_naq;
var temp = document.getElementsByName("exchangeForm:j_id135");
temp[0].value = s_zlo;
var temp = document.getElementsByName("exchangeForm:j_id136");
temp[0].value = k_zlo;