// ==UserScript==
// @name           Upworthy, you are obnoxiously needy
// @namespace      http://beeswax.noneofyours.inc
// @description    Gets rid of that !@#%^&*(^& popup banner (and other shniz) on that !@#$%^* site Upworthy
// @version        0.12
// @match          *://*.upworthy.com/*
// ==/UserScript==

DamnUpworthy = function (){
a=document.querySelectorAll('.modalContentEmbed')
for (ii=0;ii<a.length;ii++) {
  a[ii].parentNode.removeChild(a[ii])
  console.log('Fucked an Upworthy (.modalContentEmbed)')
  }
a=document.querySelectorAll('.fade')
for (ii=0;ii<a.length;ii++) {
  a[ii].parentNode.removeChild(a[ii])
  console.log('Fucked an Upworthy (.modal.fade)')
  }
a=document.querySelectorAll('.close-slider')
for (ii=0;ii<a.length;ii++) {
  a[ii].click()
  console.log('Fucked an Upworthy (.close-slider)')
  }
a=document.querySelectorAll('.bottomSlider')
for (ii=0;ii<a.length;ii++) {
  a[ii].parentNode.removeChild(a[ii])
  console.log('Fucked an Upworthy (.bottomSlider)')
  }
a=document.querySelectorAll('.share')
for (ii=0;ii<a.length;ii++) {
  a[ii].parentNode.removeChild(a[ii])
  console.log('Fucked an Upworthy (.share)')
  }
a=document.querySelectorAll('#shareRowBottom')
for (ii=0;ii<a.length;ii++) {
  a[ii].parentNode.removeChild(a[ii])
  console.log('Fucked an Upworthy (#shareRowBottom)')
  }
}

//document.body.appendChild(document.createElement("script")).innerHTML = "("+DamnUpworthy+")()";

window.addEventListener('load',DamnUpworthy, false);
document.addEventListener("DOMNodeInserted", DamnUpworthy, false);
