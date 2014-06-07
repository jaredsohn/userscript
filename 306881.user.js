// ==UserScript==
// @name HaaretzPaywall
// @namespace haaretz.com
// @description bypass haaretz paywall for privacy reasons. No one should be tracked! PAY HAARETZ THEY NEED YOUR SUPPORT!!!
// @include http://*.haaretz.com/*
// @include http://*.haaretz.co.il/*
// @grant none
// @version 1
// ==/UserScript==
 

document.cookie = "login="+parseFloat(parseInt(Math.floor(Math.random()*9999999999),10).toPrecision(10)).toFixed(0)+"@yahoo.com;path=/;domain=www.haaretz.co.il"
document.cookie = "HtzRusr=1;path=/;domain=www.haaretz.co.il"
document.cookie = "tmsso=userId=759858"+parseFloat(parseInt(Math.floor(Math.random()*9999),10).toPrecision(4)).toFixed(0)+":userName=" + parseFloat(parseInt(Math.floor(Math.random()*9999999999),10).toPrecision(10)).toFixed(0) + "@yahoo.com:ticketId=303335313635363437333637353336333835"+parseFloat(parseInt(Math.floor(Math.random()*9999),10).toPrecision(4)).toFixed(0)+":upref=17:usrae=0:urgdr=null:firstName=________." + parseFloat(parseInt(Math.floor(Math.random()*9999),10).toPrecision(4)).toFixed(0) + ":lastName=________." + parseFloat(parseInt(Math.floor(Math.random()*9999),10).toPrecision(4)).toFixed(0)+":fbid=:;path=/;domain=www.haaretz.co.il"
document.setPopUp = null;