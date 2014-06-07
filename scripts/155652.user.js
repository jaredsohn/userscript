// ==UserScript==
// @name		Videotron maximal daily bandwidth usage
// @author		LouisTakePILLz
// @namespace	Videotron
// @description	Videotron - Show how much bandwidth can be used daily without going over the bandwidth capacity
// @match		http://videotron.com/client/residentiel/secur/CIUserSecurise.do*
// @match		https://videotron.com/client/residentiel/secur/CIUserSecurise.do*
// @match		http://www.videotron.com/client/residentiel/secur/CIUserSecurise.do*
// @match		https://www.videotron.com/client/residentiel/secur/CIUserSecurise.do*
// @updateURL	http://userscripts.org/scripts/source/155652.meta.js
// @grant		none
// @icon		data:image/png;base64,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6f9GuOj/Sbbn30u1559MtOdQTrXnEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALaHcIDCi3EAzpN1AN6fecDyq34A/ruKAQq7icESu4yAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A///////w////wAf//4AAP/4AAAH8AAAA8AAAAOAAAACAAAAAAAAAAAAAAAAAAAAA+AAAAPgAAAD4AAAA+AAAAPgAAAD4AAAA+AAAAPgAAAD4AAAA+AAAAPgAAAD4AAAA+AAAAPgAAAD4AAAH+AAAP//8A/////////////////8=
// @version		2.1
// @license		Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported (https://creativecommons.org/licenses/by-nc-sa/3.0/)
// @encoding	UTF-8
// ==/UserScript==

var EN_text = "Maximal bandwidth usage per day";
var EN_mega_unit = "MB";
var EN_giga_unit = "GB";
var EN_suffix = " / day";
var FR_text = "Utilisation maximale de la bande passante par jour";
var FR_mega_unit = "Mo";
var FR_giga_unit = "Go";
var FR_suffix = " / jour";

//Get current language
//var lang = readCookie(cookieName);
var lang = document.getElementsByClassName('toolbar-button-lang')[0].childNodes[1].innerHTML.toLowerCase();
lang = (lang == "fr" ? "en" : "fr");

//Get display unit
var dClass = document.getElementsByClassName('btn_right')[0].childNodes[0].className;
var displayAsMB = (dClass == "active");

//Get remaining days count before reset
var daysRaw = document.getElementsByClassName('note_reset')[0].innerHTML;
var days = Number(daysRaw.replace(/[^\d.-]/g, ''));

//Get remaining bandwidth
var usageRaw = document.getElementsByClassName('liste-standard')[0].childNodes[5].innerHTML;
var usage = usageRaw;
if (lang == "fr") usage = usage.replace(',', '.');
usage = Number(usage.replace(/[^\d.-]/g, ''));

//Get today bandwidth usage
var usageTodayRaw = document.getElementsByClassName('vchart_table_details')[0].childNodes[2].childNodes[30-days];
var usageToday = Number(usageTodayRaw.getElementsByClassName('vchart_value_totals')[0].innerHTML.replace(',', '.'));

//Do the math!
var EN_result = ((usage+usageToday)/days).toFixed(2);
var FR_result = ((usage+usageToday)/days).toFixed(2).replace('.', ',');
var EN_unit = displayAsMB ? EN_mega_unit : EN_giga_unit;
var FR_unit = displayAsMB ? FR_mega_unit : FR_giga_unit;

//Add the info
var note = document.getElementsByClassName('note_reset')[0];
if (lang == "fr") note.outerHTML += '<p class="note_reset" id="maxusage">'+FR_text+': '+FR_result+' '+FR_unit+FR_suffix+'</p>';
else if(lang == "en") note.outerHTML += '<p class="note_reset" id="maxusage">'+EN_text+': '+EN_result+' '+EN_unit+EN_suffix+'</p>';