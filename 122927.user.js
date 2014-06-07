// ==UserScript==
// @name        OhHiKatie
// @namespace   das
// @include     http://*
// @include     https://*
// @version     1
// ==/UserScript==

var insults=new Array();
var mo = 'Katie you';
insults[0] = mo + "r friends prefer Niki";
insults[1] = mo + " are unable to eat correctly. You need to try to stop getting yoghurt in your eyebrow when you eat";
insults[2] = mo + " need to actually make the toilet instead of weeing into paddling pools";
insults[3] = mo + " need to admit missy doesn’t like you";
insults[4] = mo + " need to realise even walls don't want hugs from you when drunk";
insults[5] = mo + " have hair that makes people with mullets laugh";
insults[6] = mo + " racist";
insults[7] = mo + "'re hated even by marmite";
insults[8] = mo + " look like a guest on Jeremy Kyle";
insults[9] = mo + " are literally a retard";
insults[10] = mo + " make even Niki look hot";
insults[11] = mo + " have the worst cat impression and you should be ashamed!";
var ran=Math.floor(Math.random()*insults.length)
window.onload=function(){alert(insults[ran])};