// ==UserScript==
// @name           aukro.ua color scheme fix
// @namespace      aukro
// @description    aukro.ua color scheme fix
// @include        http://aukro.ua*
// @include http://aukro.cz*
// @include http://molotok.ru*
// @author         jz
// @version 1.2
// ==/UserScript==
document.body.style.background = '#eaeaea';
var el1=document.getElementsByClassName("main-box");
for (var i=0; i<el1.length; i++)
 el1[i].style.display = "none";
var el2=document.getElementById("items-carousel-promoted");
if (el2) el2.style.display = "none";
var el3=document.getElementsByClassName("product-details separator-bottom");
for (var i=0; i<el3.length; i++)
 el3[i].style.display = "none";
var el4=document.getElementsByClassName("bargains items-box separator-bottom");
for (var i=0; i<el4.length; i++)
 el4[i].style.display = "none";
var el5=document.getElementsByClassName("partners separator-bottom");
for (var i=0; i<el5.length; i++)
 el5[i].style.display = "none";
var el6=document.getElementsByClassName("showcase hr separator-bottom");
for (var i=0; i<el6.length; i++)
 el6[i].style.display = "none";
var el7=document.getElementsByClassName("stay-connected");
for (var i=0; i<el7.length; i++)
 el7[i].style.background = '#eaeaea';
var el8=document.getElementsByClassName("cart-status");
for (var i=0; i<el8.length; i++)
 el8[i].style.background = '#eaeaea';
var el9=document.getElementsByClassName("listing-sort-dropdown");
for (var i=0; i<el9.length; i++)
{
 el10 = el9[i].getElementsByClassName("label");
 for (var j=0; j<el10.length; j++)
  el10[j].style.background = '#eaeaea';
}
var el11=document.getElementsByClassName("offers");
for (var i=0; i<el11.length; i++)
{
 el12 = el11[i].getElementsByClassName("params params-featured");
 for (var j=0; j<el12.length; j++)
  el12[j].style.display = "none";
}
var el13=document.getElementById("feedback-box");
if (el13) el13.style.display = "none";
var el14=document.getElementById("layout-bar");
if (el14) el14.style.display = "none";
var el15=document.getElementsByClassName("recommended fluid items-box separator-bottom");
for (var i=0; i<el15.length; i++)
 el15[i].style.display = "none";
var el16=document.getElementsByClassName("partners clearfix");
for (var i=0; i<el16.length; i++)
 el16[i].style.display = "none";
var el17=document.getElementsByClassName("main-breadcrumb");
for (var i=0; i<el17.length; i++)
 el17[i].style.display = "none";